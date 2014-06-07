// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include     /^http(s)?://(www.)?csgolounge.com//
// @copyright  2012+, You
// ==/UserScript==

var smth;

function clickConfirmButton(e) {
 var buttons = document.getElementsByTagName('a');
 var clicked = false;
 for (var index=0; index < buttons.length; index++){
  if(buttons[index].textContent == "Request returns"){
   buttons[index].click();
      smth = index;
   break;
  }
 }
}
clickConfirmButton();

var buttons = document.getElementsByTagName('a');
function clickConfirmButton2(e) {
 buttons[smth].click();
}
setInterval(clickConfirmButton2,100);