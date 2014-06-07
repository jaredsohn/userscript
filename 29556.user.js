// ==UserScript==
// @name           vkontakte groupper
// @namespace      http://vkontakte.net.ru
// @description    Выводит все группы у чувакофф в один красивый столбик
// @include        http://vkontakte.ru/*
// ==/UserScript==

function getElementXPath(elt)
{
     var path = "";
     for (; elt && elt.nodeType == 1; elt = elt.parentNode)
     {
        idx = getElementIdx(elt);
        xname = elt.tagName;
        if (idx > 1) xname += "[" + idx + "]";
        path = "/" + xname + path;
     }
 
     return path;       
}

function getElementIdx(elt)
{
    var count = 1;
    for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)
    {
        if(sib.nodeType == 1 && sib.tagName == elt.tagName)     count++
    }
   
    return count;
}

xpath = getElementXPath(document.getElementById('groups')) + "/div[2]/div/div[2]/a";

var allLinks, thisLink, div;
allLinks = document.evaluate(
	xpath,
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++)
{
    thisLink = allLinks.snapshotItem(i);
	div = document.createElement('div');
 	thisLink.parentNode.insertBefore(div, thisLink.nextSibling);   
}