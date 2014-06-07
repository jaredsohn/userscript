// ==UserScript==
// @name	Flickr Buddy Interesting
// @namespace	http://6v8.gamboni.org/
// @description Quick access to user's interesting photos from the Buddy Icon Menu
// @version        0.5
// @identifier	http://6v8.gamboni.org/IMG/js/flickrbuddyinteresting.user.js
// @date           2009-04-17
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @contributor    Stephen Fernandez ( http://steeev.freehostia.com )
// @contributor    Ricardo Mendonca Ferreira
// @include http://*flickr.com*
// @exclude http://*flickr.com/groups/
// @exclude http://*flickr.com/groups
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
		name: "Flickr Buddy Interesting",
		namespace: "http://6v8.gamboni.org/",
		description: "Quick access to user's interesting photos from the Buddy Icon Menu",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrbuddyinteresting.user.js",
		version: "0.5",								// version
		date: (new Date("2009-04-17"))		// update date
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


	var localiser =  new FlickrLocaliser({
			'en-us' : {
				'pool_interesting' : 'Pool Interestingness',
				'quick_interesting' : 'Quick Interestingness',
				'close' : 'Close'
			},
			'fr-fr' : {
				'pool_interesting' : 'Interestingness du Groupe',
				'quick_interesting' : 'Interestingness Rapide',
				'close' : 'Fermer'
			},
			'it-it' : {
				'pool_interesting' : 'Interestingness del Gruppo',
				'quick_interesting' : 'Interestingness Rapida',
				'close' : 'Chiudi'
			},
			defaultLang: 'en-us'
		});

	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	/*
	  Xpath trickery, from:
	  http://ecmanaut.blogspot.com/2006/07/expressive-user-scripts-with-xpath-and.html
	*/
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}


	function foreach( xpath, cb, root )
	{
		var nodes = $x( xpath, root ), e = 0;
		for( var i=0; i<nodes.length; i++ )
			e += cb( nodes[i], i ) || 0;
		return e;
	}



	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg);
		}
	}

	/*
	  LightWeightBox - Thom Shannon
	  http://www.ts0.com
	  V 1.0 2006
	  BSD License
	*/

	var LightWeightBoxOn=false;
	var LightWeightBox = function(ele){
		this.ele = ele;
		this.backgroundColor = '#CCC';
		this.opacity = 0.5;
	}
	with (LightWeightBox){
		prototype.Render = function(){
			if (!LightWeightBoxOn){
				bgDiv = document.createElement('div');
				bgDiv.innerHTML = ''
				bgDiv.style.backgroundColor = this.backgroundColor;
				bgDiv.style.position='fixed';
				bgDiv.style.height='100%';
				bgDiv.style.width='100%';
				bgDiv.style.top=0;
				bgDiv.style.left='0';
				bgDiv.style.opacity=this.opacity;
				this.ele.style.position='fixed';
				this.bgDiv=bgDiv;
				document.body.appendChild(this.bgDiv);
				document.body.appendChild(this.ele);
				this.CheckSize();
				LightWeightBoxOn = true;
				var oSelf=this;
				this.sizeCheck = setInterval(function(){oSelf.CheckSize();},20);
			}
		}
		prototype.CheckSize = function(){
			if (this.ele.offsetHeight!=this.currentHeight) {
				this.offsetTop = (self.innerHeight/2)-(this.ele.offsetHeight/2);
				this.ele.style.top = this.offsetTop+'px';
				this.currentHeight=this.ele.offsetHeight;
			}
			if (this.ele.offsetWidth!=this.currentWidth) {
				this.offsetLeft = (self.innerWidth/2)-(this.ele.offsetWidth/2);
				this.ele.style.left = this.offsetLeft+'px';
				this.currentWidth=this.ele.offsetWidth;
			}
		}

		prototype.Close=function(oSelf){
			document.body.removeChild(oSelf.bgDiv);
			document.body.removeChild(oSelf.ele);
			LightWeightBoxOn = false;
		}
	}



	var flickrbuddyinteresting = function() {this.init();}

	flickrbuddyinteresting.prototype = {
		init: function() {
			var menu = document.getElementById('personmenu_contacts_link');
			if(menu) {
				var link =document.createElement('a');
				link.setAttribute('class','block');
				link.setAttribute('id','tag_person_link');
				link.setAttribute('href','javascript:;');
				link.addEventListener('click',getObjectMethodClosure(this,'showInteresting'),true);
				link.textContent=localiser.localise('quick_interesting');

				menu.parentNode.insertBefore(link,menu.nextSibling);
			}

 			if(document.location.href.match(/\/groups\//) && unsafeWindow.document.getElementById('SubNav')) {
				psi=$x1('//p[@class="LinksNewP"]');
				psi.innerHTML+=' <img src="/images/subnavi_dots.gif" alt="" height="11" width="1"> ';
				var link =document.createElement('a');
				link.setAttribute('class','block');;
				link.setAttribute('href','javascript:;');
				link.addEventListener('click',getObjectMethodClosure(this,'showInteresting'),true);
				link.textContent=localiser.localise('pool_interesting');
				psi.appendChild(link);

			}

		},

		showInteresting: function(ev) {
			// create a block element of some kind
			var boxEle = document.createElement('div');
			var ul = boxEle.appendChild(document.createElement('ul'));
			// style it up with a class or inline
			boxEle.className = 'popup';
			// create something to act as a close button
			btnClose = document.createElement('a');
			btnClose.href='javascript:;';
			btnClose.innerHTML=localiser.localise('close');
			// add close button to block element
			boxEle.appendChild(btnClose);
			// create box with block element
			var lwBox = new LightWeightBox(boxEle);
			// optional bg color and opacity
			boxEle.style.paddingTop= '20px';
			boxEle.style.width= (75*5+20)+'px';
			boxEle.style.height= (75*5+40)+'px';
			boxEle.style.backgroundColor = '#333';
			// attach close event and add your own code
			btnClose.addEventListener('click',function(){
					// you have to pass box object into event
					// because of the js event scoping
					lwBox.Close(lwBox);
					// false to cancel link
					return false;
				},true);
			btnClose.setAttribute('style','background-color:#CCC;');

			ul.setAttribute('style','margin:0;padding:0;list-style-type:none;');
			var self = this;
			var listener = {
				flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
					try{
						var rsp = responseText.replace(/jsonFlickrApi\(/,'');
						rsp = eval('('+rsp);
						if(rsp.stat == 'ok') {
							var i=0;
							var html = '';
							for(i=0;i<rsp.photos.photo.length;i++) {
								var photo = rsp.photos.photo[i];
								html += '<li style="margin:0;padding:0;display:inline;"><a href="http://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'/"><img title="&quot;' + photo.title + '&quot; by ' +  photo.ownername + '" src="http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg" width="75" height="75"/></a></li>';
							}
							ul.innerHTML = html;
							// render it!
							lwBox.Render();
						} else
							M8_log("Error2 "+responseText);
					} catch (e) {
						M8_log("Error1 "+responseText);
						M8_log(e);
					}
				}
			};

			var block = ev.target.parentNode;
			var matches = /mail\/write\/\?to=([^"]*)"/.exec(block.innerHTML);
													 if(matches)
														 unsafeWindow.F.API.callMethod('flickr.photos.search', {
																 user_id: matches[1], sort: 'interestingness-desc', page:1, per_page: 25,
																	 format: 'json', extras: 'owner_name'
																	 }, listener);

													 if(ev.target.textContent==localiser.localise('pool_interesting')) {
														 thegroupid=unsafeWindow.document.getElementById('SubNav').innerHTML.split('\/buddyicons\/')[1].split('\.jpg')[0];
														 unsafeWindow.F.API.callMethod('flickr.photos.search', {
																 group_id: thegroupid , sort: 'interestingness-desc', page:1, per_page: 25,
																	 format: 'json', extras: 'owner_name'
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

						var flickrgp = new flickrbuddyinteresting();
					}, false);
			} catch (ex) {}
		})();
