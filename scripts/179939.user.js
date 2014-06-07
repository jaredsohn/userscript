// ==UserScript==
// @name          Conquer Club Map Rank GL temp fix by dgz345
// @namespace     http://userscripts.org/
// @version       1.5.6
// @description   Polymorphic temp bug fix by dgz345
// @include       http://*.conquerclub.com/*
// @include       https://*.conquerclub.com/*
// ==/UserScript==

var versiont = GM_info.script.version;
var latestVersiont = 0;
var __eventListeners = [];
var ranks = {};
var updateInfo = {};
var maps = [];
var unique = {};
var totals, myOptions, myStore;
var cid = 0;
var viewer = null;
var ghist = [];
var rateReq = [];
var xrateReq = [];
var current = -1;
var suggtot = 0;
var phist = "";
var loadedName = "";
var icons = 0;
var ratings = 0;
var dark = 0;
var pcount = 0;
var sortable = ["smap","spts","swin","suni","skil", "srel"];
var graphTypes = {
  'points' : new GraphType("Points","point gain/loss",pointsalg,1000, "red",null,null) ,
  'winloss' : new GraphType("Win/Loss %","win/loss",winlossalg,0, "green(win) and red(loss)",100,0)
};
var gm = {
  standard : 'S',
  terminator : 'C',
  assassin: 'A',
  doubles: 'D',
  triples : 'T',
  quadruples : 'Q',
  polymorphic : 'P'
};
function findKeyByValue(object, value) {
  for (var key in object) {
    if (object[key] == value) {
      return key;
    }
  }
  return undefined;
};
var modulo = {
  'D' : 2,
  'T' : 3,
  'Q' : 4
};
var medlev = {
  'standard' : [0,20,100,400,1000],
  'crossmap' : [0,20,40,60,200],
  'rating' : [0,40,200,500,1500]
};
var medname = ["0", "Bronze (1)", "Silver (2)", "Gold (3)","Platinum (4)"];
var medclass = ["nomedal", "bmedal", "smedal", "gmedal","pmedal", "omedal"];
var meddivclass = ["nomeddiv", "bmeddiv", "smeddiv", "gmeddiv", "pmeddiv", "omeddiv"];
var medcombo = ["manual", "freestyle", "fog", "speed", "crossmap", "nuclear"];
var medcombourl = ["&it=M", "&po=F", "&wf=Y", "&tw=Y" , "&sg=Y", "", "&bc=4"];
var medmatrix = []; // all possible combinations to get medals.
for (var i = 0; i < medcombo.length; i++) {
  for (var j = 0, length = medmatrix.length; j < length; j++) {
    var temp = medmatrix[j].slice(0);
    temp.push(i);
    medmatrix.push(temp);
  }
  medmatrix.push([i]);
}
medmatrix.sort(function(a,b) { // longest first
  return b.length - a.length;
});
var slider;
var sarray;
var baseURL = window.location.protocol + "//www.conquerclub.com/";
var surl = "";
var lastLog = new Date();
lastLog.setFullYear(2008,1,13);
var lastTime = lastLog.getTime();

function Point(time, points) {
  this._time = time;
  this._points = points;
}

function Rank() {
  this._wins = 0;
  this._rank = 0;
  this._counter = 0;
  this._firsts = 0;
  this._wonfirsts = 0;
  this._missing = 0;
  this._games = [];
  this._parray = [];
  this._warray = [];
  this._kills = 0;
  this._meanwin = 0;
  this._beaten = 0;
  this._defeats = new Defeats();
}

function Store() {
  this._ranks = {};
  this._unique = {};
  this._date = new Date();
  this._total = 0;
}

function Totals(insignia) {
  this._insignia = insignia;
  this._points = 0;
  this._maps = 0;
  this._unique = [];
  this._crossmap = [];
  this._crossmaps = 0;
  this._wins = 0;
  this._pages = 0;
  this._rpages = 0;
  this._expected = 0;
  this._games = 0;
  this._kills = 0;
  this._meanwin = 0;
  this._beaten = 0;
  this._firsts = 0;
  this._wonfirsts = 0;
  this._missing = 0;
  this._realscore = null;
  this._parray = [];
  this._warray = [];
  this._sorted = [];
  this._contribute = [];
  this._medals = 0;
  this._xmedals = 0;
  this._counter = 0;
  this._types = [];
  this._defeats = new Defeats();
}

function pushUnique(array, value) {
  if (array.indexOf(value) == -1) {
    array.push(value);
  }
}

function Defeats() {
  this.standard = [];
  this.terminator = [];
  this.assassin = [];
  this.doubles = [];
  this.triples = [];
  this.quadruples = [];
  this.polymorphic = [];
  this.speed = [];
  this.manual = [];
  this.fog = [];
  this.trench = [];
  this.freestyle = [];
  this.nuclear = [];
  this.random = [];  
  this.rating = [];  
  this.xStandard = [];
  this.xTerminator = [];
  this.xAssassin = [];
  this.xDoubles = [];
  this.xTriples = [];
  this.xQuadruples = [];
  this.xPolymorphic = [];
  this.xSpeed = [];
  this.xManual = [];
  this.xFog = [];
  this.xTrench = [];
  this.xFreestyle = [];  
  this.xNuclear = []; 
  this.xRandom = [];
  this.xRating = [];  
}

function Summary(name) {
  this._medal = name;
  this._current = 0;
  this._next = 0;
  this._medals = 0;
  this._best = [];
}

function Pinfo() {
  this._defeats = {};
}

function GraphType(type,info,alg,initial,markers,maxbound,minbound) {
  this._type = type;
  this._info = info;
  this._markers = markers;
  this._running = function(array) {
    return(alg(array));
  };
  this._initial = initial;
  this._maxbound = maxbound;
  this._minbound = minbound;
}

function Streak() {
  this._start = 0;
  this._num = 0;
}

function PointInfo(data, colour) {
  this._data = [];
  this._colour = [];
  this._winstreak = new Streak();
  this._losstreak = new Streak();
}

function Slide(length,to,parray) {
  this._pxLen = length;
  this._scale = to / length;
  this._toVal = to;
  this._parray = parray;
}

function MapOpts(player2, num, type, bonus, order, fort, fog, trench, joinable, speed, tname, versus, versus2, ex1, ex2, player3,player4,versus3,versus4,ex3,ex4,troops) {
  this._pcount = 0;
  this._players = {
    p2: player2,
    p3: player3,
    p4: player4,
    v1: versus,
    v2: versus2,
    v3: versus3,
    v4: versus4,
    x1: ex1,
    x2: ex2,
    x3: ex3,
    x4: ex4
  };
  for (var i in this._players) {
    if (this._players[i]) {
      this._pcount++;
    }
  }
  this._num = num;
  this._type = type;
  this._bonus = bonus;
  this._order = order;
  this._troops = troops;
  this._fort = fort;
  this._fog = fog;
  this._trench = trench;
  this._joinable = joinable;
  this._speed = speed;
  this._tname = tname;
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

function setThumbnails(opts) {
  var thumbs = '';
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].selected) {
      var map_status = (unsafeWindow.mapStatuses[i] == 'B') ? 'http://static.conquerclub.com/map_beta.png' : 'http://static.conquerclub.com/map_normal.png';
      thumbs += ' <a href="http://maps.conquerclub.com/' + unsafeWindow.mapFiles[i] + '" rel="lightbox" title="' + unsafeWindow.mapTitles[i] + ',' + unsafeWindow.mapTopics[i] + '"><img style="background-image:url(http://maps.conquerclub.com/'+ unsafeWindow.mapThumbs[i] + ')" src="' + map_status + '" width="50" height="34" alt="' + unsafeWindow.mapTitles[i] + '" title="' + unsafeWindow.mapTitles[i] + '" /></a>';
    }
  }
  unsafeWindow.map_thumbs.innerHTML = thumbs;
  unsafeWindow.initLightbox();
}

function pointsalg(array) {
  var counter = 1000;
  var running = new PointInfo();
  for (var f=0; f< array.length; f++) {
    counter += array[f]._points;
    running._data.push(counter);
    if (array[f]._points < 0) running._colour.push("red");
    else running._colour.push("green");
  }
  return running;
}

function winlossalg(array) {
  var counter = 0;
  var winstreak = new Streak();
  var losstreak = new Streak();
  var running = new PointInfo();
  if (array[0]._points == 1) {
    counter += array[0]._points;
    running._colour.push("green");
    winstreak._num++;
  } else {
    running._colour.push("red");
    losstreak._num++;
  }
  running._data.push(100 * counter);
  for (var f=1; f< array.length; f++) {
    if (array[f]._points == 1) {
      counter += array[f]._points;
      if (array[f - 1]._points == -1) {
        if (losstreak._num > running._losstreak._num) {
          running._losstreak._start = losstreak._start;
          running._losstreak._num = losstreak._num;
        }
        winstreak._start = f;
        winstreak._num = 0;
      }
      winstreak._num++;
      running._colour.push("green");
    }
    else{
      if (array[f - 1]._points == 1) {
        if (winstreak._num > running._winstreak._num) {
          running._winstreak._start = winstreak._start;
          running._winstreak._num = winstreak._num;
        }
        losstreak._start = f;
        losstreak._num = 0;
      }
      losstreak._num++;
      running._colour.push("red");
    }
    running._data.push((100 * counter / (f+1)).toFixed(0));
  }
  if (array[f - 1]._points == -1) {
    if (losstreak._num > running._losstreak._num) {
      running._losstreak._start = losstreak._start;
      running._losstreak._num = losstreak._num;
    }
  }
  else if (array[f - 1]._points == 1) {
    if (winstreak._num > running._winstreak._num) {
      running._winstreak._start = winstreak._start;
      running._winstreak._num = winstreak._num;
    }
  }

  return running;
}

function cascadewin(pinfoarray, name) {
    
  if (!pinfoarray[name]) return 0;
  var retVal = 0;  
  for (var x in pinfoarray[name]._defeats) {
    retVal += pinfoarray[name]._defeats[x] + (pinfoarray[name]._defeats[x] * cascadewin(pinfoarray,x));
  }
  return retVal;
}

