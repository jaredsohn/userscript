// ==UserScript==
// @name        Newegg ComboEgger
// @description Automatically retrieves and displays egg ratings for all products in a Newegg ComboBundle page.
// @namespace   com.radreichley
// @author      JamesSwift
// @include     http://www.newegg.tld/Product/ComboBundleDetails.aspx?ItemList=*
// @version     1
// @grant       GM_xmlhttpRequest
// @copyright   2014+
// ==/UserScript==

  /////////////
 // Helpers //
/////////////

// Easy way to get correct image sprite offset
var starOffsetLookup = new Array(0, -140, -120, -100, -80, -60);

// All of the styling information was taken from the styling used on normal product pages
// e.g. http://www.newegg.com/Product/Product.aspx?Item=N82E16883220457
var buildStarsNode = function(rating, numberOfReviews) {
    var node = document.createElement('img');
    node.setAttribute('title', 'Based on ' + numberOfReviews + ' reviews');
    node.setAttribute('src', 'http://images10.newegg.com/WebResource/Themes/2005/Nest/none.gif');
    
    node.style.width = '60px';
    node.style.height = '16px';
    node.style.backgroundImage = 'url(\'http://images10.newegg.com/WebResource/Themes/2005/Nest/spr_product.6.6.2.png\')';
    node.style.backgroundColor = 'transparent';
    node.style.backgroundRepeat = 'no-repeat';
    node.style.backgroundPosition = '-120px ' + starOffsetLookup[rating] + 'px';
    
    return node;
};

// Example endpoint:
// http://www.ows.newegg.com/Products.egg/N82E16811147010/ProductDetails
//
// Example response:
// ...
// "ReviewSummary": {
//     "Rating": 4,
//     "TotalReviews": "[845]"
// }
// ...

var getRating = function(productId, nodeToUpdate) {
    nodeToUpdate.appendChild( document.createElement('br') );
    
    var resultNode = document.createElement('div');
    resultNode.textContent = 'Loading...';
    nodeToUpdate.appendChild( resultNode );
    
    var url = 'http://www.ows.newegg.com/Products.egg/' + productId + '/ProductDetails';
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': 'ComboEgger',
          'Accept': 'application/json'
        },
        onreadystatechange: function(response) {
            if (response.readyState==4 && response.status==200) {
                var json = JSON.parse(response.responseText);
                var stars = json['ReviewSummary']['Rating'];
                var numberOfReviews = json['ReviewSummary']['TotalReviews'].match(/\[(.+)\]/)[1];
                nodeToUpdate.replaceChild(buildStarsNode(stars, numberOfReviews), resultNode);
            }
        }
      }
    );
};

  /////////////
 // Do Work //
/////////////

var productRows = document.evaluate('//tr[td[contains(@class,\'desc\')]]', document.querySelector('.comboOverview tbody'), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var row, productId, priceNode;
for( var i = 0; i < productRows.snapshotLength; i++) {
    row = productRows.snapshotItem(i);
    
    // Example link:
    // http://www.newegg.com/Product/Product.aspx?Item=N82E16822148840
    productId = row.querySelector('.desc a').getAttribute('href').match(/Item=(\w+)/)[1];
    priceNode = row.querySelector('.price');
    getRating(productId, priceNode);
}

console.log('ComboEgger loaded');
