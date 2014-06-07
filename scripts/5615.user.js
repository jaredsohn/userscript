// ==UserScript==
// @name	Flickr Follow Comments
// @namespace	http://6v8.gamboni.org/
// @description Filter the comment you've made to only follow the one that interest you.
// @version        0.6
// @identifier	http://6v8.gamboni.org/IMG/js/flickrfollowcomments.user.js
// @date           2007-02-22
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos_comments.gne
// @include http://*flickr.com/photos/*/*
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

var FETCH_PHOTOS = 150;

(function () {

	//update information
	var SCRIPT = {
		name: "Flickr Follow Comments",
		namespace: "http://6v8.gamboni.org/",
		description: "Filter the comment you've made to only follow the one that interest you.",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrfollowcomments.user.js",
		version: "0.6",								// version
		date: (new Date("2006-02-22"))		// update date
		.valueOf()
	};

	var ALL = 0;
	var CONTACTS = ALL+1;
	var FRIENDS = CONTACTS+1;
	var FAMILY = FRIENDS+1;
	var IGNORED = FAMILY+1;
	var FAVS = IGNORED+1;

	
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

	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	var flickrfollowcomments = function() {this.init();}

	flickrfollowcomments.prototype = {
		photo_blocks: new Array(),
		user_photos: {},
		done: 0,
		table:'',
		faulty_pages: new Array(),
		fetched: 0,

		type: ALL,
		lessThanTen: false,
		sinceLastVisit: false,

		contA: null,
		frieA: null,
		famA: null,
		allA: null,
		favsA: null,

		contacts: new Array(),
		family: new Array(),
		friend: new Array(),
		
		favs: new Array(),
		favs_pages: 1,

		ignore: new Array(),
		lastVisit: 0,
		notupdated: false,
		lastpoll: 0,

		init: function() {
			var ign = GM_getValue('ignoreComments');
			if(ign) this.ignore = ign.split(',');

			if(unsafeWindow.page_photo_id) {
				var disc = document.getElementById('DiscussPhoto');
				var sel = document.createElement('input');
				sel.id = 'ignore_'+i;
				sel.type = 'checkbox';
				sel.checked = this.ignore.indexOf(unsafeWindow.page_photo_id+'') >= 0;
				var self = this;
				sel.addEventListener('click',function(evt) {
						var s = evt.target;
						if(s.checked) {
							self.addIgnore(unsafeWindow.page_photo_id); 
						} else {
							self.removeIgnore(unsafeWindow.page_photo_id);
						}
					}, true);
				disc.appendChild(sel);
				var lbl = disc.appendChild(document.createElement('label'));
				lbl.innerHTML = 'ignore future comments here.';
				lbl.htmlFor = 'ignore_'+i;
			} else if(document.location.pathname == "/photos_comments.gne") {
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
								
				var lastVisit = GM_getValue('lastVisit');
				if(lastVisit) {
					lastVisit = lastVisit.split(',');
					this.lastVisit = parseInt(lastVisit[0]);
					this.sinceLastVisit = eval(lastVisit[1]);
				} else {
					this.sinceLastVisit = false;
					this.lastVisit = 0;
				}
				GM_setValue('lastVisit',Date.now()+','+this.sinceLastVisit);
				
				var main = document.getElementById('Main');
				var feeds = document.getElementById('Feeds');
				main.style.display = 'none';
				main.id = '';
				var newMain = main.parentNode.insertBefore(document.createElement('div'),main);
				newMain.id = 'Main';
				var h1 = newMain.appendChild(document.createElement('h1'));
				h1.innerHTML = 'Comments You\'ve Made';
				this.table = newMain.appendChild(document.createElement('table'));
				this.table.cellspacing = 0;
				this.table.className = 'RecentActivity';
				this.table = this.table.appendChild(document.createElement('tbody'));
				this.table.innerHTML = '<tr><td><img src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /></td></tr>';
				newMain.appendChild(feeds);
				this.lastpoll = GM_getValue('lastpoll');
				var lastrsp = GM_getValue('lastrsp');
				var self = this;
					var listener = {
						flickr_activity_userComments_onLoad: function(success, responseXML, responseText, params){
							try{
								var rsp = responseText.replace(/jsonFlickrApi\(/,'');
								rsp = eval('('+rsp);
								if(rsp.stat == 'ok') {
									GM_setValue('lastrsp',true);
									GM_setValue('lastrsp'+rsp.items.page,responseText);
									self.parsePage(rsp);
								} else
								M8_log("Error2 "+responseText);							
							} catch (e) {
								M8_log("Error1 "+responseText);
								M8_log(e);
							}
						}
					};
				if(!lastrsp || !this.lastpoll || this.lastpoll && (Date.now()-this.lastpoll > 3600*1000)) {
					var nbr_page = FETCH_PHOTOS/50;
					for(i=0;i < nbr_page;i++) {
						GM_setValue('lastpoll',Date.now()+"");
						unsafeWindow.F.API.callMethod('flickr.activity.userComments', {
							per_page:50,
										 page: i+1,
										 format: 'json'
										 }, listener);
					}
				} else {
					this.notupdate = true;
					var nbr_page = FETCH_PHOTOS/50;
					for(i=1;i <= nbr_page;i++) {
						var lastrsp = GM_getValue('lastrsp'+i);
						listener.flickr_activity_userComments_onLoad(true,'',lastrsp,'');
					}
				}
			
			}
		},

		parsePage: function(rsp) {
			var i = 0;
			for(i=0;i<rsp.items.item.length;i++) {
				var item = rsp.items.item[i];
				var photo_id = item.id;
				var user_id = item.owner;
				this.photo_blocks.push(item);
			}
			if(++this.fetched >= (FETCH_PHOTOS/50))
			this.ready();
		},

		getFavs: function(page) {
			if(this.contacts.length <= 0) {
				//Trick to do it using the flickr API with authentication already embeded in the page.
				var self = this;
				var listener = {
					flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
						try{
							var rsp = responseText.replace(/jsonFlickrApi\(/,'');
							rsp = eval('('+rsp);
							if(rsp.stat == 'ok') {
								self.process_favs(rsp);
							} else
							M8_log("ErrorFavs1 "+responseText);							
						} catch (e) {
							M8_log("ErrorFavs2 "+responseText);
							M8_log(e);
						}
					}
				};
				var the_page = page;
				if(page <= 0) the_page = 1;
				unsafeWindow.F.API.callMethod('flickr.favorites.getList', {per_page: 500,
																						 page:the_page,
																						 format: 'json'},
											  listener);
			} else
			this.doneGettingFavs();
			
		},

		process_favs: function(rsp) {
			var pages = rsp.photos.pages;
			if(this.favs_pages++ < pages)
			this.getFavs(rsp.photos.page+1);
			var i = 0;
			for(i=0;i<rsp.photos.photo.length;i++) {
				this.favs.push(rsp.photos.photo[i].id);
			}
			if(this.favs_pages >= pages)
			this.doneGettingFavs();
		},
		
		getContacts: function() {
			if(this.contacts.length <= 0) {
				//Trick to do it using the flickr API with authentication already embeded in the page.
				var self = this;
				var listener = {
					flickr_contacts_getList_onLoad: function(success, responseXML, responseText, params){
						self.process_contactsID(responseText);
					}
				};
				
				unsafeWindow.F.API.callMethod('flickr.contacts.getList', {}, listener);
			} else
				this.doneGettingContacts();
		},

		process_contactsID: function(req) {
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
					for each(contact in rsp..contact) {
						this.contacts.push(contact.@nsid+'');
						if(contact.@family == '1') {
							this.family.push(contact.@nsid+'');
						}
						if(contact.@friend == '1') {
							this.friend.push(contact.@nsid+'');
							this.friend.push(contact.@nsid+'');
						}
					}
					this.doneGettingContacts();
				}
			}
		},
		
		doneGettingContacts: function() {
			var photos = new Array();
			var userList;
			this.allA.setAttribute('style','');
			this.ignoreA.setAttribute('style','');
			
			this.contA.setAttribute('style','');
			this.frieA.setAttribute('style','');
			this.famA.setAttribute('style','');
			switch(this.type) {
				case CONTACTS:
					userList = this.contacts;
					this.contA.setAttribute('style','text-decoration:none;color:#FF0084;');
					break;
				case FRIENDS:
					userList = this.friend;
					this.frieA.setAttribute('style','text-decoration:none;color:#FF0084;');
					break;
				case FAMILY:
					userList = this.family;
					this.famA.setAttribute('style','text-decoration:none;color:#FF0084;');
					break;
			}
			for each(user in userList) {
					if(this.user_photos[user])
						photos = photos.concat(this.user_photos[user]);
				}
			this.updateDisplay(photos,false);
		},

		doneGettingFavs: function() {
			this.displayMain(FAVS);
		},

		makeTime: function(time,ago) {
			var diff = Date.now() - time;
			diff = diff/1000;
			if(diff < 365*24*3600) {
				if(diff > 30*24*3600) {
					return parseInt(diff/(30*24*3600))+" month(s)"+ago;
				} else if(diff > 7*24*3600) {
					return parseInt(diff/(7*24*3600))+" week(s)"+ago;
				} else if(diff > 24*3600) {
					return parseInt(diff/(24*3600))+" day(s)"+ago;
				} else if(diff>3600) {
					return parseInt(diff/3600)+" hour(s)"+ago;
				} else if(diff>60) {
					return parseInt(diff/60)+" minute(s)"+ago;
				} else return diff + "seconds"+ago;
			} else return "on the "+(new Date(time)).toLocaleDateString();
		},

		/*The activity api has a bug and always returns the user id instead of the owner,
		  so we have to cheat to get the info about the authors.*/
		getNameFor: function(id) {
			var self = this;
				var listener = {
						flickr_photos_getInfo_onLoad: function(success, responseXML, responseText, params){
							try{
								var rsp = responseText.replace(/jsonFlickrApi\(/,'');
								rsp = eval('('+rsp);
								if(rsp.stat == 'ok') {
									var person = rsp.photo.owner;
									var icon_link = document.createElement('a');
									icon_link.href = "/photos/"+person.nsid+"/";
									var img = document.getElementById("hover_img" +person.nsid);
									
									if(self.user_photos[person.nsid]) {
										self.user_photos[person.nsid].push(rsp.photo.id);
									} else {
										self.user_photos[person.nsid] = new Array(rsp.photo.id);
									}
									
									if(img) {
										var img2 = img.cloneNode(false);
										img2.setAttribute('id','');
										img2.setAttribute('class','');
										img2.setAttribute('width','24');
										img2.setAttribute('height','24');
										img2.addEventListener('mouseover',getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
										img2.addEventListener('mouseout',getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);
										icon_link.appendChild(img2);
									} else {
										icon_link.innerHTML = '>';
									}
									var html = 'From <a href="/photos/'+person.nsid+'"><b>'+person.username+'</b></a>';

									var who = document.evaluate("/html/body//td[@class='Who m8_Who"+rsp.photo.id+"']",                              
																document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
																).singleNodeValue;	
									if(who) {
										who.appendChild(icon_link);
										who.innerHTML += html;
									}
								} else
								M8_log("Error3 "+responseText);							
							} catch (e) {
								M8_log("Error4 "+responseText);
								M8_log(e);
							}
						}
					};
				unsafeWindow.F.API.callMethod('flickr.photos.getInfo', {
					photo_id:id,
								format: 'json'
								}, listener);
				
		},

		updateDisplay: function(photos,showingIgnore){ 
			var shown = 0;
			if(this.notupdate) this.table.innerHTML="<tr><td colspan='3'>This page cannot be updated more than once an hour due to restrictions from Flickr service. Next update will be possible after: "+this.makeTime(this.lastpoll*1,'')+"</td></tr>";
			else this.table.innerHTML = '';
			for(i=0;i<this.photo_blocks.length;i++){
				var photo_item = this.photo_blocks[i];
				if(showingIgnore || this.ignore.indexOf(photo_item.id) < 0) {
					if(!photos || photos.indexOf(photo_item.id) >= 0) {
						var timestamp = photo_item.activity.event[0].dateadded*1000;
						if(this.lastVisit == 0 || !this.sinceLastVisit || timestamp >= this.lastVisit) {
							var cnt = photo_item.more+photo_item.activity.event.length;
							if(!this.lessThanTen || cnt < 10) {
								var tdt = this.table.appendChild(document.createElement('tr'));
								tdt.setAttribute('valign','top');
								var tdo = tdt.appendChild(document.createElement('td'));
								tdo.setAttribute('class','Object');
								tdo.innerHTML = 
									'							<p><a href="/photo.gne?id='+photo_item.id+'/" style="position: relative;"><img width="75" height="75" alt="'+photo_item.title._content+'" src="http://static.flickr.com/'+photo_item.server+'/'+photo_item.id+'_'+photo_item.secret+'_s.jpg"/></a></p>'+
									'							<small>'+
									'									<b>'+photo_item.views+'</b> views<br/>'+
									((photo_item.faves>0)?
									 ('<a href="/photo.gne?id='+photo_item.id+'">'+photo_item.faves+' people</a> call this a favorite'):'')+
									'				</small>'+
									'				<img width="100" height="1" style="border: medium none ;" alt="" src="/images/spaceball.gif"/>	';
								var small = tdo.appendChild(document.createElement('small'));
								var sel = document.createElement('input');
								sel.id = 'ignore_'+photo_item.id;
								sel.type = 'checkbox';
								sel.checked = showingIgnore;
								var self = this;
								sel.addEventListener('click',function(evt) {
									var s = evt.target;
									var id = s.id.replace('ignore_','');
									if(s.checked) {
										s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode);
										
										self.addIgnore(id);
									} else {
										s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode);
										self.removeIgnore(id);
									}
								}, true);
								small.appendChild(sel);
								var lbl = small.appendChild(document.createElement('label'));
								lbl.innerHTML = 'ignore future comments here.';
								lbl.htmlFor = 'ignore_'+photo_item.id;
								
								var tdguts = tdt.appendChild(document.createElement('td'));
								tdguts.setAttribute('class','Guts');
								var html = 
									'				<table width="100%" cellspacing="0" cellpadding="0">'+
									'					<tbody><tr valign="bottom">'+
									'						<td>'+
									'							<h2>'+
									'								<a title="'+photo_item.title._content+'" style="text-decoration: none;" href="/photo.gne?id='+photo_item.id+'/">'+photo_item.title._content+'</a><br/>'+
									
									'							</h2>'+
									'								'+
									'								<div class="HowMany">'+
									'									  <a href="/photo.gne?id='+photo_item.id+'/">'+photo_item.comments+' comments</a>'+
									
									'										(<b>'+(photo_item.more+photo_item.activity.event.length-((photo_item.more==0)?1:0))+' new</b> since yours'+((photo_item.more>0)?' - Here\'s the latest 10':'')+')'+
									'									</div>'+
									'						</td>'+
									'						<td class="Who m8_Who'+photo_item.id+'">'+
									'						</td>'+
									'					</tr>'+
									'				</tbody></table>';
									

								tdguts.innerHTML += html;
								this.getNameFor(photo_item.id);
								var tab =  tdguts.appendChild(document.createElement('table'));
								tab.setAttribute('width',100);
								tab.setAttribute('cellspacing',0);
								tab.setAttribute('class',"NewComments");
								var bod = tab.appendChild(document.createElement('tbody'));

								for(j=0;j<photo_item.activity.event.length;j++) {
									var ev = photo_item.activity.event[j];
									var ligne = bod.appendChild(document.createElement('tr'));
									ligne.setAttribute('valign','top');
									
									var type = ligne.appendChild(document.createElement('td'));
									var type_img = type.appendChild(document.createElement('img'));
									type_img.src = '/images/icon_'+ev.type+'.gif';
									var icon = ligne.appendChild(document.createElement('td'));
									icon = icon.appendChild(document.createElement('a'));
									icon.href = "/photos/"+ev.user+"/";
									var img = document.getElementById("hover_img" +ev.user);
									if(img) {
										var img2 = img.cloneNode(false);
										img2.setAttribute('class','');
										img2.setAttribute('id','');
										img2.setAttribute('width','24');
										img2.setAttribute('height','24');
										img2.addEventListener('mouseover',getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
										img2.addEventListener('mouseout',getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);
										icon.appendChild(img2);
									}
									var html = '';
									if(ev.user == unsafeWindow.global_nsid) {
										//yours
										type.setAttribute('class',"YouSaidIcon");
										type_img.setAttribute('alt',"You added a new comment");
										ligne.innerHTML += '						<td class="YouSaid"><b>'+((ev.type=='comment')?'You said':"You added a note")+':</b><br/>'+ev._content.replace(/\n/g,'<br/>')+'</td>'+
											'						<td class="YouSaid"><small>Added '+this.makeTime(ev.dateadded*1000,' ago')+'</small></td>';
									}else {
										type.setAttribute('class',"YouSaidIcon");
										type_img.setAttribute('alt',ev.username+' added a new '+ev.type);
										ligne.innerHTML += '						<td><b><a href="/photos/'+ev.user+'/">'+ev.username+'</a>'+((ev.type=='comment')?' says':" added a note")+':</b><br/>'+ev._content.replace(/\n/g,'<br/>')+'</td>'+
											'						<td><small>Added '+this.makeTime(ev.dateadded*1000,' ago')+'</small></td>';
									}
								}
								shown++;
							}
						}
					}
				}
				
			}
			if(shown == 0) {
				this.table.innerHTML = "<tr><td><strong>Nothing to see here</strong></td></tr>";
			}
		},
		
		addIgnore: function(id) {
			this.ignore.push(id+'');
			GM_setValue('ignoreComments',this.ignore.join(','));
		},

		removeIgnore: function(id) {			
			this.ignore.splice(this.ignore.indexOf(id+''),1);
			GM_setValue('ignoreComments',this.ignore.join(','));
		},

		displayLessThanTen: function() {
			this.lessThanTen = true;	
			this.displayMain(this.type);
		},

		displayMoreThanTen: function() {
			this.lessThanTen = false;	
			this.displayMain(this.type);
		},

		displayMain: function(type) {
			if(type >= 0) this.type = type;
			this.table.innerHTML = '<tr><td><img src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /></td></tr>';
			this.contA.setAttribute('style','');
			this.frieA.setAttribute('style','');
			this.famA.setAttribute('style','');
			switch(this.type) {
				case ALL:
					this.allA.setAttribute('style','text-decoration:none;color:#FF0084;');
					this.ignoreA.setAttribute('style','');
					this.favsA.setAttribute('style','');
					this.updateDisplay(false,false);
					break;
				case IGNORED:
					this.ignoreA.setAttribute('style','text-decoration:none;color:#FF0084;');
					this.allA.setAttribute('style','');
					this.favsA.setAttribute('style','');
					this.updateDisplay(this.ignore,true);
					break;
				case FAVS:
					this.favsA.setAttribute('style','text-decoration:none;color:#FF0084;');
					this.allA.setAttribute('style','');
					this.ignoreA.setAttribute('style','');
					this.updateDisplay(this.favs,false);
					break;
				default:
					this.displayOnlyContacts(this.type);
			}
		},

		displayOnlyContacts: function(type) {			
			this.table.innerHTML = '<tr><td><img src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /></td></tr>';
			this.type = type;
			this.getContacts();
 		},

		displayOnlyFavs: function() {			
			this.table.innerHTML = '<tr><td><img src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /></td></tr>';
			this.favsA.setAttribute('style','text-decoration:none;color:#FF0084;');
			this.allA.setAttribute('style','');
			this.ignoreA.setAttribute('style','');
			this.type = FAVS;
			this.getFavs(1);
 		},

		separator: function() {
			var img = document.createElement('img');
			img.setAttribute('style',"float:none;margin: 0 2;");
			img.width="1";
			img.height="9";
			img.src="http://www.flickr.com/images/subnavi_dots.gif";
			return img;
		},

		ready: function() {
			this.fetched = 0;
			var div = this.table.parentNode.parentNode.insertBefore(document.createElement('div'),this.table.parentNode);
			if(this.faulty_pages.length > 0) {
				var h31=document.createElement('strong');
				h31.setAttribute('style','color:red;font-size:85%;clear:left;');
				var txt1=document.createTextNode('These pages couldn\'t be read:');
				h31.appendChild(txt1);
				var ul1=document.createElement('UL');
				ul1.setAttribute('style','margin:0;padding:0;display:inline;');
				for(fi=0;fi<this.faulty_pages.length;fi++){
					var li1=document.createElement('LI');
					li1.setAttribute('style','margin:0;padding:0;display: inline;list-style-type: none;');
					ul1.appendChild(li1);
					var a1=document.createElement('A');
					a1.setAttribute('href','http://www.flickr.com/photos_comments.gne?page='+this.faulty_pages[fi]);
					li1.appendChild(a1);
					var txt1=document.createTextNode('Page '+this.faulty_pages[fi]);
					a1.appendChild(txt1);
				}
				div.appendChild(h31);
				div.appendChild(ul1);
				div.appendChild(document.createElement('br'));
			}

			var since = document.createElement('input');
			since.type = 'checkbox';
			since.id = 'sinceLastVisit';
			var self = this;
			since.checked = this.sinceLastVisit;
			since.addEventListener('click',function() {
					if(since.checked) {
						self.sinceLastVisit = true;
					} else {
						self.sinceLastVisit = false;
					}
					GM_setValue('lastVisit',Date.now()+','+self.sinceLastVisit);
					self.displayMain(self.type);
				},true);
			div.appendChild(since);
			var lblsince = div.appendChild(document.createElement('label'));
			lblsince.setAttribute('style','font-size:90%;');
			lblsince.innerHTML = 'since last visit.';
			lblsince.htmlFor = 'sinceLastVisit';

			var h3 = div.appendChild(document.createElement('h3'));
			h3.innerHTML = 'On Photos by:';
			this.allA = div.appendChild(document.createElement('a'));
			this.allA.innerHTML = 'All';
			this.allA.href="javascript:;";
			this.allA.addEventListener('click',getObjectMethodClosure0(this,'displayMain',ALL),true);
			div.appendChild(this.separator());
			this.contA = div.appendChild(document.createElement('a'));
			this.contA.innerHTML = 'Contacts';
			this.contA.href="javascript:;";
			this.contA.addEventListener('click',getObjectMethodClosure0(this,'displayOnlyContacts',CONTACTS),true);
			div.appendChild(this.separator());
			this.frieA = div.appendChild(document.createElement('a'));
			this.frieA.innerHTML = 'Friends';
			this.frieA.href="javascript:;";
			this.frieA.addEventListener('click',getObjectMethodClosure0(this,'displayOnlyContacts',FRIENDS),true);
			div.appendChild(this.separator());
			this.famA = div.appendChild(document.createElement('a'));
			this.famA.innerHTML = 'Family';
			this.famA.href="javascript:;";
			this.famA.addEventListener('click',getObjectMethodClosure0(this,'displayOnlyContacts',FAMILY),true);
			div.appendChild(this.separator());
			this.favsA = div.appendChild(document.createElement('a'));
			this.favsA.innerHTML = 'Favorites';
			this.favsA.href="javascript:;";
			this.favsA.addEventListener('click',getObjectMethodClosure(this,'displayOnlyFavs'),true);
			div.appendChild(this.separator());
			this.ignoreA = div.appendChild(document.createElement('a'));
			this.ignoreA.innerHTML = 'Ignored';
			this.ignoreA.href="javascript:;";
			this.ignoreA.addEventListener('click',getObjectMethodClosure0(this,'displayMain',IGNORED),true);
			div.appendChild(this.separator());
			div.appendChild(document.createElement('br'));
			var check = document.createElement('input');
			check.type = 'checkbox';
			check.id = 'lessthanten';
			var self = this;
			check.addEventListener('click',function() {
					if(check.checked) self.displayLessThanTen();
					else self.displayMoreThanTen();
				},true);
			div.appendChild(check);
			var lbl = div.appendChild(document.createElement('label'));
			lbl.setAttribute('style','font-size:90%;');
			lbl.innerHTML = 'with less than 10 answers since yours';
			lbl.htmlFor = 'lessthanten';


			this.displayMain(ALL);
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
									
									var flickrgp = new flickrfollowcomments();
		}, false);
	} catch (ex) {}
})();
