/*// CleanGoodFon
// version 0.1
// 2013-05-19
// Copyright (c) 2013,
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name cleantwitter
// @version 0.1
// @namespace 5corpi@mail.ru
// @description Cleans the GoodFon homepage.
// @include https://goodfon.ru/*
// @require  http://code.jquery.com/jquery-latest.js
// ==/UserScript==

*/

(function() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 


'#coment { display: none; }' +

'#footer { display: none; }' +

'div.featuree { display: none; }' +

'div.grid_12.menu_l noindex div { display: none; }' +

'div.grid_4 { display: none; }' +

'div.grid_8 { margin-left: 175px; width: 1000px; }' +

'div.silver_border { display: none; }' +

'div.tabl_td a img { border: 2px solid #00FF00; }' +

'div.tabl_td a:visited img { border: 2px solid #FF9900; }' +

'strong.big { display: none; }' +

'table.silver_border { display: none; }' +

'td.PC_Teaser_Block_6648_td { display: none; }' +

'td.PC_Teaser_Block_6649_td { display: none; }' +

'ul.thumb { display: none; }'



;

head.appendChild(style);


})();






