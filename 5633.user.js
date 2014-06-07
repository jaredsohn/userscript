// Add SABnzbd tab to Newzbin V3
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Add SABnzbd tabs to Newzbin V3 v1.0
// @namespace     Yarble's scripts
// @description   Adds links to SABnzbd pages to Newzbin V3's main tab menu
// @include       http://v3.newzbin.com/*
// @include       http://www.newzxxx.com/*



// ==/UserScript==

//
// User Customizable Options

// Location of your SABnzbd server, Default: http://127.0.0.1:8080
var SABLocation = "http://127.0.0.1:8080";

// Use SAB Data in tab, if you enable this be sure to insert the code below into main.tmpl
var useSABData = false;

// For full fuctionality this script needs SABnzbd's main page to provide some labeled data. 
// Specifically HTML inside a div ID=='SABData' to update the SAB tab and any element inside that div with ID=='SABIsPaused' (if SAB is paused)
//
// Insert the following lines of HTML into the <body> section of main.tmpl, located in the SABnzbd's 'templates' directory.
// 
/* < Start cut after this line >

<div id='SABData'>
      <b>&nbsp;SABnzbd:</b> <!--#if $paused then "<blink><b id='SABIsPaused'>PAUSED</b></blink>" else $kbpersec+ " kb/s"#--> <b>Q:</b> $mbleft/$mb MB<b>&nbsp; Down:</b> $diskspace1 GB <b>Comp:</b> $diskspace2 GB 
 </div>
  
// < Stop cut >  */

// Refresh interval for SAB Tab stats. Default = 30, 0= off
var SABDataReloadInterval = 30; // in seconds

// Default method when adding post to SAB queue. 1=Repair, 2=Unpack, 3= Delete rar/zip
// If you click on "add post to Queue" on main SAB menu, this method will be used 
var SABAddDefault = 3;

// Move whole Newzbin menu over to left, to make room for SAB data, useful for smaller screens.
// Default = false
var moveNewzbinMenu = false;

//
// End User Options


// Global variable to determine if SAB is running. Needed because GM_xmlhttpRequest is buggy when server doesn't respond.
var SABRunning = false;

// These are Newzbin fuctions needed to make the new menu tab work
var CSSMenu = unsafeWindow.CSSMenu;
var menuList = unsafeWindow.menuList;
var menuCount = unsafeWindow.Count;

(function (){
	var postPage = unescape(location.href).indexOf("browse/post/");
	var postNumber = -1;
	if (moveNewzbinMenu) {addGlobalStyle('div#header ul.freakytab {margin: 0 0 0 15px;}! important; }');}

// Add our SAB tab to main menu
	var mainMenu = document.getElementById("mnMain");
	var SABStatusTab = document.createElement("li");
	var SABStatus = document.createElement("a");
		SABStatus.id = "SABStatus_out";
		SABStatus.href = SABLocation + '/sabnzbd/';
		SABStatus.target = '_blank';
		if (useSABData) {SABStatus.innerHTML='Checking SABnzbd Status ...';}
		else {SABStatus.innerHTML='SAB Tab';}
	SABStatusTab.appendChild(SABStatus);
	mainMenu.appendChild(SABStatusTab);
		
// Create our SAB menu to the SAB tab
	var divHeader = document.getElementById("header");
	var SABSubMenu = document.createElement("ul");
	SABSubMenu.id = "mnSAB";
	SABSubMenu.className = "tabMenu";
	SABSubMenu.innerHTML='';

// If this is a post page, create "add post" option and sub menu
	if(postPage != -1) {
		postNumber = unescape(location.href).substring(postPage + 12, postPage +19);	
		SABSubMenu.innerHTML = '<li class="parent"><a id="trSABAdd" href="javascript:void(null)">Add Post to Queue</a></li>';
		var SABAddMenu = document.createElement("ul");
		SABAddMenu.id = "mnSABAdd";
		SABAddMenu.className = "tabMenu";		
		SABAddMenu.innerHTML = '<li><a id="SABAddRepair" href="javascript:void(null)">Repair</a></li>';
		SABAddMenu.innerHTML += '<li><a id="SABAddUnpack" href="javascript:void(null)">... and Unpack</a></li>';
		SABAddMenu.innerHTML += '<li><a id="SABAddDelete" href="javascript:void(null)">... and Delete RARs</a></li>';
	}
// create rest of menu
	if(useSABData) {SABSubMenu.innerHTML+='<li><a id="SABPause" href="javascript:null(void);">Pause</a></li><li>';}
	else {SABSubMenu.innerHTML+='<li><a target="_blank" id="SABPause" href="' + SABLocation + '/sabnzbd/pause">Pause</a></li><li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/Resume">Resume</a></li>';}
	SABSubMenu.innerHTML+='<li><a target="_blank" href="' + SABLocation + '/sabnzbd/queue">Queue</a></li> <li><a target="_blank" href="' + SABLocation + '/sabnzbd/history">History</a></li><li class="parent"> <a id = "trSABConfig"  target="_blank" href="' + SABLocation + '/sabnzbd/config">Config</a></li><li> <a target="_blank" href="' + SABLocation + '/sabnzbd/connections">Connections</a></li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/shutdown">Shutdown</a></li>';

// Attach SAB main menu
	divHeader.appendChild(SABSubMenu);
	menuList[menuCount++] = new CSSMenu("mnSAB", "SABStatus_out");
	
// Add SAB Config Submenu to menu scheme
	var SABConfigMenu = document.createElement("ul");
	SABConfigMenu.id = "mnSABConfig";
	SABConfigMenu.className = "tabMenu";
	SABConfigMenu.innerHTML='<li><a target="_blank" href="' + SABLocation + '/sabnzbd/config/general">General</a></li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/config/directories">Directories</a></li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/config/switches">Switches</a></li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/config/server">Servers</a></li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/config/scheduling">Scheduling</a></li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/config/rss">RSS</a></li>';	
	divHeader.appendChild(SABConfigMenu);
	menuList[menuCount++] = new CSSMenu("mnSABConfig", "trSABConfig","mnSAB");
	
	
	
	
	// If on an individual post page, add "add post" submenu and attach functionality
	if(postPage != -1){
		divHeader.appendChild(SABAddMenu);
		document.getElementById("trSABAdd").addEventListener('click', function (){SABAdder(SABAddDefault, postNumber)}, false);
		document.getElementById("SABAddRepair").addEventListener('click', function (){SABAdder(1, postNumber)}, false);
		document.getElementById("SABAddUnpack").addEventListener('click', function (){SABAdder(2, postNumber)}, false);
		document.getElementById("SABAddDelete").addEventListener('click', function (){SABAdder(3, postNumber)}, false);
		menuList[menuCount++] = new CSSMenu("mnSABAdd", "trSABAdd","mnSAB");
	}
	
	// Attach dynamic Pause button, Poll SAB for data and setup scheduled reload
	if (useSABData){
	document.getElementById("SABPause").addEventListener('click', SABPauser, false);
	getSABData();
	if(SABDataReloadInterval>0) {window.setInterval(getSABData, SABDataReloadInterval * 1000);}
	}
})();


