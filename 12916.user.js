// ==UserScript==
// @name           MySpace - Shortcuts v1.2
// @namespace      http://myspace.com/bloodyangel88
// @description    MySpace profile sections - on top of the screen, fixed position
// @include        *myspace.com*
// @author         Bloody_Angel (www.myspace.com/bloodyangel88)
// ==/UserScript==
// CREDITS: The scripts original name was MySpaceHax. The original concept of the script was created by
// Jacub. It was later updated by Freddy.
// This version is a redesign by Bloody_Angel (myspace.com/bloodyangel88)
// I changed the position to the center of the screen. Also, it's now in one row, and
// the position is fixed, so it's always on top of the screen. Hope you will like it... New version has some position options, so if you don't like default position, you can easily change that... 


//////////////////////////////////////////
// Options: 
// Change this options to personalize script the way you want it:
//
// If LOCK_POSITION is set to true shortcuts will scroll with page, if it's set to false it will stand on top of the page, and will not be visible all the time
var LOCK_POSITION = true; //  true / false (default: true)
// If ENLARGE is set to true focused shortcut will be larger then other shortcuts...
var ENLARGE = false; // true / false (default: false)
// If TRANSPARENT is set to true, background of the shortcuts will be transparent insted of black
var TRANSPARENT = false; // true / false (default: false)
// Use VERTICAL if you want links to be vertical instead of horizontal. You can use "left" for left side or "right" for right side. Default is False
// Watch for " " sign. If you want to use "right" or "left" you must put " "
var VERTICAL = false; // "right" / "left" / false (default:false) 
//////////////////////////////////////////

// Find the FriendID
if($('ctl00_Main_ctl00_UserContactLinks1_AddFriendLink')) {
	var path = $('ctl00_Main_ctl00_UserContactLinks1_AddFriendLink').href;
} 
else {
	var path = location.href;
}
var section = path.split('friendID=');
friendID = section[1];
if(friendID) {
	section = friendID.split('&');
	friendID = section[0];
}


if(friendID > 0) {
// add menu
var shortcuts = document.createElement("div");
GM_addStyle('#gm_shortcuts a {'
+'font-family: arial !important;'
+'font-size: 9px !important;'
+'text-decoration: none !important;'
+'color: #ffffff !important;'
+'font-style: normal !important;'
+'}'
+'#gm_shortcuts a:hover {'
+'color: #33bbFF !important;'
+'}'
+'#gm_shortcuts {'
+'background-color: black !important;'
+'position:absolute !important;'
+'top: -2px !important;'
+'color: #000000 !important;'
+'display: block !important;'
+'padding: 0px !important;'
+'z-index: 100000 !important;'
+'text-align: center !important;'
+'width: 100% !important;'
+'right:0px !important;'
+'}');


 if (LOCK_POSITION)   GM_addStyle('#gm_shortcuts {position: fixed !important;} ')
 if (ENLARGE) GM_addStyle('#gm_shortcuts a:hover {text-transform: uppercase !important; font-size:11px !important;} ')
 if (TRANSPARENT) GM_addStyle('#gm_shortcuts {background-color: transparent !important;}')
 if (VERTICAL == "left") GM_addStyle('#gm_shortcuts {width: 8% !important; text-align:left !important; left: 0px !important;}')
 if (VERTICAL == "right") GM_addStyle('#gm_shortcuts {width: 8% !important; text-align:right !important;}')
 
shortcuts.innerHTML = '<div id="gm_shortcuts">'
+' &nbsp;'
+'<a href="http://home.myspace.com/index.cfm?fuseaction=user">My&nbsp;Home</a>'
+' &nbsp;'
+'<a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid='+friendID+'">Profile</a>'
+' &nbsp;'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID+'">Add&nbsp;to&nbsp;Friends</a>'
+' &nbsp;'
+'<a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID='+friendID+'">Add&nbsp;Comment</a>'
+' &nbsp;'
+'<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID='+friendID+'">Send&nbsp;Message</a>'
+' &nbsp;'
+'<a href="http://groups.myspace.com/index.cfm?fuseaction=groups.addtogroup&friendID='+friendID+'">Add&nbsp;to&nbsp;Group</a>'
+' &nbsp;'
+'<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewAlbums&friendID='+friendID+'">View&nbsp;Pics</a>'
+' &nbsp;'
+'<a href="http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID='+friendID+'">View&nbsp;Comments</a>'
+' &nbsp;'
+'<a href="http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+friendID+'">View&nbsp;Friends</a>'
+' &nbsp;'
+'<a href="http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins&friendID='+friendID+'">View&nbsp;Bulletins</a>'
+' &nbsp;'
+'<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID='+friendID+'">View&nbsp;Blog</a>'
+' &nbsp;'
+'<a href="http://groups.myspace.com/index.cfm?fuseaction=groups.myGroups&userid='+friendID+'">View&nbsp;Groups</a>'
+' &nbsp;'
+'<a href="http://www.myspace.com/index.cfm?fuseaction=block.blockUser&userID='+friendID+'">Block</a>'
+' &nbsp;'

+'</div>';
document.body.insertBefore(shortcuts, document.body.firstChild);
}
function $( elementId ) { return document.getElementById( elementId ); } // shortcut from "Prototype Javascript Framework"
function $$( elementName ) { return document.getElementsByName( elementName ); }


/////////////////////////////////////////
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// =========================================================
// ===== Edit the next four lines to suit your script. =====
	scriptName='MySpace Shortcuts';
	scriptId='12916';
	scriptVersion=1.1;
	scriptUpdateText='Updated lots of things. Now links can be vertically aligned on the left or right side. Also position can be fixed or not. You can remove background color and set it to transparent...';
// === Stop editing here. ===
	
	
	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds

	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
	    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
	    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
		    		GM_addStyle('#gm_update_alert {'
					+'	position: relative;'
					+'	z-index: 99;'
					+'	top: 0px;'
					+'	left: 0px;'
					+'	width: 100%;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
		    		newversion = document.createElement("div");
		    		newversion.setAttribute('id', 'gm_update_alert');
		    		newversion.innerHTML = '<div id="gm_update_alert">'
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show Update Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go To Script Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade to version '+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again'
					+'		until the next new version</a></span> </div>'
					+'</div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {
              alert(onSiteUpdateText);
           }, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {
              GM_setValue('lastCheck', currentTime);
              alert("You will not be reminded again until tomorrow.");
              document.body.removeChild(document.getElementById('gm_update_alert'));
           }, true);
           			document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {
              GM_getValue('lastVersion', onSiteVersion);
              alert("You will not be reminded again until the next new version is released.");
              document.body.removeChild(document.getElementById('gm_update_alert'));
           }, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {
              document.body.removeChild(document.getElementById('gm_update_alert'));
           }, true);
		    	}
		    }
		});
	}