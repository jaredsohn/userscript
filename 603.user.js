// ==UserScript==
// @name          Del.icio.us delete item 
// @namespace     http://blogs.applibase.net/pramod/code
// @include       http://del.icio.us/*
// @exclude       
// @description	  Adds a "delete this item" link while viewing delicious
// @version 	  0.4, with update by Blake West (http://del.icio.us/blakewest) 
// ==/UserScript==

(function(){
	function createDelLinks(){
		var divs = document.getElementsByTagName("div");
		
		var postLinks = getPostLinks();
		if(postLinks)
			addDeleteItem(postLinks);
		var delPostLinks = getDelPostLinks();
		if(delPostLinks){
			addDeleteItem(delPostLinks);
		}
	}

	function addDeleteItem(linkNodes){	
	
		for(var i=0;i<linkNodes.length;i++){
			addLink(linkNodes[i].node, linkNodes[i].link, linkNodes[i].prefix);
		}
	}
	
	//returns all elements with class=post, class of its last child=meta
	function getPostLinks(){
		var links = new Array();
		var posts = document.evaluate(
    			"//div[@class='post']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		if(posts.snapshotLength == 0){
			return null;
		}
		for(var i=0;i<posts.snapshotLength;i++){
			var metas=document.evaluate(
				"div[@class='meta']",
				posts.snapshotItem(i),
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);
			if(toAddLink(metas.snapshotItem(0))){ 
				var prefix = getLinkPrefix(metas.snapshotItem(0));	
				var link = getLink(posts.snapshotItem(i));
				links.push({"link":link,"node":metas.snapshotItem(0),"prefix":prefix});
			}
		}
		return links;
	}

	//returns all elements to which delete is to be added, with post class as "delPost"	
	function getDelPostLinks(){
		var links = new Array();
		var delPosts = document.evaluate(
				"//div[@class='delPost']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		if(delPosts.snapshotLength == 0){
			return null;
		}

		for(var i=0;i<delPosts.snapshotLength;i++){
			var divs = delPosts.snapshotItem(i).getElementsByTagName("div");

			if(divs.length == 0){
				 continue;
			} 
			var lastDiv = divs[divs.length-1]; 
			if(toAddLink(lastDiv)){
				var prefix = getLinkPrefix(lastDiv);	
				var link = getLink(delPosts.snapshotItem(i));
				links.push({"link":link, "node":lastDiv,"prefix":prefix}); 
			}
		}
		return links;

	}
	
	function getLink(node){
		var aParent = node.getElementsByTagName("h3")[0];//this used to look for a div element
		var delLink = aParent.getElementsByTagName("a")[0];
		return delLink.href;
	} 
	
	function toAddLink(linkParent) { 
		var links = linkParent.getElementsByTagName("a");
		
		for(var i=0;i<links.length;i++){ 
			if(links[i].innerHTML == "edit"){ 
				return true;
			}
		} 
		return false;
	}
	
	function getLinkPrefix(linkParent){ 
		var links = linkParent.getElementsByTagName("a");
		for(var i=0;i<links.length;i++){ 
			if(links[i].innerHTML == "edit"){
				var url = links[i].getAttribute("href");
				var prefix =  url.split("?")[0];
				
				return prefix;
			}
		}
	}
	
	function addLink(node, url, prefix){
		var deleteLink = document.createElement("a");
		deleteLink.setAttribute("class","delNav");
	
		deleteLink.href=prefix+"?delete="+escape(url);
		deleteLink.innerHTML="delete";
		node.appendChild(document.createTextNode(" ... "));
		node.appendChild(deleteLink);
		node.appendChild(document.createTextNode(" this item"));
	}

	window.addEventListener("load",createDelLinks,false); 
}
)();
