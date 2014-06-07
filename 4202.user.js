// Flickr Style Contacts
// v0.5
// 2006-06-06
// Copyright (c) 2006, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//Note:
// 1- you have to set your user name at the begining of the code
// 2- if you added a contact and the next time you load a page he/she is not
// shown, then you should go into Tools/User Scripts Commands/Reset Contact List
// and then reload the page.
// 3- you can personalise the style as you which with css rules.
//
//
//
// ==UserScript==
// @name	Flickr Style Contacts
// @namespace	http://6v8.gamboni.org/
// @description	Style comments and photos on flickr
// @version        0.5
// @date           2006-06-06
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/groups/*/pool*
// @include http://*flickr.com/photos/friends*
// @include http://*flickr.com/photos/*/*
// @include http://*flickr.com/relationship.gne*
// @include http://*flickr.com/recent_activity.gne*
// @include http://*flickr.com/photos_comments.gne*
// @include http://*flickr.com/people/*
// @include http://*flickr.com/photos/*/sets/*/comments/
// ==/UserScript==

(function () {

	//======================================================================
	// Set your username here if you want your things to be styled
	var YOUR_NAME = 'mortimer?';

	//======================================================================
	// Set here the css style for each one
	// You can combine styles, e.g. .Family.Friend will be the style for photos/comments from your friend AND family
	//======================================================================
	function addStyle() {
		
		//style for contacts comments
		GM_addStyle("tr.Contact > td.Said, div.testi.Contact {border-right: 2px solid #FFFD00;}");
		//style for contacts icons
		GM_addStyle("p.Contact img, tr.Contact img, td.Icon.Contact img {border: 2px solid black;padding:1px;}");
		
		//style for friends comments
		GM_addStyle("tr.Friend > td.Said, div.testi.Friend {border-style: dashed;}");
		//style for friends icons
		GM_addStyle("p.Friend img, tr.Friend img, td.Icon.Friend img {border-style: dashed;}");
		
		//style for family comments
		GM_addStyle("tr.Family > td.Said, div.testi.Family {border-right: 2px solid #630000;}");
		//style for family icons
		GM_addStyle("p.Family img, tr.Family img, td.Icon.Family img {border: 2px solid #630000;padding: 1px;}");

		//style for friends comments
		GM_addStyle("tr.Family.Friend > td.Said, div.testi.Family.Friend {border-style:dashed;}");
		//style for friends icons
		GM_addStyle("p.Family.Friend img, tr.Family.Friend img, td.Icon.Family.Friend img  {border-style:dashed}");
		
		//GM_addStyle("tr.User > td.Said {border-left:2px solid #FFAA80; padding-left: 1em;}");
		GM_addStyle("tr.User > td {font-weight: bold;}");

		//style for your comments
		GM_addStyle(".YouSaid {font-style: italic;color: rgb(136, 136, 136);}");
		//style for your icon
		GM_addStyle("p.YouSaid img, td.Icon.YouSaid img {border: 2px solid grey;padding:1px;}");

	}
	//======================================================================
	
	
	//======================================================================

	//update information
	var SCRIPT = {
		name: "Flickr Style Contacts",
		namespace: "http://6v8.gamboni.org/",
		description: "Style comments and photos on flickr",
		source: "http://6v8.gamboni.org/Flickr-style-your-contacts.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flickrstylecontacts.user.js",
		version: "0.5",								// version
		date: (new Date(2006, 6, 6))		// update date
		.valueOf()
	};

	//======================================================================
	//to do the closure and get the right this.
	//adapted from http://persistent.info/greasemonkey/gmail.user.js

	function getObjectMethodClosure0(object, method, arg) {
		return function() {
			return object[method](arg); 
		}
	}

	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
	}

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


	function getObjectMethodClosure2(object, method) {
		return function(arg,arg2) {
			return object[method](arg,arg2); 
		}
	}

	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	var FlickrStyleContacts = function() {this.init();}

	FlickrStyleContacts.prototype = {
		contacts: GM_getValue('contacts'),
		family: GM_getValue('family'),
		friends: GM_getValue('friends'),

		init: function() {

			if(document.location.pathname == '/relationship.gne') {
				GM_setValue('contacts','');
				GM_setValue('family','');
				GM_setValue('friends','');
			} else {			
				addStyle();
				
				if(!this.contacts) {
					this.getContacts();
					this.postpone();
				} else {
					this.stylePool();
				}
			}
		},

		postpone: function() {
			if(!this.contacts) setTimeout(getObjectMethodClosure(this,'postpone'),2000);
			else this.stylePool();			
		},

		stylePool: function() {
			var matches;
			if(matches = /photos\/([^\/]+)\/[0-9]+\/favorites\/?/.exec(document.location.pathname)) {
				var author;
				if(matches) author = matches[1];
				var whos = document.evaluate(
											 "/html/body/div[@id='Main']/table/tbody/tr/td[@id='GoodStuff']/table[@id='InBox']/tbody/tr/td[2]/p[1]/b[1]/a",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < whos.snapshotLength; i++) {  // For each group...
					var a = whos.snapshotItem(i);
					var parentTR = a.parentNode.parentNode.parentNode.parentNode;
					if(a.innerHTML == YOUR_NAME) {
						parentTR.className += ' YouSaid';
					} else if(a.href.indexOf(author) >= 0) {
						parentTR.className += ' User';
					} else  {
						if(this.family.indexOf(a.innerHTML) >= 0) parentTR.className += ' Family';
						if(this.friends.indexOf(a.innerHTML) >= 0) parentTR.className += ' Friend';
						if(this.contacts.indexOf(a.innerHTML) >= 0) parentTR.className += ' Contact';
					}
				}
			} else if(matches = /photos\/([^\/]+)\/[0-9]+\/?/.exec(document.location.pathname) || document.location.pathname.indexOf('/discuss/') > 0) {
				var author;
				if(matches) author = matches[1];
				var whos = document.evaluate(
										  "//td[@class='Said']/h4/a",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < whos.snapshotLength; i++) {  // For each group...
					var a = whos.snapshotItem(i);
					if(!author) author = a.href;
					var parentTR = a.parentNode.parentNode.parentNode;
					if(a.innerHTML == YOUR_NAME) {
						parentTR.className += ' YouSaid';
					} else if(a.href.indexOf(author) >= 0) {
						parentTR.className += ' User';
					} else  {
						if(this.family.indexOf(a.innerHTML) >= 0) parentTR.className += ' Family';
						if(this.friends.indexOf(a.innerHTML) >= 0) parentTR.className += ' Friend';
						if(this.contacts.indexOf(a.innerHTML) >= 0) parentTR.className += ' Contact';
					}
				}
			} else if(document.location.pathname == '/recent_activity.gne'){
				var shots = document.evaluate(
										  "/html/body/div[@id='Main']/table/tbody/tr/td/table/tbody/tr/td/b/a|/html/body/div[@id='Main']/table/tbody/tr/td/table/tbody/tr/td/a/b",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < shots.snapshotLength; i++) {  // For each group...
					var a = shots.snapshotItem(i);
					var shotP = a.parentNode.parentNode.parentNode;
					if(this.family.indexOf(a.innerHTML) >= 0) shotP.className += ' Family';
					if(this.friends.indexOf(a.innerHTML) >= 0) shotP.className += ' Friend';
					if(this.contacts.indexOf(a.innerHTML) >= 0) shotP.className += ' Contact';
				}
			} else if(document.location.pathname == '/photos_comments.gne'){
				var shots = document.evaluate(
										  "/html/body/div[@id='Main']/table/tbody/tr/td[2]/table[2]/tbody/tr/td[3]/b/a",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < shots.snapshotLength; i++) {  // For each group...
					var a = shots.snapshotItem(i);
					var shotP = a.parentNode.parentNode.parentNode;
					var authorContainer = document.evaluate("table[1]/tbody/tr/td[@class='Who']/a[2]/b",
								 shotP.parentNode.parentNode.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
					if(authorContainer.innerHTML == a.innerHTML) {
						shotP.className += ' User';
					}
					if(this.family.indexOf(a.innerHTML) >= 0) shotP.className += ' Family';
					if(this.friends.indexOf(a.innerHTML) >= 0) shotP.className += ' Friend';
					if(this.contacts.indexOf(a.innerHTML) >= 0) shotP.className += ' Contact';
				}
			} else  if(document.location.pathname.indexOf('/people') >= 0 && document.location.pathname.indexOf('/contacts') < 0){
				//testimonials
				var shots = document.evaluate(
											  "/html/body/div[@id='Main']/div[3]/table[@id='ProfileInfo']/tbody/tr/td[@id='Right']/div/strong/a",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < shots.snapshotLength; i++) {  // For each group...
					var a = shots.snapshotItem(i);
					var shotP = a.parentNode.parentNode;
					if(a.innerHTML == YOUR_NAME) {
						shotP.className += ' YouSaid';
					} else {
						if(this.family.indexOf(a.innerHTML) >= 0) shotP.className += ' Family';
						if(this.friends.indexOf(a.innerHTML) >= 0) shotP.className += ' Friend';
						if(this.contacts.indexOf(a.innerHTML) >= 0) shotP.className += ' Contact';
					}
				}
				//contact icons
				var shots = document.evaluate(
											  "/html/body/div[@id='Main']/div[3]/table[@id='ProfileInfo']/tbody/tr/td[@id='Left']/div[2]/p/a",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < shots.snapshotLength; i++) {  // For each group...
					var a = shots.snapshotItem(i);
					var shotP = a.parentNode;
					if(a.innerHTML.indexOf(YOUR_NAME) >= 0) {
						shotP.className += ' YouSaid';
					} else {
						var name = a.href.replace(/http:\/\/(www.)?flickr.com\/photos\/(.*)\//,'$2');
						if(this.family.indexOf(name) >= 0) shotP.className += ' Family';
						if(this.friends.indexOf(name) >= 0) shotP.className += ' Friend';
						if(this.contacts.indexOf(name) >= 0) shotP.className += ' Contact';
					}
				}
				
			} else  if(document.location.pathname.indexOf('/people') >= 0){
				
				var shots = document.evaluate(
											  "/html/body/div[@id='Main']/table[2]/tbody/tr/td/h2",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < shots.snapshotLength; i++) {  // For each group...
					var a = shots.snapshotItem(i);
					var shotP = a.parentNode;
					var shotP2 = shotP.parentNode.cells[shotP.cellIndex-1];
					if(a.innerHTML == YOUR_NAME) {
						shotP.className += ' YouSaid';
						if(shotP2) shotP2.className += ' YouSaid';
					} else {
						if(this.family.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' Family';
							if(shotP2) shotP2.className += ' Family';
						}
						if(this.friends.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' Friend';
							if(shotP2) shotP2.className += ' Friend';
						}
						if(this.contacts.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' Contact';
							if(shotP2) shotP2.className += ' Contact';
						}
					}
				}				
			} else if(document.location.pathname.indexOf('/sets') >= 0){
				
				var shots = document.evaluate(
											  "/html/body/div[@id='Main']/div[3]/table[@id='ViewSet']/tbody/tr/td[@id='Contents']/table/tbody/tr/td[2]/h4/a[1]",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				var authorContainer = document.evaluate("/html/body/div[@id='Main']/table[@id='SubNav']/tbody/tr/td[1]/p/a/b",
														document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				for(var i = 0; i < shots.snapshotLength; i++) {  
					var a = shots.snapshotItem(i);
					var shotP = a.parentNode.parentNode.parentNode;
					if(a.innerHTML == YOUR_NAME) {
						shotP.className += ' YouSaid';
					} else {
						if(this.family.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' Family';
						}
						if(this.friends.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' Friend';
						}
						if(this.contacts.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' Contact';
						}
						if(authorContainer.innerHTML.indexOf(a.innerHTML) >= 0) {
							shotP.className += ' User';
						}
					}
				}				
			} else {
				var shots = document.evaluate(
										  "//p[@class='PoolList']|//p[@class='RecentPhotos']",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < shots.snapshotLength; i++) {  // For each group...
					var shotP = shots.snapshotItem(i);
					var a = shotP.getElementsByTagName('a')[1];
					if(a.innerHTML == YOUR_NAME) {
						shotP.className += ' YouSaid';
					} else {
						if(this.family.indexOf(a.innerHTML) >= 0) shotP.className += ' Family';
						if(this.friends.indexOf(a.innerHTML) >= 0) shotP.className += ' Friend';
						if(document.location.pathname.indexOf('/photos/friends') < 0 && this.contacts.indexOf(a.innerHTML) > 0) shotP.className += ' Contact';
					}
				}
			}
		},
		getUserID: function() {			
			return unsafeWindow.global_nsid;
		},

		getContacts: function() {
			if(!this.contact) {
				//Trick to do it using the flickr API with authentication already embeded in the page.
				var self = this;
				var listener = {
					flickr_contacts_getList_onLoad: function(success, responseXML, responseText, params){
						self.process_contactsID(responseText);
					}
				};
				
				unsafeWindow.F.API.callMethod('flickr.contacts.getList', {}, listener);

			} 
		},

		process_contactsID: function(req) {
			//			M8_log(req);
			var rsp = req.replace(/<\?xml.*\?>/,'');
			rsp = new XML(rsp);

			if (rsp == null) {
				this.error( "Could not understand Flickr's response.", 0, req);
			} else {			
				var stat = rsp.@stat;
				if (stat == null) {
					this.error( "Could not find status of Flickr request", 0, req);
				} else if (stat != 'ok') {
					if (stat == 'fail') {
						var err_node = rsp.err[0];
						var code = err_node.@code;
						var err_msg = err_node.@msg;
						this.error( err_msg, code, req);
					} else {
						this.error("Unknown error status: '" + stat + "'", 0, req)
					}
				} else {
					var cont = new Array();
					var fam = new Array();
					var fri = new Array();
					for each(contact in rsp..contact) {
						cont.push(contact.@realname);
						cont.push(contact.@username);
						if(contact.@family == '1') {
							fam.push(contact.@realname);
							fam.push(contact.@username);
						}
						if(contact.@friend == '1') {
							fri.push(contact.@realname);
							fri.push(contact.@username);
						}
					}
					this.contacts = cont.join('#@#');
					this.family = fam.join('#@#');
					this.friends = fri.join('#@#');
					GM_setValue('contacts',this.contacts);
					GM_setValue('family',this.family);
					GM_setValue('friends',this.friends);
				}
			}
		},
		error: function(msg,code, req) {
			M8_log(msg);
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
									
									var flickrgp = new FlickrStyleContacts();
		}, false);
	} catch (ex) {}
	//a menu item to clear the saved tags.
	GM_registerMenuCommand( "FlickrStyleContact: Reset Contact List", function() {GM_setValue('contacts','');} );

})();
