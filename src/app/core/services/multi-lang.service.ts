import {effect, inject, Injectable, signal} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LANGUAGES} from "../../const/languages";


@Injectable({
  providedIn: 'root'
})
export class MultiLangService {
  public translateService = inject(TranslateService)

  public langSignal = signal<string>(
    JSON.parse(localStorage.getItem('languageSignal') || `"${LANGUAGES.VIETNAMESE.code}"`)
  );

  updateLanguage(lang: string) {
    this.langSignal.update(() => {
      switch (lang) {
        case LANGUAGES.VIETNAMESE.code:
          return LANGUAGES.VIETNAMESE.code;
        case LANGUAGES.UK_ENGLISH.code:
          return LANGUAGES.UK_ENGLISH.code;
        default:
          return LANGUAGES.VIETNAMESE.code;
      }
    });
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem(
        'languageSignal',
        JSON.stringify(this.langSignal())
      );
      this.translateService.use(this.langSignal());
      console.log(this.langSignal());
    })
  }

  // Returns the current language
  getCurrentLanguage() {
    const current_lang_code = this.langSignal();
    const languages = [
      LANGUAGES.VIETNAMESE,
      LANGUAGES.UK_ENGLISH
    ] as const;
    return languages.find(lang => lang.code === current_lang_code)
      || languages[0];
  }
}
