// ==UserScript==
// @name           scRYMble
// @namespace      http://bluetshirt.ca/scrymble
// @description   Visit a release page on rateyourmusic.com and scrobble the songs you see!
// @include        http://rateyourmusic.com/release/*
// @include        https://rateyourmusic.com/release/*
// ==/UserScript==

//THANK YOU FOR THE NAME, LYNKALI!
//THANKS TO 5thEye for some useful tweaks and bug fixes.
//Thanks BruceWayne for the credits fix.

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

var $ = unsafeWindow.jQuery; 

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    
    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;
    
    for(var i = 0; i < x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        
        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
        
        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
        
        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
        
        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
        
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
    
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
    var bkey = str2binl(key);
    if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
    
    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++)
    {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
    return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
    var str = "";
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
    return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++)
    {
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
    }
    return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i += 3)
    {
        var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
        | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
        |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
        for(var j = 0; j < 4; j++)
        {
            if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
        }
    }
    return str;
}

function getElementsByClassName(node, classname)
{
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
        return a;
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}

toScrobble = new Array();
var currentlyScrobbling = -1;
var sessID = false;
var submitURL = false;
var npURL = false;
var currTrackDuration = false;
var currTrackPlaytime = false;
var numChecks = 0;


function confirmBrowseAway(oEvent)
{
    if (currentlyScrobbling != -1)
        oEvent.returnValue = "You are currently scrobbling a record. Leaving the page now will prevent future tracks from this release from scrobbling.";
    
}

function getPageArtist()
{
    byartist = $('span[itemprop="byArtist"]');
    art_cred = $(byartist).find('.credited_name:eq(0) > span[itemprop="name"]');
    if ($(art_cred).length > 0){
        return $(art_cred).text();
    } else {
        return $(byartist).text();
    }
}

function getAlbum()
{
    return $(".album_title:eq(0)").text();
}

function isVariousArtists()
{
    var artist = getPageArtist();
    return ((artist.indexOf("Various Artists") > -1) || (artist.indexOf(" / ") > -1));
}

function ScrobbleRecord(trackName, artist, duration)
{
    this.artist = artist;
    this.trackName = trackName;
    
    var durastr = duration.trim();
    
    var colon = duration.indexOf(":");
    if (colon != -1)
    {
        var minutes = duration.substring(0, colon);
        var seconds = duration.substring(colon+1);
        
        this.duration = (minutes * 60) + (seconds * 1);
    } else
    {
        this.duration = 180;
    }
    
    this.time = 0;
    
}

fetch_unix_timestamp = function()
{
    return parseInt(new Date().getTime().toString().substring(0, 10))
}

