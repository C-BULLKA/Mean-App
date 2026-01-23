import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordFilterService {

  private badWords: string[] = [
    'OKPA','twin', '67', 'szpącić', 'skibidi',
    'piwko','tuff', 'slay', 'goat','brainrot'
  ];

  constructor() {}

  hasBadWords(text: string): boolean {
    const lowerText = text.toLowerCase();
    return this.badWords.some(word =>
      new RegExp(`\\b${word}\\b`, 'i').test(lowerText)
    );
  }


  getBadWordsFound(text: string): string[] {
    const lowerText = text.toLowerCase();
    return this.badWords.filter(word =>
      new RegExp(`\\b${word}\\b`, 'i').test(lowerText)
    );
  }

  censorText(text: string): string {
    let censoredText = text;
    this.badWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const replacement = '*'.repeat(word.length);
      censoredText = censoredText.replace(regex, replacement);
    });
    return censoredText;
  }
}
