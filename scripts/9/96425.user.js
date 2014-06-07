// ==UserScript==
// @name XHamster Download and embed MPlayer for gecko-mediaplayer-plugin
// @description embeds the video for MPlayer and adds a direct download link on video page
// @author KayKay modified by vigilancer modified by drifter-x modified by lvl69char
// @namespace tag:xhamster-embed-mplayer
// @include http://xhamster.com/movies/*
// @include http://*.xhamster.com/movies/*
// ==/UserScript==
// 8-Feb-2011

(function () {
var get_url = function () { 
    var scripts = document.getElementsByTagName('script');
    var scriptslen = scripts.length; 
    for (var i = 0; i < scriptslen; i++) { 
	if (scripts[i].text.indexOf('flashvars') != -1) {
            var svr = scripts[i].text.split("'srv': '")[1].split("',")[0];
            var file = scripts[i].text.split("'file': '")[1].split("',")[0];
            return svr + '/flv2/' + file;
	}
    }
};

var pnl_qs = document.getElementById("bottom_player_adv").parentNode.parentNode.lastChild.previousSibling.firstChild.nextSibling; 
var pnl_dl = document.createElement("td"); 
var lnk_dl = document.createElement("a"); 
pnl_dl.style.fontSize = "14px"; 
pnl_dl.appendChild(lnk_dl); 
pnl_qs.appendChild(document.createElement("tr").appendChild(pnl_dl));

lnk_dl.href = get_url();
var player = document.getElementById("player");

var mplayer = document.createElement("embed");
mplayer.setAttribute('id', "mplayer");
mplayer.setAttribute('class', "mplayer");
mplayer.setAttribute('type', "application/x-mplayer2");
mplayer.setAttribute('width',608);
mplayer.setAttribute('height', 480);
mplayer.setAttribute('src', lnk_dl.href);

player.parentNode.replaceChild(mplayer, player);
lnk_dl.appendChild(document.createTextNode("Download this video"));

}());
