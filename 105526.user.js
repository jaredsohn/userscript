
// ==UserScript==
// @name           Factbook
// @namespace      Rafiya Javed
// @description    inserts news from Physorg's rss feed... into ur fb 

newsfeed
// @include        http://www.facebook.com/*
// ==/UserScript==


var asdf=[];
function facts() 

{

asdf=document.getElementsByClassName("storyInnerContent 

UIImageBlock_Content UIImageBlock_MED_Content");


GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.physorg.com/rss-feed/",
  onload: function(response) {

	

	var doc = document.createElement('div');
	doc.innerHTML = response.responseText;
	var xpathExpression = "//title"; 
	var results = document.evaluate(xpathExpression, doc, null, 	

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var links = document.evaluate("//link", doc, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var description= document.evaluate("//description", doc, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var pcs = results.snapshotLength;
	if (pcs)
	{
   		for (var i = 0; i < pcs; i++){
        	asdf[i].innerHTML="<a href="+links.snapshotItem(i

+1).textContent+">"+results.snapshotItem(i+1).textContent

+"</a>"+"<br>"+description.snapshotItem(i+1).textContent;
		}
		
  
	}
	
	
	}

});

}

facts();

document.addEventListener("DOMNodeInserted", function(ev) {	facts

(); }, false);

window.addEventListener("load",	function() { facts(); }, false);