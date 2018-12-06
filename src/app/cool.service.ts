import { Injectable, ApplicationRef } from '@angular/core';

@Injectable()
export class CoolService {
  state = 0;

  constructor(private app: ApplicationRef) {}

  setState() {
    this.state = Math.random();

    // Run change detection on state change
    this.app.tick();
  }
}
