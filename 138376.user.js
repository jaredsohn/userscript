// ==UserScript==
// @name       ASI direct download
// @namespace  http://dooz.org/userscript/asi-direct-download.js
// @version    1.0
// @description  Directly link to video files of arretsurimages.net rather than to a download page
// @match      http://www.arretsurimages.net/contenu.php?*
// @copyright  2012 Loïc Minier <lool@dooz.org>
// ==/UserScript==

els = document.getElementsByClassName("bouton-telecharger");
for (i = 0; i < els.length; i++) {
    els[i].href = els[i].href.replace(/.*\/([^\/]*)/, "http://srv5.videos.arretsurimages.net/fichiers/$1");
}
