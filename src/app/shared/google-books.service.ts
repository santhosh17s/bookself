import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap, take } from 'rxjs/operators';
import {Book} from './book';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleBooksService {
  private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public initialised: boolean = false;
  public totalItems: number = 0;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string = "";
  public books: Book[];


  constructor(private http: HttpClient) {
  }

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get page(): number {
    return this._page;
  }

  set page(val: number) {
    if (val !== this.page) {
      this._page = val;
      this.searchBooks(this.query);
    }
  }


  public searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.books = [];
    this.http.get<any>(`${this.API_PATH}?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`)
            .pipe( tap( (data) => this.totalItems = data.totalItems),
                   map( data => data.items ? data.items : []),
                   map ( items => {
                     return items.map( item => this.bookFactory(item) )
                   }),
                   tap( _ => this.loading = false )
                )
            .subscribe( (books) => this.books = books );
     
  }

  retrieveBook(bookId: string) {
    return this.http.get<any>(`${this.API_PATH}/${bookId}`)
                    .pipe(
                      tap( value => console.log(value) ),
                      map( items => {
                        return this.bookFactory(items) 
                      })
                    );
  }

  private bookFactory(item: any): Book {
    return new Book(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories ? item.volumeInfo.categories.map((item) => item.split("/").pop().trim()) : ['N/A'],
      item.volumeInfo.imageLinks.thumbnail,
      item.volumeInfo.imageLinks.smallThumbnail
    )
  }
}
