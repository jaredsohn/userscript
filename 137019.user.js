// ==UserScript==
// @name           Clean YouTube Loopy for Opera
// @namespace      http://userscripts.org/scripts/show/137019
// @version        2012.12.07
// @description    Displays a link below YouTube videos to enable/disable auto replay.
// @include        http*.youtube.com/watch?*v=*
// @include        http*.youtube.com/watch?*videos=*
// @include        http*.youtube.com/watch#!*videos=*
// @include        http*.youtube.com/watch#!*v=*
// @include        http*.youtube.com/watch?*NR=*
// @exclude        http*.youtube.com*&list=*
// @author         Rowen, Dither (fixes and Opera mod), QuaraMan (embed code)
// ==/UserScript==

var ytPlayer,
    ytLoop = false,
// Button stuff
    lpConOff = "LoopyOff",
    lpConOn = "LoopyOn";

var base = document.createElement("span");
var loopy = document.createElement("button");
loopy.id = "eLoopy";
loopy.onclick = function onClickHandler() {
    var content = document.getElementById("loopyContent"),
        button = document.getElementById("loopyButton");
    if (ytLoop) {
        //if (typeof ytPlayList != "undefined") setCookie("LoopyPL", null);
        button.setAttribute("data-tooltip-text", "Enable video looping");
        button.setAttribute("data-button-toggle", "true");
        content.setAttribute("class", lpConOff);
        ytLoop = false;
    } else {
        //if (typeof ytPlayList != "undefined") setCookie("LoopyPL", ytPlayList);
        button.setAttribute("data-tooltip-text", "Disable video looping");
        button.setAttribute("data-button-toggle", "false");
        content.setAttribute("class", lpConOn);
        ytLoop = true;
    }
};
loopy.setAttribute("class", "yt-uix-button yt-uix-tooltip");
loopy.setAttribute("role", "button");
loopy.setAttribute("data-button-toggle", "true");
loopy.setAttribute("type", "button");
loopy.setAttribute("data-tooltip-text", "Enable video looping")
loopy.id = "loopyButton";

var a = document.createElement("span");
a.id = "loopyContent"
a.setAttribute("class", lpConOff);
a.innerHTML = '<img height=10 width=6 class="yt-uix-button-icon-playlist-bar-autoplay" src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Loopy"/><span class="yt-uix-button-valign"/>';

loopy.appendChild(a);
base.appendChild(loopy);

onPlayerStateChange = function (newState) {
    if (!!ytLoop && newState == "0") window.setTimeout(function() { ytPlayer.playVideo(); }, 60);
}

window.addEventListener('DOMContentLoaded', function () {
    var head = document.getElementsByTagName("head")[0],
        style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.textContent = '#loopyButton {border: 0px none;} .yt-uix-button-panel:hover #loopyButton {border: 1px solid; border-color: #C6C6C6;} #loopyButton img {background: url("http://s.ytimg.com/yts/imgbin/www-hitchhiker-vflMCg1ne.png") -19px -25px no-repeat transparent !important; height: 18px; width: 30px;} .LoopyOff { opacity: 0.3 }';
    head.appendChild(style);

    try { document.getElementById("watch7-sentiment-actions").appendChild(base); } catch (bug) {};
    loopy = null;
    var count = 0,
        retry = window.setInterval(function() {
            ytPlayer = document.getElementById("movie_player");
            if (!!ytPlayer) {
                ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
                clearInterval(retry);
            } else if (count++ > 4) {
                clearInterval(retry);
            }
        }, 1500);
}, false);