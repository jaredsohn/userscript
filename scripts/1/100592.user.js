// ==UserScript==
// @name           TorrentLeech IGN
// @namespace      Dharun
// @description    Adds IGN links for TorrentLeech PC results
// @include        *torrentleech.org/torrents/browse*
// ==/UserScript==

var evaluator = new XPathEvaluator();
var result = evaluator.evaluate("//a[@href='/torrents/browse/index/categories/17']", document.documentElement, null,
                 XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var thisNode = result.iterateNext();
var games = new Array();
while (thisNode) 
{
	games.push(thisNode);
    thisNode = result.iterateNext();
	
}

for(i=0;i<games.length;i++)
{
var thisNode = games[i];
var name = thisNode.parentNode.parentNode.childNodes[3].childNodes[0].innerText;
if(name != null)
{
	name = name.substring(0,name.indexOf("-"));
	var node = thisNode.parentNode.parentNode.childNodes[3].childNodes[0];
	node.innerHTML += ": <a href='http://search.ign.com/product?query=" + name + "'><font color='red'>Check IGN</font></a>";
}
}

