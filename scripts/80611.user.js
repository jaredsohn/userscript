// ==UserScript==
// @name          Online playlist generator
// @namespace     http://userscripts.org/users/gimix/
// @description   Generate an M3U playlist of all the MP3s on a page for your favorite media player
// @include       *
// ==/UserScript==

function addStyles(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var i, lnk, m3u, div, img;
var xpath = '//a[@href]';
var mp3s  = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var links = new Array();
for (i = 0; i < mp3s.snapshotLength; i += 1) {
    lnk = mp3s.snapshotItem(i).href;
    if (lnk.match(/\.mp3$/) != null) {
	links.push(encodeURIComponent(lnk));
    }
}
m3u = links.join('%0A'); // newline
if(!m3u) { return; }
img = 
    '<img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%08%00'  +
    '%00%00%00s%1E%03%3B%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09pHYs%00%00%0B%13%00%00%0B' +
    '%13%01%00%9A%9C%18%00%00%00%07tIME%07%D5%06%07%06%2F%0Em%99%83%FD%00%00%00sIDATx%DAM%CC%AD' +
    '%0A%C2%60%00F%E1%E7%9B%DF%FCc%0B%06%B3W%25%88%C5%A0A%D0%AB1Y%0C%16%8B7%25%08%C6%05%C3d%0A'  +
    '%D3%E0d%9E%F2r8%F0%86BK%F2%9D%ED%9F%CC%DE%AD%AC%07%15s%A2E%B7%AE%D3%17%A7%E5!%CA%C3%B3%EA'  +
    '%F5%91K%94%E5cpIq%95%C8%3A%D9%7Dr%C3X%B4c%15Gl%F6B%01%D3%E1%F1w%1D%9C3hJ%C3%07h%02%182%E1k' +
    '%AB%AC%00%00%00%00IEND%AEB%60%82">';
div = document.createElement('div');
div.id = 'gm-playlist';
div.innerHTML = '<a href="data:audio/x-mpegurl,' + encodeURIComponent('#EXTM3U\n') + m3u + '">' + img + '</a>';
window.addEventListener("load",
    function() {
	document.body.appendChild(div);
    }, true
);

addStyles(
'#gm-playlist div, #gm-playlist a,' +
'#gm-playlist a:hover, #gm-playlist a:link {' +
'   margin: 0;' +
'   padding: 0;' +
'   border: 0;' +
'   text-decoration: none;' +
'}' +
'#gm-playlist img {' +
'   position: fixed;' +
'   z-index: 99999;' +
'   top: 15px;' +
'   right: 15px;' +
'   margin: 5px;' +
'   padding: 5px;' +
'   color: #000;' +
'   background-color: #eee;' +
'   border: #000 1px solid;' +
'}'
);
