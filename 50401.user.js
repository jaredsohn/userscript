// ==UserScript==
// @name           rts
// @namespace      http://userscripts.org/users/rts
// @include        http://www.space-project.lt/report/show/id/combat/*
// @include        http://www.space-project.net/report/show/id/combat/*
// ==/UserScript==


teranPayloadSize = new Array(0,60,250,250,2500,0,0,2000,1500,3000,2000,0);
titanPayloadSize = new Array(0,0,0,1000,0,0,0,0,800,5000,2000,5000);
xenPayloadSize = new Array(0,0,120,180,1200,6000,0,0,0,0,2000,2000);
var specie = 0;
var meta = document.getElementById("meta");
var aArray = meta.getElementsByTagName("a");
for (var i in aArray) {
  if (aArray[i].getAttribute("href") == "/userProfile") {

    var str = aArray[i].innerHTML;
    var spec = str.substring( str.lastIndexOf("(") + 1, str.lastIndexOf(")") );
    if (spec == "Teran") {
      specie = 1;
    } else if (spec == "Titan") {
      specie = 2;
    } else if (spec == "Xen") {
      specie = 3;
    }
  }
}
if (specie > 0) {
  var payloadSize = null;
  switch (specie) {
    case 1: payloadSize = teranPayloadSize;
    case 2: payloadSize = titanPayloadSize;
    case 3: payloadSize = xenPayloadSize;
  }
  var boxContent = document.getElementsByClassName("boxContentInner")[0];
  var p = boxContent.getElementsByTagName("P")[boxContent.getElementsByTagName("P").length-1];
  if (boxContent.getElementsByTagName("P").length > 1) {
    var pArray = p.innerHTML.split(" ");
    var sum = 0;
    for(var i in pArray) {
      if (parseInt(pArray[i]) > 0) {
        sum += parseInt(pArray[i]);
      }
    }
    var table = boxContent.getElementsByTagName("table")[0];
    var trArray = table.getElementsByTagName("tr");
    var capacity = 0;
    var tdArray = trArray[1].getElementsByTagName("td");
    var tdArray2 = trArray[2].getElementsByTagName("td");
    for (var i = 1; i < tdArray.length; i++) {
      capacity += (parseInt(tdArray[i].innerHTML) - parseInt(tdArray2[i].innerHTML)) * payloadSize[i-1];
    }
    p.innerHTML += " Sum: " + sum + " Capacity: " + capacity;
  }
} else {
  alert("Unknown specie");
}