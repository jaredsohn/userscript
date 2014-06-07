// ==UserScript==
// @name		Little Island Client
// @version	0.09.03.04
// @description	Accesse Little Island comments for web content. v0.09.03.04
// @license	Little Island Client Copyright (c) David O'Farrell 2009; Released under GPLv3; http://littleisland.ruinsofmorning.net/license.html
// @namespace	http://littleisland.ruinsofmorning.net/
// @include	*
// ==/UserScript==

/*	
	Little Island Client v0.09.03.04

	Copyright (c) David O'Farrell 2009

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// If you're considering writing your own Little Island Client then it is strongly recommended that you start with the LI API:
// http://littleisland.ruinsofmorning.net/api.html
// This example has grown alongside development of the back-end, and as such contains some eccentricities and inconsistencies 
// due to its rapid evolution. As such it is not a good starting point. Use the API description and start from scratch, then use this 
// script for pointers.

// GREASEMONKEY NOTE: subtract 347 from the greasemonkey.js error line number //

// CONFIG //
$LIcfg = new Object;
$LIcfg.version = '0.09.03.04';
$LIcfg.server = 'http://littleisland.ruinsofmorning.net/cgi-bin/';
//$LIcfg.server = 'http://localhost:8080/cgi-bin/';
$LIcfg.reader = 'read.pl';
$LIcfg.writer = 'littleisland.pl';
$LIcfg.sendheaders = {
	"Content-Type":"text/plain; charset=UTF-8",
	"Accept":"text/xml; charset=UTF-8"
};
$LIcfg.fadeSteps = 20;
$LIcfg.panelHeight = 300;
$LIcfg.minPanelHeight = 18;
$LIcfg.tempHeight = 200;
$LIcfg.statusLog = 15;

$LIcfg.debug = false;	// Show debugging info //
$LIcfg.ownall = false;	// Show edit and delete links for all comments //

// Report AJAX status messages //
$LIcfg.reportAJAX = false;

// Little Island object //
$LI = new Object;

// LI Panel //
$LI.mainPanel = false;

// Utility Functions //
d = document;
loc = d.location;
$LI.parentDocument = document;
window.name = (window.name) ? window.name : 'LIparentWindow'; // Default parent window name for targeting comment links //
$LI.windowName = window.name;
var undefined;
var undef;

// Array shortcut functions //
// return array of array keys //
$LI.arrayKeys = function (a) {
	var k = [];
	for (i in a) {k.push(i);}
	return k;
}
// Numeric sort (Array, reverse) //
$LI.arraySortNum = function (ar,r) {
	if (r == true) {
		var ars = ar.sort(function(a,b){return a-b;});
	} else {
		var ars = ar.sort(function(a,b){return b-a;});
	}
	return $LI.arrayFilter(ars);
}
// Remove indexes with undefined values //
$LI.arrayFilter = function (a) {
	b = [];
	while (a.length) {
		var c = a.shift();
		if (typeof(c) != 'undefined') b.push(c);
	}
	return b;
}
// Get the value after the first instance of the given value or undefined //
$LI.arrayNextValue = function (v,a) {
	var found = false;
	var next;
	for (i in a) {
		if (found) return a[i];
		if (a[i] == v) found = true;
	}
	return next;
}
// Get the value before the first instance of the given value or undefined //
$LI.arrayPrevValue = function (v,a) {
	var last;
	for (i in a) {
		if (a[i] == v) return last;
		last = a[i];
	}
	return last;
}

// Make HTML element nodes //
$LI.waiter = new Array();
$LI.makeLastParent = false;
$LI.make = function (tag,id,pa,cont) {
	var el = document.createElement(tag);
	// Attributes //
	if (typeof(id) == 'string') {
		el.setAttribute('id', id);
	} else if (typeof(id) == 'object') {
		for (k in id) {el.setAttribute(k,id[k]);}
	}
	// Append to parent //
	if (typeof(pa) == 'string') {
		// Prepare for appeneding at a later point //
		el.waitParent = pa;
		$LI.waiter.push(el);
	} else if (typeof(pa) == 'object') {
		// Append now //
		pa.appendChild(el);
		$LI.makeLastParent = pa;
	} else if (pa === false) {
		// Don't append //
	} else if (typeof($LI.makeLastParent) == 'object') {
		// Append now to previous parent //
		$LI.makeLastParent.appendChild(el);
	}
	// Content //
	if (cont) {el.innerHTML = cont;}
	return el;
}

// Make HTML text nodes //
$LI.makeText = function (t,p) {
	var tn = document.createTextNode(t);
	if (p) {p.appendChild(tn);}
	else if (p === false) {}
	else if ($LI.makeLastParent) {$LI.makeLastParent.appendChild(tn);}
	return tn;
}


// Time conversion functions //
$LI.timeFromDatestamp = function (ds) {
	var o = new Object();
	ds = (ds) ? ds : '0000-00-00 00:00:00';
	var r = ds.match(/(....)-(..)-(..) (..):(..):(..)/);
	o.dateobj = new Date(r[1],r[2]-1,r[3],r[4],r[5],r[6]);
	o.utcstr = o.dateobj.toUTCString();
	o.localstr = o.dateobj.toLocaleString();
	o.utc = o.dateobj.valueOf();
	return o;
}

// Add multiple attributes to HTML elements //
$LI.attr = function (o,a) {for (k in a) {o.setAttribute(k,a[k]);}}

// Data storage accross page views //
$LI.setData = function(k,v) {return GM_setValue(k,v);}
$LI.getData = function(k,d) {return GM_getValue(k,d);}


// Create UI elements //
function buildUI(){

							////// START OF buildUI ///// Ends approx line 1210 //////
							// This simply prevents the very complex UI from being //
							// inserted into every page unnecessarily //
							
// Parent document CSS //
var licss = d.createElement('style');
d.getElementsByTagName('head')[0].appendChild(licss);
var lpc = '';
lpc += "#LImainpanel {position: fixed; display: none; bottom: 0px; left: -1px; width: 100%; height: 300px; margin: 0px; "
	+"background-color: #ccf; color: black; -moz-border-radius-topleft: 10px; "
	+"-moz-border-radius-topright: 10px; border: solid 1px black; border-bottom: none; display: none;}";
lpc += '#liresizelayer {display: none; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; cursor: n-resize;}';
lpc += '#lidebug {display: none; position: absolute; top: 0px; left: 0px; width: 100%; height: 45%;}';
lpc += '#lidebugout, #lidebugin {display: block; position: absolute; top: 0px; width: 49%; height: 100%; padding: 3px; background-color: white; overflow: auto;}';
lpc += '#lidebugout {left: 0px; border: solid 1px red;}';
lpc += '#lidebugin {right: 0px; border: solid 1px green;}';
licss.innerHTML = lpc;

// LI main panel document style //
$LI.panelStyle = $LI.make('style', false, '$LI.mainPanel.contentDocument.body');
pshtml = '';
pshtml += 'HTML>BODY, BODY {font-family: Verdana,Ariel,sans-serif; font-size: 12px; color: black; padding: 0px; margin: 0px;}';

pshtml += '#mainheader {z-index: 1; position: fixed; top: 0px; left: 0px; width: 100%; height: 18px; overflow: hidden; border-bottom: solid 1px #999;}';
pshtml += '#maindisplay {display: block; position: fixed; width: 99.5%; height: 278px; padding: 3px; margin-top: 18px; overflow: auto; background-color: white;}';
pshtml += '#mainfooter {display: none; position: fixed; bottom: 0px; left: 0px; width: 100%; height: 22px; border-top: solid 1px #999;}';
pshtml += '#status {display: block; overflow: hidden; position: relative; top: 0px; left: 0px; height: 18px; padding: 2px 40px; text-align: center; font-size: 12px;}';
pshtml += '#statuspopup {display: none; z-index: 1; position: relative; top: 0px; left: 0px; width: 70%; margin: auto; padding: 2px; text-align: center; font-size: 12px; background-color: #ccf; border: solid 1px #999; border-top: none;}';
pshtml += '#closer, #resizer, #menu, #logstat {display: block; position: absolute; top: 0px; right: 10px; width: 60px; height: 18px; border-left: solid 1px #999; text-align: center; font-size: 12px; padding-top: 2px;}';
pshtml += '#menu {left: 10px; width: 50px; background-color: #ccf; border-right: solid 1px #999; font-weight: bold;}';
pshtml += '#closer {border-right: solid 1px #999;}';
pshtml += '#logstat {white-space: nowrap; overflow: hidden; left: 60px; width: 100px; padding-left: 2px; padding-right: 2px; border-right: solid 1px #999; font-weight: normal;}';
pshtml += '#logstat:hover {width: 220px; overflow: show;}';
pshtml += '#resizer {top: 0px; right: 70px;}';
pshtml += '#closer:hover, #resizer:hover {background-color: black; color: white;}';

pshtml += '#mainmenu {display: none; position: absolute; top: 18px; left: 0px; width: 104px; border: solid 1px #999; border-bottom: none; background-color: white;}';
pshtml += '#mainmenu DIV.menuitem {display: block; width: 100px; padding: 2px; text-align: left; border-bottom: solid 1px #999; background-color: white;}';
pshtml += '#mainmenu DIV.menuitem:hover {background-color: black; color: white;}';
pshtml += '#mainmenu DIV.menuitem:active {background-color: #ccf; color: black;}';

// Login Box //
pshtml += '#loginbox, #confbox {display: none; position: absolute; top: 25px; left: 10px; padding: 4px; width: 302px; background-color: #aaf; border: solid 1px #99f; text-align: center;}';
pshtml += '#loginhead, #confhead {font-style: italic; font-weight: normal; font-size: 10px; margin: 0px; padding: 4px;}';
pshtml += '#loginbox SPAN {display: block; float: left; padding: 3px; width: 65px;}';
pshtml += '#loginbox INPUT {}';

// Comment box CSS //
pshtml += 'DIV.commentbox {background-color: white; color: black; border-left: solid 1px #eee; min-width: 80%;}';
pshtml += 'DIV.commentbox:hover {border-left: solid 1px #ddf;}';
pshtml += 'DIV.commentbox:active {border-left: solid 1px #ccf;}';
pshtml += 'DIV.commenthead, DIV.commentheadun {padding: 4px; background-color: #ccf;}';
pshtml += 'DIV.commentheadun {background-color: #eef;}';
pshtml += 'DIV.commenthead P, DIV.commentheadun P, P.commenttitle {margin: 0px; margin-bottom: 2px;}';
pshtml += 'P.commenttitle {margin: 0px; font-size: 14px; font-weight: bold;}';
pshtml += 'A.commentuser {font-weight: bold; color: #33c;}';
pshtml += 'A.commentuser SPAN.unicode, A.commentuser SPAN.unicodename {color: #828;}';
pshtml += 'A.commentuser SPAN.unicodename:hover {color: white;}';
pshtml += 'A.commentuser SPAN.unicodename:hover>SPAN {color: red;}';
pshtml += 'A.commentuser:hover {color: white; cursor: pointer;}';
pshtml += 'A.commentedate {color: red; font-size: 75%; font-style: italic;}';
pshtml += 'DIV.commentbody {overflow: hidden; padding: 4px; background-color: white; border-bottom: solid 1px #ccf;}';
pshtml += 'DIV.commentbody A.abrvlink {display: block; text-align: center; font-size: 100%; font-style: italic; color: #00c;}';
pshtml += 'DIV.commentbody A.abrvlink:hover {color: #ccf;}';
pshtml += 'DIV.commentfoot {display: block; height: 18px; margin-bottom: 5px; background-color: white;}';
pshtml += 'DIV.commentfoot A {display: block; float: left; padding: 2px 10px; color: #00c; font-size: 10px;}';
pshtml += 'DIV.commentfoot A:hover {background-color: #ccf; color: black;}';
pshtml += 'DIV.commentfoot A.broken {display: none; color: red;}';
pshtml += 'DIV.commentfoot A.hiddenlink {color: red;}';
pshtml += 'DIV.childbox {padding-left: 15px;}';

// Profile box //
pshtml += '#profilebox {display: none; position: absolute; top: 20px; left: 20px; margin: 2px; padding: 2px; width: 602px; overflow: hidden; background-color: #ddf; border: solid 1px #99f;}';
pshtml += '#profilehead {font-style: italic; font-weight: normal; font-size: 10px; margin: 0px; padding: 4px;}';
pshtml += 'P.profiledata {margin: 2px; padding-left: 100px; font-weight: normal;}';
pshtml += 'P.profiledata SPAN {font-weight: normal; font-size: 8px;}';
pshtml += '#profilename, #profileuuid, #profileregister, #profileaccess {font-weight: bold; font-size: 12px; margin: 0px; padding: 4px;}';
pshtml += '#profilefullname, #profilebio {display: block; width: 594px; overflow: hidden; margin-bottom: 2px; padding: 4px; background: white;}';
pshtml += '#profilefullname {font-size: 12px; font-weight: bold; text-align: center;}';
pshtml += '#profilecloselink {position: absolute; width: 50px; top: 0px; right: 0px; padding-left: 4px; padding-bottom: 1px;}';
pshtml += '#profilecloselink:hover {background-color: black; color: white;}';

// Comment & Profile composition box CSS //
pshtml += '#newrootlink, #getmorelink, #profileeditlink {display: block; text-align: center; padding: 2px; font-size: 12px; font-style: italic; color: #55f; cursor: pointer;}';
pshtml += '#getmorelink {display: none;}';
pshtml += '#newrootlink:hover, #getmorelink:hover {color: #ccf;}';
pshtml += '#compbox {display: none; margin: 2px; padding: 2px; width: 602px; overflow: hidden; background-color: #ccf;}';
pshtml += '#comphead, #testhead {font-style: italic; font-weight: normal; font-size: 10px; margin: 0px; padding: 4px;}';
pshtml += 'INPUT[type=text], INPUT[type=password], TEXTAREA {border: solid 2px #ddd; margin: 1px;}';
pshtml += '#comptitle, #compbody, #profilefullnameinput, #profilebioinput {width: 600px; font-size: 12px; font-family: verdana,arial,sans-serif;}';
pshtml += 'INPUT[type=text]:focus, INPUT[type=password]:focus, TEXTAREA:focus {border: solid 2px #aaa;}';
pshtml += '#compbox INPUT.compbut {font-size: 12px;}';

pshtml += '#testbox {display: none; margin: 2px; padding: 2px; background-color: #ccf;}';
pshtml += '#testtarget {background-color: white;}';

// Finish CSS //
$LI.panelStyle.innerHTML = pshtml;



// Debugging areas //
$LI.debug = $LI.make('div','lidebug',document.body);
$LI.debug.output = $LI.make('div','lidebugout',$LI.debug);
$LI.debug.input = $LI.make('div','lidebugin',$LI.debug);
$LI.debugout = function(data, din){
	data = data.replace(/&/g,'&amp;');
	data = data.replace(/</g,'&lt;');
	data = data.replace(/>/g,'&gt;');
	if (din) {
		$LI.debug.input.innerHTML = data;
	} else {
		$LI.debug.output.innerHTML = data;
	}
}
$LI.debugin = function(data){$LI.debugout(data, true);}

// Main Panel //
$LI.mainPanel = d.createElement('iframe');
$LI.mainPanel.setAttribute('id', 'LImainpanel');
d.body.appendChild($LI.mainPanel);

// Set user pref panel height //
$LI.mainPanel.style.height = $LI.getData('panelheight', $LIcfg.panelHeight) + 'px';

$LI.utfheader = $LI.make('meta',{content:'text/html; charset=UTF-8', 'http-equiv':'Content-Type'},'$LI.mainPanel.contentDocument.getElementsByTagName(\'head\')[0]');
$LI.mainHeader = $LI.make('div','mainheader','$LI.mainPanel.contentDocument.body');
$LI.mainDisplay = $LI.make('div','maindisplay','$LI.mainPanel.contentDocument.body');
$LI.mainFooter = $LI.make('div','mainfooter','$LI.mainPanel.contentDocument.body');

// Main display area //
$LI.mainDisplay.style.height = $LI.getData('panelheight', $LIcfg.panelHeight-($LIcfg.minPanelHeight+4)) + 'px';

// Header Components //
// Status bar //
$LI.panelStatus = $LI.make('div','status', $LI.mainHeader);
$LI.statusPopup = $LI.make('div','statuspopup','$LI.mainPanel.contentDocument.body');
$LI.panelStatus.addEventListener('click',function(e){$LI.statusPopup.style.display = 'block';},false);
$LI.statusPopup.addEventListener('mouseout',function(e){$LI.statusPopup.style.display = 'none';},false);


// Panel closer //
$LI.panelCloser = $LI.make('a', 'closer', $LI.mainHeader, 'Close');
$LI.panelCloser.addEventListener('click', function(){
	if ($LIcfg.debug) {$LI.debug.style.display = 'none';}	// Check for debugging //
	fadeOut($LI.mainPanel,0.5);								// Close panel //
}, false);


// Panel reziser button //
$LI.resizeStartPos = false;
$LI.panelResizer = $LI.make('a', 'resizer', $LI.mainHeader, 'Resize');
$LI.panelResizer.addEventListener('mousedown', function(e){
	// Ensure resize layer is at the top of the stacking order (which, itself, should be on top of everthing else) //
	$LI.panelResizeLayer.style.zIndex = $LI.mainPanel.style.zIndex+1;
	
	// Signal start position //
	$LI.resizeStartPos = true;
	
	// Summon resize layer to track mouse //
	$LI.panelResizeLayer.style.display = 'block';
	
}, false);
// Resize layer //
$LI.panelResizeLayer = $LI.make('div', 'liresizelayer', document.body);
$LI.panelResizeLayer.addEventListener('mousemove', function(e){
	
	// Get start position //
	if ($LI.resizeStartPos) {
		$LI.mouseSrartY = e.layerY;
		$LI.newHeight = $LI.panelHeight;
		$LI.resizeStartPos = false;
	}
	
	// Find difference //
	diffY = $LI.mouseSrartY-e.layerY;
	
	// Update panel size //
	var newH = $LI.panelHeight+diffY;
	if (newH > $LIcfg.minPanelHeight && newH < window.innerHeight) {
		$LI.mainPanel.style.height = newH+'px';
		$LI.mainDisplay.style.height = (newH-($LIcfg.minPanelHeight+4))+'px';
		$LI.newHeight = newH;
	}
}, false);
// Complete Resize //
$LI.panelResizeLayer.addEventListener('mouseup', function(e){
	// Banish resize layer //
	$LI.panelResizeLayer.style.display = 'none';
	$LI.panelHeight = $LI.newHeight;
	$LI.setData('panelheight', $LI.newHeight);
	$LI.resizeStartPos = true;
}, false);


// Main Menu //
$LI.panelMenu = $LI.make('a', {id:'menu', title:'Little Island Client version '+$LIcfg.version}, $LI.mainHeader, 'Menu');
$LI.panelMenu.addEventListener('mouseover', function(){
	// Open menu //
	$LI.mainmenu.style.display = 'block';
}, false);
$LI.mainmenu = $LI.make('div', 'mainmenu', '$LI.mainPanel.contentDocument.body');
$LI.mainmenu.addEventListener('mouseover', function(e){
	// Keep menu open //
	$LI.mainmenu.style.display = 'block';
}, false);
$LI.mainmenu.addEventListener('mouseout', function(e){
	// Close menu //
	$LI.mainmenu.style.display = 'none';
}, false);

// Login menu item //
$LI.mainmenu.login = $LI.make('div', {id:'menulogin', 'class':'menuitem', 'title':'Log in to the Little Island server to make, edit or delete comments.'}, $LI.mainmenu, 'Login...');
$LI.mainmenu.login.addEventListener('mouseup', function(e){
	// Open login panel //
	$LI.loginbox.style.display = 'block';
	$LI.mainmenu.style.display = 'none';
}, false)

// Log out menu item //
$LI.mainmenu.logout = $LI.make('div', {id:'menulogout', 'class':'menuitem', 'title':"Log out from the Little Island server."}, $LI.mainmenu, 'Log Out');
$LI.mainmenu.logout.addEventListener('mouseup', function(e){
	$LI.logout();
	$LI.mainmenu.style.display = 'none';
}, false)

// Renew Login menu item //
$LI.mainmenu.renew = $LI.make('div', {id:'menurenew', 'class':'menuitem', 'title':"Get a new token from the Little Island server. You may need this if there was an error during posting and you find you are unable to make changes afterward."}, $LI.mainmenu, 'Renew Login');
$LI.mainmenu.renew.addEventListener('click', function(){
	if ($LI.getData('loginid', false)) {} else {
		$LI.report('Not logged in!');
		return;
	}

	var req = 'action=token';
	req += '&uuid=' + $LI.getData('uuid');
	req += '&loginid=' + $LI.getData('loginid');
	$LI.writeRequest(req,function(details){
		xml = details.responseText;
		
		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}

		
		// Pick up new token //
		$LI.setData('token', $LI.getFirstElement('token', xml));
		
		$LI.report('Login renewed: new token received.');
	}, 'Requesting new token...');
},false);

// Refresh comments menu item //
$LI.mainmenu.refresh = $LI.make('div', {id:'menurefresh', 'class':'menuitem', 'title':"Check the Little Island server for any new comments or changes."}, $LI.mainmenu, 'Refresh');
$LI.mainmenu.refresh.addEventListener('click', function(e){
	// Is this the first time for this page? //
	if ($LI.thisNode.unid) {} else {
		$LI.getNode();
		return;
	}

	// Forced refresh//
	if (e.ctrlKey) {
		// Download first cache page //
		$LI.report('Forced Refresh!');
		$LI.getCachePage(1);
		return;
	}
	
	// Test node for updates //
	var req = 'action=node';
	req += '&unid=' + $LI.thisNode.unid;
	$LI.readRequest(req, function(details){
		xml = details.responseText;
		
		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.reportStatus(error);
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.reportStatus(message);
		}
		
		// Compare cache times //
		var checknode = $LI.nodeParse(xml);
		if (checknode.lastcache != $LI.thisNode.lastcache) {
			$LI.getCachePage(1);								// Download first cache page //
			$LI.thisNode.lastcache = checknode.lastcache;		// Update node details //
			$LI.report('Comments updated!');
		} else {
			$LI.report('No new comments');
		}
	}, 'Checking for comment updates...');
}, false);


// Login status indicator //
$LI.logstat = $LI.make('a', 'logstat', $LI.mainHeader);


// Login Box //
$LI.loginbox = $LI.make('div', 'loginbox', '$LI.mainPanel.contentDocument.body');
$LI.make('h2', 'loginhead', $LI.loginbox, 'Login to Little Island server');
$LI.make('span', false, undefined, 'Username');
$LI.loginbox.username = $LI.make('input', {id:'username', type:'text', size:32});
$LI.make('span', false, undefined, 'Password');
$LI.loginbox.password = $LI.make('input', {id:'password', type:'password', size:32});
var cpp = $LI.make('input', {id:'logincancel', type:'submit', value:'Cancel', 'class':'loginbut'});
cpp.addEventListener('mouseup', function(){$LI.loginbox.style.display = 'none';}, false);
var loginsubmit = $LI.make('input', {id:'loginsubmit', type:'submit', value:'Login', 'class':'loginbut'});
loginsubmit.addEventListener('mouseup', function(){$LI.login();}, false);


// Confirm Box //
$LI.confbox = $LI.make('div', 'confbox', '$LI.mainPanel.contentDocument.body');
$LI.confbox.conftitle = $LI.make('h2', 'confhead', $LI.confbox, 'Confirm');
$LI.confbox.message = $LI.make('div', 'confbody');
$LI.confbox.cancel = $LI.make('input', {id:'confirmcancel', type:'submit', value:'Cancel', 'class':'confirmbut'});
$LI.confbox.cancel.addEventListener('mouseup', function(){
	// Remove listener from OK button (canceling whatever operation was waiting there) //
	$LI.confbox.ok.removeEventListener('mouseup', null, false);
	// Close confirmation box //
	$LI.confbox.style.display = 'none';
}, false);
$LI.confbox.ok = $LI.make('input', {id:'confirmsubmit', type:'submit', value:'OK', 'class':'confimbut'});
$LI.confbox.ok.addEventListener('mouseup', function(){}, false);

// Set confirm box details and action //
$LI.confbox.lastfunc = false;
$LI.setConfirm = function (title,message,func,data) {
	$LI.confbox.conftitle.innerHTML = title;					// Box title //
	$LI.confbox.message.innerHTML = message;					// Main message //
	// Remove preexisting event handler //
	if ($LI.confbox.lastfunc) $LI.confbox.ok.removeEventListener('mouseup', $LI.confbox.lastfunc, false);
	$LI.confbox.ok.addEventListener('mouseup', func, false);	// Set new event handler //
	$LI.confbox.lastfunc = func;
	$LI.confbox.data = (data) ? data : false;					// Store item of data for use by event function //
	$LI.confbox.style.display = 'block';						// Display box //
}
$LI.unsetConfirm = function () {
	$LI.confbox.data = false;
	$LI.confbox.ok.removeEventListener('mouseup', null, false);
	if ($LI.confbox.style.display == 'block') {$LI.confbox.style.display = 'none';}	
}

// Comment composition box //
$LI.newcommentparent = 0;
var newroot = $LI.make('a', {id:'newrootlink', title:'Compose a new comment in a new thread'}, $LI.mainDisplay, 'Compose New Comment');
newroot.addEventListener('mouseup', function(){
	// Make sure last comment submission has completed //
	if ($LI.editlock) return;

	// if this is cancelled edit then return the original comment //
	if ($LI.editcomment) {
		$LI.comments[$LI.editcomment].showMe();
		$LI.editcomment = false;
	}
	
	// Set parent for new root comment //
	$LI.newcommentparent = 0;
	
	// Update composition box heading //
	$LI.compbox.heading.innerHTML = 'New Comment';
	
	// Reposition composition box to top of display //
	$LI.newroottarget.appendChild($LI.compbox);
	
	// Make sure the comment test box is closed //
	$LI.testbox.style.display = 'none';
	
	// Open composition box //
	$LI.compbox.style.display = 'block';
	
}, false);

$LI.newroottarget = $LI.make('div', 'newroottarget', $LI.mainDisplay);
$LI.compbox = $LI.make('div', 'compbox', $LI.mainDisplay);
$LI.compbox.heading = $LI.make('h2', 'comphead', $LI.compbox, 'New Comment');
$LI.compbox.comptitle = $LI.make('input', {id:'comptitle', type:'text', size:255});
$LI.compbox.compbody = $LI.make('textarea', {id:'compbody', cols:100, rows:10});
cpb = $LI.make('div', 'compbutbar');

cpc = $LI.make('input', {id:'compcancel','class':'compbut', type:'submit', value:'Cancel'}, cpb);
cpc.addEventListener('mouseup', function(){
	
	// Close composition box //
	$LI.compbox.style.display = 'none';
	
	// if this is cancelled edit then return the original comment //
	if ($LI.editcomment) {
		$LI.compbox.parentNode.removeChild($LI.compbox);
		$LI.comments[$LI.editcomment].showMe();
		$LI.editcomment = false;
	}
	
}, false);

// Test Comment //
var cpe = $LI.make('input', {id:'comptest', 'class':'compbut', type:'submit', value:'Test'}, cpb);
cpe.addEventListener('mouseup', function(){
	// Move the test box //
	$LI.compbox.parentNode.insertBefore($LI.testbox, $LI.compbox);

	// Prepare user name, login id and password/token hash //
	var uuid = $LI.getData('uuid');
	var username = $LI.safeChars($LI.getData('username'));
	var loginid = $LI.getData('loginid');
	var pass = $LI.getData('passwordhash');
	var token = $LI.getData('token');
	var hash = $LI.md5(pass + token);
	
	// Check Login //
	if (username.length == 0) {
		$LI.report('Not Logged In!');
		return;
	}
	
	// Prepare data //
	var title = $LI.safeChars($LI.compbox.comptitle.value);
	var compbody = $LI.safeChars($LI.compbox.compbody.value);
	
	// Prepare and send request //
	var req = 'action=test';
	req += '&uuid=' + uuid;
	req += '&name=' + username;
	req += '&hash=' + hash;
	req += '&loginid=' + loginid;
	req += '&title=' + title;
	req += '&body=' + compbody;
	$LI.writeRequest(req, function(details){
		xml = details.responseText;
		
		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Pick up new token //
		$LI.setData('token', $LI.getFirstElement('token', xml));
		
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.reportStatus(error);
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.reportStatus(message);
		} else {
			$LI.reportStatus('Test comment received from server.');
		}
		
		// Add users name to data before craeting comment //
		xml += '<name>' + $LI.XMLChars($LI.getData('username')) + '</name>';
		
		// Get tested data //
		var testcom = new $LI.Comment(xml);
		testcom.buildHTML();
		
		// Update test box //
		$LI.testbox.testtarget.innerHTML = '';
		$LI.testbox.testtarget.appendChild(testcom.box);
		
		// Close composition box //
		$LI.compbox.style.display = 'none';
		
		// Open test box //
		$LI.testbox.style.display = 'block';
	}, 'Submitting test comment...');
	
}, false);

// Comment submit function for post buttons on composition and test boxes //
$LI.editlock = false;
$LI.compSubmit = function (e) {
	// Prevent user from trying to edit another comment before current edit has been accepted //
	if ($LI.editlock) return;
	$LI.editlock = true;
	
	// Prepare user name, login id and password/token hash //
	var uuid = $LI.getData('uuid');
	var username = $LI.safeChars($LI.getData('username'));
	var loginid = $LI.getData('loginid');
	var pass = $LI.getData('passwordhash');
	var token = $LI.getData('token');
	var hash = $LI.md5(pass + token);
	
	// Check Login //
	if (username.length == 0) {
		$LI.report('Not Logged In!');
		return;
	}
	
	// Prepare new comment data //
	var url = $LI.safeChars(String(document.location));
	var title = $LI.safeChars($LI.compbox.comptitle.value);
	var compbody = $LI.safeChars($LI.compbox.compbody.value);
	var parent = $LI.newcommentparent;

	// Compose request //
	var req = '';
	var message = (parent) ? 'Submitting new reply...' : 'Submitting new post...';
	if ($LI.editcomment) {
		// Alter request for comment editing //
		req += 'action=edit';
		req += '&ucid=' + $LI.editcomment;
		message = 'Submitting comment edit...'
	} else {
		// Alter request for new comment //
		req += 'action=post';
	}
	req += ($LI.thisNode.unid) ? '&unid=' + $LI.thisNode.unid : '&url=' + url; // Unid for exsting node, url for new (or existing) //
	req += '&uuid=' + uuid;
	req += '&name=' + username;
	req += '&hash=' + hash;
	req += '&loginid=' + loginid;
	req += '&title=' + title;
	req += '&body=' + compbody;
	req += '&parent=' + parent;
	
	// Perform request //
	$LI.writeRequest(req, function (details) {
		xml = details.responseText;
		
		// Allow other edits //
		$LI.editlock = false;
		
		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Pick up new token //
		$LI.setData('token', $LI.getFirstElement('token', xml));
		
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.reportStatus(error);
			return;
		}
		if ($LI.getFirstElement('ucid', xml).length < 1) {
			$LI.report('The server responded in an unexpected manner. You may need to renew your login.');
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.reportStatus(message);
		} else {
			$LI.reportStatus('New comment accepted.');
		}
		
		// Close composition and test boxes //
		$LI.compbox.style.display = 'none';
		$LI.testbox.style.display = 'none';
		
		// Create/update comment from data //
		$LI.commentParse(xml,true);
		
		// Update display //
		$LI.displayComments();
		
		// Report //
		var stat = ($LI.editcomment) ? 'Comment edited successfully!' : 'New comment posted successfully!';
		$LI.reportStatus(stat);
		
		// Finish //
		var ucid = $LI.getFirstElement('ucid', xml);
		$LI.comments[ucid].showMe();
		$LI.commentFocus(ucid);
		$LI.editcomment = false;
		$LI.compbox.comptitle.value = '';
		$LI.compbox.compbody.value = '';
	}, message);
}

cpp = $LI.make('input', {id:'compsubmit', 'class':'compbut', type:'submit', value:'Post'}, cpb);
cpp.addEventListener('mouseup', $LI.compSubmit, false);


$LI.testbox = $LI.make('div', 'testbox', $LI.mainDisplay);
cpth = $LI.make('h2', 'testhead', $LI.testbox, 'Test Post');
$LI.testbox.testtarget = $LI.make('div', 'testtarget', $LI.testbox);
cpb = $LI.make('div', 'testbutbar', $LI.testbox);

cpc = $LI.make('input', {id:'testcancel', 'class':'compbut', type:'submit', value:'Cancel'}, cpb);
cpc.addEventListener('mouseup', function(){
	// Close test box //
	$LI.testbox.style.display = 'none';
	
	// if this is cancelled edit then return the original comment //
	if ($LI.editcomment) {
		$LI.compbox.parentNode.removeChild($LI.compbox);
		$LI.comments[$LI.editcomment].showMe();
		$LI.editcomment = false;
	}
}, false);

cpe = $LI.make('input', {id:'testedit' ,'class':'compbut', type:'submit', value:'Edit'}, cpb);
cpe.addEventListener('mouseup', function(){
	// Close test box //
	$LI.testbox.style.display = 'none';
	// Open composition box //
	$LI.compbox.style.display = 'block';
}, false);

cpp = $LI.make('input', {id:'testsubmit', 'class':'compbut', type:'submit', value:'Post'}, cpb);
cpp.addEventListener('mouseup', $LI.compSubmit, false);


// Get More Comments link //
$LI.nextCachePageLink = $LI.make('a', 'getmorelink', $LI.mainDisplay, 'Get More Comments');
$LI.nextCachePageLink.addEventListener('click', function(){$LI.getCachePage();}, false);


// User profile box //
$LI.profilebox = $LI.make('div', 'profilebox', $LI.mainDisplay);
$LI.profilebox.displaybox = $LI.make('div', 'profiledisplaybox', $LI.profilebox);
$LI.profilebox.editbox = $LI.make('div', 'profileeditbox', $LI.profilebox);
// Profile display area //
$LI.profilebox.displaybox.heading = $LI.make('h2', 'profilehead', $LI.profilebox.displaybox, 'User Profile');
// User name //
var propar = $LI.make('p', {'class':'profiledata'}, $LI.profilebox.displaybox);
var prospan = $LI.make('span', {'class':'profilelabel'}, propar, 'Name:');
$LI.profilebox.displaybox.username = $LI.make('a', 'profilename');
// UUID //
propar = $LI.make('p', {'class':'profiledata'}, $LI.profilebox.displaybox);
prospan = $LI.make('span', {'class':'profilelabel'}, propar, 'UUID:');
$LI.profilebox.displaybox.uuid = $LI.make('a', 'profileuuid');
// Registration date //
propar = $LI.make('p', {'class':'profiledata'}, $LI.profilebox.displaybox);
prospan = $LI.make('span', {'class':'profilelabel'}, propar, 'Registered:');
$LI.profilebox.displaybox.registered = $LI.make('a', 'profileregister');
// Last accessed date //
propar = $LI.make('p', {'class':'profiledata'}, $LI.profilebox.displaybox);
prospan = $LI.make('span', {'class':'profilelabel'}, propar, 'Last Accessed:');
$LI.profilebox.displaybox.accessed = $LI.make('a', 'profileaccess');
// User defined profile //
$LI.profilebox.displaybox.fullname = $LI.make('div', 'profilefullname', $LI.profilebox.displaybox);
$LI.profilebox.displaybox.bio = $LI.make('div', 'profilebio');
// Edit and close links //
$LI.profilebox.displaybox.editlink = $LI.make('a', 'profileeditlink', undefined, 'Edit your profile...');
$LI.profilebox.displaybox.editlink.style.display = 'none';
$LI.profilebox.displaybox.closelink = $LI.make('a', 'profilecloselink', undefined, 'Close X');

// Profile edit area //
$LI.profilebox.editbox.heading = $LI.make('h2', 'profilehead', $LI.profilebox.editbox, 'Edit Your Profile');
$LI.profilebox.editbox.fullname = $LI.make('input', {id:'profilefullnameinput', name:'fullname', type:'text', size:255});
$LI.profilebox.editbox.bio = $LI.make('textarea', {id:'profilebioinput', name:'bio', cols:100, rows:10});
// Edit buttons //
var editbutbar = $LI.make('div', 'editbuttons');
$LI.profilebox.editbox.testbutton = $LI.make('input', {id:'editprofiletest', name:'editprofiletest', type:'submit', value:'Test'}, editbutbar);
$LI.profilebox.editbox.cancelbutton = $LI.make('input', {id:'editprofilecancel', name:'editprofilecancel', type:'submit', value:'Cancel'});
$LI.profilebox.editbox.submitbutton = $LI.make('input', {id:'editprofilesubmit', name:'editprofilesubmit', type:'submit', value:'Submit'});
// Test buttons //
var testbutbar = $LI.profilebox.displaybox.testbuttonbar = $LI.make('div', 'testbuttons', $LI.profilebox.displaybox);
$LI.profilebox.displaybox.editbutton = $LI.make('input', {id:'testprofileedit', name:'testprofileedit', type:'submit', value:'Edit'}, testbutbar);
$LI.profilebox.displaybox.canceltestbutton = $LI.make('input', {id:'testprofilecancel', name:'testprofilecancel', type:'submit', value:'Cancel'});
$LI.profilebox.displaybox.submitbutton = $LI.make('input', {id:'testprofilesubmit', name:'testprofilesubmit', type:'submit', value:'Submit'});


// Request user profile //
$LI.currentProfile = new Object;
// Profile request click handler //
$LI.selectProfile = function(e) {
	var uuid = this.getAttribute('title').replace(/[^0-9]/g,'');
	
	// Hide profile box while changes are made //
	$LI.profilebox.style.display = 'none';
	
	// Position profile display //
	if (e.layerX > window.innerWidth - $LI.profilebox.displaybox.style.width) {
		$LI.profilebox.style.left = window.innerWidth - $LI.profilebox.displaybox.style.width;
	} else {
		$LI.profilebox.style.left = e.layerX;
	}
	$LI.profilebox.style.top = e.layerY;
	
	// Get profile data //
	$LI.getProfile(uuid);
}
$LI.getProfile = function(uuid,force) {
	if (!uuid) return;
	force=(force)?true:false;
	
	// Avoid multiple downloads of the same profile unless required //
	if (uuid == $LI.currentProfile.uuid && !force) {
		$LI.displayProfile();
		return;
	}
	
	// Request profile from server //
	var req = 'action=profile';
	req += '&uuid=' + uuid;
	$LI.readRequest(req, function(details){
		var xml = details.responseText;

		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}
		
		// Get details from xml //
		$LI.currentProfile.uuid = $LI.getFirstElement('uuid', xml);
		$LI.currentProfile.name = $LI.getFirstElement('name', xml);
		$LI.currentProfile.registered = $LI.getFirstElement('registered', xml);
		$LI.currentProfile.accessed = $LI.getFirstElement('accessed', xml);
		$LI.currentProfile.fullname = $LI.getFirstElement('fullname', xml);
		$LI.currentProfile.bio = $LI.getFirstElement('bio', xml);
		
		// Process bio HTML //
		// Newlines to HTML line-breaks //
		$LI.currentProfile.bioprocessed = $LI.currentProfile.bio.replace(/\n/g, '<br />');
		// Target anchor elements to parent window //
		$LI.currentProfile.bioprocessed = $LI.currentProfile.bioprocessed.replace(/<a href/g, '<a target="' + $LI.windowName + '" href');
		
		// Insert details into profile display //
		$LI.displayProfile();
		$LI.report('Received user profile');
	}, 'Fetching user profile...');
}
$LI.displayProfile = function (test){
	test=(test)?test:false;
	// Hide profile box while changes are made //
	$LI.profilebox.style.display = 'none';
	
	// Insert details into profile display //
	$LI.profilebox.displaybox.username.innerHTML = $LI.currentProfile.name;
	$LI.profilebox.displaybox.uuid.innerHTML = $LI.currentProfile.uuid;
	$LI.profilebox.displaybox.registered.innerHTML = $LI.currentProfile.registered;
	$LI.profilebox.displaybox.accessed.innerHTML = $LI.currentProfile.accessed;
	if (!test) {
		$LI.profilebox.displaybox.fullname.innerHTML = $LI.currentProfile.fullname;
		$LI.profilebox.displaybox.bio.innerHTML = $LI.currentProfile.bioprocessed;
	}
	
	// Ensure profile display area is prepped //
	$LI.profilebox.editbox.style.display = 'none';
	$LI.profilebox.displaybox.editlink.style.display = 'none';
	$LI.profilebox.displaybox.style.display = 'block';
	if (!test) $LI.profilebox.displaybox.testbuttonbar.style.display = 'none';
	
	// Check for owner //
	$LI.profilebox.displaybox.editlink.style.display = 'none';
	if ($LI.currentProfile.uuid == $LI.getData('uuid') && !test) {
		$LI.profilebox.displaybox.editlink.style.display = 'block';
	}
	
	// Display profile box //
	$LI.profilebox.style.display = 'block';
}
$LI.profilebox.displaybox.closelink.addEventListener('click',function(){
	// Hide and reset profile box //
	$LI.profilebox.style.display = 'none';
	$LI.profilebox.editbox.style.display = 'none';
	$LI.profilebox.displaybox.testbuttonbar.style.display = 'none';
	$LI.profilebox.displaybox.style.display = 'block';
},false);
$LI.profilebox.displaybox.editlink.addEventListener('click',function(){
	
	// Ensure profile edit area is prepped //
	$LI.profilebox.editbox.style.display = 'block';
	$LI.profilebox.displaybox.testbuttonbar.style.display = 'none';
	$LI.profilebox.displaybox.style.display = 'none';
	
	// Update inputs //
	$LI.profilebox.editbox.fullname.value = $LI.currentProfile.fullname;
	$LI.profilebox.editbox.bio.value = $LI.currentProfile.bio;
},false);
$LI.profilebox.editbox.cancelbutton.addEventListener('mouseup',function(){
	// Return to view of  //
	$LI.profilebox.editbox.style.display = 'none';
	$LI.profilebox.displaybox.testbuttonbar.style.display = 'none';
	$LI.profilebox.displaybox.style.display = 'block';
	
	$LI.displayProfile();
},false);

// Test User Profile //
$LI.profilebox.editbox.testbutton.addEventListener('mouseup',function(){
	
	// Requires uuid, login id and password/token hash //
	var uuid = $LI.getData('uuid');
	var username = $LI.safeChars($LI.getData('username'));
	var loginid = $LI.getData('loginid');
	var pass = $LI.getData('passwordhash');
	var token = $LI.getData('token');
	var hash = $LI.md5(pass + token);

	// Check Login //
	if (username.length == 0) {
		$LI.report('Not Logged In!');
		return;
	}
	
	// Clean inputs //
	var fullname = $LI.safeChars($LI.profilebox.editbox.fullname.value);
	var bio = $LI.safeChars($LI.profilebox.editbox.bio.value);
	
	// Define request data //
	var req = 'action=editprofile';
	req += '&uuid=' + uuid;
	req += '&name=' + username;
	req += '&loginid=' + loginid;
	req += '&hash=' + hash;
	req += '&fullname=' + fullname;
	req += '&bio=' + bio;
	$LI.writeRequest(req,function(details){
		var xml = details.responseText;

		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
		
		// pick up new token //
		$LI.setData('token', $LI.getFirstElement('token', xml));
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		} else if ($LI.getFirstElement('uuid', xml).length < 1) {
			$LI.report('The server responded in an unexpected manner. You may need to renew your login.');
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}
		
		// Get details from xml and make temp updates to profile display //
		var editfullname = $LI.getFirstElement('fullname', xml);
		var editbio = $LI.getFirstElement('bio', xml);
		
		// Process bio HTML //
		// Newlines to HTML line-breaks //
		var editbioprocessed = editbio.replace(/\n/g, '<br />');
		// Target anchor elements to parent window //
		editbioprocessed = editbioprocessed.replace(/<a href/g, '<a target="' + $LI.windowName + '" href');
		
		// Get details from xml and make temp updates to profile display //
		$LI.profilebox.displaybox.fullname.innerHTML = editfullname;
		$LI.profilebox.displaybox.bio.innerHTML = editbioprocessed;
		
		// Prep and switch to profile display (indicating test mode) //
		$LI.profilebox.displaybox.testbuttonbar.style.display = 'block';
		$LI.displayProfile(true);
		
		// Report //
		$LI.report('Test profile received.');
	}, 'Submitting profile edit test...');
},false);
$LI.profilebox.displaybox.canceltestbutton.addEventListener('mouseup',function(){
	// Return to view of  //
	$LI.profilebox.editbox.style.display = 'none';
	$LI.profilebox.displaybox.testbuttonbar.style.display = 'none';
	$LI.profilebox.displaybox.style.display = 'block';
	$LI.profilebox.style.display = 'block';
	
	$LI.displayProfile();
},false);
$LI.profilebox.displaybox.editbutton.addEventListener('mouseup',function(){
	// Ensure profile edit area is prepped //
	$LI.profilebox.editbox.style.display = 'block';
	$LI.profilebox.displaybox.testbuttonbar.style.display = 'none';
	$LI.profilebox.displaybox.style.display = 'none';
},false);
	
// Submit profile edit handler //
$LI.submitProfileEdit = function(){
	// Requires uuid, login id and password/token hash //
	var uuid = $LI.getData('uuid');
	var username = $LI.safeChars($LI.getData('username'));
	var loginid = $LI.getData('loginid');
	var pass = $LI.getData('passwordhash');
	var token = $LI.getData('token');
	var hash = $LI.md5(pass + token);

	// Check Login //
	if (username.length == 0) {
		$LI.report('Not Logged In!');
		return;
	}
	
	// Clean inputs //
	var fullname = $LI.safeChars($LI.profilebox.editbox.fullname.value);
	var bio = $LI.safeChars($LI.profilebox.editbox.bio.value);
	
	// Define request data //
	var req = 'action=editprofile';
	req += '&uuid=' + uuid;
	req += '&name=' + username;
	req += '&loginid=' + loginid;
	req += '&hash=' + hash;
	req += '&fullname=' + fullname;
	req += '&bio=' + bio;
	
	// Make request //
	$LI.writeRequest(req,function(details){
		var xml = details.responseText;

		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// pick up new token //
		$LI.setData('token', $LI.getFirstElement('token', xml));
		
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		} else if ($LI.getFirstElement('token', xml).length < 32) {
			$LI.report('The server responded in an unexpected manner. You may need to renew your login.');
		}
		
		// Get details from xml //
		$LI.currentProfile.uuid = $LI.getFirstElement('uuid', xml);
		$LI.currentProfile.name = $LI.getFirstElement('name', xml);
		$LI.currentProfile.registered = $LI.getFirstElement('registered', xml);
		$LI.currentProfile.accessed = $LI.getFirstElement('accessed', xml);
		$LI.currentProfile.fullname = $LI.getFirstElement('fullname', xml);
		$LI.currentProfile.bio = $LI.getFirstElement('bio', xml);
		
		// Process bio HTML //
		// Newlines to HTML line-breaks //
		var bioprocessed = $LI.currentProfile.bio.replace(/\n/g, '<br />');
		// Target anchor elements to parent window //
		bioprocessed = bioprocessed.replace(/<a href/g, '<a target="' + $LI.windowName + '" href');
		
		$LI.currentProfile.bioprocessed = bioprocessed;
		
		// Insert details into profile display //
		$LI.displayProfile();
		
		// Report //
		$LI.report('Profile updated!');

	}, 'Submitting profile edit...');
}
$LI.profilebox.displaybox.submitbutton.addEventListener('mouseup',$LI.submitProfileEdit,false);
$LI.profilebox.editbox.submitbutton.addEventListener('mouseup',$LI.submitProfileEdit,false);


// Finish up Basic UI //
// Add new elements to panel after 'flicker' period //
$LI.mainPanel.addEventListener('load', function(){
	while (el = $LI.waiter.shift()) {
		p = eval(el.waitParent); // Crazy, huh?
		p.appendChild(el);
	}
	// Capture keyboard events on main panel //
	$LI.mainPanel.contentDocument.addEventListener('keydown', function(e){
		$LI.lastKeyCode = (e.keyCode > 18) ? e.keyCode : $LI.lastKeyCode;
		$LI.togglePanel(e);
	}, false);
	$LI.mainPanel.contentDocument.addEventListener('keyup', function(e){
		$LI.lastKeyCode = false;
	}, false);
}, false);
function appender(c) {$LI.mainPanel.contentDocument.body.appendChild(c);}

// Initial login status indicator //
if ($LI.getData('username','').length) {
	$LI.logstat.innerHTML = $LI.XMLChars($LI.getData('username'));
	$LI.logstat.setAttribute('title', $LI.getData('username') + ' Logged In');
	$LI.logstat.style.background = '#cfc';
} else {
	$LI.logstat.innerHTML = 'Logged Out';
	$LI.logstat.style.background = '#fcc';
}

}///// END OF buildUI /////


// FUNCTIONS //

// Send data to the Little Island server write script //
$LI.writeRequest = function(req,func,msg) {

	// Report Status //
	if (msg) {
		$LI.reportStatus(msg);
	} else {
		$LI.reportStatus('Contacting Little Island server...');
	}
	
	// Check for debugging //
	if ($LIcfg.debug) {$LI.debugout(req);}
		
	// Execute AJAX request //
	GM_xmlhttpRequest({
		method:"POST",
		url:$LIcfg.server + $LIcfg.writer,
		headers:$LIcfg.sendheaders,
		overrideMimeType:"text/xml; charset=utf-8",
		data:req,
		onreadystatechange:$LI.stateAlert,
		onload:func,
		onerror:function(){
			// General cleanup //
			$LI.editlock = false;
		}
	});
	
}

// Send data to the Little Island server read script //
$LI.readRequest = function(req,func,msg) {

	// Report Status //
	if (msg) {
		$LI.reportStatus(msg);
	} else {
		$LI.reportStatus('Contacting Little Island server...');
	}
	
	// Check for debugging //
	if ($LIcfg.debug) {$LI.debugout(req);}

	// Execute AJAX request //
	GM_xmlhttpRequest({
		method:"POST",
		url:$LIcfg.server + $LIcfg.reader,
		headers:$LIcfg.sendheaders,
		overrideMimeType:"text/xml; charset=utf-8",
		data:req,
		onreadystatechange:$LI.stateAlert,
		onload:func,
		onerror:function(){}
	});

}

// Encode strings to make safe characters used to deliniate data sent to the server //
$LI.safeChars = function (s) {
	s = s.replace(/%/g,'%25');
	s = s.replace(/&/g,'%26');
	s = s.replace(/=/g,'%3D');
	s = s.replace(/\+/g,'%2B');
	return s
}

// Replace html/xml chars with entity references //
$LI.XMLChars = function (s, rev) {
	if (rev) {
		s = s.replace(/&amp;/,'&');
		s = s.replace(/&lt;/,'<');
		s = s.replace(/&gt;/,'>');
		s = s.replace(/&quot;/,'"');
		s = s.replace(/&apos;/,"'");
	} else {
		s = s.replace(/&/g,'&amp;');
		s = s.replace(/</g,'&lt;');
		s = s.replace(/>/g,'&gt;');
		s = s.replace(/"/g,'&quot;');
		s = s.replace(/'/g,'&apos;');
	}
	return s
}


// Log user into Little Island server //
$LI.login = function (e) {

	// Request login token //
	$LI.username = $LI.safeChars($LI.loginbox.username.value);
	$LI.username = $LI.username.replace(/^\s+|\s+$/g,'');
	var req = 'action=preparelogin&name=' + $LI.username;

	$LI.writeRequest(req,function(details){
		var xml = details.responseText;

		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		}
		
		// Check for messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}

		// Report //
		$LI.report('Login token received.');
		
		// Extract token and uuid //
		$LI.loginToken = $LI.getFirstElement('logintoken', xml);
		$LI.uuid = $LI.getFirstElement('uuid', xml);
		
		// Hash Password + user name and hash the result with token //
		var username = $LI.username.replace(/^\s+|\s+$/g,'');
		var password = $LI.loginbox.password.value;
		$LI.passhash = $LI.md5($LI.toUTF8(password+username));

		// Send password/token hash with username //
		var req = 'action=login&uuid=' + $LI.uuid + '&hash=' + $LI.md5($LI.passhash + $LI.loginToken);
		$LI.writeRequest(req,function(details){
			var xml = details.responseText;
		
			// Check for debugging //
			if ($LIcfg.debug) {$LI.debugin(xml);}
	
			// Check for errors //
			if (error = $LI.getFirstElement('error', xml)) {
				$LI.report(error);
				return;
			}
			
			// Check for other messages //
			if (message = $LI.getFirstElement('message', xml)) {
				$LI.report(message);
			}
			
			// Record login id, uuid, new token //
			$LI.setData('loginid', $LI.getFirstElement('loginid', xml));
			$LI.setData('uuid', $LI.getFirstElement('uuid', xml));
			$LI.setData('token', $LI.getFirstElement('token', xml));
			$LI.setData('passwordhash', $LI.passhash);
			$LI.setData('username', $LI.username);
			$LI.passhash = $LI.username = '';
			
			// Login Complete! //
			$LI.report('User <strong>' + $LI.XMLChars($LI.getData('username')) + '</strong> Logged in!');
			$LI.loginbox.style.display = 'none';
			
			// Update login status display //
			$LI.logstat.innerHTML = $LI.XMLChars($LI.getData('username'));
			$LI.logstat.setAttribute('title', $LI.getData('username') + ' Logged In');
			$LI.logstat.style.background = '#cfc';
			
			// Rebuild comment html to add owner links //
			var uuid = $LI.getData('uuid');
			for (ucid in $LI.comments) {
				$LI.comments[ucid].rebuildFromXML();
			}
		}, 'Logging in...');
	}, 'Requesting login token...');
}


// Log user out of Little Island server //
$LI.logout = function() {

	// Requires user name, login id and password/token hash //
	var username = $LI.safeChars($LI.getData('username'));
	var uuid = $LI.getData('uuid');
	var loginid = $LI.getData('loginid');
	var pass = $LI.getData('passwordhash');
	var token = $LI.getData('token');
	var hash = $LI.md5(pass + token);

	if (!(name && loginid && hash)) {
		$LI.report('Already logged out?');
		return;
	}
	
	var req = 'action=logout';
	req += '&uuid=' + uuid;
	req += '&name=' + username;
	req += '&loginid=' + loginid;
	req += '&hash=' + hash;

	$LI.writeRequest(req,function(details){
		var xml = details.responseText;
	
		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		}
		
		// Success! //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}
		
		// Unset login details //
		$LI.setData('uuid', '');
		$LI.setData('username', '');
		$LI.setData('password', '');
		$LI.setData('loginid', '');
		$LI.setData('token', '');
		
		// Rebuild comment html to remove owner links //
		for (ucid in $LI.comments) {$LI.comments[ucid].buildHTML();}
			
		// Update login status display //
		$LI.logstat.innerHTML = 'Logged Out';
		$LI.logstat.setAttribute('title', 'Logged Out');
		$LI.logstat.style.background = '#fcc';
		
		// Rebuild comment html to remove owner links //
		for (ucid in $LI.comments) {
			$LI.comments[ucid].rebuildFromXML();
			//$LI.displayComments();
		}
	}, 'Sending logout request...');
}

	
// Get Node information //
$LI.thisNode = false;
$LI.getNode = function (first) {
	var url = $LI.safeChars(String(document.location));
	var req = 'action=node&url=' + url;

	$LI.readRequest(req,function(details){
		var xml = details.responseText;

		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report(error);
			return;
		}
		
		// Check for other messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}

		// Extract node data //
		$LI.thisNode = $LI.nodeParse(xml);
		
		// Display info //
		if ($LI.thisNode.count) {
			pl = ($LI.thisNode.count > 1) ? 's' : '';
			$LI.report($LI.thisNode.count + ' comment' + pl + ' for this page. Last updated: ' + $LI.thisNode.lastcache);
		} else {
			$LI.report('There are no comments for this page.');
		}
		
		// Get first page of comments
		if ($LI.thisNode.count > 0) $LI.getCachePage();
		
	}, 'Fetching node details...');
}

// Common comment lists //
$LI.comments = new Array();
$LI.sortedUCIDs = new Array();
$LI.UCIDsByThread = new Array();
$LI.threadsByDate = new Array();
$LI.datesByThread = new Array();

// Comment Object //
$LI.Comment = function (xml) {
	this.ucid = this.node = this.thread = this.parent = this.name = this.xmlname = this.deleteme = false;
	this.created = this.edited = this.root = this.abrv = this.unabrv = this.updated = this.mask = this.unmasked = false;
	this.box = this.displayed = this.orphan = this.fosterparent = this.surrogateparent = this.shell = this.overwrite = false;
	this.createddate = this.createdutc = this.createdstringlocal = this.createdstringutc = this.collapsed = false;
	this.lastedited = this.editeddate = this.editedutc = this.editedstringlocal = this.editedstringutc = this.xml = false;
	this.children = new Array();
	
	// Parse comment from XML //
	this.fromXML = function(xml) {
		// Make sure we are not overwriting unmasked comments with a masked ones //
		if (!this.unmasked || this.overwrite) {
			this.overwrite = false;
			
			// Flag unmasked comments //
			var testbody = $LI.getFirstElement('body', xml);
			if (this.mask && testbody.length > 0) {this.unmasked = true;}
			
			// Rebuild default //
			if (xml) {this.xml = xml} else
			if (this.xml) {xml = this.xml;};
			
			// Get basic elements //
			this.ucid = $LI.getFirstElement('ucid', xml);
			this.thread = $LI.getFirstElement('thread', xml);
			this.parent = $LI.getFirstElement('parent', xml);
			
			this.uuid = $LI.getFirstElement('uuid', xml);
			this.xmlname = $LI.getFirstElement('name', xml);
			
			this.created = $LI.getFirstElement('created', xml);
			this.edited = $LI.getFirstElement('edited', xml);
			
			// Get content elements //
			this.title = $LI.getFirstElement('title', xml);
			var testabrv = $LI.getFirstElement('abrv', xml);
			this.abrv = (testabrv) ? testabrv : false;
			this.body = (this.unabrv && this.edited == this.lastedited) ? this.body : $LI.getFirstElement('body', xml);
			this.lastedited = this.edited;
		}
		
		// Convert datetime to utc for easy sorting //
		var cdo = $LI.timeFromDatestamp(this.created);
		this.createddate = cdo.dateobj;
		this.createdstringlocal = cdo.localstr;
		this.createdstringutc = cdo.utcstr;
		this.createdutc = cdo.utc;
		if (this.edited.length > 1) {
			var edo = $LI.timeFromDatestamp(this.edited);
			this.editeddate = edo.dateobj;
			this.editedstringlocal = edo.localstr;
			this.editedstringutc = edo.utcstr;
			this.editedutc = edo.utc;
		}
		
		// Provide unescaped user name //
		this.name = $LI.XMLChars(this.xmlname, true);
		
		// Provide unicode indication of multi-byte characters //
		var uniname = false;
		this.htmlname = this.xmlname.replace(/./g, function(m){
			if (m.charCodeAt(0) > 255) {
				uniname = true;
				return '<span class="unicode">' + m + '</span>';
			}
			return m;
		});
		this.htmlname = (uniname) ? '<span class="unicodename">' + this.htmlname + '</span>' : this.htmlname;
		
		// Skip the rest for test comments (which should always have a ucid of 0) //
		if (!this.ucid) return this;
		
		// Derive other info //
		this.shell = (this.name.length < 1) ? true : false;
		this.mask = (this.body.length < 1 && !this.shell) ? true : false;
		this.root = (this.thread && (this.thread == this.ucid || this.parent == 0)) ? true : false;
		this.owner = ($LI.getData('loginid') && this.uuid == $LI.getData('uuid')) ? true : false;

		// Update thread indexes and check thread age for most recent comment //
		if (!$LI.datesByThread[this.thread]) {
			$LI.datesByThread[this.thread] = this.createdutc;
		} else if ($LI.datesByThread[this.thread] < this.createdutc) {
			$LI.datesByThread[this.thread] = this.createdutc;
		}
		
		// Compile comment members of threads //
		if (!$LI.UCIDsByThread[this.thread]) {$LI.UCIDsByThread[this.thread] = [];}
		if (!$LI.UCIDsByThread[this.thread][this.ucid]) {$LI.UCIDsByThread[this.thread][this.ucid] = true;}
	}
	
	// Instantiation argument //
	if (xml) {this.fromXML(xml);}
	
	// Construct initial html for comment //
	// Note that some element references are stored in properties of the box for quick access later //
	this.buildHTML = function () {
		if (this.mask) {return;}
	
		if (!this.box) {this.box = $LI.make('div', 'com' + this.ucid, false);}
		this.box.setAttribute('class', 'commentbox');
		
		// Container for comment display (as opposed to psoitioning element and child comment element) //
		if (this.box.container) {
			// Clear the comment container for rebuild //
			this.box.container.innerHTML = '';
		} else {
			// Create new container //
			this.box.container = $LI.make('div', 'container' + this.ucid, this.box);
		}
		
		// Comment head //
		var head = $LI.make('div', 'head'+this.ucid, this.box.container);
		head.setAttribute('class', 'commenthead');
		if (this.unmasked) head.setAttribute('class', 'commentheadun');
		
		// Shortcut comment navigation (if this is not a test comment) //
		if (this.ucid) {
			head.addEventListener('click', function(e){
				// Find UCID //
				var pucid = this.getAttribute('id').replace(/head/, '');
				
				if ($LI.lastKeyCode == 87) { // W //
					// Focus on parent comment //
					if ($LI.comments[$LI.comments[pucid].parent]) {
						if ($LI.comments[$LI.comments[pucid].parent].mask) {
							// Blink unmask link if parent is masked //
							$LI.blink($LI.comments[pucid].box.unmaskparentlink);
						} else {
							// Focus on parent //
							$LI.commentFocus($LI.comments[pucid].parent);
						}
					}
				} else if ($LI.lastKeyCode == 83) { // S //
					// Focus on first child //
					if ($LI.comments[pucid].children.length) {
						var mc = $LI.arraySortNum($LI.arrayKeys($LI.comments[pucid].children),true);
						if ($LI.comments[mc[0]].mask) {
							// Blink unmask link if first child is masked //
							$LI.blink($LI.comments[pucid].box.unmaskchildrenlink);
						} else {
							// Focus on first child //
							$LI.commentFocus(mc[0]);
						}
					}
				} else if ($LI.lastKeyCode == 65) {	// A //
					// Focus on previous sibling //
					var mc = ($LI.comments[pucid].root) ? $LI.threadsByDate : $LI.arraySortNum($LI.comments[pucid].getSiblings(),true);
					if (mc.length) {
						if (tcom = $LI.arrayPrevValue(pucid, mc)) {
							// Previous sibling //
							$LI.commentFocus(tcom);
						} else {
							// Default to last sibling //
							$LI.commentFocus(mc[mc.length-1]);
						}
					}
				} else if ($LI.lastKeyCode == 68) { // D //
					// Focus on next sibling comment //
					var mc = ($LI.comments[pucid].root) ? $LI.threadsByDate : $LI.arraySortNum($LI.comments[pucid].getSiblings(),true);
					if (mc.length) {
						if (tcom = $LI.arrayNextValue(pucid, mc)) {
							// Next sibling //
							$LI.commentFocus(tcom);
						} else {
							// Default to first sibling //
							$LI.commentFocus(mc[0]);
						}
					}
				}
			}, false);
		}

		// Check for deleted (shell) comment //
		if (this.shell) {
			// Switch to deleted comment style //
			head.setAttribute('class', 'deletedhead');
			head.setAttribute('title', this.ucid);
			// Add deleted comment heading //
			head.innerHTML = '(Deleted Comment)';
			
			// X-unmask shortcut to reveil any surrounding masked comments //
			head.addEventListener('click', function(e){
				if ($LI.lastKeyCode != 88) return;
				
				// Find UCID //
				var ducid = this.getAttribute('id').replace(/head/, '');
				
				// Find masked comments //
				var unmaskus = new Array();
				var delp = $LI.comments[ducid].parent;
				if ($LI.comments[delp] && $LI.comments[delp].mask) unmaskus.push(delp);
				var ch = $LI.comments[ducid].getChildren();
				while (c = ch.pop()) {if ($LI.comments[c] && $LI.comments[c].mask) unmaskus.push(c);}
				
				if (unmaskus.length < 1) return;
				
				$LI.getComments(unmaskus);
				
			}, false);
			
			// Skip the rest //
			finishHTML(this);
			return;
		}
		
		// Title in head //
		// Note the 'title' property is reserved on HTML element objects so we'll use 'boxtitle' //
		this.box.boxtitle = $LI.make('p', false, head);
		$LI.attr(this.box.boxtitle, {'class':'commenttitle', 'title':this.ucid});
		this.box.boxtitle.innerHTML = this.title;
		
		// User and comment details in head //
		var details = $LI.make('p', false);
		this.box.comname = $LI.make('a', false);
		$LI.attr(this.box.comname, {'class':'commentuser', 'title':this.uuid});
		this.box.comname.innerHTML = this.htmlname;
		this.box.comname.addEventListener('click', $LI.selectProfile, false);
		
		$LI.makeText(' - ');
		this.box.comcdate = $LI.make('a', false);
		this.box.comcdate.setAttribute('class', 'commentcdate');
		this.box.comcdate.innerHTML = this.createdstringlocal;
		
		this.box.edited = $LI.make('a', false);
		this.box.edited.setAttribute('class', 'commentedate');
		this.box.edited.innerHTML = ' (edited: ' + this.editedstringlocal + ')';
		this.box.edited.style.display = (this.edited) ? 'inline' : 'none';
		
		// Process comment body //
		// Newlines to HTML line-breaks //
		this.bodyprocessed = this.body.replace(/\n/g, '<br />');
		// Target anchor elements to parent window //
		this.bodyprocessed = this.bodyprocessed.replace(/<a href/g, '<a target="' + $LI.windowName + '" href');
		
		// Apply comment body //
		this.box.body = $LI.make('div', '', this.box.container);
		this.box.body.setAttribute('class', 'commentbody');
		this.box.body.innerHTML = this.bodyprocessed;
		
		// Unabbreviate link //
		if (this.abrv && !this.unabrv) {
			// Add an elipsis to the body //
			this.box.body.innerHTML += '...';
			this.box.abrvlink = $LI.make('a', 'abrv'+this.ucid, this.box.body);
			$LI.attr(this.box.abrvlink, {'class':'abrvlink',title:this.abrv+' words'});
			//this.box.abrvlink.setAttribute('class', 'abrvlink');
			this.box.abrvlink.innerHTML = 'Continue reading this comment...';
			this.box.abrvlink.addEventListener('click', function(){
				// Get this ucid //
				var ucid = this.getAttribute('id').replace(/abrv/, '');
				// Download full comment //
				if ($LI.comments[ucid]) $LI.getComments(ucid);
			}, false);
		}
		
		// Skip for test comments //
		if (!this.ucid) {
			finishHTML(this);
			return;
		}
		
		// Comment foot //
		var foot = $LI.make('div', '', this.box.container);
		foot.setAttribute('class', 'commentfoot');
		
		// Orphan comment indicator //
		if (this.orphan) {
			this.box.orphanlink = $LI.make('a', 'orphan' + this.ucid, foot);
			$LI.attr(this.box.orphanlink, {'title':'This is a reply to a missing comment.', 'class':'broken'});
			this.box.orphanlink.innerHTML = 'Orphan';
			this.box.orphanlink.addEventListener('click', function(){
				var ucid = this.getAttribute('id').replace(/[^0-9]/g,'');
				if ($LI.comments[ucid].parent > 0) $LI.getComments($LI.comments[ucid].parent);
			}, false);
		}
		
		// Unmask parent link //
		if (this.parent > 0 && $LI.comments[this.parent].mask) {
			this.box.unmaskparentlink = $LI.make('a', 'unmaskparent' + this.ucid, foot);
			this.box.unmaskparentlink.innerHTML = 'Show Parent';
			this.box.unmaskparentlink.setAttribute('class', 'hiddenlink');
			this.box.unmaskparentlink.addEventListener('click', function(){
				// Get this ucid //
				var ucid = this.getAttribute('id').replace('unmaskparent', '');
				
				// Download parent comment //
				if ($LI.comments[ucid].parent > 0) $LI.getComments($LI.comments[ucid].parent);
			}, false);
		}
		
		// Umask children link //
		var foundmc = new Array();
		for (var u in this.children) {if ($LI.comments[u] && $LI.comments[u].mask) foundmc.push(u);}
		if (foundmc.length) {
			var fmclist = foundmc.join(',');
			this.box.unmaskchildrenlink = $LI.make('a', 'unmaskchildren' + this.ucid, foot);
			this.box.unmaskchildrenlink.innerHTML = 'Show Hidden Replies';
			$LI.attr(this.box.unmaskchildrenlink, {'class':'hiddenlink', 'title':fmclist});
			this.box.unmaskchildrenlink.addEventListener('click', function(){
				// Get this ucid //
				var ucid = this.getAttribute('id').replace('unmaskchildren', '');
				
				// collect list of masked children //
				var mcs = new Array();
				for (var u in $LI.comments[ucid].children) {if ($LI.comments[u] && $LI.comments[u].mask) mcs.push(u);}
				
				// Download child comments //
				$LI.getComments(mcs);
				
				// Expand thread //
				if ($LI.comments[ucid].collapsed) {
					$LI.comments[ucid].collapsed = false;
					$LI.comments[ucid].box.collapselink.style.color = '';
					$LI.comments[ucid].box.collapselink.innerHTML = 'Collapse Thread';
					$LI.comments[ucid].box.childbox.style.display = 'block';
				}
			}, false);
		}
		
		// Reply link //
		this.box.replylink = $LI.make('a', 'reply' + this.ucid, foot);
		this.box.replylink.innerHTML = 'Reply';
		this.box.replylink.addEventListener('click', function(){
			// Make sure last comment submission has completed //
			if ($LI.editlock) return;
		
			// Get this ucid //
			var ucid = this.getAttribute('id').replace('reply', '');
			
			// Set new somment parent //
			$LI.newcommentparent = ucid;
			
			// If a comment was hidden by the comp box, display it again //
			if ($LI.editcomment) {
				$LI.comments[$LI.editcomment].showMe();
				$LI.editcomment = false;
			}
		
			// Update composition box heading //
			$LI.compbox.heading.innerHTML = 'Reply to <strong>' + $LI.comments[ucid].title + '</strong> (' + $LI.comments[ucid].created + ') posted by ' + $LI.comments[ucid].name;
	
			// Move composition box to bottom of comment's child box //
			$LI.comments[ucid].box.childbox.appendChild($LI.compbox);
			
			// Open composition box //
			$LI.compbox.style.display = 'block';
			//$LI.compbox.style.display = 'block';
			
			// Scroll to composition box's new position //
			$LI.compbox.compbody.focus();
			
		}, false);
		
		// Collapse thread link //
		if (this.root && this.children.length) {
			var clpstext = (this.collapsed) ? 'Expand Thread' : 'Collapse Thread';
			this.box.collapselink = $LI.make('a', 'collapse' + this.ucid, foot, clpstext);
			this.box.collapselink.style.color = (this.collapsed) ? 'red' : '';
			this.box.collapselink.addEventListener('click', function(){
				var ucid = this.id.replace(/[^0-9]/g,'');
				if ($LI.comments[ucid].collapsed) {
					$LI.comments[ucid].box.collapselink.innerHTML = 'Collapse Thread';
					$LI.comments[ucid].box.collapselink.style.color = '';
					$LI.comments[ucid].box.childbox.style.display = 'block';
					$LI.comments[ucid].collapsed = false;
				} else {
					$LI.comments[ucid].box.collapselink.innerHTML = 'Expand Thread';
					$LI.comments[ucid].box.collapselink.style.color = 'red';
					$LI.comments[ucid].box.childbox.style.display = 'none';
					$LI.comments[ucid].collapsed = true;
				}
			}, false);
		}
		
		// Owner action links //
		if (this.owner || $LIcfg.ownall) {
		
			// Edit link //
			this.box.editlink = $LI.make('a', 'edit' + this.ucid, foot);
			if ($LI.comments[this.ucid].abrv) {
				// Comments can't be edited until they complete body has been downloaded //
				this.box.editlink.innerHTML = 'Show full comment to Edit';
				this.box.editlink.addEventListener('click', function(){
					// Get this ucid //
					var ucid = this.getAttribute('id').replace('edit', '');
					
					// Download full comment //
					if ($LI.comments[ucid]) $LI.getComments(ucid);
				}, false);
			} else {
				// Normal edit //
				this.box.editlink.innerHTML = 'Edit';
				this.box.editlink.addEventListener('click', function(){
					// Make sure last comment submission has completed //
					if ($LI.editlock) return;
					
					// Check for existing edit in progress and reset //
					if ($LI.editcomment) {
						$LI.comments[$LI.editcomment].showMe();
						$LI.testbox.style.display = 'none';
					}
					
					// Get this ucid //
					var ucid = this.getAttribute('id').replace('edit', '');
					
					// Set edit target for AJAX request string //
					$LI.editcomment = ucid;
					
					// Update composition box //
					$LI.compbox.heading.innerHTML = 'Editing your comment... (' + $LI.comments[ucid].created + ')';
					$LI.compbox.comptitle.value = $LI.comments[ucid].title;
					$LI.compbox.compbody.value = $LI.comments[ucid].body;
					
					// Replace comment with composition box //
					$LI.comments[ucid].box.insertBefore($LI.compbox, $LI.comments[ucid].box.childbox);
					$LI.comments[ucid].hideMe();
					
					// Open composition box //
					$LI.compbox.style.display = 'block';
					
					// Scroll to composition box's new position //
					$LI.compbox.compbody.focus();
					
				}, false);
			}
			
			// Delete Link //
			this.box.deletelink = $LI.make('a', 'delete' + this.ucid, foot);
			this.box.deletelink.setAttribute('title', 'Hold down Ctrl+Alt while clicking to delete this comment.');
			this.box.deletelink.innerHTML = 'Delete';
			this.box.deletelink.addEventListener('click', function(e){
				// Get this ucid //
				var ucid = this.getAttribute('id').replace('delete', '');
				
				// Check held keys //
				if (!e.altKey || !e.ctrlKey) {return;}
				
				// Update confirmation box //
				var ct =  'Perminantly delete this comment?<br />' + $LI.comments[ucid].title + '<br />posted on ' + $LI.comments[ucid].created + '?';
				$LI.setConfirm('Delete Comment', ct, function(){
					if ($LI.confbox.data) {
					
						// Compose request data //
						var req = 'action=delete';
						
						// Requires user name, login id and password/token hash //
						req += '&uuid=' + $LI.getData('uuid');
						req += '&name=' + $LI.safeChars($LI.getData('username'));
						req += '&loginid=' + $LI.getData('loginid');
						req += '&hash=' + $LI.md5($LI.getData('passwordhash') + $LI.getData('token'));
						req += '&ucid=' + $LI.confbox.data;
						req += '&unid=' + $LI.thisNode.unid;
						
						// Make request //
						$LI.writeRequest(req,function(details){
							var xml = details.responseText;
							
							// Reset confirmation box //
							$LI.unsetConfirm();
							
							// Check for debugging //
							if ($LIcfg.debug) {$LI.debugin(xml);}
	
							// Update token //
							$LI.setData('token', $LI.getFirstElement('token', xml));
							
							// Check for errors //
							if (error = $LI.getFirstElement('error', xml)) {
								$LI.reportStatus(error);
								return;
							}
							
							// Success! //
							if (message = $LI.getFirstElement('message', xml)) {
								$LI.reportStatus(message);
							} 
							
							// Get deleted comment data //
							var ucid = $LI.getFirstElement('ucid', xml);
							var full = $LI.getFirstElement('fulldelete', xml);
							
							// Delete comment from list //
							if (full == 0) {
								$LI.comments[ucid].overwrite = true;
								$LI.comments[ucid].rebuildFromXML(xml);
								//$LI.comments[ucid].shellMe();
							} else {
								// Delete target comment //
								$LI.comments[ucid].deleteMe();
								// Update with any recursive deletion of ancestors //
								var ad = $LI.getFirstElement('alsodeleted',xml);
								if (ad.length) {
									var adar = ad.split(/,/);
									for (i in adar) {$LI.comments[adar[i]].deleteMe();}
								}
							}
							
							// Update comment display //
							$LI.displayComments();
							
							// Finished //
							$LI.reportStatus('Comment successfully deleted!');
						}, 'Requesting comment deletion...');
					} else {return;}
				}, ucid);
				
				// Open confirmation box //
				$LI.confbox.style.display = 'block';
				
			}, false);
		}
		
		finishHTML(this);
	}

	function finishHTML (o) {
		// Child comments container //
		if (o.box.childbox) {} else {
			o.box.childbox = $LI.make('div', 'childbox' + o.ucid, o.box);
		}
		o.box.childbox.setAttribute('class', 'childbox');
	}
	
	// Rebuild from XML //
	this.rebuildFromXML = function (xml){
		xml = (xml) ? xml : this.xml;
		this.fromXML(xml);
		this.buildHTML();
	}

	// Hide comment box without removing it from parent element //
	this.hideMe = function () {this.box.container.style.display = 'none';}
	this.showMe = function () {this.box.container.style.display = 'block';}
	
	// Delete comment or reduce to shell //
	this.shellMe = function () {
		this.name = this.uuid = this.title = this.body = false;
		this.box.container.innerHTML = '(Deleted Post)';
	}
	this.deleteMe = function () {
		this.box.parentNode.removeChild(this.box);				// Remove xomment from display //
		$LI.comments[this.parent].removeChildren(this.ucid);	// Remove from parent's child list //
		// Delete from parent child list //
		if ($LI.comments[this.parent]) {$LI.comments[this.parent].removeChildren(this.ucid);}
		delete $LI.comments[this.ucid];							// Delete from comment list //
		// Delete from UCID list //
		var ttl = [];
		for (var u in $LI.UCIDsByThread[this.thread]) {
			if (u != this.ucid) {ttl[u] = $LI.UCIDsByThread[this.thread][u];}
		}
		$LI.UCIDsByThread[this.thread] = ttl;
		delete this;
	}
	
	// Update familial relationships //
	this.updateRelations = function () {
		// Find children //
		this.children = [];
		var k = $LI.arrayKeys($LI.comments);
		for (var i = 0; i < k.length; i++) {
			if ($LI.comments[k[i]].parent == this.ucid) {
				this.children[k[i]] = true;
			}
		}
		
		// Find parent //
		if (this.root) {
			// Do nothing //
		} else if ($LI.comments[this.parent]) {
			if ($LI.comments[this.parent].mask) {
				// Search up the comment thread for a srrogate parent comment //
				var sp = this.parent;
				while (sp && $LI.comments[sp].mask) {sp = $LI.comments[sp].parent;}
				this.surrogateparent = sp;
			} else {
				// Normal structure //
				this.claimMe();
				this.surrogateparent = false;
			}
		} else {
			// Broken structure //
			this.orphanMe();
		}
	}
	
	// Mark comment as orphan //
	this.orphanMe = function () {
		this.orphan = true;
		if (this.box) {
			this.box.orphanlink.style.display = 'block';
		}
	}
	this.claimMe = function () {
		this.orphan = false;
		if (this.box.orphanlink) {
			this.box.orphanlink.style.display = 'none';
		}
	}
	
	// Attatch comment to new parent //
	this.fosterMe = function (ucid) {
		this.orphanMe();
		this.fosterparent = (ucid) ? ucid : false;
	}
	
	// Add children //
	this.addChildren = function (ch) {
		// Convert argument to array if required //
		if (typeof(ch) == 'number') {
			ch = [ch];
		} else if (typeof(ch) == 'object') {
			ch = [ch.ucid];
		}
		
		for (i in ch) {this.children[ch[i]] = true;}
	}
	this.removeChildren = function (ch) {
		// Convert argument to array if required //
		if (typeof(ch) == 'number') {
			ch = [ch];
		} else if (typeof(ch) == 'object') {
			ch = [ch.ucid];
		}
		
		for (i in ch) {delete this.children[ch[i]];}
	}
	
	// Return sorted list of children //
	this.getChildren = function () {
		var k = $LI.arrayKeys(this.children);
		return $LI.arraySortNum(k);
	}
	
	// Return sorted list of siblings //
	this.getSiblings = function () {
		var k = $LI.comments[this.parent].getChildren();
		return $LI.arraySortNum(k);
	}
}


// Comment related functions //

// Scroll to comment //
$LI.commentFocus = function(ucid) {
	if ($LI.comments[ucid] && $LI.comments[ucid].box.container) {
		var target = $LI.comments[ucid].box.container;
		// Create temporary form input element at target //
		var tinp = $LI.make('input',false,target);
		// Focus on input //
		tinp.focus();
		// Move target //
		target.insertBefore(tinp, target.firstChild);
		// Focus again //
		tinp.focus();
		// Remove input //
		target.removeChild(tinp);
		// Blink comment //
		$LI.commentBlink(ucid);
	}
}

// Flash comment for emphasis //
$LI.commentBlink = function(ucid){
	if ($LI.comments[ucid] && $LI.comments[ucid].box.container.firstChild) {
		var target = $LI.comments[ucid].box.container.firstChild;
		$LI.blink(target);
	}
}

// Blink the background color of an element //
$LI.blink = function(target, color, duration, interval) {
	if (target.IID) return;	// Not Working. Properties set on DOM elements from within GM cannot be retrieved from those elements via the DOM //
	if (!target.style) return;
	
	// Blink properties //
	target.blinkcolor = (color) ? color : '#99f';
	duration = (duration) ? duration*1000 : 1000;
	interval = (interval) ? interval*1000 : 100;
	target.breturn = target.style.backgroundColor;
	target.blinktick = true;
	
	// Blink interval //
	target.IID = setInterval(function(target){
		if (target.blinktick) {
			// ON //
			target.style.backgroundColor = target.blinkcolor;
			target.blinktick = false;
		} else {
			// OFF //
			target.style.backgroundColor = target.breturn;
			target.blinktick = true;
		}
	}, interval, target);
	
	// Blink duration //
	setTimeout(function(target){
		clearInterval(target.IID);
		target.IID = false;
		target.style.backgroundColor = target.breturn; // OFF //
	}, duration, target);
}

// Get cached page of comments //
$LI.currentCachePage = 1;
$LI.getCachePage = function (page) {
	if (typeof(page) == 'undefined') {
		page = $LI.currentCachePage;
		
		// Check for last cache page //
		if ($LI.currentCachePage > $LI.thisNode.cachepages) {
			// No more cache pages //
			$LI.report('There are no further comments...');
			return;
		} else {
			// Increment for next cache page //
			$LI.currentCachePage++;
		}
	}
	
	var message = 'Fetching cache page '+page+'...';
	
	var req = 'action=read';
	req += '&unid=' + $LI.thisNode.unid;
	req += '&page=' + page;

	$LI.readRequest(req,function(details){
		var xml = details.responseText;

		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}
	
		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.reportStatus(error);
			$LI.thisNode = true;
			return;
		}
		
		// Check for other messages //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.reportStatus(message);
			$LI.thisNode = true;
		}
		
		// Report //
		$LI.report('Cache page received. Processing now...');
		
		// Extract comment data //
		comcount = $LI.commentParse(xml);
		
		// Display comments //
		$LI.displayComments();
		
		// Report successfully received comments //
		$LI.report('Got ' + comcount + ' comments.');
		
		// Check for last cache page //
		$LI.nextCachePageLink.style.display = ($LI.currentCachePage > $LI.thisNode.cachepages) ? 'none' : 'block';
		
	}, message);
}
	
	
// Get full comments //
$LI.getComments = function (ucids) {
	if (typeof(ucids) == 'number' || typeof(ucids) == 'string') {
		ucid = ucids;
		ucids = new Array();
		ucids[0] = ucid;
	}
	
	var s=(ucids > 1)?'s':'';
	
	var req = 'action=comment';
	req += '&unid=' + $LI.thisNode.unid;
	req += '&ucid=' + ucids.join(',');
	
	$LI.readRequest(req,function(details){
		var xml = details.responseText;
		
		// Check for debugging //
		if ($LIcfg.debug) {$LI.debugin(xml);}

		// Check for errors //
		if (error = $LI.getFirstElement('error', xml)) {
			$LI.report('Error fetching comment: ' + error);
			return false;
		}
		
		// Success! //
		if (message = $LI.getFirstElement('message', xml)) {
			$LI.report(message);
		}
		
		// Update and redisplay comments //
		$LI.commentParse(xml);
		$LI.displayComments();
		
		var umcs = $LI.getAllElements('ucid', xml);
		
		// Count added comments and flag unabreviated comments //
		var count = 0;
		for (var u in umcs) {
			if ($LI.comments[umcs[u]] && !$LI.comments[umcs[u]].mask) count++;
			$LI.comments[umcs[u]].unabrv = true;
		}
		
		// Blink comments //
		var firstcom = true;
		for (var u in umcs) {
			if (firstcom) {
				$LI.commentFocus(umcs[u]);
				firstcom = false;
			} else {
				$LI.commentBlink(umcs[u]);
			}
		}
		
		// Finished //
		var s = (count > 1) ? 's' : '';
		$LI.report(count + ' comment'+s+' updated.');
	}, 'Requesting full comment'+s+'...');
}


// Update displayed comments  //
$LI.displayComments = function (rebuild) {
	var comcount = 0;
	
	// Resort threads by date //
	var presort = $LI.arrayKeys($LI.datesByThread);
	var postsort = presort.sort(function(a,b){
		var ac = $LI.datesByThread[a];
		var bc = $LI.datesByThread[b];
		var r = 0;
		if (ac > bc) r = -1;
		if (ac < bc) r = 1;
		
		return r;
	});
	$LI.threadsByDate = $LI.arrayFilter(postsort);

	// Iterate through threads //
	for (var t = 0; t < $LI.threadsByDate.length; t++) {
	
		var thread = $LI.threadsByDate[t];

		// Iterate through comments in thread //
		var uk = $LI.arrayKeys($LI.UCIDsByThread[thread]);
		var uk = $LI.arraySortNum(uk, true);
		for (var i = 0; i < uk.length; i++) {

			var ucid = uk[i];

			if ($LI.comments[ucid]) {
				// Rebuild comment html box object //
				if (rebuild) $LI.comments[ucid].buildHTML();
				
				// Select placement of box in display //
				if ($LI.comments[ucid].root) {
					// Thread roots should never be masked  but let's make sure //
					if ($LI.comments[ucid].mask) {
						// Report error //
						$LI.report('Comment '+ucid+' cannot be displayed: error in data.');
					} else {
						// Thread roots - Add to bottom of display (common behaviour) //
						$LI.mainDisplay.appendChild($LI.comments[ucid].box);
					}
					// If this is run on an existing layout it should simply cycle through the roots placing the top root at the bottom until the first reaches the top again //
				} else {
					// Child comments //
					if ($LI.comments[ucid].mask) {
						// Hide masked comments (do nothing) //
					} else if ($LI.comments[$LI.comments[ucid].parent] && !$LI.comments[$LI.comments[ucid].parent].mask) {
						// Append to valid parent comment //
						$LI.comments[$LI.comments[ucid].parent].box.childbox.appendChild($LI.comments[ucid].box);
					} else if ($LI.comments[$LI.comments[ucid].parent].mask && $LI.comments[$LI.comments[ucid].surrogateparent]) {
						// Append to surrogate parent in place of masked parent //
						$LI.comments[$LI.comments[ucid].surrogateparent].box.childbox.appendChild($LI.comments[ucid].box);
					} else if ($LI.comments[$LI.comments[ucid].thread]) {
						// Append to thread root if parent comment is missing //
						$LI.comments[$LI.comments[ucid].thread].box.childbox.appendChild($LI.comments[ucid].box);
					} else {
						// Append to end of display if both parent comment and thread root are missing //
						$LI.mainDisplay.appendChild($LI.comments[ucid].box);
					}
				}
				
				comcount++;
			}			
		}
	}
	
	// Append 'get more' link //
	$LI.mainDisplay.appendChild($LI.nextCachePageLink);
	
	// Return number of displayed comments //
	return comcount;
}


// Display status message //
$LI.statusMessages = new Array();
$LI.reportStatus = function (message) {
	$LI.statusMessages.unshift(message);
	while ($LI.statusMessages.length > $LIcfg.statusLog) {$LI.statusMessages.pop();}
	$LI.panelStatus.innerHTML = message;
	$LI.statusPopup.innerHTML = $LI.statusMessages.join('<br />');
}
$LI.report = function (message) {$LI.reportStatus(message);}
	
// Extract node data from xml //
$LI.nodeParse = function (xml) {
	xml = $LI.XMLChars(xml,true);
	var res = $LI.getFirstElement('node',xml);
	var node = new Object();
	node.unid = $LI.getFirstElement('unid', res);
	node.location = $LI.getFirstElement('location', res);
	node.protocol = $LI.getFirstElement('protocol', res);
	node.scheme = $LI.getFirstElement('scheme', res);
	node.authority = $LI.getFirstElement('authority', res);
	node.path = $LI.getFirstElement('path', res);
	node.query = $LI.getFirstElement('query', res);
	node.url = $LI.getFirstElement('url', res);
	node.count = $LI.getFirstElement('count', res);
	node.cachepages = $LI.getFirstElement('cachepages', res);
	node.lastcache = $LI.getFirstElement('lastcache', res);
	//node.url = node.protocol + '://' + node.location;
	return node;
}

// Extract node data from xml //
$LI.commentParse = function (xml,overwrite) {
	var res = $LI.getAllElements('comment',xml);
	var ccount = 0;
	
	for (i = 0; i < res.length; i++) {
	
		// Get ucid //
		var ucid = $LI.getFirstElement('ucid',res[i]);
		
		if ($LI.comments[ucid]) {
			// Update existing comment //
			if (overwrite) $LI.comments[ucid].overwrite = true;
			$LI.comments[ucid].fromXML(res[i]);
		} else {
			// Add new comment //
			$LI.comments[ucid] = new $LI.Comment(res[i]);
		}
		
		if (!$LI.comments[ucid].mask) ccount++;
	}
	
	// Update familial relationships //
	var k = $LI.arrayKeys($LI.comments);
	for (var i = 0; i < k.length; i++) {
		if ($LI.comments[k[i]])	{$LI.comments[k[i]].updateRelations();}
	}
	
	// Construct HTML //
	for (i in $LI.comments) {$LI.comments[i].buildHTML();}
	
	return ccount;
}


// Return contents of first matching element //
$LI.getFirstElement = function (e,s) {
	// Note the inverse empty char set [^] which matches newlines //
	var re = new RegExp("<" + e + "(?:\\s[^>]*?>|>)([^]*?)<\\/" + e + ">");
	var r;
	if (r = String(s).match(re)) {
		return (r.length) ? r[1] : '';
	}
	
	return '';
}

// Return an array of the contents of all matching elements //
$LI.getAllElements = function (e,s) {
	var re = new RegExp("<" + e + "(?:\\s[^>]*?>|>)([^]*?)<\\/" + e + ">", 'g');
	var rarray = new Array();
	var r;
	if (r = String(s).match(re)) {
		for (var i in r) {
			// The global match only returns whole matches so we still need to extract the element content //
			rarray.push($LI.getFirstElement(e,r[i]));
		}
	}

	return rarray;
}

// Display request status //
$LI.stateAlert = function (details) {
	state = new Array(
		'Request is not initialized',
		'Request has been set up',
		'Request has been sent',
		'Request is in process',
		'Request is complete'
	);
	
	if ($LIcfg.reportAJAX) $LI.report(state[details.readyState]);
}
$LI.loadAlert = function (details) {}

// Fade/slide element in and out (element, duration[seconds],target_height) //
function fadeIn(e,dur,target) {
	clearInterval(e.faderIID);
	e.faderOp = 0;
	e.panelPos = 0;
	e.target = target;
	e.style.height = '0px';
	e.style.display = 'block';
	e.countout = $LIcfg.fadeSteps;
	e.faderIID = setInterval(function(e){
		e.faderOp += (1/$LIcfg.fadeSteps);
		e.panelPos += (e.target/$LIcfg.fadeSteps)
		e.style.height = e.panelPos + 'px';
		if (e.faderOp >= 1 || e.countout-- <= 0) {
			clearInterval(e.faderIID);
		}
	}, (dur*1000/$LIcfg.fadeSteps), e);
}

function fadeOut(e,dur) {
	clearInterval(e.faderIID);
	e.faderOp = 1;
	e.panelHeight = e.clientHeight;
	e.panelPos = e.panelHeight;
	e.style.display = 'block';
	e.countout = $LIcfg.fadeSteps;
	e.faderIID = setInterval(function(e){
		e.style.height = e.panelPos + 'px';
		document.body.style.marginbottom = e.panelPos + 'px';
		e.faderOp -= (1/$LIcfg.fadeSteps);
		e.panelPos -= (e.panelHeight/$LIcfg.fadeSteps)
		if (e.faderOp <= 0 || e.countout-- <= 0) {
			clearInterval(e.faderIID);
			e.style.display = 'none';
		}
	}, (dur*1000/$LIcfg.fadeSteps), e);
}


// Set global events listeners //
// Toggle LI client panel visibility //
$LI.lastKeyCode = false;
d.addEventListener('keyup', function(e){
	$LI.lastKeyCode = (e.keyCode > 18) ? e.keyCode : $LI.lastKeyCode;
	$LI.togglePanel(e);
}, false);

$LI.togglePanel = function (e) {
	// Key Alt+L Alt+K (not Alt+Ctrl+L/K as that would interfere with international character keyboard mapping) //
	if ((e.keyCode == 76 || e.keyCode == 75) && e.altKey && !e.ctrlKey) {
	
		// Check for existing main panel //
		if ($LI.mainPanel) {} else {
			// Insert User Interface into page //
			buildUI();
			// Display version in status //
			$LI.report('Little Island Client version ' + $LIcfg.version);
		}
	
		// Check panel visibility //
		if ($LI.mainPanel.style.display != 'block') {
		
			// Check for debugging //
			if ($LIcfg.debug) {$LI.debug.style.display = 'block';}
		
			// Is this the first time? //
			if (!$LI.thisNode) {
			
				// Check node status //
				$LI.getNode(true);
			}
			
			// Make sure Little Island panel is on top of the stacking order //
			var nodelist = d.childNodes;
			var maxZI = 0;
			var nodes = new Array();
			// Turn the nodelist into a normal array //
			for (i = 0; i < nodelist.length; i++) {nodes[i] = nodelist[i];}
			if (nodes.length) {
				while (n = nodes.shift()) {
					maxZI = (n.style && n.style.zIndex > maxZI) ? n.style.zIndex : maxZI;
					var cns = n.childNodes;
					if (cns && cns.length) {
						for (i in cns) nodes.push(cns[i]);
					}
				}
			}
			$LI.mainPanel.style.zIndex = maxZI+1;
			
			// Display Little Island panel with default-max to current content area height //
			$LI.panelHeight = $LI.getData('panelheight', $LIcfg.panelHeight);
			if (e.keyCode == 75) {
				$LI.panelHeight = $LIcfg.minPanelHeight;
			} else {
				$LIcfg.panelHeight = (window.innerHeight < $LI.panelHeight) ? window.innerHeight : $LI.panelHeight;
			}
			$LI.mainDisplay.style.height = ($LI.panelHeight-($LIcfg.minPanelHeight+4))+'px';
			fadeIn($LI.mainPanel,0.5, $LI.panelHeight);
			
		} else {
		
			// Check for debugging //
			$LI.debug.style.display = 'none';
		
			// Hide Little Island panel //
			fadeOut($LI.mainPanel,0.5);
		}
	}
}

$LI.toggleNormal = function() {$LI.togglePanel({keyCode:76,altKey:true,ctrlKey:false});}
$LI.toggleMinimal = function() {$LI.togglePanel({keyCode:75,altKey:true,ctrlKey:false});}
GM_registerMenuCommand("Little Island Client", $LI.toggleNormal);
GM_registerMenuCommand('Little Island Client (min)', $LI.toggleMinimal);

// Convert internal charcater encoded string to UTF-8 encoded string (unescaped).
// This is intended for measurment and bitwise processing only.
// If inserted into web page the string will appear as mojibake regardless of the page's encoding.
$LI.chr = function (v){return String.fromCharCode(v);}
$LI.toUTF8 = function (s){
	var ns = '';
	for (i = 0; i < s.length; i++) {
		var o = s.charCodeAt(i);
		// Pick up second character in case of UTF-16 surrogate pair //
		var os = (i < s.length) ? s.charCodeAt(i+1) : 0;
		if (o<128) {
			// Encode 1-byte UTF-8 (ASCII) //
			ns += $LI.chr(o);
		} else if (o<2048) {
			// Encode 2-byte UTF-8 //
			ns += $LI.chr(((o>>6)&31)|192);		// 1st byte //
			ns += $LI.chr((o&63)|128);			// 2nd byte //
		} else if ((o&55296)==55296&&(os&56320)==56320) {
			// Decode 2-byte UTF-16 surrogate pair to unicode value //
			o = ((o&10239)<<10|os&9215)+65536;
			// Encode 4-byte UTF-8 //
			ns += $LI.chr(((o>>24)&63)|240);	// 1st byte //
			ns += $LI.chr(((o>>12)&63)|128);	// 2nd byte //
			ns += $LI.chr(((o>>6)&63)|128);		// 3rd byte //
			ns += $LI.chr((o&63)|128);			// 4th byte //
			i++;
		} else {
			// Encode 3-byte UTF-8 //
			ns += $LI.chr(((o>>12)&63)|224);	// 1st byte //
			ns += $LI.chr(((o>>6)&63)|128);		// 2nd byte //
			ns += $LI.chr((o&63)|128);			// 3rd byte //
		}
	}
	return ns;
}

$LI.md5 = function(str){return md5_hex($LI.toUTF8(str));}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. 
 * MD5 Message Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 *
 * Modified for use in the Little Island Client greasemonkey script by David O'Farrell 2009.
 */

