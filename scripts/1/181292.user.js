// ==UserScript==
// @name        tincan black
// @namespace   https://userscripts.org/users/416130
// @description tincan black
// @include     http://tincan.*
// @version     1
// @grant       none
// ==/UserScript==

var styleText='';

/* Write down the style
-------------------------------------------------------------------------------------------------------- */
styleText += 'input, select {border-style:solid;border-width:1px;background-color: rgb(22, 22, 22);border-color:rgb(32,32,32);color:rgb(102, 102, 102);}';
styleText += '.logo {opacity:0;}';
styleText += 'body, .textboxPrompt {background:black;color:#aaa;}';
styleText += '.sideTab_backgroundedTab, .np_BorderDiv , .menu_unselected , .prefWrapper {background:#111;border-color:#222;}';
styleText += '.menu_filler {background-image: none;background-color: #111;}';
styleText += '.menu_selected {background-image: none;}';
styleText += '.sideTab_foregroundedTab, .sideTab_contentTD, .sideTab_contentArea, .np_dataTD, .menu_selected  , .configDesc {background-color:#222;border-color:#333;color:white;}';
styleText += '.browseItem, #playlistEditDiv a {color:white;}';
styleText += '.playNow, .addToPlayList, .playlistDetailDiv  , a, a:link{ color: #AAA;}';
styleText += '.menu_bar td {border:1px solid #222 !important;}';
styleText += ' body > * > * > * > * > *> * > * > td[align="left"]>div {border:1px solid black !important}';
styleText += 'hr {background: black;display: block;border: 1px solid black;border-color: black transparent #2F2F2F transparent;}';
styleText +=  '.text {background-color: transparent;}';
var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(styleText);

style.type = 'text/css';
if(style.styleSheet)  style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);