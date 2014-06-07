// ==UserScript==
// @name        onload pling
// @namespace   go-here.nl#onload-pling
// @description plays a sound when a page is loaded
// @include     *
// @version     9001
// @grant       none
// @icon        http://blabbermouth.go-here.nl/bell.png
// ==/UserScript==

// uncomment this line if you dont want the iframes
//if (window.top != window.self) return;

window['audio'] = new Audio('http://blabbermouth.go-here.nl/179198__snapper4298__micro-bell-adaptation.mp3');
audio.play();

// louder: 179198__snapper4298__micro-bell.mp3


