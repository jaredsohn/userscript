// xvideos ads remover
// written by rikijpn
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This script removes all ads from xvideos
//
// ==UserScript==
// @name          xvideos ads remover
// @description   removes all ads from xvideos
// @include       http://www.xvideos.com/video*/*
// ==/UserScript==


//removes ads (right top)
var vidPlayer = document.getElementById('player');
vidPlayer.style.display = "inline"; // let vid's width be changed

var vidElement = document.getElementById('flash-player-embed');
vidElement.width = "100%"; // actualy change size (width)

vidElement.height = '600' // (height)

//removes ads (right bottom)
var adToRemove = document.getElementById('video-ad');

adToRemove.parentNode.removeChild(adToRemove);
document.getElementById('video-ad').style.display = 'none'; 

