import { StringsService } from './basic/strings.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertsService } from './basic/alerts.service';
import { LoadingService } from './basic/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  alphalist: any;
  constructor(
    public loading: LoadingService,
    public plt: Platform,
    public alerts: AlertsService,
    public strings: StringsService
  ) {}

  async showLoader(msg = 'Please wait...') {
    return await this.loading.showLoader(msg);
  }

  async hideLoader() {
    return await this.loading.hideLoader();
  }

  showAlert(msg: any, title = 'Alert'): Promise<any> {
    return this.alerts.showAlert(msg, title);
  }

  presentToast(msg: any) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg: any) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg: any) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = ''
  ): Promise<boolean> {
    return this.alerts.presentConfirm(
      (okText = okText),
      (cancelText = cancelText),
      (title = title),
      (message = message)
    );
  }

  /** Strings Service */

  capitalizeEachFirst(str: any) {
    return this.strings.capitalizeEachFirst(str);
  }
}
