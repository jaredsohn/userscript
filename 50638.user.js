scr_meta=<><![CDATA[
// ==UserScript==
// @name           Neobux Referral Highlighter
// @namespace      http://www.neobux.com/
// @description    Neobux Referral Highlighter
// @include        http://www.neobux.com/?u=c&s=r&*
// @include        https://www.neobux.com/?u=c&s=r&*
// @version        0.2.1

// @attribution    kwah [modifed xargoon's script to fix bug(s) plus misc updates] ( http://www.neobux.com/forum/?frmid=7&tpcid=61509 )
// @attribution    Kjetil Leroen (xargoon) [full credit for the original script] ( http://www.neobux.com/forum/?frmid=7&tpcid=12599 )

// @license (CC)   Attribution-Noncommercial-Share Alike 2.0; http://creativecommons.org/licenses/by-nc-sa/2.0/

// ==/UserScript==
]]></>.toString();


// a number of defaults & settings used later in the script:
var MSPD = 86400000; // 24hours*60minutes*60seconds*1000microseconds = 1 day = 86400000 MicroSecondsPerDay (MSPD)
var english = true;
var directRefs = true;

// adds the menu options to enable modification of default values
CreateMenuOptions(); 

/*
Updates/Changelog
v0.2.1 020609
    * Fixed the compatibility issues with Neobux 2+ by 'cleansing' the data in the table
  -- kwah
v0.2.0a 010609
    * Fixed to work with the new layout (addition of referral flags by admin)
    * Renamed to 'Neobux Referral Highlighter' (NeobuxAVG doesn't make sense)
    * Added comments to make the code more readable
    * Edited the includes to stop the script running on the referral statistics pages
    * Commented out the update checker (updating the 'current' version is not in my control)
    * Added an updater that is under my control
    * Other general maintenence / miscellaneous updates
  -- kwah
v0.1.9 091208
    * Fixed to work with new layout
v0.1.8 051208
    * Fixed to work with slightly changed layout.
    * Some config-option changes.
v0.1.7 160908
    * Fixed to work with slightly changed layout.
v0.1.6 130908
    * Removed auto selecting of bad refs. This feature has been banned by NeoBux.
    * Implemented zeroclicker-highlighting
    * Implemented auto-update
    * It's now possible to change the highlighting color of good refs between green and blue
v0.1.5 080908
    * Highlighting for good refs (default 3 avg)
    * Highlighting/automark for inactive refs. Highlights if below threshold for good refs, and over x days of inactivity (7 days default)
    * Fixed a couple of bugs
    * Cleaned up
v0.1.4 080908
    * Fixed to work with NeoBux' Avg column. The script only calculates averages when neobux doesn't, and displays these values in purple.
v0.1.3 080908
    * It's now possible to configure avg click threshold, minimum number of days as referral before highlighting and if
      auto marking/checking should be enabled. These options can be accessed through Tools->Greasemonkey->User script commands
v0.1.2 080908
    * Portuguese should work nowsmile
v0.1.1 080908
    * Supports Portuguese language
    * Fixed a display bug when numDays was below 1
    * Changed background color
    * Threshold changed to 2.0 instead of 1.5
*/

if(GM_getValue('revision', 0) < 6) {
	GM_setValue('avgThreshold', '1.8');
	GM_setValue('avggoodThreshold', '2.5');
	GM_setValue('inactiveThreshold', '3');
	GM_setValue('zeroThreshold', '2');
	GM_setValue('minDays', '4');
	GM_setValue('automark', '1');
	GM_setValue('automarkinactive', '1');
	GM_setValue('hlgood', '1');
	GM_setValue('good_colorscheme', '1');
	alert("Your settings were set to their default values.");
}
GM_setValue('revision', '9');


