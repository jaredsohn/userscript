// ==UserScript==
// @name           Automatisch Einkaufswagen ausleeren Pennergame Malle by abwasch
// @author         Boggler @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @namespace      Boggler @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @include        http://*game.de/*
// @license	   Creative Commons by-nc-sa
// @version        1.1
// ==/UserScript==


// Dieses Script ist Creative commons by-nc-sa lizensiert
// Dieses Script ist Copyright by Boggler & syme @ Pennerhack ( visit: http://pennerhack.de.tc/ )


function ausleeren(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://malle.pennergame.de/activities/bottle/',
      onload: function(responseDetails) {
         if (responseDetails.responseText.search(/Einkaufswagen ausleeren/) != -1){
            GM_xmlhttpRequest({
               method: 'POST',
               url: 'http://malle.pennergame.de/activities/bottle/',
               headers:  {'Content-type': 'application/x-www-form-urlencoded'},
               data: encodeURI('bottlecollect_pending=True&Submit2=Einkaufswagen ausleeren'),
               onload: function(){
                  }
            });   
         }
      }
   });
} 

    setInterval(function() {
   ausleeren();
    }, 30000);