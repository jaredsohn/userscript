// ==UserScript==
// @name          ParseEspionageReports
// @namespace     eljercode.com
// @description   Parses espionage reports, putting summary information in the subject lines
// @include       http://*playstarfleet*
// @include       http://*stardrifte*
// @include       http://*.bluefrogsrv.com*
// @version       2.4.7
// ==/UserScript==
//2.0.6 -- updated link to galaxy page for new post method requirement
//2.1   -- updated to work on stardrift empires, added page 2+ support
//2.2   -- added group defend support
//2.2.1 -- fixed bug when espi report only has resources (new due to GD support)
//2.2.2 -- must have deleted the ? to make "class" optional in "poseidon class cruiser" -- oops
//2.2.3 -- update to support bfg's new 'message_content' div
//2.2.4 -- fixed to prevent non-formatted version to show up at the end of the formatted version (leftover issue not fixed in 2.2.3)
//2.2.5 -- ... apparently i didnt log this change?
//2.2.6 -- updated to accommodate NPCs
//2.3   -- created by Kronin - hubbach.com - update for nova
//         added Nova ships (Zagreus, Empusa, Curetes, Carmanor, Pallas, Thanatos), Shadow Probes & Genesis Solar Satellites, Nova buildings (Resource Den) and Space Mines
//         fixed dsp for helios, added enemy IPBM amount into nukes-needed calculation
//2.3.1 -- fixed carmanor plunder number
//2.3.2 -- more nova updates
//2.3.3 -- update for tourney and some more nova features
//2.3.4 -- added Kronin's moon destruction calculator
//2.3.5 -- took diameter/lunar base out of older unis
//2.3.6 -- added new ships and buildings to old unis, separated out new attack ships. removed update link. added fleet RSP amounts as hover-over text of fleets/names
//2.3.7 -- updated data for NPCs for various unis, as some have dsp, some have DF, etc.
//2.3.8 -- added DF back in everywhere except sde, since it seems thats where its headed in game
//2.4   -- updated for conquest
//2.4.1 -- fixed a slight bug with moros
//2.4.2 -- fixed defense order
//2.4.3 -- fixed bug with NPCs showing NaN DSP
//2.4.4 -- added the means to store tech levels for use with mentat (for those that don't also use statscript)
//2.4.5 -- fixed moros/erebus in group defends
//2.4.7 -- updated to work in uni3 by TimeLord

var vNova=/nova/i.test(document.location.href);
var vTourney=/tournament/i.test(document.location.href);
var vStardrift=/stardrift/i.test(document.location.href);
var vExtreme=/extreme/i.test(document.location.href);
var vConquest=/conquest/i.test(document.location.href);
var vuni3=/uni3/i.test(document.location.href);

var vNPCHasDFs=!vTourney;
// not sure about next line if uni3 should be added
var vNPCHasDSP=(!vNova && !vTourney && !vConquest);

//set variables for various indexes/bounds of espiData array
var vTargetTypeIdx=0;
var vTargetNameIdx=1;
var vTargetCoordIdx=2;
var vOreResIdx=6;
var vCryResIdx=7;
var vHydResIdx=8; 
var vDefenderNameIdx=9;
var vLBShip=10;
var vUBShip=36;
var vLBDef=37;
var vABMIdx=42;
var vIPBMIdx=44;
var vUBDef=47;
var vOreWHIdx=48;
var vCryWHIdx=49;
var vHydWHIdx=50;
var vDenIdx=51;
var vOreMineIdx=52;
var vCryMineIdx=53;
var vHydMineIdx=54;
var vArmorIdx=55; 
var vWeaponIdx=56;
var vShieldIdx=57;
var vJetIdx=58;
var vPulseIdx=59;
var vWarpIdx=60;
var vAIIdx=61;
var vEspiIdx=62;
var vLunarBaseIdx=63;
var vOracleIdx=64;
var vWarpGateIdx=65;
var vDEFIdx=66;
var vBuildingIdx=67;
var vTechIdx=68;
var vDiameterIdx=69;
var vLunarDockIdx=70;
var vLeavingIdx=71;
var vBonusIdx=72;
var vGDIdx=73;

//get techs for mentat (and nukesneeded)
if(/\.com\/buildings\/(research_)?lab/i.test(document.location.href)){ fStoreTechs();}
 var vWeaponTech=(localStorage.getItem("statscript.research.Weapons Tech")==null)?12:parseInt(localStorage.getItem("statscript.research.Weapons Tech"),10);
 var vShieldTech=(localStorage.getItem("statscript.research.Shield Tech")==null)?12:parseInt(localStorage.getItem("statscript.research.Shield Tech"),10);
 var vArmorTech=(localStorage.getItem("statscript.research.Armor Tech")==null)?12:parseInt(localStorage.getItem("statscript.research.Armor Tech"),10);
 var vJetTech=(localStorage.getItem("statscript.research.Jet Drive")==null)?13:parseInt(localStorage.getItem("statscript.research.Jet Drive"),10);
 var vPulseTech=(localStorage.getItem("statscript.research.Pulse Drive")==null)?10:parseInt(localStorage.getItem("statscript.research.Pulse Drive"),10);
 var vWarpTech=(localStorage.getItem("statscript.research.Warp Drive")==null)?8:parseInt(localStorage.getItem("statscript.research.Warp Drive"),10);

if(/\.com\/messages/i.test(document.location.href)){
 ParseEspionageReports();
 setInterval(ParseEspionageReports,1000);
}

