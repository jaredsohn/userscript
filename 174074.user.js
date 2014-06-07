// ==UserScript==
// @name        BloodWars koloryzator
// @namespace      Bloodwars
// @include        http://r3.bloodwars.interia.pl/?a=msg&color
// @include        http://r11.bloodwars.interia.pl/?a=msg&color
// @include        http://r12.bloodwars.interia.pl/?a=msg&color
// ==/UserScript==


(function()
{
var STATUS_AVAILBLE = 1;
var STATUS_BUSSY = 2;
var STATUS_VACATION = 3;

var AVAILBLE_IN_MINUTES = "";
 
function sleep(milliseconds) {
 var start = new Date().getTime();
 for (var i = 0; i < 1e7; i++) {
   if ((new Date().getTime() - start) > milliseconds){
     break;
   }
 }
}    
   function getStatus(mesg) {
       console.log(mesg);
       var str = new XMLHttpRequest();
       str.open("GET", mesg, false);
       str.send(null);
         
       var wiadom = str.responseText;
       var prof = wiadom.substr( wiadom.indexOf("na <a class=\"clanSecOwner\" href=\""), 64);
//        console.log(prof);
       prof = prof.substr(prof.indexOf("uid=") );
//        console.log(prof);
       prof = prof.substr(0, prof.indexOf("\"") );
//        console.log(prof);
var uid = prof;

       sleep(700);

       var str = new XMLHttpRequest();
//        console.log(globalURL+"/?a=profile&"+uid);
       str.open("GET", globalURL+"/?a=profile&"+uid, false);
       str.send(null);
sleep(1000);
     
       var wiadom = str.responseText;
       if ( wiadom.indexOf("URLOP") != -1 ) return STATUS_VACATION;  
       if ( wiadom.indexOf("ZABLOK") != -1 ) return STATUS_VACATION;  
var prof = wiadom.substr( wiadom.indexOf("NAPADNIJ"), 64);
       if ( prof.indexOf("disabled") == -1 )
{
   var szpieguj = wiadom.indexOf("SZPIEGUJ");
//	    console.log("szpieguj="+szpieguj);
   prof = wiadom.substr( szpieguj+47, wiadom.indexOf('"',szpieguj+47)-szpieguj-47);
//	    console.log(prof);

   prof = prof.replace(/&amp;/g,"&");
//	    var newloc = window.location.href.replace("?a=msg",prof);
//	    console.log("newloc="+newloc);
//	    window.location.href = newloc;
   
   return STATUS_AVAILBLE;
}
else {
   AVAILBLE_IN_MINUTES = prof.substr( prof.indexOf( "(" ), prof.indexOf(")") - prof.indexOf("(") + 1 );
   return STATUS_BUSSY;
}
   }



////////////////////MAIN//////////////////
 
 
 
   var trki, thisTr;
   var count = 0;
   var limit = 5;

   trki = document.evaluate(
       "//a[@class='msg-link']",
       document,
       null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
       null);

   if (trki.snapshotLength > 0) {
       var t=trki.snapshotItem(i).href;
//        console.log(t);
       globalURL = t.substr(0,t.indexOf("?a=msg"));
//        console.log("globalURL="+globalURL);
   }    

   var liczbaDostepnychPozniej=0;
   for (var i = trki.snapshotLength -1; i >= 0; i--) {
     AVAILBLE_IN_MINUTES = '';
//        console.log(i);
       var stat=0;
       thisTr = trki.snapshotItem(i);
       if ( thisTr.childNodes[0].src.indexOf("msg3.gif") != -1 ) {
 console.log(thisTr.innerHTML);
           if ( thisTr.innerHTML.indexOf("Urz") != -1 ) {
var line = document.body.innerHTML.substr( document.body.innerHTML.indexOf(thisTr.innerHTML), 300);
   console.log(line);
var data = line.substr(line.indexOf('center">20')+8,10);
var d = new Date(data);
var now = new Date();
if ( d.getDate() != now.getDate() )
stat = getStatus(thisTr.href);
else
   thisTr.style.color = "brown";
               if ( stat % 10 == STATUS_AVAILBLE ) { 
                   thisTr.style.color = "green";
                   /*if ( thisTr.style.color == "green" && ++count >= limit ) return;*/
               }
else if ( stat % 10 == STATUS_BUSSY ) {
     thisTr.childNodes[1].nodeValue += AVAILBLE_IN_MINUTES;
     liczbaDostepnychPozniej++;
} else if ( stat % 10 == STATUS_VACATION ) 
     thisTr.style.color = "grey";

           }
       }
//          console.log("chid "+thisTr.innerHTML);
         

//         alert(thisTr);
   }
   console.log("Liczba dostepnych pozniej="+liczbaDostepnychPozniej);
   if (liczbaDostepnychPozniej>0)
   {
     console.log("Sleeping...");
//      window.setTimeout("window.location = window.location;",60*1000);
   }
 
}) ();