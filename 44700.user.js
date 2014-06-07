// ==UserScript==
// @name			PGHE
// @description		Shows more informations about users and gangs inside the pennergame highscore table
// @version			3.0.2
// @namespace		http://bitcrunch.de/pennergame/
// @author			Shorty, Antitheus
// @homepage		http://bitcrunch.de
// @include			http://*pennergame.de/highscore*
// @include			http://*dossergame.co.uk/highscore*
// @license			GPLv3
// @require			http://home.arcor.de/GrafDraculathechosen/pghe/javascript/pg-sc-api-2-5-1.js
// @require			http://home.arcor.de/GrafDraculathechosen/pghe/javascript/pghe_api_v3.0.2.js
// ==/UserScript==

/**
 * PennergameHighscoreExtension Copyright (C) 2009 Shorty, Marco Müller
 * 
 * GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any
 * later version.
 * 
 * PennergameHighscoreExtension is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the NU General
 * Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 * 
 * http://bitcrunch.de
 */

var PGHE = false;

var meta= new Object({
	id:1,
	name:'PGHE',
	version:'3.0.2',
	host:'http://userscripts.org/scripts/show/41070'
});

var require = new Object({
	stylesheet:'http://home.arcor.de/GrafDraculathechosen/pghe/css/pghe-2-2-0.css',
	javascript:'http://home.arcor.de/GrafDraculathechosen/pghe/javascript/pghe_api_v3.0.2.js'
});


var settings = new Object({
	errorPageUpdateInterval:1500
});


var profile = new Object({
	
});


var user = new Array(

);

var gang = new Array(

);

var count = 0;

var currentServerLoad = getServerLoad();

var rawTable;

var state;

// by Antitheus
var land = "de"; // pennergame
//var land = "uk"; // dossergame

// by Antitheus
var highlightRules = new Object;
highlightRules.cash = new Object;
highlightRules.cash.high=50000;
highlightRules.cash.mid=25000;
highlightRules.cash.low=15000;

/**
 * Is automatically called when the document was loaded
 *
 * @return null
 */
