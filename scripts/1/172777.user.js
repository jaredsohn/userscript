// ==UserScript==
// @name           NT Keyboard
// @namespace      https://nordic-t.me
// @include 	   *nordic-t.me/forums.php?action=viewtopic*
// @description    NT Keyboard
// @version        1.0
// ==/UserScript==

function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}

function keyboard () {
	jQuery('<style>.selected { background-color: rgb(48, 43, 43); }</style>').appendTo('body');

	current = jQuery('#post_' + window.location.hash.substring(1)).parent().parent();

	if(current.length != 0) {
		current.addClass("selected");
	} else {
		jQuery("td[id^='post_']").first().parent().parent().addClass("selected");
	}

	jQuery("td[id^='post_']").parent().parent().click(function() {
  		jQuery(".selected").removeClass('selected');

  		jQuery(this).addClass('selected');
	});

	jQuery(document).keydown(function(e){
	    if (e.keyCode == 74) { 
	    	current_post = jQuery('.selected');
	    	next_post = current_post.parent().nextAll(".main").first();
	    	
	    	if(next_post.length != 0)
	    	{
		    	jQuery(".selected").removeClass('selected');
	    		next_post.find(">:first-child").addClass('selected');
	    		next_post.prevAll("table").first()[0].scrollIntoView(true);
	    	}
	    }
	});

	jQuery(document).keydown(function(e){
	    if (e.keyCode == 75) { 
	    	current_post = jQuery('.selected');
	    	next_post = current_post.parent().prevAll(".main").first();
	    	
	    	if(next_post.length != 0)
	    	{
		    	jQuery(".selected").removeClass('selected');
	    		next_post.find(">:first-child").addClass('selected');
	    		next_post.prevAll("table").first()[0].scrollIntoView(true);
	    	}
	    }
	});


	jQuery(document).keydown(function(e){
		if (e.keyCode == 78) { 

			nextbutton = jQuery('b:contains("Next >>")').first().parent();
			if(nextbutton.attr('href')) {
				window.location.href = nextbutton.attr('href');
			};
		}
	});

	jQuery(document).keydown(function(e){
		if (e.keyCode == 80) { 

			prevbutton = jQuery('b:contains("<< Prev")').first().parent();
			if(prevbutton.attr('href')) {
				window.location.href = prevbutton.attr('href');
			};
		}
	});
};





addFunction(keyboard, true);