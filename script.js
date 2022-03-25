const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const addedCartItems = document.querySelector('ol.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const getFetchProducts = async () => {
  const result = await fetchProducts('computador');
  result.results.forEach((each) => {
    const { id, title, thumbnail } = each;
    const resultFinal = createProductItemElement({ sku: id, name: title, image: thumbnail });
    items.appendChild(resultFinal);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(addedCartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getFetchItem = async (itemID) => {
  const result = await fetchItem(itemID);
  const finalResult = createCartItemElement({ 
    sku: result.id, name: result.title, salePrice: result.price });
  cartItems.appendChild(finalResult);
  saveCartItems(addedCartItems.innerHTML);
};

const getButtons = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemID = getSkuFromProductItem(event.target.parentElement);
      getFetchItem(itemID);
    });
  });
};

const deleteSavedItems = (func) => {
  addedCartItems.addEventListener('click', func);
};

const showSavedCartItems = () => {
  const olSaved = getSavedCartItems();
  const cartItemsOl = document.querySelector('ol.cart__items');
  cartItemsOl.innerHTML = olSaved;
};

const deleteAllLines = () => {
  const addedItems = addedCartItems.children;
  for (let i = 0; i < addedItems.length; i) {
    addedItems[0].remove();
  }
  saveCartItems(addedCartItems.innerHTML);
};

const emptyCart = () => {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', deleteAllLines);
};

window.onload = async () => {
  await getFetchProducts();
  await getButtons();
  showSavedCartItems();
  deleteSavedItems(cartItemClickListener);
  emptyCart();
};
