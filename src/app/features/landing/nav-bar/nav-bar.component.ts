import {Component, HostListener} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public isLangDropdownOpen: boolean = false;

  // Executes when the toggle theme mode button is clicked
  onToggleThemeMode() {

  }

  onToggleLanguageDropdown():void {
    this.isLangDropdownOpen = !this.isLangDropdownOpen
  }

  // Executes when the user clicks outside the language dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const clickedInsideDropdown = targetElement.closest('.relative');
    if (!clickedInsideDropdown) {
      this.isLangDropdownOpen = false;
    }
  }
}
