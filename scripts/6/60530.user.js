// ==UserScript==
// @name          MediaFire Sacar iframe
// @version       2.0
// @namespace     zack0zack@gmail.com
// @description   Sacar las Propagandas
// @include	  http://www.mediafire.com/download.php?* 
// @include	  http://www.mediafire.com/*
// @copyright     zack0zack@gmail.com
// ==/UserScript==



window.addEventListener("load",function() {
//window.setTimeout(function(){ 
var adSidebar = document.getElementById('catfish_div');
 if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
var adSidebar = document.getElementById('remove_ads_button1');
 if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
var adSidebar = document.getElementById('remove_ads_button2');
 if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
var adSidebar = document.getElementById('remove_ads_button3');
 if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
var adSidebar = document.getElementById('remove_ads_button4');
 if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
var adSidebar = document.getElementById('remove_ads_button5');
 if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}

var i, v = document.getElementsByTagName('iframe');
  for(i= v.length-1;i >= 1; i-- ) {
    v[i].parentNode.removeChild( v[i] );
}
var i, v = document.getElementsByTagName('div');
for(i= v.length-1;i >= 1; i-- ) {
 if(v[i].className == 'top'){
    v[i].parentNode.removeChild( v[i] );
 }
 if(v[i].className == 'right'){
    v[i].parentNode.removeChild( v[i] );
 }
}

// }, 3000);

},true)

