// ==UserScript==
// @name           FixChuck
// ==/UserScript==

javascript: (function () {
	var f = document.getElementsByName('mafiawars');
	try {
		if (f.length > 0 || (!f)) {
			window.location.href = document.getElementsByName('mafiawars')[0].src;
			return
		} else {
			document.body.parentNode.style.overflowY = "scroll";
			document.body.style.overflowX = "auto";
			document.body.style.overflowY = "auto";
			try {
				if (typeof FB != 'undefined') {
					FB.CanvasClient.stopTimerToSizeToContent;
					window.clearInterval(FB.CanvasClient._timer);
					FB.CanvasClient._timer = -1
				}
			} catch(err) {}
		}
	} catch(err) {}
	try {
		document.getElementById('FB_HiddenContainer').innerHTML = ''
	} catch(err) {}
	var g = navigator.appName;
	if (g == "Microsoft Internet Explorer") {
		alert("Chucker does not run on Internet Explorer, Please use a browser such as Firefox or Chrome");
		return
	}
	var h = 2,
	gifts = 1,
	gift_Id, gift_Cat, gift_Category, url, gifts_sent = 0,
	stop = true,
	gift_key = readCookie('gkey');
	var k, xmlHTTP_quantity, xmlHTTP_sigupdate;
	var l = false;
	var m;
	var n;
	var o = [];
	var p = [];
	var q = [];
	var r;
	var s;
	var t = 0;
	var u = [];
	var v = 0;
	var w = 0;
	var x;
	var y;
	var z = 'false';
	var A;
	var B = 'true';
	var C, cb, temp;
	var D = [];
	var E = [];
	var F = [];
	var G = [];
	var H;
	var I;
	var J = 'false';
	var K;
	var L;
	var M = 0;
	var N, temp_receiverId, temp_receiverName, temp_giftId, temp_gifts;
	var O = 0,
	i = 0;
	var P;
	var Q, receiver_profile_id, sender_profile_id;
	sender_profile_id = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
	if (sender_profile_id == 'p|71854933' || sender_profile_id == 'p|107795742') {
		return
	}
	if (sender_profile_id == 'p|47810573') {
		alert('Scam me will ya you stupid SOB.. I\'ll make sure everyone who uses the Chucker knows about you and is warned about you, you dumb prick.\n\n\n BANNED !');
		return
	}
	var R = true;
	try {
		document.getElementById("popup_fodder").removeChild(document.getElementById("gifter_div"))
	} catch(err) {}
	var S = document.getElementById('popup_fodder');
	var T = document.createElement("div");
	T.id = 'gifter_div';
	var U = '<table class="sexy_error_table" width=100% id="errormsg" border=2 rules=none bgcolor="black"></table><br>';
	var V = '<option value="CubaCityCollection" style="color:rgb(255, 217, 39);"><< CUBAN COLLECTIONS >>' + '<option value="Collection" style="color:#33FF00;"><< RUM DRINKS COLLECTION >>' + '<option value="2001">Pina Colada' + '<option value="2002">Hurricane' + '<option value="2003">Bahama Mama' + '<option value="2004">Mojito' + '<option value="2005">Rum Runner' + '<option value="2006">Long island Ice Tea' + '<option value="2007">Cuba Libre' + '<option value="Collection" style="color:#33FF00;"><< TROPICAL FRUITS COLLECTION >>' + '<option value="2008">Banana' + '<option value="2009">Lime' + '<option value="2010">Pineapple' + '<option value="2011">Papaya' + '<option value="2012">Coconut' + '<option value="2013">Passion Fruit' + '<option value="2014">Dragon Fruit' + '<option value="Collection" style="color:#33FF00;"><< ENTERTAINERS COLLECTION >>' + '<option value="2015">Magician' + '<option value="2016">Fan Dancer' + '<option value="2017">Comedian' + '<option value="2018">Band Leader' + '<option value="2019">Cabaret Singer' + '<option value="2020">Crooner' + '<option value="2021">Burlesque Dancer' + '<option value="Collection" style="color:#33FF00;"><< TROPICAL FISH COLLECTION >>' + '<option value="2022">Pufferfish' + '<option value="2023">Sergeant Major' + '<option value="2024">Yellowtail Snapper' + '<option value="2025">Great Barracuda' + '<option value="2026">Queen Angelfish' + '<option value="2027">Reef Shark' + '<option value="2028">Blue Marlin' + '<option value="Collection" style="color:#33FF00;"><< BEARDS COLLECTION >>' + '<option value="2029">Garibaldi' + '<option value="2030">Hulihee' + '<option value="2031">Vandyke' + '<option value="2032">Mutton Chops' + '<option value="2033">Soul Patch' + '<option value="2034">French Fork' + '<option value="2035">Fidel';
	var W = '<option value="Collection" style="color:red;"><< EASTER CRIME BASKET >>' + '<option value="100015">Striped Egg' + '<option value="100016">Polka Dot Egg' + '<option value="100017">Checkered Egg' + '<option value="100018">Plaid Egg' + '<option value="100019">Paisley Egg' + '<option value="100020">Last Year\'s Egg' + '<option value="100021">Golden Egg' + '<option value="Collection" style="color:red;"><< TOOLS OF THE TRADE COLLECTION >>' + '<option value="500001">Lock Picks' + '<option value="500002">Diamond Drill' + '<option value="500003">Flashlight' + '<option value="500004">Walkie Talkie' + '<option value="500005">Safecracker\'s Stethoscope' + '<option value="500006">Black Ski Masks' + '<option value="500007">Grappling Hooks' + '<option value="Collection" style="color:red;"><< STOLEN DIAMOND COLLECTION >>' + '<option value="500008">Hope Diamond' + '<option value="500009">Koh-I-Noor Diamond' + '<option value="500010">Great Star of Africa Diamond' + '<option value="500011">The Orloff Diamond' + '<option value="500012">The Sancy Diamond' + '<option value="500013">The Idol\'s Eye Diamond' + '<option value="500014">The Regent Diamond' + '<option value="Collection" style="color:red;"><< ST. PATRICK\'S DAY COLLECTION >>' + '<option value="100008">Irish Flag' + '<option value="100009">Leprechaun' + '<option value="100010">Green Fireworks' + '<option value="100011">Green Bowler\'s Cap' + '<option value="100012">Lucky Pint Glass' + '<option value="100013">Pot of Gold' + '<option value="100014">Uilleann Pipes' + '<option value="Collection" style="color:red;"><< PROTOTYPE CAR-JACKING >>' + '<option value="300001">GPS Signal Scrambler' + '<option value="300002">Tank of Gasoline' + '<option value="300003">Ignition Device' + '<option value="300004">Microchip Fitted Key' + '<option value="300005">Map of the Garage' + '<option value="300006">Counterfeit ID Badges' + '<option value="300007">Security Hacker' + '<option value="Collection" style="color:red;"><< THEFT OF A DRONE >>' + '<option value="300008">Classified Report' + '<option value="300009">Hijacked Transmitter' + '<option value="300010">Access Code' + '<option value="300011">Guards Schedule' + '<option value="300012">Calibration Manual' + '<option value="300013">Guidance Module' + '<option value="300014">UltraLite Fuel Cell' + '<option value="Collection" style="color:red;"><< WEAPONS SHIPMENT HIJACKING >>' + '<option value="300015">Shipment Info' + '<option value="300016">Schedule of Truck Route' + '<option value="300017">Road Block' + '<option value="300018">Container Key' + '<option value="300019">Rocket Ammo' + '<option value="300020">Tracking Laser Sight' + '<option value="300021">Carrying Case' + '<option value="Collection" style="color:red;"><< CHINESE NEW YEAR\'S COLLECTION >>' + '<option value="400001">Baoding Balls' + '<option value="400002">Cricket Cage' + '<option value="400003">Dragon Mask' + '<option value="400004">Four Toed Dragon' + '<option value="400005">Money Envelope' + '<option value="400006">Year of the Tiger' + '<option value="400007">Money Frog' + '<option value="Collection" style="color:red;"><< VALENTINE\'S DAY COLLECTION >>' + '<option value="100001">Heart Tattoo' + '<option value="100002">Shoot the Moon' + '<option value="100003">Stolen Heart' + '<option value="100004">Heart Locket' + '<option value="100005">Box of Chocolates' + '<option value="100006">Love Bear' + '<option value="100007">Valentine' + '<option value="NYCityCollection" style="color:rgb(255, 217, 39);"><< NEW YORK COLLECTION >>' + '<option value="Collection" style="color:#33FF00;"><< DIAMOND FLUSH COLLECTION >>' + '<option value="1036">Eight of Diamonds' + '<option value="1037">Nine of Diamonds' + '<option value="1038">Ten of Diamonds' + '<option value="1039">Jack of Diamonds' + '<option value="1040">Queen of Diamonds' + '<option value="1041">King of Diamonds' + '<option value="1042">Ace of Diamonds' + '<option value="Collection" style="color:#33FF00;""><< HEART FLUSH COLLECTION >>' + '<option value="1043">Eight of Hearts' + '<option value="1044">Nine of Hearts' + '<option value="1045">Ten of Hearts' + '<option value="1046">Jack of Hearts' + '<option value="1047">Queen of Hearts' + '<option value="1048">King of Hearts' + '<option value="1049">Ace of Hearts' + '<option value="Collection" style="color:#33FF00;"><< SCULPTURES COLLECTION >>' + '<option value="1022">Rat Sculpture' + '<option value="1023">Sheep Sculpture' + '<option value="1024">Rooster Sculpture' + '<option value="1025">Monkey Sculpture' + '<option value="1026">Tiger Sculpture' + '<option value="1027">Snake Sculpture' + '<option value="1028">Dragon Sculpture' + '<option value="Collection" style="color:#33FF00;"><< POKER CHIPS COLLECTION >>' + '<option value="1029">White Poker Chip' + '<option value="1030">Brown Poker Chip' + '<option value="1031">Red Poker Chip' + '<option value="1032">Blue Poker Chip' + '<option value="1033">Green Poker Chip' + '<option value="1034">Purple Poker Chip' + '<option value="1035">Gold Poker Chip' + '<option value="Collection" style="color:#33FF00;"><< CLUB FLUSH COLLECTION >>' + '<option value="1050">Eight of Clubs' + '<option value="1051">Nine of Clubs' + '<option value="1052">Ten of Clubs' + '<option value="1053">Jack of Clubs' + '<option value="1054">Queen of Clubs' + '<option value="1055">King of Clubs' + '<option value="1056">Ace of Clubs' + '<option value="Collection" style="color:#33FF00;"><< BOXING COLLECTION >>' + '<option value="1085">Hand Tape' + '<option value="1086">Gloves' + '<option value="1087">Headgear' + '<option value="1088">Boxing Trunks' + '<option value="1089">Speed Bag' + '<option value="1090">Heavy Bag' + '<option value="1091">Boxing Ring' + '<option value="Collection" style="color:#33FF00;"><< CIGARS COLLECTION >>' + '<option value="1001">Ebony Cigar' + '<option value="1002">Sky Cigar' + '<option value="1003">Rose Cigar' + '<option value="1004">Ivory Cigar' + '<option value="1005">Turquoise Cigar' + '<option value="1006">Gold Cigar' + '<option value="1007">Royal Cigar' + '<option value="Collection" style="color:#33FF00;"><< SPADE FLUSH COLLECTION >>' + '<option value="1057">Eight of Spades' + '<option value="1058">Nine of Spades' + '<option value="1059">Ten of Spades' + '<option value="1060">Jack of Spades' + '<option value="1061">Queen of Spades' + '<option value="1062">King of Spades' + '<option value="1063">Ace of Spades' + '<option value="Collection" style="color:#33FF00;"><< BILLIARDS COLLECTION >>' + '<option value="1092">One Ball' + '<option value="1093">Two Ball' + '<option value="1094">Three Ball' + '<option value="1095">Four Ball' + '<option value="1096">Five Ball' + '<option value="1097">Cue Ball' + '<option value="1098">Eight Ball' + '<option value="Collection" style="color:#33FF00;"><< RINGS COLLECTION >>' + '<option value="1008">Topaz Ring' + '<option value="1009">Opal Ring' + '<option value="1010">Amethyst Ring' + '<option value="1011">Emerald Ring' + '<option value="1012">Sapphire Ring' + '<option value="1013">Ruby Ring' + '<option value="1014">Diamond Ring' + '<option value="Collection" style="color:#33FF00;"><< TIES COLLECTION >>' + '<option value="1064">Solid Tie' + '<option value="1065">Striped Tie' + '<option value="1066">Checked Tie' + '<option value="1067">Geometric Tie' + '<option value="1068">Dot Tie' + '<option value="1069">Paisley Tie' + '<option value="1070">Knitted Tie' + '<option value="Collection" style="color:#33FF00;"><< PAINTINGS COLLECTION >>' + '<option value="1015">Warhol Painting' + '<option value="1016">Cezanne Painting' + '<option value="1017">Matisse Painting' + '<option value="1018">Van Gogh Painting' + '<option value="1019">Dali Painting' + '<option value="1020">Monet Painting' + '<option value="1021">Rembrandt Painting' + '<option value="Collection" style="color:#33FF00;"><< CUFFLINKS COLLECTION >>' + '<option value="1071">Silver Cufflinks' + '<option value="1072">Gold Cufflinks' + '<option value="1073">Amber Cufflinks' + '<option value="1074">Jasper Cufflinks' + '<option value="1075">Agate Cufflinks' + '<option value="1076">Onyx Cufflinks' + '<option value="1077">Pearl Cufflinks' + '<option value="Collection" style="color:#33FF00;"><< BARBER COLLECTION >>' + '<option value="1099">Barber Pole' + '<option value="1100">Razor' + '<option value="1101">Brush' + '<option value="1102">Seat' + '<option value="1103">Towel' + '<option value="1104">Scissors' + '<option value="1105">Cream' + '<option value="Collection" style="color:#33FF00;"><< GREAT RACE HORSES COLLECTION >>' + '<option value="1078">Mill Reef' + '<option value="1079">Sea Bird' + '<option value="1080">Arkle' + '<option value="1081">Golden Miller' + '<option value="1082">St Simon' + '<option value="1083">Ormonde' + '<option value="1084">Eclipse' + '<option value="Collection" style="color:#33FF00;"><< MONEY LAUNDERING COLLECTION >>' + '<option value="1113">Money Iron' + '<option value="1114">Dirty Laundry' + '<option value="1115">Dryer Sheets' + '<option value="1116">Money Line' + '<option value="1117">Roll of Quarters' + '<option value="1118">Death by Detergent' + '<option value="1119">Dirty Bra';
	var X = '<option value="MoscowCityCollection" style="color:rgb(255, 217, 39); font-size=25px;"><< MOSCOW COLLECTION >>' + '<option value="Collection" style="color:#33FF00;"><< PRISON TATTOOS COLLECTION >>' + '<option value="3001">Rose Tattoo' + '<option value="3002">Church Tattoo' + '<option value="3003">Star Tattoo' + '<option value="3004">Spider Tattoo' + '<option value="3005">Tiger Tattoo' + '<option value="3006">Skull Tattoo' + '<option value="3007">Crucifix Tattoo' + '<option value="Collection" style="color:#33FF00;"><< MATRYOSHKA DOLLS COLLECTION >>' + '<option value="3008">Natalya\'s Doll' + '<option value="3009">Olga\'s Doll' + '<option value="3010">Oksana\'s Doll' + '<option value="3011">Svetlana\'s Doll' + '<option value="3012">Tatyana\'s Doll' + '<option value="3013">Anastasiya\'s Doll' + '<option value="3014">Ekaterina\'s Doll' + '<option value="Collection" style="color:#33FF00;"><< RUSSIAN LEADERS COLLECTION >>' + '<option value="3015">Medal of Gorbachev' + '<option value="3016">Medal of Yeltsin' + '<option value="3017">Medal of Brezhnev' + '<option value="3018">Medal of Kruschev' + '<option value="3019">Medal of Putin' + '<option value="3020">Medal of Stalin' + '<option value="3021">Medal of Lenin' + '<option value="Collection" style="color:#33FF00;"><< VODKA DRINKS COLLECTION >>' + '<option value="3022">Cosmopolitan' + '<option value="3023">Screwdriver' + '<option value="3024">Sex on the Beach' + '<option value="3025">Bloody Mary' + '<option value="3026">Black Russian' + '<option value="3027">White Russian' + '<option value="3028">Soviet' + '<option value="Collection" style="color:#33FF00;"><< SOVIET MEMORABILIA COLLECTION >>' + '<option value="3029">Red Star' + '<option value="3030">Kremlin' + '<option value="3031">Communist Manifesto' + '<option value="3032">Propaganda Poster' + '<option value="3033">Hammer' + '<option value="3034">Sickle' + '<option value="3035">Bust of Lenin' + '<option value="Collection" style="color:#33FF00;"><< FABERGE EGGS COLLECTION >>' + '<option value="3036">Diamond Trellis Egg' + '<option value="3037">Jade Egg' + '<option value="3038">Military Egg' + '<option value="3039">Pansy Egg' + '<option value="3040">Rainbow Egg' + '<option value="3041">Winter Egg' + '<option value="3042">Peter the Great Egg';
	var Y = '<option value="BangkokCityCollection" style="color:rgb(255, 217, 39); font-size=25px;"><< BANGKOK COLLECTIONS >>' + '<option value="Collection" style="color:#33FF00;"><< CHESS SET COLLECTION >>' + '<option value="4001">Chessboard' + '<option value="4002">Pawn' + '<option value="4003">Knight' + '<option value="4004">Bishop' + '<option value="4005">Rook' + '<option value="4006">Queen' + '<option value="4007">King' + '<option value="Collection" style="color:#33FF00;"><< MASKS COLLECTION >>' + '<option value="4008">Agat-Talai\'s Mask' + '<option value="4009">Sukreep\'s Mask' + '<option value="4010">Palee\'s Mask' + '<option value="4011">Phra Ram\'s Mask' + '<option value="4012">Indrachit\'s Mask' + '<option value="4013">Hanuman\'s Mask' + '<option value="4014">Tosakanth\'s Mask' + '<option value="Collection" style="color:#33FF00;"><< SPICES COLLECTION >>' + '<option value="4015">Coriander' + '<option value="4016">Garlic' + '<option value="4017">Turmeric' + '<option value="4018">Green Peppercorn' + '<option value="4019">Holy Basil' + '<option value="4020">Lemongrass' + '<option value="4021">Thai Chili' + '<option value="Collection" style="color:#33FF00;"><< CARVINGS COLLECTION >>' + '<option value="4022">Wall Carving' + '<option value="4023">Floral Statue' + '<option value="4024">Dragon Statue' + '<option value="4025">Decorative Nightstand' + '<option value="4026">Lotus Bloom' + '<option value="4027">Rearing Elephant' + '<option value="4028">Stone Buddha' + '<option value="Collection" style="color:#33FF00;"><< ORCHIDS COLLECTION >>' + '<option value="4029">Marco Polo' + '<option value="4030">Grace Pink' + '<option value="4031">Misteen' + '<option value="4032">Jade Siam' + '<option value="4033">Bom Gold' + '<option value="4034">Bom Blue' + '<option value="4035">Fatima';
	var Z = '<option style="color:#33FF00;" value="TopLoot">-- TOP 6 LOOT --' + '<Option value="634">Hunter \'Spy\' XS' + '<Option value="633">Mugati Sport' + '<Option value="1545">Ninja' + '<Option value="666">Railgun' + '<Option value="1546">Royal Thai Marine' + '<Option value="1543">Titanium Katar' + '<option style="color:#33FF00;" value="ChopShop">-- CHOP SHOP SET --' + '<Option value="535">Acetylene Torches</Option>' + '<Option value="534">Car Lift' + '<Option value="532">Cement Blocks' + '<Option value="533">Power Tools' + '<Option value="536">Shipping Containers' + '<option style="color:#33FF00;" value="CarParts">-- CAR BUILDING PARTS --' + '<Option value="570">Bulletproof Glass' + '<Option value="558">Car Parts' + '<Option value="559">Cuban Car Part' + '<Option value="635">High Tech Car Part' + '<Option value="560">Russian Car Part' + '<Option value="571">Solar Panel' + '<Option value="561">Thai Car Part' + '<option style="color:#33FF00;" value="WeaponsDepot">-- WEAPONS DEPOT SET --' + '<Option value="656">Arc Welder' + '<Option value="657">Buzzsaw' + '<option value="660">Forge' + '<Option value="659">Gun Drill' + '<Option value="658">Gunpowder' + '<option style="color:#33FF00;" value="DepotParts">-- WEAPON BUILDING PARTS --' + '<Option value="672">Boomerang' + '<Option value="669">Explosive Arrow' + '<Option value="673">Grapple' + '<Option value="671">Laser Range Finder' + '<Option value="655">Portable Fusion Reactor' + '<Option value="654">Railgun Barrel' + '<Option value="670">Sonic Emitter' + '<Option value="668">Weapon Part' + '<option style="color:#33FF00;" value="NYConsumables">-- NEW YORK CONSUMABLES --' + '<Option value="65">Blackmail Photos' + '<Option value="63">Computer Set-Up' + '<Option value="62">Concealable Camera' + '<Option value="68">Illegal Transaction Records' + '<Option value="64">Untraceable Cell Phone' + '<option style="color:#33FF00;" value="MoscowConsumables">-- MOSCOW CONSUMABLES --' + '<Option value="1012">Bank Guard Uniform' + '<Option value="1024">Bundle of Dynamite' + '<Option value="1010">Dossier on Dmitri' + '<Option value="1025">Mansion Details' + '<Option value="1018">Officer Corps Paycheck' + '<Option value="1011">Photos of Karpov' + '<option style="color:#33FF00;" value="BKConsumables">-- BANGKOK CONSUMABLES --' + '<Option value="1535">Drug Shipment' + '<Option value="1536">Pirates' + '<Option value="1534">Satellite Phone' + '<option style="color:#33FF00;" DISABLED>-- LOOT --' + '<Option value="1">.22 Pistol' + '<Option value="5">.45 Revolver' + '<Option value="15">.50 Caliber Rifle' + '<Option value="4">9mm Semi-Automatic' + '<Option value="202">Aguila HV .50 Sniper Rifle' + '<Option value="632">Andresen 420si' + '<Option value="1028">Arktichekij Gus' + '<Option value="1014">Armored Briefcase' + '<Option value="16">Armored Car' + '<Option value="77">Armored Limousine' + '<option value="183">Armored State Car' + '<Option value="11">Armored Truck' + '<Option value="201">ASC45 \'Conquistador\'' + '<Option value="9">Automatic Rifle' + '<Option value="73">BA-12 Assault Rifle' + '<Option value="1002">Ballistic Knife' + '<option value="223">Bayonet' + '<Option value="675">Big Bad Wolf' + '<Option value="18">Bodyguards' + '<Option value="71">Bookie\'s Holdout Pistol' + '<Option value="1523">Bosozoku Convertible' + '<Option value="3">Brass Knuckles' + '<Option value="1509">BRM-38' + '<Option value="2">Butterfly Knife' + '<Option value="7">C4' + '<Option value="205">Camouflage Body Armor' + '<Option value="198">Cane Knife' + '<option value="229">Cannon' + '<Option value="261">Canonazo' + '<Option value="1007">Cherepakha Compact' + '<Option value="1550">Chain Viper' + '<Option value="67">Chopper' + '<Option value="176">Chucho FAV' + '<Option value="179">Cigarette Boat' + '<Option value="563">CM Santiago R10' + '<Option value="1505">Cleaver' + '<option value="225">Davy Crockett Hat' + '<Option value="1521">Dirt Bike' + '<Option value="1537">Envelope of Thai Baht' + '<Option value="1026">Executive Overcoat' + '<Option value="74">Falsified Documents' + '<Option value="78">Federal Agent' + '<Option value="61">Firebomb' + '<Option value="662">First Blood' + '<option value="1503">Forest Scorpion' + '<option value="222">Flintlock Pistols' + '<Option value="1529">Fugama Kame SUV' + '<Option value="200">Gaff Hook' + '<Option value="194">Garza 9' + '<option value="326">Ghost Thug' + '<option value="677">Golden Treasure Chest' + '<Option value="14">Grenade Launcher' + '<Option value="174">Guerrilla Squad' + '<Option value="70">GX-9' + '<option value="182">Hu-9 Helicopter' + '<Option value="1504">Hung Fa RPG' + '<Option value="1502">Jade Inlaid Pistols' + '<Option value="1526">Kage Jet' + '<Option value="1033">Klyk-9 Machine Pistol' + '<Option value="1501">Komodo Dragon' + '<Option value="1029">Konstantin Cargo Carrier' + '<Option value="1548">Lamang Motorcycle' + '<Option value="664">Laser Guided RPG' + '<Option value="1522">Lloyds Spectre' + '<Option value="60">Lucky Shamrock Medallion' + '<Option value="69">Luxury Yacht' + '<Option value="196">M16A1' + '<Option value="1524">MalayMobil Helang' + '<Option value="175">Mara Serpiente' + '<Option value="180">Mini Sub' + '<Option value="1000">Molotok Pistol' + '<Option value="178">Montaine 320' + '<Option value="1512">Muai Thai Bodyguard' + '<Option value="72">Multi-Purpose Truck' + '<option value="226">Musket' + '<option value="327">Mystery Van' + '<option value="1542">Nak Kah Shotgun' + '<Option value="20">Napalm' + '<Option value="19">Night Vision Goggles' + '<Option value="661">Ninja Sai' + '<Option value="177">Ocelot Armored Truck' + '<Option value="1516">Optical Camo Suit' + '<Option value="1021">Orel Armored Helicopter' + '<Option value="1027">Osa 17 Snowmobile' + '<Option value="199">Para 322' + '<Option value="667">Plasma Rifle' + '<Option value="1005">PNV' + '<Option value="76">Police Cruiser' + '<Option value="245">Politico Corrupto' + '<Option value="66">Prop Plane' + '<Option value="75">Private Jet' + '<Option value="195">RA-92' + '<Option value="1003">RAS-15' + '<Option value="1547">Raed Armored Sedan' + '<Option value="1022">Razoritel Grenade Launcher' + '<Option value="566">Rebel 2' + '<Option value="569">Red Angel' + '<option value="228">Red Coat' + '<Option value="1519">Riding Elephant' + '<Option value="665">Robber\'s Utility Belt' + '<Option value="1515">Royal Thai Army Beret' + '<Option value="1520">Royal Thai Army Jeep' + '<Option value="17">RPG Launcher' + '<Option value="565">Russian Dazatz 45' + '<Option value="197">Ru-38 Pistol' + '<Option value="1019">Ru-78 Heavy Machine Gun' + '<Option value="1001">RU-7 .45 Pistol' + '<option value="227">Saber' + '<Option value="1508">Scalding Hot Tea' + '<Option value="10">Semi-Automatic Shotgun' + '<Option value="1525">Seua Daao Sub' + '<Option value="1008">Severnyy Olen Snowbike' + '<Option value="1017">Shchuka Speed Boat' + '<Option value="1020">Shturmovik' + '<Option value="181">Si-14 Cargo Plane' + '<Option value="1513">Silk Scarf' + '<Option value="631">Sirroco 9Z' + '<Option value="564">Solar Flare' + '<Option value="8">Stab-Proof Vest' + '<Option value="204">Street Gang Member' + '<Option value="6">Tactical Shotgun' + '<Option value="1013">Taiga Combat Shotgun' + '<Option value="1506">Tanto' + '<Option value="562">Tasmanian' + '<Option value="567">Thai XS Max' + '<option value="1544">Titanium Mesh Jacket' + '<Option value="203">TNT' + '<Option value="262">Track Loader' + '<Option value="466">Treasure Chest' + '<option value="328">Treat Bag' + '<option value="224">Tri-Point Hat' + '<Option value="568">Trio Napoli' + '<Option value="1507">Type-103 Machine Gun' + '<Option value="1032">Ubijka Assault Rifle' + '<Option value="663">Ultrasonic Gun' + '<Option value="1016">Volk Luxury Sedan' + '<Option value="1034">Zmeya Carbon Blade' + '<Option value="1030">Zoloto Sports Car';
	var ba = '<option style="color:#33FF00;" value="Boosts"><< ALL BOOSTS >>' + '<option style="color:#33FF00;" value="EnergyBoosts">-- Energy Boosts --' + '<option value="17">Boosted Smoothie' + '<option value="10">Blueprints' + '<option value="2">Cappuccino' + '<option value="51">Chess Master' + '<option value="44">Faberge Hen' + '<option value="7">Fixer' + '<option value="39">Free Ride' + '<option value="29">Hidden Matryoshka' + '<option value="15">Inside Tip' + '<option value="40">Truck Driver' + '<option value="5">Problem Solver' + '<option style="color:#33FF00;" value="AttackBoosts">-- Attack Boosts --' + '<option value="56">Black Market Ammo' + '<option value="19">Blowfish Dart' + '<option value="46">Bola' + '<option value="47">Car Bomb' + '<option value="50">Champagne Bottle' + '<option value="54">Chisel' + '<option value="13">Corporate Muscle' + '<option value="16">Flaming Shot' + '<option value="30">Handy Man' + '<option value="32">Hollow Points' + '<option value="26">Hot Coffee' + '<option value="42">Liquid Courage' + '<option value="6">Semi-Pro Boxer' + '<option value="8">Sting Grenade' + '<option value="31">Throwing Knives' + '<option value="52">War Paint' + '<option style="color:#33FF00;" value="DefenseBoosts">-- Defense Boosts --' + '<option value="43">Berlin Wall Section' + '<option value="33">Boxer' + '<option value="4">Bulldog' + '<option value="34">Bullmastiff' + '<option value="25">Extra Pair of Eyes' + '<option value="48">Flash Bang' + '<option value="57">Hyper Alert Sentry' + '<option value="11">Injunction' + '<option value="35">Mr. Hot Sauce' + '<option value="53">Pepper Spray' + '<option value="18">Sandbag Wall' + '<option value="14">Shave & A Haircut' + '<option value="49">Smoke Grenade' + '<option value="1">Tripwire' + '<option value="28">Temporary Tattoo' + '<option style="color:#33FF00;" value="RobbingBoosts">-- Robbing Defense Boosts --' + '<option value="3">Alarm System' + '<option value="9">Bouncer' + '<option value="12">Motion Detector' + '<option value="20">Hobo Lookout' + '<option value="36">Lookout' + '<option value="27">Mutt' + '<option value="41">Political Favor' + '<option value="37">Reinforced Door' + '<option value="38">Surveillance Camera' + '<option style="color:#33FF00;" value="MoneyBoosts">-- Money Boosts --' + '<option value="55">Boutonniere' + '<option value="45">Money Sock';
	var bb = '<style type="text/css">' + '.sexy_table1{font-weight:bold; border: 1px solid #666666; padding-left:10px; background-color:black}' + '.sexy_menu1{font-weight:bold; background-color:black; padding-left:0px; padding-top:0px; padding-bottom:0px; padding-right:0px}' + '.sexy_error_table{font-size:17px; color:red; padding-left:10px}' + '.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; font-size:15px; }' + '.sexy_input{background-color:black; color:#D0D0D0; width:70%; font-size:15px; font-weight:bold; border: 1px solid #666666; padding-left:0.2em}' + '.sexy_start_gift{background:black; height:25px; border-width:0.5px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}' + '.sexy_stop_gift{background:black; height:25px; border-width:1px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}' + '.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 20px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}' + '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}' + '</style>';
	var bc = '<div id="poop_up" style="position: absolute; z-index: auto; display:none"></div>';
	table_html = bc + '<form id="something"><table width="750" style="background-color:black;">' + '<tr>' + '<table width="750" class="sexy_table1">' + '<tr>' + '<td width="70%" height="45" style="font-size:20px; padding-left:15px">Chucker v3.5</td>' + '<td width="27%" style="font-size:13px;"><a id="Website" href="http://arun.keen-computing.co.uk/" target="_blank">Arun\'s Mafia Wars Helpers</a></td>' + '<td width="3%"><a href="#" id="close"><img alt="X" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></td>' + '</tr>' + '</table>' + '<table width="750" class="sexy_menu1" cellspacing="0">' + '<tr class="sexy_menu1">' + '<td width="135" height="25" style="text-align: center; border:1px solid #666666"><a id="Features" href="http://arun.keen-computing.co.uk/?p=147" target="_blank">New Features</a></td>' + '<td width="165" style="text-align: center; border:1px solid #666666"><a id="BugsSuggestions" href="http://www.facebook.com/pages/Aruns-Mafia-Helpers/120797877952655" target="_blank">**NEW** Fan Page</a></td>' + '<td width="115" style="text-align: center; border:1px solid #666666"><a id="Pimp" href="http://mafia-taskforce.info/viewforum.php?f=6" target="_blank">Mafia Add</a></td>' + '<td width="115" style="text-align: center; border:1px solid #666666"><a id="Tips" href="http://mafia-taskforce.info/viewtopic.php?f=12&t=142" target="_blank">Tips/Tricks</a></td>' + '<td width="115" style="text-align: center; border:1px solid #666666"><a id="Donate" href="http://arun.keen-computing.co.uk/?page_id=31" target="_blank">Donate</a></td>' + '<td width="115" style="text-align: center; border:1px solid #666666"><a id="Updates">Updates</a></td>' + '</tr>' + '</table>' + '<table width="750" class="sexy_table1">' + '<tr height="25">' + '<td width="19%">Chuck at :</td>' + '<td width="27%"><input type=radio id=user_loc_profile value=1 name=user_loc checked></input>Get ID from Profile</td>' + '<td width="27%"><input type=radio id=user_loc_list value=1 name=user_loc style="background:black;"></input>User List ->>&nbsp;&nbsp;<a id="AddToFav" style="float:right"><img src="http://arun.keen-computing.co.uk/favstar.gif"></img></a><span style="float:right">&nbsp;&nbsp;</span><a id="ClearFav" style="float:right"><img src="http://arun.keen-computing.co.uk/unfavstar.gif"></img></a></td>' + '<td width="27%"><Select id="user_list" class="sexy_select" onclick="user_loc_list.checked=true;"></select></td>' + '</tr>' + '<tr height="20">' + '<td width="19%">Gift Type :</td>' + '<td width="27%"><input type=radio id=gift_cat value=1 name=gift_categ checked disabled></input>LOOT</td>' + '<td width="27%"><input id=gift_cat1 type=radio name=gift_categ value=0 disabled></input>COLLECTION</td>' + '<td width="27%"><input id=gift_cat2 name=gift_categ value=2 type=radio disabled></input>BOOST</td>' + '</tr>' + '<tr height="20">' + '<td width="19%">Gift :</td>' + '<td width="27%"><Select class="sexy_select" id="loot_gift_id">' + Z + '</select></td>' + '<td width="27%"><Select class="sexy_select" id="collection_gift_id">' + W + V + X + Y + '</select></td>' + '<td width="27%"><Select class="sexy_select" id="boost_gift_id">' + ba + '</select></td>' + '</tr>' + '<tr height="25">' + '<td width="19%">Quantity :</td>' + '<td width="27%"><input type="text" id="quantity" value="1" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></input>&nbsp;<input id="send_all" type="checkbox"></input>&nbsp;<input id="send_all_but_one" type="checkbox"></input></td>' + '<td colspan="2" id="item_quantity" style="padding-left:10px"></td>' + '</tr>' + '<tr height="25">' + '<td width="19%">Time Delay :</td>' + '<td width="27%"><input type="text" id="delay" value="2" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></input>&nbsp;<input id="force_timer" type="checkbox"></input></td>' + '<td align=right style="padding-left:5px">&nbsp;</td>' + '<td align=right style="padding-left:5px"><a id="add_to_wishlist" class="sexy_button_new"><span><span style="width:160px">ADD TO WISHLIST</span></span></a></td>' + '</tr>' + '<tr height="25">' + '<td colspan="4"><a id="begin" class="sexy_button_new"><span><span style="width:115px">START</span></span></a>&nbsp;&nbsp;' + '<a id="end" class="sexy_button_new"><span><span style="width:115px">STOP</span></span></a>&nbsp;&nbsp;' + '<a id="queue" class="sexy_button_new"><span><span style="width:115px">ADD TO QUEUE</span></span></a>&nbsp;&nbsp;' + '<a id="queue_clear" class="sexy_button_new"><span><span style="width:115px">CLEAR QUEUE</span></span></a>&nbsp;&nbsp;' + '<a id="send_all_items" class="sexy_button_new"><span><span style="width:115px">SEND ALL</span></span></a></td>' + '</tr>' + '</table>' + '<table width="750" class="sexy_table1">' + '<tr>' + '<td width="8%" valign="top">Log :</td>' + '<td width="5%" valign="top"><input type="text" id="log_size" value="10" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></input></td>' + '<td id="logger">&nbsp;</td>' + '</tr>' + '<tr>' + '<td>&nbsp;</td>' + '<td>&nbsp;</td>' + '<td id="logged"></td>' + '</tr>' + '</table>' + '<table width="750" class="sexy_table1">' + '<tr>' + '<td width="8%" valign="top">Queue :</td>' + '<td width="5%" valign="top"><input type="text" id="queue_size" value="10" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></input></td>' + '<td id="gift_queue">&nbsp;</td>' + '</tr>' + '</table>' + '<table width="750" class="sexy_table1">' + '<tr>' + '<td id="err_logger"></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '</table>' + '</form>';
	T.innerHTML = bb + U + table_html;
	S.insertBefore(T, S.firstChild);
	try {
		document.captureEvents(Event.MOUSEMOVE);
		document.onmousemove = function (e) {
			v = e.pageX;
			w = e.pageY
		}
	} catch(err) {
		document.getElementById('popup_fodder').innerHTML = 'Error - ' + err
	}
	var bd = readCookie('ChuckerFav');
	options_html = '';
	options_html += '<Option value=\'none\' style="color:red;">None</option>';
	if (bd != null) {
		bd = bd.split('|');
		options_html += '<Option value=\'none\'  style="color:#33FF00;" disabled>-- Favourites List --</option>';
		for (i = 1; i < bd.length; i++) {
			options_html += '<Option value=' + bd[i].split(':')[0] + '>' + bd[i].split(':')[1] + '</option>'
		}
	}
	options_html += '<Option value=\'none\'  style="color:#33FF00;" disabled>-- Friends --</option>';
	document.getElementById('user_list').innerHTML = options_html;
	document.getElementById("begin").onclick = start_send;
	document.getElementById("end").onclick = stop_send;
	document.getElementById("queue").onclick = add_to_queue;
	document.getElementById("queue_clear").onclick = clear_queue;
	document.getElementById("send_all_items").onclick = send_all_items;
	document.getElementById("add_to_wishlist").onclick = Add_to_Wishlist;
	document.forms.something.queue_size.onkeyup = queue_display;
	document.forms.something.log_size.onkeyup = log_display;
	document.getElementById("close").onclick = close_gifter;
	document.getElementById("send_all").onclick = send_all_qty;
	document.getElementById("send_all_but_one").onclick = send_all_qty;
	document.getElementById("ClearFav").onclick = ClearFav;
	document.getElementById("AddToFav").onclick = AddToFav;
	document.forms.something.loot_gift_id.onclick = loot_click;
	document.forms.something.collection_gift_id.onclick = collection_click;
	document.forms.something.boost_gift_id.onclick = boost_click;
	document.forms.something.loot_gift_id.onchange = loot_click;
	document.forms.something.collection_gift_id.onchange = collection_click;
	document.forms.something.boost_gift_id.onchange = boost_click;
	document.forms.something.loot_gift_id.onkeyup = loot_click;
	document.forms.something.collection_gift_id.onkeyup = collection_click;
	document.forms.something.boost_gift_id.onkeyup = boost_click;
	document.getElementById('Website').onmousemove = function () {
		popupballoon_display("Website")
	};
	document.getElementById('Website').onmouseout = popupballoon_hide;
	document.forms.something.force_timer.onmousemove = function () {
		popupballoon_display("Timer")
	};
	document.forms.something.force_timer.onmouseout = popupballoon_hide;
	document.forms.something.send_all.onmousemove = function () {
		popupballoon_display("Sendall")
	};
	document.forms.something.send_all.onmouseout = popupballoon_hide;
	document.forms.something.send_all_but_one.onmousemove = function () {
		popupballoon_display("SendallButOne")
	};
	document.forms.something.send_all_but_one.onmouseout = popupballoon_hide;
	document.getElementById('Features').onmousemove = function () {
		popupballoon_display("Features")
	};
	document.getElementById('Features').onmouseout = popupballoon_hide;
	document.getElementById('BugsSuggestions').onmousemove = function () {
		popupballoon_display("BugsSuggestions")
	};
	document.getElementById('BugsSuggestions').onmouseout = popupballoon_hide;
	document.getElementById('Pimp').onmousemove = function () {
		popupballoon_display("Pimp")
	};
	document.getElementById('Pimp').onmouseout = popupballoon_hide;
	document.getElementById('Donate').onmousemove = function () {
		popupballoon_display("Donate")
	};
	document.getElementById('Donate').onmouseout = popupballoon_hide;
	document.getElementById('Updates').onmousemove = function () {
		popupballoon_display("Updates")
	};
	document.getElementById('Updates').onmouseout = popupballoon_hide;
	document.getElementById('Tips').onmousemove = function () {
		popupballoon_display("Tips")
	};
	document.getElementById('Tips').onmouseout = popupballoon_hide;
	C = /local_xw_sig\s=\s'([^']+)/.exec(document.body.innerHTML);
	cb = /&cb=([a-z0-9]+)/.exec(document.body.innerHTML);
	gift_Cat = 1;
	gift_Id = 1;
	function add_to_queue() {
		N = gift_Cat;
		try {
			switch (true) {
			case document.forms.something.user_loc_profile.checked:
				try {
					var a = 0;
					var b = document.getElementsByTagName('a');
					for (i = 0; i < b.length; i++) {
						if (b[i].text == 'Profile' && a == 0) {
							a = 1
						} else if (b[i].text == 'Profile' && a == 1) {
							break
						}
					}
					if (a == 0 || i == b.length) {
						alert('Please head over to the recipient\'s MW Profile Page or Choose a recipient from the User list');
						return
					}
					P = b[i].href;
					Q = P.split("=");
					temp_receiverId = Q[Q.length - 1].replace('#', '');
					temp_receiverName = document.evaluate("//div[@class=\"title\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if ((/The Hospital/.test(temp_receiverName.snapshotItem(0).innerHTML)) || (/The Bank/.test(temp_receiverName.snapshotItem(0).innerHTML))) {
						temp_receiverName = temp_receiverName.snapshotItem(1).innerHTML
					} else {
						temp_receiverName = temp_receiverName.snapshotItem(0).innerHTML
					}
					temp_receiverName = /"([^"]+)/.exec(temp_receiverName)[1];
					temp_receiverName = temp_receiverName.replace(/:/g, '')
				} catch(err) {
					alert('Error adding to queue from Profile page - ' + err)
				}
				break;
			case document.forms.something.user_loc_list.checked:
				if (document.forms.something.user_list.value == 'none') {
					alert('Error ! No user selected');
					return
				}
				try {
					temp_receiverId = document.forms.something.user_list.value;
					temp_receiverName = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text
				} catch(err) {
					alert('Error adding to queue from User list - ' + err)
				}
				break
			}
			temp_Gifts = parseInt(document.forms.something.quantity.value);
			if (temp_Gifts < 1 || isNaN(temp_Gifts)) {
				alert('Hello Scrooge, You cant send 0 or blank gifts');
				document.forms.something.quantity.value = 1;
				temp_Gifts = 1;
				return
			}
			switch (N) {
			case 0:
				if (x == "Collection" || x == "NYCityCollection" || x == "BangkokCityCollection" || x == "MoscowCityCollection" || x == "CubaCityCollection") {
					add_set_to_queue()
				} else {
					p[p.length] = N + ":" + x + ":" + n + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
				break;
			case 1:
				if (x == "ChopShop" || x == "TopLoot" || x == "NYConsumables" || x == "MoscowConsumables" || x == "BKConsumables" || x == "WeaponsDepot" || x == "DepotParts" || x == "CarParts") {
					add_set_to_queue()
				} else {
					p[p.length] = N + ":" + x + ":" + n + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
				break;
			case 2:
				if (x == "EnergyBoosts" || x == "AttackBoosts" || x == "DefenseBoosts" || x == "RobbingBoosts" || x == "MoneyBoosts" || x == "Boosts") {
					add_set_to_queue()
				} else {
					p[p.length] = N + ":" + x + ":" + n + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
				break
			}
			queue_display()
		} catch(err) {
			alert_user('Error adding to queue -' + err)
		}
	}
	function removeItem() {
		var a = (this.id);
		a = /del([0-9]+)/.exec(a)[1];
		p.splice(a, 1);
		queue_display();
		return false
	}
	function clear_queue() {
		try {
			p = [];
			queue_display()
		} catch(err) {
			alert_user('Error in clearing - ' + err)
		}
	}
	function send_all_items() {
		switch (true) {
		case document.forms.something.user_loc_profile.checked:
			try {
				var a = 0;
				var b = document.getElementsByTagName('a');
				for (i = 0; i < b.length; i++) {
					if (b[i].text == 'Profile' && a == 0) {
						a = 1
					} else if (b[i].text == 'Profile' && a == 1) {
						break
					}
				}
				if (a == 0 || i == b.length) {
					alert('Please head over to the recipient\'s MW Profile Page or Choose a recipient from the User list');
					return
				}
				P = b[i].href;
				Q = P.split("=");
				receiver_profile_id = Q[Q.length - 1].replace('#', '');
				s = document.evaluate("//div[@class=\"title\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((/The Hospital/.test(s.snapshotItem(0).innerHTML)) || (/The Bank/.test(s.snapshotItem(0).innerHTML))) {
					s = s.snapshotItem(1).innerHTML
				} else {
					s = s.snapshotItem(0).innerHTML
				}
				s = /"([^"]+)/.exec(s)[1]
			} catch(err) {
				alert('Error adding to queue from Profile page - ' + err)
			}
			break;
		case document.forms.something.user_loc_list.checked:
			try {
				receiver_profile_id = document.forms.something.user_list.value;
				s = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text
			} catch(err) {
				alert('Error adding to queue from Profile page - ' + err)
			}
			break
		}
		var c, temp_giftId;
		for (c in A) {
			for (temp_giftId in A[c]) {
				if (parseInt(A[c][temp_giftId]) <= 0) {
					continue
				}
				p[p.length] = c + ":" + temp_giftId + ":" + r[c][temp_giftId] + ":" + receiver_profile_id + ":" + s + ":" + A[c][temp_giftId]
			}
		}
		queue_display();
		return false
	}
	function queue_display() {
		try {
			var i;
			var a;
			var b;
			if (p.length < parseInt(document.forms.something.queue_size.value)) {
				a = p.length
			} else {
				a = parseInt(document.forms.something.queue_size.value)
			}
			document.getElementById('gift_queue').innerHTML = '&nbsp;';
			try {
				for (i = 0; i < a; i++) {
					document.getElementById('gift_queue').innerHTML += p[i].split(":")[5] + '(x) ' + p[i].split(":")[2] + ' to ' + p[i].split(":")[4] + ' <a href=\'#\' id=\'del' + i + '\'><img alt="X" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a><br>'
				}
			} catch(err) {
				alert_user('Error displaying queue - ' + err)
			}
			try {
				for (i = 0; i < a; i++) {
					document.getElementById("del" + i).onclick = null;
					document.getElementById("del" + i).onclick = removeItem
				}
			} catch(err) {
				alert_user('Error assigning event - ' + err)
			}
		} catch(err) {
			alert_user('Error in Display queue - ' + err)
		}
	}
	function close_gifter() {
		stop = true;
		try {
			clearTimeout(H)
		} catch(err) {}
		try {
			xmlHTTP_quantity.abort()
		} catch(err) {}
		try {
			k.abort()
		} catch(err) {}
		try {
			xmlHTTP_sigupdate.abort()
		} catch(err) {}
		document.getElementById("popup_fodder").removeChild(document.getElementById("gifter_div"));
		return
	}
	function send_all_qty() {
		if (z == 'false') {
			logmsg('Quantity not updated, please wait until it updates', 'false');
			document.forms.something.send_all.checked = false;
			document.forms.something.send_all_but_one.checked = false;
			return
		}
		if (document.forms.something.send_all.checked) {
			if (isNaN(A[gift_Cat][x])) {
				document.forms.something.quantity.value = 1
			} else {
				document.forms.something.quantity.value = A[gift_Cat][x]
			}
		} else if (document.forms.something.send_all_but_one.checked) {
			if (isNaN(A[gift_Cat][x])) {
				document.forms.something.quantity.value = 1
			} else {
				document.forms.something.quantity.value = A[gift_Cat][x] - 1
			}
		} else {
			document.forms.something.quantity.value = 1
		}
	}
	function get_quantity() {
		switch (parseInt(gift_Cat)) {
		case 0:
			gift_Id = document.forms.something.collection_gift_id.value;
			break;
		case 1:
			gift_Id = document.forms.something.loot_gift_id.value;
			break;
		case 2:
			gift_Id = document.forms.something.boost_gift_id.value;
			break;
		default:
			alert('Select a Gift Type and Category !');
			exit();
			return
		}
		xmlHTTP_quantity = get_xmlHTTP();
		if (!xmlHTTP_quantity) {
			alert_user('Your browser does not support XMLHTTP.');
			return
		}
		z = 'false';
		try {
			quantity_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=1&xw_client_id=8&cb=' + cb[1];
			xmlHTTP_quantity.open('POST', quantity_url, true);
			xmlHTTP_quantity.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xmlHTTP_quantity.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xmlHTTP_quantity.setRequestHeader('Accept', '*/*');
			xmlHTTP_quantity.onreadystatechange = quantity_state;
			xmlHTTP_quantity.send('ajax=1&liteload=1&sf_xw_user_id=' + sender_profile_id + '&sf_xw_sig=' + local_xw_sig)
		} catch(err) {
			alert_user('catch block ' + err)
		}
	}
	function quantity_state() {
		document.getElementById('item_quantity').innerHTML = 'Updating quantity, Please wait...';
		try {
			if (xmlHTTP_quantity.readyState == 4) {
				if (xmlHTTP_quantity.status == 200) {
					var a = xmlHTTP_quantity.responseText;
					y = 0;
					if (/Gifting/.test(a)) {
						t = 0;
						clearTimeout(I);
						try {
							A = eval(/item_amounts\s=\s(.+)};/.exec(a)[0] + ';');
							r = eval(/item_names\s=\s(.+)};/.exec(a)[0] + ';')
						} catch(err) {
							alert('Error area 1 - ' + err)
						}
						var b = /gift_key"\svalue="([a-f0-9]+)/.exec(a)[1];
						if (gift_key == null) {
							gift_key = /gift_key"\svalue="([a-f0-9]+)/.exec(a)[1];
							createCookie('gkey', gift_key)
						}
						if ((gift_key != null) && (gift_key != b)) {
							gift_key = b;
							createCookie('gkey', gift_key)
						}
						if (!gift_key) {
							alert_user('Couldnt fetch Gift Key, Contact me with error details');
							return
						}
						if (R == true) {
							E = eval(/groups_levels\s=\s(.+)};/.exec(a)[0] + ';');
							for (receiver_id in E) {
								if (E[receiver_id] == undefined || E[receiver_id] == ' ') {
									continue
								}
								u[u.length] = [];
								u[u.length - 1][0] = E[receiver_id];
								u[u.length - 1][1] = receiver_id
							}
							u.sort();
							for (i = 0; i < u.length; i++) {
								options_html += '<Option value=' + u[i][1] + '>' + u[i][0] + '</option>'
							}
							document.getElementById('user_list').innerHTML = options_html;
							R = false
						}
						document.getElementById('item_quantity').innerHTML = '';
						switch (true) {
						case document.forms.something.gift_cat.checked:
							loot_click();
							break;
						case document.forms.something.gift_cat1.checked:
							collection_click();
							break;
						case document.forms.something.gift_cat2.checked:
							boost_click();
							break
						}
						z = 'true'
					} else {
						t++;
						if (t < 2) {
							document.getElementById('item_quantity').innerHTML = 'Error fetching quantity, Refreshing sig key, please wait';
							setTimeout(update_sw_sig, 1000)
						} else {
							document.getElementById('item_quantity').innerHTML = 'Error fetching quantity, please check that your gifting page exists..'
						}
					}
				} else if (xmlHTTP_quantity.status == 0) {
					clearTimeout(I);
					xmlHTTP_quantity.abort();
					alert_user('Error opening gifting page, please check that your gifting page exists..')
				} else {
					alert_user('Status - ' + xmlHTTP_quantity.status + ' Please check if you can access your gifting page')
				}
			}
		} catch(err) {
			alert('Error updating quantity\n\nError - ' + err)
		}
	}
	function update_sw_sig() {
		xmlHTTP_sigupdate = get_xmlHTTP();
		if (!xmlHTTP_sigupdate) {
			alert_user('Your browser does not support XMLHTTP.');
			return
		}
		try {
			document.getElementById('item_quantity').innerHTML = 'Fetching sig key...';
			var a = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=item&xw_action=view&xw_city=1&xw_client_id=8&cb=' + cb[1] + '&ajax=1&liteload=1&sf_xw_user_id=' + sender_profile_id + '&sf_xw_sig=' + local_xw_sig;
			xmlHTTP_sigupdate.open('GET', a, true);
			xmlHTTP_sigupdate.onreadystatechange = sigupdate_state;
			xmlHTTP_sigupdate.send(null)
		} catch(err) {
			alert_user('catch block ' + err)
		}
	}
	function sigupdate_state() {
		if (xmlHTTP_sigupdate.readyState == 4) {
			if (xmlHTTP_sigupdate.status == 200) {
				var a = xmlHTTP_sigupdate.responseText;
				local_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(a)[1];
				get_quantity()
			}
		}
	}
	function start_send() {
		stop = false;
		gifts_sent = 0;
		l = false;
		if (! (gift_key)) {
			gift_key = /gift_key=([a-z0-9]+)/.exec(document.body.innerHTML)[1]
		}
		cb = /&cb=([a-z0-9]+)/.exec(document.body.innerHTML);
		h = parseInt(document.forms.something.delay.value);
		if (h < 2) {
			alert('Too Low a value for delay, changing to 2 seconds');
			document.forms.something.delay.value = 2;
			h = 2
		}
		if (p.length == 0) {
			if (x == "Collection" || x == "TopLoot" || x == "NYConsumables" || x == "MoscowConsumables" || x == "BKConsumables" || x == "NYCityCollection" || x == "BangkokCityCollection" || x == "MoscowCityCollection" || x == "CubaCityCollection" || x == "ChopShop" || x == "WeaponsDepot" || x == "DepotParts" || x == "CarParts" || x == "EnergyBoosts" || x == "AttackBoosts" || x == "DefenseBoosts" || x == "RobbingBoosts" || x == "MoneyBoosts" || x == "Boosts") {
				if ((document.forms.something.user_loc_list.checked) && (document.forms.something.user_list.value == 'none')) {
					alert('Error ! No user selected');
					return
				}
				add_to_queue();
				setTimeout(start_send, 1000);
				return
			}
			switch (true) {
			case document.forms.something.user_loc_profile.checked:
				O = 0;
				var a = document.getElementsByTagName('a');
				for (i = 0; i < a.length; i++) {
					if (a[i].text == 'Profile' && O == 0) {
						O = 1
					} else if (a[i].text == 'Profile' && O == 1) {
						break
					}
				}
				if (O == 0 || i == a.length) {
					alert('Please head over to the recipient\'s MW Profile Page');
					return
				}
				P = a[i].href;
				Q = P.split("=");
				receiver_profile_id = Q[Q.length - 1].replace('#', '');
				break;
			case document.forms.something.user_loc_list.checked:
				if (document.forms.something.user_list.value == 'none') {
					alert('Error ! No user selected');
					return
				}
				receiver_profile_id = document.forms.something.user_list.value;
				break;
			default:
				return false
			}
			gifts = parseInt(document.forms.something.quantity.value);
			if (gifts < 1 || isNaN(gifts)) {
				alert('Hello Scrooge, You cant send 0 or blank gifts');
				document.forms.something.quantity.value = 1;
				gifts = 1;
				exit();
				return false
			}
			switch (gift_Cat) {
			case 0:
				gift_Id = document.forms.something.collection_gift_id.value;
				break;
			case 1:
				gift_Id = document.forms.something.loot_gift_id.value;
				break;
			case 2:
				gift_Id = document.forms.something.boost_gift_id.value;
				break;
			default:
				alert('Select a Gift Type and Category !');
				exit();
				return false
			}
			gift_Category = gift_Cat
		} else {
			gift_Cat = p[0].split(":")[0];
			gift_Category = p[0].split(":")[0];
			gift_Id = p[0].split(":")[1];
			x = p[0].split(":")[1];
			receiver_profile_id = p[0].split(":")[3];
			gifts = p[0].split(":")[5];
			try {
				p.splice(0, 1)
			} catch(err) {
				alert(err)
			}
			queue_display()
		}
		if (receiver_profile_id == 'p|47810573' || receiver_profile_id == '100000042375085') {
			alert('The person you are trying to Chuck to is a known Scammer. Aborting Chucking..');
			return
		}
		url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send&cb=' + cb[1] + '&user=' + receiver_profile_id + '&gift_category=' + gift_Category + '&gift_id=' + gift_Id + '&gift_key=' + gift_key + '&recipients[0]=p|60829583&recipients[1]=p|60842918&recipients[2]=p|60844941&recipients[3]=p|60846110&recipients[4]=p|60847032&recipients[5]=p|60847916&recipients[6]=p|57239677&recipients[7]=p|100173281&recipients[8]=p|100174948&recipients[9]=p|43688477' + '&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id=' + sender_profile_id + '&sf_xw_sig=' + local_xw_sig;
		logmsg('Starting the Chucker..', 'false');
		document.getElementById("begin").onclick = "return false;";
		document.getElementById("end").onclick = stop_send;
		try {
			K = A[gift_Cat][x]
		} catch(err) {
			alert('Error in item amounts - ' + err)
		}
		try {
			post_request()
		} catch(err) {
			alert(err)
		}
		return false
	}
	function post_request() {
		try {
			clearTimeout(H)
		} catch(err) {
			alert('Error in timer - ' + H)
		}
		try {
			if (gifts_sent < gifts && stop == false) {
				k = get_xmlHTTP();
				k.open('GET', url, true);
				k.onreadystatechange = state_change;
				H = setTimeout(function () {
					J = 'true';
					k.abort();
					hangup_check()
				},
				60000);
				k.send(null)
			} else if (stop == true) {
				if (gifts_sent > 0) {
					logmsg(gifts_sent + ' gifts sent, Stopped Chucking, now shutting down', 'true')
				}
				get_quantity();
				exit();
				return
			} else {
				logmsg('Fetching next item from Queue...', 'true');
				if (p.length == 0) {
					logmsg('All gifts sent', 'true');
					get_quantity();
					exit();
					return
				} else {
					gifts_sent = 0;
					gift_Cat = p[0].split(":")[0];
					gift_Category = p[0].split(":")[0];
					gift_Id = p[0].split(":")[1];
					x = p[0].split(":")[1];
					receiver_profile_id = p[0].split(":")[3];
					gifts = p[0].split(":")[5];
					try {
						p.splice(0, 1);
						queue_display()
					} catch(err) {
						alert(err)
					}
					url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send&cb=' + cb[1] + '&user=' + receiver_profile_id + '&gift_category=' + gift_Category + '&gift_id=' + gift_Id + '&gift_key=' + gift_key + '&recipients[0]=' + receiver_profile_id + '&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id=' + sender_profile_id + '&sf_xw_sig=' + local_xw_sig;
					post_request()
				}
			}
		} catch(err) {
			alert_user('Error in post request - ' + err)
		}
	}
	function state_change() {
		try {
			if (k.readyState == 4) {
				if (k.status == 200) {
					try {
						response = k.responseText;
						clearTimeout(H);
						J = 'false';
						M = 0
					} catch(err) {
						alert('Error in status 200 - ' + err)
					}
					try {
						if (/You gave/.test(response)) {
							try {
								m = /You gave (some|an|a)(.+) to (.+)\./i.exec(response);
								J = 'false';
								M = 0;
								gifts_sent++;
								logmsg('Sent <font color=#33FF00>' + gifts_sent + '(x)</font> of <font color=#33FF00>' + gifts + '</font> ' + m[2] + '(s) to <a href="http://apps.facebook.com/inthemafia/profile.php?id={%22user":"' + receiver_profile_id + '"}" target="_blank">' + m[3] + '</a>', 'false');
								try {
									local_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(response)[1]
								} catch(err) {}
								cb = /&cb=([a-z0-9]+)/.exec(response);
								url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send&cb=' + cb[1] + '&user=' + receiver_profile_id + '&gift_category=' + gift_Category + '&gift_id=' + gift_Id + '&gift_key=' + gift_key + '&recipients[0]=' + receiver_profile_id + '&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id=' + sender_profile_id + '&sf_xw_sig=' + local_xw_sig;
								if (document.forms.something.force_timer.checked) {
									document.forms.something.delay.value = 2
								}
								h = parseInt(document.forms.something.delay.value);
								if (isNaN(h) || h < 2) {
									document.forms.something.delay.value = 2;
									h = 2
								}
								setTimeout(function () {
									post_request()
								},
								h * 1000)
							} catch(err) {
								alert('Some error in received response - ' + err)
							}
						} else if (/Please wait a moment before sending another gift/.test(response)) {
							J = 'false';
							M = 0;
							if (document.forms.something.force_timer.checked) {
								logmsg('Gifting speed limit, Forced gifting at 2 seconds...', 'true');
								h = 2;
								document.forms.something.delay.value = 2
							} else {
								logmsg('Delay set too low, changed to 3 seconds. Retrying in 3 seconds...', 'true');
								h = 3;
								document.forms.something.delay.value = 3
							}
							url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send&cb=' + cb[1] + '&user=' + receiver_profile_id + '&gift_category=' + gift_Category + '&gift_id=' + gift_Id + '&gift_key=' + gift_key + '&recipients[0]=' + receiver_profile_id + '&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id=' + sender_profile_id + '&sf_xw_sig=' + local_xw_sig;
							setTimeout(function () {
								post_request()
							},
							h * 1000);
							return
						} else if (/Error while loading page from/.test(response)) {
							document.getElementById('logger').innerHTML = document.getElementById('logger').innerHTML + '<tr><td>Mafia Wars overloaded, waiting 30 seconds...';
							setTimeout(function () {
								post_request()
							},
							30000);
							return
						} else if (/have enough of that/.test(response)) {
							J = 'false';
							M = 0;
							logmsg('Insufficient quantity, fetching next item from queue..', 'true');
							gifts_sent = gifts;
							post_request()
						}
					} catch(err) {
						alert('Error in state_change - ' + err)
					}
				}
			}
		} catch(err) {
			alert('Error in state change function - ' + err)
		}
	}
	function hangup_check() {
		try {
			logmsg('Hangup, retrying...', 'true');
			logmsg('Possible hangup, retrying...', 'true');
			M++;
			if (M > 1) {
				logmsg('Hangup problem, Stopping, Please restart the Chucker try again..', 'true');
				exit();
				return
			}
			gifts_sent++;
			post_request()
		} catch(err) {
			alert_user('Error in hangup check - ' + err)
		}
	}
	function exit() {
		document.getElementById("begin").onclick = start_send;
		document.getElementById("end").onclick = "return false;";
		return
	}
	function get_xmlHTTP() {
		if (window.XMLHttpRequest) return new XMLHttpRequest();
		if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
		return
	}
	function stop_send() {
		stop = true;
		try {
			clearTimeout(H)
		} catch(err) {}
	}
	function loot_click() {
		gift_Cat = 1;
		document.forms.something.gift_cat.checked = true;
		x = document.forms.something.loot_gift_id.value;
		n = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex].text;
		if (A[gift_Cat][x] == 0 || isNaN(A[gift_Cat][x])) {
			document.getElementById('item_quantity').innerHTML = 'You\'ve got none of these.'
		} else {
			if (document.forms.something.send_all.checked) {
				document.forms.something.quantity.value = A[gift_Cat][x]
			}
			if (document.forms.something.send_all_but_one.checked) {
				document.forms.something.quantity.value = A[gift_Cat][x] - 1
			}
			document.getElementById('item_quantity').innerHTML = 'You\'ve got ' + A[gift_Cat][x] + ' of these.'
		}
	}
	function collection_click() {
		gift_Cat = 0;
		document.forms.something.gift_cat1.checked = true;
		x = document.forms.something.collection_gift_id.value;
		n = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex].text;
		if (A[gift_Cat][x] == 0 || isNaN(A[gift_Cat][x])) {
			document.getElementById('item_quantity').innerHTML = 'You\'ve got none of these.'
		} else {
			if (document.forms.something.send_all.checked) {
				document.forms.something.quantity.value = A[gift_Cat][x]
			}
			if (document.forms.something.send_all_but_one.checked) {
				document.forms.something.quantity.value = A[gift_Cat][x] - 1
			}
			document.getElementById('item_quantity').innerHTML = 'You\'ve got ' + A[gift_Cat][x] + ' of these.'
		}
	}
	function boost_click() {
		gift_Cat = 2;
		document.forms.something.gift_cat2.checked = true;
		x = document.forms.something.boost_gift_id.value;
		n = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex].text;
		if (A[gift_Cat][x] == 0 || isNaN(A[gift_Cat][x])) {
			document.getElementById('item_quantity').innerHTML = 'You\'ve got none of these.'
		} else {
			if (document.forms.something.send_all.checked) {
				document.forms.something.quantity.value = A[gift_Cat][x]
			}
			if (document.forms.something.send_all_but_one.checked) {
				document.forms.something.quantity.value = A[gift_Cat][x] - 1
			}
			document.getElementById('item_quantity').innerHTML = 'You\'ve got ' + A[gift_Cat][x] + ' of these.'
		}
	}
	function popupballoon_display(a) {
		try {
			document.getElementById('poop_up').style.top = (w + 20) + 'px';
			document.getElementById('poop_up').style.left = (v - 300) + 'px';
			document.getElementById('poop_up').style.width = '300px';
			document.getElementById('poop_up').style.display = 'block';
			switch (a) {
			case "Website":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Everything you need to know about using my BM\'s, please go through completely before posting any trouble you\'ve faced</div>';
				break;
			case "Timer":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Check this to force gift at 2 seconds and ignore Zynga Gifting speed limitations</div>';
				break;
			case "Sendall":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Send all of currently selected item</div>';
				break;
			case "SendallButOne":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Send all but one of currently selected item</div>';
				break;
			case "Features":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Queue system + Collection sending added. Please read the usage instructions before using to avoid confusion</div>';
				break;
			case "BugsSuggestions":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Bunch of Monkeys in the Facebook team blocked my last fan page, please subscribe to my new fan page for updates and stuff</div>';
				break;
			case "Pimp":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Need more Mafia ? Follow this link to the Dook-A-Friend <b>MANAGED</b> mass email list, and please follow rules when posting :)</div>';
				break;
			case "Tips":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">A Good source for Mafia Wars Tips and Tricks</div>';
				break;
			case "Donate":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">If you like my work, consider making a donation to keep it going :)</div>';
				break;
			case "Updates":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1" style="color:white">A List of the updates made -' + '<table><tr style="color:white; height:10px"></tr>' + '<tr><td style="color:white; height:25px"><li>Added new Bangkok loot, updated top 6</li></td></tr>' + '<tr><td style="color:white; height:25px"><li>Boosts categorized and sets added</li></td></tr>' + '<tr><td style="color:white; height:25px"><li>Add to Wishlist option</li></td></tr>' + '</table></div>';
				break
			}
		} catch(err) {
			alert(err)
		}
	}
	function popupballoon_hide() {
		document.getElementById('poop_up').style.display = 'none'
	}
	function logmsg(a, b) {
		try {
			var c = new Date().getHours();
			var d = new Date().getMinutes();
			c = (c < 10 ? '0' + c: c);
			d = (d < 10 ? '0' + d: d);
			if (b == 'true') {
				q[q.length] = document.getElementById('logger').innerHTML
			}
			log_display();
			document.getElementById('logger').innerHTML = '<font color=#666666>[' + c + ':' + d + ']</font> ' + a
		} catch(err) {
			alert_user('Error in log display - ' + err)
		}
	}
	function add_set_to_queue() {
		F = [];
		o = [];
		if (x == "Collection") {
			for (i = 1; i < 8; i++) {
				F[F.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "ChopShop" || x == "WeaponsDepot" || x == "NYConsumables") {
			for (i = 1; i < 6; i++) {
				F[F.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "MoscowConsumables" || x == "TopLoot") {
			for (i = 1; i < 7; i++) {
				F[F.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "BKConsumables") {
			for (i = 1; i < 4; i++) {
				F[F.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "CarParts") {
			for (i = 1; i < 8; i++) {
				F[F.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "NYCityCollection") {
			for (i = 1; i < 129; i += 8) {
				for (j = 1; j < 8; j++) {
					F[F.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].value;
					o[o.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].text
				}
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "CubaCityCollection") {
			for (i = 1; i < 41; i += 8) {
				for (j = 1; j < 8; j++) {
					F[F.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].value;
					o[o.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].text
				}
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "MoscowCityCollection") {
			for (i = 1; i < 49; i += 8) {
				for (j = 1; j < 8; j++) {
					F[F.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].value;
					o[o.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].text
				}
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "BangkokCityCollection") {
			for (i = 1; i < 41; i += 8) {
				for (j = 1; j < 8; j++) {
					F[F.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].value;
					o[o.length] = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex + i + j].text
				}
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "DepotParts") {
			for (i = 1; i < 9; i++) {
				F[F.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "Boosts") {
			for (i = 1; i < 59; i++) {
				var a = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				if (a == "EnergyBoosts" || a == "AttackBoosts" || a == "DefenseBoosts" || a == "RobbingBoosts" || a == "MoneyBoosts") {
					continue
				}
				F[F.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "EnergyBoosts") {
			for (i = 1; i < 12; i++) {
				F[F.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "AttackBoosts") {
			for (i = 1; i < 17; i++) {
				F[F.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "DefenseBoosts") {
			for (i = 1; i < 16; i++) {
				F[F.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "RobbingBoosts") {
			for (i = 1; i < 10; i++) {
				F[F.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
		if (x == "MoneyBoosts") {
			for (i = 1; i < 3; i++) {
				F[F.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].value;
				o[o.length] = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex + i].text
			}
			for (i = 0; i < F.length; i++) {
				if (A[N][F[i]] > 0 && !(isNaN(A[N][F[i]]))) {
					p[p.length] = N + ":" + F[i] + ":" + o[i] + ":" + temp_receiverId + ":" + temp_receiverName + ":" + temp_Gifts
				}
			}
		}
	}
	function UnixTS() {
		return (Math.round(new Date().getTime() / 1000))
	}
	function Add_to_Wishlist() {
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=collection&xw_action=wishlist_add&xw_city=1&cb=' + sender_profile_id + UnixTS() + '&selected_city=1&gift_category=' + gift_Cat + '&gift_id=' + x, 1, 1, 0, 0)
	}
	function log_display() {
		var a = 0,
		i;
		if (q.length < parseInt(document.forms.something.log_size.value)) {
			a = q.length
		} else {
			a = parseInt(document.forms.something.log_size.value)
		}
		document.getElementById('logged').innerHTML = '';
		for (i = q.length - 1; i >= (q.length - a); i--) {
			document.getElementById('logged').innerHTML += q[i] + '<br>'
		}
	}
	function AddToFav() {
		var a = document.forms.something.user_list.value;
		var b = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text;
		var c = readCookie('ChuckerFav');
		c = c + '|' + a + ':' + b;
		createCookie('ChuckerFav', c)
	}
	function ClearFav() {
		createCookie('ChuckerFav', '')
	}
	get_quantity()
})();
function field_validate(a) {
	if ((a >= 48 && a <= 57) || (a >= 96 && a <= 105) || a == 8 || a == 127 || a == 37 || a == 39 || a == 9 || a == 46) {
		return true
	} else {
		return false
	}
}
function alert_user(a) {
	var b = new Date().getHours();
	var c = new Date().getMinutes();
	b = (b < 10 ? '0' + b: b);
	c = (c < 10 ? '0' + c: c);
	try {
		document.getElementById('errormsg').innerHTML += '<tr style="padding-left:5px"><td>[' + b + ':' + c + '] ' + a + '</td></tr>'
	} catch(err) {}
}
function createCookie(a, b) {
	var c = new Date();
	c.setDate(c.getDate() + 30);
	document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + "; path=/"
}
function readCookie(a) {
	var i, cookie, nameEQ = a + "=",
	cookieArray = document.cookie.split(";");
	for (i = 0; i < cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
	}
	return null
}