// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "google groups for Chinese Mainland", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// turn highlighted search terms into links to the next instance.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name    	    google groups for Chinese Mainland
// @description     google groups link fix
// @include         http://*
// ==/UserScript==
	
(function() {
 var allLinks = document.links;
 if (allLinks  != null)
   {
      for (i = 0; i <allLinks.length; ++i)
      {
         if (allLinks [i].href.indexOf ("groups.google.com") > 0)
         {
             allLinks [i].href = allLinks [i].href.replace ("groups.google.com", "groups.google.de");
         }
      }
   }
}
)();
