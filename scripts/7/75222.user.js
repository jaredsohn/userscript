// ==UserScript==
// @name           Wishlister
// @namespace      Dedi Wishlister
// @include        http://facebook.mafiawars.com/*
// ==/UserScript==

function dedi_wl_execute(gift_id,gift_category)
	{
        var wl_url='remote/html_server.php?xw_controller=loot&xw_action=wishlist_add&gift_category='+gift_category+'&gift_id='+gift_id;
	return do_ajax('inner_page',wl_url,1,1,0,0);
	}
var cuba_collection ='<option value="CubaCityCollection" style="color:rgb(255, 217, 39);"><< CUBAN COLLECTIONS >>'+
			'<option value="Collection" style="color:#33FF00;"><< RUM DRINKS COLLECTION >>'+
			'<option value="2001">Pina Colada'+
			'<option value="2002">Hurricane'+
			'<option value="2003">Bahama Mama'+
			'<option value="2004">Mojito'+
			'<option value="2005">Rum Runner'+
			'<option value="2006">Long island Ice Tea'+
			'<option value="2007">Cuba Libre'+
			'<option value="Collection" style="color:#33FF00;"><< TROPICAL FRUITS COLLECTION >>'+
			'<option value="2008">Banana'+
			'<option value="2009">Lime'+
			'<option value="2010">Pineapple'+
			'<option value="2011">Papaya'+
			'<option value="2012">Coconut'+
			'<option value="2013">Passion Fruit'+
			'<option value="2014">Dragon Fruit'+
			'<option value="Collection" style="color:#33FF00;"><< ENTERTAINERS COLLECTION >>'+
			'<option value="2015">Magician'+
			'<option value="2016">Fan Dancer'+
			'<option value="2017">Comedian'+
			'<option value="2018">Band Leader'+
			'<option value="2019">Cabaret Singer'+
			'<option value="2020">Crooner'+
			'<option value="2021">Burlesque Dancer'+
			'<option value="Collection" style="color:#33FF00;"><< TROPICAL FISH COLLECTION >>'+
			'<option value="2022">Pufferfish'+
			'<option value="2023">Sergeant Major'+
			'<option value="2024">Yellowtail Snapper'+
			'<option value="2025">Great Barracuda'+
			'<option value="2026">Queen Angelfish'+
			'<option value="2027">Reef Shark'+
			'<option value="2028">Blue Marlin'+
			'<option value="Collection" style="color:#33FF00;"><< BEARDS COLLECTION >>'+
			'<option value="2029">Garibaldi'+
			'<option value="2030">Hulihee'+
			'<option value="2031">Vandyke'+
			'<option value="2032">Mutton Chops'+
			'<option value="2033">Soul Patch'+
			'<option value="2034">French Fork'+
			'<option value="2035">Fidel';

