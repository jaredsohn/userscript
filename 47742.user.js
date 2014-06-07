// ==UserScript==
// @name           friendfeedCommentBottomLink
// @namespace      http://userscripts.org/scripts/show/47742
// @description    Adds a Comment Link to the bottom of a FriendFeed Post thread
// @author         Micah Wittman
// @include        http://friendfeed.com/*
// @version        0.3
// ==/UserScript==

/* 	

	Author: Micah Wittman | http://wittman.org/ | http://friendfeed.com/micahwittman
	
	Versions:
        * 2009-07-14 - version 0.3.0 - Fixed to accomdate FriendFeed's new Disable Comments per post option. Also added script Configuration option hideCommentDisabledPosts - if turned on will hide all posts that are set to Comments Disabled (but will not be hidden if you are the owner of the post).
        * 2009-05-25 - version 0.27 - Added feature that, while in a comment box, pressing the enter key does not submit and inserts a new line instead (submit by clicking Post button). Off by default; enabled it in Configuration by setting var enableEnterKeyDoesNewlineNotSubmit = true.
        * 2009-05-24 - version 0.26 - Liking a post one has created is not allowed, so a Like bottom link should not appear (though clicking it was harmless) - Fixed. Also, refactored code including pure javascript runtime context compatibility (relying less on the GreaseMonkey context) - should work better with greasekit (Chrome/Safari) environments.
        * 2009-05-16 - version 0.25 - New Features: Like bottom link (optional - see var likeText in Configuration) added. Also in Configuration, var commentCountMinimum now controls when the bottom links appear based on the currently shown comment count.
        * 2009-05-02 - version 0.24 -  Moved key layout/style values into a Configuration section near top of script for easier customization. Changed default position of Comment link to left (instead of centre) based on user feedback.
        * 2009-04-29 - version 0.23 - FF beta cut over to live, so URL include was adjusted.
        * 2009-04-29 - version 0.22 - Google Chrome browser compatibility added. The only difference between use on Firefox and Chrome is
                       the "auto update-notification script" component is disabled on Chrome because of GreaseMonkey API dependencies.
        * 2009-04-28 - version 0.21 - Bottom Comment link is not needed on a permalink page since the comment field is open by default. Fixed.
        * 2009-04-28 - version 0.2 - Bottom Comment link was staying in static position as new comments appeared (below it) in realtime. Fixed.
        * 2009-04-28 - version 0.1 - initial release
*/

/*
**************************************
*********** Configuration ***********
*/

var style='LEFT'; //Set to 'LEFT' to position the Comment link flush left in the feed display. Set to 'CENTER' to place it in the middle.

var commentCountMinimum = 1; //The minimum number (integer) of comments before the bottom Comment / Like links appear. Set to zero to always show bottom links. Hint: when 3 or more comments exist, the first and last are revealed until N more comments is clicked, so until the rolled-up comments are enumerated, the (shown) comment count = 2.

var linkText = '[ Comment ]'; //The text of the Comment link. You could add to it (or fully replace the text) with an <img> tag here too.  To not use the bottom of thread Comment link feature, leave this value blank (linkText = '').
var likeText = '[ Like ]'; //The text of the Like link. To not use the bottom of thread Like link feature, leave this value blank (likeText = '').

var fontSize = '13px'; //Font size of the Comment link.
var marginTop = '-0.8em'; //Margin spacing between Comment link and thread which is above it. The recommended range is between (negative numbers): -0.5em and -1.2em.

var enableEnterKeyDoesNewlineNotSubmit = false; //Set to true to over-ride the default behaviour of pressing the enter key while in a comment box submits, true will insert a new line and submission is only done by clicking the Post button.

var hideCommentDisabledPosts = false; //Set to true to hide all posts (that are not your own) that have comments disabled.


/*
**************************************
*/


/*** Global Variables ***/
/********************************/
var realtimeToUse = null;
var lastSuccessPrev;
var switchCss = '';
var likeHtml = '';
var commentHtml = '';


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
			SetConfig();
			SetOnDemand();
			letsJQuery();
		}
    }
}

function letsJQuery()
{
	SetRealtime();
	lastSuccessPrev = realtimeToUse.lastSuccess;

	AddCommentBottomLink();	
	AddCommentBottomLink_wait();
}


