// ==UserScript==
// @name        Unicreatures Add to Exchange
// @namespace   http://trueidiocy.us
// @description Adds a link to pet pages for adding to the click exchange.
// @include     http://unicreatures.com/view.php?id=*
// @include     http://www.unicreatures.com/view.php?id=*
// @include     http://exchange.unicreatures.com/manage.php
// @version     1
// @copyright	© krazykat1980
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

if(window.location.href.indexOf('view.php?id=') > -1){
var pets = window.location.href.match(/\d+/g)


var links=document.getElementById('right').getElementsByTagName('table')[3];


var textNode = document.createElement('b');


textNode.innerHTML = "To add this pet to the exchange click HERE";    
textNode.addEventListener ("click", function() {

var pet=parseInt(pets)


GM_setValue("thePet",pet)
var newWin=window.open();

newWin.location="http://exchange.unicreatures.com/manage.php"



}, false);

links.parentNode.appendChild(textNode, links);




}

else if (window.location=="http://exchange.unicreatures.com/manage.php"){
var boxes=document.getElementsByClassName('text');
boxes[boxes.length-2].value=GM_getValue("thePet")



}

