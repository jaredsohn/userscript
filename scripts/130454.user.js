// ==UserScript==
// @name          	WM Graph API Interface
// @description	Creates a low-access, read-only interface to the FB Graph API.
// @require		http://userscripts.org/scripts/source/123889.user.js
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        	3.0.1.5
// @copyright      	Charlie Ewing except where noted
// ==/UserScript==

//this script requires some functions in the WM Common Library
//this script needs access to a pre-defined JSON object

var workOffline=false;
var sampleData={};
var sampleUser={};

(function(){
	this.Graph = {
		posts: {}, //location to store adjusted post data
		authRequestOut: false, //dont ask for token while asking for token
		authToken: (isChrome||getOpt("disableSaveAuthToken"))?null:getOpt("lastAuthToken"), //use stored fb token
		userID: null,
		userAlias: null,
		userName: null,
		
		fetchTimeout: 30,

		requests: [],

		requestAuthCodeB: function(callback){try{
			log("Graph.requestAuthCodeB()");
			if (Graph.authRequestOut) return {requestAlreadyOut:true}; //dont ask again while asking
			Graph.authRequestOut = true;
			var req; req=GM_xmlhttpRequest({
				method: "GET",
				url: "http://developers.facebook.com/tools/explorer",
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					var test=response.responseText;
					var auth=test.longestQuoteWithin();
					if (auth!="") {
						Graph.authToken = auth;
						log("Graph.requestAuthCodeB: got token");
						setOpt("lastAuthToken",auth);
					} else {
						log("Graph.requestAuthCodeB: "+response.responseText,{level:3});					
					}					
					Graph.authRequestOut=false;
					if (callback) setTimeout(callback,0);
					if(req)req=null;
				}catch(e){log("Graph.requestAuthCodeB.onload: "+e);}}, 
				onerror: function(response) {try{
					Graph.authToken="";
					Graph.authRequestOut=false;
					log("Graph.requestAuthCodeB: error:"+response.responseText+"\n Trying again in 30 seconds.",{level:3});
					setTimeout(function(){Graph.requestAuthCodeB(callback);},30000);
					if(req)req=null;
				}catch(e){log("Graph.requestAuthCodeB.onerror: "+e);}},
				onabort: function(response) {try{
					Graph.authToken="";
					Graph.authRequestOut=false;
					log("Graph.requestAuthCodeB: Request aborted, trying again in 30 seconds",{level:3});
					if(req)req=null;
					setTimeout(function(){Graph.requestAuthCodeB(callback);},30000);
				}catch(e){log("Graph.requestAuthCodeB.onabort: "+e);}},
				ontimeout: function(response) {try{
					Graph.authToken="";
					Graph.authRequestOut=false;
					log("Graph.requestAuthCodeB: Request timeout, trying again in 30 seconds",{level:3});
					if(req)req=null;
					setTimeout(function(){Graph.requestAuthCodeB(callback);},30000);
				}catch(e){log("Graph.requestAuthCodeB.ontimeout: "+e);}}
			});
			
		}catch(e){log("Graph.requestAuthCodeB: "+e);}},

		requestAuthCode: function(callback){try{

//beta patch 39 stuff
Graph.requestAuthCodeB(callback);
return;


			log("Graph.requestAuthCode()");
			if (Graph.authRequestOut) return; //dont ask again while asking
			Graph.authRequestOut = true;
			var req; req=GM_xmlhttpRequest({
				method: "GET",
				url: "http://developers.facebook.com/docs/reference/api/examples/",
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					var test=response.responseText;
					var searchString='<a href="https://graph.facebook.com/me/home?access_token=';
					var auth = test.indexOf(searchString),authEnd;
					if (auth!=-1) {
						authEnd = test.indexOf('">',auth);
						var authCode = (test.substring(auth+(searchString.length), authEnd));
						Graph.authToken = authCode;
						setOpt("lastAuthToken",authCode);
						log("Graph.requestAuthCode: got token");
					} else {
						log("Graph.requestAuthCode: "+response.responseText,{level:3});						
					}
					Graph.authRequestOut=false;
					if (callback) setTimeout(callback,0);
					if(req)req=null;
				}catch(e){log("Graph.requestAuthCode.onload: "+e);}}, 
				onerror: function(response) {try{
					Graph.authToken="";
					Graph.authRequestOut=false;
					log("Graph.requestAuthCode: error:"+response.responseText+"\n Trying again in 30 seconds.",{level:3});
					setTimeout(function(){Graph.requestAuthCode(callback);},30000);
					if(req)req=null;
				}catch(e){log("Graph.requestAuthCode.onerror: "+e);}},
				onabort: function(response) {try{
					Graph.authToken="";
					Graph.authRequestOut=false;
					log("Graph.requestAuthCode: Request aborted, trying again in 30 seconds",{level:3});
					if(req)req=null;
					setTimeout(function(){Graph.requestAuthCode(callback);},30000);
				}catch(e){log("Graph.requestAuthCode.onabort: "+e);}},
				ontimeout: function(response) {try{
					Graph.authToken="";
					Graph.authRequestOut=false;
					log("Graph.requestAuthCode: Request timeout, trying again in 30 seconds",{level:3});
					if(req)req=null;
					setTimeout(function(){Graph.requestAuthCode(callback);},30000);
				}catch(e){log("Graph.requestAuthCode.ontimeout: "+e);}}
			});
			
		}catch(e){log("Graph.requestAuthCode: "+e);}},

		fetchUser: function(params){try{
			log("Graph.fetchUser()");
			params=params || {};
			
			//special workOffline section
			if (workOffline){
				//log("Graph.fetchUser: working in offline testing mode");
				var data = sampleUser;
				Graph.userID=data["id"||null];
				Graph.userAlias=(data["username"]||null);
				Graph.userName=(data["name"]||null);

				if (params["callback"]) {
					var fx=params["callback"];
					delete params["callback"];
					setTimeout(fx,0);
				}
				
				return;
			}
			//end special section

			if (!Graph.authToken) {
				log("Graph.fetchUser: no authToken, get one");
				params["retries_noToken"]=(params["retries_noToken"])?params["retries_noToken"]+1:1; //count retries
				if (params["retries_noToken"]<3) {
					Graph.requestAuthCode(function(){Graph.fetchUser(params);} ); 
				} else log("Graph.fetchUser: cannot get new fb auth token",{level:3});
				return;
			}
			var URL="https://graph.facebook.com/me?access_token="+Graph.authToken;
			var req; req=GM_xmlhttpRequest({
				method: "GET",
				url: URL,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					if (response){
						//convert to JSON
					   try{
						var data = JSON.parse(response.responseText);
				
						if (data["id"]||null){
							//expected data exists
							Graph.userID=data["id"||null];
							Graph.userAlias=(data["username"]||null);
							Graph.userName=(data["name"]||null);

							if (params["callback"]) {
								var fx=params["callback"];
								delete params["callback"];
								setTimeout(fx,0);
							}
							
						} else if (data["error"]||null) {
							var emsg=data.error.message||null;
							//check for session expired
							if (emsg.find("Session has expired")||emsg.find("session is invalid")){
								//session expired or logged out, get a new token
								Graph.authToken="";
								params["retries_expToken"]=(params["retries_expToken"])?params["retries_expToken"]+1:1; //count retries
								if (params["retries_expToken"]<3) {
									Graph.requestAuthCode(function(){Graph.fetchUser(params);} ); 
								} else log("Graph.fetchUser: cannot refresh expired fb auth token",{level:3});
							} else if (emsg) log("Graph.fetchUser: "+emsg,{level:3});

						} else log("Graph.fetchUser: response was unrecognized",{level:3});
					    } catch (e){log("Graph.fetchUser: response error: "+e+": "+response);}

					} else log("Graph.fetchUser: response was empty",{level:3});
					if(req)req=null;
				}catch(e){log("Graph.fetchUser.onload: "+e);}}, 

				onabort: function(response) {try{
					log("Graph.fetchUser: Request aborted, trying again in 30 seconds.");
					setTimeout(function(){Graph.fetchUser(params);},30000);
					if(req)req=null;
				}catch(e){log("Graph.fetchUser.onabort: "+e);}},
				
				ontimeout: function(response) {try{
					log("Graph.fetchUser: Request timeout, trying again in 30 seconds.");
					setTimeout(function(){Graph.fetchUser(params);},30000);
					if(req)req=null;
				}catch(e){log("Graph.fetchUser.ontimeout: "+e);}},

				onerror: function(response) {try{
					if (response.responseText=="") {
						log(JSON.stringify(response));
						log("Graph.fetchUser: responseText was empty. Check to make sure your browser is online.", {level:5});
					}
					var data = JSON.parse(response.responseText);
					if (data) {if (data.error||null) {
						var emsg=data.error.message||null;
						//check for session expired
						if (emsg.find("Session has expired")||emsg.find("session is invalid")){
							//session expired or logged out, get a new token
							Graph.authToken="";
							params["retries_expToken"]=(params["retries_expToken"])?params["retries_expToken"]+1:1; //count retries
							if (params["retries_expToken"]<3) {
								Graph.requestAuthCode(function(){Graph.fetchUser(params);} ); 
							} else log("Graph.fetchUser: cannot refresh expired fb auth token",{level:3});
						} else if (emsg) log("Graph.fetchUser.onerror: "+emsg,{level:3});
					}} else {
						log("Graph.fetchUser.onerror: "+response+"\n Trying again in 30 seconds.");
						setTimeout(function(){Graph.fetchUser(params);},30000);
						if(req)req=null;
					}
				}catch(e){log("Graph.fetchUser.onerror: "+e);}}
			}); 
		}catch(e){log("Graph.fetchUser: "+e);}},

		matchRequest: function(params){try{
			for (var r in Graph.requests) {
				var req = Graph.requests[r];

				//match the feed
				if (req.feed == params.feed){ 
					//match the filter
					if (req.filter == params.filter) { 
						//match direction of request
						if (((req.next||null) && (params.next||null)) || ((req.prev||null) && (params.prev||null))) { 
							return r;
						}

						//also match the initial fetch with no directions
						if (req.next==null && req.prev==null) {
							return r;
						}
					}
				}
			}
			return -1;
		}catch(e){log("Graph.matchRequest: "+e);}},

		validatePost: function(params){try{
			var post=params.post;
			var callback=params.callback;
			var isOlder=params.next;

			//log("Graph.validatePost()",{level:1});

			//exclude non-app posts and posts with no action links
			if (!exists(post.actions||null) || !exists(post.application)) return;

			//exclude posts with less than like and comment and which have no link
			if (!(post.actions.length>=2) || !exists(post.link)) return;
			
			var postID=post["id"];

			//exclude posts already in our repository
			if (exists(Graph.posts[postID])) return;

			//store a reference to this post
			Graph.posts[postID]=1;

			//send the post back to the callback function here
			if (callback) setTimeout(function(){callback(post,isOlder);},0);
		}catch(e){log("Graph.validatePost: "+e);}},

		fetchPosts: function(params){try{
			log("Graph.fetchPosts()",{level:1});
			params=params || {};

			//special workOffline section
			if (workOffline){
				var feed=params.feed||null;
				var filter = (params.filter||"default");
				if (!(feed.filters[filter]||null)) feed.filters[filter]={next:"",prev:""}; //create filter instance if needed

			//log("Graph.fetchPosts: working in offline testing mode");
				var data = sampleData;
	
				//store posts
				if (data.data.length) for (var i=data.data.length-1;i>=0;i--) {
					var post=data.data[i];

					Graph.validatePost({
						post:post,
						callback:params.callback||null,
						next:params.next
					});
				}
				if (params.callback) delete params.callback;

				//capture the next and prev urls, but dont overwrite current known time boundaries
				if (data.paging||null){
					//if this is the first time we've used this object, remember its locations
					if (!feed.filters[filter].next) feed.filters[filter].next = data.paging.next;
					if (!feed.filters[filter].prev) feed.filters[filter].prev = data.paging.prev;

					//if the current request did not get older posts, push the newer post bracket
					if (!params.prev) feed.filters[filter].next = data.paging.next;
					//if the current request did not get newer posts, push the older post bracket
					if (!params.next) feed.filters[filter].prev = data.paging.previous;
				}
			
				return;
			}
			//end special section
			
			
			if (!Graph.authToken) {
				log("Graph.fetchPosts: no authToken, get one");
				params["retries_noToken"]=(params["retries_noToken"])?params["retries_noToken"]+1:1; //count retries
				if (params["retries_noToken"]<3) {
					Graph.requestAuthCode(function(){Graph.fetchPosts(params);} ); 
				} else log("Graph.fetchPosts: cannot get new fb auth token",{level:3});
				return;
			}

			//check if there is a request already out with this fb id and matches the direction
			var r=Graph.matchRequest(params);
			if (r!=-1){
				if (Graph.requests[r].next==null && Graph.requests[r].prev==null) log("Graph.fetchPosts: the initial request for data has not been returned yet",{level:3});
				else log("Graph.fetchPosts: a request is already out for posts in that direction and has not returned",{level:3});
				return;
			}

			//for each user specified feed source, get posts
			var feed=params.feed||null;
			var filter = (params.filter||"default");
			if (!(feed.filters[filter]||null)) feed.filters[filter]={next:"",prev:""}; //create filter instance if needed

			//verify that the feed "until" time does not violate olderLimit set by user
			var URL=feed.url+"?date_format=U&limit="+params.fetchQty+"&access_token="+Graph.authToken;
			if (params.next){
				var until=feed.filters[filter].next.getUrlParam("until");
				if (until||null){
					var limit=(params.limit||null);
					var timeNow=timeStamp();
					var fixTime = (until.length < 10)?(until+"000"):until;

					//debug.print(["var until:",until, until.length, fixTime])
					
					if (limit) {
						if ((timeNow-(fixTime)) > limit) {
							//log("Graph.fetchPosts("+params.feed.url+"): the user-set older limit of this feed has been reached",{level:2});
							return {olderLimitReached:true};
						}
					}
					URL+="&until="+fixTime;

				}else {
					log("Graph.fetchPosts("+params.feed.url+"): The previous result did not return pagination. Restarting fetching from current time.");
				}
			}
			else if (params.prev) {
				var since=feed.filters[filter].prev.getUrlParam("since");
				if (exists(since)) {
					URL+="&since="+since;
				}
			}

			//add a filter if there is one
			if (exists(params.filter)) URL+="&filter="+filter; //check using params.filter, do not use filter here or it may inject "default"

			log("Graph.fetchPosts: processing feed <a target='_blank' href='"+URL+"'>"+URL+"</a>");
			
			//remember this request
			Graph.requests.push({feed:params.feed, next:params.next, prev:params.prev, filter:filter});

			var req; req=GM_xmlhttpRequest({
				method: "GET",
				url: URL,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					//show dev tools
					if (opts && debug && !isChrome) if (opts.devDebugGraphData) {
						var pkg=debug.print("Graph.fetchPosts.onload.devDebugGraphData: ");
						pkg.msg.appendChild(createElement("button",{type:"button",onclick:function(){
								//response.responseText.toClipboard();
								promptText(response.responseText);
							}},[
							createElement("img",{src:"http://i1181.photobucket.com/albums/x430/merricksdad/array.png",title:"Show Data",style:"width:16px;height:16px; vertical-align:bottom;"})
						]));
					}
					
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);

					if (response){
					    try{
						//convert to JSON
						var data = JSON.parse(response.responseText);
						//add new posts to graph.posts
						if (exists(data.data)) {
							//log("response contains data");

							//alert(JSON.stringify(data.data));
	
							//store posts
							if (data.data.length) for (var i=data.data.length-1;i>=0;i--) {
								var post=data.data[i];

								Graph.validatePost({
									post:post,
									callback:params.callback||null,
									next:params.next
								});

							}							
else log("Graph.fetchPosts.onLoad: facebook returned an empty data set.");

							if (params.callback) delete params.callback;


							//capture the next and prev urls, but dont overwrite current known time boundaries
							if (data.paging||null){
								//if this is the first time we've used this object, remember its locations
								if (!feed.filters[filter].next) feed.filters[filter].next = data.paging.next;
								if (!feed.filters[filter].prev) feed.filters[filter].prev = data.paging.prev;

								//if the current request did not get older posts, push the newer post bracket
								if (!params.prev) feed.filters[filter].next = data.paging.next;
								//if the current request did not get newer posts, push the older post bracket
								if (!params.next) feed.filters[filter].prev = data.paging.previous;
							} else {
								log("Graph.fetchPosts.onLoad: facebook failed to return pagination data.");
							}

						} else if (data.error||null) {
							//check for session expired
							if ((data.error.message||"").find("Session has expired")){
								//session expired, get a new token
								Graph.authToken="";
								params["retries_expToken"]=(params["retries_expToken"])?params["retries_expToken"]+1:1; //count retries
								if (params["retries_expToken"]<3) {
									Graph.requestAuthCode(function(){Graph.fetchPosts(params);} ); 
								} else log("Graph.fetchPosts: cannot refresh expired fb auth token",{level:3});
							}
							else if (data.error.message||null) log("Graph.fetchPosts: "+data.error.message,{level:3});

						} else 	log("Graph.fetchPosts: response was unrecognized",{level:3});
						data=null;
				    	    } catch (e){log("Graph.fetchPosts: response error: "+e+": "+response);}	
					} else log("Graph.fetchPosts: response was empty",{level:3});
					if(req)req=null;
				}catch(e){log("Graph.fetchPosts.onload: "+e);}},

				onabort: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPosts: aborted: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPosts.onabort: "+e);}},

				ontimeout: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPosts: timeout: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPosts.ontimeout: "+e);}},

				onerror: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPosts: error: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPosts.onerror: "+e);}}
			});
		}catch(e){log("Graph.fetchPosts: "+e);}},
	};

	log("Graph initialized");
})();