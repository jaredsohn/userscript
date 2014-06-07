// ==UserScript==
// @name		Cheeky Auction Button
// @version		0.1
// @description		A Fluffy Button
// @include		http://playevo.com/auctions/*
// @author		Fluffy
// ==/UserScript==

	var sPath = window.location.pathname;
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	var node = document.evaluate("id('content')/table[1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( node ) { 
			var a = document.createElement('a');
			a.href = '/auctions/view/' + (parseInt(sPage) + 1);
			a.title = "Next Auction";
			a.textContent = "Next>";
			node.appendChild(a);
			a.style.fontSize = "8pt"
			a.style.fontWeight = "bold"
			a.style.marginLeft = "10px";
		}