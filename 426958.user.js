// ==UserScript==
// @name          AddResTotal
// @namespace     http://www.eljercode.com
// @description   Add Resources Total to Fleets Page, as well as the number of cargo ships to transport all resources
// @include       http://*starfleet*.com/fleet*
// @include       http://*starfleet*.com/buildings/shipyard*
// @include       http://*starfleet*.com/galaxy/show*
// @include       http://*starfleet*.com/messages*
// @include       http://*stardrift*.com/fleet*
// @include       http://*stardrift*.com/buildings/shipyard*
// @include       http://*stardrift*.com/galaxy/show*
// @include       http://*stardrift*.com/messages*
// @version       2.5.1
// ==/UserScript==
// 2.5.1   update for the Res and Ship counts in Conquest
// 2.1.0.2 Big thanks to Brad C for sending me a fix for BFG using the assign_fleet div
// 2.1.0.3 fixing the hooks to various elements caused by switch from table to div for resource listing
// 2.1.0.4 added MaxOCH MaxHCO MaxCHO buttons 
// 2.2     Added "dios needed" to title/hover of DFs on the galaxy screen -- thanks 16 of 26 for the idea
// 2.2.0.1 fixed an oversight from 2.2s consolidation
// 2.2.1   added (dio count) to 'dispatch fleet' box
// 2.3     a few changes
//         added trade calculation to hover box on resources
//         added hook into trade and transfer windows
//         updates herc/atlas amounts at top to coincide with resource ticker
//         added amount of how many *more* cargos needed
//         added box to "send max res for ____ ship"
//         changed process when clicking "how many cargos needed" numbers to accomodate necessary hydro
//         still no sde support, UI changed again there and will adapt once done
// 2.3.1   added the herc counts to incoming trade request popups
// 2.3.2   added some sde support
// 2.3.3   removed popup support for SDE for now, added update notification
// 2.3.4   moved update notification code to the end, hoping that fixes annoying stylesheet issues
// 2.3.5   removed update notification until i can fix the bug
// 2.3.6   adjusting for new UI
// 2.3.7   adding more to SDE
// 2.3.8   removed OCH CHO HCO buttons per BFG -- violates one-click-to-one-game-action requirement of scripts
// 2.3.9   added MaxAllRes buttons back in, per agreement with Matt H and Matt M.
// 2.4.0   added new nova ships
// 2.4.1   fixed the spacing between hydrogen\total\c/h/a lines, fixed the carm (#) click on fleet screen
// 2.4.2   fixed ships needed to remove nova ships in non-nova unis
// 2.4.3   add zags to hoverover DFs
// 2.4.4   add keyup events
// 2.4.5   add zags to hoverover DFs everywhere in starfleet
// 2.4.6   add carms everywhere in starfleet
// 2.5     new UI update



var vStardrift=(/stardrift/i.test(document.location.href));
var vNovaTourney=(/nova|tournament/i.test(document.location.href));
if(!vStardrift) setInterval(fCheckEverySecond,1000);

function fCheckEverySecond() {
 if(/\.com(\/galaxy\/show|\/messages)/i.test(document.location.href)) {
  if(document.getElementById('assign_fleet')!=null) {
   if(document.getElementById('vTradeOrTransport')==null) {
    var vAssignFleet=document.getElementById('assign_fleet');
    var vDiv=document.createElement('div');
    vDiv.setAttribute('id','vTradeOrTransport');
    vAssignFleet.appendChild(vDiv);
     fAddCargoCountAfterShipCounts();
     fAddCargoCalculatorToFleetScreen();
   }
  }
 }
 fUpdateTotals();
}


var vHercCount, vAtlasCount, vDioCount, vCarmCount;
//run on fleet or shipyard screen
if(/\.com\/buildings\/shipyard|\.com\/fleet|\.com\/galaxy\/show/i.test(document.location.href)) {
 fAddTotalsSection();
 fUpdateTotals();
} 

//run on fleet screen
// //var vJeebusSeq='';
if(/\.com\/fleet/i.test(document.location.href)) { 
 fAddCargoCountAfterShipCounts();
 if(!vStardrift) {
  fAddCargoCalculatorToFleetScreen(); 
 } else { 
 // fAddCargoCalculatorToFleetScreenSDE(); 
 }
 fAddMax3ButtonsToFleetScreen();
 // //window.addEventListener('keydown', fWheresJeebus, true);
}

//run on galaxy screen
var vCurrentPlanet=GetClassItem(document,'div','legalese').innerHTML.match(/current_planet=(\d+)/)[1];
if(/\.com\/galaxy\/show/i.test(document.location.href)) {
 fAddDiosNeededToDFs();
}

//calculate total resources
function fAddTotalsSection() {
 //get hook to credit counter to add resource and cargo totals in its place
 if(vStardrift) { 
  var vTbl=document.getElementById('resources_table');
  var vPrimHei=vTbl.clientHeight;
  var vPrimTop=GetTop(vTbl);
  vTbl.style.top=(vPrimTop-vPrimHei)+"px";
  var vClearDiv=document.createElement('div');
  vClearDiv.setAttribute('class','clear');
  vTbl.appendChild(vClearDiv);
 } else {
  var vTbl=document.getElementById('resources_table');
 }

// var vClearDiv=document.createElement('div');
// vClearDiv.setAttribute('class','clear');
// document.getElementById('resources_table').appendChild(vClearDiv);
 
 //add new entry to table for Total Resources
 var newPDiv = document.createElement('div');
 newPDiv.setAttribute('id','vTotRes');
 newPDiv.setAttribute('class','row ore');
 var newDiv = document.createElement('div');
 newDiv.setAttribute('class','amount');
 newDiv.setAttribute('id','vTotalWithCommas');
 newDiv.innerHTML='0';
 newPDiv.appendChild(newDiv);
 document.getElementById('resources_table').appendChild(newPDiv);

// var vClearDiv=document.createElement('div');
// vClearDiv.setAttribute('class','clear');
// document.getElementById('resources_table').appendChild(vClearDiv);
 
 //add new entry to table for herc and atlas counts for transport
 var newPDiv = document.createElement('div');
 newPDiv.setAttribute('id','vTotShps');
 newPDiv.setAttribute('class','row ore');
 var newDiv = document.createElement('div');
 newDiv.setAttribute('class','amount');
 if(vStardrift) {
  newDiv.innerHTML+='<span id="vHercCount">0</span> / <span id="vAtlasCount">0</span>';
 } else {
  newDiv.innerHTML+='<span id="vCarmCount">0</span>/<span id="vHercCount">0</span>/<span id="vAtlasCount">0</span>';
 }
 newPDiv.appendChild(newDiv);
 document.getElementById('resources_table').appendChild(newPDiv);

  //remove merchant link, add classes
 if(vStardrift) {
  document.getElementById('vTotRes').setAttribute('class','row ore');
  document.getElementById('vTotShps').setAttribute('class','row crystal'); 
 } else { 
 }
 
 //shrink font size and row height
 addNewStyle('#header .main .resources .row {font-size: 12px; margin-bottom: 0px;}');
 addNewStyle('#header .resources .row {height: 18px;}');

 
}

