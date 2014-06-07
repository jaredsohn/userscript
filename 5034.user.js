// ==UserScript==
// @name          A Re Modified MySpace
// @source        http://userscripts.org/scripts/show/5034
// @identifier    http://userscripts.org/scripts/source/5034.user.js
// @creator       Filthy Jesus (http://xFilthyxJesusx.com)
// @version       2.0.3
// @date          2007-11-29
// @description	  11/29/07 - Classic Layout Only. This moves the info box below bulletins and optimizes the layout. Module removals include: Status box, URL box, address book, schools, all "featured/sponsered/cool" displays, and then this replaces the blue header with a "sign out" link at the top right.
// @include       http://home.myspace.com/*fuseaction=user*
// @exclude       *fuseaction=user.*
// ==/UserScript==

	//////////////////////////////////////////////////////////////////
	// SETTINGS
	//////////////////////////////////////////////////////////////////
	//
		var SHOW_STATUS_BOX = true;  // true/false
	//
	//////////////////////////////////////////////////////////////////
	//
		var MORGAN_EDITION  = false; // true/false
	//
	//////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////
//////      DO NOT EDIT BELOW THIS LINE      //////
///////////////////////////////////////////////////

if ( $('home_profileInfo') ) // START - Test For Classic Layout
{
	//////////////////////////
	//   Removes The Crap   //
	//////////////////////////

		var id = new Array()
		var rmv=0;

		if (SHOW_STATUS_BOX != true)
			id[rmv++] = 'StatusBox';

		id[rmv++] = 'header';
		id[rmv++] = 'home_schools';
		id[rmv++] = 'home_additionalLinks';
		id[rmv++] = 'home_searchAddressBook';
		id[rmv++] = 'home_coolNewVideos';
		id[rmv++] = 'home_greybox';
		id[rmv++] = 'home_setHomePage';
		id[rmv++] = 'home_featured_filmmaker';
		id[rmv++] = 'home_featured_music';
		id[rmv++] = 'home_featured_books';
		id[rmv++] = 'home_featured_comedy';

		id[rmv++] = 'ad';
		id[rmv++] = 'gafc';
		id[rmv++] = 'ad160x600';
		id[rmv++] = 'advert';
		id[rmv++] = 'squareAd';
		id[rmv++] = 'side_google';
		id[rmv++] = 'splash_profile';
		id[rmv++] = 'UserHomeSwitch';
		// id[rmv++] = '';

		GM_addStyle('#'+id.join(',#')+'{visiblity: hidden!important; display:none!important;}')

	//////////////////////////
	// Move InfoBox/Friends //
	//////////////////////////

	// Move Info Bar
		if ( $('home_infoBar') && $('home_bulletins') )
		{
			$('home_bulletins').parentNode.insertBefore($('home_infoBar'), $('home_bulletins').nextSibling);
			$('home_infoBar').innerHTML = $('home_infoBar').innerHTML.replace(/<br>/ig,'&nbsp;').replace(/<\/a>/ig,'</a>,')

			var s='#home_infoBar{width:100%!important;height:auto!important;margin:0px!important;}'
				+ '#home_infoBar span,#home_infoBar div{display:inline!important;}';
			GM_addStyle(s);
		}


	// Moves Friend Updates up.
		$('home_friends').insertBefore( $('home_activities'), $('home_friends').firstChild );

	// Moves Friend list to the top, deleting everything else on the right side.
		$('content').insertBefore( $('home_friends'), $('content').firstChild );
		$('contentWrap').style.display = 'none';

	// Move Status Box
		$('home_messages').parentNode.insertBefore($('StatusBox'), $('home_messages').nextSibling);


	//////////////////////////
	// Morgan's Edition     //
	//////////////////////////

		if (MORGAN_EDITION)
		{
		// Moves Toms Announcement below bulletins
			if ($("ctl00_Main_MiscAnnouncement.Skin_CMS_Tom_Announcement"))
				$('home_bulletins').parentNode.insertBefore($("ctl00_Main_MiscAnnouncement.Skin_CMS_Tom_Announcement"), $('home_bulletins').nextSibling);

		// Moves Info Bar below the profileinfo box
			if ($('home_infoBar'))
				$('home_profileInfo').parentNode.insertBefore($('home_infoBar'), $('home_profileInfo').nextSibling);

			GM_addStyle('#home_infoBar{background-color:white}')
		}


	//////////////////////////
	// Create Signout Link  //
	//////////////////////////

		if ($('topnav'))
		{
			var SignOutLink = document.createElement("div");
			SignOutLink.setAttribute('id','SignOutLink');
			SignOutLink.innerHTML = '<a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a>';
			document.body.insertBefore(SignOutLink, document.body.firstChild);

			var s='#SignOutLink{background-color:#6698CB;position:absolute;top:0px;right:0px;padding:1px 2px 4px 4px;-moz-border-radius-bottomleft:6px;}'
				+ '#SignOutLink a{color:white;font-size:11px;font-weight:normal;}';
			GM_addStyle(s);
		}

} // END - Test For Classic Layout

function $(elementId) { return document.getElementById(elementId); } // shortcut from "Prototype Javascript Framework"