// ==UserScript==
// @name           Banditi TEST
// @namespace      Pepernoot
// @description    Begin project
// @version        1.0
// @include        http://*forum.banditi.nl/*
// ==/UserScript==

//extra knopjes en search
var buttons = document.getElementById ('menubuttons');
buttons.innerHTML = '<div onclick="window.location=\'./faq.php\';" style="float: left; cursor: pointer;" class="button">Help</div><div onclick="window.location=\'./memberlist.php?mode=leaders\';" style="float: left; cursor: pointer;" class="button">Het team</div><div onclick="window.location=\'./memberlist.php\';" style="float: left; cursor: pointer;" class="button">Ledenlijst</div><div onclick="window.location=\'./search.php?search_id=newposts\';" style="float: left; cursor: pointer;" class="button">Toon nieuwe berichten</div><br><div style="float: left; cursor: pointer;" onclick="window.location=\'./viewonline.php\'" class="button">Wie wat waar?</div><div style="float: left; cursor: pointer;" onclick="window.location=\'./ucp.php\'" class="button">Gebruikerspaneel</div><div style="float: left; cursor: pointer;" onclick="window.location=\'http://banditi.nl/\'" class="button">Spel</div><div onclick="window.open(\'http://onetwogaming.com/wiki\',\'Banditi: OneTwoGaming wiki\');" style="float: left; cursor: pointer;" class="button">Wiki</div>';
var search = document.getElementById ('search');
search.innerHTML = search.innerHTML + '<br/><div class="button" onclick="window.location=\'./search.php\'" style="float: center; cursor: pointer; text-align: center;">Uitgebreid zoeken</div>';

//header
var header = document.getElementsByClassName ('headercontainer');
//header[0].innerHTML = '<div style="color:white; float:right; margin-right:5px;"><br/><br/>Banditi Forum<br/>Aangepaste Versie<br/>Versie 1.0</div>' + header[0].innerHTML;

//forumregels remover
var forumrules = document.getElementsByClassName('forumrules')[0];
forumrules.style.display="none";