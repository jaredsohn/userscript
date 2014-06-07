// ==UserScript==
// @name          Fumbbl Spectate Links (Group Edition)
// @author		  SeraphimRed
// @version		  1.0
// @date		  29/07/08
// @namespace     http://userscripts.org/users/58057
// @description   Adds spectate links throughout the FUMBBL site, with additional Support for Group Games. 
// @include       http://fumbbl.com/*
// @history       v1.0 29/07/2008
//                Derived from Fumbbl Spectate Links v1.21 by David Ashley-Smith
//                (http://userscripts.org/scripts/show/28719)
//			      Added a Group Watch to notify a user on FUMBBL pages
//			      of any games being played from a set group.
//			      Modify g_groupWatch array to add group ids of groups you
//			      have an interest in.
// ==/UserScript==

/* 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Refer to the GNU General Public License here: 
 *     http://www.gnu.org/licenses/gpl.html
 */

/******************************************************
			CONFIG
******************************************************/

/* An array to hold any group id you would like the games of displayed
   Add and remove as desired
   Set show_group_games to false to disable
*/
var g_groupWatch = new Array();
g_groupWatch[0] = 4262; //OBBA
g_groupWatch[1] = 4596; //LOTR
g_groupWatch[2] = 5015; //STAR WARS
g_groupWatch[3] = 3449; //WIL

var show_group_games = true; //show group games included in the group id array g_groupWatch
var display_group_games_in_table_number = 2; // determines where to display the game. May wish to change this to 3 if you are using v1 or v3 themes 

var ig_link_text = '(IG)'; //text for (IG) links
var ig_link_color = '#000088'; //color for (IG) links
var match_header_color = '#000088'; //color for 'Currently playing:' header on coach & team pages
var spectate_link_color = ''; //'(Spectate)' link color for game details showing on coach & team pages

//  (true/false)
var show_current_game_on_player_page  = true; //show game details on player pages
var show_current_game_on_team_page    = true; //show game details on team pages
var add_current_game_links_to_teams   = true; //show (IG) links by team links
var add_current_game_links_to_players = true; //show (IG) links by player links
var current_game_details_popups       = true; //detailed popups when hovering over (IG) links

var cache_game_data_timeout = 60 ;// seconds. Caches data from games page to limit unnecessary hits on the fumbbl server.
var notify_when_loading_data = true; //shows a notification top left when accessing the server

var buddy_list_at_top = true;        // swap buddy list and games list
var sort_buddies_by_activity = true; // sort buddy list by the time they were last seen
var buddies_show_online_for = 0;     // minutes. How long buddies are highlighted for. Use 0 for fumbbl default.
var highlight_buddies_ingame = false; // highlights buddies that are ingame

var ignore_matches_about_to_end = true; //non tournament games at 100% will be ignored 
//note: this means ignoring games in the final turn.. but it seems most games showing 100% ended some time ago

/******************************************************
	utility 
******************************************************/
//binds an object with a function. useful to store data with a callback (use 'this' in callback to access object)
function bound(func, object) {
	return function() { return func.apply(object, arguments); }
}

//simple cache saves text to moz prefs between script loads
// key can be any string(eg: a url)
// data is retreivable only by this script (due to greasemonkey pref naming)
// *data is not removed on expiration
function cache(key, content, timeout) { //timeout in seconds
	if (!timeout) return;
	GM_setValue(' cache '+key, content.toString());
	GM_setValue(' cache '+key+' expiry', ((new Date()).getTime() + (timeout*1000)).toString());	
}
function getCached(key) {
	//returns -1 if expired or nothing cached
	var expiry = parseInt(GM_getValue(' cache '+key+' expiry', '0'));
	if ((new Date()).getTime() < expiry) {
		GM_log('cache expires in '+ ((expiry - (new Date()).getTime())/1000)+ ' seconds');
		return GM_getValue(' cache '+key);
	}
	else return -1;
}