var ny_collection='<option value="Collection" style="color:red;"><< EASTER CRIME BASKET >>'+
			'<option value="100015">Striped Egg'+
			'<option value="100016">Polka Dot Egg'+
			'<option value="100017">Checkered Egg'+
			'<option value="100018">Plaid Egg'+
			'<option value="100019">Paisley Egg'+
			'<option value="100020">Last Year\'s Egg'+
			'<option value="100021">Golden Egg'+
            '<option value="Collection" style="color:red;"><< TOOLS OF THE TRADE COLLECTION >>'+
			'<option value="500001">Lock Picks'+
			'<option value="500002">Diamond Drill'+
			'<option value="500003">Flashlight'+
			'<option value="500004">Walkie Talkie'+
			'<option value="500005">Safecracker\'s Stethoscope'+
			'<option value="500006">Black Ski Masks'+
			'<option value="500007">Grappling Hooks'+
            '<option value="Collection" style="color:red;"><< STOLEN DIAMOND COLLECTION >>'+
			'<option value="500008">Hope Diamond'+
			'<option value="500009">Koh-I-Noor Diamond'+
			'<option value="500010">Great Star of Africa Diamond'+
			'<option value="500011">The Orloff Diamond'+
			'<option value="500012">The Sancy Diamond'+
			'<option value="500013">The Idol\'s Eye Diamond'+
			'<option value="500014">The Regent Diamond'+
            '<option value="Collection" style="color:red;"><< ST. PATRICK\'S DAY COLLECTION >>'+
			'<option value="100008">Irish Flag'+
			'<option value="100009">Leprechaun'+
			'<option value="100010">Green Fireworks'+
			'<option value="100011">Green Bowler\'s Cap'+
			'<option value="100012">Lucky Pint Glass'+
			'<option value="100013">Pot of Gold'+
			'<option value="100014">Uilleann Pipes'+
            '<option value="Collection" style="color:red;"><< PROTOTYPE CAR-JACKING >>'+
			'<option value="300001">GPS Signal Scrambler'+
			'<option value="300002">Tank of Gasoline'+
			'<option value="300003">Ignition Device'+
			'<option value="300004">Microchip Fitted Key'+
			'<option value="300005">Map of the Garage'+
			'<option value="300006">Counterfeit ID Badges'+
			'<option value="300007">Security Hacker'+
            '<option value="Collection" style="color:red;"><< THEFT OF A DRONE >>'+
			'<option value="300008">Classified Report'+
			'<option value="300009">Hijacked Transmitter'+
			'<option value="300010">Access Code'+
			'<option value="300011">Guards Schedule'+
			'<option value="300012">Calibration Manual'+
			'<option value="300013">Guidance Module'+
			'<option value="300014">UltraLite Fuel Cell'+
            '<option value="Collection" style="color:red;"><< WEAPONS SHIPMENT HIJACKING >>'+
			'<option value="300015">Shipment Info'+
			'<option value="300016">Schedule of Truck Route'+
			'<option value="300017">Road Block'+
			'<option value="300018">Container Key'+
			'<option value="300019">Rocket Ammo'+
			'<option value="300020">Tracking Laser Sight'+
			'<option value="300021">Carrying Case'+
            '<option value="Collection" style="color:red;"><< CHINESE NEW YEAR\'S COLLECTION >>'+
			'<option value="400001">Baoding Balls'+
			'<option value="400002">Cricket Cage'+
			'<option value="400003">Dragon Mask'+
			'<option value="400004">Four Toed Dragon'+
			'<option value="400005">Money Envelope'+
			'<option value="400006">Year of the Tiger'+
			'<option value="400007">Money Frog'+
            '<option value="Collection" style="color:red;"><< VALENTINE\'S DAY COLLECTION >>'+
			'<option value="100001">Heart Tattoo'+
			'<option value="100002">Shoot the Moon'+
			'<option value="100003">Stolen Heart'+
			'<option value="100004">Heart Locket'+
			'<option value="100005">Box of Chocolates'+
			'<option value="100006">Love Bear'+
			'<option value="100007">Valentine'+
			'<option value="NYCityCollection" style="color:rgb(255, 217, 39);"><< NEW YORK COLLECTION >>'+
			'<option value="Collection" style="color:#33FF00;"><< DIAMOND FLUSH COLLECTION >>'+
			'<option value="1036">Eight of Diamonds'+
			'<option value="1037">Nine of Diamonds'+
			'<option value="1038">Ten of Diamonds'+
			'<option value="1039">Jack of Diamonds'+
			'<option value="1040">Queen of Diamonds'+
			'<option value="1041">King of Diamonds'+
			'<option value="1042">Ace of Diamonds'+
			'<option value="Collection" style="color:#33FF00;""><< HEART FLUSH COLLECTION >>'+
			'<option value="1043">Eight of Hearts'+
			'<option value="1044">Nine of Hearts'+
			'<option value="1045">Ten of Hearts'+
			'<option value="1046">Jack of Hearts'+
			'<option value="1047">Queen of Hearts'+
			'<option value="1048">King of Hearts'+
			'<option value="1049">Ace of Hearts'+
			'<option value="Collection" style="color:#33FF00;"><< SCULPTURES COLLECTION >>'+
			'<option value="1022">Rat Sculpture'+
			'<option value="1023">Sheep Sculpture'+
			'<option value="1024">Rooster Sculpture'+
			'<option value="1025">Monkey Sculpture'+
			'<option value="1026">Tiger Sculpture'+
			'<option value="1027">Snake Sculpture'+
			'<option value="1028">Dragon Sculpture'+
			'<option value="Collection" style="color:#33FF00;"><< POKER CHIPS COLLECTION >>'+
			'<option value="1029">White Poker Chip'+
			'<option value="1030">Brown Poker Chip'+
			'<option value="1031">Red Poker Chip'+
			'<option value="1032">Blue Poker Chip'+
			'<option value="1033">Green Poker Chip'+
			'<option value="1034">Purple Poker Chip'+
			'<option value="1035">Gold Poker Chip'+
			'<option value="Collection" style="color:#33FF00;"><< CLUB FLUSH COLLECTION >>'+
			'<option value="1050">Eight of Clubs'+
			'<option value="1051">Nine of Clubs'+
			'<option value="1052">Ten of Clubs'+
			'<option value="1053">Jack of Clubs'+
			'<option value="1054">Queen of Clubs'+
			'<option value="1055">King of Clubs'+
			'<option value="1056">Ace of Clubs'+
			'<option value="Collection" style="color:#33FF00;"><< BOXING COLLECTION >>'+
			'<option value="1085">Hand Tape'+
			'<option value="1086">Gloves'+
			'<option value="1087">Headgear'+
			'<option value="1088">Boxing Trunks'+
			'<option value="1089">Speed Bag'+
			'<option value="1090">Heavy Bag'+
			'<option value="1091">Boxing Ring'+
			'<option value="Collection" style="color:#33FF00;"><< CIGARS COLLECTION >>'+
			'<option value="1001">Ebony Cigar'+
			'<option value="1002">Sky Cigar'+
			'<option value="1003">Rose Cigar'+
			'<option value="1004">Ivory Cigar'+
			'<option value="1005">Turquoise Cigar'+
			'<option value="1006">Gold Cigar'+
			'<option value="1007">Royal Cigar'+
			'<option value="Collection" style="color:#33FF00;"><< SPADE FLUSH COLLECTION >>'+
			'<option value="1057">Eight of Spades'+
			'<option value="1058">Nine of Spades'+
			'<option value="1059">Ten of Spades'+
			'<option value="1060">Jack of Spades'+
			'<option value="1061">Queen of Spades'+
			'<option value="1062">King of Spades'+
			'<option value="1063">Ace of Spades'+
			'<option value="Collection" style="color:#33FF00;"><< BILLIARDS COLLECTION >>'+
			'<option value="1092">One Ball'+
			'<option value="1093">Two Ball'+
			'<option value="1094">Three Ball'+
			'<option value="1095">Four Ball'+
			'<option value="1096">Five Ball'+
			'<option value="1097">Cue Ball'+
			'<option value="1098">Eight Ball'+
			'<option value="Collection" style="color:#33FF00;"><< RINGS COLLECTION >>'+
			'<option value="1008">Topaz Ring'+
			'<option value="1009">Opal Ring'+
			'<option value="1010">Amethyst Ring'+
			'<option value="1011">Emerald Ring'+
			'<option value="1012">Sapphire Ring'+
			'<option value="1013">Ruby Ring'+
			'<option value="1014">Diamond Ring'+
			'<option value="Collection" style="color:#33FF00;"><< TIES COLLECTION >>'+
			'<option value="1064">Solid Tie'+
			'<option value="1065">Striped Tie'+
			'<option value="1066">Checked Tie'+
			'<option value="1067">Geometric Tie'+
			'<option value="1068">Dot Tie'+
			'<option value="1069">Paisley Tie'+
			'<option value="1070">Knitted Tie'+
			'<option value="Collection" style="color:#33FF00;"><< PAINTINGS COLLECTION >>'+
			'<option value="1015">Warhol Painting'+
			'<option value="1016">Cezanne Painting'+
			'<option value="1017">Matisse Painting'+
			'<option value="1018">Van Gogh Painting'+
			'<option value="1019">Dali Painting'+
			'<option value="1020">Monet Painting'+
			'<option value="1021">Rembrandt Painting'+
			'<option value="Collection" style="color:#33FF00;"><< CUFFLINKS COLLECTION >>'+
			'<option value="1071">Silver Cufflinks'+
			'<option value="1072">Gold Cufflinks'+
			'<option value="1073">Amber Cufflinks'+
			'<option value="1074">Jasper Cufflinks'+
			'<option value="1075">Agate Cufflinks'+
			'<option value="1076">Onyx Cufflinks'+
			'<option value="1077">Pearl Cufflinks'+
			'<option value="Collection" style="color:#33FF00;"><< BARBER COLLECTION >>'+
			'<option value="1099">Barber Pole'+
			'<option value="1100">Razor'+
			'<option value="1101">Brush'+
			'<option value="1102">Seat'+
			'<option value="1103">Towel'+
			'<option value="1104">Scissors'+
			'<option value="1105">Cream'+
			'<option value="Collection" style="color:#33FF00;"><< GREAT RACE HORSES COLLECTION >>'+
			'<option value="1078">Mill Reef'+
			'<option value="1079">Sea Bird'+
			'<option value="1080">Arkle'+
			'<option value="1081">Golden Miller'+
			'<option value="1082">St Simon'+
			'<option value="1083">Ormonde'+
			'<option value="1084">Eclipse'+
			'<option value="Collection" style="color:#33FF00;"><< MONEY LAUNDERING COLLECTION >>'+
			'<option value="1113">Money Iron'+
			'<option value="1114">Dirty Laundry'+
			'<option value="1115">Dryer Sheets'+
			'<option value="1116">Money Line'+
			'<option value="1117">Roll of Quarters'+
			'<option value="1118">Death by Detergent'+
			'<option value="1119">Dirty Bra';

