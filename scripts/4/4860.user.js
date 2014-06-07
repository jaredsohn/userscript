// MTG-Cardlinker v1.3
//
// V1.3: Added autolinking for starcitygames.
//       Added lookup of any card at starcitygames
//       Added "Lookup" Button which either searches for a card by a
//       selection (marked area) in the website or opens up a requester where
//       you can enter the cardname.
//
// V1.2: Added more Cardnames (had a bug in the listgenerator I use)
//       Changed how the "status bar" works (using one popup only)
//       Splitt Cards (e.g. Hide // Seek) do now work (in different notations) too
//       Fixed problems with cardnames containing a quote character
// V1.1: Updated handling for http://www.mtgcity.com/ forums
//
// This script has a huge cardnames "database" inside and will do different things:
//
// 1. Give the option to "autolink" all MTG Cardnames it knows.
//    This process has to be triggered manually either by menu or clicking the
//    little popup on the top right of the website
//
//    Nice place to test this is: http://www.magic4you.nu/
//
// 2. Automatically relink the cardlinks of some sites to inline popups
//
//    Wizards Website and Forums
//    M T C City (discards the original link!!!)
//    (others may be added later...)
//
// 3. Add a link a very good price/information/bigger pictures Resources
// 
//
// Copyright (c) 2006, Hans Raaf (aka OderWat?)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// with help of the Google Lucky Links script
//
// Copyright (c) 2005, Kyrlian
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// and some script from
//
// http://lieschke.net/projects/greasemonkey/
//
// ==UserScript==
// @name          MTG Cardlinker
// @namespace     http://www.oderwat.de/greasemonkey/userscripts
// @description   Autolinks MTG Card Names on different Sites and shows the cards inline
// @include       http://www.wizards.com/*
// @include       http://boards1.wizards.com/*
// @include       http://www.mtgcity.com/*
// @include       http://www.magic4you.nu/*
// @include       http://www.germagic.de/*
// @include       http://www.starcitygames.com/*
// ==/UserScript==

