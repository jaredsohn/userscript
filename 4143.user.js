// Flickr More Search
// v0.9
// 2006-07-09
// Copyright (c) 2006, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Flickr More Search
// @namespace	http://6v8.gamboni.org/
// @description	Search all of your contacts for photos, and more...
// @version        0.9
// @date           2006-07-09
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com*
// @exclude http://*flickr.com/photo_sendto_group.gne*
// ==/UserScript==

(function () {

	var win = (unsafeWindow || window.wrappedJSObject || window);

	//======================================================================
	var CONTACTS = 1;
	var GROUPS = CONTACTS+1;
	var FAMILY = GROUPS+1;
	var FRIENDS = FAMILY+1;
	var OTHER = FRIENDS+1;

	var DETAILS = 1;
	var THUMBS = DETAILS+1;
	//======================================================================

	//update information
	var SCRIPT = {
		name: "Flickr More Search",
		namespace: "http://6v8.gamboni.org/",
		description: "Search for photos for all of your contacts, and more...",
		source: "http://6v8.gamboni.org/Flickr-more-search.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flickrmoresearch.user.js",
		version: "0.9",								// version
		date: (new Date(2006, 7, 9))		// update date
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


	//======================================================================
	
	// constants
	// http status constants
	var OK = 200;
	
	// xmlhttprequest readystate
	var COMPLETE = 4;
	
	var DEBUG = true;
		
	win.FlickrMoreSearch = function() {this.init();}

	win.FlickrMoreSearch.prototype = {
				
		contactList: null,
		familyList: null,
		friendsList: null,
		contactsXML: null,
		contactSearchResult: null,
		groupsXML: null,
		groupSearchResult: null,
		groupID: '',
		userID: '',
		inSearchPage: false,
		inGroupsPage: false,
		inAdvancedPage : false,

		init: function() {
			this.inSearchPage = (/^\/search\/?$/.test(document.location.pathname));
			this.inGroupsPage = (/^\/search\/groups\/?$/.test(document.location.pathname));
			this.userID = this.getUserID();

			if((this.inSearchPage || this.inGroupsPage) &&
			   GM_getValue('alwaysthumb') &&
			   document.location.search &&
			   (document.location.search.indexOf("z=t") < 0) &&
			   (document.location.search.indexOf("tempdetails=t") < 0)) {
				document.location = document.location+'&z=t';
				return;
			}
			if(this.inSearchPage) {
				//				if(matches = /[?&]q2=([^&]+)/.exec(document.location.search)) document.getElementById('standard_q').value = matches[1];
				if(document.getElementById('standard_q').value) this.insertFeeds(OTHER);
				
				var searchw = document.getElementById('searchw');
				searchw.options[1].value = this.userID;

				document.getElementById("mtext").disabled = false;
				document.getElementById("mtags").disabled = false;

				searchw.addEventListener('change',getObjectMethodClosure(this,"selectchanged"),false);
				searchw.addEventListener('keyup',getObjectMethodClosure(this,"selectchanged"),false);
				searchw.addEventListener('keydown',getObjectMethodClosure(this,"selectchanged"),false);
				
				this.initContactSearch();
				//				this.initGroupSearch();
			} 
			this.initAdvancedSearch();
			this.initDefaultThumb();
		},

		initAdvancedSearch: function() {
			this.inAdvancedPage = (/^\/search\/advanced\/?$/.test(document.location.pathname));
			if(this.inAdvancedPage) {
				document.forms[1].addEventListener('submit',getObjectMethodClosure(this,'processAdvancedFields'),true);
				document.forms[1].action ='http://www.flickr.com/search/';
				document.forms[1].method = 'get';
				var trafter = document.evaluate("/html/body/div[@id='Main']/form/table/tbody/tr[4]",
												 document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
												 ).singleNodeValue;	
				var newtr = trafter.parentNode.insertBefore(document.createElement('tr'),trafter);
				newtr.innerHTML = '<td class="Tip">\
			<h4>Search in</h4>\
			<small><i><b>Tip:</b> Use this option to look for photos in one of your contacts\' stream</i></small>\
		</td>\
		<td colspan="3">\
<img id="searchscopebuddyicon" src="http://www.flickr.com/images/buddyicon.jpg?" width="24" height="24" alt=" Buddy Icon" align="absmiddle" style="display: none;" />\
				<select name="w" id="searchw" class="Fixed">\
					<option value="all" selected>Everyone\'s Photos</option>\
					<option value="'+this.userID+'">Your Photos</option>\
					<option value="load" id="searchwloading">Choose from your Contacts...</option>\
				</select>\
		</td>';
				//add the listeners...
				var searchw = document.getElementById('searchw');

				searchw.addEventListener('change',getObjectMethodClosure(this,"selectchanged"),false);
				searchw.addEventListener('keyup',getObjectMethodClosure(this,"selectchanged"),false);
				searchw.addEventListener('keydown',getObjectMethodClosure(this,"selectchanged"),false);

				var separator = trafter.parentNode.insertBefore(document.createElement('tr'),trafter);
				separator.innerHTML = '<td colspan="4" valign="bottom"><p class="Separate">&nbsp;</p></td>';			
			}
		},

		processAdvancedFields: function() {
			//Process the date.
			//earch/?q=cern+-test&l=cc&d=taken-20050525-20060502
			var mode = document.evaluate("/html/body/div[@id='Main']/form/table/tbody/tr//select[@name='date_mode']",
											document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
											).singleNodeValue.value;
			var afterdate = document.evaluate("/html/body/div[@id='Main']/form/table/tbody/tr//input[@name='date_lo']",
											document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
											).singleNodeValue.value;	
			var beforedate = document.evaluate("/html/body/div[@id='Main']/form/table/tbody/tr//input[@name='date_hi']",
											document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
											).singleNodeValue.value;
			if(afterdate) {
				afterdate = afterdate.split('/');
				var m_lo = ((afterdate[0] < 10)?'0':'')+afterdate[0];
				var d_lo = ((afterdate[1] < 10)?'0':'')+afterdate[1];
				afterdate = afterdate[2]+m_lo+d_lo;
			}
			if(beforedate) {
				beforedate = beforedate.split('/');
				var m_hi = ((beforedate[0] < 10)?'0':'')+beforedate[0];
				var d_hi = ((beforedate[1] < 10)?'0':'')+beforedate[1];
				beforedate = beforedate[2]+m_hi+d_hi;
			}

			if(beforedate || afterdate) {
				var datehidden = document.createElement('input');
				datehidden.type = 'hidden';
				datehidden.value = mode+'-'+afterdate+'-'+beforedate;
				datehidden.name = 'd';
				document.forms[1].appendChild(datehidden);
			}

			//Process the licence
			var cc = document.getElementById('ccsearch').checked;
			var comm = document.getElementById('cccommercial').checked;
			var deriv = document.getElementById('ccderivs').checked;
			var l = '';
			if(cc) {
				if(comm) l = 'comm';
				if(deriv) l += 'deriv';
				if(!l) l = 'cc';
				var lhidden = document.createElement('input');
				lhidden.type = 'hidden';
				lhidden.value = l;
				lhidden.name = 'l';				
				document.forms[1].appendChild(lhidden);
			}
		},

		initDefaultThumb: function() {
			
			var alwaysthumb = GM_getValue('alwaysthumb');
			
			if(alwaysthumb) {
				var searchbox = document.createElement("input");
				searchbox.id = "hidalwaysthumb";
				searchbox.type = 'hidden';
				searchbox.name= 'z';
				searchbox.value = 't';
				document.getElementById('headersearchform').appendChild(searchbox);
				
				if(this.inSearchPage || this.inGroupsPage) {
					var input = document.createElement("input");
					input.id = "hidalwaysthumb";
					input.type = 'hidden';
					input.name= 'z';
					input.value = 't';
					document.forms[1].appendChild(input);
					var pages = document.evaluate("//div[@class='Paginator']/a",										  
												  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					
					for(var i = 0; i < pages.snapshotLength; i++) {  
						var al = pages.snapshotItem(i);
						al.href += "&z=t";
					}

					unsafeWindow.GoQ = function GoQ(elm){
						var url = elm.href;
						var q = document.getElementById('standard_q');
						if (q.value.length){
							url += '?q='+q.value+'&z=t';
						}
						elm.href = url;
						return true;
					}
				}
			}
			
			if(this.inSearchPage || (this.inGroupsPage && (document.location.search.indexOf('m=pool') >= 0))) {
				var d_switch = document.evaluate("/html/body/div[@id='Main']//div[@class='Switch']",                              
												 document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
												 ).singleNodeValue;	
				if(d_switch) {
					d_switch.firstChild.href += "&tempdetails=t";
					this.createAlwaysCheck(d_switch);
				}
			}
		},

		initContactSearch: function() {
			var before = document.getElementById("searchwloading");
			var select = before.parentNode.insertBefore(document.createElement('option'),before);
			select.innerHTML = "All your contacts";
			select.value = 'allcontacts';
			var select = before.parentNode.insertBefore(document.createElement('option'),before);
			select.innerHTML = "Your family";
			select.value = 'allfamily';
			var select = before.parentNode.insertBefore(document.createElement('option'),before);
			select.innerHTML = "Your friends";
			select.value = 'allfriends';
		},

		initGroupSearch: function() {
			var before = document.getElementById("searchwloading");
			var select = before.parentNode.insertBefore(document.createElement('option'),before);
			select.innerHTML = 'Choose from your Groups...';
			select.id = "searchgrouploading";

			var matches;
			if(matches = /w=group_([^&]+)/.exec(document.location.search)) {
				this.groupID = matches[1].replace(/%40/,'@');
				this.getGroups();
				select.selected = true;
				this.selectRightGroup(this.groupID);
				this.searchsubmitGroups();
			}
		},

		getUserID: function() {			
			/*			var scp = document.getElementsByTagName("script")[0].innerHTML;
			var matches = /global_nsid = '(.*?)'/m.exec(scp);
			if(matches)
			return matches[1];*/
			return unsafeWindow.global_nsid;
		},

		selectchanged: function(event) {
			var searchw = event.target;
			var url = false;
			var matches = null;

			var mtext = document.getElementById("mtext");
			var mtags = document.getElementById("mtags");


			if(searchw.value=="allcontacts") {
				this.getContacts();
				searchw.form.onsubmit = getObjectMethodClosure(this,"searchsubmitContacts");
				if(mtext) mtext.disabled = true;
				if(mtags) {
					mtags.disabled = true;
					mtags.checked = true;
				}
				url = 'http://www.flickr.com/images/buddyicon.jpg';
			} else if(searchw.value=="allfriends") {
				this.getContacts();
				searchw.form.onsubmit = getObjectMethodClosure(this,"searchsubmitFriends");
				if(mtext) mtext.disabled = true;
				if(mtags) {
					mtags.disabled = true;
					mtags.checked = true;
				}
				url = 'http://www.flickr.com/images/buddyicon.jpg';
			} else if(searchw.value=="allfamily") {
				this.getContacts();
				searchw.form.onsubmit = getObjectMethodClosure(this,"searchsubmitFamily");

				if(mtext) mtext.disabled = true;
				if(mtags) {
					mtags.disabled = true;
					mtags.checked = true;
				}
				url = 'http://www.flickr.com/images/buddyicon.jpg';
			} else if(matches = /^group_(.*)$/.exec(searchw.value)) {
				searchw.form.onsubmit = getObjectMethodClosure(this,"searchsubmitGroups");	
				
				if(mtext) mtext.disabled = true;
				if(mtags) {
					mtags.disabled = true;
					mtags.checked = true;
				}
				this.groupID = matches[1];
				url = 'http://www.flickr.com/images/buddyicon.jpg';
				var iconserver = this.groupsXML..group.(@nsid == this.groupID).@iconserver;
				if (iconserver){
					url = 'http://static.flickr.com/'+iconserver+'/buddyicons/'+this.groupID+'.jpg?1';
				}
			} else if(searchw.options[searchw.selectedIndex].id == "searchgrouploading") {
				
				if(mtext) mtext.disabled = true;
				if(mtags) {
					mtags.disabled = true;
					mtags.checked = true;
				}
				url = 'http://www.flickr.com/images/pulser2.gif';
				this.getGroups();
			} else if(this.inAdvancedPage && searchw.options[searchw.selectedIndex].id == "searchwloading") {
				url = 'http://www.flickr.com/images/pulser2.gif';		
				
				searchw.options[searchw.selectedIndex].text = '-- Loading... --';
				this.getContacts();
			} else if(this.inAdvancedPage && searchw.value != 'all' && searchw.value != 'me') {
				url = this.getContactLogo(searchw.value);

				url = "http://www.flickr.com/images/buddyicon.jpg";
				var server = this.contactsXML..contact.(@nsid == searchw.value).@iconserver;
				if(server>0)
					url = "http://static.flickr.com/"+server+"/buddyicons/"+searchw.value+".jpg";
			} else {
				
				if(mtext) mtext.disabled = false;
				if(mtags) mtags.disabled = false;
				

				searchw.form.onsubmit = '';
			}
			this.changeIcon(url);
		},

		changeIcon: function(url) {
			var icn = document.getElementById('searchscopebuddyicon');
			icn.alt = '';
			
			if (url){
				icn.addEventListener('load',function(){ this.style.display = 'inline'; },true);
				icn.src = url;
			}else{
				icn.style.display = 'none';
			}
		},

		//======================================================================

		getContacts: function() {
			if(!this.contactList) {
				/*var details = {
					method    : "POST",
					onload    : getObjectMethodClosure(this,"process_contactsID"),
					url       : "http://www.flickr.com/services/rest/?method=flickr.contacts.getPublicList&api_key=e8c3239ff04c102ce2d6ed885bf99005&user_id="+this.userID,
				};
				

				GM_xmlhttpRequest( details );*/

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
						this.error( err_msg, code, req,li);
					} else {
						this.error("Unknown error status: '" + stat + "'", 0, req)
					}
				} else {
					var contacts = new Array();
					var family = new Array();
					var friends = new Array();
					var searchw;
					this.contactsXML = rsp;
					if(this.inAdvancedPage) searchw = document.getElementById('searchw');
					for each(contact in rsp..contact) {
						contacts.push(contact.@nsid);
						if(this.inAdvancedPage) {
							var option = searchw.appendChild(document.createElement('option'));
							option.innerHTML = contact.@username;
							option.value = contact.@nsid;
							option.id = 'contact_'+contact.@nsid;
						}
						if(contact.@family == '1') family.push(contact.@nsid);
						if(contact.@friend == '1') friends.push(contact.@nsid);
					}
					if(this.inAdvancedPage) {
						var searchwloading = document.getElementById('searchwloading');
						searchwloading.text = '-- Select a contact --';
						this.changeIcon();
					}
					this.contactList = contacts.join(',');
					this.familyList = family.join(',');
					this.friendsList = friends.join(',');
				}
			}
		},

		searchsubmitContacts: function() {
			this.insertFeeds(CONTACTS);
			this.wait("Searching in the last photos of your contacts...");
			if(this.contactList) {
				this.searchPhotosContacts(this.contactList);
			} else {
				this.waitForContactList(0,this.contactList);
			}
			return false;
		},

		searchsubmitFamily: function() {			
			this.insertFeeds(FAMILY);
			this.wait("Searching in the last photos of your family...");
			if(this.contactList) {
				this.searchPhotosContacts(this.familyList);
			} else {
				this.waitForContactList(0,this.familyList);
			}
			return false;
		},

		searchsubmitFriends: function() {
			this.insertFeeds(FRIENDS);
			this.wait("Searching in the last photos of your friends...");
			if(this.contactList) {
				this.searchPhotosContacts(this.friendsList);
			} else {
				this.waitForContactList(0,this.friendsList);
			}
			return false;
		},
		
		waitForContactList: function(cnt,list) {
			if(this.contactList) {
				this.searchPhotosContacts(list);
			} else if(cnt < 30) {
				setTimeout(getObjectMethodClosure12(this,"waitForContactList",cnt++,list),1000);
			}
		},

		searchPhotosContacts: function(list) {
			//we query the rss feed as there are no handy method to search more than one user for tags.
			var url = "http://www.flickr.com/services/feeds/photos_public.gne?format=json&ids="+list+"&tags="+encodeURIComponent(document.getElementById("standard_q").value);
				var details = {
					method    : "GET",
					onload    : getObjectMethodClosure11(this,"displayResultsContacts",false),
					url       : url
				};
				
				GM_xmlhttpRequest( details );
		},

		displayResultsContacts: function(req,forceThumb) {
			 
			//			M8_log(req.responseText);
			
			var rsp;
			if(req) {
				rsp = req.responseText;
				rsp = rsp.substr(15);
				rsp = eval('('+rsp);
				this.contactSearchResult = rsp;
			} else {
				rsp = this.contactSearchResult;
			}

			if (rsp == null) {
				this.error( "Could not understand answer.", 0, req,li);
				return;
			} else {		
				var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
				
				if(forceThumb == THUMBS) thumbs = true;
				else if(forceThumb == DETAILS) thumbs = false;
				else thumbs = (document.location.search.indexOf('z=t') >= 0) || GM_getValue('alwaysthumb');	

				var results = this.createResultContainer(CONTACTS,thumbs?THUMBS:DETAILS);

				this.buildResultSet(CONTACTS,rsp.items.length,getObjectMethodClosure2(this,'displayResultsContacts'),thumbs,results);

				var html = '';
				var entry;
				var re = /href=&quot;(http:\/\/www.flickr.com\/people\/(.*?)\/)&quot;.*img src=&quot;(http:\/\/static\.flickr\.com\/.*?)&quot; width=&quot;([0-9]+)&quot; height=&quot;([0-9]+)&quot;/;
				for each(entry in rsp.items) {
					var desc = entry.description;
					var matches = re.exec(desc);
					var src = '';
					var user_profile = '';
					var url_id = '';
					var logo = '';
					var width = '240';
					var height = '180';
					var authorName = entry.author.replace(/nobody@flickr\.com \((.+?)\)$/,'$1');
					if(matches) {
						user_profile = matches[1];
						url_id = matches[2];
						src = matches[3];
						width = matches[4];
						height = matches[5]
						logo = this.getContactLogo(authorName);
					}
					
					if(thumbs) {
						src = src.replace(/_m/,"_t");
					}
					var date = entry.published.substr(0,10).split('-');
					var longdate = date[2]+' '+months[parseInt(date[1])-1]+' '+date[0];
					var urldate = date[0]+'/'+date[1]+'/'+date[2]+'/';
					html += this.generateSearchLine(entry.title,
											  src,
											  width,
											  height,
											  entry.link,
											  "/photos/"+url_id,
											  logo,
											  authorName,
											  user_profile,
											  urldate,
											  longdate,
														   entry.tags.split(' ' ),
														   thumbs);
				}
				results.innerHTML = html;
				if(thumbs) {
						var br = results.parentNode.appendChild(document.createElement('br'));
						br.clear = 'all';						
				}
				this.wait();
			}
		},

		
		getContactLogo: function(uname) {
			var server = this.contactsXML..contact.(@username == uname);
			var nsid = server.@nsid;
			server = server.@iconserver;
			if(server>0) {
				return "http://static.flickr.com/"+server+"/buddyicons/"+nsid+".jpg";
			} else
				return "http://www.flickr.com/images/buddyicon.jpg";
		},
		
		//======================================================================
		
		getGroups: function() {
			if(!this.contactList) {
				var select = document.getElementById('searchgrouploading');
				select.innerHTML = '-- Loading... --';
				/*var details = {
					method    : "POST",
					onload    : getObjectMethodClosure(this,"process_groupsID"),
					url       : "http://www.flickr.com/services/rest/?method=flickr.people.getPublicGroups&api_key=e8c3239ff04c102ce2d6ed885bf99005&user_id="+this.userID,
				};
				

				GM_xmlhttpRequest( details );*/
				var self = this;
				var listener = {
					flickr_groups_pools_getGroups_onLoad: function(success, responseXML, responseText, params){
						self.process_groupsID(responseText);
					}
				};
				
				unsafeWindow.F.API.callMethod('flickr.groups.pools.getGroups', {}, listener);
			} 
		},

		process_groupsID: function(req) {
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
						this.error( err_msg, code, req,li);
					} else {
						this.error("Unknown error status: '" + stat + "'", 0, req)
					}
				} else {
					var searchw = document.getElementById("searchw");
					var before = document.getElementById("searchwloading");
					var select = document.getElementById('searchgrouploading');
					this.changeIcon('');
					select.innerHTML = '-- Select a group --';
					for each(group in rsp..group) {
						select = searchw.insertBefore(document.createElement('option'),before);
						select.innerHTML = group.@name;
						select.value = 'group_'+group.@nsid;
						select.id = 'group_'+group.@nsid;
					}
					select = searchw.insertBefore(document.createElement('option'),before);
					select.innerHTML = '----';
					this.groupsXML = rsp;
				}
			}
		},

		searchsubmitGroups: function() {
			this.searchGroups(1);
			return false;
		},

		searchGroups: function(page) {
			if(this.groupsXML) {
				var groupTitle = this.groupsXML..group.(@nsid == this.groupID);
				this.wait("Searching in the group "+groupTitle.@name);
			} else this.wait("Searching in the group");

			/*var url ="http://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=e8c3239ff04c102ce2d6ed885bf99005&per_page=24&extras=date_upload,icon_server&group_id="+this.groupID+"&tags="+encodeURIComponent(document.getElementById("standard_q").value)+"&page="+page;
			var details = {
					method    : "GET",
					onload    : getObjectMethodClosure11(this,"displayResultsGroups",false),
					url       : url
					};
				
			GM_xmlhttpRequest( details );*/
			var self = this;
			var listener = {
				flickr_groups_pools_getPhotos_onLoad: function(success, responseXML, responseText, params){
					self.displayResultsGroups(responseText,false);
				}
			};
			
			unsafeWindow.F.API.callMethod('flickr.groups.pools.getPhotos', {
				per_page: 24,
							  extras: 'date_upload,icon_server',
							  page:page,
							  tags: document.getElementById("standard_q").value,
							  group_id: this.groupID
			}, listener);
		},

		displayResultsGroups: function(req,forceThumb) {
			 
			//M8_log(req);
			
			var rsp;
			if(req) {
				rsp = req.replace(/<\?xml.*\?>/,'');
				rsp = new XML(rsp);
				this.groupSearchResult = rsp;
			} else {
				rsp = this.groupSearchResult;
			}

			if (rsp == null) {
				this.error( "Could not understand answer.", 0, req,li);
				return;
			} else {		
				if(rsp.@stat == 'ok') {
					var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
					
					var thumbs;
					if(forceThumb == THUMBS) thumbs = true;
					else if(forceThumb == DETAILS) thumbs = false;
					else thumbs = (document.location.search.indexOf('z=t') >= 0) || GM_getValue('alwaysthumb');

					var results = this.createResultContainer(GROUPS,thumbs?THUMBS:DETAILS);
								
					var thumbs;
					if(forceThumb == THUMBS) thumbs = true;
					else if(forceThumb == DETAILS) thumbs = false;
					else thumbs = (document.location.search.indexOf('z=t') >= 0) || GM_getValue('alwaysthumb');

					this.buildResultSet(GROUPS,rsp.photos.@total,getObjectMethodClosure2(this,'displayResultsGroups'),thumbs,results);

					var html = '';
					for each(photo in rsp..photo) {

						var src = "http://static.flickr.com/"+photo.@server+"/"+photo.@id+"_"+photo.@secret;
						if(thumbs) src += "_t.jpg";
						else src += "_m.jpg"
						var url_id = photo.@owner;
						var user_profile = '/people/'+url_id;
						var authorName = photo.@ownername;
						var date = new Date(photo.@dateupload*1000);
						date_url = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay();
						date = date.getDay()+" "+months[date.getMonth()]+" "+date.getFullYear();
						var logo =  "http://www.flickr.com/images/buddyicon.jpg";
						if(photo.@iconserver>0) {
							logo= "http://static.flickr.com/"+photo.@iconserver+"/buddyicons/"+photo.@owner+".jpg";
						} 
						//var longdate = date[2]+' '+months[parseInt(date[1])-1]+' '+date[0];
						//var urldate = date[0]+'/'+date[1]+'/'+date[2]+'/';
						html += this.generateSearchLine(photo.@title,
															   src,
															   '',
															   '',
															   "/photos/"+url_id+"/"+photo.@id,
															   "/photos/"+url_id,
															   logo,
															   authorName,
															   user_profile,
															   date_url,
															   date,
														null,
														thumbs);
					}
					results.innerHTML = html;
					if(thumbs) {
						var br = results.parentNode.appendChild(document.createElement('br'));
						br.clear = 'all';						
					}
					if(rsp.photos.@pages > 1) results.parentNode.appendChild(this.paginate(rsp.photos.@page,rsp.photos.@pages,rsp.photos.@total,'searchGroups'));
					this.wait();
				} else if(rsp.@stat == 'fail') {
					this.error(rsp.err.@msg,rsp.err.@code,req);
				} else {
					this.error("unknown error with group search",0,req);
				}
			}
		},

		selectRightGroup: function(id) {
			var searchw = document.getElementById('group_'+id);
			if(searchw) searchw.selected = true;
			else {
				var matches;
				if(matches = /[&?]group_title=([^&]+)/.exec(document.location.search)) {
					searchw = document.getElementById('searchw').appendChild(document.createElement('option'));
					searchw.innerHTML = matches[1];
					searchw.value = id;
					searchw.name = 'group_'+id;
					searchw.id = 'group_'+id;
					searchw.selected = true;
				} else {
					setTimeout(getObjectMethodClosure0(this,'selectRightGroup',id),true);
				}
			}			
		},

		//======================================================================

		buildResultSet: function(type,total,callback,thumbs,results) {		
			var found = document.getElementById('ResultSetFound');
			var link;
			
			if(!found) {
				var set = results.parentNode.insertBefore(document.createElement('div'),results);
				set.className = "ResultSet";
				var div = set.appendChild(document.createElement('div'));
				div.className = 'Switch';
				link = div.appendChild(document.createElement('a'));
				link.id = "switcha";
				link.href="javascript:;";
				this.createAlwaysCheck(div);
				
				found = set.appendChild(document.createElement('div'));
			}
			if(!link) link = document.getElementById('switcha');
			if(thumbs) link.innerHTML = "Show details";
			else link.innerHTML = "Show Thumbnails";

			link.addEventListener('click',function() {callback(null,thumbs?DETAILS:THUMBS);},true);

			if(total < 1) link.style.display = 'none';

			found.id = "ResultSetFound";
			if(total > 0) {
				found.className = 'Found';
				var html = 'We found '+total+' photos about <span class="queryterm">'+document.getElementById('standard_q').value+'</span>';
				if(type == GROUPS) {
					if(this.groupsXML) {
						var groupTitle = this.groupsXML..group.(@nsid == this.groupID);
						html +=" in the pool of "+groupTitle.@name;
					}
				} else if(type == CONTACTS) {
					html +=" in your contacts' photos";
				}
				html += '.<div class="SortOptions">&nbsp;</div>';
				found.innerHTML = html;
			} else {
				found.className = 'NoneFound';
				var html = 'We cannot find any results matching your request.';
				if(type == GROUPS) {
					if(this.groupsXML) {
						var groupTitle = this.groupsXML..group.(@nsid == this.groupID);
						html +=" in the group "+groupTitle.@name+" pool";
					}
				} else if(type == CONTACTS) {
					html +=" in your contacts' photos";
				}				
				html += '<div class="SortOptions">&nbsp;</div><p>We give up!</p>';
				found.innerHTML = found;
			}
			return found.parentNode;
		},

		generateSearchLine: function(title,src,width,height,url,user_url,user_logo,user_name,user_profile,date,longdate,tags,thumbs) {
		
			if(!thumbs) {
				var toreturn = '<tr valign="top">\
			<td class="DetailPic">\
				<a href="'+url+'" title="'+title+'"><img src="'+src+'" width="'+width+'" height="'+height+'" alt="'+title+'" /></a>\
			</td>\
			<td class="PicDesc">\
				<h3>'+title+'\
					<br />\
					<small>Uploaded on <a href="'+user_url+'/archives/date-posted/'+date+'" style="text-decoration: none;">'+longdate+'</a></small>\
				</h3>\
				<p class="PicFrom">\
					<a href="'+user_url+'"><img src="'+user_logo+'" width="48" height="48" alt="Click '+user_name+'\' Buddy Icon to see more photos" /></a>\
					By <b><a href="'+user_url+'" style="text-decoration: none;">'+user_name+'</a></b><br />\
					<span style="font-size: 12px;">See <a href="'+user_url+'" style="text-decoration: none;">more photos</a>, or visit his <a style="text-decoration: none;" href="'+user_profile+'">profile</a>.</span>\
				</p>\
				<p class="ListTags">';
				if(tags) {
					toreturn += '<img src="/images/icon_tag.gif" alt="Tagged with..." width="16" height="16" align="absmiddle" style="border: none;" />';
					var cnt = 0;
					for each(tag in tags) {
						if(cnt++ > 3) break;
						toreturn += this.tagLine(tag);
					}
					if(cnt > 3) toreturn += "...</p>";
				}
				toreturn += "</td></tr>";
			} else {
				var toreturn = '<div>\
				  <a title="'+title+' by '+user_name+'" href="'+url+'">\
				  <img src="'+src+'"/>\
				  </a>\
				  <p>\
				  <a href="'+user_url+'">'+user_name+'</a>\
				  </p>\
				  </div>';
			}
			return toreturn;
		},

		createResultContainer: function(type,dispType) {
			
			var pages = document.evaluate("//div[@class='Pages']",                              
										  document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
										  ).singleNodeValue;	
			if(pages) pages.parentNode.removeChild(pages);
			var rs = document.evaluate("//div[@class='ResultSet']",                              
									   document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
									   ).singleNodeValue;	
			if(rs) rs.parentNode.removeChild(rs);
			rs = document.evaluate("//div[@class='ResultsThumbs']",                              
								   document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
								   ).singleNodeValue;	
			if(rs) rs.parentNode.removeChild(rs);

			if(type == GROUPS) {
				rs = document.getElementById('Feeds');	
				if(rs) rs.parentNode.removeChild(rs);
			}

			var results;
			if(dispType == DETAILS) {
				results = document.evaluate("/html/body/div[@id='Main']/table",                              
										document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
										).singleNodeValue;		
				if(results) results.id = "ResultsTable";
				var tab = document.getElementById('ResultsDiv');
				if(tab) tab.style.display = 'none';
			} else if(dispType == THUMBS) {
				results = document.evaluate("/html/body/div[@id='Main']//div[@class='ResultsThumbs']",                              
										document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
										).singleNodeValue;	
				if(results) results.id = "ResultsDiv";
				var tab = document.getElementById('ResultsTable');
				if(tab) tab.style.display = 'none';
			}
				
			if(!results) {
				if(dispType == THUMBS) {
					results = document.createElement("div");
					results.className = "ResultsThumbs";
					results.id = "ResultsDiv";
				} else {
					results = document.createElement("table");
					results.cellspacing="0";
					results.className="DetailResults";
					results.id = "ResultsTable";
				}
				var insertAfter = document.getElementById('searchwaitdiv');
				if(!insertAfter) insertAfter = document.forms[1];
				insertAfter.parentNode.insertBefore(results,insertAfter.nextSibling);
			} 
			results.style.display = '';
			return results;
		},

		paginate: function(page,number,total,callback) {
			page = parseInt(page);
			number = parseInt(number);
			total = parseInt(total);
			var pagesD = document.evaluate("//div[@class='Paginator']",                              
										  document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
										  ).singleNodeValue;
			var pagesA;
			if(!pagesD) {
				pagesA = document.createElement('div');
				pagesA.className = "Pages";
				var pagesD = pagesA.appendChild(document.createElement('div'));
				pagesD.className = "Paginator";
			} else {
				pagesA = pagesD.parentNode;
				pagesD.innerHTML = '';
				pagesA.removeChild(pagesD.nextSibling);
			}
			
			if(page == 1) {
				var span = pagesD.appendChild(document.createElement('span'));
				span.className = "AtStart";
				span.innerHTML =  '&lt; Prev';
			} else {
				var a = pagesD.appendChild(document.createElement('a'));
				a.innerHTML = "&lt; Prev";
				a.className = "Prev";
				a.href="javascript:;";
				var self = this;
				a.addEventListener("click",getObjectMethodClosure0(this,callback,page-1),true);
			}
			
			var start = page-3;
			if(start < 7) start = 1;
			if(start > 1){
				var span = pagesD.appendChild(document.createElement('span'));
				span.className = "break";
				span.innerHTML =  '...';
			}
			var stop = page+3;
			if(stop < 13)
				stop = 10;
			for(var i=start;i<=stop && i <= number;i++) {
				if(i == page) {
					var span = pagesD.appendChild(document.createElement('span'));
					span.className = "this-page";
					span.innerHTML =  page;
				} else {
					var a =pagesD.appendChild(document.createElement('a'));
					a.innerHTML = i;
					a.href="javascript:;";
					var self = this;
					var p = i;
					a.addEventListener("click",getObjectMethodClosure0(this,callback,i),true);
				}
			}
			if(number-start > 10) {
				var span = pagesD.appendChild(document.createElement('span'));
				span.className = "break";
				span.innerHTML =  '...';
			}
			if(page < number) {				
				var a = document.createElement('A');
				pagesD.appendChild(a);
				a.innerHTML = "Next &gt;";
				a.className = "Next";
				a.href="javascript:;";
				var self = this;
				a.addEventListener("click",getObjectMethodClosure0(this,callback,page+1),true);
			}
			var rstot = pagesA.appendChild(document.createElement('div'));
			rstot.className = "Results";
			rstot.innerHTML = '('+total+' photos, '+number+' pages)';
			return pagesA;
		},
		
		error: function(msg,code,req) {
			M8_log(msg,req);
		},
		
		tagLine: function(tag) {
			return '<a href="/photos/tags/'+tag+'/clusters/">'+tag+'</a>, ';
		},

		insertFeeds: function(type) {
			var feeds = document.getElementById('Feeds');
			if(!feeds ) feeds = document.getElementById('Main').appendChild(document.createElement('div'));
			feeds.id = "Feeds";
			var feedurl = "/services/feeds/photos_public.gne?format=rss_200";
			var title = '';
			if(type == CONTACTS) {
				feedurl += "&ids="+this.contactList;
				title = "&ndash; Subscribe to your contacts' photos tagged "+document.getElementById("standard_q").value;
			} else if(type == FAMILY) {
				feedurl += "&ids="+this.familyList;
				title = "&ndash; Subscribe to your family's photos tagged "+document.getElementById("standard_q").value;
			} else if(type == FRIENDS) {
				feedurl += "&ids="+this.friendsList;
				title = "&ndash; Subscribe to your friends' photos tagged "+document.getElementById("standard_q").value;
			} else {
				if(document.location.search.indexOf('w=me') >= 0) {
					feedurl += "&id="+this.userID;
					title = "&ndash; Subscribe to your photos tagged "+document.getElementById("standard_q").defaultValue;
				} else if(document.location.search.indexOf('w=all') < 0) {
					feedurl += "&id="+document.getElementById('searchw').value;
					var matches = /^Flickr: Search (.*) photos$/.exec(document.title);
					if(matches) title = "&ndash; Subscribe to "+matches[1]+" photos tagged "+document.getElementById("standard_q").value;
				} else {
					title = "&ndash; Subscribe to public photos tagged "+document.getElementById("standard_q").value;
				}
			}
			feedurl += "&tags="+encodeURIComponent(document.getElementById("standard_q").value);
			feeds.innerHTML = '<div id="AtomRSS">\
                  <a title="RSS 2.0 feed" href="'+feedurl+'">\
                     <img width="16" height="16" align="absmiddle" alt="Subscribe to a feed of stuff on this page..." src="/images/feed-icon-16x16.png"/>\
                  </a>\
                  <a title="RSS 2.0 feed" href="'+feedurl+'">Feed</a>'+title+
			'</div>								\
              <div id="AddToYahoo">\
                  <a href="http://us.rd.yahoo.com/my/atm/Flickr/Users/*http://add.my.yahoo.com/rss?url=http%3A%2F%2Fwww.flickr.com%2F'+encodeURIComponent(feedurl)+'"> \
                    <img width="62" height="17" alt="Add to My Yahoo!" src="/images/addtomyyahoo6.gif"/>\
                  </a>\
              </div>';
		},
		
		createAlwaysCheck: function(parent) {
			
			parent.appendChild(document.createElement('br'));
			var check =  document.createElement('input');
			check.type = "checkbox";
			check.checked = GM_getValue('alwaysthumb');
			check.id = 'alwaysthumb';
			check.addEventListener('change',function(event) {	
									   GM_setValue('alwaysthumb',check.checked);
									   if(check.checked) {
										   var input = document.forms[1].appendChild(document.createElement("input"));
										   input.id = "hidalwaysthumb";
										   input.type = 'hidden';
										   input.name= 'z';
										   input.value = 't';
										   var pages = document.evaluate("	//div[@class='Paginator']/a",										  
																		 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
										   
										   for(var i = 0; i < pages.snapshotLength; i++) {  
											   var al = pages.snapshotItem(i);
											   al.href += "&z=t";
										   }
									   } else {
										   var hide = document.getElementById("hidalwaysthumb");
										   hide.parentNode.removeChild(hide);
									   }
								   },true);
			parent.appendChild(check);
			parent.appendChild(document.createTextNode("Always show thumbnails"));
		},

		wait: function(message) {
			var wait = document.getElementById('searchwaitdiv');
			if(wait) {
				if(message) {
					wait.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" style="vertical-align:middle;margin-right:4px;border:0px #ffffff" />'+message;
				} else {
					wait.style.display = 'none';
				}
			} else if(message) {
				wait = document.forms[1].parentNode.insertBefore(document.createElement('div'),document.forms[1].nextSibling);
				wait.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" style="vertical-align:middle;margin-right:4px;border:0px #ffffff" />'+message;
				wait.id = 'searchwaitdiv';
				wait.style.textAlign = "center";
			}
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
									
									var flickrgp = new win.FlickrMoreSearch();
		}, false);
	} catch (ex) {}

})();
