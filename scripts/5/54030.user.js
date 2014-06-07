// ==UserScript==
// @name          BetterFlaker
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Wstawia linki do niektórych funkcji flaker.pl
// @include       http://www.flaker.pl/
// @include       http://flaker.pl/
// @include       http://www.flaker.pl/*
// @include       http://flaker.pl/*
// @include       http://www.flaker.pl/t/*
// @include       http://flaker.pl/s/*
// ==/UserScript==
var login = document.getElementsByTagName('h1')[0].innerHTML;
var html = '<div id="sidebar"><div id="sidebar_user" class="mine sidepanel"><div id="sidebar_user_buttons" class="navpadding"><h3 class="heading">Better Flaker</h3><ul style="margin-left:0.5em;"><li><strong><a href="http://flaker.pl/users/invitations"><img SRC="http://img190.imageshack.us/img190/9730/zaproszenia.png">&nbsp;Powiedz znajomym o Flakerze!</a></strong></li><li><strong><a href="http://addons.mozilla.org/en-US/firefox/addon/11845"><img SRC="/favicon.ico">&nbsp;Szybkie flakowanie z Firefoxa</a></strong></li><li><strong><a href="http://flaker.pl/store/popular"><img SRC="http://img149.imageshack.us/img149/554/rankinge.png">&nbsp;Najpopularniejsi na Flakerze</a></strong></li><li><strong><a href="http://flaker.pl/reports/channels"><img SRC="http://img269.imageshack.us/img269/3367/kanaly.jpg">&nbsp;Kanaly dostepu - ranking</a></strong></li><li><strong><a href="http://ulepszamy.pl/flaker"><img SRC="http://img268.imageshack.us/img268/2606/logosidebar.png">&nbsp;Ulepsz flakera!</a></strong></li><li><strong><a href="http://tr.im/t2SW"><img SRC="http://img267.imageshack.us/img267/6215/telefon.jpg">&nbsp;Zatankuj telefon na karte</a></strong></li></ul><div class="jqmAjaxTarget"><div><form class="fleft" id="search_form" action="http://flaker.pl/search" method="post" enctype="multipart/form-data"><fieldset><div class="formPart"><label><strong>szukana fraza</strong></label><br><input class="fleft" name="search_query" id="search_query" value="" type="text"></div><!--formPart--><div class="formRow"><label class="fleft">szukaj w:<select name="search_type" id="search_type"><option value="all">- we wszystkie wpisach</option><option value="friends">- we wpisach znajomych</option><option value="mine">- w mojej aktywnosci</option></select></label><input class="fright" style="margin: 0pt;" value="Szukaj" type="submit"></div><!--formRow--><div style=""><a href="http://flaker.pl/users/search">szukaj znajomych</a></div></fieldset></form></div></div></div><div class="transparent-box-rounding-bottom">&nbsp;</div></div></div>';
var box = document.getElementById("sidebar_user");
var spinkaWidget = document.createElement('div');
spinkaWidget.innerHTML = html;
box.parentNode.insertBefore(spinkaWidget, box.nextSibiling);