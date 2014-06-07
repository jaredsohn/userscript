// ==UserScript==

// @name           PMmem

// @namespace      mw3

// @description    Memory for Planetary Management

// @include        http://*.crimsonleafgames.com/*

// @include        http://*.megawars3.com/*

// @include        http://*.megawarsiii.com/*

// @include        http://crimsonleafgames.com/*

// @include        http://megawars3.com/*

// @include        http://megawarsiii.com/*

// ==/UserScript==



// Fixed 11 Apr 2010 to work with MW3TR version 3.1.18
// Fixed 23 Jul 2010 to fix disappearance of lower buttons

if( !/PlanetManagement/.test(location) ) return;



var bmmDIV = document.getElementById('BeakerModeModsFlyPM'); // Fly IC buttons from BeakerModeMods

if(bmmDIV) bmmDIV.parentNode.removeChild(bmmDIV);            // are superfluous with PMmem



// window.moveTo(40,window.screenY);



document.getElementById('header').style.width='100%';

document.getElementById('menu'  ).style.width='095%';

document.getElementById('page'  ).style.width='100%';

document.getElementById('footer').style.width='095%';



document.getElementById('page'  ).style.overflowX = 'visible';

document.getElementById('page'  ).style.overflowY = 'visible';



var accountNameNode = document.getElementById("ctl00_ctl00_LoginView2_m_oLoginName");

var accountName     = accountNameNode.textContent;

var accountNameTD   = accountNameNode.parentNode;



// Change the window Title

var nNode = document.getElementById("ctl00_ctl00_Head1").firstChild;

while( nNode.nodeName != 'TITLE') nNode = nNode.nextSibling;

nNode.firstChild.insertData(0, 'MW3TR - Planetary Management - ' + accountName);



var contentNode = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_UpdatePanel1");



var autoUpdate = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_AutoUpdate");

                 // a checkbox



function planetInMenuNode(planetIndex){

  // planetIndex = index within menu = 0, 1, ...

  return document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_PlanetMenun" + planetIndex);

}

function planetIDinNode(pimNode){

  if(pimNode)

  return pimNode.firstChild         // TABLE

                .firstChild         //   #text

                .nextSibling        //   TBODY

                .firstChild         //     TR

                .firstChild         //       #text

                .nextSibling        //       TD

                .firstChild         //         A -- click here to jump to that planet

                .text.replace(/ /g,'');

  else return '';

}

function planetInMenu(planetIndex){

  // planetIndex = index within menu = 0, 1, ...

  var planetTD = planetInMenuNode(planetIndex);

  // GM_log('planetInMenu(' + planetIndex + '): planetTD

  if(planetTD) return planetIDinNode(planetTD);

  else         return ''; // i.e. no such planet

}



// GM_log('planets in menu: ' + planetInMenu(0) + ' ' + planetInMenu(1) + " ...");



// Cannot find saveChangesButton once and keep it: it gets refreshed whenever

// you change planets or submit changes (?or click auto-update?):

// var saveChangesButton = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_m_oSaveChanges");



function currentPlanet(){

  return document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_Label1')

                 .textContent.replace(/ /g,'');

}

unsafeWindow.currentPlanet = currentPlanet;



// GM_log('current planet: ' + currentPlanet());



function colonyAge(){

  return document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_iAgeOfColonyInSecondsLabel")

                 .textContent;

}

// GM_log('current Date: ' + colonyAge());



function addRefiningEmploymentCapacity(){

  var metRating = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dMetalsLabel")

                          .textContent;

  var refCapSPAN =

      document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dIndOreRefiningLabel");

  var refCapVsColSPAN =

      document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dRptMinVsColLabel");



  if(/<-/.test(refCapSPAN.textContent)) return; // already done



  var mrFactor = 100.0 / Number(metRating);



  var refEmpCap      = Number(refCapSPAN.textContent.replace(/,/g,'')) * mrFactor;

  var refEmpCapVsCol = Number(refCapVsColSPAN.textContent.replace(/,/g,'')) * mrFactor;



  function formatWithCommas(ns){

    var rx = /(\d+)(\d{3})/;

    while(rx.test(ns)) ns = ns.replace(rx, '$1'+','+'$2');

    return ns;

  }



  refCapSPAN.firstChild.insertData(0, formatWithCommas(refEmpCap.toFixed().toString()) + ' <- ');

  refCapVsColSPAN.firstChild.insertData(0, refEmpCapVsCol.toFixed(2).toString() + ' <- ');

}



