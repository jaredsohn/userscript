// ==UserScript==
// @name           Rockmaster's iGoogle Sidebar Collapse
// @namespace      http://userscripts.org/users/14120/scripts
// @description    Collapses iGoogle sidebar tabs
// @include        http://www.google.com/ig*
// ==/UserScript==

// Hacked from yooskeh's Google Calendar Header and Navigation Switcher
// http://userscripts.org/scripts/review/8507  /   http://d.hatena.ne.jp/margin/
//
// access settings with Tools:Greasemonkey:User Script Commands:Setting Sidebar Switcher


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
  if (!document.getElementById("col1"))
    return;

  var iGoogleSidebar = new DisplaySwitcher("iGoogleSidebar", "#col1", function() {
  });


  var iGoogleSidebarKeyDefault = uneval({code:90,ctrl:false,shift:false});
  var noKeyboard = uneval({code:-1,ctrl:false,shift:false});

  var Key = {
  iGoogleSidebarKey: eval(GM_getValue("iGoogleSidebarKey", iGoogleSidebarKeyDefault))  
  };
  GM_setValue("iGoogleSidebarKey", uneval(Key.iGoogleSidebarKey)); 

  function checkKey(e, key) {
    return e.keyCode  == key.code    &&
           e.shiftKey == !!key.shift &&
           e.ctrlKey  == !!key.ctrl;
  }


  GM_setValue("iGoogleSidebarInit", GM_getValue("iGoogleSidebarInit", "last"));

  document.addEventListener("keydown", function(e) {
    if (/input|textarea/i.test(e.target.tagName))
      return;
    if (e.keyCode == 191) head.show();
    if (checkKey(e, Key.iGoogleSidebarKey)) {
      iGoogleSidebar.toggle();
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
    table.createCaption().innerHTML = "Setting for Sidebar Switcher";
    table.insertRow(-1).innerHTML = <>
      <th>Default state of sidebar</th>
      <td>
        <select name="iGoogleSidebarInit">
          <option id="iGoogleSidebarInitShow" value="show">Show</option>
          <option id="iGoogleSidebarInitHide" value="hide">Hide</option>
          <option id="iGoogleSidebarInitLast" value="last">Same as last time</option>
        </select>
      </td>
    </>.toXMLString();
    table.insertRow(-1).innerHTML = <>
      <th>Keyboard shortcut to toggle sidebar</th>
      <td>
        <input class="text" size="12" id="iGoogleSidebarKeyInput" value={key2str(Key.iGoogleSidebarKey)}/>
        <input type="hidden" id="iGoogleSidebarKey" name="iGoogleSidebarKey" value={uneval(Key.iGoogleSidebarKey)}/>
      </td>
    </>.toXMLString();

    setTimeout(function() {
      var iGoogleSidebarInit = GM_getValue("iGoogleSidebarInit");
      iGoogleSidebarInit == "show" ? $("iGoogleSidebarInitShow").selected = true :
      iGoogleSidebarInit == "hide" ? $("iGoogleSidebarInitHide").selected = true :
                           $("iGoogleSidebarInitLast").selected = true;
      $("iGoogleSidebarKeyInput").addEventListener("keydown", function(e) {
        var key = {code:e.keyCode,ctrl:!!e.ctrlKey,shift:!!e.shiftKey};
        e.target.value = key2str(key);
        if (!!e.target.value)
          $("iGoogleSidebarKey").value = uneval(key);
        e.preventDefault();
        e.stopPropagation();
      }, false);
    }, 1);

    return table;
  }

  function onSave(data) {
    GM_setValue("iGoogleSidebarInit", data.iGoogleSidebarInit);
    var nKey = !$("iGoogleSidebarKeyInput").value ? noKeyboard : data.iGoogleSidebarKey;
    GM_setValue("iGoogleSidebarKey", nKey);
    Key.iGoogleSidebarKey = eval(nKey);
  }

  function onCancel(data, text) {
    if (data.iGoogleSidebarInit != GM_getValue("iGoogleSidebarInit") ||
        data.iGoogleSidebarKey  != GM_getValue("iGoogleSidebarKey")) {
      return confirm("Your changes have not been saved.");
    }
  }

  var setting = new SettingPanel(builder, onSave, onCancel);
  GM_registerMenuCommand("Setting Sidebar Switcher", function() {
    setting.open();
  });

  // Styles for Switch Button
  GM_addStyle(<><![CDATA[
    #iGoogleSidebarSwitchButton {
      position: absolute;
      width: 0;
      height: 0;
      border: 12px none transparent;
      -moz-border-radius:  2px;
      cursor: pointer;
      -moz-opacity: 0.3;
    }
    #iGoogleSidebarSwitchButton:hover {
      -moz-opacity: 0.6;
    }
    #iGoogleSidebarSwitchButton {
      top: 49%;
      left: 0;
      border-style: solid none;
    }
    #iGoogleSidebarSwitchButton.closed {
      border-left-style: solid;
      -moz-border-left-colors: transparent blue;
    }
    #iGoogleSidebarSwitchButton.opened {
      border-right-style: solid;
      -moz-border-right-colors: transparent blue;
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

