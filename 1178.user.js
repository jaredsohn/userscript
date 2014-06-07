// ==UserScript==
// @name          eBay Shipping Preview
// @author        Michael Felix - gm@mfelix.allmail.net
// @namespace     http://felixfamily.net/gm
// @description   Show Ebay shipping costs section in a preview div when the price is clicked.
// @include       http*://*search.ebay.com/*
// @include       http*://*.listings.ebay.com/*
// @include       http*://product.ebay.com/*
// @date          2005-6-23
// @version       1.1
// @GM_version    0.3.3
// ==/UserScript==

(function(){

function highlight(event){
    event.target.style.border = '1px solid red';
}

function hideShipping(event){
    var div = document.getElementById('es_shippingDiv');
    div.innerHTML = 'Loading...';
    div.style.visibility = 'hidden';
    event.target.style.border = '1px dotted red';
}

function showShipping(event){  
    event.target.style.border='1px dotted green';
    
    var tmp = event.target;
    while (!tmp || tmp.nodeName.toUpperCase() != 'TR'){
        tmp = tmp.parentNode;       
    }
    
    var link = tmp.getElementsByTagName('a')[0];
    if (!link)
        return;
    
    var div = document.getElementById('es_shippingDiv');
    div.style.visibility = 'visible';

    GM_xmlhttpRequest({ method:"GET", url:link,
        onload:function(result) {
            if (result){            
                var theTables = result.responseText.replace(/[\n\r]/gm, ' ').match(re);
                if (theTables){
                    event.target.style.border = '1px solid green';                
                    div.innerHTML = theTables;
                }
                else {
                    div.innerHTML = 'Could not load shipping section.'
                }    
            }
            else {
                div.innerHTML = 'Could not load shipping section.'
            }
        }
    });

}

var re = /(?=<table[^S]+?<a name="ShippingPayment").+(?=<table .*?<table.*?<b>Payment methods accepted)/;

var div = document.createElement('div'); 
div.style.border = '2px solid black';
div.style.background = '#ffffff';
div.style.position = 'fixed';
div.style.visibility = 'hidden';
div.style.top = '300';
div.style.left = '300';
div.id = 'es_shippingDiv';
div.innerHTML = '<p>Loading...</p>';
document.body.insertBefore(div, document.body.firstChild);

var prices = document.evaluate("//span[@class='bold']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var t = 0; t < prices.snapshotLength; t++){
    var price = prices.snapshotItem(t);
    if (price.innerHTML.match(/\$\d+\.\d{2}/)){
        price.addEventListener('mouseover', highlight, true);
        price.addEventListener('click', showShipping, true);
        price.addEventListener('mouseout', hideShipping, true);
        price.style.border = '1px dotted red';
    }
}

})();