//===========================================================================================

// NB: page does not reload on changing planets!

//===========================================================================================



// Add new Stuff:



// Watch for change of planet:



var changingToPlanet = '';



function delayUntilRightPlanetThenSetItUp(){

  if(false) // comment out this line to activate the following GM_log

  GM_log('delayUntilRightPlanetThenSetItUp/0: changingToPlanet: ' + changingToPlanet +

         ' currentPlanet(): ' + currentPlanet());

  if(currentPlanet() == changingToPlanet){

    fetchHistory(currentPlanet());

    setPlanetChangeDetectors();

    addRefiningEmploymentCapacity();

  } else {

    window.setTimeout(delayUntilRightPlanetThenSetItUp, 1000);

  }

}

function planetChangeClicked(toPlanet){

  // GM_log('planetChangeClicked/0: toPlanet: ' + toPlanet);

  clearHistory();

  changingToPlanet = toPlanet;

  delayUntilRightPlanetThenSetItUp();

}

unsafeWindow.planetChangeClicked = planetChangeClicked;



function setPlanetChangeDetectors(){

  // GM_log('setPlanetChangeDetectors/0');

  var px = 0;

  var pNode = planetInMenuNode(px);

  while(pNode){

    pNode.setAttribute('onclick', "{planetChangeClicked('"+planetIDinNode(pNode)+"');}");

    pNode = planetInMenuNode(px++);

  }

  document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_m_oSaveChanges')

          .parentNode.addEventListener('click', function(event){

    // GM_log('saveChangesButton clicked');

    window.setTimeout(setPlanetChangeDetectors, 4000);  

  }, false);

}

unsafeWindow.setPlanetChangeDetectors = setPlanetChangeDetectors;



accountNameTD.appendChild(document.createElement('BR'));



var upperButton = [ {v:'Fetch History',  c:"{fetchHistoryButtonClicked();}"},

                    {v:'Add To History', c:"{addToHistoryButtonClicked();}"},

                    {v:'Store History',  c:"{storeHistory();setPlanetChangeDetectors();}"},

                    {v:'Clear History',  c:"{clearHistory();}"},

                    {v:'Bot',            c:"{window.scrollTo(document.width, document.height);}"}];



for( ubx=0 ; ubx < upperButton.length ; ubx++ ){

  ubn = document.createElement('INPUT');

  ubn.setAttribute('type',    'button');

  ubn.setAttribute('value',   upperButton[ubx].v);

  ubn.setAttribute('onclick', upperButton[ubx].c);

  accountNameTD.appendChild(ubn);

}

var historyTableHeaderFooterHTML =

     "<tr><th>prDate<th>Pop<th>Tro<th>Loan" +

         "<th>BIass<th>BIcap<th>MIass<th>MIcap<th>ArAss<th>ArCap" +

         "<th>SYass<th>SYcap<th>SSass<th>SScap<th>Ag<th>Food<th>Ore<th>Met";

var emptyHistoryTableHTML =

 "<table border='1' style='font-size:large;font-family:Monospace'>" +

   "<thead>" + historyTableHeaderFooterHTML +

   "<tbody>" +

   "<tfoot>" + historyTableHeaderFooterHTML +

 "</table>";



var historyDIV = document.createElement('DIV');

historyDIV.setAttribute('id', 'history');



var historyTABLE;

var historyTHEAD;

var historyTBODY;

var historyTFOOT;



function clearHistory(){

  // GM_log('clearHistory/0: current planet: ' + currentPlanet());

  historyDIV.innerHTML = emptyHistoryTableHTML;

  historyTABLE = historyDIV  .firstChild;  // TABLE

  historyTHEAD = historyTABLE.tHead;

  historyTBODY = historyTABLE.tBodies[0];

  historyTFOOT = historyTABLE.tFoot;

  var planetIDcell = historyTHEAD.rows[0].insertCell(historyTHEAD.rows[0].cells.length);

  planetIDcell.appendChild(document.createTextNode(currentPlanet()));

  planetIDcell = historyTFOOT.rows[0].insertCell(historyTFOOT.rows[0].cells.length);

  planetIDcell.appendChild(document.createTextNode(currentPlanet()));

  // GM_log('clearHistory/9');

}

