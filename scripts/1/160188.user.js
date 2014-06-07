// ==UserScript==
// @name           KOL Initiative Helper
// @namespace      http://www.kingdomofloathing.com/showplayer.php?who=1297608
// @description    Shows initiative data when you mouse over a location.
// @include        http://127.0.0.1:*/*
// @include        http://*kingdomofloathing.com/*
// @exclude        http://127.0.0.1:*/adventure.php*
// @exclude        http://*kingdomofloathing.com/adventure.php*
// @exclude        http://127.0.0.1:*/fight.php*
// @exclude        http://*kingdomofloathing.com/fight.php*
// @exclude        http://127.0.0.1:*/lchat.php
// @exclude        http://*kingdomofloathing.com/lchat.php
// @exclude        http://127.0.0.1:*/mchat.php
// @exclude        http://*kingdomofloathing.com/mchat.php
// @exclude        http://127.0.0.1:*/chat.php
// @exclude        http://*kingdomofloathing.com/chat.php
// @exclude        http://127.0.0.1:*/mall.php*
// @exclude        http://*kingdomofloathing.com/mall.php*
// ==/UserScript==


var levelDisable = 13;
var currentLevel = GM_getValue("currentLevel", 0);
var currentLight = GM_getValue("moonlight", 0);
var grimaceDark = GM_getValue("grimacedark", 0);
var initArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [["Bar", 50], ["Spooky mummy", 50], ["Spooky vampire", 50], ["Triffid", 70], ["Warwelf", 50], ["Wolfman", 50], ["Hypodermic bugbear", "unknown"], ["Baiowulf", "unknown"]], [], [], [["Gnollish Crossdresser", 60], ["Gnollish Flyslayer", 60], ["Gnollish Gearhead", 60], ["Gnollish Piebaker", 60], ["Gnollish Plungermaster", 60], ["Gnollish Tirejuggler", 60], ["Gnollish War Chef", 60], ["Guard Bugbear", 60], ["One-eyed Gnoll", 60]], [], [["Bugbear-in-the-box", 70], ["Creepy clown", 85], ["Disease-in-the-box", 75], ["Lemon-in-the-box", 75], ["Scary clown", 80], ["Shaky clown", 80], ["The Clownlord Beelzebozo", 55]], [["Ghuol", "unknown"], ["Grave rober", "unknown"], ["Lihc", "unknown"], ["Skleleton", "unknown"], ["Smart Skelton", "unknown"], ["Zmobie (monster)", "unknown"], ["Zobmie", "unknown"], ["Count Bakula", "unknown"]], [["Brainsweeper", 45], ["Bread Golem", 45], ["Chowder Golem", 55], ["Lesser Fruit Golem", 45], ["Weretaco", 45], ["Yeast Beast", 55]], [], [], [], [["Crusty hippy", 60], ["Crusty hippy jewelry maker", 70], ["Crusty hippy Vegan chef", 70], ["Dirty hippy", 70], ["Dirty hippy jewelry maker", 70], ["Dirty hippy Vegan chef", 70], ["Filthy hippy", 70], ["Filthy hippy jewelry maker", 70], ["Filthy hippy Vegan chef", 70]], [["Orcish Frat Boy (Music Lover)", 60], ["Orcish Frat Boy (Paddler)", 60], ["Orcish Frat Boy (Pledge)", 60]], [], [["Orcish Frat Boy (Music Lover)", 60], ["Orcish Frat Boy (Paddler)", 60], ["Orcish Frat Boy (Pledge)", 60]], [["Albino bat", 60], ["Pine bat", 60], ["Regular old bat", 60], ["Batbugbear", "unknown"]], [["Baseball bat", 60], ["Briefcase bat", 60], ["Doughbat", 60], ["Perpendicular bat", 60], ["Skullbat", 60], ["Vampire bat", 60], ["Screambat", 50], ["Batbugbear", "unknown"]], [["Batrat", 60], ["Ratbat", 60], ["Screambat", 50], ["Batbugbear", "unknown"]], [["Beanbat", 60], ["Screambat", 50], ["Batbugbear", "unknown"]], [["Beefy bodyguard bat", 50], ["Boss Bat", 60]], [], [], [["Carnivorous dill plant", 70], ["Ghostly pickle factory worker", 70], ["Vine gar", 70]], [], [["Acid blob", 40], ["Large kobold", 45], ["Mind flayer", 75], ["Quantum Mechanic", 80], ["Swarm of killer bees", 90], ["Mimic (Cloak)", 75], ["The Master Of Thieves", "unknown"]], [], [], [], [["Axe handle", 40], ["Cloud of disembodied whiskers", 45], ["Forest spirit", 40], ["Poutine ooze", 30]], [["Decent lumberjack", 60], ["Lumberjack supervisor", 60], ["Lumberjill", 60], ["Lumberjuan", 60], ["Hockey elemental", "unknown"]], [["Angry pi\xF1ata", 50], ["Handsome mariachi", 50], ["Irate mariachi", 50], ["Mariachi calavera", 50], ["Raging bull", 75]], [["Gnarly gnome", 50], ["Gnasty gnome", 50], ["Gnefarious gnome", 50], ["Gnomester Blomester", 50], ["Gnu jack gnome", 50], ["Vicious gnauga", 60]], [["Angry bugbear", 10], ["Annoying spooky gravy fairy", 75], ["Bugged bugbear", 50], ["Mad bugbears", 50], ["Revolting bugbear", 50], ["Revolving bugbear", 50]], [["Spooky gravy fairy guard", 60], ["Spooky gravy fairy ninja", 100], ["Spooky gravy fairy warlock", 60], ["Felonia, Queen of the Spooky Gravy Fairies", 100]], [["Angry bugbear", 10], ["Annoying spooky gravy fairy", 75], ["Bugged bugbear", 50], ["Mad bugbears", 50], ["Revolting bugbear", 50], ["Revolving bugbear", 50]], [["Knob Goblin Mad Scientist", 70], ["Knob Goblin Very Mad Scientist", 70], ["Knob Goblin Alchemist", 50], ["Bugbear scientist", "unknown"]], [["BASIC Elemental", 60], ["Fruit Golem", 80], ["Knob Goblin Mutant", 70]], [["Carnivorous Moxie Weed", 80], ["Grass Elemental", 60], ["Weremoose", 70]], [["Booze Giant", 80], ["Portly Abomination", 70], ["Spectral Jellyfish", 60]], [], [], [], [], [["Corpulent zobmie", 50], ["Gaunt ghuol", 50], ["Gluttonous ghuol", 50], ["Grave rober zmobie", 50], ["Senile lihc", 50], ["Slick lihc", 50], ["Spiny skelelton", 50], ["Toothy sklelton", 50], ["Skelter Butleton, the Butler Skeleton", "unknown"], ["Count Bakula", "unknown"]], [], [], [], [], [], [], [["Crusty hippy", 60], ["Crusty hippy jewelry maker", 70], ["Crusty hippy Vegan chef", 70], ["Dirty hippy", 70], ["Dirty hippy jewelry maker", 70], ["Dirty hippy Vegan chef", 70], ["Filthy hippy", 70], ["Filthy hippy jewelry maker", 70], ["Filthy hippy Vegan chef", 70]], [["Sassy pirate", 60], ["Shady pirate", 75], ["Shifty pirate", 60], ["Smarmy pirate", 70], ["Swarthy pirate", 65]], [], [], [], [], [], [], [["Blooper", 60], ["Bullet Bill", 60], ["Buzzy Beetle", 60], ["Goomba", 60], ["Keese", 60], ["Koopa Troopa", 60], ["Octorok", 60], ["Tektite", 60], ["Zol", 60]], [], [], [], [], [], [], [["1335 HaXx0r", 50], ["Anime Smiley", 60], ["Bad ASCII Art", 50], ["Flaming Troll", 60], ["Lamz0r N00b", 70], ["Me4t begZ0r", 50], ["Rampaging adding machine", 50], ["Spam Witch", 70], ["XXX pr0n", 60]], [["Burly Sidekick", 80], ["Irritating Series of Random Encounters", 80], ["MagiMechTech MechaMech", 80], ["Protagonist", 80], ["Quiet Healer", 80], ["Spunky Princess", 90], ["Battlesuit Bugbear Type", "unknown"]], [], [["Astronomer", 70], ["Burrowing Bishop", 70], ["Family Jewels", 70], ["Hooded Warrior", 70], ["Junk", 70], ["One-Eyed Willie", 70], ["Pork Sword", 70], ["Skinflute", 70], ["Trouser Snake", 70], ["Twig and Berries", 70], ["Axe Wound (monster)", 70], ["Beaver", 70], ["Box (monster)", 70], ["Bush", 70], ["Camel's Toe", 70], ["Flange (monster)", 70], ["Honey Pot", 70], ["Little Man in the Canoe", 70], ["Muff", 70]], [], [["Dyspepsi-Cola General", "unknown"], ["Dyspepsi-Cola Knight", "unknown"], ["Dyspepsi-Cola Soldier", "unknown"], ["Cloaca-Cola Catapult Engineer", "unknown"], ["Cloaca-Cola Footsoldier", "unknown"], ["Cloaca-Cola Soldier", "unknown"], ["The Temporal Bandit", "unknown"]], [["Dyspepsi-Cola General", "unknown"], ["Dyspepsi-Cola Knight", "unknown"], ["Dyspepsi-Cola Soldier", "unknown"], ["Cloaca-Cola Catapult Engineer", "unknown"], ["Cloaca-Cola Footsoldier", "unknown"], ["Cloaca-Cola Soldier", "unknown"], ["The Temporal Bandit", "unknown"]], [["Dyspepsi-Cola General", "unknown"], ["Dyspepsi-Cola Knight", "unknown"], ["Dyspepsi-Cola Soldier", "unknown"], ["Cloaca-Cola Catapult Engineer", "unknown"], ["Cloaca-Cola Footsoldier", "unknown"], ["Cloaca-Cola Soldier", "unknown"], ["The Temporal Bandit", "unknown"]], [], [], [], [], [["Fluffy bunny", 50]], [], [], [], [["Swarm of Country Bats", 60], ["Trippy Floating Head (Casey Kasem)", 60], ["Trippy Floating Head (Grand Moff Tarkin)", 60], ["Trippy Floating Head (Mona Lisa)", 60], ["Zombie Baby", 60]], [["Angels of Avalon", 60], ["Bustle in the Hedgerow", 60], ["Elders of the Gentle Race", 60], ["Gathering of Angels?", 60], ["Higher Plane Serpents", 60]], [["Feeling That You're Being Watched", 60], ["Really Interesting Wallpaper", 60], ["Urge to Stare at Your Hands", 60], ["Visible Music", 60]], [["Angry raccoon puppet", 55], ["Business hippy", 0], ["EXtreme Sports Orcs", 5]], [["Knight in White Satin", 70], ["White chocolate golem", 70], ["White lion", 60], ["Whitesnake", 60]], [["Ghost miner", 50]], [["Demonic icebox", 50], ["Paper towelgeist", 30], ["Possessed silverware drawer", 50], ["Skullery maid", 50], ["Zombie chef", 50]], [["Anglerbush", "unknown"], ["Confused goth music student", 50], ["Man-eating plant", 50], ["Skeletal cat", 50], ["Skeletal hamster", 50], ["Skeletal monkey", "unknown"]], [["Banshee librarian", 0], ["Bookbat", 70], ["Writing desk", 50]], [["Chalkdust wraith", 50], ["Pooltergeist", 70], ["Pooltergeist (Ultra-Rare)", "unknown"], ["Hustled spectre", "unknown"]], [["Cubist bull", 50], ["Empty suit of armor", 0], ["Guy with a pitchfork, and his wife", 50], ["Ancient unspeakable bugbear", "unknown"], ["Knight (Wolf)", 50], ["Knight (Snake)", 50]], [["Claw-foot bathtub", 25], ["Malevolent hair clog", 35], ["Toilet papergeist", 0], ["Guy Made Of Bees", 0]], [["Animated nightstand (Mahogany)", 30], ["Animated nightstand (White)", 40], ["Animated nightstand (Mahogany)", 30], ["Animated nightstand (White)", 40], ["Remains of a jilted mistress", 50]], [["Floating platter of hors d'oeuvres", 0], ["Tapdancing skeleton", 50], ["Zombie waltzers", 50], ["Ghastly organist", 50]], [["Knott Yeti", 60], ["Snow Queen", 60], ["Upgraded ram", 50], ["Knott Slanding", "unknown"]], [["Black adder", 50], ["Black Knight", 50], ["Black panther", 50], ["Black widow", 50], ["Blackberry bush", 30]], [["Big creepy spider", 40], ["Completely different spider", 40], ["Drunken half-orc hobo", 40], ["Hung-over half-orc hobo", 40], ["Rushing bum", 40], ["Scavenger bugbear", "unknown"], ["Crazy bastard", "unknown"], ["Drunken half-orc hobo", 40]], [["Fiendish can of asparagus", 60], ["Flame-broiled meat blob", 60], ["Overdone flame-broiled meat blob", 60], ["Possessed can of tomatoes", 60], ["Undead elbow macaroni (monster)", 60], ["Drunken half-orc hobo", 40], ["Knob Goblin Assistant Chef", 40]], [["Knob Goblin Assistant Chef", 40], ["Knob Goblin Barbecue Team", 60], ["Sleeping Knob Goblin Guard", 0], ["Sub-Assistant Knob Mad Scientist", 60]], [], [], [], [], [["Bob Racecar", 80], ["Drab Bard", 40], ["Evil Olive", 55], ["Flock of Stab-bats", 90], ["Racecar Bob", 80], ["Taco Cat", 30], ["Tan Gnat", 50], ["Dr. Awkward", "unknown"]], [], [["Cactuary", 10], ["Giant giant giant centipede", 50], ["Plaque of locusts", 30], ["Rock scorpion", 30], ["Swarm of fire ants", 60]], [["Blur", 40], ["Oasis monster", 40], ["Rolling stone", 50], ["Swarm of scarab beatles", 50]], [["Cactuary", 10], ["Giant giant giant centipede", 50], ["Plaque of locusts", 30], ["Rock scorpion", 30], ["Swarm of fire ants", 60]], [["Tomb asp", 70], ["Tomb rat", 50], ["Tomb servant", 20]], [["Iiti Kitty", 75], ["Tomb bat", 50], ["Tomb servant", 20]], [["Dirty thieving brigand", 50]], [["Larval filthworm", 50]], [["Filthworm drone", 50]], [["Filthworm royal guard", 50]], [["Queen filthworm", 50]], [["War Hippy drill sergeant", 60], ["War Hippy (space) cadet", 50], ["Orcish Frat Boy Spy", 60]], [["Bailey's Beetle", "unknown"], ["Green Ops Soldier", 100], ["Mobile Armored Sweat Lodge", "unknown"], ["War Hippy Airborne Commander", 70], ["War Hippy Baker", 40], ["War Hippy Dread Squad", 20], ["War Hippy Elder Shaman", "unknown"], ["War Hippy Elite Fire Spinner", "unknown"], ["War Hippy Elite Rigger", "unknown"], ["War Hippy Fire Spinner", "unknown"], ["War Hippy F.R.O.G.", "unknown"], ["War Hippy Green Gourmet", "unknown"], ["War Hippy Homeopath", 30], ["War Hippy Infantryman", 50], ["War Hippy Naturopathic Homeopath", "unknown"], ["War Hippy Rigger", 50], ["War Hippy Shaman", "unknown"], ["War Hippy Sky Captain", 70], ["War Hippy Windtalker", 80], ["C.A.R.N.I.V.O.R.E. Operative", "unknown"], ["Glass of Orange Juice", "unknown"], ["Neil", "unknown"], ["Slow Talkin' Elliot", "unknown"], ["Zim Merman", "unknown"]], [["War Hippy drill sergeant", 60], ["War Hippy (space) cadet", 50], ["Orcish Frat Boy Spy", 60]], [["Frat Warrior drill sergeant", 60], ["War Pledge", 40], ["War Hippy Spy", 60]], [["Frat Warrior drill sergeant", 60], ["War Pledge", 40], ["War Hippy Spy", 60]], [["Lobsterfrogman", 40]], [["Generic duck", "unknown"]], [["Amateur ninja", 75], ["Ancient insane monk", 50], ["Ferocious bugbear", 50], ["Gelatinous cube", 50], ["Knob Goblin poseur", 50]], [], [["Beer Bongadier", "unknown"], ["Elite Beer Bongadier", "unknown"], ["Heavy Kegtank", "unknown"], ["Naughty Sorority Nurse", "unknown"], ["Panty Raider Frat Boy", "unknown"], ["Sorority Nurse", 30], ["Sorority Operator", 80], ["War Frat 110th Infantryman", 40], ["War Frat 151st Captain", "unknown"], ["War Frat 151st Infantryman", 40], ["War Frat 500th Infantrygentleman", 40], ["War Frat Elite 110th Captain", "unknown"], ["War Frat Elite 500th Captain", "unknown"], ["War Frat Elite Wartender", "unknown"], ["War Frat Grill Sergeant", "unknown"], ["War Frat Kegrider", 20], ["War Frat Mobile Grill Unit", 70], ["War Frat Senior Grill Sergeant", "unknown"], ["War Frat Wartender", "unknown"], ["Brutus, the toga-clad lout", "unknown"], ["Danglin' Chad", "unknown"], ["Monty Basingstoke-Pratt, IV", "unknown"], ["Next-generation Frat Boy", "unknown"], ["War Frat Streaker", "unknown"]], [["Figure-skating duck", 50], ["Frozen duck", 50]], [["Fire-breathing duck", 50], ["Scorched duck", 50]], [["Greasy duck", 70]], [["Rotund duck", 40]], [["Rattlin' duck", 60], ["Swamp duck", 50]], [["Vampire duck", 50], ["Zombie duck", 40]], [["Drunk duck", 40], ["Mean drunk duck", 50]], [], [["Caveman hippy", 20], ["Cavewomyn hippy", 25], ["Sabre-toothed ferret", 75]], [["Caveman frat boy", 80], ["Caveman frat pledge", 25], ["Caveman sorority girl", 75], ["Trendy bugbear chef", "unknown"]], [["Ancient Mariner", 50], ["Angry poet", 60], ["Kubla Khan", 60], ["Roller-skating Muse", 70], ["Toothless mastiff bitch", 50]], [["Bellhop", 50], ["Black cat", 80], ["Ourang-Outang", 60], ["Raven", 90], ["Usher", 50]], [["Can-can dancer", 70], ["Courtesan", 60], ["Master of ceremonies", 60], ["Sensitive poet-type", 60], ["Voyeuristic artist", 50]], [["A.M.C. gremlin", 60], ["Batwinged gremlin", 60], ["Erudite gremlin", 60], ["Spider gremlin", 60], ["Vegetable gremlin", 60]], [["Figure-skating duck", 50], ["Fire-breathing duck", 50], ["Frozen duck", 50], ["Greasy duck", 70], ["Mean drunk duck", 50], ["Rattlin' duck", 60], ["Rotund duck", 40], ["Scorched duck", 50], ["Swamp duck", 50], ["Vampire duck", 50], ["Zombie duck", 40]], [], [["Tetchy pirate", 50], ["Toothy pirate", 50], ["Tipsy pirate", 50]], [["Chatty pirate", 50], ["Cleanly pirate", 50], ["Clingy pirate (female)", 50], ["Clingy pirate (male)", 50], ["Creamy pirate", 50], ["Crusty pirate", 50], ["Curmudgeonly pirate", 50]], [["Wacky pirate", 50], ["Warty pirate", 50], ["Wealthy pirate", 50], ["Whiny pirate", 50], ["Witty pirate", 50]], [["Gaudy pirate", 50], ["Grassy pirate", 50], ["Gritty pirate", 50], ["Groovy pirate", 50], ["Grungy pirate", 50]], [], [], [], [["Bizarre construct", "unknown"], ["Hulking construct", "unknown"], ["Industrious construct", "unknown"], ["Lonely construct", "unknown"], ["Menacing construct", "unknown"], ["Towering construct", "unknown"]], [], [["C. H. U. M.", 0], ["Giant zombie goldfish", 60], ["Sewer gator", 60], ["C. H. U. M. chieftain", "unknown"]], [["Normal hobo", 100], ["Hodgman, The Hoboverlord", "unknown"]], [["Hot hobo", "unknown"], ["Ol' Scratch", 150]], [["Cold hobo", "unknown"], ["Frosty", 195]], [["Stench hobo", "unknown"], ["Oscus", 200]], [["Spooky hobo", "unknown"], ["Zombo", 195]], [["Sleaze hobo", "unknown"], ["Chester", 200]], [], [], [], [], [["Digital underground dweller", 0], ["Dwarvish gnome", 0], ["Spelunking astronaut", 0], ["Velvet underground dweller", 0], ["Weather underground dweller", 0]], [["Possessed wine rack", 40], ["Skeletal sommelier", 65]], [["Possessed wine rack", 40], ["Skeletal sommelier", 65]], [["Possessed wine rack", 40], ["Skeletal sommelier", 65]], [["Possessed wine rack", 40], ["Skeletal sommelier", 65]], [["A.M.C. gremlin", 60], ["Batwinged gremlin (quest)", 60], ["Batwinged gremlin", 60], ["Vegetable gremlin", 60]], [["A.M.C. gremlin", 60], ["Batwinged gremlin", 60], ["Spider gremlin (quest)", 60], ["Spider gremlin", 60]], [["A.M.C. gremlin", 60], ["Erudite gremlin (quest)", 60], ["Erudite gremlin", 60], ["Spider gremlin", 60]], [["A.M.C. gremlin", 60], ["Erudite gremlin", 60], ["Vegetable gremlin (quest)", 60], ["Vegetable gremlin", 60]], [["Funk sole brother", 0], ["Pumped-up bass", 0], ["School of wizardfish", 0]], [["Bazookafish", 0], ["Clubfish", 0], ["Scimitarfish", 0], ["Trophyfish", "unknown"]], [["Grouper groupie", "unknown"], ["Ice skate", "unknown"], ["Roller skate", "unknown"], ["Skate Board member", "unknown"], ["Urchin urchin", "unknown"]], [["Acoustic electric eel", 0], ["Decent white shark", 0], ["Ganger", 0]], [["Neptune flytrap", 0], ["Octopus gardener", 0], ["Sponge", 50], ["Stranglin' algae", 0]], [["Cargo crab", 0], ["Drowned sailor", 50], ["Mer-kin scavenger", 0], ["Mine crab", 50], ["Unholy diver", 0]], [], [], [["Jamfish", 0], ["Magic dragonfish", 50], ["Pufferfish", 0]], [["Diving belle", 50], ["Fisherfish", 0], ["Giant squid", 25], ["Mer-kin diver", 25]], [["Anemone combatant", 75], ["Killer clownfish", 25], ["Mer-kin miner", 50]], [["Lounge lizardfish", 0], ["Mer-kin tippler", 80], ["Nurse shark", 50]], [["Mer-kin burglar", 0], ["Mer-kin raider", 50], ["Mer-kin healer", 25]], [], [], [], [], [["Slime", 55], ["Slime Hand", 55], ["Slime Mouth", 55], ["Slime Construct", 55], ["Slime Colossus", 55], ["Mother Slime", 300]], [["Cluster of angry bacteria", 50], ["Corrosive algae", 50], ["Hostile amoeba", 50], ["Mad flagellate", 50], ["Violent fungus", 50], ["Cyrus the Virus", 0]], [["Ancient guardian statue", 20], ["Evil cultist", 40], ["Jungle baboon", 80], ["Tribal goblin", 60], ["Ancient temple guardian", "unknown"], ["Group of cultists", 70], ["High priest of Ki'rhuss", 50], ["Wumpus", 65]], [["7-Foot Dwarf Replicant", 60], ["Bangyomaman Warrior", 20], ["Cyborg policeman", "unknown"], ["\"Handyman\" Jay Android", 80], ["Liquid metal robot", 100], ["Obese tourist", 0], ["Space Marine", 40], ["Terrifying robot", 50]], [], [], [], [], [], [], [["Infernal seal larva", 20], ["Infernal seal spawn", 40], ["Vengeful turtle spectre", 20], ["Haunted soup tureen", 40], ["Evil spaghetti cultist", 20], ["Evil spaghetti cult priest", 40], ["Pernicious puddle of pesto", 20], ["Slithering hollandaise glob", 40], ["Psychedelic fur", 20], ["Talking head", 40], ["Evil trumpet-playing mariachi", 20], ["Evil vihuela-playing mariachi", 40]], [["Hellseal pup", 85], ["Mother hellseal", 150]], [["Guard turtle", 140]], [], [["Evil spaghetti cult middle-manager", 80], ["Evil spaghetti cult neophyte", 60], ["Evil spaghetti cult technician", 60]], [["Vendor slime", 75], ["Booth slime", 50], ["Fan slime", 50]], [["Breakdancing raver", "unknown"], ["Pop-and-lock raver", "unknown"], ["Running man", "unknown"]], [["Sleepy mariachi", 125], ["Surprised mariachi", 150], ["Alert mariachi", 300]], [["Hellseal guardian", 75], ["Gorgolok, the Infernal Seal (The Nemesis' Lair)", 80], ["Warehouse worker", 75], ["Stella, the Turtle Poacher (The Nemesis' Lair)", 80], ["Evil spaghetti cult zealot", 75], ["Spaghetti Elemental (The Nemesis' Lair)", 80], ["Security slime", 75], ["Lumpy, the Sinister Sauceblob (The Nemesis' Lair)", 80], ["Daft punk", 75], ["Spirit of New Wave (The Nemesis' Lair)", 80], ["Mariachi bruiser", 75], ["Somerset Lopez, Dread Mariachi (The Nemesis' Lair)", 80]], [], [], [["Menacing lawn gnome", 50], ["Mounted lawn gnome", 85], ["Mowing lawn gnome", 50]], [["Snapdragon", 50], ["Beelephant", 50], ["Tiger-lily", 50], ["Wasp in a wig", 50]], [["Swarm of lowercase As", 90], ["Lowercase B", 40], ["Lowercase H", 75], ["Lowercase K", 45], ["Uppercase Q", 80]], [["Cruel dust mote", 40], ["Funk particle", 30], ["Malevolent magnetic field", 50]], [["Loose coalition of yetis, snowmen, and goats", 80], ["Spookyraven Manor (monster)", 20], ["Fearsome Wacken", "unknown"], ["Castle in the Clouds in the Sky", 10]], [["Fleaman", "unknown"], ["Ghost", "unknown"], ["Medusa", "unknown"]], [], [["Actual orcish frat boy", 60], ["Jailbait orquette", 30], ["Juvenile delinquent orquette", 75], ["Orcish frat wannaboy", 40], ["Orcish juvenile delinquent", "unknown"], ["Totally trashed orquette", 20]], [["Neptune, the Dog that Is a Respected Equal and Not a Pet cast member", 30], ["Susie Soyburger cast member", 20], ["Timmy Tofurkey cast member", 20], ["Neptune, the Dog that Is a Respected Equal and Not a Pet", "unknown"], ["Susie Soyburger", "unknown"], ["Timmy Tofurkey", "unknown"], ["Essence of Interspecies Respect", "unknown"], ["Essence of Soy", "unknown"], ["Essence of Tofu", "unknown"]], [["Drunken 7-foot dwarf", 40], ["Plastered frat orc", 40], ["Skeleton with a mop", 50], ["Unemployed knob goblin", 0], ["Werecougar", 50]], [], [], [["Water spider", 50], ["Deadly venomtrout", 50]], [["Demoninja", 75], ["G imp", 60], ["L imp", 60]], [["Fallen Archfiend", 80], ["G imp", 60], ["P imp", 60]], [["Hellion", 90], ["P imp", 60], ["W imp", 60]], [["Crate", 0]], [], [["BL Imp", 30], ["CH Imp", 60], ["Pr Imp", 50], ["Carbuncle Top", 50], ["Larry of the Field of Signs", 50], ["Victor the Insult Comic Hellhound", 50]], [["Inkubus", 35], ["Serialbus", 35], ["Suckubus", 30]], [], [], [], [], [["Demoninja", 75], ["Fallen Archfiend", 80], ["G imp", 60], ["Hellion", 90], ["L imp", 60], ["P imp", 60], ["W imp", 60], ["Hypnotist of Hey Deze", "unknown"]], [], [], [], [], [], [], [], [], [["Off-duty Knob Goblin Elite Guard", 50], ["Knob Goblin Elite Guard", 0], ["Swarm of Knob lice", 50], ["Knob Goblin Elite Guard Captain", "unknown"]], [["Cobb's Knob oven", 50], ["Knob Goblin Master Chef", 65], ["Knob Goblin Sous Chef", 65], ["Knob Goblin Elite Guard Captain", "unknown"]], [["Knob Goblin Harem Girl", 80], ["Knob Goblin Harem Guard", 50], ["Knob Goblin Madam", 50]], [["Knob Goblin Accountant", 50], ["Knob Goblin Bean Counter", 75], ["Knob Goblin MBA", 75], ["Knob Goblin Embezzler", "unknown"], ["Infinite meat bug", "unknown"]], [["Corpulent zobmie", 50], ["Grave rober zmobie", 50], ["Modern zmobie", "unknown"], ["Conjoined zmombie", "unknown"]], [["Gaunt ghuol", 50], ["Gluttonous ghuol", 50], ["Huge ghuol", "unknown"], ["Swarm of ghuol whelps", "unknown"], ["Big swarm of ghuol whelps", "unknown"], ["Giant swarm of ghuol whelps", "unknown"]], [["Senile lihc", 50], ["Slick lihc", 50], ["Dirty old lihc", "unknown"], ["Gargantulihc", "unknown"]], [["Spiny skelelton", 50], ["Toothy sklelton", 50], ["Giant skeelton", "unknown"], ["Bugaboo", "unknown"]], [["Dogcat", "unknown"], ["Ferrelf", "unknown"], ["Hamsterpus", "unknown"], ["Overarmed survivor", "unknown"], ["Primitive survivor", "unknown"], ["Unlikely survivor", "unknown"]], [["Alielf", "unknown"], ["Cat-alien", "unknown"], ["Dog-alien", "unknown"], ["Grizzled survivor", 0], ["Unhinged survivor", 0], ["Whiny survivor", 0]], [["Alien hamsterpus", "unknown"], ["Mutated alielf", "unknown"], ["Mutated alielephant", "unknown"]], [], [["Sexy sorority ghost", "unknown"], ["Sexy sorority skeleton", "unknown"], ["Sexy sorority vampire", "unknown"], ["Sexy sorority werewolf", "unknown"], ["Sexy sorority zombie", "unknown"]], [["Dopey 7-Foot Dwarf", "unknown"], ["Grumpy 7-Foot Dwarf", "unknown"], ["Sleepy 7-Foot Dwarf", "unknown"], ["7-Foot Dwarf Foreman", 80], ["Mountain man", "unknown"], ["7-Foot Dwarf (Moiling)", 70], ["7-Foot Dwarf (Royale)", 60]], [["Dairy goat", 80], ["Drunk goat", 70], ["Sabre-toothed goat", 80]], [["Ninja Snowman (Chopsticks)", 60], ["Ninja Snowman (Hilt)", 60], ["Ninja Snowman (Mask)", 60], ["Ninja Snowman Janitor", 60], ["Ninja Snowman Weaponmaster", 75], ["Ninja snowman assassin", 125], ["Black Ops Bugbear", "unknown"]], [["EXtreme cross-country hippy", 60], ["EXtreme Orcish snowboarder", 60], ["Sk8 gnome", 60]], [], [], [], [["Sorrowful Hickory", "unknown"], ["Suffering Juniper", "unknown"], ["Tormented Baobab", "unknown"], ["Whimpering Willow", "unknown"], ["Woeful Magnolia", "unknown"], ["The Bat in the Spats", "unknown"], ["The Thorax", "unknown"]], [["Bettie Barulio", "unknown"], ["Marcus Macurgeon", "unknown"], ["Marvin J. Sunny", "unknown"], ["Mortimer Strauss", "unknown"], ["Wonderful Winifred Wongle", "unknown"], ["The Terrible Pinch", "unknown"], ["Thug 1 and Thug 2", "unknown"]], [["Brock \"Rocky\" Flox", "unknown"], ["Dolores D. Smiley", "unknown"], ["Hugo Von Douchington", "unknown"], ["Vivian Vibrian Vumian Varr", "unknown"], ["Wacky Zack Flacky", "unknown"], ["Mammon the Elephant", "unknown"], ["The Large-Bellied Snitch", "unknown"]], [["Stone temple pirate", "unknown"], ["Baa-relief sheep", "unknown"], ["Craven carven raven", "unknown"], ["Baa'baa'bu'ran", "unknown"], ["Clan of cave bars", "unknown"]], [["Hypodermic bugbear", "unknown"], ["Anesthesiologist bugbear", "unknown"], ["Bugbear robo-surgeon", "unknown"]], [["Creepy eye-stalk tentacle monster", "unknown"], ["Grouchy furry monster", "unknown"], ["Scavenger bugbear", "unknown"]], [["Batbugbear", "unknown"]], [["Bugbear scientist", "unknown"], ["Spiderbugbear", "unknown"]], [["Bugbear mortician", "unknown"], ["Bugaboo", "unknown"]], [], [["Battlesuit Bugbear Type", "unknown"], ["Bugbear drone", "unknown"], ["Liquid metal bugbear", "unknown"]], [], [["Angry cavebugbear", "unknown"], ["Trendy bugbear chef", "unknown"]], [["Snakefire in the grassfire", 75]], [["Blazing bat", 50]], [["Fire Servant", 50]], [["Blazing bat", 50]], [["Lord Flameface", 0]], [["Smut orc jacker", "unknown"], ["Smut orc nailer", "unknown"], ["Smut orc pipelayer", "unknown"], ["Smut orc screwer", "unknown"], ["Smut orc pervert", "unknown"]], [["Battlie Knight Ghost", "unknown"], ["Claybender Sorcerer Ghost", "unknown"], ["Dusken Raider Ghost", "unknown"], ["Space Tourist Explorer Ghost", "unknown"], ["Whatsian Commando Ghost", "unknown"]], [["Bearpig topiary animal", "unknown"], ["Big Wheelin' Twins", "unknown"], ["Bubblemint Twins", "unknown"], ["Creepy Ginger Twin", "unknown"], ["Elephant (meatcar?) topiary animal", "unknown"], ["Mismatched Twins", "unknown"], ["Spider (duck?) topiary animal", "unknown"], ["Troll Twins", "unknown"]], [["Oil slick", "unknown"], ["Oil tycoon", "unknown"], ["Oil baron", "unknown"], ["Oil cartel", "unknown"]], [], [], [["Frustrating knight", "unknown"], ["Rage flame", "unknown"], ["Ticking time bomb", "unknown"], ["Anger Man", "unknown"]], [["Animated possessions", "unknown"], ["Morbid skull", "unknown"], ["Natural spider", "unknown"], ["Fear Man", "unknown"]], [["Judgmental eye", "unknown"], ["Reproachful heart", "unknown"], ["Work hat", "unknown"], ["Doubt Man", "unknown"]], [["Ancient ghost", "unknown"], ["Contemplative ghost", "unknown"], ["Lovesick ghost", "unknown"], ["Regret Man", "unknown"]], [["Bacon snake", "unknown"], ["Cold cutter", "unknown"], ["Groast", "unknown"], ["Pork butterfly", "unknown"], ["Salaminder", "unknown"], ["The Beefhemoth", "unknown"]], [["Butterknife of Regret", "unknown"], ["Cookie Cutter of Loneliness", "unknown"], ["Creme Brulee Torch of Fury", "unknown"], ["Spatula of Despair", "unknown"], ["Whisk of Misery", "unknown"]], [["Bag of Potatoes of Security", "unknown"], ["Box of Batter Mix of Hope", "unknown"], ["Bundle of Meat of Happiness", "unknown"], ["Carton of Eggs of Confidence", "unknown"], ["Loaf of Bread of Wonder", "unknown"]], [], [["Grinning pork bun", "unknown"], ["Lucky cat statue (monster)", "unknown"], ["Roasted duck golem", "unknown"], ["Yakuza courier", "unknown"]], [["Clean-room daemon", "unknown"], ["Fabricator gu\xE0i", "unknown"], ["Triad code wizard", "unknown"], ["The Sierpinski brothers", "unknown"]], [["Salaryninja", "unknown"], ["Security robot", "unknown"], ["Yakuza guard", "unknown"]], [["Salaryninja", "unknown"], ["Security robot", "unknown"], ["Yakuza guard", "unknown"]], [["Salaryninja", "unknown"], ["Security robot", "unknown"], ["Yakuza guard", "unknown"]], [["Desperate gold farmer", "unknown"], ["Rabid MMO addict", "unknown"], ["Yakuza thug", "unknown"]], [], [], [["Procedurally-generated skeleton", "unknown"]], [["Fearsome giant squid", "unknown"], ["Ferocious roc", "unknown"], ["Giant man-eating shark", "unknown"], ["Bristled Man-O-War", "unknown"], ["The Cray-Kin", "unknown"], ["Deadly Hydra", "unknown"]], [["Video Game Minion (bat)", "unknown"], ["Video Game Minion (blob)", "unknown"], ["Video Game Minion (clown)", "unknown"], ["Video Game Minion (demon)", "unknown"], ["Video Game Minion (ghost)", "unknown"], ["Video Game Minion (goblin)", "unknown"], ["Video Game Minion (gopher)", "unknown"], ["Video Game Minion (knight)", "unknown"], ["Video Game Minion (ninja)", "unknown"], ["Video Game Minion (mushroom)", "unknown"], ["Video Game Minion (skateboarder)", "unknown"], ["Video Game Minion (skeleton)", "unknown"], ["Video Game Minion (troll)", "unknown"], ["Video Game Minion (turtle)", "unknown"], ["Video Game Minion (warlock)", "unknown"], ["Video Game Minion (zombie)", "unknown"], ["Video Game Miniboss", "unknown"], ["Video Game Boss", "unknown"]], [["Video Game Minion (bat)", "unknown"], ["Video Game Minion (blob)", "unknown"], ["Video Game Minion (clown)", "unknown"], ["Video Game Minion (demon)", "unknown"], ["Video Game Minion (ghost)", "unknown"], ["Video Game Minion (goblin)", "unknown"], ["Video Game Minion (gopher)", "unknown"], ["Video Game Minion (knight)", "unknown"], ["Video Game Minion (ninja)", "unknown"], ["Video Game Minion (mushroom)", "unknown"], ["Video Game Minion (skateboarder)", "unknown"], ["Video Game Minion (skeleton)", "unknown"], ["Video Game Minion (troll)", "unknown"], ["Video Game Minion (turtle)", "unknown"], ["Video Game Minion (warlock)", "unknown"], ["Video Game Minion (zombie)", "unknown"], ["Video Game Miniboss", "unknown"], ["Video Game Boss", "unknown"]], [["Video Game Minion (bat)", "unknown"], ["Video Game Minion (blob)", "unknown"], ["Video Game Minion (clown)", "unknown"], ["Video Game Minion (demon)", "unknown"], ["Video Game Minion (ghost)", "unknown"], ["Video Game Minion (goblin)", "unknown"], ["Video Game Minion (gopher)", "unknown"], ["Video Game Minion (knight)", "unknown"], ["Video Game Minion (ninja)", "unknown"], ["Video Game Minion (mushroom)", "unknown"], ["Video Game Minion (skateboarder)", "unknown"], ["Video Game Minion (skeleton)", "unknown"], ["Video Game Minion (troll)", "unknown"], ["Video Game Minion (turtle)", "unknown"], ["Video Game Minion (warlock)", "unknown"], ["Video Game Minion (zombie)", "unknown"], ["Video Game Miniboss", "unknown"], ["Video Game Boss", "unknown"]], [["Alphabet Giant", 80], ["Fitness Giant", "unknown"], ["Furry Giant", 40], ["Neckbeard Giant", "unknown"]], [["Foodie Giant", "unknown"], ["Possibility Giant", 40], ["Procrastination Giant", 0], ["Renaissance Giant", "unknown"]], [["Goth Giant", 40], ["Punk Rock Giant", "unknown"], ["Raver Giant", 40], ["Steampunk Giant", "unknown"]]];
var locationArray = [["The Spooky Forest", 15], ["Degrassi Knoll", 18], ["The Limerick Dungeon", 19], ["The \"Fun\" House", 20], ["The Misspelled Cemetary (Pre-Cyrpt)", 21], ["Tower Ruins", 22], ["The Hippy Camp", 26], ["Orcish Frat House", 27], ["Orcish Frat House", 29], ["Entryway", 30], ["Guano Junction", 31], ["Batrat and Ratbat Burrow", 32], ["Beanbat Chamber", 33], ["The Boss Bat's Lair", 34], ["The Spectral Pickle Factory", 37], ["The Dungeons of Doom", 39], ["Outskirts of Camp Logging Camp", 43], ["Camp Logging Camp", 44], ["South of The Border", 45], ["Thugnderdome", 46], ["The Bugbear Pens", 47], ["The Spooky Gravy Barrow", 48], ["The Bugbear Pens", 49], ["Laboratory", 50], ["Menagerie Level 1", 51], ["Menagerie Level 2", 52], ["Menagerie Level 3", 53], ["The Misspelled Cemetary (Post-Cyrpt)", 58], ["The Hippy Camp", 65], ["The Obligatory Pirate's Cove", 66], ["The Roulette Tables", 70], ["The Poker Room", 71], ["The Inexplicable Door", 73], ["The Valley Beyond The Orc Chasm", 80], ["The Penultimate Fantasy Airship", 81], ["The Hole in the Sky", 83], ["A Battlefield", 85], ["A Battlefield", 86], ["A Battlefield", 87], ["The Dire Warren", 92], ["Bad Trip", 96], ["Great Trip", 97], ["Mediocre Trip", 98], ["The Road to the White Citadel", 99], ["Whitey's Grove", 100], ["The Knob Shaft", 101], ["The Haunted Kitchen", 102], ["The Haunted Conservatory", 103], ["The Haunted Library", 104], ["The Haunted Billiards Room", 105], ["The Haunted Gallery", 106], ["The Haunted Bathroom", 107], ["The Haunted Bedroom", 108], ["The Haunted Ballroom", 109], ["The Icy Peak", 110], ["The Black Forest", 111], ["The Sleazy Back Alley", 112], ["The Haunted Pantry", 113], ["Outskirts of Cobb's Knob", 114], ["The Hidden City", 118], ["The Palindome", 119], ["The Arid, Extra-Dry Desert", 121], ["An Oasis", 122], ["The Arid, Extra-Dry Desert", 123], ["The Upper Chamber", 124], ["The Middle Chamber", 125], ["The Themthar Hills", 126], ["The Hatching Chamber", 127], ["The Feeding Chamber", 128], ["The Guards' Chamber", 129], ["The Queen's Chamber", 130], ["The Hippy Camp (Verge of War)", 131], ["The Battlefield (Frat Warrior Fatigues)", 132], ["The Hippy Camp (Verge of War)", 133], ["Orcish Frat House (Verge of War)", 134], ["Orcish Frat House (Verge of War)", 135], ["Sonofa Beach", 136], ["The Barn", 137], ["The Haiku Dungeon", 138], ["The Junkyard", 139], ["The Battlefield (War Hippy Fatigues)", 140], ["The Pond", 141], ["The Back 40", 142], ["The Other Back 40", 143], ["The Granary", 144], ["The Bog", 145], ["The Family Plot", 146], ["The Shady Thicket", 147], ["Heartbreaker's Hotel", 148], ["The Hippy Camp (Bombed Back to the Stone Age)", 149], ["The Orcish Frat House (Bombed Back to the Stone Age)", 150], ["The Stately Pleasure Dome", 151], ["The Mouldering Mansion", 152], ["The Rogue Windmill", 153], ["The Junkyard (Post-War)", 154], ["McMillicancuddy's Farm (Post-War)", 155], ["Barrrney's Barrr", 157], ["The F'c'le", 158], ["The Poop Deck", 159], ["Belowdecks", 160], ["A Yuletide Bonfire", 163], ["A Shimmering Portal", 164], ["A Maze of Sewer Tunnels", 166], ["Hobopolis Town Square", 167], ["Burnbarrel Blvd.", 168], ["Exposure Esplanade", 169], ["The Heap", 170], ["The Ancient Hobo Burial Ground", 171], ["The Purple Light District", 172], ["Go for a Swim", 173], ["The Arrrboretum", 174], ["The Mine Foremens' Office", 176], ["Mt. Molehill", 177], ["Wine Racks", 178], ["Wine Racks", 179], ["Wine Racks", 180], ["Wine Racks", 181], ["Next to that Barrel with Something Burning in it", 182], ["Near an Abandoned Refrigerator", 183], ["Over Where the Old Tires Are", 184], ["Out By that Rusted-Out Car", 185], ["The Briny Deeps", 186], ["The Brinier Deepers", 187], ["A Rumble Near the Fountain", 188], ["The Briniest Deepests", 189], ["An Octopus's Garden", 190], ["The Wreck of the Edgar Fitzsimmons", 191], ["Madness Reef", 194], ["The Marinara Trench", 195], ["Anemone Mine", 196], ["The Dive Bar", 197], ["The Mer-Kin Outpost", 198], ["The Slime Tube", 203], ["The Primordial Soup", 204], ["The Jungles of Ancient Loathing", 205], ["Seaside Megalopolis", 206], ["A Large Chamber", 213], ["The Broodling Grounds", 214], ["The Outer Compound", 215], ["The Temple Portico", 217], ["The Convention Hall Lobby", 218], ["Outside the Club", 219], ["The Barracks", 220], ["The Nemesis' Lair", 221], ["The Landscaper's Lair", 224], ["The Red Queen's Garden", 225], ["The Enormous Greater-Than Sign", 226], ["Professor Jacking's Small-O-Fier", 227], ["Professor Jacking's Huge-A-Ma-Tron", 228], ["Vanya's Castle Foyer", 229], ["Vanya's Castle Chapel", 230], ["Kegger in the Woods", 231], ["The Electric Lemonade Acid Parade", 232], ["A Barroom Brawl", 233], ["Neckback Crick", 236], ["The Dark Elbow of the Woods", 237], ["The Dark Heart of the Woods", 238], ["The Dark Neck of the Woods", 239], ["Noob Cave", 240], ["The Laugh Floor", 242], ["Infernal Rackets Backstage", 243], ["Pandamonium Slums", 248], ["Cobb's Knob Barracks", 257], ["Kitchens", 258], ["Harem", 259], ["Treasury", 260], ["The Defiled Alcove", 261], ["The Defiled Cranny", 262], ["The Defiled Niche", 263], ["The Defiled Nook", 264], ["Domed City of Ronaldus", 265], ["Domed City of Grimacia", 266], ["Hamburglaris Shield Generator", 267], ["The Haunted Sorority House", 269], ["Itznotyerzitz Mine", 270], ["The Goatlet", 271], ["Lair of the Ninja Snowmen", 272], ["The eXtreme Slope", 273], ["The Clumsiness Grove", 277], ["The Maelstrom of Lovers", 278], ["The Glacier of Jerks", 279], ["The Hidden Temple", 280], ["Medbay", 281], ["Waste Processing", 282], ["Sonar", 283], ["Science Lab", 284], ["Morgue", 285], ["Special Ops", 286], ["Engineering", 287], ["Navigation", 288], ["Galley", 289], ["A Super-Intense Mega-Grassfire", 290], ["Fierce Flying Flames", 291], ["Lord Flameface's Castle Entryway", 292], ["Lord Flameface's Belfry", 293], ["Lord Flameface's Throne Room", 294], ["The Smut Orc Logging Camp", 295], ["A-Boo Peak", 296], ["Twin Peak", 297], ["Oil Peak", 298], ["Anger Man's Level", 301], ["Fear Man's Level", 302], ["Doubt Man's Level", 303], ["Regret Man's Level", 304], ["The Nightmare Meatrealm", 305], ["A Kitchen Drawer", 306], ["A Grocery Bag", 307], ["Chinatown Shops", 309], ["Triad Factory", 310], ["Floor 1", 311], ["Floor 2", 312], ["Floor 3", 313], ["Chinatown Tenement", 314], ["The Gourd!", 316], ["The Tower of Procedurally-Generated Skeletons", 317], ["The Old Man's Bathtime Adventure", 318], ["The GameInformPowerDailyPro Dungeon", 319], ["The GameInformPowerDailyPro Dungeon", 320], ["The GameInformPowerDailyPro Dungeon", 321], ["Basement", 322], ["Ground Floor", 323], ["Top Floor", 324]];
var effectTable = ({'Memory of Speed':200, 'Natural 20':100, 'Hiding in Plain Sight':100, 'Seafaring Suit':100, 'Sizzling with Fury':60, 'Ass Over Teakettle':50, 'Cockroach Scurry':50, 'Hustlin\'':50, 'Strawberry Alarm':50, 'White-boy Angst':50, 'Fishily Speeding':50, 'Springy Fusilli':40, 'All Fired Up':30, 'Blessing of Pikachutlotal':30, Discomfited:30, Lapdog:30, 'Oil Rig':30, 'Old School Pompadour':30, 'Tapered Threads':30, 'Ticking Clock':30, 'Well-Swabbed Ear':30, 'arse-a\'fire':25, 'On Pins and Needles':23, 'Abominably Slippery':20, 'Cletus\'s Canticle of Celerity':20, 'Heart of Yellow':20, 'Hombre Muerto Caminando':20, 'Metal Speed':20, 'No Vertigo':20, 'Provocative Perkiness':20, 'Slimy Shoulders':2, 'Sugar Rush':20, 'El Tango de la Maldita Suegra':15, '5 Pounds Lighter':10, '8-Bit Finery':10, 'Sweet and Yellow':10, 'Walberg\'s Dim Bulb':10, 'Colonel Mustard\'s Lonely Spades Club Jacket':1, 'spangly mariachi vest':-25, 'Black Face':-40, 'Barking Dogs':-50, Braaains:-50, 'Extreme Muscle Relaxation':-50, 'Natural 1':-100, 'QWOPped Up':-100, 'Tranquilized Mind':-1000, Cunctatitis:-1000000});
var gearTable   = ({'skeleton skis':20, 'card sleeve':20, 'Rain-Doh red wings':20, 'Brimstone Boxers':50, 'Foam naval trousers':50, 'little round pebble':50, 'Loathing Legion rollerblades':50, 'rickety old unicycle':50, 'beaten-up Chucks':40, 'mostly rat-hide leggings':40, 'pixel grappling hook':40, 'slime-covered compass':40, 'pink pinkslip slip':35, 'shark tooth necklace':35, 'Mer-kin sneakmask':30, 'Bonerdagon necklace':30, 'costume sword':30, 'Crimbo pants':30, 'cyborg stompin\' boot':30, 'furniture dolly':30, 'intergalactic pom poms':30, 'rusty compass':30, 'tortoboggan shield':30, 'Travoltan trousers':30, 'Tropical Crimbo Shorts':30, 'blackberry moccasins':25, 'Boris\'s Helm':25, 'Boris\'s Helm (askew)':25, crowbar:25, 'electronic dulcimer pants':25, 'Greek Pasta of Peril':25, 'Lord Spookyraven\'s ear trumpet':25, 'papier-m\xE2churidars':25, 'plexiglass pants':25, 'teflon swim fins':25, chopsticks:20, 'crown-shaped beanie':20, 'Grimacite gat':20, 'Grimacite greaves':20, 'hors d\'oeuvre tray':20, 'mer-kin hookspear':20, 'Oil slacks':20, 'penguin shorts':20, 'penguinskin mini-kilt':20, 'penguinskin mini-skirt':20, 'star pants':20, 'Super Magic Power Sword X':20, tortoboggan:20, 'wiffle-flail':20, 'worn tophat':20, 'cold ninja mask':15, crowbarrr:15, 'evil flaming eyeball pendant':15, 'gnatwing earring':15, 'ice skates':15, leotarrrd:15, 'Paperclip pants':15, 'makeshift skirt':15, 'origami riding crop':15, 'Pasta of Peril':15, 'pin-stripe slacks':15, 'pixel sword':15, 'plastic guitar':15, sk8board:15, 'Spooky Putty leotard':15, 'stainless steel slacks':15, 'tail o\' nine cats':15, 'Disco \'Fro Pick':11, 'boxing glove on a spring':10, 'clockwork pants':10, fire:10, 'infernal insoles':10, 'octopus\'s spade':10, 'pig-iron shinguards':10, 'propeller beanie':10, 'shiny hood ornament':10, 'wax pants':10, wheel:10, '1-ball':5, 'tiny plastic animelf':5, 'tiny plastic Beebee King':5, 'Amulet of Yendor':-10, 'antique greaves':-10, 'antique helmet':-10, 'antique shield':-10, 'cement sandals':-10, 'giant discarded plastic fork':-10, 'grave robbing shovel':-10, 'rusty grave robbing shovel':-10, 'rusty metal greaves':-10, 'slime-covered greaves':-10, 'slime-covered shovel':-10, 'wumpus-hair loincloth':-10, 'jungle drum':-20, 'outrageous sombrero':-20, 'tap shoes':-20, 'antique spear':-30, buoybottoms:-30, 'Slow Talkin\' Elliot\'s dogtags':-30, 'Temporary Blindness':-30, 'aerated diving helmet':-50, 'rusty diving helmet':-50, 'solid gold pegleg':-50, 'velcro boots':-50, 'Makeshift SCUBA gear':-100, 'tiny black hole':-200})
var skillTable  = ({'Fast as Lightning':50, Lust:50, 'Overdeveloped Sense of Self Preservation':20, Sloth:-25, 'Never Late for Dinner':50});
var mlEffects   = ({Gristlesphere:20, Slimebreath:50, 'Digitally Converted':30, Koyaaniskumquatsi:30, 'Memory of Aggressiveness':30, Unpopular:30, 'Zomg WTF':30, Bilious:25, 'Grimace (effect)':25, 'Assaulted with Pepper':20, 'cane-mail shirt':20, 'Chihuahua Underfoot':20, 'Contemptible Emanations':20, grulched:20, Lapdog:20, 'The Great Tit\'s Blessing':20, Aykrophobia:15, Fondid:15, 'Simply Irritable':15, 'Drescher\'s Annoying Noise':10, 'Extremely Poor Taste':10, 'hipposkin poncho':10, 'Juiced and Jacked':10, 'Peppermint Twisted':10, 'The Cupcake of Wrath':10, 'Spangled Star':10, 'Eau D\'enmity':5, 'Furry Suit':5, Gelded:5, 'goth kid t-shirt':5, 'Strung-Up Quartet':5, 'A Little Bit Evil':2, Fearless:-10, 'pocketwatch on a chain':-10});
var mlGear      = ({'old patched suit-pants':40, 'hockey stick of furious angry rage':30, 'vinyl shield':25, 'astral belt':20, 'bone spurs':20, 'bugged balaclava':20, 'stainless steel scarf':20, 'tiny plastic four-shadowed mime':20, 'Uncle Hobo\'s stocking cap':20, 'Boris\'s Helm (askew)':15, 'C.A.R.N.I.V.O.R.E. button':15, 'card sleeve':5, 'creepy-ass club':15, 'evil-ass club':15, 'frigid-ass club':15, 'hot-ass club':15, 'ice sickle':15, 'nasty-ass club':15, Truthsayer:12, 'bad-ass club':10, 'badge of authority':10, 'cheap plastic kazoo':10, 'dreadlock whip':10, 'hippo whip':10, 'rave whistle':10, 'serpentine sword':10, 'snake shield':10, curmudgel:8, 'spiky turtle helmet':8, buoybottoms:7, 'grumpy old man charrrm bracelet':7, 'squeaky staff':6, 'annoying pitchfork':5, 'bat whip':5, 'beer bong':5, Bonestabber:5, 'broken clock':5, 'flaming familiar doppelg\xE4nger':5, 'giant needle':5, 'rattail whip':5, 'ring of aggravate monster':5, 'tail o\' nine cats':5, 'tin star':5, 'troll britches':5, 'Victor, the Insult Comic Hellhound Puppet':5, 'world\'s smallest violin':5, 'magic whistle':4, 'can cannon':3, 'Frost\u2122 brand sword':3, 'styrofoam crossbow':3, 'styrofoam staff':3, 'styrofoam sword':3, 'tiny plastic series 2':1, 'tiny plastic series 3':1, 'nasty rat mask':-5, 'Drowsy Sword':-10, 'Space Trip safety headphones':-100});
var lastSnarfblat = -1;