var moscow_collection='<option value="MoscowCityCollection" style="color:rgb(255, 217, 39); font-size=25px;"><< MOSCOW COLLECTION >>'+
			'<option value="Collection" style="color:#33FF00;"><< PRISON TATTOOS COLLECTION >>'+
			'<option value="3001">Rose Tattoo'+
			'<option value="3002">Church Tattoo'+
			'<option value="3003">Star Tattoo'+
			'<option value="3004">Spider Tattoo'+
			'<option value="3005">Tiger Tattoo'+
			'<option value="3006">Skull Tattoo'+
			'<option value="3007">Crucifix Tattoo'+
			'<option value="Collection" style="color:#33FF00;"><< MATRYOSHKA DOLLS COLLECTION >>'+
			'<option value="3008">Natalya\'s Doll'+
			'<option value="3009">Olga\'s Doll'+
			'<option value="3010">Oksana\'s Doll'+
			'<option value="3011">Svetlana\'s Doll'+
			'<option value="3012">Tatyana\'s Doll'+
			'<option value="3013">Anastasiya\'s Doll'+
			'<option value="3014">Ekaterina\'s Doll'+
			'<option value="Collection" style="color:#33FF00;"><< RUSSIAN LEADERS COLLECTION >>'+
			'<option value="3015">Medal of Gorbachev'+
			'<option value="3016">Medal of Yeltsin'+
			'<option value="3017">Medal of Brezhnev'+
			'<option value="3018">Medal of Kruschev'+
			'<option value="3019">Medal of Putin'+
			'<option value="3020">Medal of Stalin'+
			'<option value="3021">Medal of Lenin'+
			'<option value="Collection" style="color:#33FF00;"><< VODKA DRINKS COLLECTION >>'+
			'<option value="3022">Cosmopolitan'+
			'<option value="3023">Screwdriver'+
			'<option value="3024">Sex on the Beach'+		
			'<option value="3025">Bloody Mary'+
			'<option value="3026">Black Russian'+
			'<option value="3027">White Russian'+
			'<option value="3028">Soviet'+
			'<option value="Collection" style="color:#33FF00;"><< SOVIET MEMORABILIA COLLECTION >>'+
			'<option value="3029">Red Star'+
			'<option value="3030">Kremlin'+
			'<option value="3031">Communist Manifesto'+
			'<option value="3032">Propaganda Poster'+
			'<option value="3033">Hammer'+
			'<option value="3034">Sickle'+
			'<option value="3035">Bust of Lenin'+
			'<option value="Collection" style="color:#33FF00;"><< FABERGE EGGS COLLECTION >>'+
			'<option value="3036">Diamond Trellis Egg'+
			'<option value="3037">Jade Egg'+
			'<option value="3038">Military Egg'+
			'<option value="3039">Pansy Egg'+
			'<option value="3040">Rainbow Egg'+
			'<option value="3041">Winter Egg'+
			'<option value="3042">Peter the Great Egg';

