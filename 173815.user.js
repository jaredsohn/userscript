// ==UserScript==
// @name        Stop YouTube Video Download
// @namespace   http://userscripts.org/users/sknepal
// @description Stops YouTube Video From Downloading.
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @grant       none
// @version     1.2
// @downloadURL http://userscripts.org/scripts/source/173815.user.js
// @updateURL   http://userscripts.org/scripts/source/173815.meta.js
// ==/UserScript==

/* CHANGE LOG

1.2 (1/27/2014)  : made it support Youtube 'red bar' feature (SPF).
                   thanks to JoeSimmons for the idea : http://userscripts.org/scripts/show/174846
1.1 (08/18/2013) : removed pauseVideo option.
1.0 (07/21/2013) : created.

*/

var btn_id = 'stop-download';

function checkButton() {
    var button = document.getElementById(btn_id);
    if (button == null) {
        addButton();
    }
}

function addButton() {
    var cont = document.getElementById('watch7-user-header');
    var btn = document.createElement('button');
    lastContainerChild = cont.lastElementChild;
    btn.id = 'stop-download';
    btn.setAttribute('type', 'button');
    btn.setAttribute('title', 'Stop Youtube Download');
    btn.setAttribute('data-tooltip', 'Stop Youtube Download');
    btn.setAttribute('data-tooltip-title', 'Stop Youtube Download');
    btn.setAttribute('class', 'yt-subscription-button yt-uix-button yt-uix-button-subscribe-branded');
    btn.style.marginLeft = '10px';
    var txt = document.createElement('span');
    txt.setAttribute('id','stpdownload');      
    txt.appendChild(document.createTextNode('Stop Video'));
    txt.setAttribute('class', 'yt-uix-button-content');
    btn.appendChild(txt);
    cont.appendChild(btn);
    btn.addEventListener('click',stopvidload, true);
}


function stopvidload(){
    var p;
    document.getElementById("movie_player-flash") ? p = document.getElementById("movie_player-flash") : null;
    document.getElementById("movie_player") ? p = document.getElementById("movie_player") : null;
    p.stopVideo();

}

    if (window !== window.top) { return; }
    window.setInterval(checkButton, 1000);