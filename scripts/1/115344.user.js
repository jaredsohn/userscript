//
// ==UserScript==
// @name          Conquer Club Clan Rank
// @namespace     http://userscripts.org/
// @description   
// @include       http://www.conquerclub.com/*
// @include       https://www.conquerclub.com/*
// ==/UserScript==

Array.prototype.tsort = function(alpha,ref,type) {
if(alpha) this.sort(function(a,b) {
	return ((totals[ref][a][type] > totals[ref][b][type]) - (totals[ref][a][type] < totals[ref][b][type]));
});
else this.sort(function(a,b) {
	return (totals[ref][a][type] - totals[ref][b][type]);
});
}

var sorters = {'_users' : new Array(new Sorter(1,"_name"), new Sorter(1,"_country"), new Sorter(0,"_score"), new Sorter(0,"_played") , new Sorter(0,"_won"), new Sorter(0,"_perc"), 
                          new Sorter(0,"_attend") , new Sorter(0,"_rating"), new Sorter(0,"_medals"), new Sorter(0, "_days")),
               '_battle': new Array(new Sorter(0,null),new Sorter(1,"_winners"),new Sorter(1,"_mps"),new Sorter(1,"_p1"),new Sorter(1,"_p2")) 
};
var transgt = {"&np=2" : "1v1", "&gt=D" : "Doubles", "&gt=T" : "Triples", "&gt=Q" : "Quadruples", "" : ""};

var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() );

function encodeamper(raw) {
	return(raw.replace("&","&amp;"));
}

function decodeamper(amper) {
	return(amper.replace("&amp;","&"));
}

var acronyms = {
	"Any Clan" : "ALL",
"++The Legion++":"Legion",
"A Fistful of Sixes":"AFOS",
"A Question of Honour":"AQoH",
"Agents of the Chaotic Empire":"ACE",
"AKA (Always Kicking A$$)":"AKA",
"Army of Kings(AoK)":"AOK",
"Atlantis":"ATL",
"Clan Fiso":"FISO",
"de Veroveraars Der Lage Landen":"VDLL",
"Death By Comity":"DBC",
"DYNASTY":"DYN",
"Generation One: The Clan":"G1",
"Grim Reapers":"GRIM",
"Igni Ferroque":"IF",
"Kill On Arrival":"KOA",
"Knights of the Round Table":"KORT",
"Knights Templar":"KT",
"Legends of the Zone":"LOTZ",
"Legends of War":"LOW",
"Les Hussards du Dragon (LHDD)":"LHDD",
"Magnificent Bastards":"MB",
"Manifest Destiny":"MD",
"Memento Mori":"MM",
"Mythology":"MYTH",
"One Step Ahead":"OSA",
"Otpisani":"OTP",
"Retribution (Ret)":"RET",
"Riders on the Storm":"RotS",
"Risk Attackers":"RA",
"Spelunkers of Hell":"SOH",
"The Bullet-Proof Bandits":"BPB",
"The Devil's Brigade":"DB",
"The Fallen":"FALL",
"The Fantastic Four-Skins":"TFFS",
"The Fraternal Order of Exceptional Drinkers":"FOED",
"The Headless Horsemen":"THH",
"The Immortal Assassins":"IA",
"The Imperial Dragoons":"ID",
"The Last Warriors":"TLW",
"The New Crusade":"TNC",
"The Odd Fellows Union":"TOFU",
"THE PACK":"PACK",
"The Pain Dispensers":"TPD",
"The Pig Renters":"PIG",
"The Spanking Monkeys":"TSM",
"The Ulti-M8's ":"UM8",
"Venimus, Vidimus, Vicimus - VVV ":"VVV",
"Warriors At Risk":"WAR",
"You'll Never Walk Alone":"YNWA",
"Aeternus (ATN)":"ATN",


};

var clans;
var cReq = [];
var lReq = []
var pajax = [];
var cajax = [];
var najax = [];
var pages = new Object();
var ngames = new Object();
var nwins = new Object();
var consd = new Array();
var totals;
var lajax,bajax;
var viewer = null;
var groups = new Object();
var cl = 0;
var ec = 0;
var ps = 0;
var lab1,lab2;
var pmap = new Object();
var clanall = new Array();

function Totals() {
this._counter = 0;	
this._pages = 0;
this._target = 0;
this._score = 0;
this._played = 0;
this._won = 0;
this._perc = 0;
this._attend = 0;
this._rating = 0;
this._medals = 0;
this._joined = "";
this._days = 0;
this._battle = new Object();
this._users = new Object();
this._groups = new Object();
this._order = new Array();
}

function Clans() {
	this._members = new Object();
}

Date.MONTHNAMES = {'Jan' : 'January', 'Feb' : 'February', 'Mar' : 'March', 'Apr' : 'April',
                             'May' : 'May' , 'Jun' : 'June' , 'Jul' : 'July', 'Aug' : 'August',
                             'Sep' : 'September', 'Oct' : 'October' , 'Nov' : 'November', 'Dec' : 'December'};

function User(name, head) {
 this._name = name;
 this._leader = head;
 this._country = "";
 this._score = 0;
 this._status = "";
 this._played = 0;
 this._won = 0;
 this._perc = 0;
 this._attend = 0;
 this._rating = 0;
 this._medals = 0;
 this._joined = "";
 this._groups = new Array();	
 this._days = 0;
 this._guest = 0;
}

function Battle() {
	this._winners = "";
	this._mps = "";
	this._p1 = new Array();
	this._p2 = new Array();
}