var revision = GM_getValue('revision', 0);
var avgThreshold = GM_getValue('avgThreshold', 1.8); // the upper limit for the 'bad' refs
var avggoodThreshold = GM_getValue('avggoodThreshold', 2.5); // the upper limit for the 'okay' refs
var inactiveThreshold = GM_getValue('inactiveThreshold', 3); // the number of days a ref must be inactive for to be marked as inactive
var zeroThreshold = GM_getValue('zeroThreshold', 2); // the number of days a ref must have zero clicks for to be marked as a zero clicker
var minDays = GM_getValue('minDays', 4); // the number of days a ref must be owned by you to be highlighted at all
var automark = GM_getValue('automark', 1); // should the script mark referrals at all?
var automarkinactive = GM_getValue('automarkinactive', 1); // should the script mark inactive users?
var hlgood = GM_getValue('hlgood', 1); // should the script highlight 'good' users?
var good_colorscheme = GM_getValue('good_colorscheme', 1); // which colour scheme should be used to highlight good refs? 0=lime green, 1=blue


// set "today" & "yesterday" dates
var Today = new Date();
var Yesterday = new Date()
Yesterday.setDate(Today.getDate() - 1);


// get the <tbody> surrounding the list of referrals -- all data located within this table
	var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

var rows = mainTable.childNodes;


// check whether the table is in English or Portugese
if(rows[0].childNodes[1].innerHTML.match('Referido')) english = false; // default = true

// check whether it is the list of direct refs or rented refs
if(window.location.href.match('ss3=2')) directRefs = false; // default = true

if(directRefs) {
	var col_AVG = 8; // the average number of clicks the referral has made (per day) = COL 8
	var col_CLICKS = 7; // total number of clicks the referral has made = COL 7
	var col_LAST = 6; // date of last click = COL 6
	var col_SINCE = 4; // length of ownership of referral (today/yesterday/date) = COL 4
} else {
	var col_AVG = 8; // the average number of clicks the referral has made (per day) = COL 8
	var col_CLICKS = 7; // total number of clicks the referral has made = COL 7
	var col_LAST = 6; // date of last click = COL 6
	var col_SINCE = 4; // length of ownership of referral (today/yesterday/date) = COL 4
}


// the jump size in the for loop = 3 therefore errors could occur if n = (rows.length - 1) for example
// rows other than these do not contain useful data thus should be skipped
var x = Math.floor(rows.length / 3)*3;

