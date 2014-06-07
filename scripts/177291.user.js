// ==UserScript==
// @name           BrickLink Wanted List to Brickstore XML Exporter
// @namespace      http://www.swisslug.ch/
// @description    Export BrickLink Wanted List(s) to a Brickstore XML (*.bsx)
// @author         Marian Flores
// @include        http://*.bricklink.com/wantedDetail.asp*
// @include        http://*.bricklink.com//wantedDetail.asp*
// @include        https://*.bricklink.com/wantedDetail.asp*
// @include        https://*.bricklink.com//wantedDetail.asp*
// @match          *://*.bricklink.com/wantedDetail.asp*
// @version        1.0
// @grant          none
// ==/UserScript==

/* Tested on Iceweasel (Firefox) 17.0.8 */

(function () {

  var win = typeof (unsafeWindow) != "undefined" ? unsafeWindow : window;
  var doc = win.document;

  var dom = {};
  var hlp = {};

  dom.gE = function (id) {
    return doc.getElementById(id);
  };

  dom.cE = function (tag) {
    return doc.createElement(tag);
  };

  dom.cT = function (s) {
    return doc.createTextNode(s);
  };

  dom.attr = function (obj, k, v) {
    if (arguments.length == 2)
      return obj.getAttribute(k);

    obj.setAttribute(k, v);
  };

  dom.append = function (obj, child) {
    obj.appendChild(child);
  };

  dom.html = function (obj, s) {
    if (arguments.length == 1)
      return obj.innerHTML;

    obj.innerHTML = s;
  };

  dom.emitHtml = function (tag, attrs, body) {
    if (arguments.length == 2) {
      if (typeof (attrs) == "string") {
        body = attrs;
        attrs = {};
      }
    }

    var list = [];

    for (var k in attrs) {
      list.push(k + "='" + String(attrs[k]).replace(/'/g, "\\'") + "'");
    }

    var s = "<" + tag + " " + list.join(" ") + ">";

    if (body != null)
      s += body + "</" + tag + ">";

    return s;
  };

  dom.addEvent = function (e, type, fn) {
    function mouseEvent(event) {
      if (this != event.relatedTarget && !dom.isAChildOf(this, event.relatedTarget))
        fn.call(this, event);
    }

    // Entry point
    if (e.addEventListener) {
      var effFn = fn;

      if (type == "mouseenter") {
        type = "mouseover";
        effFn = mouseEvent;
      } else if (type == "mouseleave") {
        type = "mouseout";
        effFn = mouseEvent;
      }

      e.addEventListener(type, effFn, /*capturePhase*/ false);
    } else
      e.attachEvent("on" + type, function () {
        fn(win.event);
      });
  };

  // -----------------------------------------------------------------------------

  function escTags(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // -----------------------------------------------------------------------------

  (function () {

    var NO_COLOR = 0;

    var colorList = [{
      id: 41,
      name: "Aqua"
    }, {
      id: 11,
      name: "Black"
    }, {
      id: 7,
      name: "Blue"
    }, {
      id: 97,
      name: "Blue-Violet"
    }, {
      id: 36,
      name: "Bright Green"
    }, {
      id: 105,
      name: "Bright Light Blue"
    }, {
      id: 110,
      name: "Bright Light Orange"
    }, {
      id: 103,
      name: "Bright Light Yellow"
    }, {
      id: 104,
      name: "Bright Pink"
    }, {
      id: 8,
      name: "Brown"
    }, {
      id: 153,
      name: "Dark Azure"
    }, {
      id: 63,
      name: "Dark Blue"
    }, {
      id: 109,
      name: "Dark Blue-Violet"
    }, {
      id: 85,
      name: "Dark Bluish Gray"
    }, {
      id: 120,
      name: "Dark Brown"
    }, {
      id: 91,
      name: "Dark Flesh"
    }, {
      id: 10,
      name: "Dark Gray"
    }, {
      id: 80,
      name: "Dark Green"
    }, {
      id: 68,
      name: "Dark Orange"
    }, {
      id: 47,
      name: "Dark Pink"
    }, {
      id: 89,
      name: "Dark Purple"
    }, {
      id: 59,
      name: "Dark Red"
    }, {
      id: 69,
      name: "Dark Tan"
    }, {
      id: 39,
      name: "Dark Turquoise"
    }, {
      id: 29,
      name: "Earth Orange"
    }, {
      id: 106,
      name: "Fabuland Brown"
    }, {
      id: 160,
      name: "Fabuland Orange"
    }, {
      id: 28,
      name: "Flesh"
    }, {
      id: 6,
      name: "Green"
    }, {
      id: 154,
      name: "Lavender"
    }, {
      id: 152,
      name: "Light Aqua"
    }, {
      id: 62,
      name: "Light Blue"
    }, {
      id: 86,
      name: "Light Bluish Gray"
    }, {
      id: 90,
      name: "Light Flesh"
    }, {
      id: 9,
      name: "Light Gray"
    }, {
      id: 38,
      name: "Light Green"
    }, {
      id: 35,
      name: "Light Lime"
    }, {
      id: 32,
      name: "Light Orange"
    }, {
      id: 56,
      name: "Light Pink"
    }, {
      id: 93,
      name: "Light Purple"
    }, {
      id: 26,
      name: "Light Salmon"
    }, {
      id: 40,
      name: "Light Turquoise"
    }, {
      id: 44,
      name: "Light Violet"
    }, {
      id: 33,
      name: "Light Yellow"
    }, {
      id: 34,
      name: "Lime"
    }, {
      id: 72,
      name: "Maersk Blue"
    }, {
      id: 71,
      name: "Magenta"
    }, {
      id: 156,
      name: "Medium Azure"
    }, {
      id: 42,
      name: "Medium Blue"
    }, {
      id: 150,
      name: "Medium Dark Flesh"
    }, {
      id: 94,
      name: "Medium Dark Pink"
    }, {
      id: 37,
      name: "Medium Green"
    }, {
      id: 157,
      name: "Medium Lavender"
    }, {
      id: 76,
      name: "Medium Lime"
    }, {
      id: 31,
      name: "Medium Orange"
    }, {
      id: 73,
      name: "Medium Violet"
    }, {
      id: 155,
      name: "Olive Green"
    }, {
      id: 4,
      name: "Orange"
    }, {
      id: 23,
      name: "Pink"
    }, {
      id: 24,
      name: "Purple"
    }, {
      id: 5,
      name: "Red"
    }, {
      id: 88,
      name: "Reddish Brown"
    }, {
      id: 27,
      name: "Rust"
    }, {
      id: 25,
      name: "Salmon"
    }, {
      id: 55,
      name: "Sand Blue"
    }, {
      id: 48,
      name: "Sand Green"
    }, {
      id: 54,
      name: "Sand Purple"
    }, {
      id: 58,
      name: "Sand Red"
    }, {
      id: 87,
      name: "Sky Blue"
    }, {
      id: 2,
      name: "Tan"
    }, {
      id: 99,
      name: "Very Light Bluish Gray"
    }, {
      id: 49,
      name: "Very Light Gray"
    }, {
      id: 96,
      name: "Very Light Orange"
    }, {
      id: 43,
      name: "Violet"
    }, {
      id: 1,
      name: "White"
    }, {
      id: 3,
      name: "Yellow"
    }, {
      id: 158,
      name: "Yellowish Green"
    }, {
      id: 13,
      name: "Trans-Black"
    }, {
      id: 108,
      name: "Trans-Bright Green"
    }, {
      id: 12,
      name: "Trans-Clear"
    }, {
      id: 14,
      name: "Trans-Dark Blue"
    }, {
      id: 50,
      name: "Trans-Dark Pink"
    }, {
      id: 20,
      name: "Trans-Green"
    }, {
      id: 15,
      name: "Trans-Light Blue"
    }, {
      id: 114,
      name: "Trans-Light Purple"
    }, {
      id: 74,
      name: "Trans-Medium Blue"
    }, {
      id: 16,
      name: "Trans-Neon Green"
    }, {
      id: 18,
      name: "Trans-Neon Orange"
    }, {
      id: 121,
      name: "Trans-Neon Yellow"
    }, {
      id: 98,
      name: "Trans-Orange"
    }, {
      id: 107,
      name: "Trans-Pink"
    }, {
      id: 51,
      name: "Trans-Purple"
    }, {
      id: 17,
      name: "Trans-Red"
    }, {
      id: 113,
      name: "Trans-Very"
    }, {
      id: 19,
      name: "Trans-Yellow"
    }, {
      id: 57,
      name: "Chrome Antique Brass"
    }, {
      id: 122,
      name: "Chrome Black"
    }, {
      id: 52,
      name: "Chrome Blue"
    }, {
      id: 21,
      name: "Chrome Gold"
    }, {
      id: 64,
      name: "Chrome Green"
    }, {
      id: 82,
      name: "Chrome Pink"
    }, {
      id: 22,
      name: "Chrome Silver"
    }, {
      id: 84,
      name: "Copper"
    }, {
      id: 81,
      name: "Flat Dark Gold"
    }, {
      id: 95,
      name: "Flat Silver"
    }, {
      id: 78,
      name: "Metal Blue"
    }, {
      id: 77,
      name: "Pearl Dark Gray"
    }, {
      id: 115,
      name: "Pearl Gold"
    }, {
      id: 61,
      name: "Pearl Light Gold"
    }, {
      id: 66,
      name: "Pearl Light Gray"
    }, {
      id: 119,
      name: "Pearl Very Light Gray"
    }, {
      id: 83,
      name: "Pearl White"
    }, {
      id: 65,
      name: "Metallic Gold"
    }, {
      id: 70,
      name: "Metallic Green"
    }, {
      id: 67,
      name: "Metallic Silver"
    }, {
      id: 46,
      name: "Glow In Dark Opaque"
    }, {
      id: 118,
      name: "Glow In Dark Trans"
    }, {
      id: 159,
      name: "Glow in Dark White"
    }, {
      id: 60,
      name: "Milky White"
    }, {
      id: 101,
      name: "Glitter Trans-Clear"
    }, {
      id: 100,
      name: "Glitter Trans-Dark Pink"
    }, {
      id: 102,
      name: "Glitter Trans-Purple"
    }, {
      id: 116,
      name: "Speckle Black-Copper"
    }, {
      id: 151,
      name: "Speckle Black-Gold"
    }, {
      id: 111,
      name: "Speckle Black-Silver"
    }, {
      id: 117,
      name: "Speckle DBGray-Silver"
    }, {
      id: 142,
      name: "Mx Aqua Green"
    }, {
      id: 128,
      name: "Mx Black"
    }, {
      id: 132,
      name: "Mx Brown"
    }, {
      id: 133,
      name: "Mx Buff"
    }, {
      id: 126,
      name: "Mx Charcoal Gray"
    }, {
      id: 149,
      name: "Mx Clear"
    }, {
      id: 139,
      name: "Mx Lemon"
    }, {
      id: 124,
      name: "Mx Light Bluish Gray"
    }, {
      id: 125,
      name: "Mx Light Gray"
    }, {
      id: 136,
      name: "Mx Light Orange"
    }, {
      id: 137,
      name: "Mx Light Yellow"
    }, {
      id: 144,
      name: "Mx Medium Blue"
    }, {
      id: 138,
      name: "Mx Ochre Yellow"
    }, {
      id: 140,
      name: "Mx Olive Green"
    }, {
      id: 135,
      name: "Mx Orange"
    }, {
      id: 145,
      name: "Mx Pastel Blue"
    }, {
      id: 141,
      name: "Mx Pastel Green"
    }, {
      id: 148,
      name: "Mx Pink"
    }, {
      id: 130,
      name: "Mx Pink Red"
    }, {
      id: 129,
      name: "Mx Red"
    }, {
      id: 146,
      name: "Mx Teal Blue"
    }, {
      id: 134,
      name: "Mx Terracotta"
    }, {
      id: 143,
      name: "Mx Tile Blue"
    }, {
      id: 131,
      name: "Mx Tile Brown"
    }, {
      id: 127,
      name: "Mx Tile Gray"
    }, {
      id: 147,
      name: "Mx Violet"
    }, {
      id: 123,
      name: "Mx White"
    }];

    hlp.getColorList = function () {
      return colorList;
    };

    hlp.getColorId = function (str) {
      for (var i = 0; i < colorList.length; ++i) {
        var regExp = new RegExp("^" + colorList[i].name + " ", "i");
        if (str.match(regExp))
          return colorList[i].id;
      }

      return NO_COLOR;
    };

  })();

  // -----------------------------------------------------------------------------

  var ID_PREFIX = "ujs-bl-export-to-bsx-";

  var DIV_ID = ID_PREFIX + "div";
  var SEL_ID = ID_PREFIX + "sel";
  var BTN_ID = ID_PREFIX + "btn";
  var OUT_WIN_OPT_NAME = ID_PREFIX + "out-win-opt-radio";
  var DEFAULT_WINDOW_PREFIX = "brickstore-file";

  // -----------------------------------------------------------------------------

  var STORE_ID = "ujs-bl-export-wanted-list-";

  var user_params = {};

  function loadOptions() {
    var win_opt = localStorage[STORE_ID + "win_opt"] || "new";

    var out_win_opts = doc.querySelectorAll("input[name=" + OUT_WIN_OPT_NAME + "]");

    for (var i = 0; i < out_win_opts.length; ++i) {
      if (out_win_opts[i].value == win_opt) {
        out_win_opts[i].checked = true;
        break;
      }
    }

    user_params.win_name = localStorage[STORE_ID + "win_name"] || DEFAULT_WINDOW_PREFIX + (+new Date());
  }

  function storeOptions(opts) {
    localStorage[STORE_ID + "win_opt"] = opts.win_opt;
    localStorage[STORE_ID + "win_name"] = opts.win_name;

    user_params.win_name = opts.win_name;
  }

  // -----------------------------------------------------------------------------

  (function () {

    var DIV_STYLE = "background-color: #287f86; border: #fff 1px solid; border-radius: 3px; color: white; font-family: arial,helvetica,sans-serif; padding: 0.3em; position: fixed; top: 0.5em; right: 0.5em";

    var SEL_STYLE = "margin: 0.3em";

    var BTN_TEXT = "Export to BSX";
    var BTN_STYLE = "border-radius: 3px; cursor: pointer; margin: -0.5em 0.3em 0.3em 0.3em";

    var OPTS_STYLE = "border-top: #fff 1px solid; font-size: 80%; margin: 0.5em 0.25em 0.25em";

    function createBtn(divNode) {
      var btnNode = dom.cE("input");
      btnNode.id = BTN_ID;

      dom.attr(btnNode, "type", "button");
      dom.attr(btnNode, "value", BTN_TEXT);
      dom.attr(btnNode, "style", BTN_STYLE);

      dom.addEvent(btnNode, "click", emitWantedList);

      dom.append(divNode, btnNode);
    }

    function createOpts(divNode) {
      var optsNode = dom.cE("div");
      dom.attr(optsNode, "style", OPTS_STYLE);

      dom.html(optsNode,
        dom.emitHtml("label", {
          style: "display: block"
        }, dom.emitHtml("input", {
          type: "radio",
          name: OUT_WIN_OPT_NAME,
          value: "new"
        }) + "New") +
        dom.emitHtml("label", {
          style: "display: block"
        }, dom.emitHtml("input", {
          type: "radio",
          name: OUT_WIN_OPT_NAME,
          value: "replace"
        }) + "Replace") +
        dom.emitHtml("label", {
          style: "display: block"
        }, dom.emitHtml("input", {
          type: "radio",
          name: OUT_WIN_OPT_NAME,
          value: "append"
        }) + "Append")
      );

      dom.append(divNode, optsNode);
    }

    function createDiv() {
      var divNode = dom.cE("div");
      divNode.id = DIV_ID;

      dom.attr(divNode, "style", DIV_STYLE);

      dom.append(doc.body, divNode);

      dom.append(divNode, dom.cE("br"));

      createBtn(divNode);
      createOpts(divNode);

      loadOptions();
    }

    if (self === top && doc.querySelector("form[name=wantedForm]"))
      createDiv();

  })();

  // -----------------------------------------------------------------------------

  function getParts() {
    function has_key(map, key) {
      for (var k in map) {
        if (k == key)
          return map[k];
      }
      return null;
    }

    function get_elm_id(row) {
      if (row.children.length < 2)
        return false;

      var hElm = row.children[1].querySelector("a");
      if (!hElm)
        return false;

      if (!hElm.getAttribute("href").match(/\?wantedID=(\d+)$/))
        return false;

      return RegExp.$1;
    }

    function get_part_info(row) {
      if (row.children.length < 3)
        return false;

      var hElm = row.children[2].querySelector("a");
      if (!hElm)
        return false;

      if (!hElm.getAttribute("href").match(/\?(\w+)=([0-9a-zA-Z-]+)$/))
        return false;

      return {
        type: RegExp.$1,
        id: RegExp.$2,
        name: hElm.textContent
      };
    }

    // Entry point
    var form = doc.querySelector("form[name=wantedForm]");
    var tbl = form.parentNode;
    var rows = tbl.querySelectorAll("tr");

    var list = [];

    var dict = {};

    for (var i = 1; i < rows.length; ++i) {
      var row = rows[i];

      var part_info = get_part_info(row);
      if (!part_info)
        continue;

      row = rows[i + 1];

      var notify = row.children[0].querySelectorAll("input").item(1).checked ? "Y" : "N";

      var hElm = row.children[1].querySelector("select");
      var cond = hElm.value;

      var min_qty = row.children[2].querySelectorAll("input").item(1).value;
      var max_price = row.children[3].querySelectorAll("input").item(1).value;
      var remarks = row.children[4].querySelector("input").value;

      var entry = {};

      entry = {
        part_type: part_info.type,
        part_id: part_info.id,
        color: hlp.getColorId(part_info.name),
        cond: cond,
        min_qty: min_qty,
        max_price: max_price,
        remarks: remarks,
        notify: notify
      };

      var key = cond + part_info.type + part_info.id + entry.color;

      var found = has_key(dict, key);

      if (found != null)
        dict[key].min_qty = (1 * dict[key].min_qty) + (1 * entry.min_qty);
      else
        dict[key] = entry;
    }

    for (var dkey in dict) {
      list.push(dict[dkey]);
    }

    return list;
  }

  function genWantedList(list) {
    function emit(tag, v) {
      return "<" + tag + ">" + v + "</" + tag + ">";
    }

    // Entry point
    var out_list = [];

    for (var i = 0; i < list.length; ++i) {
      var elm = list[i];
      var str = "";
      str += emit("ItemTypeID", elm.part_type);
      str += emit("ItemID", elm.part_id);
      str += emit("ColorID", elm.color);
      str += emit("Condition", elm.cond);
      str += emit("Qty", elm.min_qty);

      out_list.push(emit("Item", str));
    }


    var invStr = emit("Inventory", "\n" + out_list.join("\n") + "\n");
    return emit("BrickStoreXML", "\n" + invStr + "\n");
  }

  function emitWantedList() {
    var win_name = user_params.win_name;
    var title = "My Wanted List";

    var out_win_opts = doc.querySelectorAll("input[name=" + OUT_WIN_OPT_NAME + "]");
    var win_opt;

    for (var i = 0; i < out_win_opts.length; ++i) {
      if (out_win_opts[i].checked) {
        win_opt = out_win_opts[i].value;
        break;
      }
    }

    switch (win_opt) {
    case "new":
    default:
      win_name = DEFAULT_WINDOW_PREFIX + (+new Date());
      break;

    case "replace":
      break;

    case "append":
      break;
    }

    storeOptions({
      win_opt: win_opt,
      win_name: win_name
    });

    var new_win = window.open("", win_name);
    var new_doc = new_win.document;

    var str = genWantedList(getParts());

    var preNode = new_doc.querySelector("pre");

    if (win_opt == "append" && preNode) {
      str = dom.html(preNode) + escTags(str);
      dom.html(preNode, str.replace(/&lt;\/Inventory&gt;\s.*\s.*\s&lt;Inventory&gt;\s/g, ""));
    } else {
      new_doc.writeln("<html>");
      new_doc.writeln("<head><title>" + title + "</title></head>");
      new_doc.writeln("<body>");
      new_doc.writeln("<pre>");
      new_doc.writeln(escTags(str));
      new_doc.writeln("</pre>");
      new_doc.writeln("</body>");
      new_doc.writeln("</html>");

      new_doc.close();
    }
  }

})();
