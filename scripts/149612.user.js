// ==UserScript==
// @name          Give us Our Dash Tags
// @namespace     http://userstyles.org
// @description	  This script restores a user's tracked tag list to the sidebar on tumblr, along with a new post count that updates every 30 seconds.
// @author        oldandnewfirm
// @homepage     
// @history       1.0 first version
// @history       1.1 Tag list will now appear on pages that have a promo in the sidebar.
// @history       1.2 Fixed incorrect post count issue and restored tag list to tag pages. Note that some tag pages will produce a duplicate list of tracked tags, of which only the first will report post count. I'm not sure how to avoid this at the moment.
//@include http://www.tumblr.com/*
// @match	http://www.tumblr.com/*

// ==/UserScript==

var jQuery, $ = null;

function addJQuery(callback) {
    var p = null;
	
    if(window.opera || window.navigator.vendor.match(/Google/)) {
        var div = document.createElement("div");
        div.setAttribute("onclick", "return window;");
        p = div.onclick();
    }
    else {
        p = window;
    }

    jQuery = $ = p.jQuery;
    callback();
}

var myFunction = function() {
	jQuery('div#right_column > ul.controls_section:first-child, ul#related_tags').after('<ul class="controls_section" id="tracked_tags"></ul>');
    jQuery('div.tracked_tags a').each(function (i) {
        var tagID = jQuery(this).attr("id");
        var tagIDNumber = tagID.replace('tag_','');
        var tagName = jQuery(this).attr("href");
        var tagNameClean = tagName.replace('/tagged/','');
        var tagContent ='';
        tagContent += '<li><a href="'+tagName+'" id="'+tagID+'" class="tag">';
        tagContent += '<div class="hide_overflow">'+tagNameClean+'</div>';
        tagContent += '<span id="tag_unread_'+tagIDNumber+'" class="count" style=""></span></a></li>';                  
        jQuery(tagContent).appendTo('div#right_column ul#tracked_tags');                                                                      
    });	
};

	var NewPosts = function(){
		jQuery('div.tracked_tags > div').each(function (i) {
			var thisIndex = jQuery(this).index()-1;
			if (jQuery(this).find('small').length){			
				var postCount = jQuery(this).find('small').text();		
				jQuery('div#right_column ul#tracked_tags li:eq('+thisIndex+')').find('.count').html(postCount.replace(/[^0-9]+/g, "") );
			}
		});
					setTimeout(NewPosts,30000);
	}


addJQuery(myFunction);
addJQuery(NewPosts);