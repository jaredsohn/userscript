// ==UserScript==
// @name AuroreRevient
// @namespace InGame
// @author Odul
// @date 22/11/2013
// @version 0.000001
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum/2-691-ami-du-flood-*
// @compat Firefox, Chrome
// ==/UserScript==



Annihilation();

function Annihilation() {
 $(".message .texte").each(function(){
     this.innerHTML = "<div style='color:#00873B;'>Auurooooore reviens! ♥♥♥♥♥♥</div>";
 });
 
 setTimeout(Annihilation,1000)
};