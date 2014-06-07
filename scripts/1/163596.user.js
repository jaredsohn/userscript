// ==UserScript==
// @name       Torrentino faster download
// @version    1.1
// @description  Download torrents from torrentino.com without viewing ads!!!
// @include  http://*.torrentino.*/torrents/*
// @copyright  WTFPL2
// ==/UserScript==
var lol =    document.getElementsByClassName('download-torrent')[0];
lol.href = lol.href.replace("start_","");