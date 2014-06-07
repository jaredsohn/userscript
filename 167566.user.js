// ==UserScript==
// @name        The Pirate Bay magnet to qrcode thingamajig
// @namespace   http://manicphase.org
// @description Places a qrcode of the magnet link so you can easily get torrents onto your phone despite annoying blockades and proxies.
// @include		http://*/torrent/*
// @version     1.1
// @grant		none
// ==/UserScript==

window.addEventListener ("load", GenerateQR, false);
	
var jsqr = document.createElement('script');
jsqr.src = "http://code.jsqr.de/jsqr-0.2-min.js";
jsqr.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(jsqr);

function GenerateQR () {

	magnetlink = document.getElementsByClassName("download")[0].childNodes[1].href
	if (magnetlink.length > 250)
	{
		magnetlink = magnetlink.substring(0,250)
	}



	qr = new JSQR();
	code = new qr.Code();

	code.encodeMode = code.ENCODE_MODE.BYTE;
	code.version = code.DEFAULT;
	code.errorCorrection = code.ERROR_CORRECTION.M;	

	var input = new qr.Input();
	input.dataType = input.DATA_TYPE.TEXT;
	input.data = magnetlink;

	var canvas = document.createElement('canvas');
	var matrix = new qr.Matrix(input, code);
	canvas.setAttribute('width', matrix.pixelWidth);
	canvas.setAttribute('height', matrix.pixelWidth);
	canvas.getContext('2d').fillStyle = 'rgb(0,0,0)';
	matrix.draw(canvas, 10, 0);	


	document.getElementsByClassName("download")[0].appendChild(canvas);

}