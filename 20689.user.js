// Add SABnzbd functionality to Newzbin V3
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/

// Version 2.1
//
// Changes from v2.0.3
//		Added API Key function for SAB 0.4.9+, Thanks to Mako
//		Improved matching for fading queued/history titles
//		Removed (broken) option ot move the entire Newsbin menu to the left edge
// Changes from v2.0.2
//		Fixed compatibility issue with Firefox 3 final.
// Changes from v2.0.1
//		Fixed compatiblitiy issues with Firefox 3 (beta 4 at least), also improved security
// Changes from v2.0
//		updated Mark titles in SAB history method to work much better with long SAB histories
//		Fixed more special character errors for marking posts
// Changes from v1.7.1
//		Updated to use SABnzbPlus' API		
// Changes from v1.7
//		Fixed Queue/History report marking to work with SABnzbd+ 0.3.0 default template
//		Changed default SAB url to "http://localhost:8080" as using 127.0.0.1 instead may not work on some systems
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
// @name          SABTab2 for Newzbin
// @namespace     Yarble's scripts
// @description   Adds SABnzbdplus UI to Newzbin V3's main tab menu
// @include       http://v3.newzbin.com/*
// @include       https://v3.newzbin.com/*
// @include       http://www.newzbin.com/*
// @include       https://www.newzbin.com/*
// @include       http://newzbin.com/*
// @include       https://newzbin.com/*
// @include       http://www.newzxxx.com/*
// @include       https://www.newzxxx.com/*

// IMPORTANT! Requires SABnzbdplus version 0.3.0 or higher. 


// ==/UserScript==

// Load stored preferences
var SABLocation = GM_getValue("SABLocation", "http://localhost:8080");
var useSABData = GM_getValue("useSABData", false);
var SABDataReloadInterval = GM_getValue("SABDataReloadInterval", 30); // in seconds
var SABAddDefault = GM_getValue("SABAddDefault", 3);
var putSABTabFirst = GM_getValue("putSABTabFirst", false);
var useSABQueue = GM_getValue("useSABQueue", false);
var use1ClickSABAdd = GM_getValue("use1ClickSABAdd", true);
var confirmAdd = GM_getValue("confirmAdd", true);
var markDownloaded = GM_getValue("markDownloaded", false);
var markQueued = GM_getValue("markQueued", false);
var markOpacity = GM_getValue("markOpacity", 5);
var defaultSabtabURL = GM_getValue("defaultSabtabURL", "/sabnzbd/");
var useSABPlus = GM_getValue("useSABPlus", true);
var useAPIKey = GM_getValue("useAPIKey", false);
var APIKey = GM_getValue("APIKey", "");

// Global variable to determine if SAB is running. Needed because GM_xmlhttpRequest is buggy when server doesn't respond.
var SABRunning = 4;
// Global variable to determine if we are on a post page/nfo page
var postPage = ((unescape(location.href).indexOf("browse/post/")!=-1 && unescape(location.href).indexOf("/similar/")==-1 ) || unescape(location.href).indexOf("nfo/view/"))!=-1?1:-1;

// Load uname/pwd for SAB server
var tmpSABuname = GM_getValue("SABuname");
var tmpSABpwd = GM_getValue("SABpwd");

//JSON parser
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}


