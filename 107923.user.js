// ==UserScript==
// @name           SoundCloud Last.fm Scrobbler
// @namespace      http://userscripts.org/users/266001
// @description    SoundCloud Last.fm Scrobbler is a JS/Greasemonkey-based Last.fm scrobbler for SoundCloud with support for loving tracks. Based on Bandcamp Last.fm Scrobbler 0.9.4 GGS-0.9.3.
// @require        http://userscripts.org/scripts/source/85398.user.js
// @include        http://soundcloud.com/*
// @include        https://soundcloud.com/*
// @version        0.1.6 GGS-0.9.5-Dv5
// @license        FreeBSD License (see source code). Portions dual-licensed under the MIT (Expat) License and GPLv2.
// @grant          GM_log
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==
/******************************************************************************

Copyright 2010, 2011 Eric Lin (RetypePassword)
All rights reserved.
 
Updated 2014, by Ditmar Wendt
 
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




function GM_main ($) {

var API_KEY = "1080c460dd8769de8b33d059727b50f4"; // Replace the stuff between the quotes with your API key if you'd prefer to use your own.
var PRIV_KEY = ""; // Insert your private key between the quotes if you'd prefer to use your own API key.


/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}




















// GM emulation for Google Chrome
if (typeof GM_deleteValue == "undefined") {
    GM_log = function (message) {
        console.log(message);
    };

    GM_log("Setting custom GM functions...");

    // Uses http://ericflin.com/scripts/restproxy.php as a proxy for cross-site xhr
    GM_xmlhttpRequest = function (args) {
        var xhr = new XMLHttpRequest();
        if (xhr) {
            GM_log("requesting " + args.url);
            var data = "u=" + encodeURIComponent(args.url);
            if (args.method == "POST") {
                data += "&data=" + encodeURIComponent(args.data);
            }
            
            GM_log("POSTing: " + args.url + "to http://ericflin.com/scripts/restproxy.php?m=" + args.method);
            xhr.open("POST", "http://ericflin.com/scripts/restproxy.php?m=" + args.method, true);

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-Length", data.length);
            xhr.setRequestHeader("Connection", "close");

            xhr.send(data);

            xhr.onreadystatechange = function () {
            console.log("Headers: " + xhr.getAllResponseHeaders());
                if (xhr.readyState == 4) {

                    args.onload(xhr);
                }
            };

            return xhr;
        }
    };

    GM_getValue = function (key) {
        var value = localStorage.getItem(key);
        return JSON.parse(value);
    };

    GM_setValue = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
}

function phpjs() {

    this.utf8_encode = function (argString) {
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

        var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

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
                start = end = n + 1;
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
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        };

        var addUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
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

        var _F = function (x, y, z) {
            return (x & y) | ((~x) & z);
        };
        var _G = function (x, y, z) {
            return (x & z) | (y & (~z));
        };
        var _H = function (x, y, z) {
            return (x ^ y ^ z);
        };
        var _I = function (x, y, z) {
            return (y ^ (x | (~z)));
        };

        var _FF = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var _GG = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var _HH = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var _II = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var convertToWordArray = function (str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = new Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        var wordToHex = function (lValue) {
            var wordToHexValue = "",
                wordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexValue_temp = "0" + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
            }
            return wordToHexValue;
        };

        var x = [],
            k, AA, BB, CC, DD, a, b, c, d,
            S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22,
            S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20,
            S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23,
            S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;

        str = this.utf8_encode(str);
        x = convertToWordArray(str);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        xl = x.length;
        for (k = 0; k < xl; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }

        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

        return temp.toLowerCase();
    };
}

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
    var timesSame = 0;
    var loved = false;
    var lovebtn;
    var interceptFav = 0;
    var loveBtnModder = function (button) {
        return "";
    };
    var lastfmBtnModder = function (button) {
        return "";
    };
    var removeLastfmBtn = function (buttonText) {
        lastfmBtnParent.removeChild(buttonText.parentNode);
    };
    var saa = SAAHandler;

    // Forces invoke to re-do nowPlaying and, if applicable, scrobble (resets
    // the now playing variable so it thinks nothing's playing).
    this.forceDataReset = function () {
        nPlaying = "";
        odat = ["", "", ""];
    }

    this.setLoveButtonModder = function (modder) {
        loveBtnModder = modder;
    };

    this.setLastfmButtonModder = function (modder) {
        lastfmBtnModder = modder;
    };

    this.setLastfmButtonDeleter = function (deleter) {
        removeLastfmBtn = deleter;
    };

    // A function that invokes invoke([song, artist, album], songDuration, timeElapsed) with data
    this.setSAA = function (newSAA) {
        saa = newSAA;
    };

    // Converts a time like 03:45 to seconds (e.g., 225).
    this.convertTimeToSec = function (convtime) {
        return (parseInt(convtime.substring(0, convtime.indexOf(":")), 10) * 60) + parseInt(convtime.substring(convtime.indexOf(":") + 1), 10);
    };

    this.makeUI = function (action, parent, text, modder) {
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

            return node;
        }

        return false;
    };

    makeLove = function (action, text) {
        return my.makeUI(action, loveBtnParent, text, loveBtnModder);
    };

    makeLfm = function (action, text) {
        return my.makeUI(action, lastfmBtnParent, text, lastfmBtnModder);
    };

    // Runs the scrobbler function, runs the nowplaying function, or does nothing, depending
    // on the situation. This function MUST be invoked by a handler in the class using the
    // lastfm scrobbler in order for the whole thing to work.
    this.invoke = function (songdata, totalMsec, pelapsedInMSec) {
        ndat = songdata;

        GM_log("invoke w/ dur: " + totalMsec + " elapsed: " + totalMsec);

        var totaltsec = Math.round(totalMsec/1000);
        var pelapsedInSec = Math.round(pelapsedInMSec/1000);
        var time = new Date();
        var t = Math.round(parseInt(time.getTime() / 1000));

        var frac = pelapsedInSec / totaltsec;
        var diff = totaltsec - pelapsedInSec;
        var start = t - pelapsedInSec;

        // TODO: Replace the calls to Invoke with MutationObservers, we only care when the time moves changed.
        // TEMP: Timessame should be an equation with a timeout of 12(6 timessame) seconds when a song is 3m long.(180s)
        var pausedStopTimeout = Math.ceil(2*(3*totaltsec/180));

        if (auth === true && this.mdk === false) {
            if(lPElapsed == pelapsedInSec) {
                timesSame++;
            } else {
                timesSame = 0;
            }


            if ((timesSame >= pausedStopTimeout && lPElapsed == pelapsedInSec) || typeof ndat[0] == "undefined") {
                GM_log("stopped 1 " + pelapsedInSec + " " +  pelapsedInMSec + " " + totaltsec + " ndat invalid: " + (typeof ndat[0] == "undefined"));
                lPElapsed = pelapsedInSec;
                document.title = "Stopped/Paused";
                lovebtn.nodeValue = "No Song Playing";
                setTimeout(saa, 2000);
            } else if (totaltsec > 30 && (frac >= 0.5 || pelapsedInSec >= 240) && ndat[0] != odat[0] && typeof ndat[0] != "undefined") {
                GM_log("Got Here 3");
                var scrobbledat = "";

                if (failedScrobs.length > 0) {
                    ndat.push(start);
                    failedScrobs.push(ndat);
                    doFailedScrobs(failedScrobs);
                    checkRunning("tryScrobs", start);
                } else if (ndat[2]) {
                    scrobbledat = "track[0]=" + encodeURIComponent(ndat[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(ndat[1]) + "&album[0]=" + encodeURIComponent(ndat[2]) + "&api_key=" + API_KEY + "&sk=" + sKey;
                    dofunc(["track[0]" + ndat[0], "timestamp[0]" + start, "artist[0]" + ndat[1], "album[0]" + ndat[2], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
                    checkRunning("scrobble", start);
                } else {
                    scrobbledat = "track[0]=" + encodeURIComponent(ndat[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(ndat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
                    dofunc(["track[0]" + ndat[0], "timestamp[0]" + start, "artist[0]" + ndat[1], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
                    checkRunning("scrobble", start);
                }

                lPElapsed = pelapsedInSec;
            } else if (totaltsec > 30 && ndat[0] != odat[0] && typeof ndat[0] != "undefined" && nPlaying != ndat[0] && pelapsedInSec > 0) {
                var scrobbledat = "track=" + encodeURIComponent(ndat[0]) + "&artist=" + encodeURIComponent(ndat[1]) + "&duration=" + totaltsec + "&api_key=" + API_KEY + "&sk=" + sKey;
                lPElapsed = pelapsedInSec;

                dofunc(["track" + ndat[0], "artist" + ndat[1], "api_key" + API_KEY, "sk" + sKey, "duration" + totaltsec], "track.updateNowPlaying", "doNowPlaying", scrobbledat);
                checkRunning("nowPlaying", start);
            } else if (ndat[0] == odat[0] && frac < 0.5 && pelapsedInSec < 240) {
                my.forceDataReset();
                setTimeout(saa, 2000);
            } else {
                GM_log("normal");
                if (document.title == "Stopped/Paused") {
                    lovebtn.nodeValue = loved ? "Unlove Song" : "Love Song";
                }
                lPElapsed = pelapsedInSec;
                document.title = ndat[0] + " by " + ndat[1] + titleAppend;
                setTimeout(saa, 2000);
            }
        } else {
            if (lPElapsed == pelapsedInSec || typeof ndat[0] == "undefined") {
                GM_log("stopped 3");
                lPElapsed = pelapsedInSec;
                document.title = "Stopped/Paused";
            } else {
                lPElapsed = pelapsedInSec;
                document.title = ndat[0] + " by " + ndat[1];
            }
            setTimeout(saa, 2000);
        }
    };

    // Private Methods
    var love = function (e) {
        e.preventDefault();
        if (lovebtn.nodeValue != "No Song Playing" && lovebtn.nodeValue != "Sending Request..." && auth === true) {
            var lovedat = new Array();
            lovedat[0] = "track=" + encodeURIComponent(correctedDat[0]) + "&artist=" + encodeURIComponent(correctedDat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
            lovedat[1] = loved ? "track.unlove" : "track.love";
            lovedat[2] = correctedDat[0];
            lovedat[3] = correctedDat[1];
            lovebtn.nodeValue = "Sending Request...";
            dofunc(["track" + correctedDat[0], "artist" + correctedDat[1], "api_key" + API_KEY, "sk" + sKey], lovedat[1], "sendLove", lovedat);
        }
    };

    var sendLove = function (lovedat) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://ws.audioscrobbler.com/2.0/?method=" + lovedat[1],
            headers: {
                "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                "Accept": "application/atom+xml,application/xml,text/xml",
                "Content-Length": lovedat[0].length,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: lovedat[0],
            onload: function (response) {
                GM_log(response.responseText);
                if (lovedat[1] == "track.love") {
                    if (lovedat[2] == correctedDat[0] || lovedat[2] == ndat[0]) {
                        loved = true;
                        lovebtn.nodeValue = "Unlove Song";
                        titleAppend += " (\u2665)";
                        document.title += " (\u2665)";
                    }
                    GM_log("Loved " + lovedat[2] + " by " + lovedat[3]);
                } else if (lovedat[1] == "track.unlove" && (lovedat[2] == correctedDat[0] || lovedat[2] == ndat[0]) && odat[0] == ndat[0]) {
                    lovebtn.nodeValue = "Love Song";
                    loved = false;
                    titleAppend = "+";
                    GM_log("Unloved " + ndat[0] + " by " + ndat[1]);
                } else if (lovedat[1] == "track.unlove" && lovedat[2] != correctedDat[0] && lovedat[2] != ndat[0]) {
                    GM_log("Unloved " + lovedat[2] + " by " + lovedat[3]);
                } else {
                    lovebtn.nodeValue = "Love Song";
                    loved = false;
                    titleAppend = "";
                    GM_log("Unloved " + ndat[0] + " by " + ndat[1]);
                }
            }
        });
    };

    var doNowPlaying = function (scrobbledat) {
        tried = GM_xmlhttpRequest({
            method: "POST",
            url: "http://ws.audioscrobbler.com/2.0/?method=track.updateNowPlaying",
            headers: {
                "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                "Accept": "application/atom+xml,application/xml,text/xml",
                "Content-Length": scrobbledat.length,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: scrobbledat,
            onload: function (response) {
                nPlaying = ndat[0];
                GM_log(response.responseText);
                document.title = ndat[0] + " by " + ndat[1];
                titleAppend = "";
                var time = new Date();
                var t = Math.round(parseInt(time.getTime() / 1000));

                GM_xmlhttpRequest({
                    method: "GET",
                    // Timestamp isn't actually one of the parameters. It's just used here to force firefox not to use the cache.
                    url: "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=" + encodeURIComponent(ndat[1]) + "&track=" + encodeURIComponent(ndat[0]) + "&username=" + uName + "&api_key=" + API_KEY + "&timestamp=" + t,
                    onload: function (response) {
                        var parser = new DOMParser();
                        trackinfo = parser.parseFromString(response.responseText, "text/xml");
                        // This if line is required for songs that have never been scrobbled to last.fm before.
                        if (trackinfo.getElementsByTagName("name")[0] && trackinfo.getElementsByTagName("name")[1]) {
                            correctedDat[0] = trackinfo.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                            correctedDat[1] = trackinfo.getElementsByTagName("name")[1].childNodes[0].nodeValue;
                            if (trackinfo.getElementsByTagName("userloved")[0].childNodes[0].nodeValue == 1) {
                                lovebtn.nodeValue = "Unlove Song";
                                loved = true;
                                titleAppend = " (\u2665)";
                                document.title += " (\u2665)";
                            } else {
                                lovebtn.nodeValue = "Love Song";
                                loved = false;
                            }
                        } else {
                            correctedDat[0] = ndat[0];
                            correctedDat[1] = ndat[1];
                            lovebtn.nodeValue = "Love Song";
                            loved = false;
                        }
                    }
                });
            }
        });
    };

    var doFailedScrobs = function (scrobblae) {
        var datArr = new Array();

        var scrobbledat = "";
        for (i in scrobblae) {
            datArr.push("track[" + i + "]" + failedScrobs[i][0]);
            datArr.push("timestamp[" + i + "]" + failedScrobs[i][3]);
            datArr.push("artist[" + i + "]" + failedScrobs[i][1]);
            if (failedScrobs[i][2]) {
                datArr.push("album[" + i + "]" + failedScrobs[i][2]);
            }

            scrobbledat = scrobbledat + "track[" + i + "]=" + encodeURIComponent(failedScrobs[i][0]) +
                "&timestamp[" + i + "]=" + failedScrobs[i][3] +
                "&artist[" + i + "]=" + encodeURIComponent(failedScrobs[i][1]);

            if (failedScrobs[i][2]) {
                scrobbledat = scrobbledat + "&album[" + i + "]=" + encodeURIComponent(failedScrobs[i][2]);
            }

            scrobbledat = scrobbledat + "&";
        }

        scrobbledat = scrobbledat + "api_key=" + API_KEY + "&sk=" + sKey;
        datArr.push("api_key" + API_KEY);
        datArr.push("sk" + sKey);

        dofunc(datArr, "track.scrobble", "failedScrobbles", scrobbledat);
    };

    var doScrobble = function (scrobbledat, failed) {
        tried = GM_xmlhttpRequest({
            method: "POST",
            url: "http://ws.audioscrobbler.com/2.0/?method=track.scrobble",
            headers: {
                "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                "Accept": "application/atom+xml,application/xml,text/xml",
                "Content-Length": scrobbledat.length,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: scrobbledat,
            onload: function (response) {
                var parser = new DOMParser();
                responseInfo = parser.parseFromString(response.responseText, "text/xml");
GM_setValue("failedScrobs", "");
                // If the scrobble failed (i.e., lfm status is not "ok"), don't do anything. CheckRunning will
                // log this as a failed scrobble and re-try it later.
                if (responseInfo.getElementsByTagName("lfm").length > 0 && responseInfo.getElementsByTagName("lfm")[0].attributes.getNamedItem("status").value == "ok") {
                    if (failed) {
                        GM_log("Re-Trying Failed Scrobbles: " + response.responseText);
                        failedScrobs = new Array();
                        GM_setValue("failedScrobs", "");
                    } else {
                        titleAppend = "+" + titleAppend;
                        document.title = ndat[0] + " by " + ndat[1] + titleAppend;
                        GM_log(response.responseText);
                        odat = ndat;
                    }
                } else {
                    GM_setValue("failedScrobs", "");
                    GM_log("failed scrobble: " + response.responseText);
                }
            }
        });
    };

    var checkRunning = function (action, start) {
        doCheckRunning = function (iter) {
            if ((action == "scrobble" && ndat[0] == odat[0]) || (action == "nowPlaying" && nPlaying == ndat[0]) || (action == "failedScrobs" && failedScrobs.length == 0) || (action == "tryScrobs" && failedScrobs.length == 0)) {
                if (action == "tryScrobs") {
                    titleAppend = "+" + titleAppend;
                    document.title = ndat[0] + " by " + ndat[1] + titleAppend;
                    odat = ndat;
                }

                if (iter >= 2) {
                    saa();
                } else {
                    setTimeout(saa, 2000);
                }
            } else if (action == "scrobble" && ndat[0] != odat[0] && iter >= 8) {
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
                    odat = ndat;
                }

                saa();
            } else if (action == "nowPlaying" && nPlaying != ndat[0] && iter >= 8) {
                tried.abort();

                nPlaying = ndat[0];
                document.title = ndat[0] + " by " + ndat[1];
                titleAppend = "";
                lovebtn.nodeValue = "Last.fm Down";

                saa();
            } else if ((action == "failedScrobs" || action == "tryScrobs") && failedScrobs.length != 0 && iter >= 8) {
                tried.abort();

                GM_setValue("failedScrobs", JSON.stringify(failedScrobs));

                if (nPlaying == ndat[0]) {
                    odat = ndat;
                }

                saa();
            } else {
                setTimeout(function () {
                    doCheckRunning(iter + 1);
                }, 1000);
            }
        };

        doCheckRunning(0);
    };

    var lfmOff = function (e) {
        sKey = null;
        uName = null;
        GM_setValue("sessKey", false);
        GM_setValue("username", false);
        auth = false;

        removeLastfmBtn(this.childNodes[0]);

        var turnOnLfm = function (e) {
            // Change button text.
            if (this.childNodes[0].nodeValue != "Waiting for Token...") {
                this.childNodes[0].nodeValue = "Loading...";
            }
        };

        lovebtn.nodeValue = "Last.fm: Disabled";
        var lfmbtn = makeLfm(turnOnLfm, "Waiting for Token...");

        dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn);
    };

    var getsess = function (initTok, apisig) {
        var sessKey;
        var name;
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=auth.getsession&api_key=" + API_KEY + "&token=" + initTok + "&api_sig=" + apisig,
            onload: function (xhr) {
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
                    uName = name;
                }
            }
        });
    };

    var dogetsess = function (tok, enablelfmbtn) {
        dofunc(["api_key" + API_KEY, "token" + tok], "auth.getsession", "getsess", tok);
        if (typeof sKey == "undefined" || typeof uName == "undefined" || sKey == null || uName == null || sKey == false || uName == false) {
            setTimeout(function () {
                dogetsess(tok, enablelfmbtn);
            }, 2000);
        } else {
            removeLastfmBtn(enablelfmbtn);
            lovebtn.nodeValue = "No Song Playing";
            makeLfm(lfmOff, "Disable Last.fm Support");
            auth = true;
        }
    };

    var gettok = function (apisig, enablelfmbtn) {
        var tok;
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=" + API_KEY + "&api_sig=" + apisig,
            onload: function (response) {
                var temptoken = response.responseText;
                parser = new DOMParser();
                tokenXML = parser.parseFromString(temptoken, "text/xml");
                tokenPar = tokenXML.getElementsByTagName("token")[0];
                tok = tokenPar.childNodes[0].nodeValue;
                enablelfmbtn.parentNode.href = "http://www.last.fm/api/auth/?api_key=" + API_KEY + "&token=" + tok;
                enablelfmbtn.parentNode.target = "_blank";
                enablelfmbtn.nodeValue = "Enable Last.fm Support"
                enablelfmbtn.parentNode.addEventListener("click", function () {
                    dogetsess(tok, enablelfmbtn);
                }, false);
            }
        });
    };

    var dorun = function (apisig, run, arg) {
        if (run == "doScrobble") {
            doScrobble(arg + "&api_sig=" + apisig, false);
        } else if (run == "failedScrobbles") {
            doScrobble(arg + "&api_sig=" + apisig, true);
        } else if (run == "doNowPlaying") {
            doNowPlaying(arg + "&api_sig=" + apisig);
        } else if (run == "sendLove") {
            arg[0] = arg[0] + "&api_sig=" + apisig;
            sendLove(arg);
        } else if (run == "gettok") {
            gettok(apisig, arg);
        } else if (run == "getsess") {
            getsess(arg, apisig);
        }
    };

    var dofunc = function (params, func, run, arg) {
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
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: allpars,
                    onload: function (response) {
                        dorun(response.responseText, run, arg);
                    }
                });
            } else {
                md5er = new phpjs();
                var apisig = md5er.md5(params.join("") + PRIV_KEY);
                dorun(apisig, run, arg);
            }
        }
    };

    this.run = function () {
        sKey = GM_getValue("sessKey");
        uName = GM_getValue("username");
//        tFailedScrobs = GM_getValue("failedScrobs");
        if (typeof sKey == "undefined" || typeof uName == "undefined" || sKey == null || uName == null || sKey == false || uName == false) {
            auth = false;
            var turnOnLfm = function (e) {
                // Change button text.
                this.childNodes[0].nodeValue = "Loading...";
            };

            lovebtn = makeLove(love, "Last.fm: Disabled");
            var lfmbtn = makeLfm(turnOnLfm, "Waiting for Token...");

            dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn);

            saa();
        } else {
            auth = true;

            if (typeof tFailedScrobs != "undefined" && tFailedScrobs != null && tFailedScrobs != false && tFailedScrobs != "") {
                failedScrobs = JSON.parse(tFailedScrobs);
                var datArr = new Array();

                var scrobbledat = "";
                var countI = 0;
                for (i in failedScrobs) {
                    datArr.push("track[" + i + "]" + failedScrobs[i][0]);
                    datArr.push("timestamp[" + i + "]" + failedScrobs[i][3]);
                    datArr.push("artist[" + i + "]" + failedScrobs[i][1]);
                    if (failedScrobs[i][2]) {
                        datArr.push("album[" + i + "]" + failedScrobs[i][2]);
                    }

                    scrobbledat = scrobbledat + "track[" + i + "]=" + encodeURIComponent(failedScrobs[i][0]) +
                        "&timestamp[" + i + "]=" + failedScrobs[i][3] +
                        "&artist[" + i + "]=" + encodeURIComponent(failedScrobs[i][1]);
                    if (failedScrobs[i][2]) {
                        scrobbledat = scrobbledat + "&album[" + i + "]=" + encodeURIComponent(failedScrobs[i][2]);
                    }
                    scrobbledat = scrobbledat + "&";

                    //TODO: write an actual fix for too-long-url error
                    countI++;
                    if(countI>10) break;
                }
                scrobbledat = scrobbledat + "api_key=" + API_KEY + "&sk=" + sKey;
                datArr.push("api_key" + API_KEY);
                datArr.push("sk" + sKey);

                dofunc(datArr, "track.scrobble", "failedScrobbles", scrobbledat);
            }

            lovebtn = makeLove(love, "No Song Playing");
            makeLfm(lfmOff, "Disable Last.fm Support");

            saa();
        }
    };
}

lastfm.prototype.killScrobbler = function () {
    this.mdk = true;
    return "Killed last.fm scrobbler instance";
};

function soundcloud() {
    this.CLIENT_ID = "a3629314a336fd5ed371ff0f3e46d4d0";
    this.current; // Holds the div for the playing container that we last
    // found, so we don't have to search for the playing
    // container every two seconds when the scrobbler wants the
    // time elapsed.
    this.currentSongIds = new Array(); // Holds the IDs for the current song. We don't want to
    // have to look up the artist's sets and see if the song
    // is in the artist's set every time.
    this.currentSongData = new Array(); // Holds the data for the current song. See comment for currentSongId.
    this.currentSongDuration = 0; // Holds the song's duration. See comment for currentSongId.
    this.grandParent = document.getElementsByClassName("header__navMenu ")[0]; // Unordered list element containing the buttons
    this.loveBtnParent; // Parent list element for the love button-link
    this.lastfmBtnParent; // Parent list element for the Last.fm button-link
    this.metaBtnParent; // Parent list element for the metadata editing button-link
    this.lfm = new Object(); /* Last.fm object */
}

