// ==UserScript==
// @name          A Re Modified MySpace (Morgan Edition)
// @source        http://userscripts.org/scripts/show/9707
// @identifier    http://userscripts.org/scripts/source/9707.user.js
// @creator       Filthy Jesus (myspace.com/xFilthyxJesusx)
// @version       2.0.1
// @date          2007-09-27
// @description	  09/27/07 LATEST UPDATE. Fixed the script from disabling pages. On MySpace removes: OurProgram box, 300 ads, Transformers ad, featured film, featured music, featured comedy, featured book, featured profile, sponsored links, cool new videos, cool new people, square ad, top and bottom links, URL box, schools homepage, address book, make myspace homepage, get myspace alerts, tiny ad, links box, and the helio link.Then on the Homepage adds a sign out link at the top right . Moves the info box below bulletins and optimizes format.
// @include       http://home.myspace.com/*
// @include       http://home.myspace.com/*fuseaction=user*
// @exclude       *fuseaction=user.*
// ==/UserScript==

//////////////////////////
// Create Signout Link  //
//////////////////////////

	if (document.getElementById('topnav')) {

		var SignOutLink = document.createElement("div");
		SignOutLink.setAttribute('id','SignOutLink');
		SignOutLink.innerHTML = '<a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a>';
		document.body.insertBefore(SignOutLink, document.body.firstChild);

		var s='#SignOutLink{background-color:#6698CB;position:absolute;top:0px;right:0px;padding:1px 2px 4px 4px;-moz-border-radius-bottomleft:6px;}'
			+ '#SignOutLink a{color:white;font-size:11px;font-weight:normal;}';
		GM_addStyle(s);
	}

//////////////////////////
//   Removes The Crap   //
//////////////////////////

	var id = new Array()
	var rmv=0;

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
	id[rmv++] = 'squareAd';
	id[rmv++] = 'gafc'

	id[rmv++] = 'ad';
	id[rmv++] = 'ad160x600';
	id[rmv++] = 'advert';
	id[rmv++] = 'side_google';
	id[rmv++] = 'splash_profile';
	//id[rmv++] = 'StatusBox';
	// id[rmv++] = '';

	GM_addStyle('#'+id.join(',#')+'{visiblity: hidden!important; display:none!important;}')

//////////////////////////
// Move InfoBox/Friends //
//////////////////////////

	if (document.getElementById('home_bulletins')) {

	// Shortcut
		var B= document.getElementById('home_profileInfo');

	// Move Info Bar
		if (document.getElementById("home_infoBar"))
		{
			var I=document.getElementById('home_infoBar');
			B.parentNode.insertBefore(I, B.nextSibling);
			I.innerHTML = I.innerHTML.replace(/<br>/ig,'&nbsp;').replace(/<\/a>/ig,'</a>,')

			var s='#home_infoBar{width:100%!important;height:auto!important;margin:0px!important;}'
				+ '#home_infoBar span,#home_infoBar div{display:inline!important;}';
			GM_addStyle(s);
		}


	// Move Messages back OVER status
		document.getElementById('home_messages').parentNode.insertBefore(document.getElementById('aspnetForm'), document.getElementById('home_messages').nextSibling)

	// Shortcut
		var Z= document.getElementById('home_bulletins')

	// Move Tom's Announcement
		if (document.getElementById("ctl00_Main_MiscAnnouncement.Skin_CMS_Tom_Announcement"))
			Z.parentNode.insertBefore(document.getElementById('ctl00_Main_MiscAnnouncement.Skin_CMS_Tom_Announcement'), Z.nextSibling);

	// Moves Friend list to the top, deleting everything else on the right side. 
		document.getElementById('content').insertBefore(document.getElementById('home_friends'), document.getElementById('content').firstChild);
		document.getElementById('contentWrap').parentNode.removeChild(document.getElementById('contentWrap'));
		GM_addStyle('#content{margin:0px;}'+'#home_friends div.clear{max-height:3px!important;}');
	}

//////////////////////////
//    Extra Removals    //
//////////////////////////

   // This removes anything left over, with "home_featured" or "tkn_" in the ID
   var blacklist = /home_featured|tkn_/;
   var whitelist = /Main_FriendSpace/;

   divs = document.getElementsByTagName('div');
   for (var i=0;i<divs.length;i++)
       if (divs[i].id && divs[i].id.match(blacklist) &&
!divs[i].id.match(whitelist))
               divs[i].parentNode.removeChild(divs[i]);

//////////////////////////
// Create Signout Link  //
//////////////////////////

	if (document.getElementById('topnav')) {

	//  Replaces "Classifieds" with "Sign Out"
	//	document.getElementById('topnav').innerHTML =
	//		document.getElementById('topnav').innerHTML.replace(/classifieds.myspace.com\/index.cfm\?fuseaction=classifieds.+Classifieds/,'collect.myspace.com/index.cfm?fuseaction=signout">Sign Out');

		var SignOutLink = document.createElement("div");
		SignOutLink.setAttribute('id','SignOutLink');
		SignOutLink.innerHTML = '<a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a>';
		document.body.insertBefore(SignOutLink, document.body.firstChild);

		var s='#SignOutLink{background-color:#6698CB;position:absolute;top:0px;right:0px;padding:1px 2px 4px 4px;-moz-border-radius-bottomleft:6px;}'
			+ '#SignOutLink a{color:white;font-size:11px;font-weight:normal;}';
		GM_addStyle(s);
	}