// ==UserScript==
// @name           Tumblr BookMarklet Default Settings
// @include        http://www.tumblr.com/share*
// ==/UserScript==

// ==Default Settings==
//

blog="your_default_blog_here";
tab="your_default_tab_here";

// ==Code==
//

chs = document.getElementsByTagName('select');
for( i=0; i<chs.length; i++) {
	select = chs[i];
	for( j=0; j<select.options.length; j++){
		if( select.options[j].innerHTML == blog) select.selectedIndex = j;
	}
}

activate_nav_tab(tab);