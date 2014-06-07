// ==UserScript==

// @name           Windows Live Hotmail Ad Banner Remover

// @namespace      http://googatrix.googlepages.com

// @description    Removes the ad banner from Windows Live Hotmail

// @include        *mail.live.com*

// ==/UserScript==


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// old Inbox banner

if( document.getElementById( "adHeader" ) != null )

{

	var banner = document.getElementById( "adHeader" );

	banner.parentNode.removeChild( banner );

}
// new Inbox banner

else if( document.getElementById( "RadAd_Banner" ) != null )

{

	var banner = document.getElementById( "RadAd_Banner" );

	banner.parentNode.removeChild( banner );

}

// banner on Today page
if (document.getElementById( "RadAd_TodayPage_Banner" ) != null)

{

	var banner = document.getElementById( "RadAd_TodayPage_Banner" );

	banner.parentNode.removeChild( banner );

}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// end of windows_live_hotmail_ad_.user.js
