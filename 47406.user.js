// ==UserScript==
// @name           friendfeedRestoreMoreLinks
// @namespace      http://userscripts.org/scripts/show/47406
// @description    Adds Reshare, Hide and PermaLink links into FriendFeed posts between the Comment and Like links
// @author         Micah Wittman
// @include        http://beta.friendfeed.com/*
// @version        0.21
// ==/UserScript==

/* 	

	Author: Micah Wittman | http://wittman.org/ | http://friendfeed.com/micahwittman
	
	Versions:
        * 2009-04-24 - version 0.21 - PermaLink was broken (used the pre-beta format). Fixed.
  
        * 2009-04-24 - version 0.2 - Works for one's own posts now: Reshare, Hide and PermaLink
          remain visible after clicking Like.
  
        * 2009-04-24 - version 0.1 - initial release
*/

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}
GM_wait();

var realtime;
var lastSuccessPrev;

function UpdateRestoreMoreLinks_wait(){
	if(lastSuccessPrev == realtime.lastSuccess)
	{
		window.setTimeout(UpdateRestoreMoreLinks_wait,50);
	}
	else
	{
		lastSuccessPrev = realtime.lastSuccess; //sync variables
		letsJQuery();
	}
}

function UpdateRestoreMoreLinksOnLike_wait(){
	window.setTimeout(AddRestoreMoreLinks,1000);
}

function letsJQuery()
{
	if(realtime == null){
		realtime = unsafeWindow.realtime;
		lastSuccessPrev = realtime.lastSuccess;
	}
	AddRestoreMoreLinks();	
	UpdateRestoreMoreLinks_wait();
}

function AddRestoreMoreLinks(){
	var mores = $('.entry .body .info').children().find(':first');
	mores.each(function(){
		var eid = $(this).parent().parent().find(':first').attr('href');
		var grandparent = $(this).parent().parent();
		var greatGrandparent = $(this).parent().parent().parent();
		var isLiked = false;
		if( greatGrandparent.find('.l_unlike').length > 0 ){
			isLiked = true;
		}
		var moreHtml = '<span class="moreRestored"> ( <a href="#" class="l_reshare">Reshare</a> - <a class="l_hideone" href="#">Hide</a> - <a href="' + 'http://beta.friendfeed.com' + eid + '">PermaLink</a> ) - </span>';
		var moreSpan = grandparent.find('.moreRestored');
		if( moreSpan.length == 0 ){ //more links already prepended?
			$(this).before(moreHtml);
		}		
		if(isLiked){
			moreSpan = grandparent.find('.moreRestored');
			moreSpan.html( moreSpan.html().replace('PermaLink</a> ) - ','PermaLink</a> ) ') );
			greatGrandparent.find('.l_like').hide(); 
			greatGrandparent.find('.like').show();
		}
	});
}

$('.l_like').click(function(){
	UpdateRestoreMoreLinksOnLike_wait();
});



	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='friendfeedRestoreMoreLinks';
	scriptId='47406';
	scriptVersion=0.21;
	scriptUpdateText="[v0.2]: Works for one's own posts now: Reshare, Hide and PermaLink remain visible after clicking Like. [v0.21]: PermaLink was broken (used the pre-beta format). Fixed.";
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
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
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
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
			    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			          		document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			    	}
	    		}
		});
	}