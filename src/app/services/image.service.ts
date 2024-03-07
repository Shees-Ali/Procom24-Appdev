import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
  GalleryImageOptions,
} from '@capacitor/camera';

import { AlertsService } from './basic/alerts.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(public alert: AlertsService, public utility: UtilityService) {}

  getPhoto() {
    return new Promise<any>((resolve) => {
      Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      })
        .then((res) => {
          alert(JSON.stringify(res));
          resolve("data:image/jpeg;base64," + res.base64String);
        })
        .catch((err) => {
          this.utility.presentFailureToast('Image Not Selected');
          resolve(null);
        });
    });
  }

  getPhotos() {
    return new Promise<any>(async (resolve) => {
      let isCamera = await this.alert.presentConfirm(
        'Camera',
        'Gallery',
        'Select',
        'Please select source'
      );
      if (isCamera) {
        const res = await this.openCamera();
        resolve(res);
      } else {
        const res = await this.pickImages();
        resolve(res);
      }
    });
  }

  pickImages() {
    return new Promise((resolve) => {
      const galleryOptions: GalleryImageOptions = {
        limit: 0,
        quality: 100,
      };

      Camera.pickImages(galleryOptions).then(
        async (imageData) => {
          let blobs: any = [];
          imageData.photos.forEach(async (x) => {
            let blob = await fetch(x.webPath).then((res) => res.blob());
            blobs.push(blob);
          });
          resolve({ isBase64: false, blobs });
        },
        (err) => {
          resolve(null);
        }
      );
    });
  }

  openCamera() {
    return new Promise((res) => {
      const cameraOptions: ImageOptions = {
        width: 150,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        height: 150,
        quality: 50,
      };

      Camera.getPhoto(cameraOptions).then(
        (imageData) => {
          res({ ...imageData, isBase64: true });
        },
        (err) => {
          res(null);
        }
      );
    });
  }
}