function cascadeloss(pinfoarray, name) {
  if (!pinfoarray[name]) return 1;
  var retVal;
  for (var x in pinfoarray[name]._defeats) {
    retVal = pinfoarray[name]._defeats[x] * cascadeloss(pinfoarray,x);
  }
  return retVal;
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

function setTable() {
  var rws = viewer.document.getElementById('ranktable').getElementsByTagName('tr');
  var cross = totals._crossmaps;
  if (cross >= 200) {
    cross = "pmedal";
  }  
  else if (cross >= 60) {
    cross = "gmedal";
  }
  else if (cross >= 40) {
    cross = "smedal";
  }
  else if (cross >= 20) {
    cross = "bmedal";
  }

  var cwidth = totals._maps < 25 ? "noflow" : "";
  for (var r=0; r<rws.length; r++) {
    var td = rws[r].getElementsByTagName('td');
    var c = (r&1) ? "mrodd": "mreven";
    for (var t=0; t<td.length; t++) {
      td[t].className = c;
    }
    td[td.length - 1].className += " " + cwidth;
  }
  for (var cr=0; cr<totals._crossmap.length; cr++) {
    if (totals._crossmap[cr]) {
      viewer.document.getElementById('result' + cr).className += " " + cross;
    }
  }
  viewer.document.getElementById('wtot').className = "chart";
  viewer.document.getElementById('wtot').title = "Totals Win/Loss Chart";
  addListener(viewer.document.getElementById('wtot'),'click', function() {
    slider = new Slide(200, totals._warray.length - 1, totals._warray);
    graph(totals, "_warray",0,totals._warray.length - 1, "Totals", graphTypes['winloss']);
  });
  for (var v in ranks) {
    if (ranks[v] && ranks[v]._counter) {
      viewer.document.getElementById('wtot' + maps.indexOf(v)).className = "chart";
      viewer.document.getElementById('wtot' + maps.indexOf(v)).title = v + " Win/Loss Chart";
      addListener(viewer.document.getElementById('wtot' + maps.indexOf(v)),'click', function() {
        var tid = this.id.split('wtot')[1];
        slider = new Slide(200, ranks[maps[tid]]._warray.length - 1, ranks[maps[tid]]._warray);
        graph(ranks[maps[tid]] , "_warray", 0,ranks[maps[tid]]._warray.length - 1,maps[tid], graphTypes['winloss']);
      });
    }
  }
  viewer.document.getElementById('gtot').className = "chart";
  viewer.document.getElementById('gtot').title = "Totals Points Chart";
  addListener(viewer.document.getElementById('gtot'),'click', function() {
    slider = new Slide(200, totals._parray.length - 1, totals._parray);
    graph(totals, "_parray",0,totals._parray.length - 1, "Totals", graphTypes['points']);
  });
  for (var v in ranks) {
    if (ranks[v] && ranks[v]._counter) {
      viewer.document.getElementById('gtot' + maps.indexOf(v)).className = "chart";
      viewer.document.getElementById('gtot' + maps.indexOf(v)).title = v + " Points Chart";
      addListener(viewer.document.getElementById('gtot' + maps.indexOf(v)),'click', function() {
        var tid = this.id.split('gtot')[1];
        slider = new Slide(200, ranks[maps[tid]]._parray.length - 1,ranks[maps[tid]]._parray);
        graph(ranks[maps[tid]], "_parray",0,ranks[maps[tid]]._parray.length - 1,maps[tid], graphTypes['points']);
      });
    }
  }
  addListener(viewer.document.getElementById('smap'),'click', function() {
    sortByCol('smap',alpha, 0, viewer.document.getElementById('smap').className);
  });
  addListener(viewer.document.getElementById('spts'),'click', function() {
    sortByCol('spts',numerical, 2, viewer.document.getElementById('spts').className);
  });
  addListener(viewer.document.getElementById('skil'),'click', function() {
    sortByCol('skil',percent, 5, viewer.document.getElementById('skil').className);
  });
  addListener(viewer.document.getElementById('srel'),'click', function() {
    sortByCol('srel',factor, 7, viewer.document.getElementById('srel').className);
  });
  addListener(viewer.document.getElementById('swin'),'click', function() {
    sortByCol('swin',percent, 3, viewer.document.getElementById('swin').className);
  });
  addListener(viewer.document.getElementById('suni'),'click', function() {
    sortByCol('suni',numerical, 4, viewer.document.getElementById('suni').className);
  });
}

function sortCombo(a,b) {
  return(b._best.length - a._best.length);
}

function endGame(user) {
  var unplayed = [];
  var played = [];
  var mwon = [];
  var mlost = [];
  var mu = [];
  var mnu = [];
  var pos = [];
  var neg = [];
  var freq = [];
  var nfreq = [];
  var miss = [];
  var summary = [];
  var pm = [];
  var nm;

  for (var s in totals._defeats) {
    if (s.charAt(0) != 'x') {
      if (ratings || s!= 'rating') {
        var sm = new Summary(s);
        sm._current = totals._defeats[s].length;
        if (medlev[s]) {
          for (var e=0; e< medlev[s].length; e++) {
            if (sm._current >= medlev[s][e]) sm._medals = e;
            else{
              sm._next = medlev[s][e] - sm._current;
              break;
            }
          }
        }
        else{
          for (var e=0; e< medlev.standard.length; e++) {
            if (sm._current >= medlev.standard[e]) sm._medals = e;
            else{
              sm._next = medlev.standard[e] - sm._current;
              break;
            }
          }
        }
        totals._medals += sm._medals;
        var best = [];
        if (sm._current) {
          for (var j in ranks) {
            if (ranks[j]._defeats[s] && s!= 'rating') {
              if (ranks[j]._defeats[s].length > sm._best) {
                sm._best = ranks[j]._defeats[s].length;
                best = [];
                best.push(j);
              }
              else if (ranks[j]._defeats[s].length == sm._best) best.push(j);
            }
          }
        }
        sm._best = best;
        summary.push(sm);
        if (s == 'speed' || s == 'fog' || s == 'trench' || s == 'freestyle' || s == 'manual' || s == 'nuclear') pm[s] = sm;
      }
    }
  }
  for (var m in ranks) {
    if (ranks[m]._rank >= 1000) {
      srank = "+" + (ranks[m]._rank - 1000);
      pos.push(m);
    }
    else {
      srank = ranks[m]._rank - 1000;
      neg.push(m);
    }
    totals._points += ranks[m]._rank - 1000;
    var tr = viewer.document.createElement('tr');
    totals._sorted.push(m);
    totals._sorted.sort();
    viewer.document.getElementById('ranktable').insertBefore(tr,viewer.document.getElementById('ranktable').getElementsByTagName('tr')[totals._sorted.indexOf(m)]);
    tr.className = "result";
    if (unique[m].length >= 5) {
      totals._crossmap[maps.indexOf(m)] = 1;
      totals._crossmaps++;
      mu.push(m);
    }
    else{
      totals._crossmap[maps.indexOf(m)] = 0;
      mnu.push(m);
    }
    if (ranks[m]._missing) {
      missing = "<sup>" + ranks[m]._missing + "</sup>";
      totals._missing += ranks[m]._missing;
    }
    else missing = "";
    var td = viewer.document.createElement('td');
    td.id = "gtot" + maps.indexOf(m);
    td.innerHTML = m + missing;
    tr.appendChild(td);
    td = viewer.document.createElement('td');
    td.innerHTML = '' + getRank(250, ranks[m]._rank) + nextRank(ranks[m]._rank);
    tr.appendChild(td);
    td = viewer.document.createElement('td');
    td.innerHTML = '' + srank;
    tr.appendChild(td);
    td = viewer.document.createElement('td');
    td.id = "wtot" + maps.indexOf(m);
    td.innerHTML = ranks[m]._wins + " from " + ranks[m]._counter + "(" + (100 * (ranks[m]._wins)/(ranks[m]._counter)).toFixed(0) + "%)";
    tr.appendChild(td);
    td = viewer.document.createElement('td');
    td.id = "result" + maps.indexOf(m);
    td.innerHTML = '' + unique[m].length;
    tr.appendChild(td);
    td = viewer.document.createElement('td');
    td.innerHTML = '' + getKiller(ranks[m]._counter - ranks[m]._wins,ranks[m]._kills);
    tr.appendChild(td);
    td = viewer.document.createElement('td');
    td.innerHTML = '' + getRelative(ranks[m]._meanwin,ranks[m]._beaten);
    tr.appendChild(td);
    if (ranks[m]._wins) mwon.push(m);
    else mlost.push(m);
    if (ranks[m]._counter >= 5) freq.push(m);
    else nfreq.push(m);
    for (var ms =0; ms<ranks[m]._games.length; ms++) {
      miss.push("<a target=\"_blank\" href=" + baseURL + "game.php?game=" + ranks[m]._games[ms] + ">Game " + ranks[m]._games[ms] + "</a>");
    }
    viewer.document.getElementById('progress').innerHTML = "Scanned " + user + " on " + m;
  }
  var cm = new Summary('crossmap');
  cm._current = totals._crossmaps;
  for (var e=0; e< medlev['crossmap'].length; e++) {
    if (cm._current >= medlev['crossmap'][e]) cm._medals = e;
    else{
      cm._next = medlev['crossmap'][e] - cm._current;
      break;
    }
  }
  totals._medals += cm._medals;
  var best = [];
  if (totals._crossmaps) {
    for (var j in ranks) {
      if (unique[j] && unique[j].length < 5){
        if (unique[j].length > cm._best) {
          cm._best = unique[j].length;
          best = [];
          best.push(j);
        }
        else if (unique[j].length == cm._best) best.push(j);
      }
    }
  }
  cm._best = best;
  summary.push(cm);
  summary.sort(ssort);
  var medal = totals._unique.length;
  if (medal >= 1000) {
    medal = "<span class=pmedal>" + medal + "</span>";
  }
  else if (medal >= 400) {
    medal = "<span class=gmedal>" + medal + "</span>";
  }
  else if (medal >= 100) {
    medal = "<span class=smedal>" + medal + "</span>";
  } else if (medal >= 20) {
    medal = "<span class=bmedal>" + medal + "</span>";
  } else {
    medal = "<span>" + medal + "</span>";
  }
  var cross = medclass[cm._medals];


  var firstLog=new Date();
  firstLog.setFullYear(2008,1,6);
  var firstTime = firstLog.getTime();
  var runningscore = 0;
  var dummyscore = 0;
  var hiscore = 0;
  var hitime = 0;
  harray = totals["_parray"];
  harray.sort(psort);
  for (var t=0; t<harray.length;t++) {
    runningscore += harray[t]._points;
    if (runningscore > hiscore) {
      hiscore = runningscore;
    }
    if (totals._realscore != null) {
      if (harray[t]._time > lastTime) {
        if (runningscore + totals._realscore - totals._points - 1000 > dummyscore) {
          dummyscore = runningscore + totals._realscore - totals._points - 1000;
          hitime = harray[t]._time;
        }
      }
      if (harray[t]._time < firstTime){
        if (runningscore > dummyscore) {
          dummyscore = runningscore;
          hitime = harray[t]._time;
        }
      }
    }
  }

  if (totals._points >= 0) trank = "+" + (totals._points);
  else trank = totals._points;
  if (totals._realscore != null) trank = totals._realscore;
  if (totals._missing) missing = "<sup>" + totals._missing + "</sup>";
  else missing = "";
  var tds = viewer.document.getElementById('summary').getElementsByTagName('td');
  tds[0].id = "gtot";
  tds[0].innerHTML = "<b>Totals" + missing + "</b>";
  if (totals._realscore != null) {
    tds[1].innerHTML = '' + getRank(totals._games, totals._realscore) + nextRank(totals._realscore);
  } else {
    tds[1].innerHTML = '' + getRank(totals._games, totals._points + 1000) + nextRank(totals._points + 1000);
  }
  tds[2].innerHTML = '' + trank;
  tds[3].id = "wtot";
  tds[3].innerHTML = totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)";
  tds[4].innerHTML = '' + medal + " (<span class=" + cross + ">" + totals._crossmaps + "</span>)";
  tds[5].innerHTML = '' + getKiller(totals._games - totals._wins,totals._kills);
  tds[6].innerHTML = '' + getRelative(totals._meanwin,totals._beaten);
  for (var d=0; d<maps.length-1; d++) {
    if (!ranks[maps[d]]) unplayed.push(maps[d]);
    else played.push(maps[d]);
  }
  var x = "<table width=100% cellspacing=0 cellpadding=0 align=center>";
  x+= "<thead class=fixedHeader><tr><td><b>Medal Summary For " + user + "</b></td></tr></thead>";
  x+= "<tbody class=scrollContent><tr><td>Medal Name</td><td>Number of Medals</td><td>Defeats</td><td>Next Medal</td><td>Maps</td></tr>";
  x+= "<tr><td colspan=5 class=summ><b>Game Achievements: " + (totals._medals -  totals._xmedals) + " Medals</b></td></tr>";
  var base = baseURL + "player.php?submit=Search&gs=W&pt=N";
  for (var y=0; y<summary.length;y++) {
    var href = base;
    if (!nm) {
      if (summary[y]._medals < 3 && summary[y]._medal != 'crossmap' && summary[y]._medal != 'Speed' && summary[y]._medal != 'Fog' && summary[y]._medal != 'Trench' && summary[y]._medal != 'Freestyle' && summary[y]._medal != 'Manual' && summary[y]._medal != 'Nuclear' && summary[y]._medal != 'Rating') {
        nm = summary[y];
      }
    }
    if (gm[summary[y]._medal]) href+= "&amp;gt=" + gm[summary[y]._medal];
    else if (summary[y]._medal == 'Speed')href+= "&sg=Y";
    else if (summary[y]._medal == 'Fog')href+= "&wf=Y";    
    else if (summary[y]._medal == 'Freestyle')href+= "&po=F";
    else if (summary[y]._medal == 'Manual')href+= "&it=M";
    else if (summary[y]._medal == 'Nuclear')href+= "&bc=4";
    else if (summary[y]._medal == 'Trench')href+= "&tw=Y";
    var mids = [];
    for (cnv=0; cnv<summary[y]._best.length; cnv++) {
      mids.push(maps.indexOf(summary[y]._best[cnv]) + 1);
    }
    href+= "&mp=" + mids;
    if (summary[y]._medal != 'Rating' && summary[y]._medal != 'random') {
      x+= "<tr><td><a title=\"Find Best " + summary[y]._medal + " Games\" onclick='e.preventdefault();var wdw=window.open(\"" + href + "\", \"mrsugg\");wdw.focus();'>" + summary[y]._medal + "</a></td>";
    }
    else x+= "<tr><td>" + summary[y]._medal + "</td>";
    x+= "<td class=" + medclass[summary[y]._medals] + ">" + medname[summary[y]._medals] + "</td>";
    x+= "<td>" + summary[y]._current + "</td><td>" + summary[y]._next + "</td>";
    if (summary[y]._medal == 'Rating' || summary[y]._medal == 'random') x+= "<td>-</td></tr>";
    else if (summary[y]._best.length == 0) x+= "<td>None</td></tr>";
    else if (summary[y]._medal == 'crossmap') {
      x+= "<td>" + summary[y]._best + " (" + unique[summary[y]._best[0]].length + ")</td></tr>";
    }
    else x+= "<td>" + summary[y]._best + "</td></tr>";
  }
  if (totals._contribute.length) x+= "<tr><td colspan=5 class=summ><b>Contributions: " + totals._xmedals + " Medals</b></td></tr>";
  for (var y=0; y< totals._contribute.length;y++) {
    x+= "<tr><td>" + totals._contribute[y]._medal + "</td><td class=" + medclass[5] + ">" + totals._contribute[y]._medals + "</td>";
    x+= "<td>-</td><td>-</td><td>-</td></tr>";
  }
  x+= "<tr><td colspan=5 class=summ><b>Total Medals Won: " + totals._medals + "</b></td></tr>";
  var comboleft = 0;
  for (var p in pm) {
    if (pm[p]._medals < 3) comboleft++;
  }
  if (cm._medals < 3 || comboleft) {
    x+= "<tr><td colspan=5 class=banner><b>Optimal Medal Combinations</b></td></tr>";
    x+= "<tr><td>Medals</td><td colspan=4>Maps</td></tr>";
    if (nm){
      var hrefbase = base + "&amp;gt=" + gm[nm._medal];
      var optimalrows = [];
      var optimaltext = [];
      for (var mat=0; mat<medmatrix.length;mat++) {
        var assoc = [];
        var optimalkey = medmatrix[mat].join(',');
        var exturl = "";
        optimaltext[optimalkey] = "";
        for (var step=0; step<medmatrix[mat].length; step++){
          assoc.push(medcombo[medmatrix[mat][step]]);
          exturl += medcombourl[medmatrix[mat][step]];
          optimaltext[optimalkey] += medcombo[medmatrix[mat][step]] + ",";
        }
        optimalrows[optimalkey] = "<tr><td><a title='Find " + assoc.join(" ") + " " + nm._medal + " Games' onclick='e.preventDefault();var wdw=window.open(\"" + hrefbase + exturl + "&mp=";
      }

      var mps = {};
      mps[nm._medal] = [];
      mps['crossmap'] = [];
      for (var md=0; md< medcombo.length; md++) {
        mps[medcombo[md]] = [];
      }

      if (nm._best.length) {
        for (cnv=0; cnv<nm._best.length; cnv++) {
          mps[nm._medal].push(maps.indexOf(nm._best[cnv]) + 1);
        }
      }

      if (cm._medals < 3) {
        if (cm._best.length) {
          for (cnv=0; cnv<cm._best.length; cnv++) {
            mps['crossmap'].push(maps.indexOf(cm._best[cnv]) + 1);
          }
        }
      }

      for (var p in pm) {
        if (pm[p]._medals < 3) {
          if (pm[p]._best.length) {
            for (cnv=0; cnv<pm[p]._best.length; cnv++) {
			  if (pm[p]._medal != "trench") {
				mps[pm[p]._medal].push(maps.indexOf(pm[p]._best[cnv]) + 1);
			  }
            }
          }
        }
      }
      for (var mat=0; mat<medmatrix.length;mat++) {
        var optimalkey = medmatrix[mat].join(',');
        var combos = [];
        var show = 1;
        for (var step=0; step<medmatrix[mat].length; step++){
          if (medcombo[medmatrix[mat][step]] != "crossmap" && pm[medcombo[medmatrix[mat][step]]]._medals > 2) {
            show = 0;
            break;
          }
          combos.push(pm[medcombo[medmatrix[mat][step]]]);
        }
        if (show) {
          if (medmatrix[mat].indexOf(4) != -1) {
            if (cm._medals < 3) {
              if (cm._best.length) x+= optimalrows[optimalkey] + mps['crossmap'] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey] + nm._medal + "</a></td><td colspan=4>" + cm._best + "</td></tr>";
              else{
                var noWins = [];
                var noWinsText = [];
                for (var un in ranks) {
                  if (!unique[un]) {
                    noWins.push(maps.indexOf(un));
                    noWinsText.push(un);
                  }
                }
                if (noWins.length) x+= optimalrows[optimalkey] + noWins + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey] + nm._medal + "</a></td><td colspan=4>" + noWins + "</td></tr>";
              }
            }
          }
          else{
            combos.sort(sortCombo);
            if (combos[0]._best.length) x+= optimalrows[optimalkey] + mps[combos[0]._medal] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey] + nm._medal + "</a></td><td colspan=4>" + combos[0]._best + "</td></tr>";
            else if (nm._best.length) x+= optimalrows[optimalkey] + mps[nm._medal] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey] + nm._medal + "</a></td><td colspan=4>" + nm._best + "</td></tr>";
            else x+= optimalrows[optimalkey] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey] + nm._medal + "</a></td><td colspan=4>-</td></tr>";
          }
        }
      }    
    }
    else{
      var hrefbase = base;
      var optimalrows = [];
      var optimaltext = [];
      for (var mat=0; mat<medmatrix.length;mat++) {
        var assoc = [];
        var optimalkey = medmatrix[mat].join(',');
        var exturl = "";
        optimaltext[optimalkey] = "";
        for (var step=0; step<medmatrix[mat].length; step++){
          assoc.push(medcombo[medmatrix[mat][step]]);
          exturl += medcombourl[medmatrix[mat][step]];
          optimaltext[optimalkey] += medcombo[medmatrix[mat][step]] + ",";
        }
        optimalrows[optimalkey] = "<tr><td><a title='Find " + assoc.join(" ") + " Games' onclick='e.preventDefault();var wdw=window.open(\"" + hrefbase + exturl + "&mp=";
      }

      var mps = [];
      mps['crossmap'] = [];
      for (var md=0; md< medcombo.length; md++) {
        mps[medcombo[md]] = [];
      }

      if (cm._medals < 3) {
        if (cm._best.length) {
          for (cnv=0; cnv<cm._best.length; cnv++) {
            mps['crossmap'].push(maps.indexOf(cm._best[cnv]) + 1);
          }
        }
      }
      for (var p in pm) {
        if (pm[p]._medals < 3) {
          if (pm[p]._best.length) {
            for (cnv=0; cnv<pm[p]._best.length; cnv++) {
			  if (pm[p]._medal != 'trench') {
				mps[pm[p]._medal].push(maps.indexOf(pm[p]._best[cnv]) + 1);
			  }
            }
          }
        }
      }
      for (var mat=0; mat<medmatrix.length;mat++) {
        var optimalkey = medmatrix[mat].join(',');
        var combos = [];
        var show = 1;
        for (var step=0; step<medmatrix[mat].length; step++){
          if (medcombo[medmatrix[mat][step]] != "crossmap" && pm[medcombo[medmatrix[mat][step]]]._medals > 2) {
            show = 0;
            break;
          }
          combos.push(pm[medcombo[medmatrix[mat][step]]]);
        }
        if (show) {
          if (medmatrix[mat].indexOf(4) != -1) {
            if (cm._medals < 3) {
              if (cm._best.length) x+= optimalrows[optimalkey] + mps['crossmap'] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey].substr(0,optimaltext[optimalkey].length-1) + "</a></td><td colspan=4>" + cm._best + "</td></tr>";
              else{
                var noWins = [];
                var noWinsText = [];
                for (var un in ranks) {
                  if (!unique[un]) {
                    noWins.push(maps.indexOf(un));
                    noWinsText.push(un);
                  }
                }
                if (noWins.length) x+= optimalrows[optimalkey] + noWins + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey].substr(0,optimaltext[optimalkey].length-1) + "</a></td><td colspan=4>" + noWins + "</td></tr>";
              }
            }
          }
          else{
            combos.sort(sortCombo);
            if (combos[0]._best.length) x+= optimalrows[optimalkey] + mps[combos[0]._medal] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey].substr(0,optimaltext[optimalkey].length-1) + "</a></td><td colspan=4>" + combos[0]._best + "</td></tr>";
            else x+= optimalrows[optimalkey] + "\", \"mrsugg\");wdw.focus();'>" + optimaltext[optimalkey].substr(0,optimaltext[optimalkey].length-1) + "</a></td><td colspan=4>-</td></tr>";
          }
        }
      }
    }
  }
  x+= "<tr><td colspan=5><br />Notes: The Maps column show the best maps for that medal (most unique defeats). ";
  if (nm) x+= "E.g. for " + nm._medal + " most defeats have come from " + nm._best + "<br />";
  x+= "For crossmaps, the maps shown are those closest to 5 unique defeats. The number in brackets is the number of defeats for those maps.<br />";
  x+= "Click on the links to show game finder results for best medal + maps combination.<br />";
  x+= "</td></tr>";
  x+= "</tbody></table>";
  viewer.document.getElementById('meds').innerHTML = x;
  var stable = viewer.document.getElementById('stable');
  tr = viewer.document.createElement('tr');
  function createSummTd(id, title, text) {
    return "<td class='summ'><a href='javascript:void(0);' title='" + title + "' id='" + id + "'><b>" + text + "</b></a></td>";
  }
  var trHTML = createSummTd("played", "List of Maps Completed", played.length + " Maps Completed");
  trHTML += createSummTd("unplayed", "List of Maps Never Completed", (maps.length-1 - played.length) + " Maps Not Completed");
  trHTML += createSummTd("freq", "List Of Maps Played 5 times Or More", freq.length + " Frequent Maps");
  trHTML += createSummTd("nfreq", "List Of Maps Played Less Than 5 Times", nfreq.length + " Infrequent Maps");
  trHTML += createSummTd("mu", "List Of Maps Played With 5 Or More Unique Defeats", mu.length + " Crossmaps Maps");
  trHTML += createSummTd("mnu", "List Of Maps Played With Less Than 5 Unique Defeats", mnu.length + " Non Crossmaps Maps");
  tr.innerHTML = trHTML;
  stable.appendChild(tr);
  tr = viewer.document.createElement('tr');
  trHTML = createSummTd("mwon", "List Of Maps Played With At Least 1 Win", mwon.length + " Maps Won");
  trHTML += createSummTd("mlost", "List Of Maps Played With No Wins", mlost.length + " Maps Not Won");
  trHTML += createSummTd("pos", "List Of Maps Played With Score 0 Or More", pos.length + " Positive Maps");
  trHTML += createSummTd("neg", "List Of Maps Played With Negative Score", neg.length + " Negative Maps");
  trHTML += createSummTd("miss", "List Of Missing Game Logs", miss.length + " Missing Logs");
  trHTML += "<td class='summ'>&nbsp;</td>";
  tr.innerHTML = trHTML;
  stable.appendChild(tr);
  tr = viewer.document.createElement('tr');
  tr.innerHTML = "<td class='maplist' id='maplist' colspan=6>Click On Light Blue Cells For Lists</td>";
  stable.appendChild(tr);
  freq.sort();
  nfreq.sort();
  mu.sort();
  mnu.sort();
  mwon.sort();
  mlost.sort();
  pos.sort();
  neg.sort();
  miss.sort();

  addListener(viewer.document.getElementById('played'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Maps Completed</span><br /><br />' + played;
  });
  addListener(viewer.document.getElementById('unplayed'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Maps Not Completed</span><br /><br />' + unplayed;
  });
  addListener(viewer.document.getElementById('mwon'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Maps Won</span><br /><br />' + mwon;
  });
  addListener(viewer.document.getElementById('mlost'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Maps Not Won</span><br /><br />' + mlost;
  });
  addListener(viewer.document.getElementById('mu'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Crossmaps Maps</span><br /><br />' + mu;
  });
  addListener(viewer.document.getElementById('mnu'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Non Crossmaps Maps</span><br /><br />' + mnu;
  });
  addListener(viewer.document.getElementById('pos'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Positive Maps</span><br /><br />' + pos;
  });
  addListener(viewer.document.getElementById('neg'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Negative Maps</span><br /><br />' + neg;
  });
  addListener(viewer.document.getElementById('freq'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Frequent Maps</span><br /><br />' + freq;
  });
  addListener(viewer.document.getElementById('nfreq'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Infrequent Maps</span><br /><br />' + nfreq;
  });
  addListener(viewer.document.getElementById('miss'),'click', function() {
    viewer.document.getElementById('maplist').innerHTML = '<span>Missing Logs</span><br /><br />' + miss;
  });

  for (var st=0; st< sortable.length; st++) {
    viewer.document.getElementById(sortable[st]).className = "sorton";
  }
  setTable();
  if (totals._insignia) {
    myDefeats = new Defeats();
    for (def in totals._defeats) {
      myDefeats[def] = totals._defeats[def];
    }
    myStore._total = totals._counter;
    serialize("defeats", myDefeats);
    serialize("store", myStore);
  }
  viewer.document.getElementById('closeRank').style.opacity = "0.9";
  viewer.document.getElementById('closeRank').style.backgroundColor = "green";
  viewer.document.getElementById('progress').innerHTML = "<b>Scan Complete. Click on light blue column headers to sort. Click again to reverse sort. Click on yellow boxes for chart.</b>";

  if (surl != "") {
    var sentscore;
    var senthi;

    if (totals._realscore != null) {
      sentscore = totals._realscore;
      senthi = (dummyscore + 1000);
    }
    else{
      sentscore = (totals._points + 1000);
      senthi = (hiscore + 1000);
    }
    GM_xmlhttpRequest({
      method: 'POST',
      url: "http://chipv.freehostia.com/scoreboard.php?act=s&player=" + user + "&score=" + sentscore + "&win=" + totals._wins + "&loss=" + (totals._games - totals._wins) + "&rr=" + getRR(totals._meanwin,totals._beaten)  + "&hiscore=" + senthi +  "&unique=" + totals._unique.length + "&medals=" + totals._medals + "&url=" + surl,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html'
      },
      onload: function(responseDetails) {
        surl = "";
      }
    });
  }
}

