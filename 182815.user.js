// ==UserScript==
// @name           	fizy playTheSongPlease
// @description    	make all songs visible and reachable
// @author		  	yzbasbug
// @namespace      	http://userscripts.org/users/yzbasbug
// @include        	http://fizy.com/*
// @version		1.0
// ==/UserScript==

function playTheSongPlease() {
	 setTimeout(function(){
	        $.inArray = function(a,b){ return -1;};
	    	$(".item").each(function(){ 
	    	    $(this).removeClass("universal");
	    	    $(this).removeClass("emi");
	    	    $(this).removeClass("warner");
	    	});
     },3000);
	fizy.search = (function() {
	    var cached_function = fizy.search;

	    return function() {
	        cached_function.apply(this, arguments); // use .apply() to call it
	        setTimeout(function(){
	 	        $.inArray = function(a,b){ return -1;};
	 	    	$(".item").each(function(){ 
	 	    	    $(this).removeClass("universal");
	 	    	    $(this).removeClass("emi");
	 	    	    $(this).removeClass("warner");
	 	    	});
	        },3000);
	       
	    };
	}());
	
}; 


$(window).load(function() 
{
	// executes when complete page is fully loaded, including all frames, objects and images
	playTheSongPlease();
});  
