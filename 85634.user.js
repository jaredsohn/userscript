// ==UserScript==
// @name           Transformice_Fullscreen
// @namespace      Transformice
// @description    Removes all visible elements on the page except for the Transformice game, enlarges the game to 1350x825, colors blank game space purple, 2px red border on the game.
// @include        transformice.com/
// @include        transformice.com/en2
// @include        transformice.com/en
// @include        transformice.com/ru
// @include        www.transformice.com
// @include        www.transformice.comen
// @include        www.transformice.com/en2
// @include        www.transformice.com/ru
// @include        http://www.transformice.com/
// @include        http://www.transformice.com/en
// @include        http://www.transformice.com/en2
// @include        http://www.transformice.com/ru
// ==/UserScript==
//Author: CEMREHAN

//Game manipulation
var swf = document.getElementsByName('Transformice')[0];
swf.setAttribute("bgcolor", "#6600FF");
swf.align = "middle";
swf.style.border = "2px solid red";
swf.style.display = "block";
swf.width = 1350; 
swf.height = 825;

//Removals
document.getElementById('header').parentNode.removeChild(document.getElementById('header'));
document.getElementById('hautmenu').parentNode.removeChild(document.getElementById('hautmenu'));
document.getElementById('hautmenu2').parentNode.removeChild(document.getElementById('hautmenu2'));
    
var Frames = document.getElementsByTagName('iframe'); //facebook
for (var i = 0; i < Frames.length; i++ )
{
    Frames[i].parentNode.removeChild(Frames[i]);
}

var Links = document.getElementsByTagName('link'); //styles.css
for (var i = 0; i < Links.length; i++ )
{
    Links[i].setAttribute("href", "");
}

var Inss = document.getElementsByTagName('ins'); //Adsense
for (var i = 0; i < Inss.length; i++ )
{
    Inss[i].parentNode.removeChild(Inss[i]);
}

var Scripts = document.getElementsByTagName('script'); //Adsense
for (var i = 0; i < Scripts.length; i++ )
{
    Scripts[i].parentNode.removeChild(Scripts[i]);
}