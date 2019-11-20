import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MovieModel } from './models/movie.model';
import { MovieService } from './services/movie.service';
import { Response } from './models/response.model';
import { ListKeyManager } from '@angular/cdk/a11y';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movies: Array<MovieModel>;
  showResults: boolean;
  totalResults: string;
  search: string;
  keyboardEventsManager: ListKeyManager<any>;
  @ViewChildren(MovieCardComponent) listCardComponent: QueryList<any>;

  constructor(private movieService: MovieService<Response>) { }

  ngOnInit() { }

  async getMovies(search) {
    await this.movieService.get({ s: search, page: '1' }).then(data => {
      this.movies = data.Search;
      this.totalResults = data.totalResults;
      this.keyboardEventsManager = new ListKeyManager(this.listCardComponent);
    });
  }

  public onChange(search) {
    if (search.length > 2) {
      this.getMovies(search);
      this.showResults = true;
    } else {
      this.movies = [];
      this.showResults = false;
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if (this.keyboardEventsManager) {
        if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
          this.keyboardEventsManager.onKeydown(event);
          this.listCardComponent.forEach(index => {
            index.isActive = false;
          });
          this.keyboardEventsManager.activeItem.setActive(true);
          return false;
        } else if (event.keyCode === ENTER) {
          this.keyboardEventsManager.activeItem.selectItem();
          return false;
        }
    }
  }
}
