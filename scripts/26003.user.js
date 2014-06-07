//
// ==UserScript==
// @name          Conquer Club Turn Watch
// @namespace     http://userscripts.org/
// @description   Script to work out, from any webpage, if anyone has completed a new turn, and to alert/display last turn log in all active games for the Conquer Club Site
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var twversion = "2.0.8";
var twlatestVersion = 0;
var features=[];
var gameid=[];
var alerts = 0;
var sortalg = 0;
var options = 0;
var ingames = [];
var times = [];
var hms = [];
var tourney = [];
var textout=[];
var lengths=[];
var alerting = [];
var gameReq = [];
var __eventListeners = [];
var interval;
var popupInfo;
var thisPlayer;

function Game(map,players,survivors,types) {
	this._map = map;
	this._time = 0;		
}

function previousSib(node){
  var tempNode=node.previousSibling;
  while(tempNode.nodeType!=1){
    tempNode=tempNode.previousSibling;
  }
  return tempNode;
}

function sortNone (numb, tim) {
  ingames.push(gameid[numb]);
  times.push(tim);
}

function sortLow(numb, tim) {
var i=0;
while(i < ingames.length && gameid[numb] < ingames[i]){i++;}
if(i == ingames.length){
  times.push(tim);
  ingames.push(gameid[numb]);
}
else{
  times.splice(i,0,tim);
  ingames.splice(i,0,gameid[numb]);
}
}

function sortHigh(numb, tim) {
var i=0;
while(i < ingames.length && gameid[numb] > ingames[i]){i++;}
if(i == ingames.length){
  times.push(tim);
  ingames.push(gameid[numb]);
}
else{
  times.splice(i,0,tim);
  ingames.splice(i,0,gameid[numb]);
}
}

function sortTimeLow(numb, tim) {
var i=0;
while(i < times.length && tim < times[i]){i++;}
if(i == times.length){
  times.push(tim);
  ingames.push(gameid[numb]);
}
else{
  times.splice(i,0,tim);
  ingames.splice(i,0,gameid[numb]);
}
}

function sortTimeHigh(numb, tim) {
var i=0;
while(i < times.length && tim > times[i]){i++;}
if(i == times.length){
  times.push(tim);
  ingames.push(gameid[numb]);
}
else{
  times.splice(i,0,tim);
  ingames.splice(i,0,gameid[numb]);
}
}

function addListener(instance, eventName, listener) {
    var listenerFn = listener;
    instance.addEventListener(eventName, listenerFn, false);
    var event = {
        instance: instance,
        name: eventName,
        listener: listenerFn
    };
    __eventListeners.push(event);
    return event;
}

function removeListener(event) {
    var instance = event.instance;
    instance.removeEventListener(event.name, event.listener, false);
    for (var i = 0; i < __eventListeners.length; i++) {
        if (__eventListeners[i] == event) {
            __eventListeners.splice(i, 1);
            break;
        }
    }
}

function unregisterNewEvents() {
    while (__eventListeners.length > 0) {
        removeListener(__eventListeners[0]);
    }
    for(e=0; e< gameReq.length;e++)
    {
      gameReq[e].abort();
    }
    if(interval) window.clearTimeout(interval);
}

function getTurns() {
var logout = getElementsByClassName(document,'div','vnav',true);
var para = logout[0].getElementsByTagName('a');
if(para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
  thisPlayer = RegExp.$1;
}      	
var al = GM_getValue('alerts');
if(typeof(al) == "undefined") {
GM_setValue('alerts',alerts);
}
else{
alerts = al;
}
var st = GM_getValue('sort');
if(typeof(st) == "undefined") {
GM_setValue('sort',sortalg);
}
else{
sortalg = st;
}
var gamesarr = eval(GM_getValue('turngames'));
if(typeof(gamesarr) == "undefined") {	
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.conquerclub.com/api.php?mode=gamelist&gs=A&p1un=' + thisPlayer,
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xhtml+xml',
  },
  onload: function(responseDetails) {
	  var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
    var games = dom.getElementsByTagName('game');
    if(games.length) {
    	for(var g=0; g< games.length; g++) {
        var game = parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue);
        var gtypes = new Array();
        var map = games[g].getElementsByTagName('map')[0].firstChild.nodeValue;
        var gameObj = new Game(map);
        gameid[game] = gameObj;
    	}
  	}
  	GM_setValue('turngames', uneval(gameid));
  }
});
}
else{
gameid = gamesarr;
}
ingames = [];
times = [];
var hms = [];
var textout=[];
lengths=[];
var alerting = [];
for(var i in gameid) {
	details(i);
}
}

var left = document.getElementById("leftColumn");
var ul = left.getElementsByTagName("ul");
if (ul[0]) {
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fileden.com/files/2008/5/8/1902058/turns.txt?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      features = responseDetails.responseText.split('\n');
      var latest = features[0].split('.');
      var ver = twversion.split('.');
      twlatestVersion = (((parseInt(latest[0]) * 100) + (parseInt(latest[1]) * 10) + parseInt(latest[2])) > ((parseInt(ver[0]) * 100) + (parseInt(ver[1]) * 10) + parseInt(ver[2])));
      getTurns();
  }
});
GM_addStyle(".miniblock {width:25px;height:17px} .mini {width:10px;height:15px} .minipad {padding:3px 0px;} .minicut {text-align:right;cursor:pointer;margin:0px;padding:0px 3px 0px 3px;} .minimap {cursor:pointer;padding:1px 0px 1px 3px;vertical-align: middle;}");
GM_addStyle("#box {margin:0px;padding:0px;font-size:12px;background:#eee;position:absolute;left:200px;top:50%;border:5px black solid;z-index:100}");
GM_addStyle("#box li {list-style:none;border:1px solid #cdc} #box li:hover{background-color:#cdc} #box li a {text-decoration:none;} #close {cursor:pointer;background-colour:#eee} #close:hover {background-color:#f00}");
GM_addStyle(".pyr1,.attsrc {background-color:#f00;border:3px solid #f00} .pyr2,.fortsrc {background-color:#009a04;border:3px solid #009a04}");
GM_addStyle(".pyr3 {background-color:#00f;border:3px solid #00f} .pyr4,.depl {background-color:#cc0;border:3px solid #cc0}");
GM_addStyle(".pyr5 {background-color:#f0f;border:3px solid #f0f} .pyr6 {background-color:#0cc;border:3px solid #0cc}");
GM_addStyle(".pyr7 {background-color:#f92;border:3px solid #f92} .pyr8 {background-color:#7f7f7f;border:3px solid #7f7f7f}");
GM_addStyle(".fortdest {background-color:#009a04;border:3px dotted #fff} .attdest {background-color:#f00;border:3px dashed #fff}");
GM_addStyle(".weak {border:3px solid #cdc} .critical {border:3px solid #000} .pyr0 {background-color:#fff;border:3px solid #fff}");
GM_addStyle("#alertDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;}");
GM_addStyle("#alertBox {position:relative;min-width:500px;min-height:100px;margin-top:50px;border:2px solid #000;background-color:#F2F5F6;background-image:url('http://www.conquerclub.com/static/icon_msg_alert.gif');background-repeat:no-repeat;background-position:20px 30px;}");
GM_addStyle("#alertDiv > #alertBox {position:fixed;}");
GM_addStyle("#alertBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;}");
GM_addStyle("#alertBox p {font:0.7em verdana,arial;padding-left:5px;margin-left:55px;}");
GM_addStyle("#alertBox a {display:inline;position:relative;border:1px solid #000;width:100px;font: verdana,arial;text-transform:uppercase;color:#000;background-color:#cdc;text-decoration:none;}");
GM_addStyle("#alertBox a:hover,#alertBox #closeBtn:hover {background-color:#889988;;color:#fff}");
GM_addStyle("#alertBox #closeBtn {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;}");
GM_addStyle(".bomb {border-style:dashed}");
var box = document.createElement('div');
box.id = "box";
box.style.visibility = "hidden";
document.body.appendChild(box);
addListener(window, "unload" , unregisterNewEvents);
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

