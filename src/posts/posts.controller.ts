import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  /* Request, Response,*/ Query,
  Header,
  Redirect,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DEFAULT_PAGE_SIZE, PostService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(0), new ParseIntPipe()) page: number,
    @Query('size', new DefaultValuePipe(DEFAULT_PAGE_SIZE), new ParseIntPipe())
    size: number,
  ) {
    return this.postsService.findAll(page, size);
  }

  @Get(':postId/comments')
  findCommentstoPost(
    @Param('postId', new ParseIntPipe()) postId: number,
    @Query('page', new DefaultValuePipe(0), new ParseIntPipe()) page: number,
    @Query('size', new DefaultValuePipe(DEFAULT_PAGE_SIZE), new ParseIntPipe())
    size: number,
    @Query('search') search: string,
  ) {
    return this.postsService.findCommentstoPost(postId, page, size, search);
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.delete(id);
  }
}
