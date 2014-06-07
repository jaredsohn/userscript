// ==UserScript==
// @name           Minecraft - Full Screen
// @namespace      Seifer -http://userscripts.org/users/33118
// @description    Play Minecraft at any size, including full screen!
// @include        http://*minecraft.net*
// ==/UserScript==


// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
scriptName='Minecraft - Full Screen';
scriptId='52910';
scriptVersion=1.24;
scriptUpdateText='11/02/2012 Corrected for changes to minecraft website.';
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
			+'	height: 120px;'
			+'	background-color: yellow;'
			+'	color: #000;'
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
			+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show Update Info</a></span>&nbsp;&nbsp;'
			+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go To Script Homepage</a></span>&nbsp;&nbsp;'
			+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade to version '+onSiteVersion+'</a></span>&nbsp;&nbsp;'
			+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;'
			+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again'
			+'		until the next new version</a></span> </div>';
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

if(document.location.href.indexOf('play') > 0 && document.location.href.indexOf('popup') < 0) {
	var screenW = 640, screenH = 480;
	if (parseInt(navigator.appVersion)>3) {
	 screenW = screen.width;
	 screenH = screen.height;
	}
	else if (navigator.appName == "Netscape" 
	    && parseInt(navigator.appVersion)==3
	    && navigator.javaEnabled()
	   ) 
	{
	 var jToolkit = java.awt.Toolkit.getDefaultToolkit();
	 var jScreenSize = jToolkit.getScreenSize();
	 screenW = jScreenSize.width;
	 screenH = jScreenSize.height;
	}

	applet = document.getElementsByTagName('applet')[0];

	screenWC = screenW / 2;
	screenWC = screenWC - (applet.getAttribute('width')/2);
	screenHC = screenH / 2;
	screenHC = screenHC - (applet.getAttribute('height')/2);

	link = document.createElement('span');
	link.innerHTML = "<p align=\"center\"><a href=\"http://minecraft.net\" onclick=\"javascript:window.open('"+document.location.href+"#popup', 'minecraft', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width="+applet.getAttribute('width')+",height="+applet.getAttribute('height')+",left="+screenWC+",top="+screenHC+"');\">Popup Resizable Client</a></p>";
	link.setAttribute('style','display:block;text-align:center');
	applet.parentNode.insertBefore(link,applet.nextSibling);
} else if(document.location.href.indexOf('play') > 0 && document.location.href.indexOf('popup') > 0) {
	applet = document.getElementsByTagName('applet')[0];
	appletwidth = applet.getAttribute('width');
	appletheight = applet.getAttribute('height');
	htmlc = applet.innerHTML;
	app = document.createElement('applet');
	app.setAttribute('code',applet.getAttribute('code'));
	app.setAttribute('archive',applet.getAttribute('archive'));
	app.setAttribute('codebase',applet.getAttribute('codebase'));
	app.innerHTML = applet.innerHTML;
	newHTML = '<table style="width:100%;height:100%"><tr><td style="width:100%;height:100%;vertical-align:middle" valign="middle" align="center"><span style="font-size: 20px;" id="gm_replaceme">Resize this window to the size you would like the game to run at then click the start button.<br/><a href="#" id="gm_startbutton">Start Client</a></span>';
	newHTML = newHTML + '<p align="center"><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="WUPMYFVQSPVQ4"><table><tr><td><input type="hidden" name="on0" value="Choose Amount">Choose Amount</td></tr><tr><td>';
	newHTML = newHTML + '<select name="os0"><option value="50 cents">50 cents AUD</option><option value=".">$1.00 AUD</option><option value="..">$5.00 AUD</option><option value="...">$10.00 AUD</option><option value="....">$20.00 AUD</option><option value=".....">$50.00 AUD</option><option value="......">$100.00 AUD</option>';
	newHTML = newHTML + '<option value=".......">$150.00 AUD</option><option value="........">$200.00 AUD</option><option value=".........">$300.00 AUD</option></select> </td></tr></table><input type="hidden" name="currency_code" value="AUD">';
	newHTML = newHTML + '<input type="image" src="http://loveletslive.com/images/btn_supportme.gif" border="0" name="submit" alt="PayPal — The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypalobjects.com/en_AU/i/scr/pixel.gif" width="1" height="1"></form></p>';
	document.body.innerHTML = newHTML;
	document.getElementById('gm_startbutton').addEventListener('click', function(event) {
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
		height_ratio  = appletheight / winH;
		width_ratio  = appletwidth / winW;
	
		if(width_ratio > height_ratio) {
			appheight = appletheight / appletwidth;
			appheight = appheight * winW;
			appwidth = appletwidth / appletheight;
			appwidth = appwidth * appheight;
		} else {
			appwidth = appletwidth / appletheight;
			appwidth = appwidth * winH;
			appheight = appletheight / appletwidth;
			appheight = appheight * appwidth;
		}
		app.setAttribute('width',appwidth);
		app.setAttribute('height',appheight);
		document.getElementById('gm_replaceme').parentNode.replaceChild(app,document.getElementById('gm_replaceme'));
	}, true);
}