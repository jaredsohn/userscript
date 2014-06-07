// ==UserScript==
// @name        Qantas sans Jetstar
// @namespace   Josh
// @description Edit Qantas Page
// @require         http://code.jquery.com/jquery.min.js
// @include     *qantas.com*
// @version     0.2
// @grant       GM_addStyle	
// ==/UserScript==



// Firstly, the most important thing is we remove JQ flights displayed in the booking engine
$(window).load(function(){
    var JQflight = $("tr:contains('JQ')");
    JQflight.parent ().remove ();
});

// For the rest I am being lazy and will clean up section by section using old CSS


// Global Styles - remove Jetstar Logo at the bottom; remove plenty of promotional panels on the home page; finally remove the facebook/twitter share bar on every page 
GM_addStyle("a.jetstar img, div.qAddThis, div#hpPromoWrapper, div#promotions, div#homepagePromotionsDiv, div#q-commitment, div#RHSPromo {display: none; !important; }");


// Back in the Booking Engine
// Travel insurance is persistant, has display:block in local css
GM_addStyle("div#pointsandpay, div.addFare, div#insurance, div#insuranceCashOptions { display: none; !important; } ");



// Finally the original script I had to clean up the my booking page...
GM_addStyle("div#tripOffer, div#idFlightExtrasPanel, div#BeforeYouTravel, div#pmPanel { display: none; !important; }");