function GetTop(ele) {
//http://morecavalier.com/index.php?whom=Code+Snippet+Library%2FJavaScript%2FGetLeft+and+GetTop
	if (ele.offsetParent) {
		return (ele.offsetTop + GetTop(ele.offsetParent));
	} else {
		return (ele.offsetTop);
 }
} 
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

function fUpdateTotals() {
 //calculate totals and add them to the screen
 var vTbl=document.getElementById('resources_table');
 var vOre=parseInt(GetClassItem(GetClassItemRX(vTbl,'div',/^row ore/i),'div','amount').innerHTML.replace(/,/g,''));
 var vCrys=parseInt(GetClassItem(GetClassItemRX(vTbl,'div',/^row crystal/i),'div','amount').innerHTML.replace(/,/g,''));
 var vHydro=parseInt(GetClassItem(GetClassItemRX(vTbl,'div',/^row hydrogen/i),'div','amount').innerHTML.replace(/,/g,''));
 GetClassItemRX(vTbl,'div',/^row ore/i).setAttribute("title",m(vOre,3));
 GetClassItemRX(vTbl,'div',/^row crystal/i).setAttribute("title", m(vCrys,3));
 GetClassItemRX(vTbl,'div',/^row hydrogen/i).setAttribute("title", m(vHydro,3));
 
 var vTotal = vOre+vCrys+vHydro;
 vHercCount=Math.ceil(vTotal/25000);
 vDioCount=Math.ceil(vTotal/20000);
 vAtlasCount=Math.ceil(vTotal/5000);
 vCarmCount=Math.ceil(vTotal/125000);
 //var vTotalWithCommas = addCommas(vTotal.toString());
 var vTotalWithCommas = m(vTotal,4);
 if(document.getElementById('vTotalWithCommas')) document.getElementById('vTotalWithCommas').innerHTML=vTotalWithCommas;
 if(document.getElementById('vCarmCount')) document.getElementById('vCarmCount').innerHTML=m(vCarmCount,2);
 if(document.getElementById('vHercCount')) document.getElementById('vHercCount').innerHTML=m(vHercCount,2);
 if(document.getElementById('vAtlasCount')) document.getElementById('vAtlasCount').innerHTML=m(vAtlasCount,2);
}
function m(n,d){x=(''+n).length,p=Math.pow,d=p(10,d)
	x-=x%3
return Math.round(n*d/p(10,x))/d+" KMBTQS"[x/3]}

//add herc and atlas count after ship counts
function fAddCargoCountAfterShipCounts() {
 var vOnClick, vClick, vQtyId, vValue
 if(document.getElementById('assign_fleet_form')==null) { return; }
 if(/trade\/accept/i.test(document.getElementById('assign_fleet_form').getAttribute('action'))) {
  //fCheckCargoInput();
 }
 vQtyId='676893046';
 if(document.getElementById('ship_quantity_'+vQtyId+'_max')) {
  vValue=parseInt(document.getElementById('ship_quantity_'+vQtyId+'_max').innerHTML,10);
  var vClick=(vAtlasCount>vValue) ? vValue : vAtlasCount;
  vOnClick='document.getElementById("ship_quantity_'+vQtyId+'").value="'+vClick+'"; return false;';
  document.getElementById('ship_quantity_'+vQtyId+'_max').parentNode.innerHTML+=" <span id='atlasQty' onclick='"+vOnClick+"'>("+vAtlasCount+")</span>";
 }
 vQtyId='960214949';
 if(document.getElementById('ship_quantity_'+vQtyId+'_max')) {
  vValue=parseInt(document.getElementById('ship_quantity_'+vQtyId+'_max').innerHTML,10);
  var vClick=(vDioCount>vValue) ? vValue : vDioCount;
  vOnClick='document.getElementById("ship_quantity_'+vQtyId+'").value="'+vClick+'"; return false;';
  document.getElementById('ship_quantity_'+vQtyId+'_max').parentNode.innerHTML+=" <span id='dioQty' onclick='"+vOnClick+"'>("+vDioCount+")</span>";
 }
 vQtyId='1168728674';
 if(document.getElementById('ship_quantity_'+vQtyId+'_max')) {
  vValue=parseInt(document.getElementById('ship_quantity_'+vQtyId+'_max').innerHTML,10);
  var vClick=(vHercCount>vValue) ? vValue : vHercCount;
  vOnClick='document.getElementById("ship_quantity_'+vQtyId+'").value="'+vClick+'"; return false;';
  document.getElementById('ship_quantity_'+vQtyId+'_max').parentNode.innerHTML+=" <span id='hercQty' onclick='"+vOnClick+"'>("+vHercCount+")</span>";
 }
 vQtyId='2073344062';
 if(document.getElementById('ship_quantity_'+vQtyId+'_max')) {
  vValue=parseInt(document.getElementById('ship_quantity_'+vQtyId+'_max').innerHTML,10);
  var vClick=(vCarmCount>vValue) ? vValue : vCarmCount;
  vOnClick='document.getElementById("ship_quantity_'+vQtyId+'").value="'+vClick+'"; return false;';
  document.getElementById('ship_quantity_'+vQtyId+'_max').parentNode.innerHTML+=" <span id='carmQty' onclick='"+vOnClick+"'>("+vCarmCount+")</span>";
 }
 vQtyId='2073344057';
 if(document.getElementById('ship_quantity_'+vQtyId+'_max')) {
  vValue=parseInt(document.getElementById('ship_quantity_'+vQtyId+'_max').innerHTML,10);
  var vClick=(vCarmCount>vValue) ? vValue : vCarmCount;
  vOnClick='document.getElementById("ship_quantity_'+vQtyId+'").value="'+vClick+'"; return false;';
  document.getElementById('ship_quantity_'+vQtyId+'_max').parentNode.innerHTML+=" <span id='carmQty' onclick='"+vOnClick+"'>("+vCarmCount+")</span>";
 }
}

