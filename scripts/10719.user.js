// ==UserScript==
// @name           resource dropoff summery
// @namespace      none
// @description    adds a line to the overview, that shows the total amount of resources  on-routh by fleet to current planet.
// @include        *ogame*org*overview*
// ==/UserScript==

var spans = document.evaluate('//SPAN', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var handle;
var tag;
var fleetOK = false;
var planetName;
var i;
var resText;
var textHandle;
var sums = new Array();
sums[0] = 0;
sums[1] = 0;
sums[2] = 0;

// find planet name
var planetList = document.evaluate('//SELECT', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
for(i=0; i<planetList.options.length; i++){
  if(planetList.options[i].selected){
    planetName=planetList.options[i].innerHTML;
    planetName = planetName.slice(0, planetName.indexOf(" [")-3);
  }
}


for (i=0 ; i < spans.snapshotLength; i++ ){
  handle=spans.snapshotItem(i);
  // make sure it's a fleet message
  if(handle.firstChild.data.indexOf(" ")>=0){
    // now, make sure it's a resource dropping fleet
    fleetOK=false;
    if (missionIs(handle, "Transport") && fleetReachesThisPlanet(handle)){
      fleetOK=true;
    } else if (missionIs(handle, "Deployment") && fleetReachesThisPlanet(handle)){
      fleetOK=true;
    } else if (missionIs(handle, "Harvest") && fleetReturnsToThisPlanet(handle)){
      fleetOK=true;
    } else if(missionIs(handle, "Attack") && fleetReturnsToThisPlanet(handle)){
      fleetOK=true;
    }
    if(fleetOK){
      // now, find the last A tag
      tag = handle.lastChild.previousSibling;
      // and phrase the resources
      resText = tag.title;
      textHandle = resText.slice(resText.indexOf("Metal")+7);
      textHandle = textHandle.slice(0, textHandle.indexOf(" "));
      sums[0]+=Number(textHandle.replace(".", ""));
      textHandle = resText.slice(resText.indexOf("Crystal")+9);
      textHandle = textHandle.slice(0, textHandle.indexOf(" "));
      sums[1]+=Number(textHandle.replace(".", ""));
      textHandle = resText.slice(resText.indexOf("Deuterium")+11);
      sums[2]+=Number(textHandle.replace(".", ""));
    }
  }
}
resText = "Metal: " + fixNum(sums[0]) + ", Crystal: " + fixNum(sums[1]) + ", Deuterium: " + fixNum(sums[2]) + ".";


// find main table
var tableList= document.getElementsByTagName("TABLE");
alertText = ">";
handle=tableList[6];
// add new row and cell
var newRow=handle.insertRow(handle.rows.length-5);
var newCell=newRow.insertCell(0)
newCell.className="c";
newCell.colSpan = 5;
newCell.appendChild(document.createTextNode("Total dropoff to this planet  - " + resText));

function missionIs(fleet, mission){
  if(fleet.innerHTML.indexOf(mission)>=0){
    return true;
  } else {
    return false;
  }
}
function fleetReturning(fleet){
  if(fleet.innerHTML.indexOf(" was: ")>=0){
    return true;
  } else {
    return false;
  }
}
function fleetReachesThisPlanet(fleet){
  if(fleet.innerHTML.indexOf("reaches Planet " + planetName)>=0){
    return true;
  } else{
    return false;
  }
}
function fleetReturnsToThisPlanet(fleet){
 if(fleet.innerHTML.indexOf("returns from")>=0 && fleet.innerHTML.indexOf("to Planet "+planetName)>=0){
    return true;
  } else{
    return false;
  }
}

function fixNum(num){
  var arr = new Array();
  str=reverseString(num.toString());
    for(var i=0; i<str.length; i++){
      if(!(i%3))
      arr[i/3]=str.slice(i, Math.min(i+3, str.length));
    }
  return reverseString(arr.join());
}
function reverseString(str){
  var srr="";
  for(var w=0; w<str.length; w++){
    srr+=str.charAt(str.length-w-1);
  }
  return srr;
}