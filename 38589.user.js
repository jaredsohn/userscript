// ==UserScript==
// @name         Twitter Replies Search
// @namespace    http://jauderho.com/
// @description  Find all the replies for a particular user
// @include      http://twitter.com/*
// @include      https://twitter.com/*
// @exclude      http://twitter.com/home
// @exclude      https://twitter.com/home
// @author       Jauder Ho
// ==/UserScript==

// Copyright (c) 2008, Jauder Ho
// Released under the BSD license.
// http://www.opensource.org/licenses/bsd-license.php

var menuNode = document.getElementById('tabMenu');
if (typeof(menuNode) != "undefined" && menuNode != null)
{
    // extract username from URL; matches /user and /user/favourites
    var username = document.location.pathname.split("/")[1];

    // create the link
    var link = document.createElement('a');
    link.setAttribute('href', 'http://search.twitter.com/search?q=to:'+username);
    link.setAttribute('id', 'replies_search_tab');
    link.appendChild(document.createTextNode('@Replies Search'));

    // create the list element
    var li = document.createElement('li');

    // add link to the proper location
    li.appendChild(link);
    menuNode.appendChild(li);    
}
