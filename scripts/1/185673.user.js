// ==UserScript==
// @name        Translator
// @namespace   http://azzalife.co.nr
// @description Press (F2) to Translate
// @include     http://*/*
// @include     https://*/*
// @icon			http://i1138.photobucket.com/albums/n529/azzalife/aswebcopy.gif
// @match	https://dl.dropbox.com/sh/lhwq0z0zmwvcnrt/*/*
// @version     1.2.3
// @updateURL	https://userscripts.org/scripts/source/175684.meta.js
// @downloadURL	https://userscripts.org/scripts/source/175684.user.js
// @author  azzalifednd
// @copyright   2013+ , Joshiii98
// ==/UserScript==

// ==Profile==
    unsafeWindow.translate = function(){
        window.location="http://translate.google.com/translate?sl=auto&u="+window.location
        }
// ==============

// ==Key==
document.onkeydown= openPage ;
function openPage(e) {
e= window.event ? event : e;
    if (e.keyCode == 113 ) { location.href="javascript:translate()" ; }
}
// ==============

