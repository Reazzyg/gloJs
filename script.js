'use strict';

let title = prompt('Как называется ваш проект?');

let screens = prompt('Какие типы экранов нужно разработать?');

let screenPrice = Number(prompt('Сколько будет стоить данная работа?'));

let adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = Number(prompt('Сколько это будет стоить?'));

let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = Number(prompt('Сколько это будет стоить?'));

let rollback = 43;

const showTypeof = function (arg) {
  console.log(arg, typeof arg);
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

const getAllServicePrices = function (...args) {
  return args.reduce((acc, el) => acc * el, 1);
};

function getFullPrice(...args) {
  return args.reduce((acc, el) => acc + el, 1);
}

function getTitle(title) {
  return title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
}

function getServicePercentPrices(price, rollback) {
  return Math.ceil(price - price * (rollback / 100));
}

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

let fullPrice = getFullPrice(screenPrice, allServicePrices);

getTitle(title);

showTypeof(title);
showTypeof(fullPrice);
showTypeof(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(screens.toLowerCase().split(', '));
