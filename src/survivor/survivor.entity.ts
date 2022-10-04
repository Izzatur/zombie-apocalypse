import { Inventory } from 'src/inventory/inventory.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, Index } from 'typeorm';
import { Geometry, Point } from 'geojson';

@Entity()
export class Survivor {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  gender: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point

  @Column()
  infected: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Inventory, (inventory) => inventory.survivor)
  inventory: Inventory[]
}