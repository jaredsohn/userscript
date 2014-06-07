// ==UserScript==
// @name           studiVZ Buschfunk Killer
// @namespace      http://example.com/BuschfunkKiller
// @description    Entfernt den nervigen studiVZ Buschfunk (sollte auch bei schuelerVZ und meinVZ funktionieren)
// @include        http://*.studivz.net/Start/*
// @include        http://*.studivz.de/Start/*
// @include        http://*.schuelervz.net/Start/*
// @include        http://*.schuelervz.de/Start/*
// @include        http://*.meinvz.net/Start/*
// @include        http://*.meinvz.de/Start/*
// @include        http://*.studivz.net/Start
// @include        http://*.studivz.de/Start
// @include        http://*.schuelervz.net/Start
// @include        http://*.schuelervz.de/Start
// @include        http://*.meinvz.net/Start
// @include        http://*.meinvz.de/Start
// @version        16 March 2011
// ==/UserScript==

/*
Author: Michael K. (VBFrEaK)
Version: 16 March 2011
*/

(function () {
var snipplet = document.getElementById("Mod-Home-Feed");
snipplet.parentNode.removeChild(snipplet);
})();