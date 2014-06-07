// ==UserScript==
// @name           Google search results url - w/o redirect
// @description    Removes onmousedown event that replaces the link and prevents copying it(right click) or getting it w/o surveillence. Motty Katan(c) 10-12-2011 last updated 10-12-2011
// @version 2.0.4
// @include       /^https?://.*\.google\..*/(\?|search|maps|#q=).*$/
// @homepage http://userscripts.org/scripts/show/120091
// @updateURL http://userscripts.org/scripts/source/120091.meta.js
// ==/UserScript==
//10-12-2011 added google maps redirection removal
//23-12-2013 major. added aditional scenario when using existing google search page! 
//28-12-2013 minor. added meta data for automatic update
//03-02-2014 minor. Google has changed the url (Url Rewrite) in some regions/languages. Now using regEx to deal with both old & new urls
(function(){
	function isLoaded(){
		return (document.body.className.indexOf("vsh")!=-1);
	}
	
	function switchLinks(){
		//google search results: web/video
		aoResults = document.evaluate( "//a[@onmousedown]", window.document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		j=0;
		while(j<aoResults.snapshotLength)
		{
			oElement = aoResults.snapshotItem(j++);				
			oElement.removeAttribute("onmousedown");
		}
	
		//google search results: maps
		aoResults = document.evaluate( "//a[@target='_blank' and contains(@href, 'maps.google.')]", window.document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		j=0;
		while(j<aoResults.snapshotLength)
		{
			oElement = aoResults.snapshotItem(j++);
			sImageUrl = oElement.href.match(/q=([^&]+)/)
			if (sImageUrl.length) {
				oElement.href = sImageUrl[1];
			}
		}
	
	}
	
	//scenario #1: new google search page
	if (isLoaded()){
		switchLinks();
	}else{
		//scenario #2: reuse of an existing google search page
		document.body.addEventListener("DOMAttrModified", function(){
			//while page is loaded we see a grayish background
			//check when background is removed
			if (isLoaded()){
				document.body.removeEventListener("DOMAttrModified", arguments.callee, false);
				switchLinks();
			}
		}, true);
	}	
})();