var cardnames = [
"Abandoned Outpost","Abolish","Aboshan's Desire","Aboshan, Cephalid Emperor","About Face","Absolver Thrull","Absorb","Abuna's Chant","Abyssal Horror","Abyssal Nocturnus",
"Abyssal Specter","Academy Rector","Accelerated Mutation","Acceptable Losses","Accumulated Knowledge","Accursed Centaur","Ach! Hans, Run!","Acorn Harvest","Acquire","Adamaro, First to Desire",
"Adarkar Valkyrie","Adarkar Wastes","Adarkar Windform","Advanced Hoverguard","Aegis of Honor","Aerial Caravan","Aesthetic Consultation","AEther Barrier","AEther Burst","AEther Charge",
"AEther Flash","AEther Mutation","AEther Rift","AEther Shockwave","AEther Snap","AEther Spellbomb","AEther Sting","AEther Vial","AEthermage's Touch","AEtherplasm",
"Afflict","Afterlife","Ageless Entity","Ageless Sentinels","Agent of Masks","Agent of Shauku","Aggravated Assault","Aggressive Urge","Agonizing Demise","Agonizing Memories",
"Agrus Kos, Wojek Veteran","Air Bladder","Air Elemental","Airborne Aid","Airdrop Condor","Akki Avalanchers","Akki Blizzard-Herder","Akki Coalflinger","Akki Drillmaster","Akki Lavarunner",
"Akki Raider","Akki Rockspeaker","Akki Underling","Akki Underminer","Akroma's Blessing","Akroma's Devoted","Akroma's Vengeance","Akroma, Angel of Wrath","Akuta, Born of Ash","Alabaster Leech",
"Alabaster Wall","Aladdin's Ring","Albino Troll","Alexi's Cloak","Alexi, Zephyr Mage","All Suns' Dawn","Alley Grifters","Allied Strategies","Allosaurus Rider","Alloy Golem",
"Alpha Kavu","Alpha Myr","Alpha Status","Altar of Shadows","Altar's Light","Alter Reality","Ambassador Laquatus","Ambiguity","Ambition's Cost","Ambush Commander",
"Amphibious Kavu","Amugaba","Ana Disciple","Ana Sanctuary","Anaba Shaman","Anaconda","Anarchist","Anavolver","Ancestor's Chosen","Ancestor's Prophet",
"Ancestral Mask","Ancestral Memories","Ancestral Tribute","Ancient Den","Ancient Hydra","Ancient Kavu","Ancient Ooze","Ancient Silverback","Ancient Spider","Ancient Spring",
"Andradite Leech","Angel of Despair","Angel of Mercy","Angel of Retribution","Angel's Feather","Angel's Trumpet","Angelfire Crusader","Angelic Blessing","Angelic Curator","Angelic Favor",
"Angelic Page","Angelic Shield","Angelic Wall","Animal Boneyard","Animal Magnetism","Animate Land","Annex","Annihilate","Annul","Anodet Lurker",
"Anthem of Rakdos","Anthroplasm","Anurid Barkripper","Anurid Brushhopper","Anurid Murkdiver","Anurid Scavenger","Anurid Swarmsnapper","Aphetto Alchemist","Aphetto Dredging","Aphetto Exterminator",
"Aphetto Grifter","Aphetto Runecaster","Aphetto Vulture","Apprentice Necromancer","Aquamoeba","Aquastrand Spider","Araba Mothrider","Arachnoid","Arashi, the Sky Asunder","Arc Lightning",
"Arc Mage","Arc-Slogger","Arcane Laboratory","Arcane Spyglass","Arcane Teachings","Arcanis the Omnipotent","Arcbound Bruiser","Arcbound Crusher","Arcbound Fiend","Arcbound Hybrid",
"Arcbound Lancer","Arcbound Overseer","Arcbound Ravager","Arcbound Reclaimer","Arcbound Slith","Arcbound Stinger","Arcbound Wanderer","Arcbound Worker","Archaeological Dig","Archery Training",
"Archivist","Arctic Flats","Arctic Nishoba","Arcum Dagsson","Ardent Militia","Ardent Soldier","Argothian Enchantress","Ark of Blight","Armadillo Cloak","Armageddon",
"Armed Response","Armistice","Armored Guardian","Arms Dealer","Arrest","Arrogant Wurm","Artful Looter","Artifact Mutation","Artificer's Intuition","Artificial Evolution",
"Ascendant Evincar","Ascending Aven","Ashen Firebeast","Ashen Monstrosity","Ashen-Skin Zubera","Ashes of the Fallen","Ashnod's Coupon","Ass Whuppin'","Assault // Battery","Assault Zeppelid",
"Assembly Hall","Assert Authority","Assquatch","Astral Slide","Astral Steel","Atalya, Samite Master","Atinlay Igpay","Atogatog","Attrition","Aura Barbs",
"Aura Blast","Aura Extraction","Aura Flux","Aura Fracture","Aura Graft","Aura Mutation","Aura of Dominion","Aura of Silence","Aura Shards","Aura Thief",
"Auramancer","Auratouched Mage","Aurification","Auriok Bladewarden","Auriok Champion","Auriok Glaivemaster","Auriok Salvagers","Auriok Siege Sled","Auriok Steelshaper","Auriok Transfixer",
"Auriok Windwalker","Aurochs Herd","Aurora Eidolon","Aurora Griffin","Autochthon Wurm","Avalanche Riders","Avarax","Avarice Totem","Avatar of Discord","Avatar of Fury",
"Avatar of Hope","Avatar of Me","Avatar of Might","Avatar of Will","Avatar of Woe","Aven Archer","Aven Brigadier","Aven Cloudchaser","Aven Envoy","Aven Farseer",
"Aven Fateshaper","Aven Fisher","Aven Flock","Aven Fogbringer","Aven Liberator","Aven Redeemer","Aven Shrine","Aven Smokeweaver","Aven Soulgazer","Aven Trooper",
"Aven Warcraft","Aven Warhawk","Aven Windreader","Avenger en-Dal","Awe Strike","AWOL","Ayumi, the Last Visitor","Azami, Lady of Scrolls","Azorius AEthermage","Azorius Chancery",
"Azorius First-Wing","Azorius Guildmage","Azorius Herald","Azorius Ploy","Azorius Signet","Azure Drake","Azusa, Lost but Seeking","B-I-N-G-O","Backlash","Backslide",
"Bad Ass","Baku Altar","Balance of Power","Balancing Act","Balduvian Barbarians","Balduvian Frostwaker","Balduvian Horde","Balduvian Rage","Balduvian Warlord","Baleful Stare",
"Ball Lightning","Ballista Squad","Balloon Peddler","Balshan Beguiler","Balshan Collaborator","Balshan Griffin","Balthor the Defiled","Balthor the Stout","Bamboozle","Bane of the Living",
"Banshee's Blade","Barbarian Bully","Barbarian Lunatic","Barbarian Outcast","Barbarian Riftcutter","Barbarian Ring","Barbed Field","Barbed Lightning","Barbed Wire","Bargaining Table",
"Barkhide Mauler","Barrel Down Sokenzan","Barren Moor","Barrin's Spite","Barrin's Unmaking","Barter in Blood","Bash to Bits","Basking Rootwalla","Bathe in Light","Baton of Courage",
"Battered Golem","Battering Craghorn","Battering Wurm","Battle of Wits","Battle Rampart","Battle Screech","Battle Squadron","Battle Strain","Battle-Mad Ronin","Battlefield Forge",
"Battlefield Medic","Battlefield Percher","Battlefield Scrounger","Battlegrowth","Battlewise Aven","Beacon Hawk","Beacon of Creation","Beacon of Destiny","Beacon of Destruction","Beacon of Immortality",
"Beacon of Tomorrows","Beacon of Unrest","Bearscape","Beast Attack","Beast of Burden","Beastmaster's Magemark","Bedlam","Befoul","Belbe's Armor","Belbe's Percher",
"Belbe's Portal","Belfry Spirit","Bellowing Fiend","Belltower Sphinx","Beloved Chaplain","Ben-Ben, Akki Hermit","Benalish Emissary","Benalish Heralds","Benalish Lancer","Benalish Trapper",
"Bend or Break","Benediction of Moons","Benevolent Ancestor","Benevolent Bodyguard","Benthic Behemoth","Bereavement","Berserk Murlodont","Betrayal of Flesh","Bifurcate","Bile Urchin",
"Biomantic Mastery","Bioplasm","Biorhythm","Birchlore Rangers","Birds of Paradise","Black Knight","Black Market","Blackmail","Blade Sliver","Blademane Baku",
"Bladewing the Risen","Bladewing's Thrall","Blanchwood Armor","Blast from the Past","Blaster Mage","Blasting Station","Blastoderm","Blatant Thievery","Blazing Archon","Blazing Salvo",
"Blazing Shoal","Blazing Specter","Blessed Breath","Blessed Orator","Blessed Reversal","Blessed Wind","Blessing of Leeches","Blessing of the Nephilim","Blind Creeper","Blind Hunter",
"Blind Seer","Blind with Anger","Blinding Angel","Blinding Beam","Blinding Light","Blinding Powder","Blinking Spirit","Blinkmoth Infusion","Blinkmoth Nexus","Blinkmoth Urn",
"Blinkmoth Well","Blistering Firecat","Blizzard Elemental","Blizzard Specter","Bloated Toad","Blockade Runner","Blockbuster","Blood Celebrant","Blood Clock","Blood Crypt",
"Blood Funnel","Blood Hound","Blood Moon","Blood Oath","Blood Pet","Blood Rites","Blood Speaker","Bloodbond March","Bloodcurdler","Bloodfire Colossus",
"Bloodfire Dwarf","Bloodfire Infusion","Bloodfire Kavu","Bloodletter Quill","Bloodline Shaman","Bloodscale Prowler","Bloodscent","Bloodshot Cyclops","Bloodstained Mire","Bloodstoke Howler",
"Bloodstone Cameo","Bloodthirsty Ogre","Blurred Mongoose","Boa Constrictor","Body of Jukai","Body Snatcher","Bog Down","Bog Elemental","Bog Gnarr","Bog Imp",
"Bog Initiate","Bog Smugglers","Bog Witch","Bog Wraith","Bog Wreckage","Boiling Seas","Bola Warrior","Bomb Squad","Bond of Agony","Bone Shredder",
"Boneknitter","Boneshard Slasher","Bonesplitter","Bonethorn Valesk","Booby Trap","Book Burning","Boomerang","Booster Tutor","Borborygmos","Border Patrol",
"Boreal Druid","Boreal Griffin","Boreal Shelf","Boros Fury-Shield","Boros Garrison","Boros Guildmage","Boros Recruit","Boros Signet","Boros Swiftblade","Boseiju, Who Shelters All",
"Bosh, Iron Golem","Bosom Buddy","Bottle Gnomes","Bottled Cloister","Bouncing Beebles","Bound // Determined","Bounteous Kirin","Brace for Impact","Braid of Fire","Braids, Cabal Minion",
"Braidwood Cup","Braidwood Sextant","Brain Freeze","Brain Pry","Brainspoil","Brainstorm","Bramble Elemental","Branchsnap Lorian","Branded Brawlers","Brass Herald",
"Brass Secretary","Brawn","Break Asunder","Break Open","Breaking Point","Breaking Wave","Breakthrough","Breath of Darigaaz","Breath of Fury","Breath of Life",
"Breeding Pool","Briar Patch","Briarknit Kami","Bribery","Brightflame","Brightstone Ritual","Brine Seer","Bringer of the Black Dawn","Bringer of the Blue Dawn","Bringer of the Green Dawn",
"Bringer of the Red Dawn","Bringer of the White Dawn","Brink of Madness","Brontotherium","Bronze Bombshell","Brood Sliver","Broodhatch Nantuko","Brooding Saurian","Broodstar","Brothers Yamazaki",
"Browbeat","Brown Ouphe","Brushland","Brushstroke Paintermage","Brutal Deceiver","Brutal Suppression","Bubbling Beebles","Bubbling Muck","Budoka Gardener","Budoka Pupil",
"Bull Aurochs","Bull Hippo","Buoyancy","Burden of Greed","Buried Alive","Burning Sands","Burning Wish","Burning-Eye Zubera","Burning-Tree Bloodscale","Burning-Tree Shaman",
"Burr Grafter","Burst of Energy","Bursting Beebles","Bushi Tenderfoot","Butcher Orgg","Cabal Archon","Cabal Coffers","Cabal Conditioning","Cabal Executioner","Cabal Inquisitor",
"Cabal Interrogator","Cabal Patriarch","Cabal Pit","Cabal Ritual","Cabal Shrine","Cabal Slaver","Cabal Surgeon","Cabal Therapy","Cabal Torturer","Cabal Trainee",
"Cackling Flames","Cackling Imp","Cackling Witch","Cage of Hands","Cagemail","Caldera Kavu","Call for Blood","Call of the Herd","Call of the Wild","Call to the Grave",
"Caller of the Claw","Caller of the Hunt","Callous Deceiver","Callous Giant","Callous Oppressor","Callow Jushi","Calming Verse","Caltrops","Candles' Glow","Canopy Claws",
"Canopy Crawler","Canopy Spider","Canopy Surge","Cantivore","Canyon Wildcat","Capashen Knight","Capashen Standard","Capashen Templar","Capashen Unicorn","Capsize",
"Captain Sisay","Captain's Maneuver","Captive Flame","Carbonize","Cardpecker","Careful Study","Caregiver","Carnival of Souls","Carnivorous Death-Parrot","Carnophage",
"Carom","Carrion Feeder","Carrion Howler","Carrion Rats","Carrion Wall","Carrion Wurm","Carry Away","Cartographer","Carven Caryatid","Castigate",
"Catalog","Catalyst Stone","Catapult Master","Catapult Squad","Cateran Brute","Cateran Enforcer","Cateran Kidnappers","Cateran Overlord","Cateran Persuader","Cateran Slaver",
"Cateran Summons","Cathodion","Cauldron Dance","Caustic Rain","Caustic Tar","Caustic Wasps","Cave Sense","Cave-In","Cavern Crawler","Cavern Harpy",
"Caves of Koilos","Cease-Fire","Celestial Ancient","Celestial Convergence","Celestial Gatekeeper","Celestial Kirin","Centaur Chieftain","Centaur Garden","Centaur Glade","Centaur Rootcaster",
"Centaur Safeguard","Centaur Veteran","Cephalid Aristocrat","Cephalid Broker","Cephalid Coliseum","Cephalid Constable","Cephalid Illusionist","Cephalid Inkshrouder","Cephalid Looter","Cephalid Pathmage",
"Cephalid Retainer","Cephalid Sage","Cephalid Scout","Cephalid Shrine","Cephalid Snitch","Cephalid Vandal","Cerebral Vortex","Ceremonial Guard","Cerulean Sphinx","Cessation",
"Ceta Disciple","Ceta Sanctuary","Cetavolver","Chain of Acid","Chain of Plasma","Chain of Silence","Chain of Smog","Chain of Vapor","Chainer's Edict","Chainer, Dementia Master",
"Chainflinger","Chalice of the Void","Chamber of Manipulation","Chambered Nautilus","Chameleon Spirit","Chance Encounter","Channel the Suns","Chant of Vitu-Ghazi","Chaotic Strike","Charcoal Diamond",
"Charge Across the Araba","Charging Slateback","Charging Troll","Charisma","Charm Peddler","Charmed Griffin","Charmed Pendant","Chartooth Cougar","Chastise","Chatter of the Squirrel",
"Cheap Ass","Cheatyface","Chieftain en-Dal","Child of Thorns","Childhood Horror","Chill Haunting","Chill to the Bone","Chilling Apparition","Chilling Shade","Chime of Night",
"Chimeric Coils","Chimeric Egg","Chimeric Idol","Chimney Imp","Chisei, Heart of Oceans","Chittering Rats","Chlorophant","Cho-Arrim Alchemist","Cho-Arrim Bruiser","Cho-Arrim Legate",
"Cho-Manno's Blessing","Cho-Manno, Revolutionary","Choice of Damnations","Choking Tethers","Chord of Calling","Chorus of the Conclave","Chromatic Sphere","Chrome Mox","Chromescale Drake","Chromeshell Crab",
"Churning Eddy","Cinder Elemental","Cinder Seer","Cinder Shade","Cinder Wall","Circle of Protection: Artifacts","Circle of Protection: Black","Circle of Protection: Blue","Circle of Protection: Green","Circle of Protection: Red",
"Circle of Protection: White","Circle of Solace","Circu, Dimir Lobotomist","Circular Logic","Citadel of Pain","City of Ass","City of Brass","Civic Wayfinder","Clash of Realities","Claws of Wirewood",
"Cleanfall","Cleansing Beam","Cleansing Meditation","Clear the Land","Clearwater Goblet","Clickslither","Clinging Darkness","Clock of Omens","Clockwork Beetle","Clockwork Condor",
"Clockwork Dragon","Clockwork Vorrac","Clone","Close Quarters","Cloud Cover","Cloud of Faeries","Cloud Sprite","Cloudchaser Eagle","Cloudcrest Lake","Cloudhoof Kirin",
"Cloudpost","Cloudreach Cavalry","Cloudstone Curio","Clutch of the Undercity","Clutch of Undeath","Coalhauler Swine","Coalition Flag","Coalition Honor Guard","Coalition Victory","Coast Watcher",
"Coastal Drake","Coastal Hornclaw","Coastal Piracy","Coastal Tower","Coat of Arms","Cobalt Golem","Coercion","Coffin Puppets","Coffin Purge","Cognivore",
"Coiling Oracle","Coiling Woodworm","Coldsteel Heart","Collapsing Borders","Collective Restraint","Collective Unconscious","Collector Protector","Colos Yearling","Commandeer","Commander Eesha",
"Commando Raid","Common Cause","Commune with Nature","Complex Automaton","Complicate","Composite Golem","Compost","Compulsion","Compulsive Research","Concentrate",
"Concerted Effort","Conclave Equenaut","Conclave Phalanx","Conclave's Blessing","Condemn","Condescend","Confessor","Confiscate","Confound","Confusion in the Ranks",
"Congregation at Dawn","Conjurer's Ban","Conjurer's Bauble","Conspiracy","Consult the Necrosages","Consume Spirit","Consume Strength","Consuming Vortex","Consumptive Goo","Contaminated Bond",
"Contested Cliffs","Convalescent Care","Convolute","Copper Myr","Copper-Leaf Angel","Copperhoof Vorrac","Copy Enchantment","Coral Merfolk","Coral Net","Coretapper",
"Cornered Market","Corpse Harvester","Corrupt Official","Cosmic Larva","Counsel of the Soratami","Counterbalance","Counterspell","Courier Hawk","Court Hussar","Cover of Darkness",
"Cover of Winter","Covert Operative","Covetous Dragon","Cowardice","Cowed by Wisdom","Crack the Earth","Crackdown","Crackling Club","Crafty Pathmage","Crag Saurian",
"Cranial Extraction","Cranial Plating","Crash Landing","Crashing Centaur","Craw Wurm","Crawling Filth","Crawlspace","Crazed Firecat","Crazed Goblin","Creature Guy",
"Credit Voucher","Creeping Mold","Cremate","Crenellated Wall","Crested Craghorn","Crime // Punishment","Crimson Acolyte","Crimson Hellkite","Crippling Fatigue","Cromat",
"Crookclaw Elder","Crooked Scales","Crop Rotation","Crosis's Attendant","Crosis's Catacombs","Crosis's Charm","Crosis, the Purger","Crossbow Infantry","Crowd Favorites","Crown of Ascension",
"Crown of Awe","Crown of Convergence","Crown of Flames","Crown of Fury","Crown of Suspicion","Crown of Vigor","Crucible of Worlds","Crude Rampart","Cruel Deceiver","Cruel Edict",
"Cruel Revival","Crumbling Sanctuary","Crusading Knight","Crush of Wurms","Crushing Pain","Cry of Contrition","Cryoclasm","Crypt Angel","Crypt Champion","Crypt Creeper",
"Crypt Rats","Crypt Sliver","Cryptic Gateway","Cryptwailing","Crystal Quarry","Crystal Rod","Crystal Seer","Crystal Shard","Crystal Spray","Crystalline Sliver",
"Culling Scales","Culling Sun","Cultural Exchange","Cunning Bandit","Cunning Wish","Curiosity","Curse of the Fire Penguin","Cursed Flesh","Cursed Monstrosity","Cursed Ronin",
"Curtain of Light","Custody Battle","Customs Depot","Cut the Earthly Bond","Cut the Tethers","Cyclopean Snare","Cytoplast Manipulator","Cytoplast Root-Kin","Cytoshape","Cytospawn Shambler",
"Daggerclaw Imp","Dakmor Lancer","Dampen Thought","Damping Engine","Damping Matrix","Dance of Shadows","Dancing Scimitar","Darba","Darien, King of Kjeldor","Darigaaz's Attendant",
"Darigaaz's Caldera","Darigaaz's Charm","Darigaaz, the Igniter","Daring Apprentice","Daring Leap","Dark Banishing","Dark Confidant","Dark Depths","Dark Heart of the Wood","Dark Ritual",
"Dark Supplicant","Dark Suspicions","Dark Triumph","Darkblast","Darkest Hour","Darksteel Brute","Darksteel Citadel","Darksteel Colossus","Darksteel Forge","Darksteel Gargoyle",
"Darksteel Ingot","Darksteel Pendant","Darksteel Reactor","Darkwatch Elves","Darkwater Catacombs","Darkwater Egg","Darting Merfolk","Daru Cavalier","Daru Encampment","Daru Healer",
"Daru Lancer","Daru Mender","Daru Sanctifier","Daru Spiritualist","Daru Stinger","Daru Warchief","Daunting Defender","Dauthi Slayer","Dawn Elemental","Dawn of the Dead",
"Dawn's Reflection","Dawning Purist","Dawnstrider","Day of Destiny","Day of the Dragons","Daze","Dead Ringers","Dead-Iron Sledge","Deadapult","Deadly Insect",
"Deal Damage","Death Bomb","Death Charmer","Death Cloud","Death Denied","Death Grasp","Death Match","Death Mutation","Death of a Thousand Stings","Death or Glory",
"Death Pit Offering","Death Pits of Rath","Death Pulse","Death Wish","Death's-Head Buzzard","Death-Mask Duplicant","Deathcurse Ogre","Deathgazer","Deathknell Kami","Deathmark Prelate",
"Deathmask Nezumi","Debtors' Knell","Decaying Soil","Decimate","Decompose","Deconstruct","Decree of Annihilation","Decree of Justice","Decree of Pain","Decree of Savagery",
"Decree of Silence","Dedicated Martyr","Deep Analysis","Deep Reconnaissance","Deepfire Elemental","Deepwood Drummer","Deepwood Elder","Deepwood Ghoul","Deepwood Legate","Deepwood Tantiv",
"Deepwood Wolverine","Defender en-Vec","Defender of Chaos","Defender of Law","Defender of the Order","Defense Grid","Defense of the Heart","Defensive Maneuvers","Defiant Elf","Defiant Falcon",
"Defiant Vanguard","Defiling Tears","Deflection","Deftblade Elite","Defy Gravity","Dega Disciple","Dega Sanctuary","Degavolver","Dehydration","Delaying Shield",
"Delirium Skeins","Delraich","Delusions of Mediocrity","Dematerialize","Demolish","Demon's Horn","Demon's Jester","Demonfire","Demoralize","Demystify",
"Dense Canopy","Denying Wind","Deranged Hermit","Dermoplasm","Descendant of Kiyomaro","Descendant of Masumaro","Descendant of Soramaro","Desecration Elemental","Desert Twister","Deserted Temple",
"Desolation Angel","Desolation Giant","Desperate Research","Desperate Ritual","Despoil","Destructive Flow","Detonate","Devastate","Devastating Dreams","Devoted Caretaker",
"Devoted Retainer","Devour in Shadow","Devouring Greed","Devouring Light","Devouring Rage","Devouring Strossus","Devout Harpist","Devout Witness","Diabolic Edict","Diabolic Intent",
"Diabolic Tutor","Diamond Faerie","Diligent Farmhand","Dimensional Breach","Dimir Aqueduct","Dimir Cutpurse","Dimir Doppelganger","Dimir Guildmage","Dimir House Guard","Dimir Infiltrator",
"Dimir Machinations","Dimir Signet","Dingus Egg","Diplomatic Escort","Diplomatic Immunity","Dirge of Dread","Dirty Wererat","Disappear","Disarm","Disciple of Grace",
"Disciple of Kangee","Disciple of Malice","Disciple of the Vault","Discombobulate","Disease Carriers","Disembowel","Disenchant","Dismantle","Dismantling Blow","Disorder",
"Dispersal Shield","Dispersing Orb","Disrupting Scepter","Disrupting Shoal","Disruption Aura","Disruptive Pitmage","Dissipate","Distorting Lens","Distorting Wake","Distress",
"Dive Bomber","Divebomber Griffin","Divergent Growth","Diversionary Tactics","Divert","Divine Light","Divine Presence","Divine Sacrament","Diving Griffin","Divining Witch",
"Dizzy Spell","Djinn Illuminatus","Do or Die","Dodecapod","Dogged Hunter","Dogpile","Dominaria's Judgment","Dominate","Domineer","Donate",
"Doom Cannon","Doomed Necromancer","Doomsday Specter","Door to Nothingness","Dosan the Falling Leaf","Dosan's Oldest Chant","Double Header","Doubling Cube","Doubling Season","Doubtless One",
"Douse in Gloom","Dovescape","Downhill Charge","Dowsing Shaman","Draco","Dragon Arch","Dragon Blood","Dragon Breath","Dragon Fangs","Dragon Mage",
"Dragon Roost","Dragon Scales","Dragon Shadow","Dragon Tyrant","Dragon Wings","Dragon's Claw","Dragonspeaker Shaman","Dragonstalker","Dragonstorm","Drain Life",
"Drake Familiar","Drake Hatchling","Drake-Skull Cameo","Dralnu's Crusade","Dralnu's Pet","Drawn Together","Dread Slag","Dream Chisel","Dream Leash","Dream Prowler",
"Dream Thrush","Dream's Grip","Dreamborn Muse","Dreamcatcher","Dreamwinder","Dredge","Dregs of Sorrow","Drekavac","Drelnoch","Drift of Phantasms",
"Drill-Skimmer","Drinker of Sorrow","Dripping Dead","Dripping-Tongue Zubera","Dromad Purebred","Dromar's Attendant","Dromar's Cavern","Dromar's Charm","Dromar, the Banisher","Droning Bureaucrats",
"Drooling Groodion","Drooling Ogre","Dross Crocodile","Dross Golem","Dross Harvester","Dross Prowler","Dross Scorpion","Drowned Rusalka","Drudge Skeletons","Druid Lyrist",
"Druid's Call","Dryad Sophisticate","Dryad's Caress","Dual Nature","Dueling Grounds","Duh","Dumb Ass","Dune-Brood Nephilim","Duplicant","Duress",
"Dusk Imp","Duskmantle, House of Shadow","Duskwalker","Duskworker","Dust Bowl","Dwarven Blastminer","Dwarven Bloodboiler","Dwarven Demolition Team","Dwarven Driller","Dwarven Grunt",
"Dwarven Landslide","Dwarven Patrol","Dwarven Recruiter","Dwarven Scorcher","Dwarven Shrine","Dwarven Strike Force","Dwell on the Past","Dying Wail","Early Frost","Early Harvest",
"Earnest Fellowship","Earsplitting Rats","Earth Rift","Earth Surge","Earthblighter","Earthen Goo","Earthquake","Earthshaker","Eastern Paladin","Eater of Days",
"Ebon Drake","Ebonblade Reaper","Ebony Owl Netsuke","Ebony Treefolk","Echo Tracer","Echoing Calm","Echoing Courage","Echoing Decay","Echoing Ruin","Echoing Truth",
"Eerie Procession","Eiganjo Castle","Eiganjo Free-Riders","Eight-and-a-Half-Tails","Eladamri's Call","Elder Druid","Elder Pine of Jukai","Electrolyze","Electrostatic Bolt","Elemental Resonance",
"Elephant Ambush","Elephant Guide","Elephant Resurgence","Elf Replica","Elfhame Palace","Elfhame Sanctuary","Elite Archers","Elite Javelineer","Elven Riders","Elves of Deep Shadow",
"Elvish Aberration","Elvish Archers","Elvish Bard","Elvish Berserker","Elvish Champion","Elvish Guidance","Elvish House Party","Elvish Lookout","Elvish Lyrist","Elvish Pathcutter",
"Elvish Pioneer","Elvish Piper","Elvish Scrapper","Elvish Skysweeper","Elvish Soultiller","Elvish Vanguard","Elvish Warrior","Embalmed Brawler","Embargo","Ember Beast",
"Ember Shot","Ember-Fist Zubera","Embermage Goblin","Emblazoned Golem","Embolden","Emcee","Emissary of Despair","Emissary of Hope","Emperor Crocodile","Empress Galina",
"Empty the Catacombs","Empty-Shrine Kannushi","Empyrial Armor","Empyrial Plate","Enchantress's Presence","Encroach","Endbringer's Revel","Endemic Plague","Endless Swarm","Endless Whispers",
"Enduring Ideal","Enemy of the Guildpact","Energy Chamber","Energy Flux","Engineered Explosives","Engineered Plague","Engulfing Flames","Enigma Eidolon","Enlightened Tutor","Enlistment Officer",
"Enormous Baloth","Enrage","Enshrined Memories","Enslaved Dwarf","Enslaved Horror","Ensnare","Ensnaring Bridge","Ensouled Scimitar","Enter the Dungeon","Entomb",
"Entrails Feaster","Entropic Eidolon","Envelop","Eon Hub","Epic Struggle","Epicenter","Equal Treatment","Equilibrium","Eradicate","Erase",
"Erayo, Soratami Ascendant","Erhnam Djinn","Erithizon","Erratic Explosion","Ertai's Trickery","Ertai, the Corrupted","Escape Artist","Escape Routes","Essence Drain","Essence Fracture",
"Essence Leak","Essence Sliver","Etched Oracle","Eternal Dominion","Eternal Dragon","Eternal Witness","Ethereal Haze","Ethereal Usher","Evacuation","Evasive Action",
"Everglove Courier","Evermind","Eviscerator","Evolution Vat","Exalted Angel","Excavation","Excise","Exclude","Excruciator","Execute",
"Exhaustion","Exhumer Thrull","Exile into Darkness","Exiled Doomsayer","Exoskeletal Armor","Exotic Curse","Exotic Disease","Expendable Troops","Experiment Kraj","Explosive Growth",
"Explosive Vegetation","Extortion","Extra Arms","Extraplanar Lens","Extravagant Spirit","Extruder","Eye of Nowhere","Eye of Ramos","Eye of the Storm","Eye of Yawgmoth",
"Eye to Eye","Eyes of the Watcher","Fabricate","Face to Face","Faceless Butcher","Faces of the Past","Fact or Fiction","Fade from Memory","Faerie Conclave","Faerie Squadron",
"Faith's Fetters","Faithful Squire","Fallen Angel","Fallen Cleric","Falling Timber","False Cure","False Dawn","False Demise","False Memories","False Prophet",
"Familiar Ground","Famished Ghoul","Fanatical Devotion","Fangren Firstborn","Fangren Hunter","Fangren Pathcutter","Far Wanderings","Farewell to Arms","Farseek","Farsight Mask",
"Fat Ass","Fatal Mutation","Fatespinner","Fault Riders","Feast of Worms","Fecundity","Feedback Bolt","Feeding Frenzy","Fellwar Stone","Femeref Archers",
"Fencer's Magemark","Fend Off","Feral Animist","Feral Deceiver","Feral Lightning","Feral Throwback","Ferocious Charge","Ferocity","Feroz's Ban","Ferropede",
"Fertile Ground","Fertile Imagination","Fervent Charge","Fervent Denial","Fervor","Festering Goblin","Festering Wound","Festival of the Guildpact","Fever Charm","Fickle Efreet",
"Fiddlehead Kami","Field Marshal","Field of Reality","Field Surgeon","Fierce Empath","Fiery Conclusion","Fiery Gambit","Fiery Temper","Fighting Drake","Fill with Fright",
"Filthy Cur","Final Fortune","Final Judgment","Final Punishment","Fire // Ice","Fire Diamond","Fire Elemental","Fireball","Fireblast","Firebolt",
"Firebrand Ranger","Firebreathing","Firecat Blitz","Firemane Angel","Fires of Yavimaya","Firescreamer","Fireshrieker","Fireslinger","First Come, First Served","First Volley",
"Fishliver Oil","Fist of Suns","Fists of Ironwood","Fists of the Anvil","Flaccify","Flailing Manticore","Flailing Ogre","Flailing Soldier","Flame Burst","Flame Fusillade",
"Flame Jet","Flame Rift","Flame Wave","Flame-Kin War Scout","Flame-Kin Zealot","Flamebreak","Flames of the Blood Hand","Flameshot","Flamestick Courier","Flametongue Kavu",
"Flamewave Invoker","Flaming Gambit","Flaming Sword","Flaring Flame-Kin","Flaring Pain","Flash Conscription","Flash Counter","Flash Foliage","Flash of Defiance","Flash of Insight",
"Flashfires","Flashfreeze","Flayed Nim","Fledgling Dragon","Fledgling Imp","Fledgling Osprey","Fleetfoot Panther","Fleeting Aven","Fleeting Image","Fleshgrafter",
"Flickerform","Fling","Flint Golem","Floating Shield","Floating-Dream Zubera","Floodbringer","Flooded Strand","Flow of Ideas","Flowering Field","Flowstone Armor",
"Flowstone Charger","Flowstone Crusher","Flowstone Overseer","Flowstone Slide","Flowstone Strike","Flowstone Surge","Flowstone Thopter","Flowstone Wall","Flying Carpet","Fodder Cannon",
"Fog of Gnats","Fog Patch","Foil","Fold into AEther","Folk Medicine","Followed Footsteps","Food Chain","Foot Soldiers","Foothill Guide","Footsteps of the Goryo",
"Foratog","Forbidden Orchard","Forbidding Watchtower","Force Bubble","Force of Nature","Force Spike","Forced March","Forcemage Advocate","Forge Armor","Forgotten Ancient",
"Forgotten Cave","Forgotten Harvest","Forked-Branch Garami","Form of the Dragon","Form of the Squirrel","Forsaken City","Foster","Foul Imp","Foul Presence","Fountain of Cho",
"Fountain Watch","Fraction Jackson","Fractured Loyalty","Framed!","Frankie Peanuts","Frantic Purification","Frantic Search","Frazzled Editor","Freed from the Real","Freewind Equenaut",
"Frenetic Ogre","Frenetic Raptor","Frenzied Goblin","Frenzied Tilling","Fresh Volunteers","Frightcrawler","Frightshroud Courier","Frogmite","Frontline Strategist","Frost Marsh",
"Frost Ogre","Frost Raptor","Frostling","Frostweb Spider","Frostwielder","Fugitive Wizard","Fugue","Fumiko the Lowblood","Funeral Pyre","Fungal Shambler",
"Fungusaur","Furious Assault","Furnace Dragon","Furnace of Rath","Furnace Whelp","Fury of the Horde","Future Sight","Fyndhorn Elder","Gaea's Balance","Gaea's Blessing",
"Gaea's Cradle","Gaea's Herald","Gaea's Might","Gaea's Skyfolk","Gainsay","Gale Force","Galina's Knight","Gallantry","Galvanic Arc","Galvanic Key",
"Game Preserve","Gamekeeper","Gang of Elk","Gangrenous Goliath","Garza Zol, Plague Queen","Garza's Assassin","Gate Hound","Gate to the AEther","Gather Courage","Gatherer of Graces",
"Gaze of Adamaro","Gaze of the Gorgon","Gelectrode","Gelid Shackles","Gemini Engine","Gempalm Avenger","Gempalm Incinerator","Gempalm Polluter","Gempalm Sorcerer","Gempalm Strider",
"Gemstone Array","Gemstone Mine","General's Kabuto","General's Regalia","Genesis Chamber","Genju of the Cedars","Genju of the Falls","Genju of the Fens","Genju of the Fields","Genju of the Realm",
"Genju of the Spires","Geothermal Crevice","Gerrard Capashen","Gerrard's Command","Gerrard's Irregulars","Gerrard's Verdict","Gerrard's Wisdom","Geth's Grimoire","Ghastly Demise","Ghastly Remains",
"Ghitu Encampment","Ghitu Fire-Eater","Ghitu Slinger","Ghitu War Cry","Ghor-Clan Bloodscale","Ghor-Clan Savage","Ghost Council of Orzhova","Ghost Quarter","Ghost Warden","Ghost-Lit Nourisher",
"Ghost-Lit Raider","Ghost-Lit Redeemer","Ghost-Lit Stalker","Ghost-Lit Warder","Ghosthelm Courier","Ghostly Prison","Ghostly Wings","Ghosts of the Innocent","Ghostway","Ghoul's Feast",
"Giant Badger","Giant Caterpillar","Giant Cockroach","Giant Growth","Giant Octopus","Giant Solifuge","Giant Spider","Giant Warthog","Gibbering Kami","Gift of Estates",
"Gifts Ungiven","Gigadrowse","Gigapede","Gilded Light","Gilded Lotus","Glacial Plating","Glacial Ray","Glacial Wall","Glade Gnarr","Glare of Subdual",
"Glarecaster","Glass Golem","Gleancrawler","Gleemax","Glimmering Angel","Glimmervoid","Glimpse of Nature","Glimpse the Unthinkable","Glint-Eye Nephilim","Glintwing Invoker",
"Glissa Sunseeker","Glitterfang","Glittering Lion","Glittering Lynx","Global Ruin","Gloomdrifter","Glorious Anthem","Glory Seeker","Glowering Rogon","Glowing Anemone",
"Glowrider","Gluetius Maximus","Gluttonous Zombie","Gnarled Mass","Gnat Alley Creeper","Gnat Miser","Gobhobbler Rats","Goblin Archaeologist","Goblin Assassin","Goblin Balloon Brigade",
"Goblin Berserker","Goblin Bombardment","Goblin Brawler","Goblin Brigand","Goblin Burrows","Goblin Cannon","Goblin Charbelcher","Goblin Chariot","Goblin Clearcutter","Goblin Cohort",
"Goblin Digging Team","Goblin Dirigible","Goblin Dynamo","Goblin Elite Infantry","Goblin Festival","Goblin Fire Fiend","Goblin Firebug","Goblin Flectomancer","Goblin Furrier","Goblin Game",
"Goblin Gardener","Goblin Glider","Goblin Goon","Goblin Grappler","Goblin King","Goblin Legionnaire","Goblin Lookout","Goblin Machinist","Goblin Marshal","Goblin Masons",
"Goblin Matron","Goblin Medics","Goblin Mime","Goblin Mountaineer","Goblin Piker","Goblin Piledriver","Goblin Psychopath","Goblin Pyromancer","Goblin Raider","Goblin Replica",
"Goblin Rimerunner","Goblin Ringleader","Goblin S.W.A.T. Team","Goblin Secret Agent","Goblin Sharpshooter","Goblin Sky Raider","Goblin Sledder","Goblin Spelunkers","Goblin Spy","Goblin Striker",
"Goblin Taskmaster","Goblin Trenches","Goblin Turncoat","Goblin War Drums","Goblin War Strike","Goblin War Wagon","Goblin Warchief","Goblin Welder","Godless Shrine","Godo's Irregulars",
"Godo, Bandit Warlord","Gods' Eye, Gate to the Reikai","Goham Djinn","Gold Myr","Golden Wish","Golem-Skin Gauntlets","Golgari Brownscale","Golgari Germination","Golgari Grave-Troll","Golgari Guildmage",
"Golgari Rot Farm","Golgari Rotwurm","Golgari Signet","Golgari Thug","Goliath Beetle","Goliath Spider","Goretusk Firebeast","Gorilla Chieftain","Gorilla Titan","Goryo's Vengeance",
"Govern the Guildless","Grab the Reins","Graceful Adept","Graceful Antelope","Grafted Skullcap","Grafted Wargear","Grand Arbiter Augustin IV","Grand Coliseum","Grand Melee","Granite Grip",
"Granite Shard","Granny's Payback","Granulate","Graphic Violence","Grassland Crusader","Gratuitous Violence","Grave Consequences","Grave Defiler","Grave Pact","Grave-Shell Scarab",
"Graveborn Muse","Gravedigger","Gravegouger","Gravel Slinger","Graven Dominator","Gravespawn Sovereign","Gravestorm","Graxiplon","Grayscaled Gharial","Great Furnace",
"Greater Forgeling","Greater Good","Greater Harvester","Greater Morphling","Greater Mossdog","Greater Stone Spirit","Greed","Greel, Mind Raker","Grid Monitor","Grifter's Blade",
"Grim Harvest","Grim Lavamancer","Grim Monolith","Grim Reminder","Grimclaw Bats","Grinding Station","Grinning Demon","Grip of Amnesia","Grip of Chaos","Gristle Grinner",
"Gristleback","Grizzly Bears","Grizzly Fate","Groffskithur","Grotesque Hybrid","Ground Seal","Groundskeeper","Grozoth","Gruul Guildmage","Gruul Nodorog",
"Gruul Scrapper","Gruul Signet","Gruul Turf","Gruul War Plow","Guard Dogs","Guardian Idol","Guardian of Solitude","Guardian of the Guildpact","Guardian of Vitu-Ghazi","Guardian's Magemark",
"Guerrilla Tactics","Guided Passage","Guided Strike","Guiltfeeder","Guilty Conscience","Gulf Squid","Gurzigost","Gush","Gustcloak Harrier","Gustcloak Runner",
"Gustcloak Savior","Gustcloak Sentinel","Gustcloak Skirmisher","Gutless Ghoul","Gutwrencher Oni","Haakon, Stromgald Scourge","Haazda Exonerator","Haazda Shield Mate","Hail of Arrows","Hair-Strung Koto",
"Halam Djinn","Halberdier","Halcyon Glaze","Hall of the Bandit Lord","Hallowed Fountain","Hallowed Healer","Hammer Mage","Hammer of Bogardan","Hammerfist Giant","Hana Kami",
"Hanabi Blast","Hand of Cruelty","Hand of Honor","Hankyu","Hanna, Ship's Navigator","Hapless Researcher","Harbinger of Spring","Harmonic Convergence","Harrier Griffin","Harrow",
"Harsh Deceiver","Harsh Judgment","Harsh Mercy","Haru-Onna","Harvest Mage","Harvester Druid","Hatching Plans","Hate Weaver","Haunted Angel","Haunted Cadaver",
"Haunted Crossroads","Haunting Echoes","Havoc Demon","Hazy Homunculus","He Who Hungers","Head Games","Head to Head","Headhunter","Healer's Headdress","Healing Salve",
"Heart of Light","Heart of Ramos","Heart Warden","Heartbeat of Spring","Hearth Kami","Heartless Hidetsugu","Heartseeker","Heartwood Shard","Heed the Mists","Heedless One",
"Heidar, Rimewind Master","Heightened Awareness","Helionaut","Heliophial","Helium Squirter","Hell's Caretaker","Hell-Bent Raider","Helldozer","Hellhole Rats","Helm of Kaldra",
"Hematite Golem","Henge Guardian","Henge of Ramos","Herald of Leshrac","Hermit Druid","Hero's Demise","Heroes' Reunion","Heroic Defiance","Hibernation's End","Hickory Woodlot",
"Hidden Gibbons","Hide // Seek","Hideous Laughter","Hidetsugu's Second Rite","High Market","High Seas","Highland Weald","Highway Robber","Higure, the Still Wind","Hikari, Twilight Guardian",
"Hill Giant","Hindering Touch","Hint of Insanity","Hired Giant","Hired Muscle","Hisoka's Defiance","Hisoka's Guard","Hisoka, Minamo Sensei","Hissing Miasma","Hit // Run",
"Hobble","Hokori, Dust Drinker","Hold the Line","Holistic Wisdom","Hollow Dogs","Hollow Specter","Hollow Warrior","Holy Day","Homura, Human Ascendant","Honden of Cleansing Fire",
"Honden of Infinite Rage","Honden of Life's Web","Honden of Night's Reach","Honden of Seeing Winds","Honor Guard","Honor the Fallen","Honor-Worn Shaku","Honorable Scout","Hooded Kavu","Hoodwink",
"Hope and Glory","Horizon Seed","Horn of Plenty","Horn of Ramos","Horned Cheetah","Horned Helm","Horned Kavu","Horned Troll","Horned Turtle","Horobi's Whisper",
"Horobi, Death's Wail","Horror of Horrors","Hour of Reckoning","Hoverguard Observer","Hoverguard Sweepers","Howl from Beyond","Howling Gale","Howling Mine","Howling Wolf","Hulking Cyclops",
"Hulking Ogre","Hull Breach","Hum of the Radix","Humble Budoka","Hundred-Talon Kami","Hundred-Talon Strike","Hundroog","Hunger of the Nim","Hunted Dragon","Hunted Horror",
"Hunted Lammasu","Hunted Phantasm","Hunted Troll","Hunted Wumpus","Hunter Sliver","Hunting Drake","Hunting Grounds","Hunting Kavu","Hunting Moa","Hurricane",
"Hydromorph Guardian","Hydromorph Gull","Hypervolt Grasp","Hypnotic Cloud","Hypnotic Specter","Hypnox","Hypochondria","Ice Cave","Icefall","Ichorid",
"Icy Manipulator","Ideas Unbound","Ignoble Soldier","Ignorant Bliss","Iizuka the Ruthless","Illuminated Wings","Illusion // Reality","Imagecrafter","Imaginary Pet","Immobilizing Ink",
"Impatience","Impending Disaster","Imperial Hellkite","Implode","Improvised Armor","Impulsive Maneuvers","In the Web of War","Iname as One","Iname, Death Aspect","Iname, Life Aspect",
"Incendiary","Incinerate","Incite Hysteria","Incite War","Indebted Samurai","Indentured Djinn","Indentured Oaf","Index","Indomitable Will","Indrik Stomphowler",
"Induce Paranoia","Inertia Bubble","Infected Vermin","Infectious Host","Infectious Rage","Infernal Caretaker","Infernal Contract","Infernal Genesis","Infernal Kirin","Infernal Spawn of Infernal Spawn of Evil",
"Infernal Tutor","Inferno","Infested Roothold","Infiltrate","Infiltrator's Magemark","Inflame","Information Dealer","Infused Arrows","Initiate of Blood","Ink-Eyes, Servant of Oni",
"Ink-Treader Nephilim","Inner Calm, Outer Strength","Inner Fire","Inner-Chamber Guard","Innocence Kami","Innocent Blood","Insidious Dreams","Insist","Insolence","Inspiration",
"Inspirit","Instigator","Instill Furor","Insurrection","Intervene","Intimidation","Into the Fray","Into the North","Into Thin Air","Intrepid Hero",
"Intruder Alarm","Invigorate","Invigorating Boon","Invigorating Falls","Inviolability","Invoke the Firemind","Ion Storm","Ire of Kaminari","Iridescent Angel","Iridescent Drake",
"Iron Lance","Iron Maiden","Iron Myr","Iron Star","Iron Will","Iron-Barb Hellion","Ironfist Crusher","Ironshell Beetle","Irradiate","Irrigation Ditch",
"Isamaru, Hound of Konda","Isao, Enlightened Bushi","Ishi-Ishi, Akki Crackshot","Isochron Scepter","Isperia the Inscrutable","Ivory Crane Netsuke","Ivory Cup","Ivory Mask","Ivy Dancer","Ivy Elemental",
"Ivy Seer","Iwamori of the Open Fist","Ixidor's Will","Ixidor, Reality Sculptor","Izzet Boilerworks","Izzet Chronarch","Izzet Guildmage","Izzet Signet","Jackal Pup","Jade Idol",
"Jade Leech","Jade Statue","Jaded Response","Jagged Poppet","Jalum Tome","Jandor's Saddlebags","Jareth, Leonine Titan","Jasmine Seer","Jayemdae Tome","Jeska, Warrior Adept",
"Jester's Cap","Jester's Scepter","Jetting Glasskite","Jeweled Spirit","Jeweled Torque","Jhoira's Toolbox","Jhovall Queen","Jhovall Rider","Jilt","Jinxed Choker",
"Jiwari, the Earth Aflame","Johnny, Combo Player","Joiner Adept","Jokulmorder","Jolrael's Favor","Jolrael, Empress of Beasts","Jolting Merfolk","Jotun Grunt","Jotun Owl Keeper","Journey of Discovery",
"Journeyer's Kite","Joyous Respite","Jugan, the Rising Star","Jukai Messenger","Jungle Barrier","Juniper Order Ranger","Junk Diver","Junk Golem","Junktroller","Junkyo Bell",
"Juntu Stakes","Jushi Apprentice","Kaboom!","Kabuto Moth","Kagemaro's Clutch","Kagemaro, First to Suffer","Kaho, Minamo Historian","Kaijin of the Vanishing Touch","Kamahl's Desire","Kamahl's Sledge",
"Kamahl's Summons","Kamahl, Fist of Krosa","Kamahl, Pit Fighter","Kami of Ancient Law","Kami of Empty Graves","Kami of False Hope","Kami of Fire's Roar","Kami of Lunacy","Kami of Old Stone","Kami of Tattered Shoji",
"Kami of the Crescent Moon","Kami of the Honored Dead","Kami of the Hunt","Kami of the Painted Road","Kami of the Palace Fields","Kami of the Tended Garden","Kami of the Waning Moon","Kami of Twisted Reflection","Kangee, Aerie Keeper","Karma",
"Karmic Guide","Karmic Justice","Karn's Touch","Karn, Silver Golem","Karona's Zealot","Karona, False God","Karplusan Forest","Karplusan Minotaur","Karplusan Strider","Karplusan Wolverine",
"Karplusan Yeti","Karstoderm","Kashi-Tribe Elite","Kashi-Tribe Reaver","Kashi-Tribe Warriors","Kataki, War's Wage","Kavu Aggressor","Kavu Chameleon","Kavu Climber","Kavu Glider",
"Kavu Howler","Kavu Lair","Kavu Mauler","Kavu Monarch","Kavu Recluse","Kavu Runner","Kavu Scout","Kavu Titan","Keeneye Aven","Keening Banshee",
"Keep Watch","Keeper of the Nine Gales","Keeper of the Sacred Word","Keiga, the Tide Star","Keldon Arsonist","Keldon Battlewagon","Keldon Berserker","Keldon Champion","Keldon Firebombers","Keldon Mantle",
"Keldon Necropolis","Keldon Twilight","Keldon Vandals","Kemuri-Onna","Kentaro, the Smiling Cat","Kiki-Jiki, Mirror Breaker","Kiku's Shadow","Kiku, Night's Flower","Kill Switch","Kill! Destroy!",
"Kill-Suit Cultist","Killer Instinct","Kilnmouth Dragon","Kindle the Carnage","King Cheetah","King Crab","Kingfisher","Kira, Great Glass-Spinner","Kird Ape","Kiri-Onna",
"Kirtar's Desire","Kirtar's Wrath","Kitsune Blademaster","Kitsune Bonesetter","Kitsune Dawnblade","Kitsune Diviner","Kitsune Healer","Kitsune Loreweaver","Kitsune Mystic","Kitsune Palliator",
"Kitsune Riftwalker","Kiyomaro, First to Stand","Kjeldoran Gargoyle","Kjeldoran Javelineer","Kjeldoran Outrider","Kjeldoran Royal Guard","Knighthood","Kodama of the Center Tree","Kodama of the North Tree","Kodama of the South Tree",
"Kodama's Might","Kodama's Reach","Kokusho, the Evening Star","Konda's Banner","Konda's Hatamoto","Konda, Lord of Eiganjo","Kor Haven","Kraken's Eye","Krark's Thumb","Krark-Clan Engineers",
"Krark-Clan Grunt","Krark-Clan Ironworks","Krark-Clan Ogre","Krark-Clan Shaman","Krark-Clan Stoker","Kris Mage","Krosan Archer","Krosan Avenger","Krosan Beast","Krosan Cloudscraper",
"Krosan Colossus","Krosan Constrictor","Krosan Drover","Krosan Groundshaker","Krosan Reclamation","Krosan Restorer","Krosan Tusker","Krosan Verge","Krosan Vorine","Krosan Warchief",
"Krosan Wayfarer","Krovikan Rot","Krovikan Whispers","Kumano's Blessing","Kumano's Pupils","Kumano, Master Yamabushi","Kuon, Ogre Ascendant","Kurgadon","Kuro's Taken","Kuro, Pitlord",
"Kusari-Gama","Kyoki, Sanity's Eclipse","Kyren Archive","Kyren Glider","Kyren Legate","Kyren Negotiations","Kyren Sniper","Kyren Toy","Laccolith Grunt","Laccolith Rig",
"Laccolith Titan","Laccolith Warrior","Laccolith Whelp","Ladies' Knight","Land Aid '04","Land Grant","Landslide","Lantern Kami","Lantern of Insight","Lantern-Lit Graveyard",
"Laquatus's Champion","Laquatus's Creativity","Laquatus's Disdain","Larceny","Lashknife Barrier","Last Breath","Last Caress","Last Gasp","Last Laugh","Last Rites",
"Last Stand","Last Word","Last-Ditch Effort","Latulla's Orders","Latulla, Keldon Overseer","Laughing Hyena","Lava Axe","Lava Blister","Lava Dart","Lava Hounds",
"Lava Runner","Lava Spike","Lava Zombie","Lavaborn Muse","Lavamancer's Skill","Lawbringer","Lay of the Land","Lay Waste","Lead Astray","Leaden Myr",
"Leaf Dancer","Leafdrake Roost","Leap of Flame","Leashling","Leave No Trace","Leery Fogbeast","Legacy Weapon","Leonin Abunas","Leonin Battlemage","Leonin Bladetrap",
"Leonin Bola","Leonin Den-Guard","Leonin Elder","Leonin Scimitar","Leonin Shikari","Leonin Skyhunter","Leonin Squire","Leonin Sun Standard","Leshrac's Rite","Lesser Gargadon",
"Lethal Vapors","Letter Bomb","Leveler","Levitation","Ley Druid","Ley Line","Leyline of Lifeforce","Leyline of Lightning","Leyline of Singularity","Leyline of the Meek",
"Leyline of the Void","Lhurgoyf","Liability","Liar's Pendulum","Liberated Dwarf","Lich's Tomb","Liege of the Axe","Lieutenant Kirtar","Life // Death","Life Burst",
"Life from the Loam","Lifegift","Lifespark Spellbomb","Lifespinner","Lifted by Clouds","Light of Sanction","Lightbringer","Lightning Angel","Lightning Blast","Lightning Bolt",
"Lightning Coils","Lightning Dart","Lightning Dragon","Lightning Elemental","Lightning Greaves","Lightning Helix","Lightning Hounds","Lightning Rift","Lightning Serpent","Lightning Storm",
"Lightning Surge","Limestone Golem","Lin Sivvi, Defiant Hero","Lingering Death","Lionheart Maverick","Liquid Fire","Liquify","Lithatog","Lithophage","Little Girl",
"Living Airship","Living Death","Living Hive","Living Terrain","Living Wish","Llanowar Behemoth","Llanowar Cavalry","Llanowar Dead","Llanowar Elite","Llanowar Elves",
"Llanowar Knight","Llanowar Vanguard","Llanowar Wastes","Llawan, Cephalid Empress","Loafing Giant","Loam Dweller","Loaming Shaman","Lobotomy","Locust Miser","Lodestone Myr",
"Lone Wolf","Lonely Sandbar","Long-Forgotten Gohei","Long-Term Plans","Longbow Archer","Longhorn Firebeast","Look at Me, I'm R&D","Looming Hoverguard","Looming Shade","Loose Lips",
"Lord of Atlantis","Lord of the Undead","Lore Broker","Lose Hope","Lost in Thought","Lotus Guardian","Lovisa Coldeyes","Lowland Tracker","Loxodon Anchorite","Loxodon Gatekeeper",
"Loxodon Hierarch","Loxodon Mender","Loxodon Mystic","Loxodon Peacekeeper","Loxodon Punisher","Loxodon Stalwart","Loxodon Warhammer","Lumbering Satyr","Lumengrid Augur","Lumengrid Sentinel",
"Luminesce","Luminous Angel","Luminous Guardian","Lunar Avenger","Lure","Lurking Informant","Lurking Jackals","Lurking Skirge","Lyzolda, the Blood Witch","Macabre Waltz",
"Macetail Hystrodon","Machinate","Mad Dog","Maga, Traitor to Mortals","Mage's Guile","Mages' Contest","Mageta The Lion","Mageta's Boon","Magewright's Stone","Maggot Carrier",
"Maggot Therapy","Magical Hacker","Magistrate's Scepter","Magistrate's Veto","Magma Burst","Magma Giant","Magma Jet","Magma Sliver","Magma Vein","Magmatic Core",
"Magnetic Flux","Magnetic Theft","Magnify","Magnigoth Treefolk","Magnivore","Mahamoti Djinn","Major Teroh","Malachite Golem","Malevolent Awakening","Malicious Advice",
"Man of Measure","Man-o'-War","Mana Breach","Mana Cache","Mana Clash","Mana Cylix","Mana Echoes","Mana Flair","Mana Geyser","Mana Leak",
"Mana Maze","Mana Screw","Mana Seism","Mana Short","Mana Vapors","Manacles of Decay","Maniacal Rage","Manipulate Fate","Mannichi, the Fevered Dream","Manriki-Gusari",
"Mantis Engine","Marauding Knight","Marble Diamond","Marble Titan","March of Souls","March of the Machines","Mark of Eviction","Mark of Fury","Mark of Sakiko","Mark of the Oni",
"Marker Beetles","Marrow-Gnawer","Marsh Boa","Marsh Crocodile","Martyr of Ashes","Martyr of Sands","Martyr of Spores","Martyr's Cause","Martyred Rusalka","Martyrs' Tomb",
"Masako the Humorless","Mask of Intolerance","Mask of Law and Grace","Mask of Memory","Masked Gorgon","Mass Hysteria","Massacre","Master Apothecary","Master Decoy","Master Healer",
"Master of the Veil","Master Warcraft","Masumaro, First to Live","Matsu-Tribe Birdstalker","Matsu-Tribe Decoy","Matsu-Tribe Sniper","Mausoleum Turnkey","Mawcor","Measure of Wickedness","Meddle",
"Meddling Kids","Meddling Mage","Meekstone","Megatherium","Megatog","Megrim","Meishin, the Mind Cage","Meloku the Clouded Mirror","Memnarch","Memory Jar",
"Memory Lapse","Menacing Ogre","Mending Hands","Mental Discipline","Mental Note","Mephidross Vampire","Mephitic Ooze","Mercadia's Downfall","Mercadian Atlas","Mercadian Bazaar",
"Mercadian Lift","Mercenary Informer","Merchant of Secrets","Merchant Scroll","Mercurial Kite","Merfolk Looter","Merfolk of the Pearl Trident","Mesmeric Fiend","Mesmeric Orb","Metal Fatigue",
"Metalworker","Metamorphic Wurm","Metamorphose","Metathran Aerostat","Metathran Elite","Metathran Soldier","Metathran Transport","Metathran Zombie","Meteor Crater","Meteor Storm",
"Michiko Konda, Truth Seeker","Midnight Covenant","Midnight Ritual","Might of Oaks","Might of the Nephilim","Might Weaver","Mikokoro, Center of the Sea","Militant Monk","Millikin","Millstone",
"Mimeofacture","Minamo Scrollkeeper","Minamo Sightbender","Minamo's Meddling","Minamo, School at Water's Edge","Mind Bend","Mind Burst","Mind Extraction","Mind Rot","Mind Slash",
"Mind Sludge","Mind Swords","Mind Warp","Mind's Desire","Mind's Eye","Mindblaze","Mindleech Mass","Mindmoil","Mindslaver","Mindslicer",
"Mindstorm Crown","Mine Bearer","Mine Layer","Minister of Impediments","Minotaur Explorer","Minotaur Illusionist","Minotaur Tactician","Mirari's Wake","Mire Kavu","Miren, the Moaning Well",
"Mirrodin's Core","Mirror Gallery","Mirror Golem","Mirror Strike","Mirror Wall","Mirrorwood Treefolk","Miscalculation","Mischievous Quanar","Misdirection","Misery Charm",
"Misguided Rage","Mishra's Bauble","Mishra's Factory","Misshapen Fiend","Misstep","Mist of Stagnation","Mistblade Shinobi","Mistform Dreamer","Mistform Mask","Mistform Mutant",
"Mistform Seaswift","Mistform Shrieker","Mistform Skyreaver","Mistform Sliver","Mistform Stalker","Mistform Ultimus","Mistform Wakecaster","Mistform Wall","Mistform Warchief","Mistral Charger",
"Mizzium Transreliquat","Mnemonic Nexus","Mobilization","Mogg Alarm","Mogg Fanatic","Mogg Jailer","Mogg Salvage","Mogg Sentry","Mogg Toady","Moggcatcher",
"Molder Slug","Moldervine Cloak","Molimo, Maro-Sorcerer","Molten Hydra","Molten Influence","Molten Rain","Molten Sentry","Molting Harpy","Molting Skin","Moment of Silence",
"Moment's Peace","Momentum","Momir Vig, Simic Visionary","Moniker Mage","Monkey Cage","Monkey Monkey Monkey","Mons's Goblin Waiters","Monstrous Growth","Moonbow Illusionist","Moonlight Bargain",
"Moonlit Strider","Moonlit Wake","Moonring Mirror","Moonwing Moth","Morality Shift","Moratorium Stone","Morbid Hunger","Morgue Theft","Morgue Toad","Moriok Rigger",
"Moriok Scavenger","Morningtide","Moroii","Mortal Combat","Mortify","Mortipede","Mortiphobia","Mortivore","Moss Diamond","Moss Kami",
"Moss Monster","Mossdog","Mossfire Egg","Mossfire Valley","Mother of Goons","Mother of Runes","Mothrider Samurai","Mourner's Shield","Mourning Thrull","Mouth of Ronom",
"Mouth to Mouth","Muddle the Mixture","Mudhole","Multani's Acolyte","Multani's Decree","Multani's Harmony","Multani's Presence","Multani, Maro-Sorcerer","Mungha Wurm","Murderous Betrayal",
"Murderous Spoils","Murmurs from Beyond","Muscle Burst","Muscle Sliver","Muse Vessel","Mutilate","Muzzle","My First Tome","Mycosynth Golem","Mycosynth Lattice",
"Myojin of Cleansing Fire","Myojin of Infinite Rage","Myojin of Life's Web","Myojin of Night's Reach","Myojin of Seeing Winds","Myr Adapter","Myr Enforcer","Myr Incubator","Myr Landshaper","Myr Matrix",
"Myr Mindservant","Myr Moonvessel","Myr Prototype","Myr Quadropod","Myr Retriever","Myr Servitor","Mystic Crusader","Mystic Enforcer","Mystic Familiar","Mystic Penitent",
"Mystic Restraints","Mystic Snake","Mystic Visionary","Mystic Zealot","Mythic Proportions","Nagao, Bound by Honor","Nakaya Shade","Name Dropping","Nameless One","Nantuko Blightcutter",
"Nantuko Calmer","Nantuko Cultivator","Nantuko Disciple","Nantuko Elder","Nantuko Husk","Nantuko Mentor","Nantuko Monastery","Nantuko Shade","Nantuko Shrine","Nantuko Tracer",
"Nantuko Vigilante","Narcissism","Natural Affinity","Natural Emergence","Natural Spring","Naturalize","Nature's Resurgence","Nature's Revolt","Nature's Will","Nausea",
"Necra Disciple","Necra Sanctuary","Necravolver","Necro-Impotence","Necrogen Mists","Necrogen Spellbomb","Necrologia","Necromancer's Magemark","Necromantic Thirst","Necroplasm",
"Necropotence","Need for Speed","Needle Storm","Needlebug","Needleshot Gourna","Nefarious Lich","Nefashu","Neko-Te","Nekrataal","Nemata, Grove Guardian",
"Nemesis Mask","Nesting Wurm","Nether Spirit","Netherborn Phalanx","Netter en-Dal","Nettling Curse","Neurok Familiar","Neurok Hoversail","Neurok Prodigy","Neurok Spy",
"Neurok Stealthsuit","Neurok Transmuter","Neverending Torment","New Frontiers","Nezumi Bone-Reader","Nezumi Cutthroat","Nezumi Graverobber","Nezumi Ronin","Nezumi Shadow-Watcher","Nezumi Shortfang",
"Night // Day","Night Dealings","Night of Souls' Betrayal","Night's Whisper","Nightcreep","Nightguard Patrol","Nightmare Lash","Nightscape Apprentice","Nightscape Battlemage","Nightscape Familiar",
"Nightscape Master","Nightshade Seer","Nightsoil Kami","Nightwind Glider","Nihilistic Glee","Nikko-Onna","Nim Abomination","Nim Devourer","Nim Grotesque","Nim Lasher",
"Nim Replica","Nim Shambler","Nim Shrieker","Nimble Mongoose","Nine-Ringed Bo","Ninja of the Deep Hours","Niv-Mizzet, the Firemind","Nivix, Aerie of the Firemind","No Mercy","No-Dachi",
"Noble Panther","Noble Purpose","Noble Stand","Noble Templar","Nocturnal Raid","Nomad Decoy","Nomad Mythmaker","Nomad Stadium","Nomadic Elf","Northern Paladin",
"Norwood Ranger","Nostalgic Dreams","Nosy Goblin","Notorious Assassin","Nourishing Shoal","Nova Cleric","Novijen Sages","Novijen, Heart of Progress","Now I Know My ABC's","Noxious Field",
"Noxious Ghoul","Noxious Vapors","Nuisance Engine","Nullmage Advocate","Nullmage Shepherd","Nullstone Gargoyle","Numai Outcast","Number Crunch","Nut Collector","O-Naginata",
"Oath of Druids","Oathkeeper, Takeno's Daisho","Oathsworn Giant","Oblation","Obliterate","Oblivion Stone","Oboro Breezecaller","Oboro Envoy","Oboro, Palace in the Clouds","Obsessive Search",
"Obsidian Acolyte","Obstinate Familiar","Ocular Halo","Odds // Ends","Off Balance","Ogre Gatecrasher","Ogre Leadfoot","Ogre Marauder","Ogre Recluse","Ogre Savant",
"Ogre Taskmaster","Ohran Viper","Ohran Yeti","Okiba-Gang Shinobi","Okina Nightwatch","Okina, Temple to the Grandfathers","Okk","Old Fogey","Omega Myr","Omnibian",
"One Dozen Eyes","One with Nature","One with Nothing","Oni of Wild Places","Oni Possession","Opal Avenger","Opal Champion","Opal-Eye, Konda's Yojimbo","Opalescence","Opaline Bracers",
"Ophidian","Opportunity","Opposition","Oppression","Oppressive Will","Oracle's Attendants","Oraxid","Orb of Dreams","Orbweaver Kumo","Orcish Artillery",
"Orcish Bloodpainter","Orcish Oriflamme","Orcish Paratroopers","Orcish Spy","Order // Chaos","Order of the Sacred Bell","Order of the Stars","Ordered Migration","Ordruun Commando","Ore Gorger",
"Organ Grinder","Orim's Chant","Orim's Cure","Orim's Thunder","Orim's Touch","Ornate Kanzashi","Ornithopter","Orochi Eggwatcher","Orochi Hatchery","Orochi Leafcaller",
"Orochi Ranger","Orochi Sustainer","Orzhov Basilica","Orzhov Euthanist","Orzhov Guildmage","Orzhov Pontiff","Orzhov Signet","Orzhova, the Church of Deals","Ostiary Thrull","Ostracize",
"Otarian Juggernaut","Otherworldly Journey","Ouphe Vandals","Outbreak","Overabundance","Overblaze","Overburden","Overeager Apprentice","Overgrown Estate","Overgrown Tomb",
"Overgrowth","Overlaid Terrain","Overmaster","Override","Overrule","Overrun","Oversold Cemetery","Overtaker","Overwhelming Instinct","Overwhelming Intellect",
"Oxidda Golem","Oxidize","Oyobi, Who Split the Heavens","Pacifism","Pack Hunt","Pain // Suffering","Pain Kami","Pain Magnification","Pain's Reward","Painbringer",
"Painwracker Oni","Paladin en-Vec","Paladin of Prahv","Pale Moon","Palinchron","Palliation Accord","Panacea","Panglacial Wurm","Pangosaur","Panic Attack",
"Panoptic Mirror","Paradise Mantle","Parallax Dementia","Parallax Inhibitor","Parallax Nexus","Parallax Tide","Parallax Wave","Parallectric Feedback","Parallel Evolution","Parallel Thoughts",
"Parch","Pardic Arsonist","Pardic Collaborator","Pardic Firecat","Pardic Lancer","Pardic Miner","Pardic Swordsmith","Pariah's Shield","Part the Veil","Patagia Golem",
"Patagia Viper","Patchwork Gnomes","Path of Anger's Flame","Patriarch's Bidding","Patriarch's Desire","Patrol Hound","Patron of the Akki","Patron of the Kitsune","Patron of the Moon","Patron of the Nezumi",
"Patron of the Orochi","Patron of the Wild","Patron Wizard","Pattern of Rebirth","Pay No Heed","Peace and Quiet","Peace of Mind","Peach Garden Oath","Pearl Shard","Pearlspear Courier",
"Peat Bog","Pedantic Learning","Peek","Peel from Reality","Peer Pressure","Peer Through Depths","Pegasus Charger","Pemmin's Aura","Pentad Prism","Pentavus",
"Penumbra Bobcat","Penumbra Kavu","Penumbra Wurm","Peregrine Mask","Perilous Forays","Perilous Research","Pernicious Deed","Perplex","Persecute","Persuasion",
"Petalmane Baku","Petals of Insight","Petradon","Petrahydrox","Petravark","Petrified Field","Petrified Wood-Kin","Pewter Golem","Phage the Untouchable","Phantasmal Terrain",
"Phantatog","Phantom Centaur","Phantom Flock","Phantom Nantuko","Phantom Nishoba","Phantom Nomad","Phantom Tiger","Phantom Warrior","Phantom Whelp","Phantom Wings",
"Phobian Phantasm","Phyrexian Altar","Phyrexian Arena","Phyrexian Battleflies","Phyrexian Bloodstock","Phyrexian Broodlings","Phyrexian Colossus","Phyrexian Debaser","Phyrexian Defiler","Phyrexian Delver",
"Phyrexian Denouncer","Phyrexian Driver","Phyrexian Etchings","Phyrexian Gargantua","Phyrexian Hulk","Phyrexian Infiltrator","Phyrexian Ironfoot","Phyrexian Lens","Phyrexian Librarian","Phyrexian Monitor",
"Phyrexian Negator","Phyrexian Plaguelord","Phyrexian Prowler","Phyrexian Rager","Phyrexian Reaper","Phyrexian Reclamation","Phyrexian Scuta","Phyrexian Slayer","Phyrexian Snowcrusher","Phyrexian Soulgorger",
"Phyrexian Tyranny","Pianna, Nomad Captain","Piety Charm","Pilgrim of Justice","Pilgrim of Virtue","Pillage","Pillar of the Paruns","Pillory of the Sleepless","Pincer Spider","Pinecrest Ridge",
"Pinpoint Avalanche","Pious Kitsune","Pious Warrior","Piper's Melody","Pit Raptor","Pit Trap","Pitchstone Wall","Pithing Needle","Plagiarize","Plague Beetle",
"Plague Boiler","Plague Dogs","Plague Fiend","Plague Spitter","Plague Spores","Plague Wind","Plague Witch","Plagued Rusalka","Planar Chaos","Planar Collapse",
"Planar Despair","Planar Guide","Planar Overlay","Planar Portal","Planeswalker's Favor","Planeswalker's Fury","Planeswalker's Mirth","Planeswalker's Mischief","Planeswalker's Scorn","Plasma Elemental",
"Plated Slagwurm","Plated Sliver","Plated Spider","Platinum Angel","Plaxcaster Frogling","Plaxmanta","Pledge of Loyalty","Plow Through Reito","Plow Under","Plumes of Peace",
"Plunge into Darkness","Pointy Finger of Doom","Poisonbelly Ogre","Pollen Remedy","Pollenbright Wings","Polluted Delta","Polymorph","Port Inspector","Possessed Aven","Possessed Barbarian",
"Possessed Centaur","Possessed Nomad","Possessed Portal","Pouncing Jaguar","Pouncing Kavu","Powder Keg","Power Armor","Power Conduit","Power Matrix","Powerstone Minefield",
"Prahv, Spires of Order","Predator's Strike","Predator, Flagship","Predatory Focus","Predict","Presence of the Wise","Pretender's Claim","Price of Glory","Pride of Lions","Pride of the Clouds",
"Priest of Titania","Primal Boost","Primal Frenzy","Primal Growth","Primal Whisperer","Primeval Force","Primeval Light","Primeval Shambler","Primitive Etchings","Primoc Escapee",
"Primordial Sage","Prismatic Strands","Prison Barricade","Pristine Angel","Private Research","Privileged Position","Proclamation of Rebirth","Prodigal Sorcerer","Profane Prayers","Prohibit",
"Promise of Bunrei","Promise of Power","Promised Kannushi","Proper Burial","Prophetic Bolt","Protean Hulk","Protective Sphere","Proteus Machine","Proteus Staff","Prowling Pangolin",
"Psionic Gift","Psychatog","Psychic Battle","Psychic Drain","Psychic Membrane","Psychic Overload","Psychic Possession","Psychic Puppetry","Psychic Spear","Psychic Theft",
"Psychic Trance","Psychogenic Probe","Psychotic Fury","Psychotic Haze","Pteron Ghost","Puffer Extract","Pull Under","Pulsating Illusion","Pulse of Llanowar","Pulse of the Dross",
"Pulse of the Fields","Pulse of the Forge","Pulse of the Grid","Pulse of the Tangle","Pulsemage Advocate","Pulverize","Punctuate","Puppet's Verdict","Puppeteer","Pure // Simple",
"Pure Intentions","Pure Reflection","Purge","Purify","Pus Kami","Putrefaction","Putrefy","Putrid Imp","Putrid Raptor","Putrid Warrior",
"Pygmy Giant","Pygmy Kavu","Pygmy Pyrosaur","Pygmy Razorback","Pyre Zombie","Pyrite Spellbomb","Pyroclasm","Pyromancy","Pyromania","Pyromatics",
"Pyrostatic Pillar","Pyrotechnics","Quagmire Druid","Quagmire Lamprey","Quash","Questing Phelddagrif","Question Elemental?","Quick Sliver","Quickchange","Quicken",
"Quicksand","Quicksilver Amulet","Quicksilver Behemoth","Quicksilver Dagger","Quicksilver Dragon","Quicksilver Elemental","Quicksilver Fountain","Quicksilver Wall","Quiet Purity","Quiet Speculation",
"Quillmane Baku","Quirion Dryad","Quirion Elves","Quirion Explorer","Quirion Ranger","Quirion Sentinel","Quirion Trailblazer","Qumulox","R&D's Secret Lair","Rabble-Rouser",
"Rabid Elephant","Rack and Ruin","Rackling","Radiant Kavu","Radiant's Dragoons","Radiant, Archangel","Radiate","Rag Dealer","Rag Man","Ragamuffyn",
"Rage Weaver","Ragged Veins","Raging Goblin","Raging Kavu","Rain of Blades","Rain of Embers","Rain of Gore","Rain of Rust","Rain of Tears","Rainbow Crow",
"Raise Dead","Raise the Alarm","Raka Disciple","Raka Sanctuary","Rakavolver","Rakdos Augermage","Rakdos Carnarium","Rakdos Guildmage","Rakdos Ickspitter","Rakdos Pit Dragon",
"Rakdos Riteknife","Rakdos Signet","Rakdos the Defiler","Raksha Golden Cub","Rally the Horde","Rally the Righteous","Ramosian Captain","Ramosian Commander","Ramosian Lieutenant","Ramosian Rally",
"Ramosian Sergeant","Ramosian Sky Marshal","Rampant Elephant","Rampant Growth","Rampart Crawler","Rancid Earth","Rancor","Rank and File","Rapid Decay","Rappelling Scouts",
"Ratcatcher","Rath's Edge","Rathi Assassin","Rathi Dragon","Rathi Fiend","Rathi Intimidator","Rats' Feast","Ravaged Highlands","Raven Familiar","Raven Guild Initiate",
"Raven Guild Master","Ravenous Baloth","Ravenous Rats","Raving Oni-Slave","Ray of Distortion","Ray of Revelation","Rayne, Academy Chancellor","Razia's Purification","Razia, Boros Archangel","Razing Snidd",
"Razor Barrier","Razor Golem","Razorfin Hunter","Razorfoot Griffin","Razorgrass Screen","Razorjaw Oni","Razormane Masticore","Razortooth Rats","Reach Through Mists","Read the Runes",
"Reanimate","Reap and Sow","Reaping the Graves","Rebel Informer","Reborn Hero","Rebuild","Rebuking Ceremony","Reciprocate","Reckless Abandon","Reckless Assault",
"Reckless Charge","Reckless Embermage","Reckless One","Reckless Spite","Reclaim","Recoil","Recollect","Recoup","Recover","Recuperate",
"Red-Hot Hottie","Redeem","Reduce to Dreams","Redwood Treefolk","Reef Shaman","Reflexes","Refreshing Rain","Regeneration","Regress","Reito Lantern",
"Reiver Demon","Rejuvenation Chamber","Reki, the History of Kamigawa","Relentless Assault","Relentless Rats","Relic Bane","Relic Barrier","Reliquary Monk","Remand","Reminisce",
"Remodel","Remote Farm","Remove Soul","Rend Flesh","Rend Spirit","Rending Vines","Renewed Faith","Renounce","Repeal","Repel",
"Repentant Vampire","Repercussion","Replenish","Repopulate","Reprisal","Reprocess","Repulse","Reroute","Rescue","Research // Development",
"Reshape","Resilient Wanderer","Resize","Restless Bones","Restless Dreams","Restock","Restrain","Retaliate","Rethink","Retraced Image",
"Retract","Reveille Squad","Revenant Patriarch","Revered Elder","Reverence","Reverent Mantra","Reverent Silence","Reversal of Fortune","Reverse Damage","Reverse the Sands",
"Revive","Reviving Dose","Reviving Vapors","Reward the Faithful","Rewards of Diversity","Reweave","Rewind","Reya Dawnbringer","Rhox","Rhystic Cave",
"Rhystic Circle","Rhystic Deluge","Rhystic Lightning","Rhystic Scrying","Rhystic Shield","Rhystic Study","Rhystic Syphon","Rhystic Tutor","Rib Cage Spider","Ribbon Snake",
"Ribbons of Night","Ribbons of the Reikai","Richard Garfield, Ph.D.","Ridgeline Rager","Ridgetop Raptor","Riftstone Portal","Righteous Aura","Righteous Cause","Righteous Indignation","Righteousness",
"Rime Transfusion","Rimebound Dead","Rimefeather Owl","Rimehorn Aurochs","Rimescale Dragon","Rimewind Cryomancer","Rimewind Taskmage","Ring of Gix","Riot Spikes","Riptide Biologist",
"Riptide Chronologist","Riptide Crab","Riptide Director","Riptide Entrancer","Riptide Laboratory","Riptide Mangler","Riptide Replicator","Riptide Shapeshifter","Riptide Survivor","Rise // Fall",
"Rishadan Airship","Rishadan Brigand","Rishadan Cutpurse","Rishadan Footpad","Rishadan Pawnshop","Rishadan Port","Rising Waters","Risky Move","Rite of Flame","Rite of Passage",
"Rites of Initiation","Rites of Refusal","Rites of Spring","Rith's Attendant","Rith's Charm","Rith's Grove","Rith, the Awakener","Ritual of Restoration","Rivalry","River Bear",
"River Boa","River Kaijin","Rix Maadi, Dungeon Palace","Roar of Jukai","Roar of Reclamation","Roar of the Kha","Roar of the Wurm","Roaring Slagwurm","Robber Fly","Rock Badger",
"Rock Jockey","Rocket-Powered Turbo Slug","Rockshard Elemental","Rod of Ruin","Rod of Spanking","Rofellos's Gift","Rofellos, Llanowar Emissary","Rolling Spoil","Rolling Stones","Ronin Cavekeeper",
"Ronin Cliffrider","Ronin Houndmaster","Ronin Warclub","Ronom Hulk","Ronom Serpent","Ronom Unicorn","Roofstalker Wight","Root Cage","Root Elemental","Root Greevil",
"Root Sliver","Root-Kin Ally","Rootbreaker Wurm","Rooting Kavu","Rootrunner","Rootwalla","Rootwater Commando","Rootwater Thief","Rorix Bladewing","Rotlung Reanimator",
"Rotting Giant","Rouse","Rowen","Royal Assassin","Ruby Leech","Rude Awakening","Ruham Djinn","Rukh Egg","Rule of Law","Rumbling Slum",
"Rummaging Wizard","Run Wild","Rune Snag","Rune-Tail, Kitsune Ascendant","Runeboggle","Rupture","Rush of Knowledge","Rushing River","Rushing-Tide Zubera","Rushwood Dryad",
"Rushwood Elemental","Rushwood Grove","Rushwood Herbalist","Rushwood Legate","Rust Elemental","Rusting Golem","Rustmouth Ogre","Rustspore Ram","Ryusei, the Falling Star","S.N.O.T.",
"Saber Ants","Sabertooth Alley Cat","Sabertooth Nishoba","Sabretooth Tiger","Sachi, Daughter of Seshiro","Sacred Foundry","Sacred Ground","Sacred Nectar","Sacred Prey","Sacred Rites",
"Sadistic Augermage","Sadistic Hypnotist","Sage Aven","Sage of Lat-Nam","Sage Owl","Sailmonger","Sakashima the Impostor","Sakura-Tribe Elder","Sakura-Tribe Scout","Sakura-Tribe Springcaller",
"Salt Marsh","Salvaging Station","Samite Archer","Samite Elder","Samite Healer","Samite Ministration","Samite Pilgrim","Samite Sanctuary","Samurai Enforcers","Samurai of the Pale Curtain",
"Sanctimony","Sanctum Guardian","Sand Squid","Sandskin","Sandsower","Sandstone Deadfall","Sandstone Needle","Sandstone Warrior","Sandstorm Eidolon","Sanguine Praetor",
"Sapphire Leech","Saprazzan Bailiff","Saprazzan Breaker","Saprazzan Cove","Saprazzan Heir","Saprazzan Legate","Saprazzan Raider","Saprazzan Skerry","Saproling Burst","Saproling Cluster",
"Saproling Infestation","Saproling Symbiosis","Sarcatog","Sasaya, Orochi Ascendant","Saute","Savage Beating","Savage Firecat","Savage Gorilla","Savage Offensive","Savage Twister",
"Savannah Lions","Save Life","Savra, Queen of the Golgari","Sawtooth Loon","Sawtooth Thresher","Scab-Clan Mauler","Scale of Chiss-Goria","Scaled Hulk","Scaled Wurm","Scalpelexis",
"Scandalmonger","Scarred Puma","Scathe Zombies","Scatter the Seeds","Scattershot","Scavenged Weaponry","Scavenger Folk","Scavenging Scarab","Scent of Brine","Scent of Cinder",
"Scent of Ivy","Scent of Jasmine","Scent of Nightshade","Schismotivate","Scion of Darkness","Scion of the Wild","Scorched Rusalka","Scorching Lava","Scorching Missile","Scoria Cat",
"Scornful Egotist","Scourge of Numai","Scouting Trek","Scrabbling Claws","Scragnoth","Scrapheap","Screaming Fury","Screaming Seahawk","Screams from Within","Screams of the Damned",
"Screeching Buzzard","Screeching Griffin","Scrivener","Scroll of Origins","Scrounge","Scrying Glass","Scrying Sheets","Sculpting Steel","Scuttling Death","Scythe of the Wretched",
"Sea Monster","Sea Snidd","Sea's Claim","Seafloor Debris","Seahunter","Seal of Cleansing","Seal of Doom","Seal of Fire","Seal of Removal","Seal of Strength",
"Search for Survivors","Searing Flesh","Searing Meditation","Searing Rays","Searing Wind","Seashell Cameo","Seaside Haven","Seasoned Marshal","Seat of the Synod","Secluded Steppe",
"Second Chance","Second Sight","Second Sunrise","Second Thoughts","Secretkeeper","Security Detail","Seed Spark","Seed the Land","Seedborn Muse","Seeds of Strength",
"Seedtime","Seek the Horizon","Seeker of Skybreak","Seer's Vision","Seething Song","Seismic Assault","Seismic Mage","Seismic Spike","Seizan, Perverter of Truth","Seize the Day",
"Seize the Soul","Sek'Kuar, Deathkeeper","Sekki, Seasons' Guide","Selesnya Evangel","Selesnya Guildmage","Selesnya Sagittars","Selesnya Sanctuary","Selesnya Signet","Selfless Exorcist","Sell-Sword Brute",
"Sengir Vampire","Sensei Golden-Tail","Sensei's Divining Top","Serene Sunset","Serpent Skin","Serpent Warrior","Serpentine Basilisk","Serpentine Kavu","Serra Advocate","Serra Angel",
"Serra Avatar","Serra's Blessing","Serra's Embrace","Serum Powder","Serum Tank","Serum Visions","Seshiro the Anointed","Seton's Desire","Seton's Scout","Seton, Krosan Protector",
"Sever Soul","Severed Legion","Sewerdreg","Shade's Breath","Shade's Form","Shadow Lance","Shadow of Doubt","Shadowblood Egg","Shadowblood Ridge","Shadowmage Infiltrator",
"Shaleskin Bruiser","Shaleskin Plower","Shaman's Trance","Shambling Shell","Shambling Swarm","Shanodin Dryads","Shape of the Wiitigo","Shape Stealer","Shard Phoenix","Shared Fate",
"Shared Triumph","Shattered Dreams","Shattering Spree","Shell of the Last Kappa","Sheltering Ancient","Sheltering Prayers","Shepherd of Rot","Shield Dancer","Shield of Duty and Reason","Shield of Kaldra",
"Shielding Plax","Shieldmage Advocate","Shieldmage Elder","Shifting Borders","Shifting Sky","Shifting Sliver","Shifty Doppelganger","Shimatsu the Bloodcloaked","Shimmering Glasskite","Shimmering Mirage",
"Shimmering Wings","Shinen of Fear's Chill","Shinen of Flight's Wings","Shinen of Fury's Fire","Shinen of Life's Roar","Shinen of Stars' Light","Shining Shoal","Shinka Gatekeeper","Shinka, the Bloodsoaked Keep","Shirei, Shizo's Caretaker",
"Shisato, Whispering Hunter","Shivan Dragon","Shivan Emissary","Shivan Harvest","Shivan Oasis","Shivan Phoenix","Shivan Reef","Shivan Wurm","Shivan Zombie","Shizo, Death's Storehouse",
"Shizuko, Caller of Autumn","Shock","Shoe Tree","Shoreline Raider","Shoreline Ranger","Shoving Match","Shower of Coals","Shrapnel Blast","Shred Memory","Shriek of Dread",
"Shrieking Grotesque","Shrieking Mogg","Shriveling Rot","Shrouded Serpent","Shuko","Shunt","Shuriken","Sick and Tired","Sickening Dreams","Sickening Shoal",
"Side to Side","Sideswipe","Siege of Towers","Siege Wurm","Siege-Gang Commander","Sift Through Sands","Sigil of Sleep","Sigil of the New Dawn","Silent Arbiter","Silent Assassin",
"Silent Specter","Silent-Chant Zubera","Silhana Ledgewalker","Silhana Starfletcher","Silk Net","Silkenfist Fighter","Silkenfist Order","Silklash Spider","Silkwing Scout","Silt Crawler",
"Silver Drake","Silver Knight","Silver Myr","Silver Seraph","Silverglade Elemental","Silverglade Pathfinder","Silverstorm Samurai","Silvos, Rogue Elemental","Simian Grunts","Simic Basilisk",
"Simic Growth Chamber","Simic Guildmage","Simic Initiate","Simic Ragworm","Simic Signet","Simic Sky Swallower","Simoon","Simplify","Singe","Sinister Strength",
"Sink into Takenuma","Sins of the Past","Sinstriker's Will","Sire of the Storm","Sisay's Ingenuity","Sisay's Ring","Sisters of Stone Death","Sivvi's Ruse","Sivvi's Valor","Six-y Beast",
"Sizzle","Skarrg, the Rage Pits","Skarrgan Firebird","Skarrgan Pit-Skulk","Skarrgan Skybreaker","Skeletal Scrying","Skeletal Vampire","Skeleton Shard","Skinthinner","Skirk Alarmist",
"Skirk Commando","Skirk Drill Sergeant","Skirk Fire Marshal","Skirk Marauder","Skirk Outrider","Skirk Prospector","Skirk Volcanist","Skittering Horror","Skittering Skirge","Skittish Kavu",
"Skittish Valesk","Skizzik","Skred","Skulking Fugitive","Skull Collector","Skull Fracture","Skull of Orm","Skull of Ramos","Skullcage","Skullclamp",
"Skullmane Baku","Skullmead Cauldron","Skullscorch","Skullsnatcher","Skulltap","Sky Diamond","Sky Hussar","Sky Swallower","Sky Weaver","Skycloud Egg",
"Skycloud Expanse","Skyfire Kirin","Skyhunter Cub","Skyhunter Patrol","Skyhunter Prowler","Skyhunter Skirmisher","Skyknight Legionnaire","Skyreach Manta","Skyrider Trainee","Skyscribing",
"Skyship Weatherlight","Skyshooter","Skyshroud Behemoth","Skyshroud Blessing","Skyshroud Claim","Skyshroud Cutter","Skyshroud Falcon","Skyshroud Poacher","Skyshroud Ridgeback","Skyshroud Sentinel",
"Skywing Aven","Slagwurm Armor","Slate of Ancestry","Slaughterhouse Bouncer","Sleeper's Guile","Sleeper's Robe","Sleeping Potion","Sleight of Hand","Slice and Dice","Slimy Kavu",
"Slingshot Goblin","Slinking Serpent","Slinking Skirge","Slipstream Eel","Sliptide Serpent","Slith Ascendant","Slith Bloodletter","Slith Firewalker","Slith Predator","Slith Strider",
"Slithering Shade","Slithery Stalker","Sliver Overlord","Slobad, Goblin Tinkerer","Slow Motion","Sluggishness","Slumbering Tora","Smart Ass","Smash","Smogsteed Rider",
"Smokespew Invoker","Smoldering Tar","Smother","Snag","Snake Pit","Snapping Drake","Snapping Thragg","Snarling Undorak","Sneaky Homunculus","Snorting Gahr",
"Snow-Covered Forest","Snow-Covered Island","Snow-Covered Mountain","Snow-Covered Plains","Snow-Covered Swamp","Snuff Out","Soilshaper","Sokenzan Bruiser","Sokenzan Renegade","Sokenzan Spellblade",
"Sol Ring","Solar Blast","Solar Tide","Solarion","Soldier Replica","Solemn Simulacrum","Solidarity","Solitary Confinement","Soltari Priest","Somber Hoverguard",
"Sonic Seizure","Sootfeather Flock","Soothing Balm","Soothsaying","Soramaro, First to Dream","Soratami Cloud Chariot","Soratami Cloudskater","Soratami Mindsweeper","Soratami Mirror-Guard","Soratami Mirror-Mage",
"Soratami Rainshaper","Soratami Savant","Soratami Seer","Sosuke's Summons","Sosuke, Son of Seshiro","Soul Burn","Soul Charmer","Soul Collector","Soul Feast","Soul Foundry",
"Soul Link","Soul Net","Soul Nova","Soul of Magma","Soul Scourge","Soul Spike","Soul Strings","Soul Warden","Soulblast","Soulcatchers' Aerie",
"Soulgorger Orgg","Soulless One","Soulless Revival","Souls of the Faultless","Soulscour","Soulsworn Jury","Southern Paladin","Sowing Salt","Spark Elemental","Spark Mage",
"Spark Spray","Sparkcaster","Sparkmage Apprentice","Sparksmith","Sparring Collar","Sparring Golem","Spawnbroker","Spawning Pit","Spawning Pool","Specter's Shroud",
"Specter's Wail","Spectral Lynx","Spectral Searchlight","Spectral Shift","Spectral Sliver","Spell Counter","Spell Snare","Spellbane Centaur","Spellbinder","Spellbook",
"Spellgorger Barbarian","Spelljack","Spelltithe Enforcer","Spellweaver Helix","Sphere of Duty","Sphere of Grace","Sphere of Law","Sphere of Purity","Sphere of Reason","Sphere of Truth",
"Spidersilk Armor","Spike Feeder","Spikeshot Goblin","Spiketail Drake","Spiketail Hatchling","Spinal Embrace","Spinal Parasite","Spincrusher","Spined Basher","Spined Wurm",
"Spineless Thug","Spiraling Embers","Spire Golem","Spirit Cairn","Spirit Flare","Spirit Link","Spirit of Resistance","Spirit Weaver","Spiritmonger","Spiritual Asylum",
"Spiritual Focus","Spiritual Visit","Spiritualize","Spite // Malice","Spiteful Bully","Spitfire Handler","Spitting Earth","Spitting Gourna","Spitting Spider","Splinter",
"Split-Tail Miko","Spoils of the Vault","Spontaneous Generation","Spore Frog","Sporeback Troll","Spreading Algae","Spreading Plague","Springing Tiger","Sprouting Phytohydra","Sprouting Vines",
"Spurnmage Advocate","Spurred Wolverine","Spy Network","Squallmonger","Squealing Devil","Squee's Embrace","Squee's Revenge","Squee, Goblin Nabob","Squeeze","Squelch",
"Squirming Mass","Squirrel Mob","Squirrel Nest","Squirrel Wrangler","Stabilizer","Staff of Domination","Stag Beetle","Stalking Assassin","Stalking Bloodsucker","Stalking Stones",
"Stalking Yeti","Stamina","Stampede Driver","Stampeding Serow","Stand // Deliver","Stand Firm","Stand or Fall","Stand Together","Standard Bearer","Standardize",
"Standing Army","Standing Troops","Standstill","Star Compass","Starlight Invoker","Starlit Sanctum","Starstorm","Starved Rusalka","Stasis Cell","Stasis Cocoon",
"Statecraft","Static Orb","Staunch Defenders","Staying Power","Steadfast Guard","Steal Artifact","Steal Strength","Steam Spitter","Steam Vents","Steam Vines",
"Steamclaw","Steamcore Weird","Steel Leaf Paladin","Steel Wall","Steeling Stance","Steelshaper Apprentice","Steelshaper's Gift","Steely Resolve","Sterling Grove","Stern Judge",
"Stifle","Still Life","Stinging Barrier","Stinkweed Imp","Stir the Grave","Stir the Pride","Stitch in Time","Stitch Together","Stoic Champion","Stoic Ephemera",
"Stomp and Howl","Stomping Ground","Stone Kavu","Stone Rain","Stone-Cold Basilisk","Stone-Seeder Hierophant","Stone-Tongue Basilisk","Stoneshaker Shaman","Stonewood Invoker","Stop That",
"Storage Matrix","Storm Cauldron","Storm Crow","Storm Herd","Storm Shaman","Stormscale Anarch","Stormscape Apprentice","Stormscape Battlemage","Stormscape Familiar","Stormscape Master",
"Stormwatch Eagle","Story Circle","Strafe","Strands of Night","Strands of Undeath","Strange Inversion","Stratadon","Stratozeppelid","Stream of Consciousness","Stream of Life",
"Street Savvy","Streetbreaker Wurm","Strength of Cedars","Strength of Isolation","Strength of Lunacy","Strength of Night","Strength of Unity","Stroke of Genius","Stromgald Crusader","Strongarm Tactics",
"Strongarm Thug","Stronghold Assassin","Stronghold Biologist","Stronghold Discipline","Stronghold Gambit","Stronghold Machinist","Stronghold Zeppelin","Struggle for Sanity","Student of Elements","Stun",
"Stupefying Touch","Stupor","Submerge","Subterranean Hangar","Subversion","Sudden Impact","Sudden Strength","Suffocating Blast","Sulam Djinn","Sulfur Vent",
"Sulfuric Vortex","Sulfurous Springs","Summer Bloom","Summoner's Egg","Summoning Station","Sun Droplet","Sun's Bounty","Sunbeam Spellbomb","Suncrusher","Sunder from Within",
"Sundering Titan","Sundering Vitae","Sunfire Balm","Sunforger","Sungrass Egg","Sungrass Prairie","Sunhome Enforcer","Sunhome, Fortress of the Legion","Sunken Field","Sunken Hope",
"Sunscape Apprentice","Sunscape Battlemage","Sunscape Familiar","Sunscape Master","Sunscour","Sunstrike Legionnaire","Suntail Hawk","Suntouched Myr","Sunweb","Super Secret Tech",
"Supersize","Supply // Demand","Suppression Field","Supreme Inquisitor","Surestrike Trident","Surge of Zeal","Surging Dementia","Surging Flame","Surprise Deployment","Surveilling Sprite",
"Survivor of the Unseen","Sustainer of the Realm","Sustenance","Sutured Ghoul","Svogthos, the Restless Tomb","Swallowing Plague","Swamp","Swarm of Rats","Swat","Sway of Illusion",
"Sway of the Stars","Swelter","Swift Maneuver","Swift Silence","Swirl the Mists","Swirling Sandstorm","Swooping Talon","Sword Dancer","Sword of Fire and Ice","Sword of Kaldra",
"Sword of Light and Shadow","Sword of the Paruns","Swords to Plowshares","Sylvan Messenger","Sylvan Might","Sylvan Safekeeper","Sylvan Scrying","Sylvok Explorer","Symbiotic Beast","Symbiotic Deployment",
"Symbiotic Elf","Symbiotic Wurm","Symbol Status","Synapse Sliver","Syncopate","Synod Artificer","Synod Centurion","Synod Sanctum","Syphon Mind","Syphon Soul",
"Szadek, Lord of Secrets","Tahngarth, Talruum Hero","Tainted AEther","Tainted Field","Tainted Isle","Tainted Monkey","Tainted Pact","Tainted Peak","Tainted Well","Tainted Wood",
"Taj-Nar Swordsmith","Takeno's Cavalry","Takeno, Samurai General","Takenuma Bleeder","Talisman of Dominance","Talisman of Impulse","Talisman of Indulgence","Talisman of Progress","Talisman of Unity","Tallowisp",
"Talon of Pain","Tamanoa","Tangle Asp","Tangle Golem","Tangle Spider","Tangle Wire","Tanglebloom","Tangleroot","Tanglewalker","Tarnished Citadel",
"Task Force","Task Mage Assembly","Taste for Mayhem","Tatsumasa, the Dragon's Fang","Tattered Drake","Tattoo Ward","Taunting Elf","Teardrop Kami","Tears of Rage","Tectonic Break",
"Tectonic Instability","Teferi's Care","Teferi's Moat","Teferi's Puzzle Box","Teferi's Response","Tek","Tel-Jilad Archers","Tel-Jilad Chosen","Tel-Jilad Exile","Tel-Jilad Justice",
"Tel-Jilad Lifebreather","Tel-Jilad Outrider","Tel-Jilad Stylus","Tel-Jilad Wolf","Telekinetic Bonds","Telepathic Spies","Telepathy","Teller of Tales","Telling Time","Tempest of Light",
"Temple Garden","Temple of the False God","Temporal Adept","Temporal Cascade","Temporal Distortion","Temporal Fissure","Temporal Spring","Temporary Insanity","Tempting Wurm","Tendo Ice Bridge",
"Tendrils of Agony","Tenza, Godo's Maul","Tephraderm","Terashi's Cry","Terashi's Grasp","Terashi's Verdict","Terminal Moraine","Terminate","Teroh's Faithful","Teroh's Vanguard",
"Terraformer","Terrain Generator","Terrarion","Terravore","Territorial Dispute","Terror","Test of Endurance","Test of Faith","Testament of Faith","Tethered Griffin",
"Tethered Skirge","Teysa, Orzhov Scion","That Which Was Taken","Thaumatog","The Fallen Apart","The Unspeakable","Thermal Blast","Thermal Glider","Thermal Navigator","Thermopod",
"Thicket Elemental","Thief of Hope","Thieves' Auction","Thieving Magpie","Think Tank","Thirst for Knowledge","Thorn Elemental","Thornscape Apprentice","Thornscape Battlemage","Thornscape Familiar",
"Thornscape Master","Thornwind Faeries","Thought Courier","Thought Devourer","Thought Dissector","Thought Eater","Thought Nibbler","Thought Prison","Thoughtbind","Thoughtbound Primoc",
"Thoughtcast","Thoughtleech","Thoughtpicker Witch","Thoughts of Ruin","Thousand-legged Kami","Thran Dynamo","Thran Foundry","Thran Golem","Thran Lens","Thran Quarry",
"Thran War Machine","Thran Weaponry","Thrashing Mudspawn","Thrashing Wumpus","Threads of Disloyalty","Threaten","Three Tragedies","Thresher Beast","Thriss, Nantuko Primus","Thrive",
"Throat Slitter","Throne of Bone","Through the Breach","Thrumming Stone","Thunder of Hooves","Thunderclap","Thundercloud Elemental","Thunderheads","Thundermare","Thunderscape Apprentice",
"Thunderscape Battlemage","Thunderscape Familiar","Thunderscape Master","Thundersong Trumpeter","Thunderstaff","Thwart","Tibor and Lumia","Ticking Gnomes","Tidal Bore","Tidal Courier",
"Tidal Kraken","Tidal Visionary","Tide of War","Tidespout Tyrant","Tidewater Minion","Tidings","Tiger Claws","Tigereye Cameo","Timberland Ruins","Timberwatch Elf",
"Time Ebb","Time Machine","Time of Need","Time Stop","Time Stretch","Time Warp","Timesifter","Timid Drake","Tin Street Hooligan","Tinder Farm",
"Tinker","Tireless Tribe","Titanic Bulvox","Titanium Golem","To Arms!","Togglodyte","Toils of Night and Day","Tolarian Emissary","Tolarian Winds","Tolsimir Wolfblood",
"Tomb of Urami","Tombfire","Tomorrow, Azami's Familiar","Tonic Peddler","Tooth and Nail","Tooth of Chiss-Goria","Tooth of Ramos","Topple","Topsy Turvy","Torch Drake",
"Torii Watchward","Tormented Angel","Tornado Elemental","Torpid Moloch","Torrent of Fire","Torrent of Stone","Toshiro Umezawa","Totem Speaker","Touch and Go","Touch of Invisibility",
"Tower Drake","Tower of Champions","Tower of Eons","Tower of Fortunes","Tower of Murmurs","Tower of the Magistrate","Towering Baloth","Toxic Stench","Toxin Sliver","Toy Boat",
"Toymaker","Trade Routes","Trade Secrets","Tradewind Rider","Tragic Poet","Train of Thought","Trained Armodon","Trained Orgg","Trained Pronghorn","Tranquil Garden",
"Tranquil Path","Tranquil Thicket","Tranquility","Transcendence","Transguild Courier","Transluminant","Trap Digger","Trap Runner","Traproot Kami","Trash for Treasure",
"Traumatize","Traveler's Cloak","Traveling Plague","Treacherous Link","Treacherous Vampire","Treacherous Werewolf","Treachery","Treasure Trove","Tree Monkey","Tree of Tales",
"Treefolk Healer","Treefolk Mystic","Treefolk Seedlings","Treespring Lorian","Treetop Bracers","Treetop Scout","Treetop Sentinel","Treetop Village","Tremble","Tremor",
"Trench Wurm","Trenching Steed","Tresserhorn Sinks","Tresserhorn Skyknight","Treva's Attendant","Treva's Charm","Treva's Ruins","Treva, the Renewer","Tribal Flames","Tribal Forcemage",
"Tribal Golem","Tribal Unity","Trickery Charm","Trickster Mage","Trinisphere","Trinket Mage","Triskelion","Troll Ascetic","Troll-Horn Cameo","Trolls of Tel-Jilad",
"Trophy Hunter","Troubled Healer","Troublesome Spirit","True Believer","Trumpet Blast","Trusted Advisor","Trygon Predator","Tsabo Tavoc","Tsabo's Assassin","Tsabo's Decree",
"Tsabo's Web","Tundra Kavu","Tundra Wolves","Tunnel Vision","Tunneler Wurm","Turbulent Dreams","Turf Wound","Turn the Tables","Turn to Dust","Twiddle",
"Twigwalker","Twilight Drover","Twilight's Call","Twincast","Twinstrike","Twist Allegiance","Twisted Abomination","Twisted Experiment","Twisted Justice","Two-Headed Dragon",
"Tyrranax","Uba Mask","Uktabi Kong","Uktabi Orangutan","Uktabi Wildcats","Ulasht, the Hate Seed","Umezawa's Jitte","Unburden","Unchecked Growth","Uncontrollable Anger",
"Uncontrolled Infestation","Undead Gladiator","Undead Warchief","Undercity Shade","Underground River","Undermine","Undertaker","Underworld Dreams","Undying Flames","Unearthly Blizzard",
"Unforge","Unhinge","Unholy Grotto","Unholy Strength","Unified Strike","Unifying Theory","Unliving Psychopath","Unmask","Unnatural Hunger","Unnatural Selection",
"Unnatural Speed","Unquestioned Authority","Unspeakable Symbol","Unstable Hulk","Unsummon","Untaidake, the Cloud Keeper","Untamed Wilds","Upheaval","Uphill Battle","Uproot",
"Upwelling","Ur-Golem's Eye","Urborg Drake","Urborg Elf","Urborg Emissary","Urborg Phantom","Urborg Shambler","Urborg Skeleton","Urborg Volcano","Ursapine",
"Ursine Fylgja","Urza's Armor","Urza's Blueprints","Urza's Filter","Urza's Guilt","Urza's Hot Tub","Urza's Incubator","Urza's Mine","Urza's Power Plant","Urza's Rage",
"Urza's Tower","Utopia Sprawl","Utopia Tree","Utvara Scalper","Uyo, Silent Prophet","Vacuumelt","Valor Made Real","Vampiric Dragon","Vampiric Spirit","Vampiric Tutor",
"Vanish into Memory","Vanquish","Vassal's Duty","Vault of Whispers","Vedalken Archmage","Vedalken Dismisser","Vedalken Engineer","Vedalken Entrancer","Vedalken Mastermind","Vedalken Orrery",
"Vedalken Plotter","Vedalken Shackles","Veil of Secrecy","Vendetta","Venerable Kumo","Venerable Monk","Vengeance","Vengeful Dead","Vengeful Dreams","Venomous Breath",
"Venomous Vines","Venomspout Brackus","Verdant Eidolon","Verdant Field","Verdant Force","Verdant Succession","Verdeloth the Ancient","Verduran Emissary","Verduran Enchantress","Vermiculos",
"Vernal Bloom","Vernal Equinox","Vertigo Spawn","Vesper Ghoul","Veteran Armorer","Veteran Brawlers","Veteran Cavalier","Vexing Arcanix","Vexing Beetle","Vexing Sphinx",
"Viashino Bey","Viashino Cutthroat","Viashino Fangtail","Viashino Grappler","Viashino Heretic","Viashino Sandscout","Viashino Sandstalker","Viashino Slasher","Vicious Betrayal","Vicious Hunger",
"Vicious Kavu","Vigean Graftmage","Vigean Hydropon","Vigean Intuition","Vigilance","Vigilant Drake","Vigilant Sentry","Vigor Mortis","Vigorous Charge","Vile Bile",
"Vile Consumption","Vile Deacon","Villainous Ogre","Vindicate","Vindictive Mob","Vine Dryad","Vine Kami","Vine Trellis","Vinelasher Kudzu","Vintara Elephant",
"Vintara Snapper","Violent Eruption","Viridian Acolyte","Viridian Joiner","Viridian Longbow","Viridian Lorebearers","Viridian Scout","Viridian Shaman","Viridian Zealot","Visara the Dreadful",
"Viseling","Vision Skeins","Vital Surge","Vitality Charm","Vitalizing Wind","Vitu-Ghazi, the City-Tree","Vivify","Vizzerdrix","Vodalian Hypnotist","Vodalian Merchant",
"Vodalian Mystic","Vodalian Serpent","Vodalian Zombie","Voice of All","Voice of Duty","Voice of Reason","Voice of the Woods","Voice of Truth","Void Maw","Voidmage Apprentice",
"Voidmage Prodigy","Voidslime","Volcanic Geyser","Volcanic Hammer","Volcanic Spray","Volcanic Wind","Volcano Imp","Volley of Boulders","Volrath the Fallen","Voltaic Construct",
"Voracious Cobra","Vorrac Battlehorns","Votary of the Conclave","Voyager Staff","Vulshok Battlegear","Vulshok Battlemaster","Vulshok Berserker","Vulshok Gauntlets","Vulshok Morningstar","Vulshok Sorcerer",
"Vulshok War Boar","Vulturous Zombie","Wail of the Nim","Wake of Destruction","Wakestone Gargoyle","Walker of Secret Ways","Walking Archive","Walking Desecration","Walking Sponge","Wall of Air",
"Wall of Blood","Wall of Blossoms","Wall of Bone","Wall of Deceit","Wall of Distortion","Wall of Fire","Wall of Glare","Wall of Hope","Wall of Mulch","Wall of Spears",
"Wall of Stone","Wall of Swords","Wall of Vipers","Wall of Wonder","Wallop","Wand of the Elements","Wanderguard Sentry","Wandering Eye","Wandering Ones","Wandering Stream",
"War Cadence","War Elemental","War Tax","War's Toll","War-Torch Goblin","Warbreak Trumpeter","Ward of Piety","Ward Sliver","Warmonger","Warp World",
"Warpath","Warped Devotion","Warped Researcher","Warrior's Honor","Wash Out","Waste Away","Wasteland","Watchwolf","Water Gun Balloon Game","Waterfront Bouncer",
"Waterspout Elemental","Waterveil Cavern","Watery Grave","Wave of Indifference","Wave of Reckoning","Wax // Wane","Waxmane Baku","Wayfarer's Bauble","Wayfaring Giant","Wayward Angel",
"Wear Away","Weathered Wayfarer","Weatherseed Elf","Weatherseed Faeries","Weatherseed Treefolk","Weaver of Lies","Web of Inertia","Wee Dragonauts","Weight of Spires","Weird Harvest",
"Welding Jar","Well of Discovery","Well of Life","Well of Lost Dreams","Well-Laid Plans","Wellwisher","Werebear","Western Paladin","Wet Willie of the Damned","Wheel and Deal",
"Wheel of Torture","When Fluffy Bunnies Attack","Whip Sergeant","Whip Silk","Whipcorder","Whipgrass Entangler","Whipkeeper","Whipstitched Zombie","Whiptail Moloch","Whirlpool Drake",
"Whirlpool Rider","Whirlpool Warrior","Whispering Shade","Whispersilk Cloak","White Knight","White Shield Crusader","Wicked Akuba","Wild Cantor","Wild Colos","Wild Growth",
"Wild Jhovall","Wild Mammoth","Wild Might","Wild Mongrel","Wild Research","Wilderness Elemental","Wildfire","Wildsize","Will-o'-the-Wisp","Willbender",
"Wind Drake","Windborn Muse","Windreaver","Windscouter","Windswept Heath","Wine of Blood and Iron","Wing Shards","Wing Snare","Wing Storm","Wingbeat Warrior",
"Wings of Hope","Winnow","Wintermoon Mesa","Wipe Clean","Wirefly Hive","Wirewood Channeler","Wirewood Elf","Wirewood Guardian","Wirewood Herald","Wirewood Hivemaster",
"Wirewood Lodge","Wirewood Pride","Wirewood Savage","Wirewood Symbiote","Wishmonger","Wit's End","Witch-Maw Nephilim","Withdraw","Withered Wretch","Withering Gaze",
"Withering Hex","Withstand","Wizard Replica","Wizened Snitches","Woebearer","Woebringer Demon","Wojek Apothecary","Wojek Embermage","Wojek Siren","Wonder",
"Wood Elves","Woodcloaker","Wooded Foothills","Wooden Sphere","Woodland Druid","Woodripper","Woodwraith Corrupter","Woodwraith Strangler","Woolly Razorback","Word of Blasting",
"Wordmail","Words of War","Words of Waste","Words of Wilding","Words of Wind","Words of Wisdom","Words of Worship","Working Stiff","World-Bottling Kit","Worldgorger Dragon",
"Worldly Counsel","Worldslayer","Wormfang Behemoth","Wormfang Crab","Wormfang Drake","Wormfang Manta","Wormfang Newt","Wormfang Turtle","Worry Beads","Worship",
"Wrath of God","Wrath of Marit Lage","Wreak Havoc","Wrecking Ball","Wrench Mind","Wretched Anurid","Writ of Passage","Wurm's Tooth","Wurmskin Forger","Wurmweaver Coil",
"Xantid Swarm","Yamabushi's Flame","Yamabushi's Storm","Yavimaya Barbarian","Yavimaya Coast","Yavimaya Elder","Yavimaya Enchantress","Yavimaya Granger","Yavimaya Hollow","Yavimaya Kavu",
"Yavimaya Scion","Yavimaya Wurm","Yavimaya's Embrace","Yawgmoth Demon","Yawgmoth's Agenda","Yawgmoth's Bargain","Yawgmoth's Edict","Yet Another AEther Vortex","Yomiji, Who Bars the Way","Yore-Tiller Nephilim",
"Yosei, the Morning Star","Yotian Soldier","Yuki-Onna","Yukora, the Prisoner","Zanam Djinn","Zap","Zealous Inquisitor","Zephyr Spirit","Zerapa Minotaur","Zo-Zu the Punisher",
"Zodiac Monkey","Zombie Assassin","Zombie Boa","Zombie Brute","Zombie Cannibal","Zombie Cutthroat","Zombie Fanboy","Zombie Infestation","Zombie Musher","Zombie Trailblazer",
"Zombify","Zoologist","Zur the Enchanter","Zur's Weirding","Zzzyxas's Abyss","Wood","Web","Void","Vex","Valor",
"Unearth","Tangle","Suppress","Starlight","Soulcatcher","Snap","Slay","Sift","Shelter","Shatter",
"Shackles","Scour","Rout","Revenant","Refresh","Probe","Plains","Plain","Phytohydra","Pariah",
"Overwhelm","Overload","Opt","Nourish","Nightmare","Mourning","Mountain","Mise","Mirari","Masticore",
"Maro","Lunge","Liberate","Lashknife","Juggernaut","Island","Invisibility","Intuition","Infest","Impulse",
"Illuminate","Hystrodon","Holy Strength","Hinder","Hibernation","Hex","Hallow","Glory","Ghitu Fire","Genesis",
"Frazzle","Forest","Forbid","Fog","Flight","Flicker","Filth","Fear","Fatigue","Extract",
"Entangler","Edgewalker","Disrupt","Dismiss","Deluge","Deathmark","Crusade","Crash","Corrupt","Cloudskate",
"Choke","Chill","Char","Castle","Brawl","Boil","Bloodletter","Blaze","Bind","Balance",
"Atog","Anger","Addle","Accelerate"
];

