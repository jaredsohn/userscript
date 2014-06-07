// ==UserScript==
// @name TW Bitwa PW 
// @description The west PRO by w00w  
// @author w00w
// @namespace http://userscripts.org/scripts/show/77214
// @include http://*.the-west.*/game.php*
// @include http://*.the-west.*/forum.php*
// ==/UserScript==

   
//javascript:TWPro.twpro_debug=true;end();





function twptogle(){
id='twpro_charadv' 
    document.getElementById(id).style.display = document.getElementById(id).style.display == 'none' ? 'block' : 'none';

id='twpro_chartime'	
    document.getElementById(id).style.display = document.getElementById(id).style.display == 'none' ? 'block' : 'none';	
}

function twpro_changedfindtimereturn(value){
Character.max_health=Character.get_max_health();
if ((value*1)<-1){
eval("var lf_energy = Character.energy; var lf_energy_max = Character.max_energy; var lf_energy_left = lf_energy_max - lf_energy; var lf_energy_regen = Character.energyRegen * 100; var lf_time = lf_energy_left / lf_energy_regen; var lf_hour = Math.floor(lf_time); var lf_minute = Math.floor((lf_time - lf_hour) * 60);/*document.getElementById('twpro_energy_time').innerHTML=lf_hour + ' : ' + lf_minute;*/ ");
lf_hourfr = lf_hour > 9 ? '' : '0';lf_minutefr = lf_minute > 9 ? '' : '0';

return lf_hourfr + lf_hour + ':' + lf_minutefr+lf_minute+' ore';
}
else
{
eval("var lf_energy = Character.energy; var lf_energy_max = "+value+"; var lf_energy_left = lf_energy_max - lf_energy; var lf_energy_regen = Character.energyRegen * 100; var lf_time = lf_energy_left / lf_energy_regen; var lf_hour = Math.floor(lf_time); var lf_minute = Math.floor((lf_time - lf_hour) * 60);lf_hourfr = lf_hour > 9 ? '' : '0';lf_minutefr = lf_minute > 9 ? '' : '0';document.getElementById('twpro_energy_time').innerHTML=lf_hourfr + lf_hour + ':' + lf_minutefr+lf_minute+' ore'; ");
}

    


}


function makefortmessage(twpro_fort_elementin){
var twpro_fort_elementid=twpro_fort_elementin.id;
var twpro_fort_instructions=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_instructions";
var tmparray3=document.getElementById(twpro_fort_instructions).getElementsByTagName('a');
var tmparray3=tmparray3[0].parentNode;
var twpro_fort_divplayerid=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_playerlistdiv";
n = new Element('a', {'href': "javascript:makefortlist('"+twpro_fort_divplayerid+"');end();", 'style':'cursor: pointer;'});
n.innerHTML="<br/><br/>wyślij info na PW";
tmparray3.appendChild(n);
}

function makefortlist(twpro_fort_divplayerid){
var tmparray2=document.getElementById(twpro_fort_divplayerid).childNodes;
alert('// zapisanych na bitwe:\n'+tmparray2.length);
var fortplayerlist=tmparray2[0].innerHTML;
for (var j = 1 ; j < tmparray2.length ; j++){
	if (tmparray2[j].innerHTML == Character.name){
} else {
	fortplayerlist +=";"+tmparray2[j].innerHTML;
}
}
AjaxWindow.show('messages',{addressee:fortplayerlist});
}



















