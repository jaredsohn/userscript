// ==UserScript==
// @name           Wall Manager Sidekick (CV)
// @description    Assists Wall Manager with City Ville posts
// @include        /^https?:\/\/(.*)\.cityville\.zynga\.com\//
// @include        http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.42.2
// @copyright      Charlie Ewing & Joe Simmons
// ==/UserScript== 
(function() { 

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http(s)?:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.42.2";
	var thisAppID = "291549705119";
	var thisScriptID = "98049";

	var defaultTO = null;

 	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		if (this.length>1) for (var i=this.length-1;i>0;i--) {
			for (var i2=i-1;i2>0;i2--){
				if (this[i].contains(this[i2])){
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

	function JSONmerge() {
		var a = arguments, b = [], i, f, g, c = {};
		for (i in (new Array(a.length+1)).join(1).split("")) b.push(a[i]);
		for (f in b) for (g in b[f]) c[g] = b[f][g];
		return c;	
	};

	//click a node object
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
		evObj=null;
	}

	//short form for evaluate
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	}

	//short form for evaluate with single node return
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	}

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

	//sidekick ability to pass information via hash parameter
	function sendMessage(s){
		try {
			top.location.hash = s;
		} catch (e) {
			if (window != top) top.location.href = "http://www.facebook.com/reqs.php?#"+s;			
		}
	};

	function menuFromArray(arr, accText,prefix){
		prefix=prefix||"";
		var ret = {};
		for (var i=0,len=arr.length; i<len; i++){
			ret[prefix+arr[i]]={type:"checkbox",label:accText[prefix+arr[i]]};
		}
		return ret;
	};

	function menuFromData(data,menu){
		for (var m=0,len=data.length; m<len; m++){
			var material = data[m]["material"];
			var accText = data[m]["accText"];
			var event = (data[m]["event"]||"Unsorted");

			var thisMenu;
			if ( !(thisMenu=(menu["optblock"+event]||null) ) ) {
				//create this option block
				thisMenu=(menu["optblock"+event]={type:"optionblock",label:event,kids:{} });
			}
			//create this material element
			thisMenu.kids["send"+material]={type:"checkbox",label:accText};
		}
	};

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+thisAppID);
		if (doorMark) return; //already posted to door

		var data=[
			{material:"gold_plating", accText:"Gold Plating",event:"Basics"},
			{material:"tree_gift", accText:"Holiday Gift",event:"Holiday Tree 2010"},
			{material:"signature", accText:"Signature"},
			{material:"spring_flowers", accText:"Spring Flowers"},
			{material:"ticket_shell", accText:"Shell",event:"Beach Carnival"},
			{material:"city_seal", accText:"City Seal",event:"Basics"},
			{material:"marble", accText:"Marble",event:"Basics"},
			{material:"permit", accText:"Building Permit",event:"Basics"},
			{material:"ribbon", accText:"Ribbon",event:"Basics"},
			{material:"pencil_sharpener", accText:"Pencil Sharpener"},
			{material:"stapler", accText:"Stapler"},
			{material:"paperweight", accText:"Paperweight"},
			{material:"display_case", accText:"Display Case"},
			{material:"display_light", accText:"Display Light"},
			{material:"velvet_rope", accText:"Velvet Rope"},
			{material:"two_by_fours", accText:"2x4"},
			{material:"cement", accText:"Cement"},
			{material:"folders", accText:"Manilla Folders",event:"Basics"},
			{material:"inkpad", accText:"Inkpad",event:"clerks Office"},
			{material:"visor", accText:"Visor",event:"clerks Office"},
			{material:"deck_chair", accText:"Deck Chair"},
			{material:"sunglasses", accText:"Sunglasses"},
			{material:"fiber_optic_wire", accText:"Fiber Optic Wire",event:"Phone Company"},
			{material:"headsets", accText:"Headsets",event:"Phone Company"},
			{material:"phone", accText:"Phone",event:"Phone Company"},
			{material:"satellite", accText:"Satellite Antenna",event:"Phone Company"},
			{material:"switchboard", accText:"Wwitchboard",event:"Phone Company"},
			{material:"arches", accText:"Arches"},
			{material:"leveler", accText:"Leveler"},
			{material:"protractor", accText:"Protractor"},
			{material:"hard_hat", accText:"Hard_hat"},
			{material:"conveyor_belt", accText:"Conveyor Belt"},
			{material:"robotic_arm", accText:"Robotic Arm"},
			{material:"work_uniforms", accText:"Work Uniforms"},
			{material:"lunchbox", accText:"Lunchbox"},
			{material:"safety_goggles", accText:"Safety Goggles"},
			{material:"badge", accText:"Badge"},
			{material:"ball_and_chain", accText:"Ball and Chain"},
			{material:"outfit", accText:"Outfit"},
			{material:"siren", accText:"Siren"},
			{material:"whistle", accText:"Whistle"},
			{material:"barometer", accText:"Barometer",event:"Weather Station"},
			{material:"thermometer", accText:"Thermometer",event:"Weather Station"},
			{material:"weatherballoon", accText:"Weather Balloon",event:"Weather Station"},
			{material:"pipewrench", accText:"Pipe Wrench"},
			{material:"material_rubberboots", accText:"Rubber Boots", event:"City Works"},
			{material:"waterfaucet", accText:"Water Faucet"},
			{material:"magnifyingglass", accText:"Magnifying Glass"},
			{material:"presscard", accText:"Press Card"},
			{material:"domepanel", accText:"Dome Panel"},
			{material:"frog", accText:"Frog"},
			{material:"seedpacket", accText:"Seed Packet"},
			{material:"wateringcan", accText:"Watering Can"},
			{material:"fertilizer", accText:"Fertilizer"},
			{material:"rotor", accText:"Rotor", event:"Dam"},
			{material:"canallock", accText:"Canal Lock", event:"Dam"},
			{material:"material_floodgate", accText:"Floodgate",event:"Dam"},
			{material:"generator", accText:"Generator", event:"Dam"},
			{material:"hydraulicturbine", accText:"Hydraulic Turbine", event:"Dam"},
			{material:"pillows", accText:"Pillows"},
			{material:"toiletries", accText:"Toiletries",event:"Sailboat Hotel"},
			{material:"slipper", accText:"Slipper"},
			{material:"beachtowel", accText:"Beach Towel",event:"Sailboat Hotel"},
			{material:"luggagecart", accText:"Luggage Cart",event:"Sailboat Hotel"},
			{material:"beachcabana", accText:"Beach Cabana"},
			{material:"bathrobe", accText:"Bathrobe", event:"Meet the Parents"},
			{material:"fishfountain", accText:"Fish Fountain",event:"Sailboat Hotel"},
			{material:"welcomechocolates", accText:"Welcome Treats",event:"Sailboat Hotel"},
			{material:"chandelier", accText:"Chandelier",event:"Sailboat Hotel"},
			{material:"keycard", accText:"Bubble Keycard",event:"Sailboat Hotel"},
			{material:"ukulele", accText:"Ukulele",event:"Tonga Tower"},
			{material:"tablemat", accText:"Table Mat",event:"Tonga Tower"},
			{material:"material_drinkumbrella", accText:"Drink Umbrella", event:"Tonga Tower"},
			{material:"material_opencoconut", accText:"Open Coconut", event:"Tonga Tower"},
			{material:"material_seahorse", accText:"Seahorse", event:"Aquarium"},
			{material:"starfish", accText:"Starfish"},
			{material:"paintbucket", accText:"Paint Bucket"},
			{material:"paintbrush", accText:"Paintbrush"},
			{material:"paperairplane", accText:"Paper Airplane"},
			{material:"locker", accText:"Locker", event:"Mini Golf"},
			{material:"notebook", accText:"Notebook"},
			{material:"powerdrill", accText:"Powerdrill"},
			{material:"paintroller", accText:"Paint Roller"},
			{material:"hammer", accText:"Hammer"},
			{material:"ladder", accText:"Ladder"},
			{material:"paintsample", accText:"Paint Sample"},
			{material:"paintsprayer", accText:"Paint Sprayer"},
			{material:"material_paintscraper", accText:"Paint Scraper", event:"Remodel HQ"},
			{material:"sander", accText:"Sander"},
			{material:"paintprimer", accText:"Paint Primer"},
			{material:"caterpillar", accText:"Caterpillar"},
			{material:"smores", accText:"Smores"},
			{material:"compass", accText:"Compass"},
			{material:"watercanteen", accText:"Water Canteen"},
			{material:"material_doggiebone", accText:"Doggie Bone", event:"Doggie Daycare"},
			{material:"material_doggiebed", accText:"Doggie Bed", event:"Doggie Daycare"},
			{material:"material_doggiecollar", accText:"Doggie Collar", event:"Doggie Daycare"},
			{material:"material_doggiefood", accText:"Doggie Food", event:"Doggie Daycare"},
			{material:"shopping_bags", accText:"Shopping Bags"},
			{material:"spotlight", accText:"Spotlight"},
			{material:"parking_validation", accText:"Parking Validation", event:"Mini Golf"},
			{material:"escalator", accText:"Escalator"},
			{material:"mannequin", accText:"Mannequin"},
			{material:"barcode_scanner", accText:"Barcode Scanner"},
			{material:"mall_directory", accText:"Mall Directory"},
			{material:"glass_elevator", accText:"Glass Elevator"},
			{material:"security_towers", accText:"Security Towers"},
			{material:"mall_fountain", accText:"Mall Fountain"},
			{material:"xpromo_aces", accText:"Aces"},
			{material:"xpromo_seedlings", accText:"Seedlings"},
			{material:"rusty_search_party", accText:"Search Party", event:"Rusty"},
			{material:"rusty_life_vest", accText:"Life Vest", event:"Rusty"},
			{material:"holiday_snowflake", accText:"Snowflake",event:"Winter 2010"},
			{material:"holiday_snowball", accText:"Snowball",event:"Winter 2010"},
			{material:"holiday_pinecones", accText:"Pinecones",event:"Winter 2010"},
			{material:"holiday_skates", accText:"Skates",event:"Winter 2010"},
			{material:"holiday_lights", accText:"Holiday Lights",event:"Winter 2010"},
			{material:"holiday_mittens", accText:"Mittens",event:"Winter 2010"},
			{material:"holiday_puffy_jacket", accText:"Puffy Jacket",event:"Winter 2010"},
			{material:"holiday_winter_hat", accText:"Winter Hat",event:"Winter 2010"},
			{material:"chocolates", accText:"Chocolates"},
			{material:"endorsements", accText:"Endorsements"},
			{material:"fireaxes", accText:"Fire Axes"},
			{material:"boxed_chocolates", accText:"Boxed Chocolates"},
			{material:"cny3_red_envelopes", accText:"Red Envelopes",event:"Lunar New Year"},
			{material:"retail_bird_seed", accText:"Bird Seed", event:"Edgar & Ruth"},
			{material:"retail_coupon", accText:"Coupon", event:"Edgar & Ruth"},
			{material:"polish", accText:"Polish"},
			{material:"rsvps", accText:"RSVPs"},
			{material:"cufflinks", accText:"Cufflinks"},
			{material:"wedding_gifts", accText:"Wedding Gifts"},
			{material:"st_pattys_mugs", accText:"St. Patty's Mugs", event:"St. Pat's 2010"},
			{material:"st_pattys_face_paint_jar", accText:"St. Patty's Face Paint Jar", event:"St. Pat's 2010"},
			{material:"russian_leotards", accText:"Leotards", event:"Twirls & Tiptoes"},
			{material:"russian_ballet_shoes", accText:"Ballet Shoes", event:"Twirls & Tiptoes"},
			{material:"lorenzo_welcome_gifts", accText:"Welcome Gifts", event:"Lorenzo"},
			{material:"lorenzo_get_well_cards", accText:"Get Well Cards", event:"Lorenzo"},
			{material:"louise_college_new_books", accText:"College Books", event:"Higher Education"},
			{material:"louise_college_education_poster", accText:"Education Poster", event:"Higher Education"},
			{material:"louise_college_hammers", accText:"College Hammers", event:"Higher Education"},
			{material:"louise_college_bird_book", accText:"College Bird Book", event:"Higher Education"},
			{material:"cruise_ship_pamphlet", accText:"Cruise Pamphlet", event:"Cruise Ship"},
			{material:"museum_shovel", accText:"Shovel", event:"Archaelogical Dig"},
			{material:"archaeology_set", accText:"Archaeology Set", event:"Archaelogical Dig"},
			{material:"lab_coat", accText:"Lab Coat", event:"For the Children"},
			{material:"medicine_book", accText:"Medicine Book", event:"For the Children"},
			{material:"eating_contest_napkins", accText:"Napkins", event:"Eating Contest"},
			{material:"eating_contest_mustard", accText:"Mustard", event:"Eating Contest"},
			{material:"zoo_stuffed_animals", accText:"Stuffed Animals"},
			{material:"cincodemayo_maracas", accText:"Maracas", event:"Cinco de Mayo 2011"},
			{material:"movie_credit_card", accText:"Credit Card", event:"Star in the City"},
			{material:"movie_sweets", accText:"Movie Sweets", event:"Star in the City"},
			{material:"movie_posters", accText:"Movie Posters", event:"Star in the City"},
			{material:"skewers", accText:"Skewers", event:"Food Festival"},
			{material:"hand_trucks", accText:"Hand Trucks"},
			{material:"walkie_talkie", accText:"Walkie Talkie",event:"Mall"},
			{material:"ibeam", accText:"I-beam",event:"Bridge"},
			{material:"welding_torch", accText:"Welding Torch",event:"Bridge"},
			{material:"bridge_flyers", accText:"Bridge Flyers",event:"Bridge"},
			{material:"spring_party_flower_bulbs", accText:"Flower Bulbs"},
			{material:"balloon_animal", accText:"Balloon Animal", event:"Street Carnival"},
			{material:"cotton_candy", accText:"Cotton Candy", event:"Street Carnival"},
			{material:"popcorn", accText:"Popcorn", event:"Street Carnival"},
			{material:"elder2_family_popcorn", accText:"Popcorn", event:"Meet the Parents"},
			{material:"pretzel", accText:"Pretzel", event:"Street Carnival"},
			{material:"snowcone", accText:"Snowcone", event:"Street Carnival"},
			{material:"sand", accText:"Sand"},
			{material:"bucket", accText:"Bucket"},
			{material:"spade", accText:"Spade"},
			{material:"sandmold", accText:"Sand Mold"},
			{material:"popularity_vote", accText:"Popularity Vote"},
			{material:"chinese_kite", accText:"Chinese Kite",event:"Boat Race"},
			{material:"race_flag", accText:"Race Flag",event:"Boat Race"},
			{material:"july4_baseball_cap", accText:"Baseball Cap",event:"July 4th"},
			{material:"july4_sparklers", accText:"Sparklers",event:"July 4th"},
			{material:"july4_hot_dog", accText:"Hot Dog",event:"July 4th"},
			{material:"marathon_gelpack", accText:"Gelpack",event:"Marathon"},
			{material:"street_carnival_corndog", accText:"Corn Dog",event:"Street Carnival"},
			{material:"street_carnival_antacid", accText:"Antacid",event:"Street Carnival"},
			{material:"sunscreen", accText:"Sunscreen",event:"Community Pool"},
			{material:"chlorine_bottle", accText:"Chlorine Bottle",event:"Community Pool"},
			{material:"tiles", accText:"Tiles",event:"Community Pool"},
			{material:"flipflops", accText:"Flipflops",event:"Community Pool"},
			{material:"windfarm_green_petition", accText:"Green Petition",event:"Wind Farm"},
			{material:"solar_panel", accText:"Solar Panel",event:"Wind Farm"},
			{material:"bastille_beret", accText:"Beret",event:"Bastile Day"},
			{material:"bastille_baguette", accText:"Baguete",event:"Bastile Day"},
			{material:"bastille_beret", accText:"Beret",event:"Bastile Day"},
			{material:"bucketseat", accText:"Bucket Seat"},
			{material:"checkerflag", accText:"Checker Flag"},
			{material:"cone", accText:"Cone"},
			{material:"racingpedals", accText:"Racing Pedals"},
			{material:"racingwheel", accText:"Racing Wheel"},
			{material:"shipprow", accText:"shipprow"},
			{material:"safetynet", accText:"Safety Net"},
			{material:"jollyroger", accText:"Jolly Roger"},
			{material:"overheadbar", accText:"Overhead Bar"},
			{material:"carriage", accText:"Carriage"},
			{material:"lightbulbs", accText:"Lightbulbs"},
			{material:"turnstile", accText:"Turnstile"},
			{material:"controlbox", accText:"Control Box"},
			{material:"golfballs", accText:"Golfballs", event:"Mini Golf"},
			{material:"buckets", accText:"Buckets"},
			{material:"netting", accText:"Netting"},
			{material:"targets", accText:"Targets"},
			{material:"odd_camera", accText:"Camera",event:"Odd Day at the Zoo"},
			{material:"ostrich_egg", accText:"Ostrich Egg",event:"Odd Day at the Zoo"},
			{material:"icecream", accText:"Icecream",event:"Odd Day with Rusty"},
			{material:"odd_handcuff", accText:"Handcuff",event:"Odd Day with Rusty"},
			{material:"bike_crew", accText:"Bike Crew", event:"Timed"},
			{material:"two_by_fours", accText:"2x4"},
			{material:"tiles", accText:"Tiles"},
			{material:"beach_carnival_beach_towel", accText:"Carnival Beach Towel",event:"Beach Carnival"},
			{material:"_aloevera",accText:"Aloe Vera"},
			{material:"hiking_boots", accText:"Hiking Boots"},
			{material:"vacation_map", accText:"Vacation Map", event:"Family Vacation"},
			{material:"vacation_repellent", accText:"Repellent", event:"Family Vacation"},
			{material:"vacation_pictures", accText:"Vacation Pictures", event:"Family Vacation"},
			{material:"dam_reflector_vests", accText:"Reflector Vests", event:"Dam"},
			{material:"beach_fun_sunscreen", accText:"Sunscreen", event:"Summer Lovin'"},
			{material:"beach_fun_snorkel", accText:"Snorkel", event:"Summer Lovin'"},
			{material:"beach_fun_bathingsuits", accText:"Bathingsuits", event:"Summer Lovin'"},
			{material:"birding_birdbook", accText:"Bird Book",event:"Timed"},
			{material:"enrique_poster", accText:"Poster"},
			{material:"street_sign", accText:"Street Sign"},
			{material:"material_lumber", accText:"Lumber", event:"Gated Community"},
			{material:"material_roof_tiles", accText:"Roof Tiles",event:"Gated Community"},
			{material:"red_bricks", accText:"Red Bricks"},
			{material:"cement", accText:"Cement"},
			{material:"laptops", accText:"Laptops"},
			{material:"textbooks", accText:"Textbooks"},
			{material:"notebooks", accText:"Notebooks"},
			{material:"graduationcaps", accText:"Graduation Caps"},
			{material:"graduationgowns", accText:"Graduation Gowns"},
			{material:"pokerchips", accText:"Poker Chips",event:"French Riviera Casino"},
			{material:"slotmachine", accText:"Slot Machine",event:"French Riviera Casino"},
			{material:"roulette", accText:"Roulette Wheel",event:"French Riviera Casino"},
			{material:"deckofcards", accText:"Deck of Cards",event:"French Riviera Casino"},
			{material:"dice", accText:"Dice",event:"French Riviera Casino"},
			{material:"gardening_gloves", accText:"Gardening Gloves"},
			{material:"recycling_bags", accText:"Recycling Bags"},
			{material:"student_alarm_clock", accText:"Alarm Clock"},
			{material:"student_beach_towel", accText:"Student Beach Towel"},
			{material:"student_business_suit", accText:"Business Suit"},
			{material:"family_magazine", accText:"Magazine Subscription"},
			{material:"family_tutor", accText:"Family Tutor"},
			{material:"family_streetsweeper", accText:"Streetsweeper"},
			{material:"animal_feed", accText:"Animal Feed"},
			{material:"locust_spray", accText:"Locust Spray"},
			{material:"fruit_carton", accText:"Fruit Carton"},
			{material:"toymaker_toy_blocks", accText:"Toy Blocks"},
			{material:"toymaker_wooden_duck", accText:"Wooden Duck"},
			{material:"pet_shampoo", accText:"Pet Shampoo"},
			{material:"garden_shovel", accText:"Garden Shovel",event:"Garden State"},
			{material:"garden_vase", accText:"Garden Vase",event:"Garden State"},
			{material:"neighborhood_bakesale_goodies", accText:"Bakesale Goodies",event:"Neighborhood"},
			{material:"event_posters", accText:"Event Posters",event:"Neighborhood"},
			{material:"universities_graduation_cards", accText:"Coffee",event:"College"},
			{material:"universities_graduation_presents", accText:"Ramen Noodles",event:"College"},
			{material:"school_pocketprotector", accText:"Pocket Protector",event:"Too Cool For School"},
			{material:"school_textbooks", accText:"Textbooks2",event:"Too Cool For School"},
			{material:"clown_nose", accText:"Clown Nose", event:"Clown College"},
			{material:"clown_cream_pie", accText:"Cream Pie", event:"Clown College"},
			{material:"outdoor_fishing_lure", accText:"Fishing Lure",event:"Timed"},
			{material:"rafting_paddle", accText:"Rafting Paddle",event:"Timed"},
			{material:"screamingfans", accText:"Screaming Fans", event:"Enrique Concert"},
			{material:"stagelights", accText:"Stage Lights", event:"Enrique Concert"},
			{material:"speakers", accText:"Speakers", event:"Enrique Concert"},
			{material:"strobelights", accText:"Strobe Lights", event:"Enrique Concert"},
			{material:"sportsjersey", accText:"Sports Jersey"},
			{material:"trophy", accText:"Trophy"},
			{material:"vuvuzela", accText:"Vuvuzela",event:"Socker Stadium"},
			{material:"stadiumseat", accText:"Stadium Seat",event:"Socker Stadium"},
			{material:"soccerball", accText:"Soccerball",event:"Socker Stadium"},
			{material:"shinguard", accText:"Shin Guard",event:"Socker Stadium"},
			{material:"redcard", accText:"Red Card",event:"Socker Stadium"},
			{material:"petshow2_petshampoo", accText:"Pet Shampoo"},
			{material:"neighborhoods_bakesale_goodies", accText:"Bakesale Goodies"},
			{material:"student_alarm_clock", accText:"Alarm Clock"},
			{material:"family_magazine", accText:"Magazine Subscription"},
			{material:"dogbowl", accText:"Dog Bowl",event:"Doggie Rescue Center"},
			{material:"material_brush", accText:"Dog Brush",event:"Doggie Rescue Center"},
			{material:"material_toy", accText:"Dog Toy",event:"Doggie Rescue Center"},
			{material:"material_leash", accText:"Dog Leash",event:"Doggie Rescue Center"},
			{material:"upgrade_material_level", accText:"Level"},
			{material:"streetcone", accText:"Traffic Cone"},
			{material:"garden_send_seed", accText:"Seeds"},
			{material:"AskForGas",accText:"Gas"},
			{material:"attraction_wrench", accText:"Wrench", event:"Attraction"},
			{material:"attraction_CD", accText:"CD", event:"Attraction"},
			{material:"wonder_key", accText:"Key"},
			{material:"vampire_treat_bag", accText:"Treat Bag", event:"Vampire"},
			{material:"vampire_brains", accText:"Brains", event:"Vampire"},
			{material:"vampire_newt_potion", accText:"Eye of Newt", event:"Vampire"},
			{material:"art_show_print", accText:"Art Show Print", event:"Timed"},
			{material:"pumpkin_seeds", accText:"Pumpkin Seeds", event:"Halloween"},
			{material:"halloween_bandage", accText:"Bandage", event:"Zombie ER"},
			{material:"halloween_scalpel", accText:"Scalpel", event:"Zombie ER"},
			{material:"halloween_doctorreflector", accText:"Doctor Reflector", event:"Zombie ER"},
			{material:"halloween_bats", accText:"Bats", event:"Tree of Enchantment"},
			{material:"halloween_soil", accText:"Soil", event:"Tree of Enchantment"},
			{material:"halloween_spider", accText:"Spider", event:"Tree of Enchantment"},
			{material:"dancingbrooms", accText:"Dancing Brooms", event:"Halloween"},
			{material:"skeletons", accText:"Skeletons", event:"Halloween"},
			{material:"_2_masks", accText:"Halloween Masks", event:"Halloween"},
			{material:"art_auction_mallet", accText:"Auction Mallet",event:"Timed"},
			{material:"material_molds", accText:"Candy Molds"},
			{material:"ticket_candy", accText:"Candy", event:"Halloween"},
			{material:"material_sugar", accText:"Sugar", event:"Halloween"},
			{material:"monsterdentistchair", accText:"Dentist Chair", event:"Demented Dentist"},
			{material:"monstertoothpaste", accText:"Toothpaste", event:"Demented Dentist"},
			{material:"cob_webs", accText:"Cobwebs", event:"Halloween"},
			{material:"witch_hats", accText:"Witch Hats", event:"Halloween"},
			{material:"spy_watch", accText:"Spy Watch", event:"Spy Agency"},
			{material:"fundraiser_rsvp", accText:"Fundraiser RSVP"},
			{material:"bella_estate_listing", accText:"Estate Listing"},
			{material:"top_secret_documents", accText:"Top Secret Documents", event:"Spy Agency"},
			{material:"bella_song_lyrics", accText:"Song Lyrics"},
			{material:"salvador_audition_sample", accText:"Audition Sample", event:"Salvador"},
			{material:"material_chariot", accText:"Chariot", event:"Coliseum"},
			{material:"material_spartan_helmet", accText:"Spartan Helmet", event:"Coliseum"},
			{material:"material_petrifiedwood", accText:"Petrified Wood"},
			{material:"barnraising_toolkit", accText:"Barn Toolkit",event:"Timed"},
			{material:"salvador_horse_saddle", accText:"Horse Saddle", event:"Salvador"},
			{material:"material_forklift", accText:"Forklift"},
			{material:"material_pierplank", accText:"Pier Plank", event:"Pier"},
			{material:"material_mooringline", accText:"Mooring Line", event:"Pier"},
			{material:"material_blades", accText:"Windmill Blades", event:"Wind Farm"},
			{material:"material_windvane", accText:"Windmill Windvane", event:"Wind Farm"},
			{material:"windfarm_binoculars", accText:"Binoculars", event:"Wind Farm"},
			{material:"material_orchard_barrel", accText:"Barrel", event:"Apple Orchard"},
			{material:"material_holidaylights", accText:"Carousel Lights", event:"Holiday Carousel"},
			{material:"material_holidayticket", accText:"Carousel Ticket", event:"Holiday Carousel"},
			{material:"material_toolcabinet", accText:"Tool Cabinet", event:"Garage"},
			{material:"material_carlift", accText:"Car Lift", event:"Garage"},
			{material:"material_tirestack", accText:"Tire Stack", event:"Garage"},
			{material:"material_birthdaynoisemaker", accText:"Noise Maker", event:"CityVille 1st Birthday"},
			{material:"material_birthdaycandles", accText:"Noise Maker", event:"CityVille 1st Birthday"},
			{material:"material_birthdaycake", accText:"Cake", event:"CityVille 1st Birthday"},
			{material:"material_birthdaypopper", accText:"Poppers", event:"CityVille 1st Birthday"},
			{material:"elder3_cookie_dough_bucket", accText:"Bag of Flour", event:"Baking a Difference"},
			{material:"elder3_cookie_cutter", accText:"Cookie Cutter", event:"Baking a Difference"},
			{material:"elder3_cookie_recipe", accText:"Cookie Recipe", event:"Baking a Difference"},
			{material:"windfarm_picnic_basket", accText:"Picnic Basket", event:"Wind Farm"},
			{material:"hot_wings", accText:"Hot Wings", event:"Mini Golf"},
			{material:"quest_news_camera", accText:"News Camera",event:"Timed"},
			{material:"quest_item_hockeystick", accText:"Hockey Stick"},
			{material:"vance_stuffed_animal", accText:"Stuffed Animals", event:"Vance"},
			{material:"mittens", accText:"Mittens", event:"Timed"},
			{material:"garden_get_flower", accText:"Gift Basket", event:"Rose Garden"},
			{material:"material_trapeze", accText:"Trapeze", event:"Michael Jackson"},
			{material:"material_moonwalk", accText:"Moonwalk Shoes", event:"Michael Jackson"},
			{material:"material_neonsuit", accText:"Neon Light Suit", event:"Michael Jackson"},

			{material:"material_snowypinetree", accText:"Snowy Tree", event:"Winter 2011"},
			{material:"material_nutcracker", accText:"Nutcracker", event:"Winter 2011"},
			{material:"material_sugarplum", accText:"Sugar Plum", event:"Winter 2011"},
		];

		//now create the materials array and accept text for use later in tests
		//also create event blocks
		var materials=[], matsAccText={};
		for (var m=0,material,acc,events,len=data.length; m<len; m++) {
			material=data[m]["material"];
			acc=data[m]["accText"];
			materials.push(material);
			matsAccText[material]=acc; matsAccText["send"+material]=acc;
		}

		//now create manual accept texts for things like coins or special gets
		var accText= {
			wishlist:"Wishlist", send:"Unknown",
			coins : "Unknown Coins",goods : "Unknown Goods", xp : "Unknown XP",
			doUnknown : "Unrecognized",

			coins300:"300 coins",coins250:"250 coins",coins200:"200 coins",coins150:"150 coins",coins100:"100 coins",
			coins75:"75 coins",coins50:"50 coins",coins25:"25 coins",coins20:"20 coins",

			xp50:"50 xp",xp25:"25 xp",xp20:"20 xp",xp15:"15 xp",xp10:"10 xp",xp5:"5 xp",xp4:"4 xp",xp3:"3 xp",
			xp2:"2 xp",xp1:"1 xp",

			goods150:"150 goods",goods100:"100 goods",goods80:"80 goods",goods75:"75 goods",goods50:"50 goods",
			goods25:"25 goods",goods20:"20 goods",goods10:"10 goods",

			energy3:"3 energy",energy1:"1 energy",

			"hotel_guests5":"5 Hotel Guests",
			train:"25 Goods and a Collectible",
			flowers:"Flowers",
			shellticket:"Shell",
			carnivalticket:"Ticket",
			senddoggietreat:"Doggie Treat",
			"ticket_candy":"Candy",
			sendzoodonation:"Zoo Donation",
			sendenergy:"Energy",
			senddonut:"Donut",
		};

		//now join the accTexts above with the material accept texts we made earlier
		accText=JSONmerge(matsAccText,accText);

		var attachment={
			appID:thisAppID,
			alias:'CV',
			name:'CityVille',
			thumbsSource:'cityvillefb.static.zgncdn.com',
			flags:{},
			icon:"http://photos-f.ak.fbcdn.net/photos-ak-snc1/v27562/71/291549705119/app_2_291549705119_3378.gif",
			desc:"CityVille Sidekick",

			accText:accText, //predefined above outside the attachment section

			tests: [
				{ret:"exclude", link:["go play","send thank you gift","visit cityville","start your business"]},
				{ret:"exclude", url:["campaign_payer","action=checkInFromFeed"]},

				{ret:"wishlist", url:"neighbors.php"},

				{ret:"sendenergy",url:["energy_feed"]},
				{ret:"sendzoodonation",url:["zoo_savannah","zoo_jungle","zoo_mountain","zoo_arctic"]},
				{ret:"senddonut",url:[
					"copsNBandits_getResource","copsNBandits_getDonut","copsNBandits_capture","copsNBandits_capture_1","copsNBandits_capture_2",
					"copsNBandits_capture_3","copsNBandits_capture_4","copsNBandits_capture_5","copsNBandits_capture_6","copsNBandits_capture_7",
					"copsNBandits_capture_8","copsNBandits_capture_9","copsNBandits_capture_10","copsNBandits_capture_11",
					"copsNBandits_capture_12","copsNBandits_capture_13","copsNBandits_capture_14","copsNBandits_capture_15",
					"copsNBandits_capture_16","copsNBandits_capture_17","copsNBandits_capture_18","copsNBandits_capture_19",
					"copsNBandits_capture_20"
				]},
				{ret:"senddoggietreat",url:["animalRescue_getResource","animalRescue_capture_"]},

				{ret:"energy1",url:["daily_bonus"]},
				{ret:"energy3",url:["neighbor_visit_default","neighbor_visit_bus","neighbor_visit_build","wonder_opening_eiffel_tower"]},

				{ret:"xp1",url:[
					"level_up","level_up_01","level_up_02","level_up_03","level_up_04","level_up_05","level_up_06","level_up_07","level_up_08",
					"level_up_09","level_up_10","name_your_city","q_visit_neighbor","q_plant_and_harvest","q_collect_rent","q_place_statue",
					"q_plant_flag","q_build_post_office","q_place_town_hall","q_clear_the_forest","q_family_lodge","q_expanding_ventures",
					"q_place_hq","q_expand_further","q_please_the_citizens","q_pigeon2","q_build_school","q_place_to_play","c_prepare_shipping2",
					"c_world_tour2","c_more_billy3","c_expand_city","c_grow_pop","c_central_park_1","c_central_park_2","c_central_park_3",
					"c_state_fair3","c_more_andre1","c_more_andre3","c_prepare_capital_city","c_capitol_sports2","q_time_capsule1",
					"q_time_capsule2","neighbor_gate_quest_3","m_get_married_4","m_get_married_7"
				]},
				{ret:"xp2",url:[
					"m_fire_n_hospital_4","m_mchandsome_2","m_dating_1","m_dating_4","m_more_rita_1","m_reporter3","m_reporter6",
					"m_andre_wedding3","m_get_married_1"
				]},
				{ret:"xp3",url:["m_fire_n_hospital_1","m_more_edgar_3","qm_retail2"]},
				{ret:"xp5",url:["qm_eating_contest2","qm_storage_dau","qm_bridge_1"]},
				{ret:"xp10",url:[
					"qm_cruiseship1","qm_cruiseship2","qm_inta_food_fest2","qf_mall_construction2","qf_mall_construction3",
					"qf_mall2_construction2","qf_mall2_construction3","qm_july_411_bbq","qm_neighbor_vists_hearts","qf_carnival_quest_4",
					"qm_bastille","qm_bastille"
				]},
				{ret:"xp15",url:["spring_party_quest","qm_boat_race2","qm_july_411_bbq_2","qm_bastille_2","qm_bastille_2"]},
				{ret:"xp20",url:[
					"GovernorSaga","qm_inta_food_fest5","roll_call_checkin","qm_upgrade_neighborBUS_bakery","qm_july_411_bbq_3","qm_bastille_3",
					"qm_bastille_3","qm_vacation_4"
				]},
				{ret:"xp25",url:[
					"qm_st_pattys_1","qm_st_pattys_4","s_lorenzo_family1","s_lorenzo_family2","louise_college3","louise_college4",
					"louise_college8","s_museum_4","s_museum_5_news","s_movie_star2","qm_july_411_bbq_4","qm_green1","qm_green4"
				]},
				{ret:"xp50",url:["s_lorenzo_family3"]},


				{ret:"coins20",url:["qf_dam_1","qf_dam_2","qf_dam_3","qf_dam_4"]},
				{ret:"coins25",url:["qm_st_pattys_3","louise_college1","louise_college2","louise_college5","louise_college7","qm_zoo_2","qm_zoo_4"]},
				{ret:"coins50",url:[
					"collection_trade_in","franchise_accepted_building","franchise_removed_building","franchise_star_rating_increased",
					"franchise_grow_hq","franchise_bonus_remind_accept","news_viral","ugc_viral","completed_hotel_sailboat_low",
					"completed_tiki_social_business","completed_casino_social_business","quest_complete","q_build_neighborhood","q_move_business",
					"q_visit_neighbor4","q_mayor_prep","q_build_chateau","q_edgar_burger","q_earn_star","q_pigeon1","q_pigeon4","q_increase_pop",
					"q_rita_cont2","q_elected_mayor","c_more_billy1","c_more_billy2","c_little_italy2","c_state_fair1","c_state_fair4",
					"c_capitol_sports3","qm_xpromo_poker","qm_xpromo_frontier","qm_xpromo_farmville","qm_holiday_snow_ground",
					"qm_holiday_snowandlights","qm_holiday_winterclothes","holiday_tree1","holiday_tree2","holiday_tree3","holiday_tree4",
					"neighbor_gate_quest_1","neighbor_gate_quest_2","qm_cny1","qm_cny3","qm_storage_warehouse","qm_factory_1","qm_factory_2",
					"qm_visitor_center","qm_clerk_office","qm_rent_collector","qm_rent_collector_2","m_reporter2","m_reporter5","m_get_married_2",
					"m_get_married_5","qm_russian_ballet2","qm_russian_ballet4","s_lorenzo_family4","qm_storage_warehouse_deluxe","s_movie_star1",
					"s_movie_star4","s_movie_star5","qm_inta_food_fest1","qm_promo_kungfupanda","qm_bridge_2","qm_bridge_3","qm_bridge_5",
					"hotel_thankyou","hotel_guestCheckIn","qf_hotels","business_opening","harvest_business_mastery","q_cokezero",
					"qf_neighborhoods","qf_neighborhoods_2","qf_neighborhoods_3","qf_neighborhoods_4","qf_universities","qf_universities_2",
					"qf_universities_3","qm_promo_bbuy","qf_windarm_1"
				]},
				{ret:"coins75",url:["m_fire_n_hospital_5","vday2011_achievements_brag"]},
				{ret:"coins100",url:[
					"m_fire_n_hospital_2","m_mchandsome_3","m_dating_2","m_more_rita_3","m_andre_wedding1","qm_inta_food_fest4",
					"qf_mall_construction","qf_mall2_construction","qf_ticket_booth","qm_boat_race","qm_green3","qf_hotels_3","qm_vacation_2",
					"qm_vacation_3","qm_stadiums_baseball","qm_stadiums_soccer","c_rusty_gets_lost2","c_rusty_gets_lost4"
				]},
				{ret:"coins150",url:[
					"m_dating_5","m_more_edgar_2","m_more_edgar_4","qf_mall_construction4","qf_mall2_construction4","qf_carnival_quest"
				]},
				{ret:"coins200",url:["qm_eating_contest3","qm_boat_race4","qm_boat_race5","qf_hotels_4"]},
				{ret:"coins250",url:[
					"s_museum_2","qf_mall_construction5","qf_mall2_construction5","qf_hotels_5","q_governor_run_act2_student_1",
					"q_governor_run_act2_student_2","q_governor_run_act2_student_3","q_governor_run_act2_student_4","q_governor_run_toy_1",
					"q_governor_run_toy_2","q_governor_run_toy_3"
				]},
				{ret:"coins300",url:["qm_cruiseship3","qm_cincodemayo_2","qf_carnival_quest_3"]},


				{ret:"goods10",url:["qf_crop_mastery"]},
				{ret:"goods20",url:[
					"reputation_level_up","neighbor_visit_crops","neighbor_visit_ships","act_governor_1","q_build_business_guide",
					"qm_upgrade_business","q_train1","q_train2","q_train3","q_train4","q_family_feast","q_more_businesses","q_scout_competition",
					"q_rita_garden","q_steady_income","q_pigeon3","q_rita_cont1","q_safety_first","c_prepare_shipping1","c_world_tour1",
					"c_world_tour3","c_world_tour4","c_more_billy4","c_little_italy1","c_little_italy3","c_state_fair2","c_more_andre2",
					"c_capitol_sports1","qm_cny2","m_reporter1","qm_marathonTimed1","qm_attractionTimed"
				]},
				{ret:"goods25",url:[
					"qm_retail1","m_reporter4","m_get_married_6","qm_st_pattys_2","qm_st_pattys_5","qm_russian_ballet1","qm_russian_ballet3",
					"s_museum","s_museum_3","s_museum_7","qm_eating_contest1","qm_eating_contest4","qm_eating_contest5","qm_zoo_1","qm_zoo_3",
					"qm_zoo_5","s_movie_star3","qm_inta_food_fest3","qf_hotels_2"
				]},
				{ret:"goods50",url:[
					"franchise_declined_building","m_fire_n_hospital_3","m_mchandsome_1","m_mchandsome_4","c_rusty_gets_lost1",
					"c_rusty_gets_lost3","c_rusty_gets_lost5","qm_hardware1","vday2011_admirer_brag","qm_retail3","m_get_married_3",
					"qm_cruiseship_dock","qm_bridge_4","qm_green2","qm_odd_day_zoo","qm_odd_day_zoo2","qm_odd_day_zoo3","qm_odd_day_rusty",
					"qm_odd_day_rusty2","qm_odd_day_rusty3","qm_odd_day_rusty4","qm_landmark_sailboat_hotel","qf_tikisocial","qf_casinosocial",
					"qt_tourdecity","qm_remodeling","qm_remodeling_res_simpsonmegabrick_mushroom","qm_remodeling_res_aptcomplex_mushroom",
					"qf_beach_carnival_quest","qf_beach_carnival_quest_2","qf_beach_carnival_quest_3","qf_beach_carnival_quest_4","qt_outdoorhike",
					"qm_vacation_1","qm_beach_fun","qm_beach_fun2","qm_beach_fun3","qm_beach_fun4","qt_outdoorbirding","qf_enrique_1",
					"qf_enrique_2","q_governor_run_act2_nature_1","q_governor_run_act2_nature_2","q_governor_run_act2_nature_3",
					"q_governor_run_family_1","q_governor_run_family_2","q_governor_run_family_3","q_governor_run_rita_1","q_governor_run_rita_2",
					"q_governor_run_rita_3","q_petshow2","qf_gardens","qf_gardens_2","qf_gardens_3","qf_gardens_4","qm_back_to_school",
					"qm_back_to_school2","qm_back_to_school3","qm_back_to_school4","qm_clown","qm_clown_2","qm_clown_3","qm_clown_4",
					"qt_outdoorfishing","qt_outdoorrafting","qt_superdeco"
				]},
				{ret:"goods75",url:["m_dating_3","m_more_rita_2","m_more_rita_4","m_more_edgar_1","m_andre_wedding2"]},
				{ret:"goods80",url:["qm_arctic_zoo"]},
				{ret:"goods100",url:["m_dating_6","qm_cincodemayo_1","qm_boat_race3","crop_mastery_share_goods"]},
				{ret:"goods150",url:["qf_mall_construction6","qf_mall2_construction6","qf_carnival_quest_2"]},

				{ret:"hotel_guests5",url:["hotel_checkin","hotel_checkin","hotel_grantvip","hotel_checkin"]},

				{ret:"flowers",url:"garden_get_flower"},
				{ret:"carnivalticket",url:["ticket_carnival","ticket_carnival_share","ticket_carnival_level","ticket_carnival_5"]},
				{ret:"shellticket",url:["ticket_shell","ticket_shell_share","ticket_shell_level","ticket_shell_5"]},

				{ret:"train",url:["qm_train_1","qm_train_2","qm_train_3","qm_train_4"]},

				//catch send material links using mass materials list
				{url:"{%1}",subTests:materials,ret:"send{%1}"},

				//fallbacks incase other tests didnt pick something up
				{link:"{%1}",subTests:["send","coins","xp","goods"],ret:"{%1}"},
			],

			menu: {				
				section_main:{type:"section",label:"CityVille Manager Options ("+version+")",kids:{
				updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/"+thisScriptID+".user.js"},
				sep:{type:"separator",label:"Basics",kids:{
					coinblock:{type:"optionblock",label:"Coins:",kids:{
						coins300:{type:"checkbox",label:"300"},
						coins250:{type:"checkbox",label:"250"},
						coins200:{type:"checkbox",label:"200"},
						coins150:{type:"checkbox",label:"150"},
						coins100:{type:"checkbox",label:"100"},
						coins75:{type:"checkbox",label:"75"},
						coins50:{type:"checkbox",label:"50"},
						coins25:{type:"checkbox",label:"25"},
						coins20:{type:"checkbox",label:"20"},
						coins:{type:"checkbox",label:"??"},
					}},
					xpblock:{type:"optionblock",label:"XP:",kids:{
						xp50:{type:"checkbox",label:"50"},
						xp25:{type:"checkbox",label:"25"},
						xp20:{type:"checkbox",label:"20"},
						xp15:{type:"checkbox",label:"15"},
						xp10:{type:"checkbox",label:"10"},
						xp5:{type:"checkbox",label:"5"},
						xp4:{type:"checkbox",label:"4"},
						xp3:{type:"checkbox",label:"3"},
						xp2:{type:"checkbox",label:"2"},
						xp1:{type:"checkbox",label:"1"},
						xp:{type:"checkbox",label:"??"},
					}},
					goodsblock:{type:"optionblock",label:"Goods:",kids:{
						goods150:{type:"checkbox",label:"150"},
						goods100:{type:"checkbox",label:"100"},
						goods80:{type:"checkbox",label:"80"},
						goods75:{type:"checkbox",label:"75"},
						goods50:{type:"checkbox",label:"50"},
						goods25:{type:"checkbox",label:"25"},
						goods20:{type:"checkbox",label:"20"},
						goods10:{type:"checkbox",label:"10"},
						goods:{type:"checkbox",label:"??"},
					}},
					energyblock:{type:"optionblock",label:"Energy:",kids:{
						energy3:{type:"checkbox",label:"3"},
						energy1:{type:"checkbox",label:"1"},
					}},

					hotel_guests5:{type:"checkbox",label:"5x Hotel Guests"},
					loot:{type:"checkbox",label:"Random Loot"},
					flowers:{type:"checkbox",label:"Flowers"},
					train:{type:"checkbox",label:"Train Bonus: 25 goods and a rare collectible"},
					doUnknown:{type:"checkbox",label:"Process Unknown Links"},
				}},

				help:{type:"separator",label:"Help Friends",kids:{
					sendall:{type:"checkbox",label:"Send on all requests (or pick from specifics below)"},
					sendenergy:{type:"checkbox",label:"Energy"},
					sendzoodonation:{type:"checkbox",label:"Zoo Donation"},
					senddonut:{type:"checkbox",label:"Donut"},
					senddoggietreat:{type:"checkbox",label:"Doggie Treat"},
					//materials:{type:"optionblock",label:"Materials and Goal Items:",kids:menuFromArray(materials, accText,"send")}
				}}//end separator
				}}//end section
			}//end menu
		};

		menuFromData(data, attachment.menu["section_main"].kids.help.kids);

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisAppID,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);

		//cleanup
		doorMark=null; data=null; materials=null; matAccText=null; accText=null; attachment=null; attString=null;


	};

	function run(){
			// check that we are in the overlay window
			//try{if (!unsafeWindow.location.href.find('overlayed=true')) return;}
			//catch(e){window.setTimeout(run,500);return;}

			try{
				var statusCode=0;
				var doc=document.documentElement;
				var text=doc.textContent;
				var html=doc.innerHTML;
				var gameLoaded=unsafeWindow.location.href.startsWith('http://fb-0.cityville.zynga.com/flash.php?');
			} catch(e){window.setTimeout(run,500);return;}

			//check page for various texts
			if (text.find("already claimed"))statusCode=-6; //already claimed
			else if (text.find("already accepted"))statusCode=-6;  //already claimed train
			else if (text.find('reached your reward limit'))statusCode=-3; //over limit
			else if (text.find('Your inventory cannot hold any more of this item!'))statusCode=-3;  //over limit
			else if (text.find('You have exceeded your daily limit of gifts'))statusCode=-3; //all daily limit reached
			else if (text.find('Here is one as a reward'))statusCode=1;  //success send one get one
			else if (text.find("Here's a reward of"))statusCode=1;  //success send
			else if (text.find('You just got'))statusCode=1;  //success get
			else if (text.find('train has arrived. You received'))statusCode=1; //success get train
			else if (text.find('You gave '))statusCode=1;  //success give/get one
			else if (text.find('all the rewards have been claimed'))statusCode=-2;  //out of rewards
			else if (text.find('The train has already finished its trip'))statusCode=-2;  //out of rewards train

			else if (text.find('you need to reach a higher level before using this reward'))statusCode=-13;  //level too low to claim
			else if (text.find('You cannot accept this reward'))statusCode=-1;  //data missing error
			else if (text.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error
			else if (text.find('This kind of gift is no longer available'))statusCode=-1;  //expired seasonal type
			else if (text.find("You can't send yourself a gift!"))statusCode=-1;  //send self error			
			else if (text.find('This gift is no longer available.'))statusCode=-1;  //generic expired
			else if (text.find('has expired'))statusCode=-1;  //generic expired
			else if (text.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error

			else if (text.find('Start building your attractions today'))statusCode=-13; //requirements not met
			
			//else if (gameLoaded)statusCode=-1; //game loaded unexpectedly, not wanted, uncommenting this line causes problems
			//else if (text.find('CityVille has been enhanced'))statusCode=-1;  //version change, uncommenting this line causes problems

			else if (text.textContent=="")statusCode=-5;  //no document body

			//multi-lingual checking, but status codes are very limited
			else if (html.find('giftConfirm_img'))statusCode=1
			else if (html.find('notAccepted'))statusCode=-1; 
			else if (html.find('train_accepted'))statusCode=1; 
			else if (html.find('train_message'))statusCode=-1;  //assumes since no good message, train failed
			else if (html.find("div class=\"notAccepted\"")) statusCode=-1; //generic fail
			else if (html.find("div class=\"main_giftConfirm\"")) statusCode = 1; //generic accept
			
			if (statusCode!=0) sendMessage("status="+statusCode);
			else {
				if(!defaultTO) defaultTO = window.setTimeout(function(){
					var html = document.documentElement.innerHTML;
					if (html.find("div class=\"playButton\"")) sendMessage("status=-15");
				},10000);
				window.setTimeout(run,500);
			}
	};

	if (window.location.hostname=='www.facebook.com') {
		dock();
		return;
	}
	run();

})(); // anonymous function wrapper end