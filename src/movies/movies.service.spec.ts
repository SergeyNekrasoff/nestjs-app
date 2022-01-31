import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testing getAll', () => {
    it('should be return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Testing getOne', () => {
    it('should be film', () => {
      service.create({
        title: 'Test Film',
        genres: ['1', '2', '3'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should be 404', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Testing remove', () => {
    it('Film is removed', () => {
      service.create({
        title: 'Test Film',
        genres: ['1', '2', '3'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });

    it('should be 404', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Testing create', () => {
    it('Film is create', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Film',
        genres: ['1', '2', '3'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('Testing update', () => {
    it('Film is updated', () => {
      service.create({
        title: 'Test Film',
        genres: ['1', '2', '3'],
        year: 2000,
      });
      service.patch(1, { title: 'Update title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update title');
    });

    it('should be 404', () => {
      try {
        service.patch(999, { title: '' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
