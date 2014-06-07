// ==UserScript==
// @name           Tuba.fm loves Last.fm
// @namespace      http://grom.jabbim.pl
// @license        http://www.gnu.org/licenses/gpl-2.0.html
// @description    For Tuba.fm: Option to scrobbling & loving on last.fm. Based on Groovin Greasy Scrobbler. Dedicated for Hania Bartosińska
// @version        0.5
// @include        http://fm.tuba.pl/*
// @include        http://fm.tuba.pl/player*
// @include        http://fm.tuba.pl/player
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

function with_jquery(f) {
    if (typeof GM_deleteValue == "undefined") {
        var script = document.createElement("script");
        script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.textContent = "(" + f.toString() + ")(jQuery)";
            document.body.appendChild(script);
        }, false);
        script.type = "text/javascript";
        script.textContent = "(" + f.toString() + ")(jQuery)";
        document.body.appendChild(script);
    } else {
        window.addEventListener('load', f(jQuery), false);
    }
};

with_jquery(function($) {

var API_KEY = "9e1aa6d9fc1fbff54af4512a860889ae"; // Replace the stuff between the quotes with your API key if you'd prefer to use your own.
var PRIV_KEY = ""; // Insert your private key between the quotes if you'd prefer to use your own API key.
//var working = new Object(); // Stores working copy of metadata changes

var tubaClassInitialised = false;
var lastFmInstance;
var logging = console;

// GM emulation for Google Chrome
if (typeof GM_deleteValue == "undefined") {
    GM_log = function(message) {
        console.log(message);
    };
        
    GM_log("Setting custom GM functions for Google Chrome...");
    
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
        localStorage.setItem(key, JSON.stringify(value)); };

}

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
    };
}

function loadui(event, text, id) {
    return genLoadui(event, text, "a", id);
}

function loaduia(event, text) {
    var text = genLoadui(event, text, "a")
    return text.parentNode.parentNode;
}

// Creates a button in the upper right hand corner of the top bar.
function genLoadui(event, text, type, id) {
    var opts = $("nav > ul.user > li:first-child");

    var classify_name = text
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/\:/g, '')
                        .replace(/\./g, '');

    var lovely = document.createElement("li");
    
    var btn = document.createElement("a");

    btn.className = "navigation-item-B "+classify_name;
    if (id != undefined) {
        btn.id = id;
    }
    btn.addEventListener("click", event, false);

    var lastfmlove = document.createTextNode(text);

    btn.appendChild(lastfmlove);
    lovely.appendChild(btn);

    opts.after(lovely);

    return lastfmlove;
}

