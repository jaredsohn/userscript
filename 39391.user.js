// ==UserScript==
// @name         Twitter Searchs and Tools
// @namespace    http://userscripts.org/users/35001
// @description  Adds an Searchs and Tools to the Twitter sidebar.
// @include      http://twitter.com/*
// @include      https://twitter.com/*
// @author       Hannibal Smith.
// ==/UserScript==

// Based in Twitter Search Box by Sebastian Celis.

var usenam = document.getElementsByTagName( 'title' )[0].text.replace( /Twitter \/ /g,'' );
if ( usenam == 'Home' || usenam == 'Public Timeline' ) 
      usenam = document.getElementById( 'profile_link' ).href.replace( /.*\//, '' );

var friendsNode = document.getElementById( 'following_list' );
if ( typeof( friendsNode ) != "undefined" && friendsNode != null )
{
	var html = [];
	html[html.length] = '<div class="section-header" style="margin-top:0px">';
	html[html.length] = '<a href="http://search.twitter.com/advanced"';
 	html[html.length] = ' class="section-links">advanced</a>';
	html[html.length] = '<h1>Search</h1>';
	html[html.length] = '</div>';
	html[html.length] = '<div><form action="http://search.twitter.com/search" id="searchForm"';
	html[html.length] = ' method="GET" name="searchForm">';
 	html[html.length] = '<input autosave="com.twitter.search" id="searchBox" name="q"';
	html[html.length] = ' type="search" style="width:98%;"'
	html[html.length] = ' placeholder="Enter your query" />'; 
	html[html.length] = '</form></div>';
	html[html.length] = '<div class="section-header" style="margin-top:0px; text-align:right;'; 
	html[html.length] = ' margin-top:10px; font-size-adjust:.52">';
	html[html.length] = 'users';
	html[html.length] = '</div>';
	html[html.length] = '<div><form action="/search/users" method="get"><fieldset'; 		
	html[html.length] = ' class="common-form">';
	html[html.length] = '<input class="medium" id="q" name="q" type="search"'; 			
	html[html.length] = ' style="width:98%;">';
	html[html.length] = '</form></div>';
	html[html.length] = '<div class="section-header" style="margin-top:35px">';
	html[html.length] = '<h1>Tools</h1>';
	html[html.length] = '</div>';
	html[html.length] = '<a href="http://twitter100.com/' + usenam + '">twitter100</a>';
	html[html.length] = '<a href="http://twittercounter.com/?username=' + usenam + '"'; 		
	html[html.length] = ' style="margin-left:50px;">twittercounter</a>';
	html[html.length] = '<br>';
	html[html.length] = '<a href="http://twitterholic.com/' + usenam + '/">twitterholic</a>';
	html[html.length] = '<a href="http://tweetstats.com/graphs/' + usenam +'"'; 			
	html[html.length] = ' style="margin-left:45px;">tweetstats</a>';
	var div = document.createElement( 'div' );
	div.className = 'section last';
	div.innerHTML = html.join('');
	followingNode = friendsNode.parentNode;
	followingNode.parentNode.insertBefore( div, followingNode );
}
