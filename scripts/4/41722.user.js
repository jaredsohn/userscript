// Youtube without Flash
// version 0.5 BETA!
// 2009-09-08
// Copyright (c) 2009, Arne Schneck
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// Changes version 0.4 -> 0.5:
//     * Add support for Opera
// Changes version 0.3.2 -> 0.4:
//     * Add another link to make the the default quality configurable.
//       (thanks to themiddleman for the patch)
// Changes version 0.3.1 -> 0.3.2:
//     * Make default quality configurable at the beginning of this script.
//     * Workaround for the problem that sometimes the download links wouldn't
//       work or the video in the media player wouldn't start.
// Changes version 0.3 -> 0.3.1:
//     * Now the mouse changes to a pointer on the links after "View without Flash"
//       (thanks to themiddleman for the hint)
// Changes version 0.2.1 -> 0.3:
//     * Works with the new Youtube layout (13 August 2009).
// Changes version 0.2 -> 0.2.1:
//     * Works again with current Youtube page.
// Changes version 0.1 -> 0.2:
//     * Now actually works if Flash is not installed
//     * Fix separator symbols between links
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Youtube without Flash Auto
// @namespace      none
// @description    Adds links below the Youtube video to (a) download the video (HD .mp4 file, no converters are used, no external sites) (b) view the video with an embedded external player (like mplayerplug-in or the totem plugin) 
// @include       http://youtube.*/watch*
// @include       http://*.youtube.*/watch*
// ==/UserScript==

// Opera doesn't have unsafeWindow, GM_getValue and GM_setValue. We test
// whether we're in Opera and provide workarounds for that case.

if (/Opera/.test(navigator.userAgent)) {
    unsafeWindow = window;
    GM_getValue = function ( cookieName, oDefault ) {
        var cookieJar = document.cookie.split( "; " );
        for( var x = 0; x < cookieJar.length; x++ ) {
            var oneCookie = cookieJar[x].split( "=" );
            if( oneCookie[0] == escape( cookieName ) ) {
                try {
                    var footm = unescape( oneCookie[1] );
                } catch(e) { return oDefault; }
                return footm;
            }
        }
        return oDefault;
    };
    GM_setValue = function ( cookieName, cookieValue, lifeTime ) {
        if( !cookieName ) { return; }
        if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
        document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
    }
}


var noplayerDiv = document.getElementById("watch-noplayer-div");
if (noplayerDiv == null) {
    haveFlash = true;
} else {
    haveFlash = false;
}


// If we use the regular video URL in the media player, the video sometimes
// won't start. Adding '&begin=0' to the video URL seems to fix the problem.
function writePlayerNormal() {
    playerDiv.innerHTML = '<embed type="application/x-mplayer2" src="' + video_url_normal + '&begin=0' +'" width="640" height="388"><br>';
}
function writePlayerHigh() {
    playerDiv.innerHTML = '<embed type="application/x-mplayer2" src="' + video_url_high + '&begin=0' +'" width="640" height="388"><br>';
}
function writePlayerHD() {
    playerDiv.innerHTML = '<embed type="application/x-mplayer2" src="' + video_url_HD + '&begin=0' +'" width="640" height="388"><br>';
}
function restoreFlash() {
    var fo = unsafeWindow.writeMoviePlayer("watch-player-div");
}

function showPreferences() {
    // if preferences was written we can just show it
    if (document.getElementById("preferences") != null) {
        document.getElementById("preferences").style.display = "";
    }
    else {
        // preferences dialog
        var prefbar = document.createElement("div");
        prefbar.innerHTML += '<div id="preferences" style="border:1px solid #000000; width:300px; margin-left:auto; margin-right:auto; padding:3px; margin-top:10px">'
        + '<h3>Youtube Without Flash Preferences</h3>'
        + 'Default quality '
        + '<select id="preferencesDefaultQuality">'
        +     '<option value="hd">HD</option>'
        +     '<option value="high">High</option>'
        +     '<option value="normal">Normal</option>'
        +     '<option value="flash">Use Flash Player</option>'
        + '</select>'
        + '<p align="right">'
        + '<a href="#" id="savePreferencesLink">Save</a>'
        + '</p>'
        + '</div>';
        mainarea = document.getElementById('watch-ratings-views');
        mainarea.parentNode.insertBefore(prefbar,mainarea);
        
        //set select to what it is set to, or flash if not set
        document.getElementById("preferencesDefaultQuality").value = GM_getValue("defaultQuality", "flash");

        var savePreferencesLink = document.getElementById('savePreferencesLink');
        savePreferencesLink.addEventListener("click", savePreferences, true);
    }
}

