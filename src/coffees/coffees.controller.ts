import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response) {
    //return 'This returns all coffees';
    return response.status(200).send({ name: 'Hi' });
  }

  @Get(':id')
  findOne(@Param() params) {
    return `This action returns #${params.id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() body) {
    return body;
  }
}