var classHover = new Array("title=\"No recent activity\"",
                           "class=\"player1\" title=\"New Turn Taken\"",
                           "class=\"player4\" title=\"Turn In Progress\"",
                           "class=\"player2\" title=\"Your Turn Next!\"",
                           "class=\"player3\" title=\"Teammate's Turn Next\"",
                           "class=\"player5\" title=\"New Game Chat\"",
                           "",
                           "class=\"errormsg\" title=\"Game Finished\""
);

var chkbox = new Array("anyone's turn", "turn is in progress", "your turn", "your teammate's turn" , "new game chat", "being attacked", "game finished");
var sorts = new Array("No Sort", "Game # &uarr;&uarr;", "Game # &darr;&darr;", "Time Left &uarr;&uarr;", "Time Left &darr;&darr;");
var sortfn = new Array(sortNone, sortLow, sortHigh, sortTimeLow, sortTimeHigh);
var weakness = new Array("", "weak", "critical");

function createAlert(txt) {
  if(document.getElementById("alertDiv")) return;
  mObj = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
  mObj.id = "alertDiv";
  mObj.style.visibility = 'hidden';
	mObj.style.height = document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(document.createElement("div"));
	alertObj.id = "alertBox";
  alertObj.style.left = (document.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  h1 = alertObj.appendChild(document.createElement("h1"));
  h1.appendChild(document.createTextNode("TURN WATCH ALERT"));
  msg = alertObj.appendChild(document.createElement("p"));
  msg.innerHTML = "<br />News:<br /><br />" + txt;
  btn = alertObj.appendChild(document.createElement("a"));
	btn.id = "closeBtn";
  btn.appendChild(document.createTextNode("OK"));
  btn.href = "javascript:void(0);";
  addListener(btn, "click" , function () {
    removeAlert();
  });
  mObj.style.visibility = 'visible';
}

function removeAlert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("alertDiv"));
}


function loaded() {
  if(document.getElementById('collect'))
  document.getElementById('collect').style.display = "none";
  for(var u=0; u< gameid.length; u++) {
    document.getElementById('turnmenuUl' + gameid[u]).style.display = "block";
  }
  addListener(document.getElementById('mark'), "click" , function () {
    for(var y=0; y< ingames.length; y++) {
     if(textout[y]) GM_setValue('log' + gameid[y],textout[y]);
     if(lengths[y]) GM_setValue('chat' + gameid[y],lengths[y]);
     document.getElementById('span' + gameid[y]).className = '';
    }
  });
  var alertstring = "";
  if(alerts) {
   var oldalert = GM_getValue('alerting');
   if(typeof(oldalert) != "undefined") {
     oldarray = oldalert.split(",");
     alertstring = "";
     for(var x=0; x< oldarray.length; x++) {
       if((alerting[x] != oldarray[x]) && alerting[x] != "") {
         alertstring += "<a title=\"Go To Game " + gameid[x] + "\" href=\"http://www.conquerclub.com/game.php?game=" + gameid[x] + "&full_log=Y\">Go To Game Page</a>" + alerting[x] + "<br />";
       }
     }
     if(alertstring) {
       GM_setValue('alerting',alerting.join(","));
       createAlert(alertstring);
     }
   }
   else{
    GM_setValue('alerting',alerting.join(","));
    createAlert(alertstring);
   }
  }
}

function Popup(bind, myPlayer, pic, xt, tour, gt) {
this._bind = bind;
this._myPlayer = myPlayer;
this._pic = pic;
this._xt = xt;
this._tour = tour;
this._gt = gt;
}

