// ==UserScript==
// @name           criminas  Forum
// @namespace      Flocker
// @description    Forum
// @version        0.1
// @include        http://*forum.criminas.nl/*
// ==/UserScript==

var buttons = document.getElementById ('menubuttons');
buttons.innerHTML = '<div style="float: left; cursor: pointer;" onclick="window.location=\'http://criminas.nl/\'" class="button">Het Spel</div><div onclick="window.location=\'./faq.php\';" style="float: left; cursor: pointer;" class="button">Help</div><div onclick="window.location=\'./memberlist.php?mode=leaders\';" style="float: left; cursor: pointer;" class="button">Het team</div><div onclick="window.location=\'./memberlist.php\';" style="float: left; cursor: pointer;" class="button">Ledenlijst</div><div onclick="window.location=\'./search.php?search_id=newposts\';" style="float: left; cursor: pointer;" class="button">Nieuwe berichten</div><div style="float: left; cursor: pointer;" onclick="window.location=\'./viewonline.php\'" class="button">Online leden</div><br /><center>&nbsp;&nbsp;&nbsp;<div style="float: left; cursor: pointer;" onclick="window.location=\'./ucp.php\'" class="button">Gebruikerspaneel</div><div onclick="window.open(\'http://onetwogaming.com/wiki\',\'criminas: OneTwoGaming wiki\');" style="float: left; cursor: pointer;" class="button">Wiki</div></center>';
var search = document.getElementById ('search');
search.innerHTML = search.innerHTML + '<br/><div class="button" onclick="window.location=\'./search.php\'" style="float: center; cursor: pointer; text-align: center;">Uitgebreid zoeken</div>';