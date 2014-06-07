// ==UserScript==
// @name       torrentino.com no wait
// @namespace  HEX0x29A
// @version    0.1
// @description torrentino.com download torrent file fixer
// @match      http://www.torrentino.com/torrents/*/start_download
// @copyright  2014, HEX0x29A
// ==/UserScript==
window.location.href = window.location.toString().replace("start_", "");
