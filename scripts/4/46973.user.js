// ==UserScript==
// @name           Free-Hack.com Sponsored Links Entfernen
// @namespace      http://gordon_vdlg.byethost16.com
// @description    Entfernt die "Sponsored Links" unter jedem ersten Post eines Threads.
// @include        http://free-hack.com/showthread.php?*
// @include        http://*.free-hack.com/showthread.php?*
// ==/UserScript==

for (var i = 0; i < document.getElementsByTagName("table").length; i++) {
  if (document.getElementsByTagName("table")[i].innerHTML.indexOf("Sponsored Links") == 78) {
    document.getElementsByTagName("table")[i].innerHTML = "";
    document.getElementsByTagName("table")[i].style.visibility = "hidden";
  }
}