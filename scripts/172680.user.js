// ==UserScript==
// @name NoChaturbateTippingSounds
// @namespace http://www.vpycha.com/gmscripts
// @description Disables the annoying tipping sounds on the cam girls website of chaturbate.com. Note that those sounds would still be heard via the girl's microphone.
// @include http://chaturbate.com/*
// @include http://*.chaturbate.com/*
// @grant none
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version 1.0
// ==/UserScript==

// Author: Vladimir Pycha <vpycha@gmail.com>
// First revision created on: July 2013

// The to-be-replaced function PlayBeep() is defined in http://ccstatic.highwebmedia.com/static/CACHE5/js/029d9efc249e.js. It is called from code in the same file.
function PlayBeep(level) {
// This function does nothing, except some debug stuff.
if (!window.vpPlayBeepNum) {
  window.vpPlayBeepNum = 0;
}
var output = document.getElementById('NoChaturbateTippingSounds');
output.innerHTML = 'NoChaturbateTippingSounds: # of tips since page load: ' + ++window.vpPlayBeepNum + '';
}

function embedFunction(s) {
  document.body.appendChild(document.createElement('script')).innerHTML = s.toString();
}

var output = document.createElement('div');
output.setAttribute('id', 'NoChaturbateTippingSounds');
output.setAttribute('style', 'padding: 0px 8px 10px 8px');
document.body.appendChild(output);

embedFunction(PlayBeep);

output.innerHTML = 'NoChaturbateTippingSounds user script is on';
