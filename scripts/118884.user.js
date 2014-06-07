// ==UserScript==
// @name           Wall Manager Sidekick (kingdom of camelot)
// @description    Assists Wall Manager with KoC posts
// @include        *apps.facebook.com/kingdomsofcamelot/?s=
// @include        *www.facebook.com/*
// @exclude        *www.facebook.com/groups/*
// @exclude        *www.facebook.com/editaccount*
// @exclude        *www.facebook.com/friends/*
// @exclude        *www.facebook.com/settings*
// @exclude        *www.facebook.com/help/*
// @exclude        *www.facebook.com/logout*
// @exclude        *www.facebook.com/login*
// @exclude        *www.facebook.com/ajax/*
// @exclude        *www.facebook.com/reqs*
// @exclude        *www.facebook.com/campaign/*
// @exclude        *www.facebook.com/notifications*
// @exclude        *www.facebook.com/editprofile*
// @exclude        *www.facebook.com/posted*
// @exclude        *www.facebook.com/plugins*
// @exclude        *www.facebook.com/home.php?sk=group_*
// @exclude        *www.facebook.com/*/posts/*
// @version        0.01
// @copyright      Hulk94
// ==/UserScript== 

(function() { 

	//********************************************************************************
	//***** the auto update function needs a easy way to get the current version *****
	//***** this should match the @version above                                 *****
	//********************************************************************************
	var version = "0.01";
        var appID="<your_app_id_here>";
        var scriptID="http://userscripts.org/scripts/show/118884";

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
			//alias:'<your_game_alias_here>', // no longer needed
			//hrefKey:'<your_game_unique_parameter_here>', // no longer needed
			name:'<your_game_name_here>', //how you want it to display
			thumbsSource:'<your_game_assets_url_here>',
			flags:{httpsTrouble:false,requiresTwo:false,skipResponse:false,alterLink:false},

			accText: {
				// Provide a list of definition codes along with their text below
				// Separate codes from text with a colon (:)
				// Separate list items with a comma (,)
				// codes can be surrounded by quotes (" ") if you like
				// text can be surrounded by single or double quotes
				// an example list is provided
				/*
				EAcoins10:'10 Coins',EAcoins25:'25 Coins',EAcoins50:'50 Coins',EAenergy:'1 Energy',EAsendxk1:'Liberty Bond',
				*/
			},

			alterLink: {
				//see tutorial page on the wiki for details about this object
			},

			tests: [
				{link:"go play",ret:"exclude"},

				// Provide a list of tests below as JSON objects
				// tests must include one of the following parameters: url,body,html,link,either
				// tests must include a ret parameter which states the code from accText to link to
				// Separate tests with a comma (,)
				// the test above this option block uses the "exclude" magic word to block facebook "just started playing" notices
				// tests may return the following magic words which behave differently and are hardcoded in the WM script: "exclude","none","wishlist".
				// an example list is provided
				/*

                                //exclude a post by its link text
				{link:"send thank you gift",ret:"exclude"},

                                //exclude a post by part of its link url
				{url:'crew_tend_reminder',ret:'exclude'},
				{url:'neighbor_crew_apply',ret:'exclude'},
				{url:'crew_completion_reminder',ret:'exclude'},
				{url:'energy_request',ret:'exclude'},
				{url:'battle_lost_request_gift',ret:'exclude'},
				{url:'neighbor_request_',ret:'exclude'},
	
                                //return a specific definition based on a url part
				{url:"ask_for_parts",ret:"sendparts"},
                                //return a generic definition based on a url part
				{url:'battle_won_allies',ret:'send'},

                                //both the specific and generic returns will get picked up by the magic menu word "sendall" because the return value starts with "send"

                                //return specific definition based on link text
				{link:'level up',ret:'coins25'},

                                //return specific definition based on post body text
				{body:'wrench',ret:'wrench'},

                                //return specific definition based on HTML behind the post
				{html:'market_built',ret:'coins25'},

                                //return specific definition based on either link text or body text (in that order)
				{either:'coins',ret:'coins25'},


                                //example of how to nest tests!
				{link:'send',ret:'send',kids:[
     				     {body:'wrench',ret:'sendwrench'},
                                ]},

                                //example of how to search for multiple words at once
				{link:["coins","money","gold"],ret:'coins25'},

				//example of how to search for multiple words and return that word
				{link:"send {%1}",ret:"send{%1}",subTests:["wrench","hammer","spanner","screwdriver"]},

				//example of how to search for a range of numbers
				{body:"level {%1} ", subNumRange:"1,20", ret:"FVsampleLow"},

				//example of how to nest tests but return none if inner tests fail
                                //returning "none" allows the script to continue on
                                {link:"send", ret:"none", kids:[
				     {link:"{%1}",ret:"send{%1}",subTests:["wrench","hammer","spanner","screwdriver"]},                                     
                                ]},


				*/
			],

			menu: {
				// Provide a menu tree below as a JSON object
				// Accepted menu item types include: separator, optionblock, link, checkbox, radio, select, hidden, textarea
				// Functions included in the object will be destroyed when passed to the WM script, but
                                // some built in functions are accessible from the elements "button_selectmulti",
                                // "button_highlight" and "button_selectprefix"


				// a very simple example menu is provided below
				/*
				mainsep:{type:'separator',label:'Basics',section:['Empires & Allies ('+ver+')'],kids:{
					updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'}
				}},
				coins50:{type:'checkbox',label:'Coins 50',kids:{
					coins25:{type:'checkbox',label:'25'},
					coins10:{type:'checkbox',label:'10'},
				}},
				wood100:{type:'checkbox',label:'Wood 100',kids:{
					wood50:{type:'checkbox',label:'50'},
					wood25:{type:'checkbox',label:'25'},
					wood10:{type:'checkbox',label:'10'},
				}},
				oil100:{type:'checkbox',label:'oil 100',kids:{
					oil50:{type:'checkbox',label:'50'},
					oil25:{type:'checkbox',label:'25'},
					oil10:{type:'checkbox',label:'10'},
				}},

			        //see more recent versions of EA sidekick for more 
                                //option menu elements

                                //see many more complex elements in use by 
                                //viewing the source for the FV or FrV sidekick

                                //"sendall" is a magic word in the WM main script that
                                //causes any return value with a prefix of "send" to be 
                                //sent even if they are not checked
				sendall:{type:'checkbox',label:'Send All (or select from options below)'},
				sendparts:{type:'checkbox',label:'Send Research Parts'},
				send:{type:"checkbox",label:"Send Other"},
				*/
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

				// you may wish to use a gameLoaded variable, supply a statement that determines if the game has loaded
				// an example gameLoaded query is provided
				var gameLoaded=unsafeWindow.location.href.startsWith('http://fb-client-0.empire.zynga.com/flash.php?') && html.contains('object id="flashapp"');

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

			if (html.find("You've already claimed this reward"))statusCode=-6; //already claimed
			else if (html.find('reached your reward limit'))statusCode=-3; //over limit
			else if (html.find('Your inventory cannot hold any more of this item!'))statusCode=-3;  //over limit
			else if (html.find('You have exceeded your daily limit of gifts'))statusCode=-3; //all daily limit reached
			else if (html.find('Here is one as a reward'))statusCode=1;  //success send one get one
			else if (html.find("Here's a reward of"))statusCode=1;  //success send
			else if (html.find('You just got'))statusCode=1;  //success get
			else if (html.find('You gave '))statusCode=1;  //success give/get one
			else if (html.find('all the rewards have been claimed'))statusCode=-2;  //out of rewards
			else if (html.find('Sorry! These feed rewards have all been collected'))statusCode=-2; //out of rewards

			else if (html.find('you need to reach a higher level before using this reward'))statusCode=-1;  //level too low to claim
			else if (html.find('You cannot accept this reward'))statusCode=-1;  //data missing error
			else if (html.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error
			else if (html.find('This kind of gift is no longer available'))statusCode=-1;  //expired seasonal type
			else if (html.find("You can't send yourself a gift!"))statusCode=-1;  //send self error			
			else if (html.find('This gift is no longer available.'))statusCode=-1;  //generic expired
			else if (html.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error
			else if (html.find('You can only collect feed rewards from your allies'))statusCode=-12;

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

	
	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}
	main.run();

})(); // anonymous function wrapper end