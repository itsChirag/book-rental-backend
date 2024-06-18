import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column()
  publishedDate: string;

  @Column()
  isActive: boolean;
  default: false;
}