//retrieves text/html data from any remote address with a GET request:
// call with one argument, an Object:
//  params required: url (string), callback (function), error_callback (function), onloading_callback (function)
//   callback is sent the retrieved content on success
//   onloading_callback is sent the original params when loading a remote address (as opposed to using cached data)
//   error_callback is sent a responseDetails object on failure 
//    (response status !=200.. or another error. see GM_xmlhttpRequest documentation)
//  params optional: cache_timeout (int seconds), on_error_timeout (int seconds)
//   (on_error_timeout is time to wait after an error. cache will be cleared and subsequent calls will succeed but return blank data)
function getPage(params) {
	var html = getCached(params.url);
	if (html != -1) {
		params.callback(html);
		return;
	}
	if (params.onloading_callback)
		params.onloading_callback(params);

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: params.url,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html',
	    },
	    onerror: bound(getPageErrorCallback, params),
	    onload: bound(getPageCallback, params)
	});
}
function getPageCallback(responseDetails) {
	if (responseDetails.status != 200)
		getPageErrorCallback.apply(this, [responseDetails]);

	if (this.cache_timeout)
		cache(this.url, responseDetails.responseText, this.cache_timeout);

	this.callback(responseDetails.responseText);
}
function getPageErrorCallback(responseDetails) {
	if (this.error_timeout)
		cache(this.url, '', this.on_error_timeout);

	this.error_callback(responseDetails);
}

var g_popup_pane;
function javascriptPopup(htmlcontent) {
	closeJavascriptPopup();

	g_popup_pane = document.createElement('div');
	g_popup_pane.style.display='block';
	g_popup_pane.style.visibility='hidden';
	g_popup_pane.style.position='absolute';
	g_popup_pane.style.zIndex='100000';
	g_popup_pane.style.top = g_popup_pane.style.left='0px';
	document.body.appendChild(g_popup_pane);
	g_popup_pane.innerHTML = htmlcontent;

	repositionJavascriptPopup();

	//reveal the pane
	g_popup_pane.style.visibility='visible';
}
function closeJavascriptPopup() {
	if (!g_popup_pane)
		return;
	document.body.removeChild(g_popup_pane);
	delete g_popup_pane;
	g_popup_pane = undefined;
}
function repositionJavascriptPopup() {
	if (!g_popup_pane)
		return;

	//measure the pane	
	var panew = g_popup_pane.offsetWidth;
      	var paneh = g_popup_pane.offsetHeight;

      	// document area in view (subtract scrollbar width for ns)
      	var winw = window.innerWidth-20+window.pageXOffset;
      	var winh = window.innerHeight-20+window.pageYOffset;     	
      	
      	//offset from mouse position
      	var offsetx = 15;
      	var offsety = 15;

      	if ((g_mouseX+offsetx+panew)>winw) {
		//if pane doesn't fit to right of mouse then try left
		x = g_mouseX-(panew+offsetx);
		//else sit on right edge
		if (x<0)
			x = winw - panew;
	}
	else x = g_mouseX+offsetx; //sit left if it still doesn't fit
	if (x<0)
		x = 0;

	//similar with height
      	if ((g_mouseY+offsety+paneh)>winh) {
		y = g_mouseY-(paneh+offsety);
		if (y<0)
			y = winh - paneh;
	}
	else y = g_mouseY+offsety;
	if (y<0)
		y = 0;
	
	g_popup_pane.style.left = x+'px';
	g_popup_pane.style.top = y+'px';	
}
//mouse handling used to position popups
var g_mouseX = 0;
var g_mouseY = 0;
function trackMouseMove(evt) {
	g_mouseX = evt.pageX;//: window.event.clientX + standardbody.scrollLeft;
	g_mouseY = evt.pageY;//: window.event.clientY + standardbody.scrollTop;
	repositionJavascriptPopup();
}
document.addEventListener('mousemove', trackMouseMove, false);

