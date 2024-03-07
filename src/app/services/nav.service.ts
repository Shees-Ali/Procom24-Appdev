import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  present(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  setRoot(page: any, param = {}) {
    this.navigateTo(page, param);
  }

  push(page: any, param = {}) {
    let extras: NavigationExtras = {
      queryParams: param,
    };
    this.navigateTo(page, extras);
  }

  pop() {
    return new Promise((resolve) => {
      this.location.back();
      resolve(true);
    });
  }

  navigateTo(link: any, data?: NavigationExtras) {
    this.router.navigate(['pages/' + link], data);
  }

  navigateFromRoot(link: any, data?: NavigationExtras) {
    this.router.navigate([link], data);
  }

  getParams() {
    return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }
}
