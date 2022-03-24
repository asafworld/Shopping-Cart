require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa de fetchProducts é uma função.', async () => {
    expect.assertions(1);
    await expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se fetch é chamado ao passo que fetchProducts é executada com parâmetro *computador*', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se ao executar fetchProducts com parâmetro *computador*, fetch é chamado com a url correta.', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Testa se o retorno da função fetchProducts(computador) é um objeto igual a computadorSearch', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch)
  });

  it('Testa se, ao executar fetchProducts sem argumento, retorna mensagem de erro', async () => {
    expect.assertions(1);
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'))
  });
});
