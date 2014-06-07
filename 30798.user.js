// ==UserScript==
// @name          Steezy Chat
// @namespace     http://www.iancollins.me
// @description   Makes Pibb/Campfire + Fluid/Firefox one hell of a steez
// @author        Ian Collins
// @homepage      http://www.iancollins.me
// @include       *pibb.com*
// @include       *campfirenow.com*
// ==/UserScript==

// load in actual JS from GitHub
var script_elem = document.createElement('script')
script_elem.src = 'http://github.com/3n/steezy-pibb/raw/master/steezychat.js'
script_elem.type = 'text/javascript'
document.getElementsByTagName('head')[0].appendChild(script_elem)