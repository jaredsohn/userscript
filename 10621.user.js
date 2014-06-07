// ==UserScript==
// @name	Flickr Easy NSID
// @namespace	http://6v8.gamboni.org/
// @description Easily find your and other users NSID on flickr
// @version        0.2
// @identifier	http://6v8.gamboni.org/IMG/js/flickreasynsid.user.js
// @date           2007-07-12
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://flickr.com*
// @include http://www.flickr.com*
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
		name: "Flickr Easy NSID",
		namespace: "http://6v8.gamboni.org/",
		description: "Easily find your and other users NSID on flickr",
		identifier: "http://6v8.gamboni.org/IMG/js/flickreasynsid.user.js",
		version: "0.2",								// version
		date: (new Date("2007-07-12"))		// update date
		.valueOf()
	};
	
	
	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
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


	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}

	function foreach( xpath, cb, root )
	{
		var nodes = $x( xpath, root ), e = 0;
		for( var i=0; i<nodes.length; i++ )
			e += cb( nodes[i], i ) || 0;
		return e;
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


	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
	}
	function getObjectMethodClosure1(object, method, arg) {
		return function() {
			return object[method](arg); 
		}
	}


	var flickreasynsid = function() {this.init();}

	flickreasynsid.prototype = {
		mapper: new FlickrLocaliser({
				'en-us' : {
					'FlickrMail' : 'FlickrMail',
				},
				'fr-fr' : {
					'FlickrMail' : 'FlickrMail',
				},
				'it-it' : {
					'FlickrMail' : 'FlickrMail',
				},
				'de-de' : {
					'FlickrMail' : 'FlickrMail',
				},
				'es-us' : {
					'FlickrMail' : 'Flickrcorreo',
				},
				'pt-br' : {
					'FlickrMail' : 'E-mail do Flickr',
				},
				'ko-kr' : {
					'FlickrMail' : 'FlickrMail',
				},
				'zh-hk' : {
					'FlickrMail' : 'FlickrMail',
				},
				defaultLang: 'en-us'
			}),

		init: function() {
			var menu = document.getElementById('personmenu_contacts_link');
			if(menu) {
				var link =document.createElement('a');
				link.setAttribute('class','block');
				link.setAttribute('id','tag_person_link');
				link.setAttribute('href','javascript:;');
				link.addEventListener('click',getObjectMethodClosure(this,'showNSIDBuddy'),true);
				link.textContent='NSID?';
				
				menu.parentNode.insertBefore(link,menu.nextSibling);
			}
			this.insertItem(getObjectMethodClosure1(this,'displayNSID',unsafeWindow.global_nsid),'candy_nav_menu_you','Your Profile',"NSID?",false,false);

			if(document.location.pathname.indexOf('groups') >= 0) {
				var links = $x1("//table[@id='SubNav']/tbody/tr/td[@class='Section']/p");
				if(links) {
					var a = links.getElementsByTagName('a');
					var id;
					for(var i=0;i<a.length;i++) {
						if(a[i].href.indexOf('?id=') >= 0) {
							id = a[i].href.split('?id=')[1];
							break;
						} 
					}
					var img = links.appendChild(document.createElement('img'));
					img.width="1";
					img.height="11";
					img.src="/images/subnavi_dots.gif";
					img.alt="";
					var a = links.appendChild(document.createElement('a'));
					a.href="javascript:;";
					a.addEventListener('click',getObjectMethodClosure1(this,"displayNSID",id),false);
					a.textContent="NSID?";
				}
			}
		},
		displayNSID: function(nsid) {
			// create a block element of some kind
			var boxEle = document.createElement('div');
			// style it up with a class or inline
			boxEle.className = 'popup';
			// create something to act as a close button
			btnClose = document.createElement('a');
			btnClose.href='javascript:;';
			btnClose.innerHTML='<img style="margin: 0; padding: 0; border:0px !important; vertical-align: top;" src="http://flickr.com/images/window_close_grey.gif" alt="close"/>';
			btnClose.title = "close";
			
			// add close button to block element
			boxEle.appendChild(btnClose);
			// create box with block element
			var lwBox = new LightWeightBox(boxEle);
			// optional bg color and opacity
			boxEle.style.paddingTop= '10px';
			boxEle.style.width= '350px';
			boxEle.style.paddingBottom = '10px';
			boxEle.style.backgroundColor = '#fff';
			boxEle.style.border = '1px solid black';
			// attach close event and add your own code
			btnClose.addEventListener('click',function(){
				// you have to pass box object into event
				// because of the js event scoping
				lwBox.Close(lwBox);
				// false to cancel link
				return false;
			},true);
			btnClose.setAttribute('style','float:right;margin-bottom:10px;margin-right:5px;');
			
			var title = boxEle.appendChild(document.createElement('div'));
			title.setAttribute('style',"padding:12px;background-color: #EEEEEE;clear:both;font-size: 14px;margin-bottom:10px");
			title.innerHTML = '<h3 style="margin:0;">NSID:</h3>';
			
			dial = boxEle.appendChild(document.createElement('textarea'));
			dial.textContent = nsid;
			dial.setAttribute('style',"clear:both; width:70%;overflow:auto;margin-left:15%;");
			lwBox.Render();
		},
		
		//insert a new menu item in on of the main menus
		// href the link on that element or a javascript function to call
		// menu is the id of the main menu where to insert the new menu item (e.g. 'candy_nav_menu_you')
		// item is the item "title" before which to insert the new menu item (or to replacE) (e.g. 'Your Sets')
		// title is the title of your new item
		// replace is a boolean to know if we replace 'item' or just add a new one
		//
		//returns: the a element created
		insertItem: function(href,menu,item,title,replace,line_above) {

			var menu_you = document.getElementById(menu);
			var you_a = menu_you.getElementsByTagName('a');
			var your_set = '';	
			item = this.mapper.localise(item);
			for(var i=0;i<you_a.length;i++) {
				if( you_a[i].innerHTML == item ) {
					your_set = you_a[i];
					break;
				}
			}

			if(!your_set) {
				GM_log('impossible to find insertion point');
				return;
			}

			var batch = document.createElement('a');
			if(typeof(href) == "function") {
				batch.addEventListener("click",href,true);
				batch.href = 'javascript:;';
			} else
			  batch.href = href;
			batch.innerHTML = title;
			if(line_above) batch.className = "menu_item_line_above";
			your_set.parentNode.insertBefore(batch, your_set);		
			if(replace) your_set.parentNode.removeChild(your_set);
			
			return batch;			
		},
		showNSIDBuddy: function(ev) {
			var block = ev.target.parentNode;
			var matches = /messages_write\.gne\?to=([^"]*)"/.exec(block.innerHTML);
			if(matches) {
				this.displayNSID(matches[1]);
			}
													 },
												
	}

	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
									try {
										
										// update automatically (http://userscripts.org/scripts/show/2296)
										win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {} 
									
									var flickrgp = new flickreasynsid();
		}, false);
	} catch (ex) {}
})();
