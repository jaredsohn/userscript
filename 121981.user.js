// ==UserScript==
// @name PlayDotA Icon Remix
// @namespace http://nxiety.wordpress.com/
// @description Replaces the original Dota icons with their Dota 2 counterparts.
// @include http://www.playdota.com/*
// @version 0.6
// ==/UserScript==

// not using a namespace as this is so specifically targeted to only playdota
(function () {
	"use strict";

	// constants
	var ICON_ITEM,
		ICON_HERO,
		ICON_HERO_SKILL,
	// variables
	    containers,
		div,
		divs,
		heroes,
		i,
		items,
		onMouse,
		registerEvents,
		updateIcon,
		updateIcons,
		url,
		urls;

	ICON_ITEM = 1;
	ICON_HERO = 2;
	ICON_HERO_SKILL = 3;

	// urls
	url = window.location.href; // current url
	urls = {
		guides: 'http://www.playdota.com/guides',
		heroes: 'http://www.playdota.com/heroes',
		items: 'http://www.playdota.com/items',
		// icon locations
		mediaItems: ['http://media.playdota.com/items/', 'http://www.playdota.com/img/items/'],
		mediaHero: ['http://media.playdota.com/hero/', 'http://www.playdota.com/img/hero/'],
		mediaSkills: ['/skill-']
	};

	// css containers within urls(aka: known sizes that need to be adhered to maintain appearance)
	containers = {
		'http://www.playdota.com/items': {
			'site': {
				w: '56px',
				h: '38px'
			},
			'iright': {
				w: '56px',
				h: '38px'
			}
		},
		'http://www.playdota.com/guides': {
			'heroc': {
				w: '64px',
				h: '115px'
			},
			'thelist': {
				w: '23px',
				h: '28px'
			}
		},
		'http://www.playdota.com/heroes': {
			'heroc': {
				w: '37px',
				h: '64px'
			},
			'iright': {
				w: '37px',
				h: '64px'
			}
		},
		'http://www.playdota.com/guides/vals-pretty-guide-to-every-hero': {
			'gtext': {
				w: '37px',
				h: '64px'
			}
		}
	};

	// playdota_number : ['imgur_link', 'tooltip and alt text'] // item_name
	items = {
		22: {imgur: '4bmcI', name: 'Clarity'}, // clarity
		24: {imgur: 'O30wn', name: 'Tango'}, // tango
		23: {imgur: 'XOBcL', name: 'Healing Salve'}, // healingsalve
		767: {imgur: '685Lm', name: 'Smoke of Deceit'}, // smokeofdeceit
		30: {imgur: 'zCPtO', name: 'Town Portal Scroll'}, // townportalscroll
		28: {imgur: 'TAEjq', name: 'Dust of Appearance'}, // dustofappearance
		29: {imgur: '21jkU', name: 'Animal Courier'}, // animalcourier
		26: {imgur: 'YxSYD', name: 'Observer Ward'}, // observerward
		27: {imgur: 'mVlQM', name: 'Sentry Ward'}, // sentryward
		25: {imgur: 'pw2Tw', name: 'Bottle'}, // bottle
		34: {imgur: '4ZUOF', name: 'Iron Branch'}, // ironbranch
		31: {imgur: 'caUFT', name: 'Gauntlets of Strength'}, // gauntletsofstrength
		33: {imgur: '3eIMh', name: 'Slippers of Agility'}, // slippersofagility
		32: {imgur: 'TVXTr', name: 'Mantle of Intelligence'}, // mantleofintelligence
		38: {imgur: 'rMLm2', name: 'Circlet'}, // circlet
		35: {imgur: 'vPe9l', name: 'Belt of Strength'}, // beltofstrength
		37: {imgur: '4mryC', name: 'Boots of Elvenskin'}, // bootsofelvenskin
		36: {imgur: 'Orw9D', name: 'Robe of the Magi'}, // robeofthemagi
		39: {imgur: '7lxVP', name: 'Ogre Club'}, // ogreclub
		41: {imgur: 'wUbb1', name: 'Blade of Alacrity'}, // bladeofalacrity
		40: {imgur: 'zKkXg', name: 'Staff of Wizardy'}, // staffofwizardry
		42: {imgur: 'YR1jO', name: 'Ultimate Orb'}, // ultimateorb
		47: {imgur: '7dFqu', name: 'Ring of Protection'}, // ringofprotection
		54: {imgur: 'E2Nx7', name: 'Quelling Blade'}, // quellingblade
		773: {imgur: 'E2Nx7', name: 'Quelling Blade'}, // quellingblade
		48: {imgur: 'KoBsK', name: 'Stout Shield'}, // stoutshield
		43: {imgur: 'rEO3V', name: 'Blades of Attack'}, // bladesofattack
		51: {imgur: 'Y2JqN', name: 'Chainmail'}, // chainmail
		52: {imgur: 'fP0Jj', name: 'Helm of Iron Will'}, // helmofironwill
		44: {imgur: 'j0V1j', name: 'Broadsword'}, // broadsword
		45: {imgur: 'XFI25', name: 'Quarterstaff'}, // quarterstaff
		46: {imgur: 'KQK6A', name: 'Claymore'}, // claymore
		49: {imgur: 'NUHRG', name: 'Javelin'}, // javelin
		53: {imgur: 'eZuoG', name: 'Platemail'}, // platemail
		50: {imgur: 'VeAWP', name: 'Mithril Hammer'}, // mithrilhammer
		19: {imgur: 'lwJc7', name: 'Magic Stick'}, // magicstick
		15: {imgur: 'GEhU9', name: 'Sage\'s Mask'}, // sagesmask
		13: {imgur: 'calhE', name: 'Ring of Regen'}, // ringofregen
		16: {imgur: 'M8fGu', name: 'Boots of Speed'}, // bootsofspeed
		10: {imgur: 'e95Mv', name: 'Gloves of Haste'}, // glovesofhaste
		18: {imgur: 'IjGGr', name: 'Cloak'}, // cloak
		17: {imgur: 'q5YtJ', name: 'Gem of True Sight'}, // gemoftruesight
		12: {imgur: 'hhjCL', name: 'Morbid Mask'}, // morbidmask
		21: {imgur: 'dwhHS', name: 'Ghost Scepter'}, // ghostscepter
		20: {imgur: 'T0gar', name: 'Talisman of Evasion'}, // talismanofevasion
		14: {imgur: 'NNVGv', name: 'Blink Dagger'}, // blinkdagger
		98: {imgur: 'ZkNot', name: 'Wraith Band'}, // wraithband
		96: {imgur: 'u0zTI', name: 'Null Talisman'}, // nulltalisman
		94: {imgur: 'OsIRX', name: 'Magic Wand'}, // magicwand
		97: {imgur: '6e2IV', name: 'Bracer'}, // bracer
		93: {imgur: '9kgfg', name: 'Poor Man\'s Shield'}, // poormansshield
		762: {imgur: 'IhtsN', name: 'Soul Ring'}, // soulring
		91: {imgur: 'W6A1h', name: 'Phase Boots'}, // phaseboots
		66: {imgur: '1frz2', name: 'Power Treads'}, // powertreads
		90: {imgur: 'c7eiq', name: 'Oblivion Staff'}, // oblivionstaff
		89: {imgur: 'kL260', name: 'Perseverance'}, // perseverance
		95: {imgur: 'pF5pG', name: 'Hand of Midas'}, // handofmidas
		92: {imgur: 'LeZql', name: 'Boots of Travel'}, // bootsoftravel
		124: {imgur: 'QN9bY', name: 'Flying Courier'}, // flyingcourier
		119: {imgur: 'Re5cH', name: 'Ring of Basilius'}, // ringofbasilius
		117: {imgur: 'p2jeg', name: 'Headdress'}, // headdress
		118: {imgur: 'dZGIL', name: 'Buckler'}, // buckler
		755: {imgur: 'eGpLR', name: 'Urn of Shadows'}, // urnofshadows
		766: {imgur: '0qcFY', name: 'Medallion of Courage'}, // medallionofcourage
		763: {imgur: 'YrWs4', name: 'Arcane Boots'}, // arcaneboots
		765: {imgur: 'Grdoe', name: 'Drum of Endurance'}, // drumofendurance
		122: {imgur: '3iiha', name: 'Vladimir\'s Offering'}, // vladmirsoffering
		121: {imgur: 'SSgAH', name: 'Mekansm'}, // mekansm
		120: {imgur: '98JMp', name: 'Pipe of Insight'}, // pipeofinsight
		102: {imgur: '5GIJb', name: 'Force Staff'}, // forcestaff
		104: {imgur: 'cWh5c', name: 'Necronomicon'}, // necronomicon lv1
		// : {imgur: 'UOcw9', name: ''}, // necronomicon lv2
		// : {imgur: 'cjzG5', name: ''}, // necronomicon lv3
		101: {imgur: 'dno6A', name: 'Eul\'s Scepter of Divinity'}, // eulsscepterofdivinity
		103: {imgur: 'Qgn84', name: 'Dagon'}, // dagon
		768: {imgur: 'BYFzj', name: 'Veil of Discord'}, // veilofdiscord
		106: {imgur: 'gCirD', name: 'Aghanim\'s Scepter'}, // aghanimsscepter
		100: {imgur: 'MgnbU', name: 'Orchid Malevolence'}, // orchidmalevolence
		107: {imgur: 'Gubuk', name: 'Refresher Orb'}, // refresherorb
		99: {imgur: '1LP4F', name: 'Scythe of Vyse'}, // scytheofvyse
		75: {imgur: 'ikO0z', name: 'Crystalys'}, // crystalys
		76: {imgur: 'rN5dd', name: 'Armlet'}, // armlet
		72: {imgur: 'ojPCo', name: 'Skull Basher'}, // skullbasher
		77: {imgur: 'aPkB8', name: 'Shadow Blade'}, // shadowblade
		73: {imgur: 'RlLQ0', name: 'Battlefury'}, // battlefury
		756: {imgur: 'tkyok', name: 'Ethereal Blade'}, // etherealblade
		74: {imgur: 'JKwcl', name: 'Manta Style'}, // mantastyle
		69: {imgur: 'OvCNC', name: 'Radiance'}, // radiance
		68: {imgur: 'FHs7z', name: 'Monkey King Bar'}, // monkeykingbar
		71: {imgur: 'JLlYv', name: 'Daedalus'}, // daedalus
		125: {imgur: 'NhzKf', name: 'Butterfly'}, // butterfly
		67: {imgur: '1wqkK', name: 'Divine Rapier'}, // divinerapier
		776: {imgur: '1wqkK', name: 'Divine Rapier'}, // divinerapier
		116: {imgur: 'us561', name: 'Hood of Defiance'}, // hoodofdefiance
		114: {imgur: '8ZlCD', name: 'Blademail'}, // blademail
		113: {imgur: 'WUg6V', name: 'Vanguard'}, // vanguard
		771: {imgur: 'WUg6V', name: 'Vanguard'}, // vanguard
		115: {imgur: 'Qmlay', name: 'Soul Booster'}, // soulbooster
		108: {imgur: 'P7IOK', name: 'Black King Bar'}, // blackkingbar
		110: {imgur: 'qgyMY', name: 'Shiva\'s Guard'}, // shivasguard
		111: {imgur: 'alKw3', name: 'Bloodstone'}, // bloodstone
		112: {imgur: 'kdWAF', name: 'Linken\'s Sphere'}, // linkenssphere
		772: {imgur: 'kdWAF', name: 'Linken\'s Sphere'}, // linkenssphere
		7: {imgur: 'byf12', name: 'Assault Cuirass'}, // assaultcuirass
		769: {imgur: 'byf12', name: 'Assault Cuirass'}, // assaultcuirass
		8: {imgur: 'zgnXg', name: 'Heart of Tarrasque'}, // heartoftarrasque
		770: {imgur: 'zgnXg', name: 'Heart of Tarrasque'}, // heartoftarrasque
		82: {imgur: 'PM4Lx', name: 'Helm of the Dominator'}, // helmofthedominator
		81: {imgur: 'UyLi4', name: 'Mask of Madness'}, // maskofmadness
		79: {imgur: '2CbUD', name: 'Sange'}, // sange
		774: {imgur: 'Z8V6w', name: 'Yasha'}, // yasha
		85: {imgur: '5nf8w', name: 'Maelstrom'}, // maelstrom
		84: {imgur: 'ncTOi', name: 'Diffusal Blade'}, // diffusalblade
		87: {imgur: 'JGwDZ', name: 'Desolator'}, // desolator
		80: {imgur: '4R6o9', name: 'Sange and Yasha'}, // sangeandyasha
		775: {imgur: '4R6o9', name: 'Sange and Yasha'}, // sangeandyasha
		86: {imgur: 'w5PP7', name: 'Mjollnir'}, // mjollnir
		88: {imgur: 'eH8RM', name: 'Eye of Skadi'}, // eyeofskadi
		83: {imgur: '7dpuU', name: 'Satanic'}, // satanic
		764: {imgur: 'ucror', name: 'Orb of Venom'}, // orbofvenom
		60: {imgur: 'jOHZZ', name: 'Ring of Health'}, // ringofhealth
		61: {imgur: 'zPvB0', name: 'Void Stone'}, // voidstone
		63: {imgur: '7voRT', name: 'Energy Booster'}, // energybooster
		65: {imgur: 'voLIJ', name: 'Vitality Booster'}, // vitalitybooster
		64: {imgur: 'lTLKZ', name: 'Point Booster'}, // pointbooster
		59: {imgur: 'LzWIX', name: 'Hyperstone'}, // hyperstone
		55: {imgur: '1cEkw', name: 'Demon Edge'}, // demonedge
		62: {imgur: 'Nygvr', name: 'Mystic Staff'}, // mysticstaff
		57: {imgur: '8kq8Q', name: 'Reaver'}, // reaver
		56: {imgur: '1uz7Y', name: 'Eaglesong'}, // eaglesong
		58: {imgur: 'eqItG', name: 'Sacred Relic'}, // sacredrelic
		777: {imgur: 'eVG4W', name: 'Abyssal Blade'}, // abyssalblade
		781: {imgur: 'ZvzHF', name: 'Heaven\'s Halberd'}, // heavenshalberd
		779: {imgur: 'VVIuN', name: 'Tranquil Boots'}, // tranquilboots
		778: {imgur: 'ulyUU', name: 'Rod of Atos'}, // rodofatos
		780: {imgur: '65mxu', name: 'Ring of Aquila'}, // ringofaquila
		109: {imgur: 'ZMHr6', name: 'Aegis of the Immortal'} // aegisoftheimmortal
		// : 'ntX0p', ''] // cheese
		// : 'nBcaW' // recipe
	};

	// playdota_number: {imgur: 'link', name: 'tooltip', skills: {n: 'link'}}
	heroes = {
		41: {imgur: 'JToTc', name: 'Earthshaker', skills: {0: ['Fissure', 'HKu9e'], 1: ['Enchant Totem', 'oOHQr'], 2: ['Aftershock', 'XcBe8'], 3: ['Echo Slam', 'oITM6']}}, // earthshaker
		38: {imgur: '9K4xp', name: 'Sven', skills: {0: ['Storm Hammer', 'n2lHQ'], 1: ['Great Cleave', 'kZfcs'], 2: ['Warcry', '2nVtG'], 3: ['God\'s Strength', 'A3bBX']}}, // sven
		105: {imgur: 'u6WlY', name: 'Tiny', skills: {0: ['Avalanche', 'u1snr'], 1: ['Toss', 'eFDrM'], 2: ['Craggy Exterior', 'DJwSR'], 3: ['Grow', '7N37l']}}, // tiny
		66: {imgur: 'bIPh0', name: 'Kunkka', skills: {0: ['Torrent', 'KI47s'], 1: ['Tidebringer', 'q3mGN'], 2: ['X Marks the Spot', 'AlPm3'], 3: ['Ghostship', 'AlPm3'], 4: ['', 'wrSdp']}}, // kunkka
		44: {imgur: 'lGp3Z', name: 'Beastmaster', skills: {0: ['Wild Axes', '4FgKx'], 1: ['Call of the Wild', 'R1ALA'], 2: ['Inner Beast', 'LUJEN'], 3: ['Primal Roar', 'QPfE9']}}, // beastmaster
		49: {imgur: 'UDAQt', name: 'Dragon Knight', skills: {0: ['Breathe Fire', 'SaQGv'], 1: ['Dragon Tail', 'gsT2u'], 2: ['Dragon Blood', 'Lgowd'], 3: ['Elder Dragon Form', 'sAlbV']}}, // dragonknight
		102: {imgur: 'aFBvg', name: 'Tinker', skills: {0: ['Laser', 'NnwW4'], 1: ['Heat-Seeking Missile', '80jIP'], 2: ['March of the Machines', 'AYK2I'], 3: ['Rearm', 'vLl8O']}}, // tinker
		47: {imgur: 'maR6q', name: 'Omniknight', skills: {0: ['Purification', 'xsPjS'], 1: ['Repel', 'igy3b'], 2: ['Degen Aura', '1opSU'], 3: ['Guardian Angel', 'MzW9u']}}, // omniknight
		55: {imgur: 'owEpa', name: 'Huskar', skills: {0: ['Inner Vitality', 'MBjuk'], 1: ['Burning Spear', 'GCTYV'], 2: ['Berserker\'s Blood', 'np9YN'], 3: ['Life Break', '9M1i0']}}, // huskar
		48: {imgur: 'so19a', name: 'Alchemist', skills: {0: ['Acid Spray', '0Ixw0'], 1: ['Unstable Concoction', 'lYIxo'], 2: ['Goblin\'s Greed', 'yRIzU'], 3: ['Chemical Rage', 'cALxR']}}, // alchemist
		33: {imgur: 'vyqiO', name: 'Axe', skills: {0: ['Berserker\'s Call', 'iLE9T'], 1: ['Battle Hunter', 'b5mAc'], 2: ['Counter Helix', 'lgZCy'], 3: ['Culling Blade', 'bfx94']}}, // axe
		29: {imgur: '1o4bH', name: 'Pudge', skills: {0: ['Meat Hook', '858xR'], 1: ['Rot', '6eKBs'], 2: ['Flesh Heap', 'OPt2C'], 3: ['Dismember', 'TkHNf']}}, // pudge
		14: {imgur: 'E9Pdo', name: 'Sand King', skills: {0: ['Burrowstrike', 'TK6lu'], 1: ['Sand Storm', 'mr4N8'], 2: ['Caustic Finale', 'itcP3'], 3: ['Epicenter', '1AQZ6']}}, // sandking
		81: {imgur: 'REhHW', name: 'Slardar', skills: {0: ['Sprint', 'hVptJ'], 1: ['Slithereen Crush', 'ZN9jb'], 2: ['Bash', 'xiZl6'], 3: ['Amplify Damage', 'FBCiz']}}, // slardar
		25: {imgur: 'W5Bgw', name: 'Tidehunter', skills: {0: ['Gush', 'ln7eA'], 1: ['Kraken Shell', 'tiukK'], 2: ['Anchor Smash', 'BTzTJ'], 3: ['Ravage', 'eWzL5']}}, // tidehunter
		76: {imgur: 'XUVoH', name: 'Skeleton King', skills: {0: ['Hellfire Blast', '3CDAq'], 1: ['Vampiric Aura', 'zDuvQ'], 2: ['Critical Strike', 'ja8X6'], 3: ['Reincarnation', 'EbzJJ']}}, // skeletonking
		122: {imgur: 'dptWH', name: 'Lifestealer', skills: {0: ['Rage', '5YhvV'], 1: ['Feast', 's3YL9'], 2: ['Open Wounds', '9WGXl'], 3: ['Infest', '8yYBX']}}, // lifestealer
		75: {imgur: '6fSWO', name: 'Night Stalker', skills: {0: ['Void', 'Nr0ei'], 1: ['Crippling Fear', '4Y7q7'], 2: ['Hunter in the Night', '0ECtp'], 3: ['Darkness', 'OSIbA']}}, // nightstalker
		37: {imgur: 'fpEb6', name: 'Doom Bringer', skills: {0: ['Devour', 'ElpQG'], 1: ['Scorched Earth', 'MPAW4'], 2: ['LVL? Death', 'vOQnv'], 3: ['Doom', 'PlM3S']}}, // doombringer
		43: {imgur: 'docpB', name: 'Anti-Mage', skills: {0: ['Mana Break', '2OQhH'], 1: ['Blink', 'bYE2s'], 2: ['Spell Shield', '8nlSa'], 3: ['Mana Void', 'rI4yz']}}, // antimage
		45: {imgur: 'f3Pe8', name: 'Drow Ranger', skills: {0: ['Frost Arrows', '8yA9t'], 1: ['Silence', '8fJfs'], 2: ['Precision Aura', 'pyMTl'], 3: ['Marksmanship', 'HxlyO']}}, // drowranger
		71: {imgur: '4Aegm', name: 'Juggernaut', skills: {0: ['Blade Fury', 'HNLBY'], 1: ['Healing Ward', 'TbQWy'], 2: ['Blade Dance', '1OwD7'], 3: ['Omnislash', 'hhwnM']}}, // juggernaut
		51: {imgur: 'hLxJv', name: 'Mirana', skills: {0: ['Starstorm', 'x9cRd'], 1: ['Arrow', '38rMe'], 2: ['Leap', 'd6vGn'], 3: ['Moonlight Shadow', 'iEhbA']}}, // mirana
		22: {imgur: 'TrlrP', name: 'Morphling', skills: {0: ['Waveform', 'dVOIP'], 1: ['Adaptive Strike', 'TlneT'], 2: ['Morph (Agility Gain)', 'jwivi'], 3: ['Morph (Agility Gain)', 'jwivi'], 4: ['Morph (Strength Gain)', 'Cqd4m'], 5: ['Replicate', 'TRtK0'], 6: ['Morph Replicate', 'TRtK0']}}, // morphling
		8: {imgur: 'tQGtX', name: 'Vengeful Spirit', skills: {0: ['Magic Missile', 'XPEDA'], 1: ['Wave of Terror', 'qmTDp'], 2: ['Vengeance Aura', 'jupiF'], 3: ['Nether Swap', 'JLpE2']}}, // vengefulspirit
		64: {imgur: 'F2vja', name: 'Riki', skills: {0: ['Smoke Screen', 'RaBqk'], 1: ['Blink Strike', 'UN0Qd'], 2: ['Backstab', 'gLC06'], 3: ['Permanent Invisibility', 'W3UM2']}}, // riki
		23: {imgur: '9OpDl', name: 'Sniper', skills: {0: ['Shrapnel', '3pdB3'], 1: ['Headshot', 'JqBjS'], 2: ['Take Aim', 'IO4Us'], 3: ['Assassinate', 'quXHE']}}, // sniper
		42: {imgur: 'ne2jk', name: 'Bounty Hunter', skills: {0: ['Shuriken Toss', 'NpWRB'], 1: ['Jinada', '3Y2X3'], 2: ['Shadow Walk', 'zHHBE'], 3: ['Track', 'Y6lXv']}}, // bountyhunter
		100: {imgur: 'sJSjB', name: 'Ursa', skills: {0: ['Earthshock', 'kPUm1'], 1: ['Overpower', 'dJR8r'], 2: ['Fury Swipes', 'SjhhC'], 3: ['Enrage', 'fTGpr']}}, // ursa
		35: {imgur: '5nvEK', name: 'Bloodseeker', skills: {0: ['Bloodrage', 'BMGHf'], 1: ['Blood Bath', 'NYFwL'], 2: ['Thirst', 'KfNW0'], 3: ['Rupture', 'FoBRt']}}, // bloodseeker
		91: {imgur: 'jri1m', name: 'Shadow Fiend', skills: {0: ['Shadowraze', 'ZT6Iw'], 1: ['Shadowraze', 'ZT6Iw'], 2: ['Shadowraze', 'UMEjk'], 3: ['Shadowraze', 'N7HVm'], 4: ['Necromastery', 'JuKsF'], 5: ['Presence of the Dark Lord', 'OirY6'], 6: ['Requiem of Souls', 'J7sMx']}}, // shadowfiend
		86: {imgur: 'MMvoP', name: 'Razor', skills: {0: ['Plasma Field', 'HX9wW'], 1: ['Static Link', '9iIf0'], 2: ['Unstable Current', 'ael6h'], 3: ['Eye of the Storm', 'sWuxz']}}, // razor
		106: {imgur: 'IQKln', name: 'Venomancer', skills: {0: ['Venomous Gale', 'Zg3dq'], 1: ['Poison Sting', 'qj9Yt'], 2: ['Plague Ward', 'WJ9KC'], 3: ['Poison Nova', 'AuiGs']}}, // venomancer
		83: {imgur: 'VvJTt', name: 'Faceless Void', skills: {0: ['Time Walk', 'OD0v5'], 1: ['Backtrack', 'iB6Mh'], 2: ['Time Lock', '0zGlH'], 3: ['Chronosphere', 'da15e']}}, // facelessvoid
		84: {imgur: 'vHF9Q', name: 'Viper', skills: {0: ['Poison Attack', 'ZtY1D'], 1: ['Nethertoxin', 'japZl'], 2: ['Corrosive Skin', 'pECqy'], 3: ['Viper Strike', 'Rbqcj']}}, // viper
		89: {imgur: 'GkgYX', name: 'Broodmother', skills: {0: ['Spawn Spiderlings', 'BLO97'], 1: ['Spin Web', 'wkaGO'], 2: ['Incapacitating Bite', 'AuroY'], 3: ['Insatiable Hunger', 'IVNUv']}}, // broodmother
		32: {imgur: '5TRE9', name: 'Weaver', skills: {0: ['The Swarm', 'ZGTEZ'], 1: ['Shukuchi', 'AlUq3'], 2: ['Geminate Attack', 'GjiY6'], 3: ['Time Lapse', 'dvqiY']}}, // weaver
		50: {imgur: 'oD97H', name: 'Spectre', skills: {0: ['Spectral Dagger', 'VbMN9'], 1: ['Desolate', 'ZqBca'], 2: ['Dispersion', 'Unegm'], 4: ['Reality', 'pWhoD'], 3: ['Haunt', 'ap30W']}}, // spectre
		34: {imgur: 'lecDk', name: 'Crystal Maiden', skills: {0: ['Crystal Nova', '2ng9M'], 1: ['Frostbite', 'Y2t59'], 2: ['Arcane Aura', 'PtrbE'], 3: ['Freezing Field', 'ndTOy']}}, // crystalmaiden
		62: {imgur: 'SnOh0', name: 'Puck', skills: {0: ['Illusory Orb', 'dNXub'], 2: ['Waning Rift', '8ADjW'], 3: ['Phase Shift', 'uEFtj'], 1: ['Ethereal Jaunt', 'u8Uhq'], 4: ['Dream Coil', 'batLg']}}, // puck
		53: {imgur: 'zQgl9', name: 'Storm Spirit', skills: {0: ['Static Remnant', 'wWset'], 1: ['Electric Vortex', 'fnzFG'], 2: ['Overload', '5ItNZ'], 3: ['Ball Lightning', 'h7Mk2']}}, // stormspirit
		54: {imgur: 'uaDsS', name: 'Windrunner', skills: {0: ['Shackle Shot', 'sLIHs'], 1: ['Powershot', 'vgeFi'], 2: ['Windrun', 'ilWRv'], 3: ['Focus Fire', 'zGquF']}}, // windrunner
		18: {imgur: '8SYH8', name: 'Zeus', skills: {0: ['Arc Lightning', 'NUwjX'], 1: ['Lightning Bolt', '8PWNY'], 2: ['Static Field', 'xpI6Q'], 3: ['Thundergod\'s Wrath', 'N5atj']}}, // zeus
		69: {imgur: 'uLD5A', name: 'Lina', skills: {0: ['Dragon Slave', 'tEgmw'], 1: ['Light Strike Array', 'x6DzF'], 2: ['Fiery Soul', 'ezTUH'], 3: ['Laguna Blade', 'rjsoc']}}, // lina
		26: {imgur: 'VbYET', name: 'Shadow Shaman', skills: {0: ['Ether Shock', 'A1JV5'], 1: ['Hex', 'GxhMP'], 2: ['Shackles', '8hyMf'], 3: ['Mass Serpent Wards', 'BkHvU']}}, // shadowshaman
		65: {imgur: 'nKjx7', name: 'Clockwerk', skills: {0: ['Battery Assault', '1d3Oi'], 1: ['Power Cogs', '7Zly2'], 2: ['Rocket Flare', 'RJHvd'], 3: ['Hookshot', 'jdXUn']}}, // clockwerk
		103: {imgur: 'GgBCb', name: 'Nature\'s Prophet', skills: {0: ['Sprout', '0e6US'], 1: ['Teleportation', 'jKZkO'], 2: ['Nature\'s Call', 'W1u6l'], 3: ['Wrath of Nature', 'XoNzd']}}, // naturesprophet
		21: {imgur: 'YofdN', name: 'Enchantress', skills: {0: ['Untouchable', 'vF5lx'], 1: ['Enchant', 'Eo8rW'], 2: ['Nature\'s Attendants', 'zFRwA'], 3: ['Impetus', '8FIdA']}}, // enchantress
		46: {imgur: 'Y1JWW', name: 'Jakiro', skills: {0: ['Dual Breath', 'qGAIJ'], 1: ['Ice Path', 'SxnXr'], 2: ['Liquid Fire', 'HXrQl'], 3: ['Macropyre', 'JLj0X']}}, // jakiro
		108: {imgur: 'cc2Lq', name: 'Chen', skills: {0: ['Penitence', 'cwXjy'], 1: ['Test of Faith', 'Nqt2y'], 2: ['Holy Persuasion', 'WOpEl'], 3: ['Hand of God', 'Ryyyx']}}, // chen
		92: {imgur: 'SFEdt', name: 'Lich', skills: {0: ['Frost Blast', 's072b'], 1: ['Ice Armor', 'ehk6B'], 2: ['Sacrifice', 'RMHHf'], 3: ['Chain Frost', 'wpOAx']}}, // lich
		112: {imgur: 'Xxdob', name: 'Lion', skills: {0: ['Earth Spike', 'zxgTF'], 1: ['Hex', 'Wv5MV'], 2: ['Mana Drain', '26PLu'], 3: ['Finger of Death', 'pSBIE']}}, // lion
		63: {imgur: 'oua6v', name: 'Witch Doctor', skills: {0: ['Paralyzing Cask', 'MiGhf'], 1: ['Voodoo Restoration', 'f2kJO'], 2: ['Maledict', 'sCXzl'], 3: ['Death Ward', 'fAw13']}}, // witchdoctor
		98: {imgur: '7BSjI', name: 'Enigma', skills: {0: ['Malefice', '8amUO'], 1: ['Demonic Conversion', 'R4ZkY'], 2: ['Midnight Pulse', 'K458y'], 3: ['Black Hole', 'PVHmG']}}, // enigma
		28: {imgur: '5OEWa', name: 'Necrolyte', skills: {0: ['Death Pulse', 'U41OV'], 1: ['Heartstopper Aura', 'g5sdP'], 2: ['Sadist', 'zm9PD'], 3: ['Reaper\'s Scythe', 'itfYT']}}, // necrolyte
		58: {imgur: 'jtgjv', name: 'Warlock', skills: {0: ['Fatal Bonds', '6eZDw'], 1: ['Shadow Word', 'h7l2z'], 2: ['Upheaval', 'f3ZoU'], 3: ['Chaotic Offering', 'IOOfz'], 4: ['Flaming Fists', 'QpkDA'], 5: ['Permanent Immolation', 'coikp']}}, // warlock
		82: {imgur: 'd7aI4', name: 'Queen of Pain', skills: {0: ['Shadow Strike', 'LreLP'], 1: ['Blink', 'Mtdgt'], 2: ['Scream of Pain', '00Sxr'], 3: ['Sonic Wave', 'YUhqp']}}, // queenofpain
		109: {imgur: 'eJbdy', name: 'Death Prophet', skills: {0: ['Crypt Swarm', 'D8akm'], 1: ['Silence', '7E0bk'], 2: ['Witchcraft', 'Dexmd'], 3: ['Exorcism', 'yUEQ8']}}, // deathprophet
		13: {imgur: '6Q84U', name: 'Pugna', skills: {0: ['Nether Blast', '7rE57'], 1: ['Decrepify', 'XMd5c'], 2: ['Nether Ward', 'Uqzdz'], 3: ['Life Drain', 'P3mit']}}, // pugna
		77: {imgur: 'tE0Oj', name: 'Dazzle', skills: {0: ['Poison Touch', 'SNnXG'], 1: ['Shallow Grave', 'J2aEn'], 2: ['Shadow Wave', 'b9U4H'], 3: ['Weave', 'bKTen']}}, // dazzle
		90: {imgur: 'cXuKu', name: 'Leshrac', skills: {0: ['Split Earth', 'MtTqZ'], 1: ['Diablolic Edict', 'mpwrP'], 2: ['Lightning Storm', 'GKdiq'], 3: ['Pulse Nova', 'JoEMt']}}, // leshrac
		93: {imgur: 'mesva', name: 'Dark Seer', skills: {0: ['Vacuum', 'js4Tz'], 1: ['Ion Shell', 'sR1mM'], 2: ['Surge', 'H1ecW'], 3: ['Wall of Replica', 'YGCJy']}}, // darkseer
		117: {imgur: 'NGWvu', name: 'Batrider', skills: {0: ['Sticky Napalm', 'cUHff'], 1: ['Flamebreak', 'RitGo'], 2: ['Firefly', '2Ir2x'], 3: ['Flaming Lasso', 'RuDSx']}}, // batrider
		128: {imgur: 'hPyYh', name: 'Ancient Apparition', skills: {0: ['Cold Feet', 'Pn3GC'], 1: ['Ice Vortex', 'it4cq'], 2: ['Chilling Touch', '0tIq2'], 3: ['Ice Blast', 'sroG7']}}, // ancientapparition
		15: {imgur: '3Qb16', name: 'Clinkz', skills: {0: ['Strafe', 'F3bIT'], 1: ['Searing Arrows', 'dFTFd'], 2: ['Skeleton Walk', 'IzoSl'], 3: ['Death Pact', '85mnq']}}, // clinkz
		123: {imgur: '68eJb', name: 'Spirit Breaker', skills: {0: ['Charge of Darkness', 'p0ztts'], 1: ['Empowering Haste', 'F4JaVs'], 2: ['Greater Bash', '7jm8Ks'], 3: ['Nether Strike', 'oglA6s']}}, // spirit breaker
		96: {imgur: 'H3fhl', name: 'Silencer', skills: {0: ['Curse of the Silent', 'w6auK'], 1: ['Glaives of Wisdom', 'MCORQ'], 2: ['Last Word', 'Is3vX'], 3: ['Global Silence', '1CHSt']}}, // silencer
		118: {imgur: 'UKvRV', name: 'Invoker', skills: {0: ['Quas', 'RgLI1'], 1: ['Wex', 'hQMk6'], 2: ['Exort', 'hm4aG'], 3: ['Invoke', 'BDR14s'], 4: ['Cold Snap', 'dzphN'], 5: ['Ghost Walk', 'Do7YZ'], 6: ['Tornado', 'pbl6x'], 7: ['EMP', 'VYuwM'], 8: ['Alacrity', 'vMwJn'], 9: ['Chaos Meteor', 'PO6oy'], 10: ['Sun Strike', 'woF82'], 11: ['Forge Spirit', 'Otr7K'], 12: ['Ice Wall', '4P7QN'], 13: ['Deafening Blast', 'TJVVR']}} // invoker
	};

	// functions
	updateIcon = function (img, dimensions, icon_type) {
		var ability_number,
			icons,
			imageHost = 'http://i.imgur.com/',
			imageType = '.png',
			n,
			m,
			newSrc,
			playdotaHeroPattern = /\/hero\/(\d+)\/(icon|thumb)/i,
			playdotaItemPattern = /\/items\/(\d+)\/*(icon|thumb)/i,
			playdotaSkillPattern = /\/hero\/(\d+)\/skill-(\d+)/i;

		switch (icon_type) {
		case ICON_ITEM:
			icons = items;
			m = img.src.match(playdotaItemPattern);
			break;
		case ICON_HERO_SKILL: // uses the same information as ICON_HERO
			icons = heroes;
			m = img.src.match(playdotaSkillPattern);
			break;
		case ICON_HERO:
			icons = heroes;
			m = img.src.match(playdotaHeroPattern);
			break;
		default:
			throw new Error('Unknown icon type.');
		}

		if (m) {
			n = m[1]; // n[1] == hero number
			if (icons.hasOwnProperty(n)) {
				if (icon_type === ICON_HERO_SKILL) {
					ability_number = m[2];	// n[2] == skill number
					newSrc = imageHost + icons[n].skills[ability_number][1] + imageType;
					img.setAttribute('alt', icons[n].skills[ability_number][0]);
					img.setAttribute('title', icons[n].skills[ability_number][0]);

				} else {
					n = m[1];
					newSrc = imageHost + icons[n].imgur + imageType;
					img.setAttribute('alt', icons[n].name);
					img.setAttribute('title', icons[n].name);
				}
				img.src = newSrc;
				img.style.width = dimensions.w;
				img.style.height = dimensions.h;
			}
		}
	};

	updateIcons = function (nodelist, dimensions) {
		var images = nodelist.getElementsByTagName('img'),
			img,
			i,
			j;

		for (i = 0; i <= images.length; i += 1) {
			img = images[i];
			if (img) {	// for some reason some of the img tags aren't img tags(wtf??).
				for (j = 0; j < urls.mediaItems.length; j += 1) {
					if (img.src.indexOf(urls.mediaItems[j]) !== -1) {
						// if item on non-items page, use the full image
						if (url !== urls.items) {
							updateIcon(img, {w: '56px', h: '38px'}, ICON_ITEM);
						} else {
							updateIcon(img, dimensions, ICON_ITEM);
						}
					}
				}
				for (j = 0; j < urls.mediaHero.length; j += 1) {
					if (img.src.indexOf(urls.mediaHero[j]) !== -1) {
						updateIcon(img, dimensions, ICON_HERO);
					}
				}

				for (j = 0; j < urls.mediaSkills.length; j += 1) {
					if (img.src.indexOf(urls.mediaSkills[j]) !== -1) {
						updateIcon(img, {w: '64px', h: '64px'}, ICON_HERO_SKILL);
					}
				}
			}
		}
	};

	onMouse = function (evt) {
		var div,
			div_class;

		div_class = url === urls.guides ? 'thelist' : 'iright';
		if (div_class === 'thelist') {
			registerEvents(); // have to reregister events toe guides as the navbar keeps changing
		}
		div = window.document.getElementById(div_class);
		updateIcons(div, containers[url][div.id]);

		evt.stopPropagation();
	};

	registerEvents = function () {
		var anchor, anchors,
			i;

		if (url === urls.items || url === urls.heroes || url === urls.guides) {
			anchors = window.document.getElementsByTagName('a');
			for (i = 0; i <= anchors.length; i += 1) {
				anchor = anchors[i];
				if (anchor) {
					if (anchor.hasAttribute('onmouseover')) {
						anchor.addEventListener('mouseover', onMouse, false);
					}
					if (anchor.hasAttribute('onclick')) {
						anchor.addEventListener('click', onMouse, false);
					}
				}
			}
		}
	};

	(function () {
		if (containers.hasOwnProperty(url)) {
			divs = window.document.getElementsByTagName('div');
			for (i = 0; i < divs.length; i += 1) {
				div = divs[i];
				if (containers[url].hasOwnProperty(div.className)) {
					updateIcons(div, containers[url][div.className]);
				}
				if (containers[url].hasOwnProperty(div.id)) {
					updateIcons(div, containers[url][div.id]);
				}
			}
		} else {
			// default dimensions to 64px/64px if known size not found in containers.
			updateIcons(window.document, {w: '64px', h: '64px'});
		}
		registerEvents();
	}());
}());
