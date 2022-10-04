
import { Survivor } from 'src/survivor/survivor.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: "int" })
  quantity: number;

  @ManyToOne(() => Survivor, (survivor) => survivor.inventory)
  survivor: Survivor;
}