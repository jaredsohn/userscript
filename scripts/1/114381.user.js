// ==UserScript==
// @name           Kronos - Notificaciones
// @namespace      Zeyth
// @description    Agrega un nuevo link para ver todas las notificaciones en la barra de usuario sin perder el contador.
// @include        http://kronos.mcanime.net/*
// ==/UserScript==

var style="body > div#mcbox div.content .ua-box.ua-mcbox { max-height:290px;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//ul[@id='main-menu']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	var li = document.createElement("li");
	li.innerHTML = ('<a class="user-notification" onclick="$.mcbox({ajax:\'/notificaciones/\'});">Feeds</a>').toString();
	thisDiv.appendChild(li);
}