import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieModel;

  constructor(
    private movieService: MovieService<MovieModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getMovieDetails(this.activatedRoute.snapshot.params.id);
  }

  async getMovieDetails(id) {
    this.movie = await this.movieService.get({ i: id });
  }

  goToMovies() {
    this.router.navigate(['/movies']);
  }
}
