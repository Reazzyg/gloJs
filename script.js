'use strict';

const appData = {
  allServicePrices: 0,
  servicePercentPrice: 0,
  fullPrice: 0,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  rollback: 43,

  start: function () {
    this.asking();
    this.addPrices();
    this.getServicePercentPrices(this.fullPrice, this.rollback);
    this.getFullPrice(this.screenPrice, this.allServicePrices);
    this.getTitle(this.title);
    this.logger();
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    let title = prompt('Как называется ваш проект?', 'asd');
    while (this.isNumber(title)) {
      title = prompt(
        'Название проекта должно быть строкой. Попробуйте еще раз:',
        'asd',
      );
    }
    this.title = title.trim();

    this.adaptive = confirm('Нужен ли адаптив на сайте?');

    for (let i = 0; i < 2; i++) {
      let name = prompt('Какие типы экранов нужно разработать?', 'asd');
      while (this.isNumber(name)) {
        name = prompt(
          'Название экрана должно быть строкой. Попробуйте еще раз:',
          'asd',
        );
      }

      let price = 0;
      do {
        price = prompt('Сколько будет стоить данная работа?');
        while (!this.isNumber(price)) {
          price = prompt('Цена должна быть числом. Попробуйте еще раз:', 'asd');
        }
      } while (!this.isNumber(price));
      price = parseFloat(price.trim());

      this.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt('Какой дополнительный тип услуги нужен?', 'qq');
      while (this.isNumber(name)) {
        name = prompt(
          'Название услуги должно быть строкой. Попробуйте еще раз:',
          'qq',
        );
      }
      let price;
      do {
        let q = prompt('Сколько это будет стоить?');
        while (!this.isNumber(q)) {
          q = prompt('Цена должна быть числом. Попробуйте еще раз:');
        }

        if (q === null) {
          price = 0;
          break;
        }
        price = parseFloat(q.trim());
      } while (!this.isNumber(price));

      this.services[`${name}${i}`] = price;
    }
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((acc, el) => acc + el.price, 0);

    for (let key in this.services) {
      this.allServicePrices += this.services[key];
    }
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
    this.fullPrice = args.reduce((acc, el) => acc + el, 0);
  },
  getTitle: function (title) {
    this.title =
      title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
  },

  getServicePercentPrices: function (price, rollback) {
    this.servicePercentPrice = Math.ceil(price - price * (rollback / 100));
  },

  logger: function () {
    console.log(this.services);
    console.log(this.fullPrice);
    console.log(this.getRollbackMessage(this.fullPrice));
    console.log(this.screens);
    console.log(this.title);
  },
};

appData.start();
