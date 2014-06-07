// ==UserScript==
// @name       WRM Buyer
// @namespace  http://userscripts.org/scripts/show/178123
// @version    0.21
// @description  Buys WRM at set price.
// @match      http://www.erepublik.com/en/economy/market/1/12/1/citizen/0/price_asc/1
// @copyright  
// ==/UserScript==


// below is the workflow
var string, price = 0, stock = 0, value = 0, totalPrice = 0, avgPrice = 0, nr = 0,
pattern = /[0-9]+/g;

// crawls through the page listings to get the average price
$j(".price_sorted tr").each(function() {
    string = $j(this).find("sup");
    if (string.text() != null) {
        value = string.text().match(pattern);
        price = value / 100;
        totalPrice += price;
        nr ++;
    }
});

// computes the average price
avgPrice = totalPrice / nr;
totalPrice = totalPrice.toPrecision(2);
avgPrice = avgPrice.toPrecision(2);

// crawls through the listings to find the below-average prices
$j(".price_sorted tr").each(function() {
    string = $j(this).find("sup");
    if (string.text() != null) {
        value = string.text().match(pattern);
        price = value / 100;
        // at this point, we know the price
        if (price < avgPrice) { // we only take the ones below the average
            stock = $j(this).find(".m_stock").text().replace(/,/g, '').match(pattern); // finds the max amount available
            $j(this).find(".m_quantity input").val(stock); // fills in the max amount
            $j(this).find(".m_buy a").trigger('click'); // clicks the button
        }
    }
});

setTimeout(
    'location.reload()',
    15000
);