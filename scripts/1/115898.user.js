//	-*- Mode: Javascript; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 2 -*-
/*******************************************************************************
	(C)2011+ TriMoon Inc.
	Authors:	TriMoon <http://claimid.com/trimoon>

	This work is licensed under a Creative Commons License !
	See: http://creativecommons.org/licenses/by-nc-nd/3.0/

	script-icon converted after manual manipulation by TriMoon from:
	"http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/90/121581087940710/app_2_121581087940710_1109.gif"
	(Still needs manual manipulation to convert the surrounding white to transparent.)

	See also:
		http://wiki.greasespot.net/Metadata_Block
		http://www.greywyvern.com/code/php/binary2base64
		http://www.loc.gov/standards/iso639-2/php/code_list.php
*******************************************************************************/
// ==UserScript==
// @name				Mafia Wars 2
// @description	Assists Wall Manager with 'Mafia Wars 2' posts
// @namespace		claimid.com/trimoon
// @include			/^https?:\/\/fb-client-0\.mw2\.zynga\.com\/flash\.php\?/
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
// @icon data:image/gif;base64,R0lGODlhDQAQAPeHABYMCikaDj8TDzsaDzIZEjodHiQjHS4qJzIqITIsJjcyJzc4ODVFTEsCA0kJCEsdGE4jF1olDFs6Ek8zKVcqKm8eFHk+DGUuI1VAFHJIAHBLC3NIFH1dGWlYMl5fX0NVZWZMSWBaVmFbXWRkZW9xc3Rtbn58d3l7fXV8gnyFhosODZscDI83Bpc+DI1PC4pKHZlQAIdhDItkDKNbCrtCD6FmE7V1BZNZSMglFNk2FcM8Isw1Jcg9I+YwH+04E+M2JsNGH8JcE99IGsB6DtJuFepGJepfJfRNKv5MKftbKv9tKvtwIv9zJ/h7IcOCDd6PI+2LHueQHfGXHfSZHfqSH/+fH/+CKPyJI/+NJv+dJf+zF/+xGP60G/+0G/+kIoiMjouQk4uUlpGWnJWaoa+4uby8ur29vri9wbu/xbbDxbrDxLvAyr7CzL3GycLHy8bHycXNz8nO2cjR09LX4N3m59/n6uPj4+Dn6+Xo6ujm5ent9efw8O3z8/b4+vv7+/n9//n///z8/Pz9/f39/f79/f/+/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAANABAAAAjBAA8JHKgnDhs0cwYK7IPGRAcOMmJIODHwjQINNpxo6dJlS4Yxfg7ZMVDjSZQqU6R4GeLhUEgSMGZI2HAFShYXKFweKpNAzAcLV7AQQYBHYaAvL5pYsRHgjMBAh+p4YLGESYsDbg4FInSozQQaSoxEYAAnD9dDciAISQJkAIAbBL4Q8hMIRI4jRXTwQOLjwh1ChNQI2PGjB44VFR6MAHwoRQMVDiiICJOGDuNDCwqUILNHoUIzfAbO9XNWoZ+QngcGBAA7
// @license			http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version			1.0.5
// ==/UserScript== 
(function() {	// anonymous function wrapper start

	var version = "1.0.5";			// This should match the @version above in the usersctipt meta-block
	var appID='121581087940710';	// Unique ID of the Facebook Application.
	var appName='Mafia Wars 2';	// Name of the Facebook Application.

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
			hrefKey:			'sendKey', //such as sendkey
			thumbsSource:	'http://platform.ak.fbcdn.net/www/app_full_proxy.php?app=121581087940710',
			flags:{
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
				sendBossHelp:	'Help on Boss',
				// Get rewards
				getReward:		'Reward',
				// Help out friends by sending
				sendAramid:			'Aramid',
				sendBlackPowder:	'Black Powder',
				sendBrains:			'Brains',
				sendConcrete:		'Concrete',
				sendEnergy:			'Energy',
				sendHealth:			'Health',
				sendLottery:		'Lottery',
				sendMiniJet:		'Mini Jet',
				sendNeonTubes:		'Neon Tubes',
				sendMolotov:		'Molotov',
				sendPictures:		'Pictures',
				sendPills:			'Pills',
				sendRecom:			'Recommondation',
				sendRecyclingBin:	'Recycling Bin',
				sendSteelBars:		'Steel Bars',
				sendThoughLining:	'Though Lining',
				sendWire:			'Wire',
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
//				{html:'<span class="default_message">Unlike</span>',ret:"exclude"},	// Ignore "liked" posts.
				{url:'bossVisit=true',	ret:"sendBossHelp"},
				{url:'rewardType=', ret:"none", kids:[					// Help out friends by sending
					{url:'149303',		ret:"sendEnergy"},
					{url:'2425817',	ret:"sendMolotov"},
					{url:'2425859',	ret:"sendPills"},
					{url:'2504140',	ret:"sendRecyclingBin"},
					{url:'2504524',	ret:"sendAramid"},
					{url:'2504543',	ret:"sendBlackPowder"},
					{url:'2504562',	ret:"sendConcrete"},
					{url:'2504782',	ret:"sendMiniJet"},
					{url:'2504763',	ret:"sendNeonTubes"},
					{url:'2504877',	ret:"sendThoughLining"},
					{url:'2504957',	ret:"sendSteelBars"},
					{url:'2505036',	ret:"sendWire"},
					{url:'2663572',	ret:"sendRecom"},
					{url:'2690320',	ret:"sendHealth"},
					{url:'2741628',	ret:"sendLottery"},
					{url:'2845895',	ret:"sendBrains"},
					{url:'2979599',	ret:"sendPictures"},
				]},
				{url:'rewardType=', ret:"none", kids:[					// Get rewards
						{url:'146360',		ret:"getReward"},
						{url:'2346318',	ret:"getReward"},
				]},

		/*************************************************************************
			Listed/sorted for readability and maintainability in order of:
				1-	accText[] types
				2-	language, EN first. (see iso-codes)
				3-	Alphabetical
			Comments at end-of-line indicate contributor's name if it's not
			the script's' author.
		*************************************************************************/
		/************************************************************************
		//	Help	*****************************************************************
		// 	TR - Turkish
				{ret:"Help",			link:"adlı kişiye yardım"},
		//	Reward	**************************************************************
				{ret:"Reward",			link:"Claim Reward"},
				{ret:"Reward",			link:"Get my reward"},
				{ret:"Reward",			link:"Get Reward"},
				{ret:"Reward",			link:"Get your Reward"},
		//		TR - Turkish
				{ret:"Reward",			link:"Beni Ödüllendir"},
				{ret:"Reward",			link:"Ödül Al"},
				{ret:"Reward",			link:"Ödül Talep Et"},
				{ret:"Reward",			link:"Ödülünü Al"},
		//	Cash	*****************************************************************
				{ret:"Cash",			link:"Get Cash"},
				{ret:"Cash",			link:"Get my cash"},
				{ret:"Cash",			link:"Show me the money"},
		//		TR - Turkish
				{ret:"Cash",			link:"Nakit paramı al"},
		//	Health	**************************************************************
				{ret:"Health",			link:"Get Health"},
		//		TR - Turkish
				{ret:"Health",			link:"Sağlık Al"},
		//	Join	*****************************************************************
				{ret:"Join",			url:'rewardType=2346318'},
				{ret:"Join",			link:"Join"},
		//		TR - Turkish
				{ret:"Join",			link:"arkadaşına katıl"},
				{ret:"Join",			link:"arkadaşına kat"},
		//	Revenge	**************************************************************
		//		TR - Turkish
				{ret:"Revenge",		link:"İntikam Al"},
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
						SidekickChangeLog:{type:'link',label:'View Sidekick Changelog',href:'http://userscripts.org/topics/91079'},
						dontsteal:{type:"checkbox",label:"Don't steal wall-to-wall posts meant for others."},
						doUnknown:{type:"checkbox",label:"Process unknown actions:",newitem:false},
						mainsep:{type:"separator",label:"Actions",hideSelectAll:false,
							kids:{
								sendBossHelp:{type:"checkbox",label:"Help with Boss fights:"},
								getReward:{type:"checkbox",label:"Get rewards"},
								optHelpSend:{type:"optionblock",label:"Help out friends by sending:",hideSelectAll:false,
									kids:{
										sendAramid:{type:"checkbox",label:"Aramid"},
										sendBlackPowder:{type:"checkbox",label:"Black Powder"},
										sendBrains:{type:"checkbox",label:"Brains"},
										sendConcrete:{type:"checkbox",label:"Concrete"},
										sendEnergy:{type:"checkbox",label:"Energy"},
										sendHealth:{type:"checkbox",label:"Health"},
										sendLottery:{type:"checkbox",label:"Lottery"},
										sendMiniJet:{type:"checkbox",label:"Mini Jet"},
										sendMolotov:{type:"checkbox",label:"Molotov"},
										sendNeonTubes:{type:"checkbox",label:"Neon Tubes"},
										sendPictures:{type:"checkbox",label:"Pictures",newitem:true},
										sendPills:{type:"checkbox",label:"Pills"},
										sendRecom:{type:"checkbox",label:"Recommondation"},
										sendRecyclingBin:{type:"checkbox",label:"Recycling Bin"},
										sendSteelBars:{type:"checkbox",label:"SteelBars"},
										sendThoughLining:{type:"checkbox",label:"Though Lining"},
										sendWire:{type:"checkbox",label:"Wire"},
									}
								}
							}
						}
					}
				}
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
						unsafeWindow.location.host == 'fb-client-0.mw2.zynga.com'
						&&	unsafeWindow.location.pathname == '/flash.php'
					)
			){
				logDebug(	"running on: '" + unsafeWindow.location.href
								+ "'\nAborting !");
				return;
			}
			var logTxt = statusCode = null;
			var appFrame = flashFrame = htmlFrame = ZyngaInbox = null;
			var flashLoaded = overlayLoaded = false;

			if(document.documentElement && document.documentElement.textContent=="")
				statusCode=-5;  //no document body

			if( statusCode==null ){
				try{
					// Grab some needed dom elements.
					appFrame		= document.getElementById('appFrame');
					flashFrame	= document.getElementById('flashFrame');
					htmlFrame	= document.getElementById('htmlFrame');
					ZyngaInbox	= document.getElementById('zsc_console');

					// Check whats been displayed
					flashLoaded		= !flashFrame.className.find("offscreen");
					overlayLoaded	= !htmlFrame.className.find("offscreen");
					// Wait for one or the other.
					if( !flashLoaded && !overlayLoaded){
						main.retry();
						return;
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

			// We fail when the flash application is displayed.
			if( flashLoaded ){
				statusCode=-1;
			}else if( overlayLoaded ){
				statusCode=0;
				var	landingDiv	=	landingHeader	=	landingContent	=	landingContentTxt	=	landingContentLink	=	null;

				try{
					landingDiv				=	htmlFrame.getElementsByClassName('landing2')[0];
					landingHeader			=	landingDiv.getElementsByTagName('h2')[0];
					landingContent			=	landingDiv.getElementsByClassName('landingInner2')[0];
					landingContentTxt		=	landingContent.getElementsByTagName('div')[0];
					landingContentLink	=	landingContent.getElementsByClassName('inputsubmit')[0];
				}
				// Retry untill all code succeed.
				catch(e){	return ( main.retry() );	}

				// below is a list of searches for text pertaining to various messages
				var responses={
					Head: [
						{code:1,		txt:"Thanks for helping out"},
					],
					Content: [
						{code:-1,	txt:"Couldn't find ViralReward"},
						{code:-3,	txt:"Daily limit exceeded"},
						{code:-3,	txt:"You have already received the maximum amount of cash today."},
						{code:-6,	txt:"You have already received this reward."},
						{code:-11,	txt:"This reward has expired."},
						{code:1,		txt:"You received a reward!"},
						{code:1,		txt:"You have received a lottery ticket piece."},
						{code:1,		txt:"Thanks for helping out, you also got a recommendation!"},
						{code:1,		txt:"Thanks for helping out. Here is your reward!"},
					]
				};

				if( statusCode==0 ){
					// Check for responses in Content.
					responses.Content.forEach(
						function(element, index, array){
							if( !(statusCode==0) ) return; // We already found something.
							if( landingContentTxt.textContent.find(element.txt) ){
								statusCode=element.code;
								landingContentTxt.setAttribute('style', 'border:2px green dashed;');
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
							if( landingHeader.textContent.find(element.txt) ){
								statusCode=element.code;
								landingHeader.setAttribute('style', 'background-color:green;');
								logTxt = "Found response Head[" + index + "]";
								logTxt += " = '" + element.txt + "'";
								logTxt += "\nSetting statusCode=" + element.code;
								logTxt += "\nContent was: '" + landingContentTxt.textContent + "'";
								logDebug(logTxt);
							}
						}
					);
				}
				// Log unknown responses
				if( statusCode==0 ){
					statusCode=-3; // Using this so it will be re-proccesed...
					logTxt = "Found unknown response !";
					logTxt += "\nHeader=" + landingHeader.textContent;
					logTxt += "\nContent=" + landingContentTxt.textContent;
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
			}
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
})();	//	anonymous function wrapper end