function pingpopup(delay) {
interval = window.setTimeout(function () {
  var tdivs = "";
  var myTeam;
  var alias = [];
  var cards = [];
  var names = [];
  var player = 0;
  var teams = [];
  var team = 0;
  var ext = popupInfo._xt;
  var image = popupInfo._pic;
  var tournament = popupInfo._tour;
  var gtype = popupInfo._gt;
  var fresh = 'http://www.conquerclub.com/game.php?game=' + popupInfo._bind + '&ajax=1';
  GM_xmlhttpRequest({
    method: 'GET',
    url: fresh,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/xml,text/xml',
    },
    onload: function(responseDetails) {
      var chunks = responseDetails.responseText.split("&");
      var key = chunks[6];
      var armies = chunks[5].replace(/\?-/g,'0-').split(',');
      var msize = chunks[8];
      var mwidth = chunks[9];
      var mheight = chunks[10];
      var lines = chunks[15].split(/<br>|<br \/>/);
      var rnd = chunks[2];
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://maps.conquerclub.com/' + image + '.xml?nocache='+Math.random(),
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/xml,text/xml',
        },
        onload: function(responseDetails) {
          var ltbox="";
          var parser = new DOMParser();
          var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
          var size = (msize == 'S' ? "small" : "large");
          var coord = dom.getElementsByTagName('coordinates');
          var conti = dom.getElementsByTagName('continent');
          var tdivs = "";
          var places = [];
          var borders = [];
          var continents = [];
          var shelf = "";
          var teambox = "";
          for(c=0; c< coord.length; c++) {
            var sib = previousSib(coord[c]);
            if(sib.getElementsByTagName('bombardment').length)
              sib = previousSib(sib);
            var terr = armies[c].split('-');
            var bounds = sib.getElementsByTagName('border');
            var locale = [];
            for(var b=0; b<bounds.length; b++) {
              locale.push(bounds[b].firstChild.nodeValue);
            }
            if(locale.length) borders.push(locale.join('|'));
            places.push(previousSib(sib).firstChild.nodeValue);
            tdivs += "<div id=\"tdiv" + c + "\" style=\"opacity:0.6;width:" + (15 + (terr[1].length * 8));
            tdivs += "px;height:23px;position:absolute;left:";
            tdivs += (parseInt(coord[c].getElementsByTagName(size + "x")[0].firstChild.nodeValue) - 8) + "px;top:";
            tdivs += (parseInt(coord[c].getElementsByTagName(size + "y")[0].firstChild.nodeValue) - 33) + "px;\"";
            tdivs += "></div>";
          }
          for(p=0;p<conti.length;p++) {
            var locale = [];
            var unique = 1;
            var pl = 0;
            var comp = conti[p].getElementsByTagName('components')[0];
            var terr = comp.getElementsByTagName('territory');
            var sib = previousSib(comp);
            for(var t=0;t<terr.length; t++) {
              var ind = places.indexOf(terr[t].firstChild.nodeValue);
              var ter = armies[ind].split('-');
              var pt =  parseInt(ter[0]);
              if(!pl) pl = pt;
              if(pt != pl) unique = 0;
              locale.push(ind);
            }
            if(locale.length) continents.push(locale.join('|'));
            shelf += "<a style=\"color:black;\"";
            if(unique) {
              shelf += " class=pyr" + pt;
            }
            shelf += " id=shelf" + p + ">" + previousSib(sib).firstChild.nodeValue + "(" + sib.firstChild.nodeValue + ")</a> ";
          }
          var hm = chunks[3].replace(/^\n|\n$/g, '');
          hm = hm.replace(/\n/g, ' ');
          if(!hm) {
             hm = "Game Finished";
          }
          maptext = "";
          var udiv = document.createElement('div');
          udiv.innerHTML = chunks[4];
          var lis = udiv.getElementsByTagName('li');
          player = 0;
          for(l=0; l<lis.length; l++) {
            if(!lis[l].innerHTML.match(/<b>Team (\d):/)) {
            var anc = lis[l].getElementsByTagName('a');
            var img = lis[l].getElementsByTagName('img');
            cards[player] = (img[0]? parseInt(img[0].title.charAt(0)) : -1);
            teams[player] = team;
            var href;
            if(anc[0].href.match(/^(.+?)forum\/memberlist(.+?)$/)) {
              href = "http://www.conquerclub.com/forum/memberlist" + unescape(RegExp.$2);
            }
            if(anc[0].href.match(/username=(.+?)$/)) {
              names[player] = (RegExp.$1).replace(/\+/g, " ");
            }
            alias[player] = "<a href=\"" + href + "\" title=\"" + anc[0].title + "\"> <span class=\"player" + (player + 1) + "\"> " + names[player] + " </span></a>";
            if(!lis[l].className.match(/status_red/)) {
              maptext = "<li><a title=\"Go To Game Page\" href=\"http://www.conquerclub.com/game.php?game=" + popupInfo._bind + "&full_log=Y\">Go To Game " + popupInfo._bind + "</a></li><li><b>Round:</b> " + rnd + "</li><b>Next Player:</b><br />" + alias[player] + "<br /><b>Time Left:</b><br />" + hm;
              if(team) {
                maptext += "<br />Team: " + team;
              }
            }
            player++;
          }
          else{
            team = RegExp.$1;
          }
          }
          udiv = null;
          for(g=0;g<player;g++) {
            var rx = '<a id="pyr' + (g+1) + '" href';
            var hva = alias[g];
            if(cards[g] > -1) {
              hva = hva.replace(names[g] + " </span></a>","<img src=\"http://www.conquerclub.com/static/cards.gif\" width=18 height=16 />" + cards[g] + " " + names[g] + " </span></a>");
            }
            hva = hva.replace(/^<a href/,rx);
            hva = hva.replace(/class="rank (.+?)"/,'');
            ltbox += hva + ",";
          }
          for(m=0; m< parseInt(team); m++) {
            teambox += "<a style=\"color:black;\" id=team" + (m + 1) + ">Team " + (m + 1) + "</a> ";
          }
          output = "";
          border = "";
          if(lines.length > 0) {
           var num= lines.length - 1;
           while(num > 0 && !lines[num].match(/ - <span class="(.+?)"/)) {
             num--;
           }
           var last = (RegExp.$1).split("player")[1];
           var reg = new RegExp(" - <span class=\"" + RegExp.$1 + "\"");
           while( num> 0 && lines[num].match(reg)) {
             if(lines[num].match(popupInfo._myPlayer)) {
               border = "<li style=\"border: 2px solid red\">";
             }
             else{
               border = "<li>";
             }
             output = border + lines[num].replace(/^(.+?) - /g,'') + "</li>" + output;
             num--;
           }
           if(cards[last - 1] > -1) {
            if(names[last - 1] == popupInfo._myPlayer) {
              border = "<li style=\"border: 2px solid red\">";
            }
            else{
              border = "<li>";
            }
            output += border + alias[last - 1] + " now has " + cards[last - 1] + " spoils</li>";
           }
           output = "<br /><li></li><li><b>Last turn:</b> </li>" + output;
          }
          output = output.replace(/class="rank (.+?)"/,'');
          ltbox = ltbox.substr(0,ltbox.length - 2);
          output = output.replace(/<br \/><li><\/li>/g,'');
          document.getElementById('box').style.width = (parseInt(mwidth) + 160) + "px";
          document.getElementById('box').style.height = (parseInt(mheight) + 130) + "px";;
          document.getElementById('box').innerHTML = "<table><tr><td><div style=\"width:" + mwidth + "px;height:" + mheight + "px;background-image:url(http://maps.conquerclub.com/" + image + "." + msize + "." + ext + ");\"><img style=\"width:" + mwidth + "px;height:" + mheight + "px\" border=1 width=" + mwidth + " height=" + mheight + " src=\"http://www.conquerclub.com/map.php?key=" + key + "&nocache=" + new Date().getTime() + "\" />" + tdivs + "</div></td><td><div style=\"width:150px;height:" + mheight + "px;overflow:auto;\">"  + maptext + output + "</div></td></tr><tr><td colspan=2>"  + "</td></tr><tr><td colspan=2>" + tournament  + gtype + "</td></tr><tr><td colspan=2>" + ltbox + "</td></tr><tr><td colspan=2>" + teambox + "</td></tr><tr><td colspan=2><div style=\"overflow:auto;width:" + mwidth + "px;height:40px;\">" + shelf + "</div></td></tr><tr><td id=\"close\" colspan=2 align=center>Click To Close</td></tr></table>";
          addListener(document.getElementById('close'), "click" , function () {
          if(interval) window.clearTimeout(interval);
          document.getElementById('box').style.visibility='hidden';
          document.getElementById('box').innerHTML='';
          });
          for(c=0; c< coord.length; c++) {
            addListener(document.getElementById('tdiv' + c), "mouseover" , function () {
              var loc = this.id.split('tdiv')[1];
              var bounds = borders[loc].split('|');
              var terr = armies[loc].split('-');
              for(b=0; b< bounds.length; b++) {
                var index = places.indexOf(bounds[b]);
                var neighbour = armies[index].split('-');
                document.getElementById('tdiv' + index).className = 'pyr' + neighbour[0];
                if(neighbour[0] != terr[0]) {
                  if(parseInt(neighbour[1]) > parseInt(terr[1])) {
                    if(parseInt(neighbour[1]) > (2 * parseInt(terr[1]))) {
                      document.getElementById('tdiv' + index).className += ' critical';
                    }
                    else{
                      document.getElementById('tdiv' + index).className += ' weak';
                    }
                  }
                }
              }
            });
            addListener(document.getElementById('tdiv' + c), "mouseout" , function () {
              var bounds = borders[this.id.split('tdiv')[1]].split('|');
              for(b=0; b< bounds.length; b++) {
                document.getElementById('tdiv' + places.indexOf(bounds[b])).className = '';
              }
            });
          }
          var les = document.getElementById('box').getElementsByTagName('li');
          for(ls=0;ls<les.length;ls++) {
            if(les[ls].innerHTML.match(/deployed (.+?)troops on (.+?)$/)) {
              if(RegExp.$2 != '?') {
              les[ls].id = places.indexOf(RegExp.$2);
              les[ls].innerHTML = les[ls].innerHTML.replace(/deployed/, '<span class=depl>deployed</span>');
              addListener(les[ls], "mouseover" , function () {
                  document.getElementById('tdiv' + this.id).className = 'depl';
              });
              addListener(les[ls], "mouseout" , function () {
                  document.getElementById('tdiv' + this.id).className = '';
              });
              }
            }
            else if(les[ls].innerHTML.match(/receives (.+?) troops for holding (.+?)$/)) {
              if(RegExp.$2 != '?') {
              les[ls].id = places.indexOf(RegExp.$2);
              les[ls].innerHTML = les[ls].innerHTML.replace(/holding/, '<span class=depl>holding</span>');
              addListener(les[ls], "mouseover" , function () {
                  document.getElementById('tdiv' + this.id).className = 'depl';
              });
              addListener(les[ls], "mouseout" , function () {
                  document.getElementById('tdiv' + this.id).className = '';
              });
              }
            }
            else if(les[ls].innerHTML.match(/assaulted (.+?) from (.+?) and conquered/)) {
              if(RegExp.$2 != '?') {
              les[ls].id = places.indexOf(RegExp.$1) + "," + places.indexOf(RegExp.$2) + ",";
              les[ls].innerHTML = les[ls].innerHTML.replace(/assaulted/, '<span class=attsrc>assaulted</span>');
              addListener(les[ls], "mouseover" , function () {
                  document.getElementById('tdiv' + this.id.split(',')[0]).className = 'attdest';
                  document.getElementById('tdiv' + this.id.split(',')[1]).className = 'attsrc';
              });
              addListener(les[ls], "mouseout" , function () {
                  document.getElementById('tdiv' + this.id.split(',')[0]).className = '';
                  document.getElementById('tdiv' + this.id.split(',')[1]).className = '';
              });
              }
            }
            else if(les[ls].innerHTML.match(/reinforced (.+?) with(.+?)from (.+?)$/)) {
              if(RegExp.$3 != '?') {
              les[ls].id = places.indexOf(RegExp.$1) + "," + places.indexOf(RegExp.$3) + ",";
              les[ls].innerHTML = les[ls].innerHTML.replace(/reinforced/, '<span class=fortsrc>reinforced</span>');
              addListener(les[ls], "mouseover" , function () {
                  document.getElementById('tdiv' + this.id.split(',')[0]).className = 'fortdest';
                  document.getElementById('tdiv' + this.id.split(',')[1]).className = 'fortsrc';
              });
              addListener(les[ls], "mouseout" , function () {
                  document.getElementById('tdiv' + this.id.split(',')[0]).className = '';
                  document.getElementById('tdiv' + this.id.split(',')[1]).className = '';
              });
              }
            }
          }
          for(g=0;g<player;g++) {
            addListener(document.getElementById('pyr' + (g+1)), "mouseover" , function () {
              var myg = this.id.split('pyr')[1];
              for(c=0;c<armies.length;c++) {
                var terr = armies[c].split('-');
                if(terr[0] == myg) {
                  var bounds = borders[c].split('|');
                  var critical = 0;
                  document.getElementById('tdiv' + c).className = 'pyr' + myg;
                  for(b=0; b< bounds.length; b++) {
                    var index = places.indexOf(bounds[b]);
                    var neighbour = armies[index].split('-');
                    if(neighbour[0] != terr[0]) {
                      if(parseInt(neighbour[1]) > parseInt(terr[1])) {
                        if(parseInt(neighbour[1]) > (2 * parseInt(terr[1]))) {
                          critical = 2;
                          break;
                        }
                        else if(critical == 0){
                          critical = 1;
                        }
                      }
                    }
                  }
                  document.getElementById('tdiv' + c).className += ' ' + weakness[critical];
                }
              }
            });
            addListener(document.getElementById('pyr' + (g+1)), "mouseout" , function () {
              for(c=0;c<armies.length;c++) {
                document.getElementById('tdiv' + c).className = '';
              }
            });
          }
          for(p=0;p<conti.length;p++) {
            addListener(document.getElementById('shelf' + p), "mouseover" , function () {
              var mys = this.id.split('shelf')[1];
              var countries = continents[mys].split('|');
              for(c=0;c< countries.length;c++) {
                var terr = armies[countries[c]].split('-');
                  var bounds = borders[countries[c]].split('|');
                  var critical = 0;
                  document.getElementById('tdiv' + countries[c]).className = 'pyr' + terr[0];
                  for(b=0; b< bounds.length; b++) {
                    var index = places.indexOf(bounds[b]);
                    var neighbour = armies[index].split('-');
                    if(neighbour[0] != terr[0]) {
                      if(parseInt(neighbour[1]) > parseInt(terr[1])) {
                        if(parseInt(neighbour[1]) > (2 * parseInt(terr[1]))) {
                          critical = 2;
                          break;
                        }
                        else if(critical == 0){
                          critical = 1;
                        }
                      }
                    }
                  }
                  document.getElementById('tdiv' + countries[c]).className += ' ' + weakness[critical];
              }
            });
            addListener(document.getElementById('shelf' + p), "mouseout" , function () {
              for(c=0;c<armies.length;c++) {
                document.getElementById('tdiv' + c).className = '';
              }
            });
          }
          for(m=0; m< parseInt(team); m++) {
            addListener(document.getElementById('team' + (m+1)), "mouseover" , function () {
              var myt = this.id.split('team')[1];
              for(c=0;c<armies.length;c++) {
                var terr = armies[c].split('-');
                if(teams[parseInt(terr[0]) - 1] == myt) {
                  var bounds = borders[c].split('|');
                  var critical = 0;
                  document.getElementById('tdiv' + c).className = 'pyr' + terr[0];
                  for(b=0; b< bounds.length; b++) {
                    var index = places.indexOf(bounds[b]);
                    var neighbour = armies[index].split('-');
                    if(teams[parseInt(neighbour[0]) - 1] != teams[parseInt(terr[0]) - 1]) {
                      if(parseInt(neighbour[1]) > parseInt(terr[1])) {
                        if(parseInt(neighbour[1]) > (2 * parseInt(terr[1]))) {
                          critical = 2;
                          break;
                        }
                        else if(critical == 0){
                          critical = 1;
                        }
                      }
                    }
                  }
                  document.getElementById('tdiv' + c).className += ' ' + weakness[critical];
                }
              }
            });
            addListener(document.getElementById('team' + (m+1)), "mouseout" , function () {
              for(c=0;c<armies.length;c++) {
                document.getElementById('tdiv' + c).className = '';
              }
            });
          }
          document.getElementById('box').style.visibility = "visible";
        }
      });
    }
  });
  pingpopup(120000);
} , delay);
}

