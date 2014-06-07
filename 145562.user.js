// ==UserScript==
// @name          Rumplestiltskin Tumblr Dashboard Icons
// @namespace     http://userstyles.org
// @description	  This script provides you with Tumblr dashboard icons inspired by the character Rumplestiltskin from Once Upon a Time
// @author        oldandnewfirm
// @homepage     
// @history       1.0 first version
// @include	      http://www.tumblr.com/*

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
        p = unsafeWindow;
    }

    jQuery = $ = p.jQuery;
    callback();
}

var myFunction = function() {
	jQuery('#header .tab.iconic[id!="missinge_button"] a').css({"background-image":"url('http://i.imgur.com/2QmZG.png')"});
	
	jQuery('#header .tab.iconic').each(function (i) {
		var tabID = jQuery(this).attr('id');
		var labelName = tabID.replace('_button','');
		if (jQuery(this).find('span[class="tooltip_label"]').length){
		}
		else{
		jQuery(this).append('<span class="tooltip_label">'+labelName+'</span>');
		jQuery('.tooltip_label').css({'text-transform':'capitalize'});
		}
	});

};

addJQuery(myFunction);
