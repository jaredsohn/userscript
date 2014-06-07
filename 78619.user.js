// ==UserScript==
// @name Fast refresh
// @ not Reload faster than other script
// @author Skeletondevil
// @include *ogame*overview*
// ==/UserScript==

///////////////////////////////////////////////
// Temps a laquel doit se rafraichir la page //
/////////////////// Setup /////////////////////

var TimeMin = 25000; //= 2500sec OR 5Min10Sec - Temps minimum
var TimeMax = 60000; //= 900sec OR 8Min10Sec - Temps maximum

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