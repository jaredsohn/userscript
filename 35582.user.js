// ==UserScript==
// @name           AcS
// @description    conjunto de Scripts reunidos y Adaptados por Snipercorsario
// @include        http://*.ikariam.*/*
// @include        http://*ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==



//--------------------------------------------------------------PUNTUACIONES-----------------------------------------------



/*
The startup functions and global variables.
Original Author: ImmortalNights & wphilipw
For version: 0.3.0
Last changed: 0.6.0
*/

var show = { gold: 4, military: 2, total: 1 };
var post = {
    total: "score",
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
    addEventListener("keypress", keyboard, true);
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

function cacheValue(id, type, value) {
  //console.log("caching", id, type, value);
  var city = valueCache[id] || {};
  type = type.charAt();
  city[type] = number(value);
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

function keyboard(e) {
  function invoke(a) {
    a = $X('id("actions")/ul[@class="cityactions"]/li[@class="'+ a +'"]/a');
    return function() { if (a && a.href) location.href = a.href; };
  }
  function counterClockwise() { focus(-1); }
  function clockwise() { focus(1); }
  function tab() {
    if (!e.altKey && !e.ctrlKey && !e.metaKey)
      focus(e.shiftKey ? -1 : 1);
  }

  var keys = {
    "\t": tab, j: counterClockwise, k: clockwise,
    d: invoke("diplomacy"), t: invoke("transport"),
    p: invoke("plunder"), b: invoke("blockade"), s: invoke("espionage")
  };

  var action = keys[String.fromCharCode(e.keyCode || e.charCode)];
  if (action) {
    e.stopPropagation();
    e.preventDefault();
    action();
  }
}

function fetchScoresFor(name, ul, n, id) {
  function searchbutton(type) {
    var url = "url(/skin/" + ({
       total: "layout/medallie32x32_gold.gif) no-repeat -7px -9px",
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
      title="Zmień sposób wyświetlania">Cambiar Opciones</a>;

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
    if ("gold" == type && isMyCity(ul) && viewingRightCity(ul)) {
      var gold = $("value_gold").innerHTML;
      updateItem(type, gold, cityinfoPanel(), null, lootable(gold));
      continue;
    }
    addItem(type, "Cargando...");
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
  max = node("span", "", null, "\xA0("+ fmtNumber(max) +"\)");
  max.title = "Ilość złota do zrabowania z tego miasta";
  return max;
}

function viewingRightCity(ul) {
  return itemValue("name") == itemValue("name", ul) &&
        itemValue("owner") == itemValue("owner", ul);
}

function makeShowScoreCallback(name, type, ul, n, id) {
  return function showScore(xhr, cached) {
    var score = xhr;
    if ("yes" == cached) {
      score = fmtNumber(score);
    } else { // need to parse out the score
      score = $X('.//div[@class="content"]//tr[td[@class="name"]="' +
                 name + '"]/td[@class="score" or @class="§"]',
                 node("div", "", null, xhr.responseText));
      score = score.innerHTML;
    }
    if (score) {
      if ("yes" != cached) cacheValue(id, type, score);

      ul = ul || cityinfoPanel();
      if (n && "0" == score && "military" == type) {
        n.style.fontWeight = "bold"; // n.style.fontStyle = "italic";
        n = $X('../preceding-sibling::div[@class="cityimg"]', n);
        if (n)
          n.style.backgroundImage = getComputedStyle(n,"").
            backgroundImage.replace("red.gif", "yellow.gif");
      }

      // You rob gold (size * (size - 1)) % of the treasury of the city:
      if ("gold" == type)
        var max = lootable(score, ul);

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
  } else {
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
    return onload(cached[key], "yes");
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

/*
runs on first run to set up default values
Original Author: ImmortalNights
For version: 0.5.4
Last changed: 0.6.0
*/

function displayOnOptions_fn() {
  var mybox = node("div", "", { textAlign: "left" });
  var opts = <>
<h3>Mostrar Puntos</h3>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td style="width: 43%; text-align: right;">Mostrar P. Total:</td>
    <td style="width: 57%"><input type="checkbox" id="totalScore"/></td>
  </tr>
  <tr>
    <td style="width:43%; text-align: right">Mostrar P. Militar:</td>
    <td><input type="checkbox" id="militaryScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Mostrar Oro:</td>
    <td><input type="checkbox" id="goldScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Mostrar Puntuaciones:</td>
    <td><input type="checkbox" id="inlineScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Mostrar Opciones:</td>
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

/*
This function saves the options chosen above
Original Author: wphilipw
For version: 0.4.5
Last changed: 0.6.0
*/

function changeShow_fn(e) {
  GM_setValue("show", (
                (show.total * $('totalScore').checked) |
                (show.military * $('militaryScore').checked) |
                (show.gold * $('goldScore').checked)
              ) + "");
  GM_setValue("inline", $('inlineScore').checked);
  GM_setValue("link", $('changeScoreOptions').checked);
  e.target.form.submit();
}

// Function to open/close the frame
unsafeWindow.flToggleFrame = function(nr){
	
	if(nr == 1){
		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader" onClick="flToggleFrame(0);">Friendlist</div>';
		document.getElementById("flContent").style.display = 'block';
		document.getElementById("flFooter").style.display = 'block';
		document.getElementById("flBox").style.height = '440px';
		document.getElementById("flBox").style.width = '150px';
		document.getElementById("flBox").style.margin = '-189px 29px -18px 821px';
	}
	else{
		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader2" onMouseOver="flToggleFrame(1);"></div>';
		document.getElementById("flContent").style.display = 'none';
		document.getElementById("flFooter").style.display = 'none';
		document.getElementById("flBox").style.height = '29px';
		document.getElementById("flBox").style.width = '29px';
		document.getElementById("flBox").style.margin = '-189px 29px -18px 945px';
	}
	
};

// Function to add the current URL to the Link Field
unsafeWindow.flInsertCurrentURL = function(){
	
	var flNewLink = document.getElementById("flNewLink");
	var flCurrentURL = window.document.location;
	
	return flNewLink.value = flCurrentURL;
	
};

// Export function
unsafeWindow.flExport = function(){
	
	if(IkariamFriendList == "0"){
		return alert("No friends in the list.");
	}
	
	prompt('Copy this string into the import field.', IkariamFriendList);
	
}

// Import function
unsafeWindow.flImport = function(){
	var flImportValue = prompt('Paste the string into the field below. As of now an corrupted string can get through. Be sure to only import a string that comes from this extension.');
	
	if(flImportValue){
		if(IkariamFriendList == "0"){
			NewFriendListContent = flImportValue;
		}
		else{
			NewFriendListContent = IkariamFriendList + flImportValue;
		}
		window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
		alert("String accepted");
		return window.location.reload();
	}else{
		return alert("Please import a valid string.");
	}
	
	return false;
}

// Time to build the Friendlist in HTML
var flHTML = '';
var CurrentIkariamFriendList = '';

if(IkariamFriendList == "0"){
	
	flHTML += '<center>No friends in the list.</center>';

}
else{
	
	// Slice the last ; of the list
	CurrentIkariamFriendList = IkariamFriendList.slice(0, -1);
	// Split the long string up
	CurrentIkariamFriendList = CurrentIkariamFriendList.split(';');
	// And sort it alphabetical
	CurrentIkariamFriendList.sort();
	
	var IkariamFriend = '';
	
	flHTML += '<ul id="flList">';
	
	for(i=0;i<=CurrentIkariamFriendList.length-1;i++){
		
		IkariamFriend = CurrentIkariamFriendList[i];
		
		// Split every piece to get the name and link
		IkariamFriend = IkariamFriend.split('|');
		
		flFriendName = IkariamFriend[0];
		flFriendLink = IkariamFriend[1];
		
		flHTML += '<li><a href="' + flFriendLink + '">' + flFriendName + '</a> <a href="javascript:flDeleteFriend(\'' + flFriendName + '\', \'' + flFriendLink + '\');"><img src="http://img153.imageshack.us/img153/9549/iconquickdeletech1.gif"></a></li>';
		
	}
	
	flHTML += '</ul>';
}

// Add the HTML for the adding friends part
flHTML += '<div style="text-align:center;"><hr>Add Friend<br><input type="text" name="flNewName" id="flNewName" value="Name" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><p><a onClick="javascript:flInsertCurrentURL();" style="font-size: 9px; cursor: pointer;">Use current website URL</a></p><input type="text" name="flNewLink" id="flNewLink" value="URL" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><br /><br /><a href="javascript:flAddFriend();" class="button">&nbsp;&nbsp;&nbsp;Add&nbsp;&nbsp;&nbsp;</a><br><p style="padding-top: 8px;"><a href="javascript:flExport();" class="flSmall" style="font-size: 10px;">Export</a> | <a href="javascript:flImport();" class="flSmall" style="font-size: 10px;">Import</a></p></div>';

// And now its time to place it in the right position, before the 'mainview' (playfield) div that is
var main, newElement;
main = document.getElementById('mainview');
if (main) {
    newElement = document.createElement('div');
	newElement.setAttribute('id', 'flBox');
    main.parentNode.insertBefore(newElement, main);
}

// And finally put layout + friendlist HTML in it all together, we're done :)
document.getElementById("flBox").innerHTML = '<div id="flButtonArea"><div id="flHeader2" onMouseOver="flToggleFrame(1);"></div></div><div id="flContent">' + flHTML + '</div><div id="flFooter"></div>';


//---------------------------------------------------------SHOUTBOX---------------------------------------------------------

//AlHaNoS

//



var version="0.15";

var displayedflag = 0;



unsafeWindow.displayshout = function() {

	if(displayedflag == 0) {

		document.getElementById("shoutframe").innerHTML = '<iframe width="208" border="0" frameborder="0" height="100%" src="http://xat.com/web_gear/chat/go_large.php?id=51017694" style="margin-left:0px;"></iframe>';

		displayedflag = 1;

	}

}




unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";

}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-216px";	

}





vshoutbar = document.createElement("div");

vshoutbar.setAttribute("id", "shoutbar");



var body = document.getElementsByTagName("body");



body[0].appendChild(vshoutbar);




document.getElementById("shoutbar").innerHTML ='<div id="shouttab" ondblclick="showshout()" onclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'

	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img444.imageshack.us/img444/7013/backshoutsv0.png);background-repeat:no-repeat;">'

	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" target="_blank" href="http://s4.ikariam.es/index.php?view=allyPage&allyId=7&oldView=island&id=981">Chat Los Apocalypticos</a></div>'

	+ '<div id="shoutframe" style="position:absolute;top:30px;bottom:3px;righ:4px;" onmouseover="displayshout()">Mouse over this area to load the shoutbox</div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://img403.imageshack.us/img403/5998/shoutbarbgbotly1.gif);background-repeat:no-repeat;"></div>';



GM_addStyle("#shoutbar { background:url(http://img179.imageshack.us/img179/8825/shoutbarbgmideu5.gif); padding-top:33px; width:210px; position:fixed; left:-216px; top:-4px; bottom:150px; border:1px black solid; z-index:50;");

GM_addStyle("#shouttab { background:url(http://img392.imageshack.us/img392/3536/apocalipticosno3.jpg); width:29px; height:100px; position:absolute; right:-30px; top:15px; } ");

GM_addStyle("#shouttab:click { left: 0px; } ");


//------------------------------------------------------------ENLACES-------------------------------------------------------



var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:700px;'+
'margin-top: -16.5px;'+
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
//questa funzione Ã¨ quasi standard, usata in molti script greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
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
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>Menú Apocalypticos</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="http://s4.ikariam.es/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=2154&position=9&type=50" title="Enviar un mensaje a todos los miembros de la alianza">Mensaje Circular</a></li>'
+ '     <li><center><a target="_blank" href="http://apocalypticos.foro-juegos.es/foro/" title=" Foro de Apocalypticos ">Foro Apocalypticos</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batallas para publicar en el foro ">Compactador de batallas</a></li>'
+ '	  <li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Simular el resultado de una batalla">Simulador de batallas</a></li>'
+ '     <li><center><a target="_blank" href="http://almogavares.890m.com/index.php?page=unitcalc" title=" Calcula las unidades y sus respectivas manutenciones ">Calculador de unidades</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_spieler" title=" Busca las ciudades y coordenadas en las que se encuentra un jugador ">Buscador de jugadores</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_insel" title=" Busca las coordenadas de una isla ">Buscador de islas</a></li>'
+ '     <li><center><a target="_blank" href="http://s4.ikariam.es/index.php?view=sendMessage&oldView=diplomacyAdvisor&receiverName=Laiaxan IV" title=" Comunicarte con Laiaxan IV ">Hablar con el Lider</a></li>'
+ '     <li><center><a target="_blank" href="http://s4.ikariam.es/index.php?view=sendMessage&oldView=diplomacyAdvisor&receiverName=kumita" title=" Comunicarte con Kumita ">Hablar con el Diplomático</a></li>'
+ '     <li><center><a target="_blank" href="http://s4.ikariam.es/index.php?view=sendMessage&oldView=diplomacyAdvisor&receiverName=ego" title=" Comunicarte con EGO ">Hablar con el Ministro de Interior</a></li>'
+ '     <li><center><a target="_blank" href="http://s4.ikariam.es/index.php?view=sendMessage&oldView=diplomacyAdvisor&receiverName=Tsuke" title=" Comunicarte con Tsuke ">Hablar con el General</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();