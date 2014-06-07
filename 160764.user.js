// ==UserScript==
// @name           Wall Manager Sidekick (Farmville)
// @description    Assists Wall Manager with Farmville posts
// @include        /(^http(s)?:\/\/(apps\.facebook\.com\/onthefarm\/|(.*)\.farmville\.com))/
// @include        http*://www.facebook.com/plugins/serverfbml.php
// @include        https://www.facebook.com/pages/FB-Wall-Manager/*
// @include        /https?:\/\/www\.facebook\.com\/dialog\/apprequests\?(.*)(app_id=102452128776)(.*)/
// @exclude        /(suggestionhub|neighbors)(\.php)?/
// @exclude        http*farmville.com/flash.php?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        6.0
// @copyright      Charlie Ewing & Donald Mapes & Stephanie Mcilwain
// ==/UserScript== 

(function() { 
	var version = "6.0";
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
		var compareFunc = function(a,b){
			var s1=a.toLowerCase(), s2=b.toLowerCase();
			if (s1.contains(s2)) return -1; //when a contains b, a must come first
			else if (s2.contains(s1)) return 1 //when b contains a, b must come first
			else return 0; //no order change is required
		};
		this.sort(compareFunc);
		return this;
	};
	//reconstruct an array, turning it into definitions using a prefix
	Array.prototype.toDefinitions = function(prefix){
		var mapFunc = function(o,i,p){
			return prefix+o.noSpaces().toLowerCase();
		};
		return this.map(mapFunc);
	};


	var suggestedVote=window.location.href.getUrlParam("suggestedVote");
	if ((window.top==window.self) && (suggestedVote!=null)) {
		hashToIframes("&suggestedVote="+suggestedVote);
	};

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^https:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) {
	
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
						location.href="https://apps.facebook.com/?#status="+status;
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
		for (var a=0,l=arguments.length;a<l;a++) {
			var o=arguments[a];
			for (var v in o) {
				ret[v] = o[v];
			}
		}
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
			hwnd.location.href = "https://www.facebook.com/reqs.php?#"+s;	
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
		items2:{backgroundColor:"pink"}, //or css:"newOpt2"
		items3:{backgroundColor:"yellow"}, 
		items4:{backgroundColor:"violet"},
		items5:{backgroundColor:"royalBlue"}, //or css:"newOpt3"

	};
	
	//mark all these as new while building the menus
	//this collection of arrays is accessed directly by createmenufromarray so you dont need to pass it each time.
	var newItems={
		unreleased:[

			
			
			],
		items1:[
"adopt_foalblackminiaturedonkey",
"adopt_foalminiriviera",
"adopt_foalminiseaglassdonkey",
"adopt_foaleasterflowersfilly",
"adopt_foalgiftwrapped",
"adopt_foalpastel",
"adopt_foalpinkpansies",
"adopt_foalgoldtile",
"adopt_foalmenorquin",
"adopt_foalolympian",
"adopt_foalromanhelm",
"adopt_foalseaglass",
"adopt_foalspanishdancer",
"adopt_foalbunnypegacorn",
"adopt_foalcarefreepegacorn",
"adopt_foalcolourwavepegacorn",
"adopt_foaldaisyflowerpegacorn",
"adopt_foaleasterdyepegacorn",
"adopt_foalfloralpegacorn",
"adopt_foalhummingbirdpegafoal",
"adopt_foallamplightpegacorn",
"adopt_foalmermaidpegacorn",
"adopt_foalmustangpegacorn",
"adopt_foalreflectionspegafoal",
"adopt_foalpurpledahliapegacorn",
"adopt_foalrobinpegacorn",
"adopt_foaltudorrosepegafoal",
"adopt_foalbrimmingheartpegacorn",
"adopt_foalemperorpegacorn",
"adopt_foalflamencopegacorn",
"adopt_foalflyingpegasus",
"adopt_foalgladiatorpegacorn",
"adopt_foalgoldmaskpegacorn",
"adopt_foalgreekgoddesspeagcorn",
"adopt_foalmasqueradepegacorn",
"adopt_foalmother'slovepegacorn",
"adopt_foalseafoampegacorn",
"adopt_foalspanishfanpegacorn",
"adopt_foalstatuepegacorn",
"adopt_foalterracottapegacorn",
"adopt_foalvenetianpegacorn",
"adopt_foaldarkrosepegasus",
"adopt_foalmaskedredpegasus",
"adopt_foalredbutterflypegasus",
"adopt_foalrubyredpegasus",
"adopt_foalspringfairypegasus",
"adopt_foaltiktokpegasus",
"adopt_foalbougainvilleapegasus",
"adopt_foalmythicwhitepegasus",
"adopt_foalolympuspegasus",
"adopt_foalseaglasswingpegasus",
"adopt_foalunmaskedbutterflypegacorn",
"adopt_foalyellowpetalpegasus",
"adopt_foalfiestapony",
"adopt_foalpegasuspony",
"adopt_foalredrosecolt",
"adopt_foalspanishcolt",
"adopt_foaldandlingunicorn",
"adopt_foalemeraldmaneunicorn",
"adopt_foalflowerbasketunicorn",
"adopt_foalgeekyunicorn",
"adopt_foalspringtimefarmunicorn",
"adopt_foalvenetianredunicorn",
"adopt_foalandalusianunicorn",
"adopt_foalcarnivaleunicorn",
"adopt_foalcarnivaljesterunicorn",
"adopt_foalseadragicorn",
"adopt_foalsirenunicorn",
"adopt_foalvenetiangoldunicorn",
"adopt_foalvenetiangreenunicorn",
"adopt_foalwhitewineunicorn",
"adopt_calfgrandbazaarbull",
"adopt_calfbluegoldbull",
"adopt_calfblueporcelainbull",
"adopt_calfcretanbull",
"adopt_calfmatadorbull",
"adopt_calfspanishbull",
"adopt_calfspanishfighterbull",
"adopt_calfunmaskedrosebull",
"adopt_calffloral",
"adopt_calffuchsiafairy",
"adopt_calflinum",
"adopt_calfmulticolored",
"adopt_calfrainbowglass",
"adopt_calfsantonisunset",
"adopt_calfscarecow",
"adopt_calfwhiterivieratoy",
"adopt_calffestive",
"adopt_calfgreco",
"adopt_calfspanishmosaic",
"adopt_fawnbloomingfairydream",
"adopt_fawncheerfuldream",
"adopt_fawnchippereyeing",
"adopt_fawnheatherdream",
"adopt_fawnholidaylightdream",
"adopt_fawnjellybeandream",
"adopt_fawnportsunsetdream",
"adopt_fawnpricklypear",
"adopt_fawnspringfallowdream",
"adopt_fawntunein",
"adopt_fawntwinklingdream",
"adopt_fawnathena",
"adopt_fawnfestiveflame",
"adopt_fawnfuchsiaswirl",
"adopt_fawngoldenhinddream",
"adopt_fawnitalianporcelain",
"adopt_fawnmatafawn",
"adopt_fawnrenaissancedream",
"adopt_fawnromandream",
"adopt_fawnspanishrosedream",
"bushel_aphroditehearts",
"bushel_bubbles",
"bushel_clockspirestalks",
"bushel_espressocups",
"bushel_fireflygrapes",
"bushel_honeysuckle",
"bushel_orangecalendula",
"bushel_pinkeasterlily",
"bushel_rainbowcloud",
"bushel_springroses",
"bushel_aquacantaloupe",
"bushel_blueglassrose",
"bushel_brusholive",
"bushel_bugloss",
"bushel_cardoon",
"bushel_chioggiabeets",
"bushel_daphne",
"bushel_flamencoanemone",
"bushel_freckledwhitegrape",
"bushel_fuchsiabougainvillea",
"bushel_goldenoregano",
"bushel_limabean",
"bushel_lowlandpistachios",
"bushel_mediterraneanbuttercup",
"bushel_orangebellpepper",
"bushel_pinotnoirgrape",
"bushel_rosemary",
"bushel_saffroncrocus",
"bushel_sanmarzanotomato",
"bushel_seaglasswheat",
"bushel_seaholly",
"bushel_sealavender",
"bushel_solchickpeas",
"bushel_strawberrycarrots",
"bushel_yellowtrillium",
"egg_abarcelonaglass",
"egg_carnival",
"egg_easterbunny",
"egg_goldenjewel",
"egg_greek",
"egg_hermes",
"egg_maskedrose",
"egg_persian",
"egg_portofino",
"egg_rainbowskies",
"egg_shutterbug",
"egg_springflower",
"egg_tango",
"egg_teapot",
"egg_tulip",
"egg_wordsmith",
"egg_zinnia",
"egg_zinniassilky",
"tree_arcadia",
"tree_austriangentian",
"tree_bellflowerlights",
"tree_blackolive",
"tree_bloomingalmond",
"tree_blueflamencoflower",
"tree_boldbordeaux",
"tree_bulgarianrose",
"tree_bunny",
"tree_burstingbutterfly",
"tree_cactuspear",
"tree_caffelatte",
"tree_carnivalmask",
"tree_carvedcolumn",
"tree_chiantisunset",
"tree_climbingrose",
"tree_colorfulfannedquilt",
"tree_delightfuldaffodil",
"tree_downyserviceberry",
"tree_dualbougainvillea",
"tree_dwarf",
"tree_eastercookie",
"tree_easterribbon",
"tree_easternredbud",
"tree_emeraldapple",
"tree_enchantedoflife",
"tree_fairymusic",
"tree_flamencoflower",
"tree_flamencoruffle",
"tree_floweranchor",
"tree_frenchlily",
"tree_goldseatile",
"tree_goldenemerald",
"tree_grecianmosaic",
"tree_grecianstair",
"tree_greeklaurel",
"tree_hawthorn",
"tree_heatherflower",
"tree_hedgemaze",
"tree_icedmocha",
"tree_indianpipe",
"tree_juicypomegranate",
"tree_lake",
"tree_lavenderolive",
"tree_lighttrail",
"tree_lighteningbolt",
"tree_livelylily",
"tree_luckystar",
"tree_lushlavender",
"tree_magicpottedlemon",
"tree_marrakechlamp",
"tree_moroccanlantern",
"tree_mysticalwaterfall",
"tree_opulenteggfantasy",
"tree_ornateplates",
"tree_pastelalmonds",
"tree_pastelrose",
"tree_peacefulprimrose",
"tree_pistachioshell",
"tree_pixiehideout",
"tree_polkadotpastel",
"tree_pottedlemon",
"tree_purplecypress",
"tree_rainbowumbrella",
"tree_redbuckeye",
"tree_redbrick",
"tree_rivierablooms",
"tree_rivieracitrus",
"tree_rivierahangingflowers",
"tree_rivieralights",
"tree_romanhelm",
"tree_rubyswirl",
"tree_santorinibeach",
"tree_santorinisunshine",
"tree_seatile",
"tree_softscilla",
"tree_spanishfans",
"tree_spanishrose",
"tree_springfairaward",
"tree_springfairyhouse",
"tree_springfairylights",
"tree_springfairyribbons",
"tree_springwhispers",
"tree_springwillow",
"tree_teemingtulip",
"tree_whimsicalwisps",
"tree_wildplum",
"tree_willo'wisp",
"tree_windmosaic",
"tree_wishingmoon",
"tree_pinkfloweringdogwood",
"tree_coliseumwallcypress",
"tree_sunsetbougainvillea",
"tree_giantarcadia",
"tree_giantblackolive",
"tree_giantbloomingalmond",
"tree_giantblueflamencoflower",
"tree_giantbunny",
"tree_giantburstingbutterfly",
"tree_giantcactuspear",
"tree_giantcaffelatte",
"tree_giantcarnivalmask",
"tree_giantcarvedcolumn",
"tree_giantclimbingrose",
"tree_giantcolorfulfannedquilt",
"tree_giantdualbougainvillea",
"tree_giantdwarf",
"tree_giantemeraldapple",
"tree_giantenchantedoflife",
"tree_giantflamencoflower",
"tree_giantflamencoruffle",
"tree_giantfloweranchor",
"tree_giantgoldseatile",
"tree_giantgoldenemerald",
"tree_giantgrecianmosaic",
"tree_giantgrecianstair",
"tree_gianthedgemaze",
"tree_gianticedmocha",
"tree_giantindianpipe",
"tree_giantjuicypomegranate",
"tree_giantlake",
"tree_giantlighttrail",
"tree_giantlighteningbolt",
"tree_giantluckystar",
"tree_giantmarrakechlamp",
"tree_giantmoroccanlantern",
"tree_giantmysticalwaterfall",
"tree_giantornateplates",
"tree_giantpistachioshell",
"tree_giantpixiehideout",
"tree_giantpurplecypress",
"tree_giantrainbowumbrella",
"tree_giantredbrick",
"tree_giantrivieracitrus",
"tree_giantromanhelm",
"tree_giantrubyswirl",
"tree_giantsantorinibeach",
"tree_giantseatile",
"tree_giantspanishfans",
"tree_giantspanishrose",
"tree_giantspringfairaward",
"tree_giantspringwillow",
"tree_giantwhimsicalwisps",
"tree_giantwillo'wisp",
"tree_giantwindmosaic",
"tree_giantwishingmoon",
"tree_giantpastelcherryblosom",
"tree_giantsunsetbougainvillea",
"tree_giantcoliseumwallcypress",
"adopt_redglasswhelp",
"adopt_babyharborphoenix",
"adopt_bluebabyocti",
"adopt_blueglasswhelp",
"adopt_carnationcub",
"adopt_watersquirtwhelp",
"anchor",
"ancienturn",
"bistroset",
"blusterybellows",
"buildingstones",
"cabinlog",
"chalkmenu",
"clockgears",
"clockhands",
"coiledrope",
"cookingsalt",
"floralwateringcan",
"flowerpressbook",
"flowertablesetting",
"grecovases",
"millstone",
"natureguide",
"pottedroses",
"purplecanvas",
"redclaybricks",
"rosetrellis",
"seaglassglue",
"shimmeringtape",
"stainedglass",
"statuepedestal",
"storagecrates",
"tentpole",
"mat_patheonisle",
"mat_grottoharbor",
"mat_smallbrokenvase",
"mat_mediumcolumnruin",
"mat_largebrokenvase",
"mat_extralargecolumnruin",
"adopt_chickenitalianrooster",
"adopt_horsemenorquin",
"adopt_pigcintasinese",
"adopt_cowspanishbull",
"adopt_aegeancat",
"adopt_eurasianbear",
"adopt_maskedtiger",
"adopt_foalmedriviera",
"adopt_calfmedriviera",





],


		items2:[
"tree_giantbabybonnet",
"tree_giantcherrypie",
"tree_giantelfinportal",
"tree_giantemeraldribbon",
"tree_giantfallspring",
"tree_giantgreenbeard",
"tree_giantirishclover",
"tree_giantirishharp",
"tree_giantirishoflife",
"tree_giantsleepypoppy",
"tree_giantspringmaypole",
"tree_giantstickynotes",
"tree_gianttinheart",
"tree_giantwitchoftheeast",
"adopt_foalcelticstallion",
"adopt_foalmadhatter",
"adopt_foalmintyfresh",
"adopt_foalbreadandbutterfoal",
"adopt_foalcelticpegacorn",
"adopt_foallavendarpegacorn",
"adopt_foalmoonmagicpegacorn",
"adopt_foalpeacorn",
"adopt_foalpetiteponypegacorn",
"adopt_foalpreeningpegacorn",
"adopt_foalprettypinkpegacorn",
"adopt_foalrainbowbubblepegafoal",
"adopt_foalspringprincesspegacorn",
"adopt_foalstagicorn",
"adopt_foalteacuppegacorn",
"adopt_foaltruebluepegacorn",
"adopt_foalwitchoftheeastpegacorn",
"adopt_foalyellowbrickpegacorn",
"adopt_foalprizeshetlandpony",
"adopt_foalpurplepotpourri",
"adopt_foalchillyunicorn",
"adopt_foalmooonicorn",
"adopt_foalsparklingroseunicorn",
"adopt_foalwondercorn",
"adopt_calfemeraldglass",
"adopt_calfmoonicorn",
"adopt_calfprizeredbull",
"adopt_calfqueenofhearts",
"adopt_calfrainbowbubble",
"adopt_calfreversebelted",
"adopt_calfrosepatternbovine",
"adopt_fawncelticstagdream",
"adopt_fawnpurpleshimmer",
"adopt_fawnsolstag",
"adopt_fawnspring",
"adopt_fawnstarlight",
"bushel_lavenderflowers",
"bushel_lilyofthevalley",
"bushel_milkmaid",
"bushel_muffinhats",
"bushel_pinkanthurium",
"bushel_squirtingsunflower",
"tree_bluebottle",
"tree_bubblebloom",
"tree_bubblemagic",
"tree_bubblesinsidebubbles",
"tree_bubbleswirl",
"tree_cakebite",
"tree_cherrypie",
"tree_cheshirestripe",
"tree_dreamworld",
"tree_dreamycaterpillar",
"tree_elfinportal",
"tree_emeraldribbon",
"tree_fallspring",
"tree_irishclover",
"tree_irishharp",
"tree_irishoflife",
"tree_greenbeard",
"tree_irishclover",
"tree_irishharp",
"tree_irishoflife",
"tree_lavenderjewel",
"tree_lavenderlacetoule",
"tree_lavenderlove",
"tree_paintedrose",
"tree_teaparty",
"tree_pinkburst",
"tree_pinkcandlepearls",
"tree_pinkfantasy",
"tree_prettybabyflower",
"tree_purplepotpourri",
"tree_purplesplashrose",
"tree_purplewavepetal",
"tree_queenofheart's",
"tree_rainbowbubbles",
"tree_redbottle",
"tree_rosebouquet",
"tree_rosepearlsandfeathers",
"tree_shiningbubbles",
"tree_singingflowers",
"tree_sleepypoppy",
"tree_smokepuff",
"tree_springfairybubbles",
"tree_springfairyflower",
"tree_springfairyswing",
"tree_springfairytiara",
"tree_springfairywand",
"tree_springmaypole",
"tree_springmushroom",
"tree_stickynotes",
"tree_throughthelookingglass",
"tree_tinheart",
"tree_witchoftheeast",
"adopt_springleaflamb",
"egg_dragon",
"egg_foolish",
"egg_lavenderlight",
"egg_sparklespring",
"egg_celticphoenix",
"egg_foolish",
"egg_lavenderlight",
"egg_sparklespring",
"egg_celticphoenix",

],
		items3:[
		],
		items4:[
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
		var ret={}, arr2;
		if (arr) {
			//clone the array before sorting
			arr2=arr.slice(0);
			if (sort) arr2=arr2.sort();
			for (var i=0,len=arr2.length;i<len;i++){
				var o=arr2[i];
				//build the real keyname
				var keyName = (prefix||'')+o.noSpaces().toLowerCase();
				//fix its label if needed
				var fixedLabel=screwyTexts[o.toLowerCase()];
				//create the element constructing code
				ret[keyName]={type:'checkbox',label:(fixedLabel || o).upperWords()};
				
				//mark new and stylize
				for (var colorGroup in markAsNew) {
					var toMark = markAsNew[colorGroup];
					if (toMark.inArray(keyName)) {
						//item found listed under colorGroup
						var useColors = markWithColors[colorGroup];					
						for (var newProp in useColors) {
							//push properties to this element
							ret[keyName][newProp]=useColors[newProp];
						}					
					}
				}
			}
			arr2=null; //not needed
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
				o=arr[i];
				ret[(keyPrefix||'')+o.noSpaces().toLowerCase()]=o.upperWords()+(textSuffix||'');
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

		var fruitTypes=["jack o lilys","bubble bean","high roller","lucky marshmallow","bat berry","ghost pumpkin","nymph morels","ramps","bell pepper","blackberry","blueberry","fire pepper","chardonnay","chinese eggplant","goji berry",
				"ghost chili","grape","jalapeno","leek","sichuan pepper","hilo pineapple","purple tomato","raspberry",
				"square melon","straspberry","strawberry","tomato","watermelon","white grape","yellow melon","zinfandel",
				"darrow blackberry","chandler blueberry","cove cranberry","red iceberry","frozen grapes","love strawberry",
				"sangiovese","cabernet sauvignon","syrah","pinot noir","riesling","moscato","sauvignon blanc","pineapple",
				"lilikoi","royal cantaloupe","cantaloupe","pepper","forbidden eggplant","african eggplant","red currant",
				"eggplant","elderberry","cranberry","flame pepper","mini holiday trees",
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
				"manta mushroom","sweet tea cups","parasol",
				"dragon vine","dusk turnip","fairy blossom","fantasy fireflowers","firelight mushroom","flaxen strawberry","gilded flower","goldenseal","harmony rose",
				"kalanchoe","mystical jasmine","obal pumpkin","pericarp potato","sapphire aster","shimmer corn","twilight cups","violet allium","wan raspberry",
				"whytea leaves","yellow dock","zaffre oats","amber carrot","aslant carrot","blakk root","bright stalk","brusen berry","burdock","white garlic","rainbow star",
				"lemon","red radish","apothecary flowerbed","blue bean","corn flower","georgia jet sweet potatoes","gooseberries","jack o lily",
				"lace pumpkin","magic dandelion","oca","parasol","purple potato","spider webs","purple tulip","whispy tombstones","white carnation","yellow daffodil",
				"yellow freesia","pink bows","peruvian lily","ersatz garlic","jack o lantern lights","maple syrup leaves","spa daisy","startichoke","storybooks",
				"bold beets","cinnamon sticks","pumpkin wreaths","red chrysanthemum","storybooks","auroral corn","auroral rosemary","blazing peppers",
				"borealis blueberries","borealis rose","boughs of holly","candle light cranberries","cinnabursts","dazzle apple","fa la la la-lavender",
				"frosted poinsettia","glass candle","glass candycane","glass icicle","glass pinwheel","golden ivy","holiday stained glass","hollybright berries",
				"hollybright poinsettia","hollybright snow peas","kindle onions","luminous ginger","moonlit mistletoe","radiant radish","roasting chestnuts",
				"roman candle cauliflower","santaberries","seasonal spirits","shiny sprouts","silvery squash","sleigh guider cherries","spark wheat","sugar n' sprites",
				"winter turnip","yule logs","country guitars","cumulus puffs","mangosteen","milk thistle","nutmeg","ottomelon","sundae cup","toy flowers",
				"rutabaga","snowflake flowers","hot chocolate mugs","ice lily","night before candies","purple poinsettia","corn flower","frost poppy","purple anthurium","rainbarb",
				"allspice pepper","avocado squash","banana blossom","beryl rain flower","blue agave","blue paradise","bromeliad","butterfly orchid","cassava","chaya spinach","chayote",
				"cocoa coffee","eclipse sunflower","emerald pineapple","golden emeralds","golden wheat","heliconia","jicama","jungle blackberry","jungle puffs","maize","passion flower",
				"pointed pinks","prickly pear","super avocado squash","super banana blossom","super bromeliad","super butterfly orchid","super cassava","super chaya spinach",
				"super chayote","super cocoa coffee","super eclipse sunflower","super emerald pineapple","super golden wheat","super heliconia","super jicama","super jungle blackberry",
				"super maize","super prickly pear","super tomatillo","super turquoise puya","super vanilla vine","super volcano chili pepper","super wild pinto bean","tomatillo",
				"turquoise puya","vanilla vine","volcano chili pepper","wild pinto bean","ballerina tiara","brass bell flowers","chocolate hearts","cowboy lassos","cupid's bow",
				"frost and flame flower","hawaiian lei","lovebird lilies","cupid's arrow","madder root","plum blossom","queen anne's lace","royal crown","sheriff snapdragons",
				"truffle sprout","azure corn","balloon melons","bitty blue tomatoes","bubble glass","coil lily","crystal cranberries","emerald city lollipop","emerald rye",
				"glass strawberries","jade spiralis","mini eggplant","munchkin flower","pink square watermelons","purple dahlias","rainbow starburst","red poppy","ribbon daisy",
				"silver shoes","squash blossom","swirling blue fern","unfolding plumeria","whirling buds","yellow brick beets","yellow rhubarb","dewdrop flowers","pots of gold",
				"venician masks","cloud snapdragons","gloaming gourd","pacifiers","lavender flowers","lily of the valley","milkmaid","muffin hats","pink anthurium","squirting sunflower",
				"aphrodite hearts","bubbles","clock spire stalks","espresso cups","firefly grapes","honeysuckle","orange calendula","pink easter lily","rainbow cloud","spring roses",
				"aqua cantaloupe","blue glass rose","brush olive","bugloss","cardoon","chioggia beets","daphne","flamenco anemone","freckled white grape","fuchsia bougainvillea",
				"golden oregano","lima bean","lowland pistachios","mediterranean buttercup","orange bell pepper","pinot noir grape","rosemary","saffron crocus","san marzano tomato",
				"seaglass wheat","sea holly","sea lavender","sol chickpeas","strawberry carrots","yellow trillium",

				].fixOrder();
		var basketTypes=["apple wood","walnut","orange","lemon","milk jug","wool bundle","cherry","maple syrup","manure bag","poplar wood",
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
				
		var craftshopBushels=["cotton","soybean","carrot","chickpea","sunflower","tomato","aloe vera","jalapeno",
				"pink aster","rhubarb","peanut","leek","wheat","strawberry","lilac","cranberry","double grain","morning glory",
				"coffee","rice","rye","spinach","pattypan","field bean","cotton",
				"pepper","red tulip","golden popp","grape","red currant","acorn squash","alfalfa","amaranth","amber grain","applewood",
				"artichokes","asparagus","bamboo","basil","bell pepper","blackberry","blueberry","broccoli","brussel sprouts","buckwheat","cabbage","candy jasmine","celery",
				"cereses carrot","clover","coral","corn flower","cucumber","dandelion","dazzle apple","eggplant","fava bean","forbs","frosted poinsettia","ghost chili","ginger",
				"glass candle","glass candycane","glass icicle","glass pinwheel","goldenrod flower","gooseberries (pink ones)","green bean","green tea","highbush blueberry",
				"holiday stained glass","hollybright berry","kale","kidney bean","kindle onion","kudzu","lavender","lemons","lentil","licorice plant","lily","lucky marshmallow",
				"luminous ginger","marsh melon","moonlit mistletoe","mustard","oat","parsnip","peruvian lily","pineapple","pink rose","popcorn","pumpkin","purple asparagus",
				"purple orchid","purple potato","purple tulip","rainbow stars","raspberry","red currant","red radish","roasting chest","roman candle cauliflower","santaberry",
				"sea sponge","seasonal spirit","semillion grape","shellfish","shiny sprout","shiraz grape","shooting star","silvery squash","sorghum","spark wheat","squash",
				"star puff cotton","sugar cane","sugar n' sprite","sun fade barley","viola","violet vein spinach","white garlic","white nectarine","wild alfalfa","winter turnip",
				"yellow daffodil","yellow freesia",].toDefinitions("bushel_");
			
		var craftshopleBushels=["candlelight cranberries","auroral rosemary","candlelight cranberries","dazzle apple","hollybright berries","kindle onions",
		"roasting chestnuts","pumpkin","roasting chestnuts","glass candle","spark wheat","moonlit misletoe","glass candycane","golden ivy","luminous ginger",
		"cranberry","auroral rosemary","seasonal spirit","hollybright snow peas","silvery squash","hollybright poinsettia","borealis rose","sugar n sprites",
		"sorghum",].toDefinitions("bushel_");

				
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
		
		var sparklecafeBushels=["auroral corn","auroral rosemary","blackberry","blazing peppers","blueberry","borealis blueberries","candle light cranberries","carrot",
		"cinnabursts","coffee","golden poppy","grape","hollybright poinsettia","hollybright snow peas","kindle onions","lilac","luminous ginger","peppermint","pineapple",
		"pineapple","radiant radish","red tulip","rhubarb","rice","roasting chestnuts","roman candle cauliflower","rye","santaberries","seasonal spirits","shiny sprouts",
		"sleigh guider cherries","strawberry","strawberry","sugar cane","sugar n' sprites","sunflower","wheat","white grape"].toDefinitions("bushel_");
		
		var herbalhutBushels=["avocado squash","bromeliad","emerald pineapple","butterfly orchid","cassava","chaya spinach","chayote","cocoa coffee","eclipse sunflower","golden wheat",
		"heliconia","jicama","jungle blackberry","maize","prickly pear","tomatillo","turquoise puya","vanilla vine","volcano chili pepper","wild pinto bean"].toDefinitions("bushel_");
		
		var porcelainshopBushels=["azure corn","balloon melons","bitty blue tomatoes","bubble glass","coil lily","crystal cranberries","emerald rye","glass strawberries","jade spiralis",
		"mini eggplant","munchkin flower","purple dahlias","red poppy","ribbon daisy","squash blossom","swirling blue fern","unfolding plumeria","whirling buds","yellow brick beets",
		"yellow rhubarb"].toDefinitions("bushel_");
		
		var blueseacafeBushels=["aqua cantaloupe","blue glass rose","brush olive","bugloss","cardoon","chioggia beets","daphne","flamenco anemone","freckled white grape","fuchsia bougainvillea",
		"golden oregano","lima bean","lowland pistachios","orange bell pepper","pinot noir grape","saffron crocus","san marzano tomato","sea lavender","seaglass wheat","sol chickpeas"].toDefinitions("bushel_");



		//this array used to clear highlights
		var allCraftBushels=[].concat(bakeryBushels,pubBushels,wineryBushels,craftshopBushels,craftshopleBushels,spaBushels,restrauntBushels,sweetshoppeBushels,tikibarBushels,
		teagardenBushels,potionshopBushels,patisserieBushels,fairykitchenBushels,coralcafeBushels,aussiewineryBushels,crystalcottageBushels,sugarshackBushels,alchemistshopBushels,
		sparklecafeBushels,herbalhutBushels,porcelainshopBushels,blueseacafeBushels);
		
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
		
		var craftHerbalHut=["atole","chocolatle","cleansing cream","corn tortillas","cure-all","energy elixir","exotic perfume","fiery salsa","floral incense","jungle tonic",
		"pico guacamole","pozole","rejuvenation lotion","scented balm","soothing gel","spiced fruit cubes","sunflower oil","tejate","vanilla candle"];
		
		var craftPorcelainShop=["assorted macaroons","berry tart","emerald tea set","flower box","flower pot tea","frosted scones","fruit cake slice","petal tea cup","pink tea cakes",
		"poppy cupcake","red bubble tea","rhubarb pink lemonade","roasted veggie salad","sleeping sachet","square slices","strawberry crumpets","strawberry munchkin cake",
		"triangle sandwiches","wild flower bouquet","wonderful berry jam"];
		
		var craftBlueSeaCafe=["baklava tarts","burgundy wine","chickpea risotto","chocolate drizzle cannoli","espresso","frosted zeppoles","greek yogurt cantaloupe","leche frita",
		"lemon ricotta cookies","lentil soup","loukoumades","olive bread","pasta salad","pistachio gelato","roasted pepper hummus","spanish sherry","strawberry carrot pop",
		"stuffed peppers","tiramisu slice","turron","zesty biscotti"];




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
		var craftTypes=[].concat(craftBakery,craftSpa,craftWinery,craftPub,craftShop,craftRestraunt,craftSweetShoppe,craftTikiBar,craftTeaGarden,craftPotionShop,craftMistletoeLane,craftFairyKitchen,craftUnidentified,
		craftCoralCafe,craftSugarShack,craftAlchemistShop,craftHerbalHut,craftPorcelainShop,craftBlueSeaCafe);	
		
		//only those crops that can provide crossbred seeds
		var seedTypes=["straspberry","long onion","squmpkin","red spinach","lilac daffy","fire pepper","double grain","purple tomato",
				"sun poppy","whisky peat","purple orchid","flame pepper","sunshine","iris rainbow","bat berry","ghost pumpkin","ottomelon","spa daisy","lovebird lilies",
				"sheriff snapdragon","blue bonnet flower",].fixOrder();

		//only those crops that can be of the supercrop status
		var superCrops=["strawberry","pumpkin","cotton","cranberry","pepper","grape","pink aster","watermelon","yellow melon","ginger","green tea","raspberry","rice","sunflower",
		"wheat","white grape","tomato","green tea","raspberry","rice","sunflower","wheat","white grape","tomato","avocado squash","banana blossom","bromeliad","butterfly orchid",
		"cassava","chaya spinach","chayote","cocoa coffee","eclipse sunflower","emerald pineapple","golden wheat","heliconia","jicama","jungle blackberry","maize","prickly pear",
		"tomatillo","turquoise puya","vanilla vine","volcano chili pepper","wild pinto bean",
].fixOrder();

		//merge all crop types for actual searches
		//do not merge with seedTypes and superCrops as they are searched for differently
		var bushelTypes=[].concat(fruitTypes,basketTypes).fixOrder();

		//trees
		var treeTypes=["frosted butterfly","rainbow cupcake","beds on a pea","baroque pattern","antique lamp","bibliotree","casino burst","goose","woodpecker","accordian","acorn","african tulip","alma fig","amherstia","amur maple","anchor","ancient twist","angel","angel red pomegranate","anti love heart",
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
		"slice of cake","cherry cheese danish","birthday cake stand","sugar cubes","party favors","pinata fun","party hats","bearhug","carrot monster","percolator",
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
		"autumn glow willow","autumn heart","beading","blue sky","candy crayon","candy necklace","coat of arms","egyptian lotus","egyptian tree of life","farmer hat",
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
		"yum plumtree","aerial silk","another world","arcane static","barn","bat lantern","big top","black tartarian cherry","blue bean","bolts and lightning",
		"bride of frankenstein","bug juice","candle lights","cat condo","cauldron-grown","classic pear","conjurer","cotton tuft","creepy scales","cresthaven peach",
		"cumulus fuzz","curtain","dark dragon","day glow calendar","dreamy butterfly","ethereal mist","eyeball","glowing eyes","fire cauldrons","flight of bats",
		"flowering magic","fluffy yarn","fuzzy leaf","gala apple","ghostly","glowing green rose","glowing nightshade","grand jack o'lantern","greybeard","hamster tube",
		"haunted raven","hypnotic","jack-o-lantern balloons","kooky branches","labyrinth","lantern face lights","fairy lantern","light and shadow",
		"lightbulb jack-o-lantern","lights out","lit up candies","lit up candy corns","lit up poison ivy","lit up pumpkins","lit up purple bats","lit up spiders",
		"lit up spider webs","love spell pine","magic cauldron-grown","magic mirror","marigold candle","milk  bottle","monster fur","moon and stars","muertos kite",
		"nesting jack o lantern","pan de muertos bread","pattern umbrella","penny arcade","pet tag","pink southern magnolia","pink puff","pumpkin vine",
		"purple wool batting","rosa menthley plum","rubber band ball","ruffle","ruffle skirt","savannah","sinister pipe organ","skeleton","spiraling candles",
		"spooky forest","spooky masks","square","stormy butterfly","striped lights","sugar flower bloom","sugar sprinkler","super sugar","tricks treats",
		"twinkling twilight","warped","were-thing","white carnation","3 little pigs","aztec feather","beaded pattern","beanstalk","black heart","blueberry frosted","grooved coral",
		"classic apple","classic lemon","classic orange","classic peach","crow","dream sand","enchanted rose","ever after","sea fan","crow stamp","gnarled stamp","haunted owl stamp",
		"wispy stamp","fluffy bon bon","fluffy pattern","fruit bouquet","gnarled","golden harp","hallowdream","haunted owl","holiday fairy","jack's lantern","light castle",
		"mayfire nectarine","mini sugar skulls","moonglow pear","never after","packing peanuts","paper lanterns","princess pea pillows","puffy pink","purple puff","romantic holiday",
		"sacred","six swans","rainbow snowflake","soft puff","starlight starbright","pecan roll","straw and gold","sunlight sparkle","the juniper","violet dryad","winter plum","wispy",
		"witchfire peach","bubble wrap","aquatic","autumn nights","autumnshade","grandma cookie","crystal snowflake","holiday fun","glistening white willow","hot holiday palm","icey whispers snowflake",
		"light beam","light mosaic","neon poinsetta","tin ornament","aluminum party","shimmering fairy bellflower","shimmering icicles","ultraviolet butterfly","united lights","very merry holiday",
		"winter spirits","arch lights","autumn nights","autumnshade","hollybright","borealis bloom","candy lights","grandma cookie","crystal snowflake","dazzling dragonfruit",
		"fall fairy lantern","fall magic","fire mcintosh","glass aquatic foal","glass lava foal","glass ocean foal","frosted pearl peach","holiday fun","glistening lights pine",
		"glistening white willow","glittery winter blutterflies","granny smith","glass aquatic horse","glass lava horse","glass ocean horse","hot holiday palm","icey whispers snowflake",
		"light beam","light bursts","light mosaic","mutant multi-berry","neon poinsetta","nestled lights oak","ombre eggplant","tin ornament","aluminum party","purple snowflake meadow",
		"rainbow stars","shimmering crystalline","shimmering fairy bellflower","shimmering icicles","shining aurora willow","snowy lights","spotted chili","ultraviolet butterfly",
		"united lights","very merry holiday","winter lights cherry blossom","winter spirits","aurora twist","bauble bright","bubble light","candy cane light","crystal evergreen",
		"doily cookie","elf hat","everbright","fuzzy bell","gilded pine cone","giving bear","giving spirit","hollybright ribbon","hollybright","ice light","light spheres","light string",
		"paper wing","snow covered","snow man","starbright","star stack","stocking ","strawberry christmas","twinkle","wizard treehouse","atomic chime","awesome heirloom tomato",
		"billowing mist","braided green bean","chilled berry","cinnamon snowfall","colorbright dewdrop","colorful daisy","colormix tornado","color record","crystal dandelion",
		"golden ring stamp","holiday spirit stamp","partridge stamp","ultimate holiday stamp","festive foilage","fire sparkle ice","flashy","flocked","frozen enchantment","fruitcake",
		"funcake","geo farm","glass apples","glass ombre willow","glass rose blooms","golden glow glass","golden ring","holiday bouquet","holiday cloud","holiday palm","holiday spirit",
		"holiday wish","holly berry crystals","hollybright cane","horse apple","ice lighting","ice mushroom","ice rainbow cumulous","ice","icy iris","icy phoenix fire",
		"irridescent orchid","lava lamp","lighted wreath","lights fantastic","light-up ball","light-up jacks","light-up keyboard","light-up marbles","light-up plastic palm",
		"light-up plastic pine","light-up toy block","light-up toy coil","mystic rainshower","tree of joy","ornament","ornament","partridge","powder","prismatic sunset","prism mist cloud",
		"purple cabbage","purple peace","purple poinsettia","rainblow thunder","rainbow glass swirls","rainbow ring cloud","rainbow storm cloud","rainbow xylophone","red bopple",
		"rings of fire","shimmering sunflakes","sky and diamonds","sparkling frost candle","sparkling ice jewels","sparkling sleigh bells","spectrum light","swirling firefrost",
		"tinsel trim","toy cherry blossom","traditional","trippy butterfly","twinkling spiderweb","ultimate holiday","vintage light string","vintage seasonal wreath","warm winter night",
		"winter chestnut","winter citrus","12 drum","assorted ornaments","black tie party","bubbly fountain","calendar","confetti burst","crystal coal","crystal rainbath",
		"crystal teardrop","diamond corsage","elf party","eminent crystal orb","everlasting fruit","festive new year's","flower portrait","fractal","freeze blast","frosted forgetmenot",
		"frosted gingerbread","frosty cherub wing","frozen music box","fun frayed","fun winter swirl","gift box","gift","gilded holiday","halo","hanging flower","hanging snowlights",
		"hippy sunflower","holiday lace","holiday lace","holiday magic","holiday mood lighting","horn","ice candelabra","ice diamonds","icicle dream","icy bubbly flute","icy twinklebrite",
		"magic elf","magic snowball","mystic dry ice","naughty","new year's light","new year's sparkle","nice","noiseblast","nye ball drop","party sparklers","polka dot cotton ball",
		"rainbow ice crystal","red cup party","royal frost crown","royal ice jewels","royal snowflake","santa","shimmering scepter","snow rattle","snowflake chandelier","soft snowflakes",
		"sparkleglow frost","struck midnight","tiered wine glass","turkish delight","vinyl records","winter carousel","winter confetti","winter daffodil","winter feathers","winter spell",
		"baby bedding","birds of paradise","black hole","blue macaw","bollywood color scarves","butterfly trunk","butterfly twist","cha cha maracas","cyclamen","dazzling disco",
		"emerald elegance","cyclamen stamp","queen ann's lace stamp","tiger lily stamp","red frog","frosted fantasy pine","golden coconut","hawaiian umbrella","ice color blocks",
		"icy sugar maple","jungle cat","mammee apple","mini holidays","mini holidays","monkey family","orchid hala","plentiful papaya","plump avocado","queen ann's lace",
		"sensational samba","shattered moon","snowflake mobile","snow owl","snow play","tiger lily","tiki torch","tropical cycad","turquoise treasure","warm milk and cookies",
		"winter booties","winter hut","achiote","black sapote","blooming tamarind","cacao","cherimoya","crowing flowers","exotic butterflies","exotic colors","fanning leaves",
		"gilded jungle","golden breadnut","gold vine","hanging fire","jungle colors","jungle ruins","leaf patterned palm","legendary feather","maripa palm","pink jackfruit","pink lapacho",
		"sculpted gold","shards of gold","turquoise crown","yellow soursop","aloha orchid fan","animal perch","anti cupid's","apple hearts","apple watermelon","aquarium",
		"aster & lace hearts","ballerina bead","banner","barbed wire heart","billowing burnt orchid","black roses","blooming love candelabra","bowed grevillea","breaking hearts",
		"bromeliad bloom","butterfly crown","buttery butternut squash","candy swirl","caprese mix","cascading toule","cat house in a tree","chained hearts","cheese and fruit tasting",
		"cherimoya","cherry mango","chocolate & rose petals","cloud forest","crystal heart wing","dark diamond","dark flowers bouquet","dazzling lasso","diaphanous dahlia","dorado sunset",
		"faberge heart","fan flower","fanning hugh","farm pomegranate","feathered jungle","feather heart","love balloon","valentine bouquet","fern flower","fine wine bouquet",
		"flirty flirtini","floating tea candle","flowering ceiba","flower jewel","forest mango","forest starfruit","fresh citrus mint","frosted calla lily","frosted delphimium willow",
		"frosted gerbera","frosty lights ice","frozen waterfall","fun can-can","gem pops","stained glass","glitter rose","golden cacao","golden heart burst","gold thread embroidery",
		"gummy ball","hanging black hearts","hanging crystal hearts","hanging horseshoe","heart dew drops","heart monster","hibiscus palm","tree house","ice sparkles and sequin",
		"i heart hollyhocks","jeweled heart crown","jingle bobs","jungle butterflies","ke aloha","key and jeweled heart","ku'uipo lei","lace flowers","lace lillies and pearls",
		"lace love rose","layered cyrstal heart","leilani","lightning trunk","linguini & olive oil","looking glass","love balloon","love bouquet","lovely lupine","loves me loves me not",
		"loving azalea","lumberlove","magic moss","mayan pattern","mixed jewel heart","monacle & gold chain","native beads","native feathers","navajo jewels","nesting","orange raspberry",
		"peanut butter cups","petite fours","pink perfume","pisces fishbowl","plumeria palm","qantuta","quilted lemon","rainforest orchid","red envelope","red lantern",
		"refreshing sangria","romantic chandelier","satin lace snowdrop","shattering hearts","sheriff's stars","sheriff star","shimmering chiffon lace","siren","snow stream","soda pop",
		"spicy flamenco","spiky hearts","spring droplet","stormy hearts","stylish saloon","succulent fig","sunburst bromeliad","swirling ribbons","tea time","thawing colors",
		"thorny bouquet","thorny heart rose","tiger striped bromeliad","twirling fans","valentine bouquet","valentines willow","veiled periwinkle","vinyl","violets and roses",
		"western bouquet","western romance","wild rainbow","wild wild west","zodiac snake","bourbon street dragon","bubble flower","carnival","crackle blue","crystal heart","crystal wand",
		"curled","curled glass pine","curled maple","emerald bubble","emerald crystals","emerald heart","emerald mulga","emerald spire","emerald swirl","emerald wand","ever blue and gold",
		"everblue and gold","fleur de","flower bubble","flower key","flowerdrop","folded ribbons","gear flower","glass red ribbon","gold feather palm","golden coin","good spell",
		"grab apple","grinding gears","hay tassle","heart medallion","heart print","ivydrop","love dream catcher","magic oak twirl","magic water bucket","peace flowers","peace heart",
		"peaceful dove","peaceful lantern","poppy flowers","poppy shrub","porcelain teapot","rainbow","rainbow clouds","rainbow flame","rainbow lily","rainbow spirals","rainbow twister",
		"rainbow willow","scarecrow hat","silver shoes","silver wings","spiral trunk","spiral works","swirling ribbon","tin top","tinker trunk","tuft bow","twirled leaves",
		"twister bubble","verdigris spiral","wicked spell","winkie tin","winkling peace charms","yellow brick","beaded pine","emerald mulga","emerald swirl","glass poppy","glass sparkle",
		"hay flower","hay tassle","heart medallion","magic oak twirl","metal heart","party mardi","party mardi","porcelain leaf","rainbow cloud","rainbow flame","rainbow tin",
		"rainbow twister","rainbow willow","spiral trunk","tuft bow","bagpipe","bayou firefly","book jacket","bows and rings","white brugmansia","castle story","celtic blossoms",
		"celtic butterfly","celtic fairy dust","celtic fairy","celtic fantasy","celtic heart","celtic knot and emeralds","celtic plaid","celtic swirl","cherrybark","dainty daisies",
		"dayglo okra","diamonds and lace","dogwood flower","fancy fleur","fried green tomato","glitter rainbow hearts","gold and rainbow bell flower","gold and rainbow sakura",
		"gold coins and rainbows","gold shimmer trail","gold shooting stars","jeweled oleander","live oak","lovely lilac","lucky crystal charms","lemon meringue","nutall","tree of runes",
		"ornamental cabbage","ornamental pear","paper blossom","paper","pleasant poppy","rainbow butterfly","rainbow fan","rainbow golden coconut","rainbow magic",
		"rainbows and gold butterflies","rainbow rose","celtic shamrock","shumard","sparkling celtic knot","spring bouquet","spring butterflies and rainbow","spring dew drops",
		"spring garden","spring harvest","spring persimmon","spring tulips","tin whistle","wedding bouquet","weeping cherry blossom","blue bottle","bubble bloom","bubble magic",
		"bubbles inside bubbles","bubble swirl","cake bite","cherry pie","cheshire stripe","dream world","dreamy caterpillar","elfin portal","emerald ribbon","fall spring","irish clover",
		"irish harp","irish of life","greenbeard","irish clover","irish harp","irish of life","lavender jewel","lavender lace toule","lavender love","painted rose","tea party",
		"pink  burst","pink candle pearls","pink fantasy","pretty baby flower","purple potpourri","purple splash rose","purple wave petal","queen of heart's","rainbow bubbles",
		"red bottle","rose bouquet","rose pearls and feathers","shining bubbles","singing flowers","sleepy poppy","smoke puff","spring fairy bubbles","spring fairy flower",
		"spring fairy swing","spring fairy tiara","spring fairy wand","spring maypole","spring mushroom","sticky notes","through the lookingglass","tin heart","witch of the east",
		"arcadia","austrian gentian","bell flower lights","black olive","blooming almond","blue flamenco flower","bold bordeaux","bulgarian rose","bunny","bursting butterfly",
		"cactus pear","caffe latte","carnival mask","carved column","chianti sunset","climbing rose","colorful fanned quilt","delightful daffodil","downy serviceberry",
		"dual bougainvillea","dwarf","easter cookie","easter ribbon","eastern redbud","emerald apple","enchanted of life","fairy music","flamenco flower","flamenco ruffle",
		"flower anchor","french lily","gold sea tile","golden emerald","grecian mosaic","grecian stair","greek laurel","hawthorn","heather flower","hedge maze","iced mocha",
		"indian pipe","juicy pomegranate","lake","lavender olive","light trail","lightening bolt","lively lily","lucky star","lush lavender","magic potted lemon","marrakech lamp",
		"moroccan lantern","mystical waterfall","opulent egg fantasy","ornate plates","pastel almonds","pastel rose","peaceful primrose","pistachio shell","pixie hideout",
		"polka dot pastel","potted lemon","purple cypress","rainbow umbrella","red buckeye","redbrick","riviera blooms","riviera citrus","riviera hanging flowers","riviera lights",
		"roman helm","ruby swirl","santorini beach","santorini sunshine","sea tile","soft scilla","spanish fans","spanish rose","spring fair award","spring fairy house",
		"spring fairy lights","spring fairy ribbons","spring whispers","spring willow","teeming tulip","whimsical wisps","wild plum","will o' wisp","wind mosaic","wishing moon",
		"pink flowering dogwood","coliseum wall cypress","sunset bougainvillea",


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
		"wizard lights","yum plumtree","aerial silk","big top","blue bean","cat condo","egyptian jewelry","egyptian wings","ethereal mist","eyeball","flight of bats",
		"flowering magic","hamster tube","fairy lantern","love spell pine","nesting jack o lantern","penny arcade","pet tag","pink puff","pumpkin vine",
		"rosa menthley plum","rubber band ball","ruffle skirt","square","sugar sprinkler","super sugar","warped","white carnation","black heart",
		"blueberry frosted","grooved coral","crow","sea fan","gnarled","hallowdream","haunted owl","jack's lantern","light castle","pecan roll",
		"sunlight sparkle","violet dryad","wispy","witchfire peach","autumn nights","autumn shade","united lights","autumn nights","autumn shade","candy lights",
		"fall fairy lantern","fall magic","fire mcintosh","glistening lights pine","granny smith","united lights","aurora twist","bauble bright","bubble light",
		"candy cane light","crystal evergreen","doily cookie","elf hat","everbright","fuzzy bell","gilded pine cone","giving bear","giving spirit",
		"hollybright ribbon","hollybright","ice light","light spheres","light string","paper wing","snow covered","snow man","starbright","star stack",
		"stocking ","strawberry christmas","twinkle","chilled berry","color record","festive foilage","flashy","flocked","fruitcake","golden ring","holiday bouquet","holiday cloud",
		"holiday palm","holiday spirit","hollybright cane","horse apple","ice","lighted wreath","lights fantastic","tree of joy","ornament","partridge","powder","red bopple","traditional",
		"ultimate holiday","crystal coal","gift box","gift","gilded holiday","halo","horn","rainbow ice crystal","santa","assorted ornaments","frosted gingerbread","holiday lace",
		"holiday magic","magic elf","12 drum","icicle dream","magic snowball","black hole","blue macaw","butterfly trunk","cyclamen","frosted fantasy pine","icy sugar maple","jungle cat",
		"mammee apple","monkey family","plentiful papaya","plump avocado","queen ann's lace","shattered moon","snow owl","tiger lily","turquoise treasure","winter hut","achiote",
		"black sapote","blooming tamarind","cacao","cherimoya","crowing flowers","exotic butterflies","exotic colors","fanning leaves","gilded jungle","golden breadnut","gold vine",
		"hanging fire","jungle colors","jungle ruins","leaf patterned palm","legendary feather","maripa palm","pink jackfruit","pink lapacho","sculpted gold","shards of gold",
		"turquoise crown","yellow soursop","animal perch","anti cupid's","apple hearts","apple watermelon","aquarium","banner","candy swirl","cat house in a","cherry mango","christmas",
		"dark diamond","dorado sunset","fanning hugh","farm pomegranate","feathered jungle","feather heart","flowering ceiba","gem pops","gummy ball","house","lightning trunk",
		"love balloon","love bouquet","lumberlove","native beads","nesting","orange raspberry","peanut butter cups","pisces fishbowl","quilted lemon","red envelope","red lantern",
		"sheriff star","siren","snow stream","soda pop","spring droplet","tea time","thawing colors","thorny bouquet","valentine bouquet","valentines willow","vinyl","zodiac snake",
		"bubble flower","crackle blue","crystal wand","curled glass pine","curled maple","curled","emerald bubble","emerald heart","emerald spire","emerald wand","everblue and gold",
		"flower key","folded ribbons","gear flower","golden coin","grab apple","grinding gears","heart print","magic water bucket","poppy flowers","poppy shrub","rainbow clouds",
		"rainbow lily","rainbow spirals","rainbow","silver shoes","spiral works","tin top","tinker trunk","twirled leaves","twister bubble","verdigris spiral","yellow brick",
		"emerald mulga","emerald swirl","hay tassle","heart medallion","magic oak twirl","party mardi","rainbow cloud","rainbow flame","rainbow twister","rainbow willow","spiral trunk",
		"tuft bow","beaded pine","doubloon palm","bagpipe","book jacket","bows and rings","castle story","diamonds and lace","lemon meringue","tree of runes","paper blossom","paper",
		"tin whistle","wedding bouquet","baby bonnet","cherry pie","elfin portal","emerald ribbon","fall spring","greenbeard","irish clover","irish harp","irish of life",
		"sleepy poppy","spring maypole","sticky notes","tin heart","witch of the east","arcadia","black olive","blooming almond","blue flamenco flower","bunny","bursting butterfly",
		"cactus pear","caffe latte","carnival mask","carved column","climbing rose","colorful fanned quilt","dual bougainvillea","dwarf","emerald apple","enchanted of life",
		"flamenco flower","flamenco ruffle","flower anchor","gold sea tile","golden emerald","grecian mosaic","grecian stair","hedge maze","iced mocha","indian pipe","juicy pomegranate",
		"lake","light trail","lightening bolt","lucky star","marrakech lamp","moroccan lantern","mystical waterfall","ornate plates","pistachio shell","pixie hideout","purple cypress",
		"rainbow umbrella","redbrick","riviera citrus","roman helm","ruby swirl","santorini beach","sea tile","spanish fans","spanish rose","spring fair award","spring willow",
		"whimsical wisps","will o' wisp","wind mosaic","wishing moon","pastel cherry blosom","sunset bougainvillea","coliseum wall cypress",



		].fixOrder();
			
		//bonsai trees
		var treeTypes3=["habanero","andromeda","azalea","flowery","camellia","cherry","crabapple","magic crown of thorn","pomergrante","magic gem","hibiscus","maple","magnolia","orange",
		"pink almond","magic pink azalea","wisteria","magic rainbow prism","magic gum","tulip","weeping willow","white wisteria","aquatic","barberry","adenium","amethyst","bamboo","beech",
		"bobbing apple","brazilian rain","candycorn","chinese perfume","christmas","chrysanthemum","crape myrtle","delphinium","dogwood","dwarf plum","forsythia","fringe","fuchsia",
		"magic gardenia","ginkgo","grape","honeysuckle","key lime","lantana","lavender star","lilac","magic maple","neea","plum","powder puff","rhododendron","quince","rainbow chili",
		"red ribbon","star","white jasmine","white pine","desert rose","fir bonsai II","magic rainbow gem","red rose","magic pink harmony","magic porcelain ginkgo","pink harmony",
		"porcelain ginkgo","barberry ii","magic pink perfume","magic red poppy","red poppy",].fixOrder();
			
		
				
		//building type catcher for random materials
		var buildings=["animal spa","fairy flower","palm paradise","beehive","garage","pig pen","haunted house","dream nursery","craftshop expansion","rainbow pond","summer poolhouse",
				"orchard","funhouse","duck pond","combine","greenhouse","sheep pen","spring garden","craftshop",
				"water wheel","crafting silo","horse stable","wildlife habitat",
				"cove","winter wonderland train station",
				"snow treasure","winter water wheel","feed mill","ice palace",
				"crop mastery billboard","animal mastery billboard","tree mastery billboard","baby playpen",
				"baby bunny hutch","recipe mastery billboard","volcano reef","aquarium","market stall","hawaiian treasure",
				"grove","beach resort","fishing hole","gas pump","hot spring","mountain palace",
				"jade habitat","jade aquarium","dino lab","bloom garden",
				"gnome garden","floating waterfall","imperial shipyard",
				"swimming pond","unicorn island","master lu's study","harmony garden","sunshine doghouse","cupcake doghouse","dream house",
				"baby nursery","sturdy doghouse","sporty doghouse","floating castle","turtle pen","arborist center","farmhand center",
				"dragon lair","tomb treasure","animal workshop","haunted mansion","monster lab","seedling nursery",
				"witchin' cauldron","tree of life","ferris wheel","bumper cars","big windmill","sally's seed shop",
				"bloom mastery billboard","atlantis garden",
				"wishing fountain","bonsai garden","holiday square","holiday treasure","big barnyard","cheery house","extinct animal zoo","herb garden","penguin skate park",
				"crystal garden","enchantment shop","home mushroom","rivermist fortress","troll treasure","garden amphitheater",
				"tree of love","gnome vineyard","mystery crate","fountain geyser","hot air balloon","spring garden","orchard upgrade",
				"horse paddock","livestock pen","aviary","zoo","pet run","cow pasture","atlantis crafting workshop",
				"atlantis palace","atlantis treasure","horse hall","australian treasure","australian crafting workshop",
				"daydream island","australian vineyard","botanical treasure","pegasus pen","astral observatory",
				"sunny float field","space ship","space guardian","slime pile",
				"candy shop","candy factory","eversweet tree",
				"rock candy boulder","candy pile","marshmallow mound","gifting tree","astral observatory","dream deer woods","carnival fun house",
				"destiny bridge","enchanted rose bush","summer hillside","mystical storage cellar","duckula's dark tower","duckula's cryptic castle","irrigation well",
				"hollybright storage cellar","hollybright tree","hollybright park","gift","giant tree house","ice cream parlor","magic biodome","artifact","hidden palace","lovebird roost",
				"barn door","windmill piece","broken silo","fallen house","emerald city","munchkin country","patheon isle","grotto harbor","small broken vase","medium column ruin",
				"large broken vase","extra large column ruin",

				
			].fixOrder();

		//material types
		//defined separately for easy options menu
		var standardMaterials=["clay brick","wooden board","harness","horseshoe","blue baby blanket","bottle","floral bracket",
				"bamboo rail","reed thatch","smoker","beeswax","shovel", 
				"gear","axle","rope","hammer","twine","concrete","hinge","screwdriver","tin sheet","vehicle part","pink baby blanket",
				"honeybee","wrench","clamps","pipe","shrub","grazing grass","fence post","painted wood","water pump","log","stone lantern",
				"steel beam","wire","hay bundle","saddle","bridle","red beam","screw","aluminum siding",
				"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer","snow axle","snow chain","snow gear","sack",
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
				"sparkling stream","crystal soil","seed bulbs","sprouting orb","comet tail","flip flops","kite tail","pig tale","sea water","ship in a bottle",
				"anvil of courage","bright metal","stone of sorcery","charmed clippers","anti-thorn charm","grass patch","nesting hay","rabbit burrow","black bat","duckula coffin",
				"fang","gargoyle","ghost guard","red brick","rope","spider web","water pail","heat stones","salt water","spa towel","evergreen cedar beam","glow nail",
				"holly crowbar","hollybright scissors","holly light fence","holly trough","sparkle lights","sparkle spackle","stardust gate","clay tile","freezer","milkshake cup",
				"scoop","stepping stone","window","bubble potion","butterfly","crystal acorn","mini mattock","hand brush","gilded pedestal","gleaming glyphs","gold stone",
				"bird toy","lovebird feeder","lovebird nest","emerald wood","munchkin hat","silver bell trowel","silver shoe","stardust cement","woodman axe",
				"anchor","ancient urn","bistro set","blustery bellows","building stones","cabin log","chalk menu","clock gears","clock hands","coiled rope","cooking salt",
				"floral watering can","flowerpress book","flower table setting","greco vases","millstone","nature guide","potted roses","purple canvas","red clay bricks",
				"rose trellis","sea glass glue","shimmering tape","stained glass","statue pedestal","storage crates","tent pole",].fixOrder();
			
		var	aviaryMaterials=["clamp","hinge","screwdriver",].fixOrder();
		var enchantedMaterials=["mithrilore","warpstone","starrock","vialofsunlight","magicmaple","raindrop","fairydust","sunlightrope","moongem","armillarysphere","magicmushroom",].fixOrder();				
		var animalbillboardMaterials=["darkplywood","greenlight","orangeoveralls","greenpaper","redroller","redpaste",].fixOrder();
		var animalspaMaterials=["spatowel","saltwater","heatstones",].fixOrder();
		var mistletoelaneMaterials=["lumberjacksaw","powersaw","grainofsugar","grainofspice","everythingnice",].fixOrder();
		var aquariumMaterials=["buoy","filter","oceanrock",].fixOrder();
		var arboristMaterials=["researchpaper","treeincubator","cloningsolution",].fixOrder();
		var craftshopMaterials=["wrench","pipe","clamp","metalwire","ovenrack","copperpipe",].fixOrder();
		var atlantisMaterials=["coralchisel","coralhammer","ultramarinecrystal","horseshoecrabshellshovel","bucketofgoldpaint","coralnugget","marblevase","gardensketches","coralshears","coralcrowbar","coralkey","coralchisel","bronzehammer","ultramarinecrystal",].fixOrder();
		var hollybrightMaterials=["evergreencedarbeam","glownail","hollycrowbar","hollybrightscissors","hollylightfence","hollytrough","sparklelights","sparklespackle","stardustgate",].fixOrder();
		var gnomegardenMaterials=["tinywindow","toadstool","gardenfence",].fixOrder();
		var livestockpenMaterials=["waterpump","steelbeam","wire",].fixOrder();
		var orchardMaterials=["brick","nail","woodenboard","leafblower","pot","rake",].fixOrder();
		var horsepaddockMaterials=["log","saddle","bridle",].fixOrder();
		var cowpastureMaterials=["haybundle","stone","tinsheet",].fixOrder();
		var petrunMaterials=["paintedwood","waterpump","fencepost",].fixOrder();
		var wildlifepenMaterials=["fencepost","shrub","grazinggrass",].fixOrder();
		var zooMaterials=["wrench","shrub","pipe",].fixOrder();
		var australianMaterials=["miningpickaxe","miningkey","whitesand","volcanicrock","blueseawater","winebarrel","fertilesoil","grapefood","stonebench","winebarrel","grapevine",].fixOrder();
		var bunnyhutchMaterials=["babycarrotbunch","bunnybed","branchball","hutchwire","bunnytunnel",].fixOrder();
		var babynurseryMaterials=["pacifier","babyblanket","babymobile",].fixOrder();
		var babyplaypenMaterials=["bluebabyblanket","saltlick","brush",].fixOrder();
		var beachresortMaterials=["tropicalcup","beachsandal","swimsuit",].fixOrder();
		var beehiveMaterials=["smoker","beeswax","woodenboard","queenbee","honeybee","nail","brick",].fixOrder();
		var bigbarnyardMaterials=["trough","barnyardshingle","slopbucket",].fixOrder();
		var bigwindmillMaterials=["windmillblade","woodencog","woodenshaft",].fixOrder();
		var bloomgardenMaterials=["flowertie","gardenedging","trellis",].fixOrder();
		var bloombillboardMaterials=["greentape","yellowpaper","purpleroller",].fixOrder();
		var bonsaigardenMaterials=["graftingtool","bonsaipot","bonsaipedestal",].fixOrder();
		var bumpercarMaterials=["steeringwheel","bumper","seatbelt",].fixOrder();
		var sweetacreMaterials=["candyblaster","candyscoop","creamofbliss","diamondcandypick","essenceoffrosting","marshmortar","silversugarshovel","sugarhammer","sweetaroma",].fixOrder();
		var carnivalfunhouseMaterials=["warpedglass","tentcanvas","balloons",].fixOrder();
		var craftingsiloMaterials=["tinsheet","hinge","screwdriver","screw","redbeam","aluminumsiding",].fixOrder();
		var cropbillboardMaterials=["lightplywood","whiteoveralls","blacklight","whitepaper","blueroller","whitepaste",].fixOrder();
		var crytalgardenMaterials=["crystal","crystalseed","water",].fixOrder();
		var doghouseMaterials=["chewtoy","dogbed","tennisball",].fixOrder();
		var seasonalMaterials=["bird toy","lovebird feeder","lovebird nest","rabbitburrow","nestinghay","grasspatch","lovelypurpleflower","beautifulblueflower","gorgeousgreenflower","pileofsnow","snowmanscarf","snowmanbutton","magichat","gps","silverbell","holidaylights","milkandcookies","holidaycheer","reindeertreat","love","flowertrim","carriagelamp","horsetreat","fancychocolate","cozyblanket","corporatesponsor","snowmachine","icicleramp","bronzehorseshoe","goldmoon","silverclover","snowbrick","nowflake","icenail","snowglobe","iceboard","frozenbeam","bowlofpunch","bucketofpaint","bowlofsnacks","hauntedbrick","goo","creepycandle","knockers","love","flowertrim","fancychocolate",].fixOrder();
		var mysticalMaterials=["anvilofcourage","brightmetal","stoneofsorcery","charmedclippers","anti-thorncharm",].fixOrder();
		var dinolabMaterials=["metalpost","filldirt","cement",].fixOrder();
		var dragonMaterials=["talisman","chisel","magicboulder",].fixOrder();
		var dreamdeerMaterials=["sparklingstream","magicmoss","radiantrays",].fixOrder();
		var dreamnurseryMaterials=["polkadotpajamas","warmmilk","nightcap",].fixOrder();
		var duckpondMaterials=["wateringcan","shovel",].fixOrder();
		var duckulacrypticMaterials=["ghostguard","gargoyle","spiderweb",].fixOrder();
		var duckuladarkMaterials=["blackbat","duckulacoffin","fang",].fixOrder();
		var extinctanimalMaterials=["meteorite","brokenthermometer","foodchain",].fixOrder();
		var jadefallsMaterials=["stonepillar","terracotta","hangingincense","book","dowel","parchment","bamboorail","reedthatch","claybrick","sail","rigging","woodplank","smallaxe","wheelbarrow","boathook","hoveringcharm","cloudbrick","enchantedbamboo",].fixOrder();
		var hawaiiMaterials=["babyfish","stonycoralpiece","volcanomonitor","seawater","flipflops","shipinabottle","largecrowbar","smallcrowbar","smallfishingnet","largefishingnet",].fixOrder();
		var spaceMaterials=["crystalcradle","fizzyfield","gooaway","slimesucker","sunshineorb","bigredbutton","hyperspeedthruster","portalwindow","celestialcrystals","astrosaplings","floatyspore",].fixOrder();
		var winterMaterials=["icepost","coniferdust","candycanebeam","railspike","railtie","lumpofcoal","pickaxe","hairdryer",].fixOrder();
		var hauntedMaterials=["ladle","enchantediron","gummytentacle","thundercloud","rustypost","rustygear","mallet","stonepick","cobweb","deadwood","oldfence",].fixOrder();
		var fairyflower=["pigtale","kitetail","comettail",].fixOrder();
		var farmhandMaterials=["scientificscale","massagestone","buffettray",].fixOrder();
		var feedmillMaterials=["scoop","sack","belt",].fixOrder();
		var ferriswheelMaterials=["gondola","bearings","carnivallight",].fixOrder();
		var fishingholeMaterials=["lure","fishingpole","lilypad",].fixOrder();
		var floatingwaterfallMaterials=["floatingrock","magicwater","sparkleseed",].fixOrder();
		var fountaingeyserMaterials=["magma","goldbar","geode",].fixOrder();
		var gardenamphMaterials=["gardenbrick","gardenvines","gardenstep",].fixOrder();
		var gaspumpMaterials=["levelgauger","steelsheet","fuelpipe",].fixOrder();
		var giftingtreeMaterials=["crystalsoil","seedbulbs","sproutingorb",].fixOrder();
		var groveMaterials=["miniboulder","mulchsoil","turfsoil",].fixOrder();
		var harmonygardenMaterials=["zensand","yellowbamboo","stonelantern",].fixOrder();
		var horsegallMaterials=["prettysaddle","hi-tecsalt","fancyhay",].fixOrder();
		var hotspringMaterials=["bedrock","mineralinfusion","steam",].fixOrder();
		var irisrainbowMaterials=["fairymagic","stardust","enchantedmist",].fixOrder();
		var waterwheelMaterials=["gear","axle","rope",].fixOrder();
		var lighthouseMaterials=["stone","log","steelbeam",].fixOrder();
		var pegasuspenMaterials=["goldenwand","moonray","phoenixfeather",].fixOrder();
		var garageMaterials=["woodenboard","nail","brick",].fixOrder();
		var recipebillboardMaterials=["sandpaper","woodglue","clamps",].fixOrder();
		var sallyseedMaterials=["flowerapron","dryingrack","pepperpacket",].fixOrder();
		var seedlingnurseryMaterials=["fertilizerstake","seedlingtray","mulch",].fixOrder();
		var astralMaterials=["starchart","telescope","coffeethermos",].fixOrder();
		var summerpoolsideMaterials=["summersun","swimmies","poolhouseplans",].fixOrder();
		var sunriseforestMaterials=["stardust","sunriseseed","sunburstcloud",].fixOrder();
		var swimmingpondMaterials=["skimmer","leafnet","waterbucket",].fixOrder();
		var treebillboardMaterials=["scaffolding","maskingtape","woodstain",].fixOrder();
		var treeoflifeMaterials=["lifeessence","magicbubble","puffycloud",].fixOrder();
		var treeofloveMaterials=["teddybear","heartleaf","cupid'sarrow",].fixOrder();
		var turtlepenMaterials=["javafern","driftwood","pottingsoil",].fixOrder();
		var unicornislandMaterials=["enchantedblossom","rainbowclover","heartofgold",].fixOrder();
		var wishingfountainMaterials=["drillbit","coppertube","cutbamboo",].fixOrder();
		var gianttreehouseMaterials=["claytile","steppingstone","window",].fixOrder();
		var icecreamparlorMaterials=["freezer","milkshakecup","scoop",].fixOrder();
		var magicbiodomeMaterials=["bubblepotion","butterfly","crystalacorn",].fixOrder();
		var rainforestMaterials=["minimattock","handbrush","gildedpedestal","gleamingglyphs","goldstone",].fixOrder();
		var emeraldvalleyMaterials=["emeraldwood","munchkinhat","silverbelltrowel","silvershoe","stardustcement","woodmanaxe",].fixOrder();
		var rivieraMaterials=["ancienturn","anchor","stainedglass","statuepedestal","shimmeringtape","seaglassglue",].fixOrder();
		var countryclockMaterials=["clockgears","clockhands","redclaybricks",].fixOrder();
		var wildlifelodgeMaterials=["buildingstones","cabinlog","natureguide",].fixOrder();



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

		var craftingMaterials=[].fixOrder();
				
		//removed all quest items and linked them to sendhelp
		var questItems=[];

		//merge materials for searching
		var materials=[].concat(standardMaterials,otherConsumables,craftingMaterials,specialMaterials,specialEvents,animalspaMaterials,animalbillboardMaterials,
		aquariumMaterials,arboristMaterials,astralMaterials,atlantisMaterials,australianMaterials,babynurseryMaterials,babyplaypenMaterials,beachresortMaterials,
		beehiveMaterials,bigbarnyardMaterials,bigwindmillMaterials,bloombillboardMaterials,bloomgardenMaterials,bonsaigardenMaterials,bumpercarMaterials,
		bunnyhutchMaterials,carnivalfunhouseMaterials,cowpastureMaterials,craftingsiloMaterials,craftshopMaterials,cropbillboardMaterials,crytalgardenMaterials,
		dinolabMaterials,doghouseMaterials,dragonMaterials,dreamdeerMaterials,dreamnurseryMaterials,duckpondMaterials,duckulacrypticMaterials,duckuladarkMaterials,
		extinctanimalMaterials,fairyflower,farmhandMaterials,feedmillMaterials,ferriswheelMaterials,fishingholeMaterials,floatingwaterfallMaterials,
		fountaingeyserMaterials,garageMaterials,gardenamphMaterials,gaspumpMaterials,giftingtreeMaterials,gnomegardenMaterials,groveMaterials,harmonygardenMaterials,
		hauntedMaterials,hawaiiMaterials,hollybrightMaterials,horsegallMaterials,horsepaddockMaterials,hotspringMaterials,irisrainbowMaterials,jadefallsMaterials,
		lighthouseMaterials,livestockpenMaterials,mistletoelaneMaterials,mysticalMaterials,orchardMaterials,pegasuspenMaterials,petrunMaterials,recipebillboardMaterials,
		sallyseedMaterials,seasonalMaterials,seedlingnurseryMaterials,spaceMaterials,summerpoolsideMaterials,sunriseforestMaterials,sweetacreMaterials,
		swimmingpondMaterials,treebillboardMaterials,treeoflifeMaterials,treeofloveMaterials,turtlepenMaterials,unicornislandMaterials,waterwheelMaterials,
		wildlifepenMaterials,winterMaterials,wishingfountainMaterials,zooMaterials,enchantedMaterials,emeraldvalleyMaterials,rainforestMaterials,rivieraMaterials).fixOrder();
		
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
				"winter's glow calf","mistletoe lane","mystical grove","candy cane","green patch","holiday wreath","lunar new year","pink patch","purple valentine","red brown",
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
				"crystals fairy","go lightly","green sweater","my fair lady","atlantean","spa cow calf","med riviera",
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
				"furry purple","babe blue bull","flickering lights","shadow furred","classic black angus","jack-o-lantern","sacred heart",
				"classic jersey","french milk","frilled nudibranch","garlic","marigold","silver","extra longhorn","leafy","winter's glow","arctic",
				"borealis bovine","frost light","holiday spirit","tie dye","beast prince","australian braford","combed","fluffy","holly berry",
				"rainbow ring bovine","snow angel","swirly glass","hl calf","hollybright plush","juke box","snow fairy","ugly sweater holiday",
				"frosted jeweled","red carpet","archangel","devil","strawberry baby","toasty","frost light cracker","mumu moo","stego","tiki mask","feathery headdress ","long eared",
				"pink plume","antipid","blue lace buttercup bovine","jaguar patterned","peach rings","calfpid","spring thaw","strawberry milk","el dorado","glass blown","green horn",
				"mardi gras","munchkin","poppy","shaggy","spring flowers","spring highland","emerald valley","champagne","lemon","paper","pretty holstein","rainbow swirl","emerald glass",
				"moonicorn","prize red bull","queen of hearts","rainbow bubble","reverse belted","rose pattern bovine","floral","fuchsia fairy","linum","multicolored","rainbow glass",
				"santoni sunset","scarecow","white riviera toy","festive","greco","spanish mosaic",


			].fixOrder();
		
		var oxenTypes=["black ox","blue ox","grey oxen","red devon ox","baby ox","zodiac ox","canoe pattern ox",].fixOrder();
		
		var bullTypes=["pink patch bull","holstein bull","randall bull","irish moiled bull","flower bull","wagyu bull",
				"groom bull","black rose bull","holiday bull","peppery bull","wall street bull","dragon bull",
				"bull","elizabethan bull","atlantean bull","milk man bull","blown glass bull","bradford bull","bestman bull","rider bull",
				"bashel bull","blue mane bull","five horn","weightlifter bull","banner bull","luna bull","glowing horns bull","hollybright bull","holiday spirit bull",
				"red masked bull","diamond ring bull","taurus bull","dragonfly bull","gilded bull","poppy bull","grand bazaar bull","blue gold bull","blue porcelain bull","cretan bull",
				"matador bull","spanish bull","spanish fighter bull","unmasked rose bull",

			].fixOrder();
		
		//combines all calves to one array for easy searching
		var allCalves=[].concat(calfTypes,bullTypes,oxenTypes).fixOrder();
				
		var yakTypes=["gray baby","black baby","baby"].fixOrder();

		var foalTypes=["el dorado","emerald valley","show jump horse","circus act horse","pageant horse","samba unicorn","ballet horse","ladybug","mistletoe lane","mystical grove","4 leaf clover pegacorn","50s mom unicorn","a winter rug","abaco barb horse","akhal-teke","alexandrite","alien unicorn","aloha","aloha mini","aloha pony",
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
		"4th birthday pegacorn","4th birthday unicorn","bee keeper pegacorn","calla lily pegacorn","cheerleading pegacorn","flowerchild pegacorn","crochet pegacorn","detective pegacorn","nota pegacorn",
		"rainbow fairy pegacorn","scaley pegacorn","soap suds pegacorn","spring dress pegacorn","spring meadow pegacorn","suit & necktie pegacorn","white were pegacorn","racing pegasus",
		"glee club pony","shag","prom king stallion","stylish stallion","4th birthday unicorn","blue crystal unicorn","mummycorn","racing unicorn","rainbow ribbon unicorn",
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
		"summer harvest unicorn","star rider unicorn","gold ruby unicorn","lollipop swirl","solar system unicorn","carved candle","super costume",
		"majorette mare","scottish","bioluminescent pegacorn","flower stead pegacorn","glowing pegacorn","patriot pegacorn","patriotic pegacorn",
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
		"purple blaze unicorn","sun-spot unicorn","white-gold unicorn","underworld zebra","caro-mini pegacorn","fluffy pegacorn","fuzzy pegacorn","romantic pegacorn",
		"southern magnolia pegacorn","mint julep unicorn","spotted unicorn","blueberry","blue fire mustang","whitewater","magic speckled pegacorn","night raven pegacorn",
		"peacock pegacorn","sandman pegacorn","shadow dragon pegacorn","starry night pegacorn","eternal glow unicorn","hang glider unicorn","nightmare unicorn",
		"witchcraft unicorn","dod mariachi burro","appaloosa","classic andalusian","english jumping","scarey marey","black crow pegacorn","bursting bats battacorn",
		"dod monarch pegacorn","fairy pumpkin pegacorn","glowing ghoul pegacorn","glowing purple battacorn","glowing skeleton pegacorn","magical black beauty pegacorn",
		"blue scene pegasus","fairyfly pegasus","pet paw pegasus","miniature shetland","beadacorn unicorn","dark bats unicorn","dark & stormy unicorn",
		"ghost gnome unicorn","pennsylvania mini horse unicorn","swirling gold unicorn","glowing zebra","gifting donkey","classic clydesdale","dwarf mini","chocolate","full moon",
		"lionfish sea","little mer-mare","starlight","tennessee walking","blue fairy pegacorn","catrina pegacorn","count pegacorn","flufficorn","fluffy dream pegacorn",
		"gilded armor pegacorn","glass princess pegacorn","lime pop pegacorn","light fantasy pegacorn","treasure peganarwhal","winter romance pegacorn","witchfire pegacorn",
		"bare bones pegasus","magic tailed pegasus","were pegasus","classic pony","vampony","werepony","chess unicorn","fetching unicorn","golden hair unicorn","lemon cake unicorn",
		"shimmering winter","autumn night pegacorn","mystic twilight pegacorn","shimmering aurora pegacorn","sugarplum fairycorn","winter's light pony","bright rad unicorn","snowflake burst unicorn",
		"fall appaloosa","glass autumn","glass blizzard","glass cloud","glass forest","glass solar system","shimmering winter","arctic","bells","holiday carousel",
		"holiday cheer","hollybright","hollybright clydesdale","holly carriage","winter spot","autumn night pegacorn","bright lights pegacorn","butterburst pegacorn",
		"colorburst pegacorn","flame wing pegacorn","frosted snowflake pegacorn","heart light pegacorn","leafy pegacorn","purple peak","mystic twilight pegacorn",
		"shimmering aurora pegacorn","skyline pegacorn","sugarplum fairycorn","arctic wind pegacorn","aurora pegacorn","blue aurora pegacorn","bright twist pegacorn",
		"brightwing pegacorn","cardinal wing pegacorn","celebration pegacorn","flame bright pegacorn","frostlight pegacorn","golden feather pegacorn",
		"holiday lights pegacorn","hollybright fairycorn","prismatic pegacorn","sparklehoof pegacorn","swirling pegacorn","winter comfort pegacorn","aurora pegasus",
		"dance club pony","hoedown pony","winter's light pony","hollybright pony","holiday colt","northern lights colt","blacklight buttercorn","bright rad unicorn",
		"frost star unicorn","northern lights unicorn","orchard unicorn","sleigh bells unicorn","snowflake burst unicorn","arctic unicorn","borealis unicorn",
		"brightmane unicorn","lighthorn unicorn","shire wreath unicorn","spearmint lights unicorn","starbright unicorn","autumn pegacorn","fall fantasy pegacorn","golden leaf pegacorn","autumn sun unicorn",
		"classy clydesdale","dun australian stock","fairyfrost mist mare","feelin fancy","harvest clydesdale","harvest market","ombre stallion","pop palomino","snowy","spectrum light",
		"sunset glass","apple dapple pegacorn","autumn pegacorn","fall fantasy pegacorn","autumn festival pegacorn","golden leaf pegacorn","blown glass pegacorn","butterfairy pegacorn",
		"candycane pony pegacorn","carol pegacorn","cheery pegacorn","light doll pegacorn","market square pegacorn","naughty or nice pegacorn","parade helper pegacorn",
		"philippines pegacorn","princess doll pegacorn","rainbow mystic pegacorn","season spirit pegacorn","sugar plum pegacorn","symphony pegacorn","vintage bells pegacorn",
		"winters night pegacorn","gingerbread pegasus","elegance pegasus","holiday fun pegasus","toy pegasus","ribbon pony","tinsel maned pony","icelightning colt","autumn sun unicorn",
		"country star unicorn","heirloom unicorn","holiday frost unicorn","magestic toy unicorn","mood ring unicorn","rainbow sparkle unicorn","storytime unicorn","apple unicorn",
		"chinese dragicorn","fairy fawnmother pegacorn","holiday rocking","daisy pattern pegacorn","hearth's glow pegacorn","holiday party pegacorn",
		"mystic elven pegacorn","pegallamicorn","sequin butterfly pegacorn","winter wreath pegacorn","fairy tresses unicorn","festive holiday unicorn",
		"holly harness unicorn","holiday party","royal snow guard","party time pegacorn","pretty party pegacorn","santa pegasus","snow queen pegacorn",
		"sleet and snow unicorn","coal","ice sparkle","present","sparkler stallion","coal pegacorn","fancy nye pegacorn","magestic royal ice pegacorn",
		"nightflight pegacorn","north pole pegacorn","present pegacorn","santa's pegacorn","seasons greetings pegacorn","snow cherub pegacorn",
		"naughty pegasus","nice pegasus","luminous white unicorn","winter onesie unicorn","bromeliad","feathered saddle","helleborus","jaguar","snowflake mini horse","red velvet",
		"carved wooden","feather mane","long feathered","mangalarga marchador","purple treasure","zubo","aloha american cream pegacorn","chilly breeze pegacorn","holiday flower pegacorn",
		"jungle paradise pegacorn","parrot wings pegacorn","pegasaurus rex","pineapple pegacorn","pure gold pegacorn","snow fun pegacorn","white swan pegacorn","winter white pegacorn",
		"gilded flight pegacorn","gleaming mask pegacorn","jaguar paint pegacorn","painted markings pegacorn","penacho pegacorn","ruby wings pegacorn","exotic wing pegasus",
		"butterfly pegasus","gold armor pegasus","jewel wings pegasus","petal wings pegasus","totemic pony","blue hawaiian colt","jade stencil colt","saddled jade colt","warrior stallion",
		"red comet unicorn","wild pansy unicorn","wooly unicorn","heart saddle unicorn","love rose unicorn","painted sun unicorn","lavender flower unicorn","warrior stripes unicorn",
		"1950s play","anthurium black friesian mare","aquarius","beryl flower","black forest chestnut","broken heart","clear skies","clydesdale flower saddle","happy heart","jadefire",
		"village mini horse","moonlit romance","rosie the","victorian flower","western hero","zodiac","anti pegacorn","beaded azalea pegacorn","black lace periwinkle pegacorn",
		"black panther pegacorn","black rose pegacorn","champagne pegacorn","dark chocolate port pegacorn","dark cupid pegacorn","dream pet pegacorn","everlasting love pegacorn",
		"flower quilt pegacorn","glowing hooves pegacorn","gold wing macaw pegacorn","hug & kiss pegacorn","jeweled aztec king pegacorn","jeweled faberge pegacorn","love warrior pegacorn",
		"lunar year pegacorn","majestic spring pegacorn","palomicorn","pinotcorn","pistachio divinity pegacorn","purple lightning pegacorn","quetzalcorn","red rose pegacorn",
		"shattering hearts pegacorn","sheriff pegacorn","star skating pegacorn","tennesee pegacorn","western colors  pegacorn","western pattern pegacorn","bad romance pegasus",
		"daisy the pegasus","funnel cake pegasus","rainforest moth pegasus","romantic pegasus","sheriff pegasus","sunset beach pegasus","peanut brittle pony","pet helper pony",
		"polka dot pony","broken hearted colt","love stud colt","red colt","royal romeo colt","akhal teke unicorn","bengal unicorn","black cat unicorn","breath-taking ballerina unicorn",
		"bromeliad unicorn","disco fever unicorn","glittery black hearts unicorn","heart harness unicorn","irridescent rainforest unicorn","love zebracorn","lumberjack unicorn",
		"royal juliet unicorn","teddy bear unicorn","blooming peace pegacorn","blue glass pegacorn","blue munchkin pegasus","chateau colt","curled ribbon pony","dorothy pegacorn",
		"emerald bridle camarillo","emerald glass","emerald lace pegacorn","emerald saddle","flower celebration pegacorn","garden helper","glacier's grace pegacorn",
		"gold and silver pegacorn","gold brick colt","golden emerald pegacorn","good luck pegacorn","good witch pegacorn","jester pegasus","king cake pony","lioness unicorn",
		"munchkin blue pegasus","mystick mist pegacorn","natural spring pegacorn","peaceful dove pegacorn","poppy pegacorn","porcelain pegasus","porcelain trim",
		"rainbow butterfly pegasus","rainbow magic pegacorn","rainbow mist unicorn","rainbow sky pegacorn","ribbon pegacorn","royal emerald pegacorn","scarecrow pony",
		"shamrock shine pegacorn","silver works","spiral locks pegacorn","sun magic pegacorn","tic tok","tin woodsman pony","twelfth night","twister pegacorn","wicked witch pegacorn",
		"winkie pegacorn","winkie unicorn","wonderful wizard pegacorn","fairy rex","parade queen pegacorn","rainbow mist pegacorn","pink masque pegasus","munchkin parade unicorn",
		"lavender veil mini-horse","spanish moss mini mare","mushroom","paper","pretty pinto","arabian stallion pegacorn","autumn leaf pegacorn","carnisparkle pegacorn",
		"celtic butterfly pegacorn","celtic fairy pegacorn","celtic knight pegacorn","highland pegacorn","ice water pegacorn","lemon pegacorn","oracle pegacorn","primrose pegacorn",
		"sequins pegacorn","springtime pegacorn","twinkling firefly pegacorn","wedding pegacorn","winter blue pegacorn","autumn leaf pegasus","ice water pegasus","lemon pegasus",
		"rainbow and gold fantasy pegasus","runic pegasus","springtime pegasus","winter blue pegasus","aetherial unicorn","autumn leaf unicorn","digitalis unicorn","ice water unicorn",
		"rainbow and gold swirl unicorn","rainbow glitter unicorn","springtime unicorn","voodoo unicorn","winter blue unicorn","celtic stallion","mad hatter","minty fresh",
		"bread and butterfoal","celtic pegacorn","lavendar pegacorn","moon magic pegacorn","peacorn","petite pony pegacorn","preening pegacorn","pretty pink pegacorn",
		"rainbow bubble pegafoal","spring princess pegacorn","stagicorn","teacup pegacorn","true blue pegacorn","witch of the east pegacorn","yellowbrick pegacorn","prize shetland pony",
		"purple potpourri","chilly unicorn","mooonicorn","sparkling rose unicorn","wondercorn","mini riviera","easter flowers filly","gift wrapped","pastel","pink pansies","gold tile",
		"menorquin","olympian","roman helm","seaglass","spanish dancer","bunny pegacorn","carefree pegacorn","colour wave pegacorn","daisy flower pegacorn","easter dye pegacorn",
		"floral pegacorn","humming bird pegafoal","lamp light pegacorn","mermaid pegacorn","mustang pegacorn","reflections  pegafoal","purple dahlia pegacorn","robin pegacorn",
		"tudor rose pegafoal","brimming heart pegacorn","emperor pegacorn","flamenco pegacorn","flying pegasus","gladiator pegacorn","gold mask pegacorn","greek goddess peagcorn",
		"masquerade pegacorn","mother's love pegacorn","sea foam pegacorn","spanish fan pegacorn","statue pegacorn","terra cotta pegacorn","venetian pegacorn","dark rose pegasus",
		"masked red pegasus","red butterfly pegasus","ruby red pegasus","spring fairy pegasus","tik tok pegasus","bougainvillea pegasus","mythic white pegasus","olympus pegasus",
		"seaglass wing pegasus","unmasked butterfly pegacorn","yellow petal pegasus","fiesta pony","pegasus pony","red rose colt","spanish colt","dandling unicorn","emerald mane unicorn",
		"flower basket unicorn","geeky unicorn","springtime farm unicorn","venetian red unicorn","andalusian unicorn","carnivale unicorn","carnival jester unicorn","sea dragicorn",
		"siren unicorn","venetian gold unicorn","venetian green unicorn","white wine unicorn","med riviera",

].fixOrder();
		
		var assTypes=["mini donkey","toy soldier donkey","african donkey","single donkey","spring donkey","mistle toe donkey",
				"trick or treat donkey","mule","summer donkey","vampire donkey","fairy donkey","donkey","fake cupid donkey","farmer's market donkey","pink zonkey","denim donkey",
				"black miniature donkey","mini seaglass donkey",
			].fixOrder();
		
		//combines all foals to one array for easy searching
		var allFoals=[].concat(foalTypes,assTypes).fixOrder();

		var horseTypes=["black","brown","gray","grey","flowered","cream draft","red pinto","red ","sea pegasus","mysterious pegasus","enchanting pegasus",
		"glamorous pegacorn","elegant pegacorn","victorian","goth","australian draught","stylish stallion","denim donkey","safaricorn","mummycorn","space alien",
		"frosted filly","atlantean","tree spirit","holiday carousel","light blue pony","carved wooden","menorquin",


			].fixOrder();

		var duckTypes=["belted","party","ugly","red-billed","red","brown","yellow","australian wood","maitre d'","suitor","blue-winged teal","atlantean",


			].fixOrder();

		var ducklingTypes=["ugly","red","brown","yellow","blue"].fixOrder();

		var pigTypes=["white","snowflake","space alien","neopolitan","atlantean","giving","gleaming tusks boar","cinta sinese",].fixOrder();

		var sheepTypes=["miner","shoppin' sheep","dwarf blue","elf","luv ewe","sunny ewe",

			].fixOrder();

		var cowTypes=["adaptaur","evening","cow with poofy skirt","rider bull","cyclist","hiker","irish moiled","brown","chocolate","dexter","disco","fan","groovy",
		"longhorn","pink patch","pink","purple valentine","purple","yellow patch","green patch","milking shorthorn","pumpkin",
				"flannel","caroling","smitten","red","mini longhorn","ghengis","real ca milk","golfcourse","treat",
				"trick","caroling","jack frost","cleaning","storage","red","telemark","space alien","candy striped","water spirit","borealis bovine","long eared","spanish bull",
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
				"hearth and home","midnight","pale moon","phoenix","prince charming","sky blue","sorceress","charming","franken-egg","grim reaper","gummy","jack o",
				"light shades","mummy","nightgown and cap","taranchicken","watermelon","atlantean","count cluckula chicken","ghost",
				"paper lantern","pink nightmare","pumpkin chicken","werechick chicken","autumn","frost feather","arctic glow","frostlight","hollybright","holly light",
				"ornament","autumn","frost feather","arctic glow","frostlight","hollybright","holly light","ornament",
				"holiday starlight hen","light bulb","nutcracker","nutcracker ii","singing chicken","sour apple chicken","sparklefairy","stained glass","sunset fire fowl",
				"toy","wild harvest","sledding","ice maiden","ice touched","wired","ice maiden","coal","gift","mystery coal","mystery gift","acashia","cha-cha-egg","hula","egg trooper",
				"ancient chicken","brown bellied araucana","javan junglefowl","legendary","anti","banded feather","bay breeze","bubblegum","champagne","chocolates","cuddly","dandelion",
				"emo emu","fiery feather araucana","glitter pink heart","gold nugget","heart pecking","legendary fire wings","legendary lovebird","legendary song","legendary thunder bird",
				"legendary white eagle","legendary white eagle","lunar feather","mystery cuddly","mystery legendary fire wings","mystery lunar feather","mystery rainbow candy chicken",
				"prima ballerina","purple crystal","quetzal","rainbow candy","red flare","rustic garden","sagittarius","sheriff","solid gold","stawberries and champagne","stormy",
				"white australorp","wild wild","zodiac rooster","bal masque","chakra","emerald glass","emerald soldier","legendary rainbow flight","munchkin","poppy silkie",
				"rainbow feather","rainbow glass","rainbow silkie","rainbow wing","sunrise rooster","sunset hen","rain check","argenta","celtic","fog and rain","gold and rainbow",
				"egg in the clouds","jerk","lemon","rainfeather","spring hen","springtime","usher coat","dragon","foolish","lavender light","sparkle spring","celtic phoenix",
				"a barcelona glass","carnival","easter bunny","golden jewel","greek","hermes","masked rose","persian","portofino","rainbowskies","shutterbug","spring flower","tango",
				"teapot","tulip","wordsmith","zinnia","zinnias silky",


			].fixOrder();
				
		var eggTypes2=["white bunny","yellow bunny","pink bunny","purple bunny","blue bunny","gold bunny"];
				
		//two word or common animal catch all texts
		var chickenTypes=["high fashion","picnic","snow","space alien","coconut puff","midnight","frostlight","italian rooster",].fixOrder();
		
		var dragonTypes=["arajir dragon","danomire dragon","etterius dragon","furilich dragon","ice cream dragon","lemon dragon","rose dragon","sugar dragon","tselius dragon",
		"droopy dragon","peppy dragon",].fixOrder();

		var otherAnimals=["seagull","floaty elephant","bandicoot","arctic hare","australian cattle dog","baby bourbon turkey","festive cat","white wolverine","turtle",
		"beanie fox terrier","big blue tang fish","black and grey ocelot","black rabbit","blue dot elephant","brachiosaurus","white holiday reindeer",
		"bubbly pig","bulk order ostrich","carnotaurus","chinchilla","clumsy reindeer","elephant","black australian cattle dog",
		"coelophysis","crown of thorns starfish","domestic shorthair","dutch rabbit","elf penguin","himalayan cat",
		"english spot hare","fancy goose","farm goose","fedora fox terrier","gallimimus","atlantean cat",
		"halloween tutu hippo","harbor seal","holiday st. bernard","large parrot","lesser flamingo","llama","merle corgi","messenger bag turtle","mistletoe penguin","navy fuschia spotted turtle",
		"peacoat penguin","penguin","poncho llama","porcupine","puffy jacket puffin","raccoon","red giraffe","red grape rabbit","reindeer","ringtail",
		"river float pug","safari bear","shopper tiger","single order ostrich","skinny jeans ostrich","sly rabbit","snow leopard","spa bear",
		"spotted lop hare","striped opossum","tiki mask turtle","treasure seagull","turkey","ugly sweater bear",
		"use it seal","walleye","wfh turtle","white goose","white llama","white rabbit","white turkey","white-tailed buck","winter fox",
		"winter polar bear","zebra giraffe","sea gull with camera","mountain climber cat","dog pilot","tropical cat",
		"bently beagle","tribute terrier","semiformal giraffe","tuxedo giraffe","atlantean elephant","elephant",
		"big bow bear","prom bear","mod doberman","sock hop poodle","farm goose","porcupine","baby elephant","white daisy bunny","snow leopard","arctic hare","australian cattle dog","baby bourbon turkey","big blue tang fish",
		"black and grey ocelot","black rabbit","blue dot elephant","bootcut ostrich","brachiosaurus",
	"tribute terrier","semiformal giraffe","tuxedo giraffe","big bow bear","prom bear","mod doberman","sock hop poodle",
	"painter rex","ballerina rex","beach koala","grizzlyjack","ghost puma","lesser flamingo","snow leopard",
	"space alien bunny","space alien wolf","trolap lyga","coco kitty","circus peanut elephant","pixie stick porcupine","snowflake cat","holiday light porcupine","aurora elephant",
	"emerald striped jaguar","javan jungle fowl","tawny pampas cat","jungle emerald striped jaguar","caracal","aegean cat","eurasian bear","masked tiger",].fixOrder();
				
		//baby animals that aren't calves or foals
		var babyAnimals=["baby goat","baby groundhog","red wolf","coyote pup","wolf cub","brown kitten","baby alpaca","white wolf",
				"baby penguin","white kodiak cub","baby turkey","baby zebra","andean bear cub","baby valentine giraffe","black bear cub",
				"clever cub","lil pink peacock","romeo cub","trick or treat bear","jaguar cub","baby tiger","siberian tiger cub",
				"nutcracker ballerina cub","panther cub","white lion cub","baby bobcat","baby monkey","flower mane cub","baby seal",
				"spring puppy","bear cub","brown baby elephant","baby elephant","brown kitten","red fox kit","gray fox kit",
				"lion cub","baby dragon","kodiak cub","baby white penguin","baby winter seal","baby llama","baby carnival elephant",
				"baby giraffe","candy kid","white kitten","sterling rose cub","heart print leopard cub","tangled ribbon kitten",
				"tangled beads kitty","baby porcupine","cuddling kittens","rainy lion cub","snowy lion cub","cuddling puppies","atlantean panther cub",
				"baby koala","badger cub","corgi puppy","flowery puppy","flying fox","gryphon hatchling","hedgehoglet","puma cub","lynx cub","mallard duckling","otter pup",
				"springly puppy","potbelly piglet","irish fox cub","baby sea turtle","english lop kit","dragon whelp","mitten kitten","kitten with mittens","fennec kit",
				"blue bell platypus","foozbal","wokwok","moonbear cub","frosting baby monkey","gummy octi","ice cream eater","lollipop elephant",
				"marshmallow bunny","pink cotton piglet","pouch packed joey","rock candy turtle","sweet tea pomeranian","cookie jar cub",
				"orchid baby alpaca","dandy lion cub","monarch kitten","porcelain kitten","labrador puppy","lavender retriever puppy",
				"baby summer dragon","baby pink elephant","baby nile crocodile","aspiring hedgehoglet","baby african penguin","petalwing piglet",
				"baby pygmy goat","pet tiger","werepup","dark griffon fledgling","dark-mane dragon whelp","light griffon fledgling","light-mane dragon whelp",
				"luna pup","yellow lab pup","bright puppy","lunar bear","baby ember","holiday baby dragon","snowbaby","new years baby alpaca",
				"north pole baby dragon","snow baby dragon","baby ice peacock","purple baby king penguin","blue andean cub","baby bald uakari","bundled up kitten","clouded leopard cub",
				"flower frolic oncilla","playful panther","baby tapir","fledgling legendary egret","fledgling legendary rhea","gold banded armadillo pup","saddle llama cria",
				"tribal catamount cub","yacare hatchling","tin bear cub","emerald cub","emerald tail dragon","playful poppy dragon","tik tok whelp","bubble bear cub",
				"cowardly cub","flying baby monkey","flying bubble kitten","spring leaf lamb","red glass whelp","baby harbor phoenix","blue baby octi","blue glass whelp",
				"carnation cub","water squirt whelp",].fixOrder();
				
		var fawnTypes=["affectionate dream","fallow dream","holiday dream","ice queen dream","purple nightdeer","rudolph dream","deer","dusk","fire","firefly","king","moon","nature",
		"princess","queen","rain","shell","snowflake","sunrise","water","aurora","cloud","amber dream","astral magic","daisy chain magic","dark ridge","light ridge","moon speckled",
		"peacock","saddled","shadow dance","bat horn dream","bean scene","dainty dream","light horns magic","phantasmic magic","pumpkin fairy","dainty dream","sinister candle dream",
		"spooky lights dream","sugar skull dream","white rider stag","fall","light-cicle dream","winter elk magic","light-cicle dream","winter elk magic","wreath wrapped",
		"aurora","candy cane","holiday cheer","snowsparkle","maple princess deer","color wave dream","frostglimmer fairy","light-up toy dream","maple princess deer","merry sparkle",
		"orchid bloom dream","poinsettia","polka dot dream","thunderfire dream","winters dawn","winter's wish dream","diamond chandelier","psychedelic dream",
		"silent night fairy","diamond corsage dream","ice scupture dream","elf magic","holiday","ice maiden dream","naughty magic","nice magic","constellation dream","downy snow dream",
		"maui sunset dream","phlox dream","pristine beach","winter fest","chieftain","decorated feather","amazon spirit dream","black roses dream","blooming love","blooming love dream",
		"coffee bean dream","dark hearts dream","darkthorn dream","decadent lace dream","falling sky dream","gold valentine dream","ice gliding dream","lace collar rose dream",
		"love dream","navajo dream","pink rose dream","poprocks dream","pudu dream","rainforest wings dream","red wine dream","satin & gold dream","soft and cozy","springtime dream",
		"apple horn","doubloon dream","dream catcher dream","flying spotted","poppy antler","rainbow feather","royal emerald","sleeping","wild flower","carnival","celtic fantasy dream",
		"gravity dream","rainbow and gold dream","rainbow flowers and gold dream","celtic stag dream","purple shimmer","sol stag","spring","starlight","blooming fairy dream",
		"cheerful dream","chipper eyeing","heather dream","holiday light dream","jelly bean dream","port sunset dream","prickly pear","spring fallow dream","tune in","twinkling dream",
		"athena","festive flame","fuchsia swirl","golden hind dream","italian porcelain","matafawn","renaissance dream","roman dream","spanish rose dream",
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
		
		var decorWinterWonderland=[];
		
		var decorValentines=[].fixOrder();
				
		var decorStPatty=[];
				
		var decorEaster=[];
				
		var decorShovels=[];
		
		var decorSchoolSupplies=[];
		
		var decorTuscanWedding=[];
		
		var decorWishingWell=[];
		
		var decorFlowers=[];
		
		var decorSandCastle=[];
		
		var decorFV2Birthday=[];
		
		var decorGnomes=[].fixOrder();
		
		
		var decorOther=["nightingale","leprechaun gnome","irish cottage","double-deck tractor","white willow","chef gnome","mole","crystal rock","cave gnome","antique tractor","candy cane decoration","single candle","ice cube","lighted fence","holiday planter",
				"giant snowflake 1","reindeer balloon","snowy track i","snowy track ii","snowy track iii","snowy track iv",
				"snowy track v","snowy forest","winter cafe","santa's sleigh","gift mountain","winter cottage","ice castle",
				"toy factory",].fixOrder();
		
				
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
		var t51 = createAccTextFromArray(fawnTypes,"adopt_fawn"," Fawn");
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
				"comet tail","flip flops","kite tail","pig tale","sea water","ship in a bottle","anvil of courage","bright metal","stone of sorcery","charmed clippers",
				"anti-thorn charm","grass patch","nesting hay","rabbit burrow","black bat","duckula coffin","fang","gargoyle","ghost guard","red brick","rope",
				"spider web","water pail","evergreen cedar beam","glow nail","holly crowbar","hollybright scissors","holly light fence","holly trough","sparkle lights",
				"sparkle spackle","stardust gate","clay tile","freezer","milkshake cup","scoop","stepping stone","window","bubble potion","butterfly","crystal acorn","mini mattock","hand brush",
				"gilded pedestal","gleaming glyphs","gold stone","bird toy","lovebird feeder","lovebird nest","emerald wood","munchkin hat","silver bell trowel","silver shoe",
				"stardust cement","woodman axe","anchor","ancient urn","bistro set","blustery bellows","building stones","cabin log","chalk menu","clock gears","clock hands",
				"coiled rope","cooking salt","floral watering can","flowerpress book","flower table setting","greco vases","millstone","nature guide","potted roses","purple canvas",
				"red clay bricks","rose trellis","sea glass glue","shimmering tape","stained glass","statue pedestal","storage crates","tent pole",

				
				"nursery barn","horse paddock","cow pasture","livestock pen","wildlife habitat","aviary","pet run",
					"zoo","winter animal pen","crafting silo","sheep pen","pig pen","orchard","animal spa","garage","duck pond",
					"horse stable","beehive","lighthouse cove","winter wonderland train station","santa's sleigh","combine",
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
				"mystical paddock","mystical pasture","mystical petrun","mystical storage cellar","mystical wildlife","mystical zoo","duckula's cryptic castle","duckula's dark tower","irrigation well",
				"hollybright aviary","hollybright garage","hollybright livestock","hollybright orchard","giant tree house","ice cream parlor",
				"hollybright paddock","hollybright pasture","hollybright petrun","hollybright storage cellar","hollybright wildlife","hollybright zoo","hollybright tree","hollybirght park","gift",
				"magic biodome","artifact","hidden palace","lovebird roost","munchkin aviary","emerald pasture","emerald paddock","munchkin livestock","emerald pet run","emerald wildlife",
				"munchkin zoo","emerald gnome garden","emerald storage cellar","emerald orchard","emerald garage","barn door","windmill piece","broken silo","fallen house","emerald city",
				"munchkin country","small broken vase","medium column ruin","large broken vase","extra large column ruin","riviera aviary","riviera paddock","riviera livestock",
				"riviera pasture","riviera pet run","riviera wildlife","riviera zoo","patheon isle","grotto harbor",

					
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
					gooaway:"part_gooaway",slimeaway:"part_slimesucker",sunshineorb:"part_sunshine orb",heatstones:"part_heatstones",saltwater:"part_saltwater",
					spatowel:"part_spatowel",minimattock:"part_minimattock",handbrush:"part_handbrush",gildedpedestal:"part_gildedpedestal",gleaningglyphs:"part_gleaming glyphs",
					goldstone:"part_gold stone",emeraldwood:"part_emeraldwood",munchkinhat:"part_munchkinhat",silverbelltrowel:"part_silverbelltrowel",
					silvershoe:"part_silvershoe",stardustcement:"part_stardustcement",woodmanaxe:"part_woodmanaxe",



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
					irrigationwell:"part_redbricks,part_rope,part_waterpail","duckula'sdarktower":"part_blackbats,part_duckulacoffin,part_fangs","duckula'scrypticcastle":"part_gargoyle,part_ghostguards,part_spiderwebs",
					hollybrightaviary:"clamp,hinge,screwdriver",hollybrightpasture:"component_haybundle,stonepart,tinsheet",hollybrightpaddock:"logpart,component_saddle,component_bridle",
					hollybrightlivestock:"component_waterpump,component_wire,steelbeampart",hollybrightpetrun:"component_paintedwood,component_waterpump,component_fencepost",
					hollybrightwildlife:"component_fencepost,component_shrub,component_grazinggrass",hollybrightzoo:"wrench,component_shrub,pipe",gift:"part_hollycrowbar,part_hollybright scissors",
					animalspa:"part_heatstones,part_saltwater,part_spatowel",hollybrightgarage:"woodenboard,brick,nail",hollybrightstoragecellar:"shovel_item_01",hollybrightgnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					hollybrightorchard:"woodenboard,brick,nail",spaceorchard:"woodenboard,brick,nail",mysticalorchard:"woodenboard,brick,nail",australianorchard:"woodenboard,brick,nail",
					hollybrightpark:"part_evergreencedarbeam,part_glownails,part_hollylightfence,part_hollytrough,part_sparklespackle,part_stardustgate",hollybrighttree:"part_sparklelight",
					gianttreehouse:"part_claytile,part_steppingstone,part_window",icecreamparlor:"part_freezer,part_milkshakecup,part_scoop",magicbiodome:"part_bubblepotion,part_butterfly,part_crystalacorn",
					artifact:"part_minimattock,part_handbrush",jungleaviary:"clamp,hinge,screwdriver",junglepasture:"component_haybundle,stonepart,tinsheet",junglepaddock:"logpart,component_saddle,component_bridle",
					junglelivestock:"component_waterpump,component_wire,steelbeampart",junglepetrun:"component_paintedwood,component_waterpump,component_fencepost",junglewildlife:"component_fencepost,component_shrub,component_grazinggrass",
					junglezoo:"wrench,component_shrub,pipe",junglegarage:"woodenboard,brick,nail",junglestoragecellar:"shovel_item_01",junglegnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					jungleorchard:"woodenboard,brick,nail",junglestoragecellar:"shovel",hiddenpalace:"part_gleamingglyphs,part_gildedpedestal,part_goldstone",
					lovebirdroost:"part_birdtoy,part_lovebirdfeeder,part_lovebird nest",munchkinaviary:"clamp,hinge,screwdriver",emeraldpasture:"component_haybundle,stonepart,tinsheet",emeraldpaddock:"logpart,component_saddle,component_bridle",
					munchkinlivestock:"component_waterpump,component_wire,steelbeampart",emeraldpetrun:"component_paintedwood,component_waterpump,component_fencepost",emeraldwildlife:"component_fencepost,component_shrub,component_grazinggrass",
					munchkinzoo:"wrench,component_shrub,pipe",emeraldgarage:"woodenboard,brick,nail",emeraldstoragecellar:"shovel_item_01",emeraldgnomegarden:"part_toadstool,part_gardenfence,part_tinywindow",
					emeraldorchard:"woodenboard,brick,nail",emeraldstoragecellar:"shovel",barndoor:"part_silvershoes",windmillpiece:"part_silvershoes",
					brokensilo:"part_woodmanaxe",fallenhouse:"part_woodmanaxe",emeraldcity:"part_emeraldwood,part_silverbelltrowel,part_stardustcement",countryclocktower:"clockgears,clockhands,redclaybricks",
					munchkincountry:"part_munchkinhat",pantheonisle:"part_stainedglass,part_statuepedestal,part_ancienturn",wildlifelodge:"part_buildingstones,part_cabinlog,part_natureguide",
					extralargecolumnruin:"part_seaglassglue",largebrokenvase:"part_seaglassglue",grottoharbor:"part_anchor",mediumcolumnruin:"part_shimmeringtape",smallbrokenvase:"part_shimmeringtape",



				}
			},
			{
				dataSource:'msg',
				find:'%26frType%3DFriendVotingFriendReward',
				replace:'%26suggestedVote%3D{%1}%26frType%3DFriendVotingFriendReward',
				words:['right','left'],
				conversionChart:{right:"1",left:"0"}
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
					"visit","Join their Co-op","Help with the job","donate","Get the Ambrosia Tulip","Play Farmville","Solve Puzzles","Claim Fruitcake",
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
					"needs your help to support Children's HeartLink","giving you a special Friends & Neighbors FarmVille Offer!","is attending Farmville Cyber Monday",
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
					//animals
					{img:"e3f432ef0461f8b7fc18677fa1bff70f",ret:"adopt_smittenkitten"},
					{img:"e2496cec2936d677e70c5a973b56d7b1",ret:"adopt_desertkitten"},
					{img:"cd50e0b814f41565e89293b81b27fc65",ret:"adopt_naïvepetdeer"},
					{img:"e3c7d2ba807fe6e2d1c6a28fae67b7da",ret:"adopt_nativewilddeer"},
					{img:"36da110fa5981f702eef79e278e99d52",ret:"adopt_petpuppy"},
					{img:"f5292442f59f7f36fc1e1c4274e3de97",ret:"adopt_ponchopuppy"},
					{img:"dcf37d9ba7b632f266f10ddbb0fd2f13",ret:"adopt_renaissancechicken"},
					{img:"6a8e8f7ba19141d27d92c2f29a8ca190",ret:"adopt_homesteaderchicken"},
					{img:"3b3c69c9bf3f250cc449e180b31683bf",ret:"adopt_pethorse"},
					{img:"1c533202ba7f6dd77f8cccd72cf7bc15",ret:"adopt_wildgalloperhorse"},
					{img:"dd607241fb475e288740ce9ab4326f78",ret:"adopt_tamergnome"},
					{img:"39dfe032e893a0996d2e3222b44e888b",ret:"adopt_explorergnome"},
					{img:"7b67bb5b00aff00a4f6766315b10e287",ret:"adopt_dotedonpegacorn"},
					{img:"9616ea3afefa27ea7006a08b2d8179f3",ret:"adopt_foolhardypegacorn"},
					{img:"ebc7cf80267d272a6d165296259731f7",ret:"adopt_haystackedtree"},
					{img:"d283a42573bf5a3e1d8495d4f2b4f66a",ret:"adopt_greenwoodstree"},
					//spingtime
					{img:"04434d0fb28875b0d881be4354da9e34",ret:"adopt_rainloversheep"},
					{img:"ee06835f0ffb14916be3c36e274268d5",ret:"adopt_snoozysheep"},
					{img:"c40802bee09a912f03f189aaa96095b7",ret:"adopt_dauberduckling"},
					{img:"31e2ad39a6db9b481572535355724d5d",ret:"adopt_glommerduck"},
					{img:"399a11d2d6b4b5e4903046b29e82507f",ret:"adopt_rainbowumbrellatree"},
					{img:"eeb7b7711b9dbffa69ab2759a0f4751d",ret:"adopt_lighteningbolttree"},
					{img:"40d712ad133190d55ff8cb61dbefd888",ret:"adopt_caffelattetree"},
					{img:"01557ab00ed947baa8c8344d397d2ff3",ret:"adopt_icedmochatree"},
					{img:"9b52ec5ab08ed82e80ba64f831d8ff7c",ret:"adopt_earthlyrooster"},
					{img:"8598a30ef68409b33ac3fa4279e27c5e",ret:"adopt_cracklingrooster"},
					{img:"f0b447ec218768d16ba7714fe28eb0a7",ret:"adopt_hoodedcat"},
					{img:"531ae6c6fe817a8778a0e3ea9b390775",ret:"adopt_brollycat"},
					{img:"56366742f0c247682a222e29aed52f2d",ret:"adopt_sillymonkey"},
					{img:"2bd042bf15028a940f0f6a0090821131",ret:"adopt_zingymonkey"},
					{img:"9bc5203f0382b5ab75205311561dd880",ret:"adopt_muddyelephant"},
					{img:"03ae8adbda2cd1e5a2fffe22f0904dc3",ret:"adopt_redbootelephant"},
					{img:"90d8dd4f068b58100d376bc518610fb9",ret:"adopt_chippereyeingdeer"},
					{img:"5002a8c84bebcc7acab6b978884ca967",ret:"adopt_tuneindeer"},
					{img:"f160fe7945c54604a736104ec15d138e",ret:"adopt_longdrive"},
					{img:"5f4e5966585d4e778495b6bd9e2df89e",ret:"adopt_longride"},
					{img:"82c2a9a5cab9196ab6ab130ef09696e7",ret:"adopt_shutterbugchicken"},
					{img:"68e4e93f9ff2dfac882f1ccf10591827",ret:"adopt_wordsmithchicken"},
					{img:"9131720eb3fd5d4cb48d56d690832489",ret:"adopt_dandlingunicorn"},
					{img:"cc94c3aab19d4982c7bd6789127e1976",ret:"adopt_geekyunicorn"},

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
				//test for snowflake icon
				{img:"2F9db7655eecae6e77d0c531a788b87c52",ret:"none",kids:[
					{search:["title","caption"],find:"is now level",ret:"specialdelivery"},
					{search:["title","caption"],find:["is joyous this festive season","close to beating Holiday Lights!"],ret:"lp"},
					]},
				//test for rainbow icon
				{img:"9259495d5c5599220c9178655019e1fd",ret:"none",kids:[
					{search:["title","caption"],find:"is now level",ret:"handbrush"},
					{search:["title","caption"],find:"close to beating Emerald Valley!",ret:"rbp"},
					]},
				//test for riviera icon
				//test for rainbow icon
				{img:"3b1f455b7cee992a2c945e0038527206",ret:"none",kids:[
					{search:["title","caption"],find:"is now level",ret:"handbrush"},
					{search:["title","caption"],find:"close to beating Mediterranean Riviera!",ret:"rvp"},
					]},
				//specific text/url tests
				{search:["title","caption"],find:["Extra Large Artifact","Large Artifact"],ret:"handbrush"},
				{search:["title","caption"],find:["Small Artifact","Medium Artifact"],ret:"minimattock"},
				{link:["Help Now","Get a Baby Block!"],ret:"sendhelp"},
				{link:"Collect 50 Light Points",ret:"lp"},
				{link:"Collect 50 Riviera Points",ret:"rvp"},
				{link:"Send Woodman Axe!",ret:"woodmanaxe"},
				{img:"88a977e626d220ef8734f4c6a73d26d5",ret:"hollycrowbar"},
				{img:"2e9134587bb5dfa79678c8777738f373",ret:"stardustcement"},
				{img:"835a85420c3934ad30e99388669822e5",ret:"gooaway"},
				{img:"b0318a24288a01c02ac819488e644ecc",ret:"emeraldwood"},
				{img:"bbceb78236fcd5d94fc98eb167dafd43",ret:"silverbelltrowel"},
				{img:"d2e256b9472e7337c064066e33087d56",ret:"seed_bluebonnetflower"},
				{img:"2af8e8b628004e173d9a5a46c961bf30",ret:"egg_munchkin"},
				{img:"2F28a3472f16b741f36ed37120e531f297",ret:"handbrush"},
				{img:"4d417d4cdadb3a427cae42162a93ba57",ret:"bushel_nymphmorel"},
				{img:"08fd942d07ddf58220048140e8264dca",ret:"bushel_whitecarnation"},
				{img:"62eef56cd1a4570b40eb6b99c2da8bae",ret:"sendhelp"},
				{img:"Fe89b21ab455eb9f71e17e30f3dcc3e38",ret:"seed_ottomelon"},
				{search:["title","caption"],find:"needs a few Flower Drinks to help their Social Sheep",ret:"flowersmoothie"},
				{search:["title","caption"],find:"able to get 100 XP to help them",ret:"100xp"},
				{search:["title","caption"],find:"found some Jawbreaker Eggs",ret:"egg_jawbreaker"},
				{search:["title","caption"],find:"while harvesting the Paddock",ret:"adopt_foalhollybright"},
				{search:["title","caption"],find:["while harvesting the Pasture","Calf while harvseting the Baby Playpen","while harvesting the Holiday Cow Pasture"],ret:"adopt_calfhollybright"},
				{search:["title","caption"],find:"Destiny Bridge in Mystical Groves",ret:"mat_destinybridge"},
				{search:["title","caption"],find:"sharing Small Can of Fuel",ret:"fuel"},
				{search:["title","caption"],find:["needs your help to uncover a Medium Slime Pile","needs your help to uncover a Small Slime Pile"],ret:"slimesucker"},
				{search:["title","caption"],find:"needs your help to uncover a Extra Large Gift",ret:"hollycrowbar"},
				{search:["title","caption"],find:"needs your help to uncover a Medium Gift",ret:"hollybrightscissors"},
				{search:["title","caption"],find:"needs your help to uncover a Enchanted Rose Bush",ret:"mat_enchantedrosebush"},
				{search:["title","caption"],find:"help to uncover a Extra Large Rock Candy Boulder",ret:"silversugarshovel"},
				{search:["title","caption"],find:"needs your help to uncover a Candy Pile",ret:"diamondcandypick"},
				{search:["title","caption"],find:"that was hidden in a Gift",ret:"mat_gift"},
				{search:["title","caption"],find:"sharing the Light Blue Pony in FarmVille",ret:"adopt_horselightbluepony"},
				{search:["title","caption"],find:["giving away free Nutmegs","share some nutmegs"],ret:"bushel_nutmeg"},
				{link:"Get Fertilize All",ret:"fertilizeall"},
				{link:"Get Wool Bundle",ret:"bushel_woolbundle"},
				{link:"Get Manure Bag",ret:"bushel_manurebag"},
				{link:"Get Milk Jug",ret:"bushel_milkjug"},
				{search:["title","caption"],find:"found an adorable 4th Birthday Pegacorn",ret:"adopt_foal4thbirthdaypegacorn"},
				{link:"Adopt Pastry Chef Unicorn",ret:"adopt_foalpastrychefunicorn"},
				{link:"Adopt 4th Birthday Bedazzl",ret:"adopt_foal4thbirthdaybedazzled"},
				{search:["title","caption"],find:"found an adorable Foal Bacchus Pegacorn",ret:"adopt_foalbacchuspegacorn"},
				{link:"Get Owls Tree",ret:"tree_owls"},
				{search:["title","caption"],find:" tending their cows when an adorable Lonely Animal caught their eye",ret:"adopt_calfmistletoelane"},
				{link:"Adopt Chocolatier Pegacorn",ret:"adopt_foalchocolatierpegacorn"},
				{link:"Adopt 4th Birthday Unicorn",ret:"adopt_foal4thbirthdayunicorn"},
				{search:["title","caption"],find:"to share some Nymph Morels",ret:"bushel_nymphmorels"},
				{search:["title","caption"],find:"giving away free Yerba Mates",ret:"bushel_yerbamates"},
				{search:["title","caption"],find:["share some Sweet Tea Cupss","giving away free Sweet Tea Cupss","sent this Sweet Tea Cups from Sweet Acres!"],ret:"bushel_sweetteacups"},
				{img:"2F39503e23e030c43dbb3e880fb5ec2020",ret:"anti-thorncharm"},
				{link:"Claim Blue-winged Teal",ret:"adopt_duckblue-wingedteal"},
				{link:"Get pink wildflower",ret:"wildflower_pink"},
				{link:"Get blue wildflower",ret:"wildflower_blue"},
				{link:"Get yellow wildflower",ret:"wildflower_yellow"},
				{link:"Get orange wildflower",ret:"wildflower_orange"},
				{link:"Get purple wildflower",ret:"wildflower_purple"},
				{link:"Get Magic Crown of Thorn B",ret:"tree_bonsaimagiccrownofthorn"},
				{link:"Get Maj. Redwood",ret:"tree_majesticredwood"},
				{img:"F5de4c3dcdc84e28f869a56d688c61f2b",ret:"stardust"},
				{img:["2F890e543735401b5e5325d214805aa029","890e543735401b5e5325d214805aa029"],ret:"arborist"},
				{img:["2F4b8cc80501cc6d433b47b19bf3512337","4b8cc80501cc6d433b47b19bf3512337"],ret:"farmhand"},
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
				{search:["title","caption"],find:"harvesting the Jungle Paddock",ret:"adopt_foaleldorado"},
				{search:["title","caption"],find:"harvesting the Jungle Pasture",ret:"adopt_calfeldorado"},
				{search:["title","caption"],find:"harvesting the Mystical Paddock",ret:"adopt_foalmysticalgrove"},
				{search:["title","caption"],find:"harvesting the Mystical Pasture",ret:"adopt_calfmysticalgrove"},
				{search:["title","caption"],find:["needs a few Flower Drinks to help their Social Sheep!","sharing a few Flower Drinks","wants you to have a Flower Drink","Use this Flower Drink","wants you to feed your shared sheep"],ret:"fruitsmoothies"},
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
				{search:["title","caption"],find:["found some Iris Rainbow to share with you","found iris rainbow to share"],ret:"seed_irisrainbow"},
				{search:["title","caption"],find:"found some Bat Berry Seed Package",ret:"seed_batberry"},
				{search:["title","caption"],find:"found some Ghost Pumpkin Seed Package",ret:"seed_ghostpumpkin"},
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
				{search:["title","caption"],find:["uncovered a Purple Gum Tree that was hidden in a Mine","making progress on their diamond mine","is making progress on their iron mine","is making progress on their gold mine"],ret:"mat_australiantreasure"},
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
				{search:["title","caption"],find:["Help out!","has just completed a Farmville Atlantis challenge","is helping Sasha become a Country Star","is helping Juicy Joe plant apple seeds"],ret:"sendhelp"},
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
				{link:["collect 50 gp","collect 50 gp!"],ret:"gp"},
				{link:"collect 50 candy points",ret:"cndp"},
				{link:"collect 50 mp",ret:"mp"},
				{link:["collect 50 rainforest points","collect 50 rp"],ret:"rp"},
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
				{search:["title","caption"],find:"finished building their mystical aviary", ret:"adopt_chickenmidnight"},
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
				{search:["title","caption"],find:["special Greenhouse crops and just surpassed","is sharing special delivery box!","giving away extra Special Deliveries"],ret:"specialdelivery"},
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
				"pixie powder mastery","red remedy mastery","soothing salve mastery","sweet syrup solution mastery","tickled pink mastery","tingled tonic mastery","unlocked a horse in Elite Horses",
				"leveled up their Apothecary","Sparkle Water Bucket mastery","Holiday Light mastery","Giving Basket mastery","Winter Magic Wand mastery","Gold Stars mastery","Enrichment Toys mastery",
				"Holdiay Feed mastery","Aurora Enclosure mastery","Bright Shine Metal mastery","Charity Chest mastery","Donation Drive mastery","Enrichment Enclosure mastery","Feeding Enclosure mastery",
				"Giving Candle mastery","Giving Enclosure mastery","Giving Tree Stump mastery","Harness Straps mastery","Holiday Feed bag mastery","Holiday Reins mastery","Holiday Rubber Ball mastery",
				"Holiday Sparklecicle mastery","Holiday Sparklesicle mastery","Hollybright Cookie Treat mastery","hollybright Fillament mastery","hollybright Frost mastery","hollybright Harnesses mastery","hollybright Salt Lick mastery",
				"hollybright Tokens mastery","hollybright Whistle mastery","Icicle Spike mastery","Icy Rope mastery","Lead Line mastery","Light Floats mastery","Lighting Enclosure mastery","Lucky Horseshoes mastery",
				"Peppermint Tug Toy mastery","Slush Cone mastery","Snow Scarves mastery","Snowflake Spell mastery","Sparkle Water Bottle mastery","Sparkle Water Trough mastery","Sparkle Water Tub mastery","Squeaker Fish mastery",
				"Stuffed Bone Toy mastery","Target Pole mastery","Training Clicker mastery","Training Enclosure mastery","Tungsten Stone mastery","unlocked an animal in Elite Horses",
				"Armband Mastery","Body Paint Mastery","Dwelling Feed Crate Mastery","Embellished Necklace Mastery","Exotic Feather Mastery","Exotic Waist Band Mastery",
				"Feather Charm Mastery","Feather Earrings Mastery","Gilded Drum Mastery","Gold Dust Mastery","Mixed Berry Cup Mastery","Mystery Treat Mastery","Oasis Water Trough Mastery",
				"Paint Bowl Mastery","Paint Brush Mastery","Painted Pebbles Mastery","Tall Vase Mastery","Traditional Cloth Mastery","Treasured Pendant Mastery","Water Bowl Mastery",
				"Weaved Blanket Mastery","Wild Feather Mask Mastery","Wild Fruit Mastery","Wild Fruit Smoothie Mastery","Hidden Jewels Mastery","Water Leaf Mastery",
				"Ancient Statue Mastery","Ballgame Goal Mastery","Beaded Necklace Mastery","Ceramic Bowl Mastery","Colorful Horn Hat Mastery","Crowning Headpiece Mastery",
				"Decorative Rug Mastery","Detailed Stool Mastery","Dwelling Water Tub Mastery","Elaborate Shawl Mastery","Exotic Headdress Mastery","Gilt Belt Mastery",
				"Patterned Leg Wraps Mastery","Shimmering Cuff Mastery","Studded Gold Ring Mastery",
				"unlocked an animal in Jungle Hideaway","Jungle Hideaway","unlocked an animal in Tin Man Fountain","tin man fountain",
				"adoption papers","candling candle","decorative paint","emerald city lollipop","emerald collar","emerald documents","emerald martingale","emerald night cap",
				"emerald saddle","enchanted eggs","enchanted water","fire spell","growing potion","heart medallion","ice spell","large drinking bowl","lightning spell","magic feed",
				"magic spells","magical fountain base","munchkin candies","munchkin treats","nesting boxes","nesting hay","riding halter","rookery","shrinking potion",
				"small drinking bowl","station name","stone spell","stuffed cog pillow","stuffed heart pillow","warming lamp","winkie blanket","winkie brush","winkie curry comb",
				"winkie grain","winkie harness","winkie lead line","winkie license","winkie named food dish","winkie reins","winkie saddle blanket","azure emporium",
				"bazaar treats mastery","cobalt chain mastery","diamond barette mastery","driving gloves mastery","emerald earring mastery","feeding enclosure mastery",
				"feeding trough mastery","fountain enclosure mastery","green spice mastery","jewelery box mastery","jewelery enclosure mastery","large fountain base mastery",
				"large fountain spout mastery","loom enclosure mastery","marble sphere mastery","masonry block mastery","masonry chisel mastery","masonry enclosure mastery",
				"masonry hammer mastery","medium feed bag mastery","metal weave ring mastery","orange spice mastery","pocket watch mastery","polished statue mastery",
				"precious stones mastery","red chalk mastery","red spice mastery","road atlas mastery","seashell necklace mastery","silk jacket mastery","silk scarves mastery",
				"silk shirt mastery","silk stockings mastery","silver compass mastery","small fountain cup mastery","small grain feed mastery","spice enclosure mastery",
				"spice rack mastery","spicy bazaar dumplings mastery","statue base mastery","travel brochures mastery","water fountain mastery","wayfarer center mastery",
				"wayfarer enclosure mastery","wooden loom mastery","wool poncho mastery","wool socks mastery","yellow spice mastery",],ret:"specialdelivery"},
				{link:"adopt saddle foal",ret:"adopt_foalsaddle"},
				{search:["title","caption"],find:"found an adorable Saddle foal",ret:"adopt_foalsaddle"},
				{search:["title","caption"],find:"found a Firefly Horse while harvseting the Baby Playpen",ret:"adopt_horsefirefly"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Spooky Paddock",ret:"adopt_foalspooky"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Haunted Pasture",ret:"adopt_calfspooky"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Joyful Horse Paddock",ret:"adopt_foaljoyful"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Glen Paddock",ret:"adopt_foalglen"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Glen Cow Pasture",ret:"adopt_calfglen"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Atlantis Paddock",ret:"adopt_foalatlantis"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Atlantis Pasture",ret:"adopt_calfatlantis"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Australian Paddock",ret:"adopt_foalaussie"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Australian Pasture",ret:"adopt_calfaussie"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Holiday Paddock",ret:"adopt_foalmistletoelane"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Holiday Pasture",ret:"adopt_calfmistletoelane"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Emerald Paddock",ret:"adopt_foalemeraldvalley"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Emerald Pasture",ret:"adopt_calfemeraldvalley"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Riviera Paddock",ret:"adopt_foalmedriviera"},
				{search:["title","caption"],find:"just found a  Baby while harvesting the Riviera Pasture",ret:"adopt_calfmedriviera"},
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
				//SAME BUILDING PARTS
				{link:"get parts",ret:"none",kids:[
					{search:["title","caption"],find:"zoo",ret:"mat_zoo"},
					{search:["title","caption"],find:"paddock",ret:"mat_horsepaddock"},
					{search:["title","caption"],find:"livestock",ret:"mat_livestockpen"},
					{search:["title","caption"],find:"wildlife",ret:"mat_wildlifehabitat"},
					{search:["title","caption"],find:"pasture",ret:"mat_cowpasture"},
					{search:["title","caption"],find:"pet run",ret:"mat_petrun"},
					{search:["title","caption"],find:"aviary",ret:"mat_aviary"},
					{search:["title","caption"],find:"gnome garden",ret:"mat_gnomegarden"},
					{search:["title","caption"],find:"garage",ret:"mat_garage"},
				]},
				{link:"get animal!",ret:"none",kids:[
					{search:["title","caption"],find:["glen zoo","holiday zoo","nightmare zoo","finished building a zoo"],ret:"adopt_elephant"},
					{search:["title","caption"],find:"atlantis zoo",ret:"adopt_atlanteanelephant"},
					{search:["title","caption"],find:"candy zoo",ret:"adopt_circuspeanutelephant"},
					{search:["title","caption"],find:"australian zoo",ret:"adopt_floatyelephant"},
					{search:["title","caption"],find:"mystical zoo",ret:"adopt_ghostpuma"},
					{search:["title","caption"],find:["island zoo","jade zoo",],ret:"adopt_lesserflamingo"},
					{search:["title","caption"],find:"winter zoo",ret:"adopt_snowleopard"},
					{search:["title","caption"],find:"space zoo",ret:"adopt_trolaplyga"},
					{search:["title","caption"],find:"australian pasture",ret:"adopt_cowadaptaur"},
					{search:["title","caption"],find:"atlantis pasture",ret:"adopt_cowatlanteanbull"},
					{search:["title","caption"],find:"atlantis pet run",ret:"adopt_atlanteancat"},
					{search:["title","caption"],find:"atlantis aviary",ret:"adopt_duckatlantean"},
					{search:["title","caption"],find:"atlantis paddock",ret:"adopt_atlanteanhorse"},
					{search:["title","caption"],find:"atlantis wildlife",ret:"adopt_atlanteanpanthercub"},
					{search:["title","caption"],find:"atlantis livestock",ret:"adopt_pigatlantean"},
					{search:["title","caption"],find:"australian paddock",ret:"adopt_horseaustraliandraught"},
					{search:["title","caption"],find:"australian livestock",ret:"adopt_australianminiaturegoat"},
					{search:["title","caption"],find:"australian aviary",ret:"adopt_duckaustralianwood"},
					{search:["title","caption"],find:"australian wildlife",ret:"adopt_bandicoot"},
					{search:["title","caption"],find:"australian pet run",ret:"adopt_blackaustraliancattledog"},
					{search:["title","caption"],find:"island paddock",ret:"adopt_horseblack"},
					{search:["title","caption"],find:"jade paddock",ret:"adopt_horseblack"},
					{search:["title","caption"],find:"haunted paddock",ret:"adopt_horseblack"},
					{search:["title","caption"],find:"aquarium",ret:"adopt_bigbluetangfish"},
					{search:["title","caption"],find:"mystical pet run",ret:"adopt_brightpuppy"},
					{search:["title","caption"],find:"candy pasture",ret:"adopt_cowcandystriped"},
					{search:["title","caption"],find:"playpen",ret:"adopt_foalclydesdale"},
					{search:["title","caption"],find:"candy pet run",ret:"adopt_cocokitty"},
					{search:["title","caption"],find:"candy aviary",ret:"adopt_coconutpuff"},
					{search:["title","caption"],find:"glen paddock",ret:"adopt_horsecream"},
					{search:["title","caption"],find:"holiday paddock",ret:"adopt_horsecream"},
					{search:["title","caption"],find:"horse paddock",ret:"adopt_horsecream"},
					{search:["title","caption"],find:"joyful horse paddock",ret:"adopt_horsecream"},
					{search:["title","caption"],find:"paddock",ret:"adopt_horsecream"},
					{search:["title","caption"],find:"winter paddock",ret:"adopt_horsecream"},
					{search:["title","caption"],find:"holiday livestock",ret:"adopt_sheepelf"},
					{search:["title","caption"],find:"holiday pet run",ret:"adopt_festivecat"},
					{search:["title","caption"],find:"candy paddock",ret:"adopt_horsefrostedfilly"},
					{search:["title","caption"],find:"glen pet run",ret:"adopt_himalayancat"},
					{search:["title","caption"],find:"horrendous pet run",ret:"adopt_himalayancat"},
					{search:["title","caption"],find:"pet run",ret:"adopt_himalayancat"},
					{search:["title","caption"],find:"winter pet run",ret:"adopt_holidayst.bernard"},
					{search:["title","caption"],find:"cow pasture",ret:"adopt_cowirishmoiled"},
					{search:["title","caption"],find:"winter pasture",ret:"adopt_cowirishmoiled"},
					{search:["title","caption"],find:"mystical livestock",ret:"adopt_lightninggoat"},
					{search:["title","caption"],find:"mystical wildlife",ret:"adopt_lunarbear"},
					{search:["title","caption"],find:"mystical aviary",ret:"adopt_midnight"},
					{search:["title","caption"],find:"candy livestock",ret:"adopt_pigneopolitan"},
					{search:["title","caption"],find:"candy wildlife",ret:"adopt_pixiestickporcupine"},
					{search:["title","caption"],find:"glen wildlife",ret:"adopt_porcupine"},
					{search:["title","caption"],find:"magical wildlife cave",ret:"adopt_porcupine"},
					{search:["title","caption"],find:"wildlife",ret:"adopt_porcupine"},
					{search:["title","caption"],find:"glen pasture",ret:"adopt_cowred"},
					{search:["title","caption"],find:"haunted pasture",ret:"adopt_cowred"},
					{search:["title","caption"],find:"island pasture",ret:"adopt_cowred"},
					{search:["title","caption"],find:"jade pasture",ret:"adopt_cowred"},
					{search:["title","caption"],find:"pasture",ret:"adopt_cowred"},
					{search:["title","caption"],find:"deadly livestock",ret:"adopt_redgoat"},
					{search:["title","caption"],find:"glen livestock",ret:"adopt_redgoat"},
					{search:["title","caption"],find:"jade livestock",ret:"adopt_redgoat"},
					{search:["title","caption"],find:"livestock",ret:"adopt_redgoat"},
					{search:["title","caption"],find:"aviary",ret:"adopt_seagull"},
					{search:["title","caption"],find:"glen aviary",ret:"adopt_seagull"},
					{search:["title","caption"],find:"island aviary",ret:"adopt_seagull"},
					{search:["title","caption"],find:"jade aviary",ret:"adopt_seagull"},
					{search:["title","caption"],find:"scary aviary",ret:"adopt_seagull"},
					{search:["title","caption"],find:"holiday aviary",ret:"adopt_snowchicken"},
					{search:["title","caption"],find:"winter aviary",ret:"adopt_snowchicken"},
					{search:["title","caption"],find:"winter livestock",ret:"adopt_pigsnowflake"},
					{search:["title","caption"],find:"space aviary",ret:"adopt_chickenspacealien"},
					{search:["title","caption"],find:"space livestock",ret:"adopt_pigspacealien"},
					{search:["title","caption"],find:"space paddock",ret:"adopt_horsespacealien"},
					{search:["title","caption"],find:"space pasture",ret:"adopt_cowspacealien"},
					{search:["title","caption"],find:"space pet run",ret:"adopt_spacealienbunny"},
					{search:["title","caption"],find:"space wildlife",ret:"adopt_spacealienwolf"},
					{search:["title","caption"],find:"island wildlife",ret:"adopt_stripedopossum"},
					{search:["title","caption"],find:"jade wildlife",ret:"adopt_stripedopossum"},
					{search:["title","caption"],find:"holiday pasture",ret:"adopt_telemarkcow"},
					{search:["title","caption"],find:"mystical paddock",ret:"adopt_treespirit"},
					{search:["title","caption"],find:"island pet run",ret:"adopt_turtle"},
					{search:["title","caption"],find:"jade pet run",ret:"adopt_turtle"},
					{search:["title","caption"],find:"mystical pasture",ret:"adopt_waterspirit"},
					{search:["title","caption"],find:"winter wildlife",ret:"adopt_whiteholidayreindeer"},
					{search:["title","caption"],find:"island livestock",ret:"adopt_pigwhite"},
					{search:["title","caption"],find:"holiday wildlife",ret:"adopt_whitewolverine"},
					{search:["title","caption"],find:"hollybright aviary",ret:"adopt_chickenfrostlight"},
					{search:["title","caption"],find:"hollybright cow pasture",ret:"adopt_cowborealisbovine"},
					{search:["title","caption"],find:"hollybright horse paddock",ret:"adopt_horseholidaycarousel"},
					{search:["title","caption"],find:"hollybright livestock",ret:"adopt_piggiving"},
					{search:["title","caption"],find:"hollybright pet run",ret:"adopt_snowflakecat"},
					{search:["title","caption"],find:"hollybright wildlife",ret:"adopt_holidaylightporcupine"},
					{search:["title","caption"],find:"hollybright zoo",ret:"adopt_auroraelephant"},
					{search:["title","caption"],find:"jungle wildlife",ret:"adopt_emeraldstripedjaguar"},
					{search:["title","caption"],find:"jungle aviary",ret:"adopt_javanjunglefowl"},
					{search:["title","caption"],find:"jungle cow pasture",ret:"adopt_cowlongeared"},
					{search:["title","caption"],find:"jungle horse paddock",ret:"adopt_horsecarvedwooden"},
					{search:["title","caption"],find:"jungle livestock",ret:"adopt_piggleamingtusksboar"},
					{search:["title","caption"],find:"jungle pet run",ret:"adopt_tawnypampascat"},
					{search:["title","caption"],find:"jungle wildlife",ret:"adopt_jungleemeraldstripedjaguar"},
					{search:["title","caption"],find:"jungle zoo",ret:"adopt_caracal"},
					{search:["title","caption"],find:"riviera aviary",ret:"adopt_italianrooster"},
					{search:["title","caption"],find:"riviera paddock",ret:"adopt_horsemenorquin"},
					{search:["title","caption"],find:"riviera livestock",ret:"adopt_pigcintasinese"},
					{search:["title","caption"],find:"riviera pasture",ret:"adopt_cowspanishbull"},
					{search:["title","caption"],find:"riviera pet run",ret:"adopt_aegeancat"},
					{search:["title","caption"],find:"riviera wildlife",ret:"adopt_eurasianbear"},
					{search:["title","caption"],find:"riviera zoo",ret:"adopt_maskedtiger"},

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
					{link:"Get Barberry Bonsai Tree I",ret:"tree_bonsaibarberryii"},
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
					{img:"f79cf593f8485a2f95a552627bffc168",ret:"adopt_foaltravelingpegafoal"},
					{img:"e7672d1252beb4ae68ae442ef5e677bb",ret:"adopt_foalpinkalohastallionstud"},
					{img:"47d14db4fc9a882aeba7941881ff7a9a",ret:"adopt_foalwinterfunpegafoal"},

					
					
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
					{search:["title","caption"],find:"Pink Aloha Stallion Stud",ret:"adopt_foalpinkalohastallionstud"},
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
				{search:["title","caption"],find:"{%1} fawn", subTests:fawnTypes, ret:"adopt_fawn{%1}"},

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
				notessep:{type:'separator',label:'MEDITERRANEAN RIVIERA ADDED'},
				basicsep:{type:'separator',label:'Basics',kids:{
				settingstab:{type:'tab',label:"Settings",kids:{
					doUnknown:{type:'checkbox',label:"Process Unrecognized Posts"},
					dontsteal:{type:'checkbox',label:"Don't Process W2W Posts"},
				}},
				basictab:{type:'tab',label:'Currency & XP',kids:{
					currencyblock:{type:'optionblock',label:"Currency:",kids:{
						coins:{type:'checkbox',label:"Bonuses (Coins)"},
						coconuts:{type:'checkbox',label:"Coconuts"},
						currencybundle:{type:'checkbox',label:"Currency Bundle"},
						trowel:{type:'checkbox',label:"Hanging Gardens Trowels"},
					}},
					experienceblock:{type:'optionblock',label:"Experience:",kids:{
						"100xp":{type:'checkbox',label:"XP"},
						zp:{type:'checkbox',label:"Zen Points"},
						sp:{type:'checkbox',label:"Spook Points"},
						cp:{type:'checkbox',label:"Cheer Points"},
						fp:{type:'checkbox',label:"Fairy Points"},
						shp:{type:'checkbox',label:"Shell Points"},
						aup:{type:'checkbox',label:"Aussie Points"},
						gp:{type:'checkbox',label:"Galaxy Points"},
						cndp:{type:'checkbox',label:"Candy Points"},
						mp:{type:'checkbox',label:"Mystical Points"},
						lp:{type:'checkbox',label:"Light Points"},
						rp:{type:'checkbox',label:"Rainforest Points"},
						rbp:{type:'checkbox',label:"Rainbow Points"},
						rvp:{type:'checkbox',label:"Riviera Points",newitem:true},
					}}
				}},
				
				animalfeedsep:{type:'tab',label:"Animal Feed",kids:{
					feedblock:{type:'optionblock',label:"Feed Types:",kids:{
						animalfeed:{type:'checkbox',label:"Animal Feed"},
						dogtreat:{type:'checkbox',label:"Dog Treat"},
						gophertreat:{type:'checkbox',label:"Gopher Treat"},
						pigchow:{type:'checkbox',label:"Pig Chow"},
						puppykibble:{type:'checkbox',label:"Puppy Kibble"},
						unicornwishes:{type:'checkbox',label:"Unicorn Wishes"},
						flowersmoothie:{type:'checkbox',label:"Flower Smoothies"},
						birdfeed:{type:'checkbox',label:"Bird Feed"},
					}},
					dogtreatblock:{type:'optionblock',label:"Dog Treats:",kids:{
						cupcakedogtreat:{type:'checkbox',label:"Cupcake"},
						sportydogtreat:{type:'checkbox',label:"Sporty"},
						sturdydogtreat:{type:'checkbox',label:"Sturdy"},
						sunshinedogtreat:{type:'checkbox',label:"Sunshine"},
					}},
					felineevolutionblock:{type:'optionblock',label:"Feline Evolution",kids:{
						dryfood:{type:'checkbox',label:"Dry Food"},
						cannedfood:{type:'checkbox',label:"Canned Food"},
						felinetreat:{type:'checkbox',label:"Feline Treat"},
					}}
				}},

				boostssep:{type:'tab',label:"Consumables",kids:{
					boostblock:{type:'optionblock',label:"Consumables:",kids:{
						arborist:{type:'checkbox',label:"Arborist"},
						bingoballs:{type:'checkbox',label:"Bingo Balls"},
						capitalonegift:{type:'checkbox',label:"Capital One Gift"},
						carepackage:{type:'checkbox',label:"Care Package"},
						doubleavatar:{type:'checkbox',label:"Double Avatar"},
						farmhand:{type:'checkbox',label:"Farmhand"},
						fertilizeall:{type:'checkbox',label:"Fertilize All"},
						flowercoins:{type:'checkbox',label:"Flower Coins"},
						fuel:{type:'checkbox',label:"Fuel"},
						instagrow:{type:'checkbox',label:"Instagrow"},
						lovepotion:{type:'checkbox',label:"Love Potion"},
						luckypenn:{type:'checkbox',label:"Lucky Penny"},
						mysterygamedart:{type:'checkbox',label:"Mystery Game Dart"},
						mysterygift:{type:'checkbox',label:"Mystery Gift"},
						raffleticket:{type:'checkbox',label:"Raffle Ticket"},
						specialdelivery:{type:'checkbox',label:"Special Delivery"},
						timetonic:{type:'checkbox',label:"Time Tonic"},
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
		
					mysteryblock:{type:'optionblock',label:"Tarot Cards:",kids:{
						tarot_past:{type:'checkbox',label:"Past"},
						tarot_present:{type:'checkbox',label:"Present"},
						tarot_future:{type:'checkbox',label:"Future"},
						tarotcard:{type:'checkbox',label:"Random"},
					}}
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
				
				avatartab:{type:'tab',label:'Avatars',kids:{
					costumetab:{type:'optionblock',label:"Avatar Costumes:",kids:createMenuFromArray(avatar,"costume_")},
					costume:{type:'checkbox',label:"Unknown Costumes"},
				}},

				}}, //end basics section
				eggsep:{type:'separator',label:"Chicken & Bunny Eggs",kids:{
					eggblock:{type:'optionblock',label:"Mystery Chicken Eggs:",kids:createMenuFromArray(eggTypes,'egg_')},
					eggblock2:{type:'optionblock',label:"Bunny Eggs:",kids:createMenuFromArray(eggTypes2,'egg_')},
				}},
				matsep:{type:'separator',label:"Materials",kids:{
					matbuildtab:{type:'tab',label:"Buildings",kids:{
						matbybuilding:{type:'optionblock',label:'Random Materials by Building: (does not automatically include items in other tab)',kids:createMenuFromArray(buildings,'mat_')},
						}},
					matbuild2tab:{type:'tab',label:"Individual Parts",kids:{
						hlpartblock:{type:'optionblock',label:"Highlight Parts by Farm",hideSelectAll:true,kids:{
						btnhlnone:{type:'button_highlight',label:"CLEAR HIGHLIGHTS",clearfirst:materials},
						btnatlantis:{type:'button_highlight',label:"Atlantis",options:atlantisMaterials},
						btnaustralian:{type:'button_highlight',label:"Australia",options:australianMaterials},
						btnspace:{type:'button_highlight',label:"Celestial Pastures",options:spaceMaterials},
						btnemeraldvalley:{type:'button_highlight',label:"Emerald Valley",options:emeraldvalleyMaterials},
						btnenchanted:{type:'button_highlight',label:"Enchanted Glen",options:enchantedMaterials},
						btnrainforest:{type:'button_highlight',label:"Fields of El Dorado",options:rainforestMaterials},
						btnhaunted:{type:'button_highlight',label:"Haunted Hollow",options:hauntedMaterials},
						btnhawaii:{type:'button_highlight',label:"Hawaii",options:hawaiiMaterials},
						btnhollybright:{type:'button_highlight',label:"Holiday Lights",options:hollybrightMaterials},
						btnjadefalls:{type:'button_highlight',label:"Jade Falls",options:jadefallsMaterials},
						btnlighthouse:{type:'button_highlight',label:"Lighthouse Cove",options:lighthouseMaterials},
						btnriviera:{type:'button_highlight',label:"Mediterranean Riviera",options:rivieraMaterials},
						btnmistletoelane:{type:'button_highlight',label:"Misteltoe Lane",options:mistletoelaneMaterials},
						btnmystical:{type:'button_highlight',label:"Mystical Groves",options:mysticalMaterials},
						btnsweetacre:{type:'button_highlight',label:"Sweet Acres",options:sweetacreMaterials},
						btnwinter:{type:'button_highlight',label:"Winter Wonderland",options:winterMaterials},
						}},
					hlpartblock2:{type:'optionblock',label:"Highlight Parts by Building",hideSelectAll:true,kids:{	
						btnaviary:{type:'button_highlight',label:"Aviary",options:aviaryMaterials},
						btnanimalspa:{type:'button_highlight',label:"Animal Spa",options:animalspaMaterials},
						btnanimalbillboard:{type:'button_highlight',label:"Animal Billboard",options:animalbillboardMaterials},
						btnaquarium:{type:'button_highlight',label:"Aquarium",options:aquariumMaterials},
						btnarborist:{type:'button_highlight',label:"Arborist Center",options:arboristMaterials},
						btnastral:{type:'button_highlight',label:"Astral Observatory",options:astralMaterials},
						btnbabynursery:{type:'button_highlight',label:"Baby Nursery",options:babynurseryMaterials},
						btnbabyplaypen:{type:'button_highlight',label:"Baby Playpen",options:babyplaypenMaterials},
						btnbeachresort:{type:'button_highlight',label:"Beach Resort",options:beachresortMaterials},
						btnbeehive:{type:'button_highlight',label:"Beehive",options:beehiveMaterials},
						btnbigbarnyard:{type:'button_highlight',label:"Big Barnyard",options:bigbarnyardMaterials},
						btnbigwindmill:{type:'button_highlight',label:"Big Windmill",options:bigwindmillMaterials},
						btnbloombillboard:{type:'button_highlight',label:"Bloom Billboard",options:bloombillboardMaterials},
						btnbloomgarden:{type:'button_highlight',label:"Bloom Garden",options:bloomgardenMaterials},
						btnbonsaigarden:{type:'button_highlight',label:"Bonsai Garden",options:bonsaigardenMaterials},
						btnbumpercar:{type:'button_highlight',label:"Bumper Car",options:bumpercarMaterials},
						btnbunnyhutch:{type:'button_highlight',label:"Bunny Hutch",options:bunnyhutchMaterials},
						btncarnivalfunhouse:{type:'button_highlight',label:"Carnival Funhouse",options:carnivalfunhouseMaterials},
						btnccountryclock:{type:'button_highlight',label:"Country Clock",options:countryclockMaterials},
						btncowpasture:{type:'button_highlight',label:"Cow Pasture",options:cowpastureMaterials},
						btncraftingsilo:{type:'button_highlight',label:"Crafting Silo",options:craftingsiloMaterials},
						btncraftshop:{type:'button_highlight',label:"Craftshop",options:craftshopMaterials},
						btncropbillboard:{type:'button_highlight',label:"Crop Billboard",options:cropbillboardMaterials},
						btncrytalgarden:{type:'button_highlight',label:"Crystal Garden",options:crytalgardenMaterials},
						btndinolab:{type:'button_highlight',label:"Dino Lab",options:dinolabMaterials},
						btndoghouse:{type:'button_highlight',label:"Doghouses",options:doghouseMaterials},
						btndragon:{type:'button_highlight',label:"Dragon Lair",options:dragonMaterials},
						btndreamdeer:{type:'button_highlight',label:"Dream Deer Woods",options:dreamdeerMaterials},
						btndreamnursery:{type:'button_highlight',label:"Dream Nursery",options:dreamnurseryMaterials},
						btnduckpond:{type:'button_highlight',label:"Duck Pond",options:duckpondMaterials},
						btnduckulacryptic:{type:'button_highlight',label:"Duckula's Cryptic Castle",options:duckulacrypticMaterials},
						btnduckuladark:{type:'button_highlight',label:"Duckula's Dark Tower",options:duckuladarkMaterials},
						btnextinctanimal:{type:'button_highlight',label:"Extinct Animal Zoo",options:extinctanimalMaterials},
						btnfairyflower:{type:'button_highlight',label:"Fairy Flower",options:fairyflower},
						btnfarmhand:{type:'button_highlight',label:"Farmhand Center",options:farmhandMaterials},
						btnfeedmill:{type:'button_highlight',label:"Feed Mill",options:feedmillMaterials},
						btnferriswheel:{type:'button_highlight',label:"Ferris Wheel",options:ferriswheelMaterials},
						btnfishinghole:{type:'button_highlight',label:"Fishing Hole",options:fishingholeMaterials},
						btnfloatingwaterfall:{type:'button_highlight',label:"Floating Waterfall",options:floatingwaterfallMaterials},
						btnfountaingeyser:{type:'button_highlight',label:"Fountain Geyser",options:fountaingeyserMaterials},
						btngarage:{type:'button_highlight',label:"Garage",options:garageMaterials},
						btngardenamph:{type:'button_highlight',label:"Garden Amphitheater",options:gardenamphMaterials},
						btngaspump:{type:'button_highlight',label:"Gas Pump",options:gaspumpMaterials},
						btngianttreehouse:{type:'button_highlight',label:"Giant Tree House",options:gianttreehouseMaterials},
						btngiftingtree:{type:'button_highlight',label:"Gifting Tree",options:giftingtreeMaterials},
						btngnomegarden:{type:'button_highlight',label:"Gnome Garden",options:gnomegardenMaterials},
						btngrove:{type:'button_highlight',label:"Grove",options:groveMaterials},
						btnharmonygarden:{type:'button_highlight',label:"Harmony Garden",options:harmonygardenMaterials},
						btnhorsegall:{type:'button_highlight',label:"Horse Hall",options:horsegallMaterials},
						btnhorsepaddock:{type:'button_highlight',label:"Horse Paddock",options:horsepaddockMaterials},
						btnhotspring:{type:'button_highlight',label:"Hot Spring",options:hotspringMaterials},
						btnicecreamparlor:{type:'button_highlight',label:"Ice Cream Parlor",options:icecreamparlorMaterials},
						btnirisrainbow:{type:'button_highlight',label:"Iris Rainbow Pond",options:irisrainbowMaterials},
						btnlivestockpen:{type:'button_highlight',label:"Livestock Pen",options:livestockpenMaterials},
						btnmagicbiodome:{type:'button_highlight',label:"Magic Biodome",options:magicbiodomeMaterials},
						btnorchard:{type:'button_highlight',label:"Orchards",options:orchardMaterials},
						btnpegasuspen:{type:'button_highlight',label:"Pegasus Pen",options:pegasuspenMaterials},
						btnpetrun:{type:'button_highlight',label:"Pet Run",options:petrunMaterials},
						btnrecipebillboard:{type:'button_highlight',label:"Recipe Billboard",options:recipebillboardMaterials},
						btnsallyseed:{type:'button_highlight',label:"Sally's Seed Shop",options:sallyseedMaterials},
						btnseasonal:{type:'button_highlight',label:"Seasonal Items",options:seasonalMaterials},
						btnseedlingnursery:{type:'button_highlight',label:"Seedling Nursery",options:seedlingnurseryMaterials},
						btnsummerpoolside:{type:'button_highlight',label:"Summer Pool House",options:summerpoolsideMaterials},
						btnsunriseforest:{type:'button_highlight',label:"Sunrise Forest",options:sunriseforestMaterials},
						btnswimmingpond:{type:'button_highlight',label:"Swimming Pond",options:swimmingpondMaterials},
						btntreebillboard:{type:'button_highlight',label:"Tree Billboard",options:treebillboardMaterials},
						btntreeoflife:{type:'button_highlight',label:"Tree of Life",options:treeoflifeMaterials},
						btntreeoflove:{type:'button_highlight',label:"Tree of Love",options:treeofloveMaterials},
						btnturtlepen:{type:'button_highlight',label:"Turtle Pen",options:turtlepenMaterials},
						btnunicornisland:{type:'button_highlight',label:"Unicorn Island",options:unicornislandMaterials},
						btnwaterwheel:{type:'button_highlight',label:"Water Wheel",options:waterwheelMaterials},
						btnwildlifelodge:{type:'button_highlight',label:"Wildlife Lodge",options:wildlifelodgeMaterials},
						btnwildlifepen:{type:'button_highlight',label:"Wildlife Pen",options:wildlifepenMaterials},
						btnwishingfountain:{type:'button_highlight',label:"Wishing Fountain",options:wishingfountainMaterials},
						btnzoo:{type:'button_highlight',label:"Zoo",options:zooMaterials},
					}},
						
						matBlock:{type:'optionblock',label:"Standard:",kids:createMenuFromArray(standardMaterials,"")},
						}},
		
				}}, //end materials section
				

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
					
					wildlifeblock:{type:'optionblock',label:"Domestic vs Wild Animals:",kids:{
					adopt_smittenkitten:{type:'checkbox',label:"Smitten Kitten",newitem:true},
					adopt_desertkitten:{type:'checkbox',label:"Desert Kitten",newitem:true},
					adopt_naivepetdeer:{type:'checkbox',label:"Naive Pet Deer",newitem:true},
					adopt_nativewilddeer:{type:'checkbox',label:"Native Wild Deer",newitem:true},
					adopt_petpuppy:{type:'checkbox',label:"Pet Puppy",newitem:true},
					adopt_ponchopuppy:{type:'checkbox',label:"Poncho Puppy",newitem:true},
					adopt_renaissancechicken:{type:'checkbox',label:"Renaissance Chicken",newitem:true},
					adopt_homesteaderchicken:{type:'checkbox',label:"Homesteader Chicken",newitem:true},
					adopt_pethorse:{type:'checkbox',label:"Pet Horse",newitem:true},
					adopt_wildgalloperhorse:{type:'checkbox',label:"Wlid Galloper Horse",newitem:true},
					adopt_tamergnome:{type:'checkbox',label:"Tamer Gnome",newitem:true},
					adopt_explorergnome:{type:'checkbox',label:"Explorer Gnome",newitem:true},
					adopt_dotedonpegacorn:{type:'checkbox',label:"Doted On Pegacorn",newitem:true},
					adopt_foolhardypegacorn:{type:'checkbox',label:"Fool Hardy Pegacorn",newitem:true},
					adopt_haystackedtree:{type:'checkbox',label:"Hay Stacked Tree",newitem:true},
					adopt_greenwoodstree:{type:'checkbox',label:"Greenwoods Tree",newitem:true},

					}},
					springblock:{type:'optionblock',label:"April Showers Personality:",kids:{
					adopt_rainloversheep:{type:'checkbox',label:"Rain Lover Sheep",newitem:true},
					adopt_snoozysheep:{type:'checkbox',label:"Snoozy Sheep",newitem:true},
					adopt_dauberduckling:{type:'checkbox',label:"Dauber Duckling",newitem:true},
					adopt_glommerduck:{type:'checkbox',label:"Glommer Duck",newitem:true},
					adopt_rainbowumbrellatree:{type:'checkbox',label:"Rainbow Umbrella Tree",newitem:true},
					adopt_lighteningbolttree:{type:'checkbox',label:"Lightening Bolt Tree",newitem:true},
					adopt_caffelattetree:{type:'checkbox',label:"Caffe Latte Tree",newitem:true},
					adopt_icedmochatree:{type:'checkbox',label:"Iced Mocha Tree",newitem:true},
					adopt_earthlyrooster:{type:'checkbox',label:"Earthly Rooster",newitem:true},
					adopt_cracklingrooster:{type:'checkbox',label:"Crackling Rooster",newitem:true},
					adopt_hoodedcat:{type:'checkbox',label:"Hooded Cat",newitem:true},
					adopt_brollycat:{type:'checkbox',label:"Brolly Cat",newitem:true},
					adopt_sillymonkey:{type:'checkbox',label:"Silly Monkey",newitem:true},
					adopt_zingymonkey:{type:'checkbox',label:"Zingy Monkey",newitem:true},
					adopt_muddyelephant:{type:'checkbox',label:"Muddy Elephant",newitem:true},
					adopt_redbootelephant:{type:'checkbox',label:"Redboot Elephant",newitem:true},
					adopt_chippereyeingdeer:{type:'checkbox',label:"Chipper Eyeing Deer",newitem:true},
					adopt_tuneindeer:{type:'checkbox',label:"Tune in Deer",newitem:true},
					adopt_longdrive:{type:'checkbox',label:"Long Drive",newitem:true},
					adopt_longride:{type:'checkbox',label:"Long Ride",newitem:true},
					adopt_shutterbugchicken:{type:'checkbox',label:"Shutterbug Chicken",newitem:true},
					adopt_wordsmithchicken:{type:'checkbox',label:"Wordsmith Chicken",newitem:true},
					adopt_dandlingunicorn:{type:'checkbox',label:"Dandling Unicorn",newitem:true},
					adopt_geekyunicorn:{type:'checkbox',label:"Geeky Unicorn",newitem:true},

}},
					
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
				
				decorationssep:{type:'separator',label:"Decorations",kids:{
					decorationBlock1:{type:'optionblock',label:"Other:",kids:createMenuFromArray(decorOther,"")},
					}},

				adoptsep:{type:'separator',label:"Animals",kids:{
				bovinetab:{type:'tab',label:"Cows & Calves",kids:{
					cowBlock:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(cowTypes,"adopt_cow")},
					adopt_cow:{type:'checkbox',label:"Unknown Cows"},
					bullblock:{type:'optionblock',label:"Bulls:",kids:{
					adopt_flowerbull:{type:'checkbox',label:"Flower Bull"},
					adopt_atlanteanbull:{type:'checkbox',label:"Atlantean Bull"},
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
				fawntab:{type:'tab',label:"Fawns",kids:{
					fawnBlock:{type:'optionblock',label:"Fawns:",kids:createMenuFromArray(fawnTypes,"adopt_fawn")},
					adopt_fawn:{type:'checkbox',label:"Unknown Fawn"},
					}},
				playpentab:{type:'tab',label:"Baby Playpen Animals",kids:{
					babyBlock:{type:'optionblock',label:"Babies:",kids:createMenuFromArray(babyAnimals,"adopt_")},
					}},
				chickentab:{type:'tab',label:"Fowl",kids:{
					chickenBlock:{type:'optionblock',label:"Chickens",kids:createMenuFromArray(chickenTypes,"adopt_chicken")},
					adopt_chicken:{type:'checkbox',label:"Unkown Chickens"},
					duckblock:{type:'optionblock',label:"Ducks",kids:createMenuFromArray(duckTypes,"adopt_duck")},
					adopt_duck:{type:'checkbox',label:"Unknown Ducks"},
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
				animalstab:{type:'tab',label:"Animals",kids:{
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
						adopt_australianminiaturegoat:{type:'checkbox',label:"Australian Mini"},
						adopt_australianminigoat:{type:'checkbox',label:"Australian Miniature Goat II"},
						adopt_lighteninggoat:{type:'checkbox',label:"Lightening"},
						adopt_goat:{type:'checkbox',label:"Unknown Goats"},
					}},
					
					miscanimalblock:{type:'optionblock',label:"Misc Animals:",kids:createMenuFromArray(otherAnimals,"adopt_")},
					
					pigBlock:{type:'optionblock',label:"Pigs",kids:createMenuFromArray(pigTypes,"adopt_pig")},
					adopt_pig:{type:'checkbox',label:"Unknown Pigs"},
					sheepBlock:{type:'optionblock',label:"Sheep",kids:createMenuFromArray(sheepTypes,"adopt_sheep")},
					adopt_sheep:{type:'checkbox',label:"Unknown Sheep"},
					}},
					}},
					
				
				othersep:{type:'separator',label:"Scales, DNA, etc.",kids:{
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
					wildflowerblock:{type:'optionblock',label:"Wildflowers:",kids:createMenuFromArray(wildflowerTypes,"wildflower_")},
				
				}}, //end adoption section

				
				farmcropssep:{type:'separator',label:"Seeds, Bushels & Crafting",kids:{
				seedsep:{type:'tab',label:"Seeds",kids:{
					seedblock1:{type:'optionblock',label:"All Pollinated Seeds:",kids:createMenuFromArray(fruitTypes,"polseeds_")},
					pollinated:{type:'checkbox',label:"Unknown Seeds"},
				}},

				bushelsep:{type:'tab',label:"Bushels",kids:{
					hlbushelblock:{type:'optionblock',label:"Highlight Bushels By Crafting Cottage",hideSelectAll:true,kids:{
						btnhlnone:{type:'button_highlight',label:"CLEAR HIGHLIGHTS",clearfirst:allCraftBushels},
						btnbakery:{type:'button_highlight',label:"Bakery",options:bakeryBushels},
						btnwinery:{type:'button_highlight',label:"Winery",options:wineryBushels},
						btnspa:{type:'button_highlight',label:"Spa",options:spaBushels},
						btnpub:{type:'button_highlight',label:"Pub",options:pubBushels},
						btnrestraunt:{type:'button_highlight',label:"Restraunt",options:restrauntBushels},
						btncraftshop:{type:'button_highlight',label:"Craftshop",options:craftshopBushels},
						btncraftshop2:{type:'button_highlight',label:"Craftshop - LIMTED EDITION RECIPES",options:craftshopleBushels},
						btnsweetshoppe:{type:'button_highlight',label:"Sweet Shoppe",options:sweetshoppeBushels},
						btntikibar:{type:'button_highlight',label:"Tiki Bar",options:tikibarBushels},
						btnteagarden:{type:'button_highlight',label:"Tea Garden",options:teagardenBushels},
						btnpotionshop:{type:'button_highlight',label:"Potion Shop",options:potionshopBushels},
						btnpatisserie:{type:'button_highlight',label:"Patisserie",options:patisserieBushels},
						btncoralcafe:{type:'button_highlight',label:"Coral Cafe",options:coralcafeBushels},
						btnaussiewinery:{type:'button_highlight',label:"Aussie Winery",options:aussiewineryBushels},
						btncrystalcottage:{type:'button_highlight',label:"Crystal Cottage",options:crystalcottageBushels},
						btncrystalcottage:{type:'button_highlight',label:"Sugar Shack",options:sugarshackBushels},
						btnalchemistshop:{type:'button_highlight',label:"Alchemist Shop",options:alchemistshopBushels},
						btnsparklecafe:{type:'button_highlight',label:"Sparkle Cafe",options:sparklecafeBushels},
						btnherbalhut:{type:'button_highlight',label:"Herbal Hut",options:herbalhutBushels},
						btnporcelainshop:{type:'button_highlight',label:"Porcelain Shop",options:porcelainshopBushels},
						btnblueseacafe:{type:'button_highlight',label:"Blue Sea Cafe",options:blueseacafeBushels},
					}},

					bushelblock1:{type:'optionblock',label:"All Bushels:",kids:createMenuFromArray(fruitTypes,"bushel_")},
					bushel:{type:'checkbox',label:"Unknown Bushels"},
					}},
					bushel2sep:{type:'tab',label:"Craftshop Baskets",kids:{
					bushelblock2:{type:'optionblock',label:"Craftshop Baskets:",kids:createMenuFromArray(basketTypes,"bushel_")},
					
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
		if (href.startsWith('https://www.facebook.com/') && !(href.contains("/plugins/serverfbml.php")) ) {
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