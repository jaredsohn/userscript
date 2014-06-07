// ==UserScript==
// @name           Easy Experts-Exchange By DemianGod
// @namespace      All
// @description    Easy Experts-Exchange By DemianGod
// @include        http://experts-exchange.com/*
// @include        http://www.experts-exchange.com/*
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

function rot13(s){var r='';for (var i=0, len=s.length; i<len;i++){ c = s.charCodeAt(i); if ((c >= 65 && c <= 77) || (c >= 97 && c <= 109)) {c = s.charCodeAt(i) + 13;} else if ((c >= 78 && c <= 90) || (c >= 110 && c <= 122)) { c = s.charCodeAt(i) - 13; } r += String.fromCharCode(c);} return r;}
// DOM climbing gear
var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }
// Basic get element
var $ = function(id){return document.getElementById(id);}
// Get all by tag
var $a = function(tag){return document.getElementsByTagName(tag);}
// Get array of elements using xpath
var $x = function(xpath, node){ if (!node) node = document;	var result = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); return snapshotToArray(result); }

$x("//div[@class='s sectionFour shFFF5 sgray expGray allZonesMain taSearchRow']",document)[0].style.display="none"
$x("//div[@class='bl blQuestion']//div[@class='answers']",document)[0].style.display="none"
$x("//a[@class='startFreeTrial']",document)[0].style.display="none"
$x("//div[@id='relatedSolutions20X6']",document)[0].style.display="none"
$x("//div[@id='compSignUpNowVQP32']",document)[0].style.display="none"