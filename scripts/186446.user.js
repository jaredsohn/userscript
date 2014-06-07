// ==UserScript==
// @name           Trello : width 100%
// @author         tocomo
// @version        1.0
// @include        https://trello.com/*
// @include        http://trello.com/*
// @grant       none
// ==/UserScript==
function setWidth(){
    var screen_width = $('div.list-area').css("width:100%;");
}
setWidth();