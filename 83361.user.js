// ==UserScript==
// @name           OGame-Pro-Barrierefrei
// @namespace      OGame-Pro-Barrierefrei
// @include        http://uni*.ogame.de/game/index.php?page=*
// ==/UserScript==


if(typeof console == 'undefined') {
	console = { log: function() {}, info: function() {}, error: function() {} };
}
if(typeof JSON == 'undefined') {
	JSON = { parse: function() {}, stringify: function() {} };
}

//context holen
var mywindow = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;

// nicht in frames ausführen (sollte durch @include eh abgefangen sein)
var isFrame = (mywindow.top.frames.length == 0) ? false : true;
if (isFrame) return "its a frame";

var OGameProperties = {
		language:  'DE',
		// LoCa
		'DE': {
			lang: 'DE', //just4debug
			resources_metal: "Metall",
			resources_crystal: "Kristall",
			resources_deuterium: "Deuterium",
			resources_darkmatter: "Dunkle Materie",
			resources_energy: "Energie",
			menu_resourceSettings: "Produktionseinstellungen",
			menu_movement: "Flottenbewegung(en)"
		},
		'EN': {
			lang: 'EN', //just4debug
			resources_metal: "metal",
			resources_crystal: "crystal",
			resources_deuterium: "deuterium",
			resources_darkmatter: "dark matter",
			resources_energy: "energy"
		},
		properties: {
			accesskeys: {
				overview: 	"ü", //Übersicht
				resourceSettings: "p", //Versorgungseinstellungen
				resources: "r", //Versorgung 
				station: 	"n", // Anlagen (Buildings)
				trader: 	"h", //Händler
				research: "f", //Forschung
				shipyard: 	"w", //Schiffswerft
				defense: 	"v", //Verteidigung (Defense)
				movement: "b", // Flottenbewergungen
				fleet1:		"l", //Flotte
				galaxy: 	"x", //Galaxie
				empire: 	"i", //Imperium
				alliance: 	"a", //Allianz
				premium: "o" //Offizierskasino
			}
		}, // properties
		getLocaString: function (property){
			if (!property) 
				return "warning: argument 'property' not set";
			if (!this[this.language]) 
				return "warning: language ("+this.language+") is not availeable ";
			if (!this[this.language].hasOwnProperty(property)) 
				return "warning: loca property ('"+property+"') for language ("+this.language+") is not set";
			console.log("property '"+property+"' => "+this[this.language][property]);
			return this[this.language][property];
		},
		getProperty: function (property){
			console.log("property '"+property+"' => "+ this.properties[property]);
			return this.properties[property] || "";
		}
};

