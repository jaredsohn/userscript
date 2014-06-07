// ==UserScript==
// @name           add blogs link
// @namespace      vladislav
// @description    Возвращаем ссылку на блоги на football.ua
// @include        http://football.ua/*



// XPath by JoeSimmons
function xp(exp, t, n) {
var r = document.evaluate((exp||"//body"),(n||document),null,(t||6),null);
if(t && t>-1 && t<10) switch(t) {
case 1: r=r.numberValue; break;
case 2: r=r.stringValue; break;
case 3: r=r.booleanValue; break;
case 8: case 9: r=r.singleNodeValue; break;
} return r;
}

var newElement = document.createElement("li");
var main = xp("//li/a[contains(@href,'mail')]", 9);
if (main) {
    newElement.innerHTML = '<li><a href="http://football.hiblogger.net">Блоги</a></li>';
    main.parentNode.insertBefore(newElement, main.nextSibling);
}



// ==/UserScript==