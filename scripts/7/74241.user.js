// ==UserScript==
// @name Google Chrome Blink tag 
// @description Workaround for enabling blink in Google Chrome
// @include *
// ==/UserScript==

function doBlink()
{

var all = document.all.tags("blink");
for (var i = 0; i < all.length; i++) {

all[i].style.visibility == 'visible' ?

all[i].style.visibility = 'hidden' :

all[i].style.visibility = 'visible';

}
}

setInterval(doBlink, 500);