// ==UserScript==
// @name          ParseEspionageReports
// @namespace     www.eljercode.com
// @description   Parses espionage reports, putting summary information in the subject lines
// @include       http://*playstarfleet*
// @version       2.0.3
// ==/UserScript==
// Thanks to Darth Brunus for the battlecalc link method

//a test to make sure on the messages window (I do this so entire script can be used with other page-specific scripts when pasted together)
var vURLTest=document.location.href.match(/\.com\/messages/i);
if (vURLTest != null) { 
 ParseEspionageReports(); 
 AddUpdateLink('http://eljercode.com/ParseEspionageReports.user.js','Update Espi Script'); }




ParseEspionageReports()
setInterval(ParseEspionageReports, 1000);
function ParseEspionageReports() {
  
    if (document.getElementById("SAMdone") != null) {return;}
var vMessageTable=document.getElementById('messages');
 var vMessages=vMessageTable.getElementsByTagName('tr');
 for (i=1;i<vMessages.length;i++) {
  var vRegExMatch=vMessages[i].getAttribute('class').match(/u?n?read message a?l?t?/);
  if (vRegExMatch != null) {
   var vRegExMatch=vMessages[i].innerHTML.match(/Espionage Report for /);
   if (vRegExMatch != null) {
    var vSubjectLine=vMessages[i].getElementsByTagName('td')[1];
    var vOrigMessage=vMessages[i+1].getElementsByTagName('td')[0].getElementsByTagName('DIV')[1];
    var vOrigMessageTxt=vOrigMessage.innerHTML;
    var espiData=ParseEspiReport(vOrigMessageTxt);
    var vLinks=vOrigMessage.getElementsByTagName('a');
    var vLinkInfo='&nbsp;'
    for (j=1;j<vLinks.length;j++) { 
     vLinkInfo+='&nbsp;|&nbsp;'+vLinks[j].parentNode.innerHTML; 
    }
    vLinkInfo+='&nbsp;|&nbsp;'+vMessages[i+1].getElementsByTagName('td')[0].getElementsByTagName('DIV')[2].getElementsByTagName('a')[0].parentNode.innerHTML;
    vMessages[i+1].getElementsByTagName('td')[0].getElementsByTagName('DIV')[2].innerHTML='';

    var vDios=0;
    var vShips=0;
    var vDebris=0;
    var vRes=Math.ceil((parseInt(espiData[6].replace(/,/g,""))+parseInt(espiData[7].replace(/,/g,""))+parseInt(espiData[8].replace(/,/g,"")))/1000);
    var debrisAmount=GetDebrisAmounts();
    for (j=10;j<26;j++) {
     if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""))>0) { 
      var vShipCount=parseInt(espiData[j].replace(/,/g,""));
      vShips+=vShipCount;
      vDebris+=(vShipCount*debrisAmount[j]); } }
    var vDefenses=0;
    for (j=26;j<36;j++) {if (j!=30&&j!=32) {if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""))>0) { vDefenses+=parseInt(espiData[j].replace(/,/g,"")); }}}
    vDios=(Math.ceil(vDebris/2000)/10);
    if (espiData[9].length==0) { 
     vShips='?';
     vDios='?' }
    if (espiData[53].length==0) { vDefenses='?'; }
    vSubjectLine.innerHTML=espiData[0].substr(0,1)+'&nbsp;Res:'+vRes+'k&nbsp;S:'+vShips+'&nbsp;D:'+vDefenses+'&nbsp;Dios:'+vDios;
    
    var vToggleLink='<a href="#" onClick="if(document.getElementById(&quot;MsgData'+i+'&quot;).style.display==&quot;&quot;){document.getElementById(&quot;MsgData'+i+'&quot;).style.display=&quot;none&quot;;}else{document.getElementById(&quot;MsgData'+i+'&quot;).style.display=&quot;&quot;;};return false">Toggle original report</a>';
	 vBattleCalcLink='&nbsp;|&nbsp;&nbsp;<a href="http://www.battlecalc.com/log_parse?parse_to=/&parseLog=1&log_input='+encodeURIComponent(vOrigMessageTxt.trim().replace(/<br[^>]*>/g,"\n").replace(/<(.|\n)*?>/g,"")).replace(/!/gm,'%21').replace(/'/gm,'%27').replace(/\(/gm,'%28').replace(/\)/gm,'%29').replace(/\*/gm,'%2A')+'" target="_blank">Battlecalc</a>';

    vOrigMessage.innerHTML=FormatEspiMessage(espiData,vShips,vDefenses,vDios);
    vOrigMessage.innerHTML+='<br />'+vOrigMessageTxt.match(/The chance of your probes being intercepted is \d+\%/im)[0];
    vOrigMessage.innerHTML+='<br /><br />'+vToggleLink+vLinkInfo+vBattleCalcLink+'<div id="MsgData'+i+'" style="display:none"><br />'+vOrigMessageTxt+'</div>';

    }  } }