/* Sets up the environment for the last.fm object to make the links for things to work */
soundcloud.prototype.initializeMenu = function () {
    // Insert two linebreaks in the top menu so the buttons show up in an acceptable location
    // var dirty1 = document.createElement("br");
    // var dirty2 = document.createElement("br");
    // this.grandParent.appendChild(dirty1);
    // this.grandParent.appendChild(dirty2);

    // Create the new list elements
    this.loveBtnParent = this.makeParent("menu-button-love");
    this.lastfmBtnParent = this.makeParent("menu-button-lastfm");

    // Give the main-nav thingy a bottom margin to make things look a little better.
    this.grandParent.style.marginBottom = "20px";
};

// Makes the parent list element where the last.fm class will put the button-link
soundcloud.prototype.makeParent = function (id) {
    var listy = document.createElement("li");
    listy.id = id;
    listy.className = "header__navMenu";

    this.grandParent.appendChild(listy);

    return listy;
};

// Sends off user corrections for metadata
soundcloud.prototype.sendCorrections = function (song, artist, album, songid, artistid, artistd, albumid, albumd, changeText, self) {
    var corrParams = "song=" + encodeURIComponent(song) + "&album=" + encodeURIComponent(album) + "&artist=" + encodeURIComponent(artist) + "&songid=" + songid + "&albumid=" + albumid + "&albumd=" + albumd + "&artistid=" + artistid + "&artistd=" + artistd;
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://ericflin.com/soundcloud/corrections.php",
        data: corrParams,
        headers: {
            "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
            "Accept": "application/atom+xml,application/xml,text/xml",
            "Content-Length": corrParams.length,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function (response) {
            changeText.nodeValue = "Thanks!";
            // Check to see if song or artist are empty before committing changes to currentSongData
            if (song) {
                self.currentSongData[0] = song;
            }
            if (artist) {
                self.currentSongData[1] = artist;
            }
            self.currentSongData[2] = album;
            self.lfm.forceDataReset();
            setTimeout(function () {
                changeText.nodeValue = "Suggest Metadata Correction";
            }, 2500);
        }
    });
};