function init() {
	
	if( !api ) {
		alert(meta.name + ': Error!\n\nScripting-API is not loaded. Please re-install the extension from:\n' + meta.host );
		return;
	}
	
	PGHE= new CPGHE ();
	PGHE.constructor();
	
	var loc = location.toString();
	if( loc.match(/highscore\u002Fgang\u002Fsearch/) ) {
		state = 'gang';
	} else {
		state = 'user';
	}
	
	//  @BugFix: Pagination Bug ID:1
	if( loc.match(/\/range\/\?/) ) {
		location = location.toString().replace(/range\/\?/, 'range/1/?');
	}
	
	//  @BugFix: Highscore Pagination Bug ID:3
	if( loc.match(/highscore\/$/) || loc.match(/highscore\/\?/) ) {
		location = location.toString().replace(/highscore\//, 'highscore/1/');
	}
	
	if( isErrorPage() ) {
		// @BugFix: Server-Load not switchable Bug ID:4
		createErrorPageNavigation();
	} else {
		taskManager("run");
	}
} 


/**
 * TODO describe here...
 * 
 * @param task
 * @return
 */
function taskManager( task ) {
	if( state == 'gang' ) {
		switch ( task ) {
		  case "run":
			  createLayout();
			  break;
		  case "layout::complete":
			  PGHE.loadOverview( overviewHandler );
			  break;
		  case "overview::complete":
			  PGHE.loadLetsFigth( letsFightHandler );
			  break;
		  case "letsfight::complete":
			  insertDashboardData();
			  break;
		  case "dashboard::complete":
			  statusMessage(PGHE.lang.statusmessage.gang_search_result);
			  renderGangSearchResultTable();
			  break;
		  case "showGangSearchResults:complete":
			  statusMessage(PGHE.lang.statusmessage.script_update);
			  PGHE.scriptUpdate( meta.id, scriptUpdateHandler );
			  break;
		  default:
			  stack.push( [ 3, 'PGHE::taskManager', task ] );
		  	  break;
		}
	} else {
		switch ( task ) {
		  case "run":
			  createLayout();
			  break;
		  case "layout::complete":
			  PGHE.loadOverview( overviewHandler );
			  break;
		  case "overview::complete":
			  PGHE.loadLetsFigth( letsFightHandler );
			  break;
		  case "letsfight::complete":
			  insertDashboardData();
			  break;
		  case "dashboard::complete":
			  if( GET('details') ) {
				  statusMessage(PGHE.lang.statusmessage.collect_gang_ids);
				  PGHE.loadGangInfo( GET('details'), collectGangIDs )
			  } else {
				  statusMessage(PGHE.lang.statusmessage.collect_user_ids);
				  collectUserIDs();
			  }
			  break;
		  case "userids::collected":
			  statusMessage(PGHE.lang.statusmessage.load_user_info);
			  PGHE.loadUserInfo( user[ count ], userHandler );
			  break;
		  case "userinfo::complete":
			  if( GET('serverload') == 'middle' || GET('serverload') == 'low' ) {
				  statusMessage(PGHE.lang.statusmessage.load_gang_info);
				  PGHE.loadGangInfo( user[ count ].gang.id, gangHandler);
			  } else {
				  taskManager("ganginfo::complete");
			  }
			  break;
		  case "ganginfo::complete":
			  if( GET('serverload') == 'low' ) {
				  statusMessage(PGHE.lang.statusmessage.load_user_profile);
				  PGHE.loadUserProfile( user[ count ].id, userProfileHandler );
			  } else {
				  taskManager("userprofile::complete");
			  }
			  break;
		  case "userprofile::complete":
			  statusMessage(PGHE.lang.statusmessage.insert_highscore_data);
			  insertHighscoreData();
			  break;
		  case "insert::complete":
			  statusMessage(PGHE.lang.statusmessage.script_update);
			  PGHE.scriptUpdate( meta.id, scriptUpdateHandler );
			  break;
		  case "updatecheck::complete":
			  if( GET('debug') ) {
				  getStackTrace( GET('debug') );
			  }
			  break;
		  default:
			  stack.push( [ 3, 'PGHE::taskManager', task ] );
		  	  break;
		}
	}
}


		GM_log( "test" );

/**
 * TODO describe here...
 * 
 * @return null
 */
function createLayout() {
	
	try {
		//  raw user table
		rawTable = $$('tr', $$('table')[ 0 ] );
		//  body
		var body = $$('body')[ 0 ];
		body.innerHTML = "";
		
		
		//  head
		var head = $$('head')[ 0 ];
		head.innerHTML = "";
		
		
		//  meta
		var ctype = createElement('meta', {'http-equiv': 'content-type', content: 'text/html; charset=UTF-8'});
		head.appendChild(ctype);
		
		
		//  title
		var title = createElement('title');
		title.innerHTML = 'Bitcrunch.de | PennergameHighscoreExtension';
		document.title = title.innerHTML;
		head.appendChild(title);
		
		
		//  stylesheet
		var style = createElement('link', {rel: 'stylesheet', type: 'text/css', href: require.stylesheet });
		head.appendChild(style);
		
		//  container
		var container = createElement('div');
		container.setAttribute('id', 'container');
		
		
		//  menu
		var menu = createElement('div');
		menu.setAttribute('id', 'menu');
		
		var lang_menu= PGHE.lang.menu;
		var items = new Array(
				[lang_menu.overview,	PGHE.url.overview ],
				[lang_menu.skill,		PGHE.url.skill ],
				[lang_menu.activities,	PGHE.url.activities ],
				[lang_menu.city,		PGHE.url.city ],
				[lang_menu.stock,		PGHE.url.stock ],
				[lang_menu.letsfight,	PGHE.url.letsfight ],
				[lang_menu.gang,		PGHE.url.gang ],
				[lang_menu.gangcredit,	PGHE.url.gang + 'credit/' ],
				[lang_menu.gangforum,	PGHE.url.gang + 'forum/' ],
				[lang_menu.news,		PGHE.url.news ],
				[lang_menu.blog,		PGHE.url.blog ],
				[lang_menu.bitcrunch,	'http://bitcrunch.de/pennergame' ]
		);
		
		var ul = createElement('ul');
		ul.setAttribute('id', 'navlist');
		for(var i = 0; i < items.length; i++ ) {
			var li = createElement('li');
			var  a = createElement('a');
			a.setAttribute('href', items[ i ][ 1 ]);
			a.innerHTML = items[ i ][ 0 ];
			li.appendChild(a);
			ul.appendChild(li);
		}
		menu.appendChild(ul);
		
		//  dashboard
		var panel = createElement('div');
		panel.setAttribute('id', 'dashboard');
		panel.innerHTML = "<span style='font-variant:small-caps;font-size:1.2em;font-family:tahoma,sans-serif;font-weight:bold'>DashBoard</span>";
		
		
		//  content
		var content = createElement('div');
		content.setAttribute('id', 'content');
		content.innerHTML  = "<br /><b>&nbsp;<a style='text-decoration:none;color:#808080;' href='" + PGHE.url.highscore + "'>" + meta.name + "</a></b><br /><br />";
				
		//  options
		var options = createElement('div');
		options.setAttribute('id', 'options');
		options.setAttribute('style', 'margin-bottom:10px;margin-left:1px;');
		options.appendChild(PGHE.getUserSearchForm());
		options.appendChild(PGHE.getGangSearchForm());
		options.innerHTML += "<br /><br />";
		content.appendChild(options);
		
		//  usertable
		var usertable = createElement('div');
		usertable.setAttribute('id', 'usertable');
		content.appendChild(usertable);
		
		//  footer
		var footer = createElement('div');
		footer.setAttribute('id', 'footer');
		footer.innerHTML  = "<img style='float:left;' src='http://www.gnu.org/graphics/gplv3-88x31.png' />"
		footer.innerHTML += "&nbsp;&nbsp;<b>" + meta.name + "</b> v" + meta.version + " is released under the hood of <a href='http://www.gnu.org/licenses/'>GPLv3</a> Feel free to write a review or discuss with me about"
		footer.innerHTML += "this script at <a target='_blank' href='http://userscripts.org/scripts/show/41070'>Userscripts.org</a><br />";
		footer.innerHTML += "&nbsp;&nbsp;or join our <a target='_blank' href='http://userscripts.org/groups/46'>Pennergame Scripting Group</a>. Have a nice day! Shorty/<a href='http://bitcrunch.de'>Bitcrunch.de</a>";
		
			
		//  append
		container.appendChild(menu);
		container.appendChild(panel);
		container.appendChild(content);
		container.appendChild(footer);
		body.appendChild(container);
		
		taskManager( "layout::complete" );
	} catch ( error ) {
		stack.push( [ 1, 'PGHE::createLayout()', error ] );
	}
}



/**
 * TODO describe here...
 * 
 * @return null
 */
function collectUserIDs() {
	
	for(var i = 0; i < rawTable.length; i++) {
		try {
			var uid = $$('td', rawTable[ i ])[ 1 ].innerHTML.match(/id\:([0-9]{1,})/)[ 1 ];
			user.push(uid);
		} catch(error){
			stack.push( [ 2, 'PGHE::collectUserIDs()', error ] );
		}
	}
	taskManager( "userids::collected" );
}


/**
 * TODO describe here...
 * 
 * @param result
 * @return
 */
function overviewHandler( result ) {
	try {
		profile.overview = result;
	} catch(error) {
		stack.push( [ 1, 'PGHE::overviewHandler()', error ] );
	} finally {
		taskManager("overview::complete");
	}
}


/**
 * TODO describe here...
 * 
 * @param result
 * @return
 */
function letsFightHandler( result ) {
	try {
		profile.letsfight = result;
	} catch(error) {
		stack.push( [ 1, 'PGHE::letsFightHandler()', error ] );
	} finally {
		taskManager("letsfight::complete");
	}
}


/**
 * TODO describe here...
 * 
 * @param result
 * @return
 */
function userHandler( result, callback ) {
	try {
		user[ count ] = result;
		if( ++count < user.length ) {
			if (callback)
				PGHE.loadUserInfo( user[ count ], userHandler );
			else
				PGHE.loadUserInfo( user[ count ], userHandler );
		} else {
			count = 0;
			rawTable = null;
			taskManager("userinfo::complete");
		}
	} catch(error) {
		stack.push( [ 1, 'PGHE::userHandler()', error ] );
	}
}


/**
 * TODO describe here...
 * 
 * @param result
 * @return
 */
function gangHandler( result, callback ) {
	try {
		user[ count ].gang = result;
		if( ++count < user.length ) {
			PGHE.loadGangInfo( user[ count ].gang.id, gangHandler);
		} else {
			count = 0;
			taskManager("ganginfo::complete");
		}
	} catch(error) {
		stack.push( [ 1, 'PGHE::gangHandler()', error ] );
	}
}


/**
 * TODO describe here...
 * 
 * @param result
 * @return null
 */
function userProfileHandler( result, callback ) {
	try {
		user[ count ].pet = result.pet;
		user[ count ].awards = result.awards;
		user[ count ].premium = result.premium;
		user[ count ].online = result.online;
		if( ++count < user.length ) {
			PGHE.loadUserProfile( user[ count ].id, userProfileHandler);
		} else {
			count = 0;
			taskManager("userprofile::complete");
		}
	} catch(error) {
		stack.push( [ 1,'PGHE::userProfileHandler()', error ] );
	}
}


/**
 * TODO describe here...
 * 
 * @return
 */
function insertDashboardData() {
	try {
		var div, img, a, tmp;
		var status = $('dashboard');
		var buffer = new Object; // by Antitheus
		var lang_dashboard = PGHE.lang.dashboard;
		if( profile.overview ) {
			
			//  avatar
			div = createElement('div');
			div.setAttribute('id', 'avatar');
			img = createElement('img');
			img.setAttribute('src', profile.overview.avatar );
			img.setAttribute('style', 'max-height:97px;max-width:97px;' );
			div.appendChild(img);
			status.appendChild(div);
			
			
			//  skills
			div = createElement('div');
			div.setAttribute('id', 'skills');
			var skills_string=lang_dashboard.skills;
			
			skills_string=skills_string.replace(/\{\$att\}/,profile.letsfight.att);
			skills_string=skills_string.replace(/\{\$def\}/,profile.letsfight.def);
			skills_string=skills_string.replace(/\{\$permille\}/,highlightPermille(profile.overview.permille));
			skills_string=skills_string.replace(/\{\$cash\}/,highlightCash(profile.overview.cash));
			skills_string=skills_string.replace(/\{\$points\}/,profile.overview.points);
			skills_string=skills_string.replace(/\{\$position\}/,profile.overview.position);
			
			div.innerHTML =skills_string;
			
			status.appendChild(div);
			
			
			//  stats
			tmp = profile.letsfight;
			var fights_total =  Number(tmp.win) + Number(tmp.loose);
			var wins_percentage = Math.round(Number(tmp.win) * 100 / fights_total);
			var loose_percentage = Math.round(Number(tmp.loose) * 100 / fights_total);
			
			div = createElement('div');
			div.setAttribute('id', 'fights');
			
				var stats_string=lang_dashboard.stats.main;
				
				stats_string=stats_string.replace(/\{\$win\}/,					tmp.win);
				stats_string=stats_string.replace(/\{\$wins_percentage\}/,		wins_percentage);
				stats_string=stats_string.replace(/\{\$loose\}/,				tmp.loose);
				stats_string=stats_string.replace(/\{\$loose_percentage\}/,	loose_percentage);
				stats_string=stats_string.replace(/\{\$min_points\}/,			tmp.min_points);
				stats_string=stats_string.replace(/\{\$max_points\}/,			tmp.max_points);
			
			div.innerHTML =stats_string;			
			
			status.appendChild(div);
			
			var show_victim = $('show_victim');
						
				show_victim.appendChild(
					getMyVictims (
						tmp.max_points,
						tmp.min_points,
						lang_dashboard.stats.victim_all));
							
				/* low */
				buffer.max_points = Math.round( tmp.min_points * 1.01 );
				buffer.min_points = tmp.min_points;
				
				show_victim.appendChild(
					getMyVictims (
						buffer.max_points,
						buffer.min_points,
						lang_dashboard.stats.victim_low));
				
				/* middle */
				buffer.mid_points = tmp.max_points - (tmp.min_points / 2);
				
				buffer.max_points = Math.round( buffer.mid_points * 0.99 );
				buffer.min_points = Math.round( buffer.mid_points * 1.01 );
				
				show_victim.appendChild(
					getMyVictims (
						buffer.max_points,
						buffer.min_points,
						lang_dashboard.stats.victim_middle));
				
				/* high */
				buffer.max_points = tmp.max_points;
				buffer.min_points = Math.round( tmp.max_points * 0.999 );
				
				show_victim.appendChild(
					getMyVictims (
						buffer.max_points,
						buffer.min_points,
						lang_dashboard.stats.victim_high));
				
			// by Antitheus END
						
			//  outgoing fight
			tmp = profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'outgoingfight');
			if ( tmp.outgoing_fight ) {
				tmp = profile.letsfight.outgoing_fight;
				var outgoing_string=lang_dashboard.outgoingfight.fight;
					outgoing_string=outgoing_string.replace(/\{\$profil_url\}/,		PGHE.url.user_profile.replace(/\{\$id\}/, tmp.id ));
					outgoing_string=outgoing_string.replace(/\{\$user_name\}/,		tmp.name.slice(0, 23));
					outgoing_string=outgoing_string.replace(/\{\$fight_end\}/,		tmp.end);
					outgoing_string=outgoing_string.replace(/\{\$stop_fight\}/,		PGHE.getStopFightForm(lang_dashboard.outgoingfight.stopfight));
					div.innerHTML = outgoing_string;
			} else {
				div.innerHTML = lang_dashboard.outgoingfight.nofight;
			}
			status.appendChild(div);
			
			//  incomming fight
			tmp = profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'incommingfight');
			if ( tmp.incomming_fight ) {
				tmp = profile.letsfight.incomming_fight;
				
				var incomming_string=lang_dashboard.imcominggoingfight.fight;
					incomming_string=incomming_string.replace(/\{\$profil_url\}/,		PGHE.url.user_profile.replace(/\{\$id\}/, tmp.id ));
					incomming_string=incomming_string.replace(/\{\$user_name\}/,		tmp.name.slice(0, 23));
					incomming_string=incomming_string.replace(/\{\$fight_end\}/,		tmp.end);
					div.innerHTML = incomming_string;
			} else {
				div.innerHTML = lang_dashboard.imcominggoingfight.nofight;
			}
			status.appendChild(div);
			
			
			//  server traffic
			tmp = profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'info');
				var servertraffic_string=lang_dashboard.servertraffic.main;
								
				switch( currentServerLoad ) {
					case 'high' :
						servertraffic_string=servertraffic_string.replace(/\{\$server_traffic_now\}/,lang_dashboard.servertraffic.now_high);
						break;
					case 'middle' :
						servertraffic_string=servertraffic_string.replace(/\{\$server_traffic_now\}/,lang_dashboard.servertraffic.now_middle);
						break;
					case 'low' :
						servertraffic_string=servertraffic_string.replace(/\{\$server_traffic_now\}/,lang_dashboard.servertraffic.now_low);
						break;
					default :
						servertraffic_string=servertraffic_string.replace(/\{\$server_traffic_now\}/,lang_dashboard.servertraffic.now_unkown);
				}			
				
				//  server load
				var str = location.toString();
				if( str.search(/\?/) != -1 ) {
					str = str.replace(/&?serverload=(high|middle|low)/, '');
					str = str + '&'
				} else {
					str = str + '?';
				}
				
				switch( GET('serverload') ) {
					case 'high' :
						servertraffic_string=servertraffic_string.replace(/\{\$change\}/,lang_dashboard.servertraffic.change_h);
						break;
					case 'middle' :
						servertraffic_string=servertraffic_string.replace(/\{\$change\}/,lang_dashboard.servertraffic.change_m);
						break;
					case 'low' :
						servertraffic_string=servertraffic_string.replace(/\{\$change\}/,lang_dashboard.servertraffic.change_l);
						break;
					default :
						servertraffic_string=servertraffic_string.replace(/\{\$change\}/,lang_dashboard.servertraffic.change);
						break;
				}
				
				servertraffic_string=servertraffic_string.replace(/\{\$title_h\}/,lang_dashboard.servertraffic.infotext_h);
				servertraffic_string=servertraffic_string.replace(/\{\$title_m\}/,lang_dashboard.servertraffic.infotext_m);
				servertraffic_string=servertraffic_string.replace(/\{\$title_l\}/,lang_dashboard.servertraffic.infotext_l);
				
				servertraffic_string=servertraffic_string.replace(/\{\$url_string\}/,str);
				servertraffic_string=servertraffic_string.replace(/\{\$url_string\}/,str);
				servertraffic_string=servertraffic_string.replace(/\{\$url_string\}/,str);		
				
				div.innerHTML  = servertraffic_string;
			status.appendChild(div);
		} else {
			var lang_dashboard = PGHE.lang.dashboard;
			status.innerHTML = lang_dashboard.couldnt_load;;
		}
		taskManager( "dashboard::complete" );
	} catch(error) {
		stack.push( [ 1, 'PGHE::insertDashboardData()', error ] );
	}
}


