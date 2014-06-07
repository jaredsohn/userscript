// ==UserScript==
// @name           SlideShow Test
// @namespace      #aVg
// @include        http://www.samweb.com/slideshow/
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==

// insert slideshow to play around with

document.body.innerHTML += <object width="630" height="500" type="application/x-shockwave-flash" id="Object1" data="https://www.samweb.com/slideshow/slideshowLarge.swf">
<param value="sameDomain" name="allowScriptAccess"/>
<param value="middle" name="align"/>
<param value="https://www.samweb.com/slideshow/slideshowLarge.swf" name="movie"/>
<param value="high" name="quality"/>
<param value="http://www.macromedia.com/go/getflashplayer" name="pluginspage"/>
<param value="#ffffff" name="bgcolor"/>
<param value="xmlfile=https://www.samweb.com/Outil/viewSlideshowXML.ashx?NoInscription=8145235%26langISO=fr%26ChambreID=MA" name="FlashVars"/>
</object>.toString();

// begin script

function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}
var slides = single("//object[@data='https://www.samweb.com/slideshow/slideshowLarge.swf']"), xml = single("//param[@name='FlashVars']", slides).value;
if(xml.match(/xmlfile=([^&#]+)/)) {
	GM_xmlhttpRequest({
		url : unescape(RegExp.$1),
		method : "GET",
		onload : function(A) {
			var imgs = A.responseText.match(/src="[^"]+/g);
			for(var i = imgs.length - 1; i>=0; --i) {
				var img = new Image();
				img.src= "https://www.samweb.com/Outil/viewFile.ashx?" + imgs[i].substring(5).replace(/&amp;/g, "&");
				document.body.appendChild(img);
			}
		}
	});
}