function details(gameno) {
var game = 'http://www.conquerclub.com/api.php?mode=gamelist&gn=' + gameno;
gameReq[gameno] = new XMLHttpRequest();
gameReq[gameno].open('GET', game, true);
gameReq[gameno].onreadystatechange = function() {
  if (gameReq[gameno].readyState == 4) {
    	var parser = new DOMParser();
    	var dom = parser.parseFromString(gameReq[gameno].responseText,"application/xml");
    	var round = parseInt(dom.getElementsByTagName('round')[0].firstChild.nodeValue);    	
    	var timeleft = dom.getElementsByTagName('time_remaining')[0].firstChild.nodeValue;
      var mapname = dom.getElementsByTagName('map')[0].firstChild.nodeValue;
      var players = dom.getElementsByTagName('player');
      var gaming = dom.getElementsByTagName('game_type')[0].firstChild.nodeValue;
      var touring = "";
      if(dom.getElementsByTagName('tournament')[0].firstChild)
        touring = dom.getElementsByTagName('tournament')[0].firstChild.nodeValue;
      var joinable = dom.getElementsByTagName('private')[0].firstChild.nodeValue;
      var speeding = dom.getElementsByTagName('speed_game')[0].firstChild.nodeValue;
      var ordering = dom.getElementsByTagName('play_order')[0].firstChild.nodeValue;
      var troops = dom.getElementsByTagName('initial_troops')[0].firstChild.nodeValue;
      var cards = dom.getElementsByTagName('bonus_cards')[0].firstChild.nodeValue;
      var fort = dom.getElementsByTagName('fortifications')[0].firstChild.nodeValue;
      var fog = dom.getElementsByTagName('war_fog')[0].firstChild.nodeValue;
      var info = "";
      var gstate = "";
      if(speeding == "Y") info += "S";
      if(timeleft == "0") {
	      if(round) gstate = "F";
	      else gstate = "W";
      }
      else gstate = "A";
      alert(gameno);    	    	
  }
};
gameReq[gameno].send(null);
}

