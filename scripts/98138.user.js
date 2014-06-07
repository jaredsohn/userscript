// ==UserScript==
// @name           Wall Manager Sidekick (TI)
// @description    Assists Wall Manager with Treasure Island posts
// @include        /^https?:\/\/(.*)\.treasure\.zynga\.com\//
// @include	   /^http:\/\/www\.facebook\.(com)\/pages\/FB-Wall-Manager\//
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.24.1
// @copyright      Charlie Ewing & Joe Simmons
// ==/UserScript== 

(function() { 

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.24";

	Array.prototype.inArray = function(value) {
		for(var i=this.length-1; i>=0; i--) {
			if(this[i]==value) return true;
		}
		return false;
	};

	Array.prototype.inArrayWhere = function(value) {
		for(var i=0,l=this.length; i<l; i++) {
			if(this[i]==value) return i;
		}
		return false;
	};

	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	String.prototype.contains = function(s) {
		return (this.indexOf(s) != -1);
	};

	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	String.prototype.getUrlParam = function(s) {
		var params=this.split("?");
		if (params.length>0) return params[1].split("#")[0].split(s+"=")[0].split("&")[0];			
		return "";
	};

	String.prototype.getHashParam = function(s,param) {
		var params = this.split("#");
		if (params.length>0) return params[1].split(s+"=")[0].split("&")[0];
		return "";
	};


	// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
	// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
	// See script page for syntax examples: http://userscripts.org/scripts/show/51532
	function $g(que, O) {
		if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
		var obj=O||({del:false,type:6,node:document}), r, t,
			idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
		if(idclass_re.test(que)) {
			var s=que.split(' '), r=new Array(), c;
			for(var n=0; n<s.length; n++) {
				switch(s[n].substring(0,1)) {
					case '#': r.push(document.getElementById(s[n].substring(1))); break;
					case '.': c=document.getElementsByClassName(s[n].substring(1));
		  				if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
				}
			}
			if(r.length==1) r=r[0];
		} else if(xp_re.test(que)) {
			r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
			if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
		}
		if(r && obj['del']===true) {
			if(r.nodeType==1) r.parentNode.removeChild(r);
			else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
			else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
		} return r;
	};

	
	function selectNodes(element,xPath) {
		return $g(xPath, {type:7, node:element});
	};

	function selectSingleNode(element,xPath) {
		var nodes=$g(xPath, {type:7, node:element});
		if (nodes!=null) return nodes.snapshotItem(0);
		return null;
	};


	function fireEvent(element,event){
    		var evt = document.createEvent("HTMLEvents");
    		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    		return !element.dispatchEvent(evt);
	};

	function click(e){
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	function sendMessage(s,hwnd){
		hwnd = (hwnd||window.top);
		try {hwnd.location.hash = s;} 
		catch(e){hwnd.location.href = "http://apps.facebook.com/?#"+s;}
	};

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}


	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app234860566661');
		if (doorMark) return; //already posted to door

		var attachment={
			appID:'234860566661',
			alias:'TI',
			hrefKey:'key',
			name:'TreasureIsle',
			thumbsSource:'assets.treasure.zgncdn.com',
			flags:{httpsTrouble:false},

			accText: {
				xp : "XP", save : "Unknown Animal", coins : "Coins", bonus : "Bonus",
				send : "This", wishlist : "Wish List", none : "Unrecognized",
				energycapsule : "Energy Capsule", firedig : "Fire Dig", fruitturkeyfeast:"Turkey Feast",fruitblackcoffee:"Black Coffee",
				fruitkiwi : "Kiwi", fruitbanana : "Banana", fruitmango : "Mango", fruitcoconut : "Coconut", fruitpineapple : "Pineapple",
				fruitdragonfruit : "Dragonfruit", fruitsushi : "Sushi", fruitmonsterkebab : "Monster Kebab", fruithappycake : "Happy Cake",
				fruit : "Unknown Fruit", 
				baitbasic : "Basic Bait", baitgood : "Good Bait", baitspecial : "Special Bait", baitmagic : "Magic Bait",
				phoenixfeather : "Phoenix Feather", mapfragment : "Map Fragment", goldenticket : "Golden Ticket", monkeywrench : "Monkey Wrench",
				gemred : "Red Gem", gemblue : "Blue Gem", gemorange : "Orange Gem", gempurple : "Purple Gem", gemgreen : "Green Gem",
				gembag : "Bag of Gems", gem : "Unknown Gem", gemyours : "Gem from your own tree",
				peacock : "Peacock", tarantula : "Tarantula", panda : "Panda", sloth : "Sloth", iguana : "Iguana",
				monkey : "Monkey", toucan : "Toucan", parrot : "Parrot", cockatoo : "Cockatoo", dolphin : "Dolphin",
				seal : "Seal", redpanda : "Red Panda", margay : "Margay", panther : "Panther", porcupine : "Porcupine",
				girraffe : "Girraffe", deer : "Deer", unicorn : "Unicorn", elephant : "Elephant", chinchilla : "Chinchilla",
				octopus : "Octopus", blackcat : "Black Cat", turtle : "Turtle", turkey : "Turkey", 
				rsvp : "RSVP!", fruittaffy : "Taffy", oxygen : "Oxygen Bottle",racoontable : "Racoon Table", failwhale:"Fail Whale",
				flamingo : "Flamingo", lemur : "Lemur", jellyfish : "Jellyfish", gull : "Gull", dusky : "Dusky Dolphin",
				fruithors : "Finger Food", bubbly : "Bubbly", present : "Present",
				jdturkey : "JD Turkleton", petmclovin : "McLovin'", streetlamp : "Street Lamp", fruitfruitcake : "Fruitcake",
				buildingmaterials : "Building Material Kit", fruitcandycane : "Candy Cane", bigbarn : "Big Barn",
				sendscarf : "Scarf", sendslush : "Slush", sendpaint : "Paint", sendresin : "Resin", sendplanks : "Planks",
				sendpillar : "Pillar", sendshells : "Shells", senddye : "Dye", sendmarble : "Marble", sendaquavitae : "Aqua Vitae",
				sendnails : "Nails", sendfrosting : "Frosting", sendrock : "Rock", sendectoplasm : "Ectoplasm",
				newyearsboat : "New Year's Boat", fireworks : "Fireworks", partytable : "Party Table", swanboat : "Swan Boat",
				sendrope : "Rope", sendfire : "Fire", sendgold : "Gold", sendseeds : "Seeds", sendcloth : "Cloth", sendoil : "Oil",
				sendice : "Ice", sendgumdrops : "Gum Drops", sendglue : "Glue", sendpackedsnow : "Packed Snow",
				sendglass : "Glass", sendgears : "Gears", sendgingerbread : "Gingerbread", sendmetal : "Metal", sendbolts : "Bolts",
				sendenergypack : "Energy Pack", sendbubbly : "Bubbly", sendpartyfavor : "Party Favor", 
				snowflake : "Snowflake", sendmagictophat : "Magic Top Hat", fruitcarrot : "Carrot", snowdog : "Snow Dog", snowwoman : "Snow Woman",
				snowcloud : "Snow Cloud", redkey : "Red Chest Key", bluekey : "Blue Chest Key", sendmapfrag : "Map Fragment",
				wishgift : "Wishlist Item!", sendpetition : "Petition", boxofchocolate : "Box of Chocolate", 
				rosebush : "Rose Bush", popcorn : "Popcorn", loveboat: "Loveboat", sendgiftbag : "Gift Bag",
				valentine : "Valentine", questitem : "Quest Item", sendquestitem : "Quest Item",
				sendmedallionurn : "Medallion Urn", medallion: "Medallion", parrotpalm : "Parrot Palm",
				clover: "4-Leaf Clover", slithers:"Slithers", cloverpatch:"Clover Patch", greencider:"Green Cider", shamrockballoon:"Shamrock Balloon",
				sendcoconutcream: "Coconut Cream",sendcoconutjuice: "Coconut Juice",sendorangeorchid:"Orange Orchid", sendjunglejuice:"Jungle Juice",
				gemfruit: "Gemfruit", bunbun:"Dr. Bunbun",treelantern:"Tree Lantern",fortuneballoon:"Fortune Balloon",crystalball:"Crystal Ball",
				fortunecookie:"Fortune Cookie",sendmagicbag:"Magic Bag",phoenixegg:"Phoenix Egg",
				surftaco:"Surf Taco",surfwax:"Surf Wax",sendsurfgearbag:"Surf Gear",chillbeachtowel:"Chill Beach Towel",
				brightplume:"Bright Plumeria",sunsetsurfboard:"Sunset Surfboard",miniisland:"Mini Island",surfinturtle:"Surfin' Turtle",
				eggdye:"Egg Dye",chocegg:"Chocolate Egg",pinkmushrooms:"Pink Mushrooms", springgrass:"Spring Grass", 
				springtiki:"Spring Tiki",babychick:"Baby Chick", springgazebo:"Spring Gazebo",
				sendterravitae:"Terra Vitae",sendpurplepoi:"Purple Poi",sendmauimahimahi:"Maui Style Mahi Mahi",
				sendvegskewers:"Vegetable Skewers",sendgrilledpineapple:"Grilled Pineapple",
				resortcolada:"Resort-a-colada",sendresortgiftbasket:"Resort Gift Basket",roomkeys:"Room Keys",
				foldedtowels:"Folded Towels",resortumbrella:"Resort Umbrella",divingplatform:"Diving Platform",turtletable:"Turtle Table",
				ballerinafountain:"Ballerina Fountain",
				sendslimeballoon:"Slime Balloon",
				cretaceoussalad:"Cretaceous Salad",ceratops:"Baby Triceratops",babydactyl:"Baby Pteradactyl",
				babybront:"Baby Brontosaurus",babymammoth:"Baby Mammoth",babysaber:"Baby Saber",
				fossil:"Fossil",sendfossilrock:"Fossil Rock",sendhelp:"Help",
				sendgrease:"Grease",sendpulley:"Pulley",
			},

			tests: [
				{link:"tame the flames",ret:"exclude"},
				{link:"dispatch the pelican",ret:"exclude"},
				{link:"collect the monkeys",ret:"exclude"},
				{link:"lace up the cleats",ret:"exclude"},
				{link:"wield the sword",ret:"exclude"},
				{link:"clean it up",ret:"exclude"},
				{link:"play treasure",ret:"exclude"},
				{link:"go see my gift",ret:"exclude"},
				{link:"go play",ret:"exclude"},
				{link:"send thank you gift",ret:"exclude"},

				{link:"Cretaceous Salad",ret:"cretaceoussalad"},
				{body:"Baby Pteradactyl",ret:"babydactyl"},
				{body:"Baby Triceratops",ret:"babyceratops"},
				{body:"Baby Bronto",ret:"babybront"},
				{body:"Baby Saber",ret:"babysaber"},
				{body:"Baby Mammoth",ret:"babymammoth"},
				{body:"Fossil Rock",ret:"sendfossilrock"},
				{body:"Fossil",ret:"fossil"},

				{link:"gimme, gimme more",ret:"xp"},
				{link:"grab some of that power",ret:"xp"},
				{body:"Here's some XP",ret:"xp"},
				{link:"some love",ret:"xp"},
				{link:"your gems",ret:"gemyours"},

				{link:"hors d",ret:"fruithors"},
				{link:"cheese platter",ret:"fruitcheeseplatter"},
				{link:"turkey feast",ret:"fruitturkeyfeast"},
				{link:"black balloons",ret:"blackballoons"},
				{link:"black coffee",ret:"fruitblackcoffee"},
				{link:"coffee tray",ret:"fruitblackcoffee"},

				{body:"carrot",ret:"carrot"},	 

				{body:"slithers",ret:"slithers"},
				{body:"3-leaf clover",ret:"cloverpatch"},
				{body:"shamrock balloon",ret:"shamrockballoon"},

				{body:"crystal ball",ret:"crystalball"},
				{body:"bunbun",ret:"bunbun"},
				{body:"fortune cookie",ret:"fortunecookie"},
				{body:"tree lantern",ret:"treelantern"},
				{body:"fortune balloon",ret:"fortuneballoon"},

				{link:"Phoenix Egg",ret:"phoenixegg"},

				{body:"mclovin",ret:"petmclovin"},
				{body:"jd turkleton",ret:"jdturkey"},
				{body:"building materials",ret:"buildingmaterials"},
				{body:"street lamp",ret:"streetlamp"},
				{body:"christmas boat",ret:"christmasboat"},
	
				{body:"snow dog",ret:"snowdog"},
				{body:"snow woman",ret:"snowwoman"},
				{body:"snow cloud",ret:"snowcloud"},
				{body:"red chest key",ret:"redkey"},
				{body:"blue chest key",ret:"bluekey"},

				{body:"box of chocolate",ret:"boxofchocolate"},
				{body:"popcorn",ret:"popcorn"},
				{body:"loveboat",ret:"loveboat"},
				{body:"green cider",ret:"greencider"},
				{body:"4-leaf clover",ret:"clover"},
				{body:"parrot palm",ret:"parrotpalm"},
				
				{body:"Coconut Juice",ret:"sendcoconutjuice"},
				{body:"Coconut Cream",ret:"sendcoconutcream"},
				{body:"Orange Orchid",ret:"sendorangeorchid"},
				{body:"Jungle Juice",ret:"sendjunglejuice"},

				{body:"Surf Wax",ret:"surfwax"},
				{body:"Surf Taco",ret:"surftaco"},
				{body:"Chill Beach Towel",ret:"chillbeachtowel"},
				{body:"Bright Plumeria",ret:"brightplume"},
				{body:"Sunset Surfboard",ret:"sunsetsurfboard"},
				{body:"Mini Island",ret:"miniisland"},
				{body:"Surfin' Turtle",ret:"surfinturtle"},
	
				{body:"Egg Dye",ret:"eggdye"},
				{body:"Chocolate Egg",ret:"chocegg"},
				{body:"Pink Mushrooms",ret:"pinkmushrooms"},
				{body:"Spring Grass",ret:"springgrass"},
				{body:"spring tiki",ret:"springtiki"},
				{body:"baby chick",ret:"babychick"},
				{body:"springgazebo",ret:"springgazebo"},
				{body:"hiding in his treasure chest",ret:"bonus"},
				
				{body:"Resort-a-colada",ret:"resortcolada"},
				{body:"room keys",ret:"roomkeys"},
				{body:"folded towels",ret:"foldedtowels"},
				{body:"resort umbrella",ret:"resortumbrella"},
				{body:"diving platform",ret:"divingplatform"},
				{body:"turtle table",ret:"turtletable"},
				{body:"ballerina fountain",ret:"ballerinafountain"},
	
				{body:"purple poi",ret:"sendpurplepoi"},
				{body:"grilled pineapple",ret:"sendgrilledpineapple"},
				{body:"vegetable skewers",ret:"sendvegskewers"},
				{body:"maui style mahi mahi",ret:"sendmauimahimahi"},

				{body:"got hit with a {%1}", ret:"send{%1}",subTests:[
					"slime balloon","water balloon","pie balloon","cat balloon"
				]},
	
				{body:"red gem",ret:"gemred"},
				{body:"blue gem",ret:"gemblue"}, 
				{body:"purple gem",ret:"gempurple"}, 
				{body:"orange gem",ret:"gemorange"}, 
				{body:"green gem",ret:"gemgreen"}, 

				{body:"bag of pineapples",ret:"fruitpineapple"},
				{body:"of each gem",ret:"gembag"},
				{body:"turkey feast",ret:"fruitturkeyfeast"},
				{body:"racoontable",ret:"racoontable"},
				{body:"racoon table",ret:"racoontable"},
				{body:"sunflowers",ret:"sunflowers"},
				{body:"fail whale",ret:"failwhale"},
				{body:"swan boat",ret:"swanboat"},	 
				{body:"big barn",ret:"bigbarn"},	 
				{body:"garden plot",ret:"gardenplot"},	 
				{body:"pig float",ret:"pigfloat"},	 
				{body:"pumpkin pie",ret:"fruitpumpkinpie"},
				{body:"cheese platter",ret:"fruitcheeseplatter"},	 
				{body:"black coffee",ret:"fruitblackcoffee"},	 
				{body:"fruit cake",ret:"fruitfruitcake"},	 
				{body:"hors d",ret:"fruithors"},
	 
				{body:"needs {%1}",ret:"send{%1}",subTests:[
					"scarf","slush","resin","dye","marble","pillar","paint","shells","planks","aqua vitae",
					"nails","rock","ectoplasm","frosting","cloth","gold","seeds","fire","rope","oil","ice",
					"gum drops","glue","packed snow","glass","metal","gears","bolts","gingerbread","grease",
					"terra vitae","terravitae","pulley",
				]},

				{body:"needs an energy pack",ret:"sendenergypack"},
				{link:"map frag",ret:"sendmapfrag"},
				{link:"magic top hat",ret:"sendmagictophat"},
				{link:"dallion urn",ret:"sendmedallionurn"},
				{link:"magic bag",ret:"sendmagicbag"},
				{link:"surf gear bag",ret:"sendsurfgear"},

				{body:"needs Nail Files",ret:"sendquestitem"},
				{body:"needs to get past",ret:"sendhelp"},

				{link:"resort gift basket",ret:"sendresortgiftbasket"},

				{body:"purple poi",ret:"sendpurplepoi"},
				{body:"grilled pineapple",ret:"sendgrilledpineapple"},
				{body:"vegetable skewers",ret:"sendvegskewers"},
				{body:"maui style mahi mahi",ret:"sendmauimahimahi"},

				{body:"to continue on my quest",ret:"sendquestitem"},
				{url:"cat=quest_item",ret:"sendquestitem"},

				{link:"gem-fruit",ret:"gemfruit"},
				{link:"medallion",ret:"medallion"},
				{link:"fire dig",ret:"firedig"},
				{link:"golden ticket",ret:"goldenticket"},
				{link:"phoenix feather",ret:"phoenixfeather"},
				{link:"energy capsule",ret:"energycapsule"},
				{link:"oxygen",ret:"oxygen"},
				{link:"basic bait",ret:"baitbasic"},
				{link:"special bait",ret:"baitspecial"},
				{link:"good bait",ret:"baitgood"},
				{link:"magic bait",ret:"baitmagic"},

				{body:"sharing a bounty of Coconut",ret:"fruitcoconut"},
				{body:"sharing a bounty of banana",ret:"fruitbanana"},
				{link:"sushi",ret:"fruitsushi"},
				{body:"sharing a bounty of pineapple",ret:"fruitpineapple"},
				{link:"watermelon",ret:"fruitwatermellon"},
				{link:"happy cake",ret:"fruithappycake"},
				{link:"monster kebab",ret:"fruitmonsterkebab"},
				{link:"dragonfruit",ret:"fruitdragonfruit"},
				{link:"dragon fruit",ret:"fruitdragonfruit"},
				{link:"mango",ret:"fruitmango"},
				{link:"kiwi",ret:"fruitkiwi"},
				{link:"taffy",ret:"fruittaffy"},
				{link:"map fragment",ret:"mapfrag"},
				{link:"bonus",ret:"bonus"},
				{link:"monkey wrench",ret:"monkeywrench"},
				{link:"dusky",ret:"dusky"},
				{link:"peacock",ret:"peacock"},
				{link:"margay",ret:"margay"},
				{link:"flamingo",ret:"flamingo"},
				{link:"lemur",ret:"lemur"},
				{link:"jellyfish",ret:"jellyfish"},
				{link:"gull",ret:"gull"},
				{link:"red panda",ret:"redpanda"},
				{link:"panda",ret:"panda"},
				{link:"black cat",ret:"blackcat"},
				{link:"panther",ret:"panther"},
				{link:"toucan",ret:"toucan"},
				{link:"sloth",ret:"sloth"},
				{link:"tarantula",ret:"tarantula"},
				{link:"seal",ret:"seal"},
				{link:"dolphin",ret:"dolphin"},
				{link:"elephant",ret:"elephant"},
				{link:"chinchilla",ret:"chinchilla"},
				{link:"porcupine",ret:"porcupine"},
				{link:"octopus",ret:"octopus"},
				{link:"sea turtle",ret:"seaturtle"},
				{link:"turtle",ret:"turtle"},
				{link:"cockatoo",ret:"cockatoo"},
				{link:"parrot",ret:"parrot"},
				{link:"giraffe",ret:"giraffe"},
				{link:"turkey",ret:"turkey"},

				{link:"claim reward",ret:"bonus"},
				{link:"claim your treasure",ret:"bonus"},
				{link:"send gift",ret:"wishlist"},
				{link:"take the treasure",ret:"wishgift"},

				{link:"fruit",ret:"fruit"},
				{link:"gem",ret:"gem"},
				{link:"coin",ret:"coins"},
				{link:"xp",ret:"xp"},
				{link:"help",ret:"send"},
				{link:"send",ret:"send"},
				{body:"fruit",ret:"fruit"},	

			],

			menu: {
				section:{type:"section",label:"TreasureIsle Manager Options ("+version+")",kids:{
					updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/98138.user.js"},
					MCA:{type:"link",label:"Install Message Center Assistant",href:"http://userscripts.org/scripts/source/108812.user.js"},
					sep:{type:"separator",label:"Basics",kids:{
						basicblock:{type:"optionblock",label:"Basics",kids:{
							xp:{type:"checkbox",label:"Get free xp?"},
							coins:{type:"checkbox",label:"Coins"},
							bonus:{type:"checkbox",label:"Mystery Gifts (xp,coin,other)"},
						}},
						wishgift:{type:"checkbox",label:"Wish List Gifts"},
						dontsteal:{type:"checkbox",label:"Don't Collect  Wishlist Items intended for Other Players"},
						doUnknown:{type:"checkbox",label:"Process Unknown Links"},
					}},

					helpseparator:{type:"separator",label:"Help Friends", kids:{
						sendall:{type:"checkbox",label:"Send ALL gifts on give item links? (Or Choose Below)"},
						sendenergypack:{type:"checkbox",label:"Energy Pack"},
						send:{type:"checkbox",label:"Send Items on Unknown Requests (already included if send ALL is checked)"},
						matbasic:{type:"optionblock",label:"Send-one-get-one Materials",kids:{
							sendsscarf:{type:"checkbox",label:"Scarf"},
							sendslush:{type:"checkbox",label:"Slush"},
							sendresin:{type:"checkbox",label:"Resin"},
							sendmarble:{type:"checkbox",label:"Marble"},
							senddye:{type:"checkbox",label:"Dye"},
							sendpillar:{type:"checkbox",label:"Pillar"},
							sendshells:{type:"checkbox",label:"Shells"},
							sendplanks:{type:"checkbox",label:"Planks"},
							sendaquavitae:{type:"checkbox",label:"Aqua Vitae"},
							sendpaint:{type:"checkbox",label:"Paint"},
							sendnails:{type:"checkbox",label:"Nails"},
							sendfrosting:{type:"checkbox",label:"Frosting"},
							sendrock:{type:"checkbox",label:"Rock"},
							sendectoplasm:{type:"checkbox",label:"Ectoplasm"},
							sendcloth:{type:"checkbox",label:"Cloth"},
							sendrope:{type:"checkbox",label:"Rope"},
							sendgold:{type:"checkbox",label:"Gold"},
							sendseeds:{type:"checkbox",label:"Seeds"},
							sendfire:{type:"checkbox",label:"Fire"},
							sendoil:{type:"checkbox",label:"Oil"},
							sendice:{type:"checkbox",label:"Ice"},
							sendgumdrops:{type:"checkbox",label:"Gum Drops"},
							sendglue:{type:"checkbox",label:"Glue"},
							sendpackedsnow:{type:"checkbox",label:"Packed Snow"},
							sendgingerbread:{type:"checkbox",label:"Gingerbread"},
							sendgears:{type:"checkbox",label:"Gears"},
							sendbolts:{type:"checkbox",label:"Bolts"},
							sendglass:{type:"checkbox",label:"Glass"},
							sendmetal:{type:"checkbox",label:"Metal"},
							sendterravitae:{type:"checkbox",label:"Terra Vitae"},
							sendgrease:{type:"checkbox",label:"Grease"},
							sendpulley:{type:"checkbox",label:"Pulley"},
						}},
						sendhelp:{type:"checkbox",label:"Send Help"},
						sendquestitem:{type:"checkbox",label:"Send Quest Items"},
						matcurrency:{type:"optionblock",label:"Send Event Currency",kids:{
							sendbubbly:{type:"checkbox",label:"Bubbly"},
							sendpartyfavor:{type:"checkbox",label:"Party Favor"},
							sendmagictophat:{type:"checkbox",label:"Magic Top Hat"},
							sendgiftbag:{type:"checkbox",label:"Gift Bag (valentine/Clover)"},
							sendmedallionurn:{type:"checkbox",label:"Medallion Urn"},
							sendmagicbag:{type:"checkbox",label:"Magic Bag"},
							sendsurfgearbag:{type:"checkbox",label:"Surf Gear"},
							sendeasterbasket:{type:"checkbox",label:"Easter Basket"},
							sendresortgiftbasket:{type:"checkbox",label:"Resort Gift Basket"},
							sendfossilrock:{type:"checkbox",label:"Fossil Rock"},
						}},
					}},



					eventstores:{type:"separator",label:"Collect Event Currency Items", kids:{
						curblock:{type:"optionblock",label:"Currency",kids:{		
						blackballoons:{type:"checkbox",label:"Get Black Balloons"},
						rsvp:{type:"checkbox",label:"Feast RSVP"},
						present:{type:"checkbox",label:"Presents"},
						bubbly:{type:"checkbox",label:"Bubbly"},
						snowflake:{type:"checkbox",label:"Snowflakes"},
						valentine:{type:"checkbox",label:"Valentines"},
						medallion:{type:"checkbox",label:"Medallion"},
						clover:{type:"checkbox",label:"4-Leaf Clovers"},
						crystalball:{type:"checkbox",label:"Crystal Ball"},
						surfwax:{type:"checkbox",label:"Surf Wax"},
						eggdye:{type:"checkbox",label:"Egg Dye"},
						roomkeys:{type:"checkbox",label:"Room Keys"},
						fossil:{type:"checkbox",label:"Fossil"},
						}},
					}},

					superseparator:{type:"separator",label:"Get Special-Use Items", kids:{
						superblock:{type:"optionblock",label:"Items",kids:{		
						energycapsule:{type:"checkbox",label:"Energy Capsule (+1 Max Energy)"},
						firedig:{type:"checkbox",label:"Fire Dig"},
						oxygen:{type:"checkbox",label:"Oxygen Bottle"},
						buildingmaterials:{type:"checkbox",label:"Get Building Materials (the box, not individual)"},
						phoenixegg:{type:"checkbox",label:"Phoenix Egg (+5 Fire Digs)"},	
						}},				
					}},
	
					foodseparator:{type:"separator",label:"Collect Food Items",kids:{
						fruit:{type:"checkbox",label:"Get Unmarked Fruit"},
						fruitstandard:{type:"optionblock",label:"Standard",kids:{		
							fruitkiwi:{type:"checkbox",label:"Kiwi (5)"},
							fruitbanana:{type:"checkbox",label:"Banana (10)"},
							fruitmango:{type:"checkbox",label:"Mango (15)"},
							fruitcoconut:{type:"checkbox",label:"Coconut (20)"},
							fruitwatermellon:{type:"checkbox",label:"Watermellon (20)"},
							fruitpineapple:{type:"checkbox",label:"Pineapple (25)"},
							fruitdragonfruit:{type:"checkbox",label:"Dragonfruit (45, noexpire)"},
							fruitsushi:{type:"checkbox",label:"Ninja Food (12)"},
							fruitmonsterkebab:{type:"checkbox",label:"Monster Kebab (12)"},
							fruithappycake:{type:"checkbox",label:"Happy Cake (12)"},
							fruittaffy:{type:"checkbox",label:"Taffy (??, noexpire)"},
							gemfruit:{type:"checkbox",label:"Gemfruit (10 + Random Gem)"},
						}},
					
						foodlimited:{type:"optionblock",label:"Seasonal/Limited",kids:{		
							fruitblackcoffee:{type:"checkbox",label:"Black Coffee (10)"},
							fruitfruitcake:{type:"checkbox",label:"Fruitcake (20)"},
							fruitcandycane:{type:"checkbox",label:"Candy Canes (10)"},
							fruithors:{type:"checkbox",label:"Hors d'oeuvres (20)"},
							fruitcarrot:{type:"checkbox",label:"Carrot (20)"},
							boxofchocolate:{type:"checkbox",label:"Box of Chocolate (20)"},
							greencider:{type:"checkbox",label:"Green Cider (20)"},
							fortunecookie:{type:"checkbox",label:"Fortune Cookie (20)"},
							surftaco:{type:"checkbox",label:"Surf Taco (20)"},
							chocegg:{type:"checkbox",label:"Chocolate Egg (20)"},
							resortcolada:{type:"checkbox",label:"Resort-a-colada (12)"},
							cretaceoussalad:{type:"checkbox",label:"Cretaceous Salad"},
						}},
						matcabana:{type:"optionblock",label:"Send-one-get-one: Coconut Cabana",kids:{
							sendcoconutjuice:{type:"checkbox",label:"Coconut Juice (3)"},
							sendcoconutcream:{type:"checkbox",label:"Coconut Cream (5)"},
							sendorangeorchid:{type:"checkbox",label:"Orange Orchid (8)"},
							sendjunglejuice:{type:"checkbox",label:"Jungle Juice (12)"},
						}},
						luautable:{type:"optionblock",label:"Send-one-get-one: Luau Buffet",kids:{
							sendpurplepoi:{type:"checkbox",label:"Purple Poi"},
							sendgrilledpineapple:{type:"checkbox",label:"Grilled Pineapple"},
							sendvegskewers:{type:"checkbox",label:"Vegetable Skewers"},
							sendmauimahimahi:{type:"checkbox",label:"Maui Style Mahi Mahi"},
						}},
						balloonfight:{type:"optionblock",label:"Send-one-get-one: Balloon Fight",kids:{
							sendwaterballoon:{type:"checkbox",label:"Water Balloon"},
							sendslimeballoon:{type:"checkbox",label:"Slime Balloon"},
							sendpieballoon:{type:"checkbox",label:"Pie Balloon"},
							sendcatballoon:{type:"checkbox",label:"Cat Balloon"},
						}},
					}},

					baitseparator:{type:"separator",label:"Collect Bait",kids:{
						baitblock:{type:"optionblock",label:"Bait",kids:{		
						basicbait:{type:"checkbox",label:"Basic Bait"},
						goodbait:{type:"checkbox",label:"Good Bait"},
						specialbait:{type:"checkbox",label:"Special Bait"},
						magicbait:{type:"checkbox",label:"Magic Bait"},
						}},
					}},

					keyitemsseparator:{type:"separator",label:"Get Key Items",kids:{
						blockkeys:{type:"optionblock",label:"Keys",kids:{		
						phoenixfeather:{type:"checkbox",label:"Phoenix Feather"},
						mapfragment:{type:"checkbox",label:"Map Fragment"},
						goldenticket:{type:"checkbox",label:"Golden Ticket"},
						monkeywrench:{type:"checkbox",label:"Monkey Wrench"},		
						redkey:{type:"checkbox",label:"Red Chest Key"},		
						bluekey:{type:"checkbox",label:"Blue Chest Key"},
						}},		
					}},

					gemsseparator:{type:"separator",label:"Get Gems",kids:{
						blockgems:{type:"optionblock",label:"Colors",kids:{		
						gemred:{type:"checkbox",label:"Red"},
						gemblue:{type:"checkbox",label:"Blue"},
						gemorange:{type:"checkbox",label:"Orange"},
						gempurple:{type:"checkbox",label:"Purple"},
						gemgreen:{type:"checkbox",label:"Green"},	
						}},	
						gemyours:{type:"checkbox",label:"From Your Own Tree"},		
						gembag:{type:"checkbox",label:"Bag (one of each)"},		
						gem:{type:"checkbox",label:"Random Color"},		
					}},

					tiadoptseparator:{type:"separator",label:"Adopt Animals/Decor with Animals",kids:{
						save:{type:"checkbox",label:"Save Unrecognized Animals"},		
						petsbasic:{type:"optionblock",label:"Standard",kids:{		
							peacock:{type:"checkbox",label:"Peacock"},
							tarantula:{type:"checkbox",label:"Tarantula"},
							panda:{type:"checkbox",label:"Panda"},
							sloth:{type:"checkbox",label:"Sloth"},
							iguana:{type:"checkbox",label:"Iguana"},
							monkey:{type:"checkbox",label:"Monkey"},
							toucan:{type:"checkbox",label:"Toucan"},
							parrot:{type:"checkbox",label:"Parrot"},
							cockatoo:{type:"checkbox",label:"Cockatoo"},
							dolphin:{type:"checkbox",label:"Dolphin"},
							seal:{type:"checkbox",label:"Seal"},
							redpanda:{type:"checkbox",label:"Red Panda"},
							margay:{type:"checkbox",label:"Margay"},
							panther:{type:"checkbox",label:"Panther"},
							porcupine:{type:"checkbox",label:"Porcupine"},
							girraffe:{type:"checkbox",label:"Girraffe"},
							elephant:{type:"checkbox",label:"Elephant"},
							chinchilla:{type:"checkbox",label:"Chinchilla"},
							octopus:{type:"checkbox",label:"Octopus"},		
							blackcat:{type:"checkbox",label:"Black Cat"},		
							seaturtle:{type:"checkbox",label:"Sea Turtle"},		
							turtle:{type:"checkbox",label:"Turtle"},		
							turkey:{type:"checkbox",label:"Turkey"},		
							flamingo:{type:"checkbox",label:"Flamingo"},		
							jellyfish:{type:"checkbox",label:"Jellyfish"},		
							lemur:{type:"checkbox",label:"Lemur"},		
							gull:{type:"checkbox",label:"Gull"},		
							dusky:{type:"checkbox",label:"Dusky Dolphin"},		
							babybronto:{type:"checkbox",label:"Baby Brontosaurus"},		
							babyceratops:{type:"checkbox",label:"Baby Triceratops"},		
							babydactyl:{type:"checkbox",label:"Baby Pteradactyl"},		
							babymammoth:{type:"checkbox",label:"Baby Mammoth"},		
							babysaber:{type:"checkbox",label:"Baby Saber"},		
						}},
						petslimited:{type:"optionblock",label:"Seasonal/Limited",kids:{
							petmclovin:{type:"checkbox",label:"McLovin'"},
							raccoontable:{type:"checkbox",label:"Raccoon Table"},
							failwhale:{type:"checkbox",label:"Fail Whale"},
							jdturkey:{type:"checkbox",label:"JD Turkleton"},
							snowdog:{type:"checkbox",label:"Snow Dog"},
							snowwoman:{type:"checkbox",label:"Snow Woman"},
							popcorn:{type:"checkbox",label:"Popcorn"},
							parrotpalm:{type:"checkbox",label:"Parrot Palm"},				
							slithers:{type:"checkbox",label:"Slithers"},						
							bunbun:{type:"checkbox",label:"Dr. Bunbun"},						
							surfinturtle:{type:"checkbox",label:"Surfin' Turtle"},						
							babychick:{type:"checkbox",label:"Baby Chick"},		
							turtletable:{type:"checkbox",label:"Turtle Table"},		
						}},
					}},

					boatsseparator:{type:"separator",label:"Boats and Buildings (and other +energy/+backpack decor)",kids:{
						addbackpack:{type:"optionblock",label:"Backpack ++",kids:{
							bigbarn:{type:"checkbox",label:"Big Barn"},
						}},
						addmaxenergy:{type:"optionblock",label:"Max energy ++",kids:{
							swanboat:{type:"checkbox",label:"Swan Boat"},
							christmasboat:{type:"checkbox",label:"Christmas Boat"},
							newyearsboat:{type:"checkbox",label:"New Years Boat"},
							snowcloud:{type:"checkbox",label:"Snow Cloud"},
							loveboat:{type:"checkbox",label:"Loveboat"},
							shamrockballoon:{type:"checkbox",label:"Shamrock Balloon"},
							fortuneballoon:{type:"checkbox",label:"Fortune Balloon"},
							miniisland:{type:"checkbox",label:"Mini Island"},
							springgazebo:{type:"checkbox",label:"Spring Gazebo"},
						}},
						growfruit:{type:"optionblock",label:"Grow Fruit",kids:{
							gardenplot:{type:"checkbox",label:"Garden Plot"},
						}},
					}},
					decosep:{type:"separator",label:"Other placeable decorations",kids:{
						blockdecor:{type:"optionblock",label:"Decorations",kids:{		
						streetlamp:{type:"checkbox",label:"Get a Street Lamp"},
						fireworks:{type:"checkbox",label:"Fireworks"},
						partytable:{type:"checkbox",label:"Party Table"},
						cloverpatch:{type:"checkbox",label:"Clover Patch"},
						treelantern:{type:"checkbox",label:"Tree Lantern"},
						chillbeachtowel:{type:"checkbox",label:"Chill Beach Towel"},
						brightplume:{type:"checkbox",label:"Bright Plumeria"},
						sunsetsurfboard:{type:"checkbox",label:"Sunset Surfboard"},
						pinkmushrooms:{type:"checkbox",label:"Pink Mushrooms"},
						springgrass:{type:"checkbox",label:"Spring Grass"},
						springtiki:{type:"checkbox",label:"Spring Tiki"},
						foldedtowels:{type:"checkbox",label:"Folded Towels"},
						resortumbrella:{type:"checkbox",label:"Resort Umbrella"},
						divingplatform:{type:"checkbox",label:"Diving Platform"},
						ballerinafountain:{type:"checkbox",label:"Ballerina Fountain"},
						}},
					}}
				}}
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app234860566661','data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};

	function run(){
		var node;
		try{
			var href = window.location.href;
			var doc = document.documentElement;
			var text = doc.textContent;
			var html = doc.innerHTML;
		} catch(e){window.setTimeout(function(e){run();},500);return;}

		if (href.find('flash.php?isOuterIframe=1')) sendMessage("status=1"); //game loaded, assume ok		
		else if (href.find('gifts.php?')) sendMessage("status=1"); //game loaded, assume ok		
		else {
			var statusCode=0;
			//check page for various texts
			if (text.find("already claimed this reward"))statusCode=-6;//already claimed
			else if (text.find("already got a gem today from this tree")) statusCode=-6; //already claimed gem
			else if (text.find("it looks like the monkeys made off with your prize")) statusCode=-6;  //damn prize monkies
			else if (text.find('reached your reward limit')) statusCode=-3; //over limit
			else if (text.find('has already been sent this item')) statusCode=-2; //already been sent
			else if (text.find('has already been claimed')) statusCode=-2; //already been claimed
			else if (text.find("there aren't any more to go around")) statusCode=-2; //already been sent
			else if (text.find('you have already sent items to')) statusCode=-2; //already sent one
			else if (text.find('Oh no!')) statusCode=-2; //try to claim another's gems
			else if (text.find("monkeys made off with")) statusCode=-5;  //damn prize monkies
		
			else if (node=selectSingleNode(doc,".//div[contains(@class,'acceptButtons')]/a[contains(@href,'&yes=1')]")) {
				try{
					window.setTimeout(function(){window.top.location.href=node.href.replace("https","http");},500);
					return;
				} catch(e){window.setTimeout(run,500);}
			}

			else if (html.find('giftConfirm_img')) statusCode=1;//generic success

			if (statusCode!=0) sendMessage("status="+statusCode);
			else window.setTimeout(run,500);
		}
	}

	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}
	window.setTimeout(function(e){run();},500);


})(); // anonymous function wrapper end