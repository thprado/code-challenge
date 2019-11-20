import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const movieMock  = {
    Title: 'Title',
    Year: 'Year',
    imdbID: 'imdbID',
    Type: 'Type',
    Poster: 'Poster'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardComponent ],
      imports: [FormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('001 - Method: setActive', () => {
    let bool = true;
    component.setActive(bool);
    expect(component.isActive).toEqual(bool);
  });

  it('002 - Method: selectItem', () => {
    component.movie = movieMock;
    spyOn(component, 'goToMovie');
    spyOn(component.movieSelected, 'emit');    
    component.selectItem();
    expect(component.movieSelected.emit).toHaveBeenCalledWith(movieMock);
    expect(component.goToMovie).toHaveBeenCalledWith(movieMock.imdbID);
  });

  it('003 - Method: goToMovie', () => {
    component.goToMovie(movieMock.Year);
    expect(router.navigate).toHaveBeenCalledWith(['/movie', movieMock.Year]);
  });
});
