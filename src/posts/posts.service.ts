import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/comments/comments.entity';
import { Paginated } from 'src/utils/pagination/paginated';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './posts.entity';

export const DEFAULT_PAGE_SIZE = 10;

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async findAll(page: number, size: number) {
    const skip = page * size;
    const [posts, count] = await this.postsRepository.findAndCount({
      skip: skip,
      take: size,
    });
    const pages = Math.ceil(count / size);
    return new Paginated<Posts>(posts, count, pages, page);
  }

  async findCommentstoPost(
    id: number,
    page: number,
    size: number,
    search: string,
  ) {
    const skip = page * size;
    const [comments, count] = await this.commentsRepository.findAndCount({
      skip: skip,
      take: size,
      where: {
        post: {
          id: id,
        },
      },
    });

    const pages = Math.ceil(count / size);
    return new Paginated<Comments>(comments, count, pages, page);
  }
  async findById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });

    if (!post) {
      throw new HttpException(
        `Post with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return post;
  }

  create(createDTO: CreatePostDto) {
    const post = this.postsRepository.create({
      ...createDTO,
    });
    return this.postsRepository.save(post);
  }

  async update(id: number, updateDTO: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id: id });

    if (!post) {
      throw new HttpException(
        `Post with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.postsRepository.save({
      ...post,
      ...updateDTO,
      updatedAt: new Date().toISOString(),
    });
  }

  async delete(id: number) {
    await this.postsRepository.delete({ id: id });
  }
}