if (
(window.location.href.indexOf('the-west') != -1 ||  window.location.href.indexOf('tw.innogames.net') != -1 ) && window.location.href.indexOf('game') != -1 ){



{
/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
*/

// manipuliert interne Funktionen und fuegt eigene Aufrufe ein
function twpro_injectScript()
{ 
  TWPro.jobcombval= new Object();
  TWPro.jobcombval.ervaring = 5;
  TWPro.jobcombval.loon = 4;
  TWPro.jobcombval.geluk = 2;
  TWPro.twpro_debug=false;
  TWPro.twpro_calculated = false;
  TWPro.twpro_failure = false;
  TWPro.twpro_failureInject = false;
  TWPro.twpro_failureRollback = new Array();
  TWPro.twpro_active = true;
  TWPro.Hide_unjobs = false;
  TWPro.twpro_jobs = new Array();
  TWPro.twpro_jobValues = new Object();
  TWPro.twpro_jobValues.swine = new Object();
  TWPro.twpro_jobValues.swine.ervaring = 1;
  TWPro.twpro_jobValues.swine.loon = 3;
  TWPro.twpro_jobValues.swine.geluk = 0;
  TWPro.twpro_jobValues.swine.gefahr = 1;
  TWPro.twpro_jobValues.scarecrow = new Object();
  TWPro.twpro_jobValues.scarecrow.ervaring = 3;
  TWPro.twpro_jobValues.scarecrow.loon = 1;
  TWPro.twpro_jobValues.scarecrow.geluk = 2;
  TWPro.twpro_jobValues.scarecrow.gefahr = 20;
  TWPro.twpro_jobValues.wanted = new Object();
  TWPro.twpro_jobValues.wanted.ervaring = 3;
  TWPro.twpro_jobValues.wanted.loon = 2;
  TWPro.twpro_jobValues.wanted.geluk = 0;
  TWPro.twpro_jobValues.wanted.gefahr = 10;
  TWPro.twpro_jobValues.tabacco = new Object();
  TWPro.twpro_jobValues.tabacco.ervaring = 1;
  TWPro.twpro_jobValues.tabacco.loon = 6;
  TWPro.twpro_jobValues.tabacco.geluk = 2;
  TWPro.twpro_jobValues.tabacco.gefahr = 2;
  TWPro.twpro_jobValues.cotton = new Object();
  TWPro.twpro_jobValues.cotton.ervaring = 4;
  TWPro.twpro_jobValues.cotton.loon = 1;
  TWPro.twpro_jobValues.cotton.geluk = 0;
  TWPro.twpro_jobValues.cotton.gefahr = 3;
  TWPro.twpro_jobValues.sugar = new Object();
  TWPro.twpro_jobValues.sugar.ervaring = 2;
  TWPro.twpro_jobValues.sugar.loon = 5;
  TWPro.twpro_jobValues.sugar.geluk = 4;
  TWPro.twpro_jobValues.sugar.gefahr = 1;
  TWPro.twpro_jobValues.angle = new Object();
  TWPro.twpro_jobValues.angle.ervaring = 0;
  TWPro.twpro_jobValues.angle.loon = 1;
  TWPro.twpro_jobValues.angle.geluk = 6;
  TWPro.twpro_jobValues.angle.gefahr = 2;
  TWPro.twpro_jobValues.cereal = new Object();
  TWPro.twpro_jobValues.cereal.ervaring = 6;
  TWPro.twpro_jobValues.cereal.loon = 2;
  TWPro.twpro_jobValues.cereal.geluk = 2;
  TWPro.twpro_jobValues.cereal.gefahr = 4;
  TWPro.twpro_jobValues.berry = new Object();
  TWPro.twpro_jobValues.berry.ervaring = 6;
  TWPro.twpro_jobValues.berry.loon = 2;
  TWPro.twpro_jobValues.berry.geluk = 5;
  TWPro.twpro_jobValues.berry.gefahr = 6;
  TWPro.twpro_jobValues.sheeps = new Object();
  TWPro.twpro_jobValues.sheeps.ervaring = 5;
  TWPro.twpro_jobValues.sheeps.loon = 3;
  TWPro.twpro_jobValues.sheeps.geluk = 0;
  TWPro.twpro_jobValues.sheeps.gefahr = 2;
  TWPro.twpro_jobValues.newspaper = new Object();
  TWPro.twpro_jobValues.newspaper.ervaring = 1;
  TWPro.twpro_jobValues.newspaper.loon = 6;
  TWPro.twpro_jobValues.newspaper.geluk = 2;
  TWPro.twpro_jobValues.newspaper.gefahr = 1;
  TWPro.twpro_jobValues.cut = new Object();
  TWPro.twpro_jobValues.cut.ervaring = 7;
  TWPro.twpro_jobValues.cut.loon = 5;
  TWPro.twpro_jobValues.cut.geluk = 3;
  TWPro.twpro_jobValues.cut.gefahr = 3;
  TWPro.twpro_jobValues.grinding = new Object();
  TWPro.twpro_jobValues.grinding.ervaring = 7;
  TWPro.twpro_jobValues.grinding.loon = 11;
  TWPro.twpro_jobValues.grinding.geluk = 0;
  TWPro.twpro_jobValues.grinding.gefahr = 5;
  TWPro.twpro_jobValues.corn = new Object();
  TWPro.twpro_jobValues.corn.ervaring = 7;
  TWPro.twpro_jobValues.corn.loon = 4;
  TWPro.twpro_jobValues.corn.geluk = 8;
  TWPro.twpro_jobValues.corn.gefahr = 5;
  TWPro.twpro_jobValues.beans = new Object();
  TWPro.twpro_jobValues.beans.ervaring = 7;
  TWPro.twpro_jobValues.beans.loon = 9;
  TWPro.twpro_jobValues.beans.geluk = 4;
  TWPro.twpro_jobValues.beans.gefahr = 5;
  TWPro.twpro_jobValues.fort_guard = new Object();
  TWPro.twpro_jobValues.fort_guard.ervaring = 9;
  TWPro.twpro_jobValues.fort_guard.loon = 3;
  TWPro.twpro_jobValues.fort_guard.geluk = 2;
  TWPro.twpro_jobValues.fort_guard.gefahr = 7;
  TWPro.twpro_jobValues.tanning = new Object();
  TWPro.twpro_jobValues.tanning.ervaring = 15;
  TWPro.twpro_jobValues.tanning.loon = 12;
  TWPro.twpro_jobValues.tanning.geluk = 5;
  TWPro.twpro_jobValues.tanning.gefahr = 18;
  TWPro.twpro_jobValues.digging = new Object();
  TWPro.twpro_jobValues.digging.ervaring = 3;
  TWPro.twpro_jobValues.digging.loon = 11;
  TWPro.twpro_jobValues.digging.geluk = 5;
  TWPro.twpro_jobValues.digging.gefahr = 7;
  TWPro.twpro_jobValues.grave = new Object();
  TWPro.twpro_jobValues.grave.ervaring = 12;
  TWPro.twpro_jobValues.grave.loon = 16;
  TWPro.twpro_jobValues.grave.geluk = 22;
  TWPro.twpro_jobValues.grave.gefahr = 9;
  TWPro.twpro_jobValues.turkey = new Object();
  TWPro.twpro_jobValues.turkey.ervaring = 14;
  TWPro.twpro_jobValues.turkey.loon = 3;
  TWPro.twpro_jobValues.turkey.geluk = 7;
  TWPro.twpro_jobValues.turkey.gefahr = 21;
  TWPro.twpro_jobValues.rail = new Object();
  TWPro.twpro_jobValues.rail.ervaring = 18;
  TWPro.twpro_jobValues.rail.loon = 10;
  TWPro.twpro_jobValues.rail.geluk = 5;
  TWPro.twpro_jobValues.rail.gefahr = 10;
  TWPro.twpro_jobValues.cow = new Object();
  TWPro.twpro_jobValues.cow.ervaring = 17;
  TWPro.twpro_jobValues.cow.loon = 5;
  TWPro.twpro_jobValues.cow.geluk = 0;
  TWPro.twpro_jobValues.cow.gefahr = 11;
  TWPro.twpro_jobValues.fence = new Object();
  TWPro.twpro_jobValues.fence.ervaring = 11;
  TWPro.twpro_jobValues.fence.loon = 7;
  TWPro.twpro_jobValues.fence.geluk = 5;
  TWPro.twpro_jobValues.fence.gefahr = 6;
  TWPro.twpro_jobValues.saw = new Object();
  TWPro.twpro_jobValues.saw.ervaring = 12;
  TWPro.twpro_jobValues.saw.loon = 23;
  TWPro.twpro_jobValues.saw.geluk = 6;
  TWPro.twpro_jobValues.saw.gefahr = 32;
  TWPro.twpro_jobValues.stone = new Object();
  TWPro.twpro_jobValues.stone.ervaring = 8;
  TWPro.twpro_jobValues.stone.loon = 17;
  TWPro.twpro_jobValues.stone.geluk = 9;
  TWPro.twpro_jobValues.stone.gefahr = 33;
  TWPro.twpro_jobValues.straighten = new Object();
  TWPro.twpro_jobValues.straighten.ervaring = 22;
  TWPro.twpro_jobValues.straighten.loon = 8;
  TWPro.twpro_jobValues.straighten.geluk = 15;
  TWPro.twpro_jobValues.straighten.gefahr = 12;
  TWPro.twpro_jobValues.wood = new Object();
  TWPro.twpro_jobValues.wood.ervaring = 5;
  TWPro.twpro_jobValues.wood.loon = 18;
  TWPro.twpro_jobValues.wood.geluk = 2;
  TWPro.twpro_jobValues.wood.gefahr = 21;
  TWPro.twpro_jobValues.irrigation = new Object();
  TWPro.twpro_jobValues.irrigation.ervaring = 13;
  TWPro.twpro_jobValues.irrigation.loon = 7;
  TWPro.twpro_jobValues.irrigation.geluk = 15;
  TWPro.twpro_jobValues.irrigation.gefahr = 6;
  TWPro.twpro_jobValues.brand = new Object();
  TWPro.twpro_jobValues.brand.ervaring = 25;
  TWPro.twpro_jobValues.brand.loon = 8;
  TWPro.twpro_jobValues.brand.geluk = 0;
  TWPro.twpro_jobValues.brand.gefahr = 35;
  TWPro.twpro_jobValues.wire = new Object();
  TWPro.twpro_jobValues.wire.ervaring = 13;
  TWPro.twpro_jobValues.wire.loon = 17;
  TWPro.twpro_jobValues.wire.geluk = 6;
  TWPro.twpro_jobValues.wire.gefahr = 0;
  TWPro.twpro_jobValues.dam = new Object();
  TWPro.twpro_jobValues.dam.ervaring = 18;
  TWPro.twpro_jobValues.dam.loon = 4;
  TWPro.twpro_jobValues.dam.geluk = 9;
  TWPro.twpro_jobValues.dam.gefahr = 41;
  TWPro.twpro_jobValues.gems = new Object();
  TWPro.twpro_jobValues.gems.ervaring = 7;
  TWPro.twpro_jobValues.gems.loon = 25;
  TWPro.twpro_jobValues.gems.geluk = 8;
  TWPro.twpro_jobValues.gems.gefahr = 4;
  TWPro.twpro_jobValues.claim = new Object();
  TWPro.twpro_jobValues.claim.ervaring = 4;
  TWPro.twpro_jobValues.claim.loon = 31;
  TWPro.twpro_jobValues.claim.geluk = 4;
  TWPro.twpro_jobValues.claim.gefahr = 29;
  TWPro.twpro_jobValues.chuck_wagon = new Object();
  TWPro.twpro_jobValues.chuck_wagon.ervaring = 23;
  TWPro.twpro_jobValues.chuck_wagon.loon = 5;
  TWPro.twpro_jobValues.chuck_wagon.geluk = 42;
  TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
  TWPro.twpro_jobValues.break_in = new Object();
  TWPro.twpro_jobValues.break_in.ervaring = 32;
  TWPro.twpro_jobValues.break_in.loon = 13;
  TWPro.twpro_jobValues.break_in.geluk = 10;
  TWPro.twpro_jobValues.break_in.gefahr = 52;
  TWPro.twpro_jobValues.trade = new Object();
  TWPro.twpro_jobValues.trade.ervaring = 3;
  TWPro.twpro_jobValues.trade.loon = 15;
  TWPro.twpro_jobValues.trade.geluk = 25;
  TWPro.twpro_jobValues.trade.gefahr = 12;
  TWPro.twpro_jobValues.mast = new Object();
  TWPro.twpro_jobValues.mast.ervaring = 25;
  TWPro.twpro_jobValues.mast.loon = 21;
  TWPro.twpro_jobValues.mast.geluk = 3;
  TWPro.twpro_jobValues.mast.gefahr = 14;
  TWPro.twpro_jobValues.spring = new Object();
  TWPro.twpro_jobValues.spring.ervaring = 33;
  TWPro.twpro_jobValues.spring.loon = 9;
  TWPro.twpro_jobValues.spring.geluk = 23;
  TWPro.twpro_jobValues.spring.gefahr = 19;
  TWPro.twpro_jobValues.beaver = new Object();
  TWPro.twpro_jobValues.beaver.ervaring = 17;
  TWPro.twpro_jobValues.beaver.loon = 32;
  TWPro.twpro_jobValues.beaver.geluk = 6;
  TWPro.twpro_jobValues.beaver.gefahr = 21;
  TWPro.twpro_jobValues.coal = new Object();
  TWPro.twpro_jobValues.coal.ervaring = 14;
  TWPro.twpro_jobValues.coal.loon = 30;
  TWPro.twpro_jobValues.coal.geluk = 0;
  TWPro.twpro_jobValues.coal.gefahr = 13;
  TWPro.twpro_jobValues.print = new Object();
  TWPro.twpro_jobValues.print.ervaring = 20;
  TWPro.twpro_jobValues.print.loon = 30;
  TWPro.twpro_jobValues.print.geluk = 5;
  TWPro.twpro_jobValues.print.gefahr = 7;
  TWPro.twpro_jobValues.fishing = new Object();
  TWPro.twpro_jobValues.fishing.ervaring = 23;
  TWPro.twpro_jobValues.fishing.loon = 6;
  TWPro.twpro_jobValues.fishing.geluk = 23;
  TWPro.twpro_jobValues.fishing.gefahr = 38;
  TWPro.twpro_jobValues.trainstation = new Object();
  TWPro.twpro_jobValues.trainstation.ervaring = 47;
  TWPro.twpro_jobValues.trainstation.loon = 12;
  TWPro.twpro_jobValues.trainstation.geluk = 7;
  TWPro.twpro_jobValues.trainstation.gefahr = 15;
  TWPro.twpro_jobValues.windmeel = new Object();
  TWPro.twpro_jobValues.windmeel.ervaring = 43;
  TWPro.twpro_jobValues.windmeel.loon = 42;
  TWPro.twpro_jobValues.windmeel.geluk = 6;
  TWPro.twpro_jobValues.windmeel.gefahr = 18;
  TWPro.twpro_jobValues.explore = new Object();
  TWPro.twpro_jobValues.explore.ervaring = 45;
  TWPro.twpro_jobValues.explore.loon = 1;
  TWPro.twpro_jobValues.explore.geluk = 22;
  TWPro.twpro_jobValues.explore.gefahr = 37;
  TWPro.twpro_jobValues.float = new Object();
  TWPro.twpro_jobValues.float.ervaring = 45;
  TWPro.twpro_jobValues.float.loon = 23;
  TWPro.twpro_jobValues.float.geluk = 0;
  TWPro.twpro_jobValues.float.gefahr = 52;
  TWPro.twpro_jobValues.bridge = new Object();
  TWPro.twpro_jobValues.bridge.ervaring = 33;
  TWPro.twpro_jobValues.bridge.loon = 17;
  TWPro.twpro_jobValues.bridge.geluk = 18;
  TWPro.twpro_jobValues.bridge.gefahr = 53;
  TWPro.twpro_jobValues.springe = new Object();
  TWPro.twpro_jobValues.springe.ervaring = 45;
  TWPro.twpro_jobValues.springe.loon = 29;
  TWPro.twpro_jobValues.springe.geluk = 0;
  TWPro.twpro_jobValues.springe.gefahr = 42;
  TWPro.twpro_jobValues.coffin = new Object();
  TWPro.twpro_jobValues.coffin.ervaring = 8;
  TWPro.twpro_jobValues.coffin.loon = 42;
  TWPro.twpro_jobValues.coffin.geluk = 15;
  TWPro.twpro_jobValues.coffin.gefahr = 20;
  TWPro.twpro_jobValues.dynamite = new Object();
  TWPro.twpro_jobValues.dynamite.ervaring = 12;
  TWPro.twpro_jobValues.dynamite.loon = 23;
  TWPro.twpro_jobValues.dynamite.geluk = 64;
  TWPro.twpro_jobValues.dynamite.gefahr = 93;
  TWPro.twpro_jobValues.coyote = new Object();
  TWPro.twpro_jobValues.coyote.ervaring = 43;
  TWPro.twpro_jobValues.coyote.loon = 15;
  TWPro.twpro_jobValues.coyote.geluk = 26;
  TWPro.twpro_jobValues.coyote.gefahr = 45;
  TWPro.twpro_jobValues.buffalo = new Object();
  TWPro.twpro_jobValues.buffalo.ervaring = 62;
  TWPro.twpro_jobValues.buffalo.loon = 24;
  TWPro.twpro_jobValues.buffalo.geluk = 0;
  TWPro.twpro_jobValues.buffalo.gefahr = 72;
  TWPro.twpro_jobValues.fort = new Object();
  TWPro.twpro_jobValues.fort.ervaring = 71;
  TWPro.twpro_jobValues.fort.loon = 33;
  TWPro.twpro_jobValues.fort.geluk = 17;
  TWPro.twpro_jobValues.fort.gefahr = 35;
  TWPro.twpro_jobValues.indians = new Object();
  TWPro.twpro_jobValues.indians.ervaring = 14;
  TWPro.twpro_jobValues.indians.loon = 11;
  TWPro.twpro_jobValues.indians.geluk = 63;
  TWPro.twpro_jobValues.indians.gefahr = 34;
  TWPro.twpro_jobValues.clearing = new Object();
  TWPro.twpro_jobValues.clearing.ervaring = 8;
  TWPro.twpro_jobValues.clearing.loon = 62;
  TWPro.twpro_jobValues.clearing.geluk = 9;
  TWPro.twpro_jobValues.clearing.gefahr = 16;
  TWPro.twpro_jobValues.silver = new Object();
  TWPro.twpro_jobValues.silver.ervaring = 8;
  TWPro.twpro_jobValues.silver.loon = 76;
  TWPro.twpro_jobValues.silver.geluk = 0;
  TWPro.twpro_jobValues.silver.gefahr = 32;
  TWPro.twpro_jobValues.diligence_guard = new Object();
  TWPro.twpro_jobValues.diligence_guard.ervaring = 77;
  TWPro.twpro_jobValues.diligence_guard.loon = 34;
  TWPro.twpro_jobValues.diligence_guard.geluk = 45;
  TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
  TWPro.twpro_jobValues.wolf = new Object();
  TWPro.twpro_jobValues.wolf.ervaring = 63;
  TWPro.twpro_jobValues.wolf.loon = 21;
  TWPro.twpro_jobValues.wolf.geluk = 15;
  TWPro.twpro_jobValues.wolf.gefahr = 67;
  TWPro.twpro_jobValues.track = new Object();
  TWPro.twpro_jobValues.track.ervaring = 60;
  TWPro.twpro_jobValues.track.loon = 10;
  TWPro.twpro_jobValues.track.geluk = 30;
  TWPro.twpro_jobValues.track.gefahr = 33;
  TWPro.twpro_jobValues.ox = new Object();
  TWPro.twpro_jobValues.ox.ervaring = 34;
  TWPro.twpro_jobValues.ox.loon = 64;
  TWPro.twpro_jobValues.ox.geluk = 18;
  TWPro.twpro_jobValues.ox.gefahr = 43;
  TWPro.twpro_jobValues.guard = new Object();
  TWPro.twpro_jobValues.guard.ervaring = 35;
  TWPro.twpro_jobValues.guard.loon = 25;
  TWPro.twpro_jobValues.guard.geluk = 38;
  TWPro.twpro_jobValues.guard.gefahr = 4;
  TWPro.twpro_jobValues.bible = new Object();
  TWPro.twpro_jobValues.bible.ervaring = 61;
  TWPro.twpro_jobValues.bible.loon = 5;
  TWPro.twpro_jobValues.bible.geluk = 52;
  TWPro.twpro_jobValues.bible.gefahr = 77;
  TWPro.twpro_jobValues.ponyexpress = new Object();
  TWPro.twpro_jobValues.ponyexpress.ervaring = 48;
  TWPro.twpro_jobValues.ponyexpress.loon = 15;
  TWPro.twpro_jobValues.ponyexpress.geluk = 51;
  TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
  TWPro.twpro_jobValues.weapons = new Object();
  TWPro.twpro_jobValues.weapons.ervaring = 35;
  TWPro.twpro_jobValues.weapons.loon = 15;
  TWPro.twpro_jobValues.weapons.geluk = 72;
  TWPro.twpro_jobValues.weapons.gefahr = 82;
  TWPro.twpro_jobValues.dead = new Object();
  TWPro.twpro_jobValues.dead.ervaring = 14;
  TWPro.twpro_jobValues.dead.loon = 14;
  TWPro.twpro_jobValues.dead.geluk = 90;
  TWPro.twpro_jobValues.dead.gefahr = 34;
  TWPro.twpro_jobValues.grizzly = new Object();
  TWPro.twpro_jobValues.grizzly.ervaring = 78;
  TWPro.twpro_jobValues.grizzly.loon = 25;
  TWPro.twpro_jobValues.grizzly.geluk = 35;
  TWPro.twpro_jobValues.grizzly.gefahr = 71;
  TWPro.twpro_jobValues.oil = new Object();
  TWPro.twpro_jobValues.oil.ervaring = 25;
  TWPro.twpro_jobValues.oil.loon = 83;
  TWPro.twpro_jobValues.oil.geluk = 20;
  TWPro.twpro_jobValues.oil.gefahr = 7;
  TWPro.twpro_jobValues.treasure_hunting = new Object();
  TWPro.twpro_jobValues.treasure_hunting.ervaring = 20;
  TWPro.twpro_jobValues.treasure_hunting.loon = 20;
  TWPro.twpro_jobValues.treasure_hunting.geluk = 83;
  TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
  TWPro.twpro_jobValues.army = new Object();
  TWPro.twpro_jobValues.army.ervaring = 76;
  TWPro.twpro_jobValues.army.loon = 55;
  TWPro.twpro_jobValues.army.geluk = 17;
  TWPro.twpro_jobValues.army.gefahr = 35;
  TWPro.twpro_jobValues.steal = new Object();
  TWPro.twpro_jobValues.steal.ervaring = 50;
  TWPro.twpro_jobValues.steal.loon = 48;
  TWPro.twpro_jobValues.steal.geluk = 74;
  TWPro.twpro_jobValues.steal.gefahr = 66;
  TWPro.twpro_jobValues.mercenary = new Object();
  TWPro.twpro_jobValues.mercenary.ervaring = 52;
  TWPro.twpro_jobValues.mercenary.loon = 92;
  TWPro.twpro_jobValues.mercenary.geluk = 23;
  TWPro.twpro_jobValues.mercenary.gefahr = 65;
  TWPro.twpro_jobValues.bandits = new Object();
  TWPro.twpro_jobValues.bandits.ervaring = 75;
  TWPro.twpro_jobValues.bandits.loon = 28;
  TWPro.twpro_jobValues.bandits.geluk = 85;
  TWPro.twpro_jobValues.bandits.gefahr = 83;
  TWPro.twpro_jobValues.aggression = new Object();
  TWPro.twpro_jobValues.aggression.ervaring = 27;
  TWPro.twpro_jobValues.aggression.loon = 78;
  TWPro.twpro_jobValues.aggression.geluk = 78;
  TWPro.twpro_jobValues.aggression.gefahr = 86;
  TWPro.twpro_jobValues.diligence_aggression = new Object();
  TWPro.twpro_jobValues.diligence_aggression.ervaring = 73;
  TWPro.twpro_jobValues.diligence_aggression.loon = 43;
  TWPro.twpro_jobValues.diligence_aggression.geluk = 95;
  TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
  TWPro.twpro_jobValues.bounty = new Object();
  TWPro.twpro_jobValues.bounty.ervaring = 32;
  TWPro.twpro_jobValues.bounty.loon = 92;
  TWPro.twpro_jobValues.bounty.geluk = 79;
  TWPro.twpro_jobValues.bounty.gefahr = 72;
  TWPro.twpro_jobValues.captured = new Object();
  TWPro.twpro_jobValues.captured.ervaring = 69;
  TWPro.twpro_jobValues.captured.loon = 23;
  TWPro.twpro_jobValues.captured.geluk = 85;
  TWPro.twpro_jobValues.captured.gefahr = 44;
  TWPro.twpro_jobValues.train = new Object();
  TWPro.twpro_jobValues.train.ervaring = 87;
  TWPro.twpro_jobValues.train.loon = 67;
  TWPro.twpro_jobValues.train.geluk = 92;
  TWPro.twpro_jobValues.train.gefahr = 96;
  TWPro.twpro_jobValues.burglary = new Object();
  TWPro.twpro_jobValues.burglary.ervaring = 34;
  TWPro.twpro_jobValues.burglary.loon = 80;
  TWPro.twpro_jobValues.burglary.geluk = 81;
  TWPro.twpro_jobValues.burglary.gefahr = 26;
  TWPro.twpro_jobValues.quackery = new Object();
  TWPro.twpro_jobValues.quackery.ervaring = 50;
  TWPro.twpro_jobValues.quackery.loon = 65;
  TWPro.twpro_jobValues.quackery.geluk = 52;
  TWPro.twpro_jobValues.quackery.gefahr = 67;
  TWPro.twpro_jobValues.peace = new Object();
  TWPro.twpro_jobValues.peace.ervaring = 68;
  TWPro.twpro_jobValues.peace.loon = 33;
  TWPro.twpro_jobValues.peace.geluk = 76;
  TWPro.twpro_jobValues.peace.gefahr = 44;
  TWPro.twpro_jobValues.ship = new Object();
  TWPro.twpro_jobValues.ship.ervaring = 35;
  TWPro.twpro_jobValues.ship.loon = 82;
  TWPro.twpro_jobValues.ship.geluk = 15;
  TWPro.twpro_jobValues.ship.gefahr = 14;
  TWPro.twpro_jobValues.smuggle = new Object();
  TWPro.twpro_jobValues.smuggle.ervaring = 45;
  TWPro.twpro_jobValues.smuggle.loon = 62;
  TWPro.twpro_jobValues.smuggle.geluk = 83;
  TWPro.twpro_jobValues.smuggle.gefahr = 56;
  TWPro.twpro_jobValues.ranch = new Object();
  TWPro.twpro_jobValues.ranch.ervaring = 61;
  TWPro.twpro_jobValues.ranch.loon = 28;
  TWPro.twpro_jobValues.ranch.geluk = 17;
  TWPro.twpro_jobValues.ranch.gefahr = 24;
  TWPro.twpro_jobValues.iron = new Object();
  TWPro.twpro_jobValues.iron.ervaring = 32;
  TWPro.twpro_jobValues.iron.loon = 52;
  TWPro.twpro_jobValues.iron.geluk = 15;
  TWPro.twpro_jobValues.iron.gefahr = 29;
  TWPro.twpro_jobValues.agave = new Object();
  TWPro.twpro_jobValues.agave.ervaring = 42;
  TWPro.twpro_jobValues.agave.loon = 25;
  TWPro.twpro_jobValues.agave.geluk = 12;
  TWPro.twpro_jobValues.agave.gefahr = 27;
  TWPro.twpro_jobValues.tomato = new Object();
  TWPro.twpro_jobValues.tomato.ervaring = 12;
  TWPro.twpro_jobValues.tomato.loon = 13;
  TWPro.twpro_jobValues.tomato.geluk = 7;
  TWPro.twpro_jobValues.tomato.gefahr = 11;
  TWPro.twpro_jobValues.horseshoe = new Object();
  TWPro.twpro_jobValues.horseshoe.ervaring = 28;
  TWPro.twpro_jobValues.horseshoe.loon = 14;
  TWPro.twpro_jobValues.horseshoe.geluk = 9;
  TWPro.twpro_jobValues.horseshoe.gefahr = 23;
  TWPro.twpro_jobValues.fire = new Object();
  TWPro.twpro_jobValues.fire.ervaring = 41;
  TWPro.twpro_jobValues.fire.loon = 15;
  TWPro.twpro_jobValues.fire.geluk = 65;
  TWPro.twpro_jobValues.fire.gefahr = 45;
  TWPro.twpro_jobValues.orange = new Object();
  TWPro.twpro_jobValues.orange.ervaring = 25;
  TWPro.twpro_jobValues.orange.loon = 14;
  TWPro.twpro_jobValues.orange.geluk = 10;
  TWPro.twpro_jobValues.orange.gefahr = 21;
  TWPro.twpro_jobValues.muck_out = new Object();
  TWPro.twpro_jobValues.muck_out.ervaring = 5;
  TWPro.twpro_jobValues.muck_out.loon = 4;
  TWPro.twpro_jobValues.muck_out.geluk = 2;
  TWPro.twpro_jobValues.muck_out.gefahr = 6;
  TWPro.twpro_jobValues.shoes = new Object();
  TWPro.twpro_jobValues.shoes.ervaring = 2;
  TWPro.twpro_jobValues.shoes.loon = 3;
  TWPro.twpro_jobValues.shoes.geluk = 3;
  TWPro.twpro_jobValues.shoes.gefahr = 2;
  TWPro.twpro_jobValues.construct = new Object();
  TWPro.twpro_jobValues.construct.ervaring = 0;
  TWPro.twpro_jobValues.construct.loon = 0;
  TWPro.twpro_jobValues.construct.geluk = 0;
  TWPro.twpro_jobValues.construct.gefahr = 0;
  TWPro.twpro_jobValues.duels = new Object();
  TWPro.twpro_jobValues.duels.ervaring = 0;
  TWPro.twpro_jobValues.duels.loon = 0;
  TWPro.twpro_jobValues.duels.geluk = 0;
  TWPro.twpro_jobValues.duels.gefahr = 0;
  TWPro.twpro_jobValues.duelss = new Object();
  TWPro.twpro_jobValues.duelss.ervaring = 0;
  TWPro.twpro_jobValues.duelss.loon = 0;
  TWPro.twpro_jobValues.duelss.geluk = 0;
  TWPro.twpro_jobValues.duelss.gefahr = 0;
  TWPro.twpro_jobValues.duelsv = new Object();
  TWPro.twpro_jobValues.duelsv.ervaring = 0;
  TWPro.twpro_jobValues.duelsv.loon = 0;
  TWPro.twpro_jobValues.duelsv.geluk = 0;
  TWPro.twpro_jobValues.duelsv.gefahr = 0;
  TWPro.twpro_jobValues.duelv = new Object();
  TWPro.twpro_jobValues.duelv.ervaring = 0;
  TWPro.twpro_jobValues.duelv.loon = 0;
  TWPro.twpro_jobValues.duelv.geluk = 0;
  TWPro.twpro_jobValues.duelv.gefahr = 0;
  TWPro.twpro_jobValues.duelvs = new Object();
  TWPro.twpro_jobValues.duelvs.ervaring = 0;
  TWPro.twpro_jobValues.duelvs.loon = 0;
  TWPro.twpro_jobValues.duelvs.geluk = 0;
  TWPro.twpro_jobValues.duelvs.gefahr = 0;
  TWPro.twpro_jobValues.duelvv = new Object();
  TWPro.twpro_jobValues.duelvv.ervaring = 0;
  TWPro.twpro_jobValues.duelvv.loon = 0;
  TWPro.twpro_jobValues.duelvv.geluk = 0;
  TWPro.twpro_jobValues.duelvv.gefahr = 0;
  TWPro.twpro_setBonusParsed = false;
  TWPro.twpro_setBonus = new Object();
  TWPro.twpro_setBonus.set_farmer = new Array();
  TWPro.twpro_setBonus.set_farmer[2] = new Object();
  TWPro.twpro_setBonus.set_farmer[2].bonus = new Object();
  TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
  TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
  TWPro.twpro_setBonus.set_farmer[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_farmer[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
  TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
  TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_farmer[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[3] = new Object();
  TWPro.twpro_setBonus.set_farmer[3].bonus = new Object();
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
  TWPro.twpro_setBonus.set_farmer[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_farmer[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
  TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
  TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_farmer[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[4] = new Object();
  TWPro.twpro_setBonus.set_farmer[4].bonus = new Object();
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
  TWPro.twpro_setBonus.set_farmer[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_farmer[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
  TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
  TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_farmer[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian = new Array();
  TWPro.twpro_setBonus.set_indian[2] = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
  TWPro.twpro_setBonus.set_indian[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
  TWPro.twpro_setBonus.set_indian[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian[3] = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
  TWPro.twpro_setBonus.set_indian[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
  TWPro.twpro_setBonus.set_indian[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
  TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
  TWPro.twpro_setBonus.set_indian[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian[4] = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
  TWPro.twpro_setBonus.set_indian[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
  TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
  TWPro.twpro_setBonus.set_indian[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
  TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
  TWPro.twpro_setBonus.set_indian[4].speedBonus = 44;
  TWPro.twpro_setBonus.set_indian[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_indian[5] = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
  TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
  TWPro.twpro_setBonus.set_indian[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
  TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
  TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
  TWPro.twpro_setBonus.set_indian[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican = new Array();
  TWPro.twpro_setBonus.set_mexican[2] = new Object();
  TWPro.twpro_setBonus.set_mexican[2].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
  TWPro.twpro_setBonus.set_mexican[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
  TWPro.twpro_setBonus.set_mexican[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[3] = new Object();
  TWPro.twpro_setBonus.set_mexican[3].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
  TWPro.twpro_setBonus.set_mexican[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
  TWPro.twpro_setBonus.set_mexican[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[4] = new Object();
  TWPro.twpro_setBonus.set_mexican[4].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
  TWPro.twpro_setBonus.set_mexican[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
  TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
  TWPro.twpro_setBonus.set_mexican[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[5] = new Object();
  TWPro.twpro_setBonus.set_mexican[5].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
  TWPro.twpro_setBonus.set_mexican[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
  TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
  TWPro.twpro_setBonus.set_mexican[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[6] = new Object();
  TWPro.twpro_setBonus.set_mexican[6].bonus = new Object();
  TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
  TWPro.twpro_setBonus.set_mexican[6].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_mexican[6].jobBonus = new Object();
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
  TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
  TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
  TWPro.twpro_setBonus.set_mexican[6].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male = new Array();
  TWPro.twpro_setBonus.set_pilgrim_male[2] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
  TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
  TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
  TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
  TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
  TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female = new Array();
  TWPro.twpro_setBonus.set_pilgrim_female[2] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
  TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
  TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
  TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5] = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
  TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
  TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery = new Array();
  TWPro.twpro_setBonus.set_quackery[2] = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
  TWPro.twpro_setBonus.set_quackery[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
  TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
  TWPro.twpro_setBonus.set_quackery[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
  TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[3] = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
  TWPro.twpro_setBonus.set_quackery[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
  TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
  TWPro.twpro_setBonus.set_quackery[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
  TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[4] = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
  TWPro.twpro_setBonus.set_quackery[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
  TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
  TWPro.twpro_setBonus.set_quackery[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
  TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[5] = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
  TWPro.twpro_setBonus.set_quackery[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
  TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
  TWPro.twpro_setBonus.set_quackery[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
  TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[5].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[6] = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
  TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
  TWPro.twpro_setBonus.set_quackery[6].jobBonus = new Object();
  TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
  TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
  TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
  TWPro.twpro_setBonus.set_quackery[6].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_dancer = new Array();
  TWPro.twpro_setBonus.set_dancer[2] = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
  TWPro.twpro_setBonus.set_dancer[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
  TWPro.twpro_setBonus.set_dancer[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 10;
  TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_dancer[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[3] = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
  TWPro.twpro_setBonus.set_dancer[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
  TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
  TWPro.twpro_setBonus.set_dancer[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 25;
  TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_dancer[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[4] = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 10;
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
  TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
  TWPro.twpro_setBonus.set_dancer[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 45;
  TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_dancer[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman = new Array();
  TWPro.twpro_setBonus.set_gentleman[2] = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
  TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
  TWPro.twpro_setBonus.set_gentleman[2].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
  TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[3] = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
  TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
  TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
  TWPro.twpro_setBonus.set_gentleman[3].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
  TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[4] = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
  TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
  TWPro.twpro_setBonus.set_gentleman[4].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
  TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[5] = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
  TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
  TWPro.twpro_setBonus.set_gentleman[5].jobBonus = new Object();
  TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
  TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
  TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = new Object();
  TWPro.twpro_invHash = '';
  TWPro.twpro_itemStorage = new Object();
  while(TWPro.twpro_active)
  {
    //alert('// Original AjaxWindow.show:\n'+AjaxWindow.show.toString());
    //alert('// Original AjaxWindow.show:\n'+AjaxWindow.show.toString());
    //alert('// Original Wear.add:\n'+Wear.add.toString());
    //alert('// Original Wear.uncarry:\n'+Wear.uncarry.toString());
    //alert('// Original Bag.getInstance().add:\n'+Bag.getInstance().add.toString());
    //alert('// Original Bag.getInstance().carry:\n'+Bag.getInstance().carry.toString());
    //for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
    //{
    //  alert(((twpro_i == 0)?('// Original ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
    //}
    var twpro_matchtest;
    if(AjaxWindow.show.toString().search(/evalJS/) == -1)
    {
      if((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/eval\(data\.js\);/) == -1))
      {
        TWPro.twpro_failureInject = true;
        break;
      }
      TWPro.twpro_failureRollback.unshift('AjaxWindow.show = '+AjaxWindow.show.toString());
      eval('AjaxWindow.show = '+AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/,'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/eval\(data\.js\);/,'TWPro.twpro_injectionSwitch(extendeName,\'js\',data,\'js\');eval(data.js);TWPro.twpro_injectionSwitch(extendeName,\'after\',data,null);'));
      //alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
    }
    else
    {
      if((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/this\.evalJS\(\);/) == -1))
      {
        TWPro.twpro_failureInject = true;
        break;
      }
      TWPro.twpro_failureRollback.unshift('AjaxWindow.show = '+AjaxWindow.show.toString());
      eval('AjaxWindow.show = '+AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/,'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/this\.evalJS\(\);/,'this.twpro_extendeName=extendeName;this.evalJS();'));
	  
	  
	  
	  
	  
	  
	  
      //alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
      //alert('// Original Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
      if(Ajax.prototype.evalJS.toString().search(/eval\(this\.jsContent\);/) == -1)
      {
        TWPro.twpro_failureInject = true;
        break;
      }
      TWPro.twpro_failureRollback.unshift('Ajax.prototype.evalJS = '+Ajax.prototype.evalJS.toString());
      eval('Ajax.prototype.evalJS = '+Ajax.prototype.evalJS.toString().replace(/eval\(this\.jsContent\);/,'TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'js\',this,\'jsContent\');eval(this.jsContent);TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'after\',this,null);'));
      //alert('// TW Pro Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
    }
    if(Wear.add.toString().search(/}, *('*)over/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Wear.add = '+Wear.add.toString());
    eval('Wear.add = '+Wear.add.toString().replace(/}, *('*)over/,'TWPro.twpro_changeItem();},$1over'));
    //alert('// TW Pro Wear.add:\n'+Wear.add.toString());
    if(Wear.uncarry.toString().search(/}\.bind/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Wear.uncarry = '+Wear.uncarry.toString());
    eval('Wear.uncarry = '+Wear.uncarry.toString().replace(/}\.bind/,'TWPro.twpro_changeItem();}.bind'));
    //alert('// TW Pro Wear.uncarry:\n'+Wear.uncarry.toString());
    if(Bag.getInstance().add.toString().search(/}, *('*)over/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    twpro_matchtest = Bag.getInstance().add.toString().match(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g);
    if(twpro_matchtest == null)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    if(twpro_matchtest.length != 3)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Bag.getInstance().add = '+Bag.getInstance().add.toString());
    eval('Bag.getInstance().add = '+Bag.getInstance().add.toString().replace(/}, *('*)over/,'TWPro.twpro_changeItem();},$1over').replace(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g,'(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)'));
    //alert('// TW Pro Bag.getInstance().add:\n'+Bag.getInstance().add.toString());
    if(Bag.getInstance().carry.toString().search(/return true;}\.bind/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('Bag.getInstance().carry = '+Bag.getInstance().carry.toString());
    eval('Bag.getInstance().carry = '+Bag.getInstance().carry.toString().replace(/return true;}\.bind/,'TWPro.twpro_changeItem();return true;}.bind'));
    //alert('// TW Pro Bag.getInstance().carry:\n'+Bag.getInstance().carry.toString());
    if(ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/) == -1)
    {
      TWPro.twpro_failureInject = true;
      break;
    }
    TWPro.twpro_failureRollback.unshift('ItemPopup.prototype.getXHTML = '+ItemPopup.prototype.getXHTML.toString());
    eval('ItemPopup.prototype.getXHTML = '+ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/,'xhtml+=TWPro.twpro_popup(item);xhtml+=$1<span class=$2"item_popup_trader_price'));
    //for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
    //{
    //  alert(((twpro_i == 0)?('// TW Pro ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
    //}
    break;
  }
  
  

  
  TWPro.twpro_world = window.location.hostname.substr(0,window.location.hostname.search(/\./));
  var twpro_support = document.createElement('div');
  twpro_support.id = 'twpro_support';
  twpro_support.style.position = 'relative';
  twpro_support.style.color = '#656565';
  twpro_support.style.fontSize = '10px';
  twpro_support.style.marginLeft = '2px';
  twpro_support.style.marginTop = '9px';
  twpro_support.style.top = '-3px';
  twpro_support.style.zIndex = '1';
  var twpro_supportLink = document.createElement('a');
  twpro_supportLink.id = 'twpro_supportLink';
  twpro_supportLink.href = 'http://www.tw-pro.de';
  twpro_supportLink.target = '_blank';
  twpro_supportLink.appendChild(document.createTextNode("Webseite"));
  var twpro_supportAuthor = document.createElement('a');
  twpro_supportAuthor.id = 'twpro_supportAuthor';
    var twpro_supportTranslator = document.createElement('a');
  twpro_supportTranslator.id = 'twpro_supportTranslator';
  if(TWPro.twpro_getAuthor())
  {
    twpro_supportAuthor.href = 'javascript:AjaxWindow.show(\'profile\',{char_id:9733},\'9733\');';
  }
  else
  {
    twpro_supportAuthor.href = 'http://www.tw-pro.de/index.php?site=kontakt';
    twpro_supportAuthor.target = '_blank';
  }
  if(TWPro.twpro_getTranslator())
  {
    twpro_supportTranslator.href = 'javascript:AjaxWindow.show(\'profile\',{char_id:4914},\'4914\');';
  }
  else
  {
    twpro_supportTranslator.href = '#';
    twpro_supportTranslator.target = '_blank';
  }       

  
  twpro_supportAuthor.appendChild(document.createTextNode("NEXTON"));
  twpro_supportTranslator.appendChild(document.createTextNode("Bleach"));
  twpro_support.appendChild(document.createTextNode("TW Pro: "));
  twpro_support.appendChild(twpro_supportLink);
  twpro_support.appendChild(document.createTextNode(" Autor: "));
  twpro_support.appendChild(twpro_supportAuthor);
    twpro_support.appendChild(document.createTextNode(" Translator & editor: "));
  twpro_support.appendChild(twpro_supportTranslator);
  if(!TWPro.twpro_active)
  {
    twpro_support.appendChild(document.createTextNode(" (global deaktiviert)"));
  }
  document.getElementById('main_container').insertBefore(twpro_support,document.getElementById('footer_server_time'));
  if(TWPro.twpro_failureInject)
  {
    TWPro.twpro_throwFailure();
  }
}

function twpro_throwFailure()
{
  if(TWPro.twpro_failure) return;
  TWPro.twpro_failure = true;
  for(var twpro_i=0;twpro_i<TWPro.twpro_failureRollback.length;twpro_i++)
  {
    eval(TWPro.twpro_failureRollback[twpro_i]);
  }
}

function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_jsversion)
{
  if(TWPro.twpro_failure) return;
  if(twpro_extendeName==undefined)
  {
    //alert('Mist');
    return;
  }else
  
  if(TWPro.twpro_debug==true){
  alert(twpro_extendeName+"\n\n"+twpro_injectionType+"\n\n"+twpro_data[twpro_jsversion]+"\n\n"+twpro_data.page);
  
  }
  //twpro_extendeName   
  switch(twpro_injectionType)
  {
    case 'page':
    {
      if(twpro_extendeName == 'inventory')
      {
        TWPro.twpro_insertList(twpro_data);

      }
	        if(twpro_extendeName == 'character' ){

			var timedata="<table class='shadow_table' width='70%'><tbody><tr><td class='edge_shadow_top_left'></td> <td class='border_shadow_top'></td><td class='edge_shadow_top_right'></td></tr><tr><td class='border_shadow_left'></td> <td class='shadow_content'> <div><div style='overflow-y: auto;'><table class='table border' width='100%' >	<tr><th width='*'></th><th width='20%'>Aveţi</th><th width='20%'>Doriţi</th><th width='20%'>Timp</th></tr><tr><td><img src='./images/job/experience.png' /><strong>Puncte de energie</strong></td><td>"+Math.floor(Character.energy)+"/"+Character.max_energy+"</td><td><input size='3' class='ranking_extra' value='"+Character.max_energy+"' name='energy' onkeyup='twpro_changedfindtimereturn(this.value)' onchange='twpro_changedfindtimereturn(this.value)'></td><td id='twpro_energy_time'>"+twpro_changedfindtimereturn(-3)+"</td></tr><tr><th colspan='4'> Căutare în Weststats  </th></tr><tr><td colspan='4'>Completaţi tabelul următor cu unu sau mai multe cuvinte cheie<br/><br/><center><form method='post' name='weststatsser' action='http://ro.weststats.com/Search/?change_world="+window.location.hostname.substr(0,window.location.hostname.search(/\./))+"' target='Blank'><input type='text' class='ranking_extra' name='query' value='obiecte / misiuni / munci ' size='27' id='TWPROsearchBox' onclick='document.getElementById(\"TWPROsearchBox\").value=\"\";' > <input type='submit' value='' style='border-style: none;background-image: url(\"img.php?type=button&subtype=normal&value=ok\");background-repeat: no-repeat;width: 50px;height: 25px;'></form></center></td></tr></table>          </div>        </div>      </td>      <td class='border_shadow_right'></td>    </tr>    <tr>      <td class='edge_shadow_bottom_left'></td>      <td class='border_shadow_bottom'></td>      <td class='edge_shadow_bottom_right'></td>    </tr></tbody></table>";
			
twpro_data.page=twpro_data.page.replace('<h2>','<div style="display:none;" id="twpro_charadv"><h2>').replace('id="char_class_symbol">','id="char_class_symbol"></div><div id="twpro_chartime">'+timedata+'</div><a href="javascript:twptogle()">+</a>')			


      }
	 	        if(twpro_extendeName.substr(0,3) == 'job' ){
twpro_data.page=twpro_data.page.replace('value="7200"','selected value="7200"')		
}
	 break;
    }
    case 'js':
    {
      
      if((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0,15) == 'building_tailor') || (twpro_extendeName.substr(0,17) == 'building_gunsmith') || (twpro_extendeName.substr(0,16) == 'building_general'))
      { 
        TWPro.twpro_getPlace(twpro_data,twpro_extendeName,twpro_jsversion);
      }
	  

	  
	  
	  
      break; 
    } 
    case 'after':
    {
	

      if(twpro_extendeName == 'inventory')
      {
        TWPro.twpro_showList();
      }

	  
	 	  
	  if(twpro_extendeName.substr(0,15) == 'fort_battlepage' ){
	  var twpro_fort_elementid="window_"+twpro_extendeName;
	  var twpro_fort_elementin=$(twpro_fort_elementid);
	  makefortmessage(twpro_fort_elementin);
     
}
	  
	  
	  
	  

	  
      break;
    }
  }
}

function twpro_getAuthor()
{
  //if(TWPro.twpro_failure) return false;
  switch(TWPro.twpro_world)
  {
    case 'de1':
    case 'de2':
    case 'de3':
    case 'de4':
    case 'de5':
    case 'de6':
      return true;
  }
  return false;
}

function twpro_getTranslator()
{
  //if(TWPro.twpro_failure) return false;
  switch(TWPro.twpro_world)
  {
    case 'nl1':
    case 'nl2':
      return true;
  }
  return false;
}

function twpro_activeJob()
{
  if(TWPro.twpro_failure) return false;
  if((TWPro.twpro_calculated) && (document.getElementById("twpro_jobList")) && (document.getElementById("twpro_jobList").selectedIndex!=0))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function twpro_getPlace(twpro_data,twpro_extendeName,twpro_jsversion)
{
  //alert('2: '+twpro_extendeName);
  if(TWPro.twpro_failure) return;
  if(twpro_extendeName=='inventory')
  {
    if(twpro_data[twpro_jsversion].search(/wear_content\[i\]\);(\s*)\}/) == -1)
    {
      //alert('1');
      TWPro.twpro_throwFailure();
      return;
    }
    if(twpro_data[twpro_jsversion].search(/bag_content\[i\]\);(\s*)\}/) == -1)
    {
      //alert('2');
      TWPro.twpro_throwFailure();
      return;
    }

    twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/wear_content\[i\]\);(\s*)\}/,'wear_content[i]);$1};TWPro.twpro_initializeItems(\'wear\',null);').replace(/bag_content\[i\]\);(\s*)\}/,'bag_content[i]);$1};TWPro.twpro_initializeItems(\'bag\',null);');
    //for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
    //{
    //  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
    //}
  }
  else
  {
    if(twpro_data[twpro_jsversion].search(/var trader_inv/) == -1)
    {
      //alert('3');
      TWPro.twpro_throwFailure();
      return;
    }
    if((twpro_data[twpro_jsversion].search(/trader_inv\[i\]\);(\s*)\}/) == -1) && (twpro_data[twpro_jsversion].search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1))
    {
      //alert('4');
      TWPro.twpro_throwFailure();
      return;
    }
    //for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
    //{
    //  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
    //}
    twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/var trader_inv/,'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\]\);(\s*)\}/,'trader_inv[i]);$1};TWPro.twpro_initializeItems(\'trader\',traderInventory);').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/,'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
    //for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
    //{
    //  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
    //}
  }
}

// wird beim Erstellen eines Popups ausgefuehrt, stellt Code fuer diesen zusammen
function twpro_popup(twpro_item)
{
  if(TWPro.twpro_failure) return '';
  var twpro_xhtml = '';
  if(TWPro.twpro_calculated && (twpro_item.twpro_place!=undefined))
  {
    if((twpro_item.twpro_place=='wear') || (twpro_item.twpro_place=='bag'))
    {
      if(document.getElementById("twpro_jobList") && (document.getElementById("twpro_jobList").selectedIndex!=0))
      {
        var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
        if(twpro_selectedJob>=0)
        {
          var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
          if(twpro_item.twpro_bonus==undefined)
          {
            TWPro.twpro_prepareItem(twpro_item);
            if(twpro_item.twpro_bonus)
            {
              for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
              {
                twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i],twpro_item);
              }
            }
          }
          if(twpro_item.twpro_bonus)
          {
            var twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
            if(twpro_aktplus > 0)
            {
              twpro_xhtml+='<span class="item_popup_bonus">';
              twpro_xhtml+='+'+twpro_aktplus+' '+twpro_job.name;
              twpro_xhtml+='<br /></span><br />';
            }
          }
        }
      }
    }
    if(twpro_item.twpro_place=='trader')
    {
      if(twpro_item.twpro_bonus==undefined)
      {
        TWPro.twpro_prepareItem(twpro_item);
        if(twpro_item.twpro_bonus)
        {
          for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
          {
            twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i],twpro_item);
          }
        }
      }
      if(twpro_item.twpro_bonus)
      {
        var twpro_j = 0;
        var twpro_plus = new Array();
        var twpro_better;
        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
        {
          twpro_better=twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName]-TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type];
          if(twpro_better>0)
          {
            twpro_plus.push(twpro_better+' '+TWPro.twpro_jobs[twpro_i].name);
            twpro_j++;
          }
        }
        if(twpro_j>0)
        {
          twpro_plus.sort(TWPro.twpro_sortPlus);
          twpro_xhtml+='<span class="item_popup_bonus">';
          twpro_xhtml+='<table><tr><td>';
          for(var twpro_i=0;(twpro_i<twpro_plus.length)&&(twpro_i<33);twpro_i++)
          {
            twpro_xhtml+='<span style="white-space:nowrap;'
            if(TWPro.twpro_activeJob() && (twpro_plus[twpro_i].search(new RegExp(TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)].name))!=-1))
            {
              twpro_xhtml+='color:rgb(78, 55, 7);';
            }
            twpro_xhtml+='">+'+twpro_plus[twpro_i]+'</span><br />';
            if(((twpro_j<=30) && (twpro_i==14)) || (((twpro_j>30) && (twpro_j<=33)) && (twpro_i==(Math.round(twpro_j/2)-1))) || ((twpro_j>33) && (twpro_i==16)))
            {
              twpro_xhtml+='</td><td>';
            }
          }
          if(twpro_i<twpro_plus.length)
          {
            twpro_xhtml+='...';
          }
          twpro_xhtml+='</td></tr></table>';
          twpro_xhtml+='</span><br />';
        }
      }
    }
  }
  return twpro_xhtml;
}

// fuegt Auswahlliste in das Inventar ein
function twpro_insertList(twpro_data)
{
  if(TWPro.twpro_failure) return;
  if(TWPro.twpro_jobsort==undefined)
  {
    TWPro.twpro_jobsort = 'name';
  }
  TWPro.twpro_bag = new Object();
  TWPro.twpro_bag.twpro_priceWear = 0;
  TWPro.twpro_bag.twpro_priceBag = 0;
  TWPro.twpro_bag.twpro_priceItems = 0;
  TWPro.twpro_bag.twpro_priceYields = 0;
  TWPro.twpro_bag.twpro_countType = new Object();
  TWPro.twpro_bag.twpro_types = new Array();
  TWPro.twpro_setItems = new Object();
  TWPro.twpro_setItemsCount = new Object();
  for(var twpro_set in TWPro.twpro_setBonus)
  {
    TWPro.twpro_setItemsCount[twpro_set] = 0;
  }
  TWPro.twpro_invHashTest = new Array();
  for(var twpro_type in Character.itemLevelRequirementDecrease)
  {
    if((twpro_type!='all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type])))
    {
      TWPro.twpro_bag.twpro_types.push(twpro_type);
      TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
    }
  }
  //alert(twpro_data.page);
  var twpro_xhtml = '<table id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; margin-left:20px;"><tr><td>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'name\');" id="twpro_jobsort_link_name"><img id="twpro_jobsort_name" alt="" src="images/transparent.png" style="height: 17px;width: 20px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'name')?('0px 0px'):('0px -17px'))+';" onmouseover="this.style.backgroundPosition=\'0px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'name\')?(\'0px 0px\'):(\'0px -17px\'));"/></a>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'ervaring\');" id="twpro_jobsort_link_ervaring"><img id="twpro_jobsort_ervaring" alt="" src="images/transparent.png" style="height: 17px;width: 21px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'ervaring')?('-20px 0px'):('-20px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-20px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'ervaring\')?(\'-20px 0px\'):(\'-20px -17px\'));"/></a>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'loon\');" id="twpro_jobsort_link_loon"><img id="twpro_jobsort_loon" alt="" src="images/transparent.png" style="height: 17px;width: 20px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'loon')?('-41px 0px'):('-41px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-41px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'loon\')?(\'-41px 0px\'):(\'-41px -17px\'));"/></a>';
  twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'geluk\');" id="twpro_jobsort_link_geluk"><img id="twpro_jobsort_geluk" alt="" src="images/transparent.png" style="height: 17px;width: 21px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'geluk')?('-61px 0px'):('-61px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-61px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'geluk\')?(\'-61px 0px\'):(\'-61px -17px\'));"/></a>';
    twpro_xhtml += '<a href="javascript:undefined;" onmouseup="TWPro.twpro_sortList(\'comb\');" id="twpro_jobsort_link_comb"><img id="twpro_jobsort_comb" alt="" src="images/transparent.png" style="display:none;height: 17px;width: 21px;background-image: url(http://www.tw-pro.de/img/sort.png);background-position: '+((TWPro.twpro_jobsort == 'comb')?('-61px 0px'):('-61px -17px'))+';" onmouseover="this.style.backgroundPosition=\'-61px 0px\';" onmouseout="this.style.backgroundPosition=((TWPro.twpro_jobsort == \'comb\')?(\'-61px 0px\'):(\'-61px -17px\'));"/></a>';
 
  if(TWPro.Hide_unjobs==true){checkednojob="checked"}else{checkednojob=""}
  twpro_xhtml += '<span id="twpro_aktuelleap" style="position:absolute;right:5px;visibility:hidden;"><span id="twpro_aktuelleapvalue" style="border-style:solid;border-width:1px;padding:2px;"></span> </span></td></tr><tr><td><select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:190px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">Lista muncilor</option></select>';
 
 /* 
  twpro_xhtml += '<input id="hidejobsIcant" type="checkbox" '+checkednojob+'  onclick="if (this.checked) {TWPro.Hide_unjobs=true}else{TWPro.Hide_unjobs=false};twpro_clickfilterList()" onmouseover=\'this.addMousePopup(new MousePopup("Verberg opdrachten die ik niet kan"));\'/>';
  
  */
  
      twpro_xhtml += '</td></tr></table>';
  
  
  twpro_data.page = twpro_data.page.replace(/<h2(.*)">(.+)<\/h2>/,'<h2$1white-space: nowrap;"><span id="twpro_bag" style="cursor: default;">$2</span>'+twpro_xhtml+'</h2>');
  
  var tmp='<div id="bag"></div>'
  
  twpro_data.page = twpro_data.page.replace(tmp,"<span id='twpro_combselection' style='display: none;'></span>"+tmp);
  
  
  //twpro_combselection
  
}

function twpro_sortList(twpro_jobSortItem)
{
  if(TWPro.twpro_failure) return;
  TWPro.twpro_jobsort = twpro_jobSortItem;
  TWPro.twpro_jobSortMark(twpro_jobSortItem,true);
  if(twpro_jobSortItem != 'name')
  {
    TWPro.twpro_jobSortMark('name',false);
  }
  if(twpro_jobSortItem != 'ervaring')
  {
    TWPro.twpro_jobSortMark('ervaring',false);
  }
  if(twpro_jobSortItem != 'loon')
  {
    TWPro.twpro_jobSortMark('loon',false);
  }
  if(twpro_jobSortItem != 'geluk')
  {
    TWPro.twpro_jobSortMark('geluk',false);
  }
    if(twpro_jobSortItem != 'comb')
  {
    TWPro.twpro_jobSortMark('comb',false);
  }
  if(TWPro.twpro_calculated && document.getElementById("twpro_jobList"))
  {
    if(document.getElementById('twpro_wait').text == 'Alege o muncă')
    {
      document.getElementById('twpro_wait').text = 'Vă rog să asteptaţi';
      var twpro_selectedJobName = 'none';
      if(document.getElementById("twpro_jobList").selectedIndex!=0)
      {
        var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
        if(twpro_selectedJob>=0)
        {
          twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
        }
      }
      document.getElementById("twpro_jobList").selectedIndex = 0;
      while(document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait')
      {
        document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
      }
      TWPro.twpro_jobs.sort(TWPro.twpro_sortJobs);
      TWPro.twpro_insertListItems();
      for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
      {
        TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
      }
      for(var twpro_i=0;twpro_i<document.getElementById("twpro_jobList").options.length;twpro_i++)
      {
        var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
        if(twpro_jobTest>=0)
        {
          if(twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName)
          {
            document.getElementById("twpro_jobList").selectedIndex = twpro_i;
          }
        }
      }
      document.getElementById('twpro_wait').text = 'Alege o muncă';
    }
    else
    {
      TWPro.twpro_jobs.sort(TWPro.twpro_sortJobs);
    }
  }
  document.getElementById('twpro_jobsort_link_'+twpro_jobSortItem).blur();
}

function twpro_jobSortMark(twpro_jobSortItem,twpro_jobSortValue)
{
  if(TWPro.twpro_failure) return;
  var twpro_bgposition = '';
  switch(twpro_jobSortItem)
  {
    case 'name':
    {
      twpro_bgposition += '0px';
	  	  document.getElementById('window_inventory').getElementById('twpro_combselection').style.display='';
      break;
    }
    case 'ervaring':
    {
      twpro_bgposition += '-20px';
	  	  document.getElementById('window_inventory').getElementById('twpro_combselection').style.display='';
      break;
    }
    case 'loon': 
    {
      twpro_bgposition += '-41px';
	  	  document.getElementById('window_inventory').getElementById('twpro_combselection').style.display='';
      break;
    }
    case 'geluk':
    {
      twpro_bgposition += '-61px';
	  	  document.getElementById('window_inventory').getElementById('twpro_combselection').style.display='';
      break;
    }
	    case 'comb':
    {
      twpro_bgposition += '-41px';
	  document.getElementById('window_inventory').getElementById('twpro_combselection').style.display='none';
	  

	  
	  
      break;
    }
  }
  twpro_bgposition += ' ';
  if(twpro_jobSortValue)
  {
    twpro_bgposition += '0px';
  }
  else
  {
    twpro_bgposition += '-17px';
  }
  document.getElementById('twpro_jobsort_'+twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
}

// macht die Liste sichtbar
function twpro_showList()
{

  TWPro.jobcombval.ervaring = 1;
  TWPro.jobcombval.loon = 1;
  TWPro.jobcombval.geluk = 1;
  
  if(TWPro.twpro_failure) return;
  $('twpro_jobsort_link_name').addMousePopup(new MousePopup('Sortare după <b>Nume</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_ervaring').addMousePopup(new MousePopup('Sortare după <b>Experienţă</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_loon').addMousePopup(new MousePopup('Sortare după <b>Salariu</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_geluk').addMousePopup(new MousePopup('Sortare după <b>Noroc</b>',100,{opacity:0.95}));
  $('twpro_jobsort_link_comb').addMousePopup(new MousePopup('op <b>alles</b> sorteren<br/>'+TWPro.jobcombval.ervaring+' X ervaring<br/>'+TWPro.jobcombval.loon+' X loon<br/>'+TWPro.jobcombval.geluk+' X geluk<br><small>dit is aan te passen via instellingen</small>',100,{opacity:0.95}));
  TWPro.twpro_bag.twpro_bagPopup = new MousePopup('',100,{opacity:0.95});
  TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function(){this.setXHTML(TWPro.twpro_getBagPopup());};
  TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
  $('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);

  //TWPro.twpro_invHash = new Array();
  if(TWPro.twpro_invHash==TWPro.twpro_invHashTest.join(','))
  {
    for(var twpro_wear in Wear.wear)
    {
      TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
      if(Wear.wear[twpro_wear].obj.twpro_bonus)
      {
        Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
//        {
//          Wear.wear[twpro_wear].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
//        }
      }
    }
    for(var twpro_bag in Bag.getInstance().items)
    {
      TWPro.twpro_prepareItem(Bag.getInstance().items[twpro_bag].obj);
      if(Bag.getInstance().items[twpro_bag].obj.twpro_bonus)
      {
        Bag.getInstance().items[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Bag.getInstance().items[twpro_bag].obj.item_id].twpro_jobbonus;
//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
//        {
//          Bag.getInstance().items[twpro_bag].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Bag.getInstance().items[twpro_bag].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
//        }
      }
    }
    TWPro.twpro_insertListItems();
    document.getElementById('twpro_wait').text = 'Alege o muncă';
  }
  document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
}

function twpro_getBagPopup()
{
  if(TWPro.twpro_failure) return '';
  var twpro_xhtml='';
  twpro_xhtml+='<div class="item_popup">';
  twpro_xhtml+='<span class="item_popup_title">Statistica inventarului</span>';
  twpro_xhtml+='<span class="item_popup_requirement_text">Valoare:</span>';
  twpro_xhtml+='<table>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Echipamente:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceWear+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Inventar:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceBag+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Obiecte:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceItems+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Produse:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_priceYields+' $</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Valoare totală:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+(TWPro.twpro_bag.twpro_priceWear+TWPro.twpro_bag.twpro_priceBag)+' $</td></tr>';
  twpro_xhtml+='</table>';
  twpro_xhtml+='<DIV class="popup_yield_divider"></DIV><span class="item_popup_requirement_text">Numărul obiectelor</span>';
  twpro_xhtml+='<table>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Pălării:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['head']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Coliere:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['neck']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Arme:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['right_arm']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Îmbrăcăminte:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['body']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Încălţăminte:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['foot']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Cai:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['animal']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Toate hainele:&nbsp;&nbsp;</td>';
  var twpro_all=TWPro.twpro_bag.twpro_countType['head']+TWPro.twpro_bag.twpro_countType['neck']+TWPro.twpro_bag.twpro_countType['right_arm']+TWPro.twpro_bag.twpro_countType['body']+TWPro.twpro_bag.twpro_countType['foot']+TWPro.twpro_bag.twpro_countType['animal'];
  twpro_xhtml+='<td class="item_popup_trader_price">'+twpro_all+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">Produse:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+TWPro.twpro_bag.twpro_countType['yield']+'</td></tr>';
  twpro_xhtml+='<tr><td class="item_popup_trader_price">total:&nbsp;&nbsp;</td>';
  twpro_xhtml+='<td class="item_popup_trader_price">'+(twpro_all+TWPro.twpro_bag.twpro_countType['yield'])+'</td></tr>';
  twpro_xhtml+='</table>';
  twpro_xhtml+='</div>';
  return twpro_xhtml;
}

// wird beim draufklicken auf die Liste ausgefuehrt, stoesst Berechnungen an
function twpro_clickList()
{
  if(TWPro.twpro_failure) return;
  if(document.getElementById('twpro_wait').text != 'Vă rog să asteptaţi' && document.getElementById('twpro_wait').text != 'Alege o muncă')
  {
    document.getElementById('twpro_wait').text = 'Vă rog să asteptaţi';
    window.setTimeout("TWPro.twpro_updateList()", 0);
  }
}
function twpro_clickfilterList()
{
  if(TWPro.twpro_failure) return;
document.getElementById('twpro_wait').innerHTML='Lista muncilor'
document.getElementById('twpro_jobList').innerHTML='<option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">Lista muncilor</option>';



twpro_clickList();

}



// stellt alle Jobs zusammen und fuegt einzelne Listenelemente ein
function twpro_updateList()
{
  if(TWPro.twpro_failure) return;
  if(!TWPro.twpro_calculated)
  {
    var twpro_jobCount = 0;
    for(var twpro_job in JobList)
    {
      TWPro.twpro_jobs[parseInt(twpro_job)]=JobList[twpro_job];
      TWPro.twpro_jobs[parseInt(twpro_job)].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g,'Character.skills.');
      twpro_jobCount++;
    }
    TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Construire(Orase)';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='construct';
    twpro_jobCount++;
	
	
	TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='1 * Character.skills.shot + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.appearance + 1 * Character.skills.tactic + 1 * Character.skills.aim + 1 * Character.skills.dodge + 1';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Duel (Pistoale)';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='duelv';
    twpro_jobCount++;

	TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='1 * Character.skills.shot + 1  * Character.skills.tough + 1 * Character.skills.appearance + 1 * Character.skills.tactic + 1 * Character.skills.aim + 1 * Character.skills.dodge + 1';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Duel (Pistol vs Săbii) ';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='duelvs';
    twpro_jobCount++;

	TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='1 * Character.skills.shot + 1 * Character.skills.reflex + 1 * Character.skills.appearance + 1 * Character.skills.tactic + 1 * Character.skills.aim + 1 * Character.skills.dodge + 1';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Duel (Pistol vs Pistol)';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='duelvv';
    twpro_jobCount++;

	
	TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='1 * Character.skills.punch + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.appearance + 1 * Character.skills.tactic + 1 * Character.skills.aim + 1 * Character.skills.dodge + 1';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Duel (Săbii)';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='duels';
    twpro_jobCount++;
	
	TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='1 * Character.skills.punch + 1 * Character.skills.reflex + 1 * Character.skills.appearance + 1 * Character.skills.tactic + 1 * Character.skills.aim + 1 * Character.skills.dodge + 1';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Duel (Săbii vs Pistoale)';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='duelsv';
    twpro_jobCount++;

	TWPro.twpro_jobs[TWPro.twpro_jobs.length]=new Object();
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation='1 * Character.skills.punch + 1  * Character.skills.tough + 1 * Character.skills.appearance + 1 * Character.skills.tactic + 1 * Character.skills.aim + 1 * Character.skills.dodge + 1';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].malus=0;
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].name='Duel (Săbii vs Săbii)';
    TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].shortName='duelss';
    twpro_jobCount++;
	
	
	
	
	
    TWPro.twpro_jobs.sort(TWPro.twpro_sortJobs);
    while(TWPro.twpro_jobs.length>twpro_jobCount)
    {
      TWPro.twpro_jobs.pop();
    }
  }
  TWPro.twpro_calculateJobs();
  TWPro.twpro_insertListItems();
  document.getElementById('twpro_wait').text = 'Alege o muncă';
}

function twpro_insertListItems()
{
  if(TWPro.twpro_failure) return;
  var twpro_jobList = document.getElementById('twpro_jobList');
  var twpro_jobElement;
  var twpro_apstmp;
  for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
  {
    twpro_apstmp = TWPro.twpro_jobs[twpro_i].twpro_aps;
    if((TWPro.twpro_jobs[twpro_i].shortName=='construct') && (Character.characterClass=='worker'))
    {
      twpro_apstmp = Math.floor(twpro_apstmp*1.05);
    }

      var twpro_job = TWPro.twpro_jobs[twpro_i];
      var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
      var twpro_setCounter = new Object();
      for(var twpro_wear in Wear.wear)
      {
        if(Wear.wear[twpro_wear].obj.twpro_bonus)
        {
          twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
        }
        if(Wear.wear[twpro_wear].obj.set != null)
        {
          if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined)
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
          }
          else
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
          }
        }
      }
      for(var twpro_set in twpro_setCounter)
      {
        if(twpro_setCounter[twpro_set]>=2)
        {
          twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
        }
      }
      if((twpro_job.shortName=='construct') && (Character.characterClass=='worker'))
      {
        twpro_aktuelleap = Math.floor(twpro_aktuelleap*1.05);
      }
      


    twpro_jobElement = document.createElement('option');
    twpro_jobElement.value = twpro_i;
    twpro_jobElement.appendChild(document.createTextNode(((TWPro.twpro_jobs[twpro_i].name.length>25)?(TWPro.twpro_jobs[twpro_i].name.substr(0,23)+'...'):(TWPro.twpro_jobs[twpro_i].name)) + ' (' + twpro_apstmp + ' / ' + twpro_aktuelleap + ' AP)'));
	if(twpro_apstmp > 0)
    {
	if(TWPro.Hide_unjobs==true){
      twpro_jobElement.style.backgroundColor='rgb(207, 195, 166)';
	  }else {
        if(twpro_aktuelleap < 0)
	{
	 twpro_jobElement.style.backgroundColor='rgb(255, 240, 0)';
	} else {
	twpro_jobElement.style.backgroundColor='rgb(160, 218, 120)';}
	}
	  	   twpro_jobList.appendChild(twpro_jobElement);
    }
    else
    {   
	if(TWPro.Hide_unjobs==false){
		
      	twpro_jobElement.style.backgroundColor='rgb(232, 150, 120)';
	 	   twpro_jobList.appendChild(twpro_jobElement);
	   }
    }



	//   norm rgb(207, 195, 166);
	//
	//

  }
}

// bestimmt Sortierreihenfolge der Jobs in der Liste
function twpro_sortJobs(twpro_a,twpro_b)
{
  if(TWPro.twpro_failure) return 0;
  var twpro_a_str = twpro_a.name.toLowerCase().replace(/\xE4/g,'a').replace(/\xF6/g,'o').replace(/\xFC/g,'u').replace(/\xDF/g,'ss');
  var twpro_b_str = twpro_b.name.toLowerCase().replace(/\xE4/g,'a').replace(/\xF6/g,'o').replace(/\xFC/g,'u').replace(/\xDF/g,'ss');
  if(TWPro.twpro_jobsort == 'name')
  {
    return (twpro_a_str==twpro_b_str)?(0):((twpro_a_str>twpro_b_str)?(1):(-1));
  }
  else
  {
  
  

    if(TWPro.twpro_jobsort == 'comb')
  {    

  TWPro.twpro_jobValues[twpro_a.shortName]['comb']=TWPro.twpro_jobValues[twpro_a.shortName]['ervaring']*TWPro.jobcombval.ervaring+TWPro.twpro_jobValues[twpro_a.shortName]['loon']*TWPro.jobcombval.loon+TWPro.twpro_jobValues[twpro_a.shortName]['geluk']*TWPro.jobcombval.geluk;
  TWPro.twpro_jobValues[twpro_b.shortName]['comb']=TWPro.twpro_jobValues[twpro_b.shortName]['ervaring']*TWPro.jobcombval.ervaring+TWPro.twpro_jobValues[twpro_b.shortName]['loon']*TWPro.jobcombval.loon+TWPro.twpro_jobValues[twpro_b.shortName]['geluk']*TWPro.jobcombval.geluk
  
  }
  
  var toreturntwprolistmae= (TWPro.twpro_jobValues[twpro_a.shortName][TWPro.twpro_jobsort] == TWPro.twpro_jobValues[twpro_b.shortName][TWPro.twpro_jobsort])?((twpro_a_str==twpro_b_str)?(0):((twpro_a_str>twpro_b_str)?(1):(-1))):(TWPro.twpro_jobValues[twpro_b.shortName][TWPro.twpro_jobsort] - TWPro.twpro_jobValues[twpro_a.shortName][TWPro.twpro_jobsort]);
  

var toreturntwprolistmae= (TWPro.twpro_jobValues[twpro_a.shortName][TWPro.twpro_jobsort] == TWPro.twpro_jobValues[twpro_b.shortName][TWPro.twpro_jobsort])?((twpro_a_str==twpro_b_str)?(0):((twpro_a_str>twpro_b_str)?(1):(-1))):(TWPro.twpro_jobValues[twpro_b.shortName][TWPro.twpro_jobsort] - TWPro.twpro_jobValues[twpro_a.shortName][TWPro.twpro_jobsort]);

  
  
  
    return toreturntwprolistmae;
  }
}

function twpro_sortPlus(twpro_a,twpro_b)
{
  if(TWPro.twpro_failure) return 0;
  var twpro_a_num = parseInt(twpro_a.substring(0,twpro_a.search(/ /)));
  var twpro_b_num = parseInt(twpro_b.substring(0,twpro_b.search(/ /)));
  return twpro_b_num - twpro_a_num;
}

function twpro_initializeItems(twpro_place,twpro_itemlist)
{
  if(TWPro.twpro_failure) return;
  var twpro_i = 0;
  if(twpro_place=='wear')
  {
    for(var twpro_wear in Wear.wear)
    {
      Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
      Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_'+Wear.wear[twpro_wear].obj.type);
      TWPro.twpro_bag.twpro_priceWear+=Wear.wear[twpro_wear].obj.sell_price;
      TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
      if(Wear.wear[twpro_wear].obj.type=='yield')
      {
        TWPro.twpro_bag.twpro_priceYields+=Wear.wear[twpro_wear].obj.sell_price;
      }
      else
      {
        TWPro.twpro_bag.twpro_priceItems+=Wear.wear[twpro_wear].obj.sell_price;
      }
      if((Wear.wear[twpro_wear].obj.set!=null) && (TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id]==undefined))
      {
        TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
        TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
      }
      if(TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]==undefined)
      {
        TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]=1;
      }
    }
  }
  if(twpro_place=='bag')
  {
    var twpro_itemcount;
    for(var twpro_bag in Bag.getInstance().items)
    {
      Bag.getInstance().items[twpro_bag].obj.twpro_place = twpro_place;
      Bag.getInstance().items[twpro_bag].obj.twpro_html = Bag.getInstance().items[twpro_bag].bag_item;
      if(Bag.getInstance().items[twpro_bag].count_text)
      {
        twpro_itemcount = parseInt(Bag.getInstance().items[twpro_bag].count_text.firstChild.data);
      }
      else
      {
        twpro_itemcount = 1;
      }
      TWPro.twpro_bag.twpro_priceBag+=twpro_itemcount*Bag.getInstance().items[twpro_bag].obj.sell_price;
      TWPro.twpro_bag.twpro_countType[Bag.getInstance().items[twpro_bag].obj.type]+=twpro_itemcount;
      if(Bag.getInstance().items[twpro_bag].obj.type=='yield')
      {
        TWPro.twpro_bag.twpro_priceYields+=twpro_itemcount*Bag.getInstance().items[twpro_bag].obj.sell_price;
      }
      else
      {
        TWPro.twpro_bag.twpro_priceItems+=twpro_itemcount*Bag.getInstance().items[twpro_bag].obj.sell_price;
      }
      if((Bag.getInstance().items[twpro_bag].obj.set!=null) && (TWPro.twpro_setItems[Bag.getInstance().items[twpro_bag].obj.item_id]==undefined))
      {
        TWPro.twpro_setItems[Bag.getInstance().items[twpro_bag].obj.item_id] = Bag.getInstance().items[twpro_bag].obj;
        TWPro.twpro_setItemsCount[Bag.getInstance().items[twpro_bag].obj.set.key]++;
      }
      if(TWPro.twpro_invHashTest[Bag.getInstance().items[twpro_bag].obj.item_id]==undefined)
      {
        TWPro.twpro_invHashTest[Bag.getInstance().items[twpro_bag].obj.item_id]=1;
      }
    }
  }
  if(twpro_place=='trader')
  {
    for(var twpro_obj in twpro_itemlist.items)
    {
      twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
      twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
      twpro_itemlist.items[twpro_obj].popup.refresh();
      twpro_i++;
    }
  }
  if(twpro_place=='own')
  {
    for(var twpro_obj in twpro_itemlist.data)
    {
      twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
      twpro_i++;
    }
    for(var twpro_bag in twpro_itemlist.bags)
    {
      for(var twpro_obj in twpro_itemlist.bags[twpro_bag].items)
      {
        twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
      }
    }
  }
}

// ermittelt die optimalen Kleidungsstuecke und errechnet die resultierenden Arbeitspunkte
function twpro_calculateJobs()
{
  if(TWPro.twpro_failure) return;
  var twpro_setitembonus;
  var twpro_setitemjobname;
  for(var twpro_wear in Wear.wear)
  {
    TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
  }
  for(var twpro_bag in Bag.getInstance().items)
  {
    TWPro.twpro_prepareItem(Bag.getInstance().items[twpro_bag].obj);
  }
  TWPro.twpro_calculated = false;
  TWPro.twpro_setItemsCalc = new Object();
  TWPro.twpro_setItemsEffect = false;
  for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
  {
    TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = new Array(null);
  }
  TWPro.twpro_setCount = new Object();
  for(var twpro_setItemId in TWPro.twpro_setItems)
  {
    var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
    if(twpro_setItem.twpro_wearable && (TWPro.twpro_setItemsCount[twpro_setItem.set.key]>=2))
    {
      TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
      TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
      TWPro.twpro_setItemsEffect = true;
    }
  }
  for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
  {
    var twpro_job = TWPro.twpro_jobs[twpro_i];
    twpro_job.twpro_jobid = twpro_i;
    twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
    twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/ \+ \d+$/,'');
    twpro_job.twpro_attributes = twpro_job.twpro_skills;
    for(var twpro_attname in Character.skill_names)
    {
      for(var twpro_j=0;twpro_j<Character.skill_names[twpro_attname].length;twpro_j++)
      {
        twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(new RegExp('\\.'+Character.skill_names[twpro_attname][twpro_j],'g'),'.'+twpro_attname);
      }
    }
    if(TWPro.twpro_setItemsEffect && (!TWPro.twpro_setBonusParsed))
    {
      for(var twpro_itemSet in TWPro.twpro_setBonus)
      {
        var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
        for(var twpro_j=2;twpro_j<twpro_itemSetBouns.length;twpro_j++)
        {
          twpro_setitembonus = twpro_itemSetBouns[twpro_j];
          twpro_setitemjobname = twpro_job.shortName;
          twpro_setitembonus.parsedBonus[twpro_setitemjobname] = twpro_setitembonus.jobBonus.all + ((twpro_setitembonus.jobBonus[twpro_setitemjobname]==undefined)?(0):(twpro_setitembonus.jobBonus[twpro_setitemjobname])) + TWPro.twpro_testItem(twpro_job,twpro_setitembonus);
        }
      }
    }
    twpro_job.twpro_bestStats = new Object();
    for(var twpro_j=0;twpro_j<TWPro.twpro_bag.twpro_types.length;twpro_j++)
    {
      twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
    }
    for(var twpro_wear in Wear.wear)
    {
      TWPro.twpro_compareItem(twpro_job,Wear.wear[twpro_wear].obj);
    }
    for(var twpro_bag in Bag.getInstance().items)
    {
      TWPro.twpro_compareItem(twpro_job,Bag.getInstance().items[twpro_bag].obj);
    }
    twpro_job.twpro_aps = twpro_job.twpro_skill - twpro_job.malus;
    for(var twpro_type in twpro_job.twpro_bestStats)
    {
      twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
    }
    if(TWPro.twpro_setItemsEffect)
    {
      var twpro_setItem;
      twpro_job.twpro_parsedItemBonus = new Object();
      twpro_job.twpro_bestCombi = new Object();
      for(var twpro_type in twpro_job.twpro_bestStats)
      {
        twpro_job.twpro_bestCombi[twpro_type] = 0;
        for(var twpro_j=1;twpro_j<TWPro.twpro_setItemsCalc[twpro_type].length;twpro_j++)
        {
          twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
          twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job,twpro_setItem);
        }
      }
      twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
    }
  }
  if(TWPro.twpro_setItemsEffect)
  {
    TWPro.twpro_calcSets();
  }
  TWPro.twpro_setBonusParsed = true;
  TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
  TWPro.twpro_calculated = true;
}

function twpro_calcSets()
{
  var twpro_testCombi = new Object();
  for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
  {
    twpro_testCombi[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
  }
  var twpro_setCounter = TWPro.twpro_setCount;
  TWPro.twpro_testnextvalid = new Array();
  var twpro_testnextvalid = TWPro.twpro_testnextvalid;
  TWPro.twpro_testnextnamen = new Object();
  var twpro_testnextnamen = TWPro.twpro_testnextnamen;

  for(var twpro_set in twpro_setCounter)
  {
    twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0)-1;
  }
  var twpro_next = false;
  var twpro_set;
  do
  {
    for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
    {
      var twpro_job = TWPro.twpro_jobs[twpro_i];
      var twpro_testAps = twpro_job.twpro_noSetAps;
      for(var twpro_type in twpro_testCombi)
      {
        if(twpro_testCombi[twpro_type]!=0)
        {
          twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
          var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
          twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
        }
      }
      for(var twpro_set in twpro_setCounter)
      {
        if(twpro_setCounter[twpro_set]>0)
        {
          twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
        }
      }
      if(twpro_testAps > twpro_job.twpro_aps)
      {
        twpro_job.twpro_aps = twpro_testAps;
        for(var twpro_type in twpro_testCombi)
        {
          twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
        }
      }
    }

    do
    {
      TWPro.anzahl3++;
      twpro_next = false;
      for(var twpro_type in twpro_testCombi)
      {
        var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];

        var twpro_testCombiType = twpro_testCombi[twpro_type];
        if(twpro_testCombiType!=0)
        {
          twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
          if((--twpro_setCounter[twpro_set])==1)
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
          }
          else
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
          }
        }
        if((twpro_testCombiType+1) < twpro_setItemsCalcType.length)
        {
          twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
          if((++twpro_setCounter[twpro_set])==1)
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
          }
          else
          {
            twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
          }
          twpro_next = true;
          break;
        }
        else
        {
          twpro_testCombi[twpro_type] = 0;
        }
      }
    }
    while((parseInt(twpro_testnextvalid.join(''),10)>0) && twpro_next);
  }
  while(twpro_next);
}

function twpro_prepareItem(twpro_item)
{
  if(TWPro.twpro_failure) return;
  var twpro_storedItem;
  if(TWPro.twpro_itemStorage[twpro_item.item_id] == undefined)
  {
    TWPro.twpro_itemStorage[twpro_item.item_id] = new Object();
    twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
  }
  else
  {
    twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
    if(twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus)
    {
      twpro_item.twpro_jobbonus = new Object();
    }
    twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
    return;
  }
  var twpro_i = 0;
  if(twpro_item.bonus.skills.length==undefined)
  {
    for(var twpro_skillname in twpro_item.bonus.skills)
    {
      twpro_i++;
    }
  }
  if(twpro_item.bonus.attributes.length==undefined)
  {
    for(var twpro_attname in twpro_item.bonus.attributes)
    {
      twpro_i++;
    }
  }
  if(twpro_i>0)
  {
    twpro_item.twpro_bonus = true;
    twpro_item.twpro_jobbonus = new Object();
    twpro_storedItem.twpro_jobbonus = new Object();
  }
  else
  {
    twpro_item.twpro_bonus = false;
  }
  twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item);
  twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
  twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
}

function twpro_wearItem(twpro_item)
{
  if(TWPro.twpro_failure) return false;
  if((twpro_item.characterClass!=null) && (twpro_item.characterClass!=Character.characterClass))
  {
    return false;
  }
  if((twpro_item.level!=null) && ((twpro_item.level-Character.itemLevelRequirementDecrease[twpro_item.type]-Character.itemLevelRequirementDecrease['all'])>Character.level))
  {
    return false;
  }
  if((twpro_item.characterSex!=null) && ((twpro_item.characterSex!=Character.characterSex) || (Character.characterClass=='greenhorn')))
  {
    return false;
  }
  return true;
}

function twpro_compareItem(twpro_job,twpro_item)
{
  if(TWPro.twpro_failure) return;
  var twpro_aktplus = TWPro.twpro_testItem(twpro_job,twpro_item);
  if(twpro_item.twpro_bonus)
  {
    twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
    TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
  }
  if((twpro_aktplus>=twpro_job.twpro_bestStats[twpro_item.type]) && twpro_item.twpro_wearable)
  {
    twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
  }
}

function twpro_testItem(twpro_job,twpro_item)
{
  if(TWPro.twpro_failure) return 0;
  if((!twpro_item.twpro_bonus) && (twpro_item.jobBonus==undefined))
  {
    return 0;
  }
  if(TWPro.twpro_itemStorage[twpro_item.item_id] != undefined)
  {
    if(TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined)
    {
      return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
    }
  }
  var twpro_aktskills = twpro_job.twpro_skills;
  var twpro_aktattributes = twpro_job.twpro_attributes;
  for(var twpro_skillname in twpro_item.bonus.skills)
  {
    twpro_aktskills = twpro_aktskills.replace(new RegExp('Character\\.skills\\.'+twpro_skillname,'g'),twpro_item.bonus.skills[twpro_skillname]);
  }
  twpro_aktskills = twpro_aktskills.replace(new RegExp('Character\\.skills\\.\\w+','g'),'0');
  for(var twpro_attname in twpro_item.bonus.attributes)
  {
    twpro_aktattributes = twpro_aktattributes.replace(new RegExp('Character\\.skills\\.'+twpro_attname,'g'),twpro_item.bonus.attributes[twpro_attname]);
  }
  twpro_aktattributes = twpro_aktattributes.replace(new RegExp('Character\\.skills\\.\\w+','g'),'0');
  return eval(twpro_aktskills)+eval(twpro_aktattributes);
}

function twpro_changeItem()
{
  if(TWPro.twpro_failure) return;
  TWPro.twpro_bag.twpro_priceWear = 0;
  TWPro.twpro_bag.twpro_priceBag = 0;
  TWPro.twpro_bag.twpro_priceItems = 0;
  TWPro.twpro_bag.twpro_priceYields = 0;
  TWPro.twpro_setItems = new Object();
  for(var twpro_set in TWPro.twpro_setBonus)
  {
    TWPro.twpro_setItemsCount[twpro_set] = 0;
  }
  for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
  {
    TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
  }
  //TWPro.twpro_invHash = new Array();
  TWPro.twpro_initializeItems('wear',null);
  TWPro.twpro_initializeItems('bag',null);
  TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
  TWPro.twpro_changeJob();
}

function twpro_changeJob()
{
  if(TWPro.twpro_failure) return;
  if(TWPro.twpro_calculated)
  {
    var twpro_jobList = document.getElementById('twpro_jobList');
    var twpro_selected = twpro_jobList.selectedIndex;
    twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
    var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
    for(var twpro_i=0;twpro_i<TWPro.twpro_bag.twpro_types.length;twpro_i++)
    {
      if(document.getElementById('char_'+TWPro.twpro_bag.twpro_types[twpro_i]))
      {
        document.getElementById('char_'+TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_'+TWPro.twpro_bag.twpro_types[twpro_i];
      }
    }
    for(var twpro_wear in Wear.wear)
    {
      Wear.wear[twpro_wear].popup.refresh();
    }
    for(var twpro_bag in Bag.getInstance().items)
    {
      Bag.getInstance().items[twpro_bag].popup.refresh();
      Bag.getInstance().items[twpro_bag].obj.twpro_html.firstChild.className = '';

    }
    if(twpro_selectedJob>=0)
    {
      var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
      TWPro.twpro_highlight(twpro_job);
      var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
      var twpro_setCounter = new Object();
      for(var twpro_wear in Wear.wear)
      {
        if(Wear.wear[twpro_wear].obj.twpro_bonus)
        {
          twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
        }
        if(Wear.wear[twpro_wear].obj.set != null)
        {
          if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined)
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
          }
          else
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
          }
        }
      }
      for(var twpro_set in twpro_setCounter)
      {
        if(twpro_setCounter[twpro_set]>=2)
        {
          twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
        }
      }
      if((twpro_job.shortName=='construct') && (Character.characterClass=='worker'))
      {
        twpro_aktuelleap = Math.floor(twpro_aktuelleap*1.05);
      }
      document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_aktuelleap+' AP';
      if(twpro_aktuelleap > 0)
      {
        if(twpro_aktuelleap >= twpro_job.twpro_aps)
        {
          document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)';
        }
        else
        {
          document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)';
        }
      }
      else
      {
        document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)';
      }
      document.getElementById('twpro_aktuelleap').style.visibility = 'visible';
    }
    else
    {
      document.getElementById('twpro_aktuelleap').style.visibility = 'hidden';
    }
  }
}

function twpro_highlight(twpro_job)
{
  if(TWPro.twpro_failure) return;
  for(var twpro_wear in Wear.wear)
  {
    var twpro_item = Wear.wear[twpro_wear].obj;
    if(TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0))
    {
      if(TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id)
      {
        twpro_item.twpro_html.className=twpro_item.twpro_html.className+' wear_'+twpro_item.type+'_highlight';
      }
    }
    else
    {
      if((twpro_item.twpro_wearable) && ((twpro_item.type=='animal') || ((twpro_item.twpro_bonus==false) && (twpro_job.twpro_bestStats[twpro_item.type]==0)) || ((twpro_item.twpro_bonus==true) && (twpro_item.twpro_jobbonus[twpro_job.shortName]>=twpro_job.twpro_bestStats[twpro_item.type]))))
      {
        twpro_item.twpro_html.className=twpro_item.twpro_html.className+' wear_'+twpro_item.type+'_highlight';
      }
    }
  }
  for(var twpro_bag in Bag.getInstance().items)
  {
    var twpro_item = Bag.getInstance().items[twpro_bag].obj;
    if(TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0))
    {
      if(TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id)
      {
        twpro_item.twpro_html.firstChild.className='wear_yield_highlight';
      }
    }
    else
    {
      if((twpro_item.twpro_wearable) && ((twpro_item.type!='animal') && ((((twpro_item.type=='yield') || (twpro_item.type=='right_arm')) && (twpro_item.twpro_bonus==true) && (twpro_job.twpro_bestStats[twpro_item.type]>0) && (twpro_item.twpro_jobbonus[twpro_job.shortName]>=twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type!='yield') && (twpro_item.type!='right_arm') && (((twpro_item.twpro_bonus==false) && (twpro_job.twpro_bestStats[twpro_item.type]==0)) || ((twpro_item.twpro_bonus==true) && (twpro_item.twpro_jobbonus[twpro_job.shortName]>=twpro_job.twpro_bestStats[twpro_item.type])))))))
      {
        twpro_item.twpro_html.firstChild.className='wear_yield_highlight';
      }
    }
  }
}

var twpro_scriptelement = document.createElement('script');
twpro_scriptelement.type='text/javascript';
twpro_scriptelement.text = 'if(window.TWPro==undefined)\n';
twpro_scriptelement.text += '{\n';
twpro_scriptelement.text += '  window.TWPro = new Object();\n';
twpro_scriptelement.text += '  TWPro.twpro_injectScript = '+twpro_injectScript.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_throwFailure = '+twpro_throwFailure.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_injectionSwitch = '+twpro_injectionSwitch.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getAuthor = '+twpro_getAuthor.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getTranslator = '+twpro_getTranslator.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_activeJob = '+twpro_activeJob.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getPlace = '+twpro_getPlace.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_initializeItems = '+twpro_initializeItems.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_popup = '+twpro_popup.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_insertList = '+twpro_insertList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_showList = '+twpro_showList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_getBagPopup = '+twpro_getBagPopup.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_clickList = '+twpro_clickList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_updateList = '+twpro_updateList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_sortJobs = '+twpro_sortJobs.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_sortList = '+twpro_sortList.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_insertListItems = '+twpro_insertListItems.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_jobSortMark = '+twpro_jobSortMark.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_sortPlus = '+twpro_sortPlus.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_calculateJobs = '+twpro_calculateJobs.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_calcSets = '+twpro_calcSets.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_prepareItem = '+twpro_prepareItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_compareItem = '+twpro_compareItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_wearItem = '+twpro_wearItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_testItem = '+twpro_testItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_changeItem = '+twpro_changeItem.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_changeJob = '+twpro_changeJob.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_highlight = '+twpro_highlight.toString()+'\n';
twpro_scriptelement.text += '  twptogle = '+twptogle.toString()+'\n';
twpro_scriptelement.text += '  twpro_changedfindtimereturn = '+twpro_changedfindtimereturn.toString()+'\n';
twpro_scriptelement.text += '  makefortmessage = '+makefortmessage.toString()+'\n';
twpro_scriptelement.text += '  makefortlist = '+makefortlist.toString()+'\n';
twpro_scriptelement.text += '  TWPro.twpro_injectScript();\n';
twpro_scriptelement.text += "  }";
document.body.appendChild(twpro_scriptelement);

























}


}


var url=window.location.href;
String.prototype.parseQueryString=function(){

		var vars = this.split(/[&;]/), res = [];

    for(var z in vars){

    var val=vars[z];

    var v=val.split(/=/);

    res[v[0]]=v[1];

			}

		return res;

};

var $=unsafeWindow.$;

var loc=location.pathname;

function BBCode(textarea){

this.textarea=textarea;

}

BBCode.prototype.getText=function(){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();return range.text;}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;return this.textarea.value.substring(start,end);}

return null;};

BBCode.prototype.insertText=function(startTag,text,endTag){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();range.text=startTag+text+endTag;range=document.selection.createRange();if(insText.length==0){range.move('character',-endTag.length);}else{range.moveStart('character',startTag.length+text.length+endTag.length);}

range.select();}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;this.textarea.value=this.textarea.value.substr(0,start)+startTag+text+endTag+this.textarea.value.substr(end);var pos;if(text.length==0){pos=start+startTag.length;}else{pos=start+startTag.length+text.length+endTag.length;}

this.textarea.selectionStart=pos;this.textarea.selectionEnd=pos;}};

BBCode.prototype.addCodeTag=function(tagName){this.insertText('['+tagName+']',this.getText(),'[/'+tagName+']');};

BBCode.prototype.addExtendedCodeTag=function(description,tagName){var input=prompt(description);var text=this.getText();text=(text.length==0?prompt(('ProsĂ­m zadej popisky pro \"%1\" BB-Code.',tagName)):text);this.insertText('['+tagName+'='+input+']',text,'[/'+tagName+']');};

BBCode.prototype.addCallbackCodeTag=function(tagName,callbackFunction){var text=callbackFunction();this.insertText('['+tagName+'='+text+']',this.getText(),'[/'+tagName+']');};



var supportedbbcodes=['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'url'];

var bbcodesstyle={'b':'0px 50%', 'i':'-20px 50%', 'u':'-40px 50%', 'del': '-60px 50%', 'player':'-80px 50%', 'town':'-100px 50%', 'fort':'-120px 50%', 'url':'-160px 50%'};

var bbcclass='profile_bb_code_image';



bbcbar=function(bbs, BBCobject){

var div=document.createElement('div');

div.style.display='inline';

var that=BBCobject;

for(var i in bbs){

var img=document.createElement('img');

img.src='images/transparent.png';

img.alt=bbs[i];

img.style.backgroundPosition=bbcodesstyle[bbs[i]];

img.className=bbcclass;

if(bbs[i]!='url')

img.addEventListener('click',function(){

that.addCodeTag(this.alt);

}, false);

else

img.addEventListener('click',function(){

that.addExtendedCodeTag('Url:', this.alt);

}, false);

div.appendChild(img);

}

return div;

};



if(loc=="/game.php"){

function addBBToMessageWindow(div2){

    if (!document.getElementById('window_messages')) return;

		var div = document.getElementById('window_messages_content').wrappedJSObject;

		var table=div.getElementById('write_table');

		var tr2=table.childNodes[1].childNodes[4];

		var tr=document.createElement('tr');

		var td=document.createElement('td');

		td.colspan='2';

		var BB=new BBCode(tr2.getElementById('text'));

		var bbbar=bbcbar(supportedbbcodes, BB);

		td.appendChild(bbbar);

		tr.appendChild(td);

		

		table.childNodes[1].insertBefore(tr, tr2);

}



function addBBToMessageReplyWindow(){

    if (!document.getElementById('window_messages')) return;

		var div = document.getElementById('window_messages_content').wrappedJSObject;

		var table=div.getElementById('tab_messages').getElementById('read_table');

		var app=table.getElementById('answer_field_row');

		var bef=table.getElementById('message_id');

		var BB=new BBCode(bef.nextSibling.nextSibling);

		var bbbar=bbcbar(supportedbbcodes, BB);		

		app.insertBefore(bbbar, bef);

}



	var o_show = unsafeWindow.AjaxWindow.setJSHTML;

	var f = function(div, content) {

		if (!div) return;

		var ret = o_show(div, content);

		addBBToMessageWindow(div);

		return(ret);

	};

	for(var o in o_show) {

		f[o] = o_show[o];

	}

unsafeWindow.AjaxWindow.setJSHTML = f;



	var o_show2 = unsafeWindow.Messages.show_message;

	var f2 = function(id, page) {

		var ret = o_show2(id, page);

		window.setTimeout(addBBToMessageReplyWindow, 1000);

		return(ret);

	};

	for(var o in o_show) {

		f2[o] = o_show2[o];

	}

unsafeWindow.Messages.show_message = f2;





}

else if(loc=="/forum.php"){

(function(){

var l=location.search.parseQueryString();

unsafeWindow.l=l;

if(l.mode!='new_thread' && l.answer!='1')

return;

GM_addStyle('.profile_bb_code_image {background-image:url(../images/bbcodes.png);height:20px;margin:6px 1px;width:20px;}');

var tx=document.getElementsByName('message')[0].wrappedJSObject;

var BB=new BBCode(tx);

var bef=tx.parentNode.parentNode;

var tr=document.createElement('tr');

var td=document.createElement('td');

var td2=document.createElement('td');

td.appendChild(bbcbar(supportedbbcodes, BB));

tr.appendChild(td2);

tr.appendChild(td);

bef.parentNode.insertBefore(tr, bef);

})();

}