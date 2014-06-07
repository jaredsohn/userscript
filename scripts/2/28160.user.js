//
// ==UserScript==
// @name          Conquer Club Map Rank
// @namespace     http://userscripts.org/
// @description   Script to work out Player Map-specific Rank
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var version = "1.6.7";
var latestVersion = 0;
var __eventListeners = [];
var ranks = [];
var features=[];
var maps = [];
var counter = 0;
var unique = [];
var totals;
var total = 0;
var medals = 1;
var viewer = null;
var gameReq = [];
var mapReq = [];
var rateReq = [];
var current=-1;
var suggtot = 0;
var phist = "";
var loadedName = "";
var icons = 0;
var myOptions;
var myStore;
var sortable = new Array((new Array("smap","swin","suni")), (new Array("smap","spts","swin","suni","skil", "srel")));
var graphTypes = {'points' : new GraphType("Points","point gain/loss",pointsalg,1000, "red",null,null) , 'winloss' : new GraphType("Win/Loss %","win/loss",winlossalg,0, "green(win) and red(loss)",100,0)}
var hD="0123456789ABCDEF";
var g;
var Font;
var Stroke;
var slider;
var sarray;

function Point(time, points) {
this._time = time;
this._points = points;
}

function Rank() {
this._wins = 0;
this._rank = 0;
this._counter = 0;
this._pages = 0;
this._firsts = 0;
this._wonfirsts = 0;
this._missing = 0;
this._games = new Array();
this._parray = new Array();
this._warray = new Array();
this._kills = 0;
this._meanwin = 0;
this._beaten = 0;
this._defeats = new Object();
this._defeats["Speed"] = new Array();
this._defeats["Standard"] = new Array();
this._defeats["Terminator"] = new Array();
this._defeats["Assassin"] = new Array();
this._defeats["Doubles"] = new Array();
this._defeats["Triples"] = new Array();
this._defeats["Quadruples"] = new Array();
}

function Store() {
this._ranks = new Object();
this._unique = new Object();
this._date = new Date();
this._medals = medals;
}

function Totals(insignia) {
this._insignia = insignia;
this._points = 0;
this._unique = new Array();
this._crossmap = new Array();
this._crossmaps = 0;
this._wins = 0;
this._games = 0;
this._kills = 0;
this._meanwin = 0;
this._beaten = 0;
this._firsts = 0;
this._wonfirsts = 0;
this._missing = 0;
this._parray = new Array();
this._warray = new Array();
this._sorted = new Array();
this._counter = 0;
this._types = new Array();
this._defeats = new Array();
this._defeats['Speed'] = new Array();
this._defeats['Standard'] = new Array();
this._defeats['Terminator'] = new Array();
this._defeats['Assassin'] = new Array();
this._defeats['Doubles'] = new Array();
this._defeats['Triples'] = new Array();
this._defeats['Quadruples'] = new Array();
this._defeats['Rating'] = new Array();
}

function Defeats() {
this._defeats = new Object();
this._defeats["Speed"] = new Array();
this._defeats["Standard"] = new Array();
this._defeats["Terminator"] = new Array();
this._defeats["Assassin"] = new Array();
this._defeats["Doubles"] = new Array();
this._defeats["Triples"] = new Array();
this._defeats["Quadruples"] = new Array();
this._defeats['Rating'] = new Array();
}

function Pinfo() {
this._defeats = new Array();
}

function GraphType(type,info,alg,initial,markers,maxbound,minbound) {
this._type = type;
this._info = info;
this._markers = markers;
this._running = function(array) {
return(alg(array))
}
this._initial = initial;
this._maxbound = maxbound;
this._minbound = minbound;
}

function Streak() {
this._start = 0;
this._num = 0;
}

function PointInfo(data, colour) {
this._data = new Array();
this._colour = new Array();
this._winstreak = new Streak();
this._losstreak = new Streak();
}