function valToPix(val) {
  return (Math.floor(val * slider._toVal / (slider._scale * slider._pxLen)) * (slider._pxLen / slider._toVal));
}

function tinput(id) {
  displayObj = viewer.document.getElementById('display_' + id);
  displayVal = parseInt(displayObj.value);
  if (displayVal <= slider._toVal) {
    var n = valToPix(displayVal);
    slideLeft('slider_' + id,n);
    viewer.document.getElementById('stamp_' + id).innerHTML = '' + new Date(slider._parray[displayVal]._time).toLocaleString();
    displayObj.style.color = "blue";
  }
  else{
    viewer.document.getElementById('stamp_' + id).innerHTML = "";
    displayObj.style.color = "gray";
  }
}

function slideLeft(elmnt, pos) {
  if (!(elmnt = viewer.document.getElementById(elmnt))) return 0;
  if (typeof(pos) == 'number') elmnt.style.left = pos + 'px';
  else {
    pos = parseInt(elmnt.style.left);
    if (isNaN(pos)) pos = 0;
  }
  return pos;
}

function moveSlider(evnt) {
  if (mouseover) {
    x = pxLeft + evnt.screenX - xCoord;
    if (x > slider._pxLen) x = slider._pxLen;
    if (x < 0) x = 0;
    slideLeft(sliderObj.id, x);
    sliderPos = (slider._pxLen / slider._toVal) * Math.round(slider._toVal * x / slider._pxLen);
    v = Math.round((sliderPos * slider._scale));
    displayObj.value = v;
    stampObj.innerHTML = '' + new Date(slider._parray[v]._time).toLocaleString();
    return false;
  }
  return undefined;
}

function slide(evnt, id) {
  sliderObj = viewer.document.getElementById('slider_' + id);
  displayObj = viewer.document.getElementById('display_' + id);
  stampObj = viewer.document.getElementById('stamp_' + id);
  pxLeft = slideLeft('slider_' + id);
  xCoord = evnt.screenX;
  mouseover = true;
  viewer.document.addEventListener('mousemove', moveSlider , false);
  viewer.document.addEventListener('mouseup', sliderMouseUp, false);
}

function sliderMouseUp() {
  mouseover = false;
  v = (parseInt(displayObj.value)) ? parseInt(displayObj.value) : 0;
  pos = v /(slider._scale);
  slideLeft(sliderObj.id, pos);
  stampObj.innerHTML = '' + new Date(slider._parray[v]._time).toLocaleString();
  viewer.document.removeEventListener('mousemove', moveSlider, false);
  viewer.document.removeEventListener('mouseup', sliderMouseUp, false);
}

function graph(holder, arr, start, end, title, graphtype) {
  var parray = holder[arr];
  var offset = 0;
  var deficit;

  viewer.document.getElementById('lines').innerHTML = '';
  switchTabs(2);
  parray.sort(psort);
  var running = graphtype._running(parray);
  var g = new line_graph(graphtype._maxbound, graphtype._minbound);
  viewer.document.getElementById('lines').style.display = "block";
  viewer.document.getElementById('cheader').style.display = "block";
  viewer.document.getElementById('cfooter').style.display = "block";
  viewer.document.getElementById('buttons').style.display = "block";
  viewer.document.getElementById('cheader').innerHTML = "<h3 class=header>Map Rank Chart For " + title + " " + graphtype._type + "</h3><br /><span><b>" + graphtype._type + "</b>";
  viewer.document.getElementById('cfooter').innerHTML = "<h3><b>Timestamp</h3>";
  if (start==0 && graphtype == graphTypes['points']) g.add('',graphtype._initial,"red");
  if (title == "Totals" && totals._realscore != null && graphtype == graphTypes['points']) deficit = totals._realscore - totals._points - 1000;
  for (var f=start; f<=end; f++) {
    offset = (deficit && parray[f]._time > lastTime)? deficit:0;
    g.add('<span title=\"' +  (parseInt(running._data[f]) + offset) + " on " +  new Date(parray[f]._time).toLocaleString() +'\">' + f + '</span>', parseInt(running._data[f]) + offset, running._colour[f]);
  }
  g.render("lines");
  var buttontxt = "<table cellspacing=0 cellpadding=0 border=1><tr class=mrodd><td colspan=4>Min: " + g.min + "&nbsp;&nbsp;&nbsp;Max: " + g.max + "</td></tr>";
  if (graphtype == graphTypes['winloss']) {
    buttontxt += "<tr class=mrodd><td colspan=4><span id=wstreak>Longest Winning Streak : " + (running._winstreak._num) + "</span>&nbsp;&nbsp;&nbsp;";
    buttontxt += "<span id=lstreak>Longest Losing Streak : " + (running._losstreak._num) + "</span></td></tr>";
  }
  buttontxt += "<tr class=mrodd><td><b>From</b></td><td><div class=track id=\"track_1\"><div class=slit id=\"slit_1\">&nbsp;</div>";
  buttontxt += "<div class=slider id=\"slider_1\">&nbsp;</div></div></td>";
  buttontxt += "<td><div class=\"display_div\" id=\"display_div_1\"><input type=text class=display id=\"display_1\"/>";
  buttontxt += "</div></td><td><div class=\"stamp_div\" id=\"stamp_div_1\"><span class=stamp id=\"stamp_1\"/></div></td></tr>";
  buttontxt += "<tr class=mrodd><td><b>To</b></td><td><div class=track id=\"track_2\"><div class=slit id=\"slit_2\">&nbsp;</div>";
  buttontxt += "<div class=slider id=\"slider_2\">&nbsp;</div></div></td>";
  buttontxt += "<td><div class=\"display_div\" id=\"display_div_2\"><input type=text class=display id=\"display_2\"/>";
  buttontxt += "</div></td><td><div class=\"stamp_div\" id=\"stamp_div_2\"><span class=stamp id=\"stamp_2\"/></div></td></tr>";
  buttontxt += "<tr class=mrodd><td colspan=4><button id=graph>Chart</button><button id=gall>Reset</button></td></tr></table>";
  viewer.document.getElementById('buttons').innerHTML = buttontxt;
  viewer.document.getElementById('slider_1').style.left = valToPix(start) + "px";
  viewer.document.getElementById('slider_2').style.left = valToPix(end) + "px";
  viewer.document.getElementById('track_1').style.width = (220) + "px";
  viewer.document.getElementById('track_2').style.width = (220) + "px";
  viewer.document.getElementById('slit_1').style.width = (210) + "px";
  viewer.document.getElementById('slit_2').style.width = (210) + "px";
  viewer.document.getElementById('display_1').value = start;
  viewer.document.getElementById('display_2').value = end;
  viewer.document.getElementById('stamp_1').innerHTML = '' + new Date(parray[start]._time).toLocaleString();
  viewer.document.getElementById('stamp_2').innerHTML = '' + new Date(parray[end]._time).toLocaleString();
  addListener(viewer.document.getElementById('display_1'),'keyup', function() {
    tinput(1);
  });
  addListener(viewer.document.getElementById('display_2'),'keyup', function() {
    tinput(2);
  });
  addListener(viewer.document.getElementById('slider_1'),'mousedown', function(event) {
    slide(event,1);
  });
  addListener(viewer.document.getElementById('slider_2'),'mousedown', function(event) {
    slide(event,2);
  });
  viewer.document.getElementById('progress').innerHTML = "<b>Hover over Timestamp numbers to see timestamp of " + graphtype._info + ". Hover over " + graphtype._markers + " markers to see values.</b>";
  addListener(viewer.document.getElementById('graph'),'click', function() {
    fromVal = parseInt(viewer.document.getElementById('display_1').value);
    toVal = parseInt(viewer.document.getElementById('display_2').value);
    if (isNaN(fromVal) || isNaN(toVal) || fromVal > toVal || fromVal > slide._toVal || toVal < 0 || fromVal < 0 || toVal > slide._toVal) {
      alert("Invalid range");
    }
    else{
      graph(holder, arr, fromVal , toVal, title, graphtype);
    }
  });
  addListener(viewer.document.getElementById('gall'),'click', function() {
    graph(holder, arr, 0,parray.length - 1, title, graphtype);
  });
  if (graphtype == graphTypes['winloss']) {
    addListener(viewer.document.getElementById('wstreak'),'click', function() {
      graph(holder, arr, running._winstreak._start,running._winstreak._start + running._winstreak._num - 1, title, graphtype);
    });
    addListener(viewer.document.getElementById('lstreak'),'click', function() {
      graph(holder, arr, running._losstreak._start,running._losstreak._start + running._losstreak._num - 1, title, graphtype);
    });
  }
}

function handleSearchSuggest(lastval) {
  var next = document.getElementById('player').value;
  var k=0;
  if (next == '') {
    clearSuggest();
    return;
  }
  if (next != lastval) {
    return;
  }
  var ss = document.getElementById('phistory');
  ss.innerHTML = '';
  var str = phist.split("|");
  for (i=0; i < str.length; i++) {
    if (str[i].substring(next.length,0).match(next, "i")) {
      var suggest = document.createElement('div');
      suggest.innerHTML = str[i];
      if (k==0) {
        suggest.className = "history_link_over";
      }
      else{
        suggest.className = "history_link";
      }
      ss.appendChild(suggest);
      suggest.addEventListener('mouseover', function() {
        suggestOver(this);
      }, false);
      suggest.addEventListener('mouseout', function() {
        suggestOut(this);
      }, false);
      suggest.addEventListener('click', function() {
        setSearch(this.innerHTML);
      }, false);
      ss.style.visibility = 'visible';
      k++;
    }
  }
  suggtot = k;
  if (suggtot > 0) {
    current = 0;
  }
  else {
    current = -1;
  }
}

function suggestOver(div_value) {
  var divs = document.getElementById('phistory').getElementsByTagName('div');
  for (i=0; i< suggtot; i++) {
    divs[i].className = "history_link";
  }
  div_value.className = 'history_link_over';
}

function suggestOut(div_value) {
  div_value.className = 'history_link';
}

function setSearch(value) {
  document.getElementById('player').value = value;
  clearSuggest();
}

function clearSuggest() {
  div = document.getElementById('phistory');
  div.innerHTML = '';
  div.style.visibility = 'hidden';
}

function updownArrow(keyCode) {
  if (keyCode == 40 || keyCode == 38){
    if (keyCode == 38){ // keyUp
      if (current == 0 || current == -1){
        current = suggtot-1;
      }else{
        current--;
      }
    } else { // keyDown
      if (current == suggtot-1){
        current = 0;
      }else {
        current++;
      }
    }
    var divs = document.getElementById('phistory').getElementsByTagName('div');
    for (i=0; i< suggtot; i++) {
      if (i == current){
        divs[i].className = "history_link_over";
      } else {
        divs[i].className = "history_link";
      }
    }
    return true;
  } else {
    current = -1;
    return false;
  }
}

function key(input,e) {
  var keyCode;

  if (!e) {
    keyCode = window.event.keyCode;
  }
  else{
    keyCode = e.keyCode;
  }
  last = input.value;

  if (keyCode == 13) {
    if (current != -1) {
      var divs = document.getElementById('phistory').getElementsByTagName('div');
      setSearch(divs[current].innerHTML);
    }
    return;
  }
  if (updownArrow(keyCode)){
    return;
  }
  if (keyCode == 27) {
    clearSuggest();
    return;
  }
  handleSearchSuggest(last);
}

function deserialize(name, def) {
  var toReturn;
  try {
	var original = GM_getValue(name);
	if (original && original.indexOf('(') == 0) {
		toReturn = def || {}; // saved through old method, reset.
	} else {
		toReturn = JSON.parse(original, def || {});
	}
  } catch (e) {}
  return toReturn || def || {};
}

function serialize(name, val) {
  GM_setValue(name, JSON.stringify(val));
}

var saveButtonHandler = function() {
  var name= prompt("Please Name this map rank (reusing a name will overwrite it)",loadedName);
  if (name) {
    var searchDetails={};
    var allP = document.getElementById('middleColumn').getElementsByTagName("input");
    var mSel = document.getElementById("maps");
    for ( i in allP ) {
      if (allP[i].type=="checkbox") {
        searchDetails[allP[i].id] = allP[i].checked;
      }
      if (allP[i].type=="text") {
        searchDetails[allP[i].id] = allP[i].value;
      }
    }
    for (j=0; j< mSel.options.length; j++) {
      var strip = mSel.options[j].innerHTML.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );
      searchDetails[strip] = mSel.options[j].selected;
    }
    myOptions[name] = searchDetails;
    serialize("mapbook", myOptions);
    showSearchs();
  }
};

var loadButtonHandler = function (searchDetails,s,bRun) {
  loadedName = s;
  var allP =document.getElementById('middleColumn').getElementsByTagName("input");
  var mSel = document.getElementById("maps");
  for (j=0; j< mSel.options.length; j++) {
    var strip = mSel.options[j].innerHTML.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );
    if (searchDetails[strip]){
      mSel.options[j].selected = searchDetails[strip];
    } else {
      mSel.options[j].selected = false;
      searchDetails[strip] = false;
      myOptions[s] = searchDetails;
      serialize("SEARCHES", myOptions);
    }
  }
  setThumbnails(mSel.options);
  for ( i in allP ) {
    if (allP[i].type=="checkbox") {
      if (searchDetails[allP[i].id]) {
        allP[i].checked = searchDetails[allP[i].id] ;
      } else {
        allP[i].checked = false;
        searchDetails[allP[i].id] = false;
        myOptions[s] = searchDetails;
        serialize("mapbook", myOptions);
      }
    }
    if (allP[i].type=="text") {
      if (searchDetails[allP[i].id] != undefined) {
        allP[i].value = searchDetails[allP[i].id];
      } else {
        allP[i].value = "";
        searchDetails[allP[i].id] = "";
        myOptions[s] = searchDetails;
        serialize("mapbook", myOptions);
      }
    }
  }
  if (bRun) {
    document.getElementById('maprank').click();
  }
};

var delButtonHandler = function (searchName) {
  if (confirm("Are you sure you want to remove the saved map rank "+ searchName)) {
    var newOptions = {};
    for (var s in myOptions) {
      if (s!=searchName) {
        newOptions[s] = myOptions[s];
      }
    }
    myOptions = newOptions;
    serialize("mapbook", myOptions);
    showSearchs();
  }
};

var makedelButtonHandler = function (searchName) {
  return function(e) {
    e.preventDefault();
    delButtonHandler(searchName);
  };
};

var makeloadButtonHandler = function (search,s,run) {
  return function(e) {
    e.preventDefault();
    loadButtonHandler (search,s,run);
  };
};

var showSearchs = function showSearchs() {
  var savedSearches = document.getElementById('mapsaved');
  savedSearches.innerHTML = "<b>Saved Map Ranks</b><br />";

  var srchtbl = document.createElement('table');
  savedSearches.appendChild(srchtbl);

  for (var s in myOptions) {
    var srch = document.createElement('tr');
    srchtbl.appendChild(srch);

    var srch2 = document.createElement('td');
    srch.appendChild(srch2);
    srch2.innerHTML = s;

    var srch2 = document.createElement('td');
    srch.appendChild(srch2);

    var spm = document.createElement('a');
    srch2.appendChild(spm);
    spm.innerHTML = "Run";
    spm.addEventListener("click", makeloadButtonHandler(myOptions[s],s,true), false);

    var srch2 = document.createElement('td');
    srch.appendChild(srch2);

    var spm = document.createElement('a');
    srch2.appendChild(spm);
    spm.innerHTML = "Load";
    spm.addEventListener("click", makeloadButtonHandler(myOptions[s],s,false), false);

    var srch2 = document.createElement('td');
    srch.appendChild(srch2);

    var spm = document.createElement('a');
    srch2.appendChild(spm);
    spm.innerHTML = "Delete";
    spm.addEventListener("click", makedelButtonHandler(s), false);
  }
};

function getRank(games,total) {
  if (games >= 250 && total >= 4500) return "Field Marshal";
  if (games >= 200 && total >= 3500) return "General";
  if (games >= 150 && total >= 3000) return "Brigadier";
  if (games >= 100 && total >= 2500) return "Colonel";
  if (games >= 80 && total >= 2000) return "Major";
  if (games >= 60 && total >= 1800) return "Captain";
  if (games >= 40 && total >= 1600) return "Lieutenant";
  if (games >= 20 && total >= 1400) return "Sergeant 1st Class";
  if (games >= 20 && total >= 1300) return "Sergeant";
  if (games >= 10 && total >= 1200) return "Corporal 1st Class";
  if (games >= 10 && total >= 1100) return "Corporal";
  if (games >= 5 && total >= 1000) return "Private 1st Class";
  if (games >= 5 && total >= 900) return "Private";
  if (games >= 5 && total >= 800) return "Cadet";
  if (games >= 5) return "Cook";
  return "New Recruit";
}

function nextRank(total) {
  if (total >= 4500) return "";
  if (total >= 3500) return "<sup>" + (4500 - total) + "</sup>";
  if (total >= 3000) return "<sup>" + (3500 - total) + "</sup>";
  if (total >= 2500) return "<sup>" + (3000 - total) + "</sup>";
  if (total >= 2000) return "<sup>" + (2500 - total) + "</sup>";
  if (total >= 1800) return "<sup>" + (2000 - total) + "</sup>";
  if (total >= 1600) return "<sup>" + (1800 - total) + "</sup>";
  if (total >= 1400) return "<sup>" + (1600 - total) + "</sup>";
  if (total >= 1300) return "<sup>" + (1400 - total) + "</sup>";
  if (total >= 1200) return "<sup>" + (1300 - total) + "</sup>";
  if (total >= 1100) return "<sup>" + (1200 - total) + "</sup>";
  if (total >= 1000) return "<sup>" + (1100 - total) + "</sup>";
  if (total >= 900) return "<sup>" + (1000 - total) + "</sup>";
  if (total >= 800) return "<sup>" + (900 - total) + "</sup>";
  return "<sup>" + (800 - total) + "</sup>";
}

