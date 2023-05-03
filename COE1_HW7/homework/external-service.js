const externalService = {};
(function (module) {
  const _regionsList = {
    eu: 'Europe',
    na: 'North America',
    sa: 'South America',
    af: 'Africa',
    as: 'Asia',
    oc: 'Oceania',
  };

  const _countriesList = [
    {
      name: 'Ukraine',
      flagURL: 'https://www.flagsapi.com/UA/flat/64.png',
      region: _regionsList.eu,
      area: 603500,
      capital: 'Kyiv',
      languages: {ukr: 'Ukrainian'},
    },
    {
      name: 'Hungary',
      flagURL: 'https://www.flagsapi.com/HU/flat/64.png',
      region: _regionsList.eu,
      area: 93028,
      capital: 'Budapest',
      languages: {hun: 'Hungarian'},
    },
    {
      name: 'Switzerland',
      flagURL: 'https://www.flagsapi.com/CH/flat/64.png',
      region: _regionsList.eu,
      area: 41284,
      capital: 'Bern',
      languages: {
        deu: 'German',
        fra: 'French',
        ita: 'Italian',
        roh: 'Romansh',
      },
    },
    {
      name: 'Belarus',
      flagURL: 'https://www.flagsapi.com/BY/flat/64.png',
      region: _regionsList.eu,
      area: 207600,
      capital: 'Minsk',
      languages: {bel: 'Belarusian', rus: 'Russian'},
    },
    {
      name: 'France',
      flagURL: 'https://www.flagsapi.com/FR/flat/64.png',
      region: _regionsList.eu,
      area: 551695,
      capital: 'Paris',
      languages: {fra: 'French'},
    },
    {
      name: 'United Kingdom',
      flagURL: 'https://www.flagsapi.com/GB/flat/64.png',
      region: _regionsList.eu,
      area: 242900,
      capital: 'London',
      languages: {eng: 'English'},
    },
    {
      name: 'Croatia',
      flagURL: 'https://www.flagsapi.com/HR/flat/64.png',
      region: _regionsList.eu,
      area: 56594,
      capital: 'Zagreb',
      languages: {hrv: 'Croatian'},
    },
    {
      name: 'Mexico',
      flagURL: 'https://www.flagsapi.com/MX/flat/64.png',
      region: _regionsList.na,
      area: 1964375,
      capital: 'Mexico City',
      languages: {spa: 'Spanish'},
    },
    {
      name: 'Canada',
      flagURL: 'https://www.flagsapi.com/CA/flat/64.png',
      region: _regionsList.na,
      area: 9984670,
      capital: 'Ottawa',
      languages: {eng: 'English', fra: 'French'},
    },
    {
      name: 'United States',
      flagURL: 'https://www.flagsapi.com/US/flat/64.png',
      region: _regionsList.na,
      area: 9372610,
      capital: 'Washington D.C.',
      languages: {eng: 'English'},
    },
    {
      name: 'Argentina',
      flagURL: 'https://www.flagsapi.com/AR/flat/64.png',
      region: _regionsList.sa,
      area: 2780400,
      capital: 'Buenos Aires',
      languages: {grn: 'Guaran\u00ed', spa: 'Spanish'},
    },
    {
      name: 'Brazil',
      flagURL: 'https://www.flagsapi.com/BR/flat/64.png',
      region: _regionsList.sa,
      area: 8515767,
      capital: 'Bras\u00edlia',
      languages: {por: 'Portuguese'},
    },
    {
      name: 'Bolivia',
      flagURL: 'https://www.flagsapi.com/BO/flat/64.png',
      region: _regionsList.sa,
      area: 1098581,
      capital: 'Sucre',
      languages: {
        aym: 'Aymara',
        grn: 'Guaran\u00ed',
        que: 'Quechua',
        spa: 'Spanish',
      },
    },
    {
      name: 'Paraguay',
      flagURL: 'https://www.flagsapi.com/PY/flat/64.png',
      region: _regionsList.sa,
      area: 406752,
      capital: 'Asunci\u00f3n',
      languages: {grn: 'Guaran\u00ed', spa: 'Spanish'},
    },
    {
      name: 'Egypt',
      flagURL: 'https://www.flagsapi.com/EG/flat/64.png',
      region: _regionsList.af,
      area: 1002450,
      capital: 'Cairo',
      languages: {ara: 'Arabic'},
    },
    {
      name: 'Tunisia',
      flagURL: 'https://www.flagsapi.com/TN/flat/64.png',
      region: _regionsList.af,
      area: 163610,
      capital: 'Tunis',
      languages: {ara: 'Arabic'},
    },
    {
      name: 'South Sudan',
      flagURL: 'https://www.flagsapi.com/SS/flat/64.png',
      region: _regionsList.af,
      area: 619745,
      capital: 'Juba',
      languages: {eng: 'English'},
    },
    {
      name: 'Saudi Arabia',
      flagURL: 'https://www.flagsapi.com/SS/flat/64.png',
      region: _regionsList.as,
      area: 2149690,
      capital: 'Riyadh',
      languages: {ara: 'Arabic'},
    },
    {
      name: 'Turkey',
      flagURL: 'https://www.flagsapi.com/TR/flat/64.png',
      region: _regionsList.as,
      area: 783562,
      capital: 'Ankara',
      languages: {tur: 'Turkish'},
    },
    {
      name: 'Algeria',
      flagURL: 'https://www.flagsapi.com/DZ/flat/64.png',
      region: _regionsList.af,
      area: 2381741,
      capital: 'Algiers',
      languages: {ara: 'Arabic'},
    },
    {
      name: 'China',
      flagURL: 'https://www.flagsapi.com/CN/flat/64.png',
      region: _regionsList.as,
      area: 9706961,
      capital: 'Beijing',
      languages: {cmn: 'Mandarin'},
    },
    {
      name: 'Japan',
      flagURL: 'https://www.flagsapi.com/JP/flat/64.png',
      region: _regionsList.as,
      area: 377930,
      capital: 'Tokyo',
      languages: {jpn: 'Japanese'},
    },
    {
      name: 'North Korea',
      flagURL: 'https://www.flagsapi.com/KP/flat/64.png',
      region: _regionsList.as,
      area: 120538,
      capital: 'Pyongyang',
      languages: {kor: 'Korean'},
    },
    {
      name: 'South Korea',
      flagURL: 'https://www.flagsapi.com/KR/flat/64.png',
      region: _regionsList.as,
      area: 100210,
      capital: 'Seoul',
      languages: {kor: 'Korean'},
    },
    {
      name: 'Australia',
      flagURL: 'https://www.flagsapi.com/AU/flat/64.png',
      region: _regionsList.oc,
      area: 7692024,
      capital: 'Canberra',
      languages: {eng: 'English'},
    },
    {
      name: 'New Zealand',
      flagURL: 'https://www.flagsapi.com/NZ/flat/64.png',
      region: _regionsList.oc,
      area: 270467,
      capital: 'Wellington',
      languages: {
        eng: 'English',
        mri: 'M\u0101ori',
        nzs: 'New Zealand Sign Language',
      },
    },
  ];

  module.getCountryListByRegion = (region) =>
    _countriesList.filter((country) => country.region === region);
  module.getCountryListByLanguage = (language) =>
    _countriesList.filter((country) =>
      Object.values(country.languages).includes(language)
    );
  module.getRegionsList = () => Object.values(_regionsList);
  module.getLanguagesList = () => [
    ..._countriesList.reduce((languagesList, country) => {
      const countryLanguages = Object.values(country.languages);

      return languagesList.add(...countryLanguages);
    }, new Set()),
  ];
})(externalService);
