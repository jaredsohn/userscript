// ==UserScript==
// @name        Guardian Reformat Comments
// @namespace   http://tempuri.og
// @description Reformat comments
// @include     http://*.guardian.co.uk/*
// @include     http://*.guardiannews.com/*
// @include     http://*.theguardian.com/*
// @grant none
// @version     3
// ==/UserScript==

var jQuery = unsafeWindow.jQuery;
var localStorage = unsafeWindow.localStorage;

if(!localStorage.pageviews) {
	pageviews = {};
	localStorage["pageviews"] = JSON.stringify(pageviews);	
}
else
{	
	pageviews = JSON.parse(localStorage.pageviews);
}

jQuery(function()
{
var threaded = true;
var commentsUl= jQuery("ul.d2-comments");

var flattenedCommentsHtml;
var maxIdOnLoad;
var threadedCommentsHtml;

if(commentsUl.length) {
	doWork();
	var formDiv = jQuery("form.d2-options>div");
	formDiv.append("<a href='#' id='threadToggle'>Toggle flat / threaded</a>");
	jQuery("a#threadToggle",formDiv).click(function() {
		toggleThreading();
		return false;
	});
}

function doWork() {
	
	var thisPage = window.location.href.split('?')[0];
	var id = thisPage.split('/p/')[1];
	if(!maxIdOnLoad) {
		maxIdOnLoad = pageviews[id]?pageviews[id]:0;
	}
	var maxId = highlightPostsNewerThan(maxIdOnLoad);	
	pageviews[id] = maxId;
	localStorage['pageviews'] = JSON.stringify(pageviews);	

	//get the last comment for this page
	
	threadedCommentsHtml = commentsUl.html();		
}

function highlightPostsNewerThan(commentId) {
	var maxLink = commentId;
	//var links = jQuery("a.d2-permalink-area");
	var links = jQuery("a.d2-js-permalink");
	jQuery.each(links, function(sequence, link) {
		var postid = parseInt(link.href.split('/comment-permalink/')[1],10);		
		if(postid > commentId) {
			if(commentId > 0) {
				jQuery(link).css("background-color","yellow").append("&nbsp;New Comment");
			}
			if(postid > maxLink)
			maxLink = postid;
		}
		
	});
	return maxLink;
}

function toggleThreading()
{
	if(threaded) {
		flatten();
	} else {
		thread();
	}
}

function flatten() {
	if(flattenedCommentsHtml) {
		commentsUl.empty();
		commentsUl.html(flattenedCommentsHtml);	
	} else {
		commentsUl = jQuery("ul.d2-comments");
		threadedCommentsHtml = commentsUl.html();
		var replies = jQuery("li.d2-reply");
		var comments = jQuery("li.d2-comment");
		var allElements = [];

		var lastObj;

		jQuery.each(comments, function(index, obj) {	
			jQuery(obj).find("ul.d2-responses").remove();
			allElements.push(obj);
		});

		commentsUl.empty();

		jQuery.each(replies, function(index, obj) {	
			allElements.push(obj);
		});

		allElements.sort(function(ele1, ele2) {
			var id1 = $(ele1).data('comment-id'),
				id2 = $(ele2).data('comment-id');
			if(id1<id2) return -1;
			if(id2<id1) return 1;
			return 0;
		});

		jQuery.each(allElements, function(index, obj) {
			commentsUl.append(obj);
		});
		flattenedCommentsHtml = commentsUl.html();
	}
	threaded = false;
}


function thread() {
	commentsUl.empty();
	commentsUl.html(threadedCommentsHtml);
	threaded = true;
}

jQuery(document).ajaxComplete(function(event, xhr, settings) { 
		var url = settings.url;
		if(url.indexOf("discussion") > -1) {
			commentsUl= jQuery("ul.d2-comments");;
			flattenedCommentsHtml = null;
			threaded = true;
			doWork();
		}
	});

});