// ==UserScript==
// @name        NP Auto-Adopter
// @namespace   NPautoadopter
// @include     *neopets.com/pound/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @require	http://www.zoidberg25.com/jquery-1.11.0.min.js
// @updateURL	http://userscripts.org/scripts/source/461275.user.js
// @downloadURL	http://userscripts.org/scripts/source/461275.user.js
// ==/UserScript==

var petbox = $("#pet1_price_div");
var currenturl = $(location).attr('href');
var selectedpet = GM_getValue("selectedpet", "none");
var autoadopterstatus = GM_getValue("autoadopterstatus", "0");

if (currenturl == "http://www.neopets.com/pound/adopt.phtml?search="+selectedpet) {
	if (autoadopterstatus == "1") {
		if (petbox.length > 0) {
			//alert("up for trade!");
			//adoptthatfucker();
			setTimeout(adoptthatpet,500);
		} else {
			//alert("nope.avi");
			location.reload();
		}
	}
} else if (currenturl == "http://www.neopets.com/pound/settings") {
	$("title").text("Neopets - Auto-adopter settings");

	$(".content").html("<td class=\"content\"><b>Pound Auto-Adopter Settings</b><p>Hey baby! You can change the settings for the auto-adopter here!</p><p></p><center><a href=\"http://www.neopets.com/pound/adopt.phtml?search="+selectedpet+"\" target=\"_blank\"><b>Start auto-search</b></a> (save settings first!) | <a href=\"http://www.neopets.com/petlookup.phtml?pet="+selectedpet+"\" target=\"_blank\"><b>View current pet's lookup</b></a></center><br><table border=\"0\" bgcolor=\"#ffffee\" align=\"center\" cellspacing=\"0\" cellpadding=\"3\" width=\"600px\"><tbody id=\"settingstable\"><tr><td align=\"center\" colspan=\"2\"><input type=\"submit\" value=\"Save your settings\" id=\"savesettings\"></td></tr></tbody></table><br clear=\"all\"></div></td>");

	// Add pet name setting
	$("#settingstable").prepend("<tr><td bgcolor=\"#ffffcc\"><b>Pet Name</b><br><font class=\"sf\">Enter the name of the pet you're targeting to auto-adopt.</font></td><td><input type=\"text\" maxlength=\"60\" size=\"30\" value=\""+selectedpet+"\" name=\"name\" id=\"petname\"></td></tr>");

	// If auto-adopter is enabled
	if (autoadopterstatus == 1) {
		$("#settingstable").prepend("<tr><td bgcolor=\"#ffffcc\"><b>Status</b><br><font class=\"sf\">Choose whether the auto-adopter is active or not.</font></td><td><select name=\"autoadopterstatus\" id=\"autoadopterstatus\"><option value=\"1\">Enabled</option><option value=\"0\">Disabled</option></select></td></tr>");
	} else {
		$("#settingstable").prepend("<tr><td bgcolor=\"#ffffcc\"><b>Status</b><br><font class=\"sf\">Choose whether the auto-adopter is active or not.</font></td><td><select name=\"autoadopterstatus\" id=\"autoadopterstatus\"><option value=\"0\">Disabled</option><option value=\"1\">Enabled</option></select></td></tr>");
	}

	$("#savesettings").click(savesettings);
} else if (currenturl == "http://www.neopets.com/pound/") {
	$(".content > div:last-of-type").append("<p style=\"text-align: center; font-size: 18px;\"><span>If you're being a cheeky cheater, <b>BABY</b>, then <a href=\"http://www.neopets.com/pound/settings\">click here</a>!</span></p>");
}

function savesettings() {
	var petnamesetting = $("#petname").val();
	var statussetting = $("#autoadopterstatus option:selected").val();

	//alert("Pet: "+petnamesetting+", Status: "+statussetting);
	GM_setValue("selectedpet", petnamesetting);
	GM_setValue("autoadopterstatus", statussetting);
	location.reload();
	
}


function adoptthatpet() {
	// process the adoption
	var petname = $("#pet1_name").text();
	var request = new Object;
	request.url = '/pound/process_adopt.phtml';
	request.method = 'POST';
	request.args = 'pet_name='+petname;
	request.onSuccess = function(response) {
		if (response=='success') {
			location.href = '/quickref.phtml';
			return;
		} else {
			alert(response);
		}
	}
	request.onFailure = function() {
		alert(translated_data(6, petname));
	}
	ajaxRequest(request);
	//alert("done");
}