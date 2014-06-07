// Tumblr Real Entities
// version 1.0
// 2012-03-28
// Copyright (c) 2012, Mike McGowan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Tumblr Real Entities
// @version       1.0
// @namespace     http://boxofbaskets.com/html/userscripts/
// @description   Replaces the escaped entities in tags (&amp;amp;, &amp;lt;) to real entities (&, <)
// @include       http://www.tumblr.com/dashboard
// @include		  http://www.tumblr.com/blog/*
// ==/UserScript==


var kids = 0;
var posts;
window.onload = function(){
	posts = document.getElementById('posts');
	setInterval(function(){
		if(posts.children.length != kids){
			while(kids < posts.children.length){
				for(c in posts.children[kids].children){
					type = typeof(posts.children[kids].children[c].className);
					if(type != 'undefined' && posts.children[kids].children[c].className.indexOf('with_tags') > 0){
						for(var i = 0; i < posts.children[kids].children[c].children[0].children[0].children.length; i++){
							posts.children[kids].children[c].children[0].children[0].children[i].innerHTML = posts.children[kids].children[c].children[0].children[0].children[i].innerHTML.replace(/&amp;/ig, '&');
						}
					}
				}
				kids++;
			}
		}
	}, 200);
}