var currentTable;
var updating = false;
var effectBonus = GM_getValue("effectBonus", 0);
var gearBonus   = GM_getValue("gearBonus", 0);
var skillBonus  = GM_getValue("skillBonus", 0);
var effectML    = GM_getValue("effectML", 0);
var gearML      = GM_getValue("gearML", 0);
//var initBonus = effectBonus + gearBonus + skillBonus;

GM_log = function(x){};

if(document.location.href.indexOf("charpane.php") > -1) {
	effectBonus = docharpane(document.body);
	GM_log("initBonus from effects: "+effectBonus);
} else if(document.location.href.indexOf("inventory.php") > -1) {
	gearBonus = doinventorypage(document.body);
	GM_log("initBonus from clothes: "+gearBonus);
} else if(document.location.href.indexOf("charsheet.php") > -1) {
	skillBonus = docharsheet(document.body);
} else if(document.location.href.indexOf("topmenu.php") > -1) {
	dotopmenu(document.body);
} else {
	if(currentLevel < levelDisable) {
		domainpage();
	}
}

function docharsheet(doc) {
//	var table = document.evaluate('.//b/text()[contains(., "Skills:")]/ancestor::b[1]/following-sibling::table[1]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var skillTexts = document.evaluate('.//b/text()[contains(., "Skills:")]/ancestor::b[1]/following-sibling::table[1]//tr[2]//a/text()', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var thisBonus = 0;
	GM_log("docharsheet()");
	GM_log("skillTexts.snapshotLength: "+skillTexts.snapshotLength);
	for(var i = 0; i < skillTexts.snapshotLength; i++) {
		var skillName = skillTexts.snapshotItem(i).data.replace(/^\s+/, '').replace(/\s+$/, '');
		GM_log("skill name: "+skillName);
		if(skillTable[skillName]) {
			GM_log("skillName: "+skillTable[skillName]);
			thisBonus = thisBonus + skillTable[skillName];
		}
	}
	GM_log("skillBonus: " + thisBonus);
	GM_setValue("skillBonus", thisBonus);
	return thisBonus;
}

