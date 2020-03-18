import { Component } from '@angular/core';
import { API } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note.list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class NoteListPage {
  notes: any;
  constructor(private router: Router) { }

  async ionViewWillEnter() {
    this.notes = await API.get('notes', '/notes', null);
    console.log('this.notes = ', this.notes);
  }

  update(note: any) {
    console.log('noteId = ', note.noteId);
    this.router.navigate(['/note/update/' + note.noteId]);
  }
}
