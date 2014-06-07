// ==UserScript==
// @name           MSK
// @namespace      MSKTips
// @description    Herramientas para la alianza -MSK-
// @include        http://*ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// @autor        Diego Tovar
// @version      1.6
// ==/UserScript==

// Score Linker
var show = { gold: 4, military: 2 };
var post = {
 military: "army_score_main",
     gold: "trader_score_secondary"
};

var saving;
var gameServer = location.host;
var valueCache = eval(GM_getValue(gameServer, "({})"));
var changeLink = GM_getValue("link", true);
var whatToShow = GM_getValue("show", "7");
var inlineScore = GM_getValue("inline", true);

if ($("options_changePass"))
  displayOnOptions_fn();
else
  init();

function init() {
  function maybeLookup(e) {
    var n = $X('.//span[@class="textLabel"]', e.target);
    var ul = $X('ancestor-or-self::li[1]/ul[@class="cityinfo"]', e.target);
    if ($X('li[contains(@class," name")]', ul)) return; // already fetched!
    var who = $X('li[@class="owner"]/text()[preceding::*[1]/self::span]', ul);
    var name = trim(who.textContent);
    fetchScoresFor(name, ul, n, number(n.parentNode.id));
    }
  function lookupOnClick(a) {
    onClick(a, function(e) { setTimeout(maybeLookup, 10, e); });
    }
  function peek(e) {
    var on = e.target;
    cities.map(click);
    if (/^a$/i.test(on.nodeName))
      click(on);
    }

  if ("island" == document.body.id) {
    GM_addStyle(<><![CDATA[#island #information .messageSend img {
      position: absolute;
      margin: -3px 0 0 4px;
    }]]></>.toXMLString());
    var id = location.href.match(/[&?]id=(\d+)/);
    if (id) id = id[1];
    }
  var cities = getCityLinks();
  if (cities.length) {
    cities.forEach(lookupOnClick);
    var body = document.body;
    return inlineScore && onClick(body, peek, 0, "dbl");
    }
  var player = itemValue("owner");
  if (player)
    fetchScoresFor(player, null, null, id);
  }

function saveCache() {
  //console.log("Saving cache: %x", uneval(valueCache));
  GM_setValue(gameServer, uneval(valueCache).replace(/ /g, ""));
  }

function cacheValue(id, type, value, no) {
  //console.log("caching", id, type, value);
  var city = valueCache[id] || {};
  type = type.charAt();
  city[type.toLowerCase()] = number(value);
  city[type.toUpperCase()] = number(no||"0");
  city.T = time();
  valueCache[id] = city;
  saving && clearTimeout(saving);
  saving = setTimeout(saveCache, 1e3);
  }

function focus(direction) {
  var all = getCityLinks();
  var now = unsafeWindow.selectedCity;
  var cur = $X('id("cityLocation'+ now +'")/a') || all[all.length - 1];
  if (all.length) {
    now = all.map(function(a) { return a.id; }).indexOf(cur.id);
    click(all[(now + direction + all.length * 3) % all.length]);
    }
  }

