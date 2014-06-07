// ==UserScript==
// @name			HighscoreExtension
// @description		The highscore extension for german pennergame players. It expands the highscore table with a lot of informations about players and gangs.
// @version			3.0.0 alpha
// @namespace		http://bitcrunch.de/pennergame/
// @author			Shorty
// @homepage		http://bitcrunch.de
// @include			http://*pennergame.de/highscore*
// @require			http://static.bitcrunch.de/javascript/pghe-api-3-0-0.js
// @license			GPLv3
// ==/UserScript==


/**
 * PennergameHighscoreExtension Copyright (c) 2009 Shorty
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



/**
 * Contains the script meta data
 * 
 * @type Object
 */
var meta = new Object({
	id:1,
	name:'PennergameHighscoreExtension',
	version:'3.0.0 alpha',
	host:'http://userscripts.org/scripts/show/41070',
	stylesheet:'http://static.bitcrunch.de/css/pghe-3-0-0.css'
});



/**
 * Set of accepted view-states
 * 
 * @type String
 */
var VIEW_STATE_GANG_LIST	= 'GANG_LIST';
var VIEW_STATE_GANG_SEARCH	= 'GANG_SEARCH';
var VIEW_STATE_GANG_DETAILS	= 'GANG_DETAILS';
var VIEW_STATE_USER_LIST	= 'USER_LIST';
var VIEW_STATE_USER_SEARCH	= 'USER_SEARCH';



/**
 * The current view-state
 * 
 * @type String
 * @default null
 */
var VIEW_STATE = null;



/**
 * Data holder for temporary objects
 * 
 * @type Object
 */
var tmp = new Object({
	
	// No comment :)
	count	 : 0,
	
	// Contains the list of user data to render the table
	user	 : new Array(),
	
	// Contains the list of gang data to render the table
	gang	 : new Array(),
	
	// Contains all values from own profile eq. att, def
	profile	 : new Object(),
	
	// Contains the raw/orig. highscore table
	rawTable : new Object(),
	
	// Contains the current server loa value
	currentServerLoad : getServerLoad()
});




/**
 * First run function, called if the window fired up the load event
 * 
 * @return null
 */
