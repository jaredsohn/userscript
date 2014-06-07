// ==UserScript==
// @name           Travian - show online alliance members in every page
// @namespace      TWADZREM
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// @version       0.85
// ==/UserScript=='

var minutesSet = 5; //minute delay to check ally online

	function toSeconds(hTime) {p = hTime.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);}

var refreshImg = "data:image/gif;base64,R0lGODlhEAAQAMQYALV9EP/PWq1tEL2CEP//7//77/fbhP/be//fhP/TY7V5EP/fe/fjrffTc8aaIf/jjP/bhMaWGP/rlKVpEK1xEP/rnP/ztb2GEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAAQABAAAAVVICaOZGmS13WaF6Gu40AQQw0DkqVbBrAqi4pQ2HCsKAEEBamECQICzDMqeqVEkwl21FJdCq/T15IqMMKly2OnM0RWgMOwcvAdl5AEBTaaJLR8WIAnIQA7";

var urlVars = getUrlVars();
if (urlVars["onlineAllyFilter"] != null) {
GM_setValue("onlineallyfilter", urlVars["onlineAllyFilter"]);
}
function getUrlVars() {
   var map = {};
   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
   map[key] = value;
   });
   return map;
}

function refreshList() {
document.getElementById("allianceOnlineList").removeChild(document.getElementById("allianceOnlineTable"));
updateList();
}

function updateList() {
var allianzPage = GET("/allianz.php");

var temp = document.createElement("span");
temp.innerHTML = allianzPage;

var info = fastEval('//table[@id="member"]/tbody/tr', temp);

var dataAdd = "";

  for ( var i=0 ; i < info.snapshotLength; i++ ){

	var row = document.createElement("tr");
	
    var tds = info.snapshotItem(i).getElementsByTagName("td");
	var stats = [];
	stats[2] = tds[4].getElementsByTagName("img")[0].getAttribute("class");
	stats[0] = tds[0].innerHTML;
	stats[1] = tds[1];
	stats[1] = stats[1].getElementsByTagName("a")[0].getAttribute("href") + "][" + stats[1].getElementsByTagName("a")[0].innerHTML;
	dataAdd += stats[0] + "--" + stats[1] + "--" + stats[2] + "|";
    
  }
  generateTable("Show online status of ally members", dataAdd, true);

var date = new Date();
date.setTime(date.getTime()+(minutesSet*60*1000));

//document.cookie = 'getonlineallys=no; expires=' + date + '; path=/';

GM_setValue("onlineallycache", dataAdd);
GM_setValue("getonlineallys", toSeconds(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()) + "%" + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear());

}

function GET(url){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send("");
  respText=xhttp.responseText;
  return respText;
}
function fastEval(xpath, context){
  return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var nowdate = new Date();
var nowday = nowdate.getDate() + "." + (nowdate.getMonth()+1) + "." + nowdate.getFullYear();
nowdate = toSeconds(nowdate.getHours() + ":" + nowdate.getMinutes() + ":" + nowdate.getSeconds());

var goa = GM_getValue("getonlineallys").toString().split("%");


if (goa == undefined) {

updateList();

}
else if (goa[0] <= nowdate || goa[1] != nowday) {
GM_deleteValue("getonlineallys");
updateList();
}
else {
var allyCache = GM_getValue("onlineallycache");

if (allyCache != null) {

generateTable("Show online status of ally members (cached)", allyCache, true);

}
}


function generateTable(titleText, valueArray, includeRefresh) {

if (GM_getValue("onlineallyfilter") != null) {
var allyFilter = GM_getValue("onlineallyfilter");
}
else {
var allyFilter = null;
}

var split1 = valueArray.split("|");

var target = document.getElementById("side_info");
var tbl     = document.createElement("table");
var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");

var countBalls = [];
countBalls[1] = 0;
countBalls[2] = 0;
countBalls[3] = 0;
countBalls[4] = 0;
countBalls[5] = 0;

  for ( var i=0 ; i < split1.length - 1; i++ ){

	var row = document.createElement("tr");
	
    var tds = split1[i].split("--");
	var stats = [];
	stats[0] = tds[0];
	stats[1] = tds[1];
	stats[2] = tds[2];
	var ballNum = stats[2].replace("online", "");
	
	countBalls[ballNum] = 1;
	
	for (var c = 0; c < 3; c++) {
                var cell = document.createElement("td");
				
                cell.innerHTML  = stats[c];
				if (c ==1) {
				var split3 = stats[1].split("][");
				cell.innerHTML = "<a href='" + split3[0] + "'>" + split3[1] + "</a>";
				}
				if (c == 2) {
				cell.innerHTML = "<img src='img/x.gif' class='" + stats[2] + "'>";
				}
                row.appendChild(cell);
    }
	if (allyFilter == null || allyFilter == "" || allyFilter == "all") {
	tblBody.appendChild(row);
	}
	else if(allyFilter == stats[2]) {
	tblBody.appendChild(row);
	}
    
  }

  	var row = document.createElement("tr");
    var cell = document.createElement("td");
	cell.innerHTML  = "";
    var cell2 = document.createElement("td");
	cell2.innerHTML  = "Filter: " + MImg(countBalls);
	row.appendChild(cell);
	row.appendChild(cell2);

    
	
	tblBody.appendChild(row);
  
var row = document.createElement("tr");
var cell = document.createElement("td");
var alink = document.createElement("a");
alink.setAttribute("href", "/allianz.php");
alink.innerHTML = titleText;
cell.appendChild(alink);
if (includeRefresh == true) {
var refreshlink = document.createElement("a");
refreshlink.addEventListener("click", refreshList, false);
refreshlink.innerHTML = " <img src='" + refreshImg + "'>";
refreshlink.setAttribute("href", "#");
cell.appendChild(refreshlink);
}
cell.setAttribute("colspan", "3");
row.appendChild(cell);
tblHead.appendChild(row);

tbl.appendChild(tblHead);
tbl.appendChild(tblBody);

var allyDiv = document.createElement("div");
allyDiv.setAttribute("id", "allianceOnlineList");
allyDiv.appendChild(tbl);
		
target.appendChild(allyDiv);
		
tbl.setAttribute("cellspacing", "1");
tbl.setAttribute("cellpadding", "1");
tbl.setAttribute("id", "allianceOnlineTable");

}

function MImg(num) {
var full = "";
full += "<a href='?onlineAllyFilter=all'>all</a> ";
for (var g = 1; g < 6; g++) {
if (num[g] == 1) {
full += "<a href='?onlineAllyFilter=online" + g + "'><img class='online" + g + "' src='img/x.gif'></a> ";
}
}
return full;
}