var cards_found=0;
var rename_regex = []; 
var rename_realname = []; 
var card_regex = {};
var replacers = {}; 

var renames = {
 "Burning Tree Shaman":"Burning-Tree Shaman",
 "Scarg Rage Pits":"Skarrg, the Rage Pits",
 "Umezawas Jitte":"Umezawa's Jitte",
 "Stomping Grounds":"Stomping Ground",
 "Heartbeat":"Heartbeat of Spring",
 "Scorched Resulka":"Scorched Rusalka",
 "Loxodon Heirarch":"Loxodon Hierarch",
 "Naturalise":"Naturalize",
 //"BTS":"Burning-Tree Shaman",
 //"BoW":"Battle of Wiz",
}

var allowedParents = [
        "abbr", "acronym", "address", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];

var popWin = null;
var cardAnchor = null;
var statusBar = null;
var toolBar = null;
var cardSearch = null;

popWin = document.createElement('div');
popWin.setAttribute('id', 'mmcpopwin');
popWin.setAttribute('border', 0);
popWin.setAttribute('style', 'display: block; position: fixed; width:232px; top: 0px; right: 0px; border-width: 0 0 1px 1px; border-color: black; border-style: solid; padding: 4px 7px 3px 3px; background-color: white; z-index: 100;');

titleText = document.createElement('div');
titleText.setAttribute('style', 'padding: 0px 7px 5px 3px; background-color: white; z-index: 110; font-size:11px; font-face:verdana; color:black; text-decoration:none; font-weight:bold');
titleText.innerHTML='MTG Magical Cardlinker!'

