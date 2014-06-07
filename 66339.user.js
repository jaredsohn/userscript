// ==UserScript==

// @name           NewEgg: Hard Drive Cost Per Gigabyte

// @namespace      http://userscripts.org/users/121260

// @description    Display the cost per gigabyte for each product in product listing pages

// @include        http://www.newegg.com/Product/ProductList.aspx?*

// ==/UserScript==



// http://joanpiedra.com/jquery/greasemonkey/

var GM_JQ = document.createElement('script');

GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';

GM_JQ.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(GM_JQ);



function GM_wait() {

  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }

  else { $ = unsafeWindow.jQuery; letsJQuery(); }

}

GM_wait();



function letsJQuery() {

  $('div#bcaProductCell div.itemCell').each(function(){

    // Each product consumes 3 TRs.  Work with first one.

    var tr = this; var gb = 0;

    var item = $(this).find('div.itemText span.itemDescription');

    if (item.text().indexOf('GB ') >= 0) {

        var match = /\b([0-9\.]+)GB\b/.exec(item.text());

        var gb = match[1];

    }

    if (item.text().indexOf('TB ') >= 0) {

        var match = /\b([0-9\.]+)TB\b/.exec(item.text());

        var gb = match[1] * 1000;

    }

    var costCol = $(this).find('div.itemAction ul.itemPricing');

    var match = /\$([0-9.]+)/.exec(costCol.find('li.priceFinal').text());

    var price = match ? parseFloat(match[1]) : 0;

    var match = /\$([0-9.]+) Shipping/.exec(costCol.find('li.priceShip').text());

    var shipping = match ? parseFloat(match[1]) : 0;

    costCol.append("<li><strong>$"+((price+shipping)/gb).toFixed(2)+"/GB</strong></li>");

  });

}