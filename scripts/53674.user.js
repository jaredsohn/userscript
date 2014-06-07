// ==UserScript==
// @name           friendfeedForceHttps
// @namespace      http://userscripts.org/scripts/show/53674
// @description    Redirect a friendfeed page to a secure connection and render all friendfeed links on page as secure protocol (https)
// @author         Micah Wittman
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// @version        0.1
// ==/UserScript==

/* 	

	Author: Micah Wittman | http://wittman.org/ | http://friendfeed.com/micahwittman | 
	
	Versions:

        * 2009-07-14 - version 0.1 - Initial Release. Redirect a friendfeed page to a secure connection and render all friendfeed links on page as secure protocol (https).
*/

/*
**************************************
*********** Configuration ***********
*/

//NOTE: 

var redirectCurrentPage = true; //Set to true to redirect to current page with secure connection.

var forceInternalLinks = true; //Set to true to reset all internal links (friendfeed.com and ff.im) to secure (https) references.

var forceAllLinks = false; //Set to true to force ALL links, even non-friendfeed domains (warning: many sites do not support secure connections in which case the link may not route you to a working page).


/*
**************************************
*/


/*** Global Variables ***/
/********************************/
var realtimeToUse = null;
var lastSuccessPrev;


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
		//if($('#feed').length > 0) //only continue and enter recursive loop if on a page with feed entries
		//{
		SetOnDemand();
		letsJQuery();
		//}
    }
}

function letsJQuery()
{
	SetRealtime();
	lastSuccessPrev = realtimeToUse.lastSuccess;

	ForceHttps();	
	ForceHttps_wait();
}


/*** Helper Functions ***/
/********************************/
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
		ForceHttpsOnDemand_wait();
	});
}


/*** Main Processing Functions ***/
/********************************/
function RedirectToHttps()
{
	//Redirect to secure connection if current friendfeed page is not one
	var href = window.location.href;
	if(href.indexOf('https://') == -1)
	{
		window.location.href = href.replace('http://', 'https://');
	}
}

function ForceHttps_wait(){
	if(lastSuccessPrev == realtimeToUse.lastSuccess)
	{
		window.setTimeout(ForceHttps_wait,50);
	}
	else
	{
		lastSuccessPrev = realtimeToUse.lastSuccess; //sync variables
		letsJQuery();
	}
}

function ForceHttpsOnDemand_wait(){
	window.setTimeout(ForceHttps, 2000);
}

function ForceHttps()
{
	var href;
	var hrefSecure;
	$('a').each(function(){
		href = $(this).attr('href');
		if( forceAllLinks || href.indexOf('http://friendfeed.com') > -1 || href.indexOf('http://ff.com') > -1 )
		{
			hrefSecure = href.replace('http://','https://');
			this.href = hrefSecure;
		}
	});
}



/********** RUN SCRIPT **********/
/********************************/
if(window.location.href.indexOf('friendfeed.com/') > -1) //greasekit doesn't support @include directs, so test URL for context
{
	if(redirectCurrentPage)
	{
		RedirectToHttps()
	}
	if(forceInternalLinks)
	{
		GM_wait();
	}
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
	scriptName='friendfeedForceHttps';
	scriptId='53674';
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