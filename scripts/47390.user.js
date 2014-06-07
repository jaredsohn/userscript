// ==UserScript==
// @name        Ikariam Notify
// @namespace   http://fluidapp.com
// @description Notifies you vie a dock badge when one of your advisors has something to say.  For Fluid users.
// @include     http://*.ikariam.*/*
// @author      Kahil Young
// ==/UserScript==


(function () {
    updateBadge();
    window.setInterval(updateBadge, 3000);
})();

function updateBadge() {
    if (['advCities', 'advMilitary', 'advResearch', 'advDiplomacy'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    if (document.evaluate('.//a[@class="normalalert"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) {        
                window.fluid.dockBadge = "!";
    }
}