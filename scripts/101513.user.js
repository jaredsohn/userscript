scr_meta=<><![CDATA[ 
// ==UserScript==
// @author         Anabell, GotScript
// @name           Travian User Activity, Farm Finder
// @namespace      Travian
// @description    Shows stat from Travian.ws in travian pages.
// @license        GNU General Public License
// @include        http://*.travian.*/spieler.php*
// @include        http://*.travian.*/karte.php*d=*
// @include        http://*.travian.*/allianz.php*
// @include        http://*.travian.*/karte.php*
// @include        http://*.travian.*/position_details.php*
// @version        1.0.2
// ==/UserScript==
]]></>.toString();

/**
 * Changelog:
 * 22/04/2011 -- Ver 1.0.1 -- Farm Finder on Map
 * 22/04/2011 -- Ver 1.0.2 -- Farm Finder on Map BugFix

 */

function functionMain() {

var url = "";
var myuid = "";
var uid = "";
var srv = "";
var aid = "";
var myaid = "";
var xCoord = "";
var yCoord = "";
var myhost = "";

var TVer = "3.6";

myhost = window.location.host;
//srv = myhost.split(".")[2]+myhost.split(".")[0].match(/\d{1,}\b/);
var srvDefValue = document.title.split(" ")[1];
srv = GM_getValue ( myhost + "_server", srvDefValue );

url = document.location.href;

myuid = document.evaluate('//div[@id="side_navi"]//a[contains(@href,"sp")]',document, null,9,null).singleNodeValue;
if ( myuid == null ) {
	myuid = document.evaluate('//div[@id="side_info"]//a[contains(@href,"sp")]',document, null,9,null).singleNodeValue; // for t4
	if ( myuid == null ) // cannot find myuid, then return and do not process
		return;
	TVer = "4.0";
}
myuid = myuid.href.match(/uid=\d+/)[0].split("=")[1];

aLangGreaseMenuItemText = [
/*   0*/	"GTUA: Enable / disable shishnet map (user)", 
/*   1*/	"Enter 1 to enable shishnet map, 0 to disable:\n\n",
/*   2*/	"GTUA: Enable / disable debug mode (server)",
/*   3*/	"Enter 1 to enable debug mode, 0 to disable:\n\n",
/*   4*/	"GTUA: Set radius for villages to display in travian map info (user)",
/*   5*/	"Enter radius (an integer) for villages to display in travian map info, 0 to display only currently visible villages on map:\n\n",
/*   6*/	"GTUA: Set server for which to get data (server)",
/*   7*/	"Enter the value of \"s=\" to be used in url for getting data from travian-utils.com"
	];

function promptEnableDisableShishnetMap() {
	var curentSetup = GM_getValue ( myhost + "_" + myuid + "_shishnet_map", "1" );
	var newSetup = prompt(aLangGreaseMenuItemText[1],curentSetup);
	if ( newSetup != null )
		GM_setValue ( myhost + "_" + myuid + "_shishnet_map", newSetup );
}
GM_registerMenuCommand(aLangGreaseMenuItemText[0], promptEnableDisableShishnetMap ); // get shishnet map enable/disable from user by greasemonkey menu

function promptSetRadiusForMapInfo() {
	var curentSetup = GM_getValue ( myhost + "_" + myuid + "_map_radius", "21" );
	var newSetup = prompt(aLangGreaseMenuItemText[5],curentSetup);
	if ( newSetup != null )
		GM_setValue ( myhost + "_" + myuid + "_map_radius", newSetup );
}
GM_registerMenuCommand(aLangGreaseMenuItemText[4], promptSetRadiusForMapInfo ); // get radius for map info from user by greasemonkey menu

function promptDebugMode() {
	var curentSetup = GM_getValue ( myhost + "_debug_mode", "0" );
	var newSetup = prompt(aLangGreaseMenuItemText[3],curentSetup);
	if ( newSetup != null )
		GM_setValue ( myhost + "_debug_mode", newSetup );
}
GM_registerMenuCommand(aLangGreaseMenuItemText[2], promptDebugMode ); // get debug mode from user by greasemonkey menu

function promptServer() {
	var curentSetup = GM_getValue ( myhost + "_server", srvDefValue );
	var newSetup = prompt(aLangGreaseMenuItemText[7],curentSetup);
	if ( newSetup != null )
		GM_setValue ( myhost + "_server", newSetup );
}
GM_registerMenuCommand(aLangGreaseMenuItemText[6], promptServer ); // get server to use from user by greasemonkey menu

function flag (text) {
	var logDebugMessages = GM_getValue( myhost + "_debug_mode", "0" ) == "0" ? false : true;
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

function printStackTrace() {
	//var logDebugMessages = GM_getValue( myhost + "_debug_mode", "0" ) == "0" ? false : true;
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

function setupVillageOrProfile() {
	flag ( "setupVillageOrProfile():: Started!" );

	uid = url.match(/\buid=\d{1,}\b/);
	if ( uid != null )
		uid = uid[0].split("=")[1];
	else {
		if ( url.match(/spieler\.php/) != null ) { // self profile page
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
	if ( uid == myuid && url.match(/\bspieler\.php\b/) != null ) { // self profile page, get own allianz aid here
		var ownAid = "";
		var xpathOwnAlliance = "";
		if ( TVer == "3.6" )
			xpathOwnAlliance = '//table[@id="profile"]/tbody/tr/td[@class="details"]/table/tbody/tr/td/a[contains(@href,"allianz.php") and contains(@href,"aid=")]';
		else ( TVer == "4.0" )
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
		flag ( "setupVillageOrProfile():: ownAid: " + ownAid );
		GM_setValue( myhost + "_" + myuid + "_own_allianz", ownAid );
	}
	flag ( "setupVillageOrProfile():: srv: " + srv + ", uid: " + uid );

}

function setupAllianz() {
	flag ( "setupAllianz():: Started!" );

	aid = url.match(/\baid=\d{1,}\b/);
	if ( aid != null )
		aid = aid[0].split("=")[1];
	else { // own allianz page
		aid = GM_getValue( myhost + "_" + myuid + "_own_allianz", "" );
	}
	flag ( "setupAllianz():: aid: " + aid );
}

function setupMap() {
	flag ( "setupMap():: Started!" );
	if ( TVer == "3.6" ) {
		xCoord = document.evaluate('//div[@id="content"]//div[@id="map_rulers"]/div[@id="mx3"]',document,null,9,null).singleNodeValue.innerHTML;
		yCoord = document.evaluate('//div[@id="content"]//div[@id="map_rulers"]/div[@id="my3"]',document,null,9,null).singleNodeValue.innerHTML;
	}
	else if ( TVer == "4.0" ) {
		if ( url.match(/\bx=/) != null ) {
			xCoord = url.match(/\bx=[-0-9]{1,}\b/)[0].match(/[-0-9]{1,}\b/)[0];
			yCoord = url.match(/\by=[-0-9]{1,}\b/)[0].match(/[-0-9]{1,}\b/)[0];
		}
	}
	flag ( "setupMap():: xCoord: " + xCoord + ", yCoord: " + yCoord );
}

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
				GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 1*60*60*1000 ) + '' ); // delay re-check by 1 hour
			}
		});
	},
	compare: function ( xpr, flg ) {
		//flag ( "AnotherAutoUpdater.compare():: Started! flg: " + flg );
		//flag ( "AnotherAutoUpdater.compare():: xpr.responseText: " + xpr.responseText );
		if ( xpr.responseText.match ( /404 Not Found/i ) || xpr.responseText.match ( /bad gateway/i ) ) {
			GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 1*60*60*1000 ) + '' ); // delay re-check by 1 hour
			return false;
		}
		this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec ( xpr.responseText );
		this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec ( xpr. responseText );
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
			GM_setValue ( 'updated_' + this.id, ( this.time - (1000*60*60*24 * this.days) + 1*60*60*1000 ) + '' ); // delay re-check by 1 hour
			//GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		//flag ( "AnotherAutoUpdater.compare():: this.xversion: " + this.xversion + ", this.xname: " + this.xname );
		if ( ( +this.xversion > +this.version ) && ( confirm ( 'A new version of the \'' + this.xname + '\' user script is available. Do you want to update?' ) ) ) {
			GM_setValue ( 'updated_' + this.id, this.time + '' );
			top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
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
					function() { GM_setValue ( 'updated_' + AnotherAutoUpdater.id, new Date().getTime() + '' ); AnotherAutoUpdater.call(true) } );
		else {
			if ( +this.time > ( + GM_getValue ( 'updated_' + this.id, 0 ) + 1000*60*60*24 * this.days ) ) {
				GM_setValue ( 'updated_' + this.id, this.time + '' );
				this.call(false);
			}
			GM_registerMenuCommand ( "GTUA: Check " + this.name + " for updates",
				function() { GM_setValue ( 'updated_' + AnotherAutoUpdater.id, new Date().getTime() + '' ); AnotherAutoUpdater.call(true) } );
		}
	}
};

