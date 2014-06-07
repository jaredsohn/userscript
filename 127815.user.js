// ==UserScript==
// @name           Wall Manager Sidekick (Castle Age)
// @description    Assists Wall Manager with Castle Age posts
// @include        *web.castleagegame.com/castle/*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=127815&days=1
// @version        0.0.2
// ==/UserScript==

/**************************
* Credits for a huge portion of this script goes to
* Charlie Ewing & Joe Simmons for their CW WallManager sidekick
**************************/
(function() { 
	var version = "0.0.2";
    var appID="46755028429";
    var scriptID="127815";
    var appName="Castle Age";
	
	var materials=[
	];

	//mark all these as new while building the menus
	var newItems=[
	];

	function dock(){
		//modify to fit your needs
		var sendWords = ["maytap","needs","send","looking for ","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		//compile the list of materials above into accept texts and search terms
		var matList = [], searchList = []; accTexts={};
		if (materials.length) {
			for (var m=0,mat;(mat=materials[m]);m++){
				var id=(mat.id||mat.name).noSpaces().toLowerCase();
				matList.push(mat.name);
				searchList.push(id);
				//accTexts[id]=mat.name.upperWords();
				accTexts["send"+id]=mat.name.upperWords();
			}
			matList.optimize();
			searchList.optimize();
		}
		
		//for accept texts not based on mass materials list above
		//or for overriding the accept text calculated by the material list compiler
		var accTextCustoms={
			cta:"has requested your help",
			elite:"Elite Guard"
		};
		
		var tests=[
			{ret:"exclude", url:[
				"guild_battle.php",
				"guildv2_home.php",
				"index.php",	
			]},

			{ret:"cta", url:[
				"action=doObjective",
				"guild_battle_monster.php",
			]},

			{ret:"elite", url:[
				"party.php",
			]},
		];

		var menu={
			section_main:{ type:"section", label:appName+" ("+version+")", 
				kids:{updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/"+scriptID+".user.js"},
					sep:{ type:"separator", label:"Basics",
						kids:{
							cta:{type:"checkbox",label:"Click CTA"},
							elite:{type:"checkbox",label:"Click Elite Guard help"},
						}
					}
				}
			},
		};
		
		//attach material lists to the menu
		//menuFromData(materials,menu.section_main.kids.getsep.kids,newItems,"");
		//menuFromData(materials,menu.section_main.kids.sendsep.kids,newItems,"send");

		Sidekick.dock({
			appID:appID,
			name:appName, 
			thumbsSource:"image4.castleagegame.com",
			version:version,
			flags:{},
			alterLink:{},
			icon:"http://photos-c.ak.fbcdn.net/photos-ak-snc1/v43/25/46755028429/app_2_46755028429_6218.gif",
			desc:null,
			accText: mergeJSON(accTexts,accTextCustoms), 
			tests:tests,
			menu:menu,
		});
	};

	function run(){
/***********
 * http://apps.facebook.com/castle_age/festival_battle_monster.php?twt2=earth_2_img&casuser=100002364203646&action=doObjective&mpool=3&mid=earth_element&lka=100002364203646&tower=2
* http://apps.facebook.com/castle_age/battle_monster.php?twt2=earth_1_img&casuser=100000291584690&action=doObjective&mpool=3&lka=100000291584690
* http://apps.facebook.com/castle_age/battle_expansion_monster.php?guild_creator_id=657549276&guild_created_at=1317173494&slot=2&monster_slot=1&action=doObjective
* http://apps.facebook.com/castle_age/battle_monster.php?twt2=bosslotus_img&casuser=100000268850769&lka=100000268850769&mpool=1
* 
* You received 100000 gold and 2 experience points for your help in summoning the Valeria Soldiers
* You were the 16th to help summon the Valeria Soldiers, 14 more people are needed to summon the Valeria Soldiers.
* 
* http://apps.facebook.com/castle_age/guild_battle.php?attacker_guild_id=1539760380_1301509988&defender_guild_id=100000736107216_1304821651&battle_type=2000
* http://apps.facebook.com/castle_age/guildv2_home.php?guild_id=611472035_1297401190
* 
* http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&casuser=100002004746627&lka=100002004746627&etw=13
* 
* http://apps.facebook.com/castle_age/guild_battle_monster.php?twt2=alpha_vincent_img&guild_id=100001354708627_1313649557&action=doObjective&slot=3
***/
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){window.setTimeout(run,1000);return;} 

		if (text.find("You have already assisted on this objective!")){
			statusCode=-3;//already claimed
		} else if (text.find("for your help in summoning")){ //Success
			statusCode = 1;
		} else if (text.find("'s is full")){ //Success
			statusCode = -2;
		} else if (text.find("Elite Guard is FULL")){ //Success
			statusCode = -2;
		} else if (text.find("You have received")){ //Success
			statusCode = 1;
		} else if (text.find("You have (0) Festival Monsters")){ //Requirements not met
			statusCode = -13;
		}
		
		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(run,1000); //restart if nothing was found of value
	}

	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.href.startsWith('http://www.facebook.com/'))
		dock();
	else if (window.location.href.indexOf("index.php") < 0)
		run();


})(); // anonymous function wrapper end