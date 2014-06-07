// ==UserScript==
// @name          Sellaband User Menu Enhancer
// @namespace     http://scrobble.me/sellaband
// @description   This userscript extends the user menu with useful links.
// @include       http://*.sellaband.com/*
// @include       http://sellaband.com/*
// @version       1.0.05012009
// ==/UserScript==

var profileWrapper = '<div class="profile_links">' +
'<a href="/member/mailbox.html"><img align="middle" alt="My Inbox" src="/static/new/icons/inbox.gif"/></a>' +
'   <a href="/member/tools.html"><img align="middle" alt=" My Promo Tools" src="/static/new/icons/tools.gif"/></a>' +
'<a href="/member/playlist_edit.html"><img align="middle" alt=" My Playlist" src="/static/new/icons/note.gif"/></a>' +
'<a href="/member/edit.html"><img align="middle" alt=" My Settings" src="/static/new/icons/tools.gif"/></a>' +
'<a href="/member/downloads.html"><img align="middle" alt="My Downloads" src="/static/new/icons/arrow.gif"/></a>' +
'<a href="/member/friends.html"><img align="middle" alt=" My Friends" src="/static/new/icons/people.gif"/></a>' +
'<a href="/member/bulletins.html"><img align="middle" alt=" My Bulletins" src="/static/new/icons/balloon.gif"/></a>' +
'<a href="/member/limited_editions.html"><img align="middle" alt="My Limited Editions" src="/static/new/icons/cd.gif"/></a>' +
'</div>';

// document.getElementsByTagName('body')[0].appendChild(profileWrapper);
addStyle(".profile_links{ position:fixed ! important; left:0px; top:130px; width: 34px; background-color: white; border: 1px solid #DBDBDB;}");
addToBody(profileWrapper);

/**
 This method adds a style item to the head element.
 */
function addStyle(css){
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addToBody(child){
    var parent;
    parent = document.getElementsByTagName('body')[0];
    if (!parent) {
        return;
    };
    parent.innerHTML = parent.innerHTML + child;
}

