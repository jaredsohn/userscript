// August 6, 2006
// Copyright (c) 2006, Steve McLenithan
// This is a HACK in progress.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "EVE Enhanced Forums", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          EVE Enhanced Forums
// @namespace     na
// @description   The EVE Online forums are plain and dull. This script adds much needed functionality
// @include       http://*.eveonline.com/ingameboard.asp*
// ==/UserScript==

DisableStyles();
HideStuff();
OverrideExistingStyles();

// ========================================
// FUNCTIONS
// ========================================

// Clears all divs not being used to avoid temporary garabled
// view after styles are disabled
function HideStuff()
{
	KillMoreStuff();
	
	// ---REMOVE all script elemtents.
	var allScript, thisScript;
	allScript = document.evaluate(
	    '//script',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allScript.snapshotLength; i++) 
	{
	    thisScript = allScript.snapshotItem(i);
		thisScript.parentNode.removeChild(thisScript);
	}
	// ---

	// REMOVE all external stylesheet links
	var allLink, thisLink;
	allLink = document.evaluate(
	    '//link',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allLink.snapshotLength; i++) 
	{
	    thisLink = allLink.snapshotItem(i);
		thisLink.parentNode.removeChild(thisLink);
	}
	// ---
	
	// --- REMOVE all meta tags
	var allMeta, thisMeta;
	allMeta = document.evaluate(
	    '//meta',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allMeta.snapshotLength; i++) 
	{
	    thisMeta = allMeta.snapshotItem(i);
		thisMeta.parentNode.removeChild(thisMeta);
	}
	// ---
	
	// --- REMOVE all style tags
	var allStyle, thisStyle;
	allStyle = document.evaluate(
	    '//style',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allStyle.snapshotLength; i++) 
	{
	    thisStyle = allStyle.snapshotItem(i);
		thisStyle.parentNode.removeChild(thisStyle);
	}
	// ---
	
	var header = document.getElementById('header');
	if (header) {
		header.parentNode.removeChild(header);
		}
	var leftcontent = document.getElementById('leftcontent');
	if (leftcontent) {
		leftcontent.parentNode.removeChild(leftcontent);
		}
	var rightcontent = document.getElementById('rightcontent');
	if (rightcontent) {
		rightcontent.parentNode.removeChild(rightcontent);
		}
	var footer = document.getElementById('footer');
	if (footer) {
		footer.parentNode.removeChild(footer);
		}
	var banner = document.getElementById('banner');
	if (banner) {
		banner.parentNode.removeChild(banner);
		}
	var hidImg = document.getElementById('__p_img');
	if (hidImg) {
		hidImg.parentNode.removeChild(hidImg);
		}		

	document.getElementById('container').attributes.removeNamedItem('class');
	document.getElementById('content').attributes.removeNamedItem('class');
	document.getElementById('content').attributes.removeNamedItem('style');
	
	// add extra space for custom header.
	var main, newElement;
	main = document.getElementById('content');
	if (main) 
	{	
		var remoteTbl = document.createElement('div');
		remoteTbl.innerHTML = InsertNewHeader();
		main.parentNode.insertBefore(remoteTbl,main);
		
	    newElement = document.createElement('br');
	    main.parentNode.insertBefore(newElement, main);
	}
}

