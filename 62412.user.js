// ==UserScript==
// @name 	Facebook crap hider

// @description	Removes crap from facebook

// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://fbcdn.com/*
// @include       https://fbcdn.com/*
// @include       http://*.fbcdn.com/*
// @include       https://*.fbcdn.com/*


// ==/UserScript==


function Remove_All_Facebook_Ads() {

	var sidebar_ads = document.getElementById('sidebar_ads');
	if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		sidebar_ads.style.visibility = 'hidden';
	}

  	var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
    	thisElement.parentNode.removeChild(thisElement);
	}

}



document.getElementById('fb_menubar').style.background='MediumBlue';
document.getElementById('home_sidebar').style.display='none';
document.getElementById('home_left_column').style.width='80%';
Remove_All_Facebook_Ads();
GM_addStyle("#presence { display: none !important; }");
GM_addStyle("#home_stream { width: 100% !important; }");
GM_addStyle(".ufi_section { width: 80% !important; }");
GM_addStyle(".add_comment_text { width: 90% !important; }");



var divs = document.getElementsByTagName("div");

  for (var i = 0; i < divs.length; ++i) 
{

    if (divs[i].className.indexOf("pymk") >= 0) 
	
    {

      divs[i].style.display = "none";
    }
}







