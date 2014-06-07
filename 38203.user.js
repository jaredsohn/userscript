// ==UserScript==
// @name           OkCupid Maps
// @unwrap
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/38203.user.js
// @description    Shows proper distance indicators, travel routes and times to people on OkCupid (c/o Google Maps).
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @include        http://www.okcupid.com/*
// ==/UserScript==

configure("as necessary");
GM_registerMenuCommand("Change home location for OkCupid Maps", configure);
var country = GM_getValue("country", "United States");
var me = GM_getValue("address", "") +", "+ country;
var coder = "http://hacks.ecmanaut.googlepages.com/geocoder-iframe.html?";
var legit = coder.replace(/\/[^\/]*$/, "");
var spans = $x('//span[@class="location"]');
var addrs = spans.map(content);
var debug = false;
var noise = false; if (noise) coder += "debug=1&";
var ready = false; // when mouseover callbacks are in place
var frame = pane({ width:220, height:220, style:"border:2px inset red; left:0;"+
                   "bottom:0; position:fixed; border-bottom:0; border-left:0",
                   src:coder +"at="+ me +"&country="+ country +"&nav=2&z=9" });
frame.addEventListener("load", init, false);
if (debug) unsafeWindow.gm = this;

function log() {
  var args = [].slice.call(arguments);
  return debug && console.log.apply(console, args);
}

function configure(onlyIfNeeded) {
  var c = GM_getValue("country", ""), a = GM_getValue("address");
  if (onlyIfNeeded && c && a) return;

  var x = prompt("What country do you live in?", c || "United States");
  if (!x) throw("Need a country!");
  GM_setValue("country", country = x);

  x = prompt("What is your home address? (used to show distances to people)",
             a || "1600 Pennsylvania Ave NW Washington, DC");
  if (!x) throw("Need an address!");
  GM_setValue("address", me = x);
}

function init() {
  microformat();
  addEventListener("message", gotMessage, false);
  send(addrs.join("\n"));
  // gm.spans[0].addEventListener("mouseover", function(e){gm.me}, false);
}

// for some reason those lazy OkCupid web devs don't microformat all locations
function microformat() {
  fix('id("preview_info2")'); // profile page owner's location
  fix('id("similar-users")//div/dd[2]'); // profile page sidebar
}

function fix(xpath) {
  function augment(node) {
    var text = node.firstChild;
    var addr = text.textContent.replace(/^\s*|\s*$/g, "");
    var span = document.createElement("span");
    text.data = text.textContent.replace(addr, "");
    span.textContent = addr;
    span.className = "location";
    text.parentNode.insertBefore(span, text);
    spans.push(span);
    addrs.push(addr);
  }
  $x(xpath).forEach(augment);
}

function center(on) {
  send("focus\n"+ me +"\n"+ on);
}

function route(to) {
  log("route to %x", to);
  send("route\n"+ me +"\n"+ to);
}

function send(msg) {
  frame.contentWindow.postMessage(msg, legit);
}

function unjson(s) {
  if (typeof JSON == "object")
    return JSON.parse(s);
  return eval("("+ s + ")");
}

function gotMessage(e) {
  if (e.origin != legit) return;
  var data = gotMessage.data = unjson(e.data);
  log("From %x (%d ms): %x", e.origin, data.took, data);
  if (data.time) {
    for (var place in data.coords); // last item is destination
    var those = $x('//span[@class="location"][.="'+ place +'"]');
    for each (place in those) {
      var title = data.distance.html +" / "+ data.time.html;
      place.title = title.replace(/&nbsp;/g, " ");
    }
  } else if (!ready) {
    ready = true;
    spans.forEach(listen);
  }
}

function content(node) { return node.textContent; }

function hoverRoute(e) {
  var s = e.target;
  route(s.textContent);
}

function listen(span) {
  span.addEventListener("mouseover", hoverRoute, false);
}

function pane(args) {
  var node = document.createElement("iframe");
  for (var name in args) {
    node.setAttribute(name, args[name]);
  }
  return document.body.appendChild(node);
}