//brief notifications
var g_notification = null;
function notify(html, close_btn) {
	if (g_notification) {
      		document.body.removeChild(g_notification);
      		delete g_notification;
      		g_notification = undefined;
	}
	if (!html)
		return;
	GM_log(html);
	
	g_notification = document.createElement('div');
	g_notification.style.position = 'absolute';
	g_notification.style.zIndex = '200000';
	g_notification.style.background = 'black';
	g_notification.style.color = '#00FFFF';
	g_notification.style.font = 'bold 10pt verdana, sans-serif';
	g_notification.style.padding = '2px';
	g_notification.innerHTML = html;
	if (close_btn) {
		var btn = document.createElement('a');
		btn.innerHTML = '<sup style="padding:0px 0px 2px 4px;float:right;color:red;font-weight:bold;font-size:80%;">[x]</sup>';
		btn.href = 'javascript:void(1);';
		g_notification.insertBefore(btn, g_notification.firstChild);
		btn.addEventListener('click', closeNotification, false);
	}
	document.body.appendChild(g_notification);
	repositionNotification();
}
function closeNotification() { notify(); }
//notifications hug top left
function repositionNotification() {
	if (!g_notification)
		return;
	g_notification.style.left = document.body.scrollLeft+'px';
	g_notification.style.top = document.body.scrollTop+'px';
}
document.addEventListener('scroll', repositionNotification, false);


/******************************************************
	global page information
******************************************************/
var page_tds = document.getElementsByTagName('td');
var page_links = document.getElementsByTagName('a');
var page_divs = document.getElementsByTagName('div');

function firstTdMatchingContent(innerHTML) {
	for (var i=0; i<page_tds.length; i++) {
		if (page_tds[i].innerHTML == innerHTML)
			return page_tds[i];
	}
	return undefined;
}
function firstDivMatchingContent(innerHTML) {
	for (var i=0; i<page_divs.length; i++) {
		if (page_divs[i].innerHTML == innerHTML)
			return page_divs[i];
	}
	return undefined;
}

function getPlayerLinks() {
	if (!this.player_links_inited) {
		this.player_links_inited = true;
		
		for (var i=0; i<page_links.length; i++) {
			var shortened_link_name = page_links[i].innerHTML.slice(0,7);
			var full_name = null;
			if (page_links[i].href.indexOf('http://fumbbl.com/~'+shortened_link_name) != -1) {
				full_name = /http:\/\/fumbbl.com\/~([^\/\&]*)$/.exec(page_links[i].href)[1];
			}
			else if (page_links[i].href.indexOf('file=profile&mode=viewprofile&u=') != -1) {
				full_name = page_links[i].innerHTML;
			}
			if (full_name) {
				if (!this.player_links)
					this.player_links = new Object();
				if (!this.player_links[full_name])
					this.player_links[full_name] = new Array();
				this.player_links[full_name].push(page_links[i]);
			}
		}
	}
	return this.player_links;
}
function getTeamLinks() {
	if (!this.team_links_inited) {
		this.team_links_inited = true;
		
		for (var i=0; i<page_links.length; i++) {
			var res = page_links[i].href.match(/page=team\&op=view\&team_id=(\d*)$/);
			if (res) {
				if (!this.team_links)
					this.team_links = new Object();
				if (!this.team_links[res[1]])
					this.team_links[res[1]] = new Array();
				this.team_links[res[1]].push(page_links[i]);
			}
		}
	}
	return this.team_links;
}

