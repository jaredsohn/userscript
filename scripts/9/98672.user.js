// ==UserScript==
// @name           Poppen.de Online Suche
// @namespace      http://userscripts.org/users/SlickOne
// @description    man kann jetzt auswählen "Nur Online-Mitglieder (nur für Premium- und VIP-Mitglied) ." und online user suchen
// @include        http://www.poppen.de/suche*
// @version        1.0
// ==/UserScript==

(function(){
var box, boxes = document.evaluate("//input[@type='checkbox']",document,null,6,null), bL=boxes.snapshotLength-1;
for(var i=bL; i>=0; i--) {
box = boxes.snapshotItem(i);
box.removeAttribute('disabled');
}
})();