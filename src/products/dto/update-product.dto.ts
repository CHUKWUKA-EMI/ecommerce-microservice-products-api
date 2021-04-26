import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: number;
}