var abc = 0;
for(var n=1; n<x; n=n+3) {
abc = abc + 1;

  var i = n;
  var refNo = ((n - 1) / 3) + 1;

  //GM_log('\ni = '+i+'\nn = '+n+'\nrefNo = '+refNo);
  
	var tmpDate = cleanData(rows[i].childNodes[col_SINCE].innerHTML); // length of ownership of referral (today/yesterday/date)

	var numDays = Math.max(1,NumDaysSince(tmpDate)); // length of ownership of referral (days)
  
  // GM_log('tmpDate = '+tmpDate);
  // GM_log('NumDaysSince(tmpDate) = '+NumDaysSince(tmpDate));
  // GM_log('numDays = '+numDays);    

	var tmpDateLastClick = cleanData(rows[i].childNodes[col_LAST].innerHTML); // date of last click

	if(tmpDateLastClick.match('No clicks') || tmpDateLastClick.match('Sem cliques')) {
		var inactiveDays = numDays; // if no clicks, # of days that the user has been inactive for = the whole length of ownership
	} else {
		var inactiveDays = NumDaysSince(tmpDateLastClick);
	}

	var clicks = cleanData(rows[i].childNodes[col_CLICKS].innerHTML); // total number of clicks the referral has made
    
	var my_avgClicks = new Number(clicks / numDays);
	var avgClicks = new Number(cleanData(rows[i].childNodes[col_AVG].innerHTML));
    
	if(avgClicks == 0 && my_avgClicks > 0) {
		avgClicks = my_avgClicks;
		rows[i].childNodes[col_AVG].innerHTML = "[" + avgClicks.toFixed(3) + ']';
	}

  // if(mark refs = true && length of ownership>limit && avg clicks < lower avg threshold)
	if(automark == 1 &&
  numDays >= minDays && avgClicks < avgThreshold) {
  //GM_log('Ref '+refNo+' orange');
    for(var y=0; y<rows[i].childNodes.length; y++) {
      //GM_log('Ref '+refNo+' orange_confirm');
      rows[i].childNodes[y].style.background = '#FF9900'; // bad clicker = dark orange
    }
	}
  //GM_log('ORANGE:\n\nif(automark == 1 && numDays >= minDays && avgClicks < avgThreshold)');
  //GM_log('\nautomark = '+automark+'\nnumDays = '+numDays+'\nminDays = '+minDays+'\navgClicks = '+avgClicks+'\navgThreshold = '+avgThreshold);
  
  // if(mark inactives? && ((zero clicker? && is old enough to mark as zero clicker) | new?) && is inactive)
	if(automarkinactive == 1 && ((clicks == 0 && inactiveDays>=zeroThreshold) || (numDays >= minDays && avgClicks < avggoodThreshold && inactiveDays > inactiveThreshold))) {
  //GM_log('Ref '+refNo+' purple');
		for(var y=0; y<rows[i].childNodes.length; y++) {
      //GM_log('Ref '+refNo+' purple_confirm');
      rows[i].childNodes[y].style.background = '#FF99FF'; // inactives = purple
    }
	}
  
//GM_log('PURPLE:\n\nif(automarkinactive == 1 && ((clicks == 0 && inactiveDays>=zeroThreshold) || (numDays >= minDays && avgClicks < avggoodThreshold && inactiveDays > inactiveThreshold)))');
//GM_log('\nautomarkinactive = '+automarkinactive+'\nclicks = '+clicks+'\ninactiveDays = '+inactiveDays+'\nzeroThreshold = '+zeroThreshold+'\nnumDays = '+numDays+'\nminDays = '+minDays+'\navgClicks = '+avgClicks+'\navggoodThreshold = '+avggoodThreshold+'\ninactiveDays = '+inactiveDays+'\nnumDays = '+inactiveThreshold);

  // if(highlight good refs? && is not new & avg clicks > 'good' threshold)
	if (hlgood == 1 && numDays >= minDays && avgClicks >= avggoodThreshold) {
  //GM_log('Ref '+refNo+' blue');
    for(var y=0; y<rows[i].childNodes.length; y++) {
      //GM_log('Ref '+refNo+' blue_confirm');
			rows[i].childNodes[y].style.background = (good_colorscheme == 1 ? '#64FF00' : '#3399FF'); // good = lime green | blue
    }
	}
  //GM_log('BLUE: if (hlgood == 1 && numDays >= minDays && avgClicks >= avggoodThreshold)');
  //GM_log('hlgood = '+hlgood+'\nnumDays = '+numDays+'\nminDays = '+minDays+'\navgClicks = '+avgClicks+'\navggoodThreshold = '+avggoodThreshold);

//GM_log('\n\n--------------------\n\n');
  
}

//GM_log('abc = '+abc);

/* --------------------------------------
----------------FUNCTIONS----------------
-------------------------------------- */

// CHECKS HOW MANY DAYS BETWEEN (tmp) AND TODAY

function NumDaysSince (tmp) {
	var tmpDate = tmp.split(' ');

	if(tmpDate.length>1) {
		var tt = tmpDate[1].split(":");
	} else {
		var tt = new Array(2); // default to midnight
		tt[0] = "00";
		tt[1] = "00";
	}

	if(tmpDate[0].match("Today") || tmpDate[0].match("Hoje")) {
  		var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
	} else if(tmpDate[0].match("Yesterday") || tmpDate[0].match("Ontem")) {
  		var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
	} else {
  		var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[1] : ""));
	}

	var numDays = Math.floor((Today - Since) / MSPD);

	return numDays;
}


