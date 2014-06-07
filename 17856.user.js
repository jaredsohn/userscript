// ==UserScript==
// @name OGame Overview Refresher
// @description Refresh the overview page from OGame with random time.
// @author Hackdeluxe - Adaptation Script For 0.78a With Random Time
// @include *ogame*overview*
// ==/UserScript==

///////////////////////////////////////////////
// Temps a laquel doit se rafraichir la page //
/////////////////// Setup /////////////////////

var TimeMin = 20000; //= 200sec OR 3Min20Sec - Temps minimum
var TimeMax = 90000; //= 980sec OR 16Min20Sec - Temps maximum

////////////////// End Setup //////////////////
///////////////////////////////////////////////


// Calculate time random
time = Math.random()*(TimeMax-TimeMin)+TimeMin;


// Refresher the overview page
//if(parent.document.URL.indexOf('overview.php') != -1) {
    window.setTimeout(
        function()
        {
            var url = window.location.href;
            window.location.replace(url);
        },
        time
    ) ;
//}