// ==UserScript==
// @name		no devADS
// @namespace	http://userscripts.org/scripts/show/8247
// @description	deletes ALL ads on deviantART pages
// @include	http://*.deviantart.com/*
// ==/UserScript==

//----------------------- no devADs --------------------------
// This scripts removes ALL ads from deviantART pages, and
// in some cases adjusts the whats left behind from those ads.
// 
// The script only is executed after the page loading so you 
// still see the ads for a second or two before they get deleted
//
// The xpath querys were made to only give one solution each,
// (except for the ones that use AND operators) so using the 
// function del() or delall() it's exactly the same, i just 
// use delall just in case some ads might apper more than one 
// time, also the script could just run one big delall() using 
// all the arguments together separeted by | but this way is 
// easier to understand what each one is doing. Also some xpath 
// expressions have a lot of arguments that probably will never 
// be used but I did that way to make sure something else is 
// not deleted.
//
// Changelog:
// 09/06/07 - updated ads detection
// 14/04/07 - *****script redone from scratch*****
//-----------------------------------------------------------

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function del(query){
	var elem = xpath(query).snapshotItem(0);
		elem.parentNode.removeChild(elem);
}

function delall(query){
	var allelem = xpath(query);
	for (var i = 0; i < allelem.snapshotLength; i++ ) {
		var elem = allelem.snapshotItem(i);
			elem.parentNode.removeChild(elem);
	}
	//remove the next comment for debugging purposes
	//if(allelem.snapshotLength>1){GM_log("more than one: "+query);}
}

//resizes the right vertical darker bar in "browse" pages
var browsevbar = xpath("//div[@id='browse']/div[@class='stream-ads']");
	if(browsevbar.snapshotLength > 0){browsevbar.snapshotItem(0).style.borderRight = "0px";}

//resizes the comment box of the thread author in "forum" pages
var forumpost = xpath("//div[@id='forum']/div[@class='comments']");
	if(forumpost.snapshotLength > 0){forumpost.snapshotItem(0).style.paddingRight = "0px";}

//deletes the right vertical ad bar in "browse" pages	
delall("//div[@class='ads']");

//deletes a top box ad saying "No More Ads: bla bla bla"
delall("//div[contains(@id, 'blocking')]");

//deletes the bottom ad from deviations pages (next to the artist comment)
delall("//div[@id='adso-magnifico']/parent::div[@class='c']");

//deletes a top box ad saying "No More Ads: bla bla bla" (this one is for the pages where the style is still the old DA)
delall("//div[@class='output-primary ie-paintfix']");

//deletes the devwatch link: "Enable devwatch thumbnails"
delall("//div[@class='aside-head']/a[contains(@href,'subscribe')]");

//deletes the "deviantART Notice" box on deviant pages
delall("//iframe[@id=@name]/ancestor::div[@class='box']");

//deletes the huge ad in your devwatch between "notices" and "friends"
delall("//a[contains(@href,'adcast')]/parent::div/parent::div/parent::div[@class='section']");

//deletes the "| no subscription" text and link from the navigation bar
delall("id('rockdock')/span/text()[2] | id('rockdock')/span/a[contains(@href,'subscription')]");

//deletes the ad below "notices" in the "news" page
delall("//iframe[@id=@name]/ancestor::div[@class='trailing section-block']/ancestor::div[@class='section']");

//deletes the ad next to the comment box of the thread author in "forum" pages
delall("//div[@id='forum']/div/div/iframe[@id=@name]/parent::div/parent::div");

//in case some ads don't get deleted before, this will probably do the job
delall("//iframe[@id=@name] | //iframe[contains(@src, 'adsvr')]");
