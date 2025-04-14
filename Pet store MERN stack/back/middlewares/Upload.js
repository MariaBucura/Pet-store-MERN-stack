import multer from 'multer';
import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '..', 'images');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (request, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({storage: storage});




