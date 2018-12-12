import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BookComponent} from './book/book.component';
import {BookListComponent} from './book-list/book-list.component';
import {SearchComponent} from './search/search.component';
import {LibraryComponent} from './library/library.component';
import {RouterModule} from "@angular/router";

import {GoogleBooksService} from "./shared/google-books.service";
import {PagerComponent} from './pager/pager.component';
import {LibraryService} from "./shared/library.service";
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    BookListComponent,
    SearchComponent,
    LibraryComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [GoogleBooksService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
