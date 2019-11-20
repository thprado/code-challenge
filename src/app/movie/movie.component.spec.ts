import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';
import { createKeyboardEvent } from '@angular/cdk/testing';
import { QueryList } from '@angular/core';
import { MovieComponent } from './movie.component';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieService } from './services/movie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieModel } from './models/movie.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ListKeyManager } from '@angular/cdk/a11y';
import { of } from 'rxjs';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  const moviesMock: Array<MovieModel> = [
    {
      Title: 'Title',
      Year: 'Year',
      imdbID: 'imdbID',
      Type: 'Type',
      Poster: 'Poster'
    },
    {
      Title: 'Title2',
      Year: 'Year2',
      imdbID: 'imdbID2',
      Type: 'Type2',
      Poster: 'Poster2'
    }
  ];

  const response = {
      Search: moviesMock,
      totalResults: "2"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieComponent, MovieCardComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [MovieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movies = moviesMock;
    fixture.detectChanges();
  });

  function setup() {
    const movieService = fixture.debugElement.injector.get(MovieService);

    return { movieService };
  }

  it('should create', inject([MovieService], (movieService: MovieService<MovieModel>) => {
    expect(component).toBeTruthy();
  }));

  it('001 - Method: onChange with length more than two characters.', () => {
    let str = '123';
    spyOn(component,'getMovies');
    component.onChange(str);
    expect(component.getMovies).toHaveBeenCalledWith(str);
    expect(component.showResults).toBeTruthy();
  });

  it('002 - Method: onChange with length less than two characters.', () => {
    let str = '1';
    spyOn(component,'getMovies');
    component.onChange(str);
    expect(component.movies.length).toBe(0);
    expect(component.showResults).toBeFalsy();
  });

  it('003 - Testing 2 elements in the ViewChild bind.', () => {
    expect(component.listCardComponent.length).toBe(2);
  });

  it('004 - Method: handleKeyUp with DownArrow', () => {
    const { movieService } = setup();
    spyOn(movieService, 'get').and.returnValue(Promise.resolve(response));
    component.getMovies('abc');
    expect(component.movies.length).toBe(2);
  });
});
