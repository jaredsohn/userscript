//
// ==UserScript==
// @name          Conquer Club SSSCE
// @namespace     http://userscripts.org/
// @description   
// @include       http://www.conquerclub.com/player.php?mode=find*
// @include       https://www.conquerclub.com/player.php?mode=find*
// ==/UserScript==

var sReq = [];
var sajax = [];
var totals = [];
var total;
var proto;
var ghist = [];
var viewer = null;

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

function Pinfo() {
this._defeats = new Array();
}

function Totals(name) {
this._name = name;
this._points = 0;
this._maps = 0;
this._wins = 0;
this._pages = 0;
this._expected = 0;
this._games = 0;
this._kills = 0;
this._meanwin = 0;
this._beaten = 0;
this._firsts = 0;
this._wonfirsts = 0;
this._missing = 0;
this._counter = 0;
}

function Total() {
this._pages = 0;
}

function removeBox() {
  viewer.close();
  viewer = null;
  ghist = [];
}

function cleanup() {
	ghist = [];
  if(viewer != null) viewer.close();
}

function setBox() {
  cleanup();
  viewer = window.open('','box','width=1040,height=720,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  viewer.addEventListener('unload', function() {
    viewer=null;
    cleanup();
  }, false);
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
  var styleContent = 'textContent';
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
  h1.appendChild(viewer.document.createTextNode("SSSCE STATS"));
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
  mObj.style.visibility = 'visible';
}

function getRR(rank, defeats) {
if(defeats + rank) {
var ratio = (rank / (defeats)).toFixed(3);
return ratio;
}
return 0.000;
}

function getKill(losses, defeats) {
if(defeats + losses > 0) {
var ratio = ((100 * defeats) / (defeats + losses)).toFixed(0);
return ratio;
}
return 0;
}


function endGame(userid) {
var x = "<tr><td>Points Gained</td><td>Games Won</td><td>Games Lost</td><td>Relative Rank</td><td>Kill Ratio</td></tr>";	
x += "<tr><td>" + totals[userid]._points + "</td><td>" + totals[userid]._wins + "</td><td>" +  (totals[userid]._games - totals[userid]._wins) + "</td><td>" + getRR(totals[userid]._meanwin,totals[userid]._beaten) + "</td><td>" + getKill(totals[userid]._games - totals[userid]._wins,totals[userid]._kills) + "</td></tr>";	
viewer.document.getElementById('ranktable').innerHTML = x;	
viewer.document.getElementById('closeRank').style.opacity = "0.9";
viewer.document.getElementById('closeRank').style.backgroundColor = "green";
viewer.document.getElementById('progress').innerHTML = "<b>Scan Complete. Click on light blue column headers to sort. Click again to reverse sort.</b>";
GM_xmlhttpRequest({
     method: 'POST',
     url: "http://chipv.freehostia.com/sssce.php?act=a&player=" + totals[userid]._name + "&score=" + (totals[userid]._points + 1000) + "&win=" + totals[userid]._wins + "&loss=" + (totals[userid]._games - totals[userid]._wins) + "&rr=" + getRR(totals[userid]._meanwin,totals[userid]._beaten)  + "&kr=" + getKill(totals[userid]._games - totals[userid]._wins,totals[userid]._kills),
     headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'text/html',
     },
     onload: function(responseDetails) {
     }
});
}

