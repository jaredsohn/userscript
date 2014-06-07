// ==UserScript==
// @name           Low
// ==/UserScript==

(function(){
 var quality = "low"; 
 var force = true; //Overrides existing settings

 addEventListener("DOMContentLoaded", function(){
	 var embeds = document.evaluate("//embed[@type='application/x-shockwave-flash']", document, null, XPathResult.ANY_TYPE, null);

	 var embed = embeds.iterateNext();
	 while(embed){
		if(force || !embed.getAttribute("quality")){
			newEmbed = embed.cloneNode(false);
			newEmbed.setAttribute("quality", quality);
			embed.outerHTML = newEmbed.outerHTML;
		}
		embed = embeds.iterateNext();
	 }
}, false);
})();
