// ==UserScript==
// @author         domz
// @name           BYBS Keyboard Shortcuts
// @namespace      domz
// @description    domz shortcut
// @version        1.0
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/
// @unwrap
// ==/UserScript==

// This script adds a feature to Ikariam for use keyboard shortcut to change the city
// Based on Kronos Utils 0.6 by Oyasumi

init();

function init() {
  addEventListener("keyup", cityByNumber, false);
}

function cityByNumber(e) {
  if (notMyEvent(e)) return;
  var li = $x('id("changeCityForm")//*[contains(@class,"citySelect")]/ul/li');
  var sel = $X('id("citySelect")');
  var curCity = sel.selectedIndex;
  var key = integer(String.fromCharCode(e.keyCode));
  if (!e.altKey && !e.shiftKey) {
	if (isNaN(key)) {
      switch (String.fromCharCode(e.keyCode)) {
        case 'W': return location.search = url("?view=worldmap_iso");
        case 'I': return location.href = $X('id("changeCityForm")//ul/li[@class="viewIsland"]/a');
        case 'C': return location.search = url("?view=city&id=" + sel[curCity].value);
        case 'H': return location.href = getBuildingUrl("townHall");
        case 'P': return location.href = getBuildingUrl("port");
        case 'S': return location.href = getBuildingUrl("shipyard");
        case 'G': return location.href = getBuildingUrl("safehouse");
        case 'T': return location.href = getBuildingUrl("tavern");
        case 'B': return location.href = getBuildingUrl("barracks");
        case 'A': return location.href = getBuildingUrl("academy");
        case 'L': return location.href = getBuildingUrl("palace");
        case 'D': return location.href = getBuildingUrl("wall");
        case 'O': return location.href = getBuildingUrl("palaceColony");
        case 'R': return location.href = getBuildingUrl("warehouse");
        case 'F': return location.href = getBuildingUrl("forester");
        case 'M': return location.href = getBuildingUrl("museum");
        case 'Q': return location.href = getBuildingUrl("carpentering");
        case 'Z': return location.href = getBuildingUrl("winegrower");
        case 'X': return location.href = getBuildingUrl("stonemason"); 
        case 'V': return location.href = getBuildingUrl("glassblowing");
        case 'U': return location.href = getBuildingUrl("workshop");
        case 'Y': return location.href = getBuildingUrl("embassy");
      }
    } else {
	  var n = (key || 14) - 1;
	  var id = cityIDs()[n];
      li = li[n];
	  li && click(li);
	}
  }
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
}

function isString(s) { return "string" == typeof s; }
function isNumber(n) { return "number" == typeof n; }
function isObject(o) { return "object" == typeof o; }
function integer(n) {
  if (isNumber(n)) return n;
  if (isObject(n))
    if (/input/i.test(n.nodeName||""))
      n = n.value;
    else if (n.textContent)
      n = n.textContent;
  if (isString(n))
    n = n.replace(/k\s*$/, "000").replace(/[^\d-]+/g, "");
  return n ? parseInt(n, 10) : undefined;
}

function notMyEvent(e) {
  var on = e.target, name = on && on.nodeName;
  return /^(input|textarea)$/i.test(name||"") && // was the focused element a
         !/radio|checkbox/i.test(on.type||"");   // text field of some sort?
}

function cityIDs() {
  return pluck($x('id("citySelect")/option'), "value").map(integer);
}

function pluck(a, prop) {
  return a.map(function(i) { return i[prop]; });
}

function url(query) {
  return (location.search || "").replace(/([#?].*)?$/, query||"");
}

function getBuildingUrl(n) {
  return $X('id("mainview")/ul/li[@class="' + n + '"]/a');
}

// list nodes matching this expression, optionally relative to the node `root'
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
				result.push(next);
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}