import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'img-lazy',
  templateUrl: './img-lazy.component.html',
  styleUrls: ['./img-lazy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ImgLazyComponent implements OnInit {
  @Input() src;
  @Input() alt;

  @Output() isVisible = new EventEmitter();

  // Immutable object, only modify with setState
  state = {
    visible: false,
    loaded: false
  };

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) {}

  private setState(key, value) {
    this.state = { ...this.state, [key]: value };
    this.cd.detectChanges();
  }

  private calcVisibility() {
    const rect = this.el.nativeElement.getBoundingClientRect().top;
    if (rect <= window.innerHeight && !this.state.visible) {
      this.setState('visible', true);
      this.customEmit(true);
    }
  }

  ngOnInit() {
    this.calcVisibility();
  }

  @HostListener('window:scroll', ['$event'])
  onscroll(e) {
    this.calcVisibility();
  }

  onLoad() {
    setTimeout(() => {
      this.setState('loaded', true);
    }, 2000);
  }

  // Making public methods
  @Input()
  public log = () => {
    const state = this.state;
    console.log(state);
  }

  // Custom Events
  private customEmit(val) {
    this.isVisible.emit(val);
    const domEvent = new CustomEvent('is-visible');
    this.el.nativeElement.dispatchEvent(domEvent);
  }
}
