// -*- Mode: Javascript; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 2 -*-
/*******************************************************************************
	(C)2011+ TriMoon and others
	Authors:	TriMoon <http://claimid.com/trimoon>
	Inspired on a script by Nokraden <http://userscripts.org/users/393928>

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
// @name				The Sims Social
// @description	Assists Wall Manager with 'The Sims Social' posts
// @namespace		claimid.com/trimoon
// @include			/^https?:\/\/simssoc\.game\.playfish\.com\/g\/fb\/simssoc\/feed\?/
// @include			/^https?:\/\/\w+\.facebook\.(com|net)\//
// @exclude			/^https?:\/\/creative\.ak\.fbcdn\.(com|net)\//
// @exclude			/^https?:\/\/external\.ak\.fbcdn\\.(com|net)\//
// @exclude			/^https?:\/\/photos-\w+\.ak\.fbcdn\.(com|net)\//
// @exclude			/^https?:\/\/platform\.ak\.fbcdn\.(com|net)\//
// @exclude			/^https?:\/\/profile\.ak\.fbcdn\.(com|net)\//
// @exclude			/^https?:\/\/(\w+\.)*static\.ak\.fbcdn\.(com|net)\//
// @exclude			/^https?:\/\/((\w+\.)*)\w+\.channel\.facebook\.(com|net)\//
// @exclude			/^https?:\/\/apps\.facebook\.(com|net)\//
// @exclude			/^https?:\/\/error\.facebook\.(com|net)\//
// @exclude			/^https?:\/\/(\w+\.)*static\.facebook\.(com|net)\//
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/\w+\/posts\//
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/ai/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/ajax/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/campaign/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/dialog/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/editaccount/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/editprofile/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/extern/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/friends/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/groups/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/help/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/home\.php\?sk=group_/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/login/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/logout/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/notifications/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/plugins/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/posted/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/reqs/
// @exclude			/^https?:\/\/\w+\.facebook\.(com|net)\/settings/
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKBAgQKXecEj8AAABTdEVYdENvbW1lbnQAKEMpMjAxMSsgVHJpTW9vbiBJbmMuIGh0dHA6Ly9jbGFpbWlkLmNvbS90cmltb29uCkNyZWF0ZWQgdXNpbmc6IEdJTVAgMi42LjExxjI3DQAAAmlJREFUOMuFU09IFHEYfb+Z/c3sOrPiJru6elgUjBI8JEXZIVwIOkkURQQGmYfKQ9RBgpCoIIOIosQuoVlKlyAQ6uAhKjKCMJHKdiNF/Jew2G7uzu7Ozvxmvk4Fuat98N0e7/F97z1GRCg17DXzKHO4FtEiO1cK8+2ZE5QohZOwwcjf0ab50HS7pY/nLNxkd5iPRa961uM8JdWHWENAx63pw7EfEmQ54FeOpyXrvQ0MFIGJqGi1Rxg7MIFpl5xMQRTmj37YEy8fQZIPonk9tugEPsB668LYe7Hp8k8GSQeAyJbqXFUYOgN6/cMstOEP+CCL6j50RpuQ38W7dACwhWMuLRg8GIKt69idM9FdkkB5yJoBXG/ZDq25Yl9CZ1U7sk76643J7uREPB60DGTr6+DCxEnWzw4WEUgM92or0bi1Fi4zthlDsYE3x95GlZGPzyPJ2Qo1nYSj6WCM4CBRfp+drikDAPYnB94hNq5yNIYqIMLeoBy0PA6XFKHCa68xy/NyZs415gIqSOag/C+0ZRuolcRfG13COdNCn3BQb4hVt2d/taRxkwMmf5EgNjqmZWCrfgSytiecbbdbSfyTA6uDJvkg60llMJxaJDFaI3m3Vkn4lpRoKqYI2ORDpeFKIeOufYbelXTBPkWv8hYeCwn86adl8eyL4sykZPdzfCEHhVR4xawL9G8a5UIHXRI+TGl+yOFKkwe5kI2CVAbNysFvXqCzlPpvFwrA+dUU0vHFFVpOLbkwNR2K84S6aLwo9hu10fOAHXIN9Hm9kPIJfwyhzJH16psSAIA6yK44Aq3OmtpJ3eZsqdL+BtGmIpn9swq0AAAAAElFTkSuQmCC
// @license			http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version			tm.1.1.1
// ==/UserScript== 
(function() {	// anonymous function wrapper start

	var version = "tm.1.1.1";	// This should match the @version above in the usersctipt meta-block
	var appID='144959615576466';	// Unique ID of the Facebook Application.
	var appName='The Sims Social';	// Name of the Facebook Application.

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
			unsafeWindow.parent.window.location.hash = s;
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
		if (!door) return; //cannot find docking door

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+appID);
		if (doorMark) return; //already posted to door

		var attachment={
			appID:appID,
			name:appName,
			hrefKey:			'pf_feed_token', //such as sendkey
			thumbsSource:	'<your_game_assets_url_here>',
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
					-You can nest tests by returning "none" if inner tests fail.
						Returning "none" allows the script to continue on.

					The 1st test below uses the "exclude" magic word to block
						facebook "just started playing" notices.
				*******************************************************************/
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
				{ret:"Simoleons",			link:"Hol dir Simoleons"},							// Milius
				{ret:"Simoleons",			link:"Kostenlose Simoleons"},						// Milius
				{ret:"Simoleons",			link:"Simoleons erhalten"},						// Milius
		//		FR - French
				{ret:"Simoleons",			link:"Obtenir des simflouz"},						// Milius
				{ret:"Simoleons",			link:"Récupérer simflouz"},						// Milius
		//		IT - Italian
				{ret:"Simoleons",			link:"Ricevi simoleon"},							// Milius
		//	Reward	**************************************************************
				{ret:"Reward",				link:"Claim Reward"},
				{ret:"Reward",				link:"Claim Rewards"},
				{ret:"Reward",				link:"Claim your reward"},							// Milius
				{ret:"Reward",				link:"Get Reward"},
				{ret:"Reward",				link:"Help and claim rewards"},					// TriMoon
				{ret:"Reward",				link:"Sign here and claim rewar"},				// Milius
		//		DE - German
				{ret:"Reward",				link:"Belohnung abholen"},							// Milius
				{ret:"Reward",				link:"Belohnung erhalten"},						// Milius
				{ret:"Reward",				link:"Belohnung holen"},							// Milius
				{ret:"Reward",				link:"Hier unterschreiben und B"},				// Milius
		//		ES - Spanish
				{ret:"Reward",				link:"¡Firma aquí y pide recomp"},				// Milius
		//		FR - French
				{ret:"Reward",				link:"Prendre récompenses"},						// Milius
				{ret:"Reward",				link:"Récupérer récompense"},						// Milius
				{ret:"Reward",				link:"Signe ici et obtiens des"},				// Milius, corrected by TriMoon
		//		IT - Italian
				{ret:"Reward",				link:"Aiuta e reclama premi"},					// Milius
				{ret:"Reward",				link:"Firma qui e richiedi una"},				// Milius
		//		PT - Portuguese
				{ret:"Reward",				link:"Pedir recompensa"},							// Milius
				{ret:"Reward",				link:"Solicitar recompensas"},					// TriMoon
		//	Help	*****************************************************************
				{ret:"Help",				link:"Help "},
		//		DE - German
				{ret:"Help",				link:"Helfen und Belohnung abho"},				// Milius
				{ret:"Help",				link:"Hilf"},											// Milius
		//		FR - French
				{ret:"Help",				link:"Aider"},											// Milius
		//		IT - Italian
				{ret:"Help",				link:"Aiuta"},											//	TriMoon
		//	SocialPoints	********************************************************
				{ret:"SocialPoints",		link:"Get Social Points"},
		//		DE - German
				{ret:"SocialPoints",		link:"Sozialpunkte erhalten"},					// Milius
		//		ES - Spanish
				{ret:"SocialPoints",		link:"Conseguir puntos sociales"},				// Milius
				{ret:"SocialPoints",		link:"Conseg. p. sociales"},						// Milius
		//		IT - Italian
				{ret:"SocialPoints",		link:"Ricevi punti sociali"},						// Milius
		//	Goodwill	**************************************************************
				{ret:"Goodwill",			link:"Get Goodwill"},
		//		DE - German
				{ret:"Goodwill",			link:"Wohlwollen erhalten"},						// Milius
		//		ES - Spanish
				{ret:"Goodwill",			link:"Ayúdame"},										// Milius
		//	Love	*****************************************************************
				{ret:"Love",				link:"Get some Love"},
		//	Gift	*****************************************************************
				{ret:"Gift",				link:"Accept Gift and Decide"},					// Milius
				{ret:"Gift",				link:"Collect Gift"},
		//		DE - German
				{ret:"Gift",				link:"Geschenk abholen"},							// Milius
		//		ES - Spanish
				{ret:"Gift",				link:"Recoge tu regalo"},							// Milius
		//		IT - Italian
				{ret:"Gift",				link:"Reclama il tuo premio"},					// Milius
		//	Fury	*****************************************************************
				{ret:"Fury",				link:"Get Fury"},
		//	Entertainment	********************************************************
				{ret:"Entertainment",	link:"Get Entertainment"},							//	TriMoon
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
						SidekickChangeLog:{type:'link',label:'View Sidekick Changelog',href:'http://userscripts.org/topics/90075'},
						dontsteal:{type:"checkbox",label:"Don't steal wall-to-wall posts meant for others.",newitem:true},
						mainsep:{type:"separator",label:"Actions",hideSelectAll:false,
							kids:{
								Help:{type:"checkbox",label:"Help Out Friends"},
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
	if( $('wmDock') ){
		dock();
		return;
	}else	main.run();
})(); // anonymous function wrapper end
