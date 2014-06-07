// ==UserScript==
// @name           Doogle
// @namespace      http://userscripts.org/users/48503
// @description    Turns Google into Doogle
// @include        http://www.google.tld/
// @include        http://www.google.tld/webhp*
// ==/UserScript==


var logo=document.getElementsByTagName("img")[0];
//logo.src="http://www.doogle.org/doogle-300x108.png";
logo.src="http://a.bebo.com/app-image/7410927388/5315963826/PROFILE/sbst1w.static.zynga.com/stickerz/bebo/images/76/164/369740.jpg";
logo.height="300";
logo.width="300";

document.title="Doogle";
document.getElementsByTagName("input")[2].value="Doogle Search";