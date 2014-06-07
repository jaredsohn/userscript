// ==UserScript==
// @name           sport1.de Comments Autopage
// @description    All comments on one page
// @include        http://*sport1.de/*artikel_* 
// @version        01.05.2012_01
// ==/UserScript==


window.addEventListener("load", function(e) {
    
  function log(msg)
  {
  //  GM_log("GM_log: " + msg);
    console.log("Autopage Script: " + msg);
  }
  
  function requestHTML(fileUrl, div) {
  	GM_xmlhttpRequest(
  		{
  			method: 'GET',
  			url: fileUrl,
  			onload: function(resp) {
  				if(resp.status == 200)
  					div.innerHTML = resp.responseText;
  		}
  	});
  }
  
  
  function LetzteSeiteFinden()
  {
    var Zaehler = document.evaluate("count(//a[@href='#comments'])", document, null, XPathResult.ANY_TYPE, null );
  //  log("#Comments-Verweise: " + Zaehler.numberValue);
    //Erst ab Kommentarseiten soll Skript etwas tun: 2 Kommentarseiten = 3 Comment-Links: 1. Seite, 2. Seite und Weiter-Button
    if (Zaehler.numberValue < 3) {
      return 0;
    }
    else
    {
    //Index beginnt bei 0: -1; letzter Comment-Link gehoert zu Weiter-Button (doppelter Verweis): -2
    return Zaehler.numberValue - 2;
    }
  }
  function ArtikelnrFinden()
  {
    document.URL.search(/artikel_([\d]+)/);
    return RegExp.$1;
  }
  
  function main() {
  
    var KommentarNavigationsLeiste = document.getElementById('ARITHNEA_comments_pagination')
    if(KommentarNavigationsLeiste == null)
      {
  //      log("Kommentar-Navigationsleiste nicht gefunden");
        return;
      }
  
    var IndexLetzteSeite = LetzteSeiteFinden()
    if (IndexLetzteSeite < 1)
      {
  //      log("Keine Verweise auf Kommentarseiten")
        return
      }
    Artikelnr = ArtikelnrFinden();
    for (i = 1; i <= IndexLetzteSeite; i++) {
      var url="http://www.sport1.de/dynamic/interactive/data/" + Artikelnr + "/comments_" + i + ".shtml"
      var divPost = document.createElement('div');
      KommentarNavigationsLeiste.parentNode.insertBefore(divPost, KommentarNavigationsLeiste);
  
      requestHTML(url, divPost);
    }
  }

  main();


}, false);
