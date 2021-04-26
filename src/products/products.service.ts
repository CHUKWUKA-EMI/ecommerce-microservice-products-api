import { Product, ProductDocument } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.ProductModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec();
  }

  async findOne(id: number): Promise<Product> {
    return this.ProductModel.findOne({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    return this.ProductModel.findOneAndUpdate({ id }, updateProductDto);
  }

  async remove(id: number): Promise<any> {
    return this.ProductModel.findOneAndDelete({ id });
  }
}
