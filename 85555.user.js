// ==UserScript==
// @name           Automatisch Einkaufswagen entleeren PG Hamburg by BlackStyLe | xblack213*
// @author         xblack213*
// @namespace      xblack213*
// @include        http://*game.de/*
// @license	   Polen und Neger Crew XD
// @version        1.1
// ==/UserScript==


// Dieses Script ist Eigentum von BlackStyLe und >TriplexXx< 
// Dieses Script ist Copyright geschützt by xblack213*


function ausleeren(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/activities/bottle/',
      onload: function(responseDetails) {
         if (responseDetails.responseText.search(/Einkaufswagen ausleeren/) != -1){
            GM_xmlhttpRequest({
               method: 'POST',
               url: 'http://www.pennergame.de/activities/bottle/',
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