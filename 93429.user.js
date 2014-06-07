// ==UserScript==
// @name	Bundeskampf - Keilerei automatisch überspringen
// @version	2011.1
// @author	Borckiboy
// @include	*bundeskampf.com/fights/fight*
// @include	*bundeskampf.com/sieben/fight*
// ==/UserScript==
var i = 0;
var bildname = "http://www.bundeskampf.com/Bilderx/ueber.png";
var gefunden = false;
while ((i <= (document.images.length - 1)) && gefunden == false)
{
  if (document.images[i].src == bildname)
  {
    location.href=document.images[i].parentNode.href; //Weiterleitung zu den Keilerei-Ergebnissen
	gefunden = true;
  }
  i++;
}