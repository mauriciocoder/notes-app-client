import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note.create',
  templateUrl: './create.html',
  styleUrls: ['./create.scss'],
})
export class NoteCreatePage implements OnInit {
  noteCreateForm: FormGroup;
  uploader: FileUploader = new FileUploader({ url: 'uploadAPI', itemAlias: 'file' });
  fileItem: FileItem
  
  constructor(private loadingController: LoadingController, private router: Router) { }

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
    if (this.noteCreateForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      try {
        loading.present();
        let attachment = '';
        if (this.uploader.getNotUploadedItems().length) {
          const filename = Date.now() + '-' + this.fileItem.file.name
          console.log('filename = ', filename)
          const stored: any = await Storage.vault.put(filename, this.fileItem.file.rawFile, {
            contentType: this.fileItem.file.type
          });
          attachment = stored.key;
        }
        let content = this.noteCreateForm.value.content; 
        await API.post("notes", "/notes", {
          body: { content: content, attachment: attachment }
        });
        this.router.navigate(['/note/list']);
      } catch (e) {
        alert(e.message);
      } finally {
        loading.dismiss();
      }
    }
  }
}
