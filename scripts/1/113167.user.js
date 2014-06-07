// ==UserScript==
// @id             www.unibytes.com-7983047c-f846-4719-8751-88b346ae3fcf@script
// @name           unibytes autodownloader
// @version        1.1
// @history        1.1 Мини-версия с возможностью автоскачивания
// @namespace      script
// @author         Black_Sun idea of mikle0x
// @homepage       http://operafan.net/forum/index.php?topic=2831.msg160728#msg160728
// @include        http://www.unibytes.com/*
// @run-at         document-end
// ==/UserScript==

var autodownload=true; //Написать true если хотите включить автоскачивание и false если выключить


var f=document.getElementById("startForm"),v=document.getElementById("kurs_top_news");f?(unsafeWindow.nextStep(),f.submit()):(f=document.getElementById("backForm"))&&f.submit();autodownload&&(location.href=v.parentNode.getElementsByTagName("a")[0].getAttribute("href"));v&&v.parentNode.removeChild(v);
   }
}