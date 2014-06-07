// ==UserScript==
// @name       reddit, side div remover
// @namespace  reddit
// @version    0.1
// @description  removes the side div class to make room to read comments
// @match      http*://www.reddit.com/r/*/comments/*
// @copyright  2012+, You
// ==/UserScript==
function r(){if (window.innerWidth <= window.screen.width / 2){$('.side').hide();}else{$('.side').show();}}$(document).ready(r());window.onresize = r;
