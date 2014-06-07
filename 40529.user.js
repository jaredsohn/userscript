// ==UserScript==
// @name           Amazon-LiUB-länk
// @namespace      http://anders.mellbratt.se/liubmonkey.html
// @description    Inserts links in Amazon book pages to link ISBN number to LiUB ISBN search
// @include        http://*amazon.*/*
// ==/UserScript==

//Based on http://userscripts.org/scripts/show/26587 by Oscar's Friend which in turn is based on code from Aquilax.

var regexp = new RegExp("([0-9]?[0-9]?[0-9]?-?[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9A-Z])","g");

var snapshots=document.evaluate("//body//text()",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var num1=0;num1<snapshots.snapshotLength;num1++)
{
	regexp.lastIndex=0;
	var node1=snapshots.snapshotItem(num1);
	var match1=regexp.exec(node1.textContent);
	if (match1)
	{
		var node2=node1.parentNode;
		var node3=node1.nextSibling;
		node2.removeChild(node1);
		while (match1)
		{
			node2.insertBefore(document.createTextNode(RegExp.leftContext),node3);
			var link=document.createElement("A");
			link.textContent=RegExp.$1;
			link.setAttribute("href","http://hip.bibl.liu.se/ipac20/ipac.jsp?profile=hb--1&index=ISBN&term="+RegExp.$1);
			try{node2.insertBefore(link,node3);}
			catch(ex){node2.insertBefore(document.createTextNode(match1),node3);}
			regexp.lastIndex=0;
			match1=regexp.exec(RegExp.rightContext);
		}
		node2.insertBefore(document.createTextNode(RegExp.rightContext),node3);
	}
}