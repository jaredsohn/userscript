// ==UserScript==
// @name           InwardHellix Silencer
// @namespace      http://n0ctem.net
// @description    Remove all 'embed' elements from inwardhellix.net riddles
// @include        http://inwardhellix.net/*
// @exclude        http://inwardhellix.net/forum/*
// ==/UserScript==

while(document.getElementsByTagName('embed').length){
    document.getElementsByTagName('embed')[0].parentNode.removeChild(document.getElementsByTagName('embed')[0]);
}