// ==UserScript==
// @name          	Pardus NPC Info in Combat
// @author        	Rhindon, updated by Faziri
// @namespace		pardus.at
// @description		Shows detailed though approximate information about the NPC you are fighting.
// @include       	http*://*.pardus.at/ship2opponent_combat.php*
// ==/UserScript==

// There are no user-defined variables. However, you may change the labels (a few lines lower) that appear on your screen.
// If you want to add or correct monster data, go ahead but please send your data and a log to prove it to Rhindon or Faziri.
// The ~ in the version number indicates updates, as there are no real upgrades, unless a significant amount of monster data is added.

// Please, when fighting a monster, compare your skills before and after the fight and let me know which skill were most increased by that specific NPC!
// The data will be added to the table in abbrevated form: Tactics: Tact, Hit Accuracy: HA, Maneuver: Man, Weaponry: Weap, Engineering: Eng.

var monster = new Array();

labels = "Name~XP gained~Hull Points~Armor Points~Armor Type~Shield Points~Weapon 1~Damage 1~Weapon 2~Damage 2~Weapon 3~Damage 3~Weapon 4~Damage 4~Tactics~Hit Accuracy~Maneuver~Weaponry~Engineering~Respawn Details~Cloaking~Retreat Hold~Skill(s) most increased";

