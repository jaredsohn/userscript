// ==UserScript==
// @name	    Utah Newspapers Title fixer
// @version	 1.7.0.1
// @date	    2009-01-13
// @namespace      http://www.curtisgibby.com/greasemonkey/
// @description    Fixes page title on several Utah newspapers for easier browsing with tabs and back button dropdown list.
// @include	 http://*thespectrum.com/apps/pbcs.dll/article*
// @include	 http://*deseretnews.com/*.html*
// @include	 http://blogs.sltrib.com/*.htm
// @include	 http://*clippertoday.com/*
// @include	 http://*imdb.com/*
// @include	 http://*standard.net/live/news/*
// @include	 http://manage.inergizedigitalmedia.com/*
// @include	 http://boxelder.uber.matchbin.com/pages/full_story?*
// @include	 http://*wasatchwave.com/pages/full_story?*
// @include	 http://hjnews.townnews.com/articles/*.txt
// @include	 http://mormontimes.com/*id=*
// @include	 http://www.knrs.com/cc-common/mainheadlines3.html?feed=171160&article=*
// @include	 http://tooeletranscript.com/pages/full_story?*
// @include	 http://*ksl.com/*?nid=148&sid=*
// @include	 http://*ksl.com/*?nid=294&sid=*
// ==/UserScript==

var domain = document.domain;
var thisLocation = String(window.location);
var title = "";
if (domain.match("mormontimes.com"))
{
	var search_string_start = "s.prop7=";
	var search_string_end = "s.prop11=";
	match_start = document.body.innerHTML.indexOf(search_string_start);
	match_end = document.body.innerHTML.indexOf(search_string_end,match_start + 1);
	if (match_start == -1) return;
	title += document.body.innerHTML.substring(match_start + search_string_start.length + 1, match_end - 2);
	title += " - MormonTimes";
}
if (domain.match("boxelder.uber.matchbin.com"))
{
	var xp = xpath("//*[@class=\'story_item_headline']");
	if (xp.snapshotLength == 0) return;
	title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	title += " - Box Elder News Journal";
}
if (domain.match("wasatchwave.com"))
{
	var xp = xpath("//*[@class=\'story_item_headline']");
	if (xp.snapshotLength == 0) return;
	title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	title += " - Wasatch Wave";
}
if (domain.match("tooeletranscript.com"))
{
	var xp = xpath("//*[@class=\'story_item_headline']");
	if (xp.snapshotLength == 0) return;
	title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	title += " - Tooele Transcript Bulletin";
}
if (domain.match("ksl.com"))
{
	var xp = xpath("//*[@id=\'storyTitle']");
	if (xp.snapshotLength == 0) return;
	title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	title += " - ksl.com";
}
if (domain.match("thespectrum.com"))
{
	var xp = xpath("//*[@class=\'headline\']");
	if (xp.snapshotLength == 0) return;
	title += xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	title += " - The Spectrum";
}
if (domain.match("imdb.com"))
{
	title = document.title;
	if (!(title.match("IMDB"))) {
		 title += " - IMDB";
	}
}
if (domain.match("knrs.com"))
{
	var xp = xpath('//*[@class=\'threecolumn_title\']');
	if (xp.snapshotLength == 0) return;
	title += xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g,'').replace(/^\s+/g,'').replace(/\s+$/g,'');
	title += " - 570 KNRS";
}
if (domain.match("blogs.sltrib.com"))
{
	var xp = xpath('//*[@class=\'post-title\']');
	if (xp.snapshotLength == 0) return;
	title += xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g,'').replace(/^\s+/g,'').replace(/\s+$/g,'');
	// these are the only two Tribune blogs that I read -- others could be added here
	if (thisLocation.match("/movies/"))
	{
		 title += " - Movie Cricket";
	}
	if (thisLocation.match("/tv/"))
	{
		 title += " - Village Vidiot";
	}
	title += " - Salt Lake Tribune Blogs";
}
if (domain.match("hjnews.townnews.com"))
{
	new_title = document.title.replace(/\<[^>]*?\>/g, '');
	split_title = new_title.split(">");
	title += split_title.pop() + " - ";
	title += "Herald Journal";
}
if (domain.match("standard.net"))
{
	var xp = xpath('//h1');
	if (xp.snapshotLength == 0) return;
	title += xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	title += " - StandardNet";
}
if (domain.match("deseretnews.com"))
{
	var split_title = document.title.split(' | ');
	title = split_title[2] + " - Deseret News";
}

if (thisLocation.match("deseretnews.com/blogs"))
{
	var split_title = document.title.split(' | ');
	var xp = xpath('//*[@class=\'blogEntryTitle\']');
	if (xp.snapshotLength == 0) return;
	title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g,'').replace(/^\s+/g,'').replace(/\s+$/g,'') +" - " + split_title[1] + " - Deseret News";
}

if (domain.match("clippertoday.com"))
{
	var xp = xpath('//*[@class=\'CH1\']');
	if (xp.snapshotLength == 0) return;
	title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
	if (title == "Scroll down to view stories")
	{
		 title = "Davis County Clipper";
	}
	else {
		 title += " - Davis County Clipper";
	}
}
document.title = title;

function xpath(xp)
{
	return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}