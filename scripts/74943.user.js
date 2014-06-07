// ==UserScript==
// @name           Log new play
// @namespace      http://userscripts.org/users/153791
// @include        http://www.boardgamegeek.com/plays/*
// @require        http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

$('main_content').getElements('td.sf').getParent().each(function(item, index){
var id = item.getElements('div:first-child a:first-child').get('href')[0].split('/')[2];
var date = item.getPrevious('tr:contains("Players")').getElement('th:first-child a').text
item.getElement('td:first-child').innerHTML += "<div><a onclick=\"CE_NewPlay({ quickplayid: '"+id+"', objecttype: 'thing', objectid: '"+id+"', playdate: '"+date+"', results: $('quickplay_results"+id+"')});\" href=\"javascript://\"><img border=\"0\" class=\"vam\" src=\"http://geekdo-images.com/images/icons/silkicons/add.png\"> Record a Play</a><div id=\"quickplay_results"+id+"\"></div></div>";
});
