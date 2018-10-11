const Faker = require('faker/locale/en_US');

module.exports = insertNew = (newId) => {
  let cast = [], photos = [], plotkeywords = [], genres = [], languages = [], filminglocation = []; officialSites = [];
  let words = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let word = '';
  let language = ['English', 'Mandarin', 'French', 'Germany', 'Albanian', 'Hindi', 'Korean', 'Greek', 'Portuguese', 'Italian', 'Turkish', 'Vietnamese', 'Hebrew'];
  let franNum = Math.floor( Math.random() * 13), sranNum = Math.floor( Math.random() * 13);
  let productionCo = [];
  productionCo.push(Faker.company.companyName());

  for (let j = 0; j < 15; j++) {
    let name = Faker.name.findName();
    let character = Faker.internet.userName();
    let ran = Math.floor(Math.random()* 85) + 15;
    let charPic = Faker.image.avatar().slice(47);
    let pic = ran - j;
    cast.push({'name':name,'character':character,'url':charPic});
    photos.push(pic);

    if (j < 8) {
      let index = Math.floor(Math.random() * 26);
      word += words[index];
    }
    if (j < 5) {
      kword = Faker.random.word();
      category = Faker.commerce.department();
      plotkeywords.push(kword);
      genres.push(category);
    }
  }   

  while (franNum === sranNum) {
    sranNum = Math.floor( Math.random() * 13);
  }
  filminglocation.push(Faker.address.city(), Faker.address.county(), Faker.address.country() );
  languages.push(language[franNum], language[sranNum]);
  officialSites.push("Official Site");

  data = {
    id: newId,
    title: Faker.random.words() + ',' + word,
    cast: cast,
    photos: photos,
    storyline: Faker.lorem.paragraph(),
    plotkeywords: plotkeywords,
    taglines: Faker.lorem.sentence(),
    movieRating: Faker.lorem.sentence(),
    mpaa: Faker.random.word(),
    genres: genres,
    country: Faker.address.country(),
    languages: languages,
    releaseDate: Faker.date.between('2010-01-01','2018-09-28').toString().slice(0, 15),
    aka: Faker.random.word(),
    officialSites: officialSites,
    filminglocation: filminglocation,
    budget: '$'+ Faker.random.number({min: 1000000}).toString(),
    openingWeekend: '$' + Faker.random.number({min: 100000, max: 1000000 }).toString(),
    gross: '$' + Faker.random.number({min: 1000000, max: 100000000 }).toString(),
    cumulative: '$' + Faker.random.number({min: 9000000, max: 900000000 }).toString(),
    productionCo: productionCo,
    runtime: Faker.random.number({min: 1, max: 200 }).toString(),
    soundMix: Faker.random.word(),
    color: Faker.commerce.color()    
  }

  return new Promise (function(resolve, reject) {
    resolve(data);
  })
}




