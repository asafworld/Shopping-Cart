const container = document.querySelector('.container');
const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const addedCartItems = document.querySelector('ol.cart__items');
// Seletores DOM destinados a capturarem elementos HTML para atualização visual e informacional da página.

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
} 
// createProductImageElement cria a imagem de cada produto, exibida junto as suas informações.

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// createCustomElement está direcionada a padronizar a criação de um elemento HTML de acordo com as informações passadas por parâmetro.

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
// Tal função completa a função superior, tomando sua tarefa e passando os parâmetros para criação dos elementos que mostram os items recebidos pela API na página. 

const getLoading = () => {
  const loadingSpan = document.createElement('span');
  loadingSpan.className = 'loading';
  loadingSpan.innerHTML = 'carregando...';
  loadingSpan.style.color = 'green';
  items.appendChild(loadingSpan);
};

const excludeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

const getFetchProducts = async () => {
  getLoading();
  const result = await fetchProducts('computador');
  result.results.forEach((each) => {
    const { id, title, thumbnail } = each;
    const resultFinal = createProductItemElement({ sku: id, name: title, image: thumbnail });
    items.appendChild(resultFinal);
  });
  excludeLoading();
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const priceSection = document.createElement('section');
priceSection.className = 'total-price';
container.appendChild(priceSection);
const priceH1 = document.createElement('h1');
priceH1.className = 'price';
priceSection.appendChild(priceH1);
// Informações globais destinadas a soma e subtração do valor dos produtos adicionados e retirados do carrinho de compra. 

const priceSums = () => {
  const lineCartItem = addedCartItems.children;
  console.log(lineCartItem);
  // const cartItemArray = Array.from(lineCartItem);
  let totalPrice = 0;
  for (let i = 0; i < lineCartItem.length; i += 1) {
    const iArray = lineCartItem[i].innerHTML.split('$');
    console.log(iArray);
     totalPrice += Number(iArray[1]);
  }
  priceH1.innerHTML = totalPrice;
};

function cartItemClickListener(event) {
  event.target.remove();
  priceSums();
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
  priceSums();
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

// A sessão a seguir é destina a salvar e imprimir as informações do carrinho.  
const deleteSavedItems = (func) => {
  addedCartItems.addEventListener('click', func);
};

const showSavedCartItems = () => {
  const olSaved = getSavedCartItems();
  const cartItemsOl = document.querySelector('ol.cart__items');
  cartItemsOl.innerHTML = olSaved;
  priceSums();
};

const deleteAllLines = () => {
  const addedItems = addedCartItems.children;
  for (let i = 0; i < addedItems.length; i) {
    addedItems[0].remove();
  }
  priceSums();
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
