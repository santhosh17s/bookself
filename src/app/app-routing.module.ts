import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  { path: 'library', component: LibraryComponent},
  { path: 'search', component: SearchComponent},
  { path: 'book/:bookId', component: BookComponent},
  { path: '', redirectTo:'library', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