// Adds a post to the SAB queue
function SABAdder (addType, postNumber) {
	if (addType && postNumber ) {
		//alert("post number:" + postNumber + " added to queue. Method: " + addType );
		document.getElementById("mnSAB").style.visibility = "hidden";
		document.getElementById("mnSABAdd").style.visibility = "hidden";
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/addID?pp=' + addType + '&id=' + postNumber,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				if (useSABData){
					var SABHome = document.createElement('span');
					SABHome.innerHTML = responseDetails.responseText;
					var SABStatus_out = document.getElementById('SABStatus_out');
					for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
						if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
							SABStatus_out.innerHTML = SABHome.getElementsByTagName('div')[i].innerHTML;
							i=9999999999;
						}
						else{
							SABStatus_out.innerHTML = "SAB Data not available";
						}
					}	
				}
			}
		
		});
	}
	else GM_log("null post add to SABnzbd attempted");
}	

// Pauses/Resumes SAB and updates SAB Status Tab
// Looks for any element ID == "SABIsPaused" in current SAB Status to determine if SAB is paused
function SABPauser (event) {
	event.preventDefault();
	event.stopPropagation();

	//alert("Paused");
	if(document.getElementById("SABIsPaused")){
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/resume',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABHome = document.createElement('span');
			SABHome.innerHTML = responseDetails.responseText;
			var SABStatus_out = document.getElementById('SABStatus_out');
							for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
					if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
						SABStatus_out.innerHTML = SABHome.getElementsByTagName('div')[i].innerHTML;
						i=9999999999;
					}
					else{
						SABStatus_out.innerHTML = "SAB Data not available";
					}
				}
			}
		});
		document.getElementById("SABPause").innerHTML="Pause";
	}	
	else{
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/pause',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABHome = document.createElement('span');
				SABHome.innerHTML = responseDetails.responseText;
				var SABStatus_out = document.getElementById('SABStatus_out');
				for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
					if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
						SABStatus_out.innerHTML = SABHome.getElementsByTagName('div')[i].innerHTML;
						i=9999999999;
					}
					else{
						SABStatus_out.innerHTML = "SAB Data not available";
					}
				}
			}
		});
		document.getElementById("SABPause").innerHTML="Resume";
	}
	
}

// Gets SAB main page and updates SAB Status Tab with results
function getSABData(SABresponseText){
		GM_xmlhttpRequest({
		method: 'GET',
		url: SABLocation +'/sabnzbd/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		onload: function(responseDetails) {
			if(responseDetails.status == 200){
				SABRunning = true;
				var SABHome = document.createElement('span');
				SABHome.innerHTML = responseDetails.responseText;
				var SABStatus_out = document.getElementById('SABStatus_out');
				for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
					if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
						SABStatus_out.innerHTML = SABHome.getElementsByTagName('div')[i].innerHTML;
						i=9999999999;
					}
					else{
						SABStatus_out.innerHTML = "SAB Data not available";
					}
				}
				if(document.getElementById("SABIsPaused")){
					document.getElementById("SABPause").innerHTML="Resume";
				}
				else{
					document.getElementById("SABPause").innerHTML="Pause";
				}
			}
			else{
				SABStatus_out.innerHTML = "SAB not responding";
			}
			
		},
		onerror: function(responseDetails) { 
			GM_log('SABnzbd response error');
			var SABStatus_out = document.getElementById('SABStatus_out');
			SABStatus_out.innerHTML = "SAB Data not available";
			},
		onreadystatechange: function(responseDetails) { 
			if(responseDetails.readyState == 2 && SABRunning == false){			
				var SABStatus_out = document.getElementById('SABStatus_out');
				SABStatus_out.innerHTML = "SAB Data not available";
			}
			SABRunning = false;
		}
	});
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



