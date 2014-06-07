// ==UserScript==
// @name           Always enable FogBugz Keyboard Shortcuts
// @namespace name.jameswilson.scripts
// @include        https://*.fogbugz.com/*
// ==/UserScript==

function enableKeys() {
  unsafeWindow.KeyManager.nHotKeysLevel = 1;
  unsafeWindow.KeyManager.activateHotKeys();
}

if(document.readystate === "complete") {
	enableKeys();
}

window.addEventListener("load", function(e) { enableKeys()  }, false);