//Add the cargo calculator to determine how many cargo ships are needed to send entered resources
function fAddCargoCalculatorToFleetScreen() {
 var vForm=document.getElementById('assign_fleet_form');
  var vFleetSelector=GetClassItem(vForm,'div','select_fleet');
  var vCargoCalculator='';
  var vTradeCalculator='';
  vCargoCalculator+='<div class="clear"></div><div class="normal summary" id="cargoCalculator">';
  vCargoCalculator+="Cargos needed for entered res: <span style='color:red;' title='How many more ships are needed, factoring in what you have selected so far'>(more)</span><br />";
  vCargoCalculator+="Atlas: <span style='color: rgb(10, 255, 10);' class='consumption' onclick='' id='neededAtlas'>0</span>&nbsp;<span style='color:red;'>(<span style='color:red;' id='moreAtlas' title='How many more ships are needed, factoring in what you have selected so far'>0</span>)</span><br />";
  vCargoCalculator+="Hercules: <span style='color: rgb(10, 255, 10);' class='consumption' onclick='' id='neededHercs'>0</span>&nbsp;<span style='color:red;'>(<span style='color:red;' id='moreHercs' title='How many more ships are needed, factoring in what you have selected so far'>0</span>)</span><br />";
  if(!vStardrift) vCargoCalculator+="Carmanor: <span style='color: rgb(10, 255, 10);' class='consumption' onclick='' id='neededCarms'>0</span>&nbsp;<span style='color:red;'>(<span style='color:red;' id='moreCarms' title='How many more ships are needed, factoring in what you have selected so far'>0</span>)</span><br />";
  vCargoCalculator+="<a href='javascript:void(0);' id='vRecalculate'>Force recalculate</a>";
  vCargoCalculator+="</div>";
  if(document.getElementById('trade_amount')) {
   vTradeCalculator+='<div class="clear"></div>';
   vTradeCalculator+='<div class="normal summary" style="text-align:center" id="tradeCalculator">';
   vTradeCalculator+=' <table align="center" border="1" style="border-color:white;border-width:1px;">';
   vTradeCalculator+='  <caption>';
   vTradeCalculator+='Trade limits (click table to refresh)<br />';
   vTradeCalculator+='Trading: <span id="vEnteredResAmt" style="color:white;font-weight:bold;">0</span> <span id="vEnteredResType" style="color:white;font-weight:bold;">ore</span>';
   vTradeCalculator+='</caption>';
   vTradeCalculator+='  <thead>';
   vTradeCalculator+='   <tr>';
   vTradeCalculator+='    <th colspan="3"><div id="vResTypeOne">Crystal</div></th>';
   vTradeCalculator+='    <th colspan="3"><div id="vResTypeTwo">Hydro</div></th>';
   vTradeCalculator+='   </tr>';
   vTradeCalculator+='   <tr>';
   vTradeCalculator+='    <th>Min</th>';
   vTradeCalculator+='    <th style="color:white;font-weight:bold;"><b>Standard</b></th>';
   vTradeCalculator+='    <th>Max</th>';
   vTradeCalculator+='    <th>Min</th>';
   vTradeCalculator+='    <th style="color:white;font-weight:bold;"><b>Standard</b></th>';
   vTradeCalculator+='    <th>Max</th>';
   vTradeCalculator+='   </tr>';
   vTradeCalculator+='  </thead>';
   vTradeCalculator+='  <tbody>';
   vTradeCalculator+='   <tr>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResOneMin">0</div></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><b><div id="vResOneStd" style="color:white;font-weight:bold;">0</div></b></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResOneMax">0</div></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResTwoMin">0</div></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><b><div id="vResTwoStd" style="color:white;font-weight:bold;">0</div></b></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResTwoMax">0</div></td>';
   vTradeCalculator+='   </tr>';
   vTradeCalculator+='  </tbody>';
   vTradeCalculator+=' </table>';
   vTradeCalculator+='</div>';
  }
  if(vFleetSelector){
   vFleetSelector.innerHTML+=vCargoCalculator+vTradeCalculator;
   if(/trade\/accept/i.test(vForm.getAttribute('action'))) fCheckCargoInput();
   if(document.getElementById('send_ore')) document.getElementById('send_ore').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('send_crystal')) document.getElementById('send_crystal').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('send_hydrogen')) document.getElementById('send_hydrogen').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('receive_amount')) document.getElementById('receive_amount').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('trade_type')) document.getElementById('trade_type').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('receive_type')) document.getElementById('receive_type').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('send_ore')) document.getElementById('send_ore').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('send_crystal')) document.getElementById('send_crystal').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('send_hydrogen')) document.getElementById('send_hydrogen').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("keyup",fCheckTradeInput,true);
   if(document.getElementById('receive_amount')) document.getElementById('receive_amount').addEventListener("keyup",fCheckTradeInput,true);
   if(document.getElementById('trade_type')) document.getElementById('trade_type').addEventListener("keyup",fCheckTradeInput,true);
   if(document.getElementById('receive_type')) document.getElementById('receive_type').addEventListener("keyup",fCheckTradeInput,true);
   document.getElementById('vRecalculate').addEventListener("click",fCheckCargoInput,true);
   vFleetSelector.addEventListener("click",fCheckCargoInput,true); 
   if(document.getElementById('tradeCalculator')) document.getElementById('tradeCalculator').addEventListener("click",fCheckTradeInput,true);
  }
// }
}

