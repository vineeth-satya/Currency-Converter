const express = require('express');
const ejs = require('ejs')
const request = require('request');
const v = require('body-parser')

const app = express();
app.set('view engine', 'ejs');

app.use(v.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('currency.ejs', { final: "", amount: "", country1: "", country2: "", });
});

app.post('/', (req, res) => {
  const fromCurrency = req.body.fromCurrency;
  const toCurrency = req.body.toCurrency;
  const amount = parseFloat(req.body.amount);
  console.log(amount);
  console.log(toCurrency);
  console.log(fromCurrency);


  request.get({
    url: 'https://api.api-ninjas.com/v1/convertcurrency?want=' + toCurrency + '&have=' + fromCurrency + '&amount=' + amount,
    headers: {
      'X-Api-Key': 'x1pv7RtyedcS7Q1QMMbDLw==XqM9dHCKp7ZiQI6W'
    },
  }, function(error, response, body) {

    const responseBody = JSON.parse(body);
    const result = responseBody.new_amount;
    console.log(result);
    res.render('currency.ejs', { final: result, amount: amount, country1: fromCurrency, country2: toCurrency, });

  });

});


app.listen(3000, () => {
  console.log("server start");
});