function ParseEspionageReports() {
 if(document.getElementById('vFlag')!=null){ return; }
 var vMessageTable=document.getElementById('messages');
 if(vMessageTable==null){ return; }
 var vFlag=document.createElement('div');
 vFlag.setAttribute('id','vFlag');
 vFlag.style.display='none';
 vMessageTable.appendChild(vFlag); 
 var vMessages=vMessageTable.getElementsByTagName('tr');
 for (i=1;i<vMessages.length;i++) {
  if(/(un)?read message( alt)?/i.test(vMessages[i].getAttribute('class'))){
   if(/espionage report for /i.test(vMessages[i].innerHTML)){
    var vSubjectLine=vMessages[i].getElementsByTagName('td')[1];
	var vMsgContentElement=GetClassItem(vMessages[i+1],'div','message_content');
	if(!vMsgContentElement){ vMsgContentElement=vMessages[i+1].getElementsByTagName('td')[0]; }
    var vOrigMessage=GetClassItem(vMsgContentElement,'div','text');
	
    var vOrigMessageTxt=vOrigMessage.innerHTML;
    var espiData=ParseEspiReport(vOrigMessageTxt);
    var vLinks=vOrigMessage.getElementsByTagName('a');
    var vLinkInfo='&nbsp;'
    for (j=1;j<vLinks.length;j++) { 
     vLinkInfo+='&nbsp;|&nbsp;'+vLinks[j].parentNode.innerHTML; 
    }
    
    vLinkInfo+='&nbsp;|&nbsp;'+GetClassItem(vMsgContentElement,'div','actions').getElementsByTagName('a')[0].parentNode.innerHTML;
    GetClassItem(vMsgContentElement,'div','text').innerHTML='';
    var vDios=0;
    var vZags=0;
    var vShips=0;
    var vDebris=0;
    var vTotRes=parseInt(espiData[vOreResIdx].replace(/,/g,""),10)+parseInt(espiData[vCryResIdx].replace(/,/g,""),10)+parseInt(espiData[vHydResIdx].replace(/,/g,""),10);
    
    if(vTotRes<1000) {
     vRes=vTotRes.toString();
    } else {
     if(vTotRes<1000000) {
      vRes=Math.ceil(vTotRes/1000)+'k';
     } else {
      if(vTotRes<1000000000) {
       vRes=(Math.ceil(vTotRes/100000)/10)+'m';
      } else {
       if(vTotRes<1000000000000) {
        vRes=(Math.ceil(vTotRes/100000000)/10)+'b';
       } else {
        vRes=(Math.ceil(vTotRes/100000000000)/10)+'t';
       }
      }
     }
    }
    
    if(vConquest) {
     var debrisAmount=GetConquestDebrisAmounts();
    } else {
     var debrisAmount=GetDebrisAmounts();
    }
    if(vConquest){
     for (j=vLBShip;j<=vUBDef;j++) {
      if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""),10)>0) { 
       var vShipCount=parseInt(espiData[j].replace(/,/g,""),10);
       if(j<=vUBShip) { vShips+=vShipCount; } 
       vDebris+=(vShipCount*debrisAmount[j]); } }
    } else {
     for (j=vLBShip;j<=vUBShip;j++) {
      if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""),10)>0) { 
       var vShipCount=parseInt(espiData[j].replace(/,/g,""),10);
       vShips+=vShipCount;
       vDebris+=(vShipCount*debrisAmount[j]); } }
    }
    if(espiData[vGDIdx]>1){
     for(q=1;q<espiData[vGDIdx];q++){
     	var vOffset=(vGDIdx+1)+((vUBShip-vLBShip)+2)*(q-1);
     	for(j=vLBShip;j<=vUBShip;j++){
       var vShip=vOffset+j-9;
     	 if(espiData[vShip].length>0 && parseInt(espiData[vShip].replace(/,/g,""),10)>0) {
     	  var vShipCount=parseInt(espiData[vShip].replace(/,/g,""),10);
     	  vShips+=vShipCount;
     	  vDebris+=(vShipCount*debrisAmount[j]);
       }
     	}
     }
    }

    var vDefenses=0;
    for (j=vLBDef;j<=vUBDef;j++) {if (j!=vABMIdx&&j!=vIPBMIdx) {if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""),10)>0) { vDefenses+=parseInt(espiData[j].replace(/,/g,""),10); }}}
    if((espiData[vTargetTypeIdx]=='Encounter') && !vNPCHasDFs){
     vDios=0;
     vZags=0;
    } else {
     vDios=(Math.ceil(vDebris/20000));
     vZags=(Math.ceil(vDebris/5000));
    }
    if (espiData[vDefenderNameIdx].length==0) { 
     vShips='?';
     vZags='?';
     vDios='?'; }
    if (espiData[vDEFIdx].length==0) { vDefenses='?'; }
    var vWarning='';
    if (espiData[vGDIdx]>1){ vWarning+='<span style="color:lightgreen;font-weight:bold;font-size=200%;">GROUP DEFEND</span><br />'; }
    if (espiData[vLeavingIdx].length>0){ vWarning+='<span style="color:yellow;">Encounter Leaving Soon</span><br />'; }
    vSubjectLine.innerHTML=vWarning+espiData[vTargetTypeIdx].substr(0,1)+'&nbsp;Res:'+vRes+'&nbsp;S:'+vShips+'&nbsp;D:'+vDefenses+'&nbsp;Dios:'+vDios;
    
    var vToggleLink='<a href="#" onClick="if(document.getElementById(&quot;MsgData'+i+'&quot;).style.display==&quot;&quot;){document.getElementById(&quot;MsgData'+i+'&quot;).style.display=&quot;none&quot;;}else{document.getElementById(&quot;MsgData'+i+'&quot;).style.display=&quot;&quot;;};return false">Toggle original report</a>';

    vPlanetCoords=GetClassItemRX(GetClassItemRX(document.getElementById('user_planets'),'div',/selected/im),'div',/coordinates/im).innerHTML.match(/\d{1,2}:\d{1,3}:\d{1,2}m?/m)[0].replace(/\:/gm,'%3A');

    var vBattlementatLink='&nbsp;|&nbsp;&nbsp;<a href="http://battlementat.com/#aLocation='+vPlanetCoords+'&aWeapons='+vWeaponTech+'&aShield='+vShieldTech+'&aArmor='+vArmorTech+'&aJet='+vJetTech+'&aPulse='+vPulseTech+'&aWarp='+vWarpTech+'&espionage='+encodeURIComponent(vOrigMessageTxt.trim().replace(/<br[^>]*>/g,"\n").replace(/<(.|\n)*?>/g,"")).replace(/!/gm,'%21').replace(/'/gm,'%27').replace(/\(/gm,'%28').replace(/\)/gm,'%29').replace(/\*/gm,'%2A')+'" target="_blank">Battlementat</a>';
    vOrigMessage.innerHTML=FormatEspiMessage(espiData,vShips,vDefenses,vDios,vZags);
    vOrigMessage.innerHTML+='<br />'+vOrigMessageTxt.match(/The chance of your probes being intercepted is \d+\%/im)[0];
    if(espiData[vLeavingIdx].length>0) { vOrigMessage.innerHTML+='<br />'+espiData[vLeavingIdx]; }
    if(espiData[vBonusIdx].length>0) { vOrigMessage.innerHTML+='<br />'+espiData[vBonusIdx]; }
    vOrigMessage.innerHTML+='<br /><br />'+vToggleLink+vLinkInfo+vBattlementatLink+'<div id="MsgData'+i+'" style="display:none"><br />'+vOrigMessageTxt+'</div>';

    }  } }}