//Add the cargo calculator to determine how many cargo ships are needed to send entered resources
function fAddCargoCalculatorToFleetScreenSDE() {
 var vForm=document.getElementById('assign_fleet_form');
  var vFleetSelector=GetClassItem(vForm,'div','select_fleet');
  var vCargoCalculator='';
  var vTradeCalculator='';
  vCargoCalculator+=(vStardrift) ? '<div class="clear"></div><div id="cargoCalculator">' : '<div class="normal summary" id="cargoCalculator">';
  vCargoCalculator+="Cargos needed for entered res: <span style='color:red;' title='How many more ships are needed, factoring in what you have selected so far'>(more)</span><br />";
  vCargoCalculator+="Atlas: <span style='color: rgb(10, 255, 10);' class='consumption' onclick='' id='neededAtlas'>0</span>&nbsp;<span style='color:red;'>(<span style='color:red;' id='moreAtlas' title='How many more ships are needed, factoring in what you have selected so far'>0</span>)</span><br />";
  vCargoCalculator+="Hercules: <span style='color: rgb(10, 255, 10);' class='consumption' onclick='' id='neededHercs'>0</span>&nbsp;<span style='color:red;'>(<span style='color:red;' id='moreHercs' title='How many more ships are needed, factoring in what you have selected so far'>0</span>)</span><br />";
  vCargoCalculator+="<a href='javascript:void(0);' id='vRecalculate'>Force recalculate</a>";
  vCargoCalculator+="</div>";
  if(document.getElementById('trade_amount')) {
   vTradeCalculator+='<div class="clear"></div>';
   vTradeCalculator+='<div class="normal summary" style="text-align:center" id="tradeCalculator">';
   vTradeCalculator+=' <table align="center" border="1" style="border-color:white;border-width:1px;">';
   vTradeCalculator+='  <caption>';
   vTradeCalculator+='Trade limits (click table to refresh)<br />';
   vTradeCalculator+='Trading: <span id="vEnteredResAmt" style="color:white;font-weight:bold;">0</span> <span id="vEnteredResType" style="color:white;font-weight:bold;">ore</span>';
   vTradeCalculator+='</caption>';
   vTradeCalculator+='  <thead>';
   vTradeCalculator+='   <tr>';
   vTradeCalculator+='    <th colspan="3"><div id="vResTypeOne">Crystal</div></th>';
   vTradeCalculator+='    <th colspan="3"><div id="vResTypeTwo">Hydro</div></th>';
   vTradeCalculator+='   </tr>';
   vTradeCalculator+='   <tr>';
   vTradeCalculator+='    <th>Min</th>';
   vTradeCalculator+='    <th style="color:white;font-weight:bold;"><b>Standard</b></th>';
   vTradeCalculator+='    <th>Max</th>';
   vTradeCalculator+='    <th>Min</th>';
   vTradeCalculator+='    <th style="color:white;font-weight:bold;"><b>Standard</b></th>';
   vTradeCalculator+='    <th>Max</th>';
   vTradeCalculator+='   </tr>';
   vTradeCalculator+='  </thead>';
   vTradeCalculator+='  <tbody>';
   vTradeCalculator+='   <tr>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResOneMin">0</div></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><b><div id="vResOneStd" style="color:white;font-weight:bold;">0</div></b></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResOneMax">0</div></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResTwoMin">0</div></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><b><div id="vResTwoStd" style="color:white;font-weight:bold;">0</div></b></td>';
   vTradeCalculator+='    <td style="border-width:1px;border-color:white;" align="right"><div id="vResTwoMax">0</div></td>';
   vTradeCalculator+='   </tr>';
   vTradeCalculator+='  </tbody>';
   vTradeCalculator+=' </table>';
   vTradeCalculator+='</div>';
  }
  if(vFleetSelector){
   if(vStardrift) {
    GetClassItem(document,'div','normal summary').innerHTML+=vCargoCalculator+vTradeCalculator;
   } else {
    vFleetSelector.innerHTML+=vCargoCalculator+vTradeCalculator;
   }
   if(/trade\/accept/i.test(vForm.getAttribute('action'))) fCheckCargoInput();
   if(document.getElementById('send_ore')) document.getElementById('send_ore').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('send_crystal')) document.getElementById('send_crystal').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('send_hydrogen')) document.getElementById('send_hydrogen').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("change",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('receive_amount')) document.getElementById('receive_amount').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('trade_type')) document.getElementById('trade_type').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('receive_type')) document.getElementById('receive_type').addEventListener("change",fCheckTradeInput,true);
   if(document.getElementById('send_ore')) document.getElementById('send_ore').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('send_crystal')) document.getElementById('send_crystal').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('send_hydrogen')) document.getElementById('send_hydrogen').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("keyup",fCheckCargoInput,true);
   if(document.getElementById('trade_amount')) document.getElementById('trade_amount').addEventListener("keyup",fCheckTradeInput,true);
   if(document.getElementById('receive_amount')) document.getElementById('receive_amount').addEventListener("keyup",fCheckTradeInput,true);
   if(document.getElementById('trade_type')) document.getElementById('trade_type').addEventListener("keyup",fCheckTradeInput,true);
   if(document.getElementById('receive_type')) document.getElementById('receive_type').addEventListener("keyup",fCheckTradeInput,true);
   document.getElementById('vRecalculate').addEventListener("click",fCheckCargoInput,true);
   vFleetSelector.addEventListener("click",fCheckCargoInput,true); 
   if(document.getElementById('tradeCalculator')) document.getElementById('tradeCalculator').addEventListener("click",fCheckTradeInput,true);
  }
// }
}


