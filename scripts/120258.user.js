// ==UserScript==
// @name           Kronos MCAnime - Ultimas publicaciones
// @namespace      Jocolocogoco - taken from Zeyth
// @description    Coloca las ultimas publicaciones al estilo del viejo MCAnime
// @include        http://kronos.mcanime.net/
// ==/UserScript==

var style="#main-notice, .daily-releases {display:none !important;} .recentanimes {margin-top:10px !Important;} .recentanimes > .series-releases {padding:4px 4px 4px 4px !Important;} .side-box.r5 {display:none !important;}  .recentanimes > legend { background-color:maroon; color:white; padding:2px 20px; margin-left:0px; margin-top:-9px !important; font-weight:bold; width:124px !Important;} .anime-releases a {color:gray;} .manga-releases a {color:gray;} .recentanimes h4 {display:none}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);

function get(url, cb) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { cb(xhr.responseText) }
		
    })
}

function inform(text) {
animes.innerHTML = '<style type="text/css">.recentanimes > .series-releases > div {padding:0px !important;} .recentanimes > .series-releases > .notify {display:none !important;}</style> <div class="recentanimes" style="margin: 0px auto 0px -163px; ' +
    'border: 2px solid maroon; margin-bottom: 5px; margin-top:0px; padding:1px; ' +
    'background-color: white; width: 1280px; ' +
    '">' + text +
    '</div>';
}

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@id='container']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	get("http://kronos.mcanime.net/publicaciones/todas/", inform);
	var animes = document.createElement("div");
	thisDiv.insertBefore(animes, thisDiv.firstChild);
	
}