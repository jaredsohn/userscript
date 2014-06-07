// Add SABnzbd tab to Newzbin V3
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Changes from v1.0
// "Add ..." menu now available on all pages, get's check posts in lists
// "Add to SAB" link placed by "all | range | invert | none" checkbox selectors
// Gave non-SABData users the dynamic Pause menu option
// Fixed bug that had Newzbin show "Add ..." submenu when leaving/returning to page
// Added feedback to SAB Tab to indicate adding a post
// Fixed small CSS error when moveNewzbinMenu is enabled
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Add SABnzbd tabs to Newzbin V3 v1.1
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
// Specifically HTML inside a div ID=='SABData' to update the SAB tab and the word Paused (if SAB is paused, not case sensitive)
//
// Insert the following lines of HTML into the <body> section of main.tmpl, located in the SABnzbd's 'templates' directory.

/* < Start cut after this line >

<div id='SABData'>
      <b>&nbsp;SAB:</b> <!--#if $paused then "<blink><b>PAUSED</b></blink>" else $kbpersec+ " kb/s"#--> <b>Q:</b> $mbleft/$mb MB<b>&nbsp; Down:</b> $diskspace1 GB <b>Comp:</b> $diskspace2 GB 
 </div>
  
// < Stop cut >  */

// Refresh interval for SAB Tab stats. Default = 30, 0 = off
var SABDataReloadInterval = 30; // in seconds

// Default method when adding post to SAB queue. 1=Repair, 2=Unpack, 3= Delete rar/zip
// If you click on "add to Queue" on main SAB menu, or any add to SAB link this method will be used 
var SABAddDefault = 3;

// Move whole Newzbin menu over to left, to make room for SAB data, useful for smaller screens.
// Default = false
var moveNewzbinMenu = false;

//
// End User Options 



// Global variable to determine if SAB is running. Needed because GM_xmlhttpRequest is buggy when server doesn't respond.
var SABRunning = false;
// Global variable to determine if we are on a post page
var postPage = unescape(location.href).indexOf("browse/post/");

// These are Newzbin fuctions/vars needed to make the new menu tab work
var CSSMenu = unsafeWindow.CSSMenu;
var menuList = unsafeWindow.menuList;
var menuCount = unsafeWindow.Count;


(function (){
	SABMenu();
	if(postPage == -1){
		var pageLists = document.getElementsByTagName("ul");
		for (var i = 0; i < pageLists.length; i++) {
		  if(pageLists[i].className == 'inline checking'){
		  	var trSABAdder = document.createElement("li");
		  	trSABAdder.innerHTML = '<a title="Add checked posts to SAB queue" href="javascript:void(null)">Add to SAB</a>'
		  	pageLists[i].appendChild(trSABAdder);
		  	trSABAdder.addEventListener('click', function(){SABAdder();}, false);
		  	}
		}
	}
	
	
})();


function SABMenu(){
	var postNumber = null;
	if( postPage != -1) { postNumber = unescape(location.href).substring(postPage + 12, postPage +19);}
	if (moveNewzbinMenu) {addGlobalStyle('div#header ul.freakytab {margin: 0 0 0 15px ! important; }');}

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

// Create "add post" option and sub menu
		SABSubMenu.innerHTML = '<li class="parent"><a id="trSABAdd" href="javascript:void(null)">Add to Queue</a></li>';
		var SABAddMenu = document.createElement("ul");
		SABAddMenu.id = "mnSABAdd";
		SABAddMenu.className = "tabMenu";		
		SABAddMenu.innerHTML = '<li><a id="SABAddRepair" href="javascript:void(null)">Repair</a></li>';
		SABAddMenu.innerHTML += '<li><a id="SABAddUnpack" href="javascript:void(null)">... and Unpack</a></li>';
		SABAddMenu.innerHTML += '<li><a id="SABAddDelete" href="javascript:void(null)">... and Delete RARs</a></li>';
	
// create rest of menu
	SABSubMenu.innerHTML+='<li><a id="SABPause" href="javascript:void(null)">Pause</a></li><li>';
	//else {SABSubMenu.innerHTML+='<li><a target="_blank" id="SABPause" href="' + SABLocation + '/sabnzbd/pause">Pause</a></li><li><li><a target="_blank" href="' + SABLocation + '/sabnzbd/resume">Resume</a></li>';}
	SABSubMenu.innerHTML+='<li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/queue">Queue</a></li> <li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/history">History</a></li><li class="parent"> <a onclick="javascript:this.blur();" id = "trSABConfig" target="_blank" href="' + SABLocation + '/sabnzbd/config/">Config</a></li><li> <a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/connections">Connections</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/shutdown">Shutdown</a></li>';

// Attach SAB main menu
	divHeader.appendChild(SABSubMenu);
	menuList[menuCount++] = new CSSMenu("mnSAB", "SABStatus_out");
	
// Add SAB Config Submenu to menu scheme
	var SABConfigMenu = document.createElement("ul");
	SABConfigMenu.id = "mnSABConfig";
	SABConfigMenu.className = "tabMenu";
	SABConfigMenu.innerHTML='<li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/general">General</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/directories">Directories</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/switches">Switches</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/server">Servers</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/scheduling">Scheduling</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/rss">RSS</a></li>';	
	divHeader.appendChild(SABConfigMenu);
	menuList[menuCount++] = new CSSMenu("mnSABConfig", "trSABConfig","mnSAB");
	
// Add SAB "Add ..." submenu and link actions
	divHeader.appendChild(SABAddMenu);
	document.getElementById("trSABAdd").addEventListener('click', function (){SABAdder(postNumber); document.getElementById("trSABAdd").blur();}, false);
	document.getElementById("SABAddRepair").addEventListener('click', function (){SABAdder(postNumber, 1)}, false);
	document.getElementById("SABAddUnpack").addEventListener('click', function (){SABAdder(postNumber, 2)}, false);
	document.getElementById("SABAddDelete").addEventListener('click', function (){SABAdder(postNumber, 3 )}, false);
	menuList[menuCount++] = new CSSMenu("mnSABAdd", "trSABAdd","mnSAB");

	// Attach dynamic Pause button
	document.getElementById("SABPause").addEventListener('click', SABPauser, false);
	
	//Poll SAB for data and setup scheduled reload
	if (useSABData){
		GetSABData();
		if(SABDataReloadInterval>0) {window.setInterval(GetSABData, SABDataReloadInterval * 1000);}
	}
}


