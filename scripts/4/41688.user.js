//
// version 0.6.6
// 2008-04-05
// Copyright (c) 2008
// Original Script by: ImmortalNights
// Special Enhancements: wphilipw, ecamanaut
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 2008-07-05
// Modified by: Sevensins
//
// Modification: Starting in Ikariam v.0.2.6, military scores were divided by 100. This modified script
//			simply mulitplies back by 100 so the scores look like "normal."
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IkariamScoreLinker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.3.0: Original Public Release
// ==================================================
// 0.4.0: Island View & Bugfixes
// 0.4.1: Description change, Generals Version update
// 0.4.5: Bugfixes, Script combination (versions)
// 0.4.6: Changed the image sizes to 16x16
// 0.4.7: Implemented 'checkAlreadyShown' to prevent the icon displaying multiple times
// ==================================================
// 0.5.0: Inline Score Display Option (AJAX)
// 0.5.2: Defaults of text inline now set. Icons and text have headers. Options link always shown
// 0.5.3: Code clean up, Money Score option & Options dialog
// 0.5.4: Previous score details are saved, so that they are not updated if the same town is viewed.
// 0.5.5: BugFix for multiple scores + timeout for saved scores (10min)
// 0.5.6: BugFix: "undefined" scores (timestamp too long, now stored in string)
// 0.5.7: Options on Options page, no longer inline
// ==================================================
// 0.6.0: Saves scores in the page after loading them once. Code cleanup. Does not try to run on the forums.
// 0.6.1: Shows max lootable gold, according to a formula by Lirave. Keyboard selection via (shift)tab, or j/k.
// 0.6.2: Removed the 'Change Options' link and the 'loot:' prefix on lootable gold.
// 0.6.3: Made the 'Change Options' link configurable. Bugfixed non-inline links. (And loot is back; sorry. ;-)
// 0.6.4: Bugfix for confusion when Kronos Utils adds info to the town size field. Also made sure Gold Scores don't wrap even if their contents get long.
// 0.6.5: Paints demilitarized (but neither allied nor your own) cities yellow.
// 0.6.6: Added some more key bindings: d/t/p/b/s, for all(?) the city actions.
//
// --------------------------------------------------------------------
//
// This script places an icon to the right of a players
// name after selecting their town on the Island overview,
// or when viewing their Town. This icon links the user to
// the scoreboard, where you can see the players score.
//
// Feel free to have a go yourself; as long as you leave
// a little credit, and of course publish for the players
// of Ikariam!
//
// This script was originally created by ImmortalNights,
// and further edited and enhanced by wphilipw and ecmanaut.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           IkariamScoreLinker
// @namespace      ikariamScript
// @description    Adds a link to the Scoreboard besides a players name after selecting their town on the Island Overview or when viewing their Town.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

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
    if ("gold" == type && isMyCity(ul) && viewingRightCity(ul)) {
      var gold = $("value_gold").innerHTML;
      updateItem(type, gold, cityinfoPanel(), null, lootable(gold));
      continue;
    }
    addItem(type, "fetching...");
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
  max.title = "Amount of gold lootable from this town";
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
	if ( type == "military" )
	{
		value = parseInt((value||"").replace(/\D+/g, "") || "0", 10);
		value *= 100;
		value = fmtNumber(value);
	}

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
	if ( type == "military" && ul != null)
	{
		value = parseInt((value||"").replace(/\D+/g, "") || "0", 10);
		value *= 100;
		value = fmtNumber(value);
	}
	
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
<h3>Score Display Options</h3>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td style="width: 43%; text-align: right;">Show Total Score:</td>
    <td style="width: 57%"><input type="checkbox" id="totalScore"/></td>
  </tr>
  <tr>
    <td style="width:43%; text-align: right">Show Army Score:</td>
    <td><input type="checkbox" id="militaryScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Show Gold Score:</td>
    <td><input type="checkbox" id="goldScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Show Score Inline:</td>
    <td><input type="checkbox" id="inlineScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Show Score Options link:</td>
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
