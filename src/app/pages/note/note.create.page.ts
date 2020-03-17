import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-note.create',
  templateUrl: './note.create.page.html',
  styleUrls: ['./note.create.page.scss'],
})
export class NoteCreatePage implements OnInit {
  noteCreateForm: FormGroup;
  uploader: FileUploader = new FileUploader({ url: 'uploadAPI', itemAlias: 'file' });
  fileItem: FileItem
  
  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    this.noteCreateForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
    this.uploader.onAfterAddingFile = (fileItem) => {
      console.log('onAfterAddingFile file = ', fileItem)
      this.fileItem = fileItem
    };
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
        // this.router.navigate(['/']);
      } catch (e) {
        alert(e.message);
      }
    }
  }
}
