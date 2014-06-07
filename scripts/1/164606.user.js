
// ==UserScript==
// @name       PointsPlusBBC
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Weight Watchers points plus calculator for the BBC good food website
// @match      http://www.bbcgoodfood.com/*
// @copyright  2013+, Steve Rawlinson
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
    //    alert($); // check if the dollar (jquery) function works
		var recipeName = $("h1.fn").text().trim(); 
        var recipeFibre;
        var recipeFat;
        var recipeProtein;
        var recipeCarbs;
        var regex = /\d\.?\d*/;
        
        // strings = $(".nutrition").first().text().replace(/(\r\n|\n|\r)/gm,"").split(",")
        elements = $(".nutrition").find('[itemprop]')
        
        $.each(elements, function(index, element)
        {
            element = $(element);
            if(element.attr("itemprop").indexOf("protein") != -1)
            {
                recipeProtein = regex.exec(element.text());
            }
            else if(element.attr("itemprop").indexOf("fiber") != -1)
            {
                recipeFibre = regex.exec(element.text());	
            }
            else if( (element.attr("itemprop").indexOf("fat") != -1) && (element.attr("itemprop").indexOf("saturated") == -1))
            {
                recipeFat = regex.exec(element.text());
            }
            else if(element.attr("itemprop").indexOf("carbohydrate") != -1)
            {
                recipeCarbs = regex.exec(element.text());
            }
            
        })
		
		var recipePoints = (recipeProtein / 10.94) + (recipeCarbs / 9.17) + (recipeFat/3.89)- (recipeFibre / 12.49);
		if(recipePoints<1) { recipePoints = 1; } // Recipes should have at least 1 point. Confirm.
        recipePoints = Math.round(recipePoints);
		
        $(".recipe-header h1").text($(".recipe-header h1").text() + " (" + recipePoints + " points)");
    }
