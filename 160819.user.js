// ==UserScript==
// @name           Commissioner Tools - Autosort Rosters - Yahoo Fantasy Sports
// @author			David Shumway
// @description		Adds roster sorting for fantasy sports league commissioners. For use with Yahoo fantasy sports.
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
// @updateURL		http://userscripts.org/scripts/source/160819.user.js
// @downloadURL		http://userscripts.org/scripts/source/160819.user.js
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

// TODO:
// Allow roster ranking on days when one or more players on the roster have started their game for that day. Currently disabled.
// Form handlers, i.e. time period 1 less than time period 2
// Layout?
// Yahoo's API http://developer.yahoo.com/fantasysports/guide/index.html





////
// Global variables
////

var ih,
SCRIPT_NAME = 'fantasysports_yahoo_com____f5Fj1doNg6jsS8kb0oH3skO7gmPa2lpXzn8TdmNwidSdW2',
x___;


////CHROME FIX////
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}
}
function GM_addStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}
// END CHROME
function __js_inarray(array, needle) {
	for (var i in array) {
		if (array[i] == needle)
			return true;
	}
	return false;
}
function __js_escape_regEx(string) {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function __js_clean_html_str(s) {
	if (s.trim() == '') return ''; // blank
	var div = document.createElement('div');
	div.innerHTML = s;
	s = div.firstChild.nodeValue;
	return s;
}
////
// Wait for document readyState
////
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

////
// Main function
////
function init() {
	
	////
	// settings object
	////
	var __default_settingsObject = {
		weight_rank_7: 60,
		weight_rank_14: 40,
		penalty_injured: 200,
		penalty_not_active: 240,
		time_period_start: 0,	//days from today
		time_period_end: 0,	//days from today
		//players_benched:
		//players_preferred:
		leagues: '[]',
		rotisserie_injured: 1,
		rotisserie_not_active: 1,
		rotisserie_threshold: 1,
		rotisserie_threshold_amount: 160
	}
	
	var settingsObject = __default_settingsObject;
	
	if (!GM_getValue(SCRIPT_NAME+'settingsObject')) {
		GM_setValue(SCRIPT_NAME+'settingsObject', '60,40,200,240,0,0,[],1,1,1,160');
	} parse_settingsObject();
	
	////
	// parse settings object
	////
	
	function parse_settingsObject(obj) {
		var x;
		if (!obj)
			x = GM_getValue(SCRIPT_NAME+'settingsObject');
		else
			x=obj;
		x = x.split(',');
		if (x.length == 6) { // Add leagues setting to an old settingsObject. Only 0-5 existed in previous verions.
			x[6] = '';
		}
		if (x.length == 7) { // Add rotisserie setting to an old settingsObject. Only 0-6 existed in previous verions.
			x[7] = x[8] = x[9] = x[10] = '';
		}
		settingsObject.weight_rank_7				= testSettingsPart(x[0], /^\d+$/, 'weight_rank_7');
		settingsObject.weight_rank_14				= testSettingsPart(x[1], /^\d+$/, 'weight_rank_14');
		settingsObject.penalty_injured				= testSettingsPart(x[2], /^\d+$/, 'penalty_injured');
		settingsObject.penalty_not_active			= testSettingsPart(x[3], /^\d+$/, 'penalty_not_active');
		settingsObject.time_period_start			= testSettingsPart(x[4], /^\d+$/, 'time_period_start');
		settingsObject.time_period_end				= testSettingsPart(x[5], /^\d+$/, 'time_period_end');
		settingsObject.leagues						= testSettingsPart(x[6], /^\[[\d;]{0,}\]$/, 'leagues', true);
		settingsObject.rotisserie_injured			= testSettingsPart(x[7], /^[01]$/, 'rotisserie_injured');
		settingsObject.rotisserie_not_active		= testSettingsPart(x[8], /^[01]$/, 'rotisserie_not_active');
		settingsObject.rotisserie_threshold			= testSettingsPart(x[9], /^[01]$/, 'rotisserie_threshold');
		settingsObject.rotisserie_threshold_amount	= testSettingsPart(x[10], /^\d+$/,'rotisserie_threshold_amount');
	}
	
	//
	//
	//
	
	function testSettingsPart(i, e, sobj, leagues) {
		if (!leagues) {
			if (e.exec(i))
				return i*1;
			else
				return __default_settingsObject[sobj];
		}
		if (leagues) {
			if (e.exec(i))
				return i;
			else
				return __default_settingsObject[sobj];
		}
	}
	
	////
	// update settings object
	////
	
	function update_settingsObject(reset, save) {
		if (!reset) { // update settings
			var a1 =document.getElementById(SCRIPT_NAME+'__so_w7'),
				a2 =document.getElementById(SCRIPT_NAME+'__so_w14'),
				a3 =document.getElementById(SCRIPT_NAME+'__so_pi'),
				a4 =document.getElementById(SCRIPT_NAME+'__so_pa'),
				a5 =document.getElementById(SCRIPT_NAME+'__so_tp1'),
				a6 =document.getElementById(SCRIPT_NAME+'__so_tp2'),
				a7 =document.getElementById(SCRIPT_NAME+'__so_leagues'),
				a8 =document.getElementById(SCRIPT_NAME+'__so_rINJ'),
				a9 =document.getElementById(SCRIPT_NAME+'__so_rNA'),
				a10=document.getElementById(SCRIPT_NAME+'__so_rTh'),
				a11=document.getElementById(SCRIPT_NAME+'__so_rThAmt'),
				b  =document.getElementById(SCRIPT_NAME+'__sr_status');
			
			if 
			(
				!a1 ||
				!a2 ||
				!a3 ||
				!a4 ||
				!a5 ||
				!a6 ||
				!a7 ||
				!a8 ||
				!a9 ||
				!a10||
				!a11||
				!b
			)
			{
				return;
			}
			
			var l, leagues = '[';
			for (var i = 0; i < a7.options.length; i++) {
				if (a7.options[i].selected) {
					leagues += i+';';
				}
				
			}
			l = leagues.length;
			if (leagues[l-1] == ';') leagues = leagues.substr(0, l-1);
			leagues+= ']';
			
			var r1, r2, r3;
			r1 = (a8.checked) ? 1 : 0;
			r2 = (a9.checked) ? 1 : 0;
			r3 = (a10.checked)? 1 : 0;
			
			a1.value = testSettingsPart(a1.value, /^\d+$/, 'weight_rank_7');
			a2.value = testSettingsPart(a2.value, /^\d+$/, 'weight_rank_14');
			a3.value = testSettingsPart(a3.value, /^\d+$/, 'penalty_injured');
			a4.value = testSettingsPart(a4.value, /^\d+$/, 'penalty_not_active');
			a5.value = testSettingsPart(a5.value, /^\d+$/, 'time_period_start');
			a6.value = testSettingsPart(a6.value, /^\d+$/, 'time_period_start');
			leagues = testSettingsPart(leagues,  /^\[[\d;]{0,}\]$/, 'leagues', true);
			a11.value= testSettingsPart(a11.value,/^\d+$/, 'rotisserie_threshold_amount');

			var o='';
			o += a1.value+',';
			o += a2.value+',';
			o += a3.value+',';
			o += a4.value+',';
			o += a5.value+',';
			o += a6.value+',';
			o += leagues+',';
			o += r1+',';
			o += r2+',';
			o += r3+',';
			o += a11.value;

			if (save) { // overwrites GM_value -> settingsObject. then update settingsObject{}
				
				GM_setValue(SCRIPT_NAME+'settingsObject', o);	
				parse_settingsObject();
				
				// display
				
				b.innerHTML = '';
				b.appendChild(document.createTextNode('Settings saved!'));
				blink__sr_status(true);
			
			} else { // only update settingsObject{}.
				parse_settingsObject(o);
			}
		} else if (reset) { // reset settings
			var a1 =document.getElementById(SCRIPT_NAME+'__so_w7'),
				a2 =document.getElementById(SCRIPT_NAME+'__so_w14'),
				a3 =document.getElementById(SCRIPT_NAME+'__so_pi'),
				a4 =document.getElementById(SCRIPT_NAME+'__so_pa'),
				a5 =document.getElementById(SCRIPT_NAME+'__so_tp1'),
				a6 =document.getElementById(SCRIPT_NAME+'__so_tp2'),
				a7 =document.getElementById(SCRIPT_NAME+'__so_leagues'),
				a8 =document.getElementById(SCRIPT_NAME+'__so_rINJ'),
				a9 =document.getElementById(SCRIPT_NAME+'__so_rNA'),
				a10=document.getElementById(SCRIPT_NAME+'__so_rTh'),
				a11=document.getElementById(SCRIPT_NAME+'__so_rThAmt'),
				b  =document.getElementById(SCRIPT_NAME+'__sr_status');
			if
			(
				!a1 ||
				!a2 ||
				!a3 ||
				!a4 ||
				!a5 ||
				!a6 ||
				!a7 ||
				!a8 ||
				!a9 ||
				!a10||
				!a11||
				!b
			) {
				return;
			}
			
			// update & save
			
			a1.value = 60;
			a2.value = 40;
			a3.value = 200;
			a4.value = 240;
			a5.selectedIndex = 0;
			a6.selectedIndex = 0;
			for (var i in a7.options) {
				a7.options[i].selected = false;
			}
			a8.checked	= true;
			a9.checked	= true;
			a10.checked	= true;
			a11.value	= 160;
			
			GM_setValue(SCRIPT_NAME+'settingsObject', '60,40,200,240,0,0,[],1,1,1,160');
			parse_settingsObject();
			
			// display
			
			b.innerHTML = '';
			b.appendChild(document.createTextNode('Settings saved!'));
			blink__sr_status(true);
		}
	}
	
	////
	// Blink status display
	////
	
	function blink__sr_status(reset) {
		var b=document.getElementById(SCRIPT_NAME+'__sr_status');
		if (reset) {
			b.className = 'blink__st_status';
			b.style.display = 'block';
			b.style.opacity = 1.0;
			blink__sr_status();
			return;
		} else if (b.className == '') {
			return;
		} else if (b.className == 'blink__st_status') {
			x = b.style.opacity;
			x = x*1;
			x -= 0.02;
			if (x <= 0) x = 0;
			b.style.opacity = x;

			if (x > 0) {
				window.setTimeout(function() { blink__sr_status(); }, 400);
			} else {
				b.className = '';
				b.style.display = 'none';
				return;
			}
		}
	}
	
	/*
	 * Attach to document
	 *
	 *  
	 */
	
	var o,p,q,r;
	
	o = document.getElementById('sitenavsub');
	if (o) { // update class -> Navitem last
		var x;
		x = o.getElementsByTagName('li');
		if (x) {
			x[x.length - 1].className = 'Navitem';
		}
	}
	
	if (!o) return;
	
	// Add listed item
	p = document.createElement('li');
	p.setAttribute('id', SCRIPT_NAME+'__p');
	p.setAttribute('class', 'Navitem last'); // setAttribute class is -> Navitem last
	p.setAttribute('style', 'margin-left: 6px;'); // setAttribute class is -> Navitem last
	
	// append listed item to nav ul
	o.appendChild(p);
	p = document.getElementById(SCRIPT_NAME+'__p');
	
	// add link to listed item
	r = document.createElement('a');
	r.setAttribute('id', SCRIPT_NAME+'__q');
	r.setAttribute('style', 'cursor: pointer;');
	r.appendChild(document.createTextNode('Commish Tools')); // link text
	p.appendChild(r); // append text to listed item
	
	// global variable "q"
	q = document.getElementById(SCRIPT_NAME+'__q');
	
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
			o = document.getElementById('sitenavsub');
			
			//
			//This is deprecated as of Jul 18 2013 
			//
			//x = document.getElementById('sitenavsub');
			//if (x) {
			//	x = x.getElementsByTagName('ul');
			//	if (x) {
			//		o = x[0];
			//	}
			//}
		}
	}*/
	
	/*
	 * New listed item.onclick
	 * 
	 * 
	 */
	// TODO:
	// add onclick
	// or run auto from href / bookmark
	
	q.onclick = function() {

		////
		// TODO: clear auto if set
		////
		
		/*
		 * Styles
		 */
		
		var b, h;
		b = document.body, c = document.documentElement; //height
		h = Math.max(b.scrollHeight, b.offsetHeight, c.clientHeight, c.scrollHeight, c.offsetHeight); //height
		h += 'px'; //height

GM_addStyle('div#'+SCRIPT_NAME+'__r  {background-color: #665544;opacity: 0.6;filter: alpha(opacity=60);position: absolute;top: 0;left: 0;width: 100%;height: '+h+';z-index:100000000;}');
GM_addStyle('div#'+SCRIPT_NAME+'__r2 {background-color: none;opacity: 0.98;filter: alpha(opacity=98);position: absolute;top: 0;left: 0;width: 100%;height: 840px;margin-top: 8px; z-index:100000001;}');
GM_addStyle('div.__s1 {background-color: #F9EFFE; float: left; width: 48%; padding: 10px 4px 10px 4px;}');
GM_addStyle('div.__s2 {background-color: #F9EFFE; float: left; width: 48%; padding: 10px 4px 10px 4px;}');
GM_addStyle('div.__text-left {text-align: left;}');
GM_addStyle('#'+SCRIPT_NAME+'l>div.__s1 {width: 30%; margin-top: 1px; margin-bottom: 1px; padding-top: 0; padding-bottom: 0;}');
GM_addStyle('#'+SCRIPT_NAME+'l>div.__s2 {width: 66%; margin-top: 1px; margin-bottom: 1px; padding-top: 0; padding-bottom: 0;}');
GM_addStyle('#'+SCRIPT_NAME+'l>hr {margin-top: 1px; margin-bottom: 1px; padding-top: 0; padding-bottom: 0;}');
GM_addStyle('div#'+SCRIPT_NAME+'__output {width: 100%; height: 400px; overflow: auto;}');//700
		
		////
		// Leagues object {}
		// Add team name to leagues. Skip leagues not yet assigned (url == /leagueId (teamName n/a)).
		// League not yet assigned is xxx/leagueId rather than xxx/leagueId/teamId
		////
		
		// HIDE PRE-DRAFT TEAMS TABLE
		// Oct. 5, 2013
		// span[0].innerHTML = 'Pre-Draft Teams'
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
		
		/**
		 * New front page layout. Get leagues.
		 * Oct. 20, 2013
		**/
		var leagues = new Object();
		
		// Head to Head
		// __js_clean_html_str() -> decode HTML characters
		// 0 = full str.
		// 1 = league url (/hockey/1444)
		// 2 = league name
		// 3 = 
		// 4 = ' '
		// 5 = team url (/hockey/1444/7)
		// 6 = team name
		var x = /<h3 class="[^"]+"><a href="([^"]+)">([^<]+)<\/a><\/h3>((.|\s)*?(?=<div class=.Fz-sm.><a[\s]+href="([^"]+)">([^<]+)<\/a>|$)|$)/g;
		var m;
		var location = document.location.href.replace(/^(https?:\/\/[^\/]+)[^$]+/i, '$1');
		while (m = x.exec(document.body.innerHTML)) {
			m[1] = location + __js_clean_html_str(m[1]);
			leagues[m[1]] = new Object();
			leagues[m[1]].leagueName		= __js_clean_html_str(m[2]); 
			leagues[m[1]].leagueType		= 'h2h';
			leagues[m[1]].url				= location + __js_clean_html_str(m[5]); // NOTE: this is the team's URL (full including domain)
			leagues[m[1]].teamName			= __js_clean_html_str(m[6]);
			leagues[m[1]].num_teams_in_league = 0; // (unnecessary) .get_teams_in_league
		}
		// Rotisserie
		var a = document.getElementsByClassName('Block Fz-sm');
		var x;
		var j;
		for (var i in a) {
			if (!a[i]) continue;
			if (!a[i].parentNode) continue;
			if (!a[i].parentNode.innerText) continue;
			if (a[i].parentNode.innerText.indexOf('League:') == -1) continue;
			x = a[i].parentNode.getElementsByTagName('a');
			if (!x) continue;
			if (!x[1].innerHTML || x.length != 2) continue;
			j = x[1].href;
			leagues[j] = new Object();
			leagues[j].leagueName	= x[1].innerHTML; // [[ XXXX href = "/nba/\d" or "/nba/auto/\d XXXX ]]
			leagues[j].leagueType	= 'rotisserie';
			leagues[j].url			= a[i].href; // NOTE: this is the team's URL (full including domain)
			leagues[j].teamName		= a[i].innerText;
			leagues[j].num_teams_in_league = 0; // (unnecessary) .get_teams_in_league
		}
		
		/*
		 * old
		var leagues = new Object(),
			teams,
			l, // table rows, contain leagues
			t;
		
		l = document.getElementsByClassName('league');
		if (!l.length)
			l = document.getElementsByClassName('row');
		if (!l.length) {
			var l_, i;
			l_ = document.getElementsByTagName('tr');
			l = [];
			for (i in l_) {
				if (!l_[i]) continue;
				if (!l_[i].innerHTML) continue;
				if (l_[i].innerHTML.indexOf('>League:<') != -1) {
					l.push(l_[i]);
				}
			}
		}
		
		var drafted;
		var i, x, y;
		var is_rt;
		for (i in l) {
			if (!l[i]) continue;
			if (!l[i].innerHTML) continue;
			
			x = l[i].getElementsByTagName('a');
			if (!x) continue;
			if (!x[0]) continue;
			if (!x[0].innerHTML) continue;
			
			drafted = l[i].parentNode.parentNode;
			drafted = drafted.getElementsByTagName('thead')[0];
			drafted = (drafted.innerHTML.indexOf('Pre-Draft Teams') == -1) ? true : false;
			
			is_rt = l[i].parentNode.parentNode;
			is_rt = is_rt.getElementsByTagName('thead')[0];
			is_rt = (is_rt.innerHTML.indexOf('Teams - Rotisserie') != -1) ? true : false;
			
			if (drafted) {
				
				y = /<span class="yfa-stat-val">\d+ of (\d+)<\/span>/.exec(l[i].innerHTML); // num teams
				y = (y) ? y[1] : 0;
				
				leagues[x[1].href] = new Object();
				leagues[x[1].href].leagueName			= x[1].innerHTML; // href = "/nba/\d" or "/nba/auto/\d
				leagues[x[1].href].leagueType			= (is_rt) ? 'rotisserie' : 'h2h';
				leagues[x[1].href].url					= x[0].href; // NOTE!! : this is the team's URL !!
				leagues[x[1].href].teamName				= x[0].innerHTML;
				leagues[x[1].href].num_teams_in_league	= y; // (unnecessary) .get_teams_in_league
			}
		}*/
		
		////
		// Display
		////
		
		////
		// Create element function
		////
		
		function out__(i_, id_, style_, class_, value_) {
			var x;
			x = document.createElement(i_);
			if (id_) {
				x.setAttribute('id', id_);
			}
			if (style_) {
				x.setAttribute('style', style_);
			}
			if (class_) {
				x.setAttribute('class', class_);
			}
			if (value_) {
				x.setAttribute('value', value_);
			}
			return x;
		}
		
		////
		// leagues select field
		////
		
		var i,
			c = 0,
			l = settingsObject.leagues.replace(/[\[\]]/g, ''),
			l_;
		l = l.split(';'); //[]
		
		var out_select_league, out_select_league_option, opt_text;
		var out_option;
		var olt;
		
		out_select_league = document.createElement('select');
		out_select_league.setAttribute('id', SCRIPT_NAME+'__so_leagues');
		out_select_league.setAttribute('size', 6);
		out_select_league.setAttribute('multiple', true);
		out_select_league.setAttribute('style', 'width: 100%;');
		
		var x;
		for (var i in leagues) {
			out_option = document.createElement('option');
			out_option.setAttribute('value', i); // league url (not league & team url)
			x = (leagues[i].leagueType == 'rotisserie') ? '*' : '';
			olt = document.createTextNode(leagues[i].leagueName + x);
			out_option.appendChild(olt);
			out_select_league.appendChild(out_option);

			if (__js_inarray(l, c) && l[0] != '') // is selected?
				out_select_league.options[out_select_league.options.length - 1].selected = true;
			c++;
		}
		if (c == 0) {
			out_select_league.setAttribute('disabled', true);
			olt = document.createElement('option');
			olt.appendChild(document.createTextNode('No leagues found!'));
			out_select_league.appendChild(olt);
		}
		
		////
		// Time periods
		////
		
		var out_select_tp1, out_select_tp2;
		out_select_tp1 = makeSelect('time_period_start');
		out_select_tp2 = makeSelect('time_period_end');
		out_select_tp1.setAttribute('id', SCRIPT_NAME+'__so_tp1');
		out_select_tp2.setAttribute('id', SCRIPT_NAME+'__so_tp2');
		
		for (var i in out_select_tp1.options) {
			if (out_select_tp1.options[i].value == settingsObject.time_period_start) {
				out_select_tp1.options[i].selected = true;
				break;
			}
		}
		for (var i in out_select_tp2.options) {
			if (out_select_tp2.options[i].value == settingsObject.time_period_end) {
				out_select_tp2.options[i].selected = true;
				break;
			}
		}
		
		function makeSelect(m) {
			var sl, so;
			sl = document.createElement('select');
			so = makeSelect_option(0, 'Today'+makeDate(0));
			sl.appendChild(so);
			so = makeSelect_option(1, 'Tomorrow'+makeDate(1));
			sl.appendChild(so);
			for (var i = 2; i <= 13; i++) {
				so = makeSelect_option(i, i+' days from today'+makeDate(i));
				sl.appendChild(so);
			}
			//so = makeSelect_option(7, '1 week from today'+makeDate(7));
			//sl.appendChild(so);
			for (var i = 14; i <= 56; ) {
				so = makeSelect_option(i, i/7+' weeks from today'+makeDate(i));
				sl.appendChild(so);
				i += 14;
			}
			
			return sl;
			
			function makeSelect_option(value, textNode) {
				var so;
				so = document.createElement('option');
				so.setAttribute('value', value);
				so.appendChild(document.createTextNode(textNode));
				return so;
			}
			function makeDate(days) {
				var d = new Date();
				var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
				d.setTime(d.getTime()*1 + (86400*1000*days)); //
				return ' ('+months[d.getMonth()]+' '+d.getDate()+')';
			}
		}
		
		////
		// Other form fields
		////
		
		var out_input_closeMe	= document.createElement('input');
			out_input_closeMe.setAttribute('id', SCRIPT_NAME+'__closeWindow');
			out_input_closeMe.setAttribute('type', 'button');
			out_input_closeMe.setAttribute('value', 'Close Window!');
			
		var out_input_pi		= document.createElement('input');
			out_input_pi.setAttribute('id', SCRIPT_NAME+'__so_pi');
			out_input_pi.setAttribute('type', 'text');
			out_input_pi.setAttribute('size', '6');
			out_input_pi.setAttribute('value', settingsObject.penalty_injured);
			
		var out_input_pa		= document.createElement('input');
			out_input_pa.setAttribute('id', SCRIPT_NAME+'__so_pa');
			out_input_pa.setAttribute('type', 'text');
			out_input_pa.setAttribute('size', '6');
			out_input_pa.setAttribute('value', settingsObject.penalty_not_active);
			
		var out_input_w7		= document.createElement('input');
			out_input_w7.setAttribute('id', SCRIPT_NAME+'__so_w7');
			out_input_w7.setAttribute('type', 'text');
			out_input_w7.setAttribute('size', '6');
			out_input_w7.setAttribute('value', settingsObject.weight_rank_7);
			
		var out_input_w14		= document.createElement('input');
			out_input_w14.setAttribute('id', SCRIPT_NAME+'__so_w14');
			out_input_w14.setAttribute('type', 'text');
			out_input_w14.setAttribute('size', '6');
			out_input_w14.setAttribute('value', settingsObject.weight_rank_14);
		
		var out_input_rINJ		= document.createElement('input');
			out_input_rINJ.setAttribute('id', SCRIPT_NAME+'__so_rINJ');
			out_input_rINJ.setAttribute('type', 'checkbox');
		
		var out_input_rNA		= document.createElement('input');
			out_input_rNA.setAttribute('id', SCRIPT_NAME+'__so_rNA');
			out_input_rNA.setAttribute('type', 'checkbox');
		
		var out_input_rTh		= document.createElement('input');
			out_input_rTh.setAttribute('id', SCRIPT_NAME+'__so_rTh');
			out_input_rTh.setAttribute('type', 'checkbox');
		
		var out_input_rThAmt	= document.createElement('input');
			out_input_rThAmt.setAttribute('id', SCRIPT_NAME+'__so_rThAmt');
			out_input_rThAmt.setAttribute('type', 'text');
			out_input_rThAmt.setAttribute('size', '6');
			out_input_rThAmt.setAttribute('value', settingsObject.rotisserie_threshold_amount);
			out_input_rThAmt.setAttribute('style', 'position:absolute; margin-left:8px;');
			
		var out_input_save		= document.createElement('input');
			out_input_save.setAttribute('id', SCRIPT_NAME+'__save_settings');
			out_input_save.setAttribute('type', 'button');
			out_input_save.setAttribute('value', 'Save Current Settings');
		
		var out_input_reset		= document.createElement('input');
			out_input_reset.setAttribute('id', SCRIPT_NAME+'__reset_settings');
			out_input_reset.setAttribute('type', 'button');
			out_input_reset.setAttribute('value', 'Reset Settings to Default Settings');
		
		var out_input_run		= document.createElement('input');
			out_input_run.setAttribute('id', SCRIPT_NAME+'__run');
			out_input_run.setAttribute('type', 'button');
			out_input_run.setAttribute('value', 'Run!');
		
		// Rotisserie checkboxes / disabled
		if (settingsObject.rotisserie_injured === 1) {
			out_input_rINJ.checked = true;
		}
		if (settingsObject.rotisserie_not_active === 1) {
			out_input_rNA.checked = true;
		}
		if (settingsObject.rotisserie_threshold === 1) {
			out_input_rTh.checked		= true;
			out_input_rThAmt.disabled	= false;
		} else {
			out_input_rThAmt.disabled	= true;
		}
		
		////
		// Ouput display
		////
			
		var r, r2, r3, r4;
		
		// The dimmer
		r = out__('div',SCRIPT_NAME+'__r');
		document.body.appendChild(r);
		
		// The container
		r = out__('div',SCRIPT_NAME+'__r2');
		document.body.appendChild(r);
		r = document.getElementById(SCRIPT_NAME+'__r2');
		
		// Second container
		r2 = out__('div',SCRIPT_NAME+'__r2_','width: 99%; height: 99%; margin-left: auto; margin-right: auto; background-color: white; text-align: center;');
		r.appendChild(r2);
		r2 = document.getElementById(SCRIPT_NAME+'__r2_');
		
		r2.appendChild(out__('hr'));
		
		// Program title
		r3 = out__('h1',0,'width: 100%;font-size: 1.2em; font-weight: 900;');
		r3.appendChild(document.createTextNode('Commissioner Tools - Sort Rosters'));
		r2.appendChild(r3);
		
		r2.appendChild(out_input_closeMe);
		
		r2.appendChild(out__('hr'));
		
		// START LEFT
		r3 = out__('div',SCRIPT_NAME+'l','border-right: thick double #ff0000;margin-left: 2px;','__s1');
		r2.appendChild(r3);
		r3 = document.getElementById(SCRIPT_NAME+'l');
		
		// Settings title
		r4 = out__('h3',0,'width: 100%; margin-left: auto; margin-right: auto;');
		r4.appendChild(document.createTextNode('Settings'));
		r3.appendChild(r4);
		
		r3.appendChild(out__('hr'));
		
		// Status
		r4 = out__('div',SCRIPT_NAME+'__sr_status','display:none; border:3px solid #00FFFF;');
		r3.appendChild(r4);
		
		// Penalties
		r3.appendChild(document.createTextNode('Penalties'));
		
		r3.appendChild(out__('br'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Injured penalty:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_input_pi);
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Not Active penalty:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_input_pa);
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 90%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('NOTE: Injured penalty applies to: INJ, IR (Hockey), DTD (Hockey), and DL (baseball).'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Increase the ranking of any player with statuses of "Injured" or "Not Active". Player ranking is low to high with best players having the lowest ranking. Increase these penalities to decrease the chance of an injured or not active player being in your starting line-up.'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Defaults: Injured (200), Not Active (240)'));
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		// Weighting
		r3.appendChild(out__('hr'));
		
		r3.appendChild(document.createTextNode('Weighting'));
		
		r3.appendChild(out__('br'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Last 7 days weight percentage:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_input_w7);
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Last 14 days weight percentage:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_input_w14);
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 90%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('Set preference given to the 7- and 14-day rankings.'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Ex: Sort players only by their 7-day ranking: enter 100 for the 7-day weighting and 0 for the 14-day weighting.'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Ex: Sort players only by their 14-day ranking: enter 100 for the 14-day weighting and 0 for the 7-day weighting.'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Ex: Sort players evenly: set both 7- and 14-day weightings to 50.'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Defaults: 7-day weighting (60), 14-day weighting (40)'));
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		// Time Period
		r3.appendChild(out__('hr'));
		
		r3.appendChild(document.createTextNode('Time Period'));
		
		r3.appendChild(out__('br'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Time Period Start:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_select_tp1);//id = __so_tp1
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Time Period Start:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_select_tp2);//id = __so_tp2
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 90%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('Set the Starting and Ending time period.'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Defaults: Time Period Start (Today), Time Period End (Today)'));
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		// Rotisserie options
		r3.appendChild(out__('hr'));
		
		r3.appendChild(document.createTextNode('Rotisserie League Options'));
		
		r3.appendChild(out__('br'));
		
		r4 = out__('div',0,'width: 60%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('Always bench players in the following situations:'));
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 40%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('Player is injured:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,'width: 54%;','__s2 __text-left');
		r4.appendChild(out_input_rINJ);//chk
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 40%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('Player is not active:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,'width: 54%;','__s2 __text-left');
		r4.appendChild(out_input_rNA);//chk
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 40%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('Player\'s weighted rank is above:'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,'width: 54%;','__s2 __text-left');
		r4.appendChild(out_input_rTh);//chk
		r4.appendChild(out_input_rThAmt);//input
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		r4 = out__('div',0,'width: 90%;','__s1 __text-left');
		r4.appendChild(document.createTextNode('NOTE: Injured status applies to: INJ, IR (Hockey), DTD (Hockey), and DL (baseball).'));
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		// Leagues
		r3.appendChild(out__('hr'));
		
		r3.appendChild(document.createTextNode('Leagues'));
		
		r3.appendChild(out__('br'));
		
		r4 = out__('div',0,0,'__s1 __text-left');
		r4.appendChild(document.createTextNode('Select Leagues:'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('Multiple leagues allowed. Hold Ctrl-button or Shift-button to select multiple leagues.'));
		r4.appendChild(out__('br'));
		r4.appendChild(out__('br'));
		r4.appendChild(document.createTextNode('NOTE: * denotes rotisserie leagues.'));
		r3.appendChild(r4);
		
		r4 = out__('div',0,0,'__s2 __text-left');
		r4.appendChild(out_select_league);//id = __so_leagues
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		
		// Settings & Run
		r3.appendChild(out__('hr'));
		
		r3.appendChild(out__('br'));
		
		r4 = out__('div',0,'width:46%; border-right: 3px double #ff6600; margin-right: 2px;','__s1');
		r4.appendChild(out_input_save);
		r4.appendChild(out__('br'));
		r4.appendChild(out_input_reset);
		r3.appendChild(r4);
		
		r4 = out__('div',0,'width: 46%;','__s2');
		r4.appendChild(out_input_run);
		r3.appendChild(r4);
		r3.appendChild(out__('br',0,'clear:both;'));
		// END LEFT
		
		// START RIGHT
		r3 = out__('div',SCRIPT_NAME+'__right','overflow:auto; float:right; border-right: thick double #ff0000;','__s1');
		r2.appendChild(r3);
		r3 = document.getElementById(SCRIPT_NAME+'__right');
		
		// Output title
		r4 = out__('h3',0,'width: 100%; margin-left: auto; margin-right: auto;');
		r4.appendChild(document.createTextNode('Output'));
		r3.appendChild(r4);
		
		r3.appendChild(out__('hr'));
		
		// Output div
		r4 = out__('div',SCRIPT_NAME+'__output',0,'__text-left');
		r3.appendChild(r4);
		// END RIGHT
		
		// Clear left & right
		r2.appendChild(out__('br',0,'clear:both;'));
		
		
		////
		// Buttons and other events
		////
		
		var s = document.getElementById(SCRIPT_NAME+'__so_rTh'); // Enable / Disable rotisserie threshold
		s.onclick = function() {
			var t = document.getElementById(SCRIPT_NAME+'__so_rThAmt');
			if (this.checked) t.disabled = false;
			else t.disabled = true;
		}
		var s = document.getElementById(SCRIPT_NAME+'__closeWindow'); // Close window
		s.onclick = function() {
			__closeWindow();
		}
		var s = document.getElementById(SCRIPT_NAME+'__r'); // Close window
		s.onclick = function() {
			__closeWindow();
		}
		var s = document.getElementById(SCRIPT_NAME+'__save_settings');
		s.onclick = function() {
			this.disabled = true;
			update_settingsObject(false, true);
			this.disabled = false;
		}
		var s = document.getElementById(SCRIPT_NAME+'__reset_settings');
		s.onclick = function() {
			this.disabled = true;
			update_settingsObject(true);
			this.disabled = false;
		}
		var s = document.getElementById(SCRIPT_NAME+'__run');
		s.onclick = function() {
			this.disabled = true;
			
			var w = [];
			var a = document.getElementById(SCRIPT_NAME+'__so_leagues');
			for (var i in a.options) {
				if (a.options[i].selected)
					w.push(a.options[i].value); // league urls
			}
			
			update_settingsObject(false, false); // !reset !save
			
			x___ = new sortRosterByRanking(w, leagues);
			
			x___.init();

			this.disabled = false;
		}
		//
		// check run auto (from href / bookmark)
		//
		//if () {
			//q.click();
		//}
		//console.log('x');
		return false;
	}
	function __closeWindow() {
		x___ = '';
		var n=document.getElementById(SCRIPT_NAME+'__r');
		if (n)
			n.parentNode.removeChild(n);
		var n=document.getElementById(SCRIPT_NAME+'__r2');
		if (n)
			n.parentNode.removeChild(n);
	}
	
	//
	// run auto
	// from href or bookmark
	// q & d -> do click()
	//
	//if () {
		//q.click();
	//}
	
	
	
	//////////////////////////
	//
	//
	//
	// do run
	//
	//
	//
	//////////////////////////
	
	var sortRosterByRanking = function(leagues_selected, leagues) { // array of selected league urls, array all leagues
		
		//////////////////////////
		// Variables
		//////////////////////////
		
		this.error,
		this.league,
		this.crumb = false,
		this.date,
		this.days,
		this.league,
		this.leagues_selected = leagues_selected,
		this.today,
		this.daysLength = settingsObject.time_period_end - settingsObject.time_period_start,
		this.output = document.getElementById(SCRIPT_NAME+'__output'),
		this.timer = 0,
		this.leagues = leagues,
		this.currentLeague,
		this.output_slider_interval = false,
		this.teams_in_league = {},
		this.currentTeamInLeague = 0,
		this.allPlayerRankings_object = {},
		this.currentDownloadedPage = '';
		
		this.output.innerHTML = ''; // clear output text
		
		this.make_GM_xmlhttpRequest_timeout; // setTimeout
		
		this.xhr_timeout = 8000; // time to wait before trying another xhr request (giving up)
		
		this.xhr_requests_completed_byID = []; // array of completed xhr requests
		
		this.XMLHTTPREQUEST_ERRORS = 0;

		this.XMLHTTPREQUEST_ERRORS_MAX = 200;
		
		this.xhr_backoff_rate = 50;
		
		this.init = function() {
			
			// reset crumb
			x___.crumb = false;
			
			if (!this.leagues_selected.length) {
				this.outputAddHTML(0,'br');
				this.outputAddHTML(0,0,'All leagues have completed!');
				this.outputAddHTML(0,'br');
				return;
			}
			
			this.league = this.leagues_selected.shift();
			this.days = 0;

			for (var i in this.leagues) {
				if (i == this.league) {
					this.currentLeague = i;
					break;
				}
			}
			
			this.outputAddHTML(0,'br');
			this.outputAddHTML(1,'span','Starting league: '+ this.leagues[this.currentLeague].leagueName,'font-weight:bold;text-decoration:underline;');
			this.outputAddHTML(0,'br');
			
			this.outputAddHTML(0,0,'League URL: '+this.league);
			this.outputAddHTML(0,'br');
			
			// get teams in league
			if (!this.teams_in_league.length) {
				this.get_teams_in_league();
			} else {
				// crumb
				if (!this.crumb)
					this.getCrumb();
				else
					this.nextDay();
			}
		}
		
		/**
		 * Function get_teams_in_league
		 */
		this.get_teams_in_league = function() {
			// Oct.'13 new layout- all "Grid-u" within id="leaguestandings"
			// Aug.'13 new layout- <a class="Grid-u" href="/[]/#/#">X</a> // Exception is []/#/transactions">View All
			// Jul.'13 old layout- <td class="yfa-td-team"><a  href="
			// Jun.'13 old layout- <td class="team"><a  href="
			GM_xmlhttpRequest({
				method: "GET",
				url: this.league,
				onload: function(response) {
					var rs = response.responseText;
					var rg, m, count = 0;
					var sc;
					
					sc = /<section id="leaguestandings"[^>]*>((.|\s)*?(?=<\/section>|$)|$)/.exec(rs);
					if (!sc) {
						console.log('');
						return;
					}
					sc = sc[1];
					
					rg = /<a class="Grid-u" href="([^"]+)">([^<]+)<\/a>/g;
					while (m = rg.exec(sc)) {
						if  (
							!x___.teams_in_league[m[1]] &&
							/\/\d+$/.exec(m[1]) // ends with team's ID #
							)
						{
							x___.teams_in_league[m[1]]			= {};  // url
							x___.teams_in_league[m[1]].name		= m[2];// name
							x___.teams_in_league[m[1]].team_num	= /\/(\d+)$/.exec(m[1])[1];// num
							count++;
						}
					}
					x___.leagues[x___.currentLeague].num_teams_in_league = count; // !count
					// crumb
					if (!x___.crumb)
						x___.getCrumb();
					else
						x___.nextDay();
					/*
					 * old
					 *
					rg = /<a class="Grid-u" href="([^"]+)">([^<]+)<\/a>/g;
					while (m = rg.exec(rs)) {
						if  (
							!x___.teams_in_league[m[1]] &&
							/\/\d+$/.exec(m[1]) // ends with team's ID #
							)
						{
							x___.teams_in_league[m[1]]			= {};  // url
							x___.teams_in_league[m[1]].name		= m[2];// name
							x___.teams_in_league[m[1]].team_num	= /\/(\d+)$/.exec(m[1])[1];// num
							count++;
						}
					}*/
				}
			});
		}
		
		this.get_team_num = function(n) {
			var count=0;
			for (var i in this.teams_in_league) {
				if (count == n) {
					return this.teams_in_league[i].team_num;
				}
				count++;
			}
		}
		
		this.get_team_name = function(n) {
			var count=0;
			for (var i in this.teams_in_league) {
				if (count == n) {
					return this.teams_in_league[i].name;
				}
				count++;
			}
		}
		
		// (isContainer /0,tagName /0,textNode /0)
		this.outputAddHTML = function(isContainer, tagName, textNode, style_) {
			
			var x;
			if (isContainer) {
				x = document.createElement(tagName);
				if (style_) x.setAttribute('style', style_);
				if (textNode) x.appendChild(document.createTextNode(textNode));
				this.output.appendChild(x);
			} else if (tagName) {
				x = document.createElement(tagName);
				this.output.appendChild(x);
			} else if (textNode) {
				x = document.createTextNode(textNode);
				this.output.appendChild(x);
			}
			
			// remove old focuser
			if (this.output_slider_interval) {
				clearInterval(this.output_slider_interval);
				var n = document.getElementById(SCRIPT_NAME+"__output_focus_container");
				if (n)
					this.output.removeChild(n);
			}
			
			// focus the page at bottom of this.output
			var x,y;
			x = document.createElement('input');
			x.setAttribute('id',SCRIPT_NAME+'__output_focus');
			x.setAttribute('type','button');
			x.setAttribute('style','width:0; height:0; opacity: 0;');//all are _one_ line only
			y = document.createElement('div');
			y.setAttribute('id',SCRIPT_NAME+'__output_focus_container');
			y.setAttribute('style','position:relative; margin-top:-600px; width:0; height:0; opacity: 0;');//_one_ line only
			y.appendChild(x);
			this.output.appendChild(y);
			
			this.output_slider_interval = window.setInterval(function() {
				var n,x,y;
				n = document.getElementById(SCRIPT_NAME+"__output_focus_container");
				x = n.style.marginTop.replace(/px/, '');
				x*= 1;
				if (x < 100) { // >0. Try >100.
					x+= 8;
					y = document.getElementById(SCRIPT_NAME+"__output_focus_container");
					y.style.marginTop = x+'px';
					n = document.getElementById(SCRIPT_NAME+"__output_focus");
					n.focus();
					n.blur();
				} else
					clearInterval(x___.output_slider_interval);
			}, 20); // 10. Try 20.
		}
		
		this.startTimer = function() {
			var x = new Date();
			this.timer = x.getTime(); //ms
		}
		
		this.stopTimer = function() {
			var x = new Date();
			x = x.getTime(); //ms
			this.outputAddHTML(0,0,'This day took '+ ((x - this.timer)/1000) +' seconds to complete');
			this.outputAddHTML(0,'br');
			this.timer = 0;
		}
		
		/*/
		 * 
		 * make_GM_xmlhttpRequest
		 * 
		/*/
		
		this.make_GM_xmlhttpRequest = function(url, returnFunction, GET_Request, data) {
			
			var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			var r = '';
			var i;
			for (i = 0; i < 10; i++) {
				r += chars[Math.floor(Math.random()*chars.length)];
			}
			
			x___.make_GM_xmlhttpRequest_withRUI(url, returnFunction, GET_Request, data, r);
			
		}
		
		this.make_GM_xmlhttpRequest_withRUI = function(url, returnFunction, GET_Request, data, request_unique_identifier) {
			
			// is this complete?
			if (__js_inarray(x___.xhr_requests_completed_byID, request_unique_identifier)) {
				return;
			}
		
			// get instead of post
			// GET http://baseball.fantasysports.yahoo.com/b1/5810/18/editroster?yspglobalform=&date=2013-06-16&crumb=KC94wdftAii&jsubmit=submit%20changes&ret=dnd&8723=3B&8082=OF&8475=P

			// XMLHttpRequest is needed as GM_xmlhttpRequest does
			// not have timeout functionality.
			var xhr = new XMLHttpRequest();
			
			
			// Set a timeout for the request.
			// Do this first.
			x___.make_GM_xmlhttpRequest_timeout = window.setTimeout(function() {
				
				// try abort?
				xhr.abort();
				
				// add display?
				x___.outputAddHTML(0,0,' Failed (trying again).'); console.log(url);
				
				// increment error
				x___.XMLHTTPREQUEST_ERRORS++;
				
				// increment timeout period
				x___.xhr_timeout += x___.xhr_backoff_rate;
						
				// try again
				if (x___.XMLHTTPREQUEST_ERRORS < x___.XMLHTTPREQUEST_ERRORS_MAX)
					x___.make_GM_xmlhttpRequest_withRUI(url, returnFunction, GET_Request, data, request_unique_identifier);
				
			}, x___.xhr_timeout);
			
			
			//
			if (GET_Request) {
				
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4 && xhr.status == 200){
						//console.log(xhr);
						if (!__js_inarray(x___.xhr_requests_completed_byID, request_unique_identifier)) {
							
							// clear timeout
							clearTimeout(x___.make_GM_xmlhttpRequest_timeout);
						
							// add to array
							x___.xhr_requests_completed_byID.push(request_unique_identifier);
							
							// run next
							returnFunction(xhr);
							
						}
					}
				};
				
				xhr.open('GET', url, true);
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  // Tells server that this call is made for ajax purposes.
				
				xhr.timeout = x___.xhr_timeout;
				xhr.ontimeout = function () { console.log('Timed out'); }
				
				xhr.send(null);
			}
			else { // post
				//console.log(data);
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4 && xhr.status == 200){
						console.log(xhr);
						if (!__js_inarray(x___.xhr_requests_completed_byID, request_unique_identifier)) {
							
							// clear timeout
							clearTimeout(x___.make_GM_xmlhttpRequest_timeout);
						
							// add to array
							x___.xhr_requests_completed_byID.push(request_unique_identifier);
							
							// run next
							returnFunction(xhr);
							
						}
					}
				};
				
				xhr.open('POST', url, true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				
				xhr.timeout = x___.xhr_timeout;
				xhr.ontimeout = function () { console.log('Timed out'); }
				
				xhr.send(data);
			}
		}
		
		/*/
		 * 
		 * getCrumb
		 * 
		/*/
		
		this.getCrumb = function() {
			
			// crumb is at basketball.fantasysports.yahoo.com/nba/66227/3/commisheditroster
			this.outputAddHTML(0,0,'Downloading "crumb": ');
			
			var u = this.league+'/'+this.get_team_num(this.currentTeamInLeague)+'/commisheditroster';
			
			//console.log(u);
			
			x___.make_GM_xmlhttpRequest(u, x___.getCrumb_GM_complete, true, null);
		}
		
		this.getCrumb_GM_complete = function(response) {
			
			var rs = response.responseText;
			
			var c = /<input type="hidden" name="crumb" value="([^"]+)/.exec(rs);
			if (!c) {
				if (rs.indexOf('You are not the commissioner of this league.') != -1) {
					x___.outputAddHTML(0,'br');
					x___.outputAddHTML(1,'span','Error! Response is: "You are not the commissioner of this league."','color: red;');
					x___.outputAddHTML(0,'br');
					x___.outputAddHTML(0,0,'Moving to next league.');
					x___.outputAddHTML(0,'br');
					x___.init(); // next league
				}
				return;//
			} else x___.crumb = c[1];
			
			x___.outputAddHTML(0,0,'Complete!');
			x___.outputAddHTML(0,'br');
			x___.nextDay();
		}
		
		/*/
		 * 
		 * nextDay
		 * 
		/*/
		
		this.nextDay = function() {
			
			// Debug
			/*
				console.log(this.currentTeamInLeague);
				console.log(this.leagues[this.currentLeague].num_teams_in_league);
			//*/	
			
			//
			// Debug for one team only!
			//
			/*
				var x = this.get_team_name(this.currentTeamInLeague);
				while (x != 'GiantS-Unit' && this.currentTeamInLeague <= 20) {
					this.currentTeamInLeague++;
					x = this.get_team_name(this.currentTeamInLeague);
				}
				if (x != 'GiantS-Unit') return;
			//*/
			
			
			if (this.timer) { // > 0
				this.stopTimer();
			}
			if (this.days > this.daysLength) { // completed
				this.outputAddHTML(0,'br');
				this.outputAddHTML(0,0,'Completed team '+this.get_team_name(this.currentTeamInLeague)+'!');
				this.currentTeamInLeague++;
				if (this.currentTeamInLeague >= this.leagues[this.currentLeague].num_teams_in_league)
				{
					// completed all teams in league
					this.outputAddHTML(0,'br');
					this.outputAddHTML(0,0,'Completed league '+this.leagues[this.currentLeague].leagueName+'! Moving to next league.');
					this.outputAddHTML(0,'br');
					this.init();
					return;
				}
				else
				{
					// completed all days for this team
					this.days = 0;
					this.outputAddHTML(0,'br');
					this.outputAddHTML(0,0,'Moving to next team.');
					this.outputAddHTML(0,'br');
				}
			}
			if (this.days === 0) {
				this.outputAddHTML(0,'br');
				this.outputAddHTML(1,'span','Team: '+this.get_team_name(this.currentTeamInLeague),'text-decoration: underline;font-weight: bold;');
			}
			
			
			//
			// Debug for one team only!
			//
			/*
				var x = this.get_team_name(this.currentTeamInLeague);
				if (x != 'GiantS-Unit') return;
			//*/
			
			
			// number days completed
			var d = new Date();
			d.setTime(d.getTime()*1 + (86400*1000*settingsObject.time_period_start) + (86400*1000*this.days));
			this.today =  d.getFullYear() +'-';
			this.today += (d.getMonth()+1 < 10) ? '0' + (d.getMonth()+1) : d.getMonth()+1; //0-11
			this.today += '-';
			this.today += (d.getDate() < 10) ? '0' + d.getDate() : d.getDate(); //1-31
			
			this.outputAddHTML(0,'br');
			this.outputAddHTML(1,'span','Day: '+this.today,'text-decoration: underline;');
			this.outputAddHTML(0,'br');
			
			this.startTimer();
			this.startActive();
		}
		
		/*/
		 * 
		 * startActive
		 * 
		/*/
		
		this.startActive = function() {
			
			x___.outputAddHTML(0,0,'Optimizing Roster');
			x___.outputAddHTML(0,'br');
			x___.outputAddHTML(0,0,'Loading roster: ');
			x___.days++;
			
			//
			// debug
			//x___.today = '2013-01-28';
			
			var u;
			u = x___.league+'/'+x___.get_team_num(x___.currentTeamInLeague)+'?date='+x___.today+'&stat1=K&ajaxrequest=1';
			
			x___.make_GM_xmlhttpRequest(u, x___.startActive_GM_complete, true, null);
			
		}
		
		this.startActive_GM_complete = function(response) {
			
			var rs = response.responseText;
			
			rs = JSON.parse(rs);
			rs = rs.content;
			
			// currently downloaded page
			x___.currentDownloadedPage = rs;
			
			// are player positions found for all players?
			var loadpos = false;
			
			// <a href="http://sports.yahoo.com/[\w\d]+/players/(\d+)"
			var rg, m;
			
			//rg = /<a href="http:\/\/sports\.yahoo\.com\/[\w\d]+\/players\/(\d+)"/g;
			rg = /\/players\/(\d{4})/g;
			
			// Are some positions unknown? If so then load positions.
			while (m = rg.exec(rs)) { // tables
				if (!x___.allPlayerRankings_object[m[1]]) { // if a player's positions are unknown!
					
					// load positions for players
					loadpos = true;
					
					x___.startActive_stage2();
					
					break; // run only once!
				}
			}
			
			// sort roster
			if (!loadpos) { // did not have to load rankings
				x___.outputAddHTML(0,0,'Complete!');
				x___.outputAddHTML(0,'br');
				x___.sortRoster(rs); // sort roster
			}
		}
		
		this.startActive_stage2 = function() {
			
			var u;
			u = x___.league+'/'+x___.get_team_num(x___.currentTeamInLeague)+'/commisheditroster?date='+x___.today;
			
			x___.make_GM_xmlhttpRequest(u, x___.startActive_stage2_GM_complete, true, null);
		}
		
		this.startActive_stage2_GM_complete = function(response) {
			
			var rs = response.responseText;
			var rg, rg2, rg3;
			var m, m2;
			rg = /<tr height="17" class="[^"]+">((.|\s)*?(?=<\/tr>))/g; // tr
			while (m = rg.exec(rs)) {
				if (m[1].indexOf('<select name="') != -1)
				{
					// game not yet played
					rg2 = /<select name="(\d+)">((.|\s)*?(?=<\/select>))/.exec(m[1]); // select
					if (!x___.allPlayerRankings_object[rg2[1]]) {
						x___.allPlayerRankings_object[rg2[1]] = []; // array
						rg3 = /<option value="([^"]+)"/g; // options
						while (m2 = rg3.exec(rg2[2])) {
							x___.allPlayerRankings_object[rg2[1]].push(m2[1]); // position
						}
					}
				}
				else
				{
					// game played
					//<input type=hidden name="2797" value="D">
					rg2 = /<input type=hidden name="(\d{4})" value="([^"]+)">/.exec(m[1]); // input
					if (rg2) {
						if (!x___.allPlayerRankings_object[rg2[1]]) {
							x___.allPlayerRankings_object[rg2[1]] = [rg2[2]]; // array => [position]
						}
					}
				}
			}
			
			// sort roster
			x___.outputAddHTML(0,0,'Complete!');
			x___.outputAddHTML(0,'br');
			x___.sortRoster(x___.currentDownloadedPage); // sort roster

		}
		
		this.sortRoster = function(rs) {
			
			//////////////////////////
			// Variables
			//////////////////////////
			
			var positions					= [];
			var positions_util				= 0;
			var positions_injuredReserve	= 0;
			var positions_disabledList		= 0;
			var positions_notActive			= 0;
			var players_games_started		= [];
			var duplicate_positions_index	= [];
			var players						= [];
			var players_inactive			= [];
			var players_util				= [];
			var players_bench				= [];
			var players_elligible_Util		= []; // elligible for Util
			var cartesianArrays				= [];
			var index_player_at_row			= [];
			var result;
			var rosterSize					= 0;
			var benchSize					= 0;
			var activePlayersSize			= 0;
			var x;
			var isForcingORank				= false;
			var maxPlayers					= 0;
			
			// debug
			//console.log(rs);return;
			//
			
			/**
			 * Players table
			 */
			/*
			 * Aug. 19, 2013. Updated players table.
			 * OLD: <td class="pos first">([^<]+)<\/td>
			 * NEW: <td class="pos first">(<span class="pos-label">|)([^<]+)
			 */
			/*game started/in-progress
<tr  class="even" >X</tr> 
					 */
					/*any game still in future
<tr  class="odd" >X</tr>
					 */
			////
			// scrapedRosterArray []  ((x___.allPlayerRankings_object))
			////
			
			var rg,rg2,rg3;
			var scrapedRosterArray = [];
			var m, m2, m3;
			var x;
			
			// new table Oct. 21, 2013
			rg = /<table class="[^"]+" id="statTable\d+">((.|\s)*?(?=<\/table>|$)|$)/g;
			
			while (m = rg.exec(rs)) { // tables
				rg2 = /<tr\s*class="[^"]*"\s*>((.|\s)*?(?=<\/tr>|$)|$)/g;
				while (m2 = rg2.exec(m[1])) { // trs
					
					x = new Object();
					x.posFirst = '';
					x.opponent = '';
					x.gametime = '';
					x.name = '';
					x.positions = [];
					x.ranks = []; // length = 5 // 6 o, 7 season, 8 30-, 9 14-, 10 7-
					x.fullText = m2[1];
					
					// G,F,Util,BN,IR... //
					rg3 = /<span class="pos-label[^>]*>([^<]+)/.exec(m2[1]);
					if (rg3) {
						x.posFirst = rg3[1];
					}
					
					// 
					//<span class=\"ysf-game-status \"> <\/span>
					//or
					//<span class=\"ysf-game-status \"><a class=\"F-link-secondary\" href=\"http:\/\/sports.yahoo.com\/nhl\/boxscore?gid=2013102029\" target=\"sports\" onclick=\"pop(this)\">1st 8:19, 0-1<\/a> @ Cls<\/span>
					// or
					//<span class=\"ysf-game-status \">9:00 pm @ LA<\/span>
					//
					// 11 - 05
					// <div></div> or @Hou or Hou
					//
					rg3 = /<span class="ysf-game-status\s*"\s*>(<a[^>]+| |\d)/.exec(m2[1]); // "<a+" or " " or "9"
					if (rg3) {
						x.opponent = x.gametime = rg3[1].trim(); //<span class=\"ysf-game-status \">7:30 pm vs Min<\/span>
					} else {
						// Nov. 5, 2013
						// my team
						rg3 = /<div class="ysf-player-detail [^"]+"><\/div>\n        <\/div><\/div><\/td><td style="[^"]+" class="Ta-start Nowrap"><div >(<a[^>]+|[\d@\w]|)/.exec(m2[1]);
						if (rg3) {
							x.opponent = x.gametime = rg3[1].trim();//
						} else {
							// other teams
							rg3 = /<td style="width: 5%" class="Alt Ta-start Nowrap"><div *> *<\/div>/.exec(m2[1]);
							if (rg3)
								x.opponent = x.gametime = '';
							else {
								rg3 = /<td style="width: 5%" class="Ta-start Nowrap Bdrend">((.|\s)*?(?=<\/td>|$)|$)/.exec(m2[1]);
								if (rg3) {
									x.opponent = x.gametime = rg3[1].trim();
								} else
									x.opponent = x.gametime = '';
							}
						}
					}
					
					rg3 = /\/players\/(\d{4})"/.exec(m2[1]); //new
					if (rg3) {
						x.name = rg3[1];
						x.positions = x___.allPlayerRankings_object[x.name]; // array
					}
					
					// Ranks:
					// 0 = orank
					// 1..4 = actual
					// 5..8 = average
					rg3 = /<div >([\d\-]+)<\/div>/g; //
					while (m3 = rg3.exec(m2[1])) {
						x.ranks.push(m3[1]);
						if (x.ranks.length >= 5) break;
					}
					
					scrapedRosterArray.push(x);
				}
			}
			/*
			 * Old. Oct. 21, 2013.
			 * rg = /<table cellpadding="0" cellspacing="0" border="0" id="statTable\d?" class="teamtable" >((.|\s)*?(?=<\/table>|$)|$)/g;
			var m, m2, m3;
			while (m = rg.exec(rs)) { // tables
				rg2 = /<tr  class="[^"]+" >((.|\s)*?(?=<\/tr>|$)|$)/g;
				while (m2 = rg2.exec(m[1])) { // trs
					
					var x = new Object();
					x.posFirst = '';
					x.opponent = '';
					x.gametime = '';
					x.name = '';
					x.positions = [];
					x.ranks = []; // length = 5 // 6 o, 7 season, 8 30-, 9 14-, 10 7-
					x.fullText = m2[1];
					
					rg3 = /<td class="pos first">(<span class="pos-label"[^>]{0,}>|)([^<]+)/.exec(m2[1]); // G,F,Util,BN,IR ... etc.
					if (rg3) {
						x.posFirst = rg3[2];
					}
					rg3 = /<td class="opp">([^<]{0,})<\/td>/.exec(m2[1]); //
					if (rg3) {
						x.opponent = rg3[1];
					}
					rg3 = /<td class="gametime">([^>]{0,})/.exec(m2[1]); //
					if (rg3) {
						x.gametime = rg3[1];
					}
					rg3 = /\/players\/(\d{4})"/.exec(m2[1]); //new
					if (rg3) {
						x.name = rg3[1];
						x.positions = x___.allPlayerRankings_object[x.name]; // array
					}
					rg3 = /<td  class="stat [^"]+">([^<]{0,})/g; //
					while (m3 = rg3.exec(m2[1])) {
						x.ranks.push(m3[1]);
						if (x.ranks.length >= 5) break;
					}
					
					scrapedRosterArray.push(x);
				}
			}*/
			// debug
			//*
			//console.log(scrapedRosterArray);
			//*/
			
			//////////////////////////
			// positions --> []
			// possible positions on the roster, i.e. not bench. And does
			// not include Util players
			//////////////////////////
			
			var i, sra;
			for (i in scrapedRosterArray) {
				sra = scrapedRosterArray[i];
				var n = sra.posFirst;
				if (/^[^A-Z0-9]/.exec(n)) // i.e.?
					continue;
				
				// Has this player's game started?
				// ex:http://sports.yahoo.com/nhl/recap?gid=2013012002
				// ex:http://sports.yahoo.com/nhl/boxscore?gid=2013012022
				var y = sra.gametime;
				if (
					/\/recap\?gid=/.exec(y) ||
					/\/boxscore\?gid=/.exec(y)
				)
					continue;
				if (n == 'Util') { // skip Util positions
					positions_util++;
					continue;
				}
				if (n == 'BN') { // skip BN positions
					benchSize++;
					continue;
				}
				if (n == 'IR') { // skip IR positions
					positions_injuredReserve++;
					continue;
				}
				if (n == 'DL') { // skip DL positions
					positions_disabledList++;
					continue;
				}
				if (n == 'NA') { // skip Not Active positions
					positions_notActive++;
					continue;
				}
				rosterSize++;
				
				if (!positions[n]) { // does not yet exist
					positions[n] = [-1]; // add -1 as first item in array. (array eventually contains player Ids at this position)
				} else { // exists but is a duplicate
					if (!duplicate_positions_index[n]) // first instance of duplicate
						duplicate_positions_index[n] = 2;
					else // second or more instance of duplicate
						duplicate_positions_index[n]++;
				}
			}
			
			
			//////////////////////////
			// add array players[]
			// add players to array positions[]
			// players[]			--> ACTIVE players
			// players_inactive[]	--> INACTIVE players
			//////////////////////////
			
			var i, sra;
			for (i in scrapedRosterArray) {

				sra = scrapedRosterArray[i];
				
				var n = sra.posFirst;

				if (/^[^A-Z0-9]/.exec(n))
					continue;
				
				////
				// Skip players who are on IR. This is only when an owner
				// has placed the player on IR, not when the player is
				// IR elligible.
				////
				
				if (n == 'IR') // a player on IR
					continue;
				if (n == 'DL') // a player on DL
					continue;
				if (n == 'NA') // a player on Not Active
					continue;
					
				var j = sra.opponent;
				var a = sra.name;
				
				// player is active
				// has opponent?
				
				if (j != '' && j != '&nbsp;' ) {
					
					// Has this player's game started?
					// ex:http://sports.yahoo.com/nhl/recap?gid=2013012002
					// ex:http://sports.yahoo.com/nhl/boxscore?gid=2013012022
					var y = sra.gametime;
					if (
						/\/recap\?gid=/.exec(y) ||
						/\/boxscore\?gid=/.exec(y)
					)
						continue;
					
					
					////
					// If this is a rotisserie league then check settingsObject.rotisserie[_injured,_not_active]
					////
					
					if (this.leagues[this.currentLeague].leagueType == 'rotisserie') {
						if
						(
							settingsObject.rotisserie_injured && // yes to bench
							( // player is injured
								sra.fullText.indexOf('"status injured"') != -1 ||
								sra.fullText.indexOf('"Day-to-Day"') != -1 ||
								sra.fullText.indexOf('"Disabled List"') != -1 
							)
						)
						{ 
							if (a != '')
								players_bench.push(a);
							continue; // go to next
						}
						if
						(
							settingsObject.rotisserie_not_active && // yes to bench
							sra.fullText.indexOf('"Not Active"') != -1 // player is injured
						)
						{ 
							if (a != '')
								players_bench.push(a);
							continue; // go to next
						}
					}
					
					////
					// Player's rankings
					// If a rank is "-": one time this occurs is when season hasn't started.
					////
					
					var b = sra.ranks;
					var rank__, rank2__;
					rank__ = b[4]*1; //7
					rank2__= b[3]*1; //14
					
					if (/\D/.exec(rank__) || /\D/.exec(rank2__)) { // is rank "-", etc.?
						if (!isForcingORank) {
							this.outputAddHTML(0,'br');
							this.outputAddHTML(1,'span','One or more players are not ranked! Will use O-Rank.','color:orange');
							this.outputAddHTML(0,'br');
							isForcingORank = true;
						}
						rank__ = rank2__ = b[0]*1;
					}
					
					rank__ = rank__  *settingsObject.weight_rank_7  / 100; // weights
					rank2__= rank2__ *settingsObject.weight_rank_14 / 100;
					rank__ = Math.floor(rank__+rank2__); // average
					
					// penalties
					// +DTD, IR, DL
					if
					(
						sra.fullText.indexOf('"status injured"') != -1 ||
						sra.fullText.indexOf('"Day-to-Day"') != -1 ||
						sra.fullText.indexOf('"Disabled List"') != -1
					)
						rank__ = rank__ + settingsObject.penalty_injured;
					if (sra.fullText.indexOf('"Not Active"') != -1)
						rank__ = rank__ + settingsObject.penalty_not_active;
					//if (sra.fullText.indexOf('"Injured Reserve"') != -1) // hockey,IR
					//	rank__ = rank__ + settingsObject.penalty_hockey_injured_reserve;
					//if (sra.fullText.indexOf('"Day-to-Day"') != -1) // hockey,DTD
					//	rank__ = rank__ + settingsObject.penalty_hockey_day_to_day;
					//if (sra.fullText.indexOf('"Disabled List"') != -1) // baseball,DL
					//	rank__ = rank__ + settingsObject.penalty_baseball_disabled_list;
					
					////
					// If this is a rotisserie league then check settingsObject.rotisserie[_threshold,_threshold_amount]
					////
					
					if (this.leagues[this.currentLeague].leagueType == 'rotisserie') {
						if (
							settingsObject.rotisserie_threshold && // yes to bench
							rank__ >= settingsObject.rotisserie_threshold_amount // player rank equals or is above threshold
						) { 
							if (a != '')
								players_bench.push(a);
							continue; // go to next
						}
					}
					
					////
					// Positions that this player plays
					// players []
					// positions [] (i.e. G, SG, F)
					////
					
					players[a]				= new Object();
					players[a].rank;//		= '';
					players[a].positions	= [];
					
					var b, b_;
					for (var b in sra.positions) {
						
						b_ = sra.positions[b];
						
						if (b_ == 'Util') { // is player elligible for a Util position?
							// If player's game has started and the player
							// is in a util position.
							if  (
									__js_inarray(players_games_started, a)
								)
							{
								positions_util--; // remove an open position here
							} else {
								players_elligible_Util.push(a);
							}
							continue;
						}
						
						if  (
								b_ == 'BN' ||
								!b_ ||
								!b_.length ||
								b_ == 'IR' ||
								b == 'DL' ||
								b == 'NA'
							) // Skip Util, IR, DL, NA, and BN options
							continue;
						
						if (!positions[b_])
							continue;
						
						positions[b_].push(a); // positions[positionType].push(playerId) (i.e. PG, G, SG)
						players[a].positions.push(b_); // players[playerId].push(positionType)
					}
					/*for (var b in sra.positions) {
						b_ = sra.positions[b];
						if (b_ == 'Util') { // is player elligible for a Util position?
							players_elligible_Util.push(a);
							continue;
						}
						if (b_ == 'BN' || !b_ || !b_.length || b_ == 'IR' || b == 'DL' || b == 'NA') // Skip Util, IR, DL, NA, and BN options
							continue;
						if (!positions[b_])
							continue;
						positions[b_].push(a); // positions[positionType].push(playerId) (i.e. PG, G, SG)
						players[a].positions.push(b_); // players[playerId].push(positionType)
					}*/
					
					players[a].rank = rank__;
					activePlayersSize++;
					
				} else if (j == '' || j == '&nbsp;') {
					
					// no opponent
					// player is inactive
					
					if (a != '')
						players_inactive.push(a);
				}
			}
			
			// Debug
			/*
				console.log("positions []\nplayers []\nplayers_elligible_Util []\nplayers_inactive []\nactivePlayerSize #");
				console.log(positions);
				console.log(players);
				console.log(players_elligible_Util);
				console.log(players_inactive);
				console.log(activePlayersSize);
			//*/
			
			
			////
			// add some display
			////
			
			//this.outputAddHTML(0,'br');
			
			this.outputAddHTML(1,'div','Roster Details','text-decoration:underline;');
			this.outputAddHTML(1,'div','Starting positions: '+rosterSize,'margin:0 0 0 16px;');
			//this.outputAddHTML(1,'div','Utility positions: '+positions_util,'margin:0 0 0 16px;');
			//this.outputAddHTML(1,'div','Injured reserve positions: '+positions_injuredReserve,'margin:0 0 0 16px;');
			//this.outputAddHTML(1,'div','Disabled List positions: '+positions_disabledList,'margin:0 0 0 16px;');
			//this.outputAddHTML(1,'div','Not Active positions: '+positions_notActive,'margin:0 0 0 16px;');
			this.outputAddHTML(1,'div','Active players: '+activePlayersSize,'margin:0 0 0 16px;');
			
			//this.outputAddHTML(0,'br');
			
			////
			// remove unnecessary -1s.
			// only where position is not a duplicate position.
			////
			
			////
			// remove unnecessary -1s.
			// only where position is not a duplicate position.
			////
			
			/*var position; // string
			var array_players_at_position; // array
			var filled; // integer. Position must not remain empty (must be filled)
			var maxFilled; // integer
			for (var i in positions) {
				position = i; // string
				if (!duplicate_positions_index[i]) {
					array_players_at_position = positions[i];
					filled = 0;
					maxFilled = 1;
					for (var k in players) { // is this position mandatory to be filled?
						var array_player_positions			= players[k].positions;
						var array_player_positions_length	= players[k].positions.length;
						if (__js_inarray(array_player_positions, position)) {
							filled += 1 / array_player_positions_length;
							if (filled >= maxFilled) // 1
								break;
						}
					}
					
					// remove -1 from positions[i] (first element)
					
					if (filled >= maxFilled)
						positions[i] = positions[i].slice(1);
				}
			}*/
			
			var usedPlayers = [];
			
			for (var i in positions) { 
				if (!duplicate_positions_index[i]) {
					var topush = [];
					for (var j in positions[i]) {
						playerId = positions[i][j];
						if (!__js_inarray(usedPlayers, playerId)) { //allow -1
							topush.push(playerId);
						}
					}
					if (topush.length == 1) {
						if (topush[0] != -1) {
							cartesianArrays = removeFromArrays(topush[0], cartesianArrays); // remove playerId!
							//removeFromArrays(topush[0], cartesianArrays); // remove playerId!
							usedPlayers.push(topush[0]);
						}
					}
					else if (!topush.length) topush.push(-1);
					
					cartesianArrays.push(topush);
				
				} else {
					
					// are there enough roster spots for all active players at this position?
					
					var position = i; // if necessary
					var numPlayersAtPosition_int = positions[i].length - 1; // (do not count -1 position)
					var countAdded = 0;
					
					if (numPlayersAtPosition_int <= duplicate_positions_index[i]) { // i.e., 3 players less than 4 positions?
						for (var j in players) { // add any player at this position
							var array_player_positions	= players[j].positions; // player's positions
							var playerId				= j;
							if (__js_inarray(array_player_positions, position)) {
								if (!__js_inarray(usedPlayers, playerId)) {
									
									// remove from elsewhere before adding
									
									cartesianArrays = removeFromArrays(playerId, cartesianArrays);
									//removeFromArrays(playerId, cartesianArrays);
									
									// and then add
									
									cartesianArrays.push([playerId]);
									usedPlayers.push(playerId);
									countAdded++; //increment
								}
								
								
							}
						}
						if (countAdded < duplicate_positions_index[i]) { // add empty
							for (var j = countAdded; j < duplicate_positions_index[i]; j++) {
								cartesianArrays.push([-1]);
							}
						}
					} else {
						
						// not enough roster spots for this position. 
						
						////
						// arrays single/multiPositionPlayers
						// sort single by rank asc.
						//  -singlePositionPlayers[]
						//  -multiPositionPlayers[]
						//  -numSpotsToFill
						////
						
						var numSpotsToFill;
						var numMultiplePositionPlayers;
						var singlePositionPlayers	= [];
						var multiPositionPlayers	= [];
						var playerId;
						
						// singlePositionPlayers[] / multiPositionPlayers[]
						for (var k in positions[i]) { // playerIds
							playerId = positions[i][k];
							if (playerId == -1) continue;
							
							// # positions per player
							
							if (players[playerId].positions.length == 1) { //single
								var count = 0;
								var added = false;
								for (var j in singlePositionPlayers) { // sort while adding (by ranking)
									var tmp_id = singlePositionPlayers[j];
									if (players[playerId].rank < players[tmp_id].rank) {
										singlePositionPlayers.splice(count, 0, playerId); // adds playerId
										added = true;
										break;
									}
									count++;
								}
								if (!singlePositionPlayers.length) {
									singlePositionPlayers.push(playerId);
								} else if (!added) {
									singlePositionPlayers.push(playerId);
								}
							} else { //multiple
								if (!__js_inarray(usedPlayers, playerId)) {
									multiPositionPlayers.push(playerId);
								}
							}
						}
						
						// numSpotsToFill 
						numSpotsToFill = duplicate_positions_index[i] - multiPositionPlayers.length;
						if (numSpotsToFill > singlePositionPlayers.length)
							numSpotsToFill = singlePositionPlayers.length;
						if (numSpotsToFill < 0) numSpotsToFill = 0;
						
						// push mandatory (non- -1) (as array[])
						
						var j = 0;
						for (j; j < numSpotsToFill; j++) { // try filling roster position (i.e. f/pf/c) with static player (c)
							cartesianArrays = removeFromArrays(singlePositionPlayers[j], cartesianArrays);
							cartesianArrays.push([singlePositionPlayers[j]]);
							usedPlayers.push(singlePositionPlayers[j]);
						}
						
						// add leftover single position players to multi
						// check if -1 necessary
						
						multiPositionPlayers = multiPositionPlayers.concat(singlePositionPlayers.slice(numSpotsToFill));
						
						var position = i; // string
						var array_players_at_position; // array
						var tmp_positions_array; // array
						var filled; // integer. Position must not remain empty (must be filled)
						var maxFilled; // integer
						
						for (j; j < duplicate_positions_index[i]; j++) {
							
							tmp_positions_array = positions[i];
							filled = 0;
							maxFilled = 1 + j; // first run = 1 (same as above / a non-duplicate), second run = 2 ...
							
							// is this position mandatory to be filled?
							
							for (var k in players) {
								var array_player_positions			= players[k].positions;
								var array_player_positions_length	= players[k].positions.length;
								if (__js_inarray(array_player_positions, position) && !__js_inarray(usedPlayers, k)) { // id
									filled += 1 / array_player_positions_length;
									if (filled >= maxFilled) // 1
										break;
								}
							}
							if (filled >= maxFilled) { // remove -1 from positions[i] (first element)
								cartesianArrays.push(multiPositionPlayers); // does not include -1
							}
							else
								cartesianArrays.push([-1].concat(multiPositionPlayers)); // include -1
						}
					}
				}
			}
			function removeFromArrays(pid, ca) {
				var c1 = 0, c2;
				for (var k in ca) {
					c2 = 0;
					for (var l in ca[k]) {
						if (ca[k][l] == pid) {
							ca[k].splice(c2, 1); //index,howmany
							if (ca[k].length == 0) ca[k].push(-1); // don't leave empty!
							return removeFromArrays(pid, ca);
						} else
							c2++;
					}
					c1++;
				}
				return ca;
			}
			
			// Debug
			/*
				console.log("cartesianArrays []\nusedPlayers []\n")
				//console.log(cartesianArrays);
				//console.log(usedPlayers);
			//*/
			
			
			/**
			 * 
			 * If after minimizing some there are two or more positions where a lone player inhabits
			 * those positions --
			 * Remove forward all instances where a lone player inhabits a position (playerId).
			 * Remove all further references to the player. Leave a -1.
			 * 
			 **/
			
			var ca = cartesianArrays; // ca is a reference
			var isChanged = false;
			var playerId;
			var ca_length = cartesianArrays.length;
			for (var i = 0; i < ca_length; i++) {
				
				playerId = cartesianArrays[i][0];
				
				if (ca[i].length == 1 && playerId != -1) {
					
					cartesianArrays = removeFromArrays(playerId, cartesianArrays);
					
					cartesianArrays[i] = [playerId];
					
					/*//var removeMe = ca[i][0];
					var found = false;
					for (var j = i+1; j < ca_length; j++) { // check forward
						if (cartesianArrays[j].length == 1 && cartesianArrays[j][0] == playerId) {
							found = true;
							
							// Debug
							//console.log('Remove forward:'+playerId);
							
							break;
						}
					}
					if (found) cartesianArrays[i] = [-1];//[0] = -1;*/
				}
			}
			
			// Debug
			//console.log(cartesianArrays);
			/*
				console.log("cartesianArrays [] (removed)")
				//console.log(cartesianArrays);
				//return;
			//*/
			
			
			////
			// array index_player_at_row[]
			////
			
			for (var i in positions) {
				if (!duplicate_positions_index[i])
					index_player_at_row.push(i);
				else { // add multiple instances of the same position
					for (var j = 0; j < duplicate_positions_index[i]; j++) {
						index_player_at_row.push(i);
					}
				}
			}
			
			// Debug
			/*
			console.log(index_player_at_row);
			*/
			
			
			/**
			 * 
			 * If a gigantic cartesian product, then...
			 * Input the highest ranked player into the most open position. Then test again. Repeat if necessary.
			 * (Add the best ranked first, to the least populated of their position(s).)
			 * 
			 **/
			 
			var most_solutions_allowed = 1000000; //1mil
			
			// remove -1s
			var tmp_empty = false;
			for (var i in cartesianArrays) {
				if (cartesianArrays[i].length == 1 && cartesianArrays[i][0] == -1) {
					tmp_empty = true;
					break;
				}
			}
			if (!tmp_empty) { // remove -1
				var i,j;
				for (i in cartesianArrays) {
					for (j = cartesianArrays[i].length-1; j >= 0; j--) {
						if (cartesianArrays[i][j] == -1) {
							cartesianArrays[i].splice(j, 1);
							break;
						}
					}
				}
				
			}
			
			// countPossible
			var countPossible = 1;
			for (var i in cartesianArrays) {
				if (cartesianArrays[i].length)
					countPossible *= cartesianArrays[i].length;
			}
			
			// if countPossible > msa
			if (countPossible > most_solutions_allowed) {
				var sortedPlayers = [];
				var count;
				var added;
				var playerId;
				var tmp_id;
				var i, j;
				for (i in players) { // sort while adding (by ranking)
					playerId = i;
					added = false;
					count = 0;
					
					if (!sortedPlayers.length) {
						sortedPlayers.push(playerId);
						continue;
					}
					for (j in sortedPlayers) {
						tmp_id = sortedPlayers[j];
						if (players[playerId].rank < players[tmp_id].rank) {
							sortedPlayers.splice(count, 0, playerId); // adds playerId
							added = true;
							break;
						}
						count++;
					}
					if (!added) {
						sortedPlayers.push(playerId);
					}
				}
			}
			
			// Single position players. Fill in any single position players at the top 1/3 of team.
			if (countPossible > most_solutions_allowed) { // try single position players first
				
				var tmp_max_depth = Math.floor(rosterSize / 3); // go 1/3 into the starting roster size
				
				if (tmp_max_depth > 0) {
					var count = 1;
					var playerId;
					var found = false;
					var i;
				
					for (i in sortedPlayers) { // ascending
						playerId = sortedPlayers[i];
						
						if (players[playerId].positions.length == 1) {
							for (j in cartesianArrays) {
								if (__js_inarray(cartesianArrays[j], playerId)) {
									cartesianArrays = removeFromArrays(playerId, cartesianArrays);
									cartesianArrays[j] = [playerId];
									break;
								}
								
							}
						}
						
						countPossible = 1;
						for (j in cartesianArrays) {
							if (cartesianArrays[j].length)
								countPossible *= cartesianArrays[j].length;
						}
						
						if (count >= tmp_max_depth || countPossible <= most_solutions_allowed) break;
						
						count++;
					}
					
					/*function remove_from_array(arr, elem) {
						for (var i = arr.length-1; i>=0; i--) {
							if (arr[i] == elem) {
								arr.splice(i, 1);
							}
						}
						if (!arr.length) arr.push(-1);
						//return arr;
					}*/
				}
			}
			
			var countPossible = 1;
			for (var i in cartesianArrays) {
				if (cartesianArrays[i].length)
					countPossible *= cartesianArrays[i].length;
			}
			
			if (countPossible > most_solutions_allowed) {
				
				var text = countPossible+' solutions. Will try adding players one-by-one, starting with best ranked, until possible solutions is less than '+most_solutions_allowed+'.';
				this.outputAddHTML(1,'span',text,'color:orange;');
				this.outputAddHTML(0,'br');
				
				// Debug
				/*
					console.log('sortedPlayers []');
					console.log(sortedPlayers);
					//return;
				//*/
				
				////
				// iterate until countPossible decreases
				////
				
				for (var i in sortedPlayers) { // ascending

					////
					// test for continue!
					////
					
					var countPossible = 1;
					for (var j in cartesianArrays) {
						if (cartesianArrays[j].length)
							countPossible *= cartesianArrays[j].length;
					}
					this.outputAddHTML(countPossible+ ' ');
					if (countPossible < most_solutions_allowed) { //done here
						
						//this.outputAddHTML(0,'br');
						
						this.outputAddHTML(0,0,'Minimized to '+countPossible+' solutions.');
						this.outputAddHTML(0,'br');
						break;
					}
					
					////
					// remove and then
					// add back
					////
					
					var playerId = sortedPlayers[i];
					
					var possiblePositions = new Object();
					
					var position;
					
					// Find length of each cartesian array at position for each player position.
					// Player will be skipped if player already is placed in roster at lone
					// position.
					for (var j in players[playerId].positions) {
						position = players[playerId].positions[j];
						for (var k = 0; k < index_player_at_row.length; k++) {
							var pos = index_player_at_row[k];
							if (pos == position) {
								if (!possiblePositions[pos]) {
									possiblePositions[pos] = new Object();
									possiblePositions[pos].total	= 0;
									possiblePositions[pos].max		= 0;
								}
								var ca_len = cartesianArrays[k].length;
								
								if  (
										ca_len > 1 ||
										cartesianArrays[k].toString() == '-1'
										// cartesianArrays[k].toString() == playerId // already added
									) { // -1 to include empty spots
									possiblePositions[pos].total += ca_len;
									if (ca_len > possiblePositions[pos].max) {
										possiblePositions[pos].max = ca_len;
									}
								}
							}
						}
					}
					
					//console.log('Add player '+playerId);
					//console.log('countPossible '+countPossible);
					//console.log(possiblePositions);
					
					//******************************************************
					// Try to select the position with the least amount
					// of available players.
					//******************************************************
					
					var max_total_tmp = 1000;
					var max_index_tmp = 0;
					var pos_tmp;
					for (var pos in possiblePositions) {
						if  (
								possiblePositions[pos].total < max_total_tmp &&
								possiblePositions[pos].total > 0
							) { // not 0
							max_total_tmp = possiblePositions[pos].total;
							max_index_tmp = possiblePositions[pos].max;
							pos_tmp = pos;
						}
					}
					/*OLD. This is putting player in position with the most 
					 * amount of available players.
					////
					// find the lowest
					// if no lowest, i.e. all positions taken, take playerId out of cartesianArrays
					////
					var max_total_tmp = 0;
					var max_index_tmp = 0;
					var pos_tmp;
					for (var pos in possiblePositions) {
						if (possiblePositions[pos].total > max_total_tmp) { // not 0
							max_total_tmp = possiblePositions[pos].total;
							max_index_tmp = possiblePositions[pos].max;
							pos_tmp = pos;
						}
					}*/
					
					//******************************************************
					// Remove from starting lineup / leave for util
					// Else put in emptiest position (i.e. PG or G)
					//******************************************************
					
					if (max_total_tmp == 1000) {
						//removeFromArrays2(playerId, cartesianArrays); // do not remove here (there's actually nothing to remove
						console.log('Could not add player '+playerId);
					} else {
						var j, pos;
						for (j = 0; j < index_player_at_row.length; j++) {
							pos = index_player_at_row[j];
							if  (
									pos == pos_tmp &&
									cartesianArrays[j].length == max_index_tmp &&
									__js_inarray(cartesianArrays[j], playerId) // playerId must be in cartesianArray[j]
								)
							{
								
								// Debug
								//*
									console.log('Added player '+playerId+' '+pos);
								//*/
								//removeFromArrays2(playerId, cartesianArrays);
								
								cartesianArrays = removeFromArrays(playerId, cartesianArrays);
								
								cartesianArrays[j] = [playerId];
								
								/*var pid;
								for (var k = 0; k < cartesianArrays.length; k++) {
									
									pid = cartesianArrays[k][0];
									
									if (cartesianArrays[k].length == 1 && pid == -1) {
										continue;
									}
									else if (cartesianArrays[k].length == 1 && pid == playerId) {
										cartesianArrays[k] = [-1];//[0] = -1;
									}
									else if (__js_inarray(cartesianArrays[k], playerId)) {
										for (var l in cartesianArrays[k]) {
											pid = cartesianArrays[k][l];
											if (pid == playerId) {
												// Try this?
												// Add back a -1 when removing a player?
												// Must be broken... 
												if (!__js_inarray(cartesianArrays[k], -1))
													cartesianArrays[k].splice(l, 1, -1);
												else
													cartesianArrays[k].splice(l, 1);
												//...instead of this...
												//cartesianArrays[k].splice(l, 1);
												break;
											}
										}
									}
									//if (cartesianArrays[k].length == 0)
									//	cartesianArrays[k] = [-1];
								}
								
								cartesianArrays[j] = [playerId]; // array[playerId]*/
								break;
							}
						}
					}
				}
			}
			
			//
			
			function removeFromArrays2(pid, ca) {
				var c1 = 0, c2;
				for (var k in ca) {
					c2 = 0;
					for (var l in ca[k]) {
						if (ca[k][l] == pid) {
							ca[k].splice(c2, 1); //index, howmany
							if (ca[k].length == 0) ca[k].push(-1); // don't leave empty!
							return removeFromArrays(pid, ca);
						} else
							c2++;
					}
					c1++;
				}
				return ca;
			}
			
			/**
			 * 
			 * Once again. Remove forward all instances where a lone player inhabits a position (playerId).
			 * Remove all further references to the player. Leave a -1.
			 * 
			 **/
			//var ca = cartesianArrays; // ca is a reference
			var isChanged = false;
			var playerId;
			var ca_length = cartesianArrays.length;
			for (var i = 0; i < ca_length; i++) {
				
				playerId = cartesianArrays[i][0];
				
				if (cartesianArrays[i].length == 1 && playerId != -1) {
					//var removeMe = ca[i][0];
					var found = false;
					for (var j = i+1; j < ca_length; j++) { // check forward
						if (cartesianArrays[j].length == 1 && cartesianArrays[j][0] == playerId) {
							found = true;
							
							// Debug
							//console.log('Remove forward:'+playerId);
							
							break;
						}
					}
					if (found) cartesianArrays[i] = [-1];//[0] = -1;
				}
			}
			
			// probably unnecessary
			if (countPossible > most_solutions_allowed) { //
				this.outputAddHTML(0,0,'Aborting'); //
				this.outputAddHTML(0,'br');
				this.nextDay();
				return;
			}
			
			/*
			console.log(cartesianArrays);
			*/
			
			
			//////////////////////////
			// Cartesian Product
			// Calculate all possible combinations of players
			// for all roster positions (exclude Util & Bench positions).
			// Remove combinations where the same player is placed in two 
			// different roster positions.
			//
			// result array (array of arrays) ->
			// [
			//		array (roster position 1) (elligible player IDs) [ pid0, pid1, pid2, ..n ]
			//		array (roster position 2) (elligible player IDs) [ pid3, pid4, pid5, ..n ]
			//		array (roster position N) (elligible player IDs) [ .. ]
			// ]
			// 
			// For empty roster positions, -1 means no player at positons, i.e. [-1,-1,4333,-1].
			// 
			//////////////////////////
			
			result = cartesianProduct(cartesianArrays);
			
			this.outputAddHTML(0,0,'Possible combinations: '+ result.length); 
			this.outputAddHTML(0,'br'); // 190,000 versus 30,000 (30 most common)
			
			/*
			console.log(countPossible);
			console.log(result);
			*/
			
			
			//////////////////////////
			// find best scoring option in results &
			// find most players who get to play
			//
			// count the points resulting from each combo to decide the score
			// opt for more players, then opt for lowest rankings
			//////////////////////////
			
			// most players in roster
			var tmp_most_players = 0;
			var currentMostPlayers;
			var counter = 0;
			var i, j;
			for (i in result) {
				currentMostPlayers = 0; // most players
				for (j in result[i]) {
					if (result[i][j] != -1) {
						currentMostPlayers++; // roster size
					}
				}
				if (currentMostPlayers > tmp_most_players)
					tmp_most_players = currentMostPlayers;
				counter++;
			}
			
			// remove results with less than max players
			var i,j;
			for (i = result.length-1; i >= 0; i--) {
				currentMostPlayers = 0; // most players
				for (j in result[i]) {
					if (result[i][j] != -1) {
						currentMostPlayers++; // roster size
					}
				}
				if (currentMostPlayers < tmp_most_players) { // splice
					result.splice(i, 1);
				}
			}
			
			// determine best score (of roster with most players)
			var mp_best_score				= 99999;
			var best_mp						= tmp_most_players;//0;
			var best_mp_array				= [];
			var count_combos_largestRoster//;= 0;
			var currentScore;
			var i, j;
			for (i in result) {
				currentScore = 0;
				for (j in result[i]) {
					if (result[i][j] != -1) {
						currentScore += players[result[i][j]].rank; // roster rank
					}
				}
				
				if (currentScore < mp_best_score) { // new lowest at current most players, or first of new highest most players
					mp_best_score = currentScore;
					best_mp_array = result[i];
					//best_mp_array = currentScore;
				}
			}
			
			
			// result length after removing extraneous
			count_combos_largestRoster = result.length;
			
			//console.log(best_mp_array);return;
			
			this.outputAddHTML(0,0,'Most possible players in starting line-up: '+best_mp+' ('+ count_combos_largestRoster +' combinations)');
			this.outputAddHTML(0,'br');
			
			//////////////////////////
			// Players in utility & bench position
			//////////////////////////
			
			if (players.length > best_mp) { // more players than starting roster
				// util
				for (var i = 0; i < positions_util; i++) {
					var x = 99999;
					var y = false;
					for (var j in players) {
						if  (
								players[j].rank < x &&						// has a lower rank
								!__js_inarray(players_util, j) &&			// not in current utility players
								!__js_inarray(best_mp_array, j) &&			// not in starting line-up
								__js_inarray(players_elligible_Util, j) &&	// is elligible
								!__js_inarray(players_games_started, j)		// game not started
							)
						{
							x = players[j].rank;
							y = j;
						}
					}
					if (y) {
						players_util.push(y);
					}
				}
				// bench (active players)
				for (var i in players) {
					if (!__js_inarray(players_util, i) && !__js_inarray(best_mp_array, i)) {
						players_bench.push(i);
					}
				}
			}
			
			// Debug
			/*
				console.log(best_mp_array);
			//*/
			
			
			////
			// Avg.
			////
			
			var aout='';
			var a=0, c=0;
			for (var i in best_mp_array) { //player Id
				if (best_mp_array[i] == -1) continue; // skip open roster positions
				a += players[best_mp_array[i]].rank;
				c++;
			} a = Math.round(a / c);
			
			//this.outputAddHTML(0,'br');
			
			this.outputAddHTML(1,'div','Best combination found','color:#000000; text-decoration:underline;');
			this.outputAddHTML(1,'div','Average ranking of starting players: '+a,'margin-left:16px;');
			if (!players_util.length) {
				this.outputAddHTML(1,'div','No players in utility position!','margin-left:16px;');
			} else {
				var a=0, c=0;
				for (var i in players_util) { //player Id
					a += players[players_util[i]].rank;
					c++;
				} a = Math.round(a / c);
				this.outputAddHTML(1,'div','Average ranking of utility players: '+a,'margin-left:16px;');
			}
			
			//this.outputAddHTML(0,'br');
			
			
			//////////////////////////
			// Move players to their positions
			//////////////////////////
			
			var __data = '';
			var i, sra;
			for (i in scrapedRosterArray) {
				sra = scrapedRosterArray[i];
				
				var n = sra.posFirst;

				if (/^[^A-Z0-9]/.exec(n))
					continue;
						
				// player is active
					
				var j = sra.opponent;
				var a = sra.name;
				
				if (j != '' && j != '&nbsp;') { // is playing
					if (a == '') continue;
					
					if (__js_inarray(best_mp_array, a)) {
						var count = 0;
						for (var k in best_mp_array) {
							if (a == best_mp_array[k]) {
								var count2 = 0;
								for (var l in index_player_at_row) { // position=>[players .. N]
									if (count == count2) {
										if (!__js_inarray(players_games_started, a)) // games started?
											__data += '&'+ a +'='+ index_player_at_row[l];
										break;
									}
									count2++;
								}
								break;
							}
							count++;
						}
					}
				}
			}
			var a, i;
			for (i in players_util) {
				a = players_util[i];
				if (!__js_inarray(players_games_started, a)) // if game not started
					__data += '&'+ a +'=Util';
			}
			for (i in players_bench) { // active players
				a = players_bench[i];
				if (!__js_inarray(players_games_started, a)) // if game not started
					__data += '&'+ a +'=BN';
			}
			for (i in players_inactive) { // inactive players
				a = players_inactive[i];
				if (!__js_inarray(players_games_started, a)) // if game not started
					__data += '&'+ a +'=BN';
			}
			
			// Debug
			/*
				console.log(__data);
			//*/
			
			////
			// Post
			////
			
