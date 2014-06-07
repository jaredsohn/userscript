// ==UserScript==
// @name        Ignore Tags
// @namespace   dazarobbo
// @author		dazarobbo
// @description Hide topics based on ignored tags
// @include     http*://www.bungie.net/*
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @version     1
// ==/UserScript==

var $ = unsafeWindow.jQuery;

/**
 * Object for browser-related manipulation
 *
 * @type {Object}
 */
var Browser = {

		/**
		 * Provides access for setting, getting, and deleting values persistently
		 *
		 * @type {Object}
		 */
		Memory: {
				
				/**
				 * Sets a value in the browser's memory according to a given key
				 *
				 * @param {String} key The key to store the value under
				 * @param {Object} value The value to store
				 * @returns void
				 */
				Set: function(key, value){
						GM_setValue(key, value);
				},
				
				/**
				 * Gets a value from the browser's memory according to a given key
				 *
				 * @param {String} key The key for the value to retrieve
				 * @param {Object} defaultVal The value to return if no value exists
				 * @returns {Object} The stored value if it exists, otherwise the default
				 */
				Get: function(key, defaultVal){
						var v = GM_getValue(key);
						return typeof v != "undefined" ? v : defaultVal;
				},
				
				/**
				 * Deletes a value from the browser's memory according to a given key
				 *
				 * @param {String} key The key of the value to delete
				 * @returns void
				 */
				Delete: function(key){
					GM_deleteValue(key);
				},
				
				/**
				 * Checks whether a value exists for a given key
				 *
				 * @param {String} key Key of the value to check for
				 * @returns {Bool} True if exists, otherwise false
				 */
				Exists: function(key){
					return Browser.Memory.Get(key, undefined) != undefined;
				},
				
				/**
				 * Deletes all values in the browser's memory
				 *
				 * @returns void
				 */
				DeleteAll: function(){
					GM_listValues().forEach(function(key){
						Browser.Memory.Delete(key);
					});
				}
				
		},

		/**
		 * Returns the user agent string for the browser
		 *
		 * @returns {String}
		 */
		get UserAgent(){
			return navigator.userAgent;	
		}
};

function GetEvent(elem, evt, sel){
	
	//type
	//origType
	//data
	//handler
	//guid
	//selector
	//quick
	//namespace
	
	var evts = $._data($(elem)[0], "events")[evt];
	for(var i=0; i<evts.length; ++i){
		if(evts[i].selector === sel){
			return evts[i];
		}
	}

	return null;
	
}

function BNextEvent(d, t, a){
	this.Domain = d ? d : null;
	this.Type = t ? t : null;
	this.Args = a ? a : {};
}

function BNextBroker(){
	
	this.Notifications = {
		BeforeGetRecentNotifications:null,
		GetRecentNotifications:null,
		GetRecentNotificationsRendered:null,
		GetRecentNotificationsError:null
	};
	
	this.ForumTopic = {

		PopulateReply:null,
		
		BeforePopulateTopic:null,
		PopulateTopic:null,
		
		//Hybrid
		AnyPost:null
		
	};
	
	this.Forum = {
		
		BeforeNewTopicExpanded:null,
		NewTopicExpanded:null,
		
		BeforeGetTopicsPaged:null,
		GetTopicsPaged:null,
		GetTopicsPagedError:null,
		
		BeforeRenderTopic:null,
		RenderTopic:null
		
	};
	
	this.Dispatch = function(e){
		
		//Check for dedicated bindings
		if(e.Domain in this && typeof this[e.Domain] === "object"){
			if(e.Type in this[e.Domain] && typeof this[e.Domain][e.Type] == "function"){
				this[e.Domain][e.Type](e);
			}
		}
		
		//Test for hybrids
		if(e.Domain === "ForumTopic"){
			switch(e.Type){
				case "PopulateTopic":
				case "PopulateReply":
					if(typeof this.ForumTopic.AnyPost === "function"){
						this.ForumTopic.AnyPost(e);
					}
					break;
			}
		}
		
	}
	
	BNextBroker.Brokers.push(this);
	
}

BNextBroker.Brokers = [];

