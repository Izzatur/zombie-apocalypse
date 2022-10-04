import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InventoryService } from 'src/inventory/inventory.service';
import { Equal, Repository } from 'typeorm';
import { Survivor } from './survivor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry, Point } from 'geojson';
import { Inventory } from 'src/inventory/inventory.entity';

@Injectable()
export class SurvivorService {
    constructor(private inventoryService: InventoryService, @InjectRepository(Survivor) private survivorRepository: Repository<Survivor>) { }

    private async setSurvivor(id: string, name: string, age: string, gender: string, infected: boolean, location: string): Promise<Survivor> {
        let survivor = new Survivor();
        survivor.id = id;
        survivor.name = name;
        survivor.age = age;
        survivor.gender = gender;
        survivor.location = await this.setLocation(location);
        survivor.infected = infected;
        return survivor;
    }

    private async setLocation(location: string): Promise<Point> {
        const pointObject: Point = {
            type: "Point",
            coordinates: location
        };
        return pointObject;
    }

    private async readById(id: string): Promise<Survivor> {
        return await this.survivorRepository.findOne({ where: { id: id } });
    }

    private async update(id: string, survivor: Survivor): Promise<any> {
        return await this.survivorRepository.update(id, survivor);
    }

    private async findInfected(value: boolean): Promise<Survivor[]> {
        return this.survivorRepository.find({
            where: {
                infected: value
            }
        });
    }

    private async readAll(): Promise<Survivor[]> {
        return await this.survivorRepository.find();
    }

    public async insertSurvivor(id: string, name: string, age: string, gender: string, location: string, infected: boolean, inventory: any): Promise<any> {
        let survivor = await this.setSurvivor(id, name, age, gender, infected, location);
        let insert = await this.survivorRepository.insert(survivor);
        for (var i in inventory) {
            let item = inventory[i];
            if (!item || !item.name || !item.type || !item.quantity) {
                throw new HttpException('Incomplete inventory information', 400);
            } else {
                // insert inventory
                let inventory = await this.inventoryService.setInventory(item.name, item.type, item.quantity, survivor)
                this.inventoryService.insertInventory(inventory);
            }
        }
        return insert;
    }

    public async readSurvivor(id: string): Promise<Survivor> {
        let survivor = await this.readById(id);
        if (!survivor) {
            throw new HttpException('Survivor not found', 404);
        }
        return survivor;
    }

    public async updateLocation(id: string, location: string): Promise<Survivor> {
        let survivor = new Survivor();
        survivor.location = await this.setLocation(location);
        let updateSurvivor = await this.update(id, survivor);
        if (updateSurvivor.affected < 1) {
            throw new HttpException('Survivor not found to update', 404);
        }
        return updateSurvivor;
    }

    public async generateReport(): Promise<any> {
        let allSurvivor = await this.readAll();
        if (!allSurvivor || allSurvivor.length < 1) {
            throw new HttpException('Survivors not found', 404);
        }
        let nonSurvivors = await this.findInfected(true);
        let survivors = await this.findInfected(false);
        let result = {
            total_survivors: allSurvivor.length,
            infected: nonSurvivors.length,
            percentage_infected: nonSurvivors.length / allSurvivor.length * 100,
            non_infected: survivors.length,
            percentage_non_infected: survivors.length / allSurvivor.length * 100
        }
        return result;
    }
}
