// ==UserScript==
// @name           Hilight your YCombinator friends
// @namespace      http://www.broadersheet.com/yc.friends/
// @include        http://news.ycombinator.com/*
// ==/UserScript==
// add users to the "var users" line between the square brackets, eg ['pclark', 'username', 'username2']
var users = ['pclark'];

var userLinkXpath = '//a[' + users.map(function(user) { return 'contains(@href, "user?id=' + user + '")' }).join(' or ') + ']';
var xp = document.evaluate(userLinkXpath, document, null, 0, null); 
var nodes = [], node; while(node = xp.iterateNext()) nodes.push(node); for each(var node in nodes) node.style.fontWeight = 'bold';
