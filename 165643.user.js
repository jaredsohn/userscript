// ==UserScript==
// @id             storynexus-keyboarder@http://spiralx.org/storynexus-keyboarder
// @name           Storynexus Keyboarder
// @description    Adds keyboard controls to most StoryNexus game actions.
// @version        1.2
// @namespace      http://spiralx.org/storynexus-keyboarder
// @author         James Skinner
// @include        http://*.storynexus.com/*
// @exclude        http://fallenlondon.storynexus.com/*
// @run-at         document-end
// ==/UserScript==

;(function (window, document, undefined) {

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
      N: 78,
      O: 79,
      WIN: 91,
      CTXMENU: 93,
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

      if ($target.length != 1)
        return false;

      logger.log(fmt("send_event[{0}]: ", sel), $target.get(0));
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

      row("Play decks", "F1..F12");
      row("Play a card in your hand", "1..9");
      row("Play pinned cards", "Q..P");
      row("Me tab", "Z");
      row("More tab", "X");
      row("Items tab", "C");
      row("Storylet: select action", "1..9");
      row("Storylet: select only action", "SPACE");
      row("Storylet: perhaps not", "N / ESC");
      row("Storylet: onwards", "O / SPACE");

      d.Init();
      d.SetContent("<table>" + r.join("") + "</table>");
      d.Open();
    }


    function show_major_laterals() {
      $("#char header > p:gt(2)")
        .remove();

      $("#MajorLaterals-list h3").each(function() {
        $("<p class='char-actions char-details text-shadow'>")
          .text($(this).text())
          .appendTo("#char header");
      });
    }


    // ----------------------------------

    var logger = new _Logger();

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

      sel = get_ranged_selector(ev, KEYS_ROW_Z, "#tabs-char li:eq({0}) a");
      if (send_event(sel)) {
        $("#toggleCatStory")
          .children("i")
            .attr("class", "icon-minus-sign")
            .end()
          .next()
            .show();
        return false;
      }

      if ($("#decks-container").length > 0) {
        logger.info("On decks page");

        sel = get_ranged_selector(ev, KEYS_ROW_F, "#deck-list-item-link{0}");
        if (send_event(sel)) {
          return false;
        }

        if ($("#hand-list .card-full").length > 0) {
          sel = get_ranged_selector(ev, KEYS_ROW_1, "#hand-list-item-link{0}");
        }
        else {
          sel = get_ranged_selector(ev, KEYS_ROW_1, "#deck-list-item-link{0}");
        }
        if (send_event(sel)) {
          return false;
        }

        sel = get_ranged_selector(ev, KEYS_ROW_Q, "#library-list-item-link{0}");
        if (send_event(sel)) {
          return false;
        }
      }

      else if ($("#storylet-choices:not(.post-choice)").length > 0) {
        logger.info("On storylet intro page");

        if (ev.which == Keys.N || ev.which == Keys.ESC) {
          send_event("#storylet-choices-button-back");
          // FL: #perhapsnotbtn
          return false;
        }

        if (ev.which == Keys.SPACE && $("#storylet-choices form").length == 1) {
          if (send_event("#storylet-choices form", "submit")) {
            return false;
          }
        }

        sel = get_ranged_selector(ev, KEYS_ROW_1, "#storylet-choices form:eq({0})");
        // FL: .storylet form:eq({0})
        if (send_event(sel, "submit")) {
          return false;
        }
      }

      else if ($("#storylet-choices.post-choice").length > 0) {
        logger.info("On storylet result page");

        if (ev.which == Keys.O || ev.which == Keys["1"]) {
          send_event("#storylet-finished-button");
          return false;
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