monster[0 ] = "Space Maggot~15~300~0~-~0~Slime Hurler~15x1 Organic~-~-~-~-~-~-~15~14~14~22~12~6m~-~Probably not~Please tell Faziri";
monster[1 ] = "Young Space Dragon~30~120~60~x1 Electro-Magnetic~0~Dragon Breath~60x1 Electro-Magnetic~-~-~-~-~-~-~16~28~16~18~15~18m~-~Very rare~Please tell Faziri";
monster[2 ] = "Bio Scavenger~40~300~0~-~0~Bio-Acid Secretor~24x1 Organic~-~-~-~-~-~-~18~21~18~23~15~18m~-~Probably not~Please tell Faziri";
monster[3 ] = "Inexperienced Pirate~50~300~240~x1 Conventional~60~30MW Mining Laser~15x1 Conventional~5MW Impulse Laser~30x1 Conventional~KL760 Homing Missile ~90 Conventional, ART:4, Int:1~-~-~21~22~22~23~18~30m~Often in Energy~?~Please tell Faziri";
monster[4 ] = "Space Worm~60~300~60~x1 Organic~0~Acid Slime Hurler~42x2 Organic~-~-~-~-~-~-~22~35~30~22~20~3h~-~?~Please tell Faziri";
monster[5 ] = "Space Worm Albino~60~330~90~x1 Organic~0~Acid Slime Hurler~42x2 Organic~-~-~-~-~-~-~22~33~30~26~20~3h~-~?~Please tell Faziri";
monster[6 ] = "Elder Space Dragon~80~450~150~x1 Electro-Magnetic~0~Deadly Dragon Breath~48x2 Electro-Magnetic~-~-~-~-~-~-~26~30~26~26~20~54m~-~Often~Please tell Faziri";
monster[7 ] = "Sarracenia~90~585~345~x1 Organic~0~Death Spores~42x3 Organic~-~-~-~-~-~-~35~21~35~32~20~?~Often in Nebula~Often~Please tell Faziri";
monster[8 ] = "Hidden Drug Stash~50~150~375~x3 Conventional~0~Random~?~-~-~-~-~-~-~26~30~26~35~28~Always in Energy~Always~Click Nav to retreat safely~Please tell Faziri";
monster[9 ] = "Experienced Pirate~100~360~285~x2 Conventional~120~5MW Impulse Laser~30x1 Conventional~20MW Particle Laser~60x2 Conventional~LV111 Intelligent Missile~135 Conventional, ART:4, Int:2~-~-~26~30~26~30~24~1h~Often in Energy~Often~Please tell Faziri";
monster[10] = "X-993 Squad~130~975~0~-~0~5MW Impulse Laser~30x1 Conventional~5MW Impulse Laser~30x1 Conventional~5MW Impulse Laser~30x1 Conventional~5MW Impulse Laser~30x1 Conventional~35~43~55~33~28~48m~-~Often~Man";
monster[11] = "Ice Beast~90~225~525~x1 Organic~0~Glacial Blast~42x2 Organic~Glacial Spikes~320 Conventional, ART:4, Int:?~-~-~-~-~41~45~38~40~24~?~-~Very rare~Tact, Weap";
monster[12] = "Blood Amoeba~170~615~450~x1 Organic~0~Amoeba Clots~36x2 Organic~Amoeba Blob~135 Conventional, ART:4, Int:?~-~-~-~-~42~42~41~31~25~?~Often in Nebula~Often~Please tell Faziri";
monster[13] = "Slave Trader~180~460~125~x4 Electro-Magnetic~660~20 MW Particle Laser~60x2 Conventional~120 MT Magnetic Defractor~51x2 Electro-Magnetic~Illegal Underground Missile~315 Conventional, ART:3, Int:4~-~-~45~55~28~45~28~?~Often in Energy~Click Nav to retreat safely~Please tell Faziri";
monster[14] = "Exo Crab~130~255~105~x4 Pardus~0~Exo Ray~84x1 Pardus~Exo Ray~84x1 Pardus~-~-~-~-~33~45~40~43~25~11m~-~?~Please tell Faziri";
monster[15] = "Wormhole Monster~270~375~150~x3 Electro-Magnetic~0~Subspace Splitter~250x1 Electro-Magnetic~-~-~-~-~-~-~?~?~?~?~?~Rapid, on Energy~-~?~Weap";
monster[16] = "Blue Crystal~300~600~480~x2 Electro-Magnetic~0~Cold Ray~39x2 Electro-Magnetic~Light Ice Ray~165x1 Electro-Magnetic~Energy Shockwave~135 Conventional, ART:4, Int:?~-~-~40~43~40~42~30~6h~-~Common~Man, Weap";
monster[17] = "X-993 Battlecruiser~470~450~375~x3 Electro-Magnetic~0~20MW Particle Laser~60x2 Conventional~6MW Gatling Laser~48x3 Conventional~LV111 Intelligent Missile~135 Conventional, ART:4, Int:2~-~-~62~46~45~45~29~7h~-~Common~Please tell Faziri";
monster[18] = "Space Snail~500~40~485~x3 Conventional~0~Glacial Ripple~106x1 Organic~Glacial Ripple~106x1 Organic~Big Glacial spikes~740 Conventional, ART:?, Int:?~Glacial Spikes (Snail)~380 Conventional, ART:?, Int:?~35~42~35~33~25~6h~-~?~Please tell Faziri";
monster[19] = "Frost Crystal~520~600~265~x5 Organic~0~Glacial Ripple~106x1 Organic~Glacial Ripple~106x1 Organic~Big Glacial Spikes~740 Conventional, ART:?, Int:?~Glacial Spikes (Crystal)~420 Conventional, ART:?, Int:?~51~46~51~35~25~?~Often in Nebula~?~Please tell Faziri";
monster[20] = "Roidworm Horde~570~900~600~x2 Organic~0~Roid Plasma~160x1 Conventional~Roid Plasma~160x1 Conventional~Tiny Asteroid~255 Conventional, ART:4, Int:?~-~-~50~55~50~42~28~<6h~-~?~Please tell Faziri";
monster[21] = "Energy Sparker~580~500~365~x4 Electro-Magnetic~660~Positron Energizer ~60x2 Electro-Magnetic~Positron Energizer~60x2 Electro-Magnetic~-~-~-~-~62~61~62~42~32~Random~Usually in Energy~Rare~HA, Man, Tact";
monster[22] = "Space Dragon Queen~500~600~600~x2 Electro-Magnetic~0~Unknown Dragon Breath~210x1 Electro-Magnetic~Energetic Dragon Breath~48x2 Electro-Magnetic~Subspace Ripple~135 Conventional, ART:4, Int:?~-~-~51~35~40~40~25~6h 30m~-~Often~Please tell Faziri";
monster[23] = "Swarm of Energy Bees~600~1080~225~x4 Electro-Magnetic~660~Positron Stinger~40x3 Electro-Magnetic~Positron Stinger~40x3 Electro-Magnetic~-~-~-~-~60~62~60~38~30~?~-~Often~Please tell Faziri";
monster[24] = "X-Hole Monster~700~450~255~x4 Electro-Magnetic~0~Subspace Splitter~330x2 Electro-Magnetic~-~-~-~-~-~-~?~50~?~?~?~Rapid~-~?~Please tell Faziri";
monster[25] = "Medusa Swarmlings~800~450~750~x3 Organic~120~Small Tentacles~42x2 Organic~Small Tentacles~42x2 Organic~Small Tentacles~42x2 Organic~-~-~60~66~62~37~30~Random~-~Often~Man, Tact, Eng";
monster[26] = "Space Crystal~1000~1050~1050~x4 Electro-Magnetic~270~Ice Ray~210x1 Electro-Magnetic~Ice Ray~210x1 Electro-Magnetic~Ice Ray~210x1 Electro-Magnetic~-~-~60~55~55~40~33~2d~-~Often~Please tell Faziri";
monster[27] = "Solar Banshee~1120~730~1350~x3 Electro-Magnetic~420~Hyperfrequent Protuberance ~175x4 Electro-Magnetic~-~-~-~-~-~-~56~66~55~42~35~?~?~Very often~Please tell Faziri";
monster[28] = "Famous pirate~1250~600~600~x3 Conventional~660~100MW Particle Laser~84x2 Conventional~Large Pulse Cannon~165x1 Electro-Magnetic~NN500 Fleet Missile~255 Conventional, ART:4, Int:2~-~-~60~70~60~40~30~12h~Often in Energy~Very often~Please tell Faziri";
monster[29] = "Medusa~1790~900~1350~x4 Organic~120~Big Tentacles~100x1 Organic~Small Tentacles~50x1 Organic~Small Tentacles~50x1 Organic~-~-~64~63~64~42~30~Random~-~Very often~Man, Tact";
monster[30] = "X-993 Mothership~1600~1050~900~x4 Conventional~420~100MW Particle Laser~84x2~100MW Particle Laser~84x2~NN500 Fleet Missile~255 Conventional, ART:4, Int:2~-~-~?~65~?~?~?~2d 6h~-~Very often~Please tell Faziri";
monster[31] = "Z15 Scout~1700~360~1080~x4 Conventional~420~60MW Particle Laser~72x2 Conventional~60MW Particle Laser~72x2 Conventional~KL760 Homing Missile~90 Conventional, ART:4, Int:1~-~-~?~75~?~?~?~18h 12m, Roaming~-~Very often~Please tell Faziri";
monster[32] = "Z15 Repair Drone~2084~450~900~x5 Conventional~420~120MW Particle Laser~100x2 Conventional~120MW Particle Laser~100x2 Conventional~Z700 Avenger (Drone)~255 Conventional, ART:5, Int:?~-~-~60~82~60~35~31~26h~-~Very often~Please tell Faziri";
monster[33] = "Z15 Fighter~2432~600~720~x5 Conventional~660~120MW Particle Laser~100x2 Conventional~120MW Particle Laser~100x2 Conventional~Z700 Avenger (Drone)~270 Conventional, ART:5, Int:3~-~-~70~85~70~35~32~28h~-~Very often~Please tell Faziri";
monster[34] = "Z15 Spacepad~3150~1150~1052~x5 Conventional~660~Spacepad Artillery~115x5 Conventional~4 x Modified NN500 Fleet Missile~4 x 240 Conventional, ART:4, Int:2~-~-~-~-~?~?~?~?~?~?~-~?~Please tell Faziri";
monster[35] = "Z16 Fighter~2700~940~960~x5 Conventional~420~170MW Impulse Laser~240x1 Conventional~170MW Impulse Laser~240x1 Conventional~Z700x Avenger (Drone)~350 Conventional, ART:?, Int:?~-~-~?~105~?~?~?~?, Roaming~-~Very often~Please tell Faziri";
monster[36] = "Z16 Repair Drone~3000~840~960~x5 Conventional~420~170MW Particle Laser (Unstable)~126x2 Conventional~170MW Particle Laser (Unstable)~126x2 Conventional~4 x Modified NN500 Fleet Missile~4 x 240 Conventional, ART:4, Int:2~-~-~?~85~?~?~?~?~-~Very often~Please tell Faziri";
monster[37] = "Shadow~5000~2500~400~x5 Pardus~0~Unanalizable weapon~400x1 Pardus~Unanalizable weapon~400x1 Pardus~-~-~-~-~?~?~?~?~?~21d~-~Very often~Please tell Faziri";
monster[38] = "Stheno Swarmlings~750~450~500~x3 Organic~270~Small Deformed Outgrowth~45x3 Organic~Small Deformed Outgrowth~45x3 Organic~Bags of Nanoblobs~175 Conventional, ART:1, Int:?~-~-~55~70~65~38~33~?~-~Very often~Please tell Faziri";
monster[39] = "Stheno~2300~1250~1750~x4 Organic~120~Deformed Outgrowth~100x2 Organic~Microblobs~100 Conventional, ART:7, Int:?~-~-~-~-~55~70~55~42~32~?~-~Very often~Please tell Faziri";
monster[40] = "Mutated Space Worm~490~350~165~x4 Organic~-~Viral Acid Slime Hurler~120x1 Electro-Magnetic~Contaminated Tail-Spikes~?x? Organic~-~-~-~-~55~55~55~40~30~?~-~?~Please tell Faziri";
monster[41] = "Mutated Space Maggot~130~350~80~x2 Organic~0~Viral Slime Hurler~?x2 Organic~-~-~-~-~-~-~29~35~30~37~18~6-12m~-~?~Please tell Faziri";
monster[42] = "Rive Crystal~1550~550~720~x4 Pardus~270~Hyperfrequent Pulsar~200x1 Pardus~Rive Wave~?x4 Electro-Magnetic~-~-~-~-~60~60~60~45~35~?~-~Often~Please tell Faziri";
monster[43] = "Nebula Serpent~185~330~500~x2 Organic~-~Biotoxic Breath~90x1 Organic~Serpent Quill~55 Conventional, ART:7, Int:?~Serpent Scales~300 Conventional, ART:2, Int:?~-~-~38~35~38~35~22~?~In Nebula~Rare~Please tell Faziri";
monster[44] = "Infected Creature~750~500~590~x5 Organic~270~Random~?~-~-~-~-~-~-~50~55~50~45~32~In Viral Clouds~-~?~Please tell Faziri";
monster[45] = "Euryale Swarmlings~1400~500~950~x4 Organic~270~Undeveloped Outer Tentacles ~110x2 Organic~Undeveloped Inner Tentacles~40x3 Organic~Undeveloped Inner Tentacles~40x3 Organic~-~-~75~72~75~43~38~?~-~Very often~Please tell Faziri";
monster[46] = "Euryale~4800~2000~1450~x5 Organic~600~Outer tentacles~150x2 Organic~Inner tentacles~50x3 Organic~Inner tentacles~50x3 Organic~-~-~100~95~85~60~55~?~-~Very often~Please tell Faziri";
monster[47] = "Energy Minnow~75~30~150~x2 Electro-Magnetic~270~Minnow Sparks~1x45 Electro-Magnetic~-~-~-~-~-~-~22~23~26~40~22~?~In Energy~Often~Please tell Faziri";
monster[48] = "Drosera~140~375~495~x2 Organic~0~Death Spores~42x3 Organic~-~-~-~-~-~-~55~26~41~39~24~?~In Nebula~Rare~Please tell Faziri";
monster[49] = "Cyborg Manta~430~500~355~x4 Conventional~0~Claw Cannon~50x2 Electro-Magnetic~Manta Rocket~205 Conventional, ART:10, Int:?~-~-~-~-~45~62~35~30~34~9h~In Open Space~Often~Please tell Faziri";
monster[50] = "Ancient Crystal~2050~1250~1100~4x Pardus~420~Ancient Shock~260x1 Pardus~Ancient Shock~260x1 Pardus~Ancient Sting~1000 Conventional, ART:1, Int:?~-~-~58~60~58~45~28~?~-~?~Please tell Faziri";
monster[51] = "Oblivion Vortex~-~450~810~x5 Pardus~420~Exotic Blaze~220x1 Pardus~Exotic Blaze~220x1 Pardus~Oblivion Blaze~540 Conventional, ART:4, Int:?~-~-~?~62~60~58~32~?~In Open Space~Very often~Please tell Faziri";
monster[52] = "Verdant Manifestation~70~60~190~x1 Pardus~0~E-3 Bubbles~?x? Pardus~-~-~-~-~-~-~28~30~28~25~23~?~In Open Space~?~Please tell Faziri";
monster[53] = "Ripe Manifestation~1200~270~660~x3 Pardus~270~E-4 Bubbles~55x2 Pardus~Exotic Blaze~220x1 Pardus~-~-~-~-~62~58~61~45~32~?~In Open Space~?~Please tell Faziri";
monster[54] = "Developed Manifestation~185~110~220~x3 Pardus~120~E-4 Bubbles~55x2 Pardus~-~-~-~-~-~-~35~50~35~36~23~?~In open Space~?~Please tell Faziri";
monster[55] = "Asp Mother~1500~1000~740~x5 Pardus~420~Asp Shocker~110x1 Electro-Magnetic~Asp Spit~110x1 Organic~Asp Stinger~110x1 Pardus~-~-~58~65~55~35~30~?~-~Often~Please tell Faziri";
monster[56] = "Asp Hatchlings~725~225~560~x4 Pardus~270~Small Asp Shocker~50x2 Electro-Magnetic~Small Asp Shocker~50x2 Electro-Magnetic~Small Asp Shocker~50x2 Electro-Magnetic~-~-~67~60~55~42~30~Roaming~-~?~Please tell Faziri";
monster[57] = "Lucidi Mothership~34,463~2000~1550~5x Pardus~1800~Lucidi Cannon~?x2~Lucidi Cannon~?x2~Lucidi Cannon~?x2~Lucidi Ultimate Redeamer~800 Conventional, ART:10, Int:?~?~?~?~?~?~?~-~Very often~Please tell Faziri";
monster[58] = "Lucidi Squad~7500~425~625~x5 Pardus~900~Lucidi Plasma Thrower~90x2 Pardus~Lucidi Plasma Thrower~90x2 Pardus~Lucidi Plasma Thrower~90x2 Pardus~Lucidi Strike Rocket~1200 Conventional, ART:2, Int:?~107~114~107~100~85~Roaming~In Open Space~Very often~Please tell Faziri";
monster[59] = "Xalgucennia~19O0~780~860~x4 Organic~0~Acid Tentacles~80x2 Electro-Magnetic~Acid tentacles~80x2 Electro-Magnetic~Huge Cosmic Eye~270x1 Conventional~-~-~55~62~53~38~28~Roaming~-~?~Please tell Faziri";
monster[60] = "Ceylacennia~4450~1200~1040~x5 Organic~270~?~?~?~?~?~?~?~?~?~65~?~?~?~Roaming~In Viral Clouds~?~Please tell Faziri";
monster[61] = "Lucidi Warship~14,215~?~?~?~?~Lucidi Gunturret~?x2 Conventional~Lucidi Gunturret~?x2 Conventional~Lucidi Ultimate Redeamer~800 Conventional, ART:10, Int:?~-~-~?~?~?~?~?~?~-~Very often~Please tell Faziri";
monster[62] = "Mutated Medusa~2400~600~1350~x4 Pardus~120~Small Tentacles~42x2 Organic~Small Tentacles~42x2 Organic~Big Mutated Tentacles~90x2 Pardus~Energy Shockwave (Medusa)~255 Conventional, ART:4, Int:?~85~85~90~45~35~?~-~Very often~Please tell Faziri";
monster[63] = "Feral Serpent~10,155~440~440~x5 Pardus~1760~Feral Venom~50x3 Pardus~Feral Venom~50x3 Pardus~Tail Lash~75x2 Pardus~-~-~?~?~?~?~?~Roaming~-~Very often~Please tell Faziri";
monster[64] = "Space Clam~70~20~330~x2 Organic~-~Concentrated Clam Saliva~100 Conventional, ART:4, Int:?~-~-~-~-~-~-~?~25~?~?~?~?~?~Common~Please tell Faziri";
monster[65] = "Gorefangling~45~150~300~x1 Organic~0~Small Gore-Fang ~25x3 Conventional~-~-~-~-~-~-~18~21~18~23~15~In Nebula~In Nebula~?~Please tell Faziri";
monster[66] = "Swarm of Gorefanglings~95~300~300~x1 Organic~0~Small Gore-Fang~25x3 Conventional~Small Gore-Fang~25x3 Conventional~Disintegrating Net~175 Conventional, ART:4, Int:?~-~-~?~25~?~?~?~In Nebula~In Nebula~Common~Please tell Faziri";
monster[67] = "Gorefang~150~270~260~x3 Organic~0~Gore-Fang~73x1 Organic~Gore-Fang~73x1 Organic~-~-~-~-~?~?~?~?~?~In Nebula~In Nebula~Common~Please tell Faziri";
monster[68] = "Starclaw~2750~850~550~x4 Organic~270~Giant Claw~?~Giant Claw~?~Giant Claw~Hug of Death (2x!)~870x1 Organic~?~?~62~?~?~?~?~?~Common~Please tell Faziri";
monster[69] = "Eulerian~250~300~240~x4 Organic~0~Integrator Spores~Antlers~-~-~47x1 Organic~? Organic, ART:2, Int:?~-~-~?~?~?~?~?~In Nebula~Sometimes~Common~Please tell Faziri";
monster[70] = "Nebula Mole~650~390~330~x3 Organic~0~?~?~?~?~?~?~?~?~?~65~?~45~?~Usually in Nebula, roaming~Sometimes~Common~Please tell Faziri";
monster[71] = "Glowprawn~3340~250~1200~x5 Organic~420~?~?~?~?~?~?~?~?~?~65~78~?~?~Roaming~-~Often~Please tell Faziri";
monster[72] = "Dreadscorp~1080~600~990~x3 Organic~0~?~?~?~?~?~?~?~?~65~80~60~45~35~?~?~?~Please tell Faziri";
monster[73] = "Preywinder~3480~1500~1050~x5 Organic~120~?~?~?~?~?~?~?~?~?~70~90~70~?~Roaming~?~Very often~Please tell Faziri";
monster[74] = "Lone Smuggler~?~720~405~x4 Conventional~0~LV111 Intelligent Missile~135 Conventional, ART:4, Int:2~-~-~-~-~-~-~?~?~?~?~?~Roaming~On Open Space and Energy~Click Nav to retreat safely~Please tell Faziri";
monster[75] = "Escorted Smuggler~620~720~405~x4 Conventional~0~5MW Impulse Laser~30x1 Conventional~20MW Particle Laser~60x2 Conventional~20MW Particle Laser~60x2 Conventional~LV111 Intelligent Missile~135 Conventional, ART:4, Int:2~?~35~40~35~?~Roaming~On Open Space and Energy~Rare~Please tell Faziri";
monster[76] = "Scorpion Fighter~?~?~?~?~?~-~-~-~-~-~-~-~-~?~?~?~?~?~?~?~?~Please tell Faziri";


