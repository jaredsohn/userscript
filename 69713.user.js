// ==UserScript==
// @name           TehConnection : : IMDB Votes
// @namespace      GLaDOSDan
// @include        http*://*tehconnection.eu/torrents.php?*
// ==/UserScript==

function insertbox(html, index) {
    var box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = html;

    var sidebar = document.getElementById('poster').parentNode;
    if (sidebar.children.length > index) {
        sidebar.insertBefore(box, sidebar.children[index]);
    }
    else {
        sidebar.appendChild(box);
    }

    return box;
}

var imdb_img_link = document.getElementById("imdb_img_lnk").href;
var imdbtid = imdb_img_link.match(/tt(\d+)/)[1];

var matchtid = location.href.match(/[?&]id=(\d+)/);
var torrentid = matchtid[1];

var replacementv = '<a id="imdb_img_lnk" href="http://anonym.to/?http://imdb.com/title/tt' + imdbtid + '/" target="blank"><img height="15px" src="static/common/symbols/imdb.png" /></a><div class="head">IMDB Info</div><div align="center">'

GM_xmlhttpRequest({
method: 'GET',
url: 'http://gladosdan.com/tc/imdb.php?tt=' + imdbtid + '&torrent=' + torrentid + '&version=2',
onload: function(response) {
if (response.responseText !== ""){ 
var boxcode = response.responseText
var newcode = boxcode.replace(/(.+?<div align="center">)/, replacementv)
insertbox(newcode, 2); }
}
});