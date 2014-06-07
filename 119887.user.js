// ==UserScript==
// @name           Wall Manager Sidekick (Pot Farm)
// @namespace      Wall Manager Sidekick (Pot Farm)
// @description    Assists Wall Manager with Pot Farm posts
// @exclude        *apps.facebook.com/mypotfarm/*
// @include        http://thepotfarmgame.com/*
// @include        http://www.thepotfarmgame.com/*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.17
// @require        http://sizzlemctwizzle.com/updater.php?id=119887&days=1
// @copyright      MonkeyNround
// ==/UserScript== 
(function() {
	// Update date: 11-03-12 @ 01:55PM
	var version = "0.0.17";// Update date: 05-10-13 @ 04:20PM
	var thisAppID = "272810543124";
	var defaultTO=null;

	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	String.prototype.safeContent = function(src){
		return src.replace(new RegExp("(<!--.*?(?=-->)-->)|(<[ \n\r]*style[^>]*>.*?<[ \n\r]*/style[^>]*>)|(<[ \n\r]*script[^>]*>.*?<[ \n\r]*/script[^>]*>)|(<(?:.|\s)*?>)", 'gi'),'');
	}

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
	function setHashParam(p,v){
		var h = unsafeWindow.top.location.hash;
		var params = h.split('&');
		var found=false;
		if (params.length) for (var x=0;x<params.length && !found;x++){
			var p1 = params[x].split('=')[0];
			var v1 = params[x].split('=')[1];
			if (p1 == p) {
				params[x]=p+'='+v;
				found=true;
			}
		}
		if (!found) params[params.length]=p+'='+v;
		h=params.join('&');
		unsafeWindow.top.location.hash = h;
	};

	function sendMessage(s){
		top.location.href = 'http://apps.facebook.com/?#status=' + s;
		return;
	};

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not already have us listed
		var doorMark=$('wmDoor_app272810543124');
		if (doorMark) return; //already posted to door

		var attachment={
			appID:'272810543124',
			synAppID:['222727414408240'],
			addFilters:[{
					appID:'222727414408240',
					name:'Blaze Runner',
					icon:'http://profile.ak.fbcdn.net/hprofile-ak-snc4/277133_222727414408240_8023392_q.jpg'
			}],

			alias:'PF',
			hrefKey:'ktf', //such as sendkey
			name:'Pot Farm', //how you want it to display
			thumbsSource:'www.thepotfarmgame.com',
			flags:{httpsTrouble:true,requiresTwo:false,skipResponse:false,alterLink:true},
			icon:"http://photos-h.ak.fbcdn.net/photos-ak-snc1/v43/84/272810543124/app_2_272810543124_3370.gif",
			desc:"Pot Farm Sidekick ("+version+") w/ Blade Runner support",

			/*alterLink:{
				find:"(www\.thepotfarmgame\.com|apps\.facebook\.com/mypotfarm)",
				isRegex:true,
				replace:'thepotfarmgame.com/potfarm',
			},*/
			alterLink:{
				find:"(www\.thepotfarmgame\.com)",
				isRegex:true,
				replace:'apps.facebook.com/mypotfarm',
			},

			accText: {
				// bonus and other stuff
				_floydfreak:"Floyd Freak (out dated but still active)",
				_puzzle1:"Puzzle1 (Ranger Bushes)",
				_jitters:"Jitters (Bat Shit)",
				_bonus:"Claim all xp/coin Bonus",
				_fourtwentynews:"FourTwentyNews",
				_chorevalentine:"Chores",
				_blazerunner_game:"Blaze Runner Mobile Phone Seeds",
				//_sendgiftrequest:"Send gift request",
				_snowmanscene04:"Snowman Scene 04 (Bat Shit)",
				_huskypup:"Husky Pup (Bat Shit)",
				_merare:"ME Rare (Bat Shit)",
				_headlesschicken:"Headless Chicken (Chicken Blood)",
				_voodoograve:"Voodoo Grave (Voodoo Bones)",

				// Mystery Seeds
				_acapulcogold:"Acapulco Gold",
				_pizzaflower:"Pizza Flower",
				_bacontree:"Bacon Tree ",
				_ripplechipplant:"Ripple Chip Plant",
				_jellybeantree:"Jelly Bean Tree",
				_cookiebush:"Cookie Bush",
				_panamared:"Panama Red",
				_candyheartbush:"Candy Heart Bush",
				_cheezobush:"Cheezo Bush",
				_donuttree:"Donut Tree",
				_piecabbage:"Pie Cabbage",
				_3xbankersbud:"3x Bankers Bud",
				_bankersbud:"Bankers Bud",
				_blazerunner:"Blaze Runner",
				_snowmanscene01:"Snowman Scene 01 (Mystery Seed)",

				// other Seeds by group
				_oldhippie:"OldHippie (Acapulco Gold)",
				_oldhippygold:"Old Hippy Gold (Acapulco Gold)",

				_20xpineappleexpress:"20x Pineapple Express (9x Pineapple Express)",
				_4xpineappleexpress:"4x Pineapple Express (Pineapple Express)",
				_9xpineappleexpress:"9x Pineapple Express (4x Pineapple Express)",

				_4xpineapplepunch:"4x Pineapple Punch (Pineapple Punch)",
				_9xpineapplepunch:"9x Pineapple Punch (4x Pineapple Punch)",

				_4xlovepotion:"4x Love Potion (Love Potion)",
				_9xlovepotion:"9x Love Potion (4x Love Potion)",

				_4xdannyboy:"4x Danny Boy (Danny Boy)",
				_9xdannyboy:"9x Danny Boy (4x Danny Boy)",

				_4xfourtwentyblues:"4x Four Twenty Blues (Four Twenty Blues)",
				_9xfourtwentyblues:"9x Four Twenty Blues (4x Four Twenty Blues)",
				_20xfourtwentyblues:"20x Four Twenty Blues (9x Four Twenty Blues)",

				_4xchocolatechunk:"4x Chocolate Chunk (Chocolate Chunk)",
				_9xchocolatechunk:"9x Chocolate Chunk (4x Chocolate Chunk)",
				_easterislandbunny:"Easter Island Bunny (Chocolate Chunk)",
				_20xchocolatechunk:"20x Chocolate Chunk (9x Chocolate Chunk)",
				_50xchocolatechunk:"50x Chocolate Chunk (9x Chocolate Chunk)",

				_4xditchweed:"4x Ditch Weed (Ditch Weed)",
				_9xditchweed:"9x Ditch Weed (4x Ditch Weed)",
				_trailerdryer:"Trailer Dryer (Ditch Weed)",
				_trailerwasher:"Trailer Washer (4x Ditch Weed)",

				_4xalienkush:"4x Alien Kush (Alien Kush)",
				_9xalienkush:"9x Alien Kush (4x Alien Kush)",
				_cropcirclebunny:"Crop Circle Bunny (4x Alien Kush)",
				_cropcirclepotleaf:"Crop Circle Pot Leaf (Alien Kush)",
				_aliengreykush:"Alien Grey Kush (9x Alien Kush)",

				_4xogkush:"4x OG Kush (OG Kush)",
				_9xogkush:"9x OG Kush (4x OG Kush)",
				_ogkushhollywood:"OG Kush Hollywood (9x OG Kush)",
				_guitar:"Guitar (OG Kush)",
				_keyboard:"Keyboard (OG Kush)",
				_drums:"Drums (4x OG Kush)",
				_bandset:"Band Set (9x OG Kush)",

				_4xgrimreefer:"4x Grim Reefer (Grim Reefer)",
				_9xgrimreefer:"9x Grim Reefer (4x Grim Reefer)",
				_apotcalypse:"Apotcalypse (9x Grim Reefer)",
				_cauldronbubbling:"Cauldron Bubbling (4x Grim Reefer)",
				_cauldronwitches:"Cauldron Witches (9x Grim Reefer)",
				_10xhalloween:"10x Halloween (4x Halloween)",
				_4xhalloween:"4x Halloween (Halloween)",

				_20xpeoplespot:"20x Peoples Pot (Bankers Bud)",
				_4xpeoplespot:"4x Peoples Pot (9x Peoples Pot)",
				_9xpeoplespot:"9x Peoples Pot (20x Peoples Pot)",
				_peoplespot:"Peoples Pot (4x Peoples Pot)",

				_4xwizardsweed:"4x Wizards Weed (Wizards Weed)",
				_9xwizardsweed:"9x Wizards Weed (4x Wizards Weed)",
				_excalibur:"Excalibur (4x Wizards Weed)",
				_wishingwell:"Wishing Well (Wizards Weed)",
				_wizardsweedwhite:"Wizards Weed White (9x Wizards Weed)",
				_babydragonred:"Baby Dragon Red (Medical Dragon)",

				_4xharvestmoon:"4x Harvest Moon (Harvest Moon)",
				_9xharvestmoon:"9x Harvest Moon (4x Harvest Moon)",
				_cornucopia:"Cornucopia (4x Harvest Moon)",

				_20xiceweed:"20x Ice Weed (9x Ice Weed)",
				_4xiceweed:"4x Ice Weed (Ice Weed)",
				_9xiceweed:"9x Ice Weed (4x Ice Weed)",
				_snowmanscene08:"Snowman Scene 08 (4x Ice Weed)",
				_snowmanscene09:"Snowman Scene 09 (Ice Weed)",
				_snowmanscene10:"Snowman Scene 10 (9x Ice Weed)",
				_snowmanscene02:"Snowman Scene 02 (9x Ice Weed)",
				_snowmanscene03:"Snowman Scene 03 (4x Ice Weed)",
				_snowmanscene05:"Snowman Scene 05 (9x Ice Weed)",
				_nutcracker:"Nutcracker (9x Ice Weed)",

				_3xchristmaskush:"3x Christmas Kush (Christmas Kush)",
				_10xchristmaskush:"10x Christmas Kush (3x Christmas Kush)",

				_4xxxx:"4x Xxx (Xxx)",
				_9xxxx:"9x Xxx (4x Xxx)",
				_20xxxx:"20x Xxx (9x Xxx)",
				_kissingbooth:"Kissing Booth (20x Xxx)",
				_trousersnake:"Trouser Snake (9x Xxx)",

				//Cajun Kush
				_20xcajunkush:"20x Cajun Kush (9x Cajun Kush)",
				_4xcajunkush:"4x Cajun Kush (Cajun Kush)",
				_9xcajunkush:"9x Cajun Kush (4x Cajun Kush)",
				_gatormardigras:"Gator Mardi Gras (9x Cajun Kush)",

				_20xheadshrinker:"20x Head Shrinker (9x Head Shrinker)",
				_4xheadshrinker:"4x Head Shrinker (Head Shrinker)",
				_9xheadshrinker:"9x Head Shrinker (4x Head Shrinker)",
				_voodoodolldick:"Voodoo Doll Dick (9x Head Shrinker)",

				_20xchroniccharms:"20x Chronic Charms (9x Chronic Charms)",
				_4xchroniccharms:"4x Chronic Charms (Chronic Charms)",
				_9xchroniccharms:"9x Chronic Charms (4x Chronic Charms)",

				_20xwhiterabbit:"20x Whiterabbit (9x Whiterabbit)",
				_4xwhiterabbit:"4x Whiterabbit (Whiterabbit)",
				_9xwhiterabbit:"9x Whiterabbit (4x Whiterabbit)",
				_easterbasket:"Easter Basket (9x Whiterabbit)",

				_20xwookieweed:"20x Wookie Weed (9x Wookie Weed)",
				_4xwookieweed:"4x Wookie Weed (Wookie Weed)",
				_9xwookieweed:"9x Wookie Weed (4x Wookie Weed)",

				// Pot Heads
				_archivedfriend:"ArchivedFriend",_rallygirl:"Rally Girl",
				_potheadslrg:"Pot Heads Lrg",_potheadsmed:"Pot Heads Med",_potheadssml:"Pot Heads Sml",
				_potheadsisland:"Pot Heads Island",_potheadsislandlrg:"Pot Heads Island Lrg",_potheadsislandsml:"Pot Heads Island Sml",
				_potheadstrailersml:"Pot Heads Trailer Sml",_potheadstrailer:"Pot Heads Trailer",_potheadstrailerlrg:"Pot Heads Trailer Lrg",
				_potheadsconspiracy:"Pot Heads Conspiracy",_potheadsconspiracylrg:"Pot Heads Conspiracy Lrg",_potheadsconspiracysml:"Pot Heads Conspiracy Sml",
				_potheadsrockstar:"Pot Heads Rock Star",_potheadsrockstarlrg:"Pot Heads Rock Star Lrg",_potheadsrockstarsml:"Pot Heads Rock Star Sml",
				_potheadshalloween:"Pot Heads Halloween",_potheadshalloweenlrg:"Pot Heads Halloween Lrg",_potheadshalloweensml:"Pot Heads Halloween Sml",
				_potheadsoccupy:"Pot Heads Occupy",_potheadsoccupylrg:"Pot Heads Occupy Lrg",_potheadsoccupysml:"Pot Heads Occupy Sml",
				_potheadsfantasy:"Pot Heads Fantasy",_potheadsfantasylrg:"Pot Heads Fantasy Lrg",_potheadsfantasysml:"Pot Heads Fantasy Sml",
				_potheadsxmas:"Pot Heads Xmas",_potheadsxmaslrg:"Pot Heads Xmas Lrg",_potheadsxmassml:"Pot Heads Xmas Sml",
				_potheadsmardigras:"Pot Heads Mardi Gras",_potheadsmardigraslrg:"Pot Heads Mardi Gras Lrg",
				_potheadsmardigrassml:"Pot Heads Mardi Gras Sml",_potheadsvoodoo:"Pot Heads Voodoo",
				_potheadsvoodoolrg:"Pot Heads Voodoo Lrg",_potheadsvoodoosml:"Pot Heads Voodoo Sml",_potheadscircle:"Pot Heads Circle",

				// Collectable stuff
				_driftwood:"Driftwood",
				_shroomsblue:"Shrooms Blue (Four Twenty Blues)",
				_shroomsblueslost:"ShroomsBluesLost (Shrooms Blue)",
				_lostleprechaun:"Lost Leprechaun (Leprechaun Surprise)",
				_puffyleprechaun:"Puffy Leprechaun (Leprechaun Pipe)",

				_lostsheepcat:"Cat",
				_lostsheepcatsanta:"Santa Cat",
				_lostsheepcatreindeer:"Reindeer Cat",
				_catnewyears:"New Years Cat",
				_lostsheepcatbondage:"Bondage Cat",
				_lostsheepcatmardigras:"Mardi Gras Cat",
				_lostsheepcatvoodoo:"Voodoo Cat",
				_lostsheepcat420:"420 Cat",
				_lostsheepcatscifi:"Scifi Cat",

				_dozybunny:"Dozy Bunny",
				_whiterabbit:"White Rabbit",
				_blackrabbit:"Black Rabbit",
				_darkchocobunny:"Dark Chocobunny",
				_milkchocobunny:"Milk Chocobunny",
				_oogybunny:"Oogy Bunny",
				_pinkbunny:"Pink Bunny",
				_sadbunny:"Sad Bunny",
				_dozyzombie:"Dozy Zombie",
				_dozydeath:"Dozy Death",
				_dozyghost:"Dozy Ghost",
				_dozypumpkin:"Dozy Pumpkin",
				_dozydevil:"Dozy Devil",
				_dozypilgrim:"Dozy Pilgrim",
				_dozyreindeer:"Dozy Reindeer",
				_dozyconspiracybunny:"Dozy Conspiracy Bunny",
				_dozypartybunny:"Dozy Party Bunny",
				_dozywizardbunny:"Dozy Wizard Bunny",
				_dozysantabunny:"Dozy Santa Bunny",
				_decordozynewyearsbunny:"Dozy New Years Bunny",
				_dozybondagebunny:"Dozy Bondage Bunny",
				_dozymardigrasbunny:"Dozy Mardi Gras Bunny",
				_dozyvoodoobunny:"Dozy Voodoo Bunny",
				_dozytrailerbunny:"Dozy Trailer Bunny",
				_dozyscifibunny:"Dozy Scifi Bunny",

				_dopeyduck:"Dopey Duck",
				_dopeyduckgrey:"Dopey Duck Grey",
				_dopeyfourtwentyduck:"Dopey Four Twenty Duck",
				_dopeyrastaduck:"Dopey Rasta Duck",
				_dopeytrailerduck:"Dopey Trailer Duck",
				_dopeyconspiracyduck:"Dopey Conspiracy Duck",
				_dopeypartyduck:"Dopey Party Duck",
				_dopeydeathduck:"Dopey Death Duck",
				_dopeywizardduck:"Dopey Wizard Duck",
				_dopeysantaduck:"Dopey Santa Duck",
				_dopeyreindeerduck:"Dopey Reindeer Duck",
				_dopeynewyearsduck:"Dopey New Years Duck",
				_dopeybondageduck:"Dopey Bondage Duck",
				_dopeymardigrasduck:"Dopey Mardi Gras Duck",
				_dopeyvoodooduck:"Dopey Voodoo Duck",
				_dopeyduckwhite:"Dopey Duck White",
				_dopeyscifiduck:"Dopey Scifi Duck",

				_parabear:"Paranoid Bear",
				_paranoidgirlbear:"Paranoid Girl Bear",
				_paranoidpilgrim:"Paranoid Pilgrim",
				_paranoidreindeer:"Paranoid Reindeer",
				_paranoidrastabear:"Paranoid Rasta Bear",
				_paranoidgirltrailerbear:"Paranoid Girl Trailer Bear",
				_paranoidtrailerbear:"Paranoid Trailer Bear",
				_paranoidconspiracybear:"Paranoid Conspiracy Bear",
				_paranoidpartybear:"Paranoid Party Bear",
				_paranoiddeathbear:"Paranoid Death Bear",
				_paranoiddevilbear:"Paranoid Devil Bear",
				_paranoidpumpkinbear:"Paranoid Pumpkin Bear",
				_paranoidwizardbear:"Paranoid Wizard Bear",
				_paranoidsantabear:"Paranoid Santa Bear",
				_paranoidreindeer:"Paranoid Reindeer",
				_paranoidnewyearsbear:"Paranoid New Years Bear",
				_paranoidmardigrasbear:"Paranoid Mardi Gras Bear",
				_paranoidzombiebear:"Paranoid Zombie Bear",
				_paranoidbunnybearlostsheep:"Paranoid Bunny Bear",
				_paranoidbunnybear:"Paranoid Bunny Bear (Chocolate Eggs)",
				_paranoidfourtwentybear:"Paranoid Four Twenty Bear",
				_paranoidscifibear:"Paranoid Scifi Bear",

				_buzzedbeaver:"Buzzed Beaver",
				_buzzedpilgrim:"Buzzed Pilgrim",
				_buzzedreindeer:"Buzzed Reindeer",
				_buzzedconspiracybeaver:"Buzzed Conspiracy Beaver",
				_buzzedpartybeaver:"Buzzed Party Beaver",
				_buzzedrastabeaver:"Buzzed Rasta Beaver",
				_buzzeddeathbeaver:"Buzzed Death Beaver",
				_buzzedwizardbeaver:"Buzzed Wizard Beaver",
				_buzzedsantabeaver:"Buzzed Santa Beaver",
				_buzzednewyearsbeaver:"Buzzed New Years Beaver",
				_buzzedbondagebeaver:"Buzzed Bondage Beaver",
				_buzzedmardigrasbeaver:"Buzzed Mardi Gras Beaver",
				_buzzedvoodoobeaver:"Buzzed Voodoo Beaver",
				_buzzedpineapplebeaver:"Buzzed Pineapple Beaver (4x Pineapple Express)",
				_buzzedscifibeaver:"Buzzed Scifi Beaver",

				_bigphrog:"Big Phrog",
				_frogblue:"Frog Blue",
				_frogred:"Frog Red",
				_frogprince:"Frog Prince",
				_frogvoodoo:"Frog Voodoo",

				_bubblylovepig:"Bubbly Love Pig",
				_chocolovepig:"Choco Love Pig",
				_lovepig:"Love Pig",
				_rosylovepig:"Rosy Love Pig",
				_newyearspiglostsheep:"New Years Pig",//adoptable

				_inflatablesheep:"Inflatable Sheep",
				_blowupsheep:"Blow Up Sheep",
				_inflatedsheepbondage:"Inflated Sheep Bondage",

				_bakedturkey:"Baked Turkey",
				_bakedreindeer:"Baked Reindeer",

				// contraption stuff
				_aleprechaun:"Ale Prechaun (Leprechaun Ale)",
				_cocoatree:"Cocoa Tree (Cocoa Pod)",
				_cocoatreelrg:"Cocoa Tree Lrg (Cocoa Pod)",
				_cocoatreesml:"Cocoa Tree Sml (Cocoa Pod)",
				_hashpressblonde:"Hash Press Blonde (Hash Blonde)",
				_oilpress:"Oil Press (Hemp Oil)",
				_whiskeystill:"Whiskey Still (Whiskey)",
				_brewery:"Brewery (Hemp Ale)",
				_popcornmaker:"Popcorn Maker (Potcorn)",
				_nachomachine:"Nacho Machine (Nachos)",
				_caramelcornmaker:"Caramel Corn Maker (Caramel Corn)",
				_caramelcornmakerchristmas:"Caramel Corn Maker Christmas (Caramel Corn)",
				_winemaker:"Wine Maker (Wine)",
				_lovemachine:"Love Machine (Sweet Love)",
				_lovein:"Love In (Sweet Love)",
				_greenbeerbrewery:"Green Beer Brewery (Hemp Ale)",
				_leprechaunale:"Leprechaun Ale (Hemp Ale)",
				_leprechaunpipe:"Leprechaun Pipe (Acapulco Gold)",
				_bubblylovepigproduct:"Bubbly Love Pig (Champagne Product)",
				_chocolovepigproduct:"Choco Love Pig (Choclate Product)",
				_lovepigproduct:"Love Pig (Love Oil)",
				_rosylovepigproduct:"Rosy Love Pig (Roses)",
				_newyearspig:"New Years Pig (Champagne Product)",//product
				_browniemachine:"Brownie Machine (Brownies)",
				_browniemachinepremium:"Brownie Machine Premium (Brownies)",
				_browniemachinepremium2:"Brownie Machine Premium 2 (Brownies)",
				_dicksdate:"Dicks Date (Sweet Love)",
				_secondbreakfast:"",
				//added sep 29, 2012 ... will make nice later
				_qp420potheads:"QP 420 Pot Heads (0)",
				_qpbugginout:"QP Buggin Out (0)",
				_qpcarsgears:"QP Cars Gears (0)",

				_qpdbcooper:"QP DB Cooper (0)",
				_qpeaster:"QP Easter (0)",
				_qpgameofchrons:"QP Game Of Chrons (0)",

				_qprangerdickwife:"QP Ranger Dick Wife (0)",
				_strangeswag:"Strange Swag (0)",
				_alice:"Alice (Potion Orange)",

				_pufflermachine:"Puffler Machine (Pufflers)",
				_100xbcbud:"100x Bc Bud (20x Bc Bud)",
				_100xwookieweed:"100x Wookie Weed (20x Wookie Weed)",

				_20xbcbud:"20x Bc Bud (9x Bc Bud)",
				_20xgreasyganja:"20x Greasy Ganja (9x Greasy Ganja)",
				_20xpsychsensi:"20x Psych Sensi (9x Psych Sensi)",

				_2xacapulcogold:"2x Acapulco Gold (Mystery Seed)",
				_3xgreendragon:"3x Green Dragon (Green Dragon)",
				_4xbcbud:"4x Bc Bud (Bc Bud)",

				_4xgreasyganja:"4x Greasy Ganja (Greasy Ganja)",
				_4xpsychsensi:"4x Psych Sensi (Psych Sensi)",
				_50xalienkush:"50x Alien Kush (9x Alien Kush)",

				_9xbcbud:"9x Bc Bud (4x Bc Bud)",
				_9xgreasyganja:"9x Greasy Ganja (4x Greasy Ganja)",
				_9xpsychsensi:"9x Psych Sensi (4x Psych Sensi)",

				_bigeyehypno:"Big Eye Hypno (9x Psych Sensi)",
				_classictruckblue:"Classic Truck Blue (Greasy Ganja)",
				_doorelevator:"Door Elevator (Acapulco Gold)",

				_dragongreen:"Dragon Green (3x Green Dragon)",
				_dragonegg:"Dragon Egg (Green Dragon)",
				_droidr2:"Droid R2 (4x Wookie Weed)",

				_keyvine:"Key Vine (Mystery Seed)",
				_knifethrone:"Knife Throne (Green Dragon)",
				_lightofjah:"Light Of Jah (Mystery Seed)",

				_sfmecommona:"SFME CommonA (Wookie Weed)",
				_sfmecommonb:"SFME CommonB (Alien Kush)",
				_superdelic:"Superdelic (9x Psych Sensi)",

				_babydragongreen:"Baby Dragon Green (Green Dragon)",
				_dopeydodo:"Dopey Dodo",
				_paranoidgdbluebear:"Paranoid Gdblue Bear",

				_paranoidgdgreenbear:"Paranoid Gdgreen Bear",
				_paranoidgdorangebear:"Paranoid Gdorange Bear",
				_paranoidgdpinkbear:"Paranoid Gdpink Bear",

				_paranoidgdyellowbear:"Paranoid Gdyellow Bear",
				_rippedraccoon:"Ripped Raccoon",
				_sasquatcha01:"Sasquatch A 01",

				_sasquatcha02:"Sasquatch A 02",
				_sasquatcha03:"Sasquatch A 03",
				_sasquatchb01:"Sasquatch B 01",

				_sasquatchb02:"Sasquatch B 02",
				_sasquatchb03:"Sasquatch B 03",
				_sasquatchc01:"Sasquatch C 01",

				_sasquatchc02:"Sasquatch C 02",
				_sasquatchc03:"Sasquatch C 03",
				_cratermeteor:"Crater Meteor (9x Alien Kush)",

				_faxmachine:"Fax Machine (Enerchron Cubes)",
				_psychchick3d:"Psych Chick 3d (4x Psych Sensi)",
				_psychchickfloyd:"Psych Chick Floyd (10x God Bud)",

				_psychchicktiedye:"Psych Chick Tiedye (Psych Sensi)",
				_psychchickwalrus:"Psych Chick Walrus (Matanuska)",
				_puffleblack:"Puffle Black",

				_pufflecalico:"Puffle Calico",
				_pufflegrey:"Puffle Grey",
				_puffleorange:"Puffle Orange",

				_pufflewhite:"Puffle White",
				_rabbithole:"Rabbit Hole (20x Whiterabbit)",
				_rangerstnfinal:"Ranger Stn Final (Dicks Notes)",

				_sasquatch:"Sasquatch (4x Wookie Weed)",
				_tablewonderland:"Table Wonderland (Potion Blue)",
				_potheadsscifi:"Pot Heads Scifi (Pot Heads)",

				_potheadsscifilrg:"Pot Heads Scifi Lrg (Pot Heads)",
				_potheadsscifisml:"Pot Heads Scifi Sml (Pot Heads)",
				_potheadswonder:"Pot Heads Wonder (Pot Heads)",

				_potheadswonderlrg:"Pot Heads Wonder Lrg (Pot Heads)",
				_potheadswondersml:"Pot Heads Wonder Sml (Pot Heads)",
				_teleporter:"Teleporter (Pot Heads)",
				//10-05-12
				_blackknight:"Black Knight (Hash Seed Black)",
				_20xghostweed:"20x Ghost Weed (9x Ghost Weed)",
				_4xghostweed:"4x Ghost Weed (Ghost Weed)",

				_9xghostweed:"9x Ghost Weed (4x Ghost Weed)",
				_hydrocampera:"Hydro Camper A (Grow Light)",
				_hydrocamperb:"Hydro Camper B (Generator)",

				_hydrocamperc:"Hydro Camper C (Spark Plugs)",
				// 10-14-12
				_fatbatalbino:"Fat Bat Albino (Item PuffPuffPass Name)",
				_fatbatbrown:"Fat Bat Brown (Bat Shit)",
				_fatbatcow:"Fat Bat Cow (Bat Shit)",

				_fatbatpurple:"Fat Bat Purple (Bat Shit)",
				_fatbattabby:"Fat Bat Tabby (Mystery Seed)",
				_20xhalloween:"20x Halloween (10x Halloween)",

				_50xhalloween:"50x Halloween (10x Halloween)",
				_potangel:"Pot Angel (Halloween)",
				_potcemeterytwo:"Pot Cemetery Two (Grim Reefer)",

				_fatbat:"Fat Bat (Bat Shit)",
				//10-23-12
				_9xhalloween:"9x Halloween (4x Halloween)",
				_zombiehorde:"Zombie Horde (Pot Heads)",
				_rippedzombieraccoon:"Ripped Zombie Raccoon (Ripped Zombie Raccoon )",

				_zombiecrowd:"Zombie Crowd (Pot Heads)",
				//11-03-12
				_msdemondick:"Ms Demon Dick (Ectoplasm)",
				_3xapotcalypse:"3x Apotcalypse (Apotcalypse)",
				_50xeasyrider:"50x Easy Rider (3x Easy Rider)",

				_50xghostweed:"50x Ghost Weed (20x Ghost Weed)",
				_50xheadshrinker:"50x Head Shrinker (20x Head Shrinker)",
				_9xhalloween:"9x Halloween (4x Halloween)",

				_zombiehorde:"Zombie Horde (Pot Heads)",
				_pileobones:"Pile O Bones (Bone Meal)",
				_rippedzombieraccoon:"Ripped Zombie Raccoon (Ripped Zombie Raccoon )",

				_buzzedghostbeaver:"Buzzed Ghost Beaver (Ghosthunter C 01)",
				_dickshouseb:"Dicks House B (Ghosthunter B 03)",
				_ghosthunterpiecea01:"Ghosthunter Piece A 01 (Ghosthunter A 01)",

				_ghosthunterpiecea03:"Ghosthunter Piece A 03 (Ghosthunter A 03)",
				_ghosthunterpieceb01:"Ghosthunter Piece B 01 (Ghosthunter B 01)",
				_ghosthunterpieceb02:"Ghosthunter Piece B 02 (Ghosthunter B 02)",

				_ghosthunterpiecec02:"Ghosthunter Piece C 02 (Ghosthunter C 02)",
				_lostsheepcatghost:"Lostsheep Cat Ghost (Ghost Weed)",
				_skunkghost:"Skunk Ghost (Ghost Weed)",

				_potheadsghost:"Pot Heads Ghost (Pot Heads)",
				_potheadsghostlrg:"Pot Heads Ghost Lrg (Pot Heads)",
				_potheadsghostsml:"Pot Heads Ghost Sml (Pot Heads)",

				_zombiecrowd:"Zombie Crowd (Pot Heads)",
				//05-10-2013
				_20xpinklightning:"20x Pink Lightning (9x Pink Rabbit)",
				_9xpinklightning:"9x Pink Lightning (4x Pink Rabbit)",
				_promoftb:"Promo FTB",

				_promoftbzombiehydro:"Promo FTB ZombieHydro",
				_potluckseed:"Potluck Seed",
				_qpholysmokec:"Qp Holy Smoke C (0)",

				_brewerysuper:"Brewery Super (Hemp Ale)",
				_20xbananakush:"20x Banana Kush (9x Banana Kush)",
				_20xhollyberry:"20x Holly Berry (9x Holly Berry)",

				_20xlovepotion:"20x Love Potion (9x Love Potion)",
				_20xsantaplanta:"20x Santa Planta (20x Holly Berry)",
				_20xsubzero:"20x Sub Zero (Surprise Seed)",

				_20xdannyboy:"20x Danny Boy (Surprise Seed)",
				_20xlightofjah:"20x Light Of Jah (Mystery Seed)",
				_20xshishkaberry:"20x Shishkaberry (9x Shishkaberry)",

				_2xkeyvine:"2x Key Vine (Mystery Seed)",
				_4xbananakush:"4x Banana Kush (Banana Kush)",
				_4xhollyberry:"4x Holly Berry (Holly Berry)",

				_4xsantaplanta:"4x Santa Planta (9x Santa Planta)",
				_4xsubzero:"4x Sub Zero (Surprise Seed)",
				_4xshishkaberry:"4x Shishkaberry (Shishkaberry)",

				_50xbananakush:"50x Banana Kush (9x Banana Kush)",
				_50xpineappleexpress:"50x Pineapple Express (20x Pineapple Express)",
				_50xchroniccharms:"50x Chronic Charms (Surprise Seed)",

				_50xdannyboy:"50x Danny Boy (Surprise Seed)",
				_50xshishkaberry:"50x Shishkaberry (20x Shishkaberry)",
				_9xbananakush:"9x Banana Kush (4x Banana Kush)",

				_9xhollyberry:"9x Holly Berry (4x Holly Berry)",
				_9xsantaplanta:"9x Santa Planta (20x Holly Berry)",
				_9xsubzero:"9x Sub Zero (Surprise Seed)",

				_9xlightofjah:"9x Light Of Jah (Mystery Seed)",
				_9xshishkaberry:"9x Shishkaberry (4x Shishkaberry)",
				_aprilfirstcrate:"April First Crate (Hemp)",

				_dragonirish:"Dragon Irish (Surprise Seed)",
				_starbud:"Star Bud (Surprise Seed)",
				_tavernirishaftermath:"Tavern Irish Aftermath (Surprise Seed)",

				_tavernirishopen:"Tavern Irish Open (Surprise Seed)",
				_tavernirishparty:"Tavern Irish Party (Surprise Seed)",
				_elfcage:"Elf Cage (Elves)",

				_headlesschickenchocolate:"Headless Chicken Chocolate (Chocolate)",
				_20xpinkrabbit:"20x Pink Rabbit (9x Pink Rabbit)",
				_20xrobobud:"20x Robobud (9x Robobud)",

				_20xshishkalightning:"20x Shishka Lightning (9x Shishkaberry)",
				_4xpinkrabbit:"4x Pink Rabbit (Pink Rabbit)",
				_4xrobobud:"4x Robobud (Robobud)",

				_50xpinkrabbit:"50x Pink Rabbit (9x Pink Rabbit)",
				_9xpinkrabbit:"9x Pink Rabbit (4x Pink Rabbit)",
				_9xrobobud:"9x Robobud (4x Robobud)",

				_9xshishkalightning:"9x Shishka Lightning (4x Shishkaberry)",
				_macncheesebush:"Mac N Cheese Bush (Surprise Seed)",
//MOOCH ITEMS
_alienprobe:"Alien Probe",
_bluepaint:"Blue Paint",
_bonemeal:"Bone Meal",
_bricks:"Bricks",
_candles:"Candles",
_candycanes:"Candy Canes",
_carrots:"Carrots",
_champagneproduct:"Champagne Product",
_charcoalfilter:"Charcoal Filter",
_chickenblood:"Chicken Blood",
_choclateproduct:"Choclate Product",
_chocolate:"Chocolate",
_chocolateeggs:"Chocolate Eggs",
_chocolatesyrup:"Chocolate Syrup",
_christmascookies:"Christmas Cookies",
_clothes:"Clothes",
_critterpaw:"Critter Paw",
_dilithiumthc:"Dilithium Thc",
_ectoplasm:"Ectoplasm",
_enerchroncubes:"Enerchron Cubes",
_fan:"Fan",
_fancybooze:"Fancy Booze",
_fancysnacks:"Fancy Snacks",
_feathers:"Feathers",
_flowerpetals:"Flower Petals",
_generator:"Generator",
_growlight:"Grow Light",
_hashblack:"Hash Black",
_hempale:"Hemp Ale",
_hempmilk:"Hemp Milk",
_hydroponicfansuper:"Hydroponic Fan Super",
_hydroponicgeneratorsuper:"Hydroponic Generator Super",
_hydroponiclampsuper:"Hydroponic Lamp Super",
_hydroponicsecuirtycamerair:"Hydroponic Secuirty Camera Ir",
_ketchup:"Ketchup",
_loveoil:"Love Oil",
_lumber:"Lumber",
_matches:"Matches",
_mysterycritter:"Mystery Critter",
_mysterygift:"Mystery Gift",
_nachos:"Nachos",
_potionblue:"Potion Blue",
_potionorange:"Potion Orange",
_pufflers:"Pufflers",
_redpaint:"Red Paint",
_roses:"Roses",
_secondbreakfast:"Second Breakfast",
_sheetmetal:"Sheet Metal",
_shovel:"Shovel",
_snow:"Snow",
_sparkplugs:"Spark Plugs",
_surveillancecamera:"Surveillance Camera",
_sweetlove:"Sweet Love",
_toiletpaper:"Toilet Paper",
_twigsandcoal:"Twigs And Coal",
_voodoobones:"Voodoo Bones",
_voodoopotiongreen:"Voodoo Potion Green",
_voodoopotionpurple:"Voodoo Potion Purple",
_voodoopotionred:"Voodoo Potion Red",
_waterpump:"Water Pump",
_waterrain:"Water Rain",
_whiskey:"Whiskey",
_wine:"Wine",
_winterale:"Winter Ale",
_wrench:"Wrench",
_xmaslights:"Xmas Lights",
_yellowpaint:"Yellow Paint",
//MOOCH ITEMS
			},
			tests: [
				//{url:"desf=GiftRequest",ret:"_sendgiftrequest"},
				{url:"feedCoins=",ret:"_bonus"},// Generic Achievement Bonus
				{url:"feedXP=",ret:"_bonus"},	// Generic Achievement Bonus
				{url:"item=Blaze_Runner",ret:"_blazerunner_game"},
				{url:"viralType=ChoreValentine",ret:"_chorevalentine"},//viralType=ChoreValentine

				{url:"fst=2x_Acapulco_Gold",ret:"_2xacapulcogold"},
				{url:"fst=2x_key_vine",ret:"_2xkeyvine"},
				{url:"fst=3x_Apotcalypse",ret:"_3xapotcalypse"},
				{url:"fst=3x_Bankers_Bud",ret:"_3xbankersbud"},
				{url:"fst=3x_Christmas_Kush",ret:"_3xchristmaskush"},
				{url:"fst=3x_Green_Dragon",ret:"_3xgreendragon"},
				{url:"fst=4x_Alien_Kush",ret:"_4xalienkush"},
				{url:"fst=4x_Banana_Kush",ret:"_4xbananakush"},
				{url:"fst=4x_Bc_Bud",ret:"_4xbcbud"},
				{url:"fst=4x_Cajun_Kush",ret:"_4xcajunkush"},
				{url:"fst=4x_Chocolate_Chunk",ret:"_4xchocolatechunk"},
				{url:"fst=4x_Chronic_Charms",ret:"_4xchroniccharms"},
				{url:"fst=4x_Danny_Boy",ret:"_4xdannyboy"},
				{url:"fst=4x_Ditch_Weed",ret:"_4xditchweed"},
				{url:"fst=4x_Four_Twenty_Blues",ret:"_4xfourtwentyblues"},
				{url:"fst=4x_Ghost_Weed",ret:"_4xghostweed"},
				{url:"fst=4x_Greasy_Ganja",ret:"_4xgreasyganja"},
				{url:"fst=4x_Grim_Reefer",ret:"_4xgrimreefer"},
				{url:"fst=4x_Halloween",ret:"_4xhalloween"},
				{url:"fst=4x_Harvest_Moon",ret:"_4xharvestmoon"},
				{url:"fst=4x_Head_Shrinker",ret:"_4xheadshrinker"},
				{url:"fst=4x_Holly_Berry",ret:"_4xhollyberry"},
				{url:"fst=4x_Ice_Weed",ret:"_4xiceweed"},
				{url:"fst=4x_Love_Potion",ret:"_4xlovepotion"},
				{url:"fst=4x_OG_Kush",ret:"_4xogkush"},
				{url:"fst=4x_Peoples_Pot",ret:"_4xpeoplespot"},
				{url:"fst=4x_Pineapple_Express",ret:"_4xpineappleexpress"},
				{url:"fst=4x_Pineapple_Punch",ret:"_4xpineapplepunch"},
				{url:"fst=4x_pink_rabbit",ret:"_4xpinkrabbit"},
				{url:"fst=4x_Psych_Sensi",ret:"_4xpsychsensi"},
				{url:"fst=4x_robobud",ret:"_4xrobobud"},
				{url:"fst=4x_Santa_Planta",ret:"_4xsantaplanta"},
				{url:"fst=4x_shishkaberry",ret:"_4xshishkaberry"},
				{url:"fst=4x_Sub_Zero",ret:"_4xsubzero"},
				{url:"fst=4x_Whiterabbit",ret:"_4xwhiterabbit"},
				{url:"fst=4x_Wizards_Weed",ret:"_4xwizardsweed"},
				{url:"fst=4x_Wookie_Weed",ret:"_4xwookieweed"},
				{url:"fst=4x_xxx",ret:"_4xxxx"},
				{url:"fst=9x_Alien_Kush",ret:"_9xalienkush"},
				{url:"fst=9x_Banana_Kush",ret:"_9xbananakush"},
				{url:"fst=9x_Bc_Bud",ret:"_9xbcbud"},
				{url:"fst=9x_Cajun_Kush",ret:"_9xcajunkush"},
				{url:"fst=9x_Chocolate_Chunk",ret:"_9xchocolatechunk"},
				{url:"fst=9x_Chronic_Charms",ret:"_9xchroniccharms"},
				{url:"fst=9x_Danny_Boy",ret:"_9xdannyboy"},
				{url:"fst=9x_Ditch_Weed",ret:"_9xditchweed"},
				{url:"fst=9x_Four_Twenty_Blues",ret:"_9xfourtwentyblues"},
				{url:"fst=9x_Ghost_Weed",ret:"_9xghostweed"},
				{url:"fst=9x_Greasy_Ganja",ret:"_9xgreasyganja"},
				{url:"fst=9x_Grim_Reefer",ret:"_9xgrimreefer"},
				{url:"fst=9x_Halloween",ret:"_9xhalloween"},
				{url:"fst=9x_Harvest_Moon",ret:"_9xharvestmoon"},
				{url:"fst=9x_Head_Shrinker",ret:"_9xheadshrinker"},
				{url:"fst=9x_Holly_Berry",ret:"_9xhollyberry"},
				{url:"fst=9x_Ice_Weed",ret:"_9xiceweed"},
				{url:"fst=9x_light_of_jah",ret:"_9xlightofjah"},
				{url:"fst=9x_Love_Potion",ret:"_9xlovepotion"},
				{url:"fst=9x_OG_Kush",ret:"_9xogkush"},
				{url:"fst=9x_Peoples_Pot",ret:"_9xpeoplespot"},
				{url:"fst=9x_Pineapple_Express",ret:"_9xpineappleexpress"},
				{url:"fst=9x_Pineapple_Punch",ret:"_9xpineapplepunch"},
				{url:"fst=9x_pink_lightning",ret:"_9xpinklightning"},
				{url:"fst=9x_pink_rabbit",ret:"_9xpinkrabbit"},
				{url:"fst=9x_Psych_Sensi",ret:"_9xpsychsensi"},
				{url:"fst=9x_robobud",ret:"_9xrobobud"},
				{url:"fst=9x_Santa_Planta",ret:"_9xsantaplanta"},
				{url:"fst=9x_shishkaberry",ret:"_9xshishkaberry"},
				{url:"fst=9x_shishka_lightning",ret:"_9xshishkalightning"},
				{url:"fst=9x_Sub_Zero",ret:"_9xsubzero"},
				{url:"fst=9x_Whiterabbit",ret:"_9xwhiterabbit"},
				{url:"fst=9x_Wizards_Weed",ret:"_9xwizardsweed"},
				{url:"fst=9x_Wookie_Weed",ret:"_9xwookieweed"},
				{url:"fst=9x_xxx",ret:"_9xxxx"},
				{url:"fst=10x_Christmas_Kush",ret:"_10xchristmaskush"},
				{url:"fst=10x_Halloween",ret:"_10xhalloween"},
				{url:"fst=20x_Banana_Kush",ret:"_20xbananakush"},
				{url:"fst=20x_Bc_Bud",ret:"_20xbcbud"},
				{url:"fst=20x_Cajun_Kush",ret:"_20xcajunkush"},
				{url:"fst=20x_Chocolate_Chunk",ret:"_20xchocolatechunk"},
				{url:"fst=20x_Chronic_Charms",ret:"_20xchroniccharms"},
				{url:"fst=20x_danny_boy",ret:"_20xdannyboy"},
				{url:"fst=20x_Four_Twenty_Blues",ret:"_20xfourtwentyblues"},
				{url:"fst=20x_Ghost_Weed",ret:"_20xghostweed"},
				{url:"fst=20x_Greasy_Ganja",ret:"_20xgreasyganja"},
				{url:"fst=20x_Halloween",ret:"_20xhalloween"},
				{url:"fst=20x_Harvest_Moon",ret:"_20xharvestmoon"},
				{url:"fst=20x_Head_Shrinker",ret:"_20xheadshrinker"},
				{url:"fst=20x_Holly_Berry",ret:"_20xhollyberry"},
				{url:"fst=20x_Ice_Weed",ret:"_20xiceweed"},
				{url:"fst=20x_light_of_jah",ret:"_20xlightofjah"},
				{url:"fst=20x_Love_Potion",ret:"_20xlovepotion"},
				{url:"fst=20x_Peoples_Pot",ret:"_20xpeoplespot"},
				{url:"fst=20x_Pineapple_Express",ret:"_20xpineappleexpress"},
				{url:"fst=20x_pink_lightning",ret:"_20xpinklightning"},
				{url:"fst=20x_pink_rabbit",ret:"_20xpinkrabbit"},
				{url:"fst=20x_Psych_Sensi",ret:"_20xpsychsensi"},
				{url:"fst=20x_robobud",ret:"_20xrobobud"},
				{url:"fst=20x_Santa_Planta",ret:"_20xsantaplanta"},
				{url:"fst=20x_shishkaberry",ret:"_20xshishkaberry"},
				{url:"fst=20x_shishka_lightning",ret:"_20xshishkalightning"},
				{url:"fst=20x_Sub_Zero",ret:"_20xsubzero"},
				{url:"fst=20x_Whiterabbit",ret:"_20xwhiterabbit"},
				{url:"fst=20x_Wookie_Weed",ret:"_20xwookieweed"},
				{url:"fst=20x_xxx",ret:"_20xxxx"},
				{url:"fst=50x_Alien_Kush",ret:"_50xalienkush"},
				{url:"fst=50x_Banana_Kush",ret:"_50xbananakush"},
				{url:"fst=50x_Chocolate_Chunk",ret:"_50xchocolatechunk"},
				{url:"fst=50x_chronic_charms",ret:"_50xchroniccharms"},
				{url:"fst=50x_danny_boy",ret:"_50xdannyboy"},
				{url:"fst=50x_Easy_Rider",ret:"_50xeasyrider"},
				{url:"fst=50x_Ghost_Weed",ret:"_50xghostweed"},
				{url:"fst=50x_Halloween",ret:"_50xhalloween"},
				{url:"fst=50x_Head_Shrinker",ret:"_50xheadshrinker"},
				{url:"fst=50x_Pineapple_Express",ret:"_50xpineappleexpress"},
				{url:"fst=50x_pink_rabbit",ret:"_50xpinkrabbit"},
				{url:"fst=50x_shishkaberry",ret:"_50xshishkaberry"},
				{url:"fst=100x_Bc_Bud",ret:"_100xbcbud"},
				{url:"fst=100x_Wookie_Weed",ret:"_100xwookieweed"},
				{url:"fst=Acapulco_Gold",ret:"_acapulcogold"},
				{url:"fst=Ale_Prechaun",ret:"_aleprechaun"},
				{url:"fst=Alice",ret:"_alice"},
				{url:"fst=Alien_Grey_Kush",ret:"_aliengreykush"},
				{url:"fst=Alien_Wedding",ret:"_alienwedding"},
				{url:"fst=Apotcalypse",ret:"_apotcalypse"},
				{url:"fst=april_first_crate",ret:"_aprilfirstcrate"},
				{url:"fst=ArchivedFriend",ret:"_archivedfriend"},
				{url:"fst=baby_dragon_green",ret:"_babydragongreen"},
				{url:"fst=baby_dragon_red",ret:"_babydragonred"},
				{url:"fst=Bacon_Tree",ret:"_bacontree"},
				{url:"fst=Baked_Reindeer",ret:"_bakedreindeer"},
				{url:"fst=Baked_Turkey",ret:"_bakedturkey"},
				{url:"fst=Band_Set",ret:"_bandset"},
				{url:"fst=Bankers_Bud",ret:"_bankersbud"},
				{url:"fst=Big+Phrog",ret:"_bigphrog"},
				{url:"fst=Big_Eye_Hypno",ret:"_bigeyehypno"},
				{url:"fst=Black+Rabbit",ret:"_blackrabbit"},
				{url:"fst=Black_Knight",ret:"_blackknight"},
				{url:"fst=Blaze_Runner",ret:"_blazerunner"},
				{url:"fst=Blow+Up+Sheep",ret:"_blowupsheep"},
				{url:"fst=Brewery",ret:"_brewery"},
				{url:"fst=brewery_super",ret:"_brewerysuper"},
				{url:"fst=Brownie_Machine",ret:"_browniemachine"},
				{url:"fst=Brownie_Machine_Premium",ret:"_browniemachinepremium"},
				{url:"fst=Brownie_Machine_Premium_2",ret:"_browniemachinepremium2"},
				{url:"fst=Bubbly+Love+Pig",ret:"_bubblylovepigproduct"},
				{url:"fst=Bubbly_Love_Pig",ret:"_bubblylovepig"},
				{url:"fst=Buzzed+Beaver",ret:"_buzzedbeaver"},
				{url:"fst=Buzzed_Bondage_Beaver",ret:"_buzzedbondagebeaver"},
				{url:"fst=Buzzed_Conspiracy_Beaver",ret:"_buzzedconspiracybeaver"},
				{url:"fst=Buzzed_Death_Beaver",ret:"_buzzeddeathbeaver"},
				{url:"fst=Buzzed_Ghost_Beaver",ret:"_buzzedghostbeaver"},
				{url:"fst=Buzzed_Mardi_Gras_Beaver",ret:"_buzzedmardigrasbeaver"},
				{url:"fst=Buzzed_New_Years_Beaver",ret:"_buzzednewyearsbeaver"},
				{url:"fst=Buzzed_Party_Beaver",ret:"_buzzedpartybeaver"},
				{url:"fst=Buzzed_Pilgrim",ret:"_buzzedpilgrim"},
				{url:"fst=Buzzed_Pineapple_Beaver",ret:"_buzzedpineapplebeaver"},
				{url:"fst=Buzzed_Rasta_Beaver",ret:"_buzzedrastabeaver"},
				{url:"fst=Buzzed_Reindeer",ret:"_buzzedreindeer"},
				{url:"fst=Buzzed_Santa_Beaver",ret:"_buzzedsantabeaver"},
				{url:"fst=Buzzed_Scifi_Beaver",ret:"_buzzedscifibeaver"},
				{url:"fst=Buzzed_Voodoo_Beaver",ret:"_buzzedvoodoobeaver"},
				{url:"fst=Buzzed_Wizard_Beaver",ret:"_buzzedwizardbeaver"},
				{url:"fst=Candy_Heart_Bush",ret:"_candyheartbush"},
				{url:"fst=Caramel+Corn+Maker",ret:"_caramelcornmaker"},
				{url:"fst=Caramel+Corn+Maker+Christmas",ret:"_caramelcornmakerchristmas"},
				{url:"fst=Cat_New_Years",ret:"_catnewyears"},
				{url:"fst=Cauldron_Bubbling",ret:"_cauldronbubbling"},
				{url:"fst=Cauldron_Witches",ret:"_cauldronwitches"},
				{url:"fst=Cheezo_Bush",ret:"_cheezobush"},
				{url:"fst=Choco+Love+Pig",ret:"_chocolovepigproduct"},
				{url:"fst=Choco_Love_Pig",ret:"_chocolovepig"},
				{url:"fst=Classic_Truck_Blue",ret:"_classictruckblue"},
				{url:"fst=Cocoa_Tree",ret:"_cocoatree"},
				{url:"fst=Cocoa_Tree_Lrg",ret:"_cocoatreelrg"},
				{url:"fst=Cocoa_Tree_Sml",ret:"_cocoatreesml"},
				{url:"fst=Cookie_Bush",ret:"_cookiebush"},
				{url:"fst=Cornucopia",ret:"_cornucopia"},
				{url:"fst=Crater_Meteor",ret:"_cratermeteor"},
				{url:"fst=crop_circle_bunny",ret:"_cropcirclebunny"},
				{url:"fst=crop_circle_pot_leaf",ret:"_cropcirclepotleaf"},
				{url:"fst=Dark+Chocobunny",ret:"_darkchocobunny"},
				{url:"fst=Dark+Chocobunny",ret:"_darkchocobunny"},
				{url:"fst=decor_dozy_new_years_bunny",ret:"_decordozynewyearsbunny"},
				{url:"fst=Dicks_Date",ret:"_dicksdate"},
				{url:"fst=Dicks_House_B",ret:"_dickshouseb"},
				{url:"fst=Donut_Tree",ret:"_donuttree"},
				{url:"fst=Door_Elevator",ret:"_doorelevator"},
				{url:"fst=Dopey_Bondage_Duck",ret:"_dopeybondageduck"},
				{url:"fst=Dopey_Conspiracy_Duck",ret:"_dopeyconspiracyduck"},
				{url:"fst=Dopey_Death_Duck",ret:"_dopeydeathduck"},
				{url:"fst=Dopey_Dodo",ret:"_dopeydodo"},
				{url:"fst=Dopey_Duck",ret:"_dopeyduck"},
				{url:"fst=Dopey_Duck_Grey",ret:"_dopeyduckgrey"},
				{url:"fst=Dopey_Duck_White",ret:"_dopeyduckwhite"},
				{url:"fst=Dopey_Four_Twenty_Duck",ret:"_dopeyfourtwentyduck"},
				{url:"fst=Dopey_Mardi_Gras_Duck",ret:"_dopeymardigrasduck"},
				{url:"fst=Dopey_New_Years_Duck",ret:"_dopeynewyearsduck"},
				{url:"fst=Dopey_Party_Duck",ret:"_dopeypartyduck"},
				{url:"fst=Dopey_Rasta_Duck",ret:"_dopeyrastaduck"},
				{url:"fst=Dopey_Reindeer_Duck",ret:"_dopeyreindeerduck"},
				{url:"fst=Dopey_Santa_Duck",ret:"_dopeysantaduck"},
				{url:"fst=Dopey_Scifi_Duck",ret:"_dopeyscifiduck"},
				{url:"fst=Dopey_Trailer_Duck",ret:"_dopeytrailerduck"},
				{url:"fst=Dopey_Voodoo_Duck",ret:"_dopeyvoodooduck"},
				{url:"fst=Dopey_Wizard_Duck",ret:"_dopeywizardduck"},
				{url:"fst=Dozy+Death",ret:"_dozydeath"},
				{url:"fst=Dozy+Devil",ret:"_dozydevil"},
				{url:"fst=Dozy+Ghost",ret:"_dozyghost"},
				{url:"fst=Dozy+Pumpkin",ret:"_dozypumpkin"},
				{url:"fst=Dozy+Zombie",ret:"_dozyzombie"},
				{url:"fst=DozyBunny",ret:"_dozybunny"},
				{url:"fst=Dozy_Bondage_Bunny",ret:"_dozybondagebunny"},
				{url:"fst=Dozy_Conspiracy_Bunny",ret:"_dozyconspiracybunny"},
				{url:"fst=Dozy_Mardi_Gras_Bunny",ret:"_dozymardigrasbunny"},
				{url:"fst=Dozy_Party_Bunny",ret:"_dozypartybunny"},
				{url:"fst=Dozy_Pilgrim",ret:"_dozypilgrim"},
				{url:"fst=Dozy_Reindeer",ret:"_dozyreindeer"},
				{url:"fst=Dozy_Santa_Bunny",ret:"_dozysantabunny"},
				{url:"fst=Dozy_Scifi_Bunny",ret:"_dozyscifibunny"},
				{url:"fst=Dozy_Trailer_Bunny",ret:"_dozytrailerbunny"},
				{url:"fst=Dozy_Voodoo_Bunny",ret:"_dozyvoodoobunny"},
				{url:"fst=Dozy_Wizard_Bunny",ret:"_dozywizardbunny"},
				{url:"fst=Dragon+Green",ret:"_dragongreen"},
				{url:"fst=Dragon_Egg",ret:"_dragonegg"},
				{url:"fst=dragon_irish",ret:"_dragonirish"},
				{url:"fst=Driftwood",ret:"_driftwood"},
				{url:"fst=Droid_R2",ret:"_droidr2"},
				{url:"fst=Drums",ret:"_drums"},
				{url:"fst=Easter_Basket",ret:"_easterbasket"},
				{url:"fst=Easter_Island_Bunny",ret:"_easterislandbunny"},
				{url:"fst=Elf_Cage",ret:"_elfcage"},
				{url:"fst=Excalibur",ret:"_excalibur"},
				{url:"fst=Fat_Bat",ret:"_fatbat"},
				{url:"fst=Fat_Bat_Albino",ret:"_fatbatalbino"},
				{url:"fst=Fat_Bat_Brown",ret:"_fatbatbrown"},
				{url:"fst=Fat_Bat_Cow",ret:"_fatbatcow"},
				{url:"fst=Fat_Bat_Purple",ret:"_fatbatpurple"},
				{url:"fst=Fat_Bat_Tabby",ret:"_fatbattabby"},
				{url:"fst=Fax_Machine",ret:"_faxmachine"},
				{url:"fst=Floyd_Freak",ret:"_floydfreak"},
				{url:"fst=FourTwentyNews",ret:"_fourtwentynews"},
				{url:"fst=Frog_Blue",ret:"_frogblue"},
				{url:"fst=Frog_Prince",ret:"_frogprince"},
				{url:"fst=Frog_Red",ret:"_frogred"},
				{url:"fst=Frog_Voodoo",ret:"_frogvoodoo"},
				{url:"fst=Gator_Mardi_Gras",ret:"_gatormardigras"},
				{url:"fst=Ghosthunter_Piece_A_01",ret:"_ghosthunterpiecea01"},
				{url:"fst=Ghosthunter_Piece_A_03",ret:"_ghosthunterpiecea03"},
				{url:"fst=Ghosthunter_Piece_B_01",ret:"_ghosthunterpieceb01"},
				{url:"fst=Ghosthunter_Piece_B_02",ret:"_ghosthunterpieceb02"},
				{url:"fst=Ghosthunter_Piece_C_02",ret:"_ghosthunterpiecec02"},
				{url:"fst=Green+Beer+Brewery",ret:"_greenbeerbrewery"},
				{url:"fst=Guitar",ret:"_guitar"},
				{url:"fst=Hash_Press_Blonde",ret:"_hashpressblonde"},
				{url:"fst=Headless_Chicken",ret:"_headlesschicken"},
				{url:"fst=headless_chicken_chocolate",ret:"_headlesschickenchocolate"},
				{url:"fst=Husky_Pup",ret:"_huskypup"},
				{url:"fst=Hydro_Camper_A",ret:"_hydrocampera"},
				{url:"fst=Hydro_Camper_B",ret:"_hydrocamperb"},
				{url:"fst=Hydro_Camper_C",ret:"_hydrocamperc"},
				{url:"fst=Inflatable+Sheep",ret:"_inflatablesheep"},
				{url:"fst=Inflated_Sheep_Bondage",ret:"_inflatedsheepbondage"},
				{url:"fst=Invite_Friend",ret:"_invitefriend"},
				{url:"fst=Jelly_Bean_Tree",ret:"_jellybeantree"},
				{url:"fst=Jitters",ret:"_jitters"},
				{url:"fst=Keyboard",ret:"_keyboard"},
				{url:"fst=Key_Vine",ret:"_keyvine"},
				{url:"fst=Kissing_Booth",ret:"_kissingbooth"},
				{url:"fst=Knife_Throne",ret:"_knifethrone"},
				{url:"fst=Leprechaun+Ale",ret:"_leprechaunale"},
				{url:"fst=Leprechaun+Pipe",ret:"_leprechaunpipe"},
				{url:"fst=Light_Of_Jah",ret:"_lightofjah"},
				{url:"fst=Lostsheep_Cat",ret:"_lostsheepcat"},
				{url:"fst=Lostsheep_Cat_420",ret:"_lostsheepcat420"},
				{url:"fst=lostsheep_cat_bondage",ret:"_lostsheepcatbondage"},
				{url:"fst=Lostsheep_Cat_Ghost",ret:"_lostsheepcatghost"},
				{url:"fst=Lostsheep_Cat_Mardi_Gras",ret:"_lostsheepcatmardigras"},
				{url:"fst=Lostsheep_Cat_Reindeer",ret:"_lostsheepcatreindeer"},
				{url:"fst=Lostsheep_Cat_Santa",ret:"_lostsheepcatsanta"},
				{url:"fst=Lostsheep_Cat_Scifi",ret:"_lostsheepcatscifi"},
				{url:"fst=Lostsheep_Cat_Voodoo",ret:"_lostsheepcatvoodoo"},
				{url:"fst=Lost_Leprechaun",ret:"_lostleprechaun"},
				{url:"fst=Love+In",ret:"_lovein"},
				{url:"fst=Love+Machine",ret:"_lovemachine"},
				{url:"fst=Love+Pig",ret:"_lovepigproduct"},
				{url:"fst=Love_Pig",ret:"_lovepig"},
				{url:"fst=mac_n_cheese_bush",ret:"_macncheesebush"},
				{url:"fst=ME_Rare",ret:"_merare"},
				{url:"fst=Milk+Chocobunny",ret:"_milkchocobunny"},
				{url:"fst=Milk+Chocobunny",ret:"_milkchocobunny"},
				{url:"fst=Ms_Demon_Dick",ret:"_msdemondick"},
				{url:"fst=Mystery_Egg_All",ret:"_mysteryeggall"},
				{url:"fst=Nacho_Machine",ret:"_nachomachine"},
				{url:"fst=New_Years_Pig",ret:"_newyearspig"},
				{url:"fst=New_Years_Pig_Lostsheep",ret:"_newyearspiglostsheep"},
				{url:"fst=Nutcracker",ret:"_nutcracker"},
				{url:"fst=OG_Kush_Hollywood",ret:"_ogkushhollywood"},
				{url:"fst=Oil_Press",ret:"_oilpress"},
				{url:"fst=OldHippie",ret:"_oldhippie"},
				{url:"fst=Old_Hippy_Gold",ret:"_oldhippygold"},
				{url:"fst=Oogy+Bunny",ret:"_oogybunny"},
				{url:"fst=Panama_Red",ret:"_panamared"},
				{url:"fst=ParaBear",ret:"_parabear"},
				{url:"fst=Paranoid+Santa+Bear",ret:"_paranoidsantabear"},
				{url:"fst=Paranoid_Bunny_Bear",ret:"_paranoidbunnybear"},
				{url:"fst=Paranoid_Bunny_Bear_LostSheep",ret:"_paranoidbunnybearlostsheep"},
				{url:"fst=Paranoid_Conspiracy_Bear",ret:"_paranoidconspiracybear"},
				{url:"fst=Paranoid_Death_Bear",ret:"_paranoiddeathbear"},
				{url:"fst=Paranoid_Devil_Bear",ret:"_paranoiddevilbear"},
				{url:"fst=Paranoid_Four_Twenty_Bear",ret:"_paranoidfourtwentybear"},
				{url:"fst=Paranoid_Gdblue_Bear",ret:"_paranoidgdbluebear"},
				{url:"fst=Paranoid_Gdgreen_Bear",ret:"_paranoidgdgreenbear"},
				{url:"fst=Paranoid_Gdorange_Bear",ret:"_paranoidgdorangebear"},
				{url:"fst=Paranoid_Gdpink_Bear",ret:"_paranoidgdpinkbear"},
				{url:"fst=Paranoid_Gdyellow_Bear",ret:"_paranoidgdyellowbear"},
				{url:"fst=Paranoid_Girl_Bear",ret:"_paranoidgirlbear"},
				{url:"fst=Paranoid_Girl_Trailer_Bear",ret:"_paranoidgirltrailerbear"},
				{url:"fst=Paranoid_Mardi_Gras_Bear",ret:"_paranoidmardigrasbear"},
				{url:"fst=Paranoid_New_Years_Bear",ret:"_paranoidnewyearsbear"},
				{url:"fst=Paranoid_Party_Bear",ret:"_paranoidpartybear"},
				{url:"fst=Paranoid_Pilgrim",ret:"_paranoidpilgrim"},
				{url:"fst=Paranoid_Pumpkin_Bear",ret:"_paranoidpumpkinbear"},
				{url:"fst=Paranoid_Rasta_Bear",ret:"_paranoidrastabear"},
				{url:"fst=Paranoid_Reindeer",ret:"_paranoidreindeer"},
				{url:"fst=Paranoid_Scifi_Bear",ret:"_paranoidscifibear"},
				{url:"fst=Paranoid_Trailer_Bear",ret:"_paranoidtrailerbear"},
				{url:"fst=Paranoid_Wizard_Bear",ret:"_paranoidwizardbear"},
				{url:"fst=Paranoid_Zombie_Bear",ret:"_paranoidzombiebear"},
				{url:"fst=Peoples_Pot",ret:"_peoplespot"},
				{url:"fst=Pie_Cabbage",ret:"_piecabbage"},
				{url:"fst=Pie_Cabbage_Pumpkin",ret:"_piecabbagepumpkin"},
				{url:"fst=Pile_O_Bones",ret:"_pileobones"},
				{url:"fst=Pink+Bunny",ret:"_pinkbunny"},
				{url:"fst=Pizza_Flower",ret:"_pizzaflower"},
				{url:"fst=Popcorn_Maker",ret:"_popcornmaker"},
				{url:"fst=potluck_seed",ret:"_potluckseed"},
				{url:"fst=Pot_Angel",ret:"_potangel"},
				{url:"fst=Pot_Cemetery_Two",ret:"_potcemeterytwo"},
				{url:"fst=Pot_Heads_Circle",ret:"_potheadscircle"},
				{url:"fst=Pot_Heads_Conspiracy",ret:"_potheadsconspiracy"},
				{url:"fst=Pot_Heads_Conspiracy_Lrg",ret:"_potheadsconspiracylrg"},
				{url:"fst=Pot_Heads_Conspiracy_Sml",ret:"_potheadsconspiracysml"},
				{url:"fst=Pot_Heads_Fantasy",ret:"_potheadsfantasy"},
				{url:"fst=Pot_Heads_Fantasy_Lrg",ret:"_potheadsfantasylrg"},
				{url:"fst=Pot_Heads_Fantasy_Sml",ret:"_potheadsfantasysml"},
				{url:"fst=Pot_Heads_Ghost",ret:"_potheadsghost"},
				{url:"fst=Pot_Heads_Ghost_Lrg",ret:"_potheadsghostlrg"},
				{url:"fst=Pot_Heads_Ghost_Sml",ret:"_potheadsghostsml"},
				{url:"fst=Pot_Heads_Halloween",ret:"_potheadshalloween"},
				{url:"fst=Pot_Heads_Halloween_Lrg",ret:"_potheadshalloweenlrg"},
				{url:"fst=Pot_Heads_Halloween_Sml",ret:"_potheadshalloweensml"},
				{url:"fst=pot_heads_island",ret:"_potheadsisland"},
				{url:"fst=pot_heads_island_lrg",ret:"_potheadsislandlrg"},
				{url:"fst=pot_heads_island_sml",ret:"_potheadsislandsml"},
				{url:"fst=Pot_Heads_Lrg",ret:"_potheadslrg"},
				{url:"fst=Pot_Heads_Mardi_Gras",ret:"_potheadsmardigras"},
				{url:"fst=Pot_Heads_Mardi_Gras_Lrg",ret:"_potheadsmardigraslrg"},
				{url:"fst=Pot_Heads_Mardi_Gras_Sml",ret:"_potheadsmardigrassml"},
				{url:"fst=Pot_Heads_Med",ret:"_potheadsmed"},
				{url:"fst=Pot_Heads_Occupy",ret:"_potheadsoccupy"},
				{url:"fst=Pot_Heads_Occupy_Lrg",ret:"_potheadsoccupylrg"},
				{url:"fst=Pot_Heads_Occupy_Sml",ret:"_potheadsoccupysml"},
				{url:"fst=pot_heads_rock_star",ret:"_potheadsrockstar"},
				{url:"fst=pot_heads_rock_star_lrg",ret:"_potheadsrockstarlrg"},
				{url:"fst=pot_heads_rock_star_sml",ret:"_potheadsrockstarsml"},
				{url:"fst=Pot_Heads_Scifi",ret:"_potheadsscifi"},
				{url:"fst=Pot_Heads_Scifi_Lrg",ret:"_potheadsscifilrg"},
				{url:"fst=Pot_Heads_Scifi_Sml",ret:"_potheadsscifisml"},
				{url:"fst=Pot_Heads_Sml",ret:"_potheadssml"},
				{url:"fst=pot_heads_trailer",ret:"_potheadstrailer"},
				{url:"fst=pot_heads_trailer_lrg",ret:"_potheadstrailerlrg"},
				{url:"fst=pot_heads_trailer_sml",ret:"_potheadstrailersml"},
				{url:"fst=Pot_Heads_Voodoo",ret:"_potheadsvoodoo"},
				{url:"fst=Pot_Heads_Voodoo_Lrg",ret:"_potheadsvoodoolrg"},
				{url:"fst=Pot_Heads_Voodoo_Sml",ret:"_potheadsvoodoosml"},
				{url:"fst=Pot_Heads_Wonder",ret:"_potheadswonder"},
				{url:"fst=Pot_Heads_Wonder_Lrg",ret:"_potheadswonderlrg"},
				{url:"fst=Pot_Heads_Wonder_Sml",ret:"_potheadswondersml"},
				{url:"fst=Pot_Heads_Xmas",ret:"_potheadsxmas"},
				{url:"fst=Pot_Heads_Xmas_Lrg",ret:"_potheadsxmaslrg"},
				{url:"fst=Pot_Heads_Xmas_Sml",ret:"_potheadsxmassml"},
				{url:"fst=Promo_FTB",ret:"_promoftb"},
				{url:"fst=Promo_FTB_ZombieHydro",ret:"_promoftbzombiehydro"},
				{url:"fst=Psych_Chick_3d",ret:"_psychchick3d"},
				{url:"fst=Psych_Chick_Floyd",ret:"_psychchickfloyd"},
				{url:"fst=Psych_Chick_Tiedye",ret:"_psychchicktiedye"},
				{url:"fst=Psych_Chick_Walrus",ret:"_psychchickwalrus"},
				{url:"fst=Puffler_Machine",ret:"_pufflermachine"},
				{url:"fst=Puffle_Black",ret:"_puffleblack"},
				{url:"fst=Puffle_Calico",ret:"_pufflecalico"},
				{url:"fst=Puffle_Grey",ret:"_pufflegrey"},
				{url:"fst=Puffle_Orange",ret:"_puffleorange"},
				{url:"fst=Puffle_White",ret:"_pufflewhite"},
				{url:"fst=Puffy_Leprechaun",ret:"_puffyleprechaun"},
				{url:"fst=Puzzle1",ret:"_puzzle1"},
				{url:"fst=QP_420_Pot_Heads",ret:"_qp420potheads"},
				{url:"fst=QP_Buggin_Out",ret:"_qpbugginout"},
				{url:"fst=QP_Cars_Gears",ret:"_qpcarsgears"},
				{url:"fst=QP_DB_Cooper",ret:"_qpdbcooper"},
				{url:"fst=QP_Easter",ret:"_qpeaster"},
				{url:"fst=QP_Game_Of_Chrons",ret:"_qpgameofchrons"},
				{url:"fst=qp_holy_smoke_C",ret:"_qpholysmokec"},
				{url:"fst=QP_Ranger_Dick_Wife",ret:"_qprangerdickwife"},
				{url:"fst=Rabbit_Hole",ret:"_rabbithole"},
				{url:"fst=Rally+Girl",ret:"_rallygirl"},
				{url:"fst=Ranger_Stn_Final",ret:"_rangerstnfinal"},
				{url:"fst=Ripped_Raccoon",ret:"_rippedraccoon"},
				{url:"fst=Ripped_Zombie_Raccoon",ret:"_rippedzombieraccoon"},
				{url:"fst=Ripple_Chip_Plant",ret:"_ripplechipplant"},
				{url:"fst=Rosy+Love+Pig",ret:"_rosylovepigproduct"},
				{url:"fst=Rosy_Love_Pig",ret:"_rosylovepig"},
				{url:"fst=Sad+Bunny",ret:"_sadbunny"},
				{url:"fst=Sasquatch",ret:"_sasquatch"},
				{url:"fst=Sasquatch_A_01",ret:"_sasquatcha01"},
				{url:"fst=Sasquatch_A_02",ret:"_sasquatcha02"},
				{url:"fst=Sasquatch_A_03",ret:"_sasquatcha03"},
				{url:"fst=Sasquatch_B_01",ret:"_sasquatchb01"},
				{url:"fst=Sasquatch_B_02",ret:"_sasquatchb02"},
				{url:"fst=Sasquatch_B_03",ret:"_sasquatchb03"},
				{url:"fst=Sasquatch_C_01",ret:"_sasquatchc01"},
				{url:"fst=Sasquatch_C_02",ret:"_sasquatchc02"},
				{url:"fst=Sasquatch_C_03",ret:"_sasquatchc03"},
				{url:"fst=Second+Breakfast",ret:"_secondbreakfast"},
				{url:"fst=SFME_CommonA",ret:"_sfmecommona"},
				{url:"fst=SFME_CommonB",ret:"_sfmecommonb"},
				{url:"fst=Shrooms+Blue",ret:"_shroomsblue"},
				{url:"fst=ShroomsBluesLost",ret:"_shroomsblueslost"},
				{url:"fst=Skunk_Ghost",ret:"_skunkghost"},
				{url:"fst=Snowman_Scene_01",ret:"_snowmanscene01"},
				{url:"fst=Snowman_Scene_02",ret:"_snowmanscene02"},
				{url:"fst=Snowman_Scene_03",ret:"_snowmanscene03"},
				{url:"fst=Snowman_Scene_04",ret:"_snowmanscene04"},
				{url:"fst=Snowman_Scene_05",ret:"_snowmanscene05"},
				{url:"fst=Snowman_Scene_08",ret:"_snowmanscene08"},
				{url:"fst=Snowman_Scene_09",ret:"_snowmanscene09"},
				{url:"fst=Snowman_Scene_10",ret:"_snowmanscene10"},
				{url:"fst=star_bud",ret:"_starbud"},
				{url:"fst=Strange_Swag",ret:"_strangeswag"},
				{url:"fst=Superdelic",ret:"_superdelic"},
				{url:"fst=Table_Wonderland",ret:"_tablewonderland"},
				{url:"fst=tavern_irish_aftermath",ret:"_tavernirishaftermath"},
				{url:"fst=tavern_irish_open",ret:"_tavernirishopen"},
				{url:"fst=tavern_irish_party",ret:"_tavernirishparty"},
				{url:"fst=Teleporter",ret:"_teleporter"},
				{url:"fst=Trailer_Dryer",ret:"_trailerdryer"},
				{url:"fst=Trailer_Washer",ret:"_trailerwasher"},
				{url:"fst=Trouser_Snake",ret:"_trousersnake"},
				{url:"fst=Voodoo_Doll_Dick",ret:"_voodoodolldick"},
				{url:"fst=Voodoo_Grave",ret:"_voodoograve"},
				{url:"fst=Whiskey_Still",ret:"_whiskeystill"},
				{url:"fst=White+Rabbit",ret:"_whiterabbit"},
				{url:"fst=Wine+Maker",ret:"_winemaker"},
				{url:"fst=Wishing_Well",ret:"_wishingwell"},
				{url:"fst=Wizards_Weed_White",ret:"_wizardsweedwhite"},
				{url:"fst=Zombie_Crowd",ret:"_zombiecrowd"},
				{url:"fst=Zombie_Horde",ret:"_zombiehorde"},
//MOOCH ITEMS
				{url:"fst=Alien+Probe",ret:"_alienprobe"},
				{url:"fst=Blue+Paint",ret:"_bluepaint"},
				{url:"fst=Bone+Meal",ret:"_bonemeal"},
				{url:"fst=Bricks",ret:"_bricks"},
				{url:"fst=Candles",ret:"_candles"},
				{url:"fst=Candy+Canes",ret:"_candycanes"},
				{url:"fst=Carrots",ret:"_carrots"},
				{url:"fst=Champagne+Product",ret:"_champagneproduct"},
				{url:"fst=Charcoal+Filter",ret:"_charcoalfilter"},
				{url:"fst=Chicken+Blood",ret:"_chickenblood"},
				{url:"fst=Choclate+Product",ret:"_choclateproduct"},
				{url:"fst=Chocolate",ret:"_chocolate"},
				{url:"fst=Chocolate+Eggs",ret:"_chocolateeggs"},
				{url:"fst=Chocolate+Syrup",ret:"_chocolatesyrup"},
				{url:"fst=Christmas+Cookies",ret:"_christmascookies"},
				{url:"fst=Clothes",ret:"_clothes"},
				{url:"fst=Critter+Paw",ret:"_critterpaw"},
				{url:"fst=Dilithium+Thc",ret:"_dilithiumthc"},
				{url:"fst=Ectoplasm",ret:"_ectoplasm"},
				{url:"fst=Enerchron+Cubes",ret:"_enerchroncubes"},
				{url:"fst=Fan",ret:"_fan"},
				{url:"fst=Fancy+Booze",ret:"_fancybooze"},
				{url:"fst=Fancy+Snacks",ret:"_fancysnacks"},
				{url:"fst=Feathers",ret:"_feathers"},
				{url:"fst=Flower+Petals",ret:"_flowerpetals"},
				{url:"fst=Generator",ret:"_generator"},
				{url:"fst=Grow+Light",ret:"_growlight"},
				{url:"fst=Hash+Black",ret:"_hashblack"},
				{url:"fst=Hemp+Ale",ret:"_hempale"},
				{url:"fst=Hemp+Milk",ret:"_hempmilk"},
				{url:"fst=Hydroponic+Fan+Super",ret:"_hydroponicfansuper"},
				{url:"fst=Hydroponic+Generator+Super",ret:"_hydroponicgeneratorsuper"},
				{url:"fst=Hydroponic+Lamp+Super",ret:"_hydroponiclampsuper"},
				{url:"fst=Hydroponic+Secuirty+Camera+Ir",ret:"_hydroponicsecuirtycamerair"},
				{url:"fst=Ketchup",ret:"_ketchup"},
				{url:"fst=Love+Oil",ret:"_loveoil"},
				{url:"fst=Lumber",ret:"_lumber"},
				{url:"fst=Matches",ret:"_matches"},
				{url:"fst=Mystery+Critter",ret:"_mysterycritter"},
				{url:"fst=Mystery+Gift",ret:"_mysterygift"},
				{url:"fst=Nachos",ret:"_nachos"},
				{url:"fst=Potion+Blue",ret:"_potionblue"},
				{url:"fst=Potion+Orange",ret:"_potionorange"},
				{url:"fst=Pufflers",ret:"_pufflers"},
				{url:"fst=Red+Paint",ret:"_redpaint"},
				{url:"fst=Roses",ret:"_roses"},
				{url:"fst=Second+Breakfast",ret:"_secondbreakfast"},
				{url:"fst=Sheet+Metal",ret:"_sheetmetal"},
				{url:"fst=Shovel",ret:"_shovel"},
				{url:"fst=Snow",ret:"_snow"},
				{url:"fst=Spark+Plugs",ret:"_sparkplugs"},
				{url:"fst=Surveillance+Camera",ret:"_surveillancecamera"},
				{url:"fst=Sweet+Love",ret:"_sweetlove"},
				{url:"fst=Toilet+Paper",ret:"_toiletpaper"},
				{url:"fst=Twigs+And+Coal",ret:"_twigsandcoal"},
				{url:"fst=Voodoo+Bones",ret:"_voodoobones"},
				{url:"fst=Voodoo+Potion+Green",ret:"_voodoopotiongreen"},
				{url:"fst=Voodoo+Potion+Purple",ret:"_voodoopotionpurple"},
				{url:"fst=Voodoo+Potion+Red",ret:"_voodoopotionred"},
				{url:"fst=Water+Pump",ret:"_waterpump"},
				{url:"fst=Rain+Water",ret:"_waterrain"},
				{url:"fst=Whiskey",ret:"_whiskey"},
				{url:"fst=Wine",ret:"_wine"},
				{url:"fst=Winter+Ale",ret:"_winterale"},
				{url:"fst=Wrench",ret:"_wrench"},
				{url:"fst=Xmas+Lights",ret:"_xmaslights"},
				{url:"fst=Yellow+Paint",ret:"_yellowpaint"},
//MOOCH ITEMS
			],

			menu: {
				SSsection_main:{type:"section",label:"Pot Farm Feed Options ("+version+")",kids:{
					SSupdateSidekick:{type:"link",label:"Update PF Sidekick",href:"http://userscripts.org/scripts/source/119887.user.js"},
					SSabout_Sidekick:{type:"link",label:"About PF Sidekick",href:"http://userscripts.org/scripts/show/119887"},
					SSsource_Sidekick:{type:"link",label:"View current source",href:"http://userscripts.org/scripts/review/119887"},
					SSrevisionSidekick:{type:"link",label:"Revision History",href:"http://userscripts.org/scripts/versions/119887"},
					SSdonateSidekick:{type:"link",label:"$ Donations $",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G9EEEGGPQ5VGE"},
					SSbasic:{type:"separator",label:"Basics",kids:{
						_floydfreak:{type:"checkbox",label:"Floyd Freak (out dated but still active)"},
						_bonus:{type:"checkbox",label:"Claim all Xp/Coin Bonus"},
						_blazerunner_game:{type:"checkbox",label:"Blaze Runner Bonus seeds from Mobile Phones "},
						//_sendgiftrequest:{type:"checkbox",
							//label:"Send gift requests \"#This will send all requests found, even if you have sent that player a gift today!\""},

						basictab0:{type:'tab',label:"Bat Shit",kids:{
							_jitters:{type:"checkbox",label:"Jitters (Bat Shit)"},
							_huskypup:{type:"checkbox",label:"Husky Pup (Bat Shit)"},
							_snowmanscene04:{type:"checkbox",label:"Snowman Scene 04 (Bat Shit)"},
							_merare:{type:"checkbox",label:"ME Rare (Bat Shit)"},
							_fatbat:{type:"checkbox",label:"Fat Bat (Bat Shit)"},
							_fatbatalbino:{type:"checkbox",label:"Fat Bat Albino (PuffPuffPass)"},
							_fatbatbrown:{type:"checkbox",label:"Fat Bat Brown (Bat Shit)"},
							_fatbatcow:{type:"checkbox",label:"Fat Bat Cow (Bat Shit)"},
							_fatbatpurple:{type:"checkbox",label:"Fat Bat Purple (Bat Shit)"},
						}},
						basictab1:{type:'tab',label:"Other Stuff",kids:{
							_faxmachine:{type:"checkbox",label:"Fax Machine (Enerchron Cubes)"},
							_rangerstnfinal:{type:"checkbox",label:"Ranger Stn Final (Dicks Notes)"},
							_tablewonderland:{type:"checkbox",label:"Table Wonderland (Potion Blue)"},
							_pileobones:{type:"checkbox",label:"Pile O Bones (Bone Meal)",newitem:2},
						}},
						basictab2:{type:'tab',label:"Puzzle parts",kids:{
							_puzzle1:{type:"checkbox",label:"Puzzle1 (Ranger Bushes)"},
							_qpholysmokec:{type:"checkbox",label:"Qp Holy Smoke C (0)",newitem:1},
							sasquatchA_Block1:{type:'optionblock',label:"Sasquatch A:",kids:{
								_sasquatcha01:{type:"checkbox",label:"Sasquatch A 01 (Sasquatch A 01)"},
								_sasquatcha02:{type:"checkbox",label:"Sasquatch A 02 (Sasquatch A 02)"},
								_sasquatcha03:{type:"checkbox",label:"Sasquatch A 03 (Sasquatch A 03)"},
							}},
							sasquatchB_Block2:{type:'optionblock',label:"Sasquatch B:",kids:{
								_sasquatchb01:{type:"checkbox",label:"Sasquatch B 01 (Sasquatch B 01)"},
								_sasquatchb02:{type:"checkbox",label:"Sasquatch B 02 (Sasquatch B 02)"},
								_sasquatchb03:{type:"checkbox",label:"Sasquatch B 03 (Sasquatch B 03)"},
							}},
							sasquatchC_Block3:{type:'optionblock',label:"Sasquatch C:",kids:{
								_sasquatchc01:{type:"checkbox",label:"Sasquatch C 01 (Sasquatch C 01)"},
								_sasquatchc02:{type:"checkbox",label:"Sasquatch C 02 (Sasquatch C 02)"},
								_sasquatchc03:{type:"checkbox",label:"Sasquatch C 03 (Sasquatch C 03)"},
							}},
							Ghosthunter_Block4:{type:'optionblock',label:"Ghosthunter:",kids:{
								_buzzedghostbeaver:{type:"checkbox",label:"Buzzed Ghost Beaver (Ghosthunter C 01)",newitem:2},
								_dickshouseb:{type:"checkbox",label:"Dicks House B (Ghosthunter B 03)",newitem:2},
								_ghosthunterpiecea01:{type:"checkbox",label:"Ghosthunter Piece A 01 (Ghosthunter A 01)",newitem:2},
								_ghosthunterpiecea03:{type:"checkbox",label:"Ghosthunter Piece A 03 (Ghosthunter A 03)",newitem:2},
								_ghosthunterpieceb01:{type:"checkbox",label:"Ghosthunter Piece B 01 (Ghosthunter B 01)",newitem:2},
								_ghosthunterpieceb02:{type:"checkbox",label:"Ghosthunter Piece B 02 (Ghosthunter B 02)",newitem:2},
								_ghosthunterpiecec02:{type:"checkbox",label:"Ghosthunter Piece C 02 (Ghosthunter C 02)",newitem:2},
							}},
						}},
						basictab3:{type:'tab',label:"Quest parts",kids:{
							_qp420potheads:{type:"checkbox",label:"QP 420 Pot Heads"},
							_qpbugginout:{type:"checkbox",label:"QP Buggin Out"},
							_qpcarsgears:{type:"checkbox",label:"QP Cars Gears"},
							_qpdbcooper:{type:"checkbox",label:"QP DB Cooper"},
							_qpeaster:{type:"checkbox",label:"QP Easter"},
							_qpgameofchrons:{type:"checkbox",label:"QP Game Of Chrons"},
							_qprangerdickwife:{type:"checkbox",label:"QP Ranger Dick Wife"},
							_strangeswag:{type:"checkbox",label:"Strange Swag"},
						}},
//MOOCH ITEMS
						basictab4:{type:'tab',label:"Moochables",kids:{
							MoochBlock:{type:'optionblock',label:"Mooch:",kids:{
								_alienprobe:{type:"checkbox",label:"Alien Probe"},
								_bluepaint:{type:"checkbox",label:"Blue Paint"},
								_bonemeal:{type:"checkbox",label:"Bone Meal"},
								_bricks:{type:"checkbox",label:"Bricks"},
								_candles:{type:"checkbox",label:"Candles"},
								_candycanes:{type:"checkbox",label:"Candy Canes"},
								_carrots:{type:"checkbox",label:"Carrots"},
								_champagneproduct:{type:"checkbox",label:"Champagne Product"},
								_charcoalfilter:{type:"checkbox",label:"Charcoal Filter"},
								_chickenblood:{type:"checkbox",label:"Chicken Blood"},
								_choclateproduct:{type:"checkbox",label:"Choclate Product"},
								_chocolate:{type:"checkbox",label:"Chocolate"},
								_chocolateeggs:{type:"checkbox",label:"Chocolate Eggs"},
								_chocolatesyrup:{type:"checkbox",label:"Chocolate Syrup"},
								_christmascookies:{type:"checkbox",label:"Christmas Cookies"},
								_clothes:{type:"checkbox",label:"Clothes"},
								_critterpaw:{type:"checkbox",label:"Critter Paw"},
								_dilithiumthc:{type:"checkbox",label:"Dilithium Thc"},
								_ectoplasm:{type:"checkbox",label:"Ectoplasm"},
								_enerchroncubes:{type:"checkbox",label:"Enerchron Cubes"},
								_fan:{type:"checkbox",label:"Fan"},
								_fancybooze:{type:"checkbox",label:"Fancy Booze"},
								_fancysnacks:{type:"checkbox",label:"Fancy Snacks"},
								_feathers:{type:"checkbox",label:"Feathers"},
								_flowerpetals:{type:"checkbox",label:"Flower Petals"},
								_generator:{type:"checkbox",label:"Generator"},
								_growlight:{type:"checkbox",label:"Grow Light"},
								_hashblack:{type:"checkbox",label:"Hash Black"},
								_hempale:{type:"checkbox",label:"Hemp Ale"},
								_hempmilk:{type:"checkbox",label:"Hemp Milk"},
								_hydroponicfansuper:{type:"checkbox",label:"Hydroponic Fan Super"},
								_hydroponicgeneratorsuper:{type:"checkbox",label:"Hydroponic Generator Super"},
								_hydroponiclampsuper:{type:"checkbox",label:"Hydroponic Lamp Super"},
								_hydroponicsecuirtycamerair:{type:"checkbox",label:"Hydroponic Secuirty Camera Ir"},
								_ketchup:{type:"checkbox",label:"Ketchup"},
								_loveoil:{type:"checkbox",label:"Love Oil"},
								_lumber:{type:"checkbox",label:"Lumber"},
								_matches:{type:"checkbox",label:"Matches"},
								_mysterycritter:{type:"checkbox",label:"Mystery Critter"},
								_mysterygift:{type:"checkbox",label:"Mystery Gift"},
								_nachos:{type:"checkbox",label:"Nachos"},
								_potionblue:{type:"checkbox",label:"Potion Blue"},
								_potionorange:{type:"checkbox",label:"Potion Orange"},
								_pufflers:{type:"checkbox",label:"Pufflers"},
								_redpaint:{type:"checkbox",label:"Red Paint"},
								_roses:{type:"checkbox",label:"Roses"},
								_secondbreakfast:{type:"checkbox",label:"Second Breakfast"},
								_sheetmetal:{type:"checkbox",label:"Sheet Metal"},
								_shovel:{type:"checkbox",label:"Shovel"},
								_snow:{type:"checkbox",label:"Snow"},
								_sparkplugs:{type:"checkbox",label:"Spark Plugs"},
								_surveillancecamera:{type:"checkbox",label:"Surveillance Camera"},
								_sweetlove:{type:"checkbox",label:"Sweet Love"},
								_toiletpaper:{type:"checkbox",label:"Toilet Paper"},
								_twigsandcoal:{type:"checkbox",label:"Twigs And Coal"},
								_voodoobones:{type:"checkbox",label:"Voodoo Bones"},
								_voodoopotiongreen:{type:"checkbox",label:"Voodoo Potion Green"},
								_voodoopotionpurple:{type:"checkbox",label:"Voodoo Potion Purple"},
								_voodoopotionred:{type:"checkbox",label:"Voodoo Potion Red"},
								_waterpump:{type:"checkbox",label:"Water Pump"},
								_waterrain:{type:"checkbox",label:"Water Rain"},
								_whiskey:{type:"checkbox",label:"Whiskey"},
								_wine:{type:"checkbox",label:"Wine"},
								_winterale:{type:"checkbox",label:"Winter Ale"},
								_wrench:{type:"checkbox",label:"Wrench"},
								_xmaslights:{type:"checkbox",label:"Xmas Lights"},
								_yellowpaint:{type:"checkbox",label:"Yellow Paint"},
							}},
						}},
//MOOCH ITEMS
					}},
					SSseeds:{type:"separator",label:"Seeds",kids:{
						_fourtwentynews:{type:"checkbox",label:"FourTwentyNews"},
						_chorevalentine:{type:"checkbox",label:"Chores"},
						seedstab0:{type:'tab',label:"Mystery Seeds",kids:{
							mseedsBlock:{type:'optionblock',label:"Mystery Seeds:",kids:{
								_acapulcogold:{type:"checkbox",label:"Acapulco Gold"},
								_pizzaflower:{type:"checkbox",label:"Pizza Flower"},
								_bacontree:{type:"checkbox",label:"Bacon Tree "},
								_ripplechipplant:{type:"checkbox",label:"Ripple Chip Plant"},
								_jellybeantree:{type:"checkbox",label:"Jelly Bean Tree"},
								_cookiebush:{type:"checkbox",label:"Cookie Bush"},
								_panamared:{type:"checkbox",label:"Panama Red"},
								_candyheartbush:{type:"checkbox",label:"Candy Heart Bush"},
								_cheezobush:{type:"checkbox",label:"Cheezo Bush"},
								_donuttree:{type:"checkbox",label:"Donut Tree"},
								_piecabbage:{type:"checkbox",label:"Pie Cabbage"},
								_3xbankersbud:{type:"checkbox",label:"3x Bankers Bud"},
								_bankersbud:{type:"checkbox",label:"Bankers Bud"},
								_blazerunner:{type:"checkbox",label:"Blaze Runner"},
								_snowmanscene01:{type:"checkbox",label:"Snowman Scene 01"},
								_alienwedding:{type:"checkbox",label:"Alien Wedding"},
								_2xacapulcogold:{type:"checkbox",label:"2x Acapulco Gold"},
								_keyvine:{type:"checkbox",label:"Key Vine"},
								_lightofjah:{type:"checkbox",label:"Light Of Jah"},
								_fatbattabby:{type:"checkbox",label:"Fat Bat Tabby (Mystery Seed)"},
								_20xlightofjah:{type:"checkbox",label:"20x Light Of Jah (Mystery Seed)",newitem:1},
								_2xkeyvine:{type:"checkbox",label:"2x Key Vine (Mystery Seed)",newitem:1},
								_9xlightofjah:{type:"checkbox",label:"9x Light Of Jah (Mystery Seed)",newitem:1},
							}},
						}},
						seedstab1:{type:'tab',label:"Surprise Seed",kids:{
							mseedsBlock:{type:'optionblock',label:"Surprise Seeds:",kids:{
								_20xsubzero:{type:"checkbox",label:"20x Sub Zero (Surprise Seed)",newitem:1},
								_20xdannyboy:{type:"checkbox",label:"20x Danny Boy (Surprise Seed)",newitem:1},
								_4xsubzero:{type:"checkbox",label:"4x Sub Zero (Surprise Seed)",newitem:1},
								_50xchroniccharms:{type:"checkbox",label:"50x Chronic Charms (Surprise Seed)",newitem:1},
								_50xdannyboy:{type:"checkbox",label:"50x Danny Boy (Surprise Seed)",newitem:1},
								_9xsubzero:{type:"checkbox",label:"9x Sub Zero (Surprise Seed)",newitem:1},
								_dragonirish:{type:"checkbox",label:"Dragon Irish (Surprise Seed)",newitem:1},
								_macncheesebush:{type:"checkbox",label:"Mac N Cheese Bush (Surprise Seed)",newitem:1},
								_starbud:{type:"checkbox",label:"Star Bud (Surprise Seed)",newitem:1},
								_tavernirishaftermath:{type:"checkbox",label:"Tavern Irish Aftermath (Surprise Seed)",newitem:1},
								_tavernirishopen:{type:"checkbox",label:"Tavern Irish Open (Surprise Seed)",newitem:1},
								_tavernirishparty:{type:"checkbox",label:"Tavern Irish Party (Surprise Seed)",newitem:1},
							}},
						}},
						seedstab2:{type:'tab',label:"Potluck Seed",kids:{
							mseedsBlock:{type:'optionblock',label:"Potluck Seeds:",kids:{
								_potluckseed:{type:"checkbox",label:"Potluck Seed (Potluck Seed)",newitem:1},
							}},
						}},
						seedstab3:{type:'tab',label:"Seeds by Group",kids:{
								_3xapotcalypse:{type:"checkbox",label:"3x Apotcalypse (Apotcalypse)",newitem:2},
								_psychchickwalrus:{type:"checkbox",label:"Psych Chick Walrus (Matanuska AKA Alaska Thunderfudk)"},
								_psychchickfloyd:{type:"checkbox",label:"Psych Chick Floyd (10x God Bud)"},
								_aprilfirstcrate:{type:"checkbox",label:"April First Crate (Hemp)",newitem:1},
								_promoftb:{type:"checkbox",label:"Promo FTB (Promo FTB)",newitem:1},
								_promoftbzombiehydro:{type:"checkbox",label:"Promo FTB ZombieHydro (Promo FTB ZombieHydro)",newitem:1},
							seedsBlock0:{type:'optionblock',label:"Old Hippie:",kids:{
								_oldhippie:{type:"checkbox",label:"OldHippie (Acapulco Gold)"},
								_oldhippygold:{type:"checkbox",label:"Old Hippy Gold (Acapulco Gold)"},
								_doorelevator:{type:"checkbox",label:"Door Elevator (Acapulco Gold)"},
							}},
							seedsBlock1:{type:'optionblock',label:"Pineapple:",kids:{						
								_4xpineapplepunch:{type:"checkbox",label:"4x Pineapple Punch (Pineapple Punch)"},
								_9xpineapplepunch:{type:"checkbox",label:"9x Pineapple Punch (4x Pineapple Punch)"},
							}},
							seedsBlock2:{type:'optionblock',label:"Love Potion:",kids:{
								_4xlovepotion:{type:"checkbox",label:"4x Love Potion (Love Potion)"},
								_9xlovepotion:{type:"checkbox",label:"9x Love Potion (4x Love Potion)"},
								_20xlovepotion:{type:"checkbox",label:"20x Love Potion (9x Love Potion)",newitem:1},
							}},
							seedsBlock3:{type:'optionblock',label:"Danny Boy:",kids:{
								_4xdannyboy:{type:"checkbox",label:"4x Danny Boy (Danny Boy)"},
								_9xdannyboy:{type:"checkbox",label:"9x Danny Boy (4x Danny Boy)"},
							}},
							seedsBlock4:{type:'optionblock',label:"Four Twenty Blues:",kids:{
								_4xfourtwentyblues:{type:"checkbox",label:"4x Four Twenty Blues (Four Twenty Blues)"},
								_9xfourtwentyblues:{type:"checkbox",label:"9x Four Twenty Blues (4x Four Twenty Blues)"},
								_20xfourtwentyblues:{type:"checkbox",label:"20x Four Twenty Blues (9x Four Twenty Blues)"},
							}},
							seedsBlock5:{type:'optionblock',label:"Chocolate Chunk:",kids:{
								_4xchocolatechunk:{type:"checkbox",label:"4x Chocolate Chunk (Chocolate Chunk)"},
								_9xchocolatechunk:{type:"checkbox",label:"9x Chocolate Chunk (4x Chocolate Chunk)"},
								_easterislandbunny:{type:"checkbox",label:"Easter Island Bunny (Chocolate Chunk)"},
								_20xchocolatechunk:{type:"checkbox",label:"20x Chocolate Chunk (9x Chocolate Chunk)"},
								_50xchocolatechunk:{type:"checkbox",label:"50x Chocolate Chunk (9x Chocolate Chunk)"},
							}},
							seedsBlock6:{type:'optionblock',label:"Ditch Weed:",kids:{
								_4xditchweed:{type:"checkbox",label:"4x Ditch Weed (Ditch Weed)"},
								_9xditchweed:{type:"checkbox",label:"9x Ditch Weed (4x Ditch Weed)"},
								_trailerdryer:{type:"checkbox",label:"Trailer Dryer (Ditch Weed)"},
								_trailerwasher:{type:"checkbox",label:"Trailer Washer (4x Ditch Weed)"},
							}},
							seedsBlock7:{type:'optionblock',label:"Alien Kush:",kids:{
								_cratermeteor:{type:"checkbox",label:"Crater Meteor (9x Alien Kush)"},
								_4xalienkush:{type:"checkbox",label:"4x Alien Kush (Alien Kush)"},
								_9xalienkush:{type:"checkbox",label:"9x Alien Kush (4x Alien Kush)"},
								_cropcirclebunny:{type:"checkbox",label:"Crop Circle Bunny (4x Alien Kush)"},
								_cropcirclepotleaf:{type:"checkbox",label:"Crop Circle Pot Leaf (Alien Kush)"},
								_aliengreykush:{type:"checkbox",label:"Alien Grey Kush (9x Alien Kush)"},
								_50xalienkush:{type:"checkbox",label:"50x Alien Kush (9x Alien Kush)"},
								_sfmecommonb:{type:"checkbox",label:"SFME CommonB (Alien Kush)"},
							}},
							seedsBlock8:{type:'optionblock',label:"OG Hollywood Kush:",kids:{
								_4xogkush:{type:"checkbox",label:"4x OG Kush (OG Kush)"},
								_9xogkush:{type:"checkbox",label:"9x OG Kush (4x OG Kush)"},
								_ogkushhollywood:{type:"checkbox",label:"OG Kush Hollywood (9x OG Kush)"},
								_guitar:{type:"checkbox",label:"Guitar (OG Kush)"},
								_keyboard:{type:"checkbox",label:"Keyboard (OG Kush)"},
								_drums:{type:"checkbox",label:"Drums (4x OG Kush)"},
								_bandset:{type:"checkbox",label:"Band Set (9x OG Kush)"},
							}},
							seedsBlock9:{type:'optionblock',label:"Grim Reefer:",kids:{
								_4xgrimreefer:{type:"checkbox",label:"4x Grim Reefer (Grim Reefer)"},
								_9xgrimreefer:{type:"checkbox",label:"9x Grim Reefer (4x Grim Reefer)"},
								_apotcalypse:{type:"checkbox",label:"Apotcalypse (9x Grim Reefer)"},
								_cauldronbubbling:{type:"checkbox",label:"Cauldron Bubbling (4x Grim Reefer)"},
								_cauldronwitches:{type:"checkbox",label:"Cauldron Witches (9x Grim Reefer)"},
								_potcemeterytwo:{type:"checkbox",label:"Pot Cemetery Two (Grim Reefer)"},
							}},
							seedsBlock10:{type:'optionblock',label:"Halloween:",kids:{
								_potangel:{type:"checkbox",label:"Pot Angel (Halloween)"},
								_4xhalloween:{type:"checkbox",label:"4x Halloween (Halloween)"},
								_9xhalloween:{type:"checkbox",label:"9x Halloween (4x Halloween)",newitem:3},
								_10xhalloween:{type:"checkbox",label:"10x Halloween (4x Halloween)"},
								_20xhalloween:{type:"checkbox",label:"20x Halloween (10x Halloween)"},
								_50xhalloween:{type:"checkbox",label:"50x Halloween (10x Halloween)"},
							}},
							seedsBlock11:{type:'optionblock',label:"Peoples Pot:",kids:{
								_20xpeoplespot:{type:"checkbox",label:"20x Peoples Pot (Bankers Bud)"},
								_4xpeoplespot:{type:"checkbox",label:"4x Peoples Pot (9x Peoples Pot)"},
								_9xpeoplespot:{type:"checkbox",label:"9x Peoples Pot (20x Peoples Pot)"},
								_peoplespot:{type:"checkbox",label:"Peoples Pot (4x Peoples Pot)"},
							}},
							seedsBlock12:{type:'optionblock',label:"Wizards Weed:",kids:{
								_4xwizardsweed:{type:"checkbox",label:"4x Wizards Weed (Wizards Weed)"},
								_9xwizardsweed:{type:"checkbox",label:"9x Wizards Weed (4x Wizards Weed)"},
								_excalibur:{type:"checkbox",label:"Excalibur (4x Wizards Weed)"},
								_wishingwell:{type:"checkbox",label:"Wishing Well (Wizards Weed)"},
								_wizardsweedwhite:{type:"checkbox",label:"Wizards Weed White (9x Wizards Weed)"},
								_babydragonred:{type:"checkbox",label:"Baby Dragon Red (Medical Dragon)"},
							}},
							seedsBlock13:{type:'optionblock',label:"Harvest Moon:",kids:{
								_4xharvestmoon:{type:"checkbox",label:"4x Harvest Moon (Harvest Moon)"},
								_9xharvestmoon:{type:"checkbox",label:"9x Harvest Moon (4x Harvest Moon)"},
								_cornucopia:{type:"checkbox",label:"Cornucopia (4x Harvest Moon)"},
							}},
							seedsBlock14:{type:'optionblock',label:"Ice Weed:",kids:{
								_20xiceweed:{type:"checkbox",label:"20x Ice Weed (9x Ice Weed)"},
								_4xiceweed:{type:"checkbox",label:"4x Ice Weed (Ice Weed)"},
								_9xiceweed:{type:"checkbox",label:"9x Ice Weed (4x Ice Weed)"},
								_snowmanscene02:{type:"checkbox",label:"Snowman Scene 02 (9x Ice Weed)"},
								_snowmanscene03:{type:"checkbox",label:"Snowman Scene 03 (4x Ice Weed)"},
								_snowmanscene05:{type:"checkbox",label:"Snowman Scene 05 (9x Ice Weed)"},
								_snowmanscene08:{type:"checkbox",label:"Snowman Scene 08 (4x Ice Weed)"},
								_snowmanscene09:{type:"checkbox",label:"Snowman Scene 09 (Ice Weed)"},
								_snowmanscene10:{type:"checkbox",label:"Snowman Scene 10 (9x Ice Weed)"},
								_nutcracker:{type:"checkbox",label:"Nutcracker (9x Ice Weed)"},
							}},
							seedsBlock15:{type:'optionblock',label:"Christmas Kush:",kids:{
								_3xchristmaskush:{type:"checkbox",label:"3x Christmas Kush (Christmas Kush)"},
								_10xchristmaskush:{type:"checkbox",label:"10x Christmas Kush (3x Christmas Kush)"},
							}},
							seedsBlock16:{type:'optionblock',label:"XXX 2012:",kids:{
								_4xxxx:{type:"checkbox",label:"4x Xxx (Xxx)"},
								_9xxxx:{type:"checkbox",label:"9x Xxx (4x Xxx)"},
								_20xxxx:{type:"checkbox",label:"20x Xxx (9x Xxx)"},
								_kissingbooth:{type:"checkbox",label:"Kissing Booth (20x Xxx)"},
								_trousersnake:{type:"checkbox",label:"Trouser Snake (9x Xxx)"},
							}},
							seedsBlock17:{type:'optionblock',label:"Cajun Kush:",kids:{
								_20xcajunkush:{type:"checkbox",label:"20x Cajun Kush (9x Cajun Kush)"},
								_4xcajunkush:{type:"checkbox",label:"4x Cajun Kush (Cajun Kush)"},
								_9xcajunkush:{type:"checkbox",label:"9x Cajun Kush (4x Cajun Kush)"},
								_gatormardigras:{type:"checkbox",label:"Gator Mardi Gras (9x Cajun Kush)"},
							}},
							seedsBlock18:{type:'optionblock',label:"Head Shrinker:",kids:{
								_20xheadshrinker:{type:"checkbox",label:"20x Head Shrinker (9x Head Shrinker)"},
								_4xheadshrinker:{type:"checkbox",label:"4x Head Shrinker (Head Shrinker)"},
								_9xheadshrinker:{type:"checkbox",label:"9x Head Shrinker (4x Head Shrinker)"},
								_voodoodolldick:{type:"checkbox",label:"Voodoo Doll Dick (9x Head Shrinker)"},
								_50xheadshrinker:{type:"checkbox",label:"50x Head Shrinker (20x Head Shrinker)",newitem:2},
							}},
							seedsBlock19:{type:'optionblock',label:"Chronic Charms:",kids:{
								_20xchroniccharms:{type:"checkbox",label:"20x Chronic Charms (9x Chronic Charms)"},
								_4xchroniccharms:{type:"checkbox",label:"4x Chronic Charms (Chronic Charms)"},
								_9xchroniccharms:{type:"checkbox",label:"9x Chronic Charms (4x Chronic Charms)"},
							}},
							seedsBlock20:{type:'optionblock',label:"Whiterabbit:",kids:{
								_rabbithole:{type:"checkbox",label:"Rabbit Hole (20x Whiterabbit)"},
								_20xwhiterabbit:{type:"checkbox",label:"20x Whiterabbit (9x Whiterabbit)"},
								_4xwhiterabbit:{type:"checkbox",label:"4x Whiterabbit (Whiterabbit)"},
								_9xwhiterabbit:{type:"checkbox",label:"9x Whiterabbit (4x Whiterabbit)"},
								_easterbasket:{type:"checkbox",label:"Easter Basket (9x Whiterabbit)"},
							}},
							seedsBlock21:{type:'optionblock',label:"Pineapple Express:",kids:{
								_20xpineappleexpress:{type:"checkbox",label:"20x Pineapple Express (9x Pineapple Express)"},
								_4xpineappleexpress:{type:"checkbox",label:"4x Pineapple Express (Pineapple Express)"},
								_9xpineappleexpress:{type:"checkbox",label:"9x Pineapple Express (4x Pineapple Express)"},
								_buzzedpineapplebeaver:{type:"checkbox",label:"Buzzed Pineapple Beaver (4x Pineapple Express)"},
								_50xpineappleexpress:{type:"checkbox",label:"50x Pineapple Express (20x Pineapple Express)",newitem:1},
							}},
							seedsBlock22:{type:'optionblock',label:"Wookie Weed:",kids:{
								_sasquatch:{type:"checkbox",label:"Sasquatch (4x Wookie Weed)"},
								_20xwookieweed:{type:"checkbox",label:"20x Wookie Weed (9x Wookie Weed)"},
								_4xwookieweed:{type:"checkbox",label:"4x Wookie Weed (Wookie Weed)"},
								_9xwookieweed:{type:"checkbox",label:"9x Wookie Weed (4x Wookie Weed)"},
								_100xwookieweed:{type:"checkbox",label:"100x Wookie Weed (20x Wookie Weed)"},
								_droidr2:{type:"checkbox",label:"Droid R2 (4x Wookie Weed)"},
								_sfmecommona:{type:"checkbox",label:"SFME CommonA (Wookie Weed)"},
							}},
							seedsBlock23:{type:'optionblock',label:"Bc Bud:",kids:{
								_100xbcbud:{type:"checkbox",label:"100x Bc Bud (20x Bc Bud)"},
								_20xbcbud:{type:"checkbox",label:"20x Bc Bud (9x Bc Bud)"},
								_4xbcbud:{type:"checkbox",label:"4x Bc Bud (Bc Bud)"},
								_9xbcbud:{type:"checkbox",label:"9x Bc Bud (4x Bc Bud)"},
							}},
							seedsBlock24:{type:'optionblock',label:"Greasy Ganja:",kids:{
								_20xgreasyganja:{type:"checkbox",label:"20x Greasy Ganja (9x Greasy Ganja)"},
								_4xgreasyganja:{type:"checkbox",label:"4x Greasy Ganja (Greasy Ganja)"},
								_9xgreasyganja:{type:"checkbox",label:"9x Greasy Ganja (4x Greasy Ganja)"},
								_classictruckblue:{type:"checkbox",label:"Classic Truck Blue (Greasy Ganja)"},
							}},
							seedsBlock25:{type:'optionblock',label:"Green Dragon:",kids:{
								_3xgreendragon:{type:"checkbox",label:"3x Green Dragon (Green Dragon)"},
								_dragongreen:{type:"checkbox",label:"Dragon Green (3x Green Dragon)"},
								_dragonegg:{type:"checkbox",label:"Dragon Egg (Green Dragon)"},
								_knifethrone:{type:"checkbox",label:"Knife Throne (Green Dragon)"},
								_babydragongreen:{type:"checkbox",label:"Baby Dragon Green (Green Dragon)"},
							}},
							seedsBlock26:{type:'optionblock',label:"Psych Sensi:",kids:{
								_psychchick3d:{type:"checkbox",label:"Psych Chick 3d (4x Psych Sensi)"},
								_psychchicktiedye:{type:"checkbox",label:"Psych Chick Tiedye (Psych Sensi)"},
								_20xpsychsensi:{type:"checkbox",label:"20x Psych Sensi (9x Psych Sensi)"},
								_4xpsychsensi:{type:"checkbox",label:"4x Psych Sensi (Psych Sensi)"},
								_9xpsychsensi:{type:"checkbox",label:"9x Psych Sensi (4x Psych Sensi)"},
								_bigeyehypno:{type:"checkbox",label:"Big Eye Hypno (9x Psych Sensi)"},
								_superdelic:{type:"checkbox",label:"Superdelic (9x Psych Sensi)"},
							}},
							seedsBlock27:{type:'optionblock',label:"Ghost Weed:",kids:{
								_lostsheepcatghost:{type:"checkbox",label:"Lostsheep Cat Ghost (Ghost Weed)",newitem:2},
								_skunkghost:{type:"checkbox",label:"Skunk Ghost (Ghost Weed)",newitem:2},
								_20xghostweed:{type:"checkbox",label:"20x Ghost Weed (9x Ghost Weed)"},
								_4xghostweed:{type:"checkbox",label:"4x Ghost Weed (Ghost Weed)"},
								_9xghostweed:{type:"checkbox",label:"9x Ghost Weed (4x Ghost Weed)"},
								_50xghostweed:{type:"checkbox",label:"50x Ghost Weed (20x Ghost Weed)",newitem:2},
							}},
							seedsBlock28:{type:'optionblock',label:"Easy Rider:",kids:{
								_50xeasyrider:{type:"checkbox",label:"50x Easy Rider (3x Easy Rider)",newitem:2},
							}},
							seedsBlock29:{type:'optionblock',label:"Banana Kush:",kids:{
								_20xbananakush:{type:"checkbox",label:"20x Banana Kush (9x Banana Kush)",newitem:1},
								_4xbananakush:{type:"checkbox",label:"4x Banana Kush (Banana Kush)",newitem:1},
								_50xbananakush:{type:"checkbox",label:"50x Banana Kush (9x Banana Kush)",newitem:1},
								_9xbananakush:{type:"checkbox",label:"9x Banana Kush (4x Banana Kush)",newitem:1},
							}},
							seedsBlock30:{type:'optionblock',label:"Holly Berry:",kids:{
								_20xhollyberry:{type:"checkbox",label:"20x Holly Berry (9x Holly Berry)",newitem:1},
								_20xsantaplanta:{type:"checkbox",label:"20x Santa Planta (20x Holly Berry)",newitem:1},
								_4xhollyberry:{type:"checkbox",label:"4x Holly Berry (Holly Berry)",newitem:1},
								_9xhollyberry:{type:"checkbox",label:"9x Holly Berry (4x Holly Berry)",newitem:1},
								_9xsantaplanta:{type:"checkbox",label:"9x Santa Planta (20x Holly Berry)",newitem:1},
							}},
							seedsBlock31:{type:'optionblock',label:"Santa Planta:",kids:{
								_4xsantaplanta:{type:"checkbox",label:"4x Santa Planta (9x Santa Planta)",newitem:1},
							}},
							seedsBlock32:{type:'optionblock',label:"Shishkaberry:",kids:{
								_20xshishkaberry:{type:"checkbox",label:"20x Shishkaberry (9x Shishkaberry)",newitem:1},
								_4xshishkaberry:{type:"checkbox",label:"4x Shishkaberry (Shishkaberry)",newitem:1},
								_50xshishkaberry:{type:"checkbox",label:"50x Shishkaberry (20x Shishkaberry)",newitem:1},
								_9xshishkaberry:{type:"checkbox",label:"9x Shishkaberry (4x Shishkaberry)",newitem:1},
								_9xshishkalightning:{type:"checkbox",label:"9x Shishka Lightning (4x Shishkaberry)",newitem:1},
								_20xshishkalightning:{type:"checkbox",label:"20x Shishka Lightning (9x Shishkaberry)",newitem:1},
							}},
							seedsBlock33:{type:'optionblock',label:"Pink Rabbit:",kids:{
								_4xpinkrabbit:{type:"checkbox",label:"4x Pink Rabbit (Pink Rabbit)",newitem:1},
								_9xpinkrabbit:{type:"checkbox",label:"9x Pink Rabbit (4x Pink Rabbit)",newitem:1},
								_20xpinkrabbit:{type:"checkbox",label:"20x Pink Rabbit (9x Pink Rabbit)",newitem:1},
								_50xpinkrabbit:{type:"checkbox",label:"50x Pink Rabbit (9x Pink Rabbit)",newitem:1},
								_20xpinklightning:{type:"checkbox",label:"20x Pink Lightning (9x Pink Rabbit)",newitem:1},
								_9xpinklightning:{type:"checkbox",label:"9x Pink Lightning (4x Pink Rabbit)",newitem:1},
							}},
							seedsBlock34:{type:'optionblock',label:"Robobud:",kids:{
								_4xrobobud:{type:"checkbox",label:"4x Robobud (Robobud)",newitem:1},
								_9xrobobud:{type:"checkbox",label:"9x Robobud (4x Robobud)",newitem:1},
								_20xrobobud:{type:"checkbox",label:"20x Robobud (9x Robobud)",newitem:1},
								
							}},
						}},
					}},
					SSpotheads:{type:"separator",label:"Pot Heads",kids:{
						_archivedfriend:{type:"checkbox",label:"ArchivedFriend"},
						_rallygirl:{type:"checkbox",label:"Rally Girl"},
						_potheadscircle:{type:"checkbox",label:"Pot Heads Circle"},
						_teleporter:{type:"checkbox",label:"Teleporter (Pot Heads)"},
						potheadBlock0:{type:'optionblock',label:"Puffle:",kids:{
							_puffleblack:{type:"checkbox",label:"Puffle Black (Puffle Black)"},
							_pufflecalico:{type:"checkbox",label:"Puffle Calico (Puffle Calico)"},
							_pufflegrey:{type:"checkbox",label:"Puffle Grey (Puffle Grey)"},
							_puffleorange:{type:"checkbox",label:"Puffle Orange (Puffle Orange)"},
							_pufflewhite:{type:"checkbox",label:"Puffle White (Puffle White)"},
						}},
						potheadBlock1:{type:'optionblock',label:"Group:",kids:{
							_potheadslrg:{type:"checkbox",label:"Pot Heads Lrg"},
							_potheadsmed:{type:"checkbox",label:"Pot Heads Med"},
							_potheadssml:{type:"checkbox",label:"Pot Heads Sml"},
						}},
						potheadBlock2:{type:'optionblock',label:"Island:",kids:{
							_potheadsisland:{type:"checkbox",label:"Pot Heads Island"},
							_potheadsislandlrg:{type:"checkbox",label:"Pot Heads Island Lrg"},
							_potheadsislandsml:{type:"checkbox",label:"Pot Heads Island Sml"},
						}},
						potheadBlock3:{type:'optionblock',label:"Trailer:",kids:{
							_potheadstrailersml:{type:"checkbox",label:"Pot Heads Trailer Sml"},
							_potheadstrailer:{type:"checkbox",label:"Pot Heads Trailer"},
							_potheadstrailerlrg:{type:"checkbox",label:"Pot Heads Trailer Lrg"},
						}},
						potheadBlock4:{type:'optionblock',label:"Conspiracy:",kids:{
							_potheadsconspiracy:{type:"checkbox",label:"Pot Heads Conspiracy"},
							_potheadsconspiracylrg:{type:"checkbox",label:"Pot Heads Conspiracy Lrg"},
							_potheadsconspiracysml:{type:"checkbox",label:"Pot Heads Conspiracy Sml"},
						}},
						potheadBlock5:{type:'optionblock',label:"Rock Star:",kids:{
							_potheadsrockstar:{type:"checkbox",label:"Pot Heads Rock Star"},
							_potheadsrockstarlrg:{type:"checkbox",label:"Pot Heads Rock Star Lrg"},
							_potheadsrockstarsml:{type:"checkbox",label:"Pot Heads Rock Star Sml"},
						}},
						potheadBlock6:{type:'optionblock',label:"Halloween:",kids:{
							_potheadshalloween:{type:"checkbox",label:"Pot Heads Halloween"},
							_potheadshalloweenlrg:{type:"checkbox",label:"Pot Heads Halloween Lrg"},
							_potheadshalloweensml:{type:"checkbox",label:"Pot Heads Halloween Sml"},
						}},
						potheadBlock7:{type:'optionblock',label:"Occupy:",kids:{
							_potheadsoccupy:{type:"checkbox",label:"Pot Heads Occupy"},
							_potheadsoccupylrg:{type:"checkbox",label:"Pot Heads Occupy Lrg"},
							_potheadsoccupysml:{type:"checkbox",label:"Pot Heads Occupy Sml"},
						}},
						potheadBlock8:{type:'optionblock',label:"Fantasy:",kids:{
							_potheadsfantasy:{type:"checkbox",label:"Pot Heads Fantasy"},
							_potheadsfantasylrg:{type:"checkbox",label:"Pot Heads Fantasy Lrg"},
							_potheadsfantasysml:{type:"checkbox",label:"Pot Heads Fantasy Sml"},
						}},
						potheadBlock9:{type:'optionblock',label:"Christmas:",kids:{
							_potheadsxmas:{type:"checkbox",label:"Pot Heads Xmas"},
							_potheadsxmaslrg:{type:"checkbox",label:"Pot Heads Xmas Lrg"},
							_potheadsxmassml:{type:"checkbox",label:"Pot Heads Xmas Sml"},
						}},
						potheadBlock10:{type:'optionblock',label:"Mardi Gras:",kids:{
							_potheadsmardigras:{type:"checkbox",label:"Pot Heads Mardi Gras"},
							_potheadsmardigraslrg:{type:"checkbox",label:"Pot Heads Mardi Gras Lrg"},
							_potheadsmardigrassml:{type:"checkbox",label:"Pot Heads Mardi Gras Sml"},
						}},
						potheadBlock11:{type:'optionblock',label:"Voodoo:",kids:{
							_potheadsvoodoo:{type:"checkbox",label:"Pot Heads Voodoo"},
							_potheadsvoodoolrg:{type:"checkbox",label:"Pot Heads Voodoo Lrg"},
							_potheadsvoodoosml:{type:"checkbox",label:"Pot Heads Voodoo Sml"},
						}},
						potheadBlock12:{type:'optionblock',label:"Scifi:",kids:{
							_potheadsscifi:{type:"checkbox",label:"Pot Heads Scifi"},
							_potheadsscifilrg:{type:"checkbox",label:"Pot Heads Scifi Lrg"},
							_potheadsscifisml:{type:"checkbox",label:"Pot Heads Scifi Sml"},
						}},
						potheadBlock13:{type:'optionblock',label:"Wonder:",kids:{
							_potheadswonder:{type:"checkbox",label:"Pot Heads Wonder"},
							_potheadswonderlrg:{type:"checkbox",label:"Pot Heads Wonder Lrg"},
							_potheadswondersml:{type:"checkbox",label:"Pot Heads Wonder Sml"},
						}},
						potheadBlock14:{type:'optionblock',label:"Zombie:",kids:{
							_zombiecrowd:{type:"checkbox",label:"Zombie Crowd",newitem:3},
							_zombiehorde:{type:"checkbox",label:"Zombie Horde (Pot Heads)",newitem:3},
						}},
						potheadBlock15:{type:'optionblock',label:"Ghost:",kids:{
							_potheadsghost:{type:"checkbox",label:"Pot Heads Ghost (Pot Heads)",newitem:2},
							_potheadsghostlrg:{type:"checkbox",label:"Pot Heads Ghost Lrg (Pot Heads)",newitem:2},
							_potheadsghostsml:{type:"checkbox",label:"Pot Heads Ghost Sml (Pot Heads)",newitem:2},
						}},
					}},
					SSadopt:{type:"separator",label:"Adoptables",kids:{
						adoptBlock0:{type:'optionblock',label:"Stuff:",kids:{
							_driftwood:{type:"checkbox",label:"Driftwood"},
							_shroomsblue:{type:"checkbox",label:"Shrooms Blue (Four Twenty Blues)"},
							_shroomsblueslost:{type:"checkbox",label:"ShroomsBluesLost (Shrooms Blue)"},
							_lostleprechaun:{type:"checkbox",label:"Lost Leprechaun (Leprechaun Surprise)"},
							_puffyleprechaun:{type:"checkbox",label:"Puffy Leprechaun (Leprechaun Pipe)"},
						}},
						adoptBlock1:{type:'optionblock',label:"New Stuff:",kids:{
							_dopeydodo:{type:"checkbox",label:"Dopey Dodo"},
							_rippedraccoon:{type:"checkbox",label:"Ripped Raccoon"},
							_rippedzombieraccoon:{type:"checkbox",label:"Ripped Zombie Raccoon",newitem:3},
						}},
						adoptBlock2:{type:'optionblock',label:"Cats:",kids:{
							_lostsheepcat:{type:"checkbox",label:"Cat"},
							_lostsheepcatsanta:{type:"checkbox",label:"Santa Cat"},
							_lostsheepcatreindeer:{type:"checkbox",label:"Reindeer Cat"},
							_catnewyears:{type:"checkbox",label:"New Years Cat"},
							_lostsheepcatbondage:{type:"checkbox",label:"Bondage Cat"},
							_lostsheepcatmardigras:{type:"checkbox",label:"Mardi Gras Cat"},
							_lostsheepcatvoodoo:{type:"checkbox",label:"Voodoo Cat"},
							_lostsheepcat420:{type:"checkbox",label:"420 Cat"},
							_lostsheepcatscifi:{type:"checkbox",label:"Scifi Cat"},
						}},
						adoptBlock3:{type:'optionblock',label:"Dozy Bunnys:",kids:{
							_dozybunny:{type:"checkbox",label:"Dozy Bunny"},
							_whiterabbit:{type:"checkbox",label:"White Rabbit"},
							_blackrabbit:{type:"checkbox",label:"Black Rabbit"},

							_darkchocobunny:{type:"checkbox",label:"Dark Chocobunny"},
							_milkchocobunny:{type:"checkbox",label:"Milk Chocobunny"},

							_oogybunny:{type:"checkbox",label:"Oogy Bunny"},
							_pinkbunny:{type:"checkbox",label:"Pink Bunny"},
							_sadbunny:{type:"checkbox",label:"Sad Bunny"},
							_dozyzombie:{type:"checkbox",label:"Dozy Zombie"},
							_dozydeath:{type:"checkbox",label:"Dozy Death"},
							_dozyghost:{type:"checkbox",label:"Dozy Ghost"},
							_dozypumpkin:{type:"checkbox",label:"Dozy Pumpkin"},
							_dozydevil:{type:"checkbox",label:"Dozy Devil"},
							_dozypilgrim:{type:"checkbox",label:"Dozy Pilgrim"},
							_dozyreindeer:{type:"checkbox",label:"Dozy Reindeer"},
							_dozyconspiracybunny:{type:"checkbox",label:"Dozy Conspiracy Bunny"},
							_dozypartybunny:{type:"checkbox",label:"Dozy Party Bunny"},
							_dozywizardbunny:{type:"checkbox",label:"Dozy Wizard Bunny"},
							_dozysantabunny:{type:"checkbox",label:"Dozy Santa Bunny"},
							_decordozynewyearsbunny:{type:"checkbox",label:"Dozy New Years Bunny"},
							_dozybondagebunny:{type:"checkbox",label:"Dozy Bondage Bunny"},
							_dozymardigrasbunny:{type:"checkbox",label:"Dozy Mardi Gras Bunny"},
							_dozyvoodoobunny:{type:"checkbox",label:"Dozy Voodoo Bunny"},
							_dozytrailerbunny:{type:"checkbox",label:"Dozy Trailer Bunny"},
							_dozyscifibunny:{type:"checkbox",label:"Dozy Scifi Bunny"},
						}},
						adoptBlock4:{type:'optionblock',label:"Dopey Ducks:",kids:{
							_dopeyduck:{type:"checkbox",label:"Dopey Duck"},
							_dopeyduckgrey:{type:"checkbox",label:"Dopey Duck Grey"},
							_dopeyfourtwentyduck:{type:"checkbox",label:"Dopey Four Twenty Duck"},
							_dopeyrastaduck:{type:"checkbox",label:"Dopey Rasta Duck"},
							_dopeytrailerduck:{type:"checkbox",label:"Dopey Trailer Duck"},
							_dopeyconspiracyduck:{type:"checkbox",label:"Dopey Conspiracy Duck"},
							_dopeypartyduck:{type:"checkbox",label:"Dopey Party Duck"},
							_dopeydeathduck:{type:"checkbox",label:"Dopey Death Duck"},
							_dopeywizardduck:{type:"checkbox",label:"Dopey Wizard Duck"},
							_dopeysantaduck:{type:"checkbox",label:"Dopey Santa Duck"},
							_dopeyreindeerduck:{type:"checkbox",label:"Dopey Reindeer Duck"},
							_dopeynewyearsduck:{type:"checkbox",label:"Dopey New Years Duck"},
							_dopeybondageduck:{type:"checkbox",label:"Dopey Bondage Duck"},
							_dopeymardigrasduck:{type:"checkbox",label:"Dopey Mardi Gras Duck"},
							_dopeyvoodooduck:{type:"checkbox",label:"Dopey Voodoo Duck"},
							_dopeyduckwhite:{type:"checkbox",label:"Dopey Duck White"},
							_dopeyscifiduck:{type:"checkbox",label:"Dopey Scifi Duck"},
						}},
						adoptBlock5:{type:'optionblock',label:"Paranoid Bears:",kids:{
							_parabear:{type:"checkbox",label:"Paranoid Bear"},
							_paranoidgirlbear:{type:"checkbox",label:"Paranoid Girl Bear"},
							_paranoidpilgrim:{type:"checkbox",label:"Paranoid Pilgrim"},
							_paranoidreindeer:{type:"checkbox",label:"Paranoid Reindeer"},
							_paranoidrastabear:{type:"checkbox",label:"Paranoid Rasta Bear"},
							_paranoidgirltrailerbear:{type:"checkbox",label:"Paranoid Girl Trailer Bear"},
							_paranoidtrailerbear:{type:"checkbox",label:"Paranoid Trailer Bear"},
							_paranoidconspiracybear:{type:"checkbox",label:"Paranoid Conspiracy Bear"},
							_paranoidpartybear:{type:"checkbox",label:"Paranoid Party Bear"},
							_paranoiddeathbear:{type:"checkbox",label:"Paranoid Death Bear"},
							_paranoiddevilbear:{type:"checkbox",label:"Paranoid Devil Bear"},
							_paranoidpumpkinbear:{type:"checkbox",label:"Paranoid Pumpkin Bear"},
							_paranoidwizardbear:{type:"checkbox",label:"Paranoid Wizard Bear"},
							_paranoidsantabear:{type:"checkbox",label:"Paranoid Santa Bear"},
							_paranoidnewyearsbear:{type:"checkbox",label:"Paranoid New Years Bear"},
							_paranoidmardigrasbear:{type:"checkbox",label:"Paranoid Mardi Gras Bear"},
							_paranoidzombiebear:{type:"checkbox",label:"Paranoid Zombie Bear"},
							_paranoidbunnybearlostsheep:{type:"checkbox",label:"Paranoid Bunny Bear"},
							_paranoidfourtwentybear:{type:"checkbox",label:"Paranoid Four Twenty Bear"},
							_paranoidscifibear:{type:"checkbox",label:"Paranoid Scifi Bear"},
							_paranoidgdbluebear:{type:"checkbox",label:"Paranoid Gdblue Bear"},
							_paranoidgdgreenbear:{type:"checkbox",label:"Paranoid Gdgreen Bear"},
							_paranoidgdorangebear:{type:"checkbox",label:"Paranoid Gdorange Bear"},
							_paranoidgdpinkbear:{type:"checkbox",label:"Paranoid Gdpink Bear"},
							_paranoidgdyellowbear:{type:"checkbox",label:"Paranoid Gdyellow Bear"},
						}},
						adoptBlock6:{type:'optionblock',label:"Buzzed Beavers:",kids:{
							_buzzedbeaver:{type:"checkbox",label:"Buzzed Beaver"},
							_buzzedpilgrim:{type:"checkbox",label:"Buzzed Pilgrim"},
							_buzzedreindeer:{type:"checkbox",label:"Buzzed Reindeer"},
							_buzzedconspiracybeaver:{type:"checkbox",label:"Buzzed Conspiracy Beaver"},
							_buzzedpartybeaver:{type:"checkbox",label:"Buzzed Party Beaver"},
							_buzzedrastabeaver:{type:"checkbox",label:"Buzzed Rasta Beaver"},
							_buzzeddeathbeaver:{type:"checkbox",label:"Buzzed Death Beaver"},
							_buzzedwizardbeaver:{type:"checkbox",label:"Buzzed Wizard Beaver"},
							_buzzedsantabeaver:{type:"checkbox",label:"Buzzed Santa Beaver"},
							_buzzednewyearsbeaver:{type:"checkbox",label:"Buzzed New Years Beaver"},
							_buzzedbondagebeaver:{type:"checkbox",label:"Buzzed Bondage Beaver"},
							_buzzedmardigrasbeaver:{type:"checkbox",label:"Buzzed Mardi Gras Beaver"},
							_buzzedvoodoobeaver:{type:"checkbox",label:"Buzzed Voodoo Beaver"},
							_buzzedscifibeaver:{type:"checkbox",label:"Buzzed Scifi Beaver"},
						}},
						adoptBlock7:{type:'optionblock',label:"Phrogs:",kids:{
							_bigphrog:{type:"checkbox",label:"Big Phrog"},
							_frogblue:{type:"checkbox",label:"Frog Blue"},
							_frogred:{type:"checkbox",label:"Frog Red"},
							_frogprince:{type:"checkbox",label:"Frog Prince"},
							_frogvoodoo:{type:"checkbox",label:"Frog Voodoo"},
						}},
						adoptBlock8:{type:'optionblock',label:"Love Pigs:",kids:{
							_bubblylovepig:{type:"checkbox",label:"Bubbly Love Pig"},
							_chocolovepig:{type:"checkbox",label:"Choco Love Pig"},
							_lovepig:{type:"checkbox",label:"Love Pig"},
							_rosylovepig:{type:"checkbox",label:"Rosy Love Pig"},
							_newyearspiglostsheep:{type:"checkbox",label:"New Years Pig"},//adoptable
						}},
						adoptBlock9:{type:'optionblock',label:"Sheep:",kids:{
							_inflatablesheep:{type:"checkbox",label:"Inflatable Sheep"},
							_blowupsheep:{type:"checkbox",label:"Blow Up Sheep"},
							_inflatedsheepbondage:{type:"checkbox",label:"Inflated Bondage Sheep"},
						}},
						adoptBlock10:{type:'optionblock',label:"Baked:",kids:{
							_bakedturkey:{type:"checkbox",label:"Baked Turkey"},
							_bakedreindeer:{type:"checkbox",label:"Baked Reindeer"},
						}},
					}},
					SScproducts:{type:"separator",label:"Contraption Products",kids:{
						Contraptions0:{type:'optionblock',label:"Contraptions:",kids:{
							_aleprechaun:{type:"checkbox",label:"Ale Prechaun (Leprechaun Ale)"},
							_cocoatree:{type:"checkbox",label:"Cocoa Tree (Cocoa Pod)"},
							_cocoatreelrg:{type:"checkbox",label:"Cocoa Tree Lrg (Cocoa Pod)"},
							_cocoatreesml:{type:"checkbox",label:"Cocoa Tree Sml (Cocoa Pod)"},
							_hashpressblonde:{type:"checkbox",label:"Hash Press Blonde (Hash Blonde)"},
							_oilpress:{type:"checkbox",label:"Oil Press (Hemp Oil)"},
							_whiskeystill:{type:"checkbox",label:"Whiskey Still (Whiskey)"},
							_brewery:{type:"checkbox",label:"Brewery (Hemp Ale)"},
							_popcornmaker:{type:"checkbox",label:"Popcorn Maker (Potcorn)"},
							_nachomachine:{type:"checkbox",label:"Nacho Machine (Nachos)"},
							_caramelcornmaker:{type:"checkbox",label:"Caramel Corn Maker (Caramel Corn)"},
							_caramelcornmakerchristmas:{type:"checkbox",label:"Caramel Corn Maker Christmas (Caramel Corn)"},
							_winemaker:{type:"checkbox",label:"Wine Maker (Wine)"},
							_lovemachine:{type:"checkbox",label:"Love Machine (Sweet Love)"},
							_lovein:{type:"checkbox",label:"Love In (Sweet Love)"},
							_greenbeerbrewery:{type:"checkbox",label:"Green Beer Brewery (Hemp Ale)"},
							_leprechaunale:{type:"checkbox",label:"Leprechaun Ale (Hemp Ale)"},
							_leprechaunpipe:{type:"checkbox",label:"Leprechaun Pipe (Acapulco Gold)"},
							_bubblylovepigproduct:{type:"checkbox",label:"Bubbly Love Pig (Champagne Product)"},
							_chocolovepigproduct:{type:"checkbox",label:"Choco Love Pig (Choclate Product)"},
							_lovepigproduct:{type:"checkbox",label:"Love Pig (Love Oil)"},
							_rosylovepigproduct:{type:"checkbox",label:"Rosy Love Pig (Roses)"},
							_newyearspig:{type:"checkbox",label:"New Years Pig (Champagne Product)"},//product
							_browniemachine:{type:"checkbox",label:"Brownie Machine (Brownies)"},
							_browniemachinepremium:{type:"checkbox",label:"Brownie Machine Premium (Brownies)"},
							_browniemachinepremium2:{type:"checkbox",label:"Brownie Machine Premium 2 (Brownies)"},
							_paranoidbunnybear:{type:"checkbox",label:"Paranoid Bunny Bear (Chocolate Eggs)"},
							_headlesschicken:{type:"checkbox",label:"Headless Chicken (Chicken Blood)"},
							_voodoograve:{type:"checkbox",label:"Voodoo Grave (Voodoo Bones)"},
							_dicksdate:{type:"checkbox",label:"Dicks Date (Sweet Love)"},
							_alice:{type:"checkbox",label:"Alice (Potion Orange)"},
							_pufflermachine:{type:"checkbox",label:"Puffler Machine (Pufflers)"},
							_hydrocampera:{type:"checkbox",label:"Hydro Camper A (Grow Light)"},
							_hydrocamperb:{type:"checkbox",label:"Hydro Camper B (Generator)"},
							_hydrocamperc:{type:"checkbox",label:"Hydro Camper C (Spark Plugs)"},
							_blackknight:{type:"checkbox",label:"Black Knight (Hash Seed Black)"},
							_msdemondick:{type:"checkbox",label:"Ms Demon Dick (Ectoplasm)",newitem:2},
							_brewerysuper:{type:"checkbox",label:"Brewery Super (Hemp Ale)",newitem:1},
							_elfcage:{type:"checkbox",label:"Elf Cage (Elves)",newitem:1},
							_headlesschickenchocolate:{type:"checkbox",label:"Headless Chicken Chocolate (Chocolate)",newitem:1},
						}},
					}},
				}},
			}
		};

		attString=JSON.stringify(attachment);
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisAppID,'data-ft':attString}));
		attachment=null;attString=null;
		window.setTimeout(function(){click(door);},1000);
	};

	//main script function
	function run(){
		var href = window.location.href;
		var text = document.documentElement.textContent;
		text = text.safeContent(text);
		var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/");

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

		if (href.startsWith('http://www.facebook.com/pages/FB-Wall-Manager/')) {
			dock();
			return;
		}
		else if (href.startsWith(thisLoc+'/gifts.php')) {
			// Catch and stop the script on the gift page, it contains all the test strings
			// used in this script and can return a false positive, or a "Something is wrong with the link"
			// responce
			return false; 
		}
		else if (text.match(/invalid|wrong/gi)) {
			// Generic "This is an invalid link, Please Contact the Devs" link...
			// Something is wrong with the link
			sendMessage('-5');
			return;
		}
		else if (href.startsWith(thisLoc+'/play.php')) {
			if (text.match(/"errorCode":10/i)) {
				window.location.replace(href);
			}
			else if (text.find('Sorry! This page cannot be found') || (text == '')) {
				sendMessage('-5');
				text=null;return;
			}
			else if (text.match(/(You've reached the 24 hour claim limit.)/i)) {
			// Needs a way to turn off this option...
				sendMessage('-3');
				text=null;return;
			}
			else if (text.find('Someone else got here first') || text.find('Bummer Dude')) {
				sendMessage('-2');
				text=null;return;
			}
			else if (text.match(/((you|you have) already (claimed|got) (this|this reward))/i)) {
				sendMessage('-6');
				text=null;return;
			}
			else if (text.match(/(you got)|(you received)|(in your gift box)|(right on)|(good job)/i)
					|| text.match(/(you can claim up to)|(thanks for adopting)/i)) {
				sendMessage('1');
				text=null;return;
			}
		}
		else if (href.startsWith(thisLoc+'/claimFeedRewards.php')) {
			if (text.find('You have received the following rewards in your gift box')) {
				sendMessage('1');
				return;
			}
			else if (text.find('You have already claimed this reward')) {
				sendMessage('-6');
				return;
			}
			else if (text.find('daily limit')) {
				sendMessage('-3');
				return;
			}
		}
		else if (href.startsWith(thisLoc+'/blazeClaim.php')) {
			if (text.find('You now have 1 Blaze Runner in your gift box')) {
				sendMessage('1');
				return;
			}
			else if (text.find('You have already claimed this')) {
				sendMessage('-6');
				return;
			}
		}
		else if (href.startsWith(thisLoc+'/feedRewards.php')) {
			/*if (text.find('You have sent a')) {
				sendMessage('1');
				return;
			}
			else*/ if (text.find('this reward is only available for the friend it was posted to.')) {
				sendMessage('-6');
				return;
			} else {
				sendMessage('1');
				return;
			}
		}
		else if (href.startsWith(thisLoc+'/giftMooch.php')) {
			if (text.find('You have sent a')) {
				sendMessage('1');
				return;
			}
			else if (text.find('You have already sent this player a gift today!')) {
				sendMessage('-6');
				return;
			}
		}//https://apps.facebook.com/mypotfarm/maintenance.php
		else if (href.startsWith(thisLoc+'/maintenance.php')) {
			sendMessage('-7');
			return;
		}
	}
	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end