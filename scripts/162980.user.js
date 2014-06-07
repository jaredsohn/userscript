// KoL Zone Initiative Previewer
// BETA
//
// ==UserScript==
// @name          Initiative Previewer
// @description   Preview the Initiative stats of the highest 3 monsters in a zone (work in progress)
// @include       *127.0.0.1:*
// @include       *kingdomofloathing.com*
// @version 0.1.5
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle('#initdiv{background:white;position: absolute;z-index:100000;border: solid 1px black;}#initdiv table{border-collapse:collapse;}#initdiv table td{border: solid 1px black;padding: 2px 5px}#initdiv tr > td:first-child{width:210px;}#initdiv tr > td:nth-child(2){width:40px;}');

//Your comma separated values brought to you by Redmeat
var zsnarf = new Array();
zsnarf[1001] = "Rat King,,,???,,,Group of Rats,,,60+,,,Rat,,,40"; //Rat Cellar
zsnarf[1002] = "Goblin King,,,100"; //Goblin King Throne Room
zsnarf[1003] = "Pygmy Blowgunner,,,90,,,Boaraffe,,,50,,,Pygmy Assault Squad,,,50"; //Hidden City
zsnarf[15] = "Triffid,,,70,,,Bar,,,50,,,Spooky Mummy,,,50"; //Spooky Forest
zsnarf[18] = "Gnollish Crossdresser,,,60,,,Gnollish Flyslayer,,,60,,,Gnollish Gearhead,,,60"; //Degrassi Knoll
zsnarf[26] = "Filthy Hippy,,,70,,,Dirty Hippy,,,70,,,Filthy Hippy Jewelry Maker,,,70"; //Hippy Camp (Undisguised)
zsnarf[27] = "Orcish Frat Boy,,,60,,,Orcish Frat Boy,,,60,,,Orcish Frat Boy,,,60"; //Frat House (Undisguised)
zsnarf[31] = "Baseball Bat,,,60,,,Briefcase Bat,,,60,,,Doughbat,,,60"; //Guano Junction
zsnarf[33] = "Beanbat,,,60,,,Screambat,,,50"; //Beanbat Chamber
zsnarf[34] = "Boss Bat,,,60,,,Bodyguard Bat,,,50"; //Boss Bat's Lair
zsnarf[39] = "Swarm of Killer Bees,,,90,,,Quantum Mechanic,,,80,,,Mind Flayer,,,75"; //Dungeons of Doom
zsnarf[45] = "Raging Bull,,,75,,,Handsome Mariachi,,,50,,,Irate Mariachi,,,50"; //South of the Border
zsnarf[50] = "Very Mad Scientist,,,70,,,Mad Scientist,,,70,,,Alchemist,,,50"; //Knob Goblin Laboratory
zsnarf[66] = "Shady Pirate,,,75,,,Smarmy Pirate,,,70,,,Swarthy Pirate,,,65"; //Obligatory Pirate's Cove
zsnarf[73] = "Blooper,,,60,,,Bullet Bill,,,60,,,Buzzy Beetle,,,60"; //Inexplicable Door, 8-bit Realm
zsnarf[80] = "Me4t Begz0r,,,70,,,Spam Witch,,,70,,,Lamz0r N00b,,,70"; //Valley of Rof L'm Fao
zsnarf[81] = "Spunky Princess,,,90,,,Quiet Healer,,,80,,,Protagonist,,,80"; //Penultimate Fantasy Airship
zsnarf[83] = "Astronomer,,,70,,,Constellations,,,70"; //Hole in the Sky
zsnarf[100] = "Knight in White Satin,,,70,,,White Chocolate Golem,,,70,,,White Lion,,,60"; //Whitey's Grove
zsnarf[102] = "Demonic Icebox,,,50,,,Skullery Maid,,,50,,,Zombie Chef,,,50"; //Haunted Kitchen
zsnarf[104] = "Bookbat,,,70,,,Writing Desk,,,50,,,Banshee Librarian,,,0"; //Haunted Library
zsnarf[105] = "Pooltergeist,,,70,,,Chalkdust Wraith,,,50"; //Haunted Billiards
zsnarf[107] = "Malevolent Hair Clog,,,35,,,Claw-foot Bathtub,,,25,,,Toilet Papergeist,,,0"; //Haunted Bathroom
zsnarf[108] = "Jilted Mistress,,,50,,,Nightstand (White),,,40,,,Nightstand (Black),,,30"; //Haunted Bedroom
zsnarf[109] = "Tapdancing Skeleton,,,50,,,Zombie Waltzers,,,50,,,Ghastly Oranist,,,50"; //Haunted Ballroom
zsnarf[111] = "Black Adder,,,50,,,Black Knight,,,50,,,Black Panther,,,50"; //Black Forest
zsnarf[113] = "Fiendish Can of Asparagus,,,60,,,Flame-broiled Meat Blob,,,60,,,Possessed Can of Tomatoes,,,60"; //Haunted Pantry
zsnarf[114] = "Barbecue Team,,,60,,,Sub-Assistant Mad Scientist,,,60,,,Assistant Chef,,,40"; //Outskirts of Cobb's Knob
zsnarf[119] = "Flock of Stab-bats,,,90,,,Bob Racecar,,,80,,,Racecar Bob,,,80"; //Palindome
zsnarf[122] = "Rolling Stone,,,50,,,Swarm of Scarab Beatles,,,50,,,Oasis Monster,,,50"; //Oasis
zsnarf[123] = "Swarm of Fire Ants,,,60,,,Giant Giant Giant Centipede,,,50,,,Plaque of Locusts,,,30"; //Arid, Extra-Dry Desert
zsnarf[124] = "Tomb Asp,,,70,,,Tomb Rat,,,50,,,Tomb Servant,,,20"; //Upper Chamber
zsnarf[125] = "Iiti Kitty,,,75,,,Tomb Bat,,,50,,,Tomb Servant,,,20"; //Middle Chamber
zsnarf[127] = "Larval Filthworm,,,50"; //Hatchling Chamber
zsnarf[128] = "Filthworm Drone,,,50"; //Feeding Chamber
zsnarf[129] = "Filthworm Royal Guard,,,50"; //Guards' Chamber
zsnarf[130] = "Filthworm Queen,,,50"; //Queen's Chamber
zsnarf[131] = "War Hippy Drill Sergeant,,,60,,,Orcish Frat Boy Spy,,,60,,,War Hippy (Space) Cadet,,,50"; //War-time Hippy Camp
zsnarf[132] = "Green Ops Soldier,,,100,,,War Hippy Wind Talker,,,80,,,War Hippy Sky Captain,,,70"; //The Battlefield (Frat Fatigues)
zsnarf[133] = "Frat Warrior Drill Sergeant,,,60,,,War Hippy Spy,,,60,,,War Pledge,,,40"; //War Time Frat House
zsnarf[136] = "Lobsterfrogman,,,40"; //Sonofa Beach
zsnarf[157] = "Tetchy Pirate,,,50,,,Toothy Pirate,,,50,,,Tipsy Pirate,,,50"; //Barrrney's Bar
zsnarf[158] = "Creamy Pirate,,,50,,,Curmudgeonly Pirate,,,50,,,Cleanly Pirate,,,50"; //F'c'le
zsnarf[159] = "Whacky Pirate,,,50,,,Warty Pirate,,,50,,,Whiny Pirate,,,50"; //Poop Deck
zsnarf[160] = "Gaudy Pirate,,,50,,,Grassy Pirate,,,50,,,Gritty Pirate,,,50"; //Belowdecks
zsnarf[166] = "Sewer Gator,,,60,,,Giant Zombie Goldfish,,,60,,,C.H.U.M.,,,0"; //Hobopolis Sewers
zsnarf[178] = "Skeletal Sommelier,,,65,,,Possessed Wine Rack,,,40"; //Wine Racks
zsnarf[179] = "Skeletal Sommelier,,,65,,,Possessed Wine Rack,,,40"; //Wine Racks
zsnarf[180] = "Skeletal Sommelier,,,65,,,Possessed Wine Rack,,,40"; //Wine Racks
zsnarf[181] = "Skeletal Sommelier,,,65,,,Possessed Wine Rack,,,40"; //Wine Racks
zsnarf[182] = "A.M.C. Gremlin,,,60,,,Batwinged Gremlin,,,60,,,Vegetable Gremlin,,,60"; //Barrel With Something Burning In It
zsnarf[183] = "A.M.C. Gremlin,,,60,,,Batwinged Gremlin,,,60,,,Spider Gremlin,,,60"; //Abandoned Refrigerator
zsnarf[184] = "A.M.C. Gremlin,,,60,,,Erudite Gremlin,,,60,,,Spider Gremlin,,,60"; //Over Where Those Tires Are
zsnarf[185] = "A.M.C. Gremlin,,,60,,,Erudite Gremlin,,,60,,,Vegetable Gremlin,,,60"; //Rusted-out Car
zsnarf[237] = "Demoninja,,,75,,,G Imp,,,60,,,L Imp,,,60"; //Dark Elbow of the Woods
zsnarf[238] = "Fallen Archfiend,,,80,,,G Imp,,,60,,,P Imp,,,60"; //Dark Heart of the Woods
zsnarf[239] = "Hellion,,,90,,,P Imp,,,60,,,W Imp,,,60"; //Dark Neck of the Woods
zsnarf[257] = "Off-duty Knob Goblin Elite Guard,,,50,,,Swarm of Knob Lice,,,50,,,Knob Goblin Elite Guard,,,0"; //Knob Barracks
zsnarf[258] = "Knob Goblin Master Chef,,,65,,,Knob Goblin Sous Chef,,,65,,,Cobb's Knob Oven,,,50"; //Knob Kitchens
zsnarf[259] = "Knob Goblin Harem Girl,,,80,,,Knob Goblin Madam,,,65,,,Knob Goblin Harem Guard,,,50"; //Knob Harem
zsnarf[261] = "Modern Zmobie,,,A LOT,,,Grave Rober Zmobie,,,50,,,Corpulent Zobmie,,,50"; //Defiled Alcove
zsnarf[262] = "Group of Ghuols,,,???,,,Gaunt Ghuol,,,50,,,Gluttonous Ghuol,,,50"; //Defiled Cranny
zsnarf[263] = "Dirty Old Lihc,,,???,,,Slick Lihc,,,50,,,Snile Lihc,,,50"; //Defiled Niche
zsnarf[264] = "Spiny Skelelton,,,50,,,Toothy Sklelton,,,50"; //Defiled Nook
zsnarf[270] = "Dopey 7-foot Dwarf,,,???,,,Grumpy 7-foot Dwarf,,,???,,,Sleepy 7-foot Dwarf,,,???"; //Itznotyerzitz Mine
zsnarf[271] = "Sabre-tooth Goat,,,80,,,Drunk Goat,,,80,,,Dairy Goat,,,70"; //Goatlet
zsnarf[272] = "Ninja Snowman Assassin,,,120+,,,Ninja Snowman Weaponmaster,,,75,,,Ninja Snowman,,,60"; //Lair of the Ninja Snowmen
zsnarf[273] = "eXtreme Cross-Country Hippy,,,60,,,eXtreme Orcish Snowboarder,,,60,,,Sk8 Gnome,,,60"; //Extreme Slope
zsnarf[280] = "Stone Temple Pirate,,,0,,,Baa-relief Sheep,,,0,,,Craven Carven Raven,,,0"; //Hidden Temple
//zsnarf[295] = "Smut Orc Pervert,,,???,,,Smut Orc Screwer,,,???,,,Smut Orc Nailer,,,???"; //Smut Orc Logging Camp
//zsnarf[296] = "Ghost 1,,,???,,,Ghost 2,,,???,,,Ghost 3,,,???"; //Boo Peak
zsnarf[322] = "Alphabet Giant,,,80,,,Giant 2,,,???,,,Giant 3,,,???"; //Castle Basement
zsnarf[323] = "Possibility Giant,,,40,,,Giant 2,,,???,,,Giant 3,,,???"; //Castle Ground
zsnarf[324] = "Raver Giant,,,40,,,Goth Giant,,,40,,,Giant 3,,,???"; //Castle Top

