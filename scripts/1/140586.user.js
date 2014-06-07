// ==UserScript==
// @name           HWM pl_info cost per battle
// @namespace      leader.steppe@gmail.com
// @description    adds  cost per battle to the pl_info page
// @include        http://www.heroeswm.ru/pl_info.php?*
// @include        http://qrator.heroeswm.ru/pl_info.php?*
// @include        http://178.248.235.15/pl_info.php?*
// @include        http://www.lordswm.com/pl_info.php?*
// ==/UserScript==
	
var ap_text = "gold:";
var ap_table = {

//ring
i_ring: 18,
verve_ring: 101,
doubt_ring: 181,
rashness_ring: 71,
circ_ring: 155,
powerring: 185,
warriorring: 202,
darkring: 176,
warring13: 181,
magring13: 181,
bring14: 182,
wwwring16: 182,
mmmring16: 182,

//helm
leatherhat: 15,
leather_helm: 23,
wizard_cap: 53,
knowledge_hat: 85,
chain_coif: 44,
steel_helmet: 60,
mage_helm: 126,
mif_lhelmet: 79,
mif_hhelmet: 95,
zxhelmet13: 96,
mhelmetzh13: 96,
myhelmet15: 99,
xymhelmet15: 99,

//necklace
bravery_medal: 26,
amulet_of_luck: 43,
power_pendant: 130,
warrior_pendant:169,
magic_amulet: 176,
wzzamulet13: 175,
wzzamulet16: 177,
mmzamulet13: 175,
bafamulet15: 175,
mmzamulet16: 177,

//cuirass
leather_shiled: 16,
leatherplate: 48,
hauberk: 67,
ciras: 74,
mage_armor: 211,
mif_light: 94,
full_plate: 130,
wiz_robe: 141,
miff_plate: 139,
armor15: 140,
robewz15: 140,

//cloack
cloack: 18,
soul_cape: 59,
antiair_cape: 57,
antimagic_cape: 76,
powercape: 240,
wiz_cape: 153,
cloackwz15: 155,

//weapon
wood_sword: 20,
gnome_hammer: 20,
steel_blade: 22,
def_sword: 35,
requital_sword: 74,
staff: 87,
broad_sword: 91,
power_sword: 144,
sor_staff: 303,
mif_sword: 255,
mif_staff: 247,
mm_sword: 259,
mm_staff: 256,
firsword15: 265,
ffstaff15: 265,

//non-left-hand
dagger: 35,
shortbow: 18,
long_bow: 134,
energy_scroll: 136,
composite_bow: 158,
bow14: 161,

//boots
leatherboots: 15,
hunter_boots: 34,
boots2: 31,
shoe_of_initiative: 69,
steel_boots: 97,
mif_lboots: 137,
mif_hboots: 125,
wiz_boots: 130,
boots13: 128,
mboots14: 133,
boots15: 128,

//shield
round_shiled: 15,
s_shield: 19,
defender_shield: 31,
dragon_shield: 147,
large_shield: 153,
shield13: 153,
shield16: 153,

//thief
thief_arb: 250,
thief_cape: 250,
thief_fastboots: 250,
thief_goodarmor: 250,
thief_ml_dagger: 250,
thief_msk: 250,
thief_neckl: 250,
ring_of_thief: 250,

//taktik
tactaz_axe: 600,
tactmag_staff: 600,
tactsm0_dagger: 600,
tactdff_shield: 600,
tactzl4_boots: 600,
tactcv1_armor: 600,
tactpow_cloack: 600,
tact765_bow: 600,
tactms1_mamulet: 600,
tact1w1_wamulet: 600,
tactspw_mring: 600,
tactwww_wring: 600,
tacthapp_helmet: 600,


//O & MO
hunter_amulet1: 100,
hunter_armor1: 100,
hunter_arrows1: 100,
hunter_boots2: 100,
hunter_boots3: 100,
hunter_boots1: 100,
hunter_bow1: 100,
hunter_bow2: 200,
hunter_dagger: 100,
hunter_sword1: 100,
hunter_gloves1: 100,
hunter_hat1: 100,
hunter_helm: 100,
hunter_jacket1: 100,
hunter_mask1: 100,
hunter_pendant1: 100,
hunter_ring1: 100,
hunter_ring1: 100,
hunter_roga1: 100,
hunter_shield1: 100,
hunter_shield2: 100,
hunter_sword1: 100,
hunter_sword2: 100,

//VO
gm_abow: 250,
gm_amul: 250,
gm_arm: 250,
gm_defence: 250,
gm_hat: 250,
gm_kastet: 250,
gm_protect: 250,
gm_sring: 250,
gm_spdb: 250,
gm_sring: 250,
gm_sword: 250,
gm_3arrows: 250,

//zver
sh_sword: 500,
sh_spear: 1100,
sh_shield: 300,
sh_boots: 300,
sh_armor: 500,
sh_cloak: 500,
sh_bow: 900,
sh_4arrows: 500,
sh_amulet2: 500,
sh_ring1: 500,
sh_ring2: 900,
sh_helmet: 500,

//rar
//ааОаМаПаЛаЕаКб ааАбаВаАбаА-аВаОаИаНаА
barb_armor: 1500,
barb_boots: 1000,
barb_club: 3000,
barb_helm: 1000,
barb_shield: 1500,

//ааОаМаПаЛаЕаКб ааЕаКбаОаМаАаНбаА-ббаЕаНаИаКаА
necr_amulet: 1500,
necr_helm: 1500,
necr_robe: 1500,
necr_staff: 1500,

//ааОаМаПаЛаЕаКб ааАбаМаНаИаКаА-аВаОаИаНаА
merc_armor: 1000,
merc_boots: 1000,
merc_dagger: 3000,
merc_sword: 3000,

//ааОаМаПаЛаЕаКб а­аЛббаА-баКаАббаА
elfamulet: 1500,
elfboots: 1000,
elfbow: 3000,
elfshirt: 1000,


//ааОаМаПаЛаЕаКб а­а
welfsword: 2000,
welfshield: 2000,
welfboots: 2000,
welfarmor: 2000,
welfbow: 2000,
welfhelmet: 2000,


//ааОаМаПаЛаЕаКб аббаИаДаА
druid_staff: 1500,
druid_boots: 1500,
druid_cloack: 1500,
druid_armor: 1500,
druid_amulet: 1500,

//ааОаМаПаЛаЕаКб аЁаЛбаГаИ ббаМб
darkelfboots: 1300,
darkelfciras: 1300,
darkelfcloak: 1300,
darkelfkaska: 1300,
darkelfpendant: 1300,
darkelfstaff: 1300,


//ааОаМаПаЛаЕаКб ааЕаМаОаНаА-аВаОаИаНаА
dem_amulet: 1500,
dem_armor: 1500,
dem_axe: 1500,
dem_shield: 1500,
dem_helmet: 1500,
dem_shield: 1500,

//ааОаМаПаЛаЕаКб аМаАаГаА-ббаЕаНаИаКаА
mage_boots: 1000,
mage_cape: 1000,
mage_hat: 1000,
mage_robe: 1000,
mage_scroll: 1000,
mage_staff: 1000,


//ааОаМаПаЛаЕаКб аа
gmage_staff: 2000,
gmage_scroll: 2000,
gmage_boots: 2000,
gmage_armor: 2000,
gmage_cloack: 2000,
gmage_crown: 2000,


//ааОаМаПаЛаЕаКб ааНаОаМаА-аВаОаИаНаА
gnomehammer: 2000,
gnomeshield: 2000,
gnomeboots: 2000,
gnomearmor: 2000,
gnomehelmet: 2000,

//ааОаМаПаЛаЕаКб ааНаОаМаА-аМаАббаЕбаА
gnomem_hammer: 2000,
gnomem_shield: 2000,
gnomem_boots: 2000,
gnomem_armor: 2000,
gnomem_helmet: 2000,
gnomem_amulet: 2000,


//ааОаМаПаЛаЕаКб а а
knightsword: 2000,
knightshield: 2000,
knightboots: 2000,
knightarmor: 2000,
knighthelmet: 2000,


//ааОаМаПаЛаЕаКб ааАаЛаАаДаИаНаА
paladin_sword: 2000,
paladin_shield: 2000,
paladin_boots: 2000,
paladin_armor: 2000,
paladin_helmet: 2000,
paladin_bow: 2000,


//ааЕаДаАаЛаИ
demwar1: 3000,
demwar2: 1500,
demwar3: 1000,
demwar4: 500,
demwar5: 300,
demwar6: 100,

bunt_medal1: 1500,
bunt_medal2: 500,
bunt_medal3: 100,

elfwar1: 3000,
elfwar2: 1500,
elfwar3: 1000,
elfwar4: 500,
elfwar5: 300,
elfwar6: 100,

magewar1: 1500,
magewar2: 800,
magewar3: 400,
magewar4: 200,
magewar5: 100,

necrwar1st: 1500,
necrwar2st: 800,
necrwar3st: 400,
necrwar4st: 200,
necrwar5st: 100,

tl_medal1: 1500,
tl_medal2: 500,
tl_medal2: 100,

warthief_medal1: 1000,
warthief_medal2: 400,
warthief_medal3: 300,
warthief_medal4: 200,
warthief_medal5: 100,


thief_premiumring1: 2000,
thief_premiumring2: 1000,
thief_premiumring3: 500,

gnomewar1: 2000,
gnomewar2: 1000,
gnomewar3: 500,
gnomewar4: 300,
gnomewar5: 200,
gnomewar6: 150,
gnomewar7: 100,
gnomewar_takt: 500,
gnomewar_splo: 500,
gnomewar_stoj: 1000,

kwar1: 2000,
kwar2: 1000,
kwar3: 500,
kwar4: 300,
kwar5: 200,
kwar6: 150,
kwar7: 100,
kwar_takt: 300,
kwar_splo: 300,
kwar_stoj: 500,

testring: 400,
antifire_cape: 1000,

wolfjacket: 0,

a_mallet: 0,

lizard_armor: 0,
lizard_boots: 0,
lizard_helm: 0,

mart8_flowers1: 0,
mart8_ring1: 0,

//gifts
bril_pendant: 490,
bril_ring: 875,
flower_heart: 88,
flowers1: 35,
flowers2: 35,
flowers3: 233,
d_spray: 233,
defender_dagger: 93,
half_heart_m: 210,
half_heart_w: 210,
}


