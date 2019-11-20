import { Rating } from './rating.model';
import { GenericModel } from './generic.model';

export class MovieModel extends GenericModel {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;

    Actors?: string;
    Awards?: string;
    Country?: string;
    Director?: string;
    Genre?: string;
    Language?: string;
    Metascore?: string;
    Plot?: string;
    Rated?: string;
    Ratings?: Array<Rating>;
    Released?: string;
    Response?: string;
    Runtime?: string;
    Writer?: string;
    imdbRating?: string;
    imdbVotes?: string;
    totalSeasons?: string;
}