function acceptSubmitResponse(responseDetails, isBatch)
{
    
    if (responseDetails.status == 200)
    {
        if (responseDetails.responseText.indexOf("OK") == -1)
        {
            alert("track submit failed: " + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Data:\n' + responseDetails.responseText);
        } else
        {
            //alert("OK!");
        }
    } else
    {
        
        alert("track submit failed: " + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Data:\n' + responseDetails.responseText);
    }
    
    if (isBatch)
    {
        document.getElementById("scrymblemarquee").innerHTML = "Scrobbled OK!";
    } else
    {
        scrobbleNextSong();
    }
}

function acceptSubmitResponseSingle(responseDetails)
{
    acceptSubmitResponse(responseDetails, false);
}

function acceptSubmitResponseBatch(responseDetails)
{
    acceptSubmitResponse(responseDetails, true);
}


function acceptNPResponse(responseDetails)
{
    if (responseDetails.status == 200)
    {
        if (responseDetails.responseText.indexOf("OK") == -1)
        {
            alert("track submit failed: " + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Data:\n' + responseDetails.responseText);
        } else
        {
            //alert("OK!");
        }
    } else
    {
        
        alert("track submit failed: " + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Data:\n' + responseDetails.responseText);
    }
    
    
}

function buildListOfSongsToScrobble()
{
    toScrobble = new Array();
    
    var canscrobble = 1;
    $.each($('.scrymblechk'), function(){
        if ($(this).is(':checked')){
            song = $(this).parent().parent();
            var songTitle = $(song).find('span[itemprop="name"]').text();
            songTitle = songTitle.replace(RegExp(String.fromCharCode(160), "g"),' ')
            while (songTitle.indexOf('  ') > 0){songTitle = songTitle.replace('  ', ' ')}
            var artist = getPageArtist();
            var length = $(song).find('.tracklist_duration').text();
            
            ////
            
            if (isVariousArtists())
            {
                var firstDash = songTitle.indexOf(" - ");
                if(firstDash == -1) // no dash exists! must be a single artist with " / " in the name or v/a with unscrobbleable list
                {
                    artist = getPageArtist();
                    if (artist.indexOf("Various Artists") > -1)
                    {
                        artist = $(".album_title:eq(0)").text()
                        //canscrobble = 0;
                    }
                }
                else
                {
                    artist = songTitle.substring(0, firstDash);
                    songTitle = songTitle.substring(firstDash + 3);
                }
            }
            else
            {
                artist = getPageArtist()
                title = $(song).find('span[itemprop="name"]');
                if ($(title).html().indexOf('<a title="[Artist') == 0 && $(title).text().indexOf(' - ') > 0){
                    var firstDash = songTitle.indexOf(" - ");
                    artist = songTitle.substring(0, firstDash);
                    songTitle = songTitle.substring(firstDash + 3);
                }
            }
            
            if((songTitle.toLowerCase() == "untitled") || (songTitle.toLowerCase() == "untitled track") || (songTitle == ""))
            {
                songTitle = "[untitled]";
            }
            
            ////
            while (songTitle.indexOf('  ') > 0){songTitle = songTitle.replace('  ', ' ')}
            artist.rtrim()
            toScrobble[toScrobble.length] = new ScrobbleRecord(songTitle, artist, length);
        }
    });
    
}

function submitTracksBatch(sessID, submitURL)
{
    buildListOfSongsToScrobble();
    
    if(toScrobble != null)
    {
        var currTime = fetch_unix_timestamp();
        var hoursFudge = prompt("How many hours ago did you listen to this?");
        if(hoursFudge != null)
        {
            var album = getAlbum();
            
            hoursFudge = parseFloat(hoursFudge);
            
            if (!isNaN(hoursFudge))
            {
                //alert(currTime);
                currTime = currTime - (hoursFudge * 60 * 60);
                //alert(currTime);
            }
            
            for (var i= (toScrobble.length)-1; i>=0; i--)
            {
                currTime = (currTime * 1) - (toScrobble[i].duration * 1);
                toScrobble[i].time = currTime;
            }
            
            var outstr = "Artist: " + getPageArtist() + "\nAlbum: " + album + "\n";
            
            for (var i=0; i<toScrobble.length; i++)
            {
                outstr += toScrobble[i].trackName + "(" + toScrobble[i].duration + ")\n";
            }
            //alert(outstr);
            
            var postdata = new Array();
            
            for (var i=0; i<toScrobble.length; i++)
            {
                postdata["a[" + i + "]"] = toScrobble[i].artist;
                postdata["t[" + i + "]"] = toScrobble[i].trackName;
                postdata["b[" + i + "]"] = album;
                postdata["n[" + i + "]"] = (i+1);
                postdata["l[" + i + "]"] = toScrobble[i].duration;
                postdata["i[" + i + "]"] = toScrobble[i].time;
                postdata["o[" + i + "]"] = "P";
                postdata["r[" + i + "]"] = "";
                postdata["m[" + i + "]"] = "";
            }  
            
            postdata["s"] = sessID;
            
            var postdataStr = "";
            var firstTime = true;
            for (currKey in postdata)
            {	
                if (firstTime)
                {
                    firstTime = false;
                } else
                {
                    postdataStr = postdataStr + "&";
                }
                postdataStr = postdataStr + encodeURIComponent(currKey) + "=" + encodeURIComponent(postdata[currKey]);
            }
            
            //alert(submitURL);
            GM_xmlhttpRequest({
                method: 'POST',	
                url: submitURL,
                data: postdataStr,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                onload: acceptSubmitResponseBatch
            });
        }
    }
}

function elementsOnAndOff(state)
{
    
    document.getElementById("scrobblenow").disabled = !state;
    document.getElementById("scrobblepassword").disabled = !state;
    document.getElementById("scrobbleusername").disabled = !state;
    document.getElementById("scrobblepassword").disabled = !state;
    
    
    //var eleTrackTable = document.getElementById('tracks');
    
    //var rows = eleTrackTable.tBodies[0].rows;
    
    
    $.each($(".scrymblechk"), function() {
        try{
            $(this).disabled = !state;
        } catch (e)
        {
            
        }
    });
}

function elementsOff()
{
    elementsOnAndOff(false);
}

function elementsOn()
{
    elementsOnAndOff(true);
}

function startScrobble()
{
    
    currentlyScrobbling = -1;
    currTrackDuration = 0; 
    currTrackPlayTime = 0;
    
    elementsOff();
    
    buildListOfSongsToScrobble();
    
    scrobbleNextSong();
}


function resetScrobbler()
{
    currentlyScrobbling = -1;
    currTrackDuration = 0; 
    currTrackPlayTime = 0;
    document.getElementById("scrymblemarquee").innerHTML = "&nbsp;";
    document.getElementById("progbar").style.width = "0%";
    
    toScrobble = new Array();
    
    elementsOn();
    
    numChecks = 0;
    
}

function scrobbleNextSong()
{
    
    currentlyScrobbling++;
    
    if(currentlyScrobbling == toScrobble.length)
    {
        resetScrobbler();
    } else
    {
        window.setTimeout(timertick, 10);
        
        handshake();
    }
}

function submitThisTrack()
{
    var postdata = new Array();
    
    var i = 0;
    
    var currTime = fetch_unix_timestamp();
    
    postdata["a[" + i + "]"] = toScrobble[currentlyScrobbling].artist;
    postdata["t[" + i + "]"] = toScrobble[currentlyScrobbling].trackName;
    postdata["b[" + i + "]"] = getAlbum();
    postdata["n[" + i + "]"] = (currentlyScrobbling+1);
    postdata["l[" + i + "]"] = toScrobble[currentlyScrobbling].duration;
    postdata["i[" + i + "]"] = currTime-toScrobble[currentlyScrobbling].duration;
    postdata["o[" + i + "]"] = "P";
    postdata["r[" + i + "]"] = "";
    postdata["m[" + i + "]"] = "";
    
    
    postdata["s"] = sessID;
    
    var postdataStr = "";
    var firstTime = true;
    for (currKey in postdata)
    {	
        if (firstTime)
        {
            firstTime = false;
        } else
        {
            postdataStr = postdataStr + "&";
        }
        postdataStr = postdataStr + encodeURIComponent(currKey) + "=" + encodeURIComponent(postdata[currKey]);
    }
    
    GM_xmlhttpRequest({
        method: 'POST',	
        url: submitURL,
        data: postdataStr,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
        },
        onload: acceptSubmitResponseSingle
    });
}



function npNextTrack()
{
    
    var postdata = new Array();
    
    var i = 0;
    
    var	currTime = fetch_unix_timestamp();
    
    postdata["a"] = toScrobble[currentlyScrobbling].artist;
    postdata["t"] = toScrobble[currentlyScrobbling].trackName;
    postdata["b"] = getAlbum();
    postdata["n"] = (currentlyScrobbling+1);
    postdata["l"] = toScrobble[currentlyScrobbling].duration;
    postdata["m"] = "";
    postdata["s"] = sessID;
    
    currTrackDuration = toScrobble[currentlyScrobbling].duration;
    currTrackPlayTime = 0;
    
    document.getElementById("scrymblemarquee").innerHTML = toScrobble[currentlyScrobbling].trackName;
    
    
    var postdataStr = "";
    var firstTime = true;
    for (currKey in postdata)
    {	
        if (firstTime)
        {
            firstTime = false;
        } else
        {
            postdataStr = postdataStr + "&";
        }
        postdataStr = postdataStr + encodeURIComponent(currKey) + "=" + encodeURIComponent(postdata[currKey]);
    }
    
    GM_xmlhttpRequest({
        method: 'POST',	
        url: npURL,
        data: postdataStr,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
        },
        onload: acceptNPResponse
    });
}

function timertick()
{
    var again = true;
    if (currentlyScrobbling != -1)
    {
        var progbar = document.getElementById("progbar");
        if (currTrackDuration != 0)
        {
            progbar.style.width = "" + (100*currTrackPlayTime/currTrackDuration) + "%";
        }
        
        currTrackPlayTime++;
        
        if (currTrackPlayTime == currTrackDuration)
        {
            submitThisTrack();
            
            again = false;
        }
        
    }
    if (again)
    {
        window.setTimeout(timertick,1000);
    }
    
}

function acceptHandshakeSingle(responseDetails)
{
    acceptHandshake(responseDetails, false);
}

function acceptHandshakeBatch(responseDetails)
{
    acceptHandshake(responseDetails, true);
}

function acceptHandshake(responseDetails, isBatch)
{
    if (responseDetails.status == 200)
    {
        var lines = responseDetails.responseText.split("\n");
        if (lines[0].indexOf("OK") == -1)
        {
            alert("handshake failed: " + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Data:\n' + responseDetails.responseText);
        } else
        {
            sessID = lines[1];
            npURL = lines[2];
            submitURL = lines[3];
            
            if (isBatch)
            {
                submitTracksBatch(sessID, submitURL);
            } else
            {			
                npNextTrack();
            }
        }
    } else
    {
        alert("handshake failed: " + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Data:\n' + responseDetails.responseText);
        
    }
}

function handshake(isBatch)
{
    var user = document.getElementById("scrobbleusername").value;
    var password = document.getElementById("scrobblepassword").value;
    GM_setValue("user", user);
    GM_setValue("pass", password);
    
    var timestamp = fetch_unix_timestamp();
    var auth = hex_md5(hex_md5(password) + timestamp);
    
    var handshakeURL = "http://post.audioscrobbler.com/?hs=true&p=1.2&c=scr&v=1.0&u=" + user + "&t=" + timestamp + "&a=" + auth;
    
    
    GM_xmlhttpRequest({
        method: 'GET',	
        url: handshakeURL,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
        },
        onload: (isBatch) ? acceptHandshakeBatch : acceptHandshakeSingle
    });
    
}

function handshakeSingle()
{
    handshake(false);
}

function handshakeBatch()
{
    handshake(true);
}

var eleTrackTable, eleButtonDiv, eleScrobbleNow, eleAllOrNone;
eleTrackTable = document.getElementById('tracks');


if (eleTrackTable) {
    
    var n = 0;
    chkbox = '<span style="float:left;"><input type="checkbox" class="scrymblechk" id="chktrackNUM" checked="checked"></span>';
    $.each($("#tracks > .track > .tracklist_line"), function(){
        if ($(this).find('.tracklist_num:eq(0)').text() != '\n                     \n                  '){
            n++;
            $(this).prepend(chkbox.replace('NUM',n));
        }
    });
}

eleButtonDiv = document.createElement('DIV');
eleButtonDiv.innerHTML = "<table border='0' cellpadding='0' cellspacing='2'><tr><td  width='105' ><input type='checkbox' name='allornone' id='allornone' style='vertical-align:middle' checked='checked'>&nbsp;<label for='allornone' style='font-size:60%'>select&nbsp;all/none</label><br/><table border='2' cellpadding='0' cellspacing='0'><tr><td style='height:50px;width:103px;background:url(http://cdn.last.fm/flatness/logo_black.3.png) no-repeat;color:#fff'><marquee scrollamount='3' scrolldelay='200' behavior='alternate' style='font-size:80%;font-family:sans-serif;position:relative;top:17px' id='scrymblemarquee'>&nbsp;</marquee></td></tr><tr><td style='background-color:#000033'><div style='position:relative;background-color:#ff0000;width:0%;max-height:5px;left:0px;top:0px;' id='progbar'>&nbsp;</div></td></tr></table></td><td>user: <input type='text' size='16' id='scrobbleusername' value = '"+ GM_getValue("user", "") + "' /><br />pass: <input type='password' size='16' id='scrobblepassword' value = '" + GM_getValue("pass", "") + "'></input><br /><input type='button' id='scrobblenow' value = 'Scrobble in real-time' /> <input type='button' id='scrobblethen' value = 'Scrobble a previous play' /></td></tr></table>";
//eleButtonDiv.innerHTML = "<table border='2' cellpadding='0' cellspacing='2'><tr><td><img src='http://cdn.last.fm/flatness/logo_black.3.png'></td><td>user: <input type='text' size='10' id='scrobbleusername' value = '" + GM_getValue("user", "") + "'/><br />pass: <input type='password' size='10' id='scrobblepassword' value = '" + GM_getValue("pass", "") + "'/><br /><input type='button' id='scrobblenow' value='Scrobble!' /></td></tr></table>"
eleButtonDiv.style.textAlign = "right";

var buttonDivParent = document.getElementById("h_album");
//buttonDivParent.appendChild(eleButtonDiv);
$(eleTrackTable).after(eleButtonDiv);

eleScrobbleNow = document.getElementById("scrobblenow");
eleScrobbleNow.addEventListener("click", startScrobble, true);

eleAllOrNone = document.getElementById("allornone");
eleAllOrNone.addEventListener("click", allOrNoneClick, true);

document.getElementById("scrobblethen").addEventListener("click", handshakeBatch, true);

window.addEventListener("beforeunload", confirmBrowseAway, true);




function allOrNoneClick()
{
    window.setTimeout(allOrNoneAction, 10);
}

function allOrNoneAction()
{
    var allnone = $("#allornone").is(':checked');
    $.each($(".scrymblechk"), function(){
        $(this).prop('checked', allnone);
    });
    
}