function getHistPage(user,uid, page) {
  var jump = proto + '//www.conquerclub.com/api.php?gs=F&u=' + uid;
  if(page > 1) jump += "&page=" + page;
  ghist["paging" + page] = new XMLHttpRequest();
  ghist["paging" + page].open('GET', jump, true);
  ghist["paging" + page].onreadystatechange = function() {
   if (ghist["paging" + page].readyState == 4) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(ghist["paging" + page].responseText,"application/xml");
    var games = dom.getElementsByTagName('game');
    var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;
    var numGames = parseInt(dom.getElementsByTagName('games')[0].getAttribute('total'));
    var puid = uid;
    var numPages = 0;

      if(pages.match(/^(\d+) of (\d+)$/)) {
        numPages = parseInt(RegExp.$2);
        if(!totals[uid]._expected) totals[uid]._expected = numPages;
      }
      if(page == 1) {
       if(numPages > 1) {
         for(var pg=2;pg<=numPages;pg++) {
          getHistPage(user, uid, pg);
         }
       }
      }
      
        for(g=0; g< games.length; g++) {
        var gvalid = 1;
        var mapname = games[g].getElementsByTagName('map')[0].firstChild.nodeValue;
        var players = games[g].getElementsByTagName('player');
        var gaming = games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue;
        var touring = "";
        if(games[g].getElementsByTagName('tournament')[0].firstChild)
          touring = games[g].getElementsByTagName('tournament')[0].firstChild.nodeValue;
        var joinable = games[g].getElementsByTagName('private')[0].firstChild.nodeValue;
        var speeding = games[g].getElementsByTagName('speed_game')[0].firstChild.nodeValue;
        var ordering = games[g].getElementsByTagName('play_order')[0].firstChild.nodeValue;
        var troops = games[g].getElementsByTagName('initial_troops')[0].firstChild.nodeValue;
        var cards = games[g].getElementsByTagName('bonus_cards')[0].firstChild.nodeValue;
        var fort = games[g].getElementsByTagName('fortifications')[0].firstChild.nodeValue;
        var fog = games[g].getElementsByTagName('war_fog')[0].firstChild.nodeValue;
        var pids = new Array();
        for(s=0; s<players.length; s++) {
          var pid = (players[s].firstChild.nodeValue);
          pids.push(pid);
        }
        if(players.length < 6) gvalid = 0;
        if(gaming != "S") gvalid = 0;
        if(cards != "2") gvalid = 0;
        if(ordering != "S") gvalid = 0;
        if(troops != "E") gvalid = 0;
        if(fort != "C") gvalid = 0;
        if(fog != "N") gvalid = 0;
        if(gvalid) {
        var winner = 0;
        var triumph = 0;
        var numTeams = 0;
        var holder = 0;
        var myLoss = 0;
        var meanwin = 0;
        var meanloss = 0;
        var beaten = 0;
        var pfirst = 0;
        if(games[g].getElementsByTagName('first').length)
         pfirst = parseInt(games[g].getElementsByTagName('first')[0].firstChild.nodeValue);
        var winner = 0;
        var losers = new Array();
        var winners = new Array();
        for(s=0; s<players.length; s++) {
          var pid = (players[s].firstChild.nodeValue);
          if(players[s].getAttribute('state') == "Won") {
            triumph = pid;
            if(triumph == puid) {
              winner = 1;
            }
            if(pid != puid) winners.push(pid);
          }
          else{
            if(pid != puid) losers.push(pid);
          }
        }
        var reallosers = winner? losers.length : losers.length + 1;
        numTeams = players.length / (players.length - reallosers);
        var maxLosers = players.length - (players.length / numTeams);
        if(winner) {
        if(numTeams < players.length) {
          totals[uid]._kills += numTeams - 1;
        }
        else{
          totals[uid]._kills += players.length - 1;
        }
        totals[uid]._wins++;
        }
        if(games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue != "C"){
         if(games[g].getElementsByTagName('events')[0]) {
          var events = games[g].getElementsByTagName('events')[0].getElementsByTagName('event');
          if(events.length) {
           for(e=0; e<events.length; e++) {
            if(events[e].firstChild.nodeValue.match(/^(\d+) gains (\d+) points$/)) {
             var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
             var gain = parseInt(RegExp.$2);
             var ply = parseInt(RegExp.$1);
             if(pids[ply - 1] == puid) {
	            totals[uid]._points += gain;
              meanwin += gain;
              if(!holder) {
                holder = tim;
              }
              beaten++;
             }
             else{
              if(!holder) {
                if(!winner)
                holder = tim;
              }
             }
            }
            else if(events[e].firstChild.nodeValue.match(/^(\d+) loses (\d+) points$/)) {
              var loss = parseInt(RegExp.$2);
              var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
              var ply = parseInt(RegExp.$1);
              meanloss += loss;
              if(pids[ply - 1] == puid) {
	             totals[uid]._points -= loss;
               myLoss = loss;
              }
            }
           }
           if(winner) {
             if(numTeams < players.length) {
              totals[uid]._meanwin += (players.length / numTeams) * meanwin / 20;
              totals[uid]._beaten += maxLosers;
             }
             else{
              totals[uid]._meanwin += meanwin / 20;
              totals[uid]._beaten += (players.length - 1);
             }
           }
           else{
             if(numTeams < players.length) {
              if(myLoss) {
               totals[uid]._meanwin += (((meanloss + (20 * (players.length / numTeams) * (players.length / numTeams))) / ((players.length / numTeams) * myLoss)) - 1);
               totals[uid]._beaten += maxLosers;
              }
             }
             else{
              if(myLoss) {
               totals[uid]._meanwin += (((meanloss + 20) / myLoss) - 1);
               totals[uid]._beaten += (players.length - 1);
              }
             }
           }
          }
         }
        }
        else{
         var mapwin = new Object();
         var maploss = new Object();
         if(games[g].getElementsByTagName('events')[0]) {
          var events = games[g].getElementsByTagName('events')[0].getElementsByTagName('event');
          if(events.length) {
           for(e=0; e<events.length; e++) {
            if(events[e].firstChild.nodeValue.match(/^(\d+) eliminated (\d+)/)) {
             fred = pids[parseInt(RegExp.$1) - 1];
             barn = pids[parseInt(RegExp.$2) - 1];
             if(!mapwin[fred]) mapwin[fred] = new Pinfo();
             if(!maploss[barn]) maploss[barn] = new Pinfo();
             mapwin[fred]._defeats[barn] = 1;
             maploss[barn]._defeats[fred] = 1;
            }
            else if(events[e].firstChild.nodeValue.match(/^(\d+) was kicked out for missing too many turns/)) {
             fred = pids[parseInt(RegExp.$1) - 1];
             if(!maploss[fred]) {
               maploss[fred] = new Pinfo();
               maploss[fred]._defeats[triumph] = 1;
               if(!mapwin[triumph])
                mapwin[triumph] = new Pinfo();
               mapwin[triumph]._defeats[fred] = 1;
             }
            }
           }
           for(e=0; e<events.length; e++) {
            if(events[e].firstChild.nodeValue.match(/^(\d+) gains (\d+) points$/)) {
            var gain = parseInt(RegExp.$2);
            var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
            var ply = parseInt(RegExp.$1);
            if(pids[ply - 1] == puid) {
	           totals[uid]._points += gain;
             meanwin += gain;
             if(!holder) {
               holder = tim;
             }
             beaten++;
            }
            else{
             if(!holder) {
               if(!winner)
               holder = tim;
             }
            }
           }
            else if(events[e].firstChild.nodeValue.match(/^(\d+) loses (\d+) points$/)) {
             var loss = parseInt(RegExp.$2);
             var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
             barn = pids[parseInt(RegExp.$1) - 1];
             if(!maploss[barn]) {
               maploss[barn] = new Pinfo();
               maploss[barn]._defeats[triumph] = 1;
               if(!mapwin[triumph])
                mapwin[triumph] = new Pinfo();
               mapwin[triumph]._defeats[barn] = 1;
             }
             for(var w in maploss[barn]._defeats) {
               maploss[barn]._defeats[w] = loss/20;
               mapwin[w]._defeats[barn] = loss/20;
             }
             meanloss += loss;
             if(barn == puid) {
	            totals[uid]._points -= loss;
              myLoss = loss;
             }
            }
           }
           var target = puid;
           if(winner) {
            var overall = cascadewin(mapwin, target);
            totals[uid]._meanwin += overall;
            totals[uid]._beaten += (players.length - 1);
           }
           else{
            var overall = 20 * cascadewin(mapwin, triumph);
            myLoss = 20 * cascadeloss(maploss, target);
            if(myLoss) {
             var collect = (((overall + 20) / myLoss) - 1);
             totals[uid]._meanwin += collect;
             totals[uid]._beaten += (players.length - 1);
            }
          }
         }
        }
        }
        totals[uid]._games++;
       }
      }
      
      totals[uid]._pages++;
      totals[uid]._counter += games.length;
      viewer.document.getElementById('progress').innerHTML = "Scanning " + user + "..." + (100 * (totals[uid]._pages)/(numPages)).toFixed(0) + "%";
      if(totals[uid]._pages == numPages && totals[uid]._counter == numGames) {
		      endGame(uid);
      }
   }
   else if (ghist["paging" + page].readyState == 1 && totals[uid]._pages == 0) {
    viewer.document.getElementById('progress').innerHTML = "Scanning " + user + "...0%";
   }
  }
  ghist["paging" + page].send(null);
}



