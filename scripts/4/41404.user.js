// ==UserScript==
// @name		Alltop: Topic Search and OPML
// @namespace	martin ruiz
// @description 	Alltop: Topic Search, OPML button, and OPML Auto-Discovery
// @include	http://*.alltop.com/*
// ==/UserScript==
var topDiv = document.body;
var cref = document.location.href+'opml';
var rss = document.location.href+'rss';

GM_addStyle('.atopml {font-size:12px; font-weight:bold; padding:5px; margin:2px; color:#fff !important; float:right;}');
GM_addStyle('.rss {background:orange;}');
GM_addStyle('.opml {background:#07C;}');
GM_addStyle('.atsearch .search {border:1px solid #999;line-height:16px;color:#999 !important;}');
GM_addStyle('.atsearch-block {float:right; width:325px;margin:-50px 0 -50px 15px;padding:0;}');
//Add <link> for OPML Auto-Discovery
var opmllink = document.createElement("link");
opmllink.setAttribute('rel','outline');
opmllink.setAttribute('type','text/x-opml');
opmllink.setAttribute('title',document.title+" | by Martin Ruiz");
opmllink.setAttribute('href',cref);
var heads = document.getElementsByTagName('head');
heads[0].appendChild(opmllink);

var buttons = document.createElement('div');//'search'

//Add Search Box
var searchDiv = document.createElement("div");
searchDiv.id = "searchx";
searchDiv.setAttribute('class',"atsearch");
searchDiv.innerHTML = '<div class="atsearch"><form name="cse" id="alltop_search" action="http://www.google.com/cse"><input type="hidden" name="cref" value="http://www.google.com/cse/tools/makecse?url='+encodeURIComponent(cref)+'" /><input type="hidden" name="ie" value="utf-8" /><input type="hidden" name="hl" value="" /><div><input class="search atopml" name="q" type="text" placeholder="search topic"/></div><!--<input type="submit" name="sa" value="Search" />--></form><script type="text/javascript" src="http://www.google.com/cse/tools/onthefly?form=alltop_search&lang="></script></div><script type="text/javascript">var x=document.getElementById("alltop_search"); x.firstChild.value="http://www.google.com/cse/tools/makecse?url='+encodeURIComponent(cref.replace(/http:\/\//, ''))+'";</script>';
//topDiv.parentNode.insertBefore(searchDiv,topDiv);


//Add OPML Button
var opmlButton = document.createElement('a');
opmlButton.id = "opml";
opmlButton.setAttribute('class','atopml opml');
opmlButton.setAttribute('href',cref);
opmlButton.setAttribute('type',"application/rss+xml");
opmlButton.textContent="OPML";

//Add RSS Button
var rssButton = document.createElement('a');
rssButton.setAttribute('class','atopml rss');
rssButton.setAttribute('href',rss);
rssButton.setAttribute('type',"application/rss+xml");
rssButton.textContent="RSS";

buttons.appendChild(opmlButton);
buttons.appendChild(rssButton);
buttons.appendChild(searchDiv);

buttons.setAttribute('class','atsearch-block feed-block');
var loc = document.getElementById('pagetitle');
loc.parentNode.insertBefore(buttons, loc.nextSibling);