function ParseEspiReport(vEspi) {
 var vData=new Array();
 var vDefenders, vMainFleet, vNextFleet, vOffset;

 vData[0]=ParseEspiField(vEspi,/(Encounter|Planet|Moon|(Hephaestus Class|Titan) Attack Platform) ([^\x00]*?) <a href="/m,1);
 vData[1]=ParseEspiField(vEspi,/(Encounter|Planet|Moon|(Hephaestus Class|Titan) Attack Platform) ([^\x00]*?) <a href="/m,3);
 vData[2]=ParseEspiField(vEspi,/(\[\d{1,2}:\d{1,3}:\d{1,2}[me]?\])</m,1);
 vData[3]=ParseEspiField(vEspi,/\[(\d{1,2}):\d{1,3}:\d{1,2}[me]?\]</m,1);
 vData[4]=ParseEspiField(vEspi,/\[\d{1,2}:(\d{1,3}):\d{1,2}[me]?\]</m,1);
 vData[5]=ParseEspiField(vEspi,/\[\d{1,2}:\d{1,3}:(\d{1,2})[me]?\]</m,1);
 vData[6]=ParseEspiField(vEspi,/\* ore: ([0-9,]+)/m,1);
 vData[7]=ParseEspiField(vEspi,/\* crystal: ([0-9,]+)/m,1);
 vData[8]=ParseEspiField(vEspi,/\* hydrogen: ([0-9,]+)/m,1);
 vDefenders=vEspi.replace(/<br>/g,'<br />').match(/[^\x00>]+?'S SHIPS:[^\x00]+?<br \/><br \/>/gim);
 vMainFleet=(vDefenders!=null)?vDefenders[0]:'';
 vData[9]=ParseEspiField(vMainFleet,/([^\x00]+?)'S SHIPS:</m,1);
 vData[10]=ParseEspiField(vMainFleet,/\* Shadow (Class )?Probe: ([\d,]+)/m,2);
 vData[11]=ParseEspiField(vMainFleet,/\* Genesis (Class )?Solar Satellite: ([\d,]+)/m,2);
 vData[12]=ParseEspiField(vMainFleet,/\* Hermes (Class )?Probe: ([\d,]+)/m,2);
 vData[13]=ParseEspiField(vMainFleet,/\* Helios (Class )?Solar Satellite: ([\d,]+)/m,2);
 vData[14]=ParseEspiField(vMainFleet,/\* Artemis (Class )?Fighter: ([\d,]+)/m,2);
 vData[15]=ParseEspiField(vMainFleet,/\* Atlas (Class )?Cargo: ([\d,]+)/m,2);
 vData[16]=ParseEspiField(vMainFleet,/\* Apollo (Class )?Fighter: ([\d,]+)/m,2);
 vData[17]=ParseEspiField(vMainFleet,/\* Erebus (Class )?Fighter: ([\d,]+)/m,2);
 vData[18]=ParseEspiField(vMainFleet,/\* Zagreus (Class )?Recycler: ([\d,]+)/m,2);
 vData[19]=ParseEspiField(vMainFleet,/\* Charon (Class )?Transport: ([\d,]+)/m,2);
 vData[20]=ParseEspiField(vMainFleet,/\* Hercules (Class )?Cargo: ([\d,]+)/m,2);
 vData[21]=ParseEspiField(vMainFleet,/\* Empusa (Class )?Fighter: ([\d,]+)/m,2);
 vData[22]=ParseEspiField(vMainFleet,/\* Dionysus (Class )?Recycler: ([\d,]+)/m,2);
 vData[23]=ParseEspiField(vMainFleet,/\* Curetes (Class )?Cruiser: ([\d,]+)/m,2);
 vData[24]=ParseEspiField(vMainFleet,/\* Poseidon (Class )?Cruiser: ([\d,]+)/m,2);
 vData[25]=ParseEspiField(vMainFleet,/\* Carmanor (Class )?Cargo: ([\d,]+)/m,2);
 vData[26]=ParseEspiField(vMainFleet,/\* Pallas (Class )?Bomber: ([\d,]+)/m,2);
 vData[27]=ParseEspiField(vMainFleet,/\* Moros (Class )?Battleship: ([\d,]+)/m,2);
 vData[28]=ParseEspiField(vMainFleet,/\* Gaia (Class )?Colony Ship: ([\d,]+)/m,2);
 vData[29]=ParseEspiField(vMainFleet,/\* Athena (Class )?Battleship: ([\d,]+)/m,2);
 vData[30]=ParseEspiField(vMainFleet,/\* Triton (Class )?Recycler: ([\d,]+)/m,2);
 vData[31]=ParseEspiField(vMainFleet,/\* Ares (Class )?Bomber: ([\d,]+)/m,2);
 vData[32]=ParseEspiField(vMainFleet,/\* Hades (Class )?Battleship: ([\d,]+)/m,2);
 vData[33]=ParseEspiField(vMainFleet,/\* Prometheus (Class )?Destroyer: ([\d,]+)/m,2);
 vData[34]=ParseEspiField(vMainFleet,/\* Thanatos (Class )?Destroyer: ([\d,]+)/m,2);
 vData[35]=ParseEspiField(vMainFleet,/\* Zeus( Class)?: ([\d,]+)/m,2);
 vData[36]=ParseEspiField(vMainFleet,/\* (Hephaestus Class|Titan) Attack Platform: ([\d,]+)/m,2);
 vData[37]=ParseEspiField(vEspi,/\* Missile Battery: ([\d,]+)/m,1);
 vData[38]=ParseEspiField(vEspi,/\* Laser Cannon: ([\d,]+)/m,1);
 vData[39]=ParseEspiField(vEspi,/\* Space Mine: ([\d,]+)/m,1);
 vData[40]=ParseEspiField(vEspi,/\* Pulse Cannon: ([\d,]+)/m,1);
 vData[41]=ParseEspiField(vEspi,/\* Particle Cannon: ([\d,]+)/m,1);
 vData[42]=ParseEspiField(vEspi,/\* Anti-Ballistic Missile: ([\d,]+)/m,1);
 vData[43]=ParseEspiField(vEspi,/\* Decoy: ([\d,]+)/m,1);
 vData[44]=ParseEspiField(vEspi,/\* Interplanetary Ballistic Missile: ([\d,]+)/m,1);
 vData[45]=ParseEspiField(vEspi,/\* Gauss Cannon: ([\d,]+)/m,1);
 vData[46]=ParseEspiField(vEspi,/\* Large Decoy: ([\d,]+)/m,1);
 vData[47]=ParseEspiField(vEspi,/\* Plasma Cannon: ([\d,]+)/m,1);
 vData[48]=ParseEspiField(vEspi,/\* Ore Warehouse: ([\d,]+)/m,1);
 vData[49]=ParseEspiField(vEspi,/\* Crystal Warehouse: ([\d,]+)/m,1);
 vData[50]=ParseEspiField(vEspi,/\* Hydrogen Storage: ([\d,]+)/m,1);
 vData[51]=ParseEspiField(vEspi,/\* Resource Den: ([\d,]+)/m,1);
 vData[52]=ParseEspiField(vEspi,/\* Ore Mine: ([\d,]+)/m,1);
 vData[53]=ParseEspiField(vEspi,/\* Crystal Mine: ([\d,]+)/m,1);
 vData[54]=ParseEspiField(vEspi,/\* Hydrogen (Synthesizer|Refinery): ([\d,]+)/m,2);
 vData[55]=ParseEspiField(vEspi,/\* Armor Tech: ([\d,]+)/m,1);
 vData[56]=ParseEspiField(vEspi,/\* Weapons Tech: ([\d,]+)/m,1);
 vData[57]=ParseEspiField(vEspi,/\* Shield Tech: ([\d,]+)/m,1);
 vData[58]=ParseEspiField(vEspi,/\* Jet Drive: ([\d,]+)/m,1);
 vData[59]=ParseEspiField(vEspi,/\* Pulse Drive: ([\d,]+)/m,1);
 vData[60]=ParseEspiField(vEspi,/\* Warp Drive: ([\d,]+)/m,1);
 vData[61]=ParseEspiField(vEspi,/\* A.I. Tech: ([\d,]+)/m,1);
 vData[62]=ParseEspiField(vEspi,/\* Espionage Tech: ([\d,]+)/m,1);
 vData[63]=ParseEspiField(vEspi,/\* Lunar Base: ([\d,]+)/m,1);
 vData[64]=ParseEspiField(vEspi,/\* Oracle: ([\d,]+)/m,1);
 vData[65]=ParseEspiField(vEspi,/\* Warp Gate: ([\d,]+)/m,1);
 vData[66]=ParseEspiField(vEspi,/(DEFENSES:)/m,1);
 vData[67]=ParseEspiField(vEspi,/(BUILDINGS:)/m,1);
 vData[68]=ParseEspiField(vEspi,/(TECHS:)/m,1);

 vData[69]=ParseEspiField(vEspi,/Diameter: (\d+)/m,1);
 vData[70]=ParseEspiField(vEspi,/\* Lunar Dock: ([\d,]+)/m,1);
 vData[71]=ParseEspiField(vEspi,/([a-z ]+show signs of leaving soon|The territory shows signs of spatial instability\.)/mi,1);
 vData[72]=ParseEspiField(vEspi,/(Holding[a-z ,]+\.)/mi,1);
 
 if(vDefenders==null) {
  vData[vGDIdx]=0;
 } else {
  vData[vGDIdx]=vDefenders.length;
  if(vDefenders.length>1){
   for(q=1;q<vDefenders.length;q++){
    vNextFleet=vDefenders[q];
    vOffset=(vGDIdx+1)+((vUBShip-vLBShip)+2)*(q-1);
    vData[vOffset+0]=ParseEspiField(vNextFleet,/([^\x00]+?)'S SHIPS:</m,1);
    vData[vOffset+1]=ParseEspiField(vNextFleet,/\* Shadow (Class )?Probe: ([\d,]+)/m,2);
    vData[vOffset+2]=ParseEspiField(vNextFleet,/\* Genesis (Class )?Solar Satellite: ([\d,]+)/m,2);
    vData[vOffset+3]=ParseEspiField(vNextFleet,/\* Hermes (Class )?Probe: ([\d,]+)/m,2);
    vData[vOffset+4]=ParseEspiField(vNextFleet,/\* Helios (Class )?Solar Satellite: ([\d,]+)/m,2);
    vData[vOffset+5]=ParseEspiField(vNextFleet,/\* Artemis (Class )?Fighter: ([\d,]+)/m,2);
    vData[vOffset+6]=ParseEspiField(vNextFleet,/\* Atlas (Class )?Cargo: ([\d,]+)/m,2);
    vData[vOffset+7]=ParseEspiField(vNextFleet,/\* Apollo (Class )?Fighter: ([\d,]+)/m,2);
    vData[vOffset+8]=ParseEspiField(vNextFleet,/\* Erebus (Class )?Fighter: ([\d,]+)/m,2);
    vData[vOffset+9]=ParseEspiField(vNextFleet,/\* Zagreus (Class )?Recycler: ([\d,]+)/m,2);
    vData[vOffset+10]=ParseEspiField(vNextFleet,/\* Charon (Class )Transport: ([\d,]+)/m,2);
    vData[vOffset+11]=ParseEspiField(vNextFleet,/\* Hercules (Class )?Cargo: ([\d,]+)/m,2);
    vData[vOffset+12]=ParseEspiField(vNextFleet,/\* Empusa (Class )?Fighter: ([\d,]+)/m,2);
    vData[vOffset+13]=ParseEspiField(vNextFleet,/\* Dionysus (Class )?Recycler: ([\d,]+)/m,2);
    vData[vOffset+14]=ParseEspiField(vNextFleet,/\* Curetes (Class )?Cruiser: ([\d,]+)/m,2);
    vData[vOffset+15]=ParseEspiField(vNextFleet,/\* Poseidon (Class )Cruiser: ([\d,]+)/m,2);
    vData[vOffset+16]=ParseEspiField(vNextFleet,/\* Carmanor (Class )?Cargo: ([\d,]+)/m,2);
    vData[vOffset+17]=ParseEspiField(vNextFleet,/\* Pallas (Class )?Bomber: ([\d,]+)/m,2);
    vData[vOffset+18]=ParseEspiField(vNextFleet,/\* Moros (Class )?Battleship: ([\d,]+)/m,2);
    vData[vOffset+19]=ParseEspiField(vNextFleet,/\* Gaia (Class )?Colony Ship: ([\d,]+)/m,2);
    vData[vOffset+20]=ParseEspiField(vNextFleet,/\* Athena (Class )?Battleship: ([\d,]+)/m,2); 
    vData[vOffset+21]=ParseEspiField(vNextFleet,/\* Triton (Class )?Recycler: ([\d,]+)/m,2);
    vData[vOffset+22]=ParseEspiField(vNextFleet,/\* Ares (Class )?Bomber: ([\d,]+)/m,2);
    vData[vOffset+23]=ParseEspiField(vNextFleet,/\* Hades (Class )?Battleship: ([\d,]+)/m,2);
    vData[vOffset+24]=ParseEspiField(vNextFleet,/\* Prometheus (Class )?Destroyer: ([\d,]+)/m,2);
    vData[vOffset+25]=ParseEspiField(vNextFleet,/\* Thanatos (Class )?Destroyer: ([\d,]+)/m,2);
    vData[vOffset+26]=ParseEspiField(vNextFleet,/\* Zeus( Class)?: ([\d,]+)/m,2);
    vData[vOffset+27]=ParseEspiField(vNextFleet,/\* (Hephaestus Class|Titan) Attack Platform: ([\d,]+)/m,2);
   }
  }
 }
 return vData; }

function ParseEspiField(vReport,vRegEx,vMatchNo) {
 var vReturn='';
 var vREMatch=vReport.match(vRegEx);
 if (vREMatch != null) {  vReturn=vREMatch[vMatchNo]; }
 return vReturn;}

function addCommas(vNumber) {
 while (/(\d+)(\d{3})/.test(vNumber)) {vNumber = vNumber.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');}
 return vNumber;}

function FormatEspiMessage(espiData,vShips,vDefenses,vDios,vZags) {
 var currPlanet='';
 var vEncounter=(espiData[vTargetTypeIdx]=='Encounter');
 var vURLTest=document.location.href.match(/_planet=(\d+)/i);
 if (vURLTest != null) { currPlanet=vURLTest[1]; }
 var vText=espiData[vTargetTypeIdx]+' '+espiData[vTargetNameIdx]+' '+ReturnSystemLink(espiData[vTargetCoordIdx],currPlanet)+'  has: <br />RESOURCES:<br />';

 var vOreMine=parseInt(espiData[vOreMineIdx],10);
 var vCryMine=parseInt(espiData[vCryMineIdx],10);
 var vHydMine=parseInt(espiData[vHydMineIdx],10);
 
 var vOreCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[vOreWHIdx],10)))+1)).toString());
 var vCryCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[vCryWHIdx],10)))+1)).toString());
 var vHydCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[vHydWHIdx],10)))+1)).toString());
 
 var vSpeedMultiplier=(vExtreme)? 2:1;
 var vMineProdBase=(/stardriftempires|uni2\./i.test(document.location.href))? 1.14 : 1.1;
 var vOreDroids=(((vOreMine-(vOreMine % 3))/3+1)*2)/100+1;
 var vCryDroids=(((vCryMine-(vCryMine % 3))/3+1)*2)/100+1;
 var vHydDroids=(((vHydMine-(vHydMine % 3))/3+1)*2)/100+1;
 var vOreProd=Math.floor(Math.floor(30*vOreMine*Math.pow(vMineProdBase,vOreMine))*vOreDroids*vSpeedMultiplier)+20*vSpeedMultiplier;
 if(vTourney || vNova || vuni3) {
	 if(vTourney || (vOreMine <= 30)) {
		 vOreProd=Math.floor((30*vOreMine*Math.pow(1.14,vOreMine)+20)*(3600/2700)*vOreDroids);
	 } else {
		 vOreProd=Math.floor((30*vOreMine*Math.pow(1.14,Math.log(vOreMine-29)+30)+20)*(3600/2700)*vOreDroids);
	 }
 }
 var vCryProd=Math.floor(Math.floor(20*vCryMine*Math.pow(vMineProdBase,vCryMine)+10)*vCryDroids*vSpeedMultiplier);
 if(vTourney || vNova || vuni3) {
	 if(vTourney || (vCryMine <= 30)){
		 vCryProd=Math.floor((20*vCryMine*Math.pow(1.14,vCryMine)+10)*(3600/2700)*vCryDroids);
	 } else {
		 vCryProd=Math.floor((20*vCryMine*Math.pow(1.14,Math.log(vCryMine-29)+30)+10)*(3600/2700)*vCryDroids);
	 }
 }
 var vHydProd=Math.floor((12*vHydMine*Math.pow(vMineProdBase,vHydMine)*1.24*vHydDroids)*vSpeedMultiplier);
 if(vTourney || vNova || vuni3) {
     if(vTourney || (vHydMine <= 30)){
         vHydProd=Math.floor((12*vHydMine*Math.pow(1.14,vHydMine)*1.24)*(3600/2700)*vHydDroids);
     } else {
         vHydProd=Math.floor((12*vHydMine*Math.pow(1.14,Math.log(vHydMine-29)+30)*1.24)*(3600/2700)*vHydDroids);
     }
 }
 var vOreProdStr=addCommas(vOreProd.toString());
 var vCryProdStr=addCommas(vCryProd.toString());
 var vHydProdStr=addCommas(vHydProd.toString());
 var vOreAmt=parseInt(espiData[vOreResIdx].replace(/,/g,''),10);
 var vCryAmt=parseInt(espiData[vCryResIdx].replace(/,/g,''),10);
 var vHydAmt=parseInt(espiData[vHydResIdx].replace(/,/g,''),10);
 var vOreTime=vOreAmt/vOreProd;
 var vCryTime=vCryAmt/vCryProd;
 var vOreHH=parseInt(vOreTime,10);
 var vCryHH=parseInt(vCryTime,10);
 var vOreHHStr=vOreHH.toString();
 var vCryHHStr=vCryHH.toString();
 var vOreMM=parseInt(60*(vOreTime-vOreHH),10);
 var vCryMM=parseInt(60*(vCryTime-vCryHH),10);
 var vOreMMStr=vOreMM.toString();
 var vCryMMStr=vCryMM.toString();
 if (vOreMMStr.length==1) { vOreMMStr='0'+vOreMMStr; }
 if (vCryMMStr.length==1) { vCryMMStr='0'+vCryMMStr; }
 
 var vOreSS=parseInt((vOreTime-vOreHH-vOreMM/60)*3600,10);
 var vCrySS=parseInt((vCryTime-vCryHH-vCryMM/60)*3600,10);
 var vOreSSStr=vOreSS.toString();
 var vCrySSStr=vCrySS.toString();
 if (vOreSSStr.length==1) { vOreSSStr='0'+vOreSSStr; }
 if (vCrySSStr.length==1) { vCrySSStr='0'+vCrySSStr; }
 
 var vOreTimeStr=vOreHHStr+':'+vOreMMStr+':'+vOreSSStr;
 var vCryTimeStr=vCryHHStr+':'+vCryMMStr+':'+vCrySSStr;

 if(espiData[vOreMineIdx].length==0) {
  if(espiData[vTargetTypeIdx]=='Planet'){
   var vOreData='(no mine data)';
   var vCryData='(no mine data)';
   var vHydData='(no mine data)';
  }
  else
  {
   var vOreData='';
   var vCryData='';
   var vHydData='';
  }
 }
 else
 {
  var vOreData='(~'+vOreProdStr+'/hr) ('+vOreCapacity+') (~'+vOreTimeStr+')';
  var vCryData='(~'+vCryProdStr+'/hr) ('+vCryCapacity+') (~'+vCryTimeStr+')';
  var vHydData='(~'+vHydProdStr+'/hr) ('+vHydCapacity+')';
 }

 var DSPAmount=GetDSPAmounts();
 var RSPAmount=GetRSPAmounts();
 var vDSPs=0;
 var vTotRSP=0;
 var vRSPs=new Array();
 vRSPs[0] = 0;
 for (j=vLBShip;j<=vUBShip;j++) {
  if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""),10)>0) { 
   var vShipCount=parseInt(espiData[j].replace(/,/g,""),10);
   vDSPs+=(vShipCount*DSPAmount[j]); 
   vRSPs[0]+=(vShipCount*RSPAmount[j]); 
   vTotRSP+=(vShipCount*RSPAmount[j]); 
   } }
    if(espiData[vGDIdx]>1){
     for(q=1;q<espiData[vGDIdx];q++){
     	var vOffset=vGDIdx+1+25*(q-1);
     	vRSPs[q]=0;
     	for(j=vLBShip;j<=vUBShip;j++){
       var vShip=vOffset+j-9;
     	 if(espiData[vShip].length>0 && parseInt(espiData[vShip].replace(/,/g,""),10)>0) {
     	  var vShipCount=parseInt(espiData[vShip].replace(/,/g,""),10);
     	  vDSPs+=(vShipCount*DSPAmount[j]);
     	  vRSPs[q]+=(vShipCount*RSPAmount[j]);
        vTotRSP+=(vShipCount*RSPAmount[j]); 
       }
     	}
     }
    }

 if(vEncounter) { vDSPs=vDSPs/2; }
 var vDSP=addCommas((Math.ceil(vDSPs/100)/10).toString());
 var vFormattedTotalRSP='';
 var vFormattedTotalRSP2=addCommas((Math.ceil(vTotRSP/100)/10).toString());
 if(vTotRSP<1000) {
  vFormattedTotalRSP=vTotRSP.toString();
 } else {
  if(vTotRSP<1000000) {
   vFormattedTotalRSP=(Math.ceil(vTotRSP/100)/10)+'k';
  } else {
   if(vTotRSP<1000000000) {
    vFormattedTotalRSP=(Math.ceil(vTotRSP/100000)/10)+'m';
   } else {
    if(vTotRSP<1000000000000) {
     vFormattedTotalRSP=(Math.ceil(vTotRSP/100000000)/10)+'b';
    } else {
     vFormattedTotalRSP=(Math.ceil(vTotRSP/100000000000)/10)+'t';
    }
   }
  }
 }

 
 var vNukes, vArmor;
 var vArmor=(espiData[vTechIdx].length==0) ? 14 : parseInt(espiData[vArmorIdx].replace(/,/g, ""),10);
 var vABMs = parseInt(espiData[vABMIdx].replace(/,/g, ''),10);
 if (espiData[vABMIdx].length == 0) { vABMs = 0; }
 var vNukesNeeded = 0;
 var nukeamount = GetNukeAmounts();
 for (j=vLBDef;j<=vUBDef;j++) {
  if (espiData[j].length > 0 && parseFloat(espiData[j].replace(/,/g, "")) > 0) {
   vNukesNeeded += parseFloat(espiData[j].replace(/,/g, "") * nukeamount[j] * (1 + 0.1 * vArmor) / (120 * (1+0.1 * vWeaponTech)));
  }
 }
 if (vNukesNeeded == 0) { vNukes = 0; } else { vNukes = Math.ceil(vNukesNeeded + vABMs); }
 var vRegOre = parseFloat(espiData[vOreResIdx].replace(/,/g, ""));
 var vRegCry = 5 / 3 * parseFloat(espiData[vCryResIdx].replace(/,/g, ""));
 var vRegHyd = 2.5 * parseFloat(espiData[vHydResIdx].replace(/,/g, "")); 
 var vMoney = parseInt(vRegOre,10) + parseInt(vRegCry,10) + parseInt(vRegHyd,10);
 var vNukesPR=(vNukes!=null) ? vNukes : 0;
 var vProfit = Math.ceil((vMoney - vNukesPR * 125000 / 3) / 1000);
 
 var vProfitStr=addCommas(vProfit.toString());
 var vTotal=parseInt(espiData[vOreResIdx].replace(/,/g,""),10)+parseInt(espiData[vCryResIdx].replace(/,/g,""),10)+parseInt(espiData[vHydResIdx].replace(/,/g,""),10);
 var vTotalPlunder=parseInt(vTotal/2,10);
 var vTotalToPlunder=addCommas(vTotalPlunder.toString());

 var vHermesNeeded=Math.ceil(vTotalPlunder/5);
 var vArtemisNeeded=Math.ceil(vTotalPlunder/50);
 var vAtlasNeeded=Math.ceil(vTotalPlunder/5000);
 var vApolloNeeded=Math.ceil(vTotalPlunder/100);
 var vZagreusNeeded=Math.ceil(vTotalPlunder/5000);
 var vCharonNeeded=Math.ceil(vTotalPlunder/100);
 var vHerculesNeeded=Math.ceil(vTotalPlunder/25000);
 var vDionysusNeeded=Math.ceil(vTotalPlunder/20000);
 var vCuretesNeeded=Math.ceil(vTotalPlunder/250);
 var vPoseidonNeeded=Math.ceil(vTotalPlunder/800);
 var vCarmanorNeeded=Math.ceil(vTotalPlunder/125000);
 var vPallasNeeded=Math.ceil(vTotalPlunder/250);
 var vGaiaNeeded=Math.ceil(vTotalPlunder/7500);
 var vAthenaNeeded=Math.ceil(vTotalPlunder/1500);
 var vTritonNeeded=Math.ceil(vTotalPlunder/300);
 var vAresNeeded=Math.ceil(vTotalPlunder/500);
 var vHadesNeeded=Math.ceil(vTotalPlunder/750);
 var vPrometheusNeeded=Math.ceil(vTotalPlunder/2000);
 var vThanatosNeeded=Math.ceil(vTotalPlunder/200000);
 var vZeusNeeded=Math.ceil(vTotalPlunder/1000000);
 var vHephNeeded=Math.ceil(vTotalPlunder/1000000000);
 var vPlunderTitle='';
 if(vTourney || vNova || vuni3) {
	 vPlunderTitle='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+String.fromCharCode(10);
  vPlunderTitle+=' Zag:'+vZagreusNeeded+' Charon:'+vCharonNeeded+' Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+String.fromCharCode(10);
  vPlunderTitle+=' Curetes:'+vCuretesNeeded+' Posi:'+vPoseidonNeeded+' Carm:'+vCarmanorNeeded+' Pallas:'+vPallasNeeded+String.fromCharCode(10);
	 vPlunderTitle+=' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+' Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+String.fromCharCode(10);
  vPlunderTitle+=' Prom:'+vPrometheusNeeded+' Thanatos:'+vThanatosNeeded+' Zeus:'+vZeusNeeded+' Heph:'+vHephNeeded;
 } else {
  if(vStardrift) {
 	 vPlunderTitle='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Charon:'+vCharonNeeded+' Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+' Posi:'+vPoseidonNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+' Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+' Titan:'+vHephNeeded;
  } else {
   vPlunderTitle='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Zag:'+vZagreusNeeded+' Charon:'+vCharonNeeded+' Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Posi:'+vPoseidonNeeded+' Carm:'+vCarmanorNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+' Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+String.fromCharCode(10);
   vPlunderTitle+=' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+' Heph:'+vHephNeeded;
  }
 }

 vText+='* ore: '+espiData[vOreResIdx]+' &nbsp;<span style="color: grey;">'+vOreData+'</span><br />';
 vText+='* crystal: '+espiData[vCryResIdx]+' &nbsp;<span style="color: grey;">'+vCryData+'</span><br />';
 vText+='* hydrogen: '+espiData[vHydResIdx]+' &nbsp;<span style="color: grey;">'+vHydData+'</span><br />';
 if(!vStardrift) {
	 if(espiData[vTargetTypeIdx]=='Planet') {
   vText+='* resource den storage: ';
	  if(espiData[vDenIdx] > 0) {
		  vText+=addCommas(resourceDenStorage(espiData[vDenIdx]).toString())+'<br />';
	  } else {
		  vText+='0<br />';
   }
  }
 }
 vText+='================================<br />';
 vText+='<span title="'+vPlunderTitle+'">'
 vText+='Total plunder: '+vTotalToPlunder+' (';
 if(!vStardrift)
	 vText+=Math.ceil(vTotal/250000)+' carm / ';
 vText+=Math.ceil(vTotal/50000)+' herc / '+Math.ceil(vTotal/10000)+' atlas)<br />';
 vText+='</span>';
 
 var vEncounterWithoutDSP=(vEncounter && !vNPCHasDSP);
 if(!vEncounterWithoutDSP){
  if(vNova || vTourney) {
   vText+='Max DSP: '+vDSP;
  } else {
   vText+='DSP: '+vDSP;
  }
 }
 
 var vEncounterWithoutDF=(vEncounter && !vNPCHasDFs);
 if(!vEncounterWithoutDF){
  vText+=' ('+vDios+' Dios'+(vStardrift?'':' / '+vZags+' Zags')+')';
  vText+='<br />';
 }

 if (espiData[vDefenderNameIdx].length==0) {
  vText+='<br />* Player name not retrieved.<br />';
  vText+='* Ship data not retrieved.<br />';
 } 
 else {
  vText+='<br /><span title="Total Fleet RSP: '+vFormattedTotalRSP2+'">';
  vText+='<span title="'+espiData[vDefenderNameIdx]+"'S Fleet RSP:"+addCommas((Math.ceil(vRSPs[0]/100)/10).toString())+'">'+espiData[vDefenderNameIdx]+"'S SHIPS:</span><br />";
  vText+=ifShip(espiData[10],'Shadow Class Probe');
  vText+=ifShip(espiData[11],'Genesis Class Solar Satellite');
  vText+=ifShip(espiData[12],'Hermes Class Probe');
  vText+=ifShip(espiData[13],'Helios Class Solar Satellite');
  vText+=ifShip(espiData[14],'Artemis Class Fighter');
  vText+=ifShip(espiData[15],'Atlas Class Cargo');
  vText+=ifShip(espiData[16],'Apollo Class Fighter');
  vText+=ifShip(espiData[17],'Erebus Class Fighter');
  vText+=ifShip(espiData[18],'Zagreus Class Recycler');
  vText+=ifShip(espiData[19],'Charon Class Transport');
  vText+=ifShip(espiData[20],'Hercules Class Cargo');
  vText+=ifShip(espiData[21],'Empusa Class Fighter');
  vText+=ifShip(espiData[22],'Dionysus Class Recycler');
  vText+=ifShip(espiData[23],'Curetes Class Cruiser');
  vText+=ifShip(espiData[24],'Poseidon Class Cruiser');
  vText+=ifShip(espiData[25],'Carmanor Class Cargo');
  vText+=ifShip(espiData[26],'Pallas Class Bomber');
  vText+=ifShip(espiData[27],'Moros Class Battleship');
  vText+=ifShip(espiData[28],'Gaia Class Colony Ship');
  vText+=ifShip(espiData[29],'Athena Class Battleship');
  vText+=ifShip(espiData[30],'Triton Class Recycler');
  vText+=ifShip(espiData[31],'Ares Class Bomber');
  vText+=ifShip(espiData[32],'Hades Class Battleship');
  vText+=ifShip(espiData[33],'Prometheus Class Destroyer');
  vText+=ifShip(espiData[34],'Thanatos Class Destroyer');
  vText+=ifShip(espiData[35],'Zeus Class');
  vText+=ifShip(espiData[36],'Hephaestus Class Attack Platform');
  if(espiData[vGDIdx]>1){
   for(q=1;q<espiData[vGDIdx];q++){
    var vOffset=(vGDIdx+1)+((vUBShip-vLBShip)+2)*(q-1);
    vText+='<br />';
    vText+='<span title="'+espiData[vOffset]+"'S Fleet RSP:"+addCommas((Math.ceil(vRSPs[q]/100)/10).toString())+'">'+espiData[vOffset]+"'S SHIPS:</span><br />";
    vText+=ifShip(espiData[vOffset+1],'Shadow Class Probe');
    vText+=ifShip(espiData[vOffset+2],'Genesis Class Solar Satellite');
    vText+=ifShip(espiData[vOffset+3],'Hermes Class Probe');
    vText+=ifShip(espiData[vOffset+4],'Helios Class Solar Satellite');
    vText+=ifShip(espiData[vOffset+5],'Artemis Class Fighter');
    vText+=ifShip(espiData[vOffset+6],'Atlas Class Cargo');
    vText+=ifShip(espiData[vOffset+7],'Apollo Class Fighter');
    vText+=ifShip(espiData[vOffset+8],'Erebus Class Fighter');
    vText+=ifShip(espiData[vOffset+9],'Zagreus Class Recycler');
    vText+=ifShip(espiData[vOffset+10],'Charon Class Transport');
    vText+=ifShip(espiData[vOffset+11],'Hercules Class Cargo');
    vText+=ifShip(espiData[vOffset+12],'Empusa Class Fighter');
    vText+=ifShip(espiData[vOffset+13],'Dionysus Class Recycler');
    vText+=ifShip(espiData[vOffset+14],'Curetes Class Cruiser');
    vText+=ifShip(espiData[vOffset+15],'Poseidon Class Cruiser');
    vText+=ifShip(espiData[vOffset+16],'Carmanor Class Cargo');
    vText+=ifShip(espiData[vOffset+17],'Pallas Class Bomber');
    vText+=ifShip(espiData[vOffset+18],'Moros Class Battleship');
    vText+=ifShip(espiData[vOffset+19],'Gaia Class Colony Ship');
    vText+=ifShip(espiData[vOffset+20],'Athena Class Battleship');
    vText+=ifShip(espiData[vOffset+21],'Triton Class Recycler');
    vText+=ifShip(espiData[vOffset+22],'Ares Class Bomber');
    vText+=ifShip(espiData[vOffset+23],'Hades Class Battleship');
    vText+=ifShip(espiData[vOffset+24],'Prometheus Class Destroyer');
    vText+=ifShip(espiData[vOffset+25],'Thanatos Class Destroyer');
    vText+=ifShip(espiData[vOffset+26],'Zeus Class');
    vText+=ifShip(espiData[vOffset+27],'Hephaestus Class Attack Platform');
   }
  }
  vText+='</span>';
 }
 vText+='<br />DEFENSES:';
 if (espiData[vDEFIdx].length==0) { 
  vText+='<br />* Defense data not retrieved.<br />'; }
 else {
  if(espiData[vTargetTypeIdx]!='Encounter'){
   vText+='&nbsp<span title="Profit: '+vProfitStr+'k">('+vNukes+' nukes needed)</span>';
  }
  vText+='<br />';
  vText+=ifShip(espiData[37],'Missile Battery');
  vText+=ifShip(espiData[38],'Laser Cannon');
  vText+=ifShip(espiData[39],'Space Mine');
  vText+=ifShip(espiData[40],'Pulse Cannon');
  vText+=ifShip(espiData[41],'Particle Cannon');
  vText+=ifShip(espiData[vABMIdx],'Anti-Ballistic Missile');
  vText+=ifShip(espiData[43],'Decoy');
  vText+=ifShip(espiData[vIPBMIdx],'Interplanetary Ballistic Missile');
  vText+=ifShip(espiData[45],'Gauss Cannon');
  vText+=ifShip(espiData[46],'Large Decoy');
  vText+=ifShip(espiData[47],'Plasma Cannon');
 }

 vText+='<br />TECHS:';
 if (espiData[vTechIdx].length==0) { 
  vText+='<br />* Tech data not retrieved.<br />'; }
 else {
  if(vEncounter){
   vText+='<br />';
  } else {
   vText+=' (Espi '+espiData[vEspiIdx]+', AI '+espiData[vAIIdx]+', Jet '+espiData[vJetIdx]+', Pulse '+espiData[vPulseIdx]+', Warp '+espiData[vWarpIdx]+')<br />'; 
  }
  vText+='* Armor Tech: '+espiData[vArmorIdx]+'<br />* Weapons Tech: '+espiData[vWeaponIdx]+'<br />* Shield Tech: '+espiData[vShieldIdx]+'<br />';
 }
 
 if(espiData[vTargetTypeIdx]=='Moon'){
  var vMoonDest ='Chance of fleet destruction: '+ (Math.sqrt(new Number(espiData[vDiameterIdx])) / 2).toFixed(2) + '%'+String.fromCharCode(10);
   vMoonDest +='# Zeus for 25% chance of moon destruction: '+ getZeusForMoonDestruction(new Number(espiData[vDiameterIdx]),25) +String.fromCharCode(10);
   vMoonDest +='# Zeus for 50% chance of moon destruction: '+ getZeusForMoonDestruction(new Number(espiData[vDiameterIdx]),50) +String.fromCharCode(10);
   vMoonDest +='# Zeus for 75% chance of moon destruction: '+ getZeusForMoonDestruction(new Number(espiData[vDiameterIdx]),75) +String.fromCharCode(10);
   vMoonDest +='# Zeus for 100% chance of moon destruction: '+ getZeusForMoonDestruction(new Number(espiData[vDiameterIdx]),100);
  vText+='<br />MOON BUILDINGS: ';
  if(espiData[vDiameterIdx].length>0) { vText+='<span title="'+vMoonDest+'">(Diameter: '+espiData[vDiameterIdx]+')</span>'; }
  vText+='<br />';
  if (espiData[vBuildingIdx].length==0) { 
   vText+='* Building data not retrieved.<br />'; }
  else {
   vText+='* Oracle: '+espiData[vOracleIdx]+'<br />';
   vText+='* Warp Gate: '+espiData[vWarpGateIdx]+'<br />';
   vText+='* Lunar Base: '+espiData[vLunarBaseIdx]+'<br />';
   if(espiData[vLunarDockIdx].length>0) { vText+='* Lunar Dock: '+espiData[vLunarDockIdx]+'<br />'; }
  }
 }
 return vText;}
 
