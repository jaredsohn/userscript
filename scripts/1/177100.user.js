// ==UserScript==
// @name          SpojEx
// @namespace     spojex
// @description   Spoj Extensions
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require       https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js
// @include       http://www.spoj.com/*
// @include       https://www.spoj.com/*
// ==/UserScript==

// Do you want to rewrite the links from /status/PROBLEM,user/ to /problems/PROBLEM ?

// var rewriteLinks = false;

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

var curuser = null;

function chooseColor(val) {

    var checkpoints = new Array(  0,    20,     40,    80,   160,   480, 1000000);
    //                   bright red,   red, purple,  blue, green,  yellow/spoj bg
    var red =         new Array(255,   255,    200,   200,   150,   246,     246);
    var green =       new Array(100,   150,    150,   200,   255,   249,     249);
    var blue =        new Array(100,   150,    255,   255,   150,   224,     224);

    var i = 0; // get highest which is <= val
    while(checkpoints[i+1] <= val)
        ++i;
    
    var j = val > checkpoints[i] ? i + 1 : i;

    var x = 0, y = 1;
    if(i != j && fuzzyColors) {
        x = (val - checkpoints[i]) / (checkpoints[j] - checkpoints[i]);
        y = (checkpoints[j] - val) / (checkpoints[j] - checkpoints[i]);
    }

    var r = Math.floor(y * red[i]   + x * red[j]);
    var g = Math.floor(y * green[i] + x * green[j]);
    var b = Math.floor(y * blue[i]  + x * blue[j]);

    return r.toString(16) + g.toString(16) + b.toString(16);
}

// -----------------------------------------------------
// Util Functions
// -----------------------------------------------------

function isValidProblemCode(pcode) {
	// spoj page contains some random empty links
	// the regex check isn't really necessary, just a sanity check
    return !(pcode === "" || pcode.match("[^A-Z0-9_]"));
}

function log(text) {
    unsafeWindow.console.log(text);
}

// -----------------------------------------------------
// Begin Main script
// -----------------------------------------------------

var testUrl = "http://localhost:8080/spojex";
var newTestUrl = "http://127.0.0.1:8888";
var onlineUrl = "http://spojex.appspot.com";
var usedUrl = onlineUrl;
var getProblemsUrl = usedUrl + "/getProblems";
var getUsersUrl = usedUrl + "/getUsers";
var iconsUrl = usedUrl + "/icons";

function removeAds()
{
    $("#maintable").find("> tbody > tr:nth-child(3)").remove();
    $("#maintable").css("width", "840");
    $("td.headercenter > div").css("width", "776");
    $("td.content > ins").remove();
    $("td.ad-r").remove();
    $("td.content0 td.content table.problems[width='90%']").css("width", "100%");
}

function getStar(rank)
{
	if(rank <= 20)
		return 'award_star_gold_1.png';
	else if(rank <= 100)
		return 'award_star_silver_1.png';
	else if(rank <= 500)
		return 'award_star_bronze_1.png';
	else
		return null;
}

function getMedal(rank)
{
    if(rank == 0)
	    return null;
	else if(rank == 1)
        return 'medal_gold_1.png';
	else if(rank <= 5)
		return 'medal_silver_1.png';
	else if(rank <= 20)
		return 'medal_bronze_1.png';
	else
		return null;
}

function getTickMedal(rank)
{
    var medal = getMedal(rank);
    if(medal == null)
        return 'tick.png';
    return medal;
}

function swapTicks()
{
    if(curuser == null)
        return;
    
    $("img[src='/gfx/solved.gif']").each(function(){
        $(this).attr("src", iconsUrl + "/tick.png");
    });
    
    var problems = []; // problem code => link
	var problems_string = [];

	$("table.problems tr.problemrow").each(function(){
		var pname = $("td:nth-child(4)", this).text().trim();
		if(!isValidProblemCode(pname))
			return;
		problems_string.push(pname);
		problems[pname] = $("td:nth-child(2)", this);
	});
    
	GM_xmlhttpRequest({
        method: "POST",
        url: getProblemsUrl,
		headers: {"Content-type" : "application/x-www-form-urlencoded"},
		data: encodeURI("problems=" + problems_string + "&user=" + curuser),
        onload: function(resp)
        {
			var ps = JSON.parse(resp.responseText);
			for each(var p in ps)
			{
				var medal = getMedal(p.rank);
				if(medal != null)
				    problems[p.code].html('<img title="Rank ' + p.rank + '" ' + 
				        'src="' + iconsUrl + '/' + medal + '">');
			}
		}
    });
}

