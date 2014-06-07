// ==UserScript==
// @name          	Show banned user(3.0)
// @namespace		dazarobbo
// @description   	Placeholder that identifies a post which is hidden due to the user being blacklisted
// @version	 		3.0
// @include			http*://*bungie.net*posts.aspx*
// @author	  		dazarobbo
// @copyright		2011, dazarobbo
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
Number.prototype.addLeadingZeros=function(a){var b=this.toString();while(b.length<a){b="0"+b;};return b;};function doPlaceholders(){var amount=document.getElementsByClassName("forum_item_outer_shell").length;for(i=1;i<=amount;i++){i=i.addLeadingZeros(2);with(document){if(!getElementById("ctl00_mainContent_postRepeater1_ctl"+i+"_ctl00_postControl_skin_PostBlock")){var placeholder=createElement("div");placeholder.innerHTML="<br /><div style='background-color:#FF0000;width:650px;height:20px;margin-left:10px;padding-top:5px;text-align:center;color:#FFFFFF;'>Banned User posted here</div>";getElementById("ctl00_mainContent_postRepeater1_ctl"+i+"_ctl00_post_display_container").appendChild(placeholder);};};};};doPlaceholders();