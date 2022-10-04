import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survivor } from 'src/survivor/survivor.entity';
import { Equal, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
    constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>) { }

    public async insertInventory(inventory: Inventory): Promise<any> {
        let insert = await this.inventoryRepository.insert(inventory);
        return insert;
    }

    public async setInventory(name: string, type: string, quantity: number, survivor: Survivor): Promise<Inventory> {
        let inventory = new Inventory();
        inventory.name = name;
        inventory.type = type;
        inventory.quantity = quantity;
        inventory.survivor = survivor;
        return inventory;
    }

    private findMany(survivor_id: string): Promise<Inventory[]> {
        return this.inventoryRepository.createQueryBuilder("inventory")
            .leftJoinAndSelect("inventory.survivor", "survivor")
            .where({
                survivor: Equal(survivor_id)
            })
            .getMany();
    }

    public async readInventory(survivor_id: string): Promise<Inventory[]> {
        let inventory = await this.findMany(survivor_id);
        if (!inventory || inventory.length < 1) {
            throw new HttpException('Inventory not found', 404);
        }
        return inventory;
    }
}