function userPage()
{
    var problems = []; // problem code => link
    var solved_problems = [];
	var problems_string = [];
	
	var pageuser = $("tr:contains('Username') td + td font[color='brown']").html();

	GM_xmlhttpRequest({
        method: "POST",
        url: getUsersUrl,
		headers: {"Content-type" : "application/json"},
		data: JSON.stringify([pageuser]),
        onload: function(resp)
        {
            var us = JSON.parse(resp.responseText);
            if(us.length == 1)
            {
                var star = getStar(us[0].rank);
                if(star != null)
                    $("b:contains('Current world rank:')").append(' <img src="' + iconsUrl + '/' + star + '">');
            }
		}
    });

	$("table[width='91%']").attr("width", "97%");

	$("td > a[href*='/status/']").each(function(){
		var pname = $(this).text();
		if(!isValidProblemCode(pname))
			return;
		problems_string.push(pname);
		problems[pname] = this;
	});

	$("table[width='97%']:first a[href*='/status/']").each(function(){
		var pname = $(this).text();
		if(!isValidProblemCode(pname))
			return;
		solved_problems[pname] = this;
	});

    if(curuser != pageuser) {
    	GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.spoj.com/myaccount/",
            onload: function(resp){
    			$("table[width='91%']:first a[href*='/status/']", resp.responseText).each(function()
    			{
    				var p = $(this).text();
    				if(p in problems)
    					$(problems[p]).css("text-decoration","line-through");
    			});
    		}
        });
    }

	GM_xmlhttpRequest({
        method: "POST",
        //url: "https://spojguide.appspot.com/get",
        url: getProblemsUrl,
		headers: {"Content-type" : "application/x-www-form-urlencoded"},
		data: encodeURI("problems=" + problems_string + "&user=" + pageuser),
        onload: function(resp)
        {
			var ps = JSON.parse(resp.responseText);

			for each(var p in ps)
			{
				var tmp = $(problems[p.code]);
				tmp.attr("title", p.name +
					" (" + p.userCnt + " ACs, " + (80 / (40 + p.userCnt)).toFixed(2) + " pts)");
				tmp.css("background-color", chooseColor(p.userCnt));
				if(!(p.code in solved_problems))
					continue;
				var medal = getMedal(p.rank);
				if(medal != null)
					tmp.before('<a href="http://www.spoj.com/ranks/' + p.code + '/">' +
						'<img title="Rank ' + p.rank + '" src="' + iconsUrl + '/' + medal + '"><a/>');
				else
					tmp.parent().css("padding-left", "17px");
			}
		}
    });
}

function statusPage()
{
    var users = [];

	$("table.problems a[href*='/users/']").each(function(){
		users.push($(this).attr("title"));
	});

	GM_xmlhttpRequest({
        method: "POST",
        //url: "https://spojguide.appspot.com/get",
        url: getUsersUrl,
		headers: {"Content-type" : "application/json"},
		data: JSON.stringify(users),
        onload: function(resp)
        {
            var us = JSON.parse(resp.responseText);
			for each(var u in us)
			{
				var star = getStar(u.rank);
				if(star != null)
    				$("table.problems a[href='/users/" + u.username + "/']").before(
    				    '<img title="Rank ' + u.rank + '" src="' + iconsUrl + '/' + star + '"> ');
			}
		}
    });
}


$(document).ready(function() {
    removeAds();
    
    curuser = $("a[href='/logout'] + br + b").html();
    
    if(document.URL.match("http://www.spoj.com/problems/(?:classical|challenge|partial|tutorial|riddle)/") != null)
        swapTicks();
    
    if(document.URL.match("http://www.spoj.com/(?:(?:users/.+)|(?:myaccount))") != null)
        userPage();
    
    if(document.URL.match("http://www.spoj.com/(status|ranks)/") != null)
        statusPage();
});
