'use strict';

let allServicePrices;
let servicePercentPrice;
let fullPrice;
let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;

let rollback = 43;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'asd');
  screens = prompt('Какие типы экранов нужно разработать?', 'asd');

  do {
    let q = prompt('Сколько будет стоить данная работа?');
    if (q === null) {
      screenPrice = 0;
      break;
    }
    screenPrice = parseFloat(q.trim());
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

// const getAllServicePrices = function (...args) {
//   return args.reduce((acc, el) => acc * el, 1);
// };

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'qq');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'ww');
    }
    let price;
    do {
      let q = prompt('Сколько это будет стоить?');
      if (q === null) {
        price = 0;
        break;
      }
      price = parseFloat(q.trim());
    } while (!isNumber(price));
    sum += price;
  }
  return sum;
};

const showTypeof = function (arg) {
  console.log(arg + ` : `, typeof arg);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else if (price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что то пошло не так';
  }
};

function getFullPrice(...args) {
  return args.reduce((acc, el) => acc + el, 0);
}

function getTitle(title) {
  return title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
}

function getServicePercentPrices(price, rollback) {
  return Math.ceil(price - price * (rollback / 100));
}

asking();

allServicePrices = getAllServicePrices();

servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

fullPrice = getFullPrice(screenPrice, allServicePrices);

title = getTitle(title);

showTypeof(title);
showTypeof(fullPrice);
showTypeof(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(screens.toLowerCase().split(', '));
