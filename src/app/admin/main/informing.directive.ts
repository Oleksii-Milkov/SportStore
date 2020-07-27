import { Directive, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appInforming]'
})
export class InformingDirective {

  constructor(
    private elementRef: ElementRef
  ) { }

}
