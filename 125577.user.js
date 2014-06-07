// ==UserScript==
// @name           Unit Formatter
// @description    Script that will format a list of your Troops and Ships ready for "Copy+Paste" into Chat...
// @include        http://*.ikariam.*/*?view=barracks*
// @include        http://*.ikariam.*/*?view=shipyard*
// @include        http://*.ikariam.*/*?view=cityMilitary*
// ==/UserScript==

var VERSION = "0.3";

GM_log('Start Unit Formatter v' + VERSION + '');

var StartTime = new Date().getTime();

var unitDivs, countDivs, thisUnitDiv, thisCountDiv;
unitDivs = document.evaluate(
  "//div[@class='unitinfo']",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);

countDivs = document.evaluate(
  "//div[@class='unitcount']",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);

var garrisonDivs;

garrisonDivs = document.evaluate(
  "//div[@class='contentBox01h']",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);

//GM_log('Found [' + unitDivs.snapshotLength + '] unitDivs');
//GM_log('Found [' + countDivs.snapshotLength + '] countDivs');
//GM_log('Found [' + garrisonDivs.snapshotLength + '] garrisonDivs');

var outputStr = '';

if (unitDivs.snapshotLength > 0 && unitDivs.snapshotLength == countDivs.snapshotLength) {

  //GM_log('barracks/shipyard view');
  
  var unitName, unitCount;
  
  for (var i = 0; i < unitDivs.snapshotLength; i++) {
    thisUnitDiv = unitDivs.snapshotItem(i);
    thisCountDiv = countDivs.snapshotItem(i);
    
    unitName = trim(thisUnitDiv.getElementsByTagName("h4")[0].textContent);
    unitCount = trim(thisCountDiv.firstChild.nextSibling.textContent);
    
    //GM_log('Unit [' + unitName + ']');
    //GM_log('Count [' + unitCount + ']');
    
    if (unitCount > 0) {
      if (outputStr != '') {
        outputStr += "\n";
      }
      outputStr += unitName + ": " + unitCount;
    }
  }
  
  var showBtn = document.createElement('div');
  showBtn.innerHTML = 'Show Unit Formatter';
	showBtn.addEventListener('click', showWindow, false);
	showBtn.setAttribute('style', 'text-align:center; font-weight:bold; font-size:14px; padding:4px 0px 2px 0px; cursor:pointer');
	
	var main = document.getElementById('mainview');
  main.insertBefore(showBtn, main.childNodes[2]);
  
  //GM_log('Output: [' + outputStr + ']');

} else if ( garrisonDivs.snapshotLength == 3 || garrisonDivs.snapshotLength == 4) {
  //GM_log('cityMilitary View');
  
  var theDiv = garrisonDivs.snapshotItem(0);
  
  var theTypes = theDiv.getElementsByTagName("th");
        
  //GM_log('types [' + theTypes.length + ']');
  
  var theCountRows = document.evaluate(
    "//tr[@class='count']",
    theDiv,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
  //GM_log('countRows [' + theCountRows.snapshotLength + ']');    
  
  var theCounts = new Array(theTypes.length);
  
  var rowOne = theCountRows.snapshotItem(0);
  var rowTwo = theCountRows.snapshotItem(1);
  
  var rowOneTDs = rowOne.getElementsByTagName("TD");
  var rowTwoTDs = rowTwo.getElementsByTagName("TD");
  
  var pos = 0;  
  
  for (var i = 0; i < rowOneTDs.length; i++) {
    theCounts[pos] = rowOneTDs.item(i).textContent;
    pos++;
  }
  
  for (var i = 0; i < rowTwoTDs.length; i++) {
    theCounts[pos] = rowTwoTDs.item(i).textContent;
    pos++;
  }
  
  for (var i = 0; i < theTypes.length; i++) {
    
    var unitName = theTypes[i].attributes[0].value;
    var unitCount = theCounts[i];
    
    //GM_log('Unit [' + unitName + '] Count [' + unitCount + ']');
    
    if (unitCount > 0) {
      if (outputStr != '') {
        outputStr += "\n";
      }
      outputStr += unitName + ": " + unitCount;
    }  
  }

  var showBtn = document.createElement('div');
  showBtn.innerHTML = 'Show Unit Formatter';
	showBtn.addEventListener('click', showWindow, false);
	showBtn.setAttribute('style', 'text-align:center; font-weight:bold; font-size:14px; padding:4px 0px 2px 0px; cursor:pointer');
	
	var main = document.getElementById('mainview');
  main.insertBefore(showBtn, main.childNodes[2]);
  
  
  //GM_log('Output: [' + outputStr + ']');
}
	
function hideWindow() { document.getElementById('unitFormatter').style.display = 'none'; }

function showWindow() { 
  if (document.getElementById('unitFormatter')) {
    document.getElementById('unitFormatter').style.display = 'block';
  } else {
    var container = document.createElement('div');
    var ta = document.createElement('textarea');
    var closeBtn = document.createElement('div');
    
    container.innerHTML = '<div style="height:30px; font-size:14px; font-weight:bold; text-align:center;"><a target="_blank" href="http://userscripts.org/scripts/show/47612">Unit Formatter</a> (Version ' + VERSION + ')</div>';
    container.innerHTML += '<div style="text-align:center;">written by HardCorePawn</div>';
    ta.id = 'formattedUnits';
    ta.setAttribute('rows', 12);
    ta.setAttribute('cols', 35);
    ta.setAttribute('readonly', '');
    ta.addEventListener('click', function() { this.focus(); this.select(); }, false);
    ta.innerHTML = outputStr;
    container.appendChild(ta);
    
    closeBtn.innerHTML = 'Close Window';
    closeBtn.addEventListener('click', hideWindow, false);
    closeBtn.setAttribute('style', 'text-align:center; font-weight:bold; padding:4px 0px 2px 0px; cursor:pointer');
    container.appendChild(closeBtn);
    container.setAttribute('style', 'border:2px outset; position:fixed; top:' + (window.screen.height/2-200) + 'px; left:' + ((window.screen.width / 2)-150) + 'px; background:url("http://s14.ikariam.org/skin/layout/bg_stone.jpg") top left; width:300px; text-align:center;');
    container.id = 'unitFormatter';
    var main = document.getElementById('mainview');
    main.appendChild(container);
  }
}

var EndTime = new Date().getTime();
GM_log('Ended Unit Formatter after '+((EndTime - StartTime)/1000)+'s');

function trim(str) {

  return str.replace(/^\s+|\s+$/g, "");

}