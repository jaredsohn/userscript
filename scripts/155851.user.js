// ==UserScript==
// @name           Yahoo Fantasy - Add Player Stats
// @include        http://basketball.fantasysports.yahoo.com
// @include        http://basketball.fantasysports.yahoo.com/
// @include        http://basketball.fantasysports.yahoo.com/#
// @include        http://basketball.fantasysports.yahoo.com/nba
// @include        http://basketball.fantasysports.yahoo.com/nba?lid=*
// @include        http://hockey.fantasysports.yahoo.com
// @include        http://hockey.fantasysports.yahoo.com/
// @include        http://hockey.fantasysports.yahoo.com/#
// @include        http://hockey.fantasysports.yahoo.com/hockey
// @include        http://hockey.fantasysports.yahoo.com/hockey?lid=*
// @include        http://baseball.fantasysports.yahoo.com
// @include        http://baseball.fantasysports.yahoo.com/
// @include        http://baseball.fantasysports.yahoo.com/#
// @include        http://baseball.fantasysports.yahoo.com/b1
// @include        http://baseball.fantasysports.yahoo.com/b1?lid=*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// @updateUrl		http://userscripts.org/scripts/source/155851.user.js
// @dowloadUrl		http://userscripts.org/scripts/source/155851.user.js
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
	SCRIPT_NAME = 'fantasysports_yahoo_com____5dkDGb7osjx0iqu2Stob8mnxlcm1ObnsAleig8kshbHzliqpdDkjg',
	SORT_BY,
	SPORT,
	gm_xmlhttprequest_errors = 0,
	gm_xmlhttprequest_errors_max = 10;
var count_leagues = 0; // this will be used to determine timeouts for xml http requests
var DOMAIN;

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
	init();
} else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			ih=document.body.innerHTML;
			init();
		}
	}
}

//*******************************************
// Main function
//*******************************************
function init() {
	
	// Variables
	
	// SPORT
	var x = document.location;
	if (/^https?:\/\/basketball\.fantasysports\.yahoo\.com/.exec(document.location))
		SPORT = 'nba';
	else if (/^https?:\/\/baseball\.fantasysports\.yahoo\.com/.exec(document.location))
		SPORT = 'mlb';
	else 
		SPORT = 'hck';
	
	// DOMAIN
	DOMAIN = /^https?:\/\/(basketball|baseball|hockey|football)\.fantasysports\.yahoo\.com/.exec(document.location);//
	if (!DOMAIN) return;
	DOMAIN = DOMAIN[0];
	
	//*******************************************
	// Attach to document
	//*******************************************
	var o,p,q,r;
	
	o = document.getElementById('sitenavsub');
	
	// update class -> Navitem last
	if (o) {
		var x;
		x = o.getElementsByTagName('li');
		if (x) {
			x[x.length - 1].className = 'Navitem';
		}
	}
	if (!o) return;

	/*
	 * Mostly deprecated
	if (document.getElementsByClassName('bd subnav-gamehome').length) {
		o = document.getElementsByClassName('bd subnav-gamehome')[0].getElementsByTagName('ul')[0];
	} else {
		var x, y;
		x = document.getElementsByTagName('ul');
		for (var i in x) {
			if (x[i].className == 'yog-grid yog-wrap') {
				o = x[i];
				break;
			}
		}
		if (!o) {
			x = document.getElementById('sitenavsub');
			if (x) {
				x = x.getElementsByTagName('ul');
				if (x) {
					o = x[0];
				}
			}
		}
	}*/
	
	p = document.createElement('li');
	p.setAttribute('id', SCRIPT_NAME+'mtal__p');
	p.setAttribute('class', 'Navitem last'); // add class name
	p.setAttribute('style', 'margin-left: 6px;');
	o.appendChild(p);
	p = document.getElementById(SCRIPT_NAME+'mtal__p');
	//
	// Is current for Baseball, Hockey, Basketball.
	// 2013. Previous are "2012", "2011".
	//
	p.innerHTML = '<select id="'+SCRIPT_NAME+'mtal__q">\
		<option>Show Players</option>\
		<option value="S_S_2013">Season (total)</option>\
		<option value="S_AS_2013">Season (avg)</option>\
		<option value="S_L">Today (live)</option>\
		<option value="S_L30">Last 30 Days (total)</option>\
		<option value="S_AL30">Last 30 Days (avg)</option>\
		<option value="S_L14">Last 14 Days (total)</option>\
		<option value="S_AL14">Last 14 Days (avg)</option>\
		<option value="S_L7">Last 7 Days (total)</option>\
		<option value="S_AL7">Last 7 Days (avg)</option>\
		<option value="S_PSR">Remaining Games (proj)</option>\
		<option value="S_SPS_2013">Splits: Season</option>\
		<option value="S_SPC">Splits: Career</option>\
		<option value="K_K">Ranks</option>\
		<option value="O_O">Opponents</option>\
		<option value="RO">Research</option>\
		<option value="M_M">Fantasy Matchups</option>\
		<option value="S_S_2012">2012 Season (total)</option>\
		<option value="S_S_2011">2011 Season (total)</option>\
	</select> ';
	q = document.getElementById(SCRIPT_NAME+'mtal__q');
	
	// *********************************
	// Program init
	// *********************************
	
	q.onchange = function() {
		add_player_stats();
	}
}

