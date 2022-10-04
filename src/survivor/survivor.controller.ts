import { Body, Controller, Get, HttpException, Patch, Post, Query } from '@nestjs/common';
import { Survivor } from './survivor.entity';
import { SurvivorService } from './survivor.service';

@Controller('survivor')
export class SurvivorController {
    constructor(
        private readonly survivorService: SurvivorService
    ) { }

    @Post('/create')
    async createSurvivor(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('age') age: string,
        @Body('gender') gender: string,
        @Body('location') location: string,
        @Body('infected') infected: boolean,
        @Body('inventory') inventory: any
    ): Promise<any> {
        if (!id || !name || !age || !gender || !location || !infected) {
            throw new HttpException('Incomplete survivor information', 400);
        }
        if (!inventory || inventory.length < 1 || !Array.isArray(inventory)) {
            throw new HttpException('Empty Inventory information', 400);
        }
        return await this.survivorService.insertSurvivor(id, name, age, gender, location, infected, inventory);
    }

    @Get()
    async getSurvivor(
        @Query('id') id: string,
    ): Promise<Survivor> {
        if (!id) {
            throw new HttpException('Empty id parameter', 400);
        }
        return await this.survivorService.readSurvivor(id);
    }

    @Patch('update')
    async update(@Query('id') id: string, @Body('location') location: string) {
        if (!id || !location) {
            throw new HttpException('Incomplete survivor information', 400);
        }
        return await this.survivorService.updateLocation(id, location);
    }

    @Get('report')
    async getReport(): Promise<any> {
        return await this.survivorService.generateReport();
    }
}