/******************************************************
	meaty stuff
******************************************************/
//main
function addCurrentGames() {
	//skip games page
	if (location.href=='http://fumbbl.com/FUMBBL.php?page=games')
		return;

	//check options. Is there any need to load data?
	var exit = true; 
	if (add_current_game_links_to_players && getPlayerLinks())
		exit = false;
	if (add_current_game_links_to_teams && getTeamLinks())
		exit = false;
	if (show_current_game_on_player_page && location.href.match(/http:\/\/fumbbl.com\/~([^\/\&]*)$/))
		exit = false;
	if (show_current_game_on_team_page && location.href.match(/page=team\&op=view\&team_id=(\d*)$/))
		exit = false;
	if (exit) {
      		GM_log('no games needed');
		return;
	}
	getPage({
		url:'http://fumbbl.com/FUMBBL.php?page=games&spectate_links_script=1',
		callback: parseGameData,
		error_callback: gamesPageResponseError,
		cache_timeout: cache_game_data_timeout,
		on_error_timeout: cache_game_data_timeout,
		onloading_callback: notifyPageLoad
	});
}
function gamesPageResponseError(responseDetails) {
	notify('Spectate links error<br>Status '+responseDetails.status+'<br>'+responseDetails.statusText, true);
}
function notifyPageLoad() {
	notify('Loading..');
}

//fumbbl tables utility
function getOddAndEvenRows(html) {
	//parse trs with odd/even class to an array
	return html.match(/<tr[^>]*?class="(odd|even)"[^>]*>.*?<\/tr>/g);
}
function rowOddness(row_html) {
	//'odd' / 'even' / undefined
	return /<tr[^>]*?class="(odd|even)"[^>]*>/.exec(row_html)[1];
}

