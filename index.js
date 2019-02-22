const puppeteer = require('puppeteer');

let scrape = async () => {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    data = new Date().toLocaleDateString("pt-BR", {  month: 'narrow', day: 'numeric' }).split(" ");

    mounth = [ 'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

    await page.goto('https://pt.wikipedia.org/wiki/' + data[1] + '_de_' + mounth[data[0] - 1]);
    await page.waitFor(1000);

    const result = await page.evaluate(() => {

        eventsUl = [];

        elementos = document.getElementsByClassName("mw-parser-output");

        elementos[0].childNodes.forEach(value => {

            if ( value.nodeName == "UL" && eventsUl.length <= 0 ) {
                eventsUl.push(value);
                return false;
            }

        });

        events = [];

        eventsUl.forEach(linha => {
            events.push(linha.innerText);
        });

        return events;

    });

    browser.close();

    return result;

};

scrape().then((value) => {
    console.log(value);
})
