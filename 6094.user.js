// Add SABnzbd functionality to Newzbin V3
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/

// Version 1.7
// Changes from v1.6.6
//		New queue display method, IMPORTANT! see QUEUE_CODE section below changelog
//		Fixed some special character errors for marking posts
//		Added +Script options for SABnnzbdPlus users, thanks to popcornarsonist on the forums
// Changes from v1.6.5
//		Added support for "show related posts" on report pages
// Changes from v1.6.4
//		Added preference for what SAB page clicking the SabTab opens.
//		Fixed "Similar reports"/More.. list so they get SAB options.. 
// Changes from v1.6.3
//		1-click hover over now says "Add to SAB" to help new users identify them
//		Fixed popups so they don't fade along with marked titles
// Changes from v1.6.2
//		Marks posts from Newzbin .nzb file downloads (if default name kept)
//		Added Marked Title Opacity to SabTab prefs panel
// Changes from v1.6.1
//		Can now add posts from nfo pages, https sites are included by default
//		Fixed bug after post was added from post page, worked but caused script error
// Changes from v1.6
//		Fixed issues with international characters, requires GM 0.6.8.20070314 or later
// Changes from v1.5.1
//		Added "Mark downloaded/queued" options, also works dynamically when adding report to SAB
//		Fixed problem with some lister options and the 1-click confirm dialog
//		Fixed clicking SabTab Tab opens in new window, also goes to Queue instead of home (submenu still 'broken')
// Changes from v1.5
//		Fixed Pause/Resume bug when not using SAB Data
// Changes from v1.4
//		Added Preferences dialog
//		added support for "none" post processing
// Changes from v1.3.1
//		Added support for SAB login, Remove SAB Login details from browser under SABTab -> Config -> Clear Login
// Changes from v1.3
//		Fixed ADD confirmation prompt after V3 change
// Changes from v1.22
//		Added Queue popout on menu, Default: off.
// Changes from v1.2
//		changed code to use xpath, should be more reliable and perhaps quicker
//		changed method of moveNewzbinMenu
// Changes from v1.1
//		added option to change green completion checkmark into Add to SAB link with 
//			 optional confirmation dialog
//		updated HTML to add to main.tmpl
// Changes from v1.0
// 		"Add ..." menu now available on all pages, get's check posts in lists
// 		"Add to SAB" link placed by "all | range | invert | none" checkbox selectors
//		Gave non-SABData users the dynamic Pause menu option
//		Fixed bug that had Newzbin show "Add ..." submenu when leaving/returning to page
//		Added feedback to SABTab to indicate adding a post
//		Fixed small CSS error when moveNewzbinMenu is enabled
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          SABTab for Newzbin 
// @namespace     Yarble's scripts
// @description   Adds links to SABnzbd pages to Newzbin V3's main tab menu
// @include       http://v3.newzbin.com/*
// @include       https://v3.newzbin.com/*
// @include       http://www.newzxxx.com/*
// @include       https://www.newzxxx.com/*

// QUEUE_CODE

// SAB TAB WILL NOW ONLY DISPLAY THE QUEUE TABLE UNDER THE MENU IF IT HAS ATTRIBUTE id="SAB_Standard_Queue_Table"

// To use the queue display in Sab Tab you have to add this code to the Queue Table in the DEFAULT queue.tmpl file. 
// DO NOT ADD THIS TO A CUSTOM TEMPLATE! In some cases this could cause problems for Newzbin and result in you being IP banned.
// Check discussion at http://cheap-forums.com/newzbin/index.php/topic,505 for more details

/* The results should look something like this,at around line 30 of the queue.tmpl template

<!--#if $varExists('slotinfo')#-->
    <table id="SAB_Standard_Queue_Table">

*/

// SAB DATA CODE HERE
// UPDATE: This code is already included in the standard template of SABnzbd 0.2.5 and later
//
// For full fuctionality this script needs SABnzbd's main page to provide some labeled data. 
// Specifically HTML inside a div ID=='SABData' to update the SAB tab and the word Paused (if SAB is paused, not case sensitive)
//
// Insert the following lines of HTML into the <body> section of main.tmpl, located in the SABnzbd's 'templates' directory.

/* < Start cut after this line >

## remove decimals from speed, queue sizes 
		<!--#set $kbpersecrnd = str(int(float($kbpersec)))#-->
		<!--#set $mbleftrnd = str(int(float($mbleft)))#-->
		<!--#set $mbrnd = str(int(float($mb)))#-->
	<div id='SABData' style='visibility: hidden'>
		      <b>&nbsp;SAB:</b> <!--#if $paused then "<blink><b>PAUSED</b></blink>" else $kbpersecrnd + " kb/s"#--> <b>Q:</b> $mbleftrnd/$mbrnd MB<b>&nbsp; Comp:</b> $diskspace2 GB 
  </div>
  
// < Stop cut >  */

// ==/UserScript==

