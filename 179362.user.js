// ==UserScript==
// @name           Wall Manager Sidekick (Farmville)(Temp Patch)
// @description    Assists Wall Manager with Farmville posts
// @include        /(^http(s)?:\/\/(apps\.facebook\.com\/onthefarm\/|(.*)\.farmville\.com))/
// @include        http*://www.facebook.com/plugins/serverfbml.php
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @include        /https?:\/\/www\.facebook\.com\/dialog\/apprequests\?(.*)(app_id=102452128776)(.*)/
// @exclude        /(suggestionhub|neighbors)(\.php)?/
// @exclude        http*farmville.com/flash.php?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        2.1.a
// @copyright      Charlie Ewing & Donald Mapes & Stephanie Mcilwain
// ==/UserScript== 

(function() { 
	var version = "2.1.a";
	var thisApp = "102452128776";
	
	var defaultTO=null;

	function $(ID,root) {return (root||document).getElementById(ID);}

	//pass a single value to each child iframe
	//append that value to the location.hash of the located iframes
	function hashToIframes(v,doc) {
		doc=doc||document;
		var iframes = document.getElementsByTagName('iframe');
		var f=0,iframe = iframes[f];
		while (iframe){
			var doc = iframe.contentWindow.document	
			if (doc) {
				try{doc.location.hash+=v;}catch(e){}
				//hashToIframes(v,doc);
			}
			iframe=iframes[(f+=1)];
		}
	}
	
	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.pickRandom = function () {var i=Math.floor(Math.random()*this.length); return this[i];};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	String.prototype.getUrlParam = function(s) {
		try{return this.split(s+"=")[1].split("&")[0];} catch(e){return "";}
	};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		if (this.length>1) for (var i=this.length-1;i>0;i--) {
			for (var i2=i-1;i2>0;i2--){
				if (this[i].toLowerCase().contains(this[i2].toLowerCase())){
					var b=this[i];
					this[i]=this[i2];
					this[i2]=b;
					b=null;
				}
			}
		}
		return this;
	};

	//reconstruct an array, turning it into definitions using a prefix
	Array.prototype.toDefinitions = function(prefix){
		if (this) for (var i=0;(this[i]);i++) this[i]=prefix+this[i].noSpaces().toLowerCase();
		return this;
	};


	var suggestedVote=window.location.href.getUrlParam("suggestedVote");
	if ((window.top==window.self) && (suggestedVote!=null)) {
		hashToIframes("&suggestedVote="+suggestedVote);
	};

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) {
	
		//add listener which will hot potato details back to WM if in https top document
		if (location==top.location) try {
			//alert("top document");
			if (location.href.startsWith("https:")) {
				//alert("https:");
				var hotPotatoTicker;
				hotPotatoTicker=setInterval(function(){try{
					var status="";
					if ((status=location.hash.getUrlParam("status"))!="") {
						clearInterval(hotPotatoTicker);
						location.href="http://apps.facebook.com/?#status="+status;
					}
				}catch(e){
					//alert("cannot pass details to alternate url");
				}},1000);
			}
		} catch (e){
			//alert("cannot interact with top document, assume this document is not the top document");
		}
		
		return;
	}

	//returns the merge of any number of JSON objects
	//pass JSON objects as comma separated parameters
	//var newJSON = mergeJSON(a,b,c...n)
	//note: overwrites preexisting entries from earlier passed objects
	function mergeJSON () {
		var ret = {};
		for (var a=0,len=arguments.length;a<len;a++) for (var v in arguments[a]) ret[v] = arguments[a][v];
      		return ret;
	};

	//short form for evaluate
	//returns a snapshot object
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	};

	//short form for evaluate with single node return
	//returns the actual node, not the snapshot
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	};

	//clicks an object using the mouse
	//does not run default actions like opening links
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
		e.className += " noHammer";
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	};

	//sidekick ability to pass information via hash parameter
function sendMessage(s,hwnd,flag){try{
	hwnd = (hwnd||window.top);
	if (exists(hwnd)) try {hwnd.location.hash = s;} catch(e){
		if (flag==1) hwnd.location.href = "http://apps.facebook.com/?#"+s;
		else hwnd.location.href = "http://www.facebook.com/reqs.php?#"+s;
	}
}catch(e){log("fvSidekick.sendMessage: "+e);}};

	//use this array to replace texts for purposely screwed up test texts below
	//this allows to search correctly yet not display stuff wrong in recognition
	//or in the options menu when using quick arrays and the createMenuFromArray function below
	//keep all the text here in lowercase
	var screwyTexts = {"purple popp":"purple poppy","orange dais":"orange daisy","electric lil":"electric lily","daylil":"daylily",
		"golden popp":"golden poppy","chrome dais":"chrome daisy","sun popp":"sun poppy","lucky penn":"lucky penny",
		"school supp":"school supply","gold piece":"gold","real ca milk":"Real CA Milk","cornucalfpia":"CornuCalfpia",
		"sugar pega":"sugar pegafoal","fall pega":"fall pegafoal","in hoodie":"calf in hoodie","in sweater":"calf in sweater",
		"silver pega":"silver pegacalf","cheerful scroogi":"cheerful scroogifoal","i heart ny pear":"I <3 NY Pear",
		"host pega":"host pegafoal","life of the party pega":"life of the party pegafoal","pegarudolphi":"pegarudolphifoal",
		"nypd":"NYPD","winter fun pega":"winter fun pegafoal","stay at home pega":"stay at home pegafoal",
		"traveling pega":"traveling pegafoal","valentine pega":"valentine pegafoal","giant decorated hallo":"decorated halloween",
		"giant pumpkin light t":"pumpkin light","giant spring grass tre":"giant spring grass tree","giant sprinkled egg tr":"giant sprinkled egg tree",
		"giant sea urchin cactu":"giant sea urchin cactus","giant april showers tr":"giant april showers tree"};

	//set your properties for each NewItem array here
	//WM can make use of backgroundColor, foregroundColor, newitem:[true, 1, 2, or 3] and a css classname
	//current predefined css names include: newOpt, newOpt[1-3], underline, overline, unreleased, hidden, ghost, ended, green, red, blue
	//orange, yellow, silver, gray, white, black, box, and highlight
	//** I left this open so that if an item appears in more than one newItems array, then it will attempt to take on all the visual properties given for each group
	var newItemColors={
		unreleased:{backgroundColor:"#FF6600"}, //or css:"unreleased"
		items1:{backgroundColor:"green"}, //or css:"newOpt1"
		items2:{backgroundColor:"darkRed"}, //or css:"newOpt2"
		items3:{backgroundColor:"magenta"}, 
		items4:{backgroundColor:"purple"},
		items5:{backgroundColor:"royalBlue"}, //or css:"newOpt3"
	};
	
	//mark all these as new while building the menus
	//this collection of arrays is accessed directly by createmenufromarray so you dont need to pass it each time.
	var newItems={
		unreleased:[
			"mat_farmhandcenter",
			"scientificscale",
			"massagestone",
			"buffettray",
			"stamp",
			"ballofwool",
			"golddust",			
			"woodengiraffe",
			"woodentiger",
			"woodenzebra",
			"mat_gardenamphitheater",
			"gardenbricks",
			"gardenvines",
			"gardensteps",
			
			
			],
		items1:[
"bushel_dragonvineflower",
"bushel_duskturnip",
"bushel_fairyblossomflower",
"bushel_fantasyfiresflower",
"bushel_firelightmushroom",
"bushel_flaxenstrawberry",
"bushel_gildedflower",
"bushel_goldensealflower",
"bushel_harmonyroseflower",
"bushel_kalanchoe",
"bushel_mysticaljasmineflower",
"bushel_obalpumpkin",
"bushel_pericarppotato",
"bushel_sapphireasterflower",
"bushel_shimmercorn",
"bushel_twilightcups",
"bushel_violetalliumflower",
"bushel_wanraspberry",
"bushel_whytealeaves",
"bushel_yellowdockflower",
"bushel_zaffreoats",
"bushel_ambercarrot",
"bushel_aslantcarrot",
"bushel_blakkroot",
"bushel_brightstalk",
"bushel_brusenberry",
"bushel_burdock",
"tree_alexandriterose",
"tree_amethystiris",
"tree_ancienthollow",
"tree_ancientsorcery",
"tree_aquamarinedaffodil",
"tree_aspengladiola",
"tree_blackthorncalendula",
"tree_bluebat",
"tree_blueflame",
"tree_brightfluff",
"tree_brightmagic",
"tree_chimera",
"tree_coloredsakura",
"tree_darksparkles",
"tree_darksphere",
"tree_degloomapple",
"tree_diamonddaisy",
"tree_dragonnest",
"tree_dragonscale",
"tree_dutchbirdhouse",
"tree_emeraldlily",
"tree_enchantedblossoms",
"tree_firewisp",
"tree_floatingivory",
"tree_foal_horse_spirit",
"tree_frostymug",
"tree_garnetcarnation",
"tree_geyserspirit",
"tree_giantancienthollow",
"tree_giantancientsorcery",
"tree_giantbluebat",
"tree_giantblueflame",
"tree_giantbrightfluff",
"tree_giantchimera",
"tree_giantcoloredsakura",
"tree_giantdarksphere",
"tree_giantdegloomapple",
"tree_giantdragonnest",
"tree_giantdragonscale",
"tree_giantdutchbirdhouse",
"tree_giantfirewisp",
"tree_giantfloatingivory",
"tree_giantfrostymug",
"tree_giantglowingmushroom",
"tree_giantglowingportal",
"tree_giantgnarledash",
"tree_giantgreenflame",
"tree_giantgreenseaweed",
"tree_giantjeweledsolstice",
"tree_giantlightsphere",
"tree_giantmagicpine",
"tree_giantmistyeyed",
"tree_giantmoonsloth",
"tree_giantowlwatch",
"tree_giantpotionbottle",
"tree_giantrusticlantern",
"tree_giantsleepingwillow",
"tree_giantsorcererlights",
"tree_giantspellboundwillow",
"tree_giantspiraldustpine",
"tree_giantsummerfamily",
"tree_giantsummerfriendship",
"tree_giantsylvan",
"tree_gianttearsparkle",
"tree_giantvinestalk",
"tree_giantvino",
"tree_giantwilwhisp",
"tree_giantwizardlights",
"tree_giantyumplum",
"tree_glowingauraoak",
"tree_glowingcobweb",
"tree_glowingmushroom",
"tree_glowingportal",
"tree_gnarledash",
"tree_greenflame",
"tree_greenseaweed",
"tree_hauntedcandles",
"tree_horse_spirit",
"tree_jeweledsolstice",
"tree_larkspurruby",
"tree_magicpine",
"tree_mistyeyed",
"tree_moonsloth",
"tree_mysticalthorn",
"tree_owlwatch",
"tree_pinenarcissus",
"tree_potionbottle",
"tree_rusticlantern",
"tree_sapphireivy",
"tree_sleepingwillow",
"tree_sorcererlights",
"tree_spellboundwillow",
"tree_spiraldustpine",
"tree_spookybog",
"tree_spookymummy",
"tree_summerfamily",
"tree_summerfriendship",
"tree_swirlingghosts",
"tree_sylvan",
"tree_tearsparkle",
"tree_topazelder",
"tree_ultravioletlights",
"tree_vinestalk",
"tree_vino",
"tree_wilwhisp",
"tree_wizardlights",
"tree_yumplum",
"adopt_foaldwarfdonkey",
"adopt_foalaquamarinemare",
"adopt_foaldescendingdusk",
"adopt_foalflaxenhair",
"adopt_foalmini_daisyminihorse",
"adopt_foalmysticalgold",
"adopt_foalnightglow",
"adopt_foalnightmare",
"adopt_foalpicnic",
"adopt_foalsummerfiesta",
"adopt_foalvioletwave",
"adopt_foalamberbrightpegacorn",
"adopt_foalarcanelightpegacorn",
"adopt_foalaurapegacorn",
"adopt_foalblackbutteflypegacorn",
"adopt_foaldarkmothpegacorn",
"adopt_foaldarkscrollpegacorn",
"adopt_foaleveningpegacorn",
"adopt_foalfairywisppegacorn",
"adopt_foaljekyllnhydepegacorn",
"adopt_foallightscrollpegacorn",
"adopt_foalmysticpegacorn",
"adopt_foalnarcissuspegasuspegacorn",
"adopt_foalobsidianpegacorn",
"adopt_foalredrubypegacorn",
"adopt_foalsunrisepegacorn",
"adopt_foaltwilightpegacorn",
"adopt_foalvioletarmoredpegacorn",
"adopt_foalphantompegasus",
"adopt_foalredsmokestallion",
"adopt_foalskeletonstallion",
"adopt_foalspiritstallion",
"adopt_foalultravioletstallion",
"adopt_foalblazingunicorn",
"adopt_foalcursedunicorn",
"adopt_foaldarkunicorn",
"adopt_foaldarkbriounicorn",
"adopt_foalelderunicorn",
"adopt_foalenchantedshadowunicorn",
"adopt_foalfairyheaddressunicorn",
"adopt_foalgildedunicorn",
"adopt_foalgoldensparksunicorn",
"adopt_foallightbriounicorn",
"adopt_foalmoonlightunicorn",
"adopt_foalpurpleblazeunicorn",
"adopt_foalsunspotunicorn",
"adopt_foalwhitegoldunicorn",
"adopt_foalunderworldzebra",
"adopt_calfbannerbull",
"adopt_calflunabull",
"adopt_calfdragicalf",
"adopt_calfdwarf",
"adopt_calforangechrysanthemum",
"adopt_calfridgehorn",
"adopt_calfwaterspirit",
"egg_autumnmagic",
"egg_berry",
"egg_blackbelly",
"egg_bluewizard",
"egg_brightswirl",
"egg_chictail",
"egg_flashbright",
"egg_goldenfeather",
"egg_hearthandhome",
"egg_midnight",
"egg_palemoon",
"egg_phoenix",
"egg_princecharming",
"egg_skyblue",
"egg_sorceress",
"adopt_amberdreamfawn",
"adopt_astralmagicfawn",
"adopt_daisychainmagicfawn",
"adopt_darkridgefawn",
"adopt_lightridgefawn",
"adopt_moonspeckledfawn",
"adopt_peacockfawn",
"adopt_saddledfawn",
"adopt_shadowdancefawn",
"adopt_babyember",
"adopt_darkgriffonfledgling",
"adopt_dark-manedragonwhelp",
"adopt_lightgriffonfledgling",
"adopt_light-manedragonwhelp",
"adopt_lunapup",
"mat_destinybridge",
"mat_enchantedrosebush",
"mat_summerhillside",
"mat_mysticalaviary",
"mat_mysticalgarage",
"mat_mysticallivestock",
"mat_mysticalorchard",
"mat_mysticalpaddock",
"mat_mysticalpasture",
"mat_mysticalpetrun",
"mat_mysticalstoragecellar",
"mat_mysticalwildlife",
"mat_mysticalzoo",
"anti-thorncharm",
"brick",
"bridle",
"charmedclippers",
"clamp",
"fencepost",
"gardenfence",
"grasspatch",
"grazinggrass",
"haybundle",
"hinge",
"logpart",
"nail",
"nestinghay",
"paintedwood",
"pipe",
"rabbitburrow",
"saddle",
"screwdriver",
"shovel",
"shrub",
"steelbeampart",
"stone",
"stonepart",
"tinsheet",
"tinywindow",
"toadstool",
"waterpump",
"wire",
"woodenboard",
"wrench",
"bushel_whitegarlic",
"bushel_rainbowstar",
"bushel_lemon",
"bushel_redradish",
"anvilofcourage",
"brightmetal",
"stoneofsorcery",
"bushel_nymphmorels",
"adopt_foalmysticalgrove",
"adopt_calfmysticalgrove",











],


		items2:[

],
		items3:[

		],
		items4:[
		"adopt_foalarabianprincess",
"adopt_foalcarorose",
"adopt_foalcinderella",
"adopt_foalmarieminimare",
"adopt_foalnightshademinihorse",
"adopt_foalsilkflowerpattern",
"adopt_foalvacationing",
"adopt_foalalchemypegacorn",
"adopt_foalcandyheartpegacorn",
"adopt_foalgreenpeacockpegacorn",
"adopt_foalhennapegacorn",
"adopt_foalpureimaginationpegacorn",
"adopt_foalsandpegacorn",
"adopt_foalwizardpegacorn",
"adopt_foalcavalierunicorn",
"adopt_foalfairydustunicorn",
"adopt_foalhardcandicornunicorn",
"adopt_foalorientalflowerunicorn",
"adopt_foalpuppetunicorn",
"adopt_foalsarisilkunicorn",
"adopt_calfbewitched",
"adopt_calfchinese silk",
"adopt_calfpink frosted",
"adopt_calfseashell",
"adopt_calfskinny",
"tree_alchemystone",
"tree_calliope",
"tree_candygem",
"tree_carousellights",
"tree_dragoneggs",
"tree_embellishedsari",
"tree_enchantedorb",
"tree_ensorcelledapple",
"tree_feathermagic",
"tree_gemdatepalm",
"tree_giant420blackbirds",
"tree_giantcalliope",
"tree_giantcandygem",
"tree_giantcarousellights",
"tree_giantfeathermagic",
"tree_giantgoldensugar",
"tree_giantgreenblissblossom",
"tree_gianthugepie",
"tree_giantorangecream",
"tree_giantrattatouille",
"tree_gianttailors",
"tree_giantteachers",
"tree_goldensugar",
"tree_greenblissblossom",
"tree_gryphonfeather",
"tree_hipscarf",
"tree_hugepie",
"tree_incense",
"tree_kirroyale",
"tree_magicantidote",
"tree_nightshadedeadly",
"tree_orangecream",
"tree_portwinepears",
"tree_rattatouille",
"tree_saffronflower",
"tree_silkflowerpattern",
"tree_silkribbon",
"tree_silkwillow",
"tree_spellbook",
"tree_starlight",
"tree_tailors",
"tree_teachers",
"tree_witchbrew",
"tree_wizardhouse",
"tree_wolfsbaneherb",
"egg_aerialist",
"egg_chef",
"egg_gobstopper",
"egg_petite",
"egg_pilot",
"egg_turkish",
"egg_tourist",
"tree_aerialsilk",
"tree_bigtop",
"tree_cottontuft",
"tree_cumulusfuzz",
"tree_curtain",
"tree_fluffyyarn",
"tree_fuzzyleaf",
"tree_giantaerialsilk",
"tree_giantbigtop",
"tree_giantegyptianjewelry",
"tree_giantegyptianwings",
"tree_giantpennyarcade",
"tree_giantpuffpink",
"tree_giantrosamenthleyplum",
"tree_giantruffleskirt",
"tree_giantsugarsprinkler",
"tree_giantsupersugar",
"tree_greybeard",
"tree_pennyarcade",
"tree_pinksouthernmagnolia",
"tree_puffpink",
"tree_purplewoolbatting",
"tree_rosamenthleyplum",
"tree_ruffleskirt",
"tree_ruffle",
"tree_savannah",
"tree_sugarsprinkler",
"tree_supersugar",
"bushel_spicewheel",
"tree_duck",
"bushel_whitenectarine",
"tree_frenchsilks",
"tree_falcon",
"tree_earthpresent",
"adopt_calfglen",
"tree_hawk",
"tree_whitelace",
"tree_raven",
"tree_needlepoint",
"tree_fluffyyarn",
"tree_bonsaibarberrybonsaitreeII",
"tree_greybeard",
"adopt_calfpurplecorn",
"tree_parrot",
"bushel_muntries",
"tree_maj.redwood",
"bushel_mantamushroom",
"tree_stylishhat",
"tree_pinkcucumber",
"bushel_sweetteaccups",
"tree_curtain",
"tree_townhall",
"tree_flamingo",
"bushel_yerbamates",
"tree_cumulusfuzz",
"tree_bbq",
"tree_fancyjubilee",
"tree_swan",
"tree_cucumbersandwich",
"tree_pelican",
"adopt_calffurrypurple",
"adopt_foalcarominipegacorn",
"adopt_foalfluffypegacorn",
"adopt_foalfuzzypegacorn",
"adopt_foalromanticpegacorn",
"adopt_foalsouthernmagnoliapegacorn",
"adopt_foalmintjulepunicorn",
"adopt_foalspottedunicorn",
"egg_charming",
"egg_gummy",
"bushel_parasol",
"comettales",
"flipflops",
"kitetales",
"pigtales",
"seawater",
"shipinabottle",
"mat_fairyflower",
"mat_palmparadise",
"adopt_daintydreamfawn",
			
		],
	};

	//build a menu list based on an array of text
	//add a prefix to the return word using prefix
	//automatically sorts alphabetically, set sort=false to disable
	//automatically capitalizes first letter of every word
	//point markAsNew to your collection of new items or leave blank
	//point markWithColors to your color collection or leave blank
	function createMenuFromArray(arr,prefix,sort,markAsNew,markWithColors){
		markAsNew=markAsNew||newItems;
		markWithColors=markWithColors||newItemColors;
		sort=(sort==null)?true:sort;
		var ret={};
		if (arr) {
			//clone the array before sorting
			arr2=arr.slice(0);
			if (sort) arr2=arr2.sort();
			for (var i=0,len=arr2.length;i<len;i++){
				//build the real keyname
				var keyName = (prefix||'')+arr2[i].noSpaces().toLowerCase();
				//fix its label if needed
				var fixedLabel=screwyTexts[arr2[i].toLowerCase()];
				//create the element constructing code
				ret[keyName]={type:'checkbox',label:(fixedLabel || arr2[i]).upperWords()};
				
				//mark new and stylize
				for (var colorGroup in markAsNew) {
					if (markAsNew[colorGroup].inArray(keyName)) {
						//item found listed under colorGroup
						for (var newProp in markWithColors[colorGroup]) {
							//push properties to this element
							ret[keyName][newProp]=markWithColors[colorGroup][newProp];
							//console.log(markWithColors[colorGroup][newProp]);
						}					
					}
				}
			}
			arr2=null;
		}
		return ret;
	};
	
	//build Accept Text object from an array
	//add a prefix to the return key using keyPrefix, ie "cow_"
	//add a suffix to the return value using textSuffix, id " Cow"	
	function createAccTextFromArray(arr,keyPrefix,textSuffix){
		var ret={};
		if (arr) {
			for (var i=0,len=arr.length;i<len;i++){
				ret[(keyPrefix||'')+arr[i].noSpaces().toLowerCase()]=arr[i].upperWords()+(textSuffix||'');
			}
		}
		return ret;
	};


	//try to dock with WM 1.5 main script
	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+thisApp);
		if (doorMark) return; //already posted to door


		//define types here
		//provide text as it appears in the post body/link, even if spelled wrong (ie. cirtus = citrus for FV collection items)
		//search texts do not need to be in proper case as the search engine in WM 1.5 sets everything to lowercase anyway
		//you cannot search for specific case text via a WM sidekick
		//texts are case corrected later when they are added to the options menu
		//add text entires in any order and use .fixOrder() to make sure order does not cause issues during searching


		//bushel types are grouped as they were in FVWM	
		//types are defined in separate arrays for easier use in options menu	

		var fruitTypes=["bell pepper","blackberry","blueberry","fire pepper","chardonnay","chinese eggplant","goji berry",
				"ghost chili","grape","jalapeno","leek","sichuan pepper","hilo pineapple","purple tomato","raspberry",
				"square melon","straspberry","strawberry","tomato","watermelon","white grape","yellow melon","zinfandel",
				"darrow blackberry","chandler blueberry","cove cranberry","red iceberry","frozen grapes","love strawberry",
				"sangiovese","cabernet sauvignon","syrah","pinot noir","riesling","moscato","sauvignon blanc","pineapple",
				"lilikoi","royal cantaloupe","cantaloupe","pepper","forbidden eggplant","african eggplant","red currant",
				"eggplant","elderberry","cranberry","flame pepper",
				"acorn squash","royal artichoke","asparagus","broccoli","red cabbage","cara potato","carnival squash",
				"baby carrot","chickpea","cucumber","english pea","field bean","heirloom carrot","long onion","green onion",
				"pea","potato","black pumpkin","purple asparagus","purple pod pea","radish","red spinach","rhubarb","spinach",
				"soybean","squash","squmpkin","turnip","zucchini","rappi","swiss chard","kennebec potato","pattypan",
				"butter & sugar corn","cauliflower","candied yam","carrotcicle","iceberg lettuce","kelp","royal taro",
				"taro","nagaimo","edamame","chinese daikon","bok choy","azuki","water chestnut","yam","forbidden onion",
				"artichoke","forbidden daikon","daikon","forbidden chestnut","swiss chard","onion","baby corn","parsnip",
				"garlic","pink okra","snap pea","carrot","lettuce","celery","brussel sprout","green bean","bean sprout",
				"forbidden sprouts","forbidden carrot","lentil","kidney bean","kale","dumpling squash","pumpkin","cabbage",
				"okra","amaranth","barley","corn","double grain","hops","oat","posole corn","red wheat","royal hops",
				"rye","wheat","whisky peat","triticale","iced rice","sticky rice","imperial rice","millet","forbidden barley",
				"pearl barley","brown rice","jasmine rice","rice","buckwheat","sorghum",
				"aloe vera","jade bamboo","basil","black tea","kona coffee","chinese cotton","lowland ginger",
				"green tea","lemon balm","peppermint","golden sugar cane","hay","dill","tarragon","holly","forbidden tea",
				"gummi bear","mint candy","hawaiian ginger","wasabi","saba","ramen","lemongrass","gingerbread","imperial tea",
				"white cloud tea","jade peanut","royal mustard","red nori","sugar cane","mustard","ginger","cotton","coffee",
				"peanut","bamboo","sesame","horseradish","water cress","nori","forbidden ginseng","ginseng","forbidden udon",
				"udon","lollipop","bugleweed","vuvuzela","trumpet creeper","viola","lyre leaved sage","chervil",
				"amber grain","amethyst grape","cilantro","crimini mushroom","deep dish crust","diamond corn","durum wheat",
				"emerald melon","flat crust","french tarragon","genovese basil","green pepper","marinara sauce","marjoram",
				"moonstone onion","mushroom sauce","oregano","parsley","pasta","pearl pumpkin","peridot pea","pesto sauce",
				"quartz carrot","red pepper","roma tomato","rosemary","ruby rose","sapphire berry","shiso","shallot","sorrel",
				"sundried tomato","thai basil","thyme","white wheat","yellow onion","snowman","snow woman","christmas tree",
				"rainbow snowflake","holiday bell","holiday cookie","holiday wreath","fireworks","bubbly","fairy wand",
				"ballet queen flower","stone crab","tea cups","white hibiscus","broken hearts","crystal hearts","red corn",
				"black carnation","leprechaun gnome","scarlet sunflower","birthday cake","crystal","cupid corn","snow cone","white pumpkin","candy cane","balloon","gnome",
				"red toadstool","purple toadstool","jack o lantern","green peppermint","snow carnation","king cake","rainbow",
				"candy corn","cereses carrot","capri-corn","moon flower","mercury melon","aquarius arugala","aries azalea",
				"venus fly trap","jupiter juniperus","apollo aster","celestial camellia","orange cauliflower","floating flower",
				"red tulip","purple popp","morning glory","pink rose","white rose","orange dais","electric lil",
				"pink carnation","fire & ice rose","flamingo flower","yellow rose","pink hibiscus","green hellebore","alpine rose",
				"green rose","golden popp","red clover","black rose","white poinsettia","pink aster","electric rose","star flower",
				"chrome dais","sun popp","english rose","forget me not","spring squill","lilac daffy","lady slipper","black tulip",
				"snow tulip","glacial rose","red rose","landini lilies","bells of ireland","double pikake","yellow hibiscus",
				"hawaiian orchid","lava flower","purple orchid","grass widow","night cereus","royal forget-me-not","sundew plant",
				"walking iris","pitcher plant","dragon flower","royal mum","water lily","forbidden lily","yellow marigold",
				"orange marigold","licorice plant","cherry blossom","peace flower","evening flower",
				"edelweiss","lotus","hollyhock","columbine","cornflower","gardenia","foxglove","peony","lokelani","dandelion",
				"spiral flower","lotus","flamingo","cherokee rose","bluebell","poinsettia","gladiolus","sunflower","lilac",
				"daffodil","iris","saffron","lavender","clover","daylil","lily","alfalfa","flax","agave","begonia","ivy",
				"forbidden calamari","forbidden rock cod","clam","lobster","seafood","shrimp","oyster","mussel",
				"yellowfin tuna","rock crab","ono","hamachi","grouper","squid","rock cod","prawns","scallop","forbidden unagi","unagi",
				"wolfsbane","jack o'lantern","tombstone","zombie","sage","green toadstool","ghoul garlic","spectre berries",
				"franken fruit","wormwood","phantom frond","candied corn",
				"choco mint","cider apple","flint corn","frost holly","holiday cactus",
				"holiday poinsettia","hollowberry","honey ginger","jingleberry","light orchid","potatornament","rudolph radish",
				"wax beans","white cranberry","winter grain","winter squash","ambrosia tulip","boggart bulb","butterfly rose","dark dahlia","dream cotton","elfin tea","fairy foxglove",
				"goblin vine","gossamer ivy","honey melon","nectarkin","pixieberry",
				"aquamarine rose","brooch","bubble beans","carrot gold","chamomile","coral","cuddly bear","deep sea cabbage","genie lamp",
				"glass butterfly","lava lotus","manta mushrooms","mesaqueen","mushroom fairy","octa-pumpkin","pink toadstool","pirate potato",
				"plankton","pot of gold","rainbow candy floss","rose hearts","sea sponge","shellfish","urchinberry","ambrosia","jellyfruit",
				"salty squash","sea cucumber","sea onions","sea watermelon","seaweed","triton turnip","currant tomato","paint brush",
				"organic red corn","organic ballet queen","organic blueberry","organic broccoli",
				"trowel bucket","organic carrots","trowel chest","organic cotton","trowel crate",
				"organic eggplant","organic gift","organic grape","organic onions","gold ore","organic pea",
				"organic pepper","organic pinkbow","organic pumpkin","ballet queen","organic rainbow",
				"organic raspberry","organic soybean","organic spinach","organic strawberry","organic tomato","muntires",
				"mini-earth","tumeric","australian sugar cane","yellow myrtle flower","finger lime plant","roo xing sign","australian barley","fava beans",
				"wombat berry","sweet corn","australian cotton","jungle feathers","semillon grape","shiraz grape","yellow lupin","happy marchmellows","kangaroo paws","field peas",
				"cape peppercorn","australian pineapple","australian seed","red sorghum","shooting stars","kutjera tomato","australian wheat","canola","fennel","koala","lillipilli",
				"australian purple sugar cane","late harvest semilion grape","late harvest shiraz grape","australian purple pepper","australian albino pineapple",
				"australian red pepper","australian sugar cane","green australian barley","green kutjera tomato","pink myrtle flower","purple lilli pili","purple sweet corn",
				"red australian cotton","red australian wheat","yellow field peas","yellow kangaroo paws","australian pineapple","australian barley","australian wheat",
				"blue lupin","green muntries","australian cotton","purple canola","red sorghum","white sorghum","yellow lupin","yellow myrtle","corsage",
				"caraway","chicory","garter","rainbow iris","sunshine","dazzlers","flava corn","milky strawberries","moon mischief","myne melon","ooval tomato","pod peas",
				"ruzberries","shard skin onions","solar flare bean","space dust sugar cane","star puff cotton","sun dipped pepper","sun fade barley","sun fingers",
				"thuck wheat","turni carrot","violet vein spinach","white dwarf sunflower","birthday cake","dragon sparklers","lawn flamingo","moon melons","stargazer lilies",
				"star speckles","supernova strawberries","tiara","glowing bouquet","barcelona daisy","paper flower","princess hat","flowering nettle",
				"red pineapple","straw ruby","meteorite shards","green strawberries","appleberry","cumin","forbs","gooseberry","honeyberry","kudzu","lovage",
				"teaberry","yerbamate","candied cherries","candy jasmine","canning peach","cookie petals","crafty flower","drop lemons","gumball poppy",
				"gumdrop daisy","gummy bud","jellyanthemum","licorice vine","lollipop twist","long stem cupcake","lotus mint","marsh melon","peppermint poppies",
				"snapjelly","sprinkle strawberry","sugarbell","sugar rose","sweet tea cups","whoopie thistle","butterscotch blossom","blue buttercup","coral geranium",
				"dynamite pepper","elephant peanut","english chip","goldenrod flower","highbush blueberry","lavender lily","pink kiss","popcorn","porcelain shrub",
				"red orchid","sunburst orchid","white posies","wild alfalfa","yellow lily","spice wheel","white nectarine","muntries",
				"manta mushroom","sweet tea cups","yerba mates","parasol",
				"dragon vine","dusk turnip","fairy blossom","fantasy fireflowers","firelight mushroom","flaxen strawberry","gilded flower","goldenseal","harmony rose",
				"kalanchoe","mystical jasmine","obal pumpkin","pericarp potato","sapphire aster","shimmer corn","twilight cups","violet allium","wan raspberry",
				"whytea leaves","yellow dock","zaffre oats","amber carrot","aslant carrot","blakk root","bright stalk","brusen berry","burdock","white garlic","rainbow star",
				"lemon","red radish","nymph morels",






				
				].fixOrder();
		var flowerTypes=[
				
				
			].fixOrder();
				
				
		//list of bushels needed per crafting cottage

		var bakeryBushels=["pumpkin","wheat","strawberry","carrot","pepper","ghost chili","pattypan","onion","rice",
				"blueberry","blackberry","raspberry","peanut","sugar cane","pea","broccoli","asparagus",
				"coffee","oat","cucumber","basil","tomato","ginger","posole corn","potato","red wheat","cranberry",
				"white pumpkin","green rose","pink carnation","butter & sugar corn","cauliflower","rye","shrimp",
				"taro"].toDefinitions("bushel_");
				
		var pubBushels=["hops","barley","red currant","royal hops","english rose","english pea","bluebell","spring squill",
				"cornflower","black tea","pink aster","field bean","electric rose","pink carnation","kennebec potato",
				"radish","turnips","darrow blackberry"].toDefinitions("bushel_");
				
		var wineryBushels=["rice","cranberry","white grape","sugar cane","strawberry","grape","raspberry","blueberry","tomato",
				"pepper","carrot","green tea","lilac","blackberry","basil","ginger","pumpkin","acorn squash","cucumber",
				"squash","pink rose","lavender","morning glory","sunflower","yellow melon","watermelon","white pumpkin",
				"greeen rose","pink carnation","cove cranberry","tarragon","hawaiian ginger","rye","oyster","ghost chili"].toDefinitions("bushel_");
				
		var craftshopBushels=["cotton","soybean","carrot","chickpea","sunflower","barley","tomato","aloe vera","jalapeno",
				"pink aster","rhubarb","peanut","leek","wheat","strawberry","lilac","cranberry","double grain","morning glory",
				"coffee","black tea","spring squill","cornflower","rice","rye","spinach","pattypan","field bean","cotton",
				"pepper","red tulip","foxglove","golden popp","grape","red currant","radish","hops","english pea","bluebell"].toDefinitions("bushel_");
				
		var spaBushels=["pumpkin","cranberry","sunflower","blueberry","morning glory","aloe vera","green tea","blackberry","lilac",
				"basil","iris","sunflower","pepper","red tulip","ghost chili","lily","lemon balm","ginger","coffee",
				"purple popp","daffodil","strawberry","pink rose","lavender","white pumpkin","green rose",
				"daylily","dill","kelp","double pikake"].toDefinitions("bushel_");
				
		var restrauntBushels=["darrow blackberry","chandler blueberry","strawberry","red clover","hay","rhubarb","butter & sugar corn",
				"tarragon","pepper","wheat","raspberry","white grape","cove cranberry","red currant","green tea","dill",
				"lady slipper","field beans","cauliflower","tomato","pumpkin","hops","daylily","black tea","peppermint",
				"pineapple","kennebec potato","clam","leeks","red clover","basil","lobster","seafood"].toDefinitions("bushel_");
				
		var sweetshoppeBushels=["gingerbread","iced rice","sunflower","gummi bear","candied yam","wheat","glacial rose","cranberry",
				"peanut","holly","red iceberry","chickpea","mint candy","coffee","snow tulip","sugar cane","iceberg lettuce",
				"pumpkin","frozen grapes","blueberry","rye","iceberg lettuce","carrotcicle","pattypan","leeks","blackberry"].toDefinitions("bushel_");
				
		var tikibarBushels=["taro","hilo pineapple","kona coffee","yam","lilikoi","double pikake","yellow hibiscus","oyster",
				"golden sugar cane","hawaiian orchid","hawaiian ginger","kelp","shrimp","yellow fin tuna","mussel","rock crab",
				"ono","chickpea","spinach","sugar cane","strawberry","white grape","pepper","blueberry","coffee","leek","rice",
				"jalapeno","carrot","tomato","onion"].toDefinitions("bushel_");
				
		var teagardenBushels=["imperial tea","lowland ginger","green tea","baby corn","chinese cotton","sugar cane","nori",
				"hamachi","rice","unagi","squid","wheat","millet","prawns","lotus","edamame","azuki","chinese daikon","grouper",
				"ginger","rye","sesame","jade bamboo","coffee","sticky rice","sichuan pepper","pepper","bok choy","jalapeno",
				"white cloud tea","jade peanut","wasabi","cabbage","eggplant","scallop","soybean","basil"].toDefinitions("bushel_");
				
		var potionshopBushels=["spectre berries","jack o'lantern","grape","wormwood","green toadstool","aloe vera","tomato",
				"sage","tombstone","ghoul garlic","red tulip","wheat","sugar cane","zombie","rye","blueberry","raspberry"].toDefinitions("bushel_");
				
		var patisserieBushels=["choco mint","cider apple","flint corn","frost holly","holiday cactus","holiday poinsettia",
				"hollowberry","honey ginger","jingleberry","light orchid","potatornament","rudolph radish","wax beans",
				"white cranberry","winter grain","winter squash","coffee","lavender","sugar cane","tomato","peppermint","rye",
				"sunflower","bell pepper","blueberry","cranberry","jalapeno",
			].toDefinitions("bushel_");
			
		var fairykitchenBushels=["ambrosia tulip","boggart bulb","butterfly rose","dark dahlia","dream cotton","elfin tea",
				"fairy foxglove","goblin vine","gossamer ivy","honey melon","nectarkin","pixie berry"].toDefinitions("bushel_");
				
		var coralcafeBushels=["ambrosia","aquamarine rose","blackberry","blueberry","bubble bean","carrot","carrot gold","coffee","coral",
		"golden poppy","grape","jellyfruit","lava lotus","lilac","manta mushroom","mint candy","onion","pepper","pineapple","pirate potato",
		"plankton","red tulip","rhubarb","rice","rye","salty squash","sea cucumber","sea sponge","seawatermelon","seaweed","shellfish",
		"strawberry","sugarcane","sunflower","triton turnip","urchinberrry","wheat","white grape"].toDefinitions("bushel_");
		
		var aussiewineryBushels=["australian barley bushel","red sorghum bushel","wheat bushel","australian wheat bushel","blackberry bushel","kutjera tomato",
		"ghost chili","field peas","sweet corn","pumpkin","canola","kangaroo paws","soybean","yellow lupin","cucumber","australian cotton","shiraz grape","cotton",
		"okra","muntires","semillon grape","pattypan","grape","white grape","sunflower","fava beans","lettuce","pepper","lillipilli","rice","aussie purple pepper",
		"carrot","australian pineapple","raspberry","australian sugar cane","strawberry","yellow myrtle flower","peppermint"].toDefinitions("bushel_");

		var crystalcottageBushels=["dazzlers","flava corn","milky strawberries","moon mischief","myne melon","ooval tomato","pod peas","ruzberries","shard skin onions",
		"solar flare bean","space dust sugar cane","star puff cotton","sun dipped pepper","sun fade barley","sun fingers","thuck wheat","turni carrot","violet vein spinach",
		"white dwarf sunflower"].toDefinitions("bushel_");
		
		var sugarshackBushels=["lotus mint","sugar rose","sprinkle strawberry","whoopie thistle","gummy bud","sugarbell","marsh melon","cookie petals",
		"candy jasmine","drop lemons","gumball poppy","gumdrop daisy","buterscotch blossom","licorice vine","snapjelly","pineapple","sunflower","jellyanthemum",
		"golden poppy","grape","strawberry","sweet tea cups","lollipop twist","white grape","coffee","red tulip","blueberry","rhubarb","blackberry","lilac","rye",
		"wheat","sugarbell","long stem cupcake","rice","carrot","sugar cane",].toDefinitions("bushel_");
		
		var alchemistshopBushels=["aslant carrot","blakk root","bright stalk","brusen berry","burdock","dragon vine","dusk turnip","fairy blossom","firelight mushroom",
		"flaxen strawberry","goldenseal","kalanchoe","obal pumpkin","pericarp potato","twilight cups","violet allium","wan raspberry","whytea leaves","yellow dock",
		"zaffre oats"].toDefinitions("bushel_");



		
		//this array used to clear highlights
		var allCraftBushels=[].concat(bakeryBushels,pubBushels,wineryBushels,craftshopBushels,spaBushels,restrauntBushels,sweetshoppeBushels,tikibarBushels,teagardenBushels,potionshopBushels,patisserieBushels,fairykitchenBushels,coralcafeBushels,aussiewineryBushels,crystalcottageBushels,sugarshackBushels,alchemistshopBushels);
		
		//Crafting cottage items
		//define separately for easy options menu
		var craftPub=["duke's stout","oliviaberry beer","lionhead ale","barley crumpet","floral scone","red currant trifle",
				"rosehip tea","spark rose mead","pink carnation tea","potato soup","blackberry brandy"];
		
		var craftWinery=["sweet sake","white sangria","red table wine",
				"fruit wine","spicy tomato juice","dry sake","blackberry wine","strawberry & cranberry juice","raspberry wine",
				"blueberry wine","herbal elixir","pumpkin vinegar","cucumber wine","rose petal water","melon juice","pumpkin cider",
				"green rose water","carnation vinegar","tarragon vinegar","cranberry cooler","daiquiri","ice wine",
				"snowflake cocktail","island ginger beer","oyster shot","jade falls beer","plum wine"];

		var craftSpa=["fresh sachet","floral perfume","soothing herbal lotion","relaxation oil","devotion perfume","petal sachet",
				"energizing lotion","restoring candle","lily of the valley soap","iris soap","meditation candle","pick me up sachet",
				"farmer's frenzy perfume","daffodil lotion","transcendent candle","harvest candle","green potpourri","daylily perfume",
				"dill candle","gingerbread candle","mint lotion","snowflake soap","flower lei","seaweed soap","lotus candel","bubble tea"];		

		var craftBakery=["pumpkin bread","strawberry shortcake","spicy muffin","patty pan tart","triple berry pie","peanut butter cookie",
				"raspberry blondie","vegetable tart","mocha-berry cake","oatmeal cookies","baked cucumber","pizza bread","ginger snaps",
				"potato and onion bread","carrot cake","harvest casserole","green mocha cake","candied pink carnation","cornbread",
				"cauliflower gratin","gingerbread cake","ice cream carrot cake","snowflake cookie","shrimp toast","egg bread",
				"green tea ice cream","green onion pancake"];
				
		var craftRestraunt=["blackberry ice cream","cheddar cheese","creamed corn","wild blueberry pie","black raspberry wine","fruit cider",
				"dill potato skin","jonny cake","cranberry-pineapple relish","clam chowder","baked beans","cream pie","new england lager",
				"boiled dinner","lobster roll"];

		var craftSweetShoppe=["candied apple","candied yam pie","candy cane","daiquiri","frozen fruit tart","ginger s'more",
				"gingerbread candle","gingerbread house","healthy donut","holly wreath","ice cream sundae","ice wine",
				"lollipop","mint lotion","orange taffy","peanut brittle","peppermint fudge","rock candy","sorbet","sugar snowflake"];
				
		var craftTikiBar=["poi","pineapple sunrise","coffee & cream","inamona","sweet and sour shrimp","plantation iced tea",
				"pineapple hash","shrimp salad","hawaiian kabob","island fried rice","mussel poke","yam fries","seaweed soup",
				"shave ice"];
				
		var	craftTeaGarden=["chow mein","fried rice","ikura nigiri","hot and sour eggplant","kimchi","portuguese rice","milk tea",
				"pho soup","bibimbap","vietnamese iced coffee","egg tart","bao","egg roll","oolong tea","congee","takoyaki",
				"hamachi maki","moon cake","thai tea"];
				
		var craftPotionShop=["nightshade sherbet","pumpkin pie","witch's brew","cauldron stew","invisibility potion","crystal cocktail",
				"bottled spirit","candied corncob","fire brew","lucky charm","stink bomb","sleeping smoothie","vampire venom",
				"viscous vitality","werewolf bane"];
				
		var craftMistletoeLane=["winter casserole","white cranberry muffin","stuffed squash","squash mousse","potato latke","poinsettia gimlet",
				"jingleberry ice cream","hot mint chocolate","hollow berry pie","holiday pudding","gingerbread house","frost holly sherbet",
				"cranberry turtle bar","corn relish","blackberry champagne","benne cake","apple cider"];
				
		var craftFairyKitchen=["ambrosia","boggart bread","bog stew","dahlia drops","dream cookie","elfin chocolate",
				"foxglove turnover","goblin wine","gossamer pie","midsummer tea","pixieberry crumpet","nectar licorice",
				"queens delight","rose cake"];
		
		var craftCoralCafe=["shellfish surprise","sea biscuit","salt water taffy","sea melon sorbet","coral cake","lava nachos",
		"plankton smoothie","jellyfish jam","seaweed souffle","urchinberry pie","sea spongecake","7 leagues bean dip","sea rock candy",
		"sea cucumber salad","triton turnover","oxy juice","treasure tots","iceberg salad","lava tart","seasickles"];
		
		var craftSugarShack=["amazing mocha shake","angel's halos","buttercream bliss","cherry chocolates","chocolate chip pancakes","delicate ambrosia",
		"frosted jelly doodles","funfetti cake","gummy bear pudding","impossible vanilla fudge","licorice mocha cream","lollidrop cake","mini baked alaska",
		"smores","sprinkle splosions","stunning english trifle","taffylicious pie","toasted cream magic","whoopie pie"];
		
		var craftAlchemistShop=["balm of the fairy","basilisk oil","brouha brew","brownie bait","daze of mushroom","dragon","dragon's brawn","element elixir",
		"golem stone","lucky tonic","philosopher","philosopher's stone","phoenix feather charm","pixie pipes","plentiful potion","roc remedy","root powder",
		"saving salve","siren song","sun stone","tanuki thistle","wyrm water"];

		//I dont know if the craftshop does or will ever actually share an item, but if it does, add them here.
		var craftShop=["bright yellow tractor","mechanic scarecrow","sheep topiary","apple red seeder","bonsai",
				"tree house","apple red harvester","post office","evergreen train","farmhand","yellow racer tractor",
				"stone wall","fertilize all","dainty fence","shovel","watering can","iron fence","arborist",
				"lamp post","animal feed","vehicle part","swiss cabin","stone archway","milking stool","scythe",
				"brick","wooden board","nail","lucky penn","fuel","bottle","love potion","pine fence i",
				"pine fence ii","modern table","puppy kibble","dog treat","moat i","moat ii","moat iii","moat iv",
				"moat corner i","moat corner ii","moat corner iii","moat corner iv","castle bridge","england postcard",
				"beach ball","magic snowflake","ice pig sculpture","ice horse sculpture","horse sculpture"].fixOrder();

		var craftUnidentified=["chardonnay frosted cake","chardonnay preserves","zinfandel sachet","zinfandel wine"];

		//merge craft types for searching
		var craftTypes=[].concat(craftBakery,craftSpa,craftWinery,craftPub,craftShop,craftRestraunt,craftSweetShoppe,craftTikiBar,craftTeaGarden,craftPotionShop,craftMistletoeLane,craftFairyKitchen,craftUnidentified,craftCoralCafe,craftSugarShack,craftAlchemistShop);	
		
		//only those crops that can provide crossbred seeds
		var seedTypes=["straspberry","long onion","squmpkin","red spinach","lilac daffy","fire pepper","double grain","purple tomato",
				"sun poppy","whisky peat","purple orchid","flame pepper","sunshine","iris rainbow"].fixOrder();

		//only those crops that can be of the supercrop status
		var superCrops=["strawberry","pumpkin","cotton","cranberry","pepper","grape","pink aster","watermelon","yellow melon"].fixOrder();

		//merge all crop types for actual searches
		//do not merge with seedTypes and superCrops as they are searched for differently
		var bushelTypes=[].concat(fruitTypes).fixOrder();

		//trees
		var treeTypes=["accordian","acorn","african tulip","alma fig","amherstia","amur maple","anchor","ancient twist","angel","angel red pomegranate","anti love heart",
		"apothecary jars","arabic gold coin","argile print","armillary sundial","arrow","art deco radio","ash","austrian hat","autumn ginkgo","award","awarra","baby's breath",
		"bahri date","balcony","ball drop","ballet cake","ballet tiara","balloon animals","banyan","baobab","bass clef","bat wing","bat wing coral","bay laurel","beehive","beet",
		"beignets","bird cherry","bitternut hickory","black elderberry","black leather heart","black locust","black pumpkin","blackforest","blackthorn","blood orange","blue bell",
		"blue cloud","blue rose","bombshell","boogie board","bradford pear","breadnut","breakfast in bed","broom","broomstick","bubble bath","bubble flower","bubble gum","buried treasure",
		"bursted bubble","cake pop","calaveritas","california redbud","candelabra","candle nut","candy charms","card trick","carob","cat topiary","ceiba","celtic","celtic wings",
		"chain ribbon","chainfruit cholla","chamomile cluster","chanee durian","chaste","chemistry lab","chickasaw plum","chicle","chinese lantern","chinese strawberry","chinese tamarisk",
		"choco macadamia","chocoberries","chocolate factory","christmas list","chrome cherry","cinnamon roll","cistena plum","citrus wreath","city parrots","clockwork heart","clove spice",
		"colorful teacup","comet","conch shell","corinthian peach","cork oak","crab apple","crack willow","cran jelly","crazy pattern","crimson cloud hawthorn","crown jewel",
		"crystal banana","crystaline toadstool","cuban banana","cube","cubist","curtain call","dahurian birch","daisy","dark dogwood","date palm","dawn eucalyptus","deco sunburst",
		"deep yellow wood","dewdrop flower","dewdrops web","diner sign","disco ball","donut","donuts","downy birch","dragon's blood","drive in","dusk","dwarf almond","dwarf orchid",
		"earth pattern","easter apples","easter basket","edelweiss","elberta peach","embroidery","empress","english oak","european aspen","european beech","european pear",
		"fairy bell flower","fairy lantern","fairy plum","fall flowers","falling leaves","falling streamers","fancy egg shell","fang","feast","fire & ice","fire & ice rose",
		"fire green apple","flaming heart","flippers","floral print","flower heart","fluorescent light bulb","foggy skyline","foxtail palm","french press","frosty bell","galaxy",
		"gargoyle","garlic","gerber","ghostly banana","glacier buttercup","gladiolus","glass buttefly","glass slipper","glitter microphone","glitter plum","glowing tulip","glowy",
		"goat","gold & silver pear","gold medal","gold thread","gold tinsel","golden apricot","golden bell","golden malayan coconut","golden plum","golden starfruit","goldenchain",
		"goldenrain","gordonia","gramaphone","granny smith apple","grayscale","green chili","hair comb","halloween","halloween glass","hand dyed","handmade card","hardy kiwi",
		"hass avocado","hat box","hawaiian cherry","hazelnut","headdress","heart candle","heart candy","heart shape","heart shaped mom","hearts & clouds","hearts & stars",
		"holiday cupcake","holiday teddy","hollywood premier","farmville sign","honeyberry","hot cross buns","humpty dumpty","i heart ny pear","i love you","ice crystal",
		"ice skating dress","iceberg","iced tea & cocoa","igloo","indian laurel","irish top hat","jaca","jacks","jade bamboo","japanese angelica",
		"japanese maple","japanese persimmon","japanese privet","japanese snowbell","japanese teapot","jester","juke box","kalamata olive","key lime","keyboard",
		"kilimarnock willow","kite ribbon","kwanzan cherry","la rosa","leo zodiac","liberty torch","lightning bug","local veggies","lombardy poplar","longan","love bird","love sundae",
		"lovestruck","macrame","magic beanstalk","magic carpet","magic feather","magic lamp","magic wand","magical sugar maple","manila mango","marbles","mardi gras queen","mars",
		"marula","match stick","melaleuca","merchant scales","midland hawthorn","mimosa silk","mint candy","mint gumball","miss muffet","mission olive","mixed nut","mobile",
		"mom's gift basket","mom's makeover","monkey tea","monster puff","monterey cypress","montmorency cherry","moon","moonlit bridge","moth orchid","mother earth","mountain ebony",
		"mountain silverbell","mummy","music box","musical ballet","mylar unicorn balloon","mystic water","mystic wave","nautical star","needle & thread","neon palm","noisemaker",
		"northern catalpa","nosey nose","nutcake","oak","octopus","ohia","ohia ai","oklahoma redbud","old vine","oleander","open simsim","organic berries","ornament","ornament ii",
		"oyama magnolia","pacific madrone","pagoda dogwood","paint brush","panda toy","paper bag","paper flower","paperbark maple","parisian sunset","pastel egg","patchouli","paw print",
		"peach palm","peacock feathers","pecan pie","perfume","perfume bottle","persian pattern","picholine olive","pie","pie face","pin oak","pink camellia","pink dogwood",
		"pink magnolia","pink plum","pink rose","pink smoke","pink trumpet","pinwheel bow","pistachio","pixie","pizza pie","pocket watch","poison apple","pom pom","pom poms",
		"ponderosa lemon","pop art","pumpkin cake","pumpkin carriage","purple glitter palm","purple hanging flower","purple holiday","purple ivy","purple magnolia","purple tulip",
		"quaking aspen","quill pen & parchment","radiant sun","radio city","rainbow butterfly ii","rainbow harp","rainbow ribbon","rainbow snowflake","rainier cherry","recycle",
		"red alder","red horse chestnut","red light","red mulga","red pine","red rocket crape","retro shamrock","ribbon","riberry","rock candy","rope light","roses & hearts",
		"royal cape","royal crystal","royal poinciana","rubber","ruby guava","russian egg","rusted chrome heart","samovar","sandbox","sandstorm","sartre guava","saucer magnolia",
		"saxophone","scarlet buckeye","scepter","school supplies","schreink's spruce","scorpio zodiac","secret garden","shagbark hickory","shinko pear","shipwreck","shopping spree",
		"silent film","silk diamond","silver & jewels","silver bangles","silver maple","silver orange","singapore jackfruit","snow lights","snowball & fireball","snowman","soda jerk",
		"southwestern chitalpa","sparkling ruby ring","sparkling snowball","speckled alder","spiral rainbow","spirit","spring bonnet","spring cleaning","spring moss","spring wildflowers",
		"squash","st basil's cathedral","stacking rings","stage lights","staircase","star","star balloon","star ruby grapefruit","starlite","stone pine","stormy cloud","sugar apple",
		"sun","sunflower","sunrise","swans","sweet gum","sweet tooth","swirl heart","swirl mint","swiss chocolate","tachibana","tea & crumpet","tempskya","thorned heart","throne",
		"times sq.","tonto crape","topiary","toy doh","toy nut","tped","treasure chest","treasure map","tres leches","triangle print","tulip","tung oil","tv dinner","twinkle twinkle",
		"umbrella bamboo","umbrella pine","venetian chandelier","vera wood","vintage patchwork","vintage skate","vinyl 45s","vitex","voodoo doll","walk of fame","water balloon",
		"water crystal","water droplet","weeping birch","western red cedar","white cedar","white pine","white plumeria","white walnut","white weeping cherry","white wisteria",
		"whoopie cushion","wild cashew","wild service","willamsonia","winter spruce","winter squash","wych elm","x-ray","yellow hibiscus","yellow magnolia","yellow passion fruit",
		"yellow plumeria","yellow rowan","yellow watermelon","zebra","twisted lavender redbud","sabal palm","desert bloodwood","wine cask","roller coaster","bradford pear",
		"bubble blowing","buttons n beads","cap and gown","chowder bowl","cologne bottle","dad's desk","electric bubble","fishing gear","gardening tools","harvest heart","hydra","locker",
		"pink magnolia","mosaic","pruning shears","radioactive","redwood majestic","sparkling twilight","spring dress pattern","spring wedding cake","sunset skyline","surrealist","threes",
		"trim topiary","unrippened fruit","venus flytrap","wedding parasol","white lace promises","sommelier","chinese rain","hot air balloon","paper mache","iced mint mocha","cali bridge",
		"slice of cake","cherry cheese danish","birthday cake stand","sugar cubes","party favors","pinata fun","party hats","bear hug","carrot monster","percolator",
		"pinata","scales","spotted","streamers","george washington cherry","buckets of paint","mom's apple pie","rainbow cupcake tiered","magic dutch tulip",
		"whispy rainbow willow","coming attraction","glowing banana","rainbow burst","mayan calendar","jar candy","rainbow fairy","rainbow flag","gelly fruit",
		"colliding galaxy","firefly jar","handmade jewelry","paper lantern","rainbow lights","funfetti marshmallow","double moon","neon paint","block party",
		"patriotic pinwheel","carnival ride","rainbow ring","rainbow rose","libra scales","meteor shower","meteror shower","sweet stripes","summer sunset",
		"rainbow wing","cancer zodiac","sagittarius zodiac","taurus zodiac","birthchart","firecrackers","gradient","liberty","needlepoint","novastar","pulsar",
		"quasar","sherbet","cosmic dust","all day sucker","asian porcelain","blown glass","blue bliss blossom","blue cotton candy","cake pop","cake slice",
		"candy cash","candy coated popcorn","candy jar","candy jar","chocolate cherry","colorful vines","confection","cross pattern",
		"cupcake pyramid","decoupage","egg cream","egyptian ankh","egyptian jewelry","egyptian wings","evergum","fiery red sucker","frosted sprinkle",
		"frosted sugar cookie","gelatin","german porcelain","gold porcelain splash","green dream sucker","gumball","hard candy licorice","honeycomb",
		"jawbreaker","jelly bean juniper","lemon meringue","licorice willow","lollipop st lamp","magic porcelain hibiscus flower","orange bliss blossom",
		"painted flower","parfait","pastry","pinata pine","pink bliss blossom","pipe cleaners flower","porcelain bouquet",
		"porcelain hibiscus flower","pretty embroidery","purple passion sucker","rainbow cake","red velvet cake","ribbon pop","russian rose porcelain",
		"soft serve","strawberry mouse","strawberry whip","sunny sucker","sweet st","taffy pull","toffee peanut","wonderful wafflecone","wrapper candy","acorn sparkle",
		"autumn glow willow","autumn heart","beading","blue sky","candy crayon","candy necklace","coat of arms","egyptian lotus","egyptian of life","farmer hat",
		"fiery hoops","fire porcelain","flashbulb","floating slime","freezing thermometer","gardener bonnet","glitter mushroom","golden weeping willow",
		"japanese orange maple","leafy greens","long scarf","magic trying","maple shade","maple","marshmallow stars","metal wind chime","old glory","old love","pan rack",
		"pink and gold heart","pink glitter","pink poplar","pink potion bottle","pink sequin","pink tiara","police bobby","pool noodle palm",
		"porcelain butterfly","porcelain gold leaf","porcelain lily","royal headdress","savannah acacia","scarab","shades of pink","spirit of liberty","splash fun",
		"summer to fall","sunburst orchid","sun orb","sun panel","sweet music","taffeta tutu","trying","vintage flag","watering can","waterwhirl","wheelbarrow",
		"wildflower bouquet","worchester royal porcelain","alchemy stone","calliope","candy gem","carousel lights","dragon eggs","embellished sari","enchanted orb",
		"ensorcelled apple","magic feather","gem date palm","golden sugar","green bliss blossom","gryphon feather","hip scarf","huge pie","incense","kir royale",
		"magic antidote","deadly nightshade","orange cream","port wine pears","rattatouille","saffron flower","silk flower pattern","silk ribbon","silk willow","spell book",
		"starlight","tailor's","teacher's","witch brew","wizardhouse","wolfsbane herb","aerial silk","big top","cotton tuft","cumulus fuzz","curtain","fluffy yarn",
		"fuzzy leaf","greybeard","penny arcade","pink southern magnolia","pink puff","purple wool batting","rosa menthley plum","ruffle skirt","ruffle","savannah",
		"sugar sprinkler","super sugar","duck","french silks","bbq","cucumber sandwich","cumulus fuzz","curtain","earth present","falcon",
		"fancy jubilee","flamingo","fluffy yarn","greybeard","hawk","needle point","parrot","pelican","pink cucumber","raven","stylish hat",
		"swan","town hall","white lace","alexandrite rose","amethyst iris","ancient hollow","ancient sorcery","aquamarine daffodil","aspen gladiola",
		"blackthorn calendula","blue bat","blue flame","bright fluff","bright magic","chimera","colored sakura","dark sparkles","dark sphere","de-gloom apple",
		"diamond daisy","dragon nest","dragon scale","dutch birdhouse","emerald lily","enchanted blossoms","fire wisp","floating ivory","tree spirit foal","frosty mug",
		"garnet carnation","geyser spirit","glowing aura oak","glowing cobweb","glowing mushroom","glowing portal","gnarled ash","green flame","green seaweed",
		"haunted candles","tree spirit horse","jeweled solstice","larkspur ruby","magic pine","misty-eyed","moon sloth","mystical thorn","owl watch","pine narcissus",
		"potion bottle","rustic lantern","sapphire ivy","sleeping willow","sorcerer lights","spellbound willow","spiral dust pine","spooky bog","spooky mummy",
		"summer family","summer friendship","swirling ghosts","sylvan","tear-sparkle","topaz elder","ultraviolet lights","vine-stalk","vino","wilwhisp","wizard lights",
		"yum plumtree",



].fixOrder();

		
		//giant trees
		//do not provide the words big or giant in front of these as that is done programatically later
		var treeTypes2=["chilly seasons","african pear","albino redwood","alexandrite","allium","alstonia","amaryllis","american basswood","american larch","american linden",
		"american sycamore","amethyst gem","anemone","angel reef","angel trumpet","animal balloon","animal cloud","animal","anti-valentine","apollo","chocolate apple","frozen apple",
		"honeycrisp apple","sour apple","spring apple","april showers","aquarius","araguaney","arctic cookie star","aries","armillary sundial","aromita","art deco lamp","art deco radio",
		"art deco","arts and crafts","asian white birch","atlantean sea shell","australian boab","australian fan palm","australian grass","autumn umbrella","baby bird","baby bundle",
		"baby carriage","balloon","ballroom","banana peel","banapple","blue ribbon baobab","bare christmas","bare crystal","bark","basket","bassinet","beach ball","beach plum",
		"beach umbrella","beads","belladonna","bell flower","bell pepper","bell","bear","bird of paradise","birthday candles","birthday hat","birthstone","biscotti","bjuvia","black apple",
		"blackboard","black cherry","black dragon","black oak","black wattle","blossoming","bluebird of paradise","blue jackolantern","blue mystic cloud","skull & bones","book","broom",
		"boombox","borealis","bouquet","bowtie","bow","box of chocolates","chocolates","bracelet honey myrtle","brazil nut","breakfast","breakfast scone","goldenrain","bristlecone pine",
		"brooklyn bridge","bubblegum","purple bubble gum","bubble","bumble bee","bunya pine","bushy kelp","butterfly","butterfly heart","cake pop","camphor","candlelight","candle",
		"candy apple","candy cane","candy corn","bright candy corn","heart candy","candy heart","candy pumpkin","capricorn","caramel apple","caribbean trumpet","caricature","carins",
		"sequin","carved lantern","carved","cats eye","cauldron","cedar carriage driver","celery","celestial","celtic knot","central park pigeon","ceres","champak","chandelier","cheese",
		"chemistry lab","cherry blossom","chrome cherry","chinese fringe","chinese hackberry","chinese mulberry","chinese rain","chinese tallow","potato chips","chiton tee",
		"chocolate box","chocolate factory","chocolate heart","chocolate pickle","chocoberries","chrome tubing","chromodoris nudibranch","cider cypress","city parrots","climbing",
		"clog","clover","clownfish","coal","cocoa","coconut punch","coin","common laburnum","witch hat","constellation","cornucopia","corsages","coupon","cow leaf","cowry","queen's crape",
		"spring egg","cream treat","crown flower","crown","crystal ball","crystal cave","crystal heart","wedding","purple crystal","cupcake","cupid arrow","cupid","cypress","dandelion",
		"dark apple","dark bramble","dark butterfly","dark candle","dark christmas","dark heart","dark jewel","dark peach","dark rose","dark willow","davidson plum","deadly nightshade",
		"decorated halloween","deco sunburst","denim","basic derby","bass derby","derby boot","salmon derby","trout derby","dew","diamond ring","luxe gem","diamond ii","didgeridoo",
		"dinosaur eggs","dinosaur fossil","disco ball","disguise kit","dog treat","donuts","dove","dracaena draco","dragon boat","dragon fruit","dragon","dreamtime","dream trumpet",
		"dreidel","drumstick","dryad","dumpling","dwarf blue spruce","earth","easter egg","eastern cottonwood","eastern cottonwood 2","eccentric elm","egg nog","elephant ear","emerald",
		"encapsulated","enchanted iris","enchanted yew","engagement ring","fan palm","silver fir","evergreen pear","exploding eucalyptus","fairy","fairy bubble","fairy butterfly",
		"fairy dust satchel","fairy gold","fairy lantern","fairy light","fairy ring","fairy shoe","fairy snowflake","fairy wing","fall bouquet","fall candle","fall cupcake","cornucopia",
		"fall feather","fall oak","fall ribbon flower","father","feather palm","holiday hot chocolate","fiesty gem","fire apple","fire cherry","large fire gem","fire orange","firework",
		"fizzy popsicle","flapper dress","flapper headdress","flats","flip flop","fluorescent willow","flower box","flower burst","flower power","flower","fleur de lis","foggy skyline",
		"forbidden gem","fortune cookies","fraiser fir","french bread","french fry","french press","frosted autumn","frosted fairy","frosted mapple","frost fire maple","frost holly",
		"frozen fire","frozen gem fruit","frozen snowfall","frozen yogurt","fruit","full moon","farmville games","gadget","garden tool","gelato","gem fruit","pink gem","red gem",
		"gemstone","gem","geode","gerbera","gharqad","ghost","ghost","ghost willow","red rose","gift card","gingerbread","ginkgo maple","glass slippers","glitter butterfly",
		"glitter holiday","globe","glowing jellyfish","glowing lantern","gnarled","goblet","goblin","gold chain","white golden apple","golden coral","golden egg","golden fairy",
		"golden holiday","golden koala","golden larch","gold holly","gold lace","gold pot","gold sitka spruce","gramaphone","grand berry","grand citrus","grand lemato","grand plumapple",
		"grand stonefruit","green anemone","green boogie board","green man","green tinsel","green weeping lilly pilly","green yarn","grenada pomegranate","grocery","guardian","gum drop",
		"gummy bear","hair down","hair up","hala","halloween candle","halloween candy","halloween cookie","halloween lantern","hallow willow","hand fan","handmade card","hanger",
		"hanging snowflake","hard candy","harmony bonsai","fall harvest","haunted","haybale","headdress","heart balloon","heart cotton candy","heart locket","heart shaped mom",
		"heartflake","heart","hedge","hidden garden","himalayan yew","holiday candle","holiday corn","holiday card","holiday chocolate","holiday cookie","holiday feather",
		"holiday lantern","holiday light","hollow lantern","hologram","horseshoe","hot air balloon","hot chocolate","hot cocoa","hot pink","hot sauce","hypselodoris nudibranch",
		"ice cream","ice cream mango","ice cream sundae","ice diamond","iced mint mocha","ice laburnum","ice sculpture","icicle","icy flame","impressionist","impressionist ii",
		"industrial gears","instrument","irish of life","jack o lantern","jade fan","jade fireworks","fujian birch","japanese fern","japanese stewartia","japanese wisteria",
		"jelly bean","jelly blob","jetset","jewel","jingle bell","juicy apple","juicy pear","jujube","july balloon","july confetti","july cupcake","july firework","july ice cream",
		"jungle feather","snake","jupiter","kakadu plum","kaki persimmon","kaleidoscope","kelp forest","king cake","kite-eating","korean white beam","kumquat","kwanzan cherry",
		"label","labyrinth","lacebark elm","lace","lacey parasol","ladybug","lantern pad","large tulip","lava banyan","lava flower","lava lamp","lava stone","lei","lemon aspen",
		"leopard","lettermen","liberty bell","licuala palm","lightwire","lollipop","loud noisemaker","lucky charm","luminous jelly","lunar conifer","mac&cheese","magic mushroom",
		"magic orange","magic peach","magic","magnifying glass","mahogany","majestic redwood","mama koala","manchineel","mardi gras","martian","mask","may ribbon","may streamer",
		"mechanical","melting snow","mercury","metallic fir","metallic crab apple","metasequoia","mexican hand","milkshake","mini cupcake","mint candy conifer","modern art",
		"mother's cookies","mom's bouquet","mom's gift basket","kid crafts","mom's makeover","monkey pod","moonlit holiday","moonlit mulberry","lunar","moreton bay fig","mossy",
		"mother's day cards","mom's flowers","mustache","muffin hat","mulled wine","mushroom","muskogee crape","mystical fire","mystic stone","natchez crape","navel orange",
		"new arrival","new year lantern","fire peach","noir","non sequitur","north pole","note","nutclock","nutcracker","nutty ice cream cone","old growth berry","old growth citrus",
		"old growth lemato","old growth plum apple","old growth stonefruit","on sale","orange australian flame","orange sea pen","origami","ornate sea","outback","over-fertilized",
		"overgrown berry","overgrown citrus","overgrown lemato","overgrown plum apple","overgrown stonefruit","pacifier","paisley","pansy","paper fire","paper flower","paper umbrella",
		"parasol","parasol","parrot","party favor","party hat","pawpaw","peace","icy peach","peacock feathers","pencil cedar","pencil","persian parrotia","peumo","phantom oak",
		"phoenix fire","pignut hickory","pink bouquet","pink coral","pink diamond","candy bouquet","pink lemon","pink pearl","pink skull","pinwheel hat","pinwheel","pirate sail",
		"pixie maple","pixie","platform shoe","pohutakawa","poinsettia lantern","poinsettia","pole berry","pole citrus","pole lemato","pole plum apple","pole stonefruit","pom pom",
		"possumhaw holly","pot of gold","present","prism coral","prism pine","prism","pumpkin light","pumps","purple angel trumpet","purple empress","purple gum","purple japanese",
		"snowflake ii","purple star","purple thistle","purse","puzzle","queensland bottle","rainbow","rainbow cotton candy","rainbow fir","rainbow glitter","rainbow jelly","rainbow leaf",
		"rainbow magnolia","rainbow neon hearts","rainbow prism","glass prism","rainbow shower","raincoat","raindrop","rapier","rat house","rattle","ray","recycled bottle","recycled can",
		"recycled cardboard","red anemone","red cassia","red coral","red dogwood","red magnolia","red panda","red umbrella","red willow","red yarn","reef","reindeer","ribbon candy",
		"ribbon flower","ribbon wand","ring pop","river red gum","robot","rocky candy","rock elm","roo","rose star","rotten apple","round ribbon","sachet","saddle shoe","tree of sadness",
		"safari hat","sail","sand dollar","sangria","santa hat","sapling apple","sapling berry","sapling citrus","sapling lemon","sapling stonefruit","sapphire","satellite dish",
		"scarecrow","haunted","school dance","school supplies","scratch-n-sniff","sculpted","sea fan","sea shell","seasons","sea star","sea urchin cactus","seaweed","secret key",
		"seedling apple","seedling berry","seedling citrus","seedling lemon","seedling stonefruit","shade","lucky cookie","shamrock","shave ice","shooting star","spree","shuriken",
		"sigillaria","stringed","silver aluminum","silver bark","mountain silverbell","silver jingle","silver shell","skinny palm","skyline","slime star","smooth sumac","smore",
		"snowball","snowcone","snowflake","snowflake meadow","snowglobe","snow glow","snowshoe","snowy gumdrop","so bright","solar eclipse","solar power","sombrero","sound wave",
		"sparkle","sparkling palm","speaker","spice","spider","spiderweb","spilling coffee","spiral crystal","spirobranch","spooky crystal","spooky lantern","spooky moss","spooky",
		"spring basket","spring blossoms","spring cookies","spring dye","spring grass","sprinkled egg","spruce birdhouse","sprung","squat hedge","stained glass","standup stage",
		"star anise","star fish","star flower","starry willow","steel","steelwood","stillsplash","stocking","stone willow","stout","st. patrick's","strawberry cake","strawnango",
		"sugar cookie","sugar plum fairy","sugar skull","sugar","summer cherry","summer greens","sun beam","gaint sunglasses","sunshine","sweater","sword","sycamore maple",
		"tahitian pearl","tangled","tarot card","tasmanian oak","tea crab apple","teak","tea party","teddy bear","tesla coil","thorny seastar","thorny","three flower","tide pool",
		"tie dye","tiger eye","tiki","tinsel maple","toadstool","miracle-gro","torch","tornado","toy brick","toy train","toy","tp","travelers palm","travel","treasure map","treasure",
		"treble clef","christmas past","of life","of light","of love","tribal mask","trick or treat","trident maple","tritonia nudibranch","trophy","tropical bird","mystical tropical",
		"cocoa truffle","turquoise","turquoise","tutti frutti","gaint tv camera","twilight willow","twisted","twisting vine","umbrella","ume","broken heart","valentine cookies",
		"valentine's","vampire","vegespread sandwich","salad","venetian mask","venus","victorian hats","volleyball","warm seasons","water slide","wattle","wavy willow","wedding candle",
		"wedding invitation","weeping berry","western australian christmas","western black cedar","whispy","white cloud","white cypress","white enkianthus","white mulberry","white pearl",
		"white speckled alder","white trumpet","white weeping lilly pilly","whittled","wicker basket","wild desert lime","wilted","wind chime","wine bottle","wine cork","wine grape",
		"wing","winter flowering gum","winter gharcod","winter magic","winter spirit","winter sports","wishing","wisp willow","witch hat","witch pumpkin","witch vine","wizard","full moon",
		"wolfsbane","wooden button","wutong","magic yarn bonsai","yellow rose","yellow sea pen","yellow shower","amber maple","yellow weeping lilly pilly","yggdrasill","young sequoia",
		"zigzag","zipper","chocolate strawberries","mom's delicious bouquet","4th birthday cotton candy","fresh coat of paint","buttons n beads","in a bubble","spring wedding cake",
		"4th birthday cakepop","4th birthday candle","rainbow snow cone","cap and gown","4th birthday party","spring dress pattern","wheel barrow planter","wedding willow tree",
		"sparkling twilight willow","shopping bags","yarn ball","desert bloodwood","lavender bloom","bubble blowing","cologne bottle","chowder bowl","cali bridge","rainbow brush",
		"electric bubble","glass bubble","iridescent bubble","monarch butterflies","wine cask","lemon chiffon","roller coaster","dad's desk","venus flytrap","unrippened fruit",
		"fishing gear","harvest heart","shave kit","still life","paper mache","redwood majestic","sabal palm","wedding parasol","bradford pear","pencil pens","magnolia pink","bubble pipe",
		"whitelace promise","prom queen","cucumber sandwich","pruning shears","spring showers","sommelier","rainbow splattered","gardening tools","wedding tophat","trim topiary",
		"baton twirling","wedding veils","bubble wrap","backpack","bbq","crochet","flannel","groovy","horned","hydra","locker","melting","monster","mosaic","palette","preserves",
		"radioactive","seedling","spool","surrealist","tentacle","threes","maj. redwood","peach fuzz apple","space encased orange","olympic asian pear","ping pong sponge",
		"ring around","story book","birthday cake","space cloud","flower cluster","crystal crown","blue fhuz","starlight fiber","fickle flower","fantasy four","cherry gem",
		"inner glow","globe ii","astro juice","curly knot","sun lemon","carrot monster","fragmented moon","loyal oak","space passage","space pine","plasma plum",
		"gem pocket","pokey points","star portal","pink puff","space rock","asian rosewood","floating slime","tuft top","wooden windchime","cap","diploma","elyk","fiyah",
		"foliage","frizzy","furball","grapevine","honeyglass","nebula","pillis","slime","tassle","townhall","treasurer","tribute","urban","xarol","zork",
		"pearl cherry blossoms","peach ice cream","sweet flower heart","gold lace juniper","pink cucumber magnolia","mixed green salad","coming attraction",
		"utility belt","lace bow","opal brooch","crystal butterfly","frosted butterfly","romance candle","english daisy","rainbow eucalyptus","trail gear",
		"red giant","sunset hala","sunset hibiscus","union jack","loquat jam","rose jewel","topaz jewel","veggie kabob","traffic light","happy little",
		"mixed media","mini meteor","spanish mosaic","crape myrtle2","belgian poppy","freeze ray","saturn rings","lime slices","purple smoke","brussel sprout",
		"blue spruce","moorish tile","lemon twist","pineapple upsidedown","mixed veggie","glowing willow","asparagus","biblio","campfire","canoe","clicker",
		"dodo","duck","eagle","easychair","falcon","farmville","fascinator","flamingo","gameday","garden","goose","hawk","illuminating","jubilee","observatory",
		"owls","parrot","pelican","playground","pomelo","pretzel","rambutan","raven","ride","slide","sloog","sparkler","swan","telescope","top","turkey",
		"vulture","woodpecker","all day sucker","blue bliss blossom","blue cotton candy","cake pop","cake slice","candy cash","candy coated popcorn",
		"cherry meringue","chocolate cherry","colorful vines","confection","cross pattern","cupcake pyramid","decoupage","double popsicle","egg cream",
		"egyptian ankh","evergum","fiery red sucker","frosted sprinkle","frosted sugar cookie","gelatin","german porcelain","green dream sucker","gumball",
		"hard candy licorice","honeycomb","ice cream bar","jawbreaker","jelly bean evergreen","jelly bean juniper","lemon meringue","licorice willow",
		"orange bliss blossom","parfait","pink bliss blossom","purple passion sucker","rainbow cake","red velvet cake","ribbon pop","soft serve",
		"strawberry mouse","strawberry whip","sugaryroll","sunny sucker","taffy pull","toffee peanut","wonderful wafflecone","wrapper candy","acorn sparkle","beading",
		"blown glass","blue sky","candy crayon","candy necklace","coat of arms","farmer hat","fiery hoops","flashbulb","floating slime","freezing thermometer",
		"gardener bonnet","gelly fruit","glitter mushroom","leafy greens","lollipop cookies","long scarf","maple shade","metal wind chime","pan rack",
		"big pink & gold heart","police bobby","pool noodle palm","porcelain lily","savannah acacia","shades of pink","splash fun","sunburst orchid","sun orb",
		"sun panel","sweet music","watering can","waterwhirl","wheelbarrow","wildflower bouquet","4 & 20 blackbirds","calliope","candy gem","carousel lights","magic feather",
		"golden sugar","green bliss blossom","huge pie","orange cream","rattatouille","tailor's","teacher's","aerial silk","big top","egyptian jewelry","egyptian wings","penny arcade","pink puff","rosa menthley plum","ruffle skirt","sugar sprinkler",
		"super sugar","ancient hollow","ancient sorcery","blue bat","blue flame","bright fluff","chimera","colored sakura","dark sphere","de-gloom apple",
		"dragon nest","dragon scale","dutch birdhouse","fire wisp","floating ivory","frosty mug","glowing mushroom","glowing portal","gnarled ash","green flame",
		"green seaweed","jeweled solstice","light sphere","magic pine","misty-eyed","moon sloth","owl watch","potion bottle","rustic lantern","sleeping willow",
		"sorcerer lights","spellbound willow","spiral dust pine","summer family","summer friendship","sylvan","tear-sparkle","vine-stalk","vino","wilwhisp",
		"wizard lights","yum plumtree",


		
		].fixOrder();
			
		//bonsai trees
		var treeTypes3=["habanero","andromeda","azalea","flowery","camellia","cherry","crabapple","magic crown of thorn","pomergrante","magic gem","hibiscus","maple","magnolia","orange",
		"pink almond","magic pink azalea","wisteria","magic rainbow prism","magic gum","tulip","weeping willow","white wisteria","aquatic","barberry","adenium","amethyst","bamboo","beech",
		"bobbing apple","brazilian rain","candycorn","chinese perfume","christmas","chrysanthemum","crape myrtle","delphinium","dogwood","dwarf plum","forsythia","fringe","fuchsia",
		"magic gardenia","ginkgo","grape","honeysuckle","key lime","lantana","lavender star","lilac","magic maple","neea","plum","powder puff","rhododendron","quince","rainbow chili",
		"red ribbon","star","white jasmine","white pine","desert rose","fir bonsai II","magic rainbow gem","red rose","magic pink harmony","magic porcelain ginkgo","pink harmony",
		"porcelain ginkgo","barberry bonsai tree ii"].fixOrder();
			
		
				
		//building type catcher for random materials
		var buildings=["fairy flower","palm paradise","beehive","garage","pig pen","haunted house","dream nursery","craftshop expansion","rainbow pond","summer poolhouse",
				"orchard","funhouse","duck pond","combine","greenhouse","sheep pen","spring garden","craftshop",
				"water wheel","crafting silo","horse stable","wildlife habitat","winter pet run","winter zoo","winter aviary",
				"cove","winter livestock pen","winter animal pen","winter wonderland train station",
				"snow treasure","winter water wheel","winter pasture","winter paddock","feed mill","ice palace",
				"crop mastery billboard","animal mastery billboard","tree mastery billboard","baby playpen",
				"baby bunny hutch","recipe mastery billboard","volcano reef","aquarium","island paddock","island pasture",
				"island zoo","island livestock","island aviary","island pet run","island habitat","market stall","hawaiian treasure",
				"jade gnome garden","grove","beach resort","fishing hole","gas pump","hot spring","mountain palace",
				"jade habitat","jade playpen","jade pasture","jade aviary","jade paddock","jade aquarium","dino lab","bloom garden",
				"jade wildlife pen","jade pet run","jade zoo","gnome garden","floating waterfall","imperial shipyard",
				"swimming pond","unicorn island","master lu's study","harmony garden","sunshine doghouse","cupcake doghouse","dream house",
				"baby nursery","sturdy doghouse","sporty doghouse","floating castle","turtle pen","arborist center","farmhand center",
				"dragon lair","tomb treasure","animal workshop","haunted mansion","spooky paddock","scary aviary","wildlife cave",
				"holiday cow pasture","holiday pet run","holiday zoo","holiday livestock pen","monster lab","seedling nursery",
				"witchin' cauldron","tree of life","ferris wheel","bumper cars","big windmill","sally's seed shop",
				"nightmare zoo","deadly livestock pen","haunted pasture","horrendous pet run","bloom mastery billboard",
				"wishing fountain","bonsai garden","holiday square","holiday treasure","holiday aviary","joyful horse paddock",
				"magic wildlife cave","big barnyard","cheery house","extinct animal zoo","herb garden","penguin skate park",
				"crystal garden","enchantment shop","home mushroom","rivermist fortress","troll treasure","glen aviary","glen paddock",
				"glen cow pasture","glen livestock pen","glen petrun","glen wildlife cave","glen zoo","glen gnome garden","garden amphitheater",
				"tree of love","gnome vineyard","mystery crate","fountain geyser","hot air balloon","spring garden","orchard upgrade",
				"horse paddock","livestock pen","aviary","zoo","pet run","cow pasture","atlantis aviary","atlantis paddock",
				"atlantis pasture","atlantis livestock","atlantis petrun","atlantis wildlife","atlantis zoo","sunrise forest",
				"marine observatory","atlantis garden","atlantis garage","atlantis crafting workshop","atlantis gnome garden","atlantis orchard",
				"atlantis palace","atlantis treasure","horse hall","australian treasure","australian aviary","australian paddock",
				"australian pasture","australian livestock","australian petrun","australian wildlife","australian zoo","australian garage","australian crafting workshop",
				"australian gnome garden","australian orchard","daydream island","australian vineyard","botanical treasure","pegasus pen","astral observatory",
				"space aviary","space pasture","space paddock","space livestock","space pet run","space wildlife","space zoo","sunny float field","space ship","space guardian","slime pile",
				"candy aviary","candy pasture","candy paddock","candy livestock","candy pet run","candy wildlife","candy zoo","candy shop","candy factory","eversweet tree",
				"rock candy boulder","candy pile","marshmallow mound","gifting tree","astral observatory","dream deer woods","carnival fun house",
				"destiny bridge","enchanted rose bush","summer hillside","mystical aviary","mystical garage","mystical livestock","mystical orchard","mystical paddock",
				"mystical pasture","mystical petrun","mystical storage cellar","mystical wildlife","mystical zoo",


			].fixOrder();

		//material types
		//defined separately for easy options menu
		var standardMaterials=["clay brick","wooden board","harness","horseshoe","blue baby blanket","bottle","floral bracket",
				"bamboo rail","reed thatch","smoker","beeswax","shovel", 
				"gear","axle","rope","hammer","twine","concrete","hinge","screwdriver","tin sheet","vehicle part","pink baby blanket",
				"honeybee","wrench","clamps","pipe","shrub","grazing grass","fence post","painted wood","water pump","log","stone lantern",
				"steel beam","wire","hay bundle","saddle","bridle","red beam","screw","aluminum siding",
				"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer","snow axle","snow chain","snow gear","sack ",
				"scoop ","belt ","snow brick","snowflake","ice nail","snow globe","ice board","frozen beam","blue roller","white paste",
				"white paper","white overalls","black light","light plywood","green paper","green light","orange overalls","red paste","red roller","dark plywood",
				"wood stain","masking tape","scaffolding","brush","blanket","salt lick","sod piece","grass seed","water pail",
				"raw wood","feed bucket","wooden peg","baby carrot bunch","bunny bed","branch ball","hutch wire","bunny tunnel",
				"wood block","wood glue","clamp","sand paper","baby fish","ocean rock","stony coral","volcano monitor","buoy",
				"filter","small fishing net","large fishing net","small crowbar","large crowbar","awning","basket","price card",
				"garden fence","daffodil","potting soil","twig","tiny window","toadstool","mulch soil","turf roll","mini boulder",
				"swim suit","beach sandal","tropical cup","lure","lily pad","fishing pole","fuel pipe","level gauger","steel sheet",
				"bed rock","mineral infusion","steam","stone pillar","terra cotta","hanging incense","small axe","boat hook","wheelbarrow",
				"cement","fill dirt","metal post","flower tie","garden edging","trellis","floating rock","sparkle seed","baby mobile",
				"magic water","rigging","sail","wood plank","leaf net","water bucket","skimmer","parchment","dowel","book","yellow bamboo",
				"zen sand","stone pick","rainbow clover","heart of gold","enchanted blossom","chew toy","dog bed","tennis ball","trough",
				"queen bee","pacifier","drift wood","java fern","scientific scale","research paper","tree incubator","cloning solution",
				"massage stone","buffet tray","cloud brick","enchanted bamboo","hovering charm","dragon spell","chisel","talisman",
				"magic boulder","gold dust","stamp","ball of wool","mallet","stone","nail","cut bamboo","brick","cobweb","old fence",
				"deadwood","rusty gear","rusty post","thunder cloud","fertilizer stake","mulch","seedling tray","ladle","enchanted iron",
				"gummy tentacle","life essence","magic bubble","puffy cloud","gondola","carnival light","bearings","steering wheel",
				"wooden shaft","wooden cog","barnyard shingle","purple roller","windmill blade","wooden giraffe","wooden tiger","bumper",
				"wooden zebra","drying rack","flower apron","green tape","yellow paper","seatbelt","pepper packet","steering wheel",
				"drill bit","copper tube","bamboo","bonsai pedestal","bonsai pot","grafting tool","everything nice","grain of spice",
				"grain of sugar","lamp post","cobblestone","bench","lumberjack saw","power saw","mystery horse","mystery tree","mystery bloom",
				"meteorite","broken thermometer","food chain","clay pot","special soil","peat pellet","corporate sponsor","icicle ramp",
				"snow machine","water","crystal seed","crystal","mithril ore","star rock","warpstone","sun light rope","moon gem",
				"armillary sphere","fairy dust","magic maple","rain drop","vial of sunlight","magic mushroom","rain drops","garden bricks",
				"garden vines","garden steps","cupid's arrow","heart leaf","teddy bear","bronze horse shoe","gold moon","silver clover",
				"grape vine","stone bench","wine barrels","slop bucket","scissor","blue flower","geode","gold bar","green flower","leaf blower",
				"magma","pot","purple flower","rake","snips","stardust","sunburst cloud","sunrise seed","coral chisel","coral hammer",
				"ultramarine crystal","horeshoe crabshell shovel","bucket of gold paint","coral nugget","marble vase",
				"garden sketches","coral shears","coral crowbar","coral key","fancy hay","hi-tec salt","pretty saddle","mining pickaxe","mining key",
				"white sand","volcanic rock","blue sea water","wine barrel","fertile soil","grape food",
				"coffee thermos","star chart","telescope","golden wand","moon ray","phoenix feather","metal wire","oven rack","copper pipe",
				"enchanted mist","fairy magic","swimmies","night cap","polkadot pajamas","pool house plans","rainbow stardust",
				"summer sun","warm milk","gold paint","snip","crystal cradle","fizzy field","goo away","slime sucker","sunshine orb",
				"big red button","hyper speed thruster","portal window","celestial crystals","astro saplings","floaty spore","candy blaster","candy scoop","cream of bliss",
				"diamond candy pick","essence of frosting","marsh mortar","silver sugar shovel","sugar hammer","sweet aroma","balloons","tent canvas","warped glass","magic moss","radiant rays",
				"sparkling stream","crystal soil","seed bulbs","sprouting orb","comet tail","flip flops","kite tail","pig tail","sea water","ship in a bottle",
				"anvil of courage","bright metal","stone of sorcery","charmed clippers","anti-thorn charm","grass patch","nesting hay","rabbit burrow",





			].fixOrder();
				
		var fixTitles={/*no longer works*/};

		var otherConsumables=["watering can","puppy kibble","arborist","farmhand","white truffle","flower food",
				"black truffle","gold truffle","brown truffle","animal feed","fertilize all","sunshine dog treat",
				"cupcake dog treat","sturdy dog treat","sporty dog treat","mystery seedling","love potion","instagrow",
				"fuel","mystery gift","special delivery","unwither","capital one gift","turbo charger","double avatar",
				"gardener","mystery bulb","dog treat","coins","currency bundle","mystery game dart","pig chow","coconuts",
				"gopher treat","canned food","dry food","treats","unicorn wishes","bingo balls","time tonic","flower smoothies","bird seed","flower coins",
				//don't know if this will work but we'll see
				" xp "," zp "," sp "," cp "," fp ",
			].fixOrder();
		
		var specialMaterials=["gem",].fixOrder();
				
		var	specialEvents=[].fixOrder();

		var craftingMaterials=["apple wood basket","walnut basket","orange basket","lemon basket","milk jug","wool bundle",
				"cherry basket","maple syrup basket","manure bag","poplar wood basket","poplar wood basket"].fixOrder();
				
		//removed all quest items and linked them to sendhelp
		var questItems=[];

		//merge materials for searching
		var materials=[].concat(standardMaterials,otherConsumables,craftingMaterials,specialMaterials,specialEvents).fixOrder();
		
		//collectibles for menu
		var colBerries=["fruit bar","sorbet","preserves","dried berry","berry basket"];
		var colCitrus=["bubble gum","juicer","sherbet","fruit wedge","cirtus peel"];
		var colCows=["cow bell","milking bucket","milking stool","milk bottle","more cowbell"];
		var colFlowers=["corsage","hummingbird","dried petals","butterfly","pollen"];
		var colGrains=["grindstone","scythe","bran","chaff","flour"];
		var colSquash=["pumpkin seeds","stuffed pasta","decorative gourds","yerba mate","sitar"];

		//merge collectibles for searching
		var colTypes=[].concat(colBerries,colCitrus,colCows,colFlowers,colGrains,colSquash).fixOrder();

		//collectible set names for collecting random items
		var colGroups=["Berries","Citrus","Cows","Flowers","Grains","Squash"];

		//getting back to animals
		var calfTypes=[
				"mystical grove","candy cane","green patch","holiday wreath","lunar new year","pink patch","purple valentine","red brown",
				"western longhorn","yellow patch","mini longhorn","black shorthorn","milking shorthorn","gray jersey",
				"yellow referee","irish moiled","brown swiss","black angus","frankenstein bride","belgian blue","new year 2",
				"holiday lights","holiday top hat","snow blading","sport fan","lion dance","frosty fairy","cherry blossom",
				"fall fairy","welsh black","red heart","maple wreath","red poll","tea party","messy picnic","diving bell",
				"kelly green","new year","blue patch","cream pie","galician blond","ankole watusie","birthday white park",
				"white park","art deco","calfstruction worker","frog prince","southern belle","milky way","milking zebu",
				"milky way","ankole longhorn","bovine belle","real ca milk","texas longhorn","apple juice","red horned",
				"horse costume","bat hat","madam morgan","green apple","new wave","black holstein","in hoodie","in sweater",
				"rag doll","holiday dwarf","silver pega","christmas present","vintage deco","holiday light","pine cone",
				"snow battle","spotted holiday","hungry hungry","ugly sweater","balloon 2","jack frost","more 2 love",
				"crystals fairy","go lightly","green sweater","my fair lady","atlantean","spa cow calf",
				"giant bow","lace heart","mardi gras queen","moon mask","neon hearts","freezer pega","sour grapes","silver gold",
				"spurned fancy","sun mask","dark cloud","magic carpet","talk show","french mime",
				"autumn","belted","chocolate","chrome","devon","dexter","disco","english","fan","flower","kerry",
				"gelbvieh","groovy","hereford","highland","cornucopia","criollo","snowflake","santa","telemark","caroling",
				"robot","simmental","tuscan","valentine","green","vineyard","fall","pineywoods","blue","canadienne","sailor",
				"shorthorn","b0v1n3-11","jersey","holstein","referee","guernsey","ayrshire","milky","brown","red","randall",
				"nightmare","skeleton","pumpkin","tourist","fairy","dragonfly","charolais","plush","flannel","pilgrim",
				"holiday","mohawk","neapolitan","panda","pink","purple","rainbow","icicle","sweater","frozen","judge","baby",
				"american","crystal","romance","romeo","vosges","cocoa","smitten","rose","carnival","headdress","aloha","luau",
				"lowline","caddy","cupcake","shark","leprechaun","hibiscus","orchid","lava","longhorn","winged","spring",
				"cracker","couture","mother","aurochs","natural","bovonia","jester","african","lavender","cloud","carabao",
				"cotton","bride","flapper","beach","dairy","mongolian","yakow","dragon","yanbian","kimono","balloon","cool",
				"firefly","ghengis","mayan","cheese","jade","astronaut","spanish","swiss","gaur","aubrac","captain","casanova",
				"earth","daisy","adventure","javelin","perennial","delicate","aromatic","flowering","budding","hologram","bulb",
				"fire","scholar","venus","chili","moon","constellation","vechur","pirate","frightened","chrysanths","foal",
				"glow-in-the-dark","wizard","beefalo","cornucalfpia","golfcourse","hustlin'","dzo","werewolf","disappear",
				"dracalfla","monster","rhinestone","vampire","bulltrina","woodland","treat","gourd","sugar","aquarium",
				"colonial","quilted","camilla","holly","spooky","abomidable","coco","costume","truffle","cider","glass",
				"kitchen","angel","elf","cleopatra","fur","toy","fireworks","caroler","meow","dewdrop","bouquet","bubble","diamond","lineback",
				"glam","je'taime","sad","anti-valentine","cleaning","corsetted","storage","caravan","impostacow",
				"deepsea","gold coins","irish coffee","nanny","poseidon","sea","sponge","tea leaf reader","atlantis",
				"creamer","cubist","lucus","raingear","slime","waitress","meadows","gem","quartz","spring basket","milk maid","cow bunny",
				"designer suit","beehive","gem","global","picasso","pop","tiedye","slimed","stringed","boardshorts",
				"drought master heifer","australian freisian sahiwal","black milking shorthorn","fruit hat","gray pineywoods",
				"poofy skirt","adaptaur","boardshorts","boran","breakfast","deheiferized","evening","greyman","illawarra","milkmaid","raingear","safari",
				"aussie","flaming heart ice","rabbit ears","faulait cow","pinwheel","4th birthday","chameleon","crystal pega","cyclist","hiker",
				"maid of honor","rainbow spotted","secretary","sticker","street performer","droughtmaster","cow-fe au lait","loving",
				"cap n gown","space alien","coffee cake","cake hat","light stripe","behem","clerk","fwuzzy","kanga","mossy","woc",
				"string of lights","flag waving longhorn","over the moon","coffee berry","breaker bull","matador bull","pink fwuzzy",
				"strawberry milk","koi scaled","cobble up","chinese zodiac","aurora","candied","canoe","confetti","cowfetti","dogwood",
				"galaxy","knitted","purplecorn","sneaker","colorful","space","board shorts","buttercream bull","blueberry cream","blue frosted","candy striped",
				"chef","fruit punch candy","jelly bean bovine","lemon lime","polka desserty","soda jerk","sweet","high fashion","lavender lily","meteorologist",
				"pink cotton","prussian porcelain","raincoat and wellies","summer flower","yoga","rickety","ladybug hippo","acorn moose","bewitched","chinese silk",
				"pink frosted","seashell","skinny","glen","purple corn","furry purple","dragicalf","dwarf","orange chrysanthemum","ridge horn","water spirit",


			].fixOrder();
		
		var oxenTypes=["black ox","blue ox","grey oxen","red devon ox","baby ox"].fixOrder();
		
		var bullTypes=["pink patch bull","holstein bull","randall bull","irish moiled bull","flower bull","wagyu bull",
				"groom bull","black rose bull","holiday bull","peppery bull","wall street bull","dragon bull",
				"bull","elizabethan bull","atlantean bull","milk man bull","blown glass bull","bradford bull","bestman bull","rider bull",
				"bashel bull","blue mane bull","five horn bull","weightlifter bull","banner bull","luna bull",
			].fixOrder();
		
		//combines all calves to one array for easy searching
		var allCalves=[].concat(calfTypes,bullTypes,oxenTypes).fixOrder();
				
		var yakTypes=["gray baby","black baby","baby"].fixOrder();

		var foalTypes=["mystical grove","4 leaf clover pegacorn","50s mom unicorn","a winter rug","abaco barb horse","akhal-teke","alexandrite","alien unicorn","aloha","aloha mini","aloha pony",
		"aloha unicorn","american","american indian","american mini","american quarter","american unicorn","amethyst","amethyst unicorn","amethyst pegacorn","andalusian","andalusian pegacorn",
		"andravida","angel","angel pegacorn","anti-valentine","apollo","appaloosa","apple","arabian stallion","armored","armored mini","armored unicorn","aromatic","art deco",
		"ash","asian war","asian wild","aspiring","athena pegasus","atlantean","aurora pegacorn","aurora unicorn","australian brumby","australian draught","aussie",
		"australian stock","autumn","autumn ii","autumn stallion","auxois","azteca","baby mule","baby zebra","baby's breath unicorn","babysitter unicorn","ballerina unicorn","atlantean",
		"ballet instructor","balloon","art deco unicorn","balloon pony","balloon pegacorn","banana pegacorn","banker","banshee pegasus","barista horse","bashkir curly","bat","batter","batwing",
		"bay andalusian","beaded","beaded pony","bedazzled","bedazzled pegacorn","bedazzled unicorn","bettie pony","bewitched black","bird","black steed","black","black arabian",
		"black australian stock","black belgian","black cherry","black cherry mini","black cherry pegacorn","black cherry pony","black dartmoor","black gypsy","black light colt","spooky",
		"joyful","black mini","black mini unicorn","black n white","black paint","black pegacorn","black percheron","black pony","black ponytail","black quarter pony","black rose mini",
		"black rose unicorn","black shire","black snow fantasy","black stallion","black swan pegacorn","black tennessee","black unicorn","blackberry","blinking heart pegasus","blooming",
		"blue candy pegacorn","blue mane gypsy","blue moon colt","blue pony","blue ponytail","blue quarter","blue samurai","boer pony","boho chic unicorn","bombshell pegacorn","boot",
		"borealis","boss","bouquet unicorn","breton","bride","bride unicorn","broken hearted unicorn","brown","brown gypsy","brown pinto mini","brumby","brumby butler","brunhilde",
		"bubble gum","bubble helmet horse","bubble mini","bubble pony","bubble wings pegacorn","buckingham","buckskin","buckskin mini","buckskin stallion mini","budding","bulb","bumblebee",
		"bunny","buster keaton horse","buttefly mask unicorn","butterfly","butterfly pegacorn","butterfly pony","butterfly unicorn","butterflycorn","cabaret pegacorn","calf","camargue",
		"camargue colt","camarillo","camellia","camellia unicorn","campion pegacorn","can can pegacorn","canadian","candy cane","candy corn","candy corn pony","candy corn pegasus",
		"candy corn stallion","candy corn unicorn","candy pegacorn","candy pony","candycane unicorn","candycane zebra","candycorn unicorn","career mom","carnation","carnation mini",
		"carnation unicon","carnival","carnival mini","carnival pegasus","carnival unicorn","caroling","caveman","celestial","celestial gypsy","celtic","celtic unicorn","champion",
		"charro","chateau","checkered","cheer ewe up","cheerful scroogifoal","chef","cherry","cherry pegacorn","cherry unicorn","chestnut mini stallion","chevron pegacorn","chincoteague",
		"chocolate","chocolate bon bons pony","christmas morning","chrome","chrome pegasus","chrysanths","cider","cider unicorn","cinderella pegacorn","cinderella unicorn","circus",
		"clara pony","cleveland bay","cloud","cloud mini","cloud pegacorn","cloud unicorn","clown","clown unicorn","clydesdale","clydesdale stallion","cocoa","comtois","confetti",
		"connemara pony","coral","coral mini","coral pegasus","coral unicorn","corn pegacorn","cosmopolitan unicorn","cotton candy","cotton candycorn","cowardly lion unicorn","crayon",
		"cream draft","cream mini","cream stallion","cremello","crystal","crystal ball","crystal pegacorn","crystal unicorn","cupicorn","daffodil pony","dahlia unicorn","dairy",
		"dales pony","dandelion pegacorn","dapple gypsy","dapplegray","dark","dark cherrasus","dark cherrycorn","dark cloud unicorn","dark hearts pegasus","dartmoor pony","deepsea",
		"delicate","desert","dew","dew pegacorn","dewdrops pony","diamond heart pegacorn","diamond unicorn","director","disco","disco pony","diva pony","dole","dorothy unicorn","dosanko",
		"double rainbow","dracula pegacorn","dracula unicorn","draft","dragon","dragonfly","dragonfly pegacorn","dragonfly pony","dragonfly unicorn","dream","dream unicorn",
		"dreamgirl unicorn","dutch draft","dutch warmblood","earth","earth day horse","earth day pegacorn","earth hero unicorn","earth pattern","earth print zebra","edwardian",
		"egyptian pegacorn","elegant pegacorn","elizabeth pegacorn","emerald gem unicorn","emerald pegacorn","emerald star unicorn","enchanted armor pegasus","enchanting pegasus",
		"endurance","eriskay pony","eugene","evil fairy unicorn","exmoor pony","expedition","express","fairy","fairy mini","fairy pegacorn","fairy pink","fairy pony",
		"fairy unicorn","fairy zebra","fake pegacorn","falabella","fall fairy mini","fall lantern","fall pegafoal","fancy","fancy candle unicorn","fancy pants unicorn","farm u-corn",
		"farmer","fashion designer","festive elf","festive pegacorn","figurine","fire","fire pegasus","fire skeleton","fire wizard","firefly","firefly pegacorn","firefly pony","firefly mini",
		"firefly unicorn","firework unicorn","fireworks stallion colt","first mate pony","first wise","fishing","fjord","flaming hearts pegacorn","flaming ice pegacorn","flannel",
		"flapper mare","floral print pegacorn","florida cracker","flower","flower child pegacorn","flower dryad","flowercorn","flowered","flowering","flowery unicorn","pegasus aviator",
		"football","forest","forest ii","franken bride","franken stallion","frankenfoal","french mini","french percheron","french unicorn","frenchman unicorn","friendship","friendship pegasus",
		"friesian","friesian stallion","frog prince","frosted fairy mini","frosted fairy unicorn","frosty","frosty clydesdale","frosty fairy","frosty mini-foal","frostycorn",
		"frozen berry","frozen pegasus","galiceno","galloway pony","garden","gardener unicorn","gem","gem maiden pegacorn","gem pegacorn","gem unicorn","gemstone unicorn",
		"genie pegacorn","ghastly mini","ghost mini","ghost pegacorn","ghost pegasus","gift","gingerbread","giving","glacier","glamorous pegacorn","glass pegacorn","glass unicorn",
		"glitter","glittering","glitter pegacorn","glitter pegasus","glitter unicorn","glittercorn","glow skeleton","glow stick","goblicorn","goblin unicorn","gold angel horse",
		"gold rose unicorn","gold unicorn","golden bell pony","golden mane colt","golden merpegasus","golden mini","golden stallion mini","golden pegacorn","golden pegasus","golden pony",
		"golden stallion","golden unicorn","golden winged pony","goldilocks unicorn","goth","gothic unicorn","graffitti","grape unicorn","grass pony","grasslands pony",
		"gray australian pony","greaser","greaser pegacorn","green","green caroling","green dryad","green fairy mini","green saddle mini","grey","greyfell","groom","gypsy",
		"gypsy daisy","gypsy rainbow","gypsy stallion","hackney","hackney palomino pony","haflinger","hairband pegacorn","half n half","hanoverian","harrietta","harvest unicorn","harvest pony",
		"harvest","harvest mini","harvest pegacorn","haunted","hawaiian","hawaiian shirt","headdress","headdress pegacorn","headdress pegasus","headdress pony",
		"heart pattern mini","heart wings pegacorn","heartswirl unicorn","heidi","hematite","hibiscus","hibiscus mini horse","hibiscus unicorn","high fashion","high kick","hippie",
		"hipster unicorn","hokkaido","holiday","holiday clydesdale","holiday drum","holiday express","holiday parade","holiday pony","holiday tinsel unicorn","holiday wreath pony",
		"hollow fairy","holly mini","horn blower horse","host pegafoal","hot cocoa","ice","ice capades mini","ice capades unicorn","ice cream","ice diamond","ice pixie",
		"ice princess pegacorn","icelandic","icy","icy blue pegacorn","icy blue pegasus","icy blue pony","icy blue unicorn","icy fire pegacorn","icy pink","icy pink unicorn",
		"icy wizard pony","inner tube","inspector","international","irish cob","irish hunter","irish sport","irish step dance pegasus","ivy unicorn","jack unicorn","jade","jade mini",
		"jade war","java pony","jester unicorn","jet set","jewel encrusted horse","jingle bells","juliet pegacorn","jungle colt","jungle fowl pegacorn","jupiter","kabardin","kelpie pony",
		"kerry bog pony","kiang","kimono","king","king tut","knight","kulan","lace heart unicorn","lace pegacorn","lady gaga unicorn","lady macbeth","lantern","lapis pegacorn","lava",
		"lava pegacorn","lava pegasus","lava unicorn","lavender","lavender pegasus","leaf","leaf pattern pegacorn","leafy","leg warmers pony","leopard","leopard unicorn","leprechaun",
		"life of the party pegafoal","light mist pegacorn","light pegacorn","lightning","lightning pegacorn","lilac fairy","little wing pegasus","lokai","lorikeet unicorn","lotus",
		"lovely pearls unicorn","lovestruck pegacorn","loving pegacorn","lucky","lucky pony","lunar new year","luxe gem unicorn","macbeth","magical pegacorn","magician unicorn",
		"magician's assistant","magnolia","maple leaf","maple mini","maple pegacorn","maple pegasus","marble unicorn","mardi gras mini","maremmano","marigold pegasus","masquerade",
		"masquerade pegacorn","may fair","may flower mare","may forest pegacorn","mayan","mc escher pattern","merabian stallion","merens pony","mericorn","merunicorn","metal hair",
		"metropolitan pegacorn","mexican unicorn","milky way unicorn","mini andalusian","mini apaloosa","mini appaloosa","mini bat","mini blue gypsy","mini candy corn","mini candycane",
		"mini gold bell","mini party","mini pegacorn","mini pegasus","mini pirate","mini rose","mini zebra pegasus","miniature","minibow mini","mirage pegacorn","mixed gem unicorn",
		"modern","mohawk unicorn","mom's bouquet unicorn","mom's day pegacorn","monchino monarch","mongolian","mongolian pony","moon","moon pegasus","moon steed","moon unicorn","more 2 love unicorn",
		"morgan","morgan stallion","moss unicorn","mother unicorn","mother's day","movie star pegacorn","moyle","mummy pony","murgese","music","mustache","mustang","mysterious pegasus",
		"mystical","mystical hippocamp","natural","natural mini","neon","neon unicorn","new england pinto","new forest pony","new year","night","nightcap","nightmare mini",
		"nightmare mini pegasus","nightmare pegacorn","nightmare pegasus","nightmare pony","nightmare unicorn","nix pegafoal","nokota","noma pony","nomadic","noriker","nouveau unicorn",
		"nutcracker","nutcracker pegacorn","nutcracker unicorn","nypd","ocean pegacorn","ocean unicorn","office","open road","orange butterflycorn","orange juice","orchid mini",
		"orchid stallion stud","orchid unicorn","orlov trotter","orlov trotter ii","ornament","outback","outback unicorn","oz unicorn","packhorse","paint","paisley pegasus",
		"pajama pegacorn","palomino quarter","palouse","party","party game","party pegacorn","party tarpan","partycorn","pastel pegacorn","peace","pearl","pearl unicorn",
		"pegacorn of hearts","peganarwhal","pegarudolphifoal","pegasus","pegasus pink","pep squad pony","percheron","perennial","perky pegacorn","peruvian","phar lap","phoenix pegacorn",
		"phoenix unicorn","picado","picasso blue unicorn","pinata","pinata pony","pink aloha stallion stud","pink balloon pony","pink carnation pony","pink fairy stallion colt",
		"pink fairy unicorn","pink gypsy","pink lemonade unicorn","pink pegacorn","pink pony","pink ponytail","pink saddled","pink skeleton","pink stallion","pink unicorn",
		"pinocchio-corn","pinstripe pony","pinto","pinto mini","pinto pony","pirate","pirate pegacorn","pirate unicorn","plaid","plains pony","plum blossom","plush","poinsettia",
		"poinsettia unicorn","polka dot unicorn","pony","pony tail pony","poodle skirt pegacorn","poseidon pony","poseidon unicorn","postier brenton","pot o gold pegasus","pottok pony",
		"prankster","precious metals pegacorn","prehistoric fairy","prehistorical","princess","princess mini","princess pegacorn","princess pony","princess unicorn","prism",
		"prom queen pegacorn","przewalski mini horse","przwalski","pseudocorn","pumpkin","pumpkin mini","pumpkin pegacorn","pumpkin unicorn","punk love pegacorn","punk pegacorn",
		"pure heart","purple batwing","purple bedazzled","purple camellia","purple fairy","purple fairy mini","purple ghost","purple icicle pegasus","purple maiden pegacorn",
		"purple mini","purple mini pegacorn","purple mini unicorn","purple nightcorn","purple nightmare","purple pegacorn","purple pony","purple ponytail","purple stallion",
		"purple star unicorn","purple unicorn","quagga","quarter","queen pony","queen stepmother unicorn","rabbit ears unicorn","racer","racing stripes unicorn","racking","rainbow",
		"rainbow body","rainbow mask pegacorn","rainbow mini","rainbow pegacorn","rainbow pegapony","rainbow pegasus","rainbow pony","rainbow prism","rainbow stallion","rainbow unicorn",
		"rainbow wing pegacorn","raindrop","rainforest","raingear","rapunzel pony","rapunzel unicorn","red","red carnation pegasus","red hot valentine","red pinto",
		"red riding hood unicorn","red rose","red sun colt","red wine pegacorn","reef unicorn","reindeer","reitpony","ribbon mane pegasus","ribboncorn","river","robot",
		"robot pegacorn","robot unicorn","rocking","rocky mountain","roman","romance","romance mini","romance unicorn","romeo unicorn","rope light","rose","rose crystal unicorn",
		"rose pegacorn","rose pegasus","rose pony","rose quartz heart unicorn","rose unicorn","rose wreath unicorn","roxey pegacorn","royal","royal beauty","royal egg pegacorn",
		"royal pegacorn","royal pony","royal steed","rubber pony","ruby","ruby blaze unicorn","rudolph","rudolphicorn","saddle","saddlebred","safari","samurai","samurai warrior",
		"sancai ii","santa","santa unicorn","sapphire","sapphire hippocamp","sapphire sparkle unicorn","sapphire unicorn","sapphire zebra","savannah pony","sea colt","sea hippocamp",
		"sea pegasus","sea shell unicorn","sea star","sea star pony","seahorse stallion","seashell","seaweed","second wise","settling","shamrock","shamrock mini","shamrock pegacorn",
		"shamrock pegasus","shamrock pony","shamrock unicorn","shetland pony","shimmering","shire","shopping unicorn","silver","silver batacorn","silver bell","silver unicorn",
		"single unicorn","skeleton","skeleton mini","skeleton unicorn","sky","skyline unicorn","sleeping bag unicorn","sleigh ride","small irish cob","smitten","smitten pony","sneaker",
		"snorkel mini","snorkeling pony","snow koala unifoal","snow pegacorn","snow pony","snow stallion","snow white","snowflake","snowflake mini","snowflake pegacorn",
		"snowflake pegasus","snowflake pony","snowflake unicorn","snowy sunset pegafoal","sock hop mare","solacorn","sour grapes pegacorn","space","spanish mustang","sparkle",
		"sparkling bubbly","sparkly stars unicorn","spectator","spectral","spectral pegasus","spider","spotted","spotted appaloosa","spotted draft","spotted saddle","spring","spring bonnet",
		"spring bouquet pegacorn","spring egg","spring mini","spring mist pegacorn","spring pegacorn","spring pegasus","spring unicorn","springtime mare","stallion mini","standardbred",
		"star","star pony","star unicorn","star anise","star pegasus","stargazer","starlet unicorn","starlight, unicorn bright","starry night unicorn","starry pegasus","stay at home pegafoal","steam unicorn",
		"steam","steam pegacorn","stone","stone spirit unicorn","storm pegasus","stormy pegacorn","storybook unicorn","straw man unicorn","stringed","stud","studded leather",
		"student","suffolk","sugar","sugar pegafoal","sugar plum fairy","summer stallion","summer","summer night","sun","sun pegasus","sun unicorn","sundae","sunflower","super mom pegacorn",
		"supermom pegacorn","swan lake pegacorn","swashbuckler unicorn","sweater pegacorn","swiss warmblood","syrah pegacorn","t.p. pegacorn","tapestry","tea leaf pegacorn","tea unicorn",
		"teddy pegacorn","tee pee","teen angel pegacorn","tennessee","terracotta","the king pegacorn","third wise","thoroughbred","tiara unicorn","tie dye","tie dye unicorn",
		"tiger stripe mini","tin","tinman unicorn","tinsel","tinsel mini","tinsel pony","toadstool unicorn","topiary","toy","trakehner","traveling pegafoal","tropical","trotter stallion",
		"turkey","tuxedo ball","ugly sweater","ugly sweater brumby","ugly sweater pegafoal","unicornucopia","unigon","usher","valentine","valentine pony","valentine card","valentine mini",
		"valentine pegafoal","valentine unicorn","vamp","vampire","vanner","vaudeville","v-hoody pegasus","victorian","villain unicorn","vineyard steed","vineyard mini","vintage",
		"vintner unicorn","violets mini","waler","walkaloosa","walking pony","water","water ii","web","web unicorn","wedding pegasus","weeping mini","weeping unicorn","welsh","wereicorn",
		"white","white andalusian","white arabian","white australian pony","white belgian","white lily","white mini unicorn","white mustang","white pegasus","white rose wreath unicorn",
		"white shire","white snow fantasy","white thoroughbred","white unicorn","wild","wild burro","wild west","wind pegacorn","wind up","winged unicorn","winter","winter elf",
		"winter fairycorn","winter fun pegafoal","winter hollow","winter magic","winter pegacorn","wisteria unicorn","wizard","wizard pegasus","wolf grandma unicorn","wrapped","wreath",
		"yakut pony","yellow butterfly","yellow rose","yellow unicorn","yerba mate","yonaguni","zebra costume","zebra pegacorn","zebra unicorn","zebroid","zephyr","zesty","zeus pegacorn",
		"zig zag zebra","zombie","zorse","dole yellow","wicked witch unicorn","zebra with earth print","mom's favorite","4th birthday bedazzled","4th birthday mare","4th birthday party",
		"bridesmaid mare","bubblegum","buttons n beads","monterey mare","mosaic","oklahoma","painter splatter","rainbow gem","spring braids","troop leader","water bubbles",
		"4th birthday pegacorn","bee keeper pegacorn","calla lily pegacorn","cheerleading pegacorn","flowerchild pegacorn","crochet pegacorn","detective pegacorn","nota pegacorn",
		"rainbow fairy pegacorn","scaley pegacorn","soap suds pegacorn","spring dress pegacorn","spring meadow pegacorn","suit necktie pegacorn","white were pegacorn","racing pegasus",
		"glee club pony","shag","prom king stallion","stylish stallion","4th birthday unicorn","blue crystal unicorn","mummycorn unicorn","racing unicorn","rainbow ribbon unicorn",
		"safaricorn","scarbooking unicorn","spring fashion unicorn","spring groom unicorn","rainbow striped zebra","oz unicorn teen","pegasus pen",
		"cap n gown unicorn","mint mocha mare","chinese dragon pegacorn","daddy's mini pegacorn","milky wave pegacorn","curled horn pegasus","galatic gallop unicorn",
		"frille gem unicorn","tricorn 3000","space alien","half moon","air one","mare force one","bacchus pegacorn","biscotti pegacorn","confetti pegacorn",
		"flannel pegacorn","furry pegacorn","giftwrap pegacorn","starstead pegacorn","birthday pegasus","positronic pegasus","starglass pegasus","mezzo pony",
		"wooly space","star sparkle","star trail","candlewick unicorn","fondant unicorn","friendship unicorn","goht unicorn","invisible unicorn","rocket unicorn",
		"zorme zorse","americorn","blackhole","firework","hooves","mantle","novaluck","oz","splatter paint","tissue paper flower pegacorn",
		"milky way mare","sweet bouquet pegacorn","rainbow butterfly pegacorn","rainbow chrome pegacorn","rose jewel pegacorn","scout leader pegacorn",
		"cassiopeia queen pegacorn","stars stripes pegacorn","rainbow swirl pegacorn","spanish tile pegacorn","sugar violet pegacorn","strawberry swirl pegapony",
		"gently glide pegasus","aerial repeater pegasus","pegacorn of plenty","sugar pattern pony","shooting star stallion","rainbow body unicorn",
		"cheshire cat unicorn","lucky cherry unicorn","glowing flower unicorn","leisure girl unicorn","sporty girl unicorn","march hare unicorn",
		"summer harvest unicorn","star rider unicorn","gold ruby unicorn","lollipop swirls unicorn","solar system unicorn","carved candle","super costume",
		"majorette mare","scottish","bioluminescent pegacorn","flowerstead pegacorn","glowing pegacorn","patriot pegacorn","patriotic pegacorn",
		"peacock pegacorn","perseus pegacorn","quasar pegacorn","spanish pegacorn","dreamer pegasus","krabby pegasus","moonberry pegasus","rainbow pegasus",
		"seashell pegasus","sparkler pegasus","thinker pegasus","wildind pegasus","precious pony","wfp stallion","cookie thief","alice unicorn","bookseller unicorn",
		"caterpillar unicorn","fireworks unicorn","guardian unicorn","handy unicorn","luau unicorn","pulsar unicorn","serve unicorn","sparkler unicorn","sparklers unicorn",
		"wonderland unicorn","wonderland unicorn","rainbow zebra","watermelon zebra","chinese zodiac","astronomist","aurora","backpacker","playground",
		"plumicorn","ribbon","saturn","sheep","yodelcorn","blondie","cinnamon sunburst","eclaire mare","frosted filly","gumball","heartshape","lemon chiffon",
		"rocky road mustang","peppermint pony","quilted pattern","red velvet mare","red velvet","snazzberry","watermelon candy","whipped cream",
		"blue frosted pegacorn","chocolatier pegacorn","creamsicle pegacorn","egyptian goddess pegacorn","needlepoint pegacorn","pink frosted pegacorn",
		"pixie stick pegacorn","popsicle pegacorn","porcelain pegacorn","soda jerk pegacorn","sugar pegasus","sweet pegasus","tutti frutti flyer",
		"watermelon candy pegasus","pink porcelain pony","rocky candy pony","canningcorn","chocolate strawberry unicorn","dancing egyptian unicorn",
		"jellycorn","pastry chef unicorn","rainbow licorice unicorn","sugarhorn","sweet","tiger lily mule","blue bell","buttercup","carrot basket","glamorous",
		"flower girl pony","nerdy","pink blanket","playground ii","porcelain flower","sea wave","western saddle","white paradise pegacorn","bobby pegacorn",
		"cool mint pegacorn","egyptian pegafoal","farmer pegacorn","gardener pegacorn","honeysuckle pegacorn","mother fairy pegacorn","pink porcelain pegacorn",
		"pink sparkle pegacorn","rainbow candy pegacorn","rocking pegacorn","sun mane","thunder mane","water fun pegacorn","wisteria pegacorn","patissier pegasus",
		"pink petalwing pegasus","mini carnival","egypt chariot pony","poprock pony","strongman stallion","carousel unicorn","diamond studded unicorn",
		"fall leaf patterns unicorn","fall wreath unicorn","super costume unicorn ii","sweet dreams unicorn","totally radicorn","arabian princess","caro-rose","cinderella",
		"marie mini-mare","nightshade mini-horse","silk flower pattern","vacationing","alchemy pegacorn","candyheart pegacorn","peacock pegafoal","henna pegacorn",
		"pure imagination pegacorn","sand pegacorn","wizard pegacorn","cavalier unicorn","fairy dust unicorn","hard candicorn","eastern flower unicorn","puppet unicorn",
		"sari silk unicorn","caro-mini pegacorn","fluffy pegacorn","fuzzy pegacorn","romantic pegacorn","southern magnolia pegacorn",
		"mint julep unicorn","spotted unicorn","dwarf donkey","aquamarine mare","descending dusk","flaxen hair","daisy mini horse","mystical gold","night glow",
		"night mare","picnic","summer fiesta","violet wave","amber bright pegacorn","arcane light pegacorn","aura pegacorn","black buttefly pegacorn",
		"dark moth pegacorn","dark scroll pegacorn","evening pegacorn","fairy wisp pegacorn","jekyll n hyde pegacorn","light scroll pegacorn","mystic pegacorn",
		"narcissus pegasus","obsidian pegacorn","red ruby pegacorn","sunrise pegacorn","twilight pegacorn","violet armored pegacorn","phantom pegasus",
		"red smoke colt","skeleton colt","spirit colt","ultraviolet colt","blazing unicorn","cursed unicorn","dark unicorn","dark brio unicorn","elder unicorn",
		"enchanted shadow unicorn","fairy headdress unicorn","gilded unicorn","golden sparks unicorn","light brio unicorn","moon-light unicorn",
		"purple blaze unicorn","sun-spot unicorn","white-gold unicorn","underworld zebra",

				
			].fixOrder();
		
		var assTypes=["mini donkey","toy soldier donkey","african donkey","single donkey","spring donkey","mistle toe donkey",
				"trick or treat donkey","mule","summer donkey","vampire donkey","fairy donkey","donkey","fake cupid donkey","farmer's market donkey","pink zonkey","denim donkey",
				



			].fixOrder();
		
		//combines all foals to one array for easy searching
		var allFoals=[].concat(foalTypes,assTypes).fixOrder();

		var horseTypes=["black","brown","gray","grey","flowered","cream draft","red pinto","red ","sea pegasus","mysterious pegasus","enchanting pegasus",
		"glamorous pegacorn","elegant pegacorn","victorian","goth","australian draught","stylish stallion","denim donkey","safaricorn","mummycorn","space alien",
		"frosted filly",


			].fixOrder();

		var duckTypes=["belted","party","ugly","red-billed","red","brown","yellow","australian wood","maitre d'","suitor",


			].fixOrder();

		var ducklingTypes=["ugly","red","brown","yellow","blue"].fixOrder();

		var pigTypes=["white pig","snowflake pig","space alien","neopolitan pig",].fixOrder();

		var sheepTypes=["miner","shoppin' sheep","dwarf blue","elf",

			].fixOrder();

		var cowTypes=["adaptaur","evening","cow with poofy skirt","rider bull","cyclist","hiker","irish moiled","brown","chocolate","dexter","disco","fan","groovy",
		"longhorn","pink patch","pink","purple valentine","purple","yellow patch","green patch","milking shorthorn","pumpkin",
				"flannel","caroling","smitten","red","mini longhorn","ghengis","real ca milk","golfcourse","treat",
				"trick","caroling","jack frost","cleaning","storage","red","telemark","space alien","candy striped",
			].fixOrder();
				
		var eggTypes=["white","brown","black","cornish","golden","rhode island red","scots grey","rainbow","candycane",
				"english","party","marans","faverolles","araucana","buttercup","candycorn","apple","fall fairy","new year",
				"tourist","snowflake","crystal","cupid","love","carnival","headress","cochin","aloha","green silkie","spa",
				"hawaiian","shamrock","ali-h3n-12","lava","sabertooth","strawberry fairy","bonnet","japanese bantam","wizard",
				"golden polish","mother","bresse","mystery cluck rogers","junglefowl","mandolin","jazz","hiking","zen","beach",
				"rocket","chabo","present","fortune cookie","american","orange","fairy tale","barnevelder","groundskeeper",
				"cluck rogers","gymnastics","jet pack","captain","masquerade","paradise","meditating","flowering","budding",
				"bulb","aromatic","delicate","perennial","adventure","sumo","environmentalist","student","chili","ceres",
				"chicken turkey","haunted","dragon","giant prairie","chicken chicken","dark","chickenpire","hammer","skeleton",
				"werechicken","mad hatter","fire","ice","tambourine","coruroy","farmer","giant jersey","egg in jeans","winter",
				"strawberry","chili light","prom chick","spectator","red sweater","floating","long john","partying",
				"checkerboard","invisible","jester","lovestruck","dark cloud","a l'orange","aphrodite","deepsea","tea pouch",
				"bunny hoodie","rabbit ears","rubber chicken","spring","with a giant backpack",
				"marionette","marshmallow","rubber suit","stooge","umbrella","australian game","high fashion","mother hen",
				"charleston","picnic","4th birthday","gym class","radioactive","scribe","lorb","4th birthday","space alien","cosmic","crusader","super",
				"slimed","sugar cookie","rainbow fantasy","coconut puff","horus","porcelain","denim overalls","fire breather","handbag",
				"kitchen warrior","pink fluffy","sugar rose","summer sunset","aerialist","chef","gobstopper","petite","pilot","turkish",
				"tourist","charming","gummy","autumn magic","berry","black belly","blue wizard","bright swirl","chic tail","flash bright","golden feather",
				"hearth and home","midnight","pale moon","phoenix","prince charming","sky blue","sorceress",



			].fixOrder();
				
		var eggTypes2=["white bunny","yellow bunny","pink bunny","purple bunny","blue bunny","gold bunny"];
				
		//two word or common animal catch all texts
		var chickenTypes=["high fashion","picnic","snow","space alien","coconut puff chicken",].fixOrder();
		
		var dragonTypes=["arajir dragon","danomire dragon","etterius dragon","furilich dragon","ice cream dragon","lemon dragon","rose dragon","sugar dragon","tselius dragon",
		"droopy dragon","peppy dragon",].fixOrder();

		var otherAnimals=["seagull","floaty elephant","bandicoot","arctic hare","australian cattle dog","baby bourbon turkey","festive cat","white wolverine","turtle",
		"beanie fox terrier","big blue tang fish","black and grey ocelot","black rabbit","blue dot elephant","brachiosaurus","white holiday reindeer",
		"bubbly pig","bulk order ostrich","carnotaurus","chinchilla","clumsy reindeer","elephant",
		"coelophysis","crown of thorns starfish","domestic shorthair","dutch rabbit","elf penguin",
		"english spot hare","fancy goose","farm goose","fedora fox terrier","gallimimus",
		"halloween tutu hippo","harbor seal","holiday st. bernard","large parrot","lesser flamingo","llama","merle corgi","messenger bag turtle","mistletoe penguin","navy fuschia spotted turtle",
		"peacoat penguin","penguin","poncho llama","porcupine","puffy jacket puffin","raccoon","red giraffe","red grape rabbit","reindeer","ringtail",
		"river float pug","safari bear","shopper tiger","single order ostrich","skinny jeans ostrich","sly rabbit","snow leopard","spa bear",
		"spotted lop hare","striped possum","tiki mask turtle","treasure seagull","turkey","ugly sweater bear",
		"use it seal","walleye","wfh turtle","white goose","white llama","white rabbit","white turkey","white-tailed buck","winter fox",
		"winter polar bear","zebra giraffe","sea gull with camera","mountain climber cat","dog pilot","tropical cat",
		"bently beagle","tribute terrier","semiformal giraffe","tuxedo giraffe",
		"big bow bear","prom bear","mod doberman","sock hop poodle","farm goose","porcupine","baby elephant","white daisy bunny","snow leopard","arctic hare","australian cattle dog","baby bourbon turkey","big blue tang fish","black and grey ocelot","black rabbit","blue dot elephant","bootcut ostrich","brachiosaurus",
	"tribute terrier","semiformal giraffe","tuxedo giraffe","big bow bear","prom bear","mod doberman","sock hop poodle","painter rex","ballerina rex","beach koala","grizzlyjack",
	"space alien bunny","space alien wolf","trolaplyga bigcat","coco kitty","circus peanut elephant","pixie stick porcupine"].fixOrder();
				
		//baby animals that aren't calves or foals
		var babyAnimals=["baby goat","baby groundhog","red wolf","coyote pup","wolf cub","brown kitten","baby alpaca","white wolf",
				"baby penguin","white kodiak cub","baby turkey","baby zebra","andean bear cub","baby valentine giraffe","black bear cub",
				"clever cub","lil pink peacock","romeo cub","trick or treat bear","jaguar cub","baby tiger","siberian tiger cub",
				"nutcracker ballerina cub","panther cub","white lion cub","baby bobcat","baby monkey","flower mane cub","baby seal",
				"spring puppy","bear cub","brown baby elephant","baby elephant","brown kitten","deer fawn","red fox kit","gray fox kit",
				"lion cub","baby dragon","kodiak cub","baby white penguin","baby winter seal","baby llama","baby carnival elephant",
				"fall fawn","baby giraffe","candy kid","white kitten","sterling rose cub","heart print leopard cub","tangled ribbon kitten",
				"tangled beads kitty","baby porcupine","cuddling kittens","rainy lion cub","snowy lion cub","cuddling puppies","atlantean panther cub",
				"baby koala","badger cub","corgi puppy","flowery puppy","flying fox","gryphon hatchling","hedgehoglet","puma cub","lynx cub","mallard duckling","otter pup",
				"springly puppy","potbelly piglet","irish fox cub","baby sea turtle","english lop kit","dragon whelp","mitten kitten","kitten with mittens","fennec kit",
				"blue bell platypus","foozbal","wokwok","moonbear cub","frosting baby monkey","gummy octi","ice cream eater","lollipop elephant",
				"marshmallow bunny","pink cotton piglet","pouch packed joey","rock candy turtle","sweet tea pomeranian","cookie jar cub","aurora fawn","cloud fawn",
				"dusk fawn","fire fawn","firefly fawn","king fawn","moon fawn","nature fawn","princess fawn","queen fawn","rain fawn","shell fawn","snowflake fawn",
				"sunrise fawn","water fawn","orchid baby alpaca","dandy lion cub","monarch kitten","porcelain kitten","labrador puppy","lavender retriever puppy",
				"baby summer dragon","baby pink elephant","baby nile crocodile","aspiring hedgehoglet","baby african penguin","petalwing piglet","dainty dream fawn",
				"amber dream fawn","astral magic fawn","daisy chain magic fawn","dark ridge fawn","light ridge fawn","moon speckled fawn","peacock fawn",
				"saddled fawn","shadow dance fawn","baby ember","dark griffon fledgling","dark-mane dragon whelp","light griffon fledgling","light-mane dragon whelp",
				"luna pup",


].fixOrder();
				
		var avatar=["spontaneous adventurer","casual traveler","pampered princess","practical lounger","sensible sunbather",
				"outdoor explorer","wild spirit","teddy bear","koala","cat","hamster","dog","monkey","lion","tiger"].fixOrder();
				
		var dnaTypes=["red","blue","green","orange","yellow","purple"];
		var gemTypes=["purple amethyst","white diamond","green emerald","red ruby","blue sapphire"];
		var scaleTypes=["blue","green","orange","purple","red","yellow"];
		var serumTypes=["blue","green","orange","pink","purple","yellow"];
		var cuttingTypes=["green","red","pink","purple","yellow"];
		var spiritTypes=["blue","green","pink","purple","yellow"];
		var fossilTypes=["amber","black","gray","red","wood"];
		var pixieTypes=["blue","green","orange","white","yellow"];
		var fishscaleTypes=["red","yellow","orange","purple","green"];
		var horseshoeTypes=["silver","black","blue","red","gold"];
		var cloudTypes=["wispy","sunset","moon","stormy","rainbow"];
		var wildflowerTypes=["pink","blue","yellow","purple","orange"];
	
		var bulbTypes=["anemone","damask rose","fire sunflower","fire weed","orange tulip","pink boat orchid","purple carnation",
				"purple petunia","soho oriental poppy","tiger lily","white daisy","white lily","yellow pansy","pink hollyhock",
				"flame azalea","fairy flower","golden rose","pyramidial orchid","kerry lily","groundsel","pink gladiolas",
				"purple aster","cardinal flower","hydrangea","purple primrose","desert rose","royal bluebell","golden wattle",
				"pink daisies","yellow gerbera","red rose","orange zinnia","yellow buttercup","pink tulip","bird of paradise",
				"sprite flower","wild indigo","lavender","pink carnation","lady slipper","impala lily","leopard orchid",
				"african daisies","red clover","golden lotus","magical flower","bluets","evening primrose","mountain laurel",
				"rose quartz bloom","chinese bellflower","helenium","fall corcus","piranha bloom","black orchid","mandrake",
				"pumpkin flower","spider flower","witchhazel","wolfsbane","black hollyhock bloom","hemlock bloom","black rose",
				"orange chrysanths","bat face cuphea","marigold","pata de leon","skull cap","candy corn","cosmos","baby's breath",
				"blackberry lily","forget me not","sweet pea","narcissus","orange mums","purple-ranunculus","silver poinsettia bloom",
				"amaryllis","anemone ii","aster","black-eyed susan vine","casa blanca lily","poinsettia","cow tulip","waratah",
			].fixOrder();
				
		//contains the main list of "other" things you can collect
		//decorations by event
		var decorApples=[];
		
		var decorHalloween=[];
		
		var decorThanksgiving=[];
		
		var decorChristmas=[].fixOrder();
		
		var decorHolidayHearth=[];
		
		var decorMagicSnowman=[];
		
		var decorWinterWonderland=["candy cane decoration","single candle","ice cube","lighted fence","holiday planter",
				"giant snowflake 1","reindeer balloon","snowy track i","snowy track ii","snowy track iii","snowy track iv",
				"snowy track v","snowy forest","winter cafe","santa's sleigh","gift mountain","winter cottage","ice castle",
				"toy factory"];
		
		var decorValentines=[].fixOrder();
				
		var decorStPatty=[];
				
		var decorEaster=[];
				
		var decorShovels=["mole","crystal rock","cave gnome","antique tractor"];
		
		var decorSchoolSupplies=[];
		
		var decorTuscanWedding=[];
		
		var decorWishingWell=["nightingale","leprechaun gnome","irish cottage","double-deck tractor"];
		
		var decorFlowers=[];
		
		var decorSandCastle=[];
		
		var decorFV2Birthday=[];
		
		var decorGnomes=["disco prom gnome","punk prom gnome",].fixOrder();
		
		
		var decorOther=["garden bench cats","deck chair cats","city prom table","country prom table",].fixOrder();
		
				
		// merge decorations for searching
		var decorTypes=[].concat(decorHalloween,decorThanksgiving,decorChristmas,decorValentines,decorStPatty,
				decorEaster,decorWinterWonderland,decorShovels,decorSchoolSupplies,decorTuscanWedding,
				decorWishingWell,decorFlowers,decorSandCastle,decorFV2Birthday,decorApples,decorOther,
				decorHolidayHearth,decorMagicSnowman,decorGnomes).fixOrder();

		//this animal catchall is for words that already appear earlier, and so must be searched AFTER horses, foals, materials or decorations
		var animalCatchalls=["chicken","turkey","llama","cow","horse","sheep","pig",
				"rabbit","boar","duckling","duck","foal","calf","ram","raccoon","porcupine","goat"].fixOrder();

		//catchall for other items not listed as materials
		var otherWords=["lucky penn","raffle ticket"];

		//dynamically build accept texts from the arrays above
		var t1 = createAccTextFromArray([].concat(otherWords,decorTypes,materials),"","");
		var t2 = createAccTextFromArray(allCalves,"adopt_calf"," Calf");
		var t3 = createAccTextFromArray(allFoals,"adopt_foal"," Foal");
		var t31 = createAccTextFromArray(yakTypes,"adopt_yak"," Yak");
		var t4 = createAccTextFromArray(horseTypes,"adopt_horse"," Horse");
		var t5 = createAccTextFromArray(bushelTypes,"bushel_"," Bushel");
		var t6 = createAccTextFromArray(flowerTypes,"perfect_"," Bunch");
		var t7 = createAccTextFromArray(treeTypes,"tree_"," Tree");
		var t8 = createAccTextFromArray(treeTypes2,"tree_giant"," Tree (Giant)");
		var t34 = createAccTextFromArray(treeTypes3,"tree_bonsai"," Tree (Bonsai)");
	//	var t47 = createAccTextFromArray(treeTypes4,"tree_"," Tree (Level 1)");
		var	t9 = createAccTextFromArray(craftShop,"join"," Team");
	//	var t9 = createAccTextFromArray(craftTypes,"sample_"," Sample");
		var t10 = createAccTextFromArray(colTypes,"col_"," Collectible");
		var t11 = createAccTextFromArray(colGroups,"colX_"," Collectible");
		var t12 = createAccTextFromArray(duckTypes,"adopt_duck"," Duck");
		var t13 = createAccTextFromArray(ducklingTypes,"adopt_duckling"," Duckling");
		var t14 = createAccTextFromArray(pigTypes,"adopt_pig"," Pig");
		var t15 = createAccTextFromArray(sheepTypes,"adopt_sheep"," Sheep");
		var t30 = createAccTextFromArray(sheepTypes,"adopt_ewe"," Ewe");
		var t16 = createAccTextFromArray(cowTypes,"adopt_cow"," Cow");
		var t17 = createAccTextFromArray(eggTypes,"egg_"," Mystery Egg");
		var t18 = createAccTextFromArray([].concat(otherAnimals,babyAnimals,animalCatchalls),"adopt_","");
		var t19 = createAccTextFromArray(buildings,"mat_"," Parts");
		var t20 = createAccTextFromArray(questItems,"send","");
		var t32 = createAccTextFromArray(eggTypes2,"egg_"," Egg");
		var t44 = createAccTextFromArray(chickenTypes,"adopt_chicken"," Chicken");
		var t45 = createAccTextFromArray(dragonTypes,"adopt_dragon"," Dragon");
		var t33 = createAccTextFromArray(avatar, "costume_"," Costume");
		var t35 = createAccTextFromArray(dnaTypes,"dna_"," DNA Strand");
		var t37 = createAccTextFromArray(gemTypes,"gem_"," Gem");
		var t36 = createAccTextFromArray(bulbTypes,"bulb_"," Bulb");
		var t38 = createAccTextFromArray(scaleTypes,"scale_"," Dragon Scale");
		var t39 = createAccTextFromArray(serumTypes,"serum_"," Monster Serum");
		var t40 = createAccTextFromArray(cuttingTypes,"cutting_"," Bonsai Cutting");
		var t41 = createAccTextFromArray(spiritTypes,"spirit_"," Animal Spirit");
		var t42 = createAccTextFromArray(fossilTypes,"fossil_"," Fossil");
		var t43 = createAccTextFromArray(pixieTypes,"pixie_"," Pixie Dust");
		var t46 = createAccTextFromArray(fishscaleTypes,"fishscale_"," Fish Scales");
		var t48	= createAccTextFromArray(horseshoeTypes,"horseshoe_"," Horseshoes");
		var t49	= createAccTextFromArray(cloudTypes,"cloud_"," Cloud");
		var t50	= createAccTextFromArray(wildflowerTypes,"wildflower_"," Wildflower");
		//use t21 below to create your own accTexts for non-arrayed items or for other special needs
		var t21 = {
			sendmat:"Material",sendbushel:"Bushel",order:"Unknown Bushel Order",sendhelp:"Help",bushel_random:"Random Bushel",
			grabbag:"Grab Bag","100xp":"XP",adopt_lambewe:"Lamb (Ewe)",adopt_lambram:"Lamb (Ram)",tree_ornament2:"Ornament Tree II",
			wanderingstallion:"Wandering Stallion",adopt_lamb:"Lamb (Unknown Sex)",adopt_piglet:"Piglet", tree:"Unknown Tree",
			luckypenn:"Lucky Penny",bushel:"Unknown Bushel",perfectbunch:"Perfect Bunch",pollinated:"Unknown Seeds",sendbasket:"Basket",
			adopt_ramfloweredgreen:"Flowered Green Ram",sample:"Unknown Level Sample",sample1:"Sample Level 1-20",sample2:"Sample Level 21-40",
			sample3:"Sample Level 41-80",sample4:"Sample Level 81-100",sample5:"Sample Level 100+", schoolsupp:"School Supply",
			wildlife_rare:"Wildlife Baby (Rare)",wildlife_common:"Wildlife Baby (Common)",petrun_common:"Mystery Baby (Common)",
			petrun_rare:"Mystery Baby (Rare)",zoo_common:"Zoo Baby (Common)",zoo_rare:"Zoo Baby (Rare)",aviary_rare:"Egg (Rare)",
			aviary_common:"Egg (Common)",livestock_common:"Mystery Baby (Common)",livestock_rare:"Mystery Baby (Rare)",
			sendwishlist:"Wishlist",sendfeed:"Animal Feed",sendbottle:"Bottle",arctic_common:"Winter Baby (Common)",
			arctic_rare:"Winter Baby (Rare)",unknown_baby:"Unknown Baby",adopt_holidaystbernard:"Holiday St. Bernard",
			sea_common:"Water Baby (Common)",sea_rare:"Water Baby (Rare)",jade_common:"Jade Baby (Common)",jade_rare:"Jade Baby (Rare)",
			ocean_common:"Jade Water Baby (Common)",ocean_rare:"Jade Water Baby (Rare)",join:"Unknown Crafting Team",tarot_past:"Tarot Card (Past)",
			tarot_present:"Tarot Card (Present)",tarot_future:"Tarot Card (Future)",tarotcard:"Tarot Card",bulb_unknown:"Unknown Bloom",
		};

		var t22 = createAccTextFromArray(seedTypes,"seeds_"," Seeds");
		var t23 = createAccTextFromArray(bushelTypes,"polseeds_"," Pollinated Seeds");
		var t29 = createAccTextFromArray(bushelTypes,"order_"," Bushel Orders");

		//use t27 to repair accTexts for screwy test texts before converting to accept texts
		var t27 = {"polseeds_purplepopp":"Purple Poppy Pollinated Seeds",
			"polseeds_orangedais":"Orange Daisy Pollinated Seeds",
			"polseeds_electriclil":"Electric Lily Pollinated Seeds",
			"polseeds_daylil":"Daylily Pollinated Seeds",
			"polseeds_goldenpopp":"Golden Poppy Pollinated Seeds",
			"polseeds_chromedais":"Chrome Daisy Pollinated Seeds",
			"polseeds_sunpopp":"Sun Poppy Pollinated Seeds",
			"bushel_purplepopp":"Purple Poppy Bushel",
			"bushel_orangedais":"Orange Daisy Bushel",
			"bushel_electriclil":"Electric Lily Bushel",
			"bushel_daylil":"Daylily Bushel",
			"bushel_goldenpopp":"Golden Poppy Bushel",
			"bushel_chromedais":"Chrome Daisy Bushel",
			"bushel_sunpopp":"Sun Poppy Bushel",
			"polseeds_purplepopp":"Purple Poppy Perfect Bunch",
			"polseeds_orangedais":"Orange Daisy Perfect Bunch",
			"polseeds_electriclil":"Electric Lily Perfect Bunch",
			"polseeds_daylil":"Daylily Perfect Bunch",
			"polseeds_goldenpopp":"Golden Poppy Perfect Bunch",
			"polseeds_chromedais":"Chrome Daisy Perfect Bunch",
			"polseeds_sunpopp":"Sun Poppy Perfect Bunch",
			"order_purplepopp":"Purple Poppy Bushel Order",
			"order_orangedais":"Orange Daisy Bushel Order",
			"order_electriclil":"Electric Lily Bushel Order",
			"order_daylil":"Daylily Bushel Order",
			"order_goldenpopp":"Golden Poppy Bushel Order",
			"order_chromedais":"Chrome Daisy Bushel Order",
			"order_sunpopp":"Sun Poppy Bushel Order",
		};

		//create the actual attachment
		var attachment={
			appID:thisApp,
			alias:'FV',
			hrefKey:'key',
			name:'FarmVille',
			thumbsSource:'farmville.zgncdn.com',
			flags:{httpsTrouble:true,requiresTwo:false,skipResponse:false,alterLink:true},
		/*	icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v43/144/102452128776/app_2_102452128776_416.gif", //corncob
			icon:"http://fbcdn-photos-a.akamaihd.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_343.gif", //duckhead
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_3994.gif", //strawberry
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_3606.gif", //chicken
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_162286141.gif", //coconut
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_479416909.gif", //piggy
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_514042832.gif", //sheep
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_188884871.gif", //goat
			icon:"http://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_658246637.gif", //orchid
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1802400414.gif", //watermelon
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_810647710.gif", //tractor
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1575157638.gif", //barn
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_724451824.gif", //panda
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1903979455.gif", //flower
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_981457788.gif", //flower2
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_732411100.gif", // xp
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v85005/144/102452128776/app_2_102452128776_4389.gif", //fv
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_302226724.gif", //barn2
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1935537816.gif", //fv2
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1452563179.gif", //cow
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_81659645.gif", //tractor2
		*/	icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/144/102452128776/app_2_102452128776_1457410780.gif", //fv3
		desc:"FarmVille Sidekick",
			
			//code for altering link destinations before processing (unique to FV at this time)
			alterLink:[{
				//find in href
				find:'next=gifts.php%3FgiftRecipient',
				
				//replace with, (note the {%1} in the replacement)
				replace:'next=gifts.php%3FselectedGift%3D{%1}%26giftRecipient',
				
				//words in the post body text
				words:["nail","wooden board","brick","honeybee","vehicle part","smoker","beeswax","blanket","bottle",
					"horseshoe","harness","training their puppy","kibble","watering can","shovels","concrete","hammer",
					"twine","tin sheet","hinge","screwdriver","wrench","pipe","clamps","stone","log","steel beam","wire",
					"water pump","painted wood","shrub","grazing grass","hay bundle","fence post","special delivery",
					"animal feed","saddle","bridle","punch","snacks","paint","red beam","screw","aluminum siding",
					"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer",
					"milk and cookies","gps","silver bell","holiday lights","reindeer treat","holiday cheer","snow brick",
					"snowflake","ice nail","snow globe","ice board","frozen beam","white paste","white overalls",
					"light plywood","black light","blue roller","white paper","teaching their dog","wood stain",
					"scaffolding","masking tape","brush","baby blanket","salt lick","sod piece","wooden peg","feed bucket",
					"water pail","grass seed","raw wood","baby carrot bunch","bunny bed","bunny tunnel","branch ball",
					"wood block","hutch wire","clamp","wood glue","sand paper","awning","basket","price card","twig",
					"potting soil","daffodil","tiny window","toadstool","garden fence","chocolate brick","gumdrop accent",
					"gingerbread siding","lollipop lamp","marshmallow mortar","cotton candy insulation","mini boulder",
					"turf roll","mulch soil","tropical cup","swim suit","beach sandal","lily pad","fishing pole","lure",
					"fuel pipe","level gauger","steel sheet","small axe","boat hook","wheelbarrow","mineral infusion",
					"steam","bed rock","stone pillar","terra cotta","hanging incense","reed thatch","clay brick",
					"bamboo rail","fill dirt","cement","metal post","mystery bulb","floating rock","sparkle seed",
					"magic water","wood plank","sail","rigging","skimmer","water bucket","leaf net","steering wheel",	
					"dog bed","tennis ball","pacifier","baby mobile","cloud brick","enchanted bamboo","hovering charm",
					"scientific scale","massage stone","buffet tray","drift wood","research paper","barnyard shingle",
					"tree incubator","cloning solution","chisel","magic boulder","talisman","ball of wool","java fern",
					"gold dust","mallet","stone pick","cobweb","old fence","deadwood","rusty gear","rusty post","chew toy",
					"thunder cloud","fertilizer stake","mulch","seedling tray","ladle","enchanted iron","gummy tentacle",
					"puffy cloud","magic bubble","life essence","purple roller","wooden cog","wooden shaft","stamp",
					"bearings","carnival light","gondola","windmill blade","wooden giraffe","wooden tiger","wooden zebra",
					"bumper","drying rack","flower apron","green tape","yellow paper","seatbelt","pepper packet","trough",
					"copper tube","drill bit","cut bamboo","bonsai pedestal","bonsai pot","grafting tool","grain of sugar",
					"grain of spice","everything nice","lamp post","bench","cobblestone","lumberjack saw","power saw",
					"mystery horse","mystery tree","mystery bloom","broken thermometer","meteorite","food chain",
					"special soil","clay pot","peat pellet","corporate sponsor","icicle ramp","crystal seed","crystal",
					"water","snow machine",	"mithril ore","star rock","warpstone","sun light rope","moon gem",
					"armillary sphere","fairy dust","magic maple","rain drop","vial of sunlight","magic mushroom",
					"garden bricks","garden vines","garden steps","cupid's arrow","heart leaf","teddy bear","bronze horse shoe","gold moon","silver clover",
				"grape vine","stone bench","wine barrels","slop bucket","scissor","blue flower","geode","gold bar","green flower","leaf blower","magma",
				"pot","purple flower","rake","snips","stardust","sunburst cloud","sunrise seed","coral chisel","coral hammer","ultramarine crystal",
				"horseshoe crabshell shovel","bucket of gold paint","coral nugget","marble vase","garden sketches","coral shears","coral crowbar",
				"coral key","crystal soil","seed bulbs","sprouting orb","fancy hay","pretty saddle","hi-tec salt","white sand","volcanic rock","blue sea water","wine barrel","fertile soil","grape food",
				"coffee thermos","star chart","telescope","golden wand","moon ray","phoenix feather","crystal cradle","fizzy field","goo away","slime sucker","sunshine orb",
				"candy blaster","candy scoop","cream of bliss","balloons","tent canvas","warped glass","magic moss","radiant rays","sparkling stream","diamond candy pick",
				"essence of frosting","marsh mortar","silver sugar shovel","sugar hammer","sweet aroma","crystal soil","seed bulbs","sprouting orb",
				"comet tail","flip flops","kite tail","pig tail","sea water","ship in a bottle","anvil of courage","bright metal","stone of sorcery","charmed clippers",
				"anti-thorn charm","grass patch","nesting hay","rabbit burrow",


				
				"nursery barn","horse paddock","cow pasture","livestock pen","wildlife habitat","aviary","pet run",
					"zoo","winter animal pen","crafting silo","sheep pen","pig pen","orchard","garage","duck pond",
					"horse stable","beehive","cove","winter wonderland train station","santa's sleigh","combine",
					"count duckula's castle","harvest hoedown","winter water wheel","winter pasture","winter paddock",
					"ice palace","crop mastery billboard","winter livestock pen","winter aviary","romantic carriage",
					"winter pet run","winter zoo","animal mastery billboard","tree mastery billboard","baby playpen",
					"baby bunny hutch","recipe mastery billboard","market stall","gnome garden","candy castle",
					"aquarium","grove","beach resort","fishing hole","gas pump","hot spring","mountain palace",
					"jade habitat","jade aviary","jade paddock","jade pasture","jade playpen","jade aquarium",
					"dino lab","jade wildlife pen","jade pet run","jade gnome garden","jade zoo","turtle pen",
					"imperial shipyard","swimming pond","sunshine doghouse","floating castle","floating waterfall",
					"farmhand center","arborist center","dragon lair","haunted house","animal workshop","monster lab",
					"seedling nursery","witchin' cauldron","tree of life","duckula's castle","sally's seed shop",
					"nightmare zoo","horrendous pet run","bumper cars","big windmill","ferris wheel","big barnyard",
					"deadly livestock pen","haunted pasture","bloom mastery billboard","wishing fountain","bonsai garden",
					"holiday square","joyful horse paddock","magic wildlife cave","holiday aviary","extinct animal zoo",
					"herb garden","penguin skate park","crystal garden","rivermist fortress","home mushroom","enchantment shop",
					"gnome vineyard","mystery crate","tree of love","fountain geyser","hot air balloon","spring garden",
					"orchard upgrade","marine observatory","atlantis garden","atlantis garage","atlantis crafting workshop",
					"atlantis gnome garden","atlantis orchard","atlantis palace","atlantis treasure","gifting tree","horse hall",
					"australian treasure","daydream island","australian vineyard","pegasus pen","astral observatory","dream nursery","craftshop expansion","gifting tree","rainbow pond",
					"summer poolhouse","space aviary","space pasture","space paddock","space livestock","space pet run","space wildlife","space zoo","sunny float field",
					"space ship","space guardian","slime pile","candy aviary","candy pasture","candy paddock","candy livestock","candy pet run","candy wildlife","candy zoo","candy shop","candy factory","eversweet tree",
				"rock candy boulder","candy pile","marshmallow mound","gifting tree","astral observatory","dream deer woods","carnival fun house","fairy flower",
				"palm paradise","destiny bridge","enchanted rose bush","summer hillside","mystical aviary","mystical garage","mystical livestock","mystical orchard",
				"mystical paddock","mystical pasture","mystical petrun","mystical storage cellar","mystical wildlife","mystical zoo",

					
				].fixOrder(),
				
				//change {%1} above to the value below based on found "word" above
				//the values below should be the "code" for the gift item to send
				conversionChart:{
					nail:"nail",woodenboard:"woodenboard",honeybee:"beehive_bee",vehiclepart:"vehiclepart",
					brick:"brick",smoker:"smoker",beeswax:"beeswax",blanket:"blanket",bottle:"bottle",horseshoe:"horseshoe",
					harness:"harness",trainingtheirpuppy:"consume_treat",kibble:"consume_kibble",wateringcan:"wateringcan",
					shovel:"shovel_item_01",concrete:"concrete",hammer:"hammer",twine:"crafting_twine",tinsheet:"tinsheet",
					hinge:"hinge",screwdriver:"screwdriver",wrench:"wrench",pipe:"pipe",clamp:"clamp",stone:"stonepart",
					log:"logpart",steelbeam:"steelbeampart",wire:"component_wire",waterpump:"component_waterpump",
					paintedwood:"component_paintedwood",fencepost:"component_fencepost",grazinggrass:"component_grazinggrass",
					haybundle:"component_haybundle",shrub:"component_shrub",animalfeed:"animalfeedtrough_feed",
					specialdelivery:"socialplumbingmysterygift",saddle:"component_saddle",bridle:"component_bridle",
					punch:"part_punch",snacks:"part_snacks",paint:"part_paint",redbeam:"redbeam",screw:"screws",
					aluminumsiding:"aluminumsiding",candycanebeam:"candy_cane_beam",coniferdust:"ww_fairy_dust",
					icepost:"ww_ice_post",railspike:"railspikepart",railtie:"railtiepart",coal:"coalpart",pickaxe:"pickaxepart",
					hairdryer:"hairdryerpart",milkandcookies:"task_milkandcookies",gps:"task_gps",silverbell:"task_jinglebells",
					holidaylights:"task_holidaylights",reindeertreat:"task_reindeertreat",holidaycheer:"task_holidaycheer",
					goo:"goo",hauntedbrick:"haunted_brick",knockers:"door_knockers",belt:"feedbelt",sack:"feedsack",scoop:"feedscoop",
					snowbrick:"parts_snowbrick",snowflake:"parts_magicsnowflake",icenail:"parts_icenail",snowglobe:"parts_snowglobe",
					iceboard:"parts_iceboard",frozenbeam:"parts_frozenbeam",whiteoveralls:"part_painters_overalls",
					lightplywood:"part_sheet_of_plywood",blacklight:"part_floodlight",whitepaper:"part_roll_of_paper",
					blueroller:"part_paint_roller",whitepaste:"part_bucket_of_paste",love:"parts_love",flowertrim:"parts_flowertrim",
					carriagelamp:"parts_carriagelamps",horsetreat:"parts_horsetreats",fancychocolate:"parts_fancychocolates",
					cozyblanket:"parts_cozyblanket",darkplywood:"task_sheet_of_plywood_recolor",greenlight:"task_floodlight_recolor",
					greenpaper:"task_roll_of_paper_recolor",orangeoveralls:"task_painters_overalls_recolor",
					redroller:"task_paint_roller_recolor",redpaste:"task_bucket_of_paste_recolor",teachingtheirdog:"consume_treat",
					woodstain:"task_woodstain",maskingtape:"task_maskingtape",scaffolding:"task_scaffolding",
					brush:"part_brush",saltlick:"part_saltlick",babyblanket:"part_babyblanket",sodpiece:"part_sod",
					rawwood:"part_raw_wood",feedbucket:"part_feed_bucket",waterpail:"part_water_pail",woodenpeg:"part_wood_peg",
					grassseed:"part_grass_seed",babycarrotbunch:"part_babycarrotbunch",bunnybed:"part_bunnybed",
					branchball:"part_branchball",woodblock:"part_woodblock",hutchwire:"part_hutchwire",bunnytunnel:"part_bunnytunnel",
					clamps:"part_clamps",woodglue:"part_wood_glue",sandpaper:"part_sandpaper",babyfish:"part_babyfish",
					oceanrock:"part_coral",filter:"part_filters",buoy:"part_buoys",smallcrowbar:"feedsmallcrowbar",
					largecrowbar:"feedcrowbar",smallfishingnet:"feedsmallnet",largefishingnet:"feedfishingnet",
					volcanomonitor:"part_volcanicmonitor",stonycoralpiece:"part_stonycoral",awning:"stall_awning",
					basket:"stall_basket",pricecard:"stall_pricecard",toadstool:"part_toadstool",gardenfence:"part_gardenfence",
					daffodil:"part_daffodils",twig:"part_twigs",tinywindow:"part_tinywindow",pottingsoil:"part_pinkpot",
					chocolatebrick:"part_chocolate_bricks",gingerbreadsiding:"part_gingerbread_siding",
					gumdropaccent:"part_gumdrop_accents",lollipoplamp:"part_lollipop_lamps",miniboulder:"part_mini_boulder",
					mulchsoil:"part_mulch_soil",turfroll:"part_turf_roll",marshmallowmortar:"part_marshmallow_mortar",
					cottoncandyinsulation:"part_cotton_candy_insulation",tropicalcup:"feed_r4r_tropical_cups",lilypad:"part_lily_pad",
					beachsandal:"feed_r4r_beachsandals",swimsuit:"feed_r4r_swimmingsuits",lure:"part_lure",fishingpole:"part_fishing_pole",
					fuelpipe:"part_steampipe",levelgauger:"part_levelgauger",steelsheet:"part_steelsheet",smallaxe:"part_smallaxe",
					boathook:"part_boathook",wheelbarrow:"part_wheelbarrow",bedrock:"part_bedrock",steam:"part_steam",
					mineralinfusion:"part_mineralinfusion",terracotta:"part_terracottastatue",hangingincense:"part_hangingincense",
					stonepillar:"part_stonepillar",bamboorail:"part_bamboorail",claybrick:"part_claybrick",reedthatch:"part_reedthatch",
					cement:"part_cement",filldirt:"part_filldirt",metalpost:"part_metalpost",mysterybulb:"part_flowerfood",
					floatingrock:"part_floatingrocks",magicwater:"part_magicwater",sparkleseed:"part_sparkleseeds",
					rigging:"part_rigging",sail:"part_sail",woodplank:"part_woodboard",skimmer:"part_skimmer",leafnet:"part_leafnet",
					waterbucket:"part_waterbucket",tennisball:"part_dogball",dogbed:"part_dogbed",chewtoy:"part_dogtoy",
					babyblanket:"part_babyblanket2",babymobile:"part_mobiles",pacifier:"part_pacifier",cloudbrick:"part_cloudbrick",
					enchantedbamboo:"part_enchantedbamboo",hoveringcharm:"part_hoveringcharm",scientificscale:"part_scale",
					massagestone:"part_massagestones",buffettray:"part_buffettray",driftwood:"part_driftwood",pottingsoil:"part_pottingsoil",
					javafern:"part_javafern",researchpaper:"part_researchpaper",treeincubator:"part_treeincubator",
					cloningsolution:"part_cloningsolution",talisman:"part_talisman",chisel:"part_chisel",magicboulder:"part_magicboulder",
					stamp:"part_stamps",ballofwool:"part_ballofwool",golddust:"part_golddust",stonepick:"part_pickaxe2",mallet:"part_mallet",
					cobweb:"part_cobweb",deadwood:"part_deadwood",oldfence:"part_ironfence",thundercloud:"part_lightning",
					rustypost:"part_rustyPost",rustygear:"part_rustyGear",fertilizerstake:"part_fertilizerstakes",mulch:"part_mulch",
					seedlingtray:"part_seedlingtrays",ladle:"part_ladle",enchantediron:"part_enchantediron",
					gummytentacle:"part_gummytentacles",lifeessence:"part_lifeessence",magicbubble:"part_magicbubbles",
					puffycloud:"part_puffyclouds",purpleroller:"task_paint_roller_recolor_purple",woodencog:"part_woodencogs",
					woodenshaft:"part_woodenshafts",barnyardshingle:"part_barnyardshingles",bearings:"part_bearings",gondola:"part_gondola",
					carnivallight:"part_carnivallights",trough:"part_trough",windmillblade:"part_windmillblades",woodengiraffe:"part_woodengiraffe",
					woodentiger:"part_woodentiger",woodenzebra:"part_woodenzebra",bumper:"part_bumper",dryingrack:"part_dryingrack",
					flowerapron:"part_flowerapron",greentape:"part_masking_tape_green",yellowpaper:"part_roll_of_paper_yellow",
					seatbelt:"part_seatbelt",pepperpacket:"part_seedpackets",steeringwheel:"part_steeringwheel",slopbucket:"part_slopbucket",
					cutbamboo:"wishingfountain_bamboo",drillbit:"wishingfountain_drill",coppertube:"wishingfountain_tube",
					bonsaipedestal:"part_bonsaipedestal",bonsaipot:"part_bonsaipot",graftingtool:"part_graftingtool",lamppost:"part_lamppost",
					cobblestone:"part_cobblestone",bench:"part_bench",everythingnice:"part_everythingnice",grainofsugar:"part_sugar",
					grainofspice:"part_spice",lumberjacksaw:"part_lumberjacksaw",powersaw:"part_powersaw",mysterybloom:"part_mysterybloomicon",
					mysteryhorse:"part_mysteryhorseicon",mysterytree:"part_mysterytreeicon",claypot:"part_claypot",specialsoil:"part_specialsoil",
					peatpellet:"part_peatpellet",meteorite:"part_meteorite",brokenthermometer:"part_broken_thermometer",foodchain:"part_food_chain",
					corporatesponsor:"part_corporatesponsor",icicleramp:"part_icicleramp",snowmachine:"part_snowmachine",crystalseed:"part_crystalseeds",
					crystal:"part_crystals",water:"part_water",mithrilore:"part_mithrilore",starrock:"part_starrock",warpstone:"part_warpstone",
					fairydust:"part_fairydust",magicmaple:"part_magicmaple",raindrop:"part_raindrops",armillarysphere:"part_armillarysphere",
					moongem:"part_moongems",sunlightrope:"part_sunlightrope",magicmushroom:"part_magicmushrooms",vialofsunlight:"part_vialofsunlight",
					stardust:"part_stardust",sunburstcloud:"part_sunburstcloud",sunriseseed:"part_sunriseseed",coralchisel:"part_coralchisel",
					coralhammer:"part_coralhammer",ultramarinecrystal:"part_ultramarinecrystal",fancyhay:"part_fancyhay",prettysaddle:"part_prettysaddle",
					"hi-tecsalt":"part_hightechsaltlick",crystalcradle:"part_crystalcradle",fizzyfield:"part_fizzyfield",
					gooaway:"part_gooaway",slimeaway:"part_slimesucker",sunshineorb:"part_sunshine orb",


					nurserybarn:"woodenboard,nail,brick,blanket,bottle",craftingsilo:"tinsheet,hinge,screwdriver",
					beehive:"woodenboard,nail,brick,beeswax,smoker",horsestable:"woodenboard,brick,nail,horseshoe,harness",
					cove:"logpart,stonepart,steelbeampart",winterwonderlandtrainstation:"coalpart,railtiepart,railspikepart",
					"santa'ssleigh":"task_holidaylights,task_jinglebells,task_gps,task_holidaycheer,task_reindeertreat,task_milkandcookies",
					orchard:"woodenboard,brick,nail",sheeppen:"woodenboard,brick,nail",zoo:"component_shrub,wrench,pipe",
					winteranimalpen:"ww_ice_post,ww_fairy_dust,candy_cane_beam",pigpen:"woodenboard,brick,nail",
					horsepaddock:"logpart,component_bridle,component_saddle",cowpasture:"component_haybundle,tinsheet,stonepart",
					petrun:"component_paintedwood,component_waterpump,compoent_fencepost",duckpond:"shovel_item_01,wateringcan",
					wildlifehabitat:"component_fencepost,component_shrub,component_grazinggrass",aviary:"clamp,hinge,screwdriver",
					livestockpen:"component_waterpump,component_wire,steelbeampart",combine:"vehiclepart",garage:"woodenboard,brick,nail",
					harvesthoedown:"part_punch,part_snacks,part_paint","duckula'scastle":"goo,haunted_brick,door_knockers",
					winterwaterwheel:"task_snowgear,task_snowchains,task_snowaxle",winterpaddock:"logpart,component_bridle,component_saddle",
					winterpasture:"component_haybundle,tinsheet,stonepart",animalfeedmill:"feedsack,feedscoop,feedbelt",
					icepalace:"parts_snowbrick,parts_magicsnowflake,parts_icenail,parts_snowglobe,parts_iceboard,parts_frozenbeam",
					cropmasterybillboard:"part_painters_overalls,part_sheet_of_plywood,part_floodlight,part_roll_of_paper,part_paint_roller,part_bucket_of_paste",
					romanticcarriage:"parts_love,parts_flowertrim,parts_carriagelamps,parts_horsetreats,parts_fancychocolates,parts_cozyblanket",
					winterlivestockpen:"component_waterpump,component_wire,steelbeampart",winteraviary:"clamp,hinge,screwdriver",
					winterpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",winterzoo:"component_shrub,wrench,pipe",
					animalmasterybillboard:"task_sheet_of_plywood_recolor,task_floodlight_recolor,task_roll_of_paper_recolor,task_painters_overalls_recolor,task_paint_roller_recolor,task_bucket_of_paste_recolor",
					treemasterybillboard:"task_woodstain,task_scaffolding,task_maskingtape",babyplaypen:"part_brush,part_saltlick,part_babyblanket",
					babybunnyhutch:"part_babycarrotbunch,part_bunnytunnel,part_branchball,part_hutchwire,part_woodblock,part_bunnybed",
					recipemasterybillboard:"part_clamps,part_wood_glue,part_sandpaper",volcanoreef:"part_babyfish,part_volcanicmonitor,part_stonycoral",
					aquarium:"part_buoys,part_filters,part_coral",marketstall:"stall_awning,stall_basket,stall_pricecard",
					islandpaddock:"logpart,component_bridle,component_saddle",islandpasture:"component_haybundle,tinsheet,stonepart",
					islandlivestock:"component_waterpump,component_wire,steelbeampart",islandzoo:"component_shrub,wrench,pipe",
					islandpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",islandaviary:"clamp,hinge,screwdriver",
					islandhabitat:"component_fencepost,component_shrub,component_grazinggrass",fishinghole:"part_lure,part_lily_pad,part_fishing_pole",
					gnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",grove:"part_mini_boulder,part_mulch_soil,part_turf_roll",
					candycastle:"part_chocolate_bricks,part_gingerbread_siding,part_gumdrop_accents,part_lollipop_lamps,part_marshmallow_mortar,part_cotton_candy_insulation",
					beachresort:"feed_r4r_tropical_cups,feed_r4r_beachsandals,feed_r4r_swimmingsuits",gaspump:"part_steampipe,part_levelgauger,part_steelsheet",
					hotspring:"part_bedrock,part_steam,part_mineralinfusion",mountainpalace:"part_stonepillar,part_hangingincense,part_terracottastatue",
					jadehabitat:"part_reedthatch,part_bamboorail,part_claybrick",jadepasture:"component_haybundle,tinsheet,stonepart",
					jadeplaypen:"part_brush,part_saltlick,part_babyblanket",jadeaviary:"clamp,hinge,screwdriver",
					jadeaquarium:"part_buoys,part_filters,part_coral",jadepaddock:"logpart,component_bridle,component_saddle",
					dinolab:"part_cement,part_filldirt,part_metalpost",jadepetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					jadewildlifepen:"component_fencepost,component_shrub,component_grazinggrass",jadezoo:"component_shrub,wrench,pipe",
					jadegnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",floatingwaterfall:"part_floatingrocks,part_magicwater,part_sparkleseeds",
					imperialshipyard:"part_rigging,part_sail,part_woodboard",swimmingpond:"part_skimmer,part_waterbucket,part_leafnet",
					sunshinedoghouse:"part_dogball,part_dogbed,part_dogtoy",babynursery:"part_babyblanket2,part_mobiles,part_pacifier",
					floatingcastle:"part_cloudbrick,part_enchantedbamboo,part_hoveringcharm",turtlepen:"part_driftwood,part_pottingsoil,part_javafern",
					farmhandcenter:"part_scale,part_massagestones,part_buffettray",arboristcenter:"part_researchpaper,part_treeincubator,part_cloningsolution",
					dragonlair:"part_talisman,part_chisel,part_magicboulder",hauntedmansion:"part_cobweb,part_deadwood,part_ironfence",
					monsterlab:"part_lightning,part_rustyPost,part_rustyGear",seedlingnursery:"part_fertilizerstakes,part_mulch,part_seedlingtrays",
					"witchin'cauldron":"part_ladle,part_enchantediron,part_gummytentacles",treeoflife:"part_lifeessence,part_magicbubbles,part_puffyclouds",
					"sally'sseedshop":"part_dryingrack,part_flowerapron,part_seedpackets",nightmarezoo:"component_shrub,wrench,pipe",
					horrendouspetrun:"component_paintedwood,component_waterpump,compoent_fencepost",hauntedpasture:"component_haybundle,tinsheet,stonepart",
					deadlylivestockpen:"component_waterpump,component_wire,steelbeampart",bumpercars:"part_seatbelt,part_bumper,part_steeringwheel",
					bigwindmill:"part_windmillblades,part_woodencogs,part_woodenshafts",ferriswheel:"part_gondola,part_bearings,part_carnivallights",
					bigbarnyard:"part_trough,part_slopbucket,part_barnyardshingles",bloommasterybillboard:"part_masking_tape_green,part_roll_of_paper_yellow,task_paint_roller_recolor_purple",
					wishingfountain:"wishingfountain_bamboo,wishingfountain_drill,wishingfountain_tube",bonsaigarden:"part_bonsaipedestal,part_bonsaipot,part_graftingtool",
					holidaysquare:"part_cobblestone,part_bench,part_lamppost",animalworkshop:"part_sugar,part_spice,part_everythingnice",
					joyfulhorsepaddock:"logpart,component_bridle,component_saddle",magicwildlifepen:"component_fencepost,component_shrub,component_grazinggrass",
					holidayaviary:"clamp,hinge,screwdriver",herbgarden:"part_claypot,part_specialsoil,part_peatpellet",extinctanimalzoo:"part_food_chain,part_meteorite,part_broken_thermometer",
					penguinskatepark:"part_corporatesponsor,part_icicleramp,part_snowmachine",crystalgarden:"part_crystals,part_crystalseeds,part_water",
					enchantmentshop:"part_armillarysphere,part_moongems,part_sunlightrope",homemushroom:"part_fairydust,part_magicmaple,part_raindrops",
					rivermistfortress:"part_mithrilore,part_starrock,part_warpstone",treeoflove:"part_cupid'sarrow,part_teddybear,part_heartleaf",
					"leprechaun'scottage":"part_bronzehorseshoe,part_goldmoon,part_silverclover",gnomevineyard:"part_grapevines,part_grapevine,part_stonebench,part_winebarrels",
					mysterycrate:"part_scissor",fountaingeyser:"part_magma,part_goldbar,part_geode",orchardupgrade:"part_rake,part_leafblower,part_pot",springgarden:"part_blueflower,part_greenflower,part_purpleflower",
					sunriseforest:"part_stardust,part_sunburstcloud,part_sunriseseed",marineobservatory:"part_coralchisel,part_coralhammer,part_ultramarinecrystal",
					atlantiscowpasture:"component_haybundle,tinsheet,stonepart",atlantisaviary:"clamp,hinge,screwdriver",atlantispaddock:"logpart,component_bridle,component_saddle",
					atlantispetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					atlantiswildlifecave:"component_fencepost,component_shrub,component_grazinggrass",atlantiszoo:"component_shrub,wrench,pipe",
					glencowpasture:"component_haybundle,tinsheet,stonepart",glenplaypen:"part_brush,part_saltlick,part_babyblanket",glenaviary:"clamp,hinge,screwdriver",
					glenpaddock:"logpart,component_bridle,component_saddle",glenpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					glenwildlifepen:"component_fencepost,component_shrub,component_grazinggrass",glenzoo:"component_shrub,wrench,pipe",
					atlantiscraftingworkshop:"concrete,twine,hammer",atlantistreaure:"part_coralcrowbar,part_coralkey",
					atlantisgarden:"part_marblevase,part_gardensketches,part_coralshears",atlantispalace:"part_horseshoecrabshellshovel,part_bucketofgoldpaint,part_coralnugget",
					giftingtree:"part_crystalsoil,part_seedbulbs,part_sproutingorb",horsehall:"part_fancyhay,part_prettysaddle,part_hightechsaltlick",
					australiantreasure:"part_miningkey,part_miningpickaxe",australiancowpasture:"component_haybundle,tinsheet,stonepart",australianaviary:"clamp,hinge,screwdriver",australianpaddock:"logpart,component_bridle,component_saddle",
					australianpetrun:"component_paintedwood,component_waterpump,compoent_fencepost",
					australianwildlifecave:"component_fencepost,component_shrub,component_grazinggrass",australianzoo:"component_shrub,wrench,pipe",
					daydreamisland:"part_whitesand,part_volcanicrock,part_blueseawater",australianvineyard:"part_winebarrel,part_fertilesoil,part_grapefood",
					pegasuspen:"part_goldenwand,part_moonray,part_phoenixfeather",astralobservatory:"part_coffeethermos,part_starchart,part_telescope",
					dreamnursery:"part_nightcap,part_polkadotpajamas,part_warmmilk",craftshopexpansion:"part_metalwire,part_ovenrack,copperpipe",
					rainbowpond:"part_enchantedmist,part_fairymagic,part_rainbowstardust",summerpoolhouse:"part_poolhouseplans,part_summersun,part_swimmies",
					spaceaviary:"clamp,hinge,screwdriver",spacepasture:"component_haybundle,stonepart,tinsheet",spacepaddock:"logpart,component_saddle,component_bridle",
					spacelivestock:"component_waterpump,component_wire,steelbeampart",spacepetrun:"component_paintedwood,component_waterpump,component_fencepost",
					spacewildlife:"component_fencepost,component_shrub,component_grazinggrass",spacezoo:"wrench,component_shrub,pipe",sunnyfloatfield:"part_crystalcradle,part_fizzyfield,part_sunshineorb",
					spaceship:"part_hyperspeedthruster,part_portalwindow,part_bigredbutton",spaceguardian:"part_celestialcrystals,part_astrosaplings,part_floatyspore",
					slimepile:"slimesucker,gooaway",candyaviary:"clamp,hinge,screwdriver",candypasture:"component_haybundle,stonepart,tinsheet",candypaddock:"logpart,component_saddle,component_bridle",
					candylivestock:"component_waterpump,component_wire,steelbeampart",candypetrun:"component_paintedwood,component_waterpump,component_fencepost",
					candywildlife:"component_fencepost,component_shrub,component_grazinggrass",candyzoo:"wrench,component_shrub,pipe",candyfactory:"part_candyblaster,part_marshmortar,part_sugarhammer",
					eversweettree:"part_creamofbliss,part_essenceoffrosting,part_sweetaromas",candypile:"part_diamondcandypick",marshmallowmound:"part_candyscoop",
					rockcandyboulder:"part_silversugarshovel",dreamdeerwoods:"part_magicmoss,part_radiantrays,part_sparklingstream",carnivalfunhouse:"part_balloons,part_tentcanvas,part_warpedglass",
					fairyflower:"part_comettales,part_kitetales,part_pigtales",palmparadise:"part_flipflops,part_seawater,part_shipinabottle",mysticalaviary:"clamp,hinge,screwdriver",mysticalpasture:"component_haybundle,stonepart,tinsheet",mysticalpaddock:"logpart,component_saddle,component_bridle",
					mysticallivestock:"component_waterpump,component_wire,steelbeampart",mysticalpetrun:"component_paintedwood,component_waterpump,component_fencepost",
					mysticalwildlife:"component_fencepost,component_shrub,component_grazinggrass",mysticalzoo:"wrench,component_shrub,pipe",destinybridge:"part_anvilofcourage,part_brightmetal,part_stoneofsorcery",
					summerhillside:"part_grasspatch,part_nestinghay,part_rabbitburrow",enchatedrosebush:"part_charmedclippers,part_antithorncharm",mysticalgarage:"woodenboard,brick,nail",mysticalstoragecellar:"shovel_item_01",mysticalgnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",





				}
			},
			{
				dataSource:'msg',
				find:'%26frType%3DFriendVotingFriendReward',
				replace:'%26suggestedVote%3D{%1}%26frType%3DFriendVotingFriendReward',
				words:['right','left','rite','<','>','links','rechts'],
				conversionChart:{right:"1",left:"0",rite:"1",'<':"1",'>':"0",rechts:"1",links:"0",}
			}],

			//merge accept texts from dynamically created lists above
			accText: mergeJSON(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t29,t27,t30,t31,t32,t33,t34,t35,t36,t37,t38,t39,t40,t41,t42,t43),

			//tests for bonuses
			//see http://fbwm.wikia.com/wiki/Sidekick_Tutorial for in depth how-to instructions
			//changing the order of some of these tests will break this script
			tests: [
				//link excludes
				{ret:"exclude", link:[
					"Play FarmVille now","View full size!","feed their chickens","fertilize their crops",
					"start trading!","visit trading","Join them now","Accept as Neighbor",
					"visit","Join their Co-op","Help with the job","donate","Get the Ambrosia Tulip","Play Farmville","Solve Puzzles",
				]},
				
				//just say no to scam posts
				{ret:"exclude",url:[
					"www.facebook.com/pages/","Farmville.Nation","Farmville.Universe","Farmville.INC","Fv.Help","bit.ly",
					"FarmPrizes","Fv.Avg.Plane","FvWorld","zFarmvilleHelper","bit.ly","FarmvilleLatestHelpers",
					"FarmVille.Fans","FVstuffs","Zynga.Farmville.World","Farmville.Genious","Yes.I.Love.You.XD","FVBonus",
					"Farmville.Breeders","ZyngaFarmVilleFans","FarmvilleDailyNews","{*reward_link*}","&next=index.php",
					"FarmVilleAwesomePrizes","farmville-feed-blog.blogspot.com","FarmvilleJadeFallss"
				]},

				//body excludes
				{ret:"exclude", search:["title","caption"],find:[
					"just planted their mystery tree seedling and could use help watering them",
					"found some extra bags of fertilizer","just Unwithered your crops!","posted a new comment on your farm",
					"wants to help you farm faster","just posted a note on your farm","gave up city livin' to become a farmer",
					"opened a Mystery Box and found","wants you to be their neighbor","has created a fantastic farm",
					"could use some gifts","is having a great time playing","is playing FarmVille on the iPhone",
					"is playing FarmVille on the iPad","has a new look!","found a lost pig with your name on her collar",
					"needs help harvesting a Bumper Crop","send them parts to help construct their mystery bulb",
					"needs your help to support Children's HeartLink",
				]},
								
				{link:"Get TWO",ret:"none",kids:[
					
					{search:["link","title","caption"],find:"soho oriental poppy",ret:"bulb_sohoorientalpoppy"},
					
				]},
				
				{link:["claim it","claim prize","share prize","share it"],ret:"none",kids:[
				//	{search:["title","caption"],find:"{%1}",subTests:specialMaterials,ret:"none",kids:[
						{search:["title","caption"],find:"{%1} horse",subTests:horseTypes,ret:"adopt_horse{%1}"},
						{search:["title","caption"],find:"{%1} cow",subTests:cowTypes,ret:"adopt_cow{%1}"},
						{search:["title","caption"],find:"{%1} sheep",subTests:sheepTypes,ret:"adopt_sheep{%1}"},
						{search:["title","caption"],find:"{%1} ewe",subTests:sheepTypes,ret:"adopt_ewe{%1}"},
						{search:["title","caption"],find:"giant {%1}",subTests:treeTypes2,ret:"tree_giant{%1}"},
						{search:["title","caption"],find:"big {%1}",subTests:treeTypes2,ret:"tree_giant{%1}"},
						{search:["title","caption"],find:"{%1} bonsai ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
						{search:["title","caption"],find:"{%1} bonsai tree ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
						{search:["title","caption"],find:"{%1} tree",subTests:treeTypes,ret:"tree_{%1}"},
						{search:["title","caption"],find:"{%1} bulb",subTests:bulbTypes,ret:"bulb_{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:otherAnimals,ret:"adopt_{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:decorTypes,ret:"{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:otherConsumables,ret:"{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:specialEvents,ret:"{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:specialMaterials,ret:"{%1}"},
				//	]},
				]},
				
				//voting events
				{link:"claim prize",ret:"none",kids:[
					{search:["title","caption"],find:"would rather cuddle",ret:"tree_redpanda"},
					{img:"0e8973fef4e4522ff8dc61952f2fe9c9",ret:"tree_springblossoms"},
					{img:"d9d87dfa0be26db2ee09a26ab63854a6",ret:"adopt_blacklicoricepather"},
					{img:"8d076211ac321599f335ce33e7e6ea73",ret:"adopt_maccaroonbabboon"},
					{img:"ca32bfbd586a60a1abadfc3f39bab77a",ret:"adopt_mintchipchimp"},
					{img:"de4241d2697c35ca2fa2b3ef9cad3ae5",ret:"adopt_hardcandyhermitcrab"},
					{img:"b7f45c974ac4d89bc68af8b66abddf82",ret:"adopt_whitechocolatestag"},
					{img:"a1554122bbf85f9c193dd01f84b3525f",ret:"adopt_redlicoricefox"},
					{img:"f199d506c8c029617ce1cb0f03e9238c",ret:"adopt_gumdrophedgehog"},
					{img:"74a30bfc988723e285f347906efc7b91",ret:"adopt_blondiehorse"},
					{img:"c40f183926be99642c1fbbc9d5871ad7",ret:"adopt_marshmallowfudgemustang"},
					{img:"e2d9d1708695b72c49cfacdce9a9972d",ret:"adopt_candyflossalpaca"},
					{img:"764c138ce0c77e56446af36f93b014f8",ret:"adopt_jellybeary"},
					{img:"f8b3b65600e41f42175892d3ca9ff06c",ret:"adopt_cinnamonkey"},
					{img:"66014f7ade8020746ef2dde061fc15ae",ret:"adopt_milkchocolatemoose"},
					{img:"d9f6fe546b29b20a6628437c420168bd",ret:"adopt_blueconfectionpegacorn"},
					{img:"f4efc9d65a3fb75464fdd26b8fb7fe13",ret:"adopt_pinkconfectionpegacorn"},
					{img:"333659d0ddd3ea3d6e84d373e194bef0",ret:"adopt_blackberrypeachpig"},
					{img:"07b81debc841feff84afe56b4681580f",ret:"adopt_giantrockyroadladybug"},
					{img:"f9fdff8c004b95aef5a759b607bef90e",ret:"adopt_gianttaffybutterfly"},
					{img:"7dd1cd1a1df29b5d35c06e5de9060af3",ret:"adopt_coolmintcoyote"},
					{img:"ed3530655fb11487419443315d74c719",ret:"adopt_rootbeergnome"},
					{img:"aa2c391594a84aec033d1d25699a4894",ret:"adopt_strawberryshakegnome"},
					{img:"c3b9e4ee68b6c63f3a155b6c5e64cc27",ret:"adopt_cherrypiepig"},
					{img:"8d92a409ca64cc9ac096a5e56625bcad",ret:"adopt_doublepopsicletree"},
					{img:"2aa5885408c34e3218d25f143e188bdd",ret:"adopt_icecreambartree"},
					{img:"dd8f5a391661aa0ddbb7ba70b2e34afe",ret:"adopt_bluebellhorse"},
					{img:"838db3c30d394b9ff7e12727511bb171",ret:"adopt_bootsonlymoose"},
					{img:"4e782526849520a34a6a271170aa76d1",ret:"adopt_cabbagepatchhedgehog"},
					{img:"eb971a0dce22e3458fbfa2c227ed1c4f",ret:"adopt_carrotbaskethorse"},
					{img:"a930512ad4d453d7660d48353377f41e",ret:"adopt_cumulusalpaca"},
					{img:"3a3aa8cce9446d18953ef20721ca9447",ret:"adopt_daisydeerfawn"},
					{img:"d7ea1c084eaa4efec3f69b6cff03b985",ret:"adopt_dogdayscorgi"},
					{img:"4ae55503499db181e86088a4a22c0398",ret:"adopt_farmerpegacorn"},
					{img:"a5d86e7983db4ec775e7975a2e33a944",ret:"adopt_farmershattree"},
					{img:"5b0f854c7878e669de3c693f59f78fee",ret:"adopt_feliciafox"},
					{img:"a27335097c2da33cdacdc6bab241eb23",ret:"adopt_flipflopshippo"},
					{img:"ons/3fbb541626cf9410179680c8353e",ret:"adopt_flowernursery"},
					{img:"ce59df49fa70dc16980587b560b6e026",ret:"adopt_flowerpotkitty"},
					{img:"d687d3073323c082cd07a395659abb1b",ret:"adopt_fluffyflowersheep"},
					{img:"315b3a3310624fa88d216473542c8131",ret:"adopt_freezingthermometertree"},
					{img:"2d2797de2a55a49eee3205dcbe31c3b9",ret:"adopt_gardenerpegacorn"},
					{img:"e6e28e608bae868867aeb63386c5d73a",ret:"adopt_gardenersbonnettree"},
					{img:"39c436b5a6e38c604f93bf47afb38737",ret:"adopt_harvestpig"},
					{img:"db88c12f1f378aba5e531eaa13038152",ret:"adopt_leafygreenstree"},
					{img:"5135119adbaa59487b042a2fda019ad8",ret:"adopt_metalwindchimetree"},
					{img:"718321c70b487679d271e394a3ffb7e2",ret:"adopt_meteorologistcow"},
					{img:"ons/33a990b6712ef9559896fa33963d",ret:"adopt_minifarmersmarket"},
					{img:"ons/4d4efa871718141e8fbaca8f1923",ret:"adopt_ornamentalwindmill"},
					{img:"ons/f6425716e8fba5610d6824a65e08",ret:"adopt_pottedplantgnome"},
					{img:"895edf8aa9c26ee1dfbf226c91229d89",ret:"adopt_rainsoakedgorilla"},
					{img:"96f544c721bea60237cc5268b6e9bb97",ret:"adopt_rainyrhino"},
					{img:"ons/1e42bff740624e6274ffd66cb337",ret:"adopt_rosetrellis"},
					{img:"43aa132b64c523414004e35a762a1e44",ret:"adopt_sandygoat"},
					{img:"430fb904e7f6df2b7d1d5645783c3849",ret:"adopt_snowballsheep"},
					{img:"b4c7d0af67cea0e72dea4a78db7ec376",ret:"adopt_stormchaserpig"},
					{img:"1f5afea0618f8d4f5c9be9b595e12bbd",ret:"adopt_sunmanepegacorn"},
					{img:"23939494b6242885b08e3e31716fee47",ret:"adopt_sunorbtree"},
					{img:"fc9742d382f5c0a022dc92907c689d95",ret:"adopt_sunpaneltree"},
					{img:"bca02040cd0ef373fdb1252cbde0bb29",ret:"adopt_sunreadygator"},
					{img:"79df470406654863bc8526c57f655968",ret:"adopt_thundermanepegacorn"},
					{img:"ons/889240280ce99fda6330898c5464",ret:"adopt_twisterballoon"},
					{img:"ons/fa9169a55173781241bdcc5e5d3a",ret:"adopt_vegetablewheelbarrow"},
					{img:"ons/e81ae0fb9af7a076a28a60997f08",ret:"adopt_veggiebasketgnome"},
					{img:"3cc403dafa2c4e7144bc8232240fdd14",ret:"adopt_veggieboxbeagle"},
					{img:"729554cd29f32e0ba0d354ca3a8101c4",ret:"adopt_veggievinemonkey"},
					{img:"727aca26b966bb8f47a59898db697147",ret:"adopt_wateringcantree"},
					{img:"7c817db6f46460e8b1144705fb1d94b5",ret:"adopt_weathervaneduck"},
					{img:"15c77e2d77ac4aa809baa9f80d0c6c5a",ret:"adopt_weathervanerooster"},
					{img:["90265ac316a4b9e6ef96e26a0f6e1fcc","F582889ff54fed3ab63f916b4a1e90f8e"],ret:"adopt_wheelbarrowtree"},
					{img:"ons/76060be73f8c578e462902f8b39a",ret:"adopt_wildwaterraft"},
					{img:"a50695d4dc2f64dd589d7cf3e458e15a",ret:"adopt_wildflowerbouquettree"},
					{img:"ons/ba1b224dc7f92225f576821947d9",ret:"adopt_windchimesstand"},
					{img:"0abe12ec9c19d9293dae15cd5d0a9f43",ret:"adopt_windblowncat"},
					{img:"8d8f47a3339c83c293046d2886519f50",ret:"adopt_summersunrisesheep"},
					{img:"20da3814fd0c12ca338ea9d406f0b038",ret:"adopt_summersunsetsheep"},
					{img:"d4c87d3436d77e236096bdb612a3c91f",ret:"adopt_spapig"},
					{img:"94702bfc1e5c7bfe6e80aa245a3eabcd",ret:"adopt_summersunpig"},
					{img:"63fa35501b500f3e7a0ed01db6b5e11d",ret:"adopt_skybluechicken"},
					{img:"55cb6b10e4a5d4794f111b6248f8c1b0",ret:"adopt_berrychicken"},
					{img:"85e9e293313e4f185eae1e9047d99629",ret:"adopt_summerfunfirepit"},
					{img:"92c24efefe79e6ef00e31256b359c1fe",ret:"adopt_solitudebench"},
					{img:"5ffa86915b4eaf3e8d5ac140de0946a3",ret:"adopt_theatreushergnome"},
					{img:"144235711717fbdbdc8b0b8217133ea3",ret:"adopt_broadwaygnome"},
					{img:"30fd414c2d13e7b83cbe04b9e27f395f",ret:"adopt_saddlesummerdragon"},
					{img:"8771105024799b7cb6e08fc62fc5724e",ret:"adopt_babyrainbowdragon"},
					{img:"3a16465bef8d8ef2bbd04fda8e4d5e05",ret:"adopt_vinotree"},
					{img:"6c8d6e4ab8f82e0eaca497d0316f8ac5",ret:"adopt_frostymugtree"},
					{img:"678f31f0b5ac4abc438497b806240db0",ret:"adopt_picnichorse"},
					{img:"2e3c098e65e8f96b25eafa55aaf5b25c",ret:"adopt_summerfiestahorse"},
					{img:"7b06b8cd62e564db08bae477d2c10e51",ret:"adopt_summersunduck"},
					{img:"5659af01ef1c36a87f404da0cf3027e4",ret:"adopt_poolpartyduck"},
					{img:"35faf102ace033abb90f2c063c9c4d64",ret:"adopt_summerbeagle"},
					{img:"4c7795a45c2b0443badbb054347ad307",ret:"adopt_canastapoodle"},
					{img:"c93529be1e2c8bedfe694f307454a34a",ret:"adopt_summerfriendshiptree"},
					{img:"8be35652f9f9edbf754ebe9eb017005f",ret:"adopt_summerfamilytree"},
					{img:"7c38e96892342c16972c1b8ea2f30b24",ret:"adopt_sunrisepegacorn"},
					{img:"bd8df9a85d2c899a841a075816658084",ret:"adopt_eveningpegacorn"},
					{img:"a4c1eef8a0088d33608a537ee45d1092",ret:"adopt_blackluckkitten"},
					{img:"2ea0c98adba1f4d3715d2159bc9aaf89",ret:"adopt_paintedpuppy"},
					{img:"f75b3036b1eb370d55a361a70460ed43",ret:"adopt_yumplumtree"},
					{img:"b2947227bfd47896b8e26ae5d38a9e65",ret:"adopt_degloomappletree"},
					{img:"c36dc15e97f6b06c1fff5bbaa1a5c42a",ret:"adopt_barddwarf"},
					{img:"b6e175a7bf4bd164f71b528489a9b47c",ret:"adopt_firebreatherdwarf"},
					{img:"68cd9dda0213dbd76c9a9c321fb7ba3f",ret:"adopt_lunarwingcub"},
					{img:"9c30fbad93c19ae2bf4d4b6e1c147cc0",ret:"adopt_solarwingcub"},
					{img:"1b477b2152477f2f7f13491287cca844",ret:"adopt_darkrosearchway"},
					{img:"2e4346ecd09a937c8c5bf37e6190eed9",ret:"adopt_lanternlitgazebo"},
					{img:"766b524bb083bb08e4fa8fa5ea34ee18",ret:"adopt_moonslothtree"},
					{img:"f678109c0ebf85e7086deed3a9a8a99f",ret:"adopt_brightflufftree"},
					{img:"a8ae7bca2eea881aa5396525617d09d2",ret:"adopt_midnightchicken"},
					{img:"93d5f957f0b8404ac0031cc3efe437b6",ret:"adopt_goldenfeatherchicken"},
					{img:"1bf173902af2fb95fb01d21ffedb05d0",ret:"adopt_bannerbull"},
					{img:"417e54e31d1a36b4c317fa0b3990ebca",ret:"adopt_saddleddeer"},
					{img:"4e4201091aa9fd8fcd6420f72214e220",ret:"adopt_nightwoodram"},
					{img:"d012b0469473aa79146ab65562842a1b",ret:"adopt_daybreaklion"},
					{img:"63ea06e94de48a1d96c2de613c02921b",ret:"adopt_amethystdragon"},
					{img:"1a01d8ff0a43a783c9dd6510e83dbcf6",ret:"adopt_ametrinedragon"},
					{img:"bd6ffe7401bc2181cb077f1be40a8c0a",ret:"adopt_mistyeyedtree"},
					{img:"a0f591d6a3e9c4807095a42bfafbdc48",ret:"adopt_tearsparkletree"},
					{img:"8a3424e272063b128bfcc83f20032f9a",ret:"adopt_obsidianpegacorn"},
					{img:"68a0b48ff1f7a1c0e9f468c74953d0fd",ret:"adopt_amberbrightpegacorn"},






					
					]},
				
				//mystery bulbs
				{link:"get flower",ret:"bulb_unknown",kids:[
					{link:"flower food",ret:"flowerfood"},
					{search:["title","caption"],find:"have a fully grown {%1}",subTests:bulbTypes,ret:"bulb_{%1}"},
					{search:["title","caption"],find:"now has a {%1} on their farm",subTests:bulbTypes,ret:"bulb_{%1}"},
					{search:["title","caption"],find:"has all the {%1} they need",subTests:"materials",ret:"{%1}"},
				]},
				
				//tests to distinguish between two types of baby blankets
				{img:"f265afa84c6a43bc616b151417058203",ret:"pinkbabyblanket"},
				{img:"9ec1a380594fa2c619e1ad18f28a048a",ret:"bluebabyblanket"},
				{search:["title","caption"],find:"baby blanket",ret:"none",kids:[
					{search:["title","caption"],find:"baby playpen",ret:"bluebabyblanket"},
					{search:["title","caption"],find:"baby nursery",ret:"pinkbabyblanket"},
				]},
				
				//specific text/url tests
				{img:"2F39503e23e030c43dbb3e880fb5ec2020",ret:"anti-thorncharm"},
				{link:"Get pink wildflower",ret:"wildflower_pink"},
				{link:"Get blue wildflower",ret:"wildflower_blue"},
				{link:"Get yellow wildflower",ret:"wildflower_yellow"},
				{link:"Get orange wildflower",ret:"wildflower_orange"},
				{link:"Get purple wildflower",ret:"wildflower_purple"},
				{link:"Get Magic Crown of Thorn B",ret:"tree_bonsaimagiccrownofthorn"},
				{link:"Get Maj. Redwood",ret:"tree_majesticredwood"},
				{img:"F5de4c3dcdc84e28f869a56d688c61f2b",ret:"stardust"},
				{img:"2F890e543735401b5e5325d214805aa029",ret:"arborist"},
				{img:"2F4b8cc80501cc6d433b47b19bf3512337",ret:"farmhand"},
				{link:"Get a Flower Coin",ret:"flowercoins"},
				{img:"2Fb7f907f6d8b6022e3622750a2060f2a8",ret:"mat_marshmallowmound"},
				{img:["2F95382e420cd8cd49409c1e1cac74d741","2F21e29d7cde18baf2c08774736f2b754b"],ret:"candyscoop"},
				{img:"2F9bdc623855d2845b843bfa22a84f3737",ret:"silversugarshovel"},
				{img:"2Ffce94abbe46d5a8a51c020db3d1cd5c6",ret:"diamondcandypick"},
				{img:["2F1bc0633ec38b487b06ca3b10a46cbdec","F835a85420c3934ad30e99388669822e5"],ret:"gooaway"},
				{link:"Send Silver Sugar Shovel",ret:"silversugarshovel"},
				{link:"Vote Now",ret:"votenow"},
				{link:"Claim Prize",ret:"claimprize"},
				{link:["Get the Marshmortar","Get Marshmortar","Claim Marshmortar","Get a Marshmortar"],ret:"marshmortar"},
				{search:["title","caption"],find:"Summer Pool House",ret:"mat_summerpoolhouse"},
				{search:["title","caption"],find:"carving a spectacular Factory made out of Candy",ret:"mat_candyfactory"},
				{search:["title","caption"],find:"harvesting the Candy Paddock",ret:"adopt_foalsweet"},
				{search:["title","caption"],find:"harvesting the Candy Pasture",ret:"adopt_calfsweet"},
				{search:["title","caption"],find:"harvesting the Mystical Paddock",ret:"adopt_foalmysticalgrove"},
				{search:["title","caption"],find:"harvesting the Mystical Pasture",ret:"adopt_calfmysticalgrove"},
				{search:["title","caption"],find:"needs a few Flower Drinks to help their Social Sheep!",ret:"fruitsmoothies"},
				{search:["title","caption"],find:"harvesting the Space Pasture",ret:"adopt_calfspace"},
				{search:["title","caption"],find:"harvesting the Space Paddock",ret:"adopt_foalspace"},
				{search:["title","caption"],find:["found Sprouting Orb to share with you while visiting their Gifting tree","is making progress on their Gifting Tree and wants you to claim their spare parts","Gifting Tree"],ret:"mat_giftingtree"},
				{search:["title","caption"],find:"found a 4th Birthday Pegacorn and wants to share one with you",ret:"adopt_foal4thbirthdaypegacorn"},
				{search:["title","caption"],find:"found a 4th Birthday Mare and wants to share one with you",ret:"adopt_foal4thbirthdaymare"},
				{search:["title","caption"],find:"found a 4th Birthday Unicorn and wants to share one with you",ret:"adopt_foal4thbirthdayunicorn"},
				{search:["title","caption"],find:"Oz Unicorn Baby and wants to share one with you",ret:"adopt_foaloz"},
				{search:["title","caption"],find:"would prefer to vacation with 'Family'",ret:"mysterygamedart"},
				{search:["title","caption"],find:"would prefer to vacation with 'Friends'",ret:"turbocharger"},
				{link:"Join Jockey Scales",ret:"sendhelp"},
				{search:["title","caption"],find:"found some Iris Rainbow to share with you",ret:"seed_irisrainbow"},
				{link:"Join Search Party",ret:"sendhelp"},
				{link:"Get Water Dish",ret:"sendhelp"},
				{link:"Get Stormy Cloud Tree",ret:"tree_stormycloud"},
				{link:"Get a snip",ret:"snip"},
				{search:["title","caption"],find:"just found a Pink Zonkey",ret:"adopt_foalpinkzonkey"},
				{search:["title","caption"],find:"sharing Volcanic Rock",ret:"volcanicrock"},
				{search:["title","caption"],find:"is sharing White Sand",ret:"whitesand"},
				{link:["Get Blue Seawater","Get Seawater"],ret:"blueseawater"},
				{link:"Send Mining Pickaxe",ret:"miningpickaxe"},
				{link:"Send Mining Key",ret:"miningkey"},
				{search:["title","caption"],find:"harvesting the Pegasus Pen",ret:"adopt_foalpegasuspen"},
				{link:"Get Stormy Cloud",ret:"cloud_stormy"},
				{link:"Get Sunset Cloud",ret:"cloud_sunset"},
				{link:"Get Moon Cloud",ret:"cloud_moon"},
				{link:"Get Rainbow Cloud",ret:"cloud_rainbow"},
				{link:"Get Wispy Cloud",ret:"cloud_wispy"},
				{link:"Get Wipsy Cloud",ret:"cloud_wispy"},
				{search:["title","caption"],find:"Prehistoric Foal Fairy",ret:"adopt_foalprehistoricfairy"},
				{link:"Adopt Jungle Colt",ret:"adopt_foaljunglecolt"},
				{search:["title","caption"],find:"found a Sea Pegasus and wants to share one with you",ret:"adopt_horseseapegasus"},
				{search:["title","caption"],find:" making progress on their Jade Treasure",ret:"trowel"},
				{search:["title","caption"],find:["making progress on their diamond mine","is making progress on their iron mine","is making progress on their gold mine"],ret:"mat_australiantreasure"},
				{link:"Get Items:twistedlavenderr",ret:"tree_twistedlavenderredbud"},
				{link:"Join Clean Up Crew",ret:"sendhelp"},
				{search:["title","caption"],find:"is making progress on their Botanical Treasure",ret:"mat_botanicaltreasure"},
				{search:["title","caption"],find:"found a Sea Hippocamp and wants to share one with you!",ret:"adopt_foalseahippocamp"},
				{search:["title","caption"],find:"found a Sea Colt and wants to share one with you!",ret:"adopt_foalseacolt"},
				{link:"get giant sprinkled egg tr",ret:"tree_giantsprinkledegg"},
				{link:"get giant april showers tr",ret:"tree_giantaprilshowers"},
				{link:"get spring wildflowers tre",ret:"tree_springwildflowers"},
				{link:"get giant st. patrick's tr",ret:"tree_giantst.patrick's"},
				{link:"get a wish",ret:"unicornwishes"},
				{search:["title","caption"],find:"needs a few wishes to help their Dream Unicorn",ret:"unicornwishes"},
				{search:["title","caption"],find:"just found a Red Sun Colt",ret:"adopt_foalredsuncolt"},
				{link:"Notifications:xalquests-05",ret:"sendhelp"},
				{link:"Help ",ret:"sendhelp"},
				{link:"Get a Orchid Stallion!",ret:"adopt_horseorchidstallion"},
				{link:"Send Coral Key",ret:"coralkey"},
				{link:"Send Coral Crowbar",ret:"coralcrowbar"},
				{search:["title","caption"],find:"is giving away extra Coral Crowbars to celebrate",ret:"coralcrowbar"},
				{search:["title","caption"],find:"parts to help upgrade their orchard",ret:"mat_orchardupgrade"},
				{link:"Get Items:giantnewyearhat",ret:"tree_giantnewyearhat"},
				{link:"Get Items:wishingfountain",ret:"drillbit"},
				{link:"Get a Honeybee",ret:"honeybee"},
				{link:"get a sample",ret:"sample"},
				{link:"get help on your farm",ret:"farmhand"},
				{link:"send mallet",ret:"mallet"},
				{url:"mystery_seeds_halfway",ret:"wateringcan"},
				{url:"mysterybaby_fullygrown",ret:"animalfeed"},
				{link:"gopher treat",ret:"gophertreat"},
				{link:"bird feed",ret:"birdfeed"},
				{link:"love potion",ret:"lovepotion"},
				{link:"pile on",ret:"sendhelp"},
				{link:"Notifications:weddingescap",ret:"sendhelp"},
				{search:["title","caption"],find:"has just completed a Farmville Atlantis challenge",ret:"sendhelp"},
				{search:["title","caption"],find:"has just completed Imber's latest Enchanted Pond Challenge",ret:"sendhelp"},
				{link:"get baby fairy frogs",ret:"sendhelp"},
				{search:["title","caption"],find:"needs some Chow to grow",ret:"pigchow"},
				{search:["title","caption"],find:"large troll",ret:"mat_magicmushroom"},
				{search:["title","caption"],find:["medium troll","small troll"],ret:"mat_vialofsunlight"},
				{search:["title","caption"],find:"expanding their market stalls",ret:"mat_marketstall"},
				{search:["title","caption"],find:"uncovered",ret:"none",kids:[
					{search:["title","caption"],find:"trapped in ice",ret:"mat_snowtreasure"},
					{search:["title","caption"],find:"trapped in a treasure",ret:"mat_hawaiiantreasure"},
					{search:["title","caption"],find:"hidden in a tomb",ret:"mat_tombtreasure"},
					{search:["title","caption"],find:"hidden in a treestump",ret:"mat_holidaytreasure"},
				]},
				{search:["title","caption"],find:["has rescued","troll's evil enchantment","leftover magical powers"],ret:"mat_trolltreasure"},
				{search:["title","caption"],find:"rainbow butterfly ii",ret:"tree_bonsairainbowbutterfly"},
				{link:"get material",ret:"none",kids:[{search:["title","caption"],find:"spooky home",ret:"sendhelp"},]},
				{link:"get some chow",ret:"pigchow"},
				{link:"get treat",ret:"felinetreat"},
				{search:["title","caption"],find:"found some dry food",ret:"dryfood"},
				{search:["title","caption"],find:["found some canned food"],ret:"cannedfood"},
				{img:"eadf257ee6373da8de7f71de6c7a4e1c",ret:"cannedfood"},

				{link:["decorate","let them know"],ret:"sendhelp"},
				{link:"collect 50 zp",ret:"zp"},
				{link:"collect 50 sp",ret:"sp"},
				{link:"collect 50 cp",ret:"cp"},
				{link:"collect 50 fp",ret:"fp"},
				{link:"collect 50 ap",ret:"ap"},
				{link:"collect 50 gp",ret:"gp"},
				{link:"collect 50 candy points",ret:"cndp"},
				{link:"collect 100 coconuts",ret:"coconuts"},
				{link:"give and get",ret:"none",kids:[
					{search:["title","caption"],find:"{%1}",subTests:materials,ret:"{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},
				]},
				{link:"accept and send",ret:"none",kids:[
					{search:["title","caption"],find:"{%1}",subTests:materials,ret:"{%1}"},
					{search:["title","caption"],find:"Pink Boat Orchid",ret:"bulb_pinkboatorchid"},
				]},
				{search:["title","caption"],find:["is asking their friends for","needs a few","looking for","is helping","send some","to help","they're sharing","needs"],ret:"none",kids:[
					{link:["send","give","help"],ret:"sendhelp"},
					{link:"get",ret:"none",kids:[{search:["title","caption"],find:["asking their friends","sharing","needs a few","looking for","helping","needs"],ret:"sendhelp"},]},
					{link:"adopt",ret:"none"},
				]},
				{search:["title","caption"],find:["is sharing extra","is sharing"],ret:"none",kids:[
					{link:["send materials","send building parts","send parts"],ret:"sendmat"},
					{search:["title","caption"],find:"is sharing a free {%1}",subTests:materials,ret:"{%1}"},
					{link:["send","help"],ret:"sendhelp"},
					{link:"get {%1}",subTests:materials,ret:"{%1}"},
					{title:"{%1}",subTests:materials,ret:"{%1}"},
				]},
				{link:"adopt turtle",ret:"adopt_turtle",kids:[
					{search:["title","caption"],find:"bred a new baby turtle in their Turtle Pen",ret:"adopt_babyturtle"},
				]},
				{link:"get vial",ret:"sendsnoozepollen"},
				{link:"send mallet",ret:"mallet"},
				{link:"send wheelbarrow",ret:"wheelbarrow"},
				{link:"treasure pick",ret:"sendtreasurepick"},
				{link:"get outfit",ret:"sendmascotoutfit"},
				{url:"animal_mastery",ret:"animalfeed"},
				{url:"crop_mastery",ret:"coins"},
				{both:"turbo",ret:"turbocharge"},
				{both:"mystery dart",ret:"mysterygamedart"},
				{search:["title","caption"],find:"whisperer",ret:"animalfeed"},
				{link:["get a bonus from them","Get a Job reward!"],ret:"coins"},
				{link:"get rewards",ret:"none",kids:[{search:["title","caption"],find:"leaderboard",ret:"coins"},]},
				{url:["AchievementFriendReward","MasteryFriendReward","FertilizeThankFriendReward"], ret:"coins"},
				{search:["title","caption"],find:"Refree Calf",ret:"adopt_calfreferee"},
				{search:["title","caption"],find:"needs your help in the Craftshop!",ret:"bushel_random"},
				{search:["title","caption"],find:"is hosting a barn raising", ret:"sendhelp"},
				{search:["title","caption"],find:"needs more Turkeys for their Turkey Roost", ret:"sendturkey"},
				{search:["title","caption"],find:"ram up for adopt", ret:"adopt_lambram"},
				{search:["title","caption"],find:"ewe up for adopt", ret:"adopt_lambewe"},
				{link:"adopt {%1}", subTests:["piglet","lamb"], ret:"adopt_{%1}"},
				{search:["title","caption"],find:"wandering stallion", ret:"wanderingstallion"},
				{search:["title","caption"],find:["helped find a lost rabbit","is helping the bunnies"], ret:"adopt_rabbit"},
				{search:["title","caption"],find:"yellow cattle", ret:"adopt_calfgelbvieh"},
				{search:["title","caption"],find:"has finished work on their Turtle Pen",ret:"adopt_navyfuschiaspottedturtle"},
				{search:["title","caption"],find:"finished building their Zoo", ret:"adopt_babyelephant"},
				{search:["title","caption"],find:"share this Black Tabby Cat", ret:"adopt_blackkitten"},
				{search:["title","caption"],find:"has a free Himalayan Cat", ret:"adopt_himalayankitty"},
				{search:["title","caption"],find:"has a free Dwarf Blue Sheep",ret:"adopt_sheepdwarfblue"},
				{search:["title","caption"],find:"finished building their Wildlife Habitat", ret:"adopt_porcupine"},
				{search:["title","caption"],find:"just finished building their Sheep Pen", ret:"adopt_ram"},
				{search:["title","caption"],find:"just finished building their Aviary", ret:"adopt_farmgoose"},
				{search:["title","caption"],find:"finished work on their Winter Livestock Pen",ret:"adopt_pigsnowflake"},
				{search:["title","caption"],find:"has a free Red Goat that they want to share", ret:"adopt_redgoat"},
				{search:["title","caption"],find:"finished building their Cow Pasture",ret:"adopt_cowirishmoiled"},
				{search:["title","caption"],find:"finished building their Horse Paddock",ret:"adopt_horsecreamdraft"},
				{search:["title","caption"],find:"just finished building their Baby Playpen",ret:"adopt_foalclydesdale"},
				{search:["title","caption"],find:["just finished building their Winter Pet Run","Holiday St. Bernard"],ret:"adopt_holidaystbernard"},
				{search:["title","caption"],find:"has a free Big Blue Tang Fish",ret:"adopt_bigbluetangfish"},
				{search:["title","caption"],find:"has a free Treasure Seagull",ret:"adopt_treasureseagull"},
				{search:["title","caption"],find:"has a free Striped Possum",ret:"adopt_stripedpossum"},
				{search:["title","caption"],find:"has a free Lesser Flamingo",ret:"adopt_lesserflamingo"},
				{search:["title","caption"],find:"has a free Black Horse",ret:"adopt_horseblack"},
				{search:["title","caption"],find:"has a free White Pig",ret:"adopt_pigwhite"},
				{search:["title","caption"],find:"has a free Red Cow",ret:"adopt_cowred"},
				{search:["title","caption"],find:["has finished work on their Winter Zoo","Snow Leopard"],ret:"adopt_snowleopard"},
				{search:["title","caption"],find:"finished building their Baby Bunny Hutch",ret:"adopt_whitedaisybunny"},
				{search:["title","caption"],find:"just completed this week's raffle and has extra tickets for you!",ret:"raffleticket"},
				{search:["title","caption"],find:"was able to get {%1}", subTests:["arborist","farmhand","100 xp"], ret:"{%1}"},
				{search:["title","caption"],find:"of the following items: {%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				{link:"claim",ret:"none",kids:[{search:["title","caption"],find:"of the following items: {%1}",subTests:["moon","shamrock","horseshoe"],ret:"luckycharms"},]},
				{search:["title","caption"],find:"is farming with fewer clicks", ret:"vehiclepart"},
				{search:["title","caption"],find:"special Greenhouse crops and just surpassed", ret:"specialdelivery"},
				{caption:"your crops are no longer withered", ret:"fuel"},
				{search:["title","caption"],find:"celebration by claiming Animal Feed",ret:"animalfeed"},
				{search:["title","caption"],find:"decorating their farm with a wonderful",ret:"none",kids:[
					{search:["title","caption"],find:"{%1} of their own creation",subTests:["shack","house","cottage","villa","mansion"],ret:"mat_dreamhouse"},
				]},
				{search:["title","caption"],find:"started working on their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{link:"claim pink gladiolas",ret:"bulb_pinkgladiolas"},
				{link:"help out",ret:"sendhelp"},
				{link:"reward",ret:"coins"},
				{link:"apple barrel",ret:"applebarrel"},
				{link:"apple wood basket",ret:"applewoodbasket"},
				{link:"get apple core",ret:"sendapplecore"},
				{link:"get apple",ret:"apple"},
				{link:["get a trick"],ret:"tricks"},
				{link:["get rope","claim rope"],ret:"rope"},
				{link:"send lemon",ret:"sendlemon"},
				{link:"get lemon basket",ret:"lemonbasket"},
				{search:["title","caption"],find:"lemon bushel",ret:"lemonbasket"},
				{link:"raffle ticket",ret:"raffleticket"},
				{link:["send tarot card","get tarot card"],ret:"tarotcard",kids:[
					{img:"2b57851ff624d149c87d1d6fb253d664",ret:"tarot_past"},
					{img:"cc090175c5492de0bee2b63dc929903c",ret:"tarot_present"},
					{img:"cefe00adfdac7973a6a515193f466b68",ret:"tarot_future"},
				]},
				{link:["get saddle","claim saddle"],ret:"saddle"},
				{search:["title","caption"],find:"is done collecting all the Saddle",ret:"saddle"},
				{search:["title","caption"],find:["Sweet Shop","Butter Mastery","Cream Mastery","Cottage Cheese Mastery","Yogurt Mastery","Kefir Mastery","Swiss Mastery","Brie Mastery",
				"Cheddar Mastery","Mozzarella Mastery","Banana Milkshake Mastery","Strawberry Milkshake Mastery","Chocolate Milkshake Mastery",
				"Vanilla Milkshake Mastery","Banana Yogurt Mastery","Strawberry Cottage Cheese Mastery","Chocolate Kefir Mastery","Vanilla Kefir Mastery",
				"Chocolate Gelato Mastery","Vanilla Gelato Mastery","Chocolate Ice Cream Mastery","Strawberry Ice Cream Mastery","Yarn Barn","leveled up their dairy farm",
				"Alpaca Yarn Mastery","Angora Scarf Mastery","Angora Yarn Mastery","Bedazzled Beret Mastery","Beret Mastery","Cotton Thread Mastery",
				"Cotton Yarn Mastery","Crochet Blanket Mastery","Cuddly Sweater Mastery","Dress to Impress Mastery","Friendship Bracelet Mastery",
				"Friendship Bracelet Mastery","FV Sparkle Sweater Mastery","Gloves Mastery","Rainbow Scarf Mastery","Red Sweater Mastery","yarn barn orders","dairy farm orders",
				"Sew Glove-ly Mastery","Sock Puppet Mastery","Sweater Dress Mastery","Wool Rug Mastery","Wool Thread Mastery","Wool Yarn Mastery","Wooly Socks Mastery","leveled up their yarn barn","while playing bingo",
				"magic gumball cookies","pixie pie crust","double frosted cupcakes","snap jelly fizz","mint meringue surprise","snazz berryshake","bubble brittle",
				"sugar buttons","angel cake","crushed candy","candy concoction","cream delight","pastry dough","star drops","unicorn fizz","fuzzy float","fantastic frosting",
				"marshmallow mousse","rainbow potion","peppy punch","confectioner's sugar","raw sugar","taffy tango","pega tarts","dressing toppings","apple carrot crate mastery","bit mastery","boots mastery",
				"braids mastery","bridle mastery","chaps mastery","cowboy hat mastery","curry comb mastery","dandy brush mastery","deep bow mastery","dressings mastery",
				"endurance mastery","fabric mastery","face masks mastery","feed tub mastery","gaits mastery","grade-a fodder mastery","grooming kit mastery",
				"hair ribbons mastery","halter mastery","hay bundle mastery","hoof boot mastery","hoof pick mastery","hoof polish mastery","horseshoe mastery",
				"lasso mastery","leg wraps mastery","lessons mastery","meal mastery","metal mastery","pleather mastery","rank mastery","saddle mastery",
				"saddle blanket mastery","splint boots mastery","spurs mastery","stirrups mastery","wash cloth mastery","water pail mastery","water trough mastery",
				"water tub mastery","bliss serum mastery","blue bubble brew mastery","bottled tonic mastery","chalice mastery","charmed mastery","charmed chalice mastery",
				"cloudy concoction mastery","cup of cordial mastery","dash of fortune mastery","daughter of flora mastery","dream draft mastery","elixir philter mastery",
				"enchanted elixir mastery","enchanted recipe mastery","fire breath drink mastery","golden balsam mastery","herb bundle mastery","itching powder mastery",
				"light in a bottle mastery","magical mushroom mastery","melody mix mastery","night glow mastery","peppy potion mastery","pixie potpourri mastery",
				"pixie powder mastery","red remedy mastery","soothing salve mastery","sweet syrup solution mastery","tickled pink mastery","tingled tonic mastery","unlocked a horse in Elite Horses"],ret:"specialdelivery"},
				{link:"adopt saddle foal",ret:"adopt_foalsaddle"},
				{search:["title","caption"],find:"found an adorable Saddle foal",ret:"adopt_foalsaddle"},
				{search:["title","caption"],find:"found a Firefly Horse while harvseting the Baby Playpen",ret:"adopt_horsefirefly"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Spooky Paddock",ret:"adopt_foalspooky"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Haunted Pasture",ret:"adopt_calfspooky"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Joyful Horse Paddock",ret:"adopt_foaljoyful"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Glen Paddock",ret:"adopt_foalglen"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Glen Pasture",ret:"adopt_calfglen"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Atlantis Paddock",ret:"adopt_foalatlantis"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Atlantis Pasture",ret:"adopt_calfatlantis"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Australian Paddock",ret:"adopt_foalaussie"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Australian Pasture",ret:"adopt_calfaussie"},
				{search:["title","caption"],find:["Bamboo Fortune"],ret:"smallaxe"},
				{search:["title","caption"],find:["Stone Fortune"],ret:"wheelbarrow"},
				{search:["title","caption"],find:["Water Fortune"],ret:"boathook"},
				{url:"BambooTreasure",ret:"smallaxe"},
				{url:"RockTreasure",ret:"wheelbarrow"},
				{url:"WaterBottleTreasure",ret:"boathook"},
				{url:"WaterTreasure",ret:"smallfishingnet"},
				{search:["title","caption"],find:"help grow their feline",ret:"cannedfood"},
				{search:["title","caption"],find:["Extra Large Buried Treasure","Large Buried Treasure"],ret:"largecrowbar"},
				{search:["title","caption"],find:["Medium Buried Treasure","Small Buried Treasure"],ret:"smallcrowbar"},
				{search:["title","caption"],find:["Extra Large Sea Treasure","Large Sea Treasure"],ret:"largefishingnet"},
				{search:["title","caption"],find:["Medium Sea Treasure","Small Sea Treasure"],ret:"smallfishingnet"},
				{search:["title","caption"],find:["Extra Large Snow Treasure","Large Snow Treasure"],ret:"pickaxe"},
				{search:["title","caption"],find:["Medium Snow Treasure","Small Snow Treasure"],ret:"hairdryer"},
				{search:["title","caption"],find:["Medium Tomb","Small Tomb"],ret:"stonepick"},
				{search:["title","caption"],find:["Extra Large Tomb","Large Tomb"],ret:"mallet"},
				{search:["title","caption"],find:["Extra Large Treestump","Medium Treestump"],ret:"powersaw"},
				{search:["title","caption"],find:["Large Treestump","Small Treestump"],ret:"lumberjacksaw"},
				{search:["title","caption"],find:["Extra Large Troll","Large Troll"],ret:"magicmushroom"},
				{search:["title","caption"],find:["Medium Troll","Small Troll"],ret:"vialofsunlight"},
				{search:["title","caption"],find:"has finished building an Grove",ret:"mat_grove"},
				{search:["title","caption"],find:["Medium Treasure Chest","Small Treasure Chest"],ret:"coralkey"},
				{search:["title","caption"],find:["Large Clamshell","Extra Large Clamshell"],ret:"coralcrowbar"},
				{link:["get materials","get extra materials"],ret:"none",kids:[{search:["title","caption"],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},]},
				//{link:"get {%1}",subTests:otherConsumables,ret:"{%1}"},
				{link:"screwdriver",ret:"screwdriver"},
				{search:["title","caption"],find:"is done collecting all the Screwdriver",ret:"screwdriver"},
				{search:["title","caption"],find:"grew up into a Cow in their Nursery Barn",ret:"adopt_calfbaby"},
				{search:["title","caption"],find:["supplies and just surpassed","is stocking their Harvest Bonfire with supplies","to help stock their friends' Harvest Bonfires!"], ret:"bonfiresupplies"},
				{link:["get log","claim log"],ret:"log"},
				{link:"send fire log",ret:"sendfirelog"},
				{search:["title","caption"],find:"pink patch calf bull",ret:"adopt_calfpinkpatchbull"},
				{link:"holiday gift",ret:"holidaygifts"},
				{img:"58fc1d30b0a983020037300f97eb8a51",ret:"adopt_calfbull"},
				{img:["779616a6e230fcdb2c19c8bcd21154a4","2F779616a6e230fcdb2c19c8bcd21154a4"],ret:"boathook"},
				{img:"7ac2abf70fe1f3792247d4a4bf22f966",ret:"raindrop"},
				{img:"0a17cd7cd76a9dd884a9d6d56899be2d",ret:"magicmaple"},
				{img:"839a51f8d3cb6b047d886bea14502ae4",ret:"fairydust"},				
				{search:["title","caption"],find:["found an adorable calf","found a Calf"],ret:"adopt_calfbaby"},
				{search:["title","caption"],find:"filled their Holiday Tree to earn a special gift",ret:"holidaygifts"},
				{link:"north-polarized goggles",ret:"sendpolarizedgoggles"},
				{link:"get one",ret:"none",kids:[
					{search:["title","caption"],find:"Magic Snowman",ret:"snowmanparts"},
					{search:["title","caption"],find:"sharing a few presents to fill up your Holiday Tree",ret:"holidaygifts"},
				]},
				{link:"vote now",ret:"none",kids:[
					//{search:["title","caption"],find:"naughty or nice",ret:"stockingstuffer"},
					//{search:["title","caption"],find:"ideal vacation",ret:"dreamvacation"},
					//{search:["title","caption"],find:"perfect pet",ret:"perfectpet"},
					//{search:["title","caption"],find:"charming vineyard",ret:"charmingvineyard"},
					//{search:["title","caption"],find:"statue",ret:"statue"},
					//{search:["title","caption"],find:"perfect job",ret:"perfectjob"},

					
				]},
				{img:"39e49b2e0b1035f67ae8cca0ae1b72c2",ret:"egg_egginjeans"},
				{img:"e3593e5c7c796def3e734cdc82e3b854",ret:"sendwarmthermos"},
				{img:"252a7c266ba8f9274db69e6b77d610a1",ret:"sendwinterchili"},
				{link:"claim {%1}",subTests:["goo","sack","scoop","belt"],ret:"{%1}"},
				{link:"become a judge",ret:"sendjudge"},
				{search:["title","caption"],find:"Romatic Carriage",ret:"mat_romanticcarriage"},
				{link:"get",ret:"none",kids:[{search:["title","caption"],find:"{%1}",subTests:craftingMaterials,ret:"{%1}"},]},
				{link:"adopt grass pony",ret:"adopt_foalgrasspony"},
				{link:"get trinket",ret:"sendbabydolltrinket"},
				{link:"diamond ewe",ret:"adopt_diamondewe"},
				{link:"bring on the lava",ret:"mat_volcanoreef"},
				{link:"pick axe",ret:"pickaxe"},
				{link:["shamrock","moon","horseshoe"],ret:"none",kids:[{search:["title","caption"],find:"Lucky Rainbow",ret:"luckycharms"},]},
				{search:["title","caption"],find:"thrilled with the Lighted Tiki Torch",ret:"lightedtikitorch"},
				{link:"build a volcano",ret:"mat_volcanoreef"},
				{link:"get feed",ret:"animalfeed"},
				{search:["link","title","caption"],find:["double avatar","2x avatar"],ret:"doubleavatar"},
				{search:["title","caption"],find:"care package",ret:"carepackage"},
				{img:["f0b0589808ceddd836deef88f4235402","c4e6e4f5633662470d91c75a8e682feb","80bb93b0b14050bc2db9e47877a0a274","addc3659c1e10368ae062c0a8358b281"],ret:"mat_hawaiiantreasure"},
				{url:"petrun_baby_common",ret:"petrun_common"},
				{url:"petrun_baby_rare",ret:"petrun_rare"},
				{url:"wildlife_baby_common",ret:"wildlife_common"},
				{url:"wildlife_baby_rare",ret:"wildlife_rare"},
				{url:"livestock_baby_common",ret:"livestock_common"},
				{url:"livestock_baby_rare",ret:"livestock_rare"},
				{url:"zoo_baby_common",ret:"zoo_common"},
				{url:"zoo_baby_rare",ret:"zoo_rare"},
				{url:"aviary_baby_common",ret:"aviary_common"},
				{url:"aviary_baby_rare",ret:"aviary_rare"},
				{url:"arctic_baby_common",ret:"arctic_common"},
				{url:"arctic_baby_rare",ret:"arctic_rare"},
				{url:["xhibabybasketcommonfloaty","swimhole_baby_common"],ret:"sea_common"},
				{url:["xhibabybasketrarefloaty","swimhole_baby_rare"],ret:"sea_rare"},
				{url:"xas_babybasketcommonfloaty",ret:"jade_common"},
				{url:"xas_babybasketrarefloaty",ret:"jade_rare"},
				{search:["title","caption"],find:"is sharing a free Hopper from DISH and wants you to have one",ret:"adopt_hopperfromdish"},
				{url:"xhi_reef_expansionComplete",ret:"mat_volcanoreef"},
				{img:"b5ef8d15cd6eb476b86ddc660476c04a",ret:"mat_snowtreasure"},
				{search:["title","caption"],find:"wooden plank",ret:"woodplank"},
				//{url:"fuel",ret:"fuel"},
				{desc:"coins",ret:"{%1}"},
				//{link:"get {%1}",subTests:materials,ret:"{%1}"},
				{link:["help and get","get"],ret:"none",kids:[
					{search:["title","caption"],find:["April Showers","Mother's Day"],ret:"sendhelp"},
				]},
				{title:"finished building an {%1}",subTests:buildings,ret:"mat_{%1}"},
				{title:"is working hard on an {%1}",subTests:buildings,ret:"mat_{%1}"},
				{title:"is working hard on a {%1}",subTests:buildings,ret:"mat_{%1}"},
				{search:["title","caption"],find:"building",ret:"none",kids:[
					{search:["title","caption"],find:"gigantic {%1}",subTests:buildings,ret:"mat_{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},
				]},
				{search:["title","caption"],find:"has extra parts",ret:"none",kids:[{search:["title","caption"],find:"{%1}",subTests:materials,ret:"{%1}"},]},
				{search:["title","caption"],find:"is giving away extra {%1}",subTests:materials,ret:"{%1}"},
				{title:"has an extra {%1}",subTests:materials,ret:"{%1}"},
				{link:["get one","some","bonus","get gift"],ret:"none",kids:[
					{search:["title","caption"],find:"coins",ret:"coins"},
					{search:["title","caption"],find:"flame pepper seeds",ret:"seeds_flamepepper"},
					{search:["title","caption"],find:"goos",ret:"goo"},
					{search:["title","caption"],find:"found some {%1} ",subTests:standardMaterials,ret:"{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:specialEvents,ret:"{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:otherConsumables,ret:"{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:standardMaterials,ret:"{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:specialMaterials,ret:"{%1}"},
					{search:["title","caption"],find:["big picnic","picnic basket"],ret:"picnicbasket"},
					{search:["title","caption"],find:["ice cream","giant sundae"],ret:"icecream"},
					{search:["title","caption"],find:"magic snowflake",ret:"snowmanparts"},
					{search:["title","caption"],find:"holiday gift",ret:"holidaygifts"},
					{search:["title","caption"],find:"stocking stuffer",ret:"stockingstuffer"},
					{search:["title","caption"],find:["cupid bow","pair of wings","love arrow"],ret:"tokenofaffection"},
					{search:["title","caption"],find:["shamrock","moon","horseshoe"],ret:"luckycharms"},
					{search:["title","caption"],find:"shovels",ret:"shovel"},
					
				]},
				{title:"has built their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{title:"just found a",ret:"none",kids:[
					{search:["title","caption"],find:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
					{search:["title","caption"],find:"{%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
					{search:["title","caption"],find:"{%1} yak",subTests:yakTypes,ret:"adopt_yak{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:babyAnimals,ret:"adopt_{%1}"},
				]},
				{link:"help and get one",ret:"sendhelp"},
				{link:"Get the Tiki Torch",ret:"lightedtikitorch"},
				{search:["title","caption"],find:"Big Candy Pumpkin",ret:"tree_giantcandypumpkin"},
				
				{search:["title","caption"],find:"avatar costume",ret:"costume",kids:[
						//static-0.farmville.zgncdn.com/assets/hashed/
						{img:"2613b0e7b51fa559642d5327264ae88b",ret:"costume_pamperedprincess"},
						{img:"6d5a278f8928c05128e09249dbfe4067",ret:"costume_sensiblesunbather"},
						{img:"6253bd20890c5c174a0df5f17d10086c",ret:"costume_casualtraveler"},
						{img:"de8a7457788f439dc31e8d74e51de514",ret:"costume_practicallounger"},
						{img:"2e108b39b850a1af884c6109edd56cd0",ret:"costume_outdoorexplorer"},
						{img:"096da69403ca8a64c202f38611968c76",ret:"costume_spontaneousadventurer"},
						{img:"cfe6812589f5c77091865ecfb30b84f0",ret:"costume_wildspirit"},
						{img:"eb4b576243d01a47d47478515b739ca9",ret:"costume_teddybear"},
						{img:"d89b62ce659649a17a200be6c9ca7289",ret:"costume_koala"},
						{img:"bb6ccdfef16d514c5adecf18a8f6075f",ret:"costume_cat"},
						{img:"27de181336b60fc59a8363e97a902441",ret:"costume_hamster"},
						{img:"0e9c8baa8aaa9ef595814d1c036d0b70",ret:"costume_dog"},
						{img:"dd2e0af021c9030c80f398a584fbf157",ret:"costume_monkey"},
						{img:"8dba7c7b5286c06a71961d6f35a3a8e7",ret:"costume_lion"},
						{img:"d398f39aa59eb5633480844fffdf9db6",ret:"costume_tiger"},
						{search:["title","caption"],find:"{%1}",subTests:avatar,ret:"{%1}"},
				]},
				
				{link:"claim it",ret:"none",kids:[
					{img:"2057bb48e6218f7872275a5f598f3dbe",ret:"tree_giantpoinsettia"},
					{img:"1daac2a32f3cff1e9d1e6be36d1ccb00",ret:"snowdrift"},
					{img:"f0bb0874eebe3f8b82f2cfa08fbaf7d2",ret:"horsesnowglobe"},
					{img:"a1fba272cce026483331d5a3b51da743",ret:"lightedhedge"},
					{img:"9ef18f3747eaedc97e8b12ded42ff7b9",ret:"carolingsnowman"},
					{img:"2d0fb731d3219e543b031dbd6ed17062",ret:"teddybearsnowglobe"},
					{img:"386facd490ae76cf31876845a0893ab7",ret:"adopt_carolinggoat"},
					{img:"afa8195c0a7a49514464a45faa1b6132",ret:"luminaryfence"},
					{img:"c27998b5e780e9363db27db71a10c73d",ret:"coal"},
					{img:"b42c0a157197ceb896afe22ec4c0e48f",ret:"animalfeed"},
					{img:"417d2412991bdc6c5941e876b617071f",ret:"railspike"},
					{img:"77bc73ef224bd9b0bd70e53a51c11d47",ret:"railtie"},
					{img:"18bb508499a8369017208586170d3cf0",ret:"wateringcan"},
					{img:"890e543735401b5e5325d214805aa029",ret:"arborist"},
					{img:"4b8cc80501cc6d433b47b19bf3512337",ret:"farmhand"},
					{img:"83162ebbc9e06677ef8121ef01906efe",ret:"fertilizeall"},
					{img:"eba8a91b33b34f0f6505aad21a367990",ret:"frozenfountain"},
					{img:"0e79859e7349415c5592bbc9bd9b1d58",ret:"log"},
					{img:"b2144f972c0354950e7633b4bc3bc20a",ret:"stone"},
					{img:"669e1eb90c73dfcc6342375aa2db67a1",ret:"steelbeam"},
					{img:"3744842e1fd51242cc9b7c0da72f212e",ret:"hairdryer"},
					{img:"aad46346769a3e818e5b3d233dc1443c",ret:"pickaxe"},
					{img:"faf5bc0d1a4fef592f4b47b25ccc5196",ret:"stringlights"},
					{img:"9db417e17c47331f0175b7abc0116838",ret:"hollyfence"},
					{img:"cc77d40e3812adc785bfcdd2b2ff007d",ret:"giantcandy"},
					{search:["title","caption"],find:"Giant Cupid Tree",ret:"tree_giantcupid"},
					{search:["title","caption"],find:"Nomadic Horse",ret:"adopt_horsenomadic"},
				]},
					
				{search:["title","caption"],find:"making good progress",ret:"none",kids:[
					{img:"f77442b5256ee2bf9374ea0572441f0a",ret:"holidaylights"},
					{img:"31a21629cef1a7ee9d048fbdcdd2300d",ret:"silverbell"},
					{img:"27a8b5c7730f0aff50da3aeca3e21a56",ret:"gps"},
					{img:"69f5031238453052f285d00d1538a9ca",ret:"snowflake"},
					{img:"2b2e8ba2c576a3a672d5d440e9e58cde",ret:"snowbrick"},
					{img:"cae16ae007e478c63228b8a3198bf1a2",ret:"icenail"},
					{img:"e2938eba8c6400466b0f5fd1d51ee504",ret:"snowglobe"},
					{img:"f360c4422127142e7d441b7c01a3495b",ret:"frozenbeam"},
					{img:"88e8dfabdd00d14cf62fbeae6a8f24e8",ret:"iceboard"},
				]},
				
				//search icon images to distinguish trees with same body texts
				{link:["get","tree"],ret:"none",kids:[
					{img:"91d2b7a356d56c78d400b765f4539aed",ret:"tree_giantgemii"},
					{img:"30fd8ad645f0641a5352aa65c8974ee9",ret:"tree_giantgem"},
					{img:"4686c180d0bfcd5a9811f6e00d61a562",ret:"tree_bonsairainbowbutterfly"},
					{img:"52a011bb200079418a508678bf954803",ret:"tree_giantparasolii"},
					{img:"0558bead5ff6659411d47c8cc74361be",ret:"tree_giantparasol"},
					{img:"4673dcf1e7bf433be7149340e3ff117c",ret:"tree_sapphirepixie"},
					{img:"9eb0b2f7e365ddac6a9c7df1e3fdd841",ret:"tree_giantwitchhatii"},
					{img:"cea508d772d218778bebcb5cc335b43c",ret:"tree_giantwitchhat"},
					{img:"a01eb4aeba3a645d7df54f6d98e10714",ret:"tree_giantscaryhaunted"},
					{img:"6ad113935990c49d7c4845513c49bd57",ret:"tree_gianthaunted"},
					{img:"a9e6c12bce81cf05c2360215060123e4",ret:"tree_giantwolffullmoon"},
					{img:"170671be865a3a0f5f53445a81d1bc29",ret:"tree_giantfullmoon"},
					{img:"4ffa3631dfb504f01c5413f1f6be5b53",ret:"tree_giantghost"},
					{img:"09ff0203bd4cee8a7d8fe7e0e405e7ab",ret:"tree_giantghostdecoration"},
					{img:"9f5094140636fbc3af0635f40a214850",ret:"tree_giantcornucopiaii"},
					{img:"e6514e9633ad82c128ede4bff7209258",ret:"tree_giantcornucopia"},
					{img:"29de986ef348f56e6796e87ffc12e2d0",ret:"tree_twistedlavenderredbud"},
				]},
				
				//search icon images to distinguish blooms with same body texts
				{link:["get","flower"],ret:"none",kids:[
					{img:"3f3014f5556c728d99d99d087cebd5b1",ret:"bulb_anemoneii"},
				]},
				
				//search icon & stork images to distinguish animals with same body texts
				{link:"adopt",ret:"none",kids:[
				//http://zynga1-a.akamaihd.net/farmville/assets/hashed/
				//{img:["",""],ret:"adopt_"},
					{img:["15e38b30179a04917ff3bab15901b3be","0e2c3c77854ea229b4b571d9e02532e8"],ret:"adopt_calfdragonbull"},
					{img:["a3069e38a97de8d1b84bb053b7156ff3","f47b12167e061b28ee915ca3b7815040"],ret:"adopt_calfdragon"},
					{img:["8f2e3a7c0d14621e01bdfd6bc6c35477","b0435de353e751307db7040b47610c56"],ret:"adopt_foalsteamunicorn"},
					{img:["3d83a5e5791aa3a56126f1acf4123799","a2fc3e466ba8ace4bac48bae0544ed98"],ret:"adopt_foalsteam"},
					{img:"69a9745107f3aaca304d8dc2ab7e97fe",ret:"adopt_foalwaterpegacorn"},
					{img:["d5b29e3eaca146793f85fb7c9c1a83ee","52bd7e1d599384324d88bc61f9c91e35"],ret:"adopt_foalwater"},
					{img:["0df95c3121881eef77a6ef72ab9b12f0","28869ee77ed804c626bee8d5ad36fa23"],ret:"adopt_calfballoon2"},
					{img:["94c1c6072e0449e0002df45089a5680b","e7cc6cc5d5d6bed749394a7c459b134f"],ret:"adopt_calfballoon"},
					{img:["696aee3053c286a166044171f1ca0851","cefe112c1d857bd03c661460ccf7b6be"],ret:"adopt_calfnewyear2"},
					{img:["d827308bf768abf82ecca05cea922a35","12a44e1531e58624d2f3cc868281beed"],ret:"adopt_foalpinatapony"},
					{img:["17ade87a37528d0bb78a9df7f02de2b1","0ba372abc9c3e54c34f451d2c2d7fde5"],ret:"adopt_foalpinata"},
					{img:["a6aa68a317bc02b4983891c7b147e84b","10ff4042630f82410b4e7189ae4f8d21"],ret:"adopt_foalcheerfullscroogi"},
					{img:["d8bf04f415763b9219f8662e9bc87807","d51cebfa246e166e9fde96027de54717"],ret:"adopt_foalorlovtrotter2"},
					{img:["0be9d257d59774cb54eed7abcb383483","c09097904ab62f3ba1c8ae3d4d7bfc39"],ret:"adopt_foalorlovtrotter"},
					{img:["47d95aeb6e7802e4f5b8581dec832b02","8523f9c36c5648a622bf3d6f35a63373"],ret:"adopt_foalnutcrackerpegacorn"},
					{img:["0a6f0d74e144c672e77c29244acb5bdc","ed32a274894869de2303208628500860"],ret:"adopt_foalnutcracker"},
					{img:["6be6f1d4bda076040a48d2cb9007e2ee","f3f2e0853dae91c9b53a4f323f010304"],ret:"adopt_calfinsweater"},
					{img:["29aec17c19666e487d31501ae34190c6","eb6dc2ad5e6cb118fbd882de4c389995"],ret:"adopt_calfinhoodie"},
					{img:"77850262c7056b8f3792cae77716223d",ret:"adopt_calftreat"},
					{img:["bfac37d6f74f7c99749601754794527e","e5bb8c4cb6b64dd84027309977dc8bb6"],ret:"adopt_foalspectralpegasus"},
					{img:["ee910c3a0f08870c342002f8f4b6b110","7365034c23b759afb98fed19611acfd1"],ret:"adopt_foalspectral"},
					{img:["6ccf995298e4220a18256569a4a80cf3","1d733b6b2fb5df3c11de3410c48288dc"],ret:"adopt_foalvampiredonkey"},
					{img:["ea3d7e72d71415e98334887281990975","81af946796c59ee5cb7c67de2864aebc"],ret:"adopt_foalsunflower"},
					{img:["8f9cf0f826541af183d8f59a30012330","657627d4f0160a39d5bd0959c2e53d87"],ret:"adopt_foaldoleyellow"},
					{img:["063f52aba61132730477047744c4c943","36d07749a7582a6310132417816b8a69"],ret:"adopt_foalfairy"},
					{img:["66ab06e2df4cfe9de4ba60de581f71a8","6b71661bf0867e5f061823357b47c782"],ret:"adopt_foalfairydonkey"},
					{img:["2a9238c253062bcee86dab7e1c911161","7e45caef2699d79effa6fd2389393643"],ret:"adopt_foalbutterfly"},
					{img:["79a43fee89ceac21c9a008cd123499ea","bd4a686ccc21af6eea1d882805e2bd8a"],ret:"adopt_foalbutterflypegacorn"},
					{img:["7f4aaa8e9e9e4b01ae1f59b0cb767007","09ab00b0063cb11def16b5c32abbdc2b"],ret:"adopt_foalmoonpegasus"},
					{img:["33162f3ee9b0011dbe69308aaf4d5d1a","0e597e22492b1e076b0c2f3b48b63b63"],ret:"adopt_foalsunpegasus"},
					{img:["127c6e61858a37de8e2ab4a3832ebcc8","dd86618ece1bf5557220439a2b622591"],ret:"adopt_foalsun"},
					{img:["fbfca9db6773876ef57ddfd466ff66a6","8828d0f991d4d8cacfa3a2e26d4f7030"],ret:"adopt_calfdracalfla"},
					{img:["58602ac3eeca799e8567f77244681576","949c85344e3e9b7fa0129266daa26e26"],ret:"adopt_calfcornucalfpia"},
					{img:["a8f2f8d3804da17d64bbf6dc31422350","d431a9854e28dd1ceef6b23598983889"],ret:"adopt_foalharvestunicorn"},
					{img:["cdb04021f7e0e6e0bf0eb30c0e1ca9e4","d9eafec7506bcbec9f5c96aa760a2cab"],ret:"adopt_foalharvestpony"},
					{img:["d7bb6b64fc1213dcd878dcb3a95750d6","c6cbea42e5b38798c7440f3b00778c42"],ret:"adopt_foalharvest"},
					{img:["411a43b84bd40d977d8bea671d00b0d3","d4af71ac7d9b0a0bbb04509731f97a5d"],ret:"adopt_foalthanks"},
					{img:["299431eb6cbca041989ea28c082e0a69","b80ad39bc2b850c35ad03bf612576c51"],ret:"adopt_calffoal"},
					{img:["52dfb5b55c576a52e941633b63d47136","4adead082d97cafaf6efa334d1be151d"],ret:"adopt_foalfranken"},
					{img:["825e1a986e07f18da5eb43c55787f2e0","4d67bb5061a42c1abd912e5df7b716b5"],ret:"adopt_foalblacksteed"},
					{img:"9ee5049ff3099dda4e804b50040b6be7",ret:"adopt_foalblack"},
					{img:["4904ae11f0716fdddd790a388aac8a42","1be73edba1b06a04a9be489ec1a31291"],ret:"adopt_foalsapphireunicorn"},
					{img:["3557da7e314c350bfc910c5e3814f1c0","66a212abb18125402fd82a8071c813af"],ret:"adopt_foalsapphire"},
					{img:["422a3ef58b40432f6faf2445f1ba7d82","b4667059e622c0ad3dce6e306619acab"],ret:"adopt_foalamethystunicorn"},
					{img:["9f4db4cad33bc58ae73d7dcacd103e80","79a243b24ca67ff27a4ec5fdac1c7635"],ret:"adopt_foalamethyst"},
					{img:["1d3980e4a5780f6cfe63ee4e187290c2","484c39d894fd448e0cc5da19883d2eab"],ret:"adopt_foalmoonsteed"},
					{img:["03d8e5a6250c82aa763b5e0fd17d8bee","8574a8a55004d39b044b3dff36e83a42"],ret:"adopt_foalmoon"},
					{img:["4101550aa6e8542d168d7dcbf5bb1d15","e2935e5d35f7f01a810fb004bb89b3aa"],ret:"adopt_foalcherrypegacorn"},
					{img:["c72dbdd7c1afd0cfcd8437c0599ba09d","c25a050880fa0a90c3234a4b1edfb96c"],ret:"adopt_foalfriendshippegasus"},
					{img:["1ad6ebfe43e67016bfd9bf8ee488bf5d","0303a994fbb2ed7c9a0a9c17729e5d89"],ret:"adopt_foalfriendship"},
					{img:"824290b5bdcd1e702bbdb19e7f3b1a33",ret:"adopt_foalballoonpony"},
					{img:["eec01f8a608e6fde02a908e5f031ffcd","319a871bd4cee80caa1000ba7844293f"],ret:"adopt_foalballoon"},
					{img:["a3296aaf1c2f6ab5235f41038646aa0b","52531c423fa31d46978c5a5404966efa"],ret:"adopt_foalcandycorn"},
					{img:["6c4f8f10802946b4d1c51755548809d9","c0601163daac553e141923dcdc48e0b6"],ret:"adopt_foalcandycornpony"},
					{img:"6f82eb77932eff007e6a955467355681",ret:"adopt_foalnightmaremini"},
					{img:["3809a8b10346e4b290ecfec94ad8da8e","ee48ca0cabfd337abddb077dddd9209d"],ret:"adopt_foalnightmare"},
					{img:["1d9268fc937dda3b4bcd5ab1954ba01b","cb46a3934da7a5f9fd7e6c6c9faa320b"],ret:"adopt_calfholidaybull"},
					{img:["a7a3d17cfd8add6e4cb5bd6198f694b3","a6fd6ad586ac5fb37bd5aba83524f279"],ret:"adopt_calfholidaywreath"},
					{img:["ee174fe3388734c7a21cecee560cd30d","d8d444ea83aa160162e4fa59acc19835"],ret:"adopt_calfholiday"},
					{img:["8829e58a2c7e39fc8e5012d0c8c2f679","7ea063c8cac4c65354366f00ddf58d50"],ret:"adopt_foalwhitepegasus"},
					{img:["fd885b15f91752e200c0ebf0b58d6c5d","7e01d7f3c6e6940d4b98cc74321be3e3"],ret:"adopt_foalgypsystallion"},
					{link:"Items:foal_gypsy_st",ret:"adopt_foalgypsystallion"},
					{img:["57408b56ed20ae7f71e15f1036489160","c4daef35af7f7256226a7c7680dd9692"],ret:"adopt_foaldiscopony"},
					{img:["9155daa26714cf89f5abeaf706bb6d4c","869cff415e74ac29dfd61c61d7f351a3"],ret:"adopt_foaldisco"},
					{img:["727a79da46ba46d34e6d120d70eeb062","e43bf2f2e70ac9289290020d2e40fbeb"],ret:"adopt_calfnewyear"},
					{img:["5dad5998d9f543dbb4675ef0ac44076c","4f478aa8e1a7c489795a25c5bcec0fac"],ret:"adopt_calfliondance"},
					{img:["a30736e7038302d01883890e0aa45d8e","e54ac8b6e104e93ebd6c318bbb26c7de"],ret:"adopt_foalvalentinepony"},
					{img:["0aabfc003d4d13fcdac155aa09f32544","0955750886dcf3a43f231b593393b622"],ret:"adopt_foalvalentine"},
					{img:["8a84039faad7fbc1a1fac5c79cd0e0c4","37aa58ee438aab5b3a0af6f994c4664d"],ret:"adopt_foalromance"},
					{img:["50926cd51434156b8f4d1b1f9cfde619","8cf02fbcc6c1d9045c5c8951392700c0"],ret:"adopt_foalromancemini"},
					{img:["2cfba1572a2036e92ab170e782935918","7f88a0996956641994848c0b79e04926"],ret:"adopt_calfbullflower"},
					{img:"d98f08f1e8bb5bb788ffd72e76422fbb",ret:"adopt_foalfireflypegacorn"},
					{img:"1c4a03ceaa3cc411f7c4d71b3f1d4d18",ret:"adopt_foalfireflypony"},
					{img:"1cc446cc8415ee741c1b382a842fabc7",ret:"adopt_foalfirefly"},
					{img:"b24865d67e5eb688fdf7f104cb745c59",ret:"adopt_calfcalfstructionworker"},
					{img:["60d3a70aeb3353530de9d0fd3eea65d7","4f4c0b033cd2fdd271a4454340fe65d0"],ret:"adopt_foalgoldenmini"},
					{img:["4a10ac5cfef4bbb50ecfb9d9faed8e43","ea1b2a0f4d074d28a6aed83bcb6928a2"],ret:"adopt_foalgoldenstallionmini"},
					{img:["9a3c74da8488a0bd61ee43849b4a1d95","89263f674488821212132ebc401b9993"],ret:"adopt_foalstarunicorn"},
					{img:["d926a74a59c981d1c307399a3fa3e4e8","5acc468f763190bbfdfc993c908625ac"],ret:"adopt_foalstar"},
					{img:["55af1affde7028ba9f3f4be1161a3fd9","e46fd82d6490a35b456b605a23bccc32"],ret:"adopt_foalcamarguestallion"},
					{img:["e999952b2652f3dc53799119f58506b5","a69891e58e60af069acc6f8864b42748"],ret:"adopt_foalcamargue"},
					{img:["62e722cfe219da98e065cbb1e3390956","5862781a30a49fdae2c2b50ffe66d09b"],ret:"adopt_foalglittering"},
					{img:["2fdbbd27bc3c3d6ff5dea411e67ee601","fc8699e7c62ef4043990b29ed507613d"],ret:"adopt_foalglitter"},
					{img:"c7b32d9c9a4785d9c491bd704fff0215",ret:"adopt_foalsugarpegafoal"},
					{img:"4f94aa9d96e541991ccc47d2f472adbe",ret:"adopt_foalartdecounicorn"},
					{img:"74304370af8d2c265f2ec45f63d347ad",ret:"adopt_foalstrawmanunicorn"},
					{img:"48fcd3b68463263b4f59c264fc86db1f",ret:"adopt_calfspacow"},
					{img:"600fc9d5667791fb57a7b8994668467e",ret:"adopt_foalstayathomepegafoal"},

					
					
				]},
				
				//dino dna
				{search:["title","caption"],find:"{%1} DNA Strand",subTests:dnaTypes,ret:"dna_{%1}"},
				//gems
				{search:["title","caption"],find:"{%1}",subTests:gemTypes,ret:"gem_{%1}"},
				//dragon scales
				{search:["title","caption"],find:"{%1} dragon scale",subTests:scaleTypes,ret:"scale_{%1}"},
				//monster serum
				{search:["title","caption"],find:"{%1} monster serum",subTests:serumTypes,ret:"serum_{%1}"},
				//bonsai cutting
				{search:["title","caption"],find:"{%1} bonsai cutting",subTests:cuttingTypes,ret:"cutting_{%1}"},
				//animal spirit
				{search:["title","caption"],find:"{%1} animal spirit",subTests:spiritTypes,ret:"spirit_{%1}"},
				//fossils
				{search:["title","caption"],find:"{%1} fossil",subTests:fossilTypes,ret:"fossil_{%1}"},
				//pixie dust
				{search:["title","caption"],find:"{%1} pixie dust",subTests:pixieTypes,ret:"pixie_{%1}"},
				//fish scales
				{search:["title","caption"],find:"{%1} fish scale",subTests:fishscaleTypes,ret:"fishscale_{%1}"},
				//horse shoes
				{search:["title","caption"],find:"{%1} horseshoes",subTests:horseshoeTypes,ret:"horseshoe_{%1}"},
				//clouds
				{search:["title","caption"],find:"{%1} cloud",subTests:cloudTypes,ret:"cloud_{%1}"},
				//wildflowers
				{search:["title","caption"],find:"{%1} wildflower",subTests:wildflowerTypes,ret:"wildflower_{%1}"},
				
				
				
				//search calves/foals by link text before materials
				{link:"{%1} baby",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} stud",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} colt",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} pegafoal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{search:["title","caption"],find:"{%1}-foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{search:["title","caption"],find:"{%1}-pegafoal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{search:["title","caption"],find:"while harvseting the Baby Playpen",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{link:"{%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{link:"adopt the calf",ret:"none",kids:[
					{search:["title","caption"],find:"found a {%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
					{search:["title","caption"],find:"Baby Ox",ret:"adopt_calfbabyox"},
				]},
				
				//send
				{link:["give","send","lend"],ret:"none",kids:[
					{link:"and get",ret:"none",kids:[
						{search:["link","title","caption"],find:"animal feed",ret:"animalfeed"},
						{search:["title","caption"],find:"needs another {%1}",subTests:materials,ret:"{%1}"}, //sogo
					]},
					{link:"item to",ret:"sendwishlist"}, //send wishlists
					{link:"{%1}",subTests:["feed","bushel","help","bottle","flower coins"],ret:"send{%1}"}, //specific sends
					{link:"{%1}",subTests:craftingMaterials,ret:"sendbasket"},
					{link:["materials","building parts","parts"],ret:"sendmat"},
					{search:["title","caption"],find:"{%1}",subTests:buildings,ret:"sendmat"},
					{search:["title","caption"],find:"{%1}",subTests:[].concat(materials,otherWords),ret:"sendmat"},
				]},
				
				//building materials by building
				{link:["materials","part"],ret:"none",kids:[
					{link:"{%1}",subTests:materials,ret:"{%1}"}, //<---- added this to avoid marking vehicle parts as goo
					{search:["title","caption"],find:"{%1}",subTests:materials,ret:"{%1}"},
					{search:["title","caption"],find:"{%1}", ret:"none",
						subTests:["upgrading","good progress","addition of a station","half-way","halfway","finished","expanding","completion of","upgrade of","progress on","built a","adding stations","adding a station",
								  "is making progress on their","wants you to claim their spare parts","has so much stuff that they couldn't carry this","working hard to improve","get extra materials"],
						kids:[{search:["title","caption"],find:"{%1}",ret:"mat_{%1}",subTests:buildings}]
					},
					{search:["title","caption"],find:"{%1}",subTests:buildings,ret:"mat_{%1}"},
					{img:"50ae3ca24932a8f905a81a78ea17a6a2",ret:"mat_beehive"},
				]},
				
				//catchall for bushels. here we use body text because link text is sometimes wrong or truncated.
				{search:["title","caption"],find:"bushel", ret:"bushel", kids:[
					{search:["title","caption"],find:"giving away free {%1} bushels",subTests:bushelTypes,ret:"bushel_{%1}"},
					{search:["title","caption"],find:"{%1} bushel",subTests:bushelTypes,ret:"bushel_{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:bushelTypes,ret:"bushel_{%1}"},
				]},
				
				//hatch specific eggs
				{search:["title","caption"],find:"found some treasured {%1} mystery eggs",subTests:eggTypes,ret:"egg_{%1}"},
				{search:["title","caption"],find:"basket full of {%1} eggs",subTests:eggTypes2,ret:"egg_{%1}"},
				{link:["hatch","grab an egg"],ret:"none",kids:[
					{search:["title","caption"],find:"{%1}",subTests:eggTypes2,ret:"egg_{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:eggTypes,ret:"egg_{%1}"},
				]},
				
				//trees
				{search:["title","caption"],find:"{%1}",subTests:["tree","seedling grew up "],ret:"none",kids:[
					{search:["title","caption"],find:"ornament tree II",ret:"tree_ornament2"},
					{search:["title","caption"],find:"{%1}",subTests:["giant","gaint","big","large"],ret:"none",kids:[
						{search:["title","caption"],find:"{%1}",subTests:treeTypes2,ret:"tree_giant{%1}"},
					]},
					{search:["title","caption"],find:"bonsai {%1} ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title","caption"],find:"{%1} bonsai ii",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title","caption"],find:"magic {%1} bonasi",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title","caption"],find:"magic {%1}",subTests:treeTypes3,ret:"tree_bonsai{%1}"},
					{search:["title","caption"],find:"{%1}",subTests:treeTypes,ret:"tree_{%1}"},
				]},
				
				//crafted samples
				{search:["title","caption"],find:"{%1}", subTests:["improved their","learned some new tricks","offering some free sample","now a master","bought some"], ret:"none",kids:[
					//this entry may seem redundant but it actually prevents misidentification mistakes
					{search:["title","caption"],find:"{%1}", subTests:craftTypes, ret:"sample",kids:[
						{search:["title","caption"],find:"level {%1} ", subNumRange:"1,20", ret:"sample1"},
						{search:["title","caption"],find:"level {%1} ", subNumRange:"21,40", ret:"sample2"},
						{search:["title","caption"],find:"level {%1} ", subNumRange:"41,80", ret:"sample3"},
						{search:["title","caption"],find:"level {%1} ", subNumRange:"81,100", ret:"sample4"},
						{search:["title","caption"],find:"level {%1} ", subNumRange:"100,140", ret:"sample5"},						
					]},
					{link:"grab a good",ret:"sample2"},
				]},
				{link:"sample",ret:"sample"}, // prevents "goods" being mistaken for "goo" after other samples have been identified
				{link:"Get a sample",ret:"sample"},
				
				//simply by link texts
				//here we create an array on the fly for special words, then we add other predefined arrays, then we fix the order before searching
				{link:"{%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				
				//order specific crops
				{link:"place order", ret:"order",kids:[
					{search:["title","caption"],find:"{%1}", subTests:bushelTypes, ret:"order_{%1}"},
				]},			
				
				//mystery babies
				{link:["adopt a mystery baby","adopt an egg","adopt a winter baby","adopt a cute baby","adopt a jade baby"],ret:"unknown_baby",kids:[
					//img search
					{img:"ef81171be39fcdcc9f6bb8825fb2e450",ret:"petrun_common"},
					{img:"f87608154a4061f044e4ab92f55f3cfd",ret:"petrun_rare"},
					{img:"f4619e66d335c667128c8dfa92f069ee",ret:"wildlife_common"},
					{img:"0b27e2c1185116002e0475d50dde98b7",ret:"wildlife_rare"},
					{img:"116fd9ef14a14c94aea71f959f99db93",ret:"livestock_common"},
					{img:"1cfd92964ae41c740dfab9b7023271f1",ret:"livestock_rare"},
					{img:"182233e7ca189ea69462039a0b303706",ret:"zoo_common"},
					{img:"6d5347c8dae181c5afb15b03390b69e6",ret:"zoo_rare"},
					{img:"3c1015497c7d352157196c823f6cad63",ret:"aviary_common"},
					{img:"a94a8ddc8286fbc92d51a666ab23da55",ret:"aviary_rare"},
					{img:"183e4a3ba7be02fca7f550989b3a80e1",ret:"arctic_common"},
					{img:"7bf258c9ffdb411fa992b58e9994afc7",ret:"arctic_rare"},
					{img:"57ca62ee6fb4b67333c3bbb4a07f839b",ret:"sea_common"},
					{img:"241413129ffa5dc7e97af3edf0460781",ret:"sea_rare"},
					{img:"c8b7382788c77ff3b61434c4336a44c9",ret:"jade_common"},
					{img:"88bbb027d137cfeb4f8f91f475a15bda",ret:"jade_rare"},
					{img:"db7cf610f60857e9ba3bbec9a11de4ae",ret:"ocean_common"},
					{img:"8aa0550a5911cade1b597d4d7292d4bf",ret:"ocean_rare"},
					
					//body search
					{search:["title","caption"],find:"rare",ret:"none",kids:[
						{search:["title","caption"],find:"{%1}",subTests:["arctic","aviary","livestock","sea","pet run","petrun","wildlife","zoo"],ret:"{%1}_rare"},

					]}, //end rare
					{search:["title","caption"],find:"{%1}",subTests:["arctic","aviary","livestock","sea","pet run","petrun","wildlife","zoo"],ret:"{%1}_common"},
				]}, //end adopt

				
				//new cow pasture/horse paddock catches
				{link:["adopt a baby","adopt the baby"],ret:"none",kids:[
					{search:["title","caption"],find:["found an adorable ","found a "],ret:"none",kids:[
						{search:["title","caption"],find:"foal",ret:"adopt_foal",kids:[
							{search:["title","caption"],find:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
							{search:["title","caption"],find:"{%1}-foal",subTests:allFoals,ret:"adopt_foal{%1}"},
							{search:["title","caption"],find:"{%1}foal",subTests:allFoals,ret:"adopt_foal{%1}"},
						]},
						{search:["title","caption"],find:"calf",ret:"adopt_calf",kids:[
							{search:["title","caption"],find:"{%1} calf",subTests:allCalves,ret:"adopt_calf{%1}"},
							{search:["title","caption"],find:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
						]},
						{search:["title","caption"],find:"{%1} yak",subTests:yakTypes,ret:"adopt_yak{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:babyAnimals,ret:"adopt_{%1}"},
					]},
					{search:["title","caption"],find:"Baby Mule",ret:"adopt_foalmule"},
					{search:["title","caption"],find:"Mistletoe Donkey Baby",ret:"adopt_foalmistletoedonkey"},
					{search:["title","caption"],find:"Trick Or Treat Donkey Baby",ret:"adopt_foaltrickortreatdonkey"},
					{search:["title","caption"],find:"found an adorable Grass Pony and",ret:"adopt_foalgrasspony"},
					{search:["title","caption"],find:"Pink Aloha Stallion Stud",ret:"adopt_foalpinkalohastallion"},
					{search:["title","caption"],find:"Orchid Stallion Stud",ret:"adopt_foalorchidstallion"},
					{search:["title","caption"],find:"Camargue Colt",ret:"adopt_foalcamarguestallion"},
					{search:["title","caption"],find:"Pink Fairy Stallion Colt",ret:"adopt_foalpinkfairystallion"},
					{search:["title","caption"],find:["Welsh Black Calf","Welsh Calf"],ret:"adopt_calfwelshblack"},
					{search:["title","caption"],find:"Foal Pegasus Aviator",ret:"adopt_foalaviatorpegasus"},
					{search:["title","caption"],find:"Frankenfoal",ret:"adopt_foalfranken"},
					{search:["title","caption"],find:"Baby Ox",ret:"adopt_calfbabyox"},
					{search:["title","caption"],find:"Calf Foal",ret:"adopt_calffoal"},
					{search:["title","caption"],find:"CornuCalfpia",ret:"adopt_calfcornucalfpia"},
					{search:["title","caption"],find:"Dracalfla",ret:"adopt_calfdracalfla"},
				]},
					
				//catchall for materials by link
				{link:"{%1}",subTests:materials,ret:"{%1}"},
				
				//join crafting teams
				{link:"join team",ret:"join",kids:[
					{img:"690d86ce9c4143329ab5f872584e1169",ret:"joinicehorsesculpture"},
					{img:"3699f5d32d503228bb5e0cd3afa75544",ret:"joinicepigsculpture"},
					{img:"c5e70c211e82a0bcc1abda64949630fa",ret:"joinmagicsnowflake"},
					{img:"fe063f1f8f1845c626dc868856dad075",ret:"joinbrightyellowtractor"},
					{img:"26b4f3ae87b43f8734d4988bd2805d19",ret:"joinmechanicscarecrow"},
					{img:"a10220ef5dc0a674dbc3ca263793328d",ret:"joinsheeptopiary"},
					{img:"69811776a063c0855c1733f68a33dcb3",ret:"joinappleredseeder"},
					{img:"6c01a99ead4203d971116324aca0e554",ret:"joinbonsai"},
					{img:"e51a6ceffb36d2bec6216200aa95e2b7",ret:"jointreehouse"},
					{img:"7839ea1528ff204e277e1fb47309abf3",ret:"joinappleredharvester"},
					{img:"a860f784f9347030c3d199a191b26a78",ret:"joinpostoffice"},
					{img:"b0f78411f7b6084cb32a9436e24a5658",ret:"joinevergreentrain"},
					{img:"4b8cc80501cc6d433b47b19bf3512337",ret:"joinfarmhand"},
					{img:"c38928055fddef53032e92de43d33342",ret:"joinyellowracertractor"},
					{img:"0a7f6ed48f63a0b6e277e5421c4624ef",ret:"joinstonewall"},
					{img:"83162ebbc9e06677ef8121ef01906efe",ret:"joinfertilizeall"},
					{img:"068f8f2e0112c398403588b7f264b6da",ret:"joindaintyfence"},
					{img:"b29c1f15b645f0d4e382a68a6fd3ff84",ret:"joinshovel"},
					{img:"18bb508499a8369017208586170d3cf0",ret:"joinwateringcan"},
					{img:"ee5dacb99882370f7b8662d862b4dda9",ret:"joinironfence"},
					{img:"890e543735401b5e5325d214805aa029",ret:"joinarborist"},
					{img:"d0ae91c4d9b02323ef3ae1133644e42c",ret:"joinlamppost"},					
					{img:"b42c0a157197ceb896afe22ec4c0e48f",ret:"joinanimalfeed"},
					{img:"78dff32c0ab8d3223d59278aba31166e",ret:"joinvehiclepart"},
					{img:"338ab39ec2b0e49cc93a406802d109ba",ret:"joinswisscabin"},
					{img:"738a3d1a5152e428317a25b39361e8d2",ret:"joinstonearchway"},
					{img:"0da8d0cfb50ed7f3e311cf5e6aa73d81",ret:"joinmilkingstool"},
					{img:"1f9040fc0b4f751852b851a4fdb644e0",ret:"joinscythe"},
					{img:"c065c449db07f585caee3e5facdd5c54",ret:"joinhorsesculpture"},
					{img:"53efef0cd100001a37cc1399a7f02cc5",ret:"joinbrick"},
					{img:"4d64954699fe7f1f8a19a4827dee2134",ret:"joinnail"},
					{img:"0efae744cf2befb26bc630b39cedaf81",ret:"joinwoodenboard"},
					{img:"6817c5c650fd418149601cbc1c83e3e9",ret:"joinluckypenny"},
					{img:"1a40c5d2f4f929a226b934e79c8f0602",ret:"joinfuel"},
					{img:"72016f512ae1b34e43eb21816a8692ab",ret:"joinbottle"},
					{img:"a8888075274db08167ebd4fafc4a7f91",ret:"joinlovepotion"},
					{img:"689dfc368b7d4061e2646699970b1123",ret:"joinpinefencei"},
					{img:"88a9d64c3a5f39e86dfc12575e76a950",ret:"joinpinefenceii"},
					{img:"dd1f0f1981e691f51f0d45ac6b2d8f1c",ret:"joinmoderntable"},
					{img:"6b19071a41140dc4944942be43d6def9",ret:"joinpuppykibble"},
					{img:"3bb35cd13ddc95f5c077dee905cc5190",ret:"joindogtreat"},
					{img:"b6dd31c53721c77db007b8a312b9f06b",ret:"joinmoati"},
					{img:"152ccad7da5edd2257af934c82996c77",ret:"joinmoatii"},
					{img:"5340407ec4d9395f55814d4da2260050",ret:"joinmoatiii"},
					{img:"a793a74c34ea640b1c818aa67a42f9ec",ret:"joinmoativ"},
					{img:"89ac1a38bcdc7ffbb18602b2e9bc1a00",ret:"joinmoatcorneri"},
					{img:"88a738c8310aef87329e3a75103117df",ret:"joinmoatcornerii"},
					{img:"3271cdc09b6cade975b9e96b3f977361",ret:"joinmoatcorneriii"},
					{img:"656278391986c724bb150b45f806701f",ret:"joinmoatcorneriv"},
					{img:"77d09f9046c790237bcfdf264cd80efc",ret:"joincastlebridge"},
					{img:"0ef896833905a2abcb1bb2939bb2bd37",ret:"joinenglandpostcard"},					
					{img:"a8d9fe654cb1a593046646c322ed8e5e",ret:"joinbeachball"},
				]},
				{url:["CraftingRandomLootFriendReward","CraftingRandomLootCrewFriendReward"],ret:"join",kids:[
					{search:["title","caption"],find:"{%1}",subTests:craftShop,ret:"join{%1}"},
				]},
				
				//collectibles and collection tradeins
				{search:["title","caption","desc"],find:"{%1}", subTests:["noticed you could use a","has completed the","collect"], ret:"none",kids:[
					{search:["title","caption","desc"],find:"{%1}", subTests:colTypes, ret:"col_{%1}"},
					{search:["title","caption","desc"],find:"{%1}", subTests:colGroups, ret:"colX_{%1}"},
				]},

				//perfect bunches
//				{search:["title","caption"],find:"perfect bunch", ret:"perfectbunch", kids:[
//					{search:["title","caption"],find:"{%1}", subTests:flowerTypes, ret:"perfect_{%1}"},
//				]},

				//seeds
				{search:["title","caption"],find:"seed",ret:"none",kids:[
					{link:"honeybee", ret:"honeybee"},
					{search:["title","caption"],find:"pollinated", ret:"pollinated",kids:[
						{search:["title","caption"],find:"{%1}", subTests:bushelTypes, ret:"polseeds_{%1}"},
					]},
					{search:["title","caption"],find:"{%1}", subTests:seedTypes, ret:"seeds_{%1}"},
				]},

				//dynamic adoptions when foal/calf/duckling is in the link
				{link:"foal", ret:"adopt_foal",kids:[
					{search:["link","title","caption"],find:" {%1}", subTests:allFoals, ret:"adopt_foal{%1}"},
				]},
				{link:"calf", ret:"adopt_calf",kids:[
					{search:["link","title","caption"],find:" {%1}", subTests:allCalves, ret:"adopt_calf{%1}"},
				]},
				{link:"duckling", ret:"adopt_duckling",kids:[
					{search:["title","caption"],find:"duckling grew up to become a", ret:"adopt_duckling"},
					{search:["link","title","caption"],find:" {%1}", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},
				]},
				
				//catchalls for missed foal/calf/ducklings by link
				{search:["title","caption"],find:"{%1} foal", subTests:allFoals, ret:"adopt_foal{%1}"},
				{search:["title","caption"],find:"{%1} calf", subTests:allCalves, ret:"adopt_calf{%1}"},
				{search:["title","caption"],find:"{%1} duckling", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},

				//catchalls for other known animals sets
				{search:["title","caption"],find:"{%1} duck", subTests:duckTypes, ret:"adopt_duck{%1}"},
				{search:["title","caption"],find:"{%1} pig", subTests:pigTypes, ret:"adopt_pig{%1}"},
				{search:["title","caption"],find:"{%1} sheep", subTests:sheepTypes, ret:"adopt_sheep{%1}"},
				{search:["title","caption"],find:"{%1} ewe", subTests:sheepTypes, ret:"adopt_ewe{%1}"},
				{search:["title","caption"],find:"{%1} cow", subTests:cowTypes, ret:"adopt_cow{%1}"},
				{search:["title","caption"],find:"{%1} horse", subTests:horseTypes, ret:"adopt_horse{%1}"},
				{search:["title","caption"],find:"{%1} chicken", subTests:chickenTypes, ret:"adopt_chicken{%1}"},
				{search:["title","caption"],find:"{%1} dragon", subTests:dragonTypes, ret:"adopt_dragon{%1}"},
				
				//catchall for known animal adoption
				{search:["title","caption"],find:"{%1}", subTests:[].concat(otherAnimals,babyAnimals).fixOrder(), ret:"adopt_{%1}"},

				//simply by link texts
				//here we create an array on the fly for special words, then we add other predefined arrays, then we fix the order before searching
				{link:"{%1}", subTests:["coins","bushel","perfect bunch","tree"].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				
				//simply by body text
				{search:["title","caption"],find:"{%1}", subTests:["coins","bushel","perfect bunch","tree"].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},

				//animal catchalls
				//these need to run after ALL other tests because they have text that may be misidentified earlier
				{search:["title","caption"],find:"{%1}", subTests:animalCatchalls, ret:"adopt_{%1}"},
				
				//created for 'user has shared a link' posts
				{title:"{%1}", ret:"none",
					subTests:["upgrading","good progress","addition of a station","half-way","halfway","finished","expanding","completion of","upgrade of","progress on","built a","adding stations","adding a station"],
					kids:[{title:"{%1}",ret:"mat_{%1}",subTests:buildings}]
				},
				{title:"looking for lava in all the wrong places",ret:"mat_volcanoreef"},
				{search:["desc"],find:"{%1}",subTests:materials,ret:"{%1}"},
				{search:["desc"],find:"{%1}",subTests:otherAnimals,ret:"adopt_(%1}"},
				{search:["desc"],find:"is building their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{search:["desc"],find:["ranked 3 in the Rainbow Harvest Fest","100 xp"],ret:"100xp"},
				{search:["desc"],find:"is raising a sweet Baby Sea Animal",ret:"none",kids:[
					{img:"241413129ffa5dc7e97af3edf0460781",ret:"sea_rare"},
					{img:"57ca62ee6fb4b67333c3bbb4a07f839b",ret:"sea_common"},
				]},
				{search:["desc"],find:"{%1}",subTests:decorTypes,ret:"{%1}"},
				{caption:"{%1}",subTests:decorTypes,ret:"{%1}"},
			],

			//build the menu just as you would for FVWM except omit default values
			//if this script moves, be sure to change the userscripts source id for the link below
			//it should be the same number as in the @require line on top of this script

			menu: {
				section_main:{type:'section',label:'FarmVille ('+version+')',kids:{

				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/160764.user.js'},
				donatefbwm:{type:"link",label:"Help Charlie with FBWM: Donate via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=FVSK&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},
				facebook:{type:'link',label:'Find me on Facebook',href:'http://www.facebook.com/sbgm75'},
				notessep:{type:'separator',label:'PLEASE NOTE: VOTING EVENTS NOW HAVE THEIR OWN SECTION FOR VOTING AND CLAIMING PRIZES.  Special thanks to LUNA for helping me with the sidekick.'},
				basicsep:{type:'separator',label:'Basics',kids:{
				basictab:{type:'tab',label:'Basics',kids:{
					coins:{type:'checkbox',label:"Bonuses (Coins)"},
					coconuts:{type:'checkbox',label:"Coconuts"},
					currencybundle:{type:'checkbox',label:"Currency Bundle"},
					trowel:{type:'checkbox',label:"Hanging Gardens Trowels"},
					"100xp":{type:'checkbox',label:"XP"},
					zp:{type:'checkbox',label:"ZP (Zen Points)"},
					sp:{type:'checkbox',label:"SP (Spook Points)"},
					cp:{type:'checkbox',label:"CP (Cheer Points)"},
					fp:{type:'checkbox',label:"FP (Fairy Points)"},
					shp:{type:'checkbox',label:"Shell Points"},
					aup:{type:'checkbox',label:"Aussie Points"},
					gp:{type:'checkbox',label:"Galaxy Points"},
					cndp:{type:'checkbox',label:"Candy Points",newitem:true},
					doUnknown:{type:'checkbox',label:"Process Unrecognized Posts"},
					dontsteal:{type:'checkbox',label:"Don't Process W2W Posts"},
				}},

				animalfeedsep:{type:'tab',label:"Animal Feed",kids:{
					feedblock:{type:'optionblock',label:"Feed Types:",kids:{
						animalfeed:{type:'checkbox',label:"Animal Feed"},
						dogtreat:{type:'checkbox',label:"Dog Treat"},
						gophertreat:{type:'checkbox',label:"Gopher Treat"},
						pigchow:{type:'checkbox',label:"Pig Chow"},
						puppykibble:{type:'checkbox',label:"Puppy Kibble"},
						unicornwishes:{type:'checkbox',label:"Unicorn Wishes",newitem:true},
						flowersmoothie:{type:'checkbox',label:"Flower Smoothies",newitem:true},
						birdfeed:{type:'checkbox',label:"Bird Feed",newitem:true},
					}},
					dogtreatblock:{type:'optionblock',label:"Dog Treats:",kids:{
						cupcakedogtreat:{type:'checkbox',label:"Cupcake"},
						sportydogtreat:{type:'checkbox',label:"Sporty"},
						sturdydogtreat:{type:'checkbox',label:"Sturdy"},
						sunshinedogtreat:{type:'checkbox',label:"Sunshine"},
					}},
					felineevolutionblock:{type:'optionblock',label:"Feline Evolution",kids:{
						dryfood:{type:'checkbox',label:"Dry Food",newitem:true},
						cannedfood:{type:'checkbox',label:"Canned Food",newitem:true},
						felinetreat:{type:'checkbox',label:"Feline Treat",newitem:true},
					}}
				}},

				boostssep:{type:'tab',label:"Consumables",kids:{
					boostblock:{type:'optionblock',label:"Consumables:",kids:{
						arborist:{type:'checkbox',label:"Arborist"},
						carepackage:{type:'checkbox',label:"Care Package"},
						doubleavatar:{type:'checkbox',label:"Double Avatar"},
						farmhand:{type:'checkbox',label:"Farmhand"},
						fertilizeall:{type:'checkbox',label:"Fertilize All"},
						fuel:{type:'checkbox',label:"Fuel"},
						instagrow:{type:'checkbox',label:"Instagrow"},
						lovepotion:{type:'checkbox',label:"Love Potion"},
						mysterygamedart:{type:'checkbox',label:"Mystery Game Dart"},
						turbocharger:{type:'checkbox',label:"Turbo Charger"},
						unwither:{type:'checkbox',label:"Unwither"},
						bingoballs:{type:'checkbox',label:"Bingo Balls"},
						timetonic:{type:'checkbox',label:"Time Tonic"},
						flowercoins:{type:'checkbox',label:"Flower Coins",newitem:true},
					}},

					sampleblock:{type:'optionblock',label:"Crafting Samples (for fuel) By Level:", kids:{
						sample1:{type:'checkbox',label:"1-20"},
						sample2:{type:'checkbox',label:"21-40"},
						sample3:{type:'checkbox',label:"41-80"},
						sample4:{type:'checkbox',label:"80-100"},
						sample5:{type:'checkbox',label:"100+"},
						sample:{type:'checkbox',label:"??"},
					}},					
		
					mysteryblock:{type:'optionblock',label:"Other:",kids:{
						mysterygift:{type:'checkbox',label:"Mystery Gift"},
						specialdelivery:{type:'checkbox',label:"Special Delivery"},
						capitalonegift:{type:'checkbox',label:"Capital One Gift"},
					}}
				}},

				eggsep:{type:'tab',label:"Eggs",kids:{
					eggblock:{type:'optionblock',label:"Mystery Eggs:",kids:createMenuFromArray(eggTypes,'egg_')},
					eggblock2:{type:'optionblock',label:"Bunny Eggs:",kids:createMenuFromArray(eggTypes2,'egg_')},
				}},

				trufflesep:{type:'tab',label:"Truffles",kids:{
					truffleblock:{type:'optionblock',label:"Truffles",kids:{
						browntruffle:{type:'checkbox',label:"Brown"},
						blacktruffle:{type:'checkbox',label:"Black"},
						whitetruffle:{type:'checkbox',label:"White"},
						goldtruffle:{type:'checkbox',label:"Gold"},
					}}
				}},

				//here we make use of the new function createMenuFromArray
				//we can make whole menu blocks from a single array
				//that function sorts the array by alphabetical order for you
				//and also capitalizes words for better display with the menu

				/*craftsep:{type:'tab',label:"Craft Samples",kids:{
					craftbakeryblock:{type:'optionblock',label:"Bakery:",kids:createMenuFromArray(craftBakery,'sample_')},
					craftspablock:{type:'optionblock',label:"Spa:",kids:createMenuFromArray(craftSpa,'sample_')},
					craftwineryblock:{type:'optionblock',label:"Winery:",kids:createMenuFromArray(craftWinery,'sample_')},
					craftpubblock:{type:'optionblock',label:"Pub:",kids:createMenuFromArray(craftPub,'sample_')},
					craftrestrauntblock:{type:'optionblock',label:"Restraunt",kids:createMenuFromArray(craftRestraunt,'sample_')},
				}},*/
		
				helpsep:{type:'tab',label:"Tasks",kids:{
					helpblock:{type:'optionblock',label:"Participate in:",kids:{
						sendhelp:{type:'checkbox',label:"Barn Raisings & Send Help (SOGO/Quest Items)"},
						bushel_random:{type:'checkbox',label:"Crafting Workshops (random bushel)"},
					}},
					sendall:{type:'checkbox',label:"Send All Requested Items or Select From Below (also does barn raisings)"},
					sendblock:{type:'optionblock',label:"Send Neighbors:",kids:{
						sendmat:{type:'checkbox',label:"Consumables/Materials"},
						sendwishlist:{type:'checkbox',label:"Wishlists"},
						sendfeed:{type:'checkbox',label:"Animal Feed"},
						sendbottle:{type:'checkbox',label:"Bottles"},
						sendbushel:{type:'checkbox',label:"Bushels"},
						sendbasket:{type:'checkbox',label:"Baskets"},
						sendturkey:{type:'checkbox',label:"Turkeys"},
					}},
				}},

				matsep:{type:'tab',label:"Materials",kids:{
					matbybuilding:{type:'optionblock',label:'Random Materials by Building: (does not automatically include items below)',kids:createMenuFromArray(buildings,'mat_')},
					matBlock:{type:'optionblock',label:"Standard:",kids:createMenuFromArray(standardMaterials,"")},
					matBlock2:{type:'optionblock',label:"Special:",kids:createMenuFromArray(specialMaterials,"")},
					matBlock6:{type:'optionblock',label:"Events:",kids:createMenuFromArray(specialEvents,"")},
					matBlock3:{type:'optionblock',label:"Crafing:",kids:createMenuFromArray(craftingMaterials,"")},
					matBlock4:{type:'optionblock',label:"Other:",kids:createMenuFromArray(otherWords,"")},
					matBlock5:{type:'optionblock',label:"Tarot Cards:",kids:{
						tarot_past:{type:'checkbox',label:"Past"},
						tarot_present:{type:'checkbox',label:"Present"},
						tarot_future:{type:'checkbox',label:"Future"},
						tarotcard:{type:'checkbox',label:"Random"},
					}}
				}},
				
				avatartab:{type:'tab',label:'Avatars',kids:{
					costumetab:{type:'optionblock',label:"Avatar Costumes:",kids:createMenuFromArray(avatar,"costume_")},
					costume:{type:'checkbox',label:"Unknown Costumes"},
				}},

				}}, //end basics section

				orchardsep:{type:'separator',label:"Trees",kids:{
					mysteryseedling:{type:'checkbox',label:"Mystery Seedlings"},
					wateringcan:{type:'checkbox',label:"Watering Cans"},
					treestab1:{type:'tab',label:"Standard Trees",kids:{
						trees:{type:'optionblock',label:"Normal:",kids:createMenuFromArray(treeTypes,'tree_')},
					}},
					treestab2:{type:'tab',label:"Giant Trees",kids:{
						treeslg:{type:'optionblock',label:"Giant:",kids:createMenuFromArray(treeTypes2,'tree_giant')},
					}},
					treestab3:{type:'tab',label:"Bonsai Trees",kids:{
						treesbnsi:{type:'optionblock',label:"Bonsai:",kids:createMenuFromArray(treeTypes3,'tree_bonsai')},
						tree_bonsai:{type:'checkbox',label:"Unknown Bonsais"},
					}},
		//			treestab4:{type:'tab',label:"Level 1 Trees",kids:{
		//				treeslv:{type:'optionblock',label:"Level 1:",kids:createMenuFromArray(treeTypes4,'tree_')},
		//			}},
					tree:{type:'checkbox',label:"Unknown Trees"},
				}},
				votingsep:{type:'separator',label:"VOTING EVENTS - Check the Claim Prize to collect all voting prizes or individually choose them below",kids:{
					votenow:{type:'checkbox',label:"Vote Now"},
					claimprize:{type:'checkbox',label:"Claim Prize"},
					adopt_bluebellhorse:{type:'checkbox',label:"Blue Bell Horse"},
					adopt_bootsonlymoose:{type:'checkbox',label:"Boots Only Moose"},
					adopt_cabbagepatchhedgehog:{type:'checkbox',label:"Cabbage Patch Hedgehog"},
					adopt_carrotbaskethorse:{type:'checkbox',label:"Carrot Basket Horse"},
					adopt_cumulusalpaca:{type:'checkbox',label:"Cumulus Alpaca"},
					adopt_daisydeerfawn:{type:'checkbox',label:"Daisy Deer Fawn"},
					adopt_dogdayscorgi:{type:'checkbox',label:"Dog Days Corgi"},
					adopt_farmerpegacorn:{type:'checkbox',label:"Farmer Pegacorn"},
					adopt_farmershattree:{type:'checkbox',label:"Farmer’s Hat Tree"},
					adopt_feliciafox:{type:'checkbox',label:"Felicia Fox"},
					adopt_flipflopshippo:{type:'checkbox',label:"Flip Flops Hippo"},
					adopt_flowernursery:{type:'checkbox',label:"Flower Nursery"},
					adopt_flowerpotkitty:{type:'checkbox',label:"Flower Pot Kitty"},
					adopt_fluffyflowersheep:{type:'checkbox',label:"Fluffy Flower Sheep"},
					adopt_freezingthermometertree:{type:'checkbox',label:"Freezing thermometer Tree"},
					adopt_gardenerpegacorn:{type:'checkbox',label:"Gardener Pegacorn"},
					adopt_gardenersbonnettree:{type:'checkbox',label:"Gardener’s Bonnet Tree"},
					adopt_harvestpig:{type:'checkbox',label:"Harvest Pig"},
					adopt_leafygreenstree:{type:'checkbox',label:"Leafy Greens Tree"},
					adopt_metalwindchimetree:{type:'checkbox',label:"Metal Windchime Tree"},
					adopt_meteorologistcow:{type:'checkbox',label:"Meteorologist Cow"},
					adopt_minifarmersmarket:{type:'checkbox',label:"Mini Farmer's Market"},
					adopt_ornamentalwindmill:{type:'checkbox',label:"Ornamental Windmill"},
					adopt_pottedplantgnome:{type:'checkbox',label:"Potted Plant Gnome"},
					adopt_rainsoakedgorilla:{type:'checkbox',label:"Rain Soaked Gorilla"},
					adopt_rainyrhino:{type:'checkbox',label:"Rainy Rhino"},
					adopt_rosetrellis:{type:'checkbox',label:"Rose Trellis"},
					adopt_sandygoat:{type:'checkbox',label:"Sandy Goat"},
					adopt_snowballsheep:{type:'checkbox',label:"Snowball Sheep"},
					adopt_stormchaserpig:{type:'checkbox',label:"Stormchaser Pig"},
					adopt_sunmanepegacorn:{type:'checkbox',label:"Sun Mane Pegacorn"},
					adopt_sunorbtree:{type:'checkbox',label:"Sun Orb Tree"},
					adopt_sunpaneltree:{type:'checkbox',label:"sun paneltree"},
					adopt_sunreadygator:{type:'checkbox',label:"Sun Ready Gator"},
					adopt_thundermanepegacorn:{type:'checkbox',label:"Thunder Mane Pegacorn"},
					adopt_twisterballoon:{type:'checkbox',label:"Twister Balloon"},
					adopt_vegetablewheelbarrow:{type:'checkbox',label:"Vegetable Wheelbarrow"},
					adopt_veggiebasketgnome:{type:'checkbox',label:"Veggie Basket Gnome"},
					adopt_veggieboxbeagle:{type:'checkbox',label:"Veggie Box Beagle"},
					adopt_veggievinemonkey:{type:'checkbox',label:"Veggie Vine Monkey"},
					adopt_wateringcantree:{type:'checkbox',label:"Watering Can Tree"},
					adopt_weathervaneduck:{type:'checkbox',label:"Weathervane Duck"},
					adopt_weathervanerooster:{type:'checkbox',label:"Weathervane Rooster"},
					adopt_wheelbarrowtree:{type:'checkbox',label:"Wheelbarrow Tree"},
					adopt_wildwaterraft:{type:'checkbox',label:"Wild Water Raft"},
					adopt_wildflowerbouquettree:{type:'checkbox',label:"Wildflower Bouquet Tree"},
					adopt_windchimesstand:{type:'checkbox',label:"Wind Chimes Stand"},
					adopt_windblowncat:{type:'checkbox',label:"Wind-Blown Cat"},
					//summer personality
					adopt_summersunrisesheep:{type:'checkbox',label:"Summer Sunrise Sheep",newitem:true}, 
					adopt_summersunsetsheep:{type:'checkbox',label:"Summer Sunset Sheep",newitem:true}, 
					adopt_spapig:{type:'checkbox',label:"Spa Pig",newitem:true}, 
					adopt_summersunpig:{type:'checkbox',label:"Summer Sun Pig",newitem:true}, 
					adopt_skybluechicken:{type:'checkbox',label:"Sky Blue Chicken",newitem:true}, 
					adopt_berrychicken:{type:'checkbox',label:"Berry Chicken",newitem:true}, 
					adopt_summerfunfirepit:{type:'checkbox',label:"Summer Fun Firepit",newitem:true}, 
					adopt_solitudebench:{type:'checkbox',label:"Solitude Bench",newitem:true}, 
					adopt_theatreushergnome:{type:'checkbox',label:"Theatre Usher Gnome",newitem:true}, 
					adopt_broadwaygnome:{type:'checkbox',label:"Broadway Gnome",newitem:true}, 
					adopt_saddlesummerdragon:{type:'checkbox',label:"Saddle Summer Dragon",newitem:true}, 
					adopt_babyrainbowdragon:{type:'checkbox',label:"Baby Rainbow Dragon",newitem:true}, 
					adopt_vinotree:{type:'checkbox',label:"Vino Tree",newitem:true}, 
					adopt_frostymugtree:{type:'checkbox',label:"Frosty Mug Tree",newitem:true}, 
					adopt_picnichorse:{type:'checkbox',label:"Picnic Horse",newitem:true}, 
					adopt_summerfiestahorse:{type:'checkbox',label:"Summer Fiesta Horse",newitem:true}, 
					adopt_summersunduck:{type:'checkbox',label:"Summer Sun Duck",newitem:true}, 
					adopt_poolpartyduck:{type:'checkbox',label:"Pool Party Duck",newitem:true}, 
					adopt_summerbeagle:{type:'checkbox',label:"Summer Beagle",newitem:true}, 
					adopt_canastapoodle:{type:'checkbox',label:"Canasta Poodle",newitem:true}, 
					adopt_summerfriendshiptree:{type:'checkbox',label:"Summer Friendship Tree",newitem:true}, 
					adopt_summerfamilytree:{type:'checkbox',label:"Summer Family Tree",newitem:true}, 
					adopt_sunrisepegacorn:{type:'checkbox',label:"Sunrise Pegacorn",newitem:true}, 
					adopt_eveningpegacorn:{type:'checkbox',label:"Evening Pegacorn",newitem:true}, 
					//mysticalgroves
					adopt_blackluckkitten:{type:'checkbox',label:"Black Luck Kitten",newitem:true},
					adopt_paintedpuppy:{type:'checkbox',label:"Painted Puppy",newitem:true},adopt_yumplumtree:{type:'checkbox',label:"Yum PlumTree",newitem:true},
					adopt_degloomappletree:{type:'checkbox',label:"De-Gloom Apple Tree",newitem:true},
					adopt_barddwarf:{type:'checkbox',label:"Bard Dwarf",newitem:true},
					adopt_firebreatherdwarf:{type:'checkbox',label:"Fire Breather Dwarf",newitem:true},
					adopt_lunarwingcub:{type:'checkbox',label:"Lunar-Wing Cub",newitem:true},
					adopt_solarwingcub:{type:'checkbox',label:"Solar-Wing Cub",newitem:true},
					adopt_darkrosearchway:{type:'checkbox',label:"Dark Rose Archway",newitem:true},
					adopt_lanternlitgazebo:{type:'checkbox',label:"Lantern-Lit Gazebo",newitem:true},
					adopt_moonslothtree:{type:'checkbox',label:"Moon Sloth Tree",newitem:true},
					adopt_brightflufftree:{type:'checkbox',label:"Bright Fluff Tree",newitem:true},
					adopt_midnightchicken:{type:'checkbox',label:"Midnight Chicken",newitem:true},
					adopt_goldenfeatherchicken:{type:'checkbox',label:"Golden Feather Chicken",newitem:true},
					adopt_bannerbull:{type:'checkbox',label:"Banner Bull",newitem:true},
					adopt_saddleddeer:{type:'checkbox',label:"Saddled Deer",newitem:true},
					adopt_nightwoodram:{type:'checkbox',label:"Night Wood Ram",newitem:true},
					adopt_daybreaklion:{type:'checkbox',label:"Daybreak Lion",newitem:true},
					adopt_amethystdragon:{type:'checkbox',label:"Amethyst Dragon",newitem:true},
					adopt_ametrinedragon:{type:'checkbox',label:"Ametrine Dragon",newitem:true},
					adopt_mistyeyedtree:{type:'checkbox',label:"Misty-Eyed Tree",newitem:true},
					adopt_tearsparkletree:{type:'checkbox',label:"Tear-Sparkle Tree",newitem:true},
					adopt_obsidianpegacorn:{type:'checkbox',label:"Obsidian Pegacorn",newitem:true},
					adopt_amberbrightpegacorn:{type:'checkbox',label:"Amber Bright Pegacorn",newitem:true},
					
					
					



					

				}},
				bloomsep:{type:'separator',label:"Bloom Garden",kids:{
					mysterybulb:{type:'checkbox',label:"Mystery Bulbs"},
					flowerfood:{type:'checkbox',label:"Flower Food"},
					bloomtab1:{type:'tab',label:"Blooms:",kids:{
						blooms:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(bulbTypes,'bulb_')},
						bulb_unknown:{type:'checkbox',label:"Unknown Bloom"},
					}},
				}},
				
				colsep:{type:'separator',label:"Collectibles",kids:{
					colBlock1:{type:'optionblock',label:"Berries:",kids:createMenuFromArray(colBerries,"col_")},
					colBlock2:{type:'optionblock',label:"Citrus:",kids:createMenuFromArray(colCitrus,"col_")},
					colBlock3:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(colCows,"col_")},
					colBlock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(colFlowers,"col_")},				
					colBlock5:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(colGrains,"col_")},				
					colBlock6:{type:'optionblock',label:"Squash:",kids:createMenuFromArray(colSquash,"col_")},				
					colBlockX:{type:'optionblock',label:"Unknown Collectibles by Collection:",kids:createMenuFromArray(colGroups,"colX_")},
				}},

				decosep:{type:'separator',label:"Decorations",kids:{
				decortab:{type:'tab',label:'Decorations',kids:{
				//	decoblock:{type:'optionblock',label:"Various Decorations and Odd Animals:",kids:createMenuFromArray(decorTypes,"")},
				//	decoBlock01:{type:'optionblock',label:"Halloween: (event-specific animals not included)",kids:createMenuFromArray(decorHalloween,"")},
				//	decoBlock02:{type:'optionblock',label:"Thanksgiving:",kids:createMenuFromArray(decorThanksgiving,"")},
				//	decoBlock03:{type:'optionblock',label:"Christmas:",kids:createMenuFromArray(decorChristmas,"")},
					decoBlock19:{type:'optionblock',label:"Winter Wonderland:",kids:createMenuFromArray(decorWinterWonderland,"")},
				//	decoBlock20:{type:'optionblock',label:"Holiday Hearth:",kids:createMenuFromArray(decorHolidayHearth,"")},
				//	decoBlock21:{type:'optionblock',label:"Magic Snowman:",kids:createMenuFromArray(decorMagicSnowman,"")},
				//	decoBlock05:{type:'optionblock',label:"Valentine's Day:",kids:createMenuFromArray(decorValentines,"")},
				//	decoBlock07:{type:'optionblock',label:"St. Patrick's Day:",kids:createMenuFromArray(decorStPatty,"")},
				//	decoBlock08:{type:'optionblock',label:"Wishing Well:",kids:createMenuFromArray(decorWishingWell,"")},
				//	decoBlock09:{type:'optionblock',label:"Easter:",kids:createMenuFromArray(decorEaster,"")},
					decoBlock11:{type:'optionblock',label:"Shovels:",kids:createMenuFromArray(decorShovels,"")},
				//	decoBlock12:{type:'optionblock',label:"School Supplies:",kids:createMenuFromArray(decorSchoolSupplies,"")},				
				//	decoBlock13:{type:'optionblock',label:"Tuscan Wedding:",kids:createMenuFromArray(decorTuscanWedding,"")},
				//	decoBlock14:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(decorFlowers,"")},
				//	decoBlock15:{type:'optionblock',label:" Birthday 2:",kids:createMenuFromArray(decorFV2Birthday,"")},
				//	decoBlock16:{type:'optionblock',label:"Sand Castle:",kids:createMenuFromArray(decorSandCastle,"")},
				//	decoBlock17:{type:'optionblock',label:"Bobbing For Apples:",kids:createMenuFromArray(decorApples,"")},
					decoBlock22:{type:'optionblock',label:"Gnomes:",kids:createMenuFromArray(decorGnomes,"")},
					decoBlock18:{type:'optionblock',label:"Other:",kids:createMenuFromArray(decorOther,"")},		
				}},
				
//				flowerssep:{type:'tab',label:"Flowers",kids:{
//					perfectblock1:{type:'optionblock',label:"Perfect Bunches:",kids:createMenuFromArray(flowerTypes,"perfect_")},
//					perfectbunch:{type:'checkbox',label:"Unknown Bunches"},
//				}},
				
				}}, // end decorations
				
				adoptsep:{type:'separator',label:"Animals & Scales, DNA, etc.",kids:{
				bovinetab:{type:'tab',label:"Cows & Calves",kids:{
					cowBlock:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(cowTypes,"adopt_cow")},
					adopt_cow:{type:'checkbox',label:"Unknown Cows"},
					bullblock:{type:'optionblock',label:"Bulls:",kids:{
					adopt_flowerbull:{type:'checkbox',label:"Flower Bull"},
					adopt_bull:{type:'checkbox',label:"Unknown Bulls"},
					}},
					calfBlock:{type:'optionblock',label:"Calves:",kids:createMenuFromArray(calfTypes,"adopt_calf")},
					bullBlock:{type:'optionblock',label:"Bull Calves:",kids:createMenuFromArray(bullTypes,"adopt_calf")},
					oxenBlock:{type:'optionblock',label:"Baby Oxen:",kids:createMenuFromArray(oxenTypes,"adopt_calf")},
					adopt_calf:{type:'checkbox',label:"Unknown Calves"},
					}},
				horsetab:{type:'tab',label:"Horses & Foals",kids:{
					horseBlock:{type:'optionblock',label:"Horses, Unicorns, Etc.:",kids:createMenuFromArray(horseTypes,"adopt_horse")},
					adopt_horse:{type:'checkbox',label:"Unknown Horses"},
					foalBlock:{type:'optionblock',label:"Foals:",kids:createMenuFromArray(foalTypes,"adopt_foal")},
					assBlock:{type:'optionblock',label:"Donkey Foals:",kids:createMenuFromArray(assTypes,"adopt_foal")},
					adopt_foal:{type:'checkbox',label:"Unknown Foals"},
					}},
				breedingtab:{type:'tab',label:"Breeding Sheep/Pig Pen",kids:{
					adopt_piglet:{type:'checkbox',label:"Pig Pen Baby - Indeterminate Sex"},
					adopt_lamb:{type:'checkbox',label:"Sheep Pen Lamb - Indeterminate Sex"},
					adopt_lambram:{type:'checkbox',label:"Sheep Pen Lamb - Known Male"},
					adopt_lambewe:{type:'checkbox',label:"Sheep Pen Lamb - Known Female"},
					adopt_babyturtle:{type:'checkbox',label:"Turtle Pen Baby"},
					}},
					mysterybabytab:{type:'tab',label:"Mystery Babies",kids:{
					wildlifeblock:{type:'optionblock',label:"Wildlife Habitat:",kids:{
						wildlife_common:{type:'checkbox',label:"Common"},
						wildlife_rare:{type:'checkbox',label:"Rare"},
					}},
					
					petrunblock:{type:'optionblock',label:"Pet Run:",kids:{
						petrun_common:{type:'checkbox',label:"Common"},
						petrun_rare:{type:'checkbox',label:"Rare"},
					}},

					zooblock:{type:'optionblock',label:"Zoo:",kids:{
						zoo_common:{type:'checkbox',label:"Common"},
						zoo_rare:{type:'checkbox',label:"Rare"},
					}},
					
					aviaryblock:{type:'optionblock',label:"Aviary:",kids:{
						aviary_common:{type:'checkbox',label:"Common"},
						aviary_rare:{type:'checkbox',label:"Rare"},
					}},
					
					livestockblock:{type:'optionblock',label:"Livestock Pen:",kids:{
						livestock_common:{type:'checkbox',label:"Common"},
						livestock_rare:{type:'checkbox',label:"Rare"},
					}},
					
					winterpenblock:{type:'optionblock',label:"Winter Animal Pen:",kids:{
						arctic_common:{type:'checkbox',label:"Common"},
						arctic_rare:{type:'checkbox',label:"Rare"},
					}},
					
					aquariumblock:{type:'optionblock',label:"Aquarium:",kids:{
						sea_common:{type:'checkbox',label:"Common"},
						sea_rare:{type:'checkbox',label:"Rare"},
					}},
					
					jadeblock:{type:'optionblock',label:"Jade Habitat:",kids:{
						jade_common:{type:'checkbox',label:"Common"},
						jade_rare:{type:'checkbox',label:"Rare"},
					}},
					
					jade1block:{type:'optionblock',label:"Jade Aquarium:",kids:{
						ocean_common:{type:'checkbox',label:"Common"},
						ocean_rare:{type:'checkbox',label:"Rare"},
					}},
					
					unknown_baby:{type:'checkbox',label:"Unknown Babies"},
				}},
				animalstab:{type:'tab',label:"Other Animals",kids:{
					babyBlock:{type:'optionblock',label:"Baby Playpen Animals:",kids:createMenuFromArray(babyAnimals,"adopt_")},
					
					bunny2Block:{type:'optionblock',label:"Bunnies:",kids:{
						adopt_bluelilybunny:{type:'checkbox',label:"Blue Lily"},
						adopt_goldfloppybunny:{type:'checkbox',label:"Gold Floppy"},
						adopt_pinkloppybunny:{type:'checkbox',label:"Pink Loppy"},
						adopt_purplepuffybunny:{type:'checkbox',label:"Purple Puffy"},
						adopt_whitedaisybunny:{type:'checkbox',label:"White Daisy"},
						adopt_yellowchubbybunny:{type:'checkbox',label:"Yellow Chubby"},
					}},
					
					catBlock:{type:'optionblock',label:"Cats:",kids:{
						adopt_americanbobtail:{type:'checkbox',label:"American Bobtail"},
						adopt_auroracat:{type:'checkbox',label:"Aurora"},
						adopt_blackkitten:{type:'checkbox',label:"Black"},
						adopt_himalayankitty:{type:'checkbox',label:"Himalayan"},
						adopt_persiancat:{type:'checkbox',label:"Persian"},
						adopt_tabbypersian:{type:'checkbox',label:"Tabby Persian"},
						adopt_whitekitty:{type:'checkbox',label:"White"},
					}},
					chickenBlock:{type:'optionblock',label:"Chickens",kids:createMenuFromArray(chickenTypes,"adopt_chicken")},
					adopt_chicken:{type:'checkbox',label:"Unkown Chickens"},
					
					duckblock:{type:'optionblock',label:"Ducks",kids:createMenuFromArray(duckTypes,"adopt_duck")},
					adopt_duck:{type:'checkbox',label:"Unknown Ducks"},
					
					ducklingBlock:{type:'optionblock',label:"Ducklings:",kids:{
						adopt_ducklingbrown:{type:'checkbox',label:"Brown"},
						adopt_ducklingblue:{type:'checkbox',label:"Blue"},
						adopt_ducklingred:{type:'checkbox',label:"Red"},
						adopt_ducklingyellow:{type:'checkbox',label:"Yellow"},
						adopt_ducklingugly:{type:'checkbox',label:"Ugly"},
						adopt_duckling:{type:'checkbox',label:"Unknown Ducklings"},
					}},
					
					dragonBlock:{type:'optionblock',label:"Dragons:",kids:createMenuFromArray(dragonTypes,"adopt_dragon")},
					adopt_dragon:{type:'checkbox',label:"Unknown Dragon"},
					
					goatBlock:{type:'optionblock',label:"Goats:",kids:{
						adopt_boergoat:{type:'checkbox',label:"Boer"},
						adopt_carolinggoat:{type:'checkbox',label:"Caroling"},
						adopt_redgoat:{type:'checkbox',label:"Red"},
						adopt_redtoggenburggoat:{type:'checkbox',label:"Red Toggenburg"},
						adopt_mouflongoat:{type:'checkbox',label:"Mouflon"},
						adopt_australianminiaturegoat:{type:'checkbox',label:"Australian Mini",newitem:true},
						adopt_goat:{type:'checkbox',label:"Unknown Goats"},
					}},
					
					miscanimalblock:{type:'optionblock',label:"Misc Animals:",kids:createMenuFromArray(otherAnimals,"adopt_")},
					
					pigBlock:{type:'optionblock',label:"Pigs",kids:createMenuFromArray(pigTypes,"adopt_pig")},
					adopt_pig:{type:'checkbox',label:"Unknown Pigs"},
					sheepBlock:{type:'optionblock',label:"Sheep",kids:createMenuFromArray(sheepTypes,"adopt_sheep")},
					adopt_sheep:{type:'checkbox',label:"Unknown Sheep"},
					}},
				
				othertab:{type:'tab',label:"Scales, DNA, etc.",kids:{
					dinoblock:{type:'optionblock',label:"Dino DNA Strand:",kids:createMenuFromArray(dnaTypes,"dna_")},
					gemblock:{type:'optionblock',label:"Gems:",kids:createMenuFromArray(gemTypes,"gem_")},
					scaleblock:{type:'optionblock',label:"Dragon Scales:",kids:createMenuFromArray(scaleTypes,"scale_")},
					serumblock:{type:'optionblock',label:"Monster Serum:",kids:createMenuFromArray(serumTypes,"serum_")},
					cuttingblock:{type:'optionblock',label:"Bonsai Cuttings:",kids:createMenuFromArray(cuttingTypes,"cutting_")},
					spiritblock:{type:'optionblock',label:"Animal Spirit:",kids:createMenuFromArray(spiritTypes,"spirit_")},
					fossilblock:{type:'optionblock',label:"Fossils:",kids:createMenuFromArray(fossilTypes,"fossil_")},
					pixieblock:{type:'optionblock',label:"Pixie Dust:",kids:createMenuFromArray(pixieTypes,"pixie_")},
					fishscaleblock:{type:'optionblock',label:"Fish Scales:",kids:createMenuFromArray(fishscaleTypes,"fishscale_")},
					horseshoeblock:{type:'optionblock',label:"Horseshoes:",kids:createMenuFromArray(horseshoeTypes,"horseshoe_")},
					cloudblock:{type:'optionblock',label:"Clouds:",kids:createMenuFromArray(cloudTypes,"cloud_")},
					wildflowerblock:{type:'optionblock',label:"Wildflowers:",kids:createMenuFromArray(wildflowerTypes,"wildflower_"),newitem:true},
				}},
				}}, //end adoption section

				
				farmcropssep:{type:'separator',label:"Seeds, Bushels & Crafting",kids:{
				seedsep:{type:'tab',label:"Seeds",kids:{
					seedblock1:{type:'optionblock',label:"All Pollinated Seeds:",kids:createMenuFromArray(fruitTypes,"polseeds_")},
					pollinated:{type:'checkbox',label:"Unknown Seeds"},
				}},

				bushelsep:{type:'tab',label:"Bushels",kids:{
					hlbushelblock:{type:'optionblock',label:"Highlight Bushels By Crafting Cottage",hideSelectAll:true,kids:{
						btnbakery:{type:'button_highlight',label:"Bakery",options:bakeryBushels,clearfirst:allCraftBushels},
						btnwinery:{type:'button_highlight',label:"Winery",options:wineryBushels,clearfirst:allCraftBushels},
						btnspa:{type:'button_highlight',label:"Spa",options:spaBushels,clearfirst:allCraftBushels},
						btnpub:{type:'button_highlight',label:"Pub",options:pubBushels,clearfirst:allCraftBushels},
						btnrestraunt:{type:'button_highlight',label:"Restraunt",options:restrauntBushels,clearfirst:allCraftBushels},
						btncraftshop:{type:'button_highlight',label:"Craftshop",options:craftshopBushels,clearfirst:allCraftBushels},
						btnsweetshoppe:{type:'button_highlight',label:"Sweet Shoppe",options:sweetshoppeBushels,clearfirst:allCraftBushels},
						btntikibar:{type:'button_highlight',label:"Tiki Bar",options:tikibarBushels,clearfirst:allCraftBushels},
						btnteagarden:{type:'button_highlight',label:"Tea Garden",options:teagardenBushels,clearfirst:allCraftBushels},
						btnpotionshop:{type:'button_highlight',label:"Potion Shop",options:potionshopBushels,clearfirst:allCraftBushels},
						btnpatisserie:{type:'button_highlight',label:"Patisserie",options:patisserieBushels,clearfirst:allCraftBushels},
						btncoralcafe:{type:'button_highlight',label:"Coral Cafe",options:coralcafeBushels,clearfirst:allCraftBushels},
						btnaussiewinery:{type:'button_highlight',label:"Aussie Winery",options:aussiewineryBushels,clearfirst:allCraftBushels},
						btncrystalcottage:{type:'button_highlight',label:"Crystal Cottage",options:crystalcottageBushels,clearfirst:allCraftBushels},
						btncrystalcottage:{type:'button_highlight',label:"Sugar Shack",options:sugarshackBushels,clearfirst:allCraftBushels},
						btnalchemistshop:{type:'button_highlight',label:"Alchemist Shop",options:alchemistshopBushels,clearfirst:allCraftBushels},
						btnhlnone:{type:'button_highlight',label:"None",clearfirst:allCraftBushels},
					}},

					bushelblock1:{type:'optionblock',label:"All Bushels:",kids:createMenuFromArray(fruitTypes,"bushel_")},
					bushel:{type:'checkbox',label:"Unknown Bushels"},
				}},

				preordersep:{type:'tab',label:"Order Crops", kids:{
					preorderblock1:{type:'optionblock',label:"All Crops:",kids:createMenuFromArray(fruitTypes,"order_")},
					order:{type:'checkbox',label:"Order Unknown Crops"},
				}},
				
				jointeamsep:{type:'tab',label:"Join Teams",kids:{
					jointeamblock:{type:'optionblock',label:"Join Teams:",kids:createMenuFromArray(craftShop,"join")},
					join:{type:'checkbox',label:"Unknown Crafting Teams"},
				}},
				
				}} //end farms separator

				}} //end farmville section
			} //end menu
		};

		//this converts the menu above to a text string
		//it erases all functions, preventing sidekicks from making destructive changes to the WM script
		//it also provides an early error checking stage before the menu is attached to the WM script
		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisApp,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);

		//cleanup
		doorMark=null;calfTypes=null;foalTypes=null;horseTypes=null;bushelTypes=null;flowerTypes=null;
		treeTypes=null;craftPub=null;craftWinery=null;craftSpa=null;craftBakery=null;craftTypes=null;
		standardMaterials=null;otherConsumables=null;specialMaterials=null;seafoodTypes=null;
		craftingMaterials=null;materials=null;colBerries=null;colCitrus=null;colCows=null;colFlowers=null;
		colGrains=null;colSquash=null;colTypes=null;colGroups=null;questItems=null;duckTypes=null;
		pigTypes=null;sheepTypes=null;cowTypes=null;decorTypes=null;eggTypes=null;otherAnimals=null;
		otherWords=null;buildings=null;attachment=null;attString=null;seedTypes=null;animalCatchalls=null;
		craftRestraunt=null;craftSweetShoppe=null;eggTypes2=null;babyAnimals=null;allCalves=null;
		assTypes=null;allFoals=null;specialEvents=null;
		
		t1=null;t2=null;t3=null;t4=null;t5=null;t6=null;t7=null;t8=null;t10=null;t11=null;
		t12=null;t13=null;t14=null;t15=null;t16=null;t17=null;t18=null;t19=null;t20=null;t21=null;
		t22=null;t23=null;t27=null;t29=null;t30=null;t31=null;t32=null;t33=null;t34=null;t35=null;
		t36=null;t37=null;t38=null;t39=null;t40=null;t41=null;t42=null;t43=null;
	};

	//a function similar to Facebook Auto Publisher for some FV reward pages autopub does not see
	var waitedForVote=false;
	function sendWishGift(){
		//console.log("sendWishGift");
		//color the panel so we know where the script is right now
		//document.body.style.backgroundColor=["blue","red","white","green","pink","lime","orange"].pickRandom();

		var node = selectSingleNode(".//input[(@name='sendit') and not(contains(@class,'noHammer'))]");
		
		
		//new stuff for suggestion-based voting
		var vote=-1;
		//alert("waited for vote: "+waitedForVote);
		try{
			var suggestedVote=window.location.hash.getUrlParam("suggestedVote");
			if (suggestedVote==null) suggestedVote=window.location.href.getUrlParam("suggestedVote");

			//alert("suggested vote "+suggestedVote);
			
			vote=(suggestedVote=="1")?1:
			(suggestedVote=="0")?0:-1;
			
			//alert(vote);
			
			if (vote<0 && waitedForVote==false) {
				//alert("wait");
				//waiting for iframe scripts to work, this function will refire soon...
				waitedForVote=true;
				window.setTimeout(sendWishGift,1000);
				return;
			}
			//alert("suggestedVote: "+vote);
		} catch (e){
			//cannot read own window for some reason
			//alert(e);
		}
		if (vote<0) vote=Math.floor(Math.random()*2);
		//end new voting stuff

		var html = document.documentElement.innerHTML;
		var isSendBushel = html.find("AskForBushels");

		//check for image button gift page
		if (!node) {
			var itemID = location.search.getUrlParam("selectedGift");
			//alert(itemID);
			if (itemID) {
				//check that selectedGift is not a comma delimited list. If it is, separate and choose one
				if (itemID.find(",")) itemID = itemID.split(",").pickRandom();
				else if (itemID.find("%2C")) itemID = itemID.split("%2C").pickRandom();
				//alert(itemID);
			}
			node = $("add_"+itemID);
		}

		//check for radio button gift page
		if (!node) {
			//check for gift page buttons
			var nodes=selectNodes(".//*[contains(@class,'giftLi')]//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
			if (nodes.snapshotLength) {
				//pick one randomly
				node = nodes.snapshotItem( Math.floor(Math.random()*nodes.snapshotLength) );
				node.style.backgroundColor="green";
			}
		}

		//check for single send buttons for pages like send bushel
		if (!node) node=selectSingleNode(".//input[contains(@class,'request_form_submit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//div[contains(@class,'gift_form_buttons')]/a[contains(@class,'giftformsubmit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//div[@class='rfloat']/input[(@name='try_again_button') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//input[(@name='acceptReward') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//input[(@class='input"+vote+"submit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//input[(@class='inputyessubmit') and not(contains(@class,'noHammer'))]");
		if (!node) node=selectSingleNode(".//div[(@id='vote"+vote+"') and not(contains(@class,'noHammer'))]");

		//if we found a useful button or element to click, click it. 
		//THEN if we expect another button or element to appear on the same window, wait and click that too.
		if (node) {setTimeout(function(){
			if (isSendBushel) {
				var hwnd = window.top;
				hwnd.setTimeout(function(){sendMessage('status=1',hwnd);},2000);
			}
			click(node);
		},500); } else {
			//check for stuff that denotes being done
			node=selectSingleNode(".//input[@class='playButton' and @name='playFarm']");
			if (node) {
				sendMessage('status=1');
			}
		}
		window.setTimeout(sendWishGift,1000); //keep looking
		
	};
	
	//main script function
	function run(){
		//console.log("run");
		var href=window.location.href;
		var text = document.documentElement.textContent;
		var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/");
		
		//check for apprequest popup
		if (href.contains('apprequests')) {
			var node = selectSingleNode(".//input[@name='ok_clicked']");
			if (node) click (node);
			return;
		}
		
		//check for preconstructed facebook request items
		else if (href.contains("/plugins/serverfbml.php")) {
			//validate correct app id
			var html = document.documentElement.innerHTML;
			var isSendBushel = html.find("AskForBushels");
			if (html.contains("app_id=102452128776") || html.contains("app_content_102452128776")){
				if (text.find("Sorry, you can't give this user any more gifts") || text.find("Sorry, you can't send this gift")) {sendMessage('status=-1');return;}
				var node = selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
				if (node) {
					//make sure this node is not on the neighbors.php form
					var avoidForm = selectSingleNode(".//ancestor::form[contains(@action,'neighbors.php') or contains(@action,'gifts.php?ref=neighbors')]",{node:node});
					if (!avoidForm) {
						click (node);
						window.setTimeout(sendWishGift,1000); //there is another button named sendit here
					}
				}
			}
			return;
		}

		//check for need to dock to WM Host
		if (href.startsWith('http://www.facebook.com/') && !(href.contains("/plugins/serverfbml.php")) ) {
			dock();
			return;
		}

		//if not on a dockable page, start searching for reward page types

		else if (text.find("Error while loading page from")) {
			sendMessage('status=-5');
			//window.location.reload();
			return;
		}
		
		else if (href.startsWith(thisLoc+'/wishlist_give.php') ){
			//send wish list item
			if (text.find("Sorry, you can't give this user any more gifts") || text.find("Sorry, you can't send this gift")) {sendMessage('status=-1');return;}
			if (selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]")) window.setTimeout(sendWishGift,1000); //buttons no longer here
			return;
		}

		else if (href.startsWith(thisLoc+'/gifts_send.php')){
			//comes after sending wish gift
			//alert(href);
			window.setTimeout(function(){sendMessage('status=1');},5000);
			return;
		}

		else if (href.startsWith(thisLoc+'/reward_gift_send.php') ){
			//try to send a gift with button
			window.setTimeout(sendWishGift,1000);
			//sendMessage('status=1'); <---dont want to do that here
			return;
		}
		
		else if (href.startsWith(thisLoc+'/index.php') || href.startsWith(thisLoc+'/?' )){
			//alert(href);
			sendMessage('status=1');
			return;
		}

		else if ( href.startsWith(thisLoc+'/gifts.php') && href.contains('giftRecipient=') ){
			//taken to specific gift sending page
			var node; 
			
			//color the panel so we know where the script is right now
			//document.body.style.backgroundColor=["blue","red","white","green","pink","lime","orange"].pickRandom();

			//check for limits
			if (text.find("you can't give this user any more gifts")) {sendMessage('status=-1');}

			//check for normal send buttons
			else if (node=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]")) window.setTimeout(sendWishGift,1000);

			//check for radio button gift page
			else if (node=selectSingleNode(".//li[contains(@class,'giftLi')]")) window.setTimeout(sendWishGift,1000);

			//check for image button gift page
			else if (node=selectSingleNode(".//iframe[contains(@src,'farmville.com/gifts.php')]")){
				//break it out of iframes and add the gift names to the url
				var itemID = location.search.getUrlParam('selectedGift'); //copy the gift names
				location.href = node.src+"&selectedGift="+itemID; //redirect and append the gift names
			}

			//default fail
			//else {sendMessage('status=-1');} 
			//dont return from here due to new iframes
			//instead just let the thing open iframes and if it dont work just let it time out

			return;
		}
		
		else if (href.contains('redirecting_zy_session_expired')){
			//alert(href);
			sendMessage('status=1'); 
			return;
		}
		
		else if (href.startsWith(thisLoc+'/gifts.php') ){
			//taken to generic gift sending page with no useful recipient or gift names
			sendMessage('status=-1');
			//OR write in code to select some random gift
			return;
		}

		else if (href.startsWith(thisLoc+'/trading_post_order_place.php') ){
			//taken to place order page
			if (text.find("Congratulations! You've placed a")) sendMessage('status=1');
			else if (text.find("You've reached your limit for ordering from this user")) sendMessage('status=-1');
			else if (text.find("Sorry Farmer! You don't have an order pending with this friend")) sendMessage('status=-1');
			return;
		}

		else if (href.startsWith(thisLoc+'/reward.php') 
			&& (text.find("Would you like a ") || text.find("in your Dino Lab") || text.find("Would you like an ") || text.find("got yourself a Flower Coin!")) 
			&& (text.find("Bushel") || text.find("Basket") || text.find("DNA") || text.find("Flower Coin"))){
			//bushel acceptance stage 1
			//or dino dnd stage 1
			//or flower coin stage 1
			//alert('path set');
			window.setTimeout(sendWishGift,1000);
			return;
		}
		
		/*else if ((href.startsWith(thisLoc+'/performfriendvote.php')||href.startsWith(thisLoc+'//performfriendvote.php')) && (text.match(
				/(naughty or nice|night owl|early( bird)?|plans rigorously|lives spontaneously|lounging|exploring|fashion diva|functional dresser|casually late|stays in|ventures out)/gi
			))){
			window.setTimeout(sendWishGift,1000);
			return;
		}*/

	//	else if ((href.startsWith(thisLoc+'/performfriendvote.php')||href.startsWith(thisLoc+'//performfriendvote.php')) && ($("vote1")||$("vote0"))){
		else if (href.contains('performfriendvote.php') || href.contains('photo_vote')){ //&& ($("vote1")||$("vote0"))
			window.setTimeout(sendWishGift,1000);
			return;
		}
		//else if (href.find('reward.php') ){
		else if (href.startsWith(thisLoc+'/reward.php') || href.contains('reward.php')){
			//document.body.style.backgroundColor=["red","green","blue"].pickRandom();
		
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
		
			//all out
			if (text.match(
				/(enough (votes|help)|there aren't any more items|been (claimed|picked up)|given out all the free samples they had|are('nt)? (no|any) more|has already received|fresh out of|someone already|isn't yours|got here too late|folks have already|already has enough|already has all the)/gi
			)) sendMessage('status=-2');

			//over limit
			else if (text.match(
				/(you've already got|already have a stallion)/gi
			)) sendMessage('status=-4');
			
			//expired
			else if (text.match(
				/((event|promotion) has (expired|ended)|no longer needs|missed your oppor|expired)/gi
			)) sendMessage('status=-11');

			//requirements not met
			else if (text.match(
				/(You must be level|switch farms and try|need to finish building|don't have a trough|before you can|not open to everyone|you can't send)/gi
			)) sendMessage('status=-13');

			//not a neighbor
			else if (text.match(
				/(only neighbors|only friends can|have to be a neigh|just for your friends)/gi
			)) sendMessage('status=-12');
			
			//gift box full
			else if (text.match(
				/(already got all the (treats|builder)|you need to use|(gift box|storage) is full|at max cap|doesn't need another|is too full|any(place| room) to store)/gi
			)) sendMessage('status=-3');

			//already accepted
			else if (text.match(
				/(voters agree with you|whoa there|slow down there partner|can only help your friend once|already (clicked|claimed|collected|received|hatched|taken part|helping|voted)|you('ve| have)? already (helped|tried|accepted|clicked|voted|gave)|claim one (reward|item)|already on another job)/gi
			)) sendMessage('status=-6');

			//generic fail
			else if (text.match(
				/(is for your friend|not for you|(reward for|can't claim) your own|only your friends|can't claim the animal|out of luck|you can't (help|accept)|try again next time|sorry( (par(t|d)ner|farmer))?)/gi
			)) sendMessage('status=-1');

			//accepted
			else if (what=text.match(
				/(your vote|has been registered|congrat(ulations|s)|yee-haw|hooray|lucky you|you (accepted|helped|claimed|collected)|agreed to join|(you )?just (sent|unlocked|collected|gave you)|(thanks|thank you) for (helping|taking part|your interest|voting)|wants you to have|can find it in your|play farmville|can be found in your gift box)/gi
			)) {sendMessage('status=1'); /*alert(what);*/};
		}

		else if (!defaultTO) defaultTO=window.setTimeout(function(){
			var html=document.documentElement.innerHTML;
			if (html.find("app102452128776_giftsTab")) sendMessage('status=-15');
		},5000);
	};

	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end