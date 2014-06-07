// ==UserScript==
// @name           Reverse Tweet Order
// @namespace      http://userscripts.org/users/67390/
// @include        http://twitter.com/*
// ==/UserScript==

// inject reverse function
// reverse function shamelessly lifted from Stuart Langridge
// http://www.kryogenix.org/code/browser/licence.html

var headerScript = document.createElement('script');
headerScript.setAttribute('type', 'text/javascript');
//headerScript.innerHTML = "var timeline=document.getElementById('timeline_body');function reverse(){if (!timeline) return;tbody=timeline;newrows=[];for(var i=0;i<tbody.rows.length;i++){newrows[newrows.length]=tbody.rows[i];}for(var i=newrows.length-1;i>=0;i--){tbody.appendChild(newrows[i]);}delete newrows;}";
headerScript.innerHTML = "var timeline=document.getElementById('timeline');function reverse(){if (!timeline)return;newlis=[];for(var i=0;i<timeline.getElementsByTagName('li').length;i++){var entry=timeline.getElementsByTagName('li')[i];var className=entry.className;	if(className.substring(0,6) == 'hentry')newlis[newlis.length]=entry;}for(var i=newlis.length-1;i>=0;i--){timeline.appendChild(newlis[i]);}delete newlis;}"


var head = document.getElementsByTagName('head')[0];
head.appendChild(headerScript);

var timeline = document.getElementById('timeline');

// setup reversal on demand button

var button = document.createElement('button');
button.id = 'reverseBtn';
button.innerHTML = 'Reverse Tweets';
button.setAttribute("onclick", "reverse()");

var mainDiv = timeline.parentNode;

// put the button before the timeline
if (timeline) var newBtn = mainDiv.insertBefore(button, timeline);