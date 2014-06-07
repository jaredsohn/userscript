// ==UserScript==
// @name		Meebo Control Panel Plus
// @description	Lets you hide parts of the meebo UI when meebo starts up.
// @include	http*://www*.meebo.com/*
// @version	0.6
// @date		01/03/2008
// @creator	Jorge Monasterio (@ logonpro.com)
// ==/UserScript==
//
// Updated:
//	12/05/2007 0.5 Hide ad upsells for "favorite apps" in Im content.
//	10/20/2007 0.4 Default logo hiding to "not hidden"
//	10/20/2007 0.3 Support hiding logo
//	10/20/2007 0.2 Fixed broken image link. Fixed capitalization.
//	10/20/2007 0.1 Original script
//
// "Plus Version" Updates:
// (01/03/2008 - 0.6 - by: Andre Gil)
//	New option to keep the "Sign on as invisible" checkbox selected by default.
// 	New option to fix the contact details tooltip size when mouse is over contact's name. It don't generate scrollbar easily now.
//	Fixed the "Hide Rooms" bug. Now the "more" button hide too.
//	Control panel DIV style changed.
//	Button now stays on link bar, next to the help button, named "hacks".
//	Part of the code optimized.
//

(function()
{
	// Keys for GM values.
	KEY_HIDE_ADS = 'hide_ads';
	KEY_HIDE_BLOG = 'hide_blog';
	KEY_HIDE_ROOMS = 'hide_rooms';
	KEY_HIDE_LOGO = 'hide_logo';
	KEY_HIDE_APPUPSELL = 'hide_appupsell';
	KEY_FIX_DETAILS = 'fix_details';
	KEY_ALWAYS_INVISIBLE = 'always_invisible';

	// On click handlers for control panel.
	function genericClickHandler(key, value) {
		GM_setValue(key, value);
		fixMeeboContent();
	}
	
	// Adds control panel to meebo UI.
    function addMeeboControlPanel()
    {
	
		// Control panel
   		var nodeControlPanel = document.createElement("div");
		
		nodeControlPanel.innerHTML =
		'<div id="msd_content" style="position:absolute; z-index:1000; top:80px; left:50%; width:350px; margin-left:-175px; display:none; background-color:white; border:solid 1px #000000; padding:3px">'+
		'	<div height="30px"><a href="#" onclick="document.getElementById( \'msd_content\').style.display=\'none\';"><img style="border:0px; position:absolute; right:7px;" src="/skin/beta/img/roomsGalleryClose.gif" /></a></div>' +
		'	<div><br/><input id="msd_checkbox_ads" type="checkbox" ' + (GM_getValue(KEY_HIDE_ADS, true) ? "checked" : "") +'">Hide advertisements</input></div>' +
		'	<div><input id="msd_checkbox_blog" type="checkbox" ' + (GM_getValue(KEY_HIDE_BLOG, true) ? "checked" : "") + '">Hide annoying Meebo blog at startup</input></div>' +
		'	<div><input id="msd_checkbox_rooms" type="checkbox" ' + (GM_getValue(KEY_HIDE_ROOMS, false) ? "checked" : "") + '">Hide Meebo Rooms (bottom of screen)</input></div>' +
		'	<div><input id="msd_checkbox_logo" type="checkbox" ' + (GM_getValue(KEY_HIDE_LOGO, false) ? "checked" : "") + '">Hide Meebo Logo</input></div>' +
		'	<div><input id="msd_checkbox_appupsell" type="checkbox" ' + (GM_getValue(KEY_HIDE_APPUPSELL, false) ? "checked" : "") + '">Hide "Application UpSells" (like game notifications) in IM content.</input></div>' +
		'	<div><input id="msd_checkbox_fix_details" type="checkbox" ' + (GM_getValue(KEY_FIX_DETAILS, true) ? "checked" : "") + '">Bigger contact details tooltip (when mouse is over contact\'s name)</input></div>' +
		'	<div><input id="msd_checkbox_always_invisible" type="checkbox" ' + (GM_getValue(KEY_ALWAYS_INVISIBLE, false) ? "checked" : "") + '">Sign on as invisible by default</input></div>' +
		'	<div><br><i>Note: Settings are automatically saved for your next visit.</i></div>' +
		'</div>';

		document.body.insertBefore(nodeControlPanel, document.body.firstChild);
		
		// Open link
		var openLink = document.createElement("a");
		openLink.href = "javascript: document.getElementById('msd_content').style.display='block'; void(0);";
		openLink.appendChild(document.createTextNode("hacks"));
		
		// Add link on the links bar
		var linksBar = document.getElementById('meebolinks');
		try{
			linksBar.insertBefore(openLink, linksBar.childNodes[12]);
		}catch(ex){};

		// Listeners
		document.getElementById( 'msd_checkbox_ads').addEventListener( 'click', function() { genericClickHandler(KEY_HIDE_ADS, this.checked); }, true);
		document.getElementById( 'msd_checkbox_blog').addEventListener( 'click', function() { genericClickHandler(KEY_HIDE_BLOG, this.checked); }, true);
		document.getElementById( 'msd_checkbox_rooms').addEventListener( 'click', function() { genericClickHandler(KEY_HIDE_ROOMS, this.checked); }, true);
		document.getElementById( 'msd_checkbox_logo').addEventListener( 'click', function() { genericClickHandler(KEY_HIDE_LOGO, this.checked); }, true);
		document.getElementById( 'msd_checkbox_appupsell').addEventListener( 'click', function() { genericClickHandler(KEY_HIDE_APPUPSELL, this.checked); }, true); 
		document.getElementById( 'msd_checkbox_fix_details').addEventListener( 'click', function() { genericClickHandler(KEY_FIX_DETAILS, this.checked); }, true);
		document.getElementById( 'msd_checkbox_always_invisible').addEventListener( 'click', function() { genericClickHandler(KEY_ALWAYS_INVISIBLE, this.checked); }, true);
	}

	// Fix the gallery-more link bug
	function hideGalleryMore(value)
	{
		var link = document.getElementById('gallery-more');
		
		if(link != undefined)
		{
			link.style.visibility = value;
		}
		else
		{
			window.setTimeout(function(){ hideGalleryMore(value); }, 100);
		}
	}

	// Sign on as invisible by default
	function setAlwaysInvisible(value)
	{
		var check = document.getElementById('invisiblecheck');
		
		if(check != undefined)
		{
			check.checked = value;
		}
		else
		{
			window.setTimeout(function(){ setAlwaysInvisible(value); }, 100);
		}
	}

	// Apply fixes on page, based on current setup.
	function fixMeeboContent()
	{
		if( GM_getValue( KEY_HIDE_BLOG, true))
		{
			// Hide the blog
			GM_addStyle( '#welcomeWin { visibility: hidden; } ');

			// Add this line to fix scrollbar problems on Mac Firefox. For some
			// reason, one of the scrollbars in the blog window is not hidden.
			GM_addStyle( '#welcomeWin #content div { overflow : hidden; } ');
		}
		else
		{
			GM_addStyle( '#welcomeWin { visibility: visible; } ');
			GM_addStyle( '#welcomeWin #content div { overflow : visible; } ');
		}

		// Hide the gallery at bottom
		if( GM_getValue( KEY_HIDE_ROOMS, false))
		{
			GM_addStyle( '.meeboGallery { visibility: hidden; } ');
			
			// Fixed the "Hide Rooms" bug. Now the "more" button hide too.
			window.setTimeout(function(){ hideGalleryMore('hidden'); }, 100);
		}
		else
		{
			GM_addStyle( '.meeboGallery { visibility: visible; } ');
			
			// Fixed the "Hide Rooms" bug. Now the "more" button hide too.
			window.setTimeout(function(){ hideGalleryMore('visible'); }, 100);
		}

		// Hide the ads.
		if( GM_getValue( KEY_HIDE_ADS, true))
		{
			GM_addStyle( '.consoleAd { visibility: hidden; } ');
		}
		else
		{
			GM_addStyle( '.consoleAd { visibility: visible; } ');
		}

   		// Hide the logo
		if( GM_getValue( KEY_HIDE_LOGO, false))
		{
			GM_addStyle( '#meebologo { visibility: hidden; } ');
		}
		else
		{
			GM_addStyle( '#meebologo { visibility: visible; } ');
		}

  		// Hide app upsells (like your favorite games) in text.
		if( GM_getValue( KEY_HIDE_APPUPSELL, false))
		{
			GM_addStyle( '.appUpsell { display: none; } ');
		}
		else
		{
			GM_addStyle( '.appUpsell { display: block; } ');
		}

		// Fix the contact details tooltip size
		if( GM_getValue( KEY_FIX_DETAILS, true))
		{
			GM_addStyle( '#infoTooltip { width: 380px; } ');
		}
		else
		{
			GM_addStyle( '#infoTooltip { width: 250px; } ');
		}

		// Sign on as invisible by default
		if( GM_getValue( KEY_ALWAYS_INVISIBLE, false))
		{
			window.setTimeout(function(){ setAlwaysInvisible(true); }, 100);
		}
		else
		{
			window.setTimeout(function(){ setAlwaysInvisible(false); }, 100);
		}
		
	}

	// Add control panel to meebo page.
	window.addEventListener( 'load', addMeeboControlPanel, true);

	// Hide content of meembo page, based on current settings
	window.addEventListener( 'load', fixMeeboContent, true);

})();