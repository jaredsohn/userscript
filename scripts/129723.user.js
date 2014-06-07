// ==UserScript==
// @name           YouTube Auto Fav/Like Videos
// @namespace      http://userscripts.org/users/YouTubeScripts
// @description    Automatically clicks the "Like" button
// @include        http*://*.youtube.com/watch*v=*
// @include        http*://youtube.com/watch*v=*
// @copyright      None
// @version        1.0.02      
// ==/UserScript==

var passlist = <><![CDATA[
Smosh
*
]]></>.toString();


try {
	var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
	if(unsafeWindow.frameElement != null) return;
} catch(e) {}

window.addEventListener("load", function() {

	var pass = new RegExp("(" + passlist.trim().replace(/ /g,"").split("\n").join("|") + ")", "gi");

	// delay the click to 1 second after page load
	window.setTimeout(function() {
	
		if(pass.test(document.evaluate("//*[@id='watch-uploader-info']//a[contains(@class, 'author')]", document, null, 9, null).singleNodeValue.textContent)) {

			// find it
			var like = document.getElementById("watch-like");
			

			// click it
			if(like) like.click();
			
		}

	}, 1000);

}, false);