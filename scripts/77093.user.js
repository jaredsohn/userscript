// ==UserScript==
// @name           hot_newest_first
// @description    Перемещает Горячие новинки наверх перед новостями
// @namespace      free-torrents.org
// @include        http://free-torrents.org/forum/indexer.php
// ==/UserScript==
var a=document.getElementById('fl1')
var aa=document.getElementById('fl2')
var b=document.createElement('script')
b.setAttribute('type', 'text/javascript');
b.innerHTML="$(\"#forums_wrap\").prepend($(\"#fl2\").get(0))"
document.getElementsByTagName('HEAD')[0].appendChild(b);
//-----------------------------------------------------------------------------------
var c=document.createElement('h3')
c.setAttribute('class', 'cat_title');
c.innerHTML="<a href=\"javascript:selCatView(2);\" title=\"Краткий/полный показ категории\">Игры для PC</a> <a href=\"indexer.php?c=2\">&nbsp;</a>";
aa.parentNode.insertBefore(c, aa);
