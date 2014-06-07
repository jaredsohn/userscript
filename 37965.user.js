// ==UserScript==
// @name          flash-quality
// @author        Changes the quality setting of flash files.
// ==/UserScript==

(function(){
 //eg. low, medium, high (see http://kb.adobe.com/selfservice/viewContent.do?externalId=tn_12701&sliceId=2)
 var quality = "low"; 
 var force = true; //Overrides existing settings

 addEventListener("DOMContentLoaded", function(){
	 //Grab all embedded flash movies
	 var embeds = document.evaluate("//embed[@type='application/x-shockwave-flash']", document, null, XPathResult.ANY_TYPE, null);

	 var embed = embeds.iterateNext();
	 while(embed){
		//This is pretty ugly, but oh well, it works
		if(force || !embed.getAttribute("quality")){
			newEmbed = embed.cloneNode(false);
			newEmbed.setAttribute("quality", quality);
			embed.outerHTML = newEmbed.outerHTML;
		}
		embed = embeds.iterateNext();
	 }
}, false);
})();