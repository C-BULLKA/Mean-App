import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordFilterService {
  // Lista złych słów
  private badWords: string[] = [
    'damn', 'hell', 'crap', 'stupid', 'idiot',
    'fuck', 'bitch', 'asshole', 'bastard', 'prick',
    'cholera', 'kurwa', 'pierdol', 'jebany', 'gówno',
    'piwko',
  ];

  constructor() {}

  // Sprawdź czy tekst zawiera złe słowa
  hasBadWords(text: string): boolean {
    const lowerText = text.toLowerCase();
    return this.badWords.some(word =>
      new RegExp(`\\b${word}\\b`, 'i').test(lowerText)
    );
  }

  // Zwróć listę znalezionych złych słów
  getBadWordsFound(text: string): string[] {
    const lowerText = text.toLowerCase();
    return this.badWords.filter(word =>
      new RegExp(`\\b${word}\\b`, 'i').test(lowerText)
    );
  }

  // Zamiast złych słów na asteryki
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
