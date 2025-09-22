import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  create(dto: CreateGameDto) {
    const game = this.gameRepository.create(dto);
    return this.gameRepository.save(game);
  }

  findAll() {
    return this.gameRepository.find();
  }

  findOne(id: number) {
    return this.gameRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateGameDto) {
    await this.gameRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.gameRepository.delete(id);
    return result.affected ? { id } : null;
  }
}

