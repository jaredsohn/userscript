// ==UserScript==
// @name           Pahan Google
// @namespace      Tesss
// @description    Turns Google into Pahan
// @include        http://www.google.tld/
// @include        http://www.google.tld/webhp*
// ==/UserScript==

var logo=document.getElementsByTagName("img")[0];
//logo.src="http://photos-468.friendster.com/e1/photos/86/49/32519468/34931042356281s.jpg";
logo.src="http://a.bebo.com/app-image/7410927388/5315963826/PROFILE/sbst1w.static.zynga.com/stickerz/bebo/images/76/164/369740.jpg";
logo.height="300";
logo.width="300";

document.title="Doogle";
document.getElementsByTagName("input")[2].value="Doogle Search";