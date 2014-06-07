// ==UserScript==
// @name          SpojGuide
// @namespace     spojguide
// @description   This script helps you out in your perpetual search of the next SPOJ problem to solve!
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require       https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js
// @include       http://www.spoj.pl/users/*
// @include       https://www.spoj.pl/users/*
// ==/UserScript==

// Do you want to rewrite the links from /status/PROBLEM,user/ to /problems/PROBLEM ?

var rewriteLinks = true;

// Do you want fuzzy colors?
var fuzzyColors = true;

// ----------------------------------------------------------------------
// Color Chooser (chooses a color given number of submissions)
// ----------------------------------------------------------------------

// If fuzzyColors is false, then every AC count is rounded to the
// checkpoint which is the maximum lower bound. Then that checkpoints'
// corresponding color is used.

// If fuzzyColors is true, the color is the weighted average of the
// two neighbouring checkpoints.
// The weight is the distance from each checkpoint.


chooseColor = function(val) {

    var checkpoints = new Array(      0,    20,     40,    80,   160,   480,  100000 );
    //                       bright red,   red, purple,  blue, green,    yellow/spoj bg
    var red =         new Array(    255,   255,    200,   200,   150,   246,     246 );
    var green =       new Array(    100,   150,    150,   200,   255,   249,     249 );
    var blue =        new Array(    100,   150,    255,   255,   150,   224,     224 );

    var i = 0; // get highest which is <= val
    while(i+1 < checkpoints.length && checkpoints[i+1] <= val) {
        i++;
    }

    var j = 0; // get lowest which is >= val
    while(j < checkpoints.length && checkpoints[j] < val) {
        j++;
    }

    var x,y;
    if(i!=j && fuzzyColors) {
        x = (val-checkpoints[i]) / (checkpoints[j]-checkpoints[i]),
        y = (checkpoints[j]-val) / (checkpoints[j]-checkpoints[i]);
    }
    else {
        x = 0;
        y = 1;
    }

    var r = y*red[i] + x*red[j], g = y*green[i] + x*green[j], b = y*blue[i] + x*blue[j];
    r = Math.floor(r), g = Math.floor(g), b = Math.floor(b);

    return r.toString(16) + g.toString(16) + b.toString(16);
}

// -----------------------------------------------------
// Util Functions
// -----------------------------------------------------

isValidProblemCode = function(pcode) {
	// spoj page contains some random empty links
	// the regex check isn't really necessary, just a sanity check
    if( pcode==="" || pcode.match("[^A-Z0-9_]"))
        return false;
    return true;
}

log = function(text) {
    unsafeWindow.console.log(text);
}

// -----------------------------------------------------
// Begin Main script
// -----------------------------------------------------

var problems = Array(); // problem code => link

handleProblems = 

$(document).ready(function() { 
	var problems_string = "";

	$("td > a[href*='/status/']").each(function(){
		var pname = $(this).text();
		if(!isValidProblemCode(pname))
			return;
		if(problems_string != "")
			problems_string += ",";
		problems_string += pname;
		problems[pname] = this;
	});

	GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.spoj.pl/myaccount/",
        onload: function(response){
			$("table[width='91%']:first > tbody > tr > td > a[href*='/status/']", response.responseText).each(function(){
				var p = $(this).text();
				if(p in problems) {
					$(problems[p]).css("text-decoration","line-through");
				}
			});
		}
    });
	
	GM_xmlhttpRequest({
        method: "POST",
        url: "https://spojguide.appspot.com/get",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI("problems="+problems_string),
        onload: function(responseDetails) {
			var reply = responseDetails.responseText;
			var values = reply.split("\n");
			for each (var v in values){
				var a = v.split(" ");
				var p = a[0];
				if(! (p in problems))
					continue;
				var u = a[1];
				$(problems[p]).attr("title", u + " ACs");
				$(problems[p]).css("background-color", chooseColor(u));
			}
		}
    });

});
