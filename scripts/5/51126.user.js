// ==UserScript==
// @name           Last.FM Events - Search My Flickr
// @namespace      http://www.ebotunes.com
// @description    On Last.FM event pages, adds a link to your Flickr archive for the day of the event.
// @include        http://www.last.fm/event/*
// ==/UserScript==

var input = document.getElementById('machineTag');

var div = input.parentNode.parentNode;

var dtstarts = document.getElementsByClassName('dtstart');

var dtstart = dtstarts[0];

var ts = dtstart.title;

var y = ts.slice(0,4);
var m = ts.slice(4,6);
var d = ts.slice(6,8);

var date = y+'/'+m+'/'+d;

var linkText = document.createTextNode('Search my Flickr archive for that day...');

var url = 'http://www.flickr.com/photos/me/archives/date-taken/'+date;

var para = document.createElement('p');
para.style.marginTop = '10px';

var link = document.createElement('a');

link.href = url;
link.target = '_blank';
link.appendChild(linkText);

para.appendChild(link);

div.appendChild(para);


