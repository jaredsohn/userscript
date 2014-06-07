// ==UserScript==
// @name        Twitter T.co bypass
// @namespace   http://userscripts.org/users/192333
// @version     1
// @include	http*://*twitter.com/*
// @grant			GM_deleteValue
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_info
// ==/UserScript==
si = window.setInterval(clearanchors, 2000);
function clearanchors(){
    anchors = document.getElementsByTagName('a')
    for(i=0;i<anchors.length;i++){
        if(anchors[i].getAttribute('data-expanded-url') != null){
            anchors[i].setAttribute('href', anchors[i].getAttribute('data-expanded-url'));
        }
    }
}