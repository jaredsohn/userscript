// ==UserScript==
// @name           StatScript All Unis
// @description    adds a new menu to the game containing an overview of your space empire.
// @version        1.6.0.5
// @include        http://*starfleet*.com/*
// @include        http://*stardrift*.com/*
// @run-at         document-end
// ==/UserScript==
//1.4.5.0 -- fix research grab (class="location item" -> class="location tech item (alt)" 
//1.4.5.1 -- fix research fix :P added ? after (alt)
//1.4.5.2 -- fix leadership grab (tr class changed)
//1.4.5.3 -- fix effective lab level output (tech level stored too much data)
//1.4.5.4 -- attempt at fix disappearing building levels (level div now has amount)
//1.4.5.5 -- fix reference to resources on buildings page
//1.4.5.6 -- update references to table elements on multiple pages (now divs)
//1.4.5.7 -- hopeful fix of disappearing building levels. damn you outdated code!
//1.4.6   -- actually fixed disappearing building levels.
//1.4.6.1 -- changing version number to force update
//1.4.6.2 -- i didnt realize people used that "GO" button on the galaxy page. now you can use that and immediately go to stat page and see your data
//1.4.7   -- adapting to add Stardrift Empires
//1.4.7.1 -- fixing research for stardrift
//1.4.7.2 -- fixing hydro mine for statscript? (now a 'refinery' rather than 'synthesizer')
//1.4.7.3 -- added support for new icon_ img alts in shipyard/defense
//1.4.7.4 -- debugging shipyard fix in sde
//1.4.7.5 -- argh stupid 2am lack of foresight
//1.4.7.6 -- adding post method to moving-heph link
//1.4.8   -- making html table cell borders thinner
//1.4.8.1 -- fixing warehouse capacity area in sde 
//1.4.8.2 -- fixed "ARC Net" abbreviated name for SDE
//1.4.8.3 -- fixed same as 1.4.8.2 but on effective level table
//1.4.8.4 -- patched userscript to work with new bfg code
//1.4.8.5 -- updated shipyard timer to play nice with genesis sat and shadow probe 
//1.4.8.6 -- added "needs update" mechanism
//1.4.8.7 -- removed "needs update" mechanism due to display weirdness
//1.4.8.8 -- updating for new UI screen
//1.4.8.9 -- patching for lack of activate_planet on colony coordinate links
//1.4.9   -- fixed each ship's build times to always show 3 millisecond digits
//1.5     -- updated for nova
//1.5.1   -- updated ship building speeds for tourney
//1.5.2   -- new interface
//1.5.3   -- building page bug fix
//1.5.4   -- fixed sub_nav spacing in sde
//1.6.0   -- update for conquest
//1.6.0.1 -- fixed shipyard timer on moon
//1.6.0.2 -- actually fixed shipyard timer on moon
//1.6.0.5 -- update for Uni3

var vPrefix='statscript';
var vStardrift=/stardriftempires/i.test(document.location.href);

if(/\.com\/roaming_planet_move\/moving/.test(document.location.href)) { fFixHephCoordsLink(); }

var vCurrentPlanet=fGetCurrentPlanet();
fAddStatsLink();
fUpdatePlanetInfo();

if(/\.com\/buildings\/home/.test(document.location.href)) { fGetBuildingData(); }

if(/\.com\/leaderboard/.test(document.location.href)) { fGetLeaderboardData(); }

if(/\.com\/buildings\/research/.test(document.location.href)) { fGetResearchData(); }

if(/\.com\/buildings\/(shipyard|fortifications)/.test(document.location.href)) { fAddShipyardCompletionTimer(); }

if(/\.com\/(\?|$)/.test(document.location.href)) { fGetMaxTemp(); }

if(/\.com\/profile\/overview/.test(document.location.href)) { fProcessAllPlanets(); }


////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// Functions /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


//buildings functions
function fGetBuildingData() {
 var vMoonCheck=GetClassItem(document.getElementById('user_planets'),'div','moon selected');
 if(vMoonCheck==null) {
  fSaveProduction();
  fGetBuildingLevels();
 } else {
  var vMoonID=vMoonCheck.getElementsByTagName('a')[0].getAttribute('href').match(/activate_planet=(\d+)/)[1];
  fGetMoonBuildingLevels(vMoonID); }
 document.getElementById('sticky_notices').innerHTML+='&nbsp;Production Stored.';}
