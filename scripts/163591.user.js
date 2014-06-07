// ==UserScript==
// @name        OSR Join Full Worlds
// @namespace   Shaun Dreclin
// @include     http://oldschool.runescape.com/*
// ==/UserScript==

var favoriteWorld = 1; //Set this to any world number and it will always be set to be the "Best world for me".

var body = document.getElementsByTagName("body")[0]
if(favoriteWorld > 0) { document.getElementsByClassName("button")[0].innerHTML = "<a class=\"button\" href=\"http://oldschool" + favoriteWorld + ".runescape.com/j1\" ><span class=\"lev_1\" ><span >(Old School " + favoriteWorld + ")</span></span><br /><br />My Favorite World</a>" }
body.innerHTML = body.innerHTML.replace(/<td class="m">\s*Old School ([0-9]+)\s*<\/td>/g, "<td class=\"m\"><a href=\"http://oldschool$1.runescape.com/j1\" style=\"color: #FFF;\" >Old School $1</a></td>");