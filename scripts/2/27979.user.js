// LimitProof's Table Width Changer Script
// 
// ==UserScript==
// @name           Table Width Changer
// @namespace      http://www.freewebs.com/limitproof/
// @include	   *forums.televisionwithoutpity.com*
// @description    Version 2.1
// ==/UserScript==

// ---------------------------------------------------------------------------
// This script changes TWoP's forums to variable width ---------------------------------------------------------------------------
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
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
	var navigatorHTML = "<table border='0' cellspacing='5'><tr><td>" + showdropdownInnerHTML + "</td><td>" + forumdropdownInnerHTML + "</td></tr></table>";
	var container = document.getElementById('ipbwrapper');
var navigation = document.createElement('div');
navigation.className = "padd";
navigation.innerHTML = navigatorHTML;
container.parentNode.insertBefore(navigation, container);
var subby = document.getElementById('sub');
subby.parentNode.removeChild(subby);
addGlobalStyle("#blog_dropdown { top: 80px !important; background: #ccc url(../img/dropbg.gif) 8px 0 no-repeat !important;} #header #logo {top: 0px !important;} #header #nav {top: 50px;} #header ul.sub_navigation { top: 0px !important;} #header {width: 100% !important; height: 98px;} #container {width:100% !important;} #content {width: 97% !important;} #footer {width:90% !important;} #ipbwrapper{width: 100% !important;}"); 
var subnavtab = document.evaluate("//table[@class='sub-nav-table']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (subnavtab.snapshotLength>0)
{
	subnav = subnavtab.snapshotItem(0);
	subnav.parentNode.removeChild(subnav);
}
var hash = document.location.hash;
hash = hash.split('#')[1];
if (hash != null) {
var hash2 = hash.replace(/entry/g,"");
var elementid = "post-main-" + hash2;
targetelement = document.getElementById(elementid);
if (targetelement!=null)
	targetelement.wrappedJSObject.scrollIntoView();
}