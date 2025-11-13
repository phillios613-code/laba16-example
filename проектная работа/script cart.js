// Данные
const products = [
    {id:1, name:'Разделочная доска', img: 'media/doska.png', imgtype:'png', desc:'Экологичная бамбуковая доска для кухни.', price:'1290'},
    {id:2, name:'Чайник керамический', img: 'media/pot.png', imgtype:'png', desc:'Стильный чайник на 1 литр, ручная работа.', price:'2450'},
    {id:3, name:'Нож разделочный', img: 'media/knife.jpg', imgtype:'jpg', desc:'Нож из нержавеющей стали.', price:'950'}
];

/*function addToCart(productName) {
  cart.push(productName);
  alert(`✅ "${productName}" добавлен в корзину!`);
  console.log('Текущая корзина:', cart);
}*/


// Загрузка корзины из localStorage или создание новой
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// === 2. Функции отображения ===

function renderCatalog() {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = products.map(p => `
    <div class="product-card">
      <picture>
        <source srcset="${p.img}" type="image/${p.imgtype}" />
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </picture>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${p.price} ₽</div>
      <button class="add-to-cart" data-id="${p.id}">В корзину</button>
    </div>
  `).join('');
}

function renderCart() {
  const cartEl = document.getElementById('cart');
  if (cart.length === 0) {
    cartEl.innerHTML = '<h2>Корзина</h2><p>Корзина пуста</p>';
    return;
  }

  const itemsHtml = cart.map(item => `
    <li>
      <span>${item.name}</span>
      <span>${item.price} ₽ <button class="remove-from-cart" data-id="${item.id}">Удалить</button></span>
    </li>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartEl.innerHTML = `
    <h2>Корзина</h2>
    <ul>${itemsHtml}</ul>
    <div class="total">Итого: ${total} ₽</div>
  `;
}

// === 3. Обработчики событий (делегирование) ===

document.getElementById('catalog').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const id = Number(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    if (product) {
      cart.push(product);
      saveCart();
      renderCart();
    }
  }
});

document.getElementById('cart').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-from-cart')) {
    const id = Number(e.target.dataset.id);
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  }
});

// === 4. Работа с localStorage ===

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// === 5. Инициализация ===

document.addEventListener('DOMContentLoaded', renderCatalog());
document.addEventListener('DOMContentLoaded', renderCart());