function getGroups(page) {
  var jump = "http://www.conquerclub.com/forum/memberlist.php?g=193023&mode=group";
	if(page > 1) jump += "&start=" + (50 * (page - 1));
    sReq[page] = new XMLHttpRequest();
    sReq[page].open('GET', jump, true);
    sReq[page].onreadystatechange = function() {
      if (sReq[page].readyState == 4) {
        var div=document.createElement('div');
        div.innerHTML = sReq[page].responseText;
        var pagination = getElementsByClassName(div,'li','rightside pagination',true);
        if(pagination[0].innerHTML.match(/of <strong>(\d+)</)) thisPage = parseInt(RegExp.$1);
        if(page == 1) {
           if(thisPage > 1) {
             for(var pg=2;pg<=thisPage;pg++) {
             getGroups(pg);
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
               totals[RegExp.$1] = new Totals(aname);
		         }
	         }
         }
         total._pages++;
         if(total._pages == thisPage) {
	         showHTML();
         }
      }
    }
    sReq[page].send(null);
}

function showHTML() {
var w = "<span class=field-label>SSSCE Member</span><select id=sname class=field><option>SSSCE Member</option>";
for(var g in totals){
	w+= "<option value=" + g + ">" + totals[g]._name + "</option>";
}
w += "</select>";
document.getElementById('ssscebox').innerHTML = w + "<span>&nbsp;&nbsp;</span><input type=button id=sssce value=\"SSSCE Stats\" />";
document.getElementById('sssce').addEventListener("click", function() {
	if(document.getElementById('sname').selectedIndex) {
	 var mem = parseInt(document.getElementById('sname').options[document.getElementById('sname').selectedIndex].value);
	 var nem = (document.getElementById('sname').options[document.getElementById('sname').selectedIndex].text);
     sajax = [];
     setBox();
     createBox();
     totals[mem] = new Totals(nem);
     getHistPage(nem,mem,1);	
   }
}, false);
}

if(document.getElementsByTagName('fieldset').length) {
window.addEventListener("unload" , cleanup, false);
proto = window.location.protocol;
total = new Total();
var buttonDiv = document.getElementsByTagName('fieldset')[0].appendChild(document.createElement('div'));
buttonDiv.className = "field-row";
buttonDiv.id = "ssscebox";
buttonDiv.innerHTML = "<span class=field-label>SSSCE Loading...</span>";
getGroups(1);
}