function init() {
	
	var l = location.toString();
	
	//  Location rewrite, prevent pagination bugs
	if( l.match(/\/range\/\?/) ) {
		l = l.replace(/range\/\?/, 'range/1/?');
	}
	
	if( l.match(/\/search\/\?/) ) {
		l = l.replace(/search\/\?/, 'search/1/?');
	}
	
	if( l.match(/highscore\/$/) || l.match(/highscore\/\?/) ) {
		l = l.replace(/highscore\//, 'highscore/1/');
	}
	
	if( l.match(/gang\/$/) || l.match(/gang\/\?/) ) {
		l = l.replace(/gang\//, 'gang/1/');
	}
	
	
	//-> View state
	if( l.match(/gang\/.*details/) ) {
		VIEW_STATE = VIEW_STATE_GANG_DETAILS;
		
	} else if ( l.match(/gang\/search/) ) {
		VIEW_STATE = VIEW_STATE_GANG_SEARCH;
		
	} else if ( l.match(/gang\/([0-9]{0,10})?/) ) {
		VIEW_STATE = VIEW_STATE_GANG_LIST;
		
	} else if ( l.match(/highscore\/search.*name/) ) {
		VIEW_STATE = VIEW_STATE_USER_SEARCH;
		
	} else if ( l.match(/highscore\/([0-9]{0,10})?/) ) {
		VIEW_STATE = VIEW_STATE_USER_LIST;
	}
	
	if( !VIEW_STATE ) {
		errorStack.push( [ ERROR_CRITICAL, 'PGHE::init()', 'Cant set VIEW_STATE for this location' ] );
		return;
	}
	
	location = l;
	eventHandler( "run" );
}



/**
 * Describe here...
 * 
 * @param event
 * @return null
 */
function eventHandler( event ) {
	
	if( event == "run" ) {
		createLayout();
	}
	
	if ( event == "layoutComplete" ) {
		 loadOverview( overviewHandler );
	}
	
	if ( event == "overviewComplete" ) {
		 loadLetsFigth( letsFightHandler );
	}
	
	if ( event == "letsfightComplete" ) {
		 insertDashboardData();
	}
	
	if( event == 'dashboardComplete' ) {
		// alert( event );
	}
	
	
	switch ( VIEW_STATE ) {
		case VIEW_STATE_GANG_LIST 	 :
			break;
		case VIEW_STATE_GANG_SEARCH  :
			break;
		case VIEW_STATE_GANG_DETAILS :
			break;
		case VIEW_STATE_USER_LIST	 :
			break;
		case VIEW_STATE_USER_SEARCH	 :
			break;
		default:
			errorStack.push( [ ERROR_CRITICAL, 'PGHE::eventHandler()', 'Invalid value of VIEW_STATE. Value is: ' + VIEW_STATE ] );
			break;
	}
	//alert( location + '\n' + SERVER + '\n' + VIEW_STATE + '\n' + errorStack.toString() );
}



/**
 * TODO describe here...
 * 
 * @return null
 */
function createLayout() {
	
	try {
		//  raw user table
		tmp.rawTable = $$('tr', $$('table')[ 0 ] );
		
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
		title.innerHTML = meta.name + ' | ' + SERVER;
		document.title = title.innerHTML;
		head.appendChild(title);
		
		
		//  stylesheet
		var style = createElement('link', {rel: 'stylesheet', type: 'text/css', href: meta.stylesheet });
		head.appendChild(style);
		
		
		//  container
		var container = createElement('div');
		container.setAttribute('id', 'container');
		
		
		//  menu
		var menu = createElement('div');
		menu.setAttribute('id', 'menu');
		
		var items = new Array(
				['&Uuml;bersicht', $u('overview') ],
				['Weiterbildung', $u('skill') ],
				['Aktionen', $u('activities') ],
				['Stadt', $u('city') ],
				['Inventar', $u('stock') ],
				['Let\'s Fight', $u('letsfight') ],
				['Bande', $u('gang') ],
				['BandenKasse', $u('gang') + 'credit/' ],
				['BandenForum', $u('gang') + 'forum/' ],
				['News', $u('news') ],
				['Blog', url.global.blog ],
				['BitCrunch.de', url.global.bitcrunch ]
		);
		
		var ul = createElement('ul');
		ul.setAttribute('id', 'navlist');
		for(var i = 0; i < items.length; i++ ) {
			var li = createElement('li');
			var  a = createElement('a');
			a.setAttribute('href', items[ i ][ 1 ]);
			if( i == 11 ){
				a.setAttribute('target', '_blank');
			}
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
		content.innerHTML  = "<br /><b>&nbsp;<a style='text-decoration:none;color:#808080;' href='" + $u('highscore') + "'>" + meta.name + "</a> (" + SERVER + ")</b><br /><br />";
		
		
		//  options
		var options = createElement('div');
		options.setAttribute('id', 'options');
		options.setAttribute('style', 'margin-bottom:10px;margin-left:1px;');
		options.appendChild(getUserSearchForm());
		options.appendChild(getGangSearchForm());
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
		footer.innerHTML += "&nbsp;&nbsp;<b>" + meta.name + "</b> v" + meta.version + " is released under <a href='http://www.gnu.org/licenses/'>GPLv3</a> Feel free to write a review or discuss with me about"
		footer.innerHTML += "this script at <a target='_blank' href='http://userscripts.org/scripts/show/41070'>Userscripts.org</a><br />";
		footer.innerHTML += "&nbsp;&nbsp;or join our <a target='_blank' href='http://userscripts.org/groups/46'>Pennergame Scripting Group</a>. Have a nice day, Shorty - <a href='http://bitcrunch.de'>Bitcrunch.de</a>";
		
			
		//  append
		container.appendChild(menu);
		container.appendChild(panel);
		container.appendChild(content);
		container.appendChild(footer);
		body.appendChild(container);
		
		eventHandler( "layoutComplete" );
	} catch ( error ) {
		errorStack.push( [ 1, 'PGHE::createLayout()', error ] );
	}
}



/**
 * TODO describe here...
 * 
 * @param result
 * @return
 */
function overviewHandler( result ) {
	try {
		tmp.profile.overview = result;
	} catch(error) {
		errorStack.push( [ 1, 'PGHE::overviewHandler()', error ] );
	} finally {
		eventHandler("overviewComplete");
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
		tmp.profile.letsfight = result;
	} catch(error) {
		errorStack.push( [ 1, 'PGHE::letsFightHandler()', error ] );
	} finally {
		eventHandler("letsfightComplete");
	}
}



/**
 * TODO describe here...
 * 
 * @return
 */
function insertDashboardData() {
	try {
		var div, img, a, foo;
		var status = $('dashboard');
		if( tmp.profile.overview ) {
			
			//  avatar
			foo = tmp.profile.overview;
			div = createElement('div');
			div.setAttribute('id', 'avatar');
			img = createElement('img');
			img.setAttribute('src', foo.avatar );
			img.setAttribute('style', 'max-height:97px;max-width:97px;' );
			div.appendChild(img);
			status.appendChild(div);
			
			
			//  skills
			div = createElement('div');
			div.setAttribute('id', 'skills');
			div.innerHTML += "Angriff: <b>"  + tmp.profile.letsfight.att + "</b><br />";
			div.innerHTML += "Verteidigung: <b>" + tmp.profile.letsfight.def + "</b><br />";
			div.innerHTML += "<br />";
			div.innerHTML += "Promille: " + highlightPermille(foo.permille) + "<br />";
			div.innerHTML += "Geld: " + highlightCash(foo.cash) + "<br />";
			div.innerHTML += "<br />";
			div.innerHTML += "Punkte: <b>" + foo.points + "</b><br />";
			div.innerHTML += "Platzierung: <b>" + foo.position + "</b><br />";
			status.appendChild(div);
			
			
			//  stats
			foo = tmp.profile.letsfight;
			var fights_total =  Number(foo.win) + Number(foo.loose);
			var wins_percentage = Math.round(Number(foo.win) * 100 / fights_total);
			var loose_percentage = Math.round(Number(foo.loose) * 100 / fights_total);
			
			
			
			div = createElement('div');
			div.setAttribute('id', 'fights');
			div.innerHTML += "Gewonnen: <b>" + foo.win + "</b> (" + wins_percentage + "%)<br />";
			div.innerHTML += "Verloren: <b>" + foo.loose + "</b> (" + loose_percentage + "%)<br />";
			div.innerHTML += "<br />";
			div.innerHTML += "Punktebereich deiner Opfer<br /><b>" + foo.min_points + "</b> bis <b>" + foo.max_points + "</b>";
			div.innerHTML += "<br /><br />";
			div.innerHTML += "<a href='" + $u('highscore') + "range/?min_points=" + foo.min_points + "&max_points=" + foo.max_points + "'>Zeig mir meine Opfer</a>";
			// 
			
			status.appendChild(div);
			
			
			//  outgoing fight
			foo = tmp.profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'outgoingfight');
			if( foo.outgoing_fight ) {
				foo = tmp.profile.letsfight.outgoing_fight;
				var str = $u('userprofile').replace(/\{\$id\}/, foo.id );
				div.innerHTML += "Abgehender Kampf gegen:<b><br /><a target='_blank' href='" + str + "'>" + foo.name.slice(0, 23) + "</a></b><br /><br />"
				div.innerHTML += "Die Kampf endet am:<br /><b>" +  foo.end + "</b><br />";
				div.innerHTML += "<br />";
				div.innerHTML += getStopFightForm('Angriff abbrechen');
			} else {
				div.innerHTML = "<i>Keine abgehenden K&auml;mpfe</i>";
			}
			status.appendChild(div);
			
			
			//  incomming fight
			foo = tmp.profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'incommingfight');
			if( foo.incomming_fight ) {
				foo = tmp.profile.letsfight.incomming_fight;
				var str = $u('userprofile').replace(/\{\$id\}/, foo.id );
				div.innerHTML += "Eingehender Angriff von:<b><br /><a target='_blank' href='" + str + "'>" + foo.name.slice(0, 23) + "</a></b><br /><br />"
				div.innerHTML += "Zeitpunkt des Einschlags:<br /><b>" +  foo.end + "</b><br />";
			} else {
				div.innerHTML = "<i>Keine eingehenden K&auml;mpfe</i>";
			}
			status.appendChild(div);
			
			
			
			//  server load
			div = createElement('div');
			div.setAttribute('id', 'info');
			div.innerHTML  = 'Die Serverbelastung ist ';
			
			switch( tmp.currentServerLoad ) {
				case 'high' :
					div.innerHTML += '<span class="high">hoch</span>';
					break;
				case 'middle' :
					div.innerHTML += '<span class="middle">mittel</span>';
					break;
				case 'low' :
					div.innerHTML += '<span class="low">niedrig</span>';
					break;
				default :
					div.innerHTML += '<b>unbekannt</b>.';
			}
			div.innerHTML  += '<br />Manuell wechseln auf:<br /><br />';
			
			
			//  server load
			var str = location.toString();
			if( str.search(/\?/) != -1 ) {
				str = str.replace(/&?serverload=(high|middle|low)/, '');
				str = str + '&'
			} else {
				str = str + '?';
			}
			
			a = new Object({
				high:"Eine Anfrage für: Position, Username, Points, Money, Permille, Since, Gangname",
				middle:"Zwei Anfragen für: Position, Username, Points, Money, Permille, Since, Gangname -Points - Position and Members",
				low:"Drei Anfragen um alle Daten zu laden"
			});
			
			switch( GET('serverload') ) {
				case 'high' :
					div.innerHTML  += '<span style="padding:7px;background:#FF6600;color:#282828;"><b>hoch</b></span> ';
					div.innerHTML  += '<a title="' + a.middle + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=middle"> mittel</a> ';
					div.innerHTML  += '<a title="' + a.low + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=low">niedrig</a> ';
					break;
				case 'middle' :
					div.innerHTML  += '<a title="' + a.high + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=high">hoch</a> ';
					div.innerHTML  += '<a style="padding:7px;background:#99cc00;color:#282828;"><b>mittel</b></span> ';
					div.innerHTML  += '<a title="' + a.low + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=low">niedrig</a> ';
					break;
				case 'low' :
					div.innerHTML  += '<a title="' + a.high + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=high">hoch</a> ';
					div.innerHTML  += '<a title="' + a.middle + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=middle">mittel</a> ';
					div.innerHTML  += '<span style="padding:7px;background:green;color:#282828;"><b>niedrig</b></span> ';
					break;
				default :
					div.innerHTML  += '<a title="' + a.high + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=high">hoch</a> ';
					div.innerHTML  += '<a title="' + a.middle + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=middle">mittel</a> ';
					div.innerHTML  += '<a title="' + a.low + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=low">niedrig</a> ';
					break;
			}
			div.innerHTML  += '<br /><br />';
			div.innerHTML  += '<span id="loaderstatus"></span>';
			status.appendChild(div);
		} else {
			status.innerHTML += "<br /><br /><b>Daten konnten nicht geladen werden. Bitte die Seite <a href='javascript:location.reload();'>neu laden</a>, oder <a href='http://" + SERVER + ".pennergame.de/login/'>einloggen</a></b>";
		}
		eventHandler( "dashboardComplete" );
	} catch(error) {
		errorStack.push( [ 1, 'PGHE::insertDashboardData()', error ] );
	}
}


window.addEventListener("load", init, false);