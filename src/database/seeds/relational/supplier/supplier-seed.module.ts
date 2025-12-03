import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { SupplierSeedService } from './supplier-seed.service';
import { SupplierFactory } from './supplier.factory';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [SupplierSeedService, SupplierFactory],
  exports: [SupplierSeedService, SupplierFactory],
})
export class SupplierSeedModule {}
