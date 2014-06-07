// ==UserScript==
// @name           Wall Manager Sidekick MyVegas
// @description    Assists Wall Manager with MyVegas posts
// @include        http*://playmyvegas.playstudios.com/*
// @include        http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @version        1.1a
// @copyright      Ninboy
// ==/UserScript==

(function() {
	if ((window.top==window.self) && !window.location.href.match( /(^http(s)?:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) {
		if (window.top==window.self) Sidekick.listen();
		window.addEventListener("onBeforeUnload", Sidekick.unlisten, false);	
		// return; // Commented to make the iframe return the values
	}

	var version = "1.1"; //use something like 1.2.3.4 where 1 is the version, 2 is the major revision, 3 is the minor revision, and 4 is a bug fix
	var appID="157657061011560"; //find your appID on facebook or use google
  var scriptID="159084"; //the id of your script on userscripts.org
  var appName="myVEGAS"; //the text name of the app/game you are collecting for
	var appIcon="https://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v43/69/470922329631165/app_115_470922329631165_1717147067.png"; //example:"http://photos-d.ak.fbcdn.net/photos-ak-snc1/v85006/71/100333333405439/app_2_100333333405439_3507.gif"
	
	var supportWM2=false;

	function dock(){
		var materials = [
			{
			  name:"Chips",
			  id:"chips",
			  event:"chips"
			}
		];

		var newItems=[];

		var sendWords = ["Help"];

    var accTextGet={}, accTextSend={};
		accTextGet = accTextFromData(materials,"","",MENU_ID_ENFORCE_NAME); 
		accTextGet = accTextFromData(materials,"send","",MENU_ID_ENFORCE_NAME); 
		
		var accTextCustoms = {
			doUnknown:"Unknown", //needed if your script contains the menu item "doUnknown" (which is added by default now by WM host)
			send:"Unknown", //needed if your script returns just "send" without a material name and "sendall" is used in the menu
			chips:"Chips", 
		};
		
		var searchList = searchFromData(materials); //pulls the id||name field from the materials object above to use as a search term

		var tests=[
		  { 
		    search:"link",
		    find:"Help and get",
		    ret:"sendchips"
		  },
		  { 
		    search:"link",
		    find:"Collect",
		    ret:"chips"
		  },
		  { 
		    search:"link",
		    find:"Try to beat",
		    ret:"chips"
		  }
		];

		menu={
			section_main:{
			  type:"section",
			  label:appName+" ("+version+")",
			  kids:{
				  updateSidekick: {
				    type:'link',
				    label:'Update Sidekick',
				    href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'
			    },
				  sep_GET: {
				    type:'separator',
				    label:'Get Items',
				    kids: {
					    chips: {
					      type:"checkbox",
					      label:"Chips"
				      },
					    doUnknown: {
					      type:"checkbox",
					      label:"Process Unknown Links"
				      }
				    }
				  },
				  sep_SEND: {
				    type:"separator",
				    label:"Send Items",
				    kids:{
   					  sendchips: {
   					    type:'checkbox',
   					    label:'Send Chips'
 					    },
					    send: {
					      type:'checkbox',
					      label:'Send Unrecognized Items'
  				    }
				  }},
			  }
			},
		};

		menuFromData(materials,menu["section_main"]["kids"]["sep_GET"]["kids"],newItems,""); //attach a list of materials to the GET block
		menuFromData(materials,menu["section_main"]["kids"]["sep_SEND"]["kids"],newItems,"send"); //attach a list of materials to the SEND block

		Sidekick.dock({
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:null,
			flags:{postMessageCompatible:true}, 
			alterLink:{}, //<-- see wiki for details on this one
			icon:appIcon,
			desc:null,
			accText:mergeJSON(accTextGet,accTextSend,accTextCustoms), //joins automatically generated texts with your custom texts
			tests:tests,
			menu:menu,
			skType:0,
		});
	};
	
	function read(){
		try{
			var statusCode = 0, text = document.documentElement.textContent;
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
			
			

		*************************************************** */

		//accepts
		if (text.match(/(Congratulations|myVegas Chips|You have been awarded|Hurry|You just received|You just helped)/)) statusCode=1;
		
		//already claimed
		else if (text.match(/you may have redeemed/)) statusCode=-6;
 
		//over-limits
		else if (text.match(/Your chip stack is full/)) statusCode=-3; 
 			
		//all-outs
		else if (text.match(/too slow/)) statusCode=-2;

		//generic fails
		else if (text.match(/having trouble figuring that one out/)) statusCode=-1;

		//expired fail
		else if (text.match(/this feed bonus has expired/)) statusCode=-11;

		//server errors
//		else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		else if (text=="") statusCode=-5;
		
		//here we actually pass back the status code
		//REVISED 2012.10.09
		if (statusCode!=0) {
			Sidekick.sendStatus(statusCode);
			if (supportWM2) sendMessage("status="+statusCode); //may cause cross-domain errors in chrome
		} else window.setTimeout(read,1000); //restart if nothing was found of value
		
	};

	
	
	
	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.host=='www.facebook.com') {
		dock(); //runs the dock function above to connect to the host
		Sidekick.openChannel(); //new WM 3 methods for communication to host
	} else read(); //runs the sidekick functions to determine post process accept/fail status

})(); // anonymous function wrapper end