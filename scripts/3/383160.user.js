// ==UserScript==
// @name       Trello cards view filter out lanes
// @namespace  http://tblh.mn/trellofilter
// @version    0.3
// @description  In the Trello Cards View, filter out cards in the given lanes (such as Released, or Done, encoded as an array of URL params)
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match      https://trello.com/*/cards?*
// @copyright  2014+, tlehman
// ==/UserScript==

lanesToIgnore = window.location.search.substring(1).split("&");
for(var i = 0; i < lanesToIgnore.length; i++) {
    lanesToIgnore[i] = lanesToIgnore[i].replace(/%20/g, " ");
}

function cardIsInLane(lane, that) {
    var elem = $(that).children("p.list-card-position")[0];

    if(elem) {
      return !!(elem.innerText.match(lane));
    }
    return false;
}

function filterOutCardsFromIgnoredLanes() {
   $(".list-card-container").filter(function() {
       for(var i = 0; i < lanesToIgnore.length; i++) {
           if(cardIsInLane(lanesToIgnore[i], this)) {
               return 1;
           }
       }
       return 0;
   }).css("display", "none");
}

waitForKeyElements("div.js-cards-content", filterOutCardsFromIgnoredLanes);
