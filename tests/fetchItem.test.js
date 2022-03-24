require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa de fetchItem é uma função.', async () => {
    expect.assertions(1);
    await expect(typeof fetchItem).toBe('function');
  });

  it('Testa se fetch é chamado ao passo que fetchItem é executada com parâmetro *MLB1615760527*', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se ao executar fetchItem com parâmetro *MLB1615760527*, fetch é chamado com a url correta.', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Testa se o retorno da função fetchItem(MLB1615760527) é um objeto igual a item', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  it('Testa se, ao executar fetchItem sem argumento, retorna mensagem de erro', async () => {
    expect.assertions(1);
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'))
  });
});
