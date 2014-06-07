// ==UserScript==
// @name           mods.de - FFF Imageblocker
// @namespace      http://userscripts.org/users/504145
// @author         Anarchy
// @description    Ersetzt Bilder im FFF-Thread
// @include        http://forum.mods.de/bb/thread.php*
// @include        http://forum.counter-strike.de/bb/thread.php*
// @include        http://forum.cstrike.de/bb/thread.php*
// @include        http://82.149.226.138/bb/thread.php*
// @version        0.2a
// @license        GPL 3 or later
// @grant          none
// ==/UserScript==

var exp = new RegExp(/.*fap.free.feb.*/i); 
var replacement = "http://i.imgur.com/vlBNul2.png"

if ( exp.test(document.title)){
 var images = document.getElementsByClassName('p');
  for( var c = 0 ; c < images.length ; c++){
   images[c].src = replacement;
 }
}
