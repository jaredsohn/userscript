// ==UserScript==
// @name          Nigrafia
// @namespace     em/lrdwhyt/theme1
// @description   EM site theme - black
// @include       http://www.epicmafia.com/*
// @exclude       http://www.epicmafia.com/game/*
// @include       http://www.epicmafia.com/game/new
// ==/UserScript==


document.getElementById('container').style.display='none';
var head = document.getElementsByTagName('head')[0];
if (!head) { return; }
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#container { background:black; color:white; } .bubble, .odd, .module { color:black; } .nudge, .gamesetup, .tableid, .header { background:white; } label { background:black; }';
head.appendChild(style);
document.getElementById('container').style.display='block';