md5_hex = function(str) {
	// Convert an 8-bit character string to a sequence of 16-word blocks, stored
	// as an array, and append appropriate padding for MD4/5 calculation.
	// If any of the characters are >255, the high byte is silently ignored //
	var nblk = ((str.length + 8) >> 6) + 1; // number of 16-word blocks
	var bin = new Array(nblk * 16);
	for(var i = 0; i < nblk * 16; i++) {bin[i] = 0;}
	for(var i = 0; i < str.length; i++) {bin[i>>2] |= (str.charCodeAt(i) & 0xFF) << ((i%4) * 8);}
	bin[i>>2] |= 0x80 << ((i%4) * 8);
	bin[nblk*16-2] = str.length * 8;
	
	// Calculate the MD5 of an array of little-endian words, producing an array of little-endian words//
	var a =  1732584193; var b = -271733879;
	var c = -1732584194; var d =  271733878;

	for(i = 0; i < bin.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = ff(a, b, c, d, bin[i+ 0], 7 , -680876936);
		d = ff(d, a, b, c, bin[i+ 1], 12, -389564586);
		c = ff(c, d, a, b, bin[i+ 2], 17,  606105819);
		b = ff(b, c, d, a, bin[i+ 3], 22, -1044525330);
		a = ff(a, b, c, d, bin[i+ 4], 7 , -176418897);
		d = ff(d, a, b, c, bin[i+ 5], 12,  1200080426);
		c = ff(c, d, a, b, bin[i+ 6], 17, -1473231341);
		b = ff(b, c, d, a, bin[i+ 7], 22, -45705983);
		a = ff(a, b, c, d, bin[i+ 8], 7 ,  1770035416);
		d = ff(d, a, b, c, bin[i+ 9], 12, -1958414417);
		c = ff(c, d, a, b, bin[i+10], 17, -42063);
		b = ff(b, c, d, a, bin[i+11], 22, -1990404162);
		a = ff(a, b, c, d, bin[i+12], 7 ,  1804603682);
		d = ff(d, a, b, c, bin[i+13], 12, -40341101);
		c = ff(c, d, a, b, bin[i+14], 17, -1502002290);
		b = ff(b, c, d, a, bin[i+15], 22,  1236535329);

		a = gg(a, b, c, d, bin[i+ 1], 5 , -165796510);
		d = gg(d, a, b, c, bin[i+ 6], 9 , -1069501632);
		c = gg(c, d, a, b, bin[i+11], 14,  643717713);
		b = gg(b, c, d, a, bin[i+ 0], 20, -373897302);
		a = gg(a, b, c, d, bin[i+ 5], 5 , -701558691);
		d = gg(d, a, b, c, bin[i+10], 9 ,  38016083);
		c = gg(c, d, a, b, bin[i+15], 14, -660478335);
		b = gg(b, c, d, a, bin[i+ 4], 20, -405537848);
		a = gg(a, b, c, d, bin[i+ 9], 5 ,  568446438);
		d = gg(d, a, b, c, bin[i+14], 9 , -1019803690);
		c = gg(c, d, a, b, bin[i+ 3], 14, -187363961);
		b = gg(b, c, d, a, bin[i+ 8], 20,  1163531501);
		a = gg(a, b, c, d, bin[i+13], 5 , -1444681467);
		d = gg(d, a, b, c, bin[i+ 2], 9 , -51403784);
		c = gg(c, d, a, b, bin[i+ 7], 14,  1735328473);
		b = gg(b, c, d, a, bin[i+12], 20, -1926607734);

		a = hh(a, b, c, d, bin[i+ 5], 4 , -378558);
		d = hh(d, a, b, c, bin[i+ 8], 11, -2022574463);
		c = hh(c, d, a, b, bin[i+11], 16,  1839030562);
		b = hh(b, c, d, a, bin[i+14], 23, -35309556);
		a = hh(a, b, c, d, bin[i+ 1], 4 , -1530992060);
		d = hh(d, a, b, c, bin[i+ 4], 11,  1272893353);
		c = hh(c, d, a, b, bin[i+ 7], 16, -155497632);
		b = hh(b, c, d, a, bin[i+10], 23, -1094730640);
		a = hh(a, b, c, d, bin[i+13], 4 ,  681279174);
		d = hh(d, a, b, c, bin[i+ 0], 11, -358537222);
		c = hh(c, d, a, b, bin[i+ 3], 16, -722521979);
		b = hh(b, c, d, a, bin[i+ 6], 23,  76029189);
		a = hh(a, b, c, d, bin[i+ 9], 4 , -640364487);
		d = hh(d, a, b, c, bin[i+12], 11, -421815835);
		c = hh(c, d, a, b, bin[i+15], 16,  530742520);
		b = hh(b, c, d, a, bin[i+ 2], 23, -995338651);

		a = ii(a, b, c, d, bin[i+ 0], 6 , -198630844);
		d = ii(d, a, b, c, bin[i+ 7], 10,  1126891415);
		c = ii(c, d, a, b, bin[i+14], 15, -1416354905);
		b = ii(b, c, d, a, bin[i+ 5], 21, -57434055);
		a = ii(a, b, c, d, bin[i+12], 6 ,  1700485571);
		d = ii(d, a, b, c, bin[i+ 3], 10, -1894986606);
		c = ii(c, d, a, b, bin[i+10], 15, -1051523);
		b = ii(b, c, d, a, bin[i+ 1], 21, -2054922799);
		a = ii(a, b, c, d, bin[i+ 8], 6 ,  1873313359);
		d = ii(d, a, b, c, bin[i+15], 10, -30611744);
		c = ii(c, d, a, b, bin[i+ 6], 15, -1560198380);
		b = ii(b, c, d, a, bin[i+13], 21,  1309151649);
		a = ii(a, b, c, d, bin[i+ 4], 6 , -145523070);
		d = ii(d, a, b, c, bin[i+11], 10, -1120210379);
		c = ii(c, d, a, b, bin[i+ 2], 15,  718787259);
		b = ii(b, c, d, a, bin[i+ 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	newbin = [a, b, c, d];
	
	// Convert an array of little-endian words to a hex string //
	var hex_tab = "0123456789abcdef";
	var hexstr = "";
	for(var i = 0; i < newbin.length * 4; i++) {
		hexstr += hex_tab.charAt((newbin[i>>2] >> ((i%4)*8+4)) & 0xF);
		hexstr += hex_tab.charAt((newbin[i>>2] >> ((i%4)*8)) & 0xF);
	}
	
	// Finish //
	return hexstr;
	
	// Functions //
	
	// Add integers, wrapping at 2^32. This uses 16-bit operations internally to work around bugs in some JS interpreters //
	function safe_add(x,y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	// Bitwise rotate a 32-bit number to the left //
	function rol(num,cnt) {return (num << cnt) | (num >>> (32 - cnt))}
	// These functions implement the four basic operations the algorithm uses //
	function cmn(q, a, b, x, s, t) {return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)}
	function ff(a, b, c, d, x, s, t) {return cmn((b & c) | ((~b) & d), a, b, x, s, t)}
	function gg(a, b, c, d, x, s, t) {return cmn((b & d) | (c & (~d)), a, b, x, s, t)}
	function hh(a, b, c, d, x, s, t) {return cmn(b ^ c ^ d, a, b, x, s, t)}
	function ii(a, b, c, d, x, s, t) {return cmn(c ^ (b | (~d)), a, b, x, s, t)}
}