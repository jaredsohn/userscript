scr_meta=<><![CDATA[ 
// ==UserScript==
// @author         Jinnie, GotGs
// @name           Travian User Activity GotGs FX
// @namespace      Travian
// @description    Shows stats and maps from travian-utils & travmap.shishnet.org in travian pages.
// @license        GNU General Public License
// @include        http://*.travian.*/spieler.php*
// @include        http://*.travian.*/karte.php*d=*
// @include        http://*.travian.*/allianz.php*
// @include        http://*.travian.*/karte.php*
// @include        http://*.travian.*/position_details.php*
// @version        2.0.20
// ==/UserScript==
]]></>.toString();

/**
 * Changelog:
 * 30/05/2011 -- Ver 2.0.20 -- cosmetic changes
 * 30/05/2011 -- Ver 2.0.19 -- cosmetic changes
 * 20/05/2011 -- Ver 2.0.18 -- minor fixes
 * 19/05/2011 -- Ver 2.0.17 -- adding travian.ws
 * 29/04/2011 -- Ver 2.0.16 -- auto-updater fixed
 * 17/04/2011 -- Ver 2.0.15 -- auto-updater fixed
 * 15/04/2011 -- Ver 2.0.14 -- shishnet map fix
 * 15/04/2011 -- Ver 2.0.13 -- auto check for new version added
 * 15/04/2011 -- Ver 2.0.12 -- caching stats from travian-uitls
 * 13/04/2011 -- Ver 2.0.11 -- on alliance page, now uses own user id for shishnet map if user does not have alliance
 * 25/03/2011 -- Ver 2.0.10 -- sorting on radius
 * 19/03/2011 -- Ver 2.0.9 -- server to use can now be manually set from greasemonkey menu
 * 19/03/2011 -- Ver 2.0.8 -- bug-fix for speed servers
 * 19/03/2011 -- Ver 2.0.7 -- attempt to make this script work on travian 4.0
 * 14/03/2011 -- Ver 2.0.6 -- cosmetic changes and added history of evolution
 * 14/03/2011 -- Ver 2.0.5 -- some bug-fixes to make it work with auto-task
 * 14/03/2011 -- Ver 2.0.4 -- info from travian-utils and corresponding flashmap from travmap.shishnet.org are now displayed on profile, village, alliance & map pages.
 * 10/02/2011 -- Ver 2.0.3 -- minor bug fixes.
 * 10/02/2011 -- Ver 2.0.2 -- works now for own profile when url does not have uid.
 * 09/02/2011 -- Ver 2.0.1 -- Minor bug fixes, formatting of notes displayed.
 * 29/01/2011 -- Ver 2.0.0 -- Added display of notes from travian-utils.com 
 */

function functionMain() {


/*************************************************************************
 * Global Variables
 */
var currentPageUrl = "";	// url of current page we are viewing
var myTravianHost = "";		// current travian host
var myTravianServer = "";	// current travian server for which to fetch information

var myuid = "";		// own uid, travian user id
var myaid = "";		// own aid, travian alliance id, only set when we are in an alliance, to set this player has to visit own profile page (both in t3.6 & t4.0)

var uid = "";		// uid for which to show stats
var aid = "";		// aid for which to show stats

var xCoord = "";	// x-coordinate for map page
var yCoord = "";	// y-coordinate for map page

var myTravianVersion = "";	// current travian version, only 3.6 and 4.0 are supported

var infoServer = "";	// from where to fetch information, "1" for www.travian.ws, "2" for travian-utils.com


/*************************************************************************
 * Initializing some global variables
 */

// current url
currentPageUrl = document.location.href;

// find current travian server
myTravianHost = window.location.host;
//myTravianServer = myTravianHost.split(".")[2]+myTravianHost.split(".")[0].match(/\d{1,}\b/);
var srvDefValue = document.title.split(" ")[1];
myTravianServer = GM_getValue ( myTravianHost + "_server", srvDefValue );

// find my uid
myTravianVersion = "3.6";
myuid = document.evaluate('//div[@id="side_navi"]//a[contains(@href,"sp")]',document, null,9,null).singleNodeValue; // for t3.6
if ( myuid == null ) {
	myuid = document.evaluate('//div[@id="side_info"]//a[contains(@href,"sp")]',document, null,9,null).singleNodeValue; // for t4
	if ( myuid == null ) // cannot find myuid, then return and do not process
		return;
	myTravianVersion = "4.0";
}
myuid = myuid.href.match(/uid=\d+/)[0].split("=")[1];

infoServer = GM_getValue ( myTravianHost + "_" + myuid + "_infoServer", "1" ); // by default get information from www.travian.ws


/*************************************************************************
 * Greasemonkey Menu Strings
 */
aLangGreaseMenuItemText = [
/*   0*/	"GTUA: Enable / disable shishnet map (user)", 
/*   1*/	"Enter 1 to enable shishnet map, 0 to disable:\n\n",
/*   2*/	"GTUA: Enable / disable debug mode (server)",
/*   3*/	"Enter 1 to enable debug mode, 0 to disable:\n\n",
/*   4*/	"GTUA: Set radius for villages to display in travian map info (user)",
/*   5*/	"Enter radius (an integer) for villages to display in travian map info, 0 to display only currently visible villages on map:\n\n",
/*   6*/	"GTUA: Set server for which to get data (server)",
/*   7*/	"Enter the value of \"s=\" to be used in url for fetching data from www.travian.ws or travian-utils.com:\n\n",
/*   8*/	"GTUA: Set server from where to fetch data (user)",
/*   9*/	"Enter...\n 1 for www.travian.ws,\n 2 for travian-utils.com\n (default is 1):\n\n",
/*  10*/	"GTUA: Enable / disable display of natars in shishnet maps (user)",
/*  11*/	"Enter 1 to enable display of natars, 0 to disable (default is 0):\n\n"
	];


/*************************************************************************
 * Greasemonkey Menu Handlers
 */

function promptEnableDisableShishnetMap() {
	var curentSetup = GM_getValue ( myTravianHost + "_" + myuid + "_shishnet_map", "1" );
	var newSetup = "";
	while ( true ) {
		newSetup = prompt(aLangGreaseMenuItemText[1],curentSetup);
		if ( newSetup == null )
			break; // break from while loop
		if ( newSetup == "1" || newSetup == "0" )
			break;
		else
			alert ( "Incorrect Input, please try again..." );
	}
	if ( newSetup != null )
		GM_setValue ( myTravianHost + "_" + myuid + "_shishnet_map", newSetup );
}

function promptSetRadiusForMapInfo() {
	var curentSetup = GM_getValue ( myTravianHost + "_" + myuid + "_map_radius", "0" );
	var newSetup = "";
	while ( true ) {
		newSetup = prompt(aLangGreaseMenuItemText[5],curentSetup);
		if ( newSetup == null )
			break; // break from while loop
		if ( isNaN ( parseInt ( newSetup) ) )
			alert ( "Incorrect Input, please try again..." );
		else
			break;
	}
	if ( newSetup != null )
		GM_setValue ( myTravianHost + "_" + myuid + "_map_radius", parseInt(newSetup) + "" );
}

function promptDebugMode() {
	var curentSetup = GM_getValue ( myTravianHost + "_debug_mode", "0" );
	var newSetup = "";
	while ( true ) {
		newSetup = prompt(aLangGreaseMenuItemText[3],curentSetup);
		if ( newSetup == null )
			break; // break from while loop
		if ( newSetup == "1" || newSetup == "0" )
			break;
		else
			alert ( "Incorrect Input, please try again..." );
	}
	if ( newSetup != null )
		GM_setValue ( myTravianHost + "_debug_mode", newSetup );
}

function promptServer() {
	var curentSetup = GM_getValue ( myTravianHost + "_server", srvDefValue );
	var newSetup = prompt(aLangGreaseMenuItemText[7],curentSetup);
	if ( newSetup != null )
		GM_setValue ( myTravianHost + "_server", newSetup );
}

function promptSetInfoServer() {
	var curentSetup = GM_getValue ( myTravianHost + "_" + myuid + "_infoServer", "1" );
	var newSetup = "";
	while ( true ) {
		newSetup = prompt(aLangGreaseMenuItemText[9],curentSetup);
		if ( newSetup == null )
			break; // break from while loop
		if ( newSetup == "1" || newSetup == "2" ) {
			break; // break from while loop
		}
		else
			alert ( "Incorrect Input, please try again..." );
	}
	if ( newSetup != null ) {
		GM_setValue ( myTravianHost + "_" + myuid + "_infoServer", newSetup );

		// delete old memory data on info server change
		GM_deleteValue ( myTravianHost + "_" + myuid + "_" + uid_notes_memory );
		GM_deleteValue ( myTravianHost + "_" + myuid + "_" + aid_notes_memory );
		GM_deleteValue ( myTravianHost + "_" + myuid + "_" + uid_data_memory );
		GM_deleteValue ( myTravianHost + "_" + myuid + "_" + aid_data_memory );
		GM_deleteValue ( myTravianHost + "_" + myuid + "_" + map_data_memory );
	}
}

function promptDisplayNatarsInShishNetMap() {
	var curentSetup = GM_getValue ( myTravianHost + "_" + myuid + "_displayNatars", "0" );
	var newSetup = "";
	while ( true ) {
		newSetup = prompt(aLangGreaseMenuItemText[11],curentSetup);
		if ( newSetup == null )
			break; // break from while loop
		if ( newSetup == "1" || newSetup == "0" )
			break;
		else
			alert ( "Incorrect Input, please try again..." );
	}
	if ( newSetup != null )
		GM_setValue ( myTravianHost + "_" + myuid + "_displayNatars", newSetup );
}


/*************************************************************************
 * Registering Greasemonkey Menu Handlers
 */

GM_registerMenuCommand(aLangGreaseMenuItemText[0], promptEnableDisableShishnetMap ); // get shishnet map enable/disable from user by greasemonkey menu
GM_registerMenuCommand(aLangGreaseMenuItemText[4], promptSetRadiusForMapInfo ); // get radius for map info from user by greasemonkey menu
GM_registerMenuCommand(aLangGreaseMenuItemText[2], promptDebugMode ); // get debug mode from user by greasemonkey menu
GM_registerMenuCommand(aLangGreaseMenuItemText[6], promptServer ); // get server to use from user by greasemonkey menu
GM_registerMenuCommand(aLangGreaseMenuItemText[8], promptSetInfoServer ); // get info server to use from user by greasemonkey menu
GM_registerMenuCommand(aLangGreaseMenuItemText[10], promptDisplayNatarsInShishNetMap ); // get dispay natars in shishnet maps from user by greasemonkey menu


/*************************************************************************
 * Do not execute this script in GAT LoginWindow
 */
if ( self.window.name.indexOf ( "LoginWindow" ) != -1 )
	return;


/*************************************************************************
 * function to log messages in console
 */
function flag (text) {
	var logDebugMessages = GM_getValue( myTravianHost + "_debug_mode", "0" ) == "0" ? false : true;
	if (logDebugMessages) {
		var d = new Date();

		var curr_hour = d.getHours();
		curr_hour = curr_hour + "";
		if (curr_hour.length == 1) {  curr_hour = "0" + curr_hour; }

		var curr_min = d.getMinutes();
		curr_min = curr_min + "";			
		if (curr_min.length == 1) { curr_min = "0" + curr_min; }

		var curr_sec = d.getSeconds();
		curr_sec = curr_sec + "";
		if (curr_sec.length == 1) { curr_sec = "0" + curr_sec; }

		var curr_msec = d.getMilliseconds();
		curr_msec = curr_msec + "";
		switch ( curr_msec.length ) {
			case 0: curr_msec = "000"; break;
			case 1: curr_msec = "00" + curr_msec; break;
			case 2: curr_msec = "0" + curr_msec; break;
		}

		GM_log(curr_hour + ":" + curr_min + ":" + curr_sec + "." + curr_msec + " " + text);
	}
}


/*************************************************************************
 * function to log stack trace in console
 */
function printStackTrace() {
	//var logDebugMessages = GM_getValue( myTravianHost + "_debug_mode", "0" ) == "0" ? false : true;
	var logDebugMessages = true;
	if (logDebugMessages) {
		var callstack = [];
		var isCallstackPopulated = false;
		try {
			i.dont.exist+=0; //doesn't exist- that's the point
		} 
		catch(e) {
			if (e.stack) { //Firefox
				var lines = e.stack.split("\n");
				for (var i=0, len=lines.length; i<len; i++) {
					if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
						callstack.push(lines[i]);
					}
				}
				//Remove call to printStackTrace()
				callstack.shift();
				isCallstackPopulated = true;
			}
			else if (window.opera && e.message) { //Opera
				var lines = e.message.split("\n");
				for (var i=0, len=lines.length; i<len; i++) {
					if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
						var entry = lines[i];
						//Append next line also since it has the file info
						if (lines[i+1]) {
							entry += " at " + lines[i+1];
							i++;
						}
						callstack.push(entry);
					}
				}
				//Remove call to printStackTrace()
				callstack.shift();
				isCallstackPopulated = true;
			}
		}
		if (!isCallstackPopulated) { //IE and Safari
			var currentFunction = arguments.callee.caller;
				while (currentFunction) {
					var fn = currentFunction.toString();
					var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf("(")) || "anonymous";
					callstack.push(fname);
					currentFunction = currentFunction.caller;
				}
		}
		GM_log ( "STACK TRACE:: \n" + callstack.join("\n") );
	}
}


