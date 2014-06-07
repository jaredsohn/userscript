// ==UserScript==
// @name            Google Calendar Display Current Time Line
// @namespace       http://d.hatena.ne.jp/margin/
// @description     Shows line and time display at current time on day view, week view and custom view.
// @include         http://calendar.google.tld/*
// @include         https://calendar.google.tld/*
// @include         http://www.google.tld/calendar*
// @include         https://www.google.tld/calendar*
// @include         http://google.tld/calendar*
// @include         https://google.tld/calendar*
// @version         0.3.15
// @author          yooskeh
// @homepage        http://d.hatena.ne.jp/margin/
// ==/UserScript==

window.addEventListener("load", function() {
  var lines = new TimeLineList;
  lines.createLine("Current Time Line", "CurrentTimeLine");
}, false);

/*** class TimeLine **********************************************************/

function TimeLine(hourDiff) {
  this._line = document.createElement("div");
  this._time = document.createElement("div");
  this._line.appendChild(this._time);

  var self = this;
  this._entry_callback = function(){self._entry();};
  this._updateTime_callback = function(){self._updateTime()};
  TimeLine.addRefreshHook(this._entry_callback);
  this._update_id = setInterval(function(){self._update()}, 20000);
  this._updateTime_id = setInterval(this._updateTime_callback, 3000);

  this.showTime = true;
  this.timeFormat = TimeLine.defaultTimeFormat;
  this.lineStyle = TimeLine.defaultLineStyle;
  this.timeStyle = TimeLine.defaultTimeStyle;
  this.hourDiff = hourDiff || 0;

  this._entry();
}
TimeLine.prototype = {
  get showTime() { return this._showTime; },
  set showTime(x) {
    this._showTime = x;
    this._time.style.cssText = x ? this._timeStyle : "display:none;";
  },
  get timeFormat() { return this._timeFormat; },
  set timeFormat(x) {
    this._timeFormat = x;
    this._formatTime = TimeLine.TimeFormatter(this._timeFormat);
    clearInterval(this._updateTime_id);
    this._updateTime_id = setInterval(this._updateTime_callback,
                                      (/s/.test(x) ? 500 : 3000));
    this._showTime && this._updateTime();
  },
  get lineStyle() { return this._lineStyle; },
  set lineStyle(x) {
    this._lineStyle = x;
    this._line.style.cssText = x + "position:absolute;z-index:5;";
    this._update();
  },
  get timeStyle() { return this._timeStyle; },
  set timeStyle(x) {
    this._timeStyle = x;
    this._time.style.cssText = this._showTime ? x : "display:none;";
  },
  get hourDiff() { return this._hourDiff; },
  set hourDiff(x) {
    this._hourDiff = x;
    this._update();
  },

  _entry: function() {
    if (!TimeLine.isAllDayView())
      return;
    var decowner = document.getElementById("decowner");
    if (decowner) {
      TimeLine.currentDayDiv = decowner.getElementsByTagName("div")[0];
      document.getElementById("grid").appendChild(this._line);
      this._update();
      this._updateTime();
    } else {
      TimeLine.currentDayDiv = false;
    }
  },
  _update: function() {
    if (!TimeLine.currentDayDiv || !this._line.parentNode)
      return;
    var now = new Date;
    var h = now.getHours() + this._hourDiff;
    var m = now.getMinutes();
    var s = now.getSeconds();
    var lns = this._line.style;
    var cdd = TimeLine.currentDayDiv;
    var left  = cdd.offsetLeft;
    var width = cdd.clientWidth;
    var pwidth = this._line.parentNode.clientWidth;
    var lineLeft;
    if (0 <= h && h < 24) {
      lineLeft = (left + 3)
      } else if (h > 24) {
        lineLeft = (left + width + 2);
        h -= 24;
      } else {
        lineLeft = left - width + 4;
        lineLeft = (lineLeft > 0) ? lineLeft : -1000;
        h += 24;
      }
    lns.left = lineLeft + "px";
    lns.right = (pwidth - lineLeft - width + 4) + "px";
    lns.top = (Math.floor(cdd.offsetHeight * ((h+(m+s/60)/60)/24))
               - Math.floor(this._line.offsetHeight / 2)) + "px";
  },
  _updateTime: function() {
    if (!this._showTime || !TimeLine.currentDayDiv)
      return;
    var time = new Date;
    if (this._hourDiff) {
      time.setSeconds(time.getSeconds() + this._hourDiff * 3600);
    }
    this._time.innerHTML = this._formatTime(time);
  },
  destroy: function() {
    TimeLine.removeRefreshHook(this._entry_callback);
    clearInterval(this._update_id);
    clearInterval(this._updateTime_id);
    if (this._line.parentNode)
      this._line.parentNode.removeChild(this._line);
  }
};

