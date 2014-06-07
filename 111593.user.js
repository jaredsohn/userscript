
// -*- Mode: Javascript; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 2 -*-
// -*- Mode: Javascript; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 2 -*-
/*******************************************************************************
	(C)2011+ Nokraden and others
	Authors:	Nokraden <http://userscripts.org/users/393928>
				TriMoon <http://claimid.com/trimoon>

	This work is licensed under a Creative Commons License !
	See: http://creativecommons.org/licenses/by-nc-nd/3.0/

	script-icon converted after manual manipulation by TriMoon from:
	"http://photos-f.ak.fbcdn.net/photos-ak-snc1/v43/222/144959615576466/app_2_144959615576466_4719.gif"

	See also:
		http://wiki.greasespot.net/Metadata_Block
		http://www.greywyvern.com/code/php/binary2base64
		http://www.loc.gov/standards/iso639-2/php/code_list.php
*******************************************************************************/
// ==UserScript==
// @version			1.0.0
// @name				The Sims Social
// @description	Assists Wall Manager with The Sims Social posts, See: http://userscripts.org/scripts/show/86674
// @include	http://apps.facebook.com/thesimssocial/feed?*
// @include	http://simssoc.game.playfish.com/g/fb/simssoc/feed?*
// @include	/^http(s)?://.*facebook\.com/.*$/
// @exclude	/^http(s)?://.*channel\.facebook\.com/.*$/
// @exclude	/^http(s)?://.*facebook\.com/(profile|editaccount|friends|settings|help|log(in|out)|ajax|reqs|campaign|notifications|editprofile|posted|plugins|.*/posts/).*$/
// @exclude	/^http(s)?://.*facebook\.com/home\.php\?sk=group_.*$/
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKBAgQKXecEj8AAABTdEVYdENvbW1lbnQAKEMpMjAxMSsgVHJpTW9vbiBJbmMuIGh0dHA6Ly9jbGFpbWlkLmNvbS90cmltb29uCkNyZWF0ZWQgdXNpbmc6IEdJTVAgMi42LjExxjI3DQAAAmlJREFUOMuFU09IFHEYfb+Z/c3sOrPiJru6elgUjBI8JEXZIVwIOkkURQQGmYfKQ9RBgpCoIIOIosQuoVlKlyAQ6uAhKjKCMJHKdiNF/Jew2G7uzu7Ozvxmvk4Fuat98N0e7/F97z1GRCg17DXzKHO4FtEiO1cK8+2ZE5QohZOwwcjf0ab50HS7pY/nLNxkd5iPRa961uM8JdWHWENAx63pw7EfEmQ54FeOpyXrvQ0MFIGJqGi1Rxg7MIFpl5xMQRTmj37YEy8fQZIPonk9tugEPsB668LYe7Hp8k8GSQeAyJbqXFUYOgN6/cMstOEP+CCL6j50RpuQ38W7dACwhWMuLRg8GIKt69idM9FdkkB5yJoBXG/ZDq25Yl9CZ1U7sk76643J7uREPB60DGTr6+DCxEnWzw4WEUgM92or0bi1Fi4zthlDsYE3x95GlZGPzyPJ2Qo1nYSj6WCM4CBRfp+drikDAPYnB94hNq5yNIYqIMLeoBy0PA6XFKHCa68xy/NyZs415gIqSOag/C+0ZRuolcRfG13COdNCn3BQb4hVt2d/taRxkwMmf5EgNjqmZWCrfgSytiecbbdbSfyTA6uDJvkg60llMJxaJDFaI3m3Vkn4lpRoKqYI2ORDpeFKIeOufYbelXTBPkWv8hYeCwn86adl8eyL4sykZPdzfCEHhVR4xawL9G8a5UIHXRI+TGl+yOFKkwe5kI2CVAbNysFvXqCzlPpvFwrA+dUU0vHFFVpOLbkwNR2K84S6aLwo9hu10fOAHXIN9Hm9kPIJfwyhzJH16psSAIA6yK44Aq3OmtpJ3eZsqdL+BtGmIpn9swq0AAAAAElFTkSuQmCC
// @license			http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript== 
(function() { 

	//********************************************************************************
	//***** the auto update function needs a easy way to get the current version *****
	//***** this should match the @version above                                 *****
	//********************************************************************************
	var version = "1.0.0";

	//********************************************************************************
	//***** the following functions are provided under creative commons          *****
	//********************************************************************************

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

	// Returns index to text S in a string. Works nicely as a boolean expression.
	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	// Returns true if string starts with text S
	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	// Short form for evaluate function, returns a DOM node selection
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	}

	// Short form for evaluate function, returns a single DOM node
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	}

	// Fires event on element
	function fireEvent(element,event){
    		var evt = document.createEvent("HTMLEvents");
    		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    		return !element.dispatchEvent(evt);
	};

	// Clicks object E. Only fires the click event, not any events that open links.
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	// params:
	//	a: element tag, such as html, body, a, img
	//	b: properties list as a JSON object
	//	c: an array of child elements
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}
	
	//********************************************************************************
	//***** this section must be tailored to fit your specific needs             *****
	//***** instructions are included in each section                            *****
	//********************************************************************************

	function dock(){  
		//check that dock exists  
		var door=$('wmDock');  
		if (!door) {  
			//cannot find dock  
			window.setTimeout(dock, 1000);  
			return;  
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app144959615576466');
		if (doorMark) return; //already posted to door

	
		var attachment={
			appID:			'144959615576466',
			alias:			'SS',
			hrefKey:			'pf_feed_token',
			name:				'Sims Social',
			thumbsSource:	'<your_game_assets_url_here>',
			flags: {
				httpsTrouble:	false,
				requiresTwo:	false
			},
			
			accText: {
				Simoleons:		'Simoleons',
				Reward:			'Reward',
				Help:				'Help',
				SocialPoints:	'SocialPoints',
				Goodwill:		'Goodwill',
				Love:				'Love',
				Gift:				'Gift',
				Fury:				'Fury',
				Entertainment:	'Entertainment',
			},

			tests: [
	/* Listed/sorted for readability and maintainability in order of:
			1-	accText[] types
			2-	language, EN first. (see iso-codes)
			3-	Alphabetical
		Comments at end-of-line indicate contributor's name if it's not the script author.
	*/
	//	Simoleons
				{ret:"Simoleons",			link:"Get free simoleons"},
				{ret:"Simoleons",			link:"Get Simoleons"},
		//	DE - German
				{ret:"Simoleons",			link:"Hol dir Simoleons"},				// Milius
				{ret:"Simoleons",			link:"Kostenlose Simoleons"},			// Milius
				{ret:"Simoleons",			link:"Simoleons erhalten"},			// Milius
		//	FR - French
				{ret:"Simoleons",			link:"Obtenir des simflouz"},			// Milius
				{ret:"Simoleons",			link:"Récupérer simflouz"},			// Milius
		//	IT - Italian
				{ret:"Simoleons",			link:"Ricevi simoleon"},				// Milius
				{ret:"Gift",				link:"Ricevi simoleon gratis"},				// GarfieldMacak				
		//ES - Spanish
				{ret:"Gift",				link:"Obtener simoleones gratis"},				// GarfieldMacak				
				{ret:"Gift",				link:"Conseguir simoleones"},				// GarfieldMacak				
	//	Reward
				{ret:"Reward",				link:"Claim Reward"},
				{ret:"Reward",				link:"Claim Rewards"},
				{ret:"Reward",				link:"Claim your reward"},				// Milius
				{ret:"Reward",				link:"Get Reward"},
				{ret:"Reward",				link:"Help and claim rewards"},		// TriMoon
				{ret:"Reward",				link:"Sign here and claim rewar"},	// Milius
				//	DE - German
				{ret:"Reward",				link:"Belohnung abholen"},				// Milius
				{ret:"Reward",				link:"Belohnung erhalten"},			// Milius
				{ret:"Reward",				link:"Belohnung holen"},				// Milius
				{ret:"Reward",				link:"Hier unterschreiben und B"},	// Milius
				//	ES - Spanish
				{ret:"Reward",				link:"¡Firma aquí y pide recomp"},	// Milius
				{ret:"Reward",				link:"Ayudar y solicitar recomp"},	// GarfieldMacak
				{ret:"Gift",				link:"Pedir recompensas"},				// GarfieldMacak
				//	FR - French
				{ret:"Reward",				link:"Prendre récompenses"},			// Milius
				{ret:"Reward",				link:"Récupérer récompense"},			// Milius
				{ret:"Reward",				link:"Signe ici et obtiens des"},	// Milius, corrected by TriMoon
				{ret:"Gift",				link:"Prends ta récompense"},				// GarfieldMacak
				{ret:"Gift",				link:"Récup. récompenses"},				// GarfieldMacak				
				{ret:"Gift",				link:"Un service contre une réc"},				// GarfieldMacak				
				{ret:"Gift",				link:"Jouer au jeu"},				// GarfieldMacak			
				{ret:"Gift",				link:"Service contre récompense"},				// GarfieldMacak			
				//	IT - Italian
				{ret:"Reward",				link:"Aiuta e reclama premi"},		// Milius
				{ret:"Reward",				link:"Firma qui e richiedi una"},	// Milius
				{ret:"Gift",				link:"Reclama il premio"},				// GarfieldMacak				
				{ret:"Gift",				link:"Richiedi ricompensa"},				// GarfieldMacak				
				{ret:"Gift",				link:"Ricevi intrattenimento"},				// GarfieldMacak				
				//	PT - Portuguese
				{ret:"Reward",				link:"Pedir recompensa"},				// Milius
				{ret:"Reward",				link:"Solicitar recompensas"},		// TriMoon
	//	Help
				{ret:"Help",				link:"Help "},
				//	DE - German
				{ret:"Help",				link:"Helfen und Belohnung abho"},	// Milius
				{ret:"Help",				link:"Hilf"},								// Milius
				//	FR - French
				{ret:"Help",				link:"Aider"},								// Milius
				//	IT - Italian
				{ret:"Help",				link:"Aiuta"},								//	TriMoon
	//	SocialPoints
				{ret:"SocialPoints",		link:"Get Social Points"},
				//	DE - German
				{ret:"SocialPoints",		link:"Sozialpunkte erhalten"},		// Milius
				//	ES - Spanish
				{ret:"SocialPoints",		link:"Conseguir puntos sociales"},	// Milius
				{ret:"SocialPoints",		link:"Conseg. p. sociales"},			// Milius
				{ret:"Gift",				link:"Consigue puntos sociales"},				// GarfieldMacak
				//	IT - Italian
				{ret:"SocialPoints",		link:"Ricevi punti sociali"},			// Milius
				{ret:"Gift",				link:"Obtenir des points sociau"},				// GarfieldMacak					
	//	Goodwill
				{ret:"Goodwill",			link:"Get Goodwill"},
				//	DE - German
				{ret:"Goodwill",			link:"Wohlwollen erhalten"},			// Milius
				//	ES - Spanish
				{ret:"Goodwill",			link:"Ayúdame"},							// Milius
				{ret:"Gift",				link:"Conseguir Buena voluntad"},				// GarfieldMacak
	//	Love
				{ret:"Love",				link:"Get some Love"},
				// ES - Spanish
				{ret:"Gift",				link:"Consigue Amor"},				// GarfieldMacak				

	//	Gift
				{ret:"Gift",				link:"Accept Gift and Decide"},		// Milius
				{ret:"Gift",				link:"Collect Gift"},
				//	DE - German
				{ret:"Gift",				link:"Geschenk abholen"},				// Milius
				//	ES - Spanish
				{ret:"Gift",				link:"Recoge tu regalo"},				// Milius
				{ret:"Gift",				link:"Aceptar el regalo y decid"},				// GarfieldMacak
				{ret:"Gift",				link:"Aceptar y decidir"},				// GarfieldMacak
				
				//	IT - Italian
				{ret:"Gift",				link:"Reclama il tuo premio"},		// Milius
				{ret:"Gift",				link:"Raccogli il regalo"},				// GarfieldMacak				
	//	Fury
				{ret:"Fury",				link:"Get Fury"},
	//	Entertainment
				{ret:"Entertainment",	link:"Get Entertainment"},				//	TriMoon
			],

			menu: {
				// Provide a menu tree below as a JSON object
				// Accepted menu item types include: separator, optionblock, link, checkbox, radio, select, hidden, textarea
				
				SSsection_main:{type:"section",label:"sims Social Manager Options ("+version+")",kids:{
					SSupdateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/111593.user.js"},
					SSsep:{type:"separator",label:"Reuests",kids:{
						Help:{type:"checkbox",label:"Help Out Friends"},
						Simoleons:{type:"checkbox",label:"Get Simoleons"},
						Reward:{type:"checkbox",label:"Get Reward"},
						SocialPoints:{type:"checkbox",label:"Get Social Points"},
						Goodwill:{type:"checkbox",label:"Get Goodwill"},
						Love:{type:"checkbox",label:"Get Love"},
						Gift:{type:"checkbox",label:"Get Gift"},
						Fury:{type:"checkbox",label:"Get Fury"},
						Entertainment:{type:"checkbox",label:"Get Entertainment"},
					}},
				}},
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app144959615576466','data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	

	var main = {

		sendMessage : function (s){
			unsafeWindow.top.location.hash = s;
		},

	//********************************************************************************
	//***** this section must be tailored to fit your specific needs             *****
	//***** instructions are included in each section                            *****
	//********************************************************************************

		run : function (){
			// check that we are in the overlay window
			//try{if (!unsafeWindow.location.href.find('overlayed=true')) return;}
			//catch(e){window.setTimeout(main.run,500);return;}

			try{
				var statusCode=0;
				var doc=document.documentElement;
				var text=doc.textContent;
				var html=doc.innerHTML;

				// you may wish to use a gameLoaded variable, supply a statement that determines if the game has loaded
				// an example gameLoaded query is provided
				var gameLoaded=unsafeWindow.location.href.startsWith('http://<addres>/<page>?') && html.contains('object id="flashapp"');

			} catch(e){window.setTimeout(main.run,500);return;}

		//*************************************************************************************
		//***** this section must be tailored to fit your specific needs                  *****
		//***** below is a list of searches for text pertaining to various messages       *****
		//***** the list below is not generic and targets Empires and Allies specifically *****
		//***** you will need to find the specific texts for the game you selected        *****
		//*************************************************************************************
		//***** The WM script can recieve and act on the following statusCode values:     *****
		/*
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed",
			"-2":"None Left",
			"-3":"Over Limit",
			"-4":"Over Limit, Sent One Anyway",
			"-5":"Server Error",
			"-6":"Already Got",
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link",
			"-9":"Final Request Returned Null Page",
			"-10":"Final Request Failure",
			"-11":"Expired",
			"-12":"Not a Neighbor",
			"-13":"Requirements not met",

			//additional codes may now exist, please check the script source lines: ~1408+
		*/
		//*************************************************************************************

			if (html.find("Congratulations"))statusCode=1;
			else if (html.find("Sorry, you've already claimed this gift"))statusCode=-6;
			else if (html.find('Sorry, this gift was intended for someone else!'))statusCode=-13;
			else if (html.find('handle any more gifts for the day'))statusCode=-3;
			else if (html.find('You have claimed'))statusCode=1;
			else if (html.find('Fangs for the memories'))statusCode=1;
			else if (html.find('Sorry, you have to be friends with this person to click their feeds'))statusCode=-12;
			else if (html.find('Sorry, all the gifts have been claimed'))statusCode=-2;

			else if (doc.textContent=="")statusCode=-5;  //no document body

			//multi-lingual checking, but status codes are very limited
			else if (html.find('notAccepted'))statusCode=-1;

			//using premade gameLoaded variable from above
			else if (gameLoaded)statusCode=1;

			// At this point you may need to collect an action link: a link to finalize the bonus collection process
			// if the sidekick would be compromized if it clicked the link itself

			// The link will be passed back to the main WM script and called via a http request without document events
			// I use this primarily for CW and FrV so I can track a bonus collection without loading the game
			// preserving memory and time

			// If you need to pass back an action from a form, be sure to collect the entire list of form parameters so as to not be detected
			// by excluding stuff they expect

			// to use this action link ability, in the flags object in the dock function, set "requiresTwo" to true
			// the action link must be in a string containing brackets and does not need to be urlencoded like this: "[<action_link_url_here>]"

			var link;

			// here we actually pass back the status code
			if (statusCode!=0) main.sendMessage("status="+statusCode+(link?link:''))						
			else window.setTimeout(function(e){main.run();},500);
		},

	};

	//check for dock.
	if( $('wmDock') ){
		dock();
		return;
	}else	main.run();
})(); // anonymous function wrapper end