function InsertNewHeader()
{
	var x;
	x = 	'<script language="JavaScript" type="text/javascript">'+
			'function GetCharForumStats()'+
			'{'+
			'	window.open("http://eve-search.com/stats.dxd?query="+document.getElementById("charName").value);'+
			'}'+
			'function disableEnterKey(e)' +
			'{' +
			'     var key;' +
			'     if(window.event)' +
			'          key = window.event.keyCode;' +
			'     else' +
			'          key = e.which;' +
			'     if(key == 13) {' +
			'          GetCharForumStats();'+
			'          return false; }' +
			'     else' +
			'          return true;' +
			'}' +
		'</script>'+
	'<div style="color:#ffffff; width:100%; background-color:#2C2C38; border: 1px solid #666666;">'+
	'<form name="menu" class="mbForum">'+
	'<a href="http://myeve.eve-online.com/ingameboard.asp">Forum Home</a>&nbsp;|&nbsp;' +
	'<a href="http://eve-search.com">EVE-Search</a>&nbsp|&nbsp;<a href="http://eve-files.com">EVE-Files</a>'+
	'&nbsp|&nbsp;<a href="http://www.eve-videos.com/">EVE-Videos</a>&nbsp;&nbsp;' +
	'<select class="menuGrey" name="links" onChange="location=document.menu.links.options[document.menu.links.selectedIndex].value;" value="GO">'+
	'<option class="menuDark" value="http://www.eve-online.com/">EVE Online</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/screenshots/">Screnshots & Art</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/background/">Backstory</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/faq">F.A.Q.</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/features/">Features</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/itemdatabase/">Item Database</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/community/">Community</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/guide/">Player Guide</option>'+
	'<option class="menuGrey" value="https://secure.eve-online.com/">Create Account</option>'+
	'<option class="menuDark" value="http://www.eve-online.com/download/">EVE Download</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/download/">EVE Client</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/patches/">EVE Patches</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/patches/testpatches.asp">- - Test Patches</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/patches/stufffiles.asp">- - Stuff Files</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/download/videos/>EVE Videos</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/download/music/">EVE Music</option>'+
	'<option class="menuGrey" value="http://www.eve-online.com/download/banners/">EVE Banners</option>'+
	'<option class="menuDark" value="#">EVE Insider</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/news.asp">Players News Center</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/ingameboard.asp">Forums</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/board/settings.asp">- - Settings</option ' +
	'<option class="menuGrey" value="http://www.eve-online.com/pnp/forumrules.asp">- - Rules</option ' +
	'<option class="menuGrey" value="http://myeve.eve-online.com/devblog.asp">Dev Blog</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/updates/patchnotes.asp">Path Notes</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/isd.asp">Interstellar Svcs Dept</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/events/">Game Events</option>'+
	'<option class="menuGrey" value="https://secure.eve-online.com/acctmanmenu.asp">My Account</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/character/skilltree.asp">My Character</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/screenshots/">Fan Submissions</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/lexicon/">Dictionary</option>'+
	'<option class="menuGrey" value="http://myeve.eve-online.com/buddy/">Buddy Program</option>'+
	'<option class="menuGrey" value="http://bugs.eve-online.com/">Bug Reporting</option>'+
	'<option class="menuRed" value="http://myeve.eve-online.com/logout.asp">Log Out</option>'+
	'</select>&nbsp;&nbsp;'+
	'<input type="text" id="charName" onKeyPress="return disableEnterKey(event)" />&nbsp;<input type="button" id="subitChar" onclick="GetCharForumStats()" value="Get Char Stats" />&nbsp;&nbsp;'+
		'<select class="menuGrey" name="tools" onChange="location=document.menu.tools.options[document.menu.tools.selectedIndex].value;" value="GO">'+
		'<option class="menuDark" value="#">Useful Info & Tools</option>'+
		'<option class="menuGrey" value="http://www.section9studios.com/eve/index.asp">Agent Finder</option>'+
		'<option class="menuGrey" value="http://eve.upallnightgaming.com/0036.asp">Mission Types</option>'+
		'<option class="menuGrey" value="http://www.eve-ffet.com/">FutureFalcon EVE Tools</option>'+
		'<option class="menuGrey" value="http://evemon.battleclinic.com/">EVEMon</option>'+
		'<option class="menuGrey" value="http://eve.coldfront.net/status/tranquility">Server Status Monitor</option>'+
		'<option class="menuGrey" value="http://eve.coldfront.net/db/">Item Database</option>'+
		//'<option class="menuGrey" value=""></option>'+
		'</select>'+
	'</form>'+
	'</div>';

	return x
}

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head').item(0);
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function DisableStyles()
{
	var stylesheets, all, element;
	
	// this disables all externally linked stylesheets
	stylesheets = document.styleSheets;
	for (var i = 0; i < stylesheets.length; i++) 
	{
		stylesheets[i].disabled = true;
	}
	all = document.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++) 
	{
		element = all[i];
		if (element.nodeName == 'STYLE') 
		{
			// this removes <style> elements defined anywhere on the page
			element.parentNode.removeChild(element);
		}
	}
}

