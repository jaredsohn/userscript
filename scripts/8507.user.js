// ==UserScript==
// @name            Google Calendar Header and Navigation Switcher
// @namespace       http://d.hatena.ne.jp/margin/
// @description     Can switch display of the header and the navigation bar by click triangle icon on top or on left.
// @include         http://calendar.google.tld/*
// @include         https://calendar.google.tld/*
// @include         http://www.google.tld/calendar*
// @include         https://www.google.tld/calendar*
// @include         http://google.tld/calendar*
// @include         https://google.tld/calendar*
// @version         0.1.11
// @author          yooskeh
// @homepage        http://d.hatena.ne.jp/margin/
// ==/UserScript==

// class DisplaySwitcher

function DisplaySwitcher(id, selector, onSwitch) {
  this.id = id;
  this.selector = selector;
  this.onSwitch = onSwitch || function(){};

  this.style = document.createElement("style");
  this.style.type = "text/css";
  document.getElementsByTagName("head")[0].appendChild(this.style);

  this.switchButton = document.createElement("div");
  this.switchButton.id = id + "SwitchButton";
  var self = this;
  this.switchButton.addEventListener("click", function() {
    self.toggle.call(self);
  }, false);
  document.body.appendChild(this.switchButton);

  var init = GM_getValue(this.id + "Init", "last");
  GM_setValue(this.id, !(init == "last" ? GM_getValue(this.id) : init == "hide"));
  this.toggle();
}
DisplaySwitcher.prototype.isHide = function() {
  return GM_getValue(this.id);
};
DisplaySwitcher.prototype.toggle = function() {
  GM_setValue(this.id, !GM_getValue(this.id));
  var hide = this.isHide();
  this.style.innerHTML = hide ? this.selector+"{display:none;}" : "";
  this.switchButton.className = hide ? "closed" : "opened";
  setTimeout(this.onSwitch, 0);
};
DisplaySwitcher.prototype.show = function() {
  this.isHide() && this.toggle();
};
DisplaySwitcher.prototype.hide = function() {
  this.isHide() || this.toggle();
};

// initialize

