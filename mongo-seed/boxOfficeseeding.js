const fs = require('fs');
const path = require('path');
const Faker = require('faker/locale/en_US');
const timer = require('performance-now');


let dataDir = path.resolve(__dirname, `../data/boxofficeData.tsv`);

//tsv
const start  = timer();
function writeTen(writer, data, encoding, callback) {
  let i = 10000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let obj = '';
      data = {
        id: i,
        budge: '$'+ Faker.random.number({min: 1000000}).toString(),
        openingWeekend: '$' + Faker.random.number({min: 100000, max: 1000000 }).toString(),
        gross: '$' + Faker.random.number({min: 1000000, max: 100000000 }).toString(),
        cumulative: '$' + Faker.random.number({min: 9000000, max: 900000000 }).toString(),
      }

      for(let key in data) {
        if(key === 'cumulative') {
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


  