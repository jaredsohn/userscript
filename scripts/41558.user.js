// ==UserScript==
// @name          Auktionskompaniet MonsterID bidders
// @namespace     http://henrik.nyh.se
// @description   Complements bidder ids with MonsterID identicons. 
// @include       http://www.auktionskompaniet.com/items/*
// @include       https://www.auktionskompaniet.com/items/*
// @require       http://friedcellcollective.net/monsterid/md5.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('#object table tr:not(:last) td:first-child').each(function() {
  var id   = $(this).text().match(/\d+/)[0];
  var hash = hex_md5(id);
  var size = 50;
  var url  = 'http://friedcellcollective.net/monsterid/'+hash+'/'+size;
  var img  = '<img src="'+url+'" alt="" />'
  $(this).prepend(img);
});

GM_addStyle('#object table td { vertical-align: middle }');
GM_addStyle('#object table td img { vertical-align: middle; padding: 0; margin-right: 5px }');
