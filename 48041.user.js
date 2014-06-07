// ==UserScript==
// @name Otomatik sayfa yenileme
// @ Ogamealarm ile kurarsanız tam verim alırsınız.
// @author Skeletondevil
// @include *ogame*overview*
// ==/UserScript==

///////////////////////////////////////////////
// Temps a laquel doit se rafraichir la page //
/////////////////// Setup /////////////////////

var TimeMin = 50000; //= 3000sec OR 10Min20Sec - Temps minimum
var TimeMax = 120000; //= 1800sec OR 16Min20Sec - Temps maximum

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