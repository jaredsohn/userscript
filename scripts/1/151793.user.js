// ==UserScript==
// @id             www.facebook.com-382bd5da-470c-4684-939d-f9cb5e8681fc@scriptish
// @name           Facebook RSS finder
// @version        1.1
// @namespace      
// @author         subby
// @description    
// @include        *.facebook.com/*
// @run-at         document-end
// ==/UserScript==
var rssurl = "http://www.facebook.com/feeds/page.php?format=rss20&id=" + JSON.parse(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt")).profile_owner;
var name = document.getElementById("fbTimelineHeadline").childNodes.item(1).childNodes.item(1);
if(name.childNodes.length == 2) {
	name.firstChild.innerHTML = name.firstChild.innerHTML + "  <small><small><small><small><a href = \"" + rssurl + "\">Follow " + name.firstChild.innerHTML + " with RSS</a></small></small></small></small>";
}
else if(name.childNodes.length == 1) {
	name.innerHTML = name.innerHTML + "  <small><small><small><small><a href = \"" + rssurl + "\">Follow " + name.innerHTML + " with RSS</a></small></small></small></small>";
}