// ==UserScript==
// @name           Wall Manager Sidekick (War of Mercenaries)
// @description    Assists Wall Manager with War of Mercenaries posts
// @include        htt*://apps.facebook.com/warofmercenaries/*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @version        0.1.8
// @copyright      Nilson Tan
// ==/UserScript==

/* my notes.

first test

end notes */

(function() {
	//prevent reading data from top page because it does not contain useful information and can trick the sidekick

	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return; //comment this line out if you A) do not get your accept/fail messages from an iframe, or B) the game ticker does not affect you or draw to your collection pages.

	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "0.1.8";
	var appID="406229512723084";
	var scriptID="171689";
	var appName="War of Mercenaries";
	var appIcon="https://fbcdn-photos-e-a.akamaihd.net/hphotos-ak-ash3/851565_600100046669362_318877745_n.png"; 
	
	//returns information to the main WM script via the address bar, 
    //allowing cross domain conversations
	// ** updated to allow deeper windows to fire a return message
	function sendMessage(s,hwnd){
		hwnd = (hwnd||window.top);
		try {
			hwnd.location.hash = s;
		} catch (e) {
			hwnd.location.href = "http://apps.facebook.com/?#"+s;
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
		];
 
		//mark all these as new while building the menus
		//these items will appear highlighted in the options menu
		var newItems=[
		];

		//manage tests here
		var tests=[

			//catch stuff that will be missed by material name searches here
			{url:"/?utt=",ret:"exclude"},
            {url:"link_reward",ret:"gifts"},
		];

                accTexts={};


		//manage your menu here
		menu={
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				sep:{type:'separator',label:'Get Items',kids:{
					gifts:{type:"checkbox",label:"Gifts"},
					doUnknown:{type:"checkbox",label:"Process Unknown Links"},
				}},
			}},
		};

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
			accText:mergeJSON(accTexts), 
			tests:tests,
			menu:menu,
		});
	};
	

	function read(){
		try{
			var statusCode=1;
			text=document.documentElement.textContent;
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

		//out
		if (text.match(/(OUT OF REWARDS)/)) statusCode=-2; 
 			
		//claimed
		else if (text.match(/(ALREADY CLAIMED)/)) statusCode=-6; 
		
		//server errors
		else if (text=="") statusCode=-5;

		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(read,1000); //restart if nothing was found of value
	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.href.startsWith('http://www.facebook.com/')) dock(); else read();

})(); // anonymous function wrapper end