// cleanData()
// REMOVES EXTRA STUFF FROM THE TABLE CELLS
// CREATED AS A FIX TO SOLVE THE COMPATIBILITY ISSUES WITH NEOBUX 2+
// KWAH - 01062009
function cleanData(inputString) {
  // GM_log('inputString = '+inputString);
  
  var str = inputString;
  
  str = str.replace('&nbsp;',''); // remove &nbsp; chars
  str = str.replace(/\[0-9]+\]/,''); // remove the [ ] stuff // not needed after the /<font.*<\/font>/ check was added
  str = str.replace(/\([0-9]+\)/,''); // remove the ( ) stuff // nor is this... left behind for completeness though
  str = str.replace(/<font.*<\/font>/,''); // remove the ( ) stuff
  str = str.replace(/^\s+|\s+$/g,''); // remove leading & trailing white space

  // GM_log('str = '+str);
  
  return str;
}


/* --------------------------------------
------ CREATE MENU OPTION SETTINGS ------
-------------------------------------- */
// TODO: Make it easier to edit these options -- all on one form or something as opposed to each having its own dialog box
function CreateMenuOptions() {

  GM_registerMenuCommand('NeoBuxAVG: Threshold - Bad AVG Clicks', s_avgThreshold);
  GM_registerMenuCommand('NeoBuxAVG: Threshold - Good AVG Clicks', s_avggoodThreshold);
  GM_registerMenuCommand('NeoBuxAVG: Threshold - DAYS before highlighing inactive refs', s_inactiveThreshold);
  GM_registerMenuCommand('NeoBuxAVG: Threshold - DAYS before highlighing zeroclickers', s_zeroThreshold);
  GM_registerMenuCommand('NeoBuxAVG: Threshold - Minimum age of refs before highlighing', s_minDays);
  GM_registerMenuCommand('NeoBuxAVG: Feature - Auto. highlight bad refs', s_automark);
  GM_registerMenuCommand('NeoBuxAVG: Feature - Auto. highlight inactive refs', s_automarkinactive);
  GM_registerMenuCommand('NeoBuxAVG: Feature - Auto. highlight good refs', s_hlgood);
  GM_registerMenuCommand('NeoBuxAVG: Feature - Change color scheme', s_colorscheme);

  function s_avgThreshold() {
  	var tmp = prompt("Enter bad avg clicks threshold level:", avgThreshold);
    	if(tmp) GM_setValue('avgThreshold', tmp);
  }

  function s_avggoodThreshold() {
  	var tmp = prompt("Enter good avg clicks threshold level:", avggoodThreshold);
    	if(tmp) GM_setValue('avggoodThreshold', tmp);
  }

  function s_inactiveThreshold() {
  	var tmp = prompt("Days before considering a ref inactive", inactiveThreshold);
    	if(tmp) GM_setValue('inactiveThreshold', tmp);
  }

  function s_zeroThreshold() {
  	var tmp = prompt("Days before recyling zero-clicker", zeroThreshold);
    	if(tmp) GM_setValue('zeroThreshold', tmp);
  }

  function s_minDays() {
  	var tmp = prompt("Minimum age of ref in days before highlighting", minDays);
    	if(tmp) GM_setValue('minDays', tmp);
  }

  function s_automark() {
  	var tmp = prompt("Automatically highlight bad refs? [1=true, 0=false]", automark);
    	if(tmp) GM_setValue('automark', tmp);
  }

  function s_automarkinactive() {
  	var tmp = prompt("Automatically mark/check/highlight inactive refs? [1=true, 0=false]", automarkinactive);
    	if(tmp) GM_setValue('automarkinactive', tmp);
  }

  function s_hlgood() {
  	var tmp = prompt("Automatically highlight good refs? [1=true, 0=false]", hlgood);
    	if(tmp) GM_setValue('hlgood', tmp);
  }

  function s_colorscheme() {
  	var tmp = prompt("Highlighting color for good refs [1=green, 0=blue]", good_colorscheme);
    	if(tmp) GM_setValue('good_colorscheme', tmp);
  }
}

