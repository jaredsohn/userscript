// ==UserScript==
// @name           Kongregate Game Comments Enhancer
// @namespace      ventero.de
// @author         Ventero
// @description    Lets you specify a rating threshold for comments on Kongregate and adds pagination to comments on game pages.
// @include        http://www.kongregate.com/games/*/*
// @include        http://www.kongregate.com/games/*/*/comments*
// @date           26.09.2011
// @version        1.4
// @require        http://kong.ventero.de/updates/84216.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 08/23/2010
// Licensed under MIT/X11 license
// Copyright (c) 2010 Ventero
// http://www.opensource.org/licenses/mit-license.php
if(window != top) return;

function runInScope(src, args){
	var s = document.createElement("script");
	s.textContent = "" +
	"if(typeof CommentsEnhancer === 'undefined'){" +
	"	CommentsEnhancer = {}" +
	"};" +
	"(function(args){" +
		"(" + src.toString() + ").apply(CommentsEnhancer, args);" +
	"})(" + (args ? JSON.stringify(args) : "") + ");";
	document.body.appendChild(s);
	setTimeout(function(){document.body.removeChild(s);}, 100);
}

var OPTION = "kong_rating_threshold";
var threshold = GM_getValue(OPTION, "all");

GM_registerMenuCommand("Set comments rating threshold", function(){
	var r = prompt("Please enter the rating threshold. To show all comments, " +
	               "don't enter anything (or random text) and click ok")

	window.setTimeout(function(){
		GM_setValue(OPTION, r);
	}, 0);
	runInScope(function(t){
		this.threshold = this.parseThreshold(t);
		this.showComments();
	}, [r]);
});

runInScope(function(threshold){
function parseThreshold(value){
	var parsed = parseInt(value, 10);
	if(isNaN(parsed))
		return -Infinity;
	else
		return parsed;
}

function showComments(target){
	var threshold = CommentsEnhancer.threshold;
	if(target) {
		target = $(target);
	} else {
		target = $("comments_list") || $("all_comments");
	}

	function hide(a){
		target.down("#" + a).hide();
	}

	function show(a){
		target.down("#" + a).show();
	}

	function getRating(a){
		return parseInt(target.down("#comment_current_rating_" + a).innerHTML, 10);
	}

	var comments = target.getElementsByClassName("user_message comment"), current, id;
	for(var i = comments.length - 1; i >= 0; i--){
		current = comments[i];
		id = current.id.split("_")[1];

		if(getRating(id) > threshold) {
			current.className = current.className.replace("below_threshold", "above_threshold");
			hide('show_comment_content_' + id);
			show('hide_comment_content_' + id);
			show('comment_content_' + id);
		} else {
			current.className = current.className.replace("above_threshold", "below_threshold");
		  show('show_comment_content_' + id);
		  hide('hide_comment_content_' + id);
		  hide('comment_content_' + id);
		}
	}
}

var recent = $('recent_comments')
if(recent && !recent.down(".user_message.comment")) {
	recent.observe("DOMNodeInserted", function(){
		if(!recent.down(".user_message.comment")) return;
		recent.stopObserving("DOMNodeInserted");
		showComments(recent);
	});
}

this.threshold = parseThreshold(threshold);
this.parseThreshold = parseThreshold;
this.showComments = showComments;

showComments();
}, [threshold]);

/////////////////////////////////////////////////////////////////////////
if(!document.getElementById("comments_list")) return;

runInScope(function(){
var self = this;
var commentsUrl = location.pathname + "/comments";

function loadComments(event, target, params){
	divs[params.sort].down("div").hide();
	$("spinner_" + params.sort).show();

	var tempDiv = new Element("div");

	new Ajax.Updater({success: tempDiv}, commentsUrl, {
		method: "get",
		parameters: params,
		requestHeaders: { "Accept" : "text/html, */*" },
		onComplete: function(r){
			var commentsList = tempDiv.down("div#all_comments").down("div");
			var pagination = tempDiv.down(".pagination.simple_pagination");

			var oldPagination = target.down(".pagination.simple_pagination");
			if(oldPagination) oldPagination.remove();

			self.showComments(commentsList);
			target.down("div").update(commentsList.innerHTML);
			target.appendChild(pagination);

			var links = ["next", "last", "prev", "first"];

			links.forEach(function(type){
				var link = pagination.down("li." + type).down("a");
				if(link && link.href){
					var paramString = link.href.substring(link.href.indexOf("?"));
					if(!paramString) return;
					var newParams = paramString.toQueryParams();
					link.observe("click", function(event){
						return loadComments(event, target, newParams);
					});
					link.href = "#";
				}
			});

			$("spinner_" + params.sort).hide();
			divs[params.sort].down("div").show();
			resetLinks[params.sort].show();
			comments_controller._comment_ids = commentsList.select(".user_message.comment").map(function(ele){
				return ele.id.split("_")[1];
			});
			comments_controller.checkUserRatingStatus();
		}
		/* TODO: onFailure */
	});

	if(event.stop) event.stop();
	if(event.preventDefault) event.preventDefault();
	return false;
}

var fiveBest, fiveRecent, origIds;

function loadInitialBest(event){
	origIds = comments_controller._comment_ids;
	fiveBest = top.down("div").innerHTML;
	topMore.hide();

	return loadComments(event, top, {sort: "best"});
}

function loadInitialRecent(event){
	fiveRecent = recent.down("div").innerHTML;
	recentMore.hide();

	return loadComments(event, recent, {sort: "newest"});
}

function reset(event, target, orig, more, reset){
	target.down("div").update(orig);
	var pagination = target.down(".pagination.simple_pagination");
	if(pagination) pagination.remove();
	more.show();
	reset.hide();

	comments_controller._comment_ids = origIds;
	comments_controller.checkUserRatingStatus();

	if(event.stop) event.stop();
	if(event.preventDefault) event.preventDefault();

	return false;
}

function resetBest(event){
	return reset(event, top, fiveBest, topMore, topReset);
}

function resetRecent(event){
	return reset(event, recent, fiveRecent, recentMore, recentReset);
}

var list = $("comments_list");
var top = list.down(".top_comments");
var recent = $("recent_comments");
var divs = {best: top, newest: recent};

var topMore = new Element("a", {href: "#"}).update("(see more)");
var recentMore = new Element("a", {href: "#"}).update("(see more)");
var topReset = new Element("a", {href: "#"}).update("(see less)").hide();
var recentReset = new Element("a", {href: "#"}).update("(see less)").hide();
var resetLinks = {best: topReset, newest: recentReset}

top.down(".comments_type").insert(" ").insert(topMore).insert(topReset);
topMore.observe("click", loadInitialBest);
topReset.observe("click", resetBest);

recent.down(".comments_type").insert(" ").insert(recentMore).insert(recentReset);
recentMore.observe("click", loadInitialRecent);
recentReset.observe("click", resetRecent);

var topSpinner = new Element("span", {"class": "spinner spinner_big", "id": "spinner_best"}).update("loading").hide();
var recentSpinner = new Element("span", {"class": "spinner spinner_big", "id": "spinner_newest"}).update("loading").hide();

top.insert(topSpinner);
recent.insert(recentSpinner);
});