function savePreferences() {
    GM_setValue("defaultQuality", document.getElementById("preferencesDefaultQuality").value);
    document.getElementById("preferences").style.display = "none";
}


var playerDiv = document.getElementById("watch-player-div");

var urlmap = unsafeWindow.swfArgs["fmt_url_map"];
vidurls = urlmap.split(/\%2C[0-9][0-9]*\%7C/);
vidformats = urlmap.match(/[0-9][0-9]*(?=\%7C)/g);
for (var i=0; i<vidurls.length; i++)
{
    vidurls[i] = vidurls[i].match(/(http.*)/)[0];
    vidurls[i] = unescape(vidurls[i]);
}


// Youtube offers several different video formats. If several formats with high
// or normal quality are available, we choose the format that is furthest left
// in the lists below
formats_HD = [22];
formats_high = [34, 18, 35];
formats_normal = [6, 5];

var formatfound;
formatfound = false;
for (var j=0; j<formats_high.length; j++) {
    for (var i=0; i<vidurls.length; i++) {
        if (vidformats[i] == formats_high[j]) {
            formatfound = true;
            var video_url_high = vidurls[i];
        }
    }
    if (formatfound) break;
}

formatfound = false;
for (var j=0; j<formats_normal.length; j++) {
    for (var i=0; i<vidurls.length; i++) {
        if (vidformats[i] == formats_normal[j]) {
            formatfound = true;
            var video_url_normal = vidurls[i];
        }
    }
    if (formatfound) break;
}

var isHDAvailable = false;
formatfound = false;
for (var j=0; j<formats_HD.length; j++) {
    for (var i=0; i<vidurls.length; i++) {
        if (vidformats[i] == formats_HD[j]) {
            formatfound = true;
            isHDAvailable = true;
            var video_url_HD = vidurls[i];
        }
    }
    if (formatfound) break;
}



var linkbar = document.createElement("div");
if (haveFlash == true) {
    var flashlink = ' &diams; <a href="#" id="restoreFlash">View Flash</a>';
} else {
    var flashlink = '';
}
if (isHDAvailable) {
    var HDlinkdown = '| <a href="' + video_url_HD + '&begin=0' + '">HD</a> ';
    var HDlinkplay = '| <a href="#" id="playHD">HD</a> ' ;
} else {
    var HDlinkdown = '';
    var HDlinkplay = '' ;
}
linkbar.innerHTML = '<div id="dlbar" style="padding-top: 8px;">'
     + '<table width="100%"><tr><td align="left">' 
     + 'Download <a href="' + video_url_normal + '&begin=0' + '">normal</a> '
     + '| <a href="' + video_url_high + '&begin=0' + '">high</a> '
     + HDlinkdown
     + ' &diams; View without Flash '
     + '<a href="#" id="playnormal">normal</a> ' 
     + '| <a href="#" id="playhigh">high</a> ' 
     + HDlinkplay 
     + flashlink
     + '</td><td align="right">'
     + '<a href="#" id="preferencesLink">Preferences</a>'
     + '</td></tr></table>' 
     + '</div>';


mainarea = document.getElementById('watch-ratings-views');
mainarea.parentNode.insertBefore(linkbar,mainarea);

var playnormalLink = document.getElementById('playnormal');
playnormalLink.addEventListener("click", writePlayerNormal, true);
var playhighLink = document.getElementById('playhigh');
playhighLink.addEventListener("click", writePlayerHigh, true);
if (isHDAvailable) {
    var playHDLink = document.getElementById('playHD');
    playHDLink.addEventListener("click", writePlayerHD, true);
}
if (haveFlash == true) {
    var restoreFlashLink = document.getElementById('restoreFlash');
    restoreFlashLink.addEventListener("click", restoreFlash, true);
}

var preferencesLink = document.getElementById('preferencesLink');
preferencesLink.addEventListener("click", showPreferences, true);

var defaultQuality = GM_getValue("defaultQuality", "flash");
if (defaultQuality == "hd") {
    if (isHDAvailable) {
        writePlayerHD();
    } else {
        writePlayerHigh();
    }
} else if (defaultQuality == 'high') {
    writePlayerHigh();
} else if (defaultQuality == 'normal') {
    writePlayerNormal();
} else if(defaultQuality == 'flash') {
    // do nothing because the flash is already there
}