runBar = document.createElement('div');
runBar.setAttribute('style', 'cursor:pointer; padding: 1px 2px 1px 2px; font-size:11px; font-face:verdana; color:blue; text-decoration:none; border-width: 1px 1px 1px 1px; background-color:#f0f0f0; border-color: #808080; border-style: solid;');
runBar.innerHTML = 'Click here to run Cardlinker!';

lookupBar = document.createElement('input');
lookupBar.setAttribute('style', 'font-size:11px; font-face:verdana; background-color:#f0f0f0; border-color: #808080; border-style: solid;');
lookupBar.setAttribute('type','button');
lookupBar.setAttribute('value','Lookup');

statusBar = document.createElement('table');
tb=document.createElement("tbody");
tr=document.createElement('tr');
td1=document.createElement('td');
td1.setAttribute('width','100%');
td1.appendChild(runBar);
td2=document.createElement('td');
td2.appendChild(lookupBar);
tr.appendChild(td1);
tr.appendChild(td2);
tb.appendChild(tr);
statusBar.appendChild(tb);

runBar.addEventListener('click',
 function() {runCardlinker()},
 false);

lookupBar.addEventListener('mousedown',
 function(e) {lookupCardname()},
 false);


hideButton = document.createElement('div');
hideButton.innerHTML = '<div style="font-size:14px; font-face:verdana; cursor:pointer; text-align:center; width:16px; font-weight: bold; text-decoration:none; background-color:#E06060; color:white; position: fixed; top: 2px; right: 2px;" onClick="document.getElementById(\'mmcpopwin\').style.display=\'none\'">x</div>';

