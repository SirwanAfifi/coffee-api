import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async signup(registrationDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    try {
      const newUser = await this.usersService.register({
        ...registrationDto,
        password: hashedPassword,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async signin(email: string, hashedPassword: string) {
    try {
      const foundUser = await this.usersService.findUserByEmail(email);
      const hashResult = await bcrypt.compare(
        hashedPassword,
        foundUser.password,
      );
      if (!hashResult) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      foundUser.password = undefined;
      return foundUser;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

enum PostgresErrorCode {
  UniqueViolation = '23505',
}
