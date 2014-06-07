// ==UserScript==
// @name           Facebook Friends
// @namespace      com.maltera.facebook
// @description    Adds a link to your friends list to every facebook page.
// @include        http://www.facebook.com/*
// ==/UserScript==

var nav = document.getElementById("navAccount");

var item = document.createElement("li");
var link = document.createElement("a");
item.appendChild( link );
link.setAttribute("href", "http://www.facebook.com/friends/?filter=afp");
link.setAttribute("accesskey", "3");
link.appendChild( document.createTextNode( "Friends" ));

nav.parentNode.insertBefore( item, nav );
