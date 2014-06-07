// ==UserScript==
// @name           MySpace Last.fm Scrobbler
// @namespace      http://userscripts.org/users/camico
// @description    MySpace Last.fm Scrobbler is a JS/Greasemonkey-based Last.fm scrobbler for MySpace. Based on SoundCloud Last.fm Scrobbler.
// @include        http://www.myspace.com/music/*
// @include        https://www.myspace.com/music/*
// @include        http://new.myspace.com/*
// @include        https://new.myspace.com/*
// @include        http://myspace.com/*
// @include        https://myspace.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @version        0.2.1
// @license        FreeBSD License (see source code). Portions dual-licensed under the MIT (Expat) License and GPLv2.
// ==/UserScript==

/******************************************************************************

Copyright 2011-2013, camico <camicoA7users.sourceforge.net> and Eric Lin
All rights reserved.
Based on SoundCloud Last.fm Scrobbler 0.1.6 GGS-0.9.5.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 
 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

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
Gonzalez, Philippe Baumann, Rafał Kukawski (http://blog.kukawski.pl),
Webtoolkit.info (http://www.webtoolkit.info/), Ole Vrijenhoek, Ash Searle
(http://hexmen.com/blog/), travc, Carlos R. L. Rodrigues
(http://www.jsfromhell.com), Jani Hartikainen, stag019, GeekFG
(http://geekfg.blogspot.com), WebDevHobo (http://webdevhobo.blogspot.com/),
Erkekjetter, pilus, Rafał Kukawski (http://blog.kukawski.pl/), Johnny Mast
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
john (http://www.jd-tech.net), Oskar Larsson Högfeldt
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
Þór, Maximusya, Diogo Resende, Rival, Howard Yeend, Allan Jensen
(http://www.winternet.no), davook, Benjamin Lupton, baris ozdil, Greg
Frazier, Manish, Matt Bradley, Cord, fearphage
(http://http/my.opera.com/fearphage/), Matteo, Victor, taith, Tim de
Koning, Ryan W Tenney (http://ryan.10e.us), Tod Gentille, Alexander M
Beedie, Riddler (http://www.frontierwebdev.com/), Luis Salazar
(http://www.freaky-media.com/), Rafał Kukawski, T.J. Leahy, Luke Smith
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

var API_KEY = "1080c460dd8769de8b33d059727b50f4"; // Replace the stuff between the quotes with your API key if you'd prefer to use your own.
var PRIV_KEY = ""; // Insert your private key between the quotes if you'd prefer to use your own API key.

// GM emulation for Google Chrome
if (typeof GM_deleteValue == "undefined") {
 	GM_log = function(message) {
 		console.info(message); };
		
	GM_log("Setting custom GM functions...");
	
	// Uses http://ericflin.com/scripts/restproxy.php as a proxy for cross-site xhr
	GM_xmlhttpRequest = function(args) {
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
			
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					args.onload(xhr); } };

			return xhr; } };
	
	GM_getValue = function(key) {
		var value = localStorage.getItem(key);
		return JSON.parse(value); };

	GM_setValue = function(key, value) {
		localStorage.setItem(key, JSON.stringify(value)); }; }

function phpjs() {

this.utf8_encode = function ( argString ) {
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
};

this.md5 = function (str) {
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

    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    };

    var addUnsigned = function (lX,lY) {
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
    };

    var _F = function (x,y,z) { return (x & y) | ((~x) & z); };
    var _G = function (x,y,z) { return (x & z) | (y & (~z)); };
    var _H = function (x,y,z) { return (x ^ y ^ z); };
    var _I = function (x,y,z) { return (y ^ (x | (~z))); };

    var _FF = function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var _GG = function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var _HH = function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var _II = function (a,b,c,d,x,s,ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function (str) {
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
    };

    var wordToHex = function (lValue) {
        var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);
        }
        return wordToHexValue;
    };

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
}; }

/* Parameters:
loveBtnParent: The parent element in which to create the love button.
lastfmBtnParent: The parent element in which to create the last.fm button.
saa: A function that invokes invoke([song, artist, album], songDuration, timeElapsed) with data. */

