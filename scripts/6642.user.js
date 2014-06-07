// ==UserScript==
// @name           del.icio.us delete now 2
// @description    Removes the delete-bookmark-confirmation functionality from del.icio.us.
// @include        http://del.icio.us/*
// ==/UserScript==


(function() {
	window.addEventListener("load", function(e) {
		// change all "delete" Links to "deleteNow" Links
		var links = unsafeWindow.$c('rm',document,'a');
		for( i=0; i < links.length; i++) {
			unsafeWindow.rmClass(links[i],"rm");		// should not trigger original function
			unsafeWindow.addClass(links[i],"rmYes");	// triggers the real delete function
			unsafeWindow.addClass(links[i],"myDelLink");	// mark link for later access by delAll function
		}
		e=document.createElement("a");
		e.innerHTML="delete all";
		// add a Link to delete all displayed Bookmarks
		e.href="javascript:delAll();";
		x=unsafeWindow.$c('pager',document,'p');
		x[0].appendChild(e);
	},false);
	unsafeWindow.delAll = function(){
		var links = unsafeWindow.$c('myDelLink',document,'a');
		if(links.length && links.length > 0) {
			unsafeWindow.rmPostYes.call(links[0]);
			unsafeWindow.setTimeout("delAll()",750);	// prevent triggering of Yahoos Flood detection
		} else location.reload();
	}
})();
