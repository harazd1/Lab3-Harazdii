import { Posts } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', length: 24 })
  username: string;

  @Column({ type: 'text', length: 100 })
  comment: string;

  @Column({ type: 'datetime', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: string;

  @ManyToOne(() => Posts, (post) => post.comments)
  post: Posts;
}
