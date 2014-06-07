// ==UserScript==
// @name          Castle Age Item Title Replacer
// @namespace     caitr
// @description   Replaces item image titles with more detailed information
// @version       0.7.4
// @date          2010-12-07
// @copyright     2010, Dirk Kapusta
// @license       GPL 2 or later
// @include       http://apps.facebook.com/castle_age/*
// ==/UserScript==

// All detailed information collected from http://castleage.wikia.com
// Many thanks to all users who are working on this wiki.

// Please send errors and missing titles (with original title), 
// suggestions and mailbombs to dirk.kapusta@keh.net :)

var g_version = '0.7.4';
// changelog:
// 2011-02-05	0.7.4	added missing Equipment (thx Acr111)
// 2010-12-07	0.7.3	added Noktar, Sanna Equipment
// 2010-11-19	0.7.2	added Araxin Blade, added some alchemy ingredients, some fixes
// 2010-11-08	0.7.1	added Vincent and Crissana Equipment, added Staff of Vigor
// 2010-10-28	0.7.0	added Gawain Equipment, Zarevok Plate, fixed Sea Serpents
// 2010-10-14	0.6.9	added Karn Equipment
// 2010-10-12	0.6.8	added Fiery Blade and Azul Equipment
// 2010-10-11	0.6.7	added Lion's Rebellion Equipment
// 2010-10-01	0.6.6	added Silverlight Tome
// 2010-09-29	0.6.5	added Elora Equipment
// 2010-09-27	0.6.4	added Cid Helm
// 2010-09-20	0.6.3	added Shadow Blast
// 2010-09-13	0.6.2	added Oblivion Chest and Azalia Equipment
// 2010-09-08	0.6.1	added Gehenna Equipment
// 2010-09-06	0.6.0	added Arielle Equipment
// 2010-08-30	0.5.9	added Zin and Mystical Dagger
// 2010-08-21	0.5.8	added Crimson Dagger
// 2010-08-17	0.5.7	added Favor Points
// 2010-08-06	0.5.6	added Scepter of Light
// 2010-08-05	0.5.5	added Solara
// 2010-07-29	0.5.4	added Arena 2 Equipment
// 2010-07-23	0.5.3	added Cid Saber
// 2010-07-22	0.5.2	added Suri Equipment
// 2010-07-19	0.5.1	added Reinforcements Equipment
// 2010-07-16	0.5.0	added Alpha Mephistopheles Equipment
// 2010-07-13	0.4.9	added Bloodblade, some fixes
// 2010-07-08	0.4.8	added Godric Equipment
// 2010-07-06	0.4.7	added Reinforcements Equipment
// 2010-07-05	0.4.6	added Kataan and Adriana
// 2010-07-02	0.4.5	added Elin
// 2010-06-28	0.4.4	fixed Zenarean Dagger, added manual update check
// 2010-06-23	0.4.3	added War of the Red Plains Equipment
// 2010-06-11	0.4.2	enhanced automatic update
// 2010-06-11	0.4.1	fixed automatic update
// 2010-06-11	0.4.0	deactivated automatic update, have to look for the problem
// 2010-06-11	0.3.1	fixed Ironhart's Might
// 2010-06-11	0.3.0	added automatic update
// 2010-06-11	0.2.1	added Titania Bow and ingredients
// 2010-06-10	0.2.0	added keep (other users), performing alchemy (newly created item)
// 2010-06-08	0.1.0	initial version containing equipment, magic, units and alchemy items

