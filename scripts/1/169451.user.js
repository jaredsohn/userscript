// ==UserScript==
// @name           Yahoo Fantasy - Add Player Ranks
// @include        http://basketball.fantasysports.yahoo.com
// @include        http://basketball.fantasysports.yahoo.com/
// @include        http://basketball.fantasysports.yahoo.com/#
// @include        http://basketball.fantasysports.yahoo.com/nba
// @include        http://basketball.fantasysports.yahoo.com/nba?lid=*
// @include        http://basketball.fantasysports.yahoo.com/nba/*
// @include        http://hockey.fantasysports.yahoo.com
// @include        http://hockey.fantasysports.yahoo.com/
// @include        http://hockey.fantasysports.yahoo.com/#
// @include        http://hockey.fantasysports.yahoo.com/hockey
// @include        http://hockey.fantasysports.yahoo.com/hockey?lid=*
// @include        http://hockey.fantasysports.yahoo.com/hockey/*
// @include        http://baseball.fantasysports.yahoo.com
// @include        http://baseball.fantasysports.yahoo.com/
// @include        http://baseball.fantasysports.yahoo.com/#
// @include        http://baseball.fantasysports.yahoo.com/b1
// @include        http://baseball.fantasysports.yahoo.com/b1?lid=*
// @include        http://baseball.fantasysports.yahoo.com/b1/*
// @include        http://pastebin.com/raw.php?i=CJSRLYvx
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// @updateUrl		http://userscripts.org/scripts/source/169451.user.js
// @downloadUrl		http://userscripts.org/scripts/source/169451.user.js
// ==/UserScript==
/*/
 * 
 * 
 * Copyright 2013 David Shumway, All rights reserved
 * Contact: davidshumway@gmail.com
 * Website: http://userscripts.org/users/499979
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * 
 * 
/*/

//*******************************************
// Global variables
//*******************************************
var ih,
	SCRIPT_NAME = 'fantasysports_yahoo_com____4DfGj8bJoq0OpPcn3ZgmE7zie1DjgN5osJlb3pS',
	SPORT,
	PASTEBIN_URL,
	YAHOO_PLAYER_RANKS = false,
	YAHOO_PLAYER_RANKS_ref = {},
	CHECK_PAGE_DIFF_INTV = 4000,
	PREVIOUS_LINKS_TOSTRING = '';

////CHROME FIX////
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) { 
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}
if(typeof unsafeWindow==='undefined') {
	unsafeWindow = window;
	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}

	function GM_log(message) {
		console.log(message);
	}

}
////END FIX////

//*******************************************
// Wait for document readyState
//*******************************************
if (document.readyState == "complete" || document.readyState == "interactive") {
	ih=document.body.innerHTML;
	init__pastebin();
	//init();
} else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			ih=document.body.innerHTML;
			init__pastebin();
			//init();
		}
	}
}


//*******************************************
// init Pastebin
//*******************************************
function init__pastebin() {
	
	// Set sport
	if  (
			/^https?:\/\/baseball\.fantasysports\.yahoo\.com/.exec(document.location.href)
		)
	{
		SPORT = 'mlb';
		PASTEBIN_URL = 'http://pastebin.com/raw.php?i=CJSRLYvx';
	}
	else if
		(
			/^https?:\/\/basketball\.fantasysports\.yahoo\.com/.exec(document.location.href)
		)
	{
		SPORT = 'nba';
		return;
	}
	else
	{
		SPORT = 'nhl';
		return;
	}
		
	// Does a cached value exist that is less than 1 hour old?

	var time = new Date();

	var cache = GM_getValue('pastebin_fantasy_ranks_time_'+SPORT+SCRIPT_NAME);
	
	var maxAge;
	maxAge = 1200 * 1000; // 20 minutes in ms // 3600 * 1000; // 1 hour in ms
	
	time = time.getTime(); // in ms
	
	if (!cache) {
		cache = 0;
	}
	
	cache = cache*1;
	if (time - cache > maxAge) { // update
		GM_xmlhttpRequest({
			method: "GET",
			url: PASTEBIN_URL,
			onload: function(response) {
				var rs = response.responseText;
				var f = response.status;
				
				if (f != 200)
					alert('Error: Response from Pastebin is '+f);
				else {
					
					// check integrity
					var r;
					r = /^\[((\{"pid":"[\d\-]{1,5}","a_s":"[\d\-]{1,5}","a30":"[\d\-]{1,5}","a14":"[\d\-]{1,5}","a7":"[\d\-]{1,5}","avg_s":"[\d\-]{1,5}","avg30":"[\d\-]{1,5}","avg14":"[\d\-]{1,5}","avg7":"[\d\-]{1,5}"\},?)*?(?=\]))\]$/.exec(rs);

					if (r) {
						// update cache
						var time = new Date();
						time = time.getTime(); // in ms
						GM_setValue('pastebin_fantasy_ranks_time_'+SPORT+SCRIPT_NAME, time + ''); // this must be a string for Firefox to accept it
						GM_setValue('pastebin_fantasy_ranks_'+SPORT+SCRIPT_NAME, rs);
					} else
						alert('Error: Improper Pastebin format');

				}
				
				init__pastebin_loadval();
				
			}
		});
	} else { // use existing
		init__pastebin_loadval();
	}
	
	
}