function fetchScoresFor(name, ul, n, id) {
  function searchbutton(type) {
    var url = "url(/skin/" + ({
    military: "layout/sword-icon2.gif) no-repeat 0 2px;",
        gold: "resources/icon_gold.gif) no-repeat 0 0; width:18px"
      })[type];
    return <input type="submit" name="highscoreType"
      value=" " title={"View player's "+ type +" score"}
      style={"border: 0; height: 23px; width: 16px; cursor: pointer; " +
             "color: transparent; background:"+ url}
      onclick={"this.value = '"+ post[type] +"'; this.form.submit();"}/>;
    }

  var scores = changeLink &&
    <a href="/index.php?view=options"
      title="Change score options">Change Options</a>;

  if (!inlineScore) {
    var form = <form action="/index.php" method="post">
      <input type="hidden" name="view" value="highscore"/>
      <input type="hidden" name="" id="searchfor"/>
      <input type="hidden" name="searchUser" value={name}/>
    </form>;
    for (var type in post)
      if (whatToShow & show[type])
        form.* += searchbutton(type);
    if (changeLink) {
      scores.@style = "position: relative; top: -6Px;";
      form.* += scores;
      }
    form.@style = "position: relative; "+ (changeLink ? "left:-26px; " : "") +
      "white-space: nowrap;";
    scores = form;
    }

  if (!inlineScore || changeLink)
    addItem("options", scores, ul);
  if (!inlineScore) return;

  for (type in show) {
    if (!(whatToShow & show[type]))
      continue;
    if ("gold" == type && 0 && isMyCity(ul) && viewingRightCity(ul)) {
      var gold = $("value_gold").innerHTML;
      updateItem(type, gold, cityinfoPanel(), null, lootable(gold));
      continue;
      }
    addItem(type, "cargando...");
    requestScore(name, type, id, makeShowScoreCallback(name, type, ul, n, id));
    }
  }

function isMyCity(ul, name) {
  if ("city" == document.body.id)
    return $X('id("position0")/a').href != "#";

  var name = getItem("owner", ul);
  var a = $X('a', name);
  if (a) {
    var id = a.search.match(/destinationCityId=(\d+)/)[1];
    return $X('id("citySelect")/option[@value="'+ id +'"]');
    }
  var city = itemValue("name", ul);
  return $X('id("citySelect")/option[.="'+ city +'"]');
  }

function lootable(score, ul) {
  var amount = parseInt((score||"").replace(/\D+/g, "") || "0", 10);
  var panel = getItem("citylevel");
  var level = getItem("citylevel", ul);
  var size = itemValue(level);
  var max = Math.round(size * (size - 1) / 10000 * amount);
  if (isNaN(max)) return;
  max = node("span", "", null, "\xA0("+ fmtNumber(max) +"\xA0loot)");
  max.title = "Amount of gold lootable from this town";
  return max;
  }

function viewingRightCity(ul) {
  return itemValue("name") == itemValue("name", ul) &&
        itemValue("owner") == itemValue("owner", ul);
  }

function makeShowScoreCallback(name, type, ul, n, id) {
  return function showScore(xhr, cached, no) {
    var score = xhr;
    if ("yes" == cached) {
      score = fmtNumber(score);
      no = no && fmtNumber(no);
      } 
    else { // need to parse out the score
      var tr = $X('.//div[@class="content"]//tr[td[@class="name"]="' +
                 name + '"]', node("div", "", null, xhr.responseText));
      score = $X('td[@class="score" or @class="Â§"]', tr);
      score = score.innerHTML;
      no = ($X('td[@class="place"]', tr) || {}).textContent || "";
      }
    if (score) {
      if ("yes" != cached) cacheValue(id, type, score, no);

      ul = ul || cityinfoPanel();
      var city = $X('../preceding-sibling::div[@class="cityimg"]', n);
      if (unsafeWindow.friends && unsafeWindow.friends.indexOf(name) != -1) {
        n.style.fontStyle = "italic";
        n.title = "Ud Tiene un tratado cultural con este jugador";
        if (city) {
          city.className = "allyCityImg";
          city.parentNode.title = n.title;
          }
        } 
      else if (n && "0" == score && "military" == type) {
        n.style.fontWeight = "bold";
        if (city)
          city.style.backgroundImage = getComputedStyle(city, "").
            backgroundImage.replace("red.gif", "yellow.gif");
        }

      // You rob gold (size * (size - 1)) % of the treasury of the city:
      if ("gold" == type)
        var max = lootable(score, ul);
      score += " (#"+ no +")";

      updateItem(type, score, ul, !!n, max);
      }
    };
  }

function getCityLinks() {
  return $x('id("cities")/li[contains(@class,"city level")]/a');
  }

