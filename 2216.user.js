// ==UserScript==
// @name        Slashdot WorkSafe Colors
// @namespace   http://wayneconnolly.com
// @description Recolors slashdot to make it less obvious you are reading /. at work. It removes the horrible backgrounds & font sizes and makes it black & white in easier to read fonts.
// @include     http://slashdot.org/*
// @include     http://*.slashdot.org/*
// ==/UserScript==
//
//last updated: 2005-11-25
//
// Slashdot WorkSafe Colors
// version 1
// 2005-11-24
//
// This removes all the horrible background colors and fonts and makes the entire thing black and white in smaller easier to read fonts so you can read /. without attracting to much attention to yourself. If, like me, you work in a open plan office then this script is a godsend.
//
// Edit the script to change the font and font size to your liking.
//
// I modded http://userscripts.org/scripts/show/653 to make this slashdot worksafe css script. Thanks Mark.
//
// Email: wayne@wayneconnolly.com
//
// Band Site http://theConvulsions.com
//
// License: GPL: http://www.gnu.org/copyleft/gpl.html
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
'.article {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'  font-size: 12px ! important;' +
'}' +
'.commentTop {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'  padding: .3em ! important;' +
'}' +
'' + 
'.commentBoxForm {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'}' +
'' + 
'.commentBody {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'}' +
'' + 
'.commentBox {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'}' +
'' + 
'.commentBoxForm {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'}' +
'' + 
'.comment {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'}' +
'' + 
'a {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'}' +
'' +
'body {' +
'  color: #000 ! important;' +
'  font-family: verdana ! important;' +
'  background: #fff ! important;' +
'  font-size: 12px ! important;' +
'}');
})();