//**********************************
// add_player_stats_styles()
//**********************************
function add_player_stats_styles() {
	
	GM_addStyle('#home-myleagues table td {border-top: 0;padding: 0;'); // remove borders, padding
	
	GM_addStyle('#home-myleagues .teams {border: 0;'); // remove borders
	
	GM_addStyle('#'+SCRIPT_NAME+'mtal_td {overflow:hidden;max-height:640px;margin:0;padding:0;border:4px solid lime;border-top:0;}');//background-color:#080808;
	
	GM_addStyle('.mtal__l,.mtal__r,.mtal__r2 {min-width:300px;max-height:320px;overflow:auto;margin:0;padding:0;border-top:1px solid teal;}');
	
	GM_addStyle('#yspsub {width:0px;overflow:hidden;}'); // resize page items
	
	GM_addStyle('.teamtable {font-size: 0.8em;z-index:1000;}'); // resize page items
	
	GM_addStyle('.owner {min-width:90px;width:90px;}'); // resize page items
	
	GM_addStyle('.Sm-rail {display:none;}'); // resize page items
	
	// change page width
	var x = document.getElementsByClassName('Page-wrap-sm');
	for (var i in x) {
		if (!x[i]) continue;
		if (!x[i].style) continue;
		x[i].style.width = '100%';
	}
	// add window.innerWidth as max-width to stat containers
	var w;
	w = (window.innerWidth + '').replace(/px[^$]{0,}/, '');
	w = w*1;
	if (w < 900) {
		w = w - 100;
	} else if (w < 1000) {
		w = w - 200;
	} else {
		w = w - 300;
	}
	GM_addStyle('.mtal__l,.mtal__r,.mtal__r2 {max-width:'+w+'px;}');
	// add window.innerWidth window.resize
	window.onresize = function() {
		var w;
		w = (window.innerWidth + '').replace(/px[^$]{0,}/, '');
		w = w*1;
		if (w < 900) {
			w = w - 100;
		} else if (w < 1000) {
			w = w - 200;
		} else {
			w = w - 300;
		}
		GM_addStyle('.mtal__l,.mtal__r,.mtal__r2 {max-width:'+w+'px;}');
	}
}

