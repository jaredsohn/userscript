// ==UserScript==
// @name       WeightWatchers PointsPlus BBCgoodfood
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Weight Watchers points plus calculator for the BBCgoodfood.com website
// @match      http://*bbcgoodfood.com/*
// @copyright  2013+, Steve Rawlinson, based on original code by Ryan Johnston
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
		
		var recipePoints = (recipeProtein / 10.94) + (recipeCarbs / 9.17) + (recipeFat/3.89)- (recipeFibre / 12.49);
		if(recipePoints < 0) { recipePoints = 0; } 
        recipePoints = Math.round(recipePoints);
		
        $(".subhead.summary").prepend("<span style='font-size: 150%'>WeightWatchers points: " + recipePoints + "</span> <br><br>");
    }

