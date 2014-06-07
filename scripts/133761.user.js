// ==UserScript==
// @name           Radio Reddit - Will Work for Scrobbles
// @namespace      http://proseposeur.tumblr.com // http://radioreddit.com
// @license        FreeBSD License (see source code). Portions dual-licensed under the MIT (Expat) License and GPLv2.
// @description    For Radio Reddit: Scrobbling & loving on last.fm.  Adapted from The Groovin' Greasy Scrobbler 
// @version        -1.0
// @include        http://radioreddit.com/listen/*
// ==/UserScript==

/******************************************************************************

Copyright 2010, 2011 Eric Lin (RetypePassword), 2012 Radio Reddit
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 
 * Redistributions in binary form must reproduce the above copyright notice,
 Â  this list of conditions and the following disclaimer in the documentation
 Â  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*******************************************************************************

The phpjs function includes code from the php.js project, and has the
following copyright:

More info at: http://phpjs.org

This is version: 3.24
php.js is copyright 2011 Kevin van Zonneveld.

Portions copyright Brett Zamir (http://brett-zamir.me), Kevin van Zonneveld
(http://kevin.vanzonneveld.net), Onno Marsman, Theriault, Michael White
(http://getsprink.com), Waldo Malqui Silva, Paulo Freitas, Jonas Raoni
Soares Silva (http://www.jsfromhell.com), Jack, Philip Peterson, Ates Goral
(http://magnetiq.com), Legaev Andrey, Ratheous, Alex, Martijn Wieringa,
Nate, lmeyrick (https://sourceforge.net/projects/bcmath-js/), Enrique
Gonzalez, Philippe Baumann, RafaÅ‚ Kukawski (http://blog.kukawski.pl),
Webtoolkit.info (http://www.webtoolkit.info/), Ole Vrijenhoek, Ash Searle
(http://hexmen.com/blog/), travc, Carlos R. L. Rodrigues
(http://www.jsfromhell.com), Jani Hartikainen, stag019, GeekFG
(http://geekfg.blogspot.com), WebDevHobo (http://webdevhobo.blogspot.com/),
Erkekjetter, pilus, RafaÅ‚ Kukawski (http://blog.kukawski.pl/), Johnny Mast
(http://www.phpvrouwen.nl), T.Wild,
http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript,
d3x, Michael Grier, Andrea Giammarchi (http://webreflection.blogspot.com),
marrtins, Mailfaker (http://www.weedem.fr/), Steve Hilder, gettimeofday,
mdsjack (http://www.mdsjack.bo.it), felix, majak, Steven Levithan
(http://blog.stevenlevithan.com), Mirek Slugen, Oleg Eremeev, Felix
Geisendoerfer (http://www.debuggable.com/felix), Martin
(http://www.erlenwiese.de/), gorthaur, Lars Fischer, Joris, AJ, Paul Smith,
Tim de Koning (http://www.kingsquare.nl), KELAN, Josh Fraser
(http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),
Chris, Marc Palau, Kevin van Zonneveld (http://kevin.vanzonneveld.net/),
Arpad Ray (mailto:arpad@php.net), Breaking Par Consulting Inc
(http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),
Nathan, Karol Kowalski, David, Dreamer, Diplom@t (http://difane.com/), Caio
Ariede (http://caioariede.com), Robin, Imgen Tata (http://www.myipdf.com/),
Pellentesque Malesuada, saulius, Aman Gupta, Sakimori, Tyler Akins
(http://rumkin.com), Thunder.m, Public Domain
(http://www.json.org/json2.js), Michael White, Kankrelune
(http://www.webfaktory.info/), Alfonso Jimenez
(http://www.alfonsojimenez.com), Frank Forte, vlado houba, Marco, Billy,
David James, madipta, noname, sankai, class_exists, Jalal Berrami, ger,
Itsacon (http://www.itsacon.net/), Scott Cariss, nobbler, Arno, Denny
Wardhana, ReverseSyntax, Mateusz "loonquawl" Zalega, Slawomir Kaniecki,
Francois, Fox, mktime, Douglas Crockford (http://javascript.crockford.com),
john (http://www.jd-tech.net), Oskar Larsson HÃ¶gfeldt
(http://oskar-lh.name/), marc andreu, Nick Kolosov (http://sammy.ru), date,
Marc Jansen, Steve Clay, Olivier Louvignes (http://mg-crea.com/), Soren
Hansen, merabi, Subhasis Deb, josh, T0bsn, Tim Wiel, Brad Touesnard, MeEtc
(http://yass.meetcweb.com), Peter-Paul Koch
(http://www.quirksmode.org/js/beat.html), Pyerre, Jon Hohle, duncan, Bayron
Guevara, Adam Wallner (http://web2.bitbaro.hu/), paulo kuong, Gilbert,
Lincoln Ramsay, Thiago Mata (http://thiagomata.blog.com), Linuxworld,
lmeyrick (https://sourceforge.net/projects/bcmath-js/this.), djmix, Bryan
Elliott, David Randall, Sanjoy Roy, jmweb, Francesco, Stoyan Kyosev
(http://www.svest.org/), J A R, kenneth, T. Wild, Ole Vrijenhoek
(http://www.nervous.nl/), Raphael (Ao RUDLER), Shingo, LH, JB, nord_ua, jd,
JT, Thomas Beaucourt (http://www.webapp.fr), Ozh, XoraX
(http://www.xorax.info), EdorFaus, Eugene Bulkin (http://doubleaw.com/),
Der Simon (http://innerdom.sourceforge.net/), 0m3r, echo is bad,
FremyCompany, stensi, Kristof Coomans (SCK-CEN Belgian Nucleair Research
Centre), Devan Penner-Woelk, Pierre-Luc Paour, Martin Pool, Brant Messenger
(http://www.brantmessenger.com/), Kirk Strobeck, Saulo Vallory, Christoph,
Wagner B. Soares, Artur Tchernychev, Valentina De Rosa, Jason Wong
(http://carrot.org/), Daniel Esteban, strftime, Rick Waldron, Mick@el,
Anton Ongson, Bjorn Roesbeke (http://www.bjornroesbeke.be/), Simon Willison
(http://simonwillison.net), Gabriel Paderni, Philipp Lenssen, Marco van
Oort, Bug?, Blues (http://tech.bluesmoon.info/), Tomasz Wesolowski, rezna,
Eric Nagel, Evertjan Garretsen, Luke Godfrey, Pul, Bobby Drake, uestla,
Alan C, Ulrich, Zahlii, Yves Sucaet, sowberry, Norman "zEh" Fuchs, hitwork,
johnrembo, Brian Tafoya (http://www.premasolutions.com/), Nick Callen,
Steven Levithan (stevenlevithan.com), ejsanders, Scott Baker, Philippe
Jausions (http://pear.php.net/user/jausions), Aidan Lister
(http://aidanlister.com/), Rob, e-mike, HKM, ChaosNo1, metjay, strcasecmp,
strcmp, Taras Bogach, jpfle, Alexander Ermolaev
(http://snippets.dzone.com/user/AlexanderErmolaev), DxGx, kilops, Orlando,
dptr1988, Le Torbi, James (http://www.james-bell.co.uk/), Pedro Tainha
(http://www.pedrotainha.com), James, penutbutterjelly, Arnout Kazemier
(http://www.3rd-Eden.com), 3D-GRAF, daniel airton wermann
(http://wermann.com.br), jakes, Yannoo, FGFEmperor, gabriel paderni, Atli
ÃžÃ³r, Maximusya, Diogo Resende, Rival, Howard Yeend, Allan Jensen
(http://www.winternet.no), davook, Benjamin Lupton, baris ozdil, Greg
Frazier, Manish, Matt Bradley, Cord, fearphage
(http://http/my.opera.com/fearphage/), Matteo, Victor, taith, Tim de
Koning, Ryan W Tenney (http://ryan.10e.us), Tod Gentille, Alexander M
Beedie, Riddler (http://www.frontierwebdev.com/), Luis Salazar
(http://www.freaky-media.com/), RafaÅ‚ Kukawski, T.J. Leahy, Luke Smith
(http://lucassmith.name), Kheang Hok Chin (http://www.distantia.ca/),
Russell Walker (http://www.nbill.co.uk/), Jamie Beck
(http://www.terabit.ca/), Garagoth, Andrej Pavlovic, Dino, Le Torbi
(http://www.letorbi.de/), Ben (http://benblume.co.uk/), DtTvB
(http://dt.in.th/2008-09-16.string-length-in-bytes.html), Michael, Chris
McMacken, setcookie, YUI Library:
http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html, Andreas,
Blues at http://hacks.bluesmoon.info/strftime/strftime.js, rem, Josep Sanz
(http://www.ws3.es/), Cagri Ekin, Lorenzo Pisani, incidence, Amirouche, Jay
Klehr, Amir Habibi (http://www.residence-mixte.com/), Tony, booeyOH, meo,
William, Greenseed, Yen-Wei Liu, Ben Bryan, Leslie Hoare, mk.keck

Dual licensed under the MIT (MIT-LICENSE.txt)
and GPL (GPL-LICENSE.txt) licenses.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

******************************************************************************/