cardAnchor = document.createElement('a');

var s = '<table id="TheTable" style="display:none" cellpadding="0" cellspacing="0" border="0">';
s += '<tr><td><img src="http://www.wizards.com/magic/images/console/cardborder_nw.jpg" width="19" height="13" border="0" alt=""></td><td bgcolor="black"><img src="http://www.wizards.com/images/spacer_1_1.gif" border="0" alt="" height="1" width="1"></td><td><img src="http://www.wizards.com/magic/images/console/cardborder_ne.jpg" width="13" height="13" border="0" alt=""></td></tr>';
s += '<tr><td><img src="http://www.wizards.com/magic/images/console/cardborder_w.jpg" width="19" height="285" border="0" alt=""></td><td bgcolor="black"><img id="TheCard" border="0" width="200" height="285"></td><td bgcolor="black"><img src="http://www.wizards.com/images/spacer_1_1.gif" border="0" alt="" height="1" width="1"></td></tr>';
s += '<tr><td><img src="http://www.wizards.com/magic/images/console/cardborder_sw.jpg" width="19" height="22" border="0" alt=""></td><td><img src="http://www.wizards.com/magic/images/console/cardborder_s.jpg" width="200" height="22" border="0" alt=""></td><td><img src="http://www.wizards.com/magic/images/console/cardborder_se.jpg" width="13" height="22" border="0" alt=""></td></tr>';
s += '</table>';

