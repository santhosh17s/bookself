import {Component} from "@angular/core";
import {Book} from "../shared/book";
import { GoogleBooksService } from '../shared/google-books.service';
import { Router, ActivatedRoute } from '@angular/router';

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
        private bookService:GoogleBooksService) {
      
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
                  console.log(value.volumeInfo)
                  this.book = value.volumeInfo;
                });
  }

  hasBook(book: Book): boolean {
    //TODO
    return false;
  }

  addBook(book: Book) {
    //TODO
  }

  removeBook(book: Book) {
    //TODO
  }
}