/*   Use your comments or I will fucking destroy you.   */
/*   Getting this to work was hard enough.              */
/*   I don't know js.  At all.  You play with something,*/
/*   Say something in a comment.  e_e                   */

var API_KEY = "7fcdf4c8be7bcee95c84f41787ce3237"; // Replace the stuff between the quotes with your API key if you'd prefer to use your own.
var PRIV_KEY = ""; // Insert your private key between the quotes if you'd prefer to use your own API key.
var working = new Object(); // Stores working copy of metadata changes
var adsbutton = new Object();

// GM emulation for Google Chrome aka magic
if (typeof GM_deleteValue == "undefined") {
	GM_log = (function(message) {
		console.log(message); });
		
	GM_log("Setting custom GM functions for Google Chrome...");
	
	// Uses http://ericflin.com/scripts/restproxy.php as a proxy for cross-site xhr
	// uh… we may have to do something about this.  I don't know what any of this means,
	// though, so I can't.  
	
	GM_xmlhttpRequest = (function(args) {
		var xhr = new XMLHttpRequest();
		if (xhr) {
			var data = "u=" + encodeURIComponent(args.url);
			if (args.method == "POST") {
				data += "&data=" + encodeURIComponent(args.data); }
			xhr.open("POST", "http://ericflin.com/scripts/restproxy.php?m=" + args.method, true);
			
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Content-Length", data.length);
			xhr.setRequestHeader("Connection", "close");
			
			xhr.send(data);
			
			xhr.onreadystatechange = (function() {
				if(xhr.readyState == 4) {
					args.onload(xhr); } });

			return xhr; } });
	
	GM_getValue = (function(key) {
		var value = localStorage.getItem(key);
		return JSON.parse(value); });

	GM_setValue = (function(key, value) {
		localStorage.setItem(key, JSON.stringify(value)); }); }

