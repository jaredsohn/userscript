// ==UserScript==
// @name        HTTPS fix
// @namespace   projectgo
// @description This just fixes the HTTPS problem by redirecting you to the HTTP site instead.
// @include     http://www.simplepickup.com/simplepickup-premium/*
// @include     https://www.simplepickup.com/simplepickup-premium/*
// @version     1.1
// ==/UserScript==

window.setTimeout(main, 10);

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

function main() {
    //Add favicon.
    var headID = document.getElementsByTagName("head")[0];         
    var favNode = document.createElement('link');
    favNode.id = 'favicon';
    favNode.rel = 'icon';
    favNode.type = 'image/png';
    favNode.href = 'http://i.imgur.com/R3aA7.png';
    headID.appendChild(favNode);

    var url = window.location.href;
    console.log(url);
    if(url.startsWith("https")){
        window.location.href= window.location.href.replace("https", "http");
    }
}
