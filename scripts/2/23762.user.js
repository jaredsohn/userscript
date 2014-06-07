// ==UserScript==

// @name           Last.fm Playlist Maker
// @namespace      http://jamidwye.freeshell.org

// @description    Make a Windows Media Player playlist from a last.fm most-played artists page.

// @include        http://www.last.fm/user/*/charts/?charttype=overall&subtype=artist
// ==/UserScript==
//
//changes text color
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #0033CC; margin-bottom: 5px; ' +
    'font-size: small; background-color: #BBBBBB; ' +
    'color: #ffffff; vlink:#990000;"><p style="margin: 2px 0 1px 0;"> ' +
    '<A HREF=http://jamidwye.freeshell.org/lastfmplaylist/greasey.php>' + 'Make Windows Media Player Playlist' + '</A>' +
    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);