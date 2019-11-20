import { TestBed, inject } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { GenericModel } from '../models/generic.model';
import { MovieModel } from '../models/movie.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { throwError} from 'rxjs';

describe('TestMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [MovieService]
  }));

  it('should be created', () => {
    const service = TestBed.get(MovieService);
    expect(service).toBeTruthy();
   });

  it('001 - handleError - If condition', inject([MovieService], (movieService: MovieService<MovieModel>) => {
    const service: MovieService<any> = TestBed.get(MovieService);
    spyOn(window,'alert');
    let error = {message: 'Error'};
    let errorResult = service.handleError(error);
    expect(window.alert).toHaveBeenCalledWith(error.message);
    expect(errorResult).toEqual(jasmine.any(Object));
  }));

  it('001 - handleError - If condition', inject([MovieService], (movieService: MovieService<MovieModel>) => {
    const service: MovieService<any> = TestBed.get(MovieService);
    spyOn(window,'alert');
    let error = {message: 'Error'};
    let errorResult = service.handleError(error);
    expect(window.alert).toHaveBeenCalledWith(error.message);
    expect(errorResult).toEqual(jasmine.any(Object));
  }));

  it('002 - handleError - Else if', inject([MovieService], (movieService: MovieService<MovieModel>) => {
    const service: MovieService<any> = TestBed.get(MovieService);
    spyOn(window,'alert');
    let error = {status: 500, statusText: 'Internal Server Error'};
    let errorResult = service.handleError(error);
    expect(window.alert).toHaveBeenCalledWith('${error.status} - ${error.statusText}');
    expect(errorResult).toEqual(jasmine.any(Object));
  }));

  it('003 - handleError - Else', inject([MovieService], (movieService: MovieService<MovieModel>) => {
    const service: MovieService<any> = TestBed.get(MovieService);
    spyOn(window,'alert');
    let error = {a: 1};
    let errorResult = service.handleError(error);
    expect(window.alert).toHaveBeenCalledWith('Server error');
    expect(errorResult).toEqual(jasmine.any(Object));
  }));
});