var g_debug = 0;
var titles = new Array();
//Equipment
//Regular Equipment
titles[ 'Dagger' ] = 'Weapon,1,0';
titles[ 'Buckler' ] = 'Shield,0,1';
titles[ 'Short Sword' ] = 'Weapon,2,0';
titles[ 'Leather Armor' ] = 'Armor,0,2';
titles[ 'Steel Helm' ] = 'Helmet,1,2';
titles[ 'Steel Gauntlet' ] = 'Gloves,1,0';
titles[ 'Sacred Amulet' ] = 'Amulet,1,1';
titles[ 'Long Sword' ] = 'Weapon,3,1';
titles[ 'Steel Shield' ] = 'Shield,1,2';
titles[ 'Battle Axe' ] = 'Weapon,4,0';
titles[ 'Steel Chainmail' ] = 'Armor,1,3';
titles[ 'Steel Plate' ] = 'Armor,2,4';
//Epic Equipment
titles[ 'Obsidian Amulet' ] = 'Amulet,2,2';
titles[ 'Obsidian Shield' ] = 'Shield,4,4';
titles[ 'Obsidian Helmet' ] = 'Helmet,3,5';
titles[ 'Obsidian Armor' ] = 'Armor,6,9';
titles[ 'Obsidian Sword' ] = 'Weapon,11,12';
//Battle Rank Equipment
titles[ 'Gladiator Sword' ] = 'Weapon,5,4';
titles[ 'Commanders Battle Plate' ] = 'Armor,7,7';
titles[ 'High Kings Crown' ] = 'Helmet,11,11';
//War Rank Equipment
titles[ 'Ornate Axe' ] = 'Weapon,7,7';
titles[ 'Pendant of Wonder' ] = 'Amulet,9,9';
//Demi-Equipment
//Ambrosia Equipment
titles[ 'Sword of Light' ] = 'Weapon,2,1';
titles[ 'Tempest Crown' ] = 'Helmet,3,1';
titles[ 'Staff of the Tempest' ] = 'Weapon,4,2';
titles[ 'Tempest Shield' ] = 'Shield,4,6';
titles[ 'Robes of the Tempest' ] = 'Armor,7,8';
titles[ 'Amulet of the Tempest' ] = 'Amulet,10,11';
titles[ 'Tempest Helm' ] = 'Helmet,10,10';
//Malekus Equipment
titles[ 'Berserker Shield' ] = 'Shield,3,2';
titles[ 'Berserker Platemail' ] = 'Armor,4,2';
titles[ 'Berserker Amulet' ] = 'Amulet,5,4';
titles[ 'Berserker Helm' ] = 'Helmet,12,10';
titles[ 'Berserker Axe' ] = 'Weapon,20,13';
titles[ 'Juggernaut Shield' ] = 'Shield,18,12';
//Corvintheus Equipment
titles[ 'Lionheart Amulet' ] = 'Amulet,1,4';
titles[ 'Lionheart Helm' ] = 'Helmet,4,6';
titles[ 'Lionheart Blade' ] = 'Weapon,8,7';
titles[ 'Lionheart Shield' ] = 'Shield,7,15';
titles[ 'Lionheart Plate' ] = 'Armor,10,25';
titles[ 'Holy Talisman ' ] = 'Amulet,7,10';
//Aurora Equipment
titles[ 'Moonfall Crown' ] = 'Helmet,6,3';
titles[ 'Moonfall Mace' ] = 'Weapon,8,11';
titles[ 'Moonfall Shield' ] = 'Shield,10,15';
titles[ 'Moonfall Robes' ] = 'Armor,15,20';
titles[ 'Moonfall Amulet' ] = 'Amulet,40,40';
//Azeron Equipment
titles[ 'Avenger Platemail' ] = 'Armor,1,5';
titles[ 'Avenger Amulet' ] = 'Amulet,5,2';
titles[ 'Cowl of the Avenger' ] = 'Helmet,12,7';
titles[ 'Blade of Vengeance' ] = 'Weapon,17,15';
titles[ 'Sword of Redemption' ] = 'Shield,50,30';
titles[ 'Armor of Vengeance' ] = 'Armor,13,10';
//Epic Quests Equipment
titles[ 'Shortsword +1' ] = 'Weapon,3,1';
titles[ 'Dagger +1' ] = 'Weapon,2,1';
titles[ 'Longsword +1' ] = 'Weapon,4,4';
//Favor Equipment
//Alpha Chest
titles[ 'Angelic Crown' ] = 'Helmet,7,7';
titles[ 'Crystal Rod' ] = 'Weapon,9,4';
titles[ 'Demon Blade' ] = 'Weapon,9,5';
titles[ 'Elven Plate' ] = 'Armor,6,6';
titles[ 'Lightbringer' ] = 'Weapon,7,7';
titles[ 'Rune Axe' ] = 'Weapon,8,6';
titles[ 'Sun Blade' ] = 'Weapon,10,5';
titles[ 'Shield of Artanis' ] = 'Shield,7,10';
//Vanguard Chest
titles[ 'Argentum Helm' ] = 'Helmet,9,7';
titles[ 'Argentum Plate' ] = 'Armor,7,10';
titles[ 'Bearheart Armor' ] = 'Armor,11,9';
titles[ 'Boar Tusk Helm' ] = 'Helmet,7,10';
titles[ 'Daedalus' ] = 'Weapon,9,9';
titles[ 'Fear Charm' ] = 'Amulet,9,8';
titles[ 'Fury Maul Axe' ] = 'Weapon,11,7';
titles[ 'Gilded Bow' ] = 'Weapon,10,8';
titles[ 'Illusia\'s Bauble' ] = 'Shield,8,9';
titles[ 'Justice' ] = 'Weapon,10,6';
titles[ 'Moonfall Trinket' ] = 'Amulet,8,8';
titles[ 'Wand of Illusia' ] = 'Weapon,9,8';
titles[ 'Whisper Cloak' ] = 'Armor,6,11';
//Onslaught Chest
titles[ 'Divinity Helm' ] = 'Helmet,9,10,+2 Stamina when Gallador is equipped';
titles[ 'Divinity Mace' ] = 'Weapon,10,14,+1 Attack to Gallador';
titles[ 'Divinity Plate' ] = 'Armor,12,11,+3 Defense to Gallador';
titles[ 'Drakken Blade' ] = 'Weapon,12,12,+3 Attack to Draconius';
titles[ 'Drakken Helm' ] = 'Helmet,8,9,+3 energy when Draconius is equipped';
titles[ 'Drakken Plate' ] = 'Armor,10,10,+2 defense to Draconius';
titles[ 'Nightcraft Gauntlets' ] = 'Gloves,9,14,+1% crit when Scourge is equipped';
titles[ 'Nightcraft Plate' ] = 'Armor,11,10,+1 defense to Scourge';
titles[ 'Nightcraft Helm' ] = 'Helmet,9,7,+1 Stamina when Scourge is equipped';
titles[ 'Wildwalker Necklace' ] = 'Amulet,10,8,+2 energy when Anwar is equipped';
titles[ 'Wildwalker Tunic' ] = 'Armor,9,12,+1 defense to Anwar';
titles[ 'Wildwalker Staff' ] = 'Weapon,11,12,+1% critical when Anwar is equipped';
//Oblivion Chest
titles[ 'Cloudslayer Blade' ] = 'Weapon,15,15,+2 Attack to Delfina';
titles[ 'Bladebounrne Gauntlet' ] = 'Gloves,10,12,+1% crit when Miri is equipped';
titles[ 'Halcyon Grinder' ] = 'Weapon,12,12,+2 Attack to Halycon';
titles[ 'Jadan Wand' ] = 'Weapon,10,14,+1 Attack to Jada';
titles[ 'Cloudslayer Pendant' ] = 'Amulet,9,10,+2 Stam when Delfina equipped';
titles[ 'Cloudslayer Gauntlet' ] = 'Gloves,7,8,+1 Defense to Delfina';
titles[ 'Bladebourne Saber' ] = 'Weapon,12,11,+1 Attack to Miri';
titles[ 'Bladebourne Raiments' ] = 'Armor,10,12,+1 Defense to Miri';
titles[ 'Halcyon Necklace' ] = 'Amulet,12,7,+2 Stamina when Halycon is equipped';
titles[ 'Jadan Robes' ] = 'Armor,11,13,+1 Defense to Jada';
titles[ 'Halcyon Glove' ] = 'Gloves,8,6,+2 Defense to Halycon';
titles[ 'Jadan Signet' ] = 'Amulet,9,10,+3 Energy when Jada is equipped';
//Annihilator Chest
titles[ 'Necronic Ring' ] = 'Amulet,20,24,+5 Energy when Zurran is equipped';
titles[ 'The Galvanizer' ] = 'Weapon,27,23,+2 Attack to Raziel';
titles[ 'Truthseeker Blade' ] = 'Weapon,15,22,+1 Attack to Severin';
titles[ 'Amulet of Shadows' ] = 'Amulet,17,20,+1 Defense to Raziel';
titles[ 'Path of the Tower' ] = 'Weapon,22,14,+2 attack to Elaida';
titles[ 'Truthseeker Pendant' ] = 'Amulet,8,14,+5 Health when Severin is equipped';
titles[ 'Terrorshard Armor' ] = 'Armor,15,13,+1 Defense to Raziel';
titles[ 'Soul Siphon' ] = 'Weapon,10,18,+1 attack to Zurran';
titles[ 'Devout Helm' ] = 'Helmet,11,12,+1 defense to Severin';
titles[ 'Ivory Tower Insignia' ] = 'Amulet,13,8,+1 Defense to Elaida';
titles[ 'Crown of Deliverance' ] = 'Helmet,13,9,+1 defense to Elaida';
//Oracle Specials
titles[ 'Griffinhyde Armor' ] = 'Armor,16,19,+1 Defense to Oberon';
titles[ 'Crest of the Griffin' ] = 'Shield,15,16,+1 Defense to Oberon';
titles[ 'Oberon\'s Might' ] = 'Weapon,20,17,+1 Attack to Oberon';
titles[ 'Forsaken Tome' ] = 'Shield,13,11,+1 Attack to Dolomar';
titles[ 'Magus Plate' ] = 'Armor,15,15,+1 Defense to Dolomar';
titles[ 'Silverfist Helm' ] = 'Helmet,11,13,+4 Stamina when Therian is equipped';
titles[ 'Silverfist Plate' ] = 'Armor,13,17,+2 Defense to Therian';
titles[ 'Silverfist Hammer' ] = 'Weapon,19,15,+1 Attack to Therian';
titles[ 'Shadowfel Pendant' ] = 'Amulet,10,14,+1% critical chance when Deshara is equipped';
titles[ 'Shadowfel Katara' ] = 'Weapon,18,15,+1 Attack to Deshara';
titles[ 'Shadowfel Cloak' ] = 'Armor,16,12,+2 Defense to Deshara';
titles[ 'Atonement' ] = 'Weapon,14,18,+1 Attack to Azul';
titles[ 'Absolution' ] = 'Shield,13,11,+2 Defense to Azul';
titles[ 'Hand of Justice' ] = 'Gloves,8,8,+1% critical chance when Azul is equipped';
titles[ 'Staff of the Martyr' ] = 'Weapon,15,19,+1 Attack to Sanna';
titles[ 'Saintly Robes' ] = 'Armor,14,14,+3 Health when Sanna is equipped';
titles[ 'Crusaders Cross' ] = 'Amulet,12,12,+2 Defense to Sanna';
titles[ 'Prismatic Staff' ] = 'Weapon,17,14,+1 Attack to Azalia';
titles[ 'Archmage Robes' ] = 'Armor,14,12,+2 Defense to Azalia';
titles[ 'Magicite Earrings' ] = 'Amulet,12,10,+1% critical chance when Azalia is equipped';
titles[ 'Windthorn Wand' ] = 'Weapon,16,14,+2 attack to Suri';
titles[ 'Gilded Tiara' ] = 'Helmet,10,10,+2 defense to Suri';
titles[ 'Sunstone Crest' ] = 'Amulet,11,10,+2 max stamina when Suri is equipped';
titles[ 'Solstice Blade' ] = 'Weapon,15,17,+2 Attack to Solara';
titles[ 'Seraphim Shield' ] = 'Shield,11,13,+2 Defense to Solara';
titles[ 'Silverlight Seal' ] = 'Amulet,11,11,+4 Energy when Solara is equipped';
titles[ 'Serenity Blade' ] = 'Weapon,16,16,+1 Attack to Zin';
titles[ 'Ancient Shield' ] = 'Shield,12,12,+2 Defense to Zin';
titles[ 'Windstalker Crown' ] = 'Helmet,10,12,+3 Energy when Zin is equipped';
titles[ 'Golden Horn Bow' ] = 'Weapon,17,15,+2 Attack to Elora';
titles[ 'Tetheryn Glove' ] = 'Gloves,7,9,+1% critical chance when Elora is equipped';
titles[ 'Sharpwind Amulet' ] = 'Amulet,11,13,+3 Stamina when Elora is equipped';
titles[ 'Emperion Sword' ] = 'Weapon,16,16,+1 Attack to Gawain';
titles[ 'Emperion Plate' ] = 'Armor,12,16,+2 Defense to Gawain';
titles[ 'Emperion Helm' ] = 'Helmet,12,10,+3 Stamina when Gawain is equipped';
titles[ 'Scytheblade' ] = 'Weapon,18,14,+1 Attack to Crissana';
titles[ 'Vindicator Shield' ] = 'Shield,11,13,+1 Defense to Crissana';
titles[ 'Trigon Necklace' ] = 'Amulet,13,11,+4 Stamina when Crissana is equipped';
titles[ 'Shadow Blades' ] = 'Weapon,11,5';
titles[ 'Shadowmoon' ] = 'Amulet,7,7';
titles[ 'Deathbellow' ] = 'Weapon,19,9,+2 Attack to Barbarus';
titles[ 'Warmonger Shield' ] = 'Shield,12,10,+2 Attack to Barbarus';
titles[ 'Wrathbringer Helm' ] = 'Helmet,12,8,+1% crit when Barbarus is equipped';
titles[ 'Death Dealer' ] = 'Weapon,18,10,+2 Attack to Kaiser';
titles[ 'Ornate Dagger' ] = 'Weapon,16,12,+2 Attack to Kaiser';
titles[ 'Crystalline Rod' ] = 'Weapon,14,14,+2 Defense to Scarlett';
titles[ 'Carmine Robes' ] = 'Armor,11,14,+2 Defense to Scarlett';
titles[ 'Magicite Locket' ] = 'Amulet,12,8,+2 Energy when Scarlett is Equipped';
titles[ 'Stormwind Saber' ] = 'Weapon,11,16,+2 Attack to Kaylen';
titles[ 'Windswept Crown' ] = 'Helmet,8,12,+1% crit when Kaylen is equipped';
titles[ 'Azure Armor' ] = 'Armor,14,10,+2 Defense to Kaylen';
titles[ 'Righteousness' ] = 'Weapon,14,11,+2 attack to Minerva';
titles[ 'Illvasan Crest' ] = 'Shield,10,12,+2 defense to Minerva';
titles[ 'Titan Helm' ] = 'Helmet,11,7,+2 Max Stamina to player when Minerva is equipped';
titles[ 'Moonclaw' ] = 'Weapon,12,12,+0.5% Critical when Fenris is equipped';
titles[ 'Lycan Armguard' ] = 'Armor,11,11,+0.5% Critical when Fenris is equipped';
titles[ 'Wolfbane Trinket' ] = 'Amulet,10,10,+2 attack to player when Fenris is equipped';
titles[ 'Incarnation' ] = 'Weapon,11,11,+1 attack to Lailah';
titles[ 'Platinus Armor' ] = 'Armor,9,11,+1 defense to Lailah';
titles[ 'Harmony' ] = 'Shield,8,11,damage received reduced by 1 when Lailah is equipped';
titles[ 'Blood Vestment' ] = 'Armor,10,10,+1 defense to Slayer';
titles[ 'Slayer\'s Embrace' ] = 'Gloves,5,6,+1 energy when Slayer is equipped';
titles[ 'Vampiric Blade' ] = 'Weapon,10,12,+1 attack to Slayer';
titles[ 'Ogre Raiments' ] = 'Armor,11,8,+1 defense to Gorlak';
titles[ 'Gorlak\'s Cudgel' ] = 'Weapon,10,10,+1 attack to Gorlak';
titles[ 'All-Seeing Eye' ] = 'Amulet,11,8,+1 stamina when Gorlak is equipped';
titles[ 'Retribution Helm' ] = 'Helmet,9,8,damage received reduced by 1 when Dexter is equipped';
titles[ 'Retribution Plate' ] = 'Armor,8,11,+1 defense to Dexter';
titles[ 'Gorlak\'s Axe' ] = 'Weapon,11,8,+1 attack to Dexter';
titles[ 'Ancient Tome' ] = 'Shield,7,12,+1 defense to Lyra';
titles[ 'Rune Blade' ] = 'Weapon,10,9,+1 attack to Lyra';
titles[ 'Heart of Elos' ] = 'Amulet,10,8,+1 stamina when Lyra is equipped';
titles[ 'Grimshaw Jewel' ] = 'Amulet,9,9,+1 energy when Aria is equipped';
titles[ 'Emerald Saber' ] = 'Weapon,9,10,+1 attack to Aria';
titles[ 'Frostfire Staves' ] = 'Weapon,10,8';
titles[ 'Robe of Insight' ] = 'Armor,10,7';
titles[ 'Ancient Veil' ] = 'Helmet,9,7';
titles[ 'Star Shield' ] = 'Shield,7,11';
titles[ 'The Disembowler' ] = 'Weapon,17,12,+2 attack to Kataan';
titles[ 'Tribal Crest' ] = 'Amulet,11,9,+1% crit when Kataan is equipped';
titles[ 'Hunters Raiments' ] = 'Armor,14,11,+2 defense to Kataan';
titles[ 'Lifebane' ] = 'Weapon,14,16,+2 attack to Adriana';
titles[ 'Death Ward' ] = 'Armor,12,14,+2 attack to Adriana';
titles[ 'Skullstone Relic' ] = 'Amulet,10,11,+2% crit while Adriana is equipped';
titles[ 'Rift Blade' ] = 'Weapon,15,15,+2 Attack to Godric';
titles[ 'Spellweaver Cloak' ] = 'Armor,13,13,+2 Defense to Godric';
titles[ 'Time Shift' ] = 'Magic,9,10,+2 Stamina when Godric is equipped';
//Reinforcements Equipment
titles[ 'Crushing Blade' ] = 'Weapon,6,6,+1 Attack to Darius';
titles[ 'Terran Plate' ] = 'Armor,7,4,+8 Health when Darius is equipped';
titles[ 'Crown of Darius' ] = 'Helmet,8,7,+2 Stamina when Darius is equipped';
titles[ 'Aegis of Earth' ] = 'Shield,9,7,+1 Defense to Darius';
titles[ 'Mythril Fists' ] = 'Gloves,9,10,+3 Stamina when Darius is equipped';
titles[ 'Wolfwood Amulet' ] = 'Amulet,13,7,+1% Critical when Darius is equipped';
titles[ 'Crusader Dagger' ] = 'Weapon,6,2';
titles[ 'Crusader Amulet' ] = 'Amulet,4,9';
titles[ 'Crusader Gauntlet' ] = 'Gloves,5,11';
titles[ 'Crusader Shield' ] = 'Shield,9,8';
titles[ 'Crusader Helm' ] = 'Helmet,8,8';
titles[ 'Crusader Armor' ] = 'Armor,8,9';
titles[ 'Crusader Blade' ] = 'Weapon,10,10';
//Alchemy Equipment
//Ingredients
titles[ 'Avenging Mace' ] = 'Weapon,16,13,Alchemy: Blood Zealot';
titles[ 'Blood Flask' ] = 'Amulet,20,20,+2 Stamina to Morrigan,Alchemy: Blood Zealot';
titles[ 'Zealot Robes' ] = 'Armor,25,12,Alchemy: Blood Zealot';
titles[ 'Dragon Talon' ] = 'Weapon,6,6,Alchemy: Helm of Dragon Power';
titles[ 'Dragon Scale' ] = 'Shield,4,9,Alchemy: Helm of Dragon Power';
titles[ 'Jewel of Fire' ] = 'Amulet,7,6,Alchemy: Helm of Dragon Power';
titles[ 'Atlantean Shield' ] = 'Shield,7,7,Alchemy: Atlantean Forcefield';
titles[ 'Atlantean Armor' ] = 'Armor,4,10,Alchemy: Atlantean Forcefield';
titles[ 'Atlantean Spear' ] = 'Weapon,7,7,Alchemy: Atlantean Forcefield';
titles[ 'Atlantean Gauntlet' ] = 'Gloves,4,4,Alchemy: Atlantean Forcefield';
titles[ 'Angelic Plate' ] = 'Armor,3,3,Alchemy: Angelica';
titles[ 'Castle Rampart' ] = 'Armor,0,0,Summon: Battle of the Dark Legion';
titles[ 'Orc War Axe' ] = 'Weapon,4,1,Alchemy: Avenger';
titles[ 'Ironhart\'s Might' ] = 'Weapon,5,1,Alchemy: Judgement';
titles[ 'Ironhart' ] = '[actually Ironharts\'s Might] Weapon,5,1,Alchemy: Judgement';
titles[ 'Oathkeeper' ] = 'Weapon,7,4,Alchemy: Leon Ironhart';
titles[ 'Defender' ] = 'Shield,7,10,Alchemy: Leon Ironhart and Holy Plate';
titles[ 'Paladin\'s Oath' ] = 'Amulet,7,8,Alchemy: Leon Ironhart';
titles[ 'Holy Gauntlets' ] = 'Gloves,4,6,Alchemy: Leon Ironhart and Holy Plate';
titles[ 'Pauldrons of Light' ] = 'Armor,5,11,Alchemy: Leon Ironhart and Holy Plate';
titles[ 'Wolf Helm' ] = 'Helmet,2,1,Alchemy: Whisper Bow';
titles[ 'Feral Staff' ] = 'Shield,2,2,Alchemy: Whisper Bow';
titles[ 'Feral Armor' ] = 'Armor,1,2,Alchemy: Whisper Bow';
titles[ 'Green Emerald Shard' ] = 'Amulet,1-2,1-2,Alchemy: Golden Hand';
titles[ 'Rusty Gloves' ] = 'Gloves,1,1,Alchemy: Golden Hand';
titles[ 'Frost Tear Jewel' ] = 'Amulet,2,2,Alchemy: Frost Tear Dagger';
titles[ 'Blue Lotus Petal' ] = 'Amulet,0,0,Alchemy: Frost Tear Dagger';
titles[ 'Ice Dagger' ] = 'Shield,2,2,Alchemy: Frost Tear Dagger';
titles[ 'Sun Amulet' ] = 'Amulet,1,3,Alchemy: Morningstar';
titles[ 'Hour Glass' ] = 'Shield,0,0,Alchemy: Morningstar';
titles[ 'Silver Mace' ] = 'Weapon,2,4,Alchemy: Morningstar';
titles[ 'Rusted Helm' ] = 'Helmet,3,2,Alchemy: Drake Helm';
titles[ 'Gold Bar' ] = 'Amulet,0,0,Alchemy: Drake Helm';
titles[ 'Dragon Tooth Amulet' ] = 'Amulet,3,1,Alchemy: Drake Helm';
titles[ 'Magic Mushrooms' ] = 'Amulet,0,0,Alchemy: Mystic Armor';
titles[ 'Silver Bar' ] = 'Amulet,0,0,Alchemy: Mystic Armor';
titles[ 'Rusty Armor' ] = 'Armor,2,3,Alchemy: Mystic Armor';
titles[ 'Earth Shard' ] = 'Amulet,1-3,1-3,Alchemy: Earth Orb';
titles[ 'Metal Ring' ] = 'Amulet,1,3,Alchemy: Ring of Bahamut';
titles[ 'Ruby Ore' ] = 'Amulet,3,1,Alchemy: Ring of Bahamut';
titles[ 'Dragon Ashes' ] = 'Amulet,0,0,Alchemy: Ring of Bahamut';
titles[ 'Serenes Arrow' ] = 'Shield,1,1,+1% Critical when Serene is equipped,Alchemy: Serene';
titles[ 'Sword of Might' ] = 'Weapon,3,1,+1 Attack to Elin,Alchemy: Elin';
titles[ 'Epaulets of Might' ] = 'Armor,0,4,Alchemy: Elin';
titles[ 'Shield of Might' ] = 'Shield,1,3,+1 Defense to Elin,Alchemy: Elin';
titles[ 'Gauntlets of Might' ] = 'Gloves,2,2,+1 Stamina when Elin is equipped,Alchemy: Elin';
titles[ 'Apocalypse Band' ] = 'Amulet,10,15,Alchemy: Signet of Keira, Signet of Lotus, Signet of Sylvana, Signet of Azriel';
//Recipes
titles[ 'Dragonbane' ] = 'Weapon,5,5';
titles[ 'Helm of Dragon Power' ] = 'Helmet,30,30';
titles[ 'Serpentine Shield' ] = 'Shield,4,6,Summon: Cronus';
titles[ 'Poseidons Horn' ] = 'Amulet,7,3';
titles[ 'Trident of the Deep' ] = 'Weapon,6,3';
titles[ 'Avenger' ] = 'Weapon,14,0';
titles[ 'Judgement' ] = 'Weapon,10,5,Alchemy: Holy Plate';
titles[ 'Holy Plate' ] = 'Armor,18,20';
titles[ 'Whisper Bow' ] = 'Weapon,6,4';
titles[ 'Golden Hand' ] = 'Gloves,2,5';
titles[ 'Excalibur' ] = 'Weapon,25,12,Alchemy: Soulforge';
titles[ 'Frost Tear Dagger' ] = 'Shield,5,5';
titles[ 'Morningstar' ] = 'Weapon,3,7';
titles[ 'Drake Helm' ] = 'Helmet,4,3,Summon: Deathrune Campaign Raid';
titles[ 'Tempered Steel' ] = 'Gloves,6,5';
titles[ 'Mystic Armor' ] = 'Armor,2,5';
titles[ 'Earth Orb' ] = 'Amulet,3,4,Summon Genesis';
titles[ 'Ice Orb' ] = 'Amulet,4,4,Summon: Ragnarok';
titles[ 'Glacial Blade' ] = 'Weapon,6,3';
titles[ 'Ring of Bahamut' ] = 'Amulet,5,2';
titles[ 'Assassins Blade' ] = 'Weapon,7,4,+3 Attack to Strider';
titles[ 'Ring of Life' ] = 'Amulet,4,5,+3 Energy when Elizabeth Lione is equipped';
titles[ 'Shield of Dante' ] = 'Shield,4,7,+3 Defense when Dante is equipped';
titles[ 'Garlans Battlegear' ] = 'Armor,4,7,+5 Defense when Garlan is equipped';
titles[ 'Draganblade' ] = 'Weapon,7,3,+3 Attack when Dragan is equipped';
titles[ 'Sophias Battlegarb' ] = 'Armor,4,7,+4 Energy when Sophia is equipped';
titles[ 'Transcendence' ] = 'Amulet,46,36';
titles[ 'Titania Bow' ] = 'Weapon,6,4,+3 Attack to Titania';
titles[ 'Zenarean Crest' ] = 'Shield,4,7,Summon: War of the Red Plains';
titles[ 'Bloodblade' ] = 'Weapon,5,5,+1 Attack to Vanquish';
titles[ 'Soul Crusher' ] = 'Gloves,16,16';
titles[ 'Soulforge' ] = 'Weapon,35,35,+1% Crit when Strider, Dragan, Sophia or Penelope is equipped';
titles[ 'Cid Saber' ] = 'Weapon,6,5,+2 Attack to Cid';
titles[ 'Scepter of Light' ] = 'Weapon,2,8,+3 Defense when Penelope is equipped';
titles[ 'Crimson Dagger' ] = 'Weapon,3,7,+3 energy when Elena is equipped';
titles[ 'Mystical Dagger' ] = 'Weapon,5,5,+3 Attack when Edea is equipped';
//Quest Equipment
titles[ 'Amulet of Cefka' ] = 'Amulet,6,12,Alchemy: Excalibur';
titles[ 'Holy Avenger' ] = 'Weapon,12,12,Alchemy: Excalibur';
titles[ 'Sword of the Faithless' ] = 'Weapon,7,7,Alchemy: Cartigan';
titles[ 'Crystal of Lament' ] = 'Amulet,1,3,Alchemy: Cartigan';
titles[ 'Soul Eater' ] = 'Gloves,4,5,Alchemy: Cartigan';
titles[ 'Signet of Keira' ] = 'Amulet,20,35,Gain +3 additional attack and defense as Warrior in Guild Battles when Keira is equipped';
titles[ 'Signet of Lotus' ] = 'Amulet,40,15,Inflict +30 additional damage upon victory as Rogue in Guild Battles when Lotus is equipped';
titles[ 'Signet of Sylvana' ] = 'Amulet,35,20,Inflict +1 additional damage upon victory as Mage in Guild Battles when Sylvana is equipped';
titles[ 'Signet of Azriel' ] = 'Amulet,15,40,Heal +1 additional health upon victory as Cleric in Guild Battles when Azriel is equipped';
titles[ 'Stormbinder' ] = 'Gloves,18,18';
titles[ 'Lava Orb' ] = 'Amulet,3,4,Summon: Gehenna, The Fire Elemental';
titles[ 'Crown of Flames' ] = 'Helmet,33,32';
titles[ 'Cid Helm' ] = 'Helmet,3,7,+3 Defense to Cid';
titles[ 'Silverlight Tome' ] = 'Shield,3,8,+3 Defense to Elizabeth Lione';
titles[ 'Fiery Blade' ] = 'Weapon,6,3,+2 Attack to Dante';
titles[ 'Zarevok Plate' ] = 'Armor,4,9,+3 defense to Zarevok';
titles[ 'Staff of Vigor' ] = 'Weapon,8,5,+4 Stamina to Elizabeth Lione';
titles[ 'Araxin Blade' ] = 'Weapon,7,8,+1 Attack to Araxis';
titles[ 'Dragan Protector' ] = 'Shield,5,9,+5 Defense to Dragan';
titles[ 'Nautical Trident' ] = 'Weapon,9,5,+2 Attack to Nautica';
titles[ 'Air Orb' ] = 'Amulet,3,4,Summon: Valhalla, Air Elemental';
titles[ 'Assassins Cloak' ] = 'Armor,7,7,+5 Defense to Strider';
titles[ 'Aeris Dagger' ] = 'Weapon,4,10,+5 Attack to Aeris';
titles[ 'Frostwolf Axe' ] = 'Weapon,10,5,+1 Attack to Shino';
//Other Equipment
titles[ 'Battle Spear' ] = 'Weapon,2,1';
titles[ 'Flame Bow' ] = 'Weapon,3,0';
titles[ 'Iron Axe' ] = 'Weapon,3,0';
titles[ 'Helenas Memento' ] = 'Amulet,1,0';
titles[ 'Atlantean Helm' ] = 'Helmet,4,5';
titles[ 'Atlantean Sword' ] = 'Weapon,7,3';
titles[ 'Atlantean Mace' ] = 'Weapon,6,3';
titles[ 'Spartan Helm' ] = 'Helmet,1,1';
titles[ 'Spartan Shield' ] = 'Shield,0,2';
titles[ 'Spartan Spear' ] = 'Weapon,2,0';
titles[ 'Sword of the Sea' ] = 'Weapon,5,4';
titles[ 'Celestas Devotion' ] = 'Weapon,22,44,+3% Critical when Celesta is equipped';
//Monster Equipment
//Gildamesh Equipment
titles[ 'Gildamesh\'s Charm' ] = 'Amulet,2,1';
titles[ 'Gildamesh\'s Gauntlet' ] = 'Gloves,2,1';
titles[ 'Gildamesh\'s War Axe' ] = 'Weapon,6,0';
titles[ 'Gildamesh\'s War Helm' ] = 'Helmet,6,1';
titles[ 'Gildamesh\'s War Plate' ] = 'Armor,5,1';
//Colossal Equipment
titles[ 'Colossal Axe' ] = 'Weapon,6,1';
titles[ 'Colossal Armor' ] = 'Armor,2,6';
titles[ 'Colossal Sword' ] = 'Weapon,3,6';
//Sylvanas Equipment
titles[ 'Evergreen Cloak' ] = 'Armor,2,6';
titles[ 'Elven Crown' ] = 'Helmet,5,4 or Helmet,2,5,+4 Defense when Aeris is equipped';
titles[ 'Enchanted Lantern' ] = 'Amulet,2,12';
titles[ 'Elven Staff' ] = 'Weapon,7,1';
titles[ 'Faerie Wings' ] = 'Armor,6,2';
//Mephistopheles Equipment
titles[ 'Hellkite Armor' ] = 'Armor,5,5';
titles[ 'Hellkite Bracer' ] = 'Gloves,5,3';
titles[ 'Hellkite Shield' ] = 'Shield,2,7';
titles[ 'Hellkite Sword' ] = 'Weapon,5,6';
//Keira Equipment
titles[ 'The Dreadnought' ] = 'Shield,3,7,Alchemy: Keira';
titles[ 'Dreadnought Greatsword' ] = 'Weapon,7,4,Alchemy: Keira';
titles[ 'Dreadnought Horns' ] = 'Helmet,6,3,Alchemy: Keira';
titles[ 'Dreadnought Plate' ] = 'Armor,8,6,Alchemy: Keira';
titles[ 'Keira\'s Soul' ] = 'Amulet,6,2,Alchemy: Keira';
//Lotus Equipment
titles[ 'Death Touch Gauntlet' ] = 'Gloves,12,12,+5 attack to Lotus Ravenmoore,Alchemy: Soul Crusher';
titles[ 'Demonic Armor' ] = 'Armor,5,8';
titles[ 'Demonic Mask' ] = 'Helmet,6,5';
titles[ 'Demonic Sword' ] = 'Weapon,8,5';
titles[ 'Onslaught' ] = 'Weapon,15,1';
titles[ 'Raven Cloak' ] = 'Armor,10,8';
//Genesis Equipment
titles[ 'Bramble Blade' ] = 'Weapon,10,8';
titles[ 'Genesis Sword' ] = 'Weapon,20,30,+1 attack to Medius,Alchemy: Medius';
titles[ 'Rockthorn Bow' ] = 'Weapon,12,11';
titles[ 'Hands of Bounty' ] = 'Gloves,10,9';
titles[ 'Plated Earth' ] = 'Armor,8,11';
titles[ 'Terra\'s Crown' ] = 'Helmet,10,7,+1 energy to Terra';
titles[ 'Terra\'s Guard' ] = 'Shield,10,10,+3 defense to Terra';
titles[ 'Terra\'s Heart' ] = 'Amulet,6,8,+1% critical when Terra is equipped';
//Skaar Equipment
titles[ 'Deathrune Hellplate' ] = 'Armor,18,27,+1% critical when Skaar is equipped';
titles[ 'Deathrune Signet' ] = 'Amulet,9,6,+4 attack to Skaar';
titles[ 'Deathshield' ] = 'Shield,24,24,+2 stamina when Skaar is equipped';
titles[ 'Hands of Darkness' ] = 'Gloves,5,4';
titles[ 'Helm of Fear' ] = 'Helmet,9,9';
titles[ 'Deathrune Blade' ] = 'Weapon,11,14';
titles[ 'Soul Catcher' ] = 'Amulet,8,7';
titles[ 'Punisher' ] = 'Weapon,14,11';
//Ragnarok Equipment
titles[ 'Arctic Blade' ] = 'Weapon,9,13';
titles[ 'Frost Edge' ] = 'Weapon,17,10,+2 attack to Lilith & Riku';
titles[ 'Frozen Signet' ] = 'Amulet,8,8';
titles[ 'Glacial Helm' ] = 'Helmet,10,9,+3 energy when Lilith & Riku is equipped';
titles[ 'Glacial Raiments' ] = 'Armor,11,11';
titles[ 'Icicle Lance' ] = 'Weapon,12,14';
titles[ 'Icy Handguards' ] = 'Gloves,5,5';
titles[ 'Thawing Star' ] = 'Amulet,18,17,+2 defense to Lilith & Riku';
//Bahamut Equipment
titles[ 'Blazerune Necklace' ] = 'Amulet,9,8';
titles[ 'Blazerune Ring' ] = 'Amulet,7,10';
titles[ 'Burning Blade' ] = 'Weapon,16,13,Alchemy: Volcanic Knight';
titles[ 'Hellforge Gauntlets' ] = 'Gloves,14,6,Alchemy: Volcanic Knight';
titles[ 'Hellforge Plate' ] = 'Armor,25,12,Alchemy: Volcanic Knight';
titles[ 'Inferno Shield' ] = 'Shield,15,10,Alchemy: Volcanic Knight';
titles[ 'Lavareign Axe' ] = 'Weapon,12,17';
titles[ 'Volcanic Helm' ] = 'Helmet,32,14,Alchemy: Volcanic Knight';
//Azriel Equipment
titles[ 'Archangels Battlegear' ] = 'Armor,26,14';
titles[ 'Celestial Helm' ] = 'Helmet,11,11';
titles[ 'Deliverance' ] = 'Weapon,16,16';
titles[ 'Purgatory' ] = 'Shield,30,30';
titles[ 'Soulless Pendant' ] = 'Amulet,25,25,Alchemy: Transcendence';
//Raid Equipment
titles[ 'Frost Armor' ] = 'Armor,4,3';
titles[ 'Eye of the Triangle' ] = 'Amulet,3,4';
titles[ 'Platinum Hands' ] = 'Gloves,3,4';
titles[ 'Great Halberd' ] = 'Weapon,8,7';
titles[ 'Frost Helm' ] = 'Helmet,7,5';
//Arena Equipment
titles[ 'Swordsmans Plate' ] = 'Armor,25,12';
titles[ 'Warriors Insignia' ] = 'Amulet,18,12';
titles[ 'Meat Cleaver' ] = 'Weapon,44,22,+3 attack, +3 defense to Zarevok when equipped';
titles[ 'Swordsman Helm' ] = 'Helmet,15,15';
titles[ 'Warrior Gauntlet' ] = 'Gloves,9,9';
titles[ 'Hero Insignia' ] = 'Amulet,20,15';
titles[ 'Gladiator Plate' ] = 'Armor,28,14';
titles[ 'Vanguard Helm' ] = 'Helmet,35,35';
titles[ 'Brawler Gloves' ] = 'Gloves,8,8';
titles[ 'Swordsman Battlegear' ] = 'Armor,10,15';
titles[ 'Warriors Blade' ] = 'Weapon,30,19';
titles[ 'Gladiator Pendant' ] = 'Amulet,30,26';
titles[ 'Vanguard Doomhelm' ] = 'Helmet,45,45';
//War of the Red Plains Equipment
titles[ 'Elemental Garb' ] = 'Armor,18,14';
titles[ 'Mark of the Empire' ] = 'Amulet,12,12';
titles[ 'Zenarean Dagger' ] = 'Weapon,20,19';
titles[ 'Zenarean Bow' ] = 'Weapon,14,18';
titles[ 'Zenarean Chainmail' ] = 'Armor,14,18';
titles[ 'Virtue of Temperance' ] = 'Gloves,7,4,+1% critical when Hyperion is equipped,Alchemy: Hyperion';
titles[ 'Virtue of Justice' ] = 'Weapon,25,25,+1 Attack to Hyperion,Alchemy: Hyperion';
titles[ 'Virtue of Fortitude' ] = 'Helmet,14,32,+1 Defense to Hyperion,Alchemy: Hyperion';
titles[ 'Holy Smite' ] = 'Magic,12,12';
titles[ 'Plate of the Ages' ] = 'Armor,20,45';
titles[ 'Nether Soulstone' ] = 'Alchemy: Soul Crusher';
titles[ 'Orc Champion' ] = 'Soldier,50,50';
//Alpha Mephistopheles Equipment
titles[ 'Armageddon Pendant' ] = 'Amulet,23,18,+2 Attack to Araxis';
titles[ 'Belt of Abaddon' ] = 'Armor,14,18,+2 Attack to Crom';
titles[ 'Fist of Abaddon' ] = 'Gloves,12,14,+1 Stamina when Mephistopheles is equipped';
titles[ 'Hellblade' ] = 'Weapon,30,20,+5 Attack to Chimerus,Alchemy: Soulforge';
titles[ 'Hellcore Defender' ] = 'Shield,18,10';
titles[ 'Infernal Helmet' ] = 'Helmet,11,11';
titles[ 'Infernal Plate' ] = 'Armor,12,12';
titles[ 'Infernal Sword' ] = 'Weapon,16,16';
titles[ 'Blade of Arielle' ] = 'Weapon,9,9,+3 Attack to Arielle';
titles[ 'Shield of Arielle' ] = 'Shield,6,6,+2 Defense to Arielle';
titles[ 'Armor of Arielle' ] = 'Armor,7,7,+1 Defense to Arielle';
//Gehenna Equipment
titles[ 'Bonecrusher' ] = 'Weapon,18,21,+2 Attack to Sano';
titles[ 'Galvanized Helm' ] = 'Helmet,11,13,+2 Defense to Garlan';
titles[ 'Gauntlet of Fire' ] = 'Gloves,13,9,+2 Stamina when Dante is equipped';
titles[ 'Hephaestus Sword' ] = 'Weapon,28,22';
titles[ 'Lava Plate' ] = 'Armor,15,24,+2 Defense to Sano';
titles[ 'Tooth of Gehenna' ] = 'Amulet,18,23';
titles[ 'Tyrant Crown' ] = 'Helmet,22,20,Alchemy: Crown of Flames';
//Lion Rebellion / Aurelius Equipment
titles[ 'Caldonian Blade' ] = 'Weapon,13,16,+2 attack to Garlan';
titles[ 'Caldonian Band' ] = 'Amulet,10,14,+3 max stamina when Garlan is equipped';
titles[ 'Heart of the Pride' ] = 'Shield,20,44';
titles[ 'Lion Fang' ] = 'Weapon,24,22';
titles[ 'Lion Scar Helm' ] = 'Helmet,9,14';
titles[ 'Lion Scar Plate' ] = 'Armor,33,18';
titles[ 'Serpentine Ring' ] = 'Amulet,20,21';
//Valhalla Equipment
titles[ 'Hand of Valhalla' ] = 'Gloves,17,14,Alchemy: Stormbinder';
titles[ 'Stormcrusher' ] = 'Weapon,35,20';
titles[ 'Vortex Seal' ] = 'Amulet,11,15';
titles[ 'Eye of the Storm' ] = 'Amulet,28,30';
titles[ 'Braving the Storm' ] = 'Armor,16,14';
titles[ 'Lance of Valhalla' ] = 'Weapon,15,15';
titles[ 'Aegis of the Winds' ] = 'Shield,28,22';
titles[ 'Windchaser Helm' ] = 'Helmet,29,29';
titles[ 'Empyrean Plate' ] = 'Armor,10,6';
titles[ 'Opal Pendant' ] = 'Amulet,5,5';
titles[ 'Platinum Plate' ] = 'Armor,6,10';
titles[ 'Rockcrusher Axe' ] = 'Weapon,14,10';
titles[ 'Shining Greatsword' ] = 'Weapon,10,14';
titles[ 'Valerian Signet' ] = 'Amulet,6,3';
//Arachnid Equipment
titles[ 'Arachnid Slayer' ] = 'Weapon,6,14';
titles[ 'Shadowsilk Armor' ] = 'Armor,10,4';
//Karn Equipment
titles[ 'Minotaurs Battle Armor' ] = 'Armor,3,4,+1 defense to Karn';
titles[ 'Pendant of the Bull' ] = 'Amulet,1,2,+3 stamina when Karn is equipped';
titles[ 'Skullcrush Mace' ] = 'Weapon,5,2,+1 attack to Karn';
//(Alpha) Vincent Equipment
titles[ 'Exsanguinator' ] = 'Weapon,32,22,+1 Attack to Vincent,Alchemy: Vincent';
titles[ 'Bloodlord Plate' ] = 'Armor,26,14,+1 Defense to Vincent,Alchemy: Vincent';
titles[ 'Bloodwell Pendant' ] = 'Amulet,28,28,+4 Energy when Vincent is equipped,Alchemy: Vincent';
titles[ 'Crimson Cloak' ] = 'Armor,8,20,+3 Stamina when Vincent is equipped,Alchemy: Vincent';
//Corvintheus Equipment
titles[ 'Ring of Honor' ] = 'Amulet,18,25';
titles[ 'Righteous Helm' ] = 'Helmet,28,30';
titles[ 'The Reckoning' ] = 'Weapon,40,28';
titles[ 'Honors Defender' ] = 'Shield,25,30';
titles[ 'Glorious Plate' ] = 'Armor,20,31';
titles[ 'Amulet of Courage' ] = 'Amulet,25,18';

