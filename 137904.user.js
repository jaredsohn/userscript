// ==UserScript==
// @name           sxrupel
// @namespace      benibela
// @include        http://*/skrupel/inhalt/flotte.php*
// @include        http://*/skrupel/inhalt/flotte_alpha.php*
// @include        http://*/skrupel/inhalt/flotte_beta.php*
// @include        http://*/skrupel/inhalt/flotte_gamma.php*
// @include        http://*/skrupel/inhalt/flotte_delta.php*
// @include        http://*/skrupel/inhalt/planeten_gamma.php?fu=4*
// @include        http://*/skrupel/inhalt/galaxie.php*
// @include        http://*/skrupel/inhalt/uebersicht_kolonien.php*
// @include        http://*/skrupel/inhalt/uebersicht_imperien.php*
// @include        http://*/skrupel/inhalt/meta_simulation.php*          
// @include        http://*/skrupel/inhalt/menu.php?fu=1*
// @include        http://*/skrupel/inhalt/meta.php?fu=1*
// @include        http://*/skrupel/inhalt/meta_rassen.php*
// ==/UserScript==

function libraryinit(){
  ////////////////////////////////////////////////////////////
  //Javascript utilities
String.prototype.contains = function(searchFor) {
  return this.indexOf(searchFor) >= 0;
}
String.prototype.count = function(searchFor) {
  var res = 0;
  var i = this.indexOf(searchFor);
  while (i >= 0) {
    res++;
    i = this.indexOf(searchFor, i + searchFor.length);
  }
  return res;
}
Array.prototype.contains = function(searchFor) {
  return this.indexOf(searchFor) >= 0;
}
Array.prototype.pushAll = function(a) {
  var t = this;
  a.forEach(function(x){t.push(x)});
  return this;
}
Array.prototype.filterWithout = function(v) {
  return this.filter(function(x){return x != v; });
}
Array.prototype.removeAll = function(v) {
  var newa = this.filterWithout(v);
  var old = this.splice(0,this.length);
  this.push.apply(this, newa);
  return old;
}
if (!Object.toSource) 
  Object.prototype.toSource = function() { return JSON.stringify(this); } //simulate ff in chrome
window.request = function(page, data, callback, properties) {
  req = new XMLHttpRequest();
  req.open((data != null && data!="")?"POST":"GET", page, properties == null || properties.async == null || properties.async == true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  if (callback) req.onreadystatechange = (function(_req) { return function(){if (_req.readyState!=4) return; if (_req.status==200) callback(_req.responseText, _req); else alert("request failed: "+message+", "+data+"\n => "+_req.status+" "+_req.responseText); } }) (req);
  req.send(data) 
}
window.skrupelrequest = function(page, data, callback, properties) {
  return request(page + (/&uid.*/.exec(window.location)[0]), data, callback, properties);
}      

window.getParams = function (form) {
      var params = [];
      for (i=0; i<form.elements.length; i++){
      var e = form.elements[i];
      var n = e.getAttribute('name');
      if (!n) continue;
      if (e.tagName == "INPUT"){
      switch (e.getAttribute('type')){
      case "text": case "hidden":
      params.push(n + "=" + (e.value));
      break;
      case "checkbox":
      if (e.checked) { params.push(n + "=" + (e.value)); }
      else { params.push(n + "="); }
      break;
      case "radio":
      if (e.checked) { params.push(n + "=" + (e.value)); }
      break;
      }
      }
      if (e.tagName == "TEXTAREA"){
      params.push(n + "=" + (e.value));
      }
      if (e.tagName == "SELECT"){
      params.push(n + "=" + (e.options[e.selectedIndex].value));
      }
      }
      return params.join('&');
      }        
      
window.submitForShips = function (flotte, form, callback){
  var splitted = /(.*shid=)[0-9]+(&.*)/.exec(form.action);

  var data = getParams(form);

  document.body.innerHTML = "";

  var output = document.createElement("div");
  document.body.innerHTML = "";
  document.body.appendChild(output);

  var bindCallbackWrapper = function(id) {
    return function(res){ callback(id,res,output); };
  }
  
  for (var i=0;i<flotte.length;i++)
    request(splitted[1] + flotte[i] + splitted[2], data, bindCallbackWrapper(flotte[i]));  
}

window.submitResultDefaultDisplay = function(id, x){
  document.body.innerHTML = document.body.innerHTML + globals().shipNames[id] + ":" + (/<center>(.*)<\/center>/.exec(x)[1]) + "<br>";
};


/////////////////////////////////////////////////////////////////
//Skrupel utilities
window.getPageParam = function(param){ return (new RegExp("&"+param+"=([^&]+)")).exec(window.location)[1]; }; 
window.gameSId = function(){ return (/&sid=([^&]+)/.exec(window.location)[1]); }; 

localStorageGetData = function(id) {
  var data = localStorage[id];
  if (data) data = JSON.parse(data);
  return data;
}

localStorageGetShipData = function(id) {
  return localStorageGetData("Ship:"+id);
}

localStorageSetShipData = function(id, ship) {
  localStorage["Ship:"+id] = ship.toSource();
}

localStorageSetShipDataProperty = function(id, name, value) {
  var old = localStorageGetShipData(id);
  if (!old) old = {};
  old[name] = value;
  localStorageSetShipData(id, old);
  //alert(localStorageGetShipData(id).toSource());
}

//window.getShipId() = function(s) { return (/shid=([0-9]+)/.exec(s)[1];)

window.dominantSpeciesQuality = new Object();
function addSpecies(quality, list) {
  for (var i=0;i<list.length;i++) 
    window.dominantSpeciesQuality[list[i]] = quality;
}

addSpecies(-2, new Array("Adlaten", "Andorianer", "Flörschem", "Horta", "Kuronik", "Matten-Willys", "Mooff", "Samsluor", "SkyNet", "Whipide"));
addSpecies(-1, new Array( "Ellora", "Pakleds", "Wookiee", "Worrts"));
addSpecies(1, new Array("Balianer", "Bith", "Dianogas", "Ghotos", "Guyaam", "Jawa", "Markalianer", "Menschen", "Naniten", "Perlians", "Quaridan", "Saurian", "Takaran", "Tamarianer", "Tarlac", "Yridianer", "Yuzzum")); 
addSpecies(2, new Array("Aarus", "", "Arcona", "Asgard", "Ewoks", "Ithorianer", "Kelosker", "Mon", "Mon Calamari", "Naats", "Xixroniq"));

window.dominantSpeciesQualityColor = function(name){
  var quality = window.dominantSpeciesQuality[name];
  if (quality == -2) return "red";
  else if (quality == -1) return "yellow";
  else if (quality == 1) return "#00FF00";
  else if (quality == 2) return "#00FFFF";
  return "white";
}

window.globals = function (){
  if (parent.mittelinksoben) return parent.mittelinksoben.document.getElementById("globals");
  if (parent.parent.mittelinksoben) return parent.parent.mittelinksoben.document.getElementById("globals");
  if (parent.parent.parent.mittelinksoben) return parent.parent.parent.mittelinksoben.document.getElementById("globals"); //mineral scan, eingebunden in detail scan
  if (parent.parent.parent.parent.mittelinksoben) return parent.parent.parent.parent.mittelinksoben.document.getElementById("globals"); //mineral scan in automatischer (dieses skript) detail scan
  alert("ups");
}



}


libraryinit();

var skrupelhack = null;

var locskr = /skrupel\/inhalt\/([^?.]+)[.]php[?]fu=([0-9]+)/.exec(window.location.toString());

function islocation(url, fu) {
  return (locskr[1] == url) && (locskr[2] == fu);
}

if (islocation("flotte_beta","1")) {
  ///////////////////////////////////////////////////////////////////
  //SCAN
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){
    var planets = new Array();
    
    var autoDetailScan = function(id, planet) {
      var scanned = false;
      if (planet) {
        var lsname = gameSId() + ":" + planet;
        scanned = localStorage["Planet:" + lsname+":DETAILMINERALDENSITY"];
      } else {
        var temp = localStorageGetShipData(id);
        scanned = temp && temp.scan;
      }
      if (!scanned) {
        var ifr = document.createElement("iframe");
        ifr.src = tds[i].firstChild.action;
        //ifr.onload = (function(btn){ btn.style.color = "#00FF00"; })(tds[i].firstChild.elements[0]);
        ifr.style.display="none";
        tds[i].firstChild.elements[0].parentNode.appendChild(ifr);
      } else tds[i].firstChild.elements[0].style.color = "#000000";
    };
    
    //parse
    var tds = document.getElementsByTagName("td");
    var inPlanet = false; 
    var planetInfos; var lastName; var value;
    var sid = gameSId();
    for (var i=0;i<tds.length;i++) {
      if (tds[i].firstChild && ((tds[i].firstChild.nodeType == 3 && tds[i].childNodes.length == 1) || (inPlanet && tds[i].firstChild.nodeType == 1 && tds[i].firstChild.nodeName == "A"))) {
        if (tds[i].textContent == "Name") { 
            if (inPlanet) {planets.push(planetInfos); inPlanet = false; }
            inPlanet = true; planetInfos = new Object(); lastName = "Name"; value = false; 
        } else if (inPlanet) {
          value = !value;
          if (value) {
            planetInfos[lastName] = tds[i];
          } else lastName = tds[i].textContent;
        } 
      } else if (tds[i].firstChild && tds[i].firstChild.nodeType == 1 && tds[i].firstChild.nodeName == "FORM") {
        var temp = /pid=([0-9]+)/.exec(tds[i].firstChild.action);
        if (temp) { //temp == null, für schiffe
          planetInfos["pid"] = temp[1];
          autoDetailScan(temp[1], planetInfos["Name"].textContent);
        } else {
          temp = /shid=([0-9]+)/.exec(tds[i].firstChild.action);
          if (temp) autoDetailScan(temp[1]);
        }
      } 
    }
    if (inPlanet) {planets.push(planetInfos); inPlanet = false; }
    
    //use
    for (var i=0;i<planets.length;i++) {
     // for (var j in planets[i]) alert(j+": "+planets[i][j].textContent);
      var name = gameSId() + ":" + planets[i]["Name"].textContent;
      localStorage["Planet:"+name+":Temperatur"] = planets[i]["Temperatur"].textContent;
      if (planets[i]["dom.Spezies"]) {
        var dsName = /^[^ ]+/.exec(planets[i]["dom.Spezies"].textContent);
     //   alert("Name: " + planets[i]["Name"].textContent + "\nT: "+planets[i]["Temperatur"].textContent+"\nDS: "+dsName+":"+quality);
        localStorage["Planet:"+name+":dsName"] = dsName;
        localStorage["Planet:"+name+":dsCount"] = /[(] *([0-9]+) *[)]/.exec(planets[i]["dom.Spezies"].textContent)[1];
        planets[i]["dom.Spezies"].firstChild.style.color = dominantSpeciesQualityColor(dsName);
      } else {
        localStorage["Planet:"+name+":dsName"] = "";
        localStorage["Planet:"+name+":dsCount"] = 0;
      }
      globals()["PLANETEN:"+planets[i]["pid"]] = name;
    }
  }
} else if (islocation("flotte_beta","2")) {
  ///////////////////////////////////////////////////////////////////
  //DETAILSCAN
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){
    
    var tds = document.getElementsByTagName("td");
    var inPlanet = false; 
    var infos = new Object(); var lastName; var value;
    for (var i=0;i<tds.length;i++) {
      if (tds[i].firstChild && ((tds[i].firstChild.nodeType == 3 && tds[i].childNodes.length == 1) || (inPlanet && tds[i].firstChild.nodeType == 1 && tds[i].firstChild.nodeName == "A"))) {
        if (tds[i].textContent == "Kolonisten") { 
            inPlanet = true; lastName = "Kolonisten"; value = false; 
        } else if (inPlanet) {
          value = !value;
          if (value) {
            infos[lastName] = tds[i];
          } else lastName = tds[i].textContent;
        } 
      }
    }

    for (var p in infos) { infos[p] = infos[p].textContent;}
    var pid = /pid=([0-9]+)/.exec(location.href)[1];
    var name = globals()["PLANETEN:"+pid];
    localStorage["Planet:"+name+":DETAILWIRTSCHAFT"] = infos.toSource();    
  }
} else if (islocation("flotte_beta","3")) {
  ///////////////////////////////////////////////////////////////////
  //DETAIL SHIP SCAN
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){	
    var inProperties = ["!!image", "Name", "Schaden", "Crew", "Masse", "Lemin", "Güter", "Antrieb", "Energetik", "Projektil", "Hangar"];
    var ship = Array();
    
    var tds = document.getElementsByTagName("td");
    var idx = -1;
    for (var cur = 0; cur < tds.length; cur++) {
      var tc = tds[cur].textContent.trim();
      if (tc != "") {
        if (idx == -1) idx = inProperties.indexOf(tc);
        else { ship[idx] = tc; idx = -1; }
      }
    }
    
    localStorageSetShipDataProperty(getPageParam("shid"), "scan", ship.toSource());

    if (window.frameElement && window.frameElement.parentNode) 
      window.frameElement.parentNode.getElementsByTagName("input")[0].style.color="#00FF00";
  }
} else if (islocation("flotte_beta","10")) {
  ///////////////////////////////////////////////////////////////////
  //DETAIL MINERAL SCAN
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){

    var colors = ["rgb(0, 241, 74)", "rgb(255, 222, 202)", "rgb(233, 5, 5)", "rgb(0, 133, 239)"];
    var count = [0,0,0,0];
    var density = [-1,-1,-1,-1];
    var dots = document.getElementsByTagName("div");
    var last = ""; var lastid = ""; var kind = -1;
    for (var i=0;i<dots.length;i++)
      if (dots[i].style.position == "absolute") {
        var bc = dots[i].style.backgroundColor;
        if (bc != last) {
          last = bc; 
          kind = colors.indexOf(bc);
        }
        if (density[kind] == -1 && dots[i].id[2] == "0" && dots[i].id != "p_0_0") {
          if (dots[i].id == "p_0") density[kind] = 1;
          else if (dots[i].id.length == 6) density[kind] = 5;
          else density[kind] = dots[i].id[4] / 2;
        }
        lastid = dots[i].id;
        count[kind] = count[kind] + 1;
      }
      
      
    var pid = /pid=([0-9]+)/.exec(location.href)[1];
    var name = globals()["PLANETEN:"+pid];
    //alert(pid);
    localStorage["Planet:"+name+":DETAILMINERALPOINTS"] = count.toSource();
    localStorage["Planet:"+name+":DETAILMINERALDENSITY"] = density.toSource();
    

    if (window.parent && window.parent.frameElement && window.parent.frameElement.parentNode) 
      window.parent.frameElement.parentNode.getElementsByTagName("input")[0].style.color="#00FF00";
    
    //alert(count + " <> "+density);
  }
} else if (islocation("flotte","6") || islocation("flotte","1")) {
  ////////////////////////////////////////////////////////////////////////
  //SCHIFF AUSWAHL
  ////////////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var glob = globals();
    glob.meta_flotte = new Array();
    glob.meta_flotte_enabled = true;
    glob.shipNames = new Object();
    
    var imgs = document.getElementsByTagName("img");
    var shipId = 0; var shipData = null;
    for (var i=0;i<imgs.length;i++) {
      if (imgs[i].height == 80 && imgs[i].parentNode.nodeName == "A") {
        shipId = /shid=([0-9]+)/.exec(imgs[i].parentNode.href)[1];
        glob.shipNames[shipId] = /\[([^\]]+)\]/.exec(imgs[i].title)[1];
        imgs[i].width = 0.50*122;
        imgs[i].height = 0.50*80;
        
       // alert(shipId);
       // alert(localStorageGetShipData);
        //alert(localStorageGetShipData(shipId).mission);

        shipData = localStorageGetShipData(shipId);
        if (shipData) {
          var s = "";
          if (shipData.mission)  s = "Mission: " + shipData.mission;
          if (shipData.aggro) {
            var taktikColors = Array("white", "red", "lime");
            var taktikNames = Array("", "A", "D");
            if (s != "") s += "<br>";
            s += "Taktik:  <span style='color: "+taktikColors[shipData.taktik]+"'>"+shipData.aggro + taktikNames[shipData.taktik]+"</span>" ;
          }
          var extra = document.createElement("div");
          extra.innerHTML = s;
          imgs[i].parentNode.appendChild(extra);
        }
      } else if ((imgs[i].width == 15 && imgs[i].height == 15 && imgs[i].src.contains("schiff_aktiv")) || 
               (imgs[i].width == 22 && imgs[i].height == 22 && imgs[i].src.contains("icons/erf"))) {
        var cb = document.createElement("INPUT"); 
        cb.type = "checkbox"; 
        cb.value = shipId;
        cb.onchange = (function(_cb) { return function(){
          if (_cb.checked) {
            if (!parent.mittelinksoben.document.getElementById("globals").meta_flotte.contains(_cb.value)) 
              parent.mittelinksoben.document.getElementById("globals").meta_flotte.push(_cb.value);
          } else {
            if (parent.mittelinksoben.document.getElementById("globals").meta_flotte.contains(_cb.value)) 
              parent.mittelinksoben.document.getElementById("globals").meta_flotte = parent.mittelinksoben.document.getElementById("globals").meta_flotte.filterWithout(_cb.value);
          }
        }})(cb);
        imgs[i].parentNode.parentNode.appendChild(cb);
      }
    }

