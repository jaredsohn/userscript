// ==UserScript==
// @name           BrickLink Store Options
// @namespace      http://www.smallapple.net/
// @description    Add item to wanted list on the BrickLink Store page
// @author         Ng Hun Yang
// @include        http://*.bricklink.com/storeDetail.asp*
// @include        http://*.bricklink.com//storeDetail.asp*
// @include        https://*.bricklink.com/storeDetail.asp*
// @include        https://*.bricklink.com//storeDetail.asp*
// @match          *://*.bricklink.com/storeDetail.asp*
// @version        1.00
// ==/UserScript==

/* Tested on Firefox 21.0, Chrome 26 and Opera 12.15 */

(function() {

var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
var doc = win.document;

var dom = {};
var hlp = {};

dom.gE = function(id) {
  return doc.getElementById(id);
  };

dom.cE = function(tag) {
  return doc.createElement(tag);
  };

dom.cT = function(s) {
  return doc.createTextNode(s);
  };

dom.attr = function(obj, k, v) {
  if(arguments.length == 2)
    return obj.getAttribute(k);

  obj.setAttribute(k, v);
  };

dom.append = function(obj, child) {
  obj.appendChild(child);
  };

dom.html = function(obj, s) {
  if(arguments.length == 1)
    return obj.innerHTML;

  obj.innerHTML = s;
  };

dom.emitHtml = function(tag, attrs, body) {
  if(arguments.length == 2) {
    if(typeof(attrs) == "string") {
      body = attrs;
      attrs = {};
      }
    }

  var list = [];

  for(var k in attrs) {
    list.push(k + "='" + String(attrs[k]).replace(/'/g, "\\'") + "'");
    }

  var s = "<" + tag + " " + list.join(" ") + ">";

  if(body != null)
    s += body + "</" + tag + ">";

  return s;
  };

dom.addEvent = function(e, type, fn) {
  function mouseEvent(event) {
    if(this != event.relatedTarget && !dom.isAChildOf(this, event.relatedTarget))
      fn.call(this, event);
    }

  // Entry point
  if(e.addEventListener) {
    var effFn = fn;

    if(type == "mouseenter") {
      type = "mouseover";
      effFn = mouseEvent;
      }
    else if(type == "mouseleave") {
      type = "mouseout";
      effFn = mouseEvent;
      }

    e.addEventListener(type, effFn, /*capturePhase*/ false);
    }
  else
    e.attachEvent("on" + type, function() { fn(win.event); });
  };

// -----------------------------------------------------------------------------

(function() {

var NO_COLOR = 0;

var colorList = [
  { id: 41, name: "Aqua" },
  { id: 11, name: "Black" },
  { id: 7, name: "Blue" },
  { id: 97, name: "Blue-Violet" },
  { id: 36, name: "Bright Green" },
  { id: 105, name: "Bright Light Blue" },
  { id: 110, name: "Bright Light Orange" },
  { id: 103, name: "Bright Light Yellow" },
  { id: 104, name: "Bright Pink" },
  { id: 8, name: "Brown" },
  { id: 153, name: "Dark Azure" },
  { id: 63, name: "Dark Blue" },
  { id: 109, name: "Dark Blue-Violet" },
  { id: 85, name: "Dark Bluish Gray" },
  { id: 120, name: "Dark Brown" },
  { id: 91, name: "Dark Flesh" },
  { id: 10, name: "Dark Gray" },
  { id: 80, name: "Dark Green" },
  { id: 68, name: "Dark Orange" },
  { id: 47, name: "Dark Pink" },
  { id: 89, name: "Dark Purple" },
  { id: 59, name: "Dark Red" },
  { id: 69, name: "Dark Tan" },
  { id: 39, name: "Dark Turquoise" },
  { id: 29, name: "Earth Orange" },
  { id: 106, name: "Fabuland Brown" },
  { id: 160, name: "Fabuland Orange" },
  { id: 28, name: "Flesh" },
  { id: 6, name: "Green" },
  { id: 154, name: "Lavender" },
  { id: 152, name: "Light Aqua" },
  { id: 62, name: "Light Blue" },
  { id: 86, name: "Light Bluish Gray" },
  { id: 90, name: "Light Flesh" },
  { id: 9, name: "Light Gray" },
  { id: 38, name: "Light Green" },
  { id: 35, name: "Light Lime" },
  { id: 32, name: "Light Orange" },
  { id: 56, name: "Light Pink" },
  { id: 93, name: "Light Purple" },
  { id: 26, name: "Light Salmon" },
  { id: 40, name: "Light Turquoise" },
  { id: 44, name: "Light Violet" },
  { id: 33, name: "Light Yellow" },
  { id: 34, name: "Lime" },
  { id: 72, name: "Maersk Blue" },
  { id: 71, name: "Magenta" },
  { id: 156, name: "Medium Azure" },
  { id: 42, name: "Medium Blue" },
  { id: 150, name: "Medium Dark Flesh" },
  { id: 94, name: "Medium Dark Pink" },
  { id: 37, name: "Medium Green" },
  { id: 157, name: "Medium Lavender" },
  { id: 76, name: "Medium Lime" },
  { id: 31, name: "Medium Orange" },
  { id: 73, name: "Medium Violet" },
  { id: 155, name: "Olive Green" },
  { id: 4, name: "Orange" },
  { id: 23, name: "Pink" },
  { id: 24, name: "Purple" },
  { id: 5, name: "Red" },
  { id: 88, name: "Reddish Brown" },
  { id: 27, name: "Rust" },
  { id: 25, name: "Salmon" },
  { id: 55, name: "Sand Blue" },
  { id: 48, name: "Sand Green" },
  { id: 54, name: "Sand Purple" },
  { id: 58, name: "Sand Red" },
  { id: 87, name: "Sky Blue" },
  { id: 2, name: "Tan" },
  { id: 99, name: "Very Light Bluish Gray" },
  { id: 49, name: "Very Light Gray" },
  { id: 96, name: "Very Light Orange" },
  { id: 43, name: "Violet" },
  { id: 1, name: "White" },
  { id: 3, name: "Yellow" },
  { id: 158, name: "Yellowish Green" },
  { id: 13, name: "Trans-Black" },
  { id: 108, name: "Trans-Bright Green" },
  { id: 12, name: "Trans-Clear" },
  { id: 14, name: "Trans-Dark Blue" },
  { id: 50, name: "Trans-Dark Pink" },
  { id: 20, name: "Trans-Green" },
  { id: 15, name: "Trans-Light Blue" },
  { id: 114, name: "Trans-Light Purple" },
  { id: 74, name: "Trans-Medium Blue" },
  { id: 16, name: "Trans-Neon Green" },
  { id: 18, name: "Trans-Neon Orange" },
  { id: 121, name: "Trans-Neon Yellow" },
  { id: 98, name: "Trans-Orange" },
  { id: 107, name: "Trans-Pink" },
  { id: 51, name: "Trans-Purple" },
  { id: 17, name: "Trans-Red" },
  { id: 113, name: "Trans-Very" },
  { id: 19, name: "Trans-Yellow" },
  { id: 57, name: "Chrome Antique Brass" },
  { id: 122, name: "Chrome Black" },
  { id: 52, name: "Chrome Blue" },
  { id: 21, name: "Chrome Gold" },
  { id: 64, name: "Chrome Green" },
  { id: 82, name: "Chrome Pink" },
  { id: 22, name: "Chrome Silver" },
  { id: 84, name: "Copper" },
  { id: 81, name: "Flat Dark Gold" },
  { id: 95, name: "Flat Silver" },
  { id: 78, name: "Metal Blue" },
  { id: 77, name: "Pearl Dark Gray" },
  { id: 115, name: "Pearl Gold" },
  { id: 61, name: "Pearl Light Gold" },
  { id: 66, name: "Pearl Light Gray" },
  { id: 119, name: "Pearl Very Light Gray" },
  { id: 83, name: "Pearl White" },
  { id: 65, name: "Metallic Gold" },
  { id: 70, name: "Metallic Green" },
  { id: 67, name: "Metallic Silver" },
  { id: 46, name: "Glow In Dark Opaque" },
  { id: 118, name: "Glow In Dark Trans" },
  { id: 159, name: "Glow in Dark White" },
  { id: 60, name: "Milky White" },
  { id: 101, name: "Glitter Trans-Clear" },
  { id: 100, name: "Glitter Trans-Dark Pink" },
  { id: 102, name: "Glitter Trans-Purple" },
  { id: 116, name: "Speckle Black-Copper" },
  { id: 151, name: "Speckle Black-Gold" },
  { id: 111, name: "Speckle Black-Silver" },
  { id: 117, name: "Speckle DBGray-Silver" },
  { id: 142, name: "Mx Aqua Green" },
  { id: 128, name: "Mx Black" },
  { id: 132, name: "Mx Brown" },
  { id: 133, name: "Mx Buff" },
  { id: 126, name: "Mx Charcoal Gray" },
  { id: 149, name: "Mx Clear" },
  { id: 139, name: "Mx Lemon" },
  { id: 124, name: "Mx Light Bluish Gray" },
  { id: 125, name: "Mx Light Gray" },
  { id: 136, name: "Mx Light Orange" },
  { id: 137, name: "Mx Light Yellow" },
  { id: 144, name: "Mx Medium Blue" },
  { id: 138, name: "Mx Ochre Yellow" },
  { id: 140, name: "Mx Olive Green" },
  { id: 135, name: "Mx Orange" },
  { id: 145, name: "Mx Pastel Blue" },
  { id: 141, name: "Mx Pastel Green" },
  { id: 148, name: "Mx Pink" },
  { id: 130, name: "Mx Pink Red" },
  { id: 129, name: "Mx Red" },
  { id: 146, name: "Mx Teal Blue" },
  { id: 134, name: "Mx Terracotta" },
  { id: 143, name: "Mx Tile Blue" },
  { id: 131, name: "Mx Tile Brown" },
  { id: 127, name: "Mx Tile Gray" },
  { id: 147, name: "Mx Violet" },
  { id: 123, name: "Mx White" }
  ];

hlp.getColorList = function() {
  return colorList;
  };

hlp.getColorId = function(str) {
  for(var i = 0; i < colorList.length; ++i) {
    var regExp = new RegExp("^" + colorList[i].name + " ", "i");
    if(str.match(regExp))
      return colorList[i].id;
    }

  return NO_COLOR;
  };

}) ();

// -----------------------------------------------------------------------------

var ID_PREFIX = "ujs-bl-store-options-";

// -----------------------------------------------------------------------------

(function() {

var DIV_ID = ID_PREFIX + "form-div";
var DIV_STYLE = "display: none";

var FORM_NAME = ID_PREFIX + "form";
var IFRAME_ID = ID_PREFIX + "iframe";

var BTN_STYLE = "margin: 0.3em";

function createHiddenForm() {
  var divNode = dom.cE("div");
  divNode.id = DIV_ID;
  dom.attr(divNode, "style", DIV_STYLE);
  dom.append(doc.body, divNode);

  dom.html(divNode, dom.emitHtml("form", {
    name: FORM_NAME,
    method: "POST",
    src: "about:blank",
    target: IFRAME_ID,
    scrolling: "auto",
    border: 0,
    width: 0,
    height: 0
    }, "") +
    dom.emitHtml("iframe", { name: IFRAME_ID }, ""));
  }

function createDiv() {
  function get_part_info(row) {
    if(row.children.length < 1)
      return false;

    var hElm = row.children[0].querySelector("a");
    if(!hElm)
      return false;

    if(!hElm.getAttribute("href").match(/\?(\w)=([0-9a-zA-Z-]+)/))
      return false;

    return { type: RegExp.$1, id: RegExp.$2 };
    }

  function get_new_status(row, part_info) {
    if(row.children.length < 2)
      return;

    var hElm = row.children[1].querySelector("b");
    if(!hElm)
      return;

    part_info.new_status = hElm.textContent == "New" ? "N" : "U";
    }

  function add_btn(div_node, part_info) {
    var btn_node = dom.cE("input");
    dom.attr(btn_node, "style", BTN_STYLE);
    dom.attr(btn_node, "type", "button");
    dom.attr(btn_node, "value", "I want!");
    dom.append(div_node, btn_node);
    dom.addEvent(btn_node, "click", function() { on_click(part_info); });
    }

  function on_click(part_info) {
    //win.console.log(part_info);

    var qty = doc.querySelector("input[name=" + part_info.inp_name + "]").value;

    var form = doc.querySelector("form[name=" + FORM_NAME + "]");

    dom.attr(form, "action", "/wantedAddDetail.asp?a=" + part_info.type);

    var inputs = [];

    inputs.push(dom.emitHtml("input", { type: "hidden", name: "go", value: "Y" }));
    inputs.push(dom.emitHtml("input", { type: "hidden", name: "wantedMoreID", value: 0 }));
    inputs.push(dom.emitHtml("input", { type: "hidden", name: "p_selecteditemID", value: part_info.id }));
    inputs.push(dom.emitHtml("input", { type: "hidden", name: "wantedNew", value: part_info.new_status }));
    inputs.push(dom.emitHtml("input", { type: "hidden", name: "finalColor", value: part_info.color }));

    if(qty != "") {
      inputs.push(dom.emitHtml("input", { type: "hidden", name: "qtyType", value: "P" }));
      inputs.push(dom.emitHtml("input", { type: "hidden", name: "wantedQty", value: qty }));
      }

    dom.html(form, inputs.join(""));

    form.submit();
    }

  // Entry point
  var anchor = doc.querySelector("a[rel=blcatimg]");

  var tbl = anchor.parentNode.parentNode.parentNode.parentNode;
  var rows = tbl.querySelectorAll("tr.tm");

  for(var i = 0; i < rows.length; ++i) {
    var row = rows[i];
    var part_info = get_part_info(row);
    if(!part_info)
      continue;

    get_new_status(row, part_info);

    part_info.color = hlp.getColorId(row.children[2].textContent);

    var inp_ctl = row.children[3].querySelector("input");
    part_info.inp_name = inp_ctl.name;

    //win.console.log(part_info);

    add_btn(inp_ctl.parentNode, part_info);
    }
  }

if(doc.querySelector("a[rel=blcatimg]")) {
  createHiddenForm();
  createDiv();
  }

}) ();

}) ();
