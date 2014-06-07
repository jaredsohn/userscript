// ==UserScript==
// @name	Flickr more menus
// @namespace	http://6v8.gamboni.org/
// @description Introduces some submenus for flickr gamma
// @version        0.8
// @source http://6v8.gamboni.org/Flickr-More-menus.html
// @identifier	http://6v8.gamboni.org/IMG/js/flickrmoremenus.user.js
// @date           2007-07-13
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/*
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

//
// The submenu is inspired from the super batch menu from .CK
//
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

		var SCRIPT = {
		name: "Flick more menus",
		namespace: "http://6v8.gamboni.org/",
		description: "Introduces some submenus for flickr gamma",
		source: "http://6v8.gamboni.org/Flickr-More-menus.html",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrmoremenus.user.js",
		version: "0.8",								// version
		date: (new Date(2007, 07, 13))		// update date
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

	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}


	/*****************************Flickr Localisation**********************/



	var win = (unsafeWindow || window.wrappedJSObject || window);	

	win.FlickrMoreMenus = function() {
		this.getUser();
		this.initStatic();
		this.getSets();
		this.waitForResults();
	}

	win.FlickrMoreMenus.prototype = {
		setMenu: '',
		received: false,
		cntTries: 20,
		userId: '',
		mapper: new FlickrLocaliser({
				'en-us' : {
					'Your Photos' : 'Your Photos',
					"Contact List" : "Contact List",
					'People Search' : 'People Search',
					'FlickrMail' : 'FlickrMail',
					'Your Archives' : 'Your Archives',
					'Your Sets' : 'Your Sets',
					'Calendar' : 'Calendar'
				},
				'fr-fr' : {
					'Your Photos' : 'Vos photos',
					"Contact List" : "Liste de contacts",
					'People Search' : 'Recherche de personnes',
					'FlickrMail' : 'FlickrMail',
					'Your Archives' : 'Vos archives',
					'Your Sets' : 'Vos albums',
					'Calendar' : 'Calendrier'
				},
				'it-it' : {
					'Your Photos' : 'Le tue foto',
					"Contact List" : "Lista contatti",
					'People Search' : 'Ricerca di persone',
					'FlickrMail' : 'FlickrMail',
					'Your Archives' : 'I tuoi archivi',
					'Your Sets' : 'I tuoi set',
					'Calendar' : 'Calendario'
				},
				'de-de' : {
					'Your Photos' : 'Ihre Fotos',
					"Contact List" : "Kontaktliste",
					'People Search' : 'Benutzer suchen',
					'FlickrMail' : 'FlickrMail',
					'Your Archives' : 'Ihre Archive',
					'Your Sets' : 'Ihre Alben',
					'Calendar' : 'Kalender'
				},
				'es-us' : {
					'Your Photos' : 'Tus fotos',
					"Contact List" : "Lista de contactos",
					'People Search' : 'Búsqueda de personas',
					'FlickrMail' : 'Flickrcorreo',
					'Your Archives' : 'Tus archivos',
					'Your Sets' : 'Tus álbumes ',
					'Calendar' : 'Calendario'
				},
				'pt-br' : {
					'Your Photos' : 'Fotos',
					"Contact List" : "Lista de contatos",
					'People Search' : 'Busca de pessoas',
					'FlickrMail' : 'E-mail do Flickr',
					'Your Archives' : 'Arquivos',
					'Your Sets' : 'Álbuns',
					'Calendar' : 'Calendário'
				},
				'ko-kr' : {
					'Your Photos' : '내 사진',
					"Contact List" : "이웃 목록",
					'People Search' : '사람 찾기',
					'FlickrMail' : 'FlickrMail',
					'Your Archives' : '지난글 보기',
					'Your Sets' : '세트',
					'Calendar' : '달력'
				},
				'zh-hk' : {
					'Your Photos' : '你的相片',
					"Contact List" : "自己人名冊",
					'People Search' : '搜尋用戶',
					'FlickrMail' : 'FlickrMail',
					'Your Archives' : '你的資料庫',
					'Your Sets' : '你的相片集',
					'Calendar' : '日曆',
				},
				defaultLang: 'en-us'
			}),
		localiser: new FlickrLocaliser({
				'en-us' : {
					'your_photos' : 'Your Photos',
					'interesting' : 'Interesting',
					'views' : 'Views',
					'favorites' : 'Favorites',
					'scout' : 'Scout',
					'leech' : 'Leech',
					'your_contacts' : "Your Contacts",
					'recents' : 'Recents',
					'friends_family' : 'Friends &amp; Family',
					'family' : 'Family',
					'friends' : 'Friends',
					'contacts' : 'Contacts',
					'who_contacts' : "Who calls you a Contact?",
					'manage_tags' : "Manage your Tags",
					'your_archive' : "Your Archives",
					'archives' : 'Archives',
					'date_taken' : 'Date Taken',
					'detail' : 'Detail',
					'calendar' : 'Calendar',
					'map' : 'Map',
					'date_posted' : 'Date Posted',
					'set_s' : '@cnt@ Set(s)',
					'your_sets' : 'Your Sets',
					'individual_explore' : 'Individual Explore'
				},
				'fr-fr' : {
					'your_photos' : 'Vos photos',
					'interesting' : 'Int&eacute;ressant',
					'views' : 'Affichages',
					'favorites' : 'Favoris',
					'scout' : 'Scout',
					'leech' : 'Leech',
					'your_contacts' : "Vos contacts",					
					'recents' : 'R&eacute;centes',
					'friends_family' : 'Amis et Famille',
					'family' : 'Famille',
					'friends' : 'Amis',
					'contacts' : 'Contacs',
					'who_contacts' : "Qui vous compte parmi ses contacts?",
					'manage_tags' : "Editer vos tags",
					'your_archive' : "Vos archives",
					'archives' : 'Archives',
					'date_taken' : 'Date de prise de vue',
					'detail' : 'D&eacute;tails',
					'calendar' : 'Calendrier',
					'map' : 'Carte',
					'date_posted' : 'Ajout&eacute;e le',
					'set_s' : '@cnt@ Album(s)',
					'your_sets' : 'Vos albums',
					'individual_explore' : 'Explore Personalis&eacute;'
				},
				'it-it' : {
					'your_photos' : 'Le tue foto',
					'interesting' : 'Interessante',
					'views' : 'Visualizzazioni',
					'favorites' : 'Preferite',
					'scout' : 'Scout',
					'leech' : 'Leech',
					'your_contacts' : "I tuoi contatti",					
					'recents' : 'Recenti',
					'friends_family' : 'Amici e familiari',
					'family' : 'Familiari',
					'friends' : 'Amici',
					'contacts' : 'Contatti',
					'who_contacts' : "Chi ti considera un contatto?",
					'your_archive' : "I tuoi archivi",
					'archives' : 'Archivi',
					'date_taken' : 'Scattata a',
					'detail' : 'Dettagli',
					'calendar' : 'Calendario',
					'map' : 'Cartina',
					'date_posted' : 'Postato in Flickr',
					'set_s' : '@cnt@ Set',
					'your_sets' : 'I tuoi set',
					'individual_explore' : 'Explore Personalizzato'
				},
				'de-de' : {
					'your_photos' : 'Ihre Fotos',
					'interesting' : 'Interessanteste',
					'views' : 'Aufrufe',
					'favorites' : 'Favoriten',
					'scout' : 'Scout',
					'leech' : 'Leech',
					'your_contacts' : "Ihre Kontakte",					
					'recents' : 'Neueste',
					'friends_family' : 'Freunde & Familie',
					'family' : 'Familie',
					'friends' : 'Freunde',
					'contacts' : 'Kontakte',
					'who_contacts' : "Für wen sind Sie ein Kontakt?",
					'your_archive' : "Ihre Archive",
					'archives' : 'Archives',
					'date_taken' : 'Aufgenommen',
					'detail' : 'Detail',
					'calendar' : 'Kalender',
					'map' : 'Weltkarte',
					'date_posted' : 'In Flickr gepostet',
					'set_s' : '@cnt@ Alben',
					'your_sets' : 'Ihre Alben'
				},
				 'es-us' : {
					'your_photos' : 'Tus fotos',
					'interesting' : 'Interesante',
					'views' : 'Vistas',
					'favorites' : 'Favoritas',
					'scout' : 'Scout',
					'leech' : 'Leech',
					'your_contacts' : "Tus contactos",					
					'recents' : 'Recientes',
					'friends_family' : 'Amigos y familiares',
					'family' : 'Familiares',
					'friends' : 'Amigos',
					'contacts' : 'Contactos',
					'who_contacts' : "&iquest;Qui&eacute;n te considera un contacto?",
					'your_archive' : "Tus archivos",
					'archives' : 'Archivos',
					'date_taken' : 'Tomada el',
					'detail' : 'Detalle',
					'calendar' : 'Calendario',
					'map' : 'Mapa',
					'date_posted' : 'Publicada en Flickr',
					'set_s' : '@cnt@ &Aacute;lbume(s)',
					'your_sets' : 'Tus &aacute;lbumes '
				},
				'pt-br': {
					// A
					'archives' : 'Arquivos',
					// C
					'calendar' : 'Calend&aacute;rio',
					'contacts' : 'Contatos',
					// D
					'date_posted' : 'Postada no Flickr',
					'date_taken' : 'Tirada em',
					'detail' : 'Detalhe',
					// F
					'family' : 'Fam&iacute;lia',
					'favorites' : 'Favoritos',
					'friends' : 'Amigos',
					'friends_family' : 'Amigos e fam&iacute;lia',
					// I
					'interesting' : 'Interessante',
					// L
					'leech' : 'Leech',
					// M
					'manage_tags' : "Administre sues Tags",
					'map' : 'Mapa',
					// R
					'recents' : 'Recente',
					// S
					'scout' : 'Scout',
					'set_s' : '@cnt@ &Aacute;lbun(s)',
					// V
					'views' : 'Visualiza&ccedil;&otilde;es',
					// W
					'who_contacts' : 'Quem chama voc&ecirc; de Contato?',
					// Y
					'your_archive' : 'Arquivos',
					'your_contacts' : 'Contatos',
					'your_photos' : 'Fotos',
					'your_sets' : '&Aacute;lbuns'
				},
				'ko-kr': {
					// A
					'archives' : '&#51648;&#45212;&#44544; &#48372;&#44592;',
					// C
					'calendar' : '&#45804;&#47141;',
					'contacts' : '&#51060;&#50883;',
					// D
					'date_posted' : 'Flickr&#50640; &#50629;&#47196;&#46300;&#46120;',
					'date_taken' : '&#52524;&#50689; &#45216;&#51676;',
					'detail' : '&#51088;&#49464;&#55176; &#48372;&#44592;',
					// F
					'family' : '&#44032;&#51313;',
					'favorites' : '&#51339;&#50500;&#54616;&#45716; &#49324;&#51652;',
					'friends' : '&#52828;&#44396;',
					'friends_family' : '&#52828;&#44396;&#51060;&#51088; &#44032;&#51313;',
					// I
					'interesting' : '&#44288;&#49900;',
					// L
					'leech' : 'Leech',
					// M
					'map' : '&#51648;&#46020;',
					// R
					'recents' : '&#52572;&#44540;',
					// S
					'scout' : 'Scout',
					'set_s' : '@cnt@ &#49464;&#53944;',
					// V
					'views' : '&#48372;&#44592;',
					// W
					'who_contacts' : '&#45208;&#47484; &#51060;&#50883;&#51004;&#47196; &#52628;&#44032;&#54620; &#49324;&#46988; ',
					// Y
					'your_archive' : '&#51648;&#45212;&#44544; &#48372;&#44592;',
					'your_contacts' : '&#51060;&#50883;',
					'your_photos' : '&#45236;&#49324;&#51652;',
					'your_sets' : '&#49464;&#53944;'
				},
				'zh-hk': {
					// A
					'archives' : '&#20320;&#30340;&#36039;&#26009;&#24235;',
					// C
					'calendar' : '&#26085;&#26310;',
					'contacts' : '&#33258;&#24049;&#20154;',
					// D
					'date_posted' : '&#24050;&#30332;&#20296;&#33267; Flickr',
					'date_taken' : '&#25293;&#25885;&#26044;',
					'detail' : '&#35443;&#32048;&#36039;&#26009;',
					// F
					'family' : '&#23478;&#20154;',
					'favorites' : '&#26368;&#24859;',
					'friends' : '&#26379;&#21451;',
					'friends_family' : '&#26379;&#21451;&#21644;&#23478;&#20154;',
					// I
					'interesting' : '&#26377;&#36259;&#30340;',
					// L
					'leech' : 'Leech',
					// M
					'map' : '&#22320;&#22294;',
					// R
					'recents' : '&#26368;&#26032;&#30340;',
					// S
					'scout' : 'Scout',
					'set_s' : '@cnt@ &#30456;&#29255;&#38598;',
					// V
					'views' : '&#27425;&#27298;&#35222;',
					// W
					'who_contacts' : '&#35504;&#31281;&#20320;&#28858;&#33258;&#24049;&#20154;&#65311; ',
					// Y
					'your_archive' : '&#20320;&#30340;&#36039;&#26009;&#24235;',
					'your_contacts' : '&#20320;&#30340; &#33258;&#24049;&#20154;',
					'your_photos' : '&#20320;&#30340;&#30456;&#29255;',
					'your_sets' : '&#20320;&#30340;&#30456;&#29255;&#38598;'
				},
				defaultLang: 'en-us'
			}),

		//get the user id (somewhere in a script in the page)
		getUser: function() {
			var scripts =  document.getElementsByTagName("script");
			if(scripts.length > 0) {
				var matches = /global_nsid = '(.*?)',/.exec(scripts[0].innerHTML);			
				if(matches) {
					this.userId = matches[1];
				}
			}
		},

		//insert the menu that do not rely on ajax query to Flickr api
		initStatic: function() {
			if(this.userId) {
				var yourphotos = 
				this.createMenuLink('http://www.flickr.com/photos/'+this.userId,this.localiser.localise('your_photos'),false,true)+
				this.createMenuLink('http://www.flickr.com/photos/'+this.userId+'/popular-interesting/',this.localiser.localise('interesting'),true,false)+
				this.createMenuLink('http://www.flickr.com/photos/'+this.userId+'/popular-views/',this.localiser.localise('views'),false,false)+
				this.createMenuLink('http://www.flickr.com/photos/'+this.userId+'/popular-faves/',this.localiser.localise('favorites'),false,false)+
				this.createMenuLink('http://flagrantdisregard.com/flickr/scout.php?username='+this.userId+'&sort=date&year=0',this.localiser.localise('scout'),true,false)+
				this.createMenuLink('http://www.houserdesign.com/flickr/nsid/'+this.userId,this.localiser.localise('leech'),false,false);
				this.insertMenu(yourphotos,'candy_nav_menu_you',"Your Photos",this.localiser.localise('your_photos'),true);
				
				var yourcontacts = 
				this.createMenuLink('http://www.flickr.com/people/'+this.userId+'/contacts/',this.localiser.localise('recents'),false,true)+
				this.createMenuLink('http://www.flickr.com/people/'+this.userId+'/contacts/?see=both',this.localiser.localise('friends_family'),true,false)+
				this.createMenuLink('http://www.flickr.com/people/'+this.userId+'/contacts/?see=family',this.localiser.localise('family'),false,false)+
				this.createMenuLink('http://www.flickr.com/people/'+this.userId+'/contacts/?see=friends',this.localiser.localise('friends'),false,false)+
				this.createMenuLink('http://www.flickr.com/people/'+this.userId+'/contacts/?see=contacts',this.localiser.localise('contacts'),false,false);

				this.insertMenu(yourcontacts,'candy_nav_menu_contacts',"Contact List",this.localiser.localise('your_contacts'),true);

				this.insertItem("http://www.flickr.com/people/"+this.userId+"/contacts/rev/",'candy_nav_menu_contacts',"People Search",this.localiser.localise('who_contacts'),false,true);
				this.insertItem("http://www.flickr.com/photos/"+this.userId+"/alltags/",'candy_nav_menu_you',"FlickrMail",this.localiser.localise('manage_tags'),false,false);

				var yourarchives = this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/",this.localiser.localise('archives'),false,true)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-taken/",this.localiser.localise('date_taken'),true,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-taken/detail/",'&nbsp;&nbsp;&nbsp;'+this.localiser.localise('detail'),false,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-taken/map/",'&nbsp;&nbsp;&nbsp;'+this.localiser.localise('map'),false,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-taken/calendar/",'&nbsp;&nbsp;&nbsp;'+this.localiser.localise('calendar'),false,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-posted/",this.localiser.localise('date_posted'),true,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-posted/detail/",'&nbsp;&nbsp;&nbsp;'+this.localiser.localise('detail'),false,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-posted/map/",'&nbsp;&nbsp;&nbsp;'+this.localiser.localise('map'),false,false)+
				this.createMenuLink("http://www.flickr.com/photos/"+this.userId+"/archives/date-posted/calendar/",'&nbsp;&nbsp;&nbsp;'+this.localiser.localise('calendar'),false,false);
				this.insertMenu(yourarchives,'candy_nav_menu_you',"Your Archives",this.localiser.localise('your_archive'),true);
				//				this.removeItem('candy_nav_menu_contacts',"Invite your Friends");
				
				this.insertItem('http://www.raum-fuer-notizen.de/explore/index.php?username='+this.userId,'candy_nav_menu_explore','Calendar',this.localiser.localise('individual_explore'),false,false);
				

			}			
		},

		//get the sets of the user
		getSets: function() {
			if(this.userId) {
				var self = this;
				
				var listener = {
					flickr_photosets_getList_onLoad: function(success, responseXML, responseText, params){
						var doc = responseText.replace(/<\?xml.*\?>/,'');
						doc = new XML(doc);
						var cnt = 0;
						for each (photoset in doc..photoset) {
								self.setMenu += self.createMenuLink('http://www.flickr.com/photos/'+self.userId+'/sets/'+photoset.@id,photoset.title,(cnt==0),false);							
								cnt++;
							}
						if(self.setMenu) {
							self.received = true;
							self.setMenu = self.createMenuLink('http://www.flickr.com/photos/'+self.userId+'/sets/',self.localiser.localise('set_s',{'cnt' : cnt}),false,true)+self.setMenu;
						}
					}
				}
				unsafeWindow.F.API.callMethod('flickr.photosets.getList', {
						user_id: this.userId,
					}, listener);
			}
		},

		
		//wait for the reception of the Flickr API query.
		waitForResults: function() {
			this.cntTries--;
			if(this.received) {
			    this.insertMenu(this.setMenu,'candy_nav_menu_you','Your Sets',this.localiser.localise('your_sets'),true);
			} else {
				var self = this;
				if(this.cntTries>0) setTimeout(function() {self.waitForResults();},1000);
			}
		},


		//======================================================================
		//                         Hack the Gamma menus
		//                         make your own insertion/submenus, etc
		//
		// see initStatic to find out how it works.
		//======================================================================


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

		//remove a menu item
		// menu is the id of the main menu
		// item is the item innerHTML
		//returns: the element removed
		removeItem: function(menu,item) {
			var menu_you = document.getElementById(menu);
			var you_a = menu_you.getElementsByTagName('a');
			var your_set = '';
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
			your_set.parentNode.removeChild(your_set);
			return your_set;
		},

		createMenuLink: function(href,title,line_above,first) {
			return '<a '+((first)?' style="padding-top:3px;"':'')+((line_above)?' class="menu_item_line_above"':'')+'" href="'+href+'">'+title+'</a>\n'
		},
		
		//insert a new menu:
		// innerHTML is the content of the menu (you should create that with createMenuLink calls)
		// menu is the id of the main menu where to insert the new menu item (e.g. 'candy_nav_menu_you')
		// item is the item "title" before which to insert the new menu item (or to replacE) (e.g. 'Your Sets')
		// title is the title of your new item
		// replace is a boolean to know if we replace 'item' or just add a new one
		insertMenu: function(innerHTML,menu,item,title,replace) {
			
			// insert pulldown menu, from .CK super batch edit script
			var menu_you = document.getElementById(menu);
			var you_a = menu_you.getElementsByTagName('a');
			var your_set = '';
			if(replace) item = this.mapper.localise(item);
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
			var onclickHandler1 = function() {
				if( batch.clickat == 'body' ) {
					batch.clickat = null;
					return;
				}
				if( b_menu.style.display == 'none' ) {
					b_menu.style.display = 'inline';
				} else {
					b_menu.style.display = 'none';
				}
			}
			var batch = this.insertItem(onclickHandler1,menu,item,title,replace);
			var b_menu = document.createElement('div');
			
			batch.clickat = null;
			batch.onclickHandler1 = onclickHandler1;
			batch.onclickHandler2 = function() {
				batch.removeEventListener('click', batch.onclickHandler2, true);
				batch.addEventListener('click', batch.onclickHandler1, true);
				b_menu.style.display = 'none';
				batch.status = false;
			}
			batch.onclickHandler3 = function() {
				b_menu.style.display = 'none';
			}
			b_menu.style.display = 'none';
			b_menu.style.left = '70px';
			b_menu.style.marginTop = '-19px';
			b_menu.className = 'candy_menu';
			b_menu.innerHTML = innerHTML;

			batch.parentNode.insertBefore(b_menu, batch.nextSibling);			
			
			document.body.addEventListener('click', 
										   function() {
				if( b_menu.style.display == 'inline' ) {
					b_menu.style.display = 'none';
					batch.clickat = 'body';
				} else batch.clickat = null;
			}, true);

		}
		
	}
	
	
	try {
		window.addEventListener("load", function () {
									try {
										// update automatically (http://userscripts.org/scripts/show/2296)
										win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {} 
									new win.FlickrMoreMenus();
								}, false);
	} catch (ex) {}



})();