//Magic
//Battle Rank Magic
titles[ 'Champions Aura' ] = 'Magic,3,3';
titles[ 'Royal Seal' ] = 'Magic,5,5';
//Quest Magic
titles[ 'Lightning Storm' ] = 'Magic,15,7';
titles[ 'Energy Bolt' ] = 'Magic,1,1';
titles[ 'Orb of Gildamesh' ] = 'Magic,0,0,Summon: Gildamesh';
titles[ 'Colossal Orb' ] = 'Magic,0,0,Summon: Colossus of Terra';
titles[ 'Sylvanas Orb' ] = 'Magic,0,0,Summon: Sylvanas';
titles[ 'Orb of Mephistopheles' ] = 'Magic,0,0,Summon: Mephistopheles';
titles[ 'Orb of Keira' ] = 'Magic,0,0,Summon: Keira';
titles[ 'Lotus Orb' ] = 'Magic,0,0,Summon: Lotus';
titles[ 'Orb of Skaar Deathrune' ] = 'Magic,0,0,Summon: Skaar Deathrune';
titles[ 'Orb of Azriel' ] = 'Magic,0,0,Summon: Azriel';
titles[ 'Orb of Aurelius' ] = 'Magic,0,0,Summon: Lion\'s Rebellion';
titles[ 'Orb of Alpha Mephistopheles' ] = 'Magic,0,0,Summon: Alpha Mephistopheles';
//Demi-Magic
titles[ 'Tempest Storm' ] = 'Magic,17,10';
titles[ 'Berserker Frenzy' ] = 'Magic,6,7';
titles[ 'Holy Shield' ] = 'Magic,4,2';
titles[ 'Moonfall Aura' ] = 'Magic,4,2';
titles[ 'Blessing of Nature' ] = 'Magic,12,16';
titles[ 'Avengers Oath' ] = 'Magic,5,4';
//Favor Point Magic
//Alpha Chest
titles[ 'Angel Fire' ] = 'Magic,8,7';
titles[ 'Demonic Circle' ] = 'Magic,9,6';
titles[ 'Fireball' ] = 'Magic,5,0';
titles[ 'Lightning Bolt' ] = 'Magic,8,6';
titles[ 'Wolf Spirit' ] = 'Magic,7,5';
//Vanguard Chest
titles[ 'Helenas Inferno' ] = 'Magic,8,7';
titles[ 'Maelstrom' ] = 'Magic,7,8 or Magic,16,16';
//Onslaught Chest
titles[ 'Angels Crusade' ] = 'Magic,6,10';
//Oracle Specials
titles[ 'Backdraft' ] = 'Magic,12,7,+1% critical when Kaiser is equipped';
titles[ 'Mind Control' ] = 'Magic,9,8,+1 defense to Aria';
titles[ 'Arcane Vortex' ] = 'Magic,13,11,+1 Attack to Dolomar';
//Alchemy Magic
titles[ 'Dragon Charm' ] = 'Magic,3,1';
titles[ 'Wall of Fire' ] = 'Magic,7,7,Alchemy: Helm of Dragon Power';
titles[ 'Demon Strength' ] = 'Magic,8,2,Alchemy: Keira';
titles[ 'Atlantean Forcefield' ] = 'Magic,10,17';
titles[ 'Angelic Blessing' ] = 'Magic,0,2,Summon: Battle of the Dark Legion';
titles[ 'Heros Resolve' ] = 'Magic,2,0,Summon: Battle of the Dark Legion';
titles[ 'Deadly Strike' ] = 'Magic,2,1';
titles[ 'Invulnerability' ] = 'Magic,5,5';
titles[ 'Wrath of Vanquish' ] = 'Magic,4,2,+2 Attack to Vanquish';
titles[ 'Shadow Blast' ] = 'Magic,5,1,+3 Attack to Morrigan';
//Arena Magic
titles[ 'Gladiator Strength' ] = 'Magic,25,12';
titles[ 'Whirlwind' ] = 'Magic,28,17';
titles[ 'Heroic Inspiration' ] = 'Magic,25,30';
//War Rank Magic
titles[ 'Arcane Blast' ] = 'Magic,4,4';
//Miscellaneous Magic
titles[ 'Magic Missile' ] = 'Magic,1,0';
titles[ 'Greater Fireball' ] = 'Magic,6,1';
titles[ 'Hellkite Flames' ] = 'Magic,8,6';
titles[ 'Stone Skin' ] = 'Magic,7,7';
titles[ 'Pestilence' ] = 'Magic,7,9';
titles[ 'Frost Bolt' ] = 'Magic,12,25,+1 Defense to Medius,Alchemy: Medius';
titles[ 'Gladiators Strength' ] = 'Magic,25,12';
titles[ 'Skullfire' ] = 'Magic,16,16';
titles[ 'Angelic Rebirth' ] = 'Magic,17,17,+2 Attack to Azriel,Alchemy: Transcendence';
titles[ 'Consecration' ] = 'Magic,14,14';
titles[ 'Holy Aura' ] = 'Magic,10,10';
titles[ 'Mark of the Wolf' ] = 'Magic,6,8,+2 Energy when Darius is equipped';
titles[ 'Breath of Fire' ] = 'Magic,15,10,+1 Attack to Dante';
titles[ 'Immolation' ] = 'Magic,10,10';
titles[ 'Solar Desolation' ] = 'Magic,13,13';
//Alpha Vincent Magic
titles[ 'Vincents Soul' ] = 'Magic,5,5,Alchemy: Vincent';
titles[ 'Swarm of Darkness' ] = 'Magic,20,16,Alchemy: Vincent';
//Corvintheus Magic
titles[ 'Divine Blast' ] = 'Magic,32,20';

