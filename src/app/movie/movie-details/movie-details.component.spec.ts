import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
class MockActivatedRoute extends ActivatedRoute {
  snapshot: ActivatedRouteSnapshot;
  constructor() {
    super();
    this.snapshot.params = of({ id: 'tt0087538' });
  }
}

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      imports: [FormsModule, HttpClientTestingModule,RouterTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {snapshot: {params: {'id': 'tt0087538'}}}
      },
      MovieService,
      { provide: Router, useValue: router }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([MovieService], (movieService: MovieService<MovieModel>) => {
    expect(component).toBeTruthy();
  }));

  function setup() {
    const movieService = fixture.debugElement.injector.get(MovieService);

    return { movieService };
  }

  it('001 - Method: getMovieDetails', () => {
    const { movieService } = setup();
    spyOn(movieService, 'get');
    component.getMovieDetails('ABC');
    expect(movieService.get).toHaveBeenCalled();
  });

  it('002 - Method: goToMovies', () => {
    component.goToMovies();
    expect(router.navigate).toHaveBeenCalledWith(['/movies']);
  });
});
