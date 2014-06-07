// ==UserScript==
// @name           Verkaufszeit-Script 1.0 für Firefox
// @author         toasten
// @namespace      http://www.morgil.de
// @description    Dieses Script ist eine Erweiterung für das Browsergame kapiland.de. Es lässt alle Zeiten (nicht nur im Verkauf) herunterzählen, bis diese auf 0 sind. (von toasten, mit Erlaubnis angepasst von Morgil)
// @include        http://*kapiland*main.php4?page=gebs&*
// @include        http://*kapiland*main.php4?page=forschs&*
// @include        http://*kapiland*main.php4?page=kaufs&*
// @include        http://*kapiland*main.php4?page=sonst&*
// ==/UserScript==

function set_show() {
GM_setValue("endzeit", window.confirm("Soll die Endzeit einer Produktion auch anzegeigt werden?"));
}
GM_registerMenuCommand("Kapiland: Endzeit der Produktion anzeigen?", set_show);
if(GM_getValue("endzeit", "leer") == "leer") {
set_show();
}

var sekunden = new Array();
var elems = new Array();

function init()
{

  var elemente = document.getElementsByTagName("a");

  var wert = "";

  for (var i=0; i < elemente.length; ++i)
  {
   wert = elemente[i].innerHTML;
   var splitted = new Array();
   splitted = wert.split(":");
   if(splitted.length == 3)
   {
     if( !isNaN(splitted[0]) && !isNaN(splitted[1]) && !isNaN(splitted[2]))
     {
        sekunden = sekunden.concat(new Array(""+(splitted[0]*3600+splitted[1]*60+splitted[2]*1)));
        elems = elems.concat(new Array(""+i));
     }
   }
  }

  timer();
}



function timer()
{
  var elemente = document.getElementsByTagName("a");
  for(var i=0; i<elems.length; i++)
  {
      if( sekunden[i] < 0 )
      {
        elemente[elems[i]].innerHTML="Fertig";
      }
      else
      {
        var sek = sekunden[i];
        var stunden = Math.floor(sek/3600);
        sek = sek - stunden*3600;
        var minuten = Math.floor(sek/60);
        if(minuten<10){minuten="0"+minuten;}
        sek = sek - minuten*60;
        if(sek<10){sek="0"+sek;}
        if(GM_getValue("endzeit") == false) {
          elemente[elems[i]].innerHTML=stunden+":"+minuten+":"+sek;
        }
        else {
          var jetzt = new Date();
          var estunde = (jetzt.getHours()+stunden)%24;
          if(jetzt.getMinutes()+minuten>60) estunde++;
          if (estunde<10){estunde="0"+estunde;}
          var eminuten = (jetzt.getMinutes()+minuten*1)%60;
          if (eminuten<10){eminuten="0"+eminuten;}
            elemente[elems[i]].innerHTML=stunden+":"+minuten+":"+sek+"<br>"+estunde+":"+eminuten+"&nbsp;Uhr";
        }
        sekunden[i] = sekunden[i]-1;
      }
  }

  window.setTimeout(timer, 1000);

}
init();
