const fs = require('fs');
const path = require('path');
function mergeStyles () {
  fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', function (err) {
    if (err) throw err;
  });
  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if(file.slice(-4) === '.css'){
        const readableStream  = fs.createReadStream(path.join(__dirname, 'styles', file));
        readableStream.on('data', chunk => {
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), chunk.toString(), (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
}
mergeStyles();