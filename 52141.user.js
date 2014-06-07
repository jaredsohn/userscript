// Copyright (C) Nizovtsev Sergey, 2009
// MIT License

var update_interval = 42;
var undo_size = 50;

// ==UserScript==
// @name          Canvas graffiti
// @namespace     http://snizovtsev.homelinux.org/userscripts
// @description	  This script helps Linux users to draw 'graffiti'
// @include       http://vkontakte.ru/graffiti.php?act=draw*
// @include       http://www.vkontakte.ru/graffiti.php?act=draw*
// ==/UserScript==

// Helper functions
/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}

// Opera compatibility functions
/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */

var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
if (!window.atob) window.atob = base64decode;

if (typeof(GM_addStyle) != 'function') { 
        function GM_addStyle(css) { 
                var head = document.getElementsByTagName('head'); 
                if (!!head) { 
                        var style = document.createElement('style'); 
                        style.type = 'text/css'; 
                        style.textContent = css; 
                        head[0].appendChild(style); 
                } 
        } 
}

function getMicroTime() {
	var oTime = new Date();
	return oTime.getMilliseconds() + oTime.getSeconds()*1000 +
	       oTime.getMinutes()*60000 + oTime.getHours()*3600000;
}

if (typeof(unsafeWindow) == 'undefined')
	unsafeWindow = window;

// End helper functions

function relX(e, obj) {
	obj.totalOffsetLeft = 0;
	var cur = obj;
	while (cur.offsetParent) {
		obj.totalOffsetLeft += cur.offsetLeft;
		cur = cur.offsetParent;
	}
	return e.clientX + window.pageXOffset - obj.totalOffsetLeft;
}

function relY(e, obj) {
	obj.totalOffsetTop = 0;
	var cur = obj;
	while (cur.offsetParent) {
		obj.totalOffsetTop += cur.offsetTop;
		cur = cur.offsetParent;
	}
	return e.clientY + window.pageYOffset - obj.totalOffsetTop;
}

function strokeRect(ctx, x, y, w, h) {
	ctx.fillRect(x, y, w, 1);
	ctx.fillRect(x, y+h-1, w, 1);
	ctx.fillRect(x, y, 1, h);
	ctx.fillRect(x+w-1, y, 1, h);
}

function makeSlider(canvas, minValue, maxValue, initialValue) {
	var boxWidth = 8;
	var leftBound = Math.floor(boxWidth/2.0) + 1;
	var rightBound = canvas.width - leftBound - 1;
	var tMouseDown = 0;
	
	canvas.minValue = minValue;
	canvas.maxValue = maxValue;
	canvas.curValue = (initialValue != undefined) ? initialValue : minValue;
	
	canvas.render = function() {
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#f7f7f7";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "#e4e4e4";
		ctx.fillRect(leftBound, 20, rightBound-leftBound+1, 5);
		ctx.fillStyle = "#bfbfbf";
		strokeRect(ctx, leftBound, 20, rightBound-leftBound+1, 5);

		var t = (canvas.curValue - minValue) / (maxValue - minValue);
		var boxCoord = Math.floor((rightBound - leftBound + 1) * t + leftBound - Math.floor(boxWidth/2.0));
		ctx.fillStyle = "#dae1e8";
		ctx.fillRect(boxCoord, 17, 8, 11);
		ctx.fillStyle = "#abb8c7";
		strokeRect(ctx, boxCoord, 17, 8, 11, 171, 184, 199);
		
		for (var i = 1; i <= 9; i++) {
			var x = Math.floor((rightBound - leftBound)*i/10 + leftBound);
			ctx.fillStyle = "#bfbfbf";
			strokeRect(ctx, x, 10, 1, 5);
		} 
	}
	
	function handleEvent(e) {
		var x = relX(e, canvas);
		if (x < leftBound) x = leftBound;
		if (x > rightBound) x = rightBound;
		
		var t = (x - leftBound) / (rightBound - leftBound + 1);
		canvas.curValue = (maxValue - minValue) * t + minValue;
		canvas.render();
		
		if (canvas.onSlide)
			canvas.onSlide(canvas.curValue);
	}
	
	var mousemove = function(e) {
		var eTime = e.timeStamp || getMicroTime();
		if (tMouseDown > 0 && (eTime - tMouseDown) >= update_interval) {
			tMouseDown = eTime;
			handleEvent(e);
		}
	}
	
	var mouseup = function(e) {
		if (e.button == 0) {
			tMouseDown = 0;
			handleEvent(e);
			window.removeEventListener("mousemove", mousemove, false);
			window.removeEventListener("mouseup", mouseup, false);
		}
	}
	
	canvas.addEventListener("mousedown", function(e) {
		if (e.button == 0) {
			tMouseDown = e.timeStamp || getMicroTime();
			handleEvent(e);
			window.addEventListener("mousemove", mousemove, false);
			window.addEventListener("mouseup", mouseup, false);
		}
	}, false);
	
	canvas.render();
}

