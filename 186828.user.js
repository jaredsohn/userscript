// ==UserScript==
// @name        CookieClicker Hack
// @namespace   CookieClicker Hack
// @description Automatically clicks the cookie on cookieclicker
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==

//Alternate code for use only in console
/*int i = Game.cookies;
while(true){
    i++;
    Game.cookies=i;
}*/

//https://raw.github.com/noahsaso/CookieClickerScript/master/script.js

//Working code
function getScript(url) {
    e = document.createElement('script');
    e.src = url;
    document.body.appendChild(e);
}
getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
getScript('https://raw.github.com/noahsaso/CookieClickerScript/master/script.js');