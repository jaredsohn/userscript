// ==UserScript==
// @name			PennergameHighscoreExtension
// @description		Shows more informations about users and gangs inside the pennergame highscore table
// @version			2.2.4
// @namespace		http://bitcrunch.de/pennergame/
// @author			Shorty
// @homepage		http://bitcrunch.de
// @include			http://highscore.pennergame.de/highscore*
// @license			GPLv3
// @require			http://static.bitcrunch.de/javascript/pg-sc-api-2-2-4.js
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
var meta = new Object({
	id:1,
	name:'PennergameHighscoreExtension',
	version:'2.2.4'
});


var require = new Object({
	stylesheet:'http://static.bitcrunch.de/css/pghe-2-2-0.css',
	javascript:'http://static.bitcrunch.de/javascript/pg-sc-api-2-2-4.js'
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

var rawUserTable;


/**
 * Is automatically called when the document was loaded
 *
 * @return null
 */
function init() {
	
	//  @BugFix: Pagination Bug ID:1
	var loc = location.toString();
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
function taskManager( task, state ) {
	switch ( task ) {
	  case "run":
		  createLayout();
		  break;
	  case "layout::complete":
		  loadOverview( overviewHandler );
		  break;
	  case "overview::complete":
		  loadLetsFigth( letsFightHandler );
		  break;
	  case "letsfight::complete":
		  insertDashboardData();
		  break;
	  case "dashboard:complete":
		  statusMessage("Collecting user ids...");
		  collectUserIDs();
		  break;
	  case "userids::collected":
		  statusMessage("Loading user informations...");
		  loadUserInfo( user[ count ], userHandler );
		  break;
	  case "userids::collected":
		  statusMessage("Loading user informations...");
		  loadUserInfo( user[ count ], userHandler );
		  break;
	  case "userinfo::complete":
		  if( GET('serverload') == 'middle' || GET('serverload') == 'low' ) {
			  statusMessage("Loading gang informations...");
			  loadGangInfo( user[ count ].gang.id, gangHandler);
		  } else {
			  taskManager("ganginfo::complete");
		  }
		  break;
	  case "ganginfo::complete":
		  if( GET('serverload') == 'low' ) {
			  statusMessage("Loading extended user informations...");
			  loadUserProfile( user[ count ].id, userProfileHandler );
		  } else {
			  taskManager("userprofile::complete");
		  }
		  break;
	  case "userprofile::complete":
		  statusMessage("Rendering highscore table...");
		  insertHighscoreData();
		  break;
	  case "insert::complete":
		  statusMessage("Trying to check for updates...");
		  scriptUpdate( meta.id, scriptUpdateHandler );
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


/**
 * TODO describe here...
 * 
 * @return null
 */
function createLayout() {
	
	try {
		//  raw user table
		rawUserTable = $$('tr', $$('table')[ 0 ] );
		
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
		
		var items = new Array(
				['Übersicht', url.overview ],
				['Weiterbildung', url.skill ],
				['Aktionen', url.activities ],
				['Stadt', url.city ],
				['Inventar', url.stock ],
				['Let\'s Fight', url.letsfight ],
				['Bande', url.gang ],
				['BandenKasse', url.gang + 'credit/' ],
				['BandenForum', url.gang + 'forum/' ],
				['News', url.news ],
				['Blog', url.blog ],
				['BitCrunch.de', 'http://bitcrunch.de/pennergame' ]
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
		content.innerHTML  = "<b>&nbsp;<a style='text-decoration:none;color:#808080;' href='" + url.highscore + "'>" + meta.name + "</a></b><br /><br />";
		
		
		//  options
		var options = createElement('div');
		options.setAttribute('id', 'options');
		options.setAttribute('style', 'margin-bottom:10px;margin-left:1px;');
		options.appendChild(getUserSearchForm());
		//options.appendChild(getGangSearchForm()); // TODO: implement
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
		footer.innerHTML += "&nbsp;&nbsp;<b>" + meta.name + "</b> v" + meta.version + " is released under the hood of <a href='http://www.gnu.org/licenses/'>GPLv3</a> "
		footer.innerHTML += "and was made by <b>Shorty</b> from <a href='http://bitcrunch.de'>Bitcrunch.de</a> Feel free to write a review or discuss<br />";
		footer.innerHTML += "&nbsp;&nbsp;with me about this script at <a target='_blank' href='http://userscripts.org/scripts/show/41070'>Userscripts.org</a>. Join our <a target='_blank' href='http://userscripts.org/groups/46'>Pennergame Scripting Group<a/>. ";
		
			
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
	
	var loc = location.toString();
	if( loc.match(/highscore\u002Fgang\u002F/) ) {
		alert("Gang search is currently not available. It comes with one of the next updates");
	}
	
	for(var i = 0; i < rawUserTable.length; i++) {
		try {
			var uid = $$('td', rawUserTable[ i ])[ 1 ].innerHTML.match(/id\:([0-9]{1,})/)[ 1 ];
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
function userHandler( result ) {
	try {
		user[ count ] = result;
		if( ++count < user.length ) {
			loadUserInfo( user[ count ], userHandler );
		} else {
			count = 0;
			rawUserTable = null;
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
function gangHandler( result ) {
	try {
		user[ count ].gang = result;
		if( ++count < user.length ) {
			loadGangInfo( user[ count ].gang.id, gangHandler);
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
function userProfileHandler( result ) {
	try {
		user[ count ].pet = result.pet;
		user[ count ].awards = result.awards;
		user[ count ].premium = result.premium;
		user[ count ].online = result.online;
		if( ++count < user.length ) {
			loadUserProfile( user[ count ].id, userProfileHandler);
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
			div.innerHTML += "Attack: <b>"  + profile.letsfight.att + "</b><br />";
			div.innerHTML += "Defense: <b>" + profile.letsfight.def + "</b><br />";
			div.innerHTML += "Per mille: " + highlightPermille(profile.overview.permille) + "<br />";
			div.innerHTML += "Cash: " + highlightCash(profile.overview.cash) + "<br /><br />";
			div.innerHTML += "Points: <b>" + profile.overview.points + "</b><br />";
			div.innerHTML += "Position: <b>" + profile.overview.position + "</b><br />";
			status.appendChild(div);
			
			
			//  stats
			tmp = profile.letsfight;
			var fights_total =  Number(tmp.win) + Number(tmp.loose);
			var wins_percentage = Math.round(Number(tmp.win) * 100 / fights_total);
			var loose_percentage = Math.round(Number(tmp.loose) * 100 / fights_total);
			
			div = createElement('div');
			div.setAttribute('id', 'fights');
			div.innerHTML += "Fights win: <b>" + tmp.win + "</b> (" + wins_percentage + "%)<br />";
			div.innerHTML += "Fights lose: <b>" + tmp.loose + "</b> (" + loose_percentage + "%)<br />";
			div.innerHTML += "<br />";
			div.innerHTML += "Your victim must have between<br /><b>" + tmp.min_points + "</b> and <b>" + tmp.max_points + "</b> Points.<br />";
			div.innerHTML += "<br />";
			a = createElement('a');
			// #Dashboard: Missing "Server-Load" state at "Show me my victims" (Bug ID:5)
			a.setAttribute('href', 'http://highscore.pennergame.de/highscore/range/1/?max_points=' + tmp.max_points + '&min_points=' + tmp.min_points + ( GET('serverload') ? '&serverload=' + GET('serverload') : '' )   );
			a.innerHTML = 'Show me my victims';
			div.appendChild(a);
			status.appendChild(div);
			
			
			//  outgoing fight
			tmp = profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'outgoingfight');
			if( tmp.outgoing_fight ) {
				tmp = profile.letsfight.outgoing_fight;
				var str = url.user_profile.replace(/\{\$id\}/, tmp.id );
				div.innerHTML += "Outgoing fight against:<b><br /><a target='_blank' href='" + str + "'>" + tmp.name.slice(0, 23) + "</a></b><br /><br />"
				div.innerHTML += "This battle ends at:<br /><b>" +  tmp.end + "</b><br />";
				div.innerHTML += "<br />";
				div.innerHTML += getStopFightForm('Stop this fight');
			} else {
				div.innerHTML = "<i>No outgoing fight</i>";
			}
			status.appendChild(div);
			
			
			//  incomming fight
			tmp = profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'incommingfight');
			if( tmp.incomming_fight ) {
				tmp = profile.letsfight.incomming_fight;
				var str = url.user_profile.replace(/\{\$id\}/, tmp.id );
				div.innerHTML += "Next incomming fight from:<b><br /><a target='_blank' href='" + str + "'>" + tmp.name.slice(0, 23) + "</a></b><br /><br />"
				div.innerHTML += "Good luck! Time of impact: <br /><b>" +  tmp.end + "</b><br />";
			} else {
				div.innerHTML = "<i>No incomming fight</i>";
			}
			status.appendChild(div);
			
			
			
			//  incomming fight
			tmp = profile.letsfight;
			div = createElement('div');
			div.setAttribute('id', 'info');
			div.innerHTML  = 'Server-Load status is ';
			
			switch( currentServerLoad ) {
				case 'high' :
					div.innerHTML += '<span class="high">high</span>';
					break;
				case 'middle' :
					div.innerHTML += '<span class="middle">middle</span>';
					break;
				case 'low' :
					div.innerHTML += '<span class="low">low</span>';
					break;
				default :
					div.innerHTML += '<b>unknown</b>.';
			}
			div.innerHTML  += '<br />Switch manually to:<br /><br />';
			
			
			//  server load
			var str = location.toString();
			if( str.search(/\?/) != -1 ) {
				str = str.replace(/&?serverload=(high|middle|low)/, '');
				str = str + '&'
			} else {
				str = str + '?';
			}
			
			a = new Object({
				high:"1 request per user to load: Position, Username, Points, Money, Permille, Since, Gangname",
				middle:"2 requests per user to load: Position, Username, Points, Money, Permille, Since, Gangname -Points - Position and Members",
				low:"3 request per user to load all informations about him"
			});
			
			switch( GET('serverload') ) {
				case 'high' :
					div.innerHTML  += '<span style="padding:7px;background:#FF6600;color:#282828;"><b>high</b></span> ';
					div.innerHTML  += '<a title="' + a.middle + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=middle"> middle</a> ';
					div.innerHTML  += '<a title="' + a.low + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=low">low</a> ';
					break;
				case 'middle' :
					div.innerHTML  += '<a title="' + a.high + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=high">high</a> ';
					div.innerHTML  += '<a style="padding:7px;background:#99cc00;color:#282828;"><b>middle</b></span> ';
					div.innerHTML  += '<a title="' + a.low + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=low">low</a> ';
					break;
				case 'low' :
					div.innerHTML  += '<a title="' + a.high + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=high">high</a> ';
					div.innerHTML  += '<a title="' + a.middle + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=middle">middle</a> ';
					div.innerHTML  += '<span style="padding:7px;background:green;color:#282828;"><b>low</b></span> ';
					break;
				default :
					div.innerHTML  += '<a title="' + a.high + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=high">high</a> ';
					div.innerHTML  += '<a title="' + a.middle + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=middle">middle</a> ';
					div.innerHTML  += '<a title="' + a.low + '" style="padding:7px;background:#282828;" href="' + str + 'serverload=low">low</a> ';
					break;
			}
			div.innerHTML  += '<br /><br />';
			div.innerHTML  += '<span id="loaderstatus"></span>';
			status.appendChild(div);
		} else {
			status.innerHTML += "<br /><br /><b>No skills available. Please <a href='javascript:location.reload();'>reload</a> or <a href='http://pennergame.de/login/'>log in</a></b>";
		}
		taskManager( "dashboard:complete" );
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
		
		
		//  default sort
		if(sortColumn == '' ) {
			//sortColumn = 'reg_since' ;
			//sortType = 'DES';
			//user = user.sort(userTableSort);
		}
		
		
		var tr, th, td, a, div, img;
		var lineBreakAfter = 20;
		var content = $('usertable');
		content.innerHTML = "";
		if( !location.toString().match(/\/search/) ) {
			content.innerHTML += "<br />";
			content.appendChild(getPagination());
			content.innerHTML += "<br /><br />";
		}
		
		content.addEventListener("click", userTableEventHandler, false);
		
		var table = createElement('table');
		var thead = createElement('thead');
		var tbody = createElement('tbody');
		var tfoot = createElement('tfoot');
		
		var columns = new Array(
				[ 'Position', 20, 'position' ],
				[ 'User', 120, 'name' ],
				[ 'Points', 40, 'points' ],
				[ 'Money', 80, 'cash' ],
				[ 'Permille', 35, '' ],
				[ 'Since', 20, 'reg_since' ],
				[ 'Awards', 10, '' ],
				[ 'Pet', 50, '' ],
				[ 'Gang', 130, 'gangname' ],
				[ 'Points', 20, 'gangpoints' ],
				[ 'Position', 10, 'gangposition' ],
				[ 'Members', 10, 'gangmembers' ]
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
				
				var user_fight = "http://www.pennergame.de/fight/?to={$username}";
				
				td = createElement('td');
				a = createElement('a');
				a.setAttribute('href', url.user_profile.replace(/\{\$id\}/, user[ i ].id ) );
				a.setAttribute('target', '_blank' );
				a.innerHTML = user[ i ].name.slice(0, lineBreakAfter);
				td.appendChild(a);
				td.innerHTML += "<br />";
				a = createElement('a');
				a.setAttribute('style', 'position:relative;top:7px;padding-right:3px;');
				a.setAttribute('target', '_self' );
				a.setAttribute('href', user_fight.replace(/\{\$username\}/, user[ i ].name ) );
				img = createElement('img');
				img.setAttribute('style', 'border:none;');
				img.setAttribute('src', 'http://media.pennergame.de/img/att.gif' );
				a.appendChild(img);
				td.appendChild(a);
				
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
				td.innerHTML = "<div id='permille'><img src='" + url.user_signature.replace( /\{\$id\}/ ,user[ i ].id) + "'></div>";
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
					div.innerHTML = '<img src="' + url.media_pet_images.replace(/\{\$id\}/, user[ i ].pet.id ) + '" title="' + user[ i ].pet.name + ' (Att.: ' + user[ i ].pet.att + ', Def.: ' + user[ i ].pet.def + ', Pit.:' + user[ i ].pet.pity + ')"/>';
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
					a.setAttribute('href', url.gang_profile.replace(/\{\$id\}/, user[ i ].gang.id ) );
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
			content.innerHTML += "<br />";
			content.appendChild(getPagination());
			content.innerHTML += "<br />";
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
				update.innerHTML = "<span style='color:green;'><b>Update </b></span> your <span style='cursor:pointer;' title='" + result.description + "'><b>" + result.name + "</b></span> from version " + meta.version + " to <b>" + result.version + "</b><br />";
				update.innerHTML += "Click <b><a title='" + result.source + "' href='" + result.source + "'>here</a></b> to get it. Release <b>information:</b><br /><br />" + result.notes;
				insertAfter($('dashboard'), update );
				statusMessage("<b><a style='color:green;' title='" + result.notes + "' href='" + result.source + "'>Updates are available!</a></b>");
			} else {
				statusMessage("No updates available");
			}
		} else {
			statusMessage("Update server is not available");
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
		navigation.innerHTML  += "<a class='small-button' style='position:relative;left:1px;' href='" + prevPage + "'>Previous page</a>";
		navigation.innerHTML  += " <a class='small-button' href='" + nextPage + "'>Next page</a> ";
		for(var i = currentPage + 2; i <= currentPage + 6; i++ ) {
			navigation.innerHTML += "<a class='small-button' href='" + nextPage.replace(/\/[0-9]+/, '/' + i ) + "'>" + i + "</a> ";
		}
		return navigation;
	} catch( error ) {
		stack.push( [ 1, 'PGHE::getPagination()', error ] );
	}
}


/**
 * TODO describe here...
 * 
 * @return
 */
function highlightPermille( value ) {
	value = Number( value);
	if( value <= 0 )
		str = '<span style="font-weight:bold">' + value + '.00 ‰</span>';
	if( value > 0 )
		str = '<span class="low">' + value + ' ‰</span>';
	if( value >= 1 )
		str = '<span class="middle">' + value + ' ‰</span>';
	if( value >= 2 )
		str = '<span class="high">' + value + ' ‰</span>';
	return str;
}


/**
 * TODO describe here...
 * 
 * @return
 */
function highlightCash( value ) {
	var str = '<span style="font-weight:bold">' + formatNumber(value) + '€</span>';
	var cash = value.slice(0, value.length - 2);
	if (cash > 5000 )
		str = "<span class='low'>" + formatNumber( value ) + "€</span>";
	if (cash > 10000 )
		str = "<span class='middle'>" + formatNumber( value ) + "€</span>";
	if (cash > 15000 )
		str = "<span class='high'>" + formatNumber( value ) + "€</span>";
	return str;
}



window.addEventListener("load", init, false);