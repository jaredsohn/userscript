// ==UserScript==
//@author          nofix&theSacrificed
// @name           axb forum alternativ
// @include        http://forum.areagames.de/*
// ==/UserScript==


// Das Volk spricht!


// FARBEN
var hintergrundHauptseiteMitte = "#E0E6EE";
var schriftfarbeHauptseite = "black";
var hintergrundFarbeMitte = "#F4F7FD";
var hintergrundForen = "#D9F2BB";
var schriftfarbeUeberschriften = "#323D4F";
var schriftfarbeGeleseneUeberschriften = "black";
var threadHintergrundGerade = "#E2E2E2";
var threadHintergrundUngerade = "#ECECEC";
var threadSchriftfarbeGerade = "#323D4F";
var threadSchriftfarbeUngerade = "#4E4E4E";
var hintergrundFarbe = "grey";
var threadFarbe1 = "lightGrey";
var threadFarbe2 = "lightGrey";
var forenFarbe = "lightGrey";

// DESIGN "ja" oder "nein" eintragen. Strichpunkt am Ende nicht vergessen!
var entferneLeiste = "ja";
var entferneFussnote = "ja";
var beitragsBreiteAnpassen = "ja";
var iconsEntfernen = "ja";
var antwortTitelEntfernen = "ja";
var kompakteThreads = "ja";
var forenBreite = "996px"


// Der Rest ist Schweigen...

    var page = document.getElementsByClassName('body').item(0);
    var cont = document.getElementById('wrap');

    cont.style.width = forenBreite; // ändert die Forenbreite


    page.style.backgroundColor = hintergrundHauptseiteMitte; //Hintergrund Hauptseite Mitte
    page.style.color = schriftfarbeHauptseite; // Schriftfarbe Hauptseite
    cont.style.backgroundColor = hintergrundFarbeMitte; //Hintergrundfarbe Mitte

    var topics = cont.getElementsByClassName('topiclist forums');
    for(i =0; i < topics.length;i++)
    {
       topics.item(i).style.backgroundImage = 'none';
       topics.item(i).style.backgroundColor = hintergrundForen; //Hintergrundfarbe der einzelnen Foren
    }

    var topicRows = document.getElementsByClassName('row');
    for(i =0; i < topicRows.length;i++)
    {
       topicRows.item(i).getElementsByTagName('a').item(0).style.color = schriftfarbeUeberschriften; //Schriftfarbe der Forenüberschriften
    }

    var titleRows = document.getElementsByTagName("a");
    for(i =0; i < titleRows.length;i++)
    {
   if (titleRows.item(i).href.indexOf("unread") > 0 )
   {
          titleRows.item(i+1).style.color = schriftfarbeGeleseneUeberschriften; //Schriftfarbe der Forenüberschriften
   }
    }

    //Einstellungen für Posts mit ungerader Nummer 1 3 5 usw
    var postP1 = cont.getElementsByClassName('post bg1');
    for(i = 0; i < postP1.length;i++)
    {
       postP1.item(i).style.backgroundColor = threadHintergrundUngerade; //Hintergrundfarbe, altes Forum: #CDCDCD
       postP1.item(i).color = threadSchriftfarbeUngerade; //Schriftfarbe, altes Forum: #4E4E4E
    }

    //Einstellungen für Posts mit gerader Nummer  0 2 4 usw
    var postP2 = cont.getElementsByClassName('post bg2');
    for(i = 0; i < postP2.length;i++)
    {
       postP2.item(i).style.backgroundColor = threadHintergrundGerade; //Hintergrundfarbe, altes Forum: #DDDDDD
       postP2.item(i).color = threadSchriftfarbeGerade; //Schriftfarbe, altes Forum: #4E4E4E
    }

    //Hintergrund der Seite
    var background = document.getElementById('phpbb');
    background.style.backgroundImage = ('none');
    background.style.backgroundColor = hintergrundFarbe;

// Farben zuweisen
    var threadRows = cont.getElementsByClassName("row bg1");
    for (i = 0; i < threadRows.length; i++)
    {
       threadRows.item(i).style.backgroundColor = threadFarbe2;
    }

    threadRows = cont.getElementsByClassName("row bg2");
    for (i = 0; i < threadRows.length; i++)
    {
       threadRows.item(i).style.backgroundColor = threadFarbe1;
    }

    threadRows = cont.getElementsByClassName("row");
    for (i = 0; i < threadRows.length; i++)
    {
       threadRows.item(i).style.backgroundColor = forenFarbe;
    }


    //entfernt die Linke Leiste
if (entferneLeiste == "ja")
{
    var left = page.getElementsByClassName('leftside').item(0);
    left.style.display = 'none';
}

    //entfernt die Fußnote
if (entferneFussnote == "ja")
{
    var bottom = page.getElementsByClassName('footerbottom').item(0);
    bottom.style.display = 'none';
}


if (beitragsBreiteAnpassen == "ja")
{
    var postUser = cont.getElementsByClassName('postprofile');
    var postBody = cont.getElementsByClassName('postbody');

    for(i = 0; i < postUser.length; i++)
    {
        postBody.item(i).style.width = ('794px'); //Beitragsbreite
        postUser.item(i).style.width = ('190px'); //Userbreite
    }
}

if (iconsEntfernen == "ja")
{
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
}


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