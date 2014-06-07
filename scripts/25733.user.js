// ==UserScript==
// @name           TwitterKite
// @namespace      http://dshaw.com/
// @description    Adds link to twitter account in BrightKite user profile. 
// @include        http://brightkite.com/people/*
// @include        https://brightkite.com/people/*

// @exclude        http://brightkite.com/people/*/*
// @exclude        https://brightkite.com/people/*/*

// ==/UserScript==

var user_node, user;
var profile_nodes, profile, website;
var p, hr, twitter;

user_node=document.evaluate(
	"id('main')/div[3]/div[1]/h1",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

profile_nodes=document.evaluate(
	"id('main')/div[5]/div[2]/div/div[2]",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
user=user_node.snapshotItem(0).textContent;
profile=profile_nodes.snapshotItem(0);
website=profile_nodes.snapshotItem(2);

// Insert Twitter profile before website.
p = document.createElement('p');
hr = document.createElement('hr');
twitter='<strong>Twitter:</strong> <a href="http://twitter.com/'+user+'">'+user+'</a>';
p.innerHTML = twitter;
profile.parentNode.insertBefore(hr, website);
profile.parentNode.insertBefore(p, website);