// Requires this.lfm to be initialized. Makes a button for suggesting corrections.
soundcloud.prototype.makeSuggestCorrection = function () {
    editBtnParent = this.makeParent("menu-button-editMeta");

    // Makes a textbox for the pop-up form with default value "value", name
    // "id", and label "text". Defaultable indicates whether or not to make
    // the suggestion the default value for the specified artist or album.
    var textInputs = function (value, id, text, defaultable) {
        var wrapper = document.createElement("div");
        wrapper.style.marginBottom = "1em";

        // Make the label
        var songText = document.createElement("span");
        var songTextNode = document.createTextNode(text + ": ");
        songText.style.cssFloat = "left";
        songText.appendChild(songTextNode);
        wrapper.appendChild(songText);

        // Make the checkbox that asks whether or not to be the default value.
        if (defaultable) {
            var defaultableWrapper = document.createElement("span");
            defaultableWrapper.style.cssFloat = "right";

            var defaultableBox = document.createElement("input");
            defaultableBox.type = "checkbox";
            defaultableBox.name = id + "_check";
            defaultableBox.id = id + "_check";
            defaultableBox.style.display = "inline";

            var defaultableBoxLabel = document.createElement("label");
            defaultableBoxLabel.htmlFor = defaultableBox.id;
            defaultableBoxLabel.style.display = "inline";

            var defaultableBoxTextNode = document.createTextNode("Suggest as default for this " + text.toLowerCase() + ": ");
            defaultableBoxLabel.appendChild(defaultableBoxTextNode);
            defaultableWrapper.appendChild(defaultableBoxLabel);
            defaultableWrapper.appendChild(defaultableBox);

            wrapper.appendChild(defaultableWrapper);
        }

        // Make the textbox for said label
        var songbox = document.createElement("input");
        songbox.style.clear = "both";
        songbox.value = value;
        songbox.type = "text";
        songbox.name = id;
        wrapper.appendChild(songbox);

        return wrapper;
    };

    // Make a button that makes biscuits.
    this.lfm.makeUI((function (self) {
        return function () {
            var myText = this.childNodes[0];

            // Make the pop-up form when the make suggestion button is clicked, as long as it's not
            // currently sending a request and there's a song playing.
            if (myText.nodeValue == "Suggest Metadata Correction" && self.currentSongData[0]) {
                var song = self.currentSongData[0];
                var artist = self.currentSongData[1];
                var album = self.currentSongData[2];

                var songid = self.currentSongIds["track"];
                var artistid = self.currentSongIds["artist"];
                var albumid = self.currentSongIds["album"];

                // Make the pop-up form's container box.
                var box = document.createElement("div");
                box.style.cssText = "position: fixed; padding: 10px; opacity: 0.93; background-color: #fff; top: 32%; left: 25%; width: 50%; height: 36%; border: 5px solid #000; z-index: 1001; overflow-y: scroll;";

                // Make the actual pop-up form.
                var biscuit = document.createElement("form");

                var suggestText = document.createElement("h3");
                var sText = document.createTextNode("Suggest New Metadata for " + song + " by " + artist);
                suggestText.appendChild(sText);

                biscuit.appendChild(suggestText);
                biscuit.appendChild(textInputs(song, "nsong", "Song", false));
                biscuit.appendChild(textInputs(artist, "nartist", "Artist", true));
                biscuit.appendChild(textInputs(album, "nalbum", "Album", true));

                // Make the cancel button. Destroys the box upon clicking without
                // confirmation or anything. :-P
                var cancelLink = document.createElement("a");
                var clText = document.createTextNode("Cancel");
                cancelLink.style.cssText = "float: left; font-weight: bold;";
                cancelLink.addEventListener("click", function () {
                    box.parentNode.removeChild(box);
                }, false);
                cancelLink.appendChild(clText);

                biscuit.appendChild(cancelLink);

                // Make the submit changes button. Once clicked, it changes the
                // Metadata Correction's text to "Sending Request...", fires off
                // sendCorrections() with the new data, and destroys the box.
                var submitLink = document.createElement("a");
                var slText = document.createTextNode("Submit Changes");
                submitLink.style.cssText = "float: right; font-weight: bold;";
                submitLink.addEventListener("click", function () {
                    myText.nodeValue = "Sending Request...";
                    self.sendCorrections(biscuit.elements[0].value, biscuit.elements[2].value, biscuit.elements[4].value, songid, artistid, biscuit.elements[1].checked, albumid, biscuit.elements[3].checked, myText, self);
                    box.parentNode.removeChild(box);
                }, false);
                submitLink.appendChild(slText);

                biscuit.appendChild(submitLink);
                box.appendChild(biscuit);
                document.getElementsByTagName("body")[0].appendChild(box);
            } else if (myText.nodeValue == "Suggest Metadata Correction") {
                alert("No song playing.");
            } else {
                alert("Hold on a sec. We're still trying to save your metadata suggestions.");
            }
        }
    })(this),
    editBtnParent, "Suggest Metadata Correction", this.modButtons("emptymeta"));
};

