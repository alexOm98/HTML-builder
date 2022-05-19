const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
let text;
fs.writeFile(path.join(__dirname, 'document.txt'), '', function (err) {
  if (err) throw err;
}); 
stdout.write('Введите текст:\n');
stdin.on('data', data => {
  text = data.toString();
  if(text.includes('exit')){
    stdout.write('До свидания!');
    process.exit();
  }
  fs.appendFile(path.join(__dirname, 'document.txt'), text, function (err) {
    if (err) throw err;
  });
});
process.on('SIGINT', () => {
  console.log('До свидания!');
  process.exit();
});