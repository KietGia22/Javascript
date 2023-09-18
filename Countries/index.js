import { countries } from './countries.js';

const countriess = [];
countries.forEach(ele => {
  if (typeof ele.capital == 'undefined') {
    ele.capital = 'No capital';
  }
  countriess.push(ele);
})

const internationalNumberFormat = new Intl.NumberFormat('en-US');

const totalCountries = document.querySelector('.total-countries');
const totalPopulation = document.querySelector('.total-populations');
const feedback = document.querySelector('.feedback');
const filteredNum = document.querySelector('.number');

const searchInput = document.querySelector('.search-input');

const nameArrow = document.querySelector('.name-arrow');
const nameArrowIcon = document.createElement('i');
nameArrow.appendChild(nameArrowIcon);

const capitalArrow = document.querySelector('.capital-arrow');
const capitalArrowIcon = document.createElement('i');
capitalArrow.appendChild(capitalArrowIcon);

const populationArrow = document.querySelector('.population-arrow');
const populationArrowIcon = document.createElement('i');
populationArrow.appendChild(populationArrowIcon);

const CapitalBtn = document.querySelector('.btn-capital');
const PopulationBtn = document.querySelector('.btn-population');
const NameBtn = document.querySelector('.btn-name');
const btnChart = document.querySelector('.btn-chart');


const countriesDisplay = document.querySelector('.countries-display');

const graphButtonsWrapper = document.querySelector('.graph-buttons-wrapper');
const graphDescription = document.querySelector('.graph-description');
const countriesGraph = document.querySelector('.countries-graph');
const languagesGraph = document.querySelector('.languages-graph');

const populationBtn = document.querySelector('.population');
const languagesBtn = document.querySelector('.languages');


const goTop = document.querySelector('.go-top');

totalCountries.textContent = countries.length;

const total = countries.reduce((acc, cur) => acc + cur.population, 0);
totalPopulation.textContent = total;

let sortedForName = false;
let sortedForCapital = false;
let sortedForPopulation = false;

//Sap xep cac quoc gia theo ten, thu do, dan so
NameBtn.addEventListener('click', function() {
    nameArrow.style.display = 'block';
    capitalArrow.style.display = 'none';
    populationArrow.style.display = 'none';
  
    if (sortedForName) {
      nameArrowIcon.classList.add('ti-arrow-down');
      nameArrowIcon.classList.remove('ti-arrow-up');
  
      capitalArrow.style.display = 'none';
      populationArrow.style.display = 'none';
      displayCountries(reverseName(countries));
      sortedForName = false;
    } else {
      nameArrowIcon.classList.add('ti-arrow-up');
      nameArrowIcon.classList.remove('ti-arrow-down');
      sortedForName = true;
      displayCountries(sortForName(countries));
      sortedForCapital = false;
      sortedForPopulation = false;
    }
});

CapitalBtn.addEventListener('click', function() {
  nameArrow.style.display = 'none';
  capitalArrow.style.display = 'block';
  populationArrow.style.display = 'none';

  if (sortedForCapital) {
    capitalArrowIcon.classList.add('ti-arrow-up');
    capitalArrowIcon.classList.remove('ti-arrow-down');
    displayCountries(sortForCapital(countriess));
    sortedForCapital = false;
  } else {
    capitalArrowIcon.classList.add('ti-arrow-down');
    capitalArrowIcon.classList.remove('ti-arrow-up');
    sortedForCapital = true;
    displayCountries(reverseCapital(countriess));
    sortedForName = false;
    sortedForPopulation = false;
  }
});

PopulationBtn.addEventListener('click', function() {
    nameArrow.style.display = 'none';
    capitalArrow.style.display = 'none';
    populationArrow.style.display = 'block';

    if (sortedForPopulation) {
      populationArrowIcon.classList.add('ti-arrow-down');
      populationArrowIcon.classList.remove('ti-arrow-up');
      displayCountries(reversePopulation(countries));
      sortedForPopulation = false;
    } else {
      populationArrowIcon.classList.add('ti-arrow-up');
      populationArrowIcon.classList.remove('ti-arrow-down');
      sortedForPopulation = true;
      displayCountries(sortForPopulation(countries));
      sortedForName = false;
      sortedForCapital = false;
    }
});

