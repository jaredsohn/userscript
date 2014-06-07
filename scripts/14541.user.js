// ==UserScript==
// @name           Netload.in faster captcha
// @namespace      http://userscripts.org/users/26666
// @include        http://netload.in/*
// @include        http://www.netload.in/*
// ==/UserScript==


function addJS(a){var b=document.getElementsByTagName('head')[0];if(!b){return}var c=document.createElement('script');c.type='text/javascript';c.innerHTML=a;b.appendChild(c)}
function getParam(a){var b=window.location.href;if(a){var c="[\\?&]"+a+"=([^&#]*)";var d=new RegExp(c);var r=d.exec(b)}if(r)return r[1]}

// Remove popup(s)
addJS('function popUnder(){}');

// Remove iframe(s)
var i, v = document.getElementsByTagName('iframe');
  for(i= v.length-1;i >= 0; i-- ) {
    v[i].parentNode.removeChild( v[i] );
}

// Wait until the page is fully loaded
window.addEventListener( 'load', function( e ) {

// If it's file -> get captcha
if(getParam('file_id')){
addJS('change();');
}},false);