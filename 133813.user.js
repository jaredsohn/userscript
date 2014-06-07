// ==UserScript==
// @id             qlbackgroundchanger@phob.net
// @name           Quake Live Background Changer
// @version        0.17
// @namespace      phob.net
// @author         wn
// @description    Customize the Quake Live background rotation
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/133813.meta.js
// ==/UserScript==

var RE_splitter = /\s*,\s*/;

GM_registerMenuCommand("Quake Live Background Changer: Change background", function() {
  // Prompt for backgrounds
  var bgs = prompt("Enter one or more comma-delimited, CSS-valid backgrounds.\n"
                 + "The value will be randomly selected and inserted into a CSS background declaration.\n"
                 + "For example (no quotes): '#ccc' or 'url(http://phob.net/squirrel.png) no-repeat'\n"
                 + "NOTE: an empty option (i.e. no text between commas) will add official BGs to the rotation.",
                 JSON.parse(GM_getValue("qlbc_backgrounds", "[]")).join(", "));

  // Ignore if cancelled
  if (bgs == null) {
    return;
  }

  // Trim the string
  bgs = bgs.trim();

  // Empty string?
  if (!bgs) {
    alert("Reload to view the official background(s).");
    GM_setValue("qlbc_backgrounds", "[]");
    return;
  }

  // Split on commas
  bgs = bgs.split(RE_splitter);

  // Save the value
  GM_setValue("qlbc_backgrounds", JSON.stringify(bgs));

  // Show a new background
  setBackground();
});


// Set a random background from those specified
function setBackground() {
  var bgs = JSON.parse(GM_getValue("qlbc_backgrounds", "[]"))
    , i
    ;

  // Do nothing if we have nothing
  if (!bgs.length) {
    return;
  }

  // Pick and set a background
  i = Math.floor(Math.random() * bgs.length);

  // Only add the background if this is a user-specified value
  if (bgs[i].length) {
    if (0 == bgs[i].indexOf("http:") || 0 == bgs[i].indexOf("https:"))
      GM_addStyle("body {background: url(" + bgs[i] + ") !important}");
    else
      GM_addStyle("body {background: " + bgs[i] + " !important}");
  }
}


// Set the initial BG
setBackground();