//Xu ly hien thi cac quoc gia
const displayCountries = (array) => {
    countriesDisplay.innerHTML = '';
    array.forEach(ele => {
        const countryCard = document.createElement('div');

        countryCard.classList.add('country-card');

        const flag = document.createElement('img');
        const name = document.createElement('h3');
        const info = document.createElement('div');
        const capital = document.createElement('p');
        const language = document.createElement('p');
        const population = document.createElement('p');

        flag.src = ele.flag;
        flag.classList.add('flag');

        name.textContent = ele.name;
        name.classList.add('country-name');

        capital.textContent = `Capital: ${ele.capital}`;

        language.textContent = `Language${ele.languages.length > 1 ? 's' : ''}: ${ele.languages.join(', ')}`;

        population.textContent = `Population: ${internationalNumberFormat.format(
            ele.population
          )}`;

        info.classList.add('country-info');

        info.appendChild(capital);
        info.appendChild(language);
        info.appendChild(population);

        countryCard.appendChild(flag);
        countryCard.appendChild(name);
        countryCard.appendChild(info);

        countriesDisplay.appendChild(countryCard)
    });
}

//Sort
const sortForName = function (arr) {
    return arr.sort((a, b) => b.name.localeCompare(a.name));
};

const reverseName = function (arr) {
  return arr.sort((a, b) => a.name.localeCompare(b.name));
};

const sortForCapital = function (arr) {
  return arr.sort((a, b) => b.capital.localeCompare(a.capital));
};

const reverseCapital = function (arr) {
  return arr.sort((a, b) => a.capital.localeCompare(b.capital));
};

const sortForPopulation = function (arr) {
  return arr.sort((a, b) => b.population - a.population);
};

const reversePopulation = function (arr) {
    return arr.sort((a, b) => a.population - b.population);
};

//Tinh toan de bieu do
const displayGraph = ((array, sliceIndex) => {
    languagesGraph.innerHTML = '';
    countriesGraph.innerHTML = '';

    const comparePopulation = sortForPopulation(countries)[0].population;
    
    // console.log(comparePopulation);

    if (array.length > 30) {
      sliceIndex = 10;
    }

    array
      .sort((a, b) => b.population - a.population)
      .slice(0, sliceIndex)
      .forEach((item) => {
        const country = document.createElement('div');
        country.classList.add('country');
  
        const graphName = document.createElement('p');
        graphName.classList.add('graph-name');
        graphName.textContent = item.name;
  
        const graphPercentage = document.createElement('span');
        graphPercentage.classList.add('graph-percentage');
  
        const graphColor = document.createElement('span');
        graphColor.classList.add('color');
        graphColor.style.width = `${(item.population * 100) / comparePopulation}%`;
  
        const graphPopulation = document.createElement('p');
        graphPopulation.classList.add('graph-population');
        graphPopulation.textContent = internationalNumberFormat.format(
          item.population
        );
  
        graphPercentage.appendChild(graphColor);
        country.appendChild(graphName);
        country.appendChild(graphPercentage);
        country.appendChild(graphPopulation);
        countriesGraph.appendChild(country);
      });
});

