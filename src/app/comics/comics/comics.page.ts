import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Observable, combineLatest } from 'rxjs';
import { IComic } from '../comic.model';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {
  comics$: Observable<IComic[]>;
  filteredComics$: Observable<IComic[]>;

  filterControl: FormControl;

  constructor(private readonly comicService: ComicService) { }

  ngOnInit() {
    this.filterControl = new FormControl();
  }

  ionViewWillEnter() {
    this.filterControl.setValue('');
    this.getComics();
  }

  getComics() {
    this.comics$ = this.comicService.getCommics();

    const filter$ = this.filterControl.valueChanges.pipe(startWith(''), debounceTime(300));
    this.filteredComics$ = combineLatest(this.comics$, filter$).pipe(
      map(([comics, filterString]) =>
        comics.filter((comic) =>
          comic.name.toLowerCase().includes(String(filterString).toLowerCase())
        )
      )
    );
  }

}