function convToDays(joinDate) {
	var myDate = new Date(joinDate);
	var today = new Date();
	var diff = today.getTime() - myDate.getTime();
	return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function Sorter(alpha,fn) {
this._alpha = alpha;
this._dir = 0;
this._fn = fn;
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

function nextSib(node){
  var tempNode=node.nextSibling;
  while(tempNode.nodeType!=1){
    tempNode=tempNode.nextSibling;
  }
  return tempNode;
}

function cboxValues(name) {
 var cbox = document.getElementsByName(name);
 var out = [];
  for(var n=0;n<cbox.length;n++) {
    if(cbox[n].checked) out.push(cbox[n].value);
  }
  return out;
}

function setTable() {
var x = "<tr><td id=sort0 class=sorton>Player</td><td id=sort1 class=sorton>Country</td><td id=sort2 class=\"sorton med\">Score</td>";
x += "<td id=sort3 class=\"sorton med\">Played</td><td id=sort4 class=\"sorton med\">Wins</td><td id=sort5 class=\"sorton tiny\">Win %</td>";
x += "<td id=sort6 class=\"sorton tiny\">Attendance</td><td id=sort7 class=\"sorton tiny\">Rating</td>";
x += "<td id=sort8 class=\"sorton tiny\">Medals</td><td id=sort9 class=\"sorton med\">CC Days</td><td>Status</td><td>Joined</td></tr>";
var z = "<tr><td colspan=2>Groups</td></tr>";
z += '<tr><td style=\"text-align:center\" colspan=2>';
for(var y in totals._groups) {
 z += y + ":" + totals._groups[y] + "<br />";
}	     
z +=  "</td></tr><tr><td id=res0 class=sorton>Player</td><td>Groups</td></tr>";	     
x += "<tr><td>Clan Total</td><td>&nbsp;</td>";
x += "<td class=med>" + totals._score + "</td>";
x += "<td class=med>" + totals._played + "</td>";
x += "<td class=med>" + totals._won + "</td>";
x += "<td>&nbsp;</td>";
x += "<td>&nbsp;</td>";
x += "<td>&nbsp;</td>";
x += "<td class=tiny>" + totals._medals + "</td>";
x += "<td class=med>" + totals._days + "</td>";
x += "<td>&nbsp;</td>";
x += "<td>&nbsp;</td></tr>";

x += "<tr><td>Clan Average</td><td>&nbsp;</td>";
x += "<td class=med>" + (totals._score / (totals._order.length)).toFixed(0) + "</td>";
x += "<td class=med>" + (totals._played / (totals._order.length)).toFixed(0) + "</td>";
x += "<td class=med>" + (totals._won / (totals._order.length)).toFixed(0) + "</td>";
x += "<td class=tiny>" + (totals._perc / (totals._order.length)).toFixed(0) + "%</td>";
x += "<td class=tiny>" + (totals._attend / (totals._order.length)).toFixed(0) + "%</td>";
x += "<td class=tiny>" + (totals._rating / (totals._order.length)).toFixed(1) + "</td>";
x += "<td class=tiny>" + (totals._medals / (totals._order.length)).toFixed(0) + "</td>";
x += "<td class=med>" + (totals._days / (totals._order.length)).toFixed(0) + "</td>";
x += "<td>&nbsp;</td>";
x += "<td>&nbsp;</td></tr>";
var i = 0;
for(var r=0; r< totals._order.length; r++) {
 if(i & 1) trc = "<tr class=mrodd><td>";
 else trc = "<tr class=mreven><td>";	
 if(totals._users[totals._order[r]]._guest) single = "<span class=guest>" + totals._users[totals._order[r]]._name + "</span>";
 else if(totals._users[totals._order[r]]._leader) single = "<span class=leader>" + totals._users[totals._order[r]]._name + "</span>";
 else single = "<span class=member>" + totals._users[totals._order[r]]._name + "</span>";
 z += trc  + single + "</td><td>";
 x += trc + single + "</td><td>";
 x += totals._users[totals._order[r]]._country  + "</td>";
 x += "<td class=med>" + totals._users[totals._order[r]]._score + "</td><td class=med>" + totals._users[totals._order[r]]._played + "</td><td class=med>" + totals._users[totals._order[r]]._won + "</td><td class=tiny>" + totals._users[totals._order[r]]._perc + "%</td>";
 x += "<td class=tiny>" + totals._users[totals._order[r]]._attend + "%</td><td class=tiny>" + totals._users[totals._order[r]]._rating + "</td><td class=tiny>" + totals._users[totals._order[r]]._medals + "</td>";
 x += "<td class=med>" + totals._users[totals._order[r]]._days + "</td>";
 x += "<td class=tiny>" + totals._users[totals._order[r]]._status + "</td>";
 x += "<td> " + totals._users[totals._order[r]]._joined + "</td></tr>";
 for(y=0; y< totals._users[totals._order[r]]._groups.length; y++) {
  z += totals._users[totals._order[r]]._groups[y] + "<br />";
 }
 z += "</td></tr>";
 i++;
}
viewer.document.getElementById('ranktable').innerHTML = x;
viewer.document.getElementById('restable').innerHTML = z;	
for(var j=0; j< sorters['_users'].length; j++) {
  viewer.document.getElementById('sort' + j).addEventListener('click', function() {
	sortByCol(totals._order,parseInt(this.id.split('sort')[1]),"_users");
	setTable();
  },true);
}
viewer.document.getElementById('res0').addEventListener('click', function() {
sortByCol(totals._order,0,"_users");
setTable();
},true);
}

function endGame() {
setTable();
viewer.document.getElementById('closeRank').style.opacity = "0.9";
viewer.document.getElementById('closeRank').style.backgroundColor = "green";
viewer.document.getElementById('progress').innerHTML = "<b>Scan Complete. Click on light blue column headers to sort. Click again to reverse sort.</b>";
}


function sortByCol(arr,col,ref) {
if(sorters[ref][col]._fn != null) arr.tsort(sorters[ref][col]._alpha,ref,sorters[ref][col]._fn);
else if(sorters[ref][col]._alpha) arr.sort();
else arr.sort(function(a,b) {return(parseInt(a) - parseInt(b));});	
if(sorters[ref][col]._dir) arr.reverse();
sorters[ref][col]._dir = sorters[ref][col]._dir ? 0 : 1;
}

function getClanMembers(lab,page) {
  var jump = "http://www.conquerclub.com/forum/memberlist.php?g=" + lab + "&mode=group";
	if(page > 1) jump += "&start=" + (50 * (page - 1));
    lReq[lab + '|' + page] = new XMLHttpRequest();
    lReq[lab + '|' + page].open('GET', jump, true);
    lReq[lab + '|' + page].onreadystatechange = function() {
      if (lReq[lab + '|' + page].readyState == 4) {
        var div=document.createElement('div');
        div.innerHTML = lReq[lab + '|' + page].responseText;
        var pagination = getElementsByClassName(div,'li','rightside pagination',true);
        var cnm = div.getElementsByTagName('h2')[0].innerHTML;
        if(pagination[0].innerHTML.match(/of <strong>(\d+)</)) thisPage = parseInt(RegExp.$1);
        if(page == 1) {
           if(thisPage > 1) {
             for(var pg=2;pg<=thisPage;pg++) {
             getClanMembers(lab,pg);
             }
           }
         }
         var tables = getElementsByClassName(div,'table','table1',true);
         for(var t=0; t<tables.length; t++) {
	         var spans = tables[t].getElementsByTagName('span');
	         for(var s=0; s<spans.length; s++) {
		         var anc = nextSib(spans[s]);
		         if(anc.href.match(/u=(\d+)$/)) {
			         clans._members[acronyms[cnm]].push(RegExp.$1);
			         var pname = anc.innerHTML;
			         var aname = pname.substr(0,1).toUpperCase() + pname.substr(1, pname.length - 1);
			         pmap[RegExp.$1] = aname;
		         }
	         }
         }
         pages[lab]++;
         if(pages[lab] == thisPage) {
	         ec++;
	         if(ec == cl) endClans();
         }
      }
    }
    lReq[lab + '|' + page].send(null);
}

function endClans() {
	if(!is_chrome) {
		GM_setValue("clans", uneval(clans));
		GM_setValue("clanmap", uneval(pmap));
	}
	alert("Compilation Complete");	
}

function getProf(uid,lab) {
  var pump = 'http://www.conquerclub.com/forum/memberlist.php?mode=viewprofile&u=' + uid;
  pajax[uid] = new XMLHttpRequest();
  pajax[uid].open('GET', pump, true);
  pajax[uid].onreadystatechange = function() {
   if (pajax[uid].readyState == 4) {
     var div=document.createElement('div');
     div.innerHTML = pajax[uid].responseText;
     var sel = div.getElementsByTagName('select');
     for(var op=0; op< sel[0].options.length; op++) {
	     totals._users[uid]._groups.push(sel[0].options[op].innerHTML);
	     if(totals._groups[sel[0].options[op].innerHTML]) totals._groups[sel[0].options[op].innerHTML]++;
	     else totals._groups[sel[0].options[op].innerHTML] = 1;
	     if(sel[0].options[op].innerHTML == "Guests") totals._users[uid]._guest = 1;
     }
     var icons = getElementsByClassName(div,'img','icon',true);
     totals._users[uid]._country = icons[0].title;
     var dt = div.getElementsByTagName('dt');
     for(var d=0; d<dt.length; d++) {
	     if(dt[d].innerHTML == "Score:") totals._users[uid]._score = parseInt(nextSib(dt[d]).innerHTML);
	     if(dt[d].innerHTML == "Rank:") totals._users[uid]._status = nextSib(dt[d]).getElementsByTagName('img')[0].className.match(/ p /)? "P" : "F";
	     if(dt[d].innerHTML == "Games:") {
        if(nextSib(dt[d]).innerHTML.match(/^(\d+) completed, (\d+) \((\d+)%\) won/)) {
         totals._users[uid]._played = parseInt(RegExp.$1);
         totals._users[uid]._won = parseInt(RegExp.$2);
         totals._users[uid]._perc = parseInt(RegExp.$3);
        }
	     }
	     if(dt[d].innerHTML == "Attendance:") {
        if(nextSib(dt[d]).innerHTML.match(/^(\d+)%/)) {
		     totals._users[uid]._attend = parseInt(RegExp.$1);
	      }
	     }
	     if(dt[d].innerHTML == "Rating:") {
         if(nextSib(dt[d]).innerHTML.match(/^<img (.+?)> (\d).(\d) /)) {
           totals._users[uid]._rating = parseInt(RegExp.$2) + 0.1 * parseInt(RegExp.$3);
           break;
         }
	     }
     }
     var h3 = div.getElementsByTagName('h3');
     for(v=0; v<h3.length; v++) {
	     if(h3[v].innerHTML.match(/^Medals:/)) {
		     totals._users[uid]._medals = parseInt(h3[v].getElementsByTagName('b')[0].innerHTML);
		     break;
	     }
     }     
     totals._score += totals._users[uid]._score;
     totals._played += totals._users[uid]._played;
     totals._won += totals._users[uid]._won;
     totals._perc += totals._users[uid]._perc;
     totals._attend += totals._users[uid]._attend;
     totals._rating += totals._users[uid]._rating;
     totals._medals += totals._users[uid]._medals;     
     var col2 = getElementsByClassName(div,'div','column2',true);
     var dd2 = col2[0].getElementsByTagName('dd');
     var joins = dd2[0].innerHTML.split(' ');
	   totals._users[uid]._joined = Date.MONTHNAMES[joins[1]] + " " + joins[2] + " " + joins[3];
     totals._users[uid]._days = convToDays(totals._users[uid]._joined);
     totals._days += totals._users[uid]._days;
     totals._counter++;
     viewer.document.getElementById('progress').innerHTML = "Scanning " + groups[lab] + " Members..." + (100 * (totals._counter)/(totals._target)).toFixed(0) + "%";
     if(totals._counter == totals._target) endGame();
   }
   else if (pajax[uid].readyState == 1 && totals._counter==0) {
    viewer.document.getElementById('progress').innerHTML = "Scanning " + groups[lab] + " Members...0%";
   }
  }
  pajax[uid].send(null);
}

function switchTabs(id) {
  if(id==1) {
    viewer.document.getElementById('tableContainer').style.visibility = "visible";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('tab1').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
  }
  else if(id==2) {
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "visible";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#0f0";
  }
}

function removeBox() {
  viewer.close();
  viewer = null;
}

function cleanup() {
  if(viewer != null) viewer.close();
}

var delay = 0;

function setBox() {
  cleanup();
  viewer = window.open('','box','width=1040,height=720,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  if(!is_chrome) {
	  viewer.addEventListener('unload', function() {
    	viewer=null;
    	cleanup();
  	}, false);
	}
}

function createBox() {
  var style;
  if(viewer.document.getElementsByTagName('head').length) {
  style = viewer.document.getElementsByTagName('head')[0].appendChild(viewer.document.createElement("style"));
  }
  else{
	  viewer.document.getElementsByTagName('html')[0].insertBefore(viewer.document.createElement("head"), viewer.document.getElementsByTagName('body')[0]);
	  setTimeout(createBox, 100);
	  return;
  }
  var styleContent = is_chrome ? 'innerText' : 'textContent';
  style.type = 'text/css';
  style[styleContent] = "#rankDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;} ";
  style[styleContent] += "#rankBox {position:absolute;left:0px;min-width:1040px;width:1000px;height:100%;margin-top:10px;margin-left:20px;border:2px solid #000;background-color:#F2F5F6;} ";
  style[styleContent] += "#rankDiv > #rankBox {position:fixed;overflow:auto;} ";
  style[styleContent] += "#rankBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;} ";
  style[styleContent] += "#rankBox p {font:0.7em verdana,arial;padding-left:50px;width:900px;} .result {font-weight:bold;color:#00f;} .totals {color:#000;} ";
  style[styleContent] += "#rankBox a {text-decoration:none;} .central {text-align:center} #rankBox #tab1, #rankBox #tab2, #rankBox #tab3, #rankBox #tab4 {border:1px solid black}";
  style[styleContent] += "#rankBox #tab1:hover, #rankBox #tab2:hover, #rankBox #tab3:hover, #rankBox #tab4:hover , #rankBox #closeRank:hover {color:#fff} .header {background-color:#cdc;font-weight:bold;} ";
  style[styleContent] += "#rankBox #closeRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style[styleContent] += "#rankBox img {position:relative;top:20px;left:20px;} .rankoptions {width:100px;} .bmedal {font-weight:bold;color:#8C7853} .smedal {font-weight:bold;color:silver} .gmedal {font-weight:bold;color:gold} ";
  style[styleContent] += ".display_div {width: 48px;padding: 0 2px 0 0;height: 20px;text-align: left;border: 1px solid;} .leader{color:blue;text-decoration:none} .guest{color:red;text-decoration:none} .member{color:black;text-decoration:none}";
  style[styleContent] += ".display {background-color: #fff;color: blue;width: 48px;text-align: left;font-size: 8pt;font-family: verdana, arial, helvetica, sans-serif;font-weight: bold;cursor: text;}";
  style[styleContent] += "#tabs {text-align:center} #tabs table{align:center;margin-left:30px;} #tabs a {width:100px;font-weight:bold;font: verdana,arial;text-transform:none;color:gray;padding:0 5px} #tabs a:hover {background-color:#cdc}";
  style[styleContent] += "#scroller {width: 1000px;} #scroller, #scroller.td, #scroller.a, #summ td, #meds td {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style[styleContent] += "#resultant {width: 1000px;} #resultant, #resultant.td, #resultant.a {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style[styleContent] += "div.tableContainer {border: 1px solid #963;height: 535px;overflow:auto;overflow-x: hidden;width: 1000px;margin:10px} span {cursor:pointer;text-decoration:underline}";
  style[styleContent] += "#results {visibility:hidden;border: 1px solid #963;overflow:auto;overflow-x: hidden;width:1000px;height:535px;position:absolute;z-index:200;top:120px;margin:10px;}";
  style[styleContent] += "thead.fixedHeader tr, thead.scrollHeader tr, thead.totalsHeader tr {display: block} thead.fixedHeader td, tbody.scrollContent td.banner {background: #cdc;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 1000px}";
  style[styleContent] += "thead.scrollHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} ";
  style[styleContent] += "thead.totalsHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} span.winner {cursor:auto;text-decoration:none;color:red}";
  style[styleContent] += "thead.scrollHeader a, thead.scrollHeader a:link, thead.scrollHeader a:visited,thead.totalsHeader a, thead.totalsHeader a:link, thead.totalsHeader a:visited, tbody.scrollContent a, tbody.scrollContent a:link, tbody.scrollContent a:visited {display: block;width: 136px;}";
  style[styleContent] += "tbody.scrollContent {width: 100%;} tbody.scrollContent td#tourtitle,tbody.scrollContent td#rtourtitle {font-size:12pt;color:blue;} tbody.scrollContent td#tourlabel,tbody.scrollContent td#rtourlabel {font-size:10pt;color:red}";
  style[styleContent] += "tbody.scrollContent td {border-right: 1px solid #b74;border-bottom: 1px solid #DDD;padding: 4px 3px;text-align:center;height:20px;} tbody.scrollContent td {width: 136px;vertical-align: middle;} ";
  style[styleContent] += "tbody.scrollContent tr.mreven {background-color:#ddd} tbody.scrollContent tr.mrodd {background-color:#eee} tbody.scrollContent td.sorton {background-color:cyan;cursor:pointer;}  tbody.scrollContent td.tiny {width:5%;} tbody.scrollContent td.med {width:8%;}";    
  mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
  mObj.id = "rankDiv";
  mObj.style.visibility = 'hidden';
  mObj.style.height = viewer.document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(viewer.document.createElement("div"));
  alertObj.id = "rankBox";
  alertObj.style.left = (viewer.document.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  h1 = alertObj.appendChild(viewer.document.createElement("h1"));
  h1.appendChild(viewer.document.createTextNode("CLAN STATS"));
  msg = alertObj.appendChild(viewer.document.createElement("p"));
  msg.id = "progress";
  msg.innerHTML = "Collecting Info";
  btn = alertObj.appendChild(viewer.document.createElement("a"));
  btn.id = "closeRank";
  btn.appendChild(viewer.document.createTextNode("CLOSE"));
  btn.href = "javascript:void(0);";
  btn.style.opacity = "0.5";
  btn.addEventListener('click', function() {
    if(btn.style.backgroundColor == "green")
    removeBox();
  }, true);
  tabs = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tabs.id = "tabs";
  tabs.innerHTML = "<table><tr><td><a href=\"javascript:void(0)\" id=tab1>Summary</a></td><td><a href=\"javascript:void(0)\" id=tab2>Groups</a></td></tr></table>";
  viewer.document.getElementById('tab1').addEventListener('click', function() {
    switchTabs(1);
  },true);
  viewer.document.getElementById('tab2').addEventListener('click', function() {
    switchTabs(2);
  },true);
  tableWrap = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tableWrap.id = "tableContainer";
  tableWrap.className = "tableContainer";
  table = viewer.document.createElement("table"); 
  table.border=1;
  table.id = "scroller";
  table.width = "100%";
  table.cellSpacing = "0";
  table.cellPadding = "0";
  table.className = "scrollTable";
  tbody = table.appendChild(viewer.document.createElement("tbody"));
  tbody.className = "scrollContent";
  tbody.id = "ranktable";
  viewer.document.getElementById('tableContainer').appendChild(table);
  results = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  results.id = "results";
  results.className = "tableContainer";
  rtable = viewer.document.createElement("table"); 
  rtable.border=1;
  rtable.id = "resultant";
  rtable.width = "100%";
  rtable.cellSpacing = "0";
  rtable.cellPadding = "0";
  rtable.className = "scrollTable";
  rtbody = rtable.appendChild(viewer.document.createElement("tbody"));
  rtbody.className = "scrollContent";
  rtbody.id = "restable";
  viewer.document.getElementById('results').appendChild(rtable);
  mObj.style.visibility = 'visible';
  switchTabs(1);
}

function getGroups(lab,page) {
    var jump = "http://www.conquerclub.com/forum/memberlist.php?g=" + lab + "&mode=group";
	if(page > 1) jump += "&start=" + (50 * (page - 1));
    cReq[page] = new XMLHttpRequest();
    cReq[page].open('GET', jump, true);
    cReq[page].onreadystatechange = function() {
      if (cReq[page].readyState == 4) {
        var div=document.createElement('div');
        div.innerHTML = cReq[page].responseText;
        var pagination = getElementsByClassName(div,'li','rightside pagination',true);
        if(pagination[0].innerHTML.match(/of <strong>(\d+)</)) thisPage = parseInt(RegExp.$1);
        if(page == 1) {
           if(thisPage > 1) {
             for(var pg=2;pg<=thisPage;pg++) {
             getGroups(lab,pg);
             }
           }
         }
         var tables = getElementsByClassName(div,'table','table1',true);
         for(var t=0; t<tables.length; t++) {
	         var spans = tables[t].getElementsByTagName('span');
	         for(var s=0; s<spans.length; s++) {
		         var anc = nextSib(spans[s]);
		         if(anc.href.match(/u=(\d+)$/)) {
               var pname = anc.innerHTML;
			         var aname = pname.substr(0,1).toUpperCase() + pname.substr(1, pname.length - 1);
			         if(page == 1 && t==0) leader = 1
			         else leader = 0;
			         totals._users[RegExp.$1] = new User(aname,leader);
			         totals._order.push(RegExp.$1);
			         totals._target++;
		         }
	         }
         }
         totals._pages++;
         if(totals._pages == thisPage) {
	         for(var u in totals._users) {
		         getProf(u,lab);
	         }
         }
      }
      else if (cReq[page].readyState == 1)
         viewer.document.getElementById('progress').innerHTML = "Scanning " + groups[lab] + " ...";
    }
    cReq[page].send(null);
}

function showUI() {
var label = document.getElementById('label');
var buttonDiv = document.getElementsByTagName('fieldset')[0].appendChild(document.createElement('div'));
buttonDiv.className = "field-row";
var w = "<span class=field-label>Clan</span><select id=cname class=field><option>Clan Name</option>";
for(var g in groups){
	w+= "<option value=" + g + ">" + groups[g] + "</option>";
}
w += "</select>";
buttonDiv.innerHTML = w + "<input class=button type=button id=crep value=\"Clan Stats\" />";
document.getElementById('crep').addEventListener("click", function() {
	if(document.getElementById('cname').selectedIndex) {
	 var lab = parseInt(document.getElementById('cname').options[document.getElementById('cname').selectedIndex].value);
     cReq = []; 
     pajax = []
     totals = new Totals();
     setBox();
     createBox();
     getGroups(lab,1);	
    }
}, false);
if(!is_chrome) {
clans = eval(GM_getValue('clans'));
pmap = eval(GM_getValue('clanmap'));
}
if(typeof(clans) != "undefined" && typeof(pmap) != "undefined") {
	var buttonDiv = document.getElementsByTagName('fieldset')[0].appendChild(document.createElement('div'));
	buttonDiv.className = "field-row";
	var w = "<span class=field-label>Battle</span>";
	w+= "<select id=cn1 class=cfieldx><option>Any Clan</option>";
	for(var g in groups){
		if(acronyms[groups[g]])w+= "<option value=" + g + ">" + groups[g] + "</option>";
	}
	w += "</select>";
	w+= "&nbsp;&nbsp;vs.&nbsp;&nbsp;<select id=cn2 class=cfieldx><option>Any Clan</option>";
	for(var g in groups){
		if(acronyms[groups[g]])w+= "<option value=" + g + ">" + groups[g] + "</option>";
	}
	w += "</select>";
	buttonDiv.innerHTML = w + "<input class=button type=button id=cbat value=\"Clan Battle\" />";
	document.getElementById('cbat').addEventListener("click", function() {
		if((document.getElementById('cn1').selectedIndex != document.getElementById('cn2').selectedIndex)) {
	 		lab1 = (document.getElementById('cn1').options[document.getElementById('cn1').selectedIndex].text);
	 		lab2 = (document.getElementById('cn2').options[document.getElementById('cn2').selectedIndex].text);
	 		var numbers = cboxValues('np[]');
      var gt = cboxValues('gt[]');
      var tname = document.getElementById('tournament');
    	var tour = tname.options[tname.selectedIndex].text;
      var xt = "";
      if(gt.length==0 && numbers.length==1 && numbers[0]=="2" && !tour) xt = "&np=2";
      if(numbers.length==0 && gt.length==1 && !tour && (gt[0]=="D" || gt[0]=="T" || gt[0]=="Q")) xt = "&gt=" + gt[0];
      if(gt.length==0 && numbers.length==0 && tour) xt="&to=" + tour;
      if(xt || (gt.length==0 && numbers.length==0 && !tour)) {
	      ps = 0;
	 			najax = [];
	 			consd = new Array();
     		totals = new Totals();
	 			nwins = new Object();
	 			nwins[lab1] = 0;
	 			nwins[lab2] = 0;
	 			setBox();
     		createBox();
	 			if(!document.getElementById('cn1').selectedIndex || !document.getElementById('cn2').selectedIndex) {
		 			endAllGames(xt);
	 			}
	 			else{
	 				ngames = new Object();
	 				ngames[lab1] = 0;
	 				ngames[lab2] = 0;
	 				for(var n=0; n<clans._members[acronyms[lab1]].length;n++) {
		 				getGamescount(lab1,clans._members[acronyms[lab1]][n],xt);
	 				}
	 				for(var n=0; n<clans._members[acronyms[lab2]].length;n++) {
		 				getGamescount(lab2,clans._members[acronyms[lab2]][n],xt);
	 				}
	 			}
      }
      else alert("Select one of 2p, Doubles, Triples or Quads or Tournament or none");
		}
	}, false);
}
}

function complete(xt) {
	var pnc,trc;
	if(xt.match(/to=/)) pnc = xt.split("to=")[1];
	if(!pnc) pnc = transgt[xt];
	var x = "<tr><td colspan=7>" + lab1 + " vs. " + lab2 + " " + pnc + "</td></tr>";
	x += "<tr><td colspan=4>" + lab1 + "</td><td colspan=3>" + nwins[lab1] + " wins</td></tr>";
	x += "<tr><td colspan=4>" + lab2 + "</td><td colspan=3>" + nwins[lab2] + " wins</td></tr>";
	x += "<tr><td colspan=4>Totals</td><td colspan=3>" + (nwins[lab1] + nwins[lab2]) + " games</td>";	
	x += "<tr><td id=sort0 class=sorton>Game</td><td id=sort1 class=sorton>Winner</td><td id=sort2 class=sorton>Map</td><td id=sort3 colspan=2 class=sorton>" + acronyms[lab1] + "</td><td id=sort4 colspan=2 class=sorton>" + acronyms[lab2] + "</td></tr>";
	for(var cd=0; cd<consd.length; cd++) {
		if(cd & 1) trc = "<tr class=mrodd><td>";
 		else trc = "<tr class=mreven><td>";	
		x+= trc + "<a target=\"_blank\" href=http://www.conquerclub.com/game.php?game=" + consd[cd] + "><u>" + consd[cd] + "</u></a></td>";
		x+= "<td>" + totals._battle[consd[cd]]._winners + "</td><td>" + totals._battle[consd[cd]]._mps + "</td>";
		x+= "<td colspan=2>" + totals._battle[consd[cd]]._p1 + "</td><td colspan=2>" + totals._battle[consd[cd]]._p2 + "</td></tr>";
	}
	viewer.document.getElementById('ranktable').innerHTML = x;
	
	for(var j=0; j< sorters['_battle'].length; j++) {
  viewer.document.getElementById('sort' + j).addEventListener('click', function() {
	sortByCol(consd,parseInt(this.id.split('sort')[1]),"_battle");
	complete(xt);
  },true);
}

	viewer.document.getElementById('closeRank').style.opacity = "0.9";
	viewer.document.getElementById('closeRank').style.backgroundColor = "green";
	viewer.document.getElementById('progress').innerHTML = "<b>Scan Complete. Click on light blue column headers to sort. Click again to reverse sort.</b>";
}

function getGames(lb,pid,page,xt) {
  var nump = 'http://www.conquerclub.com/api.php?mode=gamelist&gs=F&p1=' + pid;
  if(xt.match(/to=/)) {
	  var gnc = xt.split("to=")[1];
	  nump += "&to=" + encodeURIComponent(gnc);
  }
  else nump += xt + "&pt=Y";
  if(page > 1) nump += "&page=" + page;

  najax[pid + "|" + page] = new XMLHttpRequest();
  najax[pid + "|" + page].open('GET', nump, true);
  najax[pid + "|" + page].onreadystatechange = function() {
  	if (najax[pid + "|" + page].readyState == 4) {
    	var parser = new DOMParser();
    	var dom = parser.parseFromString(najax[pid + "|" + page].responseText,"application/xml");
    	var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;
    	var games = dom.getElementsByTagName('game');
    	var numGames = parseInt(dom.getElementsByTagName('games')[0].getAttribute('total'));
    	if(pages.match(/^(\d+) of (\d+)$/)) {
    		numPages = parseInt(RegExp.$2);
    		thisPage = parseInt(RegExp.$1);
    		if(page == 1) {
      		if(numPages > 1) {
        		for(var pg=2;pg<=numPages;pg++) {
          		getGames(lb,pid, pg,xt);
       			}
       		}
      	}
    	}
      for(var g=0; g< games.length; g++) {
        var gvalid = 1;
        var players = games[g].getElementsByTagName('player');
        var gaming = games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue;
	      var mapname = games[g].getElementsByTagName('map')[0].firstChild.nodeValue;        
        var touring = "";
        if(games[g].getElementsByTagName('tournament')[0].firstChild)
          touring = games[g].getElementsByTagName('tournament')[0].firstChild.nodeValue;
        var pids = new Array();
        var cwin = "";
        var xnc;
        var t1 = new Array();
        var t2 = new Array();
        for(s=0; s<players.length; s++) {
          var pnid = (players[s].firstChild.nodeValue);
          var mark = "NONE";
          for(var cm in clans._members) {
		         if(clans._members[cm].indexOf(pnid) != -1) {
			         mark = cm;
			         break;
		         }
          }
          pids.push(mark);
          if(players[s].getAttribute('state') == "Won") {
	          pwin = mark;
          }
          if(mark == acronyms[lab1] && lab1 != "Any Clan") t1.push(pmap[pnid]);
          if(mark == acronyms[lab2] && lab2 != "Any Clan") t2.push(pmap[pnid]);
          if(mark != acronyms[lab2] && lab1 == "Any Clan") t1.push(pmap[pnid]);
          if(mark != acronyms[lab1] && lab2 == "Any Clan") t2.push(pmap[pnid]);
        }
        if(pids.length > 2 && gaming != "D" && gaming !="T" && gaming !="Q") gvalid = 0;
        if(xt.match(/to=/)) xnc = xt.split("to=")[1];
        if(xt=="&np=2" && pids.length > 2) gvalid = 0;
        if(xt=="&gt=D" && gaming !="D") gvalid = 0;
        if(xt=="&gt=T" && gaming !="T") gvalid = 0;
        if(xt=="&gt=Q" && gaming !="Q") gvalid = 0;     
        if(!xt && (!(gaming == "D" || gaming == "T" || gaming == "Q" || pids.length==2 || touring))) gvalid = 0;    
        if(pids.indexOf("NONE") != -1) gvalid = 0;
        if(pids.length == 2 && (pids[1] == pids[0])) gvalid = 0;
        if(gaming == "D" && !((pids[0] == pids[1]) && (pids[2] == pids[3]) && (pids[0] != pids[2]))) gvalid = 0;
        if(gaming == "T" && !((pids[0] == pids[1] && pids[1] == pids[2]) && (pids[3] == pids[4] && pids[4] == pids[5]) && (pids[0] != pids[3]))) gvalid = 0; 
        if(gaming == "Q" && !((pids[0] == pids[1] && pids[1] == pids[2] && pids[2] == pids[3]) && (pids[4] == pids[5] && pids[5] == pids[6] && pids[6] == pids[7]) && (pids[0] != pids[4]))) gvalid = 0; 
        if(lab1 != "Any Clan" && lab2 != "Any Clan" && pids[0] != acronyms[lab1] && pids[0] != acronyms[lab2]) gvalid = 0;
        if(lab1 != "Any Clan" && lab2 != "Any Clan" && pids.length == 2 && pids[1] != acronyms[lab1] && pids[1] != acronyms[lab2]) gvalid = 0;
        if(lab1 != "Any Clan" && lab2 != "Any Clan" && gaming == "D" && pids[2] != acronyms[lab1] && pids[2] != acronyms[lab2]) gvalid = 0;
        if(lab1 != "Any Clan" && lab2 != "Any Clan" && gaming == "T" && pids[3] != acronyms[lab1] && pids[3] != acronyms[lab2]) gvalid = 0;
        if(lab1 != "Any Clan" && lab2 != "Any Clan" && gaming == "Q" && pids[4] != acronyms[lab1] && pids[4] != acronyms[lab2]) gvalid = 0;        
        if(lab1 == "Any Clan" && pids.length == 2 && pids[1] != acronyms[lab2] && pids[0] != acronyms[lab2]) gvalid = 0;
        if(lab2 == "Any Clan" && pids.length == 2 && pids[1] != acronyms[lab1] && pids[0] != acronyms[lab1]) gvalid = 0;
        if(lab1 == "Any Clan" && gaming == "D" && pids[2] != acronyms[lab2] && pids[0] != acronyms[lab2]) gvalid = 0;
        if(lab2 == "Any Clan" && gaming == "D" && pids[2] != acronyms[lab1] && pids[0] != acronyms[lab1]) gvalid = 0;        
        if(lab1 == "Any Clan" && gaming == "T" && pids[3] != acronyms[lab2] && pids[0] != acronyms[lab2]) gvalid = 0;
        if(lab2 == "Any Clan" && gaming == "T" && pids[3] != acronyms[lab1] && pids[0] != acronyms[lab1]) gvalid = 0;        
        if(lab1 == "Any Clan" && gaming == "Q" && pids[4] != acronyms[lab2] && pids[0] != acronyms[lab2]) gvalid = 0;
        if(lab2 == "Any Clan" && gaming == "Q" && pids[4] != acronyms[lab1] && pids[0] != acronyms[lab1]) gvalid = 0;
        if(xnc && !touring)  gvalid = 0;
        if(xnc && touring && (xnc != touring.split(' - ')[0])) gvalid = 0;
        if(gvalid) {
	        var gn = games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue;
	        if(consd.indexOf(gn) == -1) {
	        	consd.push(gn);
	        	totals._battle[gn] = new Battle();
	        	totals._battle[gn]._winners = pwin;
	        	totals._battle[gn]._mps = mapname;
	        	totals._battle[gn]._p1 = t1;
	        	totals._battle[gn]._p2 = t2;
	        	if(pwin == acronyms[lab1] && lab1 != "Any Clan") nwins[lab1]++;
	        	if(pwin == acronyms[lab2] && lab2 != "Any Clan") nwins[lab2]++;
	        	if(pwin != acronyms[lab2] && lab1 == "Any Clan") nwins[lab1]++;
	        	if(pwin != acronyms[lab1] && lab2 == "Any Clan") nwins[lab2]++;
	        }
        }
			}			
      if(thisPage == numPages || numGames == 0) ps++;
    	viewer.document.getElementById('progress').innerHTML = "Scanning Player Games..." + (100 * (ps)/(clans._members[acronyms[lb]].length)).toFixed(0) + "%";
    	if(ps == clans._members[acronyms[lb]].length) complete(xt);      
		}
	}
  najax[pid + "|" + page].send(null);
}

function endGames(xt) {
	najax = [];
	ps = 0;
	if(ngames[lab1] < ngames[lab2]) {
	 	for(var n=0; n<clans._members[acronyms[lab1]].length;n++) {
		 	getGames(lab1,clans._members[acronyms[lab1]][n],1,xt);
	 	}
	}
	else{
	 	for(var n=0; n<clans._members[acronyms[lab2]].length;n++) {
		 	getGames(lab2,clans._members[acronyms[lab2]][n],1,xt);
	 	}
	}
}

function endAllGames(xt) {
	najax = [];
	ps = 0;
	if(lab1 == "Any Clan") {
	 	for(var n=0; n<clans._members[acronyms[lab2]].length;n++) {
		 	getGames(lab2,clans._members[acronyms[lab2]][n],1,xt);
	 	}
	}
	else{
	 	for(var n=0; n<clans._members[acronyms[lab1]].length;n++) {
		 	getGames(lab1,clans._members[acronyms[lab1]][n],1,xt);
	 	}
	}
}


function getGamescount(lb,pid,xt) {
  var nump = 'http://www.conquerclub.com/api.php?mode=player&u=' + pid;
  najax[pid] = new XMLHttpRequest();
  najax[pid].open('GET', nump, true);
  najax[pid].onreadystatechange = function() {
  	if (najax[pid].readyState == 4) {
    	var parser = new DOMParser();
    	var dom = parser.parseFromString(najax[pid].responseText,"application/xml");
    	var games = dom.getElementsByTagName('games_completed')[0].firstChild.nodeValue;
    	var pname = dom.getElementsByTagName('username')[0].firstChild.nodeValue;
      var aname = pname.substr(0,1).toUpperCase() + pname.substr(1, pname.length - 1);
    	ngames[lb] += parseInt(games);
    	ps++;
    	viewer.document.getElementById('progress').innerHTML = "Calculating Search Algorithm..." + (100 * (ps)/(clans._members[acronyms[lab1]].length + clans._members[acronyms[lab2]].length)).toFixed(0) + "%";
    	if(ps == clans._members[acronyms[lab1]].length + clans._members[acronyms[lab2]].length) endGames(xt);
		}
	}
  najax[pid].send(null);
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
var gmMenu = document.createElement('div');
gmMenu.id="cln";
var html = "<h3><b>Clan Rank</b></h3>";
gmMenu.innerHTML = html;
ul[0].parentNode.appendChild(gmMenu);
ul = document.createElement('ul');
ul.style.borderWidth = "1px 1px 0px 1px";
ul.style.width = "151px";
ul.innerHTML = "<li><a id=\"clib\" href=\"javascript:void(0);\"><span>Compile Clans</span></a></li>";
gmMenu.appendChild(ul);
var lump = 'http://www.conquerclub.com/forum/ucp.php?i=167';
document.getElementById('clib').addEventListener("click", function() {
cl = 0;
ec = 0;
clans = new Clans();
pages = new Object();
pmap = new Object();
bajax = new XMLHttpRequest();
bajax.open('GET', lump, true);
bajax.onreadystatechange = function() {
 if (bajax.readyState == 4) {
   var div=document.createElement('div');
   div.innerHTML = bajax.responseText;
   var list = getElementsByClassName(div,'a','forumtitle',true);
   for(h=0;h<list.length; h++) {	   
     if(list[h].href.match(/g=(\d+)$/)) {
	     if(acronyms[list[h].innerHTML]) {
		     clans._members[acronyms[list[h].innerHTML]] = new Array();
		     cl++;
		     pages[RegExp.$1] = 0;
		     getClanMembers(RegExp.$1,1);
	     }
	 }
   }
 }
}
bajax.send(null);
}, false);
if(/www.conquerclub.com\/player.php\?mode=find/.test(window.location.href) && !(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href))) {
window.addEventListener("unload" , cleanup, false);
GM_addStyle(".cfieldx {width:14.5em;border: 1px solid #565}");
lajax = new XMLHttpRequest();
lajax.open('GET', lump, true);
lajax.onreadystatechange = function() {
 if (lajax.readyState == 4) {
   var div=document.createElement('div');
   div.innerHTML = lajax.responseText;
   var list = getElementsByClassName(div,'a','forumtitle',true);
   for(h=0;h<list.length; h++) {	   
     if(list[h].href.match(/g=(\d+)$/)) {
       groups[RegExp.$1] = list[h].innerHTML;
	 }
   }
   showUI();
 }
}
lajax.send(null);
}
if(/player.php\?mode=find/.test(window.location.href) || /player.php\?mode=mygames/.test(window.location.href) ||
   /player.php\?submit=Search/.test(window.location.href) || /player.php\?mode=join/.test(window.location.href) ||
   /player.php\?mode=next/.test(window.location.href) || /game.php/.test(window.location.href)) {
	 if(!is_chrome) clans = eval(GM_getValue('clans'));
	 if(typeof(clans) != "undefined") {
   	var uls = getElementsByClassName(document,'ul','players',true);
   	for(var u=0; u<uls.length; u++) {
    	 var lis = uls[u].getElementsByTagName('li');
     	for(var l=0; l< lis.length;l++){
      	 if(!lis[l].innerHTML.match(/<b>Team (\d):/) && !lis[l].innerHTML.match(/-empty-/) && !lis[l].innerHTML.match(/-reserved-/i)) {
        	var anc = lis[l].getElementsByTagName('a');
         	if(anc.length && anc[0].href.match(/u=(\d+)$/)) {
	         var cid = RegExp.$1;
	         for(var cm in clans._members) {
		         if(clans._members[cm].indexOf(cid) != -1) {
			         anc[0].appendChild(document.createTextNode(' [' + cm + ']'));
			         break;
		         }
	         }
       }
     }
   }
	 }
}
}
}
}