var bangkok_collections='<option value="BangkokCityCollection" style="color:rgb(255, 217, 39); font-size=25px;"><< BANGKOK COLLECTIONS >>'+
			'<option value="Collection" style="color:#33FF00;"><< CHESS SET COLLECTION >>'+
			'<option value="4001">Chessboard'+
			'<option value="4002">Pawn'+
			'<option value="4003">Knight'+
			'<option value="4004">Bishop'+
			'<option value="4005">Rook'+
			'<option value="4006">Queen'+
			'<option value="4007">King'+
			'<option value="Collection" style="color:#33FF00;"><< MASKS COLLECTION >>'+
			'<option value="4008">Agat-Talai\'s Mask'+
			'<option value="4009">Sukreep\'s Mask'+
			'<option value="4010">Palee\'s Mask'+
			'<option value="4011">Phra Ram\'s Mask'+
			'<option value="4012">Indrachit\'s Mask'+
			'<option value="4013">Hanuman\'s Mask'+
			'<option value="4014">Tosakanth\'s Mask'+
			'<option value="Collection" style="color:#33FF00;"><< SPICES COLLECTION >>'+
			'<option value="4015">Coriander'+
			'<option value="4016">Garlic'+
			'<option value="4017">Turmeric'+
			'<option value="4018">Green Peppercorn'+
			'<option value="4019">Holy Basil'+
			'<option value="4020">Lemongrass'+
			'<option value="4021">Thai Chili'+
			'<option value="Collection" style="color:#33FF00;"><< CARVINGS COLLECTION >>'+
			'<option value="4022">Wall Carving'+
			'<option value="4023">Floral Statue'+
			'<option value="4024">Dragon Statue'+
			'<option value="4025">Decorative Nightstand'+
			'<option value="4026">Lotus Bloom'+
			'<option value="4027">Rearing Elephant'+
			'<option value="4028">Stone Buddha'+
			'<option value="Collection" style="color:#33FF00;"><< ORCHIDS COLLECTION >>'+
			'<option value="4029">Marco Polo'+
			'<option value="4030">Grace Pink'+
			'<option value="4031">Misteen'+
			'<option value="4032">Jade Siam'+
			'<option value="4033">Bom Gold'+
			'<option value="4034">Bom Blue'+
			'<option value="4035">Fatima';
            	


