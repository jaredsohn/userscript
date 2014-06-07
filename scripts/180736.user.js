// ==UserScript==
// @name	SteamGifts Winchance
// @namespace	Amtho
// @description	Shows your winchance.
// @copyright	Amtho
// @icon        http://www.steamgifts.com/favicon.ico
// @include	*://www.steamgifts.com/open/page/*
// @include	*://www.steamgifts.com/
// @version	1.0.0
// !LastEdited	10-26-2013
// ==/UserScript==
function myRound(zahl,n){
    var faktor;
    faktor = Math.pow(10,n);
    return(Math.round(zahl * faktor) / faktor);
}

function findWinchance()
{
    var title = document.body.getElementsByClassName("title");
    var entries = document.body.getElementsByClassName("entries");
        for(var i=0; i<title.length; i++)
        {
                var text1 = title[i].innerHTML.replace(/<[^>]*>/g, "");
                var klammerauf = text1.indexOf('(')+1;
                var klammerzu = text1.indexOf(')')-7;
                var anzahlspiele = text1.substring(klammerauf, klammerzu);
                if (anzahlspiele.search(/[0-9]/) == -1){
                var anzahlspiele = 1 ;
                }
                
                var text = entries[i+1].innerHTML.replace(/<[^>]*>/g, "");
                var leer = text.indexOf(' ');
                var zahl = text.substring(0,leer);
                var zahl = zahl.replace(/,/, "");
                var zahl = (1/zahl)*100*anzahlspiele;
                var zahl = myRound (zahl,3);
                var zahl = " " + zahl + " %";
                
                title[i].appendChild(document.createTextNode(zahl)); 
        }
}
findWinchance();