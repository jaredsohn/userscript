// ==UserScript==
//@author	       nofix & theSacrificed & pil
// @name           axb forum alternativ
// @include        http://forum.areagames.de/*
// ==/UserScript==

var titleRows = document.getElementsByTagName("a");
for(i =0; i < titleRows.length;i++)
{
   if (titleRows.item(i).href.indexOf("unread") > 0 )
   {
       titleRows.item(i+1).style.color = "#4F360A";
   }
}


var page = document.getElementsByClassName('body').item(0);

page.style.backgroundColor = ('#fffeef'); //Hintergrund Hauptseite Mitte
page.style.color = ('black'); // Schriftfarbe Hauptseite


//entfernt die Linke Leiste
var left = page.getElementsByClassName('leftside').item(0);
left.style.display = 'none';

//entfernt die Fußnote
var bottom = page.getElementsByClassName('footerbottom').item(0);
bottom.style.display = 'none';

var cont = document.getElementById('wrap');
cont.style.width = '996px'; // ändert die Forenbreite

cont.style.backgroundColor = '#fffeef'; //Hintergrundfarbe Mitte 

var topics = cont.getElementsByClassName('topiclist forums');



var topicRows = document.getElementsByClassName('row');
for(i =0; i < topicRows.length;i++){
topicRows.item(i).getElementsByTagName('a').item(0).style.color = '#000000'; //Schriftfarbe der Forenüberschriften
}

//Post
var postUser = cont.getElementsByClassName('postprofile');
var postBody = cont.getElementsByClassName('postbody');

for(i = 0; i < postUser.length; i++){
postBody.item(i).style.width = ('794px'); //Beitragsbreite
postUser.item(i).style.width = ('190px'); //Userbreite
}

//Hintergrundfarben

//Einstellungen f?r Posts mit ungerader Nummer 1 3 5 usw
var postP1 = cont.getElementsByClassName('post bg1');

for(i = 0; i < postP1.length;i++){
//Post1 Farben
postP1.item(i).style.backgroundColor = ('#E3E1E2'); //Hintergrundfarbe, altes Forum: #CDCDCD
postP1.item(i).color = ('#4E4E4E'); //Schriftfarbe, altes Forum: #4E4E4E
}

//Einstellungen f?r Posts mit gerader Nummer  0 2 4 usw
var postP2 = cont.getElementsByClassName('post bg2');

for(i = 0; i < postP2.length;i++){
//Post2 Farben
postP2.item(i).style.backgroundColor = ('#F0EEEE'); //Hintergrundfarbe, altes Forum: #DDDDDD
postP2.item(i).color = ('#323D4F'); //Schriftfarbe, altes Forum: #4E4E4E
}
//Post
var postUser = cont.getElementsByClassName('postprofile');
var postBody = cont.getElementsByClassName('postbody');

for(i = 0; i < postUser.length; i++){
postBody.item(i).style.width = ('820px'); //Beitragsbreite
postUser.item(i).style.width = ('140px'); //Userbreite
}

//Hintergrund der Seite
var background = document.getElementById('phpbb');
background.style.backgroundImage = ('none');
background.style.backgroundColor = ('#000000');

var icon = cont.getElementsByClassName('icon');
for(i =0; i < icon.length;i++)
{
   if (icon.item(i).style.backgroundImage.indexOf('unread') <= 0)
      icon.item(i).style.backgroundImage = "";
}

// Hintergrundfarbe fuer Threads und Foren
var threadFarbe1 = "#E1E1E1";
var threadFarbe2 = "#E1E1E1";
var forenFarbe = "#E1E1E1";

// Farben zuweisen
var threadRows = cont.getElementsByClassName("row bg1");
for (i = 0; i < threadRows.length; i++)
{
   threadRows.item(i).style.backgroundColor = threadFarbe2;
}

threadRows = cont.getElementsByClassName("row bg2");

var kompakteThreads = "ja";
if (kompakteThreads == "ja")
{
    for (var s = 0; s < document.styleSheets.length; s++)
    {
       if(document.styleSheets[s].cssRules)
       {
          for (var r = 0; r < document.styleSheets[s].cssRules.length; r++)
          {
             if (document.styleSheets[s].cssRules[r].selectorText.indexOf("topiclist") >= 0)
             {
                if (document.styleSheets[s].cssRules[r].selectorText.indexOf("#phpbb ul.topiclist dt") < 0)document.styleSheets[s].cssRules[r].style.padding = "0px 0";
             }
          }
       }
    }
}

var antwortTitelEntfernen = "ja";
if (antwortTitelEntfernen == "ja")
{
    if (document.URL.indexOf("viewtopic.php") > 0)
    {
       var reStrings = document.getElementsByTagName("h3");
       for(i =0; i < reStrings.length;i++)
       {
            reStrings.item(i).style.display = "none";
       }
    }
}


var icon = cont.getElementsByClassName('icon');
for(i =0; i < icon.length;i++)
{
    if (icon.item(i).style.backgroundImage.indexOf('unread') <= 0)
		icon.item(i).style.backgroundImage = "";
}

var otherIcons = document.getElementsByTagName("dt")
for(i =0; i < otherIcons.length;i++)
{
    if (otherIcons.item(i).style.backgroundImage.indexOf('smile') > 0)
    otherIcons.item(i).style.backgroundImage = "";
}
