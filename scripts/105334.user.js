// ==UserScript==
// @name           Oznaci Vyskov
// @description    Oznaci hned pri nacteni stranky na bourkove mape Vyskov
// @include        http://www.in-pocasi.cz/radarove-snimky/*
// @include        http://www.chmi.cz/files/portal/docs/meteo/rad/data/animace.gif
// ==/UserScript==


if (document.URL == "http://www.in-pocasi.cz/radarove-snimky/")
{
document.getElementById('mestorad').style.backgroundImage = 'url(http://www.in-pocasi.cz/radarove-snimky/mesta.img.php?data=vyskov-49.28-17)' 
} 

if (document.URL == "http://www.chmi.cz/files/portal/docs/meteo/rad/data/animace.gif")
{
document.images[0].style.position="absolute";
var elem = document.createElement("div");
elem.setAttribute("style", "background-image: url(http://www.in-pocasi.cz/radarove-snimky/mesta.img.php?data=vyskov-49.28-17);position:absolute;  width: 400px; height: 300px;");
document.body.appendChild(elem);
} 
