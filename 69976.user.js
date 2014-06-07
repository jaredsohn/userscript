// ==UserScript==
// @name           TehConnection :: Who's Encoding What?
// @namespace      GLaDOSDan
// @include        http*://*tehconnection.eu/torrents.php*
// ==/UserScript==

document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
}; 

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

var userclass = document.getElementsByClassName('username');

var profileurl = userclass[0];


var matchuid = profileurl.href.match(/[?&]id=(\d+)/);

var userid = matchuid[1];


var matchtid = location.href.match(/[?&]id=(\d+)/);

var torrentid = matchtid[1];


var https_or = location.href.substr(0, 5);

GM_xmlhttpRequest({
method: 'GET',
url: 'https://gladosdan.com/tc/encoding.php?version=1&user=' + userid +'&torrent=' + torrentid + '&https=' + https_or,
onload: function(response) {
if (response.responseText !== ""){ insertbox(response.responseText, 2); }
}
});