/*************************************************************************
 * Some coordinates handling functions
 */
function getCoordfromXY(x, y){
	x = parseInt(x);
	y = parseInt(y);
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}

function getXfromCoord(z){
	z = parseInt(z);
	var x = ((z - 1) % 801) - 400;
	return x;
}

function getYfromCoord(z){
	z = parseInt(z);
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}


/*************************************************************************
 * find and set uid from user profile or village page. if we are viewing self profile page then find and set myaid, myuid can be found from any page
 */
function findUid() {
	try {
		flag ( "findUid():: Started!" );
	
		// find and set uid
		uid = currentPageUrl.match(/\buid=\d{1,}\b/);
		if ( uid != null )
			uid = uid[0].split("=")[1];
		else {
			if ( currentPageUrl.match(/spieler\.php/) != null ) { // self profile page
				uid = myuid;
			}
			else { // village page
				var villageInfoElem = document.evaluate('//table[@id="village_info"]/tbody/tr/td/a[ contains(@href,"spieler.php") and contains(@href,"uid=")]', document,
					null,9,null).singleNodeValue;
				if ( villageInfoElem != null )
					uid = villageInfoElem.href.match(/\buid=\d{1,}\b/)[0].split("=")[1];
				else
					uid = "";
			}
		}
	
		// if self profile page, get own allianz aid here
		if ( uid == myuid && currentPageUrl.match(/\bspieler\.php\b/) != null ) {
			var ownAid = "";
			var xpathOwnAlliance = "";
			if ( myTravianVersion == "3.6" )
				xpathOwnAlliance = '//table[@id="profile"]/tbody/tr/td[@class="details"]/table/tbody/tr/td/a[contains(@href,"allianz.php") and contains(@href,"aid=")]';
			else ( myTravianVersion == "4.0" )
				xpathOwnAlliance = '//table[@id="details"]/tbody/tr/td/a[contains(@href,"allianz.php") and contains(@href,"aid=")]';
			var ownAidAnchor = document.evaluate( xpathOwnAlliance, document, null, 9, null ).singleNodeValue;
			if ( ownAidAnchor ) {
				try {
					ownAid = ownAidAnchor.href.match(/\baid=\d{1,}\b/)[0].split("=")[1];
					if ( !ownAid )
						ownAid = "";
				}
				catch ( err ) {
					ownAid = "";
				}
			}
			flag ( "findUid():: ownAid: " + ownAid );
			myaid = ownAid;
			GM_setValue( myTravianHost + "_" + myuid + "_own_allianz", ownAid );
		}
	
		flag ( "findUid():: myTravianServer: " + myTravianServer + ", uid: " + uid );
	}
	catch ( err ) {
		printStackTrace();
		var msg = "findUid():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * find and set aid from alliance page.
 */
function findAid() {
	try {
		flag ( "findAid():: Started!" );
	
		aid = currentPageUrl.match(/\baid=\d{1,}\b/);
		if ( aid != null )
			aid = aid[0].split("=")[1];
		else { // own allianz page
			aid = GM_getValue( myTravianHost + "_" + myuid + "_own_allianz", "" );
		}
		flag ( "findAid():: aid: " + aid );
	}
	catch ( err ) {
		printStackTrace();
		var msg = "findAid():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * find and set x,y coordinates from map page
 */
function findXYCoordinates() {
	try {
		flag ( "findXYCoordinates():: Started!" );
		if ( myTravianVersion == "3.6" ) {
			xCoord = document.evaluate('//div[@id="content"]//div[@id="map_rulers"]/div[@id="mx3"]',document,null,9,null).singleNodeValue.innerHTML;
			yCoord = document.evaluate('//div[@id="content"]//div[@id="map_rulers"]/div[@id="my3"]',document,null,9,null).singleNodeValue.innerHTML;
		}
		else if ( myTravianVersion == "4.0" ) {
			if ( currentPageUrl.match(/\bx=/) != null ) {
				xCoord = currentPageUrl.match(/\bx=[-0-9]{1,}\b/)[0].match(/[-0-9]{1,}\b/)[0];
				yCoord = currentPageUrl.match(/\by=[-0-9]{1,}\b/)[0].match(/[-0-9]{1,}\b/)[0];
			}
		}
		flag ( "findXYCoordinates():: xCoord: " + xCoord + ", yCoord: " + yCoord );
	}
	catch ( err ) {
		printStackTrace();
		var msg = "findXYCoordinates():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * script updates checker
 */
var AnotherAutoUpdater = { // update script by sizzlemctwizzle THANKS! http://userscripts.org/scripts/show/38017
 
	id: '95626', 
	days: 5, 
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function ( flg ) {
		var response;
		//flag ( "AnotherAutoUpdater.call():: Started! flg: " + flg );
		//flag ( "AnotherAutoUpdater.call():: url: " + 'http://userscripts.org/scripts/source/'+this.id+'.meta.js' );
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
			onload: function(xpr) {
				//flag ( "AnotherAutoUpdater.call():: CallBack Started!" );
				AnotherAutoUpdater.compare ( xpr, flg );
			},
			onerror: function(xpr) {
				//flag ( "AnotherAutoUpdater.call():: CallBack Failed!" );
				GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 12*60*60*1000 ) + '' ); // delay re-check by 12 hour
			}
		});
	},
	compare: function ( xpr, flg ) {
		//flag ( "AnotherAutoUpdater.compare():: Started! flg: " + flg );
		//flag ( "AnotherAutoUpdater.compare():: xpr.responseText: " + xpr.responseText );
		if ( xpr.responseText.match ( /404 Not Found/i ) || xpr.responseText.match ( /bad gateway/i ) ) {
			GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 12*60*60*1000 ) + '' ); // delay re-check by 12 hour
			return false;
		}
		this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec ( xpr.responseText );
		this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec ( xpr. responseText );
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
			GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 12*60*60*1000 ) + '' ); // delay re-check by 12 hour
			//GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		//flag ( "AnotherAutoUpdater.compare():: this.xversion: " + this.xversion + ", this.xname: " + this.xname );
		var msg = '';//'If you like this script, then buy me a burger, sandwitch, chocolates, sweets or a beer from the script\'s home-page @ userscripts.org ... !! :)';
		if ( ( +this.xversion > +this.version ) && ( confirm ( 'A new version of the \'' + this.xname + '\' user script is available. Do you want to update?\n\n' + msg ) ) ) {
			//GM_setValue ( 'updated_' + this.id, this.time + '' );
			GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 24*60*60*1000 ) + '' ); // delay re-check by 24 hour
			//top.location.href = 'http://userscripts.org/scripts/source/'+this.id+'.user.js'; // install user script with-out opening userscript page
			//window.open ( 'http://userscripts.org/scripts/show/'+this.id ); // open userscript page in new tab
			window.location.href = 'http://userscripts.org/scripts/show/'+this.id; // open userscript page in current tab
		} else if ( ( this.xversion ) && ( +this.xversion > +this.version ) ) {
			if ( confirm ( 'Do you want to turn off auto updating for this script?' ) ) {
				GM_setValue ( 'updated_' + this.id, 'off' );
				GM_registerMenuCommand ( "GTUA: Auto Update " + this.name,
						function() { GM_setValue ( 'updated_' + AnotherAutoUpdater.id, new Date().getTime() + '' ); AnotherAutoUpdater.call(true); } );
				alert ( 'Automatic updates can be re-enabled for this script from the User Script Commands submenu.' );
			} else {
				GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 24*60*60*1000 ) + '' ); // delay re-check by 24 hour
				//GM_setValue ( 'updated_'+this.id, this.time + '' );
			}
		} else {
			if ( flg ) alert ( 'No updates available for ' + this.name );
			GM_setValue ( 'updated_' + this.id, this.time + '' );
		}
	},
	check: function() {
		//flag ( "AnotherAutoUpdater.check():: Started!" );
		if ( GM_getValue ( 'updated_'+this.id, 0 ) == "off" )
			GM_registerMenuCommand ( "GTUA: Enable " + this.name + " updates",
					function() { /*GM_setValue ( 'updated_' + AnotherAutoUpdater.id, new Date().getTime() + '' );*/ AnotherAutoUpdater.call(true) } );
		else {
			if ( +this.time > ( + GM_getValue ( 'updated_' + this.id, 0 ) + 1000*60*60*24 * this.days ) ) {
				//GM_setValue ( 'updated_' + this.id, this.time + '' );
				this.call(false);
			}
			GM_registerMenuCommand ( "GTUA: Check " + this.name + " for updates",
				function() { /*GM_setValue ( 'updated_' + AnotherAutoUpdater.id, new Date().getTime() + '' );*/ AnotherAutoUpdater.call(true) } );
		}
	}
};