function AddUpdateLink(UpdateLink, UpdateLinkText) {
 var vUpDivs=document.getElementsByTagName('DIV');
 for (i=0;i<vUpDivs.length;i++) {
  if (vUpDivs[i].getAttribute('class')=='footer') {
   vUpDivs[i].innerHTML=RTrim(vUpDivs[i].innerHTML)+'&nbsp;|&nbsp;<a href="'+UpdateLink+'">'+UpdateLinkText+'</a>'
   i=vUpDivs.length; } } }

function RTrim( value ) { return value.replace(/((\s*\S+)*)\s*/, "$1"); }

function ReturnSystemLink(PlanetInBrackets,CurrentPlanet) {
 var PlanetMatch=PlanetInBrackets.match(/\[(\d{1,2}):(\d{1,3}):\d{1,2}[me]?\]/im);
 var PlanetLink=''; 
 var vOnClick="var f=document.createElement('form');f.style.display='none';this.parentNode.appendChild(f);f.method='POST';f.action=this.href;f.submit();return false;";
 if (PlanetMatch != null) {    PlanetLink='<a href="/galaxy/show?current_planet='+CurrentPlanet+'&amp;galaxy='+PlanetMatch[1]+'&amp;solar_system='+PlanetMatch[2]+'" onclick="'+vOnClick+'">'+PlanetInBrackets+'</a>';   }
 return PlanetLink;}
 