unsafeWindow.clearHistory = clearHistory;



contentNode.parentNode.insertBefore(historyDIV, contentNode);



function addLowerButtons(){

  // GM_log('addLowerButtons/0');

  window.setTimeout(addLowerButtons, 1000); // always restarts itself



  // GM_log('addLowerButtons/1');

  if(document.getElementById('FirstLowerButton')) return; // they're already there

  // GM_log('addLowerButtons/2');

  // Cannot find currPlanetIDnode once and save it: it gets rebuilt frequently

  var currPlanetIDnode = document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_Label1');

  if(currPlanetIDnode == null) return;

  // GM_log('addLowerButtons/3');

  var whereToPlantLowerButtons = currPlanetIDnode.parentNode   // TD

                                                 .nextSibling; // #text?
  // GM_log('addLowerButtons/3a');

  while(( whereToPlantLowerButtons                         != null    ) &&
        ((whereToPlantLowerButtons.localName               == null) ||
         (whereToPlantLowerButtons.localName.toLowerCase() != 'td')   ) ){

    // GM_log('addLowerButtons/3b');

    whereToPlantLowerButtons = whereToPlantLowerButtons.nextSibling;
  }

  if(whereToPlantLowerButtons == null) return;

  // At this point, whereToPlantLowerButtons points to
  // the first TD node after the TD node that holds the current planet ID

  // GM_log('addLowerButtons/4');



  var lowerButtons = [ {v:'F Hx',   c:'{fetchHistoryButtonClicked();}'},

                       {v:'A&S Hx', c:'{addToHistory();storeHistory();setPlanetChangeDetectors();}'},

                       {v:'AC',     c:'{window.location = "Beaker.aspx";}'},

                       {v:'IC',     c:'{window.location = "InfoCenter.aspx";}'},

                       {v:'DD',     c:'{window.location = "DryDock.aspx";}'},

                       {v:'Top',    c:'{window.scrollTo(document.width, 0);}'}

                     ];

  for( lbx=0 ; lbx < lowerButtons.length ; lbx++ ){

    lbe = document.createElement('INPUT');

    if(lbx == 0) lbe.setAttribute('id', 'FirstLowerButton');

    lbe.setAttribute('type',    'button');

    lbe.setAttribute('value',   lowerButtons[lbx].v);

    lbe.setAttribute('onclick', lowerButtons[lbx].c);
    if(whereToPlantLowerButtons == null) return;
    // GM_log('addLowerButtons/5');

    whereToPlantLowerButtons.appendChild(lbe);

  }

}



window.setTimeout(addLowerButtons, 1000);



var popTroLoan = ["ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dColonistsLabel",

                  "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dMercenariesLabel",

                  "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dLoanRemainingLabel"];



var assigned = ["ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dEmpRateBasicIndustryTextBox",  // BI

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dEmpRateMiningTextBox",         // MI

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dEmpRateArmamentsTextBox",      // Ar

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dEmpRateShipYardsTextBox",      // SY

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dEmpRateServiceSectorTextBox",  // SS

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dEmpRateAgricultureTextBox",    // Ag

                'ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dStkFoodLabel',                 // Food

                'ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dStkMetalOresLabel',            // Ore

                'ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dStkMetalsLabel'                // Metal

];

var capacity = ["ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dRptBiVsColLabel",  // BI [SPAN]

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dRptMinVsColLabel", // MI

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dRptArmVsColLabel", // Ar

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dRptSyVsColLabel",  // SY

                "ctl00_ctl00_GamePanel_MW3TR_GamePanel_FormView1_dRptSsVsColLabel"   // SS

];

function fieldVal(id){

  return document.getElementById(id).textContent;

}

function assignedVal(cx){

  var elt = document.getElementById(assigned[cx]);

  if(elt.nodeName == 'INPUT') return elt.value; else return elt.textContent;

}

function capacityVal(cx){

  if(capacity[cx] == '') return '';

  else                   return document.getElementById(capacity[cx]).textContent;

}

