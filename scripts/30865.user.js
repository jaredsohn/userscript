// ==UserScript==
// @name           New Facebook Header Tweaks
// @namespace      http://www.dumbui.com/FacebookTweaks
// @description    Adds a link to My Groups in the standard header and removes the Welcome to the new Facebook header (FF3 Only)
// @include        http://*.new.facebook.com/*
// @version        0.3
// ==/UserScript==

// Creative Commons Attribution License
//
// scauer at gmail.com and http://twitter.com/scauer
//
// Version History
//
// v0.3
//   - Remove the New Facebook Header
// v0.2 
//   - Modified @include list
// v0.1 
//   - Initial Release

(function(){

	// This is only in Firefox 3
	if (document.getElementsByClassName)
	{
		var elements = document.getElementsByClassName('fbnew_preview_bar');
		if (elements.length == 1)
		{
			elements[0].style.display = 'none';
		}
	}

	var menubar = document.getElementById('fb_menubar_core');
	var profile = document.getElementById('fb_menu_profile');

	var profileLinkText = profile.firstChild.firstChild.getAttribute('href');
	var id = profileLinkText.split('=')[1];

	var fb_menu = document.createElement('div');
	fb_menu.setAttribute('class', 'fb_menu');

	var fb_menu_title = document.createElement('div');
	fb_menu_title.setAttribute('class', 'fb_menu_title');

	var link = document.createElement('a');
	link.setAttribute('href', 'http://www.new.facebook.com/groups.php?id=' + id );

	var text = document.createTextNode('My Groups');

	menubar.appendChild(fb_menu);
	fb_menu.appendChild(fb_menu_title);
	fb_menu_title.appendChild(link);
	link.appendChild(text);

			
})();
