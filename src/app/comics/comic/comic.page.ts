import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { IComic } from '../comic.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  comic: IComic;
  comicId: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly comicService: ComicService,
    private readonly navController: NavController
  ) {}

  ngOnInit() {
   this.comicId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.comicService.getComic(this.comicId).subscribe((res) => this.comic = res);
  }

  removeComic() {
    this.comicService.removeComic(this.comic.id).subscribe(() => this.navController.back());
  }
}
