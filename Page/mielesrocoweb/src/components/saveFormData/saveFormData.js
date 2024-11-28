// saveFormData.js
const fs = require('fs');
const path = require('path');

const saveFormData = (data, fileName) => {
  const filePath = path.join(__dirname, 'assets', 'Docs', fileName);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = saveFormData;