import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/posts.entity';
import { CommentsController } from './comments.controller';
import { Comments } from './comments.entity';
import { CommentService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Posts])],
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentModule {}