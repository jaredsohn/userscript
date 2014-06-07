// -*- Mode: Javascript; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 2 -*-
/*******************************************************************************
	(C)2012+ Brigitte
	Authors:	Brigitte

	"http://photos-b.ak.fbcdn.net/photos-ak-snc7/v43/222/144959615576466/app_1_144959615576466_961.gif"

*******************************************************************************/
// ==UserScript==
// @name			The Sims Social by B
// @namespace		The Sims Social by B
// @description		Assists Wall Manager with 'The Sims Social' posts
// @include			/^https?:\/\/simssoc\.game\.playfish\.com\/g\/fb\/simssoc\/feed\?/
// @include			/^https?:\/\/\w+\.facebook\.(com|net)\/$/
// @include			/^https?:\/\/\w+\.facebook\.(com|net)\/pages\/FB-Wall-Manager\//
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKBAgQKXecEj8AAABTdEVYdENvbW1lbnQAKEMpMjAxMSsgVHJpTW9vbiBJbmMuIGh0dHA6Ly9jbGFpbWlkLmNvbS90cmltb29uCkNyZWF0ZWQgdXNpbmc6IEdJTVAgMi42LjExxjI3DQAAAmlJREFUOMuFU09IFHEYfb+Z/c3sOrPiJru6elgUjBI8JEXZIVwIOkkURQQGmYfKQ9RBgpCoIIOIosQuoVlKlyAQ6uAhKjKCMJHKdiNF/Jew2G7uzu7Ozvxmvk4Fuat98N0e7/F97z1GRCg17DXzKHO4FtEiO1cK8+2ZE5QohZOwwcjf0ab50HS7pY/nLNxkd5iPRa961uM8JdWHWENAx63pw7EfEmQ54FeOpyXrvQ0MFIGJqGi1Rxg7MIFpl5xMQRTmj37YEy8fQZIPonk9tugEPsB668LYe7Hp8k8GSQeAyJbqXFUYOgN6/cMstOEP+CCL6j50RpuQ38W7dACwhWMuLRg8GIKt69idM9FdkkB5yJoBXG/ZDq25Yl9CZ1U7sk76643J7uREPB60DGTr6+DCxEnWzw4WEUgM92or0bi1Fi4zthlDsYE3x95GlZGPzyPJ2Qo1nYSj6WCM4CBRfp+drikDAPYnB94hNq5yNIYqIMLeoBy0PA6XFKHCa68xy/NyZs415gIqSOag/C+0ZRuolcRfG13COdNCn3BQb4hVt2d/taRxkwMmf5EgNjqmZWCrfgSytiecbbdbSfyTA6uDJvkg60llMJxaJDFaI3m3Vkn4lpRoKqYI2ORDpeFKIeOufYbelXTBPkWv8hYeCwn86adl8eyL4sykZPdzfCEHhVR4xawL9G8a5UIHXRI+TGl+yOFKkwe5kI2CVAbNysFvXqCzlPpvFwrA+dUU0vHFFVpOLbkwNR2K84S6aLwo9hu10fOAHXIN9Hm9kPIJfwyhzJH16psSAIA6yK44Aq3OmtpJ3eZsqdL+BtGmIpn9swq0AAAAAElFTkSuQmCC
// @license			http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version			1.9
// @date			15/03/2013
// @copyright		Brigitte
// ==/UserScript==
 
(function() {	// anonymous function wrapper start

	var version = "1.9";	// This should match the @version above in the userscript meta-block
	var scriptID="151232";
	var appID='144959615576466';	// Unique ID of the Facebook Application.
	var appName='The Sims Social';	// Name of the Facebook Application.
	var appIcon="http://photos-b.ak.fbcdn.net/photos-ak-snc7/v43/222/144959615576466/app_1_144959615576466_961.gif"; //example:"http://photos-b.ak.fbcdn.net/photos-ak-snc7/v85005/224/225496380820004/app_2_225496380820004_1276954631.gif"


	/****************************************************************************
	*****							userscript Debug setting.								*****
	****************************************************************************/
	function getDebug(){ return GM_getValue("DEBUG",false); };
	function setDebug(bState){ GM_setValue("DEBUG",bState); DEBUG=bState};
	function toggleDebug(){ GM_setValue("DEBUG",!DEBUG); return; };
	var DEBUG = getDebug();
	GM_registerMenuCommand(appName + ": Turn Debug " + (DEBUG?"OFF":"ON"), toggleDebug);

	function logDebug(sTxt,oObj){
		if(!DEBUG) return;
		if( typeof console.debug != 'undefined' ){
			if(oObj)
				console.debug(appName + ':\n' + sTxt, oObj);
			else
				console.debug(appName + ':\n' + sTxt);
		}else
			GM_log(sTxt+'\n'+oObj);
	};
	/***************************************************************************/

	/****************************************************************************
	*****		The following functions are provided under Creative-Commons		*****
	****************************************************************************/
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
		};

		// Short form for evaluate function, returns a single DOM node
		function selectSingleNode(xPath,params){
			params=params||{}; params['type']=9;
			return selectNodes(xPath,params).singleNodeValue;
		};

		// Clicks object E. Only fires the click event, not any events that open links.
		function click(e) {
			if(!e && typeof e=='string') e=document.getElementById(e);
			if(!e) return;
			var evObj = e.ownerDocument.createEvent('MouseEvents');
			evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
			e.dispatchEvent(evObj);
		};

		/*************************************************************************
			Created by avg, modified by JoeSimmons.
			shortcut to create an element
			params:
				a: element tag, such as html, body, a, img
				b: properties list as a JSON object
				c: an array of child elements
		*************************************************************************/
		function createElement(a,b,c) {
			if(a=="text") {return document.createTextNode(b);}
			var ret=document.createElement(a.toLowerCase());
			if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
			else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
			else ret[prop]=b[prop];
			if(c) c.forEach(function(e) { ret.appendChild(e); });
			return ret;
		};

		/*************************************************************************
			returns information to the main WM script via the address bar, 
			allowing cross domain conversations
		*************************************************************************/
		function sendMessage(s){
			try {
				top.location.hash = s;
			} catch (e) {
				if (window != top) top.location.href = "http://dummy.facebook.com/?#"+s;			
			}
		};


		// Fires event on element
		function fireEvent(element,event){
		 		var evt = document.createEvent("HTMLEvents");
		 		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		 		return !element.dispatchEvent(evt);
		};
	/***************************************************************************/

	/****************************************************************************
	*****		this section must be tailored to fit your specific needs			*****
	*****				instructions are included in each section						*****
	****************************************************************************/
	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			window.setTimeout(dock,1000);
			return; //cannot find docking door
		}

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+appID);
		if (doorMark) return; //already posted to door

		var attachment={
			appID:appID,
			name:appName,
			version:version,
			icon:appIcon,
			desc:appName+" Sidekick (ver "+version+")",
			hrefKey:			'pf_feed_token', //such as sendkey
			thumbsSource:	"app_full_proxy.php?app"+appID,
			flags: {
				httpsTrouble:	false,
				requiresTwo:	false
			},
			
			accText: {
				/*******************************************************************
					Provide a list of definition codes along with their text below
					-Separate codes from text with a colon (:)
					-Separate list items with a comma (,)
					-Codes can be surrounded by quotes (" ") if you like
					-Text can be surrounded by single or double quotes
				*******************************************************************/
				Simoleons:		'Simoleons',
				Reward:			'Reward',
				Help:				'Help',
				SocialPoints:	'SocialPoints',
				Goodwill:		'Goodwill',
				Love:				'Love',
				Gift:				'Gift',
				Fury:				'Fury',
				Entertainment:	'Entertainment',
				doUnknown:		'Unknown',
			},

			tests: [
				/*******************************************************************
					Provide a list of tests below as JSON objects.
					-Tests must include one of the following parameters:
						url,body,html,link,either
					-Tests must include a ret parameter which states the code from
						accText to link to
					-Separate tests with a comma (,)
					-Tests may return the following magic words which behave
						differently and are hardcoded in the WM script:
							"exclude","none","wishlist".
					-You can sent tests by returning "none" if inner tests fail.
						Returning "none" allows the script to continue on.

					The 1st test below uses the "exclude" magic word to block
						facebook "just started playing" notices.
				*******************************************************************/
				{link:appName,ret:"exclude"},														// Ignore 'xxx started playing' posts.
				{link:appName,ret:"exclude"},														// Ignore 'xxx started playing' posts.
				{html:'<span class="default_message">Unlike</span>',ret:"exclude"},	// Ignore "liked" posts.
		/*************************************************************************
			Listed/sorted for readability and maintainability in order of:
				1-	accText[] types
				2-	language, EN first. (see iso-codes)
				3-	Alphabetical
			Comments at end-of-line indicate contributor's name if it's not
			the script's' author.
		*************************************************************************/
		/************************************************************************/
		//	Simoleons	***********************************************************
				{ret:"Simoleons",			link:"Get free simoleons"},
				{ret:"Simoleons",			link:"Get Simoleons"},
		//		DE - German
				{ret:"Simoleons",			link:"Hol dir Simoleons"},							
				{ret:"Simoleons",			link:"Kostenlose Simoleons"},						 
				{ret:"Simoleons",			link:"Simoleons erhalten"},						 
		//		ES - Spanish
				{ret:"Simoleons",			link:"Obtener simoleones gratis"},										// Brigitte
				{ret:"Simoleons",			link:"Conseguir simoleones"},											// Brigitte
				{ret:"Simoleons",			link:"¡Consigue simoleones gratis"},									// Brigitte
		//		FR - French
				{ret:"Simoleons",			link:"Obtenir des simflouz"},						 
				{ret:"Simoleons",			link:"Récupérer simflouz"},						 
				{ret:"Simoleons",			link:"Simflouz gratuits"},												// Brigitte
		//		ID - Indonesian
				{ret:"Simoleons",			link:"Dapatkan simoleon"},												// Brigitte				
		//		IT - Italian
				{ret:"Simoleons",			link:"Ricevi simoleon"},							 
		//		PT - Portuguese
				{ret:"Simoleons",			link:"Obtener simoleones gratis"},										// Brigitte
				{ret:"Simoleons",			link:"Receber Simoleons"},												// Brigitte			
		//		TR - Turkish
				{ret:"Simoleons",			link:"Simoleon al"},													// Brigitte			
		
		//	Reward	**************************************************************
				{ret:"Reward",				link:"Claim Reward"},
				{ret:"Reward",				link:"Claim Rewards"},
				{ret:"Reward",				link:"Claim your reward"},							 
				{ret:"Reward",				link:"Get Reward"},
				{ret:"Reward",				link:"Help and claim rewards"},					 
				{ret:"Reward",				link:"Sign here and claim rewar"},				 
		//		DE - German
				{ret:"Reward",				link:"Belohnung abholen"},							 
				{ret:"Reward",				link:"Belohnungen abholen"},											// Brigitte 
				{ret:"Reward",				link:"Belohnung erhalten"},						 
				{ret:"Reward",				link:"Belohnung holen"},							 
				{ret:"Reward",				link:"Hier unterschreiben und B"},				 
				{ret:"Reward",				link:"Hol deine Belohnung ab"},											// Brigitte 
		//		ES - Spanish
				{ret:"Reward",				link:"Ayudar y solicitar recomp"},										// Brigitte
				{ret:"Reward",				link:"Ayuda y solicita recompensas"},									// Brigitte
				{ret:"Reward",				link:"¡Firma aquí y pide recomp"},				 
				{ret:"Reward",				link:"Reivindicar Recompensa"},											// Brigitte
				{ret:"Reward",				link:"¡Recibir recompensa"},											// Brigitte				
		//		FR - French		
				{ret:"Reward",				link:"Obtenez des récompenses"},										// Brigitte
				{ret:"Reward",				link:"Prendre récompense"},												// Brigitte
				{ret:"Reward",				link:"Prendre récompenses"},
				{ret:"Reward",				link:"Prends ta récompense"},											// Brigitte
				{ret:"Reward",				link:"Récup. récompenses"},												// Brigitte			
				{ret:"Reward",				link:"Récupérer la récompense"},										// Brigitte
				{ret:"Reward",				link:"Récupérer récompense"},						
				{ret:"Reward",				link:"Signe ici et obtiens des"},				
				{ret:"Reward",				link:"Service contre récompense"},										// Brigitte
				{ret:"Reward",				link:"Un service contre une réc"},										// Brigitte 				
		//		ID - Indonesian
				{ret:"Reward",				link:"Klaim Imbalan"},													// Brigitte				
		//		IT - Italian
				{ret:"Reward",				link:"Aiuta e reclama premi"},					
				{ret:"Reward",				link:"Firma qui e richiedi una"},						
				{ret:"Reward",				link:"Richiedi ricompensa"},											// Brigitte 				
				{ret:"Reward",				link:"Reclama i premi"},												// Brigitte 				
				{ret:"Reward",				link:"Reclama il premio"},												// Brigitte 				
		//		PT - Portuguese		
				{ret:"Reward",				link:"Colete a recompensa"},											// Brigitte
				{ret:"Reward",				link:"¡Solicita tu recompensa"},										// Brigitte
				{ret:"Reward",				link:"Pedir recompensa"},							
				{ret:"Reward",				link:"Reivindique recompensas"},										// Brigitte				
				{ret:"Reward",				link:"Solicitar recompensas"},					
		//		TR - Turkish
				{ret:"Reward",				link:"Ödül Iste"},														// Brigitte		
				{ret:"Reward",				link:"Ödülleri iste"},													// Brigitte
				{ret:"Reward",				link:"Yardim et ve ödüllerini i"},										// Brigitte
				
				
		//	Help	*****************************************************************
				{ret:"Help",				link:"Help"},
				{ret:"Help",				link:"Help and claim rewards"},											// Brigitte
		//		DE - German
				{ret:"Help",				link:"Helfen und Belohnung abho"},				
				{ret:"Help",				link:"Helfen"},															// Brigitte
				{ret:"Help",				link:"Helfe und hol dir Belohnungen ab"},								// Brigitte				
				{ret:"Help",				link:"Hilf"},											
		//		ES - Spanish
				{ret:"Help",				link:"Ayúdame"},														// Brigitte
				{ret:"Help",				link:"Ayudar a"},														// Brigitte
		//		FR - French
				{ret:"Help",				link:"Aider"},											
		//		ID - Indonesian
				{ret:"Help",				link:"Bantu"},															// Brigitte				
		//		IT - Italian
				{ret:"Help",				link:"Aiuta"},											
		//		PT - Portuguese
				{ret:"Help",				link:"Ajudar"},															// Brigitte
				{ret:"Help",				link:"Ajude"},															// Brigitte
				
		//		TR - Turkish		
				{ret:"Help",				link:"adli oyuncuya yardim"},											// Brigitte
				{ret:"Help",				link:"adli oyuncuya yardim et"},										// Brigitte
				{ret:"Help",				link:"a yardim et"},													// Brigitte
				{ret:"Help",				link:"yardim et"},														// Brigitte
				{ret:"Help",				link:"'a yardim et"},													// Brigitte
				{ret:"Help",				link:"a yardım et"},													// Brigitte
				{ret:"Help",				link:"Yardim et ve ödüllerini iste"},									// Brigitte
				{ret:"Help",				link:"Yardım et ve ödüllerini iste"},									// Brigitte
		
		//	SocialPoints	********************************************************
				{ret:"SocialPoints",		link:"Get Social Points"},
		//		DE - German
				{ret:"SocialPoints",		link:"Sozialpunkte erhalten"},					
				{ret:"SocialPoints",		link:"Sozialpunkte holen"},												// Brigitte
		//		ES - Spanish
				{ret:"SocialPoints",		link:"Conseguir puntos sociales"},				
				{ret:"SocialPoints",		link:"Conseg. p. sociales"},						
				{ret:"SocialPoints",		link:"Puntos sociales"},												// Brigitte				
		//		FR - French
				{ret:"SocialPoints",		link:"Obtenir des points sociau"},										// Brigitte							
				{ret:"SocialPoints",		link:"Obtenir des points sociaux"},										// Brigitte							
		//		ID - Indonesian
				{ret:"SocialPoints",		link:"Dapatkan Poin Sosial"},											// Brigitte				
		//		IT - Italian
				{ret:"SocialPoints",		link:"Ricevi punti sociali"},						
		//		PT - Portuguese
				{ret:"SocialPoints",		link:"Receber Pontos Sociais"},											// Brigitte
		//		TR - Turkish
				{ret:"SocialPoints",		link:"Sosyallik Puani Kazan"},											// Brigitte
				{ret:"SocialPoints",		link:"Sosyallik Puani Kazan"},											// Brigitte
 
		//	Goodwill	**************************************************************
				{ret:"Goodwill",			link:"Get Goodwill"},
		//		DE - German
				{ret:"Goodwill",			link:"Wohlwollen erhalten"},						
		//		ES - Spanish
				{ret:"Goodwill",			link:"Conseguir Buena voluntad"},										// Brigitte
				{ret:"Goodwill",			link:"¡Vale"},															// Brigitte
		//		FR - French
				{ret:"Goodwill",			link:"Obtenir de la bonté"},											// Brigitte		
		//		ID - Indonesian
				{ret:"Goodwill",			link:"Dapatkan Niat Baik"},												// Brigitte				
		//		IT - Italian
				{ret:"Goodwill",			link:"Ricevi benevolenza"},												// Brigitte		 
		//		PT - Portuguese
				{ret:"Goodwill",			link:"Receber Boa Vontade"},											// Brigitte		
		//		TR - Turkish
				{ret:"Goodwill",			link:"Iyi Niyet Al"},													// Brigitte		
		

		//	Love	*****************************************************************
				{ret:"Love",				link:"Get Love"},														// Brigitte
				{ret:"Love",				link:"Get some Love"},
				{ret:"Love",				link:"Claim Love"},														// Brigitte
		//		ES - Spanish
				{ret:"Love",				link:"Amor"},															// Brigitte
				{ret:"Love",				link:"¡Consigue Amor"},													// Brigitte
				{ret:"Love",				link:"¡Consigue amor"},													// Brigitte
		//		FR - French
				{ret:"Love",				link:"Obtenir de l'amour"},												// Brigitte
		//		TR - Turkish
				{ret:"Love",				link:"Biraz Sevgi al"},													// Brigitte
				{ret:"Love",				link:"Savasma Sevis"},													// Brigitte
				{ret:"Love",				link:"Sevgi iste"},														// Brigitte
				
		//	Gift	*****************************************************************
				{ret:"Gift",				link:"Accept Gift and Decide"},					
				{ret:"Gift",				link:"Collect Gift"},
		//		DE - German
				{ret:"Gift",				link:"Geschenk abholen"},							
		//		ES - Spanish
                {ret:"Gift",                link:"Aceptar el regalo y decidir"},  	               		            // Brigitte		
                {ret:"Gift",                link:"Aceptar y decidir"},  		                  		            // Brigitte
				{ret:"Gift",				link:"Recoge tu regalo"},							
		//		FR - French
				{ret:"Gift",				link:"Accepter cadeau et décide"},										// Brigitte	
				{ret:"Gift",				link:"Récupérer le cadeau"},											// Brigitte	
		//		ID - Indonesian
				{ret:"Gift",				link:"Kumpulkan Hadiah"},												// Brigitte		
				{ret:"Gift",				link:"Terima Hadiah dan Putuska"},										// Brigitte				
		//		IT - Italian
                {ret:"Gift",                link:"Raccogli il regalo"}, 		                   		            // Brigitte		
				{ret:"Gift",				link:"Reclama il tuo premio"},					
		//		PT - Portuguese
                {ret:"Gift",                link:"Aceitar Presente e Decidir"},                    		            // Brigitte
                {ret:"Gift",                link:"Coletar Presente"},                             					// Brigitte
		//		TR - Turkish

		//	Fury	*****************************************************************
				{ret:"Fury",				link:"Get Fury"},
				{ret:"Fury",				link:"Get some Fury"},				
		//		FR - French
                {ret:"Fury",                link:"Obtenir de la colère"},                          					// Brigitte
		
		//	Entertainment	********************************************************
				{ret:"Entertainment",		link:"Get Entertainment"},							
		//		ES - Spanish
				{ret:"Entertainment",		link:"Consigue Entretenimiento"},										// Brigitte
		//		FR - French
				{ret:"Entertainment",		link:"Obtenir du divertissement"},										// Brigitte	
				
		//		*****************************************************************
				{ret:"",				body:""},
		//		IT - Italian
				{ret:"",				body:""},
		/************************************************************************/
			],

			menu: {
				/*******************************************************************
					Provide a menu tree below as a JSON object
					Accepted menu item types include:
						separator, optionblock, link, checkbox, radio, select,
						hidden, textarea
				*******************************************************************/
				mainsec:{type:"section",label:"\""+appName+"\" Manager ("+version+")",
					kids:{
						SidekickChangeLog:{type:'link',label:'View Sidekick',href:'http://userscripts.org/scripts/show/151232'}, updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/151232.user.js'},
						dontsteal:{type:"checkbox",label:"Don't steal wall-to-wall posts meant for others.",newitem:true},
						mainsep:{type:"separator",label:"Actions",hideSelectAll:false,
							kids:{
								Help:{type:"checkbox",label:"Help Out Friends"},
								doUnknown:{type:"checkbox",label:"Process Unknown Links"},
								optReqCash:{type:"optionblock",label:"Get rewards",hideSelectAll:false,
									kids:{
										Entertainment:{type:"checkbox",label:"Get: Entertainment",
											kids:{
												Fury:{type:"checkbox",label:"Fury"},
												Gift:{type:"checkbox",label:"Gift"},
												Goodwill:{type:"checkbox",label:"Goodwill"},
												Reward:{type:"checkbox",label:"Reward"},
												Love:{type:"checkbox",label:"Love"},
												Simoleons:{type:"checkbox",label:"Simoleons"},
												SocialPoints:{type:"checkbox",label:"Social Points"},
											}
										}
									}
								},
							}
						},
					}
				},
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+appID,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	/***************************************************************************/

	var main = {

		sendMessage : function (s){
			unsafeWindow.top.location.hash = s;
		},
		retry : function (){
			window.setTimeout(main.run,1000);
			return;
		},

		run : function (){
			/**********************************************************************
			*****	this section must be tailored to fit your specific needs		*****
			*****			instructions are included in each section					*****
			**********************************************************************/
			//	Check that we are on the Application iFrame,
			//	because thats where we do our job.
			if(	!(
						unsafeWindow.location.host == 'simssoc.game.playfish.com'
						&&	unsafeWindow.location.pathname == '/g/fb/simssoc/feed'
					)
			){
				logDebug(	"running on: '" + unsafeWindow.location.href
								+ "'\nAborting !");
				return;
			}
			var logTxt = statusCode = null;
			var flashDiv = overlayDiv = responseDiv = null;
			var overlayLoaded = false;
			var Header = Content = null;

			if(document.documentElement && document.documentElement.textContent=="")
				statusCode=-5;  //no document body
			if(document.body.firstChild.nodeName == 'A')
				statusCode=-5;  //Maintenance

			if( statusCode==null ){
				try{
					// Grab some needed dom elements.
					flashDiv	= document.getElementById('flashcontent');
					overlayDiv	= document.getElementById('overlay');
					// Wait for one or the other.
					if( !flashDiv && !overlayDiv){
						main.retry();
						return;
					}

					if( overlayDiv != null ){
						logDebug("overlayDiv= ", overlayDiv);
						responseDiv = overlayDiv.getElementsByClassName('feedContainer')[0];
						responseDiv = responseDiv.getElementsByClassName('header')[0];
						logDebug("responseDiv= ", responseDiv);
						overlayLoaded	= (responseDiv != null);
						Header	=	responseDiv.getElementsByTagName('h2')[0].textContent;
						Content	=	responseDiv.getElementsByTagName('div')[0].textContent;
						statusCode=0;
						logDebug('Header: '+Header);
						logDebug('Content: '+Content);
					}
				}
				// Retry untill all code succeed.
				catch(e){	return ( main.retry() );	}
			}

				/*******************************************************************
					The WM script can recieve and act on the following
					statusCode values, additional codes may exist,
					please check the WM script source lines...
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
				*******************************************************************/

			// below is a list of searches for text pertaining to various messages
			var responses={
				Head: [
					{code:1,		txt:"Congratulations"},
					{code:-1,	txt:"Sorry"},
				],
				Content: [
					{code:-2,	txt:"Sorry, all the gifts have been claimed"},
					{code:-3,	txt:"handle any more gifts for the day"},
					{code:-6,	txt:"Sorry, you've already claimed this gift"},
					{code:-12,	txt:"Sorry, you have to be friends with this person to click their feeds"},
					{code:-13,	txt:"Sorry, this gift was intended for someone else!"},
					{code:1,		txt:"You have claimed"},
				]
			};

			if( statusCode==0 ){
				// Check for responses in Content.
				responses.Content.forEach(
					function(element, index, array){
						if( !(statusCode==0) ) return; // We already found something.
						if( Content.find(element.txt) ){
							statusCode=element.code;
							logTxt = "Found response Content[" + index + "]";
							logTxt += " = '" + element.txt + "'";
							logTxt += "\nSetting statusCode=" + element.code;
							logDebug(logTxt);
						}
					}
				);
			}
			// Continue searching in Head if none found yet.
			if( statusCode==0 ){
				// Check for responses in Head.
				responses.Head.forEach(
					function(element, index, array){
						if( !(statusCode==0) ) return; // We already found something.
						if( Header.find(element.txt) ){
							statusCode=element.code;
							logTxt = "Found response Head[" + index + "]";
							logTxt += " = '" + element.txt + "'";
							logTxt += "\nSetting statusCode=" + element.code;
							logTxt += "\nContent was: '" + Content + "'";
							logDebug(logTxt);
						}
					}
				);
			}
			// Log unknown responses
			if( statusCode==0 ){
				statusCode=-3; // Using this so it will be re-proccesed...
				logTxt = "Found unknown response !";
				logTxt += "\nHeader=" + Header;
				logTxt += "\nContent=" + Content;
				logTxt += "\nSetting statusCode=-3";
				logDebug(logTxt);
				if(DEBUG)	window.alert(logTxt); // So we can pause on this to copy etc.
			}
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
			/*********************************************************************/

			// here we actually pass back the status code
			if( statusCode!=0 ) main.sendMessage( "status="+statusCode+(link?link:'') );
			else main.retry();
		},
	};

	//check for dock.
	var href=window.location.href;
	if (href.match(/^https?:\/\/\w+\.facebook\.(com|net)\//)) {
		dock();
		return;
	}else	main.run();
})(); // anonymous function wrapper end