// Escaping this for now.  Not entirely sure what it does, but I'm assuming it's to do with 
// fucking with the Grooveshark player. 
/* function fullize(undo) {
	var width = document.getElementById("mainContainer").clientWidth;
	var side = document.getElementById("sidebar").clientWidth;
	var smallwidth = undo ? (width - side - 180) + "px" : (width - side) + "px";
	
	var page = document.getElementById("page_wrapper");
	var theme = document.getElementById("theme_home");

	setTimeout(function() { theme.getElementsByTagName("div")[0].getElementsByTagName("img")[0].style.width = smallwidth }, 100);

	page.style.width = smallwidth; } 
	
function permset(undo) {
	var ads = document.getElementById("capital");
	var app = document.getElementById("application");
	if (!undo) {
		ads.style.display = "none";
		app.style.cssText = "margin-right: 0; width: 100%;"; }
	else {
		ads.style.display = "";
		app.style.cssText = ""; } }
		
function searchads(textNode) {
	var ads = document.getElementById("searchCapitalWrapper");
	if ((textNode.nodeValue == "All Ads Hidden" || textNode.nodeValue == "Search Ads Hidden") && ads) {
		ads.style.display = "none"; }
	else if (ads) {
		ads.style.display = "block"; }
	setTimeout(function() { searchads(textNode); }, 500); } */
	
	// here's where the magic happens
	// oh god please work
	// ALBUM ATTRIBUTE HAS BEEN REMOVED.
jQuery.getJSON(Globals.streams.streams[Globals.stream].status+'status.json');
(function(data) {
(function getSAA() {
	var song = document.getElementById("unescapifyHTML(data.songs.song[x].title)");
	var artist = document.getElementById("unescapifyHTML(data.songs.song[x].artist)");
/*	var id = playing.attributes.getNamedItem("rel") ? playing.attributes.getNamedItem("rel").value : false;
	var song, artist, album, fso, far, fal;
	
	if (id !== false && id != "null") {
		var parser = new DOMParser();
		
		if (working.so && working.so[id]) {
			song = working.so[id];
			fso = true; }
		if (working.ar && working.ar[id]) {
			artist = working.ar[id];
			far = true; }
		if (working.al && working.al[id]) {
			album = working.al[id];
			fal = true; }
		
		var curSongDat = parser.parseFromString("<song>" + playing.innerHTML + "</song>", "text/xml");
		var attrs = curSongDat.getElementsByTagName("a");
		var gotil = attrs.length;
		for (var i = 0; i < gotil; i++) {
			if (fso !== true && attrs[i].attributes.getNamedItem("class").value.indexOf("song") != -1) {
				song = attrs[i].attributes.getNamedItem("title").value; }
			if (far !== true && attrs[i].attributes.getNamedItem("class").value == "artist") {
				artist = attrs[i].attributes.getNamedItem("title").value; }
			if (fal !== true && attrs[i].attributes.getNamedItem("class").value == "album") {
				album = attrs[i].attributes.getNamedItem("title").value; } } } */

	return [song, artist]; }); });

// I have no idea what the fuck this does

(function phpjs() {

this.utf8_encode = (function ( argString ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
});

this.md5 = (function (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: md5('Kevin van Zonneveld');
    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

    var xl;

    var rotateLeft = (function (lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    });

    var addUnsigned = (function (lX,lY) {
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
    });

    var _F = (function (x,y,z) { return (x & y) | ((~x) & z); });
    var _G = (function (x,y,z) { return (x & z) | (y & (~z)); });
    var _H = (function (x,y,z) { return (x ^ y ^ z); });
    var _I = (function (x,y,z) { return (y ^ (x | (~z))); });

    var _FF = (function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    });

    var _GG = (function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    });

    var _HH = (function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    });

    var _II = (function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    });

    var convertToWordArray = (function (str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=new Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    });

    var wordToHex = (function (lValue) {
        var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);
        }
        return wordToHexValue;
    });

    var x=[],
        k,AA,BB,CC,DD,a,b,c,d,
        S11=7, S12=12, S13=17, S14=22,
        S21=5, S22=9 , S23=14, S24=20,
        S31=4, S32=11, S33=16, S34=23,
        S41=6, S42=10, S43=15, S44=21;

    str = this.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    
    xl = x.length;
    for (k=0;k<xl;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=_FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=_FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=_FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=_FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=_FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=_FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=_FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=_FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=_GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=_GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=_HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=_HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=_II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=_II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=_II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=_II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=_II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=_II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=_II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=_II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=addUnsigned(a,AA);
        b=addUnsigned(b,BB);
        c=addUnsigned(c,CC);
        d=addUnsigned(d,DD);
    }

    var temp = wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);

    return temp.toLowerCase();
}); }

/* function loadui(event, text) {
	return genLoadui(event, text, "button"); };

function loaduia(event, text) {
	return genLoadui(event, text, "button"); };
	var text = genLoadui(event, text, "a")
	return text.parentNode.parentNode; } */

// adapted from tuba.fm's shit, google it

function loadui(event, text, id) {
    return genLoadui(event, text, "a", id); };

function loaduia(event, text) {
    var text = genLoadui(event, text, "a")
    return text.parentNode.parentNode; }

