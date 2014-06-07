// ==UserScript==
// @name           TehConnection :: LzTr Crossover
// @namespace      GLaDOSDan
// @include        *tehconnection.eu/torrents.php?*
// ==/UserScript==


//PHP JS

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


var moviename = document.title || "";

var thefilm = moviename.substr(0, moviename.indexOf(' ::'));

var https_lztr = location.href.substr(0, 5);



GM_xmlhttpRequest({
method: 'GET',
url: 'http://gladosdan.com/tc/lztr.php?movie=' + thefilm + '&https=' + https_lztr,
onload: function(response) {
if (response.responseText !== ""){ insertbox(response.responseText, 2); }
}
});