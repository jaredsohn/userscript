// ==UserScript==
// @name           friendfeedTitleCompactor
// @namespace      http://wittman.org/projects/friendfeedtitlecompactor/
// @description    Compacts the display of friendfeed entry titles
// @author         Micah Wittman
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// @version        0.1
// ==/UserScript==

/* 	

	Author: Micah Wittman | http://wittman.org/ | http://wittman.org/projects/friendfeedtitlecompactor/ | http://friendfeed.com/micahwittman
	
	Versions:
	   	* 2009-09-04 - version 0.1.0 - Compacts the display of friendfeed entry titles. Inserts a show/hide link: "(+-)" to toggle full display of users and groups that the entry was posted to.
*/


/*
**************************************
*********** Configuration Begin ******
*/
var autoProtocolMatchingEnabled = true; //Set to true to automatically set all URL references to secure protocol (https) if the current page is https.

var onlyUseSecureProtocolCompatibleFeatures = true; //Set to true to only use features in script that can utilize a secure connection - https (only applies when the page is using an https connection). Note: currently, this only affects one aspect of this script: that userscripts.org does not support https, so the auto-script update feature will disabled if this is set to true.

var processDelay = 2000; //Number of milliseconds by which the realtime feed update is delayed (integer). Set to -1 (negative 1) for an indefinite delay.

/*
*********** Configuration End ***********
*/


/*** Global Variables ***/
/********************************/
if(typeof realtime == 'undefined'){ var realtime; }
var prevEntryAndCommentCount = null;
var entries;
var protocol = 'http://';

/********************************/


/*** Initializing Functions ***/
/********************************/
function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
			jQuery = unsafeWindow.jQuery;
        }
    }
    if(typeof jQuery == 'undefined')
    {
		window.setTimeout(GM_wait,251);
    }
    else
    {
		$ = jQuery;
		if($('#feed').length > 0) //only continue and enter recursive loop if on a page with feed entries
		{
			letsJQuery();
		}
    }
}

function letsJQuery()
{
	entries = $('.entry');
	setProtocol();

	CompactTitle();
	CompactTitle_wait();
}



/*** Helper Functions ***/
/********************************/
function setProtocol()
{
	if(autoProtocolMatchingEnabled)
	{
		protocol = window.location.protocol + '//';
	}
	if(protocol == 'http://')
	{
		onlyUseSecureProtocolCompatibleFeatures = false; //not a secure connection, so use all features
	}
}

function CompactTitle_wait()
{

	var entryAndCommentCount = $('.comment .content').length + $('.entry').length;
    var processDelayToUse = processDelay;
    if(processDelay < 0)
    {
        processDelayToUse = 2000;
    }
	if(entryAndCommentCount == prevEntryAndCommentCount)
	{
		window.setTimeout(CompactTitle_wait, processDelayToUse);
	}
	else
	{
		prevEntryAndCommentCount = entryAndCommentCount;
		if(processDelay >= 0)
		{
			CompactTitle();
			CompactTitle_wait();
		}
	}
	
}


/*** Main Processing Functions ***/
/********************************/
function CompactTitle()
{
	$('.entry .title .name').each(function(){
	    var showhide = ' (+ &ndash;) ';
		var toRecipients = $(this).children().filter('.l_profile:gt(0)');
	    if(toRecipients.length > 0 && $(this).find('.titlecompactor').length == 0)
	    {
	        $(this).append(' <a class="titlecompactor" href="#">' + showhide + '<a/>');
			$(this).parent().find('.titlecompactor').click(function(){
				$(this).parent().find('.titlecompactor_processed').toggle();
				return false;    
			});
			toRecipients.addClass('titlecompactor_processed').hide();
	    }
	});
	return false;
}


/********** RUN SCRIPT **********/
/********************************/
if(window.location.href.indexOf('friendfeed.com/') > -1) //greasekit doesn't support @include directs, so test URL for context
{
	GM_wait();
}


/********** Script Auto-Update Component **********/
/*************************************************/
if((!onlyUseSecureProtocolCompatibleFeatures) && (typeof unsafeWindow != 'undefined') )
{

	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='friendfeedTitleCompactor';
	scriptId='57082';
	scriptVersion=0.1;
	scriptUpdateText="";
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
}