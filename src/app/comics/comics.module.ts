import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsPage } from './comics/comics.page';
import { ComicPage } from './comic/comic.page';
import { ComicFormPage } from './comic-form/comic-form.page';
import { ComicService } from './comic.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComicsRoutingModule,
  ],
  declarations: [ComicsPage, ComicPage, ComicFormPage],
  providers: [ComicService],
})
export class ComicsPageModule {}
