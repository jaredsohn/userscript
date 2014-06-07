// ==UserScript==
// @name           TehConnection : : IMDB Recommendations
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


GM_xmlhttpRequest({
method: 'GET',
url: 'http://gladosdan.com/tc/imdb_rec.php?imdb=' + imdbtid + '&version=1',
onload: function(response) {
if (response.responseText !== ""){ insertbox(response.responseText, 2); }
}
});
