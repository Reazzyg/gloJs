class First {
  constructor() {}
  hello() {
    console.log('Привет я метод родителя');
  }
}

class Second extends First {
  hello() {
    super.hello();
    console.log('Привет я метод потомка');
  }
}

const second = new Second();
second.hello();
