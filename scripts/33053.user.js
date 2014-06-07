//
// ==UserScript==
// @name          Conquer Club Map XML
// @namespace     http://userscripts.org/
// @description   Collects info from map xmls
// @include       http://www.conquerclub.com/*
// ==/UserScript==


var total = 0;
var maps = [];
var xml = [];
var mstatus = [];
var mapReq = [];
var mapinfo = new Object();
var dhtml = "";
var viewer = null;

function MapInfo() {
this._terr = 0;
this._initial = 0;
this._objectives = 0;
this._complexity = 0;
}

function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if (exact)
   {
    if(oElement.className==strClassName){
    arrReturnElements.push(oElement);
    }
   }
   else
   {
    if(oElement.className.has(strClassName)){
     arrReturnElements.push(oElement);
    }
   }
  }
  return (arrReturnElements)
}

function previousSib(node){
  var tempNode=node.previousSibling;
  while(tempNode.nodeType!=1){
    tempNode=tempNode.previousSibling;
  }
  return tempNode;
}

function nextSib(node){
  var tempNode=node.nextSibling;
  while(tempNode.nodeType!=1){
    tempNode=tempNode.nextSibling;
  }
  return tempNode;
}


function endMap() {
dhtml = "<table border=1>";
dhtml += "<tr><td>Map</td><td>Territories</td><td>Total Initial</td><td>2/3p</td><td>4p</td><td>5p</td><td>6p</td><td>7p</td><td>8p</td></tr>";
for(var r in mapinfo) {
var ind = xml.indexOf(r);
dhtml += "<tr><td>" + maps[ind] + "</td><td>" + mapinfo[r]._terr + "</td><td>" + mapinfo[r]._initial + "</td>";
for(var p=3; p<=8; p++) {
dhtml += "<td>" + Math.floor(mapinfo[r]._initial / p) + "</td>";
}
dhtml += "</tr>";
}
dhtml += "</table><br /><br /><span>Ignore Below</span><br />";

for(var r in mapinfo) {
var ind = xml.indexOf(r);
dhtml += maps[ind] + " " + mapinfo[r]._terr + " " + mapinfo[r]._initial + " " + mapinfo[r]._objectives + " " + mapinfo[r]._complexity + " " + mstatus[ind] + "<br />";
}
viewer = window.open('','box','width=1000,height=470,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');

dhtml += "<br />" + maps;
mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
mObj.innerHTML = dhtml;


}

function getXML(xml) {
    mapReq[xml] = new XMLHttpRequest();
    mapReq[xml].open('GET', "http://www.conquerclub.com/maps/" + xml, true);
    mapReq[xml].onreadystatechange = function() {
    if (mapReq[xml].readyState == 4) {
     var parser = new DOMParser();
     var dom = parser.parseFromString(mapReq[xml].responseText,"application/xml");
     var coord = dom.getElementsByTagName('coordinates');
     var positions = dom.getElementsByTagName('position');
     var obj = dom.getElementsByTagName('objective');
     var bomb = dom.getElementsByTagName('bombardments');
     var over = dom.getElementsByTagName('overrides');
     mapinfo[xml]._terr = coord.length;
     mapinfo[xml]._complexity = (obj.length > 0) + (bomb.length > 0) + (over.length > 0);
     mapinfo[xml]._complexity += (obj.length > 1) + (bomb.length > 1) + (over.length > 1);
     var ct = new Object();
     var cnt = 0;
     var neutrals = 0;
     for(c=0; c< coord.length; c++) {
       var sib = previousSib(coord[c]);
       if(sib.getElementsByTagName('bombardment').length) sib = previousSib(sib);
       var name = previousSib(sib).firstChild.nodeValue;
       if(coord[c].parentNode.getElementsByTagName('neutral').length)
       ct[name] = 0;
       else
       ct[name] = 1;
     }
     for(n=0; n< positions.length; n++) {
       var names = positions[n].getElementsByTagName('territory');
       for(var k=0; k< names.length; k++) {
         var name = names[k].firstChild.nodeValue;
         ct[name] = 1;
       }
     }
     for(var t in ct) {
       if(ct[t])
       cnt++;
     }
     mapinfo[xml]._initial = cnt;
     mapinfo[xml]._objectives = obj.length? 1:0;
     total++;
     if(total == maps.length) {
      endMap();
     }
    }
    }
    mapReq[xml].send(null);
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.conquerclub.com/maps/maps.xml?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
    var mapxml = dom.getElementsByTagName('xml');
    var mapname = dom.getElementsByTagName('title');
    var mapstatus = dom.getElementsByTagName('status');
    var gmMenu = document.createElement('div');
    gmMenu.id="xml";
    for(var i=0; i< mapxml.length; i++) {
      maps[i] = mapname[i].firstChild.nodeValue;
      xml[i] = mapxml[i].firstChild.nodeValue;
      if(mapstatus[i].firstChild.nodeValue.match(/_normal/)) mstatus[i] = 0;
      else if(mapstatus[i].firstChild.nodeValue.match(/_beta/)) mstatus[i] = 1;
      else if (mapstatus[i].firstChild.nodeValue.match(/_new/)) mstatus[i] = 2;
      else mstatus[i] = -1;
    }
    var html = "<h3><b>Map XML</h3>";
    gmMenu.innerHTML = html;
    ul[0].parentNode.appendChild(gmMenu);
    ul = document.createElement ('ul');
    ul.style.borderWidth = "1px 1px 0px 1px";
    ul.style.width = "151px";
    ul.innerHTML += "<li><a href=\"javascript:void(0);\" id=mxml>Get Map XML</a></li>";
    gmMenu.appendChild(ul);
    ul = document.createElement('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    document.getElementById('mxml').addEventListener('click', function() {
       total = 0;
       dhtml = "";
       mapinfo = new Object();
       for(var m=0; m< maps.length; m++) {
         mapinfo[xml[m]] = new MapInfo();
         getXML(xml[m]);
       }
    }
    , true);
  }
});
}
}