// Last.fm calls the function that this function returns.
// Returns a function that deletes the last.fm button and its empty menu div.
soundcloud.prototype.deleteLfmButton = function (lfmBtnParent, id) {
    // Given a text node, clean things up for said text node's <a> parent, so
    // a new button-link, when added, looks the same to the user.
    return function (buttonText) {
        var emptydiv = document.getElementById(id);
        lfmBtnParent.removeChild(buttonText.parentNode);
        lfmBtnParent.removeChild(emptydiv);
    };
};

// Last.fm calls the function that this function returns.
// Returns a function that adds an empty menu div with the given id for the
// link that the last.fm class created.
soundcloud.prototype.modButtons = function (id) {
    // Given the link <a> element, add a sibling empty <div>. The empty <div>
    // makes the bar that shows up when the mouse hovers over it. When we
    // delete the button, we need to remove this <div> because a new empty <div>
    // is created every time a button's created (see deleteLfmButton()).
    //  (Lastfm() runs this function every time it makes a new button.)
    return function (link) {
        var emptyDiv = document.createElement("div");
        emptyDiv.className = "open-submenu";
        emptyDiv.id = id;
        link.parentNode.appendChild(emptyDiv);
    };
};

// Find the container div for the song that's currently playing. Returns true
// if the song has changed since the last run and returns false otherwise.
soundcloud.prototype.findContainer = function () {
    containers = document.getElementsByTagName("div");

    // Check to see if the song has changed since the last time we checked.
    if (!this.current || (this.current && !(this.current.className.indexOf("playing") != -1) )) {
        // Loop through all the divs and look for the one whose class is
        // "sound playing"
        for (var c in containers) {
            if (containers[c] && containers[c].className && containers[c].className.indexOf("playing") != -1 ) {
                this.current = containers[c];
            }
        }
        return true;
    }

    return false;
};

