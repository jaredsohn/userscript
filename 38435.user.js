// ==UserScript==
// @name	Flickr More Sparkles
// @namespace	http://6v8.gamboni.org/
// @description Add Sparkle lines for stats of individual photos
// @version        0.7
// @identifier	http://6v8.gamboni.org/IMG/js/flickr_more_sparkles.user.js
// @date           2009-12-30
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include *flickr.com/photos/*
// @include *flickr.com
// @include *flickr.com/
// @include *flickr.com/activity*
// @include *flickr.com/photos/*
// @include *flickr.com/photos/*/stats*
// @exclude *flickr.com/photos/*/alltags*
// @exclude *flickr.com/photos/organize*
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
// Copyright (C) 2009 Pierre Andrews
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
		name: "Flickr More Sparkles",
		namespace: "http://6v8.gamboni.org/",
		description: "Add Sparkle lines for stats of individual photos",
		identifier: "http://6v8.gamboni.org/IMG/js/flickr_more_sparkles.user.js",
		version: "0.7",								// version
		date: (new Date("2009-12-30"))		// update date
		.valueOf()
	};


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


   function $x1(xpath, root) {
	 			var doc = root ? root.evaluate?root:root.ownerDocument : document;
		return document.evaluate(
								 xpath,
								 root||doc,
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


	var flickrmoresparkles = function() {this.init();}

	flickrmoresparkles.prototype = {

	localiser: new FlickrLocaliser({
									 'en-us' : {'photo_stats': 'Photo stats',
									   'video_stats': 'Video stats',
												'account_stats':'Stats |',
												'photostream':"Flickr: Your Photostream",
												'photos_videos':'Your photos and videos |',
												  'your_stats':'Your Stats'
},
	  'fr-fr':{'photo_stats': 'Statistiques de la photo',
												'account_stats':'Statistiques pour votre compte',
												'photostream':"Flickr: Votre galerie",
												'photos_videos':'Toutes vos photos',
												  'your_stats':'Vos statistiques'},

												  'es-us':{'photo_stats': 'Estadísticas de fotos',
														   'video_stats': 'Estadísticas del video',
												'account_stats':'Estadísticas para tu cuenta',
												'photostream':"Flickr: Tu galería",
												'photos_videos':'Todas tus fotos y videos',
			   'your_stats':'Tus estadísticas'},
				 'zh-hk':{'photo_stats': '相片統計資料',
						  'video_stats':'視訊統計資料',
												'account_stats':'你的帳號統計資料',
												'photostream':"Flickr: 你的所有內容",
												'photos_videos':'你所有的相片和視訊',
												  'your_stats':'你的統計資料'},
				 'de-de':{'photo_stats': 'Fotostatistiken',
						  'video_stats':'Video-Statistiken',
												'account_stats':'Statistiken für Ihren Account',
												'photostream':"Flickr: Ihr Fotostream",
												'photos_videos':'Alle Ihre Fotos und Videos',
												  'your_stats':'Ihre Statistiken'},
				 'ko-kr':{'photo_stats': '사진 통계',
						  'video_stats':'동영상 통계',
												'account_stats':'내 Flickr 통계',
												'photostream':"Flickr: 포토스트림",
												'photos_videos':'나의 모든 사진 및 동영상',
												  'your_stats':'내 Flickr 통계'},
				 'it-it':{'photo_stats': 'Statistiche foto',
						  'video_stats':'Statistiche video',
												'account_stats':'Statistiche per il tuo account',
												'photostream':"Flickr: Il tuo album",
												'photos_videos':'Tutte le tue foto',
												  'your_stats':'Le tue statistiche'},

				 'pt-br':{'photo_stats': 'Stats da foto',
						  'video_stats':'Stats do vídeo',
												'account_stats':'Stats da sua conta',
												'photostream':"Flickr: Sua galeria",
												'photos_videos':'Todas as suas fotos',
												  'your_stats':'Suas stats'},
									 defaultLang:'en-us'
	  }),

	  makeSpark: function(url, insert, withLink, fill,bg) {
		  GM_xmlhttpRequest({
			method:"GET",
							  url:url,
							  headers: { 'Cookie': document.cookie },
							  onload:function(details) {
								var start = details.responseText.indexOf("F.photoViews = {");
								if(start >= 0) {
								var end = details.responseText.indexOf("</script>",start);
								var code = 	details.responseText.substring(start,end).replace("F.photoViews = {","").replace("foreGraph:","");
								code = code.substring(0,code.lastIndexOf("]"))+"]";
								var evaled = eval(code);
								var values = '';
								  var max = 0;
								var min = -1;
								for(i=0;i<evaled.length;i++) {
								  var val = parseInt(evaled[i].views);
								  if(isNaN(val)) val =0;
								  if(min<0 || min>val)
									min = val;
								  if(max<val)
									max = val;
								  if(val > 0)
								  values += ','+val;
								  else
									values += ',0';
								}
								if(max>0) {
								  values=values.substring(1);
								  var imgtxt = "http://chart.apis.google.com/chart?"
									+ "cht=ls"
									+ "&chds="+0+','+max
									+ "&chs="+(fill?"100x32":"81x22")
									+ "&chd=t:"+values
									+ "&chco=78A2FF"
									+ "&chls=1,1,0"
									+ "&chm=o,990000,0,81,4"+(fill?"|B,EBEAFF,0,0,0":"")
									+ "&chxt=r"
									+ "&chxs=1,990000,1,0,_"
									+ "&chxl=0:|"+val
									+ "&chxp=0,"+(val*100/max)
									+(bg?"&chf=bg,s,f5f5f5":"");
								  var img_node = document.createElement('img');
								  img_node.src= imgtxt;
								  if(withLink) {
									var ah = document.createElement('a');
									ah.href=url;
									ah.appendChild(img_node);
									insert.appendChild(ah);
								  } else  {
									insert.appendChild(img_node);
								  }
								}
								}
								if(insert.innerHTML == '') {
								  insert.innerHTML = '?';
								}

							  }
							})

	  },

	  init: function() {
		 if(document.title == this.localiser.localise('photostream')){
		  var self = this;
		  foreach("//p[@class='Activity']",function(el) {
					var ael = $x1("p[@class='Photo']/span/a",el.parentNode);
					self.makeSpark(ael.href+"/stats",el,true);
				  });
		 } else if(document.title.indexOf(this.localiser.localise('account_stats'))==0) {
		   var self = this;
		   var cnt = 0;
		   foreach("//div[@class='yesterday']/table//span[contains(@class,'photo_container')]/a[1]",function(el) {

					 var ael = $x1("td[@class='views']",el.parentNode.parentNode.parentNode);
						 ael.innerHTML = '';
					 self.makeSpark(el.href,ael,false,false,(++cnt%2>0));
				   } );
		   cnt = 0;
//		   foreach("//div[@class='alltime']/table//span[contains(@class,'photo_container')]/a[1]",function(el) {

//					 var ael = $x1("td[@class='views']",el.parentNode.parentNode.parentNode);
//					 ael.innerHTML = '';
//					 self.makeSpark(el.href,ael,false,false,(++cnt%2>0));
//				   } );
		 } else if(document.title.indexOf(this.localiser.localise('photos_videos')) >= 0) {
		   var self = this;
		   var cnt = 0;
		   foreach("//table//span[contains(@class,'photo_container')]/a[1]",function(el) {

					 var ael = $x1("td[@class='yesterday']",el.parentNode.parentNode.parentNode);
					 if(el.href.match(/20[0-9]+-[0-9]+-[0-9]+/)) {
					   ael.innerHTML = '';
						  var href = el.href.replace(/20[0-9]+-[0-9]+-[0-9]+/,'');
						  self.makeSpark(href,ael,false,false,(++cnt%2>0));
						}
				   } );
		 } else {
		   var found = false;
		   var self = this;
		   foreach("//td[@class='RHS']/ul/li/a", function(statIT) {
			 if(statIT && (statIT.innerHTML == self.localiser.localise('photo_stats') || statIT.innerHTML == self.localiser.localise('video_stats'))) {
			   var url = statIT.href;
			   self.makeSpark(url,statIT);
			   found=true;
			   }
			 });

		   if(!found) {
			   var stats = $x1("//a[@title='"+this.localiser.localise('your_stats')+"']");
			   if(stats) {
				 stats.innerHTML = '';
				 this.makeSpark(stats.href,stats,false,true);
				 var self = this;
				 foreach("//ul[contains(@class,'tt-stats-list')]/li/p/a",function(el) {
						   var ael = $x1("div[@class='tt-stats-count']",el.parentNode.parentNode);
						   ael.innerHTML = '';
						   self.makeSpark(el.href,ael);
				 });

			 }
		   }


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

									var flickrgp = new flickrmoresparkles();
		}, false);
	} catch (ex) {}
})();