/*************************************************************************
 * script initializer
 */
function INIT() {
	try {
		flag ( "INIT():: Started!" );
	
		if ( ( currentPageUrl.match(/\bspieler\.php\b/) != null && currentPageUrl.match(/\bs=\d{1,}\b/) == null ) // profile page
			|| ( currentPageUrl.match(/\bkarte\.php.*\bd=/) != null || currentPageUrl.match(/\bposition_details.php\b.*\bx=.*/) != null ) ) { // village
			findUid();
		}
		else if ( currentPageUrl.match(/\ballianz\.php\b/) != null && currentPageUrl.match(/\bs=[023456]\b/) == null ) { // allianz page
			findAid();
		}
		else if ( currentPageUrl.match(/\bkarte\.php\b/) != null && currentPageUrl.match(/\b\d=/) == null ) { // map
			findXYCoordinates();
		}
	
		myaid = GM_getValue( myTravianHost + "_" + myuid + "_own_allianz", "" );
	
		if ( uid != "" || aid != "" ) {
			var content = document.getElementById("mid");
			
			// add div to show data...
			var tabDataDiv = document.createElement('div');
			tabDataDiv.id = "utils_title_data_div";
			var tabDataDivText = "<br/>";
			tabDataDivText = tabDataDivText + "If data shown below is not for your server then try setting the server from greasemonkey menu.<br/>";
			if ( aid != "" && aid == myaid )
				tabDataDivText = tabDataDivText + "If data shown below is not of your Alliance then visit profile page to load your allianz id.<br/>";
			tabDataDivText = tabDataDivText + "<b>☠ ";
			tabDataDivText += ( uid != "" ) ? "User" : "Alliance" ;
			tabDataDivText = tabDataDivText + " data from <a href='";
			if ( infoServer == "1" ) // www.travian.ws
				tabDataDivText += "http://www.travian.ws/analyser.pl?lang=en&s="+myTravianServer;
			else if ( infoServer == "2" ) // travian-utils.com
				tabDataDivText += "http://travian-utils.com/?s="+myTravianServer;
			if ( uid != "" ) {
				if ( infoServer == "1" )
					tabDataDivText += "&uid=" + uid;
				else
					tabDataDivText += "&idu=" + uid;
			}
			else { // ( aid != "" )
				if ( infoServer == "1" )
					tabDataDivText += "&aid=" + aid;
				else
					tabDataDivText += "&ida=" + aid;
			}
			tabDataDivText = tabDataDivText + "' target='_blank'>";
			if ( infoServer == "1" ) // www.travian.ws
				tabDataDivText = tabDataDivText + "www.travian.ws";
			else // travian-utils.com
				tabDataDivText = tabDataDivText + "travian-utils.com";
			tabDataDivText = tabDataDivText + "</a> ☠</b>";
			tabDataDivText = tabDataDivText + "&#160;&#160;<a id='refresh_info_data_url' href='#'>Refresh</a><br/>" + 
						"<div id=\"info_data_div\"></div>";
			tabDataDiv.innerHTML = tabDataDivText;
			tabDataDiv.style.paddingTop = "100px";
			tabDataDiv.style.paddingLeft = "20px";
			tabDataDiv.style.clear = "both";
			content.appendChild(tabDataDiv, content.nextSibling);
			var refreshDataElement = document.getElementById ( "refresh_info_data_url" );
			refreshDataElement.addEventListener("click", handleRefreshUtilsDataEvent, false );
	
			if ( infoServer == "2" ) { // if info server is travian-utils.com then add notes
				// add div to show notes...
				var tabNotesDiv = document.createElement('div');
				tabNotesDiv.id = "utils_title_notes_div";
				var tabNotesDivText = "<br/>";
				tabNotesDivText = tabNotesDivText + "<b>☠ ";
				tabNotesDivText += ( uid != "" ) ? "User" : "Alliance" ;
				tabNotesDivText = tabNotesDivText + " notes from <a href='http://travian-utils.com/?s="+myTravianServer;
				if ( uid != "" )
					tabNotesDivText = tabNotesDivText + "&idu=" + uid;
				else // ( aid != "" )
					tabNotesDivText = tabNotesDivText + "&ida=" + aid;
				tabNotesDivText = tabNotesDivText + "&note' target='_blank'>travian-utils.com</a> ☠</b>";
				tabNotesDivText = tabNotesDivText + "&#160;&#160;<a id='refresh_utils_notes_url' href='#'>Refresh</a><br/>" +
							"<div id='utils_notes_div'></div>"+
							"<div id='utils_add_notes_div'></div>";
				tabNotesDiv.innerHTML = tabNotesDivText;
				tabNotesDiv.style.paddingLeft = "20px";
				tabNotesDiv.style.clear = "both";
				content.appendChild(tabNotesDiv, content.nextSibling);
				var refreshNotesElement = document.getElementById ( "refresh_utils_notes_url" );
				refreshNotesElement.addEventListener("click", handleRefreshUtilsNotesEvent, false );
				
				// add the input elements for adding nodes functionality...
				var tableAddNotesElement = document.createElement('table');
				tableAddNotesElement.setAttribute("class", "tsu_list brd_a x09 sm1");
				tableAddNotesElement.innerHTML = ( "<tr><th class=\"h2\">Add a note on this player:</th></tr>" + 
								"<tr><td class='c h3'><b>(you need to be logged into " + 
									"<a href='http://travian-utils.com/?login' target='_blank'>travian-utils.com</a>)</b></td></tr>" +
								"<tr><td class='c h3'><textarea type='text' id='add_note_input_text' class='note' name='note'></textarea></td></tr>" + 
								"<tr><td class='c h3'>" + 
								"<input type='button' id='add_note_input_button' class='submit' name='submit_note_u_add' value='Add' />" + 
								"</td></tr>" );
				var tabAddNotesDiv = document.getElementById ( "utils_add_notes_div" );
				tabAddNotesDiv.appendChild(tableAddNotesElement, tabAddNotesDiv.nextSibling);
		
				var noteAddButton = document.getElementById("add_note_input_button");
				noteAddButton.addEventListener("click",handleAddUidAidNote,true);
		
				tabAddNotesDiv.style.paddingLeft = "20px";
				tabAddNotesDiv.style.clear = "both";
			}
	
			var utilsDataDiv = document.getElementById ( "info_data_div" );
			utilsDataDiv.scrollIntoView();
		}
		else if ( xCoord != "" ) {
			var content = document.getElementById("mid");
	
			// add div to show data...
			var tabDataDiv = document.createElement('div');
			tabDataDiv.id = "utils_title_map_div";
			var radius = GM_getValue ( myTravianHost + "_" + myuid + "_map_radius", "0" );
			if ( radius == "0" )
				radius = "5";
			var tabDataDivText = "<br/>";
			tabDataDivText += "If data shown below is not for your server then try setting the server from greasemonkey menu.<br/>";
			tabDataDivText += "<b>☠ Map Information <span id='info_map_heading'>(" + xCoord + "|" + yCoord + ") from ";
			if ( infoServer == "1" ) // www.travian.ws
				tabDataDivText += "<a href='http://www.travian.ws/analyser.pl?s=" 
						+ myTravianServer + "&q=" + xCoord + "," + yCoord + "," + radius
						+ "' target='_blank'>www.travian.ws</a></span> ☠</b>";
			else // travian-utils.com
				tabDataDivText += "<a href='http://travian-utils.com/?s=" 
						+ myTravianServer + "&act" + "&x=" + xCoord + "&y=" + yCoord + "&r=" + radius
						+ "' target='_blank'>travian-utils.com</a></span> ☠</b>";
			tabDataDivText = tabDataDivText + "&#160;&#160;<a id='refresh_info_map_url' href='#'>Refresh</a><br/>" + 
						"<div id=\"info_map_div\"></div>";
			tabDataDiv.innerHTML = tabDataDivText;
			tabDataDiv.style.paddingTop = "100px";
			tabDataDiv.style.paddingLeft = "20px";
			tabDataDiv.style.clear = "both";
			content.appendChild(tabDataDiv, content.nextSibling);
			var refreshDataElement = document.getElementById ( "refresh_info_map_url" );
			refreshDataElement.addEventListener("click", handleRefreshMapEvent, false );
	
			if ( myTravianVersion == "3.6" ) {
				document.getElementById("ma_n1").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n2").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n3").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n4").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n1p7").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n2p7").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n3p7").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("ma_n4p7").addEventListener("click",onMapCoordinatesChange, false );
				document.getElementById("btn_ok").addEventListener("click",onMapCoordinatesChange, false );
			}
		}
		if ( uid != "" || aid != "" || xCoord != "" ) {
			var shishMapEnabled = GM_getValue ( myTravianHost + "_" + myuid + "_shishnet_map", "1" ) == "1" ? true : false;
			if ( shishMapEnabled ) {
				var content = document.getElementById("mid");
				var mapContainer = document.createElement('div');
				mapContainer.id = "utils_map_container";
				mapContainer.style.paddingLeft = "20px";
				mapContainer.style.paddingBottom = "100px";
				mapContainer.innerHTML = "<b>☠ Map from <a href=\"http://travmap.shishnet.org/\" target='_blank'>travmap.shishnet.org</a> ☠</b><br/><div id=\"utils_map\"></div>";
				content.appendChild(mapContainer);
			}
		}
		if ( uid != "" || aid != "" ) {
			getShishNetMap();
			getUidAidData();
			if ( infoServer == "2" ) { // if info server is travian-utils.com then get notes
				fetchUidAidNotes();
			}
			addStyles();
		}
		else if ( xCoord != "" ) {
			getMapData();
			addStyles();
		}
	
		if ( uid != "" || aid != "" || xCoord != "" ) {
			// Cluster Maps [clustrmaps] -- not shown on any page with a timer
			//var logDebugMessages = GM_getValue( myTravianHost + "_debug_mode", "0" ) == "0" ? false : true;
			var timerElems = document.evaluate ( '//*[contains(@id,"timer")]', document, null, 9, null ).singleNodeValue;
			if ( timerElems == null // show when no timers on current page
					&& self.window.name.indexOf ( "LoginWindow" ) == -1 // when not GAT login window
					//&& logDebugMessages == false // debug mode is false
				) {
				var clustrDiv = document.createElement("div");
				clustrDiv.align="left";
				clustrDiv.style.paddingLeft = "20px";
				// minimalistic cluster map
				clustrDiv.innerHTML = '<a href="http://www2.clustrmaps.com/user/927d2c1c">'+
					'<img src="http://www2.clustrmaps.com/stats/maps-no_clusters/userscripts.org-scripts-show-95626-thumb.jpg"'+
					' alt="Locations of visitors to this page" />'+
					'</a>';
				var content = document.getElementById("mid");
				content.appendChild(clustrDiv);
			}
		}
		AnotherAutoUpdater.check();
	}
	catch ( err ) {
		printStackTrace();
		var msg = "INIT():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * call to script initializer
 */
INIT();


/*************************************************************************
 * global variables specific to data memory
 */
var dataStoreDuration = 12*60*60*1000; // retain data for 12 hrs


/*************************************************************************
 * function to get data from memory
 */
function getDataFromMemory( gm_ck_name, key ) {
	try {
		flag ( "getDataFromMemory():: Started! gm_ck_name: " + gm_ck_name + ", key:" + key );

		if ( key == "" || key == null || key == undefined )
			return false;

		// get the cookie data
		var gmMemory = GM_getValue ( myTravianHost + "_" + myuid + "_" + gm_ck_name, "" );
		if ( gmMemory == "" )
			return false;
		try {
			gmMemory = JSON.parse(gmMemory);
		} 
		catch ( e ) {
			gmMemory = eval( "(" + gmMemory + ")" );
		}

		// remove all old data.
		for ( var ikey in gmMemory ) {
			var mydata = gmMemory [ ikey ];
			if ( !mydata.time || mydata.time < ( new Date().getTime() - dataStoreDuration ) ) { // if data is old
				flag ( "getDataFromMemory():: deleting "+gm_ck_name+" \[ " + key + " \]" );
				delete gmMemory [ ikey ];
			}
		}

		// find relevant data
		var returnValue = false;
		var mydata = gmMemory [ key ];
		if ( mydata && mydata.key && mydata.key == key ) {
			returnValue = mydata.text;
			flag ( "getDataFromMemory():: Data found in memory!" );
		}
		else {
			flag ( "getDataFromMemory():: Data not found in memory!" );
		}

		// store back the cookie data
		try {
			GM_setValue ( myTravianHost + "_" + myuid + "_" + gm_ck_name, JSON.stringify(gmMemory) );
		}
		catch (e){
			GM_setValue ( myTravianHost + "_" + myuid + "_" + gm_ck_name, uneval(gmMemory) );
		}

		return returnValue;
	}
	catch ( err ) {
		printStackTrace();
		var msg = "getDataFromMemory():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to put data into memory
 */
function setDataToMemory( gm_ck_name, key, data ) {
	try {
		flag ( "setDataToMemory():: Started! gm_ck_name: " + gm_ck_name + ", key:" + key );

		// get the cookie data
		var gmMemory = GM_getValue ( myTravianHost + "_" + myuid + "_" + gm_ck_name, "" );
		if ( gmMemory == "" )
			gmMemory = {};
		else {
			try {
				gmMemory = JSON.parse(gmMemory);
			} 
			catch ( e ) {
				gmMemory = eval( "(" + gmMemory + ")" );
			}
		}

		// remove all old data.
		for ( var ikey in gmMemory ) {
			var mydata = gmMemory [ ikey ];
			if ( !mydata.time || mydata.time < ( new Date().getTime() - dataStoreDuration ) ) { // if data is old
				delete gmMemory [ ikey ];
			}
		}

		// insert data.
		var mydata = {};
		mydata.key = key;
		mydata.time = new Date().getTime();
		mydata.text = data;
		gmMemory [ key ] = mydata;

		// store back the cookie data
		try {
			GM_setValue ( myTravianHost + "_" + myuid + "_" + gm_ck_name, JSON.stringify(gmMemory) );
		}
		catch (e){
			GM_setValue ( myTravianHost + "_" + myuid + "_" + gm_ck_name, uneval(gmMemory) );
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "setDataToMemory():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to fetch utils notes
 */
// mode: "0": get data from memory
// mode: "1": fetch data from travian-utils
function fetchUidAidNotes ( mode ) {
	try {
		if ( mode == null || mode == undefined )
			mode = "0";

		flag ( "fetchUidAidNotes():: Started! mode: " + mode );

		// get data from memory when mode is "0"
		if ( mode == "0" ) {
			var storedData = false;
			if ( uid != "" )
				storedData = getDataFromMemory ( "uid_notes_memory", uid );
			else
				storedData = getDataFromMemory ( "aid_notes_memory", aid );
			if ( storedData != false ) { // if data exists, then insert data and return
				insertUidAidNotes(storedData);
				return;
			}
		}

		// get notes from trav-utils
		var nurl = "";
		if ( uid != "" )
			nurl = "http://travian-utils.com/?s=" + myTravianServer + "&idu=" + uid + "&note";
		else // ( aid != "" )
			nurl = "http://travian-utils.com/?s=" + myTravianServer + "&ida=" + aid + "&note";
		GM_xmlhttpRequest({
			method: "GET",
			url: nurl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Accept": "text/xml"
			},
			onload: function(response) {
					if ( uid != "" )
						setDataToMemory ( "uid_notes_memory", uid, response.responseText );
					else
						setDataToMemory ( "aid_notes_memory", aid, response.responseText );
					insertUidAidNotes(response.responseText);
				}
		});
	}
	catch ( err ) {
		printStackTrace();
		var msg = "fetchUidAidNotes():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to fetch uid/aid data from info server
 */
// mode: "0": get data from memory
// mode: "1": fetch data from info server
function getUidAidData ( mode ) {
	try {
		if ( mode == null || mode == undefined )
			mode = "0";

		flag ( "getUidAidData():: Started! mode: " + mode );

		// get data from memory when mode is "0"
		if ( mode == "0" ) {
			var storedData = false;
			if ( uid != "" )
				storedData = getDataFromMemory ( "uid_data_memory", uid );
			else
				storedData = getDataFromMemory ( "aid_data_memory", aid );
			if ( storedData != false ) { // if data exists, then insert data and return
				insertUidAidData(storedData);
				return;
			}
		}

		// get player data from info server
		var nurl = "";
		if ( infoServer == "1" ) { // www.travian.ws
			if ( uid != "" )
				nurl = "http://www.travian.ws/analyser.pl?lang=en&s=" + myTravianServer + "&uid=" + uid;
			else // ( aid != "" )
				nurl = "http://www.travian.ws/analyser.pl?lang=en&s=" + myTravianServer + "&aid=" + aid;
		}
		else if ( infoServer == "2" ) { // travian-utils.com
			if ( uid != "" )
				nurl = "http://travian-utils.com/?s=" + myTravianServer + "&idu=" + uid;
			else // ( aid != "" )
				nurl = "http://travian-utils.com/?s=" + myTravianServer + "&ida=" + aid;
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: nurl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Accept": "text/xml"
			},
			onload: function(response) {
					if ( uid != "" )
						setDataToMemory ( "uid_data_memory", uid, response.responseText );
					else
						setDataToMemory ( "aid_data_memory", aid, response.responseText );
					insertUidAidData(response.responseText);
				}
		});
	}
	catch ( err ) {
		printStackTrace();
		var msg = "getUidAidData():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * handler to handle map coordinates change
 */
var timeOutId = null;
function onMapCoordinatesChange() {
	try {
		if ( timeOutId )
			window.clearTimeout ( timeOutId );
		var tabDataDiv = document.getElementById("info_map_div");
		tabDataDiv.innerHTML = "Refreshing...";
		timeOutId = window.setTimeout ( getMapData, 1000);
	}
	catch ( err ) {
		printStackTrace();
		var msg = "onMapCoordinatesChange():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to fetch shishnet map
 */
function getShishNetMap() {
	try {
		var shishMapEnabled = GM_getValue ( myTravianHost + "_" + myuid + "_shishnet_map", "1" ) == "1" ? true : false;
		if ( shishMapEnabled ) {
			flag ( "getShishNetMap():: Started!" );
	
			var myserver = window.location.host;
			var imageurl = "http://travmap.shishnet.org/map.php?lang=en" + "&casen=on" + "&format=svg" + "&dotsize=1" + "&server=" + myserver;// "&layout=spread" +
	
			if ( uid != "" ) {
				if ( myuid != uid )
					imageurl = imageurl + "&groupby=player" + "&player=id:" + myuid + ",id:" + uid;
				else
					imageurl = imageurl + "&groupby=player" + "&player=id:" + myuid;
			}
			if ( aid != "" ) {
				if ( myaid == "" ) // when we do not have an alliance
					imageurl = imageurl + "&groupby=player" + "&colby=alliance" + "&alliance=id:" + aid + "&player=id:" + myuid;
				else if ( myaid != aid )
					imageurl = imageurl + "&groupby=player" + "&colby=alliance" + "&alliance=id:" + myaid + ",id:" + aid;
				else
					imageurl = imageurl + "&groupby=player" + "&alliance=id:" + myaid;
			}
			if ( xCoord != "" ) {
				imageurl = imageurl + "&azoom=on" + "&groupby=group" + "&colby=alliance" + "&player=id:" + myuid;
				var displayedVillas = null;
				if ( infoServer == "1" )
					displayedVillas = document.evaluate('//div[@id="info_map_div"]//a[contains(@href,"uid=")]', document, null, 6, null );
				else
					displayedVillas = document.evaluate('//div[@id="info_map_div"]//a[contains(@href,"idu=")]', document, null, 6, null );
				var displayNatars = GM_getValue ( myTravianHost + "_" + myuid + "_displayNatars", "0" );
				for ( var ctr = 0; ctr < displayedVillas.snapshotLength ; ctr++ ) {
					var idu = "";
					if ( infoServer == "1" )
						idu = displayedVillas.snapshotItem(ctr).href.match(/\buid=\d{1,}\b/)[0].split("=")[1];
					else
						idu = displayedVillas.snapshotItem(ctr).href.match(/\bidu=\d{1,}\b/)[0].split("=")[1];
					if ( displayNatars == "0" && idu == "1" )
						continue;
					imageurl = imageurl + ",id:" + idu;
				}
			}
			flag ( "getShishNetMap():: imageurl: " + imageurl );
	
			imageurl = encodeURI(imageurl);
			var utilsDiv = document.getElementById("utils_map");
			if ( utilsDiv )
				utilsDiv.innerHTML = '<div><iframe width="768" height="512" frameborder="0" src="'+ imageurl +'"></iframe></div>';
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "getShishNetMap():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to fetch map data from info server
 */
// mode: "0": get data from memory
// mode: "1": fetch data from info server
function getMapData ( mode ) {
	try {
		if ( mode == null || mode == undefined )
			mode = "0";

		flag ( "getMapData():: Started! mode: " + mode );

		// get coordinates
		findXYCoordinates();

		// get radius
		var radius = GM_getValue ( myTravianHost + "_" + myuid + "_map_radius", "0" );
		if ( radius == "0" )
			radius = "5";

		// get data from memory when mode is "0"
		if ( mode == "0" ) {
			var storedData = false;
			storedData = getDataFromMemory ( "map_data_memory", xCoord+"|"+yCoord+"|"+radius );
			if ( storedData != false ) { // if data exists, then insert data and return
				insertMapData(storedData);
				return;
			}
		}

		var nurl = "";
		if ( infoServer == "1" ) { // www.travian.ws
			nurl = "http://www.travian.ws/analyser.pl?lang=en&s=" + myTravianServer + "&q=" + xCoord + "," + yCoord + "," + radius + "&sort=d";
		}
		else if ( infoServer == "2" ) { // travian-utils.com
			nurl = "http://travian-utils.com/?s=" + myTravianServer + "&act=" + "&x=" + xCoord + "&y=" + yCoord + "&r=" + radius + "&sort=6&st=1";
		}
		//flag ( "getMapData():: nurl: " + nurl );
		
		// get player data from info server
		GM_xmlhttpRequest({
			method: "GET",
			url: nurl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Accept": "text/xml"
			},
			onload: function(response) {
					setDataToMemory ( "map_data_memory", xCoord+"|"+yCoord+"|"+radius, response.responseText );
					insertMapData(response.responseText);
				}
		});
	}
	catch ( err ) {
		printStackTrace();
		var msg = "getMapData():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * functions to handle manual refreshes
 */
function handleRefreshMapEvent(eventt) {
	flag ( "handleRefreshMapEvent():: Started!" );
	var tabDataDiv = document.getElementById("info_map_div");
	tabDataDiv.innerHTML = "Refreshing...";
	tabDataDiv.style.paddingLeft = "20px";
	tabDataDiv.style.clear = "both";
	getMapData("1");
}

function handleRefreshUtilsDataEvent(eventt) {
	flag ( "handleRefreshUtilsDataEvent():: Started!" );
	var tabDataDiv = document.getElementById("info_data_div");
	tabDataDiv.innerHTML = "Refreshing...";
	tabDataDiv.style.paddingLeft = "20px";
	tabDataDiv.style.clear = "both";
	getUidAidData("1");
}

function handleRefreshUtilsNotesEvent(eventt) {
	flag ( "handleRefreshUtilsNotesEvent():: Started!" );
	var tabNotesInnerDiv = document.getElementById("utils_notes_div");
	tabNotesInnerDiv.innerHTML = "Refreshing...";
	tabNotesInnerDiv.style.paddingLeft = "20px";
	tabNotesInnerDiv.style.clear = "both";
	fetchUidAidNotes("1");
}


/*************************************************************************
 * function to insert external map data into page
 */
function insertMapData(doc) {
	try {
		flag ( "insertMapData():: Started!" );
		if ( doc != null && doc != "" && doc ) {
			// verify the coords have not changed recently
			xOld = xCoord;
			yOld = yCoord;
			findXYCoordinates();
			if ( xOld != xCoord || yOld != yCoord ) {
				getMapData();
				return;
			}
	
			var mapHeading = document.getElementById("info_map_heading");
			if ( mapHeading ) {
				var radius = GM_getValue ( myTravianHost + "_" + myuid + "_map_radius", "0" );
				if ( radius == "0" )
					radius = "5";
				mapHeading.innerHTML = "(" + xCoord + "|" + yCoord + ") from ";
				if ( infoServer == "1" ) // www.travian.ws
					mapHeading.innerHTML += "<a href='http://www.travian.ws/analyser.pl?s=" 
						+ myTravianServer + "&q=" + xCoord + "," + yCoord + "," + radius
						+ "' target='_blank'>www.travian.ws</a></span> ☠</b>";
				else // travian-utils.com
					mapHeading.innerHTML += "<a href='http://travian-utils.com/?s=" 
						+ myTravianServer + "&act" + "&x=" + xCoord + "&y=" + yCoord + "&r=" + radius
						+ "' target='_blank'>travian-utils.com</a>";
			}
	
			// just get the required stuff and discard the rest
			var line = doc.split('\n').join(" ");
			var line = line.split('\r').join("");
			if ( infoServer == "1" ) {
				var temp = line.match(/<table class=\"coltable\">(.|\n)*\/table>/);
				if ( temp != null )
					doc = temp[0];
				else
					doc = "";
			}
			else if ( infoServer == "2" ) {
				var temp = line.match(/<table class=\"tsu_list brd_a x09 sm1\">.*\/table>/);
				if ( temp != null )
					doc = temp[0];
				else
					doc = "";
			}
			//flag ( "insertMapData():: doc: " + doc );
	
			var divElement = document.createElement('div');
			divElement.innerHTML = doc;

			if ( infoServer == "2" ) {
				// delete scripts from travian utils as they break our script
				if ( true ) {
					var tt = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']/tbody/tr[1]/td[1]", divElement, null, 9, null).singleNodeValue;
					if ( tt )
						tt.innerHTML = "";
				}
			}
	
			// find relevant map data in doc...
			var table = null;
			if ( infoServer == "1" ) {
				table = document.evaluate("//table[@class='coltable']/tbody/tr", divElement, null, 6, null);
			}
			else if ( infoServer == "2" ) {
				table = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']/tbody/tr", divElement, null, 6, null);
			}
	
			// insert relevant data into page...
			var tabMapInnerDiv = document.getElementById("info_map_div");
			if ( tabMapInnerDiv != null && table.snapshotLength > 0 ) {
				var tableDataElement = document.createElement('table');
				if ( infoServer == "1" ) {
					tableDataElement.style.width = "750px";
					//tableDataElement.style.padding = "0px 10px 0px 10px";
				}
				else if ( infoServer == "2" )
					tableDataElement.setAttribute("class", "tsu_list brd_a x09 sm1");
				var tableBodyElement = document.createElement('tbody');
				tableDataElement.appendChild(tableBodyElement);
	
				var radius = GM_getValue ( myTravianHost + "_" + myuid + "_map_radius", "0" );
				var allowedDiff = -1;
				if ( myTravianVersion == "4.0" )
					allowedDiff = 4;
				else if ( myTravianVersion == "3.6" )
					allowedDiff = 3;
				if ( radius == "0" ) {
					var itr = 1;
					if ( table.snapshotLength > 1 ) {
						tableBodyElement.appendChild(table.snapshotItem(0)); // heading or 'There are no villages'
						for ( var ctr = 1 ; ctr < table.snapshotLength ; ctr++ ) {
							//flag ( "insertMapData():: ctr: " + ctr );
							var xy = table.snapshotItem(ctr).textContent.match(/\([-0-9 ]{1,}\|[-0-9 ]{1,}\)/)[0].match(/[-0-9]{1,}\b/g);
							//flag ( "insertMapData():: xy: " + xy + ", allowedDiff: " + allowedDiff );
							//flag ( "insertMapData():: diffx: " + ( Math.abs ( xy[0] - xCoord ) )
							//		+ ", diffy: " + ( Math.abs ( xy[1] - yCoord ) ) );
							if ( ( Math.abs ( xy[0] - xCoord ) <= allowedDiff ) && ( Math.abs ( xy[1] - yCoord ) <= allowedDiff ) ) {
								if ( infoServer == "2" )
									table.snapshotItem(ctr).childNodes[1].innerHTML = itr;
								tableBodyElement.appendChild(table.snapshotItem(ctr));
								itr++;
							}
						}
					}
					if ( itr == 1 ) { // when no villages are added
						tableBodyElement.innerHTML = ""; // removed already added 'There are no villages' or the heading
						var thNoVilla = document.createElement('th');
						thNoVilla.colspan = 2;
						thNoVilla.innerHTML = "There are no villages in db!";
						tableDataElement.appendChild(thNoVilla);
					}
				}
				else {
					for ( var ctr = 0 ; ctr < table.snapshotLength ; ctr++ ) {
						tableBodyElement.appendChild(table.snapshotItem(ctr));
					}
				}
	
				tabMapInnerDiv.innerHTML = "";
				tabMapInnerDiv.style.paddingLeft = "20px";
				tabMapInnerDiv.style.clear = "both";
				tabMapInnerDiv.appendChild(tableDataElement); // + footer;
	
				// convert all anchors in tabMapInnerDiv to lead to info server ...
				var anchors = tabMapInnerDiv.getElementsByTagName("a");
				for ( var ctr = 0 ; ctr < anchors.length ; ctr++ ) {
					var anchor = anchors[ctr].getAttribute("href");
					var temp = "";
					if ( infoServer == "1" ) {
						//flag ( "insertMapData():: anchor: " + anchor );
						if ( anchor.indexOf ( myTravianHost ) == -1 && anchor.indexOf ( "http:" ) == -1 )
							temp = "http://www.travian.ws/analyser.pl?" + anchor.split("?")[1];
						else
							temp = anchor;
					}
					else if ( infoServer == "2" ) {
						temp = "http://travian-utils.com/?" + anchor.split("?")[1];
					}
					if ( myTravianVersion == "4.0" && temp.match( /\bkarte\.php\b.*\bz=[0-9]{1,}/ ) != null ) {
						var coord = temp.match ( /\bz=[0-9]{1,}/ )[0].match ( /[0-9]{1,}/ );
						var xcoord = getXfromCoord ( coord );
						var ycoord = getYfromCoord ( coord );
						//temp = temp.replace ( /\bz=[0-9]{1,}/ , "x="+xcoord+"&y="+ycoord );
						temp = "http://"+myTravianHost+"/position_details.php?x="+xcoord+"&y="+ycoord;
					}
					anchors[ctr].href = temp;
					anchors[ctr].target = "_blank";
				}

				// convert all image hrefs
				if ( infoServer == "1" ) {
					var allImgs = tabMapInnerDiv.getElementsByTagName("img");
					for ( var ctr = 0 ; ctr < allImgs.length ; ctr++ ) {
						var imgSrc = allImgs[ctr].getAttribute("src");
						if ( imgSrc.indexOf ( "www.travian.ws" ) == -1 && imgSrc.indexOf ( "http:" ) == -1 ) {
							imgSrc = "http://www.travian.ws/" + imgSrc;
						}
						allImgs[ctr].src = imgSrc;
					}
				}

				if ( infoServer == "2" ) {	
					// do some formatting...
					var datesInTable = document.getElementsByClassName("sdv");
					for ( var ctr in datesInTable ) {
						datesInTable[ctr].setAttribute("style","text-align: center");
					}
					var villagesInTable = document.getElementsByClassName("l");
					for ( var ctr in villagesInTable ) {
						villagesInTable[ctr].setAttribute("style","padding: 0px 10px 0px 10px");
					}
				}
			}
			else if ( tabMapInnerDiv != null ) {
				tabMapInnerDiv.style.paddingLeft = "20px";
				tabMapInnerDiv.style.clear = "both";
				tabMapInnerDiv.innerHTML = "No Data available, probably new player or server down, check later!";
			}
			getShishNetMap();
		}
		else {
			var tabMapInnerDiv = document.getElementById("info_map_div");
			tabMapInnerDiv.style.paddingLeft = "20px";
			tabMapInnerDiv.style.clear = "both";
			tabMapInnerDiv.innerHTML = "No Data available, probably new player or server down, check later!";
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "insertMapData():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to insert external uid/aid data into page
 */
function insertUidAidData(doc) {
	try {
		flag ( "insertUidAidData():: Started!" );
		if ( doc != null && doc != "" && doc ) {
			// just get the required stuff and discard the rest
			var line = doc.split('\n').join(" ");
			var line = line.split('\r').join("");
			//flag ( "insertUidAidData():: doc: " + doc );
			if ( infoServer == "1" ) {
				doc = "";
				if ( uid != "" ) {
					var temp1 = line.match(/<table class=\"coltable\" id=\"townstat\">.*<\/table>\s*<\/div>\s*<\/div>/);
					if ( temp1 != null )
						doc = temp1[0].match(/<table class=\"coltable\" id=\"townstat\">.*<\/table>/);
				}
				else { // if ( aid != "" )
					var temp1 = line.match(/<table class=\"coltable alliancestat\">(.|\n)*<\/table>(.|\n)*<table class=\"coltable\"/);
					if ( temp1 != null )
						doc = temp1[0].match(/<table class=\"coltable alliancestat\">(.|\n)*<\/table>/);
				}
				//flag ( "insertUidAidData():: doc: " + doc );
				var temp2 = line.match(/<table class=\"coltable\" id=\"events\">.*<\/table>/);
				if ( temp2 != null )
					doc += temp2[0];
			}
			else if ( infoServer == "2" ) {
				var temp = line.match(/<table class=\"tsu_list brd_a x09 sm1\">.*\/table>/);
				doc = "";
				if ( temp != null )
					doc = temp[0];
			}
			//flag ( "insertUidAidData():: doc: " + doc );
	
			var divElement = document.createElement('div');
			divElement.innerHTML = doc;

			if ( infoServer == "2" ) {
				// delete scripts from travian utils as they break our script
				if ( aid != "" ) {
					var tt = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']/tbody/tr[1]/td[1]", divElement, null, 9, null).singleNodeValue;
					if ( tt )
						tt.innerHTML = "";
				}
			}
	
			// find relevant player data in doc...
			var table = null, table2 = null;
			if ( infoServer == "1" ) {
				table = document.evaluate("//table[contains(@class,'coltable')]", divElement, null, 9, null).singleNodeValue;
				table2 = document.evaluate("//table[2][@class='coltable']", divElement, null, 9, null).singleNodeValue;
			}
			else if ( infoServer == "2" ) {
				table = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']", divElement, null, 9, null).singleNodeValue;
				table2 = document.evaluate("//table[2][@class='tsu_list brd_a x09 sm1']", divElement, null, 9, null).singleNodeValue;
			}
	
			// insert relevant data into page...
			var tabDataDiv = document.getElementById("info_data_div");
			if ( tabDataDiv != null && ( table != null || table2 != null ) ) {
				tabDataDiv.innerHTML = "";
				tabDataDiv.style.paddingLeft = "20px";
				tabDataDiv.style.clear = "both";
				if ( table != null ) {
					var tableDataElement = document.createElement('table');
					tableDataElement.innerHTML = table.innerHTML;
					if ( infoServer == "1" ) {
						tableDataElement.style.width = "750px";
						//tableDataElement.style.padding = "0px 10px 0px 10px";
					}
					else if ( infoServer == "2" )
						tableDataElement.setAttribute("class", "tsu_list brd_a x09 sm1");
					tabDataDiv.appendChild(tableDataElement);
				}
				if ( table2 != null ) {
					var tableDataElement = document.createElement('table');
					tableDataElement.innerHTML = table2.innerHTML;
					if ( infoServer == "1" ) {
						tableDataElement.style.width = "750px";
						//tableDataElement.style.padding = "0px 10px 0px 10px";
					}
					else if ( infoServer == "2" )
						tableDataElement.setAttribute("class", "tsu_list brd_a x09 sm1");
					tabDataDiv.appendChild(tableDataElement);
				}
	
				// convert all anchors in tabDataDiv to lead to http://travian-utils.com/ ...
				var anchors = tabDataDiv.getElementsByTagName("a");
				for ( var ctr = 0 ; ctr < anchors.length ; ctr++ ) {
					var anchor = anchors[ctr].getAttribute("href");
					var temp = "";
					if ( infoServer == "1" ) {
						//flag ( "insertMapData():: anchor: " + anchor );
						if ( anchor.indexOf ( myTravianHost ) == -1 )
							temp = "http://www.travian.ws/analyser.pl?" + anchor.split("?")[1];
						else
							temp = anchor;
					}
					else if ( infoServer == "2" ) {
						temp = "http://travian-utils.com/?" + anchor.split("?")[1];
					}
					if ( myTravianVersion == "4.0" && temp.match( /\bkarte\.php\b.*\bz=[0-9]{1,}/ ) != null ) {
						var coord = temp.match ( /\bz=[0-9]{1,}/ )[0].match ( /[0-9]{1,}/ );
						var xcoord = getXfromCoord ( coord );
						var ycoord = getYfromCoord ( coord );
						//temp = temp.replace ( /\bz=[0-9]{1,}/ , "x="+xcoord+"&y="+ycoord );
						temp = "http://"+myTravianHost+"/position_details.php?x="+xcoord+"&y="+ycoord;
					}
					anchors[ctr].href = temp;
					anchors[ctr].target = "_blank";
				}

				if ( infoServer == "2" ) {
					// do some formatting...
					var datesInTable = document.getElementsByClassName("sdv");
					for ( var ctr in datesInTable ) {
						datesInTable[ctr].setAttribute("style","padding: 0px 10px 0px 10px; text-align: right");
					}
					var villagesInTable = document.getElementsByClassName("l");
					for ( var ctr in villagesInTable ) {
						villagesInTable[ctr].setAttribute("style","padding: 0px 10px 0px 10px");
					}
				}
			}
			else if ( tabDataDiv != null ) {
				tabDataDiv.style.paddingLeft = "20px";
				tabDataDiv.style.clear = "both";
				tabDataDiv.innerHTML = "No Data available, probably new player or server down, check later!";
			}
		}
		else {
			var tabDataDiv = document.getElementById("info_data_div");
			tabDataDiv.style.paddingLeft = "20px";
			tabDataDiv.style.clear = "both";
			tabDataDiv.innerHTML = "No Data available, probably new player or server down, check later!";
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "insertUidAidData():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to insert external notes data into page
 */
function insertUidAidNotes(doc) {
	try {
		flag ( "insertUidAidNotes():: Started!" );
		if ( doc != null && doc != "" && doc ) {
			// just get the required stuff and discard the rest
			var line = doc.split('\n').join(" ");
			var line = line.split('\r').join("");
			var temp = line.match(/<table class=\"tsu_list brd_a x09 sm1\">.*\/table>/);
			if ( temp != null )
				doc = temp[0];
			else
				doc = "";
	
			var divElement = document.createElement('div');
			divElement.innerHTML = doc;
	
			// find relevant notes in doc...
			var ret = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']", divElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
			// insert the notes into the page...
			var tabNotesInnerDiv = document.getElementById("utils_notes_div");
			if ( tabNotesInnerDiv != null && ret.snapshotLength > 0 ) {
				var tableNotesElement = document.createElement('table');
				tableNotesElement.innerHTML = ret.snapshotItem(0).innerHTML;
				tableNotesElement.setAttribute("class", "tsu_list brd_a x09 sm1");
				tabNotesInnerDiv.innerHTML = ""; // remove existing content
				tabNotesInnerDiv.appendChild(tableNotesElement, tabNotesInnerDiv.nextSibling); // add new content
				tabNotesInnerDiv.style.paddingLeft = "20px";
				tabNotesInnerDiv.style.clear = "both";
	
				// if response text has login-button, then hot-wire the login button...
				var getLoginButton = document.getElementsByName("submit_go_login");
				if ( getLoginButton.length > 0 )
					getLoginButton[0].addEventListener("click", function() { window.open("http://travian-utils.com/?login"); }, false );
			}
			else if ( tabNotesInnerDiv != null ) {
				tabNotesInnerDiv.style.paddingLeft = "20px";
				tabNotesInnerDiv.style.clear = "both";
				tabNotesInnerDiv.innerHTML = "No Data available, probably new player or server down, check later!";
			}
		}
		else {
			var tabNotesInnerDiv = document.getElementById("utils_notes_div");
			tabNotesInnerDiv.style.paddingLeft = "20px";
			tabNotesInnerDiv.style.clear = "both";
			tabNotesInnerDiv.innerHTML = "No Data available, probably new player or server down, check later!";
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "insertUidAidNotes():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to handle add note event
 */
function handleAddUidAidNote( eventt ) {
	try {
		flag ( "handleAddUidAidNote():: Started!" );
		// get note to add from input elements...
		var addNoteNode = document.getElementById("add_note_input_text");
		var addNoteText = addNoteNode.value ? addNoteNode.value : "" ;

		if ( addNoteText != null && addNoteText != "" ) {
			// build url and url data...
			var noteUrl = "http://travian-utils.com/";
			var noteUrlData = "";
			if ( uid != "" )
				noteUrlData = "s=" + myTravianServer + "&idu=" + uid + "&note=" + addNoteText + "&submit_note_u_add=Add";
			else // ( aid != "" )
				noteUrlData = "s=" + myTravianServer + "&ida=" + aid + "&note=" + addNoteText + "&submit_note_a_add=Add";

			// post http request...
			GM_xmlhttpRequest({
				method: "POST",
				url: noteUrl,
				data: encodeURI(noteUrlData),
				/*headers: {
					"User-Agent": navigator.userAgent,
					"Accept": "text/xml"
					},*/
				headers: { 'Content-type' : 'application/x-www-form-urlencoded' },
				onload: function(response) {
					flag ( "handleAddUidAidNote():: Notes addition succeeded!" );
					if ( uid != "" )
						setDataToMemory ( "uid_notes_memory", uid, response.responseText );
					else
						setDataToMemory ( "aid_notes_memory", aid, response.responseText );
					insertUidAidNotes(response.responseText);
					var addNoteNode = document.getElementById("add_note_input_text");
					addNoteNode.value = "";
				},
				onerror: function(response) {
					flag ( "handleAddUidAidNote():: Notes addition failed!" );
					var tabNotesInnerDiv = document.getElementById("utils_notes_div");
					tabNotesInnerDiv.innerHTML = response.responseText;
					tabNotesInnerDiv.style.paddingLeft = "20px";
					tabNotesInnerDiv.style.clear = "both";
				}
			});
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "handleAddUidAidNote():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}


/*************************************************************************
 * function to force some css styling
 */
function addStyles() {
	flag ( "addStyles():: Started!" );

	if ( infoServer == "1" ) {
		GM_addStyle(<><![CDATA[
		.plus {
			color: #00CC00;
		}
		.minus {
			color: #FF0000;
		}
	}
	else if ( infoServer == "2" ) {
		GM_addStyle(<><![CDATA[
		TABLE.tsu_list {
			border-collapse: collapse;
			border-spacing: 0px;
			border: 1px solid #eee;
		        width: 660px;
		}
		TABLE.tsu_list TD{
			border: 1px solid #e0e0e0;
			text-align: right;
		}
		TABLE.tsu_list TD.l{
			text-align: left;
		}
		TABLE.tsu_list TD.c{
			text-align: center;
		}
		TABLE.tsu_list TH{
			background-color:#F0F0F0;
			padding-left:1em;
			padding-right:1em;
		}
		TABLE.tsu_list TR.tr1{
			background-color:#F8F8F8;
		}
		.green{
			color: #55cc55;
		}
		.red{
			color: red;
		}
		.lred{
			color: lightCoral;
		}
		.grey{
			color: #c0c0c0;
		}
		.lgreen{
			color:lightgreen;
		}
		.blue{
			color:blue;
		}
		.lblue{
			color:lightblue;
		}
		.main-b{
			color:#58c4ff;
		}
		.h2{
		        font-weight:bold;
		}
		
		]]></>.toString());
	
		// Right-align exception for Arabic servers
		// TODO: there are better ways to detect rtl languages
		var currentPageUrl = document.location.href;
		if(currentPageUrl.match(/\.ae\//)){
			GM_addStyle("TABLE.tsu_list TD.l{text-align: right;}");
		}
	}

	if ( myTravianVersion == "4.0" ) {
		GM_addStyle("#info_map_heading a, #utils_title_map_div a, #utils_map_container a, #utils_title_data_div a, #utils_title_notes_div a { color: PaleVioletRed }");
	}
}

};

window.onload = functionMain();

