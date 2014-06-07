// ==UserScript==
// @name        Virtual Keyboard Interface
// @copyright   2007+, GreyWyvern (http://www.greywyvern.com/code/javascript/keyboard)
// @namespace   http://www.greywyvern.com/
// @version     1.32
// @author      GreyWyvern
// @mender    xxtzz2z 
// @description Adds a virtual keyboard to text fields, password fields and textareas allowing keyboardless input of text and special characters.  Install the script and double-click on one of the form element types above to display the keyboard.
// @ujs:documentation [Chinese] http://bbs.operachina.com/viewtopic.php?f=41&t=34560
// ==/UserScript==

window.addEventListener('load', function() {
  function VKI_buildKeyboardInputsUserScript() {
    var self = this;

    this.VKI_version = "1.32";
    this.VKI_showVersion = false;
    this.VKI_target = this.VKI_visible = false;
    this.VKI_shift = this.VKI_shiftlock = false;
    this.VKI_altgr = this.VKI_altgrlock = false;
    this.VKI_switcher = true; // show the position switcher
    this.VKI_above = 0; // 0 = below the input, 1 = above
    this.VKI_dead = false;
    this.VKI_deadkeysOn = false;
    this.VKI_kt = "US Int'l";  // Default keyboard layout
    this.VKI_clearPasswords = false;  // Clear password fields on focus
    this.VKI_imageURI = "keyboard.png";
    this.VKI_clickless = 0;  // 0 = disabled, > 0 = delay in ms
    this.VKI_keyCenter = 3;

    this.VKI_isIE = /*@cc_on!@*/false;
    this.VKI_isIE6 = /*@if(@_jscript_version == 5.6)!@end@*/false;
    this.VKI_isIElt8 = /*@if(@_jscript_version < 5.8)!@end@*/false;
    this.VKI_isMoz = (navigator.product == "Gecko");
    this.VKI_isWebKit = RegExp("KHTML").test(navigator.userAgent);


    /* ***** Create keyboards ************************************** */
    this.VKI_layout = {};

    this.VKI_layout.Numpad = [ // Number pad
      [["$"], ["\u00a3"], ["\u20ac"], ["\u00a5"], ["/"], ["^"], ["Bksp", "Bksp"]],
      [["."], ["7"], ["8"], ["9"], ["*"], ["<"], ["("], ["["]],
      [["="], ["4"], ["5"], ["6"], ["-"], [">"], [")"], ["]"]],
      [["0"], ["1"], ["2"], ["3"], ["+"], ["Enter", "Enter"]],
      [[" "]]
    ];
    this.VKI_layout.Numpad.DDK = true;

    this.VKI_layout["US Int'l"] = [ // US International Keyboard
      [["`", "~"], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u00e4", "\u00c4"], ["w", "W", "\u00e5", "\u00c5"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R", "\u00ae"], ["t", "T", "\u00fe", "\u00de"], ["y", "Y", "\u00fc", "\u00dc"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P", "\u00f6", "\u00d6"], ["[", "{", "\u00ab"], ["]", "}", "\u00bb"], ["\\", "|", "\u00ac", "\u00a6"]],
      [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S", "\u00df", "\u00a7"], ["d", "D", "\u00f0", "\u00d0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u00f8", "\u00d8"], [";", ":", "\u00b6", "\u00b0"], ["'", '"', "\u00b4", "\u00a8"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u00e6", "\u00c6"], ["x", "X"], ["c", "C", "\u00a9", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N", "\u00f1", "\u00d1"], ["m", "M", "\u00b5"], [",", "<", "\u00e7", "\u00c7"], [".", ">"], ["/", "?", "\u00bf"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ];


    /* ***** Define Dead Keys ************************************** */
    this.VKI_deadkey = {};

    /* ***** Define Symbols **************************************** */
    this.VKI_symbol = {
      '\u200c': "ZW\r\nNJ", '\u200d': "ZW\r\nJ"
    };



    /* ****************************************************************
     * Attach the keyboard to an element
     *
     */
    this.VKI_attachKeyboardUserScript = function(elem) {
      if (elem.VKI_attached) return false;
      elem.addEventListener('dblclick', function() { self.VKI_show(this); }, false);
      elem.VKI_attachedUserScript = true;
      if (this.VKI_isIE) {
        elem.onclick = elem.onselect = elem.onkeyup = function(e) {
          if ((e || event).type != "keyup" || !this.readOnly)
            this.range = document.selection.createRange();
        };
      }
    };


    /* ***** Find tagged input & textarea elements ***************** */
    var inputElems = [
      document.getElementsByTagName('input'),
      document.getElementsByTagName('textarea')
    ];
    for (var x = 0, elem; elem = inputElems[x++];)
      for (var y = 0, ex; ex = elem[y++];)
        if (ex.nodeName == "TEXTAREA" || ex.type == "text" || ex.type == "password")
          this.VKI_attachKeyboardUserScript(ex);

    document.documentElement.addEventListener('dblclick', (function(self) { return function(e) {
      e = e || event;
      if ((e.target.nodeName == "TEXTAREA" || e.target.type == "text" || e.target.type == "password") && !e.target.VKI_attachedUserScript) {
        self.VKI_attachKeyboardUserScript(e.target);
        self.VKI_show(e.target);
      }
    }})(this), false);


    /* ***** Build the keyboard interface ************************** */
    this.VKI_keyboard = document.createElement('table');
    this.VKI_keyboard.id = "keyboardInputMasterUserScript";
    this.VKI_keyboard.dir = "ltr";
    this.VKI_keyboard.cellSpacing = this.VKI_keyboard.border = "0";

    var thead = document.createElement('thead');
      var tr = document.createElement('tr');
        var th = document.createElement('th');
          var kblist = document.createElement('select');
            for (ktype in this.VKI_layout) {
              if (typeof this.VKI_layout[ktype] == "object") {
                var opt = document.createElement('option');
                    opt.value = ktype;
                    opt.appendChild(document.createTextNode(ktype));
                  kblist.appendChild(opt);
              }
            }
            if (kblist.options.length) {
                kblist.value = this.VKI_kt;
                kblist.addEventListener('change', function() {
                  self.VKI_kt = this.value;
                  self.VKI_buildKeys();
                  self.VKI_position();
                }, false);
              th.appendChild(kblist);
            }

            var label = document.createElement('label');
              var checkbox = document.createElement('input');
                  checkbox.type = "checkbox";
                  checkbox.title = "Dead keys: " + ((this.VKI_deadkeysOn) ? "On" : "Off");
                  checkbox.defaultChecked = this.VKI_deadkeysOn;
                  checkbox.addEventListener('click', function() {
                    self.VKI_deadkeysOn = this.checked;
                    this.title = "Dead keys: " + ((this.checked) ? "On" : "Off");
                    self.VKI_modify("");
                    return true;
                  }, false);
                label.appendChild(this.VKI_deadkeysElem = checkbox);
                  checkbox.checked = this.VKI_deadkeysOn;
            th.appendChild(label);
          tr.appendChild(th);

        var td = document.createElement('td');
          if (this.VKI_switcher) {
            var switcher = document.createElement('span');
                switcher.id = "keyboardInputSwitch";
                switcher.appendChild(document.createTextNode("\u21d1"));
                switcher.title = "Switch keyboard position";
                switcher.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
                switcher.addEventListener('mouseup', function() { this.className = ""; }, false);
                switcher.addEventListener('click', function() {
                  self.VKI_position(self.VKI_above ^= 1);
                  this.firstChild.nodeValue = (self.VKI_above) ? "\u21d3" : "\u21d1";
                  return false;
                }, false);
              td.appendChild(switcher);
          }

          var clearer = document.createElement('span');
              clearer.id = "keyboardInputClear";
              clearer.appendChild(document.createTextNode("Clear"));
              clearer.title = "Clear this input";
              clearer.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
              clearer.addEventListener('mouseup', function() { this.className = ""; }, false);
              clearer.addEventListener('click', function() {
                self.VKI_target.value = "";
                self.VKI_target.focus();
                return false;
              }, false);
            td.appendChild(clearer);

          var closer = document.createElement('span');
              closer.id = "keyboardInputClose";
              closer.appendChild(document.createTextNode('X'));
              closer.title = "Close this window";
              closer.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
              closer.addEventListener('mouseup', function() { this.className = ""; }, false);
              closer.addEventListener('click', function() { self.VKI_close(); }, false);
            td.appendChild(closer);

          tr.appendChild(td);
        thead.appendChild(tr);
    this.VKI_keyboard.appendChild(thead);

    var tbody = document.createElement('tbody');
      var tr = document.createElement('tr');
        var td = document.createElement('td');
            td.colSpan = "2";
          var div = document.createElement('div');
              div.id = "keyboardInputLayout";
            td.appendChild(div);
          if (this.VKI_showVersion) {
            var div = document.createElement('div');
              var ver = document.createElement('var');
                  ver.appendChild(document.createTextNode("v" + this.VKI_version));
                div.appendChild(ver);
              td.appendChild(div);
          }
          tr.appendChild(td);
        tbody.appendChild(tr);
    this.VKI_keyboard.appendChild(tbody);

    if (this.VKI_isIE6) {
      this.VKI_iframe = document.createElement('iframe');
      this.VKI_iframe.style.position = "absolute";
      this.VKI_iframe.style.border = "0px none";
      this.VKI_iframe.style.filter = "mask()";
      this.VKI_iframe.style.zIndex = "999999";
      this.VKI_iframe.src = this.VKI_imageURI;
    }


    /* ****************************************************************
     * Build or rebuild the keyboard keys
     *
     */
    this.VKI_buildKeys = function() {
      this.VKI_shift = this.VKI_shiftlock = this.VKI_altgr = this.VKI_altgrlock = this.VKI_dead = false;
      this.VKI_deadkeysOn = (this.VKI_layout[this.VKI_kt].DDK) ? false : this.VKI_keyboard.getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked;

      var container = this.VKI_keyboard.tBodies[0].getElementsByTagName('div')[0];
      while (container.firstChild) container.removeChild(container.firstChild);

      for (var x = 0, hasDeadKey = false, lyt; lyt = this.VKI_layout[this.VKI_kt][x++];) {
        var table = document.createElement('table');
            table.cellSpacing = table.border = "0";
        if (lyt.length <= this.VKI_keyCenter) table.className = "keyboardInputCenter";
          var tbody = document.createElement('tbody');
            var tr = document.createElement('tr');
            for (var y = 0, lkey; lkey = lyt[y++];) {
              var td = document.createElement('td');
                if (this.VKI_symbol[lkey[0]]) {
                  var span = document.createElement('span');
                      span.className = lkey[0];
                      span.appendChild(document.createTextNode(this.VKI_symbol[lkey[0]]));
                    td.appendChild(span);
                } else td.appendChild(document.createTextNode(lkey[0] || "\xa0"));

                var className = [];
                if (this.VKI_deadkeysOn)
                  for (key in this.VKI_deadkey)
                    if (key === lkey[0]) { className.push("alive"); break; }
                if (lyt.length > this.VKI_keyCenter && y == lyt.length) className.push("last");
                if (lkey[0] == " ") className.push("space");
                  td.className = className.join(" ");

                  td.VKI_clickless = 0;
                  if (!td.click) {
                    td.click = function() {
                      var evt = this.ownerDocument.createEvent('MouseEvents');
                      evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                      this.dispatchEvent(evt);
                    };
                  }
                  td.addEventListener('mouseover', function() {
                    if (self.VKI_clickless) {
                      var _self = this;
                      clearTimeout(this.VKI_clickless);
                      this.VKI_clickless = setTimeout(function() { _self.click(); }, self.VKI_clickless);
                    }
                    if ((this.firstChild.nodeValue || this.firstChild.className) != "\xa0") this.className += " hover";
                  }, false);
                  td.addEventListener('mouseout', function() {
                    if (self.VKI_clickless) clearTimeout(this.VKI_clickless);
                    this.className = this.className.replace(/ ?(hover|pressed)/g, "");
                  }, false);
                  td.addEventListener('mousedown', function() {
                    if (self.VKI_clickless) clearTimeout(this.VKI_clickless);
                    if ((this.firstChild.nodeValue || this.firstChild.className) != "\xa0") this.className += " pressed";
                  }, false);
                  td.addEventListener('mouseup', function() {
                    if (self.VKI_clickless) clearTimeout(this.VKI_clickless);
                    this.className = this.className.replace(/ ?pressed/g, "");
                  }, false);
                  td.addEventListener('dblclick', function() { return false; }, false);

                switch (lkey[1]) {
                  case "Caps": case "Shift":
                  case "Alt": case "AltGr": case "AltLk":
                    td.addEventListener('click', (function(type) { return function() { self.VKI_modify(type); return false; }})(lkey[1]), false);
                    break;
                  case "Tab":
                    td.addEventListener('click', function() { self.VKI_insert("\t"); return false; }, false);
                    break;
                  case "Bksp":
                    td.addEventListener('click', function() {
                      self.VKI_target.focus();
                      if (self.VKI_target.setSelectionRange) {
                        if (self.VKI_target.readOnly && self.VKI_isWebKit) {
                          var rng = [self.VKI_target.selStart || 0, self.VKI_target.selEnd || 0];
                        } else var rng = [self.VKI_target.selectionStart, self.VKI_target.selectionEnd];
                        if (rng[0] < rng[1]) rng[0]++;
                        self.VKI_target.value = self.VKI_target.value.substr(0, rng[0] - 1) + self.VKI_target.value.substr(rng[1]);
                        self.VKI_target.setSelectionRange(rng[0] - 1, rng[0] - 1);
                        if (self.VKI_target.readOnly && self.VKI_isWebKit) {
                          var range = window.getSelection().getRangeAt(0);
                          self.VKI_target.selStart = range.startOffset;
                          self.VKI_target.selEnd = range.endOffset;
                        }
                      } else if (self.VKI_target.createTextRange) {
                        try {
                          self.VKI_target.range.select();
                        } catch(e) { self.VKI_target.range = document.selection.createRange(); }
                        if (!self.VKI_target.range.text.length) self.VKI_target.range.moveStart('character', -1);
                        self.VKI_target.range.text = "";
                      } else self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
                      if (self.VKI_shift) self.VKI_modify("Shift");
                      if (self.VKI_altgr) self.VKI_modify("AltGr");
                      self.VKI_target.focus();
                      return true;
                    }, false);
                    break;
                  case "Enter":
                    td.addEventListener('click', function() {
                      if (self.VKI_target.nodeName != "TEXTAREA") {
                        self.VKI_close();
                        this.className = this.className.replace(/ ?(hover|pressed)/g, "");
                      } else self.VKI_insert("\n");
                      return true;
                    }, false);
                    break;
                  default:
                    td.addEventListener('click', function() {
                      var character = this.firstChild.nodeValue || this.firstChild.className;
                      if (self.VKI_deadkeysOn && self.VKI_dead) {
                        if (self.VKI_dead != character) {
                          for (key in self.VKI_deadkey) {
                            if (key == self.VKI_dead) {
                              if (character != " ") {
                                for (var z = 0, rezzed = false, dk; dk = self.VKI_deadkey[key][z++];) {
                                  if (dk[0] == character) {
                                    self.VKI_insert(dk[1]);
                                    rezzed = true;
                                    break;
                                  }
                                }
                              } else {
                                self.VKI_insert(self.VKI_dead);
                                rezzed = true;
                              } break;
                            }
                          }
                        } else rezzed = true;
                      } self.VKI_dead = false;

                      if (!rezzed && character != "\xa0") {
                        if (self.VKI_deadkeysOn) {
                          for (key in self.VKI_deadkey) {
                            if (key == character) {
                              self.VKI_dead = key;
                              this.className += " dead";
                              if (self.VKI_shift) self.VKI_modify("Shift");
                              if (self.VKI_altgr) self.VKI_modify("AltGr");
                              break;
                            }
                          }
                          if (!self.VKI_dead) self.VKI_insert(character);
                        } else self.VKI_insert(character);
                      }

                      self.VKI_modify("");
                      return false;
                    }, false);

                }
                tr.appendChild(td);
              tbody.appendChild(tr);
            table.appendChild(tbody);

            for (var z = 0; z < 4; z++)
              if (this.VKI_deadkey[lkey[z] = lkey[z] || "\xa0"]) hasDeadKey = true;
        }
        container.appendChild(table);
      }
      this.VKI_deadkeysElem.style.display = (!this.VKI_layout[this.VKI_kt].DDK && hasDeadKey) ? "inline" : "none";
    };

    this.VKI_buildKeys();
    VKI_disableSelection(this.VKI_keyboard);


    /* ****************************************************************
     * Controls modifier keys
     *
     */
    this.VKI_modify = function(type) {
      switch (type) {
        case "Alt":
        case "AltGr": this.VKI_altgr = !this.VKI_altgr; break;
        case "AltLk": this.VKI_altgrlock = !this.VKI_altgrlock; break;
        case "Caps": this.VKI_shiftlock = !this.VKI_shiftlock; break;
        case "Shift": this.VKI_shift = !this.VKI_shift; break;
      } var vchar = 0;
      if (!this.VKI_shift != !this.VKI_shiftlock) vchar += 1;
      if (!this.VKI_altgr != !this.VKI_altgrlock) vchar += 2;

      var tables = this.VKI_keyboard.getElementsByTagName('table');
      for (var x = 0; x < tables.length; x++) {
        var tds = tables[x].getElementsByTagName('td');
        for (var y = 0; y < tds.length; y++) {
          var className = [], lkey = this.VKI_layout[this.VKI_kt][x][y];

          if (tds[y].className.indexOf('hover') > -1) className.push("hover");

          switch (lkey[1]) {
            case "Alt":
            case "AltGr":
              if (this.VKI_altgr) className.push("dead");
              break;
            case "AltLk":
              if (this.VKI_altgrlock) className.push("dead");
              break;
            case "Shift":
              if (this.VKI_shift) className.push("dead");
              break;
            case "Caps":
              if (this.VKI_shiftlock) className.push("dead");
              break;
            case "Tab": case "Enter": case "Bksp": break;
            default:
              if (type) {
                tds[y].removeChild(tds[y].firstChild);
                if (this.VKI_symbol[lkey[vchar]]) {
                  var span = document.createElement('span');
                      span.className = lkey[vchar];
                      span.appendChild(document.createTextNode(this.VKI_symbol[lkey[vchar]]));
                    tds[y].appendChild(span);
                } else tds[y].appendChild(document.createTextNode(lkey[vchar]));
              }
              if (this.VKI_deadkeysOn) {
                var character = tds[y].firstChild.nodeValue || tds[y].firstChild.className;
                if (this.VKI_dead) {
                  if (character == this.VKI_dead) className.push("dead");
                  for (var z = 0; z < this.VKI_deadkey[this.VKI_dead].length; z++) {
                    if (character == this.VKI_deadkey[this.VKI_dead][z][0]) {
                      className.push("target");
                      break;
                    }
                  }
                }
                for (key in this.VKI_deadkey)
                  if (key === character) { className.push("alive"); break; }
              }
          }

          if (y == tds.length - 1 && tds.length > this.VKI_keyCenter) className.push("last");
          if (lkey[0] == " ") className.push("space");
          tds[y].className = className.join(" ");
        }
      }
    };


    /* ****************************************************************
     * Insert text at the cursor
     *
     */
    this.VKI_insert = function(text) {
      this.VKI_target.focus();
      if (this.VKI_target.maxLength) this.VKI_target.maxlength = this.VKI_target.maxLength;
      if (typeof this.VKI_target.maxlength == "undefined" ||
          this.VKI_target.maxlength < 0 ||
          this.VKI_target.value.length < this.VKI_target.maxlength) {
        if (this.VKI_target.setSelectionRange) {
          if (this.VKI_target.readOnly && this.VKI_isWebKit) {
            var rng = [this.VKI_target.selStart || 0, this.VKI_target.selEnd || 0];
          } else var rng = [this.VKI_target.selectionStart, this.VKI_target.selectionEnd];
          this.VKI_target.value = this.VKI_target.value.substr(0, rng[0]) + text + this.VKI_target.value.substr(rng[1]);
          if (text == "\n" && window.opera) rng[0]++;
          this.VKI_target.setSelectionRange(rng[0] + text.length, rng[0] + text.length);
          if (this.VKI_target.readOnly && this.VKI_isWebKit) {
            var range = window.getSelection().getRangeAt(0);
            this.VKI_target.selStart = range.startOffset;
            this.VKI_target.selEnd = range.endOffset;
          }
        } else if (this.VKI_target.createTextRange) {
          try {
            this.VKI_target.range.select();
          } catch(e) { this.VKI_target.range = document.selection.createRange(); }
          this.VKI_target.range.text = text;
          this.VKI_target.range.collapse(true);
          this.VKI_target.range.select();
        } else this.VKI_target.value += text;
        if (this.VKI_shift) this.VKI_modify("Shift");
        if (this.VKI_altgr) this.VKI_modify("AltGr");
        this.VKI_target.focus();
      } else if (this.VKI_target.createTextRange && this.VKI_target.range)
        this.VKI_target.range.select();
    };


    /* ****************************************************************
     * Show the keyboard interface
     *
     */
    this.VKI_show = function(elem) {
      if (this.VKI_target = elem) {
        if (this.VKI_visible != elem) {
          if (this.VKI_isIE) {
            if (!this.VKI_target.range) {
              this.VKI_target.range = this.VKI_target.createTextRange();
              this.VKI_target.range.moveStart('character', this.VKI_target.value.length);
            } this.VKI_target.range.select();
          }
          try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}
          if (this.VKI_clearPasswords && this.VKI_target.type == "password") this.VKI_target.value = "";

          var elem = this.VKI_target;
          this.VKI_target.keyboardPosition = "absolute";
          do {
            if (VKI_getStyle(elem, "position") == "fixed") {
              this.VKI_target.keyboardPosition = "fixed";
              break;
            }
          } while (elem = elem.offsetParent);

          if (this.VKI_isIE6) document.body.appendChild(this.VKI_iframe);
          document.body.appendChild(this.VKI_keyboard);
          this.VKI_keyboard.style.top = this.VKI_keyboard.style.right = this.VKI_keyboard.style.bottom = this.VKI_keyboard.style.left = "auto";
          this.VKI_keyboard.style.position = this.VKI_target.keyboardPosition;

          this.VKI_visible = this.VKI_target;
          this.VKI_position();
          this.VKI_target.focus();
        } else this.VKI_close();
      }
    };


    /* ****************************************************************
     * Position the keyboard
     *
     */
    this.VKI_position = function(above) {
      if (typeof above == "undefined") above = self.VKI_above;
      if (self.VKI_visible) {
        var inputElemPos = VKI_findPos(self.VKI_target);
        above = (above) ? -self.VKI_keyboard.offsetHeight - 3 : self.VKI_target.offsetHeight + 3;
        self.VKI_keyboard.style.top = inputElemPos[1] - ((self.VKI_target.keyboardPosition == "fixed" && !self.VKI_isIE && !self.VKI_isMoz) ? VKI_scrollDist()[1] : 0) + above + "px";
        self.VKI_keyboard.style.left = Math.min(VKI_innerDimensions()[0] - self.VKI_keyboard.offsetWidth - 15, inputElemPos[0]) + "px";
        if (self.VKI_isIE6) {
          self.VKI_iframe.style.width = self.VKI_keyboard.offsetWidth + "px";
          self.VKI_iframe.style.height = self.VKI_keyboard.offsetHeight + "px";
          self.VKI_iframe.style.top = self.VKI_keyboard.style.top;
          self.VKI_iframe.style.left = self.VKI_keyboard.style.left;
        }
      }
    };


    if (window.addEventListener) {
      window.addEventListener('resize', this.VKI_position, false);
    } else if (window.attachEvent)
      window.attachEvent('onresize', this.VKI_position);


    /* ****************************************************************
     * Close the keyboard interface
     *
     */
    this.VKI_close = function() {
      if (this.VKI_visible) {
        try {
          this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard);
          if (this.VKI_isIE6) this.VKI_iframe.parentNode.removeChild(this.VKI_iframe);
        } catch (e) {}
        this.VKI_target.focus();
        this.VKI_target = this.VKI_visible = false;
      }
    };
  };

  function VKI_findPos(obj) {
    var curleft = curtop = 0;
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curleft, curtop];
  }

  function VKI_innerDimensions() {
    if (self.innerHeight) {
      return [self.innerWidth, self.innerHeight];
    } else if (document.documentElement && document.documentElement.clientHeight) {
      return [document.documentElement.clientWidth, document.documentElement.clientHeight];
    } else if (document.body)
      return [document.body.clientWidth, document.body.clientHeight];
    return [0, 0];
  }

  function VKI_scrollDist() {
    var html = document.getElementsByTagName('html')[0];
    if (html.scrollTop && document.documentElement.scrollTop) {
      return [html.scrollLeft, html.scrollTop];
    } else if (html.scrollTop || document.documentElement.scrollTop)
      return [html.scrollLeft + document.documentElement.scrollLeft, html.scrollTop + document.documentElement.scrollTop];
    return [0, 0];
  }

  function VKI_getStyle(obj, styleProp) {
    if (obj.currentStyle) {
      var y = obj.currentStyle[styleProp];
    } else if (window.getComputedStyle)
      var y = window.getComputedStyle(obj, null)[styleProp];
    return y;
  }

  function VKI_disableSelection(elem) {
    elem.onselectstart = function() { return false; };
    elem.unselectable = "on";
    elem.style.MozUserSelect = "none";
    elem.style.cursor = "default";
    if (window.opera) elem.onmousedown = function() { return false; };
  }


  var VKI_link = document.createElement('link');
      VKI_link.setAttribute('rel', "stylesheet");
      VKI_link.setAttribute('type', "text/css");
      VKI_link.setAttribute('href', "data:text/css,#keyboardInputMasterUserScript {\
  position:absolute;\
  border-top:2px solid #eeeeee;\
  border-right:2px solid #6e6e6e;\
  border-bottom:2px solid #6e6e6e;\
  border-left:2px solid #eeeeee;\
  border-radius:5px;\
  box-shadow:0px 2px 10px #444444;\
  opacity:0.9;\
  color:#000000;\
  background-color:#dddddd;\
  text-align:left;\
  z-index:1000000;\
  width:auto;\
  margin:0px;\
  font:normal 11px Arial,sans-serif;\
  line-height:1;\
}\
#keyboardInputMasterUserScript * {\
  color:#000000;\
  background:transparent;\
  font:normal 11px Arial,sans-serif;\
  margin:0px;\
  padding:0px;\
  border:0px none;\
  outline:0px;\
  vertical-align:baseline;\
}\
\
#keyboardInputMasterUserScript thead tr th {\
  text-align:left;\
  padding:2px 5px 2px 4px;\
  background-color:inherit;\
}\
#keyboardInputMasterUserScript thead tr th select {\
  margin-right:5px;\
  border:1px inset #888888;\
  background-color:#f6f6f6;\
}\
#keyboardInputMasterUserScript thead tr th label input {\
  width:12px;\
  height:12px;\
  margin-right:5px;\
  vertical-align:middle;\
}\
#keyboardInputMasterUserScript thead tr td {\
  text-align:right;\
  vertical-align:middle;\
  padding:2px 4px 2px 5px;\
}\
#keyboardInputMasterUserScript thead tr td span {\
  padding:2px 4px;\
  font-weight:bold;\
  border-top:1px solid #e5e5e5;\
  border-right:1px solid #5d5d5d;\
  border-bottom:1px solid #5d5d5d;\
  border-left:1px solid #e5e5e5;\
  background-color:#cccccc;\
  cursor:pointer;\
}\
\
#keyboardInputMasterUserScript tbody tr td {\
  text-align:left;\
  padding:0px 4px 3px 4px;\
}\
#keyboardInputMasterUserScript tbody tr td div {\
  text-align:center;\
  position:relative;\
  height:0px;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout {\
  height:auto;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table {\
  height:20px;\
  white-space:nowrap;\
  width:100%;\
  border-collapse:separate;\
  border-spacing:0px;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table.keyboardInputCenter {\
  width:auto;\
  margin:0px auto;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td {\
  vertical-align:middle;\
  padding:0px 5px;\
  white-space:pre;\
  font-family:'Lucida Console',monospace;\
  border-top:1px solid #e5e5e5;\
  border-right:1px solid #5d5d5d;\
  border-bottom:1px solid #5d5d5d;\
  border-left:1px solid #e5e5e5;\
  background-color:#eeeeee;\
  cursor:default;\
  min-width:0.75em;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.last {\
  width:99%;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.space {\
  padding:0px 45px;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.alive {\
  background-color:#ccccdd;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.target {\
  background-color:#ddddcc;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.hover {\
  border-top:1px solid #d5d5d5;\
  border-right:1px solid #555555;\
  border-bottom:1px solid #555555;\
  border-left:1px solid #d5d5d5;\
  background-color:#cccccc;\
}\
#keyboardInputMasterUserScript thead tr td span.pressed,\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.pressed,\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.dead {\
  border-top:1px solid #555555;\
  border-right:1px solid #d5d5d5;\
  border-bottom:1px solid #d5d5d5;\
  border-left:1px solid #555555;\
  background-color:#cccccc;\
}\
\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td span {\
  display:block;\
  text-align:center;\
  font-size:0.6em;\
}\
\
#keyboardInputMasterUserScript tbody tr td div var {\
  position:absolute;\
  bottom:0px;\
  right:0px;\
  font-weight:bold;\
  font-style:italic;\
  color:#444444;\
}");

  var VKI_head = VKI_title = 0;
  try {
    if (VKI_head = document.getElementsByTagName('head')[0]) {
      VKI_head.appendChild(VKI_link);
    } else if (VKI_title = document.getElementByTagName('title')[0])
      VKI_title.parentNode.insertBefore(VKI_link, VKI_title);
  } catch(e) {}

  if (VKI_head || VKI_title) VKI_buildKeyboardInputsUserScript();
}, false);