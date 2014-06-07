// ==UserScript==
// @name          Remove empty spaces and ads from ampparit.com
// @description	  It removes ads from ampparit.com and makes it scale to width of window
// @author        Olli Laasonen [laasonen]
// @homepage      http://laasonen.net
// @include       http://www.ampparit.com/*
// ==/UserScript==
(function(){
	/* CSS modifications */
	css = '#top-ad, #top-ad-spacer, iframe, ins, .ad, .ad-lazy { display: none !important; }'
	+ '.layout-container { max-width: 999999999999px !important; padding: 0px !important; }'
	+ '.footer { margin-bottom: 0px !important; }'
	+ '.header { margin-top: -2px !important; }'
	+ '.content-caption { background-color: #C3E376 !important; }'
	+ '.header > div:first-child { display: none !important; }'
	+ '#content > div:nth-child(2) { display: none !important; }'
	+ '#top > div:last-child { display: none !important; }'
	+ '.content-layout-space { width: 1px !important; min-width: 1px !important; max-width: 1px !important; }';

	/* Add CSS modifications */
	heads = document.getElementsByTagName('head');
	if(heads.length > 0){
		node = document.createElement('style');
		node.type = 'text/css';
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}
})();
