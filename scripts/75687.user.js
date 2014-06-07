// ==UserScript==
// @name           FB Game Cleaner
// @namespace      org.drew
// @description    Remove excessive layout when playing a flash game
// @include        http://apps.facebook.com/*
// ==/UserScript==
//window.scroll(0,92);
var i = 0, eles = document.getElementsByTagName('div');
for( i = 0; i < eles.length; i+=1 ){
    if( /probar$/.test( eles[i].getAttribute('id') ) ){
        eles[i].style.display = 'none';
    }   
}

var element = document.getElementsByClassName("tabs")[0];
var curTop = 0;
do{
  curTop += element.offsetTop;
}while( element = element.offsetParent )
window.scroll(0, curTop);