function makeButton(href, caption) {
	return '<li style="margin: 5px;">' +
	       '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>' +
	       '<span class="ncc"><a href="'+href+'">'+caption+'</a></span>' +
	       '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>' +
	       '</li>';
}

// Load config
function getConfigValue(str) {
	var pos1 = html.indexOf(str+"=");
	var pos2 = html.indexOf("&amp;", pos1);
	return unescape(html.substr(pos1+str.length+1, pos2-pos1-str.length-1));
}

var target = document.getElementById('flash_player_container');
var html = target.innerHTML;
var postTo = getConfigValue('postTo');
var redirectTo = getConfigValue('redirectTo');
// Language strings
var lang = function() {}
lang.size        = getConfigValue('lang.size');
lang.opacity     = getConfigValue('lang.opacity');
lang.undo        = getConfigValue('lang.undo');
lang.clear       = getConfigValue('lang.clear');
lang.send        = getConfigValue('lang.send');
lang.msgLoading  = getConfigValue('lang.msgLoading');
lang.msgError    = getConfigValue('lang.msgError');

target.innerHTML = '<div id="graffiti-main">'+
                   '<div>'+
                   '  <canvas id="draw-area" class="decor" width="585" height="293"></canvas>'+
                   '  <canvas id="offscreen-area" width="585" height="293"></canvas>'+
                   '</div>' +
                   '<div style="height: 77px; padding-bottom: 10px;">' +
                   '<div id="div-color-chooser"><canvas id="color-chooser" width="253" height="169"></canvas></div>' +
                   '<div style="float: left; height: 100%;">'+
                   '  <canvas id="brush-preview" class="decor" width="64" height="64"></canvas>' +
                   '  <canvas id="color-button" width="15" height="30"></canvas>' +
                   '</div>' +
                   '<div style="float: left; margin-left: 10px; height: 100%;">' +
                   '  <table cellpadding="0" cellspacing="0" height="100%" width="100%">' +
                   '  <tr><td style="text-align: right; vertical-align: top; padding-top: 13px;"><span id="width-label">'+lang.size+'</span></td>' +
                   '  <td style="vertical-align: top; padding-left: 10px;"><canvas id="width-chooser" width="110" height="30"></canvas></td>' +
                   '  <tr><td style="text-align: right; vertical-align: bottom; padding-bottom: 5px;"><span id="opacity-label">'+lang.opacity+'</span></td>' +
                   '  <td style="vertical-align: bottom; padding-left: 10px;"><canvas id="opacity-chooser" width="110" height="30"></canvas></td>' +
                   '  </table>'+
                   '</div>' +

                   '<div style="float: right; margin-top: 6px;"><ul class="nNav" style="height: 30px;">' +
                   makeButton('javascript: undoGraffiti()', lang.undo) +
                   makeButton('javascript: clearGraffiti()', lang.clear) +
                   makeButton('javascript: postGraffiti()', lang.send) +
                   '</ul><br><div id="status-line"></div></div>'+
                   
                   '</div>'+ // controls
                   '</div>'; // graffiti-main

