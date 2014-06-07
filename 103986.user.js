// ==UserScript==
// @name           DiggIt
// @namespace      org.eroim.essime
// @include        http://torrentav99.blog79.fc2.com/*
// @include		   http://eropornhost.blog.fc2.com/*
// @version 	   0.2
// ==/UserScript==
(function() {

	var highlight = "font-weight:bolder; text-decoration:none; color:white; background-color:red; border:1px solid #000; padding:1ex;";
	
	var storage = [
		"http://www.hokann.com/storage/",
		"http://www.365shared.net/storage/",
		"http://host2.jptorrent.org/link.php?ref=",
		"http://www.fxstorage.com/file/",
		"http://www.jptorrent.org/link.php?ref=",
	];

	

	console.log("storage len: "+storage.length);
	
	/* ================================= */
	for(var s=0;s<storage.length;s++)
	{
		var path = "//a[starts-with(@href, '"+ storage[s] +"')]";
		console.log("["+s+"]: "+path);
		
		var list = x(path, "saech links");
		for( var l=0; l<list.length; l++)
		{	
			list[l].setAttribute('style', highlight);
		}
	}
	
	
	
	
	/* ================================= */

	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			console.log(msg + ": node array is NULL."+nodesArray.length);
		}
		return nodesArray;
	}
	
	String.prototype.startsWith = function(prefix){
	 return this.lastIndexOf(prefix, 0) == 0;
	}
})();