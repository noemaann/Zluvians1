import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '..', '..', "DP's");
const outputDir = path.join(__dirname, '..', 'public', "DP's");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.jpg', '.webp').replace('.jpeg', '.webp'));
        
        sharp(inputPath)
            .resize({ width: 300, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outputPath)
            .then(() => console.log(`Converted ${file}`))
            .catch(err => console.error(err));
    }
});
