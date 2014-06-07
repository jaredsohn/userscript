// ==UserScript==
// @name           Plurk2
// @namespace      plurk.tw
// @description    Plug-In Plurk to Your Blog
// @include        http://www.plurk.com/*
// ==/UserScript==

window.setInterval(
	function(){
		permalink_container = document.evaluate('//*[@class="perma_link"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		permalink = document.evaluate('//*[@class="perma_link"]/a[@href]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		plurk2 = document.evaluate('//*[@id="plurk2url"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		if(permalink != null && permalink_container != null){
			GM_log("Plurk2 Created");
			if(plurk2.singleNodeValue != null){
				permalink_container.singleNodeValue.removeChild(plurk2.singleNodeValue);
			}
			var plurktw = document.createElement('a');
			plurktw.innerHTML = "Plurk.2";
			plurktw.setAttribute('id','plurk2url');
			plurktw.setAttribute('href', "http://plurk.tw/?url=" + encodeURIComponent(permalink.singleNodeValue));
			plurktw.setAttribute('target','_blank');
			plurktw.setAttribute('style','padding-left:2px');

			permalink_container.singleNodeValue.appendChild(plurktw);
		}
	},
	5000
);