window.addEventListener("load", function() {
  if (!document.getElementById("nav"))
    return;

  /*
  var onResize = false;
  for (var k in unsafeWindow) {
    var f = unsafeWindow[k];
    if (typeof f == "function" && typeof f.resizeId == "number") {
      onResize = function(){ f(f.resizeId); };
      break;
    }
  }
  if (!onResize) {
    onResize = function() {
      var mainbody = document.getElementById("mainbody");
      if (mainbody && mainbody.style.display != "none") {
        unsafeWindow._SR_backToCalendar();
      }
    }
  }
  */

  function refleshCal() {
    var m = document.getElementById("mainbody");
    if (m && m.style.display != "none") {
      unsafeWindow._SR_backToCalendar();
    }
  }

  var head = new DisplaySwitcher("head", "#topBar,#cornerBookmarks,#gbar,#gbarl,#guser,#ft+.s,.gbh",
                                 refleshCal);
  var navi = new DisplaySwitcher("navi", "#nav", function() {
    var tc_top = document.getElementById("tc_top");
    if (tc_top) {
      tc_top.style.display = "none";
      refleshCal();
      tc_top.style.display = "";
      refleshCal();
    }
  });

  var headKeyDefault = uneval({code:90,ctrl:false,shift:true});
  var naviKeyDefault = uneval({code:90,ctrl:false,shift:false});
  var noKeyboard = uneval({code:-1,ctrl:false,shift:false});

  var Key = {
    headKey: eval(GM_getValue("headKey", headKeyDefault)),
    naviKey: eval(GM_getValue("naviKey", naviKeyDefault))
  };
  GM_setValue("headKey", uneval(Key.headKey));
  GM_setValue("naviKey", uneval(Key.naviKey));

  function checkKey(e, key) {
    return e.keyCode  == key.code    &&
           e.shiftKey == !!key.shift &&
           e.ctrlKey  == !!key.ctrl;
  }

  GM_setValue("headInit", GM_getValue("headInit", "last"));
  GM_setValue("naviInit", GM_getValue("naviInit", "last"));

  document.addEventListener("keydown", function(e) {
    if (/input|textarea/i.test(e.target.tagName))
      return;
    if (e.keyCode == 191) head.show();
    if (checkKey(e, Key.headKey)) {
      head.toggle();
      e.preventDefault();
    }
    if (checkKey(e, Key.naviKey)) {
      navi.toggle();
      e.preventDefault();
    }
  }, true);

  // from hotkey.js
  function code2char(code) {
    function between(a, b) { return a <= code && code <= b; }
    var _32_40 = "Space PageUp PageDown End Home Left Up Right Down".split(" ");
    var table = {
      8  : "Back",
      9  : "Tab"  ,
      13 : "Enter",
      16 : "Shift",
      17 : "Ctrl",
      46 : "Delete"
    };
    return (
      between(65, 90)  ? String.fromCharCode(code+32) : // a-z
      between(48, 57)  ? String.fromCharCode(code) :    // 0-9
      between(96, 105) ? String.fromCharCode(code-48) : // num 0-9
      between(32, 40)  ? _32_40[code-32] :
      table.hasOwnProperty(code) ? table[code] :
      null
    );
  }

  function key2str(key) {
    var m = "";
    if (!!key.ctrl && key.code != 17) m += "Ctrl + ";
    if (!!key.shift && key.code != 16) m += "Shift + ";
    var c = code2char(key.code);
    return c ? m + c : "";
  }

  function $(id) { return document.getElementById(id); }

  function builder() {
    var table = document.createElement("table");
    table.createCaption().innerHTML = "Setting for Header and Sidebar Switcher";
    table.insertRow(-1).innerHTML = <>
      <th>Default state of header</th>
      <td>
        <select name="headInit">
          <option id="headInitShow" value="show">Show</option>
          <option id="headInitHide" value="hide">Hide</option>
          <option id="headInitLast" value="last">Same as last time</option>
        </select>
      </td>
    </>.toXMLString();
    table.insertRow(-1).innerHTML = <>
      <th>Default state of sidebar</th>
      <td>
        <select name="naviInit">
          <option id="naviInitShow" value="show">Show</option>
          <option id="naviInitHide" value="hide">Hide</option>
          <option id="naviInitLast" value="last">Same as last time</option>
        </select>
      </td>
    </>.toXMLString();
    table.insertRow(-1).innerHTML = <>
      <th>Keyboard shortcut to toggle header</th>
      <td>
        <input class="text" size="12" id="headKeyInput" value={key2str(Key.headKey)}/>
        <input type="hidden" id="headKey" name="headKey" value={uneval(Key.headKey)}/>
      </td>
    </>.toXMLString();
    table.insertRow(-1).innerHTML = <>
      <th>Keyboard shortcut to toggle sidebar</th>
      <td>
        <input class="text" size="12" id="naviKeyInput" value={key2str(Key.naviKey)}/>
        <input type="hidden" id="naviKey" name="naviKey" value={uneval(Key.naviKey)}/>
      </td>
    </>.toXMLString();

    setTimeout(function() {
      var headInit = GM_getValue("headInit");
      headInit == "show" ? $("headInitShow").selected = true :
      headInit == "hide" ? $("headInitHide").selected = true :
                           $("headInitLast").selected = true;
      var naviInit = GM_getValue("naviInit");
      naviInit == "show" ? $("naviInitShow").selected = true :
      naviInit == "hide" ? $("naviInitHide").selected = true :
                           $("naviInitLast").selected = true;
      $("headKeyInput").addEventListener("keydown", function(e) {
        var key = {code:e.keyCode,ctrl:!!e.ctrlKey,shift:!!e.shiftKey};
        e.target.value = key2str(key);
        if (!!e.target.value)
          $("headKey").value = uneval(key);
        e.preventDefault();
        e.stopPropagation();
      }, false);
      $("naviKeyInput").addEventListener("keydown", function(e) {
        var key = {code:e.keyCode,ctrl:!!e.ctrlKey,shift:!!e.shiftKey};
        e.target.value = key2str(key);
        if (!!e.target.value)
          $("naviKey").value = uneval(key);
        e.preventDefault();
        e.stopPropagation();
      }, false);
    }, 1);

    return table;
  }

  function onSave(data) {
    GM_setValue("headInit", data.headInit);
    GM_setValue("naviInit", data.naviInit);
    var hKey = !$("headKeyInput").value ? noKeyboard : data.headKey;
    var nKey = !$("naviKeyInput").value ? noKeyboard : data.naviKey;
    GM_setValue("headKey", hKey);
    GM_setValue("naviKey", nKey);
    Key.headKey = eval(hKey);
    Key.naviKey = eval(nKey);
  }

  function onCancel(data, text) {
    if (data.headInit != GM_getValue("headInit") ||
        data.naviInit != GM_getValue("naviInit") ||
        data.headKey  != GM_getValue("headKey") ||
        data.naviKey  != GM_getValue("naviKey")) {
      return confirm("Your changes have not been saved.");
    }
  }

  var setting = new SettingPanel(builder, onSave, onCancel);
  GM_registerMenuCommand("Setting for Header and Sidebar Switcher", function() {
    setting.open();
  });
  unsafeWindow.__GCalSettingPanel_addHook(function(currentId) {
    var a = document.createElement("a");
    a.addEventListener("click", function(){setting.open();}, false);
    a.innerHTML = "Header/Sidebar";
    setTimeout(function(){
      var stabs = document.getElementById("stabs");
      stabs.rows[0].insertCell(-1).appendChild(a);
    }, 300);
  });

  // Styles for Switch Button
  GM_addStyle(<><![CDATA[
    #naviSwitchButton, #headSwitchButton {
      position: absolute;
      width: 0;
      height: 0;
      border: 12px none transparent;
      -moz-border-radius:  2px;
      cursor: pointer;
      -moz-opacity: 0.3;
    }
    #naviSwitchButton:hover, #headSwitchButton:hover {
      -moz-opacity: 0.6;
    }
    #naviSwitchButton {
      top: 49%;
      left: 0;
      border-style: solid none;
    }
    #naviSwitchButton.closed {
      border-left-style: solid;
      -moz-border-left-colors: transparent blue;
    }
    #naviSwitchButton.opened {
      border-right-style: solid;
      -moz-border-right-colors: transparent blue;
    }
    #headSwitchButton {
      top: 0;
      left: 49%;
      border-style: none solid;
    }
    #headSwitchButton.closed {
      border-top-style: solid;
      -moz-border-top-colors: transparent blue;
    }
    #headSwitchButton.opened {
      border-bottom-style: solid;
      -moz-border-bottom-colors: transparent blue;
    }
  ]]></>);
}, false);

