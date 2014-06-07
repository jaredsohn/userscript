// ==UserScript==
// @name Nachrichten Button
// @description Fügt einen Nachrichten Button im Menü hinzu
// @include http://*.ogame.*/*/*galaxy*
// ==/UserScript==

(function() {


var usersession = unsafeWindow.session;

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_trader_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=messages&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Nachrichten</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);

})()