function itemValue(item, ul) {
  var li = "string" == typeof item ? getItem(item, ul) : item;
  var xpath = 'text()[preceding-sibling::*[1]/self::span[@class="textLabel"]]';
  var text = $X(xpath, li);
  return text && trim(text.textContent || "");
  }

function getItem(type, ul) {
  return $X('li[contains(concat(" ",normalize-space(@class)," ")," '+
            type +' ")]', ul || cityinfoPanel());
  }

function mkItem(type, value) {
  var li = node("li", type + " name", null, value);
  var title = (type in show) ?
    type.charAt().toUpperCase() + type.slice(1) + " Score:" : "Scores:";
  li.insertBefore(node("span", "textLabel", null, title), li.firstChild);
  return li;
  } 

function addItem(type, value, save) {
  var li = getItem(type);
  if (li) {
    li.lastChild.nodeValue = value;
    } 
  else {
    var ul = cityinfoPanel();
    var next = $X('li[@class="ally"]/following-sibling::*', ul);
    ul.insertBefore(li = mkItem(type, value), next);
    }
   if (save && !getItem(type, save)) {
    next = $X('li[@class="ally"]/following-sibling::*', save);
    save.insertBefore(li.cloneNode(true), next);
    }
  return li;
}

function updateItem(type, value, ul, islandView, append) {
  if (value.length + (append ? append.textContent.length : 0) > 25)
    value = value.replace(/ \(#[\d,.]+\)/, "");
  var li = getItem(type, ul);
  if (li) {
    li.lastChild.nodeValue = value;
  } else {
    var next = $X('li[@class="ally"]/following-sibling::*', ul);
    ul.insertBefore(li = mkItem(type, value), next);
    if (viewingRightCity(ul) && islandView) // only touch panel on right focus
      updateItem(type, value, null, null, append && append.cloneNode(true));
  }
  if (append && !$X('span[@title]', li)) {
    li.style.whiteSpace = "nowrap";
    li.appendChild(append);
  }
  return li;
}

function cityinfoPanel() {
  return $X('id("information")//ul[@class="cityinfo"]');
}

function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,
                       1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
}

function fmtNumber(n) {
  n += "";
  for (var i = n.length - 3; i > 0; i -= 3)
    n = n.slice(0, i) +","+ n.slice(i);
  return n;
}

function number(n) {
  n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
  return parseInt(n.replace(/\D+/g, "") || "0", 10);
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function onClick(node, fn, capture, e) {
  node.addEventListener((e||"") + "click", fn, !!capture);
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function time(t) {
  t = t || Date.now();
  return Math.floor(t / 6e4) - 2e7; // ~minute precision is enough
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

/*
The AJAX request system so we can display the scores inline
Original Author: wphilipw
For version: 0.5.0
Last changed: 0.5.0
*/

function requestScore(name, type, id, onload) {
  var cached = id && valueCache[id], key = type.charAt();
  if (cached && cached[key] && ((time() - cached.T) < 10))
    return onload(cached[key.toLowerCase()], "yes", cached[key.toUpperCase()]);
  //else delete valueCache[id]; // stale -- but save for now; could be useful

  GM_xmlhttpRequest({
    method: "POST",
    url: "http://" + gameServer + "/index.php",
    data: "view=highscore&highscoreType="+ post[type] +"&searchUser="+ name,
    headers: {
      "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/atom+xml,application/xml,text/xml",
      "Referer": "http://" + gameServer + "/index.php"
    },
    onload: onload
  });
}

function displayOnOptions_fn() {
  var mybox = node("div", "", { textAlign: "left" });
  var opts = <>
<h3>Score Display Options</h3>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td style="width:43%; text-align: right">Muestra Puntaje Militar:</td>
    <td><input type="checkbox" id="militaryScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Muestra Puntaje Oro:</td>
    <td><input type="checkbox" id="goldScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Muestra Puntaje Inline:</td>
    <td><input type="checkbox" id="inlineScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Muestra Opciones:</td>
    <td><input type="checkbox" id="changeScoreOptions"/></td>
  </tr>
</table></>;

  mybox.innerHTML = opts.toXMLString();
  var pwd = $('options_changePass');
  pwd.appendChild(mybox);
  var checkboxes = $x('//input[@type="checkbox" and contains(@id,"Score")]');
  for (var i = 0; i < checkboxes.length; i++) {
    var input = checkboxes[i];
    var id = input.id.replace("Score", "");
    if (id == "inline")
      input.checked = !!inlineScore;
    else if ("changeOptions" == id)
      input.checked = !!changeLink;
    else
      input.checked = !!(show[id] & whatToShow);
  }

  var inputs = $x('//input[@type="submit"]');
  for (var e = 0; e < inputs.length; e++)
    onClick(inputs[e], changeShow_fn, true);
}

function changeShow_fn(e) {
  GM_setValue("show", (
                (show.military * $('militaryScore').checked) |
                (show.gold * $('goldScore').checked)
              ) + "");
  GM_setValue("inline", $('inlineScore').checked);
  GM_setValue("link", $('changeScoreOptions').checked);
  e.target.form.submit();
}


//MENU MSK

var MSKToolsIds  = new Array("opclos","FontForm","buscaBox","worldBox");
var tagsAModifar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var Css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -17px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';

if(!window.addGlobalStyle){
       function addGlobalStyle(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModifar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModifar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModifar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModifar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModifar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModifar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addAstraToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var astreaToolsLink       = document.createElement('LI');
astreaToolsLink.setAttribute('id', 'OdSTool');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(astreaToolsLink,xLi);
addGlobalStyle(Css_MenuIKO_String);
document.getElementById('OdSTool').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>MetalStrike</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="http://s1.ikariam.es/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=38467&position=13&type=50" title="Envia mensaje Circular">Mensaje a Alianza</a></li>'
+ '     <li><center><a target="_blank" href="http://metalstrike.warsforum.com" title=" Web de la Alianza -MSK- ">Web MetralStrike</a></li>'
+ '     <li><center><a target="_blank" href="http://metalstrike.warsforum.com/forum.htm" title=" Foro de la Alianza -MSK- ">Foro MetalStrike</a></li>'
+ '     <li><center><a target="_blank" href="http://upcmail1a.upc.edu.pe/exchange" title=" Upcmail ">Mail UPC</a></li>'
+ '     <li><center><a target="_blank" href="http://portal.upc.edu.pe" title=" Upcmail ">Intranet UPC</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batallas para publicarlas en el foro ">Compactador de batallas</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaWorld" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title="Busca las coordenadas de las islas, solo con el nombre.">Buscador de islas</a></li>'
//+ '     <li><a href="#" title="Cambia il font" onclick="showTools(1)">Font <input style="margin-left:10px; visibility:hidden;" id="c'+MSKToolsIds[0]+'" type=CheckBox CHECKED DISABLED /></a></li>'
+ '     <li><center><a href="#" title=" Busca informacion de Jugadores, Ciudades, Alianzas e Islas " onclick="showTools(2)">Buscar información</a></li>'
//+ '     <li><a href="#" title="Cerca un bersaglio" onclick="showTools(3)">Scansione <input style="margin-left:10px; visibility:hidden;" id="c'+MSKToolsIds[3]+'" type=CheckBox CHECKED DISABLED/></a></li>'
+ '     <li><center><a target="_blank" href="http://board.ikariam.es/board.php?boardid=16&sid=a3a75ddb524d7638effd309fc9b9311e" title="Foro Oficial, Mundo Alpha">Foro Oficial</a></li>'
+ '     <li><center><a target="_blank" href="http://support.ikariam.es/" target="_blank" onClick="window.open(this.href, this.target, \'width=760,height=735\'); return false;" title="Reportar a u GO">Envia un Ticket</a></li>'
+ '     <li><center><a target="_blank" href="http://userscripts.org/scripts/search?q=ikariam" title="Scripts">Buscar Scripts</a></li>'
+ '   </ul>'
+ ' </li>'
+'</ul>';
+'</DIV>';

break;
}
}

}

unsafeWindow.calculateDefLvl = function(){

var wl = document.getElementById('walllvl').value;
var cl = document.getElementById('citylvl').value;
var percdef = null;
if  (isNaN(parseInt(wl)) || isNaN(parseInt(cl))) {alert ('Inserire valori numerici!');document.getElementById('percDef').innerHTML =''}
 
 else {
 percdef = Math.floor(((parseInt(wl)*10)/parseInt(cl))*parseInt(wl));
 document.getElementById('percDef').innerHTML = '<B>'+percdef+' %</B>';
 }  
 
}

unsafeWindow.showTools = function(){
var toolID = arguments;
var elemToShow = null;
for (var i = 0; i < arguments.length; i++) {
elemToShow = document.getElementById(MSKToolsIds[toolID[i]]);

if (elemToShow) {
 if ((toolID[i] == 0) || (toolID[i] == 1)) {if (document.getElementById(MSKToolsIds[0]).style.visibility == 'hidden') {
 document.getElementById(MSKToolsIds[0]).style.visibility = 'visible';
 document.getElementById(MSKToolsIds[1]).style.visibility = 'visible';
 if (document.getElementById('c'+MSKToolsIds[0])) document.getElementById('c'+MSKToolsIds[0]).style.visibility='visible';
 } else {
 document.getElementById(MSKToolsIds[0]).style.visibility = 'hidden';
 document.getElementById(MSKToolsIds[1]).style.visibility = 'hidden';
 if (document.getElementById('c'+MSKToolsIds[0])) document.getElementById('c'+MSKToolsIds[0]).style.visibility='hidden';
 }  } else {
 if (elemToShow.style.visibility == 'hidden') {elemToShow.style.visibility = 'visible'; if (document.getElementById('c'+MSKToolsIds[toolID[i]])) document.getElementById('c'+MSKToolsIds[toolID[i]]).style.visibility='visible';}
 else {elemToShow.style.visibility = 'hidden'; if (document.getElementById('c'+MSKToolsIds[toolID[i]])) document.getElementById('c'+MSKToolsIds[toolID[i]]).style.visibility='hidden';}
 }
}
}
}
unsafeWindow.showHide = function(fID){
var elemToShow = document.getElementById(fID);
var elemTrigger = document.getElementById(MSKToolsIds[0]);
if (elemToShow.style.visibility == 'hidden') {elemToShow.style.visibility = 'visible'; elemTrigger.innerHTML='<<';}
 else {elemToShow.style.visibility = 'hidden'; elemTrigger.innerHTML='>>';}
}



function initFontSelects(){
var fontBoxHTML = '<TABLE style="border-collapse:collapse;"><TR><TD><b><a id="opclos" class="button" href="#" style="visibility: hidden; color: black; padding: 3px; margin-left: -20px;" onclick="showHide(\'FontForm\');"><<</a></b></TD><TD valign = "middle" id = "FontForm" style="visibility: hidden; "><DIV style="background: url(\'http://image.forumfree.it/3/1/3/7/3/2/3/1210841391.jpg\') repeat-x center left RGB(253,247,221); height: 20px; border: double 3px RGB(228,184,115); padding:4px; valign: middle;"><b>Family:</b><select id="Family">'
 +'<option selected>Arial</option>'
 +'<option>Courier</option>'
 +'<option>Comic Sans MS</option>'
 +'<option>Georgia</option>'
 +'<option>Times New Roman</option>'
 +'<option>Verdana</option>'
+'</select>'
+'<b>Size:</b>'
+'<select id="Size">'
 +'<option>8pt</option>'
 +'<option>9pt</option>'
 +'<option selected>10pt</option>'
 +'<option>12pt</option>'
 +'<option>14pt</option>'
+'</select>'
+'<b>Color:</b>'
+'<select id="Color">'
 +'<option selected>Black</option>'
 +'<option>Blue</option>'
 +'<option>Brown</option>'
 +'<option>Green</option>'
 +'<option>Orange</option>'
 +'<option>Red</option>'
+'</select>'
+'<input type="button" class="button" style="margin-top:-25px;margin-left:370px;" value="Cambia" onclick="setFontIka()"/><input type="button" class="button" style="margin-top:-37px;margin-left:530px;" value="Ripristina" onclick="clearFont()"/></DIV></TD></TR></TABLE>';
var changeFontNode;

var refIkaNode = document.getElementById('GF_toolbar');
if (refIkaNode) {
   changeFontNode = document.createElement('DIV');
         changeFontNode.setAttribute('id', 'CFBox');
         changeFontNode.setAttribute('align', 'left');
         changeFontNode.setAttribute('style', 'margin-left:35px;margin-top:-5px;');
   //refIkaNode.parentNode.insertBefore(changeFontNode,refIkaNode);
   refIkaNode.appendChild(changeFontNode,refIkaNode);
}
document.getElementById("CFBox").innerHTML = fontBoxHTML;

}
function initDef(){
var buscaBoxHTML =
'<DIV style="vertical-align: middle; text-align:center; margin-bottom: 10px; height: 20px; background: RGB(228,184,115);"><B>Buscador de Jugadores</B>'+
'<li><a href="#"onclick="showTools(2)"><font color="#000000">Cerrar</font></a></li>'+
'</Div>'+
'<form method="post" action="http://ikariam.ogame-world.com/es/suche.php?view=suche_stadt&land_i=15" target="_blank"><div>'+
'  <input type="hidden" name="land" value="es"></font></p>'+
'  <input type="hidden" name="welt" value="1"></font></p>'+
'  <input type="hidden" name="wunder" value="0"></font></p>'+
'  <input type="hidden" name="asc_desc_i" value="0"></font></p>'+
'  <input type="hidden" name="asc_desc_2_i" value="0"></font></p>'+
'  <input type="hidden" name="sortierung_i" value="0"></font></p>'+
'  <input type="hidden" name="sortierung_2_i" value="0"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Jugador: </font><font size="1" face="Arial"> <input type="text" name="spieler" size="20"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Ciudad: </font><font size="1" face="Arial"> <input type="text" name="stadt" size="20"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Alianza: </font><font size="1" face="Arial"> <input type="text" name="allianz" size="20"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Isla: </font><font size="1" face="Arial"> <input type="text" name="insel_name" size="20"></font></p>'+
'  <font face="Arial" size="1"><input type="submit" value="Buscar" name="B1"></font>'+
'</form>'+
'</DIV></TD></TR>'+
'<p><font face="Arial" size="1" color="#FF0000">No es necesario rellenar todos los datos</font></p>'+
'<a target="_blank" href=""><font color="#0000FF"></a></font>';

var buscaBoxNode;
var refIkaNode = document.getElementById('GF_toolbar');
if (refIkaNode) {
   buscaBoxNode = document.createElement('DIV');
         buscaBoxNode.setAttribute('id', 'buscaBox');
         buscaBoxNode.setAttribute('align', 'center');
         buscaBoxNode.setAttribute('style', 'visibility: hidden; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 250px; height:165px; position: absolute; z-index: 500; left:720px; top:150px;');
 
   refIkaNode.appendChild(buscaBoxNode,refIkaNode);
}

document.getElementById("buscaBox").innerHTML = buscaBoxHTML;

}
addAstraToolsMenu();

initFontSelects();

initFont();
initDef();