TimeLine.defaultTimeFormat = "hh:mm";

TimeLine.defaultLineStyle = <><![CDATA[
background: red;
height: 1px;
opacity: 0.7;
line-height: 1;
]]></>.toString();

TimeLine.defaultTimeStyle = <><![CDATA[
color: red;
font-size: 11px;
text-align: right;
margin-top: -1em;
]]></>.toString();

unsafeWindow.__GCal_refreshHooks = (unsafeWindow.__GCal_refreshHooks || (function() {
  var original = unsafeWindow._RefreshCalendar;
  unsafeWindow[original.name] = function() {
    original.apply(this, arguments);
    unsafeWindow.__GCal_refreshHooks.forEach(function(hook){hook.call(null)});
  };
  return [];
})());

TimeLine.addRefreshHook = function(hook) {
  unsafeWindow.__GCal_refreshHooks.push(hook);
};
TimeLine.removeRefreshHook = function(hook) {
  unsafeWindow.__GCal_refreshHooks = unsafeWindow.__GCal_refreshHooks.filter(function(f) {
    return f != hook;
  });
};

TimeLine.isAllDayView = function() {
  var view;
  for (var i in unsafeWindow) {
    var x = unsafeWindow[i];
    if (x && typeof x.type == "number") {
      view = x;
      break;
    }
  }
  return (TimeLine.isAllDayView = function() {
    var m, extent = view.extent || (m = view.toString().match(/extent: (\d+)/)) && m[1] || 0;
    return view.type == 0 || view.type == 1 || (view.type == 4 && extent <= 7);
  })();
};

TimeLine.TimeFormatter = function(str) {
  var table = TimeLine.TimeFormatter.TABLE;
  var template = str.split(/(hh?|HH?|mm?|ss?|am|pm|AM|PM|".*?"|'.*?')/).filter(function(s){return s!=""});
  var len = template.length;
  var formats = template.map(function(s){return table.hasOwnProperty(s)?s:null});
  var results = template.map(function(s){
    if (table.hasOwnProperty(s))
      return null;
    var m = s.match(/^(["'])(.*?)\1$/) // "]));
    if (m)
      return m[2];
    return s;
  });
  return function(date) {
    for (var i = 0, format; i < len; ++i) {
      format = formats[i];
      if (format) {
        results[i] = table[format](date);
      }
    }
    return results.join("");
  };
}
TimeLine.TimeFormatter.TABLE = {
  "h" : function(d){ return d.getHours(); },
  "hh": function(d){ return this._pad2(d.getHours()); },
  "H" : function(d){ return (d.getHours() + 11) % 12 + 1; },
  "HH": function(d){ return this._pad2((d.getHours()+11)%12+1); },
  "m" : function(d){ return d.getMinutes(); },
  "mm": function(d){ return this._pad2(d.getMinutes()); },
  "s" : function(d){ return d.getSeconds(); },
  "ss": function(d){ return this._pad2(d.getSeconds()); },
  "am": function(d){ return d.getHours() < 12 ? "am" : "pm"; },
  "pm": function(d){ return this["am"](d); },
  "AM": function(d){ return d.getHours() < 12 ? "AM" : "PM"; },
  "PM": function(d){ return this["AM"](d); },

  _pad2: function(n) {
    return n < 10 ? "0" + n : n;
  }
};

