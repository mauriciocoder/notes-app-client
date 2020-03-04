import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-note.create',
  templateUrl: './note.create.page.html',
  styleUrls: ['./note.create.page.scss'],
})
export class NoteCreatePage implements OnInit {
  noteCreateForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.noteCreateForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

}