function getKiller(losses, defeats) {
  if (defeats + losses) {
    var ratio = (100 * defeats / (defeats + losses)).toFixed(0);
    var pc = "(" + ratio + "%)";
    if (ratio >= 95) {
      return "Angel Of Death " + pc;
    }
    if (ratio >= 90) {
      return "Grim Reaper " + pc + "<sup>" + ((losses * 19) - defeats) + "</sup>";
    }
    if (ratio >= 80) {
      return "Warmonger " + pc + "<sup>" + ((losses * 9) - defeats) + "</sup>";
    }
    if (ratio >= 75) {
      return "Tyrant " + pc + "<sup>" + ((losses * 4) - defeats) + "</sup>";
    }
    if (ratio >= 50) {
      return "Serial Killer " + pc + "<sup>" + ((losses * 3) - defeats) + "</sup>";
    }
    if (ratio >= 25) {
      return "Murderer " + pc + "<sup>" + (losses - defeats) + "</sup>";
    }
    if (ratio >= 10) {
      return "Petty Thug " + pc + "<sup>" + (Math.ceil(losses / 3) - defeats) + "</sup>";
    }
    return "Victim " + pc + "<sup>" + (Math.ceil(losses / 9) - defeats) + "</sup>";
  }
  return "N/A";
}

function getRR(rank, defeats) {
  if (defeats + rank) {
    var ratio = (rank / (defeats)).toFixed(3);
    return ratio;
  }
  return 0.000;
}


function getRelative(rank, defeats) {
  if (defeats + rank) {
    var ratio = (rank / (defeats)).toFixed(3);
    var pc = "(" + ratio + ")";
    if (ratio >= 1.4) {
      return "Gladiator " + pc;
    }
    if (ratio >= 1.1) {
      return "Brawler " + pc;
    }
    if (ratio >= .8) {
      return "Equalitarian " + pc;
    }
    if (ratio >= .5) {
      return "Point Hoarder " + pc;
    }
    return "N00b Farmer " + pc;
  }
  return "N/A (0)";
}

function cleanup() {
  for (var cx = 0; cx < ghist.length; cx++) {
    ghist[cx].onreadystatechange = function() {};
    ghist[cx].abort();
  }
  ghist = [];
  while (__eventListeners.length > 0) {
    removeListener(__eventListeners[0]);
  }
  if (viewer != null)
    viewer.close();
}

function sortByCol(id,cellfn, cell, dir) {
  var idc = [];
  for (var i=0; i< sortable.length; i++) {
    idc[sortable[i]] = viewer.document.getElementById(sortable[i]).className;
  }
  sortedTable(cellfn, cell, dir);
  viewer.document.getElementById(id).className = (idc[id] == "sorton" ? "sortoff" : "sorton");
  for (var i=0; i< sortable.length; i++) {
    if (sortable[i] != id)
      viewer.document.getElementById(sortable[i]).className = idc[sortable[i]];
  }
}

function ssort(a,b) {
  return(a._next-b._next);
}

function psort(a,b) {
  return(a._time-b._time);
}

function alpha(cells, sorter) {
  return cells[sorter].innerHTML;
}

function numerical(cells, sorter) {
  return parseInt(cells[sorter].innerHTML);
}

function percent(cells, sorter) {
  if (cells[sorter].innerHTML.match(/\((\d+)%\)/)) {
    return parseInt(RegExp.$1);
  }
  return 0;
}

function factor(cells, sorter) {
  if (cells[sorter].innerHTML.match(/\((\d).(\d+)\)/)) {
    return (parseInt(RegExp.$1) * 1000) + parseInt(RegExp.$2);
  }
  return 0;
}

function sortedTable(cellfn, cell, dir) {
  var res = viewer.document.getElementById('ranktable').getElementsByTagName('tr');
  table = viewer.document.createElement("table");
  table.border=0;
  table.id = "scroller";
  table.width = "100%";
  table.cellSpacing = "0";
  table.cellPadding = "0";
  table.className = "scrollTable";
  for (var r=0; r< 4; r++) {
    var clone = viewer.document.getElementById('scroller').getElementsByTagName('thead')[r].cloneNode(true);
    table.appendChild(clone);
  }
  var unsorted = [];
  var clone = [];
  var ref = [];
  tbody = table.appendChild(viewer.document.createElement("tbody"));
  tbody.className = "scrollContent";
  tbody.id = "ranktable";
  for (var r=0; r< res.length; r++) {
    var ix = res[r].getElementsByTagName('td');
    ref[r] = cellfn(ix, cell);
    unsorted.push(ref[r]);
    if (isNaN(ref[r]))
      unsorted.sort();
    else
      unsorted.sort(function(a,b) {
        return(b-a);
      });
    if (dir == "sortoff") unsorted.reverse();
    clone[r] = res[r].cloneNode(true);
    tbody.insertBefore(clone[r], tbody.getElementsByTagName('tr')[unsorted.indexOf(ref[r])]);
  }
  viewer.document.getElementById('tableContainer').removeChild(viewer.document.getElementById('scroller'));
  viewer.document.getElementById('tableContainer').appendChild(table);
  setTable();
}

function switchTabs(id) {
  viewer.document.getElementById('lines').style.visibility = (id==2)?"visible":"hidden";
  viewer.document.getElementById('cheader').style.visibility = (id==2)?"visible":"hidden";
  viewer.document.getElementById('cfooter').style.visibility = (id==2)?"visible":"hidden";
  viewer.document.getElementById('buttons').style.visibility = (id==2)?"visible":"hidden";
  viewer.document.getElementById('tableContainer').style.visibility = (id==1)?"visible":"hidden";
  viewer.document.getElementById('summ').style.visibility = (id==3)?"visible":"hidden";
  viewer.document.getElementById('meds').style.visibility = (id==4)?"visible":"hidden";
  viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
  viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
  viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
  viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
  viewer.document.getElementById('tab' + id).style.backgroundColor = "#0f0";
}

function createBox(txt, name, options) {
  cleanup();
  viewer = window.open('','box','width=1040,height=720,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  viewer.addEventListener('unload', function() {
    viewer=null;
    cleanup();
  }, false);
  var style = viewer.document.getElementsByTagName('head')[0].appendChild(viewer.document.createElement("style"));
  style.type = 'text/css';
  style.innerHTML = "#rankDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;} ";
  style.innerHTML += "#rankBox {position:relative;min-width:1040px;height:100%;margin-top:10px;margin-left:20px;border:2px solid #000;background-color:#F2F5F6;} ";
  style.innerHTML += "#rankDiv > #rankBox {position:fixed;overflow:auto;} ";
  style.innerHTML += "#rankBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;} ";
  style.innerHTML += "#rankBox p {font:0.7em verdana,arial;padding-left:50px;width:900px;} .result {font-weight:bold;color:#00f;} .totals {color:#000;} ";
  style.innerHTML += "#rankBox a {text-decoration:none;} .central {text-align:center} #rankBox #tab1, #rankBox #tab2, #rankBox #tab3, #rankBox #tab4 {border:1px solid black}";
  style.innerHTML += "#rankBox #tab1:hover, #rankBox #tab2:hover, #rankBox #tab3:hover, #rankBox #tab4:hover , #rankBox #closeRank:hover {color:#fff} .header {background-color:#cdc;font-weight:bold;} ";
  style.innerHTML += "#rankBox #closeRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox img {position:relative;top:20px;left:20px;} .rankoptions {width:100px;} .bmedal {font-weight:bold;color:#8C7853} .smedal {font-weight:bold;color:silver} .gmedal {font-weight:bold;color:gold} .pmedal {font-weight:bold;color:green} .bmeddiv {background-color:#8C7853;z-index:-100} .smeddiv {background-color:silver;z-index:-100} .gmeddiv {background-color:gold;z-index:-100} .pmeddiv {background-color:green;z-index:-100}";
  style.innerHTML += "#wstreak {cursor:pointer;text-decoration:underline;color:green} #lstreak {cursor:pointer;text-decoration:underline;color:red}";
  style.innerHTML += "#lines {visibility:hidden;overflow: auto;width:100%;height:500px;position:absolute;z-index:200;top:150px;align:center;padding:0px;border:1px solid black;text-align:center;font: 7pt Verdana, Arial, Helvetica, sans-serif;}";
  style.innerHTML += "#summ {visibility:hidden;overflow: hidden;width:1000px;height:565px;position:absolute;z-index:200;top:120px;align:center;margin-left:10px;margin-right:10px;padding:0px;border:1px solid black;text-align:center;}";
  style.innerHTML += "#meds {visibility:hidden;overflow: hidden;width:1000px;height:565px;position:absolute;z-index:200;top:120px;align:center;margin-left:10px;margin-right:10px;padding:0px;border:1px solid black;text-align:center;}";
  style.innerHTML += "#cheader {display:none;width:100%;position:absolute;z-index:200;top:100px;margin:0px;padding:0px;font: 7pt Verdana, Arial, Helvetica, sans-serif;}";
  style.innerHTML += "#cheader h3{text-align:center;border:1px solid black;} tbody.scrollContent td.chart,thead.totalsHeader td.chart {background-color:yellow;color:red;cursor:pointer;}";
  style.innerHTML += "#cheader span{text-align:left;position:absolute;top:30px;font-size:9pt} .mreven {background-color:#ddd} .mrodd {background-color:#eee}";
  style.innerHTML += "#cfooter {display:none;width:100%;position:absolute;z-index:200;top:460px;height:10px;margin:0px;padding:0px;font: 7pt Verdana, Arial, Helvetica, sans-serif;}";
  style.innerHTML += "#cfooter h3{text-align:center;font-size:9pt;align:center} #buttons {z-index:201;position:absolute;top:490px;left:22%;width:56%;} #buttons table {text-align:center;font-weight:bold;color:blue;font-size:11pt;}";
  style.innerHTML += ".track {line-height: 0px;font-size: 0px;text-align: left;padding: 4px;border: 1px solid;}";
  style.innerHTML += ".slider {width: 16px;height: 8px;position: relative;z-index: 2;line-height: 0px;margin: 0;border: 2px solid;}";
  style.innerHTML += ".slit {height: 2px;margin: 4px 4px 2px 4px;line-height: 0px;position: absolute;z-index: 1;border: 1px solid;}";
  style.innerHTML += ".display_div {width: 48px;padding: 0 2px 0 0;height: 20px;text-align: left;border: 1px solid;}";
  style.innerHTML += ".display {background-color: #fff;color: blue;width: 48px;text-align: left;font-size: 8pt;font-family: verdana, arial, helvetica, sans-serif;font-weight: bold;cursor: text;}";
  style.innerHTML += ".stamp_div {color: #fff;width: 200px;padding: 0 2px 0 0;height: 20px;text-align: left;border: 0;}";
  style.innerHTML += ".stamp {color: blue;width: 200px;text-align: left;font-size: 8pt;font-family: verdana, arial, helvetica, sans-serif;font-weight: bold;border: 0;}";
  style.innerHTML += "#slider_1 {background-color: #696;border-color: #9c9 #363 #363 #9c9;} #track_1, #display_div_1 {background-color: #bdb;border-color: #ded #9a9 #9a9 #ded;}";
  style.innerHTML += "#slit_1 {background-color: #232;border-color: #9a9 #ded #ded #9a9;} #slider_2 {background-color: #369;border-color: #69c #036 #036 #69c;}";
  style.innerHTML += "#track_2, #display_div_2 {background-color: #bcd;border-color: #def #9ab #9ab #def;} #slit_2 {background-color: #036;border-color: #9ab #def #def #9ab;}";
  style.innerHTML += "#tabs {text-align:center} #tabs table{align:center;margin-left:30px;} #tabs a {width:100px;font-weight:bold;font: verdana,arial;text-transform:none;color:gray;padding:0 5px} #tabs a:hover {background-color:#cdc}";
  style.innerHTML += "#scroller {width: 1000px;} #scroller, #scroller.td, #scroller.a, #summ td, #meds td {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style.innerHTML += "div.tableContainer {border: 1px solid #963;height: 565px;overflow: hidden;width: 1000px;margin:10px}";
  style.innerHTML += "thead.fixedHeader tr, thead.scrollHeader tr, thead.totalsHeader tr {display: block} thead.fixedHeader td, tbody.scrollContent td.banner {background: #cdc;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 1000px}";
  style.innerHTML += "thead.scrollHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} thead.scrollHeader td.sorton, thead.scrollHeader td.sortoff {background-color:cyan;cursor:pointer;}  ";
  style.innerHTML += "thead.totalsHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;}";
  style.innerHTML += "thead.scrollHeader a, thead.scrollHeader a:link, thead.scrollHeader a:visited,thead.totalsHeader a, thead.totalsHeader a:link, thead.totalsHeader a:visited, tbody.scrollContent a, tbody.scrollContent a:link, tbody.scrollContent a:visited {display: block;width: 136px;}";
  style.innerHTML += "tbody.scrollContent {display: block;height: 480px;overflow: auto;width: 100%}";
  style.innerHTML += "tbody.scrollContent td {background: #FFF;border-right: 1px solid #b74;border-bottom: 1px solid #DDD;padding: 4px 3px;text-align:center;}";
  style.innerHTML += "tbody.scrollContent td + td + td + td + td + td + td{width: 119px} thead.scrollHeader td + td + td + td + td + td + td, thead.totalsHeader td + td + td + td + td + td + td{border-right: 1px solid #ddd;}";
  style.innerHTML += "tbody.scrollContent td ,tbody.scrollContent td.noflow {width: 136px;vertical-align: middle;} tbody.scrollContent td.mreven {background-color:#ddd} tbody.scrollContent td.mrodd {background-color:#eee} tbody.scrollContent td.summ {width:166px; background-color:cyan}";
  style.innerHTML += "tbody.scrollContent td#maplist {width:1000px;font: bold 10pt Verdana, Geneva, Arial, Helvetica, sans-serif;color:#00f;background-color:#eee} tbody.scrollContent td#maplist span {color:#000;font-size:16px;} tbody.scrollContent td#maplist a, #meds a {display:inline;text-decoration:underline}";
  style.innerHTML += "#meds td {color:#000;width:1000px;} #meds .bmedal {color:#8C7853} #meds .smedal {color:silver} #meds .gmedal {color:gold} #meds .pmedal {color:green} #meds .omedal {color:blue}";
  mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
  mObj.id = "rankDiv";
  mObj.style.visibility = 'hidden';
  mObj.style.height = viewer.document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(viewer.document.createElement("div"));
  alertObj.id = "rankBox";
  alertObj.style.left = (viewer.document.documentElement.scrollWidth - alertObj.offsetWidth) - "px";
  h1 = alertObj.appendChild(viewer.document.createElement("h1"));
  h1.appendChild(viewer.document.createTextNode("MAP RANK GL"));
  msg = alertObj.appendChild(viewer.document.createElement("p"));
  msg.id = "progress";
  msg.innerHTML = txt;
  btn = alertObj.appendChild(viewer.document.createElement("a"));
  btn.id = "closeRank";
  btn.appendChild(viewer.document.createTextNode("CLOSE"));
  btn.href = "javascript:void(0);";
  btn.style.opacity = "0.5";
  addListener(btn,'click', function() {
    if (btn.style.backgroundColor == "green")
      removeBox();
  });
  tabs = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tabs.id = "tabs";
  tabs.innerHTML = "<table><tr><td><a id=tab1>Table</a></td><td><a id=tab2>Chart</a></td><td><a id=tab3>Summary</a></td><td><a id=tab4>Medals</a></td></tr></table>";
  for (var i = 1; i < 5; i++) {
    addListener(viewer.document.getElementById('tab' + i),'click', function(e) {
      switchTabs(+(this.id.match(/\d/)));
    });
  }
  tableWrap = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tableWrap.id = "tableContainer";
  tableWrap.className = "tableContainer";
  table = viewer.document.getElementById('tableContainer').appendChild(viewer.document.createElement("table"));
  table.id = "scroller";
  table.border=0;
  table.width = "100%";
  table.cellSpacing = "0";
  table.cellPadding = "0";
  table.className = "scrollTable";
  heading = table.appendChild(viewer.document.createElement("thead"));
  heading.className = "fixedHeader";
  ftr = heading.appendChild(viewer.document.createElement("tr"));
  ftr.innerHTML = "<td colspan=7>Map Rank For " + name + "</td>";

  opts = table.appendChild(viewer.document.createElement("thead"));
  opts.className = "fixedHeader";
  otr = opts.appendChild(viewer.document.createElement("tr"));
  otr.innerHTML = "<td colspan=7><b>Options:</b> " + options + "</td>";

  cols = table.appendChild(viewer.document.createElement("thead"));
  cols.className = "scrollHeader";
  ctr = cols.appendChild(viewer.document.createElement("tr"));
  ctr.innerHTML = "<td id='smap'>Map</td><td class='result'>Rank</td><td id='spts'>Points</td><td id='swin'>Win/Loss</td><td id='suni'>Unique Defeats</td><td id='skil'>Kill Ratio</a><td id='srel'>Relative Rank</td>";

  tots = table.appendChild(viewer.document.createElement("thead"));
  tots.className = "totalsHeader";
  ttr = tots.appendChild(viewer.document.createElement("tr"));
  ttr.id = "summary";
  ttr.className = "result totals";
  ttr.innerHTML = "<td>Totals</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";

  tbody = table.appendChild(viewer.document.createElement("tbody"));
  tbody.className = "scrollContent";
  tbody.id = "ranktable";

  mObj.style.visibility = 'visible';  

  chartheader = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  chartheader.id = "cheader";
  container = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  container.id = "lines";
  container.innerHTML = "<br /><h2>No Chart Selected. Click on a yellow box in the table.</h2>";
  chartfooter = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  chartfooter.id = "cfooter";
  chartbutt = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  chartbutt.id = "buttons";
  container = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  container.id = "summ";
  container = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  container.id = "meds";

  stable = viewer.document.getElementById('summ').appendChild(viewer.document.createElement("table"));
  stable.border=0;
  stable.width = "100%";
  stable.cellSpacing = "0";
  stable.cellPadding = "0";
  var thead = viewer.document.createElement('thead');
  thead.className = "fixedHeader";
  tr = viewer.document.createElement('tr');
  td = viewer.document.createElement('td');
  td.innerHTML = "<b>Map Rank Summary For " + name + "</b>";
  tr.appendChild(td);
  thead.appendChild(tr);
  stable.appendChild(thead);
  var thead = viewer.document.createElement('thead');
  thead.className = "fixedHeader";
  tr = viewer.document.createElement('tr');
  td = viewer.document.createElement('td');
  td.innerHTML = "<b>Options:</b> " + options;
  tr.appendChild(td);
  thead.appendChild(tr);
  stable.appendChild(thead);
  tbody = viewer.document.createElement('tbody');
  tbody.className = "scrollContent";
  tbody.id = "stable";
  stable.appendChild(tbody);
  switchTabs(1);
}

