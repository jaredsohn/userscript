// ==UserScript==
// @author		Orrie
// @name		For The Record Cancer Remover
// @version		0.2
// @match		http://ftr.wot-news.com/*/*/*/*/*
// @include		http://ftr.wot-news.com/*/*/*/*/*
// ==/UserScript==

// style
var style = document.createElement('style');
	style.className = "comments_toggle";
	style.innerHTML = ".comments_remover {margin: 0 0 35px;} .comments_remover h2 {padding: 0 0 15px !important;} .comments_toggle {margin: 0 0 0 34px;} .b-fake-link {cursor: pointer; text-decoration: none;}"
	document.head.appendChild(style);
// end style

// scripts
var script = document.createElement("script");
	script.className = "comments_toggle";
	script.type = "text/javascript";
	script.textContent = "(function($){$(document).ready(function(){$('.js-comments-showhide').click(function(){$('#comments').toggle();return false;});});})(jQuery);"
	document.head.appendChild(script);
// end scripts

// content
var	comments_div = document.getElementById("comments");
	comments_div.setAttribute('style', 'display:none;');
	comments_remover = document.createElement('div');
	comments_remover.className = "comments_remover";
	comments_remover.innerHTML += "<h2 id='comments-title'>Comments removed, due to cancer</h2>"
								+ "<div class='comments_toggle'><a class='js-comments-showhide'><span class='b-fake-link'>Show/Hide Comments</span></a></div>";

	comments_div.parentNode.insertBefore(comments_remover, comments_div);
// end content
