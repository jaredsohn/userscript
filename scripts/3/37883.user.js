// ==UserScript==
// @name        lyricsplugin.com everlasting colour changer
// @namespace   GoldenEi
// @description Recolours lyricsplugin lyric pages in your browser (e.g. if you opend them by a script in your audio-player and aren't saving cookies)
// @include     http://lyricsplugin.com/*
// @include     http://*.lyricsplugin.com/*
// ==/UserScript==
//
// last updated: 2008-11-30
//
// lyricsplugin.com color changer
// version 1
// 2008-11-30
//
// Additional annotations by the author Wayne Connolly (http://userscripts.org/scripts/show/2216):
//
// "Edit the script to change the font and font size to your liking.
//
// I modded http://userscripts.org/scripts/show/653 to make this slashdot worksafe css script. Thanks Mark.
//
// Email: wayne@wayneconnolly.com
//
// Band Site http://theConvulsions.com
//
// License: GPL: http://www.gnu.org/copyleft/gpl.html"
// --------------------------------------------------------------------

(function() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(
'#title {' +
'  color: #ffffff ! important;' +
'  font-family: cambria ! important;' +
'  font-size: 28px ! important;' +
'}' +
'#artist {' +
'  color: #ffffff ! important;' +
'  font-family: cambria ! important;' +
'  font-size: 16px ! important;' +
'}' +
'' + 
'#lyrics {' +
'  color: #ffffff ! important;' +
'  font-family: arial ! important;' +
'  font-size: 14px ! important;' +
'}' +
'' + 
'#admin {' +
'  color: #ffffff ! important;' +
'  font-family: verdana ! important;' +
'  font-size: 10px ! important;' +
'}' +
'' + 
'#header {' +
'  color: #ffffff ! important;' +
'  font-family: verdana ! important;' +
'  font-size: 10px ! important;' +
'}' +
'' + 
'a {' +
'  color: #ffffff ! important;' +
'  font-family: verdana ! important;' +
'  font-size: 10px ! important;' +
'}' +
'' + 
'a.small {' +
'  color: #ffffff ! important;' +
'  font-family: verdana ! important;' +
'  font-size: 8px ! important;' +
'}' +
'' + 
'body {' +
'  color: #ffffff ! important;' +
'  font-size: 10px ! important;' +
'  text-align: center;' +
'  background: #000000;' +
'}');
})();