function GetDebrisAmounts() {
 var DebrisAmts=new Array();
 DebrisAmts[10]=0; //shadow
 DebrisAmts[11]=0; //genesis
 DebrisAmts[12]=300; //hermes
 DebrisAmts[13]=600; //helios
 DebrisAmts[14]=1200; //arty
 DebrisAmts[15]=1200; //atlas
 DebrisAmts[16]=2550; //apollo
 DebrisAmts[17]=1875; //erebus
 DebrisAmts[18]=2400; //zagreus
 DebrisAmts[19]=2400; //charon
 DebrisAmts[20]=3600; //herc
 DebrisAmts[21]=150; //empusa
 DebrisAmts[22]=4800; //dion
 DebrisAmts[23]=1200; //curetes
 DebrisAmts[24]=8100; //pos
 DebrisAmts[25]=10800; //carmanor
 DebrisAmts[26]=11250; //pallas
 DebrisAmts[27]=13500; //moros
 DebrisAmts[28]=9000; //gaia
 DebrisAmts[29]=18000; //athena
 DebrisAmts[30]=15000; //triton
 DebrisAmts[31]=22500; //ares
 DebrisAmts[32]=21000; //hades
 DebrisAmts[33]=33000; //prom
 DebrisAmts[34]=765000; //thanatos
 DebrisAmts[35]=2700000; //zeus
 DebrisAmts[36]=12000000; //heph
 return DebrisAmts;}

 function GetConquestDebrisAmounts() {
 var DebrisAmts=new Array();
 DebrisAmts[10]=0; //shadow
 DebrisAmts[11]=0; //genesis
 DebrisAmts[12]=500; //hermes
 DebrisAmts[13]=1000; //helios
 DebrisAmts[14]=2000; //arty
 DebrisAmts[15]=2000; //atlas
 DebrisAmts[16]=4250; //apollo
 DebrisAmts[17]=3125; //erebus
 DebrisAmts[18]=4000; //zagreus
 DebrisAmts[19]=4000; //charon
 DebrisAmts[20]=6000; //herc
 DebrisAmts[21]=250; //empusa
 DebrisAmts[22]=8000; //dion
 DebrisAmts[23]=2000; //curetes
 DebrisAmts[24]=13500; //pos
 DebrisAmts[25]=18000; //carmanor
 DebrisAmts[26]=18750; //pallas
 DebrisAmts[27]=22500; //moros
 DebrisAmts[28]=15000; //gaia
 DebrisAmts[29]=30000; //athena
 DebrisAmts[30]=25000; //triton
 DebrisAmts[31]=37500; //ares
 DebrisAmts[32]=35000; //hades
 DebrisAmts[33]=55000; //prom
 DebrisAmts[34]=1275000; //thanatos
 DebrisAmts[35]=4500000; //zeus
 DebrisAmts[36]=20000000; //heph
 DebrisAmts[37]=400; //missile
 DebrisAmts[38]=400; //laser
 DebrisAmts[39]=100; //space mine
 DebrisAmts[40]=1600; //pulse
 DebrisAmts[41]=1600; //particle
 DebrisAmts[42]=1600; //abm
 DebrisAmts[43]=4000; //decoy
 DebrisAmts[44]=3000; //nuke
 DebrisAmts[45]=7000; //gauss
 DebrisAmts[46]=20000; //l.decoy
 DebrisAmts[47]=20000; //plasma
 return DebrisAmts;}

