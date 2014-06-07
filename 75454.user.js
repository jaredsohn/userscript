// ==UserScript==
// @name           Multitab Fix für Antamar
// @author         Kambfhase
// @description    ermöglicht das Spielen in mehreren Tabs.
// @include        http://spiel.antamar.org/Antamar/spiel.php*
// @require        http://kampfhase2005.ka.funpic.de/uploads/GM_jquery.js
// @version        0.1
// ==/UserScript==

var $= unsafeWindow.jQuery,
    cl = unsafeWindow.console ? unsafeWindow.console.log : GM_log,
    hash = window.location.hash.substring(1),
    nohash = /^[^#]*/.exec(window.location)[0];
$.noConflict();

if( hash){
    $('#menu').find('a:contains("'+hash+'")').click();
}

$('#menu').find('a:not([href])').attr('href',function( ){
    return nohash+'#'+$(this).text();
});