// Adds a post(s) to the SAB queue
function SABAdder (postNumber, addType) {
	var addType = addType || SABAddDefault;
	
	document.getElementById("mnSABAdd").blur();
	document.getElementById("mnSABAdd").style.visibility = "hidden";
	document.getElementById("mnSAB").blur();
	document.getElementById("mnSAB").style.visibility = "hidden";


	if (postNumber) {
		GM_log("add Post: " + postNumber + " Type: " + addType);
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/addID?pp=' + addType + '&id=' + postNumber,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABStatus_out = document.getElementById('SABStatus_out');
				if (useSABData && responseDetails.status == 200){
					var SABHome = document.createElement('span');
					SABHome.innerHTML = responseDetails.responseText;
										for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
						if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
							SABStatus_out.innerHTML = "Added Post: " + postNumber + " to Queue";
							setTimeout(GetSABData, 3000);
							i=9999999999;
						}
						else{
							SABStatus_out.innerHTML = "SAB Data not available";
						}
					}	
				}
				else if (responseDetails.status==200){
					SABStatus_out.innerHTML = "Added Post: " + postNumber + " to Queue";
					setTimeout(function () {document.getElementById('SABStatus_out').innerHTML='SAB Tab';}, 3000);
				}
				else{
					SABStatus_out.innerHTML = "SAB Data not available";
				}
			}
		});
	}
	else {// if not on a post page, check for checked posts
		
	var pageTableRows = document.getElementsByTagName("tr");

	for(var i = 0; i<pageTableRows.length;i++){
		var trInputs =pageTableRows[i].getElementsByTagName("input");
		for(var j = 0; j<trInputs.length;j++){
			if(trInputs[j].getAttribute("type") == 'checkbox' && trInputs[j].getAttribute("name") == 'postid[]' && trInputs[j].checked){
				SABAdder(trInputs[j].getAttribute("value"), addType);
			}
		}
		
	}

	}
}	

// Pauses/Resumes SAB and updates SAB Status Tab
// Looks for any element ID == "SABIsPaused" in current SAB Status to determine if SAB is paused

function SABPauser (event) {
	this.blur();
	if(document.getElementById("SABPause").innerHTML == "Resume"){GetSABData("resume");}
	else {GetSABData("pause");}
}


// Gets SAB main page and updates SAB Status Tab with results
function GetSABData(SABPage){
	  var SABPAGE = "";
	  if (typeof SABPage == 'string') {SABPAGE=SABPage;}
		GM_log('fetching ' + SABLocation +'/sabnzbd/' + SABPAGE);
		GM_xmlhttpRequest({
		method: 'GET',
		url: SABLocation +'/sabnzbd/' + SABPAGE,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		onload: function(responseDetails) {
			var SABStatus_out = document.getElementById('SABStatus_out');
			if(responseDetails.status == 200){
				SABRunning = true;
				var SABHome = document.createElement('span');
				if(useSABData){
					SABHome.innerHTML = responseDetails.responseText;
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
				else{
					SABStatus_out.innerHTML ="SAB Tab";				
				}
					if(responseDetails.responseText.toUpperCase().indexOf("PAUSED") != -1){
					document.getElementById("SABPause").innerHTML="Resume";
				}
				else{
					document.getElementById("SABPause").innerHTML="Pause";
				}
			}
			else{
				SABStatus_out.innerHTML = "SAB invalid response";
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
				SABStatus_out.innerHTML = "SAB not responding";
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





