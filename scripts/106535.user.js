// ==UserScript==
// @name           Wall Manager Sidekick (<app name here>)
// @description    Assists Wall Manager with <app name here> posts
// @include        <app reward page  here>
// @include        https://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @version        <version here>
// @copyright      <your name here>
// @version        3.0.3.1
// ==/UserScript==

/* Notes******************************************************************

	Do NOT remove the @require line for script 123889. Those parts are
	very much needed for chrome support and to make this sidekick
	work without you having to rewrite the majority of its functions.
	
	Do NOT remove the @include for the launch page:
	http://www.facebook.com/pages/FB-Wall-Manager/*
	or communication with the host will be destroyed

	If you want to make a sidekick that is for WM 2 before WM 3 is 
	fully released, I suggest reading a previous version of this 
	sidekick tutorial script
	
	See bottom of this file for revision list
	
	

*********************************************************************** */

(function() {

	//special events for window.top but not during docking
	//REVISED 2012.10.09
	if ((window.top==window.self) && !window.location.href.match( /(^http(s)?:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) {
		
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
	var version = "<version here>"; //use something like 1.2.3.4 where 1 is the version, 2 is the major revision, 3 is the minor revision, and 4 is a bug fix
	var appID="<app id here>"; //find your appID on facebook or use google
     var scriptID="<script id here>"; //the id of your script on userscripts.org
     var appName="<app name here>"; //the text name of the app/game you are collecting for
	var appIcon="<app icon url here>"; //example:"http://photos-d.ak.fbcdn.net/photos-ak-snc1/v85006/71/100333333405439/app_2_100333333405439_3507.gif"
	
	//option to report WM2 statuses to the address bar, allowing backward
	//support for WM2 when WM3 is released. This may cause errors in chrome.
	//ADDED 2012.10.09
	var supportWM2=false;

	//attempt to dock with the WM host script
	function dock(){
		//MORE EXPLANATION ADDED 2012.11.14
			
		//there are many built in ways to create a name:searchID relationship
		//below are shown most methods, but others exist for special needs
		//if none of the methods below looks like something you can use
		//just ask on the wiki for clarification, or to design something
		//that works for you
		
		//enter materials here as objects
		//each object takes a name, id and event, as well as any other params
		//you wish to give them
		//id defaults to what you supply in name
		//id is the text you search for to detect a post type
		//name defaults to what you supply in id
		//event defaults to "Unsorted"
		//flags and other params are undefined unless you supply them

		var materials = [
			//creates a material called "Clue" found by searching for "clue", listed under "unsorted"
			//note the caps "Clue" where name below is not in caps
			{name:"clue"}, 
			//bonus code:clue, text name:"Clue", find:"clue"

			//creates a material called "Nail Gun", found by searching for "jimbob", listed under "unsorted"
			//note the caps "Nail Gun" where name below is not in caps
			{name:"nail gun", id:"jimbob"},
			//bonus code: jimbob, text name:"Nail Gun", find:"jimbob"

			//creates a material called "Jimbob", found by searching for "jimbob", listed under "unsorted"
			//note the caps "Jimbob" where id below is not in caps
			{id:"jimbob"},
			//bonus code: jimbob, text name:"Jimbob", find:"jimbob"

			//creates a material named "Spackle", found by searching for "spackle", listed under "basics"
			//note the caps "Spackle" where name below is not in caps
			{name:"spackle", event:"basics"},

			//this material can be later searched for using the 
			//matchByParam function and pulling only items where 
			//flags matches
			//see more about this on the wiki
			{name:"xp", flags:"basics"},
			
			//JUST TO RECAP: 
			
			//The name is the visual name of the
			//material, both in posts, and in your menu. The menu
			//will automatically capitalize the first letter of
			//every word. Words like XP will display as Xp unless
			//you fix them below.
			//The id field should not be confused as the 
			//bonus type code. The id is NOT the type code of an item 
			//UNLESS you use the id field. That means if you omit the
			//id field, the type code of an item is the NAME field in 
			//lower case minus spaces. If you DO supply an id field, 
			//the searches will use it as the text by which your material 
			//is detected. For instance, if you want to identify 
			//blueberries, but the post says fruit, you then specify an 
			//id of "fruit" not "blueberries", in which case the 
			//type code of your item is ALSO "fruit" not "blueberries".
			//If you don't like that scenario, find information
			//regarding my flags for enforcing menu NAME fields
			//as internal id's.
			//If you supply no event field, the script will put
			//that material in an "Unsorted" group. That can be messy.
			//All other fields are optional, and you may use them
			//however you want.
		];

		//mark all these as new while building the menus
		//these items will appear highlighted green in the options menu
		//this sidekick tutorial has but one color for new items. 
		//if you need more colors, ask for DDM's color handler to be cloned to your sidekick
		//add bonus codes here
		var newItems=[
			"sendnailgun",
		];

		//these words generally denote a send type bonus
		//modify this list to fit your needs
		//not all sidekicks will want to differentiate between send and get type bonuses, but I built this for FrontierVille
		//which had daily limits of two sorts so I needed to differentiate
		var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		//manage accept texts here, which are true text names of your bonuses
		var accTextGet={}, accTextSend={};
		//by default, this sidekick will have text for both sent and collected items by name
		accTextGet = accTextFromData(materials); //omit this line if you will only be sending stuff
		accTextSend = accTextFromData(materials,"send"); //omit this line if you will only be getting stuff
		
		//if you need to enforce the NAME field of your material when creating
		//bonus codes, but you used the ID field above, do this instead:
		accTextGet = accTextFromData(materials,"","",MENU_ID_ENFORCE_NAME); 
		accTextGet = accTextFromData(materials,"send","",MENU_ID_ENFORCE_NAME); 
		//there is more to using that MENU_ID_ENFORCE_NAME flag
		//so if you need help with something, just contact me
		
		//enter below anything you want special, something changed, or to correct text messed up by the game creators
		var accTextCustoms = {
			doUnknown:"Unknown", //needed if your script contains the menu item "doUnknown" (which is added by default now by WM host)
			send:"Unknown", //needed if your script returns just "send" without a material name and "sendall" is used in the menu

			//add any other custom texts you want here, or rewrite texts generated above in accTextGet or accTextSend
			//example: 
			xp:"XP", //instead of something accTextGet might contain such as xp:"Xp". Note the case difference.

			//here are some other entries for menu items below. This is the kind of thing this sidekick will generate automatically
			coins:"Coins", 
			energy:"Energy", 
			
			// You do NOT need to enter all the stuff that accTextFromData
			// above will automatically create for you. Only enter the stuff
			// you want/need to fix, or make different from what the 
			// automatics will do.
		};
		
		//get a list of search terms from the materials object. These terms are built specifically for text searches
		//there is no need to worry about case because the searchable portion and the search terms are all converted to lower case in the WM host
		var searchList = searchFromData(materials); //pulls the id||name field from the materials object above to use as a search term
		//var searchListNoSpaces = searchList.noSpaces(); //this version contains no spaces in each element

		//note that if you needed to make use of the built in MENU_ID_ENFORCE_NAME
		//flag, this method is not going to work for you.
		
		
		
		
		//manage tests here. tests are the actual search commands performed on post data to determine what they give
		//there are two forms by which you can make tests
		
		//Form1: {<search_where>:<find_what>, ret:<return_value>} 
		//		OR find multiple terms at once {<search_where>:[<find_what>,<find_what>], ret:<return_value>}
		//Form2: {search:<search_where>, find:<find_what>, ret:<return_value>} 
		//		OR find multiple terms at once from multiple places {search:[<search_where>,<search_where>,...], find:[<find_what>,<find_what>,...], ret:<return_value>}
		//See wiki for more options
		var tests=[
			//catch stuff that will be missed by material name searches here
			{search:["url"], find:["VRL_ASK_ENERGY"], ret:"sendenergy"}, //this searches in the url of a bonus link to find some special code
			{search:["url"], find:["VRL_HIGH_SCORE"], ret:"energy"},

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

			//you will want to change the previous send and get tests to fit your specific needs
			//make use of the link, body, title, and html searches as well as the many other types documented on the wiki
			
			//note that if you needed to make use of the built in MENU_ID_ENFORCE_NAME
			//flag, this method is not going to work for you.

			//you may want to toss in some link text catch alls for stuff missed by previous searches
			//below are several examples using the old Form-1 search/test shortform for link searches
			//see the wiki for more details about the old Form-1 methods
			{link:["xp"], ret:"xp"}, //get xp
			{link:["coins","monedas","pièces","münzen"], ret:"coins"}, //get coins
			{link:["clue","indice","pista"], ret:"clue"}, //get clues
			{link:["energ"], ret:"energy"}, //get energy

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
					coins:{type:"checkbox",label:"Coins"},
					xp:{type:"checkbox",label:"XP"},
					energy:{type:"checkbox",label:"Energy"},
					clue:{type:"checkbox",label:"Clues"},
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
		
		//special: menuFromData automatically uses the id||name given in the materials object above, which assumes you are identifying
		//items with the same text they might be named as, allowing you to simply omit the id or name field above
		//however, if you identify an item with the word "fruit01" but its actually a "Blueberry", then your id may not be what you want
		//listed in your menu. In that case, you can force the menuFromData function to render the name field exclusively by using a flag
		//menuFromData(materials,menu["section_main"]["kids"]["sep_GET"]["kids"],newItems,"",MENU_ID_ENFORCE_NAME);
		//for more details about this special flag, contact me

		
		
		
		//send all this information in to the WM script
		//this sidekick function relays all the information you provided here to the host script when 
		//this sidekick activates on the same page as the host
		//for details on specific parts, please see the wiki
		Sidekick.dock({
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:null,
			//this is required for WM3 sidekick handler for use with Chrome
			//if you leave it out, you MUST provide support for WM2 above
			flags:{postMessageCompatible:true}, 
			//As of beta 6, if your sidekick works in chrome 
			//without being postMessageCompatible, pass the 
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

	
	
	
	//If your skType is 0, or you omit the skType, it is assumed this
	//script will be handling the actual bonus confirmation pages.
	//If your skType is 1, you do not need to supply this section.
	//However, if the main sidekick you are assisting is having an issue
	//finding a certain comment, or if you are making a regional language
	//expansion, you may still wish to have a read function.
	//In any case, if you use a read function, it must be willing to
	//dance around other sidekicks that might be trying to help it, so
	//try not to reload/refresh or hammer on buttons with your read function.
	//Nor should the read function return wasteful status codes just to
	//force the process along.
	
	function read(){
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){window.setTimeout(read,1000);return;} 

		/* **************************************************
		Modify this section so it catches your exact
		accept or failure texts returned by the target
		app/game

		You should do everything you can to return the proper
		status code to the WM host.

		Defaults are in RegExp format, but you can 
		change to simple if/then/else or switches
		if you have something better in mind

		The WM script can recieve and act on the following statusCode values:

			"20":"Sidekick returned force accept",
			"3":"Marked as accepted by user",
			"2":"Responseless Collection",
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed",
			"-2":"None Left",
			"-3":"Over Limit (App)",
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
			"-14":"Timeout",
			"-15":"Unrecognized Response",
			"-16":"Passback Link is missing",
			"-17":"Window Missing",
			"-18":"Marked as failed by user",
			"-19":"Over Limit (Bonus Type)",
			"-20":"Sidekick returned force fail",
			"-21":"Cancelled mid-process by user",
			
			
			additional codes may now exist, please check the wiki support site for information
			
			NEW!: WM3 support is achieved with integer values passed directly to the host rather than text values passed via the address bar

		*************************************************** */

		//already claimed
		if (text.match(/((Y|y)ou('ve)? already (responded|claimed))/)) statusCode=-6; 
 
		//over-limits
		else if (text.match(/(cannot have anymore|reached the collection limit|maximum energy has been awarded)/)) statusCode=-3; 
 			
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
		else if (text.match(/(Gift Claimed Successfully|You just got)/)) statusCode=1;

		//here we actually pass back the status code
		//REVISED 2012.10.09
		if (statusCode!=0) {
			Sidekick.sendStatus(statusCode);
			if (supportWM2) sendMessage("status="+statusCode); //may cause cross-domain errors in chrome
		} else window.setTimeout(read,1000); //restart if nothing was found of value
		
		//alternately, if you need WM host to process a secondary link for you, then use this form
		//Sidekick.sendStatus(statusCode,link);
		//OR sendMessage("status="+statusCode+"&link=["+<a big long link full of params here>+"]");
		//you will need to code in a custom portion to actually find that link for you
		//if you need help, see the PT sidekick for ideas. It has a code chunk
		//that parses the entire form and collects every input name:value pair
		//and attaches them to the link
	};

	
	
	
	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.host=='www.facebook.com') {
		dock(); //runs the dock function above to connect to the host
		Sidekick.openChannel(); //new WM 3 methods for communication to host
	} else read(); //runs the sidekick functions to determine post process accept/fail status

})(); // anonymous function wrapper end

/* Recent Changes ********************************************************
	2012.10.XX:
	
	Changes in the wmLibrary script (123889 included above) now allow 
	for better communication with the WM host. These changes will only 
	work for users of WM 3 and above. If you intend to grant backward 
	support, you may continue delivering status codes via 
	window.top.location.hash or a forced redirect to something WM can 
	see. The sidekick can now be flagged with "postMessageCompatible"
	which will cause WM 3's sidekick handler to only listen for WM3 
	compatible return values. Omitting that flag will cause the sidekick 
	handler to only look for WM2 compatible location.hash values.
	I have commented the exact locations of these changes.
	
	The sample tests below have been updated to reflect form-2 tests 
	introduced early in WM 2 during changes to the dynamic grabber. 
	Form-2 is the preferred method for WM3, but there is nothing
	stopping you from using the shorter Form-1 search/find combinations. 
	See the wiki for more details.
	
	The automatic updater script reference has been removed. Updating 
	should now be handled by the script runner.
	
	2012.10.09: 
	
	Edited top level special events (way up top) to help prevent
	firing the listener at the launch page which was wasteful.
	
	Added option to automatically support WM2 status returning if enabled.
	Simply toggle the true/false value.
	
	Added some revised notes to various sections in this script.
	Hopefully those notes will clarify a few things I already discussed
	here and in the wiki page for this script.
	
	2012.11.04:
	
	Added flag "worksInChrome" to be used only if your sk runs in chrome
	even if your script is not flagged "postMessageCompatible". I suspect
	this is going to be rare, since most sidekicks break on chrome with
	the old method due to cross-domain issues (top document not matching
	host name of inner iframes, such as farmville.com and 
	apps.facebook.com/onthefarm).
	
	If you want a debug console such as found in the WM host script,
	you need to include the line...
	// @require        http://userscripts.org/scripts/source/128747.user.js
	...in your script header. Beware that the debug window will start on 
	ANY AND EVERY window/iframe in which the sidekick runs, for any reason.
	Calling any log() commands from the sidekick on those windows will
	generally make a mess when used with nested iframes. You should only
	use the debug window in those frames if you really need them, and 
	should remove the debug console before release. Using the debug console
	on the top document is a much better method, for which you can use
	a modified version of the log() function if needed.
	
	Added better documentation for sidekick parts. Documentation includes 
	changes to the synAppId and addFilters parts.
	
	2012.11.14:
	
	Added better clarification for name and id relationship in the
	automatic materials object.
	
	Added a bit more about special flags.
	
	Although host support for various sidekick types is experimental,
	documentation has been added for the skType parameter of the
	Sidekick.dock function.

	2013.12.20:
	
	Updated include lines to make way for secure protocol. This version includes
	only secure protocol. If you want both, change the https to http*

        Updated Read()/Dock() split to look for location.host instead of
	location.href

	
*********************************************************************** */