//Units
//Regular Units
titles[ 'Footman' ] = 'Soldier,1,1';
titles[ 'Ranger' ] = 'Soldier,2,1';
titles[ 'Knight' ] = 'Soldier,3,2';
titles[ 'Cleric' ] = 'Soldier,1,5';
titles[ 'Paladin' ] = 'Soldier,3,4';
titles[ 'Wizard' ] = 'Soldier,3,5';
titles[ 'Tree Ent' ] = 'Soldier,4,5';
titles[ 'Angel' ] = 'Soldier,7,7';
titles[ 'Dragon' ] = 'Soldier,16,14';
titles[ 'Phoenix' ] = 'Soldier,20,16';
//Epic Units
titles[ 'Seraphim Angel' ] = 'Soldier,24,21';
//Battle Point Units
titles[ 'Valor Knight' ] = 'Soldier,22,18';
titles[ 'Archangel' ] = 'Soldier,25,20';
//War Point Units
titles[ 'Barbarian Captain' ] = 'Soldier,23,20';
//Gift Units
titles[ 'Gift Paladin' ] = 'Soldier,3,4';
titles[ 'Gift Angel' ] = 'Soldier,7,7';
titles[ 'Gift Dragon' ] = 'Soldier,16,14';
titles[ 'Gift Phoenix' ] = 'Soldier,20,16';
titles[ 'Gift Knight' ] = 'Soldier,3,2';
titles[ 'Gift Tree Ent' ] = 'Soldier,4,5';
titles[ 'Gift Cleric' ] = 'Soldier,1,5';
titles[ 'Gift Wizard' ] = 'Soldier,3,5';
titles[ 'Gift Footman' ] = 'Soldier,1,1';
titles[ 'Gift Ranger' ] = 'Soldier,2,1';
//Favor Point Units
//Alpha Chest
titles[ 'Air Elemental' ] = 'Soldier,14,12';
titles[ 'Elven Blade' ] = 'Soldier,14,11';
titles[ 'Golden Fang' ] = 'Soldier,14,12';
titles[ 'Shadow Assassin' ] = 'Soldier,15,13';
titles[ 'Shadow Wraith' ] = 'Soldier,13,11';
titles[ 'Templar Knight' ] = 'Soldier,15,14';
titles[ 'Water Elemental' ] = 'Soldier,14,15';
//Vanguard Chest
titles[ 'Phantasm' ] = 'Soldier,14,14';
titles[ 'Shadow Panther' ] = 'Soldier,15,13';
//Onslaught Chest
titles[ 'Griffin Rider' ] = 'Soldier,33,29';
titles[ 'Orc Marauder' ] = 'Soldier,32,27';
//Oblivion Chest
titles[ 'Dwarven Sentry' ] = 'Soldier,29,33';
titles[ 'Monk Warrior' ] = 'Soldier,30,30';
titles[ 'Illvasan Elite' ] = 'Soldier,27,32';
titles[ 'Frost Tiger' ] = 'Soldier,26,30';
//Demi-Quest Units
titles[ 'Barbarian' ] = 'Soldier,10,6';
titles[ 'Black Knight' ] = 'Soldier,5,5';
titles[ 'Death Knight' ] = 'Soldier,9,6';
titles[ 'Fire Elemental' ] = 'Soldier,8,5';
titles[ 'Griffin' ] = 'Soldier,6,6';
titles[ 'Mercenary' ] = 'Soldier,5,3';
titles[ 'Shadow' ] = 'Soldier,7,5';
titles[ 'Orc Grunt' ] = 'Soldier,7,5';
titles[ 'Skeleton Warrior' ] = 'Soldier,4,4';
titles[ 'Lich' ] = 'Soldier,7,5';
titles[ 'Vampire' ] = 'Soldier,8,7';
titles[ 'War Bear' ] = 'Soldier,5,4';
titles[ 'War Lion' ] = 'Soldier,6,6';
titles[ 'Water Sprite' ] = 'Soldier,6,6';
titles[ 'Willow Wisp' ] = 'Soldier,4,4';
//Random Encounter Units
titles[ 'Valerian Assassin' ] = 'Soldier,1,0';
titles[ 'Earth Bandit' ] = 'Soldier,2,4';
titles[ 'Shadow Warrior' ] = 'Soldier,7,6';
titles[ 'Water Demon' ] = 'Soldier,14,12';
titles[ 'Succubus' ] = 'Soldier,19,17';
titles[ 'Vampire Lord' ] = 'Soldier,20,18';
//Epic Quests Units
titles[ 'Maiden Shadow' ] = 'Soldier,16,15';
//Monster Units
titles[ 'Hydra: Atlas' ] = 'Soldier,23,28,Alchemy: Cronus';
titles[ 'Hydra: Epimetheus' ] = 'Soldier,18,24,Alchemy: Cronus';
titles[ 'Hydra: Prometheus' ] = 'Soldier,35,25,Alchemy: Cronus';
titles[ 'Hydra: Rhea' ] = 'Soldier,24,18,Alchemy: Cronus';
titles[ 'Hydra: Tethys' ] = 'Soldier,21,21,Alchemy: Cronus';
//Units Unique to Dragons
titles[ 'Sun Eagle' ] = 'Soldier,15,12';
//Units Unique to Sea Serpents
titles[ 'Atlantean Archer' ] = 'Soldier,12,10';
//Units Unique to Alpha Bahamut, the Volcanic Dragon
titles[ 'Alpha Emerald Serpent' ] = 'Soldier,65,65';
titles[ 'Alpha Amethyst Serpent' ] = 'Soldier,75,75';
titles[ 'Alpha Sapphire Serpent' ] = 'Soldier,70,70';
titles[ 'Alpha Red Serpent' ] = 'Soldier,80,80';
//Units that are acquired from more than one Monster
titles[ 'Angelic Sentinel' ] = 'Soldier,20,24';
titles[ 'Arcanist' ] = 'Soldier,23,20';
titles[ 'Hellkite Minion' ] = 'Soldier,32,27';
titles[ 'Hellslayer Knight' ] = 'Soldier,29,33';
titles[ 'Dwarven Battlemaster' ] = 'Soldier,9,7';
titles[ 'Spartan Warrior' ] = 'Soldier,2,1,Alchemy: Spartan Phalanx';
titles[ 'Valerian Guard' ] = 'Soldier,7,9';
titles[ 'Valerian Mystic' ] = 'Soldier,11,11';
titles[ 'Gladiator' ] = 'Soldier,35,24';
//Alchemy Units
titles[ 'Cronus, The World Hydra' ] = 'Soldier,60,60';
titles[ 'Volcanic Knight' ] = 'Soldier,65,55';
titles[ 'Spartan Phalanx' ] = 'Soldier,70,70';
titles[ 'Bahamut, the Volcanic Dragon' ] = 'Soldier,75,75';
titles[ 'Blood Zealot' ] = 'Soldier,40,40';
//Arena Units
titles[ 'Genesis, The Earth Elemental' ] = 'Soldier,100,100';
titles[ 'Ragnarok' ] = 'Soldier,105,105';
titles[ 'Gehenna' ] = 'Soldier,110,110';
//Gehenna Units
titles[ 'Flame Invoker' ] = 'Soldier,55,45';
//Lion's Rebellion Units
titles[ 'Rogue Assassin' ] = 'Soldier,34,24';
//Vincent Units
titles[ 'Skeleton Knight' ] = 'Soldier,18,27';
titles[ 'Greater Werewolf' ] = 'Soldier,27,18';
//Corvintheus Units
titles[ 'Demonic Stalker' ] = 'Soldier,25,20';
//Valhalla Units
titles[ 'Tempest Elemental' ] = 'Soldier,55,50';
//Arachnid Units
titles[ 'Poisonous Spider' ] = 'Soldier,14,14';
titles[ 'Entangling Spider' ] = 'Soldier,9,7';
titles[ 'Armored Spider' ] = 'Soldier,7,9';