function GetDSPAmounts() {
 var DSPAmts=new Array();
 DSPAmts[10]=0; //shadow
 DSPAmts[11]=0; //genesis
 DSPAmts[12]=1000; //hermes
 DSPAmts[13]=2000; //helios
 DSPAmts[14]=4000; //arty
 DSPAmts[15]=4000; //atlas
 DSPAmts[16]=8000; //apollo
 DSPAmts[17]=6000; //erebus
 DSPAmts[18]=9000; //zagreus
 DSPAmts[19]=9000; //charon
 DSPAmts[20]=12000; //herc
 DSPAmts[21]=8000; //empusa
 DSPAmts[22]=18000; //dion
 DSPAmts[23]=14000; //curetes
 DSPAmts[24]=29000; //pos
 DSPAmts[25]=36000; //carmanor
 DSPAmts[26]=45000; //pallas
 DSPAmts[27]=48000; //moros
 DSPAmts[28]=40000; //gaia
 DSPAmts[29]=60000; //athena
 DSPAmts[30]=55000; //triton
 DSPAmts[31]=90000; //ares
 DSPAmts[32]=85000; //hades
 DSPAmts[33]=125000; //prom
 DSPAmts[34]=2650000; //thanatos
 DSPAmts[35]=10000000; //zeus
 DSPAmts[36]=50000000; //heph
 return DSPAmts;}

