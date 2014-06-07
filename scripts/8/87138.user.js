// ==UserScript==
// @name           cc_show_all_friends
// @namespace      http://jaroschmidt.ja.funpic.de/
// @description    Zeigt automatisch alle Freunde die online sind an.
// @include        http://www.schueler.cc/*
// ==/UserScript==

// Ältere Version (funktioniert nicht) - Anfang

  //var link = document.createElement('a');

  //link.setAttribute('href','#');

  //link.setAttribute('onclick', 'getMehrOnlineFreunde();');

  //link.setAttribute('style', 'color:white;');

  //link.setAttribute('title', 'Mehr Freunde');

  //link.setAttribute('alt', 'Mehr Freunde');

  //var text = document.createTextNode('Mehr Freunde');

  //link.appendChild(text);

  //var div = document.getElementById('ChatWrapper');

  //div.appendChild(link);

  //alert("test");

// Ältere Version (funktioniert nicht) - Ende

var div = document.getElementsByTagName("body")[0];

div.setAttribute('onload', 'getMehrOnlineFreunde();');