var g_frac = false;

var has_vitality = false;

// Ammunition points
make_ap();

function make_ap() 
{
	var allimgs = document.getElementsByTagName('img');
	var left_td = false;
	var arts_td = false;

	for(var i=0; i<allimgs.length; i++) {
		if (allimgs[i].src.indexOf('/i/s_initiative.gif') >= 0) {
			left_td = allimgs[i].parentNode.parentNode.parentNode;
		} else if (allimgs[i].src.indexOf('/i/book2.jpg') >= 0) {
			arts_td = allimgs[i].parentNode.parentNode.parentNode;
		}
	}

	if (left_td == false) return;
	if (arts_td == false) return;

	var allarts = arts_td.getElementsByTagName('a');
	var sum_ap = 0;

	for(var i=0; i<allarts.length; i++) {
		var m;
		if (m = allarts[i].href.match(/art_info\.php\?id=([^&]+)/)) {
			if (allarts[i].childNodes[0].src.indexOf("/mods/") >= 0) {
				// craft
			} else {
				sum_ap = Math.floor(sum_ap);
				if (!(allarts[i].childNodes[0].src.indexOf("/transparent.gif") >= 0 && allarts[i].parentNode.getAttribute("colspan") != 5)) {
					sum_ap += ap_table[m[1]] ? ap_table[m[1]] : 0;
				}
			}
		}
	}
	sum_ap = Math.floor(sum_ap);

	var newtr = document.createElement('tr');
	
	var newtd = document.createElement('td');
	newtd.align = "center";
	newtr.appendChild(newtd);

	
	var newimg = document.createElement('img');
	newimg.setAttribute('title', '\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0430 \u0437\u0430 \u0431\u043E\u0439');
	newimg.src = 'data:image/gif;base64,'+
'R0lGODlhGAAYAPeBAJhgAMqUMeLe1LKMS6t2IdGhAMeOG9eyALmINcSLK6x5I86eMceyjMaOKNSqAMuRAMiME'+
'8GZSdq5AM6aAOPg1sq4lsWBAKFwG8iJAJphAu%2FyAO3r5e3dgevo4fTumsubN%2FTvk%2BDLANexAPr9stq6'+
'R%2B3rAOrn4Pj4oMKGLPb20uniANu%2FP%2BLf1NLFq7qUAJphANWmI9StPaJvGOvvVPTrounjAKFuAMyVAOH'+
'fq7iYXuvmGt%2FIALqVT%2Fr5ud%2FMR93DANzFMezq49GiAN7az9KyAObXG9SjQPv9sZ9tFvr4wMeaEfn49s'+
'qNE8iIAN7ayPXza8aRCPb7d%2BTMeNSiPsmXL8mTQcWNOfv7z9y9AOrcUtKoMeTTAN%2B%2BTOC7c9GeLO%2F'+
'zKeHAbu%2FkZdCeAN%2B%2BTvf288%2BuWd3CAPX08c2TIMiKANauANrHcc6WGuzqAPLw5%2FH5CubOX%2BXm'+
'hfj49O7xa8CGBs6YANzXy%2BXjtd%2B7csaiM%2BbaAODc0enVYN7BGO%2FiqPH2AMaEAN3ZzQAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIEALAAAAAA'+
'YABgAAAjqAAMJHEiwoMGDCBMqJEhhocMNDheSiZiQxRIBFBkGOSPnShIacGA0YJAx0JweRSQUwKDgQsY4GkCY'+
'cfAgAYABFHG8qZHlwAQLBABUUCjAyRcVf0ps6SMkTRUANnaIqDPSYIcZbX5gUSMGCp0AZQC4UMnSZcEUGvTcA'+
'MS2LZgXRGjaxEnwzhEdIZq0ZcukixKfQIUKFGDCzYgTHjhwYYNCBo8oT8LwGePFCgAkdgiu8eGHhJYFARAAyA'+
'NkhZQYoEXnKPgBEJ69BjJQYWukbewWBSEAmrIXUATdgNDsjYBwT8IhJZMrX868ufKAADs%3D';
	newimg.width = 24;
	newimg.height = 24;
	newtd.appendChild(newimg);
	
	
	
	newtd = document.createElement('td');
	newtd.align = "center";
	newtr.appendChild(newtd);
	newb = document.createElement('b');
	newb.appendChild(document.createTextNode(sum_ap));
	newtd.appendChild(newb);

	left_td.appendChild(newtr);
}