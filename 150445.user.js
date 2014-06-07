// ==UserScript==
// @name           JetSet Secrets by B
// @description    Assists Wall Manager with JetSet Secrets posts
// @include        http://apps.facebook.com/jetsetsecrets/feed*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @version        1.1 15/12/2012
// @copyright      Brigitte
// ==/UserScript==

(function() {
	//prevent reading data from top page because it does not contain useful information and can trick the sidekick

	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return; //comment this line out if you A) do not get your accept/fail messages from an iframe, or B) the game ticker does not affect you or draw to your collection pages.

	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "1.1 15/12/2012";
        var appID="397323450315564";
        var scriptID="150445";
        var appName="JetSet Secrets";
	var appIcon="http://photos-c.ak.fbcdn.net/photos-ak-snc7/v85005/24/397323450315564/app_1_397323450315564_1138496952.gif"; //example:"http://photos-b.ak.fbcdn.net/photos-ak-snc7/v85005/224/225496380820004/app_2_225496380820004_1276954631.gif"


	//attempt to dock with the WM host script
	function dock(){

		//enter material names here as objects
		//each object takes a name, id and event
		//id defaults to name - spaces and lowercase
		//event defaults to "Unsorted"
		//flags defaults to null
		var materials = [
			{name:"clue"}, //creates a material called clue and found by searching for clue, listed under "unsorted"
			{name:"nail gun", id:"nailgun"}, //creates a material called "nail gun", found by searching for "nailgun", listed under "unsorted"
			{name:"spackle", event:"basics"}, //creates a material called "spackle", found by searching for "spackle", listed under "basics"

			{name:"xp", flags:"basics"}, //this material can be later searched for using the matchByParam function
		];

		//mark all these as new while building the menus
		//these items will appear highlighted in the options menu
		var newItems=[
			"sendnailgun",
		];

		//these words generally denote a send type bonus
		//modify this list to fit your needs
		var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		//manage accept texts here
		var accTextGet={}, accTextSend={};
		accTextGet = accTextFromData(materials); //omit this line if you will only be sending stuff
		accTextSend = accTextFromData(materials,"send"); //omit this line if you will only be getting stuff
		var accTextCustoms = {
			doUnknown:"Unknown", //needed if your script contains the menu item "doUnknown"
			send:"Unknown", //needed if your script returns just "send" without a material name and "sendall" is used in the menu

			//add any other custom texts you want here, or rewrite texts generated above in accTextGet or accTextSend
			//example: 
			xp:"XP", //instead of something accTextGet might contain such as xp:"Xp". Note the case difference.

			//here are the other entries for menu items below
			coins:"Coins", energy:"Energy",
		};
		
		//get a list of search terms from the materials object. These terms are built specifically for text searches
		//there is no need to worry about case because the searchable portion and the search terms are all converted to lower case in the WM host
		var searchList = searchFromData(materials);
		var searchListNoSpaces = searchList.noSpaces(); //this version contains no spaces in each element

		//manage tests here
		var tests=[
			//catch stuff that will be missed by material name searches here
			{url:["VRL_ASK_ENERGY"],ret:"sendenergy"},
			{url:["VRL_HIGH_SCORE"],ret:"energy"},

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
			{link:["xp"], ret:"xp"}, //get xp
			{link:["coins","monedas","pièces","münzen"], ret:"coins"}, //get coins
			{link:["clue","indice","pista"], ret:"clue"}, //get clues
			{link:["energ"], ret:"energy"}, //get energy

		];

		//manage your menu here
		menu={
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				sep_GET:{type:'separator',label:'Get Items',kids:{
					coins:{type:"checkbox",label:"Coins"},
					xp:{type:"checkbox",label:"XP"},
					energy:{type:"checkbox",label:"Energy"},
					clue:{type:"checkbox",label:"Clues"},
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
		} catch(e){window.setTimeout(read,1000);return;} 

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
		if (text.match(/(Sorry, (Y|y)ou('ve)? already clicked on this link)/)) statusCode=-6; 
 
		//over-limits
		else if (text.match(/(Sorry, you've clicked on too many links today - try again tomorrow)/)) statusCode=-3; 
 			
		//all-outs
		else if (text.match(/(Sorry, this link has expired|all the (.*) (have|has) been claimed|no longer available)/)) statusCode=-2; 

		//generic fails
		else if (text.match(/(can't claim this reward)/))statusCode=-1;

		//expired fail
		else if (text.match(/(this reward has expired)/))statusCode=-11;

		//server errors
		else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		else if (text=="") statusCode=-5;

		//accepts
		else if (text.match(/((Y|y)ou('ve)? successfully (accepted this gift!|helped your friend!))/)) statusCode=1;

		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(read,1000); //restart if nothing was found of value
	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.href.startsWith('http://www.facebook.com/')) dock(); else read();

})(); // anonymous function wrapper end