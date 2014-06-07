// ==UserScript==
// @name           Subwire Seen This!
// @namespace      http://userscripts.org/users/ToostInc 
// @include        http://www.thesubwire.com/*
// @description    Automatically sets episodes/chapters as "Seen".
// @copyright      2009+, Toost Inc.
// @license        kopimi http://www.kopimi.com/kopimi/
// @version        3.3
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready( function () {

	$("#notSeenEpisode > div > a").attr("id","button");
	//$(".userbox > div > a:1").attr("id","Login");

	var log_in = $(".userbox > div").html().indexOf("Login");
	
	if(log_in > -1) {

		var home = location.href
		GM_log("You are not Logged In!");
		$("#notSeenEpisode").html("<form method='POST' action='http://www.thesubwire.com/login' class='formBox formFlat'>\n\t<input type='hidden' value='submit' name='action'>\n\t<input type='hidden' value='"+ home + "' name='redirect' id='redirect'>\n\n\t<div class='field'>\n\t\t<label for='username'>Username or Email:</label>\n\t\t<div class='value'>\n\t\t\t<input type='text' style='width: 200px;' value='' name='username' id='username' class='formText'>\n\t\t</div>\n\t</div>\n\t<div class='field'>\n\t\t<label for='password'>Password:</label>\n\t\t<div class='value'>\n\t\t\t<input type='password' style='width: 200px;' name='password' class='formText'>\n\t\t</div>\n\t</div>\n\t<div class='field'>\n\t\t<input type='checkbox' value='1' name='rememberLogin' id='rememberLogin'> <label for='rememberLogin'>Remember Me</label>\n\t</div>\n\t<div class='footnote'>\n\t\t<a href='http://www.thesubwire.com/resetpassword'>Forgot password?</a>\n\t</div>\n\t<div class='formButtonBar'>\n\t\t<input type='submit' value='Login!'>\n\t</div>\n</form>\n");
	
	}


	else if(log_in == -1){

		var seen = $("#notSeenEpisode").css("display");

		if (seen == "none") {
			var tracking = $("#notSeenEpisode > b").html().indexOf("You are not tracking this series");
			if (tracking > -1) {
				GM_log("You are not tracking this series");
			}
				


		}
		
		else if (seen != "none") {
				
			var html = $("#notSeenEpisode > div ").html();
			var jurl = /trackEpisode.*(?=; return)/.exec(html);
			var jurl = "javascript:"+ jurl + "; void(0);";
			location.assign(jurl);
				
			GM_log("You've now Seen this Episode!");

		}
		

	}

});

	
