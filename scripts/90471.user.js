// ==UserScript==
// @name		RFD Forums - add Dynamic Last Post Link
// @description		On RedFlagDeals.com forum thread-view pages, adds a dynamic 'Last post' link-item next to the 'Thread Tools' header item. Clicking it will always take you to the last page & post in the thread, even if new posts have been added since you loaded the page or bookmarked the link.
// @version		1.0
// @author		RenegadeX
// @namespace		http://userscripts.org/users/238624
// @include		http://forums.redflagdeals.com/*
// @exclude		http://forums.redflagdeals.com/newreply*
// ==/UserScript==

//Get 'Thread Tools' element which will only be present if it is a thread view page
var threadtools  = document.evaluate("//ul[@id='postlist_popups' and @class='postlist_popups popupgroup']", document,null, 9, null).singleNodeValue;

if (threadtools) {
	BuildDLPL()
}

function BuildDLPL() {
	//Build new element with dynamic link to last post
	var lastpostBookmarkLink = document.createElement('li');
	lastpostBookmarkLink.id="lastpost";
	lastpostBookmarkLink.className="popupmenu";
	lastpostBookmarkLink.innerHTML = '<h6><a style="text-decoration:none" rel="nofollow" href='+window.location.href.match(/http:\/\/.*\.redflagdeals\.com\/.*\-[0-9]+\//)+'?&goto=newpost'+'>Last Post <img src="http://forums.redflagdeals.com/images/buttons/lastpost-right.png" align="absmiddle" alt="Jump to last post in this thread (bookmarkable link)" title="Jump to last post in this thread (bookmarkable link)"</></a></h6>';
	
	//Insert it
	threadtools.insertBefore(lastpostBookmarkLink, threadtools.firstChild);
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_164', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_164', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=164&version=1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();