function doinventorypage(doc) {
	var table = document.evaluate('.//table[@id="curequip"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var thisBonus = 0;
	var brimstoneItems;
	var ml = 0;

	var moonGear = ({'Grimacite gown':10*grimaceDark, 'Grimacite guayabera':10*grimaceDark, 'Moonthril Cuirass':10*grimaceDark, 'hairshirt':10*(5-grimaceDark), 'depleted Grimacite hammer':5*grimaceDark});
	if(table) {
		if(doc == document.body) {
			var observer = new MutationObserver(function(mutations){doinventorypage(doc)}).observe(table.parentNode, {childList: true, characterData: true, subtree: true});
		}
		//GM_log("found equipment table");
		for(var i = 0; i < table.rows.length; i++) {
			var row = table.rows[i];
			if(row.cells.length >= 3) {
				var nameCell = table.rows[i].cells[2];
				var textObj = document.evaluate('./b/text()', nameCell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(textObj) {
					var itemName = textObj.data.replace(/^\s+/, '').replace(/\s+$/, '');
					//GM_log("found gear: "+itemName);
					if(gearTable[itemName]) {
						thisBonus = thisBonus + gearTable[itemName];
						GM_log("Gear "+itemName+": "+gearTable[itemName]);
					}
					if(mlGear[itemName]) {
						GM_log("ML Gear: "+itemName);
						ml = ml + mlGear[itemName];
					} else if(moonGear[itemName]) {
						ml = ml + moonGear[itemName];
					}
					if(itemName.indexOf("Brimstone") == 0) {
						brimstoneItems = brimstoneItems + 1;
					}
				}
			}
		}
		if(brimstoneItems > 1) {
			ml = ml + Math.pow(2, brimstoneItems);
		}
		gearML = ml;
		GM_setValue("gearML", ml);
		GM_setValue("gearBonus", thisBonus);
	}
	return thisBonus;
}

function docharpane(doc) {
	var texts = document.evaluate('.//text()[contains(., "(")]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var leveltext = document.evaluate('.//text()[contains(., "Level")]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var companionTexts = document.evaluate('.//text()[contains(., "% Initiative")]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var thisBonus = 0;
	var mldeviceText;
	var ml = 0;
	var result;
	GM_log("docharpane, texts length: "+texts.snapshotLength);
	if(leveltext) {
		GM_log("leveltext");
		if(result = /Level\s+(\d+)/.exec(leveltext.data)) {
			GM_log("level: "+result[1]);
			currentLevel = parseInt(result[1], 10);
			GM_setValue("currentLevel", currentLevel);
			if(currentLevel < GM_getValue("currentLevel", 0)) {
				effectBonus = 0;
				GM_setValue("effectBonus", 0);
				gearBonus   = 0;
				GM_setValue("gearBonus", 0);
				skillBonus  = 0;
				GM_setValue("skillBonus", 0);
				effectML    = 0;
				GM_setValue("effectML", 0);
				gearML      = 0;
				GM_setValue("gearML", 0);
				updatecharsheet();
			}
		}
	}
	for(var i = 0; i < texts.snapshotLength; i++) {
		var effectname;
		if(result = /^\s*(.+?)\s+\(/.exec(texts.snapshotItem(i).data)) {
			effectname = result[1];
			if(effectTable[effectname]) {
				GM_log("Effect name: "+effectname+" ("+effectTable[effectname]+")");
				thisBonus = thisBonus + effectTable[effectname];
			}
			if(mlEffects[effectname]) {
				GM_log("ML Effect: "+effectname+" ("+mlEffects[effectname]+")");
				ml = ml + mlEffects[effectname];
			}
		}
	}
	for(var i = 0; i < companionTexts.snapshotLength; i++) {
		var result;
		if(result = /\+(\d+)% Initiative/.exec(companionTexts.snapshotItem(i).data)) {
			GM_log("companion: "+result[1]);
			thisBonus = thisBonus + parseInt(result[1], 10);
		}
	}
	GM_setValue("effectBonus", thisBonus);
	mldeviceText = document.evaluate('.//text()[contains(., "Detuned Radio") or contains(., "Annoy-o-Tron") or contains(., "Mind-Control")]/ancestor::a[1]/following-sibling::b[1]/text()', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(mldeviceText) {
		GM_log("ML device: " + mldeviceText.data);
		ml = ml + parseInt(mldeviceText.data);
	}
	effectML = ml;
	GM_setValue("effectML", ml);
	return thisBonus;
}

function dotopmenu(doc) {
	var light = 0;
	var grimacedark = 0;
	var moons_found = 0;
	var imgs = doc.getElementsByTagName("img");
	for(var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		var result;
		if(result = /\/moon(\d)([ab]?)\.gif/.exec(img.src)) {
			var gifnum = parseInt(result[1], 10);
//			GM_log("file: "+result[0]+" gifnum: "+result[1]+" [letter:"+result[2]+"]");
			moons_found = moons_found + 1;
			light = light + 4 - Math.abs(5-gifnum);
			if(moons_found == 2) {
				grimacedark = grimacedark + Math.abs(5-gifnum);
			}
			if(result[2] == 'a') {
				if(gifnum <= 5) {
					light = light - 1;
//					if(moons_found == 1) {
						grimacedark = grimacedark + 1;
//					}
				} else {
					light = light + 1;
					if(moons_found == 2) {
						grimacecark = grimacedark - 1;
					}
				}
			} else if(result[2] == 'b') {
				if(gifnum <= 4) {
					light = light + 1;
					if(moons_found == 2) {
						grimacecark = grimacecark - 1;
					}
				} else {
					light = light - 1;
					grimacedark = grimacedark + 1;
				}
			}		
		} else if(img.src.indexOf("minimoon.gif") > -1) {
			light = light + 1;
		} else if(img.src.indexOf("minimoon2.gif") > -1) {
			grimacedark = grimacedark + 1;
		}
	}
	GM_log("Light: "+light+" Grimacedark: "+grimacedark);
	GM_setValue("moonlight", light);
	GM_setValue("grimacedark", grimacedark);
}

function domainpage() {
	var snarfblatLinks = document.evaluate('//img/ancestor::a[1][contains(@href, "snarfblat=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < snarfblatLinks.snapshotLength; i++) {
		dolink(snarfblatLinks.snapshotItem(i));
	}
	
	snarfblatLinks = document.evaluate('//area[contains(@href, "snarfblat=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < snarfblatLinks.snapshotLength; i++) {
		dolink(snarfblatLinks.snapshotItem(i));
	}
	document.addEventListener('keydown', kd);
}

function dolink(sblink) {
	sblink.addEventListener('mouseover', mouseover);
	sblink.addEventListener('mouseout', mouseout);
}

function kd(ev) {
//	alert("kd(ev)");
	if(!updating && currentTable.parentNode && ev.shiftKey == 1) {
		update();
	}
}

function mouseover(ev) {
	var snarfblat = -1;
	var result;
	//var table;
	GM_log("mouseover");
	result = /snarfblat=(\d+)/.exec(ev.currentTarget.href);
	if(result) {
		snarfblat = parseInt(result[1], 10);
		effectBonus = GM_getValue("effectBonus", 0);
		gearBonus   = GM_getValue("gearBonus", 0);
		skillBonus  = GM_getValue("skillBonus", 0);
		effectML    = GM_getValue("effectML", 0);
		gearML      = GM_getValue("gearML", 0);
	}
	GM_log("snarfblat: "+snarfblat);
	if(snarfblat > 0) {
		lastSnarfblat = snarfblat;
		if(currentTable && currentTable.parentNode) {
			currentTable.parentNode.removeChild(currentTable);
		}
		currentTable = buildtable(initArray[snarfblat].sort(sortinit), snarfblat);
		currentTable.style.position = "absolute";
		currentTable.style.left = getleft(ev.target) + ev.target.offsetWidth;
		currentTable.style.top = gettop(ev.target);
		document.body.appendChild(currentTable);
	}
}

function getleft( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return _x;
}

function gettop( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return _y;
}


function sortinit(a, b) {
	ai = parseInt(a[1], 10);
	bi = parseInt(b[1], 10);
	an = a[0].toLowerCase();
	bn = b[0].toLowerCase();
	if(ai > 0 && bi > 0) {
		if(ai == bi) {
			if(an > bn) {
				return 1;
			} else if(an == bn) {
				return 0;
			} else {
				return -1;
			}
		} else if(ai > bi) {
			return -1;
		} else {
			return 1;
		}
	} else if(a[1] == b[1]) {
		if(an > bn) {
			return 1;
		} else {
			return -1;
		}
	} else if(ai > 0) {
		return -1;
	} else if(bi > 0) {
		return 1;
	} else if(a[1].toString() == "0") {
		return -1;
	} else if(b[1].toString() == "0") {
		return 1;
	} else if(an > bn) {
		return 1;
	} else {
		return -1;
	}
}
	
function mouseout(ev) {
	if(currentTable && currentTable.parentNode) {
		currentTable.parentNode.removeChild(currentTable);
	}
}

function update() {
	GM_log("update()");
	updating = true;
	statusMessage("Updating: Getting charpane");
	GM_get("/charpane.php", updatecharpane);
}

function updatecharpane(responseText) {
	var span = document.createElement('span');
	span.style.display = "none";
	span.innerHTML = responseText;
	document.body.appendChild(span);
	docharpane(span);
	span.parentNode.removeChild(span);
	statusMessage("Updating: Getting inventory");
	GM_get("/inventory.php?which=2", updateinventory);
}

function updateinventory(responseText) {
	var span = document.createElement('span');
	span.style.display = "none";
	span.innerHTML = responseText;
	document.body.appendChild(span);
	doinventorypage(span);
	span.parentNode.removeChild(span);
	statusMessage("Updating: Getting charsheet");
	GM_get("/charsheet.php", updatecharsheet);
}

function updatecharsheet(responseText) {
	var span = document.createElement('span');
	var newtable;
	span.style.display = "none";
	span.innerHTML = responseText;
	document.body.appendChild(span);
	docharsheet(span);
	span.parentNode.removeChild(span);
	updating = false;
	statusMessage("Done updating");
	if(lastSnarfblat > -1) {
		newtable = buildtable(initArray[lastSnarfblat].sort(sortinit), lastSnarfblat);
		newtable.style.position = "absolute";
		newtable.style.left = currentTable.style.left;
		newtable.style.top = currentTable.style.top;
		currentTable.parentNode.replaceChild(newtable, currentTable);
		currentTable = newtable;
		statusMessage("Up to date init and ML");
	}
}

function statusMessage(newMessage) {
	var messageObj;
	if(currentTable) {
		messageObj = currentTable.rows[currentTable.rows.length-1].cells[0].firstChild;
		messageObj.data = newMessage;
	}
}

function buildtable(initArray, snarfblat) {
	var table = document.createElement('table');
	var tr;
	var td;
	var b;
	var modifier;

	EffectBonus = GM_getValue("effectBonus", 0);
	gearBonus   = GM_getValue("gearBonus", 0);
	skillBonus  = GM_getValue("skillBonus", 0);
	EffectML    = GM_getValue("effectML", 0);
	gearML      = GM_getValue("gearML", 0);
	modifier = parseInt(computemodifier(), 10);

	table.style.fontSize = "10px";
	table.style.border = "1px solid black";
	table.style.backgroundColor = "white";
	table.cellSpacing = 0;
	tr = table.insertRow(-1);
	tr.style.textAlign = "center";
	td = tr.insertCell(-1);
	td.colSpan = 2;
	td.appendChild(document.createTextNode(locationname(snarfblat)));
	for(var i = 0; i < initArray.length; i++) {
		var thisName = initArray[i][0];
		var thisInit = initArray[i][1];
		var thisJump = 100 - parseInt(thisInit, 10) + modifier;
//		GM_log("modifier: " + modifier);
//		GM_log("computemodifier: "+computemodifier());
		if(thisJump > 100) {
			thisJump = 100;
		} else if(thisJump < 0) {
			thisJump = 0;
		}
		if(!/^\d+$/.exec(thisInit)) {
			thisJump = modifier;
		}
		tr = table.insertRow(-1);
		if(thisJump >= 100) {
			tr.style.backgroundColor = "rgb(233, 255, 233)";
		} else if(/^\d+$/.exec(thisInit)) {
			tr.style.backgroundColor = "rgb(255, 233, 233)";
		}
		td = tr.insertCell(-1);
		td.style.paddingRight = "8px";
		if(thisJump == 100 || /^\d+$/.exec(thisInit)) {
			td.appendChild(document.createTextNode(thisName+" ("+thisInit+")"));
		} else {
			td.appendChild(document.createTextNode(thisName));
		}
		td = tr.insertCell(-1);
		if(thisJump == 100 || /^\d+$/.exec(thisInit)) {
//			td.appendChild(document.createTextNode(thisInit+"/"+thisJump+"%"));
			td.appendChild(document.createTextNode(thisJump+"%"));
		} else {
			td.appendChild(document.createTextNode(thisInit));
		}
	}
	tr = table.insertRow(-1);
	tr.style.textAlign = "center";
	td = tr.insertCell(-1);
	td.colSpan = 2;
	td.appendChild(document.createTextNode("Init Bonus: "+(effectBonus+gearBonus+skillBonus)));
	tr = table.insertRow(-1);
	tr.style.textAlign = "center";
	td = tr.insertCell(-1);
	td.colSpan = 2;
	td.appendChild(document.createTextNode("ML: "+(effectML+gearML < 0 ? "-" : "+")+(effectML+gearML)));
	tr = table.insertRow(-1);
	tr.style.textAlign = "center";
	td = tr.insertCell(-1);
	td.colSpan = 2;
	b = document.createElement('b');
	b.appendChild(document.createTextNode('Initiative Modifier: '+computemodifier()));
	td.appendChild(b);
	tr = table.insertRow(-1);
	tr.style.textAlign = "center";
	td = tr.insertCell(-1);
	td.colSpan = 2;
	if(!updating) {
		td.appendChild(document.createTextNode("press shift to update gear/effects"));
	} else {
		td.appendChild(document.createTextNode("Updating..."));
	}
	return table;
}

function computemodifier() {
	var mod = effectBonus+gearBonus+skillBonus-mlmodifier(effectML+gearML);
	GM_log("ml modifier("+(effectML+gearML)+") = "+mlmodifier(effectML+gearML));
	return (mod < 0 ? "" : "+")+mod;
}

function mlmodifier(ml) {
	if(ml > 100) {
		return 200+(5*(ml-100));
	} else if(ml > 80) {
		return 120+(4*(ml-80));
	} else if(ml > 60) {
		return 60+(3*(ml-60));
	} else if(ml > 40) {
		return 20+(2*(ml-40));
	} else if(ml > 20) {
		return ml-20;
	}
	return 0;
}

function locationname(snarfblat) {
	for(var i = 0; i < locationArray.length; i++) {
		if(locationArray[i][1] == snarfblat) {
			return locationArray[i][0];
		}
	}
}

function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}