function GetRSPAmounts() {
 var RSPAmts=new Array();
 RSPAmts[10]=0; //shadow
 RSPAmts[11]=0; //genesis
 RSPAmts[12]=250; //hermes
 RSPAmts[13]=0; //helios
 RSPAmts[14]=4000; //arty
 RSPAmts[15]=4000; //atlas
 RSPAmts[16]=8000; //apollo
 RSPAmts[17]=6000; //erebus
 RSPAmts[18]=9000; //zagreus
 RSPAmts[19]=9000; //charon
 RSPAmts[20]=12000; //herc
 RSPAmts[21]=8000; //empusa
 RSPAmts[22]=18000; //dion
 RSPAmts[23]=14000; //curetes
 RSPAmts[24]=29000; //pos
 RSPAmts[25]=36000; //carmanor
 RSPAmts[26]=45000; //pallas
 RSPAmts[27]=48000; //moros
 RSPAmts[28]=40000; //gaia
 RSPAmts[29]=60000; //athena
 RSPAmts[30]=55000; //triton
 RSPAmts[31]=90000; //ares
 RSPAmts[32]=85000; //hades
 RSPAmts[33]=125000; //prom
 RSPAmts[34]=2650000; //thanatos
 RSPAmts[35]=10000000; //zeus
 RSPAmts[36]=50000000; //heph
 return RSPAmts;}


