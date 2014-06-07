// ==UserScript==
// @name           Another Flash Quality Changer
// @namespace      *
// @description    Another Flash Quality Changer
// @include        *
// ==/UserScript==

(function(){
 var quality = "medium"; 
// var quality = "low"; 
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
        for (objs = document.getElementsByTagName('object'), i = objs.length - 1; i >= 0; i--) {
	    for (var c = objs[i].childNodes, j = c.length - 1, set = false; j >= 0; j--) {
		if ((c[j].tagName == 'PARAM') && (c[j].getAttribute('name') == 'quality')) { c[j].setAttribute('value', quality); set = true; break; }
	    }
	    if (!set) with (objs[i].appendChild(document.createElement('param'))) setAttribute('name', 'quality'), setAttribute('value', quality);
	    with (objs[i].parentNode) appendChild(removeChild(objs[i]));
        }
}, false);
})();