//Xu ly o tim kiem
searchInput.addEventListener('keyup', (e) => {
    sortedForPopulation = false;
    sortedForName = false;
    sortedForCapital = false;
  
    nameArrow.style.display = 'none';
    capitalArrow.style.display = 'none';
    populationArrow.style.display = 'none';
  
    let searchQuery = e.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) => {
      if (country.capital == undefined) {
        if (country.name.toLowerCase().includes(searchQuery)) {
          return country;
        }
      } else {
        if (
          country.capital.toLowerCase().includes(searchQuery) ||
          country.name.toLowerCase().includes(searchQuery)
        ) {
          return country;
        }
      }
      for (let i = 0; i < country.languages.length; i++) {
        if (country.languages[i].toLowerCase().includes(searchQuery)) {
          return country;
        }
      }
    });
  
    if (filteredCountries.length < 200) {
      graphDescription.textContent = 'World Population';
    } else {
      graphDescription.textContent = '10 Most populated countries in the world';
    }
  
    if (searchQuery.length != 0) {
      feedback.style.display = 'block';
      filteredNum.textContent = `${filteredCountries.length} ${
        filteredCountries.length > 1 ? 'countries' : 'country'
      }`;
    } else {
      feedback.style.display = 'none';
    }
    countriesGraph.style.display = 'flex';
    languagesGraph.style.display = 'none';
    displayCountries(filteredCountries);
    displayGraph(filteredCountries);
});

//Hien thi 
displayCountries(countries);
displayGraph(countries, 10);

//Xu ly di toi bieu do
btnChart.addEventListener('click', function() {
    graphButtonsWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

//Xu ly tro lai top
goTop.addEventListener('click', function() {
    document.documentElement.scrollTop = 0;
})

//Xu ly phan bieu do ngon ngu
const allLangs = ((array) => {
    const lang = {};
    
    array.forEach((ele) => {
        const languages = ele.languages;

        languages.forEach((l) => {
          // console.log(l);
          // console.log(lang[l]);
            if(!lang[l])
               lang[l] = 1;
            else 
               lang[l]++;
        })
    });

    // console.log(lang);
    
    const finalArr = Object.keys(lang).map(ele => ({
        lang: ele,
        count: lang[ele]
    }));
  
    console.log(finalArr);

    return finalArr;
});

function displayLangGraph(array, sliceIndex = 10) {
    countriesGraph.innerHTML = '';
    languagesGraph.innerHTML = '';
    const totalLanguages = allLangs(countries).length;
  
    array
      .sort((a, b) => b.count - a.count)
      .slice(0, sliceIndex)
      .forEach((item) => {
        const language = document.createElement('div');
        language.classList.add('country');
  
        const graphName = document.createElement('p');
        graphName.classList.add('graph-name');
        graphName.textContent = item.lang;
  
        const graphPercentage = document.createElement('span');
        graphPercentage.classList.add('graph-percentage');
  
        const graphColor = document.createElement('span');
        graphColor.classList.add('color');
        graphColor.style.width = `${(item.count * 100) / totalLanguages}%`;
  
        const graphPopulation = document.createElement('p');
        graphPopulation.classList.add('graph-population');
        graphPopulation.textContent = internationalNumberFormat.format(
          Number(item.count)
        );
  
        graphPercentage.appendChild(graphColor);
        language.appendChild(graphName);
        language.appendChild(graphPercentage);
        language.appendChild(graphPopulation);
        languagesGraph.appendChild(language);
      });
  }

  populationBtn.addEventListener('click', () => {
    if (countries.length < 200) {
      graphDescription.textContent = 'World Population';
    } else {
      graphDescription.textContent = '10 Most populated countries in the world';
    }
    countriesGraph.style.display = 'flex';
    languagesGraph.style.display = 'none';
    countriesGraph.innerHTML = '';
    languagesGraph.innerHTML = '';
    displayGraph(countries, 10);
  });

  languagesBtn.addEventListener('click', () => {
    if (allLangs(countries).length == allLangs(countries).length) {
      graphDescription.textContent = '10 Most Spoken languages in the world';
    } else {
      graphDescription.textContent = 'Languages';
    }
    countriesGraph.innerHTML = '';
    countriesGraph.style.display = 'none';
    languagesGraph.style.display = 'flex';
  
    languagesGraph.innerHTML = '';
    displayLangGraph(allLangs(countries));
  });