!function(){

	if(typeof unsafeWindow.bungieNetPlatform === "undefined") return;

	!function(){
	
		if(typeof unsafeWindow.Post === "undefined") return;
	
		var e;
		var oldPop = unsafeWindow.Post.prototype.PopulateTopic;
		var newPop = function(a, y){

			e = new BNextEvent("ForumTopic", "BeforePopulateTopic", {
				Users: this.authors,
				DeletedUsers: this.deletedAuthors,
				Groups: this.groups,
				Post: a,
				Author: this.authors[a.authorMembershipId]
			});
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
		
			oldPop.call(this, a, y);
			
			e = new BNextEvent("ForumTopic", "PopulateTopic", {
				Users: this.authors,
				DeletedUsers: this.deletedAuthors,
				Groups: this.groups,
				Post: a,
				Author: this.authors[a.authorMembershipId],
				Element: $(".post").first()
			});
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
		
		};
	
		unsafeWindow.Post.prototype.PopulateTopic = newPop;
	
	}();

	!function(){
	
		if(typeof unsafeWindow.Post === "undefined") return;
	
		var e;
		var oldPop = unsafeWindow.Post.prototype.PopulateReply;
		var newPop = function(a, E, A, y){
		
			oldPop.call(this, a, E, A, y);
			
			e = new BNextEvent("ForumTopic", "PopulateReply", {
				Post: a,
				Element: $("#" + a.postId).find(".post").first(),
				Author: this.authors[a.authorMembershipId]
			});
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
		
		}

		unsafeWindow.Post.prototype.PopulateReply = newPop;
		
	}();	
	
	!function(){
	
		if(typeof unsafeWindow.PostPage === "undefined") return;
	
		$(window).load(function(){
		
			var e;
			var oldEvtObj = GetEvent(document, "click", ".btn_createMessage");
			var oldEvt = oldEvtObj.handler;
			var newEvt = function(evt){
				
				e = new BNextEvent("Forum", "BeforeNewTopicExpanded");
				BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
				
				oldEvt.call(this, evt);
				e = new BNextEvent("Forum", "NewTopicExpanded");
				
				BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
				
			}
			oldEvtObj.handler = newEvt;
			
		});
	
	}();
	
	!function(){
	
		if(typeof unsafeWindow.PostPage === "undefined") return;
		
		var evt;
		var oldF = unsafeWindow.bungieNetPlatform.forumService.GetTopicsPaged;
		var newF = function(a, b, c, d, e, f, g, h, i){
			
			evt = new BNextEvent("Forum", "BeforeGetTopicsPaged", {
				Page: a,
				ItemsPerPage: b,
				GroupId: c,
				ForumTopicsSort: d,
				ForumTopicsQuickDate: e,
				ForumPostCategoryFilter: f,
				TagString: g
			});
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(evt); });
			
			oldF(a, b, c, d, e, f, g,
				function(r){
					evt = new BNextEvent("Forum", "GetTopicsPaged", { Response: r });
					BNextBroker.Brokers.forEach(function(b){ b.Dispatch(evt); });
					h.call(this, r);
				},
				function(r){
					evt = new BNextEvent("Forum", "GetTopicsPagedError", { Response: r });
					BNextBroker.Brokers.forEach(function(b){ b.Dispatch(evt); });
					i.call(this, r);	
				}
			);
			
		};
		
		unsafeWindow.bungieNetPlatform.forumService.GetTopicsPaged = newF;
		
	}();
	
	!function(){
	
		if(typeof unsafeWindow.PostPage === "undefined") return;
	
		$(window).load(function(){
			
			var e;
			var oldApp = unsafeWindow.$topics.append;
			var newApp = function(){
				
				var elem = $(arguments[0]);
				e = new BNextEvent("Forum", "BeforeRenderTopic", {
					Element: elem
				});
				BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
				
				oldApp.call(this, elem);
				
				e = new BNextEvent("Forum", "RenderTopic", {
					Element: elem
				});
				BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
				
			}
			
			unsafeWindow.$topics.append = newApp;
		
		});
	
	}();

	!function(){
	
		var e;
		var oldF = unsafeWindow.bungieNetPlatform.notificationService.GetRecentNotifications;
		var newF = function(a, b, c){
			
			e = new BNextEvent("Notifications", "BeforeGetRecentNotifications");
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
			
			oldF.call(this, a,
				function(r){
					
					e = new BNextEvent("Notifications", "GetRecentNotifications", {
						Response:r
					});
					BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
					
					b.call(this, r);
					
					e = new BNextEvent("Notifications", "GetRecentNotificationsRendered", {
						Response:r
					});
					BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
					
				},
				function(r){
				
					e = new BNextEvent("Notifications", "GetRecentNotificationsError", {
						Response:r
					});
					BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
					
					c.call(this, r);
					
				}
			);
			
		}
		
		unsafeWindow.bungieNetPlatform.notificationService.GetRecentNotifications = newF;
	
	}();
	
}();

