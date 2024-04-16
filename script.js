'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*const getCountryData = country => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // console.log(request.responseText);
  request.addEventListener('load', () => {
    // console.log(request.responseText);
    const [data] = JSON.parse(request.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages}</p>
      <p class="country__row"><span>💰</span>${data.currencies.name}</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('usa')
getCountryData('portugal')
*/

const renderCountry = (data, className = '') => {
  // console.log(data);

  const cur = Object.values(data.currencies)[0];

  // console.log(cur);

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags?.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name?.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${Object.values(cur)[0]}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  // countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = country => {
  // AJAX Call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // console.log(request.responseText);
  request.addEventListener('load', () => {
    // console.log(request.responseText);
    const [data] = JSON.parse(request.responseText);
    console.log(data);

    // Rander Country 1
    renderCountry(data);

    // Get neighbour country 2
    const [neighbour] = data.borders;
    console.log(neighbour);

    if (!neighbour) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', ()=> {
      const [data2] = JSON.parse(request2.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour')
    })
  });
};

getCountryAndNeighbour('usa');
*/

// fetch api

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);

  // countriesContainer.style.opacity = 1;
};

const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(response => {
    // console.log(response);

    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

/*const getCountryData = country => {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      // err => alert(err)
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
      // const neighbour = data[0].borders[0];
      const neighbour = `ds23`;
      // console.log(neighbour);
      if (!neighbour) return;
      console.log(neighbour);

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          // console.log(data);
          const [newData] = data;
          console.log(newData);
          return renderCountry(newData, 'neighbour');
        });
    })
    .catch(err => {
      // console.error(`${err}`);
      return renderError(`Something went wrong!! ${err.message}. Try Again`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', () => {
  getCountryData('usa');
});*/

const getCountryData = country => {
  // Country 1

  getJSON(
    `https://restcountries.com/v3.1/alpha/${country}`,
    'Country Not Found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      // console.log(data);
      // const neighbour = `ds23`;
      // console.log(neighbour);

      if (!neighbour) throw new Error(`No Neighbour Found.`);

      // console.log(neighbour);
      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(data => {
      const [newData] = data;

      // console.log(data);
      // console.log(newData);

      return renderCountry(newData, 'neighbour');
    })
    .catch(err => {
      // console.error(`${err}`);
      return renderError(`Something went wrong!! ${err.message}. Try Again`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', () => {
  getCountryData('usa');
});
