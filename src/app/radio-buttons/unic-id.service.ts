import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnicIdService {
  private unicSet: { [key: string]: number } = {};

  getUnic(key: string = ''): string {
    const n = (this.unicSet[key] ?? 0) + 1;
    this.unicSet[key] = n;
    return `${key}${n}`;
  }
}
