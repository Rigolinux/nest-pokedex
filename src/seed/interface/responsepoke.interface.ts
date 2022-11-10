/* eslint-disable prettier/prettier */

export interface Pokerequest {
  count: number;
  next: string;
  previous?: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
