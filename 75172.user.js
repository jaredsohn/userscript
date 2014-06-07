// ==UserScript==
// @name           Facebook Likes
// @namespace      facebook.com
// @description    Adds command to greasemonkey to add like button to any site
// @include        *
// @version     1.00
//
// @require        http://userscripts.org/scripts/source/111583.user.js
// @history	1.00 Initial release
// ==/UserScript==

(function() {
	//Check for new versions
	ScriptUpdater.check(75172,/*currentVersion*/'1.00');
	
	GM_registerMenuCommand( "Facebook Likes", like, "f" );
})();
function like(){
	try{
		var url=encodeURIComponent(location.href);
		var ifr=document.createElement('iframe');
		ifr.style.position='absolute';
		ifr.style.top=10+'px';ifr.style.left=10+'px';
		ifr.style.width=450+'px';ifr.style.height=100+'px';
		ifr.style.border='none';
		ifr.src='http://www.facebook.com/plugins/like.php?href='+url+'&show_faces=true&width=450&action=like&colorscheme=light';ifr.scrolling='no';
		ifr.frameborder=0;document.getElementsByTagName('body')[0].appendChild(ifr);
	}
	catch(e)
	{}
}
