const fs = require('fs');
const path = require('path');
const Faker = require('faker/locale/en_US');
const timer = require('performance-now');


let dataDir = path.resolve(__dirname, `../data/creditsdata.tsv`);

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
      let productionCo = [];
      productionCo.push(Faker.company.companyName());
      data = {
        id: i,
        productionCo: productionCo,
        runtime: Faker.random.number({min: 1, max: 200 }).toString(),
        soundMix: Faker.random.word(),
        color: Faker.commerce.color(),
      }

      for(let key in data) {
        if(key === 'color') {
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
// writeStream.on('finish', () => {console.log( (timer() - start) / 1000 ) } );


  