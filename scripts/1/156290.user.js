// ==UserScript==
// @name           IMDb image resizer
// @description    duh
// @include        http*://*.imdb.*
// ==/UserScript==

function showimdbimg(){

if( location.href.indexOf('/media') != -1 ) {

if ($('primary-img')) {

lowresadd = $('primary-img').src;

  	var imdbtemprl=new RegExp("_.*", "gi");
    lowresadd = lowresadd.replace(imdbtemprl,"_SCRM.jpg");

replacelater = $("controls").getElementsByTagName("div")[0].innerHTML;


$("controls").getElementsByTagName("div")[0].innerHTML = replacelater + '<a href="'+lowresadd+'" class="btn secondary small">show hi res</a>';

}


}

}

function $(id) {
  return document.getElementById(id);
}

   window.addEventListener('DOMContentLoaded', showimdbimg, false);