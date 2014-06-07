// ==UserScript==
// @name TF2R - Create Raffle Item Filter
// @namespace	elvissteinjr
// @description	Adds a search field and quality filter for items on the raffle creation page on tf2r.
// @include	http://tf2r.com/newraf.html
// @grant	none
// ==/UserScript== 

function filteritems()
{
  var searcht = document.getElementById('filterbox').value;
  var toSearch = origlist.slice();
   
  var parent = document.getElementById('allitems');
  parent.innerHTML = "";
   
  for(var i = 0, l = toSearch.length; i < l; i++) {
    if (toSearch[i].getAttribute("iname").toLowerCase().indexOf(searcht.toLowerCase())>=0) {
      if (toSearch[i].getAttribute("id") == "notselected") {
        if ((toSearch[i].getAttribute("iqual") == filterq) || (filterq == "all")) {
            parent.appendChild(toSearch[i]);
        }
      }
    }
  }
}

function setqfilter(newfilter)
{
  filterq = newfilter;
  filteritems();  
}

var origlist = document.getElementById('allitems').children;
origlist = Array.prototype.slice.call(origlist, 0);
var boxp = document.getElementsByTagName("td")[2];
boxp.innerHTML += "</br><div style='float: left;'>Search: <input type='text' id='filterbox' onkeydown='filteritems()' onpaste='filteritems()' oninput='filteritems()'/>";

var qualc6 = 0, qualc3 = 0, qualc1 = 0, qualc5 = 0, qualc13 = 0, qualc11 = 0, qualc9 = 0;
var filterq = "all";
var buttonstyle = ".qualitybutton {\
width: 23px; \
height: 19px; \
margin-left: 3px; \
margin-top: 3px; \
border: 3px; \
border-radius: 3px; \
text-align: center; \
box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.298); \
background-image: linear-gradient(to bottom, rgba(246, 246, 246, 0.145), rgba(9, 9, 9, 0.157) 70%) !important; \
float: left; \
color: #111111; \
cursor: pointer; } \
.qualitybutton:hover { \
color: #FFFFFF; \
text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.600); }";

//Inject style
var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = buttonstyle;
} else {
  style.appendChild(document.createTextNode(buttonstyle));
}
head.appendChild(style);

//Count Item Qualities
for(var i = 0, l = document.getElementById('allitems').children.length; i < l; i++) {
  switch(document.getElementById('allitems').children[i].getAttribute("iqual")) {
    case "6": qualc6 += 1; break;
    case "3": qualc3 += 1; break;
    case "1": qualc1 += 1; break;
    case "5": qualc5 += 1; break;
    case "13": qualc13 += 1; break;
    case "11": qualc11 += 1; break;
    case "9": qualc9 += 1; break;
  }
}  

if (qualc6 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(6)' class='qualitybutton' id='qfilter6' style='background:#FFD700;'>" + qualc6 + "</div>";
}
if (qualc3 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(3)' class='qualitybutton' id='qfilter3' style='background:#476291'>" + qualc3 + "</div>";
}
if (qualc1 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(1)' class='qualitybutton' id='qfilter1' style='background:#4D7455'>" + qualc1 + "</div>";
}
if (qualc5 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(5)' class='qualitybutton' id='qfilter5' style='background:#8650AC'>" + qualc5 + "</div>";
}
if (qualc13 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(13)' class='qualitybutton' id='qfilter13' style='background:#38F3AB'>" + qualc13 + "</div>";
}
if (qualc11 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(11)' class='qualitybutton' id='qfilter11' style='background:#CF6A32'>" + qualc11 + "</div>";
}
if (qualc9 > 0) {
  boxp.innerHTML += "<div onclick='setqfilter(9)' class='qualitybutton' id='qfilter9' style='background:#70B04A'>" + qualc9 + "</div>";
}
boxp.innerHTML += "<div onclick='setqfilter(\"all\")' class='qualitybutton' id='qfilterall' style='background:#EEE'>All</div></div>";
//Last div has to be closed to set eventlisteners
if (qualc6 > 0) {
  document.getElementById('qfilter6').addEventListener('click', function(){setqfilter(6);});
}
if (qualc3 > 0) {
  document.getElementById('qfilter3').addEventListener('click', function(){setqfilter(3);});
}
if (qualc1 > 0) {
  document.getElementById('qfilter1').addEventListener('click', function(){setqfilter(1);});
}
if (qualc5 > 0) {
  document.getElementById('qfilter5').addEventListener('click', function(){setqfilter(5);});
}
if (qualc13 > 0) {
  document.getElementById('qfilter13').addEventListener('click', function(){setqfilter(13);});
}
if (qualc11 > 0) {
  document.getElementById('qfilter11').addEventListener('click', function(){setqfilter(11);});
}
if (qualc9 > 0) {
  document.getElementById('qfilter9').addEventListener('click', function(){setqfilter(9);});
}
document.getElementById('qfilterall').addEventListener('click', function(){setqfilter("all");});
document.getElementById('filterbox').addEventListener('keydown', filteritems, false);
document.getElementById('filterbox').addEventListener('paste', filteritems, false);
document.getElementById('filterbox').addEventListener('input', filteritems, false);