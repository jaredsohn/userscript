// ==UserScript==
// @name           Wall Manager Sidekick (Lucky Space)
// @description    Assists Wall Manager with Lucky Space posts
// @include        http://www.facebook.com/*
// @include        http://spaceprod.abitlucky.com/*
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=125769&days=1
// @version        1.2
// @copyright      MajorNewbie
// ==/UserScript==

(function() {
	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "1.2";
	var appID="192043437473459";
    	var scriptID="125769";
    	var appName="Lucky Space";
	var appIcon="http://photos-e.ak.fbcdn.net/photos-ak-snc1/v27562/47/192043437473459/app_1_192043437473459_5084.gif";

	function sendMessage(s){
		try {
			top.location.hash = s;
		} catch (e) {
			console.log(""+e);
			if (window != top) top.location.href = "http://dummy.facebook.com/?#"+s;			
		}
	}

	//attempt to dock with the WM host script
	function dock(){

		//enter material names here as objects
		//each object takes a name, id and event
		//id defaults to name - spaces and lowercase
		//event defaults to "Unsorted"
		//flags defaults to null
		var materials = [
			{name:"Fairchild Blueprint", id:"Fairchild+Blueprint", event:"Blueprints"},
			{name:"Kestral Blueprint", id:"Kestral+Blueprint", event:"Blueprints"},
			{name:"Science Academy Blueprint", id:"Science+Academy+Blueprint", event:"Blueprints"},
			{name:"Spacey's Blueprint", id:"Spacey's+Blueprint", event:"Blueprints"},
			{name:"XenoTech Blueprint", id:"XenoTech+Blueprint",  event:"Blueprints"},
			{name:"Micro Habitation Pod Colonist", id:"Micro+Habitation+Pod", event:"Colonists"},
			{name:"Space Condo Colonist", id:"Space+Condo", event:"Colonists"},
			{name:"Cold Sleep Facility Colonist", id:"Cold+Sleep+Facility", event:"Colonists"},
			{name:"Capacitor", event:"Components"},
			{name:"Container", event:"Components"},
			{name:"Comm. Array", event:"Components", id:"Comm.+Array"},			
			{name:"Dome", event:"Components"},
			{name:"Drill Bit", id:"Drill+Bit", event:"Components"},
			{name:"Fertile Soil", id:"Fertile+Soil", event:"Components"},
			{name:"Fusion Core", id:"Fusion+Core", event:"Components"},
			{name:"Heat Sink", id:"Heat+Sink", event:"Components"},
			{name:"Laser Extractor", id:"Laser+Extractor", event:"Components"},
			{name:"Motherboard", event:"Components"},
			{name:"Oxygen Tank", id:"Oxygen+Tank", event:"Components"},
			{name:"Solar Panel", id:"Solar+Panel", event:"Components"},
			{name:"Transformer", event:"Components"},
			{name:"Component Identification", id:"component_identification", event:"Misc"},
			{name:"Energy", id:"energy", event:"Misc"},
			{name:"Nanobots", id:"repair_token", event:"Misc"},

		];
		//mark all these as new while building the menus
		//these items will appear highlighted in the options menu
		var newItems=[
		];

		//these words generally denote a send type bonus
		//modify this list to fit your needs
		var sendWords = ["needs"];

		//manage accept texts here
		var accTextGet={}, accTextSend={};
		accTextGet = accTextFromData(materials); //omit this line if you will only be sending stuff
		accTextSend = accTextFromData(materials,"send"); //omit this line if you will only be getting stuff
		var accTextCustoms = {
			doUnknown:"Unknown", //needed if your script contains the menu item "doUnknown"
			send:"Unknown", //needed if your script returns just "send" without a material name and "sendall" is used in the menu

			//add any other custom texts you want here, or rewrite texts generated above in accTextGet or accTextSend
			//example: 
			xp:"level", //instead of something accTextGet might contain such as xp:"Xp". Note the case difference.

			//here are the other entries for menu items below
			coins:"Coins", 
		};
		
		//get a list of search terms from the materials object. These terms are built specifically for text searches
		//there is no need to worry about case because the searchable portion and the search terms are all converted to lower case in the WM host
		var searchList = searchFromData(materials);
		var searchListNoSpaces = searchList.noSpaces(); //this version contains no spaces in each element

		//manage tests here
		var tests=[
			//catch stuff that will be missed by material name searches here
			//{url:["VRL_ASK_ENERGY"],ret:"sendenergy"},
			//{url:["VRL_HIGH_SCORE"],ret:"energy"},

			//if send words are found, but material does not exist in the list, returns just "send" so sendall picks it up
			{either:sendWords,ret:"send",kids:[
				//otherwise return the actual material name prefixed with "send". Example: "sendnailgun"
				{url:"{%1}",ret:"send{%1}",subTests:searchList}, //search first in the url
				{either:"{%1}",ret:"send{%1}",subTests:searchList}, //search second in the post link and body
			]},

			//check for getting of materials by id
			{url:"{%1}",ret:"{%1}",subTests:searchList}, //search first in the url
			{either:"{%1}",ret:"{%1}",subTests:searchList}, //search second in the post link and body

			//you will want to change the previous send and get tests to fit your specific needs
			//make use of the link, body, title, and html searches as well as the many other types documented on the wiki

			//you may want to toss in some link text catch alls for stuff missed by previous searches
			//below are several examples
			{link:["spaced"], ret:"xp"}, //get xp
			//{link:["coins","monedas","pièces","münzen"], ret:"coins"}, //get coins
			//{link:["clue","indice","pista"], ret:"clue"}, //get clues
			//{link:["energ"], ret:"energy"}, //get energy

		];

		//manage your menu here
		menu={
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				sep_GET:{type:'separator',label:'Get Items',kids:{
					//coins:{type:"checkbox",label:"Coins"},
					xp:{type:"checkbox",label:"XP"},
					//energy:{type:"checkbox",label:"Energy"},
					//clue:{type:"checkbox",label:"Clues"},
					doUnknown:{type:"checkbox",label:"Process Unknown Links"},
				}},
				sep_SEND:{type:"separator",label:"Send Items",kids:{
 					sendall:{type:'checkbox',label:'Send All (or select from options below)'},
					send:{type:'checkbox',label:'Send Unrecognized Items'},
				}},
			}},
		};

		//attach material lists to the menu
		//menuFromData(materials,menu["section_main"]["kids"]["sep_GET"]["kids"],newItems,""); //attach a list of materials to the GET block
		menuFromData(materials,menu["section_main"]["kids"]["sep_SEND"]["kids"],newItems,"send"); //attach a list of materials to the SEND block

		//send all this information in to the WM script
		Sidekick.dock({
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:null,
			flags:{},
			alterLink:{},
			icon:appIcon,
			desc:null,
			accText:mergeJSON(accTextGet,accTextSend,accTextCustoms), 
			tests:tests,
			menu:menu,
		});
	};
	

	function read(){
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){
			//console.log(e);	
			window.setTimeout(read,1000);return;
		} 

		/* **************************************************
		Modify this section so it catches your exact
		accept or failure texts returned by the target
		app/game

		Anything goes, as long as a status code
		is returned to the main WM host.

		Defaults are in RegExp format, but you can 
		change to simple if/then/else or switches
		if you have something better in mind

		The WM script can recieve and act on the following statusCode values:

			"2":"Responseless Collection",			//normally handled inside WM host
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed", 					//use for reason unknown
			"-2":"None Left", 				//use for reason of already taken
			"-3":"Over Limit",
			"-4":"Over Limit, Sent One Anyway",		//registers as a type of acceptance
			"-5":"Server Error",
			"-6":"Already Got",				//registers as a type of acceptance
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link", 		//used only with special flags
			"-9":"Final Request Returned Null Page", 	//normally handled inside WM host
			"-10":"Final Request Failure",			//normally handled inside WM host
			"-11":"Expired",
			"-12":"Not a Neighbor",				//neighborship required to accept post
			"-13":"Requirements not met",			//level or building requirement
			"-15":"Unrecognized Response",			//prevent waiting for timeout if you know to watch for some known issue

			additional codes may now exist, please check the wiki support site for information

		*************************************************** */

		//already claimed
		if (text.match(/(You have already)/)) statusCode=-6; 
 
		//over-limits
		//else if (text.match(/(cannot have anymore|reached the collection limit|maximum energy has been awarded)/)) statusCode=-3; 
 			
		//all-outs
		else if (text.match(/(Wallpost has been used up)/)) statusCode=-2; 

		//generic fails
		//else if (text.match(/(can't claim this reward)/))statusCode=-1;

		//expired fail
		//else if (text.match(/(this reward has expired)/))statusCode=-11;

		//server errors
		//else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		//else if (text=="") statusCode=-5;

		//accepts
		else if (text.match(/(You have collected)/)) statusCode=1;

		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(read,1000); //restart if nothing was found of value
	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.href.startsWith('http://www.facebook.com/')) dock(); else read();

})(); // anonymous function wrapper end