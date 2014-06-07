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
// select "googlecache", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// turn highlighted search terms into links to the next instance.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name    	    google cache
// @description     google cache link fix
// @include         http://www.google.com/*
// ==/UserScript==
	
(function() {
 var allLinks = document.links;
 if (allLinks  != null)
   {
      for (i = 0; i <allLinks.length; ++i)
      {
         if (allLinks [i].href.indexOf ("/search?q=cache:") > 0)
         {
             allLinks [i].href = allLinks [i].href.replace ("/search?q=cache:", "/search?&q=cache:");
         }
      }
   }
}
)();