function lastfm() {
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
    var lPElapsed = 0;
    var listeningFakeCount = 0; 
    this.no
    this.progress = 0;
    this.isPlayerStopped = true;
    this.statusUpdatesCnt = 0;
    this.maxStatusUpdatesCnt = 30; // read only val
    
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
                    }
                });
            }
        });
    };
                            
    var doFailedScrobs = function(scrobblae) {
        var datArr = new Array();

        var scrobbledat = "";
        for (i in scrobblae) {
            datArr.push("track[" + i + "]" + failedScrobs[i][0]);
            datArr.push("timestamp[" + i + "]" + failedScrobs[i][3]);
            datArr.push("artist[" + i + "]" + failedScrobs[i][1]);
            datArr.push("album[" + i + "]" + failedScrobs[i][2]);
            
            scrobbledat = scrobbledat + "track[" + i + "]=" + encodeURIComponent(failedScrobs[i][0]) +
            "&timestamp[" + i + "]=" + failedScrobs[i][3] +
            "&artist[" + i + "]=" + encodeURIComponent(failedScrobs[i][1]) +
            "&album[" + i + "]=" + encodeURIComponent(failedScrobs[i][2]) + "&"; }
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
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: scrobbledat,
            onload: function(response) {
                if (failed) {
                    GM_log(response.responseText);
                    failedScrobs = new Array();
                    GM_setValue("failedScrobs", "");
                } else {
                    GM_log(response.responseText);
                    odat = ndat;
                }
            }
        });
    };

    this.startScrobbling = function() {
        this.setProgress(0);
        this.isPlayerStopped = false;
    }

    this.stopScrobbling = function() {
        this.setProgress(0);
        this.statusUpdatesCnt = 0;
        this.clearTrackInfo();
        this.isPlayerStopped = true;
    }

    this.setTrackInfo = function(artistname, songname, albumname) {
        ndat = [songname, artistname, albumname];
    }

    this.clearTrackInfo = function() {
        ndat = undefined;
    }

    this.setProgress = function(progress) {
        this.progress = progress;
    }

    this.updateStatusCnt = function() {
        if (this.isPlayerStopped) {
            return;
        }
        this.statusUpdatesCnt++;

        if (this.statusUpdatesCnt >= this.maxStatusUpdatesCnt) {
            logging.log("this.statusUpdatesCnt: "+this.statusUpdatesCnt);
            setTimeout(function(){ updateNowPlaying(); }, 0);
            this.statusUpdatesCnt = 0;
        }
    }

    this.scrobbleIt = function() {
        if (this.isPlayerStopped) {
            return;
        }

        setTimeout(function(){ sendScrobble(ndat); }, 0);
        //this.stopScrobbling();
    }

    this.startSAA = function() {
        //saa();
    }

    var updateNowPlaying = function() {
        /* sends info to last.fm about currecntly playing song */
        if ( auth !== true ) {
            logging.log("updateNowPlaying: auth != true :(");
            return;
        }

        if ( typeof ndat == "undefined" || typeof ndat[0] == "undefined" ) {
            logging.log("updateNowPlaying: typeof ndat[0] == undefined");
            return;
        }

        if ( typeof sKey == "undefined" || sKey == null ) {
            logging.log("updateNowPlaying: typeof sKey == undefined || sKey == null");
            return;
        }

        var start = Math.round(+new Date()/1000);
        var scrobbledat = "track=" + encodeURIComponent(ndat[0]) + "&artist=" + encodeURIComponent(ndat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;

        dofunc(["track" + ndat[0], "artist" + ndat[1], "api_key" + API_KEY, "sk" + sKey], "track.updateNowPlaying", "doNowPlaying", scrobbledat);
        checkRunning("nowPlaying", start);
    }

    var sendScrobble = function(trackinfo) {
        /* sends info to last.fm about recently listened song */
        if ( auth !== true ) {
            logging.log("sendScrobble: auth != true :(");
            return;
        }

        if ( typeof trackinfo == "undefined" || typeof trackinfo[0] == "undefined" ) {
            logging.log("sendScrobble: typeof trackinfo == undefined || typeof trackinfo[0] == undefined");
            return;
        }

        if ( typeof sKey == "undefined" || sKey == null ) {
            logging.log("sendScrobble: typeof sKey == undefined || sKey == null");
            return;
        }

        var start = Math.round(+new Date()/1000);
        var scrobbledat = "track[0]=" + encodeURIComponent(trackinfo[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(trackinfo[1]) + "&album[0]=" + encodeURIComponent(trackinfo[2]) + "&api_key=" + API_KEY + "&sk=" + sKey;
        
        if (failedScrobs.length > 0) {
            trackinfo.push(start);
            failedScrobs.push(trackinfo);
            doFailedScrobs(failedScrobs);
            checkRunning("tryScrobs", start);
        } else {
            dofunc(["track[0]" + trackinfo[0], "timestamp[0]" + start, "artist[0]" + trackinfo[1], "album[0]" + trackinfo[2], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
            checkRunning("scrobble", start);
        }
    }

    var saa = function() {
        logging.log("saa");
        var doWeHaveProgressBar = 1;
        
        if (ndat == false) {
            GM_log("SAA: Song is not loaded yet.");
            setTimeout(saa, 2000);
        }

        var start = Math.round(+new Date()/1000);

        /*
        var currentTubaSongProgress = 0;

        if (typeof(unsafeWindow) == undefined) {
            var unsafeWindow = window;
        }
        */
        /*
        try {
            window.chrome.app.length;
            var unsafeWindow = window;
        } catch (e) {}
        */
        /*
        try {
            currentTubaSongProgress = unsafeWindow.tuba.player.parameters["progress"];
        } catch(e) {}

        if(!currentTubaSongProgress) {
            // then its probably internet radio station, we need to scrobble it
            // a little bit different ;)
            doWeHaveProgressBar = 0;
            //if (ndat[0] != nPlaying && (typeof ndat[0] != "undefined" || typeof nPlaying != "undefined")) {
            if (ndat[0] != nPlaying && typeof ndat[0] != "undefined" && typeof nPlaying != "undefined") {
                progress = 100;
            }
        }

        progress = currentTubaSongProgress;
        */
        
        //GM_log("saa progress:"+progress+" ndat: "+ndat[0]+" odat: "+odat[0]+" nplaying: "+nPlaying);
        /*
        if (auth === true && mdk === false) {
            if ($("#play-stop").attr("class") == "play" || typeof ndat[0] == "undefined") {
                GM_log("auth === true && mdk === false else if (1)");

                GM_log("SAA: Nie gra");
                setTimeout(saa, 2000);
            } else if (progress > 95 && ndat[0] != odat[0] && typeof ndat[0] != "undefined") {
                GM_log("auth === true && mdk === false else if (2)");
                var scrobbledat = "track[0]=" + encodeURIComponent(ndat[0]) + "&timestamp[0]=" + start + "&artist[0]=" + encodeURIComponent(ndat[1]) + "&album[0]=" + encodeURIComponent(ndat[2]) + "&api_key=" + API_KEY + "&sk=" + sKey;
                //lPElapsed = pelapsedInSec;
                
                if (failedScrobs.length > 0) {
                    ndat.push(start);
                    failedScrobs.push(ndat);
                    doFailedScrobs(failedScrobs);
                    checkRunning("tryScrobs", start); }
                else {
                    dofunc(["track[0]" + ndat[0], "timestamp[0]" + start, "artist[0]" + ndat[1], "album[0]" + ndat[2], "api_key" + API_KEY, "sk" + sKey], "track.scrobble", "doScrobble", scrobbledat);
                    checkRunning("scrobble", start);
                }
            //} else if (progress < 95 && ndat[0] != odat[0] && typeof ndat[0] != "undefined" && nPlaying != ndat[0]) {
            } else if (this.progress < 95 && ndat[0] != odat[0] && typeof ndat[0] != "undefined") {
                GM_log("auth === true && mdk === false else if (3)");
                if (listeningFakeCount == 5) {
                    //var scrobbledat = "track=" + encodeURIComponent(ndat[0]) + "&artist=" + encodeURIComponent(ndat[1]) + "&duration=" + totaltsec + "&api_key=" + API_KEY + "&sk=" + sKey;
                    //lPElapsed = pelapsedInSec;
                    var scrobbledat = "track=" + encodeURIComponent(ndat[0]) + "&artist=" + encodeURIComponent(ndat[1]) + "&api_key=" + API_KEY + "&sk=" + sKey;
                    
                    //dofunc(["track" + ndat[0], "artist" + ndat[1], "api_key" + API_KEY, "sk" + sKey, "duration" + totaltsec], "track.updateNowPlaying", "doNowPlaying", scrobbledat);
                    dofunc(["track" + ndat[0], "artist" + ndat[1], "api_key" + API_KEY, "sk" + sKey], "track.updateNowPlaying", "doNowPlaying", scrobbledat);
                    checkRunning("nowPlaying", start);
                    
                    listeningFakeCount = 0;
                } else {
                    listeningFakeCount++;
                    setTimeout(saa, 2000);
                }
            } else {

                setTimeout(saa, 2000);
            }
        } else if (mdk === false) {
            GM_log("mdk === false");

            setTimeout(saa, 2000);
        }
        */
    }
    
    var checkRunning = function(action, start) {
        doCheckRunning = function(iter) {
            if ((action == "scrobble" && ndat[0] == odat[0]) || (action == "nowPlaying" && nPlaying == ndat[0]) ||
                (action == "failedScrobs" && failedScrobs.length == 0) || (action == "tryScrobs" && failedScrobs.length == 0)) {
                if (action == "tryScrobs") {
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

                    odat = ndat;
                }
                
                saa();
            } else if (action == "nowPlaying" && nPlaying != ndat[0] && iter >= 8) {
                tried.abort();
                
                nPlaying = ndat[0];

                saa();
            } else if ((action == "failedScrobs" || action == "tryScrobs") && failedScrobs.length != 0 && iter >= 8) {
                tried.abort();
                
                saa();
            } else {
                setTimeout(function() { doCheckRunning(iter + 1); }, 1000);
            }
        }
            
        doCheckRunning(0);
    };
        
    var lfmOff = function() {
        sKey = null;
        uName = null;
        GM_setValue("sessKey", false);
        GM_setValue("username", false);
        auth = false;
        GM_log("lfmOff");
        
        // This is the button. Parent should be "li." Grandparent should be "ul."
        this.parentNode.parentNode.removeChild(this.parentNode);
        //$("nav > ul:nth-child(2) > li.lastfm-disabled")
        
        var turnOnLfm = function() {
            // Change button text. Child is span. "Grandchild" is textnode.
            if (this.childNodes[0].childNodes[0].nodeValue != "oczekiwanie na token...") {
                this.childNodes[0].childNodes[0].nodeValue = "ładowanie...";
            }
        };

        var lfmbtn = loaduia(turnOnLfm, "oczekiwanie na token...");
        lfmbtn.style.color = "#fff";
        
        // Get link for enabling last.fm
        dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn); };
                    
    var getsess = function(initTok, apisig) {
        //GM_log("getsess");
        //GM_log("initTok:"+initTok);
        //GM_log("apisig:"+apisig);
        var sessKey;
        var name;
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=auth.getsession&api_key=" + API_KEY + "&token=" + initTok + "&api_sig=" + apisig,
            onload: function(xhr) {
                GM_log("xhr:"+xhr.responseText);
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
    
    var dogetsess = function(tok, enablelfmbtn) { 
        GM_log("dogetsess:"+tok);
        dofunc(["api_key" + API_KEY, "token" + tok], "auth.getsession", "getsess", tok);
        if (typeof sKey == "undefined" || typeof uName == "undefined" || sKey == null || 
            uName == null || sKey == false || uName == false) {
            GM_log("sKey:"+sKey);
            GM_log("uName:"+uName);
            setTimeout(function() { dogetsess(tok, enablelfmbtn); }, 2000);
        } else {
            // This is the button. Parent should be "li." "Grandparent" should be "ul."
            //enablelfmbtn.parentNode.parentNode.removeChild(enablelfmbtn.parentNode);

            loadui(lfmOff, "deaktywuj last.fm", "enable-lastfm");
            $(".enable-for-token").remove();
            $(".oczekiwanie-na-token").remove();
            //checkFav();
            auth = true;
        }
    };
        
    var gettok = function(apisig, enablelfmbtn) { 
        var tok;
        GM_log("gettok apisig:"+apisig)
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=" + API_KEY + "&api_sig=" + apisig,
            onload: function(response) {
                var temptoken = response.responseText;

                parser = new DOMParser();
                tokenXML = parser.parseFromString(temptoken, "text/xml");
                tokenPar = tokenXML.getElementsByTagName("token")[0];
                tok = tokenPar.childNodes[0].nodeValue;

                enablelfmbtn.childNodes[0].href = "http://www.last.fm/api/auth/?api_key=" + API_KEY + "&token=" + tok;
                enablelfmbtn.childNodes[0].target = "_blank";

                enablelfmbtn.childNodes[0].childNodes[0].nodeValue = "aktywuj last.fm";

                enablelfmbtn.addEventListener("click", function() { dogetsess(tok, enablelfmbtn); }, false);
            }
        });
    };
        
    var dorun = function(apisig, run, arg) {
        if (run == "doScrobble") {
            doScrobble(arg + "&api_sig=" + apisig, false);
        } else if (run == "failedScrobbles") {
            doScrobble(arg + "&api_sig=" + apisig, true);
        } else if (run == "doNowPlaying") {
            doNowPlaying(arg + "&api_sig=" + apisig);
        } else if (run == "gettok") {
            gettok(apisig, arg);
        } else if (run == "getsess") {
            getsess(arg, apisig);
        }
    };
            
    var dofunc = function(params, func, run, arg) {
        if (auth === true || run == "gettok" || run == "getsess") {
            params.push("method" + func);
            params.sort();
            if (PRIV_KEY == "") {
                var allpars = "params=" + encodeURIComponent(params.join(""));
                GM_xmlhttpRequest({
                    method: "POST",
                    //url: "http://ericflin.com/scripts/api_sig.php",
                    url: "http://people.freedesktop.org/~kkszysiu/tubatolast.php",
                    headers: {
                        "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                        "Accept": "application/atom+xml,application/xml,text/xml",
                        "Content-Length": allpars.length,
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: allpars,
                    onload: function(response) {
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
    
    sKey = GM_getValue("sessKey");
    uName = GM_getValue("username");
    tFailedScrobs = GM_getValue("failedScrobs");
    if(typeof sKey == "undefined" || typeof uName == "undefined" ||
        sKey == null || uName == null || sKey == false || uName == false) { 
        auth = false;
        var turnOnLfm = function() {
            // Change button text. Child is span. "Grandchild" is textnode.
            this.childNodes[0].nodeValue = "ładowanie...";
        };
        
        var lfmbtn = loaduia(turnOnLfm, "oczekiwanie na token...");
        lfmbtn.style.color = "#fff";
        
        
        GM_log("getting auth token");
        // Get link for enabling last.fm
        dofunc(["api_key" + API_KEY], "auth.gettoken", "gettok", lfmbtn);
        
        GM_log("auth token fetched?");
        
        //saa();
    } else {
        auth = true;
        wait = false;
        
        if (typeof tFailedScrobs != "undefined" && tFailedScrobs != null && tFailedScrobs != false && tFailedScrobs != "") {
            wait = true;
            failedScrobs = JSON.parse(tFailedScrobs);
            doFailedScrobs(failedScrobs); }

        loadui(lfmOff, "deaktywuj last.fm");
        //checkFav();
        
        if (wait) {
            var time = new Date();
            var t = Math.round(parseInt(time.getTime()/1000));
            checkRunning("failedScrobs", t);
        } else {
            //saa();
        }
    }
}

function initTubaClass() {
    if (tubaClassInitialised === true) {
        return;
    }

    //if (typeof("unsafeWindow") == undefined) {
    //    GM_log("typeof(unsafeWindow) == undefined");
    //    var unsafeWindow = window;
    //}

    try {
        var unsafeWindow = this['unsafeWindow'] || window;
        unsafeWindow.tuba;
    } catch(e) {
        GM_log("Damn! Something is terribly wrong! "+e);
        return;
    }

    var tuba_player_events_orig = unsafeWindow.tuba.player.events;

    unsafeWindow.tuba.debug = true;
    unsafeWindow.console = logging;

    tubaClassInitialised = true;

    unsafeWindow.tuba.player.events = function(e) {
        //GM_log("event!!! "+e.event);
        if (e.event != "status") {
            logging.log(e);
        }
        switch(e.event) {
        
            case 'ready':
            
                if (!unsafeWindow.tuba.loadDone) return;

            break;
        
            case 'vastStart':
                //tuba.bridge.toSlave('vastStart', e);                    
            break;
        
            case 'spotStart':
                //tuba.bridge.toSlave('spotStart', e);
            break;
            
            case 'spotComplete':
                //tuba.bridge.toSlave('spotComplete', e);
            break;              

            case 'playerReady':
                //tuba.bridge.toSlave('playerReady', e);
            break;

            case 'playerStart':
                var artist_name = e.info.artist_name;
                var song_title = e.info.song_title;
                lastFmInstance.setTrackInfo(artist_name, song_title, undefined);
                lastFmInstance.startScrobbling();
                lastFmInstance.startSAA();
            break;              
            
            case 'playerClose':
                //tuba.bridge.toSlave('playerClose', e);
                lastFmInstance.stopScrobbling();
            break;              
            
            case 'playerComplete':
                //tuba.bridge.toSlave('playerComplete', e);
                lastFmInstance.scrobbleIt();
            break;

            case 'status':
                lastFmInstance.updateStatusCnt();
                //tuba.bridge.toSlave('status', e);
            break;

        }

        tuba_player_events_orig(e);
    }

}

function waitForTubaClass() {
    // TODO: check is it http://fm.tuba.pl/player URL ;)
    GM_log("waitForTubaClass: "+tubaClassInitialised);
    if (tubaClassInitialised !== true) {
        initTubaClass();
        setTimeout(waitForTubaClass, 2000);
    }
}

function initLastFM() {
    GM_log("initLastFM");
    waitForTubaClass();

    lastFmInstance = new lastfm();
}

initLastFM();

});