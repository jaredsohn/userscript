// ==UserScript==
// @name           Jtv Cleaner
// @namespace      justin.tv
// @description    Removes all the Jtv elements I consider useless and sets the background to black. Edit the code to enable the chatroom.  This script is for the "old" jtv layout only.
// @include        http://www.justin.tv/*
// @include        http://justin.tv/*
// @exclude        http://www.justin.tv/directory*
// @exclude        http://justin.tv/directory*
// @exclude        http://www.justin.tv/search?q=*
// @exclude        http://justin.tv/search?q=*
// @exclude        http://www.justin.tv/*/profile*
// @exclude        http://justin.tv/*/profile*
// @exclude        http://www.justin.tv/help_resources*
// @exclude        http://justin.tv/*/help_resources*
// ==/UserScript==
// 1.0 Removes all useless elements for watching vids.
// 1.1 Removed header image and some google ads, the video window ad still remains.
// unable to remove it for now. instead, use adblock.
// 1.2 Added option to enable chat room.
// 1.3 Fixed the white footer and white background problem.
// 1.4 Updated to remove the "continue watching this later" box.
// 1.5 Updated to remove the new header.




// Set to true to ENABLE chat room. Set to false to remove chat room.
var chatOn=true;



//removes all except video window and chat room.
if(chatOn)
{
//var meeBo = document.getElementById('meebo');
var dvR = document.getElementById('dvr');
var nextChan = document.getElementById('next_live_channel');
var aboutMe = document.getElementById('about_me_container');
var topFans = document.getElementById('top_fans_container');
var chanSched = document.getElementById('channel_schedule_container');
var chanGifts = document.getElementById('channel_gifts_container');
var chanInfo = document.getElementById('channel_info_container');
var chanList = document.getElementById('channel_lists');
var footEr = document.getElementById('footer');
var chanHeader = document.getElementById('channel_header');
var chanTabs = document.getElementById('channel_tabs_container');
var googvidAds = document.getElementById('PopUnderChan_holder');
var dblclkAds1 = document.getElementById('ChanHeader');
var dblclkAds2 = document.getElementById('ChanUnderChat');
var dblclkAds3 = document.getElementById('PopUnderChan');
var compAd = document.getElementById('companion_ad');
var siteHeader = document.getElementById('site_header');
var chatTabs = document.getElementById('chat_selector');
var chanNotifs = document.getElementById('channel_notifications');
var chanStats = document.getElementById('channel_stats_container');
var staTus = document.getElementById('status');
//meeBo.parentNode.removeChild(meeBo);
dvR.parentNode.removeChild(dvR);
nextChan.parentNode.removeChild(nextChan);
aboutMe.parentNode.removeChild(aboutMe);
topFans.parentNode.removeChild(topFans);
chanSched.parentNode.removeChild(chanSched);
chanGifts.parentNode.removeChild(chanGifts);
chanInfo.parentNode.removeChild(chanInfo);
chanList.parentNode.removeChild(chanList);
footEr.parentNode.removeChild(footEr);
chanHeader.parentNode.removeChild(chanHeader);
chanTabs.parentNode.removeChild(chanTabs);
googvidAds.parentNode.removeChild(googvidAds);
dblclkAds1.parentNode.removeChild(dblclkAds1);
dblclkAds2.parentNode.removeChild(dblclkAds2);
dblclkAds3.parentNode.removeChild(dblclkAds3);
compAd.parentNode.removeChild(compAd);
siteHeader.parentNode.removeChild(siteHeader);
chatTabs.parentNode.removeChild(chatTabs);
chanNotifs.parentNode.removeChild(chanNotifs);
chanStats.parentNode.removeChild(chanStats);
staTus.parentNode.removeChild(staTus);
}


// Removes all except video window.
else
{
//var meeBo = document.getElementById('meebo');
var dvR = document.getElementById('dvr');
var nextChan = document.getElementById('next_live_channel');
var rightColumn = document.getElementById('right_column');
var chatRoom = document.getElementById('chat');
var chanInfo = document.getElementById('channel_info_container');
var chanList = document.getElementById('channel_lists');
var footColumns = document.getElementById('footer_columns_container');
var chanHeader = document.getElementById('channel_header');
var chanTabs = document.getElementById('channel_tabs_container');
var googvidAds = document.getElementById('PopUnderChan_holder');
var dblclkAds1 = document.getElementById('ChanHeader');
var dblclkAds2 = document.getElementById('ChanUnderChat');
var dblclkAds3 = document.getElementById('PopUnderChan');
var compAd = document.getElementById('companion_ad');
var chanHold = document.getElementById('ChanHeader_holder');
var siteHeader = document.getElementById('site_header');
var chanStats = document.getElementById('channel_stats_container');
var staTus = document.getElementById('status');
dvR.parentNode.removeChild(dvR);
//meeBo.parentNode.removeChild(meeBo);
nextChan.parentNode.removeChild(nextChan);
rightColumn.parentNode.removeChild(rightColumn);
chatRoom.parentNode.removeChild(chatRoom);
chanInfo.parentNode.removeChild(chanInfo);
chanList.parentNode.removeChild(chanList);
footColumns.parentNode.removeChild(footColumns);
chanHeader.parentNode.removeChild(chanHeader);
chanTabs.parentNode.removeChild(chanTabs);
googvidAds.parentNode.removeChild(googvidAds);
dblclkAds1.parentNode.removeChild(dblclkAds1);
dblclkAds2.parentNode.removeChild(dblclkAds2);
dblclkAds3.parentNode.removeChild(dblclkAds3);
compAd.parentNode.removeChild(compAd);
chanHold.parentNode.removeChild(chanHold);
siteHeader.parentNode.removeChild(siteHeader);
chanStats.parentNode.removeChild(chanStats);
staTus.parentNode.removeChild(staTus);
}

function setColors() {
setStyle(window.document,document.getElementById('body_wrapper'),"background-color: black;",null,null);
setStyle(window.document,document.evaluate('/HTML[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: black;background-color: black;",null,null);
setStyle(window.document,document.getElementById('wrapper'),"background-color: black;",null,null);
document.body.style.background="#000000 url()";
};

function setStyle(doc, element, new_style) {
    element.setAttribute('style', new_style);
};

window.addEventListener("load", function() { setColors() }, false);