//*******************************************
// function add_player_stats()
//  - called from mtal_q.onchange event
//*******************************************
function add_player_stats() {
	
	// remove focus here
	document.getElementById(SCRIPT_NAME+'mtal__q').blur();
	
	// set SORT_BY
	SORT_BY = document.getElementById(SCRIPT_NAME+'mtal__q').value;
	
	// add styles
	add_player_stats_styles();
	
	
	//
	//var c = 0; //debug
	//
	
	// *********************************
	// Iterate through front page teams
	// *********************************
	
	var le;
	var _a;
	var i;
	var newTr;
	
	var url_myteam;
	var url_avaibl;
	
	// replaces %
	if (SPORT == 'nba') {
		url_myteam = 'sort=AR&sdir=1&status=%&pos=P&stat1='+SORT_BY+'&myteam=1&ajaxrequest=1';
		url_avaibl = 'sort=AR&sdir=1&status=A&pos=P&ajaxrequest=1&stat1='+SORT_BY;
	} else if (SPORT == 'mlb') {
		url_myteam = 'sort=AR&sdir=1&status=%&pos=B,P&stat1='+SORT_BY+'&myteam=1&ajaxrequest=1';
		url_avaibl = 'sort=AR&sdir=1&status=A&pos=B&ajaxrequest=1&stat1='+SORT_BY;
	} else if (SPORT == 'hck') {
		url_myteam = 'sort=AR&sdir=1&status=%&pos=G,P&stat1='+SORT_BY+'&myteam=1&ajaxrequest=1'; // goaltenders & forward/defensemen
		url_avaibl = 'sort=AR&sdir=1&status=A&pos=G,P&ajaxrequest=1&stat1='+SORT_BY;
	}
	
	// HIDE PRE-DRAFT TEAMS TABLE
	// Oct. 5, 2013
	var table = document.getElementsByTagName('table');
	for (var i in table) {
		if (!table[i]) continue;
		if (!table[i].innerHTML) continue;
		var s = table[i].getElementsByTagName('span');
		if (!s) continue;
		if (!s[0]) continue;
		if (s[0].innerHTML == 'Pre-Draft Teams') {
			table[i].parentNode.removeChild(table[i]);
			break;
		}
	}
	
	// LEAGUES IN TABLES (ROTISSERIE & UNDRAFTED)
	// all links
	_a = document.getElementsByTagName('a');
	for (i = 0; i < _a.length; i++) {
		if (!_a[i]) continue;
		if (!_a[i].className) continue;
		
		if  (
			_a[i].className == 'team' ||
			_a[i].className == 'yfa-team' ||
			_a[i].className == 'Block Fz-sm'
			)
		{
			
			le = /^([^\.]+\.fantasysports\.yahoo\.com\/[^\/]+\/)(\d+)\/(\d+)$/.exec(_a[i].href);
			
			if (!le) continue;
			
			// remove any?
			newTr = document.getElementById(SCRIPT_NAME+le[2]);
			if (newTr) {
				newTr.parentNode.removeChild(newTr);
			}
				
			if (document.getElementById(SCRIPT_NAME+le[2])) { // row exists
				
				continue;
			
			} else { // row does not exist
				
				var x, parent, nextElement, td;
				
				// mlb
				// 4 is tr
				// 5 is tbody
				// 6 is table
				
				// nba
				// 3, 4, 5
				
				if  (
						SPORT == 'nba'
					)
				{
					parentTbody = _a[i].parentNode.parentNode.parentNode.parentNode; // NBA 2012
					currentElement = _a[i].parentNode.parentNode.parentNode; // NBA 2012
				} else if
					(
						SPORT == 'mlb'
					)
				{
					parentTbody = _a[i].parentNode.parentNode.parentNode.parentNode.parentNode;
					currentElement = _a[i].parentNode.parentNode.parentNode.parentNode;
				} else { // copy mlb?
					parentTbody = _a[i].parentNode.parentNode.parentNode.parentNode.parentNode;
					currentElement = _a[i].parentNode.parentNode.parentNode.parentNode;
				}
				
				nextElement = currentElement.nextSibling;

				// row border
				currentElement.style.border = '4px solid lime';
				currentElement.style.borderBottom = '0';
				// create row - tr
				newTr = document.createElement('tr');
				newTr.setAttribute('id', SCRIPT_NAME+le[2]);
				newTr.setAttribute('style', 'padding:0;border:0;');
				// append tr
				if (!nextElement) { // append
					parentTbody.appendChild(newTr);
				} else { // insertBefore
					parentTbody.insertBefore(newTr, nextElement);
				}
				// row reference
				newTr = document.getElementById(SCRIPT_NAME+le[2]);
				
				//mtal (l, r)
				td  = '<td id="'+SCRIPT_NAME+'mtal_td" style="" colspan="5">';
				td += '<div class="mtal__l"  style=""></div>';
				td += '<div class="mtal__r"  style=""></div>';
				td += '<div class="mtal__r2" style=""></div>';
				td += '</td>';
				newTr.innerHTML = td;
				
				// *********************************
				// Get external urls
				// *********************************
				var url_;
				
				// *********************************
				// My team
				// *********************************
				url_ = le[1]+le[2]+'/players?'+url_myteam.replace('%', le[3]);
				// func. get first 25
				get_team_players_first25(url_, count_leagues+1);
				
				
				// *********************************
				// Available players
				// *********************************
				url_ = le[1]+le[2]+'/players?'+url_avaibl;
				// func. get available
				get_available_players(url_, count_leagues+1);
			}
			
			// *********************************
			// Increment count leagues
			// *********************************
			count_leagues++;
		}
		
		
	}
	
	// NEW LAYOUT. DIVS & ULS
	_a = document.getElementsByClassName('List-rich');
	//_a = document.getElementsByTagName('a');
	
	for (i = 0; i < _a.length; i++) {
		
		if (!_a[i]) continue;
		if (!_a[i].innerHTML) continue;
		
		//console.log(_a[i].innerHTML);return;
		// first instance of <div class='Fz-sm'><a  href="
		//le = /<div class=['"]Fz-sm['"]><a\s+href="([^\.]+\.fantasysports\.yahoo\.com\/[^\/]+\/)(\d+)\/(\d+)"/.exec(_a[i].innerHTML);
		// /mlb/000/1 or /hockey/000/1
		le = /<div class=['"]Fz-sm['"]><a[\t\s]+href="(\/[\w\d]+\/)(\d+)\/(\d+)"/.exec(_a[i].innerHTML);
		
		if (!le)
			continue;
		
		// new elements
		var li;
		li = document.createElement('li');
		//<div id="'+SCRIPT_NAME+'mtal_td" style="">\
		
		li.innerHTML = '\
			<div id="'+SCRIPT_NAME+le[2]+'" style="">\
				<div id="'+SCRIPT_NAME+'mtal_td" style="">\
					<div class="mtal__l"  style=""></div>\
					<div class="mtal__r"  style=""></div>\
					<div class="mtal__r2" style=""></div>\
				</div>\
			</div>\
		';
		_a[i].appendChild(li);
		
		// *********************************
		// Get external urls
		//   - My team
		//   - Available players
		// *********************************
		var url_;
		// My team
		url_ = DOMAIN + le[1]+ le[2]+'/players?'+url_myteam.replace('%', le[3]);
		// func. get first 25
		get_team_players_first25(url_, count_leagues+1);
		// Available players
		url_ = DOMAIN + le[1]+ le[2]+'/players?'+url_avaibl;
		// func. get available
		get_available_players(url_, count_leagues+1);
		
		// *********************************
		// Increment count leagues
		// *********************************
		count_leagues++;
	}
	
	
	
	
	
	// OLD. STATUS = TEAM# IS UNNECESSARY WITH MYTEAM=1
	//u_nba = 'sort=AR&sdir=1&status='+le[3]+'&pos=P&stat1='+SORT_BY+'&myteam=1&ajaxrequest=1';
	//u_mlb = 'sort=AR&sdir=1&status='+le[3]+'&pos=B,P&stat1='+SORT_BY+'&myteam=1&ajaxrequest=1';
	//u_hck = 'sort=AR&sdir=1&status='+le[3]+'&pos=G,P&stat1='+SORT_BY+'&myteam=1&ajaxrequest=1'; // goaltenders & forward/defensemen
}

// "myteam"
// at least the first 25
function get_team_players_first25(url, i) { // timeout
	
	
	if (i) {
		window.setTimeout(function() {get_team_players_first25(url);}, i * 600);
		return;
	}
	
	GM_xmlhttpRequest({
		method: "GET",
		
		url: url,
		
		// on error
		onerror: function(response) {
			if (gm_xmlhttprequest_errors < gm_xmlhttprequest_errors_max) //
				get_team_players_first25(url);
			gm_xmlhttprequest_errors++;
			console.log(response);
		},
		
		//timeout: 4000,
		
		onload: function(response) {
			var rs = response.responseText;
			var f = response.finalUrl;
			var le, mtal__l, table;
			var h;
			
			//console.log(f);
			le = /^([^\.]+\.fantasysports\.yahoo\.com\/[^\/]+\/)(\d+)/.exec(f);
			if (!le) return;
			
			var status;
			status = /[&\?]status=(\d+)/.exec(f);
			//status = 'A';
			if (!status) return;
			status = status[1];
			
			mtal__l = document.getElementById(SCRIPT_NAME+le[2]);
			if (!mtal__l) return;
			mtal__l = mtal__l.getElementsByClassName('mtal__l')[0];
			if (!mtal__l) return;
			
			rs = JSON.parse(rs);
			
			// UPDATE OCT. 5, 2013
			table = /<table cellpadding="0" cellspacing="0" border="0" id="statTable0" class="teamtable" >((.|\s)*?(?=<\/table>|$)|$)/.exec(rs.content);
			if (table)
				mtal__l.innerHTML = table[0];
			else { // inside "players"
				table = /<div class="players"[^>]{0,}>[\r\n\t\s]+(<table((.|\s)*?(?=<\/table>|$)|$))/.exec(rs.content);
				mtal__l.innerHTML = table[1];
			}
			
			// next 25?
			
			if (/<a href="[^"]+">Next 25<\/a>/.exec(rs.content))
			{
				
				var u_nba;
				var u_mlb;
				var u_hck;
				var u_, url_;
				
				u_nba = 'sort=AR&sdir=1&status='+status+'&pos=P&stat1='+SORT_BY+'&myteam=1&count=25&ajaxrequest=1';
				u_mlb = 'sort=AR&sdir=1&status='+status+'&pos=B,P&stat1='+SORT_BY+'&myteam=1&count=25&ajaxrequest=1';
				u_hck = 'sort=AR&sdir=1&status='+status+'&pos=G,P&stat1='+SORT_BY+'&myteam=1&count=25&ajaxrequest=1';
				
				if  (
						SPORT == 'nba'
					)
					u_ = u_nba;
				else if
					(
						SPORT == 'mlb'
					)
					u_ = u_mlb;
				else if
					(
						SPORT == 'hck'
					)
					u_ = u_hck;
				
				url_ = le[1]+le[2]+'/players?'+u_;
				
				// func. next 25
				get_team_players_next25(url_);
				
			}
			else {
				update_row_dimensions(mtal__l);
			}
		}
	});
}
function get_team_players_next25(url) {
			
	GM_xmlhttpRequest({
		method: "GET",
		
		url: url,
		
		// on error
		onerror: function(response) {
			if (gm_xmlhttprequest_errors < gm_xmlhttprequest_errors_max) //
				get_team_players_next25(url);
			gm_xmlhttprequest_errors++;
		},
		
		onload: function(response) {
			var rs = response.responseText;
			var f = response.finalUrl;
			var le, mtal__l, table;
			var h;
			
			le = /^[^\.]+\.fantasysports\.yahoo\.com\/[^\/]+\/(\d+)/.exec(f);
			
			if (!le) return;
			
			mtal__l = document.getElementById(SCRIPT_NAME+le[1]);
			if (!mtal__l) return;
			mtal__l = mtal__l.getElementsByClassName('mtal__l')[0];
			if (!mtal__l) return;
			
			//<tbody>
			rs = JSON.parse(rs);
			table = /<tbody>((.|\s)*?(?=<\/tbody>|$)|$)/.exec(rs.content);
			
			if (table) {
				table = table[1];
				
				var x = mtal__l.getElementsByTagName('tbody');
				if (x) {
					if (x[0]) {
						if (x[0].innerHTML)
							x[0].innerHTML += table;
					}
				}
			} else {
				//
			}
			update_row_dimensions(mtal__l);
		}
	});
}
function get_available_players(url, i) {
	
	if (i) {
		window.setTimeout(function() {get_available_players(url);}, i * 600);
		return;
	}
	
	GM_xmlhttpRequest({
		method: "GET",
		
		url: url,
		
		// on error
		onerror: function(response) {
			if (gm_xmlhttprequest_errors < gm_xmlhttprequest_errors_max) //
				get_available_players(url);
			gm_xmlhttprequest_errors++;
		},
		
		onload: function(response) {
			var rs = response.responseText;
			var f = response.finalUrl;
			var le, mtal__r, table;
			var h;
			
			le = /^([^\.]+\.fantasysports\.yahoo\.com\/[^\/]+\/)(\d+)/.exec(f);
			if (!le) return;
			
			mtal__r = document.getElementById(SCRIPT_NAME+le[2]);
			if (!mtal__r) return;
			mtal__r = mtal__r.getElementsByClassName('mtal__r')[0];
			if (!mtal__r) return;
			
			rs = JSON.parse(rs);
			
			// UPDATE OCT. 5, 2013
			// OLD. THIS IS NO LONGER, STARTING IN 2013-2014 HOCKEY.
			table = /<table cellpadding="0" cellspacing="0" border="0" id="statTable0" class="teamtable" >((.|\s)*?(?=<\/table>|$)|$)/.exec(rs.content);
			if (table)
				table = table[0];
			else { // inside "players"
				table = /<div class="players"[^>]{0,}>[\r\n\t\s]+(<table((.|\s)*?(?=<\/table>|$)|$))/.exec(rs.content);
				table = table[1];
			}
			
			// title?
			if (SPORT == 'mlb')
				mtal__r.innerHTML = '<h2>Batting</h2>';
			else
				mtal__r.innerHTML = '';
				 
			mtal__r.innerHTML += table;
			
			// update table
			update_row_dimensions(mtal__r);
			
			// *********************************
			// If baseball get pitchers
			// *********************************
			
			if  (
					/^http:\/\/baseball\./.exec(f)
				)
			{
				
				var u_mlb2, url2_;
				u_mlb2 = 'sort=AR&sdir=1&status=A&pos=P&ajaxrequest=1&stat1='+SORT_BY;
				url2_ = le[1]+le[2]+'/players?'+u_mlb2;
				
				// func. get available players second set
				get_available_players_secondSet(url2_);
				
			}
			else {
				// hide mtal__r2
				mtal__r = document.getElementById(SCRIPT_NAME+le[2]);
				if (!mtal__r) return;
				mtal__r = mtal__r.getElementsByClassName('mtal__r2')[0];
				if (!mtal__r) return;
				mtal__r.style.display = 'none';
			}
				
				
		}
	});
}
function get_available_players_secondSet(url) {
	
	GM_xmlhttpRequest({
		method: "GET",
		
		url: url,
		
		// on error
		onerror: function(response) {
			if (gm_xmlhttprequest_errors < gm_xmlhttprequest_errors_max) //
				get_available_players_secondSet(url);
			gm_xmlhttprequest_errors++;
		},
		
		onload: function(response) {
			var rs = response.responseText;
			var f = response.finalUrl;
			var le, mtal__r, table;
			var h;
			
			le = /^([^\.]+\.fantasysports\.yahoo\.com\/[^\/]+\/)(\d+)/.exec(f);
			if (!le) return;
			
			mtal__r = document.getElementById(SCRIPT_NAME+le[2]);
			if (!mtal__r) return;
			mtal__r = mtal__r.getElementsByClassName('mtal__r2')[0];
			if (!mtal__r) return;
			
			rs = JSON.parse(rs);
			
			// UPDATE OCT. 5, 2013
			table = /<table cellpadding="0" cellspacing="0" border="0" id="statTable0" class="teamtable" >((.|\s)*?(?=<\/table>|$)|$)/.exec(rs.content);
			if (table)
				table = table[0];
			else { // inside "players"
				table = /<div class="players"[^>]{0,}>[\r\n\t\s]+(<table((.|\s)*?(?=<\/table>|$)|$))/.exec(rs.content);
				table = table[1];
			}

			mtal__r.innerHTML = '<h2>Pitching</h2>';
			mtal__r.innerHTML+= table;
			
			// update tables
			update_row_dimensions(mtal__r);
		}
	});
}
// *********************************
// Function update_row_dimensions(parent_div)
//  - lower the row height for better visibility
//  - remove "player notes", change "team-pos" & "player-status" to display:inline
//  - insert Yahoo player rankings (YAHOO_PLAYER_RANKS)
// *********************************
function update_row_dimensions(parent_div) {
	var j,y,z;
	var y = parent_div.getElementsByTagName('tr');
	var new_column;
	for (j in y) {
		if (!y[j].style) continue;
		
		y[j].style.borderBottom = '1px solid #ccc';
		
		z = y[j].getElementsByTagName('td');
		
		if (!z) continue;
		if (!z.length) continue;
		
		z = z[0];
		
		z.innerHTML = '<div style="width:140px;height:26px;overflow:hidden;">'+z.innerHTML+'</div>';
		
		// remove "notes"
		z = y[j].getElementsByClassName('ysf-player-note-link');
		if (z) {
			if (z[0]) {
				if (z[0].parentNode)
					z[0].parentNode.removeChild(z[0]);
			}
		}
		// change pos
		z = y[j].getElementsByClassName('ysf-player-team-pos');
		if (z) {
			if (z[0]) {
				if (z[0].style) {
					z[0].style.display = 'inline';
					z[0].innerHTML += ' ';
				}
			}
		}
		// change DL
		z = y[j].getElementsByClassName('ysf-player-status');
		if (z) {
			if (z[0]) {
				if (z[0].style) {
					z[0].style.display = 'inline';
					z[0].style.color = '#FF9999';
					z[0].style.fontWeight = 'bold';
				}
			}
		}
		
	}					
}