(function (){	
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
    		postAddLink.setAttribute("href","javascript:void(" + postNumber + ")");
 		   	postAddLink.getElementsByTagName("IMG")[0].setAttribute("title","Add to SAB");
    		postAddLink.addEventListener('click', SABAddLink, false); 					
			}
		}
		
		if(markDownloaded || markQueued){
		var popups = document.evaluate( 		// Need to rearrange nfo/info/comment popups so they don't get faded along with post
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
				url: SABLocation +'/sabnzbd/rss?mode=history' ,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
				},
				overrideMimeType: 'text/plain; charset=ISO-8859-1',
				onload: function(responseDetails) {
					var SABStatus_out = document.getElementById('SABStatus_out');
					if (responseDetails.status == 200){				
						if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();

						var titleIndexArray = new Array(); // Array with titles as index key for fast lookup
					  var parser = new DOMParser();
					  var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
      			var entries = dom.getElementsByTagName('title');
      			for (var t = 0; t< entries.length; t++) titleIndexArray[entries[t].textContent.replace(/\W/g,"_")]=1;
						var reportTitles = document.evaluate( 		// Find Titles, check against SABHistory and mark if found
    					'//TD[@class="title"]/A[last()] | //TD[@class="title"]/STRONG/A[last()]',
    					document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    				for (var i = reportTitles.snapshotLength-1; i >= 0 ; i--) {
							if(typeof titleIndexArray[reportTitles.snapshotItem(i).innerHTML.replace(/&amp;/g,"_").replace(/\W/g,"_")] != 'undefined'){														
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
				url: SABLocation + '/sabnzbd/api?mode=qstatus&output=json' + (useAPIKey?('&apikey=' + APIKey):''),
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
				},
				overrideMimeType: 'text/plain; charset=ISO-8859-1',
				onload: function(responseDetails) {
					var SABStatus_out = document.getElementById('SABStatus_out');
					if (responseDetails.status == 200){
						if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
						var titleIndexArray= new Array;
						var SABData = JSON.parse(responseDetails.responseText);
						for(var i=0; i<SABData.jobs.length; i++) titleIndexArray[SABData.jobs[i].filename.replace(/\W/g,"_")]=1;		
						var reportTitles = document.evaluate( 		// Find titles, check agains SABQueue and mark if found
    					'//TD[@class="title"]/A[last()] | //TD[@class="title"]/STRONG/A[last()]',
    					document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    				for (var i = 0; i < reportTitles.snapshotLength; i++) {
							if(typeof titleIndexArray[reportTitles.snapshotItem(i).innerHTML.replace(/&amp;/g,"_").replace(/\W/g,"_")] != 'undefined'){														
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
	    margin = window.innerHeight/2 - 250 +'px auto auto 40%';		    	
	  }
		var SABPrefsForm ='<form action="/sabnzbd/" method="POST"><center><b><H2>SABTab Preferences</H2></b><hr></center><br>SAB Address : <input title="Location of your SABnzbd server" id="SABLocation" type="text" name="SABLocation" value='+SABLocation+' ><br >';

		SABPrefsForm +='<br>SabTab\'s URL: <select title="Page to open when clicking the SabTab" id="defaultSabtabURL" type="text" name="defaultSabtabURL">\n<option value="/sabnzbd/" ';
		SABPrefsForm +=(defaultSabtabURL=="/sabnzbd/")? 'selected>Home</option>\n<option value= "/sabnzbd/queue/"' : '>Home</option>\n<option value= "/sabnzbd/queue/" ';
		SABPrefsForm +=(defaultSabtabURL=="/sabnzbd/queue/")? 'selected>Queue</option>\n<option value= "/sabnzbd/history/"' : ' >Queue</option>\n<option value= "/sabnzbd/history/" ';
		SABPrefsForm +=(defaultSabtabURL=="/sabnzbd/history/")? 'selected>History</option>\n</select><br>' : ' >History</option>\n</select><br>'

		SABPrefsForm +='<br>Put SABTab first? <input title="Put SABTab as the left most menu tab" id="putSABTabFirst" type="checkbox" name="putSABTabFirst" ';
		SABPrefsForm +=putSABTabFirst? 'checked/>':'/>'; 
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
		SABPrefsForm +='<br><br />Use API Key? <input title="Necessary for SabNZBd+ 0.4.9+" id="useAPIKey" type="checkbox" name="useAPIKey" onClick="this.checked?document.getElementById(&quot;APIKey&quot;).disabled=false:document.getElementById(&quot;APIKey&quot;).disabled=true; " ';
		SABPrefsForm +=	useAPIKey? 'checked />':'/>';
		SABPrefsForm += '<br><br />API Key : <input title="API Key" id="APIKey" type="text" name="APIKey" value='+APIKey;
		SABPrefsForm +=	useAPIKey?'><br >':' DISABLED><br >';;
		
				
		SABPrefsForm +='<br><br><center><input id="SABPrefsSubmit" value="Apply" type="button" /> <input value="Reset" type="reset" /> <input id="DefaultSABTabPrefs" value="Defaults" type="button"/>';
		if(GM_getValue("SABLocation", false))SABPrefsForm +=' <input id="SABPrefsCancel" value="Cancel" type="button" />';
		SABPrefsForm +='</center></form>';
		SABPrefs.innerHTML = SABPrefsForm;
		document.body.appendChild(SABPrefs);
		document.getElementById("SABPrefsSubmit").addEventListener('click', SetSABTabPrefs, false);
		document.getElementById("DefaultSABTabPrefs").addEventListener('click', DefaultSABTabPrefs, false);
		if(GM_getValue("SABLocation", false))document.getElementById("SABPrefsCancel").addEventListener('click', function(){document.body.removeChild(document.getElementById("SABPrefs"));}, false);
	}
	
}
// Submit the SABTab preferences form
function SetSABTabPrefs(){
	GM_setValue("SABLocation",document.getElementById("SABLocation").value);
	GM_setValue("defaultSabtabURL",document.getElementById("defaultSabtabURL").value);
	GM_setValue("putSABTabFirst",document.getElementById("putSABTabFirst").checked);
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
	GM_setValue("useAPIKey",document.getElementById("useAPIKey").checked);
	GM_setValue("APIKey",document.getElementById("APIKey").value);
	document.getElementById("SABPrefs").style.visibility = "hidden";
	window.location.reload();
}

// Sets default settings in SABTab prefs form
function DefaultSABTabPrefs(){
	document.getElementById("SABLocation").value="http://localhost:8080";
	document.getElementById("defaultSabtabURL").value="/sabnzbd/";
	document.getElementById("putSABTabFirst").checked=false;
	document.getElementById("useSABData").checked=false;
	document.getElementById("useSABQueue").checked=false;
	document.getElementById("SABDataReloadInterval").value=30; 
	document.getElementById("SABAddDefault").value=3;
	document.getElementById("use1ClickSABAdd").checked=true;
	document.getElementById("confirmAdd").checked=true;
	document.getElementById("markDownloaded").checked=false;
	document.getElementById("markQueued").checked=false;
	document.getElementById("markOpacity").value=5;
	document.getElementById("useSABPlus").checked=true;
	document.getElementById("useAPIKey").checked=false;
	document.getElementById("APIKey").value="";
	document.getElementById("APIKey").disabled=true;
	
}

// Gets event from clicking on green checkmark, gets PostID, title and calls SABAdder
function SABAddLink(evt){ 
	var postId= evt.currentTarget.href.match(/\d+(?=\))/);
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
	SABSubMenu.innerHTML+='<li><a id = "trSABQueue" onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/queue">Queue</a></li> <li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/history">History</a></li><li class="parent"> <a onclick="javascript:this.blur();" id = "trSABConfig" target="_blank" href="' + SABLocation + '/sabnzbd/config/">Config</a></li><li> <a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/connections">Connections</a></li><li><a onclick="javascript:this.blur();" target="_blank" href="' + SABLocation + '/sabnzbd/shutdown' + (useAPIKey?('?session=' + APIKey):'') + '">Shutdown</a></li>';
	
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
	
	
	
// Add menu and subs to Newzbin's CSSMenu function, uses location hack to escape GM sandbox
location.href = "javascript:void(menuList[menuCount++] = new CSSMenu('mnSAB', 'SABStatus_out'))";
location.href = "javascript:void(menuList[menuCount++] = new CSSMenu('mnSABConfig', 'trSABConfig','mnSAB'))";
location.href = "javascript:void(menuList[menuCount++] = new CSSMenu('mnSABAdd', 'trSABAdd','mnSAB'))";
	
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
	location.href = "javascript:void(menuList[menuCount++] = new CSSMenu('mnSABQueue', 'trSABQueue','mnSAB'))";
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
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation + '/sabnzbd/api?mode=addid&name=' + postNumber +'&pp=' + addType + (useAPIKey?('&apikey=' + APIKey):''),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABStatus_out = document.getElementById('SABStatus_out');
				if (responseDetails.status == 200){
					if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
					if ( responseDetails.responseText=="ok\n"){
							SABStatus_out.innerHTML = "Added Post: " + postNumber + " to Queue";
							setTimeout(GetSABData, 3000);
							if(document.getElementById('sz'+ postNumber)){
								var targetRows = document.evaluate( // Find parent row to grey out
				    		'ancestor::TBODY/TR/TD', document.getElementById('sz'+ postNumber), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
								for(j=0;j<targetRows.snapshotLength;j++) { 
									targetRows.snapshotItem(j).style.opacity = markOpacity*0.1;
								}
							}
						}
					else{
						alert("Sab Tab: Something didn't work. The report was not added.");
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
	document.getElementById("mnSAB").blur();
	document.getElementById("mnSAB").style.visibility = "hidden";
	if(document.getElementById("SABPause").innerHTML == "Resume"){GetSABData("resume");}
	else {GetSABData("pause");}
}


// Gets SAB main page and updates SAB Status Tab with results
// also scans result for word 'paused' to determine if SAB is paused 
function GetSABData(SABPage){
	  var SABPAGE = "";
	  if (typeof SABPage == 'string') {
	  	MODE='api?mode=' + SABPage + (useAPIKey?('&apikey=' + APIKey):'');
	  	}
	  else MODE = 'api?mode=qstatus&output=json' + (useAPIKey?('&apikey=' + APIKey):'');
		
			GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/' + MODE,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABStatus_out = document.getElementById('SABStatus_out');
				if(responseDetails.status == 200){
					if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
					SABRunning = 0;
					if(responseDetails.responseText == 'ok\n') return GetSABData();
					else{
						//eval('var SABData = ' + responseDetails.responseText);
						var SABData = JSON.parse(responseDetails.responseText);
						if(useSABData && responseDetails.responseText!='ok\n'){
							
								
								var SABStatus_html='<b> SAB:</b> ';
								if(SABData.paused) SABStatus_html+='<blink><b>PAUSED</b></blink>';
								else SABStatus_html+= SABData.kbpersec.toFixed(0) + ' kB/s ';
								SABStatus_html+= ' <b>Q:</b> ' + SABData.mbleft.toFixed(0) +'/'+ SABData.mb.toFixed(0) +' MB<b> Comp:</b> '+ SABData.diskspace2.toFixed(2) +' GB';
							SABStatus_out.innerHTML = SABStatus_html;
						}
						else{
							SABStatus_out.innerHTML ="SABTab";				
						}
							if(SABData.paused){
							document.getElementById("SABPause").innerHTML="Resume";
						}
						else{
							document.getElementById("SABPause").innerHTML="Pause";
						}
					}
				}
				else{
					SABStatus_out.innerHTML = "SAB invalid response";
				}
				
			},
			onerror: function(responseDetails) { 
				GM_log('SABnzbd response error');
				document.getElementById('SABStatus_out').innerHTML = "SAB Data not available";
				},
			onreadystatechange: function(responseDetails) { 
				if(responseDetails.readyState == 2 && SABRunning > 2){			
					document.getElementById('SABStatus_out').innerHTML = "SAB unavailable";
				}
				SABRunning++;
			}
		});
}

// On mouseover 'Queue' fetches SAB Queue and displays as submenu 
function GetSABQueue(){
	  
	  document.getElementById("mnSABQueue").innerHTML = "Fetching Queue...";		
	  GM_xmlhttpRequest({
		method: 'GET',
		url: SABLocation + '/sabnzbd/api?mode=qstatus&output=json' + (useAPIKey?('&apikey=' + APIKey):''),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		overrideMimeType: 'text/plain; charset=ISO-8859-1',
		onload: function(responseDetails) {
			
			if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
			var SABPage_out = document.getElementById("mnSABQueue");
			
			if(responseDetails.status == 200){
				SABRunning = 0;
				
				var SABQue_html = document.createElement('div');
				if(SABPage_out){
					var SABData = JSON.parse(responseDetails.responseText);
					if(SABData.jobs.length){
						SABQue_html = '<table>';
						for( var i =0; i < SABData.jobs.length; i++){
						SABQue_html+= '<tr><td><b>'+ SABData.jobs[i].filename +'</b></td>';
						SABQue_html+= '<td>'+ SABData.jobs[i].mbleft.toFixed(0) +'/'+ SABData.jobs[i].mb.toFixed(0) +' MB</td></tr>';
						}
						SABQue_html+= '</table>';
					}
					else{
						SABQue_html ="Queue Empty";
					}
				
					
	    		SABPage_out.innerHTML = SABQue_html;
	    	
	    	}				
				else{
					GM_log("SAB Page output space not found");				
				}
			}					
		},
		onerror: function(responseDetails) { 
			GM_log('SABnzbd response error');
			document.getElementById('mnSABQueue').innerHTML = "SAB Data not available";
			},
	});
}