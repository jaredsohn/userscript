// DataCOD submit=1 adder
// version 0.2
// 2008-05-09
// Copyright (c) 2008, akaUNik
//
// ------------------------------------------------------------------
//
// ==UserScript==
// @name			datacodsumbitadder
// @version			0.3
// @namespace		http://userscripts.org/scripts/show/26186
// @description		Adds ?sumbit=1 to datacod links. Special for dsvload.net
// @include			http://dsvload.net/*
// ==/UserScript==

(function() {
	// конвертирование текстовых ссылок в кликабельные
	const urlRegex = /http:\/\/dsv.data.cod.ru\/[0-9]+/gi;
	textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	for (var i = 0; i < textnodes.snapshotLength; i++) { 
	    node = textnodes.snapshotItem(i); 
	    if (!node.parentNode.tagName.match(/^(a|head|object|embed|script|style|frameset|frame|iframe|textarea|input|button|select|option)$/i) &&
	    	 node.nodeValue.match(urlRegex)) {
	    	//alert(node.nodeValue);
	    	
			var span = document.createElement("span");
			var source = node.nodeValue;
            
			node.parentNode.replaceChild(span, node);

            urlRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", match[0]);
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = urlRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
	}

	// правка ссылок в ссылках
	var datacodLinkPrefix = "http://dsv.data.cod.ru/";
	var path = "//a[starts-with(@href, '" + datacodLinkPrefix + "')]";
	var query = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0, length = query.snapshotLength; i < length; i++)
	{
		var link = query.snapshotItem(i);
		link.href = link.href.replace(/dsv.data.cod.ru\/[0-9]+$/gi, "$&?submit=1");
	}
})();