bs = document.getElementsByTagName('b');

monsterName = bs[1].innerHTML + "~";
monsterInfo = "";
monsterFound = false;

for(i = 0; i < monster.length && !monsterFound; i++) {
  if(monster[i].toUpperCase().indexOf(monsterName.toUpperCase()) == 0) {

    monsterFound = true;
    
    infoArray = monster[i].split('~');
    lablArray = labels.split('~'); // these two lines separate the labels from each other and the monster data entries from each other
    
    mhtml = '<table style="border: ridge 2px gray; width: 100%;">';
    
    for(j = 0; j < infoArray.length; j += 2) {
    
      mhtml += '<tr>';
      mhtml += '<td nowrap>' + lablArray[j] + '</td><td nowrap>' + infoArray[j] + '</td>'
      if(lablArray[j + 1] && infoArray[j + 1]) {
        mhtml += '<td nowrap style="border-left: solid 1px gray;">&nbsp;&nbsp;' + lablArray[j + 1] + '</td><td nowrap>' + infoArray[j + 1] + '</td>'
			}
		else {
        mhtml += '<td style="border-left: solid 1px gray;">&nbsp;</td><td>&nbsp;</td>';
			}
      mhtml += '</tr>';
		}
    mhtml += '</table>';
	}
}

if(!monsterFound) {

    mhtml = '<table style="border: ridge 2px gray; width: 100%;">';
    
    mhtml += '<tr><td><h2>Sorry, NPC not found in database!</h2></td></tr>'; // the text to be displayed if the NPC wasn't recognised
    
    mhtml += '</table>';

}

tables = document.getElementsByTagName('table');

var tableIndex = 2;

var row = tables[tableIndex].insertRow(1);
var cell = row.insertCell(0);
cell.colSpan = 2;
cell.innerHTML = mhtml;