// ==UserScript==
// @id             fallenlondon-keyboarder@spiralx.org
// @name           Fallen London Keyboarder
// @version        1.0
// @namespace      http://spiralx.org/fallenlondon-keyboarder
// @author         James Skinner
// @description    Adds keyboard controls to Fallen London game actions.
// @include        http://fallenlondon.storynexus.com/*
// @exclude        http://fallenlondon.storynexus.com/Storylet/*
// @exclude        http://fallenlondon.storynexus.com/User/*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==


;(function (window, document, undefined) {

  // console.info(location.href);

  // ----------------------------------

  function main() {

    var
      // 1234567890-=
      KEYS_ROW_1 = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 173, 61],
      // QWERTYUIOP[]
      KEYS_ROW_Q = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221],
      // ASDFGHJKL;'#
      KEYS_ROW_A = [65, 83, 68, 70, 71, 72, 74, 75, 76, 59, 222, 163],
      // ZXCVBNM,./
      KEYS_ROW_Z = [90, 88, 67, 86, 66, 78, 77, 188, 190, 191],
      // F1...F12
      KEYS_ROW_F = [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
      // NumPad 1234567890./*-+
      KEYS_NUMPAD = [97, 98, 99, 100, 101, 102, 103, 104, 105, 96, 110, 111, 106, 109, 107];

    // Individual key codes
    var Keys = {
      BKSP: 8,
      TAB: 9,
      RET: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      BREAK: 19,
      CAPSLOCK: 20,
      ESC: 27,
      SPACE: 32,
      PGUP: 33,
      PGDN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      INS: 45,
      DEL: 46,
      "1": 49,
      "2": 50,
      D: 68,
      N: 78,
      O: 79,
      Q: 81,
      T: 84,
      WIN: 91,
      CTXMENU: 93,
      F1: 112,
      BACKTICK: 192,
      BACKSLASH: 220
    };


    // ----------------------------------

    /**
     * fmt("x={0}, y={1}", 12, 4) -> "x=12, y=4"
     * fmt("x={x}, y={y}", { x: 12, y: 4 }) -> "x=12, y=4"
     * fmt("x={x}, y={{moo}}", { x: 12, y: 4 }) -> "x=12, y={moo}"
     */
    function fmt(format, data) {
      data = arguments.length == 2 && typeof data === "object"
        ? data
        : [].slice.call(arguments, 1);

      return format
        .replace(/\{\{/g, String.fromCharCode(0))
        .replace(/\}\}/g, String.fromCharCode(1))
        .replace(/\{([^{}]*)\}/g, function(match, key_name) {
          return key_name in data
            ? String(data[key_name])
            : match;
        })
        .replace(/\x00/g, "{")
        .replace(/\x01/g, "}");
    }


    function _Logger(start_disabled) {
      var self = this;
      this.enabled = !start_disabled;
      this.toggle = function() { this.enabled = !this.enabled; }

        "log,info,warn,error,dir,clear,debug,trace,group,groupEnd".split(",").forEach(function(name, i) {
        self[name] = function() {
          if (self.enabled && typeof console[name] === "function") {
            console[name].apply(console, arguments);
          }
        }
      });

      this.event = function(ev) {
        self.log(fmt("{type}: which:{which}, s:{shiftKey}, c:{ctrlKey}, a:{metaKey}", ev));
      }
    }


    // ----------------------------------

    /**
     * trigger_event(document.body, "dblclick")
     * trigger_event(document.body, "wheel", "WheelEvent")
     */
    function trigger_event(target, event_name, event_type) {
      var ev =  document.createEvent(event_type || "MouseEvents");
      ev.initEvent(event_name || "click", true, true);
      target.dispatchEvent(ev);
    }


    function send_event(sel, event) {
      var $target = $(sel),
        event = event || "click";
     
      if ($target.length == 0) {
        logger.warn(fmt("send_event('{0}', '{1}'): no target found!", sel, event));
        return false;
      }

      logger.log(fmt("send_event('{0}', '{1}'): ", sel, event), $target);
      trigger_event($target.get(0), event);
      return true;
    }


    function get_ranged_selector(ev, key_codes, selector_fmt) {
      var idx = key_codes.indexOf(ev.which);
      if (idx != -1) {
        return fmt(selector_fmt, idx);
      }
      return null;
    }


    /**
     * Show keyboard help.
     */
    function show_help() {
      var l = new Logger(),
        d = new Dialog(l),
        r = [];

      function row(left, right) {
        r.push("<tr><td>" + left + "</td><td width='20%'>" + right + "</td></tr>");
      }

      row("Story tab: Refill your Opportunity cards", "D / Q");
      row("Story tab: Play an Opportunity card", "F1..F4");
      row("Story tab: Discard an Opportunity card", "Control + F1..F4");
      row("Story tab: Play a Storylet", "1..9");
      // row("Me tab", "Z");
      // row("More tab", "X");
      // row("Items tab", "C");
      row("Storylet: Select action", "1..9");
      row("Storylet: Perhaps not", "N / ESC");
      row("Storylet: Try This Again", "T / 1");
      row("Storylet: Onwards", "O / 2");

      d.Init();
      d.SetContent("<table>" + r.join("") + "</table>");
      d.Open();
    }

    // ----------------------------------

    var logger = new _Logger(true);
    
    $(document).on("keydown.snkb", function(ev) {
      var sel;

      if (ev.target.tagName == "INPUT" || ev.target.tagName == "TEXTAREA") {
        return;
      }

      if (ev.which == Keys.BACKTICK) {
        logger.toggle();
        console.log("Logging " + (logger.enabled ? "enabled" : "disabled"));
        return false;
      }

      if (ev.which == 191 && ev.shiftKey) {
        show_help();
        return false;
      }
      
      logger.event(ev);
      
      if ($("#opportunitiesSection").length > 0) {
        logger.info("On decks page");
        
        if (ev.which == Keys.D || ev.which == Keys.Q) {
          if (send_event("#cardDeckLink")) {
            return false;
          }
        }

        sel = get_ranged_selector(ev, KEYS_ROW_F, ev.ctrlKey ? "#cards li:gt(0) .discard_btn:eq({0})"
                                                             : "#cards li:gt(0) :image:eq({0})");
        if (send_event(sel)) {
          return false;
        }
        
        sel = get_ranged_selector(ev, KEYS_ROW_1, "#storyletsSection :button:eq({0})");
        if (send_event(sel)) {
          return false;
        }
      }
      
      else if ($(".storylet_flavour_text").length > 0) {
        if ($(".quality_update_box").length == 0) {
          logger.info("On storylet intro page");

          if (ev.which == Keys.N || ev.which == Keys.ESC) {
            send_event("#perhapsnotbtn");
            return false;
          }
          
          sel = get_ranged_selector(ev, KEYS_ROW_1, ".storylet form:eq({0})");
          if (send_event(sel, "submit")) {
            return false;
          }
        }
        
        else {
          logger.info("On storylet result page");
          
          sel = get_ranged_selector(ev, KEYS_ROW_1, ".tab_content :button:eq({0})");
          if (send_event(sel)) {
            return false;
          }
      
          if (ev.which == Keys.O || ev.which == Keys.ESC) {
            if (send_event("#mainContentViaAjax :button[onclick*=Available]")) {
              return false;
            }
          }
          if (ev.which == Keys.T) {
            if (send_event("#mainContentViaAjax :button[onclick*=Begin]")) {
              return false;
            }
          }
        }
      }

    });
  }

  // Handle Chrome not being able to access the page.
  if (typeof jQuery === "undefined") {
    var code = "(" + main + ")();",
      se = document.createElement("script");
    se.textContent = code;
    document.body.appendChild(se);
    document.body.removeChild(se);
  }
  else {
    main();
  }

})(window, document);