/*** class TimeLineList ******************************************************/

function TimeLineList() {
  var self = arguments.callee;
  if (self.instance)
    return self.instance;

  this.ids_key = "LineIds";
  this.nameMap_key = "LineNameMap";
  this.ids = eval(GM_getValue(this.ids_key)) || [];
  this.nameMap = eval(GM_getValue(this.nameMap_key)) || {};
  this.settings = {};
  for (var i = 0; i < this.ids.length; ++i) {
    var id = this.ids[i];
    this.settings[id] = new TimeLineSetting(this.nameMap[id], id, new TimeLine);
  }

  return self.instance = this;
}
TimeLineList.prototype = {
  createLine: function(name, id, timeline) {
    id = id || Math.random().toString(36).substring(2,10)
    if (!this.settings[id]) {
      this.ids.push(id);
      this.nameMap[id] = name;
      this.settings[id] = new TimeLineSetting(this.nameMap[id], id, timeline || new TimeLine)
      GM_setValue(this.ids_key, uneval(this.ids));
      GM_setValue(this.nameMap_key, uneval(this.nameMap));
      return id;
    }
  },
  removeLine: function(id) {
    var setting = this.settings[id];
    if (setting) {
      setting.timeline.destroy();
      setting.destroy();
      this.ids = this.ids.filter(function(s){ return s != id; });
      delete this.nameMap[id];
      delete this.settings[id];
      GM_setValue(this.ids_key, uneval(this.ids));
      GM_setValue(this.nameMap_key, uneval(this.nameMap));
    }
  },
  getSetting: function(id) {
    return this.settings[id];
  }
};

/*** class TimeLineStore *****************************************************/

function TimeLineStore(id) {
  this.id = id;
  this.Type = {
    showTime: "boolean",
    timeFormat: "string",
    lineStyle: "string",
    timeStyle: "string",
    hourDiff: "number"
  };
}
TimeLineStore.prototype = {
  get: function(key, dflt) {
    var value = GM_getValue(this.id[key]);
    if (value === undefined && !(dflt === undefined)) {
      this.put(key, dflt);
      value = GM_getValue(this.id[key]);
    }
    if (this.Type[key] == "object")
      value = eval(value);
    return value;
  },
  put: function(key, value) {
    if (typeof value != this.Type[key] && typeof value == "string")
      value = eval(value);
    if (typeof value == "object")
      value = uneval(value);
    GM_setValue(this.id[key], value);
  }
};

/*** class TimeLineSetting ***************************************************/

