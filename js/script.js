'use strict';

const appData = {
  allServicePrices: 0,
  fullPrice: 0,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePercentPrice: 0,
  servicePricesNumber: 0,
  servicePricesPercent: 0,
  rollback: null,
  buttons: null,
  plus: null,
  inputs: [],

  init: function () {
    this.getElements();
    this.addTitle();
    this.addEventListeners();
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    // this.logger();
    this.showResult();
  },

  getElements: function () {
    this.title = document.getElementsByTagName('h1')[0].textContent;
    this.otherItemsPercent = document.querySelectorAll('.other-items.percent');
    this.otherItemsNumber = document.querySelectorAll('.other-items.number');
    this.rollbackVal = document.querySelector('.rollback .range-value');
    this.rollbackInput = document.querySelector('.rollback [type="range"]');
    this.buttonStart = document.getElementsByClassName('handler_btn')[0];
    this.buttonReset = document.getElementsByClassName('handler_btn')[1];
    this.plus = document.querySelector('.screen-btn');
    this.inputTotal = document.getElementsByClassName('total-input')[0];
    this.inputTotalCount = document.getElementsByClassName('total-input')[1];
    this.inputTotalCountOther =
      document.getElementsByClassName('total-input')[2];
    this.inputTotalFullCount =
      document.getElementsByClassName('total-input')[3];
    this.inputTotalCountRollback =
      document.getElementsByClassName('total-input')[4];
    this.screensCollection = document.querySelectorAll('.screen');
  },

  validateScreens: function () {
    return Array.from(this.screensCollection).every((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      return select.value !== '' && input.value !== '' && +input.value > 0;
    });
  },

  addEventListeners: function () {
    this.buttonStart.addEventListener('click', () => {
      this.validateScreens();
      if (this.validateScreens()) {
        this.start();
      }
    });

    this.plus.addEventListener('click', () => {
      this.addScreenBlock();
      this.screensCollection = document.querySelectorAll('.screen');
      this.validateScreens();
    });

    this.rollbackInput.addEventListener('input', () => {
      this.rollback = +this.rollbackInput.value;
      this.rollbackVal.textContent = this.rollbackInput.value + '%';
    });
  },

  addScreenBlock: function () {
    const cloneScreen = this.screensCollection[0].cloneNode(true);
    this.screensCollection[this.screensCollection.length - 1].after(
      cloneScreen,
    );
  },

  addScreens: function () {
    this.screens = [];
    this.screensCollection = document.querySelectorAll('.screen');
    this.screensCollection.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  addServices: function () {
    this.otherItemsPercent.forEach((service) => {
      const check = service.querySelector('input[type="checkbox"]');
      const label = service.querySelector('label');
      const input = service.querySelector('input[type="text"]');
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    this.otherItemsNumber.forEach((service) => {
      const check = service.querySelector('input[type="checkbox"]');
      const label = service.querySelector('label');
      const input = service.querySelector('input[type="text"]');
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addTitle: function () {
    document.title = this.title;
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce((acc, el) => acc + el.price, 0);
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePercentPrice +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePercentPrice;

    this.priceWithRollback = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );
  },

  showResult: function () {
    this.inputTotal.value = this.screenPrice;
    this.inputTotalCount.value = this.screens.length;
    this.inputTotalCountOther.value =
      this.servicePercentPrice + this.servicePricesNumber;
    this.inputTotalFullCount.value = this.fullPrice;
    this.inputTotalCountRollback.value = this.priceWithRollback;
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

  logger: function () {
    console.log(this.services);
    console.log(this.fullPrice);
    console.log(this.getRollbackMessage(this.fullPrice));
    console.log(this.screens);
    console.log(this.title);
  },
};

appData.init();
