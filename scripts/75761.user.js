// ==UserScript==
// @name           SVZ Anti-Dereferer 1.0
// @namespace      http://gordon_vdlg.byethost16.com
// @description    Leitet statt des Dereferers direkt auf Seiten außerhalb von SVZ weiter.
// @include        www.schuelervz.net/Link/Dereferer/
// @include        schuelervz.net/Link/Dereferer/
// ==/UserScript==

for (var i = 0; i < document.getElementsByTagName("a").length; i++) {
  if (document.getElementsByTagName("a")[i].innerHTML == "Ja, schülerVZ verlassen") {
    sp = document.getElementsByTagName("a")[i];
    self.location.href = sp.href;
  }
}