cardAnchor.innerHTML = s;

// close button for card-popup
toolBar = document.createElement('div');
toolBar.setAttribute('style', 'display:none; padding: 1px 2px 1px 2px');

cardSearch=document.createElement('a');
cardSearch.setAttribute('style', 'font-size:11px; font-face:verdana; color:blue; text-decoration:none; font-weight:bold');
cardSearch.setAttribute('target','_blank');
cardSearch.innerHTML = "The Cardsearch";
toolBar.appendChild(cardSearch);

toolBar.appendChild(document.createTextNode(' / '));

starcitySearch=document.createElement('a');
starcitySearch.setAttribute('style', 'font-size:11px; font-face:verdana; color:blue; text-decoration:none; font-weight:bold');
starcitySearch.setAttribute('target','_blank');
starcitySearch.innerHTML = "StarCityGames";

toolBar.appendChild(starcitySearch);

popWin.appendChild(titleText);
popWin.appendChild(hideButton)
popWin.appendChild(cardAnchor);
popWin.appendChild(toolBar);
popWin.appendChild(statusBar);
document.body.appendChild(popWin);

scriptExtra = document.createElement('script');

var s = 'function myCardWindow(cardname) {';
s+='agent = navigator.userAgent;'
s+='windowName = "Sitelet";'
s+='params  = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=700,height=500";'
s+='win = window.open("http://ww2.wizards.com/Gatherer/CardDetails.aspx?name="+cardname, windowName , params); }';

