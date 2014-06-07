// ==UserScript==
// @name        Schulhofchat_Eingabe_Und_Bilder
// @namespace   http://www.schulhofchat.de/*
// @description Bilder Hinzufügen in der Eingabe
// @include     http://www.schulhofchat.de/input.php?*
// @include     http://schulhofchat.de/input.php?login=*
// @version     1
// ==/UserScript==



  //alert(document.forms[0].getElementsByTagName("a").length);
var z = document.forms[0].getElementsByTagName("strong")[0].innerHTML
document.forms[0].getElementsByTagName("a")[3].text = 'Picture Mangager für  ' + z
document.forms[0].getElementsByTagName("a")[3].href = 'http://imghero.bplaced.net/home.php?user=' + z
document.forms[0].getElementsByTagName("iframe")[0].name = 'MYFrame'
document.forms[0].getElementsByTagName("iframe")[0].src = 'http://imghero.bplaced.net/mini.php?user=' + z