function checkInitiative(zonenum,posleft,postop)
{
	totalTop = (postop+20);
	totalLeft = (posleft+20);
	
	if((postop + 150) > $(window).height()){
		totalTop = (postop-150);
	}
	
	if((posleft+300) > $('html').width()){
		totalLeft = (posleft-300);
	}
	initwindow = '<div id="initdiv" style="top:' + totalTop + ';left:' + totalLeft + ';"><table><tr><td><center>Name</center></td><td><center>Init</center></td></tr>';
	
	if(document.location.href.indexOf('charpane.php')!==-1){
		initwindow = '<div id="initdiv" style="position: fixed !important;top:50px !important;left:0px !important;"><table><tr><td><center>Name</center></td><td><center>Init</center></td></tr>';
	}
	
	var zonenum2 = parseInt(zonenum);
	if(typeof zsnarf[zonenum2] !== 'undefined'){
		var zoneinfo = zsnarf[zonenum2].split(',,,');
		
		var i = 0;
		while(zoneinfo[i]) {
			initwindow = initwindow + '<tr><td>' + zoneinfo[i] + '</td>';
			i++;
			initwindow = initwindow + '<td>' + zoneinfo[i] + '</td></tr>';
			i++;
		}
	} else {
		initwindow = initwindow + '<tr><td style="text-align:center;" colspan="2">No Data</td></tr>';
	}
	initwindow = initwindow + '</table></div>';
	$('body').prepend(initwindow);
}

$(document).ready(function() {
	$(document).mousemove(function(e){
    	mouseX = e.pageX;
		mouseY = e.pageY;
   	});
	
	$('a[href*="snarfblat"],area[href*="snarfblat"]').hover(
		function() {
			inlink = $(this).attr('href');
			linkpos = $(this).offset();
			var snarfblat = inlink.split("=");
			checkInitiative(snarfblat[1], mouseX, mouseY);
		},
		function() {
			$('#initdiv').remove();
		}
	);
	
	$('a[href*="cellar.php"]').hover(
		function() {
			linkpos = $(this).offset();
			checkInitiative(1001, mouseX, mouseY);
		},
		function() {
			$('#initdiv').remove();
		}
	);
	
	$('area[href*="throneroom"]').hover(
		function() {
			linkpos = $(this).offset();
			checkInitiative(1002, mouseX, mouseY);
		},
		function() {
			$('#initdiv').remove();
		}
	);
	
	$('a[href*="hiddencity"]').hover(
		function() {
			linkpos = $(this).offset();
			checkInitiative(1003, mouseX, mouseY);
		},
		function() {
			$('#initdiv').remove();
		}
	);
});