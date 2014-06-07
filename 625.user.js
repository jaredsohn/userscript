// ==UserScript==
// @name          Del.icio.us - Graph a Tag Cloud 
// @namespace     http://cloudalicio.us/
// @include       http://del.icio.us/*
// @exclude       
// @description	  Adds a "Graph this item's Tag Cloud" image link while viewing delicious
// @version 	  2
// ==/UserScript==

(function(){

	function createCloudLink(){
		var aLinks = getLinks();
		if(aLinks)
			addCloudLink(aLinks);
	}

	//returns all elements with class="delLink"
	function getLinks(){
		var links = new Array();
		var dellinks = document.evaluate(
    			"//h3[@class='desc']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		if(dellinks.snapshotLength == 0){
			return null;
		}
		for(var i=0;i<dellinks.snapshotLength;i++){
			var link = getTheLink(dellinks.snapshotItem(i));
			links.push({"link":link,"node":dellinks.snapshotItem(i)});
		}
		return links;
	}

	function getTheLink(node){
		var theParent = node.parentNode;
		var cloudLink = theParent.getElementsByTagName("a")[0];
		return cloudLink.href;
	} 
		
	function addCloudLink(linkNodes){	
		for(var i=0;i<linkNodes.length;i++){
			addLink(linkNodes[i].node, linkNodes[i].link);
		}
	}
	
	function addLink(node, url){
	
		var cloudSpacing = document.createTextNode(" ");
		node.appendChild(cloudSpacing);

		var cloudLink = document.createElement("a");
		cloudLink.setAttribute("class","desc");
		cloudLink.setAttribute("alt","Graph this item's Tag Cloud");
		cloudLink.setAttribute("title","Graph this item's Tag Cloud");
		cloudLink.href="http://cloudalicio.us/tagcloud.php?url="+escape(url);
		cloudLink.innerHTML="<img src=\"http://cloudalicio.us/images/cloudtiny.png\" border=\"0\"/>";
		node.appendChild(cloudLink);

	}

	window.addEventListener("load",createCloudLink,false); 
}
)();