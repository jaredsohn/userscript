// ==UserScript==
// @name           IAPC Pricelist Orderator
// @namespace      http://userscripts.org/users/108530
// @description    Orders items in IAPC's pricelist by price
// @include        http://www.iapc.utwente.nl/pricelist/*
// ==/UserScript==

(function() {
    var table     = document.querySelector('table.price_list');
    var priceList = table.querySelectorAll('tr');
    if (!priceList) {
        return;
    }

    var prices = [];
    for (var i = 1; i < priceList.length; i++) {
        prices.push({
            price: parseFloat(priceList[i].querySelectorAll('td')[2].textContent),
            row: priceList[i]
        });
    }

    var activator = priceList[0].querySelectorAll('td')[2];
    activator.textContent = 'sort...';
    activator.style.textAlign = 'center';
    activator.style.color = '#f00';
    activator.style.cursor = 'pointer';
    activator.addEventListener('click', function() {
        if (!activator.sorted) {
            for (var i = 1; i < priceList.length; i++) {
                priceList[i].parentNode.removeChild(priceList[i]);
            }
            
            for (var i = 0; i < prices.length; i++) {
                var placed = false;
                for (var j = 1; j < table.children.length; j++) {
                    if (table.children[j].title > prices[i].price) {
                        table.insertBefore(prices[i].row, table.children[j]);
                        table.children[j].title = prices[i].price;
                        placed = true;
                        break;
                    }
                }
                if (!placed) {
                    table.appendChild(prices[i].row);
                    table.lastChild.title = prices[i].price;
                }
            }
            activator.textContent = '';
            activator.sorted = true;
        }
    }, false);
})();