/***** class SettingPanel *****/

function SettingPanel(builder, onSave, onCancel) {
  this.builder = builder;
  this.onSave = onSave;
  this.onCancel = onCancel;

  this.container = document.createElement("div");
  this.panel = document.createElement("div");

  var back = document.createElement("div");
  var center = document.createElement("div");
  var bottom = document.createElement("div");
  var savebtn = document.createElement("input");
  var cancelbtn = document.createElement("input");

  this.container.appendChild(back);
  center.appendChild(this.panel);
  bottom.appendChild(savebtn);
  bottom.appendChild(cancelbtn);
  center.appendChild(bottom);
  this.container.appendChild(center);

  savebtn.type = cancelbtn.type = "button";
  savebtn.value = "Save";
  cancelbtn.value = "Cancel";
  var self = this;
  savebtn.addEventListener("click", function(){self.clickSave()}, false);
  cancelbtn.addEventListener("click", function(){self.clickCancel()}, false);

  back.style.cssText = <><![CDATA[
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
    z-index: 100;
  ]]></>.toString();

  center.style.cssText = <><![CDATA[
    position: fixed;
    max-height: 90%;
    width: auto;
    max-width: 90%;
    overflow: auto;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 101;
    border: 5px solid silver;
    -moz-border-radius: 9px;
    padding: 4px;
  ]]></>.toString();

  bottom.style.cssText = <><![CDATA[
    text-align: center;
    margin-top: 3px;
    padding-top: 3px;
    border-top: 1px solid silver;
  ]]></>.toString();

  this.updatePosition = function() {
    center.style.top = Math.floor((back.clientHeight - center.clientHeight) / 2) + "px";
    center.style.left = Math.floor((back.clientWidth - center.clientWidth) / 2) + "px";
  }
  window.addEventListener("resize", this.updatePosition, false);
}
SettingPanel.prototype = {
  open: function() {
    this.panel.innerHTML = "";
    this.panel.appendChild(this.builder());
    document.body.appendChild(this.container);
    this.updatePosition();
  },
  close: function() {
    document.body.removeChild(this.container);
    this.panel.innerHTML = "";
  },
  clickSave: function() {
    var c = this.onSave(SettingPanel.getFormSetting(this.panel));
    if (c === undefined || !!c) {
      this.close();
    }
  },
  clickCancel: function() {
    var c = this.onCancel(SettingPanel.getFormSetting(this.panel));
    if (c === undefined || !!c) {
      this.close();
    }
  }
};

SettingPanel.getFormSetting = function(form) {
  var data = {}, table = SettingPanel.getFormSetting.TABLE;
  var tagName, key, value;
  Array.forEach(form.getElementsByTagName('*'), function(field) {
    tagName = field.tagName.toLowerCase();
    if (!table[tagName] || field.disabled || !field.name)
      return;
    key = field.name;
    value = table[tagName](field);
    if (!value)
      return;
    if (key in data) {
      if (!(data[key] instanceof Array))
        data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });
  return data;
};
SettingPanel.getFormSetting.TABLE = {
  input: function(field) {
    var type = field.type.toLowerCase();
    if (type == "checkbox" || type == "radio") {
      return field.checked ? field.value : null;
    } else {
      return field.value;
    }
  },
  textarea: function(field) {
    return field.value;
  },
  select: function(field) {
    if (field.type == "select-one") {
      var index = field.selectedIndex;
      return index >= 0 ? this.optionValue(field.options[index]) : null;
    } else {
      var values = [];
      Array.forEach(field.options, function(opt) {
        if (opt.selected)
          values.push(this.optionValue(opt));
      });
      return values;
    }
  },
  optionValue: function(opt) {
    return opt.value || opt.text;
  }
};

/*** setting hook ***/

unsafeWindow.__GCalSettingPanel_addHook = (unsafeWindow.__GCalSettingPanel_addHook || function(hook) {
  var hooks = [];
  var original = unsafeWindow._GenSettings;
  unsafeWindow[original.name] = unsafeWindow._GenSettings = function(id) {
    original.apply(this, arguments);
    if (!unsafeWindow.__GCalSettingPanel_canceled)
      hooks.forEach(function(hook){hook.call(this, id || 0)});
  };
  (unsafeWindow.__GCalSettingPanel_addHook = function(hook) {
    hooks.push(hook);
  })(hook);
});