var sign = document.createElement("div");
    sign.setAttribute("id", "SAMdone");
    sign.setAttribute("style", "display: none");
    document.getElementById("message_table").appendChild(sign);
}
//9-ships, 53-defenses, 54-buildings, 55-techs

var errMsgElem = document.getElementsByClassName('description');
var errMsg = errMsgElem[0];
errMsg.innerHTML += " <span style='color: rgb(10, 255, 10);'>" + mescount + " Espi Reports Uploaded.</span>";


function ParseEspiReport(vEspi) {
 var vData=new Array();
 vData[0]=ParseEspiField(vEspi,/(Planet|Moon|Hephaestus Class Attack Platform) ([^\x00]*?) <a href="/m,1);
 vData[1]=ParseEspiField(vEspi,/(Planet|Moon|Hephaestus Class Attack Platform) ([^\x00]*?) <a href="/m,2);
 vData[2]=ParseEspiField(vEspi,/(\[\d{1,2}:\d{1,3}:\d{1,2}m?\])</m,1);
 vData[3]=ParseEspiField(vEspi,/\[(\d{1,2}):\d{1,3}:\d{1,2}m?\]</m,1);
 vData[4]=ParseEspiField(vEspi,/\[\d{1,2}:(\d{1,3}):\d{1,2}m?\]</m,1);
 vData[5]=ParseEspiField(vEspi,/\[\d{1,2}:\d{1,3}:(\d{1,2})m?\]</m,1);
 vData[6]=ParseEspiField(vEspi,/\* ore: ([0-9,]+)/m,1);
 vData[7]=ParseEspiField(vEspi,/\* crystal: ([0-9,]+)/m,1);
 vData[8]=ParseEspiField(vEspi,/\* hydrogen: ([0-9,]+)/m,1);
 vData[9]=ParseEspiField(vEspi,/hydrogen: [0-9,]+.*>([^\x00]+?)'S SHIPS:</m,1);
 vData[10]=ParseEspiField(vEspi,/\* Hermes Class Probe: ([\d,]+)/m,1);
 vData[11]=ParseEspiField(vEspi,/\* Helios Class Solar Satellite: ([\d,]+)/m,1);
 vData[12]=ParseEspiField(vEspi,/\* Artemis Class Fighter: ([\d,]+)/m,1);
 vData[13]=ParseEspiField(vEspi,/\* Atlas Class Cargo: ([\d,]+)/m,1);
 vData[14]=ParseEspiField(vEspi,/\* Apollo Class Fighter: ([\d,]+)/m,1);
 vData[15]=ParseEspiField(vEspi,/\* Charon Class Transport: ([\d,]+)/m,1);
 vData[16]=ParseEspiField(vEspi,/\* Hercules Class Cargo: ([\d,]+)/m,1);
 vData[17]=ParseEspiField(vEspi,/\* Dionysus Class Recycler: ([\d,]+)/m,1);
 vData[18]=ParseEspiField(vEspi,/\* Poseidon Class Cruiser: ([\d,]+)/m,1);
 vData[19]=ParseEspiField(vEspi,/\* Gaia Class Colony Ship: ([\d,]+)/m,1);
 vData[20]=ParseEspiField(vEspi,/\* Athena Class Battleship: ([\d,]+)/m,1);
 vData[21]=ParseEspiField(vEspi,/\* Ares Class Bomber: ([\d,]+)/m,1);
 vData[22]=ParseEspiField(vEspi,/\* Hades Class Battleship: ([\d,]+)/m,1);
 vData[23]=ParseEspiField(vEspi,/\* Prometheus Class Destroyer: ([\d,]+)/m,1);
 vData[24]=ParseEspiField(vEspi,/\* Zeus Class: ([\d,]+)/m,1);
 vData[25]=ParseEspiField(vEspi,/\* Hephaestus Class Attack Platform: ([\d,]+)/m,1);
 vData[26]=ParseEspiField(vEspi,/\* Missile Battery: ([\d,]+)/m,1);
 vData[27]=ParseEspiField(vEspi,/\* Laser Cannon: ([\d,]+)/m,1);
 vData[28]=ParseEspiField(vEspi,/\* Pulse Cannon: ([\d,]+)/m,1);
 vData[29]=ParseEspiField(vEspi,/\* Particle Cannon: ([\d,]+)/m,1);
 vData[30]=ParseEspiField(vEspi,/\* Anti-Ballistic Missile: ([\d,]+)/m,1);
 vData[31]=ParseEspiField(vEspi,/\* Decoy: ([\d,]+)/m,1);
 vData[32]=ParseEspiField(vEspi,/\* Interplanetary Ballistic Missile: ([\d,]+)/m,1);
 vData[33]=ParseEspiField(vEspi,/\* Gauss Cannon: ([\d,]+)/m,1);
 vData[34]=ParseEspiField(vEspi,/\* Large Decoy: ([\d,]+)/m,1);
 vData[35]=ParseEspiField(vEspi,/\* Plasma Cannon: ([\d,]+)/m,1);
 vData[36]=ParseEspiField(vEspi,/\* Ore Warehouse: ([\d,]+)/m,1);
 vData[37]=ParseEspiField(vEspi,/\* Crystal Warehouse: ([\d,]+)/m,1);
 vData[38]=ParseEspiField(vEspi,/\* Hydrogen Storage: ([\d,]+)/m,1);
 vData[39]=ParseEspiField(vEspi,/\* Ore Mine: ([\d,]+)/m,1);
 vData[40]=ParseEspiField(vEspi,/\* Crystal Mine: ([\d,]+)/m,1);
 vData[41]=ParseEspiField(vEspi,/\* Hydrogen Synthesizer: ([\d,]+)/m,1);
 vData[42]=ParseEspiField(vEspi,/\* Armor Tech: ([\d,]+)/m,1);
 vData[43]=ParseEspiField(vEspi,/\* Weapons Tech: ([\d,]+)/m,1);
 vData[44]=ParseEspiField(vEspi,/\* Shield Tech: ([\d,]+)/m,1);
 vData[45]=ParseEspiField(vEspi,/\* Jet Drive: ([\d,]+)/m,1);
 vData[46]=ParseEspiField(vEspi,/\* Pulse Drive: ([\d,]+)/m,1);
 vData[47]=ParseEspiField(vEspi,/\* Warp Drive: ([\d,]+)/m,1);
 vData[48]=ParseEspiField(vEspi,/\* A.I. Tech: ([\d,]+)/m,1);
 vData[49]=ParseEspiField(vEspi,/\* Espionage Tech: ([\d,]+)/m,1);
 vData[50]=ParseEspiField(vEspi,/\* Lunar Base: ([\d,]+)/m,1);
 vData[51]=ParseEspiField(vEspi,/\* Oracle: ([\d,]+)/m,1);
 vData[52]=ParseEspiField(vEspi,/\* Warp Gate: ([\d,]+)/m,1);
 vData[53]=ParseEspiField(vEspi,/(DEFENSES:)/m,1);
 vData[54]=ParseEspiField(vEspi,/(BUILDINGS:)/m,1);
 vData[55]=ParseEspiField(vEspi,/(TECHS:)/m,1);
 cleanedArray = vData.join(";");
 return vData; }

function ParseEspiField(vReport,vRegEx,vMatchNo) {
 var vReturn='';
 var vREMatch=vReport.match(vRegEx);
 if (vREMatch != null) {  vReturn=vREMatch[vMatchNo]; }
 return vReturn;}

function addCommas(vNumber) {
 while (/(\d+)(\d{3})/.test(vNumber)) {vNumber = vNumber.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');}
 return vNumber;}

function FormatEspiMessage(espiData,vShips,vDefenses,vDios) {
 var currPlanet='';
 var vURLTest=document.location.href.match(/_planet=(\d+)/i);
 if (vURLTest != null) { currPlanet=vURLTest[1]; }
 var vText=espiData[0]+' '+espiData[1]+' '+ReturnSystemLink(espiData[2],currPlanet)+'  has: <br />';

 var vOreMine=parseInt(espiData[39]);
 var vCryMine=parseInt(espiData[40]);
 var vHydMine=parseInt(espiData[41]);

 var vOreCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[36])))+1)).toString());
 var vCryCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[37])))+1)).toString());
 var vHydCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[38])))+1)).toString());
 
 var vExtremeTest=document.location.href.match(/extreme\.com/i);
 if (vExtremeTest==null) { var vSpeedMultiplier=1; } else { var vSpeedMultiplier=2; }
 var vMineProdTest=document.location.href.match(/uni2\.playstarfleet/i);
 if (vMineProdTest==null) { var vMineProdBase=1.1; } else { var vMineProdBase=1.14; }

 var vOreDroids=(((vOreMine-(vOreMine % 3))/3+1)*2)/100+1;
 var vCryDroids=(((vCryMine-(vCryMine % 3))/3+1)*2)/100+1;
 var vHydDroids=(((vHydMine-(vHydMine % 3))/3+1)*2)/100+1;

 var vOreProd=Math.floor(Math.floor(30*vOreMine*Math.pow(vMineProdBase,vOreMine))*vOreDroids*vSpeedMultiplier)+20*vSpeedMultiplier;
 var vCryProd=Math.floor(Math.floor(20*vCryMine*Math.pow(vMineProdBase,vCryMine)+10)*vCryDroids*vSpeedMultiplier);
 var vHydProd=Math.floor((12*vHydMine*Math.pow(vMineProdBase,vHydMine)*1.24*vHydDroids)*vSpeedMultiplier);
 var vOreProdStr=addCommas(vOreProd.toString());
 var vCryProdStr=addCommas(vCryProd.toString());
 var vHydProdStr=addCommas(vHydProd.toString());

 var vOreAmt=parseInt(espiData[6].replace(/,/g,''));
 var vCryAmt=parseInt(espiData[7].replace(/,/g,''));
 var vHydAmt=parseInt(espiData[8].replace(/,/g,''));

 var vOreTime=vOreAmt/vOreProd;
 var vCryTime=vCryAmt/vCryProd;

 var vOreHH=parseInt(vOreTime);
 var vCryHH=parseInt(vCryTime);
 var vOreHHStr=vOreHH.toString();
 var vCryHHStr=vCryHH.toString();

 var vOreMM=parseInt(60*(vOreTime-vOreHH));
 var vCryMM=parseInt(60*(vCryTime-vCryHH));
 var vOreMMStr=vOreMM.toString();
 var vCryMMStr=vCryMM.toString();
 if (vOreMMStr.length==1) { vOreMMStr='0'+vOreMMStr; }
 if (vCryMMStr.length==1) { vCryMMStr='0'+vCryMMStr; }
 
 var vOreSS=parseInt((vOreTime-vOreHH-vOreMM/60)*3600);
 var vCrySS=parseInt((vCryTime-vCryHH-vCryMM/60)*3600);
 var vOreSSStr=vOreSS.toString();
 var vCrySSStr=vCrySS.toString();
 if (vOreSSStr.length==1) { vOreSSStr='0'+vOreSSStr; }
 if (vCrySSStr.length==1) { vCrySSStr='0'+vCrySSStr; }
 
 var vOreTimeStr=vOreHHStr+':'+vOreMMStr+':'+vOreSSStr;
 var vCryTimeStr=vCryHHStr+':'+vCryMMStr+':'+vCrySSStr;

 if(espiData[36].length==0) {
  if(espiData[0]=='Planet'){
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
 var vDSPs=0;
 for (j=10;j<26;j++) {
  if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""))>0) { 
   var vShipCount=parseInt(espiData[j].replace(/,/g,""));
   vDSPs+=(vShipCount*DSPAmount[j]); } }
 var vDSP=addCommas((Math.ceil(vDSPs/100)/10).toString());

 var vTotal=parseInt(espiData[6].replace(/,/g,""))+parseInt(espiData[7].replace(/,/g,""))+parseInt(espiData[8].replace(/,/g,""));
 var vTotalPlunder=parseInt(vTotal/2);
 var vTotalToPlunder=addCommas(vTotalPlunder.toString());

 var vHermesNeeded=Math.ceil(vTotalPlunder/5);
 var vArtemisNeeded=Math.ceil(vTotalPlunder/50);
 var vAtlasNeeded=Math.ceil(vTotalPlunder/5000);
 var vApolloNeeded=Math.ceil(vTotalPlunder/100);
 var vCharonNeeded=Math.ceil(vTotalPlunder/100);
 var vHerculesNeeded=Math.ceil(vTotalPlunder/25000);
 var vDionysusNeeded=Math.ceil(vTotalPlunder/20000);
 var vPoseidonNeeded=Math.ceil(vTotalPlunder/800);
 var vGaiaNeeded=Math.ceil(vTotalPlunder/7500);
 var vAthenaNeeded=Math.ceil(vTotalPlunder/1500);
 var vAresNeeded=Math.ceil(vTotalPlunder/500);
 var vHadesNeeded=Math.ceil(vTotalPlunder/750);
 var vPrometheusNeeded=Math.ceil(vTotalPlunder/2000);
 var vZeusNeeded=Math.ceil(vTotalPlunder/1000000);
 var vHephaestusNeeded=Math.ceil(vTotalPlunder/1000000000);
 var vPlunderTitle='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+' Charon:'+vCharonNeeded+String.fromCharCode(10);
 vPlunderTitle+='Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+' Posi:'+vPoseidonNeeded+' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+String.fromCharCode(10);
 vPlunderTitle+='Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+' Heph:'+vHephaestusNeeded;

 vText+='* ore: '+espiData[6]+' &nbsp;<span style="color: grey;">'+vOreData+'</span><br />';
 vText+='* crystal: '+espiData[7]+' &nbsp;<span style="color: grey;">'+vCryData+'</span><br />';
 vText+='* hydrogen: '+espiData[8]+' &nbsp;<span style="color: grey;">'+vHydData+'</span><br />';
 vText+='================================<br />';
 vText+='<span title="'+vPlunderTitle+'">'
 vText+='Total plunder: '+vTotalToPlunder+' ('+Math.ceil(vTotal/50000)+' herc / '+Math.ceil(vTotal/10000)+' atlas)<br />';
 vText+='</span>';
 vText+='Dios needed: '+vDios+' ('+vDSP+' DSP)<br />';

 if (espiData[9].length==0) {
  vText+='<br />* Player name not retrieved.<br />';
  vText+='* Ship data not retrieved.<br />';
 } 
 else {
  vText+='<br />'+espiData[9]+"'S SHIPS:<br />";
  if (espiData[10].length>0 && parseInt(espiData[10].replace(/,/g,""))>0) { vText+='* Hermes Class Probe: '+espiData[10]+'<br />'; }
  if (espiData[11].length>0 && parseInt(espiData[11].replace(/,/g,""))>0) { vText+='* Helios Class Solar Satellite: '+espiData[11]+'<br />'; }
  if (espiData[12].length>0 && parseInt(espiData[12].replace(/,/g,""))>0) { vText+='* Artemis Class Fighter: '+espiData[12]+'<br />'; }
  if (espiData[13].length>0 && parseInt(espiData[13].replace(/,/g,""))>0) { vText+='* Atlas Class Cargo: '+espiData[13]+'<br />'; }
  if (espiData[14].length>0 && parseInt(espiData[14].replace(/,/g,""))>0) { vText+='* Apollo Class Fighter: '+espiData[14]+'<br />'; }
  if (espiData[15].length>0 && parseInt(espiData[15].replace(/,/g,""))>0) { vText+='* Charon Class Transport: '+espiData[15]+'<br />'; }
  if (espiData[16].length>0 && parseInt(espiData[16].replace(/,/g,""))>0) { vText+='* Hercules Class Cargo: '+espiData[16]+'<br />'; }
  if (espiData[17].length>0 && parseInt(espiData[17].replace(/,/g,""))>0) { vText+='* Dionysus Class Recycler: '+espiData[17]+'<br />'; }
  if (espiData[18].length>0 && parseInt(espiData[18].replace(/,/g,""))>0) { vText+='* Poseidon Class Cruiser: '+espiData[18]+'<br />'; }
  if (espiData[19].length>0 && parseInt(espiData[19].replace(/,/g,""))>0) { vText+='* Gaia Class Colony Ship: '+espiData[19]+'<br />'; }
  if (espiData[20].length>0 && parseInt(espiData[20].replace(/,/g,""))>0) { vText+='* Athena Class Battleship: '+espiData[20]+'<br />'; }
  if (espiData[21].length>0 && parseInt(espiData[21].replace(/,/g,""))>0) { vText+='* Ares Class Bomber: '+espiData[21]+'<br />'; }
  if (espiData[22].length>0 && parseInt(espiData[22].replace(/,/g,""))>0) { vText+='* Hades Class Battleship: '+espiData[22]+'<br />'; }
  if (espiData[23].length>0 && parseInt(espiData[23].replace(/,/g,""))>0) { vText+='* Prometheus Class Destroyer: '+espiData[23]+'<br />'; }
  if (espiData[24].length>0 && parseInt(espiData[24].replace(/,/g,""))>0) { vText+='* Zeus Class: '+espiData[24]+'<br />'; }
  if (espiData[25].length>0 && parseInt(espiData[25].replace(/,/g,""))>0) { vText+='* Hephaestus Class Attack Platform: '+espiData[25]+'<br />'; }
 }
 
 vText+='<br />DEFENSES:<br />';
 if (espiData[53].length==0) { 
  vText+='* Defense data not retrieved.<br />'; }
 else {
  if (espiData[26].length>0 && parseInt(espiData[26].replace(/,/g,""))>0) { vText+='* Missile Battery: '+espiData[26]+'<br />'; }
  if (espiData[27].length>0 && parseInt(espiData[27].replace(/,/g,""))>0) { vText+='* Laser Cannon: '+espiData[27]+'<br />'; }
  if (espiData[28].length>0 && parseInt(espiData[28].replace(/,/g,""))>0) { vText+='* Pulse Cannon: '+espiData[28]+'<br />'; }
  if (espiData[29].length>0 && parseInt(espiData[29].replace(/,/g,""))>0) { vText+='* Particle Cannon: '+espiData[29]+'<br />'; }
  if (espiData[33].length>0 && parseInt(espiData[33].replace(/,/g,""))>0) { vText+='* Gauss Cannon: '+espiData[33]+'<br />'; }
  if (espiData[35].length>0 && parseInt(espiData[35].replace(/,/g,""))>0) { vText+='* Plasma Cannon: '+espiData[35]+'<br />'; }
  if (espiData[31].length>0 && parseInt(espiData[31].replace(/,/g,""))>0) { vText+='* Decoy: '+espiData[31]+'<br />'; }
  if (espiData[34].length>0 && parseInt(espiData[34].replace(/,/g,""))>0) { vText+='* Large Decoy: '+espiData[34]+'<br />'; }
  if (espiData[30].length>0 && parseInt(espiData[30].replace(/,/g,""))>0) { vText+='* Anti-Ballistic Missile: '+espiData[30]+'<br />'; }
  if (espiData[32].length>0 && parseInt(espiData[32].replace(/,/g,""))>0) { vText+='* Interplanetary Ballistic Missile: '+espiData[32]+'<br />'; }
 }

 vText+='<br />TECHS:';
 if (espiData[55].length==0) { 
  vText+='<br />* Tech data not retrieved.<br />'; }
 else {
  vText+=' (Espi '+espiData[49]+', AI '+espiData[48]+', Jet '+espiData[45]+', Pulse '+espiData[46]+', Warp '+espiData[47]+')<br />'; 
  vText+='* Armor Tech: '+espiData[42]+'<br />* Weapons Tech: '+espiData[43]+'<br />* Shield Tech: '+espiData[44]+'<br />';
 }
 
 if(espiData[0]=='Moon'){
  vText+='<br />MOON BUILDINGS:<br />';
  if (espiData[55].length==0) { 
   vText+='* Building data not retrieved.<br />'; }
  else {
   vText+='* Oracle: '+espiData[51]+'<br />';
   vText+='* Warp Gate: '+espiData[52]+'<br />';
   vText+='* Lunar Base: '+espiData[50]+'<br />';
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
 var PlanetMatch=PlanetInBrackets.match(/\[(\d{1,2}):(\d{1,3}):\d{1,2}m?\]/im);
 var PlanetLink=''; 
 if (PlanetMatch != null) {    PlanetLink='<a href="/galaxy/show?current_planet='+CurrentPlanet+'&amp;galaxy='+PlanetMatch[1]+'&amp;solar_system='+PlanetMatch[2]+'">'+PlanetInBrackets+'</a>';   }
 return PlanetLink;}
 
function GetDebrisAmounts() {
 var DebrisAmts=new Array();
 DebrisAmts[10]=300; //hermes
 DebrisAmts[11]=600; //helios
 DebrisAmts[12]=1200; //arty
 DebrisAmts[13]=1200; //atlas
 DebrisAmts[14]=2550; //apollo
 DebrisAmts[15]=2400; //charon
 DebrisAmts[16]=3600; //herc
 DebrisAmts[17]=4800; //dion
 DebrisAmts[18]=8100; //pos
 DebrisAmts[19]=9000; //gaia
 DebrisAmts[20]=18000; //athena
 DebrisAmts[21]=22500; //ares
 DebrisAmts[22]=21000; //hades
 DebrisAmts[23]=33000; //prom
 DebrisAmts[24]=2700000; //zeus
 DebrisAmts[25]=12000000; //heph
 return DebrisAmts;}
 
 function GetDSPAmounts() {
 var DSPAmts=new Array();
 DSPAmts[10]=1000; //hermes
 DSPAmts[11]=2500; //helios
 DSPAmts[12]=4000; //arty
 DSPAmts[13]=4000; //atlas
 DSPAmts[14]=8500; //apollo
 DSPAmts[15]=9000; //charon
 DSPAmts[16]=12000; //herc
 DSPAmts[17]=18000; //dion
 DSPAmts[18]=29000; //pos
 DSPAmts[19]=40000; //gaia
 DSPAmts[20]=60000; //athena
 DSPAmts[21]=90000; //ares
 DSPAmts[22]=85000; //hades
 DSPAmts[23]=125000; //prom
 DSPAmts[24]=10000000; //zeus
 DSPAmts[25]=50000000; //heph
 return DSPAmts;}