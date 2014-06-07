// ==UserScript==
// @name           Kingstale automatisch Welt 4 auswählen
// @namespace      Kingstale
// @description    Wählt auf der Hauptseite gleich die gewünschte Welt aus
// @include        http://welt*.kingstale.de/
// @include        http://kingstale.de/game/logout.jspx
// @include        http://kingstale.de/
// ==/UserScript==


// Falls ihr eine andere Welt auswählen wollt, setzt die 2 hinter options auf eine andere Zahl: 0 ist immer die neueste Welt
document.getElementById('worldChoice').options[2].selected = true;

if( document.getElementById('loginName') != "" && document.getElementById('password') != "")
{
document.getElementById('loginButton').click();
}