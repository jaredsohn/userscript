// ==UserScript==
// @name           MonsterWorld Link klicker -Lesezeichen-
// @description    Automatisiert das Öffnen von MonsterWorld Links auf Facebook
// @version        0.5.2
// @copyright      2011+, by Anaximelis
// ==/UserScript==


// Dieses Javascript ist nicht für Greasemonkey gedacht
// 
// Nur als LESEZEICHEN verwenden!
// Getestet unter Firefox 6.0 und Chrom 13.0.782.220 m
/* 

//Kopiere den Code unter dieser Zeile in das Lesezeichen 

javascript:
var newWindow;
var BounceCounter=0;  
var DuplicatesKilld=0;
var LinksToOpen=0;
var MonsterLinks=new Array();
var LinksToOpenDelay=0;
var ValidMonsterLinks=0;
var version="v0.5.2";

body=document.body;
if(body!=null) {
    myframe = document.createElement("div");
    myframe.style.position = "fixed";
    myframe.style.bottom = "+40px";
    myframe.style.left = "+15px";
    myframe.style.border = "1px solid #94a3c4";
    myframe.style.padding = "6px";   
    body.appendChild(myframe);
    var infobox = document.createElement("h");
    myframe.appendChild(infobox);
    infobox.style.fontWeight = "bold";
    myframe.style.textAlign = "center";
};


scanDocument();
showPrompt();
makeNewWindow('');
bouncer();

function makeNewWindow(url) {
newWindow = window.open(url,'','width=770,height=510');
}; 

  
function showPrompt() {
  LinksToOpen=prompt("Schon bei Facebook eingeloggt ?\n\nMonsterWorld Links gefunden: "+SumMonsterLinks+" ("+DuplicatesKilld+" Duplikate ignoriert)\n\nWieviele Links öffnen? ",ValidMonsterLinks);	
  LinksToOpenDelay=prompt("Zeit zwischen dem öffnen der Links (Sekunden)?","5");
    if((LinksToOpen==null)||(LinksToOpenDelay==null)||(isNaN(Number(LinksToOpen)))||(isNaN(Number(LinksToOpenDelay)))){	
      alert("Fehleingabe! Abbruch.");
      LinksToOpen=0;
      return;
    }
    if(LinksToOpen>ValidMonsterLinks) {
      LinksToOpen=ValidMonsterLinks;
      }
    if(LinksToOpen!=ValidMonsterLinks) {
      MonsterLinks.splice(0,MonsterLinks.length);
      scanDocument(LinksToOpen);
    } 
};

function scanDocument(countuntil) {
    var countuntil;
    SumMonsterLinks=0;
    Elements=document.getElementsByTagName('a');
    SumLinks=Elements.length;
    	for(i=0;i<SumLinks&&countuntil!=MonsterLinks.length;i++) {
        LinkTxt=Elements[i].href;
        if((LinkTxt.substr(0,"http://apps.facebook.com/monster-world/?st".length)=="http://apps.facebook.com/monster-world/?st") || (LinkTxt.substr(0,"http://apps.facebook.com/monster-world/?from=feed".length)=="http://apps.facebook.com/monster-world/?from=feed")||(LinkTxt.substr(0,"https://apps.facebook.com/monster-world/?st".length)=="https://apps.facebook.com/monster-world/?st") || (LinkTxt.substr(0,"https://apps.facebook.com/monster-world/?from=feed".length)=="https://apps.facebook.com/monster-world/?from=feed"))
          {
          LinkTxt = LinkTxt.replace(/https/ig,"http");
          MonsterLinks[MonsterLinks.length]=LinkTxt;
          if(MonsterLinks.length>1) {
             findDuplicate(MonsterLinks);
          }
          SumMonsterLinks++; 
        }
      }              
    ValidMonsterLinks=MonsterLinks.length;   
};
        
function bouncer() {
  if((BounceCounter<LinksToOpen)&&(BounceCounter!=MonsterLinks.length)) {    
    openUrl();
    BounceCounter++;
    }
    else
    {
    newWindow.close();
    }
    var donate = '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=deos%40gmx%2ede&lc=DE&item_name=Anaximelis&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest">Spenden</a><br>';
    var email = '<a href="mailto:linkklicker@seyfarth-net.de">Email schreiben</a><br><hr/>';
    infobox.innerHTML = BounceCounter+" / "+LinksToOpen+" Fertig . . .<br><hr/><big>Monster World<br>Link klicker</big><br><small>"+version+"<br>by Anaximelis</small><br><br><br>"+email+donate;
};
            
function openUrl() {
    if(newWindow.closed==false) {
      newWindow.close();
      }
    makeNewWindow(MonsterLinks[BounceCounter]); 
    newWindow.document.addEventListener('load', myTimer(), false);
};

function myTimer() {
    window.setTimeout(bouncer,LinksToOpenDelay*1000);
};

function findDuplicate(thisarray) {
  thisarray.sort();
  for (u=1;u<=(thisarray.length-1);u++) {
    if(thisarray[u]==thisarray[u-1]) {
      thisarray.splice(u,1);
      DuplicatesKilld++;           
      }
  }
};