// Load stored preferences
var SABLocation = GM_getValue("SABLocation", "http://127.0.0.1:8080");
var useSABData = GM_getValue("useSABData", false);
var SABDataReloadInterval = GM_getValue("SABDataReloadInterval", 30); // in seconds
var SABAddDefault = GM_getValue("SABAddDefault", 3);
var putSABTabFirst = GM_getValue("putSABTabFirst", false);
var useSABQueue = GM_getValue("useSABQueue", false);
var moveNewzbinMenu = GM_getValue("moveNewzbinMenu", false);
var use1ClickSABAdd = GM_getValue("use1ClickSABAdd", true);
var confirmAdd = GM_getValue("confirmAdd", true);
var markDownloaded = GM_getValue("markDownloaded", false);
var markQueued = GM_getValue("markQueued", false);
var markOpacity = GM_getValue("markOpacity", 5);
var defaultSabtabURL = GM_getValue("defaultSabtabURL", "/sabnzbd/");
var useSABPlus = GM_getValue("useSABPlus", false);

// Global variable to determine if SAB is running. Needed because GM_xmlhttpRequest is buggy when server doesn't respond.
var SABRunning = false;
// Global variable to determine if we are on a post page/nfo page
var postPage = ((unescape(location.href).indexOf("browse/post/")!=-1 && unescape(location.href).indexOf("/similar/")==-1 ) || unescape(location.href).indexOf("nfo/view/"))!=-1?1:-1;

// Load uname/pwd for SAB server
var tmpSABuname = GM_getValue("SABuname");
var tmpSABpwd = GM_getValue("SABpwd");

// These are Newzbin fuctions/vars needed to make the new menu tab work
var CSSMenu = unsafeWindow.CSSMenu;
var menuList = unsafeWindow.menuList;
var menuCount = unsafeWindow.Count;