//*******************************************
// loadval()
//*******************************************
function init__pastebin_loadval() {
	
	// get saved value of ranks
	var rs = GM_getValue('pastebin_fantasy_ranks_'+SPORT+SCRIPT_NAME);
	
	// check integrity
	var r;
	r = /^\[((\{"pid":"[\d\-]{1,5}","a_s":"[\d\-]{1,5}","a30":"[\d\-]{1,5}","a14":"[\d\-]{1,5}","a7":"[\d\-]{1,5}","avg_s":"[\d\-]{1,5}","avg30":"[\d\-]{1,5}","avg14":"[\d\-]{1,5}","avg7":"[\d\-]{1,5}"\},?)*?(?=\]))\]$/.exec(rs);

	if (r) {
		YAHOO_PLAYER_RANKS = JSON.parse(rs) // array[player{}, player{}, ..N]
		var count = 0;
		for (var i in YAHOO_PLAYER_RANKS) {
			YAHOO_PLAYER_RANKS_ref[YAHOO_PLAYER_RANKS[i].pid] = count;
			count++;
		}
	} else
		alert('Error: Improper Pastebin format');
	
	// start program
	add_player_stats();
}

//*******************************************
// function add_player_stats()
//*******************************************
function add_player_stats() {
	
	// add styles
	var x = '.sr-t'+SCRIPT_NAME+',.sr-t1'+SCRIPT_NAME+',.sr-t2'+SCRIPT_NAME;
	GM_addStyle('.sr-t'+SCRIPT_NAME+' {width:303px;text-align:center;}');
	
	GM_addStyle('.sr-t1'+SCRIPT_NAME+' {width:75px;text-align:center;}');
	
	GM_addStyle('.sr-t2'+SCRIPT_NAME+' {width:75px;border-bottom:0 !important;}');
	
	GM_addStyle(x+' {border-collapse:collapse;float:left;border-right:1px solid #ccc;border-bottom:1px solid #ccc;margin:0;padding:0; background-color:white;overflow:hidden;}');
	
	// create a hidden div that will display ranks
	var x = document.createElement('div');
	x.setAttribute('id', 'show_rank_'+SCRIPT_NAME);
	x.setAttribute('style', 'position:absolute; width:600px; display:none; z-index:10000; border:1px solid #ccc;background-color:white;');
	document.body.appendChild(x);
	
	// add mousemove for the div
	document.onmousemove = function(e) {
		if (document.getElementById('show_rank_'+SCRIPT_NAME).style.display != 'none') {
			document.getElementById('show_rank_'+SCRIPT_NAME).style.top = (e.pageY+20)+'px';
			document.getElementById('show_rank_'+SCRIPT_NAME).style.left = (e.pageX+60)+'px';
		}
	}
	
	add_player_stats_int();
	window.setInterval(function() { add_player_stats_int(); }, CHECK_PAGE_DIFF_INTV);
}

//*******************************************
// function add_player_stats_int()
//*******************************************
function add_player_stats_int() {
	
	
	var a;
	
	// all links
	a = document.getElementsByTagName('a');
	
	// all player links
	//a = document.getElementsByClassName('name');
	
	// make a string of page player links, by link ID
	var current_links_tostring = '';
	var x;
	for (var i in a) {
		x = /\/players\/\d+$/.exec(a[i].href);
		if (x) {
			current_links_tostring += '__';
			// Since we're only checking if there are any players to add mouseover to, break the loop here. 
			// If the goal is to check only if the page has been altered, this is where
			// looping would give some sort of an idea.
			break;
		}
	}
	//current_links_tostring = current_links_tostring.trim();
	
	if (current_links_tostring == '')
		return;
		
	// HM... ALWAYS UPDATE LINKS!
	PREVIOUS_LINKS_TOSTRING = '';
	
	// update links?
	if  (
			current_links_tostring != PREVIOUS_LINKS_TOSTRING
		)
	{
		
		// update PREVIOUS_LINKS_TOSTRING
		PREVIOUS_LINKS_TOSTRING = current_links_tostring;
		
		// update mouse events
		for (var i in a) {
			if (/\/players\/\d+$/.exec(a[i].href)) {
				// onmouseover show ranks
				a[i].onmouseover = function() {
					var pid;
					
					pid = /\/players\/(\d+)$/.exec(this.href);
					
					if (!pid) return;
					if (!pid[1]) return;
					
					pid = pid[1];
					
					var ref = YAHOO_PLAYER_RANKS_ref[pid]; // this.id(playerid) = count
					var ypr = YAHOO_PLAYER_RANKS[ref];
					var hidden = document.getElementById('show_rank_'+SCRIPT_NAME);
					hidden.innerHTML = '<div style="width:100%;">\
						<div class="sr-t'+SCRIPT_NAME+'" style="">\
							Actual\
						</div>\
						<div class="sr-t'+SCRIPT_NAME+'" style="width:294px;border-right:0;">\
							Average\
						</div>\
						<br style="clear:both;" >\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							Season\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							30 day\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							14 day\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							7 day\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							Season\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							30 day\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="">\
							14 day\
						</div>\
						<div class="sr-t1'+SCRIPT_NAME+'" style="width:67px;border-right:0;">\
							7 day\
						</div>\
						<br style="clear:both;" >\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.a_s+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.a30+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.a14+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.a7+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.avg_s+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.avg30+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="">\
							'+ypr.avg14+'\
						</div>\
						<div class="sr-t2'+SCRIPT_NAME+'" style="width:67px;border-right:0;">\
							'+ypr.avg7+'\
						</div>\
						<br style="clear:both;" >';
					
					hidden.style.display = 'block';
				}
				// onmouseout hide ranks
				a[i].onmouseout = function() {
					document.getElementById('show_rank_'+SCRIPT_NAME).style.display = 'none';
				}
			}
		}
	}
	
}