GM_addStyle("canvas.decor {border: 1px solid #cccccc; }" +
            "#brush-preview {margin-top: 10px; float: left;}" +
            "#color-button {margin-top: 4px; margin-left: 7px; float: left; cursor: pointer;}" +
            "#graffiti-main {width: 587px; margin-left: auto; margin-right: auto;}" +
            "#div-color-chooser {border: 2px solid #d5d5d5; width: 255px; position: relative;" +
            "     padding: 5px; padding-bottom: 3px; margin-bottom: -190px; top: -185px; left: 70px;" +
            "     background: #f0f0f0; visibility: hidden;}" +
            "#offscreen-area {display: none; position: absolute;}"+
            "");

var drawArea, offscreenArea, zeroBuffer, ctx;
var history = new Array;

function commitGraffiti() {
	var img = document.createElement("canvas");
	img.width = drawArea.width;
	img.height = drawArea.height;
	img.getContext("2d").drawImage(drawArea, 0, 0);
	history.push(img);

	if (history.length > undo_size)
		history.shift();
	ctx[0].putImageData(zeroBuffer, 0, 0);
}

function flipGraffiti() {
	ctx[1].save();
	ctx[1].globalAlpha = 1.0;
	ctx[1].drawImage(history[history.length-1], 0, 0);
	ctx[1].restore();
	ctx[1].drawImage(offscreenArea, 0, 0);
}

