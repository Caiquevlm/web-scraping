const puppeteer = require('puppeteer');


let scrape = async () => {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://globoesporte.globo.com/futebol/brasileirao-serie-a/');
    await page.waitFor(1000);

    // Scrape
    const result = await page.evaluate(() => {

        function obterLista(tabela) {
            return {
                posicao: tabela.getElementsByClassName('classificacao__equipes--posicao')[0].innerText,
                nome: tabela.getElementsByClassName('classificacao__equipes--nome')[0].innerText,
            }
        }

        function adicionarTabelaCampeonato(tabelaTime) {
            retorno.push(tabelaTime);
        }

        const retorno = [];

        document.querySelectorAll('.tabela__equipes .classificacao__tabela--linha')
        .forEach(
            tabela => adicionarTabelaCampeonato(obterLista(tabela))
        )

        return retorno;

    });

    browser.close();

    return result;

};

scrape().then((value) => {
    console.log(value);
})