//Add OCH HCO CHO buttons
function fAddMax3ButtonsToFleetScreen() {
 var vCargoDiv=GetClassItem(document,'div','cargo');
 if(vCargoDiv!=null){
  var newPDiv = document.createElement('div');
  newPDiv.setAttribute('class','ore resource');
  if(!vStardrift) {
   var newDiv=document.createElement('label');
   newDiv.setAttribute('for','maxOCH');
   newDiv.innerHTML='Max3: ';
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; width:auto;');
   newPDiv.appendChild(newDiv);
  }
  var newDiv = document.createElement('input');
  newDiv.setAttribute('onclick',"select_max_cargo('hydrogen');select_max_cargo('crystal');select_max_cargo('ore');");
  newDiv.setAttribute('id','maxHCO');
  newDiv.setAttribute('type','button');
  newDiv.setAttribute('value','HCO');
  if(!vStardrift) {
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; width:auto;');
   newPDiv.appendChild(newDiv);
  } else {
   var vCurrRow=document.getElementById('send_hydrogen').parentNode;
   var vCurrWid=vCurrRow.clientWidth;
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; float:right; text-indent:0px; width:auto; background-color:lightgrey; background-image:none;');
   vCurrRow.appendChild(newDiv);
   vCurrRow.style.width=(vCurrWid+50)+"px";
  }
  
  var newDiv = document.createElement('input');
  newDiv.setAttribute('onclick',"select_max_cargo('ore');select_max_cargo('crystal');select_max_cargo('hydrogen');");
  newDiv.setAttribute('id','maxOCH');
  newDiv.setAttribute('type','button');
  newDiv.setAttribute('value','OCH');
  if(!vStardrift) {
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; width:auto;');
   newPDiv.appendChild(newDiv);
  } else {
   var vCurrRow=document.getElementById('send_ore').parentNode;
   var vCurrWid=vCurrRow.clientWidth;
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; float:right; text-indent:0px; width:auto; background-color:lightgrey; background-image:none;');
   vCurrRow.appendChild(newDiv);
   vCurrRow.style.width=(vCurrWid+50)+"px";
  }
  
  var newDiv = document.createElement('input');
  newDiv.setAttribute('onclick',"select_max_cargo('crystal');select_max_cargo('hydrogen');select_max_cargo('ore');");
  newDiv.setAttribute('id','maxCHO');
  newDiv.setAttribute('type','button');
  newDiv.setAttribute('value','CHO');
  if(!vStardrift) {
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; width:auto;');
   newPDiv.appendChild(newDiv);
  } else {
   var vCurrRow=document.getElementById('send_crystal').parentNode;
   var vCurrWid=vCurrRow.clientWidth;
   newDiv.setAttribute('style','font-size:xx-small; overflow:visible; float:right; text-indent:0px; width:auto; background-color:lightgrey; background-image:none;');
   vCurrRow.appendChild(newDiv);
   vCurrRow.style.width=(vCurrWid+50)+"px";
  }
  
  if(!vStardrift) vCargoDiv.appendChild(newPDiv); 
 }
}
function fCheckTradeInput() {
 var vTradeAmtOut, vTradeAmtIn, vTradeTypeOut, vTradeTypeIn;
 var vEnteredResType, vEnteredResAmt, vResTypeOne, vResTypeTwo, vResOneMin, vResOneStd, vResOneMax, vResTwoMin, vResTwoStd, vResTwoMax
 vTradeAmtOut=document.getElementById('trade_amount').value;
 vTradeAmtIn=document.getElementById('receive_amount').value;
 vTradeTypeOut=document.getElementById('trade_type').value;
 vTradeTypeIn=document.getElementById('receive_type').value;
 vEnteredResType=(vTradeAmtOut=='') ? ((vTradeAmtIn=='') ? vTradeTypeOut : vTradeTypeIn) : vTradeTypeOut;
 vEnteredResAmt=(vTradeAmtOut=='') ? ((vTradeAmtIn=='') ? 0 : parseInt(vTradeAmtIn.match(/\d/g).join(''),10)) : parseInt(vTradeAmtOut.match(/\d/g).join(''),10);
 switch(vEnteredResType.toLowerCase()) {
  case 'ore': 
   vResTypeOne="Crystal"; 
   vResTypeTwo="Hydro"; 
   vResOneMin=Math.floor(vEnteredResAmt/2);
   vResOneStd=Math.floor(vEnteredResAmt/5*3);
   vResOneMax=Math.floor(vEnteredResAmt/1.5);
   vResTwoMin=Math.floor(vEnteredResAmt/3);
   vResTwoStd=Math.floor(vEnteredResAmt/2.5);
   vResTwoMax=Math.floor(vEnteredResAmt/2);
   break;
  case 'crystal': 
   vResTypeOne="Ore"; 
   vResTypeTwo="Hydro"; 
   vResOneMin=Math.floor(vEnteredResAmt*1.5);
   vResOneStd=Math.floor(vEnteredResAmt*5/3);
   vResOneMax=Math.floor(vEnteredResAmt*2);
   vResTwoMin=Math.floor(vEnteredResAmt/2);
   vResTwoStd=Math.floor(vEnteredResAmt/1.5);
   vResTwoMax=Math.floor(vEnteredResAmt/1);
   break;
  case 'hydrogen': 
   vResTypeOne="Ore"; 
   vResTypeTwo="Crystal"; 
   vResOneMin=Math.floor(vEnteredResAmt*2);
   vResOneStd=Math.floor(vEnteredResAmt*2.5);
   vResOneMax=Math.floor(vEnteredResAmt*3);
   vResTwoMin=Math.floor(vEnteredResAmt);
   vResTwoStd=Math.floor(vEnteredResAmt*1.5);
   vResTwoMax=Math.floor(vEnteredResAmt*2);
   break;
 }
 document.getElementById('vEnteredResType').innerHTML=vEnteredResType;
 document.getElementById('vEnteredResAmt').innerHTML=addCommas(vEnteredResAmt.toString());
 document.getElementById('vResTypeOne').innerHTML=vResTypeOne;
 document.getElementById('vResTypeTwo').innerHTML=vResTypeTwo;
 document.getElementById('vResOneMin').innerHTML=addCommas(vResOneMin.toString());
 document.getElementById('vResOneStd').innerHTML=addCommas(vResOneStd.toString());
 document.getElementById('vResOneMax').innerHTML=addCommas(vResOneMax.toString());
 document.getElementById('vResTwoMin').innerHTML=addCommas(vResTwoMin.toString());
 document.getElementById('vResTwoStd').innerHTML=addCommas(vResTwoStd.toString());
 document.getElementById('vResTwoMax').innerHTML=addCommas(vResTwoMax.toString());
}
function fCheckCargoInput() {
 var vOreNeeded=(document.getElementById('send_ore')) ? parseInt(document.getElementById('send_ore').value.match(/\d/g).join(''),10) : 0; 
 var vCryNeeded=(document.getElementById('send_crystal')) ? parseInt(document.getElementById('send_crystal').value.match(/\d/g).join(''),10) : 0; 
 var vHydNeeded=(document.getElementById('send_hydrogen')) ? parseInt(document.getElementById('send_hydrogen').value.match(/\d/g).join(''),10) : 0;
 var vTradeNeeded=(document.getElementById('trade_amount')) ? (document.getElementById('trade_amount').value==''?0:parseInt(document.getElementById('trade_amount').value.match(/\d/g).join(''),10)) : 0;
 var vCargoForTrade=(document.getElementById('cargo_for_trade')) ? (document.getElementById('cargo_for_trade').value=''?0:parseInt(document.getElementById('cargo_for_trade').value.match(/\d/g).join(''),10)) : 0;
 var vRClick, vMax, vShip;
 var vFuelNeeded=0;
 if (document.getElementById('task_consumption').innerHTML.match(/\d/g)!=null) {    vFuelNeeded=parseInt(document.getElementById('task_consumption').innerHTML.match(/\d/g).join('')); }
 var vTotalNeeded=vOreNeeded+vCryNeeded+vHydNeeded+vTradeNeeded+vFuelNeeded+vCargoForTrade;
 var vHermesNeeded=Math.ceil(vTotalNeeded/5);
 var vArtemisNeeded=Math.ceil(vTotalNeeded/50);
 var vAtlasNeeded=Math.ceil(vTotalNeeded/5000);
 var vApolloNeeded=Math.ceil(vTotalNeeded/100);
 var vZagreusNeeded=Math.ceil(vTotalNeeded/5000);
 var vCharonNeeded=Math.ceil(vTotalNeeded/100);
 var vHerculesNeeded=Math.ceil(vTotalNeeded/25000);
 var vEmpusaNeeded=Math.ceil(vTotalNeeded/25);
 var vDionysusNeeded=Math.ceil(vTotalNeeded/20000);
 var vCuretesNeeded=Math.ceil(vTotalNeeded/250);
 var vPoseidonNeeded=Math.ceil(vTotalNeeded/800);
 var vCarmanorNeeded=Math.ceil(vTotalNeeded/125000);
 var vPallasNeeded=Math.ceil(vTotalNeeded/250);
 var vGaiaNeeded=Math.ceil(vTotalNeeded/7500);
 var vAthenaNeeded=Math.ceil(vTotalNeeded/1500);
 var vAresNeeded=Math.ceil(vTotalNeeded/500);
 var vHadesNeeded=Math.ceil(vTotalNeeded/750);
 var vPrometheusNeeded=Math.ceil(vTotalNeeded/2000);
 var vThanatosNeeded=Math.ceil(vTotalNeeded/200000);
 var vZeusNeeded=Math.ceil(vTotalNeeded/1000000);
 var vHephaestusNeeded=Math.ceil(vTotalNeeded/1000000000);
 var vShipIds=new Array('950199677','82638594','676893046','11551983','2073344048','1168728674','960214949','1217299082','796740346','1812784750','281074851','754993598','1272883563','2073344047','2073344049','2073344058','2073344056','2073344060','2073344062','2073344054','2073344064');
 var vCurrentCargo=0;
 var vNextNeeded=0;
 for(var q=0;q<vShipIds.length;q++) { if(document.getElementById('ship_quantity_'+vShipIds[q]+'_max')) { vCurrentCargo+=parseInt('0'+document.getElementById('ship_quantity_'+vShipIds[q]).value.match(/\d/g).join(''),10)*fGetCargoCapacity(vShipIds[q]); } }
 
 var vNeededCargo=(vTotalNeeded>vCurrentCargo) ? vTotalNeeded-vCurrentCargo : 0;
 vShip=document.getElementById('ship_quantity_676893046_max');
 if(vShip!=null){
  vMax=parseInt(vShip.innerHTML);
  vRClick=(parseInt(vAtlasNeeded)>vMax) ? vMax : vAtlasNeeded;
  document.getElementById('neededAtlas').setAttribute('onclick','document.getElementById("ship_quantity_676893046").value="'+vRClick+'"; return false;');  
  vNextNeeded=Math.ceil(vNeededCargo/5000)+parseInt('0'+document.getElementById('ship_quantity_676893046').value.match(/\d/g).join(''),10);
  vRClick=vNextNeeded>vMax ? vMax : vNextNeeded;
  document.getElementById('moreAtlas').setAttribute('onclick','document.getElementById("ship_quantity_676893046").value="'+vRClick+'"; return false;');
 } else {
  document.getElementById('neededAtlas').setAttribute('onclick','return false;');
  document.getElementById('moreAtlas').setAttribute('onclick','return false;');
 }
 document.getElementById('neededAtlas').innerHTML=vAtlasNeeded;
 document.getElementById('moreAtlas').innerHTML=Math.ceil(vNeededCargo/5000);

 vShip=document.getElementById('ship_quantity_1168728674_max'); 
 if(vShip!=null){
  vMax=parseInt(vShip.innerHTML);
  vRClick=(parseInt(vHerculesNeeded)>vMax) ? vMax : vHerculesNeeded;
  document.getElementById('neededHercs').setAttribute('onclick','document.getElementById("ship_quantity_1168728674").value="'+vRClick+'"; return false;');
  vNextNeeded=Math.ceil(vNeededCargo/25000)+parseInt('0'+document.getElementById('ship_quantity_1168728674').value.match(/\d/g).join(''),10);
  vRClick=vNextNeeded>vMax ? vMax : vNextNeeded;
  document.getElementById('moreHercs').setAttribute('onclick','document.getElementById("ship_quantity_1168728674").value="'+vRClick+'"; return false;');
 } else {
  document.getElementById('neededHercs').setAttribute('onclick','return false;');
  document.getElementById('moreHercs').setAttribute('onclick','return false;');
 }
 document.getElementById('neededHercs').innerHTML=vHerculesNeeded;
 document.getElementById('moreHercs').innerHTML=Math.ceil(vNeededCargo/25000);

 if(!vStardrift) {
  vShip=document.getElementById('ship_quantity_2073344062_max'); 
  if(vShip!=null){
   vMax=parseInt(vShip.innerHTML);
   vRClick=(parseInt(vCarmanorNeeded)>vMax) ? vMax : vCarmanorNeeded;
   document.getElementById('neededCarms').setAttribute('onclick','document.getElementById("ship_quantity_2073344062").value="'+vRClick+'"; return false;');
   vNextNeeded=Math.ceil(vNeededCargo/125000)+parseInt('0'+document.getElementById('ship_quantity_2073344062').value.match(/\d/g).join(''),10);
   vRClick=vNextNeeded>vMax ? vMax : vNextNeeded;
   document.getElementById('moreCarms').setAttribute('onclick','document.getElementById("ship_quantity_2073344062").value="'+vRClick+'"; return false;');
  } else {
   document.getElementById('neededCarms').setAttribute('onclick','return false;');
   document.getElementById('moreCarms').setAttribute('onclick','return false;');
  }
  document.getElementById('neededCarms').innerHTML=vCarmanorNeeded;
  document.getElementById('moreCarms').innerHTML=Math.ceil(vNeededCargo/125000);
  if(vNovaTourney) {
   var vShipsNeeded='Total entered res:'+addCommas(vTotalNeeded.toString())+String.fromCharCode(10);
    vShipsNeeded+='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+' Zag:'+vZagreusNeeded+String.fromCharCode(10);
    vShipsNeeded+='Charon:'+vCharonNeeded+' Herc:'+vHerculesNeeded+' Emp:'+vEmpusaNeeded+' Dio:'+vDionysusNeeded+' Cur:'+vCuretesNeeded+String.fromCharCode(10);
    vShipsNeeded+='Posi:'+vPoseidonNeeded+' Carm:'+vCarmanorNeeded+' Pall:'+vPallasNeeded+' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+String.fromCharCode(10);
    vShipsNeeded+='Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+' Prom:'+vPrometheusNeeded+' Than:'+vThanatosNeeded+' Zeus:'+vZeusNeeded+String.fromCharCode(10);
    vShipsNeeded+='Heph:'+vHephaestusNeeded;
  } else {
   var vShipsNeeded='Total entered res:'+addCommas(vTotalNeeded.toString())+String.fromCharCode(10);
    vShipsNeeded+='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+' Zag:'+vZagreusNeeded+String.fromCharCode(10);
    vShipsNeeded+='Charon:'+vCharonNeeded+' Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+String.fromCharCode(10);
    vShipsNeeded+='Posi:'+vPoseidonNeeded+' Carm:'+vCarmanorNeeded+' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+String.fromCharCode(10);
    vShipsNeeded+='Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+String.fromCharCode(10);
    vShipsNeeded+='Heph:'+vHephaestusNeeded;
  }
 } else {
  var vShipsNeeded='Total entered res:'+addCommas(vTotalNeeded.toString())+String.fromCharCode(10);
   vShipsNeeded+='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+' Charon:'+vCharonNeeded+String.fromCharCode(10);
   vShipsNeeded+='Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+' Posi:'+vPoseidonNeeded+' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+String.fromCharCode(10);
   vShipsNeeded+='Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+' Heph:'+vHephaestusNeeded;
 }

 document.getElementById('cargoCalculator').setAttribute('title',vShipsNeeded);
}
function fAddDiosNeededToDFs() {
 var vTRs=document.getElementById('planets').getElementsByTagName('tr');
 var vDios, vDF, vDFO, vDFC, vDiosNeeded, vZags, vZagsNeeded, vDebris, vDebrisTable, vTR, vSlot, vTD1, vInlineSpan, vAjaxSpan, vActiveSpan, vEnabledSpan, vHarvestLink, vHarvestImg, vTD2, vHarvestOnClick, vDistance;
 for (i=1;i<vTRs.length;i++) {
  
  vDebris=GetClassItem(vTRs[i],'td','debris');
  if (vDebris!=null) { 
   vDebrisTable=GetClassItem(vDebris,'table','debris_table');
   if(vDebrisTable!=null) {
//    if(/none/i.test(GetClassItem(vDebrisTable,'span','enabled').getAttribute('style'))) { GetClassItem(vDebrisTable,'span','enabled').setAttribute('style',''); }
    vDios=0;
    vZags=0;
    vDF=GetClassItem(vDebrisTable,'td','resources').innerHTML.match(/([\d,]+)<[^\x00]+?([\d,]+)/m);
    vDFO=parseFloat(vDF[1].replace(/,/g,''));
    vDFC=parseFloat(vDF[2].replace(/,/g,''));
    vDios=Math.ceil((vDFO+vDFC)/20000);
    vDiosNeeded=addCommas(vDios.toString());
    if(/starfleet/i.test(document.location.href)) {
     vZags=Math.ceil((vDFO+vDFC)/5000);
     vZagsNeeded=addCommas(vZags.toString());
     vDebris.setAttribute('title','Dios Needed: '+vDiosNeeded+' '+String.fromCharCode(10)+'Zags Needed: '+vZagsNeeded);
    } else {
     vDebris.setAttribute('title','Dios Needed: '+vDiosNeeded);
    }
   } else {
/*
   vDebrisTable=document.createElement('table');
    vDebrisTable.setAttribute('class','debris_table');
    vDebris.appendChild(vDebrisTable);
    vTR=document.createElement('tr');
//    vTR.setAttribute('rowspan','2');
    vDebrisTable.appendChild(vTR);
    vTD1=document.createElement('td');
    vTD1.setAttribute('class','harvest');
//    vTD1.setAttribute('rowspan','2');
    vTR.appendChild(vTD1);
    vInlineSpan=document.createElement('span');
    vInlineSpan.setAttribute('class','inline_action');
    vTD1.appendChild(vInlineSpan);
    vAjaxSpan=document.createElement('span');
    vAjaxSpan.setAttribute('class',' ajax_link');
    vInlineSpan.appendChild(vAjaxSpan);
    vActiveSpan=document.createElement('span');
    vActiveSpan.setAttribute('class','active');
    vAjaxSpan.appendChild(vActiveSpan);
    vEnabledSpan=document.createElement('span');
    vEnabledSpan.setAttribute('class','enabled');
    vActiveSpan.appendChild(vEnabledSpan);
    vHarvestLink=document.createElement('a');
    vHarvestLink.setAttribute('href','#");
    vHarvestLink.setAttribute('id','select_fleet_link_harvest_'+vSlot.toString());
    vHarvestOnClick="disable_ajax_links();";
    vHarvestOnClick+=" new Ajax.Request('/fleet/assign?current_planet="+vCurrentPlanet+"&distance="&vDistance;
    vHarvestOnClick+="&opts%5Bmission_type%5D=harvest&";
    vHarvestOnClick+="parent_id=select_fleet_link_harvest_"+vSlot.toString();
    vHarvestOnClick+="&target_url%5Baction%5D=harvest";
    vHarvestOnClick+="&target_url%5Bcontroller%5D=harvest";
    vHarvestOnClick+="&target_url%5Bid%5D=5085";
    vHarvestOnClick+="&target_url%5Bslot%5D="+vSlot+"', {asynchronous:true, evalScripts:true});";
    vHarvestOnClick+=" return false;";
    vHarvestLink.setAttribute('onclick',vHarvestOnClick);
    vEnabledSpan.appendChild(vHarvestLink);
    vHarvestImg=document.createElement('img');
    vHarvestImg.setAttribute('alt','Harvest');
    vHarvestImg.setAttribute('src','/images/starfleet/galaxy/harvest_icon.png');
    vHarvestImg.setAttribute('title','Harvest');
    vHarvestLink.appendChild(vHarvestImg);
    vTD2=document.createElement('td');
    vTD2.setAttribute('class','resources');
    vTR.appendChild(vTD2);
*/
    }
  }
 }
}