window.addEventListener('load', function() {
	drawArea = unsafeWindow.document.getElementById("draw-area");
	offscreenArea = unsafeWindow.document.getElementById("offscreen-area");
	var tMouseDown = 0, lastX = -1, lastY = -1;
	var width = drawArea.width;
	var height = drawArea.height;

	ctx = new Array(2);
	ctx[0] = offscreenArea.getContext("2d");
	ctx[1] = drawArea.getContext("2d");
	zeroBuffer = ctx[0].getImageData(0, 0, width, height);

	ctx[1].fillStyle = "#ffffff";
	ctx[1].fillRect(0, 0, width, height);
	commitGraffiti();

	ctx[1].globalAlpha = 0.8;
	ctx[0].strokeStyle = "#336699";
	ctx[0].lineWidth = 14;
	ctx[0].lineCap = "round";

	drawArea.addEventListener('mousedown', function(e) {
		if (e.button == 0) {
			tMouseDown = e.timeStamp || getMicroTime();
			lastX = relX(e, drawArea);
			lastY = relY(e, drawArea);
			ctx[0].beginPath();
			ctx[0].moveTo(lastX, lastY);
			ctx[0].lineTo(lastX+0.01, lastY+0.01);
			ctx[0].stroke();
			ctx[0].closePath();
			flipGraffiti();
			
			unsafeWindow.addEventListener("mousemove", drawArea.fn_mousemove, false);
			unsafeWindow.addEventListener("mouseup", drawArea.fn_mouseup, false);
		}
	}, false);

	drawArea.fn_mouseup = function(e) {
		if (e.button == 0) {
			ctx[0].beginPath();
			ctx[0].moveTo(lastX, lastY);
			ctx[0].lineTo(relX(e, drawArea), relY(e, drawArea));
			ctx[0].stroke();
			ctx[0].closePath();
			flipGraffiti();
			commitGraffiti();
			
			lastX = lastY = -1;
			tMouseDown = 0;

			unsafeWindow.removeEventListener("mousemove", drawArea.fn_mousemove, false);
			unsafeWindow.removeEventListener("mouseup", drawArea.fn_mouseup, false);
		}
	}
	
	drawArea.fn_mousemove = function(e) {
		if (e.button == 0) {
			var curX = relX(e, drawArea);
			var curY = relY(e, drawArea);
			var eTime = e.timeStamp || getMicroTime();
			
			ctx[0].beginPath();
			ctx[0].moveTo(lastX, lastY);
			ctx[0].lineTo(curX, curY);
			ctx[0].stroke();
			ctx[0].closePath();
			
			lastX = curX;
			lastY = curY;
			
			if (eTime - tMouseDown >= update_interval) {
				tMouseDown = eTime;
				flipGraffiti();
			}
		}
	}

	var cBrush = unsafeWindow.document.getElementById('brush-preview');
	var ccButton = unsafeWindow.document.getElementById('color-button');
	var ccChooser = unsafeWindow.document.getElementById('color-chooser');
	var ccCellSize = 14;
	
	ccButton.addEventListener('mouseover', function() {drawColorButton(true);}, false);
	ccButton.addEventListener('mouseout', function() {drawColorButton(false);}, false);
	ccButton.addEventListener('click', function() {
		var obj = document.getElementById('div-color-chooser');
		if (obj.style.visibility != "visible")
			obj.style.visibility = "visible";
		else
			obj.style.visibility = "hidden";
	}, false);
	
	function drawColorButton(hover) {
		var ctx = ccButton.getContext("2d");
		ctx.save();
		ctx.lineCap = "round";
		ctx.fillStyle = (hover == true) ? "#ffffff" : "#dae1e8";
		ctx.strokeStyle = "#abb8c7";
		ctx.beginPath();
		ctx.moveTo(2, 12);
		ctx.lineTo(8, 8);
		ctx.lineTo(14, 12);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
	
	function drawBrushPreview() {
		var bctx = cBrush.getContext("2d");
		var cctx = ccButton.getContext("2d");
		
		bctx.save();
		bctx.globalAlpha = 1.0;
		bctx.fillStyle = "#ffffff";
		bctx.fillRect(0, 0, cBrush.width, cBrush.height);
		bctx.restore();
		
		cctx.fillStyle = ctx[0].strokeStyle;
		cctx.strokeStyle = "#cccccc";
		cctx.fillRect(1, 16, 13, 13);
		cctx.strokeRect(1, 16, 13, 13);
		drawColorButton(false);

		bctx.strokeStyle = ctx[0].strokeStyle;
		bctx.lineWidth = ctx[0].lineWidth;
		bctx.lineCap = ctx[0].lineCap;
		bctx.globalAlpha = ctx[1].globalAlpha;
		
		bctx.beginPath();
		bctx.moveTo(cBrush.width / 2, cBrush.height / 2);
		bctx.lineTo(cBrush.width / 2 + 0.1, cBrush.height / 2 + 0.1);
		bctx.stroke();
		bctx.closePath();
	}
	
	function drawColorMap() {
		var ctx = ccChooser.getContext("2d"), width = ccChooser.width, height = ccChooser.height;
		ctx.fillStyle = "#000000";
		for (var x = 0; x < width; x+=ccCellSize)
			ctx.fillRect(x, 0, 1, height);
		for (var y = 0; y < width; y+=ccCellSize)
			ctx.fillRect(0, y, width, 1);
		
		function ccFillSquare(cellX, cellY, r, g, b) {
			ctx.fillStyle = "rgb("+r+","+g+","+b+")";
			ctx.fillRect(cellX*ccCellSize+1, cellY*ccCellSize+1, ccCellSize-1, ccCellSize-1);
		}
	
		var r = 0, g = 0, b = 0;
		for (var q = 0; q < 2; q++) {
		for (var z = 0; z < 3; z++) {
			g = 0; b = 0;
			for (var y = 0; y < 6; y++) {
				g = 0;
				for (var x = 0; x < 6; x++) {
					ccFillSquare(x+z*6, y+q*6, r, g, b);
					g += 51;
				}
				b += 51;
			}
			r += 51;
		}}
	}
	
	var ccSelectedX = -1, ccSelectedY = -1;
	ccChooser.addEventListener('mousemove', function(e) {
		var cx = Math.floor(relX(e, ccChooser) / ccCellSize);
		var cy = Math.floor(relY(e, ccChooser) / ccCellSize);
		// Out of bounds
		if (cx >= 18 || cy >= 12)
			return;
		// Already selected
		if (cx == ccSelectedX && cy == ccSelectedY)
			return;
			
		var ctx = ccChooser.getContext("2d");
		function makeBorder(cx, cy, style) {
			ctx.fillStyle = style;
			strokeRect(ctx, cx*ccCellSize, cy*ccCellSize, ccCellSize+1, ccCellSize+1);
		}
		// Remove an old selection
		if (ccSelectedX >= 0 && ccSelectedY >= 0)
			makeBorder(ccSelectedX, ccSelectedY, "#000000");
		// Draw a selection
		makeBorder(cx, cy, "#ffffff");
		
		ccSelectedX = cx;
		ccSelectedY = cy;
	}, false);

	ccChooser.addEventListener("click", function(e) {
		var cx = Math.floor(relX(e, ccChooser) / ccCellSize);
		var cy = Math.floor(relY(e, ccChooser) / ccCellSize);
		var ccCtx = ccChooser.getContext("2d");
		var pixel = ccCtx.getImageData(cx*ccCellSize + 1, cy*ccCellSize + 1, 1, 1);

		ctx[0].strokeStyle = "rgb("+pixel.data[0]+","+pixel.data[1]+","+pixel.data[2]+")";
		document.getElementById("div-color-chooser").style.visibility = "hidden";
		drawBrushPreview();
	}, false);
	
	drawColorMap();
	drawBrushPreview();
	
	var cWidthChooser = unsafeWindow.document.getElementById('width-chooser'); 
	var cOpacityChooser = unsafeWindow.document.getElementById('opacity-chooser');

	makeSlider(cWidthChooser, 1, 60, ctx[0].lineWidth);
	cWidthChooser.onSlide = function(newVal) {
		ctx[0].lineWidth = newVal;
		drawBrushPreview();
	}
	
	makeSlider(cOpacityChooser, 0.0, 1.0, ctx[1].globalAlpha);
	cOpacityChooser.onSlide = function(newVal) {
		ctx[1].globalAlpha = newVal;
		drawBrushPreview();
	}
}, false);

unsafeWindow.postGraffiti = function() {
	var statusLine = document.getElementById("status-line");
	var dataUrl = drawArea.toDataURL();
	var dataStart = dataUrl.indexOf("base64")+7;
	var data = window.atob(dataUrl.substr(dataStart, dataUrl.length));

	var httpRequest = new XMLHttpRequest();
	var boundaryString = "--OLEG-ANDREEV-PAVEL-DUROV-GRAFFITI-POST";
	var boundary = "--" + boundaryString;
	var requestBody = boundary + '\r\n'
	    + 'Content-Disposition: form-data; name="Signature"\r\n\r\n' 
	    + MD5(dataUrl.substr(dataStart, 1024)) + '\r\n'
	    + boundary + '\r\n' 
	    + 'Content-Disposition: form-data; name="Filedata"; filename="graffiti.png"\r\n' 
	    + 'Content-Type: image/png\r\n\r\n'
	    + data + '\r\n' + boundary + '\r\n'
	    + 'Content-Disposition: form-data; name="Upload"\r\n\r\n'
	    + 'Submit Query\r\n' + boundary;
		httpRequest.open('POST', postTo, false);

	httpRequest.setRequestHeader("Content-Type", "multipart/form-data; boundary=\"" +
	                               boundaryString + "\"");
	httpRequest.setRequestHeader("Connection", "close");
	httpRequest.setRequestHeader("Content-Length", requestBody.length);
	statusLine.innerHTML = lang.msgLoading;
	httpRequest.sendAsBinary(requestBody);
	
	if (httpRequest.status == 200) {
		statusLine.innerHTML = '';
		document.location = redirectTo;
	} else
		statusLine.innerHTML = lang.msgError;
}

unsafeWindow.clearGraffiti = function() {
	ctx[1].save();
	ctx[1].globalAlpha = 1.0;
	ctx[1].fillStyle = "#ffffff";
	ctx[1].fillRect(0, 0, drawArea.width, drawArea.height);
	ctx[1].restore();
	commitGraffiti();
}

unsafeWindow.undoGraffiti = function() {
	if (history.length <= 1)
		return;
	history.pop();
	flipGraffiti();
}
