import { Module } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { SurvivorController } from './survivor.controller';
import { InventoryModule } from 'src/inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survivor } from './survivor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survivor]), InventoryModule],
  providers: [SurvivorService],
  controllers: [SurvivorController]
})
export class SurvivorModule {}
