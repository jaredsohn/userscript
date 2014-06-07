// ==UserScript==
// @name           FB Wall Manager
// @namespace      FB Wall Manager
// @description    Manages Wall Posts for Various FB Games
// @include        http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_getResourceURL
// @version        3.1.4.1
// @copyright      Charlie Ewing except where noted
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://userscripts.org/scripts/source/128747.user.js
// @require        http://userscripts.org/scripts/source/150983.user.js
// @require        http://userscripts.org/scripts/source/152610.user.js
// @require        http://userscripts.org/scripts/source/150032.user.js
// @resource       IconSheet http://i.imgur.com/ZDBrkHI.png
// ==/UserScript==

// retired libraries
// @resource       IconSheet http://images.wikia.com/fbwm/images/c/c0/Images.png
// @require        http://userscripts.org/scripts/source/29910.user.js
// @require        http://userscripts.org/scripts/source/129006.user.js
// @resource       IconSheet http://i1181.photobucket.com/albums/x430/merricksdad/images.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// for testing only
// @include        file:///C:/FB-Wall-Manager/*

// retired autolike functions
// @include        /^https?:\/\/www\.facebook\.com\/.*\/posts\/.*/

// Based on script built by Joe Simmons in Farmville Wall Manager


(function() {
//***************************************************************************************************************************************
//***** Preload
//***************************************************************************************************************************************
	//dont run in iframes
	try {
		//this does not mean we are using GM's unsafe window
		var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
		if (unsafeWindow.frameElement != null) return;
	} catch(e) {log("preload: "+e);}

//***************************************************************************************************************************************
//***** Debug Object
//***************************************************************************************************************************************
	if (debug) {
		debug.init();
		if (debug.initialized) log("Debug Console Initialized");
	}

//***************************************************************************************************************************************
//***** Globals
//***************************************************************************************************************************************
	this.WallManager={	
		paused : false,
		fetchPaused : false,
		requestsOpen : 0,
		reqTO : 30000,
		newSidekicks : [],

		accDefaultText : "Got this!",
		failText : "Oh no! Sorry pardner!",
		overLimitText : "Limit reached!",

		version:"3.1.4.1",
		currentUser:{
			id:"",
			profile:"",
			alias:""
		},
		resources:{
			iconsURL:GM_getResourceURL("IconSheet")
		},
		apps:{},
		posts:{},
		history:{},
		config:null,
		opts:{},
		quickOpts:{},
		displayGroups:{},
		likeQueue:[],
		switches:{
			manualAuthToken:true
		},

		statusText : {
			"20":"Sidekick returned force accept",
			"3":"Marked as accepted by user",
			"2":"Responseless Collection",
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed",
			"-2":"None Left",
			"-3":"Over Limit (App)",
			"-4":"Over Limit, Sent One Anyway",
			"-5":"Server Error",
			"-6":"Already Got",
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link",
			"-9":"Final Request Returned Null Page",
			"-10":"Final Request Failure",
			"-11":"Expired",
			"-12":"Not a Neighbor",
			"-13":"Requirements not met",
			"-14":"Timeout",
			"-15":"Unrecognized Response",
			"-16":"Passback Link is missing",
			"-17":"Window Missing",
			"-18":"Marked as failed by user",
			"-20":"Sidekick returned force fail",
			
			"-19":"Over Limit (Bonus Type)",
			"-21":"Cancelled mid-process by user",
			
		},
		
		sortGroups : function(params){
			params=params||{};
			params.direction=(WM.quickOpts.groupDirection=(params.direction||WM.quickOpts.groupDirection||"desc")); //default descending to keep time ordered posts in order newest to oldest
			WM.saveQuickOpts();			
			
			//reorder the groups
			var groupsArray=[];
			for (var g in WM.displayGroups) {
				groupsArray.push({id:g,node:WM.displayGroups[g].parentNode,box:WM.displayGroups[g]});
			}
			
			if (["asc","ascending"].inArray(params.direction.toLowerCase())) groupsArray.sort(function(a,b){return a.id>b.id;});
			else if (["desc","descending"].inArray(params.direction.toLowerCase())) groupsArray.sort(function(a,b){return a.id<b.id;});
			
			WM.displayGroups={};
			for (var g=0; g<groupsArray.length; g++) {
				WM.displayGroups[groupsArray[g].id]=groupsArray[g].box;
				WM.console.feedNode.appendChild(groupsArray[g].node);
			}
		},

		newGroup : function(params){
			params=params||{};

			//prevent duplicates
			if (WM.displayGroups[params.by]||null) return WM.displayGroups[params.by];
			
			//create the nodes
			var box;
			var group=createElement("div",{className:"listItem"},[
				createElement("div",{className:"line", onclick:function(){
					//toggle rollout
					with (this.nextSibling) className=className.swapWordB((className.containsWord("collapsed")),"expanded","collapsed");
					with (this.firstChild.firstChild) className=className.swapWordB((className.containsWord("treeCollapse"+WM.opts.littleButtonSize)),"treeExpand"+WM.opts.littleButtonSize,"treeCollapse"+WM.opts.littleButtonSize);
				}},[
					createElement("div",{className:"littleButton",title:"Toggle Content"},[
						createElement("img",{className:"resourceIcon treeCollapse"+WM.opts.littleButtonSize}),
					]),
					createElement("label",{textContent:params.label||params.by})
				]),
				box=createElement("div",{className:"subsection rollout expanded"}),
			]);
						
			//add it to our group list
			WM.displayGroups[params.by]=box;
			
			WM.sortGroups();
			
			return box;
		},
		
		pauseCollecting : function(doPause){
			var isPaused;
			if (exists(doPause)) isPaused = (WM.paused = doPause);
			else isPaused=(WM.paused = !WM.paused);
			var btn=WM.console.pauseCollectButton;
			btn.className = btn.className.swapWordB(isPaused,"oddGreen","oddOrange");
			btn.title = (isPaused)?"Start Automatic Collection":"Pause Automatic Collection";
			var img = btn.childNodes[0];
			img.className = img.className.swapWordB(isPaused,"playRight24","stop24");
		},

		pauseFetching : function(doPause){
			var isPaused;
			if (exists(doPause)) isPaused = (WM.fetchPaused = doPause);
			else isPaused=(WM.fetchPaused = !WM.fetchPaused);
			var btn=WM.console.pauseFetchButton;
			btn.className = btn.className.swapWordB(isPaused,"oddGreen","oddOrange");
			btn.title = (isPaused)?"Start Automatic Fetching":"Pause Automatic Fetching";
		},

		clearGroups : function(params){
			//destroy previous groups
			for (var g in WM.displayGroups){
				remove(WM.displayGroups[g].parentNode); //kill the node
				delete WM.displayGroups[g]; //remove from list
			}
		},

		clearPosts : function(){
			//remove all post nodes from the collector panel
			for (var p in WM.posts){
				if (WM.posts[p].node) remove(WM.posts[p].node);
			}
		},
		
		constructGroups : function(params){
			params=params||{};
			//this specifically allows a null so we can remove grouping
			var by=exists(params.by)?params.by:WM.quickOpts.groupBy;
			//if nothing changed, just cancel
			if (by==WM.quickOpts.groupBy) return;
			
			//set the new group order
			WM.quickOpts.groupBy=by;
			WM.saveQuickOpts();
			
			WM.clearGroups();
		},
		
		sortPosts : function(params){
			params=params||{};
			params.direction=(WM.quickOpts.sortDirection=(params.direction||WM.quickOpts.sortDirection||"desc")); //default descending to keep time ordered posts in order newest to oldest
			params.by=(WM.quickOpts.sortBy=(exists(params.by)?params.by:(WM.quickOpts.sortBy||"created_time"))); //default by date
			WM.saveQuickOpts();

			//convert to array
			var postsArray=methodsToArray(WM.posts);

			//sort
			postsArray.sort(function(a,b){
				if (["ascending","asc"].inArray(params.direction.toLowerCase())) return a[params.by]>b[params.by];
				if (["descending","desc"].inArray(params.direction.toLowerCase())) return a[params.by]<b[params.by];
			});

			//convert back to object
			WM.posts=arrayToMethods(postsArray);
		},

		doWhichTestTree : function(post, testList, testData, custom) {try{
			//match post to an app
			var app=post.app;
			var synApp=app.synApp, w=null;

			for (var i=0,test;((test=testList[i]) && (w===null));i++) {

				//run only for tests that are not specifically disabled
				if (test.enabled===false) continue;
				
				//set find mode
				var findMode="auto";
			
				//finish constructing dynamic collection tests
				var ret = test.ret;
				if (custom) {
					if (!ret) ret = "dynamic"; //default to dynamic
					if (ret!="dynamic" && ret!="none" && ret!="exclude" && !ret.startsWith(synApp.appID)) ret=synApp.appID+ret; //add appID except to magic words
					findMode=test.findMode;
				}

			    //part to make dynamic collection tests work only if they are the correct appID
			    //also do not process disabled tests			    
				if (!custom || (custom && (!test.appID || (app.appID==test.appID)))){

					//if the test is not disabled (by test enabled both existing and being false)
					//OR if the test IS a dynamic test and the appID matches
					//OR if the test IS a dynamic test and no appID was supplied
					//then run the test

					//detect test type
					var testType=(test.search||null);
					var types=WM.grabber.methods;
					if (!testType) for (var tt=0,len=types.length; tt<len; tt++) {if (test[types[tt]]||"") {testType=types[tt];break;}}

					//select the type of data to use
					var src="";
					if (isArray(testType)){ //new search array format
						for (var t=0,tlen=testType.length;t<tlen;t++) src+=(testData[testType[t]]||"");
					}
					else src = (testData[testType]||""); //old test method like testType:text

					if (src){
						//begin processing this test
						var subTests=test.subTests, kids=test.kids, allowNone=false, subNumRange=test.subNumRange,text=(test.find||test[testType]||"");

						//process subtests array
						if (subTests && (findMode=="auto" || findMode=="subtests") && text) {
							for (var i2=0,subTest,found=false;((subTest=subTests[i2]) && (!found));i2++) {
								var testX = text.replace('{%1}',subTest).toLowerCase();

								//do a standard test with the replaced search string
								found=src.find(testX);

								//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
								w=(found)?ret.replace('{%1}',subTest.noSpaces().toLowerCase()):w;

								testX=null;
							}

						//process number array
						} else if (subNumRange && (findMode=="auto" || findMode=="subnumrange") && text){
							var start=parseInt(subNumRange.split(",")[0]), end=parseInt(subNumRange.split(",")[1]);
							for (var i2=start,found=false;((!found) && i2<=end);i2++)  {
								var testX = text.replace('{%1}',i2).toLowerCase();

								//do a standard test with the replaced search string
								found=src.find(testX);

								//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
								w=(found)?ret.replace('{%1}',i2):w;

								testX=null;
							}

						//process text array, process similar to subtests
						} else if (text && (findMode=="auto" || findMode=="basic") && (isArray(text))) {
							for (var i2=0,subTest,found=false;((subTest=text[i2]) && (!found));i2++) {
								var testX = subTest.toLowerCase();

								//do a standard test with the replaced search string
								found=src.find(testX);

								//return the same value no matter which element from the array is found
								w=(found)?ret:w;

								testX=null;
							}


						//process regex
						} else if (text && (test.regex||test.isRegex||null) ) {
							var mods = (test.mods||"gi");
							var testRegex = new RegExp(text,mods);
							var match=src.match(testRegex);
							if (match) match=match[0]; //always take the first match
							w=ret||match||w;



						//process single text
						} else if (text) {
							try{
								w=(src.find(text.toLowerCase() ))?ret:w;
							} catch(e){
								log("WM.doWhichTestTree:"+e);
								log("--app:"+app.appID);
								log("--test:"+JSON.stringify(test));
							}
						}

					}

					//see if test has type 2 subtests (child node tests based on parent test)
					w = ((kids && w)?WM.doWhichTestTree(post, kids, testData, custom):w) || w; //if kids return null, default to key found above

					//if this test tree returned "none", start over with next tree by replacing "none" with null
					//true "none" is handled in the which() function below
					if (w==="none") w=null;


				}//end custom checker
			}

			return w;
		}catch(e){log("WM.doWhichTestTree: "+e);}},

		which : function(post,params) {try{
			//prevent the rules manager from mistaking main as a post object
			if (!post) return;
			
			params=params||{};
			//match post to an app
			var w, app=post.app, synApp=app.synApp;

			//create various data for the tests to use
			if (!params.reid) post.testData = {
				title: (post.name||"undefined").toLowerCase(),
				msg: (post.message||"undefined").toLowerCase(),
				caption: (post.caption||"undefined").toLowerCase(),
				desc: (post.description||"undefined").toLowerCase(),
				link: (post.linkText||"undefined").toLowerCase(),
				url: Url.decode(post.linkHref).toLowerCase(),
				img: (post.picture||"undefined").toLowerCase(),
				fromName: post.fromName.toLowerCase(),
				fromID: post.fromID.toLowerCase(),
				targetName: "undefined", //","+post.getTargets("name").join(",").toLowerCase(),
				//targetID: "undefined", //","+post.getTargets("id").join(",").toLowerCase(),
				canvas: "undefined", //app.namespace.toLowerCase(),
				likeName: "undefined", //","+post.getLikes("name").join(",").toLowerCase(),
				likeID: "undefined", //","+post.getLikes("id").join(",").toLowerCase(),
				comments: "undefined", //post.getComments("message").join(" \n").toLowerCase(),
				commentorName: "undefined", //","+post.getComments("name").join(",").toLowerCase(),
				commentorID: "undefined", //","+post.getComments("id").join(",").toLowerCase(),
			};
			var testData=post.testData;

			//replacement for old options like body, either and html
			testData.body = testData.title+testData.caption+testData.desc;
			testData.either = testData.link+testData.body;
			testData.html = testData.fromID + testData.fromName + testData.targetID + testData.targetName + testData.message
				+ testData.href + testData.either + testData.img + testData.canvas + testData.likeID + testData.likeName
				+ testData.commentorID + testData.commentorName + testData.comments;

			var dynamicTests = WM.grabber.tests;

			//check user built dynamic tests first if enabled and told to run first
			if (WM.opts["dynamic"+app.appID] && WM.opts.dynamicFirst && dynamicTests) {
				w=WM.doWhichTestTree(post,dynamicTests, testData, true)||"none";
			}

			//process this game's tests if dynamic didn't already get one
			if (w=="none" || !w || w=="") {
				w=((tests=synApp.tests)?WM.doWhichTestTree(post,tests, testData):"none")||"none";
			}

			//check user built dynamic tests last if enabled and not told to run first
			if (w=="none" || !w || w=="") {
				if (WM.opts["dynamic"+app.appID] && !WM.opts.dynamicFirst && dynamicTests) {
					w=WM.doWhichTestTree(post,dynamicTests,testData, true)||"none";
				}
			}

			//switch to undefined collection if enabled
			w=(w==="none" && app.opts["doUnknown"])?"doUnknown":w;

			return w;
		}catch(e){log("WM.which: "+e);}},

		resetAccepted : function(params) {
			params=params||{};
			var ask=WM.opts.historyConfirmClear;
			if (params.noConfirm || !ask || (ask && confirm("Delete all history for this profile?"))){
				doAction(function(){
					WM.history={};
					setOpt('history_'+WM.currentUser.profile,'{}');
				});
			}
		},

		onWindowResize : function(){
			WM.resizeConsole();
		},
		
		onHeartbeat : function(){
			//affect rules at the base level
			WM.rulesManager.doEvent("onHeartbeat",{});
			
			//affect rules at the app level
			if (WM.opts.heartbeatAffectsApps) {
				for (var a in WM.apps) {
					(function(){
						WM.rulesManager.doEvent("onHeartbeat",WM.apps[a]);
					})();
				}
			}

			//affect rules at the post level
			if (WM.opts.heartbeatAffectsPosts) {
				for (var p in WM.posts) if (!WM.posts[p].isGhost) {
					(function(){
						WM.rulesManager.doEvent("onHeartbeat",WM.posts[p]);
					})();
				}
			}

			//affect rules at the rule level
			if (WM.opts.heartbeatAffectsRules) {
				for (var r=0; r<WM.rulesManager.rules.length; r++) {
					(function(){
						WM.rulesManager.doEvent("onHeartbeat",WM.rulesManager.rules[r]);
					})();
				}
			}

			//affect rules at the feed and feed filter levels
			if (WM.opts.heartbeatAffectsFeeds || WM.opts.heartbeatAffectsFeedFilters) {
				var feeds=WM.feedManager.feeds;
				for (var f=0,len=feeds.length; f<len; f++) {
					//do the feed
					if (WM.opts.heartbeatAffectsFeeds) (function(){
						WM.rulesManager.doEvent("onHeartbeat",feeds[f]);
					})();
					
					//do the feed filters
					if (WM.opts.heartbeatAffectsFeedFilters) {
						for (var ff in feeds[f].filters){
							(function(){
								WM.rulesManager.doEvent("onHeartbeat",feeds[f].filters[ff]);
							})();
						}
					}
				}
			}
			
			//check for new sidekick arrivals
			if (isArrayAndNotEmpty(WM.newSidekicks)) {
				while (WM.newSidekicks.length>0) {
					var app=WM.newSidekicks.shift();
					app.fetchPosts();
				}
			}
			
			//check for autolike queue contents
			var quePost = WM.checkAutoLikeQue();
			if (quePost) {
				//log([quePost.fn,quePost.post.id]);
				switch (quePost.fn) {
					case "like":quePost.post.like();break;
					case "comment":quePost.post.comment(quePost.say);break;
				}
			}
			
		},

		//this is for when the WM.config and globalConfig settings change
		onSave : function() {
			//recopy the settings array from WM.config
			WM.updateSettingsValues();

			//hide or show counters
			if (WM.opts.showcounters) WM.showCounters(); else WM.hideCounters();

			//update intervals
			WM.setIntervals();

			//set new user colors
			WM.setColors();
			
			//update config settings
			WM.changeConfigSettings();

			//update those settings we use as global variables
			WM.changeDebugSettings();
			
			//set console heights
			//WM.resizeConsole();
		},

		updateSettingsValues : function(){try{
			WM.opts = WM.config.values;
			
			//new: do this for each of the apps too
			for (var a in WM.apps) WM.apps[a].opts=WM.apps[a].config.values;
			
		}catch(e){"WM.updateSettingsValues: "+e}},

		getAccText: function(appID,w,past,status){
			var app=WM.apps[appID].synApp;
			//detect and use a status code message
			if (!(status>-1 || status==-4 || status==-6)) return WM.statusText[status];
			//or return a generic message based on post type
			else return (w=="dynamic")?"Dynamic Grab"+((past)?"bed":""):(((w.find("send")?"Sen"+((past)?"t":"d")+" ":w.find("wishlist")?"":"G"+((past?"o":"e"))+"t ") + (app.userDefinedTypes[w]||app.accText[w])) || ((past)?WM.accDefaultText:"Get Unknown") || ((w.startsWith(app.appID+"doUnknown"))?"Unknown":"") );
		},

		stopCollectionOf : function(w){
			for (var p in WM.posts) if (!WM.posts[p].isGhost && WM.posts[p].which==w) WM.posts[p].stopCollect();
		},

		startCollectionOf : function(w){
			for (var p in WM.posts) if (!WM.posts[p].isGhost && WM.posts[p].which==w) WM.posts[p].collect();
		},

		pauseByType : function(app,w){
			if (!isArray(w)) w=[w];
			//mark as paused all those posts not yet done
			for (var p in WM.posts) if (!WM.posts[p].isGhost && w.inArray(WM.posts[p].which)) WM.posts[p].pause();
			//store the paused type but dont save it
			var a=(app.parent||app);
			for (var i=0; i<w.length; i++) {
				var t=w[i];
				//add it to the array without making a duplicate
				if (!a.typesPaused.inArray(t)) {
					a.typesPaused.push(t);
					//add a visible node
					a.typesPausedNode.appendChild(
						a.pausedTypesListNodes[t]=createElement("div",{className:"line"},[
							createElement("span",{textContent:(a.userDefinedTypes[t]||a.accText[t])+" ("+t+") "}),
							createElement("div",{className:"littleButton oddGreen", title:"Unpause Type"},[
								createElement("img",{className:"resourceIcon playRight"+WM.opts.littleButtonSize,onclick:function(){
									WM.unPauseByType(a,t);
								}})
							])
						])
					);
				}
			}
		},

		unPauseByType : function(app,w){
			if (!isArray(w)) w=[w];
			//unpause all those posts not yet done
			for (var p in WM.posts) if (!WM.posts[p].isGhost && w.inArray(WM.posts[p].which)) WM.posts[p].unPause();
			//remove paused type from list but dont save it
			var a=(app.parent||app);
			for (var i=0; i<w.length; i++) {
				//remove the visible node
				remove (a.pausedTypesListNodes[w[i]]);
				//delete the visible node entry
				delete a.pausedTypesListNodes[w[i]];
				//remove it from the array
				a.typesPaused.removeByValue(w[i]);
			}
		},

		setAsAccepted : function(comment,status, post) {try{
			var app=post.app;
			var synApp=app.synApp;
			post.state="accepted";
			post.status=status;
			post.accept();

			WM.history[post.id]={status:status, date:timeStamp(), which:(post.which||"undefined").removePrefix(synApp.appID), appID:app.appID};
			setOptJSON('history_'+WM.currentUser.profile,WM.history);

			//do friend tracking
			if (WM.opts.useFriendTracker && WM.opts.trackAccepted){
				WM.friendTracker.trackStatus(post,true);
			}

			var postNode=post.node||$("post_"+post.id);
			if (postNode){
				var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});

				var text=WM.getAccText(synApp.appID,post.which,true,status);

				link.textContent = (comment || text || WM.statusText[status] || WM.accDefaultText);
				WM.updatePostStatus(post.id);
			}

			app.acceptCount++; 

			//perform the onAccepted event
			WM.rulesManager.doEvent("onAccepted",post);

			//try autolike
			try{
				if (WM.opts.useautolike && (WM.opts.autolikeall || WM.opts.autolikeaccepted || (WM.opts.autolikesent && (post.which||"undefined").startsWith("send")) )) {
					if (!WM.opts["nolike"+app.appID]){
						WM.queAutoLike(post);
						//post.like();
					}
				}
			} catch(e){log("setAsAccepted: autolike failed: "+e,{level:3});}
			//try autocomment
			
			try{
				if (WM.opts.useautocomment && (WM.opts.autolikeall || WM.opts.autolikeaccepted || (WM.opts.autolikesent && (post.which||"undefined").startsWith(synApp.appID+"send")) )) {
					if (!WM.opts["nolike"+app.appID]){
						//setTimeout(function(){post.comment();},100+(WM.opts.autolikedelay*1000));
						WM.queAutoComment(post,null);
					}
				}
			} catch(e){log("setAsAccepted: autocomment failed: "+e,{level:3});}
			
		}catch(e){log("WM.setAsAccepted: "+e);}},

		disableOpt : function(w,app){try{
			var targetConfig=(app||null)?app.config:WM.config;
			((app||null)?app.opts:WM.opts)[w]=false;
			targetConfig.set(w,false);
			targetConfig.save();
			debug.print([w,app,false]);
		}catch(e){log("WM.disableOpt: "+e);}},

		enableOpt : function(w,app){try{
			var targetConfig=(app||null)?app.config:WM.config;
			((app||null)?app.opts:WM.opts)[w]=true;
			targetConfig.set(w,true);
			targetConfig.save();
			debug.print([w,app,true]);
		}catch(e){log("WM.enableOpt: "+e);}},

		setOpt : function(w,v,app){try{
			var targetConfig=(app||null)?app.config:WM.config;
			((app||null)?app.opts:WM.opts)[w]=v;
			targetConfig.set(w,v);
			targetConfig.save();
			debug.print([w,app,v]);
		}catch(e){log("WM.setOpt: "+e);}},

		resetCounters : function(){try{
			for (var a in WM.apps) WM.apps[a].resetCounter();
		}catch(e){log("WM.resetCounters: "+e);}},

		setAsFailed : function(comment, status, post){try{
			var app=post.app;
			var synApp=app.synApp;
			var postNode=post.node||$("post_"+post.id);

			//special effects for timeout and cancelProcess
			if ((!WM.opts.failontimeout && status==-14) || status==-21) {
				post.state="timeout";
				post.timeout();
				if (status==-14) WM.rulesManager.doEvent("onTimeout",post);

			} else {
				post.state="failed";
				post.fail(); // don't pass true or it will loop here

				WM.history[post.id]={status:status, date:timeStamp(), which:(post.which||"undefined").removePrefix(synApp.appID), appID:app.appID};
				setOptJSON('history_'+WM.currentUser.profile,WM.history);
				
				WM.rulesManager.doEvent("onFailed",post);
			}
			post.status=status;

			//do friend tracking
			if (WM.opts.useFriendTracker && WM.opts.trackFailed){
				WM.friendTracker.trackStatus(post,false);
			}
			
			if (postNode) {
				var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
				if (link) {
					//I can see no reason the link should be missing, but since its been proven to fail, here is a patch
					link.textContent = (comment || WM.statusText[status] || WM.failText);
				}
				WM.updatePostStatus(post.id);
			}

			app.failCount++; 
			
			//try autolike
			try{
				if (WM.opts.useautolike && WM.opts.autolikeall) {
					if (!WM.opts["nolike"+app.appID]){
						WM.queAutoLike(post);
						//post.like();
						//setTimeout(function(){post.like();},100+(WM.opts.autolikedelay*1000));
					}
				}
			} catch(e){log("setAsFailed: autolike failed: "+e,{level:3});}
			//try autocomment
			
			try{
				if (WM.opts.useautocomment && WM.opts.autolikeall) {
					if (!WM.opts["nolike"+app.appID]){
						//setTimeout(function(){post.comment();},100+(WM.opts.autolikedelay*1000));
						WM.queAutoComment(post,null);
					}
				}
			} catch(e){log("setAsFailed: autocomment failed: "+e,{level:3});}
			
		}catch(e){log("WM.setAsFailed: "+e);}},

		setPriority : function(){
			var postNode=selectSingleNode(".//ancestor::*[starts-with(@id,'post_')]",{node:this});
			var id=postNode.id.replace("post_","");
			WM.posts[id]["priority"]=this.getAttribute("name");
			remove(postNode);
			WM.posts[id].draw();
		},

		clearURL : function(tab){
			WM.collector.close(tab);
			WM.requestsOpen--;
		},
		
		//constantly update sidekick channel data
		skChannel : {},
		
		fetchSidekickData : function(){try{
			if (WM) {
				var node=selectSingleNode("./div",{node:$("wmDataDump")});
				while (node){
					log("WM.fetchSidekickData: found "+JSON.parse(node.getAttribute("data-ft")));
					WM.skChannel=mergeJSON(WM.skChannel,JSON.parse(node.getAttribute("data-ft")));
					remove(node);
					node=selectSingleNode("./div",{node:$("wmDataDump")});
				}
				setTimeout(WM.fetchSidekickData,1000);
			}
		}catch(e){log("WM.fetchSidekickData: "+e);}},		
		
		//this is WM3's method of handling conversations with sidekicks
		onFrameLoad3 : function(tab){try{
			log("onFrameLoad3(): tab="+tab.id);
						
			var postID=tab.postID||tab.id;
			var post=tab.post||WM.posts[postID];

			//detect if post process was cancelled by user
			if (post.processCancelled){
				//reset the cancel memory
				post.processCancelled = false;
				log("onFrameLoad3: process cancelled by user");
				//set the timeout flag even though its not timed out
				WM.setAsFailed(null,-21,post);
				WM.clearURL(tab);
				return;
			}

			//detect if valid WM.collector window still exists
			var windowExists=(tab.hwnd && !tab.hwnd.closed);
			/*try{
				var testUrl=tab.hwnd.location.toString();
			} catch(e) {
				windowExists=false; 
			}*/
			
			//make sure the post object still exists
			if (!(post||null)){
				log("onFrameLoad3: post is null");
				WM.clearURL(tab);
				return;
			}

			//check if window object is missing
			if (!windowExists) {
				log("windowExists = false");
				if (!tab.hwnd) log("onFrameLoad3: tab.hwnd is null");
				if (tab.hwnd.closed) log("onFrameLoad3: tab.hwnd is closed");
				WM.setAsFailed(null,-17,post);
				WM.clearURL(tab);
				return;
			}
			
			//check timer on this open post
			var openTime=tab.openTime;
			var nowTime=timeStamp();
			if ((WM.opts.reqtimeout*1000)<(nowTime-openTime)){
				log("onFrameLoad3: post timed out");
				WM.setAsFailed(null,-14,post);
				WM.clearURL(tab);
				return;
			}
			
			//create the retry function
			var retry=function(){setTimeout(function(){WM.onFrameLoad3(tab); return;},1000); return;};
			
			//look for status data
			var tabID = tab.id;
			var skData = WM.skChannel[tabID]||null;
			if (skData) {
				//data exists for this post
				if (skData.status) {
					//status is available
					delete WM.skChannel[tabID];
					
					//get useful post data
					var app=post.app; var synApp=app.parent||app;
					var postNode=post.node||$("post_"+post.id);
					var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
					var w=post.which||"undefined";
					
					//confirm status
					var gotItem=((skData.status>0) || (skData.status==-6) || (skData.status==-4) || (skData.status==-15 && WM.opts.accepton15));
					var failedItem=(skData.status<0);
					
					if (gotItem){
						//build debug block
						switch(skData.status){
							case -6: case -4: case 1:
								// this bonus is available or we still have the ability to send something for no return
								//dont break before next
							case -15: case 2:
								if (!synApp.flags.requiresTwo){
									WM.setAsAccepted(null, skData.status, post);
								}
								break;

							default:
								//should not have come here for any reason, but if we did assume its a status code I didnt script for
								WM.setAsFailed(null, skData.status, post);
								log("onFrameLoad3: unexpected status code: "+skData.status,{level:2});
								break;
						}
					} else {
						WM.setAsFailed(null,skData.status,post);
					}
					
					// click "yes" to accept it, if we got this far we actually found an accept button
					if(synApp.flags.requiresTwo && gotItem) {
						if (skData.nopopLink) {
							var req; req=GM_xmlhttpRequest({
								method: "GET",
								url: skData.nopopLink,
								timeout: WM.opts.reqtimeout*1000,
								onload: function(response) {
									//search for error messages
									var test=response.responseText;
									if (test==""){
										//no text was found at requested href
										log("onFrameLoad3: final stage: null response",{level:2});
										WM.setAsFailed(null, -9,post);
									} else {
										//if no errors then we got it
										WM.setAsAccepted(null, skData.status,post);
									}
									WM.clearURL(tab);
									if(req)req=null;
								},

								onerror: function(response) {
									log("onFrameLoad3: final stage: error returned",{level:2});
									//if final request fails, drop the request for now
									WM.setAsFailed(null, -10,post);
									WM.clearURL(tab);
									if(req)req=null;
								},

								onabort: function(response) {
									log("onFrameLoad3: final stage: request aborted",{level:2});
									WM.setAsFailed(null, -10,post);
									WM.clearURL(tab);
									if(req)req=null;
								},
								ontimeout: function(response) {
									log("onFrameLoad3: final stage: request timeout",{level:2});
									WM.setAsFailed(null, -10,post);
									WM.clearURL(tab);
									if(req)req=null;
								},
							});

						} else {
							log("onFrameLoad3: skData.nopopLink is null and a string was expected",{level:3});
							WM.setAsFailed(null, -16,post);
							WM.clearURL(tab);
							return;
						}
					} else WM.clearURL(tab); //<- default page clearer, do not remove
				} else retry();
			} else {
				retry();
				//send the tab its init message (again)
				tab.hwnd.postMessage({
					channel:"WallManager",
					msg:1,
					tabID:tab.id,
				},"*");
				//log("useGM_openInTab: "+WM.opts.useGM_openInTab);
			}
			
		}catch(e){log("WM.onFrameLoad3: "+e);}},		
		
		//this is WM1-2's method of handling conversation with sidekicks
		//WM3 defaults to this if sidekick is not WM3 compatible
		onFrameLoad : function(tab,noDebug){try{
			//tab object contains {id,post,url}
			if (!noDebug) log("onFrameLoad()",{level:0});

			var id=tab.id; var post=tab.post||WM.posts[id];
			if (!(post||null)) {
				//resource deleted while post was out
				WM.clearURL(tab);
				return;
			}

			//detect if post process was cancelled by user
			if (post.processCancelled){
				//reset the cancel memory
				post.processCancelled = false;
				log("onFrameLoad3: process cancelled by user");
				//set the timeout flag even though its not timed out
				WM.setAsFailed(null,-21,post);
				WM.clearURL(tab);
				return;
			}

			var app=post.app;
			var synApp=app.parent||app;

			var httpsTrouble=synApp.flags.httpsTrouble;
			var responseLess=synApp.flags.skipResponse;

			var postNode=post.node||$("post_"+post.id);
			var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
			var w=post.which||"undefined";

			tab.tries=(tab.tries||0)+1;
			if (tab.tries>WM.opts.reqtimeout) {
				log("onFrameLoad: request timeout",{level:3});
				WM.setAsFailed(null, -14, post);
				WM.clearURL(tab);
				return;
			}

			var retry=function(){setTimeout(function(e){WM.onFrameLoad(tab, true);}, 1000);};

			var failedItem=false, gotItem=false, nopopLink;

			//check if window object is missing
			var windowExists=(tab.hwnd && !tab.hwnd.closed);
			if (!windowExists) {WM.setAsFailed(null,-17,post); WM.clearURL(tab); return;}
			//check if window document does not yet exist
			//if (!(tab.hwnd.document||null)) {retry(); return;}

			//get sidekick return value
			var hashMsg="",hashStatus=0;
			try{
				//if error encountered, reload the page
				if (tab.hwnd.document.title==="Problem loading page"){
					log("processPosts: problem loading page",{level:1});
					tab.hwnd.location.reload();
					retry();
					return;
				}

				var temphash = tab.hwnd.location.hash; //capture a hash if we can
				hashMsg = ((temphash)?temphash.removePrefix("#"):null) || tab.hwnd.location.href.split("#")[1];
				hashStatus=(responseLess)?2:(hashMsg||null)?parseInt(hashMsg.split('status=')[1].split("&")[0]):0;
				gotItem=((hashStatus>0) || (hashStatus==-6) || (hashStatus==-4) || (hashStatus==-15 && WM.opts.accepton15));
				failedItem=(hashStatus<0);
				if (!gotItem && !failedItem) {retry(); return;}

			} catch(e){
				var errText=""+e;
				if (errText.contains("hashMsg is undefined")) {
					//this known issue occurs when a page is not yet fully loaded and the
					//WM script tries to read the page content
					retry();
					return;
				}
				else if (errText.contains("Permission denied to access property")) {
					//we've reached some known cross domain issue
					if (responseLess) {
						//if the sidekick creator has chosen to use responseless collection
						//simply assume the page has loaded and mark the item as collected

						gotItem=true;failedItem=false;hashStatus=2;
					} else {
						console.log("WM.onFrameLoad(before retry): "+e);
						retry();
						return;
					}
				}
				else if (errText.contains("NS_ERROR_INVALID_POINTER")
					|| errText.contains("tab.hwnd.document is null") ) {

					WM.setAsFailed(null,-17,post);
					WM.clearURL(tab);
					return;
				}
				else {
					log("onFrameLoad: "+e,{level:3});
					retry();
					return;
				}
			}

			//if gotItem then we have been offered the item so far
			if (gotItem){
				//build debug block
		    		switch(hashStatus){
					case -6: case -4: case 1:
						// this bonus is available or we still have the ability to send something for no return
						if (synApp.flags.requiresTwo){
							try{
								nopopLink=hashMsg.split("&link=[")[1].split("]")[0];
							}catch(e){
								//known rare issue where no link is passed back by pioneer trail
							}
						}
						//dont break before next
					case -15: case 2:
						if (!synApp.flags.requiresTwo){
							WM.setAsAccepted(null, hashStatus,post);
						}
						break;

					default:
						//should not have come here for any reason, but if we did assume its a status code I didnt script for
						WM.setAsFailed(null, hashStatus,post);
						log("onFrameLoad: unexpected status code: "+hashStatus,{level:2});
						break;
		    		}
			} else {
				WM.setAsFailed(null,hashStatus,post);
			}


			// click "yes" to accept it, if we got this far we actually found an accept button
			if(synApp.flags.requiresTwo && gotItem) {
				if (nopopLink) {
					var req; req=GM_xmlhttpRequest({
						method: "GET",
						url: nopopLink,
						timeout: WM.opts.reqtimeout*1000,
						onload: function(response) {
							//search for error messages
							var test=response.responseText;
							if (test==""){
								//no text was found at requested href
								log("onFrameLoad: final stage: null response",{level:2});
								WM.setAsFailed(null, -9,post);
							} else {
								//if no errors then we got it
								WM.setAsAccepted(null, hashStatus,post);
							}
							WM.clearURL(tab);
							if(req)req=null;
						},

						onerror: function(response) {
							log("onFrameLoad: final stage: error returned",{level:2});
							//if final request fails, drop the request for now
							WM.setAsFailed(null, -10,post);
							WM.clearURL(tab);
							if(req)req=null;
						},

						onabort: function(response) {
							log("onFrameLoad: final stage: request aborted",{level:2});
							WM.setAsFailed(null, -10,post);
							WM.clearURL(tab);
							if(req)req=null;
						},
						ontimeout: function(response) {
							log("onFrameLoad: final stage: request timeout",{level:2});
							WM.setAsFailed(null, -10,post);
							WM.clearURL(tab);
							if(req)req=null;
						},
					});

				} else {
					log("onFrameLoad: nopopLink is null and a string was expected",{level:3});
					WM.setAsFailed(null, -16,post);
					WM.clearURL(tab);
					return;
				}
			} else WM.clearURL(tab);

		}catch(e){log("WM.onFrameLoad: "+e);}},

		toggle : function(opt,app){
			var targetConfig=(app||null)?app.config:WM.config;
			var targetOpts=(app||null)?app.opts:WM.opts;
			if (targetOpts[opt]){
				targetConfig.set(opt, false);
				targetOpts[opt] = false;
			} else {
				targetConfig.set(opt, true);
				targetOpts[opt] = true;
			}
               targetConfig.save();
		},

		getAppDropDownList : function(selectedIndex,allowBlank){
			var retApps=[];
			//add the fake initial option
			retApps.push(createElement("option",{textContent:"select an app",value:""}));
			retApps.push(createElement("option",{textContent:"* All",value:""}));
			if (allowBlank) retApps.push(createElement("option",{textContent:"all apps",value:""}));

			for(var i in WM.apps){
				if (!WM.apps[i].parent) {
					var elem = createElement("option",{textContent:WM.apps[i].name,value:i});
					if ((selectedIndex||null) == i) elem.selected = true;
					retApps.push(elem);
				}
			}
			return retApps;
		},

		getBonusDropDownList : function(params){
			params=params||{};
			var selected = params.selected||"";
			var appID = params.appID||null;
			var dropID = params.dropID||false; //force the element value to drop its appID prefix

			var optsret=[], bonuses={};
			if (appID) bonuses = mergeJSON(WM.apps[appID].accText,WM.apps[appID].userDefinedTypes);
			bonuses["dynamic"]="* Dynamic: Just Grab It";
			bonuses["none"]="* None: Break Identification Circuit";
			bonuses["wishlist"]="* Flag as Wishlist";
			bonuses["exclude"]="* Exclude: Prevent Collection";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";

			//create option values and names;
			for (var i in bonuses) {
				var elem
				if (appID) elem = createElement("option",{textContent:((i.startsWith(appID+"send"))?"Send ":((bonuses[i].substring(0,1)=="*")?"":"Get "))+bonuses[i],value:((dropID)?i.removePrefix(appID):i)});
				else elem = createElement("option",{textContent:bonuses[i],value:i});

				if (appID) {if (selected==((dropID)?i.removePrefix(appID):i) ) elem.selected = true;}
				else {if (selected==i) elem.selected=true;}

				optsret.push(elem);
			}

			return optsret;
		},

		reIDAll : function(){
			for (var p in WM.posts) {
				if (!WM.posts[p].isGhost && WM.posts[p].identify({reid:true}))
					WM.rulesManager.doEvent("onIdentify",WM.posts[p]);
			}
			WM.sortPosts(); //in this case sorting may cancel movetotop and movetobottom
			WM.clearGroups();
			WM.redrawPosts({postRedraw:true});
		},

		updatePostStatus : function(id){
			var status = WM.posts[id].status;
			var statusNode = selectSingleNode(".//*[contains(@class,'status')]",{node:$("post_"+id)});
			if (statusNode) statusNode.textContent="Status: "+(status||"0") + " " + (WM.statusText[status||"0"]);
			status=null; statusNode=null;
		},

		onLikePost : function(post){
			post.isLiked=true;
			return;
			
			//pre beta 40 stuff
			var postID=tab.id;
			var post=tab.post||WM.posts[postID];

			//detect if post process was cancelled by user
			if (post.processCancelled){
				//reset the cancel memory
				post.processCancelled = false;
				log("onLikePost: feedback cancelled by user");
				WM.collector.close(tab);
				return;
			}

			//detect if valid WM.collector window still exists
			var windowExists=(tab.hwnd && !tab.hwnd.closed);

			//check if window object is missing
			if (!windowExists) {
				log("onLikePost: tab.hwnd is null or closed");
				WM.collector.close(tab);
				return;
			}
			
			try{
				var like=tab.hwnd.location.hash.removePrefix("#").getUrlParam("status")=="1";
				if (like) {
					if (tab.post) {
						//tell the post it is liked
						tab.post.isLiked = true;
						//delete the post reference from the tab
						delete tab.post;
					}
					WM.collector.close(tab);
					return;
				}
			} catch (e){
				//log(""+e);
			}

			tab.tries=(tab.tries||0)+1;
			if (tab.tries<WM.opts.autoliketimeout) setTimeout(function(){WM.onLikePost(tab);}, 1000);
			else {
				log("onLikePost: unable to finish feedback",{level:3});
				doAction(function(){WM.collector.close(tab);});
			}
		},

		toggleSidekick : function(){
			var appID = this.id.split("master_")[1];
			var opt = !(WM.quickOpts["masterSwitch"][appID]||false); //toggle
			WM.quickOpts["masterSwitch"][appID]=opt;
			var className = this.parentNode.className;
			this.parentNode.className = ((opt)?className.removeWord("disabled"):className.addWord("disabled"));
			this.textContent=((opt)?"Disable":"Enable");
			WM.saveQuickOpts();
		},

		saveQuickOpts : function(){
			setOptJSON('quickopts_'+WM.currentUser.profile, WM.quickOpts);
		},

		setAppFilter : function(tab){
			WM.quickOpts.filterApp=tab.appFilter;
			WM.saveQuickOpts();
			WM.clearGroups();
			WM.redrawPosts({postRedraw:false,reorder:true});
			WM.rulesManager.doEvent("onSetAppFilter",WM.apps[tab.appFilter]);
			//debug.print(["Collection Tab Selected",WM.currentAppTab,WM.apps[tab.appFilter]]);
		},
		
		setDisplay : function(){
			var x=this.getAttribute("name");
			WM.quickOpts.displayMode=x;
			WM.saveQuickOpts();
			WM.redrawPosts({postRedraw:true,reorder:true});
			WM.setDisplayCols();
		},
		
		setDisplayCols : function(params){
			params=params||{};
			params.cols=params.cols||WM.quickOpts.displayCols;
			WM.quickOpts.displayCols=params.cols||1;
			WM.saveQuickOpts();
			with (WM.console.feedNode) {
				className=className
					.toggleWordB(params.cols==1,"singleCol")
					.toggleWordB(params.cols==2,"twoCol")
					.toggleWordB(params.cols==3,"threeCol")
					.toggleWordB(params.cols==4,"fourCol");
			}
		},

		redrawPosts : function(params){
			params=params||{};
			var feedNode=WM.console.feedNode;
			
			//set the proper display mode
			feedNode.className=feedNode.className
				.toggleWordB((WM.quickOpts.displayMode=="1" || WM.quickOpts.displayMode=="3"),"short");
			
			//avoid order issues by removing the posts from the panel
			WM.clearPosts();

			//redraw||reorder
			for (var p in WM.posts) {
				var post=WM.posts[p];
				if (!post.isGhost) {
					post.draw(params.postRedraw,params.reorder);
				}
			}
		},

		moveFloater : function(ev){
			if (isChrome) return;
			var img=this, offset=trueOffset(img), scrolled=trueScrollOffset(img),
				post=selectSingleNode(".//ancestor::div[starts-with(@id,'post')]",{node:img}),
				floater=$(post.id.replace("post","floater")), special={};

			//log( (scrolled.left) +","+ (scrolled.top) );

			special.x=(ev.clientX > (document.documentElement.clientWidth/2))?-(240+4+22):0; //width+overshot+BorderAndPadding
			special.y=(ev.clientY > (document.documentElement.clientHeight/2))?-(120+4+12):0;

			floater.style.left=(ev.clientX-(offset.left-scrolled.left))+(2+special.x)+"px";
			floater.style.top=(ev.clientY-(offset.top-scrolled.top))+(2+special.y)+"px";
		},
		
		//create a drip system for autolike, instead of an offset
		queAutoLike : function(post){
			var nowTime = timeStamp();
			var lastInQue = WM.likeQueue.last();
			var targetTime = nowTime + (1000*WM.opts.autolikedelay);
			if (lastInQue||null) {
				if (lastInQue.timer>nowTime) {
					targetTime = lastInQue.timer + (1000*WM.opts.autolikedelay);
				}
			}
			WM.likeQueue.push({post:post, timer:targetTime, fn:"like"});
			WM.console.likeQueueCounterNode.textContent = WM.likeQueue.length;
		},
		
		//create a drip system for autolike, instead of an offset
		queAutoComment : function(post,say){
			var nowTime = timeStamp();
			var lastInQue = WM.likeQueue.last();
			var targetTime = nowTime + (1000*WM.opts.autolikedelay);
			if (lastInQue||null) {
				if (lastInQue.timer>nowTime) {
					targetTime = lastInQue.timer + (1000*WM.opts.autolikedelay);
				}
			}
			WM.likeQueue.push({post:post, timer:targetTime, say:say, fn:"comment"});
			WM.console.likeQueueCounterNode.textContent = WM.likeQueue.length;
			//log(["autocomment added",say]);
		},		

		//dump the autolike queue
		emptyAutoLikeQue : function() {
			WM.likeQueue=[];
			WM.console.likeQueueCounterNode.textContent = 0;
		},
		
		//get the next ready autolike target
		checkAutoLikeQue : function() {
			if (WM.likeQueue.length<1) return null;
			var nowTime = timeStamp();
			if (WM.likeQueue[0].timer<=nowTime) {
				WM.console.likeQueueCounterNode.textContent = (WM.likeQueue.length-1);
				var t=nowTime;
				for (var i in WM.likeQueue) {
					i.timer = t;
					t+=(1000*WM.opts.autolikedelay);
				}
				return WM.likeQueue.shift(); // no longer returns the post, but the block of what to do with what post
			}
			return null;
		},

		processPosts : function(){
			//dont run if menu is open or if requests are still out or if the console is paused
			if($("Config") || (WM.requestsOpen >= WM.opts.maxrequests) || WM.paused) return;

			var postNode=selectSingleNode(".//div[starts-with(@id,'post_') and contains(@class,'collect') and not(contains(@class,'paused') or contains(@class,'working'))]",{node:WM.console.feedNode});
			if (postNode) {
				var post = WM.posts[postNode.id.replace('post_','')];
				if (post) post.open();
			}
		},

		olderPosts : function (params) {
			WM.fetch({older:true});
		},

		newerPosts : function (params) {
			WM.fetch({newer:true});
		},
		
		fetchRange : function (params) {
			WM.fetch({bypassPause:true, older:true, targetEdge:params.oldedge, currentEdge:params.newedge});
		},

		cleanPosts : function () {try{
			for (var p in WM.posts) if (!WM.posts[p].isGhost) {
				var post = WM.posts[p];
				with (post) if (!(
					isPinned || isCollect || isWorking ||
					(isTimeout && !WM.opts.cleanTimedOut)
				)) post.remove();
			}
		}catch(e){log("WM.cleanPosts(): "+e);}},
		
		setIntervals : function() {try{
			//setup the timer to get new posts
			if (procIntv) window.clearInterval(procIntv);
			procIntv=window.setInterval(WM.processPosts, 2000);

			//setup the timer to get new posts
			if (newIntv) window.clearInterval(newIntv);
			if(calcTime(WM.opts.newinterval)>0) newIntv=window.setInterval(WM.newerPosts, calcTime(WM.opts.newinterval));

			//setup the timer to get older posts
			if (oldIntv) window.clearInterval(oldIntv);
			if(calcTime(WM.opts.oldinterval)>0) oldIntv=window.setInterval(WM.olderPosts, calcTime(WM.opts.oldinterval)+2000);
			olderLimit=calcTime(WM.opts.maxinterval)||0;

			//setup the timer to clean up old posts from the feed
			if (cleanIntv) window.clearInterval(cleanIntv);
			if(calcTime(WM.opts.cleaninterval)>0) cleanIntv=window.setInterval(WM.cleanPosts, calcTime(WM.opts.cleaninterval)+250);

			//setup global heartbeat
			if (hbIntv) window.clearInterval(hbIntv);
			hbIntv=window.setInterval(WM.onHeartbeat, WM.opts.heartRate);
			
		}catch(e){log("WM.setIntervals: "+e);}},

		hideCounters : function(){try{
			hideNodes("//*[contains(@class,'accFailBlock')]");
		}catch(e){log("WM.hideCounters: "+e);}},

		showCounters : function(){try{
			showNodes("//*[contains(@class,'accFailBlock')]");
		}catch(e){log("WM.showCounters: "+e);}},

		validatePost : function(fbPost){try{
			//validate required post fields
			/*if (!( exists(fbPost.application) && exists(fbPost.link) && fbPost.type=="link")) {
				return;
			}*/

			//accept only posts we have sidekicks for
			var app;
			if (!exists(app=WM.apps[fbPost.app_id])) return;
			
			//prevent redrawing same post in case one slips past the graph validator
			var postID=fbPost.post_id;
			if (WM.posts[postID]||null) return;

			//accept only posts for which a sidekick is enabled
			if (!WM.quickOpts.masterSwitch[app.appID]) return;

			//create a Post object from the post data
			var post=(WM.posts[fbPost]=new WM.Post(fbPost));
			if (post) {
				var hasID=post.identify();
				WM.sortPosts(); //make sure new posts fit the current sort order and direction
				if (hasID) {
					WM.rulesManager.doEvent("onValidate",post);
					WM.rulesManager.doEvent("onIdentify",post);
					post.draw(true,true);
					
					//track the post
					if (WM.opts.useFriendTracker && !post.isMyPost){
						WM.friendTracker.track(post);
					}
				}
			} else {
				log("WM.validatePost: Unable to transform post data into a useful post object. (id:"+fbPost.post_id+")");
			}
		}catch(e){log("WM.validatePost: "+e);}},

		handleEdges : function(params){
			/*
				apps
				friends
				edge:{newer,older}
			*/
			//console.log("handleEdges: "+JSON.stringify(params));
			
			if (params.friends||null) {
				//update user created feeds
				for (var f=0,l=WM.feedManager.feeds.length;f<l;f++){
					var feed = WM.feedManager.feeds[f];
					//if this feed is listed in those passed back...
					if (params.friends.contains(feed.id)){
						//update each app filter in this feed
						for (var c=0,l=params.apps.length;c<l;c++) {
							var appID=params.apps[c];
							filter = feed.filters["app_"+appID];
							if (!(filter||null)) {
								//this filter does not exist, create one
								filter=feed.addFilter({id:"app_"+appID});
							}
							if (params.edge.older) filter.oldedge = params.edge.older;
							if (params.edge.newer) filter.newedge = params.edge.newer;
							filter.oldedgeNode.textContent = filter.oldedge;
							filter.newedgeNode.textContent = filter.newedge;
							if (timeStamp()-(filter.oldedge*1000)>olderLimit) filter.olderLimitReached=true;
						}
					}
				}
			} else {
				//update base feed
				feed = WM.feedManager.feeds[0];
				for (var c=0,l=params.apps.length;c<l;c++) {
					var appID=params.apps[c];
					//update each app filter in this feed
					filter = feed.filters["app_"+appID];
					if (!(filter||null)) {
						//this filter does not exist, create one
						filter=feed.addFilter({id:"app_"+appID});
					}
					if (params.edge.older) filter.oldedge = params.edge.older;
					if (params.edge.newer) filter.newedge = params.edge.newer;
					filter.oldedgeNode.textContent = filter.oldedge;
					filter.newedgeNode.textContent = filter.newedge;
					if (timeStamp()-(filter.oldedge*1000)>olderLimit) filter.olderLimitReached=true;
				}					
			}
		},
				
		fetch : function(params) {try{
			/*
				older:bool
				newer:bool
				apps:[]
				feed:[]
				targetEdge:unixtime
				currentEdge:unixtime
				bypassPause:bool
				bypassFeedDisabled:bool
				bypassAppDisabled:bool
			*/
		
			params=params||{};
			if (WM.fetchPaused && !params.bypassPause) return;

			//convert a single passed app to a single entry list
			if (exists(params.apps) && ((params.apps.objType||null)=="app")) {
				var ret={};
				ret[params.apps.appID]=params.apps;
				params.apps=ret;
			}
			
			var useApps = params.apps||WM.apps;

			//convert a single passed feed to an array
			if (exists(params.feeds) && ((params.feeds.objType||null)=="feed")) {
				params.feeds=[params.feeds];
			}
			params.currentEdge = params.currentEdge||null; //nullify undefined edge
						
			//for each feed individually
			var feeds=params.feeds||WM.feedManager.feeds;
			for (var f=0,len=feeds.length;f<len;f++) { 
				var feed=feeds[f];
				var friend=(feed.url!="https://graph.facebook.com/me/home")?[feed.id]:null;
				
				//ignore the old me feed because it is a duplicate of the wall feed
				if (feed.url!="https://graph.facebook.com/me/feed") if (feed.enabled || params.bypassFeedDisabled) {
								
					//for each app make a separate fetch call for the given feed
					if (!WM.opts.groupFetching && (useApps||null)) {
						for (var a in useApps) {
							var app=useApps[a];
							
							//only fetch for enabled apps
							//where we are fetching new
							//or if we are fetching old we are not at our older limit
							var feedFilter=feed.filters["app_"+a];
							if ((app.enabled || params.bypassAppDisabled) && (feedFilter.enabled || params.bypassFilterDisabled) && !(
									params.older && feedFilter.olderLimitReached
								)
							){
								var G=Graph.fetchPostsFQL_B({
									callback:WM.validatePost,
									direction:(params.newer?1:(params.older?-1:0)),
									limit:WM.opts.fetchQty,
									targetEdge:(params.targetEdge||null), //special for new rules manager actions
									friends:friend,
									apps:[app.appID],
									currentEdge:params.currentEdge||(params.newer?feedFilter.newedge:(params.older?feedFilter.oldedge:null)),
									edgeHandler:WM.handleEdges,
									noAppFiltering:WM.opts.noAppFiltering
									
								});								
							}
						}
						
						
					//join apps together before fetching a single time for the given feed
					} else {
						//get the keys of the apps collection
						var keys=Object.keys(useApps);
						//if any sidekicks are docked
						if (keys.length) {
							//get the values of the apps collection
							var appsToProcess=keys.map(function (key) {
								return useApps[key];
							//filter out which apps are able to be fetched for
							}).filter(function(o,i,p){
								//get the feed filter text
								var feedFilter=feed.filters["app_"+o.appID];
								//get if the app is enabled
								var isEnabled = (o.enabled || params.bypassAppDisabled);
								var isFilterEnabled=true,isOlderLimitReached=false; 
								if (feedFilter||null) {
									//get if the feed filter is enabled
									isFilterEnabled = (feedFilter.enabled || params.bypassFilterDisabled);
									//get if the feed filter has already reached its older edge limit
									isOlderLimitReached = (params.older && feedFilter.olderLimitReached);
								} else {
									//feed filter does not exist for this app
									//assume it was deleted by the user on purpose
									//and don't fetch for this app on this feed
									log("WM.fetch: could not find filter for " + o.appID + "in feed " + feed.id);
									return false;
								}
								if (isEnabled && isFilterEnabled && !isOlderLimitReached) return true;
								return false;
							//simply the array
							}).map(function(o,i,p){
								//just get the id's of apps to do, not the entire app object
								return o.appID;
							});
							
							//make sure we matched filters to process
							if (appsToProcess.length){
								//get the shared edges of the passed apps
								var edges = feed.getMergedEdges({apps:appsToProcess});
								//console.log("getMergedEdges returned: "+JSON.stringify(edges));
								
								var G=Graph.fetchPostsFQL_B({
									callback:WM.validatePost,
									direction:(params.newer?1:(params.older?-1:0)),
									limit:WM.opts.fetchQty,
									targetEdge:(params.targetEdge||null), //special for new rules manager actions
									friends:friend,
									apps:appsToProcess,
									currentEdge:params.currentEdge||(params.newer?edges.newedge:(params.older?edges.oldedge:null)),
									edgeHandler:WM.handleEdges,
									noAppFiltering:WM.opts.noAppFiltering
								});
							}
						}
					}
					
					
				}
			}
		}catch(e){log("WM.fetch: "+e);}},
		
		changeDebugSettings : function(){try{
			if (debug && debug.initialized) {
				debug.doDebug = WM.opts.debug;
				debug.debugLevel = parseInt(WM.opts.debugLevel);
				debug.debugMaxComments = WM.opts.debugMaxComments;
				debug.useScrollIntoView = WM.opts.debugScrollIntoView;
				debug.stackRepeats = WM.opts.debugStackRepeats;
			} else {
				if (debug) debug.init();
				setTimeout(WM.changeDebugSettings,1000);
			}
		}catch(e){log("WM.changeDebugSettings: "+e);}},
				
		changeConfigSettings : function(){try{
			WM.config.sectionsAsTabs=WM.opts.configSectionsAsTabs;
			WM.config.separatorsAsTabs=WM.opts.configSeparatorsAsTabs;
			WM.config.useScrollIntoView=WM.opts.configScrollIntoView;
			WM.config.confirms={
				save:WM.opts.configConfirmSave,
				cancel:WM.opts.configConfirmCancel,
				"import":WM.opts.configConfirmImport,
				restore:WM.opts.configConfirmRestore
			};
		}catch(e){log("WM.changeConfigSettings: "+e);}},

		resizeConsole : function(){try{
			//negotiate height with fb bluebar
			var node=$("pagelet_bluebar");
			var h=(node)?elementOuterHeight(node):0;
			
			with($("wmContent")){
				style.height=document.documentElement.offsetHeight-h+"px";
				style.width=document.documentElement.offsetWidth+"px";
			}
			WM.console.tabContainer.redraw();
			WM.console.collectTabControl.redraw();

		}catch(e){log("WM.resizeConsole: "+e);}},

		setColors : function(){try{
			var colors=["excluded","working","timeout","paused","nodef","failed","accepted","scam","pinned"];
			var css="";
			for (var c=0, color; (color=colors[c]); c++) {
				css+=("div."+color+"{background-color:"+WM.opts["colors"+color]+" !important;}\n");
			}
			//set the new transition delay timer
			css+=(".wm.post.short:hover .floater {-moz-transition-property: padding,border,width,height;-moz-transition-delay:"+WM.opts["transitiondelay"]+"s; width:240px; padding:5px 10px;border:1px solid;}\n");
			remove($("user_colors_css"));
			addGlobalStyle(css,"user_colors_css");
		}catch(e){log("WM.setColors: "+e);}},

		initConsole : function(){try{
			WM.console.loading=false;
			if (WM.console.initialized) log("WM Console Initialized");

			//show options menu button
			with (WM.console.configButton) {
				className = className.removeWord("jsfHidden");
			}

			//set console heights
			WM.resizeConsole();

			//load feed sources
			WM.feedManager.init();
			
			//import friend tracker data
			//and delete posts out of bounds with our "track for how many days"
			WM.friendTracker.init();
			WM.friendTracker.clean();

			//initialize user colors
			WM.setColors();
			
			//set up the priorities and limits object
			//and new rules manager
			WM.rulesManager.init();

			//decipher the dynamic tests
			WM.grabber.init();

			//show counters
			if (WM.opts.showcounters) WM.showCounters(); else WM.hideCounters();
			
			//set intervals
			WM.setIntervals();
			
			//set autopause
			if (WM.opts.autopausecollect) WM.pauseCollecting(true);
			if (WM.opts.autopausefetch) WM.pauseFetching(true);
			
			//open a channel for sidekick communication
			WM.fetchSidekickData();

			//add an entrypoint for sidekicks since we know FB gave us access
			var createDock = function(){
				document.body.appendChild(
					createElement('div',{id:'wmDock',style:'display:none;',onclick:function(){
						WM.dock.answerDockingDoor();
					}})
				);
				document.body.appendChild(
					createElement('div',{id:'wmDataDump',style:'display:none;'})
				);
			};
			
			createDock();			

		}catch(e){log("WM.initConsole: "+e);}},

		cleanHistory : function(params){try{
			log("Cleaning History");
			params=params||{};
			var ask=WM.opts.historyConfirmClean;
			if (params.noConfirm || !ask || (ask && confirm("Clean and pack history for this profile?"))){
				//history = getOptJSON("history_"+WM.currentUser.profile)||{};
				var ageDays=parseInt(WM.opts.itemage);
				var timeNow=timeStamp();
				for(var i in WM.history) {
					if( ( (timeNow-WM.history[i].date) /day) > ageDays) {
						delete WM.history[i];
					}
				}
				setOptJSON("history_"+WM.currentUser.profile, WM.history);
			}
		}catch(e){log("WM.cleanHistory: "+e);}},

		optionsSetup : function(){try{
			debug.print("WM.optionsSetup:");

			//create the settings tree
			WM.config = new Config({
				storageName:"settings_"+(WM.quickOpts.useGlobalSettings?"global":WM.currentUser.profile),
				onSave:WM.onSave,
				title:"FB Wall Manager "+WM.version+(WM.quickOpts.useGlobalSettings?" (!! Global Settings !!)":""),
				logo:createElement("span",{}[
					createElement("img",{className:"logo",src:"",textContent:"v"+WM.version}),
					createElement("text","v"+WM.version)
				]),
				css:(
					WM.console.dynamicIcons()+
					jsForms.globalStyle()
				),
				settings:{
					btn_useGlobal:{
						type:"button",
						label:"Use Global Settings", 
						title:"Switch to using a global storage for settings. Those settings can then be used by other accounts (not browser profiles).",
						script:function(){
							if (WM.quickOpts.useGlobalSettings||false) {
								//already using global settings
								return;
							}
							if (confirm("Switch to using global (shared) settings?")){
								WM.quickOpts.useGlobalSettings=true;
								WM.saveQuickOpts();
								WM.config.title = "FB Wall Manager "+WM.version+" (!! Global Settings !!))";
								WM.config.storageName = "settings_global";
								WM.config.values=WM.config.read();
								WM.config.configure();
								WM.config.reload();
							}
						},
					},
					btn_useOwnProfile:{
						type:"button",
						label:"Use Profile Settings", 
						title:"Switch to using your own profile storage for settings.",
						script:function(){
							if (!(WM.quickOpts.useGlobalSettings||false)) {
								//already using profile settings
								return;
							}
							if (confirm("Switch to using your own profile settings?")){
								WM.quickOpts.useGlobalSettings=false;
								WM.saveQuickOpts();
								WM.config.title = "FB Wall Manager "+WM.version;
								WM.config.storageName = "settings_"+WM.currentUser.profile;
								WM.config.values=WM.config.read();
								WM.config.configure();
								WM.config.reload();
							}
						},
					},
				
					wmtab_opts:tabSection("Host Options",{
					
						section_basicopts:section("Basics",{
							/*authTokenTools:optionBlock("Authorization",{
								devAuthToken:checkBox("Automatically check my developer tool app for my Auth Token"),									
							},true),*/
						
							intervals:optionBlock("Post Fetching",{								
								newinterval:{
									label:"Get Newer Posts Interval",
									type:"selecttime",
									title:"Fetch new posts from facebook after a set time.",
									options:{
										"off":"Off",
										"tenth":"6 seconds",
										"sixth":"10 seconds",
										"half":"30 seconds",
										"one":"1 minute",
										"two":"2 minutes",
										"three":"3 minutes",
										"four":"4 minutes",
										"five":"5 minutes",
										"ten":"10 minutes",
									},
									"default":"t:30s"
								},

								fetchQty:{
									label:"Fetch how many? (subject to filtering)",
									type:"select",
									title:"Posts fetched per request. Higher numbers affect speed of fetching.",
									options:{
										"5":"5",
										"10":"10",
										"25":"25",
										"50":"50",
										"100":"100",
										"250":"250",
										"500":"500 (FB maximum)", //known maximum fetch as of 9/8/2013
									},
									"default":"25"
								},

								oldinterval:{
									label:"Get Older Posts Interval",
									type:"selecttime",
									title:"Fetch previous posts from facebook after a set time.",
									options:{
										"off":"Off",
										"tenth":"6 seconds",
										"sixth":"10 seconds",
										"half":"30 seconds",
										"one":"1 minute",
										"two":"2 minutes",
										"three":"3 minutes",
										"four":"4 minutes",
										"five":"5 minutes",
										"ten":"10 minutes",
									},
									"default":"off"
								},

								maxinterval:{
									label:"How old is too old?",
									type:"selecttime",
									title:"Tell WM what you think is a good max post age to fetch. Also affects which posts are considered 'stale'.",
									options:{
										"off":"Off/Infinite",
										"hour":"1",
										"2hour":"2",
										"3hour":"3",
										"4hour":"4",
										"8hour":"8",
										"12hour":"12",
										"18hour":"18",
										"24hour":"24",
										"32hour":"32",
										"48hour":"48",
									},
									"default":"t:1d"
								},

								groupFetching:checkBox("All installed sidekicks in one request (default: one request per sidekick)",false,{},true),
								noAppFiltering:checkBox("Have WM filter posts for you instead of having facebook do it (may prevent some empty data set issues)",false,{},true),
							},true),

							autoPauseBlock:optionBlock("Fetching/Collecting Autopause",{
								autopausefetch:checkBox("Pause Fetching after First Fetch"),
								autopausecollect:checkBox("Pause Collection on Startup"),
							},true),

							multiTaskBlock:optionBlock("Multi-task",{
								maxrequests:inputBox("Max requests simultaneously",1),
								recycletabs:inputBox("Recycle Windows/Tabs",1),
								recycletabsall:checkBox("Recycle All",true),
							},true),

							queBlock:optionBlock("Task-Queue",{
								queuetabs:checkBox("Force all posts and autolikes through one tab using a queue (overrides multi-task)",true),
							},true),

							timeoutBlock:optionBlock("Time-outs",{
								reqtimeout:inputBox("Item Acceptance Page Timeout (seconds)",30),
								failontimeout:checkBox("Mark Timeout as Failure (default: retry indefinitely)"),
							},true),
						}),

						section_access:section("Accessibility",{
							shortModeBlock:optionBlock("Short Mode",{
								thumbsize:{
									label:"Thumbnail Size",
									type:"select",
									title:"Size of bonus thumbnails in display mode: short and .",
									options:{
										"mosquito":"16px",
										"tiny":"24px",
										"small":"32px",
										"medium":"48px",
										"large":"64px",
										"xlarge":"96px",
									},
									"default":"medium"
								},
								transitiondelay:inputBox("Hover Box Delay (s)",1),
							},true),

							accessTweaksBlock:optionBlock("Tweaks",{
								debugrecog:checkBox("Show Identified Text (instead of original link text)",true),
								showcounters:checkBox("Show Accept/Fail Counts",true),
								showdynamictips:checkBox("Show Dynamic Console Tips",true),
								appsConfirmDeleteUDT:checkBox("Confirm Delete User Defined Types",true),
							},true),

							toolBoxBlock:optionBlock("Customize Post Toolbox",{
								showtoolbox:checkBox("Enable ToolBox", true),

								showopen:checkBox("Open Post",true),
								showmarkfailed:checkBox("Mark As Failed",true),
								showmarkaccepted:checkBox("Mark As Accepted",true),
								showlike:checkBox("Like Post",true),
								showreid:checkBox("Re-ID Post",true),
								showmovetop:checkBox("Move to Top",true),
								showmovebottom:checkBox("Move to Bottom",true),
								showpin:checkBox("Pin Post",true),
								showclean:checkBox("Clean Post",true),
								showpostsrc:checkBox("Show Post Source",true),

								//new stuff
								showcancelprocess:checkBox("Cancel Process or Like",true),
								showrestartprocess:checkBox("Restart Process or Like",true),
								showpausetype:checkBox("Pause Bonus Type",true),
								showunpausetype:checkBox("Unpause Bonus Type",true),
								showaddfeed:checkBox("Add To Feeds",true),

								showmakerule:checkBox("Rule From Post",true),
								showoriginaldata:checkBox("Show Original Data",true),
								showautocomment:checkBox("Auto Comment",true),
								
							},true),
							
							littleToolBoxBlock:optionBlock("Customize Mini Toolbox",{
								littleButtonSize:{
									label:"Mini Toolbutton Size (requires refresh to redraw)",
									type:"select",
									title:"Size of buttons on mini toolbars",
									options:{
										"16":"16px",
										"24":"24px",
										"32":"32px",
									},
									"default":"24",
								},
							},true),

							userColorsBlock:optionBlock("Colors",{
								colorsaccepted:colorBox("Accepted","limegreen"),
								colorsfailed:colorBox("Failed","red"),
								colorsworking:colorBox("Working","yellow"),
								colorsexcluded:colorBox("Excluded","gray"),
								colorspaused:colorBox("Paused","silver"),
								colorsnodef:colorBox("No Definition","deepskyblue"),
								colorsscam:colorBox("Potential Scam","purple"),
								colorspinned:colorBox("Pinned","black"),
								colorstimeout:colorBox("Timeout","orange"),
							},true),
							

						}),

						section_feedback:section("Feedback",{
							publishwarning:{type:"message",title:"Autolike has changed",textContent:"As of WM beta 40 you must allow 'publish_actions' on the 'user data permissions' tab in your Graph API Explorer token builder.",newitem:true},
							gotoapiexplorer:anchor("Visit API Explorer","http://developers.facebook.com/tools/explorer"),
							autoSetup:optionBlock("Setup",{
								useautocomment:checkBox("Use Auto-comment (experimental)"),
								useautolike:checkBox("Use Auto-like"),
								//autoliketimeout:inputBox("Timeout (seconds)",30),
								autolikedelay:inputBox("Ban-Prevention Delay (seconds)",3),
							},true),
							autoLikeBlock:optionBlock("Perform Feedback For",{
								autolikeall:checkBox("All Posts"),
								autolikeaccepted:checkBox("Accepted Posts"),
								autolikesent:checkBox("Sent Posts"),
							},true),
							autoCommentListBlock:optionBlock("Comments (experimental)",{
								autocommentlist:textArea("Random Comments (One per line)","Thanks\nThank you\nthanks"),
							},true),
							blockautolikebygame:optionBlock("Block Feedback by Game",{},false),
						}),

						section_filters:section("Filters",{
							displayfilters:optionBlock("Remove Feed Parts (Classic Mode Only)",{
								hideimages:checkBox("Images (All)"),
								hideimagesunwanted:checkBox("Images (Unwanted Posts)"),
								hidebody:checkBox("Post Body Text"),
								hidevia:checkBox("Via App"),
								hidedate:checkBox("Date/Time"),
							},true),

							filters:optionBlock("Hide By Type",{
								hidemyposts:checkBox("My Posts"),
								hideunwanted:checkBox("Unwanted"),
								hideaccepted:checkBox("Accepted"),
								hidefailed:checkBox("Failed"),
								hidescams:checkBox("Scams"),
								hidestale:checkBox("Stale Posts"),
								hideexcluded:checkBox("Excluded"),
								hideliked:checkBox("Liked By Me"),
								hideunsupported:checkBox("Unsupported Apps"),

								donthidewishlists:checkBox("Don't Hide Known Wish Lists"),
							}),

							//allow hiding all posts by particular games
							filterapps:optionBlock("Hide By App",{}),

							//now added dynamically as appID+"dontsteal"
							dontstealBlock:optionBlock("Don't take W2W posts not for me",{}),

							skipopts:optionBlock("Skip By Type",{
								skipliked:checkBox("Liked By Me"),
								skipstale:checkBox("Day-Old Posts"),
							}),

							filterTweaksBlock:optionBlock("Tweaks",{
								accepton15:checkBox("Mark 'Unrecognized Response' As Accepted"),
								markliked:checkBox("Mark Liked As Accepted (must check Skip Liked)"),
							},true),

							filterCleanupBlock:optionBlock("Cleanup",{
								cleaninterval:{
									label:"Cleanup Interval",
									type:"selecttime",
									title:"Remove unwanted posts from collection console after a set time.",
									options:{
										"off":"Off",
										"one":"1 minute",
										"two":"2 minutes",
										"five":"5 minutes",
										"ten":"10 minutes",
										"fifteen":"15 minutes",
										"thirty":"30 minutes",
										"hour":"1 hour",
									},
									"default":"off"
								},
								cleanTimedOut:checkBox("Clean timed out posts",true),
							},true),
						}),

						section_history:section("History",{
							itemage:inputBox("How long to keep tried items in memory (days)",2),
							oblock_historyConfirms:optionBlock("Confirm (Changes available on next config open)",{
								historyConfirmClear:{type:"checkbox",label:"Clear History",title:"Confirm before clearing history.","default":true},
							},true),
							reset:button("Clear History",
								WM.resetAccepted
							),
						}),

						section_feedopts:section("Feeds Manager",{
							oblock_feedsConfirms:optionBlock("Confirm",{
								feedsConfirmDeleteFeed:{type:"checkbox",label:"Delete Rule",title:"Require confirmation to delete a feed.","default":true},
							},true),
						}),

						section_dynamicopts:section("Dynamic Grabber",{
							dynamicopts:optionBlock("Dynamic Collection",{
								dynamicFirst:checkBox("Run Dynamics BEFORE Sidekicks",true),
							},true),
							enableDynamic:optionBlock("Enable Dynamics by Game",{}),
							oblock_dynamicConfirms:optionBlock("Confirm",{
								dynamicConfirmDeleteTest:{type:"checkbox",label:"Delete Rule",title:"Require confirmation to delete a test.","default":true},
							},true),
						}),

						section_friendtrackopts:section("Friend Tracker",{
							useFriendTracker:checkBox("Enable Friend Tracking",true),
							trackTime:inputBox("Track For How Many Days",2),
							trackeropts:optionBlock("Track Data",{
								trackCreated:checkBox("Post Creation Counts",true),
								trackLastKnownPost:checkBox("Last Known Post Time",true),
								trackAccepted:checkBox("Bonuses Accepted",true),
								trackFailed:checkBox("Bonuses Failed",true),
							},true),
							oblock_trackerConfirms:optionBlock("Confirm",{
								trackConfirmClearUser:{type:"checkbox",label:"Clear User Data",title:"Require confirmation to clear user data.","default":true},
							},true),
						}),
						
						section_rulesopts:section("Rules Manager",{
							oblock_rulesHeartbeat:optionBlock("Heartbeat",{
								heartRate:inputBox("Global Heartbeat Delay (ms)",1000),
								heartbeatAffectsApps:{type:"checkbox",label:"Affect Apps",title:"Heartbeat can be heard at app level on every rule at once. This can slow down your system."},
								heartbeatAffectsPosts:{type:"checkbox",label:"Affect Posts",title:"Heartbeat can be heard at post level on every rule at once. This can slow down your system."},
								heartbeatAffectsRules:{type:"checkbox",label:"Affect Rules",title:"Heartbeat can be heard at rule level on every rule at once. This can slow down your system."},
								heartbeatAffectsFeeds:{type:"checkbox",label:"Affect Feeds",title:"Heartbeat can be heard at feed level on every rule at once. This can slow down your system."},
								heartbeatAffectsFeedFilters:{type:"checkbox",label:"Affect Feed Filters",title:"Heartbeat can be heard at feed filter level on every rule at once. This can slow down your system."},
							},true),
							oblock_rulesConfirms:optionBlock("Confirm",{
								rulesConfirmDeleteValidator:{type:"checkbox",label:"Delete Validator",title:"Require confirmation to delete a rule's validator.","default":true},
								rulesConfirmDeleteAction:{type:"checkbox",label:"Delete Action",title:"Require confirmation to delete a rule's action.","default":true},
								rulesConfirmDeleteRule:{type:"checkbox",label:"Delete Rule",title:"Require confirmation to delete a rule.","default":true},
								rulesConfirmResetLimit:{type:"checkbox",label:"Reset Limit",title:"Require confirmation to reset individual limits.","default":true},
								rulesConfirmResetAllLimits:{type:"checkbox",label:"Reset All Limits",title:"Require confirmation to reset all limits.","default":true},
								rulesConfirmHatch:{type:"checkbox",label:"Hatch Eggs",title:"Require confirmation to hatch eggs.","default":true},
							},true),
							rulesJumpToNewRule:{type:"checkbox",label:"Jump To New Rules",title:"When new rules are created from tests or posts, select the rules manager tab and scroll the new rule into view.","default":true},
						}),

						section_dev:section("Debug",{
							oblock_debugTweaks:optionBlock("Tweaks",{
								pinundefined:checkBox("Pin Undefined Bonus Types"),
							},true),
							debugOpts:optionBlock("Debug",{
								debug:checkBox("Enable Debug",true),
								debugLevel:{
									label:"Debug Sensitivity",
									title:"Sets the level of errors and warnings to report. 0 is all, 5 shows only the worst.",
									type:"select",
									options:{
										"0":"Function calls",
										"1":"Function subsections & debug notes",
										"2":"Captured expected errors",
										"3":"Known open errors",
										"4":"Unexpected errors",
										"5":"Fatal errors",
									},
									"default":"0"
								},
								debugMaxComments:inputBox("Max debug lines (0 for no limit)",100),
								debugScrollIntoView:checkBox("Use scrollIntoView"),
								debugStackRepeats:checkBox("Stack Immediate Repeats"),

							},true),
							advDebugOpts:optionBlock("Advanced Debug",{
								devDebugFunctionSubsections:checkBox("Debug Function Subsections",false),
								devDebugGraphData:checkBox("Debug Graph Packets (not available for Chrome)",false),
							},true),
							GM_special:optionBlock("Script-runner Options",{
								useGM_openInTab:checkBox("Use GM_openInTab instead of window.open",false),
							},true),

						}),

						section_configopts:section("Config",{
							oblock_configConfirms:optionBlock("Confirm (Changes available on next config open)",{
								configConfirmSave:{type:"checkbox",label:"Save",title:"Confirm before saving settings.","default":true},
								configConfirmCancel:{type:"checkbox",label:"Cancel",title:"Confirm before closing settings without saving.","default":true},
								configConfirmImport:{type:"checkbox",label:"Import",title:"Confirm before importing settings.","default":true},
								configConfirmRestore:{type:"checkbox",label:"Restore Defaults",title:"Confirm before restoring defaults.","default":true},
							},true),
							oblock_configStyling:optionBlock("Styling (Changes available on next config open)",{
								configSectionsAsTabs:{type:"checkbox",label:"Display Sections as Tabs",title:"Converts top level roll-outs only. Display those rollouts as tabs on next open of config."},
								configSeparatorsAsTabs:{type:"checkbox",label:"Display Separators as Tabs",title:"Converts second level roll-outs only. Display those rollouts as tabs on next open of config. Removes select all/none buttons on top of the separator."},
							},true),
							oblock_configTweaks:optionBlock("Tweaks (Changes available on next config open)",{
								configScrollIntoView:{type:"checkbox",label:"Use scrollIntoView",title:"When tabs and sections are opened, use the scrollIntoView function to bring them more fully into view. This is jerky at best."},
							},true),
						}),
					}),

					wmtab_games:tabSection("Sidekick Options",{
						skmovedwarning:{type:"message",title:"Sidekick options have moved",textContent:"Sidekick options have been moved to separate config windows. Access them by using the 'Manage Sidekicks' tab, where you can find new 'Options' buttons for each sidekick."},
					}),

					wmtab_info:tabSection("Info",{
						MainMessageCenter:separator("Documentation - Messages - Help",null,{
							Mainupdate:anchor("Update Script","http://userscripts.org/scripts/source/86674.user.js"),
							donateWM:{type:"link",label:"Donate for FBWM via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=FBWM&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},
							Mainwikipage:anchor("Wiki Support Page","http://fbwm.wikia.com/wiki/Known_Issues"),
							Mainsetupinfo:anchor("Setup Info","http://fbwm.wikia.com/wiki/New_User_Setup"),
							Maindiscuss:anchor("Known Bugs","http://fbwm.wikia.com/wiki/Known_Issues"),
							Mainrevisionlog:anchor("Revision Log","http://fbwm.wikia.com/wiki/Revisions"),
						},true),
					}),
					
					wmtab_scripts:tabSection("Get More!",{
						
					}),

				},
			});
			
			// add options shortcut to user script commands
			GM_registerMenuCommand("Wall Manager "+WM.version+" Options", function(){WM.config.open();});
		}catch(e){log("WM.optionsSetup: "+e);}},

		init : function(){try{
			//capture user id/alias/name and make it global
			WM.currentUser.id = Graph.userID;
			WM.currentUser.alias = Graph.userAlias;
			WM.currentUser.profile = WM.currentUser.alias||WM.currentUser.id;

			debug.print("UserID:"+WM.currentUser.id+"; UserAlias:"+WM.currentUser.alias+"; WM is Using:"+WM.currentUser.profile);

			//get WM.quickOpts
			WM.quickOpts = getOptJSON('quickopts_'+WM.currentUser.profile)||{};
			WM.quickOpts["filterApp"]=(WM.quickOpts["filterApp"]||"All");
			WM.quickOpts["displayMode"]=(WM.quickOpts["displayMode"]||"0");
			WM.quickOpts["masterSwitch"]=(WM.quickOpts["masterSwitch"]||{});
			WM.quickOpts["useGlobalSettings"]=(WM.quickOpts["useGlobalSettings"]||false);

			//create the options menu
			WM.optionsSetup();

			//duplicate the options saved in WM.config
			WM.updateSettingsValues();

			//set up the config with its internal special variables
			WM.changeConfigSettings();

			//setup debug beyond its defaults
			WM.changeDebugSettings();
			
			//clean history
			WM.history = getOptJSON('history_'+WM.currentUser.profile)||{};
			WM.cleanHistory();
						
			//prep the console now that we have an id and/or alias
			//and then carry on with our init
			WM.console.init({callback:WM.initConsole});
		}catch(e){log("WM.init: "+e);}},
		
		receiveSidekickMessage: function(event) {
			if (isObject(event.data)) {
				var data=event.data; //just shorten the typing
				if (data.channel=="WallManager"){
					//log(JSON.stringify(data));
					//$("WM_debugWindow").childNodes[1].lastChild.scrollIntoView();
					switch (data.msg){
						case 2: //getting a comOpen response from sidekick
							//WM.collector.tabs[data.tabID].comOpen=true;
							break;
							
						case 4: //getting a status package from sidekick
							switch (data.params.action){
								case "onFrameLoad":
									WM.onFrameLoad(data.params);
									break;
								case "onFrameLoad3":
									WM.onFrameLoad3(data.params);
									break;
							}
							break;
					}
				}
			}
		},		

		run : function() {try{
			// pre-load console images
			//for(var img in imgs) try{new Image().src = imgs[img];}catch(e){log("preload: "+e);}

			//special about:config entry for disabling storage of fb auth token
			//should help multi account users
			//if (getOpt("disableSaveAuthToken")) 
			Graph.authToken=null;
			
			//patch 38 auth token stuff
			var flagManualAuthSuccessful=getOpt("flagManualAuthSuccessful")||false;					
			if (WallManager.switches.manualAuthToken && !flagManualAuthSuccessful) {
				var m="WM can no longer access your FB Access Token without your manual assistance.\nTo successfully fetch posts, please complete the following:\n\n*In a new browser window, visit: http://developers.facebook.com/tools/explorer\n\n*If required, allow that app access to your facebook information\n*Find the 'Get Access Token' button and click it\n*In the panel that appears, click 'extended permissions'\n*Be sure that 'read_stream' is selected or otherwise not blank\n*If you want to use autolike/autocomment also select 'publish_actions' from the 'user data permissions' tab*Click the 'Get Access Token' button\n*Now find the box that says 'Access Token' and select its value\n*Copy that value and paste it into the box on this promp\n\nNote: this token does not last forever, you may need to repeat this process";
				var manualToken = prompt(m,"paste token here");
				
				//validate manualToken at least somewhat
				
				//halt if manual token is not given
				if (manualToken=="" || manualToken==null || manualToken=="paste token here") {
					alert("manual token not accepted, please refresh and try again");
					return;
				}
				
				//pass the manual token along
				Graph.authToken=manualToken;
				
				//consider saving time by looking for auth tokens automatically from here out
				var m = "WM thinks your auth token setup is successful.\nIf you like, I can make it so WM just checks your dev tool for new auth tokens every time.\n\nPress Cancel to continue entering auth codes manually.\n\n*If you have multiple facebook accounts on this computer using WM, please make sure you set up the API explorer with every account.";
				var saveProgress = confirm(m);
				if (saveProgress) {
					setOpt("flagManualAuthSuccessful",true);					
				}
			} 

			var G=Graph.fetchUser({callback:WM.init});
			
			if (G){if (G.requestAlreadyOut) {
			} else if (G.initRequestSlow) {
			} else if (G.olderLimitReached) {
			} else if (G.getAuthTokenFailed) {
			}}
			
		}catch(e){log("WM.run: "+e);}}		
	};

	var WM=WallManager;

	//returns the current date-time in unix format, not localized
	WM.__defineGetter__("currentTime",function(){try{
		return timeStamp();
	}catch(e){log("WM.currentTime: "+e);}});
	
	//returns the appID of the selected app tab on the collection panel, or 'all' if 'Show All' is selected
	WM.__defineGetter__("currentAppTab",function(){try{
		var tabCtrl=WM.console.collectTabControl;
		if (tabCtrl||null) {
			var tab = tabCtrl._selectedTab;
			if (tab||null) return tab.appFilter;
		}
		return "all";
	}catch(e){log("WM.currentAppTab: "+e);}});

	var sandbox=this;
	
	//allow certain options to be seen outside of the WallManager object
	//graph extension is external but still calls on WM options if they exist
	opts=WM.opts;
	quickOpts=WM.quickOpts;
					
//***************************************************************************************************************************************
//***** global functions
//***************************************************************************************************************************************
	sandbox.isNumber = function(o){return ((typeof o) == "number");};
	sandbox.isArray = function(o) {return Object.prototype.toString.call(o) === "[object Array]";};

//***************************************************************************************************************************************
//***** Visual Console Object
//***************************************************************************************************************************************
	WM.console = {
		initialized: false,
		sidekickNode: null, //remember the sidekicks list
		feedNode: null, //remember where to put the feed data
		loading: true, //set to false after sidekicks have time to load
		priorityNode: null,
		priorityBuild: null,
		dynamicBuild: null,
		
		//new content
		tabContainer:null, //outer tab control
		configButton:null, //userConfig.open control
		collectTabControl:null, //app filter tab control
		
		dynamicIcons: function(){
			//define a crapload of icons
			var icons={
				//128x128 pixel icons
				row0:["refresh","world","check",null,"moveUpLevelLeft","moveUpLevelRight","moveDownLevelLeft","moveDownLevelRight","filter","plus","minus","multiply","import","reset","object","array"],
				row1:["expandDown","expandUp","expandLeft","expandRight","moveTopLeft","moveBottomLeft",null,"allSidekicks","location","sortAsc","sortDesc","tools","treeExpand","treeCollapse","exportGrab","grab"],
				row2:["playDown","playUp","playLeft","playRight","like","unlike","uncheckAll","checkAll","layoutSmall","layoutDetail","layoutList","sidekick","refreshProcess","cancelProcess","importData"],
				row3:["arrowDown","arrowUp","arrowRight","arrowLeft","rssUpRight","rssUpLeft","rssDownRight","rssDownLeft","pin","pinned","redPhone","shuffle",null,"birth","comment"],
				row4:["plugin","identify","add","remove","openInNewWindow","restoreDown","stop","pause","trash","action","logo",null,"moveOutLevel","moveInLevel","removeGlobal","toGlobal"],
				row5:["clone","hatch","tag","noImage","accordionExpandH","accordionCollapseH","accordionExpandV","accordionCollapseV","gotoLibrary","addFilter","removeFilter","maximize","addFeed","addGlobal","fromGlobal","checkGlobal"],
				
				//32px icons
				row6:["firefox","chrome",null,"tabs"],
				
				//16px icons
				row7:["treeCollapseS","treeExpandS","layoutSmallColor","layoutDetailColor","layoutListColor",null,null,null,null,null,null,"noImageSmall"],
			};
			
			var ret=".resourceIcon {display:block; background-image:url('"+WM.resources.iconsURL+"') !important;}\n";
			
			//create css statements 
			//for rows 0-5,6,7
			var sizes=[8,16,24,32,48,64];
			
			for (var si=0,len=sizes.length;si<len;si++){
				var s=sizes[si];
				for (var r=0;r<=6;r++){
					for (var i=0;i<20;i++){
						var iconName=icons["row"+r][i];
						if (iconName!=null) {
							ret+="."+iconName+s+" {background-position:"+(-i*s)+"px "+(-r*s)+"px; width:"+s+"px; height:"+s+"px; background-size:"+(1024/(64/s))+"px;}\n";
						}
					}
				}
				r=6;
				for (var i=0;i<20;i++){
					var iconName=icons["row"+r][i];
					if (iconName!=null) {
						//6 rows of icons 2 times this size
						var yOffset=(6*s*2);
						ret+="."+iconName+s+" {background-position:"+(-(i*s))+"px "+(-yOffset)+"px; width:"+s+"px; height:"+s+"px; background-size:"+(1024/(64/(s*2)))+"px;}\n";
					}
				}
				r=7;
				for (var i=0;i<20;i++){
					var iconName=icons["row"+r][i];
					if (iconName!=null) {
						//6 rows of icons 4 times this size
						//plus 1 row of icons twice this size
						var yOffset=(6*s*4) + (1*s*2);
						ret+="."+iconName+s+" {background-position:"+(-(i*s))+"px "+(-yOffset)+"px; width:"+s+"px; height:"+s+"px; background-size:"+(1024/(64/(s*4)))+"px;}\n";
					}
				}
			}

			return ret;
		},
		
		globalStyle:function(){try{
			return ""+
			
			//icon sheets
			WM.console.dynamicIcons()+
			
			"html {height:100%; width:100%;}\n"+
			"body {margin:0 !important; font-family:tahoma,arial; font-size:small;}\n"+
			
			"a:hover {text-decoration: none !important;}\n"+

			"#content {display:none !important; }\n"+

			"#wmContent {background-color:#DDDDEE; position:relative;}\n"+

			".post.classic {position:relative; min-height:90px; border-bottom:1px solid #CCCCDD; padding-bottom:10px; padding-top:10px; clear:both;}\n"+
			".post.classic .actor {margin-top:5px; margin-bottom:10px; font-weight:700; color:#3B5998; display:inline;}\n"+
			".post.classic .picture {padding-top:5px; padding-right:10px; float:left;}\n"+
			".post.classic .picture img {width:90px; height:90px; background-color:white; border:1px solid; border-radius:5px;}\n"+
			".post.classic .body {vertical-align:top;}\n"+
			".post.classic .title {margin-top:5px; font-weight:700; color:#3B5998;display:block;}\n"+
			".post.classic .caption {display:block; }\n"+
			".post.classic .description {padding-top:5px; display:block;}\n"+
			".post.classic .postDate {}\n"+
			".post.classic .appName {position:relative; left:10px;}\n"+
			".post.classic .linkText {color:#899ADB; float:right; padding-right:32px;}\n"+
			".post.classic.noimage {min-height:1px;}\n"+
			
			".post.short {float:left; position:relative;}\n"+
			".post.short .floater {overflow:hidden; display:block; background-color: white; border:0px solid; border-radius:5px; position:absolute; z-index:3; padding:0; width:0px;}\n"+
			".post.short:hover .floater {-moz-transition-property: width,height,padding,border;-moz-transition-delay:1s; width:240px; padding:5px 10px;border:1px solid;}\n"+
			".post.short .actor {display:block;}\n"+
			".post.short .picture {position:relative;}\n"+
			".post.short .picture img {position:relative; width:100%; height:100%; background-color:white;}\n"+
			".post.short .postDate {display:block;}\n"+
			".post.short .appName {display:block;}\n"+
			".post.short .linkText {display:block;}\n"+
			".post.short .progress {opacity:0.25; background-color:#00FF00;}\n"+

			".post.short.working .picture img {opacity:0.25;}\n"+
			".post.short.excluded .picture img {opacity:0.25;}\n"+
			".post.short.timeout .picture img {opacity:0.25;}\n"+
			".post.short.paused .picture img {opacity:0.25;}\n"+
			".post.short.nodef .picture img {opacity:0.25;}\n"+
			".post.short.accepted .picture img {opacity:0.25;}\n"+
			".post.short.failed .picture img {opacity:0.25;}\n"+
			".post.short.colored .picture img {opacity:0.25;}\n"+
			".post.short.scam .picture img {opacity:0.25;}\n"+
			".post.short.pinned .picture img {opacity:0.25;}\n"+

			".post.dev {position:relative; min-height:90px; border-bottom:1px solid #CCCCDD; padding-bottom:20px; padding-top:10px; clear:both;}\n"+
			".post.dev>div:first-child {display: inline-block; margin-right: 16px; border: none;}\n"+

			".wm.content > div > .toolBox {display:inline;}\n"+
			".wm.content > div > .toolBox > div {display:inline;}\n"+
			
			".post .toolBox {display:block; vertical-align:top; position:relative !important;}\n"+
			".post .toolBox > div {display:block; float:right;}\n"+
			
			"div.excluded {background-color:gray !important;}\n"+
			"div.working {background-color:yellow !important;}\n"+
			"div.timeout {background-color:orange !important;}\n"+
			"div.paused {background-color:silver !important;}\n"+
			"div.pinned {background-color:silver !important;}\n"+
			"div.nodef {background-color:deepskyblue !important;}\n"+
			"div.failed {background-color:red !important;}\n"+
			"div.accepted {background-color:limegreen !important;}\n"+
			"div.scam {background-color:purple !important;}\n"+
			
			".pausedHover {display:none; position:absolute; right:50%; top:50%;}\n"+
			".pausedHover>img {margin-left:-32px; margin-top:-32px;}\n"+
			".pausedHover>img:hover {background-color:rgba(0,255,0,0.5); border-radius:20%;}\n"+
			
			".post.paused.short>.floater>.pausedHover>img {background-color:rgba(0,255,0,0.5); border-radius:20%;}\n"+
			".post.paused>.pausedHover, .post.paused>.floater>.pausedHover {display:block;}\n"+
						
			".underline {border-bottom:1px solid #CCCCDD;}\n"+

			".toolTip {display:none; border:1px solid #767676; border-radius:3px; background-color:white; color:black; position:absolute; font-size:8pt; padding:5px; line-height: 12px; z-index:9999;}\n"+
			"*:hover > .toolTip {display:block;}\n"+
			".menuNode {width:0px; height:0px; position:absolute; background:none; border:none;top:-5px;}\n"+
			".toolTip.menuNode > ul {position:absolute; background-color: white; border: 1px solid; border-radius: 5px 5px 5px 5px; padding: 2px; min-width:100px;}\n"+
			".toolTip.menuNode > ul > li {position:relative; line-height:1.28; }\n"+
			".toolTip.right.menuNode {right:5px; }\n"+
			".toolTip.left.menuNode {left:-5px; }\n"+
			".toolTip.right.menuNode > ul {left:0px;}\n"+
			".toolTip.right.menuNode > ul > li {text-align:left;}\n"+
			".toolTip.left.menuNode > ul {right:0px;}\n"+
			".toolTip.left.menuNode > ul > li {text-align:right;}\n"+

			//little button div
			".littleButton {background-color:threedshadow; border-radius:5px; margin:1px; display:inline-block; vertical-align:middle;}\n"+
			".littleButton:hover {background-color:highlight !important;}\n"+
			".littleButton>img {position:relative; display:block; margin:2px;}\n"+
			".littleButton.oddOrange {background-color:#FF9968;}\n"+
			".littleButton.oddBlack {background-color:#82976E;}\n"+
			".littleButton.oddBlue {background-color:#51D1EA;}\n"+
			".littleButton.oddGreen {background-color:#B7E54F;}\n"+
			
			".menuEntry, .menuList > li {position:relative; border-radius:3px; border:1px solid white; padding:3px; min-width:100px;}\n"+
			".menuEntry:hover, .menuList > li:hover {border-color:#CCCCDD; background-color:#E0E8F6; }\n"+

			".accFailBlock {color: white !important;font-size: small !important;left: 16px;line-height: 12px;margin-bottom: -12px;padding: 0 !important;position: relative;top: -32px;}\n"+
			".accFailBlock .fail {background-color: #C3463A; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); padding: 1px 2px;}\n"+
			".accFailBlock .accept {background-color: #46B754; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); padding: 1px 2px;}\n"+

			//rules manager
			"#wmPriorityBuilder {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+
			
			"#wmPriorityBuilder .validator > :before {content:'and: '}\n"+
			"#wmPriorityBuilder .validator:first-child > :before {content:'where: '}\n"+
			"#wmPriorityBuilder .action > :before {content:'and: '}\n"+
			"#wmPriorityBuilder .action:first-child > :before {content:'do: '}\n"+
			
			//collection feed node
			"#wmFeedNode {margin:5px; position: relative; background-color:white;}\n"+

			//sidekick manager
			"#wmSidekickList {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+
			
			//feeds manager
			"#wmFeedsList {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+

			//dynamic grabber
			"#wmDynamicBuilder {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+
			
			//friend tracker
			"#wmFriendTracker {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+

			".expanded {display:block;}\n"+
			".collapsed {display:none;}\n"+
						
			"label {font-weight:bold; margin-right:5px;}\n"+

			".unsaved {background-color:lightyellow !important;}\n"+

			".whiteover:hover {background-color:#FFFFFF !important;}\n"+
			".blueover:hover {background-color:#E0E8F6 !important;}\n"+

			".red {background-color:#C3463A !important; border: 2px solid #982B2F !important; text-shadow: -1px -1px 1px #982B2F, 1px 1px 1px #982B2F, 1px -1px 1px #982B2F, -1px 1px 1px #982B2F; text-transform: none !important; font-color:white !important;}\n"+
			".red:hover {background-color:#EA1515 !important;}\n"+

			".green {background-color:#46B754 !important; border: 2px solid #256E46 !important; text-shadow: -1px -1px 1px #256E46, 1px 1px 1px #256E46, 1px -1px 1px #256E46, -1px 1px 1px #256E46; text-transform: none !important; font-color:white !important;}\n"+
			".green:hover {background-color:#A6E11D !important;}\n"+

			".blue {background-color:#51C2FB !important; border: 2px solid #057499 !important; text-shadow: -1px -1px 1px #057499, 1px 1px 1px #057499, 1px -1px 1px #057499, -1px 1px 1px #057499; text-transform: none !important; font-color:white !important;}\n"+
			".blue:hover {background-color:#C2DEFF !important;}\n"+

			".gray {background-color:#999999 !important; border: 2px solid #666666 !important; text-shadow: -1px -1px 1px #666666, 1px 1px 1px #666666, 1px -1px 1px #666666, -1px 1px 1px #666666; text-transform: none !important; font-color:white !important;}\n"+
			".gray:hover {background-color:#C3C3C3 !important;}\n"+

			".odd {background-image: -moz-linear-gradient(center top , orange, red); box-shadow: 1px 1px 1px black; -moz-transform: rotate(15deg);}\n"+
			".odd:hover {-moz-transform: none;}\n"+

			".post.mosquito {width:16px; height:16px;}\n"+
			".post.tiny {width:24px; height:24px;}\n"+
			".post.small {width:32px; height:32px;}\n"+
			".post.medium {width:48px; height:48px;}\n"+
			".post.large {width:64px; height:64px;}\n"+
			".post.xlarge {width:96px; height:96px;}\n"+

			".floater.mosquito {left:8px;top:8px;}\n"+
			".floater.tiny {left:12px;top:12px;}\n"+
			".floater.small {left:16px;top:16px;}\n"+
			".floater.medium {left:24px;top:24px;}\n"+
			".floater.large {left:32px;top:32px;}\n"+
			".floater.xlarge {left:48px;top:48px;}\n"+

			".post.mosquito.working .picture img {width:24px; height:24px;left:-4px;top:-4px;}\n"+
			".post.tiny.working .picture img {width:32px; height:32px;left:-4px;top:-4px;}\n"+
			".post.small.working .picture img {width:48px; height:48px;left:-8px;top:-8px;}\n"+
			".post.medium.working .picture img {width:64px; height:64px;left:-8px;top:-8px;}\n"+
			".post.large.working .picture img {width:96px; height:96px;left:-16px;top:-16px;}\n"+
			".post.xlarge.working .picture img {width:128px; height:128px;left:-16px;top:-16px;}\n"+

			//"div.pinned {border-radius: 6px; background-color: black !important;}\n"+
			//".post.short.pinned .picture img {border-radius: 5px; height:80% !important; width:80% !important; margin-left:10%; margin-top:10%;}\n"+

			"#wmContent>.jsfTabControl>.tabs {top:10%; width:100px; position:relative;}\n"+
			"#wmContent>.jsfTabControl>.pages {border-radius:5px;}\n"+
			"#wmContent>.jsfTabControl>.tabs>.jsfTab {text-align:center;}\n"+
			
			".jsfTabControl>.tabs {font-family:impact; font-size:large; color:inactivecaptiontext;}\n"+
			"input,select,label,textarea {font-family:tahoma,arial; font-size:small; vertical-align:baseline !important;}\n"+
			".jsfComboBox {line-height:normal;}\n"+
			"button {font-family:tahoma,arial; font-size:small; vertical-align:top !important;}\n"+
			"input[type=\"checkbox\"] {font-family:tahoma,arial; font-size:small; vertical-align:middle !important;}\n"+

			".nomargin {margin:0 !important;}\n"+
			".hidden {display:none !important;}\n"+
			".block {display:block !important;}\n"+
			".alignTop {vertical-align:top !important;}\n"+
			".fit {width:100% !important;}\n"+
			".indent {margin-left:16px;}\n"+
			"img.crisp {image-rendering: -moz-crisp-edges;}\n"+
			
			".listItem {position:relative; clear:both;}\n"+
			".listItem.disabled {opacity:0.5 !important; background-color:#eeeeee;}\n"+
			".listItem .toolBox {position: absolute; right: 0px; top: 0;}\n"+
			".listItem select {border:0px; padding:0px; margin: 0px; margin-left:6px; margin-right:6px; background-color:#eeeeee; vertical-align:middle;}\n"+
			".listItem input {border:0px; padding:0px; margin: 0px; margin-left:6px; margin-right:6px; background-color:#eeeeee; vertical-align:middle;}\n"+
			".listItem textarea {background-color:#eeeeee; border:0px;}\n"+

			".header {background-color: window; font-family:impact; font-size:2em; color:inactivecaptiontext; border-radius:5px 5px 0 0; padding-left:6px;}\n"+
			".headerCaption {background-color: window; color: inactivecaptiontext; font-family: arial; font-size: small; padding-bottom: 6px; padding-left: 16px; padding-right: 16px; padding-top: 6px; border-radius:0 0 5px 5px;}\n"+
			".headerCaption+.toolBox, .header+.toolBox {border-bottom:1px solid activeborder; margin-bottom: 5px; margin-top: 5px; padding-bottom: 5px;}\n"+
			
			".line {border-top:1px solid #c0c0c0; line-height:2em;}\n"+
			".subsection {margin-left:28px;}\n"+
			
			".optioncontainer {max-height:12em; overflow-y:auto; background-color:rgb(238, 238, 238);}\n"+
			".optioncontainer>.line {line-height:normal;}\n"+
			
			".singleCol .post.classic {}\n"+
			".twoCol .post.classic {display: inline-block; width: 50%; vertical-align: top;}\n"+
			".twoCol .post.classic > .body {padding-right:28px;}\n"+
			".threeCol .post.classic {display: inline-block; width: 33%; vertical-align: top;}\n"+
			".threeCol .post.classic > .body {padding-right:28px;}\n"+
			".fourCol .post.classic {display: inline-block; width: 25%; vertical-align: top;}\n"+
			".fourCol .post.classic > .body {padding-right:28px;}\n"+

			".w400 {width:400px;}\n"+


			""
		}catch(e){log("WM.console.globalStyle: "+e);}},

		init: function(params){try{
			debug.print("WM.console.init:");
			var validateFBElements=["globalContainer","content"];
			params=params||{};

			//if console does not already exist
			if (!WM.console.tabContainer) {
				try{
					addGlobalStyle(WM.console.globalStyle(),"styleConsole");
				}catch(e){log("WM.console.init.addGlobalStyle: "+e);};

				//attach to facebook page
				var baseNode=$("globalContainer");
				if (baseNode) baseNode=baseNode.parentNode; 
				//or attach to page body
				else baseNode=($("body")||document.body);

				//sort fields shared by post sorting and grouping
				var sortFields = [
					{value:"age",title:"Time elasped since created (ms)."},
					{value:"alreadyProcessed",title:"History contains a status code for this post."},
					{value:"appID"},
					{value:"appName",title:"App name as it appears on FB."},
					{value:"date",title:"The datetime the post was created, in unix format. Does not contain millisecond data."},
					{value:"fromID",title:"The FB id of the person who created this post."},
					{value:"fromName",title:"The display name of the person who created this post."},
					{value:"fromNameLastFirst",title:"As fromName but displayed as LastName, FirstName"},
					{value:"id",title:"The post object id as it is connected with FB."},
					{value:"idText",title:"Either the whichText of the post, or the statusText of a post already processed."},
					{value:"isAccepted"},
					{value:"isFailed"},
					{value:"isTimeout"},
					{value:"isExcluded"},
					{value:"isCollect",title:"A flag for if this post is to be collected."},
					{value:"isForMe"},
					{value:"isLiked"},
					{value:"isMyPost"},
					{value:"isPaused"},
					{value:"isPinned"},
					{value:"isScam"},
					{value:"isStale"},
					{value:"isUndefined"},
					{value:"isWishlist"},
					{value:"isW2W",title:"If this post is a Wall-to-wall post or just a general feed post."},
					{value:"msg",title:"The comment attached to the post body by the post creator."},
					{value:"postedDay",title:"The year/month/day portion of the creation time for this post."},
					{value:"postedHour",title:"The year/month/day/hour portion of the creation time for this post."},
					{value:"priority",title:"Priority 0 being the first post you would want processed, and Priority 50 being default."},
					{value:"status",title:"The status code returned by the sidekick associated with this post."},
					{value:"which",title:"The sidekick-defined bonus type id for this kind of post."},
					{value:"whichText",title:"The text associated with this bonus type id."},
					{value:null,name:"(none)"},
				];

				//create our content window
				baseNode.insertBefore(createElement("div",{id:"wmContent"},[
					//toolbox
					(WM.console.tabContainer=new jsForms.tabControl({
						dock:"fillAndShare",
						sizeOffset:{height:-3,width:0},
						alignment:"left",
						tabs:[
							{ //collect tab
								text:"Collect",
								image:null,
								onSelect:function(){WM.console.collectTabControl.redraw();},
								content:[
									createElement("div",{className:"header",textContent:"Collect"}),
									createElement("div",{className:"headerCaption",textContent:"View friends' posts and manage all your collection needs."}),
									createElement("div",{className:"toolBox medium"},[
										createElement("span",{className:"littleButton oddBlue",title:"Fetch Newer Posts Now",onclick:function(){WM.fetch({newer:true,bypassPause:true});} },[createElement("img",{className:"resourceIcon rssUpRight24"})]),
										createElement("span",{className:"littleButton",title:"Fetch Older Posts Now",onclick:function(){WM.fetch({older:true,bypassPause:true});} },[createElement("img",{className:"resourceIcon rssDownLeft24"})]),
										WM.console.pauseFetchButton=createElement("span",{className:"littleButton oddOrange",title:"Pause Automatic Fetching",onclick:function(){WM.pauseFetching();} },[createElement("img",{className:"resourceIcon expandDown24"})]),
										WM.console.pauseCollectButton=createElement("span",{className:"littleButton oddOrange",title:"Pause Automatic Collection",onclick:function(){WM.pauseCollecting();} },[createElement("img",{className:"resourceIcon stop24"})]),
										createElement("span",{className:"littleButton",name:"0",title:"Classic View",onclick:WM.setDisplay},[createElement("img",{className:"resourceIcon layoutListColor24"})]),
										createElement("span",{className:"littleButton",name:"1",title:"Short View",onclick:WM.setDisplay},[createElement("img",{className:"resourceIcon layoutSmallColor24"})]),
										createElement("span",{className:"littleButton",name:"2",title:"Developer View",onclick:WM.setDisplay},[createElement("img",{className:"resourceIcon layoutDetailColor24"})]),
										createElement("span",{className:"littleButton",title:"Reset Counters",onclick:function(){WM.resetCounters();}},[createElement("img",{className:"resourceIcon refresh24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Clean Now",onclick:function(){WM.cleanPosts();}},[createElement("img",{className:"resourceIcon trash24"})]),
										createElement("span",{className:"littleButton",title:"ReID All",onclick:function(){WM.reIDAll();}},[createElement("img",{className:"resourceIcon identify24"})]),
										
										createElement("label",{className:"indent",textContent:"Sort By: "}),
										createElement("select",{id:"wmSortBy",className:"", title:"Sort By:", onchange:function(){WM.sortPosts({by:this.value});WM.redrawPosts({postRedraw:false,reorder:true});} },(function(){
											var ret=[];
											for (var i=0;i<sortFields.length;i++) ret.push(createElement("option",{value:sortFields[i].value,title:sortFields[i].title||"",textContent:sortFields[i].name||sortFields[i].value}));
											return ret;
										})()),
										createElement("span",{className:"littleButton oddGreen",title:"Sort Ascending",onclick:function(){WM.sortPosts({direction:"asc"});WM.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortAsc24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Sort Descending",onclick:function(){WM.sortPosts({direction:"desc"});WM.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortDesc24"})]),
										
										createElement("label",{className:"indent",textContent:"Group By: "}),
										createElement("select",{id:"wmGroupBy",className:"", title:"Group By:", onchange:function(){WM.constructGroups({by:this.value});WM.redrawPosts({postRedraw:false,reorder:true});} },(function(){
											var ret=[];
											for (var i=0;i<sortFields.length;i++) ret.push(createElement("option",{value:sortFields[i].value,title:sortFields[i].title||"",textContent:sortFields[i].name||sortFields[i].value}));
											return ret;
										})()),
										createElement("span",{className:"littleButton oddGreen",title:"Group Ascending",onclick:function(){WM.sortGroups({direction:"asc"});WM.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortAsc24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Group Descending",onclick:function(){WM.sortGroups({direction:"desc"});WM.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortDesc24"})]),

										createElement("label",{className:"indent",textContent:"Columns: ",title:"Classic Mode Only"}),
										createElement("select",{title:"Cols:", onchange:function(){WM.setDisplayCols({cols:this.value});} },[
											createElement("option",{value:1,textContent:"One",selected:WM.quickOpts.displayCols==1}),
											createElement("option",{value:2,textContent:"Two",selected:WM.quickOpts.displayCols==2}),
											createElement("option",{value:3,textContent:"Three",selected:WM.quickOpts.displayCols==3}),
											createElement("option",{value:4,textContent:"Four",selected:WM.quickOpts.displayCols==4})
										]),
										createElement("span",{className:"littleButton oddBlue",title:"Autolike Queue"},[
											createElement("img",{className:"resourceIcon like24"}),
											createElement("div",{className:"accFailBlock"},[
												WM.console.likeQueueCounterNode=createElement("span",{className:"accept",textContent:"0"})
											])											
										]),
									]),
									//app filter tabs
									(WM.console.collectTabControl=new jsForms.tabControl({
										dock:"fillAndShare",
										subStyle:"coolBar",
										shareSinglePage:true,
										preventAutoSelectTab:true,
										tabs:[
											{
												//default show all tab
												text:"Show ALL",
												image:"",
												imageClass:"resourceIcon allSidekicks32",
												appFilter:"All",
												onSelect:WM.setAppFilter,
												selected:(WM.quickOpts.filterApp=="All"),
												content:null, //because page is shared
											}
										],
										sharedContent:[
											//bonus display node
											WM.console.feedNode=createElement("div",{id:"wmFeedNode",style:"position: relative;"}),
										],
									})).node,
								],
							},
							{ //sidekicks tab
								text:"Manage Sidekicks",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Manage Sidekicks"}),
									createElement("div",{className:"headerCaption",textContent:"Control some of the features of sidekicks."}),
									WM.console.sidekickNode=createElement("div",{id:"wmSidekickList",className:"scrollY"}),
								],
							},
							{ //feeds tab
								text:"Manage Feeds",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Manage Feeds"}),
									createElement("div",{className:"headerCaption",textContent:"Add direct links to friends or other public profiles, and fetch posts from those feeds faster."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("div",{},[
											createElement("div",{className:"littleButton oddGreen",title:"Add Feed",onclick:WM.feedManager.newFeed},[createElement("img",{className:"resourceIcon plus24"})]),
										])
									]),
									WM.console.feedManagerNode=createElement("div",{id:"wmFeedsList",className:"scrollY"}),
								],
							},
							{ //rules tab
								text:"Manage Rules",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Manage Rules"}),
									createElement("div",{className:"headerCaption",textContent:"Create rules like macros to control exactly how posts are handled."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("div",{},[
											createElement("div",{className:"littleButton oddGreen",title:"Add Rule",onclick:WM.rulesManager.newRule},[createElement("img",{className:"resourceIcon plus24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Reset All Limits",onclick:WM.rulesManager.resetAllLimits},[createElement("img",{className:"resourceIcon reset24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Convert Dynamics",onclick:WM.rulesManager.convertDynamics},[createElement("img",{className:"resourceIcon exportGrab24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Import Rule",onclick:WM.rulesManager.importRule},[createElement("img",{className:"resourceIcon importData24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Export All Rules",onclick:WM.rulesManager.showData},[createElement("img",{className:"resourceIcon object24"})]),
										])
									]),
									WM.console.priorityBuild=createElement("div",{id:"wmPriorityBuilder",className:"scrollY"}),
								],
							},
							{ //dynamics tab
								text:"Dynamic Grabber",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Dynamic Grabber"}),
									createElement("div",{className:"headerCaption",textContent:"Create tests to capture posts sidekicks might not."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("div",{},[
											createElement("div",{className:"littleButton oddGreen",title:"Add Test",onclick:WM.grabber.newTest},[createElement("img",{className:"resourceIcon plus24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Import Test",onclick:WM.grabber.importTest},[createElement("img",{className:"resourceIcon importData24"})]),
										])
									]),
									WM.console.dynamicBuild=createElement("div",{id:"wmDynamicBuilder",className:"scrollY"}),
								],
							},
							{ //friends tab
								text:"Friend Tracker",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Friend Tracker"}),
									createElement("div",{className:"headerCaption",textContent:"Track player friends and your interactions with them."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("span",{className:"littleButton oddOrange",title:"Clean Now",onclick:function(){WM.friendTracker.clearAll();}},[
											createElement("img",{className:"resourceIcon trash24"})
										]),
										
										createElement("label",{className:"indent",textContent:"Sort By: "}),
										createElement("select",{title:"Sort By:", onchange:function(){WM.friendTracker.sort({sortBy:this.value});} },[
											createElement("option",{value:"acceptCount",textContent:"acceptCount",title:"How many posts WM remembers as collected successfully from this user."}),
											createElement("option",{value:"failCount",textContent:"failCount",title:"How many posts WM remembers as failed from this user."}),
											createElement("option",{value:"id",textContent:"id",title:"The facebook id of the user."}),
											createElement("option",{value:"lastKnownPostDate",textContent:"lastKnownPostDate",title:"The date of the last known post WM received for this user."}),
											createElement("option",{value:"name",textContent:"name",title:"The name of the user, with last name first."}),
											createElement("option",{value:"postCount",textContent:"postCount",title:"How many posts WM remembers receiving related to this user."}),
											createElement("option",{value:"totalCount",textContent:"totalCount",title:"How many posts WM remembers failed OR accepted from this user."})
										]),
										createElement("span",{className:"littleButton oddGreen",title:"Sort Ascending",onclick:function(){WM.friendTracker.sort({sortOrder:"asc"});}},[createElement("img",{className:"resourceIcon sortAsc24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Sort Descending",onclick:function(){WM.friendTracker.sort({sortOrder:"desc"});}},[createElement("img",{className:"resourceIcon sortDesc24"})]),
									]),
									WM.console.friendBuild=createElement("div",{id:"wmFriendTracker",className:"scrollY"}),
								],
							},
							{ //options tab
								text:"Options",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Options"}),
									createElement("div",{className:"headerCaption",textContent:"Manage script and sidekick configuration, or link to updates."}),
									//config menu button
									createElement("div",{},[
										createElement("label",{textContent:"Open the options menu: "}),
										WM.console.configButton=createElement("button",{
											className:"jsfHidden",
											textContent:"WM Options",											
											onclick:function(){
												//open options menu
												WM.config.open();
											},
										}),
									]),
									//update script button
									createElement("div",{},[
										createElement("label",{textContent:"Update Script (Current Version: "+WM.version+") :"}),
										createElement("button",{
											className:"",
											textContent:"Update Script",
											onclick:function(){
												//open update url in new window/tab
												window.open("http://userscripts.org/scripts/source/86674.user.js","_blank");
											},
										}),
									]),									
								],
							},
						]
					})).node
				]),  $("globalContainer"));

				//destroy facebook content on page
				if ($("content")) $("content").style.display="none !important";
				
				//init sort order
				$("wmSortBy").value=WM.quickOpts.sortBy;

				//init group order
				$("wmGroupBy").value=WM.quickOpts.groupBy;

				//init display mode
				with (WM.console.feedNode){
					className = className.toggleWordB(["1","3"].inArray(WM.quickOpts.displayMode),"short");						
				}
				WM.setDisplayCols({cols:WM.quickOpts.displayCols});
				
			}
			WM.console.initialized = true;

			//give sidekicks time to dock
			if (params["callback"]||null) {
				var fx = params["callback"];
				delete params["callback"];
				doAction(fx);
			}
			
		}catch(e){log("WM.console.init: "+e);}},
		
	}; //end WM.console

//***************************************************************************************************************************************
//***** Sidekick Docking Object
//***************************************************************************************************************************************
	WM.dock = {
		//restructure menu to append appID before every object
		fixMenu: function(menu,app){try{
			var ret={};
			//for each object in menu
			for (var o in menu){
				//WM.message(o);
				ret[app+o]=menu[o];

				//fix button functions and arrays to be prepended by the appID of that sidekick
				var t=menu[o]["type"];
				switch(t){
					case "button_highlight":
					case "button_selectmulti":
					case "button_selectprefix":

						//fix elements in the clearfirst array
						if (menu[o]["clearfirst"]){
							for (var i=0,len=ret[app+o]["clearfirst"].length;i<len;i++){
								ret[app+o]["clearfirst"][i] = app+ret[app+o]["clearfirst"][i];
							}
						}

						//fix elements in the options array
						if (menu[o]["options"]){
							for (var i=0,len=ret[app+o]["options"].length;i<len;i++){
								ret[app+o]["options"][i] = app+ret[app+o]["options"][i];
							}
						}

						if (menu[o]["clearPrefix"]){
							ret[app+o]["clearPrefix"]=app+ret[app+o]["clearPrefix"];
						}

						if (menu[o]["prefix"]){
							ret[app+o]["prefix"]=app+ret[app+o]["prefix"];
						}
				}

				//fix kids
				if (menu[o]["kids"]){
					//rebuild kids object
					ret[app+o]["kids"]=WM.dock.fixMenu(menu[o]["kids"],app);
				}
			}
			return ret;
		} catch(e) {log("WM.dock.fixMenu: "+e);}},

		//restructure tests to append appID before every object's return
		fixTests: function(arr,app){try{
			//for each test in array
			for (var t=0,len=arr.length;t<len;t++) {
				var ret=arr[t].ret, kids=arr[t].kids;
				//replace return value
				if (ret) {
					if (ret!="exclude" && ret!="none") {
						arr[t].ret=app.appID+ret;
					}
				}
				//process subtests
				if (kids) WM.dock.fixTests(kids,app);
			}
		} catch(e) {log("WM.dock.fixTests: "+e);}},

		fixAcceptTexts:function(app){try{
			var newAccText={};
			for (var s in app.accText) {
				newAccText[app.appID+s]=app.accText[s];
			}
			app.accText=newAccText;
		} catch(e) {log("WM.dock.fixAcceptTexts: "+e);}},

		onSidekickParsed: function(newset){try{		
			//save it into the NEW format for games
			var app=(WM.apps[newset.appID]=new WM.App(newset));

			//promptText JSON.stringify(WM.config.settings));
			WM.updateSettingsValues();

			//detach the menu from the newset to reduce duplication
			delete app.menu;
			
			//fire priority event
			(function(){WM.rulesManager.doEvent("onSidekickDock",app);})();
			
			//fetch its initial posts
			//app.fetchPosts();
			WM.newSidekicks.push(app);
			
		}catch(e){log("WM.dock.onSidekickParsed: "+e);}},
		
		parseNewSidekick: function(node){try{
			if (node){	
				var v = node.getAttribute('data-ft');
				node.setAttribute('data-ft','');
				if (v||null) {
					var newset = JSON.parse(v);
					WM.dock.onSidekickParsed(newset);
				}
			}
		} catch(e) {log("WM.dock.parseNewSidekick: "+e);}},
		
		answerDockingDoor: function(){try{
			//log("Sidekick requesting to dock");

			//get all sidekicks that left info on the dock;
			forNodes(".//div[@id='wmDock']/div[(@data-ft) and not(@data-ft='')]",{},function(node){
				if (node.getAttribute('data-ft') !=""){
					window.setTimeout(WM.dock.parseNewSidekick,1,node);
				}
			});
		} catch(e) {log("WM.dock.answerDockingDoor: "+e);}},

	};
	
//***************************************************************************************************************************************
//***** Collector Object
//***************************************************************************************************************************************
	WM.collector = {
		tabs : {}, //container for window objects
		recycle : [], //container for reusable window objects
		queue : [], //container for urls to do in order
		count : 0,

		windowExists : function(hwnd){
			try{
				var testUrl=tab.hwnd.location.toString();
				return true;
			}catch(e) {
				return false;
			}
		},
		
		//requires id, url and callback
		open : function(params) {try{
			//log("WM.collector.open()",{level:0});

			//check for tab queueing
			if (WM.opts.queuetabs && WM.collector.count && !(params.emergency||false)) {
				if (params.first||false) {
					//cut in line to be next processed
					WM.collector.queue.unshift(params);
					return;
				}
				//toss the next action in the queue while we wait for the current one to finish
				WM.collector.queue.push(params);
				//log("WM.collector.open: request queued",{level:1});
				return;
			}

			var url = params.url;
			var id = params.id;

			//create a window or use a recycled one
			var tabHwnd;
			if (WM.collector.recycle.length) {
				tabHwnd = WM.collector.recycle.shift();
				//watch for missing window objects
				try{
					//use the existing window object if it responds
					tabHwnd.location.href=url;
				} catch (e) {
					//window object missing, make a new one
					//FF22 version
					tabHwnd = GM_openInTab(url,"_blank");
					//FF21 version
					//tabHwnd = ((WM.opts.useGM_openInTab)?GM_openInTab:window.open)(url,"_blank");
				}
			} else {
				//we do not use recycling, just make a new one
				//FF22 version
				tabHwnd = GM_openInTab(url,"_blank");
				//FF21 version
				//tabHwnd = ((WM.opts.useGM_openInTab)?GM_openInTab:window.open)(url,"_blank");
			}

			//window opening
			if (tabHwnd) {
				WM.collector.count++;
				params.hwnd=tabHwnd; //store the window handle
				params.openTime=timeStamp();
				WM.collector.tabs[id]=params; //add the tab and all its data to the array

				//pass data to the sidekick top window
				var callback = params.callback;
				if (callback) delete params.callback;
				if (params.msg) {
					remove($(params.msg));
					delete(params.msg);
				}
				
				//details for posts, not for likes
				var app, synApp, isPost;
				if (isPost=(params.post||null)){
					app=params.post.app; 
					synApp=app.parent||app;
				}
				

				if (callback) {
					//log("WM.collector.open: callback fired",{level:3});
					doAction(function(){
						callback(params);
					});
				}
			} else {
				log("WM.collector: Tab or Window is not opening or your browser does not support controlling tabs and windows via scripts. Check your popup blocker.",{level:5});
			}
		}catch(e){log("WM.collector.open: "+e);}},

		doNext : function(){try{WM.collector.open(WM.collector.queue.shift());}catch(e){log("WM.collector.doNext: "+e);}},

		close : function(tab) {try{
			//recycle or close the passed tab
			try{
				if (WM.opts.recycletabsall || WM.opts.queuetabs || (WM.collector.recycle.length < WM.opts.recycletabs)) {
					//wipe it and put it away
					
					if (tab.hwnd){
						WM.collector.recycle.push(tab.hwnd);
						tab.hwnd.location.href="about:blank";
						if (WM.collector.windowExists(tab.hwnd)){
							tab.hwnd.location.hash="";
						}
					} else {
						//tab is busy, laggy or missing
						tab.closeRetries=(tab.closeRetries||0)+1;
						if (tab.closeRetries<3) {
							setTimeout(function(){WM.collector.close(tab);},1000);
						} else {
							log("WM.collector.close: Control of window handle lost; cannot recycle. Window may be too busy to communicate with, or has been closed manually.");
						}
						return;
					}
				} else {
					if (tab.hwnd) tab.hwnd.close();
				}
			} catch (e){log("WM.collector.close: recycler: "+e);}

			try{
				tab.hwnd=null;
				delete tab.signal;
				delete tab.stage;
				delete tab.closeTries;
			
				if (tab.toIntv) clearInterval(tab.toIntv);
				delete tab; 
				tab=null;
				WM.collector.count--
			}catch(e){log("WM.collector.close: destroy tab: "+e);}

			//check for items in queue to do next
			if (WM.collector.queue.length) {
				//check that queueing is still in practice
				if (WM.opts.queuetabs) {
					setTimeout(WM.collector.doNext,1000); //just do one
				} else {
					//options have changed since queueing was enacted, release all the queue into windows right now
					var offset=1000;
					while (WM.collector.queue.length && (WM.collector.count < WM.opts.maxrequests)) {
						setTimeout(WM.collector.doNext,offset); //open all, up to the limit set in options
						offset+=100;
					}
				}
			}

		} catch (e){log("WM.collector.close: "+e);}},

		closeAll : function() {try{
			//first delete the queue so close fx doesnt pick them up
			WM.collector.queue=[]; //empty but dont destroy

			//then close the active windows, moving any to the recycler if that is enabled
			for (var t in WM.collector.tabs) {
				WM.collector.close(WM.collector.tabs[t]);
			}

			//then close any recycled windows
			if (WM.collector.recycle.length) {
				for (var r=0, hwnd; r < WM.collector.recycle.length; r++) {
					if (hwnd=WM.collector.recycle[r]) {
						hwnd.close();
					}
				}
				WM.collector.recycle=[];
			}
		} catch (e){log("WM.collector.closeAll: "+e);}},
		
		createTimer : function(tab) {try{
			//create a timeout handler based on options and store the timer on the tab
			tab.toIntv=setTimeout(function(){
				if (tab) if (tab.stage!=4) doAction(function(){
					//tab has been active too long, do timeout
					log("WM.collector.timer: request timeout ("+tab.id+")",{level:3});
					WM.setAsFailed(null, -14, tab.post);
					WM.clearURL(tab);
				})
			},WM.opts.reqtimeout*1000);
		} catch (e){
			log("WM.collector.createTimer: "+e);}
		},

		cancelProcess : function(params) {try{
			params=params||{};
			var c = WM.collector;
			
			for (t in c.tabs) {
				if (c.tabs[t] && c.tabs[t][params.search] && c.tabs[t][params.search]==params.find){
					//matching collector tab found
					tab=c.tabs[t];
					
					//close the window
					c.close(tab);
				}
			}
		} catch (e){log("WM.collector.cancelProcess: "+e);}},
		
		refreshProcess : function(params) {try{
			params=params||{};
			var c = WM.collector;
			for (t in c.tabs) {
				if (c.tabs[t] && c.tabs[t][params.search] && c.tabs[t][params.search]==params.find){
					//matching collector tab found
					tab=c.tabs[t];
					
					//restart the window at its initial url
					if (tab.hwnd.location.href==tab.url) {
						tab.hwnd.location.reload();
					} else {
						tab.hwnd.location.href=tab.url;
					}
				}
			}
		} catch (e){log("WM.collector.refreshProcess: "+e);}},

	};

//***************************************************************************************************************************************
//***** Dynamic Grabberrabber Object
//***************************************************************************************************************************************
	WM.grabber = {
		tests:[],

		methods:["msg","fromID","fromName","url","body","html","targetID","targetName","caption","title","desc","comments",
				"commentorID","commentorName","likeName","likeID","link","either","img","canvas"],

		init:function(params){try{
			params=(params||{});
			var testsIn = getOptJSON("dynamics_"+WM.currentUser.profile) || [];
			var globalsIn = getOptJSON("dynamics_global") || {};
			//import locals and intermix globals we have a placeholder for
			if (isArrayAndNotEmpty(testsIn)) {
				for (var t=0; t<testsIn.length; t++) {
					if (testsIn[t].isGlobal) {
						//make sure the global test still exists
						var glob=globalsIn[testsIn[t].uniqueID]||null;
						if (glob){
							//merge global and local data
							//this retains our expanded/enabled parts
							var merge=mergeJSON(glob, testsIn[t]);
							WM.grabber.newTest(merge);
							//flag it so we don't import it again below
							glob.alreadyUsed=true;
						} else {
							//global missing, can't import
							log("WM.grabber.init: Global test missing, cannot merge");
						}
					} else {
						//load from locals
						WM.grabber.newTest(testsIn[t]);
					}
				}
			}
			//import all globals not already accounted for
			for (var t in globalsIn) {
				var glob=globalsIn[t];
				//avoid already imported globals
				if (!glob.alreadyUsed){
					glob.uniqueID=t;
					glob.isGlobal=true;
					WM.grabber.newTest(glob);
				}
			}
			
		}catch(e){log("WM.grabber.init: "+e);}},

		save:function(){try{
			var ret=[];
			var retGlobal={};
			
			if (isArrayAndNotEmpty(WM.grabber.tests)) {
				for (var t=0, len=WM.grabber.tests.length; t<len; t++){
					var test=WM.grabber.tests[t];
					if (!test.isGlobal) {
						//save it locally
						ret.push(test.saveableData);
					} else {
						//make a placeholder locally
						ret.push({isGlobal:true, uniqueID:test.uniqueID, enabled:test.enabled, expanded:test.expanded});
						//and save it globally
						var glob=test.saveableData;
						glob.uniqueID=test.uniqueID;
						retGlobal[test.uniqueID]=glob;
					}
				}
			}
			setOptJSON("dynamics_"+WM.currentUser.profile,ret);
			setOptJSON("dynamics_global",retGlobal);
		}catch(e){log("WM.grabber.save: "+e);}},

		newTest:function(params){try{
			params=params||{};
			var test = new WM.Test(params);
			WM.grabber.tests.push(test);
			WM.grabber.save();
		}catch(e){log("WM.grabber.newTest: "+e);}},

		importTest:function(){try{
			var params=prompt("Input test data",null);
			if (params) {
				WM.grabber.newTest(JSON.parse(params));
			}
		}catch(e){log("WM.grabber.importTest: "+e);}},

		//get the test object with id starting at optional node or at top level
		//may return null
		getTest:function(id,node){try{
			var nodes=(node||WM.grabber.tests);
			for (var i=0,len=nodes.length;i<len;i++){
				if (nodes[i]["id"]==id) {
					return nodes[i];
				} else if (nodes[i]["kids"]) {
					var ret = WM.grabber.getTest(id,nodes[i]["kids"]);
					if (ret) return ret;
				}
			}
		}catch(e){log("WM.grabber.getTest: "+e);}},
	};
	
//***************************************************************************************************************************************
//***** Test Class
//***************************************************************************************************************************************
	WM.Test = function(params){try{
		this.objType="test";
		var self=this;
		params=params||{};
		
		//defaults
		this.enabled=!(params.disabled||false); //check for WM2 disabled param
		this.expanded=true;
		this.title="";
		this.search=[]; //strings array
		this.find=""; //string
		this.findArray=[]; //string array
		this.kids=[]; //test array
		this.subTests=[]; //strings array
		this.parent=null;
		this.appID="";
		this.ret="dynamic";
		this._findMode="basic";
		this.subNumRange={low:0,high:0};
		this._isGlobal=false;
		
		this.__defineGetter__("saveableData",function(){try{
			var dat={};
				
			//dat.id=this.id;
			dat.label=this.title;
			dat.enabled=this.enabled;
			dat.search=this.search;
			dat.find=(this.findMode=="basic")?this.findArray:this.find;
			dat.ret=this.ret;
			dat.expanded=this.expanded;
			if (this.findMode=="subtests") dat.subTests=this.subTests;
			if (this.findMode=="subnumrange") {
				dat.subNumRange=this.subNumRange.low+","+this.subNumRange.high;
			}
			if (this.findMode=="regex") dat.regex=this.regex;
			dat.appID=this.appID;
			dat.kids=[];
			if (isArrayAndNotEmpty(this.kids)) for (var i=0,kid;(kid=this.kids[i]);i++) {
				dat.kids.push(kid.saveableData);
			}
			return dat;
		}catch(e){log("WM.Test.saveableData: "+e);}});
		
		//set/get wether this test is saved as global or profile
		this.__defineGetter__("isGlobal",function(){try{
			return this._isGlobal;
		}catch(e){log("WM.Test.isGlobal: "+e);}});
		this.__defineSetter__("isGlobal",function(v){try{
			//only top level tests can be global
			if (this.parent) {
				confirm("Only top level tests can be set to global.");
				return;
			} 
			
			if (!v) {
				if (!confirm("Disabling profile sharing on this test will prevent other users on this machine from loading it. Are you sure you wish to make this test locally available only?")) return;
			}
		
			this._isGlobal=v;
			
			//make sure we have a uniqueID
			//but don't destroy one that already exists
			if (v && !exists(this.uniqueID)) this.uniqueID = unique();
			
			//change the color/icon of the isGlobal button
			if (this.toggleGlobalButton) {
				var s=WM.opts.littleButtonSize;
				with (this.toggleGlobalButton) className=className.swapWordB(v,"removeGlobal"+s,"addGlobal"+s);
				with (this.toggleGlobalButton.parentNode) {
					className=className.swapWordB(v,"oddOrange","oddGreen");
					title=(v)?"Disable Profile Sharing":"Share With Other Profiles";
				}
			}
		}catch(e){log("WM.Test.isGlobal: "+e);}});
		
		//use passed params
		for (var p in params) {
			//omit specific params
			if (!(["subNumRange","kids","disabled","label","find"].inArray(p)) ) {
				//copy only params that make it past the checker
				this[p]=params[p];
			}
		}
		
		//calculate subNumRange as an object
		if (exists(params.subNumRange)) {
			var p=params.subNumRange.split(",");
			this.subNumRange={low:p[0]||0, high:p[1]||0};
			this._findMode="subnumrange";
		}
		
		//get the title from the label field
		if (exists(params.label)) this.title=params.label;
		
		//detect which findMode we are using
		//subNumRange was already inspected above
		if (this.regex) this._findMode="regex";
		else if (exists(params.subTests)) this._findMode="subtests";
		//and we default to "basic" already
		
		//import the find field now
		if (isArray(params.find)) this.findArray=params.find;
		else this.find=params.find;
				
		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			WM.grabber.save();
		}catch(e){log("WM.Test.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			WM.grabber.save();
		}catch(e){log("WM.Test.disable: "+e);}};

		this.remove=function(noConfirm){try{
			var ask=WM.opts.dynamicConfirmDeleteTest;
			if (noConfirm || (this.isGlobal && confirm("This test is shared with other profiles. Deleting it here will prevent it from loading for other users. Are you sure you wish to delete this test and its children.")) || !ask || (!this.isGlobal && ask && confirm("Delete test and all of its child nodes?"))){
				//remove my data
				var parentContainer=(this.parent)?this.parent.kids:WM.grabber.tests;
				parentContainer.removeByValue(this);
				//remove my node
				remove(this.node);
				
				doAction(WM.grabber.save);
			}
		}catch(e){log("WM.Test.remove: "+e);}};

		this.moveUp=function(){try{
			//where is this
			var parentContainer=(this.parent)?this.parent.kids:WM.grabber.tests;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					WM.grabber.save();
				}
			}
		}catch(e){log("WM.Test.moveUp: "+e);}};
		
		this.moveDown=function(){try{
			//where is this
			var parentContainer=(this.parent)?this.parent.kids:WM.grabber.tests;
			//only affects items not already the last in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					WM.grabber.save();
				}
			}
		}catch(e){log("WM.Test.moveDown: "+e);}};

		this.moveUpLevel=function(){try{
			if (this.parent) {
				//this is not a top level node, so we can move it
				var targetContainer=((this.parent.parent)?this.parent.parent.kids:WM.grabber.tests);
				//remove from parent
				this.parent.kids.removeByValue(this);
				//set new parent
				this.parent=(this.parent.parent||null); //never point to the top level
				//move the object
				targetContainer.push(this);
				//move the node
				if (this.parent) this.parent.kidsNode.appendChild(this.node);
				else WM.console.dynamicBuild.appendChild(this.node);
				
				//save it
				WM.grabber.save();
			}
		}catch(e){log("WM.Test.moveUpLevel: "+e);}};
		
		this.moveDownLevel=function(){try{
			//where is this
			var parentContainer=(this.parent)?this.parent.kids:WM.grabber.tests;
			//create a new rule at my level
			var newTest = new WM.Test({
				parent:this.parent||null,
			});
			parentContainer.push(newTest);
			//remove me from my current parent
			parentContainer.removeByValue(this);
			//attach me to my new parent
			this.parent=newTest;
			newTest.kids.push(this);
			//move my node
			newTest.kidsNode.appendChild(this.node);
			//save it
			WM.grabber.save();
		}catch(e){log("WM.Test.moveDownLevel: "+e);}};
		
		this.clone=function(){try{
			var cloneTest=this.saveableData;
			//global clones are not global
			if (this.parent) this.parent.addChild(cloneTest);
			else WM.grabber.newTest(cloneTest);
		}catch(e){log("WM.Test.clone: "+e);}};

		this.addChild=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			var test=new WM.Test(p);
			this.kids.push(test);
			if (isNew) WM.grabber.save();
		}catch(e){log("WM.Test.addChild: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=WM.opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			WM.grabber.save();
		}catch(e){log("WM.Test.toggleContent: "+e);}};
		
		this.populateBonusList=function(){try{
			var node=this.bonusNode;
			var bonuses={};
			//get the list of accept texts for this app
			if (this.appID!="") {
				if (this.appID=="*") {
					//populate list with bonuses from ALL docked sidekicks
				} else {
					//make sure the app is ready
					//if it has not yet docked, it wont be
					var app=WM.apps[this.appID];
					bonuses = (app?(mergeJSON(app.accText,app.userDefinedTypes)||{}):{});
				}
			}			
			//add special return values
			bonuses["dynamic"]="* Dynamic grab";
			bonuses["none"]="* None";
			bonuses["wishlist"]="* Flaged as Wishlist";
			bonuses["exclude"]="* Excluded types";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";
			bonuses["{%1}"]="* Subtest Value";

			//sort by display text
			bonuses=sortCollection(bonuses,"value");
			
			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in bonuses) {
				var showI=i.removePrefix(this.appID);
				node.appendChild(
					elem=createElement("option",{textContent:((bonuses[i].startsWith("*"))?"":((showI.startsWith("send"))?"Send ":"Get "))+bonuses[i], value:i, selected:(this.ret==i)})
				);
			}

		}catch(e){log("WM.Test.populateBonusList: "+e);}};
		
		this.populateAppList=function(){try{
			var node=this.appListNode;
			var a={};
			for (var i in WM.apps){
				a[WM.apps[i].appID]=WM.apps[i].name;
			}

			//add special return values
			a["*"]="* All";

			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in a) {
				node.appendChild(elem=createElement("option",{textContent:a[i], value:i,selected:(this.appID==i)}));
			}

			//sort it
			elementSortChildren(node,"textContent");
		}catch(e){log("WM.Test.populateAppList: "+e);}};

		this.calcSearch=function(){try{
			//collect the checked search fields in their listed order
			if (self.searchNode) {
				self.search=[];
				forNodes(".//input[(@type='checkbox')]",{node:self.searchNode},function(e){
					if (e && e.checked){
						self.search.push(e.value);
						log(e.value);
					}
				});
			}
			WM.grabber.save();
		}catch(e){log("WM.Test.calcSearch: "+e);}};
		
		this.convertToRule=function(p){try{
			var rule;
			WM.rulesManager.rules.push( 
				rule=new WM.rulesManager.Rule( WM.rulesManager.ruleFromTest( this.saveableData ) ) 
			);
			if (WM.opts.rulesJumpToNewRule){
				//jump to rule view
				WM.console.tabContainer.selectTab(3);
				//scroll to new rule
				rule.node.scrollIntoView();
			}
		}catch(e){log("WM.Test.convertToRule: "+e);}};		
		
		//set/get find field modes
		this.__defineGetter__("findMode",function(){try{
			return this._findMode;
		}catch(e){log("WM.Test.findMode: "+e);}});
		this.__defineSetter__("findMode",function(v){try{
			var lastV = this._findMode;
			this._findMode=v;
			if (lastV==v) return; //no change
			
			//enable disable regex type
			this.regex=(v=="regex" || v=="regexp");
			
			//switch to array/string find field type
			//this.setFindType((v=="basic")?"array":"string");
			
			//show the correct find field
			if (this.findNode) this.findNode.value=((v=="basic")?this.findArray.join("\n"):this.find);

			//show/hide the subtests box
			if (this.subTestsBoxNode) with (this.subTestsBoxNode) className=className.toggleWordB((v!="subtests"),"hidden");
			
			//show/hide the subnumrange picker
			if (this.subNumRangeBoxNode) with (this.subNumRangeBoxNode) className=className.toggleWordB((v!="subnumrange"),"hidden");
			
			WM.grabber.save();

		}catch(e){log("WM.Test.findMode: "+e);}});

		//draw it
		try{(((this.parent)?this.parent.kidsNode:null)||$("wmDynamicBuilder")).appendChild(
			this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
				createElement("div",{className:"line"},[
					createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
						this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+WM.opts.littleButtonSize:"treeExpand"+WM.opts.littleButtonSize)}),
					]),
					this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
						self.enabled=this.checked;
						with (self.node) className=className.toggleWordB(!this.checked,"disabled");
						WM.grabber.save();
					}}),
					createElement("label",{textContent:"Title:"}),
					this.titleNode=createElement("input",{value:(this.title||""), onchange:function(){self.title=this.value; WM.grabber.save();}}),
					
					//toolbox
					createElement("div",{className:"littleButton oddOrange", title:"Remove Test"},[
						createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize,onclick:function(){self.remove();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Clone Test"},[
						createElement("img",{className:"resourceIcon clone"+WM.opts.littleButtonSize,onclick:function(){self.clone();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
						createElement("img",{className:"resourceIcon arrowUp"+WM.opts.littleButtonSize,onclick:function(){self.moveUp();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
						createElement("img",{className:"resourceIcon arrowDown"+WM.opts.littleButtonSize,onclick:function(){self.moveDown();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up Level"},[
						createElement("img",{className:"resourceIcon moveUpLevelLeft"+WM.opts.littleButtonSize,onclick:function(){self.moveUpLevel();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down Level"},[
						createElement("img",{className:"resourceIcon moveInLevel"+WM.opts.littleButtonSize,onclick:function(){self.moveDownLevel();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Show Source"},[
						createElement("img",{className:"resourceIcon object"+WM.opts.littleButtonSize,onclick:function(){promptText(JSON.stringify(self.saveableData),true);}})]),

					createElement("div",{className:"indent littleButton oddBlue", title:"Convert To Rule"},[
						createElement("img",{className:"resourceIcon exportGrab"+WM.opts.littleButtonSize,onclick:function(){self.convertToRule();}})]),

					createElement("div",{className:"indent littleButton "+((this.isGlobal)?"oddOrange":"oddGreen"), title:((this.isGlobal)?"Disable Profile Sharing":"Share With Other Profiles")},[
						this.toggleGlobalButton=createElement("img",{className:"resourceIcon "+((this.isGlobal)?"removeGlobal":"addGlobal")+WM.opts.littleButtonSize,onclick:function(){self.isGlobal=!self.isGlobal; WM.grabber.save();}})]),
				]),
				this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
					//appID
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"appID:"}),
						this.appIDNode=createElement("input",{value:(this.appID||""), onchange:function(){self.appID=this.value;WM.grabber.save();self.populateBonusList();}}),
						this.appListNode=createElement("select",{onchange:function(){self.appIDNode.value=this.value; self.appID=this.value; WM.grabber.save(); self.populateBonusList();}}),
						createElement("div",{className:"littleButton oddBlue", title:"Refresh App List"},[
							createElement("img",{className:"resourceIcon refresh"+WM.opts.littleButtonSize,onclick:function(){self.populateAppList();}})]),
					]),
					//return type
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Return Type ('which'):"}),
						this.retNode=createElement("input",{value:(this.ret||"dynamic"), onchange:function(){self.ret=this.value;WM.grabber.save();}}),
						this.bonusNode=createElement("select",{onchange:function(){self.retNode.value=this.value; self.ret=this.value; WM.grabber.save();}}),
						createElement("div",{className:"littleButton oddBlue", title:"Refresh Bonus List"},[
							createElement("img",{className:"resourceIcon refresh"+WM.opts.littleButtonSize,onclick:function(){self.populateBonusList();}})]),
					]),
					//search list
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Search In Field(s):",title:"Specify fields in which to look for data. Adjust order as needed."}),
						this.searchNode=createElement("div",{className:"subsection optioncontainer"},(function(){
							var ret=[];
							
							//draw first the methods we have already selected
							if (isArrayAndNotEmpty(self.search)) for (var m=0; m<self.search.length; m++) {
								var s = self.search[m];
								ret.push(createElement("div",{className:"line"},[
									createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
										createElement("img",{className:"resourceIcon nomargin arrowUp16",onclick:function(){elementMoveUp(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
										createElement("img",{className:"resourceIcon nomargin arrowDown16",onclick:function(){elementMoveDown(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddGreen", title:"Move To Top"},[
										createElement("img",{className:"resourceIcon nomargin moveTopLeft16",onclick:function(){elementMoveTop(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move To Bottom"},[
										createElement("img",{className:"resourceIcon nomargin moveBottomLeft16",onclick:function(){elementMoveBottom(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("input",{type:"checkbox",value:s,checked:true,onchange:function(){self.calcSearch();}}),
									createElement("label",{textContent:s,title:WM.rulesManager.postParts[s]}),								
								]));
							}
							
							//draw the remaining items in their normal order
							for (var m=0; m<WM.grabber.methods.length; m++){
								var s = WM.grabber.methods[m];
								//prevent duplicates
								if (self.search.inArray(s)) continue;
								ret.push(createElement("div",{className:"line"},[
									createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
										createElement("img",{className:"resourceIcon nomargin arrowUp16",onclick:function(){elementMoveUp(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
										createElement("img",{className:"resourceIcon nomargin arrowDown16",onclick:function(){elementMoveDown(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddGreen", title:"Move To Top"},[
										createElement("img",{className:"resourceIcon nomargin moveTopLeft16",onclick:function(){elementMoveTop(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move To Bottom"},[
										createElement("img",{className:"resourceIcon nomargin moveBottomLeft16",onclick:function(){elementMoveBottom(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("input",{type:"checkbox",value:s,onchange:function(){self.calcSearch();}}),
									createElement("label",{textContent:s,title:WM.rulesManager.postParts[s]}),
								]));
							}
							
							return ret;
						})()),
					]),
					//find mode
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Find Mode:",title:"Choose the mode you will use to find text."}),
						this.findModeNode=createElement("select",{onchange:function(){self.findMode=this.value;}},[
							createElement("option",{selected:(this.findMode=="basic"),value:"basic",textContent:"Basic",title:"Search for a list of words or phrases."}),
							createElement("option",{selected:(this.findMode=="subnumrange"),value:"subnumrange",textContent:"Number Range",title:"Search for a range of numbers using an insertion point '{%1}' in your find parameter."}),
							createElement("option",{selected:(this.findMode=="subtests"),value:"subtests",textContent:"Sub Tests",title:"Search for a list of words or phrases using an insertion point '{%1}' in your find parameter."}),
							createElement("option",{selected:(this.findMode=="regex"),value:"regex",textContent:"Registered Expression",title:"Search for complex phrases using a regular expression."})
						]),
					]),
					//find list
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Find:",title:"One per line (basic mode), or a single regular expression. First match is used, so mind the order."}),
						createElement("div",{className:"subsection"},[
							this.findNode=createElement("textarea",{className:"fit",textContent:((this.findMode=="basic")?this.findArray.join("\n"):this.find), onchange:function(){
								if (self.findMode=="basic") self.findArray=this.value.split("\n");
								else self.find=this.value;
								WM.grabber.save();
							}}),
						])
					]),
					//subtests list
					this.subTestsBoxNode=createElement("div",{className:("line").toggleWordB(this.findMode!="subtests","hidden")},[
						createElement("label",{textContent:"Subtest Texts:",title:"Provide text replacements for the insertion point. No regular expressions."}),
						createElement("div",{className:"subsection"},[
							this.subTestsNode=createElement("textarea",{className:"fit",textContent:((isArray(this.subTests)?this.subTests.join("\n"):"")||""), onchange:function(){self.subTests=this.value.split("\n"); WM.grabber.save();}}),
						])
					]),
					//subnumrange picker
					this.subNumRangeBoxNode=createElement("div",{className:("line").toggleWordB(this.findMode!="subnumrange","hidden")},[
						createElement("label",{textContent:"Subtest Number Range:",title:"Provide a start and end range for the insertion point."}),
						this.subNumRangeLowNode=createElement("input",{value:this.subNumRange.low||0, onchange:function(){self.subNumRange.low=this.value; WM.grabber.save();}}),
						this.subNumRangeHighNode=createElement("input",{value:this.subNumRange.high||0, onchange:function(){self.subNumRange.high=this.value; WM.grabber.save();}}),
					]),
					//kids subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Child Tests:",title:"Child tests are nested tests which are applied to matching posts at the same time the parent test is applied. Child rules can have different return values that override the parent return value."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addChild();},title:"Add Child"},[
							createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize}),
						]),
						this.kidsNode=createElement("div",{className:"subsection"}),
					]),
				]),
			])
		);}catch(e){log("WM.Test.init.drawTest: "+e);}
		
		//populate my bonus list
		this.populateAppList();
		this.populateBonusList();

		//list the kids for this test
		if (isArrayAndNotEmpty(params.kids)) for (var i=0,kid; (kid=params.kids[i]); i++) {
			this.addChild(kid);
		}
		
		return self;
	}catch(e){log("WM.Test.init: ")+e}};

//***************************************************************************************************************************************
//***** Feed Objects
//***************************************************************************************************************************************
	WM.feedManager = {
		feeds : [],
		
		init : function(){
			var feedsIn=(getOptJSON("feeds3_"+WM.currentUser.profile)||[]);
			var feedsInGlobal=(getOptJSON("feeds3_global")||[]);
			
			if (isArrayAndNotEmpty(feedsIn)) {
				//import feeds from storage
				for (var f=0;f<feedsIn.length;f++){
					feed=feedsIn[f];
					if (!feed.isGlobal){
						WM.feedManager.feeds.push(new WM.Feed(feed));
					} else {
						var glob=feedsInGlobal[feed.uniqueID]||null;
						if (glob){
							var merge=mergeJSON(glob,feed);
							WM.feedManager.newFeed(merge);
							glob.alreadyUsed=true;
						} else {
							log("WM.feedManager.init: Global feed missing, cannot merge");
						}
					}
				}
			} else {
				//never been used before, create base feeds
				WM.feedManager.feeds.push(new WM.Feed({title:"My Home Feed", url:"https://graph.facebook.com/me/home", isRemoveable:false}));
				//WM.feedManager.feeds.push(new WM.Feed({title:"My Profile Wall", url:"https://graph.facebook.com/me/feed", isRemoveable:false}));
				
				//import oldstyle feeds
				var feedsOld=getOpt("feeds_"+WM.currentUser.profile);
				if (feedsOld){
					feedsOld=feedsOld.split("\n");
					if (isArrayAndNotEmpty(feedsOld)) for (var f=0;f<feedsOld.length;f++) {
						//prevent empties
						if (feedsOld[f]) {
							//create the new feed
							WM.feedManager.newFeed({id:feedsOld[f],title:feedsOld[f]});
						}
					}
				}
				WM.feedManager.save();
			}
			//import all global feeds not already accounted for
			for (var t in feedsInGlobal) {
				var glob=feedsInGlobal[t];
				if (!glob.alreadyUsed){
					glob.uniqueID=t;
					glob.isGlobal=true;
					WM.feedManager.newFeed(glob); //newFeed adds app filters, where New Feed() does not
				}
			}
		},
		
		newFeed : function(params){
			params=params||{};
			var feed = new WM.Feed(params);
			WM.feedManager.feeds.push(feed);
			
			//add filters for each app available
			for (var a in WM.apps){
				feed.addFilter({id:"app_"+a});
			}
		},
		
		save :function(){
			var retFeeds=[];
			var retGlobal={};
			
			if (isArrayAndNotEmpty(WM.feedManager.feeds)) for (var f=0,len=WM.feedManager.feeds.length; f<len; f++){
				var feed=WM.feedManager.feeds[f];
				if (!feed.isGlobal) {
					retFeeds.push(feed.saveableData);
				} else {
					retFeeds.push({isGlobal:true, uniqueID:feed.uniqueID, enabled:feed.enabled, expanded:feed.expanded});
					var glob=feed.saveableData;
					glob.uniqueID=feed.uniqueID;
					retGlobal[feed.uniqueID]=glob;
				}
			}
			setOptJSON("feeds3_"+WM.currentUser.profile,retFeeds);
			setOptJSON("feeds3_global",retGlobal);
		},
		
	};

//***************************************************************************************************************************************
//***** FeedFilter Class
//***************************************************************************************************************************************
	WM.FeedFilter = function(params){try{
		this.objType="feedFilter";
		params=params||{};
		var self=this;
		
		//set defaults
		this.enabled=true;
		this.expanded=true;
		this._olderLimitReached=false;
		//initialize edges to the collector startup time
		this.oldedge=Math.round(timeStamp()/1000); //older edge timestamp
		this.newedge=Math.round(timeStamp()/1000); //newer edge timestamp
		
		//use passed params
		for (var p in params) this[p]=params[p];

		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			WM.feedManager.save();
		}catch(e){log("WM.FeedFilter.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			WM.feedManager.save();
		}catch(e){log("WM.FeedFilter.disable: "+e);}};

		this.toggle=function(){try{
			this.enabled=this.toggleNode.checked;
			this.node.className=this.node.className.swapWordB(this.enabled,"enabled","disabled");
			WM.feedManager.save();
		}catch(e){log("WM.FeedFilter.toggle: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=WM.opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			WM.feedManager.save();
		}catch(e){log("WM.FeedFilter.toggleContent: "+e);}};
		
		//remove this
		this.remove=function(){try{
			if (this.node) remove(this.node);
			if (this.parent) delete this.parent.filters[this.id];
			WM.feedManager.save();
		}catch(e){log("WM.FeedFilter.remove: "+e);}};
		
		//fetch posts for this
		this.fetchNewer=function(){try{
			WM.fetch({
				newer:true,
				apps:WM.apps[this.appID],
				feeds:[this.parent],
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
				bypassFilterDisabled:true,
			});
		}catch(e){log("WM.FeedFilter.fetchNewer: "+e);}};

		this.fetchOlder=function(){try{
			WM.fetch({
				older:true,
				apps:WM.apps[this.appID],
				feeds:[this.parent],
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
				bypassFilterDisabled:true,
			});
		}catch(e){log("WM.FeedFilter.fetchOlder: "+e);}};
		
		this.__defineGetter__("olderLimitReached",function(){try{
			return this._olderLimitReached;
		}catch(e){log("WM.FeedFilter.olderLimitReached: "+e);}});
		this.__defineSetter__("olderLimitReached",function(v){try{
			this._olderLimitReached=v;
			//update the sidekick page button graphics
			var node=this.olderLimitNode;
			if (node) node.textContent=v;
			if (v) {
				WM.rulesManager.doEvent("onFeedFilterOlderLimitReached",this);
			}
		}catch(e){log("WM.FeedFilter.olderLimitReached: "+e);}});

		this.__defineGetter__("appID",function(){try{
			//this assumes its an app filter because so far thats all we use
			return this.id.removePrefix("app_");
		}catch(e){log("WM.FeedFilter.appID: "+e);}});

		this.__defineGetter__("appName",function(){try{
			//this assumes its an app filter because so far thats all we use
			//it also assumes app objects are global, which they are
			//but that they are also available and already filled in by the sidekick, which they may not be
			var a = WM.apps[this.appID];
			if (a!=undefined) {
				//debug.print([this.appID,a]);
				return a.name;
			}
			return "";
		}catch(e){log("WM.FeedFilter.appName: "+e);}});
		
		//draw it
		try{
			if (this.parent.filtersNode) this.parent.filtersNode.appendChild(
				this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+WM.opts.littleButtonSize:"treeExpand"+WM.opts.littleButtonSize)}),
						]),
						this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
							self.enabled=this.checked;
							with (self.node) className=className.toggleWordB(!this.checked,"disabled");
							WM.feedManager.save();
						}}),
						createElement("span",{textContent:this.appName + " (" + this.id + ")"}),
						
						//toolbox
						createElement("div",{className:"littleButton oddBlue", title:"Fetch Newer"},[
							this.fetchNewerButton=createElement("img",{className:"resourceIcon rssUpRight"+WM.opts.littleButtonSize,onclick:function(){self.fetchNewer();} })
						]),
						createElement("div",{className:"littleButton", title:"Fetch Older"},[
							this.fetchOlderButton=createElement("img",{className:"resourceIcon rssDownLeft"+WM.opts.littleButtonSize,onclick:function(){self.fetchOlder();} })
						]),
					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Older Limit Reached: ",title:"Reports if this filter has reached the user defined oldest post limit."}),
							this.olderLimitNode=createElement("span",{textContent:this.olderLimitReached}),
						]),
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Newer Edge: ",title:"A Unixtime indicator of the newest post-time you have fetched for this filter."}),
							this.newedgeNode=createElement("span",{textContent:this.newedge}),
						]),
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Older Edge: ",title:"A Unixtime indicator of the oldest post-time you have fetched for this filter."}),
							this.oldedgeNode=createElement("span",{textContent:this.oldedge}),
						]),
					]),
				])
			);
		}catch(e){log("WM.FeedFilter.init:addManagerElement: "+e);};				
		
		return self;
	}catch(e){log("WM.FeedFilter.init: "+e);}};

//***************************************************************************************************************************************
//***** Feed Class
//***************************************************************************************************************************************
	WM.Feed = function(params){try{
		this.objType="feed";
		params=params||{};
		var self=this;

		//set defaults
		this.enabled=true;
		this.expanded=true;
		this.url="";
		this.id="";
		this.filters={};
		this.feedName="";
		this.isRemoveable=true; //set to false on own feeds
		this.title="New Feed";
		this._isGlobal=false;

		//use passed params
		var newFilters=params.filters||{};
		delete params.filters;
		
		this.__defineGetter__("isGlobal",function(){try{
			return this._isGlobal;
		}catch(e){log("WM.Feed.isGlobal: "+e);}});
		this.__defineSetter__("isGlobal",function(v){try{			
			if (!v) {
				if (!confirm("Disabling profile sharing on this feed will prevent other users on this machine from loading it. Are you sure you wish to make this feed locally available only?")) return;
			}
		
			this._isGlobal=v;
			
			//make sure we have a uniqueID
			//but don't destroy one that already exists
			if (v && !exists(this.uniqueID)) this.uniqueID = unique();
			
			//change the color/icon of the isGlobal button
			if (this.toggleGlobalButton) {
				var s=WM.opts.littleButtonSize;
				with (this.toggleGlobalButton) className=className.swapWordB(v,"removeGlobal"+s,"addGlobal"+s);
				with (this.toggleGlobalButton.parentNode) {
					className=className.swapWordB(v,"oddOrange","oddGreen");
					title=(v)?"Disable Profile Sharing":"Share With Other Profiles";
				}
			}
		}catch(e){log("WM.Feed.isGlobal: "+e);}});
		
		this.__defineGetter__("saveableData",function(){try{
			var ret={};
			
			ret.title=this.title;
			ret.enabled=this.enabled;
			ret.expanded=this.expanded;
			ret.isRemoveable=this.isRemoveable;
			ret.url=this.url;
			if (this.isRemoveable) ret.id=this.id;
			
			//capture filters
			ret.filters={};
			for (var f in this.filters) {
				ret.filters[f]={
					enabled:this.filters[f].enabled,
					expanded:this.filters[f].expanded,
					id:this.filters[f].id,
				};
			}
			
			return ret;
		}catch(e){log("WM.Feed.saveableData: "+e);}});		
				
		for (var p in params) this[p]=params[p];

		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			WM.feedManager.save();
		}catch(e){log("WM.Feed.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			WM.feedManager.save();
		}catch(e){log("WM.Feed.disable: "+e);}};

		this.toggle=function(){try{
			this.enabled=this.toggleNode.checked;
			this.node.className=this.node.className.swapWordB(this.enabled,"enabled","disabled");
			WM.feedManager.save();
		}catch(e){log("WM.Feed.toggle: "+e);}};

		//create a filter for a specific app
		//filter id must be "app_"+appID
		//will not add duplicates
		this.addFilter=function(params){try{
			var isNew=!exists(params);
			params=params||{};
			params.parent=this;
			
			//prevent duplicates
			if (!exists(this.filters[params.id])) {
				return (this.filters[params.id]=new WM.FeedFilter(params));
				if (isNew) WM.feedManager.save();
			} else {
				return this.filters[params.id];
			}
		}catch(e){log("WM.Feed.addFilter: "+e);}};	

		//get the extents of the feed by merging all feed filter oldedge/newedge values
		this.getMergedEdges=function(params){
			/*
				apps[]: an array of appID's to test against, otherwise read from all filters
			*/
			
			//console.log("getMergedEdges: "+JSON.stringify(params));
			
			
			var retval = {newedge:Math.round(timeStamp()/1000), oldedge:0};
			
			if (params.apps||null){
				for (var c=0,l=params.apps.length;c<l;c++){
					var filter = this.filters["app_"+params.apps[c]];
					if (filter||null){
						//get the youngest older edge and oldest newer edge so we don't lose posts because one feed is more active.
						//this forces them to run at the same edges after the first pull
						retval.newedge = Math.min(retval.newedge, filter.newedge);
						retval.oldedge = Math.max(retval.oldedge, filter.oldedge);
					} else {
						log("getMergedEdges: no filter matching app_"+params.apps[c]+" on feed " + this.id);
					}
				}
			} else {
				for (var name in this.filters){
					var filter = this.filters[name];
					if (filter||null){
						//get the youngest older edge and oldest newer edge so we don't lose posts because one feed is more active.
						//this forces them to run at the same edges after the first pull
						retval.newedge = Math.min(retval.newedge, filter.newedge);
						retval.oldedge = Math.max(retval.oldedge, filter.oldedge);
					} else {
						log("getMergedEdges: no filter matching "+name+" on feed " + this.id);
					}
				}
				
			}
			
			return retval;
			
		};
		
		//remove this
		this.remove=function(noConfirm){try{
			if (this.isRemoveable) {
				var ask=WM.opts.feedsConfirmDeleteFeed;
				if (noConfirm || (this.isGlobal && confirm("This feed is shared with other profiles. Deleting it here will prevent it from loading for other users. Are you sure you wish to delete this feed and its filters.")) || !ask || (!this.isGlobal && ask && confirm("Delete feed and all of its filters?"))){
					//remove my data
					if (this.node) remove(this.node);
					WM.feedManager.feeds.removeByValue(this);
					
					WM.feedManager.save();
				}
			}
		}catch(e){log("WM.Feed.remove: "+e);}};

		//fetch posts for this
		this.fetchNewer=function(){try{
			WM.fetch({
				newer:true,
				feeds:[this],
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
			});
		}catch(e){log("WM.Feed.fetchNewer: "+e);}};

		this.fetchOlder=function(){try{
			WM.fetch({
				older:true,
				feeds:[this],
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
			});
		}catch(e){log("WM.Feed.fetchOlder: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=WM.opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			WM.feedManager.save();
		}catch(e){log("WM.Feed.toggleContent: "+e);}};

		if (this.id && !this.url) this.url="https://graph.facebook.com/"+this.id+"/feed";
		
		//draw it
		try{
			WM.console.feedManagerNode.appendChild(
				this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+WM.opts.littleButtonSize:"treeExpand"+WM.opts.littleButtonSize)}),
						]),
						this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
							self.enabled=this.checked; 
							with (self.node) className=className.toggleWordB(!this.checked,"disabled");
							WM.feedManager.save();
						}}),
						this.titleNode=createElement("input",{value:(this.title||""), onchange:function(){self.title=this.value; WM.feedManager.save();}}),
						
						//toolbox
						createElement("div",{className:"littleButton oddBlue", title:"Fetch Newer"},[
							this.fetchNewerButton=createElement("img",{className:"resourceIcon rssUpRight"+WM.opts.littleButtonSize,onclick:function(){self.fetchNewer();} })
						]),
						createElement("div",{className:"littleButton", title:"Fetch Older"},[
							this.fetchOlderButton=createElement("img",{className:"resourceIcon rssDownLeft"+WM.opts.littleButtonSize,onclick:function(){self.fetchOlder();} })
						]),
						(this.isRemoveable)?createElement("div",{className:"littleButton oddOrange", title:"Remove Feed"},[
							this.removeButtonNode=createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize,onclick:function(){self.remove();} })
						]):null,
						
						(this.isRemoveable)?createElement("div",{className:"indent littleButton "+((this.isGlobal)?"oddOrange":"oddGreen"), title:((this.isGlobal)?"Disable Profile Sharing":"Share With Other Profiles")},[
							this.toggleGlobalButton=createElement("img",{className:"resourceIcon "+((this.isGlobal)?"removeGlobal":"addGlobal")+WM.opts.littleButtonSize,onclick:function(){self.isGlobal=!self.isGlobal; WM.feedManager.save();}})
						]):null,

					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						(this.isRemoveable)?createElement("div",{className:"line"},[
							createElement("label",{textContent:"Target FB Entity: ",title:"The request address from where WM gets posts for this fb entity."}),
							this.idNode=createElement("input",{value:(this.id||""), onchange:function(){
								self.id=this.value;
								self.url="https://graph.facebook.com/"+this.value+"/feed";
								self.urlNode.textContent=self.url;
								WM.feedManager.save();
							}}),
							createElement("label",{textContent:"URL: ",title:"The request address from where WM gets posts for this fb entity."}),
							this.urlNode=createElement("span",{textContent:this.url}),
						]):null,
						//app filters sub box
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"App Filters: ",title:"This is a list of filters run on this feed by apps you collect for. Only filters for sidekick-supported apps are used."}),
							this.filtersNode=createElement("div",{className:"subsection"}),
						]),
					]),
				])
			);
		}catch(e){log("WM.Feed.init:addManagerElement: "+e);};		
		
		//add any passed filters
		for (var f in newFilters){
			this.addFilter(newFilters[f]);
		}
		
		return self;
	}catch(e){log("WM.Feed.init: "+e);}};
	
//***************************************************************************************************************************************
//***** Friend Objects
//***************************************************************************************************************************************
	WM.friendTracker = {
		friends: {},
		
		init : function(){
			//import friends tracker data
			var friendsIn=getOptJSON('friends_'+WM.currentUser.profile)||[];
			if (isArrayAndNotEmpty(friendsIn)) for (var f=0,len=friendsIn.length;f<len;f++) {
				WM.friendTracker.newFriend(friendsIn[f],true);
			}
			WM.friendTracker.sort();
		},
		
		clean : function(){
			//clean friend tracker data
			var len=0;
			if (WM.opts.useFriendTracker && (len=WM.friendTracker.friends.length)) {
				var ageDays=WM.opts.trackDays*day;
				var timeNow=timeStamp();
				for (var f=0; f<len; f++){
					var friend=WM.friendTracker.friends[f];
					if (friend.data && friend.data.posts){
						for (var p in friend.data.posts){
							var post=friend.data.posts[p];
							if ((timeNow-(post.date*1000)) > ageDays) {
								delete friend.data.posts[p];
							}
						}
					}
				}
			}
		},
		
		clearAll : function(noConfirm){
			var ask=WM.opts.trackConfirmClearUser;
			if (noConfirm || !ask || (ask && confirm("Clear tracker history for all users?"))){
				for (var f in WM.friendTracker.friends){
					WM.friendTracker.friends[f].remove(true);
				}
			}			
		},
		
		newFriend : function(params,preventSort){
			params=params||{};
			var friend = new WM.Friend(params);
			WM.friendTracker.friends[friend.id]=friend;
			if (!preventSort) WM.friendTracker.sort();
			return friend;
		},

		save :function(){
			var ret=[];
			for (var f in WM.friendTracker.friends){
				ret.push(WM.friendTracker.friends[f].saveableData);
			}
			setOptJSON("friends_"+WM.currentUser.profile,ret);
		},
		
		sort : function(params){
			params=params||{};
			
			if (exists(params.sortBy)) WM.quickOpts.sortFriendsBy=params.sortBy;
			if (exists(params.sortOrder)) WM.quickOpts.sortFriendsOrder=params.sortOrder;
			WM.saveQuickOpts();

			var sortBy=params.sortBy||WM.quickOpts.sortFriendsBy||"name"
			var sortOrder=params.sortOrd||WM.quickOpts.sortFriendsOrder||"asc"
			
			var friendArray=[];
			for (var f in WM.friendTracker.friends) {
				friend=WM.friendTracker.friends[f];
				friendArray.push({id:friend[sortBy],node:friend.node});
			}
			
			if (["asc","ascending"].inArray(sortOrder)) friendArray.sort(function(a,b){return a.id>b.id;});
			else if (["desc","descending"].inArray(sortOrder)) friendArray.sort(function(a,b){return a.id<b.id;});
			
			for (var f=0,len=friendArray.length; f<len; f++) {
				WM.console.friendBuild.appendChild(friendArray[f].node);
			}
		},
		
		track : function(post){
			//dont track stuff older than our older tracking limit
			var limit=WM.opts.trackTime*day;
			if ( ( timeStamp()-(post.date*1000) ) < limit ) {
				//get/create the friend record
				var friend=WM.friendTracker.friends[post.fromID]||null;
				if (!friend) {
					friend=WM.friendTracker.newFriend({id:post.fromID,name:post.fromNameLastFirst});
				}
				//check if this is newer than last known post
				if (WM.opts.trackLastKnownPost) {
					var data=friend.lastKnownPost;
					if (data) {
						if (data.date<post.date){
							data.date=post.date;
							//data.id=post.id.removePrefix(post.fromID+"_");
						}
					} else {
						friend.data.lastKnownPost={date:post.date};
					}
				}
				//add it to history
				if (WM.opts.trackCreated){
					var data={date:post.date};
					if (WM.opts.trackFailed){
						data.failed=(post.status<0 && post.status !=-4 && post.status !=-6);
					}
					if (WM.opts.trackAccepted){
						data.accepted=(post.status>0 || post.status ==-4 || post.status ==-6);
					}
					friend.data.posts[post.id.removePrefix(post.fromID+"_")]=data;
				}
				//save it
				friend.updateStats();
				WM.friendTracker.save();
				
				//push events
				WM.rulesManager.doEvent("onFriendDataChanged",friend);
			}
		},
		
		trackStatus : function(post,acceptOrFail){
			var friend=WM.friendTracker.friends[post.fromID]||null;
			if (friend) {
				var data=friend.data.posts[post.id]||null;
				if (data){
					if (acceptOrFail) {
						data.accepted=true;
						delete data.failed;
					} else {
						data.failed=true;
						delete data.accepted;
					}
					friend.updateStats();
					WM.rulesManager.doEvent("onFriendDataChanged",friend);
				} else {
					//if post does not exists, we had more errors elsewhere
					//or post id not fit our history range
				}
			} else {
				//if friend does not exist, we had errors elsewhere
				//don't bother fixing it here
			}
		},
	};

//***************************************************************************************************************************************
//***** Friend Class
//***************************************************************************************************************************************
	WM.Friend = function(params){try{
		this.objType="friend";
		params=params||{};
		var self=this;

		//set defaults
		this.expanded=false;
		this.id="";
		this.name="";
		
		this.data={
			lastKnownPost:{date:0},
			posts:{},
		};

		this.__defineGetter__("saveableData",function(){try{
			var ret={};
			
			ret.id=this.id;
			ret.name=this.name;
			ret.enabled=this.enabled;
			ret.expanded=this.expanded;
			
			//capture posts data
			ret.data=this.data;
			
			return ret;
		}catch(e){log("WM.Friend.saveableData: "+e);}});		
						
		for (var p in params) this[p]=params[p];

		//remove this
		this.remove=function(noConfirm){try{
			var ask=WM.opts.trackConfirmClearUser;
			if (noConfirm || !ask || (ask && confirm("Clear history for this user?"))){
				//remove my data
				if (this.node) remove(this.node);
				delete WM.friendTracker.friends[this.id];					
				WM.friendTracker.save();
			}
		}catch(e){log("WM.Friend.remove: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=WM.opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			WM.friendTracker.save();
		}catch(e){log("WM.Friend.toggleContent: "+e);}};
		
		this.addToFeeds=function(){try{
			WM.feedManager.newFeed({id:this.id, title:this.name});
			WM.feedManager.save();
		}catch(e){log("WM.Friend.addToFeeds: "+e);}};
		
		this.countAccepted=function(){try{
			var c=0;
			if (this.data.posts) for (var p in this.data.posts) {
				var post=this.data.posts[p];
				if (post.accepted) c++;
			}
			return c;
		}catch(e){log("WM.Friend.countAccepted: "+e);}};

		this.countFailed=function(){try{
			var c=0;
			if (this.data.posts) for (var p in this.data.posts) {
				var post=this.data.posts[p];
				if (post.failed) c++;
			}
			return c;
		}catch(e){log("WM.Friend.countFailed: "+e);}};

		this.countCreated=function(){try{
			var c=0;
			if (this.data.posts) for (var p in this.data.posts) {
				c++
			}
			return c;
		}catch(e){log("WM.Friend.countFailed: "+e);}};

		this.__defineGetter__("lastKnownPost",function(){try{
			if (this.data && (this.data.lastKnownPost||null)){
				return this.data.lastKnownPost;
			}
			return {id:null,date:0};
		}catch(e){log("WM.Friend.lastKnownPost: "+e);}});
		this.__defineGetter__("lastKnownPostDate",function(){try{
			if (this.data && (this.data.lastKnownPost||null)){
				return this.data.lastKnownPost.date;
			}
			return 0;
		}catch(e){log("WM.Friend.lastKnownPostDate: "+e);}});
		this.__defineGetter__("acceptCount",function(){try{
			return this.countAccepted();
		}catch(e){log("WM.Friend.acceptCount: "+e);}});
		this.__defineGetter__("failCount",function(){try{
			return this.countFailed();
		}catch(e){log("WM.Friend.failCount: "+e);}});
		this.__defineGetter__("postCount",function(){try{
			return this.countCreated();
		}catch(e){log("WM.Friend.postCount: "+e);}});
		this.__defineGetter__("totalCount",function(){try{
			return this.failCount+this.acceptCount;
		}catch(e){log("WM.Friend.totalCount: "+e);}});
		
		this.updateStats=function(){try{
			var n=this.statsNode;
			if (n) {
				if (WM.opts.trackLastKnownPost){
					d=new Date(((this.lastKnownPost.date*1000)||0)).toLocaleString();
					if (!this.lastPostNode) {
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Last Known Post Date: "}),
							this.lastPostNode=createElement("span",{textContent:d})
						]));
					} else {
						this.lastPostNode.textContent=d;
					}
				}

				if (WM.opts.trackCreated){
					if (!this.countCreatedNode) {
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Posts Created: "}),
							this.countCreatedNode=createElement("span",{textContent:this.countCreated()})
						]));
					} else {
						this.countCreatedNode.textContent=this.countCreated();
					}
				}
				
				if (WM.opts.trackAccepted){
					if (!this.countAcceptedNode){
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Posts Accepted: "}),
							this.countAcceptedNode=createElement("span",{textContent:this.countAccepted()})
						]));
					} else {
						this.countAcceptedNode.textContent=this.countAccepted();
					}
				}
				
				if (WM.opts.trackFailed){
					if (!this.countFailedNode){
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Posts Failed: "}),
							this.countFailedNode=createElement("span",{textContent:this.countFailed()})
						]));
					} else {
						this.countFailedNode.textContent=this.countFailed();
					}
				}
			}
		}catch(e){log("WM.Friend.updateStats: "+e);}};
		
		//draw it
		try{
			WM.console.friendBuild.appendChild(
				this.node=createElement("div",{className:"listItem"},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+WM.opts.littleButtonSize:"treeExpand"+WM.opts.littleButtonSize)}),
						]),
						this.titleNode=createElement("input",{value:(this.name||""), onchange:function(){self.name=this.value; WM.friendTracker.save();}}),
						
						//toolbox
						createElement("div",{className:"littleButton", title:"Add To Feeds"},[
							createElement("img",{className:"resourceIcon addFeed"+WM.opts.littleButtonSize,onclick:function(){self.addToFeeds();} })
						]),
						createElement("div",{className:"littleButton oddOrange", title:"Clear Data"},[
							createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize,onclick:function(){self.remove();} })
						]),
						createElement("div",{onclick:function(){window.open("http://www.facebook.com/profile.php?id="+self.id,"_blank");},title:"Visit Wall",className:"littleButton oddBlue"},[
							createElement("img",{className:"resourceIcon openInNewWindow"+WM.opts.littleButtonSize})
						]),
					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"ID: ",title:"The facebook id of this user."}),
							createElement("span",{textContent:self.id}),
						]),
						//post data sub box
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Statistics: ",title:"Statistics you selected to track."}),
							this.statsNode=createElement("div",{className:"subsection"}),
						]),
					]),
				])
			);
		}catch(e){log("WM.Friend.init:addManagerElement: "+e);};	

		this.updateStats();
		
		return self;
	}catch(e){log("WM.Friend.init: "+e);}};
	
//***************************************************************************************************************************************
//***** Rules Manager Object
//***************************************************************************************************************************************
	WM.rulesManager = {
			
		rules:[],

		init:function(params){try{
			params=(params||{});
			
			// build a kidsNode getter
			WM.rulesManager.__defineGetter__("kidsNode",function(){try{
				return $("wmPriorityBuilder");
			}catch(e){log("WM.rulesManager.kidsNode: "+e);}});

			//import rules
			WM.rulesManager.rules=[];
			var rulesIn=getOptJSON("priority3_"+WM.currentUser.profile)||{};
			var globalsIn=getOptJSON("priority3_global")||{};
			
			//detect early beta rule lists
			if (isObject(rulesIn)) for (var i in rulesIn){
				var rule=rulesIn[i];
				WM.rulesManager.rules.push( new WM.rulesManager.Rule(rule) );
				//don't bother with globals here
				
			//or use current version rule arrays
			} else if (isArrayAndNotEmpty(rulesIn)) for (var i=0,rule;(rule=rulesIn[i]);i++) {
				if (rule.isGlobal) {
					var glob=globalsIn[rule.uniqueID]||null;
					if (glob){
						var merge=mergeJSON(glob,rule);
						WM.rulesManager.rules.push( new WM.rulesManager.Rule(merge) );
						glob.alreadyUsed=true;
					} else {
						log("WM.rulesManager.init: Global rule missing, cannot merge");
					}
				} else {
					WM.rulesManager.rules.push( new WM.rulesManager.Rule(rule) );
				}
				
			}
			
			//import all globals not already accounted for
			for (var t in globalsIn) {
				var glob=globalsIn[t];
				//avoid already imported globals
				if (!glob.alreadyUsed){
					glob.uniqueID=t;
					glob.isGlobal=true;
					WM.rulesManager.rule.push( new WM.rulesManager.Rule(glob) );
				}
			}
			
			
		}catch(e){log("WM.rulesManager.init: "+e);}},
		
		//check to see if any rules match the post object
		doEvent:function(event,obj){
			//log("WM.rulesManager.doEvent: event="+event+", post="+post.id);
			for (var r=0,rule;(rule=WM.rulesManager.rules[r]);r++){
				if (rule.enabled) (function(){rule.doEvent(event,obj);})();
			}
		},
		
		//convert a test (such as dynamic grab entry) to a rule
		ruleFromTest:function(test){
			//[{"id":"_h6qil21n","label":"new test","search":["body"],"find":["nothing"],"ret":"dynamic","kids":[{"id":"_h6qiw4zf","find":[]}],"appID":"102452128776","disabled":true}]
			//[{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[{"search":["body"],"operand":"lessThan","find":"chipmunk"}],"actions":[{"event":"onIdentify","action":"setColor","params":"orange"}],"kids":[{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]},{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]}],"eggs":[{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]},{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]}]}]
			var ret={
				title:(test.label||test.title)||"Converted Dynamic Test",
				enabled:!(test.disabled||false),
				limit:0,
				limitCount:0,
				expanded:true,
				validators:function(){
					var ret=[];
					//add the initial validator
					ret.push({
						search:["appID"],
						operand:"equals",
						find:test.appID
					});
					//detect search/find method
					var method="basic";
					if (isArrayAndNotEmpty(test.subTests) && test.find.contains("{%1}")) method="subTests";
					if (exists(test.subNumRange) && test.find.contains("{%1}")) method="subNumRange";
					if (test.regex==true) method="regexp";
					if (method=="regexp") {
						//leave the expression just as it is
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:test.find,
						});
					} else if (method=="basic") {
						//convert the test.find array into a regular espression
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:arrayToRegExp(test.find),
						});
					} else if (method=="subTests") {
						//insert the subTests into the find insertion point as a regular expression
						//but make the rest of the find parameter not return if found
						var find=test.find;
						if (find.contains("{%1}")){
							find=find.split("{%1}");
							find=(find[0].length?("(?:"+find[0]+")"):"")+arrayToRegExp(test.subTests)+(find[1].length?("(?:"+find[1]+")"):"");
						}
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:find
						});
					} else if (method=="subNumRange") {
						//insert the subNumRange into the find insertion point as a regular expression
						//but make the rest of the find parameter not return if found
						var numRange=("string"==typeof test.subNumRange)?test.subNumRange.split(","):[test.subNumRange.low,test.subNumRange.high];
						var find=test.find;
						if (find.contains("{%1}")){
							find=find.split("{%1}");
							find=(find[0].length?("(?:"+find[0]+")"):"")+integerRangeToRegExp({min:numRange[0],max:numRange[1]})+(find[1].length?("(?:"+find[1]+")"):"");
						}
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:find
						});
					}
					return ret;
				}(),
				actions:[
					{
						event:"onIdentify",
						action:"setWhich",
						params:test.ret||"dynamic",
					}
				],
				kids:[],
				eggs:[],				
			};
			
			//convert children
			if (isArrayAndNotEmpty(test.kids)) {
				for (var k=0,kid;(kid=test.kids[k]);k++) {
					ret.kids.push(WM.rulesManager.ruleFromTest(kid));
				}
			}
			
			return ret;
		},
		
		//create a rule based on a specific post
		ruleFromPost:function(post){
			//create some data to get us started
			var rule={
				basedOn:post,
				title:"Based On: "+post.id,
				enabled:false, //start out not using this rule
				validators:[
					{search:["appID"],find:post.appID,operand:"equals"},
					{search:["title"],find:post.name,operand:"matchRegExp"},
					{search:["caption"],find:post.caption,operand:"matchRegExp"},
					{search:["desc"],find:post.description,operand:"matchRegExp"},
					{search:["link"],find:post.linkText,operand:"matchRegExp"},
				],
				actions:[
					{event:"onIdentify",action:"setWhich",params:"dynamic"}
				]
			};
			WM.rulesManager.rules.push(rule=new WM.rulesManager.Rule(rule));

			if (WM.opts.rulesJumpToNewRule){
				//jump to rule view
				WM.console.tabContainer.selectTab(3);
				//scroll to new rule
				rule.node.scrollIntoView();
			}
		},
		
		//copy all dynamics to new rules
		//does not destroy dynamics as they are converted
		convertDynamics:function(){
			var tests=WM.grabber.tests;
			if (isArrayAndNotEmpty(tests)) {
				for (var t=0,test;(test=tests[t]);t++){
					WM.rulesManager.rules.push( new WM.rulesManager.Rule( WM.rulesManager.ruleFromTest(test) ) );
				}
			}
		},

		//rest rule limits for all rules and their children
		resetAllLimits:function(params){
			params=params||{};
			var ask=WM.opts.rulesConfirmResetLimit;
			if (params.noConfirm || !ask || (ask && confirm("Reset Limit Counter?"))) {
				if (isArrayAndNotEmpty(WM.rulesManager.rules)) for (var r=0,rule;(rule=WM.rulesManager.rules[r]);r++) {
					rule.resetLimit({preventSave:true,resetChildren:true,noConfirm:true});
				}
				WM.rulesManager.saveRules();
			}
		},
		
		saveRules : function(){try{
			//pack rule objects
			var retRules=[];
			var retGlobal={};
			
			if (isArrayAndNotEmpty(WM.rulesManager.rules)) {
				for (var r=0,rule; (rule=WM.rulesManager.rules[r]);r++){
					if (!rule.isGlobal) {
						retRules.push(rule.saveableData);
					} else {
						//make a placeholder locally
						retRules.push({isGlobal:true, uniqueID:rule.uniqueID, enabled:rule.enabled, expanded:rule.expanded});
						//and save it globally
						var glob=rule.saveableData;
						glob.uniqueID=rule.uniqueID;
						retGlobal[rule.uniqueID]=glob;						
					}
				}
			}
			
			//save rules
			setOptJSON("priority3_"+WM.currentUser.profile,retRules);
			setOptJSON("priority3_global",retGlobal);
		}catch(e){log("WM.rulesManager.saveRules: "+e);}},	
		
		showData : function(){try{
			promptText(getOpt("priority3_"+WM.currentUser.profile),true);
		}catch(e){log("WM.rulesManager.showData: "+e);}},	

		newRule : function(p){try{
			var rule=new WM.rulesManager.Rule(p);
			WM.rulesManager.rules.push(rule);
			WM.rulesManager.saveRules(); 
		}catch(e){log("WM.rulesManager.newRule: "+e);}},

		importRule: function(){try{
			var params=prompt("Input rule data",null);
			if (params) {
				var convertedInput=JSON.parse(params);
				if (isArray(convertedInput)){
					for (var i=0;i<convertedInput.length;i++){
						WM.rulesManager.newRule(convertedInput[i]);
					}
				} else {
					WM.rulesManager.newRule(convertedInput);
				}
			}
		}catch(e){log("WM.rulesManager.importRule: "+e);}},
	};
	
//***************************************************************************************************************************************
//***** Rules Manager Enums & Functions
//***************************************************************************************************************************************
	WM.rulesManager.ruleActions = {
		"addToFeeds":{name:"Add Poster To Feeds",toolTip:"Add the post's creator to your feeds manager. Can also be used with onFriend* events."}, 
		"appendLink":{name:"Append To Link",toolTip:"Add specific code to the end of the collection link.",hasParam:true,paramType:"textBox","default":""},
		"birth":{name:"Birth Eggs",toolTip:"Clone the egg children to this rule's level, without destroying this rule."}, 
		"cancelInterval":{name:"Cancel Interval",toolTip:"Destroy the repeating timer on this rule."},
		"cancelTimer":{name:"Cancel Timer",toolTip:"Destroy the timer on this rule."} ,
		"cleanPost":{name:"Clean Post",toolTip:"Remove the calling post from the collector."}, 
		"commentPost":{name:"Comment Post",toolTip:"Create a comment on the calling post.",hasParam:true,paramLabel:"comment",paramType:"string","default":"Thanks!"}, 
		"createInterval":{name:"Create Interval",toolTip:"Create a repeating timer on this rule, where 1000 equals 1 second.",hasParam:true,paramType:"timePicker","default":1000} ,
		"createTimer":{name:"Create Timer",toolTip:"Create a timer on this rule, where 1000 equals 1 second.",hasParam:true,paramType:"timePicker","default":1000},
		"decrementCounter":{name:"Decrement Limit Counter",toolTip:"Decrement the rule limit counter.",hasParam:true,paramType:"number","default":1},
		"decrementParentCounter":{name:"Decrement Parent Limit Counter",toolTip:"Decrement the parent rule limit counter.",hasParam:true,paramType:"number","default":1},
		"destroyRule":{name:"Destroy Rule",toolTip:"Permanently removes this rule and all of its children."},
		"disableApp":{name:"Disable App",toolTip:"Disable the specified app. Leave blank to disable the app associated with the activating post.",hasParam:true,paramType:"textBox","default":""},
		"disableAppOption":{name:"Disable App Option",toolTip:"Disable an option in the related sidekick by internal name.",hasParam:true,paramType:"textBox","default":""},
		"disableAutocomment":{name:"Disable Autocomment",toolTip:"Disable the autocomment feature."},
		"disableAutolike":{name:"Disable Autolike",toolTip:"Disable the autolike feature."},
		"disableChildRules":{name:"Disable Child Rules",toolTip:"Disable the immediate children of this rule. Does not disable this rule."},
		"disableHostOption":{name:"Disable Host Option",toolTip:"Disable an option in the wm host by internal name.",hasParam:true},
		"disableRule":{name:"Disable Rule",toolTip:"Disable the current rule."}, 
		"emergencyOpen":{name:"Emergency Open",toolTip:"Move the calling post directly to a new processing window, no matter what your opened window limit is."}, 
		"emptyAutolikeQueue":{name:"emptyAutolikeQueue",toolTip:"Destroys the list of posts you intended to autolike or autocomment."}, 
		"enableApp":{name:"Enable App",toolTip:"Enable the specified app. Leave blank to enable the app associated with the activating post.",hasParam:true,paramType:"textBox","default":""},
		"enableAppOption":{name:"Enable App Option",toolTip:"Enable an option in the related sidekick by internal name.",hasParam:true,paramType:"textBox","default":""},
		"enableAutocomment":{name:"Enable Autocomment",toolTip:"Enable the autocomment feature."},
		"enableAutolike":{name:"Enable Autolike",toolTip:"Enable the autolike feature."},
		"enableChildRules":{name:"Enable Child Rules",toolTip:"Enable the immediate children of this rule."}, 
		"enableHostOption":{name:"Enable Host Option",toolTip:"Enable an option in the wm host by internal name.",hasParam:true},
		"enableRule":{name:"Enable Rule",toolTip:"Enable the current rule."}, 
		"fetchNewer":{name:"Fetch Newer Posts",toolTip:"Fetch some more posts for this app, feed or feed filter."}, 
		"fetchOlder":{name:"Fetch Older Posts",toolTip:"Fetch some more posts for this app, feed or feed filter."}, 
		"fetchHours":{name:"Fetch Hours of Posts",toolTip:"Fetch some more posts for this app, feed or feed filter.",hasParam:true,paramType:"number","default":24}, 
		"forceOpen":{name:"Force Open",toolTip:"Move the calling post directly to the collector queue."}, 
		"forceOpenFirst":{name:"Force Open First",toolTip:"Move the calling post directly to the collector queue AND cut in line to be next processed."}, 
		"hatch":{name:"Hatch Eggs",toolTip:"Hatch the egg-children of the current rule, and destroy this rule."}, 
		"incrementCounter":{name:"Increment Limit Counter",toolTip:"Increment the rule limit counter.",hasParam:true,paramType:"number","default":1},
		"incrementParentCounter":{name:"Increment Parent Limit Counter",toolTip:"Increment the parent rule limit counter.",hasParam:true,paramType:"number","default":1},
		"likePost":{name:"Like Post",toolTip:"Like the calling post."}, 
		"openPostSource":{name:"Open Post Source",toolTip:"Opens the post source in a separate window/tab."},
		"processLast":{name:"Move To Bottom",toolTip:"Move the post to the bottom of the collector window."}, 
		"processFirst":{name:"Move To Top",toolTip:"Move the post to the top of the collector window."}, 
		"pauseAllApps":{name:"Pause All Apps",toolTip:"Pause all apps currently associated with docked sidekicks."}, 
		"pauseApp":{name:"Pause App",toolTip:"Pauses processing anything by this app.",hasParam:true,paramType:"textBox","default":""}, 
		"pauseWM.collector":{name:"Pause WM.collector",toolTip:"Pauses collection of all posts."}, 
		"pauseFetch":{name:"Pause Fetching",toolTip:"Pauses fetching of all posts."}, 
		"pauseType":{name:"Pause Type",toolTip:"Pause collection of all bonuses of this type."}, 
		"pinPost":{name:"Pin Post",toolTip:"Pins the calling post."}, //pin the post
		"queueCommentPost":{name:"Queue Comment Post",toolTip:"Comment on the calling post by first using the autolike queue system to delay the autocomment.",hasParam:true,paramLabel:"comment",paramType:"string","default":"Thanks!"},
		"queueLikePost":{name:"Queue Like Post",toolTip:"Like the calling post by first using the autolike queue system to delay the autolike."},
		"refreshBrowser":{name:"Refresh Browser",toolTip:"Reloads the browser window."}, 
		"reIDAll":{name:"ReID All",toolTip:"Re-ID all posts in the collector."},
		"removePriority":{name:"Remove Priority",toolTip:"Sets the priority of the calling post to normal."}, 
		"removePriorityApp":{name:"Remove Priority (App)",toolTip:"Sets the priority of all posts of the calling or specified app to normal.",hasParam:true,paramType:"textBox","default":""}, 
		"removePriorityType":{name:"Remove Priority (Type)",toolTip:"Sets the priority of all posts of the calling app with specified or associated type to normal.",hasParam:true,paramType:"textBox","default":"dynamic"}, 
		"resetAllLimits":{name:"Reset All Limit Counters",toolTip:"Reset all limits in the rules manager."},
		"resetLimit":{name:"Reset Limit Counter",toolTip:"Reset the limit counter of the current rule."},
		"resetBranchLimits":{name:"Reset Branch Limit Counters",toolTip:"Reset the limit counter of ALL rules that are lower in this branch (children, grandchildren, etc.). Does not reset the limit on this rule."},
		"resetChildrenLimits":{name:"Reset Children Limit Counters",toolTip:"Reset the limit counter of immediate child rules of this rule. Does not reset the limit on this rule."},
		"resetParentLimit":{name:"Reset Parent Limit Counter",toolTip:"Reset the limit counter of the parent rule."},
		"setAppOption":{name:"Set App Option",toolTip:"Set an option in the related sidekick by internal name.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox","default":"",paramLabel:"Name"},{paramType:"textBox","default":"",paramLabel:"Value"}]},
		"setAppTab":{name:"Set App Tab",toolTip:"Set the current collection tab by app ID.",hasParam:true,paramType:"textBox","default":"all"},
		"setAsAccepted":{name:"Set As Accepted",toolTip:"Set the calling post as accepted.",hasParam:true,paramType:"checkBox",paramLabel:"saveToHistory","default":false},
		"setAsExcluded":{name:"Set As Excluded",toolTip:"Set the calling post as excluded."}, 
		"setAsFailed":{name:"Set As Failed",toolTip:"Set the calling post as failed.",hasParam:true,paramType:"checkBox",paramLabel:"saveToHistory","default":false},
		"setColor":{name:"Set Post Color",toolTip:"Set the background color of the calling post.",hasParam:true,paramType:"colorPicker","default":"blue"},
		"setHostOption":{name:"Set Host Option",toolTip:"Set the value a host option by internal name.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox","default":"",paramLabel:"Name"},{paramType:"textBox","default":"",paramLabel:"Value"}]},
		"setPriority":{name:"Set Priority",toolTip:"Set the priority of the calling post.",hasParam:true,paramType:"number","default":50}, 
		"setPriorityApp":{name:"Set Priority (App)",toolTip:"Set the priority of the calling app or specified app.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox",paramLabel:"App","default":""},{paramType:"number",paramLabel:"Priority","default":50}]}, 
		"setPriorityType":{name:"Set Priority (Type)",toolTip:"Set the priority of the calling post type or specified type for the same app.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox",paramLabel:"Type Code","default":""},{paramType:"number",paramLabel:"Priority","default":50}]}, 
		"setToCollect":{name:"Set To Collect",toolTip:"Set the calling post to be collected in normal order. Use Force Open to do more immediate collection, or Emergency Open to override your opened window limit."},
		"setToCollectPriority1":{name:"Set To Collect Top Priority",toolTip:"Set the calling post to be collected and also set its priority to 1. Use Force Open to do more immediate collection, or Emergency Open to override your opened window limit."},
		"setWhich":{name:"Set Type",toolTip:"Set the bonus type id of the calling post.",hasParam:true,paramType:"textBox","default":"dynamic"},	
		"uncheckType":{name:"Uncheck Post Type",toolTip:"Unchecks option to collect this bonus in the options menu."},		
		"unpauseAllApps":{name:"Unpause All Apps",toolTip:"Unpause all apps currently associated with docked sidekicks."}, 
		"unpauseAllTypesAllApps":{name:"Unpause All Types",toolTip:"Unpause all bonus types by all apps."}, 
		"unpauseAllTypesByApp":{name:"Unpause All Types By App",toolTip:"Unpause all bonus types associated with the given app, or the app associated with the activating post.",hasParam:true,paramType:"textBox","default":""}, 
		"unpauseApp":{name:"Unpause App",toolTip:"Starts processing anything by this app.",hasParam:true,paramType:"textBox","default":""},		
		"unpauseWM.collector":{name:"Unpause WM.collector",toolTip:"Starts collection of posts."}, 
		"unpauseFetch":{name:"Unpause Fetching",toolTip:"Starts fetching of posts."}, 
		"unpauseType":{name:"Unpause Type",toolTip:"Unpause collection of all bonuses of this type."}, 
	};
	
	WM.rulesManager.ruleActionsCodes = {
		"addToFeeds":1,"appendLink":2,"birth":3,"cancelInterval":4,"cancelTimer":5,"cleanPost":6,"commentPost":7,"createInterval":8,"createTimer":9,
		"decrementCounter":10,"decrementParentCounter":11,"destroyRule":12,"disableApp":13,"disableAppOption":14,"disableAutolike":15,"disableChildRules":16,
		"disableHostOption":17,"disableRule":18,"emergencyOpen":19,"emptyAutolikeQueue":20,"enableApp":21,"enableAppOption":22,"enableAutolike":23,
		"enableChildRules":24,"enableHostOption":25,"enableRule":26,"fetchNewer":27,"fetchOlder":28,"forceOpen":29,"forceOpenFirst":30,"hatch":31,
		"incrementCounter":32,"incrementParentCounter":33,"likePost":34,"openPostSource":35,"processLast":36,"processFirst":37,"pauseAllApps":38,
		"pauseApp":39,"pauseWM.collector":40,"pauseFetch":41,"pauseType":42,"pinPost":43,"queueCommentPost":44,"queueLikePost":45,"refreshBrowser":46,
		"reIDAll":47,"removePriority":48,"removePriorityApp":49,"removePriorityType":50,"resetAllLimits":51,"resetLimit":52,"resetBranchLimits":53,
		"resetChildrenLimits":54,"resetParentLimit":55,"setAppOption":56,"setAppTab":57,"setAsAccepted":58,"setAsExcluded":59,"setAsFailed":60,"setColor":61,
		"setHostOption":62,"setPriority":63,"setPriorityApp":64,"setPriorityType":65,"setToCollect":66,"setToCollectPriority1":67,"setWhich":68,
		"uncheckType":69,"unpauseAllApps":70,"unpauseAllTypesAllApps":71,"unpauseAllTypesByApp":72,"unpauseApp":73,"unpauseWM.collector":74,"unpauseFetch":75,
		"unpauseType":76,"fetchHours":77,"enableAutocomment":78,"disableAutocomment":79
	};
	
	WM.rulesManager.ruleActionByCode = function(code){
		for (c in WM.rulesManager.ruleActionsCodes) {
			if (WM.rulesManager.ruleActionsCodes[c]==code) return c;
		}
		return null;
	};	
	
	WM.rulesManager.ruleEvents = {
		//post events
		"onIdentify":"Called after a post is (re)identified. Posts are first identified as soon as they are fetched.",
		"onBeforeCollect":"Called before collection opens a sidekick window.",
		"onAfterCollect":"Called after collection is tried. Activates regardless of return status.",
		"onFailed":"Called when a post is marked failed. This could be actual or simulated by the user.",
		"onAccepted":"Called when a post is marked accepted. This could be actual or simulated by the user.",
		"onTimeout":"Called when a post is marked as timed out. This could be actual or simulated by the user.",
		"onValidate":"Called when a post is first fetched, but after its first identification. Not called on posts which fail identification.",
		
		//rule events
		"onLimit":"Called when this rule limit counter equals the rule's limit.",
		"onHatch":"Called when this rule's egg children are hatched.",		
		"onTimer":"Called when the timer on this rule activates.",
		"onInterval":"Called when the repeating timer on this rule activates.",
		"onBirth":"Called when this rule's egg children are birthed.",
		"onRuleCreated":"Called when the rule is created (or loaded on startup).",
		"onRuleButtonClicked":"Called when the rule button is clicked. Available only for control rules.",
		
		//app events
		"onSidekickDock":"Called when the sidekick for this app docks.",
		"onSidekickReady":"Called when the sidekick for this app creates an app object, and after it appends the collection tab for that app.",
		/*
			paused/unpaused
			enabled/disabled
			failCountChanged
			acceptCountChanged
			
		*/
		
		//console events
		"onHeartbeat":"Called when the global heartbeat interval ticks.",
		"onSetAppFilter":"Called when the collection panel app tab changes, including at startup if 'Show All' is selected as default",
		
		//feed events
		"onFeedFilterOlderLimitReached":"Called when a specific feed filter reaches its user-defined older limit.",
		
	};
	
	WM.rulesManager.ruleEventsCodes ={
		"onIdentify":1,"onBeforeCollect":2,"onAfterCollect":3,"onFailed":4,"onAccepted":5,"onTimeout":6,"onValidate":7,"onLimit":8,"onHatch":9,"onTimer":10,
		"onInterval":11,"onBirth":12,"onRuleCreated":13,"onSidekickDock":14,"onSidekickReady":15,"onHeartbeat":16,"onSetAppFilter":17,
		"onFeedFilterOlderLimitReached":18,"onRuleButtonClicked":19
	};
	
	WM.rulesManager.ruleEventByCode = function(code){
		for (c in WM.rulesManager.ruleEventsCodes) {
			if (WM.rulesManager.ruleEventsCodes[c]==code) return c;
		}
		return null;
	};	
	
	WM.rulesManager.postParts = {
		"age":"The time between the current time and the post creation time (in ms).",
		"acceptCount":"An app's accept counter value. Friend objects also have an acceptCount.",
		"activatorType":"Returns the object type of the rule-activating object: app, post, rule, feed, feedfilter or unknown.",
		"alreadyProcessed":"Reports if a post has already created a history entry.",
		"appID":"The appID of the game for which a post belongs. You can read the appID from the following affected objects: app, post, and feedFilter.",
		"appName":"The appName of the game for which this post belongs, as reported by the FB database.",
		"body":"The body of a post is a compilation of the title, caption, and desc.",
		"canvas":"The canvas of a post is its namespace granted by FB, ie. FarmVille's namespace is 'onthefarm'.",
		"caption":"The caption of a post is one line just below its title (or 'name'). Not all posts have this field.",
		"commentorID":"The commentorID is a list of IDs of all commentors.",
		"commentorName":"The commentorName is a list of names of all commentors.",
		"comments":"The comments are list of all comments made to the post, excluding the initial msg.",
		"currentTime":"The current time (in ms) on your system, not localized. This global value can be referenced from any activating object type.",
		"currentAppTab":"The currently selected collection tab's appID, or the word 'all' if the 'Show All' tab is selected.",
		"date":"The date of a post is its creation time on FB, and is the 'created_time' parameter in fb data packets.",
		"desc":"The desc of a post is two lines below the title. This is the 'description' parameter in fb data packets. Not all posts have this field.",
		"either":"The either of a post is the compilation of the link and body.",
		"enabled":"The enabled state of an activating object.",
		"expanded":"The expanded state of an activating object.",
		"failCount":"An app's fail counter value. Friend objects also have a failCount.",
		"fromID":"The fromID is the ID of the poster.",
		"fromName":"The fromName is the name of the poster.",
		"fromNameLastFirst":"The name of the poster, displayed as Lastname, Firstname",
		"html":"The html of a post is the compilation of ALL visible FB attributes.",		
		"id":"Normally a post ID, which is usually the post creator's ID and a timestamp separated by an underscore. Alternately, you can ask for the id of an activating friend, feed or feed filter object.",
		"idText":"The identified link text of a post.",
		"img":"The img of a post is the url of the icon that displays with the post. This is the 'picture' parameter in fb data packets.",
		"isAccepted":"Reports if the post is set as having already been successfully collected.",
		"isAppPaused":"Reports if the associated app is paused.",
		"isCollect":"Reports if the post is set to be collected.",
		"isExcluded":"Reports if the post has been set as excluded.",
		"isFailed":"Reports if the post is set as having already failed.",
		"isForMe":"Reports if the W2W post targets the current user.",
		"isLiked":"Reports if the post has been identified as already being liked by the current user.",
		"isMyPost":"Reports if the post belongs to the current user.",
		"isPaused":"Reports if the calling object (post or app) is paused. Not specific!",
		"isPinned":"Reports if the post is marked as being pinned.",
		"isRemovable":"Reports if a feed is removeable. Your own profile wall and your home feed are not removeable, only disableable.",
		"isTimeout":"Reports if the post has been marked as a timed out collection attempt.",
		"isTypePaused":"Reports if the associated bonus type is paused.",
		"isScam":"Reports if a post is suspected of being a scam, usually when the canvas and appName do not match.",
		"isStale":"Reports if a post is older than the user-set older limit.",
		"isUndefined":"Reports if the post does not match any id given by the sidekick.",
		"isWishlist":"Reports if the post is deemed a whichlist request.",
		"isWorking":"Reports if the post is currently in the working state (being processed).",
		"isW2W":"Reports if the post is a Wall-To-Wall post, meaning that it was posted to a specific user's wall.",
		"lastKnownPostDate":"A friend object's last known post date (as unix time, no millisecond data).",
		"likeID":"The likeID is a list of IDs of users who liked the post.",
		"likeName":"The likeName is a list of names of users who liked this post.",
		"limit":"This rule's limit number.",
		"limitCount":"This rule's limit counter.",
		"link":"The 'link' of a post is the link text, not the url. This is the 'action.name' in fb data packets.",
		"linkHref":"The original url as it appeared from facebook. This SHOULD be exactly the same as 'url'.",
		"linkText":"The original link text as it appeared from facebook. You may want to NOT use 'link' and instead use this one.",
		"msg":"The msg of a post is the part the poster added as a comment during the post's creation.",
		"name":"With posts, this is the same as 'title', because its the FB name of a post object. With friend objects, this is the friend's text name.",
		"parentLimit":"The parent rule's limit number, or NULL if no parent exists.",
		"parentLimitCount":"The parent rule's limit counter, or NULL if no parent exists.",
		"postCount":"A friend object's count of posts it is tracking.",
		"postedDay":"A partial date-time value containing only the year/month/day portions, which corresponds to the post creation time.",
		"postedHour":"A partial date-time value containing only the year/month/day/hour portions, which corresponds to the post creation time.",
		"priority":"The priority of a post which could have been set by a rule, or by default of 50.",
		"status":"The status of a post is the return code given by a sidekick, or 0 if it has not been processed.",
		"targetID":"The targetID is a list of targets' IDs that the poster intended the post to display to.",
		"targetName":"The targetName is a list of targets the poster intended the post to display to.",
		"title":"The title of a post contains the bold text, usually including the poster's name, at the top of the post. This is the 'name' parameter in facebook data packets.",
		"totalCount":"An app's failcount and acceptcount combined. Friend objects also have a totalCount.",
		"typesPaused":"An app's list of paused bonus types. Only accessible from an activating post. Please stick to the contains/notContains operators because this is an array, not text.",
		"url":"The url of a post is the address to which the post redirects the user when clicked. This is the 'link' or 'action.link' parameter in fb data packets. This is the original url supplied by the app, not a modified url, such as WM's removal of https or a sidekick-modified url. Alternately, you can ask for the URL of a feed object.",
		"which":"The 'which' of a post is its identified codename that defines its bonus type and ties it to option menu entries. The codename starts with an appID and ends with something the sidekick developer uses to key the bonus type.",
		"whichText":"Text associated with this bonus type.",
	};
	
	WM.rulesManager.postPartsCodes = {
		"age":1,"acceptCount":2,"activatorType":3,"alreadyProcessed":4,"appID":5,"appName":6,"body":7,"canvas":8,"caption":9,"commentorID":10,
		"commentorName":11,"comments":12,"currentTime":13,"currentAppTab":14,"date":15,"desc":16,"either":17,"enabled":18,"expanded":19,"failCount":20,
		"fromID":21,"fromName":22,"fromNameLastFirst":23,"html":24,"id":25,"idText":26,"img":27,"isAccepted":28,"isAppPaused":29,"isCollect":30,
		"isExcluded":31,"isFailed":32,"isForMe":33,"isLiked":34,"isMyPost":35,"isPaused":36,"isPinned":37,"isRemovable":38,"isTimeout":39,"isTypePaused":40,
		"isScam":41,"isStale":42,"isUndefined":43,"isWishlist":44,"isWorking":45,"isW2W":46,"lastKnownPostDate":47,"likeID":48,"likeName":49,"limit":50,
		"limitCount":51,"link":52,"linkHref":53,"linkText":54,"msg":55,"name":56,"parentLimit":57,"parentLimitCount":58,"postCount":59,"postedDay":60,
		"postedHour":61,"priority":62,"status":63,"targetID":64,"targetName":65,"title":66,"totalCount":67,"typesPaused":68,"url":69,"which":70,
		"whichText":71
	};
	
	WM.rulesManager.postPartByCode = function(code){
		for (c in WM.rulesManager.postPartsCodes) {
			if (WM.rulesManager.postPartsCodes[c]==code) return c;
		}
		return null;
	};
	
	WM.rulesManager.ruleOperands = {
		"equals":"Property and query must match.",
		"notEquals":"Property and query must not match.",
		"startsWith":"Property must start with query value.",
		"notStartsWith":"Property cannot start with query value.",
		"endsWith":"Property must end with query value.",
		"notEndsWith":"Property cannot end with query value.",
		"contains":"Property contains anywhere the query value.",
		"notContains":"Property does not contain the query value.",
		"matchRegExp":"Property must match the registered expression.", 
		"notMatchRegExp":"Property must not match the registered expression.",
		"greaterThan":"Property must be greater than query value.",
		"lessThan":"Property must be less than query value.",
		"greaterThanOrEquals":"Property must be greater than or equal to query value.",
		"lessThanOrEquals":"Property must be less than or equal to query value.",

		"equalsExactly":"Property and query must match exactly via binary comparison.",
		"notEqualsExactly":"Property and query must not match exactly via binary comparison.",
		
	};

	WM.rulesManager.ruleOperandsCodes = {
		"equals":1,
		"notEquals":2,
		"startsWith":3,
		"notStartsWith":4,
		"endsWith":5,
		"notEndsWith":6,
		"contains":7,
		"notContains":8,
		"matchRegExp":9, 
		"notMatchRegExp":10,
		"greaterThan":11,
		"lessThan":12,
		"greaterThanOrEquals":13,
		"lessThanOrEquals":14,
		"equalsExactly":15,
		"notEqualsExactly":16,
		
	};	
	
	WM.rulesManager.ruleOperandByCode = function(code){
		for (c in WM.rulesManager.ruleOperandsCodes) {
			if (WM.rulesManager.ruleOperandsCodes[c]==code) return c;
		}
		return null;
	};	
	
//***************************************************************************************************************************************
//***** RuleValidator Class
//***************************************************************************************************************************************
	WM.rulesManager.RuleValidator = function(params){try{
		var isNew=(!exists(params));
		var self=this;
	
		//return saveable data from this branch
		this.__defineGetter__("saveableData",function(){try{
			var s=self.search, modSearch=[]; //use a second array to avoid accidental overwrite of first byRef
			for (var c=0;c<s.length;c++){
				modSearch.push(WM.rulesManager.postPartsCodes[s[c]]);
			}
			var ret = {search:modSearch, operand:WM.rulesManager.ruleOperandsCodes[self.operand], find:self.find}
			return ret;
		}catch(e){log("WM.rulesManager.RuleValidator.saveableData: "+e);}});

		//remove this from parent
		this.remove=function(){try{
			var ask=WM.opts.rulesConfirmDeleteValidator;
			if (!ask || (ask && confirm("Delete rule validator?"))){
				remove(this.node);
				this.parent.validators.removeByValue(this);
				doAction(WM.rulesManager.saveRules);
			}
		}catch(e){log("WM.rulesManager.RuleValidator.remove: "+e);}};
	
		this.moveUp=function(){try{
			//where is this
			var parentContainer = this.parent.validators;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					WM.rulesManager.saveRules();
				}
			}
		}catch(e){log("WM.rulesManager.RuleValidator.moveUp: "+e);}};

		//move down in the list
		this.moveDown=function(){try{
			//where is this
			var parentContainer = this.parent.validators;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					WM.rulesManager.saveRules();
				}
			}
		}catch(e){log("WM.rulesManager.RuleValidator.moveDown: "+e);}};

		//copy this validator on the parent
		this.clone=function(){try{
			this.parent.addValidator({search:this.search, operand:this.operand, find:this.find});
			WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.RuleValidator.clone: "+e);}};

		//init
		//this.id=params.id||unique();
		this.parent=params.parent||null;
		if (!this.parent) {
			log("WM.rulesManager.RuleValidator: no parent specified: abort init");
			return null;
		}
		//this.validationNode=parent.validationNode;
		this.search=params.search||["appID"];
		if (!isArray(this.search)) this.search=[].push(this.search);
		//convert number codes to text commands
		for (var e in this.search) {
			//t=this.search[e];
			if (isNumber(this.search[e])) this.search[e]=WM.rulesManager.postPartByCode(this.search[e]);
			//log([this.search[e],t])
		}
		this.operand=params.operand||"matchRegExp";
		if (isNumber(this.operand)) this.operand=WM.rulesManager.ruleOperandByCode(this.operand);
		this.find=params.find||"";
				
		//draw it
		this.parent.validationNode.appendChild(this.node=createElement("div",{className:"validator"},[
			//search portion for this validator
			createElement("div",{className:"line"},[
				this.searchNode=(this.objSearch=new jsForms.comboBox({
					className:"jsfComboBox selectPostPart",
					onChange:function(){
						self.search=this.value;
						WM.rulesManager.saveRules();
					},
					items:(function(){
						var ret=[];
						for (var i in WM.rulesManager.postParts){
							ret.push(new jsForms.checkBox({
								text:i,
								value:i,
								toolTipText:WM.rulesManager.postParts[i],
								checked:(self.search.inArray(i)),
								size:{width:"200%"},
							}));
						}
						return ret;
					})(),
					borderStyle:"none",
					//borderRadius:{topLeft:"1px", bottomRight:"1px",topRight:"1px",bottomLeft:"1px"},
					//explicitClose:true,
					highlightSelected:true,					
					dropDownSize:{height:"200px"},
					backColor:"#EEEEEE",
				})).node,
							
				//operator portion for this validator
				this.operandNode=createElement("select",{className:"selectOperand",onchange:function(){self.operand=this.value;WM.rulesManager.saveRules();}},(function(){
					var ret=[],elem;
					for (var i in WM.rulesManager.ruleOperands){
						ret.push(elem=createElement("option",{textContent:i,value:i,title:WM.rulesManager.ruleOperands[i]}));
						if (i==self.operand) elem.selected=true;
					}
					return ret;
				})()),
				//find portion for this validator
				/*
					right here we need to bring up an element based on
						the post part chosen
					for most cases, we just need an input box to accept string values
					for special case "which" we need a dropdown of bonus types
					for boolean flags we need a default value of true and maybe 
						some kind of limitation to true and false in the box
				*/
				this.findNode=createElement("input",{className:"findBox",value:this.find,onchange:function(){self.find=this.value;WM.rulesManager.saveRules();}}),
				//toolbox
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.remove();},title:"Delete Validator"},[
					createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddBlue",onclick:function(){self.clone();},title:"Clone Validator"},[
					createElement("img",{className:"resourceIcon clone"+WM.opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddGreen",onclick:function(){self.moveUp();},title:"Move Up"},[
					createElement("img",{className:"resourceIcon arrowUp"+WM.opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.moveDown();},title:"Move Down"},[
					createElement("img",{className:"resourceIcon arrowDown"+WM.opts.littleButtonSize}),
				]),
				(self.parent.basedOn)?createElement("div",{className:"indent littleButton oddBlue",onclick:function(){
					//if a validator search array exists
					if (isArrayAndNotEmpty(self.search)){
						//fill the 'find' box with the post data linked to the search terms
						var f="";
						var post=self.parent.basedOn;
						for (var s=0;s<self.search.length;s++){
							if (s>0) f+=" ";
							f+=(post.testData[self.search[s]]||post[self.search[s]]||"");
						}
						self.findNode.value=f;
						self.find=f;
						WM.rulesManager.saveRules();
					}
				},title:"Capture Text From Linked Post"},[
					createElement("img",{className:"resourceIcon importData"+WM.opts.littleButtonSize}),
				]):null,
			]),
		]));
		
		//if (isNew) WM.rulesManager.saveRules();
		return self;
	}catch(e){log("WM.rulesManager.RuleValidator.init(): "+e);}};

//***************************************************************************************************************************************
//***** RuleAction Class
//***************************************************************************************************************************************
	WM.rulesManager.RuleAction = function(params){try{
		var isNew=(!exists(params));
		var self=this;
	
		//return saveable data from this branch
		this.__defineGetter__("saveableData",function(){try{
			var a= {event:WM.rulesManager.ruleEventsCodes[this.event], action:WM.rulesManager.ruleActionsCodes[this.action]};
			if (this.hasParam) a.params=this.params;
			if (this.paramCount==2) a.params2=this.params2;
			return a;
		}catch(e){log("WM.rulesManager.RuleAction.saveableData: "+e);}});

		//remove this from parent
		this.remove=function(){try{
			var ask=WM.opts.rulesConfirmDeleteAction;
			if (!ask || (ask && confirm("Delete rule action?"))){
				remove(this.node);
				this.parent.actions.removeByValue(this);
				doAction(WM.rulesManager.saveRules);
			}
		}catch(e){log("WM.rulesManager.RuleAction.remove: "+e);}};
	
		//move up in the list
		this.moveUp=function(){try{
			//where is this
			var parentContainer = this.parent.actions;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					WM.rulesManager.saveRules();
				}
			}
		}catch(e){log("WM.rulesManager.RuleAction.moveUp: "+e);}};

		//move down in the list
		this.moveDown=function(){try{
			//where is this
			var parentContainer = this.parent.actions;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					WM.rulesManager.saveRules();
				}
			}
		}catch(e){log("WM.rulesManager.RuleAction.moveDown: "+e);}};

		//copy this validator on the parent
		this.clone=function(){try{		
			this.parent.addAction(this.saveableData());
			WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.RuleAction.clone: "+e);}};

		//init
		//this.id=params.id||unique();
		this.parent=params.parent||null;
		if (!this.parent) {
			log("WM.rulesManager.RuleAction: no parent specified: abort init");
			return null;
		}
		//this.actionsNode=parent.actionsNode;
		this.action=params.action||"incrementCounter";
		//log(this.action);
		if (isNumber(this.action)) this.action=WM.rulesManager.ruleActionByCode(this.action);
		this.event=params.event||"onAccepted";
		if (isNumber(this.event)) this.event=WM.rulesManager.ruleEventByCode(this.event);
		
		//setup default values and param types
		//log(this.action);
		var def=WM.rulesManager.ruleActions[this.action];
		this.hasParam = def.hasParam;
		this.params = params.params||def["default"]||((def.paramData||null)?def.paramData[0]["default"]:"");
		this.params2 = params.params2||((def.paramData||null)?def.paramData[1]["default"]:"");
		this.paramCount = def.paramCount;
		
		//draw it
		this.parent.actionsNode.appendChild(this.node=createElement("div",{className:"action"},[
			//event for this action
			createElement("div",{className:"line"},[
				this.eventNode=createElement("select",{className:"selectEvent",onchange:function(){self.event=this.value; if (self.event=="onRuleButtonClicked") {self.parent.ruleButtonHousingNode.style.display="";} else {self.parent.ruleButtonHousingNode.style.display="none";}; WM.rulesManager.saveRules();}},(function(){
					var actioneventsret=[],elem;
					for (var i in WM.rulesManager.ruleEvents){
						actioneventsret.push(elem=createElement("option",{textContent:i,value:i,title:WM.rulesManager.ruleEvents[i]}));
						if (i==self.event) elem.selected=true;
					}
					return actioneventsret;
				})()),
				//function to call on the event
				this.actionNode=createElement("select",{className:"selectFunction",onchange:function(){
					self.action=this.value;
					WM.rulesManager.saveRules();
					//set the param type
					var action = WM.rulesManager.ruleActions[this.value];
					self.paramNode.style.display=((action.hasParam)?"":"none");
					self.param2Node.style.display=((action.hasParam && (action.paramCount==2))?"":"none");		

				}},(function(){
					var actionfuncsret=[],elem;
					for (var i in WM.rulesManager.ruleActions){
						entry=WM.rulesManager.ruleActions[i];
						actionfuncsret.push(elem=createElement("option",{textContent:entry.name,value:i,title:entry.toolTip}));
						if (i==self.action) elem.selected=true;
					}
					return actionfuncsret;
				})()),
				//this is for special cases only and should be hidden otherwise
				this.paramNode=createElement("input",{className:"paramBox",value:this.params,onchange:function(){self.params=this.value;WM.rulesManager.saveRules();}}),
				this.param2Node=createElement("input",{className:"paramBox",value:this.params2,onchange:function(){self.params2=this.value;WM.rulesManager.saveRules();}}),
				
				//toolbox
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.remove();},title:"Delete Action"},[
					createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddBlue",onclick:function(){self.clone();},title:"Clone Action"},[
					createElement("img",{className:"resourceIcon clone"+WM.opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddGreen",onclick:function(){self.moveUp();},title:"Move Up"},[
					createElement("img",{className:"resourceIcon arrowUp"+WM.opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.moveDown();},title:"Move Down"},[
					createElement("img",{className:"resourceIcon arrowDown"+WM.opts.littleButtonSize}),
				]),

			]),
		]));	
		
		//hide param node when not used
		self.paramNode.style.display=((self.hasParam)?"":"none");
		self.param2Node.style.display=((self.hasParam && (self.paramCount==2))?"":"none");		

		//if (isNew) WM.rulesManager.saveRules();
		return self;
	}catch(e){log("WM.rulesManager.RuleAction.init(): "+e);}};

//***************************************************************************************************************************************
//***** Rule Class
//***************************************************************************************************************************************
	WM.rulesManager.Rule = function(params){try{
		this.objType="rule";
		var self=this;
		params=params||{};

		//set defaults
		this.parent=null;
		this.enabled=true;
		this.kids=[]; //child nodes
		this.eggs=[]; //hatchable child nodes
		this.actions=[]; //events:actions list
		this.validators=[]; //search:find list
		this.limitCount=0; 
		this.limit=0;
		this.actionsNode=null;
		this.validationNode=null;
		this.node=null;
		this.isChild=false;
		this.isEgg=false;
		this.expanded=true;		
		this.timers={};
		this.intervals={};
		this._isGlobal=false;
		
		//return savable data from this branch
		this.__defineGetter__("saveableData",function(){try{
			var ret={};
			
			//ret.id=this.id;
			ret.title=this.title;
			ret.enabled=this.enabled;
			ret.limit=this.limit;
			ret.limitCount=this.limitCount;
			//ret.level=this.level;
			ret.expanded=this.expanded;
			
			ret.validators=[];
			if (isArrayAndNotEmpty(this.validators)) for (var i=0,validator;(validator=this.validators[i]);i++) {
				ret.validators.push(validator.saveableData);
			}
			
			ret.actions=[];
			if (isArrayAndNotEmpty(this.actions)) for (var i=0,action;(action=this.actions[i]);i++) {
				ret.actions.push(action.saveableData);
			}
			
			ret.kids=[];
			if (isArrayAndNotEmpty(this.kids)) for (var i=0,kid;(kid=this.kids[i]);i++) {
				ret.kids.push(kid.saveableData);
			}
			
			ret.eggs=[];
			if (isArrayAndNotEmpty(this.eggs)) for (var i=0,egg;(egg=this.eggs[i]);i++) {
				ret.eggs.push(egg.saveableData);
			}
			
			return ret;
		}catch(e){log("WM.rulesManager.Rule.saveableData: "+e);}});		

		//set/get wether this rule is saved as global or profile
		this.__defineGetter__("isGlobal",function(){try{
			return self._isGlobal;
		}catch(e){log("WM.rulesManager.Rule.isGlobal: "+e);}});
		this.__defineSetter__("isGlobal",function(v){try{
			//only top level rule can be global
			if (self.parent) {
				confirm("Only top level rule can be set to global.");
				return;
			} 
			
			if (!v) {
				if (!confirm("Disabling profile sharing on this rule will prevent other users on this machine from loading it. Are you sure you wish to make this rule locally available only?")) return;
			}
		
			self._isGlobal=v;
			
			//make sure we have a uniqueID
			//but don't destroy one that already exists
			if (v && !exists(self.uniqueID)) self.uniqueID = unique();
			
			//change the color/icon of the isGlobal button
			if (self.toggleGlobalButton) {
				var s=WM.opts.littleButtonSize;
				with (self.toggleGlobalButton) className=className.swapWordB(v,"removeGlobal"+s,"addGlobal"+s);
				with (self.toggleGlobalButton.parentNode) {
					className=className.swapWordB(v,"oddOrange","oddGreen");
					title=(v)?"Disable Profile Sharing":"Share With Other Profiles";
				}
			}
		}catch(e){log("WM.rulesManager.Rule.isGlobal: "+e);}});
		
		this.__defineGetter__("parentLimit",function(){try{
			if (self.parent||null) return self.parent.limit;
			return null;
		}catch(e){log("WM.rulesManager.Rule.parentLimit: "+e);}});

		this.__defineGetter__("isBranchDisabled",function(){try{
			var p=self.parent,ret=false;
			while(p) {
				if (!p.enabled) return true;
				p=p.parent;
			}
			return false;
		}catch(e){log("WM.rulesManager.Rule.isBranchDisabled: "+e);}});

		this.__defineGetter__("parentLimitCount",function(){try{
			if (self.parent||null) return self.parent.limitCount;
			return null;
		}catch(e){log("WM.rulesManager.Rule.parentLimitCount: "+e);}});

		//copy passed params to this object
		for (var p in params) {
			//omit specific params
			if (!(["actions","validators","kids","eggs"].inArray(p)) ) {
				//copy only params that make it past the checker
				this[p]=params[p];
			}
		}
		
		this.usesRuleButton=function(){
			for (var action in this.actions) {
				if (action.event=="onRuleButtonClicked") {return true;}
			}
			return false;
		};
		
		this.moveUp=function(){try{
			//where is this
			var parentContainer = 
				(this.isChild)?this.parent.kids:
				(this.isEgg)?this.parent.eggs:
				WM.rulesManager.rules;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					WM.rulesManager.saveRules();
				}
			}
		}catch(e){log("WM.rulesManager.Rule.moveUp: "+e);}};
		
		this.moveDown=function(){try{
			//where is this
			var parentContainer = 
				(this.isChild)?this.parent.kids:
				(this.isEgg)?this.parent.eggs:
				WM.rulesManager.rules;
			//only affects items not already the last in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					WM.rulesManager.saveRules();
				}
			}
		}catch(e){log("WM.rulesManager.Rule.moveDown: "+e);}};

		this.moveUpLevel=function(){try{
			if (this.parent) {
				//this is not a top level node, so we can move it
				var targetContainer=((this.parent.parent)?this.parent.parent.kids:WM.rulesManager.rules);
				//remove from parent
				this.parent[(this.isChild)?"kids":(this.isEgg)?"eggs":null].removeByValue(this);
				//set new parent
				this.parent=(this.parent.parent||null); //never point to the top level
				//set flags
				this.isChild=(this.parent!=null);
				this.isEgg=false;
				//move the object
				targetContainer.push(this);
				//move the node
				if (this.parent) this.parent.kidsNode.appendChild(this.node);
				else WM.console.priorityBuild.appendChild(this.node);
				
				//save it
				WM.rulesManager.saveRules();
			}
		}catch(e){log("WM.rulesManager.Rule.moveUpLevel: "+e);}};
		
		this.moveDownLevel=function(){try{
			//where is this
			var parentContainer = 
				(this.isChild)?this.parent.kids:
				(this.isEgg)?this.parent.eggs:
				WM.rulesManager.rules;
			//create a new rule at my level
			var newRule = new WM.rulesManager.Rule({
				parent:this.parent||null,
				isChild:this.isChild,
				isEgg:this.isEgg,
			});
			parentContainer.push(newRule);
			//remove me from my current parent
			parentContainer.removeByValue(this);
			//attach me to my new parent
			this.parent=newRule;
			this.isChild=true;
			this.isEgg=false;
			newRule.kids.push(this);
			//move my node
			newRule.kidsNode.appendChild(this.node);
			//save it
			WM.rulesManager.saveRules();			
		}catch(e){log("WM.rulesManager.Rule.moveDownLevel: "+e);}};

		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.disable: "+e);}};

		this.disableChildren=function(){try{
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.disable();
			}			
		}catch(e){log("WM.rulesManager.Rule.disableChildren: "+e);}};

		this.enableChildren=function(){try{
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.enable();
			}			
		}catch(e){log("WM.rulesManager.Rule.enableChildren: "+e);}};
		
		this.toggle=function(){try{
			//if(this.enabled)this.disable(); else this.enable();
			
			//this.enabled=!this.enabled;
			this.enabled=this.toggleNode.checked;
			this.node.className=this.node.className.swapWordB(this.enabled,"enabled","disabled");
			WM.rulesManager.saveRules();
			//this.toggleNode.checked=();

		}catch(e){log("WM.rulesManager.Rule.toggle: "+e);}};

		this.clone=function(){try{
			var cloneRule=this.saveableData;
			//cloneRule.id=unique();
			if (this.isChild) this.parent.addChild(cloneRule);
			else if (this.isEgg) this.parent.addEgg(cloneRule);
			else WM.rulesManager.newRule(cloneRule);
		}catch(e){log("WM.rulesManager.RuleAction.clone: "+e);}};

		this.resetLimit=function(params){try{
			params=params||{};
			var ask=WM.opts.rulesConfirmResetLimit;
			if (params.noConfirm || !ask || (ask && confirm("Reset Limit Counter?"))) {
				this.limitCount=0;
				this.limitCounterNode.value=this.limitCount;
				if (!(params.resetChildren||false)) {
					if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
						kid.resetLimit(params);
					}
				}
				if (!(params.preventSave||false)) WM.rulesManager.saveRules();
			}
		}catch(e){log("WM.rulesManager.Rule.resetLimit: "+e);}};
		
		this.resetBranchLimits=function(params){try{
			params=params||{};
			//resets the limits of entire branch rules, but not self limit
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.resetLimit({resetChildren:true,noConfirm:params.noConfirm||false});
			}
		}catch(e){log("WM.rulesManager.Rule.resetBranchLimits: "+e);}};

		this.resetChildrenLimits=function(params){try{
			params=params||{};
			//resets the limits of all immediate children, but not self limit
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.resetLimit({noConfirm:params.noConfirm||false});
			}
		}catch(e){log("WM.rulesManager.Rule.resetChildrenLimits: "+e);}};

		this.incrementLimitCounter=function(o,n){try{
			this.limitCount=parseInt(parseInt(this.limitCount)+(exists(n)?parseInt(n):1));
			this.limitCounterNode.value=this.limitCount;
			WM.rulesManager.saveRules();
			//for reaching of limit
			if (this.limit && (this.limitCount>=this.limit)) this.onEvent("onLimit",o);
		}catch(e){log("WM.rulesManager.Rule.incrementLimitCounter: "+e);}};

		this.decrementLimitCounter=function(o,n){try{
			this.limitCount=parseInt(parseInt(this.limitCount)-(exists(n)?parseInt(n):1));
			//dont allow to drop below 0
			if (this.limitCount<0) this.limitCount=0;
			this.limitCounterNode.value=this.limitCount;
			WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.decrementLimitCounter: "+e);}};

		this.remove=function(noConfirm){try{
			var ask=WM.opts.rulesConfirmDeleteRule;
			if (noConfirm || (this.isGlobal && confirm("This rule is shared with other profiles. Deleting it here will prevent it from loading for other users. Are you sure you wish to delete this rule and its children.")) || !ask || (!this.isGlobal && ask && confirm("Delete rule and all of its child nodes?"))){
				//destroy intervals and timers
				this.cleanup();				
				//remove my data
				var parentContainer=((this.isChild)?this.parent.kids:(this.isEgg)?this.parent.eggs:WM.rulesManager.rules);
				parentContainer.removeByValue(this);
				//remove my node
				remove(this.node);
				
				doAction(WM.rulesManager.saveRules);
			}
		}catch(e){log("WM.rulesManager.Rule.remove: "+e);}};

		this.cancelAllTimers=function(){try{
			//find the correct timer by target
			for (var t in this.timers){
				if (this.timers[t]!=null) {
					window.clearTimeout(this.timers[t]);
					delete this.timers[t];
				}
			}
		}catch(e){log("WM.rulesManager.Rule.cancelAllTimers: "+e);}};		

		this.cancelTimer=function(target){try{
			//find the correct timer by target
			var timer=null;
			for (var t in this.timers){
				if (this.timers[t].target==target) {
					timer=this.timers[t];
					break;
				}
			}
			if (timer) {
				window.clearTimeout(timer.timer);
				delete this.timers[timer.id];
			}
		}catch(e){log("WM.rulesManager.Rule.cancelTimer: "+e);}};
		
		this.createTimer=function(t,o){try{
			this.cancelTimer(o);
			var self=this;
			var stamp=unique();
			var timer=window.setTimeout(function(){
				self.onEvent("onTimer",o);
			},t);
			this.timers[stamp]={timer:timer, target:o, id:stamp};
		}catch(e){log("WM.rulesManager.Rule.createTimer: "+e);}};
		
		this.cancelAllIntervals=function(){try{
			//find the correct timer by target
			for (var t in this.intervals){
				if (this.intervals[t]!=null) {
					window.clearInterval(this.intervals[t]);
					delete this.intervals[t];
				}
			}
		}catch(e){log("WM.rulesManager.Rule.cancelAllIntervals: "+e);}};		
		
		this.cancelInterval=function(target){try{
			//find the correct timer by target
			var interval=null;
			for (var t in this.intervals){
				if (this.intervals[t].target==target) {
					interval=this.intervals[t];
					break;
				}
			}
			if (interval) {
				window.clearInterval(interval.timer);
				delete this.intervals[interval.id];
			}
		}catch(e){log("WM.rulesManager.Rule.cancelInterval: "+e);}};
		
		this.createInterval=function(t,o){try{
			this.cancelInterval(o);
			var self=this;
			var stamp=unique();
			var interval=window.setInterval(function(){
				self.onEvent("onInterval",o);
			},t);
			this.intervals[stamp]={timer:interval, target:o, id:stamp};
		}catch(e){log("WM.rulesManager.Rule.createInterval: "+e);}};
		
		this.doEvent=function(event,obj,logit){try{
			//check to see if post matches this rule, if it does, perform actions
			//if (this.validators){
				//logit=logit||(obj.objType=="post");
				
				var obj=(obj||{});
				//var self=this;
				var matchPost=true, found=[];
				for (var vl=0,validator;(validator=this.validators[vl]);vl++) { try{
					//within the search array, each result is handled as an OR
					var result=false;
					for (var s=0,search; (search=validator.search[s]); s++) {
						var v = 
							//special request for object type of the object that activated this rule
							(search=="activatorType")?(
								(exists(obj))?(obj.objType||"unknown"):"unknown"
							):
							
							//special specific app being paused test
							(search=="isAppPaused")?(
								(exists(obj) && exists(obj.app))?obj.app.paused:false
							):
							
							//special specific bonus type being paused
							(search=="isTypePaused")?(
								(exists(obj) && exists(obj.which) && exists(obj.app))?obj.app.typesPaused.inArray(obj.which):false
							):
							
							//read from post object test data
							(exists(obj) && exists(obj.testData) && exists(obj.testData[search]))?obj.testData[search]:  
							//read from activating object standard parameters
							(exists(obj) && exists(obj[search]))?obj[search]:
							//read from this rule object
							exists(self[search])?self[search]:
							//read from parameters in the console/main object
							exists(WM[search])?WM[search]:
							//there is no known reference for this query
							"undefined";

						//fail validators that do not work with this obj
						if (v=="undefined") {result=false; break;}
						//convert functions to values
						if (typeof v=="function") v=v();
						
						var query = validator.find;
						//make the query the same type as the value
						if (!(typeof query == typeof v)) {
							switch (typeof v) {
								case "boolean":
									//convert texts of false/true to actual booleans
									query = cBool(query);
									break;
								case "number":
									//convert text numbers to real numbers
									query=(query=Number(query))?query:0;
									//if (query==null) query=0;
									break;
							}
						}
						
						//if (logit) log([search, v, query]);	

						//compare
						switch(validator.operand){
							case "equals": result=result||(v==query); break; 
							case "notEquals": result=result||(v!=query); break; 
							case "startsWith": result=result||(v.startsWith(query)); break; 
							case "notStartsWith": result=result||(!v.startsWith(query)); break; 
							case "endsWith": result=result||(v.endsWith(query)); break; 
							case "notEndsWith": result=result||(!v.endsWith(query)); break; 
							case "contains": result=result||(v.contains(query)); break; 
							case "notContains": result=result||(!v.contains(query)); break; 
							case "greaterThan": result=result||(v>query); break; 
							case "lessThan": result=result||(v<query); break; 
							case "greaterThanOrEquals": result=result||(v>=query); break; 
							case "lessThanOrEquals": result=result||(v<=query); break; 
							case "matchRegExp":
								var f; //storage space for match array
								var regex = new RegExp(query,"gi");
								f=regex.exec(v);
								result=result||isArrayAndNotEmpty(f);
								//result=result||((f=v.match(regex))!=null);
								if (f) found=found.concat(f);
								break;
							case "notMatchRegExp":
								var regex = new RegExp(query,"gi");
								result=result||(v.match(regex)==null);
								break;
							case "equalsExactly": result=result||(v===query); break; 
							case "notEqualsExactly": result=result||!(v===query); break; 
						}
						//any result of true inside this loop is an automatic success
						if (result) break;
					}
					//evaluate our current result with the previous results
					//outside the search array, each value is handled as an AND
					//any one non-match is a complete failure
					matchPost=(matchPost && result);
					if (!matchPost) break;
				}catch(e){
					log("WM.rulesManager.Rule.doEvent: "+e+"{event:" +event+ ", search:"+search+", value:"+v+", query:"+query+", result:"+result+"}");
					continue;
				}}
				//if after all testing we still matched the object
				//then perform this rule's events and check children
				if (matchPost) {
					//log("post matches all validators");
					//first do every child rule
					for (var k=0,kid;(kid=this.kids[k]);k++){
						kid.doEvent(event,obj,true);
					}
					//now finish up with this rule's actions
					this.onEvent(event,obj,found||null);
				}
			//}
			
			//log("WM.rulesManager.Rule.doEvent: {obj="+obj.id+", event="+event+", matchPost="+matchPost+"}");
		}catch(e){log("WM.rulesManager.Rule.doEvent: "+e);}};

		this.onEvent=function(event,obj,found){try{
			var actionFilter=["*"];
			/*
				handle special events
			*/
			if (event=="onRuleCreated") {
				/*
					we do want onRuleCreated events to fire even if the rule is disabled,
					or intervals won't be set and ready for later, if the user does enable the rule
					this session. But we want to filter which actions are available.
				*/
				if (!this.enabled || this.isBranchDisabled) actionFilter=["createInterval","createTimer"];
				
			} else if ((event=="onInterval")||(event=="onTimer")) {
				//special case for intervals and timers
				if (!this.enabled || this.isBranchDisabled) return;
			} else {
				//always break if this rule is disabled
				if (!this.enabled || this.isBranchDisabled) return;
			}
			/*
				end handle special events
			*/
		
			obj=obj||null;
			//var self=this;
			var post=(self!=obj)?obj:null;
			var app=post?(exists(obj.app)?obj.app:obj):null;
			
			//some insertable post parts
			var inserts=["appID","which","fromID"];
			
			//perform an action based on an event call
			//post object may be null if called from this
			for (var a1=0,action;(action=this.actions[a1]);a1++){
				//filter actions: allow only those in the filter list, or all actions if "*" is in the list				
				if (actionFilter.inArray("*") || actionFilter.inArray(action.action) ) if (action.event==event){
					var param=action.params;
					var param2=action.params2;
					var hasParam=action.hasParam;
					//format some post parts into the param
					if (hasParam && param) {
						for (var i=0;i<inserts.length;i++){
							if (post && (post.replace||null)) {
								param.replace(new RegExp("{%"+inserts[i]+"}","gi"), post.testData[inserts[i]] || post[inserts[i]]);
							}
						}
					}
					
					switch(action.action){
						case "destroyRule":(function(){
							doAction(function(){
								self.remove(true);
							});
							})(); break;
						case "pauseType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								WM.pauseByType(a,w);
							});
							})(); break;
						case "unpauseType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								WM.unPauseByType(a,w);
							});
							})(); break;
						case "uncheckType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								WM.disableOpt(w,a);
								//WM.stopCollectionOf(post.which);
							});
							})(); break;

						case "checkType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								WM.enableOpt(w,a);
								//WM.startCollectionOf(post.which);
							});
							})(); break;
						case "disableAppOption":(function(){
							var c=param, f=found, a=app;
							if (f) c=c.format2(f);
							doAction(function(){
								WM.disableOpt(c,a);
							});
							})(); break;
						case "enableAppOption":(function(){
							var c=param, f=found, a=app;
							if (f) c=c.format2(f);
							doAction(function(){
								WM.enableOpt(c,a);
							});
							})(); break;
						case "disableHostOption":(function(){
							//debug.print("option disabled");
							var c=param, f=found;
							if (f) c=c.format2(f);
							doAction(function(){
								WM.disableOpt(c);
							});
							})(); break;
						case "enableHostOption":(function(){
							//debug.print("option enabled");
							var c=param, f=found;
							if (f) c=c.format2(f);
							doAction(function(){
								WM.enableOpt(c);
							});
							})(); break;
						case "disableAutolike":(function(){
							doAction(function(){
								//debug.print("autolike disabled");
								WM.disableOpt("useautolike");
							});
							})(); break;
						case "enableAutolike":(function(){
							doAction(function(){
								//debug.print("autolike enabled");
								WM.enableOpt("useautolike");
							});
							})(); break;
						case "disableAutocomment":(function(){
							doAction(function(){
								WM.disableOpt("useautocomment");
							});
							})(); break;
						case "enableAutocomment":(function(){
							doAction(function(){
								WM.enableOpt("useautocomment");
							});
							})(); break;
						case "pauseApp":(function(){
							var a = WM.apps[param]||app;
							doAction(function(){
								a.pause();
							});
							})(); break;
						case "unpauseApp":(function(){
							var a = WM.apps[param]||app;
							doAction(function(){
								a.unPause();
							});
							})(); break;
						case "appendLink":(function(){
							var p=post, v=param||"";
							if (p) doAction(function(){
								p.link=p.linkHref+v;
							});
							})(); break;
						case "unpauseAllTypesByApp":(function(){
							var a = WM.apps[param]||app;
							doAction(function(){
								a.unpauseAllTypes();
							});
							})(); break;
						case "unpauseAllTypesAllApps":(function(){
							doAction(function(){
								for (var a in WM.apps){
									a.unpauseAllTypes();
								}
							});
							})(); break;
						case "unpauseAllApps":(function(){
							doAction(function(){
								for (var a in WM.apps){
									a.unpause();
								}
							});
							})(); break;
						case "pauseAllApps":(function(){
							doAction(function(){
								for (var a in WM.apps){
									a.pause();
								}
							});
							})(); break;
						case "refreshBrowser":(function(){
							doAction(function(){
								window.location.reload();
							});
							})(); break;
						case "pauseWM.collector":(function(){
							doAction(function(){
								WM.pauseCollecting(true);
							});
							})(); break;
						case "unpauseWM.collector":(function(){
							doAction(function(){
								WM.pauseCollecting(false);
							});
							})(); break;
						case "pauseFetch":(function(){
							doAction(function(){
								WM.pauseFetching(true);
							});
							})(); break;
						case "unpauseFetch":(function(){
							doAction(function(){
								WM.pauseFetching(false);
							});
							})(); break;
						case "likePost":(function(){
							doAction(function(){
								post.like();
							});
							})(); break;
						case "queueLikePost":(function(){
							doAction(function(){
								WM.queAutoLike(post);
							});
							})(); break;
						case "commentPost":(function(){
							var p=param,f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								post.comment(p);
							});
							})(); break;						
						case "queueCommentPost":(function(){
							var p=param,f=found;
							if (f) p=p.format2(f);
							//log(["queueCommentPost fired",p]);
							doAction(function(){
								WM.queAutoComment(post,p);
							});
							})(); break;
						case "cleanPost":(function(){
							doAction(function(){
								post.remove();
							});
							})(); break;
						case "incrementCounter":(function(){
							var o=obj,p=param,f=found;
							//if (f) p=p.format2(f);
							doAction(function(){
								self.incrementLimitCounter(o,p);
							});
							})(); break;
						case "decrementCounter":(function(){
							var o=obj,p=param,f=found;
							//if (f) p=p.format2(f);
							doAction(function(){
								self.decrementLimitCounter(o,p);
							});
							})(); break;
						case "incrementParentCounter":(function(){
							var o=obj,p=param, f=found;
							//if (f) p=p.format2(f);
							if (this.parent) {
								doAction(function(){
									//passes the activating object, not this rule
									self.parent.incrementLimitCounter(o,p);
								});
							}
							})(); break;
						case "decrementParentCounter":(function(){
							var o=obj,p=param, f=found;
							//if (f) p=p.format2(f);
							if (this.parent){
								doAction(function(){
									//passes the activating object, not this rule
									self.parent.decrementLimitCounter(o,p);
								});
							}
							})(); break;
						case "setColor":(function(){
							var c=param;
							var f=found;
							if (f) c=c.format2(f);
							doAction(function(){
								post.setColor(c);
							});
							})(); break;
						case "pinPost":(function(){
							doAction(function(){
								post.pin();
							});
							})(); break;
						case "setAsAccepted":(function(){
							var saveit=param;
							doAction(function(){
								post.accept(saveit);
							});
							})(); break;
						case "setAsFailed":(function(){
							var saveit=param;
							doAction(function(){
								post.fail(saveit);
							});
							})(); break;
						case "setAsExcluded":(function(){
							doAction(function(){
								post.exclude();
							});
							})(); break;
						case "processFirst":(function(){
							doAction(function(){
								post.moveToTop();
							});
							})(); break;
						case "processLast":(function(){
							doAction(function(){
								post.moveToBottom();
							});
							})(); break;
						case "setPriority":(function(){
							var p=param, f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								post.setPriority(p);
							});
							})(); break;
						case "setPriorityApp":(function(){
							var p=param2, a=WM.apps[param]||app, f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriority(p);
							});
							})(); break;
						case "removePriorityApp":(function(){
							var p=param2, a=WM.apps[param]||app, f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriority(50);
							});
							})(); break;
						case "setPriorityType":(function(){
							var p=param2, a=app, f=found, w=param||post.which;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriorityByType(w,p);
							});
							})(); break;
						case "removePriorityType":(function(){
							var a=app, f=found, w=param||post.which;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriorityByType(w,50);
							});
							})(); break;
						case "removePriority":(function(){
							doAction(function(){
								post.setPriority(50);
							});
							})(); break;
						case "resetLimit":(function(){
							doAction(function(){
								self.resetLimit({noConfirm:true});
							});
							})(); break;
						case "resetParentLimit":(function(){
							if (this.parent) {
								doAction(function(){
									self.parent.resetLimit({noConfirm:true});
								});
							}
							})(); break;
						case "resetChildrenLimits":(function(){
							doAction(function(){
								self.resetChildrenLimits({noConfirm:true});
							});
							})(); break;						
						case "resetBranchLimits":(function(){
							doAction(function(){
								self.resetBranchLimits({noConfirm:true});
							});
							})(); break;				
						case "hatch":(function(){
							var o=obj;
							doAction(function(){
								self.hatch(o);
							});
							})(); break;
						case "birth":(function(){
							var o=obj;
							doAction(function(){
								this.birth(o);
							});
							})(); break;
						case "fetchNewer":(function(){
							doAction(function(){
								app.fetchPosts({newer:true,bypassPause:true});
							});
							})(); break;
						case "fetchOlder":(function(){
							doAction(function(){
								app.fetchPosts({older:true,bypassPause:true});
							});
							})(); break;
						case "fetchHours":(function(){
							var p=param, f=found, a=app;
							if (f) p=p.format2(f);
							doAction(function(){
								//var t0=timestamp()/1000; //let the fetch script calc it from the feed
								var t1=Math.round((timeStamp()-(p*hour))/1000);
								//t=t.substr(0,t.length-3);
								log("fetchHours: "+p+" please wait...");
								WM.fetch({bypassPause:true, older:true, targetEdge:t1, currentEdge:Math.round(timeStamp()/1000), apps:app});
							});
							})(); break;
						case "disableRule":(function(){
							doAction(function(){						
								self.disable();
							});
							})(); break;
						case "enableRule":(function(){
							doAction(function(){
								self.enable();
							});
							})(); break;
						case "disableChildRules":(function(){
							doAction(function(){						
								self.disableChildren();
							});
							})(); break;
						case "enableChildRules":(function(){
							doAction(function(){
								self.enableChildren();
							});
							})(); break;
						case "disableApp":(function(){
							//check for specified app
							var a = WM.apps[param]||app;
							doAction(function(){
								a.disable();
							});
							})(); break;
						case "enableApp":(function(){
							var a = WM.apps[param]||app;
							doAction(function(){
								a.enable();
							});
							})(); break;
						case "forceOpen":(function(){
							doAction(function(){
								post.forceOpen();
							});
							})(); break;
						case "forceOpenFirst":(function(){
							doAction(function(){
								post.forceOpen({first:true});
							});
							})(); break;
						case "emergencyOpen":(function(){
							doAction(function(){
								post.forceOpen({emergency:true});
							});
							})(); break;
						case "setToCollect":(function(){
							doAction(function(){
								post.collect();
							});
							})(); break;
						case "setToCollectPriority1":(function(){
							doAction(function(){
								post.collect();
								post.setPriority(1);
							});
							})(); break;
						case "createTimer":(function(){
							var o=obj, p=param, f=found;
							if (f) p=p.format2(f);
							//allow new time format entry
							//if the calculated time differs from the passed time, then use that calculated time, as long as it doesn't translate to 0
							var t=calcTime(p);
							if (t!=0 && t!=p) p=t;
							//debug.print(["b",param,t,p]);
							doAction(function(){
								self.createTimer(p,o);
							});
							})(); break;
						case "cancelTimer":(function(){
							var o=obj;
							doAction(function(){
								if (o.objType=="rule") self.cancelAllTimers();
								else self.cancelTimer(o);
							});
							})(); break;
						case "createInterval":(function(){
							var o=obj, p=param, f=found;
							if (f) p=p.format2(f);
							//allow new time format entry
							//if the calculated time differs from the passed time, then use that calculated time, as long as it doesn't translate to 0
							var t=calcTime(p);
							if (t!=0 && t!=p) p=t;
							//debug.print(["b",param,t,p]);
							doAction(function(){
								self.createInterval(p,o);
							});
							})(); break;
						case "cancelInterval":(function(){
							var o=obj;
							doAction(function(){
								if (o.objType=="rule") self.cancelAllIntervals();
								else self.cancelInterval(o);
							});
							})(); break;
						case "setWhich":(function(){
							var w=param;
							var f=found;
							if (f) w=w.format2(f);
							doAction(function(){
								post.setWhich(w);
							});
							})(); break;
						case "reIDAll": (function(){
							doAction(function(){
								WM.reIDAll();
							});
							})(); break;
						case "resetAllLimits":(function(){
							doAction(function(){
								WM.rulesManager.resetAllLimits();
							});
							})(); break;							
						case "openPostSource":(function(){
							doAction(function(){
								post.openSource();
							});
							})(); break;
						case "emptyAutolikeQueue":(function(){
							doAction(function(){
								WM.emptyAutoLikeQueue();
							});
							})(); break;							
						case "setHostOption":(function(){
							var c=param, c2=param2, f=found;
							if (f) c=c.format2(f); //format only param1
							doAction(function(){
								WM.setOpt(c,c2);
							});
							})(); break;
						case "setAppOption":(function(){
							var c=param, c2=param2, f=found, a=app;
							if (f) c=c.format2(f); //format only param1
							doAction(function(){
								WM.setOpt(c,c2,a);
							});
							})(); break;							
						case "setAppTab":(function(){
							if (param=="all") {
								doAction(function(){
									//switch to Show All
									WM.console.collectTabControl.selectTab(0);
								});
							} else {
								//check for specified app
								var a = WM.apps[param]||app;
								if (a||null) doAction(function(){
									//switch to associated tab
									click(a.collectionTabNode);
								});
							}})(); break;
					}	
				}
			}
		}catch(e){log("WM.rulesManager.Rule.onEvent: "+e);}};
		
		this.addAction=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			var ret=new WM.rulesManager.RuleAction(p);
			this.actions.push(ret);
			if (isNew) WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.addAction: "+e);}};

		this.addValidator=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			var ret=new WM.rulesManager.RuleValidator(p);
			this.validators.push(ret);
			if (isNew) WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.addValidator: "+e);}};
		
		this.addChild=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			p.isChild=true;
			var rule=new WM.rulesManager.Rule(p);
			this.kids.push(rule);
			if (isNew) WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.addChild: "+e);}};

		this.addEgg=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			p.isEgg=true;
			var rule=new WM.rulesManager.Rule(p);
			this.eggs.push(rule);
			if (isNew) WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.addEgg: "+e);}};		
		
		//move eggs to parent node and destroy this node
		this.hatch=function(obj){try{
			var ask=WM.opts.rulesConfirmHatch
			if (!ask || (ask && confirm("Hatch egg child and remove current rule and all its children?")) ) {
				this.onEvent("onHatch",obj||this);
				for (var e=0,egg; (egg=this.eggs[e]); e++){
					egg.moveUpLevel();
				}
				this.remove(true); //with noConfirm
			}
		}catch(e){log("WM.rulesManager.Rule.hatch: "+e);}};

		//clone eggs to parent node
		this.birth=function(obj){try{
			this.onEvent("onBirth",obj||this);
			for (var e=0,egg; (egg=this.eggs[e]); e++){
				var cloneRule=egg.saveableData;
				if (this.isChild) this.parent.addChild(cloneRule);
				else WM.rulesManager.newRule(cloneRule);
			}
		}catch(e){log("WM.rulesManager.Rule.birth: "+e);}};

		//self rule button clicked
		this.ruleButtonClicked=function(obj){try{
			this.onEvent("onRuleButtonClicked",obj||this);
		}catch(e){log("WM.rulesManager.Rule.ruleButtonClicked: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=WM.opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			WM.rulesManager.saveRules();
		}catch(e){log("WM.rulesManager.Rule.toggleContent: "+e);}};

		this.populateBonusList=function(){try{
			var node=this.bonusDropDown;
			var bonuses=[];
			//get the list of accept texts for this app
			if (this.appID!="") {
				if (this.appID=="* All") {
					//populate list with bonuses from ALL docked sidekicks
				} else bonuses = mergeJSON(WM.apps[this.appID].accText,WM.apps[this.appID].userDefinedTypes);
			}
			bonuses["dynamic"]="* Dynamic grab";
			bonuses["none"]="* None";
			bonuses["wishlist"]="* Flaged as Wishlist";
			bonuses["exclude"]="* Excluded types";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";
			bonuses["*"]="* All"; //perform rule on ALL bonus types for this app

			//sort by display text
			bonuses=sortCollection(bonuses,"value");

			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in bonuses) {
				var showI=i.removePrefix(this.appID);
				node.appendChild(elem=createElement("option",{textContent:((bonuses[i].startsWith("*"))?"":((showI.startsWith("send"))?"Send ":"Get "))+bonuses[i], value:showI}));
				if (this.bonus== showI) elem.selected = true;
			}
		}catch(e){log("WM.rulesManager.Rule.populateBonusList: "+e);}};

		//draw to priority/rule manager or to the parent node's kids or eggs section
		try{(((this.parent)?this.parent[(this.isChild)?"kidsNode":"eggsNode"]:null)||$("wmPriorityBuilder")).appendChild(
			this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
				createElement("div",{className:"line"},[
					createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
						this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+WM.opts.littleButtonSize:"treeExpand"+WM.opts.littleButtonSize)}),
					]),
					this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
						self.enabled=this.checked;
						with (self.node) className=className.toggleWordB(!this.checked,"disabled");
						WM.rulesManager.saveRules();
					}}),
					createElement("label",{textContent:"Title:"}),
					this.titleNode=createElement("input",{className:"w400",value:(this.title||""), onchange:function(){self.title=this.value; WM.rulesManager.saveRules();}}),
					
					//toolbox
					createElement("div",{className:"littleButton oddOrange", title:"Remove Rule"},[
						createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize,onclick:function(){self.remove();}})]),
					createElement("div",{className:"littleButton oddBlue",title:"Hatch Egg Children"},[
						createElement("img",{className:"resourceIcon hatch"+WM.opts.littleButtonSize,onclick:function(){self.hatch();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Reset Limit Counter"},[
						createElement("img",{className:"resourceIcon reset"+WM.opts.littleButtonSize,onclick:function(){self.resetLimit();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Clone Rule"},[
						createElement("img",{className:"resourceIcon clone"+WM.opts.littleButtonSize,onclick:function(){self.clone();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Birth Egg Children"},[
						createElement("img",{className:"resourceIcon birth"+WM.opts.littleButtonSize,onclick:function(){self.birth();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
						createElement("img",{className:"resourceIcon arrowUp"+WM.opts.littleButtonSize,onclick:function(){self.moveUp();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
						createElement("img",{className:"resourceIcon arrowDown"+WM.opts.littleButtonSize,onclick:function(){self.moveDown();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up Level"},[
						createElement("img",{className:"resourceIcon moveUpLevelLeft"+WM.opts.littleButtonSize,onclick:function(){self.moveUpLevel();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down Level"},[
						createElement("img",{className:"resourceIcon moveInLevel"+WM.opts.littleButtonSize,onclick:function(){self.moveDownLevel();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Show Source"},[
						createElement("img",{className:"resourceIcon object"+WM.opts.littleButtonSize,onclick:function(){promptText(JSON.stringify(self.saveableData),true);}})]),

					createElement("div",{className:"indent littleButton "+((this.isGlobal)?"oddOrange":"oddGreen"), title:((this.isGlobal)?"Disable Profile Sharing":"Share With Other Profiles")},[
						this.toggleGlobalButton=createElement("img",{className:"resourceIcon "+((this.isGlobal)?"removeGlobal":"addGlobal")+WM.opts.littleButtonSize,onclick:function(){self.isGlobal=!self.isGlobal; WM.rulesManager.saveRules();}})]),
				]),
				this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
					(this.basedOn)?createElement("div",{className:"line"},[
						createElement("label",{textContent:"This rule is linked to a post: ",title:"This rule is linked to a post. Validators can draw information from that post so you can easily capture similar posts just by editing the captured texts to suit your needs. Post linking is not carried from session to session."}),
						this.basedOnNode=createElement("span",{textContent:this.basedOn.id}),
					]):null,
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Limit:"}),
						this.limitNode=createElement("input",{value:(this.limit||0), onchange:function(){self.limit=this.value;WM.rulesManager.saveRules();}}),
					]),
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Counter:"}),
						this.limitCounterNode=createElement("input",{value:(this.limitCount||0), onchange:function(){self.limitCount=this.value;WM.rulesManager.saveRules();}}),
					]),
					this.ruleButtonHousingNode=createElement("div",{className:"line", style:(this.usesRuleButton())?"":"display:none;"},[
						createElement("label",{textContent:"Rule Button:"}),
						this.ruleButtonNode=createElement("button",{type:"button", textContent:"onRuleButtonClicked()", onclick:function(){self.ruleButtonClicked();}}),
					]),
					//validation subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"For Activating Objects:",title:"These validators attempt to match a post or other activating object, such as feed, feed filter, app, or this rule. All activators that match here then have the following actions performed at certain events."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addValidator();},title:"Add Validator"},[
							createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize}),
						]),
						this.validationNode=createElement("div",{className:"subsection"}),
					]),				
					//actions subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Do Actions:",title:"Actions to perform on matching posts."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addAction();},title:"Add Action"},[
							createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize}),
						]),
						this.actionsNode=createElement("div",{className:"subsection"}),
					]),
					//kids subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Child Rules:",title:"Child rules are nested rules which are applied to matching posts at the same time the parent rule is applied. Child rules can have different validators, but will only activate if the parent validators have already matched a post."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addChild();},title:"Add Child"},[
							createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize}),
						]),
						this.kidsNode=createElement("div",{className:"subsection"}),
					]),
					//egg kids subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Egg Rules:", title:"Eggs are potential future rules. When 'hatched', these eggs take the place of the parent rule. The parent rule and its normal children are destroyed."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addEgg();},title:"Add Egg"},[
							createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize}),
						]),
						this.eggsNode=createElement("div",{className:"subsection"}),
					]),
				]),
			])
		);}catch(e){log("WM.rulesManager.Rule.init.drawRule: "+e);}

		
		//list the actions for this rule
		if (isArrayAndNotEmpty(params.actions)) for (var i=0,action; (action=params.actions[i]); i++) {
			this.addAction(action);
		}
		//list the validators for this rule
		if (isArrayAndNotEmpty(params.validators)) for (var i=0,validator; (validator=params.validators[i]); i++) {
			this.addValidator(validator);
		}
		//list the kids for this rule
		if (isArrayAndNotEmpty(params.kids)) for (var i=0,kid; (kid=params.kids[i]); i++) {
			this.addChild(kid);
		}
		//list the egg kids for this rule
		if (isArrayAndNotEmpty(params.eggs)) for (var i=0,egg; (egg=params.eggs[i]); i++) {
			this.addEgg(egg);
		}
				
		//create cleanup function
		this.cleanup=function(){try{
			for (var t in this.timers) {
				window.clearTimeout(this.timers[t]);
			}
			for (var i in this.intervals) {
				window.clearInterval(this.intervals[i]);
			}
			var self=this;
			removeEventListener("beforeunload",self.cleanup,false);
		}catch(e){log("WM.rulesManager.Rule.cleanup: "+e);}};
		addEventListener("beforeunload",self.cleanup,false);
		
		this.onEvent("onRuleCreated");
		return self;

	}catch(e){log("WM.rulesManager.Rule.init: "+e);}};

//***************************************************************************************************************************************
//***** App Class
//***************************************************************************************************************************************
	WM.App = function(params){try{
		this.objType="app";
		var self=this;
	
		//expected: id, name, namespace, icon
		params=params||{};

		//create the masterswitch
		var testms=WM.quickOpts.masterSwitch[params.appID];
		WM.quickOpts.masterSwitch[params.appID]=(testms==null||testms=="undefined")?true:testms;

		//set defaults
		this._enabled=WM.quickOpts.masterSwitch[params.appID]||false;
		this._paused=false;
		this.tests={};
		this.typesPaused=[];
		this.pausedTypesListNodes={};
		this._acceptCount=0;
		this._failCount=0;
		this.node=null;
		this.expanded=false;
		this.kids=[]; //contains additional filtered apps
		
		//setup config for this sidekick
		this.opts = {};
		this.config = new Config({
			storageName:"settings_"+params.appID+"_"+(WM.quickOpts.useGlobalSettings?"global":WM.currentUser.profile),
			onSave:WM.onSave,
			title:"FB Wall Manager "+WM.version+(WM.quickOpts.useGlobalSettings?" (!! Global Settings !!)":""),
			logo:createElement("span",{}[
				createElement("img",{className:"logo",src:"",textContent:"v"+WM.version}),
				createElement("text","v"+WM.version)
			]),
			css:(
				WM.console.dynamicIcons()+
				jsForms.globalStyle()
			),
			settings:{
				btn_useGlobal:{
					type:"button",
					label:"Use Global Settings", 
					title:"Switch to using a global storage for settings. Those settings can then be used by other accounts (not browser profiles).",
					script:function(){
						if (WM.quickOpts.useGlobalSettings||false) {
							//already using global settings
							return;
						}
						if (confirm("Switch to using global (shared) settings?")){
							WM.quickOpts.useGlobalSettings=true;
							WM.saveQuickOpts();
							this.config.title = "FB Wall Manager "+WM.version+" (!! Global Settings !!))";
							this.config.storageName = "settings_"+params.appID+"_global";
							this.config.values=this.config.read();
							this.config.configure();
							this.config.reload();
						}
					},
				},
				btn_useOwnProfile:{
					type:"button",
					label:"Use Profile Settings", 
					title:"Switch to using your own profile storage for settings.",
					script:function(){
						if (!(WM.quickOpts.useGlobalSettings||false)) {
							//already using profile settings
							return;
						}
						if (confirm("Switch to using your own profile settings?")){
							WM.quickOpts.useGlobalSettings=false;
							WM.saveQuickOpts();
							this.config.title = "FB Wall Manager "+WM.version;
							this.config.storageName = "settings_"+params.appID+"_"+WM.currentUser.profile;
							this.config.values=this.config.read();
							this.config.configure();
							this.config.reload();
						}
					},
				},
			
			},
		});
		
		//setup user defined accept texts
		try{
			if (WM.quickOpts.userDefinedTypes) {
				this.userDefinedTypes=WM.quickOpts.userDefinedTypes[params.appID]||{};
			} else {
				WM.quickOpts.userDefinedTypes={};
				WM.quickOpts.userDefinedTypes[params.appID]={};
				WM.saveQuickOpts();
			}
		}catch(e){log("WM.App.init: userDefinedTypes: "+e);}

		//use passed params
		for (var p in params) this[p]=params[p];

		//enable/disable all sidekick functions
		this.enable=function(){try{this.enabled=true;}catch(e){log("WM.App.enable: "+e);}};
		this.disable=function(){try{this.enabled=false;}catch(e){log("WM.App.disable: "+e);}};
		this.toggle=function(){try{this.enabled=!this.enabled;}catch(e){log("WM.App.toggle: "+e);}};

		//pause collection for this app
		this.pause=function(){try{this.paused=true;}catch(e){log("WM.App.pause: "+e);}}
		this.unPause=function(){try{this.paused=false;}catch(e){log("WM.App.unPause: "+e);}}

		//user defined types
		this.addUDT=function(params,drawOnly){try{
			//validate params or ask for input
			if (!exists(params) || !params.id) {
				params=params||{};
				var udtname=prompt("Enter the text name of the bonus type you wish to make (ie 'Horse')\n","");
				var udtid=this.appID+udtname.noSpaces().toLowerCase();
				udtid=prompt("OK, your type will read as '"+udtname+"'.\nNow modify this bonus type code to suit your needs.\n\nTip: You should prefix this code with the appID '"+this.appID+"', but it is not required.\nTip: Most sidekicks use lowercase and no spaces, but again, this is not a requirement.\n", udtid);
				if (udtid.trim()){
					params.id=udtid.trim();
					params.name=udtname;
				} else {
					alert("You supplied a blank user defined type ID. No type was created.");
					return false;
				}
			}
			if (!drawOnly){
				this.userDefinedTypes[params.id]=params.name;
				WM.quickOpts.userDefinedTypes[this.appID]=this.userDefinedTypes;
				WM.saveQuickOpts();
			}
			
			//draw the udt node
			if (this.udtNode){
				this.udtNode.appendChild(
					createElement("div",{className:"listItem"},[
						createElement("label",{textContent:params.id+" : "}),
						createElement("input",{value:params.name,title:"The display name of this type, used wherever bonus types are identified or selected.", onchange:function(){
							self.userDefinedTypes[params.id]=this.value;
							WM.quickOpts.userDefinedTypes[self.appID]=self.userDefinedTypes;
							WM.saveQuickOpts();
						}}),
						createElement("div",{className:"littleButton oddOrange", title:"Remove User-Defined Type"},[
							createElement("img",{className:"resourceIcon trash" +WM.opts.littleButtonSize,onclick:function(){
								var ask=WM.opts.appsConfirmDeleteUDT;
								if (!ask || (ask && confirm("Delete User Defined Type?"))) {
									delete self.userDefinedTypes[params.id];
									WM.quickOpts.userDefinedTypes[self.appID]=self.userDefinedTypes;
									WM.saveQuickOpts();
									remove (this.parentNode.parentNode);
								}
							}})
						]),
						(this.accText[params.id]||null)?createElement("span",{title:"The type id you created exactly matches one provided by the sidekick for this app. If you did not intend to overwrite that bonus's display text, you may wish to create another type id and destroy this one.",style:"color:red;",textContent:"Overwrites a sidekick-provided bonus type id."}):null,
					])
				);
			}			
		}catch(e){log("WM.App.addUDT: "+e);}}

		//unpause all bonus types for this app
		this.unpauseAllTypes=function(){try{
			for (var i=this.typesPaused.length-1;i>=0;i--){
				WM.unPauseByType(this,this.typesPaused[i]);
			}
		}catch(e){log("WM.App.unpauseAllTypes: "+e);}};


		//mass set priority for entire app post collection
		this.setPriority=function(n){try{
			for (var p in WM.posts) {
				var post=WM.posts[p];
				if (post.app==this) post.setPriority(n);
			}
		}catch(e){log("WM.App.setPriority: "+e);}};

		//mass set priority for all posts of type
		this.setPriorityByType=function(w,n){try{
			for (var p in WM.posts) {
				var post=WM.posts[p];
				if (post.app==this && post.which==w) post.setPriority(n);
			}
		}catch(e){log("WM.App.setPriorityByType: "+e);}};
		
		//reset accept/fail counters
		this.resetCounter=function(){try{
			this.acceptCount=0; 
			this.failCount=0;
		}catch(e){log("WM.App.resetCounter: "+e);}};

		//reset all config options for this app
		//except those outside the standard branch (dontsteal,blockautolike,etc.)
		this.resetConfig=function(){try{
			var ask=WM.opts.configConfirmRestore;
			if (!ask || (ask && confirm("Restore sidekick settings to defaults?"))) {
				this.config.configure({reset:true});
				this.config.save();
			}
		}catch(e){log("WM.App.resetConfig: "+e);}};		
		
		//fetch posts only for this app
		//normally used for initial fetching only
		this.fetchPosts=function(){try{
			WM.fetch({bypassPause:true, apps:this});
		}catch(e){log("WM.App.fetchPosts: "+e);}};

		this.fetchNewer=function(){try{
			WM.fetch({
				newer:true,
				apps:this,
				bypassPause:true,
				bypassAppDisabled:true
			});
		}catch(e){log("WM.App.fetchNewer: "+e);}};

		this.fetchOlder=function(){try{
			WM.fetch({
				older:true,
				apps:this,
				bypassPause:true,
				bypassAppDisabled:true
			});
		}catch(e){log("WM.App.fetchOlder: "+e);}};

		//get a list of posts for this app from the global posts list
		this.__defineGetter__("posts",function(){try{
			return matchByParam(WM.posts,"app",this,"object");
		}catch(e){log("WM.App.getPosts: "+e);}});
		
		//detect if this sidekick said it was chrome compatible
		this.__defineGetter__("isVer3",function(){try{
			return this.flags.postMessageCompatible || this.flags.worksInChrome;
		}catch(e){log("WM.App.isVer3: "+e);}});

		//detect if is paused
		this.__defineGetter__("paused",function(){try{
			return this._paused;
		}catch(e){log("WM.App.paused: "+e);}});
		this.__defineSetter__("paused",function(v){try{
			this._paused=v;
			//update the sidekick page button graphics
			var btn=this.pauseButtonNode;
			if (btn) {
				var btnSize=WM.opts.littleButtonSize;
				with (btn.parentNode) 
					className=className.swapWordB(this._paused,"oddGreen","oddOrange");
				with (btn) 
					className=className.swapWordB(this._paused,"playRight"+btnSize,"pause"+btnSize);
			}
			//do events
			if (this._paused) WM.rulesManager.doEvent("onAppPaused",this);
			else WM.rulesManager.doEvent("onAppUnpaused",this);			
		}catch(e){log("WM.App.paused: "+e);}});
		
		//detect if is enabled
		this.__defineGetter__("enabled",function(){try{
			return this._enabled;
		}catch(e){log("WM.App.enabled: "+e);}});
		this.__defineSetter__("enabled",function(v){try{
			this._enabled=v;
			
			//update the WM.quickOpts
			WM.quickOpts.masterSwitch[this.appID]=this._enabled;
			WM.saveQuickOpts();
			
			//update the sidekick page graphics
			if (this.toggleNode) this.toggleNode.checked=this._enabled;
			if (this.node) with (this.node){
				className=className.swapWordB(this._enabled,"enabled","disabled");
			}
			
			//do events
			if (this._enabled) WM.rulesManager.doEvent("onAppEnabled",this);
			else WM.rulesManager.doEvent("onAppDisabled",this);
		}catch(e){log("WM.App.enabled: "+e);}});
				
		this.__defineGetter__("acceptCount",function(){try{
			return this._acceptCount;
		}catch(e){log("WM.App.acceptCount: "+e);}});
		this.__defineSetter__("acceptCount",function(v){try{
			this._acceptCount=v;
			if (this.acceptCounterNode) this.acceptCounterNode.textContent=v;
		}catch(e){log("WM.App.acceptCount: "+e);}});
		
		this.__defineGetter__("failCount",function(){try{
			return this._failCount;
		}catch(e){log("WM.App.failCount: "+e);}});
		this.__defineSetter__("failCount",function(v){try{
			this._failCount=v;
			if (this.failCounterNode) this.failCounterNode.textContent=v;
		}catch(e){log("WM.App.failCount: "+e);}});

		this.__defineGetter__("totalCount",function(){try{
			return this._failCount+this._acceptCount;
		}catch(e){log("WM.App.totalCount: "+e);}});

		//detect if this app is bundled with another app
		//return the main app in this bundle
		this.__defineGetter__("synApp",function(){try{
			return this.parent||this;
		}catch(e){log("WM.App.synApp: "+e);}});
		
		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=WM.opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
		}catch(e){log("WM.App.toggleContent: "+e);}};

		this.showConfig=function(){try{
			this.config.open();
		}catch(e){log("WM.App.showConfig: "+e);}};

		this.disableOpt=function(w){try{
			this.opts[w]=false;
			this.config.set(w,false);
			this.config.save();
		}catch(e){log("WM.App.disableOpt: "+e);}};

		this.enableOpt=function(w){try{
			this.opts[w]=true;
			this.config.set(w,true);
			this.config.save();
		}catch(e){log("WM.App.enableOpt: "+e);}};
		
		//add menu elements
		try{
			/* no longer used in WM3
			if (this.menu) {
				//prefix all menu elements with the appID
				this.menu=WM.dock.fixMenu(this.menu,this.appID);
				//append this app's menu settings
				this.settingsBranch=WM.config.append({branch:"wmtab_games",data:this.menu});
			}
			//prefix all test returns with the appID
			WM.dock.fixTests(this.tests,this);
			//prefix all accept text id's with the appID
			WM.dock.fixAcceptTexts(this);
			*/
			
			//new method
			if (this.menu) this.config.append({data:this.menu});
			
			//I should really move these into the sidekick realm
			var data={}; 
			data["dynamic"+this.appID]=checkBox(this.name+" ("+this.appID+")",true);
			WM.config.append({branch:"enableDynamic",data:data});

			data={}; data[this.appID+"dontsteal"]=checkBox(this.name);
			WM.config.append({branch:"dontstealBlock",data:data});
			
			data={}; data["hide"+this.appID]=checkBox(this.name);
			WM.config.append({branch:"filterapps",data:data});
			
			data={}; data["nolike"+this.appID]=checkBox(this.name);
			WM.config.append({branch:"blockautolikebygame",data:data});
		} catch(e) {log("WM.App.init:addMenuElements: "+e);};
					
		//draw to #sidekickList (WM.console.sidekickNode)
		try{
			WM.console.sidekickNode.appendChild(
				this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+WM.opts.littleButtonSize:"treeExpand"+WM.opts.littleButtonSize)}),
						]),
						this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
							self.enabled=this.checked;
							with (self.node) className=className.toggleWordB(!this.checked,"disabled");
						}}),
						(this.icon)?createElement("img",{className:"icon crisp", src:this.icon,style:"width: 32px;vertical-align: middle"}):null,
						createElement("label",{textContent: this.name}),
						
						//toolbox
						createElement("div",{className:"littleButton odd"+(this.paused?"Green":"Orange"), title:"Pause/Unpause"},[
							this.pauseButtonNode=createElement("img",{className:"resourceIcon "+(this.paused?"playRight":"pause")+WM.opts.littleButtonSize,onclick:function(){self.paused=!self.paused;}})]),
						createElement("div",{className:"littleButton oddBlue", title:"Reset config for this app"},[
							createElement("img",{className:"resourceIcon uncheckAll"+WM.opts.littleButtonSize,onclick:function(){self.resetConfig();}})]),
						createElement("div",{className:"littleButton oddBlue", title:"Fetch Newer Posts"},[
							createElement("img",{className:"resourceIcon rssUpRight"+WM.opts.littleButtonSize,onclick:function(){self.fetchNewer();}})]),
						createElement("div",{className:"littleButton", title:"Fetch Older Posts"},[
							createElement("img",{className:"resourceIcon rssDownLeft" +WM.opts.littleButtonSize,onclick:function(){self.fetchOlder();}})]),
						
						//new sidekick config button
						this.configButton=createElement("button",{textContent:"Options", onclick:function(){self.config.open();}}),
					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"App ID:"}),
							createElement("span",{textContent:this.appID}),
						]),
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Support Provided By:"}),
							(this.desc)?createElement("span",{textContent: this.desc}):null, //provided in sidekick block
						]),
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Sidekick Help Link:"}),
							(this.helpLink)?createElement("a",{href:this.helpLink,textContent:this.helpLink}):null, //provided in sidekick block
						]),
						//browsers supported
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Browsers Supported:",style:"vertical-align:top;"}),
							createElement("img",{className:"resourceIcon firefox16", style:"display:inline-block;",title:"FireFox"}),
							(this.isVer3)?createElement("img",{className:"resourceIcon chrome16", style:"display:inline-block;",title:"Google Chrome"}):null,
						]),
						//types paused subbox
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Types Paused:",title:"This is a list of bonus types that are currently paused for this app."}),
							createElement("div",{className:"littleButton oddGreen",onclick:function(){self.unpauseAllTypes();},title:"Unpause all types by this app."},[
								createElement("img",{className:"resourceIcon playRight"+WM.opts.littleButtonSize}),
							]),
							this.typesPausedNode=createElement("div",{className:"subsection"}),
						]),				
						//attached apps
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Attached Apps:",title:"Additional apps filtered and processed by this sidekick."}),
							this.filtersNode=createElement("div",{className:"subsection"}),
						]),
						//helpers subbox
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Helpers:",title:"Sidekick helpers"}),
							this.helpersNode=createElement("div",{className:"subsection"}),
						]),
						//user defined types subbox
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"User-Defined Types:",title:"User Defined Types ('which')"}),
							createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addUDT();},title:"Add New User Defined Type"},[
								createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize}),
							]),
							this.udtNode=createElement("div",{className:"subsection"}),
						]),
					]),
				])
			);
		}catch(e){log("WM.App.init:addSidekickElement: "+e);};
		
		//create feed filters for this app
		try{
			var feeds=WM.feedManager.feeds;
			for (var f=0,len=feeds.length;f<len;f++){
				feeds[f].addFilter({id:"app_"+this.appID});
			}
		}catch(e){log("WM.App.init:createFeedFilters: ")+e;}

		//draw to collection filter coolbar
		try{
			//create game filter buttons on the WM.console
			var coolBar = WM.console.collectTabControl;
			if (coolBar) {
				//add a tab for this filter
				var tab = coolBar.addTab({
					text:(this.name||""),
					image:(this.icon||null),
					appFilter:this.appID,
					onSelect:WM.setAppFilter,
					selected:(WM.quickOpts.filterApp==this.appID),
				});
				this.collectionTabNode=tab.buttonNode;
				
				//force the image to have the 'crisp' drawing style
				tab.buttonNode.childNodes[0].className="icon crisp";
				
				//add accept/fail counters
				this.failCount=0;
				this.acceptCount=0;
				tab.buttonNode.insertBefore(
					createElement("div",{className:"accFailBlock"},[
						this.failCounterNode=createElement("span",{className:"fail",textContent:"0"}),
						this.acceptCounterNode=createElement("span",{className:"accept",textContent:"0"}),
					])
				, tab.textNode);
			}
		} catch(e) {log("WM.App.init:addConsoleElement: "+e);};
		
		//show additional filtered apps
		try{
			if (isArrayAndNotEmpty(this.addFilters)) {
				for (var f,filt;(filt=this.addFilters[f]);f++){
					//create an app object for this filter
					filt.parent=this;
					this.kids.push(new WM.App(filt));
					if (this.filtersNode) this.filtersNode.appendChild(
						createElement("div",{className:"line"},[
							createElement("img",{className:"icon crisp", src:filt.icon||null}),
							createElement("text",filt.name),
						])
					);
				}
			}
		} catch(e) {log("WM.App.init:addFilteredApps: "+e);};
		
		//draw my user defined types
		try{
			for (var u in this.userDefinedTypes){
				this.addUDT({id:u,name:this.userDefinedTypes[u]},true);
			}
		}catch(e){log("WM.App.init: drawUDTs: "+e);}
		
		//do events
		WM.rulesManager.doEvent("onSidekickReady",this);
		
		return self;
	}catch(e){log("WM.App.init: "+e);}};

//***************************************************************************************************************************************
//***** Post Class
//***************************************************************************************************************************************
	WM.Post = function(params){try{
		this.objType="post";
		var self=this;
		params=params||{};

		//set defaults
		this.state=""; //classnames
		this.flags=0; //similar to classnames
		this.node=null; //collector panel node
		this.originalData=JSON.stringify(params); //clone the original data from facebook for viewing later
		
		//convert FQL data to what we have previously expected from graph api		
		this.id=params.post_id;
		this.app=WM.apps[params.app_id];
		this.fromID=params.source_id.toString()||this.id.split("_")[0];
		this.permalink="http://www.facebook.com/"+this.id.split("_")[0]+"/posts/"+this.id.split("_")[1];
		this.fromName=params.fromName;
		this.date=params.created_time;
		this.message=params.message;
		this.name=params.attachment.name;
		this.title=params.name;
		this.caption=params.attachment.caption;
		this.description=params.attachment.description;
		this.picture=params.app_data.images;
		try{
			this.picture = JSON.parse(this.picture)[0].fbml.match(/https?\:.+\.(png|gif|jpg)/)[0];
		} catch(e){
			//picture data match failed, no big deal
			//leave the data messed up because rules manager might still be able to use it
		}
		this.linkHref=(params.action_links||null)?params.action_links[0].href:(params.attachment.media||null)?params.attachment.media[0].href:"";
		this.linkText=(params.action_links||null)?params.action_links[0].text:(params.attachment.media||null)?params.attachment.media[0].alt:"";
		this.targetID=params.target_id;
		this.isLiked=params.like_info.user_likes;
		
		//convert a unix date to a readable date
		this.realtime=(new Date(this.date*1000).toLocaleString());
		
		//set a timer on the post for delayed deletion
		this.drawTime=timeStamp();
		
		this._isLiked=false;
		this._isPinned=false;
		this._isPaused=false;
		this._isScam=false;
		this._isW2W=false;
		this._isForMe=false;
		this._isMyPost=false;
		this._isWishlist=false;
		this._isUndefined=false;
		this._status=0;
		this._isTimeout=false;
		this._isFailed=false;
		this._isAccepted=false;
		this._isExcluded=false;
		this._isStale=false;
		this._isCollect=false;
		this._isWorking=false;
		this._which=null;
		this._idText="";
		
		//use passed params
		//for (var p in params) this[p]=params[p];

		//link to our application array of objects
		//this.app=WM.apps[this.application.id];

		//shortcuts to app details
		this.__defineGetter__("synApp",function(){try{
			return this.app.synApp;
		}catch(e){log("WM.Post.synApp: "+e);}});

		this.__defineGetter__("postedDay",function(){try{
			var d=new Date(this.date*1000);
			return d.getFullYear()+"/"+d.getMonth()+"/"+d.getDay();
		}catch(e){log("WM.Post.postedDay: "+e);}});

		this.__defineGetter__("postedHour",function(){try{
			var d=new Date(this.date*1000);
			var h=d.getHours();
			var pm=(h/12)>1;
			return d.getFullYear()+"/"+d.getMonth()+"/"+d.getDay()+"   "+((h>12)?h-12:h)+":00"+((pm)?"PM":"AM");
		}catch(e){log("WM.Post.postedHour: "+e);}});

		this.__defineGetter__("appID",function(){try{
			return this.app.appID;
		}catch(e){log("WM.Post.appID: "+e);}});

		this.__defineGetter__("appName",function(){try{
			return this.app.name;
		}catch(e){log("WM.Post.appName: "+e);}});

		//get/set priority
		this.__defineGetter__("priority",function(){try{
			return this._priority;
		}catch(e){log("WM.Post.priority: "+e);}});
		this.__defineSetter__("priority",function(v){try{
			this._priority=v;
		}catch(e){log("WM.Post.priority: "+e);}});

		//get/set liked status
		this.__defineGetter__("isLiked",function(){try{
			return this._isLiked;
		}catch(e){log("WM.Post.isLiked: "+e);}});
		this.__defineSetter__("isLiked",function(v){try{
			this._isLiked=v;
			//remove the toolbutton if liked
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isLiked,"liked");
			if (this.likeButtonNode) with (this.likeButtonNode)
				className=className.toggleWordB(this._isLiked,"hidden");
		}catch(e){log("WM.Post.isLiked: "+e);}});

		//identification flags
		this.__defineGetter__("isScam",function(){try{
			return this._isScam;
		}catch(e){log("WM.Post.isScam: "+e);}});
		this.__defineSetter__("isScam",function(v){try{
			this._isScam=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isScam,"scam");
		}catch(e){log("WM.Post.isScam: "+e);}});

		this.__defineGetter__("isMyPost",function(){try{
			return this._isMyPost;
		}catch(e){log("WM.Post.isMyPost: "+e);}});
		this.__defineSetter__("isMyPost",function(v){try{
			this._isMyPost=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isMyPost,"isMyPost");
		}catch(e){log("WM.Post.isMyPost: "+e);}});

		this.__defineGetter__("isW2W",function(){try{
			return this._isW2W;
		}catch(e){log("WM.Post.isW2W: "+e);}});
		this.__defineSetter__("isW2W",function(v){try{
			this._isW2W=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isW2W,"w2w");
		}catch(e){log("WM.Post.isW2W: "+e);}});

		this.__defineGetter__("isForMe",function(){try{
			return this._isForMe;
		}catch(e){log("WM.Post.isForMe: "+e);}});
		this.__defineSetter__("isForMe",function(v){try{
			this._isForMe=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isForMe,"isForMe");
		}catch(e){log("WM.Post.isForMe: "+e);}});

		this.__defineGetter__("isWishlist",function(){try{
			return this._isWishlist;
		}catch(e){log("WM.Post.isWishlist: "+e);}});
		this.__defineSetter__("isWishlist",function(v){try{
			this._isWishlist=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isWishlist,"wishlist");
		}catch(e){log("WM.Post.isWishlist: "+e);}});

		this.__defineGetter__("isUndefined",function(){try{
			return this._isUndefined;
		}catch(e){log("WM.Post.isUndefined: "+e);}});
		this.__defineSetter__("isUndefined",function(v){try{
			this._isUndefined=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isUndefined,"noDef");
		}catch(e){log("WM.Post.isUndefined: "+e);}});

		this.__defineGetter__("isStale",function(){try{
			return this._isStale;
		}catch(e){log("WM.Post.isStale: "+e);}});
		this.__defineSetter__("isStale",function(v){try{
			this._isStale=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isStale,"stale");
		}catch(e){log("WM.Post.isStale: "+e);}});

		this.__defineGetter__("isTimeout",function(){try{
			return this._isTimeout;
		}catch(e){log("WM.Post.isTimeout: "+e);}});
		this.__defineSetter__("isTimeout",function(v){try{
			this._isTimeout=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isTimeout,"timeout");
		}catch(e){log("WM.Post.isTimeout: "+e);}});

		this.__defineGetter__("isCollect",function(){try{
			return this._isCollect;
		}catch(e){log("WM.Post.isCollect: "+e);}});
		this.__defineSetter__("isCollect",function(v){try{
			this._isCollect=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isCollect,"collect");
		}catch(e){log("WM.Post.isCollect: "+e);}});

		this.__defineGetter__("isExcluded",function(){try{
			return this._isExcluded;
		}catch(e){log("WM.Post.isExcluded: "+e);}});
		this.__defineSetter__("isExcluded",function(v){try{
			this._isExcluded=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isExcluded,"excluded");
		}catch(e){log("WM.Post.isExcluded: "+e);}});

		this.__defineGetter__("isAccepted",function(){try{
			return this._isAccepted;
		}catch(e){log("WM.Post.isAccepted: "+e);}});
		this.__defineSetter__("isAccepted",function(v){try{
			this._isAccepted=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isAccepted,"accepted");
		}catch(e){log("WM.Post.isAccepted: "+e);}});

		this.__defineGetter__("isFailed",function(){try{
			return this._isFailed;
		}catch(e){log("WM.Post.isFailed: "+e);}});
		this.__defineSetter__("isFailed",function(v){try{
			this._isFailed=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isFailed,"failed");
		}catch(e){log("WM.Post.isFailed: "+e);}});

		this.__defineGetter__("isWorking",function(){try{
			return this._isWorking;
		}catch(e){log("WM.Post.isWorking: "+e);}});
		this.__defineSetter__("isWorking",function(v){try{
			this._isWorking=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isWorking,"working");
		}catch(e){log("WM.Post.isWorking: "+e);}});

		this.__defineGetter__("isColored",function(){try{
			return this._isColored;
		}catch(e){log("WM.Post.isColored: "+e);}});
		this.__defineSetter__("isColored",function(v){try{
			this._isColored=v;
			if (this._isColored && this.colorOverride && this.node) this.node.style.setProperty("background-color",this.colorOverride,"important");
		}catch(e){log("WM.Post.isColored: "+e);}});
		
		//get/set post pinned
		this.__defineGetter__("isPinned",function(){try{
			return this._isPinned;
		}catch(e){log("WM.Post.isPinned: "+e);}});
		this.__defineSetter__("isPinned",function(v){try{
			this._isPinned=v;
			//rotate the pin icon
			var btnSize=WM.opts.littleButtonSize;
			if (this.pinImageNode) with (this.pinImageNode) 
				className=className.swapWordB(this._isPinned,"pinned"+btnSize,"pin"+btnSize);
			//pinned class
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isPinned,"pinned");
		}catch(e){log("WM.Post.isPinned: "+e);}});

		//get/set post paused
		this.__defineGetter__("isPaused",function(){try{
			return this._isPaused;
		}catch(e){log("WM.Post.isPaused: "+e);}});
		this.__defineSetter__("isPaused",function(v){try{
			this._isPaused=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isPaused,"paused");
		}catch(e){log("WM.Post.isPaused: "+e);}});

		//get/set status
		this.__defineGetter__("status",function(){try{
			return this._status;
		}catch(e){log("WM.Post.status: "+e);}});
		this.__defineSetter__("status",function(v){try{
			this._status=v;
			if (this.statusTextNode) this.statusTextNode.textContent=this._status;
		}catch(e){log("WM.Post.status: "+e);}});

		//get/set idText
		this.__defineGetter__("idText",function(){try{
			return this._idText;
		}catch(e){log("WM.Post.idText: "+e);}});
		this.__defineSetter__("idText",function(v){try{
			this._idText=v;
			if (this.linkNode) this.linkNode.textContent=((this._idText||null) && WM.opts.debugrecog)?this._idText:this.linkText;
		}catch(e){log("WM.Post.idText: "+e);}});
		
		//get/set which bonus type this is
		this.__defineGetter__("which",function(){try{
			return this._which;
		}catch(e){log("WM.Post.which: "+e);}});
		this.__defineSetter__("which",function(v){try{
			this._which=v;
			if (this.whichTextNode) this.whichTextNode.textContent=this._which;
		}catch(e){log("WM.Post.which: "+e);}});

		//check if in history already
		this.__defineGetter__("alreadyProcessed",function(){try{
			return exists(WM.history[this.id]);
		}catch(e){log("WM.Post.alreadyProcessed: "+e);}});
		
		/*
		//update the namespace parameter if it does not exist
		if (!exists(this.app.namespace)) this.app.namespace=this.application.namespace;

		//validate the application namespace for sidekicks that provide namespace checking
		if (exists(this.app.namespace) && (this.app.namespace!=this.application.namespace)) {
			//Graph API namespace does not match sidekick known namespace, flag as scam
			this.isScam=true; 
		}		

		//now drop the application object we got from FB
		if (exists(this.application)) delete this.application;
		*/
		
		//this.fromID=this.from.id;
		//this.fromName=this.from.name;
		this.fromNameLastFirst=this.fromName;
		var sp=this.fromName.split(" ");
		if (isArray(sp) && sp.length>1) {
			this.fromNameLastFirst = sp.pop()+", "+sp.join(" ");
		}


		
		//(re)identify this post
		this.identify=function(params){try{
			params=params||{};
			
			//shortcuts
			var post=this;
			var app=post.app;
			var synApp=app.synApp;
		
			//set/reset priority, state, status & flags
			this.priority=50;
			this.status=0;
			this.state="";
			
			//prevent reset of some data holders
			if (!params.reid) {
				this.testData={};
				this.isLiked=false;
				this.isMyPost=false;
				this.isW2W=false;
				this.isForMe=false;
				this.isScam=false;
			}
			
			//reset data holders
			this.isStale=false;
			this.isCollect=false;
			this.isExcluded=false;
			this.isFailed=false;
			this.isAccepted=false;
			this.isPaused=false;
			this.isPinned=false;
			this.isUndefined=false;
			this.isWishlist=false;
			this.isTimeout=false;
			
			//avoid posts that belong to a disabled sidekick
			if(!WM.quickOpts.masterSwitch[app.appID]) {
				//master switch is off
				this.isExcluded=true;
				return true; //draw without identifying anything
			}

			//hide posts by apps that we specifically told to hide
			if (WM.opts["hide"+app.appID]) {this.remove(); return false;}

			//avoid potential scam posts
			/*if (WM.opts.scamblock) {
				if (!params.reid) {
					this.isScam=(!this.linkHref.match(new RegExp("^http(s):\/\/apps\.facebook\.com\/"+app.namespace))!=null);
				}
				if (this.isScam){
					this.isExcluded=true;
					if (WM.opts.hidescams) {this.remove(); return false;}
				}
			}*/

			//avoid posts by self
			if (!params.reid) {
				var whoPosted = this.fromID;
				var whoName = this.fromName;
				this.isMyPost=(whoPosted==WM.currentUser.id);
			}
			if (this.isMyPost){
				this.isExcluded=true;
				if (WM.opts.hidemyposts) {this.remove(); return false;}
			}

			//avoid W2W posts not for me
			if (!params.reid){
				this.isForMe = (this.targetID==WM.currentUser.id);
				this.isW2W = (this.targetID||null);
			}
			if (WM.opts[app.appID+"dontsteal"] && this.isW2W && !this.isForMe){
				this.isExcluded=true;
				if (WM.opts.hidenotforme) {this.remove(); return false;}
			}

			//avoid posts older than olderLimit
			if (olderLimit!=0) {
				if (this.isStale=this.checkStale(olderLimit)){
					if (WM.opts.skipstale) this.isExcluded=true;
					if (WM.opts.hidestale) {this.remove(); return false;}
				}
			}

			//get bonus type
			var w=(this.which = WM.which(this,{reid:params.reid}));

			//check for exclude type
			if (w=="exclude") {
				this.isExcluded=true;
			}

			//check for pause
			if(synApp.typesPaused.inArray(w)) this.isPaused=true;
			
			//check if undefined
			if (w=="none") {
				this.isUndefined=true;
			}
			if (w==synApp.appID+"doUnknown" || w==synApp.appID+"send") {
				this.isUndefined=true;
			}

			//special pin undefined option
			if (WM.opts.pinundefined && this.isUndefined) this.isPinned=true;

			//check if liked by me		
			if (this.isLiked){
				if (WM.opts.skipliked){
					if (WM.opts.markliked) this.status=1; //mark liked as accepted
					this.isExcluded=true;
				}
				if (WM.opts.hideliked) {this.remove(); return false;}
			}

			//check history
			this.status=this.status||0;
			if (this.alreadyProcessed) {
				//post previously processed
				this.status=(WM.history[this.id].status||0);

				var gotItem=((this.status>0) || (this.status==-6) || (this.status==-4) || (this.status==-15 && WM.opts.accepton15));
				if (gotItem) {
					this.isAccepted=true;
				} else if (this.status<0) {
					this.isFailed=true;
				}

				if (WM.opts.hideaccepted && gotItem) {this.remove(); return false;}
				if (WM.opts.hidefailed && this.status<0) {this.remove(); return false;}
			}

			//check if excluded
			if (this.isExcluded && WM.opts.hideexcluded) {this.remove(); return false;}

			//set identified text
			this.idText=WM.getAccText(synApp.appID,w,(this.alreadyProcessed),this.status);

			//check if wanted
			this.isCollect=(!this.alreadyProcessed && 
				(w=="dynamic" || WM.apps[this.synApp.appID].opts[w] || 
					(w.startsWith("send") && WM.apps[this.synApp.appID].opts["sendall"])
				)
			);

			//check if wishlist
			if (w.find("wishlist")) {
				this.isWishlist=true;
				if (WM.opts.hideunwanted && !WM.opts.donthidewishlists) {this.remove(); return false;}
			}
			
			//if unwanted
			if (!this.isCollect && WM.opts.hideunwanted) {this.remove(); return false;}
			
			//debug post
			/*var pkg=debug.print("WM.Post.debug: ");
			pkg.msg.appendChild(createElement("button",{type:"button",onclick:function(){
					//response.responseText.toClipboard();
					promptText(JSON.stringify(self));
				}},[
				createElement("img",{src:"http://i1181.photobucket.com/albums/x430/merricksdad/array.png",title:"Show Data",style:"width:16px;height:16px; vertical-align:bottom;"})
			]));*/
			
			//return true to draw, false to hide
			return true;
			
		}catch(e){log("WM.Post.identify: "+e);}};

		//open this post using the collector system
		this.open=function(params){try{
			params=params||{};
			var post = this;
			var id = this.id;
			var app = this.app;
			var synApp = this.synApp;

			//perform the onBefore Collect event
			WM.rulesManager.doEvent("onBeforeCollect",post);

			//fix the link based on sidekick alterlink information
			var alterLink=(synApp.alterLink||null);
			var targetHref = post.linkHref;
			var doAlterLink=(synApp.flags.alterLink||false);
			if (doAlterLink && alterLink) {
				//alert("doing alterlink...");
				//pack the alterlink into an array, or detect an array
				if (!isArray(alterLink)) alterLink=[alterLink];
				
				//iterate link alteration commands
				for (var alt=0,alteration;(alteration=alterLink[alt]);alt++) {
				
					//alert("making alteration...");
							
					//note that only find and replace functionality is available right now, no wildcards or array inserts will work
					var find = (alteration.find||"");
					alteration.dataSource=(alteration.dataSource||"either");
					
					//check if user is wanting a regex or string replacement
					if (alteration.isRegex||false) find=new RegExp(find,"");
										
					targetHref = targetHref.replace(find,(alteration.replace||""));


					//check for word specific changes
					if ((alteration.words||null) && (alteration.conversionChart||null)){
						//alert("inserting words...");
						
						//new alterlink capability to change data source from 'either' to another post part
						var dataSource = post.testData[alteration.dataSource].toLowerCase();
						
						//alert(dataSource);
						
						for (var w=0,len=alteration.words.length; w<len; w++) {
							var word=(alteration.words[w]).toLowerCase();
							if (dataSource.contains(word)) {
								//replace the word
								targetHref=targetHref.replace("{%1}",alteration.conversionChart[word.noSpaces()]);
								break;
							}
						}
					}
				
				}
			}

			//fix the link, removing https and switching to http only
			targetHref = targetHref.replace('https://','http://');

			//open the bonus page in a new tab or the previously opened tab object to save memory
			this.isWorking=true;
			post.state="working";
			WM.requestsOpen++;
			doAction(function(){WM.collector.open({url:targetHref,id:id,callback:(synApp.isVer3?WM.onFrameLoad3:WM.onFrameLoad),post:post,first:params.first||false,emergency:params.emergency||false});});
		}catch(e){log("WM.Post.open: "+e);}};

		//open this post using the collector system even if already tried
		this.forceOpen=function(params){try{
			var post=self;
			this.isCollect=true;
			this.isFailed=false;
			this.isTimeout=false;
			this.isAccepted=false;
			post.open(params);
		}catch(e){log("WM.Post.forceOpen: "+e);}};

		//like this post using the collector system
		this.like=function(){try{
			//var url=this.permalink;
			var self=this;
			//setTimeout(function(){WM.collector.open({url:url+"#likeit=true",id:url,callback:WM.onLikePost,post:self});},100);
			//Graph.likePost(this.id,{callback:WM.onLikePost,post:self});
			setTimeout(function(){Graph.likePost(self.id,{callback:WM.onLikePost,post:self});},100);
		}catch(e){log("WM.Post.like: "+e);}};

		//comment on this post using the collector system
		this.comment=function(commentOverride){try{
			if (commentOverride=="") commentOverride = null;
			//not ready
			//confirm("Feature not ready");
			//return;
			//var url=this.permalink;
			var self=this;
			var say = commentOverride || WM.opts.autocommentlist.split("\n").pickRandom();
			//setTimeout(function(){WM.collector.open({url:url+"#commentit=true&say="+say,id:url,callback:WM.onLikePost,post:self});},100);
			log("commenting "+say);
			//Graph.commentPost(this.id,say);
			setTimeout(function(){Graph.commentPost(self.id,say);},100);
		}catch(e){log("WM.Post.comment: "+e);}};

		//cancel collection in progress
		this.cancelProcess=function(){
			//tell the collector to cancel any processes with post equal this
			//this will cancel both collect and like activities
			WM.collector.cancelProcess({search:"post",find:this});
			this.processCancelled=true;
		},

		//cancel collection in progress
		this.refreshProcess=function(){
			//tell the collector to reload the href on processes with post equal this
			//this will reload both collect and like activities
			WM.collector.refreshProcess({search:"post",find:this});
			this.processRestarted=true;
		},

		//change the background color of this post
		this.setColor=function(color){try{
			this.colorOverride=color;
			this.isColored=(cBool(color));
		}catch(e){log("WM.Post.setColor: "+e);}};
		
		//change the bonus type of this post
		//and mark it for collection if needed
		//and update its idText
		this.setWhich=function(w){try{
			this.which=w;
			if ((w=="dynamic") || WM.apps[this.synApp.appID].opts[w] || (w.startsWith("send") && WM.apps[this.synApp.appID].opts["sendall"]) ) {
				this.isCollect=!this.alreadyProcessed;
			}
			//update the identified text
			this.idText=WM.getAccText(this.synApp.appID,w,(this.alreadyProcessed),this.status);
		}catch(e){log("WM.Post.setWhich: "+e);}};
		
		//get the time passed since this post was created
		this.__defineGetter__("age",function(){try{
			return timeStamp()-(this.date*1000);
		}catch(e){log("WM.Post.age: "+e);}});

		this.__defineGetter__("whichText",function(){try{
			if (this.which=="dynamic") return "Dynamic Grab";
			return this.synApp.userDefinedTypes[this.which]||this.synApp.accText[this.which];
		}catch(e){log("WM.Post.whichText: "+e);}});

		this.draw=function(redraw,reorder){try{
			var post=this;
			var app=post.app;
			var synApp=app.synApp;
			
			//clean old display
			if (this.node && redraw) {
				remove(this.node);
				this.node=null;
			}

			//prefetch css words
			var tags=("")
				.toggleWordB(post.isAccepted,"accepted")
				.toggleWordB(post.isFailed,"failed")
				.toggleWordB(post.isTimeout,"timeout")
				.toggleWordB(post.isExcluded,"excluded")
				.toggleWordB(post.isStale,"stale")
				.toggleWordB(post.isCollect && !(post.isAccepted||post.isFailed),"collect")
				.toggleWordB(post.isWorking,"working")
				.toggleWordB(post.isW2W,"w2w")
				.toggleWordB(post.isForMe,"isForMe")
				.toggleWordB(post.isMyPost,"isMyPost")
				.toggleWordB(post.isColored,"colored")
				.toggleWordB(post.isPaused,"paused")
				.toggleWordB(post.isPinned,"pinned")
				.toggleWordB(post.isUndefined,"noDef")
				.toggleWordB(post.isWishlist,"wishlist")
				.toggleWordB(post.isScam,"scam")
				.toggleWordB(post.isLiked,"liked");
									
			//detect hidden/drawn image
			var hideimage = (WM.opts.hideimages || (WM.opts.hideimagesunwanted && (post.which==="none" || post.which==="exclude") ) );
			var fakeimage = hideimage && WM.quickOpts.displayMode!="0";
			hideimage=hideimage && WM.quickOpts.displayMode=="0";
			
			//shared elements
			if (redraw){
				post.toolboxNode=createElement("div",{className:"toolBox small inline"});
				post.imageNode=createElement("img",{className:((!fakeimage && post.picture)?"":"resourceIcon noImageSmall16"),src:((!fakeimage)?post.picture:""||""),onerror:function(){this.className=this.className+" resourceIcon noImageSmall16"}});
				post.imageLinkNode=(!hideimage)?
					createElement("span",{href:jsVoid,className:"picture",onclick:function(){post.forceOpen();} },[
						post.imageNode
					]):null;
				post.floaterNode=null;
				post.bodyNode=null;
				post.actorNode=createElement("a",{className:"actor",textContent:post.fromName,href:"http://www.facebook.com/profile.php?id="+post.fromID});
				post.titleNode=createElement("span",{className:"title",textContent:post.name});
				post.captionNode=createElement("span",{className:"caption",textContent:post.caption});
				post.descriptionNode=createElement("span",{className:"description",textContent:post.description});
				post.dateNode=createElement("span",{className:"postDate",textContent:[post.date,post.realtime]});
				post.viaNode=createElement("a",{className:"appName",textContent:"  via "+app.name,href:"http://apps.facebook.com/"+app.namespace+"/",title:app.appID});
				post.linkNode=createElement("a",{className:"linkText"+(post.isExcluded?" excluded":"")+(post.idText?" identified":""),textContent:((post.idText||null) && WM.opts.debugrecog)?post.idText:post.linkText,href:post.linkHref,title:post.linkText});
				post.statusNode=createElement("span",{className:"status",textContent:"Status: "+(post.status||"0")+ " " + (WM.statusText[post.status||"0"])});
				post.pausedNode=createElement("div",{className:"pausedHover",title:"Collection for this post is paused, click to reactivate.",onclick:function(){post.isPaused=false;}},[createElement("img",{className:"resourceIcon playRight64"})]);
				
				//create the layout
				switch (WM.quickOpts.displayMode||"0"){

					case "0": //classic mode
						post.node=createElement("div",{id:"post_"+post.id,className:"wm post classic "+tags+((hideimage)?" noimage":""),title:(post.isScam?"Post is possible scam":"")},[
							post.toolboxNode,
							post.actorNode,
							post.imageLinkNode,
							(!WM.opts.hidebody)?post.bodyNode=createElement("div",{className:"body"},[
								post.titleNode,
								(post.caption||null)?post.captionNode:null,
								(post.description||null)?post.descriptionNode:null,
							]):null,
							createElement("div",{style:"margin-top:5px;"},[
								(!WM.opts.hidedate)?post.dateNode:null,
								(!WM.opts.hidevia)?post.viaNode:null,
								post.linkNode,
							]),
							post.pausedNode,
						]);
						break;

					case "1": case "3": //short mode and old priority mode
						post.node=createElement("div",{id:"post_"+post.id,className:"wm post short "+WM.opts.thumbsize+tags,title:(post.isScam?"Post is possible scam":"")},[
							post.imageLinkNode,
							post.floaterNode=createElement("div",{id:"floater_"+post.id,className:"floater "+WM.opts.thumbsize},[
								post.toolboxNode,
								post.actorNode,
								post.dateNode,
								post.viaNode,
								post.linkNode,
								post.statusNode,
								post.pausedNode,
							]),
						]);
						post.imageNode.onmousemove=WM.moveFloater;
						break;

					case "2": //dev mode
						var fnLine=function(label,text){
							return createElement("div",{className:"line"},[
								createElement("label",{textContent:label+": "}),
								createElement("span",{textContent:text})
							]);
						};
						post.node=createElement("div",{id:"post_"+post.id,className:"listItem wm post dev "+tags,title:(post.isScam?"Post is possible scam":"")},[
							post.idNode=fnLine("id", post.id),
							post.toolboxNode,
							//post.imageLinkNode,
							createElement("div",{className:"subsection"},(function(){
								var ret = [];
								ret.push(post.actorNode=fnLine("fromName (fromID)", post.fromName+"("+post.fromID+")"));
								ret.push(post.titleNode=fnLine("title",post.name));
								if (post.message||null)ret.push(post.messageNode=fnLine("msg",post.message));
								if (post.caption||null)ret.push(post.captionNode=fnLine("caption",post.caption)); 
								if (post.description||null)ret.push(post.descriptionNode=fnLine("desc",post.description)); 
								ret.push(post.appImageNode=fnLine("img",post.picture));
								ret.push(post.dateNode=fnLine("date",post.realtime));
								ret.push(post.appNameNode=fnLine("appName",app.name));
								ret.push(post.appIDNode=fnLine("appID",app.appID));
								ret.push(post.canvasNode=fnLine("canvas",app.namespace));
								ret.push(post.urlNode=fnLine("url",post.linkHref));

								//show likes
								if (post.likes||null){
									if (post.likes.data||null){
										ret.push(fnLine("likes",""));
										ret.push(post.likesNode=createElement("div",{className:"subsection"},(function(){
											var data=post.likes.data;
											var retData=[];
											for(var d=0,lenL=data.length; d<lenL; d++){
												retData.push(fnLine("likeName(likeID)",data[d].name+"("+data[d].id+")"));
											}
											return retData;
										})()));
									}
								}

								//show comments
								if (post.comments||null){
									if (post.comments.data||null){
										ret.push(fnLine("comments",""));
										ret.push(post.commentsNode=createElement("div",{className:"subsection"},(function(){
											var data=post.comments.data;
											var retData=[];
											for(var d=0,lenC=data.length; d<lenC; d++){
												retData.push(fnLine("commentorName(commentorID)",data[d].from.name+"("+data[d].from.id+")"));
												retData.push(fnLine("comment",data[d].message));
											}
											return retData;
										})()));
									}
								}
								ret.push(post.idTextNode=fnLine("idText",post.idText));
								ret.push(post.whichNode=fnLine("which",post.which));
								ret.push(post.linkTextNode=fnLine("linkText",post.linkText));

								return ret;
							})() ),
							post.pausedNode
						]);
						break;
				}

				//add the toolbox
				post.addToolBox();
			
				//use color override
				if (post.colorOverride) {
					post.node.style.setProperty("background-color",post.colorOverride,"important");
				}
			}

			//if a filter exists check against filter
			var filter=(WM.quickOpts.filterApp||"All");
			if (filter!="All" && filter!=app.appID) {
				//dont show this post in this filter
				if (this.node) remove(this.node);
				return;
			}

			//insert the post into view by sort order
			if (redraw || reorder) {
				var groupBy=WM.quickOpts.groupBy;
				if (groupBy){
					//detect/create group
					var group=WM.newGroup({by:post[groupBy]});
					var sibling=post.nextSibling();
					if (sibling) group.insertBefore(post.node,sibling.node);
					else group.appendChild(post.node);
				} else {
					var sibling=post.nextSibling();
					if (sibling) WM.console.feedNode.insertBefore(post.node, sibling.node);
					else WM.console.feedNode.appendChild(post.node);
				}
			}
		}catch(e){log("WM.Post.draw: "+e);}};

		this.openSource=function(){try{
			var url=this.permalink;
			//FF22 version
			GM_openInTab(url,"_blank");
			//FF21 version
			//((WM.opts.useGM_openInTab)?GM_openInTab:window.open)(url,"_blank");
		}catch(e){log("WM.Post.openSource: "+e);}};

		this.addClass=function(s){try{
			if (this.node){
				this.node.className=this.node.className.addWord(s);
			}
		}catch(e){log("WM.Post.addWord: "+e);}};

		this.removeClass=function(s){try{
			if (this.node){
				this.node.className=this.node.className.removeWord(s);
			}
		}catch(e){log("WM.Post.removeWord: "+e);}};

		this.pause=function(){try{
			this.isPaused=true;
		}catch(e){log("WM.Post.pause: "+e);}};

		this.unPause=function(){try{
			this.isPaused=false;
		}catch(e){log("WM.Post.unPause: "+e);}};

		this.exclude=function(){try{
			this.isExcluded=true;
		}catch(e){log("WM.Post.exclude: "+e);}};

		this.collect=function(){try{
			this.isCollect=true;
		}catch(e){log("WM.Post.collect: "+e);}};

		this.stopCollect=function(){try{
			this.isCollect=false;
		}catch(e){log("WM.Post.collect: "+e);}};

		this.togglePin=function(){try{
			this.isPinned=!this.isPinned;
		}catch(e){log("WM.Post.togglePin: "+e);}};

		this.pin=function(){try{
			this.isPinned=true;
		}catch(e){log("WM.Post.pin: "+e);}};

		this.unPin=function(){try{
			this.isPinned=false;
		}catch(e){log("WM.Post.unPin: "+e);}};

		this.addToFeeds=function(){try{
			WM.feedManager.newFeed({id:this.fromID, title:this.fromName});
			WM.feedManager.save();
		}catch(e){log("WM.Post.addToFeeds: "+e);}};

		this.accept=function(mark){try{
			this.isAccepted=true;
			this.isFailed=false;
			this.isTimeout=false;
			this.isWorking=false;
			this.isCollect=false;
			if (mark) WM.setAsAccepted(null, 3,this);
		}catch(e){log("WM.Post.accept: "+e);}};

		this.fail=function(mark){try{
			this.isFailed=true;
			this.isAccepted=false;
			this.isTimeout=false;
			this.isWorking=false;
			this.isCollect=false;
			if (mark) WM.setAsFailed(null, -18,this);
		}catch(e){log("WM.Post.fail: "+e);}};

		this.timeout=function(){try{
			this.isTimeout=true;
			this.isAccepted=false;
			this.isFailed=false;
			this.isWorking=false;
			this.isCollect=false;
		}catch(e){log("WM.Post.timeout: "+e);}};

		this.remove=function(){try{
			var node=(this.node||$("post_"+this.id));
			if (node && node.parentNode) remove(node);
			this.node=null;
			
			//turn this post into a ghost so we can keep its data
			//for linked objects, but not process it in reid or redraw
			this.isGhost=true;
			
			//delete WM.posts[this.id];
		}catch(e){log("WM.Post.remove: "+e);}};

		this.addToolBox=function(){try{
			var post=this;
			if (!WM.opts.showtoolbox) return;
			var toolNode = post.toolboxNode;
			if (toolNode) toolNode.appendChild(
				createElement("div",{},[
					createElement("div",{onclick:function(){post.forceOpen();},title:"Open Post",className:"littleButton oddBlue"+((!WM.opts.showopen)?" hidden":"")},[
						createElement("img",{className:"resourceIcon action"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.cancelProcess();},title:"Cancel Process or AutoLike",className:"littleButton oddBlue"+((!WM.opts.showcancelprocess)?" hidden":"")},[
						createElement("img",{className:"resourceIcon cancelProcess"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.refreshProcess();},title:"Restart Process or AutoLike",className:"littleButton oddBlue"+((!WM.opts.showrestartprocess)?" hidden":"")},[
						createElement("img",{className:"resourceIcon refreshProcess"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){WM.pauseByType(post.app, post.which);},title:"Pause all bonuses of this type",className:"littleButton oddOrange"+((!WM.opts.showpausetype)?" hidden":"")},[
						createElement("img",{className:"resourceIcon stop"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){WM.unPauseByType(post.app, post.which);},title:"Unpause all bonuses of this type",className:"littleButton oddGreen"+((!WM.opts.showunpausetype)?" hidden":"")},[
						createElement("img",{className:"resourceIcon playRight"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){window.open(post.permalink,"_blank");},title:"Show Post Source",className:"littleButton oddBlue"+((!WM.opts.showpostsrc)?" hidden":"")},[
						createElement("img",{className:"resourceIcon openInNewWindow"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.remove();},title:"Clean",className:"littleButton oddOrange"+((!WM.opts.showclean)?" hidden":"")},[
						createElement("img",{className:"resourceIcon trash"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.togglePin();},title:"Pin",className:"littleButton"+((!WM.opts.showpin)?" hidden":"")},[
						post.pinImageNode=createElement("img",{className:"resourceIcon "+(post.isPinned?"pinned":"pin")+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.moveToBottom();},title:"Move to Bottom",className:"littleButton oddOrange"+((!WM.opts.showmovebottom)?" hidden":"")},[
						createElement("img",{className:"resourceIcon moveBottomLeft"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.moveToTop();},title:"Move to Top",className:"littleButton oddGreen"+((!WM.opts.showmovetop)?" hidden":"")},[
						createElement("img",{className:"resourceIcon moveTopLeft"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.reID();},title:"ReID Post",className:"littleButton"+((!WM.opts.showreid)?" hidden":"")},[
						createElement("img",{className:"resourceIcon identify"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.addToFeeds();},title:"Add To Feeds",className:"littleButton"+((!WM.opts.showaddfeed)?" hidden":"")},[
						createElement("img",{className:"resourceIcon addFeed"+WM.opts.littleButtonSize})]),
					post.likeButtonNode=createElement("div",{onclick:function(){post.like();},title:"Like Post",className:"likeButton littleButton oddBlue"+(post.isLiked?" hidden":"")+((!WM.opts.showlike)?" hidden":"")},[
						createElement("img",{className:"resourceIcon like"+WM.opts.littleButtonSize})]),
					
					createElement("div",{onclick:function(){post.comment();},title:"Auto Comment",className:"littleButton oddBlue"+((!WM.opts.showautocomment)?" hidden":"")},[
						createElement("img",{className:"resourceIcon comment"+WM.opts.littleButtonSize})]),
					
					createElement("div",{onclick:function(){post.fail(true);},title:"Mark as Failed",className:"littleButton oddOrange"+((!WM.opts.showmarkfailed)?" hidden":"")},[
						createElement("img",{className:"resourceIcon minus"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.accept(true);},title:"Mark as Accepted",className:"littleButton oddGreen"+((!WM.opts.showmarkaccepted)?" hidden":"")},[
						createElement("img",{className:"resourceIcon plus"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){WM.rulesManager.ruleFromPost(post);},title:"Create Rule From Post",className:"littleButton oddBlue"+((!WM.opts.showmakerule)?" hidden":"")},[
						createElement("img",{className:"resourceIcon gotoLibrary"+WM.opts.littleButtonSize})]),
					createElement("div",{onclick:function(){promptText(self.originalData,true);},title:"Show Original Data",className:"littleButton"+((!WM.opts.showoriginaldata)?" hidden":"")},[
						createElement("img",{className:"resourceIcon object"+WM.opts.littleButtonSize})]),
				])
			);
		}catch(e){log("WM.Post.addToolBox: "+e);}};

		/*
		this.__defineGetter__("linkText", function(){try{
			if (this.actions.length >=3) return this.actions.last().name||"";
			else return "";
		}catch(e){log("WM.Post.linkText: "+e);}});

		this.__defineGetter__("linkHref", function(){try{
			return this.link||((this.actions.length>=3)?(this.actions.last().link||""):"")||"";

			if (this.actions.length >=3) return this.actions.last().link||"";
			else return this.link||"";
		}catch(e){log("WM.Post.linkHref: "+e);}});
		*/

		/*this.actionLink=function(action){try{
			//for (var a=0,act;(act=this.actions[a]);a++) if (act.name.toLowerCase()==action.toLowerCase()) {return act.link; break;}
			return this.linkHref;
		}catch(e){log("WM.Post.actionLink: "+e);}};*/

		this.__defineGetter__("body", function(){try{
			return (this.title||"")+" "+(this.caption||"")+" "+(this.description||"");
		}catch(e){log("WM.Post.body: "+e);}});

		this.__defineGetter__("either", function(){try{
			return this.linkText+" "+this.body;
		}catch(e){log("WM.Post.either: "+e);}});

		/*this.__defineGetter__("date", function(){try{
			return this["created_time"];
		}catch(e){log("WM.Post.date: "+e);}});*/

		this.checkStale=function(timeOverride) {try{
			if (exists(timeOverride) && timeOverride==0) return false;
			var now = timeStamp();
			var pubTime = this.date*1000; //(this.date.length < 10)?this.date+"000":this.date;
			//var pubTime = this.date+"000";
			var aDay = (1000 * 60 * 60 * 24);
			return (now-pubTime)>(timeOverride||aDay);
		}catch(e){log("WM.Post.checkStale: "+e);}};

		//req must equal "id" or "name"
		/*this.getTargets=function(req){try{
			req = req||"id";
			var ret = [];
			if (exists(this.to)) {
				for (var i=0,target; (target=this.to.data[i]);i++) ret.push(target[req]);
			}
			return ret;
		}catch(e){log("WM.Post.getTargets: "+e);}};*/

		//ret must equal "id" or "message" or "name" or "count"
		this.getComments=function(req){try{
			var ret = [];
			if (exists(this.comments)) if (this.comments.count) {
				switch(req){
					case "message": for (var i=0,comment; (comment=this.comments.data[i]);i++) ret.push(comment[req]); break;
					case "id":case "name": for (var i=0,comment; (comment=this.comments.data[i]);i++) ret.push(comment.from[req]); break;
					case "count": return this.comments.count; break;
				}
			}
			return ret;
		}catch(e){log("WM.Post.getComments: "+e);}};

		//ret must equal "id" or "name" or "count"
		this.getLikes=function(req){try{
			req = req||"id";
			var ret = [];
			if (exists(this.likes)) if (this.likes.count) {
				switch(req){
					case "id":case "name": for (var i=0,like; (like=this.likes.data[i]); i++) ret.push(like[req]); break;
					case "count": return this.likes.count; break;
				}
			}
			return ret;
		}catch(e){log("WM.Post.getLikes: "+e);}};

		this.moveToTop = function(){try{
			if (this.node||null) this.node.parentNode.insertBefore(this.node,this.node.parentNode.childNodes[0]);
		}catch(e){log("WM.Post.moveToTop: "+e);}};

		this.moveToBottom = function(){try{
			if (this.node||null) this.node.parentNode.appendChild(this.node);
		}catch(e){log("WM.Post.moveToBottom: "+e);}};

		this.setPriority = function(value){try{
			this.priority=value;
			remove(this.node);
			this.draw();
		}catch(e){log("WM.Post.setPriority: "+e);}};		
		
		this.reID = function(params){try{
			params=params||{};
						
			//reidentify
			var oldW=this.which;
			if (this.identify({reid:true})) {
				WM.rulesManager.doEvent("onIdentify",this);
			}
			
			//sort me into proper location
			WM.sortPosts();

			//redraw||reorder
			if (!this.isGhost) {
				this.draw(true,true);
			}
		}catch(e){log("WM.Post.reID: "+e);}};

		//return the next visible sibling post
		//now checks for group and visibility
		this.nextSibling = function(){try{
			//determine if there is an app filter
			var filter=(WM.quickOpts.filterApp||"All");
			
			//determine display grouping
			var groupBy=WM.quickOpts.groupBy;
			var group=(groupBy)?WM.newGroup({by:this[groupBy]}):null;
			
			//get visible posts
			var visiblePosts=(filter=="All")?WM.posts:matchByParam(WM.posts,"appID",filter);
			if (groupBy) visiblePosts=matchByParam(visiblePosts,groupBy,this[groupBy]);
			
			//search for the current post
			var found=false, sibling=null;
			for (var p in visiblePosts) {
				if (found && visiblePosts[p].node) {
					if ((!groupBy && visiblePosts[p].node.parentNode==WM.console.feedNode) 
					|| (groupBy && visiblePosts[p].node.parentNode==group)){
						sibling=visiblePosts[p]; 
						break
					}
				} else if (visiblePosts[p]==this) found=true;
			}

			//return what is found
			return sibling;
			//warning: returns null if this is the last visible post
		}catch(e){log("WM.Post.nextSibling: "+e);}};

		//return the previous visible sibling post
		//now checks for group and visibility
		this.previousSibling = function(){try{
			//determine if there is an app filter
			var filter=(WM.quickOpts.filterApp||"All");
			
			//determine display grouping
			var groupBy=WM.quickOpts.groupBy;
			var group=(groupBy)?WM.newGroup({by:this[groupBy]}):null;

			//get visible posts
			var visiblePosts=(filter=="All")?WM.posts:matchByParam(WM.posts,"appID",filter);
			if (groupBy) visiblePosts=matchByParam(visiblePosts,groupBy,this[groupBy]);
			
			//search for the current post
			var sibling=null;
			for (var p in visiblePosts) {
				if (visiblePosts[p]==this) break;
				else if (visiblePosts[p].node) {
					if ((!groupBy && visiblePosts[p].node.parentNode==WM.console.feedNode)
					|| (groupBy && visiblePosts.node.parentNode==group)){
						sibling=visiblePosts[p];
					}
				}
			}
			
			//return what is found
			return sibling;
			//warning: returns null if this is the first visible post
		}catch(e){log("WM.Post.previousSibling: "+e);}};
		
		//a little cleanup
		params = null;
	}catch(e){log("WM.Post.init: "+e);}};

	
	
//***************************************************************************************************************************************
//***** Main Program
//***************************************************************************************************************************************

	
	//*****short text versions for WM.config menu options*****

	var checkBox=function(l,d,c,n){return ({type:"checkbox",label:l,"default":d||false,kids:c,newitem:n});}
	var hidden=function(l,d,c){return ({type:"hidden",label:l,"default":d,kids:c});}
	var optionBlock=function(l,c,hideSelectAll,n){hideSelectAll=hideSelectAll||false;return ({type:"optionblock",label:l,kids:c,hideSelectAll:hideSelectAll,newitem:n});}
	var separator=function(l,s,c,hideSelectAll){hideSelectAll=hideSelectAll||false; return ({type:"separator",label:l,section:s,kids:c}); }
	var section=function(l,c){return ({type:"section",label:l,kids:c});}
	var tabSection=function(l,c){return ({type:"tab",label:l,kids:c});}
	var inputBox=function(l,d,n){return ({type:"float",label:l,"default":(d||0),newitem:n});}
	var textArea=function(l,d,n){return ({type:"textarea",label:l,"default":(d||0),newitem:n});}
	var colorBox=function(l,d,n){return ({type:"colorbox",label:l,"default":(d||"black"),newitem:n});}
	var button=function(l,s){return ({type:"button",label:l,script:s});}
	var anchor=function(l,u,t){return ({type:"link",label:l,href:u,title:(t||'')});}


//***************************************************************************************************************************************
//***** Immediate
//***************************************************************************************************************************************

	log("Script: WM initialized",{level:0});

	// section for reclaiming memory and stopping memory leaks
	var newIntv=null; //refresh interval
	var oldIntv=null; //refresh interval
	var procIntv=null; //process interval
	var cleanIntv=null; //post removal interval
	var hbIntv=null; //global heartbeat interval

	var olderLimit=day; //default 1 day

	var cleanup=function() {try{
		//destroy intervals
		if (newIntv) window.clearInterval(newIntv);
		if (oldIntv) window.clearInterval(oldIntv);
		if (procIntv) window.clearInterval(procIntv);
		if (cleanIntv) window.clearInterval(cleanIntv);
		if (hbIntv) window.clearInterval(hbIntv);
		oldIntv = newIntv = procIntv = cleanIntv = hbIntv = null;

		//close the sidekick tabs
		WM.collector.closeAll();

		//remove this event listener
		window.removeEventListener("beforeunload", cleanup, false);
		window.removeEventListener("message", WM.receiveSidekickMessage, false);
		window.removeEventListener("resize", WM.onWindowResize, false);

		//clean up memory
		WallManager=null;
		Graph=null;
		jsForms=null;
		olderLimit=null;
		opts=null; quickOpts=null;
		
	}catch(e){log("cleanup: "+e);}}
	window.addEventListener("beforeunload", cleanup, false);
	window.addEventListener("resize", WM.onWindowResize, false);
	
	//start it up
	WM.run();
	
})(); // anonymous function wrapper end

/* recent changes
	3.1.1
	*fixed the update script button to point to the standard branch
	*posts are once again able to fetch source user names with the post
	*reinstated post.showOriginalData so developers can see the return data from FQL and how it differs from GraphAPI returns
	
	3.1.2
	*fixed the button on feed manager where you can fetch for a specific friend feed manually
	*added option to fetch all apps for a specific feed in a single request, default is to fetch for each app with a separate request
	*fixed drawing order bug caused by graph update
	*temporarily removed checking for feed already having reached older limit, feed will now draw until facebook has no posts to show if you tell it to 
	**hide stale posts will still make it so you can't see those posts if you have it enabled
	*fixed friend tracker last known post date
	
	3.1.3
	*when action_links is null from facebook, WM now uses attachment.href for the link, which should match, but is not a guarantee.
	*when action_links is null from facebook, WM now uses "" as the link text. Neither attachment or app_data appears to have a duplicate of the link text.
	*added error checking for if the return data for a post cannot be transformed into a useful post object. This could happen if some of the data WM requires to function is not available, or is mangled for some reason.
	*added option to have WM filter posts by app instead of asking FB for posts by app. This will hopefully remove a lot of that empty data set issue, but you will occasionally get return data without any useful posts in it.
	
	3.1.4
	*reinstated olderLimitReached and any function or rules manager event having to do with that
	*removed some console.log debuggery
	*fixed issue with disabled feeds still being processed when fetching multiple apps at once (with those new options)
	
	3.1.4.1
	*fixed alternative spotting of link url and link text associated with app posts (when action_links data is null)
*/