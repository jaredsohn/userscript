// ==UserScript==
// @name        New tab links
// @namespace   dazarobbo
// @include     http*://www.bungie.net/*/Post*
// @version     1.2
// ==/UserScript==

var $ = unsafeWindow.jQuery;

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
		
		PopulatePoll:null,
		
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
	
	this.Utility = {
		
		BeforeParseBBCode:null,
		ParseBBCode:null
		
	},
	
	this.Dispatch = function(e){
		
		//Check for dedicated bindings
		if(e.Domain in this && typeof this[e.Domain] === "object"){
			if(e.Type in this[e.Domain] && typeof this[e.Domain][e.Type] == "function"){
				return this[e.Domain][e.Type](e);
			}
		}
		
		//Test for hybrids
		if(e.Domain === "ForumTopic"){
			switch(e.Type){
				case "PopulateTopic":
				case "PopulateReply":
					if(typeof this.ForumTopic.AnyPost === "function"){
						return this.ForumTopic.AnyPost(e);
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
		
		var evt;
		var oldPop = unsafeWindow.Post.prototype.PopulateThePoll;
		var newPop = function(b, i, e){
		
			oldPop.call(this, b, i, e);
			
			evt = new BNextEvent("ForumTopic", "PopulatePoll", {
				Element: $(".PollResults:first"),
				Poll: b
			});
			
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(evt); });
		
		}
		
		unsafeWindow.Post.prototype.PopulateThePoll = newPop;
	
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
	
	!function(){
		
		var preParse;
		var postParse;
		var r;
		var evt;
		var oldF = unsafeWindow.Utility.parseBBCode;
		var newF = function(oStr, d, e){
				
			evt = new BNextEvent("Utility", "BeforeParseBBCode", {
				Text: oStr
			});
			BNextBroker.Brokers.forEach(function(b){ preParse = b.Dispatch(evt); });
			if(typeof preParse === "string") return preParse;
			
			postParse = oldF.call(this, oStr, d, e);
			
			evt = new BNextEvent("Utility", "ParseBBCode", {
				Text: oStr,
				Parsed: postParse
			});
			BNextBroker.Brokers.forEach(function(b){ r = b.Dispatch(evt); });

			return typeof r === "string" ? r : postParse;

		};
		
		unsafeWindow.Utility.parseBBCode = newF;
		
	}();
	
}();

//

var b = new BNextBroker();

b.ForumTopic.AnyPost = function(e){
	e.Args.Element.find("div.post_body:first").find("a").attr("target", "_blank");
}