var ny_loot='<option style="color:#33FF00;" value="ChopShop">-- CHOP SHOP SET --'+
        '<Option value="535">Acetylene Torches'+
		'<Option value="534">Car Lift'+
		'<Option value="532">Cement Blocks'+
		'<Option value="533">Power Tools'+
		'<Option value="536">Shipping Containers'+
		'<option style="color:#33FF00;" value="CarParts">-- CAR BUILDING PARTS --'+
		'<Option value="570">Bulletproof Glass'+
		'<Option value="558">Car Parts'+
		'<Option value="559">Cuban Car Part'+
		'<Option value="635">High Tech Car Part'+
		'<Option value="560">Russian Car Part'+
		'<Option value="571">Solar Panel'+
		'<Option value="561">Thai Car Part'+
		'<option style="color:#33FF00;" value="WeaponsDepot">-- WEAPONS DEPOT SET --'+
		'<Option value="656">Arc Welder'+
		'<Option value="657">Buzzsaw'+
		'<option value="660">Forge'+
		'<Option value="659">Gun Drill'+
		'<Option value="658">Gunpowder'+
		'<option style="color:#33FF00;" value="DepotParts">-- WEAPON BUILDING PARTS --'+
		'<Option value="672">Boomerang'+
		'<Option value="669">Explosive Arrow'+
		'<Option value="673">Grapple'+
		'<Option value="671">Laser Range Finder'+
		'<Option value="655">Portable Fusion Reactor'+
		'<Option value="654">Railgun Barrel'+
		'<Option value="670">Sonic Emitter'+
		'<Option value="668">Weapon Part'+
		'<option style="color:#33FF00;" DISABLED>-- LOOT --'+
        '<Option value="1">.22 Pistol'+
		'<Option value="5">.45 Revolver'+
		'<Option value="15">.50 Caliber Rifle'+
		'<Option value="4">9mm Semi-Automatic'+
		'<Option value="202">Aguila HV .50 Sniper Rifle'+
		'<Option value="632">Andresen 420si'+
		'<Option value="1028">Arktichekij Gus'+
		'<Option value="1014">Armored Briefcase'+
		'<Option value="16">Armored Car'+
		'<Option value="77">Armored Limousine'+
		'<option value="183">Armored State Car'+
		'<Option value="11">Armored Truck'+
		'<Option value="201">ASC45 \'Conquistador\''+
		'<Option value="1500">Attack Cobra'+
		'<Option value="9">Automatic Rifle'+
		'<Option value="73">BA-12 Assault Rifle'+
		'<Option value="1002">Ballistic Knife'+
		'<Option value="1012">Bank Guard Uniform'+
		'<option value="223">Bayonet'+
		'<Option value="65">Blackmail Photos'+
		'<Option value="18">Bodyguards'+
		'<Option value="71">Bookie\'s Holdout Pistol'+
		'<Option value="1523">Bosozoku Convertible'+
		'<Option value="3">Brass Knuckles'+
		'<Option value="1509">BRM-38'+
		'<Option value="2">Butterfly Knife'+
		'<Option value="7">C4'+
		'<Option value="205">Camouflage Body Armor'+
		'<Option value="198">Cane Knife'+
		'<option value="229">Cannon'+
		'<Option value="261">Canonazo'+
		'<Option value="1007">Cherepakha Compact'+
		'<Option value="67">Chopper'+
		'<Option value="176">Chucho FAV'+
		'<Option value="179">Cigarette Boat'+
		'<Option value="563">CM Santiago R10'+
		'<Option value="1505">Cleaver'+
		'<Option value="63">Computer Set-Up'+
		'<Option value="62">Concealable Camera'+
		'<option value="225">Davy Crockett Hat'+
		'<Option value="1521">Dirt Bike'+
		'<Option value="1010">Dossier on Dmitri'+
		'<Option value="1535">Drug Shipment'+
		'<Option value="1537">Envelope of Thai Baht'+
		'<Option value="1026">Executive Overcoat'+
		'<Option value="74">Falsified Documents'+
		'<Option value="78">Federal Agent'+
		'<Option value="61">Firebomb'+
		'<Option value="662">First Blood'+
		'<option value="1503">Forest Scorpion'+
		'<option value="222">Flintlock Pistols'+
		'<Option value="1529">Fugama Kame SUV'+
		'<Option value="200">Gaff Hook'+
		'<Option value="194">Garza 9'+
		'<option value="326">Ghost Thug'+
		'<option value="677">Golden Treasure Chest'+
		'<Option value="14">Grenade Launcher'+
		'<Option value="174">Guerrilla Squad'+
		'<Option value="70">GX-9'+
		'<option value="182">Hu-9 Helicopter'+
		'<Option value="1504">Hung Fa RPG'+
		'<Option value="634">Hunter \'Spy\' XS'+
		'<Option value="68">Illegal Transaction Records'+
		'<Option value="1502">Jade Inlaid Pistols'+
		'<Option value="1526">Kage Jet'+
		'<Option value="1033">Klyk-9 Machine Pistol'+
		'<Option value="1501">Komodo Dragon'+
		'<Option value="1029">Konstantin Cargo Carrier'+
		'<Option value="664">Laser Guided RPG'+
		'<Option value="1522">Lloyds Spectre'+
		'<Option value="60">Lucky Shamrock Medallion'+
		'<Option value="69">Luxury Yacht'+
		'<Option value="196">M16A1'+
		'<Option value="1524">MalayMobil Helang'+
		'<Option value="1025">Mansion Details'+
		'<Option value="175">Mara Serpiente'+
		'<Option value="180">Mini Sub'+
		'<Option value="1000">Molotok Pistol'+
