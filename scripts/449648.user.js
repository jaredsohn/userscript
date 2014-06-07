// ==UserScript==
// @name           MAL Quote And Reply Tracker
// @version        1.1.3
// @namespace      http://userscripts.org/users/520145
// @description    Lists first 3 replies after your posts and quotes of your posts up to 20 replies later on the top of the page.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/forum/*
// ==/UserScript==

/* global $ */
/* jshint unused:true */

(function() {
	"use strict";
	
	var x$ = null;
	
	function MalTracker() {
		this.topicCache = null;
		this.eventCache = null;
		this.settings = null;
		this.depCount = 0;
		this.originalReplyCount = 0;
		this.waitTryCount = 0;
		this.currentUser = null;
	}

	MalTracker.prototype.loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	};
	
	MalTracker.prototype.safeAlert = function(text) {
		if("alert" in window && typeof window.alert === "function") {
			window.alert(text);
		}
		else if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalTracker.prototype.safeLog = function(text) {
		if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	MalTracker.prototype.getPageType = function() {
		var url = window.location.href;
		
		if(/\?board/i.test(url)) {
			return "board";
		}
		else if(/\?topicid/i.test(url)) {
			return "topic";
		}
	};
	
	MalTracker.prototype.getCurrentUser = function() {
		var nameLink = x$("#nav a[href^=\"/profile/\"]");
		
		if(nameLink.length === 0) {
			return null;
		}
		
		var linkHref = nameLink.attr("href");
		var namePos = linkHref.lastIndexOf("/");
		
		return (namePos === -1) ? null : linkHref.substr(namePos + 1);
	};
	
	MalTracker.prototype.domFromFullHtml = function(html) {
		return x$("<div id=\"fakebody\">" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, "") + "</div>");
	};
	
	MalTracker.prototype.getUrlParam = function(paramName) {
		return decodeURIComponent((new RegExp(paramName + "=" + "(.+?)(&|$)").exec(window.location.search) || [, ""])[1]);
	};
	
	MalTracker.prototype.loadStorageItem = function(itemName) {
		var storageItem = localStorage.getItem(itemName);
		
		return (storageItem === null) ? null : JSON.parse(storageItem);
	};
	
	MalTracker.prototype.saveStorageItem = function(itemName, data) {
		localStorage.setItem(itemName, JSON.stringify(data));
	};
	
	MalTracker.prototype.clearStorageItem = function(itemName) {
		localStorage.removeItem(itemName);
	};
	
	MalTracker.prototype.saveTopicCache = function() {
		this.saveStorageItem("malTrackerCache", this.topicCache);
	};
	
	MalTracker.prototype.loadTopicCache = function() {
		this.topicCache = this.loadStorageItem("malTrackerCache");
		
		if(this.topicCache === null) {
			this.topicCache = {};
			this.saveTopicCache();
		}
	};
	
	MalTracker.prototype.saveEventCache = function() {
		this.saveStorageItem("malTrackerEventCache", this.eventCache);
	};
	
	MalTracker.prototype.loadEventCache = function() {
		this.eventCache = this.loadStorageItem("malTrackerEventCache");
		
		if(this.eventCache === null) {
			this.eventCache = [];
			this.saveEventCache();
		}
	};
	
	MalTracker.prototype.saveSettings = function() {
		this.saveStorageItem("malTrackerSettings", this.settings);
	};
	
	MalTracker.prototype.loadSettings = function() {
		this.settings = this.loadStorageItem("malTrackerSettings");
		
		if(this.settings === null) {
			this.settings = {};
			this.settings.replyDistance = 3;
			this.settings.quoteDistance = 20;
			this.saveSettings();
		}
	};
	
	MalTracker.prototype.getCurrentPostCount = function() {
		return x$(".forum_border_around").length;
	};
	
	MalTracker.prototype.elementMessageId = function(element) {
		return parseInt(element.attr("id").substring(8)) || 0;
	};
	
	MalTracker.prototype.getPageCountInfo = function(dom) {
		var lineDivs = x$(dom).find("#content > div:nth-of-type(2) > div");
		
		if(lineDivs.length < 2 || x$(lineDivs[1]).children("a").length === 0) {
			return { current: 1, max: 1 };
		}
		
		var result = x$(lineDivs[1]).text().match(/^Pages \(([\d]+)\).*\[([\d]+)\].*$/);
		
		if(result === null) {
			return { current: 1, max: 1 };
		}
		
		return { current: parseInt(result[2], 10), max: parseInt(result[1], 10) };
	};
	
	MalTracker.prototype.collectPostData = function(dom) {
		var self = this;
		var messageList = [];
		
		x$(dom).find(".forum_border_around").each( function(index, element) {
			var messageId = self.elementMessageId(x$(element));
			var username = x$(element).find("tr:nth-of-type(2) .forum_boardrow2 strong").text();
			var quotedYou = false;
			
			x$(element).find(".quotetext > strong").each( function(index, element) {
				if(x$(element).text() === (self.currentUser + " said:")) {
					quotedYou = true;
				}
			});
			
			messageList.push( { id: messageId, username: username, quotedYou: quotedYou } );
		});
		
		return messageList;
	};
	
	MalTracker.prototype.fireTrackerEvent = function(type, offset, topicInfo, page, postData) {
		var event = { type: type, offset: offset, topicId: topicInfo.topicId, title: topicInfo.title, page: page, post: postData };
		this.loadEventCache();
		this.eventCache.push(event);
		this.saveEventCache();
		
		console.log("Recorded new event", event);
		
		this.renderOneEvent(event);
	};
	
	MalTracker.prototype.processPagePosts = function(topicInfo, postsInfo, pagingInfo) {
		var self = this;
		var newReplies = 0;
		var deleteCache = false;
		var hasSeenLastMessage = false;
		var trackMaxDistance = Math.max(this.settings.quoteDistance, this.settings.replyDistance);
	
		x$.each(postsInfo, function(index, post) {
			if(!hasSeenLastMessage && !topicInfo.newPage) {
				if(post.id === topicInfo.checkMessageId) {
					hasSeenLastMessage = true;
				}
				
				return true;
			}
			
			topicInfo.checkMessageId = post.id;
			topicInfo.replyCount++;
			newReplies++;
			
			if(post.username === this.currentUser) {
				topicInfo.messageId = post.id;
				topicInfo.replyCount = 0;
				topicInfo.startPage = pagingInfo.current;
				
				self.safeLog("Found your own new message.");
			}
			else if(topicInfo.replyCount <= self.settings.quoteDistance && post.quotedYou) {
				self.fireTrackerEvent("quote", topicInfo.replyCount, topicInfo, pagingInfo.current, post);
			}
			else if(topicInfo.replyCount <= self.settings.replyDistance) {
				self.fireTrackerEvent("reply", topicInfo.replyCount, topicInfo, pagingInfo.current, post);
			}
			
			if(topicInfo.replyCount >= trackMaxDistance) {
				deleteCache = true;
				return false;
			}
		});
		
		if(newReplies > 0) {
			topicInfo.lastNewPost = (+new Date());
			topicInfo.newPage = false;
			
			self.safeLog(newReplies + " new messages in topic " + topicInfo.topicId);
		}
		else {
			self.safeLog("No new messages in topic " + topicInfo.topicId);
		}
		
		if(postsInfo.length === 20) {
			if(newReplies === 0) {
				this.safeLog("No new posts on a full page, anomaly, aborting.");
				deleteCache = true;
			}
			else {
				topicInfo.checkPage++;
				topicInfo.newPage = true;
			}
		}
		
		return deleteCache;
	};
	
	MalTracker.prototype.analyzePage = function(dom, topicInfo) {
		console.log("Analyzing", topicInfo);
		
		var deleteCache = false;
		var pagingInfo = this.getPageCountInfo(dom);
		
		this.loadTopicCache();
		
		if(this.topicCache.hasOwnProperty(topicInfo.topicId)) {
			var newTopicInfo = this.topicCache[topicInfo.topicId];
		
			if(pagingInfo.current === 1 && newTopicInfo.checkPage > 1) {
				console.log("Redirected to page 1, page is not yet populated.");
			}
			else {
				var postsInfo = this.collectPostData(dom);
				console.log(postsInfo);
				
				if(postsInfo.length === 0) {
					this.safeLog("No posts. Thread " + newTopicInfo.topicId + " probably deleted.");
					deleteCache = true;
				}
				else {
					deleteCache = this.processPagePosts(newTopicInfo, postsInfo, pagingInfo);
				}
			}
			
			if(deleteCache) {
				delete this.topicCache[newTopicInfo.topicId];
			}
			else {
				newTopicInfo.lastCheck = (+new Date());
			}
			
			this.saveTopicCache();
		}
	};
	
	MalTracker.prototype.queryTopic = function(topicInfo) {
		var self = this;
		var topicCheckLink = "/forum/?topicid=" + topicInfo.topicId + "&show=" + ((topicInfo.checkPage - 1) * 20);
		
		x$.ajax(topicCheckLink, {dataType: "text", timeout: 5000}).done( function(data) {
			var dom = self.domFromFullHtml(data);
			
			self.analyzePage(dom, topicInfo);
			self.scheduleCheckNextTopic(false);
		}).fail( function() {
			self.safeLog("Failed to query last page.");
			
			self.scheduleCheckNextTopic(true);
		});
	};
	
	MalTracker.prototype.calculateTimeTillNextCheck = function(topicInfo) {
		var timeDiff = topicInfo.lastCheck - topicInfo.lastNewPost;
		
		if(timeDiff > 1000 * 60 * 60 * 2) {
			return 1000 * 60 * 20;
		}
		else if(timeDiff > 1000 * 60 * 60) {
			return 1000 * 60 * 5;
		}
		else if(timeDiff > 1000 * 60 * 30) {
			return 1000 * 60 * 3;
		}
		else {
			return 1000 * 60 * 1;
		}
	};
	
	MalTracker.prototype.getOldestUncheckedTopic = function() {
		var oldestUnchecked = null;
		var currentTime = (+new Date());
		var newPostsAfter = currentTime - 1000 * 3600 * 24 * 2;
		var newPostsAfterCheck = currentTime - 1000 * 3600 * 12;
		
		var topicsToDelete = [];
		
		for(var topicId in this.topicCache) {
			if(this.topicCache.hasOwnProperty(topicId)) {
				var topic = this.topicCache[topicId];
				var checkBelowTime = currentTime - this.calculateTimeTillNextCheck(topic);
				
				if(topic.lastCheck < checkBelowTime) {
					if(topic.lastCheck > newPostsAfterCheck && topic.lastNewPost < newPostsAfter) {
						console.log("Deleting topic info, no replies in two days:", topic);
						
						topicsToDelete.push(topic.topicId);
					}
					else if(oldestUnchecked === null || topic.lastCheck < oldestUnchecked.lastCheck) {
						oldestUnchecked = topic;
					}
				}
			}
		}
		
		if(topicsToDelete.length > 0) {
			for(var i = 0; i < topicsToDelete.length; i++) {
				delete this.topicCache[topicsToDelete[i]];
			}
			
			this.saveTopicCache();
		}
		
		return oldestUnchecked;
	};
	
	MalTracker.prototype.checkNextTopic = function() {
		this.loadTopicCache();
		
		var nextToCheck = this.getOldestUncheckedTopic();
		
		if(nextToCheck === null) {
			console.log("No topics to check right now.");
		
			this.scheduleCheckNextTopic(true);
		}
		else {
			this.queryTopic(nextToCheck);
		}
	};
	
	MalTracker.prototype.scheduleCheckNextTopic = function(longWait) {
		var self = this;
		setTimeout( function() { self.checkNextTopic(); }, longWait ? 60000 : 2000 );
	};
	
	MalTracker.prototype.recordTrackPost = function(topicId, topicTitle, messageId, startPage, newPage, lastMessageId, replyCount) {
		var topicInfo = { topicId: topicId, title: topicTitle, messageId: messageId, startPage: startPage, checkPage: startPage, checkMessageId: lastMessageId, replyCount: replyCount, lastCheck: (+new Date()), lastNewPost: (+new Date()), newPage: newPage };
		
		console.log("Recording info", topicInfo);
	
		this.loadTopicCache();
		this.topicCache[topicId] = topicInfo;
		this.saveTopicCache();
	};
	
	MalTracker.prototype.findMessageFromLastPage = function(topicId, messageId) {
		var self = this;
		var lastPageLink = "/forum/?topicid=" + topicId + "&goto=newpost";
		
		x$.ajax(lastPageLink, {dataType: "text", timeout: 5000}).done( function(data) {
			var dom = self.domFromFullHtml(data);
			var messageElement = x$(dom).find("#forumMsg" + messageId);
			
			if(messageElement.length > 0) {
				self.safeLog("Found your message.");
				
				var pagingInfo = self.getPageCountInfo(dom);
				var allMessages = x$(dom).find(".forum_border_around");
				var isLastPostOnPage = allMessages.length === 20 && x$(allMessages[19]).attr("id") === messageElement.attr("id");
				
				self.safeLog(pagingInfo);
				self.recordTrackPost(topicId, x$(".forum_locheader").text(), messageId, isLastPostOnPage ? pagingInfo.current + 1 : pagingInfo.current, isLastPostOnPage, messageId, 0);
			}
			else {
				self.safeLog("Your message was not found on the last page.");
			}
		}).fail( function() {
			self.safeLog("Failed to query last page.");
		});
	};
	
	MalTracker.prototype.postedMessageAppeared = function() {
		var newPostId = this.elementMessageId(x$(".forum_border_around").last());
		var topicId = this.getUrlParam("topicid");
		
		this.safeLog("Your message ID is " + newPostId + " posted in topic " + topicId);
		
		this.findMessageFromLastPage(topicId, newPostId);
	};
	
	MalTracker.prototype.checkPostWait = function() {
		var currentReplyCount = this.getCurrentPostCount();
		
		if(currentReplyCount > this.originalReplyCount) {
			this.postedMessageAppeared();
		}
		else {
			this.schedulePostWait();
		}
	};
	
	MalTracker.prototype.schedulePostWait = function() {
		var self = this;
		
		if(this.waitTryCount < 150) {
			setTimeout(function() { self.checkPostWait(); }, 30 );
			
			this.waitTryCount++;
		}
		else {
			this.safeLog("Aborting wait, too many tries.");
		}
	};
	
	MalTracker.prototype.submitPostEvent = function() {
		this.originalReplyCount = this.getCurrentPostCount();
		this.waitTryCount = 0;
		this.schedulePostWait();
	};
	
	MalTracker.prototype.checkCurrentTopic = function() {
		var self = this;
		var topicId = this.getUrlParam("topicid");
		
		if(this.topicCache.hasOwnProperty(topicId)) {
			return;
		}
		
		var pagingInfo = this.getPageCountInfo(document);
		
		if(pagingInfo.current !== pagingInfo.max) {
			return;
		}
		
		var posts = this.collectPostData(document);
		var yourMessageId = null;
		var lastMessageId = null;
		var postsAfterYou = 0;
		
		x$.each(posts, function(index, post) {
			lastMessageId = post.id;
			
			if(post.username === self.currentUser) {
				yourMessageId = post.id;
				postsAfterYou = 0;
			}
			else {
				postsAfterYou++;
			}
		});
		
		if(yourMessageId !== null) {
			var isLastPostOnPage = posts.length === 20 && postsAfterYou === 0;
			
			self.recordTrackPost(topicId, x$(".forum_locheader").text(), yourMessageId, isLastPostOnPage ? pagingInfo.current + 1 : pagingInfo.current, isLastPostOnPage, lastMessageId, postsAfterYou);
		}
	};
	
	MalTracker.prototype.initForTopic = function() {
		var self = this;
		
		x$("#postReply").click( function() { self.submitPostEvent(); } );
		
		this.checkCurrentTopic();
	};
	
	MalTracker.prototype.renderOneEvent = function(event) {
		var eventDiv = x$("<div/>").css("width", "100%").css("border-bottom", "1px solid #c0c0c0");
		var description = null;
		
		if(event.type === "reply") {
			description = "<b>" + event.post.username + "</b> replied after you in topic ";
			eventDiv.css("background-color", "#dde6f6");
		}
		else if(event.type === "quote") {
			description = "<b>" + event.post.username + "</b> quoted you in topic ";
			eventDiv.css("background-color", "#eaf6dd");
		}
		
		eventDiv.html(description);
		
		var topicLink = x$("<a/>").css("width", "100%").css("border-bottom", "1px solid #c0c0c0");
		topicLink.attr("href", "http://myanimelist.net/forum/?topicid=" + event.topicId + "&show=" + ((event.page - 1) * 20) + "#msg" + event.post.id);
		topicLink.text(event.title);
		
		eventDiv.append(topicLink);
		eventDiv.append(" (" + event.offset + " posts after you).");
		
		x$("#eventContainer").prepend(eventDiv);
	};
	
	MalTracker.prototype.createEventsBox = function() {
		var container = $("<div/>", {
			id: "eventContainer",
		}).css("width", "958px").css("height", "80px").css("overflow-y", "scroll").css("padding", "5px 10px 5px 10px").css("border", "1px solid #c0c0c0").css("position", "relative");
		
		$("#content").before(container);
	};
	
	MalTracker.prototype.settingsLinkClicked = function(secondary) {
		if(secondary) {
			this.renderTrackedTopics();
		}
		else {
			if(x$("#trackerSettingsToggle").text() === "Close") {
				this.renderEvents();
			}
			else {
				this.renderSettings();
			}
		}
	};
	
	MalTracker.prototype.createEventsBoxSettingLink = function(linkText, secondary) {
		var self = this;
		
		x$(secondary ? "#trackerTopics" : "#trackerSettingsToggle").remove();
	
		var settingsBox = $("<div/>", { id: secondary ? "trackerTopics" : "trackerSettingsToggle" }).css("cursor", "pointer").css("width", "60px").css("position", "absolute").
			css("top", "0").css("right", secondary ? "61px" : "0").css("text-align", "center").css("background", "#eeeeee").css("border-left", "1px solid #c0c0c0").css("border-bottom", "1px solid #c0c0c0");
		settingsBox.text(linkText);
		settingsBox.click( function() { self.settingsLinkClicked(secondary); } );
		
		x$("#eventContainer").append(settingsBox);
	};
	
	MalTracker.prototype.addSettingsInfoLine = function(box, infoText, actions) {
		var line = x$("<div/>").css("width", "100%").css("border-bottom", "1px solid #c0c0c0");
		
		if(typeof infoText === "string" || infoText instanceof String) {
			line.text(infoText);
		}
		else {
			line.append(infoText);
		}
		
		if(actions.length > 0) {
			line.append(" (");
			
			for(var i = 0; i < actions.length; i++) {
				if(i > 0) {
					line.append(", ");
				}
				
				line.append(actions[i]);
			}
			
			line.append(")");
		}
		
		box.append(line);
	};
	
	MalTracker.prototype.createAction = function(text, callback) {
		var line = x$("<a/>", { href: "#" }).css("cursor", "pointer");
		line.text(text);
		line.click(callback);
		
		return line;
	};
	
	MalTracker.prototype.clearEvents = function() {
		this.clearStorageItem("malTrackerEventCache");
		this.loadEventCache();
	
		this.renderSettings();
		return false;
	};
	
	MalTracker.prototype.clearTracking = function() {
		this.clearStorageItem("malTrackerCache");
		this.loadTopicCache();
	
		this.renderSettings();
		return false;
	};
	
	MalTracker.prototype.adjustReplyDistance = function(offset) {
		if(this.settings.replyDistance + offset >= 0) {
			this.settings.replyDistance += offset;
			this.saveSettings();
			this.renderSettings();
		}
		
		return false;
	};
	
	MalTracker.prototype.adjustQuoteDistance = function(offset) {
		if(this.settings.quoteDistance + offset >= 0) {
			this.settings.quoteDistance += offset;
			this.saveSettings();
			this.renderSettings();
		}
		
		return false;
	};
	
	MalTracker.prototype.renderSettings = function() {
		var self = this;
		var container = x$("#eventContainer");
		container.html("");
		this.createEventsBoxSettingLink("Close", false);
		this.createEventsBoxSettingLink("Topics", true);
		
		this.addSettingsInfoLine(container, "Currently recorded " + this.eventCache.length + " events.", [this.createAction("erase", function() { return self.clearEvents(); } )]);
		this.addSettingsInfoLine(container, "Currently tracking " + Object.keys(this.topicCache).length + " topics.", [this.createAction("reset", function() { return self.clearTracking(); } )]);
		
		var replyActions = [this.createAction("increase", function() { return self.adjustReplyDistance(1); } ), this.createAction("decrease", function() { return self.adjustReplyDistance(-1); } )];
		this.addSettingsInfoLine(container, "Notifying about up to " + this.settings.replyDistance + " replies.", replyActions);
		
		var quoteActions = [this.createAction("increase", function() { return self.adjustQuoteDistance(1); } ), this.createAction("decrease", function() { return self.adjustQuoteDistance(-1); } )];
		this.addSettingsInfoLine(container, "Notifying about quotes up to " + this.settings.quoteDistance + " posts later.", quoteActions);
	};
	
	MalTracker.prototype.stopTrackingTopic = function(event) {
		var topicId = x$(event.target).closest("div").children("a").first().attr("id").substring(4);
		
		this.loadTopicCache();
		
		if(this.topicCache.hasOwnProperty(topicId)) {
			delete this.topicCache[topicId];
			
			this.saveTopicCache();
			this.renderTrackedTopics();
		}
		
		return false;
	};
	
	MalTracker.prototype.renderTrackedTopics = function() {
		var self = this;
		var container = x$("#eventContainer");
		container.html("");
		this.createEventsBoxSettingLink("Settings", false);
		
		for(var topicId in this.topicCache) {
			if(this.topicCache.hasOwnProperty(topicId)) {
				var topic = this.topicCache[topicId];
				
				var topicLink = x$("<a/>", { id: "rawr" + topicId ,href: "http://myanimelist.net/forum/?topicid=" + topic.topicId + "&show=" + ((topic.startPage - 1) * 20) + "#msg" + topic.messageId });
				topicLink.text(topic.title);
				
				this.addSettingsInfoLine(container, topicLink, ["+" + topic.replyCount, this.createAction("stop", function(event) { return self.stopTrackingTopic(event); } )]);
			}
		}
	};
	
	MalTracker.prototype.renderEvents = function() {
		x$("#eventContainer").html("");
		
		this.createEventsBoxSettingLink("Settings", false);
		
		for(var i = 0; i < this.eventCache.length; i++) {
			this.renderOneEvent(this.eventCache[i]);
		}
	};
	
	MalTracker.prototype.init = function() {
		this.pageType = this.getPageType();
		this.currentUser = this.getCurrentUser();
		
		if(this.currentUser !== null) {
			this.loadSettings();
			this.loadTopicCache();
			this.loadEventCache();
			
			if(this.pageType === "topic") {
				this.initForTopic();
			}
			
			this.scheduleCheckNextTopic(false);
			this.renderEvents();
		}
		else {
			console.log("Not logged in.");
		}
	};
	
	MalTracker.prototype.loadCallback = function() {
		var self = this;
		this.depCount++;
		
		if(this.depCount === 2) {
			x$(document).ready( function() { self.init(); } );
		}
	};
	
	MalTracker.prototype.preinit = function() {
		var self = this;
		
		if(x$ === null) {
			self.loadScript("//cdnjs.cloudflare.com/ajax/libs/json3/3.3.0/json3.min.js", function() {
				self.loadCallback();
			});
			
			self.loadScript("//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js", function() {
				x$ = $.noConflict(true);
				self.loadCallback();
			});
		}
		else {
			x$(document).ready( function() { self.init(); } );
		}
		
		this.createEventsBox();
	};
	
	var malTracker = new MalTracker();
	malTracker.preinit();
	
})();