//> <form method=post action="/nba/66227/3/commisheditroster">
//> <input type="hidden" name="stage" value="1">
//> <input type="hidden" name="crumb" value="">
//> <input type="hidden" name="date" value="2013-03-03">
//> <input type="submit" name="submit" value="Submit">
			
			// url
			var u = x___.league+'/'+x___.get_team_num(x___.currentTeamInLeague)+'/commisheditroster';

			// data
			var d = 'stage=1&date='+this.today+'&crumb='+this.crumb+'&submit=Submit'+__data;
			
			// save
			x___.sortRoster_saveRoster(u, d);
			
			
			
			
			/* OLD
			 * this.outputAddHTML(0,0,'Updating roster: ');
			
			var u = 'stage=1&date='+this.today+'&crumb='+this.crumb+'&submit=Submit'+__data;
			
			// Testing
			//console.log(u);
			//if (x___.get_team_name(x___.currentTeamInLeague) != 'Vesper Sparrows') {
			//	x___.nextDay();
			//	return;
			//} else console.log(u);
			
			GM_xmlhttpRequest({
				method: "POST",
				url: x___.league+'/'+x___.get_team_num(x___.currentTeamInLeague)+'/commisheditroster', 
				data: u,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					
					////
					// done here, going to next day
					////
					
					var rs = response.responseText;
					
					// Debug
					
					if
					(
						rs.indexOf('<h1>Please verify your password</h1>') != -1 &&
						rs.indexOf('<title>Sign in to Yahoo!</title>') != -1
					)
					{	// cookie is expired!
						x___.outputAddHTML(1,'span','Error: Yahoo cookie has expired! Manually update your roster to refresh your cookie. Then refresh this page. Updates aborted!','color:red;');
						x___.outputAddHTML(0,'br');
					}
					else if
					(
						rs.indexOf('<h1 id="ysppageheader">There was a problem</h1>') != -1 &&
						rs.indexOf('Player does not play that position. (Error&nbsp;#167)') != -1
					)
					{	
						x___.outputAddHTML(1,'span','Error: Player does not play that position. Updates aborted!','color:red;');
						x___.outputAddHTML(0,'br');
					}
					else if
					(
						/<title>Yahoo! Sports Fantasy \w+ - There was a problem<\/title>/.exec(rs)
					)
					{	
						x___.outputAddHTML(1,'span','Error: Yahoo response is: "There was a problem". Updates aborted!','color:red;');
						x___.outputAddHTML(0,'br');
					}
					else
					{
						x___.outputAddHTML(0,0,'Complete!');
						x___.outputAddHTML(0,'br');
					}
					
					x___.nextDay();
				}
			});*/
			
			//**************************************************
			// Functions
			//**************************************************
			// Do not allow same player to be in two different positions at once. I.e., p1 is PG & SG.
			// Do not add combo array containing -1 (open roster at position). Every roster position is filled.
			// But keep the value "-1" in the arrays, i.e. [[-1,-1,-1,-1,4333],[ ...N]]. This is
			// because -1 counts as an open position at that roster position, rather than as a player's Id.
			//////////////////////////
			
			function deepCopy(obj) {
				if (Object.prototype.toString.call(obj) === '[object Array]') {
					var out = [], i = 0, len = obj.length;
					for ( ; i < len; i++ ) {
						out[i] = arguments.callee(obj[i]);
					}
					return out;
				}
				if (typeof obj === 'object') {
					var out = {}, i;
					for ( i in obj ) {
						out[i] = arguments.callee(obj[i]);
					}
					return out;
				}
				return obj;
			}
			function removex(arr, elem) {
				for (var i=arr.length-1; i>=0; i--) {
					if (arr[i] == elem) {
						arr.splice(i, 1);
					}
				}
			};
			function cartesianProduct(xss) { // xss is every position with every player at that position
				if (!xss || xss.length < 1)
					return [];
				else {
					var head = xss[0];
					var tail = xss.slice(1);
					var result = [];
					var i, j;
					var x;
					
					var tmp_tail;
					var k;
					
					//console.log(head);
					//console.log(tail);
					//return;
					
					for (i = 0; i < head.length; i++) {
						
						// remove duplicate player IDs
						tmp_tail = deepCopy(tail);
						for (j in tmp_tail) { // [array1, array2, ..N]
							removex(tmp_tail[j], head[i]);
							if (!tmp_tail[j].length) tmp_tail[j].push(-1);
						}
						
						var productOfTail = cartesianProduct(tmp_tail);
						
						if (productOfTail.length) {
							for (j = 0; j < productOfTail.length; j++) {
								x=[head[i]].concat(productOfTail[j]); //
								result.push(x);
							}
						} else {
							x=[head[i]]; // end node
							result.push(x);
						}
					}
					return result;
				}
			}
		}
		
		/*/
		 * 
		 * sortRoster save
		 * 
		/*/
		
		this.sortRoster_saveRoster = function(url, data) {
			
			x___.outputAddHTML(0,0,'Updating roster: ');
			
			x___.make_GM_xmlhttpRequest(url, x___.sortRoster_saveRoster_GM_complete, false, data);
			
		}
		
		this.sortRoster_saveRoster_GM_complete = function(response) {
			
			////
			// done here, going to next day
			////
			
			var rs = response.responseText;
			
			if
			(
				rs.indexOf('<h1>Please verify your password</h1>') != -1 &&
				rs.indexOf('<title>Sign in to Yahoo!</title>') != -1
			)
			{	// cookie is expired!
				x___.outputAddHTML(1,'span','Error: Yahoo cookie has expired! Manually update your roster to refresh your cookie. Then refresh this page. Updates aborted!','color:red;');
				x___.outputAddHTML(0,'br');
			}
			else if
			(
				rs.indexOf('<h1 id="ysppageheader">There was a problem</h1>') != -1 &&
				rs.indexOf('Player does not play that position. (Error&nbsp;#167)') != -1
			)
			{	
				x___.outputAddHTML(1,'span','Error: Player does not play that position. Updates aborted!','color:red;');
				x___.outputAddHTML(0,'br');
			}
			else if
			(
				/<title>Yahoo! Sports Fantasy \w+ - There was a problem<\/title>/.exec(rs)
			)
			{	
				x___.outputAddHTML(1,'span','Error: Yahoo response is: "There was a problem". Updates aborted!','color:red;');
				x___.outputAddHTML(0,'br');
			}
			else
			{
				x___.outputAddHTML(0,0,'Complete!');
				x___.outputAddHTML(0,'br');
			}
			
			x___.nextDay();
			
		}
	}
}



























