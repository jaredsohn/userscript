// ==UserScript==
// @name          McAnimet ADS remover
// @version       2.1
// @namespace     zack0zack@gmail.com
// @description   Saca Propagandas ADS de McAnimet.net
// @include	  http://www.mcanime.net/*
// @copyright     zack0zack@gmail.com
// ==/UserScript==


var i, v = document.getElementsByTagName('iframe');
  for(i=0;i < v.length; i++ ) {
    v[i].parentNode.removeChild( v[i] );
}


window.addEventListener("load",function() {

var i, v = document.getElementsByTagName('iframe');
  for(i=0;i < v.length; i++ ) {
    v[i].parentNode.removeChild( v[i] );
}

var i, v = document.getElementsByTagName('div');
  for(i= v.length-1;i >= 1; i-- ) {
  if (v[i].className == 'top_ads' ){
    v[i].parentNode.removeChild( v[i] );
  }
}

i = 0;
v = document.getElementsByTagName('a');
for(i=0; i < v.length; i++ ) {
 if ( v[i].href.indexOf('javascript:MAX_footer_close_') > -1 ){
	window.location.href = v[i].href;
 }
}


},true)