// Creates a button in the upper right hand corner of the top bar.
function genLoadui(event, text, type, id) {
    //GM_log("genLoadui: "+text);
    //var opts = document.getElementById("userOptions");
    var opts = $("#user_panel > ul> li:first-child");
    //GM_log(opts.text());
    //var len = opts.childNodes.length;

    /*
    for (var i = 0; i < len; i++) {
        var node = opts.childNodes[i];
        if (node.nodeName == "LI" && node.className.indexOf("last") != -1) {
            node.className = node.className.replace("last", ""); } }
    */
    var classify_name = text
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/\:/g, '')
                        .replace(/\./g, '');

    var lovely = document.createElement("li");
    //lovely.className = "last";
    
    var btn = document.createElement("a");
    //btn.type = "a";
    btn.className = "navigation-item-B "+classify_name;
    if (id != undefined) {
        btn.id = id;
    }
    btn.addEventListener("click", event, false);
    //btn.onclick(event);

    //var span = document.createElement("span");
    var lastfmlove = document.createTextNode(text);

    //span.appendChild(lastfmlove);
    btn.appendChild(lastfmlove);
    lovely.appendChild(btn);
    //opts.appendChild(lovely);
    //opts.parent().after().append(lovely);
    opts.after(lovely);

    return lastfmlove;
};