/*** Helper Functions ***/
/********************************/
function SetConfig()
{
	if(style == 'LEFT')
	{
		switchCss = '1em';
	}
	else if(style == 'CENTER')
	{
		switchCss = '40%';
	}
	else
	{
		switchCss = '1em';
	}
	
	if(likeText != '')
	{
		likeHtml = ' &nbsp;'
			+ '<a style="color:#7777CC;font-size:' 
			+ fontSize + '" class="l_like bottomCommentLink bottomLikeLink" href="#" onclick="return false;">' 
			+ likeText						
			+ '</a>';
	}
	if(linkText != '')
	{
		commentHtml = '<a style="color:#7777CC;font-size:' 
		+ fontSize + '" class="l_comment bottomCommentLink" href="#" onclick="return false;" title="Comment">' 
		+ linkText						
		+ '</a>';
	}
}

function UnbindEnterKeySubmit()
{
	$('.commentform .text textarea').focus().unbind('keypress');
}

function UnbindEnterKeySubmitInit()
{
	$('.l_comment').click(function(){
		window.setTimeout(UnbindEnterKeySubmit, 1500);
	});
}

function SetRealtime()
{
	if(typeof unsafeWindow == 'undefined')
	{
		realtimeToUse = realtime;
	}
	else
	{
		if(typeof unsafeWindow.realtime != 'undefined'){
			realtimeToUse = unsafeWindow.realtime;
		}		
	}
}

function SetOnDemand()
{
	$('.l_expandcomments').click(function(){
		AddCommentBottomLinkOnDemand_wait();
	});
}


/*** Main Processing Functions ***/
/********************************/

function AddCommentBottomLink_wait(){
	if(lastSuccessPrev == realtimeToUse.lastSuccess)
	{
		window.setTimeout(AddCommentBottomLink_wait,50);
	}
	else
	{
		lastSuccessPrev = realtimeToUse.lastSuccess; //sync variables
		letsJQuery();
	}
}

function AddCommentBottomLinkOnDemand_wait(){
	window.setTimeout(AddCommentBottomLink, 2000);
}

function AddCommentBottomLink(){
	var likeHtmlToUse = '';
	var commentHtmlToUse = '';
	var commentCount = 0;
	var isOwner = false;
	var hasNoCommentLink = false;
	var commOwnerObj;
	$('.comments').each(function(){
		entryObj = $(this).parent().parent();
		if(entryObj.attr('className').indexOf('author') > -1)
		{
			isOwner = true;
		}
		else
		{
			isOwner = false;
		}

		commentCount = $(this).find('.comment .content').length;
		
		if($(this).find('.commentform textarea').length == 0){
			if($(this).parent().parent().find('.l_comment').length == 0)
			{
				hasNoCommentLink = true;
			}
			else
			{
				hasNoCommentLink = false;
			}
			if(hideCommentDisabledPosts && !isOwner && hasNoCommentLink)
			{
				entryObj.hide(); //entryObj.css('border','red solid 1px');
			}
			if( commentCount >= commentCountMinimum ){
				if( $(this).parent().find('.bottomCommentLinkDiv').length == 0 ){
					if( isOwner || ($(this).parent().parent().find('.l_unlike').length > 0) ){
						likeHtmlToUse = '';
					}else{
						likeHtmlToUse = likeHtml;
					}
					if(hasNoCommentLink){
						commentHtmlToUse = '';
					}else{
						commentHtmlToUse = commentHtml;
					}
					$(this).after(
						'<div class="bottomCommentLinkDiv" style="margin:' 
						+ marginTop + ' 0 1em ' + switchCss + '">' 
						+ '<br />'
						+ commentHtmlToUse
						+ likeHtmlToUse
						+'</div>'
					);
					$('.bottomLikeLink').mouseup(function(){
						$(this).fadeOut('slow');
					});
				}
			}
		}
	});
	if(enableEnterKeyDoesNewlineNotSubmit)
	{
		UnbindEnterKeySubmitInit();
	}
}



/********** RUN SCRIPT **********/
/********************************/
if(window.location.href.indexOf('friendfeed.com/') > -1) //greasekit doesn't support @include directs, so test URL for context
{
	GM_wait();
}



/********** Script Auto-Update Component **********/
/*************************************************/
if(typeof unsafeWindow != 'undefined')
{

	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='friendfeedCommentBottomLink';
	scriptId='47742';
	scriptVersion=0.3;
	scriptUpdateText="[v0.3.0]: Fixed to accommodate FriendFeed's new Disable Comments per post option. Also added script Configuration option hideCommentDisabledPosts - if turned on will hide all posts that are set to Comments Disabled (but will not be hidden if you are the owner of the post).";
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