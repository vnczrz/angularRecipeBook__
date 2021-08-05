import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  //by using Hostbinding Below example demonstrate to add and remove the class based on a click event Hostbinding eg: with help of variable, I am attaching an open(instead of open you can even add your class name) class to the HTML element
  @HostBinding('class.open')  isOpen=false;
  
  constructor(private el: ElementRef) { }

  @HostListener('click') click(eventData: Event) {
    this.isOpen = !this.isOpen
  }
}
