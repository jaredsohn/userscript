// ==UserScript==
// @name	Flickr Favorite Users
// @namespace	http://6v8.gamboni.org/
// @description See more of your favorite users
// @version        0.6
// @identifier	http://6v8.gamboni.org/IMG/js/flickrfavoriteusers.user.js
// @date           2007-11-11
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/people/*/contacts/
// @include http://*flickr.com/people/*/contacts
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2006 Pierre Andrews
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA


(function () {

	//update information
	var SCRIPT = {
		name: "Flickr Favorite Users",
		namespace: "http://6v8.gamboni.org/",
		description: "See more of your favorite users",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrfavoriteusers.user.js",
		version: "0.6",								// version
		date: (new Date("2007-11-11"))		// update date
		.valueOf()
	};
	
	
	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	
	function getObjectMethodClosure0(object, method,arg) {
		return function(a) {
			return object[method](arg); 
		}
	}

	function getObjectMethodClosure03(object, method,arg,arg1,arg2) {
		return function(a) {
			return object[method](arg,arg1,arg2); 
		}
	}

	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
	}


	var flickrfavoriteusers = function() {this.init();}

	flickrfavoriteusers.prototype = {
		div: '',
		contacts: new Array(),
		nsid: unsafeWindow.global_nsid,
		title: "Your",
		total_favs: 0,
		total_users: 0,
		real_total: 0,
		max: 0,

		init: function() {
			var insertPoint = document.evaluate("/html/body/div[@id='Main']//ul",                              
				document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
				).singleNodeValue;

			if(!insertPoint) {
				var nsid_a = document.evaluate("/html/body/div[@id='Main']/table[@id='SubNav']/tbody/tr/td[@class='Buddy']//img",                              
											   document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
											   ).singleNodeValue;
				if(nsid_a) {
					this.nsid = nsid_a.src.replace(/http:\/\/(farm[0-9]*.)?static.flickr.com\/[0-9]*\/buddyicons\//,'');
					this.nsid = this.nsid.replace(/\.jpg?.*/,'');
					insertPoint = document.evaluate("/html/body//div[@class='Footer']",                              
													document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
													).singleNodeValue;
					var h3 = document.evaluate("/html/body/div[@id='Main']/h3",
									  document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
									  ).singleNodeValue;
					this.title = h3.innerHTML.replace('contacts','')
					
				}
			}

			if(insertPoint) {
				this.div = document.createElement('div');
				this.div.innerHTML = '<h2>'+this.title+' Favorite Users</h2>'+
					'<img id="flickrphotocompass_wait" src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /> searching ...'+
				'<div class="graph" style="position:relative;left:'+((document.width/2)-100)+'px;"><string class="bar" style="width:0%;">&nbsp;</strong></div>';
				
				insertPoint.parentNode.insertBefore(this.div,insertPoint);
				var br = insertPoint.parentNode.insertBefore(document.createElement('br'),insertPoint);
				br.clear = 'all';
				GM_addStyle("img.NotContact {border: 1px solid red;}");
				GM_addStyle(".graph {"+
							"width: 200px;"+
							"border: 1px solid #FF0084;"+
							"padding: 2px;"+
							"margin: 1em;"+
							"}"+
							".graph .bar {"+
							"display: block;"+
							"position: relative;"+
							"background: #0063DC;"+
							"text-align: center;"+
							"color: #333;"+
							"height: 2em;"+
							"line-height: 2em;"+       
							"color: #FF0084"+
							"}"+
							".graph .bar span { position: absolute; left: 1em; }");
				this.getContacts();
			}
		},
		
		getFavoriteUsers: function() {
			var self = this;
			var favoriteusers = {};

			var listener = {
				flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
			M8_log(success);

					if(success) {
						var rsp = responseText.replace(/<\?xml.*\?>/,'');
						rsp = new XML(rsp);
						var page = 1*rsp.photos.@page;
						var pages = 1*rsp.photos.@pages;
						self.real_total = rsp.photos.@total;
						for each(photo in rsp..photo) {
								self.total_favs++;
								owner = photo.@owner;
								var percent = self.total_favs*100/self.real_total;
								self.div.innerHTML = '<h2>'+self.title+' Favorite Users</h2>'+
									'<img id="flickrphotocompass_wait" src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /> searching ...'+
									'<div class="graph" style="position:relative;left:'+((document.width/2)-100)+'px;">'+
									'<strong class="bar" style="width: '+percent+'%;">'+page+'/'+pages+'</strong>'+
									'</div>';
								if(favoriteusers[owner]) {
									favoriteusers[owner].count++;
									if(favoriteusers[owner].count > self.max)
										self.max = favoriteusers[owner].count;
									favoriteusers[owner].favs.push({id:photo.@id,
												secret: photo.@secret,
												server: photo.@server,
												title: photo.@title
												});
								} else {
									favoriteusers[owner] = {user_id: owner,
															icon_server: photo.@iconserver,
															owner_name: photo.@ownername,
															count:1,
															favs: new Array({id:photo.@id,
																			 secret: photo.@secret,
																			 server: photo.@server,
																			 title: photo.@title
																})
									};
									self.total_users++;
								}
							}
						if(page < pages) {
							unsafeWindow.F.API.callMethod('flickr.favorites.getList', {
									per_page: 500,
									page: page+1,
									extras: 'icon_server,owner_name',
									user_id: self.nsid
								}, listener);							
						} else {
							self.searchFinished(favoriteusers,1,.1);
						}
					}
				}
			};
			unsafeWindow.F.API.callMethod('flickr.favorites.getList', {
					per_page: 500,
						extras: 'owner_name,icon_server',
						user_id: this.nsid
						}, listener);
		},

		searchFinished: function(list,maxFact,minFact) {
			var sorted = new Array();
			if(maxFact > 1) maxFact = 1;
			var max = this.max*maxFact;
			var min = this.max*minFact;
			
			for each(user in list) {
					if(user.count > min && user.count <= max)
						sorted.push(user);
				}
			var sorted = sorted.sort(function(a,b) {
					return b.count-a.count;
				});

			this.div.innerHTML = '';
			var h2 = this.div.appendChild(document.createElement('h2'));
			h2.innerHTML =  this.title+' Favorite Users';
			var contacts = this.contacts.join(',');

			for each(user in sorted) {
					var p = this.div.appendChild(document.createElement('p'));
					p.className = "Person";
					p.setAttribute('style','width: 80px;height:80px;');
					var a = p.appendChild(document.createElement('a'));
					a.href= '/photos/'+user.user_id+'/';
					var img = a.appendChild(document.createElement('img'));
					img.width = img.height = 48;
					img.src= ((user.icon_server>0)?'http://static.flickr.com/'+user.icon_server+'/buddyicons/'+user.user_id+'.jpg':'http://www.flickr.com/images/buddyicon.jpg');
					img.className="FriendBuddyIcon";
					if(contacts.indexOf(user.user_id) < 0) img.className += " NotContact";
					img.id = "FriendBuddyIcon"+user.user_id;
					a.appendChild(document.createElement('br'));
					a.appendChild(document.createTextNode(user.owner_name));
					p.appendChild(document.createElement('br'));
					var fav_a = p.appendChild(document.createElement('a'));
					fav_a.href= 'javascript:;';
					fav_a.innerHTML = 'Favs: '+user.count;
					fav_a.user = user;
					fav_a.addEventListener('click',getObjectMethodClosure0(this,'showFavs',user),true);

					var img2 = unsafeWindow.document.getElementById('FriendBuddyIcon'+user.user_id);
					img2.nsid = user.user_id;
					img.addEventListener('mouseover',getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
					img.addEventListener('mouseout',getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);
					var id = "hover_img" + user.user_id;
					if (!document.getElementById(id)) {
						var new_img = document.createElement("IMG");
						new_img.id = id;
						new_img.nsid = user.user_id;
						new_img.src = img.src;
						new_img.className = "person_hover_img";
						unsafeWindow.document.getElementById("person_hover_link").appendChild(new_img);
						var new_img2 =  unsafeWindow.document.getElementById(id);
						new_img2.nsid = user.user_id;
					}
				}
			var br = this.div.appendChild(document.createElement('br'));
			br.clear = 'all';
			var pages = this.div.appendChild(document.createElement('div'));
			pages.className = 'Pages';
			var paginator = pages.appendChild(document.createElement('div'));
			paginator.className = 'Paginator';
			
			if(minFact == 0.1) {
				var span = paginator.appendChild(document.createElement('span'));
				span.className = "AtStart";
				span.innerHTML = "< Prev";
			} else {
					var a = paginator.appendChild(document.createElement('a'));
					a.className = 'Prev';
					a.href = 'javascript:;';
					a.innerHTML = "< Prev";					
					a.addEventListener('click',getObjectMethodClosure03(this,'searchFinished',list,maxFact*10,maxFact),true);				
			}
			var p = 0;
			for(var i=0.1;i*this.max>=0.1;i *= 0.1) {
				if(i == minFact) {
					var span = paginator.appendChild(document.createElement('span'));
					span.className = "this-page";
					span.innerHTML = p++;
				} else {
					var a = paginator.appendChild(document.createElement('a'));
					a.href = 'javascript:;';
					a.innerHTML = p++;
					a.addEventListener('click',getObjectMethodClosure03(this,'searchFinished',list,i*10,i),true);				
				}
			}
			if(minFact*.1*this.max < 0.1) {
				var span = paginator.appendChild(document.createElement('span'));
				span.className = "AtEnd";
				span.innerHTML = "Next >";
			} else {
					var a = paginator.appendChild(document.createElement('a'));
					a.className = 'Next';
					a.href = 'javascript:;';
					a.innerHTML = "Next >";					
					a.addEventListener('click',getObjectMethodClosure03(this,'searchFinished',list,minFact,minFact*.1),true);				
			}
			var rez = pages.appendChild(document.createElement('div'));
			rez.className = 'Results';
			rez.innerHTML = '('+this.total_users+' Favorite Users)';

		},

		getContacts: function() {
			var self = this;
			var listener = {
				flickr_contacts_getList_onLoad: function(success, responseXML, responseText, params){
					self.process_contactsID(responseText);
				}
			};
			
			unsafeWindow.F.API.callMethod('flickr.contacts.getList', {}, listener);
		},

		process_contactsID: function(req) {
			var rsp = req.replace(/<\?xml.*\?>/,'');
			rsp = new XML(rsp);

			if (rsp == null) {
				M8_log( "Could not understand Flickr's response.");
			} else {			
				var stat = rsp.@stat;
				if (stat == null) {
					M8_log( "Could not find status of Flickr request");
				} else if (stat != 'ok') {
					M8_log("error with the flickr answer");
				} else {
					for each(contact in rsp..contact) {
							this.contacts.push(""+contact.@nsid);
					}
				}
			}
			this.getFavoriteUsers();
		},

		
		showFavs: function(user) {
			var back = document.body.appendChild(document.createElement('div'));
			back.id="GMfav_usersBack";
			back.setAttribute('style',"position:absolute;background-color: black;opacity: 0.35; display: block; left: 0pt;");
			back.style.width = document.width+'px';
			back.style.height = document.height+'px';
			back.style.top = document.body.scrollTop+'px';
			var modal = document.body.appendChild(document.createElement('div'));
			modal.id="GMfav_users";
			modal.setAttribute('style',"position:absolute;background:white;border: 3px solid black;width: 600px;display: block;");
			var title = modal.appendChild(document.createElement('div'));
			title.setAttribute('style',"padding:12px;background-color: #EEEEEE;clear:both;font-size: 14px;");
			var h3 = title.appendChild(document.createElement('h3'));
			h3.setAttribute('style','margin:0;');
			h3.innerHTML = this.title+' favorites owned by <b>'+user.owner_name+'</b>';
			var close_b = title.appendChild(document.createElement('a'));
			close_b.href='javascript:;';
			var close_img = close_b.appendChild(document.createElement('img'));
			close_img.setAttribute('style',"float: right; position: relative; top:-17px; margin: 0; padding: 0; border:0px !important; vertical-align: top;");
			close_img.src="http://flickr.com/images/window_close_grey.gif";
			
			close_b.addEventListener('click',function() {
										document.body.removeChild(back);
										document.body.removeChild(modal);
				},true);

			modal.style.top = document.body.scrollTop+(document.body.clientHeight/2)+'px';
			modal.style.left = (document.width/2)-300+'px';

			var dialog = modal.appendChild(document.createElement('div'));
			dialog.setAttribute('style',"padding: 18px 16px;clear:both;");
			var content = dialog.appendChild(document.createElement('div'));				
			html = '';
			for each(photo in user.favs) {
					html += '<a href="http://www.flickr.com/photos/'+user.user_id+'/'+photo.id+'/"><img alt="'+photo.title+'" src="http://static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg"/></a>';
				}
			content.innerHTML = html;


			modal.style.top = document.body.scrollTop+((document.body.clientHeight-modal.scrollHeight)/2)+'px';
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
									var flickrgp = new flickrfavoriteusers();
		}, false);
	} catch (ex) {}
})();
