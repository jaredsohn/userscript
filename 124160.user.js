// ==UserScript==
// @name          RenrenStranger
// @namespace     www.renren.com
// @description   Show a stranger's statues & sharings on Renren.com 
// @include       http://*.renren.com/*
// @version       1.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	// get stranger's ID
	var sURL = $('a[stats="pri_block"]').attr("href");
	var reg = new RegExp(/[0-9]+/);
	var sResult = reg.exec(sURL);
	var sID = sResult[0];

	// get my ID
	var mURL = $('a[stats="Hd_home"]').attr("href");
	mResult = reg.exec(mURL);
	var mID = mResult[0];
		
	if (sID != null && mID != null){
		// statuses
		var statusStr = $(".status").html();
		statusStr = "<a href='http://www.renren.com/" + mID +"#//status/status?id=" + sID + "' target='_blank'>" + statusStr + "</a>";
		$(".status").html(statusStr);
		
		// sharings
		var sharingStr = "<a href='http://www.renren.com/" + mID + "#//share/share/" + sID + "?share_id=0&comment=0&userid=" + sID + "' target='_blank'>ta的分享：xx个</a>";
		$(".detail").append("<li><span class='sharing'>" + sharingStr + "</span></li>");
	}
}

$titleStr = document.title;
if ($titleStr == '人人网') {
	// load jQuery and execute the main function
	addJQuery(main);
}