function removeBox() {
  viewer.close();
  viewer = null;
  ghist = [];
}

function getElementsByClassName(oElm, strTagName, strClassName, exact) {
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = [];
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for (var i=0; i<arrElements.length; i++) {
    oElement = arrElements[i];
    if (exact) {
      if (oElement.className==strClassName){
        arrReturnElements.push(oElement);
      }
    } else {
      if (oElement.className.has(strClassName)){
        arrReturnElements.push(oElement);
      }
    }
  }
  return (arrReturnElements);
}

function cboxValues(name) {
  var cbox = document.getElementsByName(name);
  var out = [];
  for (var n=0;n<cbox.length;n++) {
    if (cbox[n].checked) out.push(cbox[n].value);
  }
  return out;
}

function getPlayerPage (user, maplist, mopts, opt) {
  var pump = baseURL + 'forum/memberlist.php?mode=viewprofile&un=' + encodeURIComponent(mopts._players[opt]);
  var pajax = new XMLHttpRequest();
  pajax.open('GET', pump, true);
  pajax.onreadystatechange = function() {
    if (pajax.readyState == 4) {
      var div=document.createElement('div');
      div.innerHTML = pajax.responseText;
      var wall = div.getElementsByTagName('form');
      var uid;
      for (var w=0; w<wall.length; w++) {
        if (wall[w].id == "viewwall") {
          if (wall[w].action.match(/u=(\d+)$/)) {
            uid = RegExp.$1;
          }
          break;
        }
      }
      mopts._players[opt] = uid;
      pcount++;
      if (pcount == mopts._pcount) {
        getPlayerMedals(user);
        getPlayerId(user, maplist,mopts);
      }
    }
  };
  pajax.send(null);
}

function getPlayerId (user, maplist, mopts) {		
  var iump =  baseURL + 'forum/memberlist.php?mode=viewprofile&un=' + encodeURIComponent(user);
  var iajax = new XMLHttpRequest();
  iajax.open('GET', iump, true);
  iajax.onreadystatechange = function() {
    if (iajax.readyState == 4) {
      var div=document.createElement('div');
      div.innerHTML = iajax.responseText;
      var wall = div.getElementsByTagName('form');
      for (var w=0; w<wall.length; w++) {
        if (wall[w].id == "viewwall") {
          if (wall[w].action.match(/u=(\d+)$/)) {
            cid = RegExp.$1;
          }
          break;
        }
      }
      if (!mopts && maplist.length == maps.length) {
        var boxes = getElementsByClassName(div,'div','panel bg1 online',true);
        if (boxes.length == 0) boxes = getElementsByClassName(div,'div','panel bg1',true);
        var dt = boxes[0].getElementsByTagName('dt');
        for (var s=0; s< dt.length; s++) {
          if (dt[s].innerHTML == "Score:") {
            totals._realscore = parseInt(nextSib(dt[s]).innerHTML);
            break;
          }
        }
      } else {
        totals._realscore = null;
      }
      getHistPage(user, maplist,1, mopts);
    }
  };
  iajax.send(null);
}

function getPlayerMedals(user) {
  var medalAlts = ['Tournament Contribution', 'Map Contribution', 'General Contribution', 'General Achievement', 'Tournament Achievement', 'Clan Achievement', 'Training Achievement'];
  var pump = baseURL + 'forum/memberlist.php?mode=viewprofile&un=' + encodeURIComponent(user);
  var majax = new XMLHttpRequest();
  majax.open('GET', pump, true);
  majax.onreadystatechange = function() {
    if (majax.readyState == 4) {
      var div=document.createElement('div');
      div.innerHTML = majax.responseText;
      var imgs = div.getElementsByTagName('img');
      for (var im=0; im<imgs.length; im++) {
        if (medalAlts.indexOf(imgs[im].alt) > -1) {
          if (imgs[im].parentNode.align == "center") {
            if (nextSib(imgs[im].parentNode.parentNode).firstChild.innerHTML.match(/Amount: (\d+)$/)) {
              var tm = new Summary(imgs[im].alt);
              tm._medals = parseInt(RegExp.$1);
              totals._medals += tm._medals;
              totals._xmedals += tm._medals;
              totals._contribute.push(tm);
            }
          }
        }
      }
    }
  };
  majax.send(null);
}

function getRandomMedals(user, page){		
    var jump = baseURL + 'api.php?mode=gamelist&mp=Random&gs=F&p1un=' + encodeURIComponent(user);
    
    if(page > 1) jump += "&page=" + page;
    ghist["rpaging" + page] = new XMLHttpRequest();
    ghist["rpaging" + page].open('GET', jump, true);
    ghist["rpaging" + page].onreadystatechange = function() {
      if (ghist["rpaging" + page].readyState == 4) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(ghist["rpaging" + page].responseText,"application/xml");
        if (dom.firstChild.children.length==0) {
            setTimeout(function () {
                getRandomMedals(user,page);
                }
            , 11000);
            return;
        }
        var games = dom.getElementsByTagName('game');
        var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;
        var numGames = parseInt(dom.getElementsByTagName('games')[0].getAttribute('total'));
        var puid = cid;
        var numPages = 1;
                
        if(pages.match(/^(\d+) of (\d+)$/)) {
		  var returned = parseInt(RegExp.$2);
          numPages = returned > 1?returned:1;
        }
        if(page == 1) {
          if(numPages > 1) {
              var pg = 2;
              var interval = setInterval(function () {
                  
                  getRandomMedals(user, pg);
                  pg++;
                  if (pg > numPages) clearInterval(interval);
                  
              },3000);
          }
        }
        
        for(var g=0; g< games.length; g++) {
            var gvalid = 1;
            var game_number = games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue;
            var players = games[g].getElementsByTagName('player');
            var gaming = games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue;
            
            var pids = [];
            for(s=0; s<players.length; s++) {
              var pid = (players[s].firstChild.nodeValue);
              pids.push(pid);
            }
          
            var winner = 0;
            var triumph = 0;
            var numTeams = 0;
            var holder = 0;
            var myLoss = 0;
            var meanwin = 0;
            var meanloss = 0;
            var beaten = 0;
            
            var winner = 0;
            var losers = [];
            var winners = [];
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
              for(var p=0; p<losers.length;p++) {
                if(totals._defeats['random'].indexOf(losers[p]) == -1) {
                  totals._defeats['random'].push(losers[p]);
                }
              }
            }
            else{
              for(var p=0; p<winners.length;p++) {
                if(totals._defeats['xRandom'].indexOf(winners[p]) == -1) {
                  totals._defeats['xRandom'].push(winners[p]);
                }
                
              }
            }
          
        }
        
        totals._rpages++;
        viewer.document.getElementById('progress').innerHTML = "Scanning Random..." + (100 * (totals._rpages)/(numPages)).toFixed(0) + "%";
        if(totals._rpages == numPages){
            endGame(user);
        }
      }
      else if (ghist["rpaging" + page].readyState == 1 && totals._rpages == 0) {
        viewer.document.getElementById('progress').innerHTML = "Scanning Random...0%";
      }
    };
    ghist["rpaging" + page].send(null);    
}

