// ==UserScript==
// @name           Re-Load Meebo Blog
// @description   
// @include        http*://www.meebo.com/* 
// @version        1.5
// @date           13-APR-2008
// @creator        Josh Budde
// ==/UserScript==
(function()
{
	// Keys for GM values.
	KEY_HIDE_BLOG = 'hide_blog';


	// On click handlers for control panel.

	function onClickHideBlog()
	{
		GM_setValue(KEY_HIDE_BLOG, this.checked); hideMeeboContent();
	}


	// Adds control panel to meebo UI.
    function addMeeboControlPanel()
    {
   		var nodeControlPanel = document.createElement("div");

		nodeControlPanel.innerHTML =
	    '<div id="msd_controlpanel" style="position:absolute; top:19px; right:625px; z-index:1000; padding:3px; color:white; font-family: Tahoma, Arial, sans serif; font-size: 12px;">' +
		'<div id="msd_show" style="padding: 1px">' +
		'<a style="color:white;" href="#blog" onclick="{gWindowMgr.createWelcomeWindow()}">blog</a>' +
		'</div>' +
		'</div>';


		document.body.insertBefore(nodeControlPanel, document.body.firstChild);

		document.getElementById( 'msd_checkbox_blog').addEventListener( 'click', onClickHideBlog, true);

	}

	// Hides content on page, based on current setup.
	function hideMeeboContent()
	{
		if( GM_getValue( KEY_HIDE_BLOG, true))
		{
			// Hide the blog

			GM_addStyle( '#welcomeWin { visibility: visible; } ');
			GM_addStyle( '#welcomeWin #content div { overflow : visible; } ');

		}

	}

	// Add control panel to meebo page.
	addMeeboControlPanel();


})();