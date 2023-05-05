import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

@Injectable()
export class UploadService {
  firebaseConnect() {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    return { app, storage };
  }

  async upload(file: Express.Multer.File) {
    const storage = this.firebaseConnect().storage;
    const storageRef = ref(storage, file.originalname);
    const uploadTask = await uploadBytesResumable(storageRef, file.buffer);

    const url = await getDownloadURL(
      ref(storage, uploadTask.metadata.fullPath)
    );

    return {
      url,
      fullPath: uploadTask.metadata.fullPath,
      name: uploadTask.metadata.name,
    };
  }
}
