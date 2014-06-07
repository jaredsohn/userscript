// ==UserScript==
// @name                        Kronos suport
// @namespace                   Lord Script
// @description                 Based on Kronos.
// @author                      Lord1982
// ==/UserScript==


// Various support functions
revision("$Revision$");

XML.setSettings({
  ignoreProcessingInstructions: false,
  ignoreWhitespace: false,
  ignoreComments: false,
  prettyPrinting: false, prettyIndent: 2
});

function revision(r) {
  if (r) rev = Math.max(integer(r), rev || 0);
  return rev;
}

function isNull(n) { return null === n; }
function isArray(a) { return isObject(a) && isNumber(a.length); }
function isString(s) { return "string" == typeof s; }
function isNumber(n) { return "number" == typeof n; }
function isObject(o) { return "object" == typeof o; }
function isBoolean(b) { return "boolean" == typeof b; }
function isDefined(v) { return "undefined" != typeof v; }
function isFunction(f) { return "function" == typeof f; }
function isUndefined(u) { return "undefined" == typeof u; }
function isTextNode(n) { return isObject(n) && n.nodeType == 3; }
function stringOrUndefined(what) {
  return { undefined: 1, string: 1 }[typeof what] || 0;
}

function array(a) { return isArray(a) ? a : [a]; }

function reduce(func, a, last){
  switch (a.length) {
    case 0: return last;
    case 1: return func(last, a[0]);
    case 2: return func(a[0], a[1]);
  }
  last = a[0];
  for (var i = 1; i < a.length; i++)
    last = func(last, a[i]);
  return last;
}

function copy(object) {
  // Doug Crockford
  var fn = function() {};
  fn.prototype = object;
  return new fn;
}

function copyObject(o) {
  var copy = {};
  for (var n in o)
    copy[n] = o;
  return copy;
}

function bind(fn, self) {
  var args = [].slice.call(arguments, 2);
  return function() {
    fn.apply(self, args.concat([].slice.call(arguments)));
  };
}

function parseDate(t) {
  var Y, M, D, h, m, s = 0, now;
  if ((t = t && trim(t.textContent).split(/\D+/))) {
    if (4 == t.length) { // Military view
      [D, M, h, m] = t.map(integer);
      now = new Date;
      Y = now.getFullYear();
    } else { // merchantnavyView, for instance
      [D, M, Y, h, m, s] = t.map(integer);
    }
    t = new Date(Y, M - 1, D, h, m, s);
    if (now && t > now) // assume guessed-year dates are never in the future
      t = new Date(Y-1, M - 1, D, h, m, s);
    return t.getTime();
  }
}

function formatNumber(n, signed) {
  var res = signed ? sign(n)[0] : n < 0 ? "-" : "";
  var dec = { ",":".", ".":"," }[locale.thousandSeperator], junk, decimals;
  n = Math.abs(Math.round(100 * n)/100).toString();
  [junk, n, decimals] = /(\d*)(\..*)?/.exec(n);
  for (var i = n.length; (i -= 3) > 0;)
    n = n.slice(0, i) + locale.thousandSeperator + n.slice(i);
  if (decimals) decimals = dec + decimals.slice(1);
  return res + n + (decimals||"");
}

function compare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function addClass(node, className) {
  var classes = (node.className || "").split(/\s+/g);
  if (classes.indexOf(className) > 0) return;
  if (classes[0] == "")
    classes = [className];
  else
    classes.push(className);
  node.className = classes.join(" ");
}

function gcs(node, prop) {
  var cs = getComputedStyle(node, "");
  return isDefined(prop) ? cs[prop] : cs;
}

// returns a function that only runs expensive function fn after no call to it
// has been made for n ms, or 100, if not given, or the time fn took last time,
// if it has been run at least once and no n was given.
function expensive(fn, n) {
  function run() {
    fn.timeout = null;
    var time = n || new Date;
    fn();
    if (!n) duration = (new Date) - time;
  }
  var duration;
  return function() {
    if (fn.timeout)
      clearTimeout(fn.timeout);
    fn.timeout = setTimeout(run, n || duration || 100);
  };
}

