// ==UserScript==
// @name       test
// ==/UserScript==
GM_addStyle('body {background-image: url("http://i.imgur.com/7JfGtHv.jpg")}');
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.wallpapers-manga.com/galerie/ikkitousen-dragon-destiny/Ikkitousen-25073.jpg")
{
images[x].src = "http://i.imgur.com/7JfGtHv.jpg";
}
x=x+1;
}