//		'<Option value="1514">Monk\'s Robe'+
		'<Option value="178">Montaine 320'+
		'<Option value="1512">Muai Thai Bodyguard'+
		'<Option value="633">Mugati Sport'+
		'<Option value="72">Multi-Purpose Truck'+
		'<option value="226">Musket'+
		'<option value="327">Mystery Van'+
		'<Option value="20">Napalm'+
		'<Option value="19">Night Vision Goggles'+
		'<Option value="661">Ninja Sai'+
		'<Option value="177">Ocelot Armored Truck'+
		'<Option value="1018">Officer Corps Paycheck'+
		'<Option value="1516">Optical Camo Suit'+
		'<Option value="1021">Orel Armored Helicopter'+
		'<Option value="1027">Osa 17 Snowmobile'+
		'<Option value="199">Para 322'+
		'<Option value="1011">Photos of Karpov'+
		'<Option value="1536">Pirates'+
		'<Option value="667">Plasma Rifle'+
		'<Option value="1005">PNV'+
		'<Option value="76">Police Cruiser'+
		'<Option value="245">Politico Corrupto'+
		'<Option value="66">Prop Plane'+
		'<Option value="75">Private Jet'+
		'<Option value="195">RA-92'+
		'<Option value="666">Railgun'+
		'<Option value="1003">RAS-15'+
		'<Option value="1022">Razoritel Grenade Launcher'+
		'<Option value="566">Rebel 2'+
		'<Option value="569">Red Angel'+
		'<option value="228">Red Coat'+
		'<Option value="1519">Riding Elephant'+
		'<Option value="665">Robber\'s Utility Belt'+
		'<Option value="1515">Royal Thai Army Beret'+
		'<Option value="1520">Royal Thai Army Jeep'+
		'<Option value="17">RPG Launcher'+
		'<Option value="565">Russian Dazatz 45'+
		'<Option value="197">Ru-38 Pistol'+
		'<Option value="1019">Ru-78 Heavy Machine Gun'+
		'<Option value="1001">RU-7 .45 Pistol'+
		'<option value="227">Saber'+
		'<Option value="1534">Satellite Phone'+
		'<Option value="1508">Scalding Hot Tea'+
		'<Option value="10">Semi-Automatic Shotgun'+
		'<Option value="1525">Seua Daao Sub'+
		'<Option value="1008">Severnyy Olen Snowbike'+
		'<Option value="1017">Shchuka Speed Boat'+
		'<Option value="1020">Shturmovik'+
		'<Option value="181">Si-14 Cargo Plane'+
		'<Option value="1513">Silk Scarf'+
		'<Option value="631">Sirroco 9Z'+
		'<Option value="564">Solar Flare'+
		'<Option value="8">Stab-Proof Vest'+
		'<Option value="1024">Bundle of Dynamite'+
		'<Option value="204">Street Gang Member'+
		'<Option value="6">Tactical Shotgun'+
		'<Option value="1013">Taiga Combat Shotgun'+
		'<Option value="1506">Tanto'+
		'<Option value="562">Tasmanian'+
		'<Option value="567">Thai XS Max'+
		'<Option value="203">TNT'+
		'<Option value="262">Track Loader'+
		'<Option value="466">Treasure Chest'+
		'<option value="328">Treat Bag'+
		'<option value="224">Tri-Point Hat'+
		'<Option value="568">Trio Napoli'+
		'<Option value="1507">Type-103 Machine Gun'+
		'<Option value="1032">Ubijka Assault Rifle'+
		'<Option value="663">Ultrasonic Gun'+
		'<Option value="64">Untraceable Cell Phone'+
		'<Option value="1016">Volk Luxury Sedan'+
		'<Option value="1034">Zmeya Carbon Blade'+
		'<Option value="1030">Zoloto Sports Car';

