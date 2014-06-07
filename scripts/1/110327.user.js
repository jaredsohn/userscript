// ==UserScript==
// @id             qlescaper@phob.net
// @name           Quake Live Escaper
// @version        1.6
// @namespace      phob.net
// @author         wn
// @description    Press escape to close Quake Live's Game Summary, Live Game Info and notification popups
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/110327.meta.js
// ==/UserScript==

function QLE() {
  document.addEventListener("keyup", function(e) {
    if (e.keyCode != 27) return;
    window.quakelive.matchtip.HideMatchTooltip(-1);
    window.jQuery("#stats_details, #ql_notifier .ql_notice").remove();
  }, false);
}

var scriptNode = document.createElement("script");
scriptNode.setAttribute("type", "text/javascript");
scriptNode.text = "(" + QLE.toString() + ")();";
document.body.appendChild(scriptNode);
