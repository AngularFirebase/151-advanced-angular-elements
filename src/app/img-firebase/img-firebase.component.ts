import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-img-firebase',
  templateUrl: './img-firebase.component.html',
  styleUrls: ['./img-firebase.component.css']
})
export class ImgFirebaseComponent implements OnInit {

  @Input() path;

  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
    this.downloadURL = this.storage.ref(this.path).getDownloadURL();
  }

}
