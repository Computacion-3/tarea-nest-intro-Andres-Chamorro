import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  create(dto: CreatePermissionDto) {
    const permission = this.permissionRepository.create(dto);
    return this.permissionRepository.save(permission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdatePermissionDto) {
    await this.permissionRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.permissionRepository.delete(id);
    return result.affected ? { id } : null;
  }
}
