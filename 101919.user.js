// ==UserScript==
// @name           poppVideoView
// @namespace      poppVideoViewNs
// @description    poppen.de video hack tool
// @include        http://www.poppen.de/*
// @version        1.0
// ==/UserScript==
var user__ID;


//functions
function showTextBottom(someText)
{
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    someText +
    ' </p></div>';
document.body.insertBefore(logo, document.body.firstChild);
}


// list all the variables in the content's global scope
for (var p in unsafeWindow) {
	switch(p)
	{
	case "imageGalleryUrlData":
		//extract profile's UID
		var replaced = unsafeWindow[p].uid.replace("/uid/", "");
		user__ID = replaced;
		showTextBottom("USER ID: " + user__ID);
	case "user_data":
		unsafeWindow[p]._has_paying_membership = true;
		unsafeWindow[p]._is_normal = false;
		unsafeWindow[p]._is_fsk18 = true;
		break;
	break;
	}
}


//video unlock
for(var elm in document.getElementsByTagName("a"))
{
	//on search page (only on VIEO related pages)
	if(document.getElementsByTagName("a")[elm].href.indexOf("mediaid")!=-1 && window.location.href.indexOf("video")!=-1)
	{
		var cutFrom = document.getElementsByTagName("a")[elm].href.lastIndexOf("mediaid/");
		var cutTo = document.getElementsByTagName("a")[elm].href.lastIndexOf("/kind");
		var extrId = document.getElementsByTagName("a")[elm].href.substr(cutFrom, cutTo);
		extrId = extrId.replace("mediaid/", "");
		extrId = extrId.replace("/kind/2", "");
		extrId = "http://www.poppen.de/video/smallPlayer?id=" + extrId;

		showTextBottom(document.getElementsByTagName('a')[elm].href); //Show user names

		document.getElementsByTagName("a")[elm].href = extrId;

		
	}
}