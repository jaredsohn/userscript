// LimitProof's TWoP Recap Facelift Script
// Replaces recaps with simpler, text-based version
// ==UserScript==
// @name           TWoP Recap Facelift Script
// @namespace      http://www.freewebs.com/limitproof/
// @include	   *.televisionwithoutpity.com/show/*
// @exclude       *forums.televisionwithoutpity.com*
// @exclude http://*.televisionwithoutpity.com/index.php*
// @description    Version 2.1
// ==/UserScript==
var searchbar = document.getElementById('search');
searchbar.innerHTML = "<div class='padd'><h1><span>Search</span></h1><form action='http://www.televisionwithoutpity.com/search.php'><input name='searchString' type='text' class='field' value='Enter Show Name' onfocus=\"this.value='';return false;\"  /><input type='submit' name='submit' value='Find Now!'></form></div>";
var subby = document.getElementById('sub');
var RecapsInnerHTML = "";
subby.parentNode.removeChild(subby);

var navshows = document.getElementById('nav_shows');
var navforums = document.getElementById('nav_forums');
navshows.innerHTML = "<a href='http://www.televisionwithoutpity.com/shows/'>Shows</a>";
navforums.innerHTML = "<a href='http://forums.televisionwithoutpity.com/'>Forums</a>";
var showdropdownInnerHTML = "<td><div class='padd'><h1><span>Shows</span></h1><form name='showform'><select name='showlinks'>";
var allShows = document.getElementById('show_dropdown');
var showLinks = allShows.getElementsByTagName('a');
for (i=0;i<showLinks.length;i++)
{
	var cshow = showLinks[i];
	var curl = cshow.href;
	var cname = cshow.textContent;
	showdropdownInnerHTML = showdropdownInnerHTML + "<option value='" + curl + "'>" + cname + "</option>";
}
showdropdownInnerHTML = showdropdownInnerHTML + "</select>" + 
"<input type='button' name='go' value='Go' onClick='window.location=document.showform.showlinks.options[document.showform.showlinks.selectedIndex].value'></form></div>";
var forumdropdownInnerHTML = "<div class='padd'><h1><span>Forums</span></h1><form name='forumform'><select name='forumlinks'>";
var allforums = document.getElementById('forum_dropdown');
var forumLinks = allforums.getElementsByTagName('a');
for (i=0;i<forumLinks.length;i++)
{
	var cforum = forumLinks[i];
	var curl = cforum.href;
	var cname = cforum.textContent;
	forumdropdownInnerHTML = forumdropdownInnerHTML + "<option value='" + curl + "'>" + cname + "</option>";
}
forumdropdownInnerHTML = forumdropdownInnerHTML + "</select>" + 
"<input type='button' name='go' value='Go' onClick='window.location=document.forumform.forumlinks.options[document.forumform.forumlinks.selectedIndex].value'></form></div>";
var navigatorHTML = "<table border='0' cellspacing='5'><tr><td>" + searchbar.innerHTML + "</td><td>" + showdropdownInnerHTML + "</td><td>" + forumdropdownInnerHTML + "</td></tr></table>";
var recapnavigator = document.getElementById('sub_recap');
var report_card = document.evaluate(
    "//div[@class='report_card']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var bodyRecap;
bodyRecap = document.evaluate(
    "//div[@class='body_recap']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var byLine;
byLine = document.evaluate("//p[@class='byline']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var recapletTease, recaplet;
recapletTease = document.evaluate("//div[@class='story_tease']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
recaplet = document.evaluate("//div[@id='recaplet']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
main_content = document.getElementById("main_content");
Alltables = document.evaluate("//table[@id='episode']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var maincontentinnerhtml="";
if (Alltables.snapshotLength==0)
{
	if (recapletTease.snapshotLength==0)
	{
		maincontentinnerhtml = "<div>" + navigatorHTML + "<div id='sub_recap'>" + recapnavigator.innerHTML + "</div>" + "<p class='byline'>" + byLine.snapshotItem(0).innerHTML + "</p>" + "<div class='body_recap'>" + bodyRecap.snapshotItem(0).innerHTML + "</div></div>";
	}
	else
	{
		maincontentinnerhtml = "<div>" + navigatorHTML + "<div id='sub_recap'>" + recapnavigator.innerHTML + "</div>" + "<p class='byline'>" + byLine.snapshotItem(0).innerHTML + "</p>" + "<div class='story_tease' id='tease'>" + recapletTease.snapshotItem(0).innerHTML + "</div><div class='story_tease' id='close' style='display: none;'>" + recapletTease.snapshotItem(1).innerHTML + "</div><div id='recaplet' class='body_recap recaplet' style='display: none;'>" + recaplet.snapshotItem(0).innerHTML + "</div>" + "<div class='body_recap'>" + bodyRecap.snapshotItem(0).innerHTML + "</div></div>";
	}
}
else if (Alltables.snapshotLength>=1)
{
	divs = document.evaluate(
    "//div[@class='more_recaps']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	divs2 = document.evaluate(
    "//div[@class='show_rss']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	maincontentinnerhtml = navigatorHTML + "<table id='episode' cellspacing='2'>" + Alltables.snapshotItem(0).innerHTML + "</table>" + divs.snapshotItem(0).innerHTML + divs2.snapshotItem(0).innerHTML;
}
main_content.innerHTML = maincontentinnerhtml; 
sub_content = document.getElementById("sub_content");
if (report_card.snapshotLength==0)
	sub_content.parentNode.removeChild(sub_content);
else
	sub_content.innerHTML = "<div class='report_card'>" + report_card.snapshotItem(0).innerHTML + "</div>";