function lastfm(loveBtnParent, lastfmBtnParent, SAAHandler) {
	this.mdk = false;
	
	// Private Variables
	var my = this;
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
	var loveBtnModder = function(button) { return ""; };
	var lastfmBtnModder = function(button) { return ""; };
	var removeLastfmBtn = function(buttonText) {
		lastfmBtnParent.removeChild(buttonText.parentNode); };
	var saa = SAAHandler;
	
	// Forces invoke to re-do nowPlaying and, if applicable, scrobble (resets
	// the now playing variable so it thinks nothing's playing).
	this.forceDataReset = function() {
		nPlaying = "";
		odat = ["", "", ""]; }
	
	this.setLoveButtonModder = function(modder) {
		loveBtnModder = modder; };
		
	this.setLastfmButtonModder = function(modder) {
		lastfmBtnModder = modder; };
		
	this.setLastfmButtonDeleter = function(deleter) {
		removeLastfmBtn = deleter; };
	
	// A function that invokes invoke([song, artist, album], songDuration, timeElapsed) with data
	this.setSAA = function(newSAA) {
		saa = newSAA; };
	
	// Converts a time like 03:45 to seconds (e.g., 225).
	this.convertTimeToSec = function(convtime) {
		return (parseInt(convtime.substring(0, convtime.indexOf(":")), 10) * 60) + parseInt(convtime.substring(convtime.indexOf(":") + 1), 10); };
		
	this.makeUI = function(action, parent, text, modder) {
		// Check that the parent element exists
		if (parent) {
			// Make an <a> element that executes the action when clicked
			var linky = document.createElement("a");
			linky.href = "#"
			linky.addEventListener("click", action, false);
			
			// Make the text and add to link
			var node = document.createTextNode(text);
			linky.appendChild(node);
			
			// Put the a in the parent.
			parent.appendChild(linky);
			
			// Mod the a
			modder(linky);
			
			parent.style.display = (text == null) ? "none" : "inline";
		
			return node; }
			
		return false; };
		
	makeLove = function(action, text) {
		return my.makeUI(action, loveBtnParent, text, loveBtnModder); };
	
	makeLfm = function(action, text) {
		return my.makeUI(action, lastfmBtnParent, text, lastfmBtnModder); };
		
	// Runs the scrobbler function, runs the nowplaying function, or does nothing, depending
	// on the situation. This function MUST be invoked by a handler in the class using the
	// lastfm scrobbler in order for the whole thing to work.
	this.invoke = function(songdata, totaltsec, pelapsedInSec) {
		ndat = songdata;
		
		var time = new Date();
		var t = Math.round(parseInt(time.getTime()/1000));
		
		var frac = pelapsedInSec / totaltsec;
		var diff = totaltsec - pelapsedInSec;
		var start = t - pelapsedInSec;
		
		if (auth === true && this.mdk === false) {
			if (lPElapsed == pelapsedInSec || typeof ndat[0] == "undefined") {
				lPElapsed = pelapsedInSec;
				document.title = "Stopped/Paused";
				//lovebtn.nodeValue = "No Song Playing";
				loveBtnParent.style.display = "none";
				setTimeout(saa, 2000); }
			else if (totaltsec > 30 && (frac >= 0.5 || pelapsedInSec >= 240) && ndat[0] != odat[0] && typeof ndat[0] != "undefined") {
				GM_log("Got Here 3");
				var scrobbledat = "";
				
				if (failedScrobs.length > 0) {
					ndat.push(start);
					failedScrobs.push(ndat);
					doFailedScrobs(failedScrobs);
					checkRunning("tryScrobs", start); }
				else if (ndat[2]) { 
					scrobbledat = "track[0]=" + encodeURIComponent(ndat[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(ndat[1]) + "&album[0]=" + encodeURIComponent(ndat[2]) + "&api_key=" + API_KEY + "&sk=" + sKey;
					dofunc(["track[0]" + ndat[0], "timestamp[0]" + start, "artist[0]" + ndat[1], "album[0]" + ndat[2], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
					checkRunning("scrobble", start); }
				else {
					scrobbledat = "track[0]=" + encodeURIComponent(ndat[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(ndat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
					dofunc(["track[0]" + ndat[0], "timestamp[0]" + start, "artist[0]" + ndat[1], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
					checkRunning("scrobble", start); }

				lPElapsed = pelapsedInSec; }
			else if (totaltsec > 30 && ndat[0] != odat[0] && typeof ndat[0] != "undefined" && nPlaying != ndat[0] && pelapsedInSec > 0) {
				var scrobbledat = "track=" + encodeURIComponent(ndat[0]) + "&artist=" + encodeURIComponent(ndat[1]) + "&duration=" + totaltsec + "&api_key=" + API_KEY + "&sk=" + sKey;
				lPElapsed = pelapsedInSec;
				
				dofunc(["track" + ndat[0], "artist" + ndat[1], "api_key" + API_KEY, "sk" + sKey, "duration" + totaltsec], "track.updateNowPlaying", "doNowPlaying", scrobbledat);
				checkRunning("nowPlaying", start); }
			else if (ndat[0] == odat[0] && frac < 0.5 && pelapsedInSec < 240) {
				my.forceDataReset();
				setTimeout(saa, 2000); }
			else {
				if (document.title == "Stopped/Paused") {
					lovebtn.nodeValue = loved ? "Unlove" : "Love"; }
				lPElapsed = pelapsedInSec;
				document.title = ndat[0] + " by " + ndat[1] + titleAppend;
				loveBtnParent.style.display = "inline";
				setTimeout(saa, 2000); } }
		else {
			if (lPElapsed == pelapsedInSec || typeof ndat[0] == "undefined") {
				lPElapsed = pelapsedInSec;
				document.title = "Stopped/Paused"; }
			else {
				lPElapsed = pelapsedInSec;
				document.title = ndat[0] + " by " + ndat[1]; } 
			setTimeout(saa, 2000); } };
	
	// Private Methods
	var love = function(e) {
		e.preventDefault();
		//if (lovebtn.nodeValue != "No Song Playing"
		if (loveBtnParent.style.display != "none" && lovebtn.nodeValue != "Sending Request..." && auth === true) {
			var lovedat = new Array();
			lovedat[0] = "track=" + encodeURIComponent(correctedDat[0]) + "&artist=" + encodeURIComponent(correctedDat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
			lovedat[1] = loved ? "track.unlove" : "track.love";
			lovedat[2] = correctedDat[0];
			lovedat[3] = correctedDat[1];
			lovebtn.nodeValue = "Sending Request...";
			dofunc(["track" + correctedDat[0], "artist" + correctedDat[1], "api_key" + API_KEY, "sk" + sKey], lovedat[1], "sendLove", lovedat); } };
	
	var sendLove = function(lovedat) {
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://ws.audioscrobbler.com/2.0/?method=" + lovedat[1],
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Content-Length": lovedat[0].length,
				"Content-Type": "application/x-www-form-urlencoded" },
			data: lovedat[0],
			onload: function(response) {
				GM_log(response.responseText);
				if (lovedat[1] == "track.love") {
					if (lovedat[2] == correctedDat[0] || lovedat[2] == ndat[0]) {
						loved = true;
						lovebtn.nodeValue = "Unlove";
						titleAppend += " (\u2665)";
						document.title += " (\u2665)"; }
					GM_log("Loved " + lovedat[2] + " by " + lovedat[3]); }
				else if (lovedat[1] == "track.unlove" && (lovedat[2] == correctedDat[0] || lovedat[2] == ndat[0]) && odat[0] == ndat[0]) {
					lovebtn.nodeValue = "Love";
					loved = false;
					titleAppend = "+";
					GM_log("Unloved " + ndat[0] + " by " + ndat[1]); }
				else if (lovedat[1] == "track.unlove" && lovedat[2] != correctedDat[0] && lovedat[2] != ndat[0]) {
					GM_log("Unloved " + lovedat[2] + " by " + lovedat[3]); }
				else {
					lovebtn.nodeValue = "Love";
					loved = false;
					titleAppend = "";
					GM_log("Unloved " + ndat[0] + " by " + ndat[1]); } } } ); };
	
	var doNowPlaying = function(scrobbledat) {
		tried = GM_xmlhttpRequest({
			method: "POST",
			url: "http://ws.audioscrobbler.com/2.0/?method=track.updateNowPlaying",
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Content-Length": scrobbledat.length,
				"Content-Type": "application/x-www-form-urlencoded" },
			data: scrobbledat,
			onload: function(response) {
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
						// This if line is required for songs that have never been scrobbled to last.fm before.
						if (trackinfo.getElementsByTagName("name")[0] && trackinfo.getElementsByTagName("name")[1]) {
							correctedDat[0] = trackinfo.getElementsByTagName("name")[0].childNodes[0].nodeValue;
							correctedDat[1] = trackinfo.getElementsByTagName("name")[1].childNodes[0].nodeValue;
							if (trackinfo.getElementsByTagName("userloved")[0].childNodes[0].nodeValue == 1) {
								lovebtn.nodeValue = "Unlove";
								loved = true;
								titleAppend = " (\u2665)";
								document.title += " (\u2665)"; } 
							else {
								lovebtn.nodeValue = "Love";
								loved = false; } }
						else {
							correctedDat[0] = ndat[0];
							correctedDat[1] = ndat[1];
							lovebtn.nodeValue = "Love";
							loved = false; } } } ); } } ); };
				
	var doFailedScrobs = function(scrobblae) {
		var datArr = new Array();

		var scrobbledat = "";
		for (i in scrobblae) {
			datArr.push("track[" + i + "]" + failedScrobs[i][0]);
			datArr.push("timestamp[" + i + "]" + failedScrobs[i][3]);
			datArr.push("artist[" + i + "]" + failedScrobs[i][1]);
			if (failedScrobs[i][2]) {
				datArr.push("album[" + i + "]" + failedScrobs[i][2]); }
			
			scrobbledat = scrobbledat + "track[" + i + "]=" + encodeURIComponent(failedScrobs[i][0]) +
			"&timestamp[" + i + "]=" + failedScrobs[i][3] +
			"&artist[" + i + "]=" + encodeURIComponent(failedScrobs[i][1]);
			
			if (failedScrobs[i][2]) {
				scrobbledat = scrobbledat + "&album[" + i + "]=" + encodeURIComponent(failedScrobs[i][2]); }
		
			scrobbledat = scrobbledat + "&"; }
			
		scrobbledat = scrobbledat + "api_key=" + API_KEY + "&sk=" + sKey;
		datArr.push("api_key" + API_KEY);
		datArr.push("sk" + sKey);

		dofunc(datArr, "track.scrobble", "failedScrobbles", scrobbledat); };
	
	var doScrobble = function(scrobbledat, failed) {
		tried = GM_xmlhttpRequest({
			method: "POST",
			url: "http://ws.audioscrobbler.com/2.0/?method=track.scrobble",
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Content-Length": scrobbledat.length,
				"Content-Type": "application/x-www-form-urlencoded" },
			data: scrobbledat,
			onload: function(response) {
				var parser = new DOMParser();
				responseInfo = parser.parseFromString(response.responseText, "text/xml");

				// If the scrobble failed (i.e., lfm status is not "ok"), don't do anything. CheckRunning will
				// log this as a failed scrobble and re-try it later.
				if (responseInfo.getElementsByTagName("lfm")[0].attributes.getNamedItem("status").value == "ok") {
					if (failed) {
						GM_log("Re-Trying Failed Scrobbles: " + response.responseText);
						failedScrobs = new Array();
						GM_setValue("failedScrobs", ""); }
					else {
						titleAppend = "+" + titleAppend;
						document.title = ndat[0] + " by " + ndat[1] + titleAppend;
						GM_log(response.responseText);
						odat = ndat; } }
				else {
					GM_log(response.responseText); } } } ); };
	
	var checkRunning = function(action, start) {
		doCheckRunning = function(iter) {
			if ((action == "scrobble" && ndat[0] == odat[0]) || (action == "nowPlaying" && nPlaying == ndat[0]) ||
				(action == "failedScrobs" && failedScrobs.length == 0) || (action == "tryScrobs" && failedScrobs.length == 0)) {
				if (action == "tryScrobs") {
					titleAppend = "+" + titleAppend;
					document.title = ndat[0] + " by " + ndat[1] + titleAppend;
					odat = ndat; }
					
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
			
		doCheckRunning(0); };
		
	var lfmOff = function(e) {
		sKey = null;
		uName = null;
		GM_setValue("sessKey", false);
		GM_setValue("username", false);
		auth = false;
		
		removeLastfmBtn(this.childNodes[0]);
		
		var turnOnLfm = function(e) {
			// Change button text.
			if (this.childNodes[0].nodeValue != "Waiting...") {
				this.childNodes[0].nodeValue = "Loading..."; } };

		//lovebtn.nodeValue = "Last.fm: Disabled";
		loveBtnParent.style.display = "none";
		var lfmbtn = makeLfm(turnOnLfm, "Waiting...");
		
		dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn); };
					
	var getsess = function(initTok, apisig) {
		var sessKey;
		var name;
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://ws.audioscrobbler.com/2.0/?method=auth.getsession&api_key=" + API_KEY + "&token=" + initTok + "&api_sig=" + apisig,
			onload: function(xhr) {
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
					uName = name; } } }); };
					
	var dogetsess = function(tok, enablelfmbtn) { 
		dofunc(["api_key" + API_KEY, "token" + tok], "auth.getsession", "getsess", tok);
		if (typeof sKey == "undefined" || typeof uName == "undefined" || sKey == null || 
			uName == null || sKey == false || uName == false) {
			setTimeout(function() { dogetsess(tok, enablelfmbtn); }, 2000); }
		else {
			removeLastfmBtn(enablelfmbtn);
			//lovebtn.nodeValue = "No Song Playing";
			loveBtnParent.style.display = "none";
			makeLfm(lfmOff, "Disable Last.fm");
			auth = true; } };
		
	var gettok = function(apisig, enablelfmbtn) { 
		var tok;
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=" + API_KEY + "&api_sig=" + apisig,
			onload: function(response) {
				var temptoken = response.responseText;
				parser = new DOMParser();
				tokenXML = parser.parseFromString(temptoken, "text/xml");
				tokenPar = tokenXML.getElementsByTagName("token")[0];
				tok = tokenPar.childNodes[0].nodeValue;
				enablelfmbtn.parentNode.href = "http://www.last.fm/api/auth/?api_key=" + API_KEY + "&token=" + tok;
				enablelfmbtn.parentNode.target = "_blank";
				enablelfmbtn.nodeValue = "Enable Last.fm"
				enablelfmbtn.parentNode.addEventListener("click", function() { dogetsess(tok, enablelfmbtn); }, false);
			} }); };
		
	var dorun = function(apisig, run, arg) {
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
			
	var dofunc = function(params, func, run, arg) {
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
					onload: function(response) {
						dorun(response.responseText, run, arg); } } ); }
			else {
				md5er = new phpjs();
				var apisig = md5er.md5(params.join("") + PRIV_KEY);
				dorun(apisig, run, arg); } } };
				
	this.run = function() {
		sKey = GM_getValue("sessKey");
		uName = GM_getValue("username");
		tFailedScrobs = GM_getValue("failedScrobs");
		if(typeof sKey == "undefined" || typeof uName == "undefined" ||
			sKey == null || uName == null || sKey == false || uName == false) { 
			auth = false;
			var turnOnLfm = function(e) {
				// Change button text.
				this.childNodes[0].nodeValue = "Loading..."; };
				
			lovebtn = makeLove(love, null/*"Last.fm: Disabled"*/);
			var lfmbtn = makeLfm(turnOnLfm, "Waiting...");
		
			dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn);
			
			saa(); }
		else {
			auth = true;
			
			if (typeof tFailedScrobs != "undefined" && tFailedScrobs != null && tFailedScrobs != false && tFailedScrobs != "") {
				failedScrobs = JSON.parse(tFailedScrobs);
				var datArr = new Array();

				var scrobbledat = "";
				for (i in failedScrobs) {
					datArr.push("track[" + i + "]" + failedScrobs[i][0]);
					datArr.push("timestamp[" + i + "]" + failedScrobs[i][3]);
					datArr.push("artist[" + i + "]" + failedScrobs[i][1]);
					if (failedScrobs[i][2]) {
						datArr.push("album[" + i + "]" + failedScrobs[i][2]); }
					
					scrobbledat = scrobbledat + "track[" + i + "]=" + encodeURIComponent(failedScrobs[i][0]) +
					"&timestamp[" + i + "]=" + failedScrobs[i][3] +
					"&artist[" + i + "]=" + encodeURIComponent(failedScrobs[i][1]);
					if (failedScrobs[i][2]) {
						scrobbledat = scrobbledat + "&album[" + i + "]=" + encodeURIComponent(failedScrobs[i][2]); }
					scrobbledat = scrobbledat + "&"; }
				scrobbledat = scrobbledat + "api_key=" + API_KEY + "&sk=" + sKey;
				datArr.push("api_key" + API_KEY);
				datArr.push("sk" + sKey);

				dofunc(datArr, "track.scrobble", "failedScrobbles", scrobbledat); }

			lovebtn = makeLove(love, "");
			makeLfm(lfmOff, "Disable Last.fm");
			
			saa(); } }; }
			
