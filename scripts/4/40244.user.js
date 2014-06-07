// ==UserScript== 
// @name           Twitter All Replies 
// @namespace      http://userscripts.org/users/35001 
// @description    Add Link on tabMenu for all Replies
// @include        http://twitter.com/home 
// @include        https://twitter.com/home 
// ==/UserScript==

var tabMenu, my_username, my_ht;
tabMenu = document.getElementById( 'tabMenu' );
my_username = document.getElementById( 'profile_link' ).href.replace( /.*\//, '' );
if ( tabMenu && my_username ) {
	my_ht = document.createElement( "div" );
	my_ht.innerHTML = '<li><a href="http://search.twitter.com/search?q=%40' +
		my_username + '">@' + my_username + '</a></li>';
	tabMenu.appendChild( my_ht ); 
}