function OverrideExistingStyles()
{
	try 
	{
		var channels = document.getElementsByName('channelID')[0];
		if (channels)
		{
			channels.className = 'menuGrey';
			var tempOption;
			for (var i = 0; i < channels.options.length; i++)
			{
				tempOption = channels.options[i];
				tempOption.removeAttribute('style');
			}
		}
	}
	catch (e) 
	{
		// Nothing to see here. Nav menu simply does not exist in this view.
	}
	var myCSS = '  a:link    {color:#FFA500;text-decoration:none} ' +
				'  a:visited {color:#c77524;text-decoration:none} ' +
				'  a:hover   {color:#FFA500;text-decoration:underline} ' +
				'  a:active  {color:#FFA500;text-decoration:none} ' +
				'  body { background-color: #000000;background:url("/bitmaps/interface/content_smoke.jpg") no-repeat #080809; } ' +
				'.mbHead{ ' +
				'   BACKGROUND-COLOR:#4D4D57; ' +
				'   COLOR:white; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				' } ' +
				'.mbForum{ ' +
				'   BACKGROUND-COLOR:#2C2C38; ' +
				'	COLOR: #ffffff; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				' } ' +
				'.mbCat{ ' +
				'   BACKGROUND-COLOR:black; ' +
				'   COLOR:white; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				' } ' +
				'.mbForumFirst{ ' +
				'   BACKGROUND-COLOR:black; ' +
				'   COLOR:white; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				' } ' +
				'.mbDevStyle{ ' +
				'   BACKGROUND-COLOR: black; ' +
				'   COLOR:white; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				'   BORDER-top: 2px solid gold; ' +
				'   BORDER-bottom: 2px solid gold; ' +
				' } ' +
				'.mbForumAlt{ ' +
				'   BACKGROUND-COLOR:4D4D57; ' +
				'   COLOR:white; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				' } ' +
				'.mbSurf{ ' +
				'	color: #ffffff; ' +
				'   FONT-FAMILY:Verdana; ' +
				'   FONT-SIZE:14px; ' +
				' } ' +
				'.menuRed { ' +
				'   background-color: red; ' +
				'	color: white; ' +
				'	font-family:verdana; ' +
				'   FONT-SIZE:14px; ' +
				'} ' +
				'.menuGrey { ' +
				'	background-color: #4D4D57; ' +
				'	color: #FFFFFF; ' +
				'	font-family:verdana,arial; ' +
				'	} ' +
				'.menuDark { ' +
				'	background-color: #000000; ' +
				'	color: #FFFFFF; ' +
				'	font-family:verdana,arial; ' +
				'	} ' +				
				'.quote ' +
				'{ ' +
				'	font-family:verdana,arial; ' +
				'	font-size:9px; ' +
				'} ' +
				'.mbAvatar{ ' +
				'   BORDER: 1px solid #c9c9c9; ' +
				' } ' +
				'.mbAvatarSel{ ' +
				'   BORDER: 1px solid red; ' +
				' }';
	// add our style
	addGlobalStyle(myCSS);
}

function KillMoreStuff()
{
	var objects = new Array()
	objects[0] = '/html/body/p';
	objects[1] = '/html/body/div/div/div[2]/br[5]';
	objects[2] = '/html/body/div/div/div[2]/br[4]';
	objects[3] = '/html/body/div/div/div[2]/div';
	objects[4] = '/html/body/div/div/div[2]/br[3]';
	objects[5] = '/html/body/div/div/div[2]/br[2]';
	objects[6] = '/html/body/noscript';
	objects[7] = '//img[@class="fixBanner"]';
	
	for (var i = 0; i < objects.length; i++) 
	{
    	Killme(objects[i]);
	}
}

function Killme(x)
{
	var all, single;
	all = document.evaluate(x,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < all.snapshotLength; i++)
	{
		single = all.snapshotItem(i);
		single.parentNode.removeChild(single);
	}
}