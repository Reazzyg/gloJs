'use strict';

const appData = {
  allServicePrices: 0,
  servicePercentPrice: 0,
  fullPrice: 0,
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  service1: '',
  service2: '',
  rollback: 43,

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    this.title = prompt('Как называется ваш проект?', 'asd');
    this.screens = prompt('Какие типы экранов нужно разработать?', 'asd');

    do {
      let q = prompt('Сколько будет стоить данная работа?');
      if (q === null) {
        this.screenPrice = 0;
        break;
      }
      this.screenPrice = parseFloat(q.trim());
    } while (!this.isNumber(this.screenPrice));

    this.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        this.service1 = prompt('Какой дополнительный тип услуги нужен?', 'qq');
      } else if (i === 1) {
        this.service2 = prompt('Какой дополнительный тип услуги нужен?', 'ww');
      }
      let price;
      do {
        let q = prompt('Сколько это будет стоить?');
        if (q === null) {
          price = 0;
          break;
        }
        price = parseFloat(q.trim());
      } while (!this.isNumber(price));
      sum += price;
    }
    return sum;
  },
  showTypeof: function (arg) {
    console.log(arg + ` : `, typeof arg);
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else if (price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что то пошло не так';
    }
  },
  getFullPrice: function (...args) {
    return args.reduce((acc, el) => acc + el, 0);
  },
  getTitle: function (title) {
    return title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
  },
  getServicePercentPrices: function (price, rollback) {
    return Math.ceil(price - price * (rollback / 100));
  },

  logger: function () {
    for (let elem in this) {
      console.log(elem);
    }
    console.log(this.getRollbackMessage(this.fullPrice));
    console.log(this.screens.toLowerCase().split(', '));
  },
  start: function () {
    this.asking();
    this.allServicePrices = this.getAllServicePrices();

    this.servicePercentPrice = this.getServicePercentPrices(
      this.fullPrice,
      this.rollback,
    );

    this.fullPrice = this.getFullPrice(this.screenPrice, this.allServicePrices);

    this.title = this.getTitle(this.title);
    this.logger();
  },
};

appData.start();