(function (){
	if (moveNewzbinMenu) {
		document.getElementById("mnMain").style.margin = '0 0 0 15px';
	}
	
	SABMenu();
	if( !GM_getValue("SABLocation", false))GetSABTabPrefs();

	if(document.getElementById('PostActions') || document.getElementById("ShowRelatedPosts")){		
		var inlineCheckers = document.evaluate( // add Add to SAB links at top and bottom of lists
    	'//UL[@class="inline checking"]',
    	document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < inlineCheckers.snapshotLength; i++) {
	  	var trSABAdder = document.createElement("li");
	  	trSABAdder.innerHTML = '<a title="Add checked posts to SAB queue" href="javascript:void(null)">Add to SAB</a>'
	  	inlineCheckers.snapshotItem(i).appendChild(trSABAdder);
	  	trSABAdder.addEventListener('click', function(){SABAdder();}, false);
		}		
		if(use1ClickSABAdd){ // change green checkmarks to SABAdd links for post
			var postTableRows = document.evaluate( // Get postid{} Inputs and green checkmarks's A tag
    		'//TD/A/IMG[@alt = "Completed"]/../../preceding-sibling::TD/INPUT[@type = "checkbox" and @name = "postid[]"] | //INPUT[@type = "checkbox" and @name = "postid[]"]/../following-sibling::TD/A/IMG[@alt = "Completed"]/..',
    		document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   		if(!postTableRows.snapshotLength){ // didn't find green, maybe using attr in tables view
   			postTableRows = document.evaluate( // Get postid{} Inputs and green checkmarks's A tag
    		'//TD/A/IMG[@alt = "Completed"]/../../../preceding-sibling::TR/TD/INPUT[@type = "checkbox" and @name = "postid[]"] | //INPUT[@type = "checkbox" and @name = "postid[]"]/../../following-sibling::TR/TD/A/IMG[@alt = "Completed"]/..',
    		document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    	}
   		for (var i = 0; i < postTableRows.snapshotLength; i++) { // Add postid to href and addevent for link
    		var postInput = postTableRows.snapshotItem(i);
    		i++;
    		var postAddLink = postTableRows.snapshotItem(i);
    		var postNumber = postInput.getAttribute("value");
    		postAddLink.setAttribute("href","javascript: void(" + postNumber + ")");
 		   	postAddLink.getElementsByTagName("IMG")[0].setAttribute("title","Add to SAB");
    		postAddLink.addEventListener('click', SABAddLink, false); 					
			}
		}
		
		if(markDownloaded || markQueued){
		var popups = document.evaluate( 		// Find Titles, check agains SABHistory and mark if found
    					'//div[@class="nfo_pane popup"] | //div[@class="popup"] | //div[@class="popup popup_fixed_size"]',
    					document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for(i=0; i<popups.snapshotLength;i++) {
				var thePopup=popups.snapshotItem(i);
				var theParent= thePopup.parentNode;
				theParent.removeChild(thePopup);
				var theTbodies = document.evaluate( 		
    					'ancestor::TBODY',
    					theParent, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    		if(theTbodies.snapshotLength>0)theTbodies.snapshotItem(0).appendChild(thePopup);
			}
		}
		if(markDownloaded){	  // Get SAB History, call function to mark downloaded lists
			GM_xmlhttpRequest({
				method: 'GET',
				url: SABLocation +'/sabnzbd/history',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
				},
				overrideMimeType: 'text/plain; charset=ISO-8859-1',
				onload: function(responseDetails) {
					var SABStatus_out = document.getElementById('SABStatus_out');
					if (responseDetails.status == 200){
						if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
						var titleIndex="";
						responseDetails.responseText.replace(/([^>]*?)(?=\.nzb)/g, function(matchstr){titleIndex+=matchstr;});
						titleIndex=titleIndex.replace(/&/g,"&amp;"); 
						GM_log("titleIndex: " + titleIndex);
						var reportTitles = document.evaluate( 		// Find Titles, check against SABHistory and mark if found
    					'//TD[@class="title"]/A[last()] | //TD[@class="title"]/STRONG/A[last()]',
    					document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    				for (var i = reportTitles.snapshotLength-1; i >= 0 ; i--) {
    					GM_log(reportTitles.snapshotItem(i).innerHTML.replace(/\||\*|<|>|\?|\'|\/| |:/g,"_"));
							if(titleIndex.indexOf(reportTitles.snapshotItem(i).innerHTML.replace(/\||\*|<|>|\?|\'|\/| |:/g,"_")) != -1 || titleIndex.indexOf(reportTitles.snapshotItem(i).innerHTML.replace(/\||\*|<|>|\?|\/|:/g,"_")) != -1){														
								var targetRows = document.evaluate( // find parent row to grey out
							    'ancestor::TBODY/TR/TD',
							    reportTitles.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
								for(j=0;j<targetRows.snapshotLength;j++) { 
									targetRows.snapshotItem(j).style.opacity = markOpacity*0.1;
								}
							}
						}
					}
					else{
						SABStatus_out.innerHTML = "SAB History not found";
					}
				}
			});
		}
		
		if(markQueued){  // Get SAB Queue, call function to grey out matches
			GM_xmlhttpRequest({
				method: 'GET',
				url: SABLocation +'/sabnzbd/queue',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
				},
				overrideMimeType: 'text/plain; charset=ISO-8859-1',
				onload: function(responseDetails) {
					var SABStatus_out = document.getElementById('SABStatus_out');
					if (responseDetails.status == 200){
						if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
						var titleIndex="";
						responseDetails.responseText.replace(/([^>]*?)(?=\.nzb)/g, function(matchstr){titleIndex+=matchstr;}); 
						titleIndex=titleIndex.replace(/&/g,"&amp;"); 
						var reportTitles = document.evaluate( 		// Find titles, check agains SABQueue and mark if found
    					'//TD[@class="title"]/A[last()] | //TD[@class="title"]/STRONG/A[last()]',
    					document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    				for (var i = 0; i < reportTitles.snapshotLength; i++) {
							if(titleIndex.indexOf(reportTitles.snapshotItem(i).innerHTML.replace(/\||\*|<|>|\?|\'|\/| |:/g,"_")) != -1 || titleIndex.indexOf(reportTitles.snapshotItem(i).innerHTML.replace(/\||\*|<|>|\?|\/|:/g,"_")) != -1){														
								var targetRows = document.evaluate( // find parent row to grey out
							    'ancestor::TBODY/TR/TD',
							    reportTitles.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
								for(j=0;j<targetRows.snapshotLength;j++) { 
									targetRows.snapshotItem(j).style.opacity = markOpacity*0.1;
								}
							}
						}
					}
					else{
						SABStatus_out.innerHTML = "SAB Queue not found";
					}
				}
			});
		}
	}
})();

// Dialog to get SABTab preferences
function GetSABTabPrefs(){
	document.getElementById("mnSABConfig").blur();
	document.getElementById("mnSABConfig").style.visibility = "hidden";
	document.getElementById("mnSAB").blur();
	document.getElementById("mnSAB").style.visibility = "hidden";

	if(document.getElementById("SABPrefs")){document.body.removeChild(document.getElementById("SABPrefs"));	}
	else{
		var SABPrefs = document.createElement('div');
		SABPrefs.id = "SABPrefs";
		var SABStyle = window.getComputedStyle(document.getElementById("mnSAB"),"");
    with( SABPrefs.style ){
	    position = 'fixed';
	    top = '0px';
	    zIndex = '1000';
	    backgroundColor = SABStyle.backgroundColor;
	    border = SABStyle.border;
	    padding = '15px';
	    textAlign = 'right';
	    font = '8pt sans-serif';
	    width = '240px';
	    margin = window.innerHeight/2 - 170 +'px auto auto 40%';		    	
	  }
		var SABPrefsForm ='<form action="/sabnzbd/" method="POST"><center><b><H2>SABTab Preferences</H2></b><hr></center><br>SAB Address : <input title="Location of your SABnzbd server" id="SABLocation" type="text" name="SABLocation" value='+SABLocation+' ><br >';

		SABPrefsForm +='<br>SabTab\'s URL: <select title="Page to open when clicking the SabTab" id="defaultSabtabURL" type="text" name="defaultSabtabURL">\n<option value="/sabnzbd/" ';
		SABPrefsForm +=(defaultSabtabURL=="/sabnzbd/")? 'selected>Home</option>\n<option value= "/sabnzbd/queue/"' : '>Home</option>\n<option value= "/sabnzbd/queue/" ';
		SABPrefsForm +=(defaultSabtabURL=="/sabnzbd/queue/")? 'selected>Queue</option>\n<option value= "/sabnzbd/history/"' : ' >Queue</option>\n<option value= "/sabnzbd/history/" ';
		SABPrefsForm +=(defaultSabtabURL=="/sabnzbd/history/")? 'selected>History</option>\n</select><br>' : ' >History</option>\n</select><br>'

		SABPrefsForm +='<br>Put SABTab first? <input title="Put SABTab as the left most menu tab" id="putSABTabFirst" type="checkbox" name="putSABTabFirst" ';
		SABPrefsForm +=putSABTabFirst? 'checked/>':'/>'; 
		SABPrefsForm +='<br><br />Shift Newzbin Menu Left? <input title="Move whole Newzbin menu over to left to make room for SAB data" id="moveNewzbinMenu" type="checkbox" name="moveNewzbinMenu" ';
		SABPrefsForm +=moveNewzbinMenu? 'checked/>':'/>';
		SABPrefsForm +='<br><br />Use active SAB Queue? <input title="Use pop out SAB Queue in the Queue menu item" id="useSABQueue" type="checkbox" name="useSABQueue" ';
		SABPrefsForm +=useSABQueue? 'checked/>':'/>';
		SABPrefsForm +='<br /><br>Use SAB Data on tab? <input title="Display SAB Data in tab" id="useSABData" type="checkbox" name="useSABData" ';
		SABPrefsForm +=useSABData? 'checked/>':'/>';
		SABPrefsForm +='<br><br/>SAB Data Refresh Interval: <input title="Refresh interval in seconds for SABTab Data stats" id="SABDataReloadInterval" type="text" size=2 name="SABDataReloadInterval" value='+SABDataReloadInterval+' /> Secs<br>';
		SABPrefsForm +='<br>Default Add: <select title="Default method when adding post to SAB queue" name="SABAddDefault" id="SABAddDefault"><option value="0"';
		SABPrefsForm += (SABAddDefault==0)? 'selected>None</option><option value="1"' : '>None</option><option value="1"';
		SABPrefsForm += (SABAddDefault==1)? 'selected>+Repair</option><option value="2"' : '>+Repair</option><option value="2"';
		SABPrefsForm += (SABAddDefault==2)? 'selected>+Unpack</option><option value="3"' : '>+Unpack</option><option value="3"';
		if(!useSABPlus) SABPrefsForm += (SABAddDefault==3 )? 'selected>+Delete</option></select>' : '>+Delete</option></select>';
		else{
			SABPrefsForm += (SABAddDefault==3)? 'selected>+Delete</option><option value="4"' : '>+Delete</option><option value="4"';
			SABPrefsForm += (SABAddDefault==4)? 'selected>+Repair+S</option><option value="5"' : '>+Repair+S</option><option value="5"';
			SABPrefsForm += (SABAddDefault==5)? 'selected>+Unpack+S</option><option value="6"' : '>+Unpack+S</option><option value="6"';
			SABPrefsForm += (SABAddDefault==6)? 'selected>+Delete+S</option></select>' : '>+Delete+S</option></select>';
		}
		SABPrefsForm +='<br><br />Add 1-click Links? <input title="Changes Complete icon (green checkmark) to 1-click link for adding post to SAB" id="use1ClickSABAdd" type="checkbox" name="use1ClickSABAdd" ';
		SABPrefsForm +=	use1ClickSABAdd? 'checked/>':'/>';
		SABPrefsForm +='<br><br />Confirm 1-Click adds? <input title="Use confirmation dialog when clicking 1-click link" id="confirmAdd" type="checkbox" name="confirmAdd" ';
		SABPrefsForm +=	confirmAdd? 'checked />':'/>';
		
		SABPrefsForm +='<br><br />Mark Downloaded Titles? <input title="Fades titles that are in your SAB History" id="markDownloaded" type="checkbox" name="markDownloaded" ';
		SABPrefsForm +=	markDownloaded? 'checked />':'/>';
		
		SABPrefsForm +='<br><br />Mark Queued Titles? <input title="Fades titles that are in your SAB Queue" id="markQueued" type="checkbox" name="markQueued" ';
		SABPrefsForm +=	markQueued? 'checked />':'/>';
		
		SABPrefsForm +='<br><br>Marked Title Fade Level: <select title="0=invisible, 10 = no change" name="markOpacity" id="markOpacity"><option value="0"';
		SABPrefsForm += (markOpacity==0)? 'selected>0</option><option value="1"' : '>0</option><option value="1"';
		SABPrefsForm += (markOpacity==1)? 'selected>1</option><option value="2"' : '>1</option><option value="2"';
		SABPrefsForm += (markOpacity==2)? 'selected>2</option><option value="3"' : '>2</option><option value="3"';
		SABPrefsForm += (markOpacity==3)? 'selected>3</option><option value="4"' : '>3</option><option value="4"';
		SABPrefsForm += (markOpacity==4)? 'selected>4</option><option value="5"' : '>4</option><option value="5"';
		SABPrefsForm += (markOpacity==5)? 'selected>5</option><option value="6"' : '>5</option><option value="6"';
		SABPrefsForm += (markOpacity==6)? 'selected>6</option><option value="7"' : '>6</option><option value="7"';
		SABPrefsForm += (markOpacity==7)? 'selected>7</option><option value="8"' : '>7</option><option value="8"';
		SABPrefsForm += (markOpacity==8)? 'selected>8</option><option value="9"' : '>8</option><option value="9"';
		SABPrefsForm += (markOpacity==9)? 'selected>9</option><option value="10"' : '>9</option><option value="10"';
		SABPrefsForm += (markOpacity==10)? 'selected>10</option></select>' : '>10</option></select>';
		
		SABPrefsForm +='<br><br />Use SABPlus? <input title="Gives extra download options for SABnzbdPlus users" id="useSABPlus" type="checkbox" name="useSABPlus" ';
		SABPrefsForm +=	useSABPlus? 'checked />':'/>';
		
				
		SABPrefsForm +='<br><br><center><input id="SABPrefsSubmit" value="Apply" type="button" /> <input value="Reset" type="reset" /> <input id="DefaultSABTabPrefs" value="Defaults" type="button"/>';
		if(GM_getValue("SABLocation", false))SABPrefsForm +=' <input id="SABPrefsCancel" value="Cancel" type="button" />';
		SABPrefsForm +='</center></form>';
		SABPrefs.innerHTML = SABPrefsForm;
		document.body.appendChild(SABPrefs);
		document.getElementById("SABPrefsSubmit").addEventListener('click', SetSABTabPrefs, false);
		document.getElementById("DefaultSABTabPrefs").addEventListener('click', DefaultSABTabPrefs, false);
		document.getElementById("useSABData").addEventListener('click', function(){if(!useSABData && document.getElementById("useSABData").checked) {if(!confirm('You have enabled "use SAB Data". In order for this to work you need to insert some\n code into SAB\'s main.tmpl file. See script source for the code.'))document.getElementById("useSABData").checked=false;}}, false);
		document.getElementById("useSABQueue").addEventListener('click', function(){if(!useSABQueue && document.getElementById("useSABQueue").checked) {if(!confirm('You have enabled "active SAB Queue". In order for this to work you need to insert some\n code into SAB\'s queue.tmpl file. See script source for the code.'))document.getElementById("useSABQueue").checked=false;}}, false);
		if(GM_getValue("SABLocation", false))document.getElementById("SABPrefsCancel").addEventListener('click', function(){document.body.removeChild(document.getElementById("SABPrefs"));}, false);
	}
	
}
// Submit the SABTab preferences form
function SetSABTabPrefs(){
	GM_setValue("SABLocation",document.getElementById("SABLocation").value);
	GM_setValue("defaultSabtabURL",document.getElementById("defaultSabtabURL").value);
	GM_setValue("putSABTabFirst",document.getElementById("putSABTabFirst").checked);
	GM_setValue("moveNewzbinMenu",document.getElementById("moveNewzbinMenu").checked);
	GM_setValue("useSABData",document.getElementById("useSABData").checked);
	GM_setValue("useSABQueue",document.getElementById("useSABQueue").checked);
	GM_setValue("SABDataReloadInterval",document.getElementById("SABDataReloadInterval").value); 
	GM_setValue("SABAddDefault",document.getElementById("SABAddDefault").value);	
	GM_setValue("use1ClickSABAdd",document.getElementById("use1ClickSABAdd").checked);
	GM_setValue("confirmAdd",document.getElementById("confirmAdd").checked);
	GM_setValue("markDownloaded",document.getElementById("markDownloaded").checked);
	GM_setValue("markQueued",document.getElementById("markQueued").checked);
	GM_setValue("markOpacity",document.getElementById("markOpacity").value);
	GM_setValue("useSABPlus",document.getElementById("useSABPlus").checked);
	document.getElementById("SABPrefs").style.visibility = "hidden";
	window.location.reload();
}

// Sets default settings in SABTab prefs form
function DefaultSABTabPrefs(){
	document.getElementById("SABLocation").value="http://127.0.0.1:8080";
	document.getElementById("defaultSabtabURL").value="/sabnzbd/";
	document.getElementById("putSABTabFirst").checked=false;
	document.getElementById("moveNewzbinMenu").checked=false;
	document.getElementById("useSABData").checked=false;
	document.getElementById("useSABQueue").checked=false;
	document.getElementById("SABDataReloadInterval").value=30; 
	document.getElementById("SABAddDefault").value=3;
	document.getElementById("use1ClickSABAdd").checked=true;
	document.getElementById("confirmAdd").checked=true;
	document.getElementById("markDownloaded").checked=false;
	document.getElementById("markQueued").checked=false;
	document.getElementById("markOpacity").value=5;
	document.getElementById("useSABPlus").checked=false;
	
}

// Gets event from clicking on green checkmark, gets PostID, title and calls SABAdder
function SABAddLink(evt){ 
	var postId= evt.currentTarget.href.substring(17, evt.currentTarget.href.length - 1);
	if(confirmAdd){
		var allElems = document.evaluate(
	    '../following-sibling::TD[@class="title"]/A | ../../preceding-sibling::TR/TD[@class="title"]/A | ancestor::TBODY/TR/TD[@class="title"]/STRONG/A[last()]',
	    evt.currentTarget, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	if(allElems.snapshotLength) {
   		var titleLink = allElems.snapshotItem(allElems.snapshotLength -1);
   		if(confirm("Add post: " + titleLink.innerHTML + "\nto the SAB queue?")) SABAdder(postId);
   	}
   	else {if(confirm("Could not find post title, try to add post: " + postId + "\nto the SAB queue anyway?")) SABAdder(postId);}
	}	
	else SABAdder(postId);
}

// Adds SABTab to Newzbin menu, sets up links for menu and optional stats updating
function SABMenu(){
	var postNumber = null;
	if( postPage != -1) { // If post page, just use URL, othwise it's nfo page, check for link to post and use that URL
		if(unescape(location.href).indexOf("browse/post/")!=-1) postNumber = unescape(location.href).substring(unescape(location.href).indexOf("browse/post/")+12, unescape(location.href).indexOf("browse/post/")+19);
		else {
			var postLinks = document.evaluate('//A[@title="View the details of this Report"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (postLinks.snapshotLength)postNumber = unescape(postLinks.snapshotItem(0).href).substring(postLinks.snapshotItem(0).href.length-8, postLinks.snapshotItem(0).href.length-1);
		}
	}
		
// Create SAB tab 
	var mainMenu = document.getElementById("mnMain");
	var SABStatusTab = document.createElement("li");
	var SABStatus = document.createElement("a");
	SABStatus.id = "SABStatus_out";
	SABStatus.href = "javascript:void(null);";
	SABStatus.addEventListener('click',function () {document.getElementById("mnSAB").blur();	document.getElementById("mnSAB").style.visibility = "hidden";window.open(SABLocation + defaultSabtabURL); }, false);
	if (useSABData) {SABStatus.innerHTML='Checking SABnzbd Status ...';}
	else {SABStatus.innerHTML='SABTab';}
	
		
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
		SABAddMenu.innerHTML = '<li><a id="SABAddNone" href="javascript:void(null)">None</a></li>';	
		SABAddMenu.innerHTML += '<li><a id="SABAddRepair" href="javascript:void(null)">Repair</a></li>';
		SABAddMenu.innerHTML += '<li><a id="SABAddUnpack" href="javascript:void(null)">... and Unpack</a></li>';
		SABAddMenu.innerHTML += '<li><a id="SABAddDelete" href="javascript:void(null)">... and Delete RARs</a></li>';
		if(useSABPlus){
			SABAddMenu.innerHTML += '<li><a id="SABAddRepairPlus" href="javascript:void(null)">Repair+S</a></li>';
			SABAddMenu.innerHTML += '<li><a id="SABAddUnpackPlus" href="javascript:void(null)">... and Unpack+S</a></li>';
			SABAddMenu.innerHTML += '<li><a id="SABAddDeletePlus" href="javascript:void(null)">... and Delete RARs+S</a></li>';
		}
	
// create rest of menu
	SABSubMenu.innerHTML+='<li><a id="SABPause" href="javascript:void(null)">Pause</a></li><li>';
	SABSubMenu.innerHTML+='<li><a id = "trSABQueue" onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/queue">Queue</a></li> <li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/history">History</a></li><li class="parent"> <a onclick="javascript:this.blur();" id = "trSABConfig" target="_blank" href="' + SABLocation + '/sabnzbd/config/">Config</a></li><li> <a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/connections">Connections</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/shutdown">Shutdown</a></li>';
	
// Add SAB Config Submenu to menu scheme
	var SABConfigMenu = document.createElement("ul");
	SABConfigMenu.id = "mnSABConfig";
	SABConfigMenu.className = "tabMenu";
	SABConfigMenu.innerHTML='<li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/general">General</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/directories">Directories</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/switches">Switches</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/server">Servers</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/scheduling">Scheduling</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/config/rss">RSS</a></li><li><a id="trGetSABTabPrefs"onclick="javascript:this.blur();" target="_self" href="javascript:void(null)">SABTab Prefs</a></li><li><a id="trSABlogin"onclick="javascript:this.blur();" target="_self" href="javascript:void(null)">Clear Login</a></li>';	

// Created Queue popup	
	var SABQueue = document.createElement("ul");
	SABQueue.id = "mnSABQueue";
	SABQueue.className = "tabMenu";
	SABQueue.style.width = 'auto';
	SABQueue.innerHTML = "Updating Queue ....";
	
	var SABQueueHidden = document.createElement("table");
	SABQueueHidden.id = "SABQueueHidden";
	SABQueueHidden.style.display = 'none';
	SABQueueHidden.innerHTML = "Updating Queue ....";
	
// Add Sabtab and submenus to document
	SABStatusTab.appendChild(SABStatus);
	
	if(putSABTabFirst) mainMenu.insertBefore( SABStatusTab, mainMenu.getElementsByTagName("li")[0])
	else mainMenu.appendChild(SABStatusTab);
	
	divHeader.appendChild(SABSubMenu);
	divHeader.appendChild(SABConfigMenu);
	divHeader.appendChild(SABAddMenu);

	
// Hookup menu links to functions
	document.getElementById("trSABAdd").addEventListener('click', function (){SABAdder(postNumber); document.getElementById("trSABAdd").blur();}, false);
	document.getElementById("SABAddNone").addEventListener('click', function (){SABAdder(postNumber, 0)}, false);
	document.getElementById("SABAddRepair").addEventListener('click', function (){SABAdder(postNumber, 1)}, false);
	document.getElementById("SABAddUnpack").addEventListener('click', function (){SABAdder(postNumber, 2)}, false);
	document.getElementById("SABAddDelete").addEventListener('click', function (){SABAdder(postNumber, 3 )}, false);
	if(useSABPlus){
		document.getElementById("SABAddRepairPlus").addEventListener('click', function (){SABAdder(postNumber, 4)}, false);
		document.getElementById("SABAddUnpackPlus").addEventListener('click', function (){SABAdder(postNumber, 5)}, false);
		document.getElementById("SABAddDeletePlus").addEventListener('click', function (){SABAdder(postNumber, 6 )}, false);
	}
	document.getElementById("SABPause").addEventListener('click', SABPauser, false);
	document.getElementById("trSABlogin").addEventListener('click', clearSABLogin, false);
	document.getElementById("trGetSABTabPrefs").addEventListener('click', GetSABTabPrefs, false);
	
	
	
// Add menu and subs to Newzbin's CSSMenu function 
	menuList[menuCount++] = new CSSMenu("mnSAB", "SABStatus_out");
	menuList[menuCount++] = new CSSMenu("mnSABConfig", "trSABConfig","mnSAB");
	menuList[menuCount++] = new CSSMenu("mnSABAdd", "trSABAdd","mnSAB");
	
	
// stuff to do only if dynamic Queue list is enabled	
	if(useSABQueue){
	var SABQueue = document.createElement("ul");
	SABQueue.id = "mnSABQueue";
	SABQueue.className = "tabMenu";
	SABQueue.style.width = 'auto';
	SABQueue.innerHTML = "Updating Queue ....";
	
	var SABQueueHidden = document.createElement("table");
	SABQueueHidden.id = "SABQueueHidden";
	SABQueueHidden.style.display = 'none';
	SABQueueHidden.innerHTML = "Updating Queue ....";
	
	divHeader.appendChild(SABQueue);
	document.body.appendChild(SABQueueHidden);
	
	document.getElementById("trSABQueue").parentNode.className = 'parent';
	document.getElementById("trSABQueue").addEventListener('mouseover', GetSABQueue, false);
	menuList[menuCount++] = new CSSMenu("mnSABQueue", "trSABQueue","mnSAB");
	}
	
	
	//Poll SAB for data and setup scheduled reload
	if (useSABData){
		GetSABData();
		if(SABDataReloadInterval>0) {window.setInterval(GetSABData, SABDataReloadInterval * 1000);}
	}
}

// Login to SAB
function SABLogin (){
	if(!(tmpSABuname && tmpSABpwd)){
		// No storprompt for SAB U/P
		if(document.getElementById("SABLoginForm")){
			document.getElementById("SABLoginForm").style.visibility = "visible";
		}
		else{
			var SABLoginPrompt = document.createElement('div');
			SABLoginPrompt.id = "SABLoginForm";
			var SABStyle = window.getComputedStyle(document.getElementById("mnSAB"),"");
	    with( SABLoginPrompt.style ){
		    position = 'fixed';
		    top = '0px';
		    zIndex = '1000';
		    backgroundColor = SABStyle.backgroundColor;
		    border = SABStyle.border;
		    padding = '5px';
		    textAlign = 'center';
		    font = '8pt sans-serif';
		    width = '240px';
		    margin = window.innerHeight/2 - 50 +'px auto auto 40%';		    	
		  }
			SABLoginPrompt.innerHTML='<form action="/sabnzbd/" method="POST"><center><b><H2>SAB Login</H2></b><hr><br>Username : <input id="SABuname" type="text" name="ma_username" /><br />Password: <input id="SABpwd" type="password" name="ma_password" /><br/><br><input id="saveSABuname" type="checkbox"> Remember Login<br><br><input id="SABLoginSubmit" value="Login" type="button" /> <input value="Reset" type="reset" /> <input id="SABLoginCancel" value="Cancel" type="button" /></center></form>';
			document.body.appendChild(SABLoginPrompt);
			document.getElementById("SABLoginSubmit").addEventListener('click', SetSABLogin, false);
			document.getElementById("SABLoginCancel").addEventListener('click', function(){document.getElementById("SABLoginForm").style.visibility = "hidden";}, false);
		}
	}
	else{
		GM_xmlhttpRequest({
			method: 'POST',
			url: SABLocation + "/sabnzbd/",
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
				'Content-type': 'application/x-www-form-urlencoded',
			},
			data: "ma_username=" + tmpSABuname + "&ma_password=" + tmpSABpwd,
			onload: function(responseDetails) {
				if (responseDetails.status == 200 && responseDetails.responseText.indexOf("<title>Login</title>")!= -1){
					// Login failed, reset U/P and try again
					GM_setValue("SABuname", "");
					GM_setValue("SABpwd", "");
					tmpSABuname = "";
					tmpSABpwd = "";
					SABLogin();
				}
				else GetSABData();
			}	
		});
		
	}
	
}

// called as the login form's submit method
function SetSABLogin(){
	//alert("setting login");
	tmpSABuname = document.getElementById("SABuname").value;
	tmpSABpwd = document.getElementById("SABpwd").value
	if(document.getElementById("saveSABuname").checked){
		GM_setValue("SABuname", tmpSABuname);
		GM_setValue("SABpwd", tmpSABpwd);
	}
	else{
		GM_setValue("SABuname", "");
		GM_setValue("SABpwd", "");
	}
	document.getElementById("SABLoginForm").style.visibility = "hidden";
	SABLogin();
}

// Removes SAB login details from data store
function clearSABLogin(){
	GM_setValue("SABuname", "");
	GM_setValue("SABpwd", "");
	document.getElementById("mnSABConfig").blur();
	document.getElementById("mnSABConfig").style.visibility = "hidden";
	document.getElementById("mnSAB").blur();
	document.getElementById("mnSAB").style.visibility = "hidden";
}

// Adds a post(s) to the SAB queue, if no post given looks for checked posts in lists to add
function SABAdder (postNumber, argAddType) {
	var addType = ( argAddType==undefined)? SABAddDefault : argAddType;
	
	document.getElementById("mnSABAdd").blur();
	document.getElementById("mnSABAdd").style.visibility = "hidden";
	document.getElementById("mnSAB").blur();
	document.getElementById("mnSAB").style.visibility = "hidden";
	if (postNumber) {
		//GM_log("add Post: " + postNumber + " Type: " + addType);
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/addID?pp=' + addType + '&id=' + postNumber,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABStatus_out = document.getElementById('SABStatus_out');
				if (responseDetails.status == 200){
					if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();

					if(document.getElementById('sz'+ postNumber)){
						var targetRows = document.evaluate( // Find parent row to grey out
				    'ancestor::TBODY/TR/TD', document.getElementById('sz'+ postNumber), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					for(j=0;j<targetRows.snapshotLength;j++) { 
									targetRows.snapshotItem(j).style.opacity = markOpacity*0.1;
								}
					}
					var SABHome = document.createElement('span');
					SABHome.innerHTML = responseDetails.responseText;
					checkSABadd:
					for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
						if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
							SABStatus_out.innerHTML = "Added Post: " + postNumber + " to Queue";
							setTimeout(GetSABData, 3000);
							break checkSABadd;
						}
						else{
							SABStatus_out.innerHTML = "SAB Data not available";
						}
					}	
				}
				else{
					SABStatus_out.innerHTML = "SAB Data not available";
				}
			}
		});
	}
	else {  // if not on a post page, look for checked posts
		var checkBoxPosts = document.evaluate( // add Add to SAB links at top and bottom of lists
    	'//INPUT[@type = "checkbox" and @name = "postid[]"]',
    	document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < checkBoxPosts.snapshotLength; i++) {
			if(checkBoxPosts.snapshotItem(i).checked) SABAdder(checkBoxPosts.snapshotItem(i).getAttribute("value"), addType);
		}
	}
}	

// Pauses/Resumes SAB and updates SAB Status Tab
// Checks current content of "pause"/"resume" link to determine action
function SABPauser (event) {
	this.blur();
	if(document.getElementById("SABPause").innerHTML == "Resume"){GetSABData("resume");}
	else {GetSABData("pause");}
}


// Gets SAB main page and updates SAB Status Tab with results
// also scans result for word 'paused' to determine if SAB is paused 
function GetSABData(SABPage){
	  var SABPAGE = "";
	  if (typeof SABPage == 'string') {SABPAGE=SABPage;}
		//GM_log('fetching ' + SABLocation +'/sabnzbd/' + SABPAGE);
		
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
					if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
					SABRunning = true;
					var SABHome = document.createElement('span');
					if(useSABData){
						SABHome.innerHTML = responseDetails.responseText;
						findSABData:
						for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
							if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
								SABStatus_out.innerHTML = SABHome.getElementsByTagName('div')[i].innerHTML;
								break findSABData;
							}
							else{
								SABStatus_out.innerHTML = "SAB Data not available";
							}
						}
					}
					else{
						SABStatus_out.innerHTML ="SABTab";				
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
					SABStatus_out.innerHTML = "SAB unavailable";
				}
				SABRunning = false;
			}
		});
}

// On mouseover 'Queue' fetches SAB Queue and displays as submenu 
function GetSABQueue(){
	  var SABPAGE = SABLocation + '/sabnzbd/queue/'
	  document.getElementById("mnSABQueue").innerHTML = "Fecthing Queue...";		
		GM_xmlhttpRequest({
		method: 'GET',
		url: SABPAGE,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		overrideMimeType: 'text/plain; charset=ISO-8859-1',
		onload: function(responseDetails) {
			if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
			var SABPage_out = document.getElementById("mnSABQueue");
			if(responseDetails.status == 200){
				SABRunning = true;
				var SABQueueHidden = document.getElementById("SABQueueHidden");
				var SABBody = document.createElement('div');
				var SABQue = document.createElement('div');
				SABQue.innerHTML = "Cannot find SAB Queue Table";
				if(SABPage_out){
					SABBody.innerHTML = responseDetails.responseText.replace(/BODY[\s]*?>/gi,"div id='SABBody'>");
					for (var j = 0; j < SABBody.getElementsByTagName('table').length; j++){
						if (SABBody.getElementsByTagName('table')[j].id == "SAB_Standard_Queue_Table"){
							SABQueueHidden.innerHTML = SABBody.getElementsByTagName('table')[j].innerHTML;	
							SABQue.innerHTML = "";
							SABQueLinks = SABQueueHidden.getElementsByTagName('a');
							for(var i = 0; i < SABQueLinks.length; i++) {
								SABQueLinks[i].href = SABLocation + '/sabnzbd/queue/';
								SABQueLinks[i].target = "_blank";
							}
							postTableData = document.evaluate( 
				    		'descendant::TD/A/.. | descendant::TD[@class="pre"]',
				    		SABQueueHidden, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			    		for(var i = 0; i<postTableData.snapshotLength; i++){
			    			var SABQueRow = document.createElement('TR');
			    			SABQue.appendChild(SABQueRow);
			    			SABQueRow.appendChild(postTableData.snapshotItem(i++));
			    			SABQueRow.appendChild(postTableData.snapshotItem(i));
			    		}
			    	}	 
	    		}   		
	    		SABPage_out.innerHTML = "";
	    		SABPage_out.appendChild(SABQue);
	    		}				
				else{
					GM_log("SAB Page output space not found");				
				}
			}					
		},
		onerror: function(responseDetails) { 
			GM_log('SABnzbd response error');
			var SABStatus_out = document.getElementById('mnSABQueue');
			SABStatus_out.innerHTML = "SAB Data not available";
			},
	});
}




