// ==UserScript==
// @name        Ekşi Sözlük Beta Eskitici
// @namespace   karalamalar.net
// @description Ekşi Sözlük'ün beta arabirimini eskitir. http://userscripts.org/scripts/show/149556 kodundan türetilmiştir.
// @include     http://beta.eksisozluk.com/*
// @include     https://beta.eksisozluk.com/*
// @version     0.3
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("#aside { display:none !important }");
GM_addStyle("#content-section { width:97.5%; background-color: #cccccc !important }");
GM_addStyle("#index-section { width:250px; margin: -15px 0 -20px 10px; background-color: #cccccc !important; }");
GM_addStyle("#main { margin-left:260px !important }");
GM_addStyle("#logo { padding-top:5px; margin-left:10px !important; width: 145px !important; }");
GM_addStyle("#logo a { background-size:100px !important }");
GM_addStyle("#top-bar { margin-left:0px; background-color: #cccccc; width:100% !important }");
GM_addStyle("#search-form { margin-left:-20px; !important }");
GM_addStyle("body { font: 10pt Verdana, sans-serif; background-color: #cccccc; color: black !important }");
GM_addStyle("#container { width: 100% !important; max-width: 100% !important; }");