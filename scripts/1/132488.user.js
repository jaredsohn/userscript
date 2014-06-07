// ==UserScript==
// @name			Norwalk Reflector / Sandusky Register Comment Blocker
// @namespace		http://userscripts.org/users/465314
// @description		This script is to get rid of the lowest form of discourse in the world, huron / erie county online newspaper comments
// @include			http://*.norwalkreflector.*
// @include			http://*.sanduskyregister.*
// @include			http://*.funcoast.*
// @include			http://*.fandy.*
// ==/UserScript==

var top_comments = document.getElementById('block-views-top_comments-block_1');
top_comments.parentNode.removeChild(top_comments);

var user_comments = document.getElementById('comments');
user_comments.parentNode.removeChild(user_comments);