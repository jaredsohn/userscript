// LokiAds2 - The Lokalisten Advertising Deleter modified
// Version 1.22.1
// 2008-07-27
// Copyright (c) 2008, Janosch Maier (Phylu)
// edited by dux111 2009 Many Thanks to Phylu
// janosch_maier@online.de
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "LokiAds2", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LokiAds2
// @namespace     dux111
// @description   Deletes much advertising from Lokalisten.de -- Version: 1.22.1
// @include       http://*lokalisten.*
// ==/UserScript==
var newElement, html, mainFooter, newElement, ads, layer, oldfooter, newfooter, allAds, thisAd, oldlinks, newlinks, b, imgs, mainmenu, mainmenunew, bg, css;

// center the page
layer = document.getElementById('l_wrapper');
if (layer) {
    layer.style.margin = '0 auto';
}

// edits the background
css = "@namespace url(http://www.w3.org/1999/xhtml); body { background-image:none !important; } div.eck{ background-image:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}


// delete Ads
ads = document.getElementById('l_outer');
if (ads) {
    ads = ads.getElementsByTagName('div')[1];
    ads.parentNode.removeChild(ads);
}

ads = document.getElementById('rectangle');
if (ads) {
    ads.parentNode.removeChild(ads);
}

ads = document.getElementById('BANNER_botbanner');
if (ads) {
    ads.parentNode.removeChild(ads);
}

allAds = document.evaluate(
    "//p[@class='advert']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

allAds = document.evaluate(
    "//p[@class='sponsor']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

allAds = document.evaluate(
    "//p[@class='pby']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

allAds = document.evaluate(
    "//div[@class='notifyRss']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

allAds = document.evaluate(
    "//div[@class='notifyBox']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

allAds = document.evaluate(
    "//div[@class='fixedBox rssBox']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

if (document.URL == 'http://www.lokalisten.de/web/showHome.do' || document.URL == 'http://lokalisten.de/web/showHome.do') {
    allAds = document.evaluate(
        "//div[@class='fixedBox']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allAds.snapshotLength; i++) {
        thisAd = allAds.snapshotItem(i);
        thisAd.parentNode.removeChild(thisAd);
    }
}

allAds = document.evaluate(
    "//div[@class='ltipp']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

allAds = document.evaluate(
    "//img[@src='/img/btn/gift.gif']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}

// delete sponsoredlinks
oldlinks = document.getElementById('sponsoredcontainer');
if (oldlinks) {
    newlinks = document.createElement('ul');
    newlinks.setAttribute("Id","sponsoredcontainer");
    newlinks.innerHTML = '&nbsp;';
    oldlinks.parentNode.replaceChild(newlinks, oldlinks);
}


// delete topsearch
oldlinks = document.getElementById('hotspotcontainer');
if (oldlinks) {
    newlinks = document.createElement('div');
    newlinks.setAttribute("Id","hotspotcontainer");
    newlinks.innerHTML = '&nbsp;';
    oldlinks.parentNode.replaceChild(newlinks, oldlinks);
}


// Editing head - menu
oldlinks = document.getElementById('tecMenu');
if (oldlinks) {
    newlinks = document.createElement('p');
    newlinks.setAttribute("id","tecMenu");
    newlinks.innerHTML = '<a href="/web/user/editAccountPrivacy.do?method=edit">privatsphäre</a>&nbsp;|&nbsp;' +
        '<a href="/help/showHelp.do?method=help">hilfe</a>&nbsp;|&nbsp;' +
        '<a href="/logout.do">logout</a>';
    oldlinks.parentNode.replaceChild(newlinks, oldlinks);
}


// delete footer
oldfooter = document.getElementById('l_footer');
if (oldfooter) {
    newfooter = document.createElement('div');
    newfooter.setAttribute("id","l_footer");
    newfooter.innerHTML = '&nbsp;';
    oldfooter.parentNode.replaceChild(newfooter, oldfooter);
}


// generate new footer
mainFooter = document.getElementById('l_footer');
if (mainFooter) {
    newElement = document.createElement('p');
    newElement.setAttribute("id","l_mainFooter");
    newElement.setAttribute("align","center");
    newElement.style.margin = '0 auto';
    newElement.innerHTML = '<strong>&copy; Lokalisten 2008</strong> | ' +
        '<a href="/common/showLegal.do">Impressum</a> | ' +
        '<a href="/common/showAgb.do">AGB</a> | ' +
        '<a href="/common/showContact.do">Kontakt</a> | ' +
        '<a href="/web/news/listNews.do">News</a> | ' +
        '<a href="/web/feedback/listFeedback.do">Feedback</a> | ' +
        '<a href="/help/showHelp.do?method=help">Hilfe</a> | ' +
        '<a href="http://userscripts.org/scripts/show/54100" target="_blank">LokiAds2</a>';
     mainFooter.parentNode.insertBefore(newElement, mainFooter.nextSibling);
}


// edit info-blocks
allAds = document.evaluate(
    "//div[@class='messageCont']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    html = thisAd.innerHTML
    }
allAds = document.evaluate(
    "//div[@class='message']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    newElement = document.createElement('div');
    newElement.setAttribute("class","simpleBox");
    newElement.setAttribute("align","center");
    newElement.innerHTML = html;
    thisAd.parentNode.replaceChild(newElement, thisAd);
}


// edit search-block
allAds = document.evaluate(
    "//div[@class='noteBoxCont']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    html = thisAd.innerHTML
    }
allAds = document.evaluate(
    "//div[@class='noteBox3']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    newElement = document.createElement('div');
    newElement.setAttribute("class","simpleBox");
    newElement.setAttribute("align","center");
    newElement.innerHTML = html;
    thisAd.parentNode.replaceChild(newElement, thisAd);
}


// edits the message link to read messages
b = document.getElementById("mmenu_msg_itm");
imgs = document.getElementsByTagName("img");
for (var k=0; k<imgs.length; k++) {
    if (!imgs[k].src.match(/mail\.gif/gi)) {
        if (b) {
            b.href = b.href.replace(/3$/gi, "1");
        }
    }
}


//edits the group link
mainmenu = document.getElementById('appMenu');
if (oldfooter) {
    mainmenunew = document.createElement('ul');
    mainmenunew.setAttribute("id","appMenu");
    mainmenunew.innerHTML = '<li class="level1"><a href="/web/nwloc/editNetworklocation.do" title="homebase" id="mmenu_nwloc_itm">homebase</a></li><li class="level1"><a href="/web/events/showEventOverview.do" title="events" id="mmenu_evt_itm">events</a></li><li class="level1"><a href="/web/market/showMarketOverview.do" title="markt" id="mmenu_mrk_itm">markt</a></li><li class="level1"><a href="/web/groups/listGroup.do?method=list&showTypeId=0" title="gruppen" id="mmenu_grp_itm" class="level1" >gruppen</a></li><li class="level1"><a href="/web/blog/showBlogOverview.do" title="blog" id="mmenu_blog_itm">blog</a></li><li class="level1"><a href="/web/showHome.do" title="chat" id="mmenu_chat_itm" onClick="openChat();">chat</a></li>';

    mainmenu.parentNode.replaceChild(mainmenunew, mainmenu);
}

//delete disabled links
allAds = document.evaluate(
    "//span[@class='disabled']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAds.snapshotLength; i++) {
    thisAd = allAds.snapshotItem(i);
    thisAd.parentNode.removeChild(thisAd);
}
// delete the Button "freunde einladen"

var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length;i++){
	if(links[i].innerHTML.indexOf("freunde einladen")!=-1){
		links[i].parentNode.style.display="none";
	}
}