lastfm.prototype.killScrobbler = function() {
	this.mdk = true;
	return "Killed last.fm scrobbler instance";
};

var fixSongTitle = function(str) {
	return str
		.replace(/^[0-2][0-9]\s?[_\.-]\s?(.*)/, "$1")
		.replace(/^[0][1-9]\s?(.*)/, "$1")
		.replace(/\.(mp3|wav|wma|m4a|ogg|aif|aiff|aac|flac)$/i, "")
		.replace("&#39;","'");
};

var findGrandParent = function(my) {
    var elements = document.getElementsByTagName("div");
    for (var e in elements) {
        if (elements[e].className == "currentSong") {
            return elements[e].parentNode;
        }
        if (elements[e].className == "toggles") {
            my.newMyspace = true;
            return elements[e];
        }
    }
};

var myspace = function() {
	this.current = true;			// Holds the div for the current song info, so we don't have to search for the playing
						            // container every two seconds when the scrobbler wants the time elapsed
	this.currentTrack = ""; 		// Holds the "ID" of current track (artist+track)
	this.currentTrackData = new Array(); 	// Holds the data for the current song
	this.currentTrackDuration = 0; 	// Holds the song's duration
	this.newMyspace = false;
	this.grandParent = findGrandParent(this);	// Element that will contain the buttons
	if (!this.grandParent && (window.location.href.match(/player/) || this.newMyspace)) {
		GM_log("!!! It seems Myspace Last.fm Scrobbler is broken. Please notify the author via last.fm or userscripts.org!");
	}
	this.loveBtnParent; 			// Parent element for the Love button
	this.lastfmBtnParent; 			// Parent element for the Last.fm button
	if (this.newMyspace) {
		this.startTimeClass = "time";
		this.endTimeClass = "duration";
	} else {
		this.startTimeClass = "startTime";
		this.endTimeClass = "endTime";
	}
	this.lfm = new Object(); 		// Last.fm object
};

