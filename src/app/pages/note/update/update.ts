import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note.update',
  templateUrl: './update.html',
  styleUrls: ['./update.scss'],
})
export class NoteUpdatePage implements OnInit {
  noteId: String;
  noteCreateForm: FormGroup;
  uploader: FileUploader = new FileUploader({ url: 'uploadAPI', itemAlias: 'file' });
  fileItem: FileItem

  constructor(private loadingController: LoadingController, private router: Router, private activatedRoute: ActivatedRoute) { }

  // TODO: Solve binding between model and form
  ngOnInit() {
    this.noteCreateForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
    this.uploader.onAfterAddingFile = (fileItem) => {
      console.log('onAfterAddingFile file = ', fileItem);
      this.fileItem = fileItem;
    };
  }

  async ionViewDidEnter() {
    this.activatedRoute.paramMap.subscribe(async function(params) {
      this.noteId = params.get('noteId');
      console.log('noteId received = ', this.noteId);
      let note: any = await API.get('notes', '/notes/' + this.noteId, null);
      this.noteCreateForm.patchValue({ content: note.content });
      console.log('note = ', note);
    });
  }

  async onSubmit() {
    console.log('onSubmit')
    if (this.noteCreateForm.valid && this.uploader.getNotUploadedItems().length) {
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();
      const filename = Date.now() + '-' + this.fileItem.file.name
      console.log('filename = ', filename)
      const stored: any = await Storage.vault.put(filename, this.fileItem.file.rawFile, {
        contentType: this.fileItem.file.type
      });
      let attachment = stored.key;
      console.log('attachment = ', attachment)
      let content = this.noteCreateForm.value.content;
      try {
        await API.post("notes", "/notes", {
          body: { content: content, attachment: attachment }
        });
        loading.dismiss();
        this.router.navigate(['/note/list']);
      } catch (e) {
        alert(e.message);
      }
    }
  }
}
