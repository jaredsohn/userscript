// ==UserScript==
// @name           Facebook - Add Page Tab to Fanpage
// @namespace      http://www.pbworks.net
// @description    Just a link to make it easier to add an app to a fan page
// @author         Paolo Brocco
// @homepage       http://www.pbworks.net
// @copyright      2012+, Paolo Brocco (http://www.pbworks.net)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        2012.10.10
// @include        http://developers.facebook.com/apps/*/summary*
// @include        https://developers.facebook.com/apps/*/summary*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @uso:script     126356
// ==/UserScript==

$(document).ready(function () {	
	unsafeWindow.initButton();
});

/*** INIT FUNCTIONS: logic to decide when to activate the sorting ***/

unsafeWindow.initButton = function(){

	var pb_facebook_app_id = $("table.uiGrid.developerAppSummaryBanner table.uiGrid > tbody > tr:first-child > td:nth-child(2)").text();
	
	//The Facebook App ID must exist, if not it means the script has loaded before the page is ready... thus a timer is called
	if(pb_facebook_app_id != "")
	{			
		//unsafeWindow.console.log("facebook app id: " + pb_facebook_app_id);

		var pb_facebook_tab_url = $("#page_tab_url").val();
		//console.log("facebook tab url: " + pb_facebook_tab_url);

		if (pb_facebook_tab_url != "") {
			//link to be created: http://www.facebook.com/dialog/pagetab?app_id=YOUR_APP_ID&next=YOUR_URL
			var pb_add_tab_url = "http://www.facebook.com/dialog/pagetab?app_id=" + pb_facebook_app_id + "&next=" + pb_facebook_tab_url;
			//console.log("facebook add tab url: " + pb_add_tab_url);

			//adding the link to the related links
			$("#navsubsectionpages > li > ul").append("<li><a href=\"" + pb_add_tab_url + "\" target=\"_blank\">Add Page Tab</a></li>");
		}
		return false;
	}
	else
	{
		//unsafeWindow.console.log("waiting 100 ms...");	
		setTimeout('initButton()', 100);
	}
}