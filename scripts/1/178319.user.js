// ==UserScript==
// @name       Erepublik WRM Buyer
// @namespace  http://userscripts.org/scripts/show/178319
// @version    0.27
// @description  Buys WRM at set price.
// @match      http://www.erepublik.com/en/economy/market/*/12/1/citizen/0/price_asc/1
// @copyright  2013+, user_184736
// ==/UserScript==


// below is the workflow
var string, error, price = 0, stock = 0, totalPrice = 0, avgPrice = 0, nr = 0, maxBuy = 0, maxPrice = 0,
    intValue = 0, floatValue = 0, maxBuyError = false, minCashLeft = 0, onHandCash = 0, totalAvailableCash = 0,
    pattern = /[0-9]+/;

maxPrice = 0.04; // maximum admitted buy price
minCashLeft = 100; // minimum admitted cash left (for food/weapons/moving/employees/etc)

// if we get an error message from a previous buy attempt, use it to adjust the quantity that we'll buy
error = $j(".error_message");
if (error.size() > 0) {
    maxBuy = error.text().replace(/,/g, '').match(pattern);
    maxBuyError = true;
}

// crawls through the page listings to get the average price
$j(".price_sorted tr").each(function() {
    string = $j(this).find("sup");
    if (string.text() != null) {
        intValue = +string.parent().find("strong").text().match(pattern);
        floatValue = +string.text().match(pattern);
        price = intValue + (floatValue / 100);
        totalPrice += price;
        nr ++;
    }
});

// computes the average price
avgPrice = totalPrice / nr;
totalPrice = totalPrice.toPrecision(2);
avgPrice = avgPrice.toPrecision(2);

// read thetotal amount of cash that we have
onHandCash = $j('#side_bar_currency_account_value').text().match(pattern);
totalAvailableCash = onHandCash - minCashLeft;


// crawls through the listings to find the below-average prices
$j(".price_sorted tr").each(function() {
    string = $j(this).find("sup");
    if (string.text() != null) {
        intValue = +string.parent().find("strong").text().match(pattern);
        floatValue = +string.text().match(pattern);
        price = intValue + (floatValue / 100);
        // at this point, we know the price
        if ((maxPrice == 0) || (maxPrice > 0 && price <= maxPrice)) {
            if (price < avgPrice) { // we only take the ones below the average
                stock = $j(this).find(".m_stock").text().replace(/,/g, '').match(pattern); // finds the max amount available
                if (maxBuyError && (stock > maxBuy)) {
                    stock = maxBuy;
                }
                maxBuy = Math.floor(totalAvailableCash / price);
                if (stock > maxBuy) {
                    stock = maxBuy;
                }
                $j(this).find(".m_quantity input").val(stock); // fills in the max amount
                $j(this).find(".m_buy a").trigger('click'); // clicks the button
            }
        }
    }
});

setTimeout(
    'location.reload()',
    15000
);
