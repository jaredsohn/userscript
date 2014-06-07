// ==UserScript==
// @name	Flickr New Contat More Links
// @namespace	http://6v8.gamboni.org/
// @description When reading a Flickr Mail about someone adding you as contact, this script inserts more links and info about this user.
// @version        0.6
// @identifier	http://6v8.gamboni.org/IMG/js/flickrnewcontactmorelinks.user.js
// @date           2007-06-26
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/messages_read.gne*
// 
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
		name: "Flickr New Contat More Links",
		namespace: "http://6v8.gamboni.org/",
		description: "When reading a Flickr Mail about someone adding you as contact, this script inserts more links and info about this user.",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrnewcontactmorelinks.user.js",
		version: "0.6",								// version
		date: (new Date("2007-05-26"))		// update date
		.valueOf()
	};

	
	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}


	/***********************************************************************
	 * Flickr Localisation
	 **********************************************************************/

	var FlickrLocaliser = function(locals) {
		this.init(locals);
	}
	FlickrLocaliser.prototype = {
		selectedLang: undefined,
		localisations: undefined,
		getLanguage: function() {
			if(!this.selectedLang) {
				var langA = $x1("//p[@class='LanguageSelector']//a[contains(@class,'selected')]");
				if(langA) {
					var matches = /\/change_language.gne\?lang=([^&]+)&.*/.exec(langA.href);
					if(matches && matches[1]) {
						this.selectedLang = matches[1];
						return this.selectedLang;
					}
				}
				return false;
			} else return this.selectedLang;
		},

		init: function(locals) {
			this.localisations = locals;
		},

		localise: function(string, params) {
			if(this.localisations && this.getLanguage()) {
				var currentLang = this.localisations[this.selectedLang];
				if(!currentLang) currentLang = this.localisations[this.localisations.defaultLang];
				var local = currentLang[string];
				if(!local) {
					local = this.localisations[this.localisations.defaultLang][string];
				} 
				if(!local) return string;
				for(arg in params) {
					var rep = new RegExp('@'+arg+'@','g');
					local = local.replace(rep,params[arg]);
				}
				local =local.replace(/@[^@]+@/g,'');
				return local;
			} else return undefined;
		}

	}

	/*****************************Flickr Localisation**********************/

	
	
	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
	}

	var flickrnewcontactmorelinks = function() {this.init();}

	flickrnewcontactmorelinks.prototype = {
		localiser: new FlickrLocaliser({
				'en-us' : {
					'scout' : "And Flickr's Explore photos here",
					'inspector' : 'And Flickr DNA here',
					'interesting' : 'Here are the most interestings',
					'latest' : 'Recent Photos',
					'about_group' : 'About this group'
				},
				'it-it' : {
					'latest' : 'Foto recenti',
					'about_group' : 'Su questo gruppo'
				},
				'fr-fr' : {
					'scout' : "Et ses photos sur l'Explorer",
					'inspector' : 'Et sa page Flickr DNA',
					'interesting' : 'Voici ses photos les plus "int&egrave;ressante"',
					'latest' : 'Derni&egrave;res photos',
					'about_group' : 'A propos de ce groupe'
				},
				'es-us' : {
					'latest' : 'Fotos recientes'
				},
				'de-de' : {
					'latest' : 'Neueste Fotos'
				},
				'pt-br' : {
					'latest' : 'Fotos recentes'
				},
				'ko-kr' : {
					'latest' : '&#52572;&#44540; &#49324;&#51652;'
				},
				'zh-hk' : {
					'latest' : '&#26368;&#26032;&#30340;&#30456;&#29255;'
				},
				defaultLang: 'en-us'
			}),
		message: $x1("/html/body/div[@id='Main']/div/table/tbody/tr[3]/td[2]/p"),
		title: $x1("/html/body/div[@id='Main']/div/table/tbody/tr[2]/td/h3"),
		init: function() {
			var matches = /http:\/\/(www.)?flickr.com\/people\/([^\/]+)\//.exec(this.message.textContent);		

			if(this.title && this.message && matches) {
				if(matches[1].indexOf('@') > 0) {
					self.displayMoreContact(matches[1]);					
				} else {
					var self = this;
					var listener = {
						flickr_urls_lookupUser_onLoad: function(success, responseXML, responseText, params){
							try{
								var rsp = responseText.replace(/jsonFlickrApi\(/,'');
								rsp = eval('('+rsp);
								if(rsp.stat == 'ok') {
									self.displayMoreContact(rsp.user.id);
								} else
									M8_log("Error5 "+responseText);							
							} catch (e) {
								M8_log("Error6 "+responseText);
								M8_log(e);
							}
						}
					};
					unsafeWindow.F.API.callMethod('flickr.urls.lookupUser', {
							url: 'http://www.flickr.com/photos/'+matches[2],
								format: 'json'
								}, listener);
				}
				
			} else	if(this.title && this.message && (matches = /href="(http:\/\/(www.)?flickr.com\/groups\/[^\/]+\/)"/.exec(this.message.innerHTML))) {
				var link = $x1("/html/body/div[@id='Main']/div/table/tbody/tr[3]/td[2]/p[1]/a");
				if(link) {
					var self = this;
					var listener = {
						flickr_urls_lookupGroup_onLoad: function(success, responseXML, responseText, params){
							try{
								var rsp = responseText.replace(/jsonFlickrApi\(/,'');
								rsp = eval('('+rsp);
								if(rsp.stat == 'ok') {
									var listener2 = {
										flickr_groups_getInfo_onLoad: function(success, responseXML, responseText, params){
											try{
												var rsp = responseText.replace(/jsonFlickrApi\(/,'');
												rsp = eval('('+rsp);
												if(rsp.stat == 'ok')
												self.displayMoreGroup(rsp);
												else
												M8_log("Error8 "+responseText);							
											} catch (e) {
												M8_log("Error7 "+responseText);
												M8_log(e);
											}
										}
									};
				
									unsafeWindow.F.API.callMethod('flickr.groups.getInfo', {
										group_id: rsp.group.id,
													  format: 'json'
													  }, listener2);
								} else
								M8_log("Error5 "+responseText);							
							} catch (e) {
								M8_log("Error6 "+responseText);
								M8_log(e);
							}
						}
					};
					unsafeWindow.F.API.callMethod('flickr.urls.lookupGroup', {
						url: matches[1],
									  format: 'json'
									  }, listener);
				}
			} 
		},
		displayMoreContact: function(user_id) {
			if(this.message) {
				this.user_id=user_id;
				var newNode = this.message.insertBefore(document.createElement('span'),this.message.lastChild);
				var scout = "http://bighugelabs.com/flickr/scout.php?username="+encodeURIComponent(user_id);
				var inspect = "http://bighugelabs.com/flickr/dna.php?username="+encodeURIComponent(user_id);
				html = this.localiser.localise('scout')+":<br/>"+
					scout.link(scout)+'<br/>'+
				this.localiser.localise('inspector')+":<br/>"+
					inspect.link(inspect)+'<br/>'+'<br/>';
				newNode.innerHTML = html;
				var self = this;
				var listener = {
					flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
						try{
							var rsp = responseText.replace(/jsonFlickrApi\(/,'');
							rsp = eval('('+rsp);
							if(rsp.stat == 'ok') {
								var div = self.message.parentNode.insertBefore(document.createElement('div'),self.message.nextSibling);
								div.setAttribute("style","margin-top:1em;");
								div.innerHTML = "<h3>"+self.localiser.localise('interesting')+"</h3>"
							self.showPhotos(rsp,div);
							}
							else
							M8_log("Error3 "+responseText);							
						} catch (e) {
							M8_log("Error4 "+responseText);
							M8_log(e);
						}
					}
				};
				
				unsafeWindow.F.API.callMethod('flickr.photos.search', {
					user_id: user_id,
								 per_page: 20,
								 sort: 'interestingness-desc',
								 extras: 'icon_server',
								  format: 'json'
								  }, listener);
			}
		},
		showPhotos: function(photos,block) {
			var i;
			var div = block.appendChild(document.createElement('div'));
			div.setAttribute('style','width:400px;');
			for(i=0;i<photos.photos.photo.length;i++) {
				var photo = photos.photos.photo[i];
				var img = '<a href="http://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'/"><img src="http://static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg" alt="'+photo.title+'"/></a>';
				div.innerHTML += img;

				if(i == 0 && photo.iconserver) {
					this.createUserIcon(photo.iconserver);
				}

			}
		},
		createUserIcon: function(server) {
			var a = this.title.appendChild(document.createElement('a'));
			a.href= '/photos/'+this.user_id+'/';
			var img = a.appendChild(document.createElement('img'));
			img.width = img.height = 48;
			img.setAttribute('style','margin-left:1em;');
			img.src= ((server>0)?'http://static.flickr.com/'+server+'/buddyicons/'+this.user_id+'.jpg':'http://www.flickr.com/images/buddyicon.jpg');
			img.className="FriendBuddyIcon";
			img.id = "FriendBuddyIcon"+this.user_id;
			img.nsid = this.user_id;
			img.addEventListener('mouseover',getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
			img.addEventListener('mouseout',getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);
			var img2 = unsafeWindow.document.getElementById('FriendBuddyIcon'+this.user_id);
			img2.nsid = this.user_id;
			var id = "hover_img" + this.user_id;
			if (!document.getElementById(id)) {
				var new_img = document.createElement("IMG");
				new_img.id = id;
				new_img.nsid = this.user_id;
				new_img.src = img.src;
				new_img.className = "person_hover_img";
				unsafeWindow.document.getElementById("person_hover_link").appendChild(new_img);
				var new_img2 =  unsafeWindow.document.getElementById(id);
				new_img2.nsid = this.user_id;
			}
		},
		displayMoreGroup: function(info) {		
			var tr1 = $x1("/html/body/div[@id='Main']/div/table/tbody/tr[3]");
			if(tr1) {
				var tr2 = tr1.parentNode.insertBefore(document.createElement('tr'),tr1.nextSibling);
				tr2.setAttribute("style","border-top: 1px solid black;");
				tr2.innerHTML = '<td><h3>'+this.localiser.localise('about_group')+':</h3></td><td><p style="overflow: auto; max-height: 500px; width: 600px; border-top:1px solid #FF0084;padding-top:10px; border-bottom:1px solid #FF0084;padding-bottom:10px">'+info.group.description._content.replace(/\n/g,"<br/>")+"</p></td>";
				var self = this;
				var listener = {
					flickr_groups_pools_getPhotos_onLoad: function(success, responseXML, responseText, params){
						try{
							var rsp = responseText.replace(/jsonFlickrApi\(/,'');
							rsp = eval('('+rsp);
							if(rsp.stat == 'ok') {
								var tr3 = tr2.parentNode.insertBefore(document.createElement('tr'),tr2.nextSibling);
								tr3.innerHTML = "<td><h3>"+self.localiser.localise('latest')+"</h3></td>";
								var td = tr3.appendChild(document.createElement('td'));
								self.showPhotos(rsp,td);
							} else
							M8_log("Error3 "+responseText);							
						} catch (e) {
							M8_log("Error4 "+responseText);
							M8_log(e);
						}
					}
				};
				
				unsafeWindow.F.API.callMethod('flickr.groups.pools.getPhotos', {
					group_id: info.group.id,
								 per_page: 20,
								  format: 'json'
								  }, listener);
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
									
									var flickrgp = new flickrnewcontactmorelinks();
		}, false);
	} catch (ex) {}
})();
