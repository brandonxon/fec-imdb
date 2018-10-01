const fs = require('fs');
const path = require('path');
const Faker = require('faker/locale/en_US');
const timer = require('performance-now');

let dataDir = path.resolve(__dirname, `../data/detailsData.tsv`);
//tsv
let language = ['English', 'Mandarin', 'French', 'Germany', 'Albanian', 'Hindi', 'Korean', 'Greek', 'Portuguese', 'Italian', 'Turkish', 'Vietnamese', 'Hebrew'];
let franNum = 0, sranNum = 0 ; 
const start  = timer();
function writeTen(writer, data, encoding, callback) {
  let i = 10000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let obj = '';
      let languages = [], filminglocation = []; officialSites = [];
      franNum = Math.floor( Math.random() * 13);
      sranNum = Math.floor( Math.random() * 13);
      while (franNum === sranNum) {
        sranNum = Math.floor( Math.random() * 13);
      }
      filminglocation.push(Faker.address.city(), Faker.address.county(), Faker.address.country() );
      languages.push(language[franNum], language[sranNum]);
      officialSites.push("Official Site");
      data = {
        id: i,
        country: Faker.address.country(),
        languages: languages,
        releaseDate: Faker.date.between('2010-01-01','2018-09-28').toString().slice(0, 15),
        aka: Faker.random.word(),
        filminglocation: filminglocation
      }

      for(let key in data) {
        if(key === 'filminglocation') {
          obj = obj + data[key] + '\n';
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

  