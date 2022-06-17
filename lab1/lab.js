const axios = require('axios');
const cheerio = require('cheerio');

const incomes = [

	{currency: 'EUR', summ: 400, date: "2020-03-30"},
	
	{currency: 'EUR', summ: 500, date: "2020-02-20"},
	
	{currency: 'EUR', summ: 458, date: "2020-01-31"},

];

const report = {
	totalEarned: 0,
	totalEarnedUAH: 0,
	tax5percent: 0,
	rawData: [],	
};

const url = 'https://minfin.com.ua/currency/';

const getReport = async() => {
    const getEURdata = async(income) => {
        return new Promise((resolve, reject) => {
            const requestUrl = `${url}${income.currency}/${income.date}`;
            axios.get(requestUrl).then(function (data) {
                const $ = cheerio.load(data.data);
                resolve( $('span.mfm-posr').eq(0).text().substring(0, 7));
            });
        })
    }

    incomes.forEach(income => {
        getEURdata(income).then(result => {
            report.totalEarned += income.summ;
            report.totalEarnedUAH += income.summ * Number(result);
            report.tax5percent += income.summ * result * 0.05;
            report.rawData.push(income);
        })

    });
}

const func = getReport();
setTimeout(() => {
    console.log(report);
}, 1000);