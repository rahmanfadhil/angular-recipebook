import { Directive, OnInit, Input, HostBinding } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('style.display') display = 'none'
  @Input() appDropdown;

  ngOnInit() {
    this.appDropdown.addEventListener('focus', () => {
      // this.display === 'none' ? this.display = 'block' : this.display = 'none'
      this.display = 'block'
    })
    this.appDropdown.addEventListener('blur', () => {
      this.display = 'none'
    })
  }
}