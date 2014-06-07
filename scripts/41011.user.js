/*
 Draugiem.lv - Ads Free Version
 version 1.3
 03-jan-2008
 Copyright (c) 2006, Nixon
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html
 --------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.


 To uninstall, go to Tools/Manage User Scripts,
 select "Draugiem.lv - Ads Free Version", and click Uninstall.
 
 This is originally made by Nixon(http://userscripts.org/users/13892) as
 he didn't have the script updated I (Friiks) did it!

 --------------------------------------------------------------------

*/

// ==UserScript==
// @name          Draugiem.lv - Ads Free / Reklāmbrīvs
// @description   Removes most of the ads from draugiem.lv
// @include       http://www.draugiem.lv/*
// @include       http://draugiem.lv/*
// ==/UserScript==


var node = document.getElementById("adv18");
if(node != null)
{
	var foot = document.createElement('div');
	foot.setAttribute('class','footer');
	foot.setAttribute('style','clear: both;');
	node.parentNode.insertBefore(foot,node);
};

// Now remove standart ads
// IDs for these ads are like this - 'ad1','ad2'...'ad13'
var i = 0;
while(i<1000)
{
	node = document.getElementById("adv" + i);
	if(node != null)
	{
		node.parentNode.removeChild(node);
	};
	i = i + 1;
};

// Also, lets get rid of extremely annoying floating Flash ad
var ad = document.getElementById('floatBanner');
if(ad != null)
{
	ad.parentNode.removeChild(ad);                                              
};

ad = document.getElementById('marquee');
if(ad != null)
{
	ad.parentNode.removeChild(ad);                                              
};

// Removed the MiniAds1 ... probably there will be more
// so I'll keep updating!
for(j = 0; j <= 1000; j++){
var ad = document.getElementById('MiniAdsContainer'+j);
if(ad != null)
{
	ad.parentNode.removeChild(ad);   
}
}

drct = document.getElementById('mail');
if(drct != null)
{
 document.getElementById("ct").style.width = "780";
}
// Paldies Aspiriinam! :)