soundcloud.prototype.getElapsed = function () {

    return window.playingProgress;

};

// Returns the duration retrieved last time if songChanged is false.
// Otherwise, figures out the new duration otherwise, and returns it.
soundcloud.prototype.getDuration = function (songChanged) {

    return window.pman.getCurrentSound().duration();
};

// Use self instead of this here, because this functions gets called within the
// lastfm class, which changes the this variable.
soundcloud.prototype.getData = function (self) {
    return function () {
        // Find the container. Then do stuff.
        var containerChanged = self.findContainer();

        if (self.current != undefined) {

            // Find nowPlaying 
            // href is trackId
            var trackIdContainer = document.getElementsByClassName("playbackTitle")[0]; // Only functions on main user page: self.current.getElementsByClassName("soundTitle__title")[0];

            if (trackIdContainer.innerHTML.length > 1) {


                //Need to get trackid like this:
                //api.soundcloud.com/resolve.json?url=http://soundcloud.com/freshmore/freshmore-podcast-026-manikan&client_id=a3629314a336fd5ed371ff0f3e46d4d0
                var trackId = window.pman.getCurrentSound().id; //self.current.parentNode.attributes.getNamedItem("data-sc-track").value;
                // We'll use the user's username as the artist. Album will be the set,
                // if any. Song title will have the artist's name omitted, if it's in there.

                // Check again to see if the current song has changed.
                if (self.currentSongIds["track"] != trackId) {
                    self.currentSongIds["track"] = trackId;

                    // First thing: Get the song's artist's username and track title.
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://api.soundcloud.com/tracks/" + trackId + ".json?client_id=" + self.CLIENT_ID, //"http://api.soundcloud.com/tracks/" + trackId + ".json?client_id=" + self.CLIENT_ID,
                        onerror: function(e) {
                            alert("fuck " + e);
                        },
                        onload: function (response) {

                            //TODO: handle playlists differently here
                            
                            // a JSON object. Apparently, we need parentheses around the actual JSON thingy to get
                            // JS to evaluate it.
                            var trackData = JSON.parse(response.responseText);
                            var artist = trackData.user.username; // Get the artist's name
                            var artistId = trackData.user.id; // Get the artist's id
                            trackId = trackData.id; // Get the actual track ID for ericflin's page

                            self.currentSongIds["duration"] = trackData.duration;
                            GM_log("dur: " + trackData.Duration);
                            self.currentSongIds["artist"] = artistId;

                            // TODO: The track title may have to be modified to remove the artist's name, but we'll do that later.
                            var song = trackData.title;

                            // Now get the album name
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: "http://api.soundcloud.com/users/" + artistId + "/playlists.json?client_id=" + self.CLIENT_ID,
                                onload: function (sets) {
                                    var setData = JSON.parse(sets.responseText); // a JSON array
                                    var album = "";
                                    var albumId = 0;

                                    // Make sure the artist has albums before searching for the track
                                    if (setData.length > 0) {
                                        for (var set in setData) {
                                            for (var track in setData[set].tracks) {
                                                if (setData[set].tracks[track].id == trackId && album == "") {
                                                    albumId = setData[set].id;
                                                    self.currentSongIds["album"] = albumId;
                                                    album = setData[set].title;
                                                }
                                            }
                                        }
                                    }

                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: "http://ericflin.com/soundcloud/index.php?song=" + trackId + "&artist=" + artistId + "&album=" + albumId,
                                        onload: function (correction) {
                                            GM_log(correction.responseText + "len: " + correction.responseText.length);
                                            // Use the corrections if they are available
                                            if (correction.responseText.length > 0) {
                                                var corrData = JSON.parse(correction.responseText);
                                                if (corrData.song.length > 0) {
                                                    song = corrData.song;
                                                }
                                                if (corrData.artist.length > 0) {
                                                    artist = corrData.artist;
                                                }
                                                if (corrData.album.length > 0) {
                                                    album = corrData.album;
                                                }
                                            }

                                            // Invoke the last.fm scrobbling handler with song, artist, album, duration, elapsed data.
                                            self.currentSongData = [song, artist, album];

                                            GM_log("elapsed: " + self.getDuration()*(self.getElapsed()) + " dur: " +self.currentSongIds["duration"]);
                                            self.lfm.invoke([song, artist, album],
                                            self.getDuration(),
                                            self.getDuration()*(self.getElapsed()));
                                        }});
                                }});
                        }});
                } else {
                     GM_log("elapsed: " + self.getDuration()*(self.getElapsed()) + " dur: " +self.currentSongIds["duration"]);
                    // If the song hasn't changed yet, just update the time elapsed.
                    self.lfm.invoke(self.currentSongData, self.getDuration(), self.getDuration()*(self.getElapsed()));
                }
            }
        } else {
            GM_log("container undef");
            // If the user hasn't started playing a song yet, make everything null or 0.
            self.lfm.invoke(new Array(), 0, 0);
        }
    };
};

