// ==UserScript==
// @name           jquery script
// @namespace
// @description    travian robots
// @author         majeed
// @license  


// @require        http://localhost/travian/Scripts/loadEssensials.js


// @include     http://*.travian.*
// @exclude     http://*.travian*.*/hilfe.php*
// @exclude     http://*.travian*.*/log*.php*
// @exclude     http://*.travian*.*/index.php*
// @exclude     http://*.travian*.*/anleitung.php*
// @exclude     http://*.travian*.*/impressum.php*
// @exclude     http://*.travian*.*/anmelden.php*
// @exclude     http://*.travian*.*/gutscheine.php*
// @exclude     http://*.travian*.*/spielregeln.php*
// @exclude     http://*.travian*.*/links.php*
// @exclude     http://*.travian*.*/geschichte.php*
// @exclude     http://*.travian*.*/tutorial.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/ajax.php*
// @exclude     http://*.travian*.*/ad/*
// @exclude     http://*.travian*.*/chat/*
// @exclude     http://forum.travian*.*
// @exclude     http://board.travian*.*
// @exclude     http://shop.travian*.*
// @exclude     http://*.travian*.*/activate.php*
// @exclude     http://*.travian*.*/support.php*
// @exclude     http://help.travian*.*
// @exclude     *.css
// @exclude     *.js

// @version        2.4.2
// ==/UserScript==



GM_jQuery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);
 
// Wait until jQuery has loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_ready();
    }
}
GM_wait();
 
// Once document and jQuery are loaded
function GM_ready() {
alert('hi j')
  GM_jafar.src = 'http://localhost/travian/Scripts/jafarScripts.js';
 GM_jafar.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_jafar);
}