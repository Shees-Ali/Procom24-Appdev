import { StringsService } from './strings.service';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public strings: StringsService
  ) {}

  showAlert(msg: any, title = 'Alert'): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: title,
        message: msg,
        buttons: [
          {
            text: 'OK',
            cssClass: 'secondary',
            handler: (blah) => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async presentSuccessToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: this.strings.capitalizeEachFirst(msg),
      duration: 5000,
      position: 'top',
      cssClass: 'successToast',
      buttons: [
        {
            side: 'end',
            icon: 'close-outline',
            role: 'cancel',
            cssClass: 'icon-class'
        }
    ]
    });

    toast.present();
  }

  async presentFailureToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: this.strings.capitalizeEachFirst(msg ? msg : 'ERROR'),
      duration: 5000,
      position: 'top',
      cssClass: 'failureToast',
      buttons: [
        {
            side: 'end',
            icon: 'close-outline',
            role: 'cancel',
            cssClass: 'icon-class'
        }
    ]
    });

    toast.present();
  }

  async presentToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
    });
    toast.present();
  }

  presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = ''
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: okText,
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
      alert.present();
    });
  }

}