function TimeLineSetting(name, base, timeline) {
  if (!TimeLineSetting.panel) {
    TimeLineSetting.builders = [];
    TimeLineSetting.onSaves = [];
    TimeLineSetting.onCancels = [];
    TimeLineSetting.panel = new SettingPanel(function(){
      var div = document.createElement("div");
      TimeLineSetting.builders.forEach(function(f){div.appendChild(f());});
      div.innerHTML += <>
        <div style="text-align:right;">
          <input id="add_line_btn" type="button" value="Add time line"/>&#160;
        </div>
      </>.toString();
      setTimeout(function() {
        document.getElementById("add_line_btn").addEventListener("click", function() {
          var name = prompt("Please input the name of new line.", "Extra Time Line");
          if (name != null) {
            var diff = prompt("Please input the time difference from current time by hour. (-24 - 24)", "1");
            if (diff != null) {
              var lines = new TimeLineList;
              var timeline = new TimeLine;
              timeline.hourDiff = (diff - 0) || 0;
              var id = lines.createLine(name, undefined, timeline);
              div.insertBefore(lines.getSetting(id).builder.call(null), div.lastChild);
            }
          }
        }, false);
      }, 1);
      return div;
    }, function(data){
      TimeLineSetting.onSaves.forEach(function(f){f(data)});
    }, function(data){
      for (var i=0; i<TimeLineSetting.onCancels.length; ++i) {
        var c = TimeLineSetting.onCancels[i](data);
        if (!(c === undefined)) {
          return !c;
        }
      }
    });
    GM_registerMenuCommand("Setting for Display Current Time Line", function() {
      TimeLineSetting.panel.open();
    });
    unsafeWindow.__GCalSettingPanel_addHook(function(currentId) {
      var a = document.createElement("a");
      a.addEventListener("click", function(){TimeLineSetting.panel.open();}, false);
      a.innerHTML = "Time Line";
      setTimeout(function() {
        var stabs = document.getElementById("stabs");
        stabs.rows[0].insertCell(-1).appendChild(a);
      }, 300);
    });
  }

  this.name = name;
  this.timeline = timeline;
  this.baseId = base;
  this.id = {
    showTime:    base + "showTime",
    hideTime:    base + "hideTime",
    timeFormat:  base + "timeFormat",
    lineStyle:   base + "lineStyle",
    timeStyle:   base + "timeStyle",
    hourDiff:    base + "hourDiff",
    linePreview: base + "linePreview",
    timePreview: base + "timePreview",
    settingRow:  base + "settingRow",
    removeLineBtn: base + "removeLineBtn"
  };
  this.store = new TimeLineStore(this.id);
  this.keys = "showTime timeFormat lineStyle timeStyle hourDiff".split(" ");

  this.applySetting();
  this.builder = this.getBuilder();
  this.onSave = this.getOnSave();
  this.onCancel = this.getOnCancel();
  TimeLineSetting.builders.push(this.builder);
  TimeLineSetting.onSaves.push(this.onSave);
  TimeLineSetting.onCancels.push(this.onCancel);
}
TimeLineSetting.prototype = {
  applySetting: function() {
    this.keys.forEach(function(key) {
      this.timeline[key] = this.store.get(key, this.timeline[key]);
    }, this);
  },
  getBuilder: function(name, id, timeline) {
    var name = this.name, id = this.id, timeline = this.timeline, baseId = this.baseId;
    return function() {
      function $(id) { return document.getElementById(id); }

      var previewBoxStyle = <>
        width: 70%;
        height: 60px;
        margin: auto;
        position: relative;
        background: #FFC;
        border-width: 1px 3px;
        border-style: solid double;
        border-color: #DDD;
        font-size: small;
        font-weight: normal;
        line-height: 1.2em;
      </>.toString();

      var table = document.createElement("table");
      table.id = id.settingRow;
      table.style.cssText = <><![CDATA[
        border-collapse: collapse;
        border-bottom: 1px solid silver;
        text-align: left;
        margin: 3px 0;
        width: 100%;
      ]]></>.toString();
      table.insertRow(-1).innerHTML = <>
        <th style="width: 25%;" valign="top">{name}:
          <div style="text-align:center;margin:10px 0 5px;">
            Preview
          </div>
          <div style={previewBoxStyle}>
            <div id={id.linePreview}>
              <div id={id.timePreview}>
                &#160;
              </div>
            </div>
          </div>
        </th>
        <td>
          <table>
          <tbody>
            <tr>
              <th style="border-bottom: 1px solid silver;width: 25%" valign="top">Show time:</th>
              <td style="border-bottom: 1px solid silver;">
                <label>
                  <input id={id.showTime} name={id.showTime} value="true" type="radio"/>
                  &#160;&#160;&#160;Yes&#160;&#160;&#160;
                </label><br/>
                <label>
                  <input id={id.hideTime} name={id.showTime} value="false" type="radio"/>
                  &#160;&#160;&#160;No&#160;&#160;&#160;
                </label>
              </td>
            </tr>
            <tr>
              <th style="border-bottom: 1px solid silver;width: 25%" valign="top">Time format:</th>
              <td style="border-bottom: 1px solid silver;">
                <input size="30" id={id.timeFormat} name={id.timeFormat} value={timeline.timeFormat}/>
                <br />
                The format string may contain any of
                <i>h</i>, <i>hh</i>, <i>H</i>, <i>HH</i>, <i>m</i>, <i>mm</i>, <i>s</i>, <i>ss</i>, <i>am</i> and <i>AM</i>.
              </td>
            </tr>
            <tr>
              <th style="border-bottom: 1px solid silver;width: 25%" valign="top">Line style:</th>
              <td style="border-bottom: 1px solid silver;">
                <textarea rows="4" cols="40" id={id.lineStyle} name={id.lineStyle}>{timeline.lineStyle}</textarea>
              </td>
            </tr>
            <tr>
              <th style={baseId != "CurrentTimeLine" ? "border-bottom: 1px solid silver;width: 25%" : "width: 25%"} valign="top">Time style:</th>
              <td style={baseId != "CurrentTimeLine" ? "border-bottom: 1px solid silver;" : ""}>
                <textarea rows="4" cols="40" id={id.timeStyle} name={id.timeStyle}>{timeline.timeStyle}</textarea>
              </td>
            </tr>
            {baseId != "CurrentTimeLine" ? <>
            <tr>
              <th style="border-bottom: 1px solid silver;width: 25%" valign="top">Time difference:</th>
              <td style="border-bottom: 1px solid silver;">
                <input size="4" name={id.hourDiff} id={id.hourDiff} value={timeline.hourDiff}/>
                hours <br />
                The time difference from current time.
                It is a number from -24 to 24.
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <input id={id.removeLineBtn} type="button" value="Remove this line"/>
              </td>
            </tr>
            </> :
            <input type="hidden" name={id.hourDiff} id={id.hourDiff} value={timeline.hourDiff}/>
            }
          </tbody>
          </table>
        </td>
      </>.toXMLString();

      function preview() {
        var line = $(id.linePreview);
        var time = $(id.timePreview);
        line.style.cssText = $(id.lineStyle).value + "position:absolute;right:0;left:0";
        line.style.top = (30 - Math.floor(line.offsetHeight / 2)) + "px";
        time.style.cssText = $(id.showTime).checked ? $(id.timeStyle).value : "display:none;";
        var t = new Date;
        t.setSeconds(t.getSeconds() + ($(id.hourDiff).value-0) * 3600);
        time.innerHTML = TimeLine.TimeFormatter($(id.timeFormat).value)(t);
      }

      setTimeout(function() {
        if ($(id.removeLineBtn)) {
          $(id.removeLineBtn).addEventListener("click", function() {
            if (confirm("Remove "+name+".")) {
              (new TimeLineList).removeLine(baseId);
              $(id.settingRow).parentNode.removeChild($(id.settingRow));
            }
          }, false);
        }
        timeline.showTime ? $(id.showTime).checked = true : $(id.hideTime).checked = true;
        $(id.showTime).addEventListener("change", preview, false);
        $(id.hideTime).addEventListener("change", preview, false);
        $(id.timeFormat).addEventListener("change", preview, false);
        $(id.lineStyle).addEventListener("change", preview, false);
        $(id.timeStyle).addEventListener("change", preview, false);
        $(id.hourDiff).addEventListener("change", preview, false);
        preview();
      }, 1);

      return table;
    };
  },
  getOnSave: function() {
    var self = this;
    return function(data) {
      self.keys.forEach(function(key) {
        self.store.put(key, data[self.id[key]]);
      });
      self.applySetting();
    };
  },
  getOnCancel: function(id, timeline) {
    function trim(s) {
      return s.toString().match(/^\s*([\s\S]*?)\s*$/)[1];
    }
    var self = this;
    return function(data) {
      return self.keys.some(function(key) {
        return trim(self.timeline[key].toString()) != data[self.id[key]];
      }) ? !confirm("Your changes have not been saved.") : undefined;
    };
  },
  destroy: function() {
    var self = this;
    TimeLineSetting.builders = TimeLineSetting.builders.filter(function(f){return f!=self.builder});
    TimeLineSetting.onSaves = TimeLineSetting.onSaves.filter(function(f){return f!=self.onSave});
    TimeLineSetting.onCancels = TimeLineSetting.onCancels.filter(function(f){return f!=self.onCancel});
  }
};

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

