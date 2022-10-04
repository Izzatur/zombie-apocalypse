import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { Inventory } from './inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService
    ) { }

    @Get()
    async getInventory(
        @Query('survivor_id') survivor_id: string,
    ): Promise<Inventory[]> {
        if (!survivor_id) {
            throw new HttpException('Empty survivor_id parameter', 400);
        }
        return await this.inventoryService.readInventory(survivor_id);
    }
}
