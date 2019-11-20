import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { Router } from '@angular/router';


@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"]
})
export class MovieCardComponent implements OnInit {
  @Input()
  public movie: MovieModel = new MovieModel();

  @Output() movieSelected = new EventEmitter();

  isActive: boolean;

  constructor(private router: Router) { }

  // Verificando se a imagem recebida é um link
  ngOnInit() {
    this.isActive = false;
    debugger;
    try {
      new URL(this.movie.Poster);
    } catch (_) {
      this.movie.Poster = "./assets/no-image-movie.svg";
    }
  }

  setActive(val) {
    this.isActive = val;
  }

  selectItem() {
    this.movieSelected.emit(this.movie);
    this.goToMovie(this.movie.imdbID);
  }

  goToMovie(id) {
    this.router.navigate(['/movie', id]);
  }
}
