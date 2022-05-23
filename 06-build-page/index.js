const fs = require('fs');
const path = require('path');
function buildPage () {
  fs.rm(path.join(__dirname, 'project-dist', 'assets'),  { recursive: true, force: true}, (err) => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive : true }, (err) => {
      if (err) throw err;
      fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', function (err) {
        if (err) throw err;
        const readableStream  = fs.createReadStream(path.join(__dirname, 'template.html'));
        readableStream.on('data', chunk => {
          chunk = chunk.toString();
          fs.readdir(path.join(__dirname, 'components'), (err, files) => {
            if (err) throw err;
            else{
              let countOfFiles = 0;
              for(let i = 0; i < files.length; i++) {
                if(chunk.includes('{{' + files[i].slice(0, files[i].length-5) + '}}')) {
                  const readableStream2  = fs.createReadStream(path.join(__dirname, 'components', files[i]));
                  readableStream2.on('data', chunk2 => {
                    chunk = chunk.replace('{{' + files[i].slice(0, files[i].length-5) + '}}', chunk2.toString());
                    countOfFiles = countOfFiles + 1;
                    if(countOfFiles === files.length){
                      fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), chunk.toString(), (err) => {
                        if (err) throw err;
                      });
                    }
                  });
                }
              }
            }
          });
        });
      });
    });
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', function (err) {
      if (err) throw err;
      fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          if(file.slice(-4) === '.css'){
            const readableStream  = fs.createReadStream(path.join(__dirname, 'styles', file));
            readableStream.on('data', chunk => {
              fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), '\n' + chunk.toString(), (err) => {
                if (err) throw err;
              });
            });
          }
        });
      });
    });
    fs.rm(path.join(__dirname, 'project-dist' ,'assets'), {recursive: true, force: true}, () => {
      if (err) throw err;
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive : true }, (err) => {
        if (err) throw err;
        function copyDir (oldPath) { 
          fs.stat(oldPath, (err, stats) => {
            if (err) throw err;
            else{
              const newPath = oldPath.replace('assets', 'project-dist\\assets');
              if (!stats.isDirectory()) {
                fs.copyFile(oldPath, newPath, (err) => {
                  if (err) throw err;
                });
              } else {
                fs.readdir(oldPath, (err, files2) => {
                  if (err) throw err;
                  else{
                    fs.mkdir(newPath, (err) => {
                      if (err) throw err;
                      files2.forEach(file2 => {
                        copyDir(path.join(oldPath, file2));
                      });
                    });
                  }
                });
              }
            }
          });
        }
        fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
          if (err) throw err;
          else{
            files.forEach(file => {
              copyDir(path.join(__dirname, 'assets', file));
            });
          }
        });
      });
    });
  });
}
buildPage ();