function ndetails(gameno) {
var game = 'http://www.conquerclub.com/game.php?game=' + gameid[gameno];
gameReq[gameno] = new XMLHttpRequest();
gameReq[gameno].open('GET', game, true);
gameReq[gameno].onreadystatechange = function() {
  if (gameReq[gameno].readyState == 4) {
      var html = "";
      var text = "";
      var maptext = "";
      var myPlayer;
      var myTeam;
      var thistime = 0;
      var attacked = 0;
      var div=document.createElement('div');
      div.innerHTML = gameReq[gameno].responseText;
      var logout = getElementsByClassName(document,'div','vnav',true);
      var para = logout[0].getElementsByTagName('a');
      if(para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
        myPlayer = RegExp.$1;
      }
      var divs = div.getElementsByTagName('div');
      var uls = div.getElementsByTagName('ul');
      var tds = div.getElementsByTagName('td');
      var imgs = div.getElementsByTagName('img');
      var spans = div.getElementsByTagName('span');
      var header = div.getElementsByTagName('h3');
      var alias = [];
      var cards = [];
      var update = [];
      var names = [];
      var player = 0;
      var teams = [];
      var team = 0;
      var strikel = "";
      var striker = "";
      var nextTeam = 0;
      var gtype = "";
      var mtype = "";
      var elim = 0;
      var classtype = 1;
      var round = (header[1].getElementsByTagName('span')[0]? ", rd" + (header[1].getElementsByTagName('span')[0].innerHTML) : "");
      var map = "";
      var image = "";
      var tournament = "";
      var tourind = "";
      var ext = "";
      alerting[gameno] = "";

      if(tourney[gameno]) {
        tournament = "<b>" + tourney[gameno] + "</b><br />";
        var s = tourney[gameno].split(" ");
        tourind = s[0].charAt(0);
        if(s[1] == "Speed")
          tourind += "S";
      }
      for(var im=0; im< imgs.length; im++) {
        if(imgs[im].id == "inner-map") {
          map = imgs[im].alt;
          var mu = new RegExp(/maps\.conquerclub\.com\/(.+?)\.(L|S)\.(.+?)\)/);
          if(imgs[im].parentNode.parentNode.style.backgroundImage.match(mu)) {
            image = escape(RegExp.$1);
            ext = RegExp.$3;
          }
          break;
        }
      }
      for(var td=0; td< tds.length; td++) {
        if(tds[td].colSpan == 2) {
          gtype = tds[td].innerHTML;
          mtype = gtype;
          gtype = gtype.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br />");
          break;
        }
      }
      for(var sp=0; sp<spans.length;sp++) {
        if(spans[sp].id == "clock") {
          if(spans[sp].innerHTML.match(/(\d+)hrs\n(\d+)min\n(\d+)sec/)) {
            thistime =  (3600 * parseInt(RegExp.$1)) + (60 * parseInt(RegExp.$2)) + parseInt(RegExp.$3);
          }
          var hm = spans[sp].innerHTML.replace(/^\n|\n$/g, '');
          hms[gameno] = hm.replace(/\n/g, ' ');
          break;
        }
      }
      if(!hms[gameno]) {
        thistime = (3600 * 24);
        if(gtype) {
         hms[gameno] = "Game Finished";
         thistime++;
        }
      }
      for(u=0;u<uls.length;u++) {
        if(uls[u].id == 'players') {
          var lis = uls[u].getElementsByTagName('li');
          for(l=0; l<lis.length; l++) {
            if(!lis[l].innerHTML.match(/<b>Team (\d):/)) {
            var anc = lis[l].getElementsByTagName('a');
            var img = lis[l].getElementsByTagName('img');
            cards[player] = (img[0]? parseInt(img[0].title.charAt(0)) : -1);
            teams[player] = team;
            var href;
            if(anc[0].href.match(/^(.+?)forum\/memberlist(.+?)$/)) {
              href = "http://www.conquerclub.com/forum/memberlist" + RegExp.$2;
            }
            if(anc[0].href.match(/username=(.+?)$/)) {
              names[player] = (RegExp.$1).replace(/\+/g, " ");
            }
            alias[player] = "<a href=\"" + href + "\" title=\"" + anc[0].title + "\" class=\"" + anc[0].className + "\"> <span class=\"player" + (player + 1) + "\"> " + names[player] + " </span></a>";
            if(!lis[l].className.match(/status_red/)) {
              html = "<li><a title=\"Go To Game Page\" href=\"http://www.conquerclub.com/game.php?game=" + gameid[gameno] + "&full_log=Y\">Go To Game " + gameid[gameno] + "</a></li><b>Next Player:</b><br />" + alias[player] + "<br /><b>Time Left:</b><br />" + hms[gameno];
              text = "\nGame " + gameid[gameno] + ": Next Player: " + names[player] + " ";
              if(team) {
                html += "<br />Team: " + team;
                text += "Team: " + team + " ";
                nextTeam = team;
              }
              if(lis[l].className.match(/status_yellow/)) {
                text += "Currently Playing ";
                classtype = 2;
              }
              else if (names[player] == myPlayer){
                text += "It's your turn! ";
                classtype = 3;
              }
            }
            if (names[player] == myPlayer && team) {
              myTeam = team;
            }
            if(lis[l].innerHTML.match(/class="eliminated"/)) {
              if(names[player] == myPlayer) {
               strikel = "<strike>";
               striker = "</strike>";
              }
              elim++;
            }
            player++;
          }
          else{
            team = RegExp.$1;
          }
          if(nextTeam && nextTeam == myTeam && classtype != 3) {
                text += "Your team ";
                classtype = 4;
          }
          }
          html = "<div style=\"display:none\" id=\"div" + gameid[gameno] + "\"><span id=\"gtype\">Game: <b>" + gameid[gameno] + "</b><br />" + tournament + "Map: <b>" + map + "</b><br/>Players: <b>" + player + "</b><br />" + gtype + "</span><li></li>" + html;
          break;
        }
      }
      if(thistime == ((3600 * 24) + 1)) {
        classtype = 7;
        text = "\nGame " + gameid[gameno] + ": Game Finished";
      }
      else if(thistime == ((3600 * 24))){
        var awul = getElementsByClassName(div,'ul','players',true);
        if(awul[0]) {
        var lis = awul[0].getElementsByTagName('li');
        elim = lis.length;
        for(l=0; l<lis.length; l++) {
          var anc = lis[l].getElementsByTagName('a');
          var href;
          if(anc[0]) {
          if(anc[0].href.match(/^(.+?)forum\/memberlist(.+?)$/)) {
            href = "http://www.conquerclub.com/forum/memberlist" + RegExp.$2;
          }
          if(anc[0].href.match(/username=(.+?)$/)) {
            names[player] = (RegExp.$1).replace(/\+/g, " ");
          }
          html += "<a href=\"" + href + "\" title=\"" + anc[0].title + "\" class=\"" + anc[0].className + "\"> <span class=\"player" + (player + 1) + "\"> " + names[player] + " </span></a><br />";
          elim--;
          }
          else{
            html += "<li>Empty</li>";
          }
          player++;
        }
        var ims = getElementsByClassName(div, "img", "thumbnail", true);
        var mu = new RegExp(/maps\/(.+?)\.thumb\.png/);
        if(ims[0].src.match(mu)) {
          image = escape(RegExp.$1);
        }
        var tables = getElementsByClassName(div,'table','listing',true);
        var rows = tables[0].getElementsByTagName('tr');
        var cells = rows[rows.length - 1].getElementsByTagName('td');
        map = cells[2].getElementsByTagName('img')[0].alt;
        gtype = "Game Type:<b>" + cells[1].innerHTML.split("<br>")[0] + "</b><br />" + "Play Order:<b>" + cells[1].innerHTML.split("<br>")[1] + "</b><br />";
        gtype += "Spoils:<b>" + cells[3].innerHTML.split("<br>")[0] + "</b><br />" + "Reinforcements:<b>" + cells[3].innerHTML.split("<br>")[1] + "</b><br />";
        gtype += "Fog of War: <b>" + cells[4].innerHTML + "</b>";
        html = "<div style=\"display:none\" id=\"div" + gameid[gameno] + "\"><span id=\"gtype\">Game: <b>" + gameid[gameno] + "</b><br />" + tournament + "Map: <b>" + map + "</b><br/>Players: <b>" + player + "</b><br />" + gtype + "<li></li><b><li>Awaiting Players</b></span>" + html + "</div>";
      }
      else{
        html = "<div style=\"display:none\" id=\"div" + gameid[gameno] + "\"><span id=\"gtype\">Game: <b>" + gameid[gameno] + "</b><br />" + tournament + "Map: <b>" + map + "</b><br/>Players: <b>" + player + "</b><br />" + gtype + "<li></li><b><li>Awaiting Players</b></span>" + html + "</div>";
      }
      }
      for(p=0;p<divs.length;p++) {
        if(divs[p].id == 'log') {
          var lines = divs[p].innerHTML.split(/<br>|<br \/>/);
          var output = "";
          var border = "";
          if(lines.length > 0) {
           textout[gameno] = "";
           var num= lines.length - 1;
           while(num > 0 && !lines[num].match(/ - <span class="(.+?)"/)) {
             num--;
           }
           var last = (RegExp.$1).split("player")[1];
           var reg = new RegExp(" - <span class=\"" + RegExp.$1 + "\"");
           while( num> 0 && lines[num].match(reg)) {
             if(lines[num].match(myPlayer)) {
               border = "<li style=\"border: 2px solid red\">";
               attacked = 1;
             }
             else{
               border = "<li>";
             }
             textout[gameno] = lines[num].replace(/<span (.+?)>|<\/span>|^(.+?) - /g,'') + "\n" + textout[gameno];
             output = border + lines[num].replace(/^(.+?) - /g,'') + "</li>" + output;
             num--;
           }
           if(names[last - 1] == myPlayer) {
             attacked = 0;
           }
           if(attacked) {
             text += ". You have been attacked!";
           }
           if(cards[last - 1] > -1) {
            if(names[last - 1] == myPlayer) {
              border = "<div style=\"border: 2px solid red\">";
            }
            else{
              border = "<div>";
            }
            output += border + alias[last - 1] + " now has " + cards[last - 1] + " spoils</div><li></li>";
            textout[gameno] += names[last - 1] + " now has " + cards[last - 1] + " spoils";
           }
           output = "<br /><li></li><li><b>Last turn:</b> </li>" + output;
           textout[gameno] = "\nLast turn: \n" + textout[gameno];
          }
          var old = GM_getValue('log' + gameid[gameno]);
          html += output + "</div>";
          if(old == textout[gameno] && classtype != 3 && classtype !=7) {
            classtype = 0;
          }
          update[gameno] = classHover[classtype];
          if(classtype && ((alerts & (1 << (classtype - 1))) || (attacked && (alerts & (1 << 5))))) {
            alerting[gameno] = text;
          }
        }
        else if (divs[p].id == 'chat') {
          if(!classtype) {
            var lines = divs[p].innerHTML.split(/<br>|<br \/>/);
            if(lines.length > 0) {
             var old = GM_getValue('chat' + gameid[gameno]);
             if(typeof(old) != "undefined" && old != lines.length) {
               lengths[gameno] = lines.length;
               update[gameno] = classHover[5];
               if(alerts & (1 << 4)) {
                alerting[gameno] = "\nGame " + gameid[gameno] + ": New game chat";
               }
             }
            }
          }
          break;
        }
      }
      if(/www.conquerclub.com/.test(window.location.host)) {
       var leftBar = document.getElementById("leftColumn");
       if(leftBar) {
       if(document.getElementById('turns')) {
       if(gameid[gameno]){
        var ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px";
        ul.style.display = "none";
        ul.innerHTML = "<li><table width=100% cellspacing=0 cellpadding=0><tr><td class=\"miniblock\"><a href=\"http://www.conquerclub.com/game.php?game=" + gameid[gameno] + "&full_log=Y\"><img alt=\"X\" class=\"miniblock minimap\" width=25 height=17 title=\"Go To Game " + gameid[gameno] + "\" src=\"http://maps.conquerclub.com/" + image + ".thumb.png\"></a></td><td><a style=\"padding:4px 0px\" id=\"show" + gameid[gameno] + "\" href=\"javascript:void(0);\"><span id=\"span" + gameid[gameno] + "\" " + update[gameno] + ">" + strikel + (player - elim) + "/" + player + "p" + round + " " + tourind + striker + "</a></td><td style=\"text-align:center\" class=\"mini\"><a style=\"padding:4px 1px 3px 0px\" href=#box><img title=\"Show Map\" id=box" + gameid[gameno] + " src=\"http://www.conquerclub.com/forum/styles/prosilver/theme/images/icon_search.gif\"></a></td><td style=\"text-align:center\" class=\"mini\"><a style=\"padding:4px 3px\" href=\"javascript:void(0);\"><span title=\"Remove\" class=\"errormsg-inline\" id=\"remove" + gameid[gameno] + "\" ><b>X</b></span></a></td></td></tr></table></li>" + html;
        ul.id = "turnmenuUl" + gameid[gameno];
        sortfn[sortalg](gameno,thistime);
        document.getElementById('perc').innerHTML = (100 * (ingames.length)/(gameid.length)).toFixed(0) + "&#37;";
        if(ingames.length <= document.getElementById('twloading').getElementsByTagName('td').length)
        document.getElementById('twloading').getElementsByTagName('td')[ingames.length - 1].style.background = "blue";
        document.getElementById('turns').insertBefore(ul,document.getElementById('turns').getElementsByTagName('ul')[ingames.indexOf(gameid[gameno]) + options]);
        if(thistime == (3600 * 24)) {
        addListener(document.getElementById('box' + gameid[gameno]), "click" , function () {
          alert("Game Waiting To Begin");
        });
        }
        else{
        addListener(document.getElementById('box' + gameid[gameno]), "click" , function () {
        if(interval) window.clearTimeout(interval);
        popupInfo = new Popup (parseInt(this.id.split('box')[1],10), myPlayer, image, ext, tournament, mtype);
        pingpopup(0);
        });
        }
        addListener(document.getElementById('show' + gameid[gameno]), "click" , function () {
          var dind = parseInt(this.id.split('show')[1],10);
          var gind = gameid.indexOf(dind);
          if(textout[gind]) GM_setValue('log' + dind,textout[gind]);
          if(lengths[gind]) GM_setValue('chat' + dind,lengths[gind]);
          document.getElementById('span' + dind).className = '';
          document.getElementById('div' + dind).style.display=(document.getElementById('div' + dind).style.display == ''? 'none':'');
        });
        addListener(document.getElementById('remove' + gameid[gameno]), "click" , function () {
          var dind = parseInt(this.id.split('remove')[1],10);
          var gind = gameid.indexOf(dind);
          if(!window.confirm('Delete Game ' + dind)) {return false;}
          document.getElementById('turns').removeChild(document.getElementById('turnmenuUl' + dind));
          times.splice(ingames.indexOf(dind), 1);
          ingames.splice(ingames.indexOf(dind), 1);
          gameid.splice(gind, 1);
          alerting.splice(gind, 1);
          tourney.splice(gind,1);
          GM_setValue('turngames', gameid.join(","));
          GM_setValue('alerting',alerting.join(","));
          GM_setValue('tourney', tourney.join(","));
        });
        if(ingames.length == gameid.length) {
          loaded();
        }
       }
       }
       else{
        ingames.push(gameid[gameno]);
        times.push(thistime);
        var ul = leftBar.getElementsByTagName("ul");
        var gmMenu = document.createElement('div');
        gmMenu.id="turns";
        ul[0].parentNode.appendChild(gmMenu);
        var t = document.createElement('h3');
        t.innerHTML = "<b>Turn Watch <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=50592'>" + twversion + "</a></span></b>";
        gmMenu.appendChild(t);
        var ul = document.createElement ('ul');
        ul.style.borderWidth = "1px 1px 0px";
        if(twlatestVersion) {
        ul.innerHTML = "<li><a id=\"twlatest\" href=http://userscripts.org/scripts/source/26003.user.js><span class=\"countdown-alert\">New Update Available</span></a></li>";
        document.getElementById('turns').appendChild(ul);
        }
        else{
          ul.innerHTML = "<li><a id=\"twlatest\" href=http://userscripts.org/scripts/source/26003.user.js><span>Latest Version Installed</span></a></li>";
          document.getElementById('turns').appendChild(ul);
        }
        var ftext = features.join("\n");
        addListener(document.getElementById('twlatest'), "click" , function () {
          alert('New version features\n' + ftext);
        });
        var ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px";
        ul.innerHTML = "<li><a id=\"mark\" href=\"javascript:void(0);\"><span>Mark All As Read</span></a></li>";
        document.getElementById('turns').appendChild(ul);
        var ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px";
        var inner = "<li><a href=\"javascript:void(0);\" onclick=\"document.getElementById('alerts').style.display=(document.getElementById('alerts').style.display == ''? 'none':'');\"><span>Options</span></a></li>";
        inner += "<div id=\"alerts\" style=\"display:none\"><b>Show alert box on</b><br />";
        for(var b=1; b< chkbox.length + 1; b++) {
         inner += "<input id=\"cbox" + b + "\" type=\"checkbox\" value=" + (b-1) + ((alerts & (1 << (b-1))) ? " checked":"") + ">" + chkbox[b-1] + "<br />";
        }
        inner += "<li></li><b>Sort Games By</b><br />";
        for(var u=0; u< sorts.length; u++) {
          inner += "<input id=\"sort" + u + "\" type=radio name=\"sort\" value=" + u + ((sortalg == u)? " checked":"") + ">" + sorts[u] + "<br />";
        }
        inner += "<li></li></div>";
        ul.innerHTML = inner;
        document.getElementById('turns').appendChild(ul);
        for(var s=0; s< sorts.length; s++) {
         addListener(document.getElementById('sort' + s), "click" , function () {
         sortalg = this.value;
         document.getElementById('leftColumn').getElementsByTagName('ul')[0].parentNode.removeChild(document.getElementById('turns'));
         GM_setValue('sort',sortalg);
         getTurns();
         });
        }
        for(var c=1; c< chkbox.length + 1; c++) {
         addListener(document.getElementById('cbox' + c), "click" , function () {
         for (var d=1; d< chkbox.length + 1; d++){
          if (document.getElementById('cbox' + d).checked==true)
           alerts |= 1 << document.getElementById('cbox' + d).value;
          else
           alerts &= ~( 1 << document.getElementById('cbox' + d).value);
         }
         GM_setValue('alerts',alerts);
         });
        }
        if(/game.php\?game=(\d+)/.test(window.location.href)) {
         var newgame = parseInt(RegExp.$1, 10);
         for(var h=0; h<gameid.length; h++) {
           if(newgame == gameid[h]) {
             newgame = -1;
             break;
           }
         }
         if(newgame > -1) {
           var ul = document.createElement ('ul');
           ul.style.borderWidth = "0px 1px";
           ul.innerHTML = "<li><a id=\"add" + newgame + "\" href=\"javascript:void(0);\">Add This Game</a></li>";
           document.getElementById('turns').appendChild(ul);
           addListener(ul, "click" , function () {
            gameid.push(newgame);
            alerting.push("Now watching game " + newgame);
            GM_setValue('turngames', gameid.join(","));
            GM_setValue('alerting',alerting.join(","));
            document.getElementById('turns').removeChild(this);
            options--;
            GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://www.conquerclub.com/player.php?submit=Search&gn=' + newgame,
              headers: {
                  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                  'Accept': 'text/html',
              },
              onload: function(responseDetails) {
               var div=document.createElement('div');
               div.innerHTML = responseDetails.responseText;
               var gamenos = getElementsByClassName(div,'span','gameno',true);
               var tour = previousSib(gamenos[0].parentNode.parentNode);
               if(tour.childNodes[1].colSpan == 7) {
                tourney.push(tour.childNodes[1].firstChild.innerHTML);
               }
               else{
                 tourney.push("");
               }
               GM_setValue('tourney', tourney.join(","));
               details(gameid.length - 1);
              }
            });
            });
         }
        }
        var ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px";
        var loading = "<li><a href=\"javascript:void(0);\">Loading Games <span id=\"perc\">0%</span><br /><table width=100% cellspacing=0 cellpadding=0><tr id=\"twloading\">";
        for(var ld=0; ld<gameid.length;ld++) {
          loading += "<td style=\"background-color:#cdc\">&nbsp;</td>";
        }
        ul.innerHTML = loading + "</tr></table></a></li>";
        ul.id = "collect";
        document.getElementById('turns').appendChild(ul);
        document.getElementById('perc').innerHTML = (100/(gameid.length)).toFixed(0) + "&#37;";
        document.getElementById('twloading').getElementsByTagName('td')[0].style.background = "blue";
        if(gameid[gameno]){
         var ul = document.createElement ('ul');
         ul.style.borderWidth = "0px 1px";
         ul.style.display = "none";
        ul.innerHTML = "<li><table width=100% cellspacing=0 cellpadding=0><tr><td class=\"miniblock\"><a href=\"http://www.conquerclub.com/game.php?game=" + gameid[gameno] + "&full_log=Y\"><img alt=\"X\" class=\"miniblock minimap\" width=25 height=17 title=\"Go To Game " + gameid[gameno] + "\" src=\"http://maps.conquerclub.com/" + image + ".thumb.png\"></a></td><td><a style=\"padding:4px 0px\" id=\"show" + gameid[gameno] + "\" href=\"javascript:void(0);\"><span id=\"span" + gameid[gameno] + "\" " + update[gameno] + ">" + strikel + (player - elim) + "/" + player + "p" + round + " " + tourind + striker + "</a></td><td style=\"text-align:center\" class=\"mini\"><a style=\"padding:4px 1px 3px 0px\" href=#box><img title=\"Show Map\" id=box" + gameid[gameno] + " src=\"http://www.conquerclub.com/forum/styles/prosilver/theme/images/icon_search.gif\"></a></td><td style=\"text-align:center\" class=\"mini\"><a style=\"padding:4px 3px\" href=\"javascript:void(0);\"><span title=\"Remove\" class=\"errormsg-inline\" id=\"remove" + gameid[gameno] + "\" ><b>X</b></span></a></td></td></tr></table></li>" + html;
         ul.id = "turnmenuUl" + gameid[gameno];
         gmMenu.appendChild(ul);
        if(thistime == (3600 * 24)) {
        addListener(document.getElementById('box' + gameid[gameno]), "click" , function () {
          alert("Game Waiting To Begin");
        });
        }
        else{
        addListener(document.getElementById('box' + gameid[gameno]), "click" , function () {
        if(interval) window.clearTimeout(interval);
        popupInfo = new Popup (parseInt(this.id.split('box')[1],10), myPlayer, image, ext, tournament, mtype);
        pingpopup(0);
        });
        }
        addListener(document.getElementById('show' + gameid[gameno]), "click" , function () {
          var dind = parseInt(this.id.split('show')[1],10);
          var gind = gameid.indexOf(dind);
          if(textout[gind]) GM_setValue('log' + dind,textout[gind]);
          if(lengths[gind]) GM_setValue('chat' + dind,lengths[gind]);
          document.getElementById('span' + dind).className = '';
          document.getElementById('div' + dind).style.display=(document.getElementById('div' + dind).style.display == ''? 'none':'');
        });
        addListener(document.getElementById('remove' + gameid[gameno]), "click" , function () {
          var dind = parseInt(this.id.split('remove')[1],10);
          var gind = gameid.indexOf(dind);
          if(!window.confirm('Delete Game ' + dind)) {return false;}
          document.getElementById('turns').removeChild(document.getElementById('turnmenuUl' + dind));
          times.splice(ingames.indexOf(dind), 1);
          ingames.splice(ingames.indexOf(dind), 1);
          gameid.splice(gind, 1);
          alerting.splice(gind, 1);
          tourney.splice(gind,1);
          GM_setValue('turngames', gameid.join(","));
          GM_setValue('alerting',alerting.join(","));
          GM_setValue('tourney', tourney.join(","));
        });
        }
        options = document.getElementById('turns').getElementsByTagName('ul').length - 1;
        if(/player.php\?mode=find/.test(window.location.href) || /player.php\?mode=mygames/.test(window.location.href) ||
           /player.php\?submit=Search/.test(window.location.href)) {
          var addgames = getElementsByClassName(document,'span','gameno',true);
          for(var a=0; a< addgames.length; a++) {
            if(gameid.indexOf(parseInt(addgames[a].innerHTML,10)) == -1) {
              var thisnum = parseInt(addgames[a].innerHTML,10);
              if(!document.getElementById('gadd' + thisnum)) {
               var gadd = document.createElement('a');
               gadd.href = "javascript:void(0);";
               gadd.id = "gadd" + thisnum;
               gadd.innerHTML = "Turn Watch";
               addgames[a].parentNode.appendChild(document.createElement('br'));
               addgames[a].parentNode.appendChild(document.createElement('br'));
               addgames[a].parentNode.appendChild(gadd);
               addListener(gadd, "click" , function () {
               gameid.push(this.id.split('gadd')[1]);
               alerting.push("Now watching game " + this.id.split('gadd')[1]);
               var tour = previousSib(this.parentNode.parentNode);
               if(tour.childNodes[1].colSpan == 7) {
                tourney.push(tour.childNodes[1].firstChild.innerHTML);
               }
               else{
                 tourney.push("");
               }
               GM_setValue('tourney', tourney.join(","));
               GM_setValue('turngames', gameid.join(","));
               GM_setValue('alerting',alerting.join(","));
               this.parentNode.removeChild(this);
               details(gameid.length - 1);
               });
              }
            }
          }
        }
        if(ingames.length == gameid.length) {
          loaded();
        }
       }
       }
      }
    div = null;
  }
}
gameReq[gameno].send(null);
}