(function lastfm() {
	var mdk = false;
	var auth = false;
	var odat = ["", "", ""];
	var ndat;
	var sKey;
	var uName;
	var tTimer;
	var tried; // last action tried before a potential failure (scrobble or nowPlaying)
	var failedScrobs = new Array(); // array of failed scrobbles.
	var correctedDat = new Array();
	var nPlaying = "";
	var titleAppend = "";
	var lPElapsed = 0;
	var loved = false;
	var lovebtn;
	var interceptFav = 0;
	
	var love = (function() {
		if (lovebtn.nodeValue != "No Song Playing" && lovebtn.nodeValue != "Sending Request..." && lovebtn.nodeValue != "Last.fm Down" && auth === true) {
			var lovedat = new Array();
			lovedat[0] = "track=" + encodeURIComponent(correctedDat[0]) + "&artist=" + encodeURIComponent(correctedDat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
			lovedat[1] = loved ? "track.unlove" : "track.love";
			lovedat[2] = correctedDat[0];
			lovedat[3] = correctedDat[1];
			lovebtn.nodeValue = "Sending Request...";
			dofunc(["track" + correctedDat[0], "artist" + correctedDat[1], "api_key" + API_KEY, "sk" + sKey], lovedat[1], "sendLove", lovedat); } });
	
	var sendLove = (function(lovedat) {
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://ws.audioscrobbler.com/2.0/?method=" + lovedat[1],
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Content-Length": lovedat[0].length,
				"Content-Type": "application/x-www-form-urlencoded" },
			data: lovedat[0],
			onload: (function(response) {
				GM_log(response.responseText);
				if (lovedat[1] == "track.love") {
					if (lovedat[2] == correctedDat[0] || lovedat[2] == ndat[0]) {
						loved = true;
						lovebtn.nodeValue = "Last.fm: Unlove Song";
						titleAppend += " (\u2665)";
						document.title += " (\u2665)"; }
					GM_log("Loved " + lovedat[2] + " by " + lovedat[3]); }
				else if (lovedat[1] == "track.unlove" && (lovedat[2] == correctedDat[0] || lovedat[2] == ndat[0]) && odat[0] == ndat[0]) {
					lovebtn.nodeValue = "last.fm: Love Song";
					loved = false;
					titleAppend = "+";
					GM_log("Unloved " + ndat[0] + " by " + ndat[1]); }
				else if (lovedat[1] == "track.unlove" && lovedat[2] != correctedDat[0] && lovedat[2] != ndat[0]) {
					GM_log("Unloved " + lovedat[2] + " by " + lovedat[3]); }
				else {
					lovebtn.nodeValue = "last.fm: Love Song";
					loved = false;
					titleAppend = "";
					GM_log("Unloved " + ndat[0] + " by " + ndat[1]); } } }); ); }); )
	
	var procData = (function(data, favorite) {
		var lovedat = new Array();
		var artist;
		var song;
		if (favorite) {
			artist = working.ar[data.parameters.ID] ? working.ar[data.parameters.ID] : data.parameters.details.artistName;
			song = working.so[data.parameters.ID] ? working.so[data.parameters.ID] : data.parameters.details.songName; }
		else if (!favorite) {
			// Get song name
			var queue = document.getElementById("queue_songs_button");
			var parser = new DOMParser();
			var nums = parser.parseFromString("<num>" + queue.innerHTML + "</num>", "text/xml");
			var songnum = parseInt(nums.getElementsByTagName("span")[0].childNodes[0].nodeValue);
			for (var i = 1; i <= songnum; i++) {
				var testid = document.getElementById(i);
				if (testid.attributes.getNamedItem("rel").value == data.parameters.ID) {
					for (var x = 0; x < testid.childNodes.length; x++) {
						if (testid.childNodes[x].nodeName == "A" && testid.childNodes[x].className.indexOf("queueSong_name") != -1) {
							song = testid.childNodes[x].title; }
						else if (testid.childNodes[x].nodeName == "A" && testid.childNodes[x].className.indexOf("queueSong_artist") != -1) {
							artist = testid.childNodes[x].title; } } } }
			if (song == null) {
				var list = document.getElementsByTagName("UL");
				for (var i = 0; i < list.length; i++) {
					if (list[i].attributes.getNamedItem("rel") && list[i].attributes.getNamedItem("rel").value == data.parameters.ID) {
						var rawdat = list[i].parentNode.parentNode.innerHTML;
						
						var songclass = rawdat.indexOf("songName") + 1;
						var titleInd = rawdat.indexOf("title", songnclass) + 1;
						var start = rawdat.indexOf("\"", titleInd) + 1;
						var end = rawdat.indexOf("\"", start);
						song = rawdat.substring(start, end);
					
						var artistclass = rawdat.indexOf("artist") + 1;
						var titleInd = rawdat.indexOf("title", artistclass) + 1;
						var start = rawdat.indexOf("\"", titleInd) + 1;
						var end = rawdat.indexOf("\"", start);
						artist = rawdat.substring(start, end); } } } }
		if (song == ndat[0] && (loved && favorite || !loved && !favorite)) {
			if (loved && favorite) {
				GM_log(song + " by " + artist + " is already loved on last.fm."); }
			else if (!loved && !favorite) {
				GM_log(song + " by " + artist + " is already unloved on last.fm."); } }
		else {
			lovedat[0] = "track=" + encodeURIComponent(song) + "&artist=" + encodeURIComponent(artist) + "&api_key=" + API_KEY + "&sk=" + sKey;
			lovedat[1] = favorite ? "track.love" : "track.unlove";
			lovedat[2] = song;
			lovedat[3] = artist;
			var logtext = favorite ? "Favorited " : "Unfavorited ";
		
			GM_log(logtext + song + " by " + artist);
			setTimeout(function() { dofunc(["track" + song, "artist" + artist, "api_key" + API_KEY, "sk" + sKey], lovedat[1], "sendLove", lovedat); }, 0); } });

	var detProc = (function(num, dat) {
		var processor = (function(data) { GM_log(data); });
		if (num != 0) {
			if (num == 1) {
				processor = (function(data) {
					if (data && data.method && data.method == "favorite") {
						procData(data, true); } }); }
			else if (num == 2) {
				processor = (function(data) {
					if (data && data.method && data.method == "unfavorite") {
						procData(data, false); } }); }
			else {
				processor = (function(data) {
					if (data && data.method && (data.method == "favorite" || data.method == "unfavorite")) {
						if (data.method == "favorite") {
							procData(data, true); }
						else {
							procData(data, false); } } }); } }
		processor(JSON.parse(dat)); });
		
	var checkFav = (function() {
		interceptFav = GM_getValue("interceptFavorite");
		if (typeof interceptFav == "undefined" || interceptFav == null) {
			interceptFav = 0; }
		
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.textContent = "var oldxhrsend = XMLHttpRequest.prototype.send;\n";
		document.body.appendChild(script);
		document.body.removeChild(script);
		
		var dataholder = document.createElement("span");
		dataholder.id = "favdat";
		dataholder.style.display = "none";
		document.body.appendChild(dataholder);
		
		var passto = (function() {
			detProc(interceptFav, this.textContent); });
		dataholder.addEventListener("newdata", passto, false);
		
		var xhrmod = document.createElement("script");
		xhrmod.setAttribute("type", "text/javascript");
		xhrmod.textContent = "function xhrse(send) {\n" +
			"XMLHttpRequest.prototype.send = function(data) {\n" +
				"if (data) {\n" +
					"var spandataholder = document.getElementById(\"favdat\");\n" +
					"spandataholder.textContent = data;\n" +
					"\nvar sdhev = document.createEvent(\"Event\");\n" +
					"sdhev.initEvent(\"newdata\", false, false);\n" +
					"spandataholder.dispatchEvent(sdhev); }\n" +
				"send.call(this, data); }; }\n" +
			"xhrse(XMLHttpRequest.prototype.send);\n";
		document.body.appendChild(xhrmod);
		document.body.removeChild(xhrmod); });
	
	var toggleCheckFav = (function() {
		// interceptFav = 0: Don't intercept; 1: Only intercept favorites; 2: Only intercept unfavorites; 3: Intercept both
		if (typeof interceptFav == "undefined" || interceptFav == null) {
			interceptFav = 0; }
		var num = prompt("Please enter one of the following values:\n0: Don't intercept anything\n1: Intercept favorites\n2: Only intercept unfavorites\n3: Intercept both", interceptFav);
		var intNum = parseInt(num, 10);
		
		// Don't do anything if the user pressed cancel
		if (!isNaN(intNum) && num != null && num < 4 && num >= 0) {
			GM_setValue("interceptFavorite", intNum);
			interceptFav = intNum; }
		else if (num != null) {
			while (isNaN(intNum) || num >= 4 || num < 0) {
				num = prompt("You entered an invalid value. Please enter one of the following values:\n0: Don't intercept anything\n1: Only intercept favorites\n2: Only intercept unfavorites\n3: Intercept both", interceptFav); }
			GM_setValue("interceptFavorite", parseInt(num, 10));
			interceptFav = intNum; } });
	
	var doNowPlaying = (function(scrobbledat) {
		tried = GM_xmlhttpRequest({
			method: "POST",
			url: "http://ws.audioscrobbler.com/2.0/?method=track.updateNowPlaying",
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Content-Length": scrobbledat.length,
				"Content-Type": "application/x-www-form-urlencoded" },
			data: scrobbledat,
			onload: (function(response) {
				nPlaying = ndat[0];
				GM_log(response.responseText);
				document.title = ndat[0] + " by " + ndat[1];
				titleAppend = "";
				var time = new Date();
				var t = Math.round(parseInt(time.getTime()/1000));
				
				GM_xmlhttpRequest({
					method: "GET",
					// Timestamp isn't actually one of the parameters. It's just used here to force firefox not to use the cache.
					url: "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=" + encodeURIComponent(ndat[1]) + "&track=" + encodeURIComponent(ndat[0]) + "&username=" + uName + "&api_key=" + API_KEY + "&timestamp=" + t,
					onload: function(response) {
						var parser = new DOMParser();
						trackinfo = parser.parseFromString(response.responseText, "text/xml");
						correctedDat[0] = trackinfo.getElementsByTagName("name")[0].childNodes[0].nodeValue;
						correctedDat[1] = trackinfo.getElementsByTagName("name")[1].childNodes[0].nodeValue;
						if (trackinfo.getElementsByTagName("userloved")[0].childNodes[0].nodeValue == 1) {
							lovebtn.nodeValue = "Last.fm: Unlove Song";
							loved = true;
							titleAppend = " (\u2665)";
							document.title += " (\u2665)"; }
						else {
							lovebtn.nodeValue = "Last.fm: Love Song";
							loved = false; } } } ); }); });); };
							
	var doFailedScrobs = (function(scrobblae) {
		var datArr = new Array();

		var scrobbledat = "";
		for (i in scrobblae) {
			datArr.push("track[" + i + "]" + failedScrobs[i][0]);
			datArr.push("timestamp[" + i + "]" + failedScrobs[i][3]);
			datArr.push("artist[" + i + "]" + failedScrobs[i][1]);
			
			scrobbledat = scrobbledat + "track[" + i + "]=" + encodeURIComponent(failedScrobs[i][0]) +
			"&timestamp[" + i + "]=" + failedScrobs[i][3] +
			"&artist[" + i + "]=" + encodeURIComponent(failedScrobs[i][1]) +
		scrobbledat = scrobbledat + "api_key=" + API_KEY + "&sk=" + sKey;
		datArr.push("api_key" + API_KEY);
		datArr.push("sk" + sKey);

		dofunc(datArr, "track.scrobble", "failedScrobbles", scrobbledat); };

	var doScrobble = (function(scrobbledat, failed) {
		tried = GM_xmlhttpRequest({
			method: "POST",
			url: "http://ws.audioscrobbler.com/2.0/?method=track.scrobble",
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Content-Length": scrobbledat.length,
				"Content-Type": "application/x-www-form-urlencoded" },
			data: scrobbledat,
			onload: (function(response) {
				var parser = new DOMParser();
				responseInfo = parser.parseFromString(response.responseText, "text/xml");
				// If the scrobble failed (i.e., lfm status is not "ok"), don't do anything. CheckRunning will
				// log this as a failed scrobble and re-try it later.
				GM_log(responseInfo.getElementsByTagName("lfm")[0].attributes.getNamedItem("status").value);
				if (responseInfo.getElementsByTagName("lfm")[0].attributes.getNamedItem("status").value == "ok") {
					if (failed) {
						GM_log(response.responseText);
						failedScrobs = new Array();
						GM_setValue("failedScrobs", ""); }
					else {
						titleAppend = "+" + titleAppend;
						document.title = ndat[0] + " by " + ndat[1] + titleAppend;
						GM_log(response.responseText);
						odat = ndat; } }
				else {
					GM_log(response.responseText); });});});); });
					
	this.killSAA = function() {
		mdk = true;
		return "Killed last.fm scrobbler instance"; };
	
	var saa = (function() {
		ndat = getSAA();
		
	
		var time = new Date();
		var t = Math.round(parseInt(time.getTime()/1000));
		/*
		var totalt = document.getElementById("player_duration").innerHTML;
		var totaltsec = (parseInt(totalt.substring(0, totalt.indexOf(":")), 10) * 60) + parseInt(totalt.substring(totalt.indexOf(":") + 1), 10)
		
		var pelapsed = document.getElementById("player_elapsed").innerHTML;
		var pelapsedInSec = (parseInt(pelapsed.substring(0, pelapsed.indexOf(":")), 10) * 60) + parseInt(pelapsed.substring(pelapsed.indexOf(":") + 1), 10);
		*/
		
		// I AM MACGYVER
		var totalt = 180;
		var totaltsec = 180;
		var prelapsed = 180;
		var perlapsedInSec = 180;
		
		var playButton = document.getElementById("player_play_pause").className;
		
		var frac = pelapsedInSec / totaltsec;
		var diff = totaltsec - pelapsedInSec;
		var start = t - pelapsedInSec;
		
		// …uh…
		
		if (auth === true && mdk === false) {
			if ((lPElapsed == pelapsedInSec && playButton.indexOf(" play") != -1) || typeof ndat[0] == "undefined") {
				lPElapsed = pelapsedInSec;
				document.title = "Stopped/Paused";
				lovebtn.nodeValue = "No Song Playing";
				setTimeout(saa, 2000); }
			else if (totaltsec > 30 && (frac >= 0.5 || pelapsedInSec >= 240) && ndat[0] != odat[0] && typeof ndat[0] != "undefined") {
				var scrobbledat = "track[0]=" + encodeURIComponent(ndat[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(ndat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
				lPElapsed = pelapsedInSec;
				
				if (failedScrobs.length > 0) {
					ndat.push(start);
					failedScrobs.push(ndat);
					doFailedScrobs(failedScrobs);
					checkRunning("tryScrobs", start); }
				else {
					dofunc(["track[0]" + ndat[0], "timestamp[0]" + start, "artist[0]" + ndat[1], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
					checkRunning("scrobble", start); } }
			else if (totaltsec > 30 && ndat[0] != odat[0] && typeof ndat[0] != "undefined" && nPlaying != ndat[0] && pelapsedInSec > 0) {
				var scrobbledat = "track=" + encodeURIComponent(ndat[0]) + "&artist=" + encodeURIComponent(ndat[1]) + "&duration=" + totaltsec + "&api_key=" + API_KEY + "&sk=" + sKey;
				lPElapsed = pelapsedInSec;
				
				dofunc(["track" + ndat[0], "artist" + ndat[1], "api_key" + API_KEY, "sk" + sKey, "duration" + totaltsec], "track.updateNowPlaying", "doNowPlaying", scrobbledat);
				checkRunning("nowPlaying", start); }
			else if (ndat[0] == odat[0] && frac < 0.5 && pelapsedInSec < 15) {
				nPlaying = "";
				odat = ["", "", ""];
				setTimeout(saa, 2000); }
			else if (playButton.indexOf(" buffering") != -1) {
				document.title = "Buffering...";
				setTimeout(saa, 2000); }
			else {
				if (document.title == "Stopped/Paused") {
					lovebtn.nodeValue = loved ? "Last.fm: Unlove Song" : "Last.fm: Love Song"; }
				lPElapsed = pelapsedInSec;
				document.title = ndat[0] + " by " + ndat[1] + titleAppend;
				setTimeout(saa, 2000); } }
		else if (mdk === false) {
			if ((lPElapsed == pelapsedInSec && playButton.indexOf(" play") != -1) || typeof ndat[0] == "undefined") {
				lPElapsed = pelapsedInSec;
				document.title = "Stopped/Paused"; }
			else if (playButton.indexOf(" buffering") != -1) {
				document.title = "Buffering..."; }
			else {
				lPElapsed = pelapsedInSec;
				document.title = ndat[0] + " by " + ndat[1]; } 
			setTimeout(saa, 2000); } });
	
	var checkRunning = (function(action, start) {
		doCheckRunning = (function(iter) {
			if ((action == "scrobble" && ndat[0] == odat[0]) || (action == "nowPlaying" && nPlaying == ndat[0]) ||
				(action == "failedScrobs" && failedScrobs.length == 0) || (action == "tryScrobs" && failedScrobs.length == 0)) {
				if (action == "tryScrobs") {
					titleAppend = "+" + titleAppend;
					document.title = ndat[0] + " by " + ndat[1] + titleAppend;
					odat = ndat; })
					
				if (iter >= 2) {
					saa(); }
				else {
					setTimeout(saa, 2000); } }
			else if (action == "scrobble" && ndat[0] != odat[0] && iter >= 8) {
				tried.abort();
				
				// The XMLHttpRequest abort() method runs onreadystatechange() if the request state was
				// either LOADING, HEADERS_RECEIVED, or OPENED. If it's OPENED, send()'s flag has to be true.
				// It's probably safe to assume that for most of the time, if onreadystatechange() ran,
				// last.fm got the scrobble.
				if (ndat[0] != odat[0]) {
					ndat.push(start);
					failedScrobs.push(ndat);
					GM_setValue("failedScrobs", JSON.stringify(failedScrobs));
					
					titleAppend = "-" + titleAppend;
					document.title = ndat[0] + " by " + ndat[1] + titleAppend;
					odat = ndat; }
				
				saa(); }
			else if (action == "nowPlaying" && nPlaying != ndat[0] && iter >= 8) {
				tried.abort();
				
				nPlaying = ndat[0];
				document.title = ndat[0] + " by " + ndat[1];
				titleAppend = "";
				lovebtn.nodeValue = "Last.fm Down";
				
				saa(); }
			else if ((action == "failedScrobs" || action == "tryScrobs") && failedScrobs.length != 0 && iter >= 8) {
				tried.abort();
				
				GM_setValue("failedScrobs", JSON.stringify(failedScrobs));
				
				if (nPlaying == ndat[0]) {
					odat = ndat; }
				
				saa(); }
			else {
				setTimeout(function() { doCheckRunning(iter + 1); }, 1000); } };
			
		doCheckRunning(0); });
		
	var lfmOff = (function() {
		sKey = null;
		uName = null;
		GM_setValue("sessKey", false);
		GM_setValue("username", false);
		auth = false;
		
		// This is the button. Parent should be "li." Grandparent should be "ul."
		this.parentNode.parentNode.removeChild(this.parentNode);
		
		var turnOnLfm = (function() {
			// Change button text. Child is span. "Grandchild" is textnode.
			if (this.childNodes[0].childNodes[0].nodeValue != "Waiting for Token...") {
				this.childNodes[0].childNodes[0].nodeValue = "Loading..."; });});
			
		lovebtn.nodeValue = "Last.fm: Disabled";
		var lfmbtn = loaduia(turnOnLfm, "Waiting for Token...");
		lfmbtn.style.color = "#fff";
		
		// Get link for enabling last.fm
		dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn); };
					
	var getsess = (function(initTok, apisig) {
		var sessKey;
		var name;
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://ws.audioscrobbler.com/2.0/?method=auth.getsession&api_key=" + API_KEY + "&token=" + initTok + "&api_sig=" + apisig,
			onload: (function(xhr) {
				var parser = new DOMParser();
				xmlized = parser.parseFromString(xhr.responseText, "text/xml");
				var rlfm = xmlized.getElementsByTagName("lfm")[0];
				if (rlfm.attributes.getNamedItem("status").value == "ok") {
					var keyPar = xmlized.getElementsByTagName("key")[0];
					sessKey = keyPar.childNodes[0].nodeValue;
					GM_setValue("sessKey", sessKey);
					sKey = sessKey;
				
					var namePar = xmlized.getElementsByTagName("name")[0];
					name = namePar.childNodes[0].nodeValue;
					GM_setValue("username", name);
					uName = name; } });}); });
	
	var dogetsess = (function(tok, enablelfmbtn) { 
		dofunc(["api_key" + API_KEY, "token" + tok], "auth.getsession", "getsess", tok);
		if (typeof sKey == "undefined" || typeof uName == "undefined" || sKey == null || 
			uName == null || sKey == false || uName == false) {
			setTimeout(function() { dogetsess(tok, enablelfmbtn); }, 2000); }
		else {
			// This is the button. Parent should be "li." "Grandparent" should be "ul."
			enablelfmbtn.parentNode.parentNode.removeChild(enablelfmbtn.parentNode);
			lovebtn.nodeValue = "No Song Playing";
			loadui(lfmOff, "Disable Last.fm Support");
			checkFav();
			auth = true; } });
		
	var gettok = (function(apisig, enablelfmbtn) { 
		var tok;
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=" + API_KEY + "&api_sig=" + apisig,
			onload: (function(response) {
				var temptoken = response.responseText;
				parser = new DOMParser();
				tokenXML = parser.parseFromString(temptoken, "text/xml");
				tokenPar = tokenXML.getElementsByTagName("token")[0];
				tok = tokenPar.childNodes[0].nodeValue;
				enablelfmbtn.href = "http://www.last.fm/api/auth/?api_key=" + API_KEY + "&token=" + tok;
				enablelfmbtn.target = "_blank";
				enablelfmbtn.childNodes[0].childNodes[0].nodeValue = "Enable Last.fm Support";
				enablelfmbtn.addEventListener("click", (function() { dogetsess(tok, enablelfmbtn); }), false);
			});}); });
		
	var dorun = (function(apisig, run, arg)) {
		if (run == "doScrobble") {
			doScrobble(arg + "&api_sig=" + apisig, false); }
		else if (run == "failedScrobbles") {
			doScrobble(arg + "&api_sig=" + apisig, true); }
		else if (run == "doNowPlaying") {
			doNowPlaying(arg + "&api_sig=" + apisig); }
		else if (run == "sendLove") {
			arg[0] = arg[0] + "&api_sig=" + apisig;
			sendLove(arg); }
		else if (run == "gettok") {
			gettok(apisig, arg); }
		else if (run == "getsess") {
			getsess(arg, apisig); } };
			
	var dofunc = (function(params, func, run, arg)) {
		if (auth === true || run == "gettok" || run == "getsess") {
			params.push("method" + func);
			params.sort();
			if (PRIV_KEY == "") {
				var allpars = "params=" + encodeURIComponent(params.join(""));
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://ericflin.com/scripts/api_sig.php",
					headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "application/atom+xml,application/xml,text/xml",
						"Content-Length": allpars.length,
						"Content-Type": "application/x-www-form-urlencoded" },
					data: allpars,
					onload: (function(response)) {
						dorun(response.responseText, run, arg); } } ); }
			else {
				md5er = new phpjs();
				var apisig = md5er.md5(params.join("") + PRIV_KEY);
				dorun(apisig, run, arg); } } };
	
	sKey = GM_getValue("sessKey");
	uName = GM_getValue("username");
	tFailedScrobs = GM_getValue("failedScrobs");
	if(typeof sKey == "undefined" || typeof uName == "undefined" ||
		sKey == null || uName == null || sKey == false || uName == false) { 
		auth = false;
		var turnOnLfm = (function()) {
			// Change button text. Child is span. "Grandchild" is textnode.
			this.childNodes[0].childNodes[0].nodeValue = "Loading..."; };
			
		lovebtn = loadui(love, "Last.fm: Disabled");
		var lfmbtn = loaduia(turnOnLfm, "Waiting for Token...");
		lfmbtn.style.color = "#fff";
		
		// Get link for enabling last.fm
		dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn);
		
		saa(); }
	else {
		auth = true;
		wait = false;
		
		if (typeof tFailedScrobs != "undefined" && tFailedScrobs != null && tFailedScrobs != false && tFailedScrobs != "") {
			wait = true;
			failedScrobs = JSON.parse(tFailedScrobs);
			doFailedScrobs(failedScrobs); }

		lovebtn = loadui(love, "No Song Playing");
		loadui(lfmOff, "Disable Last.fm Support");
		checkFav();
		
		if (wait) {
			var time = new Date();
			var t = Math.round(parseInt(time.getTime()/1000));
			checkRunning("failedScrobs", t); }
		else {
			saa(); } }

	/* GM_registerMenuCommand("Turn On/Off Love Favorited Tracks", toggleCheckFav); */ }


window.addEventListener("load", hideads, false);
