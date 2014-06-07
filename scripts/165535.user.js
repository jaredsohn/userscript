// ==UserScript==
// @id             gh7-reddit-tools
// @name           GH7 Reddit Tools
// @version        1.0.1
// @namespace      http://www.w3.org/1999/xhtml
// @author         Eric Hedden
// @description    Custom tools for Reddit
// @include        http://*.reddit.com/*
// @exclude        http://*.reddit.com/r/*/comments/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @resource	   gh7styles http://erichedden.com/downloads/files/scriptish/gh7-reddit-tools-styles.css
// @run-at         document-idle
// ==/UserScript==

function init()
{	
	setupCSS();
	setupToolbar();
}

function setupCSS()
{
	var cssTxt  = GM_getResourceText("gh7styles");
	GM_addStyle (cssTxt);
}

// - Set up toolbar and the buttons we need
function setupToolbar()
{
	// - Remove top ad/promoted-link bar
	$('#siteTable_promoted').remove();
	$('#siteTable_organic').remove();
	$('.sr-interest-bar').remove();
	
	// - Create the new "toolbar" above the links
	//$("#siteTable").prepend('<div id="customtoolbar" style="height:32px; width:100%; margin-bottom:5px; padding:5px; background-color:rgba(0,0,0,.5);"></div>');
	$("#siteTable").prepend('<div id="customtoolbar" class="gh7Toolbar"></div>');
	
	// TEST
	//$("#siteTable").prepend('<div id="testdiv" class="testDiv"></div>');
	// TEST END
	
	$("#customtoolbar").append('<div class="gh7ToolbarLogo"><img id="gh7Logo" src="http://erichedden.com/images/icons/icon_gh7Logo.svg" title="GH7 Logo" class="gh7ToolbarLogoIcon"></div>');
	
	
	 //---------------------------------------------\\
	// ------------------ BUTTONS ------------------ \\
		
	// - BUTTON - OPEN All Links
	//$("#customtoolbar").append('<img id="openallbutton" src="http://erichedden.com/images/icons/icon_openInTabs.svg" border="0"  title="OpenAll" style="cursor:pointer;">');
	$("#customtoolbar").append('<div class="gh7ToolbarButton"><img id="openallbutton" src="http://erichedden.com/images/icons/icon_openInTabs.svg" title="OpenAll" class="gh7ToolbarButtonIcon"></div>');
	
	$('#openallbutton').click(function()
	{
		openAllLinks();
	});
	
	
	// - BUTTON - UPVOTE All Links
	//$("#customtoolbar").append('<img id="upvoteallbutton" src="http://erichedden.com/images/icons/icon_upvoteAllLinks.svg" border="0"  title="UpvoteAll" style="cursor:pointer">');
	$("#customtoolbar").append('<div class="gh7ToolbarButton"><img id="upvoteallbutton" src="http://erichedden.com/images/icons/icon_upvoteAllLinks.svg" title="UpvoteAll" class="gh7ToolbarButtonIcon"></div>');
	
	$('#upvoteallbutton').click(function()
	{
		initiateUpvoteProcedure();
	});
	
	// - BUTTON - TEST
	//$("#customtoolbar").append('<img id="testbutton" src="http://i.imgur.com/kqQx5.png" border="0"  title="testButton" class="testButton">');
	$("#customtoolbar").append('<div class="gh7ToolbarButton"><img id="testbutton" src="http://i.imgur.com/kqQx5.png" title="testButton" class="gh7ToolbarButtonIcon"></div>');
	
	$('#testbutton').click(function()
	{
		testFunction();
	});		
	
	// - BUTTON - TEST
	/*
	$("#customtoolbar").append('<img id="testbutton" src="http://i.imgur.com/kqQx5.png" border="0"  title="testButton" style="cursor:pointer">');
	$('#testbutton').click(function()
	{
		testFunction();
	});		
	*/
}

function initiateUpvoteProcedure()
{
	// - Call "upvoteNextLink" every .5sec
	upvoteInterval = setInterval(upvoteNextLink, 500);
}

function upvoteNextLink()
{
	// - Find all the unvoted links  pick the first one, then click it
	$('div.midcol.unvoted > div.up:first').click();
	
	// - If there are no more unvoted links...
	if(!$('div.midcol.unvoted').length)
	{
		// - Stop calling this function every .5sec
		clearInterval(upvoteInterval);
		
		// - Wait two seconds to make sure upvotes were logged... then reload the page
		window.setTimeout(location.reload,1000);
	}
}

// - Opens all visible links on the page, each in a new tab (or window... it's up to your browser settings really)
function openAllLinks()
{
	$('#siteTable div.link:not(.promotedlink) div.entry.unvoted a.title').mousedown().each(function (i, e) { window.open(e.href);}); return false;	
}

init();