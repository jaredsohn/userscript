// ==UserScript==
// @name           Wall Manager Sidekick (RwF)
// @description    Assists Wall Manager with Raven-World Games
// @include        http*://www.facebook.com/dialog/feed
// @include        http*://www.facebook.com/plugins/serverfbml.php
// @include        /^(https?:\/\/(.*)\.(ravenwoodfair|ravenskyecity|ravenshirecastle)\.com)/
// @include        /^(https?:\/\/apps\.facebook\.com\/(ravenwoodfair|ravenskyecity|ravenshire))/
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @include        /https?:\/\/www\.facebook\.com\/dialog\/apprequests\?(.*)(app_id=(120563477996213|203160796361073|358393577546233))(.*)/
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.1.3.1
// @require        http://userscripts.org/scripts/source/123889.user.js
// @copyright      Charlie Ewing & Joe Simmons
// ==/UserScript== 
(function() { 

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && 
		!window.location.href.match( 
			/(^https?:\/\/www\.facebook\.com\/)|((ravenwoodfair|ravenskyecity|ravenshirecastle)(\.com)?\/(app\/(.*)\/)?(home|\?))/ 
		)
	) return;

	var version = "0.1.3";
	var appID = "120563477996213";
	var scriptID = "98167";

	var stage=0,defaultTO=null;

	var materials=[
		{id:"Crystal", name:"Crystal", event:"Common Materials"}, 
		{id:"Vitalin", name:"Vitalin", event:"Common Materials"}, 
		{id:"Ladybug", name:"Ladybug", event:"Common Materials"}, 
		{id:"Sap", name:"Sap", event:"Common Materials"}, 
		{id:"OneEnergy", name:"Energy", event:"Common Materials"}, 

		{id:"Basic_Stream", name:"Small Canal", event:"Common Materials", app:1}, 

		{id:"Wedding_Bell", name:"Wedding Bell", event:"Wedding"}, 
		{id:"Wedding_Bouquet", name:"Wedding Bouquet", event:"Wedding"}, 
		{id:"Wedding_RingPillow", name:"Wedding Ring", event:"Wedding"}, 
		{id:"Wedding_Gifts", name:"Wedding Gift", event:"Wedding"}, 
		{id:"Medieval2010_Acorn", name:"Acorn", event:"Resident's Series"}, 
		{id:"V1Pack2010_Ticket", name:"Ticket", event:"Common Materials"}, 

		{id:"Thanksgiving2010_AutumnLeaf", name:"Autumn Leaf", event:"Thanksgiving"}, 
		{id:"Thanksgiving2010_PumpkinPie", name:"Pumpkin Pie", event:"Thanksgiving"}, 
		{id:"Thanksgiving2010_Cornucopia", name:"Cornucopia", event:"Thanksgiving"}, 
		{id:"Thanksgiving2010_Musket", name:"Musket", event:"Thanksgiving"}, 

		{id:"Halloween2010_WaxCandle", name:"Wax Candle", event:"Halloween"}, 
		{id:"Halloween2010_SugarSkull", name:"Sugar Skull", event:"Halloween"}, 
		{id:"Halloween2010_CandyCorn", name:"Candy Corn", event:"Halloween"}, 
		{id:"Halloween2010_Pumpkin", name:"Pumpkin", event:"Halloween"}, 

		{id:"ChineseNY2011_RocketTubes", name:"Rocket Tubes", event:"Chinese New Year"}, 
		{id:"ChineseNY2011_BugBangs", name:"Bug Bangs", event:"Chinese New Year"}, 

		{id:"Winter2010_Snowflake", name:"Snowflake", event:"Christmas"}, 
		{id:"Winter2010_Fruitcake", name:"Fruitcake", event:"Christmas"}, 
		{id:"Winter2010_CandyCane", name:"Candy Cane", event:"Christmas"}, 
		{id:"Winter2010_Mistletoe", name:"Mistletoe", event:"Christmas"}, 

		{id:"DrCat2011_YarnBalls", name:"Yarn Balls", event:"Dr. Cat"}, 
		{id:"DrCat2011_Catnip", name:"Catnip", event:"Dr. Cat"}, 

		{id:"Residents2011_Heart", name:"Heart", event:"Resident's Series"}, 
		{id:"Residents2011_Pinecone", name:"Pinecone", event:"Resident's Series"}, 

		{id:"quest_rosepetals", name:"Rose Petals", event:"Resident's Series"}, 
		{id:"quest_cheatcodes", name:"Cheat Codes", event:"Resident's Series"}, 
		{id:"quest_wildflowers", name:"Wildflowers", event:"Resident's Series"}, 

		{id:"Valentines2011_CandyHeart", name:"Candy Heart", event:"Valentine's Day"}, 
		{id:"Valentines2011_Valentine", name:"Valentine", event:"Valentine's Day"}, 
		{id:"Valentines2011_HeartTile", name:"Heart Shaped Tile", event:"Valentine's Day"}, 
		{id:"Valentines2011_Heartwood", name:"Heartwood", event:"Valentine's Day"}, 

		{id:"GardenParty_Ribbon", name:"Ribbon", event:"Garden Party"}, 
		{id:"GardenParty_RSVP", name:"RSVP", event:"Garden Party"}, 
		{id:"GardenParty_Iris", name:"Iris", event:"Garden Party"}, 
		{id:"GardenParty_Petunia", name:"Petunia", event:"Garden Party"}, 
		{id:"GardenParty_Daffodil", name:"Daffodil", event:"Garden Party"}, 

		{id:"EmmetPlayers_SheetMusic", name:"Sheet Music", event:"Emmet Players"}, 
		{id:"EmmetPlayers_Whistle", name:"Whistle", event:"Emmet Players"}, 
		{id:"EmmetPlayers_Gear", name:"Gear", event:"Emmet Players"}, 

		{id:"Ravenrock_Pergium", name:"Pergium", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Brick", name:"Brick", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Wolfram", name:"Wolfram", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_FlameCrystal", name:"Flame Crystal", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Diamond", name:"Diamond", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Emerald", name:"Emerald", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_SiliconNodule", name:"Silicon Nodule", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Gold", name:"Gold Ore", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Ruby", name:"Ruby", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_Platinum", name:"Platinum", event:"Ravenrock Mine"}, 
		{id:"Ravenrock_VitalinGem", name:"Vitalin Gem", event:"Ravenrock Mine"}, 

		{id:"Mom11_StarLily", name:"Stargazer Lily", event:"Mother's Day"}, 
		{id:"Mom11_TeaCup", name:"Tea Cup", event:"Mother's Day"}, 
		{id:"Mom11_Wisteria", name:"Wisteria", event:"Mother's Day"}, 
		{id:"Mom11_NeatRock", name:"Nifty Rock", event:"Mother's Day"}, 
		{id:"Mom11_Frangipani", name:"Frangipani", event:"Mother's Day"}, 
		{id:"Mom11_Ink", name:"Ink", event:"Mother's Day"}, 

		{id:"JeffreyWorkshop_Cog", name:"Cog", event:"Jeffrey's Workshop"}, 
		{id:"JeffreyWorkshop_Spring", name:"Spring", event:"Jeffrey's Workshop"}, 
		{id:"JeffreyWorkshop_Schematic", name:"Schematic", event:"Jeffrey's Workshop"}, 
		{id:"JeffreyWorkshop_Garnet", name:"Garnet", event:"Jeffrey's Workshop"}, 
		{id:"JeffreyWorkshop_Dowel", name:"Dowel", event:"Jeffrey's Workshop"}, 
		{id:"JeffreyWorkshop_Hammer", name:"Hammer", event:"Jeffrey's Workshop"}, 

		{id:"PP_MagicHat", name:"Magicians Hat", event:"Party Time"}, 
		{id:"PP_GlassSlipper", name:"Glass Slipper", event:"Party Time"}, 
		{id:"PP_JuggleBalls", name:"Juggle Balls", event:"Party Time"}, 

		{id:"quest_notescraps", name:"Love Note Scraps", event:"Resident's Series"}, 

		{id:"Otter2011_WaterBucket", name:"Water Bucket", event:"Fish Tale Pond"}, 
		{id:"Otter2011_ShinyShell", name:"Shiny Shell", event:"Fish Tale Pond"}, 

		{id:"Foodcourt11_butter", name:"Butter", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_stick", name:"Stick", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_corn", name:"Corn", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_hotdog", name:"Sausage", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_apple", name:"Apple", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_strawberry", name:"Strawberry", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_lemon", name:"Lemon", event:"Carnival Cookout"}, 
		{id:"Foodcourt11_flour", name:"Flour", event:"Carnival Cookout"}, 

		{id:"School11_PencilBox", name:"Pencil Box", event:"Back To School"}, 
		{id:"School11_Blackboard", name:"Blackboard", event:"Back To School"}, 
		{id:"School11_SchoolBell", name:"School Bell", event:"Back To School"}, 
		{id:"School11_ColoredChalk", name:"Colored Chalk", event:"Back To School"}, 

		{id:"Fairy11_FairyWand", name:"Fairy Wand", event:"Flower Garden/Fairies"}, 
		{id:"Fairy11_Garland", name:"Garland", event:"Flower Garden/Fairies"}, 
		{id:"Fairy11_HandMirror", name:"Hand Mirror", event:"Flower Garden/Fairies"}, 
		{id:"Fairy11_FairyMask", name:"Fairy Mask", event:"Flower Garden/Fairies"}, 

		{id:"Arborea11_SawBlade", name:"Saw Blade", event:"Mysteries of the Forest"}, 
		{id:"Arborea11_Sapling", name:"Sapling", event:"Mysteries of the Forest"}, 
		{id:"Arborea11_PlantFood", name:"Plant Food", event:"Mysteries of the Forest"}, 
		{id:"Arborea11_ArtesianWater", name:"Artesian Water", event:"Mysteries of the Forest"}, 

		{id:"Zodiac11_EndymialTablet", name:"Endymial Tablet", event:"Zodiac"}, 
		{id:"Zodiac11_StarDust", name:"Star Dust", event:"Zodiac"}, 
		{id:"Zodiac11_GypsyRag", name:"Gypsy Rag", event:"Zodiac"}, 
		{id:"Zodiac11_UnderFlame", name:"Under-Flame of Lethem", event:"Zodiac"}, 

		{id:"RiseMoletron11_MoleSwarm", name:"Mole Swarm", event:"Rise of Moletron"}, 
		{id:"RiseMoletron11_CelestKeystone", name:"Keystone", event:"Rise of Moletron"}, 
		{id:"RiseMoletron11_PocketPortal", name:"Pocket Portal", event:"Rise of Moletron"}, 
		{id:"RiseMoletron11_Molunculi", name:"Molunculi", event:"Rise of Moletron"}, 

		{id:"Oktoberfest2011_Rootbier", name:"Rootbier", event:"Oktoberfest"}, 
		{id:"Oktoberfest2011_Accordion", name:"Accordion", event:"Oktoberfest"}, 
		{id:"Oktoberfest2011_Schnitzel", name:"Schnitzel", event:"Oktoberfest"},
		{id:"Oktoberfest2011_Sennerhut", name:"Sennerhut", event:"Oktoberfest"}, 
		{id:"Oktoberfest2011_Ribbon", name:"Ribbon", event:"Oktoberfest"}, 
		{id:"Oktoberfest2011_Pretzel", name:"Pretzel", event:"Oktoberfest"}, 

		{id:"SnagvineRoot", name:"Purified Snagvine Root", event:"Common Materials", app:1}, 
		{id:"Gustone", name:"Gustone", event:"Common Materials", app:1}, 
		{id:"Mortar", name:"Levonium Mortar", event:"Common Materials", app:1}, 
		{id:"RopeCoil", name:"Coiled Rope", event:"Common Materials", app:1}, 
		{id:"Nails", name:"Box of Nails", event:"Common Materials", app:1}, 
		{id:"Gem", name:"Gem", event:"Common Materials", app:1},
		{id:"Canvas", name:"Canvas", event:"Common Materials", app:1}, 
		{id:"Garden_Water", name:"Skye Water", event:"Common Materials", app:1}, 
		{id:"GoldenHills_GoldenMortar", name:"Golden Mortar", event:"Common Materials", app:1}, 
		{id:"Vineyard_Cork", name:"Cork", event:"Common Materials", app:1}, 

		{id:"Halloween11_ScaryMas", name:"Scary Mask", event:"Halloween"}, 
		{id:"Halloween11_VineRing", name:"Vine Ring", event:"Halloween"}, 
		{id:"Halloween11_ClothSpool", name:"Cloth Spool", event:"Halloween"}, 
		{id:"Halloween11_Sugar", name:"Sugar", event:"Halloween"}, 

		{id:"IntroSkye11_CrystalLens", name:"Crystal Lens", event:"Introducing Ravenskye City"}, 
		{id:"IntroSkye11_Sextant", name:"Sextant", event:"Introducing Ravenskye City"}, 
		{id:"IntroSkye11_ArtifactCrate", name:"Artifact Crate", event:"Introducing Ravenskye City"}, 
		{id:"IntroSkye11_LevEssence", name:"Levonium Essence", event:"Introducing Ravenskye City"}, 

		{id:"Opera11_OperaBill", name:"Opera Bill", event:"Opera"}, 
		{id:"Opera11_OperaGlasses", name:"Opera Glasses", event:"Opera"}, 
		{id:"Opera11_OperaTicket", name:"Opera Ticket", event:"Opera"}, 
		{id:"Opera11_Fan", name:"Opera Fan", event:"Opera"}, 
		{id:"Opera11_RoseBud", name:"Rosebud", event:"Opera"}, 
		{id:"Opera11_MagicFlute", name:"Magic Flute", event:"Opera"}, 

		{id:"AutumnLeaf", name:"Autumn Leaf B", event:"Thanksgiving", app:1}, 
		{id:"Thanksgiving_Hat", name:"Scarecrow Hat", event:"Thanksgiving", app:1}, 

		{id:"Magic11_MagiciansHat", name:"Magicians Hat", event:"Magic"}, 
		{id:"Magic11_CrystalBall", name:"Crystal Ball", event:"Magic"}, 
		{id:"Magic11_LovePotion", name:"Love Potion", event:"Magic"}, 
		{id:"Magic11_WitchesBroom", name:"Witches Broom", event:"Magic"}, 
		{id:"Magic11_MagicMedallion", name:"Magic Medallion", event:"Magic"}, 
		{id:"Magic11_GenieLamp", name:"Genie Lamp", event:"Magic"}, 
		{id:"Magic11_MagicSage", name:"Magic Sage", event:"Magic"}, 
		{id:"Magic11_MerlinsRing", name:"Merlins Ring", event:"Magic"}, 

		{id:"Thanksgiving11_SheafOfWheat", name:"Sheaf of Wheat", event:"Thanksgiving"}, 
		{id:"Thanksgiving11_ChrysanthemiumFlower", name:"Chrysantamium Flower", event:"Thanksgiving"}, 
		{id:"Thanksgiving11_Cranberries", name:"Cranberries", event:"Thanksgiving"}, 
		{id:"Thanksgiving11_PecanPie", name:"Pecan Pie", event:"Thanksgiving"}, 
		{id:"Thanksgiving11_TurkeyLeg", name:"Turkey Leg", event:"Thanksgiving"}, 
		{id:"Thanksgiving11_Beads", name:"Beads", event:"Thanksgiving"}, 
		{id:"Thanksgiving11_AcornSquash", name:"Acorn Squash", event:"Thanksgiving"}, 

		{id:"Christmas11_Ribbon", name:"Cloud Ribbon", event:"Skycicle Caverns", app:1}, 
		{id:"Christmas11_Wreath", name:"Holiday Wreath", event:"Skycicle Caverns", app:1},
 
		{id:"Vampires11_Bat", name:"Bat Symbol", event:"Vampires"}, 
		{id:"Vampires11_Sunglasses", name:"Sunglasses", event:"Vampires"}, 
		{id:"Vampires11_Crossbow", name:"Crossbow", event:"Vampires"}, 
		{id:"Vampires11_Torch", name:"Torch", event:"Vampires"}, 
		{id:"Vampires11_SilverChain", name:"Silver Chain", event:"Vampires"}, 
		{id:"Vampires11_Garlic", name:"Garlic", event:"Vampires"}, 
		{id:"Vampires11_Skull", name:"Vampire Skull", event:"Vampires"}, 
		{id:"Vampires11_Tomato", name:"Tomato", event:"Vampires"}, 

		{id:"Xmas11_Garland", name:"Garland", event:"Christmas"}, 
		{id:"Xmas11_FruitCake", name:"Fruitcake", event:"Christmas"}, 
		{id:"Xmas11_Skis", name:"Skis", event:"Christmas"}, 
		{id:"Xmas11_SnowMitten", name:"Snow Mittens", event:"Christmas"}, 
		{id:"Xmas11_Lights", name:"Holiday Lights", event:"Christmas"}, 
		{id:"Xmas11_SugarCookie", name:"Sugar Cookie", event:"Christmas"}, 
		{id:"Xmas11_ElfShoe", name:"Elf Shoes", event:"Christmas"}, 
		{id:"Xmas11_SantaHat", name:"Santa Hat", event:"Christmas"}, 

		{id:"FairyDust11_WaterLilly", name:"Water Lily", event:"Fairy Dust"}, 
		{id:"FairyDust11_Seeds", name:"Epimedium Seeds", event:"Fairy Dust"}, 
		{id:"FairyDust11_Epimedium", name:"Epimedium", event:"Fairy Dust"}, 
		{id:"FairyDust11_Necklace", name:"Necklace", event:"Fairy Dust"}, 

		{id:"NewYears11_Crackers", name:"Crackers", event:"New Years 11"}, 
		{id:"NewYears11_Horn", name:"Horn", event:"New Years 11"}, 
		{id:"NewYears11_Streamers", name:"Streamers", event:"New Years 11"},
		{id:"NewYears11_BowTie", name:"Bow Tie", event:"New Years 11"},
		{id:"NewYears11_Rocket", name:"Rocket", event:"New Years 11"}, 
		{id:"NewYears11_Crown", name:"Tiara", event:"New Years 11"}, 
		{id:"NewYears11_CiderFlutes", name:"Cider Flute", event:"New Years 11"}, 

		{id:"NewYears11_Noisemaker", name:"Noisemaker", event:"New Years 11", app:1}, 
		{id:"NewYears11_Fireworks", name:"Fireworks", event:"New Years 11", app:1}, 
		{id:"NewYears11_Matches", name:"Matches", event:"New Years 11", app:1}, 

		{id:"Interior_Astrolabe", name:"Levonium Astrolabe", event:"Interior", app:1}, 
		{id:"Interior_CoralSextant", name:"Coral Sextant", event:"Interior", app:1},
		{id:"Interior_EndyStone", name:"Endymial Stone", event:"Interior", app:1},
		{id:"Interior_Widget", name:"Widget", event:"Interior", app:1},

		{id:"WinterGarden_SnowbirdHat", name:"Snowbird Hat", event:"Snowbird", app:1}, 
		{id:"WinterGarden_SnowbirdMitten", name:"Snowbird Mitten", event:"Snowbird", app:1}, 
		{id:"WinterGarden_PresentSmall", name:"Small Present", event:"Snowbird", app:1}, 
		{id:"WinterGarden_PresentLarge", name:"Large Present", event:"Snowbird", app:1}, 
		{id:"WinterGarden_PresentMedium", name:"Medium Present", event:"Snowbird", app:1}, 

		{id:"Scroll", name:"Ancient Scroll", event:"Grand Library", app:1}, 
		{id:"Book", name:"Ancient Book", event:"Grand Library", app:1}, 

		{id:"MoleKingdom11_GoldenNugget", name:"Golden Nugget", event:"Mole Kingdom"}, 
		{id:"MoleKingdom11_IronOre", name:"Iron Ore", event:"Mole Kingdom"}, 
		{id:"MoleKingdom11_GardenShovel", name:"Garden Shovel", event:"Mole Kingdom"}, 
		{id:"MoleKingdom11_RockHammer", name:"Rock Hammer", event:"Mole Kingdom"}, 

		{id:"Water11_Cattail", name:"Cattail", event:"Water Wonderland"}, 
		{id:"Water11_SurfBoard", name:"Surfboard", event:"Water Wonderland"}, 
		{id:"Water11_Lillypad", name:"Lillypad", event:"Water Wonderland"}, 
		{id:"Water11_Towel", name:"Towel", event:"Water Wonderland"}, 
		{id:"Water11_InnerTube", name:"Innertube", event:"Water Wonderland"}, 
		{id:"Water11_Clam", name:"Clam", event:"Water Wonderland"}, 

		{id:"Flight_Hummingbox", name:"Hummingbox", event:"Flight Camp", app:1}, 

		{id:"WinterReengage12_Egg", name:"Hummingbird Egg", event:"Hummingbird Hatchery", app:1}, 
		{id:"WinterReengage12_Twig", name:"Twig", event:"Hummingbird Hatchery", app:1}, 
		{id:"WinterReengage12_Bottle", name:"Hummingbird Bottle", event:"Hummingbird Hatchery", app:1}, 
		{id:"WinterReengage12_Bib", name:"Hummingbird Bib", event:"Hummingbird Hatchery", app:1}, 

		{id:"FatCat_SlingShot", name:"Slingshot", event:"Fat Cat", app:1}, 
		{id:"FatCat_Catnip", name:"Catnip B", event:"Fat Cat", app:1}, 

		{id:"Dragon12_Scale", name:"Dragon Scale", event:"Dragon's Delight"}, 
		{id:"Dragon12_FirePellets", name:"Fire Pellet", event:"Dragon's Delight"}, 
		{id:"Dragon12_Seeds", name:"Fireithium Seed", event:"Dragon's Delight"}, 
		{id:"Dragon12_DragonBook", name:"Dragon Magic", event:"Dragon's Delight"}, 
		{id:"Dragon12_Banana", name:"Banana", event:"Dragon's Delight"}, 
		{id:"Dragon12_Chalice", name:"Golden Chalice", event:"Dragon's Delight"}, 

		{id:"Valentines12_Flower", name:"Friendship Flower", event:"Day of Love", app:1}, 
		{id:"Valentines12_Paper", name:"Construction Paper", event:"Day of Love", app:1}, 
		{id:"Valentines12_FriendValentine", name:"Friendship Valentine", event:"Day of Love", app:1}, 
		{id:"Valentines12_Doily", name:"Doily", event:"Day of Love", app:1}, 

		{id:"Valentines12_BowArrows", name:"Bow & Arrows", event:"Valentine's Day"}, 
		{id:"Valentines12_Chocolates", name:"Valentines Chocolates", event:"Valentine's Day"}, 
		{id:"Valentines12_Wreath", name:"Rose Wreath", event:"Valentine's Day"}, 
		{id:"Valentines12_Diamond", name:"Diamond Ring", event:"Valentine's Day"}, 
		{id:"Valentines12_Corsage", name:"Corsage", event:"Valentine's Day"}, 
		{id:"Valentines12_Cookie", name:"Heart Cookie", event:"Valentine's Day"}, 

		{id:"MardiGras12_Mask", name:"Mardi Gras Mask", event:"Mardi Gras"}, 
		{id:"MardiGras12_Saxophone", name:"Saxophone", event:"Mardi Gras"}, 
		{id:"MardiGras12_beads", name:"Bountiful Beads", event:"Mardi Gras"}, 
		{id:"MardiGras12_crawfish", name:"Crawfish", event:"Mardi Gras"}, 
		{id:"MardiGras12_trumpet", name:"Trumpet", event:"Mardi Gras"}, 
		{id:"MardiGras12_gumbo", name:"Gumbo", event:"Mardi Gras"}, 

		{id:"ChineseNewYear12_PaperCut", name:"Cut Paper", event:"Year of the Dragon", app:1}, 
		{id:"ChineseNewYear12_lacquer", name:"Lacquer", event:"Year of the Dragon", app:1}, 
		{id:"ChineseNewYear12_lionmask", name:"Lion Mask", event:"Year of the Dragon", app:1}, 
		{id:"ChineseNewYear12_dragonmask", name:"Dragon Mask", event:"Year of the Dragon", app:1}, 

		{id:"ThrillRides12_Candy", name:"Taffy Candy", event:"Thrill Rides"}, 
		{id:"ThrillRides12_Ticket", name:"Thrill Ticket", event:"Thrill Rides"}, 
		{id:"ThrillRides12_Peanuts", name:"Peanuts", event:"Thrill Rides"}, 
		{id:"ThrillRides12_CottonCandy", name:"Cotton Candy", event:"Thrill Rides"}, 

		{id:"Pirates_Decoy", name:"Decoy Map", event:"Pirates", app:1}, 
		{id:"Pirates_Ink", name:"Pirate Ink", event:"Pirates", app:1}, 
		{id:"Pirates_Fire", name:"Ever Fire", event:"Pirates", app:1}, 

		{id:"LittleWings_Chocolate", name:"Chocolate Bar", event:"Little Wings", app:1}, 
		{id:"LittleWings_Compass", name:"Compass", event:"Little Wings", app:1}, 
		{id:"LittleWings_Canteen", name:"Canteen", event:"Little Wings", app:1}, 
		{id:"LittleWings_Knife", name:"Pocket Knife", event:"Little Wings", app:1}, 
		{id:"LittleWings_MallowPuff", name:"Mallow Puff", event:"Little Wings", app:1}, 
		{id:"LittleWings_GolemNose", name:"Golem Nose", event:"Little Wings", app:1}, 

		{id:"Bugs12_CentipedeSaddle", name:"Centipede Saddle", event:"What's With The Bugs"}, 
		{id:"Bugs12_Sac", name:"Sleeping Sack", event:"What's With The Bugs"}, 
		{id:"Bugs12_BugWhistle", name:"Bug Whistle", event:"What's With The Bugs"}, 
		{id:"Bugs12_Shoe", name:"Bug Shoe", event:"What's With The Bugs"}, 

		{id:"Ireland12_Nickel", name:"Nickelknot", event:"Glimmerick Day", app:1}, 
		{id:"Ireland12_Bagpipes", name:"Bagpipes", event:"Glimmerick Day", app:1}, 
		{id:"Ireland12_CladdaghRing", name:"Claddagh Ring", event:"Glimmerick Day", app:1}, 
		{id:"Ireland12_Clover", name:"Clover", event:"Glimmerick Day", app:1}, 

		{id:"MoleKingdom12_MiningGloves", name:"Mining Gloves", event:"Building a Palace"}, 
		{id:"MoleKingdom12_LobatoSceptar", name:"Lobato Scepter", event:"Building a Palace"}, 
		{id:"MoleKingdom12_HardHat", name:"Hard Hat", event:"Building a Palace"}, 
		{id:"MoleKingdom12_KingLobatoCrown", name:"King's Crown", event:"Building a Palace"}, 
		{id:"MoleKingdom12_Blueprint", name:"Palace Blueprint", event:"Building a Palace"}, 

		{id:"StPatricks2011_Shamrock", name:"Shamrock", event:"St. Pat's"}, 
		{id:"StPattys12_CobblerHammer", name:"Cobbler Hammer", event:"St. Pat's"}, 
		{id:"StPattys12_Lute", name:"Lute", event:"St. Pat's"}, 
		{id:"StPattys12_GreenFizzy", name:"Green Fizzy Drink", event:"St. Pat's"}, 
		{id:"StPattys12_Rainbow", name:"Rainbow", event:"St. Pat's"}, 
		{id:"StPattys12_MagicDust", name:"Magic Leprechaun Dust", event:"St. Pat's"}, 
		{id:"StPattys12_LeprechaunShoes", name:"Leprechaun Shoes", event:"St. Pat's"}, 

		{id:"Knights_Adamant", name:"Adamant Shard", event:"Knights of Nyathi", app:1}, 
		{id:"Knights_Tapestry", name:"Tapestry", event:"Knights of Nyathi", app:1}, 
		{id:"Knights_Crest", name:"Crest", event:"Knights of Nyathi", app:1}, 
		{id:"Knights_Crystal", name:"Focusing Crystal", event:"Knights of Nyathi", app:1}, 
		{id:"Knights_Chainmail", name:"Chainmail", event:"Knights of Nyathi", app:1}, 
		{id:"Vineyard_LeonSword", name:"Leon's Sword", event:"Knights of Nyathi", app:1}, 

		{id:"BustOut_Stethescope", name:"Stethescope", event:"Spring Wellbeing", app:1}, 
		{id:"BustOut_Bandage", name:"Bandage", event:"Spring Wellbeing", app:1}, 
		{id:"BustOut_Airfreshener", name:"Air Freshener", event:"Spring Wellbeing", app:1}, 
		{id:"BustOut_Vaccine", name:"Vaccine", event:"Spring Wellbeing", app:1}, 

		{id:"Egg", name:"Easter Egg", event:"Easter"}, 
		{id:"Easter11_LilyMaterial", name:"Forest Lily", event:"Easter"}, 
		{id:"Easter11_ChocoBunny", name:"Chocolate Rabbit", event:"Easter"}, 

		{id:"Easter12_EasterBasket", name:"Easter Basket", event:"Easter"}, 
		{id:"Easter12_jellybeans", name:"Jelly Beans", event:"Easter"}, 
		{id:"Easter12_paint", name:"Easter Paint", event:"Easter"}, 
		{id:"Easter12_chocegg", name:"Chocolate Egg", event:"Easter"}, 
		{id:"Easter12_jeweledegg", name:"Jeweled Egg", event:"Easter"}, 

		{id:"CrimsonClaw_FingerprintPowder", name:"Fingerprint Powder", event:"Mystery of Crimson Claw", app:1}, 
		{id:"CrimsonClaw_magnifyingglass", name:"Magnifying Glass", event:"Mystery of Crimson Claw", app:1}, 
		{id:"CrimsonClaw_detectivebadge", name:"Detective Badge", event:"Mystery of Crimson Claw", app:1}, 

		{id:"MoleComfort12_Mail", name:"Ravenstone Mail", event:"Mole Comfort"}, 
		{id:"MoleComfort12_EarHorn", name:"Hear Better Horn", event:"Mole Comfort"}, 
		{id:"MoleComfort12_CotSet", name:"Cot Set", event:"Mole Comfort"}, 
		{id:"MoleComfort12_BoxCamera", name:"Boxy Camera", event:"Mole Comfort"}, 
		{id:"MoleComfort12_ShowerSet", name:"Shower Set", event:"Mole Comfort"}, 
		{id:"MoleComfort12_RockMugs", name:"Rock Juice Mugs", event:"Mole Comfort"}, 

		{id:"AprilFools12_SquirtyPen", name:"Squirty Pen", event:"April Fools"}, 
		{id:"AprilFools12_bugclownmask", name:"Bug Clown Mask", event:"April Fools"}, 
		{id:"AprilFools12_danglespider", name:"Dangle Spider", event:"April Fools"}, 
		{id:"AprilFools12_bugeyeglasses", name:"Bug Eye Glasses", event:"April Fools"}, 
		{id:"AprilFools12_trickcannon", name:"Trick Cannon", event:"April Fools"}, 

		{id:"RabbitDay12_Paintbrush", name:"Paintbrush", event:"Rabbit Day",app:1}, 
		{id:"RabbitDay12_egg", name:"Egg", event:"Rabbit Day",app:1}, 
		{id:"RabbitDay12_glitter", name:"Glitter", event:"Rabbit Day",app:1}, 

		{id:"Airboard_AirboardPennant", name:"Airboard Pennant", event:"Extreme Air",app:1}, 
		{id:"Airboard_goggles", name:"Airboarder Goggles", event:"Extreme Air",app:1}, 
		{id:"Airboard_designerfin", name:"Designer Fin", event:"Extreme Air",app:1}, 

		{id:"Science12_MagGlass", name:"Magnifying Glass B", event:"Exploring Science"}, 
		{id:"Science12_fieldbag", name:"Field Bag", event:"Exploring Science"}, 
		{id:"Science12_specjar", name:"Specimen Jar", event:"Exploring Science"}, 
		{id:"Science12_testtubes", name:"Test Tubes", event:"Exploring Science"}, 
		{id:"Science12_pithhelmet", name:"Pith Helmet", event:"Exploring Science"}, 
		{id:"Science12_fieldnotebook", name:"Field Notebook", event:"Exploring Science"}, 

		{id:"MarieMonsters_Tooth", name:"Monster Tooth", event:"Marie's Monsters",app:1}, 
		{id:"MarieMonsters_monstersketch", name:"Monster Sketch", event:"Marie's Monsters",app:1}, 

		{id:"Village12_RibbonCutScissors", name:"Ribbon Cutting Scissors", event:"Building a Village"}, 
		{id:"Village12_mayorsmedallion", name:"Mayor's Medallion", event:"Building a Village"}, 
		{id:"Village12_VillageMap", name:"Village Map", event:"Building a Village"}, 
		{id:"Village12_VillageDeed", name:"Village Deed", event:"Building a Village"}, 
		{id:"Village12_villageKey", name:"Village Key", event:"Building a Village"}, 

		{id:"RoyalStyle12_Crown", name:"Prince Crown", event:"Royal Style"}, 
		{id:"RoyalStyle12_MotleyCap", name:"Motley Cap", event:"Royal Style"}, 
		{id:"RoyalStyle12_PrincessGarland", name:"Princess Garland", event:"Royal Style"}, 
		{id:"RoyalStyle12_RoyalSash", name:"Royal Sash", event:"Royal Style"}, 
		{id:"RoyalStyle12_PatrickScepter", name:"Patrick's Scepter", event:"Royal Style"}, 

		{id:"RavenskyePark_Ticket", name:"Park Ticket", event:"Ravenskye Park", app:1}, 
		{id:"RavenskyePark_realisticmoss", name:"Realistic Moss", event:"Ravenskye Park", app:1}, 
		{id:"RavenskyePark_vintagestone", name:"Vintage Stone", event:"Ravenskye Park", app:1}, 

		{id:"cinco12_mexjumpbean", name:"Mexican Jumping Bean", event:"Cinco de Mayo"}, 
		{id:"cinco12_mexblanket", name:"Mexican Blanket", event:"Cinco de Mayo"}, 
		{id:"cinco12_hotpepper", name:"Red Hot Pepper", event:"Cinco de Mayo"}, 
		{id:"cinco12_maracas", name:"Maracas", event:"Cinco de Mayo"}, 
		{id:"cinco12_giantsombrero", name:"Giant Sombrero", event:"Cinco de Mayo"}, 

		{id:"noreserve12_windrocksalt", name:"Windrock Salt", event:"No Reserve", app:1}, 
		{id:"noreserve12_borrinpepper", name:"Borrin Pepper", event:"No Reserve", app:1}, 
		{id:"noreserve12_cazelumseed", name:"Cazelum Seed", event:"No Reserve", app:1}, 
		{id:"noreserve12_skyegrass", name:"Skyegrass", event:"No Reserve", app:1}, 
		{id:"noreserve12_skywaterbucket", name:"Skywater Bucket", event:"No Reserve", app:1}, 
		{id:"noreserve12_marricroot", name:"Marric Root", event:"No Reserve", app:1}, 
		{id:"noreserve12_goldspoons", name:"Gold Spoons", event:"No Reserve", app:1}, 
			
		{id:"momsday12_momcard", name:"Mom's Card", event:"Mother's Day"}, 
		{id:"momsday12_ravenperfume", name:"Raven Night Perfume", event:"Mother's Day"}, 
		{id:"momsday12_cozyslippers", name:"Cozy Slippers", event:"Mother's Day"}, 
		{id:"momsday12_candytruffles", name:"Candy Truffles", event:"Mother's Day"}, 
		{id:"momsday12_snugrobe", name:"Snug Robe", event:"Mother's Day"}, 

		{id:"CalliesJob_MysteryNovel", name:"Mystery Novel", event:"Callie's Job", app:1}, 
		{id:"CalliesJob_PinkSlip", name:"Pink Slip", event:"Callie's Job", app:1}, 

		{id:"ravenshire/gift/feed/?i=Vitalin", name:"Vitalin 2", event:"Common Materials", app:2}, 
		{id:"GatorCrest", name:"Silver Gator Crest", event:"Common Materials", app:2}, 
		{id:"PvpCrest", name:"Gold Player Crest", event:"Common Materials", app:2}, 
		{id:"Bauble", name:"Trinket", event:"Common Materials", app:2}, 
		{id:"Wood", name:"Wood", event:"Common Materials", app:2}, 
		{id:"Stone", name:"Stone", event:"Common Materials", app:2}, 
		{id:"Water", name:"Water", event:"Common Materials", app:2}, 
		
		{id:"skyefall_meteoritefragment", name:"Meteor Fragment", event:"SkyeFall", app:1}, 
		{id:"skyefall_opticallens", name:"Optical Lens", event:"SkyeFall", app:1}, 
		{id:"skyefall_sparkler", name:"Sparkler", event:"SkyeFall", app:1}, 

		{id:"RumorWar12_Steel", name:"Steel Cablings", event:"Rumors of War", app:1}, 
		{id:"RumorWar12_gunpowder", name:"Gun Powder", event:"Rumors of War", app:1}, 

		{id:"farmmarket12_hoe", name:"Hoe", event:"Farm Market"}, 
		{id:"farmmarket12_compostbag", name:"Compost Bag", event:"Farm Market"}, 
		{id:"farmmarket12_gloves", name:"Gloves", event:"Farm Market"}, 
		{id:"farmmarket12_strawhat", name:"Straw Hat", event:"Farm Market"}, 
		{id:"farmmarket12_rake", name:"Rake", event:"Farm Market"}, 

		{id:"elixir", name:"Elixir", event:"Common Materials", app:2}, 
		{id:"trinket", name:"Locket", event:"Common Materials", app:2}, 
		
		{id:"GolfKingdom12_GolfBall", name:"Golf Ball", event:"Golf in the Kingdom"}, 
		{id:"GolfKingdom12_Golfclubs", name:"Golf Clubs", event:"Golf in the Kingdom"}, 
		{id:"GolfKingdom12_tee", name:"Golf Tee", event:"Golf in the Kingdom"}, 
		{id:"GolfKingdom12_visor", name:"Golf Visor", event:"Golf in the Kingdom"}, 
		{id:"GolfKingdom12_golfglove", name:"Golf Gloves", event:"Golf in the Kingdom"}, 		

	];


	var newItems=[
		"golftee","golfclubs","golfball","golfvisor","golfgloves",
		"elixir","locket",
		
	];

	function dock(){
		var accTextMaterials=accTextFromData(materials,"send","",MENU_ID_ENFORCE_NAME);
		var accTextCustoms={wood:"Wood", energy:"Energy",coins:"Coins",doUnknown:"Unknown",food:"Food",wishlist:"Wishlist",send:"Unknown",other:"Other",mystery:"Mystery Gift/Collectible/Random"};


		var tests=[
			{link:"go play",ret:"exclude"},
			{link:"send thank you gift",ret:"exclude"},
			{link:"play ravenwood fair",ret:"exclude"},
			{html:'remindFriend.jpg',ret:'exclude'},
			{url:"type=sneak_friend_feed",ret:"exclude"},
			{url:'type=wishlist_request_feed',ret:"wishlist"},
			{url:'type=wishlist_gift_feed',ret:"exclude"}, //just a notification

			{url:'type=daily_login_feed',ret:'food',kids:[
				{url:"ravenskyecity",ret:'coins'}
			]},

			{url:'type=level_up',ret:'food',kids:[
				{url:"ravenskyecity",ret:'energy'}
			]},

			{url:'type={%1}', ret:'coins',subTests:[
				"quest_complete",	"visited_friend",	"new_visitor",
				"just_married_feed",	"build_wonder",		"achievement_feed",
				"converter_help_feed",
			]},

			{url:'type={%1}', ret:'food',subTests:[
				"clobber_monster",	"daily_quest_chain_complete",
			]},

			{url:'type={%1}', ret:'wood',subTests:[
				"building_complete",	"new_resident",	
			]},

			{url:'type={%1}', ret:'energy',subTests:[
				"thank_friend",		"set_the_date_feed",	
			]},

			{url:'type=party_in_progress',ret:'mystery'},
			{url:'type=collection_tradein_feed',ret:'other'},

			// Send materials links
			{url:'i=', ret:"send", kids:(function(){
				//create automated searches based upon material array above
				var ret=[];
				for(var m=0,mat;(mat=materials[m]);m++){
					ret.push({url:mat.id+"&",ret:"send"+mat.name.noSpaces().toLowerCase()});
				}
				return ret;
			})()},	
		
			{link:'food',ret:'food'},
			{link:'wood',ret:'wood'},
			{link:'coins',ret:'coins'},
			{link:'energy',ret:'energy'},
		];

		var menu={
			section_main:{type:'section',label:"Raven World Games ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/"+scriptID+".user.js'},
				donateRwF:{type:"link",label:"Donate for RwF/RsC Sidekick via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=RWFSK&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},

				communityrwf:{type:'link',label:'RavenWood Community Link Share',href:'http://forums.lolapps.com/forumdisplay.php?84-Co-operate!'},
				communityrsc:{type:'link',label:'RavenSkye Community Link Share',href:'http://forums.lolapps.com/forums/98-RSkye-Co-operate!'},
				communityrshc:{type:'link',label:'RavenShire Community Link Share',href:'http://forums.lolapps.com/forums/143-Ravenshire-Co-Operate-%28Neighbor-and-Item-Requests%29'},

				sepmain:{type:'separator',label:'Basics',kids:{
					basicsblock:{type:"optionblock",label:"Resouces",kids:{
						coins:{type:'checkbox',label:'Coins'},
						food:{type:'checkbox',label:'Food'},
						wood:{type:'checkbox',label:'Wood'},
						energy:{type:'checkbox',label:'Energy'},
						mystery:{type:'checkbox',label:'Mystery Gift'},
						other:{type:'checkbox',label:'Other'},
					}},
					doUnknown:{type:'checkbox',label:'Process Unknown Links'},
				}},

				helpseparator:{type:'separator',label:'Help Friends',kids:{
					sendall:{type:'checkbox',label:'Send on all requests (or pick from specifics below)'},
					send:{type:'checkbox',label:'Send Unrecognized Items'},
					wishlist:{type:'checkbox',label:'Send Wishlist Items (NOT included in \'send all\')'},

					help_rwf:{type:'separator',label:'Ravenwood Fair',kids:{
					}},

					help_rsc:{type:'separator',label:'Ravenskye City',kids:{
					}},

					help_rshc:{type:'separator',label:'RavenShire Castle',kids:{
					}},

				}},

			}},

		};

		menuFromData(matchByParam(materials,"app",null),menu.section_main.kids.helpseparator.kids.help_rwf.kids,newItems,"send",MENU_ID_ENFORCE_NAME);
		menuFromData(matchByParam(materials,"app",1),menu.section_main.kids.helpseparator.kids.help_rsc.kids,newItems,"send",MENU_ID_ENFORCE_NAME);
		menuFromData(matchByParam(materials,"app",2),menu.section_main.kids.helpseparator.kids.help_rshc.kids,newItems,"send",MENU_ID_ENFORCE_NAME);

		Sidekick.dock({
			appID:appID,
			synAppID:['203160796361073','358393577546233'],
			addFilters:[
				{appID:'203160796361073',name:'RavenSkye City',icon:'http://photos-g.ak.fbcdn.net/photos-ak-snc7/v43/117/203160796361073/app_2_203160796361073_6934.gif'},
				{appID:'358393577546233',name:'RavenShire Castle',icon:'http://photos-c.ak.fbcdn.net/photos-ak-snc7/v85006/145/358393577546233/app_2_358393577546233_1067800858.gif'}
			],
			name:'RavenWood Fair',
			alterLink:{},
			thumbsSource:['edgecastcdn.net','ravenskye-cdn.6waves.com'],
			flags:{httpsTrouble:true},
			icon:"http://photos-e.ak.fbcdn.net/photos-ak-snc7/v27562/245/120563477996213/app_2_120563477996213_5785.gif",
			desc:"RavenwoodFair, RavenskyeCity & Ravenshire Castle Sidekick (ver "+version+")",
			version:version,
			accText:mergeJSON(accTextMaterials, accTextCustoms),
			tests:tests,
			menu:menu,
		});
	};


	function getAutoSelect(){
		return selectSingleNode("//input[contains(@name,'opt_autoSelect')]");
	};

	function getAutoSelectMax(){
		return selectSingleNode("//input[contains(@name,'opt_autoSelectMax')]");
	};

	function finishPub(){
		var publish2=selectSingleNode(".//input[contains(@name,'sendit')]");
		if(publish2) {
			click(publish2);
		}
		else window.setTimeout(finishPub,1000);
	}	

	function moveOn(){
		if (!window.location.href.contains("ravenskye")) return;
		var play = selectSingleNode(".//div[@id='play_game']/a");
		if (play) window.setTimeout(function(){click(play);},5000);
	}

	function read(){
		try{
			var publish,multi,isRWF;
			if (window.location.href.find('serverfbml.php')){
				multi=selectSingleNode(".//div[contains(@class,'unselected_list')]");				
				publish=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'inputbutton request_form_submit')]");
				isRWF=(publish)?(publish.parentNode.innerHTML.find('"app_id":"120563477996213"')||publish.parentNode.innerHTML.find('"app_id":"358393577546233"')||publish.parentNode.innerHTML.find('"app_id":"203160796361073"')):false;
				if (publish && !isRWF) return;

			} else {
				publish=selectSingleNode(".//input[@name='publish']");
				if (!publish) publish=selectSingleNode(".//div[@id='send_gift']/a");
				if (!publish) publish=selectSingleNode(".//label[@id='ok_clicked']/input");
			}

			try {var isInvite = (publish)?publish.form.action.find('/invite_post?'):false;} catch(e) {var isInvite=false;};

			if (multi && stage==0){window.setTimeout(function(e){stage=1;read();},500);

			} else if (multi && stage==1 && !isInvite){
				var autoPub = getAutoSelect();
				var autoMax = getAutoSelectMax();
				var autoOn = (autoPub || autoMax);

				if (!autoOn){
					var options=selectNodes(".//input[contains(@type,'checkbox')]",{node:multi});
					if (options.snapshotLength>0 && options.snapshotLength<=40) for(i=0;i<options.snapshotLength;i++){click(options.snapshotItem(i));}
					stage=2;
				}

				window.setTimeout(read,1000);
				
			} else if (publish && stage!=3 && !isInvite){
				stage=3;
				window.setTimeout(function(){click(publish);},750);
				window.setTimeout(finishPub,1500);
				window.setTimeout(moveOn,1500);
			} else {
				var href=window.location.href;
				var html=document.documentElement.innerHTML;
				var statusCode=0;
				var gameLoaded=href.match( /(ravenwoodfair|ravenskyecity|ravenshire|ravenshirecastle)((\/home|\/\?)|((\.com)?\/(app\/(.*)\/)?(home|\?)))/gi );

				if (html.find("Sorry, we couldn't find that reward for you!")) statusCode=-2; //out of rewards
				else if (html.find("error with that reward")) statusCode=-1; //
				else if (html.find("You've already received this reward today")) statusCode=-6; //already got
				else if (html.find("You've already claimed your reward for this link")) statusCode=-6; //already claimed
				else if (html.find("You have claimed this type of reward too many times today")) statusCode=-3; //over limit
				else if (html.find("You've already claimed too many of this type")) statusCode=-3; //over limit
				else if (location.href.find("too+many+of+this+type")) statusCode=-3; //over limit
				else if (html.find("504 Gateway Time-out")) statusCode=-5; //server timeout
				else if (html.find("We are currently doing some scheduled work, but we'll be back soon!")) statusCode=-7; //server down for repairs
				else if (!html) statusCode=-5; //no document body
				else if (gameLoaded) statusCode=1; //assumes load is good

				//return the message
				if (statusCode!=0) sendMessage("status="+statusCode); else window.setTimeout(read,500);
			}


		} catch(e){
			window.setTimeout(read,500);
		}

	};	

	//start it up
	if (window.location.href.startsWith('http://www.facebook.com/') && !window.location.href.startsWith('http://www.facebook.com/plugins/serverfbml')) dock(); else read();


})(); // anonymous function wrapper end