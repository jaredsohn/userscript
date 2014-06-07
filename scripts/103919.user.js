// ==UserScript==
// @name           Last.fm add recommendations tab
// @namespace      http://userscripts.org/users/340270
// @description    Adds a 'Recommendations' tab to the user page
// @include        http://*.last.fm/user/*
// @include        https://*.last.fm/user/*
// ==/UserScript==
var elmExtra = document.getElementById('secondaryNavigation');
elmExtra.innerHTML = '<ul> <li class=" current first "><a href="/user/sygtivar">Profile</a></li> <li><a href="/user/sygtivar/library">Library</a></li> <li><a href="/user/sygtivar/charts">Charts</a></li> <li><a href="/user/sygtivar/events">Events</a></li> <li><a href="/user/sygtivar/friends">Friends</a></li> <li><a href="/user/sygtivar/neighbours">Neighbours</a></li> <li><a href="/user/sygtivar/groups">Groups</a></li> <li><a href="/user/sygtivar/journal">Journal</a></li> <li><a href="/user/sygtivar/library/tags">Tags</a></li> <li><a href="/home/recs">Recommendations</a></li> </ul>';
