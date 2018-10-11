const fs = require('fs');
const path = require('path');
const Faker = require('faker/locale/en_US');
const timer = require('performance-now');

let dataDir = path.resolve(__dirname, `../data/castData.tsv`);
//tsv

const start  = timer();
function writeTen(writer, data, encoding, callback) {
  let i = 10000001;
  //10000001
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let obj = '';
      let cast = '[', photos = [];
      let words = 'abcdefghijklmnopqrstuvwxyz'.split('');
      let word = '';

      for (let k = 0; k < 8; k++) {
        let index = Math.floor(Math.random() * 26);
        word += words[index];
      }

      for (let j = 0; j < 15; j++) {
        let name = Faker.name.findName();
        let character = Faker.internet.userName();
        let ran = Math.floor(Math.random()* 85) + 15;
        let charPic = Faker.image.avatar().slice(47);
        let pic = ran - j;
        cast += `{"name":"${name}","character":"${character}", "url":"${charPic}"}`;
        photos.push(pic);
        if (j !== 14) {
          cast += ',';
        }else {
          cast += ']';
        }
      }   

      data = {
        id: i,
        title: Faker.random.words() + ',' + word,
        cast: cast,
        photos: photos
      }

      for(let key in data) {
        if(key === 'photos') {
          obj = obj + data[key] + '\n';
        }else if(key === 'cast'){
          obj = obj + data[key] + '\t';
        }else {
          obj = obj + data[key] + '\t';
        }
      }
      // data = JSON.stringify(data);
      if (i === 1) {
        // last time!
        writer.write(obj, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        if( i % 1000000 === 0) {
          console.log('make', i);
        }
        ok = writer.write(obj, encoding);
      }
    } while (i > 1 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}
  
const writer = fs.createWriteStream(dataDir);
writeTen(writer, {}, "utf8", () => {
  console.log((timer() - start) / 1000 );
})

