// ==UserScript==
// @name           MySpace - Profile Links
// @namespace      Seifer - http://userscripts.org/users/33118
// @description    Adds the default MySpace profile links to every profile, even customized ones.
// @include        *myspace.com*
// ==/UserScript==

//----------------------------
// Original concept by Jacub.
//----------------------------

// Find the FriendID
if($('ctl00_Main_ctl00_UserContactLinks1_AddFriendLink')) {
	var path = $('ctl00_Main_ctl00_UserContactLinks1_AddFriendLink').href;
} else if($('read_from')) {
	var path = $('read_from').childNodes[1].href;
} else {
	var path = location.href;
}
var section = path.toLowerCase().split('friendid=');
friendID = section[1];
if(friendID) {
	section = friendID.split('&');
	friendID = section[0];
}

if(friendID > 0) {
	// Add the menu
	var profilelinks = document.createElement('div');
	GM_addStyle('#gm_profilelinks * {'
	+'text-decoration: underline !important;'
	+'color: #ffffff !important;'
	+'font-family: Arial !important;'
	+'font-size: 8pt !important;'
	+'font-weight: bold !important;'
	+'font-style: normal !important'
	+'}'
	+'#gm_profilelinks a:hover {'
	+'color: #33BBFF !important;'
	+'}'
	+'#gm_profilelinks {'
	+'background-color: #000000 !important;'
	+'color: #000000 !important;'
	+'font-family: Arial !important;'
	+'font-size: 8pt !important;'
	+'font-weight: bold !important;'
	+'font-style: normal !important'
	+'display: block !important;'
	+'position: absolute !important;'
	+'width: 100% !important;'
	+'padding: 1px !important;'
	+'margin-bottom: 1px !important;'
	+'z-index: 100000 !important;'
	+'top: 0px !important;'
	+'right: 0px !important;'
	+'text-align: center !important'
	+'}');

	profilelinks.innerHTML = '<div id="gm_profilelinks">'
	+'<a href="http://home.myspace.com/index.cfm?fuseaction=user">My Home</a>'
	+' | '
	+'<a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid='+friendID+'">Profile</a>'
	+' | '
	+'<a href="http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID+'">Add&nbsp;to&nbsp;Friends</a>'
	+' | '
	+'<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID='+friendID+'">Message</a>'
	+' | '
	+'<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID='+friendID+'">View&nbsp;Pics</a>'
	+' | '
	+'<a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID='+friendID+'">Comment</a>'
	+' | '
	+'<a href="http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID='+friendID+'">View&nbsp;Comments</a>'
	+' | '
	+'<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID='+friendID+'">View Blog</a>'
	+' | '
	+'<a href="http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+friendID+'">View&nbsp;Friends</a>'
	+' | '
	+'<a href="http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins&friendID='+friendID+'">View&nbsp;Bulletins</a>'
	+' | '
	+'<a href="http://www.myspace.com/index.cfm?fuseaction=block.blockUser&userID='+friendID+'">Block</a>'
	+'</div>';

	document.body.appendChild(profilelinks);
}

function $( elementId ) { return document.getElementById( elementId ); } // shortcut from "Prototype Javascript Framework"
function $$( elementName ) { return document.getElementsByName( elementName ); }


// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
	scriptName='MySpace - Profile Links';
	scriptId='13256';
	scriptVersion=1.4;
	scriptUpdateText='Added links when viewing bulletins, added link to view users bulletins.';
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
              GM_setValue('lastVersion', onSiteVersion);
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