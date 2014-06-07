// ==UserScript==
// @name           TribalWars FarmerOK
// @namespace      TW
// @include        http://nl*.tribalwars.nl/game.php?village*try=confirm
// ==/UserScript==


// WAIT 1 sec + RANDOM up to 3 sec to avoid bot detection
/* als je rest tussen /* en * / zet, dan moet je alleen nog op aanvallen klikken */

window.setTimeout(function() { 
    getdoc = window.document;
    if(! getdoc.URL.match('game\.php'))
    {
      for(var i=0; i<window.frames.length; i++)
      {if(window.frames[i].document.URL.match('game\.php'))

        {getdoc = window.frames[i].document;
        }
      }
    }

    getdoc.getElementsByName('submit')[0].form.select;
    getdoc.getElementsByName('submit')[0].form.submit();
}, 
2000+Math.random()*1000);
