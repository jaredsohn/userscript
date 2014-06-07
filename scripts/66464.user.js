// ==UserScript==
// @name           Travian ☣ Attack Notifier
// @description    Yet another lightweight attack notifier
// @namespace      http://userscripts.org/users/103897
// @include        http://*.travian.*
// @author         Jinnie
// @version        0.3.5
// ==/UserScript==

// set to true to see reinforcement data too.
FULL_NAME = "103897_attack_notifier_full_mode";
var fullMode = GM_getValue(FULL_NAME, "attack");

// set some styles
GM_addStyle("div.v_mov {float: left; width: 140px;} div.v_dur_r {float: right; color: #999999}");
GM_addStyle("span.v_a1 {color: red;} span.v_a3 {color: #B500A3;} span.v_d1 {color: #228B22;} span.v_a2, span.v_d2 {color: #F2C700;}");

// save selection
var selected = getSelectedVillage();

addModeModifier();
setTimeout(findAttacks, 0); //be nice to other evil scripts out there

function addModeModifier(){
  var mod = document.createElement("span");
  mod.appendChild(document.createTextNode("☣ "));
  mod.addEventListener("click", modHandler, true);
  mod.style.paddingLeft = "2px";
  mod.style.fontSize = "17px";
  mod.style.color = fullMode == "all" ? "green" : ( fullMode == "attack" ? "red" : "black");
  mod.style.cursor = "pointer";
  var parent = fastEval("//td[a/@accesskey]", document.getElementById("vlist")).snapshotItem(0);
  parent.insertBefore(mod, parent.firstChild);
}

function modHandler(){
  var mod;
  if (fullMode == "all") { fullMode = "off"; }
  else if (fullMode == "attack") { fullMode = "all"; }
  else { fullMode = "attack"; }
  GM_setValue(FULL_NAME, fullMode);
  window.location.reload();
}

function findAttacks(){
  if(fullMode == "off") {return;}
  var xpath = '//table[@id="vlist"]/tbody/tr';
  var trs = fastEval(xpath, document);
  var body = trs.snapshotItem(0).parentNode;

  var vils = getVillages();
  var cache = []
  for (var i=0; i<vils.length; i++){
    var vil = vils[i];

    var atk = checkVillageForAttacks(vil.id);

    if(!atk.match(/empty/)){
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      atk = atk.replace(/mov/g, "v_mov");
      atk = atk.replace(/dur_r/g, "v_dur_r");
      atk = atk.replace(/a1/g, "v_a1");
      atk = atk.replace(/a2/g, "v_a2");
      atk = atk.replace(/a3/g, "v_a3");
      atk = atk.replace(/d1/g, "v_d1");
      atk = atk.replace(/d2/g, "v_d2");
      td.innerHTML = '<table><tbody>' + atk + '</tbody></table>';
      if(fullMode == "attack"){
        var trx = fastEval('//tr[td/span/@class = "v_d1" or td/span/@class = "v_d2" or td/span/@class = "v_a2"]', td);
        for (var j=trx.snapshotLength-1; j>=0 ; j--){
          var t = trx.snapshotItem(j);
          t.parentNode.removeChild(t);
        }
      }

      var links = fastEval("//a", td);
      for (var j=0; j<links.snapshotLength; j++){
        var a = links.snapshotItem(j);
        a.href += "&newdid=" + vil.id; 
      }
      td.setAttribute("colspan", "3");
      td.style.paddingLeft = "20px";
      tr.appendChild(td);
      cache.push(tr);
    } else {
      cache.push(null);
    }
  }

  // return selection
  GET("/dorf1.php?newdid=" + selected);

  for (var i=0; i<cache.length; i++){
    if(cache[i] == null) {
      continue;
    }
    body.insertBefore(cache[i], trs.snapshotItem(i).nextSibling);
  }
}

function checkVillageForAttacks(villageId){
  var url = "/dorf1.php?newdid=" + villageId;
  var res = GET(url);
  var temp = document.createElement("span");
  temp.innerHTML = res;

  var info2 = fastEval('//div[@id="map_details"]/table[@id="movements"]/tbody', temp).snapshotItem(0);
  return info2.innerHTML;
}

/**
 * @return object{id, name, url, x, y}
 */
function getVillages(){
  var villages = [];
  var xpath = '//table[@id="vlist"]/tbody/tr';
  var trs = fastEval(xpath, document);
  for ( var i=0 ; i < trs.snapshotLength; i++ ){
    var res = {};
    var tds = trs.snapshotItem(i).getElementsByTagName("td");
    var anchor = tds[1].getElementsByTagName("a")[0];
    res.name = anchor.firstChild.nodeValue;
    res.url = anchor.href;
    res.id = res.url.match(/=(\d+)/)[1];
    var divs = tds[2].getElementsByTagName("div");
    res.x = divs[0].firstChild.nodeValue.substring(1);
    var yStr = divs[2].firstChild.nodeValue;
    res.y = yStr.substring(0, yStr.length-1);

    villages.push(res);
  }
  return villages;
}

function getSelectedVillage(){
  var xpath = '//table[@id="vlist"]/tbody/tr[td/@class="dot hl"]/td[@class="link"]/div/a';
  var anch = fastEval(xpath, document).snapshotItem(0);
  var id = anch.href.match(/=(\d+)/)[1];
  return id;
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
