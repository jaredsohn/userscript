// ==UserScript==
// @name        Count number of BayAreaBikeShare trips
// @author      Mark Cervarich
// @namespace   http://markcerv.com
// @description On the Bay Area Bike Share trips page, count the number of trips taken.
// @include     https://bayareabikeshare.com/account/trips
// @match       https://bayareabikeshare.com/account/trips
// @version     2014-02-19-v04
// @copyright	2014+, Mark Cervarich
// @run-at      document-end
// @grant       none
// ==/UserScript==



// User editable variables
//
var COUNT_DOWN_SHOW = true;      // can be true or false
var COUNT_DOWN_SIDE = "left";    // can be "left" or "right"

var COUNT_UP_SHOW   = true;      // can be true or false
var COUNT_UP_SIDE = "right";     // can be "left" or "right"



// -- Please do not modify anything below here --
//

var numTripsTaken = 0;

function createNumTripsLi() {

    $('nav#member ul li:last').after("<li id='NumTrips'><span>...</span></li>");
    $('#NumTrips').css({"padding": "8px", "background-color": "#82C9BD",  "color": "white"});
}


function calculateNumTripsTaken() {
    var numTrips = 0;
    numTrips = $('section#content table >tbody >tr').length;
    return(numTrips)
    
}

function displayNumTripsTaken(numTrips) {
    $('#NumTrips span').replaceWith("<span># Trips Taken: <strong>" + numTrips + "</strong></span>");
    
}


function displaySideCounts(countUpOrDown, numTrips) {

    var selectTrFirst  = 'section#content table tr:first'
    var selectTrNotFirst  = 'section#content table tr:not(:first)'
    var sideToUse = "";

    if (countUpOrDown == "up") {
        sideToUse = COUNT_UP_SIDE
        var tripCounter = 0;
        var arrowHead = "&#x25B2;"
    } else {
        sideToUse = COUNT_DOWN_SIDE
        var tripCounter = numTrips;
        var arrowHead = "&#x25BC;"
    }


    if (sideToUse == 'left') {
        $(selectTrFirst).prepend("<th>#" + arrowHead + "</th>");

        $(selectTrNotFirst).each(function(){
            if (countUpOrDown == "up") tripCounter++
            $(this).prepend("<td>" + tripCounter + "</td>");
            if (countUpOrDown == "down") tripCounter--
        });

    } else {
        $(selectTrFirst).append("<th>#" + arrowHead + "</th>");

        $(selectTrNotFirst).each(function(){
            if (countUpOrDown == "up") tripCounter++
            $(this).append("<td>" + tripCounter + "</td>");
            if (countUpOrDown == "down") tripCounter--
        });
    }

}


    


// at load time
numTripsTaken = calculateNumTripsTaken();
createNumTripsLi();
displayNumTripsTaken(numTripsTaken);

if (COUNT_DOWN_SHOW) displaySideCounts("down", numTripsTaken)
if (COUNT_UP_SHOW) displaySideCounts("up", numTripsTaken)
