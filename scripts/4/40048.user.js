// ==UserScript==
// @name           embed in full width
// @namespace      http://wiki.greasepot.net/examples
// @include        http://*
// ==/UserScript==


embeds = document.getElementsByTagName('embed');

for (i=0; i<embeds.length; i++){
	 var embedsrc = embeds[i].src;
	 
	 attributes = embeds[i].attributes;
	 for (y=0; y<attributes.length; y++){
	   if 	(attributes[y].nodeName == "flashvars"){

	 	 fullscrlink = embedsrc+'?'+attributes[y].textContent;
	 	 embeds[i].parentNode.innerHTML += "<div><span style='background:red;'><a href='"+fullscrlink+"'>&nbsp;embed nr "+(i+1)+" watch in full width&nbsp;</a></span></div>";
	 	 
	 	 //GM_log(fullscrlink);
	 	  }
	}
	 
}
