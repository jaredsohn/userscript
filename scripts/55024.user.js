// ==UserScript==
// @name           search with Google 
// @namespace      bcndyl.com
// @description    search with Google on baidu.com http://lveyo.javaeye.com/blog/317550
// @include        http://www.baidu.com/s?*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var allElements = xpath("//input[@name='bs']");

var thisElement = allElements.snapshotItem(0);
var searchKey = thisElement.value;

var regS = new RegExp("\\ ","gi");
var keyWord = encodeURI(searchKey.replace(regS,"+"));

var allAnchorElements = document.getElementsByTagName('td');

allAnchorElements[4].innerHTML += "| <a href='http://www.google.com/search?q="+keyWord+"' target='_blank'>Google搜索&nbsp;("+searchKey+")</a>"