/**
 * TODO describe here...
 * 
 * @return null
 */
function insertHighscoreData() {
	if( renderUserTable() )
		taskManager("insert::complete");
}


/**
 * TODO describe here...
 * 
 */
var sortColumn = '';
var sortType = 'ASC';
function userTableSort( a, b ) {
	if( sortColumn == 'reg_since' ) {
		var datePattern = /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/;
		var aD = a[ sortColumn ].match( datePattern );
		var bD = b[ sortColumn ].match( datePattern );
	    var a = new Date( aD[ 3 ], aD[ 2 ] - 1, aD[ 1 ] );
	    var b = new Date( bD[ 3 ], bD[ 2 ] - 1, bD[ 1 ] );
	    if( a > b )
	    	return -1;
	    if( a < b )
	    	return 1;
	} else if( sortColumn == 'cash' || sortColumn == 'points' || sortColumn == 'position' ) {
		a = Number( a[ sortColumn ] );
		b = Number( b[ sortColumn ] );
	    if( a > b )
	    	return -1;
	    if( a < b )
	    	return 1;
	} else if( sortColumn == 'name' ) {
	    a = a[ sortColumn ].toLowerCase();
	    b = b[ sortColumn ].toLowerCase();
	    return ((a < b) ? -1 : ((a > b) ? 1 : 0));	
	} else if( sortColumn == 'gangname' ) {
		a = a.gang.name.toLowerCase();
		b = b.gang.name.toLowerCase();
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));	
	} else if( sortColumn == 'gangpoints' ) {
		a = Number( a.gang.points );
		b = Number( b.gang.points );
	    if( a > b )
	    	return -1;
	    if( a < b )
	    	return 1;
	} else if( sortColumn == 'gangposition' ) {
		a = Number( a.gang.position );
		b = Number( b.gang.position );
	    if( a > b )
	    	return -1;
	    if( a < b )
	    	return 1;
	} else if( sortColumn == 'gangmembers' ) {
		a = Number( a.gang.member_count );
		b = Number( b.gang.member_count );
	    if( a > b )
	    	return -1;
	    if( a < b )
	    	return 1;
	} else {
		return null;
	}
}


