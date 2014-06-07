// ==UserScript==
// @name        UK Press Online Query Scraper
// @namespace   com.mklyons.ukpressscraper
// @description Grabs all headlines for a particular query on UK Press Online
// @include     http://ukpressonline.com/ukpressonline/open/simpleSearch.jsp?is=1
// @include     http://www.ukpressonline.co.uk/ukpressonline/database/search/advSearch.jsp
// @include     http://ukpressonline.com/ukpressonline/open/userLogin.jsp
// @version     1
// ==/UserScript==

var totalReturn = "";
var counter = 0;


setInterval(function() {
    if(document.querySelector('html').innerHTML.indexOf('sr_edition') > -1) {
        var headlines = getHeadlinesForPage();
        scrapeIndividualPage(headlines);
        counter++;
        if(headlines.length < 16) {
            document.querySelector('html').innerHTML = totalReturn;
            clearInterval();
        } else {
            document.querySelector('html body div#pgContentPanel table tbody tr td div#searchArea table tbody tr td div.sr_thumbsnav a.sr_next').click();
        }
        
    }
}, 10);

function scrapeIndividualPage(scrapedHeadlines) {
    for(i = 0; i < scrapedHeadlines.length; i++) {
        totalReturn += scrapedHeadlines[i].innerHTML + "<br>";
    }
}

function getHeadlinesForPage() {
    return Array.prototype.slice.call(document.getElementsByClassName('sr_edition'));
}