// ==UserScript==
// @name            Facebook Invite All ☞ 2014 EDITION ☜ by nickless42
// @description     Invite all friends to like a Facebook page the easy way
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

function inviteAll(){
    links = document.getElementsByTagName('a');
    for (i in links) {
        l = links[i];
        if(l.innerHTML == '<span class="uiButtonText">Invite</span>') {
            l.click();
        }
    }
}

function dothetwist(){
    if(document.getElementsByClassName('_52c9 lfloat').length == 1) {
        x = document.getElementsByClassName('_52c9 lfloat')[0];

        el = document.createElement('a');
        el.innerHTML = 'Auto Invite by nickless42';
        el.className = 'uiButton';
        el.onclick = inviteAll;

        if( x.childElementCount == 0){
            x.appendChild(document.createElement('br'));
            x.appendChild(el);
        }
    }
}

dothetwist();

document.addEventListener("DOMNodeInserted", dothetwist, true);