function GetNukeAmounts() {
var NukeAmts=new Array();
NukeAmts[37]=2; //missile
NukeAmts[38]=2; //laser
NukeAmts[39]=0.5; //space mine
NukeAmts[40]=8; //pulse
NukeAmts[41]=8; //particle
NukeAmts[vABMIdx]=0; //abms
NukeAmts[43]=20; //decoy
NukeAmts[vIPBMIdx]=15; //nukes
NukeAmts[45]=35; //gauss
NukeAmts[46]=100; //large decoy
NukeAmts[47]=100; //plasma
return NukeAmts;}
function ifShipRSP(vShipInfo,vWhatShip,vShipRSP){
	 var vReturn='';
	 if(vShipInfo.length>0 && parseInt(vShipInfo.replace(/,/g,""),10)>0) { vReturn='* '+vWhatShip+': '+vShipInfo+' <span style="color: grey;">('+vShipRSP+' RSP)</span><br />'; }
	 return(vReturn);
	}
function ifShip(vShipInfo,vWhatShip){
	 var vReturn='';
	 if(vShipInfo.length>0 && parseInt(vShipInfo.replace(/,/g,""),10)>0) { vReturn='* '+vWhatShip+': '+vShipInfo+'<br />'; }
	 return(vReturn);
	}
function GetClassItem(vSource,vTagname,vClass) {
 var vReturn=null;
 if(vSource==null) { console.log("vSource is null: "+vTagname+"\t"+vClass); } else {
  var vElements=vSource.getElementsByTagName(vTagname);
  for (cnt=0;cnt<vElements.length;cnt++) {
   if (vElements[cnt].getAttribute('class')==vClass) { vReturn=vElements[cnt]; break; } }
 }
 return vReturn;}
function GetClassItemRX(vSource,vTagname,vClass) {
 if(vSource==null) { 
  console.log('vSource is null. RX');
  console.log('Tag: '+vTagname);
  console.log('Class: '+vClass);
 }
 var vElements=vSource.getElementsByTagName(vTagname);
 var vReturn=null;
 for (cnt=0;cnt<vElements.length;cnt++) {
  if (vClass.test(vElements[cnt].getAttribute('class'))) { vReturn=vElements[cnt]; break; } }
 return vReturn;}

 function resourceDenStorage(level) {
	var storage = 0;
	if(level > 0)
		storage += 30000;
	if(level > 1)
		storage += (level - 1) * 7500;
	return storage;
}
function getZeusForMoonDestruction(size,percentage) {
	return Math.ceil((percentage / (100 - Math.sqrt(size))) * (percentage / (100 - Math.sqrt(size))));
}
function fAddEspiReportOptionsToOptionScreen() {
 //options: ships rsp/count/hide
//         defs  rsp/count/hide/"Def" when >1
//         dios  show/hide
//         res   total/convertedtotal
//         npcs: show o/c/h breakdown instead of res/ships/defs
}
function fStoreTechs() {
 var vDetails,vTechName,vTechLevel,i;
 if(document.getElementById('locations_table')!=null) {
  var vTechRows=document.getElementById('locations_table').getElementsByTagName('div');
  for (i=0;i<vTechRows.length;i++) {
   if(/^row location/i.test(vTechRows[i].getAttribute('class'))){
    vDetails=GetClassItem(vTechRows[i],'div','data details');
    vTechName=GetClassItem(vDetails,'div','name').innerHTML.replace(/^\s+|\s+$/g,'');
    if(GetClassItem(vDetails,'span','amount')==null){
     vTechLevel=0;
    } else {
     vTechLevel=GetClassItem(vDetails,'span','amount').innerHTML.replace(/^\s+|\s+$/g,'');
    }
    if(/((Jet|Pulse|Warp) Drive)|((Weapons|Armor|Shield) Tech)/i.test(vTechName)) { localStorage.setItem('statscript.research.'+vTechName,vTechLevel); }
   }
  }
 }
}