function addMeta(name, content) {
  var meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  return document.documentElement.firstChild.appendChild(meta);
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function pluck(a, prop) {
  return a.map(function(i) { return i[prop]; });
}

function I(i) { return i; }

function rm(node) {
  return node && node.parentNode && node.parentNode.removeChild(node);
}

function toggle(node) {
  if (node)
    return node.style.display = !node.style.display ? "none" : "";
}

function hide(node) {
  if (node) return node.style.display = "none";
}

function show(node) {
  if (node) return node.style.display = "block";
}

function makeQuery(o) {
  var q = [];
  for (var i in o)
    q.push(encodeURIComponent(i) +"="+ encodeURIComponent(o[i]));
  return q.join("&");
}

function css(rules, disabled) {
  var head = document.documentElement.firstChild;
  var style = document.createElement("style");
  style.type = "text/css";
  style.textContent = isString(rules) ? rules : rules.toString();
  if (isBoolean(disabled))
    style.disabled = disabled;
  return head && head.appendChild(style);
}


function urlParse(param, url) {
  if (!url) url = location.search || "";
  var keys = {};
  url.replace(/([^=&?]+)=([^&#]*)/g, function(m, key, value) {
    keys[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return (param ? keys[param] : keys) ||
    "view" == param && document.body.id;
}

function number(n) {
  if (isNumber(n)) return n;
  if (isObject(n))
    if (/input/i.test(n.nodeName||""))
      n = n.value;
    else if (n.textContent)
      n = n.textContent;
  n = n.replace(/[^\d.-]+/g, "");
  return n ? parseFloat(n) : undefined;
}

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

function sign(n) {
  if ("undefined" == typeof n) n = 0;
  return (n > 0 ? "+" : n == 0 ? "±" : "") + n;
}

function nth(n) {
  var th = [, "st", "nd", "rd"];
  return n + (th[n] || "th");
}

function $(id) {
  return document.getElementById(id);
}

function gameVersion() {
  var v = $X('id("GF_toolbar")//li[@class="version"]/a/span');
  return v && v.textContent.replace(/[^\d.]/g, "").replace(/^\./, "");
}

var expandos = { id: 1, className: 1, title: 1, type: 1, checked: 1 };

function node(opt) {
  function attr(name) {
    var value = opt[name];
    delete opt[name];
    return value;
  }
  var id = opt.id;
  var n = $(id);
  if (!n) {
    var tag = attr("tag") || "div";
    if (isString(tag))
      n = document.createElement(tag);
    else if (!tag.toXMLString)
      n = tag;
    else {
      var t = document.createElement("div");
      t.innerHTML = tag.toXMLString();

      var ids = {};
      for each (var n in $x('.//*[@id]', t))
        ids[n.id] = 1;
      if (!n) ids = null;

      var r = document.createRange();
      r.selectNodeContents(t);
      n = r.extractContents();
      if (n.childNodes.length == 1)
        n = n.firstChild;
    }
    var after = attr("after"), replace = attr("replace");
    var before = opt.prepend ? opt.prepend.firstChild : attr("before");
    var parent = attr("prepend") || attr("append") ||
                   (before || after || replace || {}).parentNode;
    if (parent) {
      if (before)
        parent.insertBefore(n, before);
      else if (after)
        parent.insertBefore(n, after.nextSibling);
      else if (replace)
        parent.replaceChild(n, replace);
      else
        parent.appendChild(n);
    }
    if (id) n.id = id;
  }
  var html = attr("html");
  if (isDefined(html)) n.innerHTML = html;
  var text = attr("text");
  if (isDefined(text)) n.textContent = text;
  var style = attr("style");
  if (style)
    for (var prop in style)
      n.style[prop] = style[prop];
  for (prop in opt)
    if (expandos[prop])
      n[prop] = opt[prop];
    else
      n.setAttribute(prop, opt[prop]+"");
  if (ids)
    for (var id in ids)
      ids[id] = $(id);
  return ids || n;
}



// Handling page elements

var xpath = {
  ship: 'id("globalResources")/ul/li[@class="transporters"]/a',
  citynames: 'id("changeCityForm")//ul[contains(@class,"optionList")]/li'
};

(function() {
  function add(fmt) { // batch adds similar-format entries to the xpath object
    for (var i = 1; i < arguments.length; i++) {
      var id = arguments[i];
      xpath[id] = fmt.replace("%s", id);
    }
  }

  add('id("value_%s")', "wood", "wine", "marble", "crystal", "sulfur");
})();

function get(what, context) {
  var many = { citynames: 1 };
  var func = many[what] ? $x : $X;
  return what in xpath ? func(xpath[what], context) : undefined;
}



function getServerTime(offset) {
  var Y, M, D, h, m, s, t;
  [D, M, Y, h, m, s] = $("servertime").textContent.split(/[. :]+/g);
  t = new Date(Y, parseInt(M, 10)-1, D, h, m, s);
  return offset ? new Date(t.valueOf() + offset*1e3) : t;
}

// input: s, bool; output: time or date+time
function resolveTime(seconds, timeonly) { // Crée le temps de fin.
  function z(t) { return (t < 10 ? "0" : "") + t; }
  var t0 = unsafeWindow.startTime || // 0.2.7 (and earlier)
    integer(unsafeWindow.updateServerTime.toSource()); // 0.2.8 (onwards?)
  var t = getServerTime(seconds - (t0 - unsafeWindow.startServerTime) / 1e3);
  var d = "", now = (new Date);
  if (t.getDate() != now.getDate() ||
      t.getMonth() != now.getMonth()) {
    var m = lang.months[t.getMonth()];
    d = t.getDate() +" "+ m.slice(0, 3);
    if (2 == timeonly) return d;
    d += ", ";
  }
  var h = z(t.getHours());
  var m = z(t.getMinutes());
  var s = z(t.getSeconds());
  t = d + h + ":" + m + ":" + s;
  return timeonly ? t : lang.finished + t;
}

function secondsToHours(bySeconds) {
  return isNaN(bySeconds) ? 0 : Math.round(bySeconds * 3600);
}

var locale = unsafeWindow.LocalizationStrings;
var units = { day: 86400, hour: 3600, minute: 60, second: 1 };

// input: "Nd Nh Nm Ns", output: number of seconds left
function parseTime(t) {
  function parse(what, mult) {
    var count = t.match(new RegExp("(\\d+)" + locale.timeunits.short[what]));
    if (count)
      return parseInt(count[1], 10) * mult;
    return 0;
  }
  var s = 0;
  for (var unit in units)
    s += parse(unit, units[unit]);
  return s;
}

function secsToDHMS(t, rough, join) {
  if (t == Infinity) return "∞";
  var result = [];
  var minus = t < 0 ? "-" : "";
  if (minus)
    t = -t;
  for (var unit in units) {
    var u = locale.timeunits.short[unit];
    var n = units[unit];
    var r = t % n;
    if (r == t) continue;
    if ("undefined" == typeof rough || rough--)
      result.push(((t - r) / n) + u);
    else {
      result.push(Math.round(t / n) + u);
      break;
    }
    t = r;
  }
  return minus + result.join(join || " ");
}

function time(t) {
  var units = { day: 86400, hour: 3600, minute: 60, second: 1 };
  t = t / 1000; // ms to s
  if (t == Infinity) return "∞";
  var result = [];
  var minus = t < 0 ? "-" : "";
  if (minus)
    t = -t;
  for (var unit in units) {
    var u = unsafeWindow.LocalizationStrings.timeunits.short[unit];
    var n = units[unit];
    var r = t % n;
    if (r == t) continue;
    if ("undefined" == typeof rough || rough--)
      result.push(((t - r) / n) + u);
    else {
      result.push(Math.round(t / n) + u);
      break;
    }
    t = r;
  }
  return minus + result.join(join || " ");
}

function clickable(tag, onclick, id) {
  if (!tag.tag)
    tag.tag = <a href="#" id={ id }>&#160;</a>;
  tag = node(tag);
  if (id) tag = tag[id];
  clickTo(tag, onclick);
}

function toggler(img, callback, url, baseNode, id) {
  if (!id) {
    toggler.id = (toggler.id || 0) + 1;
    id = "toggler" + toggler.id;
  }
  var pane = $("miniPane") || node({ append: $("breadcrumbs"),
                                     tag: <div id="miniPane"/> }).miniPane;
  node({ tag: <a id={ id } href={ url || "#" }> <img src={ img }/></a>,
         append: baseNode || pane });
  clickTo($(id), callback);
}

function cssToggler(id, enabled, img, css, cb, baseNode) {
  function toggle() {
    css.disabled = config.set("default-"+id, !css.disabled);
    if (isFunction(cb)) cb(!css.disabled);
  }
  if (!isString(css)) css = css.toXMLString();
  css = node({ tag: "style", text: css,
               append: document.documentElement.firstChild });
  css.disabled = config.get("default-"+id, !enabled);
  toggler(img, toggle, "#"+id, baseNode, baseNode && id);
}

function cityHasBuilding(b) {
  b = buildingID(b);
  return function(city) { return config.getCity(["l", b], 0, city); };
}

function isleForCity(city) { return config.getCity("i", 0, city); }

function notMyEvent(e) {
  var on = e.target, name = on && on.nodeName;
  return /^(input|textarea)$/i.test(name||"") && // was the focused element a
         !/radio|checkbox/i.test(on.type||"");   // text field of some sort?
}

function cityName(id) {
  //return cityNames()[cityIDs().indexOf(integer(id))];
  var name = {};
  var ids = cityIDs();
  var names = cityNames();
  for (var i = 0; i < ids.length; i++)
    name[ids[i]] = names[i];
  console.log(name.toSource, id);
  return name[id];
}

function upgradedUnitStats(unit) {
  var att = config.getServer("techs.units."+ unit +".a", 0);
  var def = config.getServer("techs.units."+ unit +".d", 0);
  unit = troops[unit] || ships[unit];
  return { a: unit.a + att * unit.A, A: unit.A, la: att,
           d: unit.d + def * unit.D, D: unit.D, ld: def };
}

function milScoreFor(unit, count) {
  if (isNumber(unit))
    unit = troops[unit] || ships[unit];
  count = (isDefined(count) ? count : 1) / 100;
  if (serverVersionIsAtLeast("0.3.0"))
    return count * (unit.w + unit.W||0 + unit.C||0 + unit.S||0) * 2;
  return count * (2*unit.w + 16*(unit.W||0) + 4*(unit.C||0) + 4*(unit.S||0));
}

function upkeepFor(unit, count) {
  if (isNumber(unit))
    unit = troops[unit] || ships[unit];
  count = isDefined(count) ? count : 1;
  var factor = 1.0;
  if (unit.id in troops) {
    if (config.getServer("techs.4020")) factor -= 0.02; // Maps
    if (config.getServer("techs.4050")) factor -= 0.04; // Code of Honour
    if (config.getServer("techs.4090")) factor -= 0.08; // Logistics
    if (config.getServer("techs.4999")) factor -= 0.02; // Military Future
  } else {
    if (config.getServer("techs.1020")) factor -= 0.02; // Ship Maintenance
    if (config.getServer("techs.1050")) factor -= 0.04; // Pitch
    if (config.getServer("techs.1090")) factor -= 0.08; // Sea Charts
    if (config.getServer("techs.1999")) factor -= 0.02; // Seafaring Future
  }
  return count * unit.u * factor;
}

// alternative args formats: "isle", "x1, y1, isle", "isle, null, isle",
// "null, null, isle" (for mainview -> isle)
function travelTime(x1, y1, x2, y2) {
  if (arguments.length & 1) { // a city id
    var isle = x1 ? isleForCity(x1) : mainviewIslandID();
    x1 = config.getIsle("x", 0, isle);
    y1 = config.getIsle("y", 0, isle);
    //console.log("isle %x at %x:%y", isle, x1, y1);
    if (!x1 || !y1) return 0;
  }
  if (arguments.length < 4)
    if (arguments.length == 3)
      isle = x2 || mainviewIslandID();
    else
      isle = referenceIslandID();
  if (arguments.length < 4) {
    x2 = config.getIsle("x", 0, isle);
    y2 = config.getIsle("y", 0, isle);
    //console.log("to isle %x at %x:%y", isle, x2, y2);
    if (!x2 || !y2) return 0;
  }
  var dx = x2 - x1, dy = y2 - y1, v = ships[201].v;
  if (serverVersionIsAtLeast("0.3.0"))
    if (!dx && !dy) // Same island?
      return 60 * 600/v;
    else
      return 60 * 1200/v * Math.sqrt(dx*dx + dy*dy);
  else // 0.2.8 and below:
    return 60 * 400/v * (1 + Math.sqrt(dx*dx + dy*dy));
}

function serverVersion() {
  return $X('string(//li[@class="version"]//span)').replace(/^\D+|\s+/g, "");
}

function serverVersionIsAtLeast(what) {
  var ver = serverVersion().split(".").map(integer);
  what = what.split(".").map(integer);
  for (var i = 0; i < what.length; i++)
    if (ver[i] < what[i])
      return false;
  return true;
}

// quite bugged; doesn't think 0.3.0 is larger than 0.2.8, as 8 < 0
function serverVersionTest(op, than) {
  var ver = serverVersion().split(".").map(integer);
  than = than.split(".").map(integer);
  var cmp = ({
    "<":  function(a, b) { return a < b; },
    "<=": function(a, b) { return a <= b; },
    "==": function(a, b) { return a == b; },
    ">=": function(a, b) { return a >= b; },
    ">":  function(a, b) { return a > b; }
  })[op];
  var res = ver.map(function(server, i) { return cmp(server, than[i]); }), yes;
  for (var i = 0; i < than.length;) {
    if (i >= ver.length)
      return false;
    if (!cmp(ver[i], than[i]))
      return false;
    if (++i == than.length && ver.length > i)
      return op.charAt() == "<" ? true : op != "==";
  }
  return true;
}

function key(node, keyCode, charCode, mods, type) {
  var window = node.ownerDocument.defaultView;
  var event = node.ownerDocument.createEvent("KeyboardEvent");
  mods = mods || {};
  type = type || "keypress";
  (event.initKeyEvent || event.initKeyboardEvent)(type, true, true, window,
    !!mods.ctrl, !!mods.alt, !!mods.shift, !!mods.meta, keyCode, charCode);
  node.dispatchEvent(event);
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,
                       1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
}

string.r = /([\x00-\x1F\\\x22])/g;
string.m = { "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f",
             '"' : '\\"', "\\": "\\\\" };
function string(s) {
  if (string.r.test(s)) {
    return '"'+ s.replace(string.r, function(a, b) {
      var c = string.m[b];
      if (c) return c;
      c = b.charCodeAt().toString(16);
      return "\\u00"+ (c.length < 2 ? "0" : "") + c;
    }) +'"';
  }
  return '"'+ s +'"';
}

function sum(a, b) {
  if (1 == arguments.length) return reduce(sum, a, 0);
  return integer(a || 0) + integer(b || 0);
}

if (!console.time)
  var console = { log: function(x) {
    if (!config.get("debug")) return;
    x = isString(x) ? string(x) : x;
    location.href = "javascript:void console.log(" + x +")";
  }};
