// ==UserScript==
// @name 	Wall Manager Sidekick (AW)
// @description 	Assists Wall Manager with Adventure World posts
// @include        http://*.adventure.zynga.com/reward.php?*
// @include 	http://www.facebook.com/plugins/serverfbml.php
// @include 	http://www.facebook.com/pages/FB-Wall-Manager/*
// @license 	http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require 	http://userscripts.org/scripts/source/123889.user.js
// @require 	http://userscripts.org/scripts/source/128747.user.js
// @require 	http://sizzlemctwizzle.com/updater.php?id=117680&days=1
// @version 	2.13
// @copyright 	Cristian Vlad
// ==/UserScript== 

(function() { 

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return; 
	//comment this line out if you A) do not get your accept/fail messages from an iframe, or B) the game ticker does not affect you or draw to your collection pages.

	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var localDebug = false; //set to false for release, true for local debugging ;)
	var version = "2.13";
	var appID = "130479640376964";
	var scriptID = "117680";
	var appName = "Adventure World";
	var appIcon = "http://photos-c.ak.fbcdn.net/photos-ak-snc1/v85005/60/130479640376964/app_2_130479640376964_6969.gif";

	//you can name your events and stuff in here for later use, and use some smaller code than the actual text words
	var evt={
		Tent_Zoey: 		"Zoey's Tent",
		Tent_Indy: 		"Indy's Tent",
		Tent_Emily_Zoo: "Emily's Zoology Tent",
		Coffee: 		"Coffee Plant",
		SupplyDrop: 	"Supply Drop",
		Site_Ruins: 	"Ruins Site (gives XP)",
		Site_FSerpent: 	"Feathered Serpent Site (gives production parts)",
		Site_Ziggurat: 	"Ziggurat Site (gives building parts)",
		Site_Column: 	"Column Site (gives decor items)",
		Shed: 			"Storage Shed",
		Bazaar: 		"Sallah's Bazaar",
		Obelisk: 		"Egyptian Obelisk",
		Windmill: 		"Windmill",
		Biplane: 		"Biplane",
		BlackMarket: 	"Belloq's Black Market",
		FOY: 			"Fountain of Youth",
		LDChest:		"Lucky dragon chest",
		Generator:		"Generator",
		HydroPlant:		"Hydro Plant",
		FieldKitchen: 	"Field Kitchen",
		ToolYurt: 		"Tibetan Tool Yurt",
		Tent_Trip: 		"Trip's Gadget Tent",
		
		
		Q01_ElDorado: 		"Quest 01: El Dorado",
		//Q02_Volcano: 		"Quest 02: Volcano",
		Q03_Cavern: 		"Quest 03: Cavern",
		Q04_Mountain: 		"Quest 04: Mountain",
		//Q05_DeepJungle: 	"Quest 05: Deep Jungle",
		Q06_SupplyCrash: 	"Quest 06: Supply Crash",
		Q07_HunterMask: 	"Quest 07: Mask of the Hunter",
		//Q08_StandingStones:"Quest 08: Standing Stones",
		Q09_Poachers: 		"Quest 09: Poachers",
		Q10_DarkRitual: 	"Quest 10: Dark Ritual",
		//Q11_SecretElDorado:"Quest 11: The Secret of El Dorado",
		Q12_SkyWarriors: 	"Quest 12: Warriors of the Sky",
		Q13_SunCalendar: 	"Quest 13: Calendar of the Sun",
		Q14_WestPole: 		"Quest 14: West Pole",
		Q15_Zoology: 		"Quest 15: Zoology",
		Q16_GoldRiver: 		"Quest 16: River of Gold",
		Q17_SphinxRiddle: 	"Quest 17: Riddle of the Sphinx",
		Q18_LovePath: 		"Quest 18: Path to Love",
		Q19_LostPyramids: 	"Quest 19: The Lost Pyramids",
		Q20_GotU: 			"Quest 20: Guardian of the Underworld",
		Q21_TriangleIslands:"Quest 21: Triangle Islands",
		Q22_Fae: 			"Quest 22: Courts of the Fae",
		Q23_Sobek: 			"Quest 23: The Head of Sobek",
		Q24_Totem: 			"Quest 24: The Totem of the Ages",
		Q25_SinkIsland: 	"Quest 25: The Sinking Island",
		Q26_Heroic: 		"Quest 26: Heroic expeditions",
		Q27_BeastScrolls: 	"Quest 27: Scrolls of the Beast",
		Q28_Yeti: 			"Quest 28: Mystery of the Yeti",
		Q29_StolenMedallion:"Quest 29: The Stolen Medallion",
		Q30_ArgentOrigins:	"Quest 30: The Story of Argent Origins",
		Q31_BeastOOT:		"Quest 31: Beast out of Time!",
		Q32_PowerVault:		"Quest 32: The Vault of Power",
		Q33_CursedEagle:	"Quest 33: The Cursed Eagle!",
		Q34_Voynich:		"Quest 35: Voynich Manuscript",
		Q35_TopMen:			"Quest 34: Top Men Obstacle Courses",
		Q36_Army:			"Quest 36: The Army of Fate",
		Q37_TwinSerpents:	"Quest 37: Twin Serpents",
		Q38_LostArena:		"Quest 38: The Lost Arena",
		Q39_TIK:			"Quest 39: Tibet iron kitchen",
		Q40_AdventureDays:	"Quest 40: Adventure Days",
		Q41_BdayBd:			"Quest 41: Birthday boondoggle",
		Q42_VotG:			"Quest 42: Vault of the genie",
		
	};

	//you can name your collections here, same way you do for events above
	var col={
		Indy:"Indy (+1 Free crew member)",
		BaseCamp:"Base Camp (+1 Free crew member)",
		ElDorado:"El Dorado (+1 Free crew member)",
		RescuedAnimal:"Rescued Animal (Animal habitat (+$1500/day))",
		Miner:"Miner (Wood)",
		Conq:"Conquistador (Twine)",
		Warrior:"Jaguar Warrior (Thatch)",
		Jewelry:"Volcanic Jewelry (Nails)",
		Arrowhead:"Arrowhead (Leafy Reinforcement)",
		Mountaineer:"Mountaineer (Ram Horn Grip)",
		Weapon:"Volcanic Weapon (Obsidian Grip)",
		LuxuryGoods:"Luxury Goods (Gold Plating)",
		Gemstone:"Gemstone (Diamond Coating)",
	};

	//comprehensive materials list
	//you can put just about anything in here, giving any odd property to any entry
	//standard entries are name=accept text, and id=search term
	//other built in properties include event=group for materials builder (but you probably wont use it the same way)
	var materials=[
	
	//#region basecamp.special
		// moved to link test instead of image test
		//{name:"Join Crew", event:"Special", id: [
		//	"adac207d31d53f254d9b4a5b7422ec0d.png",
		//	"f5cf513233e6fc26666bde2aece895ae.png",
		//]},
		{name:"presents", event:"Special", id:[
			"288a96630b0af7b9dac0560b44975132.png", //blue box
			"451f67c0aa9571b01c0302940bb9344f.png", //holiday tree upgrade to lvl 2
			"8cbeeb7b6b0bd4d1cec76d9b70fd6de5.png", //holiday tree upgrade to lvl 3
			"2951170189a0ce2a128a35d38e5bed0c.png", //holiday tree upgrade to lvl 5
			"b83386b9a5ffd0c702221a322eab0866.png", //holiday tree just planted or holiday spirit
		]},
		
		{name:"special delivery", event:"Special", id:[ //also contains parts fro various building upgrades!
			"36e7ee6ff73ddca1e15cc55a7917b47b.png", //seems discontinued
			"7d8ac84a5ada4e219263597d47843e9e.png", //seems current
		]},
				
		{name:"jungle feed", event:"Special",id:[
			"503f4b6c654f2e10cd075eb9496f5319.png", //sogo, feed_ask_for_resource 					//TODO: all the other ones have standard_feed for jngfeed, feed_quest_complete for XP!
			"a9cce4662bc9476072596e613eb09687.png", //ocelot
			"9cb53edfef736d81545a6963b4b62fb8.png", //capybara
			"1b2f26ea3d10dc72ed46a2990b559974.png", //scarlet macaw
			"56dbaf5f4b8bda8ca9567fb071d7750d.png", //Isis the Ibis
			"05fcf360ed6946be0fd3f15cc141888d.png", //Impeccable the Ibis
			"d6b827224f307e66f75b909bb18358b0.png", //Hoover the Anteater
			"f73442766df8115342ffb620e92ccce5.png", //Amy the Anteater
			"cc5559a7219bec7879bfeaac37b7d73d.png", //Fred the Fennec Fox
			"2cd8f5209ab172ff74ffc6b014fb8dac.png", //Frannie the special Fennec Fox
			"bb51abdfb3c0ec42cd009ffd615f0281.png", //Walter the Woolly Mammoth
			"1d3ab3c45b1db66efe4e1815d1a3433d.png", //Winnie the Woolly Mammoth
			"8934f78b402904631c6043f0c29fb301.png", //Leon the Lion
			"85a3890df34363d2c92a568ad626a04b.png", //Cleo the special Lion
			"62e7fe7fffdcefe6dddabf0bbfe057a1.png", //Hoppi the Baladi rabbit
			"6777730cac273e67c0e65bff7e04b79a.png", //Esther the special Baladi rabbit
		]},
		
		{name:"Permit", event:"expansion", id:[
			"741642619d424ceeb039d4f515624054.png", // sandy shore?, ancient cache? - probably discontinued img
			"9587c2fe12a4cc5f7d4d663fa0f394e8.png", //leafy snarl, rough brush, lost quarry, ancient cache, sandy shore, bygone patch
		]},
		{name:"Survey Scope", 		event:"expansion", id:"322c1b16dbd72bacea4b54874ebeb4a2.png"},
		{name:"Survey Equipment", 	event:"expansion", id:"b80c0c4d91d07e716bc22b43d3310a3a.png"},

	//#region basecamp.building
		// * Farm, Fuel Depot, Well
		{name:"pail",id:"3d7f20d976f1e2dbcb11f36624f456be.png",event:"Basics"}, //water pail
		{name:"food basket",id:"3ac26a33c6e6cf5daceea44a9e6691f1.png",event:"Basics"},
		{name:"wood",event:"Basics",id:[
			"d5f06342b18c378977f4b88e3f7e534a.png",
			"f8eda968983cfb66544e54b647616423.png"
		]},
		{name:"nail", 		id:"8d427179f673a868229fda519be38343.png", event:"Basics"},
		{name:"gas can", 	id:"afb1d18bfa6e710374cb940adf18d994.png", event:"Basics"},
		{name:"thatch", 	id:"8119d4822559743c8825fae02add5105.png", event:"Basics"},
		{name:"tile", event:"Basics", id:[
			"b0a91c7589588eda75a02952141e4741.png",
			"e22b68ab6377bc038e16944a78bd5eec.png"
		]},
		{name:"pipe", 		id:"2345cea7ed681d123605289f52180158.png", event:"Basics"},
		{name:"twine", 		id:"ac28b0dcef48041973c43ecf2b1b42ef.png", event:"Basics"},
		{name:"pump", 		id:"c17f1ad84105396b4c9b72683f6c56da.png", event:"Basics"},
		{name:"top soil", 	id:"cf36e38d0d29b2892d3d1f9dcb991f85.png", event:"Basics"},
		{name:"paint", 		id:"af0d2c9ca0bf0e4e98e74d1c74090e49.png", event:"Basics"},
		// * Tents: Zoey's, Indy's
		{name:"canvas",id:"fce25e81857b76dfa761d628c1e1049f.png",event:evt.Tent_Zoey},
			// * Zoey only
		{name:"animal skin", 		id:"d03dd84d7b0f7911f69c930a4501532c.png", event:evt.Tent_Zoey},
		{name:"antler", 			id:"2a8716d2fc4c9df3cadad831af8091dc.png", event:evt.Tent_Zoey},
		{name:"fine rug", 			id:"e65c51e007f87f25544fcc3aa9f0d37d.png", event:evt.Tent_Zoey},
		{name:"sharpening stone", 	id:"24ad07ef0c1d4131861afa2cf4fea6dd.png", event:evt.Tent_Zoey}, //same as stone wheel in Trip's tent
		{name:"snake cage", 		id:"aa4693454a4c152d9d27117d320508e8.png", event:evt.Tent_Zoey},
			// * Indy only
		{name:"mallet", 		id:"6ce482feb00b46e8d3a326464d8ce0a2.png", event:evt.Tent_Indy},
		{name:"tent stake", 	id:"f3805484704bd82b2f3ab16621b7610e.png", event:evt.Tent_Indy},
		{name:"pillow", 		id:"270ff8f274c9db4505e47b1a0d328e8a.png", event:evt.Tent_Indy},
		{name:"hat rack", 		id:"a5ffdd2c1790b8d05f3cd6378e1516bc.png", event:evt.Tent_Indy},
		{name:"steamer trunk",  id:"2d9dec0e24911d745654b4a7a4855bf1.png", event:evt.Tent_Indy},
		// * Emily's zoology tent
		{name:"chew toy",event:evt.Tent_Emily_Zoo,id:[
			"ad95a86224a34959992747296f7e3ede.png", //seems discontinued
			"7e090ad07cb9acf811d023a0eb6d0a48.png", //seems current
		]},
		{name:"cuddlebug", 		id:"91ff1af4383893d4748295568ba3ac89.png", event:evt.Tent_Emily_Zoo},
		{name:"food bowl", 		id:"cba5f56b6fbee8e56e31f30c5f791b58.png", event:evt.Tent_Emily_Zoo},
		{name:"pooper scooper", id:"2dff76191f22a4c08fc316b24582e082.png", event:evt.Tent_Emily_Zoo},
		// * Coffee plant (for energy)
		{name:"coffee beans", 	id:"2f8bef00371321cf99708029c1d9a1e2.png", event:evt.Coffee},
		{name:"coffee filters", id:"8fa4d029914f3978b4a83e76d5c34278.png", event:evt.Coffee},
		{name:"coffee mug", 	id:"2f5999fcee8b4e624bfc06a075a405aa.png", event:evt.Coffee}, //same as get energy from coffee brewing
		{name:"fertilizer", 	id:"9b7575683b542f720d7bd2caa6e31352.png", event:evt.Coffee},
		{name:"rake", 			id:"8241d5d6ef06f3b068435a63b6c9d526.png", event:evt.Coffee},
		{name:"sunshine", 		id:"7fa0eebcf8094d0f955c80a0df0af985.png", event:evt.Coffee},
		// * Supply drop (for supplies)
		{name:"beacon", 	id:"100a93211b01f55eaf50cdcf599262da.png", event:evt.SupplyDrop},
		{name:"crate", 		id:"5d1e051bace9bf5972fa4d3ab87568aa.png", event:evt.SupplyDrop},
		{name:"parachute", 	id:"0a22a29fe28b158cf4658118a5a2fd77.png", event:evt.SupplyDrop},
		{name:"sand bag", event:evt.SupplyDrop},													//TODO: get img name
		{name:"stamp", 		id:"4716a1b94d2229be26a39c5db65587bd.png", event:evt.SupplyDrop},
		{name:"steel", 		id:"5e23a27926a4e12fec5b82f0f32383bb.png", event:evt.SupplyDrop},
		// * Ruins site upgrade - for XP
		{name:"yardstick", 	id:"4ce89935399452ad7035dcdbc7f71da1.png", event:evt.Site_Ruins},
		{name:"clips", 		id:"db9b17edc100abde12b02a61d7f51fa7.png", event:evt.Site_Ruins},
		{name:"transit", 	id:"f756ec5e8c1db5c06229251553aa7413.png", event:evt.Site_Ruins},
		{name:"broom", event:evt.Site_Ruins},														//TODO: get img name
		{name:"stake", 		id:"ae9302dae08c4fa7fb18b5c50aba1cf9.png", event:evt.Site_Ruins},
		{name:"string", 	id:"c2ce5a320d499d93bfe0a18d141a39f3.png", event:evt.Site_Ruins},
		// * Feathered Serpent site upgrade - for gadget parts (Zoey and Indy tent production)
		{name:"tool roll", 			id:"2dba8ee98feaee62e613feb36dfab8cb.png", event:evt.Site_FSerpent},
		{name:"index card", 		id:"e12bb450a70f984b8deae78bde91df44.png", event:evt.Site_FSerpent},
		{name:"tape measure", 		id:"8cd82d7572ab794fae8695164f8c548a.png", event:evt.Site_FSerpent},
		{name:"magnifying glass", 	id:"fc3872697240ba006dc10fbc5e0f647b.png", event:evt.Site_FSerpent},
		{name:"fine brush", 		id:"e5d8a475fab49e525be80aad0c91ff6f.png", event:evt.Site_FSerpent},
		{name:"sieve", 				id:"4322a96a947561745f5bc92fbbaf18f3.png", event:evt.Site_FSerpent},
		// * Ziggurat site upgrade - for building parts
		{name:"paper bag", 	id:"2dc2312dda2e617bfa6f4d76e042d1bb.png", event:evt.Site_Ziggurat},
		{name:"film", 		id:"2d0697aea08de6edb5e5df7d500373ad.png", event:evt.Site_Ziggurat},
		{name:"line pin", 	id:"e5e8bcec18223817cf8009a3e2696592.png", event:evt.Site_Ziggurat},
		{name:"dust pan", 	id:"fa59ec6a56e039dea03bde5975f136b3.png", event:evt.Site_Ziggurat},
		{name:"tiny brush", id:"b09907a9c20c92d02d50ed9c160a50c3.png", event:evt.Site_Ziggurat},
		{name:"trowel", 	id:"08f0d663ed3e25b884b795a58d0fe990.png", event:evt.Site_Ziggurat},
		// * Column site upgrade - for decoration items
		{name:"sample bottle", 	id:"04031c9fca4785f1fd1eeaea97b4d119.png", event:evt.Site_Column},
		{name:"calipers", 		id:"335423149712885b9548f6f1cc15c1fe.png", event:evt.Site_Column},
		{name:"plumb bob", 		id:"44f1a8b993abc89b1f1fa355f4b3f391.png", event:evt.Site_Column},
		{name:"coarse brush", 	id:"26c6e64579393f1a6f92e9f3b178511e.png", event:evt.Site_Column},
		{name:"file", event:evt.Site_Column},														//TODO: get img name
		{name:"polish", 		id:"0468a33b455008aafe805b6723f0a2cc.png", event:evt.Site_Column},
		// * Storage shed
		{name:"corrugated wall",id:"454d8f643e8dde717dd39eedda8dc3ef.png", event:evt.Shed},
		{name:"roof panel", 	id:"50938e3873285f074f8c293e19ae0968.png", event:evt.Shed},
		{name:"work light", 	id:"04eda1468b7f7d56b1280865569043fc.png", event:evt.Shed}, //TODO: check if its the same img as for the hydroplant's
		{name:"door hinge", 	id:"a2b0a9d41b2b2db524e82c475f94e1b6.png", event:evt.Shed},
		{name:"lock hinge", 	id:"e9fcc32c46bf5f113d2b3ccf6c974616.png", event:evt.Shed},
		{name:"electric cable", id:"cf762d4134d320a52bb6ec3b0573bc92.png", event:evt.Shed},
		// * Egyptian obelisk
		{name:"rasp", 			id:"2325bb4f5afa55a8127a135a1e403fa4.png", event:evt.Obelisk},
		{name:"stone chisel", 	id:"03fe5718af836d9898f53a56a0896509.png", event:evt.Obelisk},
		{name:"dust mask", 		id:"2f3d60450203ee40bd48f3a8a7396bd1.png", event:evt.Obelisk},
		// * Windmill
		{name:"weather vane",	id:"f311f7e930bb8ad1fb12363c64239d04.png", event:evt.Windmill},
		{name:"metal blade",	id:"c02fdbb635bb03e66a6ebc6c43364d2d.png", event:evt.Windmill},
		{name:"drive shaft",	id:"352194d50ec7da36b94bb8fc87db3703.png", event:evt.Windmill}, //same as hydro plant's
		{name:"wooden trestle",	id:"dca696c9e76ac95add0c26720ec64b98.png", event:evt.Windmill},
		{name:"spur gear",		id:"fe21abf3c6d37c640e31db3f4e5dd4e0.png", event:evt.Windmill},
		{name:"plant pump",		id:"4947202a0ae1661e75c72d50e1bac4fb.png", event:evt.Windmill},
		// * Biplane
		{name:"propeller",			id:"4fea4c9de7e6669a6e9fa4672f2186f9.png", event:evt.Biplane},
		{name:"aviator goggles", 	id:"1ddf5232e6984c5d3a0bb21c3056181a.png", event:evt.Biplane},
		{name:"parachute",			id:"52b4d49844635c68f3515cd244cc7992.png", event:evt.Biplane}, //same as adventure parachute in trip's tent
		{name:"plane wax", event:evt.Biplane},														//TODO: get img name
		{name:"bag of peanuts", event:evt.Biplane},													//TODO: get img name
		{name:"oxygen mask", 		id:"6e5bd66443c6b4fd35446410827548fa.png", event:evt.Biplane},
		// * Belloq's black market
		{name:"ancient coin", 		id:"874631620e6e8cd1d1a93ee7b9be7a8c.png", event:evt.BlackMarket},
		{name:"feathered fetish", 	id:"4552f26c1b21685165d71df24a6ecf88.png", event:evt.BlackMarket},
		{name:"powdered poison", 	id:"86bb094e9c2bff674491fa63fa6881de.png", event:evt.BlackMarket},
		{name:"shrunken head", 		id:"6021957a74115c5191477bbea37db06f.png", event:evt.BlackMarket},
		{name:"stolen urn", 		id:"d3ff543dc2d6f2a08224f20407ee1165.png", event:evt.BlackMarket},
		{name:"unknown bone", 		id:"d42b57308b07d811838b99e504e37ed5.png", event:evt.BlackMarket},
		// * Fountain of youth
		{name:"strange inscription", 	id:"b1366be2ae42b51f7bc73c2af4f3dbe8.png", event:evt.FOY},
		{name:"stone block", 			id:"d3dce5a5ee026b5b6febad635418cc7a.png", event:evt.FOY},
		{name:"drinking cup", 			id:"c833577af8c6ddda71111fa9d8ff8a1e.png", event:evt.FOY},
		{name:"gallons of spring water",id:"6183a56ea8571c6f396e85093582bbd6.png", event:evt.FOY},
		{name:"lily flower", 			id:"5dc70c4ef837bc48bd9ec1a58555f6c4.png", event:evt.FOY},
		{name:"youth potion", 			id:"440893016c633860b2ce155f48aaa09b.png", event:evt.FOY},
		// * Generator
		{name:"gold pump", 	id:"71d7ab57ce58101c573b9112e08654d6.png", event:evt.Generator},
		{name:"blue cable", event:evt.Generator}, 													//TODO: get img name
		// * Hydro plant
		{name:"drive shaft", 		id:"352194d50ec7da36b94bb8fc87db3703.png", event:evt.HydroPlant}, //same as windmill's
		{name:"rubber duckie", 		id:"d335eb8a77e0832d563fe378c6c2a32a.png", event:evt.HydroPlant},
		{name:"hydro flood pipe", 	id:"2135d02c50f952d000634877496fccfb.png", event:evt.HydroPlant},
		{name:"hydro cistern", event:evt.HydroPlant}, 													//TODO: get img name
		{name:"hydro flow trough", event:evt.HydroPlant}, 												//TODO: get img name
		{name:"work light", event:evt.HydroPlant}, 													//same as storage shed's? //TODO: get img name
		// * Field kitchen
		{name:"dinner bell", 		id:"213578466052e303ce07683fbfc0db3e.png", event:evt.FieldKitchen},
		{name:"kitchen lard", 		id:"395837e4d89bc2780ee730cb2a8e9b60.png", event:evt.FieldKitchen},
		{name:"crackproof crockery",id:"5a63c6bef0faa4e96b65b94c6fdf4172.png", event:evt.FieldKitchen},
		{name:"saute skillet", event:evt.FieldKitchen}, 												//TODO: get img name
		{name:"food barrel", event:evt.FieldKitchen}, 													//TODO: get img name
		{name:"army canvas", event:evt.FieldKitchen}, 													//TODO: get img name

	//#region production.materials
		// * in Zoey's tent
		{name:"horsefly", 		id:"0e8d339d60d8c5dac4fa6335814b3804.png", event:evt.Tent_Zoey, prod:1},
		{name:"siren box", 		id:"dd978c117e8365a6c614a364530e7f30.png", event:evt.Tent_Zoey, prod:1},
		{name:"stink gourd", 	id:"143785b17a23453d175e1558c7ac7148.png", event:evt.Tent_Zoey, prod:1},
		{name:"bottle of milk", id:"8a436bf0bb81372d1c99c14dfda6091b.png", event:evt.Tent_Zoey, prod:1},
		{name:"buttercups", 	id:"348f121c49b76d7bc3f9f45b542a47bd.png", event:evt.Tent_Zoey, prod:1},
		{name:"tuna can", 		id:"c405e2686ab9b8a267da6557e7153f5a.png", event:evt.Tent_Zoey, prod:1},
		{name:"stink weed", 	id:"7b584cbad0d54c640408b70361ee9180.png", event:evt.Tent_Zoey, prod:1},
		{name:"hand crank", 	id:"8c6162ffaa8a6a43180a13f22b0f0063.png", event:evt.Tent_Zoey, prod:1},
		{name:"mason jar", 		id:"3efc4302528f44695d0ffb618637f7c9.png", event:evt.Tent_Zoey, prod:1}, //same as tibetan jar in Trip's gadget tent
		{name:"salt lick", event:evt.Tent_Zoey, prod:1},												//TODO: get img name
		// * in Indy's tent
		{name:"snake pellet", 			id:"b5897137d32d199cbc2d08026a288768.png", event:evt.Tent_Indy, prod:1},
		{name:"metal teeth", 			id:"dcc5541434319e8afe63dd05a47f5e77.png", event:evt.Tent_Indy, prod:1},
		{name:"hair pomade", 			id:"f75a1ecbed359f9a5455c298e4b0decd.png", event:evt.Tent_Indy, prod:1},
		{name:"toy mouse", 				id:"e84b13cd865c808c61051552d9b4fb3e.png", event:evt.Tent_Indy, prod:1},
		{name:"pressure plate", 		id:"b73eab8a011bc828dd8a03259975efc1.png", event:evt.Tent_Indy, prod:1},
		{name:"spring loaded mouse", 	id:"224a84982530ca7bbca834ad40b18128.png", event:evt.Tent_Indy, prod:1},
		{name:"cotton swab", 			id:"715add58564ab33484816070f77d5c5e.png", event:evt.Tent_Indy, prod:1},
		{name:"bouncy spring", 			id:"36bf3dcc72734eeb949d719c9ef8c9de.png", event:evt.Tent_Indy, prod:1},
		// * Sallah's Bazaar and Egyptian obelisk - untranslated glyphs
		{name:"untranslated glyph", event:evt.Bazaar, prod:1, id:[
			"79cecaf217bb4cb0cbbb0e6a835c603c.png", //glyph asked
			"a947c2bdd0b9ae24697ce38dd9b63c80.png", //bazaar placed on camp, standard_feed
			"ef2b998d6b1fbb607ff0974770121a9a.png", //shovel upgrade to sturdy (lvl. 2)
			"80c96f335b6bbba90bf77f8ebf4fa941.png", //shovel upgrade to heavy (lvl. 3)
			"dc2379c264a50738d02345802c055f29.png", //shovel upgrade to powerful (lvl. 4)
			"9bd3db382400579e7968482474213959.png", //shovel upgrade to sharp (lvl. 5)
			"906a31f567dddba59da4e223c3d605d5.png", //shovel upgrade to ornate (lvl. 6)
			"6f05fb6caaf5cc195872ef34384caf51.png", //brush upgrade to delicate (lvl. 2)
			"91be3fd2ca0d90c565c361b79730bc57.png", //brush upgrade to remarkable (lvl. 3)
			"ab881605fdfcc497bc9cbc016fa89f20.png", //brush upgrade to superior (lvl. 4)
			"3e1c7f360a8e37a52f730b5305cc88e3.png", //brush upgrade to painting (lvl. 5)
			"82fd5c09c1c4737be101b663d64f3b9a.png", //brush upgrade to opulent (lvl. 6)
			"3bd1ddadc46a2e1edd3d5453058c30b9.png", //torch upgrade to glowing (lvl. 2)
			"6a0c105a38bcf6dc4a97cb9d80413e4a.png", //torch upgrade to burning (lvl. 3)
			"7dfd255427346273724230a54e7c6e78.png", //torch upgrade to blazing (lvl. 4)
			"478c0141875ed328f5e76bfc5f4ab8db.png", //torch upgrade to cupped (lvl. 5)
			"e6af06220ac0e7431c94d2e41c143f1e.png", //torch upgrade to oil-fueled (lvl. 6)
			"ea0175d63eb7a381c8bcbe96a15fe6cb.png", //axe upgrade to logging (lvl. 2)
			"1342928b041a1133ce0dcc3d2195fb7f.png", //axe upgrade to double-bit (lvl. 3)
			"0855f8de4816b90c14979e601c18e34e.png", //axe upgrade to battle (lvl. 4)
			"75133330845214d16b2d4a231b30ec8e.png", //axe upgrade to two-headed (lvl. 5)
			"0d5e4ec5c8378abb85d8ebedb7422a60.png", //axe upgrade to golden (lvl. 6)
			"388b0f9e33b6941a435460edf855c55c.png", //hammer upgrade to claw (lvl. 2)
			"17ed2e54ca42038a793b59f7e8f7c718.png", //hammer upgrade to sledge (lvl. 3)
			"de80fb5cbade3854924732678afc6f81.png", //hammer upgrade to master (lvl. 4)
			"c277919d13c3b2ab84501fd9d9671ccc.png", //hammer upgrade to medieval (lvl. 5)
			"52275c89c3af8236b86cb529dffcf100.png", //hammer upgrade to egyptian (lvl. 6)
			"29c9885d8c373b07e30fb85c56ab99c0.png", //obelisk place in camp and daily harvesting share
			"0f318146e7bc86c4ea34c98e5db19788.png", //obelisk upgrade to lvl. 2
			"abb4e3623cd80dfaf8eb5dfd6af6b362.png", //obelisk finished
			"a7ce6351d0e5edb7360eba52fb35a783.png", // enough bird glyphs
			"0bdb0741f39e36ae4bb205a693267dc0.png", // enough reed glyphs
			"3261a007ecbdc30ff863af1a9a40312b.png", // enough ankh glyphs
			"fa6d8bae5c74409e0ead35770dd49486.png", // enough eye glyphs
			"7b3a891e0524b45c4f343c5ec677cc06.png", // enough water glyphs
			"687da3d9a43073f6e59f8a5543dfc0d8.png", // enough hand glyphs
			//"", // enough cat glyphs																//TODO: get img name
			//"", // enough scarab glyphs															//TODO: get img name
		]},
		// * Sallah's Bazaar - for egyptian tools upgrade
		{name:"shovel blade", 	id:"aecd25819398d9c2cc5318d0d4792e40.png", event:evt.Bazaar, prod:1},
		{name:"shovel handle", 	event:evt.Bazaar, prod:1}, 											//TODO: get img name
		{name:"brush glue", 	id:"b6d1a2debaf924b57271f4a42754709f.png", event:evt.Bazaar, prod:1},
		{name:"brush bristle", 	event:evt.Bazaar, prod:1}, 											//TODO: get img name
		{name:"torch flint", 	id:"ee2a72d292273fe16123450634777c18.png", event:evt.Bazaar, prod:1},
		{name:"torch rag", 		event:evt.Bazaar, prod:1}, 												//TODO: get img name
		{name:"axe head", 		id:"44e1dbba3b4253b1b53e224b327d4d54.png", event:evt.Bazaar, prod:1},
		{name:"axe handle", 	event:evt.Bazaar, prod:1}, 												//TODO: get img name
		{name:"hammer handle", 	id:"c04f505480f9df0ae34c704861d469fc.png", event:evt.Bazaar, prod:1},
		{name:"hammer head", 	event:evt.Bazaar, prod:1}, 											//TODO: get img name
		// * in Belloq's black market
		{name:"eye of newt", 		id:"4c2178c48b8a1f2525620e8234834abc.png", event:evt.BlackMarket, prod:1},
		{name:"shiny lure", 		id:"7d378e1e41ae0356e0e484abb88f33a6.png", event:evt.BlackMarket, prod:1},
		{name:"bullseye lantern", 	id:"bf69fb710e860e3d3182b64caef58d79.png", event:evt.BlackMarket, prod:1},
		{name:"magnesium strip", 	id:"46c5ba35f49aa5ca06cd33c04ec98699.png", event:evt.BlackMarket, prod:1},
		{name:"mongoose fang", 		id:"c4fa8050e3d757d2d6145c68dfbfe791.png", event:evt.BlackMarket, prod:1},
		{name:"bird decoy", 		id:"8d818daca1dff98e3d02700648b65c86.png", event:evt.BlackMarket, prod:1},
		{name:"hypnotic pendant", 	id:"bd70640adbb054806a96bd25f5677494.png", event:evt.BlackMarket, prod:1},
		{name:"symbol of ra", 		id:"63e84ecb8a132cfbe99333e9dc749d26.png", event:evt.BlackMarket, prod:1},
		// * in Lucky dragon chest for offerings
		{name:"jade trinket", event:evt.LDChest, prod:1, id:[
			"e4dde6e571ea3e4b1d310a906fc0f2ea.png", //given away
			"69a47ffef84d9087b10effd6b8a6fd5a.png", //humble offering
			"777d0cadbaa8636be4869130f7a38779.png", //adequate offering
			"f90d49384225f2d4a0343bfbd8cf3747.png", //honorable offering
			"c01ecdcbd1d96bc4ced6a911fb8dea0b.png", //supreme offering
		]},
		{name:"lotus blossom", event:evt.LDChest, prod:1},										//TODO: get img name
		// * Tibetan tool yurt - Himalayan glyphs
		{name:"himalayan glyph", event:evt.ToolYurt, prod:1, id:[
			"8724fec8dbd75b1485a8badd5801326c.png", //glyph asked
			"fdde264dc4ba89893a401fb3c2e0ee9e.png", //tibetan tool yurt placed on camp
			"36a1dfa8daa0e7b99924faaea75d9a93.png", //metal detector upgrade to beachcombers' (lvl. 2)
			"c6c5ddee0df416d2c389716cdbf33fb4.png", //metal detector upgrade to fancy (lvl. 3)
			"d1771efde2d8d72a34dfc6c94c15e1e4.png", //metal detector upgrade to double-headed (lvl. 4)
			"3f7938bf90ed6a229467c7b357608d14.png", //metal detector upgrade to alloy (lvl. 5)
			"c8b091f7aa528e74dca72e6fe35beafc.png", //metal detector upgrade to dynamo (lvl. 6)
			"e5cad98c22593b0a11dda023e377d204.png", //climbing gear upgrade to adventurers' (lvl. 2)
			"e514758ce1febbaca2c531169aeb6d02.png", //climbing gear upgrade to tibetan (lvl. 3)
			"346c7101516df0dbb90ed95f8e75d8e8.png", //climbing gear upgrade to goat herders' (lvl. 4)
			"9488749dd55b1a4f7495c23a0eade677.png", //climbing gear upgrade to spider (lvl. 5)
			"b7c1b3c7cc736ed1f86303e701399209.png", //climbing gear upgrade to grandmaster (lvl. 6)
			"c9ae183e45598147b03b1fc6966b84f4.png", //wrench upgrade to double-headed (lvl. 2)
			"378d8f289c78dfaa12b46408966c1494.png", //wrench upgrade to adjustable (lvl. 3)
			"1446c1217fdc5cf5e80d2f8a50152d1e.png", //wrench upgrade to tough (lvl. 4)
			"655a95238a91c7be46787600f67b9202.png", //wrench upgrade to monkey (lvl. 5)
			"b02efd712eeaed3f3283675f7596ee75.png", //wrench upgrade to golden (lvl. 6)
			"5ddb6872aeda91048affcd206baea692.png", //canteen upgrade to travel (lvl. 2)
			"8e925e9c534febc7f7034df7be4ba8d7.png", //canteen upgrade to hiker's (lvl. 3)
			"c30ec4810e4cc017c70cf09fd988aaeb.png", //canteen upgrade to extreme hiker's (lvl. 4)
			"b2d48f7036c7627ad0bdd632bbbbe2af.png", //canteen upgrade to serious business (lvl. 5)
			"ded4b18c488ec57fd93bab67b9c2d4c7.png", //canteen upgrade to mysterious (lvl. 6)
		]},
		// * Tibetan tool yurt - for himalayan tools upgrade
		{name:"magnetic wiring", id:"b76be6abcfb4c25224581fdd0ca74585.png", event:evt.ToolYurt, prod:1},
		{name:"noisy beeper", event:evt.ToolYurt, prod:1}, 												//TODO: get img name
		{name:"climbing boots", id:"b57815a0f2a644a244211fe0a35671ce.png", event:evt.ToolYurt, prod:1},
		{name:"sturdy crampon", event:evt.ToolYurt, prod:1}, 											//TODO: get img name
		{name:"adjustable grip", id:"443afbfc4878600c9964fc2c693193d7.png", event:evt.ToolYurt, prod:1},
		{name:"metric wrench head", event:evt.ToolYurt, prod:1}, 										//TODO: get img name
		{name:"waterproof bladder", id:"819108e040049b889d210e50a6dd9ca8.png", event:evt.ToolYurt, prod:1},
		{name:"spit proof spigot", event:evt.ToolYurt, prod:1}, 										//TODO: get img name
		// * in Trip's gadget tent
		{name:"golden insects", 		id:"58d0b25363481588f5c47fdd506dec69.png", event:evt.Tent_Trip, prod:1},
		{name:"tibetan jar", 			id:"3efc4302528f44695d0ffb618637f7c9.png", event:evt.Tent_Trip, prod:1}, //same as mason jar in Zoey's tent
		{name:"raw meat", 				id:"ef93e6574393fdb57489d8c85f300897.png", event:evt.Tent_Trip, prod:1},
		{name:"cooking ingredients", 	id:"f42de7c57ff93563a7ca4f41e4607c0d.png", event:evt.Tent_Trip, prod:1},
		{name:"giant boulder", 			id:"158674d95241c214502463e3df981733.png", event:evt.Tent_Trip, prod:1},
		{name:"stone wheel", 			id:"24ad07ef0c1d4131861afa2cf4fea6dd.png", event:evt.Tent_Trip, prod:1}, //same as sharpening stone in Indy+Zoey tents
		{name:"adventure parachute", 	id:"52b4d49844635c68f3515cd244cc7992.png", event:evt.Tent_Trip, prod:1}, //adventure parachute that is; same as biplane's parachute
		{name:"adventure plane ticket", id:"fd758406bd3ddaaf4ec5236a1c157f8b.png", event:evt.Tent_Trip, prod:1},

	//#region collections
		//Indy coll. => +1 Free crew member ["journal","term papers","reading glasses","satchel","glyphed scroll"]
		{name:"Journal", 			col:1, event:col.Indy, id:"5068528790876b32d8d081d842dca312.png"}, 
		{name:"Term Papers", 		col:1, event:col.Indy, id:"f32185c64e6fda13cb62f200d1954516.png"},
		{name:"Reading Glasses", 	col:1, event:col.Indy, id:"89b65c1fd6d8bd3d4558c91d6ddaecfb.png"},
		{name:"Satchel", 			col:1, event:col.Indy, id:"13b7efbdc4651d6718da5d96b409d452.png"},
		{name:"Glyphed Scroll", 	col:1, event:col.Indy, id:"81c2ccc2906552776ab8cfe27b08efa5.png"},
		//Base camp col. => +1 Free crew member ["antidote","globe","guide","pen","umbrella"]
		{name:"Antidote",col:1, event:col.BaseCamp,id:"fb49316ef5db0cea92c8bd4505cbeb41.png"},
		{name:"Globe",col:1, event:col.BaseCamp,id:"c8345daf686a1bca2c3321dbbbcacbec.png"},
		{name:"Guide",col:1, event:col.BaseCamp,id:"27eb2497e43e19f432a1de316231499f.png"},
		{name:"Pen",col:1, event:col.BaseCamp,id:"bc4d23178414dabaf2a9c24b48227c7f.png"},
		{name:"Umbrella",col:1, event:col.BaseCamp,id:[
			"12569edfcf8c8b74a0f8e08c36c2212a.png",
			"8a3de641acc530073033370f4b568d23.png",
		]},
		//El Dorado (Gold) coll. => +1 Free crew member ["gold dust","gold necklace","gold trinket","gold headdress","gold bead"]
		{name:"Gold Dust",col:1, event:col.ElDorado,id:"02a6e4831b68951586bf2060bde9fe41.png"},
		{name:"Gold Necklace",col:1, event:col.ElDorado,id:"f137c90d7b206224674ac215480013b8.png"},
		{name:"Gold Trinket",col:1, event:col.ElDorado,id:"00bcd6371ffe2e376fc7a556d0335f49.png"},
		{name:"Gold Headdress",col:1, event:col.ElDorado,id:"546bd40cf454bf9f81799ace8dd46412.png"},
		{name:"Gold Bead",col:1, event:col.ElDorado,id:[
			"fb65a00f053eca4ec7c7579bd376d2d7.png",
			"70109da2a8273fdf406a1646f328f454.png",
		]},
		//Rescued animal coll. => Animal habitat (+$1500/day) ["sloth blanket","wool sweater","canary feather","salamander tooth","lucky frog"]
		{name:"sloth blanket",col:1, event:col.RescuedAnimal,id:"a115dcb331a0c2c47c044041e2a8964e.png"},
		{name:"wool sweater",col:1, event:col.RescuedAnimal,id:"a2ac710e2d622c3a62eb7ead90f0db46.png"},
		{name:"canary feather",col:1, event:col.RescuedAnimal,id:"f8b093cfecde9ce7ed12ba8fae3d4abc.png"},
		{name:"salamander tooth",col:1, event:col.RescuedAnimal,id:"6d660b466ae9169f24a16301894108a1.png"},
		{name:"lucky frog",col:1, event:col.RescuedAnimal,id:[
			"85c47aaab65b64658d33a905c1eabef0.png",
			"b7ebd876d1538e9b3fb7bedca8580272.png",
		]},
		//Miner coll. => Wood ["railroad spike","rock hammer","gold pan","jackhammer","hardhat"]
		{name:"railroad spike",col:1, event:col.Miner,id:"5fe9dc7265686428aa7c77a37fbb201d.png"},
		{name:"rock hammer",col:1, event:col.Miner,id:"7a15640960bfcb0e1518184a39a1c228.png"},
		{name:"gold pan",col:1, event:col.Miner,id:"2b987597dd4f4519a6716cc9e462b60e.png"},
		{name:"jackhammer",col:1, event:col.Miner,id:"b00ffbc7e9522d8e7ea0c6b236c037e2.png"},
		{name:"hardhat",col:1, event:col.Miner,id:[
			"df3472d7ffa80600a7091d691e56c699.png",
			"1f3bdd5be07e739ee6c07b012b4b44c4.png",
		]},
		//Conquistador coll. => Twine ["doubloon","arquebus","mastiff collar","pike head","helmet"]
		{name:"doubloon",col:1, event:col.Conq,id:"a184c7a10e754b1b8ed3d87ddbe90bef.png"},
		{name:"arquebus",col:1, event:col.Conq,id:"7667ea0001129cc208a95ea4ec1de89e.png"},
		{name:"mastiff collar",col:1, event:col.Conq,id:"4c31e6b7a27380606ec117b1b67a26fb.png"},
		{name:"pike head",col:1, event:col.Conq,id:"72904f1aeb9d422b30d04ed35465ddd2.png"},
		{name:"helmet",col:1, event:col.Conq,id:[
			"1e10332de5aefd859772949f4014efa2.png",
			"f7c383b4f112398ee86ab7f0db687235.png",
		]},
		//(Jaguar) Warrior coll. => Thatch ["atlatl","feather shield","jaguar helmet","hide cloak","obsidian club"]
		{name:"atlatl",col:1, event:col.Warrior,id:"c76ba715942347065a89b1218e1b4b1f.png"},
		{name:"feather shield",col:1, event:col.Warrior,id:"9a85fbf49a9956330ba0f2d6047a1ba1.png"},
		{name:"jaguar helmet",col:1, event:col.Warrior,id:"d253cd03a3dd6a6d879548d6457c4ec5.png"},
		{name:"hide cloak",col:1, event:col.Warrior,id:"f072bd657b931b10d37ec4eafdf5b404.png"},
		{name:"obsidian club",col:1, event:col.Warrior,id:[
			"45e22c19e39749edf2a09104c84c1a69.png",
			"d7a309438af3bed8775d970dc5cdcd7a.png",
		]},
		//Volcanic Jewelry coll. => Nails ["onyx ring","onyx lip plug","onyx earring","onyx necklace","onyx brooch"]
		{name:"onyx ring", 		col:1, event:col.Jewelry, id:"3b72191ad5e37611c7bacee8cebe0b28.png"},
		{name:"onyx lip plug", 	col:1, event:col.Jewelry, id:"b56ee90488a6d00608ba8ed25a15e4b3.png"},
		{name:"onyx earring", 	col:1, event:col.Jewelry, id:"ba4f68d8db4211375349df4b0c1f187f.png"},
		{name:"onyx necklace", 	col:1, event:col.Jewelry, id:"aabc669299d77661af3bae755c052235.png"},
		{name:"onyx brooch", 	col:1, event:col.Jewelry, id:[
			"d15b2cb26e27665e2afebc3a0b340d47.png",
			"b2730b75a0461f96f547d0ab6fc459c8.png",
		]},
		//Arrowhead coll. => Leafy reinforcement ["jade arrowhead","onyx arrowhead","rock arrowhead","gold arrowhead","ruby arrowhead"]
		{name:"jade arrowhead",col:1, event:col.Arrowhead,id:"4d2de111af827cab7199d9c87272c9dc.png"},
		{name:"onyx arrowhead",col:1, event:col.Arrowhead,id:"dd90c15e68339af914dd235a8f5eac83.png"},
		{name:"rock arrowhead",col:1, event:col.Arrowhead,id:"d54d1a70b603c747c525ae9d71543d39.png"},
		{name:"gold arrowhead",col:1, event:col.Arrowhead,id:"db60daa4bdd8cf4d8b12304eef0ded3a.png"},
		{name:"ruby arrowhead",col:1, event:col.Arrowhead,id:[
			"27ec0cf6e698b28311d30c14dd9dbe16.png",
			"8dbd7afbd48cefac6acf974075dc48eb.png",
		]},
		//Mountaineer coll. => Ram horn grip ["carabiners","harness","hand chalk","ice axe","sturdy rope"]
		{name:"carabiners",col:1, event:col.Mountaineer,id:"559990c3473d1934c47b7947476de7fe.png"},
		{name:"harness",col:1, event:col.Mountaineer,id:"92e9cb8bfbd9a686288fff1ab85d6aa1.png"},
		{name:"hand chalk",col:1, event:col.Mountaineer,id:"15dfd7458d46ae714329ad7d073ca1d5.png"},
		{name:"ice axe",col:1, event:col.Mountaineer,id:"0af9981b926668d5baeb7cf60f6fe5ca.png"},
		{name:"sturdy rope",col:1, event:col.Mountaineer,id:"4ac9116da03dc59c2c096f80cdbf92d2.png"},
		//Volcano Weapons coll. => Obsidian grip ["obsidian spear","obsidian club","obsidian knife","obsidian axe","obsidian bolas"]
		{name:"obsidian spear",col:1, event:col.Weapon,id:"022c4204bbad8ca61d81e0304714504e.png"},
		{name:"obsidian club",col:1, event:col.Weapon,id:"51270c2b87a3961cc595d800a1da6464.png"},
		{name:"obsidian knife",col:1, event:col.Weapon,id:"74fbb82c80e86510fc0654e9e851eb55.png"},
		{name:"obsidian axe",col:1, event:col.Weapon,id:"1d1271a23359c30d2511a8133becd474.png"},
		{name:"obsidian bolas",col:1, event:col.Weapon,id:"433b642b35ff4421f1b82b1b9af4777e.png"},		//TODO: check item name again - bolas vs bolo
		//Luxury goods coll. => Gold plating ["jade trinket","feathers","abalone shell","gold necklace","cotton cloth"]
		{name:"jade trinket",col:1, event:col.LuxuryGoods,id:"6320ac6326b0f44e12a27783e6378d4a.png"},
		{name:"feathers",col:1, event:col.LuxuryGoods,id:"a004872a6de87f28cc71f3f84de9ce45.png"},
		{name:"abalone shell",col:1, event:col.LuxuryGoods,id:"c9da82fbc42c953d31b5503f3b838019.png"},
		{name:"gold necklace",col:1, event:col.LuxuryGoods,id:"a55e198bfe9f8e77c6352bce18f4d79d.png"},
		{name:"cotton cloth",col:1, event:col.LuxuryGoods,id:"3879c9a58ef1f193946f30c393492637.png"},
		//Gemstone coll. => Diamond coating ["gleaming jet","fire opal","raw jade","amethyst geode","quartz spike"]
		{name:"gleaming jet",col:1, event:col.Gemstone,id:"d966399eb1e2134360ccad6b367910ad.png"},
		{name:"fire opal",col:1, event:col.Gemstone,id:"b8b603ed9bada9a392d646c87f6752d1.png"},
		{name:"raw jade",col:1, event:col.Gemstone,id:"8f5b3c57f579771be28ce8a49b43f1ca.png"},
		{name:"amethyst geode",col:1, event:col.Gemstone,id:"344d96c5316ab6071827962c723aaad6.png"},
		{name:"quartz spike",col:1, event:col.Gemstone,id:"5e916af2e68ff41e9e52fff185815aeb.png"},
		
	//#region quest.prerequisites
		{name:"energy", quest:1, id:[
			"9653f8da6b4415c71c2c7cf61102c519.png", //Mountain climbing really drains Energy!
			"2ccc08c4bdd7095a93db2f404be46631.png", // get one too												//TODO: investigate img name
			"8ee4296ef865f8a20fbe3624e449e4fa.png", // get {energy} from sending rusty key?						//TODO: investigate img name
			"2f5999fcee8b4e624bfc06a075a405aa.png", //just get one (from coffee plant/coffee brewing); same as coffee mug from coffee plant
		],event:"Prerequisites"},
		{name:"supplies", quest:1, id:"6132cc99829d151ed3187a5758c1596f.png",event:"Prerequisites"},
		{name:"food", quest:1, id:[
			"b6615d2ff94c0848291ee8ffb777ef99.png", //might be discontinued
			"4e879867138620ad10f90ea25b5fe124.png", //might be discontinued
			"4526db604890a0c3a889218844cb51ba.png", //asked for energy prod
		],event:"Prerequisites"},
		{name:"fuel", quest:1, id:[
			"2e0683e3a5fc2dc744163fa0d069e2a4.png", //might be discontinued
			"8b6c3df31f83b262e473862e795ca5b1.png", //sharing
			"41a9a8959696ed25288a40abf1843938.png", //asked for energy prod
		],event:"Prerequisites"},
		{name:"water", quest:1, id:[
			"6fa4e03753e92ab991a5c15b2d32907e.png", //w2w
			"6bc7a60f232e8c202603c3610d9a4236.png", //might be discontinued
			"847c70340d4ba661ba6a5e4b040b6446.png", //asked for energy prod
		],event:"Prerequisites"},
		// * Keys																					//TODO: inevstigate, not sure about id... see tests!
		{name:"rusty key",  quest:1, 	id:"acd9f4207cb51713cd4fd119ca454d95.png", event:"Keys"},
		{name:"farmer key", quest:1, 	id:"8d2169a536af4a765f204bd373b60359.png", event:"Keys"},
		{name:"scribe key", quest:1, 	id:"ae9e813f3824e7395d33cd39d664f37f.png", event:"Keys"},
		{name:"priest key", quest:1, 	id:"0ba0ef916d365b7cc85856d25890797e.png", event:"Keys"},
		{name:"pharaoh key",quest:1, 	event:"Keys"},													//TODO: get img name
		{name:"jade key", 	quest:1, 	id:"b0e09f1995d6dece8f04b2c3f5992481.png", event:"Keys"},
		// * Pets	
		{name:"bubblebath", quest:1, event:"Pets",id:[
			"98e4ee4bf9de02fa4fe809aa3df841eb.png",
			"469c58cb75a0853059dd958b62984439.png",
			]}, //4 Smokey the Canary
		{name:"clover", quest:1, event:"Pets",id:[
			"3850f8cc2210fd705cc184bd400116dd.png",
			"058ae19adc11f1bad2b682388d12c5b9.png",
			]}, //1 Fluffy the Ewe
		{name:"sloth milk", quest:1, event:"Pets",id:[
			"7e1942a75c60a0b540656693a754edc7.png",
			"7555031c27d0ca2ec00c5a5d75b31ecf.png",
			]}, //2 Sleepy the Sloth
		{name:"bugs", quest:1, event:"Pets",id:[
			"807f923a8dc89b05a9287270d0704c75.png",
			"ebb35aa86ac337bd44f8e8caee3cbfa1.png",
			]}, //5 Flippy the Frog
		{name:"salve", quest:1, event:"Pets",id:[
			"f52444a840f9bd3946373f390157a176.png",
			"c560cffb3e64248d4d68e245b01bdd2a.png",
			]}, //3 Steamy the Salamander
		
	//#region quest.materials
		{name:"chalk", event:evt.Q01_ElDorado, quest:2, id:"1c308a5610e3d0785426ae715a4143bc.png"},
		
		{name:"light bulbs", event:evt.Q03_Cavern, quest:2, id:"e064679b255d5b4f4e35fa462caf71af.png"},

		{name:"carabiner", event:evt.Q04_Mountain, quest:2, id:"ebfe95df5e513008ef8ec1a04a6eb166.png"}, //monkey carabiner

		{name:"flares", 		event:evt.Q06_SupplyCrash, quest:2, id:"cd7c3cc03e5752891fcaa13a4bc71b9e.png"},
		{name:"carrot seeds", 	event:evt.Q06_SupplyCrash, quest:2, id:"daa11d79cb2bef2daaa96e82517e30bc.png"},

		{name:"decoder rings", 	event:evt.Q07_HunterMask, quest:2, id:"4b912104b41c1524206afe39c98e11c4.png"},
		{name:"black ink", 		event:evt.Q07_HunterMask, quest:2, id:"a6901fa0335ee8aa3fb36c0d08cb6e4f.png"},

		{name:"keys", event:evt.Q09_Poachers, quest:2, id:"eb7c0c8b0b1b44fe68e46e2e6481cbd8.png"}, // snake cage "keys"!

		{name:"smelly socks", 	event:evt.Q10_DarkRitual, quest:2, id:"9e9d6d8fd33e1581da544f878ecda044.png"},
		{name:"planks", 		event:evt.Q10_DarkRitual, quest:2, id:"4f8d108c2dbb300ea9a0fba38670550f.png"},
		{name:"snake skin", 	event:evt.Q10_DarkRitual, quest:2, id:"658c3571b5eb9fd05ee789cebc98ed92.png"}, //shed snake skin

		{name:"rock hammers", 	event:evt.Q12_SkyWarriors, quest:2, id:"7a15640960bfcb0e1518184a39a1c228.png"}, 
		{name:"stiff brush", 	event:evt.Q12_SkyWarriors, quest:2, id:"6f9966c75c733975e0d85b98067070cd.png"}, 

		{name:"rubber stoppers", 	event:evt.Q13_SunCalendar, quest:2, id:"7b15a1a3fa5f03ab91fe08894970ba7d.png"}, 
		{name:"stone cogs", 		event:evt.Q13_SunCalendar, quest:2, id:"65c3e37380a85687eb858d4521fc8891.png"}, 
		{name:"journal page", 		event:evt.Q13_SunCalendar, quest:2, id:"753e46d5e3b6b19e996c1f3dbed91dc3.png"}, 
		{name:"chain", 				event:evt.Q13_SunCalendar, quest:2, id:"b71f5b8fb9a7f0a0874465f56ac7efad.png"}, 
		{name:"concrete", 			event:evt.Q13_SunCalendar, quest:2, id:"ceb07c27e347234365be593715bf1e1c.png"},
		
		{name:"carriage cement", 			event:evt.Q14_WestPole, quest:2, id:"a156664c96bfd4e8545cdbdbcb89eca9.png"}, 
		{name:"rolls of tape", 				event:evt.Q14_WestPole, quest:2, id:"7e791029a64c26cd373edfbddd5bbf92.png"}, 
		{name:"ice b gone", 				event:evt.Q14_WestPole, quest:2, id:"1a3d5a4caeaf67eea36c405052c576bf.png"}, 
		{name:"cold resistant sample bag", 	event:evt.Q14_WestPole, quest:2, id:"d39f2be5987bb1b28be210b2c57ea737.png"}, 
		{name:"christmas list", 			event:evt.Q14_WestPole, quest:2, id:"7273bf706a1950aa251cb21b42e5e163.png"}, 

		{name:"tough vine", event:evt.Q15_Zoology, quest:2, id:"1b666247fb60f3396317c13d1c250a95.png"}, 

		{name:"wood pole", 					event:evt.Q16_GoldRiver, quest:2, id:"372e140277588421eceb97f929e8f2a6.png"}, 
		{name:"sample bag", 				event:evt.Q16_GoldRiver, quest:2, id:"323267f4cc3bfa1bc9f9213c2045211b.png"}, 
		{name:"hieroglyph translation book",event:evt.Q16_GoldRiver, quest:2, id:"b9c721e1093ecde361e447e3c3990655.png"}, 

		{name:"venom vial", 			event:evt.Q17_SphinxRiddle, quest:2, id:"568ae76cd85ac096d3349fb0b9227422.png"}, 
		{name:"leak proof canteen", 	event:evt.Q17_SphinxRiddle, quest:2, id:"338b53125dfc0ff2ca40e3c36e1b5407.png"}, 
		{name:"repair kit", 			event:evt.Q17_SphinxRiddle, quest:2, id:"186e2e95ff0dfcf3c5c6825774c845db.png"}, 
		{name:"library gloves", 		event:evt.Q17_SphinxRiddle, quest:2, id:"df0ae4c3113f1091291656c7d99580b7.png"}, 
		{name:"forensics kit", 			event:evt.Q17_SphinxRiddle, quest:2, id:"8ef5a4954bd63a74795854d0edc22663.png"}, //same as the other 2 forensics kits
		{name:"ankh", 					event:evt.Q17_SphinxRiddle, quest:2, id:"19fd8875307f6215b3fa9880e8d15787.png"}, //same as Cleopatra's seal
		{name:"divining rod", 			event:evt.Q17_SphinxRiddle, quest:2, id:"c8e74e3c20ccf8d8924ee83de3fe7ecb.png"},
		{name:"brand nitroclycerine", 	event:evt.Q17_SphinxRiddle, quest:2, id:"2029c6772fe05c0e4cacf0f84ee4431f.png"}, //spelling?
		{name:"golden lever", 			event:evt.Q17_SphinxRiddle, quest:2, id:"325fc30b411f33e41b985a65d666d179.png"}, 
		
		{name:"love letter", 	event:evt.Q18_LovePath, quest:2, id:[
			"1238d3c59ab5c49c7249a13c13987d5d.png", //common for all 3 missions
			"c56d4062836ae0983b01d6a64d35ae34.png", //emily's secret love quest finished
		]},
		{name:"garnet heart", 	event:evt.Q18_LovePath, quest:2, id:"e21082b00b4002031522a8a151f67506.png"}, 
		{name:"seal", 			event:evt.Q18_LovePath, quest:2, id:[
			"19fd8875307f6215b3fa9880e8d15787.png", //same as ankh in ValleyOfTheKings
			"07351bcb5b1c267dee4422d31b0620f7.png", // on sub-quest finished
		]}, //same as ankh	/ quest finished
		{name:"mothball", 		event:evt.Q18_LovePath, quest:2, id:"3c299ac4b0887d10b3629f5013ac7c13.png"}, //from quest finished ;)
		{name:"lock loosener", 	event:evt.Q18_LovePath, quest:2, id:"5b23842828e007247e8270ed26b00117.png"}, 
		
		{name:"ancient offering", 	event:evt.Q19_LostPyramids, quest:2, id:"65b9f442087a5889f85a4e923f7d1754.png"},
		{name:"pit fill", 			event:evt.Q19_LostPyramids, quest:2, id:"b3089438d665c25032910151a7b15906.png"},
		{name:"curse proof matches",event:evt.Q19_LostPyramids, quest:2, id:"62808a0d6a121bd1bdf700693ab361b7.png"}, // same as arena friendly matches
		
		{name:"grape bubblegum",event:evt.Q20_GotU, quest:2, id:"1b855d9d6ff0b8ccc77063bc44a0de86.png"},
		{name:"radio antenna", 	event:evt.Q20_GotU, quest:2, id:"d36c1c3aaca878e64fef7a929a6bc021.png"},
		{name:"good deed", 		event:evt.Q20_GotU, quest:2, id:"cf8e63b8efa61fe7eba5ba809d7f11e8.png"},
		
		{name:"greek translation book", 	event:evt.Q21_TriangleIslands, quest:2, id:"c79bb740929091736583d4c4673a317d.png"},
		{name:"sand sifter", 				event:evt.Q21_TriangleIslands, quest:2, id:"05186478ceecf3e97c9a326f9fa8869a.png"},
		{name:"fluorescent marker ribbon", 	event:evt.Q21_TriangleIslands, quest:2, id:"dad7c0c622cef47ab59432507716ab59.png"},
		{name:"elbow grease", 				event:evt.Q21_TriangleIslands, quest:2, id:"ce2a0141e26b161f89c083714dc3fde5.png"},
		
		{name:"charm bracelet", 		event:evt.Q22_Fae, quest:2, id:"524a68a49d783ff4d009b9daa3f16329.png"},
		{name:"bouillon cube", 			event:evt.Q22_Fae, quest:2, id:"e6a3ec0264b1ea6b29b1c097a98a17b6.png"},
		{name:"ancient celtic ring", 	event:evt.Q22_Fae, quest:2, id:"ce2b68546ca430994af290808fce943d.png"}, 
				
		{name:"crocodile ankh", 			event:evt.Q23_Sobek, quest:2, id:"95fc61e01e25c8a169b0bf00b3745f2b.png"}, 
		{name:"egyptian translation book",  event:evt.Q23_Sobek, quest:2, id:"4cb06fe4c85a608f88c8a0b4714991f5.png"}, //for crafting ancient password
		{name:"camel treat", 				event:evt.Q23_Sobek, quest:2, id:"d89115963e19480b032c20813cf442c5.png"}, 
		{name:"surveying flag", 			event:evt.Q23_Sobek, quest:2, id:"6528d32d57960dd7ea6117dd0f744f9a.png"},
		
		{name:"ventriloquism book", event:evt.Q24_Totem, quest:2, id:"e69235978468ea055b37d78ab6c9a3fa.png"}, //correct
		{name:"scorpion idol", 		event:evt.Q24_Totem, quest:2, id:"1a3fbb1072b6b26216bd3a8dfa755595.png"},
		{name:"disrepair book", 	event:evt.Q24_Totem, quest:2, id:"e69235978468ea055b37d78ab6c9a3fa.png"}, // TODO: get correct img name!
		
		{name:"crack sealant", event:evt.Q25_SinkIsland, quest:2, id:"dbe6ead14cd810a06a6c7d670f2d2d63.png"}, //common for all 3 missions

		{name:"heroic music", event:evt.Q26_Heroic, quest:2, id:"869e133ea4444f2fb50a51b245fa5d4b.png"}, //common for all 4 missions

		{name:"translation rune", event:evt.Q27_BeastScrolls, quest:2, id:"cd30284c2d8cab84a8c4385a32ab8e1b.png"}, //common for all 3 missions
		
		{name:"alpine forensics kit", 	event:evt.Q28_Yeti, quest:2, id:"8ef5a4954bd63a74795854d0edc22663.png"}, //same as the other 2 forensics kits
		{name:"investigation kit", 		event:evt.Q28_Yeti, quest:2, id:"2d7106eb20ea1249034c3a25aed30ef8.png"},
		
		{name:"fake order", event:evt.Q29_StolenMedallion, quest:2, id:"4ef52ec4f2dd59aa2134c54c17fa17f1.png"},
		
		{name:"black light", event:evt.Q30_ArgentOrigins, quest:2, id:"873399d9a4be6e1cefcca9977e2441bd.png"},
		
		{name:"temple key", event:evt.Q31_BeastOOT, quest:2, id:"5b79fc270730448966ba7045254c9919.png"},
		{name:"llama feed", event:evt.Q31_BeastOOT, quest:2, id:"1990a319171c3356e69e890608a13b63.png"},
		
		{name:"transport crate", 	event:evt.Q32_PowerVault, quest:2, id:"fb1574c55ffd494f84fb47ac2a8cad87.png"},
		{name:"calming concoction", event:evt.Q32_PowerVault, quest:2, id:"00525c2c568c92ff5518f4ef333d7386.png"},
		
		{name:"curse proof glove", event:evt.Q33_CursedEagle, quest:2, id:"5d4e7cb6e456f7fa714588a6940d0741.png"},
		
		{name:"german translation book", event:evt.Q34_Voynich, quest:2, id:"89b9676b810d77630531a0e2ba4791ec.png"},
		
		{name:"snakerade", event:evt.Q35_TopMen, quest:2, id:"3426be3e032a2a6ebf3e1ca0abff673e.png"},
		
		{name:"fateful forensics kit", event:evt.Q36_Army, quest:2, id:"8ef5a4954bd63a74795854d0edc22663.png"}, //same as the other 2 forensics kits
		
		{name:"egg carton", event:evt.Q37_TwinSerpents, quest:2, id:"62eae4cde0d75bfa1b16027fe0ce8f58.png"},
		
		{name:"arena friendly matches", event:evt.Q38_LostArena, quest:2, id:"62808a0d6a121bd1bdf700693ab361b7.png"}, //same as curse proof matches
		
		{name:"ancient chinese secrets", event:evt.Q39_TIK, quest:2, id:"3b9c8b4ca1f87dbfd7563939bd18527c.png"},
		
		{name:"gingerbread man", 		event:evt.Q40_AdventureDays, quest:2, id:"2e243c26818ffa75c9be60c6c4996aca.png"}, //1st day
		{name:"bag of frosting", 		event:evt.Q40_AdventureDays, quest:2, id:"e24bb71be6b93f39af4176940cb0a453.png"}, //2nd day
		{name:"jar of molasses", 		event:evt.Q40_AdventureDays, quest:2, id:"9c218c7f8bda7c31a9a0c23d2d3411b2.png"}, //4th day
		{name:"bag of gum drops", 		event:evt.Q40_AdventureDays, quest:2, id:"90535e50c9da11365ab881bafeaaadfb.png"}, // ?? day
		{name:"bag of powdered sugar", 	event:evt.Q40_AdventureDays, quest:2, id:"d6b5e68fc9e7dbd62ae20465cbf776ba.png"}, //7th day
		{name:"bag of jelly beans", 	event:evt.Q40_AdventureDays, quest:2, id:"e672f8077f21a943d556925d3e4ec2fa.png"}, //10th day
		{name:"bag of chocolate drops", event:evt.Q40_AdventureDays, quest:2, id:"03b1395054fa4a1d7685b7e1e42c5c99.png"}, //12th day
		
		{name:"party supplies", event:evt.Q41_BdayBd, quest:2, id:"5f4daec0b91caeea2db2114f1ce2ef93.png"},
		
		{name:"ella journals", event:evt.Q42_VotG, quest:2, id:"03139d4037974d9e001c8ba33112d0b8.png"},
				
	//#region unsorted / no category
		//{name:"egyptian translation book", quest:3, id:"4cb06fe4c85a608f88c8a0b4714991f5.png"},
		
	];

	//#region new items array
	var newItems=[ //"","send",
		// *** 2.13
		"sendellajournals",
		
	];

	//#region dock function

	function dock(){

		//mass produce accept text for materials array items not containing col parameter
		var accTextMaterialsSend=accTextFromData(matchByParam(materials,"col",null),"send","",MENU_ID_ENFORCE_NAME);
		var accTextMaterialsGet=accTextFromData(matchByParam(materials,"col",null),"","",MENU_ID_ENFORCE_NAME);

		//mass produce accept text for materials array items matching a col parameter
		var accTextCollections=accTextFromData(matchByParam(materials,"col",true),"col_"," Collectible",MENU_ID_ENFORCE_NAME);

		//produce custom and override accept texts
		var accTextCustoms={
			doUnknown:"Unknown", send:"Unknown",
			collectible:"Unknown Collectible",
			xp:"XP", //overrides "Xp"
			coins:"Coins",
			joincrew:"to Join Crew",
		};

		var accTextAll=mergeJSON(accTextMaterialsSend,accTextMaterialsGet,accTextCollections,accTextCustoms);

		//collectible catchall
		var collectibleURLs = ["feed_collection_complete","feed_collection_item_found"];

		var words 	= ["coins","xp"];
		var joincrewURL = ["feed_ask_for_crew"];
		//var coinsURLS 	= ["feed_ask_for_resource","standard_feed","feed_expedition_complete"].concat(joincrewURL);
		var coinsURLS 	= ["feed_expedition_complete","w2w_crew_thank"].concat(joincrewURL); //temporary hack to see which other "Get coins" posts are to be identified
		var xpURLS 	= ["feed_quest_complete"];
		//these words generally denote a send type bonus
		//modify this list to fit your needs
		//var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

	//#region Tests
		
		var tests = [
		// *** link excludes
			{ret:"exclude", link:[
				"Play Adventure World - An Indiana Jones Game",
				"Play Adventure World",
				"Play Indiana Jones Adventure World",
			]},

		// *** COLLECTIONS
			{url:collectibleURLs,ret:"none",kids:(function(){
				//create automated searches based upon material array above
				var ret=[];
				var selection=matchByParam(materials,"col",true);
				for(var m=0,mat;(mat=selection[m]);m++){
					ret.push({img:mat.id,ret:"col_"+mat.name.noSpaces().toLowerCase()});
				}
				for(var m=0,mat;(mat=selection[m]);m++){
					ret.push({search:["link","body"],find:mat.name,ret:"col_"+mat.name.noSpaces().toLowerCase()});
				}
				return ret;
			})()},
			//unknown collectibles (works with int'l posts)
			{url:collectibleURLs,ret:"collectible"},
			
		// *** KEYS, because they give different outcome dep. on url:
			//send Rusty key, get either energy or an extra key
			{img:"acd9f4207cb51713cd4fd119ca454d95.png",ret:"none",kids:[
				{url:"standard_feed", ret:"sendrustykey"},
				{url:"feed_ask_for_resource", ret:"sendenergy"},					
			]},
			//send Farmer key, get either energy or an extra key
			{img:"8d2169a536af4a765f204bd373b60359.png",ret:"none",kids:[
				{url:"standard_feed", ret:"sendfarmerkey"},
				{url:"feed_ask_for_resource", ret:"sendenergy"},
			]},
			//send Scribe key, get either energy or an extra key
			{img:"ae9e813f3824e7395d33cd39d664f37f.png",ret:"none",kids:[
				{url:"standard_feed", ret:"sendscribekey"},
				{url:"feed_ask_for_resource", ret:"sendenergy"},
			]},
			//send Priest key, get either energy or an extra key
			{img:"0ba0ef916d365b7cc85856d25890797e.png",ret:"none",kids:[
				{url:"standard_feed", ret:"sendpriestkey"},
				{url:"feed_ask_for_resource", ret:"sendenergy"},
			]},
			//send Pharaoh key, get either energy or an extra key
			//{img:"",ret:"none",kids:[
			//	{url:"standard_feed", ret:"sendpharaohkey"},
			//	{url:"feed_ask_for_resource", ret:"sendenergy"},
			//]},
			//send Jade key, get either energy or an extra key
			{img:"b0e09f1995d6dece8f04b2c3f5992481.png",ret:"none",kids:[
				{url:"standard_feed", ret:"sendjadekey"},
				{url:"feed_ask_for_resource", ret:"sendenergy"},
			]},
			
		// *** MATERIALS & QUEST ITEMS
			//parts from various building upgrades, as "Special Delivery"
			{img:["5ab8a8cffc229913ed5dc2a3c9a86a2a.png",
				  "79a41ca6318b34bd84ac846dd6b54296.png",
				  "cd8d85b03c27d813261915ae89d111b4.png"], ret:"none", kids:[
				{link:"Windmill Part", ret:"sendspecialdelivery"}, // from windmill upgrade to lvl 2&3&high capacity, standard_feed, Get Windmill Part
			]},
			{img:"bbb0a1b3d5aa258b79937f554647da9f.png", ret:"sendspecialdelivery"}, //only get parts, offered when tool shop is upgraded to level 2 
			{img:"8b420e0ce63153c5b6730bea51014400.png", ret:"sendspecialdelivery"}, //only get parts, offered when tool shop is upgraded to level 3
			{img:"eb7db0d79c8130793929e05c937163e5.png", ret:"sendspecialdelivery"}, //only get parts, offered when tool shop is upgraded to level 4
						
			// Send materials links by image, then by text
			{html:" ", ret:"none", kids:(function(){ //<-- force a group with a fake test
				//create automated searches based upon material array above
				var ret=[];
				var selection=matchByParam(materials,"col",null);
				for(var m=0,mat;(mat=selection[m]);m++){
					ret.push({img:mat.id,ret:"send"+mat.name.noSpaces().toLowerCase()});
				}
				
				//because some posts are incorrectly identified by body text (energy, coins, xp) instead of what they are, move the recognition by body/link text later on
				//check link text for most common occurences before ;)
				ret.push({link:"Be a pal",ret:"coins"});
				ret.push({url:joincrewURL,ret:"joincrew"});
				ret.push({url:coinsURLS,ret:"coins"});
				ret.push({url:xpURLS,ret:"xp"});
				
				ret.push({link:"{%1}",subTests:words.optimize(),ret:"{%1}"});
				
				//and only after that - look for word in link and body
				if (!localDebug)
				{
					for(var m=0,mat;(mat=selection[m]);m++){
						ret.push({search:["link"],find:mat.name,ret:"send"+mat.name.noSpaces().toLowerCase()});
					}
					for(var m=0,mat;(mat=selection[m]);m++){
						ret.push({search:["body"],find:mat.name,ret:"send"+mat.name.noSpaces().toLowerCase()});
					}
				}
				
				return ret;
			})()},


		//specific texts first
			// {link:"Be a pal",ret:"coins"},

		//less specific send materials check using body texts
			//removed "lend a hand" - only for energy, now identified by image only
			/*{body:["will starve without","you'll get some too","send a", "send some","needs","Help them by giving"],ret:"send",kids:[
				{link:"{%1}",subTests:materials,ret:"send{%1}"},
				{body:"{%1}",subTests:materials,ret:"send{%1}"},
			]},*/

		//generic send materials check using link text
			/*{link:"send",ret:"send",kids:[
				{link:"{%1}",subTests:materials,ret:"send{%1}"},
				{body:"{%1}",subTests:materials,ret:"send{%1}"},
			]},*/


		//get resources and materials by word
			// {link:"{%1}",subTests:[].concat(words,materials).optimize(),ret:"{%1}"},
			//{link:"{%1}",subTests:words.optimize(),ret:"{%1}"},
			//{link:"{%1}",subTests:materials.optimize(),ret:"send{%1}"},

		//get materials by word in body
			/*{body:"{%1}",subTests:[].concat(materials),ret:"{%1}"},*/

		//special tests to detect post by url
			// {url:joincrewURL,ret:"joincrew"},
			// {url:coinsURLS,ret:"coins"},
			// {url:xpURLS,ret:"xp"},

		];
		
        //#region menu
		menu = {
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				
				sendall:{type:"checkbox",label:"Send All (or check items below)"},
				send:{type:"checkbox",label:"Send Others"},
				doUnknown:{type:'checkbox',label:'Process Unknown Posts'},
					
				basicssep:{type:'separator',label:'Basecamp',kids:{
					coinsxpblock:{type:'optionblock',label:"Coins and XP:",kids:{
						coins:{type:'checkbox',label:'Coins (also joins crews)'},
						joincrew:{type:'checkbox',label:'Only Join Crews'},
						xp:{type:'checkbox',label:'XP'},
					}},
				}},

				// matsep:{type:'separator',label:"Building materials",kids:{
				// }},
				
				prodsep:{type:'separator',label:"Production materials",kids:{
				}},

				colsep:{type:'separator',label:"Collectibles",kids:{
				}},

				questsep:{type:"separator",label:"Quests:",kids:{
				}},
			}}
		};		

		//get some groups real quick
		var cols=matchByParam(materials,"col",1);
		var prods=matchByParam(materials,"prod",1);
		var prereqs=matchByParam(materials,"quest",1);
		var quests=matchByParam(materials,"quest",2);
		var unsorted=matchByParam(materials,"quest",3);
		//var petmats=matchByParam(quests,"event",evt.Q15_Zoology); //get a subset that can be used for get-only pet materials (or more the get-only images into the send materials id list)

		//nonquest nonproduction noncollectible nonbase items are found this way
		var mats=matchByParam( matchByParam( matchByParam(materials,"col",null), "prod",null), "quest",null);

		//append dynamically created menus to the menu structure		
		// menuFromData(petmats,menu.section_main.kids.basicssep.kids,newItems,"",MENU_ID_ENFORCE_NAME); //known get-only pet materials
		// //rename the previously inserted menu
		// menu.section_main.kids.basicssep.kids["optblock"+evt.Q15_Zoology].label="Pet Materials";
		//menuFromData(mats,menu.section_main.kids.matsep.kids,newItems,"",MENU_ID_ENFORCE_NAME); //materials
		menuFromData(mats,menu.section_main.kids.basicssep.kids,newItems,"send",MENU_ID_ENFORCE_NAME); //send materials
		//menuFromData(mats,menu.section_main.kids.matsep.kids,newItems,"send",MENU_ID_ENFORCE_NAME); //send materials
		menuFromData(prods,menu.section_main.kids.prodsep.kids,newItems,"send",MENU_ID_ENFORCE_NAME); //send production materials
		menuFromData(cols,menu.section_main.kids.colsep.kids,newItems,"col_",MENU_ID_ENFORCE_NAME); //collectibles
		menuFromData(prereqs,menu.section_main.kids.questsep.kids,newItems,"send",MENU_ID_ENFORCE_NAME); //send prereqs
		menuFromData(quests,menu.section_main.kids.questsep.kids,newItems,"send",MENU_ID_ENFORCE_NAME); //send quest materials
		menuFromData(unsorted,menu.section_main.kids.questsep.kids,newItems,"send",MENU_ID_ENFORCE_NAME); //send unsorted quest materials

	//#region dock with host		
		//send all this information in to the WM script
		Sidekick.dock({
			appID:appID,
			name:appName,
			version:version,
			thumbsSource:"assets.adventure-zc.zgncdn.com",
			flags:{},
			alterLink:{},
			icon:appIcon,
			desc:null,
			accText: accTextAll,
			tests:tests,
			menu:menu,
		});
		
	};
	

	function read(){

		try{
			var statusCode = 0;
			var doc = document.documentElement;
			var text = doc.textContent;
			var html = doc.innerHTML;
		} catch(e){window.setTimeout(read,1000);return;} 
			
		//alert("text: " + text);
		//debug.print("text: " + text);
		//alert("html: " + html);
		//debug.print("html: " + html);
		//debug.print("past init");
		
		// if (html.find("You've joined")) { alert("should accept join crew..."); sendMessage('status=1'); } //not working...
		// if (html.match(
			// /(You sent|You have received a gift|You've joined)/gi
		// )) { alert('sending status = 1'); sendMessage('status=1'); } //working!
		
		
		//check page for various texts
		// ********************************************************************************************************
		// ***** Collect ALL of the texts you can find and match them up with the following return codes:     *****
		/*
			2:"Responseless Collection", normally handled inside WM host
			1:"Accepted"
			-1:"Failed", use for reason unknown
			-2:"None Left", use for reason of already taken
			-3:"Over Limit"
			-4:"Over Limit, Sent One Anyway", registers as a type of acceptance
			-5:"Server Error"
			-6:"Already Got", registers as a type of acceptance
			-7:"Server Down For Repairs"
			-8:"Problem Getting Passback Link", used only with special flags
			-9:"Final Request Returned Null Page", normally handled inside WM host
			-10:"Final Request Failure", normally handled inside WM host
			-11:"Expired"
			-12:"Not a Neighbor", neighbor-ship required to accept post
			-13:"Requirements not met", level or building requirement
			-15:"Unrecognized Response", prevent waiting for timeout if you know to watch for some known issue		
		*/
		// ********************************************************************************************************
		
	// *** accepted
		if (html.find("You sent"))						sendMessage('status=1'); 			//sent one, got one
		else if (html.find("You have received a gift"))	sendMessage('status=1'); 			//accepted gift
		else if (html.find("You've joined"))			sendMessage('status=1'); 			//joined crew
		else if (html.find("You've already claimed this reward"))			sendMessage('status=-6'); //already claimed
		else if (html.find("You have already collected on this reward"))	sendMessage('status=-6'); //already claimed

		//sent one, got one|accepted gift|joined crew
		//if (html.match(
		// 	/(you sent|you have received a gift|you've joined)/
		//)) { 
		//	//alert('sending status = 1'); 
		//	sendmessage('status=1'); 
		//	}
		//else if (html.match(
		//	/(you have already collected on this reward|you've already claimed this reward)/
		//)) { 
		//	//alert('sending status = -6'); 
		//	sendmessage('status=-6'); 
		//	}

	// *** failed
		else if (html.find("The maximum amount of players have already claimed this reward")) 	sendMessage('status=-2');  //none left
		else if (html.find("already has the crew they need"))									sendMessage('status=-2');  //already has the needed crew
		else if (html.find("This Reward is no longer valid")) 									sendMessage('status=-11'); //expired
		else if (html.find("This gift was not found")) 											sendMessage('status=-11'); //expired
		else if (html.find("You have reached the maximum amount of feed accepts allowed for 1 day")) sendMessage('status=-3');  //over daily limit?
		//else if (html.find("You have exceeded")) 												sendMessage('status=-3');  //over daily limit?
		else if (html.find("Error joining crew"))							sendMessage('status=-1'); //crew error
		else if (html.find("You cannot collect your own reward"))			sendMessage('status=-1'); //own gift

		//none left|already has the needed crew			
		//else if (html.match(
		//	/(The maximum amount of players have already claimed this reward|already has the crew they need)/gi
		//)) sendMessage('status=-2');
		////expired
		//else if (html.match(
		//	/(This Reward is no longer valid|This gift was not found)/gi
		//)) sendMessage('status=-11');
		////over daily limit (|You have exceeded?)
		//else if (html.match(
		//	/(You have reached the maximum amount of feed accepts allowed for 1 day)/gi
		//)) sendMessage('status=-3');
		////generic error: crew error|own gift
		//else if (html.match(
		//	/(Error joining crew|You cannot collect your own reward)/gi
		//)) sendMessage('status=-1');

	// *** other
		else if (text=="") 					sendMessage('status=-5'); //no document body
		//multi-lingual checking, but status codes are very limited
		//else if (html.find('rewardConfirm_img'))		sendMessage('status=1')
		else if (html.find('rewardFail'))	sendMessage('status=-1');

		//debug.print("past tests");
		
		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(read,1000); //restart if nothing was found of value
		
	};

	//start the script either as a docking sidekick, or as a reward reading sidekick
	var href = window.location.href;
	if (href.startsWith('http://www.facebook.com/pages/FB-Wall-Manager/')) dock(); else read();

})(); // anonymous function wrapper end
