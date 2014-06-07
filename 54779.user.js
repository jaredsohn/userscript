var GMSU_meta_54779 = <><![CDATA[
// ==UserScript==
// @name           REV3 Xvid-streams
// @namespace      Oldarney
// @description    Places a DivX-Web-Player instead of a Flash-Player on the Revision3 episode-sites
// @include        *revision3.com/*
// @require        http://userscripts.org/scripts/source/51513.user.js
// @uso:script     54779
// ==/UserScript==
]]></>;

var vidEl = document.getElementById('video-embed');
	
if(vidEl){
	
	var xvidHref = document.evaluate( "//div[@id='episode-sidebar-download']//a[contains(@href, 'large.xvid.avi')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.href;
	var prevImage = document.evaluate( "//div[@id='show-notes']//img[@class='thumbnail']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.src;

	var xvids = document.createElement("div");
	xvids.innerHTML = '<object classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616" width="720" height="405" codebase="http://go.divx.com/plugin/DivXBrowserPlugin.cab">' +
						' <param name="custommode" value="none" />' +
						' <param name="autoPlay" value="false" />'+
						'<param value="'+prevImage+'" name="previewImage"/>'+
						'<param name="src" value="' + xvidHref + '" />' +
						'<embed type="video/divx" src="' + xvidHref + '" custommode="none" width="720" height="405" previewimage="'+prevImage+'" '+
						'autoPlay="false"  pluginspage="http://go.divx.com/plugin/download/">'+
						'</embed>'+
						'</object> ';
	vidEl.parentNode.replaceChild(xvids, vidEl);
	//xvids.style.marginBottom = "-5px";		
	
}

setCheckInterval(1)