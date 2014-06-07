// ==UserScript==
// @name           THG Charts
// @namespace      THG
// @description    Colorize values in benchmark comparison charts
// @include        http://ww*.tomshardware.com/charts/*
// ==/UserScript==
/// <reference path="jquery-1.3.2-vsdoc2.js" /> // design time intellisense

// Only run script if comparing
var href = window.location.href;
if (href.indexOf("compare",0) == -1  || (href.indexOf("prod%5B",0) == -1 && href.indexOf("prod[",0) == -1)) return;

// User defined colors
var worstColor = "#FF0000";
var bestColor = "#00FF00";

// Some code to add jQuery support
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var tcStyle = document.createElement('style');
tcStyle.type = 'text/css';
tcStyle.innerHTML = '#tableContainer {height: auto; width: 800px; }';
document.getElementsByTagName('head')[0].appendChild(tcStyle);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
    else { $ = unsafeWindow.jQuery; jQuery = unsafeWindow.jQuery; letsJQuery();  }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

    jQuery(document).ready(function() {
        // Set page width to 1280 to be sure it will hold 10 items (current limit)
        jQuery("#container").css("width", "1265px");
        jQuery("#main").css("width", "1257px");
        jQuery("#internalMain").css("width", "1257px");
        // Un-hide paged columns
        jQuery(".productCell").children("th").removeClass("hidden"); // product pic/store/price
        jQuery(".titleTab").children("td").removeClass("hidden"); // header/footer
        jQuery(".benchRow").children("td").removeClass("hidden"); // data
        // Hide paging controls
        jQuery(".tablePagination").css("display", "none");
        // Fix div display for shop name (price overlapped name)
        jQuery(".compareShop").css("display", "inline");
        // Put table into scrolling div
        var div=jQuery('<div id="tableContainer"></div>');
        jQuery("table[id=table]").filter(function(index) {return index==0;}).wrap(div);
        jQuery(".benchRow").each(function(index) {
            // Colorize values                        
            setColors(this);
        });
    });

    function setColors(row) {
        lowerBetterRegExp = /score in (?:dba|watts|ms|time)/;
        var biggerBetter = true;
        var lastIndex = jQuery(row).children().size();
        var bestValue = -1;
        var bestIndex = -1;
        var worstValue = -1;
        var worstIndex = -1;
        var thisValue = -1;
        // Iterate through cells to get best/worst values
        for (var i = 0; i < lastIndex; i++) {
            // Lower is better if score is measured in elapsed time...
            var cellText = jQuery(jQuery(row).children().get(i)).text().toLowerCase();
            
            if (i == 0 && lowerBetterRegExp.test(cellText)==true) {
                biggerBetter = false;
            } else { // This is ok to be in else statement because values will never be in first cell                
                
                if (cellText.indexOf(" ", 0) == -1) {
                    thisValue = parseFloat(jQuery(jQuery(row).children().get(i)).text());
                    if ((bestValue == -1 && !isNaN(thisValue)) ||
                      !isNaN(thisValue) && ((biggerBetter == true && thisValue >= bestValue) ||
                        (biggerBetter == false && thisValue <= bestValue))) {
                        bestValue = thisValue;
                        bestIndex = i;
                    }
                    if ((worstValue == -1 && !isNaN(thisValue)) ||
                      (!isNaN(thisValue) && ((biggerBetter == true && thisValue <= worstValue) ||
                      (biggerBetter == false && thisValue >= worstValue)))) {
                        worstValue = thisValue;
                        worstIndex = i;
                    }

                }
            }
        }
        // Color the best/worst scores with user defined colors
        jQuery(row).children().filter(function(index) {
            // Match best score(s)
            return (parseFloat(jQuery(this).text()) == bestValue);
        }).css("background-color", bestColor)
        .end().filter(function(index) {
            // Match worst score(s)
            var dbgWorstVal = worstValue;
            var dbgval = parseFloat(jQuery(this).text());
            return (parseFloat(jQuery(this).text()) == worstValue);
        }).css("background-color", worstColor);
    }
}

