// ==UserScript==
// @name           Add QR code
// @namespace      www.kozlenko.info/qrcode
// @include        *
// ==/UserScript==

if(window.parent == window && String.indexOf(window.location, "qrcode") > 0)
{
var GM_QR = document.createElement('img');
	GM_QR.src = 'http://lilqr.com/qr';
	GM_QR.style.position = "absolute"
	GM_QR.style.zIndex = 99999
	GM_QR.style.width = "120px"
	GM_QR.style.height = "120px"
	GM_QR.style.border = "solid 1px Black"
	GM_QR.style.right = "0"
	GM_QR.style.top = "0"
	document.getElementsByTagName('body')[0].appendChild(GM_QR);
}
 