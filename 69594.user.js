// ==UserScript==
// @name           Chuck A Crap
// ==/UserScript==



/*************************************************************************
ChuckACrap V1.0 released 18, December 2009
Author : Arun Nava

Parts of this code are gotten from Spockholm's RepeatGift tool specifically 
the part where we check for http response states in the state_change method.

His script can be found at www.spockholm.com/mafia/bookmarklets.php

Got the idea for Unframing from the UnframeMW bookmarlet written by Vern

But my code is different so it may not work the same.

/**************************************************************************

ChuckACrap V1.0b released 23, December 2009

Features : 
>Choosing receiver from either profile page or list box
>Fixed refreshing of page by pressing the close button


*************************************************************************/

/**************************************************************************

ChuckACrap V2.0 released 19, January 2009

Features : 
>Quantity fetching not done for each item separately and changed to POST instead of GET
>Improved UI
>Forced 2 second delay
>Alphabetical Sorting of Loot and boosts and categorizing of Collection items by city and collection type
>Hangup recovery code added for quantity fetching and gifting


*************************************************************************/


javascript:(function(){






//	Frame name is mafia wars, check if it exists
	var frame=document.getElementsByName('mafiawars');


//	If it does, break it, Zynga likes to break stuff, so will we

	if(frame.length>0 || (!frame)){
		if(confirm('You need to break out the mw-frame first.\nPress OK to do it now.')){
			window.location.href=document.getElementsByName('mafiawars')[0].src;
			return;
		}
	}
//	Already broken ? Add the scrollbar and stop the damn window from shrinking like a dried up prune

	else{
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		if(typeof FB!='undefined'){
			FB.CanvasClient.stopTimerToSizeToContent;
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer=-1;
		}
	}

	var delay=2, gifts=1, gift_Id, gift_Cat, gift_Category, url, gifts_sent=0, stop=true, gift_key;
	var xmlHTTP,xmlHTTP_quantity, xmlHTTP_sigupdate;
	var exit_gifter=false;
	var gift_text;
	
	var tempX=0;
	var tempY=0;
	
	var qty_item_id;

	var item_qty;
	var qty_updated='false';

	var item_amounts;
	
	var sf_xw_sig,cb,temp;
	var gift_list=[];
	
	var send_hangup_timer;
	var qty_hangup_timer;
	var hangup_flag='false';
	var before_hangqty;
	var after_hangqty;
	var hangup_tries=0;
	
	var count=0,i=0;
	var profile_link;
	var split_profile_link, receiver_profile_id, sender_profile_id;

	sender_profile_id = /sf_xw_user_id=([0-9a-b]+)/.exec(document.body.innerHTML)[1];

	var first_time=true;



	try{
		document.getElementById("content_row").removeChild(document.getElementById("gifter_div"));
	}
	catch(err){}

	var content=document.getElementById('content_row');
	var gifter_div=document.createElement("div");
	gifter_div.id='gifter_div';


//	var gifter_window = document.getElementById("popup_fodder");

	var error_window='<table class="sexy_error_table" width=100% id="errormsg" border=2 rules=none bgcolor="black"></table><br>';

//	gifter_window.innerHTML = styles+error_window;
	
	var receiver_user_id;
	
var cuba_collection ='<option disabled style="color:rgb(255, 217, 39);"><< CUBAN COLLECTIONS >>'+
			'<option disabled style="color:#33FF00;"><< RUM DRINKS COLLECTION >>'+
			'<option value=2001>Pina Colada'+
			'<option value=2002>Hurricane'+
			'<option value=2003>Bahama Mama'+
			'<option value=2004>Mojito'+
			'<option value=2005>Rum Runner'+
			'<option value=2006>Long island Ice Tea'+
			'<option value=2007>Cuba Libre'+
			'<option disabled style="color:#33FF00;"><< TROPICAL FRUITS COLLECTION >>'+
			'<option value=2008>Banana'+
			'<option value=2009>Lime'+
			'<option value=2010>Pineapple'+
			'<option value=2011>Papaya'+
			'<option value=2012>Coconut'+
			'<option value=2013>Passion Fruit'+
			'<option value=2014>Dragon Fruit'+
			'<option disabled style="color:#33FF00;"><< ENTERTAINERS COLLECTION >>'+
			'<option value=2015>Magician'+
			'<option value=2016>Fan Dancer'+
			'<option value=2017>Comedian'+
			'<option value=2018>Band Leader'+
			'<option value=2019>Cabaret Singer'+
			'<option value=2020>Crooner'+
			'<option value=2021>Burlesque Dancer'+
			'<option disabled style="color:#33FF00;"><< TROPICAL FISH COLLECTION >>'+
			'<option value=2022>Pufferfish'+
			'<option value=2023>Sergeant Major'+
			'<option value=2024>Yellowtail Snapper'+
			'<option value=2025>Great Barracuda'+
			'<option value=2026>Queen Angelfish'+
			'<option value=2027>Reef Shark'+
			'<option value=2028>Blue Marlin'+
			'<option disabled style="color:#33FF00;"><< BEARDS COLLECTION >>'+
			'<option value=2029>Garibaldi'+
			'<option value=2030>Hulihee'+
			'<option value=2031>Vandyke'+
			'<option value=2032>Mutton Chops'+
			'<option value=2033>Soul Patch'+
			'<option value=2034>French Fork'+
			'<option value=2035>Fidel';

var ny_collection='<option disabled style="color:rgb(255, 217, 39);"><< NEW YORK COLLECTION >>'+
			'<option disabled style="color:#33FF00;"><< DIAMOND FLUSH COLLECTION >>'+
			'<option value=1036>Eight of Diamonds'+
			'<option value=1037>Nine of Diamonds'+
			'<option value=1038>Ten of Diamonds'+
			'<option value=1039>Jack of Diamonds'+
			'<option value=1040>Queen of Diamonds'+
			'<option value=1041>King of Diamonds'+
			'<option value=1042>Ace of Diamonds'+
			'<option disabled style="color:#33FF00;"><< HEART FLUSH COLLECTION >>'+
			'<option value=1043>Eight of Hearts'+
			'<option value=1044>Nine of Hearts'+
			'<option value=1045>Ten of Hearts'+
			'<option value=1046>Jack of Hearts'+
			'<option value=1047>Queen of Hearts'+
			'<option value=1048>King of Hearts'+
			'<option value=1049>Ace of Hearts'+
			'<option disabled style="color:#33FF00;"><< SCULPTURES COLLECTION >>'+
			'<option value=1022>Rat Sculpture'+
			'<option value=1023>Sheep Sculpture'+
			'<option value=1024>Rooster Sculpture'+
			'<option value=1025>Monkey Sculpture'+
			'<option value=1026>Tiger Sculpture'+
			'<option value=1027>Snake Sculpture'+
			'<option value=1028>Dragon Sculpture'+
			'<option disabled style="color:#33FF00;"><< POKER CHIPS COLLECTION >>'+
			'<option value=1029>White Poker Chip'+
			'<option value=1030>Brown Poker Chip'+
			'<option value=1031>Red Poker Chip'+
			'<option value=1032>Blue Poker Chip'+
			'<option value=1033>Green Poker Chip'+
			'<option value=1034>Purple Poker Chip'+
			'<option value=1035>Gold Poker Chip'+
			'<option disabled style="color:#33FF00;"><< CLUB FLUSH COLLECTION >>'+
			'<option value=1050>Eight of Clubs'+
			'<option value=1051>Nine of Clubs'+
			'<option value=1052>Ten of Clubs'+
			'<option value=1053>Jack of Clubs'+
			'<option value=1054>Queen of Clubs'+
			'<option value=1055>King of Clubs'+
			'<option value=1056>Ace of Clubs'+
			'<option disabled style="color:#33FF00;"><< BOXING COLLECTION >>'+
			'<option value=1085>Hand Tape'+
			'<option value=1086>Gloves'+
			'<option value=1087>Headgear'+
			'<option value=1088>Boxing Trunks'+
			'<option value=1089>Speed Bag'+
			'<option value=1090>Heavy Bag'+
			'<option value=1091>Boxing Ring'+
			'<option disabled style="color:#33FF00;"><< CIGARS COLLECTION >>'+
			'<option value=1001>Ebony Cigar'+
			'<option value=1002>Sky Cigar'+
			'<option value=1003>Rose Cigar'+
			'<option value=1004>Ivory Cigar'+
			'<option value=1005>Turquoise Cigar'+
			'<option value=1006>Gold Cigar'+
			'<option value=1007>Royal Cigar'+
			'<option disabled style="color:#33FF00;"><< SPADE FLUSH COLLECTION >>'+
			'<option value=1057>Eight of Spades'+
			'<option value=1058>Nine of Spades'+
			'<option value=1059>Ten of Spades'+
			'<option value=1060>Jack of Spades'+
			'<option value=1061>Queen of Spades'+
			'<option value=1062>King of Spades'+
			'<option value=1063>Ace of Spades'+
			'<option disabled style="color:#33FF00;"><< BILLIARDS COLLECTION >>'+
			'<option value=1092>One Ball'+
			'<option value=1093>Two Ball'+
			'<option value=1094>Three Ball'+
			'<option value=1095>Four Ball'+
			'<option value=1096>Five Ball'+
			'<option value=1097>Cue Ball'+
			'<option value=1098>Eight Ball'+
			'<option disabled style="color:#33FF00;"><< RINGS COLLECTION >>'+
			'<option value=1008>Topaz Ring'+
			'<option value=1009>Opal Ring'+
			'<option value=1010>Amethyst Ring'+
			'<option value=1011>Emerald Ring'+
			'<option value=1012>Sapphire Ring'+
			'<option value=1013>Ruby Ring'+
			'<option value=1014>Diamond Ring'+
			'<option disabled style="color:#33FF00;"><< TIES COLLECTION >>'+
			'<option value=1064>Solid Tie'+
			'<option value=1065>Striped Tie'+
			'<option value=1066>Checked Tie'+
			'<option value=1067>Geometric Tie'+
			'<option value=1068>Dot Tie'+
			'<option value=1069>Paisley Tie'+
			'<option value=1070>Knitted Tie'+
			'<option disabled style="color:#33FF00;"><< PAINTINGS COLLECTION >>'+
			'<option value=1015>Warhol Painting'+
			'<option value=1016>Cezanne Painting'+
			'<option value=1017>Matisse Painting'+
			'<option value=1018>Van Gogh Painting'+
			'<option value=1019>Dali Painting'+
			'<option value=1020>Monet Painting'+
			'<option value=1021>Rembrandt Painting'+
			'<option disabled style="color:#33FF00;"><< CUFFLINKS COLLECTION >>'+
			'<option value=1071>Silver Cufflinks'+
			'<option value=1072>Gold Cufflinks'+
			'<option value=1073>Amber Cufflinks'+
			'<option value=1074>Jasper Cufflinks'+
			'<option value=1075>Agate Cufflinks'+
			'<option value=1076>Onyx Cufflinks'+
			'<option value=1077>Pearl Cufflinks'+
			'<option disabled style="color:#33FF00;"><< BARBER COLLECTION >>'+
			'<option value=1099>Barber Pole'+
			'<option value=1100>Razor'+
			'<option value=1101>Brush'+
			'<option value=1102>Seat'+
			'<option value=1103>Towel'+
			'<option value=1104>Scissors'+
			'<option value=1105>Cream'+
			'<option disabled style="color:#33FF00;"><< GREAT RACE HORSES COLLECTION >>'+
			'<option value=1078>Mill Reef'+
			'<option value=1079>Sea Bird'+
			'<option value=1080>Arkle'+
			'<option value=1081>Golden Miller'+
			'<option value=1082>St Simon'+
			'<option value=1083>Ormonde'+
			'<option value=1084>Eclipse'+
			'<option disabled style="color:#33FF00;"><< MONEY LAUNDERING COLLECTION >>'+
			'<option value=1113>Money Iron'+
			'<option value=1114>Dirty Laundry'+
			'<option value=1115>Dryer Sheets'+
			'<option value=1116>Money Line'+
			'<option value=1117>Roll of Quarters'+
			'<option value=1118>Death by Detergent'+
			'<option value=1119>Dirty Bra';

var moscow_collection='<option disabled style="color:rgb(255, 217, 39); font-size=25px;"><< MOSCOW COLLECTION >>'+
			'<option disabled style="color:#33FF00;"><< PRISON TATTOOS COLLECTION >>'+
			'<option value=3001>Rose Tattoo'+
			'<option value=3002>Church Tattoo'+
			'<option value=3003>Star Tattoo'+
			'<option value=3004>Spider Tattoo'+
			'<option value=3005>Tiger Tattoo'+
			'<option value=3006>Skull Tattoo'+
			'<option value=3007>Crucifix Tattoo'+
			'<option disabled style="color:#33FF00;"><< MATRYOSHKA DOLLS COLLECTION >>'+
			'<option value=3008>Natalya\'s Doll'+
			'<option value=3009>Olga\'s Doll'+
			'<option value=3010>Oksana\'s Doll'+
			'<option value=3011>Svetlana\'s Doll'+
			'<option value=3012>Tatyana\'s Doll'+
			'<option value=3013>Anastasiya\'s Doll'+
			'<option value=3014>Ekaterina\'s Doll'+
			'<option disabled style="color:#33FF00;"><< RUSSIAN LEADERS COLLECTION >>'+
			'<option value=3015>Medal of Gorbachev'+
			'<option value=3016>Medal of Yeltsin'+
			'<option value=3017>Medal of Brezhnev'+
			'<option value=3018>Medal of Kruschev'+
			'<option value=3019>Medal of Putin'+
			'<option value=3020>Medal of Stalin'+
			'<option value=3021>Medal of Lenin'+
			'<option disabled style="color:#33FF00;"><< VODKA DRINKS COLLECTION >>'+
			'<option value=3022>Cosmopolitan'+
			'<option value=3023>Screwdriver'+
			'<option value=3024>Sex on the Beach'+		
			'<option value=3025>Bloody Mary'+
			'<option value=3026>Black Russian'+
			'<option value=3027>White Russian'+
			'<option value=3028>Soviet'+
			'<option disabled style="color:#33FF00;"><< SOVIET MEMORABILIA COLLECTION >>'+
			'<option value=3029>Red Star'+
			'<option value=3030>Kremlin'+
			'<option value=3031>Communist Manifesto'+
			'<option value=3032>Propaganda Poster'+
			'<option value=3033>Hammer'+
			'<option value=3034>Sickle'+
			'<option value=3035>Bust of Lenin'+
			'<option disabled style="color:#33FF00;"><< FABERGE EGGS COLLECTION >>'+
			'<option value=3036>Diamond Trellis Egg'+
			'<option value=3037>Jade Egg'+
			'<option value=3038>Military Egg'+
			'<option value=3039>Pansy Egg'+
			'<option value=3040>Rainbow Egg'+
			'<option value=3041>Winter Egg'+
			'<option value=3042>Peter the Great Egg';

var bangkok_collections='<option disabled style="color:rgb(255, 217, 39); font-size=25px;"><< BANGKOK COLLECTIONS >>'+
			'<option disabled style="color:#33FF00;"><< CHESS SET COLLECTION >>'+
			'<option value=4001>Chessboard'+
			'<option value=4002>Pawn'+
			'<option value=4003>Knight'+
			'<option value=4004>Bishop'+
			'<option value=4005>Rook'+
			'<option value=4006>Queen'+
			'<option value=4007>King'+
			'<option disabled style="color:#33FF00;"><< MASKS COLLECTION >>'+
			'<option value=4008>Agat-Talai\'s Mask'+
			'<option value=4009>Sukreep\'s Mask'+
			'<option value=4010>Palee\'s Mask'+
			'<option value=4011>Phra Ram\'s Mask'+
			'<option value=4012>Indrachit\'s Mask'+
			'<option value=4013>Hanuman\'s Mask'+
			'<option value=4014>Tosakanth\'s Mask'+
			'<option disabled style="color:#33FF00;"><< SPICES COLLECTION >>'+
			'<option value=4015>Corianger'+
			'<option value=4016>Garlic'+
			'<option value=4017>Turmeric'+
			'<option value=4018>Green Peppercorn'+
			'<option value=4019>Holy Basil'+
			'<option value=4020>Lemongrass'+
			'<option value=4021>Thai Chili'+
			'<option disabled style="color:#33FF00;"><< CARVINGS COLLECTION >>'+
			'<option value=4022>Wall Carving'+
			'<option value=4023>Floral Statue'+
			'<option value=4024>Dragon Statue'+
			'<option value=4025>Decorative Nightstand'+
			'<option value=4026>Lotus Bloom'+
			'<option value=4027>Rearing Elephant'+
			'<option value=4028>Stone Buddha'+
			'<option disabled style="color:#33FF00;"><< ORCHIDS COLLECTION >>'+
			'<option value=4029>Marco Polo'+
			'<option value=4030>Grace Pink'+
			'<option value=4031>Misteen'+
			'<option value=4032>Jade Siam'+
			'<option value=4033>Bom Gold'+
			'<option value=4034>Bom Blue'+
			'<option value=4035>Fatima';


var ny_loot='<Option value=1>.22 Pistol'+
		'<Option value=5>.45 Revolver'+
		'<Option value=15>.50 Caliber Rifle'+
		'<Option value=4>9mm Semi-Automatic'+
		'<Option value=202>Aquila HV .50 Sniper Rifle'+
		'<Option value=1028>Arktichekij Gus'+
		'<Option value=1014>Armored Briefcase'+
		'<Option value=16>Armored Car'+
		'<Option value=77>Armored Limousine'+
		'<option value=183>Armored State Car'+
		'<Option value=11>Armored Truck'+
		'<Option value=201>ASC45 \'Conquistador\''+
		'<Option value=1500>Attack Cobra'+
		'<Option value=9>Automatic Rifle'+
		'<Option value=73>BA-12 Assault Rifle'+
		'<Option value=1002>Ballistic Knife'+
		'<Option value=1012>Bank Guard Uniform'+
		'<option value=223>Bayonet'+
		'<Option value=65>Blackmail Photos'+
		'<Option value=18>Bodyguards'+
		'<Option value=71>Bookie\'s Holdout Pistol'+
		'<Option value=1523>Bosozoku Convertible'+
		'<Option value=3>Brass Knuckles'+
		'<Option value=1509>BRM-38'+
		'<Option value=2>Butterfly Knife'+
		'<Option value=7>C4'+
		'<Option value=205>Camouflage Body Armor'+
		'<Option value=198>Cane Knife'+
		'<option value=229>Cannon'+
		'<Option value=261>Canonazo'+
		'<Option value=1007>Cherepakha Compact'+
		'<Option value=67>Chopper'+
		'<Option value=176>Chucho FAV'+
		'<Option value=179>Cigarette Boat'+
		'<Option value=63>Computer Set-Up'+
		'<Option value=62>Concealable Camera'+
		'<option value=225>Davy Crockett Hat'+
		'<Option value=1521>Dirt Bike'+
		'<Option value=1010>Dossier on Dmitri'+
		'<Option value=1535>Drug Shipment'+
		'<Option value=1537>Envelope of Thai Baht'+
		'<Option value=1026>Executive Overcoat'+
		'<Option value=74>Falsified Documents'+
		'<Option value=78>Federal Agent'+
		'<Option value=61>Firebomb'+
		'<option value=222>Flintlock Pistols'+
		'<Option value=200>Gaff Hook'+
		'<Option value=194>Garza 9'+
		'<option value=326>Ghost Thug'+
		'<Option value=14>Grenade Launcher'+
		'<Option value=174>Guerrilla Squad'+
		'<Option value=70>GX-9'+
		'<option value=182>Hu-9 Helicopter'+
		'<Option value=68>Illegal Transaction Records'+
		'<Option value=1502>Jade Inlaid Pistols'+
		'<Option value=1033>Klyk-9 Machine Pistol'+
		'<Option value=1029>Konstantin Cargo Carrier'+
		'<Option value=60>Lucky Shamrock Medallion'+
		'<Option value=69>Luxury Yacht'+
		'<Option value=196>M16A1'+
		'<Option value=1025>Mansion Details'+
		'<Option value=175>Mara Serpiente'+
		'<Option value=180>Mini Sub'+
		'<Option value=1000>Molotok Pistol'+
		'<Option value=178>Montaine 320'+
		'<Option value=1512>Muai Thai Bodyguard'+
		'<Option value=72>Multi-Purpose Truck'+
		'<option value=226>Musket'+
		'<option value=327>Mystery Van'+
		'<Option value=20>Napalm'+
		'<Option value=19>Night Vision Goggles'+
		'<Option value=177>Ocelot Armored Truck'+
		'<Option value=1018>Officer Corps Paycheck'+
		'<Option value=1021>Orel Armored Helicopter'+
		'<Option value=1027>Osa 17 Snowmobile'+
		'<Option value=199>Para 322'+
		'<Option value=1011>Photos of Karpov'+
		'<Option value=1536>Pirates'+		
		'<Option value=1005>PNV'+
		'<Option value=76>Police Cruiser'+
		'<Option value=245>Politico Corrupto'+
		'<Option value=66>Prop Plane'+
		'<Option value=75>Private Jet'+
		'<Option value=195>RA-92'+
		'<Option value=1003>RAS-15'+
		'<Option value=1022>Razoritel Grenade Launcher'+
		'<option value=228>Red Coat'+
		'<Option value=1519>Riding Elephant'+
		'<Option value=1515>Royal Thai Army Beret'+
		'<Option value=17>RPG Launcher'+
		'<Option value=197>Ru-38 Pistol'+
		'<Option value=1019>Ru-78 Heavy Machine Gun'+
		'<Option value=1001>RU-7 .45 Pistol'+
		'<option value=227>Saber'+
		'<Option value=1534>Satellite Phone'+
		'<Option value=10>Semi-Automatic Shotgun'+
		'<Option value=1008>Severnyy Olen Snowbike'+
		'<Option value=1017>Shchuka Speed Boat'+
		'<Option value=1020>Shturmovik'+
		'<Option value=181>Si-14 Cargo Plane'+
		'<Option value=1513>Silk Scarf'+
		'<Option value=8>Stab-Proof Vest'+
		'<Option value=1024>Stick of Dynamite'+
		'<Option value=204>Street Gang Member'+
		'<Option value=6>Tactical Shotgun'+
		'<Option value=1013>Taiga Combat Shotgun'+
		'<Option value=203>TNT'+
		'<Option value=262>Track Loader'+
		'<Option value=466>Treasure Chest'+
		'<option value=328>Treat Bag'+
		'<option value=224>Tri-Point Hat'+
		'<Option value=1032>Ubijka Assault Rifle'+
		'<Option value=64>Untraceable Cell Phone'+
		'<Option value=1016>Volk Luxury Sedan'+
		'<Option value=1034>Zmeya Carbon Blade'+
		'<Option value=1030>Zoloto Sports Car';

//var cuba_loot=;

//var moscow_loot=;

//var july_loot=;

//var halloween_loot=;

var boosts='<option value=3>Alarm System'+
		'<option value=43>Berlin Wall Section'+
		'<option value=56>Black Market Ammo'+
		'<option value=19>Blowfish Dart'+
		'<option value=10>Blueprints'+
		'<option value=46>Bola'+
		'<option value=17>Boosted Smoothie'+
		'<option value=9>Bouncer'+
		'<option value=55>Boutonniere'+
		'<option value=33>Boxer'+
		'<option value=4>Bulldog'+
		'<option value=34>Bullmastiff'+
		'<option value=2>Cappuccino'+
		'<option value=50>Champagne Bottle'+
		'<option value=51>Chess Master'+
		'<option value=54>Chisel'+
		'<option value=13>Corporate Muscle'+
		'<option value=25>Extra Pair of Eyes'+
		'<option value=44>Faberge Hen'+
		'<option value=7>Fixer'+
		'<option value=16>Flaming Shot'+
		'<option value=39>Free Ride'+
		'<option value=30>Handy Man'+
		'<option value=29>Hidden Matryoshka'+
		'<option value=20>Hobo Lookout'+
		'<option value=32>Hollow Points'+
		'<option value=26>Hot Coffee'+
		'<option value=57>Hyper Alert Sentry'+
		'<option value=11>Injunction'+
		'<option value=15>Inside Tip'+
		'<option value=42>Liquid Courage'+
		'<option value=36>Lookout'+
		'<option value=45>Money Sock'+
		'<option value=12>Motion Detector'+
		'<option value=35>Mr. Hot Sauce'+
		'<option value=27>Mutt'+
		'<option value=53>Pepper Spray'+
		'<option value=41>Political Favor'+
		'<option value=5>Problem Solver'+
		'<option value=37>Reinforced Door'+
		'<option value=18>Sandbag Wall'+
		'<option value=6>Semi-Pro Boxer'+
		'<option value=14>Shave & A Haircut'+
		'<option value=8>Sting Grenade'+
		'<option value=38>Surveillance Camera'+
		'<option value=28>Temporary Tattoo'+
		'<option value=31>Throwing Knives'+
		'<option value=1>Tripwire'+
		'<option value=40>Truck Driver'+
		'<option value=52>War Paint';


//	temp = /&tmp=([0-9a-f]+)/.exec(document.body.innerHTML);

/*	var styles='<style type="text/css">'+
		'.sexy_table1{font-family:"Berlin Sans FB"; font-size:1.1em; padding-left:10px; color:white}'+
		'.sexy_error_table{font-family:"Berlin Sans FB"; font-size:1em; color:red; padding-left:10px}'+
		'.sexy_select{border: 0.2px solid #FFF; background-color:black; font-family:"Berlin Sans FB"; width:11em; font-size:1.1em; color:white}'+
		'.sexy_input{background-color:black; color:white; font-family:"Berlin Sans FB"; width:10.6em; font-size:1.1em; border: 1px solid #FFF; padding-left:0.2em}'+
		'.sexy_start_gift{background:url("http://arun-nav.yolasite.com/resources/CrapChuckImg/startsend.bmp") no-repeat 0px 0px; height:30px; border-width:1px; width:180px;}'+
		'.sexy_stop_gift{background:url("http://arun-nav.yolasite.com/resources/CrapChuckImg/stopsend.bmp") no-repeat 0px 0px; height:30px; border-width:1px; width:180px;}'+
		'</style>';
*/
		var styles='<style type="text/css">'+
		'.sexy_table1{font-weight:bold; border: 1px solid #666666; padding-left:10px; }'+
		'.sexy_error_table{font-size:17px; color:red; padding-left:10px}'+
		'.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; font-size:15px; }'+
		'.sexy_input{background-color:black; color:#D0D0D0; width:83%; font-size:15px; font-weight:bold; border: 1px solid #666666; padding-left:0.2em}'+
		'.sexy_start_gift{background:black; height:25px; border-width:0.5px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
		'.sexy_stop_gift{background:black; height:25px; border-width:1px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
		'.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 20px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}'+
		'.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}'+
		'</style>';

	var popup='<div id="poop_up" style="position: absolute; z-index: auto; display:none"></div>';

	table_html='<table width="900px"><th width="750px">'+
			'<form id="something">'+popup+'<table width=100% height=30px class="sexy_table1" name="gifter" frame=box bgcolor="black">'+
			'<tr style="height:40px"><th width=70% style="font-size:20px; padding-left:15px">Chuck A Crap v2.0 </th><th ALIGN=BOTTOM style="font-size:13px"><a id="Website" href="http://arun-nav.yolasite.com" target="_blank">Arun\'s Mafia Wars Helpers</a></th>'+
			'<th width=2% align=center><a href="#" id="close"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th></tr></table>'+
			'<table class="sexy_table1" width=100% border=1 bgcolor="black">'+
			'<tr></tr><tr><td class="sexy_table1" width=20% >Chuck Crap at :</td>   <td class="sexy_table1" width=25% ><input type=radio id=user_loc_profile value=1 name=user_loc checked>Get ID from Profile</td>                              <td class="sexy_table1" width=25% ><input type=radio id=user_loc_list value=1 name=user_loc style="background:black;">User List ->></td>                                                  <td class="sexy_table1" width=25%><Select id="user_list" class="sexy_select" onclick="user_loc_list.checked=true;"></select></td></tr>'+
			'<tr></tr><tr><td class="sexy_table1" width=20% >Gift Type :</td>       <td class="sexy_table1" width=25% ><input type=radio id=gift_cat value=1 name=gift_categ checked disabled>LOOT</input></td>                                  <td class="sexy_table1" width=25% ><input id=gift_cat1 type=radio name=gift_categ value=0 disabled>COLLECTION</input></td>                                              <td class="sexy_table1" width=25% ><input id=gift_cat2 name=gift_categ value=2 type=radio disabled>BOOST</input></td></tr>'+
			'<tr></tr><tr><td class="sexy_table1" width=20% >Gift :</td>            <td class="sexy_table1" width=25%><Select class="sexy_select" id="loot_gift_id" TABINDEX=1>'+ny_loot+'</td>   								 <td class="sexy_table1" width=25%><Select class="sexy_select" id="collection_gift_id" TABINDEX=1>'+ny_collection+cuba_collection+moscow_collection+bangkok_collections+'</td>  <td class="sexy_table1" width=25%><Select class="sexy_select" id="boost_gift_id" TABINDEX=1>'+boosts+'</td></tr>'+
			'<tr></tr><tr><td class="sexy_table1" width=20% >Quantity :</td>        <td class="sexy_table1" width=25%><input type=text id=quantity value=1 class="sexy_input" TABINDEX=2 onkeydown="return field_validate(event.keyCode);">	 <input id="send_all" type="checkbox"></td> <td class="sexy_table1" colspan="2" id="item_quantity" style="padding-left:10px"></td></tr>'+
			'<tr></tr><tr><td class="sexy_table1" width=20% >Time Delay :</td>      <td class="sexy_table1" width=25%><input type=text id=delay value=2 class="sexy_input" onkeydown="return field_validate(event.keyCode);">				 <input id="force_timer" type="checkbox"></td>    <td align=right colspan=2 rowspan=2 style="padding-left:5px"></td></tr>'+
			'<tr></tr><tr><td align="left" width=20%><input type="button" id="begin" class="sexy_button" value="START CHUCKING"></td>		<td border=2 class="sexy_table1" style="padding-left:15px" width=25%>					 <input type=button id="end" class="sexy_button" value="STOP CHUCKING"></td><td align="center" width=25%></td><td width=25%></td></form></table>'+
			'<table width=100% id=logger class="sexy_table1" height=40px bgcolor="black"></table>'+
			'<br><table width=100% id=err_logger border=1 rules=none bgcolor="black"></table></th>'+
			'<th align=top height="257px" style="vertical-align:top">'+
			'<table class="sexy_table1" width="100%" height="100%" border="1">'+
			'<tr height="9%"><td><a id="Features" href="http://arun-nav.yolasite.com/index/its-back-faster-and-better-than-ever-chuck-a-crap-v2-0" target="_blank">New Features</a></td></tr>'+
			'<tr height="9%"><td><a id="BugsSuggestions" href="http://topmafia.info/forum/index.php?topic=1589.0" target="_blank">Bugs/Suggestions</a></td></tr>'+
			'<tr height="9%"><td><a id="Pimp" href="http://topmafia.info/forum/index.php?board=52.0" target="_blank">Mafia Add</a></td></tr>'+
			'<tr height="9%"><td><a id="Tips" href="http://topmafia.info/forum/index.php" target="_blank">Tips/Tricks</a></td></tr>'+
			'<tr height="9%"><td><a id="Donate" href="http://arun-nav.yolasite.com/thanks.php" target="_blank">Donate</a></td></tr>'+
			'<tr height="9%"><td><a id="Updates">Updates</a></td></tr>'+
			'<tr height="9%"><td><a id="Donors"><< Donors >></a></td></tr>'+
			'<tr height="28%"><td></td></tr>'+
			'</table></th>'+
			'</table>';

	gifter_div.innerHTML = styles+error_window+table_html;

//	gifter_window.innerHTML=styles+error_window+table_html;

	content.insertBefore(gifter_div,content.firstChild);

try{
	document.captureEvents(Event.MOUSEMOVE);
	document.onmousemove = function(e){
		tempX = e.pageX;
		tempY = e.pageY;	
	};
}
catch(err){document.getElementById('popup_fodder').innerHTML= 'Error - '+err;}
//Setting all handlers for the various components

	document.forms.something.begin.onclick=start_send;
	document.forms.something.end.onclick=stop_send;
	document.getElementById("close").onclick=close_gifter;
	document.forms.something.send_all.onclick=send_all_qty;

	document.forms.something.loot_gift_id.onclick=loot_click;
	document.forms.something.collection_gift_id.onclick=collection_click;
	document.forms.something.boost_gift_id.onclick=boost_click;

	document.forms.something.loot_gift_id.onchange=loot_click;
	document.forms.something.collection_gift_id.onchange=collection_click;
	document.forms.something.boost_gift_id.onchange=boost_click;

	document.forms.something.loot_gift_id.onkeyup=loot_click;
	document.forms.something.collection_gift_id.onkeyup=collection_click;
	document.forms.something.boost_gift_id.onkeyup=boost_click;

	document.getElementById('Website').onmousemove=function(){popupballoon_display("Website")};
	document.getElementById('Website').onmouseout=popupballoon_hide;
	document.forms.something.force_timer.onmousemove=function(){popupballoon_display("Timer")};
	document.forms.something.force_timer.onmouseout=popupballoon_hide;
	document.forms.something.send_all.onmousemove=function(){popupballoon_display("Sendall")};
	document.forms.something.send_all.onmouseout=popupballoon_hide;
	document.getElementById('Features').onmousemove=function(){popupballoon_display("Features")};
	document.getElementById('Features').onmouseout=popupballoon_hide;
	document.getElementById('BugsSuggestions').onmousemove=function(){popupballoon_display("BugsSuggestions")};
	document.getElementById('BugsSuggestions').onmouseout=popupballoon_hide;
	document.getElementById('Pimp').onmousemove=function(){popupballoon_display("Pimp")};
	document.getElementById('Pimp').onmouseout=popupballoon_hide;
	document.getElementById('Donate').onmousemove=function(){popupballoon_display("Donate")};
	document.getElementById('Donate').onmouseout=popupballoon_hide;
	document.getElementById('Donors').onmousemove=function(){popupballoon_display("Donors")};
	document.getElementById('Donors').onmouseout=popupballoon_hide;
	document.getElementById('Updates').onmousemove=function(){popupballoon_display("Updates")};
	document.getElementById('Updates').onmouseout=popupballoon_hide;
	document.getElementById('Tips').onmousemove=function(){popupballoon_display("Tips")};
	document.getElementById('Tips').onmouseout=popupballoon_hide;


	sf_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(document.body.innerHTML);
	cb = /&cb=([0-9]+)/.exec(document.body.innerHTML);

	gift_Cat=1;
	gift_Id=1;

	get_quantity();


/**** Experimental*****

	var pichttp,picurl,lolurl;
	var resp;
	
function get_pic(){
	var date = Math.floor(30*Math.random()) + 1;
	var month = Math.floor(12*Math.random()) + 1;
	var year = Math.floor(3*Math.random()) + 2007;

	pichttp=get_xmlHTTP();
	picurl='http://icanhascheezburger.com/'+year+'/'+month+'/'+date+'/';
	pichttp.open('POST',picurl,true);
	pichttp.onreadystatechange = pic_state_change;
	document.getElementById('err_logger').innerHTML='Sending pic request';
	pichttp.send(null); 
}

function pic_state_change(){
	resp = pichttp.responseText;


	document.getElementById('err_logger').innerHTML+=pichttp.readyState;
	document.getElementById('err_logger').innerHTML+=pichttp.status;
	if(pichttp.readyState==4){
		document.getElementById('err_logger').innerHTML+=pichttp.responseText;

		if(pichttp.status==200){
			document.getElementById('err_logger').innerHTML+='IN';
			lolurl=/http:\/\/icanhascheezburger.files.wordpress.com([^"]+)/.exec(resp);
			document.getElementById('err_logger').innerHTML=lolurl;

		}
	}
}
***************/

//Remove everything

function close_gifter(){

	stop=true;
	try{
		clearTimeout(send_hangup_timer);
	}
	catch(err){}

	try{
		xmlHTTP_quantity.onreadystatechange=dummy;
	}
	catch(err){}

	try{
		xmlHTTP.onreadystatechange=dummy;
	}
	catch(err){}

	try{
		xmlHTTP_sigupdate.onreadystatechange=dummy;
	}
	catch(err){}


	document.getElementById("content_row").removeChild(document.getElementById("gifter_div"));

	return;
}


function send_all_qty(){
	if(qty_updated=='false'){
		document.getElementById("logger").innerHTML='<tr><td style="padding-left:5px">Quantity not updated, please wait until it updates</td></tr>';
		document.forms.something.send_all.checked=false;
		return;
	}

	if(document.forms.something.send_all.checked==true){
		if(isNaN(item_amounts[gift_Cat][qty_item_id])){
			document.forms.something.quantity.value=1;
		}
		else{
			document.forms.something.quantity.value=item_amounts[gift_Cat][qty_item_id];
		}
	}
	else{
		document.forms.something.quantity.value=1;
	}
}


//This function is used for getting the gift key as well as getting the quantity for an item

function get_quantity(){

//Check gift category selected and get the gift id for the item selected

	switch(gift_Cat){
		case 0:
			gift_Id=document.forms.something.collection_gift_id.value;
			break;
		case 1:
			gift_Id=document.forms.something.loot_gift_id.value;
			break;
		case 2:
			gift_Id=document.forms.something.boost_gift_id.value;
			break;
		default:
			alert('Select a Gift Type and Category !');
			exit();
			return;
	}

//This is what makes this tool possible and the most important part, the xmlHTTP object

	xmlHTTP_quantity=get_xmlHTTP();
	if(!xmlHTTP_quantity){
		alert_user('Your browser does not support XMLHTTP.');
		return;
	}

	qty_updated='false';

//	document.getElementById('err_logger').innerHTML='Flag value before sending request - '+qty_updated;

//This call is similar to opening the gifting page, the gift key is there as well as all the items you have and their quantities
	qty_hangup_timer = setTimeout(get_quantity,30000);
	try{
		
		quantity_url='http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=1&xw_client_id=8&cb='+cb[1];

		xmlHTTP_quantity.open('POST',quantity_url,true);

		xmlHTTP_quantity.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
		xmlHTTP_quantity.setRequestHeader('X-Requested-With','XMLHttpRequest');
		xmlHTTP_quantity.setRequestHeader('Accept','*/*');

		xmlHTTP_quantity.onreadystatechange=quantity_state;
		xmlHTTP_quantity.send('ajax=1&liteload=1&sf_xw_user_id='+sender_profile_id+'&sf_xw_sig='+local_xw_sig);
	}
	catch(err){
		alert_user('catch block '+err);
	}
}


function quantity_state(){

	var qty_response=xmlHTTP_quantity.responseText;
	item_qty=0;


	document.getElementById('item_quantity').innerHTML='Updating quantity, Please wait...';
	if(xmlHTTP_quantity.readyState==4){
		if(xmlHTTP_quantity.status==200){
			if(/Gifting/.exec(qty_response)){
				clearTimeout(qty_hangup_timer);
				eval(/item_amounts\s=\s([^;]+)/.exec(qty_response)[0]+';');
				eval(/var groups_levels\s=\s([^;]+)/.exec(qty_response)[0]+';');
				eval(/var item_names\s=\s([^;]+)/.exec(qty_response)[0]+';');

				gift_key =/gift_key"\svalue="([a-f0-9]+)/.exec(qty_response)[1];


				if(!gift_key){
					alert_user('Couldnt fetch Gift Key, Contact me with error details');
					return;
				}

			

				if(first_time==true){
	
					receiver_user_id=/var groups_levels\s=\s{([^}]+)/.exec(qty_response)[1].split(',');
		
					options_html='';
			
					for(i=0;i<receiver_user_id.length;i++){
						options_html+='<Option value='+receiver_user_id[i].split(':')[0]+'>'+receiver_user_id[i].split(':')[1].replace(/"/g,'')+'</option>';
					}
		
					document.getElementById('user_list').innerHTML=options_html;
					first_time=false;

				}
				document.getElementById('item_quantity').innerHTML='';
				switch(true){

					case document.forms.something.gift_cat.checked:
						loot_click();
						break;
					case document.forms.something.gift_cat1.checked:
						collection_click();
						break;
					case document.forms.something.gift_cat2.checked:
						boost_click();
						break;
					

				}
				qty_updated='true';
//				document.getElementById('err_logger').innerHTML+='\n Quantity updated flag after updation - '+qty_updated;
				if(hangup_flag=='true'){
					hangup_check();
				}
			}
			else{
				document.getElementById('item_quantity').innerHTML='Error fetching quantity, Refreshing sig key, please wait';
				setTimeout(update_sw_sig,1000);

			}
		}
		else if(xmlHTTP_quantity.status==0){
			clearTimeout(qty_hangup_timer);
			xmlHTTP_quantity.onreadystate=dummy;
			alert_user('Connection failed, Please check your Internet connection and restart the Chucker..');
		}

		else{
			alert_user('Status - '+xmlHTTP_quantity.status);
		}
		
	}
}

function update_sw_sig(){
	xmlHTTP_sigupdate = get_xmlHTTP();

	if(!xmlHTTP_sigupdate){
		alert_user('Your browser does not support XMLHTTP.');
		return;
	}

	try{
		document.getElementById('item_quantity').innerHTML='Fetching sig key...';
		
		var sig_url='http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=item&xw_action=view&xw_city=1&xw_client_id=8&cb='+cb[1]+'&ajax=1&liteload=1&sf_xw_user_id='+sender_profile_id+'&sf_xw_sig='+local_xw_sig;

		xmlHTTP_sigupdate.open('GET',sig_url,true);

		xmlHTTP_sigupdate.onreadystatechange=sigupdate_state;
		xmlHTTP_sigupdate.send(null);
	}
	catch(err){
		alert_user('catch block '+err);
	}
}

function sigupdate_state(){
	if(xmlHTTP_sigupdate.readyState==4){
		if(xmlHTTP_sigupdate.status==200){
			var sig_response=xmlHTTP_sigupdate.responseText;

			local_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(sig_response)[1];
			
			get_quantity();
		}

	}
}

//The Start sending button's handler code, mostly self explainatory

function start_send(){
	stop=false;
	gifts_sent=0;
	exit_gifter=false;

	xmlHTTP=get_xmlHTTP();
	if(!xmlHTTP){
		alert('Your browser does not support XMLHTTP.');
		return;
	}

	if(document.forms.something.user_loc_profile.checked){
		sf_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(document.body.innerHTML);
	
		if(!sf_xw_sig){
			alert('Please head over to the recipient\'s MW Profile Page');
			return;
		}
	}

	cb = /&cb=([0-9]+)/.exec(document.body.innerHTML);

	//Looking for the profile link, should be two, one the senders and second the receivers
	switch(true){
		
		case document.forms.something.user_loc_profile.checked:
			count=0;
			var link_elements = document.getElementsByTagName('a');

			for(i=0;i<link_elements.length;i++){
				if(link_elements[i].text=='Profile'&&count==0){
					count=1;
				}
				else if(link_elements[i].text=='Profile'&&count==1){
					break;
				}
			}
		
			if(count==0||i==link_elements.length){
				alert('Please head over to the recipient\'s MW Profile Page');
				return;
			}

			profile_link=link_elements[i].href;

			split_profile_link = profile_link.split("=");

			receiver_profile_id = split_profile_link[split_profile_link.length - 1];

			break;

		case document.forms.something.user_loc_list.checked:
			receiver_profile_id = document.forms.something.user_list.value;
			break;
		
		default:
			return;


	}

	delay= parseInt(document.forms.something.delay.value);
	gifts= parseInt(document.forms.something.quantity.value);


	if (delay<2){
		alert('Too Low a value for delay, changing to 2 seconds');
		document.forms.something.delay.value=2;
		delay=2;
	}
	if (gifts<1 || isNaN(gifts)){
		alert('Hello Scrooge, You cant send 0 or blank gifts');
		document.forms.something.quantity.value=1;
		gifts=1;
		
		exit();
		return;
	}

	switch(gift_Cat){
		case 0:
			gift_Id=document.forms.something.collection_gift_id.value;
			break;
		case 1:
			gift_Id=document.forms.something.loot_gift_id.value;
			break;
		case 2:
			gift_Id=document.forms.something.boost_gift_id.value;
			break;
		default:
			alert('Select a Gift Type and Category !');
			exit();
			return;
	}
	
	gift_Category = gift_Cat;


	url='http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send&cb='+cb[1]+'&user='+receiver_profile_id+'&gift_category='+gift_Category+'&gift_id='+gift_Id+'&gift_key='+gift_key+'&recipients[0]='+receiver_profile_id+'&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id='+sender_profile_id+'&sf_xw_sig='+local_xw_sig;

	document.getElementById('logger').innerHTML='<tr class="sexy_logger1"><td width=100% style="padding-left:5px">Starting the Crap Chucker. Now Chucking Crap like never before.</td></tr>';

	document.forms.something.begin.disabled=true;
	document.forms.something.end.disabled=false;
	
	before_hangqty=item_amounts[gift_Cat][qty_item_id];
//	document.getElementById('err_logger').innerHTML='<br style="padding-left:5px">Before Hang Qty = '+before_hangqty;
	
	try{
		post_request(url);
	}
	catch(err){
		alert(err);
	}
}



function post_request(url){

	hr = new Date().getHours();
	min = new Date().getMinutes();

	hr= (hr<10?'0'+hr:hr);
	min = (min<10?'0'+min:min);

	xmlHTTP=get_xmlHTTP();

	if(gifts_sent<gifts && stop==false){
		xmlHTTP.open('GET',url,true);
		xmlHTTP.onreadystatechange = state_change;
		send_hangup_timer = setTimeout(function(){hangup_flag='true'; get_quantity(); xmlHTTP.onreadystatechange = dummy;},60000);
		xmlHTTP.send(null);


	}

	else if(stop==true){
		if (gifts_sent>0){
			document.getElementById('logger').innerHTML='<tr><td style="padding-left:5px"><font color=#666666>['+hr+':'+min+']</font> Sent <font color=#33FF00>'+gifts_sent+'(x)</font> '+gift_text[2]+'(s) to <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+receiver_profile_id+'%22%7D" target=\'_blank\'>'+gift_text[3]+'</a></td></tr><tr><td style="padding-left:5px"> '+gifts_sent+' gifts sent, Stopped Chucking, now shutting down</td></tr>';
		}
		get_quantity();
		exit();

		return;
	}

	else{
		document.getElementById('logger').innerHTML='<tr><td style="padding-left:5px"><font color=#666666>['+hr+':'+min+']</font> Sent <font color=#33FF00>'+gifts_sent+'(x)</font> '+gift_text[2]+'(s) to <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+receiver_profile_id+'%22%7D" target=\'_blank\'>'+gift_text[3]+'</a></td></tr><tr><td style="padding-left:5px">'+gifts_sent+' gifts sent, Ran out of crap, now shutting down</td></tr>';
		get_quantity();
		
		exit();
		return;
	}
		

}

function state_change(){

	response=xmlHTTP.responseText;

//	alert(eval(responseText));

	if(xmlHTTP.readyState==4){
		if(xmlHTTP.status==200){
			clearTimeout(send_hangup_timer);
			hangup_flag='false';
			hangup_tries=0;
			if(/You gave a/.test(response)) {
				gift_text=/You gave (some|a|an) (.+) to (.+)<\/td>/i.exec(response);
				hr = new Date().getHours();
				min = new Date().getMinutes();

				hr= (hr<10?'0'+hr:hr);
				min = (min<10?'0'+min:min);

				document.getElementById('logger').innerHTML='<tr><td style="padding-left:5px"><font color=#666666>['+hr+':'+min+']</font> Sent <font color=#33FF00>'+gifts_sent+'(x)</font> '+gift_text[2]+'(s) to <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+receiver_profile_id+'%22%7D" target=\'_blank\'>'+gift_text[3]+'</td></tr>';
				gifts_sent++;

				local_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(response)[1];
				
				cb = /&cb=([0-9]+)/.exec(response);
	
				url='http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send&cb='+cb[1]+'&user='+receiver_profile_id+'&gift_category='+gift_Category+'&gift_id='+gift_Id+'&gift_key='+gift_key+'&recipients[0]='+receiver_profile_id+'&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id='+sender_profile_id+'&sf_xw_sig='+local_xw_sig;

//				alert(url);

				delay= parseInt(document.forms.something.delay.value);
				if(isNaN(delay) || delay<2){
					document.forms.something.delay.value=2;
					delay=2;
				}

				setTimeout(function(){post_request(url);},delay*1000);
			}

			else if (/Please wait a moment before sending another gift/.test(response)) {
//				document.getElementById('err_logger').innerHTML=document.getElementById('err_logger').innerHTML+'Please wait before sending';
				if(document.forms.something.force_timer.checked){
					document.getElementById('logger').innerHTML=document.getElementById('logger').innerHTML+'<tr><td style="padding-left:5px">Gifting speed limit, Forced gifting at 2 seconds...</td></tr>';
					delay=2;
					document.forms.something.delay.value=2;
					setTimeout(function(){ post_request(url); },delay*1000);

				}
				else{
					document.getElementById('logger').innerHTML=document.getElementById('logger').innerHTML+'<tr><td style="padding-left:5px">Delay set too low, changed to 3 seconds. Retrying in 3 seconds...</td></tr>';
					delay=3;
					document.forms.something.delay.value=3;
					setTimeout(function(){ post_request(url); },delay*1000);
				}
				
				return;				
			}

			else if (/Error while loading page from/.test(response)) {
//				document.getElementById('err_logger').innerHTML=document.getElementById('err_logger').innerHTML+'Loading error';
				document.getElementById('logger').innerHTML=document.getElementById('logger').innerHTML+'<tr><td>Mafia Wars overloaded, waiting 30 seconds...';
				setTimeout(function(){ post_request(url); },30000);
				return;
			}

			else if (/have enough of that/.test(response)) {
//				document.getElementById('err_logger').innerHTML='Error! You do not have enough of that to chuck';
				stop = true;
//				alert_user('Stopped...');
				document.getElementById('logger').innerHTML=document.getElementById('logger').innerHTML+'<tr><td style="padding-left:5px">Error! You do not have enough of that item to give</td></tr>';
				post_request(url);
			}
/*			else{
				document.getElementById('err_logger').innerHTML=document.getElementById('err_logger').innerHTML+'Whoa, Zynga gave you some crap ! Please reload the page';
			}
*/
		}
	}		


}

function hangup_check(){
	document.getElementById('logger').innerHTML+='<tr style="padding-left:5px"><font color=red>Possible hangup, retrying...</font></tr>';
	hangup_tries++;

	if(hangup_tries > 1){
		document.getElementById('logger').innerHTML+='<tr style="padding-left:5px"><font color=red>Possible Session Timeout, Stopping, Please reload MW and try again..</font></tr>';
		return;
	}

//	document.getElementById('err_logger').innerHTML+='<tr style="padding-left:5px">Hang !</tr>';

	hr = new Date().getHours();
	min = new Date().getMinutes();
try{

	hr= (hr<10?'0'+hr:hr);
	min = (min<10?'0'+min:min);

	after_hangqty=item_amounts[gift_Cat][qty_item_id];
	var sent = before_hangqty - after_hangqty;

	if(sent<gifts && stop==false){
		gifts_sent = sent;
		post_request(url);	
	}
	else{		
		document.getElementById('logger').innerHTML='<tr><td style="padding-left:5px"><font color=#666666>['+hr+':'+min+']</font> Sent <font color=#33FF00>'+gifts_sent+'(x)</font> '+gift_text[2]+' to <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+receiver_profile_id+'%22%7D" target=\'_blank\'>'+gift_text[3]+'</td></tr><tr><td>'+gifts_sent+' gifts sent, Ran out of crap, now shutting down</td></tr>';
		get_quantity();
	}
}
catch(err){document.getElementById('err_logger').innerHTML+='<br style="padding-left:5px">Error - '+err;}
//	document.getElementById('err_logger').innerHTML+='<br style="padding-left:5px">Think it hung, After Hang Qty = '+after_hangqty;
//	document.getElementById('err_logger').innerHTML+='<br style="padding-left:5px">New gifts sent value = '+gifts_sent;
}


function exit(){
	document.forms.something.begin.disabled=false;
	document.forms.something.end.disabled=true;
	return;
}

function get_xmlHTTP(){
	if(window.XMLHttpRequest)
		return new XMLHttpRequest();
	if(window.ActiveXObject)
		return new ActiveXObject('Microsoft.XMLHTTP');
	return;
}

function stop_send(){
	stop=true;
	try{
		clearTimeout(send_hangup_timer);
	}
	catch(err){}

}


function loot_click(){
	gift_Cat=1;
	document.forms.something.gift_cat.checked=true;
		
	qty_item_id = document.forms.something.loot_gift_id.value;


	if(item_amounts[gift_Cat][qty_item_id]==0 || isNaN(item_amounts[gift_Cat][qty_item_id])){
		document.getElementById('item_quantity').innerHTML='You\'ve got none of these.';
	}
	else{
		if(document.forms.something.send_all.checked){
			document.forms.something.quantity.value=item_amounts[gift_Cat][qty_item_id];
		}
		document.getElementById('item_quantity').innerHTML='You\'ve got '+item_amounts[gift_Cat][qty_item_id]+' of these.';
	}

}

function collection_click(){
	gift_Cat=0;
	document.forms.something.gift_cat1.checked=true;	
	qty_item_id = document.forms.something.collection_gift_id.value;

	if(item_amounts[gift_Cat][qty_item_id]==0 || isNaN(item_amounts[gift_Cat][qty_item_id])){
		document.getElementById('item_quantity').innerHTML='You\'ve got none of these.';
	}
	else{
		if(document.forms.something.send_all.checked){
			document.forms.something.quantity.value=item_amounts[gift_Cat][qty_item_id];
		}
		document.getElementById('item_quantity').innerHTML='You\'ve got '+item_amounts[gift_Cat][qty_item_id]+' of these.';
	}

}

function boost_click(){
	gift_Cat=2;
	document.forms.something.gift_cat2.checked=true;
	qty_item_id = document.forms.something.boost_gift_id.value;

	if(item_amounts[gift_Cat][qty_item_id]==0 || isNaN(item_amounts[gift_Cat][qty_item_id])){
		document.getElementById('item_quantity').innerHTML='You\'ve got none of these.';
	}
	else{
		if(document.forms.something.send_all.checked){
			document.forms.something.quantity.value=item_amounts[gift_Cat][qty_item_id];
		}
		document.getElementById('item_quantity').innerHTML='You\'ve got '+item_amounts[gift_Cat][qty_item_id]+' of these.';
	}

}

	function popupballoon_display(element){
	try{
		document.getElementById('poop_up').style.top = (tempY - 50)+'px';
		document.getElementById('poop_up').style.left= (tempX-330)+'px';
		document.getElementById('poop_up').style.width='300px';
		document.getElementById('poop_up').style.display='block';
		
		switch(element){
			case "Website":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Link Currently down</div>';
				break;
			case "Timer":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Check this to force gift at 2 seconds and ignore Zynga Gifting speed limitations</div>';
				break;
			case "Sendall":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Send all of currently selected item</div>';
				break;
			case "Features":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Link Currently down</div>';
				break;
			case "BugsSuggestions":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Report any bugs you encounter/Suggestions etc on Top Mafia Forums</div>';
				break;
			case "Pimp":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Need more Mafia ? Follow this link to a mass email list, and please follow rules when posting :)</div>';
				break;
			case "Tips":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">An excellent source for all the mafia wars tips and tricks that you\'ll need to know to play the game. Contains various guides and troubleshooting tips too.</div>';
				break;
			case "Donate":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1">Link Currently down</div>';
				break;
			case "Updates":
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1" style="color:white">A List of the updates made -'+
				'<table><tr style="color:white; height:10px"></tr>'+
				'<tr><td style="color:white; height:25px"><li>Added Bangkok Collections</li></td></tr>'+
				'<tr><td style="color:white; height:25px"><li>Added Bangkok Loot and Boosts</li></td></tr>'+
				'<tr><td style="color:white; height:25px"><li>Removed Bangkok Loot that became ungiftable</li></td></tr>'+
				'<tr><td style="color:white; height:25px"><li>Added new Bangkok consumables</li></td></tr>'+
				'</table></div>';
				break;
			case "Donors":
				document.getElementById('poop_up').style.top = (tempY - 200)+'px';
				document.getElementById('poop_up').innerHTML='<div class="sexy_destination1" style="color:white">Getting this list put down in a separate page, update soon..</div>';
				break;
				

		}

	}
	catch(err){alert(err);}

	}


	function popupballoon_hide(){
		document.getElementById('poop_up').style.display='none';
	}

	function dummy(){
	//do nothing
	}


})();


function field_validate(key_code){

	if ((key_code>=48 && key_code<=57) || (key_code>=96 && key_code<=105) || key_code==8 || key_code==127 || key_code==37 || key_code==39 || key_code==9 || key_code==46){
		return true;
	}
	else{
		return false;
	}
}

function alert_user(message){

	document.getElementById('errormsg').innerHTML='<td style="padding-left:5px">['+new Date().getHours()+':'+new Date().getMinutes()+'] '+message+'</td>';
}
