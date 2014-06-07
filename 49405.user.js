// ==UserScript==
// @name                Google Reader Stars To Delicious
// @namespace      http://www.rimmkaufman.com/grstd
// @description       When you "star" an item in Google Reader, send it along to Delicious (must be logged in to delicious)
// @include        http://google.com/reader/*
// @include        http://*.google.com/reader/*
// @include        https://google.com/reader/*
// @include        https://*.google.com/reader/*
// ==/UserScript==

window.xgetval = function(context_node, xpath, varname) {
	var val = '?';
	var xpathresult = document.evaluate(xpath,                              
				context_node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (xpathresult.snapshotLength>0) {val=xpathresult.snapshotItem(0).textContent;}
		// GM_log (varname + "=" + val);
		return val;
}			
					
document.addEventListener('click', function(event) {
  	var et = event.target; // originalTarget;
	  if (!et) {return;}
  	var classes = et.className;
	  if (classes && classes.search("\\bitem-star[^-]") != -1) {
    	// alert('star!');
    	var current = et.parentNode.parentNode.parentNode; 
    	// see xpath bug #42348, http://bit.ly/m5h9v, '*//' avoids bug
    	var title       = xgetval(current,"*//*[@class='entry-title']/text()", 'title');
    	var url         = xgetval(current, "*//*[@class='entry-original']/@href", 'url');
    	var notes    = xgetval(current, "*//*[@class='snippet']/text()", 'snippet');
    	var blog      = xgetval(document, "//*[@id='chrome-title']/a/text()", 'blog')	
    	GM_log("\nBlog:"+blog+"\nURL: "+url+"\nTitle: "+title+"\nNotes: "+notes);
	  	GM_xmlhttpRequest({
		  	method: 'POST',
		  	url: 'https://api.del.icio.us/v1/posts/add?' + 
		  	'shared=no&url='+encodeURIComponent(url)+
		  	'&description='+encodeURIComponent(title + " (" + blog + ")")
		  	+'&extended='+encodeURIComponent(notes)
			}); // xmlhttp
		} // if
	} // function
	, true);
	
	