//Alchemy items
titles[ 'Sylvan Leaf' ] = 'Alchemy: Elven Crown';
titles[ 'Small Emerald' ] = 'Alchemy: Elven Crown';
titles[ 'Elf Root' ] = 'Alchemy: Elven Crown';
titles[ 'Battlegarb Piece 1 of 5' ] = 'Alchemy: Sophias Battlegarb';
titles[ 'Battlegarb Piece 2 of 5' ] = 'Alchemy: Sophias Battlegarb';
titles[ 'Battlegarb Piece 3 of 5' ] = 'Alchemy: Sophias Battlegarb';
titles[ 'Battlegarb Piece 4 of 5' ] = 'Alchemy: Sophias Battlegarb';
titles[ 'Battlegarb Piece 5 of 5' ] = 'Alchemy: Sophias Battlegarb';
titles[ 'Bahamuts Blood' ] = 'Alchemy: Draganblade';
titles[ 'Draganblade Shard 1 of 4' ] = 'Alchemy: Draganblade';
titles[ 'Draganblade Shard 2 of 4' ] = 'Alchemy: Draganblade';
titles[ 'Draganblade Shard 3 of 4' ] = 'Alchemy: Draganblade';
titles[ 'Draganblade Shard 4 of 4' ] = 'Alchemy: Draganblade';
titles[ 'Battlegear Shard 1 of 3' ] = 'Alchemy: Garlans Battlegear';
titles[ 'Battlegear Shard 2 of 3' ] = 'Alchemy: Garlans Battlegear';
titles[ 'Battlegear Shard 3 of 3' ] = 'Alchemy: Garlans Battlegear';
titles[ 'Volcanic Egg 1 of 4' ] = 'Alchemy: Shield of Dante,Summon: Bahamut and Alpha Bahamut';
titles[ 'Volcanic Egg 2 of 4' ] = 'Alchemy: Shield of Dante,Summon: Bahamut and Alpha Bahamut';
titles[ 'Volcanic Egg 3 of 4' ] = 'Alchemy: Shield of Dante,Summon: Bahamut and Alpha Bahamut';
titles[ 'Volcanic Egg 4 of 4' ] = 'Alchemy: Shield of Dante,Summon: Bahamut and Alpha Bahamut';
titles[ 'Dantes Shard' ] = 'Alchemy: Shield of Dante';
titles[ 'Enriched Mineral' ] = 'Alchemy: Ring of Life';
titles[ 'Purple Opal' ] = 'Alchemy: Ring of Life';
titles[ 'Tarnished Ring' ] = 'Alchemy: Ring of Life';
titles[ 'Dagger Fragment' ] = 'Alchemy: Assassins Blade';
titles[ 'Amethyst Crystal' ] = 'Alchemy: Assassins Blade';
titles[ 'Vanquish Dust' ] = 'Alchemy: Wrath of Vanquish';
titles[ 'Vanquish Petal' ] = 'Alchemy: Wrath of Vanquish';
titles[ 'Vanquish Staff' ] = 'Alchemy: Wrath of Vanquish';
titles[ 'Ancient Frost Hilt' ] = 'Alchemy: Glacial Blade';
titles[ 'Mithril Bar' ] = 'Alchemy: Glacial Blade';
titles[ 'Ice Shard' ] = 'Alchemy: Glacial Blade or Ice Orb';
titles[ 'Heroes Resolve' ] = 'Alchemy: Angelica';
titles[ 'Sapphire Egg' ] = 'Summon: Sapphire Sea Serpent';
titles[ 'Amethyst Egg' ] = 'Summon: Amethyst Sea Serpent';
titles[ 'Ancient Egg' ] = 'Summon: Ancient Sea Serpent';
titles[ 'Conch Shard' ] = 'Alchemy: Poseidons Horn';
titles[ 'Shield Shard' ] = 'Alchemy: Serpentine Shield';
titles[ 'Emerald Egg' ] = 'Summon: Dragon or Emerald Sea Serpent';
titles[ 'Frost Egg' ] = 'Summon: Dragon';
titles[ 'Gold Egg' ] = 'Alchemy: Serpentine Shield,Summon: Dragon';
titles[ 'Red Egg' ] = 'Alchemy: Serpentine Shield,Summon: Dragon';
titles[ 'Star Metal' ] = 'Alchemy: Excalibur';
titles[ 'Star Crystals' ] = 'Alchemy: Excalibur';
titles[ 'Star Fire' ] = 'Alchemy: Excalibur';
titles[ 'Atlantean Map Piece' ] = 'Alchemy: Atlantean Map - Atlantis';
titles[ 'Alpha Bahamut Artifact' ] = 'Alchemy: Transcendence';
titles[ 'Battle Heart' ] = 'Alchemy: Chase, Deadly Strike, Invulnerability, Tempered Steel';
titles[ 'Fairy Dust' ] = 'Alchemy: Dragon Charm';
titles[ 'Feather' ] = 'Alchemy: Dragon Charm';
titles[ 'Dragon Blood' ] = 'Alchemy: Dragon Charm';
titles[ 'Sword Shard' ] = 'Alchemy: Dragonbane';
titles[ 'Trident Shard' ] = 'Alchemy: Trident of the Deep';
titles[ 'Volcanic Topaz' ] = 'Alchemy: Bahamut';
titles[ 'Volcanic Ruby' ] = 'Alchemy: Bahamut';
titles[ 'Volcanic Emerald' ] = 'Alchemy: Bahamut';
titles[ 'Volcanic Sapphire' ] = 'Alchemy: Bahamut';
titles[ 'Gingko Leaf' ] = 'Alchemy: Titania Bow';
titles[ 'Owl Totem' ] = 'Alchemy: Titania Bow';
titles[ 'Tangleroot' ] = 'Alchemy: Titania Bow';
titles[ 'Crest Shard 1 of 4' ] = 'Alchemy: Zenarean Crest';
titles[ 'Crest Shard 2 of 4' ] = 'Alchemy: Zenarean Crest';
titles[ 'Crest Shard 3 of 4' ] = 'Alchemy: Zenarean Crest';
titles[ 'Crest Shard 4 of 4' ] = 'Alchemy: Zenarean Crest';
titles[ 'Bloodblade Shard 1 of 5' ] = 'Alchemy: Bloodblade';
titles[ 'Bloodblade Shard 2 of 5' ] = 'Alchemy: Bloodblade';
titles[ 'Bloodblade Shard 3 of 5' ] = 'Alchemy: Bloodblade';
titles[ 'Bloodblade Shard 4 of 5' ] = 'Alchemy: Bloodblade';
titles[ 'Bloodblade Shard 5 of 5' ] = 'Alchemy: Bloodblade';
titles[ 'Hellstone' ] = 'Alchemy: Soulforge';
titles[ 'Cid Saber Shard 1 of 6' ] = 'Alchemy: Cid Saber';
titles[ 'Cid Saber Shard 2 of 6' ] = 'Alchemy: Cid Saber';
titles[ 'Cid Saber Shard 3 of 6' ] = 'Alchemy: Cid Saber';
titles[ 'Cid Saber Shard 4 of 6' ] = 'Alchemy: Cid Saber';
titles[ 'Cid Saber Shard 5 of 6' ] = 'Alchemy: Cid Saber';
titles[ 'Cid Saber Shard 6 of 6' ] = 'Alchemy: Cid Saber';
titles[ 'Scepter Shard 1 of 6' ] = 'Alchemy: Scepter of Light';
titles[ 'Scepter Shard 2 of 6' ] = 'Alchemy: Scepter of Light';
titles[ 'Scepter Shard 3 of 6' ] = 'Alchemy: Scepter of Light';
titles[ 'Scepter Shard 4 of 6' ] = 'Alchemy: Scepter of Light';
titles[ 'Scepter Shard 5 of 6' ] = 'Alchemy: Scepter of Light';
titles[ 'Scepter Shard 6 of 6' ] = 'Alchemy: Scepter of Light';
titles[ 'Favor Shard 1 of 5' ] = 'Alchemy: Favor Points';
titles[ 'Favor Shard 2 of 5' ] = 'Alchemy: Favor Points';
titles[ 'Favor Shard 3 of 5' ] = 'Alchemy: Favor Points';
titles[ 'Favor Shard 4 of 5' ] = 'Alchemy: Favor Points';
titles[ 'Favor Shard 5 of 5' ] = 'Alchemy: Favor Points';
titles[ 'Crimson Leaf' ] = 'Alchemy: Crimson Dagger';
titles[ 'Magic Acorn' ] = 'Alchemy: Crimson Dagger';
titles[ 'Dagger Piece 1 of 2' ] = 'Alchemy: Crimson Dagger';
titles[ 'Dagger Piece 2 of 2' ] = 'Alchemy: Crimson Dagger';
titles[ 'Darkness Essence' ] = 'Alchemy: Mystical Dagger';
titles[ 'Dull Blade' ] = 'Alchemy: Mystical Dagger';
titles[ 'Wormwood Berries' ] = 'Alchemy: Mystical Dagger';
titles[ 'Lava Shard 1 of 5' ] = 'Alchemy: Lava Orb';
titles[ 'Lava Shard 2 of 5' ] = 'Alchemy: Lava Orb';
titles[ 'Lava Shard 3 of 5' ] = 'Alchemy: Lava Orb';
titles[ 'Lava Shard 4 of 5' ] = 'Alchemy: Lava Orb';
titles[ 'Lava Shard 5 of 5' ] = 'Alchemy: Lava Orb';
titles[ 'Rune of Fire' ] = 'Alchemy: Crown of Flames';
titles[ 'Rune of Flame' ] = 'Alchemy: Crown of Flames';
titles[ 'Essence of Darkness' ] = 'Alchemy: Shadow Blast';
titles[ 'Rune of Darkness' ] = 'Alchemy: Shadow Blast';
titles[ 'Black Widow' ] = 'Alchemy: Shadow Blast';
titles[ 'Lead Ore' ] = 'Alchemy: Cid Helm';
titles[ 'Anvil' ] = 'Alchemy: Cid Helm';
titles[ 'Ancient Symbol' ] = 'Alchemy: Cid Helm';
titles[ 'Ancient Parchment' ] = 'Alchemy: Silverlight Tome';
titles[ 'Elven Fern' ] = 'Alchemy: Silverlight Tome';
titles[ 'Elixir of Life' ] = 'Alchemy: Silverlight Tome';
titles[ 'Lava Plant' ] = 'Alchemy: Fiery Blade';
titles[ 'Fire Berries' ] = 'Alchemy: Fiery Blade';
titles[ 'Bituminous Coal' ] = 'Alchemy: Fiery Blade';
titles[ 'Gargoyle Statue' ] = 'Alchemy: Zarevok Plate';
titles[ 'Bull Totem' ] = 'Alchemy: Zarevok Plate';
titles[ 'Rhino Horn' ] = 'Alchemy: Zarevok Plate';
titles[ 'Basilisk Heart' ] = 'Alchemy: Staff of Vigor';
titles[ 'Ancient Lichen' ] = 'Alchemy: Staff of Vigor';
titles[ 'Nature Essence' ] = 'Alchemy: Staff of Vigor';
titles[ 'Troll Tusks' ] = 'Alchemy: Araxin Blade';
titles[ 'Amber Ore' ] = 'Alchemy: Araxin Blade';
titles[ 'Fox Totem' ] = 'Alchemy: Araxin Blade';
titles[ 'Hawk Totem' ] = 'Alchemy: Noktar';
titles[ 'Roc Feathers' ] = 'Alchemy: Noktar';
titles[ 'Ancient Hatchet' ] = 'Alchemy: Noktar';
titles[ 'Red Wyrmscale' ] = 'Alchemy: Dragan Protector';
titles[ 'Dragonbloom' ] = 'Alchemy: Dragan Protector';
titles[ 'Fire Core' ] = 'Alchemy: Dragan Protector';
titles[ 'Fiery Starfish' ] = 'Alchemy: Nautical Trident';
titles[ 'Golden Seahorse' ] = 'Alchemy: Nautical Trident';
titles[ 'Spiral Seashell' ] = 'Alchemy: Nautical Trident';
titles[ 'Air Shard 1 of 5' ] = 'Alchemy: Air Orb';
titles[ 'Air Shard 2 of 5' ] = 'Alchemy: Air Orb';
titles[ 'Air Shard 3 of 5' ] = 'Alchemy: Air Orb';
titles[ 'Air Shard 4 of 5' ] = 'Alchemy: Air Orb';
titles[ 'Air Shard 5 of 5' ] = 'Alchemy: Air Orb';
titles[ 'Bat Totem' ] = 'Alchemy: Assassins Cloak';
titles[ 'Werewolf Fur' ] = 'Alchemy: Assassins Cloak';
titles[ 'Assassins Ankh' ] = 'Alchemy: Assassins Cloak';
titles[ 'Treant Seedling' ] = 'Alchemy: Aeris Dagger';
titles[ 'Faerie Thistle' ] = 'Alchemy: Aeris Dagger';
titles[ 'Glimmering Lotus' ] = 'Alchemy: Aeris Dagger';
titles[ 'Ice Crystals' ] = 'Alchemy: Frostwolf Axe';
titles[ 'Wolf Totem' ] = 'Alchemy: Frostwolf Axe';
titles[ 'Frostwyrm Scales' ] = 'Alchemy: Frostwolf Axe';
titles[ 'Emblem of Keira' ] = 'Alchemy: Signet of Keira';
titles[ 'Emblem of Lotus' ] = 'Alchemy: Signet of Lotus';
titles[ 'Emblem of Sylvana' ] = 'Alchemy: Signet of Sylvana';
titles[ 'Emblem of Azriel' ] = 'Alchemy: Signet of Azriel';
titles[ 'Valhalla Dust' ] = 'Alchemy: Essence of Valhalla, Hand of Valhalla';
titles[ 'Essence of Valhalla' ] = 'Alchemy: Stormbinder';

