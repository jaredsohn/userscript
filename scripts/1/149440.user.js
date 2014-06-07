// ==UserScript==
// @name        Giant Bomb review images
// @namespace   https://userscripts.org/scripts/show/149440
// @description Inserts old review images into the new site
// @include     *giantbomb.com/reviews/*
// @version     1.31
// @grant       none
// ==/UserScript==

/*
 This script is subject to fail on a redesign of the site
 Thanks to Giant Bomb user papercut for providing the Alex and Patrick images used here
 Script by Giant Bomb user KamasamaK
*/
(function () {
    var parentNode = document.getElementsByClassName("news-hdr")[0];
    var reviewerName = document.getElementsByClassName("news-byline")[0].getElementsByTagName("a")[0].textContent;
    var scoreNode = document.getElementsByClassName("score score-big score-special")[0];
    var numberScore = scoreNode.getElementsByTagName("span")[0].textContent;
    var systemList = document.getElementsByClassName("system-list")[0];

    var imgNode = document.createElement("img");
    imgNode.setAttribute("height", "150");
    imgNode.setAttribute("align", "left");

    if (reviewerName === "Jeff Gerstmann") {
        switch (numberScore) {
        case "1":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492756-jeff-1.png");
            break;
        case "2":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492757-jeff-2.png");
            break;
        case "3":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492758-jeff-3.png");
            break;
        case "4":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492759-jeff-4.png");
            break;
        case "5":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492760-jeff-5.png");
            break;
        default:
            return false;
        }
    } else if (reviewerName === "Brad Shoemaker") {
        switch (numberScore) {
        case "1":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492750-brad-1.png");
            break;
        case "2":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492751-brad-2.png");
            break;
        case "3":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492753-brad-3.png");
            break;
        case "4":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492754-brad-4.png");
            break;
        case "5":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492755-brad-5.png");
            break;
        default:
            return false;
        }
    } else if (reviewerName === "Ryan Davis") {
        switch (numberScore) {
        case "1":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492761-ryan-1.png");
            break;
        case "2":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492762-ryan-2.png");
            break;
        case "3":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492763-ryan-3.png");
            break;
        case "4":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492764-ryan-4.png");
            break;
        case "5":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492765-ryan-5.png");
            break;
        default:
            return false;
        }
    } else if (reviewerName === "Vinny Caravella") {
        switch (numberScore) {
        case "1":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492766-vinny-1.png");
            break;
        case "2":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492767-vinny-2.png");
            break;
        case "3":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492768-vinny-3.png");
            break;
        case "4":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492769-vinny-4.png");
            break;
        case "5":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492770-vinny-5.png");
            break;
        default:
            return false;
        }
    } else if (reviewerName === "Alex Navarro") {
        switch (numberScore) {
        case "1":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2337134-alex_1.png");
            break;
        case "2":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2337135-alex_2.png");
            break;
        case "3":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2337136-alex_3.png");
            break;
        case "4":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2337137-alex_4.png");
            break;
        case "5":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2337138-alex_5.png");
            break;
        default:
            return false;
        }
    } else if (reviewerName === "Patrick Klepek") {
        switch (numberScore) {
        case "1":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2336676-patrick_1.png");
            break;
        case "2":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2336677-patrick_2.png");
            break;
        case "3":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2336678-patrick_3.png");
            break;
        case "4":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2336679-patrick_4.png");
            break;
        case "5":
            imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2336680-patrick_5.png");
            break;
        default:
            return false;
        }
    } else if (reviewerName === "Dave Snider") {
        imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492775-snide.png");
    } else if (reviewerName === "Drew Scanlon") {
        imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492773-drewbert.png");
    } else if (reviewerName === "Matt Kessler") {
        imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492774-mattbodega.png");
    } else if (reviewerName === "Andy McCurdy") {
        imgNode.setAttribute("src", "http://static.giantbomb.com/uploads/original/0/9253/2492772-andy.png");
    } else {
        return false;
    }

    parentNode.insertBefore(imgNode, scoreNode);
    // Use CSS instead?
    parentNode.insertBefore(document.createElement("br"), scoreNode);
    parentNode.insertBefore(document.createElement("br"), systemList);
    parentNode.insertBefore(document.createElement("br"), systemList);
    parentNode.insertBefore(document.createElement("br"), systemList);
})();
