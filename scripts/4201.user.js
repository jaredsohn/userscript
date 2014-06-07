// Flickr Auto Tag
// v0.4
// 2009-04-20
// Copyright (c) 2007, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Flickr Auto Tag
// @namespace	http://6v8.gamboni.org/Flickr-Auto-Tag.html
// @description	Save and reuse quickly the tags you often use.
// @version        0.4
// @date           2009-04-20
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos/*
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

(function () {

    //var win = (unsafeWindow || window.wrappedJSObject || window);

	//update information
	var SCRIPT = {
		name: "Flickr Auto Tag",
		namespace: "http://6v8.gamboni.org/Flickr-Auto-Tag.html",
		description: "Save and reuse quickly the tags you often use.",
		source: "http://6v8.gamboni.org/Flickr-Auto-Tag.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flickrautotag.user.js",
		version: "0.4",								// version
		date: (new Date(2009, 4, 20))		// update date
		.valueOf()
	};

	//======================================================================
	//to do the closure and get the right this.
	//adapted from http://persistent.info/greasemonkey/gmail.user.js

	function getObjectMethodClosure0(object, method,args) {
		return function() {
			return object[method](args); 
		}
	}

			/***********************************************************************
	 * Flickr Localisation
	 **********************************************************************/

	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}

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

	var localiser = new FlickrLocaliser({
			'en-us' : {
				'add' : 'add',
				'save' : 'save',
				'clear' : "FlickrAutoTag: Clear"
			},
			'fr-fr' : {
				'add' : 'ajouter',
				'save' : 'sauver',
				'clear' : "FlickrAutoTag: Vider les tags"
			},
			'es-us' : {
				'add' : 'agregar',
				'save' : 'guardar',
				'clear' : "FlickrAutoTag: Borrar las etiquetas"
			},
			'it-it' : {
				'add' : 'aggiungi',
				'save' : 'salva',
				'clear' : "FlickrAutoTag: Cancella i tag"
			},
			'pt-br' : {
				'add' : 'adicionar',
				'save' : 'salvar',
				'clear' : "FlickrAutoTag: Limpar suas tags"
			},
			'zh-hk': {
				// A
				'add' : '&#22686;&#21152;',
				// S
				'save' : '&#20786;&#23384;'
			},
			'de-de': {
				// A
				'add' : 'hinzf&uuml;gen',
				// S
				'save' : 'speichern'
			},
			'ko-kr': {
				// A
				'add' : '&#52628;&#44032;',
				// S
				'save' : '&#51200;&#51109;'
			},
			defaultLang: 'en-us'
		});

	FlickrAutoTag = function() {
	    	
	    this.init();
	};

	FlickrAutoTag.prototype = {
		init: function() {	
			var existing_tags;
			
			var matches = /\/photos\/[^\/]+\/([0-9]+)/.exec(document.location.pathname);
			if(matches) {
				//use the tags flickr already retrieved for use, thanks
				existing_tags = unsafeWindow.global_photos[matches[1]].tags_rawA;
			}
			var tags = GM_getValue('tags');
			if(tags) {
				var tagit = document.getElementById('tagadderlink');
				if(tagit) {
					stags = tags.split('#@#');
					html = '';
					for each(tag in stags) {
						var show = true;
						if(existing_tags) {
							//This will not resist to "
							var split = tag.split(' ');
							var cnt = 0;
							for each(t in split) {
								if(existing_tags.indexOf(t) > 0) cnt++;
							}
							if(cnt == split.length) show = false;
						}
						if(show) {
							tag = tag.replace(/\"/g,'"');
							html += '<option>'+tag+'</option>';
						}
					}
					if(html) {
						var span = tagit.appendChild(document.createElement('span'));
						span.style.display = 'block';
						span.style.fontSize = '80%';
						var select = span.appendChild(document.createElement('select'));
						select.innerHTML = html;
						var button = span.appendChild(document.createElement('button'));
						button.innerHTML = localiser.localise('add');
						button.className = 'SmallButt';
						button.addEventListener('click',getObjectMethodClosure0(this,'addTags',select),true);
					}
				}
			}

			
			var adder = document.getElementById('tagadderform');
			if(adder) {
				var label = adder.parentNode.insertBefore(document.createElement('label'),adder.nextSibling);
				label.innerHTML = localiser.localise('save');
				label.style.fontSize = 'small';
				label.style.color = 'grey';
				label.htmlFor = 'savetag';
				var save = adder.parentNode.insertBefore(document.createElement('input'),adder.nextSibling);
				save.type = 'checkbox';
				save.id = 'savetag';
				adder.elements[2].addEventListener('click',function() {
					if(save.checked) {
						if(!tags || (tags.split('#@#').indexOf(adder.elements[1].value) < 0)) {
							if(tags) tags += '#@#'; //this will not resist tags containing #@#
							else tags = '';
							tags += adder.elements[1].value;
							GM_setValue('tags',tags);
						}
					}
				},true);
			}
		},
		
		addTags: function(select) {
			
			var adder = document.getElementById('tagadderform');
			
			var matches = /\/photos\/[^\/]+\/([0-9]+)/.exec(document.location.pathname);
			if(matches) {
				//use flickr function to do the work
				unsafeWindow.tagrs_addTag(matches[1],select.value);
			}
		}
	};


	//======================================================================
		
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
									try {
										
										// update automatically (http://userscripts.org/scripts/show/2296)
										window.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {} 

									var flickrgp = new FlickrAutoTag();
		}, false);
		//a menu item to clear the saved tags.
		GM_registerMenuCommand( localiser.localise('clear'), function() {GM_setValue('tags','');} );
	} catch (ex) {}

})();
