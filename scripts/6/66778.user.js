// ==UserScript==
// @name           BBC video placeholder
// @namespace      http://localhost/
// @description    Stop BBC video and audio clips from autoloading
// @include        http://*.bbc.co.uk/*

// ==/UserScript==

var divs = document.getElementsByTagName("div");
var divType = "";
for (i = 0; i <= divs.length; i++) {
	if (divs[i].className.indexOf("videoInStory") >= 0 || divs[i].className.indexOf("videoInIndex") >= 0 || divs[i].className.indexOf("video-live-page") >= 0 || divs[i].className.indexOf("live-event-media") >= 0)
		{divType = "video"}
	else if (divs[i].className.indexOf("audioInStory") >= 0 || divs[i].className.indexOf("audioInIndex") >= 0)
		{divType = "audio"}
	else
		{divType = ""};
    if (divType != "") {
		if (divs[i].id == "")
			{divs[i].id = "sjoDummy" + i};
		var newHTML = "<div id='sjoGrease" + i +"' style='display: none'>" + divs[i].innerHTML + "</div>";
		if (divs[i].getElementsByTagName("p")[0])
			{newHTML = newHTML + "<p class='caption'>" + divs[i].getElementsByTagName("p")[0].innerHTML + "</p>";}
		newHTML = newHTML + "<p style='font: bold 10pt Calibri; text-align: center'><a onClick='(function() {document.getElementById(\"" + divs[i].id + "\").innerHTML = document.getElementById(\"sjoGrease" + i + "\").innerHTML})()'>Show " + divType + "</a></p>";
		divs[i].innerHTML = newHTML;
    }
}
