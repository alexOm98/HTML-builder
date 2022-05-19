const fs = require('fs');
const path = require('path');
const { stdout } = process;
fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  stdout.write('Файлы:\n');
  if (err) throw err;
  else {
    files.forEach(file => {
      if(file.isFile()){
        let result = file.name.split('.');
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          if (err) throw err;
          else{
            result.push(stats.size + ' bytes');
            console.log(result.join(' - '));
          } 
        });
      }
    });

  }
});

