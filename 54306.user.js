// ==UserScript==
// @name           What.CD? Bad Cover
// @namespace      google.com
// @description    Lets you know if a cover isn't on a good host.
// @include        http*://*what.cd/torrents.php?id=*
// @include        http*://*what.cd/torrents.php?action=editgroup&groupid=*
// ==/UserScript==

//By death2y
var goodhosts = [ //If you want more hosts to be "good", add them to this list as a RE matching their domain
    /whatimg\.com/
];

/******************************************************************************/
if (!window.location.search.match(/action=edit/)) { //Torrent description page
    var cover = document.getElementsByTagName("img")[0].src;
    var good = false;
    for (var i=0; i<goodhosts.length; i++) {
        if (cover.match(goodhosts[i])) {
            good = true;
            i = goodhosts.length;
        }
    }

    if (!good) {
        var coverElem = document.getElementsByTagName("img")[0];
        coverElem.style.border = ".5em outset red";
        
        var link = document.createElement("a");
        link.innerHTML = "Whatimg & Edit it";
        link.target = "_new"; //target feels so bad :(
        link.href=  "http://whatimg.com/index.php?url=1&img=" + cover;
        link.addEventListener('click', function() {
           var tid = /id=([^&]+)/.exec(window.location.href)[1];
           window.location.href = window.location.protocol + '//' + window.location.host + '/torrents.php?action=editgroup&groupid=' + tid + "#whatimg";
        }, false);
        //Put it in
        coverElem.parentNode.parentNode.insertBefore(link, coverElem.parentNode);
    }
} else if (window.location.hash == "#whatimg") { //Torrent edit page
    var inputs = document.getElementsByTagName('input');
    
    for(var i = 0; i < inputs.length; i++ ) {
        if(inputs[i].getAttribute('name') == 'summary') {
            inputs[i].value = 'Image host changed to WhatIMG';
        } else if (inputs[i].getAttribute('name') == 'image') {
            inputs[i].value = '';
        }
    }    
}
