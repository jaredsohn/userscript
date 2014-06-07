// ==UserScript==
// @name           Userscripts.org Menu Commander
// @namespace      #aVg
// @description    Adds some sexy drop-downs to your userscripts.
// @include        http://userscripts.org/*
// @version        0.1.3
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var delay = {
	show : 50,
	hide : 300
};
var menu =[
	{
		"all scripts by name" : "/scripts?sort=name",
		"most discussed" : "/scripts?sort=posts",
		"highest rated" : "/scripts?sort=rating",
		"most favorited" : "/scripts?sort=fans",
		"most installed" : "/scripts?sort=installs",
		"paste new script" : "/scripts/new?form=true",
		"upload new script" : "/scripts/new"
	}, // scripts
	{
		"Most frequently used tags" : "/tags?sort=count",
		"All tags by name" : "/tags?page=1"
	}, // tags
	{
		"Script development" : "/forums/1",
		"Ideas and script requests" : "/forums/2",
		"Userscripts.org discussion" : "/forums/3",
		"The Banana Bar" : "/forums/4",
		"Jetpack" : "/forums/6",
		"Greasefire" : "/forums/5",
		"Recent posts" : "/posts"
	}, // forums
	{
		"all members by name" : "/users?page=1",
		"all members by # of scripts" : "/users?sort=scripts",
		"all members by # of comments" : "/users?sort=comments",
		"all members by # of posts" : "/users?sort=posts"
	}, // people
	{
		"rss feed" : "/feeds/recent_articles"
	}, // blog
	null, // groups (use PhasmaExMachina's script)
	{
		"highest rated" : "/guides?sort=votes",
		"most discussed" : "/guides?sort=comments",
		"sorted by author" : "/guides?sort=author",
		"sorted by date" : "/guides?sort=updated"
	}, // guides
	null  // books
];
function show() {
	(this.nodeName=="A" ? this.nextSibling : this).style.display = "";
}
function hide(cache) {
	var el = this, time = setTimeout(function() {
		(el.nodeName=="A" ? el.nextSibling : el).style.display = "none";
		timers.splice(timers.indexOf(time), 1);
	}, delay.hide);
	if(cache) timers.push(time);
}
var timers = [];
function killTimers(e) {
	for(var i = e; i < timers.length; ++i) {
		clearTimeout(timers[i]);
		timers.splice(i, 1);
	}
}
GM_addStyle("#mainmenu div {position:fixed;z-index:1;} #mainmenu div a {background:url('/images/fade_bg_comment.png') repeat-x scroll center bottom #555555;color:white!important;}");
var mnu = document.evaluate("./li", document.getElementById("mainmenu"), null, 7, null), tmp = [];
for(var i = mnu.snapshotLength - 1; i>=0; --i) tmp.unshift(mnu.snapshotItem(i));
mnu = tmp;
delete tmp;
for(var i = mnu.length - 1; i>=0; --i) {
	if(!menu[i]) continue;
	var obj=menu[i], mnui = mnu[i], drop = document.createElement("div");
	for(var o in obj)
	{
		var link = document.createElement("a");
		link.href = obj[o];
		link.appendChild(document.createTextNode(o));
		drop.appendChild(link);
	}
	drop.style.display="none";
	mnui.appendChild(drop);
	mnui = mnui.firstChild;
	mnui.addEventListener("mouseover", function() {
		killTimers(0);
		var el = this, time;
		for(var z = mnu.length - 1; z>=0; --z) {
			var cur = mnu[z];
			if(cur.childNodes.length == 2) cur.childNodes[1].style.display = "none";
		}
		timers.push(time=setTimeout(function() {
			show.apply(el);
			timers.splice(timers.indexOf(time), 1);
		}, delay.show));
	}, false);
	mnui.addEventListener("mouseout", function() {
		killTimers(0);
		hide.apply(this, [true]);
	}, false);
	drop.addEventListener("mouseover", function() {
		killTimers(0);
		show.apply(this);
	}, false);
	drop.addEventListener("mouseout", hide, false);
}