// ==UserScript==
// @name          Del.icio.us archive item 
// @namespace     http://systempuntoout.blogspot.com
// @include       http://del.icio.us/*
// @exclude       
// @description	  Adds an "archive" link that remove your "toRead" tag
// @version 	  0.3
// ==/UserScript==

(function(){
	var toReadTag=".toread";
	
	//MAIN
	function createArchiveLinks(){
		var locationHrefLength=document.location.href.length;
		var toReadTagLength=toReadTag.length;
		if ( document.location.href.substr(locationHrefLength-toReadTagLength,locationHrefLength) == toReadTag){		
			var divs = document.getElementsByTagName("div");
			var postLinks = getPostLinks();
			if(postLinks) addDeleteItem(postLinks);
		}
	}
		
	
	//UTILITY
	function addDeleteItem(linkNodes){	
	
		for(var i=0;i<linkNodes.length;i++){
			addLink(linkNodes[i].node, linkNodes[i].link, linkNodes[i].prefix,linkNodes[i].tags,linkNodes[i].description,linkNodes[i].extended);
		}
	}
	
	function getPostLinks(){
		var links = new Array();
		var posts = document.evaluate(
    			"//li[@class='post']",
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
    		var desc=document.evaluate(
				"h4[@class='desc']",
				posts.snapshotItem(i),
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);
    		var commands=document.evaluate(
				"div[@class='commands']",
				posts.snapshotItem(i),
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);
			
			var extend=document.evaluate(
				"p[@class='notes']",
				posts.snapshotItem(i),
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);	
    				
			if(toAddLink(commands.snapshotItem(0))){ 
				var prefix = getLinkPrefix(commands.snapshotItem(0));
				
				var tags = getTags(metas.snapshotItem(0));
			
				var link = getLink(posts.snapshotItem(i));
				var description = getDesc(desc.snapshotItem(0));
				var extended =getExtended(extend.snapshotItem(0));
				links.push({"link":link,"node":commands.snapshotItem(0),"prefix":prefix,"tags":tags,"description":description,"extended":extended});
			}
		}
		return links;
	}

	
	function getLink(node){
		var aParent = node.getElementsByTagName("h4")[0];//this used to look for a div element
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
	
	function getTags(linkParent){ 
			var tags="";
			var links = linkParent.getElementsByTagName("a");
			
			for(var i=0;i<links.length;i++){
				if(links[i].innerHTML!="edit"  && links[i].innerHTML.indexOf("other people")==-1 && links[i].innerHTML.indexOf("other person")==-1  && links[i].innerHTML!=toReadTag){
				 	tags=links[i].innerHTML+" "+tags;				
				};
				
			}
			return tags.substring(0,tags.length-1);
	}
	
	function getDesc(linkParent){ 
				var links = linkParent.getElementsByTagName("a");
				return(links[0].innerHTML);
	}

	function getExtended(linkParent){
				if (linkParent!=null) return linkParent.textContent;
				else return "";				
	}
	
	
	function addLink(node, url, prefix,tags,description,extended){
		var archiveLink = document.createElement("a");
		archiveLink.setAttribute("style","background-color: rgb(4%,219%,52%);");
		archiveLink.href="javascript:{var xmlhttp = new XMLHttpRequest();xmlhttp.open('POST','http://del.icio.us/api/posts/add',false);var xmlstring='url='+encodeURIComponent(\'"+url.split("'").join("\\'")+"\')+'&description='+encodeURIComponent(\'"+description.split("'").join("\\'")+"\')+'&tags='+encodeURIComponent(\'"+tags.split("'").join("\\'")+"\')+'&extended='+encodeURIComponent(\'"+extended.split("'").join("\\'")+"\');xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');xmlhttp.send(xmlstring);document.location ='http://del.icio.us"+prefix+"';}";
		archiveLink.innerHTML="archive";
		node.appendChild(document.createTextNode(" / "));
		node.appendChild(archiveLink);		
	}
		

	window.addEventListener("load",createArchiveLinks,false); 
}
)();




