// ==UserScript==
//@author	       nofix
// @name           axb forum alternativ
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

//Post
var postUser = cont.getElementsByClassName('postprofile');
var postBody = cont.getElementsByClassName('postbody');

for(i = 0; i < postUser.length; i++){
postBody.item(i).style.width = ('794px'); //Beitragsbreite
postUser.item(i).style.width = ('190px'); //Userbreite
}
