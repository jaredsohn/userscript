// ==UserScript==
//@author	       nofix
// @name           axb forum alternativ + neue farben
// @include        http://forum.areagames.de/*
// ==/UserScript==



var page = document.getElementsByClassName('body').item(0);

page.style.backgroundColor = ('#E0E6EE'); //Hintergrund Hauptseite Mitte
page.style.color = ('black'); // Schriftfarbe Hauptseite


//entfernt die Linke Leiste
var left = page.getElementsByClassName('leftside').item(0);
left.style.display = 'none';

//entfernt die Fußnote
var bottom = page.getElementsByClassName('footerbottom').item(0);
bottom.style.display = 'none';

var cont = document.getElementById('wrap');
cont.style.width = '996px'; // ändert die Forenbreite

cont.style.backgroundColor = '#F4F7FD'; //Hintergrundfarbe Mitte 

var topics = cont.getElementsByClassName('topiclist forums');

for(i =0; i < topics.length;i++){
topics.item(i).style.backgroundImage = 'none'; 
topics.item(i).style.backgroundColor = '#D9F2BB'; //Hintergrundfarbe der einzelnen Foren
}

var topicRows = document.getElementsByClassName('row');
for(i =0; i < topicRows.length;i++){
topicRows.item(i).getElementsByTagName('a').item(0).style.color = '#323D4F'; //Schriftfarbe der Forenüberschriften
}


//Postdarstellung


//Aufteilung
var postUser = cont.getElementsByClassName('postprofile');
var postBody = cont.getElementsByClassName('postbody');

for(i = 0; i < postUser.length; i++){
postBody.item(i).style.width = ('794px'); //Beitragsbreite
postUser.item(i).style.width = ('190px'); //Userbreite
}

//Hintergrundfarben

//Einstellungen für Posts mit ungerader Nummer 1 3 5 usw
var postP1 = cont.getElementsByClassName('post bg1');

for(i = 0; i < postP1.length;i++){
//Post1 Farben
postP1.item(i).style.backgroundColor = ('#F1F3F1'); //Hintergrundfarbe, altes Forum: #CDCDCD
postP1.item(i).color = ('#4E4E4E'); //Schriftfarbe, altes Forum: #4E4E4E
}

//Einstellungen für Posts mit gerader Nummer  0 2 4 usw
var postP2 = cont.getElementsByClassName('post bg2');

for(i = 0; i < postP2.length;i++){
//Post2 Farben
postP2.item(i).style.backgroundColor = ('#ECECEC'); //Hintergrundfarbe, altes Forum: #DDDDDD
postP2.item(i).color = ('#323D4F'); //Schriftfarbe, altes Forum: #4E4E4E
}

//Hintergrund der Seite
var background = document.getElementById('phpbb');
background.style.backgroundImage = ('none');
background.style.backgroundColor = ('white');

