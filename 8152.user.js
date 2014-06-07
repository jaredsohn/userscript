// ==UserScript==
// @name          NZBIndex 
// @description	  Download films en muziek meteen vanaf de Ftn2day site - (C) 2007 Marcel V. Na installatie van dit script is er een subtiel linkje "DOWNLOAD" bijgekomen op de site.
// @include       http://www.ftn2day.nl/*
// ==/UserScript==

// Dit moet ik hier in een array-tje dumpen want XMLHttpRequest mag van Firefox niet naar een ander domein gaan.

var aNewsGroups = new Array( 
 1, "a.b.boneless", 
 12, "a.b.comp",
 13, "a.b.cores" ,
 18, "a.b.dvd",
 22,"a.b.dvd.image",
 23,"a.b.dvd.movies",
 24,"a.b.dvd.music",
 28,"a.b.e-book",
 29,"a.b.e-book.technical",
 35,"a.b.fta",
 36,"a.b.ftd",
 37,"a.b.ftn",
 38,"a.b.ftn.nzb",
 39,"a.b.games",
 43,"a.b.games.kidstuff.nl",
 46,"a.b.games.xbox",
 47,"a.b.hdtv",
 49,"a.b.images",
 59,"a.b.misc",
 62,"a.b.movies",
 63,"a.b.movies.divx",
 64,"a.b.movies.divx.repost",
 65,"a.b.movies.kidstuff",
 67,"a.b.mp3",
 72,"a.b.multimedia",
 81,"a.b.multimedia.comedy",
 83,"a.b.multimedia.disney",
 93,"a.b.music",
 94,"a.b.music.classical",
 97,"a.b.mutlimedia",
 99,"a.b.newzbin",
 102,"a.b.nl",
 112,"a.b.sound.mp3",
 113,"a.b.sounds",
 187,"a.b.warez",
 208,"a.b.x",
 223,"a.b.sound.mp3.complete_cd",
 230,"a.b.erotica",
 254,"a.b.ibm-pc",
 256,"a.b.music.mp3",
 263,"a.b.multimedia.erotica",
 265,"a.b.games.kidstuff",
 324,"a.b.monster-movies",
 341,"a.b.ijsklontje",
 348,"a.b.erotica.divx",
 352,"a.b.movies.xvid" 
 );  

function newsGroup() {
 // Retourneer de nieuwsgroep van de post. 
 var n = document.body.innerHTML.indexOf('<strong>Newsgroup:');
 if(n>=1) {
  var nFirst = document.body.innerHTML.indexOf("<td>",n);
  if(nFirst>=1) {
   var nLast = document.body.innerHTML.indexOf("</td>",nFirst+4);
   if(nLast>nFirst) {
    var sNewsGroup = document.body.innerHTML.substring(nFirst+4,nLast).toUpperCase();
    for(i=0; i<aNewsGroups.length-1; i+=2) {
     if(aNewsGroups[i+1].toUpperCase() == sNewsGroup)
      return aNewsGroups[i]; // Return de numerieke code
    }    
   }
  }  
 }
 return -1;
}



 var n = document.body.innerHTML.indexOf('<strong>Filename:'); 
 if(n>=1) { 
  var nFirst = document.body.innerHTML.indexOf("<td><b>",n);
  if(nFirst>=1) {
   var nLast = document.body.innerHTML.indexOf("</b>",nFirst+7);
   if(nLast>nFirst) {
    var sFileName = document.body.innerHTML.substring(nFirst+7,nLast);
    //DEBUG alert("."+sFileName+".");
    var sZoek=escape(sFileName);
    
    var nNewsGroupCode = newsGroup();
    //DEBU alert(nNewsGroupCode);
    
    var sInjection;    
    var sURL;
    if(nNewsGroupCode>=0)  {
     sURL = "http://www.nzbindex.nl/?go=search&searchitem="+sZoek+"&x=31&y=19&age=&results=25&group="+nNewsGroupCode+"&sort=age_desc&min_size=&max_size=&poster=&groupcrossposts=1&new=1&showmoreinfo=1";
     sInjection = "<BR><a href='"+sURL+"'>Zoek NZB</a>";
    }
    else { // Nieuwsgroep niet gevonden, doorzoek alle nieuwsgroepen          
     sURL ="http://www.nzbindex.nl/?go=search&searchitem="+sZoek+"&x=11&y=12&age=&results=25&group=&sort=age_desc&min_size=&max_size=&poster=&new=1&showmoreinfo=";
     sInjection ="<BR><a href='"+sURL+"'>Zoek NZB</a>";
    }        
    
    var nLastTD = document.body.innerHTML.indexOf("</td>",nLast+1);
    if(nLastTD>nLast) {
     document.body.innerHTML = document.body.innerHTML.substring(0,nLastTD)
      + "<div id='BikkelsDownloadLink'>"+sInjection+"</div>" // Een callback functie vult hier eventueel iets anders in.      
      + document.body.innerHTML.substring(nLastTD+5);            
    }    
        
   GM_xmlhttpRequest({
    method: 'GET',
    url: sURL,    
    onload: onLoadCallBack});
   }
  }  
 }
 
 
 function onLoadCallBack(responseDetails) {
  // Kijk of er preceis 1 NZB is, zo ja: plaats een directe link hiernaartoe.
  var s = responseDetails.responseText;
  if(s.indexOf("type=\"checkbox\" id=\"box1\"")>5) {
   // Er is meer dan 1 NZB. Jammer
   document.getElementById("BikkelsDownloadLink").innerHTML = 
     document.getElementById("BikkelsDownloadLink").innerHTML +"&nbsp;(NZB's gevonden)";
  }
  else {
   var nFirst = s.indexOf("type=\"checkbox\" id=\"box0\"");
   if(nFirst>5) {
    // Maak een URL om meteen de NZB te downloaden.
    nFirst = s.indexOf("<a href=\"",nFirst+15);
    if(nFirst>15) {
     nLast = s.indexOf("class=\"nzb\"",nFirst+5);
     if(nLast>nFirst) {
      // Kijk eerst of de post compleet is
      var sExtraText="";
      if(s.indexOf("class=\"incomplete\"")>20) {
       sExtraText="&nbsp;(Niet compleet)";
      }                   
           
      sURL = "http://www.nzbindex.nl"+s.substring(nFirst+"<a href=\"".length,nLast-1);
      document.getElementById("BikkelsDownloadLink").innerHTML =      
       document.getElementById("BikkelsDownloadLink").innerHTML + "&nbsp;|&nbsp;<a href='"+sURL+"'>DOWNLOAD NZB!</a> "+sExtraText;             
     }
    } 
   }
   else {
    // Er is helemaal niets gevonden!
    document.getElementById("BikkelsDownloadLink").innerHTML = 
     document.getElementById("BikkelsDownloadLink").innerHTML +"&nbsp;(Geen NZB gevonden)";
    //"<a href="+sURL+">DOWNLOAD NZB (NZBIndex)</a>";
   }  
  }
 }
 /*
 
 function onerrorCallback(responseDetails) {
 }
 
 function onreadystatechangeCallback(responseDetails) {
  //alert(response.DetailsresponseText);
 }
 
 
*/