import { MovieModel } from './movie.model';
import { GenericModel } from './generic.model';

export class Response extends GenericModel {
  Response: string;
  Error?: string;
  Search?: Array<MovieModel>;
  totalResults?: string;
}