//


function AddTag(t, cb){
	GetTags(function(tags){
		if(tags.indexOf(t) === -1){
			tags.push(t);
			SaveTags(tags, cb);
		}
		else{
			cb(-1);
		}
	});
}

function SaveTags(tags, cb){
	setTimeout(function(){
		Browser.Memory.Set("BNextIgnoreTags", JSON.stringify(tags));
		cb(1);
	}, 1);
}

function DeleteTag(t, cb){
	GetTags(function(tags){
		SaveTags(tags.filter(function(tg){ return tg !== t;}), cb);
	});
}

function GetTags(cb){
	setTimeout(function(){
		var tags = JSON.parse(Browser.Memory.Get("BNextIgnoreTags", "[]"));
		cb(tags);
	}, 1);
}


var b = new BNextBroker();
var topicResults;
var ignoredTags;

GetTags(function(tags){
	ignoredTags = tags.map(function(t){ return "#" + t; });
});

b.Forum.GetTopicsPaged = function(e){
	topicResults = e.Args.Response.results;
}

b.Forum.BeforeRenderTopic = function(e){
	
	var id = e.Args.Element.find(".content > a:first").data("rootpostid");
	var topic = topicResults.filter(function(t){ return t.postId == id; })[0];
	
	if(!topic || !Array.isArray(topic.tags)) return;

	if(topic.tags.some(function(t){ return ignoredTags.indexOf(t.toLowerCase()) !== -1; })){
		e.Args.Element.addClass("muted").prepend($("<a>").addClass("btn_expandMuted").text("Hidden Post"));
	}
	
}

$("#AccountSettings").append(
	$("<li>").addClass("cf expandable mute aboutMe user").append(
		$("<h3>").addClass("trigger cf").append(
			$("<strong>").addClass("heading").text("Muted Tags"),
			$("<span>").addClass("description").text("Tag-be-gone!")
		),
		$("<div>").addClass("collapsible").append(
			$("<div>").addClass("container_form").append(
				$("<label>").text("Add a tag:"),
				$("<div>").addClass("container_textbox container_textfield").append(
					$("<input>").attr("type", "text").keypress(function(evt){
					
						if(evt.which !== 13 || this.value.length === 0) return;
						
						var self = $(this);
						var nig = this.value.toLowerCase().replace(/[^a-z0-9]/g, "");
						
						AddTag(nig, function(r){
							
							if(r < 0){
								alert("Tag already exists");
								return;
							}
							
							self.closest(".collapsible").find("ul").first().append(
								$("<li>").append(
									$("<a>").text("#" + nig).click(function(){
										$(this).parent().remove();
										DeleteTag(nig, function(){});
									})
								)
							);
				
							self.val("");
							
						});
						
					})
				),
				$("<label>").text("Click a tag to remove it:"),
				$("<ul>").addClass("container_checkbox").css({padding:"5px 0 5px", fontFamily:"tahoma", fontSize:"0.9em"}).append(function(){
				
					var self = $(this);
					
					GetTags(function(tags){
						tags.forEach(function(t){
							self.append($("<li>").append(
								$("<a>").text("#" + t).click(function(){
									$(this).parent().remove();
									DeleteTag(t, function(){});
								})
							))
						})
					});
			
				})
			)
		)
	)
);