window.bbCreateElement = function(el, attribs){
  var tmp = document.createElement(el);
  for (var a in attribs) 
    tmp.setAttribute(a, attribs[a]);
  return tmp;
} 
window.bbCreateElementWithText = function(el, text, attribs){
  var tmp = document.createElement(el);
  tmp.appendChild(document.createTextNode(text));
  for (var a in attribs) 
    tmp.setAttribute(a, attribs[a]);
  return tmp;
} 
window.bbCreateElementWithClick = function(el, clickevent, attribs){
  var tmp = document.createElement(el);
  for (var a in attribs) 
    tmp.setAttribute(a, attribs[a]);
  tmp.addEventListener('click', clickevent, false);
  return tmp;
} 

    var center = document.getElementsByTagName("center")[0];
    var tables = center.getElementsByTagName("table");
    var meta = document.createElement("div");
    meta.innerHTML = "Flottenkontrolle:<br>";
    meta.style.display = "inline-block";
    meta.appendChild(bbCreateElementWithClick("input", function(){
      var inputs = document.getElementsByTagName("input");
      for (var i=0;i<inputs.length;i++) 
        if (inputs[i].type == "checkbox" && !inputs[i].checked ) {
          inputs[i].checked=true;
          inputs[i].onchange();
        }
    }, {type:"button", value:"Alle auswählen"}));
    meta.appendChild(document.createElement("br"));
    meta.appendChild(bbCreateElementWithClick("input", function(){
      var shiplist = tables[0].rows[1].getElementsByTagName("table")[0].rows[0].cells;
      for (var i=shiplist.length-1;i>=0;i-=2)
        if (!shiplist[i].innerHTML.contains("kein Auftrag")) {
          shiplist[i-1].style.display="none";
          shiplist[i].style.display="none";
          var cb = shiplist[i].getElementsByTagName("input");
          cb[0].checked=false;cb[0].onchange();
        }
    }, {type:"button", value:"Keine Reisenden"}));
    /*var temp = document.createElement("div");
    temp.style.height="80px"; 
    meta.appendChild(temp);*/
    tables[0].style.display = "inline-block";
    center.insertBefore(meta, center.firstChild);
    center.style.whiteSpace="nowrap";
    
    var flotte = parent.mittelinksoben.document.getElementById("globals").meta_flotte;
    var totalCount = 0;
    
    var as = document.getElementsByTagName("a");
    for (var i=0;i<as.length;i++){
      var ordner = /.*flotte.php[?]fu=1.*oid=([0-9]+).*/.exec(as[i].href);
      if (!ordner) break;
      var btn = bbCreateElementWithClick("input", (function(oid){return function(){
        for (var i=0;i<flotte.length;i++)
          skrupelrequest("flotte_delta.php?fu=7&shid="+flotte[i], "oid="+oid, function(){
            totalCount++; 
            if (totalCount == flotte.length)
              location.reload();
          });
        
      }})(ordner[1]),
      {type: "button", value: "verschieben", style: "display: block; margin-top: 20px"});
      as[i].parentNode.appendChild(btn);
    }
  }
} else if (islocation("flotte","3")) {
  /////////////////////////////////////////////////////////////////////
  //SCHIFFS INFO
  /////////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var glob = globals();
    if (globals().meta_flotte.length > 0) {
      var shipId = /shid=([0-9]+)/.exec(location.href)[1];
      if (!globals().meta_flotte.contains(shipId) || globals().meta_flotte.length == 1) { globals().meta_flotte = new Array(); return; }
      
      document.getElementsByTagName("NOBR")[0].innerHTML="<input type='checkbox' id='mfe' "+(globals().meta_flotte_enabled?"checked='true'":"")+ " onclick='globals().meta_flotte_enabled=document.getElementById(\"mfe\").checked'/>FLOTTE";
      document.getElementsByTagName("NOBR")[0].style.color="red";

      var table = document.getElementsByTagName("table")[0];
      table.rows[4].style.display = "none";
      table.insertRow(-1);
      
      var names = new Array;
      var splitted = /&uid.*/.exec(window.location)[0];
      var curid = /shid=([0-9]+)/.exec(window.location)[1];
      table.rows[5].innerHTML = "<td></td><td>"+glob.meta_flotte.map(function(id){
        return "<span style='cursor:pointer;"+(id==curid?"text-decoration:underline;":"")+"' onclick='window.parent.location=\"flotte.php?fu=2&shid="+id+splitted+"\"'>"+glob.shipNames[id]+"</span>"+
               "<span style='cursor:pointer; color:red' onclick='globals().meta_flotte.removeAll("+id+");location.reload();'>x</span>";        
      }).join(", ")+"</td";
      
      //table.insertRow(-1);
      //table.rows[6].innerHTML = "<td></td><td><input type='checkbox' id='mfe' onclick='globals().meta_flotte_enabled=document.getElementById(\"mfe\").checked'/>Flotte aktiviert</td>";
    }
  }
} else if (islocation("flotte_alpha","1")) {
  ///////////////////////////////////////////////////////////////////
  //KURS SETZEN
  ///////////////////////////////////////////////////////////////////
  
  skrupelhack = function (){ 
    var glob = globals();
    var flotte = globals().meta_flotte;
    if (flotte.length == 0 || !globals().meta_flotte_enabled) return;
    var shipId = /shid=([0-9]+)/.exec(location.href)[1];
    if (!globals().meta_flotte.contains(shipId) || globals().meta_flotte.length == 1) { globals().meta_flotte = new Array(); return; }

    var inputs = document.getElementsByTagName("input");
    inputs[inputs.length-1].type="button";
    inputs[inputs.length-1].onclick = function(){
      submitForShips(flotte, document.forms[0], function(id, res, output) {
        var temp = document.createElement("div");
        temp.innerHTML = res.replace("<br>", " ", "g");
        output.appendChild(temp);
        eval(/(parent[\s\S]*)<\/script>/.exec(res)[1]);
      });
    }
    inputs[inputs.length-1].value="Flottenkurs setzen";
  }
  
} else if (islocation("flotte_alpha","3")) {
  ///////////////////////////////////////////////////////////////////
  //(FLOTTEN) SPEZIALMISSIONEN
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){     
    var temp = document.getElementsByName("warpfaktor");
    if (temp.length > 0) { //select fastest begleitschutz speed
      for (var i = temp[0].options.length-1; i>=0;i--) 
        if (temp[0].options[i].style.backgroundColor == "") {
          temp[0].selectedIndex = i;
          break;
        }
    }
    temp = document.getElementsByName("projektile");
    if (temp.length > 0) { //select max minenfeld
      var temp2 = document.getElementsByName("aktion");
      var active = false;
      for (var i=0;i<temp2.length;i++) if (temp2[i].value == 24) active = temp2[i].checked;
      if (!active) temp[0].selectedIndex = temp[0].options.length-1;
    }
    
    
    var firstTextNode = function(e) { 
      if (e.nodeType == Node.TEXT_NODE && e.textContent.trim() != "" ) return e.textContent.trim(); 
      for (var i=0;i<e.childNodes.length;i++) {
        var t = firstTextNode(e.childNodes[i]); 
        if (t!="") return t;
      } 
      return "";
    }
    var getMissionSummary = function (page) {
      var inps = page.getElementsByTagName("input");
      var found = false;
      var add = "";
      var prev = "0";
      $(page).find("input:checked").each(function(i,e){
        if (e.type == "checkbox" && e.name == "betamodus" && (prev == 4 || prev == 6)) { add += " (auto)"; return; }
        var name = firstTextNode(e.parentNode.parentNode);
        if (e.value == 0) add += "<span style='color: #777777'>"+name+"</span>";
        else add += name;
        if (e.value == 21) add += " auf "+$(e.parentNode.parentNode).find('*[name="traktor_id"] option[selected]').get(0).textContent;
        prev = e.value;
      });
      return add;
    }
    
    
    var flotte = globals().meta_flotte;
    if (flotte.length == 0 || !globals().meta_flotte_enabled) {
      var submit = document.getElementsByName("bla")[0];
      var oldclick = submit.onclick;
      submit.onclick =  function(){
        var shipId = /shid=([0-9]+)/.exec(document.forms[0].action)[1];  
        localStorageSetShipDataProperty(shipId, "mission", getMissionSummary(document.body));
      }
      return;
    }    
    
    var displayUpdatedMission = function(id){return function(x) { submitResultDefaultDisplay(id, x); }; };
    
    var submit = document.getElementsByName("bla")[0];
    var blavalue = submit.value;
    submit.value = "Flotten Spezialmission aktivieren";
    submit.type = "button";
    submit.onclick = function(){      
      var pretty = getMissionSummary(document.body);
      submitForShips(flotte, document.forms[0], function(id,res){
        localStorageSetShipDataProperty(id, "mission", pretty);
        submitResultDefaultDisplay(id, res);
      });
    }

    var appendButton = function(btn) {
      btn.style.width = "300px";
      var temptr = document.createElement("tr"); var temptd = document.createElement("td"); temptr.appendChild(temptd); temptd.setAttribute("colSpan", 6);  temptd.appendChild(btn);
      submit.parentNode.parentNode.parentNode.appendChild(temptr);
    }

    var submitb = document.createElement("input"); submitb.type="button";
    submitb.value = "Alle zeigen";
    submitb.onclick = function(){      
      document.body.innerHTML = "";
      for (var i=0;i<flotte.length;i++)
        skrupelrequest("flotte_alpha.php?fu=3&shid="+flotte[i], "", (function(id){return function(data){
          var temp = document.createElement("div");
          temp.innerHTML = data;
          var pretty = getMissionSummary(temp);
          document.body.innerHTML += globals().shipNames[id]  +": "+pretty + "<br>";          
          localStorageSetShipDataProperty(id, "mission", pretty);
        }})(flotte[i]));
    };
    appendButton(submitb);
    
    submitb = document.createElement("input"); submitb.type="button";
    submitb.value = "Traktorstrahl auf nächstes Flottenschiff";
    submitb.onclick = function(){
      var form = document.forms[0];
      var splitted = /(.*shid=)[0-9]+(&.*)/.exec(form.action);
      document.body.innerHTML = "";
      for (var i=0;i+1<flotte.length;i+=2){
        localStorageSetShipDataProperty(flotte[i], "mission", "Traktorstrahl auf "+globals().shipNames[flotte[i+1]]);
        localStorageSetShipDataProperty(flotte[i+1], "mission", "<span style='color: #777777'>keine</span>");
        request(splitted[1] + flotte[i] + splitted[2], 
                "aktion=21&traktor_id="+flotte[i+1]+"&begleitschutz=&schiff_id=0&warpfaktor=1&bla=Spezialmission aktivieren",  
                displayUpdatedMission(flotte[i]));      
        request(splitted[1] + flotte[i+1] + splitted[2], 
                "aktion=0&traktor_id=0&begleitschutz=&schiff_id=0&warpfaktor=1&bla=Spezialmission aktivieren",  
                displayUpdatedMission(flotte[i+1]));      
      }
    }
    appendButton(submitb);

        
  }
} else if (islocation("flotte_beta","4")) {
  ///////////////////////////////////////////////////////////////////
  //TRANSPORTER
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    //REWRITE SLIDERS
    var kindSliders =     {kolonisten: "s7",              vomi: "s4",   renn: "s3",   basx: "s2",   lemin: "s",   cantox: "s6", vorrat: "s5"};
    var kindRealSliders = {}; //existing sliders
    var kindWeight =      {kolonisten: 1/100,             vomi: 1,      renn: 1,      basx: 1,      lemin: -1,    cantox: 0,    vorrat: 1};
    var kindPlanetInput = {kolonisten: "",                vomi: "min3", renn: "min2", basx: "min1", lemin: "",    cantox: "",   vorrat: ""};
    var kindFrachtInput = {kolonisten: "fracht_leute",    vomi: "min3", renn: "min2", basx: "min1", lemin: "",    cantox: "",   vorrat: ""};
    var kindAutoUp      = {kolonisten: false,             vomi: true,   renn: true,   basx: true,   lemin: false, cantox: true, vorrat: true};
    var kindAutoDown    = {kolonisten: true,              vomi: true,   renn: true,   basx: true,   lemin: false, cantox: true, vorrat: true};
    
    for (var n in kindPlanetInput) if (!kindPlanetInput[n].contains("_")) kindPlanetInput[n] = "planet_" + (kindPlanetInput[n] == ""?n:kindPlanetInput[n]); 
    for (var n in kindFrachtInput) if (!kindFrachtInput[n].contains("_")) kindFrachtInput[n] = "fracht_" + (kindFrachtInput[n] == ""?n:kindFrachtInput[n]); 
    
    window.sliders = new Array();
    for (var n in kindWeight) if (window[kindSliders[n]]) {
      window[kindSliders[n]].weight = kindWeight[n];
      if (kindWeight[n] > 0) sliders.push(window[kindSliders[n]]);
      kindRealSliders[n] = window[kindSliders[n]];
    }
        
    window.allowedWeight = /\(beladenzahl > ([0-9]+)\)/.exec(checken.toSource())[1] * 1;
    window.allowedLemin = /\(lemin > ([0-9]+)\)/.exec(checken.toSource())[1] * 1;
    
    window.oldSliderSetValue = Slider.prototype.setValue;
    Slider.prototype.setValue = function (v) {
      if (this.weight > 0) {
        var totalWeight = 0;
        for (var i=0;i<sliders.length;i++) if (sliders[i]) totalWeight += sliders[i].weight * (sliders[i].getMaximum() - sliders[i].getValue());
        totalWeight -= (this.getMaximum() - this.getValue()) * this.weight;
     // alert(totalWeight);
        if ( Math.ceil((this.getMaximum() - v) * this.weight + totalWeight) > allowedWeight) v =  Math.ceil(this.getMaximum() - (allowedWeight - totalWeight + 0.49) / this.weight);
      } else if (this.weight == -1) 
        if (this.getMaximum() - v > allowedLemin) v = this.getMaximum() - allowedLemin;
      window.oldSliderSetValue.call(this, v);
    }

    
    //IMAGES
    var imgs = document.getElementsByTagName("img");
    for (var i=0;i<imgs.length;i++)
      if (imgs[i].src.contains("schiffe")) imgs[i].onclick = function() { 
        for (var n in kindAutoUp) if (kindAutoUp[n] && kindRealSliders[n]) kindRealSliders[n].setValue(0);
      };
      else if (imgs[i].src.contains("planeten")) imgs[i].onclick = function() { 
        for (var n in kindAutoDown) if (kindAutoDown[n] && kindRealSliders[n]) kindRealSliders[n].setValue(kindRealSliders[n].getMaximum());        
      };

  //SELL
    if (kindRealSliders["cantox"] && kindRealSliders["vorrat"]) {
      //OVERRIDE 
      for (var n in kindRealSliders) {
        kindRealSliders[n].onchange = (function(_n){return function(){
          var t = kindRealSliders[_n];
          document.getElementById(kindFrachtInput[_n]).textContent = t.getMaximum() - t.getValue();
          document.getElementById(kindPlanetInput[_n]).textContent = t.getValue();
        };})(n);
      }
      
      window.checken = function checken() {
        for (var n in kindPlanetInput) document.formular[kindPlanetInput[n]].value = kindRealSliders[n]?kindRealSliders[n].getValue():0;
        for (var n in kindFrachtInput) document.formular[kindFrachtInput[n]].value = kindRealSliders[n]?(kindRealSliders[n].getMaximum() - kindRealSliders[n].getValue()):0;
        document.formular.s_leichtebt.value=0;
        document.formular.p_leichtebt.value=0;
        document.formular.s_schwerebt.value=0;
        document.formular.p_schwerebt.value=0;
        return true;
      }
      
      var sellButton = document.createElement("span"); 
      sellButton.style.color = "yellow";
      sellButton.style.fontSize = "200%";
      sellButton.textContent = "$";
      document.getElementById("planet_vorrat").parentNode.style.display = "inline-block";
      document.getElementById("planet_vorrat").parentNode.style.margin = "auto";
      document.getElementById("planet_vorrat").parentNode.parentNode.appendChild(sellButton);      
      sellButton.onmouseover = function(){sellButton.style.color = "#00FFFF";};
      sellButton.onmouseout = function(){sellButton.style.color = "yellow";};
      var s5 = kindRealSliders["vorrat"]; var s6 = kindRealSliders["cantox"];
      var maxSell = s5.getValue();
      sellButton.onclick = function(){
        var sell = s5.getValue();
        if (sell > maxSell) sell = maxSell;
        if (sell == 0) return;

        request("planeten_gamma.php?fu=7&" + /pid=.*/.exec(document.getElementsByTagName("form")[0].action), 
                "vorratauftrag="+sell,
                function(data) { if (!data.contains("erfolgreich verkauft")) alert("Failed: "+data); else { 
                  maxSell -= sell; 
                  s5.setMaximum(s5.getMaximum() - sell);
                  s5.setValue(s5.getValue() - sell);
                  s6.setMaximum(s6.getMaximum() + sell);           
                  s6.setValue(s6.getValue()); //without adding, directly cantox beam up  + sell);
                } });
      }
    }
    
    
    
    
   //FLOTTEN TRANSPORT
    var flotte = globals().meta_flotte;
    if (flotte.length == 0) return;
    
    var inps = document.getElementsByTagName("input");
    var btn; for (var i=0;i<inps.length;i++) { if (inps[i].type == "submit") {btn=inps[i]; break; }}
    btn.value = "Schiffstransport durchführen";

    var nbtn = document.createElement("input");
    nbtn.type = "BUTTON";
    nbtn.style.width = btn.style.width;
    nbtn.value = "Flottentransport durchführen";
    btn.parentNode.insertBefore(nbtn,btn);
    
    
    var shipBeamUp = function(shid, values, callback, delta) {
      request("flotte_beta.php?fu=4&shid=" + shid +  /&uid.*/.exec(location.href), "", function(page){
        var temp = document.createElement("div");
        temp.innerHTML = page;
        document.body.appendChild(temp);
        var inputs = temp.getElementsByTagName("INPUT");
        
        for (var v in values) {
          if (!kindPlanetInput[v]) alert("invalid kind: "+v);
          if (delta) {
            document.getElementById(kindFrachtInput[v]).textContent = document.getElementById(kindFrachtInput[v]).textContent*1 + values[v];
            document.getElementById(kindPlanetInput[v]).textContent = document.getElementById(kindPlanetInput[v]).textContent*1 - values[v];
          } else {
            var d = values[v] - document.getElementById(kindFrachtInput[v]).textContent*1;
            document.getElementById(kindFrachtInput[v]).textContent = document.getElementById(kindFrachtInput[v]).textContent*1 + d;
            document.getElementById(kindPlanetInput[v]).textContent = document.getElementById(kindPlanetInput[v]).textContent*1 - d;
          }
        }

        var data = ""; var failure = false;
        for (var i=0;i<inputs.length;i++) 
          if (inputs[i].name) {
            var v = (document.getElementById(inputs[i].name)?document.getElementById(inputs[i].name).textContent*1:0);
            if (v < 0) { failure = true; break; }
            data += inputs[i].name + "="+v+"&";
          }
        if (failure) { alert("failed"); return; }
        var form = temp.getElementsByTagName("form")[0];
        //alert(form);
        request(form.action, data, function(data)  { if (data.contains("CHEATER")) {alert("not accepted"); return; } callback(data);}, {async: false});
        temp.innerHTML="";
      }, {async: false});
    }    
    
    var fleetBeamUp = function (values, delta) {
      document.body.innerHTML = "<div id='output'/>";
      var output = document.getElementById("output");
      for (var i=0;i<flotte.length;i++) {
        shipBeamUp(flotte[i], values, (function(_i){return function(data){
          output.innerHTML =  output.innerHTML + globals().shipNames[flotte[_i]]+":"+(/<center>(.*)<\/center>/.exec(data))[1]+"<br>";
        }})(i), delta);
      }
    }
    
    nbtn.onclick = function(){
      var values = {};
      for (var n in kindRealSliders) 
        if (kindRealSliders[n].getValue() != kindRealSliders[n].getMaximum()) 
          values[n] = kindRealSliders[n].getMaximum() - kindRealSliders[n].getValue();
      fleetBeamUp(values, false);
    }
  }
  
  
} else if (islocation("flotte_delta","1")) {
  ///////////////////////////////////////////////////////////////////
  //PROJEKTILE
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var beamUp = function(cantox,basx, renn, vomi, callback) {
      request("flotte_beta.php?fu=4" + /&shid.*/.exec(location.href), "", function(page){
        var temp = document.createElement("div");
        temp.innerHTML = page;
        document.body.appendChild(temp);
        var inputs = temp.getElementsByTagName("INPUT");
        
        document.getElementById("fracht_cantox").textContent = document.getElementById("fracht_cantox").textContent*1 + cantox;
        document.getElementById("planet_cantox").textContent = document.getElementById("planet_cantox").textContent*1 - cantox;
        document.getElementById("fracht_min1").textContent = document.getElementById("fracht_min1").textContent*1 + basx;
        document.getElementById("planet_min1").textContent = document.getElementById("planet_min1").textContent*1 - basx;
        document.getElementById("fracht_min2").textContent = document.getElementById("fracht_min2").textContent*1 + renn;
        document.getElementById("planet_min2").textContent = document.getElementById("planet_min2").textContent*1 - renn;
        document.getElementById("fracht_min3").textContent = document.getElementById("fracht_min3").textContent*1 + vomi;
        document.getElementById("planet_min3").textContent = document.getElementById("planet_min3").textContent*1 - vomi;
        
        var data = ""; var failure = false;
        for (var i=0;i<inputs.length;i++) 
          if (inputs[i].name) {
            var v = (document.getElementById(inputs[i].name)?document.getElementById(inputs[i].name).textContent*1:0);
            if (v < 0) { failure = true; break; }
            data += inputs[i].name + "="+v+"&";
          }
        if (failure) { alert("failed"); return; }
        var form = temp.getElementsByTagName("form")[0];
        //alert(form);
        request(form.action, data, function(data)  { if (data.contains("CHEATER")) {alert("not accepted"); return; } callback();});
        temp.innerHTML="";
      });
    }
    
    var cs = document.getElementsByTagName("center");
    var projektile = /[^0-9]+([0-9]+)[^0-9]+([0-9]+)/.exec(cs[2].textContent);
    var c = document.createElement("center");
    if (projektile[2] == projektile[1]) return;
    c.innerHTML = "Planetarer Bau: <input value='"+(projektile[2]-projektile[1])+"' id='planetarerbaucount' size=5/> <input type='button' onclick='planetarerbau()' value='ok'>";
    cs[cs.length-2].appendChild(c);
    //beamUp(35,2,1,0);
    window.planetarerbau = function(){
      var count = document.getElementById("planetarerbaucount").value*1;
      beamUp(35*count,2*count,1*count,0,function(){
        request("flotte_delta.php?fu=2" + /&shid.*/.exec(location.href), "bau_auftrag="+count, function(){
          location.reload();
        });
      });
      
    };
  }
} else if (islocation("flotte_delta","5")) {
  ///////////////////////////////////////////////////////////////////
  //FLOTTEN SCHIFF VERWALTUNGS OPTIONEN
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var opts = document.getElementsByTagName("option");
    var ordner = {};
    for (var i=0;i<opts.length;i++)
      if (opts[i].value != "0") ordner[opts[i].value] = opts[i].textContent;
    localStorage["Ordner:"+gameSId()] = ordner.toSource();

    var flotte = globals().meta_flotte;
    if (flotte.length == 0 || !globals().meta_flotte_enabled) return;
   

    var inps = document.getElementsByTagName("input");
    var last = null;
    for (var i=inps.length-1; i >= 0; i--)
      if (inps[i].type == "submit") { last = inps[i]; break; }
    last.value = "F. verschieben";    
    last.type = "button"
    last.onclick = function(){
      submitForShips(flotte, document.forms[1], submitResultDefaultDisplay);
    }    
  }
  
} else if (islocation("menu","1")) {
  ///////////////////////////////////////////////////////////////////
  //MENU
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var links = document.getElementsByTagName("a");
   // alert(links[2].onclick);
   // alert(links[2].onclick.toSource().replace( /link_unten/, "link_all"));
//  links[2].onclick = links[2].getAttribute("onclick").replace( /link_unten/, "link_all");
    //    var changedLink = eval(links[2].onclick.toSource().replace( /link_unten/, "link_all"));
  //  links[2].onclick = function(e){alert(changedLink); changedLink(e);};

    var sid = gameSId();
    var ordner = localStorage["Ordner:"+sid];
    if (!ordner || ordner == "") return;
    ordner = JSON.parse(ordner);

    var ships = links[3];
    var splitted = /(.*flotte[.]php[?]fu=1)(&.*)/.exec(ships.onclick);
//alert(ships.onclick+"=>"+splitted);
    var links = "";
    for (var o in ordner) 
      links += "<a onclick='"+splitted[1]+"&oid="+o+splitted[2]+"'>"+ordner[o]+"</a><br>";
    var temp = document.createElement("div");
    temp.innerHTML = links;

    ships.parentNode.appendChild(temp);   
  }
  
} else if (islocation("meta","1") || islocation("meta_rassen","1")) {
  ///////////////////////////////////////////////////////////////////
  //META MENU
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    window.metalink = function(url) { 
      if (parent.mittelinksoben.document.globals.map.value==1) {
        window.open(url);
      }  else  {
        parent.mittemitte.rahmen12.window.location=url;
      }    
    }
    window.link = window.metalink; // for rassen
  }
} else if (islocation("meta_rassen", "2")) {
  //////////////////////////////////////////////////////////////////
  //RASSEN INFO
  //////////////////////////////////////////////////////////////////
  skrupelhack = function(){
    var tds = document.getElementsByTagName("td");
    var rasse = { };
    
    var cur = 0;
    for (; cur < tds.length; cur++) 
      if ( tds[cur].textContent == "Bevorzugte Planetenklasse") { 
        rasse.planetClass = tds[cur+1].textContent; 
        break; 
      }
    
    var cur = 0;
    for (; cur < tds.length; cur++) 
      if ( tds[cur].textContent == "Bevorzugte Temperatur") { 
        rasse.temperature = /([0-9]+) +Grad/.exec(tds[cur+1].textContent)[1]; 
        break; 
      }
    
    var ships = [];
    var first = true;
    var ship = [];
    function putShip(){
      if (first) { first = false; return; }
      ships.push(ship);
      ship = [];
    }
    
    var inProperties = ["!!name", "!!tl", "Crew", "Masse", "Tank", "Fracht", "Antriebe", "Energetik", "Projektile", "Hangar", "Cantox", "Baxterium", "Rennurbin", "Vomisaan"];
    for (; cur < tds.length; cur++) {
      if (tds[cur].style.fontSize == "11px") {
        putShip();
        ship[0] = tds[cur].textContent;
        cur+=1;
        ship[1] = /[0-9]+/.exec(tds[cur].textContent)[0];
      } else {
        var idx = inProperties.indexOf(tds[cur].textContent);
        if (idx >= 0) {
          cur += 2;
          ship[idx] = /[0-9]+/.exec(tds[cur].textContent)[0];
        }
      }
    }
    putShip();
    
    var rassename = /rasse=([^&=]+)/.exec(location.href)[1];
  
    localStorage["Rasse:"+rassename+":meta"] = rasse.toSource();
    localStorage["Rasse:"+rassename+":ships"] = ships.toSource();
//    alert(localStorage["Rasse:"+rassename+":ships"]);
  }
} else if (islocation("flotte_gamma","2")) {
  ///////////////////////////////////////////////////////////////////
  //TAKTIK
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var storeTaktikDirect = function(shipid, aggro, taktik) {
      localStorageSetShipDataProperty(shipid, "aggro", aggro);
      localStorageSetShipDataProperty(shipid, "taktik", taktik);
    }
    var storeTaktik = function(ship){
      storeTaktikDirect(ship, document.getElementsByName("aggro")[0].value, document.getElementsByName("taktik")[0].value);
    }
  
    var flotte = globals().meta_flotte;
    if (flotte.length == 0) { 
      document.forms[0].onsubmit = function() {   storeTaktik(getPageParam("shid")); };
      return;
    }
    var btn = document.createElement("input"); btn.type = "button"; btn.value = "Flottentaktik anzeigen"; btn.style.width = "255px";
    var temp = document.createElement("center"); temp.appendChild(btn);
    document.body.appendChild(temp);
    btn.onclick = function(){
      document.body.innerHTML = "<div style='position: absolute; background-color:red; width: 100%'><div id='progress' style='position: absolute; background-color:green; width: 0%'>&nbsp;</div>&nbsp;</div>";
      var priority = new Array();
      for (var i=0;i<=9;i++) priority[i] = new Array();
      var kind = new Object;
      
      var displayResults = function(){
        var res = "";
        var divs = new Array();
        document.body.innerHTML = "";
        for (var i=9;i>=0;i--) {
          divs[i] = document.createElement("div");
          divs[i].innerHTML = i + ": ";
          document.body.appendChild(divs[i]);
        }
        for (var i=9;i>=0;i--) 
          for (var j=0; j<priority[i].length; j++) {
            var s = document.createElement("span");
            var id = priority[i][j];
            if (kind[id] == "1") s.style.color = "red";
            else if (kind[id] == "2") s.style.color = "lime";
            s.textContent = globals().shipNames[id];
            s.onclick = (function(_i,_id){return function(){
              var p = _i + ((kind[_id] == "1")?"a":((kind[_id] == "2")?"d":""));
              var c = prompt("Neue Priorität:", p);
              if (p == c || c == null) return;
              var np = /[0-9]+/.exec(c);
              var na = /[ad]/.exec(c);
              if (na == "a") na = 1; else if (na == "d") na = 2; else na = 0;
              skrupelrequest("flotte_gamma.php?fu=3&shid="+_id, "aggro="+np+"&taktik=" + na , btn.onclick);
            }})(i,id);
            divs[i].appendChild(s);
            if (j != priority[i].length - 1)
              divs[i].appendChild(document.createTextNode(", "));
          }
      }
      
      var splitted = /(.*shid=)[0-9]+(&.*)/.exec(location.href);
      var received = 0;
      for (var i=0;i<flotte.length;i++) {
        request(splitted[1] + flotte[i] + splitted[2], "", (function(id){ return function(answer) {
          var aggro = /input type="hidden" name="aggro" value="([0-9]+)"/.exec(answer)[1];
          var ki = /option value="([0-9]+)" selected/.exec(answer)[1];
          priority[aggro].push(id);
          kind[id] = ki;
          storeTaktikDirect(id, aggro, ki);
          received++;
          document.getElementById("progress").style.width = 100*received/flotte.length+"%";
          if (received == flotte.length) displayResults();
        }})(flotte[i]));
      }
    }
    
   var imgs = document.getElementsByTagName("img");
   for (var i=0;i<imgs.length;i++) if (imgs[i].height==57)  {
     imgs[i].height = 40; 
     imgs[i].parentNode.parentNode.getElementsByTagName("td")[1].style.backgroundPosition = "0 -8px";
     break;
  }
   var td = document.getElementsByTagName("img");
   for (var i=0;i<imgs.length;i++) if (imgs[i].height==57)  imgs[i].height = 40;
    
   if (globals().meta_flotte_enabled) {
     var oldbtn = document.getElementsByName("bla")[0];
     oldbtn.type = "button";
     oldbtn.value = "für alle setzen";
     oldbtn.onclick = function(){
       for (var i=0;i<flotte.length;i++) storeTaktik(flotte[i]);
       submitForShips(flotte, document.forms[0], function(id, res, output){
         output.innerHTML = output.innerHTML + globals().shipNames[id] + ":" + (/<center>(.*)<\/center>/.exec(res)[1]) + "<br>";
       });
     };
   }
  }
} else if (islocation("galaxie","2")) {
  ///////////////////////////////////////////////////////////////////
  //GALAXIE
  ///////////////////////////////////////////////////////////////////
  skrupelhack = function (){ 
    var addInfos = function(){
     var tooltip = document.getElementById("tooltip_planetunbesetzt");
     if (tooltip) {
       var temp = document.createElement("div");
       temp.style.borderStyle = "solid";
       temp.style.borderWidth="1px";
       temp.style.borderColor="#444444 #666666 #666666 #666666";
       temp.style.backgroundColor="#444444";
       temp.id = "tooltip_planetunbesetzt_extra";
       tooltip.appendChild(temp);
       temp.innerHTML = "<table>" +
            "<tr><td>Temperatur</td><td id='tooltip_planetunbesetzt_temperatur'></td></tr>"+
            "<tr id='tooltip_planetunbesetzt_trDS'><td>dom.Spezies</td><td><span id='tooltip_planetunbesetzt_dsName'></span><i id='tooltip_planetunbesetzt_dsCount'></i></td></tr>"+
            "<tr id='tooltip_planetunbesetzt_trWirtschaft'><td colspan=2>   <img src='../bilder/icons/crew.gif'><span id='tooltip_planetunbesetzt_Kolonisten'></span>    <img src='../bilder/icons/minen.gif'><span id='tooltip_planetunbesetzt_Minen'></span>   <img src='../bilder/icons/fabrik.gif'><span id='tooltip_planetunbesetzt_Fabriken'></span>   <img src='../bilder/icons/abwehr.gif'><span id='tooltip_planetunbesetzt_PDS'></span> </td></tr>"+
            "<tr id='tooltip_planetunbesetzt_trMinerals'><td>   "+
              "<img src='../bilder/icons/lemin.gif'><span id='tooltip_planetunbesetzt_Min0'></span>"+
              "</td><td><img src='../bilder/icons/mineral_1.gif'><span id='tooltip_planetunbesetzt_Min1'></span> </td>  "+
            "</td></tr><tr id='tooltip_planetunbesetzt_trMinerals2'><td>" + 
              "<img src='../bilder/icons/mineral_2.gif'><span id='tooltip_planetunbesetzt_Min2'></span>  "+
              "</td><td><img src='../bilder/icons/mineral_3.gif'><span id='tooltip_planetunbesetzt_Min3'></span> </td></tr>"+
            "</table>";
            
            
       var tooltip2 = tooltip.cloneNode(false);
       tooltip2.id = "tooltip_enemyshipX";
       tooltip2.visibility = "visible";
       tooltip2.display = "none";
       tooltip.parentNode.appendChild(tooltip2);
       temp = document.createElement("div");
       temp.style.position="absolute";
       temp.style.borderStyle = "solid";
       temp.style.borderWidth="1px";
       temp.style.borderColor="#444444 #666666 #666666 #666666";
       temp.style.backgroundColor="#444444";
       tooltip2.appendChild(temp);

       //var speakingNames = ["skip", "Name", "Schaden", "Crew", "Masse", "Lemin", "Güter", "Antrieb", "Energetik", "Projektil", "Hangar"]
       var speakingNames = ["skip", "Name", "krieg", "crew", "masse", "lemin", "vorrat", "antrieb", "laser", "projektil", "hangar"]
       for (var i=2; i<=10; i++) speakingNames[i] = "<img src='../bilder/icons/"+speakingNames[i]+".gif' width='17' height='17'/>";
       
       var ih = 
         "<table style='min-width:150px'>" 
         + "<tr><td>Masse</td><td id='tooltip_enemyshipX_mass'>?</td></tr>"
         + "<tr><td colspan=4 id='tooltip_enemyshipX_extra'>?</td></tr>"
         + "</table>"
         + "<div id = 'tooltip_enemyshipX_scan'><table>";
       for (var i=1;i<speakingNames.length;i+=2) {
         ih += "<tr>" 
             + "<td>"+speakingNames[i]+"</td><td id='tooltip_enemyshipX_scan"+i+"'></td>"
             + "<td>"+speakingNames[i+1]+"</td><td id='tooltip_enemyshipX_scan"+(i+1)+"'></td>";
             + "</tr>";
       }
       ih += "</table>"; 
       temp.innerHTML = ih;                         
                        
       var meta = document.createElement("div");
       meta.innerHTML = "<div style='margin-top:75px'><a href='#' style='color:blue; cursor:pointer' onclick='searchxxx()'>Suche</a></div>";
       document.getElementById("sticky").appendChild(meta);
     } else setTimeout(addInfos, 250);
    }
    addInfos();
    
    window.oldtooltipunbesetzt = tooltipunbesetzt;
    window.tooltipunbesetzt = function(xdat,ydat,name,beziehung) {
      if(settings.enabletooltips) {        
        oldtooltipunbesetzt(xdat,ydat,name,beziehung);
        var realname = "Planet:"+ gameSId() + ":" + /\[([^\]]+)\]/.exec(name)[1];
//        alert(realname);
        if (localStorage[realname+":Temperatur"]){
          document.getElementById("tooltip_planetunbesetzt_temperatur").style.display = "";
          document.getElementById("tooltip_planetunbesetzt_temperatur").textContent = localStorage[realname+":Temperatur"];
          if (localStorage[realname+":dsCount"] > 0) {
            document.getElementById("tooltip_planetunbesetzt_trDS").style.display = "";
            document.getElementById("tooltip_planetunbesetzt_dsName").textContent = localStorage[realname+":dsName"];
            document.getElementById("tooltip_planetunbesetzt_dsName").style.color = dominantSpeciesQualityColor(localStorage[realname+":dsName"]);
            document.getElementById("tooltip_planetunbesetzt_dsCount").textContent = "("+localStorage[realname+":dsCount"]+")";            
          } else document.getElementById("tooltip_planetunbesetzt_trDS").style.display = "none";
          var details = localStorage[realname+":DETAILWIRTSCHAFT"];
          if (details) details = JSON.parse(details);
          if (details && (details["Kolonisten"] != "0" || details["Minen"] != "0" || details["Fabriken"] != "0" || details["P.D.S"] != "0" )) {
            
            document.getElementById("tooltip_planetunbesetzt_trWirtschaft").style.display = "";
            document.getElementById("tooltip_planetunbesetzt_Kolonisten").textContent = details["Kolonisten"];
            document.getElementById("tooltip_planetunbesetzt_Minen").textContent = details["Minen"];
            document.getElementById("tooltip_planetunbesetzt_Fabriken").textContent = details["Fabriken"];
            document.getElementById("tooltip_planetunbesetzt_PDS").textContent = details["P.D.S"];
           } else document.getElementById("tooltip_planetunbesetzt_trWirtschaft").style.display = "none";

          var minPoints = localStorage[realname+":DETAILMINERALPOINTS"];
          var minDensity = localStorage[realname+":DETAILMINERALDENSITY"];
          if (minPoints && minDensity) {
            document.getElementById("tooltip_planetunbesetzt_trMinerals").style.display = "";
            document.getElementById("tooltip_planetunbesetzt_trMinerals2").style.display = "";
            minPoints = JSON.parse(minPoints);
            minDensity = JSON.parse(minDensity);
            var verboseDensity = ["?", "???", "0.1", "1", "1.67", "2.5", "5", "10"];
            //flüchtig, weit gestreut, verteilt, konzentriert, hochkonzentriert
            //10             6           4          2                1
            for (var i=0;i<4;i++) {
              document.getElementById("tooltip_planetunbesetzt_Min"+i).textContent = verboseDensity[minDensity[i]+1] + " / "+(minPoints[i]*11.5 * ( minDensity[i] == 1 ? 2 : 1 ));
            } 
          } else {
            document.getElementById("tooltip_planetunbesetzt_trMinerals").style.display = "none";
            document.getElementById("tooltip_planetunbesetzt_trMinerals2").style.display = "none";
          }
        } else {
          document.getElementById("tooltip_planetunbesetzt_temperatur").style.display = "none";
          document.getElementById("tooltip_planetunbesetzt_trDS").style.display = "none";
          document.getElementById("tooltip_planetunbesetzt_trWirtschaft").style.display = "none";
          document.getElementById("tooltip_planetunbesetzt_trMinerals").style.display = "none";
          document.getElementById("tooltip_planetunbesetzt_trMinerals2").style.display = "none";
        }

      }
    }
    
    window.oldtooltipenemyship = tooltipenemyship;
    window.tooltipenemyship = function(xdat,ydat,beziehung) {
      if(settings.enabletooltips) {        
        oldtooltipenemyship(xdat,ydat,beziehung);

        var link = $('a[onMouseOver="tooltipenemyship('+xdat+','+ydat+',0);"]');
        var imgsrc = link.find("img").attr("src");
      //  alert(imgsrc);
        var img = /schiff_([0-9]+)_([0-9]+)/.exec(imgsrc);
        var anzeige = img[1] * 1;
        var mass_min = anzeige * 100 - 50; var mass_max = anzeige * 100 + 49;
        if (mass_min <= 50) mass_min = 0;
        if (mass_max > 1000) mass_max = 1000;
        document.getElementById("tooltip_enemyshipX_mass").textContent = mass_min + " - " + mass_max;
    //  alert("ftl: " + mass_min);

        var matches = [];
        var rassen = localStorageGetData("rassen:"+gameSId());
        if (rassen && rassen[img[2]*1]) {
          var rasse = rassen[img[2]*1];
          var ships = localStorageGetData("Rasse:"+rasse+":ships");
          if (ships) {
            
            for (var i=0;i<ships.length;i++)
              if (ships[i][3] >= mass_min && ships[i][3] <= mass_max) 
                matches.push(ships[i][0]);
          } else matches.push("Rasse '"+rasse+"' unbekannt");
        } else matches.push("Imperium unbekannt (siehe Übersicht/Imperien)");
        document.getElementById("tooltip_enemyshipX_extra").textContent = "Eventuell: " + matches.join(", ") + " ?";

        var scanned = false;
        if (link.attr("onclick")) {
          var oc = link.attr("onclick");
          if (link.attr("onclick").toSource && link.attr("onclick").toSource()) oc = link.attr("onclick").toSource();
          var m = /[(] *[0-9]+, *[0-9]+, *([0-9]+)/.exec(oc);;
          if (m) m = m[1];
          var shipData = localStorageGetShipData(m);
          if (shipData && shipData.scan) {
            shipData.scan = JSON.parse(shipData.scan);
            scanned = true;
            for (var i=1; i<=10;i++)
              if (document.getElementById("tooltip_enemyshipX_scan"+i)) document.getElementById("tooltip_enemyshipX_scan"+i).textContent = shipData.scan[i];          
          }
        }
        
        document.getElementById("tooltip_enemyshipX_scan").style.display = scanned ? "block" : "none";

        var dom_tip = document.getElementById('tooltip_enemyshipX');
        dom_tip.style.left = xdat+5;
        dom_tip.style.top = ydat+5;
        dom_tip.style.display = "block";
        dom_tip.style.visibility = "visible";
      }
    }
    
    window.oldtooltipenemyshipout = tooltipenemyshipout;
    window.tooltipenemyshipout = function(xdat,ydat,beziehung) {
      if(settings.enabletooltips) {
        oldtooltipenemyshipout(xdat, ydat, beziehung);
        document.getElementById('tooltip_enemyshipX').style.display='none';
      }
    }

    var raumA = document.getElementById("raum").getElementsByTagName("a")[0];
    raumA.onclick = null;
    raumA = document.getElementById("raum").getElementsByTagName("a")[0].firstChild;
    
    function getAbsMouseXY(e) {
      if (IE) {
        var tempX = event.clientX + document.body.scrollLeft;
        var tempY = event.clientY + document.body.scrollTop;
      } else {
        var tempX = e.pageX;
        var tempY = e.pageY;
      }    
      return [tempX, tempY];
    }
    function getScrollPos(){
      if (settings.scrollbars) 
        return [-parseInt(document.getElementById("complete_contentwrapper").style.left), -parseInt(document.getElementById("complete_contentwrapper").style.top)];
       else
        return [document.getElementById("complete").scrollLeft, document.getElementById("complete").scrollTop];;
    }
    function setScrollPos(pos){
      if (settings.scrollbars) {
        document.getElementById("complete_contentwrapper").style.left = -pos[0];
        document.getElementById("complete_contentwrapper").style.top = -pos[1];
      } else {
        document.getElementById("complete").scrollLeft = pos[0];
        document.getElementById("complete").scrollTop = pos[1];
      }
    }
    
    raumA.onmousedown = function(e) {
      var pos = getAbsMouseXY(e);
      window.startClickPos = pos; 
      window.moving = false; 
      window.startingScroll = getScrollPos();
      return false;
    }
    raumA.onmousemove = function(e) {
      if (!window.startClickPos) return;
      var pos = getAbsMouseXY(e);
      if (window.moving || (pos[0] - window.startClickPos[0])*(pos[0] - window.startClickPos[0]) + (pos[1] - window.startClickPos[1])*(pos[1] - window.startClickPos[1]) > 10) {
        window.moving = true;
        setScrollPos([window.startingScroll[0] - pos[0] + window.startClickPos[0],window.startingScroll[1] - pos[1] + window.startClickPos[1]]);
//        alert(document.getElementById("complete").scrollLeft);
        return false;
       // alert(document.getElementById("complete").scrollLeft);
      } 
    }

    raumA.onmouseup = function(e) {
      if (!window.moving) 
        linie(e);
      window.moving = false;
      window.startClickPos = null; 
    }
    
    document.onmouseup = function(){window.moving = false; window.startClickPos = null; }
    
    //Schiffstooltip
    window.simpleSendEvent = function(target, name){
      var evt = document.createEvent("Events");
      evt.initEvent(name, true, true);
      target.dispatchEvent(evt);
    };

    var skrupelFarben = new Array("", "#00FF00", "#FFFF00", "ff9500", "#996500", "#FF0000", "#FF00E9", "#9500ff", "#0000FF", "#19b2ff", "#00ffc0");
    var divs = document.getElementsByTagName("div");
    for (var i=0;i<divs.length;i++)
      if (divs[i].id.substr(0,7) == "schiff_" && divs[i].innerHTML.contains("umlaufbahn"))  {
        var temp = document.createElement("div");
        temp.setAttribute("style", "z-index:15;position: absolute; left: " +(/[0-9]+/.exec(divs[i].style.left)[0]*1+18)+ "px; top:"+/[0-9]+/.exec(divs[i].style.top)[0]+"px; width:10px; height:10px; font-size: 150%") ;
        var ih = divs[i].innerHTML;
        var color = /umlaufbahn_([0-9]+)/.exec(ih)[1]*1;
        if (skrupelFarben[color]) temp.style.color = skrupelFarben[color];
        if (!ih.contains("<br>")) temp.textContent = "S";
        else temp.textContent = ih.count("<br>");
        var a = divs[i].getElementsByTagName("a")[0];
        temp.addEventListener("click", (function(_t){return (function(){simpleSendEvent(_t, "click");})})(a));
        temp.addEventListener("mouseover", (function(_t){return (function(){simpleSendEvent(_t, "mouseover");})})(a));
        temp.addEventListener("mouseout", (function(_t){return (function(){simpleSendEvent(_t, "mouseout");})})(a));
        divs[i].parentNode.appendChild(temp);
      }


/*    window.oldlinie = linie;
    window.linie = function(e) {
      if (parent.mittelinksoben.document.globals.kursmodus.value==1) { oldlinie(e); return; }
      var pos = getMouseXY(e);
      if (window.startClickPos == null) {
        document.onmouseup = function(e) { window.startClickPos = null; }
      } else 
      window.startClickPos = getMouseXY(e);
  }*/
  

        function movemap(wertx,werty) { //taken from skrupel source (planeten)

            breite=fensterbreit();
            hoch=fensterhoch();
    
            aktuellx=wertx-15;
            aktuelly=werty-15;
    
            wertx=wertx-(breite/2);
            werty=werty-(hoch/2);
                            var scrollDiv = parent.parent.mittemitte.document.getElementById("complete");
                if(scrollDiv.contentScroll) scrollDiv.contentScroll(wertx,werty,false);
                        parent.parent.mittemitte.document.getElementById("aktuell").style.visibility='visible';
            parent.parent.mittemitte.document.getElementById("aktuell").style.left=aktuellx;
            parent.parent.mittemitte.document.getElementById("aktuell").style.top=aktuelly;
    
        }
  
  
    window.searchxxx = function() {  //search without xxx doesn't work
      var searchfor = prompt("Suche nach:");
      if (!searchfor) return;
      
      var coords = /([0-9]+) *[:\/] *([0-9]+)/.exec(searchfor);
      if (coords) {
        movemap(coords[1], coords[2]);
        return;
      }
      
      var as = document.getElementsByTagName("a");
      var sfb = "["+ searchfor + "]";
      for (var i=0;i<as.length;i++) {
        if (as[i].onmouseover && as[i].onmouseover.toSource().contains(sfb)) {
          var x = /linieplanet[(] *([0-9]+) *, ([0-9]+)*/.exec(as[i].onclick.toSource());
          if (!x)  x = /takeship[(][0-9]+, *[0-9]+, *[0-9]+, *([0-9]+) *, ([0-9]+)*/.exec(as[i].onclick.toSource());
          movemap(x[1]*1, x[2]*1);
         }
      }
         
    }
  }
  ///////////////////////////////////////////////////////////////////
} else if (islocation("uebersicht_kolonien","1")) {
  ////////////////////////////////////////////////////////////////////
  //KOLONIEN FENSTER
  /////////////////////////////////////////////////////////////////////
  skrupelhack = function() {
    var usefulProperties = new Array("Cantox", "Minen", "Fabriken", "Vorräte", "Lemin", "Baxterium", "Rennurbin", "Vomisaan");
    var table = document.getElementById("bodybody").getElementsByTagName("table")[0];
    var warnings = 0; var hints = 0;
    for (var r=0; r < table.rows.length; r+=2) {
      table.rows[r].style.backgroundColor = "#444444";
      table.rows[r+1].style.backgroundColor = "#444444";
      var prow = table.rows[r];
      var tds = prow.getElementsByTagName("td");
      var inPlanet = false; 
      var planetInfos = new Object(); var lastName = ""; var value;
      for (var i=0;i<tds.length;i++) {
        if (tds[i].firstChild && (tds[i].firstChild.nodeType == 3 && tds[i].childNodes.length == 1) || (tds[i].firstChild.nodeType == 1 && tds[i].firstChild.nodeName == "NOBR"  && tds[i].firstChild.firstChild.nodeType == 3)) {
          if (lastName != "") { planetInfos[lastName] = tds[i]; lastName = "";  }
          else  if (usefulProperties.contains(tds[i].textContent)) lastName = tds[i].textContent;
          //alert(tds[i].textContent);
        }
      }
             
      var megafabrik = false; var exoraffinerie = false; var extensions = 0;
      var imgs = prow.getElementsByTagName("img");
      var existingBuildings = new Object;
      for (var i=0;i<imgs.length;i++) 
        if (imgs[i].width == 32)
          if (imgs[i].src.contains("osysteme/blank.gif")) extensions+=1;
          else existingBuildings[imgs[i].title] = true;
      
      var Vorraete = /^[0-9]+/.exec(planetInfos["Vorräte"].textContent) * 1;
      var Cantox = /^[0-9]+/.exec(planetInfos["Cantox"].textContent) * 1;
      var Lemin = /^[0-9]+/.exec(planetInfos["Lemin"].textContent) * 1;
      var Baxterium = /^[0-9]+/.exec(planetInfos["Baxterium"].textContent) * 1;
      var Rennurbin = /^[0-9]+/.exec(planetInfos["Rennurbin"].textContent) * 1;
      var Vomisaan = /^[0-9]+/.exec(planetInfos["Vomisaan"].textContent) * 1;

      var message = ""; var hint = "";
      if (planetInfos["Fabriken"].textContent == "0") message+="Keine Fabriken!" + "<br>\n";
      else if (!planetInfos["Fabriken"].textContent.contains("auto")) message+="Kein Autofabrikbau!" + "<br>\n";
      else if (planetInfos["Minen"].textContent == "0") { if (Vorraete > 0) message+="Keine Minen!" + "<br>\n"; }
      else if (!planetInfos["Minen"].textContent.contains("auto")) message+="Kein Autominenbau!" + "<br>\n";
      
      if (extensions > 0) {
        var checkBuildable =  function(name, rCantox, rVorraete, rLemin, rBaxterium, rRennurbin, rVomisaan) {
          if (existingBuildings[name] != true 
             && ((Cantox >= rCantox) || (Vorraete + Cantox >= rCantox + rVorraete)) && (Vorraete >= rVorraete)
             && Lemin >= rLemin && Baxterium >= rBaxterium && Rennurbin >= rRennurbin && Vomisaan >= rVomisaan) { hint += "Kann "+name+" bauen<br>\n"; }
        }
        checkBuildable("Megafabrik", 120, 17, 0, 20, 17, 13);
        if (existingBuildings["Megafabrik"]) checkBuildable("Exo-Raffinerie", 85, 32, 28, 35, 12, 8);
        checkBuildable("Metropole", 200, 25, 50, 20, 30, 20);
      }
      
      
      if (message != "") warnings++;
      if (hint != "") hints++;

      if (message != "" || hint != "")
        table.rows[r+1].innerHTML = "<td colspan=11 style='color:red; alignment: right'>"+message+"<div style='color:orange'>"+hint+"</div></td>";
    }
    
    if (warnings > 0) document.getElementById("bodybody").style.backgroundColor = "red";
    else if (hints > 0) document.getElementById("bodybody").style.backgroundColor = "yellow";
  }
  
} else if (islocation("uebersicht_imperien","1")) {
  skrupelhack = function(){
    var rassen = new Array("", "");
    var as = document.getElementsByTagName("a");
    var checkrasse = /meta_rassen[.]php[?]fu=2.*rasse=([^&=]+)/;
    var player = 0;
    for (var i=0;i<as.length;i++) {
      var check = checkrasse.exec(as[i].href);
      if (check != null) {
        player += 1;
        rassen[player] = check[1];
      }
    }
    localStorage["rassen:"+gameSId()] = rassen.toSource();
  }
} else if (islocation("planeten_gamma", "4")) {
  ////////////////////////////////////////////////////////////////////
  //FABRIKEN
  /////////////////////////////////////////////////////////////////////
  //select first instead of last
  var temp = document.getElementsByName("vorratauftrag");
  temp[0].selectedIndex = 0;
  //replace select with text input: (replacing works, but selling doesn't??)
  //var temp = document.getElementsByName("vorratauftrag");
  //temp[0].parentNode.innerHTML = "<input value='0' name='vorratauftrag' style='width:45px;text-align:right' type='text'>";
} else if (islocation("meta_simulation","2")) {
  ////////////////////////////////////////////////////////////////////
  //SIMULATION
  /////////////////////////////////////////////////////////////////////
  skrupelhack = function() {
    window.zeige = function(){
      schiffauswahl.style.visibility="visible";
      schiff1();
      schiff2();
    }
    window.setTimeout = function(f, t){
      if (!f) return;
      if ((typeof f) == "string") eval(f);
      else f();
    };
  }
  
};

if (skrupelhack) {
  var injectJS = document.createElement("script");
  var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  injectJS.innerHTML = ( is_chrome ? libraryinit : libraryinit.toSource()) + 
                        "var skrupelhack = "+ ( is_chrome ? skrupelhack : skrupelhack.toSource() )+";"+                       "libraryinit(); " + // " window.setTimeout = function(a,b){alert('timeout.'+a+':'+b);}; window.setInterval = function(a,b){alert('interval.'+a+':'+b);};"
                       "setTimeout(skrupelhack(), 50); " ;
  var jq = document.createElement("script");
  jq.type="text/javascript";
  jq.src="js/jquery/jquery.js";
  document.getElementsByTagName("head")[0].appendChild(jq);
  document.getElementsByTagName("head")[0].appendChild(injectJS);
}

