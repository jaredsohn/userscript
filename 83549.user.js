// ==UserScript==
// @name           Feuerwache.net Bugfixes
// @namespace      http://userscripts.org/users/83550
// @description    aktuelle Bugfixes fuer das Spiel auf www.feuerwache.net
// @include        http://www.feuerwache.net/*
// @version        2010-12-13 21:01
// @author         Besserwieschumi
// ==/UserScript==

/*
  (Aktuell)
  13.12.2010: Andere-Stadt-Bugfix
  -> korrigiert in Einsatzliste die Position der Verbandseinsätze auf
     "Andere Stadt - X - Y" bei Stadterweiterung
  29.12.2009: Forum-Aufklappmenü
  -> fügt die Links zu den ungelesenen und abonnierten Beiträgen in ein
     Aufklappmenü über "Forum" ein
  20.12.2009: Andere-Stadt-Bugfix
  -> korrigiert in Einsatzliste die Position der Verbandseinsätze auf
     "Andere Stadt - X - Y"
  05.01.2009: Feuerwache-Aufklappmenü
  -> fügt einen Link zur Gesamt-Personalliste in das Aufklappmenü ein
  07.01.2009: WachenKlein
  -> ersetzt in der Wachen- und Gebäudeübersicht die großen Grafiken
     durch etwas kleinere
  
*/


var ichBins;
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
  ichBins=true;
  Forum();
  Personal();
  AndereStadt();
  WachenKlein();
  ichBins=false;
  return;
}

function WachenKlein()
{ if (document.location.href != "http://www.feuerwache.net/feuerwachen" && document.location.href != "http://www.feuerwache.net/gebaeude") return;
  var IMGs = document.getElementsByTagName("img");
  for each (IMG in IMGs) IMG.src = IMG.src.replace("/images/map/","/images/map_25/");
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
          var H = H1 + "href='/forum'>Forum</a></li>\n" +
                  H1 + "href='/forum/beobachtete'>beobachtete Themen</a></li>\n" +
                  H1 + "href='/forum/ungelesene'>ungelesene Beiträge</a></li>\n" +
                  H1 + "href='/forum_board/markAsRead' onclick='return confirm(\"Alle Foren als gelesen markieren?\");'>alles als gelesen markieren</a></li>\n";
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

function AndereStadt()
{ if (document.location.href.match("http://www.feuerwache.net/feuerwehr-einsaetze"))
  { var Links = document.getElementsByTagName("a");
    for each (Link in Links)
    { if (Link)
      { if (Link.href.match("http://www.feuerwache.net/startseite/"))
        { var Teile = Link.href.split("/");
          var X = parseInt(Teile[Teile.length-2]);
          var Y = parseInt(Teile[Teile.length-1]);
          if (X<0 || Y<0 || X>100 || Y>200)
          { Link.parentNode.innerHTML = "Andere Stadt - " + X + " - " + Y;
          }
        }
      }
    }
  }
}

function trim (S) 
{ return S.replace (/^\s+/, '').replace (/\s+$/, '');
}