scriptExtra.innerHTML = s;
document.body.appendChild(scriptExtra);

var running=false

var regexSpace=new RegExp(' ','g');

function runCardlinker() {
	if(running) return 
	running=true
 
	var nt=cardnames.length;
	for (var i=0; i<nt; i++) {
		var name=cardnames[i];
		card_regex[name]=new RegExp("\\b"+name+"\\b", 'gi');

		// To not replace "Karplusan Forest" with "Forest" again
		// I use a 2 tricks.. a sortet wordlist and a simple obscufaction while replacing
		replacers[name]='~^'+name.substring(2)+name.substring(0,2)+'~^';
		// Generating Replaces for Double Named Cards common spellings
		pos=name.indexOf(' // ');
		if(pos!=-1) {
			tmp=name.split(' // ');
			renames[tmp[0]+'/'+tmp[1]]=name;
			renames[tmp[0]+'//'+tmp[1]]=name;
			renames[tmp[0]+' / '+tmp[1]]=name;
		}
	}

	var n=0
	for (var key in renames) {
		rename_regex[n] = new RegExp("\\b"+key+"\\b", 'gi');
		rename_realname[n]=renames[key]
		n++
		// next line is to check if all translations have a valid target
		if(!replacers[renames[key]]) alert("replacer for '"+key+"' is missing!")
	}
	digger()
}

