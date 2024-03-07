import { Injectable } from '@angular/core';
import {
  Database,
  equalTo,
  limitToFirst,
  off,
  onValue,
  orderByChild,
  orderByKey,
  push,
  query,
  ref,
  set,
  startAfter,
  update,
} from '@angular/fire/database';
import {
  Storage,
  UploadMetadata,
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private basePath = '/documents';
  constructor(private database: Database, private storage: Storage) {}

  getDataOnValue(route: string) {
    return new Promise<any>(async (resolve) => {
      const dBref = ref(this.database, route);
      off(dBref);
      onValue(dBref, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }

  updateData(route: string, data: any) {
    return update(ref(this.database, route), data);
  }

  setData(route: string, data: any) {
    return set(ref(this.database, route), data);
  }

  pushData(route: string, data: any) {
    return push(ref(this.database, route), data);
  }

  listData(
    route: string,
    limit: number = 5,
    last_item: any = undefined,
    filter: string = ''
  ) {
    return new Promise<any>((resolve) => {
      let listQuery;
      let array: any[] = [];
      if (last_item) {
        listQuery = query(
          ref(this.database, route),
          limitToFirst(limit),
          startAfter(last_item)
        );
      } else {
        listQuery = query(
          ref(this.database, route),
          limitToFirst(limit),
        );
      }
      off(listQuery);
      onValue(listQuery, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          childData['key'] = childSnapshot.key;
          array.push(childData);
        });
        if (filter && filter !== '') {
          array = array.filter((x) => x.type == filter);
        }
        resolve(array);
      });
    });
  }

  countData(route: string, filter = '') {
    return new Promise<number>((resolve) => {
      let count = 0;
      let listQuery = query(ref(this.database, route), orderByKey());

      off(listQuery);
      onValue(listQuery, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (filter && filter !== '') {
            if (childData.type == filter) {
              count++;
            }
          } else {
            count++;
          }
        });
        resolve(count);
      });
    });
  }

  pushFileToStorage(fileUpload: any, user_id: any) {
    return new Promise<any>((resolve) => {
      const filePath = `${this.basePath}/${user_id}/${fileUpload.file.name}`;
      const ref = storageRef(this.storage, filePath);
      const meta: UploadMetadata = {
        contentType: 'application/pdf',
      };
      const uploadTask = uploadBytesResumable(ref, fileUpload.extra, meta);
      const file: any = {};
      file['file_name'] = fileUpload.file.name;

      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          console.log(snapshot);
          console.log(snapshot.bytesTransferred);
          console.log(snapshot.totalBytes);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            console.log('File available at', downloadURL);
            file['download_url'] = downloadURL;
            resolve(file);
          });
        }
      );
    });
  }

  deleteFile(file_name: any, user_id: any) {
    const filePath = `${this.basePath}/${user_id}/${file_name}`;
    const deleteRef = storageRef(this.storage, filePath);

    return deleteObject(deleteRef);
  }
}
