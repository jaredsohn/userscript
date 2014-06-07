// Flickr Group Comments
// v0.8
// 2006-05-26
// Copyright (c) 2006, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Flickr Group Comments
// @namespace	http://6v8.gamboni.org/Flickr-view-group-comments.html
// @description	Display the recent comments in your groups directly in the recent change page
// @source         http://6v8.gamboni.org/Flickr-view-group-comments.html
// @identifier     http://6v8.gamboni.org/IMG/js/flickrgroupcomments.user.js
// @version        0.8
// @date           2006-05-26
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/recent.gne*
// ==/UserScript==

//======================================================================
// Configuration

//number of minutes before the next automatic reload.
//if set to false or 0, then there will never be automatic reloads
var AUTO_RELOAD = 10;

//======================================================================

(function () {

	var win = (unsafeWindow || window.wrappedJSObject || window);

	//update information
	var SCRIPT = {
		name: "Flickr Group Comments",
		namespace: "http://6v8.gamboni.org/Flickr-view-group-comments.html",
		description: "Display the recent comments in your groups directly in the recent change page",
		source: "http://6v8.gamboni.org/Flickr-view-group-comments.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flickrgroupcomments.user.js",
		version: "0.8",								// version
		date: (new Date(2006, 5, 26))		// update date
		.valueOf()
	};

	//======================================================================
	//to do the closure and get the right this.
	//adapted from http://persistent.info/greasemonkey/gmail.user.js

	function getObjectMethodClosure11(object, method,args3) {
		return function(arg) {
			return object[method](arg,args3); 
		}
	}

	function getObjectMethodClosure12(object, method,args3,arg4) {
		return function(arg) {
			return object[method](arg,args3,arg4); 
		}
	}


	//======================================================================
	
	// constants
	// http status constants
	var OK = 200;
	
	// xmlhttprequest readystate
	var COMPLETE = 4;
	
	var DEBUG = false;
		
	win.FlickrGroupComments = function() {;}

	win.FlickrGroupComments.prototype = {
		//1
		init: function() {
			GM_addStyle(".EachGroup ul li.read {color: #AAAAAA; list-style-type: circle; font-size: 80%;}\
 .EachGroup ul li.read a {color: #99ccff;} ");
			var commentsLinks = document.evaluate("/html/body/div[@id='Main']/table[2]/tbody/tr/td[@id='Changes']/table/tbody/tr/td[2]/ul",										  
												 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  // Get all group
			
			for(var i = 0; i < commentsLinks.snapshotLength; i++) {  // For each group...
				var al = commentsLinks.snapshotItem(i);

				this.prepareUL(al);
			}

			if(AUTO_RELOAD > 0) {
				var change = document.evaluate("//td[@id='Changes']/table[1]",
								 document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
				if(change) {
					setTimeout(function() { document.location.reload(); } , AUTO_RELOAD*60*1000);					
					var reload = document.createElement('p');
					reload.innerHTML = "Next automatic reload in: "+AUTO_RELOAD+" min";
					reload.setAttribute("style","background-image: url(../images/dotted.gif); background-repeat: repeat-x; background-position: left top;padding-top:10px;");
					change.parentNode.insertBefore(reload,change.nextSibling);
					var cnt = 0;
					var timeout = function() { 
						var next = AUTO_RELOAD-(cnt++);
						reload.innerHTML = "Next automatic reload in: "+
							next+
							' min'; 
						setTimeout(timeout, 60*1000);
					};
					setTimeout(timeout, 250);
				}
			}				
		},

		//2
		prepareUL: function(element) {
			var read = GM_getValue('flickrgroupcomments.read');
			
			element.parentNode.parentNode.addEventListener('click',
														   getObjectMethodClosure11(this,"markAllAsRead",element),
														   true);
			
			news = element.getElementsByTagName("li");
			for(var i=0;i<news.length;i++) {
				var li = news[i];
				var as = li.getElementsByTagName('A');
				if(as.length>0 && !/More\.\.\./.test(as[0].innerHTML)) {
					var num = -1;
					var re = new RegExp('<'+as[0].href+',([0-9]+)>');
					var matches;
					if(as.length > 1) {
						matches = /\(([0-9]+) repl(ies|y)\)/.exec(li.innerHTML);
						if(matches) {
							num = parseInt(matches[1])+1;
						} 
					}
					if(read && (matches = re.exec(read))) {
						var show = true;
						// if we have already marked this one as read, but the
						// stored number is different, then it's like if we did not read it.
						// (see comment below)
						if(num >= 0 && num != matches[1]) show = false; 
						if(show) {
							li.className = 'read';
						}
					}
						
					
					var showA = li.appendChild(document.createElement('A'));
					showA.innerHTML = "&nbsp;Show...";
					showA.title="Display the message(s).";
					showA.setAttribute("style","font-size:85%;color:grey;text-decoration: underline;");
					li.fgcShowA = showA;
					showA.addEventListener('click', 
										   getObjectMethodClosure12(this,"getGroupId",li,element),
										   true);
					
					li.addEventListener('click',
										getObjectMethodClosure11(this,"markAsRead",li),
										true);
				}
			}
		},

		//3
		markAllAsRead: function(event, ul) {	
			if(event.target == ul || event.target.tagName == 'TD'|| event.target.tagName == 'H2') {	
				var news = ul.getElementsByTagName("li");
				for(var i=0;i<news.length;i++) {
					this.markAsRead(null,news[i]);
				}
			}
		},
			
		//3
		markAsRead: function(event,li) {
			if(event) {
				if(event.target == li.fgcShowA) return;
			}
			var as = li.getElementsByTagName('A');
			if(as.length>0 && !/More\.\.\./.test(as[0].innerHTML)) {
				li.className = 'read';
				var num = 1;
				if(as.length > 1) {
					var matches = /\(([0-9]+) repl(ies|y)\)/.exec(li.innerHTML);
					if(matches) {
						num = parseInt(matches[1])+1;
					} 
				}				
				var read = GM_getValue('flickrgroupcomments.read');
				if(read) read += '<'+as[0].href+','+num+'>';
				else read = '<'+as[0].href+','+num+'>';
				GM_setValue('flickrgroupcomments.read',read);
			}
		},
		
		//3
		getGroupId: function(event,li,element) {			
			var showA = li.fgcShowA;
			showA.style.display = 'none';

			var newDiv = li.fgceNewDiv;
			if(!newDiv) {
				newDiv = document.createElement("DIV");
				newDiv.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" style="vertical-align:middle;margin-right:4px;border:0px #ffffff" />';
				li.fgceNewDiv = newDiv;
			}				
				
			var closeA = li.fgcCloseA;
			if(!closeA) {
				closeA = li.appendChild(document.createElement('A'));
				closeA.addEventListener('click',function() {
											newDiv.style.display='none';
											showA.style.display='block';
											closeA.style.display='none';
											li.className = 'read';
										}, true);
				closeA.innerHTML = "&nbsp;Hide";	
				closeA.title="Hide the messages.";
				closeA.setAttribute("style","font-size:85%;color:grey;text-decoration: underline;");
			}
			li.appendChild(newDiv);
			
			if(!element.fgceGroupID) {
				matches = /(flickr.com)?\/groups\/(.+?)\//.exec(element.innerHTML);
				
				if(matches) {
					var groupName = matches[2];
					var details = {
						method    : "POST",
						onload    : getObjectMethodClosure12(this,"process_groupID",li,element),
						url       : "http://www.flickr.com/services/rest/?method=flickr.urls.lookupGroup&api_key=e8c3239ff04c102ce2d6ed885bf99005&url=" + encodeURIComponent("http://flickr.com/groups/"+groupName),
					};
					
					GM_xmlhttpRequest( details );
				}
			} else {
				this.groupIDReceived(element.fgceGroupID,li,element);
			}
		},

		//4
		process_groupID: function(req,li,element) {
			if(DEBUG) GM_log(req.responseText);
			var rsp = req.responseText.replace(/<\?xml.*\?>/,'');
			var rsp = new XML(rsp);
			
			if (rsp == null) {
				this.error( "Could not understand Flickr's response.", 0, req, li);
			} else {			
				var stat = rsp.@stat;
				if (stat == null) {
					this.error( "Could not find status of Flickr request", 0, req,li);
				} else if (stat != 'ok') {
					if (stat == 'fail') {
						var err_node = rsp.err[0];
						var code = err_node.@code;
						var err_msg = err_node.@msg;
						this.error( err_msg, code, req,li);
					} else {
						this.error("Unknown error status: '" + stat + "'", 0, req,li)
					}
				} else {
					element.fgceGroupID = rsp..@id[0];								
					this.groupIDReceived(element.fgceGroupID,li,element);
				}
			}
		},
		

		//5
		groupIDReceived: function(id,li,element) {
			if(!element.rssFeed) {
				var details = {
					method    : "GET",
					onload    : getObjectMethodClosure12(this,"getGroupFeed",li,element),
					url       : "http://flickr.com/groups_feed.gne?id="+id+"&format=rss_200",
				};
			
				GM_xmlhttpRequest( details );
			} else {
				this.getGroupFeed(null,li,element);
			}
		},

		//6
		getGroupFeed: function(req,li,element) {		
			if(DEBUG) GM_log(req.responseText);
			
			if(!element.rssFeed) {
				 var rsp = req.responseText.replace(/<\?xml.*\?>/,'');
				 rsp = new XML(rsp);
				 
				 if (rsp == null) {
					 this.error( "Could not parse rss.", 0, req,li);
					 return;
				 } else {			
					 element.rssFeed = rsp;
				 }
			}
			this.getLastMessage(li,element.rssFeed);
		},

		//7
		getLastMessage: function(threadLi,rss) {
			var links = threadLi.getElementsByTagName("a");
			var newDiv = threadLi.fgceNewDiv;
			newDiv.style.display = 'block';
			if(links.length > 0){
				var matches = /^([0-9]+) new replies$/.exec(links[0].innerHTML);
				var html = '';
				var href = '';
				if(matches) {
					var num = parseInt(matches[1]);
					href = links[1].href;
				} else if(links[0].innerHTML == "New reply") {
					num = 1;
					href = links[1].href;
				} else {
					var matches = /\(([0-9]+) repl(ies|y)\)/.exec(threadLi.innerHTML);
					if(matches) {
						num = parseInt(matches[1])+1;
					} else
						num = 1;
					href = links[0].href;
				} 
				//mark this one as read with X messages.
				//we need to keep track of the number for the case of the "New Topic ... (X replies)"
				//where the href is the same but does not always point to the same number of message
				var read = GM_getValue('flickrgroupcomments.read');
				if(read) read += '<'+links[0].href+','+num+'>';
				else read = '<'+links[0].href+','+num+'>';
				GM_setValue('flickrgroupcomments.read',read);
				newDiv.innerHTML = this.findMessages(rss,href,num);
			}
		},

		//8
		findMessages: function(rss,link,num) {
			var mess = '';
			var messArray = new Array();
			cnt = 1;
			//we have to introduce the www. as the rss links always contains it,
			// but you could have links in the web page without them.
			link = link.replace(/^http:\/\/(www.)?/,"http://www."); 
			for each(item in rss..item) {
				if(item.link.indexOf(link) == 0 && cnt <= num) {
					//mark all the one we see here are read too.
					var read = GM_getValue('flickrgroupcomments.read');
					if(read) read += '<'+item.link+',1>';
					else read = '<'+item.link+',1>';

					//TODO: here we could only push it if it has not been read yet.
					messArray.push(item.description);
					cnt++;
				} else if(cnt > num) {
					break;
				}
			}
			if(cnt==1) {
				mess="sorry, message not found";
			} else {
				mess = "<ul style=\"list-style-type:none;margin: 0; padding:0;\">";
				for(var i=messArray.length-1;i>=0;i--)
					mess += "<li style=\"border-bottom: 1px solid black;padding-left: 1em;\">"+messArray[i]+"</li>";
				mess += "</ul>";
			}
			return mess;
		},

		error: function(err_msg, code, req, li) {
			if(li.fgceNewDiv) li.fgceNewDiv.innerHTML = '<b style="color:red">'+err_msg+'</b>';
		}
	}
		
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
			try {
					
				// update automatically (http://userscripts.org/scripts/show/2296)
				win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
			} catch (ex) {} 
			
			var flickrgp = new win.FlickrGroupComments();
			flickrgp.init();	
		}, false);
	} catch (ex) {}

})();