/* Sets up the environment for the last.fm object to make the links for things to work */
myspace.prototype.initializeMenu = function() {
	// Create the new buttons
	this.lastfmBtnParent = this.makeParent("menu-button-lastfm", "4", "none", "90", "93");
	this.loveBtnParent = this.makeParent("menu-button-love", "1", "right", "30", "67");

	// We need to modify the volume bar so it is not covered
	var lists = document.getElementsByTagName("li");
	for (var list in lists) {
		if (lists[list].className == "volume") {
			lists[list].style.zIndex = "1";
		}
	}
};

// Makes the parent element where the last.fm class will put the button-link
myspace.prototype.makeParent = function(id, margin, float, width, bottom) {
	var btn = document.createElement("div");
	btn.id = id;
	if (this.newMyspace) {
		btn = document.createElement("span");
		btn.className = "status";
	} else {
		btn.className = "glue";
		if (navigator.userAgent.match(/WebKit/)) {
			btn.setAttribute("style", "background: -webkit-gradient(linear,50% 0,50% 100%,from(#EFEFEF),color-stop(0.5,#9A9A9A),to(#787878));");
			btn.style.marginRight = "2px";
			btn.style.marginTop = (margin == 1 ? "-1" : margin) + "px";
		} else if (navigator.userAgent.match(/Opera/)) {
			btn.setAttribute("style", "background: -o-linear-gradient(270deg, #EFEFEF, #9A9A9A, #787878);");
		} else {
			btn.setAttribute("style", "background: -moz-linear-gradient(#efefef,#9a9a9a,#787878);");
			btn.style.marginRight = "0px";
			btn.style.marginTop = margin + "px";
		}

		btn.style.backgroundColor = "#9a9a9a";
		btn.style.cssFloat = float;
		btn.style.width = width + "px";
		btn.style.height = "10px";
		btn.style.padding = "2px 4px 8px 4px";

		btn.style.position = "absolute";
		btn.style.bottom = bottom + "px";
		btn.style.right = "10px";
		btn.style.listStyle = "none";

		btn.onmouseover = function(){try{this.childNodes[0].style.textDecoration='none';}catch(e){}};
	}
	if (this.grandParent) {
		if (this.newMyspace)
			this.grandParent.insertBefore(btn, this.grandParent.childNodes[0]);
		else
			this.grandParent.appendChild(btn);
	}
	return btn;
};

