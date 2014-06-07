// ==UserScript==
// @name           Banditi Forum TEST> Dont download it!
// @namespace      Made By Flocker.	
// @description    Update Versie.
// @version        2.1
// @include        http://*forum.banditi.nl/*
// @include        http://*banditi.forum.nl/*
// @include        http://*.banditi.nl/*
// ==/UserScript==

var buttons = document.getElementById ('menubuttons');
buttons.innerHTML = '<div style="float: left; cursor: pointer;" onclick="window.location=\'http://banditi.nl/\'" class="button">Het Spel</div><div onclick="window.location=\'./faq.php\';" style="float: left; cursor: pointer;" class="button">Help Me</div><div onclick="window.location=\'./memberlist.php?mode=leaders\';" style="float: left; cursor: pointer;" class="button">Het Crew</div><div onclick="window.location=\'./memberlist.php\';" style="float: left; cursor: pointer;" class="button">Het Ledenlijst</div><div onclick="window.location=\'./search.php?search_id=newposts\';" style="float: left; cursor: pointer;" class="button">Toon Nieuwe Berichten</div><div style="float: left; cursor: pointer;" onclick="window.location=\'./viewonline.php\'"   class="button">Zie Online Leden</div><br /><center>&nbsp;&nbsp;&nbsp;<div style="float: left; cursor: pointer;" onclick="window.location=\'./ucp.php\'" class="button">Het Gebruikerspaneel</div><div onclick="window.open(\'http://onetwogaming.com/wiki\',\'Banditi: OneTwoGaming wiki\');" style="float: left; cursor: pointer;" class="button"> OTG Wiki</div></center>';
var search = document.getElementById ('search');
search.innerHTML = search.innerHTML + '<br/><div class="button" onclick="window.location=\'./search.php\'" style="float: center; cursor: pointer; text-align: center;">Uitgebreid zoeken</div>'; 