function INIT() {
	flag ( "INIT():: Started!" );

	if ( ( url.match(/\bspieler\.php\b/) != null && url.match(/\bs=\d{1,}\b/) == null ) // profile page
		|| ( url.match(/\bkarte\.php.*\bd=/) != null || url.match(/\bposition_details.php\b.*\bx=.*/) != null ) ) { // village
		setupVillageOrProfile();
	}
	else if ( url.match(/\ballianz\.php\b/) != null && url.match(/\bs=[023456]\b/) == null ) { // allianz page
		setupAllianz();
	}
	else if ( url.match(/\bkarte\.php\b/) != null && url.match(/\b\d=/) == null ) { // map
		setupMap();
	}

	myaid = GM_getValue( myhost + "_" + myuid + "_own_allianz", "" );

	if ( uid != "" || aid != "" ) {
		var content = document.getElementById("mid");
		
		// add div to show data...
		var tabDataDiv = document.createElement('div');
		tabDataDiv.id = "utils_title_data_div";
		var tabDataDivText = "<br/>";
		tabDataDivText = tabDataDivText + "<br/>";
		if ( aid != "" && aid == myaid )
			tabDataDivText = tabDataDivText + "<br/>";
		tabDataDivText = tabDataDivText + "<b>";
		if ( uid != "" )
			tabDataDivText = tabDataDivText	+ "";
		else
			tabDataDivText = tabDataDivText	+ "";
		tabDataDivText = tabDataDivText + " <href='http://travian.ws/analyser.pl?s="+srv;
		if ( uid != "" )
			tabDataDivText = tabDataDivText + "&uid=" + uid;
		else // ( aid != "" )
			tabDataDivText = tabDataDivText + "&aid=" + aid;
		tabDataDivText = tabDataDivText + "' target='_blank'></a></b>";
		tabDataDivText = tabDataDivText + "&#160;&#160;<a id='refresh_utils_data_url' href='#'></a><br/>" + 
					"<div id=\"utils_data_div\"></div>";
		tabDataDiv.innerHTML = tabDataDivText;
		tabDataDiv.style.paddingTop = "0px";
		tabDataDiv.style.paddingLeft = "0px";
		tabDataDiv.style.clear = "";
		content.appendChild(tabDataDiv, content.nextSibling);
		var refreshDataElement = document.getElementById ( "refresh_utils_data_url" );
		refreshDataElement.addEventListener("click", handleRefreshUtilsDataEvent, false );
		
		// add div to show notes...
		var tabNotesDiv = document.createElement('div');
		tabNotesDiv.id = "utils_title_notes_div";
		var tabNotesDivText = "<br/>";
		tabNotesDivText = tabNotesDivText + "<b>";
		if ( uid != "" )
			tabNotesDivText = tabNotesDivText + "";
		else
			tabNotesDivText = tabNotesDivText + "";
		tabNotesDivText = tabNotesDivText + "<a href='http://travian.ws/analyser.pl?s="+srv;
		if ( uid != "" )
			tabNotesDivText = tabNotesDivText + "&uid=" + uid;
		else // ( aid != "" )
			tabNotesDivText = tabNotesDivText + "&aid=" + aid;
		tabNotesDivText = tabNotesDivText + "&note' target='_blank'></a></b>";
		tabNotesDivText = tabNotesDivText + "&#160;&#160;<a id='refresh_utils_notes_url' href='#'></a><br/>" +
					"<div id='utils_notes_div'></div>"+
					"<div id='utils_add_notes_div'></div>";
		tabNotesDiv.innerHTML = tabNotesDivText;
		tabNotesDiv.style.paddingLeft = "0px";
		tabNotesDiv.style.clear = "both";
		content.appendChild(tabNotesDiv, content.nextSibling);
		var refreshNotesElement = document.getElementById ( "refresh_utils_notes_url" );
		refreshNotesElement.addEventListener("click", handleRefreshUtilsNotesEvent, false );
		
		// add the input elements for adding nodes functionality...
		var tableAddNotesElement = document.createElement('table');
		tableAddNotesElement.setAttribute("class", "tsu_list brd_a x09 sm1");
		tableAddNotesElement.innerHTML = ( "<tr><th class=\"h2\"></th></tr>" + 
						"<tr><td class='c h3'><b>" + 
							"<a href='' target='_blank'></a></b></td></tr>" +
						"<tr><td class='c h0'><textarea type='text' id='add_note_input_text' class='' name='note'></textarea></td></tr>" + 
						"<tr><td class='c h0'>" + 
						"<input type='button' id='add_note_input_button' class='' name='submit_note_u_add' value='' />" + 
						"</td></tr>" );
		var tabAddNotesDiv = document.getElementById ( "utils_add_notes_div" );
		tabAddNotesDiv.appendChild(tableAddNotesElement, tabAddNotesDiv.nextSibling);

		var noteAddButton = document.getElementById("add_note_input_button");
		noteAddButton.addEventListener("click",handleAddNote,true);

		tabAddNotesDiv.style.paddingLeft = "0px";
		tabAddNotesDiv.style.clear = "both";
	}
	else if ( xCoord != "" ) {
		var content = document.getElementById("mid");

		// add div to show data...
		var tabDataDiv = document.createElement('div');
		tabDataDiv.id = "utils_title_map_div";
		var radius = GM_getValue ( myhost + "_" + myuid + "_map_radius", "40" );
		if ( radius == "0" )
			radius = "5";
		var tabDataDivText = "<br/>";
		tabDataDivText = tabDataDivText + "<br/>";
		var tabDataDivText = "<b>Inactive Arround from <span id='utils_map_heading'>(" + xCoord + "|" + yCoord + ") Radius 40  <a href='http://travian.ws/analyser.pl?s=" 
					+ srv + "&q" + "=" + xCoord + "%2C" + yCoord + "%2C" + radius
					+ "' target='_blank'>Klick Here</a></span></b>";
		tabDataDivText = tabDataDivText + "&#160;&#160;<a id='refresh_utils_map_url' href='#'></a><br/>" + 
					"<div id=\"utils_map_div\"></div>";
		tabDataDiv.innerHTML = tabDataDivText;
		tabDataDiv.style.paddingTop = "0px";
		tabDataDiv.style.paddingLeft = "0px";
		tabDataDiv.style.clear = "both";
		content.appendChild(tabDataDiv, content.nextSibling);
		var refreshDataElement = document.getElementById ( "refresh_utils_map_url" );
		refreshDataElement.addEventListener("click", handleRefreshMapEvent, false );

		if ( TVer == "3.6" ) {
			document.getElementById("ma_n1").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n2").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n3").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n4").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n1p7").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n2p7").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n3p7").addEventListener("click",onMapChange, false );
			document.getElementById("ma_n4p7").addEventListener("click",onMapChange, false );
			document.getElementById("btn_ok").addEventListener("click",onMapChange, false );
		}
	}
	if ( uid != "" || aid != "" || xCoord != "" ) {
		var shishMapEnabled = GM_getValue ( myhost + "_" + myuid + "_shishnet_map", "1" ) == "1" ? true : false;
		if ( shishMapEnabled ) {
			var content = document.getElementById("mid");
			var mapContainer = document.createElement('div');
			mapContainer.id = "utils_map_container";
			mapContainer.style.paddingLeft = "0px";
			mapContainer.style.paddingBottom = "0px";
			mapContainer.innerHTML = "<b>Data From <a href=\"http://travian.ws/\">travian.ws</a></b><br/><div id=\"utils_map\"></div>";
			content.appendChild(mapContainer);
		}
	}
	if ( uid != "" || aid != "" ) {
		getShishNetMap();
		getUtilsData();
		getUtilsNotes();
		addStyles();
	}
	else if ( xCoord != "" ) {
		getMapData();
		addStyles();
	}

	if ( uid != "" || aid != "" || xCoord != "" ) {
		// Cluster Maps [clustrmaps] -- not shown on any page with a timer
		//var logDebugMessages = GM_getValue( myhost + "_debug_mode", "0" ) == "0" ? false : true;
		var timerElems = document.evaluate ( '//*[contains(@id,"timer")]', document, null, 9, null ).singleNodeValue;
		if ( timerElems == null // show when no timers on current page
				//&& logDebugMessages == false // debug mode is false
			) {
			var clustrDiv = document.createElement("div");
			clustrDiv.align="left";
			clustrDiv.style.paddingLeft = "0px";
			// minimalistic cluster map
			clustrDiv.innerHTML = '<a href="">'+
				'<img src=""'+
				' alt="" />'+
				'</a>';
			var content = document.getElementById("mid");
			content.appendChild(clustrDiv);
		}
	}
	AnotherAutoUpdater.check();
}

