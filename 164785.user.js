// ==UserScript==
// @name       Weight Watchers UK ProPoints BBCgoodfood.com
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Weight Watchers points plus calculator for the BBC good food website
// @match      http://*.bbcgoodfood.com/*
// @match      http://bbcgoodfood.com/*
// @copyright  2013+, Steve Rawlinson
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery is loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


// All your GM code must be inside this function
    function letsJQuery() {
    //    alert($); // check if the dollar (jquery) function works
        var recipeName = $("h1.fn").text().trim();
        var recipeFibre;
        var recipeFat;
        var recipeProtein;
        var recipeCarbs;
        var regex = /\d\.?\d*/;

        strings = $(".nutrition").first().text().replace(/(\r\n|\n|\r)/gm,"").split(",")
        $.each(strings, function(index, string)
        {
            if(string.indexOf("protein") != -1)
            {
                recipeProtein = regex.exec(string);
            }
            else if(string.indexOf("fibre") != -1)
            {
                recipeFibre = regex.exec(string);
            }
            else if( (string.indexOf("fat") != -1) && (string.indexOf("saturated") == -1))
            {
                recipeFat = regex.exec(string);
            }
            else if(string.indexOf("carbohydrate") != -1)
            {
                recipeCarbs = regex.exec(string);
            }

        })

        //var recipePoints = (recipeProtein / 10.94) + (recipeCarbs / 9.17) + (recipeFat/3.89)- (recipeFibre / 12.49);
        var recipePoints = Math.round(( parseFloat(recipeProtein * 16) + parseFloat(recipeCarbs * 19) + parseFloat(recipeFat * 45) - (recipeFibre * 5))/175);
        if(recipePoints<1) { recipePoints = 1; } // Recipes should have at least 1 point. Confirm.
        recipePoints = Math.round(recipePoints);

        $(".subhead.summary").prepend("<span style='font-size: 150%'>WeightWatchers points: " + recipePoints + "</span> <br><br>");
    }
