// ==UserScript==
// @name           REV3 Xvid-streams
// @namespace      zmarn
// @description    Places a DivX-Web-Player instead of a Flash-Player on the Revision3 episode-sites
// @include        *revision3.com/*
// ==/UserScript==


var vidEl = document.getElementById('rev3_player');
	
if(vidEl){
	
	var xvidHref = document.evaluate( "//div[@id='episode-sidebar-download']//a[contains(@href, 'large.xvid.avi')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.href;
	var prevImage = document.evaluate( "//div[@id='show-notes']//img[@class='thumbnail']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.src;

	var xvids = document.createElement("div");
	xvids.innerHTML = '<object classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616" width="555" height="333" codebase="http://go.divx.com/plugin/DivXBrowserPlugin.cab">' +
						' <param name="custommode" value="none" />' +
						' <param name="autoPlay" value="false" />'+
						'<param value="'+prevImage+'" name="previewImage"/>'+
						'<param name="src" value="' + xvidHref + '" />' +
						'<embed type="video/divx" src="' + xvidHref + '" custommode="none" width="555" height="333" previewimage="'+prevImage+'" '+
						'autoPlay="false"  pluginspage="http://go.divx.com/plugin/download/">'+
						'</embed>'+
						'</object> ';
	vidEl.parentNode.replaceChild(xvids, vidEl);
	//xvids.style.marginBottom = "-5px";		
	
}