//data is ready
g_matchdata = undefined;
function parseGameData(html) {
	closeNotification();
	
	//trs with odd/even class
	var rows = getOddAndEvenRows(html);

	//array to hold extracted data objects
	var matchdata = new Array();
	var current_matchdata = null;
	var current_oddness = undefined;
	for (var i=0; i<rows.length; i++) {
		var oddness = rowOddness(rows[i]);
		if (!oddness) {
			GM_log('fail, row not odd or even: '+ rows[i]);
			current_oddness = undefined;
			current_matchdata = null;
		}
		else if (oddness != current_oddness) {
			current_oddness = oddness;
			//GM_log('new match');
			//new game.. create a new matchdata object
			current_matchdata = new Object();
			current_matchdata.teams = new Array();
			current_matchdata.team_names = new Array();
			current_matchdata.players = new Array();
			current_matchdata.is_tournament_game = false;
			current_matchdata.tournament_display = false;
			current_matchdata.progress = '';
			current_matchdata.score = [0,0];
			current_matchdata.html = '';
		}
		if (current_matchdata) {
			//add row to current matchdata html
			current_matchdata.html += rows[i];
			var speclink = rows[i].match( /\(<a href=\"([^\"]*)\">Spectate<\/a>\)/ );
			if (speclink) {
				var teams_res = rows[i].match(/<a[^>]*?href=\"[^\"]*?team_id=(\d*)\"[^>]*>([^<]*)/g);
				if (teams_res && teams_res.length==2) {
					//GM_log('teams');
					var res = /<a[^>]*?href=\"[^\"]*?team_id=(\d*)\"[^>]*>([^<]*)/.exec(teams_res[0]);
					current_matchdata.teams.push( res[1] );
					current_matchdata.team_names.push( res[2] );
					var res = /<a[^>]*?href=\"[^\"]*?team_id=(\d*)\"[^>]*>([^<]*)/.exec(teams_res[1]);
					current_matchdata.teams.push( res[1] );
					current_matchdata.team_names.push( res[2] );
				}
								
				//GM_log('speclink. final row');
				current_matchdata.speclink = speclink[0];
				current_matchdata.specurl = speclink[1];
				
				//check if match is about to end/ended
				if (ignore_matches_about_to_end
				    && (current_matchdata.progress == '100%' || current_matchdata.progress == 'Full Time')
				    && !current_matchdata.is_tournament_game) {
					//GM_log('skip game');
				}
				else
					matchdata.push( current_matchdata );
				}
			else {
				//GM_log('player names');
				var names = rows[i].match(/<a[^>]*?href=\"\/~([^\"]*)\"[^>]*>([^<]*)/g);
				if (names && names.length==2) {
					current_matchdata.players.push( /<a[^>]*?href=\"\/~([^\"]*)\"[^>]*>([^<]*)/.exec(names[0])[1] );
					current_matchdata.players.push( /<a[^>]*?href=\"\/~([^\"]*)\"[^>]*>([^<]*)/.exec(names[1])[1] );
				}
				var prog_res = rows[i].match(/>((\d+\%)|Overtime|Full Time|Starting)</);
				if (prog_res) {
					current_matchdata.progress = prog_res[1];
//					GM_log('progress: '+current_matchdata.progress);
				}
				
				var score_res = rows[i].match(/<td[^>]*>(\d+) - (\d+)<\/td>/);
				if (score_res && score_res.length==3) {
					current_matchdata.score = [parseInt(score_res[1]), parseInt(score_res[2])];
//					GM_log('score: '+current_matchdata.score.toSource());
				}
				else {
					current_matchdata.is_tournament_game = true;
					
					/*  
					    if a tournament (Group) game is found, determine if we are
					    interested in this game by searching the g_groupWatch list
					*/
					var matchGroup = "";

					if(show_group_games == true)
					{
						for(var n = 0; n < g_groupWatch.length; n++)
						{
							matchGroup = "group=" + g_groupWatch[n];
							if(rows[i].match(matchGroup))
							{
								current_matchdata.tournament_display = true;
								break;
							}
						}
					}
				}				
			}
		}
	}
	//store matchdata for popups
	g_matchdata = matchdata;
	GM_log(matchdata.length+' games found');

	if (!matchdata)
		return;
	
	//check options. add links to page
	if (show_group_games)                       addGroupGamesToPage(matchdata);
	if (add_current_game_links_to_players)		createPlayerGamesLinks(matchdata);
	if (add_current_game_links_to_teams)		createTeamGamesLinks(matchdata);
	if (show_current_game_on_player_page)		addCurrentGameDataToPlayerPage(matchdata);
	if (show_current_game_on_team_page)		    addCurrentGameDataToTeamPage(matchdata);
}

//adjust page....
function createPlayerGamesLinks(matchdata) {
	//(IG) links for players
	if (!getPlayerLinks()) return;
	//loop individual games
      	for (var i=0; i<matchdata.length; i++) {
      		//loop players (2 hopefully)
      		for (var j=0; j<matchdata[i].players.length; j++) {
      			//loop page links with matching player name
      			var links = getPlayerLinks()[matchdata[i].players[j]];
      			if (links) {
	    			for (var k=0; k<links.length; k++) {
	      				var a = document.createElement('a');
	      				a.href = matchdata[i].specurl;
	      				a.innerHTML = '<sup style="color:'+ig_link_color+';">'+ig_link_text+'</sup>';
	      				a.style.textDecoration='none';
	      				
	      				//insert directly after player link
	      				links[k].parentNode.insertBefore(a, links[k].nextSibling);
	
					//mouse listeners to popup details on hover. link name indexes match report
	      				a.name = i;						
	      				a.addEventListener('mouseover', onMouseOverMatchLink, false);
	      				a.addEventListener('mouseout', closeJavascriptPopup, false);

					if (highlight_buddies_ingame) {
						if (links[k].previousSibling && links[k].previousSibling.nodeName=='IMG' && links[k].previousSibling.src=='http://fumbbl.com/FUMBBL/Images/GrayBuddy.png')
							links[k].previousSibling.src = 'http://fumbbl.com/FUMBBL/Images/GreenBuddy.png';
					}
	      			}
	      		}
      		}
      	}
}
function createTeamGamesLinks(matchdata) {
	//(IG) links for teams
	if (!getTeamLinks()) return;
	for (var i=0; i<matchdata.length; i++) {
		for (var j=0; j<matchdata[i].players.length; j++) {
			var links = getTeamLinks()[matchdata[i].teams[j]];
      			if (links) {
	      			for (var k=0; k<links.length; k++) {
	      				var a = document.createElement('a');
	      				a.href = matchdata[i].specurl;
	      				a.innerHTML = '<sup style="color:'+ig_link_color+';">'+ig_link_text+'</sup>';
	      				a.style.textDecoration='none';
	      				links[k].parentNode.insertBefore(a, links[k].nextSibling);
	
	      				a.name = i;						
	      				a.addEventListener('mouseover', onMouseOverMatchLink, false);
	      				a.addEventListener('mouseout', closeJavascriptPopup, false);
	      			}
	      		}
		}
	}
}
function addCurrentGameDataToPlayerPage(matchdata) {
	//get player name from url
	var res = location.href.match(/http:\/\/fumbbl.com\/~([^\/\&]*)$/);
	if (res && matchdata) {
		for (var i=0; i<matchdata.length; i++) {
			for (var j=0; j<matchdata[i].players.length; j++) {
				 if (res[1]==matchdata[i].players[j]) {
					
					//parent of the first div with player name is main header box
					var div = firstDivMatchingContent(res[1]).parentNode;
					var d = document.createElement('div');
					var html = matchdata[i].html;
					
					if (html.match(/<tr/g).length == 3) {
						//3 rows means a group header. place 'Current match' before that link.
						html = html.replace('<tr class="odd"><td align="center" colspan="8">', '<tr class="odd"><td colspan="8" align="center"><b style="color:'+match_header_color+';">Currently playing: </b>&nbsp;&nbsp;&nbsp;');
					}
					else
						//2 rows. place 'Current match' in a new row
						html = '<tr class="odd"><td colspan="8" align="center"><b style="color:'+match_header_color+';">Currently playing: </b></td></tr>' + html;
					//highlight spectate link
					html = html.replace('<a href="/bbowl.jnlp', '<a style="color:'+spectate_link_color+'" href="bbowl.jnlp');
					//odd is lighter
					html = html.replace(/class=\"even\"/g, 'class="odd"');
					//wrap our trs with a table
					d.innerHTML = '<table style="border: solid 2px black; margin-left: auto; margin-right: auto;" border="0" cellspacing="0" cellpadding="5">'+html+'</table>';
					
					//insert after main header box
					div.parentNode.insertBefore(d, div.nextSibling);
				}
			}
		}
	}
}
function addCurrentGameDataToTeamPage(matchdata) {
	//get team id from url (only on overview page)
	
	var res = location.href.match(/page=team\&op=view\&team_id=(\d*)$/);
	if (res && matchdata) {
		for (var i=0; i<matchdata.length; i++) {
			for (var j=0; j<matchdata[i].teams.length; j++) {
				if (res[1]==matchdata[i].teams[j]) {
					//first div containing the team name should be the main header
					var div = firstDivMatchingContent(matchdata[i].team_names[j]);
					var d = document.createElement('div');
					var html = matchdata[i].html;
					if (html.match(/<tr/g).length == 3) {
						html = html.replace('<tr class="even"><td align="center" colspan="8">', '<tr class="odd"><td colspan="8" align="center"><b style="color:'+match_header_color+';">Currently playing: </b>&nbsp;&nbsp;&nbsp;');
					}
					else
						html = '<tr class="even"><td colspan="8" align="center"><b style="color:'+match_header_color+';">Currently playing: </b></td></tr>' + html;
					//highlight spectate link
					html = html.replace('<a href="/bbowl.jnlp', '<a style="color:'+spectate_link_color+'" href="bbowl.jnlp');
					//even is darker
					html = html.replace(/class=\"odd\"/g, 'class="even"');
					d.innerHTML = '<table style="border: solid 2px black; margin-left: auto; margin-right: auto;" border="0" cellspacing="0" cellpadding="5">'+html+'</table>';
					
					//after team division details which follow the header
					div.parentNode.insertBefore(d, div.nextSibling.nextSibling);
				}
			}
		}
	}
}

/*****************************************************
* addGroupGamesToPage
*
* Purpose:	To add specified Group Games to a FUMBBL
*           page.
*
* Params:	matchdata - Data Structure containing 
*                       parsed game data
*	
* Returns:	None
******************************************************/
function addGroupGamesToPage(matchdata) 
{
	if (matchdata) 
	{
		var pageTables = document.getElementsByTagName('table');
		var table = null;
		
		if(pageTables.length >= display_group_games_in_table_number)
		{
			table = pageTables[display_group_games_in_table_number];
		}
		else
		{
			GM_log('table '+display_group_games_in_table_number+' not found');
		}
		//if there's page content then insert the game(s) as an header
		if(table != null)
		{
			for (var i=0; i<matchdata.length; i++) 
			{
				if (matchdata[i].tournament_display == true) 
				{

					var d = document.createElement('div');
					var html = matchdata[i].html;
					
					//insert Group Game in the header
					html = html.replace('<td align="center" colspan="8">', '<td colspan="8" align="center"><b style="color:'+match_header_color+';">Group Game: </b>&nbsp;&nbsp;&nbsp;');
					//highlight spectate link
					html = html.replace('<a href="/bbowl.jnlp', '<a style="color:'+spectate_link_color+'" href="bbowl.jnlp');
					html = html.replace(/class=\"even\"/g, 'class="odd"');
					//wrap html in a table for neatness
					d.innerHTML = '<table style="border: solid 2px black; margin-left: auto; margin-right: auto;" border="0" cellspacing="0" cellpadding="5">'+html+'</table>';
					table.parentNode.insertBefore(d, table);
					
				}
			}
		}
	}
}

//popup match details
function onMouseOverMatchLink(e) {
	var data = g_matchdata[parseInt(this.name)];
	var html = data.html;
	//remove spec link in popup 
	html = html.replace(data.speclink, '&nbsp;');
	//even is darker
	html = html.replace(/class=\"odd\"/g, 'class="even"');
	html = '<table style="border: solid 2px black; margin-left: auto; margin-right: auto;" border="0" cellspacing="0" cellpadding="5">'+html+'</table>';
	javascriptPopup(html);
}

var bltd = firstTdMatchingContent('Buddy List');
if (bltd) {
	if (buddy_list_at_top) {
      		var bl = bltd.parentNode.parentNode.parentNode;
      		var prev = bl.previousSibling.previousSibling;
      		var bl_parent = bl.parentNode;
      		bl_parent.removeChild(bl);
      		bl_parent.insertBefore(bl, prev);
      		bl_parent.insertBefore(document.createElement('br'), prev);
	}
	if (sort_buddies_by_activity || buddies_show_online_for) {
		var tbody = bltd.parentNode.parentNode;
		var rows = tbody.childNodes;
		var sortable_rows = new Array();
		for (var i=1; i<rows.length-1; i++) {
			//coachname = rows[i].firstChild.childNodes[1].href.split('~')[1]			
			//get 'last seen' time as integer. If no time is shown we assume they are online
			var time=0;
			if (rows[i].childNodes.length > 1) {
				var res = /^\((\d+)(\w)\)$/.exec(rows[i].childNodes[1].innerHTML);
				if (res)
					time = parseInt(res[1]) * { m:1, h:60, d:60*24, w:60*24*7 }[res[2]];
			}
			sortable_rows.push( [time, rows[i]] );
			
			//highlight icons for recently seen buddies
			if (buddies_show_online_for && time<buddies_show_online_for)
				rows[i].firstChild.firstChild.src = 'http://fumbbl.com/FUMBBL/Images/GreenBuddy.png';
		}
		if (sort_buddies_by_activity) {
			//sort by time
			sortable_rows.sort( function(a,b){ return a[0]-b[0]; } );
	
			//remove each row in order and insert at bottom of table
			for (var i=0; i<sortable_rows.length; i++) {
				var row = sortable_rows[i][1];
				tbody.removeChild(row);
				tbody.insertBefore(row, tbody.childNodes[tbody.childNodes.length-1]);
			}
		}
	}
}
addCurrentGames();