function injectedsoundcloud () {
    if(!window.gmam) {
        window.gmam = require("lib/audiomanager"); 
    }
    if(!window.pman) {
        window.pman = require("lib/play-manager");
    }
    for(i in gmam._players) { 
        //console.log("state: " + gmam.getAudioPlayer(i)._state);
        if(gmam.getAudioPlayer(i)._state == "playing") {
            //console.log(gmam.getAudioPlayer(i).getCurrentPosition());
            window.playingProgress = gmam.getAudioPlayer(i).getCurrentPosition()/gmam.getAudioPlayer(i)._duration; 
            break;
        } 
    }
    setTimeout(injectedsoundcloud, 1000);
}

// Initializes a few things that the last.fm class needs to run and runs the
// Last.fm scrobbler.
soundcloud.prototype.startLastfm = function () {
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

    this.makeSuggestCorrection();

    this.lfm.run();
};

    var alreadycalled = false;
    waitForKeyElements("ul.header__navMenu", function(e) {
        if(alreadycalled) return;
        alreadycalled = true;
        var sls = new soundcloud();
        sls.initializeMenu();
        sls.startLastfm();

        var script = document.createElement('script');
        script.appendChild(document.createTextNode('('+ injectedsoundcloud +')();'));
        (document.body || document.head || document.documentElement).appendChild(script);

    }, true);
}

// This may not be the correct way to do this, but Soundcloud now loads everything dynamically into the page, so we must wait.
// http://stackoverflow.com/questions/8772137/understanding-how-greasemonkey-runs-user-scripts
//window.addEventListener ("load", Greasemonkey_main, false);

// document.addEventListener('DOMNodeInserted', function(e) {

//     var menuReady;
//     if((menuReady = document.getElementsByClassName('header__navMenu'))) {
//         Greasemonkey_main();
//     }

// }, false);

add_jQuery (GM_main, "1.7.2");

function add_jQuery (callbackFn, jqVersion) {
    jqVersion       = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}