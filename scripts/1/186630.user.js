// ==UserScript==
// @name       Frys.com Amazon Data
// @namespace  https://github.com/keyvanfatehi/noapikey_amazon_rating
// @version    0.1
// @description  Puts Amazon.com ratings and prices next to items
// @require http://code.jquery.com/jquery-latest.js
// @match      http://www.frys.com/search?*
// @copyright  2013+, Keyvan Fatehi
// ==/UserScript==

function template() {
  return $('<div> \
           <div id="amazon-loading">Fetching Amazon data...</div> \
           <div id="amazon-data" style="display:none"> \
           <p>Amazon.com <span id="amazon-match-closeness"></span> Match: <a id="amazon-product-name" href="#" target="_blank"></a> </p>\
           <p>Amazon.com Price: <span id="amazon-price"></span></p> \
           <p>Amazon.com Rating: <span id="amazon-rating"></span> out of 5</p> \
           </div> \
           </div>');
}

function AmazonRatingURL(k) {
  return "http://amazon-rating-api.herokuapp.com/amazon/rating/"+k; 
  //return "http://127.0.0.1:1337/amazon/rating/"+k;
}

function eachProductLink(callback) {
  $('a font[face=Verdana][size=1]').each(function(i,e) {
    callback($(e).parent('a'));
  });
};

eachProductLink(function(a) {
  var div = template();
  a.after(div);

  var price = div.find('#amazon-price');
  var link = div.find('#amazon-product-name');
  var loading = div.find('#amazon-loading');
  var amazon = div.find('#amazon-data');
  var rating = div.find('#amazon-rating');
  var closeness = div.find('#amazon-match-closeness');

  var productName = a.text().trim();
  $.getJSON(AmazonRatingURL(productName), function(data){

    if (data.name === productName) {
      closeness.text("Exact");
    } else {
      closeness.text("Possible");
    }

    link.attr('href', data.url).text(data.name);

    price.text(data.price);
    rating.text(data.rating);

    loading.hide();
    amazon.show();

  }).fail(function() {
    div.text('Fail to retrieve Amazon data.');
  });
});