function addHistoryCell(toRow, cx, cv){

  var newCell = toRow.insertCell(cx);

  newCell.align = 'right';

  newCell.appendChild(document.createTextNode(cv));

}

function addToHistory(){

  // GM_log('addToHistory: current planet: ' + currentPlanet());

  // Have not figured out how to keep history on current planet when using auto-update

  // so must check history planet vs current planet to avoid adding to wrong planet history:

  var planetIDcell = historyTHEAD.rows[0].cells[historyTHEAD.rows[0].cells.length-1];

  if(planetIDcell.textContent != currentPlanet()){

    return; // temporary hack: try to stop losing history

    fetchHistory(currentPlanet());

    setPlanetChangeDetectors();

  }

  var newRow = historyTBODY.insertRow(historyTBODY.rows.length);

  addHistoryCell(newRow, 0, colonyAge());

  var cx = 0;

  for(var vx in popTroLoan){

    addHistoryCell(newRow, cx+=1, fieldVal(popTroLoan[vx]));

  }

  for(vx in capacity){

    addHistoryCell(newRow, cx+=1, assignedVal(vx));

    addHistoryCell(newRow, cx+=1, capacityVal(vx).replace(/.*<-/,''));

  }

  for(vx = capacity.length ; vx < assigned.length ; vx++){

    addHistoryCell(newRow, cx+=1, assignedVal(vx));

  }

  var dn = new Date();

  addHistoryCell(newRow, cx+=1, dn.getDay()+'@'+('00'+dn.getHours()  ).slice(-2) +

                                            ':'+('00'+dn.getMinutes()).slice(-2) );

}

unsafeWindow.addToHistory = addToHistory;



function addToHistoryButtonClicked(){

  // GM_log('addToHistoryButtonClicked/0');

  window.setTimeout(function(){

    addToHistory();

  }, 0);

}

unsafeWindow.addToHistoryButtonClicked = addToHistoryButtonClicked;



function storeHistory(){

  // GM_log('current planet: ' + currentPlanet());

  var pmHistory = '';

  var rows  = historyTBODY.rows;

  var nrows = rows.length;

  for(var rx=0 ; rx < nrows ; rx++){

    for(var cx=0 ; cx < rows[rx].cells.length ; cx++ ){

      pmHistory += rows[rx].cells[cx].textContent + '+';

    }

    pmHistory += ';';

  }

  // GM_log('storeHistory: pmHistory: *>' + pmHistory + '<*');

  GM_setValue(currentPlanet(), pmHistory);

}

unsafeWindow.storeHistory = function(){

  window.setTimeout( storeHistory, 0 );

};



function fetchHistory(planetToFetch){

  if(false) // comment out this line to activate the following GM_log

  GM_log('fetchHistory/0: planetToFetch: ' + planetToFetch +

         ' current planet: ' + currentPlanet());

  clearHistory();

  var planetIDcell = historyTHEAD.rows[0].cells[historyTHEAD.rows[0].cells.length-1];

  planetIDcell.firstChild.data = planetToFetch;

  var hxString = GM_getValue(planetToFetch);

  if(hxString == null) return; // i.e. no history stored for this planet yet

  var hxRows = hxString.split(';');

  for(var rx=0 ; rx < hxRows.length-1 ; rx++ ){ // length-1 for the last ;

    var newRow = historyTBODY.insertRow(rx);

    var hxCells = hxRows[rx].split('+'); 

    for(var cx=0 ; cx < hxCells.length-1 ; cx++ ){ // length-1 for the last :

      addHistoryCell(newRow, cx, hxCells[cx]);

    }

  }

  window.scrollTo(document.width, document.height);

  // GM_log('fetchHistory/9');

}

unsafeWindow.fetchHistory = function(planetToFetch){

  window.setTimeout( "fetchHistory('" + planetToFetch + "');", 0 );

};



function fetchHistoryButtonClicked(){

  // GM_log('fetchHistoryButtonClicked/0');

  window.setTimeout(function(){

    fetchHistory(currentPlanet());

    setPlanetChangeDetectors();

    addRefiningEmploymentCapacity();

  }, 1000);

}

unsafeWindow.fetchHistoryButtonClicked = fetchHistoryButtonClicked;



window.setTimeout(fetchHistoryButtonClicked, 2000); // fetch initial history