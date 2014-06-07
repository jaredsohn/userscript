// ==UserScript==
// @name           SimCity Social by B
// @namespace      SimCity Social by B
// @description    Assists Wall Manager with SimCity Social posts
// @include			/^https?:\/\/\/simcity\.game\.playfish\.com\/g\/fb\/\/simcity\/accept\*/
// @include			/^https?:\/\/\w+\.facebook\.(com|net)\/$/
// @include			/^https?:\/\/\w+\.facebook\.(com|net)\/pages\/FB-Wall-Manager\//
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        2.5
// @date	       15/03/2013
// @copyright      Brigitte
// ==/UserScript==

(function() {	// anonymous function wrapper start

	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "2.5";
        var appID="225496380820004";
        var scriptID="137181";
        var appName="SimCity Social";
	var appIcon="http://photos-e.ak.fbcdn.net/photos-ak-snc7/v85005/224/225496380820004/app_1_225496380820004_572889753.gif"; //example:"http://photos-b.ak.fbcdn.net/photos-ak-snc7/v85005/224/225496380820004/app_2_225496380820004_1276954631.gif"


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
			hrefKey:			'pf_feedToken', //such as sendkey
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
				Help:				'Help',
				Energy:				'Energy',
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
				{html:'<span class="default_message">Unlike</span>',ret:"exclude"},					// Ignore "liked" posts.
				{url:"RelationshipGiftPlace.png",ret:"exclude"},									// Ignore
				{url:"RelationshipGiftBack.png",ret:"exclude"},										// Ignore
				{url:"TransportNetworkRemind.png",ret:"exclude"},									// Ignore
				{url:"FriendMovedIn.png",ret:"exclude"},											// Ignore
				{link:"Play SimCity Soc....",ret:"exclude"},										// Ignore
				
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
				{ret:"Simoleons",			url:"Simoleons"},
				{ret:"Simoleons",			link:"Simoleons"},
				
		//	Help	*****************************************************************
				{ret:"Help",				url:"QuestAskForItem"},
		
		//	Energy	********************************************************
				{ret:"Energy",				url:"Energy"},
				{ret:"Energy",				link:"Energy"},
				{ret:"Energy",				link:"Energie"},
				
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
						SidekickChangeLog:{type:'link',label:'View Sidekick',href:'http://userscripts.org/scripts/show/'+scriptID+''}, updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
						dontsteal:{type:"checkbox",label:"Don't steal wall-to-wall posts meant for others.",newitem:true},
						mainsep:{type:"separator",label:"Actions",hideSelectAll:false,
							kids:{
								Help:{type:"checkbox",label:"Help Out Friends"},
								doUnknown:{type:"checkbox",label:"Process Unknown Links"},
								optReqCash:{type:"optionblock",label:"Get rewards",hideSelectAll:false,
									kids:{
										Simoleons:{type:"checkbox",label:"Get: Simoleons",
											kids:{
												Help:{type:"checkbox",label:"Help"},
												Energy:{type:"checkbox",label:"Energy"},
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
						unsafeWindow.location.host == 'simcity.game.playfish.com'
						&&	unsafeWindow.location.pathname == '/g/fb/simcity/'
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
					{code:-2,	txt:"Oops, somebody already helped your friend out!"},
					{code:-3,	txt:"handle any more gifts for the day"},
					{code:-6,	txt:"Sorry, you've already claimed this gift"},
					{code:-6,	txt:"Sorry, you've already clicked on this link."},
					{code:-11,	txt:"Sorry, this link has expired"},
					{code:-12,	txt:"Sorry, you have to be friends with this person to click their feeds"},
					{code:-13,	txt:"Sorry, this gift was intended for someone else!"},
					{code:1,		txt:"You have claimed"},
					{code:1,		txt:"You've successfully accepted this gift!"},
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