// Last.fm calls the function that this function returns.
// Returns a function that deletes the last.fm button.
myspace.prototype.deleteLfmButton = function(lfmBtnParent, id) {
	// Given a text node, clean things up for said text node's <a> parent, so
	// a new button-link, when added, looks the same to the user.
	return function(buttonText) {
		lfmBtnParent.removeChild(buttonText.parentNode);
	};
};

// Last.fm calls the function that this function returns.
myspace.prototype.modButtons = function(id) {
	//  (Lastfm() runs this function every time it makes a new button)
	var newMyspace = this.newMyspace;
	return function(link) {
		link.style.color = newMyspace ? "rgb(124, 124, 124)" : "#222222";
	};
};

// Find the container div for the song that's currently playing.
myspace.prototype.findContainer = function() {
	if (this.newMyspace) {
		containers = document.getElementsByTagName("div");
		for (var c in containers) {
			if (containers[c] && containers[c].id == "nowPlaying") {
				this.current = containers[c];
			}
		}
	}
	else {
		containers = document.getElementsByTagName("div");
		for (var c in containers) {
			if (containers[c] && containers[c].className == "currentSong") {
				this.current = containers[c];
			}
		}
	}
};
	
myspace.prototype.getTime = function(cssclass) {
	var times = document.getElementsByTagName("span");
	for (var time in times) {
		if (times[time].className == cssclass) {
			// Time is in the form 1:23, so we just convert it to a decimal,
			// multiply the .23 by 100 to get 23 seconds, and multiply the 1 by 60,
			// 'cause there's... 60 seconds in one minute.
			var rawTime = times[time].childNodes[0].nodeValue.replace(':','.').replace('/','');
			var minutes = parseInt(rawTime);
			var secs = parseInt(((parseFloat(rawTime) - minutes) * 100) + (minutes * 60));
			return secs;
		}
	}
	// return 0 if there's nothing (this should never happen because the
	// function doesn't get called if there's nothing).
	return 0;
};