function getTitle( orig ) {
	if( orig ) {
		var title = titles[ orig ];
		if( title ) {
			title = orig + ' (' + title + ')';
			return title;
		}
		return orig;
	} 
	return '';
}

function checkUpdate( num, currentVersion ) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/show/' + num,
        onload : function( response ) {
            var summary = $( '#summary', $( response.responseText ) );
            summary.contents().filter( function() {
                return this.nodeType == 3;
            } ).wrap( '<span></span>' );

            var remoteVersion = $.trim($( "b:contains('Version') + span", summary ).text() );			
            if( currentVersion < remoteVersion ) {
                if( confirm( 'Castle Age Item Title Replacer:\n' + 
							'There is a newer version of this script available.\n' + 
							'Your version: ' + currentVersion + ', new version: ' + remoteVersion + '\n' + 
							'Would you like to update?' ) ) {
                    setTimeout( function() { unsafeWindow.location.href = 'http://userscripts.org/scripts/source/' + num + '.user.js'; }, 3000 );
                }
            }
        }
    });
}

function updateCheck() {
    checkUpdate( 78611, g_version );
}

function xpath( elem, query ) {
	return elem.evaluate( query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

function replaceTitles() {
	var allElements = xpath( document, '//*[@title]' );
	var count = 0;
	for( var i = 0; i < allElements.snapshotLength; i++ ) {
		var elem = allElements.snapshotItem( i );
		if( 'IMG' === elem.nodeName.toUpperCase() ) {
			// image, try to replace the title
			elem.title = getTitle( elem.title );
			count++;
		}
	}
	if( g_debug ) {
		GM_log( 'Titles processed: ' + count );
	}
}

window.addEventListener( "DOMNodeInserted", 
	function( e ) {
		if( e.target.id ) {
			if(    e.target.id.match( /battle_monster$/ ) 
			    || e.target.id.match( /loot_log_tab$/ )
			    || e.target.id.match( /alchemy$/ ) ) {
				replaceTitles();
			}
			else if( e.target.id.match( /time_value$/ ) ) {
				return false;
			}
			else if( g_debug ) {
				GM_log( 'window.DOMNodeInserted: ' + e.target.tagName + ', ' + e.target.id );
			}
		}
	}, 
	false );

window.addEventListener( "DOMSubtreeModified", 
	function( e ) {
		if( e.target.id ) {
			if(    e.target.id.match( /action_logs$/ ) 
				|| e.target.id.match( /recipe_list$/ )
				|| e.target.id.match( /globalContainer$/ )
				|| e.target.id.match( /app_body_container$/ ) ) {
				replaceTitles();
			}
			else if( e.target.id.match( /time_value$/ ) ) {
				return false;
			}
			else if( g_debug ) {
				GM_log( 'window.DOMSubtreeModified: ' + e.target.tagName + ', ' + e.target.id );
			}
		}
	}, 
	false );
	
GM_registerMenuCommand( 'Castle Age Item Title Replacer - Check for update', updateCheck );
replaceTitles();
	
$( document ).ready( function() {
    updateCheck();	
});
