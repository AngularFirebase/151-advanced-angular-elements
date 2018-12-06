import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

const config = {
  apiKey: 'AIzaSyAesSTpq6RdhSGqqh3BNcJErodzk1ePzps',
  authDomain: 'fireship-dev-17429.firebaseapp.com',
  databaseURL: 'https://fireship-dev-17429.firebaseio.com',
  projectId: 'fireship-dev-17429',
  storageBucket: 'fireship-dev-17429.appspot.com',
  messagingSenderId: '307044372590'
};

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ImgLazyComponent } from './img-lazy/img-lazy.component';
import { ImgFirebaseComponent } from './img-firebase/img-firebase.component';
import { MyBtnComponent } from './my-btn/my-btn.component';
import { CoolService } from './cool.service';

@NgModule({
  declarations: [ImgLazyComponent, ImgFirebaseComponent, MyBtnComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule
  ],
  providers: [CoolService],
  entryComponents: [ImgLazyComponent, ImgFirebaseComponent, MyBtnComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elements: any[] = [
      [ImgLazyComponent, 'img-lazy'],
      [ImgFirebaseComponent, 'img-firebase'],
      [MyBtnComponent, 'my-btn']
    ];

    for (const [component, name] of elements) {
      const el = createCustomElement(component, { injector: this.injector });
      customElements.define(name, el);
    }
  }
}
