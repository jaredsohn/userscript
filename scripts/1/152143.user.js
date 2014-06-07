// ==UserScript==
// @name        NPC Ribbon Hunter Companion
// @namespace   http://userscripts.xcom-alliance.info/
// @description Adds some NPC and medal images and sorts the number of kills remaining until the next ribbon for each NPC entry in your Overview Stats page
// @include     http*://*.pardus.at/overview_stats.php*
// @version     1.4
// @author      Miche (Orion) / Sparkle (Artemis)
// @updateURL   about:blank
// @grant       none
// ==/UserScript==

var npcs={"Ancient Crystals":"ancient_crystal","Asp Hatchlings":"asp_hatchlings","Asp Mothers":"asp_mother","Bio Scavengers":"bio_scavenger","Blood Amoebas":"blood_amoeba","Blue Crystals":"blue_crystal","Ceylacennias":"ceylacennia","Cyborg Mantas":"cyborg_manta","Developed Manifestations":"manifestation_developed","Dreadscorps":"dreadscorp","Droseras":"drosera","Elder Space Dragons":"space_dragon_elder","Swarm of Energy Bees":"energybees","Energy Locusts":"energy_locust","Energy Minnows":"energy_minnow","Energy Sparkers":"energy_sparker","Escorted Smugglers":"smuggler_escorted","Eulerians":"eulerian","Euryales":"euryale","Euryale Swarmlings":"euryale_swarmlings","Exocrabs":"exocrab","Experienced Pirates":"pirate_experienced","Famous Pirates":"pirate_famous","Feral Serpents":"feral_serpent","Frost Crystals":"frost_crystal","Fuel Tankers":"fuel_tanker","Glowprawns":"glowprawn","Gorefangs":"gorefang","Gorefanglings":"gorefangling","Hidden Drug Stashes":"hidden_drug_stash","Ice Beasts":"ice_beast","Inexperienced Pirates":"pirate_inexperienced","Infected Creatures":"infected_creature","Locust Hives":"locust_hive","Lone Smugglers":"smuggler_lone","Lucidi Motherships":"lucidi_mothership","Lucidi Squads":"lucidi_squad","Lucidi Warships":"lucidi_warship","Medusas":"medusa","Medusa Swarmlings":"medusa_swarmlings","Mutated Medusas":"mutated_medusa","Mutated Space Maggots":"space_maggot_mutated","Mutated Space Worms":"space_worm_mutated","Nebula Locusts":"nebula_locust","Nebula Moles":"nebula_mole","Nebula Serpents":"nebula_serpent","Oblivion Vortexs":"oblivion_vortex","Preywinders":"preywinder","Ripe Manifestations":"manifestation_ripe","Rive Crystals":"rive_crystal","Roidworm Hordes":"roidworm_horde","Sarracenias":"sarracenia","Shadows":"shadow","Slave Traders":"slave_trader","Solar Banshees":"solar_banshee","Space Clams":"space_clam","Space Crystals":"space_crystal","Space Dragon Queens":"space_dragon_queen","Space Locusts":"space_locust","Space Maggots":"space_maggot","Space Snails":"space_snail","Space Worms":"space_worm","Space Worm Albinos":"space_worm_albino","Starclaws":"starclaw","Sthenos":"stheno","Stheno Swarmlings":"stheno_swarmlings","Swarm of Gorefanglings":"gorefanglings","Verdant Manifestations":"manifestation_verdant","Wormhole Monsters":"../foregrounds/wormhole","X-993 Battlecruisers":"x993_battlecruiser","X-993 Motherships":"x993_mothership","X-993 Squads":"x993_squad","Xalgucennias":"xalgucennia","Xhole Monsters":"../foregrounds/xhole","Young Space Dragons":"space_dragon_young","Z15 Fighters":"z15_fighter","Z15 Repair Drones":"z15_repair_drone","Z15 Scouts":"z15_scout","Z15 Spacepads":"z15_spacepad","Z16 Fighters":"z16_fighter","Z16 Repair Drones":"z16_repair_drone"};
var tbl=document.querySelector('table.messagestyle');
var img_path=tbl.getAttribute('style').substring(tbl.getAttribute('style').indexOf('background:url(')+'background:url('.length,tbl.getAttribute('style').indexOf('bg.gif)'));
var rbn_sta='';
var rbn_mdl='.png" height="7" title="';
var rbn_end=' medal"/>';
var arr=new Array(500);
var tds=tbl.getElementsByTagName('TD');
for(var i=170;i<tds.length;i++) {
	if(tds[i].textContent.indexOf('killed:')<0|tds[i].textContent.indexOf('Other pilots')>-1|tds[i].textContent.indexOf('Total NPCs')>-1) continue;
	var num=(tds[i+1].textContent+'').replace(',','')-0;
    var lft = num<100?100-num:num<500?500-num:num<1000?1000-num:0;
	var htm='';
	if(lft) {
	   if(typeof(arr[lft])==='undefined') arr[lft]=[];
	   arr[lft].push(tds[i].parentNode);
	   htm='<em style="cursor:default;color:#668;position:absolute;margin-top:1px;margin-left:-77px;font-size:11px;width:30px;text-align:right;" title="Until next medal">('+lft+')</em> ';
    }
	htm+='<img src="'+img_path+'opponents/'+npcs[tds[i].textContent.substring(0,tds[i].textContent.indexOf('killed:')-1)]+'.png" height="22" style="position:absolute;margin-top:-4px;margin-left:-39px;" title="'+tds[i].textContent.substring(0,tds[i].textContent.indexOf('killed:')-1)+'"/>';
	var rbn='';
	rbn_sta='<img src="'+img_path+'ribbons/'+npcs[tds[i].textContent.substring(0,tds[i].textContent.indexOf('killed:')-1)].replace('../foregrounds','')+'_';
	if (num>=100) rbn+=rbn_sta+'bronze'+rbn_mdl+'Bronze'+rbn_end;
	if (num>=500) rbn+=rbn_sta+'silver'+rbn_mdl+'Silver'+rbn_end;
	if (num>=1000) rbn+=rbn_sta+'gold'+rbn_mdl+'Gold'+rbn_end;
	rbn='<div style="height:7px;width:68px;position:absolute;overflow:hidden;margin-left:250px;margin-top:3px;">'+rbn+'</div>';
	tds[i].innerHTML=htm+rbn+tds[i].innerHTML;
}
var tbd=document.querySelector('table.messagestyle tbody')
for(var i=1;i<500;i++) {
	if(typeof(arr[i])==='undefined') continue;
	for(var j=0;j<arr[i].length;j++) tbd.appendChild(arr[i][j]);
}