function vTrim(vInString) { return vInString.replace(/^\s+|\s+$/g,''); };
function GetClassItem(vSource,vTagname,vClass) {
 if(vSource==null) { 
  console.log('vSource is null.');
  console.log('Tag: '+vTagname);
  console.log('Class: '+vClass);
 }
 var vElements=vSource.getElementsByTagName(vTagname);
 var vReturn=null;
 for (cnt=0;cnt<vElements.length;cnt++) {
  if (vElements[cnt].getAttribute('class')==vClass) { vReturn=vElements[cnt]; break; } }
 return vReturn;}
function GetClassItemRX(vSource,vTagname,vClass) {
 var vElements=vSource.getElementsByTagName(vTagname);
 var vReturn=null;
 for (cnt=0;cnt<vElements.length;cnt++) {
  if (vClass.test(vElements[cnt].getAttribute('class'))) { vReturn=vElements[cnt]; break; } }
 return vReturn;}
function addCommas(vNumber) {
 while (/(\d+)(\d{3})/.test(vNumber)) {vNumber=vNumber.replace(/(\d+)(\d{3})/,'$1,$2');}
 return vNumber;}
function fWheresJeebus(V) {
 var i=0;
 switch(V.keyCode) {  
  case 83:
   if (vJeebusSeq.slice(-22)=='8365866977697469696685') {
    fSaveMeJeebus();
    break;   
   }
 }
 var vLastKey=(V.keyCode<10?'0':'')+V.keyCode;
 if(vJeebusSeq.length<24) {
  vJeebusSeq+=vLastKey;
 } else {
  vJeebusSeq=vJeebusSeq.slice(-22)+vLastKey; 
 }
}
function fSaveMeJeebus() {
 var vDivAssignFleet=document.getElementById('assign_fleet');
 var vFormAssignFleet=document.getElementById('assign_fleet_form');
 if(vFormAssignFleet==null) {
  vFormAssignFleet=document.createElement('form');
  vFormAssignFleet.setAttribute('action','/fleet/send_task?current_planet='+vCurrentPlanet);
  vFormAssignFleet.setAttribute('id','assign_fleet_form');
  vFormAssignFleet.setAttribute('method','post');
  vFormAssignFleet.setAttribute('onsubmit','disable_assign_fleet_form();');
  var vDivSubmitPopup=document.getElementById('submit_popup');
  vDivAssignFleet.insertBefore(vFormAssignFleet,vDivSubmitPopup);

  vFormAssignFleet.appendChild(fCreateDivTargetPlanet());
  vFormAssignFleet.appendChild(fNewDivClear());
  vFormAssignFleet.appendChild(fCreateDivPlanetSelector());
  vFormAssignFleet.appendChild(fCreateDivSelectFleet());
 }
}
function fCreateDivSelectFleet() {
 var vDivSelectFleet=document.createElement('div');
 vDivSelectFleet.setAttribute('class','select_fleet');
  var vDivFleetTable=document.createElement('div');
  vDivFleetTable.setAttribute('class','fleet_table');
  vDivSelectFleet.appendChild(vDivFleetTable);
   var vDivFleet=document.createElement('div');
   vDivFleet.setAttribute('class','fleet');
   vDivFleetTable.appendChild(vDivFleet);
    var vDivRow=document.createElement('div');
    vDivRow.setAttribute('class','row');
    vDivFleet.appendChild(vDivRow);
     vDivRow.appendChild(fCreateDivShip('950199677','0.1','5.0','260000000','1','hermes_class','Icon_hermes_class','icon_hermes_class.png','Hermes Class Probe'));
}
function fCreateDivShip(vCDSShipId,vCDSGDCost,vCDSCargo,vCDSSpeed,vCDSConsumption,vCDSKey,vCDSImgAlt,vCDSImageName,vCDSShipName) {
}
function fNewDivClear() {
 var vDivClear=document.createElement('div');
 vDivClear.setAttribute('class','clear');
 return vDivClear;
}
function fCreateDivPlanetSelector() {
 var vDivPlanetSelector=document.createElement('div');
 vDivPlanetSelector.setAttribute('class','planet_selector');
 
 return vDivPlanetSelector;
}
function fCreateDivTargetPlanet() {
 var vDivTargetPlanet=document.createElement('div');
 vDivTargetPlanet.setAttribute('id','target_planet');
  var vSpanLabel=document.createElement('span');
  vSpanLabel.setAttribute('class','label');
  vSpanLabel.innerHTML='Target Coordinates:';
  vDivTargetPlanet.appendChild(vSpanLabel);
  vDivTargetPlanet.appendChild(fCreateCoordElement('input','off','galaxy','galaxy',"select_field('galaxy');",'text',document.getElementById('current_planet_galaxy').innerHTML.replace(/^\s+|\s+$/g,'')));
  vDivTargetPlanet.appendChild(fCreateCoordElement('input','off','solar_system','solar_system',"select_field('solar_system');",'text',document.getElementById('current_planet_solar_system').innerHTML.replace(/^\s+|\s+$/g,'')));
  vDivTargetPlanet.appendChild(fCreateCoordElement('input','off','planet','planet',"select_field('planet');",'text',document.getElementById('current_planet_position').innerHTML.replace(/^\s+|\s+$/g,'')));
  var vTargetType=fCreateCoordElement('select','off','planet_type','planet_type','','','');
  vDivTargetPlanet.appendChild(vTargetType);
   var vOptionTarget=document.createElement('option');
   vOptionTarget.setAttribute('value','planet');
   vOptionTarget.innerHTML='Planet';
   if(document.getElementById('current_planet_type').innerHTML.replace(/^\s+|\s+$/g,'')=='planet') vOptionTarget.setAttribute('selected','selected');
   vTargetType.appendChild(vOptionTarget);
   var vOptionTarget=document.createElement('option');
   vOptionTarget.setAttribute('value','moon');
   vOptionTarget.innerHTML='Moon';
   if(document.getElementById('current_planet_type').innerHTML.replace(/^\s+|\s+$/g,'')=='moon') vOptionTarget.setAttribute('selected','selected');
   vTargetType.appendChild(vOptionTarget);
 return vDivTargetPlanet;
}
function fCreateCoordElement(vCCEtype,vCCEautocomplete,vCCEid,vCCEname,vCCEonclick,vCCEtype,vCCEvalue) {
 var vNewElement=document.createElement(vCCEtype);
 vNewElement.setAttribute('autocomplete',vCCEautocomplete);
 vNewElement.setAttribute('id',vCCEid);
 vNewElement.setAttribute('name',vCCEname);
 vNewElement.setAttribute('onclick',vCCEonclick);
 vNewElement.setAttribute('type',vCCEtype);
 vNewElement.setAttribute('value',vCCEvalue);
 return vNewElement;
}
function fGetCargoCapacity(vShipId) {
 switch (vShipId) {
  case '950199677': return 5; break; // Hermes Class Probe
  case '82638594': return 50; break; // Artemis Class Fighter
  case '676893046': return 5000; break; // Atlas Class Cargo
  case '11551983': return 100; break; // Apollo Class Fighter
  case '2073344048': return 100; break; // Charon Class Transport
  case '1168728674': return 25000; break; // Hercules Class Cargo
  case '960214949': return 20000; break; // Dionysus Class Recycler
  case '1217299082': return 800; break; // Poseidon Class Cruiser
  case '796740346': return 7500; break; // Gaia Class Colony Ship
  case '1812784750': return 1500; break; // Athena Class Battleship
  case '281074851': return 500; break; // Ares Class Bomber
  case '754993598': return 750; break; // Hades Class Battleship
  case '1272883563': return 2000; break; // Prometheus Class Destroyer
  case '2073344047': return 1000000; break; // Zeus Class
  case '2073344049': return 1000000000; break; // Hephaestus Class Attack Platform
  case '2073344058': return 5000; break; // Zagreus Class Recycler
  case '2073344056': return 25; break; // Empusa Class Fighter
  case '2073344060': return 250; break; // Curetes Class Cruiser
  case '2073344062': return 125000; break; // Carmanor Class Cargo
  case '2073344057': return 125000; break; // Carmanor Class Cargo
  case '2073344054': return 250; break; // Pallas Class Bomber
  case '2073344064': return 200000; break; // Thanatos Class Destroyer
 }
}