function getHistPage(user,maplist,page,mapopts) {
  var jump = baseURL + 'api.php?mode=gamelist&events=Y&gs=F&p1un=' + encodeURIComponent(user);
  if(maplist.length == 1) {
    jump += "&mp=" + maplist[0];
    if(maplist.indexOf("Random") != -1 ) random = true;
  }
  if (mapopts) {
    if (mapopts._num.length==1) jump += "&np=" + mapopts._num[0];
    if (mapopts._type.length==1) jump += "&gt=" + mapopts._type[0];
    if (mapopts._bonus.length==1) jump += "&bc=" + mapopts._bonus[0];
    if (mapopts._order.length==1) jump += "&po=" + mapopts._order[0];
    if (mapopts._troops.length==1) jump += "&it=" + mapopts._troops[0];
    if (mapopts._fort.length==1) jump += "&ft=" + mapopts._fort[0];
    if (mapopts._fog.length==1) jump += "&wf=" + mapopts._fog[0];
    if (mapopts._trench.length==1) jump += "&tw=" + mapopts._trench[0];
    if (mapopts._speed.length==1) jump += "&sg=" + mapopts._speed[0];
    if (mapopts._joinable.length==1) jump += "&pt=" + mapopts._joinable[0];
    if (mapopts._tname) jump += "&to=" + (mapopts._tname);
    if (mapopts._players['p2']) jump += "&p2=" + mapopts._players['p2'];
    if (mapopts._players['p3']) jump += "&p3=" + mapopts._players['p3'];
    if (mapopts._players['p4']) jump += "&p4=" + mapopts._players['p4'];
  }
  if (page > 1) jump += "&page=" + page;
  ghist["paging" + page] = new XMLHttpRequest();
  ghist["paging" + page].open('GET', jump, true);
  ghist["paging" + page].onreadystatechange = function() {
    if (ghist["paging" + page].readyState == 4) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(ghist["paging" + page].responseText,"application/xml");
        if (dom.firstChild.children.length==0) {
            setTimeout(function () {
                getHistPage(user,maplist,page,mapopts);
                }
            , 15000);
            return;
            
        }
      var games = dom.getElementsByTagName('game');
      var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;
      var numGames = parseInt(dom.getElementsByTagName('games')[0].getAttribute('total'));
      var puid = cid;
      var numPages = 0;

      if (totals._insignia && myStore._total && myStore._total == numGames) {
        for (var r in myStore._ranks) {
          totals._maps++;
          totals._wins += myStore._ranks[r]._wins;
          for (var p=0; p< myStore._unique[r].length; p++) {
            if (totals._unique.indexOf(myStore._unique[r][p]) == -1) {
              totals._unique.push(myStore._unique[r][p]);
            }
          }
          for (d in myStore._ranks[r]._defeats) {
            for (var p=0; p< myStore._ranks[r]._defeats[d].length; p++) {
              if (totals._defeats[d].indexOf(myStore._ranks[r]._defeats[d][p]) == -1) {
                totals._defeats[d].push(myStore._ranks[r]._defeats[d][p]);
              }
            }
          }
          if (myStore._ranks[r]._parray != undefined) {
            for (var p=0; p< myStore._ranks[r]._parray.length; p++) {
              totals._parray.push(myStore._ranks[r]._parray[p]);
            }
          } else {
            myStore._ranks[r]._parray = [];
          }
          if (myStore._ranks[r]._warray != undefined) {
            for (var p=0; p< myStore._ranks[r]._warray.length; p++) {
              totals._warray.push(myStore._ranks[r]._warray[p]);
            }
          } else {
            myStore._ranks[r]._warray = [];
          }
          if (myStore._ranks[r]._kills)
            totals._kills += myStore._ranks[r]._kills;
          if (myStore._ranks[r]._beaten){
            totals._meanwin += myStore._ranks[r]._meanwin;
            totals._beaten += myStore._ranks[r]._beaten;
          }
          totals._games+=myStore._ranks[r]._counter;
          ranks[r] = myStore._ranks[r];
          unique[r] = myStore._unique[r];
        }
        totals._counter = myStore._total;
		getRandomMedals(user, 1);
      } else {
        if (pages.match(/^(\d+) of (\d+)$/)) {
          numPages = parseInt(RegExp.$2);
          if (!totals._expected) totals._expected = numPages;
        }
        if (page == 1) {
          if (numPages > 1) {
              var pg = 2;
              var interval = setInterval(function () {
                  
                  getHistPage(user,maplist, pg, mapopts);
                  pg++;
                  if (pg > numPages) clearInterval(interval);
                  
              },3000);
          }
        }

        for (var g=0; g< games.length; g++) {
          var gvalid = 1;
          var mapname = games[g].getElementsByTagName('map')[0].firstChild.nodeValue;
          var players = games[g].getElementsByTagName('player');
          var gaming = games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue;
          var touring = "";
          if (games[g].getElementsByTagName('tournament')[0].firstChild)
            touring = games[g].getElementsByTagName('tournament')[0].firstChild.nodeValue;
          var joinable = games[g].getElementsByTagName('private')[0].firstChild.nodeValue;
          var speeding = games[g].getElementsByTagName('speed_game')[0].firstChild.nodeValue;
          var ordering = games[g].getElementsByTagName('play_order')[0].firstChild.nodeValue;
          var troops = games[g].getElementsByTagName('initial_troops')[0].firstChild.nodeValue;
          var cards = games[g].getElementsByTagName('bonus_cards')[0].firstChild.nodeValue;
          var fort = games[g].getElementsByTagName('fortifications')[0].firstChild.nodeValue;
          var fog = games[g].getElementsByTagName('war_fog')[0].firstChild.nodeValue;
          var trench = games[g].getElementsByTagName('trench_warfare')[0].firstChild.nodeValue;
          var pids = [];
          for (s=0; s<players.length; s++) {
            var pid = (players[s].firstChild.nodeValue);
            pids.push(pid);
          }
          if (maplist.indexOf(mapname) == -1) gvalid = 0;
          if (mapopts) {
            if (mapopts._num.length && mapopts._num.indexOf('' + players.length) == -1) gvalid = 0;
            if (mapopts._type.length && mapopts._type.indexOf(gaming) == -1) gvalid = 0;
            if (mapopts._bonus.length && mapopts._bonus.indexOf(cards) == -1) gvalid = 0;
            if (mapopts._order.length && mapopts._order.indexOf(ordering) == -1) gvalid = 0;
            if (mapopts._troops.length && mapopts._troops.indexOf(troops) == -1) gvalid = 0;
            if (mapopts._fort.length && mapopts._fort.indexOf(fort) == -1) gvalid = 0;
            if (mapopts._fog.length && mapopts._fog.indexOf(fog) == -1) gvalid = 0;
            if (mapopts._trench.length && mapopts._trench.indexOf(trench) == -1) gvalid = 0;
            if (mapopts._joinable.length && (mapopts._joinable.indexOf('T') == -1) && (touring || mapopts._joinable.indexOf(joinable) == -1)) gvalid = 0;
            if (mapopts._joinable.length && (mapopts._joinable.indexOf('T') != -1) && !touring) gvalid = 0;
            if (mapopts._speed.length && mapopts._speed.indexOf(speeding) == -1) gvalid = 0;
            if (mapopts._tname && !touring)  gvalid = 0;
            if (mapopts._tname && touring && mapopts._tname.toUpperCase() != touring.split(' - ')[0].toUpperCase())  gvalid = 0;
            if (mapopts._players['v1'] && pids.indexOf(mapopts._players['v1']) == -1) gvalid = 0;
            if (mapopts._players['v2'] && pids.indexOf(mapopts._players['v2']) == -1) gvalid = 0;
            if (mapopts._players['v3'] && pids.indexOf(mapopts._players['v3']) == -1) gvalid = 0;
            if (mapopts._players['v4'] && pids.indexOf(mapopts._players['v4']) == -1) gvalid = 0;
            if (mapopts._players['p2'] && pids.indexOf(mapopts._players['p2']) == -1) gvalid = 0;
            if (mapopts._players['p3'] && pids.indexOf(mapopts._players['p3']) == -1) gvalid = 0;
            if (mapopts._players['p4'] && pids.indexOf(mapopts._players['p4']) == -1) gvalid = 0;
            if (gaming == 'P') {
                
            }
            if (gaming == 'D' || gaming == 'T' || gaming == 'Q') {
              if (mapopts._players['v1'] && Math.floor(pids.indexOf(mapopts._players['v1']) / modulo[gaming]) == Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
              if (mapopts._players['v2'] && Math.floor(pids.indexOf(mapopts._players['v2']) / modulo[gaming]) == Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
              if (mapopts._players['v3'] && Math.floor(pids.indexOf(mapopts._players['v3']) / modulo[gaming]) == Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
              if (mapopts._players['v4'] && Math.floor(pids.indexOf(mapopts._players['v4']) / modulo[gaming]) == Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
              if (mapopts._players['p2'] && Math.floor(pids.indexOf(mapopts._players['p2']) / modulo[gaming]) != Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
              if (mapopts._players['p3'] && Math.floor(pids.indexOf(mapopts._players['p3']) / modulo[gaming]) != Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
              if (mapopts._players['p4'] && Math.floor(pids.indexOf(mapopts._players['p4']) / modulo[gaming]) != Math.floor(pids.indexOf(puid) / modulo[gaming])) gvalid = 0;
            }
            else{
              if (mapopts._players['p2'] && pids.indexOf(mapopts._players['p2']) != -1) gvalid = 0;
            }
            if (mapopts._players['x1'] && pids.indexOf(mapopts._players['x1']) != -1) gvalid = 0;
            if (mapopts._players['x2'] && pids.indexOf(mapopts._players['x2']) != -1) gvalid = 0;
            if (mapopts._players['x3'] && pids.indexOf(mapopts._players['x3']) != -1) gvalid = 0;
            if (mapopts._players['x4'] && pids.indexOf(mapopts._players['x4']) != -1) gvalid = 0;
          }
          if (gvalid) {
            if (!ranks[mapname]) {
              ranks[mapname] = new Rank();
              ranks[mapname]._wins = 0;
              unique[mapname] = [];
              ranks[mapname]._rank = 1000;
              totals._maps++;
            }
            var winner = 0;
            var triumph = 0;
            var numTeams = 0;
            var holder = 0;
            var myLoss = 0;
            var meanwin = 0;
            var meanloss = 0;
            var beaten = 0;
            var pfirst = 0;
            if (games[g].getElementsByTagName('first').length)
              pfirst = parseInt(games[g].getElementsByTagName('first')[0].firstChild.nodeValue);
            var winner = 0;
            var losers = [];
            var winners = [];
            for (s=0; s<players.length; s++) {
              var pid = (players[s].firstChild.nodeValue);
              if (players[s].getAttribute('state') == "Won") {
                triumph = pid;
                if (triumph == puid) {
                  ranks[mapname]._wins++;
                  winner = 1;
                  if (gaming == 'P') break;
                }
                if (pid != puid) winners.push(pid);
              }
              else{
                if (pid != puid) losers.push(pid);
              }
            }
            var reallosers = winner? losers.length : losers.length + 1;
            numTeams = players.length / (players.length - reallosers);
            var maxLosers = players.length - (players.length / numTeams);
            if (winner) {
              if (numTeams < players.length) {
                ranks[mapname]._kills += numTeams - 1;
                totals._kills += numTeams - 1;
              } else {
                ranks[mapname]._kills += players.length - 1;
                totals._kills += players.length - 1;
              }
              for (var p=0; p<losers.length;p++) {
                pushUnique(unique[mapname],losers[p]);
                var gt = findKeyByValue(gm, games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue);
                pushUnique(totals._defeats[gt],losers[p]);
                pushUnique(ranks[mapname]._defeats[gt],losers[p]);
                if (games[g].getElementsByTagName('speed_game')[0].firstChild.nodeValue != "N"){
                  pushUnique(totals._defeats['speed'],losers[p]);
                  pushUnique(ranks[mapname]._defeats['speed'],losers[p]);
                }
                if (games[g].getElementsByTagName('play_order')[0].firstChild.nodeValue == "F"){
                  pushUnique(totals._defeats['freestyle'],losers[p]);
                  pushUnique(ranks[mapname]._defeats['freestyle'],losers[p]);
                }
                if (games[g].getElementsByTagName('war_fog')[0].firstChild.nodeValue == "Y"){
                  pushUnique(totals._defeats['fog'],losers[p]);
                  pushUnique(ranks[mapname]._defeats['fog'],losers[p]);
                }               
                if (games[g].getElementsByTagName('initial_troops')[0].firstChild.nodeValue == "M"){
                  pushUnique(totals._defeats['manual'],losers[p]);
                  pushUnique(ranks[mapname]._defeats['manual'],losers[p]);
                }
                if (games[g].getElementsByTagName('bonus_cards')[0].firstChild.nodeValue == "4"){
                  pushUnique(totals._defeats['nuclear'],losers[p]);
                  pushUnique(ranks[mapname]._defeats['nuclear'],losers[p]);
                }
                if (games[g].getElementsByTagName('trench_warfare')[0].firstChild.nodeValue == "Y"){
                  pushUnique(totals._defeats['trench'],losers[p]);
                  pushUnique(ranks[mapname]._defeats['trench'],losers[p]);
                }                 
                pushUnique(totals._unique,losers[p]);
              }
              totals._wins++;
            } else{
              for (var p = 0; p<winners.length;p++) {
                var gt = findKeyByValue(gm, games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue);
                gt = gt.slice(0,1).toUpperCase() + gt.slice(1);
                pushUnique(totals._defeats['x' + gt],winners[p]);
                pushUnique(ranks[mapname]._defeats['x' + gt],winners[p]);
                if (games[g].getElementsByTagName('speed_game')[0].firstChild.nodeValue == "Y"){
                  pushUnique(totals._defeats.xSpeed,winners[p]);
                  pushUnique(ranks[mapname]._defeats.xSpeed,winners[p]);
                }
                if (games[g].getElementsByTagName('play_order')[0].firstChild.nodeValue == "F"){
                  pushUnique(totals._defeats.xFreestyle,winners[p]);
                  pushUnique(ranks[mapname]._defeats.xFreestyle,winners[p]);
                }
                if (games[g].getElementsByTagName('war_fog')[0].firstChild.nodeValue == "Y"){
                  pushUnique(totals._defeats.xFog,winners[p]);
                  pushUnique(ranks[mapname]._defeats.xFog,winners[p]);
                }             
                if (games[g].getElementsByTagName('initial_troops')[0].firstChild.nodeValue == "M"){
                  pushUnique(totals._defeats.xManual,winners[p]);
                  pushUnique(ranks[mapname]._defeats.xManual,winners[p]);
                }
                if (games[g].getElementsByTagName('bonus_cards')[0].firstChild.nodeValue == "4"){
                  pushUnique(totals._defeats.xNuclear,winners[p]);
                  pushUnique(ranks[mapname]._defeats.xNuclear,winners[p]);
                }
                if (games[g].getElementsByTagName('trench_warfare')[0].firstChild.nodeValue == "Y"){
                  pushUnique(totals._defeats.xTrench,winners[p]);
                  pushUnique(ranks[mapname]._defeats.xTrench,winners[p]);
                }                   
              }
            }
            if (pfirst) {
              if (pfirst == puid) {
                ranks[mapname]._firsts++;
                totals._firsts++;
                if (winner) {
                  ranks[mapname]._wonfirsts++;
                  totals._wonfirsts++;
                }
              }
            }
            if (games[g].getElementsByTagName('game_type')[0].firstChild.nodeValue != "C"){
              if (games[g].getElementsByTagName('events')[0]) {
                var events = games[g].getElementsByTagName('events')[0].getElementsByTagName('event');
                if (events.length) {
                  for (e=0; e<events.length; e++) {
                    if (events[e].firstChild.nodeValue.match(/^(\d+) gains (\d+) points$/)) {
                      var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
                      var gain = parseInt(RegExp.$2);
                      var ply = parseInt(RegExp.$1);
                      if (pids[ply - 1] == puid) {
                        ranks[mapname]._rank += gain;
                        pt = new Point(tim, gain);
                        totals._parray.push(pt);
                        ranks[mapname]._parray.push(pt);
                        meanwin += gain;
                        if (!holder) {
                          wl = new Point(tim, 1);
                          totals._warray.push(wl);
                          ranks[mapname]._warray.push(wl);
                          holder = tim;
                        }
                        beaten++;
                      }
                      else{
                        if (!holder) {
                          if (winner)
                            wl = new Point(tim, 1);
                          else
                            wl = new Point(tim, -1);
                          totals._warray.push(wl);
                          ranks[mapname]._warray.push(wl);
                          holder = tim;
                        }
                      }
                    }
                    else if (events[e].firstChild.nodeValue.match(/^(\d+) loses (\d+) points$/)) {
                      var loss = parseInt(RegExp.$2);
                      var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
                      var ply = parseInt(RegExp.$1);
                      meanloss += loss;
                      if (pids[ply - 1] == puid) {
                        ranks[mapname]._rank -= loss;
                        pt = new Point(tim, -loss);
                        totals._parray.push(pt);
                        ranks[mapname]._parray.push(pt);
                        myLoss = loss;
                      }
                    }
                  }
                  if (winner) {
                    if (numTeams < players.length) {
                      ranks[mapname]._meanwin += (players.length / numTeams) * meanwin / 20;
                      totals._meanwin += (players.length / numTeams) * meanwin / 20;
                      ranks[mapname]._beaten += maxLosers;
                      totals._beaten += maxLosers;
                    }
                    else{
                      ranks[mapname]._meanwin += meanwin / 20;
                      totals._meanwin += meanwin / 20;
                      ranks[mapname]._beaten += (players.length - 1);
                      totals._beaten += (players.length - 1);
                    }
                  }
                  else{
                    if (numTeams < players.length) {
                      if (myLoss) {
                        ranks[mapname]._meanwin += (((meanloss + (20 * (players.length / numTeams) * (players.length / numTeams))) / ((players.length / numTeams) * myLoss)) - 1);
                        totals._meanwin += (((meanloss + (20 * (players.length / numTeams) * (players.length / numTeams))) / ((players.length / numTeams) * myLoss)) - 1);
                        ranks[mapname]._beaten += maxLosers;
                        totals._beaten += maxLosers;
                      }
                      else{
                        ranks[mapname]._missing++;
                        ranks[mapname]._games.push(parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue));
                      }
                    }
                    else{
                      if (myLoss) {
                        ranks[mapname]._meanwin += (((meanloss + 20) / myLoss) - 1);
                        totals._meanwin += (((meanloss + 20) / myLoss) - 1);
                        ranks[mapname]._beaten += (players.length - 1);
                        totals._beaten += (players.length - 1);
                      }
                      else{
                        ranks[mapname]._missing++;
                        ranks[mapname]._games.push(parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue));
                      }
                    }
                  }
                }
                else{
                  ranks[mapname]._missing++;
                  ranks[mapname]._games.push(parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue));
                }
              }
              else{
                ranks[mapname]._missing++;
                ranks[mapname]._games.push(parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue));
              }
            }
            else{
              var mapwin = {};
              var maploss = {};
              if (games[g].getElementsByTagName('events')[0]) {
                var events = games[g].getElementsByTagName('events')[0].getElementsByTagName('event');
                if (events.length) {
                  for (e=0; e<events.length; e++) {
                    if (events[e].firstChild.nodeValue.match(/^(\d+) eliminated (\d+)/)) {
                      fred = pids[parseInt(RegExp.$1) - 1];
                      barn = pids[parseInt(RegExp.$2) - 1];
                      if (!mapwin[fred]) mapwin[fred] = new Pinfo();
                      if (!maploss[barn]) maploss[barn] = new Pinfo();
                      mapwin[fred]._defeats[barn] = 1;
                      maploss[barn]._defeats[fred] = 1;
                    }
                    else if (events[e].firstChild.nodeValue.match(/^(\d+) was kicked out$/)) {
                      fred = pids[parseInt(RegExp.$1) - 1];
                      if (!maploss[fred]) {
                        maploss[fred] = new Pinfo();
                        maploss[fred]._defeats[triumph] = 1;
                        if (!mapwin[triumph])
                          mapwin[triumph] = new Pinfo();
                        mapwin[triumph]._defeats[fred] = 1;
                      }
                    }
                  }
                  for (e=0; e<events.length; e++) {
                    if (events[e].firstChild.nodeValue.match(/^(\d+) gains (\d+) points$/)) {
                      var gain = parseInt(RegExp.$2);
                      var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
                      var ply = parseInt(RegExp.$1);
                      if (pids[ply - 1] == puid) {
                        ranks[mapname]._rank += gain;
                        pt = new Point(tim, gain);
                        totals._parray.push(pt);
                        ranks[mapname]._parray.push(pt);
                        meanwin += gain;
                        if (!holder) {
                          wl = new Point(tim, 1);
                          totals._warray.push(wl);
                          ranks[mapname]._warray.push(wl);
                          holder = tim;
                        }
                        beaten++;
                      }
                      else{
                        if (!holder) {
                          if (winner)
                            wl = new Point(tim, 1);
                          else
                            wl = new Point(tim, -1);
                          totals._warray.push(wl);
                          ranks[mapname]._warray.push(wl);
                          holder = tim;
                        }
                      }
                    }
                    else if (events[e].firstChild.nodeValue.match(/^(\d+) loses (\d+) points$/)) {
                      var loss = parseInt(RegExp.$2);
                      var tim = parseInt(events[e].getAttribute("timestamp")) * 1000;
                      barn = pids[parseInt(RegExp.$1) - 1];
                      if (!maploss[barn]) {
                        maploss[barn] = new Pinfo();
                        maploss[barn]._defeats[triumph] = 1;
                        if (!mapwin[triumph])
                          mapwin[triumph] = new Pinfo();
                        mapwin[triumph]._defeats[barn] = 1;
                      }
                      for (var w in maploss[barn]._defeats) {
                        maploss[barn]._defeats[w] = loss/20;
                        mapwin[w]._defeats[barn] = loss/20;
                      }
                      meanloss += loss;
                      if (barn == puid) {
                        ranks[mapname]._rank -= loss;
                        pt = new Point(tim, -loss);
                        totals._parray.push(pt);
                        ranks[mapname]._parray.push(pt);
                        myLoss = loss;
                      }
                    }
                  }
                  var target = puid;
                  if (winner) {
                    var overall = 0
                    ranks[mapname]._meanwin += overall;
                    totals._meanwin += overall;
                    ranks[mapname]._beaten += (players.length - 1);
                    totals._beaten += (players.length - 1);
                  }
                  else{
                    var overall = 20 * 0
                    myLoss = 20 * 0
                    if (myLoss) {
                      var collect = (((overall + 20) / myLoss) - 1);
                      ranks[mapname]._meanwin += collect;
                      totals._meanwin += collect;
                      ranks[mapname]._beaten += (players.length - 1);
                      totals._beaten += (players.length - 1);
                    }
                    else{
                      ranks[mapname]._missing++;
                      ranks[mapname]._games.push(parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue));
                    }
                  }
                }
                else{
                  ranks[mapname]._missing++;
                  ranks[mapname]._games.push(parseInt(games[g].getElementsByTagName('game_number')[0].firstChild.nodeValue));
                }
              }
            }
            totals._games++;
            ranks[mapname]._counter++;
          }
        }
        totals._pages++;
        totals._counter += games.length;
        viewer.document.getElementById('progress').innerHTML = "Scanning..." + (100 * (totals._pages)/(numPages)).toFixed(0) + "%";
        if (totals._pages == numPages && totals._counter == numGames) {
          if (totals._insignia) {
            for (var m in ranks) {
              myStore._ranks[m] = ranks[m];
              myStore._unique[m] = unique[m];
            }
          }
          getRandomMedals(user, 1);
        }
      }
    }
    else if (ghist["paging" + page].readyState == 1 && totals._pages == 0) {
      viewer.document.getElementById('progress').innerHTML = "Scanning...0%";
    }
  };
  ghist["paging" + page].send(null);
}

function getRatings(user,url,page) {		
  var jump = url;
  if (page > 1) jump += "&page=" + page;
  rateReq[page] = new XMLHttpRequest();
  rateReq[page].open('GET', jump, true);
  rateReq[page].onreadystatechange = function() {
    if (rateReq[page].readyState == 4) {
      var div=document.createElement('div');
      div.innerHTML = rateReq[page].responseText;
      var results = getElementsByClassName(div,'span','search_results',true);
      if (results.length && results[0].innerHTML.match(/(\d+) results on (\d+) pages/)) {
        var numGames = parseInt(RegExp.$1);
        var thisPage = parseInt(RegExp.$2);
        var rates = getElementsByClassName(div,'a','rating',true);
        for (var r=0; r<rates.length;r++) {
          var aind = rates[r].parentNode.getElementsByTagName('a')[0];
          if (aind.href.match(/u=(.+?)$/)) {
            var names = RegExp.$1;
            pushUnique(totals._defeats['rating'],names);
          }
        }
        if (page == 1) {
          if (thisPage > 1) {
            for (var pg=2;pg<=thisPage;pg++) {
              getRatings(user,url,pg);
            }
          }
        }
        if (page == thisPage && viewer.document.getElementById('rated')) {
          viewer.document.getElementById('rated').innerHTML = '' + totals._defeats['rating'].length + " Rated Players";
        }
      }
    }
  };
  rateReq[page].send(null);
}

function getXRatings(user,url,page) {		
  var jump = url;
  if (page > 1) jump += "&page=" + page;
  xrateReq[page] = new XMLHttpRequest();
  xrateReq[page].open('GET', jump, true);
  xrateReq[page].onreadystatechange = function() {
    if (xrateReq[page].readyState == 4) {
      var div=document.createElement('div');
      div.innerHTML = xrateReq[page].responseText;
      var results = getElementsByClassName(div,'span','search_results',true);
      if (results.length && results[0].innerHTML.match(/(\d+) results on (\d+) pages/)) {
        var numGames = parseInt(RegExp.$1);
        var thisPage = parseInt(RegExp.$2);
        var rates = getElementsByClassName(div,'a','rating',true);
        for (var r=0; r<rates.length;r++) {
          var aind = rates[r].parentNode.getElementsByTagName('a')[0];
          if (aind.href.match(/u=(.+?)$/)) {
            var names = RegExp.$1;
            pushUnique(totals._defeats['xRating'],names);
          }
        }
        if (page == 1) {
          if (thisPage > 1) {
            for (var pg=2;pg<=thisPage;pg++) {
              getXRatings(user,url,pg);
            }
          }
        }
      }
    }
  };
  xrateReq[page].send(null);
}

