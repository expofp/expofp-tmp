import * as fs from 'fs';
import * as path from 'path';

// Define the source directory and output file
const imgsDir = path.join(__dirname, 'imgs');
const outputFile = path.join(__dirname, 'imgs.js');

// Read all files from the ./imgs directory
fs.readdir(imgsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter out any non-files (e.g., subdirectories)
    const imgFiles = files.filter(file => fs.statSync(path.join(imgsDir, file)).isFile());

    // Create the array of image paths
    const imgPaths = imgFiles.map(file => `./imgs/${file}`);

    // Generate the content of imgs.js
    const fileContent = `const imgs = ${JSON.stringify(imgPaths, null, 4)};`;

    // Write the content to imgs.js
    fs.writeFile(outputFile, fileContent, err => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('imgs.js file created successfully!');
        }
    });
});