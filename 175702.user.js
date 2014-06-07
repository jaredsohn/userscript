// ==UserScript==
// @name           LeakForums - Hide Posts
// @namespace      lf/hidepost
// @description    Hide extremely long, nonsensual posts in a thread with a simple click!
// @author         Mike
// @copyright      Mike 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/showthread.php*
// @match          *://leakforums.org/showthread.php*
//
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/175702.user.js
// @updateURL      https://userscripts.org/scripts/source/175702.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
// ==/UserScript==

(function() {
	if(typeof(jQuery) == "function") {
		var posts = jQuery('[id^=post_]').filter(function() {
			return((" " + this.id+ " ").match(/post_\d/) != null);
		});

		for(var i = 0;i < posts.length;++i) {
			var editMe = posts[i].getElementsByClassName("float_left smalltext")[0];
			var newElement = document.createElement("temp");
			
			jQuery(newElement).html("<a href='javascript:void(0)' id='hidepost_"+i+"' value='0' title='Hide This Post'>Hide</a> - ");
			jQuery(editMe).html(jQuery(newElement).html() + jQuery(editMe).html());
			
			jQuery('#hidepost_'+i).click(function() {
				if(jQuery(this).val() == 0) {
					jQuery(this).text("Show");
					jQuery(this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("trow2 post_content")[0].parentElement).hide();
					jQuery(this).val('1');
					this.setAttribute("title","Show this post");
				} else {
					jQuery(this).text("Hide");
					jQuery(this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("trow2 post_content")[0].parentElement).show();
					jQuery(this).val('0');
					this.setAttribute("title","Hide this post");
				}
				return false;
			});
		}
	} else {
		console.error("[Userscript - Hide Posts] Unable to detect jQuery.");
	}
})();