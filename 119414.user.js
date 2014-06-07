// ==UserScript==
// @name	Wall Manager Sidekick (Mafia Wars 2)
// @namespace   WM_Mafia_Wars_2_Sidekick
// @description	Assists Wall Manager with 'Mafia Wars 2' posts
// @include	/^https?:\/\/(.*)\.mw2\.zynga\.com\//
// @include	/^http:\/\/www\.facebook\.(com)\/pages\/FB-Wall-Manager\//
// @require     http://userscripts.org/scripts/source/123889.user.js
// @version	0.0.9.1
// ==/UserScript== 

(function() {	// anonymous function wrapper start

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.9";		// This should match the @version above in the usersctipt meta-block
	var appID='121581087940710';	// Unique ID of the Facebook Application.
	var appName='Mafia Wars 2';	// Name of the Facebook Application.
	var scriptID='119414';		// Unique userscripts id.

	var materials=[
		{id:"bossVisit=true", name:"Boss Help"},
		{id:"149303",  name:"Energy", event:"Basics"},
		{id:"2425817", name:"Molotov"},
		{id:"2425859", name:"Pills"},
		{id:"2504140", name:"Aluminum"},
		{id:"2504524", name:"Aramid"},
		{id:"2504543", name:"Black Powder"},
		{id:"2504562", name:"Concrete"},
		{id:"2504712", name:"Laser Sight"},
		{id:"2504744", name:"Metal Sheet"},
		{id:"2504763", name:"Neon Tubes"},
		{id:"2504782", name:"Mini Jet"},
		{id:"2504877", name:"Tough Lining"},
		{id:"2504957", name:"Steel Rod"},
		{id:"2504979", name:"Spider Silk"},
		{id:"2505036", name:"Wire"},
		{id:"2663572", name:"Recommendation"},
		{id:"2690320", name:"Health"},
		{id:"2741628", name:"Lottery"},
		{id:"2845895", name:"Brains"},
		{id:"2979599", name:"Pictures"},
		{id:"3201786", name:"Siren", event:"Safe House"},
		{id:"3201807", name:"Kevlar Plate"},
		{id:"3201828", name:"Alarm Bell"},
		{id:"3201849", name:"Security Badge"},
		{id:"3201870", name:"Radio"},
		{id:"3250183", name:"Ammo Clip"},
		{id:"3250204", name:"Saw Table"},
		{id:"3250225", name:"Weapon Crate"},
		{id:"3250246", name:"Scrap Metal"},
		{id:"3250267", name:"Gun Holster"},
		{id:"3274467", name:"Bedpan"},
		{id:"3274502", name:"Defibrillator"},
		{id:"3274651", name:"Syringe"},
		{id:"3279661", name:"Teeth"},
		{id:"3289063", name:"Sand Bag"},
		{id:"3289157", name:"Practice Dummy"},
		{id:"3289178", name:"Metal Railing"},
		{id:"3289199", name:"Polyfoam"},
		{id:"3289220", name:"Rope"},
		{id:"3316964", name:"Gun Part"},
		{id:"3337091", name:"Ornament",event:"Seasonal"},
		{id:"3337221", name:"Worker Elf",event:"Seasonal"},
		{id:"3337256", name:"Pinecone Grenade",event:"Seasonal"},
		{id:"3341196", name:"Spiked Eggnog",event:"Seasonal"},
		{id:"3343087", name:"Party Favor",event:"Seasonal"},
		{id:"3343963", name:"Snowball",event:"Seasonal"},
		{id:"3426254", name:"Cooler"},

		{id:"3390789", name:"Alien Token",event:"Arena"},
	];

	//add the menu id's of all new items here
	//menu id's follow this format: for Weapon Crate, you would have "sendweaponcrate"
	//marking an item as new highlights it so users can find it easier, or notice what has changed
	var newItems = [
		"send3390789",
	];


	function dock(){

		var searchList = searchFromData(materials);

		var accTextCustoms={reward:"Reward",send:"Unknown",doUnknown:"Unknown"};
		var accTextMaterials=accTextFromData(materials,"send");

		var menu={
			mainsec:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/"+scriptID+".user.js"},

				getsep:{type:"separator",label:"Basics",kids:{
					reward:{type:"checkbox",label:"Get rewards"},
					doUnknown:{type:"checkbox",label:"Process unknown links"},
				}},
				sendsep:{type:"separator",label:"Actions",kids:{
					sendall:{type:"checkbox",label:"Send All Requested Items (or pick from list below)"},
					sendbosshelp:{type:"checkbox",label:"Help with Boss fights"},
					send:{type:"checkbox",label:"Send Unknown"},
				}},
			}}
		};

		menuFromData(materials,menu.mainsec.kids.sendsep.kids,newItems,"send");

		var tests=[
			{link:appName,ret:"exclude"}, // Ignore certain posts that invite you to play the game
			{url:"rivalId=",ret:"exclude"}, //rival help takes user to game to help fight

			{url:'bossVisit=true', ret:"sendbosshelp"},

			// Send materials links
			{url:'rewardType=', ret:"none", kids:[
				{url:"{%1}&",subTests:searchList,ret:"send{%1}"},
			]},

			// Get generic rewards links
			{url:'rewardType=', ret:"none", kids:[					
				{url:'146360',	ret:"reward"},
				{url:'2346318',	ret:"reward"},
			]},
		];

		Sidekick.dock({
			appID:appID,
			name:appName,
			thumbsSource:null,
			flags:{},
			alterLink:{},
			icon: "http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/90/121581087940710/app_2_121581087940710_1109.gif",
			desc:null,
			version:version,
			accText: mergeJSON(accTextMaterials,accTextCustoms), 
			tests:tests,
			menu:menu,
		});
	};

	function read(){
		try { var text = document.documentElement.textContent; } catch (e) {window.setTimeout(read,1000); return;}

		if(!text) {
			//no document text to read
			sendMessage("status=-5"); return;
		}

		//already accepts
		else if (text.match( /(You have already received)/ )) {
			sendMessage("status=-6"); return;
		}

		//all-outs
		else if (text.match( /(The maximum number of rewards)/ )) {
			sendMessage("status=-2"); return;
		}

		//odd fails
		else if (text.match( /(Couldn't find ViralReward|Collecting own reward)/ )) {
			sendMessage("status=-5"); return;
		}

		//accepts
		else if (text.match( /(You (have )?received|Thanks for helping out)/ )) {
			sendMessage("status=1"); return;
		}

		window.setTimeout(read,1000);
	};

	//check for dock.
	if (window.location.href.match(/^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\//)) dock(); else read();

})();	//	anonymous function wrapper end