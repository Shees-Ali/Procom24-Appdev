import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private platform: Platform) {}

  set(key: string, data: string): Promise<any> {
    return new Promise((resolve) => {
      localStorage.setItem(key, data);
      resolve(key);
    });
  }

  get(key: string): Promise<any> {
    return new Promise((resolve) => {
      const v = localStorage.getItem(key);
      resolve(v);
    });
  }
}
