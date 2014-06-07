// ==UserScript==
// @name           Feuerwache.net Mouseover Menü
// @namespace      http://userscripts.org/users/90337
// @description    aktuelle Bugfixes fuer das Spiel auf www.feuerwache.net
// @include        http://www.feuerwache.net/*
// @version        2012-05-26 17:00
// @author         (Orginal Sawos), Schoschi
// ==/UserScript==

/*
  (Aktuell)
  29.12.2009: Forum-Aufklappmenü
  -> fügt die Links zu den ungelesenen und abonnierten Beiträgen in ein
     Aufklappmenü über "Forum" ein
  05.01.2010: Feuerwache-Aufklappmenü
  -> fügt einen Link zur Gesamt-Personalliste in das Aufklappmenü ein
  07.01.2010: WachenKlein
  -> ersetzt in der Wachen- und Gebäudeübersicht die großen Grafiken
     durch etwas kleinere
  15.03.2010: 
  -> versteckt in Übersicht "Fahrzeuge der Feuerwache..." die Tabelle
     der Unterwegs-Fahrzeuge (Klick auf Überschrift macht sie sichtbar)
  22.04.2011: 
  -> neue Links für Forum hinzugefügt (<b>Anleitung</b>, <b>Erste Schritte</b>, <b>Regeln</b> und <b>Starthilfe für Forumnutzer</b>)
  26.05.2012: 
  -> neue Link für Forum hinzugefügt (<b>Videoanleitung</b>)
*/


var ichBins;
var adr;
document.addEventListener("DOMNodeInserted", nodeInserted, false);
main();
return;

function nodeInserted(e)
{ if (ichBins) return;
  if (e.target.innerHTML == "Leitstellenansicht") 
  { window.setTimeout(main, 10);
    return;
  }
  if (e.target.innerHTML == "Rückmeldungen und Fakten") 
  { window.setTimeout(main, 10);
    return;
  }
  if (e.target.innerHTML == "Einsätze in deiner Stadt") 
  { window.setTimeout(main, 10);
    return;
  }
  //GM_log(e.target.innerHTML + "\n" + e.target.innerText);
}

function main()
{ //GM_log("main");
  adr = document.location.href;
  ichBins=true;
  Forum();
  Personal();
  WachenKlein();
  FahrzeugTabellenTauschen();
  ichBins=false;
  return;
}

function Forum()
{ var D=document.getElementById("navigation_top");
  if (!D) return;
  var UL = D.getElementsByTagName("ul")[0];
  if (!UL) return;
  
  for each (LI in UL.getElementsByTagName("li"))
  { if (LI.parentNode.className == "level1")
    { A = LI.getElementsByTagName("a")[0];
      if (A) 
      { A = trim(A.innerHTML);
        if (A == "Forum")
        { var H1="<li><img class='navigation_arrow' src='/images/SmallArrow.png' /><a target='_self' ";
          var H = H1 + "href='http://www.feuerwache.net/videoanleitung'>Videoanleitung</a></li>\n" +
                  H1 + "href='http://wiki.feuerwache.net/wiki/Hauptseite'>Anleitung</a></li>\n" +
                  H1 + "href='/forum/hauptforum/forenregeln-chatregeln-agb'>Regeln</a></li>\n" +
                  H1 + "href='/forum/hauptforum/starthilfe-fuer-forumnutzer/2'>Starthilfe für Forumnutzer</a></li>\n" +
                  H1 + "href='/forum/neu-hier/meine-starthilfe-fuer-neueinsteiger'>Erste Schritte</a></li>\n" +
                  H1 + "href='/forum/beobachtete'>beobachtete Themen</a></li>\n" +
                  H1 + "href='/forum/ungelesene'>ungelesene Beiträge</a></li>\n" +
                  H1 + "href='/forum_board/markAsRead' onclick='return confirm(\"Alle Foren als gelesen markieren?\");'>alles als gelesen markieren</a></li>\n" +
                  H1 + "href='/posteingang'>Posteingang</a></li>\n";
          var U = document.createElement("UL");
          U.className = "level2";
          U.style.position="absolute";
          U.style.top = "260px";
          U.style.left = "760px";
          U.style.visibility = "hidden";
          U.innerHTML = H;
          LI.insertBefore(U,A.nextSiblin);
        }
      }
    }
  }
}

function Personal()
{ if (document.getElementById("personallink") != undefined) return;
  var D=document.getElementById("navigation_top");
  if (!D) return;
  var UL = D.getElementsByTagName("ul")[0];
  if (!UL) return;
  
  for each (LI in UL.getElementsByTagName("li"))
  { if (LI.parentNode.className == "level2")
    { A = LI.getElementsByTagName("a")[0];
      if (trim(A.innerHTML) == "Werbeaktion")
      { var H = "<img class='navigation_arrow' src='/images/SmallArrow.png' alt='SmallArrow'> ";
        H += "<a id='personallink' target='_self' href='/personal/list'>Personal</a>"
        var L = document.createElement("li");
        L.innerHTML = H;
        LI.parentNode.insertBefore(L,LI);
        return;
      }
    }
  }
}

function WachenKlein()
{ var ret=true;
  if (adr == "http://www.feuerwache.net/feuerwachen") ret=false;
  if (adr == "http://www.feuerwache.net/gebaeude") ret=false;
  if (adr.match("http://www.feuerwache.net/vehicle_to_user/repair/vehicle_to_user_id/[0-9]+")) ret=false;
  if (ret) return;
  var IMGs = document.getElementsByTagName("img");
  for each (IMG in IMGs) IMG.src = IMG.src.replace("/images/map/","/images/map_25/");
}

function FahrzeugTabellenTauschen()
{ if (!adr.match("http://www.feuerwache.net/feuerwachen/[0-9]+/feuerwehrautos")) return;

  var DC = document.getElementById("content");
  if (!DC) return;
  var H2s = DC.getElementsByTagName("h2");
  var TBs = DC.getElementsByTagName("table");
  for (i=0;i<H2s.length;i++)
  { var H2=H2s[i];
    if (H2.innerHTML.match("Fahrzeuge die unterwegs sind"))
    { TBs[i].style.display = "none";
      TBs[i].id="hiddentable";
      H2.innerHTML += " <font size='-2'>(click zum Anzeigen)</font>";
      H2.addEventListener("click", showTableUnterwegs, false);
    }
  }

  function showTableUnterwegs()
  { var T=document.getElementById("hiddentable");
    if (!T) return;
    T.style.display = (T.style.display=="none" ? "" : "none")
  }
}

function trim (S) 
{ return S.replace (/^\s+/, '').replace (/\s+$/, '');
}
