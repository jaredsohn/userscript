//
// ==UserScript==
// @name           Remove MySpace Crap
// @description    Remove Styles, Scripts and Embeds from Myspace
// @include        *myspace.com*
// ==/UserScript==

var badStyles;
badStyles = document.getElementsByTagName('style');
for (var i = 0; i < badStyles.length; i++) 
{
   badStyles[i].parentNode.removeChild(badStyles[i]);
}

var badMusic;
badMusic = document.getElementsByTagName('script');
for (var i = 0; i < badMusic.length; i++) 
{
   badMusic[i].parentNode.removeChild(badMusic[i]);
}

var badObj;
badObj = document.getElementsByTagName('embed');
for (var i = 0; i < badObj.length; i++) 
{
   badObj[i].parentNode.removeChild(badObj[i]);
}