myspace.prototype.getElapsed = function() {
	return this.getTime(this.startTimeClass);
};

// Returns the duration retrieved last time if songChanged is false.
// Otherwise, figures out the new duration and returns it.
myspace.prototype.getDuration = function(songChanged) {
	if (songChanged) {
		this.currentTrackDuration = this.getTime(this.endTimeClass);
	}
	return this.currentTrackDuration;
};

// field 1: song
// field 2: artist
// field 3: album
myspace.prototype.getTrackInfo = function(field) {
	var links;
	if (this.newMyspace) {
		var h5 = this.current.getElementsByTagName("h5");
		links = h5[0].getElementsByTagName("a"); // finds 2 links (title, artist) at first, and then 3 (album) a bit later...
		var i = field-1;
		if (field <= 2 && links.length >= 2 && links[i].childNodes.length > 0) {
			return field==1
				? fixSongTitle(links[i].childNodes[0].nodeValue)
				: links[i].childNodes[0].nodeValue;
		} else if (field == 3 && links.length >=3 && links[i].childNodes.length > 0) {
			if (links[i].href.match(/\/discover\/radio/) || links[i].href.match(/\/mixes\//))
				return false; // don't return album when playing radio station
			return links[i].childNodes[0].nodeValue;
		}
	} else {
		links = this.current.getElementsByTagName("a");
		if (links.length == 4 && links[field].childNodes.length > 0) {
			return field==1
				? fixSongTitle(links[field].childNodes[0].nodeValue)
				: links[field].childNodes[0].nodeValue;
		}
	}
	return false;
};

myspace.prototype.isPlaying = function() {
	if (this.newMyspace) {
		var buttons = document.getElementsByTagName("button");
		for (var b in buttons) {
			var title = buttons[b].getAttribute("data-original-title");
			if (title == "Play" || title == "Pause") {
				return title == "Pause";
			}
		}
	} else {
		var lists = document.getElementsByTagName("li");
		for (var list in lists) {
			if (lists[list].className == "togglePlay") {
				return !lists[list].childNodes[0].className.match(/ play/);
			}
		}
	}
	return false;
};

// Use self instead of this here, because this function gets called within the
// lastfm class, which changes the this variable.
myspace.prototype.getData = function(self) {
	return function() {
		if (self.isPlaying()) {
			var track = self.getTrackInfo(1);
			var artist = self.getTrackInfo(2);
			var trackId = artist + track;

			// Check to see if the current song has changed.
			if (self.currentTrack != trackId) {
				GM_log("Track changed: " + track + " by " + artist);
				self.currentTrack = trackId;

				if (track && artist) {
					var album = self.getTrackInfo(3);
					GM_log("Album: " + album);
					// Invoke the last.fm scrobbling handler with song, artist, album, duration, elapsed data.
					self.currentTrackData = [track, artist, album];
					self.lfm.invoke(self.currentTrackData, self.getDuration(true), self.getElapsed());
				}
				else {
					GM_log("Could not determine track or artist");
					self.lfm.invoke(new Array(), 0, 0);
				}
			}
			else {
				// If the song hasn't changed yet, just update the time elapsed.
				self.lfm.invoke(self.currentTrackData, self.getDuration(false), self.getElapsed());
			}
		}
		else {
			// If the user hasn't started playing a song yet, make everything null or 0.
			self.lfm.invoke(new Array(), 0, 0);
		}
	};
};

// Initializes a few things that the last.fm class needs to run and runs the
// Last.fm scrobbler.
myspace.prototype.startLastfm = function() {
	 // Initialize the last.fm class with our functions
	this.lfm = new lastfm(this.loveBtnParent, this.lastfmBtnParent, this.getData(this));
	
	// Set the love button's modder function. The empty div's id will be "love."
	this.lfm.setLoveButtonModder(this.modButtons("love"));
	
	// Set the last.fm button's modder function. The empty div's id will be "emptylfm."
	this.lfm.setLastfmButtonModder(this.modButtons("emptylfm"));
	
	// Set the last.fm button's deleter function. We need to pass it this.lastfmBtnParent
	// because this's scope changes when it's called from last.fm. The returned function
	// is in an "enclosure" with the lastfmBtnParent variable.
	this.lfm.setLastfmButtonDeleter(this.deleteLfmButton(this.lastfmBtnParent, "emptylfm"));
	
	//this.makeSuggestCorrection();
	
	this.lfm.run();
};

var sls = new myspace();
sls.initializeMenu();
sls.findContainer();
sls.startLastfm();

/* unit tests ;-) <pre><script>
 r = function(str) {
 var res = fixSongTitle(str);
 document.writeln(str + " =>\t" + res);
 };

 r("01-bla.mp3");
 r("01 - bla.mp3");
 r("01 bla.mp3");
 r("01 bla.wav");
 r("01bla.mp3");
 r("01bla");
 r("01_bla.mp3");
 r("01.bla.mp3");
 r("bla.mp3");
 r("bla.wav");
 r("bla.m4a");
 r("bla.aiff");
 r("bla.bla");
 r("01 bla");
 r("01 - bla");
 r("01.bla");
 r("bla...");
 r("bla bla.mp3");
 r("01 bla bla");
 r("10 bla bla");
 r("bla.mp3!");
 r("bla.MP3");
 r("01 bla.WAV");
 </script></pre>*/
