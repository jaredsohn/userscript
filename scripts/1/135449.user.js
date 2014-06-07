// ==UserScript==
// @name           Mindcrack Auto-Liker
// @include        http*://*.youtube.com/watch*v=*
// @include        http*://youtube.com/watch*v=*
// ==/UserScript==

var passlist = <><![CDATA[
adlingtont
AnderZEL
ArkasMc
imanderzel
GuudeBoulderfist 
docm77
bdoubleo100
VintageBeef
PauseUnpause
kurtjmac
EthosLab
w92baj
jsano19
JustD3fy
supermcgamer
mhykol
nebris88
pakratt13
Pyropuncher
ShreeyamNET
thejims
Zisteau
ZaranZion
mastuve
Oobula

]]></>.toString();


try {
	var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
	if(unsafeWindow.frameElement != null) return;
} catch(e) {}

var to = null, t = 0;

function doLike() {

	var pass = new RegExp("(" + passlist.trim().replace(/ /g,"").split("\n").join("|") + ")", "gi"),
		author = document.evaluate("//*[@id='watch-uploader-info']//a[contains(@class, 'author')]", document, null, 9, null).singleNodeValue,
		like = document.getElementById("watch-like");
	
	if(t <= 20 && author !== undefined && author !== null && pass.test(author.textContent) && like !== undefined && like !== null && like.getAttribute("class").indexOf("yt-uix-button-toggled") === -1) {
		like.click();
		window.clearInterval(to);
	} else if(t > 20) {
		window.clearInterval(to);
	} else {
		t++;
	}


}

window.addEventListener("load", function() {

	to = window.setInterval(doLike, 500);

}, false);