// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';

export class UsersService {
        private users: User[] = [];
        private idCounter = 1;

        constructor(private rolesService: RolesService) {}

        create(createUserDto: CreateUserDto) {
                // Buscar el rol por nombre
                const role = this.rolesService.findByName(createUserDto.roleName);
                if (!role) {
                        throw new Error('Role not found');
                }

                const newUser: User = new User(
                        this.idCounter++,
                        createUserDto.username,
                        createUserDto.email,
                        createUserDto.passwordHash,
                        createUserDto.bio,
                        role.id, // Asignar el ID del rol
                );
                this.users.push(newUser);
                return newUser;
        }

        // ...otros métodos igual
}