// ==UserScript==
// @name           NPC Information on Combat Screen
// @namespace      pardus.at
// @description    Displays NPC information on the Combat screen
// @include        http://*.pardus.at/ship2opponent_combat.php*
// @version        1.2.2
// @author         Rhindon
// ==/UserScript==


// ///////////////////////////////////////////////////////////////////////////
// User Variables
// ///////////////////////////////////////////////////////////////////////////

// None

// ///////////////////////////////////////////////////////////////////////////
// Monster Information
// ///////////////////////////////////////////////////////////////////////////

var monster = new Array();

labels = "Name~XP~Hullpoints~Armor points~Armor type~Shield~Weapon1~Damage1~Weapon2~Damage2~Weapon3~Damage3~Weapon4~Damage4~Tactis Limit~Hit Accuracy limit~Maneuver Limit~Weaponry Limit~Engineering Limit~Average respawn~Cloaking~Holds (# * rounds)";

monster[0 ] = "Space Maggot~15~300~0~-~0~Slime hurler~15x1 conv~-~-~-~-~-~-~?~?~?~?~?~6-12m~-~?";
monster[1 ] = "Young Space Dragon~30~120~60~x1 em~0~Dragon Breath~15x1 em~-~-~-~-~-~-~?~15~?~?~?~18m~-~?";
monster[2 ] = "Bio Scavenger~40~300~0~-~0~Bio-Acid Secretor~24x1 org~-~-~-~-~-~-~<26~?~<26~?~?~18m~-~?";
monster[3 ] = "Inexperienced Pirate~50~300~240~x1 conv~60~30MW mining laser~15x1 conv~5MW impulse laser~30x1 conv~KL760 Homing Missile ~90x0,2 conv~-~-~?~<20~?~?~?~30m~often in energy~?";
monster[4 ] = "Space Worm~60~300~60~x1 org~0~Acid Slime Hurler~42x2 org~-~-~-~-~-~-~?~30~?~?~?~?~-~?";
monster[5 ] = "Space Worm Albino~60~330~90~x1 org~0~Acid Slime Hurler~42x2 org~-~-~-~-~-~-~?~35~?~?~?~72m~-~?";
monster[6 ] = "Elder Space Dragon~80~450~150~x1 em~0~Deadly Dragon Breath~48x2 em~-~-~-~-~-~-~?~28~?~?~?~54m~-~?";
monster[7 ] = "Sarracenia~90~585~345~x1 org~0~Death Spores~42x3 org~-~-~-~-~-~-~?~20~?~?~?~?~often in nebula~?";
monster[8 ] = "Hidden drug stash~50~150~375~x3 conv~0~50% Heavy Subspace Ripper~710x1~-~-~-~-~-~-~?~?~?~?~?~?~allways in energy~?";
monster[9 ] = "Experienced Pirate~100~360~285~x2 conv~120~5MW impulse laser~30x1 conv~20MW particle laser~60x2 conv~LV111 Intelligent missile~135x0,2 conv~-~-~28~30~28~27~28~36m~often in energy~?";
monster[10] = "X-993 Squad~130~975~0~-~0~5MW impulse laser~30x1 conv~5MW impulse laser~30x1 conv~5MW impulse laser~30x1 conv~5MW impulse laser~30x1 conv~?~40~?~?~?~48m~-~?";
monster[11] = "Ice Beast~120~225~525~x1  org~0~Glacial Blast~42x2 org~Glacial Spikes~310x0,2 conv~-~-~-~-~?~40~?~?~?~4h~-~?";
monster[12] = "Blood Amoeba~170~615~450~x1 org~0~Amoeba Clots~36x2 org~Amoeba Blob~135x0,2 conv~-~-~-~-~?~35~?~?~?~?~often in nebula~?";
monster[13] = "Slave Trader~180~460~125~x4 em~660~20 MW Particle Laser~60x2 conv~120 MT Magnetic Defractor~51x2 em~Illegal underground missile int4~375x0,14 conv~-~-~?~55~?~?~?~?~often in energy~?";
monster[14] = "Exo Crab~140~255~105~x4 pardus~0~Exo Ray~84x1 pardus~Exo Ray~84x1 pardus~-~-~-~-~?~?~?~?~?~random~-~?";
monster[15] = "Wormhole Monster~270~375~150~x3 em~0~Subspace Splitter~250x1 em~-~-~-~-~-~-~?~?~?~?~?~random~-~?";
monster[16] = "Blue Crystal~300~600~480~x2 em~0~Cold Ray~39x2 em~Light Ice Ray~165x1 em~Energy Shockwave~135x0,2 conv~-~-~?~40~?~?~?~6h 6m~-~?";
monster[17] = "X-993 Battlecruiser~470~450~375~x3 em~0~20MW Particle Laser~60x2 conv~6MW Gatling Laser~48x3 conv~LV111 Intelligent Missile~135x0,2 conv~-~-~?~38~?~?~?~6h 40m~-~?";
monster[18] = "Space Snail~500~40~485~x3 conv~0~Snail Slime~240x1 org~Big Glacial Spikes~740x? ? Int 2~Glacial spike~380x? ? Int 2~-~-~?~40~?~?~?~?~-~?";
monster[19] = "Frost Crystal~520~600~265~x5 org~0~Glacial Ripple~106x1 org~Glacial Ripple~106x1 org~Big Glacial Spikes~750x0,14 conv~Glacial Spikes~420x? conv~?~50~?~?~?~?~often in nebula~?";
monster[20] = "Roidworm horde~570~900~600~x2 org~0~Roid Plasma~160x1 conv~Roid Plasma~160x1 conv~Tiny Asteroid~255x0,2 conv~-~-~?~55~?~?~?~6h 18m~-~?";
monster[21] = "Energy Sparker~580~500~365~x4 em~660~Positron Energizer ~60x2 em~Positron Energizer ~60x2 em~-~-~-~-~?~60~?~?~?~?~sometimes in energy~?";
monster[22] = "Space Dragon Queen~600~600~600~x2 em~0~Unknown kind of Dragon Breath~220x1 em~Energetic Dragon Breath~51x2 em~Subspace Ripple~175x0,2 conv Int 2~-~-~?~36~?~?~?~4h - 8h~-~?";
monster[23] = "Energybees~600~1080~225~x4 em~660~Positron Stinger~40x3 EM~Positron Stinger~40x3 EM~-~-~-~-~?~62~?~?~?~?~-~?";
monster[24] = "X Hole Monster~770~450~255~x4 em~0~Subspace Splitter~330x2 EM~-~-~-~-~-~-~?~50~?~?~?~random~-~?";
monster[25] = "Medusa Swarmlings~800~450~750~x3 org~120~Small Tentacles~42x2 org~Small Tentacles~42x2 org~Small Tentacles~42x2 org~-~-~?~66~?~?~?~random~-~? * 8";
monster[26] = "Space Crystal~1000~1050~1050~x4 em~270~Ice Ray~210x1 em~Ice Ray~210x1 em~Ice Ray~210x1 em~-~-~?~55~?~?~?~1d12h - 3d0h~-~?";
monster[27] = "Solar Banshee~1120~730~1350~x3 em~420~Hyperfrequent Protuberance ~175x4 em~-~-~-~-~-~-~60~65~60~>40~>33~?~?~?";
monster[28] = "Famous pirate~1250~600~600~x3 conv~660~100MW Particle~84x2 conv~Large Pulse Cannon~165x1 em~NN500 Fleet missile~255x0,2 conv~-~-~?~70~?~?~?~12h 6m~often in energy~?";
monster[29] = "Medusa~1770~900~1350~x4 org~120~Big Tentacles~78x2 org~Small Tentacles~42x2 org~Small Tentacles~42x2 org~Energy shockwave~170x0,2 conv~65~63~65~?~?~random~-~?";
monster[30] = "X-993 Mothership~1600~1050~900~x4 conv~420~100MW Particle Laser~84x2~100MW Particle Laser~84x2~NN500 Fleet Missile~255x0,2 conv~-~-~?~65~?~?~?~2d 5h 30m~-~? * 21";
monster[31] = "z15 scout~1700~360~1080~x4 conv~420~60MW Particle Laser~72x2 conv~60MW Particle Laser~72x2 conv~KL760 Homing Missile~90x0,2~-~-~?~75~?~?~?~18h 12m Moving~-~?";
monster[32] = "z15 repair drone~2080~450~900~x5 conv~420~120MW Particle Laser~100x2 conv~120MW Particle Laser~100x2 conv~Modified NN500 Fleet / Z700 Avenger~255x0,25 conv~-~-~?~82~?~?~?~1d 2h 12m~-~? * 11";
monster[33] = "z15 fighter~2430~600~720~x5 conv~660~120MW Particle Laser~100x2 conv~120MW Particle Laser~100x2 conv~Modified NN500 Fleet / Z700 Avenger~270x0,25 conv int:3~-~-~?~?~?~?~?~1d 4h 12m~-~?";
monster[34] = "z15 spacepad~3150~1150~1150~x5 conv~660~Spacepad Artillery~160x4 conv~Modified NN500 Fleet~270x0,25 conv~-~-~-~-~?~?~?~?~?~>1d On energy~-~? * 18";
monster[35] = "z16 fighter~2700~640~800~x5 conv~660~170MW Impulse Laser~240x1 conv~170MW Impulse Laser~240x1 conv~Z700x Avenger Missile~350x? conv~-~-~?~?~?~?~?~? Moving~-~?";
monster[36] = "z16 repair drone~3000~840~960~x5 conv~420~Unstable 170MW Particle Laser~126x2 conv~Unstable 170MW Particle Laser~126x2 conv~Modified NN500 Fleet / Z700 Avenger~270x0,25 conv~-~-~?~?~?~?~?~?~-~? * 24";
monster[37] = "Shadow~5000~2500~400~x5 pardus~0~Unanalizable weapon~400x1 pardus~Unanalizable weapon~400x1 pardus~-~-~-~-~?~?~?~?~?~21d random~-~?";
monster[38] = "Stheno Swarmlings~750~450~500~x3 org~270~Small Deformed Outgrowth~45x3 org~Small Deformed Outgrowth~45x3 org~Bags of Nanoblobs~175x0,5~-~-~?~>70~?~?~?~?~-~?";
monster[39] = "Stheno~2300~1250~1750~x4 org~120~Deformed Outgrowth~100x2 org~Microblobs~100x0,33~-~-~-~-~?~60~?~?~?~?~-~?";
monster[40] = "Mutated Space Worm~490~350~165~x2 org~-~Viral Acid Slime Hurler~160x1 em~Contaminated Tail-Spikes~670x0,2~-~-~-~-~?~?~?~?~?~?~-~?";
monster[41] = "Mutated Space Maggot~130~350~80~x2 org~0~Viral Slime Hurler~150x2~-~-~-~-~-~-~?~?~?~?~?~?~-~?";
monster[42] = "Rive Crystal~1550~550~720~x4 pardus~270~Hyperfrequent Pulsar~200x1 pardus~Rive Wave~80x4 em~-~-~-~-~?~<55~>90~?~?~?~-~?";
monster[43] = "Nebula Serpent~185~330~500~x2 org~-~Biotoxic Breath~80x1 org~Serpent Quill~55x0,33~Serpent Scales~300x0,1~-~-~?~40~?~?~?~?~in nebula~?";
monster[44] = "Infected Creature~750~500~590~x5 org~270~Almost dead organ~5x? Em~Infected Tractor Organ~170x? Em~-~-~-~-~?~-~60~?~?~?~?~in viral clouds~?";
monster[45] = "Euryale Swarmlings~1250~500~950~x4 org~270~Undeveloped Outer Tentacles ~110x2 org~Undeveloped Inner Tentacles~40x3 org~Undeveloped Inner Tentacles~40x3 org~-~-~70~70~70~?~?~?~-~? * 9";
monster[46] = "Euryale~4800~2000~1450~-~600~Outer tentacles~150x2 org~Inner tentacles~50x3 org~Inner tentacles~50x3 org~energy shockwave~150x?~100~94~85~65~55~?~-~?";
monster[47] = "Energy Minnow~75~30~150~x2 em~270~Minnow Sparks~1x45 EM~-~-~-~-~-~-~?~<25~?~?~?~?~in energy~?";
monster[48] = "Drosera~140~375~495~x2 org~0~Death Spores~45x3 org~-~-~-~-~-~-~?~30~?~?~?~?~in nebula~?";
monster[49] = "Cyborg Manta~430~500~355~x4 conv~0~Claw Cannon~50x2 em~Manta Rocket~190x0,5 int 3~-~-~-~-~?~?~?~?~?~9h Moving~in space~?";
monster[50] = "Ancient Crystal~2050~1250~1100~? pardus~420~Ancient Shock~260x1~Ancient Shock~260x1~Ancient Sting~1000x0,05~-~-~?~<60~?~?~?~?~-~?";
monster[51] = "Oblivion Vortex~-~450~810~x5 pardus~420~Exotic Blaze~220x1 pardus~Exotic Blaze~220x1 pardus~Oblivion Blaze~540x0,16~-~-~?~60~?~?~?~?~in space~?";
monster[52] = "Verdant Manifestation~110~60~190~x1 pardus~0~E-3 Bubbles~-~-~-~-~-~-~-~?~?~?~?~?~?~in space~?";
monster[53] = "Ripe Manifestation~1200~270~660~x3 pardus~270~E-4 Bubbles~55x2 pardus~Exotic Blaze~200x1 pardus~-~-~-~-~?~?~?~?~?~?~in space~?";
monster[54] = "Developed Manifestation~185~110~220~x3 pardus~120~E-4 Bubbles~55x2 pardus~-~-~-~-~-~-~?~?~?~?~?~?~in space~?";
monster[55] = "Asp Mother~1500~1000~740~x5 pardus~420~Asp Shocker ~110x1 em~Asp Spit~110x1 org~Asp Stinger~110x1 pardus~-~-~?~60~?~?~?~?~-~?";
monster[56] = "Asp Hatchlings~725~225~560~x4 pardus~270~Small Asp Shockers~50x2 em~Small Asp Shockers~50x2 em~Small Asp Shockers~50x2 em~-~-~67~45-50~?~42~?~Moving~-~?";
monster[57] = "Lucidi Mothership~-~2000~1550~-~1800~Lucidi Cannon Turret~530x1~Lucidi Gun Turret Fires~160x2~Lucidi Gun Turret Fires~160x2~Lucidi Ultimate Redeamer~4000x0,1~?~?~?~?~?~?~-~?";
monster[58] = "Lucidi Squad~7000~425~625~x5 Pardus~900~Lucidi Plasma Thrower~130x2 (pardus)~Lucidi Plasma Thrower~130x2 (pardus)~Lucidi Plasma Thrower~130x2 (pardus)~Lucidi Strike Rocket~1400x0,1 Int 5~107~114~107~100~80~? Moving~in space~?";
monster[59] = "Xalgucennia~1950~780~860~x4 org~0~Acid Tentacles~80x2 em~Big Cosmic Eye~160x1 pardus~-~-~-~-~?~60~?~?~?~?~-~?";
monster[60] = "Ceylacennia~4490~1200~1040~x5~270~Acid Tentacles~80x2~Acid Tentacles~80x2~Huge Cosmic Eye~270x1~-~-~?~65~?~?~?~?~in viral clouds~?";
monster[61] = "Lucidi Warship~14215~?~?~?~?~Lucidi Gunturret~120x2~Lucidi Gunturret~120x2~Lucidi Redeemer~1800*?~-~-~?~?~?~?~?~?~-~?";
monster[62] = "Mutated Medusa~2400~600~1350~x5~120~Small Tentacles~25x2 org~Small Tentacles~25x2 org~Big Mutated Tentacles~90x2 pardus~Energy shockwave~160x0,33~?~71~80~?~?~?~-~?";
monster[63] = "Feral Serpent~10155~440~440~x5 pardus~1760~Feral Venom~50x3 pardus~Feral Venom~50x3 pardus~Tail Lash~75x2 pardus~-~-~?~?~?~?~?~?~-~?";
monster[64] = "Space clam~70~20~330~x3 em org~?~Sub-Static Buzzer~28x?~Concentrated Clam Saliva ~90x0,2~-~-~-~-~?~?~?~?~?~?~?~?";
monster[65] = "Gorefangling~45~150~150~x1 em org~0~Small Gore-Fang ~26x1 org~-~-~-~-~-~-~?~?~?~?~?~?~?~?";
monster[66] = "Swarm of Gorefanglings~95~300~300~x1 em org~?~Small Gore-Fangs~24x?~Disintegrating Net~170x?~-~-~-~-~?~?~?~?~?~?~in nebula~?";
monster[67] = "Gorefang~150~270~360~x3 org~0~Gore-Fang~65x org~Gore-Fang~65x org~-~-~-~-~?~?~?~?~?~?~in nebula~6 * 5";
monster[68] = "Starclaw~2750~850~550~x5 org~270~Giant Claw~110x1 org~Hug of Death~400x0,1?~-~-~-~-~?~<65~?~?~?~?~?~? * 16";
monster[69] = "Eulerian~250~300~240~x4 org~0~Integrator Spores~55x4 org~Antlers~250x? Conv~-~-~-~-~?~?~?~>=38~?~?~?~? * 6";
monster[70] = "Nebula mole~650~390~330~x3 org~0~Left Flank of Mole Spikes~65x2 org~Right Flank of Mole Spikes~65x2 org~Mole Sting ~650x0,2~-~-~?~65~?~>40~?~Moving in Nebula~sometimes~?";
monster[71] = "Glowprawn~3340~250~1200~x5 org~420~Prawn Sucker ~270x2 pardus~Tail Fan ~250x0,25 int 5~-~-~-~-~?~?~?~?~?~Moving~in nebula~? * 21";
monster[72] = "Dreadscorp~1080~600~990~x3 org~-~Scorp Arms~100x2 org~Periodontal Outgrowth~175x2 org~Scorp Spine~500x0,5 int 4~-~-~?~?~?~?~?~?~yes~?";
monster[73] = "Preywinder~3400~1500~1050~x5 org~120~Large Tendrils~150x2 org~Large Tendrils~150x2 org~Expandable Creeper~1100x0,2 int 2-3~-~-~?~?~?~?~?~Moving on Energy~?~2 * 16";
monster[74] = "Lone Smuggler~?~720~405~x4 conv~0~LV111 Intelligent missile~-~-~-~-~-~-~-~?~?~?~?~?~Moving in Energy~Sometimes on fuel, energy~?";
monster[75] = "Escorted Smuggler~620~720~405~x4 conv~0~5MW impulse laser~30x1 conv~20MW particle laser~60x2 conv~20MW particle laser~60x2 conv~LV111 Intelligent missile~135x0,2 conv~?~?~?~?~?~?~Sometimes on fuel, energy~?";
monster[76] = "Scorpion Fighter~?~?~?~?~?~-~-~-~-~-~-~-~-~?~?~?~?~?~?~?~?";



