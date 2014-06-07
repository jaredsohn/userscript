// ==UserScript==
// @name        MobileRead Kindle Price Check (amazon.com.br)
// @namespace   kakapo.public
// @description Checks price of Kindle ebook links in MobileRead forum posts. Translates amazon.com links into your local site, please install the correct version.
// @include     http://www.mobileread.com/forums/showthread.php*
// @version     3
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var site_regex = /^(http|https):\/\/(www\.)?amazon\.(com|com\.br)(\/.*)/;
var migrate_regex = /amazon\.com/;
var migrate_replacement = 'amazon.com.br';
var currency_prefix = 'R$ ';

var ebook_url_regexs = [
  /^\/dp\//,
  /^\/[^\/]+\/dp\//,
  /^\/gp\/product\//,
  /^\/exec\/obidos\/ASIN\//
];

var check_price = function(elements, url) {
  var xhr = GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(response) {
      var data = response.responseText;
      var pos0 = data.indexOf('class="priceLarge"');
      var pos1 = data.indexOf('>', pos0);
      var pos2 = data.indexOf('<', pos1);
      var price = data.substring(pos1 + 1, pos2).trim();
      if (price == '') {
        price = 'N/A';
      }
      var color = price == 'Free' || price == currency_prefix+'0.00' || price == currency_prefix+'0,00' || price == currency_prefix+'0' ? 'red' : 'blue';
      pos0 = data.indexOf('class="iou_cust"');
      if (pos0 >= 0) {
        price += ' already own';
      }
      for (var i = 0; i < elements.length; i++) {
	elements[i].insertAdjacentHTML('afterend', ' <span style="color:'+color+'">('+price+')</span>');
      }
    }
  });
}

var a = document.getElementsByTagName('a');
var to_check = {};
for (var i = 0; i < a.length; i++) {
  var url = a[i].href;
  var parts = site_regex.exec(url);
  if (parts) {
    if (migrate_regex) {
      url = url.replace(migrate_regex, migrate_replacement);
      a[i].href = url;
    } 
    for (var j = 0; j < ebook_url_regexs.length; j++)  {
      if (ebook_url_regexs[j].test(parts[parts.length-1])) {
        if (!to_check[url]) {
          to_check[url] = [];
        }
        to_check[url].push(a[i]);
      }
    }
  }
}

for (var k in to_check) {
  check_price(to_check[k], k);
}

