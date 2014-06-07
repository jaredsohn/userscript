// ==UserScript==
// @name           Columbia - Automatically redirect to www.columbia.edu
// @namespace      http://www.jeffreykeen.com/projects/
// @description    
// @include        http://columbia.edu/*

// ==/UserScript==

/* 
   Author: Jeff Keen - http://www.jeffreykeen.com

	Have you ever been annoyed by the following message?

		"Are you trying to reach Columbia University? The correct URL for our 
		Web site is http://www.columbia.edu/. Please update your bookmarks.

		If you are not automatically redirected to the Columbia University 
		homepage within 6 seconds, please click here."


	This message has plagued and annoyed me for years, as I don't generally bother to type www.
	in front of domains I put into the address bar.  I pleaded with Columbia to add a simple .htaccess 
	rule, but they would not.  They insist the highly-annoying meta-redirect is necessary.  Frankly, I think 
	this is retarded, and this script solves this problem.
	

   Version History:
 
       1.0   - 07.05.2007 - Initial Release.

*/

	var current_location=location.href;
	var new_location=current_location.replace('http://columbia.edu', 'http://www.columbia.edu');
	
	location.replace(new_location);
	
	// Problem solved!  Peace restored!
	