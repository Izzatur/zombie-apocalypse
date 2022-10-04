import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurvivorModule } from './survivor/survivor.module';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survivor } from './survivor/survivor.entity';
import { Inventory } from './inventory/inventory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Survivor, Inventory],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SurvivorModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
