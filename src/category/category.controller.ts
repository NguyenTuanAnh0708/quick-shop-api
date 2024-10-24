import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/category/entities/category.entity';
import { query } from 'express';
import { GetCategoriesDto } from 'src/category/dto/get-categories.dto';
import { CategoriesResponse } from 'src/category/types/categories.type';
import { ApiQuery } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiQuery({ name: 'limit', required: true, description: 'The number of categories to display per page', example:10})
  @ApiQuery({ name: 'page', required: true, description: 'The current page number', example: 1 })
  @ApiQuery({ name: 'orderBy', required: false, description: 'The column name to sort by, e.g.' })
  @ApiQuery({ name: 'orderDirection', required: false, description: 'The direction of sorting, can be ASC (ascending) or DESC (descending)' })
  async getCategories(
    @Query() query: GetCategoriesDto,
  ): Promise<CategoriesResponse> {
    console.log(query);
    return await this.categoryService.findAll(
      query.page,
      query.limit,
      query.orderBy,
      query.orderDirection,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
