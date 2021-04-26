import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: number): Promise<any> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(@Body() updateProductDto: UpdateProductDto): Promise<any> {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @Delete('id')
  async remove(@Param() id: number): Promise<any> {
    return this.productsService.remove(id);
  }

  @EventPattern('order_created')
  async createOrder(order: any): Promise<any> {
    const products = await this.productsService.findAll();
    const orderedProd = products.filter(c => c.name == order.productOrdered)[0];
    if (orderedProd && order.quantityOrdered <= orderedProd.quantity) {
      orderedProd.ordered = true;
      return orderedProd;
    }

    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  @EventPattern('order_updated')
  async updateOrder(order: any): Promise<any> {
    const products = await this.productsService.findAll();
    const orderedProd = products.filter(c => c.name == order.productOrdered)[0];
    if (orderedProd && order.quantityOrdered <= orderedProd.quantity) {
      orderedProd.ordered = true;
      return orderedProd;
    }

    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  @EventPattern('order_deleted')
  async deleteOrder(id: number): Promise<any> {
    const product = await this.productsService.findOne(id);
    if (product) {
      product.ordered = false;
      return product;
    }

    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
