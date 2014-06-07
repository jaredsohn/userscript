// Version 1.0
// 24-09-2007
// Released under the GPL license
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name           Mindfactory
// @description    Fügt die Anzahl der Kommentare in den Produktübersichten ein
// @include        http://www.mindfactory.de/products.php*
// ==/UserScript==

addComments();

function extractCommentFromPage(product_element) {
   
   GM_xmlhttpRequest({
    method: 'GET',
    url: product_element.href,
    onload: function(page) {
      var comments = getNumberofComments(page.responseText);
      product_element.innerHTML+='&nbsp;&nbsp;['+comments+']';
    }
  });
}

function addComments() {
  var h2s = document.getElementsByTagName('h2');
  
  // finde h2[@class='celebros_prod_name']
  for (var idx = 0; idx < h2s.length; idx++ ) {
    if (h2s[idx].getAttribute('class') == 'celebros_prod_name') {
      window.setTimeout(extractCommentFromPage,1,h2s[idx].childNodes[0]);
    }
  } 
}

function  getNumberofComments(htmlcode) {
  var temp = document.createElement('div');
  temp.innerHTML = htmlcode;

  // finde div[@class='product_nav_bottom']
  var div;
  var divs = temp.getElementsByTagName('div');
  for (var idx = 0; idx < divs.length; idx++ ) {
    if (divs[idx].getAttribute('class') == 'product_nav_bottom') {
      div = divs[idx];
      break;
    }
  }
  
  // finde <span>Meinungen (??)</span>
  var span;
  var spans = div.getElementsByTagName('span');
  for (var idx = 0; idx < spans.length; idx++ ) {
    if (spans[idx].innerHTML.match(/Meinungen \(/)) {
      var start = spans[idx].innerHTML.indexOf('(');
      var end = spans[idx].innerHTML.indexOf(')');
      return spans[idx].innerHTML.substr(start+1,end-start-1);
    }
  }
}