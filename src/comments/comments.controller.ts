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
  BadRequestException,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentService } from './comments.service';
import { DEFAULT_PAGE_SIZE } from 'src/posts/posts.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(0), new ParseIntPipe()) page: number,
    @Query('size', new DefaultValuePipe(DEFAULT_PAGE_SIZE), new ParseIntPipe())
    size: number,
  ) {
    return this.commentService.findAll(page, size);
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateCommentDto) {
    return this.commentService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentService.delete(id);
  }
}
