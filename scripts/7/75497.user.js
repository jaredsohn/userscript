// ==UserScript==

// @name          Unhide-Me

// @namespace     ModernWiz@gmail.com
// @description   See hidden content in webpages

// @include       *

// ==/UserScript==

function unhide()
{
var spnum = document.getElementsByTagName("span");
for (var i=0;i<spnum.length;i++)
{
   spnum[i].style.visibility="visible";
   spnum[i].style.display="inline";
};
}
window.onload = unhide;