var leftBar = document.getElementById("leftColumn");
if (leftBar) {
  var ul = leftBar.getElementsByTagName("ul");
  if (ul[0]) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://raw.github.com/sherkaner/addons-for-Conquerclub/master/currentVersions.json',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html'
      },
      onload: function(responseDetails) {
        updateInfo = JSON.parse(responseDetails.responseText),
        		latest = updateInfo["Map Rank"].split('.'),
            ver = versiont.split('.');
        latestVersiont = (((parseInt(latest[0]) * 10000) + (parseInt(latest[1]) * 100) + parseInt(latest[2])) > ((parseInt(ver[0]) * 10000) + (parseInt(ver[1]) * 100) + parseInt(ver[2])));
        if (latestVersiont) {
        	var toUpdate = document.querySelector('#tlatest span');
        	toUpdate.textContent = "Update Available";
        	toUpdate.className = "attention";
        }
      }
    });
    GM_addStyle("#phistory {z-index:2000;color:#000;width:165px;position:absolute;background-color:#FFF;text-align:left;border:1px solid #000;visibility:hidden;}\
	.history_link {background-color: #FFFFFF;padding: 2px 6px 2px 6px;} .history_link_over {background-color: #3366CC; padding: 2px 6px 2px 6px;}\
	#player {width:159px;border:1px solid #000;} #map{width:167px;border-width:1px} .fieldx {width:10em;border: 1px solid #565}");
    var rt = GM_getValue('ratings');
    if (rt == undefined) {
      GM_setValue('ratings',ratings);
    } else{
      ratings = rt;
    }
    var hist = GM_getValue('phist');
    if (hist == undefined) {
      GM_setValue('phist',phist);
    } else{
      phist = hist;
    }
    var ic = GM_getValue('icons');
    if (ic == undefined) {
      GM_setValue('icons',icons);
    } else {
      icons = ic;
    }
    var dk = GM_getValue('dark');
    if (dk == undefined) {
      GM_setValue('dark',dark);
    } else {
      dark = dk;
    }
    myDefeats = deserialize('defeats', new Defeats());
    if (myDefeats && (icons || dark)) {
      if (/player.php\?mode=find/.test(window.location.href) || /player.php\?mode=mygames/.test(window.location.href) ||
        /player.php\?submit=Search/.test(window.location.href) || /player.php\?mode=join/.test(window.location.href) ||
        /player.php\?mode=next/.test(window.location.href)) {
        var uls = getElementsByClassName(document,'ul','players',true);
        for (var u=0; u<uls.length; u++) {
          var lis = uls[u].getElementsByTagName('li');
          for (var l=0; l< lis.length;l++){
            if (!lis[l].innerHTML.match(/<b>Team (\d):/) && !lis[l].innerHTML.match(/-empty-/) && !lis[l].innerHTML.match(/-reserved-/)) {
              var anc = lis[l].getElementsByTagName('a');
              if (anc.length && anc[0].href.match(/u=(\d+)$/)) {
                var names = RegExp.$1;
                for (def in myDefeats) {
                  var imgtitle = "";
                  if (myDefeats[def].indexOf(names) != -1) {
                    if (def == "rating" && icons) {
                      imgtitle = "Already Rated for " + def + " medal (from Map Rank)";
                    } else if (def == "xRating" && dark) {
                      imgtitle = "Received Rating (from Map Rank)";
                    } else if (def.charAt(0) == 'x' && dark) {
                      var defx = def.replace(/x/, '');
                      imgtitle = defx + " Loss (from Map Rank)";
                    } else if (def.charAt(0) != 'x' && icons) {
                      imgtitle = "Already Defeated for " + def + " medal (from Map Rank)";
                    }
                    if (imgtitle != "") {
                      var img = lis[l].appendChild(document.createElement('img'));
                      img.src = "http://i1159.photobucket.com/albums/p625/TheBluU/cc/" + def + ".png";
                      img.style.verticalAlign = "middle";
                      img.title = imgtitle;
                    }
                  }
                }
              }
            }
          }
        }
      }

      var findPage = /www.conquerclub.com\/player.php\?mode=find/.test(window.location.href) && !(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href));
      var startPage = /www.conquerclub.com\/player.php\?mode=start/.test(window.location.href);

      if ((findPage || startPage) && document.getElementsByTagName('fieldset').length) {
        nextSib(document.getElementsByName('sg[]')[1]).innerHTML += "<span class='player3' title='Defeated opponents For speed Medal (from Map Rank)'>(" + myDefeats['speed'].length + ")</span>";
        nextSib(document.getElementsByName('po[]')[1]).innerHTML += "<span class='player3' title='Defeated opponents For freestyle Medal (from Map Rank)'>(" + myDefeats['freestyle'].length + ")</span>";
        nextSib(document.getElementsByName('wf[]')[1]).innerHTML += "<span class='player3' title='Defeated opponents For fog Medal (from Map Rank)'>(" + myDefeats['fog'].length + ")</span>";        
        nextSib(document.getElementsByName('it[]')[1]).innerHTML += "<span class='player3' title='Defeated opponents For manual Troops Medal (from Map Rank)'>(" + myDefeats['manual'].length + ")</span>";
        nextSib(document.getElementsByName('bc[]')[2]).innerHTML += "<span class='player3' title='Defeated opponents For nuclear Medal (from Map Rank)'>(" + myDefeats['nuclear'].length + ")</span>";
        nextSib(document.getElementsByName('tw[]')[1]).innerHTML += "<span class='player3' title='Defeated opponents For trench Medal (from Map Rank)'>(" + myDefeats['trench'].length + ")</span>";
        var gtDiv = document.getElementsByName('gt[]');
        for (gt=0; gt< gtDiv.length;gt++) {
          var name = nextSib(gtDiv[gt]).innerHTML;
          if (myDefeats[name])
            nextSib(gtDiv[gt]).innerHTML += "<span class='player3' title='Defeated Opponents For " + name + " Medal (from Map Rank)'>(" + myDefeats[name].length + ")</span>";
        }
      }
    }
    if (/www.conquerclub.com\/forum\/memberlist.php\?mode=viewprofile/.test(window.location.href)) {
      var boxes = getElementsByClassName(document,'div','panel bg1 online',true);
      if (boxes.length == 0) boxes = getElementsByClassName(document,'div','panel bg1',true);
      var h2 = document.getElementsByTagName('h2')[0];
      var profname = h2.innerHTML.match(/Viewing profile - (.+?)$/);
      var prof = RegExp.$1;
      var an = document.createElement ('input');
      an.id = "profrank";
      an.type = "button";
      an.value = "Map Rank " + prof;
      boxes[0].appendChild(an);
      an.addEventListener("click" , function() {
        createBox("Collecting Games", prof, '');
        var insignia = 0;
        var logout = getElementsByClassName(document,'div','vnav',true);
        var para = logout[0].getElementsByTagName('a');
        if (para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
          var mine = RegExp.$1;
          if (prof.match(mine, "i")) {
            insignia = 1;
            myStore = deserialize('store', new Store());
            if (!myStore) {
              myStore = new Store();
              myDefeats = new Defeats();
            }
          }
        }
        totals = new Totals(insignia);
        if (ratings) getRatings(prof,baseURL + 'player.php?mode=ratings2&username=' + encodeURIComponent(prof),1);
        if (ratings) getXRatings(prof,baseURL + 'player.php?mode=ratings1&username=' + encodeURIComponent(prof),1);
        ranks = {};
        unique = {};
        surl = "|||||||";
        getPlayerMedals(prof);
        getPlayerId(prof, maps);
      }
      , true);
      var logout = getElementsByClassName(document,'div','vnav',true);
      var para = logout[0].getElementsByTagName('a');
      if (para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
        var mine = RegExp.$1;
        if (!prof.match(mine, "i")) {
          var van = document.createElement ('input');
          van.type = "button";
          van.id = "profvs";
          van.value = "Map Rank vs.";
          boxes[0].appendChild(van);
          van.addEventListener("click" , function() {
            var link = baseURL + "player.php?submit=Search&game_status=F&player1=" + encodeURIComponent(prof);
            var mopts = new MapOpts('','','','','','','','','','','', prof, '', '', '', '', '', '', '', '', '', '');
            createBox("Collecting Games", mine, "<span class=rankoptions>vs. <b>" + prof + "</b></span> ");
            totals = new Totals(0);
            ranks = {};
            unique = {};
            pcount = 0;
            surl = "";
            getPlayerPage (mine, maps, mopts, 'v1');
          }
          , true);

        }
      }
    }

    if (/www.conquerclub.com\/player.php\?mode=find/.test(window.location.href) && !(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href))) {
      if (document.getElementsByTagName('fieldset').length){
        var v1 = document.getElementById('player1');
        var x1 = document.createElement('span');
        v1.parentNode.appendChild(x1);
        x1.innerHTML = '&nbsp;<b>Map Rank</b> vs.&nbsp;';
        y1 = document.createElement('input');
        y1.type = "text";
        y1.id = "versus1";
        y1.className = "fieldx";
        v1.className = "fieldx";
        v1.parentNode.appendChild(y1);
        var ex1 = document.createElement('span');
        v1.parentNode.appendChild(ex1);
        ex1.innerHTML = '&nbsp;Exclude&nbsp;';
        ey1 = document.createElement('input');
        ey1.type = "text";
        ey1.id = "exclude1";
        ey1.className = "fieldx";
        v1.parentNode.appendChild(ey1);
        var v2 = document.getElementById('player2');
        var x2 = document.createElement('span');
        v2.parentNode.appendChild(x2);
        x2.innerHTML = '&nbsp;<b>Map Rank</b> vs.&nbsp;';
        y2 = document.createElement('input');
        y2.type = "text";
        y2.id = "versus2";
        y2.className = "fieldx";
        v2.className = "fieldx";
        v2.parentNode.appendChild(y2);
        var ex2 = document.createElement('span');
        v2.parentNode.appendChild(ex2);
        ex2.innerHTML = '&nbsp;Exclude&nbsp;';
        ey2 = document.createElement('input');
        ey2.type = "text";
        ey2.id = "exclude2";
        ey2.className = "fieldx";
        v2.parentNode.appendChild(ey2);
        var v3 = document.getElementById('player3');
        var x3 = document.createElement('span');
        v3.parentNode.appendChild(x3);
        x3.innerHTML = '&nbsp;<b>Map Rank</b> vs.&nbsp;';
        y3 = document.createElement('input');
        y3.type = "text";
        y3.id = "versus3";
        y3.className = "fieldx";
        v3.className = "fieldx";
        v3.parentNode.appendChild(y3);
        var ex3 = document.createElement('span');
        v3.parentNode.appendChild(ex3);
        ex3.innerHTML = '&nbsp;Exclude&nbsp;';
        ey3 = document.createElement('input');
        ey3.type = "text";
        ey3.id = "exclude3";
        ey3.className = "fieldx";
        v3.parentNode.appendChild(ey3);
        var v4 = document.getElementById('player4');
        var x4 = document.createElement('span');
        v4.parentNode.appendChild(x4);
        x4.innerHTML = '&nbsp;<b>Map Rank</b> vs.&nbsp;';
        y4 = document.createElement('input');
        y4.type = "text";
        y4.id = "versus4";
        y4.className = "fieldx";
        v4.parentNode.appendChild(y4);
        var ex4 = document.createElement('span');
        v4.parentNode.appendChild(ex4);
        ex4.innerHTML = '&nbsp;Exclude&nbsp;';
        ey4 = document.createElement('input');
        ey4.type = "text";
        ey4.id = "exclude4";
        ey4.className = "fieldx";
        v4.className = "fieldx";
        v4.parentNode.appendChild(ey4);
        var buttonDiv = document.getElementsByTagName('fieldset')[0].appendChild(document.createElement('div'));
        buttonDiv.className = "field-row";
        buttonDiv.id = "maprankbox";
        buttonDiv.innerHTML = "<span class=field-label>Map Rank Loading...</span>";
      }
    }
    window.addEventListener("unload" , cleanup, false);
    GM_xmlhttpRequest({
      method: 'GET',
      url: baseURL + 'api.php?mode=maplist&nocache=' + Math.random(),
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html'
      },
      onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        var mapxml = dom.getElementsByTagName('title');
        var gmMenu = document.createElement('div');
        gmMenu.id="missed";
        var html = "<h3><b>Map Rank GL <span style='font-size:7pt;' ><a href='" + baseURL + "forum/viewtopic.php?f=59&t=100479'>" + versiont + "</a></span></b></h3><span style='margin-left:0.5mm;'>Player</span><input type=text id=player /><div id=phistory></div><span style='margin-left:0.5mm;'>Map</span><select name=map id=map>";
        html += "<option selected>All</option>";
        for (var i=0; i< mapxml.length; i++) {
          maps[i] = mapxml[i].firstChild.nodeValue;
          html += "<option>" + maps[i] + "</option>";
        }
        html += "</select>";
        gmMenu.innerHTML = html;
        ul[0].parentNode.appendChild(gmMenu);
        document.getElementById('player').addEventListener('keypress', function(event) {
          event.stopPropagation();
        }, false);
        document.getElementById('player').addEventListener('keyup', function(event) {
          event.stopPropagation();
          key(this,event);
        }, false);
        document.getElementById('player').addEventListener('blur', function(event) {
          event.stopPropagation();
          setTimeout(function() {
            clearSuggest();
          },200);
        }, false);
        ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px 0px 1px";
        ul.innerHTML += "<li><a href=\"javascript:void(0);\" id=rank >Map Rank</a></li>";
        gmMenu.appendChild(ul);
        ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px 0px 1px";
        var inner = "<li><a href='javascript:void(0);' onclick=\"document.getElementById('speed').style.display=(document.getElementById('speed').style.display == ''? 'none':'');\"><span>Options</span></a></li>";
        inner += "<div id=\"speed\" style=\"display:none\">";
        inner += "<input id=\"ratings\" type=\"checkbox\" name=\"ratings\"" + ((ratings)? " checked":"") + ">Ratings<br />";
        inner += "<input id=\"icons\" type=\"checkbox\" name=\"icons\"" + ((icons)? " checked":"") + ">Display Icons<br />";
        inner += "<input id=\"dark\" type=\"checkbox\" name=\"dark\"" + ((dark)? " checked":"") + ">Display Dark Icons";
        inner += "<li></li></div>";
        ul.innerHTML = inner;
        gmMenu.appendChild(ul);
        document.getElementById('ratings').addEventListener("click" , function () {
          ratings = (this.checked == true)? 1:0;
          GM_setValue('ratings',ratings);
        }, true);
        document.getElementById('icons').addEventListener("click" , function () {
          icons = (this.checked == true)? 1:0;
          GM_setValue('icons',icons);
        }, true);
        document.getElementById('dark').addEventListener("click" , function () {
          dark = (this.checked == true)? 1:0;
          GM_setValue('dark',dark);
        }, true);
        ul = document.createElement ('ul');
        ul.style.borderWidth = "0px 1px 0px 1px";
        ul.innerHTML += "<li><a href=\"javascript:void(0);\" id=reset >Reset</a></li>";
        gmMenu.appendChild(ul);
        document.getElementById('reset').addEventListener("click" , function () {
          myDefeats = null;
          myStore = null;
          serialize("defeats", myDefeats);
          serialize("store", myStore);
          alert("Map Rank Cache Reset");
        },true);
        ul = document.createElement('ul');
        ul.style.borderWidth = "0px 1px 0px 1px";
        if (latestVersiont) {
          ul.innerHTML = "<li><a id=\"tlatest\" href=https://raw.github.com/sherkaner/addons-for-Conquerclub/master/conquer_club_map_rank_gl.user.js><span class=\"attention\">New Update Available</span></a></li>";
        } else{
          ul.innerHTML = "<li><a id=\"tlatest\" href=https://raw.github.com/sherkaner/addons-for-Conquerclub/master/conquer_club_map_rank_gl.user.js><span>Latest Version Installed</span></a></li>";
        }
        gmMenu.appendChild(ul);
        var ftext = updateInfo['Map rank update text'];
        if (ftext) {
        	document.getElementById('tlatest').addEventListener("click" , function () {
        		alert('New version features\n' + ftext);
        	},true);
        }
        document.getElementById('rank').addEventListener('click', function() {
          var text = document.getElementById('map').options[document.getElementById('map').selectedIndex].text;
          var player = document.getElementById('player').value;
          if (player == "") {
            alert("Must give a player name");
            return false;
          }
          else{
            if (phist == "") {
              phist = player;
              GM_setValue('phist',phist);
            }
            else{
              var hists = phist.split('|');
              if (hists.indexOf(player) == -1) {
                hists.push(player);
                if (hists.length > 10) hists.shift();
                phist = hists.join('|');
                GM_setValue('phist',phist);
              }
            }
            var link = baseURL + "player.php?submit=Search&game_status=F&player1=" + encodeURIComponent(player);
            surl = "";
            if (text == "All") {
              createBox("Collecting Games", player, '');
              surl = "|||||||";
              var insignia = 0;
              var logout = getElementsByClassName(document,'div','vnav',true);
              var para = logout[0].getElementsByTagName('a');
              if (para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
                var mine = RegExp.$1;
                if (player.match(mine, "i")) {
                  insignia = 1;
                  myStore = deserialize('store', new Store());
                  if (!myStore) {
                    myStore = new Store();
                    myDefeats = new Defeats();
                  } else {
                    for (var ms in myStore._ranks) {
                      if (!isNaN(ms)) {
                        myStore = new Store();
                        break;
                      }
                    }
                  }
                }
              }
              totals = new Totals(insignia);
              if (ratings) getRatings(player,baseURL + 'player.php?mode=ratings2&username=' + encodeURIComponent(player),1);
              if (ratings) getXRatings(player,baseURL + 'player.php?mode=ratings1&username=' + encodeURIComponent(player),1);
              ranks = {};
              unique = {};
              getPlayerMedals(player);
              getPlayerId(player, maps);
            } else {
              var ind = document.getElementById('map').selectedIndex - 1;
              surl = "|||||||" + maps[ind];
              ranks = {};
              unique = {};
              createBox("Collecting Games", player, '');
              totals = new Totals(0);
              getPlayerMedals(player);
              getPlayerId(player, new Array(maps[ind]));
            }
          }
        }
        , true);
        if (/www.conquerclub.com\/player.php\?mode=find/.test(window.location.href) && !(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href))) {
          if (document.getElementsByTagName('fieldset').length){
            if (icons) {
              var mapdivs = document.getElementById("maps").getElementsByTagName('option');
              var tempStore = deserialize('store', new Store());
              if (tempStore) {
                for (md=0;md<mapdivs.length;md++) {
                  var name = mapdivs[md].text.replace(/ \(Beta\)$/, '');
                  if (tempStore._unique[name] && tempStore._unique[name].length) {
                    if (name == mapdivs[md].text)
                      mapdivs[md].text = name + " (" + tempStore._unique[name].length + ")";
                    else
                      mapdivs[md].text = name + " (" + tempStore._unique[name].length + ") (Beta)";
                    mapdivs[md].style.color = "blue";
                    mapdivs[md].style.fontWeight = "bold";
                    mapdivs[md].title = "Defeated Opponents For Cross Map Medal (from Map Rank)";
                  }
                }
              }
            }
            document.getElementById('maprankbox').innerHTML = "<input class=button type=button id=maprank value=\"Map Rank\" /><input type=button style=\"margin-left:0\" id=mapbook value=\"Bookmark Map Rank\" /><div id=mapsaved></div>";
            document.getElementById('mapbook').addEventListener("click", saveButtonHandler, false);
            myOptions = deserialize("mapbook");
            if (!myOptions) myOptions = {};
            showSearchs();
            if (myOptions['DEFAULT']) {
              loadButtonHandler(myOptions['DEFAULT'],"",false);
            }
            document.getElementById('maprank').addEventListener('click', function () {
              var opts = "";
              var player = document.getElementById('player1').value;
              var player2 = document.getElementById('player2').value;
              var player3 = document.getElementById('player3').value;
              var player4 = document.getElementById('player4').value;
              var versus = document.getElementById('versus1').value;
              var versus2 = document.getElementById('versus2').value;
              var versus3 = document.getElementById('versus3').value;
              var versus4 = document.getElementById('versus4').value;
              var exclude = document.getElementById('exclude1').value;
              var exclude2 = document.getElementById('exclude1').value;
              var exclude3 = document.getElementById('exclude1').value;
              var exclude4 = document.getElementById('exclude1').value;
              if (player2 != "") opts += "<span class=rankoptions>Player 2: <b>" + player2 + "</b></span> ";
              if (player3 != "") opts += "<span class=rankoptions>Player 3: <b>" + player3 + "</b></span> ";
              if (player4 != "") opts += "<span class=rankoptions>Player 4: <b>" + player4 + "</b></span> ";
              if (versus != "") opts += "<span class=rankoptions>vs. <b>" + versus + "</b></span> ";
              if (versus2 != "") opts += "<span class=rankoptions>vs. <b>" + versus2 + "</b></span> ";
              if (versus3 != "") opts += "<span class=rankoptions>vs. <b>" + versus3 + "</b></span> ";
              if (versus4 != "") opts += "<span class=rankoptions>vs. <b>" + versus4 + "</b></span> ";
              if (exclude != "") opts += "<span class=rankoptions>- <b>" + exclude + "</b></span> ";
              if (exclude2 != "") opts += "<span class=rankoptions>- <b>" + exclude2 + "</b></span> ";
              if (exclude3 != "") opts += "<span class=rankoptions>- <b>" + exclude3 + "</b></span> ";
              if (exclude4 != "") opts += "<span class=rankoptions>- <b>" + exclude4 + "</b></span> ";
              var numbers = cboxValues('np[]');
              if (numbers.length) opts += "<span class=rankoptions>Number of Players: <b>" + numbers + "</b></span> ";
              var mip = document.getElementById('maps').options;
              var mp = [];
              for (op = 0; op< mip.length; op++) {
                if (mip[op].selected) {
                  var txt = mip[op].text.replace(/ \(Beta\)$/, '').replace(/ \(Closed\)$/, '').replace(/ \(\d+\)/,'' );
                  mp.push(txt);
                }
              }
              var gt = cboxValues('ty[]');
              if (gt.length) opts += "<span class=rankoptions>Game Type: <b>" + gt + "</b></span> ";
              var porder = cboxValues('po[]');
              if (porder.length) opts += "<span class=rankoptions>Play Order: <b>" + porder + "</b></span> ";
              var tps = cboxValues('it[]');
              if (tps.length) opts += "<span class=rankoptions>Initial Troops: <b>" + tps + "</b></span> ";
              var bonus = cboxValues('bc[]');
              if (bonus.length) opts += "<span class=rankoptions>Bonus: <b>" + bonus + "</b></span> ";
              var fort = cboxValues('ft[]');
              if (fort.length) opts += "<span class=rankoptions>Fortifications: <b>" + fort + "</b></span> ";
              var fog = cboxValues('wf[]');
              if (fog.length) opts += "<span class=rankoptions>Fog of War:<b>" + fog + "</b></span> ";
              var joinable = cboxValues('pt[]');
              if (joinable.length) opts += "<span class=rankoptions>Joinability: <b>" + joinable + "</b></span> ";
              var speed = cboxValues('sg[]');
              if (speed.length) opts += "<span class=rankoptions>Round Length: <b>" + speed + "</b></span> ";
              var trench = cboxValues('tw[]');
              if (trench.length) opts += "<span class=rankoptions>Trench Warfare:<b>" + trench + "</b></span> ";                            
              var nn = document.getElementById('tournament');
              var tour = (nn.value);
              if (tour != "") {
                opts += "<span class=rankoptions>Tournament: <b>" + tour + "</b></span> ";
              }
              if (player == "") {
                alert("Must give a player name");
              } else {
                var link = baseURL + "player.php?submit=Search&game_status=F&player1=" + encodeURIComponent(player) + "&player2=" + encodeURIComponent(player2);
                var postlink = "&num_players=" + numbers + "&game_type=" + gt + "&bonus_cards=" + bonus + "&play_order=" + porder;
                surl = "";
                postlink += "&fortifications=" + fort + "&war_fog=" + fog + "&trench_warfare=" + trench + "&private=" + joinable + "&speed_game=" + speed + "&tournament=" + tour;
                mopts = new MapOpts(player2,numbers,gt,bonus,porder,fort,fog,trench,joinable,speed,tour, versus, versus2, exclude, exclude2, player3, player4, versus3, versus4, exclude3, exclude4,tps);
                if (!fort.length && !tps.length && tour == "" && player2 == "" && player3 == "" && player4 == "" && versus == "" && versus2 == "" && versus3 == "" && versus4 == "" && exclude == "" && exclude2 == "" && exclude3 == "" && exclude4 == "") {
                  if (!joinable.length) {
                    surl = numbers + "|" + gt + "|" + porder + "|" + bonus + "|" + fog + "|" + trench + "|" + speed + "|" + mp;
                  } else {
                    if (joinable == "T" && !numbers.length && !gt.length && !porder.length && !bonus.length && !fog.length && !trench.length && !speed.length && !mp.length) {
                      surl = "|||||||T";
                    }
                  }
                }
                if (!mp.length){
                  createBox("Collecting Games", player, opts);
                  totals = new Totals(0);
                  ranks = {};
                  unique = {};
                  pcount = 0;
                  if (player2) getPlayerPage (player, maps, mopts, 'p2');
                  if (player3) getPlayerPage (player, maps, mopts, 'p3');
                  if (player4) getPlayerPage (player, maps, mopts, 'p4');
                  if (versus)  getPlayerPage (player, maps, mopts, 'v1');
                  if (versus2) getPlayerPage (player, maps, mopts, 'v2');
                  if (versus3) getPlayerPage (player, maps, mopts, 'v3');
                  if (versus4) getPlayerPage (player, maps, mopts, 'v4');
                  if (exclude) getPlayerPage (player, maps, mopts, 'x1');
                  if (exclude2) getPlayerPage (player, maps, mopts, 'x2');
                  if (exclude3) getPlayerPage (player, maps, mopts, 'x3');
                  if (exclude4) getPlayerPage (player, maps, mopts, 'x4');
                  if (mopts._pcount == 0){
                    getPlayerMedals(player);
                    getPlayerId(player, maps,mopts);
                  }
                } else {
                  createBox("Collecting Games", player, opts);
                  totals = new Totals(0);
                  ranks = {};
                  unique = {};
                  pcount = 0;
                  if (player2) getPlayerPage (player, mp, mopts, 'p2');
                  if (player3) getPlayerPage (player, mp, mopts, 'p3');
                  if (player4) getPlayerPage (player, mp, mopts, 'p4');
                  if (versus)  getPlayerPage (player, mp, mopts, 'v1');
                  if (versus2) getPlayerPage (player, mp, mopts, 'v2');
                  if (versus3) getPlayerPage (player, mp, mopts, 'v3');
                  if (versus4) getPlayerPage (player, mp, mopts, 'v4');
                  if (exclude) getPlayerPage (player, mp, mopts, 'x1');
                  if (exclude2) getPlayerPage (player, mp, mopts, 'x2');
                  if (exclude3) getPlayerPage (player, mp, mopts, 'x3');
                  if (exclude4) getPlayerPage (player, mp, mopts, 'x4');
                  if (mopts._pcount == 0){
                    getPlayerMedals(player);
                    getPlayerId(player, mp,mopts);
                  }
                }
              }
              return false;
            }, true);
          }
        }
        if (/www.conquerclub.com\/player.php\?mode=start/.test(window.location.href)) {
          if (document.getElementsByTagName('fieldset').length){
            if (icons) {
              var mapdivs = document.getElementById("maps").getElementsByTagName('option');
              var tempStore = deserialize('store', new Store());
              if (tempStore) {
                for (md=0;md<mapdivs.length;md++) {
                  var name = mapdivs[md].text.replace(/ \(Beta\)$/, '');
                  if (tempStore._unique[name] && tempStore._unique[name].length) {
                    if (name == mapdivs[md].text) {
                      mapdivs[md].text = name + " (" + tempStore._unique[name].length + ")";
                    } else {
                      mapdivs[md].text = name + " (" + tempStore._unique[maps].length + ") (Beta)";
                    }
                    mapdivs[md].style.color = "blue";
                    mapdivs[md].style.fontWeight = "bold";
                    mapdivs[md].title = "Defeated Opponents For Cross Map Medal (from Map Rank)";
                  }
                }
              }
            }
          }
        }

        if (/www.conquerclub.com\/player.php\?mode=browse/.test(window.location.href)) {
          if (icons) {
            var mapdivs = document.getElementById('maps').getElementsByTagName("div");
            var tempStore = deserialize('store', new Store());
            if (tempStore) {
              for (md=0;md<mapdivs.length;md++) {
                var label = mapdivs[md].getElementsByTagName('label')[0];
                var name = label.innerHTML;
                if (tempStore._unique[name] && tempStore._unique[name].length) {
                  label.innerHTML += "<span class=player3 title=\"Defeated Opponents For Cross Map Medal (from Map Rank)\">(" + tempStore._unique[name].length + ")</span>";
                }
              }
            }
          }
        }
      }
    });
  }
}

