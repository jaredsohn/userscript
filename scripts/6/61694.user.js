// ==UserScript==
// @name        LighthouseBadge
// @namespace   http://fluidapp.com
// @description Adds a badge showing the number of open tickets assigned to you.
// @include     *
// @author      Adam Tucker http://adamjt.net
// ==/UserScript==

// How often to check for new tickets in milliseconds
var updateInterval = 600000;

updateBadge();

function updateBadge () {
    xhttp=new XMLHttpRequest();
    
    // Customize this API call to your needs http://lighthouseapp.com/api
    xhttp.open("GET","/projects/YOUR_PROJECT_ID/tickets.xml?q=responsible:me%20state:open", false, "YOUR_API_KEY:x");
    xhttp.send("");
    xmlDoc=xhttp.responseXML;
    myOpenTickets = xmlDoc.getElementsByTagName("ticket").length;
    if (myOpenTickets == 30) {
        loadNextPage = true;
        pageNumber = 2;
        while (loadNextPage == true) {
            xhttp.open("GET","/projects/YOUR_PROJECT_ID/tickets.xml?q=responsible:me%20state:open&page=" + pageNumber, false, "YOUR_API_KEY:x");
            xhttp.send("");
            xmlDoc=xhttp.responseXML;
            moreTickets = xmlDoc.getElementsByTagName("ticket").length;
            myOpenTickets += moreTickets;
            pageNumber++;
            if (moreTickets < 30) {
                loadNextPage = false;
            }
        }
    }
    window.fluid.dockBadge = myOpenTickets;
    setTimeout(updateBadge, updateInterval);
}
