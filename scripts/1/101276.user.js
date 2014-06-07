// ==UserScript==
// @name           City-Info-Fix
// @version        1.5
// @namespace      Levitah
// @description    Skrypt poprawiający wyświetlanie informacji w widoku wyspy.
// @include        http://*ikariam.*/index.php?view=island*
// @include        http://*ikariam.*/index.php
// @exclude        http://s4.pl.ikariam.com/index.php?view=transport*
// @exclude        http://s4.pl.ikariam.com/index.php?view=deployment*
// @exclude        http://s4.pl.ikariam.com/index.php?view=plunder*
// @exclude        http://s4.pl.ikariam.com/index.php?view=occupy*
// ==/UserScript==




document.body.innerHTML= document.body.innerHTML.replace(/<li class=\"score sub\"><span class=\"textLabel\">Mistrzowie budowy: <\/span>/g,"<hr NOSHADE size=\"1\" style=\"color:#542c0f;\"><li class=\"score sub\"><span class=\"textLabel\">Mistrzowie bud.: <\/span>");
document.body.innerHTML= document.body.innerHTML.replace(/<li class=\"score alt\"><span class=\"textLabel\">Punkty: <\/span>/g,"<li class=\"score alt\" style=\"height: 20px;padding-top:6px;\"><span class=\"textLabel\">Punkty: <\/span>");
document.body.innerHTML= document.body.innerHTML.replace(/<ul class=\"cityinfo\">/g,"<ul class=\"cityinfo\" style=\"border-bottom: 1px solid;padding-bottom:5px;\">");