function Slide(length,to,parray) {
this._pxLen = length;
this._scale = to / length;
this._toVal = to;
this._parray = parray;
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


function pointsalg(array) {
  var counter = 1000;
  var running = new PointInfo();
  for(var f=0; f< array.length; f++) {
    counter += array[f]._points;
    running._data.push(counter);
    running._colour.push("red");
  }
  return running;
}

function winlossalg(array) {
  var counter = 0;
  var winstreak = new Streak();
  var losstreak = new Streak();
  var running = new PointInfo();
  if(array[0]._points == 1) {
   counter += array[0]._points;
   running._colour.push("green");
   winstreak._num++;
  }
  else{
   running._colour.push("red");
   losstreak._num++;
  }
  running._data.push(100 * counter);
  for(var f=1; f< array.length; f++) {
    if(array[f]._points == 1) {
     counter += array[f]._points;                    ;
     if(array[f - 1]._points == -1) {
      if(losstreak._num > running._losstreak._num) {
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
     if(array[f - 1]._points == 1) {
      if(winstreak._num > running._winstreak._num) {
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
  if(array[f - 1]._points == -1) {
   if(losstreak._num > running._losstreak._num) {
     running._losstreak._start = losstreak._start;
     running._losstreak._num = losstreak._num;
   }
  }
  else if(array[f - 1]._points == 1) {
   if(winstreak._num > running._winstreak._num) {
     running._winstreak._start = winstreak._start;
     running._winstreak._num = winstreak._num;
   }
  }

  return running;
}

function cascadewin(pinfoarray, name) {
if(!pinfoarray[name]) return 0;
var retVal = 0;
for(var x in pinfoarray[name]._defeats) {
  retVal += pinfoarray[name]._defeats[x] + (pinfoarray[name]._defeats[x] * cascadewin(pinfoarray,x));
}
return retVal;
}

function cascadeloss(pinfoarray, name) {
if(!pinfoarray[name]) return 1;
var retVal;
for(var x in pinfoarray[name]._defeats) {
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
  if(cross >= 60) {
    cross = "gmedal";
  }
  else if(cross >= 40) {
    cross = "smedal";
  }
  else if(cross >= 20) {
    cross = "bmedal";
  }

  for(var r=3; r<rws.length; r++) {
    var td = rws[r].getElementsByTagName('td');
    var c = (r&1) ? "mrodd": "mreven";
    for(var t=0; t<td.length; t++) {
      td[t].className = c;
    }
  }
  for(var cr=0; cr<totals._crossmap.length; cr++) {
    if(totals._crossmap[cr]) {
      viewer.document.getElementById('result' + cr).className = cross;
    }
  }
  if(medals) {
  viewer.document.getElementById('wtot').className = "chart";
  viewer.document.getElementById('wtot').title = "Totals Win/Loss Chart";
  addListener(viewer.document.getElementById('wtot'),'click', function() {
    slider = new Slide(200, totals._warray.length - 1, totals._warray);
    graph(totals._warray,0,totals._warray.length - 1, "Totals", graphTypes['winloss']);
  });
  if(totals._insignia) {
  for(var v in myStore._ranks) {
    if(myStore._ranks[v] && myStore._ranks[v]._counter) {
    viewer.document.getElementById('wtot' + maps.indexOf(v)).className = "chart";
    viewer.document.getElementById('wtot' + maps.indexOf(v)).title = v + " Win/Loss Chart";
    addListener(viewer.document.getElementById('wtot' + maps.indexOf(v)),'click', function() {
      var tid = this.id.split('wtot')[1];
      slider = new Slide(200, myStore._ranks[maps[tid]]._warray.length - 1, myStore._ranks[maps[tid]]._warray);
      graph(myStore._ranks[maps[tid]]._warray,0,myStore._ranks[maps[tid]]._warray.length - 1, maps[tid], graphTypes['winloss']);
    });
    }
  }
  }
  else{
  for(var v in ranks) {
    if(ranks[v] && ranks[v]._counter) {
    viewer.document.getElementById('wtot' + maps.indexOf(v)).className = "chart";
    viewer.document.getElementById('wtot' + maps.indexOf(v)).title = v + " Win/Loss Chart";
    addListener(viewer.document.getElementById('wtot' + maps.indexOf(v)),'click', function() {
      var tid = this.id.split('wtot')[1];
      slider = new Slide(200, ranks[maps[tid]]._warray.length - 1, ranks[maps[tid]]._warray);
      graph(ranks[maps[tid]]._warray,0,ranks[maps[tid]]._warray.length - 1,maps[tid], graphTypes['winloss']);
    });
    }
  }
  }
  viewer.document.getElementById('gtot').className = "chart";
  viewer.document.getElementById('gtot').title = "Totals Points Chart";
  addListener(viewer.document.getElementById('gtot'),'click', function() {
    slider = new Slide(200, totals._parray.length - 1, totals._parray);
    graph(totals._parray,0,totals._parray.length - 1, "Totals", graphTypes['points']);
  });
  if(totals._insignia) {
  for(var v in myStore._ranks) {
    if(myStore._ranks[v] && myStore._ranks[v]._counter) {
    viewer.document.getElementById('gtot' + maps.indexOf(v)).className = "chart";
    viewer.document.getElementById('gtot' + maps.indexOf(v)).title = v + " Points Chart";
    addListener(viewer.document.getElementById('gtot' + maps.indexOf(v)),'click', function() {
      var tid = this.id.split('gtot')[1];
      slider = new Slide(200, myStore._ranks[maps[tid]]._parray.length - 1, myStore._ranks[maps[tid]]._parray);
      graph(myStore._ranks[maps[tid]]._parray,0,myStore._ranks[maps[tid]]._parray.length - 1, maps[tid], graphTypes['points']);
    });
    }
  }
  }
  else{
  for(var v in ranks) {
    if(ranks[v] && ranks[v]._counter) {
    viewer.document.getElementById('gtot' + maps.indexOf(v)).className = "chart";
    viewer.document.getElementById('gtot' + maps.indexOf(v)).title = v + " Points Chart";
    addListener(viewer.document.getElementById('gtot' + maps.indexOf(v)),'click', function() {
      var tid = this.id.split('gtot')[1];
      slider = new Slide(200, ranks[maps[tid]]._parray.length - 1,ranks[maps[tid]]._parray);
      graph(ranks[maps[tid]]._parray,0,ranks[maps[tid]]._parray.length - 1,maps[tid], graphTypes['points']);
    });
    }
  }
  }
  }
  addListener(viewer.document.getElementById('smap'),'click', function() {
    sortByCol('smap',alpha, 0, viewer.document.getElementById('smap').className);
  });
  if(medals) {
    addListener(viewer.document.getElementById('spts'),'click', function() {
     sortByCol('spts',numerical, 2, viewer.document.getElementById('spts').className);
    });
    addListener(viewer.document.getElementById('skil'),'click', function() {
      sortByCol('skil',percent, 6, viewer.document.getElementById('skil').className);
    });
    addListener(viewer.document.getElementById('srel'),'click', function() {
      sortByCol('srel',factor, 7, viewer.document.getElementById('srel').className);
    });
  }
  addListener(viewer.document.getElementById('swin'),'click', function() {
    if(medals)
    sortByCol('swin',percent, 3, viewer.document.getElementById('swin').className);
    else
    sortByCol('swin',percent, 1, viewer.document.getElementById('swin').className);
  });
  addListener(viewer.document.getElementById('suni'),'click', function() {
    if(medals)
    sortByCol('suni',numerical, 5, viewer.document.getElementById('suni').className);
    else
    sortByCol('suni',numerical, 2, viewer.document.getElementById('suni').className);
  });
}

function endGame() {
  var medal = totals._unique.length;
  if(totals._points >= 0) trank = "+" + (totals._points);
  else trank = totals._points;
  if(medal >= 400) {
    medal = "<span class=gmedal>" + medal + "</span>";
  }
  else if(medal >= 100) {
    medal = "<span class=smedal>" + medal + "</span>";
  }
  else if(medal >= 20) {
    medal = "<span class=bmedal>" + medal + "</span>";
  }
  else{
    medal = "<span>" + medal + "</span>";
  }
  var cross = totals._crossmaps;
  if(cross >= 60) {
    cross = "gmedal";
  }
  else if(cross >= 40) {
    cross = "smedal";
  }
  else if(cross >= 20) {
    cross = "bmedal";
  }
  var tr = viewer.document.getElementById('summary');
  if(medals) {
  if(totals._missing) missing = "<sup>" + totals._missing + "</sup>";
  else missing = "";
  tr.innerHTML = "<td id=gtot><b>Totals" + missing + "</b></td><td>" + getRank(totals._games, totals._points + 1000) + nextRank(totals._points + 1000) + "</td><td>" + trank + "</td><td id=wtot>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + "Won " + totals._wonfirsts + " from " + totals._firsts + "</td><td>" + medal + " (<span class=" + cross + ">" + totals._crossmaps + "</span>)</td><td>"  + getKiller(totals._games - totals._wins,totals._kills) + "</td><td>" + getRelative(totals._meanwin,totals._beaten) + "</td>";
  }
  else
  tr.innerHTML = "<td><b>Totals</b></td><td>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + medal + " (<span class=" + cross + ">" + totals._crossmaps + "</span>)</td>";
  total = 0;
  for(var st=0; st< sortable[medals].length; st++) {
    viewer.document.getElementById(sortable[medals][st]).className = "sorton";
  }
  setTable();
  if(totals._insignia) {
    myDefeats = new Defeats();
    for(def in totals._defeats) {
      myDefeats._defeats[def] = totals._defeats[def];
    }
    GM_setValue("defeats", uneval(myDefeats));
    myStore._medals = medals;
    myStore._date = new Date();
    GM_setValue("store", uneval(myStore));
  }
  viewer.document.getElementById('closeRank').style.opacity = "0.9";
  viewer.document.getElementById('closeRank').style.backgroundColor = "green";
  viewer.document.getElementById('progress').innerHTML = "<b>Scan Complete. Click on light blue column headers to sort. Click again to reverse sort. Click on yellow boxes for chart.</b>";
}

function valToPix(val) {
return (Math.floor(val * slider._toVal / (slider._scale * slider._pxLen)) * (slider._pxLen / slider._toVal));
}

function tinput(id) {
displayObj = viewer.document.getElementById('display_' + id);
displayVal = parseInt(displayObj.value);
if(displayVal <= slider._toVal) {
var n = valToPix(displayVal);
slideLeft('slider_' + id,n);
viewer.document.getElementById('stamp_' + id).innerHTML = CCTimeToDate(slider._parray[displayVal]._time).toLocaleString();;
displayObj.style.color = "blue";
}
else{viewer.document.getElementById('stamp_' + id).innerHTML = "";
displayObj.style.color = "gray";
}
}

function slideLeft(elmnt, pos)
{
  if (!(elmnt = viewer.document.getElementById(elmnt))) return 0;
		if (typeof(pos) == 'number') elmnt.style.left = pos + 'px';
		else {
			pos = parseInt(elmnt.style.left);
			if (isNaN(pos)) pos = 0;
		}
	return pos;
}

function moveSlider(evnt)
{
  if (mouseover) {
    x = pxLeft + evnt.screenX - xCoord;
    if (x > slider._pxLen) x = slider._pxLen;
    if (x < 0) x = 0;
    slideLeft(sliderObj.id, x);
    sliderPos = (slider._pxLen / slider._toVal) * Math.round(slider._toVal * x / slider._pxLen);
    v = Math.round((sliderPos * slider._scale));
    displayObj.value = v;
    stampObj.innerHTML = CCTimeToDate(slider._parray[v]._time).toLocaleString();
    return false;
	}
  return;
}

function slide(evnt, id)
{
  sliderObj = viewer.document.getElementById('slider_' + id);
  displayObj = viewer.document.getElementById('display_' + id);
  stampObj = viewer.document.getElementById('stamp_' + id);
  pxLeft = slideLeft('slider_' + id);
  xCoord = evnt.screenX;
  mouseover = true;
  viewer.document.addEventListener('mousemove', moveSlider , false);
  viewer.document.addEventListener('mouseup', sliderMouseUp, false);
}

function sliderMouseUp()
{
  mouseover = false;
  v = (parseInt(displayObj.value)) ? parseInt(displayObj.value) : 0;
  pos = v /(slider._scale);
  slideLeft(sliderObj.id, pos);
  stampObj.innerHTML = CCTimeToDate(slider._parray[v]._time).toLocaleString();
  viewer.document.removeEventListener('mousemove', moveSlider, false);
  viewer.document.removeEventListener('mouseup', sliderMouseUp, false);
}

function graph(parray, start, end, title, graphtype) {
  viewer.document.getElementById('lines').innerHTML = '';
  switchTabs(2);
  parray.sort(psort);
  var running = graphtype._running(parray);
  g = new line_graph(graphtype._maxbound, graphtype._minbound);
  Font = new jsgFont();
  Stroke = new jsgStroke();
  viewer.document.getElementById('lines').style.display = "block";
  viewer.document.getElementById('cheader').style.display = "block";
  viewer.document.getElementById('cfooter').style.display = "block";
  viewer.document.getElementById('buttons').style.display = "block";
  viewer.document.getElementById('cheader').innerHTML = "<h3 class=header>Map Rank Chart For " + title + " " + graphtype._type + "</h3><br /><span><b>" + graphtype._type + "</b>";
  viewer.document.getElementById('cfooter').innerHTML = "<h3><b>Timestamp</h3>";
  if(start==0 && graphtype == graphTypes['points']) g.add('',graphtype._initial,"red");
  for(var f=start; f<=end; f++) {
  g.add('<span title=\"' + parray[f]._time +'\">' + f + '</span>', running._data[f], running._colour[f]);
  }
  g.render("lines", "Time");
  var buttontxt = "<table cellspacing=0 cellpadding=0 border=1><tr class=mrodd><td colspan=4>Min: " + g.min + "&nbsp;&nbsp;&nbsp;Max: " + g.max + "</td></tr>";
  if(graphtype == graphTypes['winloss']) {
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
  viewer.document.getElementById('stamp_1').innerHTML = CCTimeToDate(parray[start]._time).toLocaleString();
  viewer.document.getElementById('stamp_2').innerHTML = CCTimeToDate(parray[end]._time).toLocaleString();
  addListener(viewer.document.getElementById('display_1'),'keyup', function() {tinput(1);});
  addListener(viewer.document.getElementById('display_2'),'keyup', function() {tinput(2);});
  addListener(viewer.document.getElementById('slider_1'),'mousedown', function(event) {slide(event,1)});
  addListener(viewer.document.getElementById('slider_2'),'mousedown', function(event) {slide(event,2)});
  viewer.document.getElementById('progress').innerHTML = "<b>Hover over Timestamp numbers to see timestamp of " + graphtype._info + ". Hover over " + graphtype._markers + " markers to see values.</b>";
  addListener(viewer.document.getElementById('graph'),'click', function() {
    fromVal = parseInt(viewer.document.getElementById('display_1').value);
    toVal = parseInt(viewer.document.getElementById('display_2').value);
    if(isNaN(fromVal) || isNaN(toVal) || fromVal > toVal || fromVal > slide._toVal || toVal < 0 || fromVal < 0 || toVal > slide._toVal) {
    alert("Invalid range");
    }
    else{
     graph(parray, fromVal , toVal, title, graphtype);
    }
  });
  addListener(viewer.document.getElementById('gall'),'click', function() {
    graph(parray, 0,parray.length - 1, title, graphtype);
  });
  if(graphtype == graphTypes['winloss']) {
    addListener(viewer.document.getElementById('wstreak'),'click', function() {
     graph(parray, running._winstreak._start,running._winstreak._start + running._winstreak._num - 1, title, graphtype);
    });
    addListener(viewer.document.getElementById('lstreak'),'click', function() {
     graph(parray, running._losstreak._start,running._losstreak._start + running._losstreak._num - 1, title, graphtype);
    });
  }
}

function handleSearchSuggest(lastval) {
  var next = document.getElementById('player').value;
  var k=0;
  if(next == '') {clearSuggest();return;}
  if(next != lastval) {return;}
  var ss = document.getElementById('phistory');
  ss.innerHTML = '';
  var str = phist.split("|");
  for(i=0; i < str.length; i++) {
    if(str[i].substring(next.length,0).match(next, "i")) {
     var suggest = document.createElement('div');
     suggest.innerHTML = str[i];
     if(k==0) {suggest.className = "history_link_over";}
     else{suggest.className = "history_link";}
     ss.appendChild(suggest);
     suggest.addEventListener('mouseover', function() {suggestOver(this)}, false);
     suggest.addEventListener('mouseout', function() {suggestOut(this)}, false);
     suggest.addEventListener('click', function() {setSearch(this.innerHTML)}, false);
     ss.style.visibility = 'visible';
     k++;
    }
  }
  suggtot = k;
  if(suggtot > 0) {current = 0;}
  else {current = -1;}
}

function suggestOver(div_value) {
  var divs = document.getElementById('phistory').getElementsByTagName('div');
  for(i=0; i< suggtot; i++) {
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
	if(keyCode == 40 || keyCode == 38){
		if(keyCode == 38){ // keyUp
      if(current == 0 || current == -1){
        current = suggtot-1;
			}else{
        current--;
			}
		} else { // keyDown
      if(current == suggtot-1){
        current = 0;
			}else {
        current++;
			}
		}
    var divs = document.getElementById('phistory').getElementsByTagName('div');
    for(i=0; i< suggtot; i++) {
      if(i == current){
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

  if(!e) {keyCode = window.event.keyCode;}
  else{keyCode = e.keyCode;}
  last = input.value;

  if(keyCode == 13) {
    if(current != -1) {
      var divs = document.getElementById('phistory').getElementsByTagName('div');
      setSearch(divs[current].innerHTML);
    }
    return;
  }
  if(updownArrow(keyCode)){
    return;
  }
  if(keyCode == 27) {
    clearSuggest();
    return;
  }
  handleSearchSuggest(last);
}

function deserialize(name, def)
{
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val)
{
  GM_setValue(name, uneval(val));
}

var saveButtonHandler = function saveButtonHandler()
{
  var name= prompt("Please Name this map rank (reusing a name will overwrite it)",loadedName);
  if (name!="" && name != null)
  {
    var searchDetails=new Object();
    var allP = document.getElementById('middleColumn').getElementsByTagName("input");
    for( i in allP )
    {
      if(allP[i].type=="checkbox")
      {
              searchDetails[allP[i].id] = allP[i].checked;
      }
      if(allP[i].type=="text")
      {
              searchDetails[allP[i].id] = allP[i].value;
      }
    }
    myOptions[name] = searchDetails;
    serialize("mapbook", myOptions);
    showSearchs();
  }
}

var loadButtonHandler = function loadButtonHandler(searchDetails,s,bRun)
{
  loadedName = s;
  var allP =document.getElementById('middleColumn').getElementsByTagName("input");
  for( i in allP )
  {
    if(allP[i].type=="checkbox")
    {
      if ( typeof(searchDetails[allP[i].id]) != "undefined" )
      {
        allP[i].checked = searchDetails[allP[i].id] ;
      }
      else
      {
        allP[i].checked = false;
        searchDetails[allP[i].id] = false;
        myOptions[s] = searchDetails;
        serialize("mapbook", myOptions);
      }
    }
    if(allP[i].type=="text")
    {
      if( typeof(searchDetails[allP[i].id]) != "undefined" )
      {
        allP[i].value = searchDetails[allP[i].id];
      }
      else
      {
        allP[i].value = "";
        searchDetails[allP[i].id] = "";
        myOptions[s] = searchDetails;
        serialize("mapbook", myOptions);
      }
    }
  }
  if (bRun)
  {
    document.getElementById('maprank').click();
  }
}

var delButtonHandler = function delButtonHandler(searchName)
{
  if (confirm("Are you sure you want to remove the saved map rank "+ searchName))
  {
      var newOptions = new Object();
      for (var s in myOptions)
      {
              if (s!=searchName)
              {
                      newOptions[s] = myOptions[s];
              }
      }
      myOptions = newOptions;
      serialize("mapbook", myOptions);
      showSearchs();
  }
}

var makedelButtonHandler = function makedelButtonHandler(searchName)
{
  return function () {delButtonHandler (searchName);}
}

var makeloadButtonHandler = function makeloadButtonHandler(search,s,run)
{
  return function () {loadButtonHandler (search,s,run);}
}

var showSearchs = function showSearchs()
{
  var savedSearches = document.getElementById('mapsaved');
  savedSearches.innerHTML = "<b>Saved Map Ranks</b><br />";

  var srchtbl = document.createElement('table');
  savedSearches.appendChild(srchtbl);

  for (var s in myOptions)
  {
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
          spm.href="javascript:void(0);";
          spm.addEventListener("click", makeloadButtonHandler(myOptions[s],s,true), false);

          var srch2 = document.createElement('td');
          srch.appendChild(srch2);

          var spm = document.createElement('a');
          srch2.appendChild(spm);
          spm.innerHTML = "Load";
          spm.href="javascript:void(0);";
          spm.addEventListener("click", makeloadButtonHandler(myOptions[s],s,false), false);

          var srch2 = document.createElement('td');
          srch.appendChild(srch2);

          var spm = document.createElement('a');
          srch2.appendChild(spm);
          spm.innerHTML = "Delete";
          spm.href="javascript:void(0);";
          spm.addEventListener("click", makedelButtonHandler(s), false);
  }
}

function getRank(games,total) {
if(games >= 250 && total >= 4500) return "Field Marshal";
if(games >= 200 && total >= 3500) return "General";
if(games >= 150 && total >= 3000) return "Brigadier";
if(games >= 100 && total >= 2500) return "Colonel";
if(games >= 80 && total >= 2000) return "Major";
if(games >= 60 && total >= 1800) return "Captain";
if(games >= 40 && total >= 1600) return "Lieutenant";
if(games >= 20 && total >= 1400) return "Sergeant 1st Class";
if(games >= 20 && total >= 1300) return "Sergeant";
if(games >= 10 && total >= 1200) return "Corporal 1st Class";
if(games >= 10 && total >= 1100) return "Corporal";
if(games >= 5 && total >= 1000) return "Private 1st Class";
if(games >= 5 && total >= 900) return "Private";
if(games >= 5 && total >= 800) return "Cadet";
if(games >= 5) return "Cook";
return "New Recruit";
}

function nextRank(total) {
if(total >= 4500) return "";
if(total >= 3500) return "<sup>" + (4500 - total) + "</sup>";
if(total >= 3000) return "<sup>" + (3500 - total) + "</sup>";
if(total >= 2500) return "<sup>" + (3000 - total) + "</sup>";
if(total >= 2000) return "<sup>" + (2500 - total) + "</sup>";
if(total >= 1800) return "<sup>" + (2000 - total) + "</sup>";
if(total >= 1600) return "<sup>" + (1800 - total) + "</sup>";
if(total >= 1400) return "<sup>" + (1600 - total) + "</sup>";
if(total >= 1300) return "<sup>" + (1400 - total) + "</sup>";
if(total >= 1200) return "<sup>" + (1300 - total) + "</sup>";
if(total >= 1100) return "<sup>" + (1200 - total) + "</sup>";
if(total >= 1000) return "<sup>" + (1100 - total) + "</sup>";
if(total >= 900) return "<sup>" + (1000 - total) + "</sup>";
if(total >= 800) return "<sup>" + (900 - total) + "</sup>";
return "<sup>" + (800 - total) + "</sup>";
}

function getKiller(losses, defeats) {
if(defeats + losses) {
var ratio = (100 * defeats / (defeats + losses)).toFixed(0);
var pc = "(" + ratio + "%)";
if(ratio >= 95) {
  return "Angel Of Death " + pc;
}
if(ratio >= 90) {
  return "Grim Reaper " + pc + "<sup>" + ((losses * 19) - defeats) + "</sup>";
  }
if(ratio >= 80) {
  return "Warmonger " + pc + "<sup>" + ((losses * 9) - defeats) + "</sup>";
}
if(ratio >= 75) {
  return "Tyrant " + pc + "<sup>" + ((losses * 4) - defeats) + "</sup>";
}
if(ratio >= 50) {
  return "Serial Killer " + pc + "<sup>" + ((losses * 3) - defeats) + "</sup>";
}
if(ratio >= 25) {
  return "Murderer " + pc + "<sup>" + (losses - defeats) + "</sup>";
}
if(ratio >= 10) {
  return "Petty Thug " + pc + "<sup>" + (Math.ceil(losses / 3) - defeats) + "</sup>";
}
return "Victim " + pc + "<sup>" + (Math.ceil(losses / 9) - defeats) + "</sup>";
}
return "Rescan";
}

function getRelative(rank, defeats) {
if(defeats + rank) {
var ratio = (rank / (defeats)).toFixed(3);
var pc = "(" + ratio + ")";
if(ratio >= 1.4) {
  return "Gladiator " + pc;
}
if(ratio >= 1.1) {
  return "Brawler " + pc;
}
if(ratio >= .8) {
  return "Equalitarian " + pc;
}
if(ratio >= .5) {
  return "Point Hoarder " + pc;
}
return "N00b Farmer " + pc;
}
return "N/A (0)";
}

function cleanup() {
  for(var jx in mapReq) {
    mapReq[jx].onreadystatechange = function() {};
    mapReq[jx].abort();
  }
  for(var cx in gameReq) {
    gameReq[cx].onreadystatechange = function() {};
    gameReq[cx].abort();
  }
  mapReq = [];
  gameReq = [];
  while (__eventListeners.length > 0) {
      removeListener(__eventListeners[0]);
  }
  if(viewer != null)
    viewer.close();
}

function sortByCol(id,cellfn, cell, dir) {
var idc = new Array();
for(var i=0; i< sortable[medals].length; i++) {
  idc[sortable[medals][i]] = viewer.document.getElementById(sortable[medals][i]).className;
}
sortedTable(cellfn, cell, dir);
viewer.document.getElementById(id).className = (idc[id] == "sorton" ? "sortoff" : "sorton");
for(var i=0; i< sortable[medals].length; i++) {
  if(sortable[medals][i] != id)
  viewer.document.getElementById(sortable[medals][i]).className = idc[sortable[medals][i]];
}
}

function CCTimeToDate(time) {
time.match(/^(.+?)-(.+?)-(.+?) (.+?):(.+?):(.+?)$/);
return new Date(RegExp.$1,(RegExp.$2 - 1),RegExp.$3,RegExp.$4,RegExp.$5,RegExp.$6);
}

function psort(a,b) {
return(CCTimeToDate(a._time) - CCTimeToDate(b._time));
}

function alpha(cells, sorter) {
  return cells[sorter].innerHTML;
}

function numerical(cells, sorter) {
  return parseInt(cells[sorter].innerHTML);
}

function percent(cells, sorter) {
if(cells[sorter].innerHTML.match(/\((\d+)%\)/)) {
  return parseInt(RegExp.$1);
}
return 0;
}

function factor(cells, sorter) {
if(cells[sorter].innerHTML.match(/\((\d).(\d+)\)/)) {
  return (parseInt(RegExp.$1) * 1000) + parseInt(RegExp.$2);
}
return 0;
}

function sortedTable(cellfn, cell, dir) {
  var res = getElementsByClassName(viewer.document.getElementById('ranktable'),'tr','result',true);
  table = viewer.document.createElement("table");
  for(var r=0; r< 4; r++) {
    var clone = viewer.document.getElementById('ranktable').getElementsByTagName('tr')[r].cloneNode(true);
    table.appendChild(clone);
  }
  var unsorted = new Array();
  var clone = new Array();
  var ref = new Array();
  for(var r=0; r< res.length; r++) {
   var ix = res[r].getElementsByTagName('td');
   ref[r] = cellfn(ix, cell);
   unsorted.push(ref[r]);
   if(isNaN(ref[r]))
   unsorted.sort();
   else
   unsorted.sort(function(a,b) {return(b-a);});
   if(dir == "sortoff") unsorted.reverse();
   clone[r] = res[r].cloneNode(true);
   table.insertBefore(clone[r], table.getElementsByTagName('tr')[unsorted.indexOf(ref[r]) + 4]);
  }
  viewer.document.getElementById('rankBox').removeChild(viewer.document.getElementById('ranktable'));
  table.id = "ranktable";
  table.border=1;
  table.align = "center";
  viewer.document.getElementById('rankBox').appendChild(table);
  setTable();
}

function switchTabs(id) {
  if(id==1) {
    viewer.document.getElementById('lines').style.visibility = "hidden";
    viewer.document.getElementById('cheader').style.visibility = "hidden";
    viewer.document.getElementById('cfooter').style.visibility = "hidden";
    viewer.document.getElementById('buttons').style.visibility = "hidden";
    viewer.document.getElementById('ranktable').style.visibility = "visible";
    viewer.document.getElementById('tab1').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
  }
  else{
    viewer.document.getElementById('lines').style.visibility = "visible";
    viewer.document.getElementById('cheader').style.visibility = "visible";
    viewer.document.getElementById('cfooter').style.visibility = "visible";
    viewer.document.getElementById('buttons').style.visibility = "visible";
    viewer.document.getElementById('ranktable').style.visibility = "hidden";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#0f0";
  }
}

function createBox(txt, name, options) {
  cleanup();
  viewer = window.open('','box','width=1000,height=470,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  viewer.addEventListener('unload', function() {
    viewer=null;
    cleanup();
    }, false);
  var style = viewer.document.getElementsByTagName('head')[0].appendChild(viewer.document.createElement("style"));
  style.type = 'text/css';
  style.innerHTML = "#rankDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;} ";
  style.innerHTML += "#rankBox {position:relative;min-width:1000px;height:100%;margin-top:10px;margin-left:20px;border:2px solid #000;background-color:#F2F5F6;} ";
  style.innerHTML += "#rankDiv > #rankBox {position:fixed;overflow:auto;} #ranktable{margin-bottom:20px;align:center;width:94%;padding:0px;border:1px solid black;text-align:center;font: 7.1pt Verdana, Arial, Helvetica, sans-serif;} ";
  style.innerHTML += "#rankBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;} ";
  style.innerHTML += "#rankBox p {font:0.7em verdana,arial;padding-left:50px;width:900px;} #ranktable td {width:125px;vertical-align: middle;} .result {font-weight:bold;color:#00f;height:20px} .totals {color:#000;} ";
  style.innerHTML += "#rankBox a {display:inline;position:relative;border:1px solid #000;width:100px;font: verdana,arial;text-transform:uppercase;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox a:hover,#rankBox #closeRank:hover {background-color:#889988;;color:#fff} .header {background-color:#cdc;font-weight:bold;} ";
  style.innerHTML += "#rankBox #closeRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox img {position:relative;top:20px;left:20px;} .rankoptions {width:100px;} .bmedal {font-weight:bold;color:#8C7853} .smedal {font-weight:bold;color:silver} .gmedal {font-weight:bold;color:gold} ";
  style.innerHTML += ".sorton,.sortoff {background-color:cyan;cursor:pointer;} #wstreak {cursor:pointer;text-decoration:underline;color:green} #lstreak {cursor:pointer;text-decoration:underline;color:red}";
  style.innerHTML += "#lines {display:none;overflow: auto;width:100%;height:500px;position:absolute;z-index:200;top:150px;align:center;padding:0px;border:1px solid black;text-align:center;font: 7pt Verdana, Arial, Helvetica, sans-serif;}";
  style.innerHTML += "#cheader {display:none;width:100%;position:absolute;z-index:200;top:100px;margin:0px;padding:0px;font: 7pt Verdana, Arial, Helvetica, sans-serif;}";
  style.innerHTML += "#cheader h3{text-align:center;border:1px solid black;} .chart {background-color:yellow;color:red;cursor:pointer;}";
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
  mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
  mObj.id = "rankDiv";
  mObj.style.visibility = 'hidden';
  mObj.style.height = viewer.document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(viewer.document.createElement("div"));
  alertObj.id = "rankBox";
  alertObj.style.left = (viewer.document.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  h1 = alertObj.appendChild(viewer.document.createElement("h1"));
  h1.appendChild(viewer.document.createTextNode("MAP RANK"));
  msg = alertObj.appendChild(viewer.document.createElement("p"));
  msg.id = "progress";
  msg.innerHTML = txt;
  btn = alertObj.appendChild(viewer.document.createElement("a"));
  btn.id = "closeRank";
  btn.appendChild(viewer.document.createTextNode("CLOSE"));
  btn.href = "javascript:void(0);";
  btn.style.opacity = "0.5";
  addListener(btn,'click', function() {
    if(btn.style.backgroundColor == "green")
    removeBox();
  });
  tabs = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tabs.id = "tabs";
  tabs.innerHTML = "<table><tr><td><a href=\"javascript:void(0)\" id=tab1>Table</a></td><td><a href=\"javascript:void(0)\" id=tab2>Chart</a></td></tr></table>";
  addListener(viewer.document.getElementById('tab1'),'click', function() {
    switchTabs(1);
  });
  addListener(viewer.document.getElementById('tab2'),'click', function() {
    switchTabs(2);
  });
  table = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("table"));
  table.id = "ranktable";
  table.border=1;
  table.align = "center";
  heading = table.appendChild(viewer.document.createElement("tr"));
  opt = table.appendChild(viewer.document.createElement("tr"));
  cols = table.appendChild(viewer.document.createElement("tr"));
  tots = table.appendChild(viewer.document.createElement("tr"));
  tots.id = "summary";
  tots.className = "result totals";
  opt.className = "header";
  if(medals) {
   heading.innerHTML = "<td class=header colspan=8>Map Rank For " + name + "</td>";
   opt.innerHTML = "<td colspan=8><b>Options:</b> " + options + "</td>";
   cols.innerHTML = "<td id=smap><b>Map</b></td><td><b>Rank</b></td><td id=spts><b>Points</b></td><td id=swin><b>Win/Loss</b></td><td><b>Playing First</b></td><td id=suni><b>Unique Defeats</b></td><td id=skil><b>Kill Ratio</b></td><td id=srel><b>Relative Rank</b></td>";
   tots.innerHTML = "<td><b>Totals</b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
  }
  else{
   heading.innerHTML = "<td id=header class=header colspan=3>Map Rank For " + name + "</td>";
   opt.innerHTML = "<td colspan=3><b>Options:</b> " + options + "</td>";
   cols.innerHTML = "<td id=smap><b>Map</b></td><td id=swin><b>Win/Loss</b></td><td id=suni><b>Unique Defeats</b></td>";
   tots.innerHTML = "<td><b>Totals</b></td><td>&nbsp;</td><td>&nbsp;</td>";
  }
  mObj.style.visibility = 'visible';
  chartheader = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  chartheader.id = "cheader";
  container = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  container.id = "lines";
  chartfooter = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  chartfooter.id = "cfooter";
  chartbutt = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  chartbutt.id = "buttons";
  switchTabs(1);
}

function removeBox() {
  viewer.close();
  viewer = null;
  mapReq = [];
  gameReq = [];
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

function cboxValues(name) {
 var cbox = document.getElementsByName(name);
 var out = [];
  for(var n=0;n<cbox.length;n++) {
    if(cbox[n].checked) out.push(cbox[n].value);
  }
  return out;
}

function getGame(maptype, game, page, user, numGames) {
  var mapname = maps[maptype];
  gameReq[mapname + game] = new XMLHttpRequest();
  gameReq[mapname + game].open('GET', 'http://www.conquerclub.com/game.php?game=' + game + '&ajax=1', true);
  gameReq[mapname + game].onreadystatechange = function() {
   if (gameReq[mapname + game].readyState == 4) {
      var chunks = gameReq[mapname + game].responseText.split("&");
      var udiv = document.createElement('div');
      udiv.innerHTML = chunks[4];
      var lis = udiv.getElementsByTagName('li');
      var players = [];
      var winner = 0;
      var numPlayers = 0;
      var numTeams = 0;
      var triumph = "";
      for(l=0; l<lis.length; l++) {
        var anc = lis[l].getElementsByTagName('a');
        if(lis[l].className.match(/status_green/)) {
         numPlayers++;
         if(anc[1].href.match(/username=(.+?)$/)) {
          var names = unescape(RegExp.$1).replace(/\+/g, " ");
          triumph = names;
          if(user.indexOf('*') == -1 && names.match(user,"i")) {
           ranks[maps[maptype]]._wins++;
           winner = 1;
          }
          else if(user.indexOf('*') != -1 && names.indexOf(user) != -1) {
           ranks[maps[maptype]]._wins++;
           winner = 1;
          }
         }
        }
        else{
         if(!lis[l].innerHTML.match(/<b>Team (\d):/)) {
           numPlayers++;
           if(anc[1].href.match(/username=(.+?)$/)) {
            var names = unescape(RegExp.$1).replace(/\+/g, " ");
            if(!(user.indexOf('*') == -1 && names.match(user,"i"))) {
              players.push(names);
            }
            else if(!(user.indexOf('*') != -1 && names.indexOf(user) != -1)) {
              players.push(names);
            }
           }
         }
         else{
           numTeams++;
         }
        }
      }
      if(winner) {
      if(numTeams) {
        ranks[maps[maptype]]._kills += numTeams - 1;
        totals._kills += numTeams - 1;
      }
      else{
        ranks[maps[maptype]]._kills += numPlayers - 1;
        totals._kills += numPlayers - 1;
      }
      for(var p=0; p<players.length;p++) {
        if(unique[maps[maptype]].indexOf(players[p]) == -1) {
            unique[maps[maptype]].push(players[p]);
        }
        if(totals._insignia) {
         if(totals._types[game].match(/Speed/)) {
           if(totals._defeats['Speed'].indexOf(players[p]) == -1) {
             totals._defeats['Speed'].push(players[p]);
             ranks[maps[maptype]]._defeats['Speed'].push(players[p]);
           }
           var s = totals._types[game].split(",");
           if(totals._defeats[s[1]].indexOf(players[p]) == -1) {
             totals._defeats[s[1]].push(players[p]);
             ranks[maps[maptype]]._defeats[s[1]].push(players[p]);
           }
         }
         else{
           if(totals._defeats[totals._types[game]].indexOf(players[p]) == -1) {
             totals._defeats[totals._types[game]].push(players[p]);
             ranks[maps[maptype]]._defeats[totals._types[game]].push(players[p]);
           }
         }
        }
        if(totals._unique.indexOf(players[p]) == -1) {
            totals._unique.push(players[p]);
        }
      }
      totals._wins++;
      }
      totals._games++;
      udiv = null;
      if(chunks[15]){
      var lines = chunks[15].split(/<br>|<br \/>/);
      if(lines.length > 1) {
        if(user.indexOf('*') == -1 && lines[1].match(user,"i")) {
         ranks[maps[maptype]]._firsts++;
         totals._firsts++;
         if(winner) {
         ranks[maps[maptype]]._wonfirsts++;
         totals._wonfirsts++;
         }
        }
        else if(user.indexOf('*') != -1 && lines[1].indexOf(user) != -1) {
         ranks[maps[maptype]]._firsts++;
         totals._firsts++;
         if(winner) {
         ranks[maps[maptype]]._wonfirsts++;
         totals._wonfirsts++;
         }
        }
      }
      var num= lines.length - 1;
      var losers = 0;
      var holder;
      var myLoss = 0;
      var meanwin = 0;
      var meanloss = 0;
      var beaten = 0;
      var maxLosers = (numTeams == 0)? (numPlayers - 1):(numPlayers - (numPlayers / numTeams));
      if(totals._types[game].match(/Terminator/)) {
      var mapwin = new Object();
      var maploss = new Object();
      while(num > 0 && losers < maxLosers) {
        if(lines[num].match(/>(.+?)<(.+?) eliminated (.+?)>(.+?)<(.+?) from/)) {
          fred = RegExp.$1;
          barn = RegExp.$4;
          if(!mapwin[fred]) mapwin[fred] = new Pinfo();
          if(!maploss[barn]) maploss[barn] = new Pinfo();
          mapwin[fred]._defeats[barn] = 1;
          maploss[barn]._defeats[fred] = 1;
          losers++;
        }
        else if(lines[num].match(/>(.+?)<(.+?) was kicked out for missing too many turns/)) {
          fred = RegExp.$1;
          if(!maploss[fred]) {
            maploss[fred] = new Pinfo();
            maploss[fred]._defeats[triumph] = 1;
            if(!mapwin[triumph])
             mapwin[triumph] = new Pinfo();
            mapwin[triumph]._defeats[fred] = 1;
            losers++;
          }
        }
        num--;
      }
      num = lines.length - 1;
      losers = 0;
      while(num > 0 && losers < maxLosers) {
        if(lines[num].match(/^(.+?) - (.+?)>(.+?)<(.+?) gains (\d+) points/)) {
          var gain = parseInt(RegExp.$5);
          var tim = RegExp.$1;
          if(user.indexOf('*') == -1 && lines[num].match(user,"i")) {
           ranks[maps[maptype]]._rank += gain;
           pt = new Point(tim, gain);
           totals._parray.push(pt);
           ranks[maps[maptype]]._parray.push(pt);
           meanwin += gain;
           if(!holder) {
             wl = new Point(tim, 1);
             totals._warray.push(wl);
             ranks[maps[maptype]]._warray.push(wl);
             holder = tim;
           }
           beaten++;
          }
          else if(user.indexOf('*') != -1 && lines[num].indexOf(user) != -1) {
           ranks[maps[maptype]]._rank += gain;
           pt = new Point(tim, gain);
           totals._parray.push(pt);
           ranks[maps[maptype]]._parray.push(pt);
           meanwin += gain;
           if(!holder) {
             wl = new Point(tim, 1);
             totals._warray.push(wl);
             ranks[maps[maptype]]._warray.push(wl);
             holder = tim;
           }
           beaten++;
          }
          else{
           if(!holder) {
             if(winner)
             wl = new Point(tim, 1);
             else
             wl = new Point(tim, -1);
             totals._warray.push(wl);
             ranks[maps[maptype]]._warray.push(wl);
             holder = tim;
           }
          }
        }
        else if(lines[num].match(/^(.+?) - (.+?)>(.+?)<(.+?) loses (\d+) points/)) {
          var loss = parseInt(RegExp.$5);
          var tim = RegExp.$1;
          barn = RegExp.$3;
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
          losers++;
          if(user.indexOf('*') == -1 && lines[num].match(user,"i")) {
          ranks[maps[maptype]]._rank -= loss;
          pt = new Point(tim, -loss);
          totals._parray.push(pt);
          ranks[maps[maptype]]._parray.push(pt);
          myLoss = loss;
          }
          else if(user.indexOf('*') != -1 && lines[num].indexOf(user) != -1) {
          ranks[maps[maptype]]._rank -= loss;
          pt = new Point(tim, -loss);
          totals._parray.push(pt);
          ranks[maps[maptype]]._parray.push(pt);
          myLoss = loss;
          }
        }
        num--;
      }
      var target = user;
      if(winner) {
       for(var u in mapwin) {
        if(user.indexOf('*') == -1 && u.match(user,"i")) {
          target = u;
        }
        else if(user.indexOf('*') != -1 && u.indexOf(user) != -1) {
          target = u;
        }
       }
       var overall = cascadewin(mapwin, target);
       ranks[maps[maptype]]._meanwin += overall;
       totals._meanwin += overall;
       ranks[maps[maptype]]._beaten += (numPlayers - 1);
       totals._beaten += (numPlayers - 1);
      }
      else{
       for(var u in maploss) {
        if(user.indexOf('*') == -1 && u.match(user,"i")) {
          target = u;
        }
        else if(user.indexOf('*') != -1 && u.indexOf(user) != -1) {
          target = u;
        }
       }
       var overall = 20 * cascadewin(mapwin, triumph);
       myLoss = 20 * cascadeloss(maploss, target);
       if(myLoss) {
        var collect = (((overall + 20) / myLoss) - 1);
        ranks[maps[maptype]]._meanwin += collect;
        totals._meanwin += collect;
        ranks[maps[maptype]]._beaten += (numPlayers - 1);
        totals._beaten += (numPlayers - 1);
       }
       else{
        ranks[maps[maptype]]._missing++;
       }
      }
      }
      else{
      while(num > 0 && losers < maxLosers) {
        if(lines[num].match(/^(.+?) - (.+?) gains (\d+) points/)) {
          var gain = parseInt(RegExp.$3);
          var tim = RegExp.$1;
          if(user.indexOf('*') == -1 && lines[num].match(user,"i")) {
           ranks[maps[maptype]]._rank += gain;
           pt = new Point(tim, gain);
           totals._parray.push(pt);
           ranks[maps[maptype]]._parray.push(pt);
           meanwin += gain;
           if(!holder) {
             wl = new Point(tim, 1);
             totals._warray.push(wl);
             ranks[maps[maptype]]._warray.push(wl);
             holder = tim;
           }
           beaten++;
          }
          else if(user.indexOf('*') != -1 && lines[num].indexOf(user) != -1) {
           ranks[maps[maptype]]._rank += gain;
           pt = new Point(tim, gain);
           totals._parray.push(pt);
           ranks[maps[maptype]]._parray.push(pt);
           meanwin += gain;
           if(!holder) {
             wl = new Point(tim, 1);
             totals._warray.push(wl);
             ranks[maps[maptype]]._warray.push(wl);
             holder = tim;
           }
           beaten++;
          }
          else{
           if(!holder) {
             if(winner)
             wl = new Point(tim, 1);
             else
             wl = new Point(tim, -1);
             totals._warray.push(wl);
             ranks[maps[maptype]]._warray.push(wl);
             holder = tim;
           }
          }
        }
        else if(lines[num].match(/^(.+?) - (.+?) loses (\d+) points/)) {
          var loss = parseInt(RegExp.$3);
          var tim = RegExp.$1;
          losers++;
          meanloss += loss;
          if(user.indexOf('*') == -1 && lines[num].match(user,"i")) {
          ranks[maps[maptype]]._rank -= loss;
          pt = new Point(tim, -loss);
          totals._parray.push(pt);
          ranks[maps[maptype]]._parray.push(pt);
          myLoss = loss;
          }
          else if(user.indexOf('*') != -1 && lines[num].indexOf(user) != -1) {
          ranks[maps[maptype]]._rank -= loss;
          pt = new Point(tim, -loss);
          totals._parray.push(pt);
          ranks[maps[maptype]]._parray.push(pt);
          myLoss = loss;
          }
        }
        else if(lines[num].match(/ was kicked out for missing too many turns/)) {
          losers++;
        }
        num--;
      }
      if(winner) {
        if(numTeams) {
         ranks[maps[maptype]]._meanwin += (numPlayers / numTeams) * meanwin / 20;
         totals._meanwin += (numPlayers / numTeams) * meanwin / 20;
         ranks[maps[maptype]]._beaten += maxLosers;
         totals._beaten += maxLosers;
        }
        else{
         ranks[maps[maptype]]._meanwin += meanwin / 20;
         totals._meanwin += meanwin / 20;
         ranks[maps[maptype]]._beaten += (numPlayers - 1);
         totals._beaten += (numPlayers - 1);
        }
      }
      else{
        if(numTeams) {
         if(myLoss) {
          ranks[maps[maptype]]._meanwin += (((meanloss + (20 * (numPlayers / numTeams) * (numPlayers / numTeams))) / ((numPlayers / numTeams) * myLoss)) - 1);
          totals._meanwin += (((meanloss + (20 * (numPlayers / numTeams) * (numPlayers / numTeams))) / ((numPlayers / numTeams) * myLoss)) - 1);
          ranks[maps[maptype]]._beaten += maxLosers;
          totals._beaten += maxLosers;
         }
         else{
          ranks[maps[maptype]]._missing++;
         }
        }
        else{
         if(myLoss) {
          ranks[maps[maptype]]._meanwin += (((meanloss + 20) / myLoss) - 1);
          totals._meanwin += (((meanloss + 20) / myLoss) - 1);
          ranks[maps[maptype]]._beaten += (numPlayers - 1);
          totals._beaten += (numPlayers - 1);
         }
         else{
          ranks[maps[maptype]]._missing++;
         }
        }
      }
      }
      }
      else{
        ranks[maps[maptype]]._missing++;
      }
      ranks[maps[maptype]]._counter++;
      viewer.document.getElementById('progress').innerHTML = "Scanning " + user + " " + mapname + " Games: " + ranks[maps[maptype]]._counter + " of " + numGames + " " + (100 * (ranks[maps[maptype]]._counter)/(numGames)).toFixed(0) + "%";
      if(ranks[maps[maptype]]._counter == numGames) {
        if(ranks[maps[maptype]]._rank >= 1000) srank = "+" + (ranks[maps[maptype]]._rank - 1000);
        else srank = ranks[maps[maptype]]._rank - 1000;
        totals._points += ranks[maps[maptype]]._rank - 1000;
        var tr = viewer.document.createElement('tr');
        totals._sorted.push(mapname);
        totals._sorted.sort();
        viewer.document.getElementById('ranktable').insertBefore(tr,viewer.document.getElementById('ranktable').getElementsByTagName('tr')[totals._sorted.indexOf(mapname) + 4]);
        tr.className = "result";
        if(unique[maps[maptype]].length >= 5) {
          totals._crossmap[maptype] = 1;
          totals._crossmaps++;
        }
        else{
          totals._crossmap[maptype] = 0;
        }
        if(ranks[maps[maptype]]._missing) missing = "<sup>" + ranks[maps[maptype]]._missing + "</sup>";
        else missing = "";
        tr.innerHTML = "<td id=gtot" + maptype + ">" + mapname + missing + "</td><td>" + getRank(250, ranks[maps[maptype]]._rank) + nextRank(ranks[maps[maptype]]._rank) + "</td><td>" + srank + "</td><td id=wtot" + maptype + ">" + "Won " + ranks[maps[maptype]]._wins + " from " + numGames + "(" + (100 * (ranks[maps[maptype]]._wins)/(numGames)).toFixed(0) + "%)</td><td>" + "Won " + ranks[maps[maptype]]._wonfirsts + " from " + ranks[maps[maptype]]._firsts + "</td><td id=result" + maptype + ">" + unique[maps[maptype]].length + "</td><td>"  + getKiller(ranks[maps[maptype]]._games.length - ranks[maps[maptype]]._wins,ranks[maps[maptype]]._kills) + "</td><td>" + getRelative(ranks[maps[maptype]]._meanwin,ranks[maps[maptype]]._beaten) + "</td>";
        var tr = viewer.document.getElementById('summary');
        if(totals._points >= 0) trank = "+" + (totals._points);
        else trank = totals._points;
        totals._missing += ranks[maps[maptype]]._missing;
        if(totals._missing) missing = "<sup>" + totals._missing + "</sup>";
        else missing = "";
        tr.innerHTML = "<td><b>Totals" + missing + "</b></td><td>" + getRank(totals._games, totals._points + 1000) + nextRank(totals._points + 1000) + "</td><td>" + trank + "</td><td id=wtot>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + "Won " + totals._wonfirsts + " from " + totals._firsts + "</td><td>" + totals._unique.length + " (<span class=" + '' + ">" + totals._crossmaps + "</span>)</td><td>"  + getKiller(totals._games - totals._wins,totals._kills) + "</td><td>" + getRelative(totals._meanwin,totals._beaten) + "</td>";
        if(totals._insignia) {
          myStore._ranks[maps[maptype]] = ranks[maps[maptype]];
          myStore._unique[maps[maptype]] = unique[maps[maptype]];
        }
        totals._counter++;
        if(totals._counter == total) {
          endGame();
        }
      }
   }
  }
  gameReq[mapname + game].send(null);
}

function getStatsPage(user,url,maptype,page) {
    var mapname = maps[maptype];
    var jump = url;
    if(page > 1) jump += "&page=" + page;
    mapReq[mapname + page] = new XMLHttpRequest();
    mapReq[mapname + page].open('GET', jump, true);
    mapReq[mapname + page].onreadystatechange = function() {
      if (mapReq[mapname + page].readyState == 4) {
        var div=document.createElement('div');
        div.innerHTML = mapReq[mapname + page].responseText;
        var results = getElementsByClassName(div,'span','search_results',true);
        if(results.length && results[0].innerHTML.match(/(\d+) results on (\d+) pages/)) {
          var numGames = parseInt(RegExp.$1);
          var thisPage = parseInt(RegExp.$2);
          if(totals._insignia && myStore._ranks[maps[maptype]] && myStore._ranks[maps[maptype]]._counter == numGames && myStore._medals == medals) {
            var tr = viewer.document.createElement('tr');
            totals._sorted.push(mapname);
            totals._sorted.sort();
            viewer.document.getElementById('ranktable').insertBefore(tr,viewer.document.getElementById('ranktable').getElementsByTagName('tr')[totals._sorted.indexOf(mapname) + 4]);
            tr.className = "result";
            if(myStore._unique[maps[maptype]].length >= 5) {
              totals._crossmap[maptype] = 1;
              totals._crossmaps++;
            }
            else{
              totals._crossmap[maptype] = 0;
            }
            totals._games+=numGames;
            totals._wins += myStore._ranks[maps[maptype]]._wins;
            totals._firsts += myStore._ranks[maps[maptype]]._firsts;
            totals._wonfirsts += myStore._ranks[maps[maptype]]._wonfirsts;
            for(var p=0; p< myStore._unique[maps[maptype]].length; p++) {
              if(totals._unique.indexOf(myStore._unique[maps[maptype]][p]) == -1) {
                totals._unique.push(myStore._unique[maps[maptype]][p]);
              }
            }
            for(d in myStore._ranks[maps[maptype]]._defeats) {
              for(var p=0; p< myStore._ranks[maps[maptype]]._defeats[d].length; p++) {
               if(totals._defeats[d].indexOf(myStore._ranks[maps[maptype]]._defeats[d][p]) == -1) {
                 totals._defeats[d].push(myStore._ranks[maps[maptype]]._defeats[d][p]);
               }
              }
            }
            if(medals) {
              if(myStore._ranks[maps[maptype]]._rank >= 1000) srank = "+" + (myStore._ranks[maps[maptype]]._rank - 1000);
              else srank = myStore._ranks[maps[maptype]]._rank - 1000;
              totals._points += myStore._ranks[maps[maptype]]._rank - 1000;
              if(myStore._ranks[maps[maptype]]._missing) missing = "<sup>" + myStore._ranks[maps[maptype]]._missing + "</sup>";
              else missing = "";
              if(typeof(myStore._ranks[maps[maptype]]._kills) != "undefined") {
                losses = myStore._ranks[maps[maptype]]._games.length - myStore._ranks[maps[maptype]]._wins;
                kills = myStore._ranks[maps[maptype]]._kills;
              }
              else {
                kills = 0;
                losses = 0;
              }
              if(typeof(myStore._ranks[maps[maptype]]._beaten) != "undefined") {
                mean = myStore._ranks[maps[maptype]]._meanwin;
                beat = myStore._ranks[maps[maptype]]._beaten;
              }
              else{
                mean = 0;
                beat = 0;
              }
              if(typeof(myStore._ranks[maps[maptype]]._parray) != "undefined") {
                for(var p=0; p< myStore._ranks[maps[maptype]]._parray.length; p++) {
                  totals._parray.push(myStore._ranks[maps[maptype]]._parray[p]);
                }
              }
              else{
                myStore._ranks[maps[maptype]]._parray = new Array();
              }
              if(typeof(myStore._ranks[maps[maptype]]._warray) != "undefined") {
                for(var p=0; p< myStore._ranks[maps[maptype]]._warray.length; p++) {
                  totals._warray.push(myStore._ranks[maps[maptype]]._warray[p]);
                }
              }
              else{
                myStore._ranks[maps[maptype]]._warray = new Array();
              }
              tr.innerHTML = "<td id=gtot" + maptype + ">" + mapname + missing + "</td><td>" + getRank(250, myStore._ranks[maps[maptype]]._rank) + nextRank(myStore._ranks[maps[maptype]]._rank) + "</td><td>" + srank + "</td><td id=wtot" + maptype + ">" + "Won " + myStore._ranks[maps[maptype]]._wins + " from " + numGames + "(" + (100 * (myStore._ranks[maps[maptype]]._wins)/(numGames)).toFixed(0) + "%)</td><td>" + "Won " + myStore._ranks[maps[maptype]]._wonfirsts + " from " + myStore._ranks[maps[maptype]]._firsts + "</td><td id=result" + maptype + ">" + myStore._unique[maps[maptype]].length + "</td><td>" + getKiller(losses,kills) + "</td><td>" + getRelative(mean,beat) + "</td>";
              var tr = viewer.document.getElementById('summary');
              if(totals._points >= 0) trank = "+" + (totals._points);
              else trank = totals._points;
              if(myStore._ranks[maps[maptype]]._missing)
                totals._missing += myStore._ranks[maps[maptype]]._missing;
              if(myStore._ranks[maps[maptype]]._kills)
                totals._kills += myStore._ranks[maps[maptype]]._kills;
              if(myStore._ranks[maps[maptype]]._beaten){
                totals._meanwin += myStore._ranks[maps[maptype]]._meanwin;
                totals._beaten += myStore._ranks[maps[maptype]]._beaten;
              }
              if(totals._missing) missing = "<sup>" + totals._missing + "</sup>"
              else missing = "";
              if(typeof(totals._kills) != "undefined") {
                losses = totals._games - totals._wins;
                kills = totals._kills;
              }
              else {
                kills = 0;
                losses = 0;
              }
              if(typeof(totals._beaten) != "undefined") {
                mean = totals._meanwin;
                beat = totals._beaten;
              }
              else{
                mean = 0;
                beat = 0;
              }
              tr.innerHTML = "<td><b>Totals" + missing + "</b></td><td>" + getRank(totals._games, totals._points + 1000) + nextRank(totals._points + 1000) + "</td><td>" + trank + "</td><td>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + "Won " + totals._wonfirsts + " from " + totals._firsts + "</td><td>" + totals._unique.length + " (<span class=" + '' + ">" + totals._crossmaps + "</span>)</td><td>" + getKiller(losses, kills) + "</td><td>" + getRelative(mean,beat) + "</td>";
            }
            else{
              tr.innerHTML = "<td>" + mapname + "</td><td>" + "Won " + myStore._ranks[maps[maptype]]._wins + " from " + numGames + "(" + (100 * (myStore._ranks[maps[maptype]]._wins)/(numGames)).toFixed(0) + "%)</td><td id=result" + maptype + ">" + myStore._unique[maps[maptype]].length + "</td>";
              var tr = viewer.document.getElementById('summary');
              tr.innerHTML = "<td><b>Totals</b></td><td>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + totals._unique.length + " (<span class=" + '' + ">" + totals._crossmaps + "</span>)</td>";
            }
            totals._counter++;
            if(totals._counter == total) {
              endGame();
            }
          }
          else{
            var gamenos = getElementsByClassName(div,'span','gameno',true);
            for(g=0; g<gamenos.length;g++) {
             ranks[maps[maptype]]._games.push(gamenos[g].innerHTML);
            }
            ranks[maps[maptype]]._pages++;
            viewer.document.getElementById('progress').innerHTML = "Collecting " + user + " " + mapname + " Games: " + (100 * (ranks[maps[maptype]]._pages)/(thisPage)).toFixed(0) + "%";
            if(page == 1) {
             ranks[maps[maptype]]._wins = 0;
             unique[maps[maptype]] = new Array();
             ranks[maps[maptype]]._rank = 1000;
             if(thisPage > 1) {
               for(var pg=2;pg<=thisPage;pg++) {
               getStatsPage(user,url,maptype,pg);
               }
             }
            }
            if(totals._insignia) {
             for(g=0; g<gamenos.length;g++) {
              var speed = previousSib(gamenos[g].parentNode.parentNode);
              var type = nextSib(gamenos[g].parentNode).innerHTML.split("<br>")[0];
              if(type.match(/^(\w+)/)) {
                type=RegExp.$1;
              }
              if(speed.childNodes[1].colSpan == 7 && speed.childNodes[1].innerHTML.match(/Speed Game/)) {
               totals._types[gamenos[g].innerHTML] = "Speed," + type;
              }
              else{
               totals._types[gamenos[g].innerHTML] = type;
              }
             }
            }
            else{
             for(g=0; g<gamenos.length;g++) {
              var type = nextSib(gamenos[g].parentNode).innerHTML.split("<br>")[0];
              if(type.match(/^(\w+)/)) {
               totals._types[gamenos[g].innerHTML] = RegExp.$1;
              }
             }
            }
            if(medals) {
             for(var i=0;i< gamenos.length;i++) {
               getGame(maptype, gamenos[i].innerHTML, page, user, numGames);
             }
            }
            else{
              var uls = getElementsByClassName(div,'ul','players',true);
              for(var u=0; u< uls.length; u++) {
                var spans = uls[u].getElementsByTagName('span');
                var players = [];
                var winner = 1;
                for(sp=0; sp<spans.length; sp++) {
                  var anc = spans[sp].getElementsByTagName('a');
                  if(anc[1].href.match(/username=(.+?)$/)) {
                   var names = unescape(RegExp.$1).replace(/\+/g, " ");
                   if((user.indexOf('*') == -1 && names.match(user,"i"))) {
                     winner = 0;
                   }
                   else if((user.indexOf('*') != -1 && names.indexOf(user) != -1)) {
                     winner = 0;
                   }
                   else if(!(user.indexOf('*') == -1 && names.match(user,"i"))) {
                     players.push(names);
                   }
                   else if(!(user.indexOf('*') != -1 && names.indexOf(user) != -1)) {
                     players.push(names);
                   }
                  }
                }
                if(winner) {
                ranks[maps[maptype]]._wins++;
                for(var p=0; p<players.length;p++) {
                  if(unique[maps[maptype]].indexOf(players[p]) == -1) {
                      unique[maps[maptype]].push(players[p]);
                  }
                  if(totals._insignia) {
                   if(totals._types[gamenos[u].innerHTML].match(/Speed/)) {
                     if(totals._defeats['Speed'].indexOf(players[p]) == -1) {
                       totals._defeats['Speed'].push(players[p]);
                       ranks[maps[maptype]]._defeats['Speed'].push(players[p]);
                     }
                     var s = totals._types[gamenos[u].innerHTML].split(",");
                     if(totals._defeats[s[1]].indexOf(players[p]) == -1) {
                       totals._defeats[s[1]].push(players[p]);
                       ranks[maps[maptype]]._defeats[s[1]].push(players[p]);
                     }
                   }
                   else{
                     if(totals._defeats[totals._types[gamenos[u].innerHTML]].indexOf(players[p]) == -1) {
                       totals._defeats[totals._types[gamenos[u].innerHTML]].push(players[p]);
                       ranks[maps[maptype]]._defeats[totals._types[gamenos[u].innerHTML]].push(players[p]);
                     }
                   }
                  }
                  if(totals._unique.indexOf(players[p]) == -1) {
                      totals._unique.push(players[p]);
                  }
                }
                totals._wins++;
                }
                totals._games++;
                ranks[maps[maptype]]._counter++;
                viewer.document.getElementById('progress').innerHTML = "Scanning " + user + " " + mapname + " Games: " + (100 * (ranks[maps[maptype]]._counter)/(numGames)).toFixed(0) + "%";
                if(ranks[maps[maptype]]._counter == numGames) {
                  var tr = viewer.document.createElement('tr');
                  totals._sorted.push(mapname);
                  totals._sorted.sort();
                  viewer.document.getElementById('ranktable').insertBefore(tr,viewer.document.getElementById('ranktable').getElementsByTagName('tr')[totals._sorted.indexOf(mapname) + 4]);
                  tr.className = "result";
                  if(unique[maps[maptype]].length >= 5) {
                    totals._crossmap[maptype] = 1;
                    totals._crossmaps++;
                  }
                  else{
                    totals._crossmap[maptype] = 0;
                  }
                  tr.innerHTML = "<td>" + mapname + "</td><td>" + "Won " + ranks[maps[maptype]]._wins + " from " + numGames + "(" + (100 * (ranks[maps[maptype]]._wins)/(numGames)).toFixed(0) + "%)</td><td id=result" + maptype + ">" + unique[maps[maptype]].length + "</td>";
                  if(totals._insignia) {
                    myStore._ranks[maps[maptype]] = ranks[maps[maptype]];
                    myStore._unique[maps[maptype]] = unique[maps[maptype]];
                  }
                  var tr = viewer.document.getElementById('summary');
                  tr.innerHTML = "<td><b>Totals</b></td><td>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + totals._unique.length + " (<span class=" + '' + ">" + totals._crossmaps + "</span>)</td>";
                  totals._counter++;
                  if(totals._counter == total) {
                    endGame();
                  }
                }
              }
            }
          }
        }
        else {
         totals._crossmap[maptype] = 0;
         viewer.document.getElementById('progress').innerHTML = user + " has not played any " + mapname + " Games";
         if(totals._insignia) {
           myStore._ranks[maps[maptype]] = ranks[maps[maptype]];
           myStore._unique[maps[maptype]] = new Array();
         }
         var tr = viewer.document.getElementById('summary');
         if(medals) {
          if(totals._points >= 0) trank = "+" + (totals._points);
          else trank = totals._points;
          if(totals._missing) missing = "<sup>" + totals._missing + "</sup>";
          else missing = "";
          tr.innerHTML = "<td><b>Totals" + missing + "</b></td><td>" + getRank(totals._games, totals._points + 1000) + nextRank(totals._points + 1000) + "</td><td>" + trank + "</td><td id=wtot>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + "Won " + totals._wonfirsts + " from " + totals._firsts + "</td><td>" + totals._unique.length + " (<span class=" + '' + ">" + totals._crossmaps + "</span>)</td><td>" + getKiller(totals._games - totals._wins, totals._kills) + "</td><td>" + getRelative(totals._meanwin,totals._beaten) + "</td>";
         }
         else
         tr.innerHTML = "<td><b>Totals</b></td><td>" + "Won " + totals._wins + " from " + totals._games + "(" + (100 * (totals._wins)/(totals._games)).toFixed(0) + "%)</td><td>" + totals._unique.length + " (<span class=" + '' + ">" + totals._crossmaps + "</span>)</td>";
         totals._counter++;
         if(totals._counter == total) {
           endGame();
         }
        }
      }
    }
    mapReq[mapname + page].send(null);
}

function getRatings(user,url,page) {
    var jump = url;
    if(page > 1) jump += "&page=" + page;
    rateReq[page] = new XMLHttpRequest();
    rateReq[page].open('GET', jump, true);
    rateReq[page].onreadystatechange = function() {
      if (rateReq[page].readyState == 4) {
        var div=document.createElement('div');
        div.innerHTML = rateReq[page].responseText;
        var results = getElementsByClassName(div,'span','search_results',true);
        if(results.length && results[0].innerHTML.match(/(\d+) results on (\d+) pages/)) {
          var numGames = parseInt(RegExp.$1);
          var thisPage = parseInt(RegExp.$2);
          var rates = getElementsByClassName(div,'a','rating',true);
          for(var r=0; r<rates.length;r++) {
            if(rates[r].href.match(/username=(.+?)$/)) {
             var names = unescape(RegExp.$1).replace(/\+/g, " ");
             if(totals._defeats['Rating'].indexOf(names) == -1) {
               totals._defeats['Rating'].push(names);
             }
            }
          }
          if(page == 1) {
           if(thisPage > 1) {
             for(var pg=2;pg<=thisPage;pg++) {
             getRatings(user,url,pg);
             }
           }
          }
        }
      }
    }
    rateReq[page].send(null);
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fileden.com/files/2008/5/8/1902058/maprank.txt?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      features = responseDetails.responseText.split('\n');
      var latest = features[0].split('.');
      var ver = version.split('.');
      latestVersion = (((parseInt(latest[0]) * 100) + (parseInt(latest[1]) * 10) + parseInt(latest[2])) > ((parseInt(ver[0]) * 100) + (parseInt(ver[1]) * 10) + parseInt(ver[2])));
  }
});
GM_addStyle("#phistory {z-index:2000;color:#000;width:151px;position:absolute;background-color:#FFF;text-align:left;border:1px solid #000;visibility:hidden;}");
GM_addStyle(".history_link {background-color: #FFFFFF;padding: 2px 6px 2px 6px;} .history_link_over {background-color: #3366CC; padding: 2px 6px 2px 6px;}");
GM_addStyle("#player {width:143px;border:0px 1px 1px 1px solid #898;} #map{width:153px;border-width:1px}");
var md = GM_getValue('medals');
if(typeof(md) == "undefined") {
GM_setValue('medals',medals);
}
else{
medals = md;
}
var hist = GM_getValue('phist');
if(typeof(hist) == "undefined") {
GM_setValue('phist',phist);
}
else{
phist = hist;
}
var ic = GM_getValue('icons');
if(typeof(ic) == "undefined") {
GM_setValue('icons',icons);
}
else{
icons = ic;
}
myDefeats = eval(GM_getValue('defeats'));
if(typeof(myDefeats) != "undefined" && icons) {
if(/player.php\?mode=find/.test(window.location.href) || /player.php\?mode=mygames/.test(window.location.href) ||
   /player.php\?submit=Search/.test(window.location.href) || /player.php\?mode=join/.test(window.location.href) ||
   /player.php\?mode=next/.test(window.location.href)) {
   var uls = getElementsByClassName(document,'ul','players',true);
   for(var u=0; u<uls.length; u++) {
     var lis = uls[u].getElementsByTagName('li');
     for(var l=0; l< lis.length;l++){
       if(!lis[l].innerHTML.match(/<b>Team (\d):/) && !lis[l].innerHTML.match(/-empty-/)) {
        var anc = lis[l].getElementsByTagName('a');
         if(anc[1].href.match(/username=(.+?)$/)) {
          var names = unescape(RegExp.$1).replace(/\+/g, " ");
          for(def in myDefeats._defeats) {
            if(myDefeats._defeats[def].indexOf(names) != -1) {
              var img = lis[l].appendChild(document.createElement('img'));
              img.src = "http://i282.photobucket.com/albums/kk273/lanyards/" + def + ".png";
              if(def == "Rating")
              img.title = "Already Rated for " + def + " medal (from Map Rank)";
              else
              img.title = "Already Defeated for " + def + " medal (from Map Rank)";
              img.style.verticalAlign = "middle";
            }
          }
       }
     }
   }

}
}
if(/www.conquerclub.com\/forum\/memberlist.php\?mode=viewprofile/.test(window.location.href)) {
var boxes = getElementsByClassName(document,'div','panel bg1 online',true);
if(boxes.length == 0) boxes = getElementsByClassName(document,'div','panel bg1',true);
var h2 = document.getElementsByTagName('h2')[0];
var profname = h2.innerHTML.match(/Viewing profile - (.+?)$/);
var prof = RegExp.$1;
var an = document.createElement ('input');
an.className = "button1";
an.id = "profrank";
an.value = "Map Rank " + prof;
boxes[0].appendChild(an);
an.addEventListener("click" , function() {
 var link = "http://www.conquerclub.com/player.php?submit=Search&game_status=F&player1=" + prof;
 createBox("Collecting Games", prof, '');
 total = maps.length;
 var insignia = 0;
 var logout = getElementsByClassName(document,'div','vnav',true);
 var para = logout[0].getElementsByTagName('a');
 if(para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
   var mine = RegExp.$1;
   if(prof.match(mine, "i")) {
    insignia = 1;
    myStore = eval(GM_getValue('store'));
    if(typeof(myStore) == "undefined") {
      myStore = new Store();
    }
   }
 }
 totals = new Totals(insignia);
 getRatings(prof,'http://www.conquerclub.com/player.php?mode=ratings2&username=' + prof,1);
 for(var m=0; m< maps.length; m++) {
   ranks[maps[m]] = new Rank();
   getStatsPage(prof,link + "&map=" + maps[m],m,1);
 }
}
, true);
}
if(/www.conquerclub.com\/player.php\?mode=find/.test(window.location.href) && !(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href))) {
 if(document.getElementsByTagName('fieldset').length){
   var speedDiv = document.getElementsByName('speed_game[]');
   if(myDefeats._defeats['Speed'] && myDefeats._defeats['Speed'].length)
   (nextSib(speedDiv[1])).innerHTML += "<span class=player3 title=\"Defeated Opponents For Speed Medal (from Map Rank)\">(" + myDefeats._defeats['Speed'].length + ")</span>";
   var gtDiv = document.getElementsByName('game_type[]');
   for(gt=0; gt< gtDiv.length;gt++) {
     var name = (nextSib(gtDiv[gt])).innerHTML;
     if(myDefeats._defeats[name] && myDefeats._defeats[name].length)
     (nextSib(gtDiv[gt])).innerHTML += "<span class=player3 title=\"Defeated Opponents For " + name + " Medal (from Map Rank)\">(" + myDefeats._defeats[name].length + ")</span>";
   }
 }
}
if(/www.conquerclub.com\/player.php\?mode=start/.test(window.location.href)) {
 if(document.getElementsByTagName('fieldset').length){
   var speedDiv = document.getElementsByName('speed_game');
   if(myDefeats._defeats['Speed'] && myDefeats._defeats['Speed'].length)
   (nextSib(speedDiv[1])).innerHTML += "<span class=player3 title=\"Defeated Opponents For Speed Medal (from Map Rank)\">(" + myDefeats._defeats['Speed'].length + ")</span>";
   var gtDiv = document.getElementsByName('game_type');
   for(gt=0; gt< gtDiv.length;gt++) {
     var name = (nextSib(gtDiv[gt])).innerHTML;
     if(myDefeats._defeats[name] && myDefeats._defeats[name].length)
     (nextSib(gtDiv[gt])).innerHTML += "<span class=player3 title=\"Defeated Opponents For " + name + " Medal (from Map Rank)\">(" + myDefeats._defeats[name].length + ")</span>";
   }
 }
}
}
window.addEventListener("unload" , cleanup, false);
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
    var mapxml = dom.getElementsByTagName('title');
    var gmMenu = document.createElement('div');
    gmMenu.id="missed";
    var html = "<h3><b>Map Rank <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=53395'>" + version + "</a></span></b></h3><span>Player</span><input type=text id=player /><div id=phistory></div><span>Map</span><select name=map id=map>";
    html += "<option selected>All</option>";
    for(var i=0; i< mapxml.length; i++) {
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
      setTimeout(function() {clearSuggest();},200);
    }, false);
    ul = document.createElement ('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    ul.innerHTML += "<li><a href=\"javascript:void(0);\" id=rank >Get Map Rank</a></li>";
    gmMenu.appendChild(ul);
    ul = document.createElement ('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    var inner = "<li><a href=\"javascript:void(0);\" onclick=\"document.getElementById('speed').style.display=(document.getElementById('speed').style.display == ''? 'none':'');\"><span>Options</span></a></li>";
    inner += "<div id=\"speed\" style=\"display:none\">";
    inner += "<input id=\"medals\" type=\"checkbox\" name=\"medals\"" + ((medals)? " checked":"") + ">Rank and Points<br />";
    inner += "<input id=\"icons\" type=\"checkbox\" name=\"icons\"" + ((icons)? " checked":"") + ">Display Icons";
    inner += "<li></li></div>";
    ul.innerHTML = inner;
    gmMenu.appendChild(ul);
    document.getElementById('medals').addEventListener("click" , function () {
    medals = (this.checked == true)? 1:0;
    GM_setValue('medals',medals);
    }, true);
    document.getElementById('icons').addEventListener("click" , function () {
    icons = (this.checked == true)? 1:0;
    GM_setValue('icons',icons);
    }, true);
    ul = document.createElement('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    if(latestVersion) {
    ul.innerHTML = "<li><a id=\"latest\" href=http://userscripts.org/scripts/source/33912.user.js><span class=\"countdown-alert\">New Update Available</span></a></li>";
    gmMenu.appendChild(ul);
    }
    else{
      ul.innerHTML = "<li><a id=\"latest\" href=http://userscripts.org/scripts/source/33912.user.js><span>Latest Version Installed</span></a></li>";
      gmMenu.appendChild(ul);
    }
    var ftext = features.join("\n");
    document.getElementById('latest').addEventListener("click" , function () {
      alert('New version features\n' + ftext);
    },true);
    document.getElementById('rank').addEventListener('click', function() {
    var text = document.getElementById('map').options[document.getElementById('map').selectedIndex].text;
    var player = document.getElementById('player').value;
    if(player == "") {
      alert("Must give a player name");
      return false;
    }
    else{
      if(phist == "") {
        phist = player;
        GM_setValue('phist',phist);
      }
      else{
       var hists = phist.split('|');
       if(hists.indexOf(player) == -1) {
        hists.push(player);
        if(hists.length > 10) hists.shift();
        phist = hists.join('|');
        GM_setValue('phist',phist);
       }
      }
      var link = "http://www.conquerclub.com/player.php?submit=Search&game_status=F&player1=" + player;
      if(text == "All"){
       createBox("Collecting Games", player, '');
       total = maps.length;
       var insignia = 0;
       var logout = getElementsByClassName(document,'div','vnav',true);
       var para = logout[0].getElementsByTagName('a');
       if(para[0].innerHTML.match(/logout <b>(.+?)<\/b>/)) {
         var mine = RegExp.$1;
         if(player.match(mine, "i")) {
          insignia = 1;
          myStore = eval(GM_getValue('store'));
          if(typeof(myStore) == "undefined") {
            myStore = new Store();
          }
          else {
            for(var ms in myStore._ranks) {
              if(!isNaN(ms)) {
               myStore = new Store();
               break;
              }
            }
          }
         }
       }
       totals = new Totals(insignia);
       getRatings(player,'http://www.conquerclub.com/player.php?mode=ratings2&username=' + player,1);
       ranks = [];
       unique = [];
       for(var m=0; m< maps.length; m++) {
         ranks[maps[m]] = new Rank();
         getStatsPage(player,link + "&map=" + maps[m],m,1);
       }
      }
      else {
      var ind = document.getElementById('map').selectedIndex - 1;
      ranks = [];
      unique = [];
      ranks[maps[ind]] = new Rank();
      createBox("Collecting Games", player, '');
      total = 1;
      totals = new Totals(0);
      getStatsPage(player,link + "&map=" + maps[ind],ind,1);
      }
    }
    }
    , true);
    if(/www.conquerclub.com\/player.php\?mode=find/.test(window.location.href) && !(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href))) {
     if(document.getElementsByTagName('fieldset').length){
      if(icons) {
        var mapdivs = document.getElementsByName("map[]");
          var tempStore = eval(GM_getValue('store'));
          if(typeof(tempStore) != "undefined") {
            for(md=0;md<mapdivs.length;md++) {
              var name = nextSib(nextSib(mapdivs[md])).innerHTML;
              if(tempStore._unique[maps[maps.indexOf(name)]] && tempStore._unique[maps[maps.indexOf(name)]].length)
              nextSib(nextSib(mapdivs[md])).innerHTML += "<span class=player3 title=\"Defeated Opponents For Cross Map Medal (from Map Rank)\">(" + tempStore._unique[maps[maps.indexOf(name)]].length + ")</span>";
            }
          }
      }
      var buttonDiv = document.getElementsByTagName('fieldset')[0].appendChild(document.createElement('div'));
      buttonDiv.className = "field-row";
      buttonDiv.innerHTML = "<input class=button type=button id=maprank value=\"Map Rank\" />";
      buttonDiv.innerHTML += "<input type=button style=\"margin-left:0\" id=mapbook value=\"Bookmark Map Rank\" /><div id=mapsaved></div>";
      document.getElementById('mapbook').addEventListener("click", saveButtonHandler, false);
      myOptions = (deserialize("mapbook", new Object()))
      if (typeof(myOptions) == "undefined") myOptions = new Object();
      showSearchs();
      if (myOptions['DEFAULT']) {
       loadButtonHandler(myOptions['DEFAULT'],"",false)
      }
      document.getElementById('maprank').addEventListener('click', function () {
        var opts = "";
        var player = this.form.player1.value;
        var player2 = this.form.player2.value;
        if(player2 != "") opts += "<span class=rankoptions>Player 2: <b>" + player2 + "</b></span> ";
        var numbers = cboxValues('num_players[]');
        if(numbers.length) opts += "<span class=rankoptions>Number of Players: <b>" + numbers + "</b></span> ";
        var mp = cboxValues('map[]');
        var gt = cboxValues('game_type[]');
        if(gt.length) opts += "<span class=rankoptions>Game Type: <b>" + gt + "</b></span> ";
        var porder = cboxValues('play_order[]');
        if(porder.length) opts += "<span class=rankoptions>Play Orders: <b>" + porder + "</b></span> ";
        var bonus = cboxValues('bonus_cards[]');
        if(bonus.length) opts += "<span class=rankoptions>Bonus: <b>" + bonus + "</b></span> ";
        var fort = cboxValues('fortifications[]');
        if(fort.length) opts += "<span class=rankoptions>Fortifications: <b>" + fort + "</b></span> ";
        var fog = cboxValues('war_fog[]');
        if(fog.length) opts += "<span class=rankoptions>Fog of War:<b>" + fog + "</b></span> ";
        var joinable = cboxValues('private[]');
        if(joinable.length) opts += "<span class=rankoptions>Joinability: <b>" + joinable + "</b></span> ";
        var speed = cboxValues('speed_game[]');
        if(speed.length) opts += "<span class=rankoptions>Round Length: <b>" + speed + "</b></span> ";
        var tour = this.form.tournament.value;
        if(tour != "") opts += "<span class=rankoptions>Tournament: <b>" + tour + "</b></span> ";
        if(player == "") {
          alert("Must give a player name");
        }
        else{
          var link = "http://www.conquerclub.com/player.php?submit=Search&game_status=F&player1=" + player + "&player2=" + player2;
          var postlink = "&num_players=" + numbers + "&game_type=" + gt + "&bonus_cards=" + bonus + "&play_order=" + porder;
          postlink += "&fortifications=" + fort + "&war_fog=" + fog + "&private=" + joinable + "&speed_game=" + speed + "&tournament=" + tour;
          if(!mp.length){
           createBox("Collecting Games", player, opts);
           total = maps.length;
           totals = new Totals(0);
           ranks = [];
           unique = [];
           for(var m=0; m< maps.length; m++) {
             ranks[maps[m]] = new Rank();
             getStatsPage(player,link + "&map=" + maps[m] + postlink,m,1);
           }
          }
          else {
           createBox("Collecting Games", player, opts);
           total = mp.length;
           totals = new Totals(0);
           ranks = [];
           unique = [];
           for(var m=0; m< mp.length; m++) {
             ranks[maps[maps.indexOf(mp[m])]] = new Rank();
             getStatsPage(player,link + "&map=" + mp[m] + postlink,maps.indexOf(mp[m]),1);
           }
          }
        }
        return false;
      }, true);
     }
    }
    if(/www.conquerclub.com\/player.php\?mode=start/.test(window.location.href)) {
     if(document.getElementsByTagName('fieldset').length){
      if(icons) {
        var mapdivs = document.getElementsByName("map");
          var tempStore = eval(GM_getValue('store'));
          if(typeof(tempStore) != "undefined") {
            for(md=0;md<mapdivs.length;md++) {
              var name = nextSib(nextSib(mapdivs[md])).innerHTML;
              if(tempStore._unique[maps[maps.indexOf(name)]] && tempStore._unique[maps[maps.indexOf(name)]].length)
              nextSib(nextSib(mapdivs[md])).innerHTML += "<span class=player3 title=\"Defeated Opponents For Cross Map Medal (from Map Rank)\">(" + tempStore._unique[maps[maps.indexOf(name)]].length + ")</span>";
            }
          }
      }
     }
    }
  }
});
}
}

function d2h(d)
{
 var h = hD.substr(d&15,1);
 while(d>15) {d>>=4;h=hD.substr(d&15,1)+h;}
 return h;
}

function h2d(h)
{
 return parseInt(h,16);
}

function line_graph(max,min)
{
 this.ct = 0;

 this.data      = new Array();
 this.colour    = new Array();
 this.x_name    = new Array();
 this.max       = -64000; //MAX INT
 this.min       = 64000;
 this.maxbounds    = max;
 this.minbounds    = min;

 this.c_array = new Array();
 this.c_array[0] = new Array(255, 192, 95);
 this.c_array[1] = new Array(80, 127, 175);
 this.c_array[2] = new Array(159, 87, 112);
 this.c_array[3] = new Array(111, 120, 96);
 this.c_array[4] = new Array(224, 119, 96);
 this.c_array[5] = new Array(80, 159, 144);
 this.c_array[6] = new Array(207, 88, 95);
 this.c_array[7] = new Array(64, 135, 96);
 this.c_array[8] = new Array(239, 160, 95);
 this.c_array[9] = new Array(144, 151, 80);
 this.c_array[10] = new Array(255, 136, 80);

 this.getColor = function()
  {
   if(this.ct >= (this.c_array.length-1))
      this.ct = 0;
   else
      this.ct++;

   return "#" + d2h(this.c_array[this.ct][0]) + d2h(this.c_array[this.ct][1]) + d2h(this.c_array[this.ct][2]);
  }


 this.add = function(x_name, value, colour)
  {
   this.x_name.push(x_name);
   this.data.push(parseInt(value,10));
   this.colour.push(colour);

   if(value > this.max)
      this.max = parseInt(value,10);
   if(value < this.min)
      this.min = parseInt(value,10);
  }

 this.render = function(canvas, title)
  {
   var jg = new jsGraphics(canvas);

   var h  = 300;
   var sx = 50;
   var dw = this.data.length > 99 ? (this.data.length > 999 ? 30 : 25) : 20;
   var shadow = 0;
   var fnt    = 12;

   var rtmax = sx + 10 + (dw+Math.round((dw/2))+shadow)*(this.data.length);
   // Draw markers
   var i;
   jg.setColor("green");
   if(this.maxbounds == null) this.maxbounds = this.max;
   if(this.minbounds == null) this.minbounds = this.min;
   if(this.maxbounds) {
   for(i = 0 ; i <= 5 ; i++)
     {
      jg.drawLine(0,Math.round((h/5*i)),rtmax+20,Math.round((h/5*i)));
      var ff = Math.round(this.maxbounds - ((this.maxbounds - this.minbounds)/ 5 * i));
      jg.drawString(ff+"",4,Math.round((h/5*i)-2));
     }
   }
   else{
      jg.drawLine(0,h,rtmax+20,h);
      jg.drawString("0",4,h-2);
   }

   // Draw the bar graph
   var color = this.getColor();
   var oldx, oldy;
   jg.setStroke(1);

   for(i = 0; i < this.data.length; i++)
      {
        var ht1;
        if(this.max)
        ht1 = Math.round((this.data[i] - this.minbounds)*h/(this.maxbounds - this.minbounds));
        else
        ht1 = 0;

       if(i >= 1)
         {
          jg.setColor(color);
          jg.drawLine(oldx, h-oldy, sx, h-ht1);
          }

       jg.setColor(this.colour[i]);
       jg.fillEllipse(sx-2, h-ht1-2, 8, 8, this.data[i]);

       jg.setColor("green");
       jg.drawString(this.x_name[i], sx, h);

       oldx = sx;
       oldy = ht1;

       sx = sx+dw+Math.round(dw/2)+shadow;
      }

   jg.setFont("Verdana", fnt,  Font.BOLD);
   jg.paint();
  }

}

function pntCnvDom()
{
  var x = viewer.document.createRange();
	x.setStartBefore(this.cnv);
  x = x.createContextualFragment(this.htm);
	this.cnv.appendChild(x);
	this.htm = '';
}

function mkDiv(x, y, w, h)
{
  this.htm += '<div style="position:absolute;'+
		'left:' + x + 'px;'+
		'top:' + y + 'px;'+
		'width:' + w + 'px;'+
		'height:' + h + 'px;'+
		'clip:rect(0,'+w+'px,'+h+'px,0);'+
		'background-color:' + this.color +
    ''+
		';"><\/div>';
}

function mkDivD(x, y, w, h, d)
{
  this.htm += '<div title="' + d + '" style="position:absolute;'+
		'left:' + x + 'px;'+
		'top:' + y + 'px;'+
		'width:' + w + 'px;'+
		'height:' + h + 'px;'+
		'clip:rect(0,'+w+'px,'+h+'px,0);'+
		'background-color:' + this.color +
    ''+
		';"><\/div>';
}

function mkLin(x1, y1, x2, y2)
{
	if (x1 > x2)
	{
		var _x2 = x2;
		var _y2 = y2;
		x2 = x1;
		y2 = y1;
		x1 = _x2;
		y1 = _y2;
	}
	var dx = x2-x1, dy = Math.abs(y2-y1),
	x = x1, y = y1,
	yIncr = (y1 > y2)? -1 : 1;

	if (dx >= dy)
	{
		var pr = dy<<1,
		pru = pr - (dx<<1),
		p = pr-dx,
		ox = x;
		while ((dx--) > 0)
		{
			++x;
			if (p > 0)
			{
				this.mkDiv(ox, y, x-ox, 1);
				y += yIncr;
				p += pru;
				ox = x;
			}
			else p += pr;
		}
		this.mkDiv(ox, y, x2-ox+1, 1);
	}

	else
	{
		var pr = dx<<1,
		pru = pr - (dy<<1),
		p = pr-dy,
		oy = y;
		if (y2 <= y1)
		{
			while ((dy--) > 0)
			{
				if (p > 0)
				{
					this.mkDiv(x++, y, 1, oy-y+1);
					y += yIncr;
					p += pru;
					oy = y;
				}
				else
				{
					y += yIncr;
					p += pr;
				}
			}
			this.mkDiv(x2, y2, 1, oy-y2+1);
		}
		else
		{
			while ((dy--) > 0)
			{
				y += yIncr;
				if (p > 0)
				{
					this.mkDiv(x++, oy, 1, y-oy);
					p += pru;
					oy = y;
				}
				else p += pr;
			}
			this.mkDiv(x2, oy, 1, y2-oy+1);
		}
	}
}

function mkOv(left, top, width, height)
{
	var a = width>>1, b = height>>1,
	wod = width&1, hod = (height&1)+1,
	cx = left+a, cy = top+b,
	x = 0, y = b,
	ox = 0, oy = b,
	aa = (a*a)<<1, bb = (b*b)<<1,
	st = (aa>>1)*(1-(b<<1)) + bb,
	tt = (bb>>1) - aa*((b<<1)-1),
	w, h;
	while (y > 0)
	{
		if (st < 0)
		{
			st += bb*((x<<1)+3);
			tt += (bb<<1)*(++x);
		}
		else if (tt < 0)
		{
			st += bb*((x<<1)+3) - (aa<<1)*(y-1);
			tt += (bb<<1)*(++x) - aa*(((y--)<<1)-3);
			w = x-ox;
			h = oy-y;
			if (w&2 && h&2)
			{
				this.mkOvQds(cx, cy, -x+2, ox+wod, -oy, oy-1+hod, 1, 1);
				this.mkOvQds(cx, cy, -x+1, x-1+wod, -y-1, y+hod, 1, 1);
			}
			else this.mkOvQds(cx, cy, -x+1, ox+wod, -oy, oy-h+hod, w, h);
			ox = x;
			oy = y;
		}
		else
		{
			tt -= aa*((y<<1)-3);
			st -= (aa<<1)*(--y);
		}
	}
	this.mkDiv(cx-a, cy-oy, a-ox+1, (oy<<1)+hod);
	this.mkDiv(cx+ox+wod, cy-oy, a-ox+1, (oy<<1)+hod);
}

function mkRect(x, y, w, h)
{
	var s = this.stroke;
	this.mkDiv(x, y, w, s);
	this.mkDiv(x+w, y, s, h);
	this.mkDiv(x, y+h, w+s, s);
	this.mkDiv(x, y+s, s, h-s);
}

function jsgFont()
{
	this.PLAIN = 'font-weight:normal;';
	this.BOLD = 'font-weight:bold;';
	this.ITALIC = 'font-style:italic;';
	this.ITALIC_BOLD = this.ITALIC + this.BOLD;
	this.BOLD_ITALIC = this.ITALIC_BOLD;
}


function jsgStroke()
{
	this.DOTTED = -1;
}

function jsGraphics(id, wnd)
{
	this.setColor = new Function('arg', 'this.color = arg.toLowerCase();');

	this.setStroke = function(x)
	{
		this.stroke = x;
    this.drawLine = mkLin;
    this.mkOv = mkOv;
    this.drawRect = mkRect;
	};

	this.setFont = function(fam, sz, sty)
	{
		this.ftFam = fam;
		this.ftSz = sz;
		this.ftSty = sty || Font.PLAIN;
	};

  this.fillEllipse = function(left, top, w, h, dt)
	{
		var a = (w -= 1)>>1, b = (h -= 1)>>1,
		wod = (w&1)+1, hod = (h&1)+1,
		cx = left+a, cy = top+b,
		x = 0, y = b,
		ox = 0, oy = b,
		aa2 = (a*a)<<1, aa4 = aa2<<1, bb = (b*b)<<1,
		st = (aa2>>1)*(1-(b<<1)) + bb,
		tt = (bb>>1) - aa2*((b<<1)-1),
		pxl, dw, dh;
		if (w+1) while (y > 0)
		{
			if (st < 0)
			{
				st += bb*((x<<1)+3);
				tt += (bb<<1)*(++x);
			}
			else if (tt < 0)
			{
				st += bb*((x<<1)+3) - aa4*(y-1);
				pxl = cx-x;
				dw = (x<<1)+wod;
				tt += (bb<<1)*(++x) - aa2*(((y--)<<1)-3);
				dh = oy-y;
        this.mkDivD(pxl, cy-oy, dw, dh, dt);
        this.mkDivD(pxl, cy+y+hod, dw, dh, dt);
				ox = x;
				oy = y;
			}
			else
			{
				tt -= aa2*((y<<1)-3);
				st -= aa4*(--y);
			}
		}
    this.mkDivD(cx-a, cy-oy, w+1, (oy<<1)+hod, dt);
	};

	this.drawString = function(txt, x, y)
	{
		this.htm += '<div style="position:absolute;white-space:nowrap;'+
			'left:' + x + 'px;'+
			'top:' + y + 'px;'+
			'font-family:' +  this.ftFam + ';'+
			'font-size:' + this.ftSz + ';'+
			'color:' + this.color + ';' + this.ftSty + '">'+
			txt +
			'<\/div>';
	};

	this.clear = function()
	{
		this.htm = "";
		if (this.cnv) this.cnv.innerHTML = this.defhtm;
	};

	this.mkOvQds = function(cx, cy, xl, xr, yt, yb, w, h)
	{
		this.mkDiv(xr+cx, yt+cy, w, h);
		this.mkDiv(xr+cx, yb+cy, w, h);
		this.mkDiv(xl+cx, yb+cy, w, h);
		this.mkDiv(xl+cx, yt+cy, w, h);
	};

	this.setStroke(1);
  this.setFont('verdana,geneva,helvetica,sans-serif', String.fromCharCode(0x31, 0x32, 0x70, 0x78), Font.BOLD);
	this.color = '#000000';
	this.htm = '';

  this.cnv = viewer.document.getElementById(id);
  this.defhtm = (this.cnv && this.cnv.innerHTML)? this.cnv.innerHTML : '';
  this.paint = pntCnvDom ;

  this.mkDiv = mkDiv;
  this.mkDivD = mkDivD;
}

function integer_compare(x,y)
{
	return (x < y) ? -1 : ((x > y)*1);
}


