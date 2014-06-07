// ==UserScript==

// @name           ThreadCounter
// @namespace      ThreadCounter

// @include        http://forumwarz.com/forums/battle/*
// @include        http://*.forumwarz.com/forums/battle/*
// ==/UserScript==

// Written by Arktor for open use by Forumwarz players; special thanks to Echuu and Meeeeee for fixes/suggestions

theRows = document.getElementsByTagName("tr");
threads = [];
leng = theRows.length - 4;
for (i = 1; i <= (leng); i++)
{threads.push(theRows[i].getAttribute('thread_id'));
}

if(theRows[(leng+1)].getAttribute('thread_id'))
{
document.getElementsByTagName("tr")[0].cells[1].firstChild.nodeValue="Title (" + (leng+1) + " threads)";
}
else
{
document.getElementsByTagName("tr")[0].cells[1].firstChild.nodeValue="Title (" + (leng) + " threads)";
}