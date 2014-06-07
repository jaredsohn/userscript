// ==UserScript==
// @name        BNextEventServer
// @namespace   dazarobbo
// @include     http*://www.bungie.net/*
// @version     1.3
// ==/UserScript==

function AppendCss(str){
	var s = document.createElement("style");
	s.type = "text/css";
	s.innerHTML = str;
	document.head.appendChild(s);
}

function GetEvent(elem, evt, sel){
	
	var evts = $._data($(elem)[0], "events")[evt];
	for(var i=0; i<evts.length; ++i){
		if(evts[i].selector === sel){
			return evts[i];
		}
	}
	
	//type
	//origType
	//data
	//handler
	//guid
	//selector
	//quick
	//namespace
	
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

	!function(){
	
		if(typeof Post === "undefined") return;
	
		var e;
		var oldPop = Post.prototype.PopulateTopic;
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
	
		Post.prototype.PopulateTopic = newPop;
	
	}();

	!function(){
	
		if(typeof Post === "undefined") return;
	
		var e;
		var oldPop = Post.prototype.PopulateReply;
		var newPop = function(a, E, A, y){
		
			oldPop.call(this, a, E, A, y);
			
			e = new BNextEvent("ForumTopic", "PopulateReply", {
				Post: a,
				Element: $("#" + a.postId).find(".post").first(),
				Author: this.authors[a.authorMembershipId]
			});
			BNextBroker.Brokers.forEach(function(b){ b.Dispatch(e); });
		
		}

		Post.prototype.PopulateReply = newPop;
		
	}();	
	
	!function(){
	
		if(typeof PostPage === "undefined") return;
	
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
	
		if(typeof PostPage === "undefined") return;
		
		var evt;
		var oldF = bungieNetPlatform.forumService.GetTopicsPaged;
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
		
		bungieNetPlatform.forumService.GetTopicsPaged = newF;
		
	}();
	
	!function(){
	
		if(typeof PostPage === "undefined") return;
	
		$(window).load(function(){
			
			var e;
			var oldApp = $topics.append;
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
			
			$topics.append = newApp;
		
		});
	
	}();

	!function(){
	
		var e;
		var oldF = bungieNetPlatform.notificationService.GetRecentNotifications;
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
		
		bungieNetPlatform.notificationService.GetRecentNotifications = newF;
	
	}();
	
}();

//

AppendCss(
	"#forum_post.op > article > .post h1:after," +
	".replies .op > article > .post h1:after{" +
		[
			"background: none repeat scroll 0 0 #D32A2A;",
			"border: 1px solid #D32A2A;",
			"color: #FFFFFF;",
			"content: \"Original poster\";",
			"display: inline-block;",
			"font-family: 'OpenSansSemibold',Arial,sans-serif;",
			"font-size: 9px;",
			"line-height: 11px;",
			"margin-left: 5px;",
			"padding: 0 2px;",
			"top:1px",
			"position: relative;",
			"text-transform: uppercase;",
			"vertical-align: middle;"
		].join("\n") +
	"}"
);

var b = new BNextBroker();
var op;
var topicResults;
var users;
var relatedPosts;

b.ForumTopic.BeforePopulateTopic = function(e){
	op = e.Args.Author;
}

b.ForumTopic.AnyPost = function(e){

	if(e.Args.Post.rating > 50){
		e.Args.Element.css("backgroundColor", "#2f4f4f");
	}
	
	if(e.Args.Post.authorMembershipId === op.membershipId){
		e.Args.Element.parent().parent().addClass("op");
	}
	
	if((e.Args.Post.flags & Globals.ForumFlagsEnum.BungieStaffPost) === Globals.ForumFlagsEnum.BungieStaffPost){
		e.Args.Element.find("h1 a").css("color", "#ffd224");
		e.Args.Element.find(".post_body,.post_body blockquote").css("color", "#ffd224");
	}
	else if((e.Args.Post.flags & Globals.ForumFlagsEnum.ForumNinjaPost) === Globals.ForumFlagsEnum.ForumNinjaPost){
		e.Args.Element.find("h1 a").css("color", "#ff9966");
		e.Args.Element.find(".post_body,.post_body blockquote").css("color", "#ff9966");
	}

}

