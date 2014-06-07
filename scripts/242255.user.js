// ==UserScript==
// @name GifAnnihilator
// @namespace InGame
// @author Odul
// @date 22/11/2013
// @version 0.5
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum/2-691-ami-du-flood-*
// @compat Firefox, Chrome
// ==/UserScript==



Annihilation();

function Annihilation() {
 $("img").each(function(){
   if(this.src.indexOf("gif") != -1)
   {
    this.remove();
    }
 });
 
 setTimeout(Annihilation,1000)
};