var OGameTools = {
		that: this,
		initialized: false,
    		debug: true,
		version: "0.5",
		isFrame: isFrame,
		dom: {
			head: document.getElementsByTagName('head')[0],
			body: document.getElementsByTagName('body')[0],
			createStylesheet: function()
			{
				document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
				this.stylesheet = document.styleSheets[document.styleSheets.length-1];
			},
			lineBreak: document.createElement("br"),
			insertCSSRule: function (rule) {
				if (!this.stylesheet)
					this.createStylesheet();
				this.stylesheet.insertRule(rule, 0);
			},
			/**
			 * Erstellt ein neuen Javascript container und schreibt den content ungefiltert rein.
			 */
			addJavaScript: function (content) {
				var js = mywindow.document.createElement('script');
				js.setAttribute("type", "text/javascript");
				js.appendChild(mywindow.document.createTextNode(content));
				this.head.appendChild(js);
			}
		},
		Utils: 
		{
			//that: this,
			/**
			 * loggt den uebergebenen String in die zB Firebug Console
			 */
			log: function (msg) {	
				if (OGameTools.debug) 
					console.log(msg);
			},
			info: function (msg) {	
				if (OGameTools.debug) 
					console.info(msg);
			},
			error: function (err) {	
				if (OGameTools.debug) 
					console.error(err);
			},
			filterHTML: function(text){
				return text
								.replace(/<(?:.|\s)*?>/g,"")
								.replace("|","");
			},
			version_compare: function( a, b ) {
				var a_versions = a.split( "." );
				var b_versions = b.split( "." );
				var max_parts = Math.max( a_versions.length, b_versions.length );
				for( var i = 0; i < max_parts; i++ ) {
					var a_part = a_versions[i] * 1;
					var b_part = b_versions[i] * 1;
					if( a_part == b_part ) { continue; }
					if( a_part > b_part ) return true;
					return false;   
				}
				return null;
			},

			/**
			 *  aehnlich zur printf php methode ersetzt diese funktion die platzhalter im string mit uebergebenen variablen
			 */
			sprintf: function() {
				if (arguments.length < 2) return null;
				
				var data = arguments[0];
				for (var k = 1; k < arguments.length; ++k)  
				{
					switch (typeof(arguments[k])) 
					{
						case 'number':
						case 'string':
							data = data.replace(/%any/, arguments[k]);
							break;
						/*case 'string':
							data = data.replace(/%s/, arguments[k]);
							break;
						case 'number':
							data = data.replace(/%d/, arguments[k]);
							break;*/
						case 'boolean':
							data = data.replace(/%b/, arguments[k] ? 'true' : 'false');
							break;
						default:
							/// function | object | undefined
							break;
					}
				}
				return data;
			},
			pagesettings: {
				elemente: {},
				parameter: {},
				/*
				 * Splittet die URL in die bestandteile 'url','protocol','slash','host','port','path','parameter','anker' 
				 * und die Parameter anhand von & und = in das parameter array
				 */
				init: function() 
				{
					var url = mywindow.location;
					var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^ #]*))*(?:#(.*))?$/;
					var result = parse_url.exec(url);
					var names = ['url', 'protocol', 'slash', 'host', 'port', 'path', 'parameter', 'anker'];
					for (var i=0; i < names.length; i += 1) {
					    this.elemente[names[i]] = result[i] || "";
					}
					var paramssearch = this.elemente[ 'parameter' ].split( '&' );
					for (var i = 0; i < paramssearch.length; i += 1 ) {
					    var splittet = paramssearch[ i ].split( "=" );
					    this.parameter[ splittet[ 0 ] ] = splittet[ 1 ];
					}
				}
				
			},//pagesettings
			getElement: function(elemname) {
				return this.pagesettings.elemente[elemname] || "";	
			}, 
			getParameter: function(elemname) {	
				return this.pagesettings.parameter[elemname] || "";	
			},
			getJQuery: function () {	
				try 
				{	if (typeof(mywindow['jQuery']) === 'undefined') {
					mywindow.setTimeout(OGameTools.Utils.getJQuery, 100);
					} else {
						$ = mywindow['jQuery'];
					}
				} catch(err) {
					console.error(err);//Handle errors here
				}
			}//getJQuery
		},// Utils
		/**
		 * aus der OGame helpers.js kopiert und aufbereitet
		 */
		DateTools: {
			days: [ 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

			/**
			 * @param Timestamp des gewuenschten Datum und das Datumformat
			 * @return formatiertes Datum (String) 
			 */
			getFormatedDate: function (timestamp, format)  {
				var currTime = new Date();
				currTime.setTime(timestamp);
				str = format;
				str = str.replace('[d]', this.dezInt(currTime.getDate(),2));
				str = str.replace('[D]', this.days[currTime.getDay()]);
				str = str.replace('[m]', this.dezInt(currTime.getMonth()+1,2));
				str = str.replace('[M]', this.months[currTime.getMonth()]);
				str = str.replace('[j]', parseInt(currTime.getDate()));
				str = str.replace('[Y]', currTime.getFullYear());
				str = str.replace('[y]', currTime.getFullYear().toString().substr(2,4));
				str = str.replace('[G]', currTime.getHours());
				str = str.replace('[H]', this.dezInt(currTime.getHours(), 2));
				str = str.replace('[i]', this.dezInt(currTime.getMinutes(), 2));
				str = str.replace('[s]', this.dezInt(currTime.getSeconds(), 2));
				return str;
			},
		
			/** * adds prefix digits to a number ('2'->'02')
			 *
			 * @param int   number
			 * @param int   digits
			 * @param str   prefix, default is '0'
			 */
			dezInt: function (num, size, prefix)  {
			    prefix = (prefix) ? prefix : "0";
			    var minus = (num < 0) ? "-" : "",
			    result = (prefix === "0") ? minus : "";
			    num = Math.abs(parseInt(num,10));
			    size -= ("" + num).length;
			    for (var i = 1; i <= size ; i++) {
			    	result += "" + prefix;
			    }
			    result += ((prefix !== "0") ? minus : "") + num;
			    return result;
			},
			/**
			 * @return gibt den aktuellen DatumString im Format [d].[m].[Y] [H]:[i] zurueck
			 */
			getDate: function () {
				formattedDate = this.getFormatedDate(new Date().getTime(), '[d].[m].[Y] [H]:[i]');
				OGameTools.Utils.log(formattedDate); 
				return formattedDate; 
			}
		},//DateTools
		init: function() {
			this.isOpera = (mywindow.opera) ? true : false;
			this.isFirefox = (mywindow.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false;
			this.isChrome = (mywindow.navigator.userAgent.indexOf('Chrome') > -1 ) ? true : false;
			this.Utils.getJQuery();
			this.Utils.pagesettings.init();
			
			this.initialized = true;
		}
	};//OGameTools


var OGameBarrierefrei = {
		init: function (){
			console.info("OGameBarrierefrei.init()");
			var page = OGameTools.Utils.getParameter( 'page' );
			
			if (  page === 'fleet1' 
				|| page === 'fleet2' 
				|| page === 'fleet3') 
				this.addAccesskeysFleet();
			if (page === 'fleet3')
				this.convertMissionselect();
			
			//kann allein stehen, da sie selbst schauen ob der jeweilige container existiert
			this.appendTitles();
			this.addAccesskeysMenu(); 
			this.convertPlanetListToForm(); 
			this.filterHTMLfromTitles();
			
		}, //init
		addAccesskeysFleet: function() {
					
			if ($( 'a#back' ).length) { //fleet2+3
				$( 'a#back' ).after($('<input>')
						.attr('type','button')
						.attr('value','zurück')
						.attr('accesskey','b')
						.attr('name','zurück')
						.attr('onclick','$( \'a#back\' ).click()'));
			}
			if ($( 'a#continue' ).length) {// fleet1+2
				$( 'a#continue' ).after($('<input>')
						.attr('type','button')
						.attr('value','weiter')
						.attr('accesskey','c')
						.attr('name','weiter')
						.attr('onclick','$( \'a#continue\' ).click()'));
			}
			if ($( 'a#start' ).length) { // fleet3
				$( 'a#start' ).after($('<input>')
						.attr('type','button')
						.attr('value','start')
						.attr('accesskey','c')
						.attr('name','start')
						.attr('onclick','$( \'a#start\' ).click()'));
			}
			
		},
		convertMissionselect: function(){
			var missions = $('#missions');
			if (missions.length){
				var optionshtml="";
				missions.find('*[id^=button]').each(function(){
					if ($(this).hasClass('on')){
						var buttonvalue ='#mission' + $( this ).attr( 'id' );
						buttonvalue = buttonvalue.replace('button', 'Button'); // das feld heißt missionButton4, aber der selector button4 -> replacement
						var buttonlabel = $(this).text().trim();
						var onchangevalue = "$(this.value).click()";
						optionshtml+= "<input type='radio' name='missionselect' onchange='"+onchangevalue+"' value='"+ buttonvalue + "'>" + buttonlabel + "</input>";
					}
				});
				console.log(optionshtml);
				$('#missions').after(optionshtml);
			}
		},
		addAccesskeysMenu: function(){
			var keys = OGameProperties.getProperty('accesskeys');
			var menu = $( '#menuTable' );
//			$( 'bar' ).find( '' ) // oberes menü mit accesskey 1-7 versehen
			if (menu.length) {
				for ( var key in keys ){
					menu.find( 'a[href*=' + key + ']' ).attr( 'accesskey', keys[key]);
				}
				menu.find( 'a[href*=resourceSettings]' ).attr( 'title', OGameProperties.getLocaString('menu_resourceSettings'));
				menu.find( 'a[href*=movement]' ).attr( 'title', OGameProperties.getLocaString('menu_movement'));
			}
			menu.find
		},
		appendTitles: function(){
			console.info("appendTitles()");
			var ressourcenode = $( 'ul#resources' );
			if (ressourcenode.length ){
				// Span elemente, wo ress drin stehen
				ressourcenode.find( 'span[id^=resources]' ).each( function() {
					switch($(this).attr( "id")){
						case 'resources_metal':
//							$( this ).attr( "title", OGameProperties.getLocaString("resources_metal"));
							$( this ).attr( "title",ressourcenode.find( 'li#metal_box' ).attr('title').split(":")[0]); // für jede sprache verfügbar
							break;
						case 'resources_crystal':
//							$( this ).attr( "title", OGameProperties.getLocaString("resources_crystal") );
							$( this ).attr( "title", ressourcenode.find( 'li#crystal_box' ).attr('title').split(":")[0]);
							break;
						case 'resources_deuterium':
//							$( this ).attr( "title", OGameProperties.getLocaString("resources_deuterium") );
							$( this ).attr( "title", ressourcenode.find( 'li#deuterium_box' ).attr('title').split(":")[0]);
							break;
						case 'resources_energy':
//							$( this ).attr( "title", OGameProperties.getLocaString("resources_energy") );
							$( this ).attr( "title", ressourcenode.find( 'li#energy_box' ).attr('title').split(":")[0]);
							break;
						case 'resources_darkmatter':
//							$( this ).attr( "title", OGameProperties.getLocaString("resources_darkmatter") );
							$( this ).attr( "title", ressourcenode.find( 'li#darkmatter_box' ).attr('title').split(":")[0]);
							break;
						default:
							console.log($( this ).attr( "title" ));
							break;
					}
				});
			}
		},//appendTitles
		filterHTMLfromTitles: function() {
			console.info("filterHTMLfromTitles()");
			$( '*[title]' ).each( function() {
			    $(this).attr( "title", OGameTools.Utils.filterHTML($( this ).attr( "title" ) ) );
			});
		},
		/**
		 * Das Script funktioniert nur bei eindeutigen Planetnamen fehlerfrei.
		 * Jeder Planet, der auf den aktuellen Planet matcht wird in der Selectbox als selected markiert
		 */
		convertPlanetListToForm: function() {
			console.info("convertPlanetListToForm()");
			var 	planetlistdom = {},
					worlds = {};
			if ( $( '#myPlanets' ).length > 0 ) {		    
				planetlistdom = $( '#myPlanets' );
			} else if ( $( '#myWorlds' ).length > 0 ) {
			    planetlistdom = $( '#myWorlds' );
			}
			
			if ( planetlistdom.length > 0 ) {
				$( '.smallplanet' ).each( function() {
					this.dom = {
						planet:	$( this ).find( '.planetlink' ),
						moon:	$( this ).find( '.moonlink' )
					};
					this.planet = { 
			       		type: 	  "planet",
			       		name:	  this.dom.planet.find( '.planet-name' ).text(),
			   			coords:  this.dom.planet.find( '.planet-koords' ).text(),
			   			url:		  this.dom.planet.attr( 'href' )
			       	};
					worlds[this.planet.coords+"P"] = this.planet;
					if ( this.dom.moon.length > 0 ) {
						this.moon = { 
			        		type: 	  "moon",
			        		name: this.dom.moon.attr( 'title' ).replace( "|<B>Zu ", "" ).replace( " wechseln</B>", "" ), //TODO: deutsche LOCA
			    			coords: this.planet.coords,
			    			url: this.dom.moon.attr( 'href' )
			        	};
						worlds[this.moon.coords+"M"] = this.moon;
					}
				});
				var tmpHtml = "";
		    	for ( var planet in worlds ) {
		    		if (worlds[ planet ].url === '#' || worlds[ planet ].name === $( '#selectedPlanetName' ).text() ) {
		    			tmpHtml += "<option selected='selected' value='" + worlds[ planet ].url + "'>" + worlds[planet].name + " " + worlds[planet].coords +  "</option>" ;
		    		} else {
		    			tmpHtml += "<option value='" + worlds[ planet ].url + "'>"  + worlds[planet].name + " " + worlds[planet].coords + "</option>\n" ;
		    		}
		    	}
				var selectnode = $( '<select>' )
				                     .appendTo(planetlistdom)
				                     .attr( 'id', 'planetselect' )
				                     .attr( 'name', 'planetselect' )
				                     .attr( 'onchange', 'window.location=this.value;' )
				                     .html(tmpHtml);
//				$('.smallplanet').remove(); // lt Blindman die Planetliste stehen lassen
			} //planetlistdom.length > 0
			//console.log( JSON.stringify( worlds ) );
		}//convertPlanetListToForm
	};//OGameBarrierefrei
	try  {
//		console.info("here be dragons");
		OGameTools.init();
		OGameBarrierefrei.init();
//		console.info("done");
	} catch (err)  {
		console.error(err);
//		alert(err);
	}