function fSaveProduction() {
 //get hourly production
 var vProduction=document.getElementById('resource_production');
 var vOreProd=GetClassItem(GetClassItem(vProduction,'div','ore block'),'span','amount right').innerHTML.replace(/,/g,'');
 var vCryProd=GetClassItem(GetClassItem(vProduction,'div','crystal block'),'span','amount right').innerHTML.replace(/,/g,'');
 var vHydProd=GetClassItem(GetClassItem(vProduction,'div','hydrogen block'),'span','amount right').innerHTML.replace(/,/g,'');
// var vResAmts=GetClassItem(document.getElementById('user_stats'),'div','resources_table');
// var vOreProd=parseFloat(vResAmts.innerHTML.match(/ore_rate = (\d+\.\d+)/mi)[1].replace(/,/g,''))*3600;
// var vCryProd=parseFloat(vResAmts.innerHTML.match(/crystal_rate = (\d+\.\d+)/mi)[1].replace(/,/g,''))*3600;
// var vHydProd=parseFloat(vResAmts.innerHTML.match(/hydrogen_rate = (\d+\.\d+)/mi)[1].replace(/,/g,''))*3600; 
 localStorage.setItem(vPrefix+'.planet.'+vCurrentPlanet+'.oprod',vOreProd);
 localStorage.setItem(vPrefix+'.planet.'+vCurrentPlanet+'.cprod',vCryProd);
 localStorage.setItem(vPrefix+'.planet.'+vCurrentPlanet+'.hprod',vHydProd);
 //add daily production as hover popup in hourly box 
 var vDaily='Daily Production:'+String.fromCharCode(10);
 vDaily+='Ore: '+addCommas((parseInt(vOreProd)*24).toString())+String.fromCharCode(10);
 vDaily+='Crystal: '+addCommas((parseInt(vCryProd)*24).toString())+String.fromCharCode(10);
 vDaily+='Hydrogen: '+addCommas((parseInt(vHydProd)*24).toString());
 vProduction.setAttribute('title',vDaily);
}
function fGetBuildingLevels() {
 var vPlanetString=vPrefix+'.planet.'+vCurrentPlanet;
 //get field counts
 var vFieldBlock=GetClassItem(document.getElementById('fields'),'div','section_content');
 localStorage.setItem(vPlanetString+'.fields',vFieldBlock.getElementsByTagName('span')[1].innerHTML);
 localStorage.setItem(vPlanetString+'.fieldsused',vFieldBlock.getElementsByTagName('span')[0].innerHTML);
 //get energy free/needed
 var vEnergyNet=0; 
 var vEnergyDiv=GetClassItem(document.getElementById('resource_production'),'div','energy_free block');
 if(vEnergyDiv==null) { vEnergyDiv=GetClassItem(document.getElementById('resource_production'),'div','energy_needed block'); }
 if(vEnergyDiv!=null) {
  var vEnergyText=vEnergyDiv.innerHTML.replace(/^\s+|\s+$|\<[^>]*?\>/g, "");
  vEnergyNet=(/Energy Needed/.test(vEnergyText)) ? '-' : '';
  vEnergyNet+=vEnergyText.match(/[\d,]+/m)[0]; }
 localStorage.setItem(vPlanetString+'.energy',vEnergyNet);
 //get building levels
 var vTRs=document.getElementById('locations_table').getElementsByTagName('div');
 var vLevel, vCapacity, vHoursToFill;
 var vCurrentToCapacity, vHoursToFillCurrent;
 
 var vResAmts=document.getElementById('resources_table');
 var vOreAmt=parseFloat(GetClassItem(GetClassItemRX(vResAmts,'div',/^row ore/i),'div','amount').innerHTML.replace(/,/g,''));
 var vCryAmt=parseFloat(GetClassItem(GetClassItemRX(vResAmts,'div',/^row crystal/i),'div','amount').innerHTML.replace(/,/g,''));
 var vHydAmt=parseFloat(GetClassItem(GetClassItemRX(vResAmts,'div',/^row hydrogen/i),'div','amount').innerHTML.replace(/,/g,''));

 for (x=0;x<vTRs.length;x++) {
  if (/^row location/i.test(vTRs[x].getAttribute('class'))) {
   vLevel='0';
   if (vTRs[x].innerHTML.match(/Ore Mine/im)!=null)             {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.omine',vLevel); }
   if (vTRs[x].innerHTML.match(/Crystal Mine/im)!=null)         {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.cmine',vLevel); }
   if (vTRs[x].innerHTML.match(/Hydrogen (Synthesizer|Refinery)/im)!=null) { 
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.hmine',vLevel); }
   if (vTRs[x].innerHTML.match(/Solar Array/im)!=null)          {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.sa',vLevel); }
   if (vTRs[x].innerHTML.match(/Nuclear Power Plant/im)!=null)  {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.npp',vLevel); }
   if (vTRs[x].innerHTML.match(/Shipyard/im)!=null)             {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.sy',vLevel); }
   if (vTRs[x].innerHTML.match(/Capitol/im)!=null)              {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.cap',vLevel); }
   if (vTRs[x].innerHTML.match(/Research Lab/im)!=null)         {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.lab',vLevel); }
   if (vTRs[x].innerHTML.match(/Missile Silo/im)!=null)         {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.silo',vLevel); }
   if (vTRs[x].innerHTML.match(/Factory/im)!=null)              {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.factory',vLevel); }
   if (vTRs[x].innerHTML.match(/Ore Warehouse/im)!=null)        {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    vCapacity=(50000*(Math.ceil(Math.pow(1.6,parseInt(vLevel)))+1));
    vHoursToFill=vCapacity/(parseFloat(localStorage.getItem(vPlanetString+'.oprod')));
    vHoursToFillCurrent=0;
    vCurrentToCapacity=vCapacity-vOreAmt;
    if(vCurrentToCapacity>0) { vHoursToFillCurrent=vCurrentToCapacity/(parseFloat(localStorage.getItem(vPlanetString+'.oprod'))); }
    GetClassItem(vTRs[x],'div','stats').getElementsByClassName('table')[0].innerHTML+='<br />Empty to full: '+fHoursToTime(vHoursToFill);
    GetClassItem(vTRs[x],'div','stats').getElementsByClassName('table')[0].innerHTML+='<br />Page load to full: '+fHoursToTime(vHoursToFillCurrent);
    if(vStardrift){GetClassItem(vTRs[x],'div','row time cost').style.height='32px';}
    localStorage.setItem(vPlanetString+'.orewh',vLevel); }
   if (vTRs[x].innerHTML.match(/Crystal Warehouse/im)!=null)    {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    vCapacity=(50000*(Math.ceil(Math.pow(1.6,parseInt(vLevel)))+1));
    vHoursToFill=vCapacity/(parseFloat(localStorage.getItem(vPlanetString+'.cprod')));
    vHoursToFillCurrent=0;
    vCurrentToCapacity=vCapacity-vCryAmt;
    if(vCurrentToCapacity>0) { vHoursToFillCurrent=vCurrentToCapacity/(parseFloat(localStorage.getItem(vPlanetString+'.cprod'))); }
    GetClassItem(vTRs[x],'div','stats').getElementsByClassName('table')[0].innerHTML+='<br />Empty to full: '+fHoursToTime(vHoursToFill);
    GetClassItem(vTRs[x],'div','stats').getElementsByClassName('table')[0].innerHTML+='<br />Page load to full: '+fHoursToTime(vHoursToFillCurrent);
    if(vStardrift){GetClassItem(vTRs[x],'div','row time cost').style.height='32px';}
    localStorage.setItem(vPlanetString+'.crywh',vLevel); }
   if (vTRs[x].innerHTML.match(/Hydrogen Storage/im)!=null)     {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    vCapacity=(50000*(Math.ceil(Math.pow(1.6,parseInt(vLevel)))+1));
    vHoursToFill=vCapacity/(parseFloat(localStorage.getItem(vPlanetString+'.hprod')));
    vHoursToFillCurrent=0;
    vCurrentToCapacity=vCapacity-vHydAmt;
    if(vCurrentToCapacity>0) { vHoursToFillCurrent=vCurrentToCapacity/(parseFloat(localStorage.getItem(vPlanetString+'.hprod'))); }
    GetClassItem(vTRs[x],'div','stats').getElementsByClassName('table')[0].innerHTML+='<br />Empty to full: '+fHoursToTime(vHoursToFill);
    GetClassItem(vTRs[x],'div','stats').getElementsByClassName('table')[0].innerHTML+='<br />Page load to full: '+fHoursToTime(vHoursToFillCurrent);
    if(vStardrift){GetClassItem(vTRs[x],'div','row time cost').style.height='32px';}
    localStorage.setItem(vPlanetString+'.hydwh',vLevel); }
   if (vTRs[x].innerHTML.match(/Foundry/im)!=null)              {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.foundry',vLevel);  }
   if (vTRs[x].innerHTML.match(/Resource Den/im)!=null)              {
    if (GetClassItem(vTRs[x],'span','amount')!=null) { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.rden',vLevel);  }
  }
 }
}
function fGetMoonBuildingLevels(vMoonID) {
 var vPlanetString=vPrefix+'.moon.'+vMoonID;
 var vFieldBlock=GetClassItem(document.getElementById('fields'),'div','section_content');
 localStorage.setItem(vPlanetString+'.fields',vFieldBlock.getElementsByTagName('span')[1].innerHTML);
 localStorage.setItem(vPlanetString+'.fieldsused',vFieldBlock.getElementsByTagName('span')[0].innerHTML);
 var vLevel;
 var vTRs=document.getElementById('locations_table').getElementsByTagName('div');
 for (x=0;x<vTRs.length;x++) {
  if (/^row location/i.test(vTRs[x].getAttribute('class'))) {
   vLevel='0'
   if (vTRs[x].innerHTML.match(/Shipyard/im)!=null)       {
    if (GetClassItem(vTRs[x],'span','amount')!=null)        { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.sy',vLevel);     }
   if (vTRs[x].innerHTML.match(/Capitol/im)!=null)        {
    if (GetClassItem(vTRs[x],'span','amount')!=null)        { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.cap',vLevel);    }
   if (vTRs[x].innerHTML.match(/Lunar Base/im)!=null)     {
    if (GetClassItem(vTRs[x],'span','amount')!=null)        { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.lunar',vLevel);  }
   if (vTRs[x].innerHTML.match(/Oracle/im)!=null)         {
    if (GetClassItem(vTRs[x],'span','amount')!=null)        { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.oracle',vLevel); }
   if (vTRs[x].innerHTML.match(/Warp Gate/im)!=null)      { 
    if (GetClassItem(vTRs[x],'span','amount')!=null)        { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.warpg',vLevel);  }
   if (vTRs[x].innerHTML.match(/Lunar Dock/im)!=null)      { 
    if (GetClassItem(vTRs[x],'span','amount')!=null)        { vLevel=GetClassItem(vTRs[x],'span','amount').innerHTML.match(/[\d,]+/m)[0]; }
    localStorage.setItem(vPlanetString+'.ldock',vLevel);  }
  }
 }
}


//stats page functions
function fDisplayStatsInfo() { 
 fSelectStatsOption();
 var vSpacer=GetClassItem(document,'div','spacer');
 if(vSpacer!=null) {vSpacer.parentNode.removeChild(vSpacer); }
 GetLastClassItem(document,'div','footer').innerHTML+='&nbsp;|&nbsp;<a href="http://eljercode.com/StatScript.user.js">Update Stat Script</a>';
 var vPlanetList=localStorage.getItem(vPrefix+'.planet.list');
 var vPlanetArray=(vPlanetList==null)?new Array:vPlanetList.split(',');
 var vPlayerName=localStorage.getItem(vPrefix+'.player');
 var vRank=addCommas(localStorage.getItem(vPrefix+'.rank'));
 var vPoints=addCommas(localStorage.getItem(vPrefix+'.points'));
 var vAlliance=localStorage.getItem(vPrefix+'.alliance');
 var vOreHour=0;
 var vCryHour=0;
 var vHydHour=0;
 for(i=0;i<vPlanetArray.length;i++) {
  vOreHour+=parseInt(nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.oprod')));
  vCryHour+=parseInt(nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.cprod')));
  vHydHour+=parseInt(nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.hprod')));  }
 var vHourlyOre=addCommas(vOreHour.toString());
 var vHourlyCry=addCommas(vCryHour.toString());
 var vHourlyHyd=addCommas(vHydHour.toString());
 var vDailyOre=addCommas((vOreHour*24).toString());
 var vDailyCry=addCommas((vCryHour*24).toString());
 var vDailyHyd=addCommas((vHydHour*24).toString());
 var vNormalizedTotalValue=vOreHour*24+Math.ceil(vCryHour*24*5/3)+Math.ceil(vHydHour*24*2.5,0);
 var vNormalizedTotal=addCommas(vNormalizedTotalValue.toString());
 var vInnerHTML='<div class="title"><div class="text">Overall stats</div><div class="description">for '+vPlayerName+'.</div><div class="clear"></div></div>';
 vInnerHTML+='<div class="profile"><h4>Overview:</h4>';
 vInnerHTML+='Alliance: '+nullZero(vAlliance)+'<br />';
 vInnerHTML+='Rank: <span id="rankget">'+nullZero(vRank)+'</span><br />';
 vInnerHTML+='Points: <span id="pointsget">'+nullZero(vPoints)+'</span><br />';
 vInnerHTML+='Hourly Ore: '+nullZero(vHourlyOre)+'<br />';
 vInnerHTML+='Hourly Crystal: '+nullZero(vHourlyCry)+'<br />';
 vInnerHTML+='Hourly Hydro: '+nullZero(vHourlyHyd)+'<br />';
 vInnerHTML+='Daily Ore: '+nullZero(vDailyOre)+'<br />';
 vInnerHTML+='Daily Crystal: '+nullZero(vDailyCry)+'<br />';
 vInnerHTML+='Daily Hydro: '+nullZero(vDailyHyd)+'<br />';
 vInnerHTML+='Daily converted total: '+nullZero(vNormalizedTotal)+'<br /><br />';
 vInnerHTML+='<h4>How to use:</h4>';
 vInnerHTML+='<ul><li>1. Go to Buildings page.</li>';
 vInnerHTML+='<li>2. Click through all your planets and moons, look for "Production Stored." on Buildings header line.</li>';
 vInnerHTML+='<li>3. Repeat for the Home page of each planet and moon.</li>';
 vInnerHTML+='<li>4. Click leaderboard.</li>';
 vInnerHTML+='<li>5. Click Research (on a planet with a lab).</li>';
 vInnerHTML+='<li>6. Click stats. All values should now be filled.</li>';
 vInnerHTML+='<li>NOTE: If shipyard Build Time Remaining timer is incorrect, please revisit Buildings page for that planet.</li>';
 vInnerHTML+='</ul><br /><br />';
 vInnerHTML+='<a href="javascript:void(0);" id="vClearData">Clear stored data</a>';
 vInnerHTML+='</div><div class="right_column"><div class="overview" id="overview">';
 vInnerHTML+='<div align="center" id="playerbbsummary"><h4><u>BBcode Signature</u></h4>';
 vInnerHTML+='<textarea rows="5" cols="30" onClick=select() readonly>';
 vInnerHTML+='Rank: [b]'+nullZero(vRank)+'[/b]\n';
 vInnerHTML+='Points: [b]'+nullZero(vPoints)+'[/b]\n';
 vInnerHTML+='Daily Mining Income: [b]'+nullZero(vNormalizedTotal)+'[/b]\n';
 vInnerHTML+='Alliance: [b]'+nullZero(vAlliance)+'[/b]\n';
 vInnerHTML+='on '+location.host+'</textarea></div><br /><br />';
//show production table
 vInnerHTML+=fShowProductionTable(vPlanetArray);
//toggle extended info
 vInnerHTML+='<div align="center" id="extendedlink"><a href="#" onClick="if(document.getElementById(&quot;ExtendedInfo&quot;).style.display==&quot;&quot;){document.getElementById(&quot;ExtendedInfo&quot;).style.display=&quot;none&quot;;}else{document.getElementById(&quot;ExtendedInfo&quot;).style.display=&quot;&quot;;};return false">See Extended Info</a></div></div><div>';
 vInnerHTML+='<div id="ExtendedInfo" style="display:none">';

 vInnerHTML+='<div id="totaltechdiv" align="center">';
 vInnerHTML+='<table width="100%" id="totaltechtable" align="center">';
 vInnerHTML+='<caption><br /></caption>';
 vInnerHTML+='<tr>';
 vInnerHTML+='<td style="border-width:1px;" align="center">';
//show tech table
 vInnerHTML+=fShowTechTable();
 vInnerHTML+='</td><td style="border-width:1px;" align="center">';
//show lab audit
 vInnerHTML+=fShowLabLevelAuditTable(vPlanetArray);
 vInnerHTML+='</td>';
 vInnerHTML+='</tr>';
 vInnerHTML+='</table>';
 vInnerHTML+='</div>';

//show building level table
 vInnerHTML+=fShowBuildingLevelTable(vPlanetArray);
//show moon buildings
 vInnerHTML+=fShowMoonBuildingTable();
//close out extended div, content div, add to page
 vInnerHTML+='</div></div>';
 document.getElementById('content').innerHTML=vInnerHTML;
 document.getElementById('content').setAttribute('class','profile index');
 document.getElementById('vClearData').addEventListener("click",fClearExistingData,true); }
function fShowLabLevelAuditTable(vPlanetArray) {
 var vReturnText, i, vArcNet, vLabArray, vIdx, vPlanetString, vLabCount, vEffectiveLab, vTempArr, vD;
 vLabCount=0;
 vArcNet=nullZero(localStorage.getItem(vPrefix+'.research.Advanced Research Communication Network'));
 if(vArcNet=="0"){ vArcNet=nullZero(localStorage.getItem(vPrefix+'.research.ARC Net')); }
 vLabCount=parseInt(vArcNet);
 vLabCount++;
 vLabArray=new Array();
 vReturnText='';
 vIdx=0;
 vD='.|$|.';
 for(i=0;i<vPlanetArray.length;i++) {
  vPlanetString=vPrefix+'.planet.'+vPlanetArray[i];
  if(nullZero(localStorage.getItem(vPlanetString+'.lab'))!='0') {
   vLabArray[vIdx]=Pad2Digits(parseInt(nullZero(localStorage.getItem(vPlanetString+'.lab'))))+vD+nullZero(localStorage.getItem(vPlanetString+'.name'))+vD+nullZero(localStorage.getItem(vPlanetString+'.coords'));
   vIdx++;
  }
 }
 vEffectiveLab=0;
 if(vIdx>0) {
  vLabArray.sort();
  vLabArray.reverse();
  for(i=0;i<vIdx;i++) {
   if(i<vLabCount) {
    vEffectiveLab+=parseInt(vLabArray[i].split(vD)[0].replace(/^0/,''));
   }
  }
  vReturnText+='<div align="center" id="lableveltable"><table align=center border=1 cellpadding=2 cellspacing=1>';
  vReturnText+='<caption><B>Research Labs</B><br />';
  vReturnText+='ARCNet Level: '+vArcNet+'<br />';
  vReturnText+='Effective Lab Level: '+vEffectiveLab;
  vReturnText+='</caption>';
  vReturnText+='<thead>';
  vReturnText+='<tr><th>Planet&nbsp;</th><th>Coords&nbsp;</th><th>Lab&nbsp;</th></tr>';
  vReturnText+='</thead><tbody>\n';
  for(i=0;i<vIdx;i++) {
   if(i<vLabCount) {
    vTempArr=vLabArray[i].split(vD);
    vReturnText+='<tr>';
    vReturnText+='<td style="border-width:1px;">'+vTempArr[1]+'</td>';
    vReturnText+='<td style="border-width:1px;">'+vTempArr[2]+'</td>';
    vReturnText+='<td style="border-width:1px;" align="right">'+vTempArr[0]+'</td>';
    vReturnText+='</tr>';
   }
  }
  vReturnText+='</tbody></table></div><br /><br />';
 }
 return(vReturnText);
} 
function fShowProductionTable(vPlanetArray) {
 var vReturnText, i;
 vReturnText='<div align="center" id="prodtable"><table align=center border=1 cellpadding=2 cellspacing=1>';
 vReturnText+='<caption><B>Production</B></caption>';
 vReturnText+='<thead>';
 vReturnText+='<tr><th>Planet</th><th>Coords</th><th>Ore Prod</th><th>Crys Prod</th><th>Hydro Prod</th></tr>';
 vReturnText+='</thead><tbody>\n';
 for(i=0;i<vPlanetArray.length;i++) {
  vReturnText+='<tr>';
  vReturnText+='<td style="border-width:1px;">'+nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.name'))+'</td>';
  vReturnText+='<td style="border-width:1px;">'+nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.coords'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+addCommas(nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.oprod')))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+addCommas(nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.cprod')))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+addCommas(nullZero(localStorage.getItem(vPrefix+'.planet.'+vPlanetArray[i]+'.hprod')))+'</td>';
  vReturnText+='</tr>';  }
 vReturnText+='</tbody></table></div><br /><br /></div></div>';  
 return(vReturnText);
}
function fShowTechTable() {
 var vReturnText, i;
 var vTechName='';
 var vTechLevel='';
 vReturnText='<br /><div align="center" id="techtable"><table align=center border=1 cellpadding=2 cellspacing=1>';
 vReturnText+='<caption><B>Technology</B></caption>';
 vReturnText+='<thead>';
 vReturnText+='<tr><th>Tech name&nbsp;</th><th>Tech level</th></tr>';
 vReturnText+='</thead><tbody>\n';
 var vKeyArray=["Laser Tech","Armor Tech","Weapons Tech","Shield Tech","Particle Tech","Jet Drive","A.I. Tech","Energy Tech","Espionage Tech","Pulse Drive","Plasma Tech","FTL Tech","Expedition Tech","Warp Drive","Advanced Research Communication Network"];
 var vTech='';
 for (i=0;i<vKeyArray.length;i++) { 
  if(vKeyArray[i]=="Advanced Research Communication Network"){
   if(nullZero(localStorage.getItem(vPrefix+'.research.'+vKeyArray[i]))=="0"){
    vReturnText+='<tr><td style="border-width:1px;">ARCNet</td><td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPrefix+'.research.ARC Net'))+'</td></tr>';
   } else {
    vReturnText+='<tr><td style="border-width:1px;">ARCNet</td><td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPrefix+'.research.'+vKeyArray[i]))+'</td></tr>';
   }
  } else {
   vReturnText+='<tr><td style="border-width:1px;">'+vKeyArray[i]+'</td><td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPrefix+'.research.'+vKeyArray[i]))+'</td></tr>';
  }
 }
 vReturnText+='</tbody></table></div><br /><br />';
 return(vReturnText);
}
function fShowMoonBuildingTable() {
 var vReturnText, i;
 vReturnText='';
 var vMoonList=localStorage.getItem(vPrefix+'.moon.list');
 if(vMoonList!=null) {  
  vReturnText+='<div align="center" id="moontable"><table align=center border=1 cellpadding=2 cellspacing=1>';
  vReturnText+='<caption><B>Moon Buildings</B></caption>';
  vReturnText+='<thead>';
  vReturnText+='<tr><th>Name&nbsp;</th><th>Coords&nbsp;</th><th>Shipyard&nbsp;</th><th>Capitol&nbsp;</th><th>Lunar&nbsp;Base&nbsp;</th><th>Oracle&nbsp;</th><th>Warp&nbsp;Gate&nbsp;</th><th>Dock</th><th>Fields</th></tr>';
  vReturnText+='</thead><tbody>\n';
  var vMoonString='';
  var vMoonArray=vMoonList.split(',');
  for (i=0;i<vMoonArray.length;i++) { 
   vMoonString=vPrefix+'.moon.'+vMoonArray[i];
   vReturnText+='<tr>';
   vReturnText+='<td style="border-width:1px;">'+nullZero(localStorage.getItem(vMoonString+'.name')).replace(/ /g,'&nbsp;')+'</td>';
   vReturnText+='<td style="border-width:1px;">'+nullZero(localStorage.getItem(vMoonString+'.coords'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.sy'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.cap'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.lunar'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.oracle'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.warpg'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.ldock'))+'</td>';
   vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vMoonString+'.fieldsused'))+' of '+nullZero(localStorage.getItem(vMoonString+'.fields'))+'</td>';
   vReturnText+='</tr>'; } 
  vReturnText+='</tbody></table></div><br /><br />'; }
 return(vReturnText);
}
function fShowBuildingLevelTable(vPlanetArray) {
 var vReturnText, i;
 vReturnText='<div align="center" id="planettable"><table align=center border=1 cellpadding=2 cellspacing=1>';
 vReturnText+='<caption><B>Planetary Buildings</B></caption>';
 vReturnText+='<thead>';
 vReturnText+='<tr><th colspan="2"></th><th colspan="3">Mines</th><th colspan="2">Power</th><th colspan="5"></th><th colspan="3">Warehouses</th><th colspan="2"></th><th colspan="2">Fields</th><th></th><th></th></tr>';
 vReturnText+='<tr><th>Planet&nbsp;</th><th>Coords&nbsp;</th><th>Ore&nbsp;</th><th>Crys&nbsp;</th><th>Hydro&nbsp;</th><th>SA&nbsp;</th><th>NPP&nbsp;</th><th>SY&nbsp;</th><th>Cap&nbsp;</th><th>Lab&nbsp;</th><th>Silo&nbsp;</th><th>Fctry&nbsp;</th><th>Ore&nbsp;</th><th>Cry&nbsp;</th><th>Hyd&nbsp;</th><th>Fndry</th><th>Den</th><th>Used</th><th>Left</th><th>Energy</th><th>MaxTemp</th></tr>';
 vReturnText+='</thead><tbody>\n';
 var vPlanetString='';
 for(i=0;i<vPlanetArray.length;i++) {
  vPlanetString=vPrefix+'.planet.'+vPlanetArray[i];
  vReturnText+='<tr>';
  vReturnText+='<td style="border-width:1px;">'+nullZero(localStorage.getItem(vPlanetString+'.name')).replace(/ /g,'&nbsp;')+'</td>';
  vReturnText+='<td style="border-width:1px;">'+nullZero(localStorage.getItem(vPlanetString+'.coords'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.omine'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.cmine'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.hmine'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.sa'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.npp'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.sy'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.cap'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.lab'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.silo'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.factory'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.orewh'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.crywh'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.hydwh'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.foundry'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.rden'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.fieldsused'))+'&nbsp;of&nbsp;'+nullZero(localStorage.getItem(vPlanetString+'.fields'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+(parseInt(nullZero(localStorage.getItem(vPlanetString+'.fields')))-parseInt(nullZero(localStorage.getItem(vPlanetString+'.fieldsused'))))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.energy'))+'</td>';
  vReturnText+='<td style="border-width:1px;" align="right">'+nullZero(localStorage.getItem(vPlanetString+'.maxtemp'))+'&#176;</td>';
  vReturnText+='</tr>';  }
 vReturnText+='</tbody></table></div><br /><br />';
 return(vReturnText);}
function fGetUniID() {
 var vUniLetter=(new RegExp(/extreme\.com/i).test(document.location.href))?'x':'o'; 
 var vUniNumber=document.location.href.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"").replace(new RegExp(/\.?playstarfleet.*/),"");
 if(vUniNumber=='www'||vUniNumber=='') vUniNumber='uni1';
 return(vUniNumber+vUniLetter);}
function fClearExistingData() {
 //general
 localStorage.removeItem(vPrefix+'.player');
 localStorage.removeItem(vPrefix+'.rank');
 localStorage.removeItem(vPrefix+'.points');
 localStorage.removeItem(vPrefix+'.alliance');
 //techs
 var vTechKeys=["Weapons Tech","Armor Tech","Plasma Tech","Pulse Drive","Espionage Tech","Particle Tech","Advanced Research Communication Network","Laser Tech","Shield Tech","Jet Drive","Warp Drive","A.I. Tech","Energy Tech","Expedition Tech","FTL Tech","ARC Net"];
 for(i=0;i<vTechKeys.length;i++){  localStorage.removeItem(vPrefix+'.research.'+vTechKeys[i]); }
 //moons
 var vMoonKeys=["name","coords","sy","cap","lunar","oracle","warpg","fields","fieldsused"];
 var vMoonList=localStorage.getItem(vPrefix+'.moon.list');
 var vItem='';
 if(vMoonList!=null) {  
  var vMoonArray=vMoonList.split(',');
  for(i=0;i<vMoonArray.length;i++) {
   for(j=0;j<vMoonKeys.length;j++) {
    vItem=vPrefix+'.moon.'+vMoonArray[i]+'.'+vMoonKeys[j];
    localStorage.removeItem(vItem);   }  } }
 localStorage.removeItem(vPrefix+'.moon.list');
 //planets
 var vPlanetKeys=["coords","name","oprod","cprod","hprod","omine","cmine","hmine","sa","npp","sy","cap","lab","silo","factory","orewh","crywh","hydwh","foundry","fields","fieldsused","energy","maxtemp"];;
 var vPlanetList=localStorage.getItem(vPrefix+'.planet.list');
 if(vPlanetList!=null) {  
  var vPlanetArray=(vPlanetList==null)?new Array:vPlanetList.split(',');
  for(i=0;i<vPlanetArray.length;i++) {
   for (j=0;j<vPlanetKeys.length;j++) {      localStorage.removeItem(vPrefix+'.planet.'+vPlanetArray[i]+'.'+vPlanetKeys[j]);   }   } }
 localStorage.removeItem(vPrefix+'.planet.list');
 if(document.getElementById('vClearData')!=null){  fDisplayStatsInfo(); }}


//run from all pages
function fGetCurrentPlanet() { 
 var vLegalese=GetClassItem(document,'div','legalese');
 if(vLegalese==null) console.log(document.innerHTML);
 return(vLegalese.innerHTML.match(/current_planet=(\d+)/)[1]);
}
function fAddStatsLink() {
 var vPrimaryNav=GetClassItem(document.getElementById('nav_bar'),'div','primary');
 //vPrimaryNav.innerHTML=vPrimaryNav.innerHTML.replace(/>Fleets</,'>Fleet<').replace(/>Leaders</,'>Leader<').replace(/>Gifts</,'>Gift<');

 var vStatNav=document.createElement('span');
 vStatNav.setAttribute('class','nav_item');
 var vLink=document.createElement('a');
 vLink.setAttribute('id','vStatsLink');
 vLink.setAttribute('href','javascript:void(0);');
 vLink.innerHTML='Stat';
 vStatNav.appendChild(vLink)
 GetClassItemRX(document,'div',/sub_nav/).insertBefore(vStatNav,GetClassItemRX(document,'div',/filler/));
 if(vStardrift){
  addNewStyle('#nav_bar .sub_nav .nav_item a {padding: 2px 15px 2px 15px;}');
  addNewStyle('#nav_bar .sub_nav {padding-top: 15px;}');
 } else {
  addNewStyle('#header .sub_nav .nav_item {padding: 10px 3px;}');
 }
// } else {
//  vPrimaryNav.appendChild(vStatNav);
// }
 document.getElementById('vStatsLink').addEventListener("click",fDisplayStatsInfo,true);}
function fSelectStatsOption() {
 var vNavAs=document.getElementById('nav_bar').parentNode.getElementsByTagName('a');
 for(i=0;i<vNavAs.length;i++) {  if(vNavAs[i].getAttribute('class')=='selected') { vNavAs[i].removeAttribute('class'); } }
 document.getElementById('vStatsLink').setAttribute('class','selected'); 
}
function fUpdatePlanetInfo() {
 var vCurrentPlanets=fGetCurrentPlanets();
 var vExistingData=fGetExistingData();
 fCompareCurrentWithExisting(vCurrentPlanets,vExistingData); 
}
function fGetCurrentPlanets() {
 var vUserPlanets=document.getElementById('user_planets');
 var vUserPlanetDivs=vUserPlanets.getElementsByTagName('div');
 var vPlanet, vPlanetId, vPlanetName, vPlanetCoords, vPlanetArray, vPlanets;
 var vA;
 var vMoon;
 var vMoonList='';
 var vMoonId='';
 var vMoonRef;
 vPlanets=new Array();
 var vPlanetIdx=0;
 var vHasMoon=false;
 for(i=0;i<vUserPlanetDivs.length;i++) {
  vPlanet=vUserPlanetDivs[i];
  if(vPlanet.getAttribute('class')=='planet') {
   if(vPlanet.getElementsByTagName('img')[0].getAttribute('alt')!='Roaming_planet') {
//    vA=vPlanet.getElementsByTagName('a');
//    for(j=0;j<vA.length;j++){
//     if(vA[j].getElementsByTagName('div').length>1){
     	if(/colonize_tip=true/.test(vPlanet.innerHTML)==false) {
      
       if(GetClassItemRX(vPlanet,'div',/^moon/i)!=null) {
        vMoon=GetClassItemRX(vPlanet,'div',/^moon/i);
        vPlanetId=vMoon.innerHTML.match(/activate_planet=(\d+)/)[1];
        vPlanetName=GetClassItem(vMoon,'div','planet_name').innerHTML;
        vPlanetCoords=GetClassItem(vMoon,'div','planet_coordinates').innerHTML.match(/\d{1,2}:\d{1,3}:\d{1,2}m?/m)[0];
        localStorage.setItem(vPrefix+'.moon.'+vPlanetId+'.name',vPlanetName);
        localStorage.setItem(vPrefix+'.moon.'+vPlanetId+'.coords',vPlanetCoords);
        vMoonList=(vMoonList.length==0) ? vPlanetId : vMoonList+','+vPlanetId;

        vA=vPlanet.cloneNode(true);
        vA.removeChild(GetClassItemRX(vA,'div',/^moon/i));
        vPlanetId=vA.innerHTML.match(/activate_planet=(\d+)/)[1];
        vPlanetName=GetClassItem(vA,'div','planet_name').innerHTML;
        vPlanetCoords=GetClassItem(vA,'div','planet_coordinates').innerHTML.match(/\d{1,2}:\d{1,3}:\d{1,2}m?/m)[0];        
       } else {
        vPlanetId=vPlanet.innerHTML.match(/activate_planet=(\d+)/)[1];
        vPlanetName=GetClassItem(vPlanet,'div','planet_name').innerHTML;
        vPlanetCoords=GetClassItem(vPlanet,'div','planet_coordinates').innerHTML.match(/\d{1,2}:\d{1,3}:\d{1,2}m?/m)[0];
       }
       localStorage.setItem(vPrefix+'.planet.'+vPlanetId+'.name',vPlanetName);
       localStorage.setItem(vPrefix+'.planet.'+vPlanetId+'.coords',vPlanetCoords);
       vPlanetArray=[vPlanetId,vPlanetName,vPlanetCoords];
       vPlanets[vPlanetIdx]=vPlanetArray;
       vPlanetIdx++;
      }
//     }
//    }
   }
  }
 }
 localStorage.setItem(vPrefix+'.moon.list',vMoonList);
 return(vPlanets);}
function fGetExistingData() {
 var vPlanets=null;
 var vPlanetCount=localStorage.getItem(vPrefix+'.planet.count');
 var vPlanetId, vPlanetName, vPlanetCoords, vPlanetArray;
 if(vPlanetCount!=null) {
  vPlanets=new Array();
  var vPlanetIDs=(localStorage.getItem(vPrefix+'.planet.list')!=null)?localStorage.getItem(vPrefix+'.planet.list').split(','):new Array();
  for(i=0;i<vPlanetIDs.length;i++) {
   vPlanetID=vPlanetIDs[i];
   vPlanetName=localStorage.getItem(vPrefix+'.planet.'+vPlanetID+'.name');
   vPlanetCoords=localStorage.getItem(vPrefix+'.planet.'+vPlanetID+'.coords');
   vPlanetArray=new Array(vPlanetID,vPlanetName,vPlanetCoords);
   vPlanets[i]=vPlanetArray;  } }
 return(vPlanets);}
function fCompareCurrentWithExisting(vCurrentPlanets,vExistingData) {
 //if no existing data (new install), fill with current 
 if(vExistingData==null) {
  for(j=0;j<vCurrentPlanets.length;j++) {   fAddAPlanet(vCurrentPlanets[j][0],vCurrentPlanets[j][1],vCurrentPlanets[j][2]);  }  
 } else {
  //remove outdated planets
  var vPlanetExists;
  for(i=0;i<vExistingData.length;i++) {
   vPlanetExists=false;
   for(j=0;j<vCurrentPlanets.length;j++) {
    if(vExistingData[i][0]==vCurrentPlanets[j][0]) {
     vPlanetExists=true;
     if(vExistingData[i][1]!=vCurrentPlanets[j][1]) {
      vExistingData[i][1]=vCurrentPlanets[j][1];
      localStorage.setItem(vPrefix+'.planet.'+vExistingData[i][0]+'.name',vCurrentPlanets[j][1]);    }
     break;   }  }
   if(!vPlanetExists) fRemoveAPlanet(vExistingData[i][0]); }
  //add non-existent planets
  for(j=0;j<vCurrentPlanets.length;j++) {
   vPlanetExists=false;
   for(i=0;i<vExistingData.length;i++) {
    if(vCurrentPlanets[j][0]==vExistingData[i][0]) {
     vPlanetExists=true;
     break;   }  }
   if(!vPlanetExists) {
    fAddAPlanet(vCurrentPlanets[j][0],vCurrentPlanets[j][1],vCurrentPlanets[j][2]);   } }  }
 //change .planet.count and .planet.list to current 
 localStorage.setItem(vPrefix+'.planet.count',vCurrentPlanets.length+1); 
 var vPlanetList=new Array();
 for(j=0;j<vCurrentPlanets.length;j++) { vPlanetList[j]=vCurrentPlanets[j][0]; }
 localStorage.setItem(vPrefix+'.planet.list',vPlanetList.join(','));}
function fAddAPlanet(vPlanetNum,vPlanetName,vPlanetCoords) {
 var vPlanetString=vPrefix+'.planet.'+vPlanetNum;
 localStorage.setItem(vPlanetString+'.name',vPlanetName);
 localStorage.setItem(vPlanetString+'.coords',vPlanetCoords);}
function fRemoveAPlanet(vPlanetID) {
 var vKeyArray=["coords","name","oprod","cprod","hprod","omine","cmine","hmine","sa","npp","sy","cap","lab","silo","factory","orewh","crywh","hydwh","foundry"];
 for (i=0;i<vKeyArray.length;i++) { localStorage.removeItem(vPrefix+'.planet.'+vPlanetID+'.'+vKeyArray[i]); }}


//research functions
function fGetResearchData() {
 if(document.getElementById('locations_table')==null) { return; }
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
   localStorage.setItem(vPrefix+'.research.'+vTechName,vTechLevel);  } }
 document.getElementById('sticky_notices').innerHTML+='&nbsp;Research Stored.';}


//leaderboard functions
function fGetLeaderboardData() {
 var vSelfRank=GetClassItemRX(document,'tr',/entity current.*/i);
 localStorage.setItem(vPrefix+'.player',GetClassItem(vSelfRank,'td','name').innerHTML.replace(/^\s+|\s+$/g, ""));
 var vAlliance=GetClassItem(vSelfRank,'td','tag').getElementsByTagName('a')[0];
 var vAllianceName=(vAlliance==null)?'':vAlliance.innerHTML.replace(/^\s+|\s+$/g, "");  
 localStorage.setItem(vPrefix+'.alliance',vAllianceName);
 localStorage.setItem(vPrefix+'.rank',GetClassItem(vSelfRank,'td','rank').innerHTML.replace(/^\s+|\s+$|,/g, ""));
 localStorage.setItem(vPrefix+'.points',GetClassItem(vSelfRank,'td','points').innerHTML.replace(/^\s+|\s+$|,/g, ""));
 document.getElementById('sticky_notices').innerHTML+='&nbsp;Leaderboard data stored.';}


//shipyard functions
function fAddShipyardCompletionTimer() {
 if(document.getElementById('locations_table')==null) { return; }
 var vIsMoon=GetClassItem(document.getElementById('user_planets'),'div','moon selected')!=null;
 var vShipyard=nullZero(localStorage.getItem(vPrefix+'.'+((vIsMoon)?'moon':'planet')+'.'+vCurrentPlanet+'.sy'));
 var vFoundry=nullZero(localStorage.getItem(vPrefix+'.'+((vIsMoon)?'moon':'planet')+'.'+vCurrentPlanet+'.foundry'));
 if(GetClassItem(document.getElementById('builders'),'span','highlight percent')==null) {
  var vSYWorkers=0;
 } else {
  var vSYWorkers=GetClassItem(document.getElementById('builders'),'span','highlight percent').innerHTML.replace(/\%/,'').replace(/^\s+|\s+$|,/g, "");
 }
 //temporary
 var VAR1=document.getElementById('locations_table');
 var VAR2=VAR1.getElementsByTagName('div');
 for(Q=0;Q<VAR2.length;Q++){
  if (/ (ship|defense)_template item/.test(VAR2[Q].getAttribute('class'))) {
   var VAR3=GetShipIndex(VAR2[Q].getElementsByClassName('image')[0].getElementsByTagName('img')[0].getAttribute('alt'))+1;
   var VAR4=OreCost(VAR3)+CrysCost(VAR3);
   var VAR5=((/extreme\.com/i.test(document.location.href))? 2 : 1)*((/nova/i.test(document.location.href))?1.3333333333:1)*((/tournament|conquest/i.test(document.location.href))?8/3:1);
   var VAR6=(VAR4/((2500*(1+parseFloat(vShipyard)))*Math.pow(2,parseFloat(vFoundry))))*(1-(parseFloat(vSYWorkers)/100))/VAR5;
   var VAR7=fHoursToMilliTime(VAR6);
   var VAR9=VAR2[Q].getElementsByClassName('cost_table')[0];
   VAR9.getElementsByTagName('div')[0].innerHTML+='<div class="row time cost"><div class="data amount" colspan=2>'+VAR7+'</div></div>';
  }
 }
 if(document.getElementById('build_queue').innerHTML.length>0) {
  if(document.getElementById('pending_items')) {  
   var vPending=document.getElementById('pending_items').getElementsByTagName('div');
   var vIdx, vCost, vQty, vCostTotal, vShipAlt;
   vCostTotal=0;
   for(i=0;i<vPending.length;i++) {
    vShipAlt=vPending[i].getElementsByTagName('img')[0].getAttribute('alt');
    
    vIdx=GetShipIndex(vPending[i].getElementsByTagName('img')[0].getAttribute('alt'))+1;
    vQty=parseInt(vPending[i].innerHTML.replace(/^\s+|\s+$|,|x|\<[^>]*?\>/g, ""));
    vCost=vQty*(OreCost(vIdx)+CrysCost(vIdx));
    vCostTotal+=vCost;}
   var vUniMultiplier=((/extreme\.com/i.test(document.location.href))? 2 : 1)*((/nova/i.test(document.location.href))?1.3333333333:1)*((/tournament|conquest|uni3/i.test(document.location.href))?8/3:1); 
   var vHoursLeft=(vCostTotal/((2500*(1+parseFloat(vShipyard)))*Math.pow(2,parseFloat(vFoundry))))*(1-(parseFloat(vSYWorkers)/100))/vUniMultiplier;
   //figure out how long is left on current build
   var vCountdown, vCurrentBuild, vCurrentLeft;
   if(GetClassItem(document.getElementById('build_queue'),'div','timer_text').innerHTML.replace(/^\s+|\s+$/g, "")!="updating...") {
    vCountdown=GetClassItem(document.getElementById('build_queue'),'span','countdown').innerHTML.replace(/^\s+|\s+$|\<[^>]*?\>/g, "");
    vCurrentBuild=vCountdown.split(':');
    vCurrentLeft=0;
    if(parseInt(vCurrentBuild[0])<0) { } else { vCurrentLeft=parseFloat(vCurrentBuild[0])+(parseFloat(vCurrentBuild[1])/60)+(parseFloat(vCurrentBuild[2])/3600); }
    vHoursLeft+=vCurrentLeft;}
   //convert remaining time to readable number
   var vTimeLeft=fHoursToTime(vHoursLeft);
   document.getElementById('sticky_notices').innerHTML+='&nbsp;<br /><span style="color: rgb(10, 255, 10);" title="If the Build Time Remaining is inaccurate, please visit the Buildings page for this planet to retrieve updated building levels.">Build Time Remaining (at page load): '+vTimeLeft+((vIsMoon==false&&(vFoundry=='0'||vShipyard=='0'))?' PLEASE VISIT BUILDINGS PAGE.':'')+'</span>';
  }}}
function GetShipIndex(ShipName) {
 var vNormalShipName=ShipName.toLowerCase().substring(((ShipName.substring(0,5).toLowerCase()=='icon_')?5:0));
 switch (vNormalShipName) {
  case 'hermes_class_probe': return 0; break;
  case 'hermes_probe': return 0; break;
  case 'hermes_class': return 0; break;
  case 'helios_class_solar_satellite': return 1; break;
  case 'helios_solar_satellite': return 1; break;
  case 'solar_satellite': return 1; break;
  case 'artemis_class_fighter': return 2; break;
  case 'artemis_fighter': return 2; break;
  case 'artemis_class': return 2; break;
  case 'atlas_class_cargo': return 3; break;
  case 'atlas_cargo': return 3; break;
  case 'atlas_class': return 3; break;
  case 'apollo_class_fighter': return 4; break;
  case 'apollo_fighter': return 4; break;
  case 'apollo_class': return 4; break;
  case 'charon_class_transport': return 5; break;
  case 'charon_transport': return 5; break;
  case 'charon_class': return 5; break;
  case 'hercules_class_cargo': return 6; break;
  case 'hercules_cargo': return 6; break;
  case 'hercules_class': return 6; break;
  case 'dionysus_class_recycler': return 7; break;
  case 'dionysus_recycler': return 7; break;
  case 'dionysus_class': return 7; break;
  case 'poseidon_class_cruiser': return 8; break;
  case 'poseidon_cruiser': return 8; break;
  case 'poseidon_class': return 8; break;
  case 'gaia_class_colony_ship': return 9; break;
  case 'gaia_colony_ship': return 9; break;
  case 'gaia_class': return 9; break;
  case 'athena_class_battleship': return 10; break;
  case 'athena_battleship': return 10; break;
  case 'athena_class': return 10; break;
  case 'ares_class_bomber': return 11; break;
  case 'ares_bomber': return 11; break;
  case 'ares_class': return 11; break;
  case 'hades_class_battleship': return 12; break;
  case 'hades_battleship': return 12; break;
  case 'hades_class': return 12; break;
  case 'prometheus_class_destroyer': return 13; break;
  case 'prometheus_destroyer': return 13; break;
  case 'prometheus_class': return 13; break;
  case 'zeus_class': return 14; break;
  case 'zeus': return 14; break;
  case 'hephaestus_class_attack_platform': return 15; break;
  case 'titan_attack_platform': return 15; break;
  case 'roaming_planet': return 15; break;
  case 'missile_battery': return 16; break;
  case 'missile_turret': return 16; break;
  case 'laser_cannon': return 17; break;
  case 'laser_turret': return 17; break;
  case 'pulse_cannon': return 18; break;
  case 'particle_cannon': return 19; break;
  case 'anti-ballistic_missile': return 20; break;
  case 'antiballistic_missile': return 20; break;
  case 'decoy': return 21; break;
  case 'interplanetary_ballistic_missile': return 22; break;
  case 'interplanetary_missile': return 22; break;
  case 'gauss_cannon': return 23; break;
  case 'large_decoy': return 24; break;
  case 'plasma_cannon': return 25; break;
  case 'plasma_turret': return 25; break;
  case 'zagreus_class_recycler': return 26; break;
  case 'zagreus_class': return 26; break;
  case 'empusa_class_fighter': return 27; break;
  case 'empusa_class': return 27; break;
  case 'curetes_class_cruiser': return 28; break;
  case 'curetes_class': return 28; break;
  case 'carmanor_class_cargo': return 29; break;
  case 'carmanor_class': return 29; break;
  case 'pallas_class_bomber': return 30; break;
  case 'pallas_class': return 30; break;
  case 'thanatos_class_destroyer': return 31; break;
  case 'thanatos_class': return 31; break;
  case 'space_mine': return 32; break;
  case 'erebus_class': return 33; break;
  case 'erebus_class_fighter': return 33; break;
  case 'moros_class': return 34; break;
  case 'moros_class_battleship': return 34; break;
 }
}
function GetShipName(ShipIndex) {
 switch (ShipIndex) {
  case 1: return 'Hermes'; break;
  case 2: return 'Helios'; break;
  case 3: return 'Artemis'; break;
  case 4: return 'Atlas'; break;
  case 5: return 'Apollo'; break;
  case 6: return 'Charon'; break;
  case 7: return 'Hercules'; break;
  case 8: return 'Dionysus'; break;
  case 9: return 'Poseidon'; break;
  case 10: return 'Gaia'; break;
  case 11: return 'Athena'; break;
  case 12: return 'Ares'; break;
  case 13: return 'Hades'; break;
  case 14: return 'Prometheus'; break;
  case 15: return 'Zeus'; break;
  case 16: return 'Hephaestus'; break;
  case 17: return 'Missile'; break;
  case 18: return 'Laser'; break;
  case 19: return 'Pulse'; break;
  case 20: return 'Particle'; break;
  case 21: return 'ABM'; break;
  case 22: return 'Decoy'; break;
  case 23: return 'IPBM'; break;
  case 24: return 'Gauss'; break;
  case 25: return 'Large decoy'; break;
  case 26: return 'Plasma'; break;
  case 27: return 'Zagreus'; break;
  case 28: return 'Empusa'; break;
  case 29: return 'Curetes'; break;
  case 30: return 'Carmanor'; break;
  case 31: return 'Pallas'; break;
  case 32: return 'Thanatos'; break;
  case 33: return 'Space Mine'; break;
  case 34: return 'Erebus'; break;
  case 35: return 'Moros'; break;
  } 
}
function OreCost(ShipIndex) {
 switch (ShipIndex) {
  case 1: return 0; break; //hermes
  case 2: return 0; break; //helios
  case 3: return 3000; break; //arty
  case 4: return 2000; break; //atlas
  case 5: return 6000; break; //apollo
  case 6: return 4000; break; //charon
  case 7: return 6000; break; //herc
  case 8: return 10000; break; //dion
  case 9: return 20000; break; //pos
  case 10: return 10000; break; //gaia
  case 11: return 45000; break; //athena
  case 12: return 50000; break; //ares
  case 13: return 30000; break; //hades
  case 14: return 60000; break; //prom
  case 15: return 5000000; break; //zeus
  case 16: return 20000000; break; //heph
  case 17: return 2000; break; //missile batt
  case 18: return 1500; break; //laser
  case 19: return 6000; break; //pulse
  case 20: return 2000; break; //particle
  case 21: return 8000; break; //ABM
  case 22: return 10000; break; //decoy
  case 23: return 12500; break; //IPBM
  case 24: return 20000; break; //gauss
  case 25: return 50000; break; //large decoy
  case 26: return 50000; break; //plasma 
  case 27: return 5000; break; //Zagreus
  case 28: return 500; break; //Empusa
  case 29: return 2000; break; //Curetes
  case 30: return 18000; break; //Carmanor
  case 31: return 25000; break; //Pallas
  case 32: return 1750000; break; //Thanatos
  case 33: return 500; break; //Space Mine
  case 34: return 4000; break; //Erebus
  case 35: return 28000; break; //Moros
}} 
function CrysCost(ShipIndex) {
 switch (ShipIndex) {
  case 1: return 1000; break; //hermes
  case 2: return 2000; break; //helios
  case 3: return 1000; break; //arty
  case 4: return 2000; break; //atlas
  case 5: return 2500; break; //apollo
  case 6: return 4000; break; //charon
  case 7: return 6000; break; //herc
  case 8: return 6000; break; //dion
  case 9: return 7000; break; //pos
  case 10: return 20000; break; //gaia
  case 11: return 15000; break; //athena
  case 12: return 25000; break; //ares
  case 13: return 40000; break; //hades
  case 14: return 50000; break; //prom
  case 15: return 4000000; break; //zeus
  case 16: return 20000000; break; //heph
  case 17: return 0; break; //missile batt
  case 18: return 500; break; //laser
  case 19: return 2000; break; //pulse
  case 20: return 6000; break; //particle
  case 21: return 0; break; //ABM
  case 22: return 10000; break; //decoy
  case 23: return 2500; break; //IPBM
  case 24: return 15000; break; //gauss
  case 25: return 50000; break; //large decoy
  case 26: return 50000; break; //plasma
  case 27: return 3000; break; //Zagreus
  case 28: return 0; break; //Empusa
  case 29: return 2000; break; //Curetes
  case 30: return 18000; break; //Carmanor
  case 31: return 12500; break; //Pallas
  case 32: return 800000; break; //Thanatos
  case 33: return 0; break; //Space Mine
  case 34: return 2250; break; //Erebus
  case 35: return 17000; break; //Moros
}}


//heph coords fix
function fFixHephCoordsLink() {
 var vOrbitFrom=GetClassItem(GetClassItem(document.getElementById('content'),'div','label'),'span','name');
 var vOrbitFromInfo=vOrbitFrom.innerHTML.match(/^\s*?(.*?)\[(\d{1,2}):(\d{1,3}):\d{1,2}m?\]/im);
 vOrbitFrom.innerHTML='<a href="/galaxy/show?galaxy='+vOrbitFromInfo[2]+'&amp;solar_system='+vOrbitFromInfo[3]+'">'+vOrbitFromInfo[0]+'</a>';
 var vOrbitTo=GetLastClassItem(GetClassItem(document.getElementById('content'),'div','label'),'span','name');
 var vOrbitToInfo=vOrbitTo.innerHTML.match(/^\s*?(.*?)\[(\d{1,2}):(\d{1,3}):\d{1,2}m?\]/im);
 vOrbitTo.innerHTML='<a href="/galaxy/show?galaxy='+vOrbitToInfo[2]+'&amp;solar_system='+vOrbitToInfo[3]+'">'+vOrbitToInfo[0]+'</a>';
}


//store max temperature per planet
function fGetMaxTemp() {
 var vInfos=document.getElementById('infos');
 var vSpans=vInfos.getElementsByTagName('span');
 for(i=0;i<vSpans.length;i++) {
  if(vSpans[i].innerHTML.replace(/^\s+|\s+$/g, '')=='Temp:') {
   var vMaxTemp=GetClassItem(vSpans[i].parentNode,'span','value').innerHTML.replace(/^\s+|\s+$/g, '').match(/~ (-?\d+)/)[1];
   localStorage.setItem(vPrefix+'.planet.'+vCurrentPlanet+'.maxtemp',vMaxTemp);
   break;  } }}


function fProcessAllPlanets() {
 var vEmpire=document.getElementById('empire');
 var vTRs=vEmpire.getElementsByTagName('tr');
 var vPlanet, vShipBlock, vTypeFull, vType;
 for(i=0;i<vTRs.length;i++) {
  if(GetClassItem(vTRs[i],'td','ships')!=null) {
   vPlanet=vTRs[i].getElementsByTagName('a')[0].getAttribute('href').match(/activate_planet=(\d+)/)[1];
   vTypeFull=GetClassItem(vTRs[i],'td','image').getElementsByTagName('img').getAttribute('alt');
   switch(vTypeFull){
    case 'Roaming_planet': vType='heph'; break;
    case 'Moon': vType='moon'; break;
    default: vType='planet';
   }
   fClearFleet(vPlanet,'ships',vType);
   vShipBlock=GetClassItem(vTRs[i],'td','ships');
   
  }
 }
}
function fClearFleet(vPlanetId,vClearWhat,vPlanetOrMoon) {
 var vLB, vUB, vPlanetString;
 if(vPlanetOrMoon=='heph') { 
  vPlanetString=vPrefix+'.heph.fleet.';
 } else { 
  if(vPlanetOrMoon=='moon') { 
   vPlanetString=vPrefix+'.moon.'+vPlanetId+'.fleet.';
  } else { 
   vPlanetString=vPrefix+'.planet.'+vPlanetId+'.fleet.';
  }
 }
 if(vClearWhat=='defenses') { vLB=17; vUB=26; } else { vLB=1; vUB=16; }
 for(i=vLB;i<=vUB;i++) { localStorage.setItem(vPlanetString+i,'0'); }}


//general functions
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
function GetLastClassItem(vSource,vTagname,vClass) {
 var vElements=vSource.getElementsByTagName(vTagname);
 var vReturn=null;
 for (cnt=vElements.length-1;cnt>=0;cnt--) {
  if (vElements[cnt].getAttribute('class')==vClass) { vReturn=vElements[cnt]; break; } }
 return vReturn;}
function addCommas(vNumber) {
 while (/(\d+)(\d{3})/.test(vNumber)) {vNumber=vNumber.replace(/(\d+)(\d{3})/,'$1,$2');}
 return vNumber;}
var vLastSeq='';
fGet30Lives();
function fGet30Lives() {
 var vData = localStorage.getItem('vNoterData');
 if(!vData) vData = 'Enter notes here...';
 var vBlanket=document.createElement('div');
 vBlanket.setAttribute('id','vBlanket');
 vBlanket.style.display="none";
 vBlanket.style.backgroundColor="#111";
 vBlanket.style.opacity=0.65;
 vBlanket.style.filter="alpha(opacity=65)";
 vBlanket.style.position="absolute";
 vBlanket.style.zIndex="9001";
 vBlanket.style.top="0px";
 vBlanket.style.left="0px";
 vBlanket.style.width="100%"; 
 document.body.appendChild(vBlanket);
 var vNoter=document.createElement('div');
 vNoter.setAttribute('id','vNoter');
 vNoter.style.display="none";
 vNoter.style.textAlign="center";
 vNoter.style.position="absolute";
 vNoter.style.backgroundColor="#eeeeee";
 vNoter.style.width="600px";
 vNoter.style.height="300px";
 vNoter.style.zIndex="9002";
 vNoter.innerHTML='<br />';
 var vNoterText=document.createElement('textarea');
 vNoterText.setAttribute('id','vNoterText');
 vNoterText.style.width="570px";
 vNoterText.style.height="240px";
 vNoterText.innerHTML=vData;
 vNoter.appendChild(vNoterText);
 document.body.appendChild(vNoter);
 var vNoterButtonSave=document.createElement('input');
 vNoterButtonSave.setAttribute('type','button');
 vNoterButtonSave.setAttribute('value','Save');
 vNoterButtonSave.setAttribute('id','vNoterSave');
 vNoterButtonSave.setAttribute('onClick',"localStorage.setItem('vNoterData',document.getElementById('vNoterText').value);document.getElementById('vBlanket').style.display='none';document.getElementById('vNoter').style.display='none';");
 vNoter.appendChild(vNoterButtonSave);
 var vNoterButtonCancel=document.createElement('input');
 vNoterButtonCancel.setAttribute('type','button');
 vNoterButtonCancel.setAttribute('value','Cancel');
 vNoterButtonCancel.setAttribute('id','vNoterCancel');
 vNoterButtonCancel.setAttribute('onClick',"if (typeof window.innerWidth != 'undefined') {viewportheight = window.innerHeight;} else {viewportheight = document.documentElement.clientHeight;} if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {blanket_height = viewportheight;} else {if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {blanket_height = document.body.parentNode.clientHeight;} else {blanket_height = document.body.parentNode.scrollHeight;}} var blanket = document.getElementById('vBlanket');blanket.style.height = blanket_height + 'px';var popUpDiv = document.getElementById('vNoter');popUpDiv_height=blanket_height/2-150;popUpDiv.style.top = popUpDiv_height + 'px';if (typeof window.innerWidth != 'undefined') {viewportwidth = window.innerHeight;} else {viewportwidth = document.documentElement.clientHeight;}if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {window_width = viewportwidth;} else {if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {window_width = document.body.parentNode.clientWidth;} else {window_width = document.body.parentNode.scrollWidth;}}var popUpDiv = document.getElementById('vNoter');window_width=window_width/2-150;popUpDiv.style.left = window_width + 'px';document.getElementById('vBlanket').style.display='none';document.getElementById('vNoter').style.display='none';");
 vNoter.appendChild(vNoterButtonCancel);    
 vLastSeq=''; 
 window.addEventListener('keydown', f30KeyCheck, true); }
function f30KeyCheck(V) {
 switch(V.keyCode) {  
  case 39:
   if (vLastSeq=='38384040373937') {
    if (typeof window.innerWidth != 'undefined') {viewportheight = window.innerHeight;} else {viewportheight = document.documentElement.clientHeight;}
    if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {blanket_height = viewportheight;} else {if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {blanket_height = document.body.parentNode.clientHeight;} else {blanket_height = document.body.parentNode.scrollHeight;}}
    var blanket = document.getElementById('vBlanket');
    blanket.style.height = blanket_height + 'px';
    var popUpDiv = document.getElementById('vNoter');
    popUpDiv_height=blanket_height/2-150;
    popUpDiv.style.top = popUpDiv_height + 'px';
    if (typeof window.innerWidth != 'undefined') {viewportwidth = window.innerHeight;} else {viewportwidth = document.documentElement.clientHeight;}
    if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {window_width = viewportwidth;} else {if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {window_width = document.body.parentNode.clientWidth;} else {window_width = document.body.parentNode.scrollWidth;}}
    var popUpDiv = document.getElementById('vNoter');
    window_width=window_width/2-300;
    popUpDiv.style.left = window_width + 'px';
    document.getElementById('vBlanket').style.display='block';
    document.getElementById('vNoter').style.display='block';
    break;   } }
 var vLastKey=(V.keyCode<10?'0':'')+V.keyCode;
 if(vLastSeq.length<14) {
  vLastSeq+=vLastKey;
 } else {
  vLastSeq=vLastSeq.slice(-12)+vLastKey; }}
function nullZero(vItem) {
 var vReturn=(vItem==null) ? '0' : vItem;
 return vReturn; }
function Pad2Digits(vNumber){ return (vNumber<10?'0':'')+vNumber; }
function Pad3Digits(vNumber){ return (vNumber<100?'0':'')+vNumber; }
function fHoursToTime(vHourCount) {
 var vHours, vMinutes, vSeconds, vRem;
 vHours=Math.floor(vHourCount);
 vRem=60*(vHourCount-vHours);
 vMinutes=Math.floor(vRem);
 vRem=60*(vRem-vMinutes);
 vSeconds=Math.floor(vRem);
 return(vHours+':'+Pad2Digits(vMinutes)+':'+Pad2Digits(vSeconds));}
function fHoursToMilliTime(vHourCount) {
 var vHours, vMinutes, vSeconds, vRem, vMilli, vMilliS;
 vHours=Math.floor(vHourCount);
 vRem=60*(vHourCount-vHours);
 vMinutes=Math.floor(vRem);
 vRem=60*(vRem-vMinutes);
 vSeconds=Math.floor(vRem);
 vMilli=Math.floor((vRem-vSeconds)*1000);
 vMilliS=("00"+vMilli.toString()).slice(-3);
 return(Pad2Digits(vHours)+':'+Pad2Digits(vMinutes)+':'+Pad2Digits(vSeconds)+'.'+vMilliS);}
function SecondsToTime(vSeconds){
 if (vSeconds>0) {
  var vSecLeft=vSeconds;
  vHour=parseInt(vSecLeft/3600);
  vSecLeft-=(vHour*3600);
  vMinute=parseInt(vSecLeft/60);
  vSecLeft-=(vMinute*60);
  vSecond=parseInt(vSecLeft);
  return Pad2Digits(vHour)+':'+Pad2Digits(vMinute)+':'+Pad2Digits(vSecond); }
 else {  return "Now!"; } }
function vTrim(vInString) { return vInString.replace(/^\s+|\s+$/g, ""); }
function TimeDifference(earlierDate,laterDate){
 var vMS=laterDate.getTime()-earlierDate.getTime();
 var vSec=vMS/1000;
 var vHrs=parseInt(vSec/60/24);
 var vMin=parseInt((vSec-vHrs*60*24)/60);
 var vSec=vSec-(vHrs*60*24)-(vMin*60);
 return Pad2Digits(vHrs)+':'+Pad2Digits(vMin)+':'+Pad2Digits(vSec);}
function AddTimeStringToDateVariable(vTimeString,vDateVar){
 var vTimeArray=vTimeString.split(':');
 var vNewTime=new Date();
 vNewTime.setTime(vDateVar.valueOf());
 vNewTime.setSeconds(vNewTime.getSeconds()+parseInt(vTimeArray[2]));
 vNewTime.setMinutes(vNewTime.getMinutes()+parseInt(vTimeArray[1]));
 vNewTime.setHours(vNewTime.getHours()+parseInt(vTimeArray[0]));
 return vNewTime;}
function GetTimeString(vDateVar){ return Pad2Digits(vDateVar.getHours())+':'+Pad2Digits(vDateVar.getMinutes())+':'+Pad2Digits(vDateVar.getSeconds()); }
function addNewStyle(newStyle) {
 //http://stackoverflow.com/questions/462537/
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}