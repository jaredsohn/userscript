// ==UserScript==
// @name           Plurkmark This!
// @namespace      Plurkerati.com
// @description    Script to add Plurkmark This! link to a Plurk
// @include        http://www.plurk.com/*
// ==/UserScript==

window.setInterval(
	function(){
		permalink_container = document.evaluate('//*[@class="perma_link"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		permalink = document.evaluate('//*[@class="perma_link"]/a[@href]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		plurkmarkthis = document.evaluate('//*[@id="plurkmarkThis"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		if(permalink != null && permalink_container != null){
			GM_log("Creating link");
			if(plurkmarkthis.singleNodeValue != null){
				permalink_container.singleNodeValue.removeChild(plurkmarkthis.singleNodeValue);
			}
			var plurkmark = document.createElement('a');
			plurkmark.innerHTML = "Plurkmark This!";
			plurkmark.setAttribute('id','plurkmarkThis');
			plurkmark.setAttribute('href', "http://plurkerati.com/plurkmarks/new?plurk_url=" + encodeURIComponent(permalink.singleNodeValue)+"&plurkmark_title="+encodeURIComponent(""));
			plurkmark.setAttribute('target','_blank');
			plurkmark.setAttribute('style','padding-left:2px');

			permalink_container.singleNodeValue.appendChild(plurkmark);
		}
	},
	5000
);




