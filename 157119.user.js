// ==UserScript==
 // @name Dorfnummern aus igms auslesen
 // @namespace none
 // @include http://de*.die-staemme.de/game.php?village=*&mode=view&view=*
 // @include http://nl*.tribalwars.nl/game.php?village=*&mode=view&view=*
 // @author joh
 // ==/UserScript==

 var str = '';
 var findTxt = /screen=info_village/;
 var findID = /id=[0-9]*/;
 var res;

 for (var linkNum = 30; linkNum < document.links.length; linkNum++) {
 var link = document.links[linkNum];
 if (link.href.search(findTxt) != -1) {
 if (str != '')
 str = str + ',';
 res = link.href.match(findID);
 res = "" + res; // umwandeln in String
 res = res.substr(3);
 str = str + res;
 }
 }

 if (str != '')
 prompt("Dorfnummern fuer Massenangriffsplaner", str);