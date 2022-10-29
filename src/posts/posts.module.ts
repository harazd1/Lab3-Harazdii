import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/comments/comments.entity';
import { PostsController } from './posts.controller';
import { Posts } from './posts.entity';
import { PostService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Comments])],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostModule {}
