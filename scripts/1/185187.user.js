// ==UserScript==
// @name          Spotify-NoAds
// @namespace     http://userscripts.org/users/106260
// @description   Skip the ads on play.spotify.com
// @match         https://play.spotify.com/*
// @grant         none
// @version       2.0.2
// @author        la_poigne, perkelee
// ==/UserScript==
//
// Tested on:
// Firefox 25 with Greasemonkey
//
// -----------------------------------------------------------------------------
//
// @history   01/12/2013 seems to work again
// @history   07/08/2013 hack if ads not fully loaded
// @history   31/07/2013 Skip ads instead of mutting
// @history   23/05/2013 Release
//
// -----------------------------------------------------------------------------
//
// Copyright (c) <2013> <la_poigne, perkelee>
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
//    1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
//
//    2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
//
//    3. This notice may not be removed or altered from any source
//    distribution.
//
// -----------------------------------------------------------------------------


// base64 images button
var imgNAinact = 'data:image/png;base64,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';
var imgNAact = 'data:image/png;base64,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';


//add script to page
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = 'function skippub() {\n'+
'    if (_core.audioManager.getActivePlayer().isAd == true){\n'+
'        _core.audioManager.getActivePlayer().seek(_core.audioManager.getActivePlayer().getDuration());\n'+
// hack if javascript is too fast executed and track not seeked
//'        if (_core.contextPlayer.getState().position < _core.contextPlayer._currentTrack.duration - 3){\n'+
//'            setTimeout("skippub()",1000);\n'+
//'        }\n'+
//'        setTimeout("skippub()",3000);\n'+
//'        console.log(Date(), "skipped");\n'+
'    }\n'+
//'else{ console.log(Date(), "not skipped");}\n'+
'}\n'+
// wait for the player to be loaded if not
'function waitForPlayer(){\n'+
'    if(typeof _core.audioManager !== "undefined"){\n'+
'        _core.audioManager.addEventListener("PLAYING", skippub);\n'+
'    }\n'+
'    else{\n'+
'        setTimeout("waitForPlayer()",1000);\n'+
'    }\n'+
'}';
document.body.appendChild(newScript);


// add a button to toggle NoAds status
var skipli = document.createElement('li');
skipli.innerHTML = '<a id="skip-pub" class="off">Skip Ads</a>'
document.getElementById("nav-items").appendChild(skipli);

document.getElementById("skip-pub").style.background = 'url('+imgNAinact+') no-repeat center center';
document.getElementById("skip-pub").onclick = function() {
    if (this.class != "on") {
        this.style.background = 'url('+imgNAact+') no-repeat center center';
        this.style.color = '#F1F1F1';
        this.class = "on";
        waitForPlayer();
    }
    else {
        this.style.background = 'url('+imgNAinact+') no-repeat center center';
        this.style.color = '';
        this.class = "off";
        _core.contextPlayer.removeEvent("ended", skippub);
    }
}