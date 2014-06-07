// ==UserScript==
// @name           Holabox Notifier
// @namespace      hbNotify
// @description    See your holabox updates no matter what site you're on, a little popup displays with new messages, comments and any other updates you select from your settings page.
// @include        *
// ==/UserScript==

/* Setup Custom Styles */
BackgroundColor = "#eeeee;";
FontColor = "#000000";
FontSize = "14px";
BorderColor = "#6698cb";
BorderStyle = "solid";
BorderWidth = "0px 0px 2px 0px";
Padding = "6px";

/* -- DO NOT EDIT BELOW THIS LINE -- */

/* Actual Request Function */
GM_xmlhttpRequest({
	method: "GET",
	url: "http://holabox.com/user_update_ajax.php?getalldata=1",
	headers: {
		"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
		"Accept": "text/xml",
	},
	
	onload: function(responseDetails){
		/* Get Data And Evaluate */
		ResponseText = responseDetails.responseText;
		eval(ResponseText);
		
		/* Create Elements */
		var CreateDiv = document.createElement("div");
		CreateDiv.setAttribute(
			"style",
				"" // Use styles above to edit custom box
				+"background-color:" + BackgroundColor + ";"
				+"border-width:" + BorderWidth + ";"
				+"border-style:" + BorderStyle + ";"
				+"border-color:" + BorderColor + ";"
				+"font-size:" + FontSize + ";"
				// Defaults
				+"padding:0px;"
		);
		
		/* Create Inside Table */
		CreateDiv.innerHTML = "<table style='width:100%;border-collapse:collapse;border-spacing:0px'><tr>"
			+"<td style='background:transparent;color:" + FontColor + ";padding:" + Padding + "'><b>" + ShowMsg + "</b></td>" // Login Checker
			+"<td align='right' style='background:transparent;color:"+ FontColor + ";padding:" + Padding + "'><b>" + NotificationMsg + "</b></td>" // New Notifications
			+"</tr></table>";
		
		/* Pre-append Body */
		if(top.location == location){
			document.body.insertBefore(CreateDiv, document.body.firstChild);
		}
	}

});