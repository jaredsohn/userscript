// ==UserScript==
// @name          SpojGuide2
// @namespace     spojguide2
// @description   This script helps you out in your perpetual search of the next SPOJ problem to solve!
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require       https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js
// @include       http://www.spoj.com/*
// @include       https://www.spoj.com/*
// ==/UserScript==

// Do you want fuzzy colors?
var fuzzyColors = false;

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

urlcheck = function(match)   {
    //alert(match);
    if(match in window.location.pathname.split(" "))   return true;
    if(match in window.location.pathname.split("/"))   return true;
    return false;
}

// -----------------------------------------------------
// Begin Main script
// -----------------------------------------------------

var problems = Array(); // problem code => link

handleProblems = 

$(document).ready(function() { 
	var problems_string = "";

    $("iframe").remove();
    $("ins").remove();
    
	$("td > a[href*='/status/']").each(function(){
        
		var pname = $(this).text();
        //alert(pname);
		if(!isValidProblemCode(pname))
			return;
        //alert(pname);
		if(problems_string != "")
			problems_string += ",";
		problems_string += pname;
		problems[pname] = this;
	});
    
    
    $("h2").each(function(){
		var pname = $(this).text().split(" ")[2];
        if($(this).text()=="SPOJ Problem Set (classical)")   return;
        
        //alert(pname);
		if(!isValidProblemCode(pname))
			return;
		if(problems_string != "")
			problems_string += ",";
		problems_string += pname;
		problems[pname] = this;
	});
    
    

	GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.spoj.com/myaccount/",
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
        url: "http://home.iitk.ac.in/~nimavat/spoj/get.php",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI("problems="+problems_string),
        onload: function(responseDetails) {
        if(window.location.pathname.split("/")[2] == "classical" || window.location.pathname.split("/")[2] == "challenge")   return;
			var reply = responseDetails.responseText;
            //alert("("+reply+")");
			var values = reply.split("\n");
			for each (var v in values){
				var a = v.split(" ");
                //alert(v);
				var p = a[0];
				if(! (p in problems))
					continue;
				var u = a[1];
				$(problems[p]).attr("title", u + " ACs");
				$(problems[p]).css("background-color", chooseColor(u));
                
              
                   //alert(window.location.pathname.split("/")[1]);
                 if(window.location.pathname.split("/")[1] != "users")   {
                     point=Math.round(8000.0/(41.0+parseInt(u)))/100;
                    $(problems[p]).text($(problems[p]).text() + "  ("+u+"ACs  "+point+"points) \n\n" );
                    $('<br /><br>').insertBefore(problems[p])
                }
			}
		}
    });

});
