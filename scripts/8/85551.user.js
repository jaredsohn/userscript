// ==UserScript==
// @name           Automatisch Einkaufswagen entleeren PG München
// @author         xblack213*
// @namespace      xblack213*
// @include        http://*game.de/*
// @license	   Polen und Neger Crew o.O
// @version        1.1
// ==/UserScript==


// Dieses Script ist Copyright by BlackStyLe | xblack213*

function ausleeren(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://muenchen.pennergame.de/activities/bottle/',
      onload: function(responseDetails) {
         if (responseDetails.responseText.search(/Einkaufswagen ausleeren/) != -1){
            GM_xmlhttpRequest({
               method: 'POST',
               url: 'http://muenchen.pennergame.de/activities/bottle/',
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