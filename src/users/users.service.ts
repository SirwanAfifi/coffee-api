import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    const foundUser = await this.userRepository.findOne({ email });
    if (!foundUser) throw new NotFoundException(`User not found`);
    return foundUser;
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.userRepository.create(user);
    await this.userRepository.save(createdUser);
    return user;
  }
}
