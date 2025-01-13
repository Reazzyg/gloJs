'use strict';

let title = prompt('Как называется ваш проект?');

let screens = prompt('Какие типы экранов нужно разработать?');

let screenPrice = Number(prompt('Сколько будет стоить данная работа?'));

let adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = Number(prompt('Сколько это будет стоить?'));

let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = Number(prompt('Сколько это будет стоить?'));

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let rollback = 43;

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice < 15000) {
  console.log('Скидка не предусмотрена');
} else {
  console.log('Что то пошло не так');
}

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);
// console.log(screens.length);
// console.log(
//   `Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани`,
// );
// console.log(
//   `Стоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`,
// );
// console.log(screens.toLowerCase().split(', '));
// console.log(fullPrice * (rollback / 100));
