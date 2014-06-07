// ==UserScript==
// @name          No Gluteus Maximus 
// @namespace     wp
// @description   Removes the &p=-1#bottom from thread links on the main index page on whirlpool
// @include       http://forums.whirlpool.net.au/
// @include       http://forums.whirlpool.net.au/forum.cfm
// ==/UserScript==

if(navigator.userAgent.toLowerCase().indexOf('firefox')){
	
	$ = unsafeWindow.jQuery;
	
}

$('.threads a').each( function(){

        this.href = this.href.replace("&p=-1#bottom", "");

});