/**
 * TODO describe here...
 * 
 * @return
 */
function userTableEventHandler( event ) {
	try {
		sortColumn = event.target.attributes[ 1 ].value;
		user = user.sort(userTableSort);
		if( sortType == 'ASC') {
			renderUserTable();
			sortType = 'DES';
		} else {
			user.reverse();
			renderUserTable();
			sortType = 'ASC';
		}
	} catch(error) {
		stack.push( [ 1, 'PGHE::userTableEventHandler()', error, event ] );
	}
}


/**
 * TODO describe here...
 * 
 * @return
 */
function renderUserTable() {
	try {
		
		var tr, th, td, a, div, img;
		var lineBreakAfter = 20;
		var content = $('usertable');
		content.innerHTML = "";
		
		if( !location.toString().match(/\/search/) ) {
			if(!GET('details')) {
				content.appendChild(getPagination());
				content.innerHTML += "<br /><br />";
			}
		}
		
		content.addEventListener("click", userTableEventHandler, false);
		
		var table = createElement('table');
		var thead = createElement('thead');
		var tbody = createElement('tbody');
		var tfoot = createElement('tfoot');
		
		var columns = new Array(
				[ 'Platz', 20, 'position' ],
				[ 'Spieler', 120, 'name' ],
				[ 'Punkte', 40, 'points' ],
				[ 'Geld', 80, 'cash' ],
				[ 'Promille', 35, '' ],
				[ 'Dabei seit', 20, 'reg_since' ],
				[ 'Ausz.', 10, '' ],
				[ 'Haustier', 50, '' ],
				[ 'Bande', 130, 'gangname' ],
				[ 'Punkte', 20, 'gangpoints' ],
				[ 'Platz', 10, 'gangposition' ],
				[ 'Mitglieder', 10, 'gangmembers' ]
		);
		
		tr = createElement('tr');
		for(var label in columns) {
			th = createElement('th');
			th.setAttribute('width', columns[ label ][ 1 ]);
			th.setAttribute('name', columns[ label ][ 2 ]);
			th.innerHTML = columns[ label ][ 0 ];
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		table.appendChild(tbody);
		table.appendChild(tfoot);
		content.appendChild(table);
		
		for(var i = 0; i < user.length; i++ ) {
			
			tr = createElement('tr');
			tr.setAttribute('class', i % 2 ? 'even' : 'odd' );
			
			//  from user api
			try {
				td = createElement('td');
				td.innerHTML = "<b>" + user[ i ].position + "</b>";
			} catch ( error ) {
				//stack.push( error );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				
				var user_fight = PGHE.url.letsfight_to;
				
				td = createElement('td');
				a = createElement('a');
				a.setAttribute('href', PGHE.url.user_profile.replace(/\{\$id\}/, user[ i ].id ) );
				a.setAttribute('target', '_blank' );
				a.innerHTML = user[ i ].name.slice(0, lineBreakAfter);
				td.appendChild(a);
				td.innerHTML += "<br />";
				
				if( Number(user[ i ].points) >= Number(profile.letsfight.min_points) && Number(user[ i ].points) <= Number(profile.letsfight.max_points) ) {

					a = createElement('a');
					a.setAttribute('style', 'position:relative;top:7px;padding-right:3px;');
					a.setAttribute('target', '_self' );
					a.setAttribute('href', user_fight.replace(/\{\$username\}/, user[ i ].name ) );
					img = createElement('img');
					img.setAttribute('style', 'border:none;');
					img.setAttribute('src', 'http://media.pennergame.de/img/att.gif' );
					a.appendChild(img);
					td.appendChild(a);

				}
				
				
				if( user[ i ].online ) {
					if( user[ i ].online == 'online' ) {
						td.innerHTML += "<img style='position:relative;top:5px;' src='http://static.bitcrunch.de/images/pg-user-online.gif' />";
					}
				}
				
			} catch ( error ) {
				//stack.push( error );
			} finally {
				tr.appendChild(td);
			}
				
			try {
				td = createElement('td');
				td.innerHTML = user[ i ].points;
			} catch ( error ) {
				//stack.push( error );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				if( user[ i ].cash )
					td.innerHTML = highlightCash(user[ i ].cash);
			} catch ( error ) {
				//stack.push( error );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				td.innerHTML = "<div id='permille'><img src='" + PGHE.url.user_signature.replace( /\{\$id\}/ ,user[ i ].id) + "'></div>";
			} catch ( error ) {
				//stack.push( error );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				td.innerHTML = user[ i ].reg_since;
			} catch ( error ) {
				//stack.push( error );
			} finally {
				tr.appendChild(td);
			}

			
			
			//  from user profile
			try {
				td = createElement('td');
				td.innerHTML = user[ i ].awards.count + " / " + user[ i ].awards.shown;
			} catch ( error ) {
				stack.push( [ 3, 'PGHE::renderUserTable::awards.count', user[ i ].name, error ] );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				div = createElement('div');
				div.setAttribute('class', 'pet');
				if( user[ i ].pet )
					div.innerHTML = '<img src="' + PGHE.url.media_pet_images.replace(/\{\$id\}/, user[ i ].pet.id ) + '" title="' + user[ i ].pet.name + ' (Att.: ' + user[ i ].pet.att + ', Def.: ' + user[ i ].pet.def + ', Pit.:' + user[ i ].pet.pity + ')"/>';
				td.appendChild(div);
			} catch ( error ) {
				stack.push( [ 3, 'PGHE::renderUserTable::pet', user[ i ].name, error ] );
			} finally {
				tr.appendChild(td);
			}
			

			// from gang api
			try {
				td = createElement('td');
				if( user[ i ].gang.name ) {
					a  = createElement('a');
					a.setAttribute('href', PGHE.url.gang_profile.replace(/\{\$id\}/, user[ i ].gang.id ) );
					a.setAttribute('target', '_blank' );
					a.innerHTML = user[ i ].gang.name.slice(0, lineBreakAfter) + " " + user[ i ].gang.name.slice(lineBreakAfter);
					td.appendChild(a);
				}
			} catch ( error ) {
				stack.push( [ 3, 'PGHE::renderUserTable::gang', user[ i ].name, error ] );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				if ( user[ i ].gang.points )
					td.innerHTML = user[ i ].gang.points;
			} catch ( error ) {
				stack.push( [ 3, 'PGHE::renderUserTable::gang.points', user[ i ].name, error ] );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				if( user[ i ].gang.position )
					td.innerHTML = user[ i ].gang.position;
			} catch ( error ) {
				stack.push( [ 3, 'PGHE::renderUserTable::gang.position', user[ i ].name, error ] );
			} finally {
				tr.appendChild(td);
			}
				
			
			try {
				td = createElement('td');
				if( user[ i ].gang.member_count )
					td.innerHTML = user[ i ].gang.member_count;
			} catch ( error ) {
				stack.push( [ 3, 'PGHE::renderUserTable::gang.member_count', user[ i ].name, error ] );
			} finally {
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		
		if( !location.toString().match(/\/search/) ) {
			if(!GET('details')) {
				content.innerHTML += "<br />";
				content.appendChild(getPagination());
				content.innerHTML += "<br />";
			}
		}
		return true;
	} catch( error ) {
		stack.push( [ 1, 'PGHE::renderUserTable()', error ] );
	}
}


/**
 * Returns the number of current highscore page.
 * 
 * @return int The page id
 */
function getPageID() {
	try {
		var id = Number(location.toString().match(/[0-9]+/));
		return id;
	} catch( error ) {
		stack.push( [ 3, 'PGHE::getPageID()', error ] );
	}
}


/**
 * Returns true if an page error occurred else false.
 * 
 * @return boolean True or false
 */
function isErrorPage() {
	try {
		var summary = $('summary');
		var n = summary.innerHTML.match(/(Interner Fehler|Seite nicht gefunden)/);
		if( n != -1 )
			return true;
	} catch( error ) {
		stack.push( [ 3, 'PGHE::isErrorPage()', error ] );
	}
}


/**
 * Adds a simple navigation to the highscore error page.
 * 
 * @return null
 */
function createErrorPageNavigation() {
	try {
		
		//  #Error pages: Missing GET-Variables(Bug ID:6)
		var loc = location.toString();
		if( loc.match(/highscore\/range/) ) {
			nextPage = loc.replace(/range\/[0-9]+/, 'range/' + ( getPageID() + 1 ) );
			prevPage = loc.replace(/range\/[0-9]+/, 'range/' + ( getPageID() - 1 ) );
		} else {
			nextPage = loc.replace(/highscore\/[0-9]+/, 'highscore/' + ( getPageID() + 1 ) );
			prevPage = loc.replace(/highscore\/[0-9]+/, 'highscore/' + ( getPageID() - 1 ) );
		}
		nextPage = nextPage.replace(/-1|0/, 1);
		prevPage = prevPage.replace(/-1|0/, 1);
		
		if( GET('auto') == 'next' ) {
			setTimeout( "self.location.href='" + nextPage + "'", settings.errorPageUpdateInterval );
		} else if( GET('auto') == 'previous' ) {
			setTimeout( "self.location.href='" + prevPage + "'", settings.errorPageUpdateInterval );
		}
		
		var div = createElement('div');
		div.innerHTML += "<hr><br /><h5><b>Navigate <u>manually</u> to the next or previous available highscore page</b></h5><br />";
		
		var prev = document.createElement('a');
		prev.setAttribute('href', prevPage  );
		prev.setAttribute('target','_self');
		prev.innerHTML = "Previous";
		div.appendChild(prev);
		div.innerHTML += " | ";
		
		var next = createElement('a');
		next.setAttribute('href', nextPage );
		next.setAttribute('target','_self');
		next.innerHTML = "Next";
		div.appendChild(next);
		div.innerHTML += "<br /><br /><br /><h5><b>Navigate <u>automatically</u> to the next or previous available highscore page</b></h5><br />";
		
		var prev_auto = createElement('a');
		prev_auto.setAttribute('href', prevPage + "&auto=previous" );
		prev_auto.setAttribute('target','_self');
		prev_auto.innerHTML = "Previous";
		div.appendChild(prev_auto);
		div.innerHTML += " | ";
		
		var next_auto = createElement('a');
		next_auto.setAttribute('href', nextPage + "&auto=next" );
		next_auto.setAttribute('target','_self');
		next_auto.innerHTML = "Next";
		div.appendChild(next_auto);
		
		$$('body')[ 0 ].appendChild(div);
	} catch ( error ) {
		stack.push( [ 3, 'PGHE::createErrorPageNavigation()', error ] );
	}
}


/**
 *  TODO describe here...
 *  
 *  @value
 *  @param message
 */
function statusMessage( message ) {
	try {
		$('loaderstatus').innerHTML = message;
	} catch( error ) {
		stack.push( [ 1, 'PGHE::statusMessage()', error, message ] );
	}
}


/**
 * TODO describe here...
 * 
 * @param result
 * @return
 */
function scriptUpdateHandler( result ) {
	try {
		if( result ) {
			if( result.version != meta.version ) {
				var update = createElement('div');
				update.setAttribute('id', 'update');
				update.innerHTML = "Ein <span style='color:green;'><b>Update</b></span> der <span style='cursor:pointer;' title='" + result.description + "'><b>" + result.name + "</b></span> von Version " + meta.version + " auf <b>" + result.version + "</b> ist vorhanden<br />";
				update.innerHTML += "Klick <b><a title='" + result.source + "' href='" + result.source + "'>hier</a></b> um das Update zu installieren. <b>Information</b> zur neuen Version:<br /><br />";
				update.innerHTML += "" + result.notes + "";/**/
/*				update.innerHTML += "<span style='with:300px;text-align:left;'>" + result.notes + "</span>";/**/
/*				update.innerHTML += "<table style='text-align:center;'><tr><td style='with:300px;text-align:left;'>" + result.notes + "</td></tr></table>";/**/
				insertAfter($('dashboard'), update );
			} else {
				statusMessage("Keine Updates vorhanden");
			}
		} else {
			statusMessage("Updateserver ist nicht erreichbar");
		}
		taskManager("updatecheck::complete");
	} catch( error ) {
		stack.push( [ 1, 'PGHE::scriptUpdateHandler()', error ] );
	}
}


/**
 * TODO describe here...
 * 
 * @return
 */
function getPagination() {
	try {
		var currentPage = getPageID();
		var navigation = createElement('div');
		navigation.setAttribute('id', 'pagination');
		
		var nextPage = location.toString().replace(/\/[0-9]+/, ('/' + ( currentPage + 1 ) ) ) ;
		var prevPage = location.toString().replace(/\/[0-9]+/, ('/' + ( currentPage != 1 ? currentPage - 1 : 1 ) ) );
		
		for(var i = currentPage - 6; i < currentPage - 1; i++ ) {
			if( i >= 1 )
				navigation.innerHTML += "<a class='small-button' href='" + prevPage.replace(/\/[0-9]+/, '/' + i ) + "'>" + i + "</a> ";
		}
		navigation.innerHTML  += "<a class='small-button' style='position:relative;left:1px;' href='" + prevPage + "'>Vorherige Seite</a>";
		navigation.innerHTML  += " <a class='small-button' href='" + nextPage + "'>N&auml;chste Seite</a> ";
		for(var i = currentPage + 2; i <= currentPage + 6; i++ ) {
			navigation.innerHTML += "<a class='small-button' href='" + nextPage.replace(/\/[0-9]+/, '/' + i ) + "'>" + i + "</a> ";
		}
		return navigation;
	} catch( error ) {
		stack.push( [ 1, 'PGHE::getPagination()', error ] );
	}
}



// by Antitheus
/**
 * TODO describe here...
 * 
 * @return
 */
function highlightVictimsPoints( points ) {
	var tmp = profile.letsfight;
	
	if (
		(tmp.max_points > points) &&
		(tmp.min_points < points)
		)
		str = '<span class="high">' + points + '</span>';
	else
		str = '<span style="font-weight:bold">' + points + '</span>';
	
	return str;
}

/**
 * TODO describe here...
 * 
 * @return
 */
function highlightPermille( value ) {
	value = Number( value);
	if( value <= 0 )
		str = '<span style="font-weight:bold">' + value + '.00 &#x89;</span>';
	if( value > 0 )
		str = '<span class="low">' + value + ' &#x89;</span>';
	if( value >= 1 )
		str = '<span class="middle">' + value + ' &#x89;</span>';
	if( value >= 2 )
		str = '<span class="high">' + value + ' &#x89;</span>';
	return str;
}

// by Antitheus
/**
 * return the game currency
 *
 * var land definied at TOP
 *
 * @return
 */
function getCurrency() {
	switch (land) {
		case "uk":
			return "&pound;";
		break;
		case "de":
		default:
			return "&euro;";
		break;
	}
}

/**
 * TODO describe here...
 * 
 * @return
 */
function highlightCash( value ) {
	var str = '<span style="font-weight:bold">' + formatNumber(value) + getCurrency() + '</span>';
	var cash = value.slice(0, value.length - 2);
// edit by Antitheus
	if (cash > highlightRules.cash.low )
		str = "<span class='low'>" + formatNumber( value ) + getCurrency() + "</span>";
	if (cash > highlightRules.cash.mid )
		str = "<span class='middle'>" + formatNumber( value ) + getCurrency() + "</span>";
	if (cash > highlightRules.cash.high )
		str = "<span class='high'>" + formatNumber( value ) + getCurrency() + "</span>";
	return str;
}


/* ################################## Gang state ############################################### */


function collectGangIDs( result ) {
	for(var i = 1; i < result.members.length; i++ ) {
		user.push( result.members[ i ].textContent);
	}
	taskManager( "userids::collected" );
}

function renderGangSearchResultTable() {
	
	var div;
	var content = $('usertable');
	content.innerHTML = "";
	
	if( rawTable[ 1 ].innerHTML.match(/Es wurden keine Banden gefunden/) ) {
		div = createElement('div');
		div.setAttribute('style', 'background-color:#282828;color:silver;padding:7px;margin:5px;');
		div.innerHTML = "<b>&nbsp;&nbsp;&nbsp;Kein Ergebnis für die Eingabe: </b>" + GET('name');
		content.appendChild( div );
	} else {
		
		
		var pgn = getGangSearchPagination()
		content.appendChild(pgn);
		if( pgn.innerHTML.match(/button/) ) {
			content.innerHTML += "<br /><br />";
		}
		
		var table = createElement('table');
		var thead = createElement('thead');
		var tbody = createElement('tbody');
		var tfoot = createElement('tfoot');
		
		var columns = new Array(
				[ 'Platz', 150, 'position' ],
				[ 'Bande', 500, 'name' ],
				[ 'Punkte', 150, 'points' ],
				[ 'Anzahl der Mitglieder', 150, 'gangmembers' ],
				[ 'Details', 10, 'gangmembers' ]
		);
		
		tr = createElement('tr');
		for(var label in columns) {
			th = createElement('th');
			th.setAttribute('width', columns[ label ][ 1 ]);
			th.setAttribute('name', columns[ label ][ 2 ]);
			th.innerHTML = columns[ label ][ 0 ];
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		table.appendChild(tbody);
		table.appendChild(tfoot);
		content.appendChild(table);
		
		for(var i = 1; i < rawTable.length; i++ ) {
			
			var r = rawTable[ i ].innerHTML.match(/\u003Cstrong\u003E([0-9]+).*bande\u003A([0-9]+).*none\u003B\u0022\u003E(.*)\u003C\u002Fa\u003E.*\u0022left\u0022\u003E([0-9]+)\u003C\u002Ftd\u003E.*\u003E([0-9]+)/);
			
			tr = createElement('tr');
			tr.setAttribute('class', i % 2 ? 'even' : 'odd' );
			
			td = createElement('td');
			td.innerHTML = "<b>" + r[ 1 ] + "</b>";
			tr.appendChild(td);
			
			td = createElement('td');
			td.innerHTML = "<a target='_blank' href='" + PGHE.url.gang_profile.replace(/\{\$id\}/, r[ 2 ] ) + "'>" + r[ 3 ] + "</a>";
			tr.appendChild(td);
			
			td = createElement('td');
			td.innerHTML = r[ 4 ];
			tr.appendChild(td);
			
			td = createElement('td');
			td.innerHTML = r[ 5 ];
			tr.appendChild(td);
			
			td = createElement('td');
			var a = createElement( 'a' );
			a.setAttribute('style', 'padding:7px;background-color:#282828;');
			a.setAttribute('href', 'http://highscore.pennergame.de/highscore/gang/?serverload=low&details=' + r[ 2 ] );
			a.innerHTML = "Anzeigen";
			td.appendChild(a);
			tr.appendChild(td);
			
			tbody.appendChild(tr);
		}
		taskManager("showGangSearchResults:complete");
	}
}


/**
 * TODO describe here...
 * 
 * @return
 */
function getGangSearchPagination() {
	try {
		
		var whiteSpace;
		var currentPage = getPageID();
		if( currentPage == 0 ) {
			currentPage = 1;
			location = location.toString().replace(/search\/\?/, 'search/1/?');
		}
		
		var navigation = createElement('div');
		navigation.setAttribute('id', 'pagination');
		
		var nextPage = location.toString().replace(/\/[0-9]+/, ('/' + ( currentPage + 1 ) ) ) ;
		var prevPage = location.toString().replace(/\/[0-9]+/, ('/' + ( currentPage != 1 ? currentPage - 1 : 1 ) ) );
		
		if( currentPage > 1 ) {
			navigation.innerHTML  += "<a class='small-button' style='position:relative;left:1px;' href='" + prevPage + "'>Vorherige Seite</a>";
		}
		
		if( rawTable.length >= 21 ) {
			navigation.innerHTML  += " <a class='small-button' href='" + nextPage + "'>Nächste Seite</a> ";
		}
		
		
		return navigation;
	} catch( error ) {
		stack.push( [ 1, 'PGHE::getPagination()', error ] );
	}
}

function getMyVictims(max_points, min_points, htmltext, target) {
	var a = createElement('a');
	a.setAttribute('href', PGHE.url.highscore + '/range/1/?max_points=' + max_points + '&min_points=' + min_points + ( GET('serverload') ? '&serverload=' + GET('serverload') : '' )   );
	if (target)
		a.target = target;
	else
		a.target = "_self";
	a.innerHTML = htmltext;
	return (a);
}

window.addEventListener("load", init, false);