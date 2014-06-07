// ==UserScript==
// @name           lwgame_blocks_remover
// @namespace      http://userscripts.org/scripts/show/75979
// @author	   Black_Sun
// @include        http://www.lwgame.net/news*
// @include        http://lwgame.net/news*
// @include        http://www.lwgame.net/
// @include        http://lwgame.net/
// @include        http://www.lwgame.net/?*
// @include        http://lwgame.net/?*
// @updateURL       https://userscripts.org/scripts/source/75979.meta.js
// @download        http://userscripts.org/scripts/source/75979.user.js
// @version	5.2
// @history	5.2 Скрипт выключен за ненадобностью, т.к. функционал реализован на сайте
// @history	5.1 Смена мест.
// @history	5.0 Код обфусцирован
// @history	4.2 Смена мест.
// @history	4.1 Смена позиций, в связи с новым блоком
// @history	4.0 Добавлена новая система обновлений через scriptish (теперь обновления доступны только для Firefox), убрана история, убраны ненужные комменты.
// ==/UserScript==

var d=1;if(d=0){var b=null,d=["table[5]","table[5]","table[7]"],e=["table[2]","table[4]","table[4]","table[5]"]; document.addEventListener("DOMContentLoaded",function(){if(!arguments.callee.a){arguments.callee.a=!0;for(var a=0;a<d.length;a++){var c=document.evaluate("/html/body/div/table[3]/tbody/tr/td/"+d[a],document,b,XPathResult.ANY_TYPE,b).iterateNext();c&&c.parentNode.removeChild(c)}for(a=0;a<e.length;a++)(c=document.evaluate("/html/body/div/table[3]/tbody/tr/td[3]/"+e[a],document,b,XPathResult.ANY_TYPE,b).iterateNext())&&c.parentNode.removeChild(c);(a=document.evaluate("//img[contains(@src,'spam_light.gif')]", document,b,XPathResult.ANY_TYPE,b).iterateNext())&&a.parentNode.removeChild(a);(a=document.getElementById("icqwin_advmaker"))&&a.parentNode.removeChild(a);(a=document.getElementById("MarketGid5170"))&&a.parentNode.removeChild(a);(a=document.getElementById("MarketGid2680"))&& a.parentNode.removeChild(a)}},!1);}