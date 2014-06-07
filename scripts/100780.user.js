// ==UserScript==
// @name           bm
// @namespace      asd
// @include        http://www.booty-master.com/show_bid.php?feed=*
// @resource      GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript==
	

var oggB64 = GM_getResourceURL("GMwavaudio");
var ausrc = 'data:audio/wav;base64,'+oggB64.split('data:application/octet-stream;base64,')[1];
var au = document.createElement('audio');
au.setAttribute('src', ausrc);
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);


var xpathResult = document.evaluate("(//text()[contains(., 'Buy Now Price')])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node=xpathResult.singleNodeValue;
if (node==null)
 setTimeout(function() { document.location.reload(); } , 2000);
else
    au.play();
