// ==UserScript==
// @name	Flickr Upcoming Event
// @namespace	http://6v8.gamboni.org/
// @description This is a greasemonkey script to enhance flickr pages and be able to easilly associate photos with an upcoming event. When a shot is associated to an event, it can then be tagged and located from the data provided by the event.
// @version        0.8
// @identifier	http://6v8.gamboni.org/IMG/js/flickrupcomingevent.user.js
// @date           2010-01-20
// @creator        Pierre Andrews (mortimer.pa@free.fr) , pt translation by Perla* <http://www.flickr.com/photos/bobnperla/>
// @include http://*flickr.com/photos/*/*
// @exclude http://*flickr.com/photos/organize*
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

var DEBUG = false;
var UPCOMING_API_URL = 'http://upcoming.yahooapis.com/services/rest/';

(function () {

	/*
	  Path to wrap descriptions by Johan Sundstrï¿½m
	  http://www.lysator.liu.se/~jhs/
	*/
	function wbr( html ) {
		return (''+html).replace( /[-\/_.]|\w{20}/g,
								  function( c ){ return c+'<wbr/>'; } );
	}

	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	function getObjectMethodClosure01(object, method,arg1) {
		return function(arg) {
			return object[method](arg1);
		}
	}


	function getObjectMethodClosure03(object, method,arg1,arg2,arg3) {
		return function(arg) {
			return object[method](arg1,arg2,arg3);
		}
	}

	function getObjectMethodClosure11(object, method,arg1) {
		return function(arg) {
			return object[method](arg,arg1);
		}
	}
	function getObjectMethodClosure12(object, method,arg1,arg2) {
		return function(arg) {
			return object[method](arg,arg1,arg2);
		}
	}
	function getObjectMethodClosure13(object, method,arg1,arg2,arg3) {
		return function(arg) {
			return object[method](arg,arg1,arg2,arg3);
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


	var flickrupcomingevent = function() {this.init();}

	flickrupcomingevent.prototype = {
		UPCOMING_API_KEY: '684909d568',
		tagged: false,
		canTag: false,
		upcoming_token: GM_getValue('upcoming_token'),
		upcoming_user_name: GM_getValue('upcoming_user_name'),
		upcoming_user_username: GM_getValue('upcoming_user_username'),
		upcoming_user_id: GM_getValue('upcoming_user_id'),

		event_id: '',
		events: {},
		localiser: new FlickrLocaliser({
				'en-us': {
					'script_title' : 'Upcoming.org event tool',
					'auth_1' : 'You first have to authorize the connection with upcoming. First go ',
					'auth_2' : 'When you are done, come back to this page and',
					'auth_3' : 'Enter the frob given by upcoming here',
					'finish_auth' : 'Finish authorization',
					'loading_details' : 'Getting event details',
					'fetch_events' : 'Fetching events',
					'event' : 'Event',
					'metro' : 'Metro',
					'searching' : 'searching',
					'venue' : 'Venue',
					'description' : 'Description',
					'see_other' : '<b>See other photos</b> from this event by: @this_user@, @everyone@',
					'this_user' : 'This User',
					'everyone' : 'Everyone',
					'geotag' : 'geotag this photo',
					'Tag' : 'Tag',
					'select_event' : 'Select the event this photo was taken at',
					'error' : 'There was an error, please see the console for details.'
				},
				'fr-fr': {
					// T
					'Tag' : 'Tagger',
					// A
					'auth_1' : 'Vous devez d\'abord autoriser la connection avec upcoming.org. Commencez par',
					'auth_2' : 'Quand vous avez fini, revenez sur cette page et',
					'auth_3' : 'Entrez le frob donn&eacute; par upcoming.org ici',
					// D
					'description' : 'Description',
					// E
					'error' : 'Il y a eu une erreur, veillez consulter les logs pour plus de d&eacute;tails.',
					'event' : '&Eacute;v&egrave;nement',
					'everyone' : 'Tous le monde',
					// F
					'fetch_events' : 'R&eacute;cup&eacute;ration des &eacute;v&egrave;nements',
					'finish_auth' : 'Finir l\'autorisation',
					// G
					'geotag' : 'Geotagger cette photo',
					// L
					'loading_details' : 'R&eacute;cup&eacute;ration des d&eacute;tails de l\'&eacute;v&egrave;nement',
					// M
					'metro' : 'Metro',
					// S
					'script_title' : 'Outil des &eacute;v&egrave;nements Upcoming.org',
					'searching' : 'En Recherche',
					'see_other' : '<b>Voir les autres photos</b> de cet &eacute;v&egrave;nement par: @this_user@, @everyone@',
					'select_event' : 'S&eacute;lectionner l\'&eacute;v&egrave;nement auquel la photo a &eacute;t&eacute; prise',
					// T
					'this_user' : 'Cet Utilisateur',
					// V
					'venue' : 'Lieu'
				},
				'pt-br': {// T
					'Tag' : 'R&oacute;tulo',
					// A
					'auth_1' : 'Primeiro voc&ecirc; tem que autorizar a conex&atilde;o com o "upcoming". Primeiro v&aacute;',
					'auth_2' : 'Quando terminar, volte para esta p&aacute;gina e',
					'auth_3' : 'Digite aqui o "frob" dado pelo "upcoming"',
					// D
					'description' : 'Descri&ccedil;&atilde;o',
					// E
					'error' : 'Houve um erro, por favor veja o console para detalhes',
					'event' : 'Evento',
					'everyone' : 'Todas as pessoas',
					// F
					'fetch_events' : 'Procurando eventos',
					'finish_auth' : 'Fim da Autoriza&ccedil;&atilde;o',
					// G
					'geotag' : '"geotag" esta foto',
					// L
					'loading_details' : 'Pegando detalhes do evento',
					// M
					'metro' : 'Metro',
					// S
					'script_title' : 'Ferramenta do evento "Upcoming.org"',
					'searching' : 'Buscando',
					'see_other' : '<b>Veja outras fotos</b> deste evento feitas por: @this_user@, @everyone@',
					'select_event' : 'Selecione o evento onde esta foto foi tirada',
					// T
					'this_user' : 'Este usu&aacute;rio',
					// V
					'venue' : 'Local'
				},

				defaultLang: 'en-us'
			}),

		init: function() {

			if(unsafeWindow.page_photo_id) {
				var privacy_and_upcoming = document.evaluate(
															 "//p[@class='Privacy']",
															 document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
															 ).singleNodeValue;

				var div;
				var links = privacy_and_upcoming.getElementsByTagName('a');
				if(links.length > 0) {
					for(var i = 0; i < links.length; i++) {
						link = links[i];
						var matches;
						if(matches = /http:\/\/upcoming.org\/event\/([0-9]+)/.exec(link.href)) {
							this.tagged = true;
							this.event_id = matches[1];
							break;
						}
					}
					link.parentNode.appendChild(document.createElement('br'));
					div = link.parentNode.appendChild(document.createElement('div'));
				} else {
					privacy_and_upcoming.appendChild(document.createElement('br'));
					div = privacy_and_upcoming.appendChild(document.createElement('div'));
				}
				if(!this.upcoming_token) {
					var img = div.appendChild(document.createElement('img'));
					img.align="left";
					img.alt=this.localiser.localise("script_title");
					  img.className="f-machinetag-sprite fs-icon_upcoming_over";
					img.src="http://l.yimg.com/g/images/spaceout.gif";
					div.appendChild(document.createTextNode(this.localiser.localise('auth_1')));
					var a = div.appendChild(document.createElement('a'));
					a.innerHTML = 'here';
					a.target = 'blank';
					a.href= 'http://upcoming.org/services/auth/?api_key='+this.UPCOMING_API_KEY;
					div.appendChild(document.createTextNode('. '+this.localiser.localise('auth_2')+':'));
					div.appendChild(document.createElement('br'));
					var label = div.appendChild(document.createElement('label'));
					label.htmlFor = 'upcoming_frob';
					label.innerHTML = this.localiser.localise('auth_3');
					var input = div.appendChild(document.createElement('input'));
					input.id = 'upcoming_frob';
					var button = document.createElement('button');
					button.type = 'button';
					button.innerHTML = this.localiser.localise('finish_auth');
					button.addEventListener('click',getObjectMethodClosure01(this,'finishAuth',input),true);
					button.className = 'SmallButt';
					div.appendChild(button);
				} else {
					this.upcomingAuthenticated(div);
				}
			}
		},

		finishAuth: function(input) {
			this.makeUpcomingCall('auth.getToken',{frob: input.value},getObjectMethodClosure11(this,'authDone',input.parentNode),getObjectMethodClosure11(this,'authError',input.parentNode));
		},

		authDone: function(rsp,div) {
		  var token = rsp.rsp.token[0];
			this.upcoming_token = ''+token.token;
			this.upcoming_user_username = ''+token.user_username;
			this.upcoming_user_name = ''+token.user_name;
			this.upcoming_user_id = ''+token.user_id;

			GM_setValue('upcoming_token',this.upcoming_token);
			GM_setValue('upcoming_user_username',this.upcoming_user_username);
			GM_setValue('upcoming_user_name',this.upcoming_user_name);
			GM_setValue('upcoming_user_id',this.upcoming_user_id);

			this.upcomingAuthenticated(div);
		},

		authError: function(msg,div) {
			GM_setValue('upcoming_token','');
		},

		upcomingAuthenticated: function(div) {
			if(!this.tagged) {
				for each(tag in unsafeWindow.global_photos[unsafeWindow.page_photo_id].tags_rawA) {
						if(tag.indexOf('upcoming:') >= 0) {
							this.tagged = true;
							this.event_id = tag.replace('upcoming:','').replace(':','=');
						}
					}
			}
			var tagger = document.getElementById('tagadder');
			if(tagger) {
				this.canTag = true;
			}
			if(this.tagged) {
				div.innerHTML = '<img id="flickrphotocompass_wait" src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /> '+this.localiser.localise('loading_details')+'.';
				this.makeUpcomingCall('event.getInfo',{event_id:this.event_id},getObjectMethodClosure11(this,'eventInfoReceived',div),getObjectMethodClosure11(this,'standard_error',div));
			} else {
				if(this.canTag) {
					div.innerHTML = '<img id="flickrphotocompass_wait" src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" /> '+this.localiser.localise('fetch_events')+'.';
					this.makeUpcomingCall('user.getWatchlist',{user_id:this.upcoming_user_id,show:'past'},getObjectMethodClosure11(this,'eventListDetailedReceived',div),getObjectMethodClosure11(this,'standard_error',div));
				}
			}
		},

		eventInfoReceived: function(rsp,div) {
			var event = rsp.rsp.event[0];
			if(event != undefined) {
			this.events[event.id] = {id:event.id,
									  username:event.username,
									  status:event.status,
									  name: event.name,
									  tags: event.tags,
									  description: event.description,
									  start_date: event.start_date,
									  end_date: event.end_date,
									  start_time: event.start_time,
									  end_time: event.end_time,
									  personal: event.personal,
									  metro_id: event.metro_id,
									  venue_id: event.venue_id,
									  user_id: event.user_id,
									  category_id: event.category_id,
									  latitude: event.latitude,
									  longitude: event.longitude,
									  geocoding_precision: event.geocoding_precision,
									  geocoding_ambiguous: event.geocoding_ambiguous
			};
			this.displayEventInfo(div);
			} else M8_log(event);
		},


		autoTag: function(tags) {
			unsafeWindow.tagrs_addTag(unsafeWindow.page_photo_id,tags);
		},

		displayEventInfo: function(div) {
			div.innerHTML = '';
			div.setAttribute('style','position:relative;left:-18px;');
			event = this.events[this.event_id];
			var ul = div.appendChild(document.createElement('ul'));
			ul.setAttribute('style',"margin: 0;");

			var li = ul.appendChild(document.createElement('li'));
			li.className="Stats";
			  li.setAttribute('style','list-style-type:none;');
			li.innerHTML = '<img class="f-machinetag-sprite fs-icon_upcoming_over" align="left" alt="Taken at an Upcoming.org event" src="http://l.yimg.com/g/images/spaceout.gif"/><b>'+this.localiser.localise('event')+':</b> <a href="http://www.upcoming.org/event/'+event.id+'">'+event.name+'</a> ';
			if(this.canTag) {
				var a = li.appendChild(document.createElement('a'));
				a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
				a.href="javascript:;";
				a.innerHTML = '[+]';
				a.addEventListener('click',getObjectMethodClosure01(this,'autoTag','"'+event.name+'"'),true);
			}

			var li = ul.appendChild(document.createElement('li'));
			  li.setAttribute('style','list-style-type:none;');

			li.className="Stats";
			li.innerHTML = '<img class="f-machinetag-sprite fs-icon_upcoming_over" align="left" alt="Taken at an Upcoming.org event" src="http://l.yimg.com/g/images/spaceout.gif"/><b>'+this.localiser.localise('metro')+':</b> '+this.localiser.localise('searching')+'...';
			this.makeUpcomingCall('metro.getInfo',{metro_id:event.metro_id},getObjectMethodClosure11(this,'metroInfoReceived',li),getObjectMethodClosure11(this,'standard_error',li));


			var li = ul.appendChild(document.createElement('li'));
			  li.setAttribute('style','list-style-type:none;');

			li.className="Stats";
			li.innerHTML = '<img class="f-machinetag-sprite fs-icon_upcoming_over" align="left" alt="Taken at an Upcoming.org event" src="http://l.yimg.com/g/images/spaceout.gif"/><b>'+this.localiser.localise('venue')+':</b> '+this.localiser.localise('searching')+'...';
			this.makeUpcomingCall('venue.getInfo',{venue_id:event.venue_id},getObjectMethodClosure11(this,'venueInfoReceived',li),getObjectMethodClosure11(this,'standard_error',li));


			if(event.description+"") {
				var li = ul.appendChild(document.createElement('li'));
			  li.setAttribute('style','list-style-type:none;');

				li.className="Stats";
				li.innerHTML = '<b>'+this.localiser.localise('description')+':</b> '+wbr(event.description);
			}

			var li = ul.appendChild(document.createElement('li'));
			  li.setAttribute('style','list-style-type:none;');

			li.className="Stats";
			li.innerHTML = '<img class="f-machinetag-sprite fs-icon_upcoming_over" align="left" alt="Taken at an Upcoming.org event" src="http://l.yimg.com/g/images/spaceout.gif"/>'+this.localiser.localise('see_other',{
					'this_user':'<a class="Plain" href="'+unsafeWindow.global_photos[unsafeWindow.page_photo_id].ownersUrl+'/tags/upcomingevent'+this.event_id+'">'+this.localiser.localise('this_user')+'</a>', 'everyone':'<a class="Plain" href="http://www.flickr.com/photos/tags/upcomingevent'+this.event_id+'">'+this.localiser.localise('everyone')+'</a>'});
		},

		metroInfoReceived: function(rsp,li) {
			var metro = rsp.rsp.metro[0];

			this.makeUpcomingCall('state.getInfo',{state_id:metro.state_id},getObjectMethodClosure12(this,'stateInfoReceived',li,metro),getObjectMethodClosure11(this,'standard_error',li));
		},

		stateInfoReceived: function(rsp,li,metro) {
			var state = rsp.rsp.state[0];

			this.makeUpcomingCall('country.getInfo',{country_id:state.country_id},getObjectMethodClosure13(this,'countryInfoReceived',li,metro,state),getObjectMethodClosure11(this,'standard_error',li));
		},

		countryInfoReceived: function(rsp,li,metro,state) {
			var country = rsp.rsp.country[0];
			li.innerHTML = '<img class="f-machinetag-sprite fs-icon_upcoming_over" align="left" alt="Taken at an Upcoming.org event" src="http://l.yimg.com/g/images/spaceout.gif"/><b>'+this.localiser.localise('metro')+':</b> <a href="http://upcoming.org/metro/'+country.code+'">'+country.name+'</a> > <a href="http://upcoming.org/metro/'+country.code+'/'+state.code+'">'+state.name+'</a> > <a href="http://upcoming.org/metro/'+country.code+'/'+state.code+'/'+metro.code+'">'+metro.name+'</a> ';
			if(this.canTag) {
				var a = li.appendChild(document.createElement('a'));
				a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
				a.href="javascript:;";
				a.innerHTML = '[+]';
				a.addEventListener('click',getObjectMethodClosure01(this,'autoTag','"'+country.name+'" "'+state.name+'" "'+metro.name+'" "'+country.name+'>'+state.name+'>'+metro.name+'"'),true);
			}
		},

		venueInfoReceived: function(rsp,li) {
			var venue = rsp.rsp.venue[0];
			/*<venue id="2142" name="Alex Theatre" address="216 N. Brand Blvd."
			  city="Glendale, CA" zip="91203" phone="818-243-ALEX"
			  url="http://www.alextheatre.org/" description="The 1,450-seat Alex Theatre
			  is a historic, cultural and artistic treasure built in 1925 as the
			  Alexander Theatre, a vaudeville and motion picture house with Greek and
			  Egyptian motifs." user_id="1" private="0"
			  latitude="37.9183" longitude="-122.024" geocoding_precision="zip"
			  geocoding_ambiguous="0"
			  />*/

			li.innerHTML = '<img class="f-machinetag-sprite fs-icon_upcoming_over" align="left" alt="Taken at an Upcoming.org event" src="http://l.yimg.com/g/images/spaceout.gif"/>';
			var b = li.appendChild(document.createElement('b'));
			b.innerHTML = this.localiser.localise('venue')+': ';

			var venue_link = li.appendChild(document.createElement('a'));
			venue_link.href= venue.url;
			venue_link.innerHTML = venue.name+' ';
			if(this.canTag) {
				var a = li.appendChild(document.createElement('a'));
				a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
				a.href="javascript:;";
				a.innerHTML = '[+]';
				a.addEventListener('click',getObjectMethodClosure01(this,'autoTag','"'+venue.name+'"'),true);
			}

			var ul = li.appendChild(document.createElement('ul'));
			//			ul.setAttribute('style','list-style-type:none;');

			if(venue.address+"") {
				var li2 = ul.appendChild(document.createElement('li'));
			  li.setAttribute('style','list-style-type:none;');

				li2.className = 'Stats';
				li2.setAttribute('style','list-style-type:none; list-style-image:none;');
				li2.innerHTML = venue.address+' ';
				if(this.canTag) {
					var a = li2.appendChild(document.createElement('a'));
					a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
					a.href="javascript:;";
					a.innerHTML = '[+]';
					a.addEventListener('click',getObjectMethodClosure01(this,'autoTag','"'+venue.address+'"'),true);
				}
			}

			if(venue.city+"") {
				var li2 = ul.appendChild(document.createElement('li'));
				li2.className = 'Stats';
				li2.setAttribute('style','list-style-type:none; list-style-image:none;');
				li2.innerHTML = venue.city+' ';
				if(this.canTag) {
					var a = li2.appendChild(document.createElement('a'));
					a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
					a.href="javascript:;";
					a.innerHTML = '[+]';
					a.addEventListener('click',getObjectMethodClosure01(this,'autoTag','"'+venue.city+'"'),true);
				}
			}

			if(venue.zip+"") {
				var li2 = ul.appendChild(document.createElement('li'));
				li2.className = 'Stats';
				li2.setAttribute('style','list-style-type:none; list-style-image:none;');
				li2.innerHTML = venue.zip+' ';
				if(this.canTag) {
					var a = li2.appendChild(document.createElement('a'));
					a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
					a.href="javascript:;";
					a.innerHTML = '[+]';
					a.addEventListener('click',getObjectMethodClosure01(this,'autoTag','"'+venue.zip+'"'),true);
				}
			}

			if(unsafeWindow.global_photos[unsafeWindow.page_photo_id].isOwner && venue.longitude+"" && venue.latitude+"" && venue.geocoding_ambiguous*1 == 0) {
				var li2 = ul.appendChild(document.createElement('li'));
				li2.setAttribute('style','list-style-type:none; list-style-image:none;');
				li2.className = 'Stats';
				var a = li2.appendChild(document.createElement('a'));
				a.setAttribute('style',"text-decoration: none; color: rgb(201, 201, 201);");
				a.innerHTML = this.localiser.localise('geotag');
				a.href="javascript:;";
				a.addEventListener('click',getObjectMethodClosure03(this,'setLatLon',venue.latitude,venue.longitude,venue.geocoding_precision),true);
			}

		},

		setLatLon: function(lat,lon,precision) {
			var accuracy = 6; //default accuracy is ~region accuracy
			switch(precision) {
				case 'zip':
					accuracy = 11;
					break;
				case 'address':
					accuracy = 16;
					break;
			}
			var listener = {
				flickr_photos_geo_setLocation_onLoad: function(success, responseXML, responseText, params){
					if(DEBUG) M8_log(responseText);
				}
			};

			unsafeWindow.F.API.callMethod('flickr.photos.geo.setLocation', {photo_id:unsafeWindow.page_photo_id,lat:lat,lon:lon,accuracy:accuracy}, listener);
		},

		/*		eventListReceived: function(rsp,div) {
				var event_ids = '';
				for each(w in rsp..watchlist) {
				event_ids += ','+w.@event_id;
				}
				event_ids = event_ids.substr(1);
				this.makeUpcomingCall('event.getInfo',{event_id:event_ids},getObjectMethodClosure11(this,'eventListDetailedReceived',div),getObjectMethodClosure11(this,'standard_error',div));

				},*/

		eventListDetailedReceived: function(rsp, div) {
			var select = document.createElement("select");
			select.id = 'upcoming_event_select';
			select.setAttribute("style","display:block;");
			for each(event in rsp.rsp.event) {
					var name=""+event.name;
					if(name.length > 50) {
						name = name.substring(0,47)+"...";
					}

					var option = select.appendChild(document.createElement("option"));
					option.value = event.id;
					option.innerHTML = name+' ('+event.start_date+')';
					this.events[event.id] = {id:event.id,
											  username:event.username,
											  status:event.status,
											  name: event.name,
											  tags: event.tags,
											  description: event.description,
											  start_date: event.start_date,
											  end_date: event.end_date,
											  start_time: event.start_time,
											  end_time: event.end_time,
											  personal: event.personal,
											  metro_id: event.metro_id,
											  venue_id: event.venue_id,
											  user_id: event.user_id,
											  category_id: event.category_id,
											  latitude: event.latitude,
											  longitude: event.longitude,
											  geocoding_precision: event.geocoding_precision,
											  geocoding_ambiguous: event.geocoding_ambiguous
					};
				}
			var button = document.createElement('button');
			button.type = 'button';
			button.innerHTML = this.localiser.localise('Tag');
			button.addEventListener('click',getObjectMethodClosure01(this,'tagPhoto',select),true);
			button.className = 'SmallButt';
			var label = div.appendChild(document.createElement('label'));
			label.htmlFor = 'upcoming_event_select';
			label.innerHTML = this.localiser.localise('select_event')+':';
			label.setAttribute("style","display:block;");
			div.innerHTML = '';
			var img = div.appendChild(document.createElement('img'));
			img.align="left";
			img.alt= this.localiser.localise('script_title');
			img.src="/images/icon_upcoming_over.gif";
			div.appendChild(label);
			div.appendChild(select);
			div.appendChild(button);
		},

		tagPhoto: function(select) {
			unsafeWindow.tagrs_addTag(unsafeWindow.page_photo_id,'"upcoming:event='+select.value+'" upcoming');
			this.event_id = select.value;
			this.displayEventInfo(select.parentNode);
		},

		makeUpcomingCall: function(method,params,callback,error) {
			var url_params = '&format=json';
			for (p in params) {
				url_params += '&'+encodeURIComponent(p)+'='+encodeURIComponent(params[p]);
			}
			if(this.upcoming_token) url_params += '&token='+this.upcoming_token;
			if(DEBUG) M8_log(url_params);
			GM_xmlhttpRequest({method: "GET",
						url: UPCOMING_API_URL+"/?api_key="+this.UPCOMING_API_KEY+'&method='+encodeURIComponent(method)+url_params,
						headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
							"Accept": "application/atom+xml,application/xml,text/xml",
							},
						onload: function(req) {
						if(DEBUG) M8_log(req.responseText);
						var rsp = req.responseText.replace(/<\?xml.*\?>/,'');
						if (rsp == null) {
							error( "Could not understand Upcoming's response. "+req.responseText);
						}
						  var answer = eval('('+rsp+')');
						var stat = answer.rsp.stat;
						if (stat == null) {
							error( "Could not find status of Upcoming request. "+req.responseText);
						}

						if (stat != 'ok') {
							if (stat == 'fail') {
								error("Upcoming error: "+answer.rsp.error.msg);
							} else {
								error("Uknown Upcoming error. "+req.responseText);
							}
						}
						if(DEBUG) M8_log(answer);
						callback(answer);
					}
				});
		},

		standard_error: function(msg,div) {
			div.innerHTML = this.localiser.localise('error');
		}
	}

	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
				var flickrgp = new flickrupcomingevent();
			}, false);
	} catch (ex) {}
})();
