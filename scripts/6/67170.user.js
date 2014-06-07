// ==UserScript==
// @name           thingboxLite
// @namespace      http://userscripts.org/users/0
// @include        http://www.thingbox.com/account/welcome/*
// @include        http://www.thingbox.com/account/welcome 
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function(){begin();});

function begin()
{
		removeCrap();
}

function removeCrap()
{
	$("div#content h2").remove();
	$("div#content h4").remove();
	$("div#content > h3").remove();
	$("div#content > div").each(function(i){if (this.id=="twattle"){$(this).remove()};});
	var recentPosts = document.getElementById('tb-2');
	if (recentPosts) {
		parent = recentPosts.parentNode;
	    parent.parentNode.removeChild(parent);
	}
	var most = document.getElementById('most');
	if (most) {
	    most.parentNode.removeChild(most);
	}
	$("div.success").remove();
}