b.Forum.GetTopicsPaged = function(e){
	topicResults = e.Args.Response.results;
	users = e.Args.Response.authors;
	relatedPosts = e.Args.Response.relatedPosts;
}

b.Forum.BeforeRenderTopic = function(e){
	
	var id = e.Args.Element.find(".content > a:first").data("rootpostid");
	var topic = topicResults.filter(function(t){ return t.postId == id; })[0];
	var author = users.filter(function(u){ return u.membershipId == topic.authorMembershipId; })[0];
	
	if(!topic) return;
	if(!author) return;
	
	//Wrap it in a closure just 'cos we can
	e.Args.Element.find(".extraInfo:has(>a:first-child)").each(function(e, el){

		var pObj = relatedPosts.filter(function(p){ return p.topicId == id; })[0];
		
		if(!pObj) return;
		
		var cd = new Date(pObj.creationDate);
		var ed = new Date(pObj.lastModified);
		var ss = Utility.decodeHTML(pObj.body);
		this.title = 
			"Created: " + cd.toLocaleDateString() + " at " + cd.toLocaleTimeString() + "\x0a" +
			(cd !== ed ? "Edited: " + ed.toLocaleDateString() + " at " + ed.toLocaleTimeString() + " (" + pObj.editCount + " times)\x0a" : "") +
			"\x0a\"" + ss.substring(0, 50) + (ss.length > 50 ? "..." : "") + "\"";
	
	});
	
	e.Args.Element.find(".content > a:first")[0].title =
		"Created: " + (new Date(topic.creationDate).toLocaleDateString()) + " at " + (new Date(topic.creationDate).toLocaleTimeString()) + "\x0A" +
		(topic.creationDate !== topic.lastModified ? "Edited: " + new Date(topic.lastModified).toLocaleDateString() + " at " + (new Date(topic.lastModified).toLocaleTimeString()) + " (" + topic.editCount + " times)\x0A" : "") +
		"Rating: " + topic.rating + " (" + topic.ratingCount + " votes)\x0A" +
		"Locked: " + (topic.lockedForReplies ? "Yes" : "No");
	
	if(topic.rating > 50){
		e.Args.Element.css("backgroundColor", "#2f4f4f");
	}
	
	if((topic.flags & Globals.ForumFlagsEnum.BungieStaffPost) === Globals.ForumFlagsEnum.BungieStaffPost){
		e.Args.Element.find(".content > a:first").css("color", "#ffd224");
	}
	else if((topic.flags & Globals.ForumFlagsEnum.ForumNinjaPost) === Globals.ForumFlagsEnum.ForumNinjaPost){
		e.Args.Element.find(".content > a:first").css("color", "#ff9966");
	}
	
}

b.Notifications.GetRecentNotificationsRendered = function(e){

	$("li.notifications li").each(function(i, el){
	
		var nId = this.dataset["notificationid"];
		var nObj = e.Args.Response.notifications.filter(function(n){ return n.notificationId == nId })[0];
		var str = "";
	
		if(!nObj) return;
	
		$(this).find("time").each(function(){
			var d = new Date(nObj.createdDate);
			this.title = d.toLocaleDateString() + " at " + d.toLocaleTimeString();
		});
	
		switch(nObj.notificationType){
			case 2: //Reply
			case 9: //Like
				break;
			default:
				return;
		}
	
		var count = nObj.relatedItemDetail.match(/^<h1>(\d+) /i);
		if(count == null) return;
		count = parseInt(count[1], 10);
	
		$(this).find("h1:first").empty().append(
			$("<a>").attr("href", Utility.makeFriendlyUrlPrefix(nObj.memberInitiated.displayName) + PageUrls.profilePage + "?mid=" + nObj.memberInitiatedId).text(nObj.memberInitiated.displayName)
		);

		if(count > 1){
			str = " and " + (count - 1) + " other" + (count - 1 !== 1 ? "s" : " person");
		}
		
		if(nObj.notificationType === 2){
			str += " replied";
		}
		
		$(this).find("h1:first").append(str);
	
	});

}