// ///////////////////////////////////////////////////////////////////////////
// Code
// ///////////////////////////////////////////////////////////////////////////

bs = document.getElementsByTagName('b');

monsterName = bs[1].innerHTML + "~";
monsterInfo = "";
monsterFound = false;

for(i = 0; i < monster.length && !monsterFound; i++) {
  if(monster[i].toUpperCase().indexOf(monsterName.toUpperCase()) == 0) {

    monsterFound = true;
    
    infoArray = monster[i].split('~');
    lablArray = labels.split('~');
    
    mhtml = '<table style="border: ridge 2px gray; width: 100%;">';
    
    for(j = 0; j < infoArray.length; j += 2) {
    
      mhtml += '<tr>';
      mhtml += '<td nowrap>' + lablArray[j] + '</td><td nowrap>' + infoArray[j] + '</td>'
      if(lablArray[j + 1] && infoArray[j + 1]) {
        mhtml += '<td nowrap style="border-left: solid 1px gray;">&nbsp;&nbsp;' + lablArray[j + 1] + '</td><td nowrap>' + infoArray[j + 1] + '</td>'
      } else {
        mhtml += '<td style="border-left: solid 1px gray;">&nbsp;</td><td>&nbsp;</td>';
      }
      mhtml += '</tr>';
    
    }
    
    mhtml += '</table>';
    
    
  }
}

if(!monsterFound) {

    mhtml = '<table style="border: ridge 2px gray; width: 100%;">';
    
    mhtml += '<tr><td><h2>No information found for this monster.</h2></td></tr>';
    
    mhtml += '</table>';

}

tables = document.getElementsByTagName('table');

var tableIndex = 2;

var row = tables[tableIndex].insertRow(1);
var cell = row.insertCell(0);
cell.colSpan = 2;
cell.innerHTML = mhtml;
