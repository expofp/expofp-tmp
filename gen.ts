import * as fs from "fs";
import * as path from "path";

const imagesDir = "images";
// Define the source directory and output file
const imagesPath = path.join(__dirname, imagesDir);
const outputFile = path.join(__dirname, "imageUrls.js");

// Read all files from the ./imgs directory
fs.readdir(imagesPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter out any non-files (e.g., subdirectories)
  const imgFiles = files.filter((file) =>
    fs.statSync(path.join(imagesPath, file)).isFile()
  );

  // Create the array of image paths
  const imgPaths = imgFiles.map((file) => `./${imagesDir}/${file}`);

  // Generate the content of imgs.js
  const fileContent = `const imageUrls = ${JSON.stringify(
    imgPaths,
    null,
    4
  )};\n\nexport default imageUrls`;

  // Write the content to imgs.js
  fs.writeFile(outputFile, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("imgs.js file created successfully!");
    }
  });
});
