// ==UserScript==
// @name           Weight Watchers Calculator
// @namespace      http://www.ryanj.org/ww-calculator
// @description    Automatically calculates weight watchers points for recipes in the All Recipes ( http://allrecipes.com )website that include calories, fat and fibre. Not all recipes contain nutrional information, so the points can not be calculated for these.
// @include        http://allrecipes.com/*
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
		var recipeName = $('.rectitle').text();
		var recipeFibre = $("li:contains('Dietary Fiber:')").text();
		var recipeFat = $("li:contains('Total Fat')").text();
		var recipeCalories = $("p:contains('Calories:')").text();
		var recipePoints;
		
		recipeFibre = parseFloat(recipeFibre.slice(19, recipeFibre.length-1));
		if(recipeFibre>4) { recipeFibre = 4; } // We don't count more than 4 points of fibre.
		recipeFat = parseFloat(recipeFat.slice(11, recipeFat.length-1));
		recipeCalories = parseFloat(recipeCalories.replace(/Calories:/,""));
		
		// The current Weight Watchers formula for calculating the value of a 
		// specific serving in points is proprietary and available only to members.
		// We are using the earlier formula described in U.S. Patent 6,040,531		
		recipePoints = Math.round(recipeCalories + (recipeFat*4) - (recipeFibre*10))/50;
		
		if(recipePoints<1) { recipePoints = 1; } // Recipes should have at least 1 point. Confirm.
		
		var contents = "<div style='display:block;background-color:#FBF8C7;padding:2px;font-size:10px;border:1px solid#ccc;margin:15px 0 15px 0;color:000;'>WW Point per serving: " + recipePoints + "</div>";
		$('#nutri-info').append( contents );
    }