//var cuba_loot=;

//var moscow_loot=;

//var july_loot=;

//var halloween_loot=;

var boosts='<option style="color:#33FF00;" value="Boosts"><< ALL BOOSTS >>'+
        '<option value="3">Alarm System'+
		'<option value="43">Berlin Wall Section'+
		'<option value="56">Black Market Ammo'+
		'<option value="19">Blowfish Dart'+
		'<option value="10">Blueprints'+
		'<option value="46">Bola'+
		'<option value="17">Boosted Smoothie'+
		'<option value="9">Bouncer'+
		'<option value="55">Boutonniere'+
		'<option value="33">Boxer'+
		'<option value="4">Bulldog'+
		'<option value="34">Bullmastiff'+
		'<option value="2">Cappuccino'+
		'<option value="47">Car Bomb'+
		'<option value="50">Champagne Bottle'+
		'<option value="51">Chess Master'+
		'<option value="54">Chisel'+
		'<option value="13">Corporate Muscle'+
		'<option value="25">Extra Pair of Eyes'+
		'<option value="44">Faberge Hen'+
		'<option value="7">Fixer'+
		'<option value="16">Flaming Shot'+
		'<option value="48">Flash Bang'+
		'<option value="39">Free Ride'+
		'<option value="30">Handy Man'+
		'<option value="29">Hidden Matryoshka'+
		'<option value="20">Hobo Lookout'+
		'<option value="32">Hollow Points'+
		'<option value="26">Hot Coffee'+
		'<option value="57">Hyper Alert Sentry'+
		'<option value="11">Injunction'+
		'<option value="15">Inside Tip'+
		'<option value="42">Liquid Courage'+
		'<option value="36">Lookout'+
		'<option value="45">Money Sock'+
		'<option value="12">Motion Detector'+
		'<option value="35">Mr. Hot Sauce'+
		'<option value="27">Mutt'+
		'<option value="53">Pepper Spray'+
		'<option value="41">Political Favor'+
		'<option value="5">Problem Solver'+
		'<option value="37">Reinforced Door'+
		'<option value="18">Sandbag Wall'+
		'<option value="6">Semi-Pro Boxer'+
		'<option value="14">Shave & A Haircut'+
		'<option value="49">Smoke Grenade'+
		'<option value="8">Sting Grenade'+
		'<option value="38">Surveillance Camera'+
		'<option value="28">Temporary Tattoo'+
		'<option value="31">Throwing Knives'+
		'<option value="1">Tripwire'+
		'<option value="40">Truck Driver'+
		'<option value="52">War Paint';

content=document.getElementById('verytop');
  dedi_div=document.createElement("div");
  dedi_div.id = 'dedidiv';
  dedi_div.innerHTML = 'Select your wishlist item to set :\n'
+'<form><table><tr><td><select onchange="javascript:dedi_wl_execute(this.options[this.selectedIndex].value,1)">'+ny_loot+'</select></td><td><select onchange="javascript:dedi_wl_execute(this.options[this.selectedIndex].value,0)">'+ny_collection+cuba_collection+moscow_collection+bangkok_collections+'</select></td><td><select onchange="javascript:dedi_wl_execute(this.options[this.selectedIndex].value,2)">'+boosts+'</select></td></tr><tr><td>Dedi Naga-anakmedan wishlister</td></tr></table></form>';


content.insertBefore(dedi_div, content.firstChild);
