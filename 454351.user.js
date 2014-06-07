// ==UserScript==
// @name        Play Spotify in Desktop Player
// @namespace   https://zornco.com/
// @include     http*://play.spotify.com/*track/*
// @include     http*://play.spotify.com/*album/*
// @include     http*://play.spotify.com/*artist/*
// @include     http*://play.spotify.com/*playlist/*
// @include     http*://play.spotify.com/*user/*
// @version     1.0.1
// @downloadURL	https://userscripts.org/scripts/source/454351.user.js
// @updateURL	https://userscripts.org/scripts/source/454351.meta.js
// @grant       none
// ==/UserScript==

href = window.location.href;
parts = href.split("/");
id = parts[parts.length-1];
parts2 = id.split("?");
id = parts2[0];
type = parts[parts.length-2];
if(parts[3] == 'apps')
    return;

var type = '';
for(var i = 3; i < parts.length-1; i++) {
    type += parts[i];
    if(i < parts.length-2) {
        type += '/';
    }
}

console.log(href);
console.log(parts);
console.log('spotify:'+type+':'+id);

window.location.replace('spotify:'+type+':'+id);

function closeTab(){
    window.open('', '_self', '');
    window.close();
}

var anchor = document.createElement('a');
anchor.innerHTML = 'Open in Spotify Desktop Player';
anchor.href = 'spotify:'+type+':'+id;

document.body.innerHTML = '';
document.body.appendChild(anchor);

closeTab();