/* --------------------------------------
--- XARGOON'S UPDATE CHECKER (LEGACY) ---
-------------------------------------- */
/*
function update_response(response) {
	if(response.status==200) {
		var parser = new DOMParser();
		var updatedoc = parser.parseFromString(response.responseText, "application/xml");
		var latest_revision = updatedoc.getElementsByTagName('neobuxavg')[0].getAttribute('currentupdate');
		var upd = updatedoc.getElementById(latest_revision);

		var upd_date = upd.getElementsByTagName('date')[0].firstChild.data;
		var upd_version = upd.getElementsByTagName('version')[0].firstChild.data;
		var upd_url = upd.getElementsByTagName('url')[0].firstChild.data;
		var upd_relnotes = upd.getElementsByTagName('releasenotes')[0].firstChild.data;
		var upd_changelog = upd.getElementsByTagName('changelog')[0].getElementsByTagName('entry');

		if(latest_revision > GM_getValue('latest_revision', 0)) GM_setValue('latest_revision', latest_revision);

		if(latest_revision > revision) {
			var tmp = "";
			for(var i=0; i<upd_changelog.length; i++) {
				tmp += (i+1) + ". " + upd_changelog[i].firstChild.data + "\n";
			}
			alert("NEW UPDATE AVAILABLE!\n\nDate: "+upd_date+"\n"+
				  "Version: "+upd_version + "\n"+
				  "Relnotes: "+upd_relnotes+ "\n\n"+
				  "Press OK to proceed!\n\n"+
				  "CHANGELOG:\n\n"+tmp);
			GM_openInTab(upd_url);
			alert("Please reload the page after you've updated.");
			GM_exit(0);
		}
   	   } else {
   	   		alert("Update check failed. Abort.");
   	   		GM_exit(0);
   	   }
}

function check_update() {
	GM_xmlhttpRequest({
	   method:"GET",
	   url:"http://leroen.no/nbavg-version.xml",
	   headers:{
	     "User-Agent":navigator.userAgent,
	     "Accept":"text/xml"
	   },
	   onload:function(response) { update_response(response); }
	});
}

if( ((Today.getTime() - last_update_check) / MSPD >= 1)
|| latest_revision > revision ) {
  GM_setValue('last_update_check', Today.getTime().toString());
  check_update();
  GM_exit(0);
} */


/* --------------------------------------
------------ UPDATE CHECKER -------------
-------------------------------------- */
CheckScriptForUpdate={id:"50638",days:1,name:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],version:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g,""),time:new Date().getTime()|0,call:function(a){GM_xmlhttpRequest({method:"GET",url:"https://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(b){CheckScriptForUpdate.compare(b,a)}})},compare:function(b,a){this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(b.responseText);this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(b.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1].replace(/\./g,"");this.xname=this.xname[1]}else{if((b.responseText.match("Uh-oh! The page could not be found!"))||(this.xname[1]!=this.name)){GM_setValue("updated","off")}return false}if((this.xversion>this.version)&&(confirm("A new version of the "+this.xname+" user script is available. Do you want to update?"))){GM_setValue("updated",this.time);GM_openInTab("http://userscripts.org/scripts/source/"+this.id+".user.js")}else{if((this.xversion)&&(this.xversion>this.version)){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated","off");GM_registerMenuCommand("Auto Update "+this.name,function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call("return")});alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}else{GM_setValue("updated",this.time)}}else{if(a){alert("No updates available for "+this.name)}GM_setValue("updated",this.time)}}},check:function(){if(GM_getValue("updated",0)==0){GM_setValue("updated",this.time)}if((GM_getValue("updated",0)!="off")&&(+this.time>(+GM_getValue("updated",0)+(1000*60*60*24*this.days)))){this.call()}else{if(GM_getValue("updated",0)=="off"){GM_registerMenuCommand("Enable "+this.name+" updates",function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call(true)})}else{GM_registerMenuCommand("Check "+this.name+" for updates",function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call(true)})}}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!="undefined"){CheckScriptForUpdate.check()};