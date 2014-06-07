// ==UserScript==
// @name           TehConnection :: Fix Poster
// @namespace      GLaDOSDan
// @include        *tehconnection.eu/torrents.php?id=*
// ==/UserScript==

//document.body.innerHTML.replace('<div class="head">Film Poster</div>', '<div class="head">Film Posters</div>');

document.getElementById('poster').children[0].innerHTML += ' (<a id="fixlink" href="#">Fix</a>)';


window.fixposter = function(){

var matchtid = location.href.match(/[?&]id=(\d+)/);

var torrentid = matchtid[1];


GM_xmlhttpRequest({
method: 'GET',
url: 'http://gladosdan.com/tc/tc_fix.php?torrent=' + torrentid,
onload: function(response) {
alert(response.responseText);
window.location.reload();
}
});
}

var posterfixid = document.getElementById('fixlink');
posterfixid.addEventListener("click", fixposter, true);



