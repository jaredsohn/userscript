// ==UserScript==
// @name          	Show banned user (2.0)
// @namespace		http://userscripts.org/scripts/source/55158.user.js
// @description   	Placeholder that identifies a post which is hidden due to the user being blacklisted, modified with the "Moderator Notice" found when a banned user had created a topic.
// @version	 		2.0
// @include			http://*.bungie.net*posts.aspx*
// @author	  		dazarobbo, modified by reach17, and wubby118
// @copyright		2011, dazarobbo, http://dazarobbo.comlu.com
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

	String.prototype.addLeadingZeros = function(length){var str = this;while (str.length < length){str = "0" + str;};return str;};
	function doPlaceholders(){var amount = document.getElementsByClassName("forum_item_outer_shell").length;for (i=1;i<=amount;i++){i = i.toString().addLeadingZeros(2);with (document){if (!getElementById("ctl00_mainContent_postRepeater1_ctl" + i + "_ctl00_postControl_skin_PostBlock")){var placeholder = createElement("div");placeholder.className = 'forumpost';placeholder.innerHTML = "<br /><div style='background-color:#000000; width:550px; height:18px; margin-left:110px; padding-top:5px; padding-left:7px; text-align:left; color:#CC0000;'>Banned User | Dishonorable Blacklisted Member</div><div class='forumavatar'><img src='http://i189.photobucket.com/albums/z24/predator5791/BANNED.jpg' style='margin-top: -22px;'></div><div style='width:550px; height:45px; margin-left:110px; padding-top:16px; padding-bottom:16px; text-align:left; color:#CC0000; '><b><i>Moderator Notice:</b> This user has been blacklisted from this forum. Until the user is removed from the blacklist, all posts this user has made have been hidden, and all topics created by this user have been censored.</i></div>";getElementById("ctl00_mainContent_postRepeater1_ctl" + i + "_ctl00_post_display_container").appendChild(placeholder);};};};};
	doPlaceholders();