// ==UserScript==
// @name           RlsLog to BinSearch
// @namespace      http://thomasbueter.tk
// @description    Searches for the title given by rlslog.net on binsearch.info in a new tab
// @include        http://www.rlslog.net/*
// @include	   http://rlslog.net/*
// @exclude        http://www.rlslog.net/
// @exclude        http://rlslog.net/
// @exclude        http://rlslog.net/?*
// @exclude        http://www.rlslog.net/?*
// @exclude        http://www.rlslog.net/page/*
// @exclude        http://www.rlslog.net/about/
// @exclude        http://www.rlslog.net/advertise-on-rlslog/
// @exclude        http://www.rlslog.net/faq/
// @exclude        http://www.rlslog.net/how-to-help/
// @exclude        http://www.rlslog.net/links/
// @exclude        http://www.rlslog.net/movie-formats/
// @exclude        http://www.rlslog.net/movie-sources/
// @exclude        http://www.rlslog.net/nukes/
// @exclude        http://www.rlslog.net/toplist/
// @exclude        http://www.rlslog.net/releases/
// @exclude        http://www.rlslog.net/new-posts/
// ==/UserScript==

//Get the Link to direct to
var getLinkWrapper=document.evaluate(
"//a",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
null);
var getLink=getLinkWrapper.snapshotItem(1);

//The vars to replace the destination
var pattern=new RegExp('http://www.rlslog.net/','gi');
var replace="";

//Determine the new tab location
var fDestination=getLink.toString().replace(pattern, replace);
pattern=new RegExp('/', 'gi');
fDestination=fDestination.replace(pattern, replace);
pattern=new RegExp('-', 'gi');
replace=".";
fDestination="http://binsearch.info/?q="+fDestination.replace(pattern, replace);

//Open the new location in new tab
GM_openInTab(fDestination);