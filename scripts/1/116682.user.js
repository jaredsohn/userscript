// ==UserScript==
// @name           Wall Manager Sidekick (Lucky Space)
// @description    Assists Wall Manager with Lucky Space posts
// @include        http://apps.facebook.com/luckyspace/*
// @include        http://www.facebook.com/*
// @exclude        http://www.facebook.com/groups/*
// @exclude        http://www.facebook.com/editaccount*
// @exclude        http://www.facebook.com/friends/*
// @exclude        http://www.facebook.com/settings*
// @exclude        http://www.facebook.com/help/*
// @exclude        http://www.facebook.com/logout*
// @exclude        http://www.facebook.com/login*
// @exclude        http://www.facebook.com/ajax/*
// @exclude        http://www.facebook.com/reqs*
// @exclude        http://www.facebook.com/campaign/*
// @exclude        http://www.facebook.com/notifications*
// @exclude        http://www.facebook.com/editprofile*
// @exclude        http://www.facebook.com/posted*
// @exclude        http://www.facebook.com/plugins*
// @exclude        http://www.facebook.com/home.php?sk=group_*
// @exclude        http://www.facebook.com/*/posts/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.1
// @require        http://sizzlemctwizzle.com/updater.php?id=116682&days=1
// @copyright      Hazado
// ==/UserScript== 
(function() { 

	//********************************************************************************
	//***** the auto update function needs a easy way to get the current version *****
	//***** this should match the @version above                                 *****
	//********************************************************************************
	var version = "0.1";
	var appID="192043437473459";
	var scriptID="116682";

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
	
        //returns information to the main WM script via the address bar, 
        //allowing cross domain conversations
	function sendMessage(s){
		unsafeWindow.parent.window.location.hash = s;
	}

	//********************************************************************************
	//***** this section must be tailored to fit your specific needs             *****
	//***** instructions are included in each section                            *****
	//********************************************************************************

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			window.setTimeout(dock,500); //try again in a bit
			return; //cannot find docking door
		}

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+appID);
		if (doorMark) return; //already posted to door

		var attachment={
			appID:appID,
			name:'Lucky Space',
			thumbsSource:'cdn.abitlucky.com',
			
			flags:{httpsTrouble:false,requiresTwo:false,skipResponse:true,alterLink:false},

			accText: {
				Energy		:	'Energy',
				Condo		:	'Condo',
				Identify	:	'Identify',
				Give		:	'Give',
			},

			alterLink: {
				//see tutorial page on the wiki for details about this object
			},

			tests: [
				{link:"Have a jolt",ret:"Energy"},
				{link:"Join the Space Party",ret:"Condo"},
				{link:"Go Team",ret:"Identify"},
				{link:"Give",ret:"Give"},
				{link:"Let's",ret:"Give"},
			],

			menu: {
			
				SSsection_main:{type:"section",label:"Lucky Space Manager Options ("+version+")",kids:{
					SSupdateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/114634.user.js"},
					SSsep:{type:"separator",label:"Basics",kids:{
						Energy:{type:"checkbox",label:"Help with Energy"},
						Condo:{type:"checkbox",label:"Help with Condo"},
						Identify:{type:"checkbox",label:"Help Identify Component"},
						Give:{type:"checkbox",label:"Help with Part"},
					}},
					
				}},
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+appID,'data-ft':attString}));

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
			} catch(e){window.setTimeout(main.run,500);return;}

		//*************************************************************************************
		//***** this section must be tailored to fit your specific needs                  *****
		//***** below is a list of searches for text pertaining to various messages       *****
		//***** the list below is not generic and targets Empires and Allies specifically *****
		//***** you will need to find the specific texts for the game you selected        *****
		//*************************************************************************************
		//***** The WM script can recieve and act on the following statusCode values:     *****
		/*
			  1: Acceptance, no stipulations
			  0: Unknown return, use this only if your script encounters unplanned results and can still communicate a result
			 -1: Failure, generic
			 -2: Failure, none left
			 -3: Over Gift Limit failure
			 -4: Over Gift Limit, still allows sending gift, marked as accepted
			 -5: Identified server error
			 -6: Already got, failure marked as accepted
			 -7: Identified server down for repairs
			 -8: Problem finding a required action link
			 -9: reserved for WM functions
			-10: reserved for WM functions
			-11: Identified as expired
			-12: Post source is not a neighbor and neighbor status is required. Future WM version will auto-add neighbor if possible.

			//additional codes may now exist, please check the wiki support site for information
		*/
		//*************************************************************************************

			if (html.find("You have collected"))statusCode=1;
			else if (html.find('You have already clicked that wallpost'))statusCode=-6;

			else if (doc.textContent=="")statusCode=-5;  //no document body

			//multi-lingual checking, but status codes are very limited
			else if (html.find('notAccepted'))statusCode=-1; 

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

	
	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}
	main.run();

})(); // anonymous function wrapper end