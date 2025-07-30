import {Component, effect, HostBinding, HostListener, inject, signal} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {MultiLangService} from "../../../core/services/languages/multi-lang.service";
import {TranslateModule} from "@ngx-translate/core";
import {LANGUAGES} from "../../../const/languages";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgClass, TranslateModule, CommonModule, MatButtonToggle, MatButton
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
  protected isDarkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') || 'false')
  );

  public isLandingPage = signal<boolean>(true);

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode()));
    });
  }

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

  @HostBinding('class.dark') get mode() {
    return this.isDarkMode();
  }

  /**
   * Toggles the theme mode
   * */
  onToggleThemeMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
  }

  get themeModeIcon():string {
    const path = 'assets/icon/';
    let iconPath = path+'sun.svg';
    if (!this.isDarkMode()) {
      iconPath = path+'moon.svg';
    }
    return iconPath;
  }

  // Navigate to the Authentication page
  onNavigateToAuth(): void {
    this.isLandingPage.set(false);
  }
}
