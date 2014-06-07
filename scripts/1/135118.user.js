// ==UserScript==
// @id             traktStats.tv@NSV
// @name           TraktStats
// @version        0.1
// @namespace      NSV
// @author         NSV
// @description    Add stats to Trakt
// @include        http://trakt.tv/*
// @run-at         document-end
// ==/UserScript==

var elemID = document.evaluate("//ul[@class='main-pages']",document,null,9,null).singleNodeValue.lastChild;
var newElement = document.createElement("li");
newElement.setAttribute("class","kids");
var userID = document.evaluate("//div[@class='user signed-in']/a",document,null,9,null).singleNodeValue;
if(userID) {
    var user = userID.getAttribute("href").replace("/user/","");
    newElement.innerHTML = '<a href="http://www.geneanum.com/trakt/index.php?user='+user+'">Stats</a><ul><li><a href="http://www.geneanum.com/trakt/imdb250top.php?user='+user+'">IMDB250Top</a></li><li><a href="http://www.geneanum.com/trakt/playground.php?user='+user+'">Playground</a></li>';
} else {
    newElement.innerHTML = '<a href="#">Stats</a>';
}
elemID.parentNode.insertBefore(newElement, elemID);