function myEventListener(nadd) {
  nadd.addEventListener('click', function(e) {
      e.stopPropagation();
      var cardName = this.href.split('"')[1];
      cardLookup(cardName);
  }, true);
}

function cardLookup(cardName) {
  var lookupUrl = 'http://gatherer.wizards.com/gathererlookup.asp?name=' + cardName;
  GM_xmlhttpRequest({
    method: 'GET',
    url: lookupUrl,
    onload: function(details) {
      document.getElementById('TheCard').setAttribute('src', details.responseText.match(/http:\/\/resources\.wizards\.com\/Magic\/Cards\/\w+\/en-us\/\w+\.jpg/));
      cardAnchor.setAttribute('href', "javascript:myCardWindow(\"" + cardName + "\")");
      cardSearch.setAttribute('href','http://magiccards.info/query.php?cardname='+cardName);
      starcitySearch.setAttribute('href','http://sales.starcitygames.com/cardsearch.php?singlesearch='+cardName);
      document.getElementById('TheTable').style.display = 'block';
      popWin.style.display = 'block';
      toolBar.style.display = 'block';
    }
  });
}

function adad(elm,txt){
 var nadd = document.createElement('A');
 nadd.style.color='inherit';
 nadd.style.textDecoration='none';
 nadd.style.fontWeight='bold';
 nadd.style.borderBottom='dotted 1px green';

 nadd.setAttribute('href','javascript:void("'+escape(txt.replace(regexSpace,'_'))+'")')
 myEventListener(nadd);

 elm.parentNode.insertBefore(nadd,elm);
 var celm=elm.cloneNode(true);
 nadd.appendChild(celm);
 celm.nodeValue=txt;

 cards_found++;
}

function adtx(elm,txt){
 var celm=elm.cloneNode(true);
 elm.parentNode.insertBefore(celm,elm);
 celm.nodeValue=txt;
}

function namelink(elm){
    var txt=elm.nodeValue;

    for (var key in card_regex) { 
       txt = txt.replace(card_regex[key],replacers[key]); 
    }

    for (var n=0; n<rename_regex.length; n++) {
       txt = txt.replace(rename_regex[n],replacers[rename_realname[n]]); 
    }

    var txts=txt.split('~^');
    var nt=txts.length;
    if (nt==1) return;
    var ctxt;
    var mode=0;
    for (var j=0; j<nt; j++){
        ctxt=txts[j];
        if(mode==0) {
           adtx(elm,ctxt);
           mode=1
        } else if(mode==1) {
           adad(elm,ctxt.substring(ctxt.length-2)+ctxt.substring(0,ctxt.length-2)); 
           mode=0
        }
    }
    elm.parentNode.removeChild(elm);
}

function digger() {
  popWin.style.display='block';
  runBar.style.color='black';

  var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";
  var textnodes = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  cnt=0

  var i=0
  function DoSome() {
   var n=0
   while(i<textnodes.snapshotLength && n<4){
    node = textnodes.snapshotItem(i);
    if(node.nodeValue.length>2) {
      namelink(node);
      cnt++;
	  n++;
    }
    i++;
   }

   percent=Math.floor(i*100 / textnodes.snapshotLength);

   runBar.innerHTML="Working... "+percent+"% ("+cards_found+" found)";
   if(i<textnodes.snapshotLength ) {
	 window.setTimeout(DoSome, 3); 
   } else {
	runBar.innerHTML="Found: "+cards_found;
	//statusBar.style.display='none';
   }
  }
  runBar.innerHTML="Working... 0% (0 found)";
  window.setTimeout(DoSome, 0); 
}

function lookupCardname() {
  s=window.getSelection();
  if(s=='') {
    s=prompt('Enter a Cardname:','');
    if(!s) return
  }
  s=''+s;
  s=s.replace(/^\s+|\s+$/g, "");
  if(s) cardLookup(escape(s))
}

function enableAuto() {
  GM_setValue("MTG Auto", 1)
  GM_registerMenuCommand( "Disable Auto MTG", disableAuto, "a", "shift control", "a" );
}

function disableAuto() {
  GM_setValue("MTG Auto", 0)
}

function doWizPage() {
  // this will relink all the autoCard Windows (this is the functionality of the 'original' script I found on the net)
  var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    if (link.href.indexOf('autoCardWindow') != -1 && link.firstChild && link.firstChild.tagName != 'IMG') {
      link.href = 'javascript:void("' + link.href.split("'")[1] + '")';
      myEventListener(link);
    }
  }
}

function doWizForum() {
  // this will generate nice popups in the forum too
  var links = document.evaluate('//a[@onclick]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    var txt=link.getAttribute('onclick')
    if (txt.indexOf("MM_openBrWindow('http://gatherer.wizards.com/gathererlookup.asp?") != -1) {
      link.removeAttribute('onclick');
      link.removeAttribute('onmouseover');
      link.removeAttribute('onmouseout');
      txt=txt.split("=")[1];
      txt=txt.split("'")[0];
      link.href = 'javascript:void("' + txt + '")';
      myEventListener(link);
    }
  }
}

function doMTGCity() {
  var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    if (link.href.indexOf('ShowCard') != -1 || link.href.indexOf('viewcard') != -1) {
      link.removeAttribute('target'); // some have some not
      link.href = 'javascript:void("' + link.innerHTML + '")';
      myEventListener(link);
    }
  }
}

function doStarCityGames() {
  // this will generate nice popups in the forum too
  var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    if (link.href.indexOf("cardsearch.php?singlesearch=") != -1) {
      txt=link.href.split("=")[1];
      link.href = 'javascript:void("' + txt + '")';
      myEventListener(link);
    }
  }
}

function workOnURL() {
  if(window.location.host=='www.wizards.com') {
    doWizPage();
  } else if(window.location.host=='boards1.wizards.com') {
    doWizForum();
  } else if(window.location.host=='www.mtgcity.com') {
    doMTGCity();
  } else if(window.location.host=='www.starcitygames.com') {
 	doStarCityGames();
  } else if(window.location.host=='www.magic4you.nu') {
  	; // no automatic action here
  } else if(window.location.host=='www.germagic.de') {
  	; // no automatic action here
  } else {
    // no warns- alert("MTG-Cardlinker Script called for '"+window.location.host+"'")
  }
}

GM_registerMenuCommand( "MTG Lookup", lookupCardname, "l", "shift control", "l" );
GM_registerMenuCommand( "Run MTG Cardlinker", runCardlinker, "m", "shift control", "m" );
GM_registerMenuCommand( "Autorun MTG Cardl.", enableAuto, "a", "shift control", "a" );

window.addEventListener('load', workOnURL, false)

if(GM_getValue("MTG Auto", 0)) {
  window.addEventListener('load', runCardlinker, false)
}

// end