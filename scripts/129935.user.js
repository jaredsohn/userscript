// LoL-Direct-Links
// version 1.0.1
// 2012-04-01
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           LoL-Direct-Links
// @namespace      tag: URI
// @description    Removes link-redirect on Riot Boards, gets you directly to the page
// @include        http://*.leagueoflegends.com/board/*
// ==/UserScript==

var nodesWithUris = new Array();
function getNodesWithUris(node)
{
	if (node.nodeType == 1 && node.tagName.match(/^(a)$/i))	{
			nodesWithUris.push(node);
	} else if (node && node.nodeType == 1 && node.hasChildNodes() && !node.tagName.match(/^(head|object|embed|script|style|frameset|frame|iframe|textarea|input|button|select|option)$/i))
		for (var i in node.childNodes)
			getNodesWithUris(node.childNodes[i]);
}

function makeLinks(baseNode) {
   getNodesWithUris(baseNode);
   for (var i in nodesWithUris)	{
      if(nodesWithUris[i].hasAttributes()) {
         var attr = nodesWithUris[i].attributes['href'];
         if(attr != null) {
           var link = attr.nodeValue;
           if(link.match(/^http:\/\/(euw|eune|na)\.leagueoflegends\.com\/board\/redirect\.php\?do\=verify\&redirect_url\=/)) {
              link = link.replace(/^http:\/\/(euw|eune|na)\.leagueoflegends\.com\/board\/redirect\.php\?do\=verify\&redirect_url\=/,"");
              link = unescape(link);
              attr.nodeValue = link;
           }
         }
      }
   }
}


function main()
{
   makeLinks(document.documentElement);
}

main();
