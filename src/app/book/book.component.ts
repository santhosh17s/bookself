import {Component} from "@angular/core";
import {Book} from "../shared/book";
import { GoogleBooksService } from '../shared/google-books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../shared/library.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  private book:Book;


  constructor(
        private router: Router,
        private route: ActivatedRoute,
        private bookService:GoogleBooksService,
        private libraryService: LibraryService) {
      
          this.route.params.subscribe( params => {
            console.log(params);
            if(params['bookId']) {
              this.getBook(params['bookId']);
            }
          })     
  }

  getBook(bookId: string) {
     this.bookService.retrieveBook(bookId)
                .subscribe( (value:any) => {
                  //console.log(value)
                  this.book.id = value.id;
                  this.book = value.volumeInfo;
                });
  }

  hasBook(book: Book): boolean {
    console.log("Has Book" + book)
    return this.libraryService.hasBook(book);
  }

  addBook(book: Book) {
    this.libraryService.addBook(book);
  }

  removeBook(book: Book) {
    this.libraryService.removeBook(book);
  }
}
