// ==UserScript==
// @name       NS wifi login
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  automaticly login to ns trains wifi
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include *www.nstrein.ns.nl/*
// @include https://hotspot.t-mobile.net/wlan/welcome.do
// ==/UserScript==



if (window.location.href.match(nstrein.ns.nl)) {

var togle = document.getElementsByName('conditionsCheckbox');
togle[0].checked = 'checked';


//--- contains is case-sensitive.

var x=document.body.getElementsByTagName("span")[4].click();
 window.open('', '_self', '');
     
 }
if (window.location.href.match(hotspot.t-mobile.net/wlan/welcome.do)) {

    window.open('', '_self', '');
    
}
