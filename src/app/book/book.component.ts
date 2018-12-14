import {Component} from "@angular/core";
import {Book} from "../shared/book";
import { GoogleBooksService } from '../shared/google-books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../shared/library.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  private book:Book;
  private urlBookId: string;

  constructor(
        private router: Router,
        private route: ActivatedRoute,
        private bookService:GoogleBooksService,
        private libraryService: LibraryService) {
      
          this.route.params.subscribe( params => {
            if(params['bookId']) {
              this.urlBookId = params['bookId'];
              this.getBook(params['bookId']);
            }
          });
          
          console.log("book constructor");
  }

  getBook(bookId: string) {
     this.bookService.retrieveBook(bookId)
                .subscribe( (book) => {
                  console.log( book)
                  this.book = book;
                });
  }

  hasBook(book: Book): boolean {
    if(book) {
      return this.libraryService.hasBook(book);
    }  

  }

  addBook(book: Book) {
    this.libraryService.addBook(book);
  }

  removeBook(book: Book) {
    this.libraryService.removeBook(book);
  }
}
