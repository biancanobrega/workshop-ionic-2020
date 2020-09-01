import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicsPage } from './comics/comics.page';
import { ComicPage } from './comic/comic.page';
import { ComicFormPage } from './comic-form/comic-form.page';

const routes: Routes = [
  {
    path: '',
    component: ComicsPage
  },
  {
    path: 'comic/:id',
    component: ComicPage
  },
  {
    path: 'form/:id',
    component: ComicFormPage
  },
  {
    path: 'form',
    component: ComicFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsRoutingModule {}
