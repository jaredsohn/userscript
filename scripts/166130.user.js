// ==UserScript==
// @id             forums.whirlpool.net.au-27301419-b4c8-4901-987e-6feb3eaf437e@w3t5g
// @name           Force scroll to anchor on page load for whirlpool plus
// @version        1.1
// @namespace      whirlpool
// @author         Yansky
// @description    
// @include        http://forums.whirlpool.net.au/forum-replies.cfm*
// @include        https://forums.whirlpool.net.au/forum-replies.cfm*
// @run-at         document-start
// ==/UserScript==

if(window.location.hash.length > 0){

	var mouseScrolled = false;

	function forceAnchorScrollTo(){

		window.location.href=window.location.href;

		window.setTimeout(function(e){
			
			if(document.readyState!=='complete' && !mouseScrolled){
			
				forceAnchorScrollTo();
				
			}

		},5);

	}
	forceAnchorScrollTo();
	
	document.addEventListener('wheel',function(e){
		
		mouseScrolled = true;
		
	},false);
	
}