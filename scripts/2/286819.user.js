// ==UserScript==
// @name        Cookie Monster
// @namespace   Cookie
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==

var init = Game.Init;
Game.Init = function(){
    init();
    loadCookieMonster();
}

function loadCookieMonster(){
    var jA = document.createElement('script');
    jA.setAttribute('type', 'text/javascript');
    jA.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
    jA.onload = function () {
        var jB = document.createElement('script');
        jB.setAttribute('type', 'text/javascript');
        jB.setAttribute('src', 'http://cookie-monster.autopergamene.eu/cookie-monster.min.js?' + new Date().getTime());
        document.body.appendChild(jB);
    };
    document.body.appendChild(jA);
};