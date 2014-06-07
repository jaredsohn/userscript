// ==UserScript==
// @name        user ignore
// @namespace   geekindonesia.tk
// @description for ignore user below 10post and join date oct 2012 for vbul 3.x
// @include     */showthread.php*
// @version     1
// ==/UserScript==


var counter = GM_getValue('counter', 0);
console.log('This script has been run ' + counter + ' times.');
GM_setValue('counter', ++counter);

(function (){
var filterkey = "Join Date: Oct 2012";
var filterkey0 = "Posts: 0";
var filterkey1 = "Posts: 1";
var filterkey2 = "Posts: 2";
var filterkey3 = "Posts: 3";
var filterkey4 = "Posts: 4";
var filterkey5 = "Posts: 5";
var filterkey6 = "Posts: 6";
var filterkey7 = "Posts: 7";
var filterkey8 = "Posts: 8";
var filterkey9 = "Posts: 9";
var filterkey10 = "Posts: 10";
var filterkey11 = "Posts: 11";
var filterkeyx = "Posts: 1,";
var filterkeyx1 = "Posts: 2,";
var filterkeyx2 = "Posts: 3,";
var filterkeyx3 = "Posts: 4,";
var filterkeyx4 = "Posts: 5,";


var allElements, thisElement;
allElements = document.getElementsByTagName('tr');
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  if((thisElement.innerHTML.indexOf(filterkey)!=-1) && (thisElement.innerHTML.indexOf(filterkeyx)==-1) && (thisElement.innerHTML.indexOf(filterkeyx1)==-1) && (thisElement.innerHTML.indexOf(filterkeyx2)==-1) && (thisElement.innerHTML.indexOf(filterkeyx3)==-1) && (thisElement.innerHTML.indexOf(filterkeyx4)==-1)){
  if((thisElement.innerHTML.indexOf(filterkey)!=-1) && (thisElement.innerHTML.indexOf(filterkey0)!=-1) || (thisElement.innerHTML.indexOf(filterkey1)!=-1) || (thisElement.innerHTML.indexOf(filterkey2)!=-1) || (thisElement.innerHTML.indexOf(filterkey3)!=-1) || (thisElement.innerHTML.indexOf(filterkey4)!=-1) || (thisElement.innerHTML.indexOf(filterkey5)!=-1) || (thisElement.innerHTML.indexOf(filterkey6)!=-1) || (thisElement.innerHTML.indexOf(filterkey7)!=-1) || (thisElement.innerHTML.indexOf(filterkey8)!=-1) || (thisElement.innerHTML.indexOf(filterkey9)!=-1) || (thisElement.innerHTML.indexOf(filterkey10)!=-1) || (thisElement.innerHTML.indexOf(filterkey11)!=-1))
    {
    thisElement.parentNode.style.display = 'none';
    }
   }
  }

}());