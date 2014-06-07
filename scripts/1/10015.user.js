// ==UserScript==
// @name            NewTube - Youtube Cleanup
// @description  General cleanup for Youtube
// @include         http://www.youtube.com/*
// @include         http://youtube.com/*
// ==/UserScript==

//Name:            Newtube - Youtube Cleanup 
//Version:         1.1
//Author:          BrainCoder 

(function()
{

//User Variables 
var showAS     = 0; //If set to 1 shows the active sharing flash object on the homepage, else hides it. Default: 0;
var showComm   = 1; //If set to 1 shows the comments on the video page, else hides it. Default: 0;

/*Userscript Update Notification code by Seifer*/


// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
scriptName='Newtube - Youtube Cleanup';
scriptId='10015';
scriptVersion=1.1;
scriptUpdateText='This script has been updated. Check out the script homepage for more info.';

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
				document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) { alert(onSiteUpdateText); }, true);
				document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) { GM_setValue('lastCheck', currentTime); alert("You will not be reminded again until tomorrow."); document.body.removeChild(document.getElementById('gm_update_alert')); }, true);
       			document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) { GM_getValue('lastVersion', onSiteVersion); alert("You will not be reminded again until the next new version is released."); document.body.removeChild(document.getElementById('gm_update_alert')); }, true);
				document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) { document.body.removeChild(document.getElementById('gm_update_alert')); }, true);
	    	}
	    }
	});
}
/*End*/

//Variables
var im         = document.getElementsByTagName('img');
var i          = 0;
var hom        = /http:\/\/(www\.)?youtube\.com\/(index)?$/;     
var cat        = /http:\/\/(www\.)?youtube\.com\/categories.*/;
var wat        = /http:\/\/(www\.)?youtube\.com\/watch.*/;
var res        = /http:\/\/(www\.)?youtube\.com\/results.*/;
var userv      = /http:\/\/(www\.)?youtube\.com\/profile_videos?.*/;
var ads        = document.getElementById('sideAd');
var director   = document.getElementById('sideAdDiv');
var vside      = document.getElementById('sideContentWithPVA');
var prom       = document.evaluate('/html/body/div/div[3]/div[2]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var cattab     = document.evaluate('/html/body/div/div[9]/table[2]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var sidescat   = document.evaluate('/html/body/div/div[9]/table/tbody/tr/td[2]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var promw      = document.evaluate('/html/body/div/table/tbody/tr/td[2]/div/div[5]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var commonDivs = ['#mainContentWithNav','#sideContentWithPVA','.hpPurpleBlock','#mainContent'];
var homeDivs   = ['#hpEmbedVideo','.padB20','#hpYTChannelImg','.hpEmbedTopCap','#hpEmbedUnderBlock','.marL18','.hpYellowBlock','#hpEditorInfo'];
var catDivs    = ['#catIndexFeaturedWrapper','#catIndexPVAWrapper','#catIndexGridHeading'];


//Functions
function hideImagesByName(name)     //Hides images that contain in their source the string contained in the string argument
{
		for (i = 0; i < im.length ; i++)
		{
			if (im[i].getAttribute('src').indexOf(name) >= 0)
				im[i].setAttribute('style','display:none ! important');
		}	
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


//This code works on all pages
hideImagesByName('viewad');
hideImagesByName('300x');
hideImagesByName('shorties');
hideImagesByName('120x90');
addGlobalStyle('#gNavBottom{margin-bottom: 8px; background:#FFFFFF;}');

if(vside)
{
	vside.parentNode.removeChild(vside);
}

if(ads)
{
	ads.parentNode.removeChild(ads);
}

if(director)
{
	director.parentNode.removeChild(director);
}

for ( i = 0; i < commonDivs.length; i++ )
{
	if ( commonDivs[i] ==  '#mainContentWithNav' )
	{
		addGlobalStyle(commonDivs[i]+'{width:80% ! important;}');
	}
	else if ( commonDivs[i] == '#mainContent')
	{
		addGlobalStyle(commonDivs[i]+'{width:100% ! important;}');
	}
	else if ( commonDivs[i] == '.marT5' && !userv.test(window.location.href) )
	{
	    addGlobalStyle(commonDivs[i]+'{width:100% ! important;}');
	}
	else
	{
		addGlobalStyle(commonDivs[i]+'{display:none ! important;}');

	}
}
		
//This code works on Watch pages
if ( wat.test(window.location.href) == true )
{
	addGlobalStyle('form{float:center ! important;}');
	addGlobalStyle('#aboutExploreDiv{width:100% ! important;}');
	if ( showComm == 0)
	{
		addGlobalStyle('#commentsDiv{display:none ! important;}');
	}
	addGlobalStyle('#aboutVidDiv{margin-bottom: 0px ! important;}');
	addGlobalStyle('#watch-promoted-container{display:none ! important;}');

	var pw = promw.snapshotItem(0);
	if(pw)
		pw.setAttribute('style','display:none');
}
else
{
	addGlobalStyle('form{float:right ! important;}');
}


//This code works on Categories pages
if(cat.test(window.location.href))
{
	for ( i = 0; i < catDivs.length; i++)
	{
		addGlobalStyle(catDivs[i]+'{display:none ! important;}'); 
	}
	var ctab = cattab.snapshotItem(0);
	if (ctab)
		ctab.setAttribute('width','100%');
	var stab = sidescat.snapshotItem(0);
	if ( stab )
		stab.parentNode.removeChild(stab);
}

	
//This code works on the Homepage
if(hom.test(window.location.href))
{
	if ( showAS == 0 )
		document.getElementById('active_sharing_div').setAttribute('style','display:none; ! important;');
	for ( i = 0; i < homeDivs.length; i++ )
	{
		addGlobalStyle(homeDivs[i]+'{display:none ! important;}');
	}
	var promo = prom.snapshotItem(0);
	if (promo)
		promo.setAttribute('style','display:none ! important;');
	hideImagesByName('btn');
	addGlobalStyle('.hpPurpleBlockBot{display:none ! important;}');
	addGlobalStyle('.hpYellowBlockBot{display:none ! important;}');
}
})();
