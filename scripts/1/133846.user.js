// ==UserScript==
// @id             www.heute.de-ec5f5615-93f2-419e-9b88-7c9063ec8b4c@scriptish
// @name           fixzdf.de
// @version        1.0
// @namespace      
// @author         ls2k
// @description    Removes EPG from zdf.de and expands articles on heute.de
// @include        http://www.heute.de/*
// @include        http://www.zdf.de/ZDF/zdfportal/web/ZDF.de/Chats-und-Foren/*
// @run-at         document-end
// @require        http://www.heute.de/ZDF/zdfportal/code/1774/6/jquery-1.6.2.min.js
// ==/UserScript==

// remove annoying epg bar on the bottom of each page
$("span#ajaxInclude1").remove();

// automatically expand all articles on the main page
if (document.URL.match(/heute.de\/#?$/)) {
    $("article").addClass("showOnStart")
}
