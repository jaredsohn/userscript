// ==UserScript==
// @name    Reddit Meta Linker
// @namespace    reddit.com/user/LowSociety
// @description    Checks for crosslinks to posts
// @match    *://*.reddit.com/r/*/comments/*
// @version    1.1
// ==/UserScript==

var metaLinker = {
    
    posts : new Array(),
	
    cacheLimit : 5, //minutes
    
    cache : {},
    
    loadCache : function() {
        this.cache = JSON.parse(localStorage['metaLinker.cache']  || "{}");
        
        var currentTime = new Date().getTime();
        for(var thingId in this.cache) {
            if(currentTime - this.cache[thingId].time > 1000 * 60 * this.cacheLimit) {
                delete this.cache[thingId];
            }
        }
    },
    saveCache : function() {
        localStorage['metaLinker.cache'] = JSON.stringify(this.cache);
    },
	
    initUrlParts : function() {
     	var url = location.href;
        
        var regex = new RegExp(/^([^:]+):\/\/([a-z]+\.)?reddit\.com\/r\/([^\/]+)\/comments\/([^\/]+)\/([^\/]+\/)?.*/g);
        var matches = regex.exec(url);
        
        if(matches == null)
            return null;
       
        this.urlParts = {
            protocol : matches[1],
            subdomain : matches[2],
            subreddit : matches[3],
            thingId : matches[4],
			title : matches[5]
        };
    },
    
    search : function(parameters, callback) {
         $.getJSON(this.urlParts.protocol + "://"+ this.urlParts.subdomain + "reddit.com/search.json", parameters, callback);
    },
    
    checkForLinkPosts : function(callback) {
        this.search({ q : "url:/r/" + this.urlParts.subreddit + "/comments/" + this.urlParts.thingId }, callback);
    },
    
    checkForSelfPosts : function(callback) {
		//Using the title in the url here because reddit's selftext search isn't super accurate.
       this.search({ q : "selftext:/r/" + this.urlParts.subreddit + "/comments/" + this.urlParts.thingId + (this.urlParts.title? "/" + this.urlParts.title + "/" : "") }, callback);
    },
    
    init : function() {
     	this.initUrlParts();
        this.loadCache();
        
        if(this.urlParts == null)
            return false;
        
        var self = this;
        
        if(this.cache[this.urlParts.thingId] != null) {
        	var currentTime = new Date().getTime();
            if(currentTime - this.cache[this.urlParts.thingId].time < 1000 * 60 * this.cacheLimit) {
                this.posts = this.cache[this.urlParts.thingId].posts;
                console.log("Got from cache.");
                return self.addTab();
            }
        }
        
        this.checkForLinkPosts(function(linkPosts) {
            self.posts = self.posts.concat(linkPosts.data.children);
            self.checkForSelfPosts(function(selfPosts) {
				//Even more filtering since reddit's selftext search sucks.
				if(selfPosts.data.children != null) {
					var filteredSelfPosts = new Array();
					for(var i = 0; i < selfPosts.data.children.length; i++) {
						if(selfPosts.data.children[i].data.selftext.indexOf("/r/" + self.urlParts.subreddit + "/comments/" + self.urlParts.thingId) !== -1)
							filteredSelfPosts.push(selfPosts.data.children[i])
					}
					self.posts = self.posts.concat(filteredSelfPosts);
				}
                
                self.cache[self.urlParts.thingId] = {
                    time : new Date().getTime(),
                    posts : self.posts
                };
                
                self.addTab();
            });
        });
    },
        
	addTab : function() {
        this.saveCache();
        var header = document.getElementById("header-bottom-left");
        var tabList = header.getElementsByTagName("ul")[0];
        
        if(tabList == null)
            return false;
        
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.href = "javascript:void(0);";
        
                
        if(this.posts != null && this.posts.length > 0) {
            var href = "/r/all/by_id/";
            for(var i = 0; i < this.posts.length; i++)
                href += (i > 0? "," : "") + this.posts[i].kind + "_" + this.posts[i].data.id;
            link.href = href;
            link.target = "_blank";
        } else {
			return false;
		}
        
        link.innerHTML = "meta links (" + this.posts.length + ")";
        listItem.appendChild(link);
        tabList.appendChild(listItem);
	}
    
}
metaLinker.init();