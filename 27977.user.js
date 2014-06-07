// LimitProof's TWoP Facelift Script
// Replaces hideous homepage with simpler, text-based version
// ==UserScript==
// @name           TWoP Facelift Script
// @namespace      http://www.freewebs.com/limitproof/
// @include	   *.televisionwithoutpity.com*
// @exclude       *forums.televisionwithoutpity.com*
// @exclude		*.televisionwithoutpity.com/show*
// @exclude		*.televisionwithoutpity.com/search*
// @exclude		*.televisionwithoutpity.com/blogs*
// @exclude		*.televisionwithoutpity.com/goingthroughchannels*
// @exclude		*.televisionwithoutpity.com/telefile*
// @exclude		*.televisionwithoutpity.com/brilliantbut*
// @exclude		*.televisionwithoutpity.com/mwop*
// @description    Version 2.0.1
// ==/UserScript==

// ---------------------------------------------------------------------------
// This script produces a simpler, text-based version of the TWoP homepage -------------------

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("body#home_page { background:#ccc 0 0 repeat-x ! important;} #home_page #wrap {background: #ccc 50% 0 no-repeat ! important;} #blog_dropdown { top: 96px !important; background: #ccc url(../img/dropbg.gif) 8px 0 no-repeat !important;} #forum_dropdown {top: 96px !important; background: #ccc url(../img/dropbg.gif) 8px 0 no-repeat !important;} #show_dropdown {top: 96px !important; background: #ccc url(../img/dropbg.gif) 6px 0 no-repeat !important;} .top_ad { width: 0px; height: 0px; } #header { height: 98px !important; } #home_page #header { height: 98px; background: none !important;} #header #logo {top: 0px !important;} #header #nav {top: 2px;} #header ul.sub_navigation { top: 0px !important;} #home_page #header ul.main_navigation {top:15px !important;} #home_page #header h1 {top: 0px !important;} #home_page #blog_dropdown { top: 98px !important;} #home_page #show_dropdown { top: 98px !important;} #home_page #forum_dropdown { top: 98px !important;} #home_page #header #sub { top: 0px !important;} #content{top:98px !important;} #content .first_cap {margin-top:0px !important; height: 0px !important; } h2 a:hover, h3 a:hover, h4 a:hover, h5 a:hover, h6 a:hover {color: #0000FF !important;}");

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
RecapsInnerHTML = RecapsInnerHTML + navigatorHTML;
var allCaps, thisCap;
allCaps = document.evaluate(
    "//div[@class='cap_item']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allCaps.snapshotLength ; i++)
{
	var recapURL="test", recaplabel="test", showname="test", recapname="test", description="test";
	thisCap = allCaps.snapshotItem(i);
	recapname = thisCap.getElementsByTagName("h4");
	if (recapname.length>0)
		recapname = recapname[0].textContent
	else
		recapname = "Default Recap Name";
	showname = thisCap.getElementsByTagName("h3");
	if (showname.length>0)
		showname = showname[0].textContent
	else
		showname = "No Show Name Entered - <a href='http://forums.televisionwithoutpity.com/index.php?&showforum=529'>Report This Bug</a>";
	recapURL = thisCap.getElementsByTagName("h4");
	if (recapURL.length>0)
	{
		recapURL = recapURL[0].getElementsByTagName("a");
		if (recapURL.length>0)
			recapURL = recapURL[0].href;
	}
	var textdescriptions = thisCap.getElementsByTagName("p");
	for (var j=0;j<textdescriptions.length;j++)
	{
		if (textdescriptions[j].className=="label")
		{
			recaplabel = textdescriptions[j].innerHTML;
		}
		else
		{
			description = textdescriptions[j].innerHTML;
		}
	}
	RecapsInnerHTML = RecapsInnerHTML + "<div id='entry-' class='promo'><div class='padd'><h2><a href='" + recapURL + "'>" + showname + "</a></h2><h3>" + recapname + " " + recaplabel + "</h3>" + description + "</div></div>";
}
var allPics, thisPic;
allPics = document.evaluate(
    "//div[@class='image']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0; i< allPics.snapshotLength; i++)
{
	thisPic = allPics.snapshotItem(i);
	thisPic.parentNode.removeChild(thisPic);
}
var allPromos, thisPromo;
allPromos = document.evaluate(
    "//div[@id='entry-']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allPromos.snapshotLength ; i++) {
    thisPromo = allPromos.snapshotItem(i);
	var showname = (thisPromo.getElementsByTagName("h3", 1));
	if (showname.length>0)
		showname = showname[0].innerHTML;
	var showURL = (thisPromo.getElementsByTagName("a", 1));
	if (showURL.length>0)
		showURL = showURL[0].href;
	var subtitle = (thisPromo.getElementsByTagName("a", 1));
	if (subtitle.length>0)
		subtitle = subtitle[0].innerHTML;
    var promoCopy = document.createElement("div");
	var description;
	var descriptions = (thisPromo.getElementsByTagName("div",0));
	for (var j=0; j < descriptions.length; j++)
	{
		if (descriptions[j].className=="padd")
		{
			descriptions[j].removeChild(descriptions[j].getElementsByTagName("h3")[0]);
			descriptions[j].removeChild(descriptions[j].getElementsByTagName("h2")[0]);
			description = descriptions[j].innerHTML;
		}
	}
	RecapsInnerHTML = RecapsInnerHTML +  "<div id='entry-' class='promo'><div class='padd'><h2><a href='" + showURL + "'>" + showname + "</a></h2><h3>" + subtitle + "</h3>" + description + "<br><br></div></div>";
}
ContentDiv = document.getElementById('content');
ContentDiv.innerHTML = RecapsInnerHTML;