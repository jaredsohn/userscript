// ==UserScript==
// @name           better Facebook Layout
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      de.facebook
// @include        http://*.facebook.com/*
// ==/UserScript==

function reset_layout() {
	jQuery("#rightCol").hide();
	jQuery("#globalContainer").css({width:"100%"});
	jQuery("#gb_content_and_toolbar").css({width:"100%"});
        jQuery("#contentCol").css({paddingTop:0});
        jQuery("div.uiHeaderPage").css({padding:0});

	//Groups page
	jQuery("#right_column").css({width:"100%"});
        jQuery(".left_column_container").css({width:"100%"});
        jQuery("#pagelet_ads").hide();
	

	//reformat stream
	jQuery(".uiStreamStory").each(function(key,element) {
		jQuery(element).css({width:520});
		jQuery(element).css({float:"left"});
		if (key % 2 == 0) {
		} else {
		}
	});

        jQuery("abbr.timestamp").css({fontWeight:"bold"});

	window.setTimeout(reset_layout, 1000);
}

reset_layout();