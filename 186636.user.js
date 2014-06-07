// ==UserScript==
// @name           LD Author Highlight
// @namespace      matyas.mustoha/userscripts
// @description    Highlights author comments on Ludum Dare entry pages.
// @include        /^https?://www\.ludumdare\.com/compo/ludum-dare-[0-9]+/\?action\=preview\&uid\=[0-9]+$/
// @version        1.0
// @grant          none
// @downloadURL    https://userscripts.org/scripts/source/186636.user.js
// @updateURL      https://userscripts.org/scripts/source/186636.meta.js
// ==/UserScript==

var author = document.getElementById("compo2").children[1].firstChild.data.split(" - ")[1];
var comments = document.getElementsByClassName("comment");
for (var k = 0; k < comments.length; k++)
{
	var commenter = comments[k].children[1].firstChild.firstChild.firstChild.data;
	if (commenter == author)
        comments[k].style.backgroundColor = "rgb(256, 256, 180)";
}
