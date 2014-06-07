// ==UserScript==
// @name           Clean Up ExpertsExchange
// @namespace   All
// @include        http://www.experts-exchange.com/*
// @include        http://experts-exchange.com/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        $(".blurredAnswer, .relatedSolutions, .allZonesMain, .qStats, .lightImage, .ontopBanner, .adSense, .startFreeTrial, div#pageRight, #relatedSolutions20X6").remove();

        $(".sectionTwo:first").after('<h2><a style="color: #ee6600;" href="#theanswer">Skip To The Accepted Solution &gt;&gt;</a></h2><br />');
        $(".acceptedHeader").before('<a id="theanswer" name="theanswer"></a>');

    }