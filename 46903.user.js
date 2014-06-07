// ==UserScript==
// @name	Flickr Check Buddy Activity
// @namespace	http://6v8.gamboni.org/
// @description Check when a particular user commented/faved a photo of your for the last time
// @version        0.6
// @identifier	http://6v8.gamboni.org/IMG/js/flickrcheckbuddyactivity.user.js
// @date           2009-04-17
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://www.flickr.com*
// @include http://flickr.com*
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
// Copyright (C) 2007 Pierre Andrews
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
		name: "Flickr Check Buddy Activity",
		namespace: "http://6v8.gamboni.org/",
		description: "Check when a particular user commented/faved a photo of your for the last time",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrcheckbuddyactivity.user.js",
		version: "0.6",								// version
		date: (new Date("2009-04-17"))		// update date
		.valueOf()
	};
	
	
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



	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
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
				var toRet = local;
				while(matches = /@([^@]+)@/g.exec(local)) {
					if(matches[1]) {
						var arg = matches[1];
						var rep = new RegExp('@'+arg+'@','g');
						if(params[arg])
							toRet = toRet.replace(rep,params[arg]);
						else
							toRet = toRet.replace(rep,'');
					}
				}
				return toRet;
			} else return undefined;
		}

	}

	/*****************************Flickr Localisation**********************/

	

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



	var flickrcheckbuddyactivity = function() {this.init();}
	
	flickrcheckbuddyactivity.prototype = {
		localiser: new FlickrLocaliser({
			'en-us' : {
				'check_activity' : 'Check Buddy Activity',
					'close' : 'Close',
					'no_activity' : "no activity in the last @timeframe@.",
					'31d' : 'month',
					'comment' : '@username@ commented @photo@ on the @date@.',
					'fave' : '@username@ faved @photo@ on the @date@.',
					'tag' : '@username@ tagged @photo@ on the @date@.',
					'note' : '@username@ added a note to @photo@ on the @date@.',
					'activity_title' : 'Last Activity',
					'please_wait' : 'Please Wait',
					'menu_item' : 'CheckBuddyActivity: Set the timeframe',
					'prompt_timeframe' : 'What timeframe should the script check (enter value in hours (e.g. 24h) or days (e.g. 31d).',
					'additional_count' : 'During this @timeframe@, this user left: @comment_cnt@ comment(s), @fave_link@ , @tag_cnt@ tag(s) and @note_cnt@ note(s).',
					'fave_cnt' : '@fave_cnt@ favorite(s)',
					'tag_note_cnt' : 'During this @timeframe@, @username@ left @tag_cnt@ tag(s) and @note_cnt@ note(s).',
					'tag_cnt' : 'During this @timeframe@, @username@ left @tag_cnt@ tag(s).',
					'note_cnt' : 'During this @timeframe@, @username@ left @tag_cnt@ tag(s).',
					},
				'fr-fr': {
					// 3
					'31d' : 'moi',
						// A
						'activity_title' : 'Derni&egrave;re Activit&eacute;',
						'additional_count' : 'Pendant ce @timeframe@,cet utilisateur a laiss&eacute;: @comment_cnt@ commentaire(s), @fave_link@ , @tag_cnt@ tag(s) et @note_cnt@ note(s).',
						// C
						'check_activity' : 'Verrifier l\'Activit&eacute;',
						'close' : 'Fermer',
						'comment' : '@username@ a comment&eacute; @photo@ le @date@',
						// F
						'fave' : '@username@ a ajout&eacute; @photo@ comme favorit le @date@',
						'fave_cnt' : '@fave_cnt@ favorit(s)',
						// M
						'menu_item' : 'CheckBuddyActivity: Ajuster l\'intervale de temps',
						// N
						'no_activity' : 'Aucune activit&eacute; dans le dernier @timeframe@.',
						'note' : '@username@ a ajout&eacute; une note &agrave; @photo@ le @date@',
						'note_cnt' : 'Pendant ce @timeframe@, @username@ a laiss&eacute; @tag_cnt@ tag(s).',
						// P
						'please_wait' : 'Patienter',
						'prompt_timeframe' : 'Quelle intervale de temps v&eacute;rifier (donner une valeur en heures (e.g. 24h) ou jours (e.g. 31d).',
						// T
						'tag' : '@username@ a tagg&eacute;  @photo@ le @date@',
						'tag_cnt' : 'Pendant ce @timeframe@, @username@ a laiss&eacute; @tag_cnt@ tag(s).',
						'tag_note_cnt' : 'Pendant ce @timeframe@, @username@ a laiss&eacute; @tag_cnt@ tag(s) et @note_cnt@ note(s).'
						},
					'pt-br': {
						// A
						'activity_title' : '&Uacute;ltima atividade',
							// C
							'check_activity' : 'Checar atividade do camarada',
							'close' : 'Fechar',
							'comment' : '@username@ comentado @photo@ na @date@',
					// F
					'fave' : '@username@ favorito @photo@ na @date@',
					// N
					'no_activity' : 'Sem atividade no &uacute;ltimo @timeframe@.',
					'31d' : 'm&ecirc;s',
					// P
					'please_wait' : 'Por favor, aguarde'
				},
				defaultLang: 'en-us'
			}),
		boxEle: undefined,
		timeframe: 0,
		init: function() {
			var menu = document.getElementById('personmenu_contacts_link');
			if(menu) {			
				this.timeframe = GM_getValue('timeframe');
				if(!this.timeframe) {
					this.timeframe = '31d';
					GM_setValue('timeframe','31d');
				}

				var link =document.createElement('a');
				link.setAttribute('class','block');
				link.setAttribute('id','tag_person_link');
				link.setAttribute('href','javascript:;');
				link.addEventListener('click',getObjectMethodClosure(this,'showDialogue'),true);
				link.innerHTML = this.localiser.localise('check_activity');
			  
				menu.parentNode.insertBefore(link,menu.nextSibling);
			}
			var self = this;
			GM_registerMenuCommand( this.localiser.localise("menu_item"), function() {self.timeframe = prompt(self.localiser.localise('prompt_timeframe'),self.timeframe);GM_setValue('timeframe',self.timeframe)});
		},
		count_tag:0,
		count_note:0,
		count_fave:0,
		count_comment:0,
		foundActivity: 0,
		foundEvent: undefined,

		processRSP: function(rsp,page,user_id) {
			for(var i=0;i<rsp.items.item.length;i++) {
				for(var j=0;j<rsp.items.item[i].activity.event.length;j++) {
					if(rsp.items.item[i].activity.event[j].user == user_id) {	
						this.username = rsp.items.item[i].activity.event[j].username;
						var period = 0;
						if(this.timeframe.indexOf('d') >= 0) {
							period = (Date.now() - rsp.items.item[i].activity.event[j].dateadded*1000)/(3600*24*1000);
						} else {
							period = (Date.now() - rsp.items.item[i].activity.event[j].dateadded*1000)/(3600*1000);
						}
						M8_log(rsp.items.item[i].activity.event[j].type+':'+period+':'+parseInt(this.timeframe));
						if(period <= parseInt(this.timeframe)) {
							this['count_'+rsp.items.item[i].activity.event[j].type]++;
							if((rsp.items.item[i].activity.event[j].type == 'comment' ||
								rsp.items.item[i].activity.event[j].type == 'fave') &&
							   (rsp.items.item[i].activity.event[j].dateadded > this.foundActivity)) {
								this.foundEvent = {event: rsp.items.item[i].activity.event[j],
												   first: rsp.items.item[i]};
								this.foundActivity = rsp.items.item[i].activity.event[j].dateadded;
							}
						}
					}
				}
				
			}
			
			if(page < rsp.items.pages) {
				this.checkPage(page+1,user_id);
			} else {
				this.boxEle.removeChild(this.dial);
				var dial = this.boxEle.appendChild(document.createElement('div'));
				dial.setAttribute('style',"clear:both; width:70%;overflow:auto;margin-left:15%;");
				if(this.foundEvent && this.foundEvent.event && this.foundEvent.first) {
					var first = this.foundEvent.first;
					var event = this.foundEvent.event;
					var id = first.id;
					if(first.type == 'photoset')
						id = first.primary;
					dial.innerHTML = this.localiser.localise(event.type,
															 {
																 'username' : '<a href="http://www.flickr.com/photos/'+encodeURIComponent(event.user)+'" >'+event.username+'</a>',
																 'photo' : '<br/><a href="http://www.flickr.com/photos/'+encodeURIComponent(unsafeWindow.global_nsid)+'/'+first.id+'"><img src="http://farm'+first.farm+'.static.flickr.com/'+first.server+'/'+id+'_'+first.secret+'_m.jpg"/></a><br/>',
																 'date' : "<br/>"+(new Date(event.dateadded*1000)).toUTCString()
															 });
					dial.innerHTML += '<br/>'+this.localiser.localise('additional_count',{
							'tag_cnt':this.count_tag+0+' ', 
								'note_cnt':this.count_note+0+' ',
								'fave_link':((this.count_fave > 0)?('<a title="Favorite Finder" href="http://bighugelabs.com/flickr/favorites.php?user1='+encodeURIComponent(unsafeWindow.global_nsid)+'&user2='+encodeURIComponent(user_id)+'&button=Go">'+this.localiser.localise('fave_cnt',{'fave_cnt':this.count_fave+0+''})+'</a>'):(this.localiser.localise('fave_cnt',{'fave_cnt':this.count_fave+0+''}))),
								'fave_cnt':this.count_fave+0+' ',
								'comment_cnt':this.count_comment+0+' ',
								'timeframe':this.localiser.localise(this.timeframe)
								});
				} else if(this.countTag > 0 && this.countNote > 0) {
					dial.innerHTML = this.localiser.localise('tag_note_cnt',{'username' : '<a href="http://www.flickr.com/photos/'+encodeURIComponent(user_id)+'" >'+this.username+'</a>','tag_cnt':this.count_tag, 'note_cnt':this.count_note, 'timeframe':this.localiser.localise(this.timeframe)});
				} else if(this.count_tag > 0) {
					dial.innerHTML = this.localiser.localise('tag_cnt',{'username' : '<a href="http://www.flickr.com/photos/'+encodeURIComponent(user_id)+'" >'+this.username+'</a>','tag_cnt':this.count_tag, 'timeframe':this.localiser.localise(this.timeframe)});
				} else if(this.count_note > 0) {
					dial.innerHTML = this.localiser.localise('note_cnt',{'username' : '<a href="http://www.flickr.com/photos/'+encodeURIComponent(user_id)+'" >'+this.username+'</a>','note_cnt':this.count_note, 'timeframe':this.localiser.localise(this.timeframe)});
				} else {
					dial.innerHTML = this.localiser.localise('no_activity',{'timeframe':this.localiser.localise(this.timeframe)});
				}
			}
		},

		checkPage: function(page,user_id) {
			var self = this;
			var lastCheck = eval(GM_getValue('cached_page_'+page));
			var when;
			if(lastCheck) {
				var when = Date.now() - lastCheck.timestamp;
				when = when / (3600*1000);
			} else when = 2;
			if(when > 1) {
				var listener = {
					flickr_activity_userPhotos_onLoad: function(success, responseXML, responseText, params){
						try{
							var rsp = responseText.replace(/jsonFlickrApi\(/,'');
							rsp = eval('('+rsp);
							if(rsp.stat == 'ok') {
								GM_setValue('cached_page_'+page,uneval({timestamp: Date.now(),
												rsp: rsp}));
								self.processRSP(rsp,page,user_id);
							} else
								M8_log("Error2 "+responseText);							
						} catch (e) {
							M8_log("Error1 "+responseText);
							M8_log(e);
						}
					}
				};
				
				unsafeWindow.F.API.callMethod('flickr.activity.userPhotos', {
						timeframe: this.timeframe,
							page:page,
							per_page: 25,
							format: 'json'
							}, listener);
			} else {
				this.processRSP(lastCheck.rsp,page,user_id);
			}	
		},
		showDialogue: function(ev) {
			var block = ev.target.parentNode;
			var matches =   /mail\/write\/\?to=([^"]*)"/.exec(block.innerHTML);
			if(matches && matches[1]) {
				var user_id=matches[1]
				// create a block element of some kind
				this.boxEle = document.createElement('div');
				// style it up with a class or inline
				this.boxEle.className = 'popup';
				// create something to act as a close button
				btnClose = document.createElement('a');
				btnClose.href='javascript:;';
				btnClose.innerHTML='<img style="margin: 0; padding: 0; border:0px !important; vertical-align: top;" src="http://flickr.com/images/window_close_grey.gif" alt="'+this.localiser.localise('close')+'"/>';
				btnClose.title = this.localiser.localise('close');

				// add close button to block element
				this.boxEle.appendChild(btnClose);
				// create box with block element
				var lwBox = new LightWeightBox(this.boxEle);
				// optional bg color and opacity
				this.boxEle.style.paddingTop= '10px';
				this.boxEle.style.width= '350px';
				this.boxEle.style.paddingBottom = '10px';
				this.boxEle.style.backgroundColor = '#fff';
				this.boxEle.style.border = '1px solid black';
				// attach close event and add your own code
				btnClose.addEventListener('click',function(){
						// you have to pass box object into event
						// because of the js event scoping
						lwBox.Close(lwBox);
						// false to cancel link
						return false;
					},true);
				btnClose.setAttribute('style','float:right;margin-bottom:10px;margin-right:5px;');
				
				var title = this.boxEle.appendChild(document.createElement('div'));
				title.setAttribute('style',"padding:12px;background-color: #EEEEEE;clear:both;font-size: 14px;margin-bottom:10px");
				title.innerHTML = '<h3 style="margin:0;">'+this.localiser.localise('activity_title')+'</h3>';

				this.dial = this.boxEle.appendChild(document.createElement('div'));
				this.dial.setAttribute('style',"clear:both; width:70%;overflow:auto;margin-left:15%;");

				
				this.count_tag=0;
				this.count_note=0;
				this.count_fave=0;
				this.count_comment=0;
				this.foundActivity=0;
				this.foundEvent=undefined;
				
				this.checkPage(1,user_id);

				this.dial.innerHTML = this.localiser.localise('please_wait')+' <img height="24" width="24" src="data:image/gif,GIF89a%10%00%10%00%D5%3D%00%D3%D3%D3%F7%F7%F7%D1%D1%D1%D7%D7%D7%C9%C9%C9%CA%CA%CA%C6%C6%C6%FC%FC%FC%F0%F0%F0%E8%E8%E8%D5%D5%D5%FB%FB%FB%F8%F8%F8%CF%CF%CF%C5%C5%C5%C4%C4%C4%E2%E2%E2%D9%D9%D9%EF%EF%EF%F3%F3%F3%D4%D4%D4%C8%C8%C8%F4%F4%F4%E6%E6%E6%E3%E3%E3%DA%DA%DA%F5%F5%F5%F1%F1%F1%D2%D2%D2%F9%F9%F9%E4%E4%E4%E1%E1%E1%F6%F6%F6%EB%EB%EB%CB%CB%CB%EC%EC%EC%C3%C3%C3%D0%D0%D0%E7%E7%E7%CC%CC%CC%E9%E9%E9%DC%DC%DC%E5%E5%E5%D8%D8%D8%CE%CE%CE%C1%C1%C1%DB%DB%DB%EA%EA%EA%EE%EE%EE%DD%DD%DD%DF%DF%DF%DE%DE%DE%D6%D6%D6%F2%F2%F2%ED%ED%ED%FA%FA%FA%E0%E0%E0%FE%FE%FE%FD%FD%FD%C7%C7%C7%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%3D%00%2C%00%00%00%00%10%00%10%00%00%06%C3%40%9EP%B7%C9%F1%04%14J%26w%10%3A%3B%1F%C2%84%17%D9%3D%00%07%86%C6%C9%C8%ECv%1F%5Ebg%B0%F1B%91%80%F0%96z8%04%3C%C6%23%A3%5B%B0%0C%B8Cs%01%2B%19%8C%00%1B%3C8_%3B%08%18%177%3C%3A)F%1D%07%08%22%1C%18%16%3C%14%24%0A%2F%0B9%3AN7FN%00%06%0E\'.N%A7%20%26%03%0D%02%03%26%20B%A0%3C%07%0A%15%24%3B%1C%A79%16%8A%3C99%01%1F%2C-%B9%16%18%14s%0BN%17B%1313%13%15_%22%B0%10B%22%03%95u%3A%10%B6%D6%13%22%5B%A2%04%89B%0C.%00%01%3A%03%0E%1E%3C*%06%06%11%1D%5C%23g%F1%0A%3C%01%058%F4%A7%CA*((h%20dC\'!A%00%00!%F9%04%05%00%00%3D%00%2C%00%00%00%00%10%00%10%00%00%06l%40%9E%90%87%C0%01%84%00%1Cb%C8%84%14v%3B!%B4%80c%0A%25%04%A8%14%9A%60%5En%3Cl%94%C7%E5%E9P%C4%82%00%8C%95vu%83B%11%BA%0E%0B%DF%03%A8%11%BA%AB%0F%E1%7CGV%83%84%85V%00%7C%3B%5DCbPI%7CoBlY%3BJOxBuXr%3C8xc%7Dl%10L%80%A0%A1%83(O%A6%05%17%84E%82IKCA%00!%F9%04%05%00%00%3D%00%2C%00%00%00%00%10%00%10%00%00%06%BE%40%9E%90%B7%C0Q%14%0D%E1F7%14%06%02%BC%D4c%A7%E0%05%0A8%C6%90%11%F1%F0%2C%84%9DW%B5%A32u%90%5DE%93%8384%3C%85%83%C4%81N*%E5%15%8FQ%D5UN%18PP%16%18%00%15(97%3C7%2Bl%3C!%5EC%89M%1D%3A5%19%3B%0D%02%03%26%20MC%1E%0D%0E%0E%02%00%3BS%25%13%9F%3C%20%17%03%0D4-%05%11%1BM%0779M8%0A!%B9%23C%3A8%0F%14%18%16%3C%13P%0B2\'%B98%3C%07%25e%3B%0899%2F%0D%99%7B%04%BF%23S8%07%3C9%11%0E%06%1F%3C%09%06%0D%07%07%19%11PB%0B%1F%04%AA%11%3B%0E%179%1A%EF%C0%1B%B9%02%14%1C%20%2Ch%12%04%00%3B" alt="'+this.localiser.localise('please_wait')+'" />';
				lwBox.Render();
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
									
									var flickrgp = new flickrcheckbuddyactivity();
		}, false);
	} catch (ex) {}
})();