INIT();

var dataStoreDuration = 12*60*60*1000; // retain data for 0 hrs

function getDataFromMemory( gm_ck_name, key ) {
	try {
		flag ( "getDataFromMemory():: Started! gm_ck_name: " + gm_ck_name + ", key:" + key );

		if ( key == "" || key == null || key == undefined )
			return false;

		// get the cookie data
		var gmMemory = GM_getValue ( myhost + "_" + myuid + "_" + gm_ck_name, "" );
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
			GM_setValue ( myhost + "_" + myuid + "_" + gm_ck_name, JSON.stringify(gmMemory) );
		}
		catch (e){
			GM_setValue ( myhost + "_" + myuid + "_" + gm_ck_name, uneval(gmMemory) );
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

function setDataToMemory( gm_ck_name, key, data ) {
	try {
		flag ( "setDataToMemory():: Started! gm_ck_name: " + gm_ck_name + ", key:" + key );

		// get the cookie data
		var gmMemory = GM_getValue ( myhost + "_" + myuid + "_" + gm_ck_name, "" );
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
			GM_setValue ( myhost + "_" + myuid + "_" + gm_ck_name, JSON.stringify(gmMemory) );
		}
		catch (e){
			GM_setValue ( myhost + "_" + myuid + "_" + gm_ck_name, uneval(gmMemory) );
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "setDataToMemory():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}

// mode: "0": get data from memory
// mode: "1": fetch data from travian-utils
function getUtilsNotes ( mode ) {
	try {
		if ( mode == null || mode == undefined )
			mode = "0";

		flag ( "getUtilsNotes():: Started! mode: " + mode );

		// get data from memory when mode is "0"
		if ( mode == "0" ) {
			var storedData = false;
			if ( uid != "" )
				storedData = getDataFromMemory ( "utils_uid_notes_memory", uid );
			else
				storedData = getDataFromMemory ( "utils_aid_notes_memory", aid );
			if ( storedData != false ) { // if data exists, then insert data and return
				insertNotes(storedData);
				return;
			}
		}

		// get notes from trav-utils
		var nurl = "";
		if ( uid != "" )
			nurl = "http://travian.ws/analyser.pl?s=" + srv + "&uid=" + uid + "";
		else // ( aid != "" )
			nurl = "http://travian.ws/analyser.pl?s=" + srv + "&aid=" + uid + "";
		GM_xmlhttpRequest({
			method: "GET",
			url: nurl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Accept": "text/xml"
			},
			onload: function(response) {
					if ( uid != "" )
						setDataToMemory ( "utils_uid_notes_memory", uid, response.responseText );
					else
						setDataToMemory ( "utils_aid_notes_memory", aid, response.responseText );
					insertNotes(response.responseText);
				}
		});
	}
	catch ( err ) {
		printStackTrace();
		var msg = "getUtilsNotes():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}

// mode: "0": get data from memory
// mode: "1": fetch data from travian-utils
function getUtilsData ( mode ) {
	try {
		if ( mode == null || mode == undefined )
			mode = "0";

		flag ( "getUtilsData():: Started! mode: " + mode );

		// get data from memory when mode is "0"
		if ( mode == "0" ) {
			var storedData = false;
			if ( uid != "" )
				storedData = getDataFromMemory ( "utils_uid_data_memory", uid );
			else
				storedData = getDataFromMemory ( "utils_aid_data_memory", aid );
			if ( storedData != false ) { // if data exists, then insert data and return
				insertData(storedData);
				return;
			}
		}

		// get player data from trav-utils
		var nurl = "";
		if ( uid != "" )
			nurl = "http://travian.ws/analyser.pl?s=" + srv + "&uid=" + uid;
		else // ( aid != "" )
			nurl = "http://travian.ws/analyser.pl?s=" + srv + "&aid=" + aid;
		GM_xmlhttpRequest({
			method: "GET",
			url: nurl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Accept": "text/xml"
			},
			onload: function(response) {
					if ( uid != "" )
						setDataToMemory ( "utils_uid_data_memory", uid, response.responseText );
					else
						setDataToMemory ( "utils_aid_data_memory", aid, response.responseText );
					insertData(response.responseText);
				}
		});
	}
	catch ( err ) {
		printStackTrace();
		var msg = "getUtilsData():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}

var timeOutId = null;
function onMapChange() {
	if ( timeOutId )
		window.clearTimeout ( timeOutId );
	var tabDataDiv = document.getElementById("utils_map_div");
	tabDataDiv.innerHTML = "Refreshing...";
	timeOutId = window.setTimeout ( getMapData, 1000);
}

function getShishNetMap() {
	var shishMapEnabled = GM_getValue ( myhost + "_" + myuid + "_shishnet_map", "1" ) == "1" ? true : false;
	if ( shishMapEnabled ) {
		flag ( "getShishNetMap():: Started!" );

		var myserver = window.location.host;
		var imageurl = "http://travian.ws/analyser.pl?s=" + srv + "&uid=" + uid + "" + "" + myserver;// "" +

		if ( uid != "" ) {
			if ( myuid != uid )
				imageurl = imageurl + "" + "" + myuid + "" + uid;
			else
				imageurl = imageurl + "" + "" + myuid;
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
			var displayedVillas = document.evaluate('//div[@id="utils_title_map_div"]//a[contains(@href,"idu=")]', document, null, 6, null );
			for ( var ctr = 0; ctr < displayedVillas.snapshotLength ; ctr++ ) {
				var idu = displayedVillas.snapshotItem(ctr).href.match(/\bidu=\d{1,}\b/)[0].split("=")[1];
				imageurl = imageurl + ",id:" + idu;
			}
		}
		flag ( "getShishNetMap():: imageurl: " + imageurl );

		imageurl = encodeURI(imageurl);
		var utilsDiv = document.getElementById("utils_map");
		if ( utilsDiv )
			utilsDiv.innerHTML = '<div><iframe width="990" height="1168" frameborder="0" src="'+ imageurl +'"></iframe></div>';
	}
}

function getMapData ( mode ) {
	try {
		if ( mode == null || mode == undefined )
			mode = "0";

		flag ( "getMapData():: Started! mode: " + mode );

		// get coordinates
		setupMap();

		// get radius
		var radius = GM_getValue ( myhost + "_" + myuid + "_map_radius", "40" );
		if ( radius == "0" )
			radius = "5";

		// get data from memory when mode is "0"
		if ( mode == "0" ) {
			var storedData = false;
			storedData = getDataFromMemory ( "utils_map_memory", xCoord+"|"+yCoord+"|"+radius );
			if ( storedData != false ) { // if data exists, then insert data and return
				insertMapData(storedData);
				return;
			}
		}

		var nurl = "" + srv + "&act=" + "&x=" + xCoord + "&y=" + yCoord + "&r=" + radius + "&sort=6&st=1";
		//flag ( "getMapData():: nurl: " + nurl );
		
		// get player data from trav-utils
		GM_xmlhttpRequest({
			method: "",
			url: nurl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Accept": "text/xml"
			},
			onload: function(response) {
					setDataToMemory ( "utils_map_memory", xCoord+"|"+yCoord+"|"+radius, response.responseText );
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

function handleRefreshMapEvent(eventt) {
	flag ( "handleRefreshMapEvent():: Started!" );
	var tabDataDiv = document.getElementById("utils_map_div");
	tabDataDiv.innerHTML = "Refreshing...";
	tabDataDiv.style.paddingLeft = "0px";
	tabDataDiv.style.clear = "both";
	getMapData("1");
}

function handleRefreshUtilsDataEvent(eventt) {
	flag ( "handleRefreshUtilsDataEvent():: Started!" );
	var tabDataDiv = document.getElementById("utils_data_div");
	tabDataDiv.innerHTML = "Refreshing...";
	tabDataDiv.style.paddingLeft = "0px";
	tabDataDiv.style.clear = "both";
	getUtilsData("1");
}

function handleRefreshUtilsNotesEvent(eventt) {
	flag ( "handleRefreshUtilsNotesEvent():: Started!" );
	var tabNotesInnerDiv = document.getElementById("utils_notes_div");
	tabNotesInnerDiv.innerHTML = "Refreshing...";
	tabNotesInnerDiv.style.paddingLeft = "0px";
	tabNotesInnerDiv.style.clear = "both";
	getUtilsNotes("1");
}

// insert external map data into the page...
function insertMapData(doc) {
	flag ( "insertMapData():: Started!" );
	if ( doc != null && doc != "" && doc ) {
		// verify the coords have not changed recently
		xOld = xCoord;
		yOld = yCoord;
		setupMap();
		if ( xOld != xCoord || yOld != yCoord ) {
			getMapData();
			return;
		}

		var mapHeading = document.getElementById("utils_map_heading");
		if ( mapHeading ) {
			var radius = GM_getValue ( myhost + "_" + myuid + "_map_radius", "40" );
			if ( radius == "0" )
				radius = "5";
			mapHeading.innerHTML = "(" + xCoord + "|" + yCoord + ") Radius 40 <a href='http://travian.ws/analyser.pl?s=" 
					+ srv + "&q" + "=" + xCoord + "%2C" + yCoord + "%2C" + radius
					+ "' target='_blank'> KLICK HERE</a>";
		}

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

		// delete scripts from travian utils as they break our script
		if ( true ) {
			var tt = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']/tbody/tr[1]/td[1]", divElement, null, 9, null).singleNodeValue;
			if ( tt )
				tt.innerHTML = "";
		}

		// find relevant map data in doc...
		var table = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']/tbody/tr", divElement, null, 6, null);

		// insert relevant data into page...
		var tabMapInnerDiv = document.getElementById("utils_map_div");
		if ( tabMapInnerDiv != null && table.snapshotLength > 0 ) {
			var tableDataElement = document.createElement('table');
			tableDataElement.setAttribute("class", "tsu_list brd_a x09 sm1");
			var tableBodyElement = document.createElement('tbody');
			tableDataElement.appendChild(tableBodyElement);

			var radius = GM_getValue ( myhost + "_" + myuid + "_map_radius", "40" );
			if ( radius == "0" ) {
				var itr = 1;
				if ( table.snapshotLength > 1 ) {
					tableBodyElement.appendChild(table.snapshotItem(0)); // heading or 'There are no villages'
					for ( var ctr = 1 ; ctr < table.snapshotLength ; ctr++ ) {
						//flag ( "insertMapData():: ctr: " + ctr );
						var xy = table.snapshotItem(ctr).textContent.match(/\([-0-9]{1,}\|[-0-9]{1,}\)/)[0].match(/[-0-9]{1,}\b/g);
						//flag ( "insertMapData():: xy: " + xy );
						if ( Math.abs ( xy[0] - xCoord ) <= 3 && Math.abs ( xy[1] - yCoord ) <= 3 ) {
							table.snapshotItem(ctr).childNodes[1].innerHTML = itr++;
							tableBodyElement.appendChild(table.snapshotItem(ctr));
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
			tabMapInnerDiv.style.paddingLeft = "0px";
			tabMapInnerDiv.style.clear = "both";
			tabMapInnerDiv.appendChild(tableDataElement); // + footer;

			// convert all anchors in tabMapInnerDiv to lead to http://travian.ws/ ...
			var anchors = tabMapInnerDiv.getElementsByTagName("a");
			for ( var ctr = 0 ; ctr < anchors.length ; ctr++ ) {
				var anchor = anchors[ctr].href;
				var temp = "http://travian.ws/analyser.pl?" + anchor.split("?")[1];
				anchors[ctr].href = temp;
				anchors[ctr].target = "new";
			}
		
			// do some formatting...
			var datesInTable = document.getElementsByClassName("sdv");
			for ( var ctr in datesInTable ) {
				datesInTable[ctr].setAttribute("style","text-align: center");
			}
			var villagesInTable = document.getElementsByClassName("l");
			for ( var ctr in villagesInTable ) {
				villagesInTable[ctr].setAttribute("style","padding: 0px 0px 0px 0px");
			}
		}
		else if ( tabMapInnerDiv != null ) {
			tabMapInnerDiv.style.paddingLeft = "";
			tabMapInnerDiv.style.clear = "";
			tabMapInnerDiv.innerHTML = "";
		}
		getShishNetMap();
	}
	else {
		var tabMapInnerDiv = document.getElementById("utils_map_div");
		tabMapInnerDiv.style.paddingLeft = "";
		tabMapInnerDiv.style.clear = "";
		tabMapInnerDiv.innerHTML = "";
	}
}

// insert external data into the page...
function insertData(doc) {
	flag ( "insertData():: Started!" );
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

		// delete scripts from travian utils as they break our script
		if ( aid != "" ) {
			var tt = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']/tbody/tr[1]/td[1]", divElement, null, 9, null).singleNodeValue;
			if ( tt )
				tt.innerHTML = "";
		}

		// find relevant player data in doc...
		var table = document.evaluate("//table[@class='tsu_list brd_a x09 sm1']", divElement, null, 9, null).singleNodeValue;
		var table2 = document.evaluate("//table[2][@class='tsu_list brd_a x09 sm1']", divElement, null, 9, null).singleNodeValue;

		// insert relevant data into page...
		var tabDataDiv = document.getElementById("utils_data_div");
		if ( tabDataDiv != null && ( table != null || table2 != null ) ) {
			tabDataDiv.innerHTML = "";
			tabDataDiv.style.paddingLeft = "0px";
			tabDataDiv.style.clear = "both";
			if ( table != null ) {
				var tableDataElement = document.createElement('table');
				tableDataElement.innerHTML = table.innerHTML;
				tableDataElement.setAttribute("class", "tsu_list brd_a x09 sm1");
				tabDataDiv.appendChild(tableDataElement);
			}
			if ( table2 != null ) {
				var tableDataElement = document.createElement('table');
				tableDataElement.innerHTML = table2.innerHTML;
				tableDataElement.setAttribute("class", "tsu_list brd_a x09 sm1");
				tabDataDiv.appendChild(tableDataElement);
			}

			// convert all anchors in tabDataDiv to lead to http://travian.ws/ ...
			var anchors = tabDataDiv.getElementsByTagName("a");
			for ( var ctr = 0 ; ctr < anchors.length ; ctr++ ) {
				var anchor = anchors[ctr].href;
				var temp = "http://travian.ws/analyser.pl?" + anchor.split("?")[1];
				anchors[ctr].href = temp;
				anchors[ctr].target = "new";
			}
		
			// do some formatting...
			var datesInTable = document.getElementsByClassName("sdv");
			for ( var ctr in datesInTable ) {
				datesInTable[ctr].setAttribute("style","padding: 0px 0px 0px 0px;text-align: right");
			}
			var villagesInTable = document.getElementsByClassName("l");
			for ( var ctr in villagesInTable ) {
				villagesInTable[ctr].setAttribute("style","padding: 0px 0px 0px 0px");
			}
		}
		else if ( tabDataDiv != null ) {
			tabDataDiv.style.paddingLeft = "0px";
			tabDataDiv.style.clear = "both";
			tabDataDiv.innerHTML = "";
		}
	}
	else {
		var tabDataDiv = document.getElementById("utils_data_div");
		tabDataDiv.style.paddingLeft = "0px";
		tabDataDiv.style.clear = "both";
		tabDataDiv.innerHTML = "";
	}
}

// insert external notes data into the page...
function insertNotes(doc) {
	flag ( "insertNotes():: Started!" );
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
			tabNotesInnerDiv.style.paddingLeft = "0px";
			tabNotesInnerDiv.style.clear = "both";

			// if response text has login-button, then hot-wire the login button...
			var getLoginButton = document.getElementsByName("submit_go_login");
			if ( getLoginButton.length > 0 )
				getLoginButton[0].addEventListener("", function() { window.open("http://travian-utils.com/?login"); }, false );
		}
		else if ( tabNotesInnerDiv != null ) {
			tabNotesInnerDiv.style.paddingLeft = "";
			tabNotesInnerDiv.style.clear = "";
			tabNotesInnerDiv.innerHTML = "";
		}
	}
	else {
		var tabNotesInnerDiv = document.getElementById("utils_notes_div");
		tabNotesInnerDiv.style.paddingLeft = "";
		tabNotesInnerDiv.style.clear = "";
		tabNotesInnerDiv.innerHTML = "";
	}
}

function handleAddNote( eventt ) {
	try {
		flag ( "handleAddNote():: Started!" );
		// get note to add from input elements...
		var addNoteNode = document.getElementById("add_note_input_text");
		var addNoteText = addNoteNode.value ? addNoteNode.value : "" ;

		if ( addNoteText != null && addNoteText != "" ) {
			// build url and url data...
			var noteUrl = "http://travian.ws/analyser.pl?";
			var noteUrlData = "";
			if ( uid != "" )
				noteUrlData = "s=" + srv + "&idu=" + uid + "&note=" + addNoteText + "&submit_note_u_add=Add";
			else // ( aid != "" )
				noteUrlData = "s=" + srv + "&ida=" + aid + "&note=" + addNoteText + "&submit_note_a_add=Add";

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
					flag ( "insertNotes():: Notes addition succeeded!" );
					if ( uid != "" )
						setDataToMemory ( "utils_uid_notes_memory", uid, response.responseText );
					else
						setDataToMemory ( "utils_aid_notes_memory", aid, response.responseText );
					insertNotes(response.responseText);
					var addNoteNode = document.getElementById("add_note_input_text");
					addNoteNode.value = "";
				},
				onerror: function(response) {
					flag ( "insertNotes():: Notes addition failed!" );
					var tabNotesInnerDiv = document.getElementById("utils_notes_div");
					tabNotesInnerDiv.innerHTML = response.responseText;
					tabNotesInnerDiv.style.paddingLeft = "0px";
					tabNotesInnerDiv.style.clear = "both";
				}
			});
		}
	}
	catch ( err ) {
		printStackTrace();
		var msg = "handleAddNote():: Something went wrong, error: " + err.name + ", Error Message: " + err.message;
		flag ( msg );
		throw err;
	}
}

// Force some css styling
function addStyles() {
	flag ( "addStyles():: Started!" );
	// Get user id
	var url = document.location.href;

	GM_addStyle(<><![CDATA[
	TABLE.tsu_list {
		border-collapse: collapse;
		border-spacing: 0,1px;
		border: 0px solid #eee;
	        width: 0,1px;
	}
	TABLE.tsu_list TD{
		border: 0,1px solid #FFFFFF;
		text-align: right;
	}
	TABLE.tsu_list TD.l{
		text-align: left;
	}
	TABLE.tsu_list TD.c{
		text-align: center;
	}
	TABLE.tsu_list TH{
		background-color:#FFFFFF;
		padding-left:1em;
		padding-right:1em;
	}
	TABLE.tsu_list TR.tr1{
		background-color:#FFFFFF;
	}
	.green{
		color: #FFFFFF;
	}
	.red{
		color: red;
	}
	.lred{
		color: lightCoral;
	}
	.grey{
		color: #FFFFFF;
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
		color:#FFFFFF;
	}
	.h2{
	        font-weight:bold;
	}
	
	]]></>.toString());
	
	// Right-align exception for Arabic servers
	if(url.match(/\.ae\//)){
		GM_addStyle("TABLE.tsu_list TD.l{text-align: right;}");
	}
	if ( TVer == "4.0" ) {
		GM_addStyle("#utils_map_heading a, #utils_title_map_div a, #utils_map_container a, #utils_title_data_div a, #utils_title_notes_div a { color: PaleVioletRed }");
	}
}

};

window.onload = functionMain();

