const books = Array.from(document.querySelectorAll('.book'));

const booksOrdered = books.map((book, index) => {
  let order = book
    .querySelector('a')
    .textContent.trim()
    .split('.')[0]
    .split(' ')[1];
  return { order: Number(order), book };
});

const orderMap = {
  'Введение': 1,
  'Предисловие': 2,
  'Глава': 3,
  'Приложение': 4,
};

const getOrder = (text) => {
  for (const key in orderMap) {
    if (text.startsWith(key)) return orderMap[key];
  }
  return Infinity;
};

const sortChaptersInBooks = (books) => {
  books.forEach((book) => {
    const ul = book.book.querySelector('ul');
    const chapters = Array.from(ul.querySelectorAll('li'));

    const sortedChapters = chapters.sort((a, b) => {
      const orderA = getOrder(a.textContent.trim());
      const orderB = getOrder(b.textContent.trim());

      if (orderA === 3 && orderB === 3) {
        const chapterNumberA = parseInt(
          a.textContent.split(':')[0].split(' ')[1],
        );
        const chapterNumberB = parseInt(
          b.textContent.split(':')[0].split(' ')[1],
        );
        return chapterNumberA - chapterNumberB;
      }

      return orderA - orderB;
    });

    ul.innerHTML = '';
    sortedChapters.forEach((chapter) => ul.append(chapter));
  });
};

booksOrdered.sort((a, b) => a.order - b.order);

for (let book of booksOrdered) {
  document.querySelector('.books').append(book.book);
}

booksOrdered[2].book.querySelector('a').textContent =
  'Книга 3. this и Прототипы Объектов';
booksOrdered[5].book
  .querySelector('ul')
  .insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');

document.body.style.backgroundImage = `url('/image/you-dont-know-js.jpg')`;
document.querySelector('.adv').remove();
sortChaptersInBooks(booksOrdered);
