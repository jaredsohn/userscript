// ==UserScript==
// @name        Neopet Shop Improvements
// @namespace   userscripts.org
// @description Hide shopkeeper image, count items stocked, and makes shop name clickable
// @include     http://www.neopets.com/objects.phtml?type=shop&obj_type=*
// ==/UserScript==
function hideClass(){
var shopImage = document.getElementsByClassName('contentModuleContent');
  for (i=0; i<1; i++){
    shopImage[i].style.display = 'block';
    shopImage[i].style.display = 'none'; 
  }
}

var header = document.getElementsByClassName('contentModuleHeader');
for (j = 0; j < 1; j++){
  header[j].addEventListener("click", hideClass, true);
}

var oldHTML = document.getElementsByClassName('contentModuleHeader');
var header2 = oldHTML[0].innerHTML;
var url = document.location.href;
// alert(url);
var html1 = "<a href='";
var html2 =  "'>";
var html3 = "</a>";
var newHTML = html1 + url + html2 + header2 + html3;
// alert(newHTML);
oldHTML[0].innerHTML = newHTML;

hideClass();
var children = document.getElementsByClassName('contentModuleContent');
for (k = 0; k<children.length; k++){
  var items = children[1].getElementsByTagName('img');
  for (m = 0; m < items.length; m++){ 
  } 
}

var shop = document.getElementsByClassName('contentModuleHeader');
for(n = 0; n < 1;n++){
  var old = shop[1].innerHTML;
  /*alert(old);*/
  shop[1].innerHTML = old + " (Stocked: " + m + ")";
}