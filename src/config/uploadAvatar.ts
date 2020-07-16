import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

export const directoryAvatar = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  storage: multer.diskStorage({
    destination: directoryAvatar,
    filename(request, file, callback) {
      const hash = randomBytes(8).toString('hex');
      const fileHash = `${hash}-${file.originalname}`;

      return callback(null, fileHash);
    },
  }),
};
