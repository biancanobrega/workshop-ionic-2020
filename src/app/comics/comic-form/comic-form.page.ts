import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComicService } from '../comic.service';
import { IComic } from '../comic.model';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.page.html',
  styleUrls: ['./comic-form.page.scss'],
})
export class ComicFormPage implements OnInit {
  comicForm: FormGroup;
  comicId: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly comicService: ComicService,
    private readonly navController: NavController,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.comicId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.comicId) {
      this.comicService
        .getComic(this.comicId)
        .subscribe((res) => this.initForm(res));
    }
  }

  initForm(comic?: IComic) {
    this.comicForm = this.formBuilder.group({
      image: [comic?.image || '', Validators.required],
      name: [comic?.name || '', Validators.required],
      releaseDate: [
        comic?.releaseDate.toString().slice(0, 10) || '',
        Validators.required,
      ],
      description: [comic?.description || '', Validators.required],
    });
  }

  onSubmit() {
    if (this.comicForm.valid) {
      const comic: IComic = {
        description: this.comicForm.get('description').value,
        image: this.comicForm.get('image').value,
        name: this.comicForm.get('name').value,
        releaseDate: new Date(this.comicForm.get('releaseDate').value),
      };

      let service: Observable<object>;
      if (this.comicId) {
        service = this.comicService.updateComic({...comic, id: this.comicId});
      } else {
        service = this.comicService.addComic(comic);
      }

      service.subscribe(() => {
        this.navController.back();
      });
    }
  }
}
