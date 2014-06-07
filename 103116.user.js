// ==UserScript==
// @name UDSU_Redirect_TeX
// @namespace http://dovuz.udsu.ru/mod/quiz
// @description УдГУ Факультет довузовского образования. Перенаправление TeX формул на сайт www.codecogs.com
// @include http://dovuz.udsu.ru/mod/quiz/*
// ==/UserScript==

var allTeX,thisTeX,thisTeXequation
var allTeX = document.evaluate(
"//img[@class]",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null
);

for (var i=0;i<allTeX.snapshotLength;i++) {
var thisTeX = allTeX.snapshotItem(i);
if ((thisTeX.getAttribute("class")) == "texrender") {
var thisTeXequation = thisTeX.getAttribute("title");
thisTeX.setAttribute("src","http://www.codecogs.com/eq.latex?"+thisTeXequation);
}
}