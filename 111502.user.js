// ==UserScript==
// @name           Fetlife2GCal
// @namespace      http://bondagescouts.org/Tags/FL2GC
// @description    Add Fetlife events to your Google Calendar with one click!
// @include        http://fetlife.com/events/*
// @include        http://*.fetlife.com/events/*
// @include        https://fetlife.com/events/*
// @include        https://*.fetlife.com/events/*
// @version        $Revision: 1.13 $ $Date: 2011/12/14 07:52:30 $
// ==/UserScript==

/*
Copyright (c) 2011 cryptocat <cryptocat@bondagescouts.org>

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

GM_log("[FL2GC]: start");

// V2 events have been rolled out everywhere, and having
// V1 compatibility makes this harder for me to read...
var fv = document.URL.replace(/\/$/,'');
if (fv.indexOf("/v2") == (fv.length - 3)) {
	fv = 2;
} else {
	throw('exit');
}

// get body html
var page = document.getElementsByTagName('body').item(0).innerHTML;

// clean up some html entities to make parsing easier
page = page.replace(/\&nbsp;/gim, " ");
page = page.replace(/\&amp;/gim, ' and ');
page = page.replace(/\&quot;/gim, '"');
page = page.replace(/\&ldquo;/gim, '"');
page = page.replace(/\&rdquo;/gim, '"');
page = page.replace(/\&ndash;/gim, '-');

// event parameters
var	ev_title = '',
	ev_startday = '',
	ev_starttime = '',
	ev_endday = '',
	ev_endtime = '',
	ev_where = '',
	ev_addr = '',
	ev_descr = '';

var detector, match; // reused multiple times

GM_log("[FL2GC]: starting v2 parser...");
detector = /itemtype="http:..schema.org.Event"([^\377]*)class="h4 mbm">Who's going?/im;
if (match = detector.exec(page)) {
	page = match[1]; // less buffer to crawl through
} else {
	GM_log("[FL2GC]: aborting...");
	throw('exit');
}

detector = /<h1 class="h2 bottom" itemprop="name">(.*?)<\/h1>/im;
if (match = detector.exec(page)) {
	ev_title =match[1].replace(/  */g, '+');
}

detector = /content="(\d+-\d+-\d+ \d+:\d+Z)" itemprop="startDate".*?content="(\d+-\d+-\d+ \d+:\d+Z)" itemprop="endDate"/im;
if (match = detector.exec(page)) {
	// The 'Z' replacement may violate the API but it gets local time right 
	ev_startday = match[1].replace(/-/g, '').replace(/ /, 'T').replace(/Z/, '00').replace(/:/, '');
	ev_endday = match[2].replace(/-/g, '').replace(/ /, 'T').replace(/Z/, '00').replace(/:/, '');
}

var ev_city;
detector = /itemtype="http:..schema.org.PostalAddress"><meta content="([^"]*)" itemprop="addressCountry".*?content="([^"]*?)" itemprop="addressRegion".*?content="([^"]*?)" itemprop="addressLocality".*?itemprop="name">([^<]*?)</im;
if (match = detector.exec(page)) {
	GM_log("[FL2GC]: where[1] " + match[1]);
	GM_log("[FL2GC]: where[2] " + match[2]);
	GM_log("[FL2GC]: where[3] " + match[3]);
	GM_log("[FL2GC]: where[4] " + match[4]);
	ev_where = match[4];
	ev_city = match[3] + ", " + match[2] + ", " + match[1];
}

// XXX not sure why i need this. limitations of regex engine?
detector = /itemprop="addressLocality"[^\377]*?class="db s">\s+([^<]*)<a href/im;
if (match = detector.exec(page)) {
	GM_log("[FL2GC]: where[1] " + match[1]);
	ev_addr = match[1].replace(/,.*/,'').replace(/\s*$/, '') + ", " + ev_city;
}

detector = /itemprop="description">([^\377]+)<\/div>/im;
if (match = detector.exec(page)){
	ev_descr = match[1];
	// make the description a little more URL friendly
	ev_descr = ev_descr.replace(/<\/?p>/gim, "\n "); // paragraphs
	ev_descr = ev_descr.replace(/<br\s*\/?>/gim, "\n "); // linebreaks
	ev_descr = ev_descr.replace(/<[^>]*>/gim, " "); // all other tags
	ev_descr = document.location + "\n " + ev_descr;
	ev_descr = ev_descr.replace(/  */g, ' ');
	// GM_log("[FL2GC]: event description length " + ev_descr.length);
}

// inject gcal link
// http://www.google.com/googlecalendar/event_publisher_guide_detail.html
var rsvp, gcal, gurl;

// XXX this is horrible
rsvp = document.getElementsByTagName('div')[7];

gcal = document.createElement('a');
gurl = 'http://www.google.com/calendar/event?action=TEMPLATE'
	+ "&trp=true"
	+ "&sprop=website:" + document.location
	+ "&sprop=name:Fetlife2GCal"
	+ "&text=" + ev_title
	+ "&dates=" + ev_startday + "/" + ev_endday
	+ "&location=" + ev_where + " " + ev_addr;
// GM_log("[FL2GC]: url metadata " + gurl);
gurl = gurl + "&details=" + ev_descr.substr(0,1024); // don't overflow gcal

gcal.setAttribute('href',gurl);
gcal.setAttribute('target','_new');
gcal.innerHTML = "Add to Google Calendar";
rsvp.appendChild(gcal);
// GM_log("[FL2GC]: injected calendar link. size " + gurl.length);
