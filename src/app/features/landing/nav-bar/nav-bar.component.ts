import {Component, HostListener, inject} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {MultiLangService} from "../../../core/services/multi-lang.service";
import {TranslateModule} from "@ngx-translate/core";
import {LANGUAGES} from "../../../const/languages";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgClass, TranslateModule, CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  protected readonly languages = [
    LANGUAGES.VIETNAMESE,
    LANGUAGES.UK_ENGLISH
  ] as const;

  public multiLangService = inject(MultiLangService);

  public isLangDropdownOpen: boolean = false;

  /**
   * Toggles the language dropdown and updates the language
   * @param lang (optional): is the language code
   * */
  onToggleLanguage(lang?: string): void {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
    // If lang is provided and current language is not the same
    // -> update the language
    if (lang && this.multiLangService.langSignal() !== lang) {
      this.multiLangService.updateLanguage(lang);
      console.log("Language changed to ", lang);
    }
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