function d2h(d) {
  return d.toString(16);
}

function h2d(h) {
  return parseInt(h,16);
}

function line_graph(max,min) {
  this.ct = 0;

  this.data = [];
  this.colour = [];
  this.x_name = [];
  this.max = -64000; // MAX INT
  this.min = 64000;
  this.maxbounds = max;
  this.minbounds = min;
  this.maxind = 0;
  this.minind = 0;

  this.c_array = [[255, 192, 95],
  [80, 127, 175],
  [159, 87, 112],
  [111, 120, 96],
  [224, 119, 96],
  [80, 159, 144],
  [207, 88, 95],
  [64, 135, 96],
  [239, 160, 95],
  [144, 151, 80],
  [255, 136, 80]];

  this.getColor = function() {
    if (this.ct >= (this.c_array.length-1)) {
      this.ct = 0;
    } else {
      this.ct++;
    }
    return "#" + d2h(this.c_array[this.ct][0]) + d2h(this.c_array[this.ct][1]) + d2h(this.c_array[this.ct][2]);
  };


  this.add = function(x_name, value, colour) {
    var val = parseInt(value,10);
    this.x_name.push(x_name);
    this.data.push(val);
    this.colour.push(colour);

    if (val > this.max) {
      this.max = val;
      this.maxind = this.data.length - 1;
    }
    if (val < this.min) {
      this.min = val;
      this.minind = this.data.length - 1;
    }
  };

  this.render = function(canvas) {
    var jg = new jsGraphics(canvas);
    var h  = 300;
    var dw = 30;
    var fnt    = 12;
    var sx = 50;
    var step = (this.data.length > 14) ?  Math.round(this.data.length / 15) : 1;
    var span = 22;
    var ht1;
    var rtmax = sx + 10 + (dw+Math.round((dw/2)))*(span);
    var i;

    jg.setColor("blue");
    if (this.maxbounds == null) this.maxbounds = this.max;
    if (this.minbounds == null) this.minbounds = this.min;
    if (this.maxbounds) {
      for (i = 0 ; i <= 5 ; i++) {
        jg.drawLine(0,Math.round((h/5*i)),rtmax+20,Math.round((h/5*i)));
        var ff = Math.round(this.maxbounds - ((this.maxbounds - this.minbounds)/ 5 * i));
        jg.drawString(ff+"",4,Math.round((h/5*i)-2));
      }
    } else {
      jg.drawLine(0,h,rtmax+20,h);
      jg.drawString("0",4,h-2);
    }

    // Draw the bar graph
    var color = this.getColor();
    var oldx, oldy;
    jg.setStroke(1);

    for (i = 0; i < this.data.length; i+=step) {
      var triplet = [];

      triplet.push(i);
      if (this.maxind > i && this.maxind < i+step) triplet.push(this.maxind);
      if (this.minind > i && this.minind < i+step && this.minind != this.maxind) triplet.push(this.minind);
      triplet.sort();

      for (var k=0; k<triplet.length; k++) {
        if (this.max) {
          ht1 = Math.round((this.data[triplet[k]] - this.minbounds)*h/(this.maxbounds - this.minbounds));
        } else { 
          ht1 = 0;
        }
        if (triplet[k]) {
          jg.setColor(this.colour[triplet[k]]);
          jg.drawLine(oldx, h-oldy, sx, h-ht1);
        }
        jg.setColor(this.colour[triplet[k]]);
        jg.fillEllipse(sx-2, h-ht1-2, 8, 8, this.data[triplet[k]]);
        jg.setColor("green");
        jg.drawString(this.x_name[triplet[k]], sx, h);

        oldx = sx;
        oldy = ht1;
        sx = sx+dw+Math.round(dw/2);
      }
    }

    if (this.maxind != this.data.length - 1 && this.mindind != this.data.length - 1 && i-step < this.data.length-1) {
      if (this.max)
        ht1 = Math.round((this.data[this.data.length - 1] - this.minbounds)*h/(this.maxbounds - this.minbounds));
      else ht1 = 0;
      if (this.data.length  > 1)
      {
        jg.setColor(this.colour[this.data.length - 1]);
        jg.drawLine(oldx, h-oldy, sx, h-ht1);
      }
      jg.setColor(this.colour[this.data.length - 1]);
      jg.fillEllipse(sx-2, h-ht1-2, 8, 8, this.data[this.data.length - 1]);
      jg.setColor("green");
      jg.drawString(this.x_name[this.data.length - 1], sx, h);
      oldx = sx;
      oldy = ht1;
      sx = sx+dw+Math.round(dw/2);
    }

    jg.setFont("Verdana", fnt, 'font-weight:bold;');
    jg.paint();
  };

}

function pntCnvDom() {
  var x = viewer.document.createRange();
  x.setStartBefore(this.cnv);
  x = x.createContextualFragment(this.htm);
  this.cnv.appendChild(x);
  this.htm = '';
}

function mkDiv(x, y, w, h) {
  this.htm += '<div style="position:absolute;'+
  'left:' + x + 'px;'+
  'top:' + y + 'px;'+
  'width:' + w + 'px;'+
  'height:' + h + 'px;'+
  'clip:rect(0,'+w+'px,'+h+'px,0);'+
  'background-color:' + this.color +
  ';"><\/div>';
}

function mkDivD(x, y, w, h, d) {
  this.htm += '<div title="' + d + '" style="position:absolute;' +
  'left:' + x + 'px;'+
  'top:' + y + 'px;'+
  'width:' + w + 'px;'+
  'height:' + h + 'px;'+
  'clip:rect(0,'+w+'px,'+h+'px,0);'+
  'background-color:' + this.color +
  ';"><\/div>';
}

function mkLin(x1, y1, x2, y2) {
  var _x2, _y2, dx, dy, pr, pru, p, ox, oy, x, y, yIncr;
  if (x1 > x2) {
    _x2 = x2;
    _y2 = y2;
    x2 = x1;
    y2 = y1;
    x1 = _x2;
    y1 = _y2;
  }
  dx = x2-x1, dy = Math.abs(y2-y1),
  x = x1, y = y1,
  yIncr = (y1 > y2)? -1 : 1;

  if (dx >= dy)    {
    pr = dy<<1;
    pru = pr - (dx<<1);
    p = pr-dx;
    ox = x;
    while ((dx--) > 0) {
      ++x;
      if (p > 0) {
        this.mkDiv(ox, y, x-ox, 1);
        y += yIncr;
        p += pru;
        ox = x;
      } else p += pr;
    }
    this.mkDiv(ox, y, x2-ox+1, 1);
  } else {
    pr = dx<<1;
    pru = pr - (dy<<1);
    p = pr-dy;
    oy = y;
    if (y2 <= y1)    {
      while ((dy--) > 0) {
        if (p > 0) {
          this.mkDiv(x++, y, 1, oy-y+1);
          y += yIncr;
          p += pru;
          oy = y;
        } else {
          y += yIncr;
          p += pr;
        }
      }
      this.mkDiv(x2, y2, 1, oy-y2+1);
    } else {
      while ((dy--) > 0) {
        y += yIncr;
        if (p > 0) {
          this.mkDiv(x++, oy, 1, y-oy);
          p += pru;
          oy = y;
        } else p += pr;
      }
      this.mkDiv(x2, oy, 1, y2-oy+1);
    }
  }
}

function mkOv(left, top, width, height) {
  var a = width>>1, b = height>>1,
  wod = width&1, hod = (height&1)+1,
  cx = left+a, cy = top+b,
  x = 0, y = b,
  ox = 0, oy = b,
  aa = (a*a)<<1, bb = (b*b)<<1,
  st = (aa>>1)*(1-(b<<1)) + bb,
  tt = (bb>>1) - aa*((b<<1)-1),
  w, h;
  while (y > 0) {
    if (st < 0) {
      st += bb*((x<<1)+3);
      tt += (bb<<1)*(++x);
    } else if (tt < 0) {
      st += bb*((x<<1)+3) - (aa<<1)*(y-1);
      tt += (bb<<1)*(++x) - aa*(((y--)<<1)-3);
      w = x-ox;
      h = oy-y;
      if (w&2 && h&2) {
        this.mkOvQds(cx, cy, -x+2, ox+wod, -oy, oy-1+hod, 1, 1);
        this.mkOvQds(cx, cy, -x+1, x-1+wod, -y-1, y+hod, 1, 1);
      }
      else this.mkOvQds(cx, cy, -x+1, ox+wod, -oy, oy-h+hod, w, h);
      ox = x;
      oy = y;
    } else {
      tt -= aa*((y<<1)-3);
      st -= (aa<<1)*(--y);
    }
  }
  this.mkDiv(cx-a, cy-oy, a-ox+1, (oy<<1)+hod);
  this.mkDiv(cx+ox+wod, cy-oy, a-ox+1, (oy<<1)+hod);
}

function mkRect(x, y, w, h) {
  var s = this.stroke;
  this.mkDiv(x, y, w, s);
  this.mkDiv(x+w, y, s, h);
  this.mkDiv(x, y+h, w+s, s);
  this.mkDiv(x, y+s, s, h-s);
}

function jsGraphics(id, wnd) {
  this.setColor = function(arg) {
    this.color = arg.toLowerCase();
  };

  this.setStroke = function(x) {
    this.stroke = x;
    this.drawLine = mkLin;
    this.mkOv = mkOv;
    this.drawRect = mkRect;
  };

  this.setFont = function(fam, sz, sty) {
    this.ftFam = fam;
    this.ftSz = sz;
    this.ftSty = sty || 'font-weight:normal;';
  };

  this.fillEllipse = function(left, top, w, h, dt) {
    var a = (w -= 1)>>1, b = (h -= 1)>>1,
    wod = (w&1)+1, hod = (h&1)+1,
    cx = left+a, cy = top+b,
    x = 0, y = b,
    ox = 0, oy = b,
    aa2 = (a*a)<<1, aa4 = aa2<<1, bb = (b*b)<<1,
    st = (aa2>>1)*(1-(b<<1)) + bb,
    tt = (bb>>1) - aa2*((b<<1)-1),
    pxl, dw, dh;
    if (w+1) while (y > 0) {
      if (st < 0) {
        st += bb*((x<<1)+3);
        tt += (bb<<1)*(++x);
      } else if (tt < 0) {
        st += bb*((x<<1)+3) - aa4*(y-1);
        pxl = cx-x;
        dw = (x<<1)+wod;
        tt += (bb<<1)*(++x) - aa2*(((y--)<<1)-3);
        dh = oy-y;
        this.mkDivD(pxl, cy-oy, dw, dh, dt);
        this.mkDivD(pxl, cy+y+hod, dw, dh, dt);
        ox = x;
        oy = y;
      } else {
        tt -= aa2*((y<<1)-3);
        st -= aa4*(--y);
      }
    }
    this.mkDivD(cx-a, cy-oy, w+1, (oy<<1)+hod, dt);
  };

  this.drawString = function(txt, x, y)    {
    this.htm += '<div style="position:absolute;white-space:nowrap;'+
    'left:' + x + 'px;'+
    'top:' + y + 'px;'+
    'font-family:' +  this.ftFam + ';'+
    'font-size:' + this.ftSz + ';'+
    'color:' + this.color + ';' + this.ftSty + '">'+
    txt +
    '<\/div>';
  };

  this.clear = function() {
    this.htm = "";
    if (this.cnv) this.cnv.innerHTML = this.defhtm;
  };

  this.mkOvQds = function(cx, cy, xl, xr, yt, yb, w, h)    {
    this.mkDiv(xr+cx, yt+cy, w, h);
    this.mkDiv(xr+cx, yb+cy, w, h);
    this.mkDiv(xl+cx, yb+cy, w, h);
    this.mkDiv(xl+cx, yt+cy, w, h);
  };

  this.setStroke(1);
  this.setFont('verdana,geneva,helvetica,sans-serif', String.fromCharCode(0x31, 0x32, 0x70, 0x78), 'font-weight:bold;');
  this.color = '#000000';
  this.htm = '';

  this.cnv = viewer.document.getElementById(id);
  this.defhtm = (this.cnv && this.cnv.innerHTML)? this.cnv.innerHTML : '';
  this.paint = pntCnvDom ;

  this.mkDiv = mkDiv;
  this.mkDivD = mkDivD;
}
