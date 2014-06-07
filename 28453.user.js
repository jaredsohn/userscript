// ==UserScript==
// @name          Last.fm event shoutbox feed
// @namespace     http://chopeen.blogspot.com/
// @description   This script adds an Atom feed to a shoutbox on every Last.fm event page
// @include       http://www.last.fm/event/*
// @include       http://last.fm/event/*
// @include       http://www.lastfm.*/event/*
// @include       http://lastfm.*/event/*
// ==/UserScript==

//--------------------------------------------------------------------------

var h3s;
var eventShoutbox;
var head;

// get Shoutbox element
h3s = document.documentElement.getElementsByTagName("H3");
for (var i = 0; i < h3s.length; i++)
{ 
    if ( h3s[i].getAttribute("class") == "shoutboxHead")
    { 
        eventShoutbox = h3s[i];
    }
}
// get HEAD element
head = document.documentElement.getElementsByTagName("HEAD")[0];

// if event shoutbox exists, ...
if (eventShoutbox)
{
    // ... add feed META element
    head.appendChild(getMetaElement());
    
    // ... add feed icon near the word Shoutbox
    eventShoutbox.appendChild(document.createTextNode(' '));  // space after the word Shoutbox
    eventShoutbox.appendChild(getIconElement());
}

//--------------------------------------------------------------------------

    // 
    // Returns feed META element
    // 
    function getMetaElement()
    {
        var meta;
        
        meta = document.createElement('link');
        meta.setAttribute('rel', 'alternate');
        meta.setAttribute('type', 'application/atom+xml');
        meta.setAttribute('title', 'Subscribe to shoutbox feed');
        meta.setAttribute('href', getFeedUrl(window.location.href));

        return meta;
    }

    // 
    // Returns feed icon
    // 
    function getIconElement()
    {
       var a;
       var img;
       
       img = document.createElement('img');
       img.setAttribute('src', 'http:\/\/cdn.last.fm/favicons/feed_small.gif');
       
       a = document.createElement('a');
       a.setAttribute('title', 'Subscribe to shoutbox feed');
       a.setAttribute('href', getFeedUrl(window.location.href));
       a.appendChild(img);
       
       return a;
    }

    // 
    // Gets feed URL
    // 
    function getFeedUrl(pUrl)
    {
        var feedUrl;

        feedUrl = '';
        feedUrl = feedUrl + 'http:\/\/tools.microformatic.com/transcode/'
        feedUrl = feedUrl + 'atom'
        feedUrl = feedUrl + '/hatom/'
        feedUrl = feedUrl + pUrl;
        
        return feedUrl;
    }
