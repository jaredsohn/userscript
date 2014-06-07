// ==UserScript==
// @name          	WM Graph API Interface (Beta Branch)
// @description	Creates a low-access, read-only interface to the FB Graph API.
// @require		http://userscripts.org/scripts/source/123889.user.js
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        	3.1.3
// @copyright      	Charlie Ewing except where noted
// ==/UserScript==

//this script requires some functions in the WM Common Library
//this script needs access to a pre-defined JSON object

var workOffline=false;

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
		
		likePost: function(postID,params){try{
			//https://graph.facebook.com/POST_ID/likes?access_token=		
			var req; req=GM_xmlhttpRequest({
				method: "POST",
				url: "https://graph.facebook.com/"+postID+"/likes?access_token="+Graph.authToken,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					if (response.responseText=="true") {
						if (params.callback) params.callback(params.post);
					} else {
						log(response.responseText);
					}
				}catch(e){log("Graph.likePost.onload: "+e);}}, 
				onerror: function(response) {try{
				}catch(e){log("Graph.likePost.onerror: "+e);}},
				onabort: function(response) {try{
				}catch(e){log("Graph.likePost.onabort: "+e);}},
				ontimeout: function(response) {try{
				}catch(e){log("Graph.likePost.ontimeout: "+e);}}
			});
		}catch(e){log("Graph.likePost: "+e);}},

		unlikePost: function(postID){try{
			//https://graph.facebook.com/POST_ID/likes?access_token=		
			var req; req=GM_xmlhttpRequest({
				method: "DELETE",
				url: "https://graph.facebook.com/"+postID+"/likes?access_token="+Graph.authToken,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
				}catch(e){log("Graph.unlikePost.onload: "+e);}}, 
				onerror: function(response) {try{
				}catch(e){log("Graph.unlikePost.onerror: "+e);}},
				onabort: function(response) {try{
				}catch(e){log("Graph.unlikePost.onabort: "+e);}},
				ontimeout: function(response) {try{
				}catch(e){log("Graph.unlikePost.ontimeout: "+e);}}
			});
		}catch(e){log("Graph.unlikePost: "+e);}},

		commentPost: function(postID,comment){try{
			//https://graph.facebook.com/POST_ID/comments?message=&access_token=	
			var req; req=GM_xmlhttpRequest({
				method: "POST",
				url: "https://graph.facebook.com/"+postID+"/comments?access_token="+Graph.authToken+"&message="+comment,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					if (response.responseText=="true") {
						//comment successful
					} else {
						log(response.responseText);
					}
				}catch(e){log("Graph.commentPost.onload: "+e);}}, 
				onerror: function(response) {try{
				}catch(e){log("Graph.commentPost.onerror: "+e);}},
				onabort: function(response) {try{
				}catch(e){log("Graph.commentPost.onabort: "+e);}},
				ontimeout: function(response) {try{
				}catch(e){log("Graph.commentPost.ontimeout: "+e);}}
			});
		}catch(e){log("Graph.commentPost: "+e);}},
		
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
			log("Graph.requestAuthCode()");
			if (Graph.authRequestOut) return {requestAlreadyOut:true}; //dont ask again while asking
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
			
			if (!Graph.authToken) {
				log("Graph.fetchUser: no authToken, get one");
				params["retries_noToken"]=(params["retries_noToken"])?params["retries_noToken"]+1:1; //count retries
				if (params["retries_noToken"]<3) {
					Graph.requestAuthCodeB(function(){Graph.fetchUser(params);} ); 
				} else {
					log("Graph.fetchUser: cannot get new fb auth token",{level:3});
					return {getAuthTokenFailed:true}
				}
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
									Graph.requestAuthCodeB(function(){Graph.fetchUser(params);} ); 
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
								Graph.requestAuthCodeB(function(){Graph.fetchUser(params);} ); 
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
				if (JSON.stringify(req.friends) == JSON.stringify(params.friends)){ 
					//match the app filters
					if (JSON.stringify(req.apps) == JSON.stringify(params.apps)) { 
						//match direction of request
						if (req.direction==params.direction) { 
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
			//if (!exists(post.actions||null) || !exists(post.application)) return;

			//exclude posts with less than like and comment and which have no link
			//if (!(post.actions.length>=2) || !exists(post.link)) return;
			
			var postID=post["post_id"]||post["id"];

			//exclude posts already in our repository
			if (exists(Graph.posts[postID])) return;

			//store a reference to this post
			Graph.posts[postID]=1;

			//send the post back to the callback function here
			if (callback) setTimeout(function(){callback(post,isOlder);},0);
		}catch(e){log("Graph.validatePost: "+e);}},
		
		fetchPostsFQL_B: function(params){try{
			console.log(JSON.stringify(params));
		
			if (arguments.length==0) {
				log("Graph.fetchPostsFQL: no parameters passed");
				return;
			}
			
			/*
				direction: 0=until now | 1=forward from front edge | -1=backward from back edge
				apps = array of app id's to fetch posts for, error on no apps passed
				friends = array of friend id's to fetch posts for, default all friends
				limit = number to fetch
				timeouts = number of timeouts so far when performing retry looping
				targetEdge = unix time to continue fetching until
				currentEdge = current remembered edge of feed
				retries_noToken = number of times this function has called getAuthToken and failed
				callback = function to enact on each post
				edgeHandler = function to keep track of edges
			*/
			
			if (!(params.apps||null)) {
				log("Graph.fetchPostsFQL: no apps requested");
				return;
			}
		
			var bypassMatchRequest = (params.targetEdge||null)?true:false;

			//validate current auth token
			if (!Graph.authToken) {
				log("Graph.fetchPostsFQL: no authToken, get one");
				params["retries_noToken"]=(params["retries_noToken"])?params["retries_noToken"]+1:1; //count retries
				if (params["retries_noToken"]<3) {
					Graph.requestAuthCodeB(function(){Graph.fetchPostsFQL_B(params);} ); 
				} else {
					log("Graph.fetchPostsFQL: cannot get new fb auth token",{level:3});
					return {getAuthTokenFailed:true};
				}
				return;
			}

			//check if there is a request already out with this feed id and matches the direction
			if (!bypassMatchRequest) {
				var r=Graph.matchRequest(params);
				if (r!=-1){
					log("Graph.fetchPostsFQL: a request is already out for posts in that direction and has not returned",{level:3});
					return {requestAlreadyOut:true};
				}
			}
									
			//compile feed request strings			
			var URL_prefix="https://graph.facebook.com/fql?access_token={0}&q=";
			var URL="{\"query1\":\"SELECT post_id,target_id,message,app_id,action_links,created_time,attachment,app_data,like_info,source_id FROM stream WHERE source_id IN ({3}){1}{2} ORDER BY created_time DESC{4}\",\"query2\":\"SELECT uid,name FROM user WHERE uid IN (SELECT source_id FROM #query1)\"}";
			URL_prefix=URL_prefix.replace("{0}",Graph.authToken);
			
			//specialize call for specific friend post requests
			if (params.friends||null) {
				URL=URL.replace("{3}",params.friends.join(","));
			} else {
				URL=URL.replace("{3}","SELECT uid2 FROM friend WHERE uid1=me() LIMIT 5000");
			}
			
			//get older posts
			//verify that the feed "until" time does not violate olderLimit set by user
			if (params.direction<0){
				URL=URL.replace("{2}"," AND created_time < "+params.currentEdge);
				
			
			//get newer posts
			} else if (params.direction>0){
				URL=URL.replace("{2}"," AND created_time > "+params.currentEdge);
				
			//fetch at current time
			} else {
				URL=URL.replace("{2}","");
			}

			//filters by apps requested
			//unless no apps were passed or we specified no app filtering
			if ((params.apps||null) && !(params.noAppFiltering||null)){
				URL=URL.replace("{1}"," AND app_id IN ("+params.apps.join(",")+")");
			} else {
				//no app filtering, let WM do this internally
				URL=URL.replace("{1}","");
			}
						
			//add the user defined fetchQty
			URL=URL.replace("{4}","+LIMIT+"+(params.limit||25));
			
			//encode the url
			URL=URL_prefix+encodeURI(URL).replace(/\:/,"%3A").replace(/\#/,"%23");

			log("Graph.fetchPostsFQL: processing feed <a target='_blank' href='"+URL+"'>"+URL+"</a>");
			
			//remember this request
			Graph.requests.push(mergeJSON(params));

			//make the request
			var req; req=GM_xmlhttpRequest({
				method: "GET",
				url: URL,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					//show dev tools
					if (opts && debug && !isChrome) if (opts.devDebugGraphData) {
						var pkg=debug.print("Graph.fetchPostsFQL.onload.devDebugGraphData: ");
						pkg.msg.appendChild(createElement("button",{type:"button",onclick:function(){
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
												
						//manage the return object
						if (exists(data.data)) {							
							//there should be two return queries under data
							//zip the two together by matching the name to the source_id in the post
							var realData = data.data[0].fql_result_set;
							var nameData = data.data[1].fql_result_set;
							var uidKeys = {};
							
							for (var n=0,l=nameData.length;n<l;n++){
								uidKeys[nameData[n].uid.toString()]=nameData[n].name;
							}

							for (var p=0,l=realData.length;p<l;p++){
								realData[p].fromName = (uidKeys[realData[p].source_id.toString()]||"undefined");
							}
							
							data.data=realData;
	
							//store posts
							if (data.data.length) log("Graph.fetchPostsFQL.onLoad: "+data.data.length+" posts received. Validating data...");
							else log("Graph.fetchPostsFQL.onLoad: facebook returned an empty data set.");
							
							//no paging exists in the FQL system, we make our own
							var gotMoreToDo=false;
							var lastPullOldestPost=null;
							var lastPullNewestPost=null;
							if (data.data.length) {
								lastPullOldestPost=data.data.last().created_time;
								lastPullNewestPost=data.data[0].created_time;
							}
							
							if ((params.targetEdge||null) && (data.data.length)) {
								gotMoreToDo = (params.direction<0)?
									(lastPullOldestPost > params.targetEdge): //keep fetching older
									(lastPullNewestPost < params.targetEdge); //keep fetching newer
							}
							
							
							//read them in backward
							if (data.data.length) for (var i=data.data.length-1;i>=0;i--) {
								var post=data.data[i];

								//exclude posts already in our repository
								if (Graph.posts[post["post_id"]]!=1) {

									//store a reference to this post
									Graph.posts[post["post_id"]]=1;

									//send the post back to the callback function here
									params.callback(post);
								}
							}
							
							//process the edge handler for any request that returned posts
							var edgeMsg = {friends:params.friends,apps:params.apps,edge:{}};
							if (params.direction>=0) edgeMsg.edge.newer=lastPullNewestPost;
							if (params.direction<=0) edgeMsg.edge.older=lastPullOldestPost;
							if (data.data.length) if (params.edgeHandler||null) params.edgeHandler(edgeMsg);
							
							//go back and do another request if we have specified we have more to do
							//this is for use with fetchHours and similar functions
							if (gotMoreToDo) {
								log("Graph.fetchPostsFQL.onload: was not able to get enough in one return, going back for more...");
								var newParams = mergeJSON(params);
								newParams.currentEdge=(params.direction<0)?lastPullOldestPost:lastPullNewestPost;
								Graph.fetchPosts(newParams);
							}
							


						} else if (data.error||null) {
							//check for session expired
							if ((data.error.message||"").find("Session has expired")){
								//session expired, get a new token
								Graph.authToken="";
								params["retries_expToken"]=(params["retries_expToken"])?params["retries_expToken"]+1:1; //count retries
								if (params["retries_expToken"]<3) {
									Graph.requestAuthCodeB(function(){Graph.fetchPosts(params);} ); 
								} else log("Graph.fetchPostsFQL: cannot refresh expired fb auth token",{level:3});
							}
							else if (data.error.message||null) log("Graph.fetchPosts: "+data.error.message,{level:3});

						} else 	log("Graph.fetchPostsFQL: response was unrecognized",{level:3});
						data=null;
				    	    } catch (e){log("Graph.fetchPostsFQL: response error: "+e+": "+response);}	
					} else log("Graph.fetchPostsFQL: response was empty",{level:3});
					if(req)req=null;
				}catch(e){log("Graph.fetchPostsFQL.onload: "+e);}},

				onabort: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPostsFQL: aborted: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPostsFQL.onabort: "+e);}},

				ontimeout: function(response) {try{
					//remove the memory that a request is out
					params.timeouts++;
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPostsFQL: timeout: retry="+(params.timeouts<3)+", "+response.responseText);
					if(req)req=null;
					
					if (params.timeouts<3) Graph.fetchPosts(params);
				}catch(e){log("Graph.fetchPostsFQL.ontimeout: "+e);}},

				onerror: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPostsFQL: error: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPostsFQL.onerror: "+e);}}
			});		
		}catch(e){log("Graph.fetchPostsFQL_B: "+e);}},
		
		fetchPostsFQL: function(params){try{
			log("Graph.fetchPostsFQL("+((params.newer)?"newer":(params.older)?"older":"")+")",{level:1});
			params=params || {};
			params.timeouts=params.timeouts||0;			
			var bypassMatchRequest = (params.range||null)?true:false;
			
			//remember the target position if this is a ranged search
			//we'll pass targetrange back to this function later if we need to fetch more
			if (params.range||null){
				if (params.range.oldedge||null) params.targetedge = params.range.oldedge;
			}

			//validate auth token
			if (!Graph.authToken) {
				log("Graph.fetchPostsFQL: no authToken, get one");
				params["retries_noToken"]=(params["retries_noToken"])?params["retries_noToken"]+1:1; //count retries
				if (params["retries_noToken"]<3) {
					Graph.requestAuthCodeB(function(){Graph.fetchPostsFQL(params);} ); 
				} else {
					log("Graph.fetchPostsFQL: cannot get new fb auth token",{level:3});
					return {getAuthTokenFailed:true};
				}
				return;
			}

			//check if there is a request already out with this fb id and matches the direction
			var r=Graph.matchRequest(params);
			if (!bypassMatchRequest) if (r!=-1){
				if (Graph.requests[r].older==null && Graph.requests[r].newer==null) {
					log("Graph.fetchPostsFQL: the initial request for data has not been returned yet",{level:3});
					return {initRequestSlow:true};
				} else {
					log("Graph.fetchPostsFQL: a request is already out for posts in that direction and has not returned",{level:3});
					return {requestAlreadyOut:true};
				}
			}

			var feed=params.feed||null;
			var filter = (params.filter||"default");
			
			
			//create default filter instances when they do not exist
			if (params.groupApps||null) {
				//set our filter to our first app in the groupApps
				//this will be used below various times
				filter = "app_"+params.groupApps[0];
				
				if (feed||null) for (var a=0,l=params.groupApps.length;a<l;a++) {
					var filtName = "app_"+params.groupApps[a];
					if (!(feed.filters[filtName]||null)) feed.addFilter({id:filtName}); //create filter instance if needed					
				}
			} else {
				if (feed||null) if (!(feed.filters[filter]||null)) feed.addFilter({id:filter}); //create filter instance if needed
			}
			
			//compile feed request strings			
			var URL_prefix="https://graph.facebook.com/fql?access_token={0}&q=";
			var URL="{\"query1\":\"SELECT post_id,target_id,message,app_id,action_links,created_time,attachment,app_data,like_info,source_id FROM stream WHERE source_id IN ({3}){1}{2} ORDER BY created_time DESC{4}\",\"query2\":\"SELECT uid,name FROM user WHERE uid IN (SELECT source_id FROM #query1)\"}";
			URL_prefix=URL_prefix.replace("{0}",Graph.authToken);
			
			//specialize call for specific friend post requests
			if (params.specificFriend||null) {
				URL=URL.replace("{3}",feed.id);
			} else {
				URL=URL.replace("{3}","SELECT uid2 FROM friend WHERE uid1=me() LIMIT 5000");
			}
			
			//get older posts
			//verify that the feed "until" time does not violate olderLimit set by user
			if (params.older){
				var edge=(params.range||null)?params.range.oldedge:feed.filters[filter].oldedge; 
				if (edge||null){
					var limit=(params.limit||null); //this is not FB search limit keyword, this is a WM timelimit
					var timeNow=timeStamp();
					
					//no oldest post limit on range fetches
					if (params.range||null) limit=null;
										
					if (limit) {
						if ((timeNow-(edge*1000)) > limit) {
							log("Graph.fetchPosts("+params.feed.url+"): the user-set older limit of this feed has been reached",{level:2});
							return {olderLimitReached:true};
						}
					}
					URL=URL.replace("{2}"," AND created_time < "+edge);

				} else {
					log("Graph.fetchPostsFQL("+params.feed.url+"): The previous result did not return pagination. Restarting fetching from current time.");
					URL=URL.replace("{2}","");
				
				}
			
			//get newer posts
			} else if (params.newer){
				var edge=(params.range||null)?params.range.newedge:feed.filters[filter].newedge;
				if (exists(edge)) {
					URL=URL.replace("{2}"," AND created_time > "+edge);
				}
				
			//fetch at current time
			} else {
				URL=URL.replace("{2}","");
			}

			//filters come in the form of "app_123456789012"
			if (params.groupApps||null) {
				//fetch posts for multiple apps at once
				URL=URL.replace("{1}"," AND app_id IN ("+params.groupApps.join(",")+")");
			} else if (filter!=undefined && filter!=null){
				URL=URL.replace("{1}"," AND app_id IN ("+filter.split("app_")[1]+")");
			} else {
				//no filter, nothing passed
				//this should never happen
				URL=URL.replace("{1}","");
			}
			
			//add the user defined fetchQty
			URL=URL.replace("{4}","+LIMIT+"+(params.fetchQty||25));
			
			//encode the url
			URL=URL_prefix+encodeURI(URL).replace(/\:/,"%3A").replace(/\#/,"%23");

			log("Graph.fetchPostsFQL: processing feed <a target='_blank' href='"+URL+"'>"+URL+"</a>");
			//console.log(URL);
			//return;
			
			//remember this request
			Graph.requests.push({feed:params.feed, older:params.older, newer:params.newer, filter:filter, groupApps:params.groupApps, specificFriend:params.specificFriend});
			//console.log("request pushed");

			//return;
			var req; req=GM_xmlhttpRequest({
				method: "GET",
				url: URL,
				timeout: Graph.fetchTimeout*1000,
				onload: function(response) {try{
					//show dev tools
					if (opts && debug && !isChrome) if (opts.devDebugGraphData) {
						var pkg=debug.print("Graph.fetchPostsFQL.onload.devDebugGraphData: ");
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
												
						//manage the return object
						if (exists(data.data)) {
							//log("response contains data");
							
							//there should be two return queries under data
							//zip the two together by matching the name to the source_id in the post
							var realData = data.data[0].fql_result_set;
							var nameData = data.data[1].fql_result_set;
							var uidKeys = {};
							
							for (var n=0,l=nameData.length;n<l;n++){
								uidKeys[nameData[n].uid.toString()]=nameData[n].name;
							}

							for (var p=0,l=realData.length;p<l;p++){
								realData[p].fromName = (uidKeys[realData[p].source_id.toString()]||"undefined");
							}
							
							data.data=realData;
	
							//store posts
							if (data.data.length) log("Graph.fetchPostsFQL.onLoad: "+data.data.length+" posts received. Validating data...");
							else log("Graph.fetchPostsFQL.onLoad: facebook returned an empty data set.");
							
							//no paging exists in the FQL system, we make our own
							var gotMoreToDo=false;
							var lastPullOldestPost=null;
							var lastPullNewestPost=null;
							if (data.data.length) {
								lastPullOldestPost=data.data.last().created_time;
								lastPullNewestPost=data.data[0].created_time;
							}
							if ((params.targetedge||null) && (data.data.length)) {
								gotMoreToDo = (lastPullOldestPost > params.targetedge);
							}
							
							
							//read them in backward
							if (data.data.length) for (var i=data.data.length-1;i>=0;i--) {
								var post=data.data[i];

								Graph.validatePost({
									post:post,
									callback:params.callback||null,
									older:params.older,
									newer:params.newer
								});

							}
							
							//go back and do another request if we have specified we have more to do
							//this is for use with fetchHours and similar functions
							if (gotMoreToDo) {
								log("Graph.fetchPostsFQL.onload: was not able to get enough in one return, going back for more...");
								//clone the last set of params
								var newParams = mergeJSON(params);
								newParams.range={oldedge:0,newedge:0}; //new instance to prevent byRef errors
								//update the range settings
								newParams.range.newedge=lastPullOldestPost;
								newParams.range.oldedge=params.targetedge; //remember the original passed oldest data to target
								//make the next request
								Graph.fetchPosts(newParams);
							}
							
							//start cleanup
							if (params.callback) delete params.callback;


							//capture the next and prev urls, but dont overwrite current known time boundaries
							if (data.data.length){
								if (params.groupApps||null){
									//manage all filters at once from the group-fetch apps array
									for (var n=0,l=params.groupApps.length;n<l;n++){
										var filtName = "app_"+params.groupApps[n];
										
										
										if (!params.newer && !params.older) {
											feed.filters[filtName].newedge = lastPullNewestPost;
											feed.filters[filtName].oldedge = lastPullOldestPost;
										}
										if (params.newer) feed.filters[filtName].newedge = lastPullNewestPost;
										if (params.older) feed.filters[filtName].oldedge = lastPullOldestPost;
										
									}
								} else if (filter!=undefined && filter!=null) {
									//if the current request was a recent posts pull, set both edges
									if (!params.newer && !params.older) {
										feed.filters[filter].newedge = lastPullNewestPost;
										feed.filters[filter].oldedge = lastPullOldestPost;
									}

									//if the current request got newer posts, push the newer post edge
									if (params.newer) feed.filters[filter].newedge = lastPullNewestPost;
									
									//if the current request got older posts, push the older post edge
									if (params.older) feed.filters[filter].oldedge = lastPullOldestPost;
								}
							}

						} else if (data.error||null) {
							//check for session expired
							if ((data.error.message||"").find("Session has expired")){
								//session expired, get a new token
								Graph.authToken="";
								params["retries_expToken"]=(params["retries_expToken"])?params["retries_expToken"]+1:1; //count retries
								if (params["retries_expToken"]<3) {
									Graph.requestAuthCodeB(function(){Graph.fetchPosts(params);} ); 
								} else log("Graph.fetchPostsFQL: cannot refresh expired fb auth token",{level:3});
							}
							else if (data.error.message||null) log("Graph.fetchPosts: "+data.error.message,{level:3});

						} else 	log("Graph.fetchPostsFQL: response was unrecognized",{level:3});
						data=null;
				    	    } catch (e){log("Graph.fetchPostsFQL: response error: "+e+": "+response);}	
					} else log("Graph.fetchPostsFQL: response was empty",{level:3});
					if(req)req=null;
				}catch(e){log("Graph.fetchPostsFQL.onload: "+e);}},

				onabort: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPostsFQL: aborted: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPostsFQL.onabort: "+e);}},

				ontimeout: function(response) {try{
					//remove the memory that a request is out
					params.timeouts++;
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPostsFQL: timeout: retry="+(params.timeouts<3)+", "+response.responseText);
					if(req)req=null;
					
					if (params.timeouts<3) Graph.fetchPosts(params);
				}catch(e){log("Graph.fetchPostsFQL.ontimeout: "+e);}},

				onerror: function(response) {try{
					//remove the memory that a request is out
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPostsFQL: error: "+response.responseText);
					if(req)req=null;
				}catch(e){log("Graph.fetchPostsFQL.onerror: "+e);}}
			});		
		}catch(e){log("Graph.fetchPostsFQL: "+e);}},
		
		/* fetchPosts details:
			params = {
			 feed:<feed reference>, 
			 filter:<appID>, 
			 next:<url containing 'until'>, 
			 prev:<url containing 'since'>, 
			 callback:<where to ship the return data>, 
			 retries_noToken:<counter>, 
			 fetchQty:<number>,
			 specific:<specific range object>
			}
		*/
		
		fetchPosts: function(params){try{
			log("Graph.fetchPosts is deprecated. Use Graph.fetchPostsFQL.");
			return Graph.fetchPostsFQL(params);
		
		
			log("Graph.fetchPosts()",{level:1});
			params=params || {};
			params.timeouts=params.timeouts||0;
			
			var bypassMatchRequest = (params.range||null)?true:false;
			
			//remember the target position if this is a ranged search
			//the very first call we make is a "since" call, but all sequential calls are "until" calls due to FB's stupid pagination methods
			if (params.range||null){
				//log(params.range.since);
				if (params.range.since||null) params.targetUntil = params.range.since;
			}
			
			
			if (!Graph.authToken) {
				log("Graph.fetchPosts: no authToken, get one");
				params["retries_noToken"]=(params["retries_noToken"])?params["retries_noToken"]+1:1; //count retries
				if (params["retries_noToken"]<3) {
					Graph.requestAuthCodeB(function(){Graph.fetchPosts(params);} ); 
				} else {
					log("Graph.fetchPosts: cannot get new fb auth token",{level:3});
					return {getAuthTokenFailed:true};
				}
				return;
			}

			//check if there is a request already out with this fb id and matches the direction
			var r=Graph.matchRequest(params);
			if (!bypassMatchRequest) if (r!=-1){
				if (Graph.requests[r].next==null && Graph.requests[r].prev==null) {
					log("Graph.fetchPosts: the initial request for data has not been returned yet",{level:3});
					return {initRequestSlow:true};
				} else {
					log("Graph.fetchPosts: a request is already out for posts in that direction and has not returned",{level:3});
					return {requestAlreadyOut:true};
				}
			}

			//for each user specified feed source, get posts
			var feed=params.feed||null;
			var filter = (params.filter||"default");
			if (!(feed.filters[filter]||null)) feed.addFilter({id:filter}); //create filter instance if needed

			var URL=feed.url+"?date_format=U&limit="+((params.range||null)?250:params.fetchQty)+"&access_token="+Graph.authToken;
			
			//get older posts
			//verify that the feed "until" time does not violate olderLimit set by user
			if (params.next || ((params.range||null)?params.range.until||null:null) ){
				var until=(params.range||null)?params.range.until:feed.filters[filter].next.getUrlParam("until"); 
				//debug.print(["var until",until]);
				if (until||null){
					var limit=(params.limit||null); //this is not FB search limit keyword, this is a WM timelimit
					var timeNow=timeStamp();
					//no oldest post limit on range fetches
					if (params.range||null) limit=null;
					
					var fixTime = (until.length < 10)?(until+"000"):until;

					//debug.print(["var until:",until, until.length, fixTime])
					
					if (limit) {
						if ((timeNow-(fixTime)) > limit) {
							//log("Graph.fetchPosts("+params.feed.url+"): the user-set older limit of this feed has been reached",{level:2});
							return {olderLimitReached:true};
						}
					}
					URL+="&until="+fixTime;
				} else {
					log("Graph.fetchPosts("+params.feed.url+"): The previous result did not return pagination. Restarting fetching from current time.");
				}
			}
			//get newer posts
			//rules manager action fetchHours will be asking for a range staring at time X, so use range.since
			else if (params.prev || ((params.range||null)?params.range.since||null:null) ) {
				var since=(params.range||null)?params.range.since:feed.filters[filter].prev.getUrlParam("since");
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
							if (data.data.length) log("Graph.fetchPosts.onLoad: "+data.data.length+" posts received. Validating data...");
							else log("Graph.fetchPosts.onLoad: facebook returned an empty data set.");
							var gotMoreToDo=false;
							if ((params.targetUntil||null) && (data.data.length) && (data.paging.next)) {
								var lastPullOldestPost=data.paging.next.getUrlParam("until");
								//2013/9/7: known facebook limit maximum is 500, but we are fetching in 250's
								//have we maxed out AND is oldest returned post newer than what we asked for
								gotMoreToDo = (data.data.length>=250) && (lastPullOldestPost > params.targetUntil);
							}
							if (data.data.length) for (var i=data.data.length-1;i>=0;i--) {
								var post=data.data[i];

								Graph.validatePost({
									post:post,
									callback:params.callback||null,
									next:params.next
								});

							}
							if (gotMoreToDo) {
								log("Graph.fetchPosts.onload: was not able to get enough in one return, going back for more...");
								//clone the last set of params
								var newParams = mergeJSON(params);
								newParams.range={since:0,until:0}; //new instance to prevent byRef errors
								//update the range settings
								//newParams.range.since=data.paging.previous.getUrlParam("since");
								newParams.range.until=data.paging.next.getUrlParam("until");
								//log([params.range.since,newParams.range.since,newParams.range.until,timeStampNoMS()]);
								newParams.targetUntil = params.range.since; //remember the original passed oldest data to target
								//make the next request
								Graph.fetchPosts(newParams);
							}
							
							//start cleanup
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
								log("Graph.fetchPosts.onLoad: facebook failed to return pagination data.")
							}

						} else if (data.error||null) {
							//check for session expired
							if ((data.error.message||"").find("Session has expired")){
								//session expired, get a new token
								Graph.authToken="";
								params["retries_expToken"]=(params["retries_expToken"])?params["retries_expToken"]+1:1; //count retries
								if (params["retries_expToken"]<3) {
									Graph.requestAuthCodeB(function(){Graph.fetchPosts(params);} ); 
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
					params.timeouts++;
					var r = Graph.matchRequest(params);
					if (r!=-1) Graph.requests.remove(r);
					log("Graph.fetchPosts: timeout: retry="+(params.timeouts<3)+", "+response.responseText);
					if(req)req=null;
					
					if (params.timeouts<3) Graph.fetchPosts(params);
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