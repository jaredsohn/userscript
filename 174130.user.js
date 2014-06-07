// ==UserScript==
// @name        Dustforce Atlas to Dustworth.com
// @namespace   http://fatalis.hacked.jp/
// @include     http://atlas.dustforce.com/*/*
// @version     1
// ==/UserScript==

var mapImageLink = document.getElementsByClassName('map-image')[0].getAttribute('style');
var regex = /\/maps\/(.+).png/g;
var match = regex.exec(mapImageLink);
var mapName = match[1];

var shareArea = document.getElementsByClassName('share-area')[0];
var link = document.createElement('a');
link.className = 'custom-button';
link.style.cssText = "background: url('http://dustworth.com/images/dustworthAtlas.png'); background-repeat: no-repeat;";
link.href = 'http://dustworth.com/index.php?level=' + mapName;
shareArea.appendChild(link);
