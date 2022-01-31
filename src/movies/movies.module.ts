import { Module } from '@nestjs/common';
import { MoviesController } from './movies.service';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
