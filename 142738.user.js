// ==UserScript==
// @name            asanusta YouTube Center
// @namespace       http://www.facebook.com/YouTubeCenter
// @version         1.09.2013
// @author          Jeppe Rune Mortensen (asanusta)
// @description     YouTube Merkezi YouTube'da ziyaret çok daha eğlenceli kılan farklı kullanışlı fonksiyonlar her türlü içerir.-YouTube Center contains all kind of different useful functions which makes your visit on YouTube much more entertaining...YouTube Center, size otomatik video çözünürlüğü, indirme düğmesi gibi ek özellikler sunuyor.
// @match           http://*.youtube.com/*
// @match           https://*.youtube.com/*
// @match           http://dl.dropbox.com/u/13162258/YouTube%20Center/*
// @match           https://dl.dropbox.com/u/13162258/YouTube%20Center/*
// @match           http://userscripts.org/scripts/source/114002.meta.js
// @exclude         http://apiblog.youtube.com/*
// @exclude         https://apiblog.youtube.com/*
// @updateVersion   84
// @run-at          document-start
// ==/UserScript==
/** TODO
  * Add Prevent Tab from auto play/buffer
  * Make repeat button a little more advanced (Start and end time).
  * Add for Filename, a kind of preview and tutorial.
  * Download Format Group sort in Download Menu.
  * Priority of Download Format (MP4, WebM, flv, 3gp).
  * Priority of Format in Download Menu (MP4, WebM, flv, 3gp).
  * Make option to use direct download link instead of button.
  * SERVER/CLIENT: Make downloadable video info file.
  * EXPERIMENTAL: Placement System IN-WORK (BETA released)
 **/
(function(){
  "use strict";
  
  console.log("YTCenter: In Scope");
  
  /* UTILS */
  function $SaveData(key, value) {
    if (typeof GM_getValue != "undefined" && (typeof GM_getValue.toString == "undefined" || GM_getValue.toString().indexOf("not supported") == -1)) {
      console.log("YTCenter: Saving " + key + " using GM_setValue");
      GM_setValue(key, value);
    } else if (typeof localStorage != "undefined") {
      console.log("YTCenter: Saving " + key + " using localStorage");
      localStorage[key] = value;
    } else if (typeof uw.localStorage != "undefined") {
      console.log("YTCenter: Saving " + key + " using uw.localStorage");
      uw.localStorage[key] = value;
    } else if (typeof document.cookie != "undefined") {
      console.log("YTCenter: Saving " + key + " using document.cookie");
      var date = new Date();
      date.setTime(date.getTime() + (1000*24*60*60*1000));
      var expires = "; expires=" + date.toGMTString();
      document.cookie = key + "=" + value + expires + "; path=/";
    } else {
      console.error("YTCenter: Couldn't save data!");
      return false;
    }
    return true;
  }

  function $LoadData(key, def) {
    if (typeof GM_getValue != "undefined" && (typeof GM_getValue.toString == "undefined" || GM_getValue.toString().indexOf("not supported") == -1)) {
      console.log("YTCenter: Loading " + key + " using GM_getValue");
      return GM_getValue(key, def);
    } else if (typeof localStorage != "undefined") {
      console.log("YTCenter: Loading " + key + " using localStorage");
      return localStorage[key] || def;
    } else if (typeof uw.localStorage != "undefined") {
      console.log("YTCenter: Loading " + key + " using uw.localStorage");
      return uw.localStorage[key] || def;
    } else if (typeof document.cookie != "undefined") {
      console.log("YTCenter: Loading " + key + " using document.cookie");
      var nameEQ = key + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
          c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
          return c.substring(nameEQ.length, c.length);
      }
      return def;
    } else {
      console.error("YTCenter: Couldn't save data!");
      return null;
    }
  }
  function $UpdateChecker() {
    if (!ytcenter.settings.enableUpdateChecker) return;
    var curr = (new Date().getTime());
    var c = curr - 1000*60*60*parseInt(ytcenter.settings.updateCheckerInterval);
    console.log("YTCenter: Checking for updates in " + ((ytcenter.settings.updateCheckerLastUpdate - c)/1000/60/60) + " hours...");
    if (c >= ytcenter.settings.updateCheckerLastUpdate) {
      console.log("YTCenter: Checking for updates now...");
      ytcenter.settings.updateCheckerLastUpdate = curr;
      ytcenter.checkForUpdates();
    }
  }
  
  function $HasAttribute(elm, attr) {
    for (var i = 0; i < elm.attributes.length; i++) {
      if (elm.attributes[i].name == attr) return true;
    }
    return false;
  }
  
  function $CreateLightButton() {
    var btn = document.createElement("button");
    ytcenter.database.codeRegister(btn, function(){
      if (ytcenter.settings.lightbulbEnable) {
        $RemoveCSS(this, "hid");
      } else {
        $AddCSS(this, "hid");
      }
    });
    btn.setAttribute("onclick", ";return false;");
    btn.type = "button";
    btn.setAttribute("role", "button");
    btn.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip" + (ytcenter.settings.lightbulbEnable ? "" : " hid");
    btn.title = ytcenter.locale['LIGHTBULB_TOOLTIP'];
    //btn.style.marginLeft = ".5em";
    ytcenter.database.register(btn, 'LIGHTBULB_TOOLTIP', '@title');
    var s = document.createElement("span");
    s.className = "yt-uix-button-content";
    var icon = document.createElement("img");
    icon.alt = "";
    icon.src = ytcenter.icon.lightbulb;
    s.appendChild(icon);
    btn.appendChild(s);
    
    btn.addEventListener("click", function(){
      var shadow = document.createElement("div");
      shadow.style.position = "fixed";
      shadow.style.top = "0";
      shadow.style.left = "0";
      shadow.style.width = "100%";
      shadow.style.height = "100%";
      shadow.style.background = ytcenter.settings.lightbulbBackgroundColor;
      shadow.style.opacity = ytcenter.settings.lightbulbBackgroundOpaque/100;
      shadow.style.filter = "alpha(opacity=" + ytcenter.settings.lightbulbBackgroundOpaque + ")";
      shadow.style.zIndex = "101";
      shadow.addEventListener("click", function(){
        ytcenter.discardElement(this);
      }, false);
      document.body.appendChild(shadow);
    }, false);
    
    ytcenter.placementsystem.registerElement(btn, "@lightbtn");
  }
  function $CreateRepeatButton() {
    var btn = document.createElement("button");
    btn.style.margin = "0 2px 0 0";
    ytcenter.database.codeRegister(btn, function(){
      if (ytcenter.settings.enableRepeat) {
        $RemoveCSS(this, 'hid');
      } else {
        $AddCSS(this, 'hid');
      }
    });
    btn.title = ytcenter.locale['BUTTON_REPEAT_TOOLTIP'];
    ytcenter.database.register(btn, 'BUTTON_REPEAT_TOOLTIP', '@title');
    btn.setAttribute("role", "button");
    btn.setAttribute("type", "button");
    btn.setAttribute("onclick", ";return false;");
    btn.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip" + (ytcenter.settings.autoActivateRepeat ? " yt-uix-button-toggled" : "") + (ytcenter.settings.enableRepeat ? "" : " hid");
    btn.addEventListener("click", function(){
      if ($HasCSS(this, 'yt-uix-button-toggled')) {
        $RemoveCSS(this, 'yt-uix-button-toggled');
        ytcenter.doRepeat = false;
      } else {
        $AddCSS(this, 'yt-uix-button-toggled');
        ytcenter.doRepeat = true;
      }
    }, false);
    if (ytcenter.settings.autoActivateRepeat) {
      ytcenter.doRepeat = true;
    }
    
    var iconw = document.createElement("span");
    iconw.className = "yt-uix-button-icon-wrapper";
    var icon = document.createElement("img");
    icon.className = "yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay";
    icon.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
    /*icon.style.width = "20px";
    icon.style.height = "18px";
    icon.style.background = "no-repeat url(//s.ytimg.com/yt/imgbin/www-master-vfl8ZHa_q.png) -303px -38px";*/
    icon.alt = "";
    iconw.appendChild(icon);
    
    btn.appendChild(iconw);
    
    var t = document.createElement("span");
    t.className = "yt-uix-button-content";
    t.textContent = ytcenter.locale['BUTTON_REPEAT_TEXT'];
    ytcenter.database.register(t, 'BUTTON_REPEAT_TEXT', 'text');
    
    btn.appendChild(t);
    
    ytcenter.placementsystem.registerElement(btn, "@repeatbtn");
  }
  
  function $DownloadButtonStream() {
    var priority = ['small', 'medium', 'large', 'hd720', 'hd1080', 'highres'];
    var stream = null;
    var format = (function(){
      for (var i = 0; i < ytcenter.video.format.length; i++) {
        if (ytcenter.settings.downloadFormat == ytcenter.video.format[i].key) {
          return ytcenter.video.format[i].type;
        }
      }
      return ytcenter.locale['UNKNOWN'];
    })();
    for (var i = 0; i < ytcenter.video.stream.length; i++) {
      if ((stream == null || $ArrayIndexOf(priority, ytcenter.video.stream[i].quality) > $ArrayIndexOf(priority, stream.quality)) && $ArrayIndexOf(priority, ytcenter.video.stream[i].quality) <= $ArrayIndexOf(priority, ytcenter.settings.downloadQuality) && ytcenter.video.stream[i].type.indexOf(format) == 0 && ytcenter.video.stream[i].url) {
        stream = ytcenter.video.stream[i];
      }
    }
    return stream;
  }
  function $CreateDownloadButton() {
    var g = document.createElement("span");
    g.style.margin = "0 2px 0 0";
    ytcenter.database.codeRegister(g, function(){
      if (ytcenter.settings.enableDownload) {
        $RemoveCSS(this, "hid");
        this.style.display = "";
      } else {
        $AddCSS(this, "hid");
        this.style.display = "none";
      }
    });
    g.className = "yt-uix-button-group" + (ytcenter.settings.enableDownload ? "" : " hid");
    if (!ytcenter.settings.enableDownload) {
      g.style.display = "none";
    }
    
    var btn1 = document.createElement("button");
    btn1.className = "start yt-uix-button yt-uix-button-default yt-uix-tooltip";
    btn1.setAttribute("onclick", ";return false;");
    btn1.setAttribute("type", "button");
    btn1.setAttribute("role", "button");
    btn1.addEventListener("click", function(){
      var stream = $DownloadButtonStream();
      if (stream != null) {
        ytcenter.video.download(stream.itag);
      }
    }, false);
    var stream = $DownloadButtonStream();
    if (stream != null) {
      var stream_name = {
        highres: ytcenter.locale['HIGHRES'],
        hd1080: ytcenter.locale['HD1080'],
        hd720: ytcenter.locale['HD720'],
        large: ytcenter.locale['LARGE'],
        medium: ytcenter.locale['MEDIUM'],
        small: ytcenter.locale['SMALL']
      }[stream.quality];
      btn1.title = $TextReplacer(ytcenter.locale['BUTTON_DOWNLOAD_TOOLTIP'], {
        stream_name: stream_name,
        stream_resolution: stream.dimension.split("x")[1] + "p",
        stream_dimension: stream.dimension,
        stream_3d: (stream.stereo3d && stream.stereo3d == 1 ? "<span style=\"float:right\">&nbsp;3D</span>" : ""),
        stream_type: (function(stream){
          for (var i = 0; i < ytcenter.video.format.length; i++) {
            if (stream.type.indexOf(ytcenter.video.format[i].type) == 0) {
              return ytcenter.locale[ytcenter.video.format[i].name];
            }
          }
          return ytcenter.locale['UNKNOWN'];
        })(stream)
      });
    } else {
      btn1.title = $TextReplacer(ytcenter.locale['BUTTON_DOWNLOAD_TOOLTIP_NONE'], {
        type: (function(){
          for (var i = 0; i < ytcenter.video.format.length; i++) {
            if (ytcenter.settings.downloadFormat == ytcenter.video.format[i].key) {
              return ytcenter.locale[ytcenter.video.format[i].name];
            }
          }
          return ytcenter.locale['UNKNOWN'];
        })()
      });
    }
    ytcenter.database.codeRegister(btn1, function(){
      var stream = $DownloadButtonStream();
      if (stream != null) {
        var stream_name = {
          highres: ytcenter.locale['HIGHRES'],
          hd1080: ytcenter.locale['HD1080'],
          hd720: ytcenter.locale['HD720'],
          large: ytcenter.locale['LARGE'],
          medium: ytcenter.locale['MEDIUM'],
          small: ytcenter.locale['SMALL']
        }[stream.quality];
        
        this.title = $TextReplacer(ytcenter.locale['BUTTON_DOWNLOAD_TOOLTIP'], {
          stream_name: stream_name,
          stream_resolution: stream.dimension.split("x")[1] + "p",
          stream_dimension: stream.dimension,
          stream_3d: (stream.stereo3d && stream.stereo3d == 1 ? " 3D" : ""),
          stream_type: (function(stream){
            for (var i = 0; i < ytcenter.video.format.length; i++) {
              if (stream.type.indexOf(ytcenter.video.format[i].type) == 0) {
                return ytcenter.locale[ytcenter.video.format[i].name];
              }
            }
            return ytcenter.locale['UNKNOWN'];
          })(stream)
        });
      } else {
        this.title = $TextReplacer(ytcenter.locale['BUTTON_DOWNLOAD_TOOLTIP_NONE'], {
          type: (function(){
            for (var i = 0; i < ytcenter.video.format.length; i++) {
              if (ytcenter.settings.downloadFormat == ytcenter.video.format[i].key) {
                return ytcenter.locale[ytcenter.video.format[i].name];
              }
            }
            return ytcenter.locale['UNKNOWN'];
          })()
        });
      }
    });
    var btn1_text = document.createElement("span");
    btn1_text.className = "yt-uix-button-content";
    btn1_text.textContent = ytcenter.locale['BUTTON_DOWNLOAD_TEXT'];
    ytcenter.database.register(btn1_text, 'BUTTON_DOWNLOAD_TEXT', 'text');
    btn1.appendChild(btn1_text);
    g.appendChild(btn1);
    var btn2 = document.createElement("button");
    btn2.className = "end yt-uix-button yt-uix-button-default yt-uix-tooltip";
    btn2.setAttribute("onclick", ";return false;");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("role", "button");
    btn2.title = ytcenter.locale['BUTTON_DOWNlOAD2_TOOLTIP'];
    ytcenter.database.register(btn2, 'BUTTON_DOWNlOAD2_TOOLTIP', '@title');
    var img = document.createElement("img");
    img.className = "yt-uix-button-arrow";
    img.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
    img.alt = "";
    img.style.marginLeft = "0px";
    btn2.appendChild(img);
    
    var stream_groups = (function(){
      var groups = (function(){
        var obj = {};
        for (var i = 0; i < ytcenter.video.format.length; i++) {
          obj[ytcenter.video.format[i].type] = ytcenter.locale[ytcenter.video.format[i].name];
        }
        return obj;
      })();
      var sorted = {};
      for (var i = 0; i < ytcenter.video.stream.length; i++) {
        var f = ytcenter.video.stream[i].type.split(";")[0];
        if (groups.hasOwnProperty(f)) {
          if (!sorted[groups[f]]) sorted[groups[f]] = [];
          sorted[groups[f]].push(ytcenter.video.stream[i]);
        } else {
          if (!sorted['UNKNOWN']) sorted['UNKNOWN'] = [];
          sorted['UNKNOWN'].push(ytcenter.video.stream[i]);
        }
      }
      return sorted;
    })();
    
    var menu = document.createElement("div");
    menu.className = "yt-uix-button-menu hid" + (ytcenter.settings.show3DInDownloadMenu ? "" : " ytcenter-menu-3d-hide");
    ytcenter.database.codeRegister(menu, function(){
      if (ytcenter.settings.show3DInDownloadMenu) {
        $RemoveCSS(this, "ytcenter-menu-3d-hide");
      } else {
        $AddCSS(this, "ytcenter-menu-3d-hide");
      }
    });
    
    for (var key in stream_groups) {
      if (stream_groups.hasOwnProperty(key)) {
        var title = document.createElement("span");
        title.style.color = "#666";
        title.style.fontSize = "0.9166em";
        title.style.paddingLeft = "9px";
        if (key != "UNKNOWN") {
          title.textContent = key;
        } else {
          title.textContent = ytcenter.locale['UNKNOWN'];
          ytcenter.database.register(title, ytcenter.locale['UNKNOWN'], 'text');
        }
        
        menu.appendChild(title);
        
        for (var i = 0; i < stream_groups[key].length; i++) {
          var is3D = (stream_groups[key][i].stereo3d && stream_groups[key][i].stereo3d == 1 ? true : false);
          var item = document.createElement("span");
          item.setAttribute("onclick", ";return false;");
          if (!stream_groups[key][i].url) {
            item.className = (is3D ? "ytcenter-menu-item-3d" : "");
            item.style.color = "#A7A7A7";
            item.style.display = "block";
            item.style.margin = "0";
            item.style.padding = "6px 20px";
            item.style.textDecoration = "none";
            item.style.whiteSpace = "nowrap";
            item.style.wordWrap = "normal";
          } else {
            item.className = "yt-uix-button-menu-item" + (is3D ? " ytcenter-menu-item-3d" : "");
            item.addEventListener("click", (function(stream){
              return function(){
                ytcenter.video.download(stream.itag);
              };
            })(stream_groups[key][i]), false);
          }
          
          var stream_name = {
            highres: ytcenter.locale['HIGHRES'],
            hd1080: ytcenter.locale['HD1080'],
            hd720: ytcenter.locale['HD720'],
            large: ytcenter.locale['LARGE'],
            medium: ytcenter.locale['MEDIUM'],
            small: ytcenter.locale['SMALL']
          }[stream_groups[key][i].quality];
          
          item.innerHTML = $TextReplacer(ytcenter.locale['BUTTON_DOWNLOAD_MENU_ITEM_TEXT'], {
            stream_name: stream_name,
            stream_resolution: stream_groups[key][i].dimension.split("x")[1] + "p",
            stream_dimension: stream_groups[key][i].dimension,
            stream_3d: (is3D ? "<span style=\"float:right\">&nbsp;3D</span>" : "")
          });
          ytcenter.database.codeRegister(item, (function(stream, is3D){
            return function(){
              var stream_name = {
                highres: ytcenter.locale['HIGHRES'],
                hd1080: ytcenter.locale['HD1080'],
                hd720: ytcenter.locale['HD720'],
                large: ytcenter.locale['LARGE'],
                medium: ytcenter.locale['MEDIUM'],
                small: ytcenter.locale['SMALL']
              }[stream.quality];
              this.innerHTML = $TextReplacer(ytcenter.locale['BUTTON_DOWNLOAD_MENU_ITEM_TEXT'], {
                stream_name: stream_name,
                stream_resolution: stream.dimension.split("x")[1] + "p",
                stream_dimension: stream.dimension,
                stream_3d: (is3D ? "<span style=\"float:right\">&nbsp;3D</span>" : "")
              });
            };
          })(stream_groups[key][i], is3D));
          
          menu.appendChild(item);
        }
      }
    }
    var mp3title = document.createElement("span");
    mp3title.className = (ytcenter.settings.mp3Services == '' ? "hid" : "");
    if (ytcenter.settings.mp3Services == '') {
      mp3title.style.display = "none";
    }
    mp3title.style.color = "#666";
    mp3title.style.fontSize = "0.9166em";
    mp3title.style.paddingLeft = "9px";
    mp3title.textContent = ytcenter.locale['BUTTON_DOWNLOAD_MENU_MP3SERVICES'];
    ytcenter.database.register(mp3title, 'BUTTON_DOWNLOAD_MENU_MP3SERVICES', 'text');
    ytcenter.database.codeRegister(mp3title, function(){
      if (ytcenter.settings.mp3Services == '') {
        $AddCSS(this, 'hid');
        this.style.display = "none";
      } else {
        $RemoveCSS(this, 'hid');
        this.style.display = "";
      }
    });
    menu.appendChild(mp3title);
    var hasMP3Service = function(value){
      var a = ytcenter.settings.mp3Services.split("&");
      for (var i = 0; i < a.length; i++) {
        if (decodeURIComponent(a[i]) === value) {
          return true;
        }
      }
      return false;
    };
    var removeNonExistentMP3Services = function(){
      var newArr = [];
      var a = ytcenter.settings.mp3Services.split("&");
      for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < ytcenter.mp3services.length; j++) {
          if (ytcenter.mp3services[j].value === decodeURIComponent(a[i])) {
            newArr.push(a[i]);
            break;
          }
        }
      }
      ytcenter.settings.mp3Services = newArr.join("&");
    };
    removeNonExistentMP3Services();
    for (var i = 0; i < ytcenter.mp3services.length; i++) {
      var item = document.createElement("span");
      item.className = "yt-uix-button-menu-item" + (hasMP3Service(ytcenter.mp3services[i].value) ? "" : " hid");
      if (!hasMP3Service(ytcenter.mp3services[i].value)) {
        item.style.display = "none";
      }
      item.setAttribute("onclick", ";return false;");
      
      item.addEventListener("click", (function(mp3){
        return function(){
          ytcenter.redirect(mp3.value, true);
        };
      })(ytcenter.mp3services[i]), false);
      
      item.textContent = ytcenter.locale[ytcenter.mp3services[i].label];
      ytcenter.database.register(item, ytcenter.mp3services[i].label, 'text');
      ytcenter.database.codeRegister(item, (function(mp3){
        return function(){
          var a = ytcenter.settings.mp3Services.split("&");
          var f = false;
          for (var i = 0; i < a.length; i++) {
            if (decodeURIComponent(a[i]) === mp3.value) {
              f = true;
              break;
            }
          }
          if (f) {
            $RemoveCSS(this, 'hid');
            this.style.display = "";
          } else {
            $AddCSS(this, 'hid');
            this.style.display = "none";
          }
        };
      })(ytcenter.mp3services[i]));
      menu.appendChild(item);
    }
    
    
    btn2.appendChild(menu);
    g.appendChild(btn2);
    
    ytcenter.placementsystem.registerElement(g, "@downloadgroup");
  }
  function $CreateSettingsUI() {
    var container = document.createElement("div");
    
    container.className = "hid";
    container.setAttribute("style", "position:relative;z-index:30;width:970px;padding:0;margin:0 auto 10px;background:whiteSmoke;background:rgba(255,255,255,.4);-moz-box-shadow:inset 0 2px 5px #d1d1d1;-ms-box-shadow:inset 0 2px 5px #d1d1d1;-webkit-box-shadow:inset 0 2px 5px #D1D1D1;box-shadow:inset 0 2px 5px #D1D1D1;");
    var content = document.createElement("div");
    content.style.padding = "10px";
    //content.setAttribute("style", "background:#FFFFFF;border:1px solid #CCC;padding:10px;position:relative;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;box-shadow:0 1px 1px #ccc;-moz-box-shadow:0 1px 1px #ccc;-ms-box-shadow:0 1px 1px #ccc;-webkit-box-shadow:0 1px 1px #ccc;");
    container.appendChild(content);
    var hr = document.createElement("div");
    hr.className = "yt-horizontal-rule";
    //hr.style.zIndex = "0";
    var hr1 = document.createElement("div");
    hr1.className = "first";
    var hr2 = document.createElement("div");
    hr2.className = "second";
    var hr3 = document.createElement("div");
    hr3.className = "third";
    hr.appendChild(hr1);
    hr.appendChild(hr2);
    hr.appendChild(hr3);
    container.appendChild(hr);
    
    var tabs = document.createElement("span");
    tabs.className = "yt-uix-button-group";
    tabs.addTab = function(tab){
      if (tabs.children.length == 0) {
        $AddCSS(tab, "start");
      } else if (tabs.children.length > 0) {
        $RemoveCSS(tabs.lastChild, "end");
      }
      $AddCSS(tab, "end");
      tabs.appendChild(tab);
    };
    content.appendChild(tabs);
    var tabgroups = document.createElement("div");
    content.appendChild(tabgroups);
    
    var first = true;
    for (var key in ytcenter.ui.settings) {
      if (ytcenter.ui.settings.hasOwnProperty(key)) {
        var tc = document.createElement("div");
        if (!first) {
          tc.className = "hid";
        }
        
        var tab = document.createElement("button");
        tab.setAttribute("onclick", ";return false;");
        tab.className = "yt-uix-button yt-uix-button-default" + (first ? " yt-uix-button-toggled" : "");
        tab.setAttribute("role", "button");
        var bc = document.createElement("span");
        bc.className = "yt-uix-button-content";
        bc.textContent = ytcenter.locale[key];
        ytcenter.database.register(bc, key, 'text', {});
        tab.appendChild(bc);
        tab.addEventListener("click", (function(tabs, tc, tabgroups){
          return function(){
            for (var i = 0; i < tabs.children.length; i++) {
              $RemoveCSS(tabs.children[i], "yt-uix-button-toggled");
            }
            for (var i = 0; i < tabgroups.children.length; i++) {
              $AddCSS(tabgroups.children[i], "hid");
            }
            $AddCSS(this, "yt-uix-button-toggled");
            $RemoveCSS(tc, "hid");
            ytcenter.refreshHomepage();
          };
        })(tabs, tc, tabgroups), false);
        tabs.addTab(tab);
        for (var i = 0; i < ytcenter.ui.settings[key].length; i++) {
          tc.appendChild($CreateSettingElement(tab, ytcenter.ui.settings[key][i]));
        }
        tabgroups.appendChild(tc);
        if (first) {
          first = false;
        }
      }
    }
    if (document.getElementById("masthead-user-display")) {
      document.getElementById("masthead-user-display").style.display = "inline";
    }
    if (document.getElementById("masthead-user-expander")) {
      document.getElementById("masthead-user-expander").style.verticalAlign = "middle";
    }
    if (document.getElementById("masthead")) {
      var masthead = document.getElementById("masthead").nextElementSibling;
      var p = document.getElementById("masthead-container") || document.body;
      if (masthead) {
        p.insertBefore(container, masthead);
      } else {
        p.appendChild(container);
      }
    }
    //document.getElementById("masthead").nextElementSibling

    //document.getElementById("watch-actions-area").appendChild(container);
    
    var con1 = document.createElement("span");
    con1.style.verticalAlign = "middle";
    con1.id = "masthead-user-expander";
    con1.className = "yt-uix-expander yt-uix-expander-collapsed";
    var con2 = document.createElement("span");
    con2.id = "masthead-user-wrapper";
    con2.className = "yt-uix-expander-head yt-rounded";
    con2.setAttribute("tabindex", "0");
    con1.appendChild(con2);
    
    
    var account_button = document.getElementById("masthead-user-button");
    
    var btn = document.createElement("button");
    btn.id = "masthead-user-button";
    /*btn.style.padding = "0 5px 0 2px";
    btn.style.height = "33px";
    btn.style.verticalAlign = "top";*/
    btn.title = ytcenter.locale['BUTTON_SETTINGS_TITLE'];
    ytcenter.database.register(btn, 'BUTTON_SETTINGS_TITLE', '@title');
    btn.type = "button";
    btn.setAttribute("role", "button");
    btn.setAttribute("onclick", ";return false;");
    btn.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-text yt-uix-tooltip";
    var btnt = document.createElement("span");
    btnt.className = "yt-uix-button-content";
    /*btnt.textContent = ytcenter.locale['BUTTON_SETTINGS_CONTENT'];
    ytcenter.database.register(btnt, 'BUTTON_SETTINGS_CONTENT', 'text');*/
    /*var arrowicon = document.createElement("span");
    arrowicon.className = "yt-uix-expander-arrow";
    arrowicon.style.marginLeft = "2px";
    btnt.appendChild(arrowicon);*/
    var gearicon = document.createElement("img");
    gearicon.src = ytcenter.icon.gear;
    gearicon.alt = "";
    gearicon.style.marginLeft = "3px";
    btnt.appendChild(gearicon);
    btn.appendChild(btnt);
    btn.addEventListener("click", (function(c, account_button){
      return function(){
        if ($HasCSS(this, "yt-uix-button-toggled")) {
          $RemoveCSS(this, "yt-uix-button-toggled");
          $AddCSS(c, "hid");
        } else {
          if (account_button) {
            if ($HasCSS(account_button, "yt-uix-button-toggled")) {
              account_button.click();
            }
          }
          $AddCSS(this, "yt-uix-button-toggled");
          $RemoveCSS(c, "hid");
        }
        ytcenter.refreshHomepage();
      };
    })(container, account_button), false);
    if (account_button) {
      account_button.parentNode.addEventListener("click", (function(btn){
        return function(){
          if (btn) {
            if ($HasCSS(btn, "yt-uix-button-toggled")) {
              btn.click();
            }
          }
        };
      })(btn), false);
    }
    con2.appendChild(btn);
    var msthdsr = document.getElementById("masthead-user");
    if (msthdsr) {
      msthdsr.appendChild(con1);
    }
  }
  
  function $CreateSettingElement(tab, recipe) {
    var wrapper = document.createElement("div");
    wrapper.style.padding = "4px 0";
    if (recipe.label) {
      var label = document.createElement("span");
      label.style.display = "inline-block";
      label.style.width = "178px";
      label.style.color = "#555";
      var ltext = document.createTextNode(ytcenter.locale[recipe.label]);
      label.appendChild(ltext);
      ytcenter.database.register(ltext, recipe.label, 'text', {});
      
      if (recipe.tooltip) {
        var tooltip = document.createElement("p");
        tooltip.style.color = "#9E9E9E";
        tooltip.style.fontSize = "11px";
        tooltip.style.width = "170px";
        tooltip.textContent = ytcenter.locale[recipe.tooltip];
        ytcenter.database.register(tooltip, recipe.tooltip, 'text', {});
        label.appendChild(tooltip);
      }
      
      wrapper.appendChild(label);
    }
    var elm = null;
    switch (recipe.type) {
      case 'bool':
        var ds = false;
        if (recipe.defaultSetting) {
          var ds = ytcenter.settings[recipe.defaultSetting];
        }
        elm = document.createElement("span");
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        elm.className = "yt-uix-form-input-checkbox-container" + (ds ? " checked" : "");
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "yt-uix-form-input-checkbox";
        if (ds) {
          cb.checked = "checked";
        }
        cb.value = "true";
        cb.addEventListener('click', (function(defaultSetting){
          return function(){
            if (defaultSetting) {
              ytcenter.settings[defaultSetting] = (this.checked ? true : false);
              ytcenter.saveSettings();
            }
          };
        })(recipe.defaultSetting), false);
        if (recipe.listeners) {
          for (var i = 0; i < recipe.listeners.length; i++) {
            cb.addEventListener(recipe.listeners[i].event, recipe.listeners[i].callback, (recipe.listeners[i].bubble ? recipe.listeners[i].bubble : false));
          }
        }
        elm.appendChild(cb);
        var cbe = document.createElement("span");
        cbe.className = "yt-uix-form-input-checkbox-element";
        elm.appendChild(cbe);
        break;
      case 'text':
        var ds = "";
        if (recipe.defaultSetting) {
          var ds = ytcenter.settings[recipe.defaultSetting];
        }
        elm = document.createElement("input");
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        elm.value = ds;
        elm.type = "text";
        elm.className = "yt-uix-form-input-text";
        elm.addEventListener("change", (function(defaultSetting){
          return function(){
            ytcenter.settings[defaultSetting] = this.value;
            ytcenter.saveSettings();
          };
        })(recipe.defaultSetting), false);
        if (recipe.listeners) {
          for (var i = 0; i < recipe.listeners.length; i++) {
            elm.addEventListener(recipe.listeners[i].event, recipe.listeners[i].callback, (recipe.listeners[i].bubble ? recipe.listeners[i].bubble : false));
          }
        }
        break;
      case 'list':
        elm = document.createElement("span");
        elm.className = "yt-uix-form-input-select";
        var sc = document.createElement("span");
        sc.className = "yt-uix-form-input-select-content";
        
        var defaultLabel = null;
        var s = document.createElement("select");
        s.className = "yt-uix-form-input-select-element";
        s.style.cursor = "pointer";
        if (recipe.advlist) {
          recipe.list = recipe.advlist();
        }
        if (recipe.list) {
          var defaultLabelText = recipe.list[0].label;
          for (var i = 0; i < recipe.list.length; i++) {
            var item = document.createElement("option");
            item.value = recipe.list[i].value;
            
            if (recipe.list[i].label) {
              item.textContent = ytcenter.locale[recipe.list[i].label];
              ytcenter.database.register(item, recipe.list[i].label, 'text', {});
            } else if (recipe.list[i].variable) {
              item.textContent = eval(recipe.list[i].variable);
            }
            if (recipe.list[i].value === ytcenter.settings[recipe.defaultSetting]) {
              item.selected = true;
              defaultLabelText = item.textContent;
            }
            s.appendChild(item);
          }
          var sc1 = document.createElement("img");
          sc1.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
          sc1.className = "yt-uix-form-input-select-arrow";
          sc.appendChild(sc1);
          var sc2 = document.createElement("span");
          sc2.className = "yt-uix-form-input-select-value";
          sc2.textContent = ytcenter.locale[defaultLabelText];
          sc.appendChild(sc2);
          ytcenter.database.codeRegister(sc2, (function(s){
            return function(){
              this.textContent = s.options[s.selectedIndex].textContent;
            };
          })(s));
        }
        s.addEventListener('change', (function(defaultSetting){
          return function(){
            ytcenter.settings[defaultSetting] = this.value;
            ytcenter.saveSettings();
          };
        })(recipe.defaultSetting), false);
        if (recipe.listeners) {
          for (var i = 0; i < recipe.listeners.length; i++) {
            s.addEventListener(recipe.listeners[i].event, recipe.listeners[i].callback, (recipe.listeners[i].bubble ? recipe.listeners[i].bubble : false));
          }
        }
        elm.appendChild(sc);
        elm.appendChild(s);
        break;
      case 'element':
        elm = document.createElement(recipe.tagname);
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        if (recipe.className) {
          elm.className += " " + recipe.className;
        }
        if (recipe.text) {
          elm.textContent = recipe.text;
        }
        if (recipe.html) {
          elm.innerHTML = recipe.html;
        }
        if (recipe.load) {
          tab.addEventListener("click", (function(elm, load){
            return function(){
              load.apply(elm, []);
            };
          })(elm, recipe.load), false);
        }
        if (recipe.listeners) {
          for (var i = 0; i < recipe.listeners.length; i++) {
            elm.addEventListener(recipe.listeners[i].event, recipe.listeners[i].callback, (recipe.listeners[i].bubble ? recipe.listeners[i].bubble : false));
          }
        }
        break;
      case 'textarea':
        elm = document.createElement('textarea');
        elm.className = "yt-uix-form-textarea";
        if (recipe.className) {
          elm.className += " " + recipe.className;
        }
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        if (recipe.text) {
          elm.textContent = recipe.text;
        }
        if (recipe.html) {
          elm.innerHTML = recipe.html;
        }
        if (recipe.load) {
          tab.addEventListener("click", (function(elm, load){
            return function(){
              load.apply(elm, []);
            };
          })(elm, recipe.load), false);
        }
        if (recipe.listeners) {
          for (var i = 0; i < recipe.listeners.length; i++) {
            elm.addEventListener(recipe.listeners[i].event, recipe.listeners[i].callback, (recipe.listeners[i].bubble ? recipe.listeners[i].bubble : false));
          }
        }
        break;
      case 'html':
        elm = document.createElement("div");
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        if (recipe.html) {
          if (recipe.replace) {
            elm.innerHTML = $TextReplacer(recipe.html, recipe.replace);
          } else {
            elm.innerHTML = recipe.html;
          }
          
          elm.innerHTML = recipe.html;
        }
        if (recipe.htmllocale) {
          if (recipe.replace) {
            elm.innerHTML = $TextReplacer(ytcenter.locale[recipe.htmllocale], recipe.replace);
          } else {
            elm.innerHTML = ytcenter.locale[recipe.htmllocale];
          }
          
          ytcenter.database.register(elm, recipe.htmllocale, 'html', recipe.replace || {});
        }
        if (recipe.listeners) {
          for (var i = 0; i < recipe.listeners.length; i++) {
            elm.addEventListener(recipe.listeners[i].event, recipe.listeners[i].callback, (recipe.listeners[i].bubble ? recipe.listeners[i].bubble : false));
          }
        }
        break;
      case 'multi':
        elm = document.createElement("div");
        elm.style.paddingLeft = "16px";
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        
        var checkedMP3Services = (function(){
          var a = ytcenter.settings[recipe.defaultSetting].split("&");
          var b = [];
          for (var i = 0; i < a.length; i++) {
            if (a[i] == '') continue;
            b.push(decodeURIComponent(a[i]));
          }
          return b;
        })();
        for (var i = 0; i < recipe.multi.length; i++) {
          var checked = ($ArrayIndexOf(checkedMP3Services, recipe.multi[i].value) != -1 ? true : false);
          var containItem = document.createElement("div");
          var item = document.createElement("label");
          var item2 = document.createElement("span");
          item2.className = "yt-uix-form-input-checkbox-container" + (checked ? " checked" : "");
          item2.style.marginRight = "6px";
          var item3 = document.createElement("input");
          item3.type = "checkbox";
          item3.className = "yt-uix-form-input-checkbox";
          if (checked) {
            item3.checked = "checked";
          }
          item3.addEventListener('click', (function(defaultSetting, m){
            return function(){
              var newM = (function(self){
                var a = ytcenter.settings[defaultSetting].split("&");
                a = (function(a){
                  if (a.length == 0) return [];
                  var buff = [];
                  for (var i = 0; i < a.length; i++) {
                    if (a[i] == '') continue;
                    buff.push(a[i]);
                  }
                  return buff;
                })(a);
                for (var i = 0; i < a.length; i++) {
                  a[i] = decodeURIComponent(a[i]);
                }
                if (self.checked) {
                  console.log("Checked: " + m.value);
                  if ($ArrayIndexOf(a, m.value) == -1) {
                    a.push(m.value);
                    console.log("Add");
                    console.log(a);
                    for (var i = 0; i < a.length; i++) {
                      a[i] = encodeURIComponent(a[i]);
                    }
                    return a.join("&");
                  }
                } else {
                  var buff = [];
                  for (var i = 0; i < a.length; i++) {
                    if (a[i] == m.value) continue;
                    buff.push(encodeURIComponent(a[i]));
                  }
                  return buff.join("&");
                }
                for (var i = 0; i < a.length; i++) {
                  a[i] = encodeURIComponent(a[i]);
                }
                console.log("None");
                console.log(a);
                return a.join("&");
              })(this);
              
              ytcenter.settings[defaultSetting] = newM;
              ytcenter.saveSettings();
            };
          })(recipe.defaultSetting, recipe.multi[i]), false);
          if (recipe.listeners) {
            for (var j = 0; j < recipe.listeners.length; j++) {
              item3.addEventListener(recipe.listeners[j].event, recipe.listeners[j].callback, (recipe.listeners[j].bubble ? recipe.listeners[j].bubble : false));
            }
          }
          item3.value = recipe.multi[i].value;
          var item4 = document.createElement("span");
          item4.className = "yt-uix-form-input-checkbox-element";
          item2.appendChild(item3);
          item2.appendChild(item4);
          item.appendChild(item2);
          var item5 = document.createTextNode(ytcenter.locale[recipe.multi[i].label]);
          ytcenter.database.register(item5, recipe.multi[i].label, 'text');
          item.appendChild(item5);
          containItem.appendChild(item);
          elm.appendChild(containItem);
        }
        break;
      case 'range':
        elm = document.createElement("div");
        elm.style.display = "inline";
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        
        var slide = document.createElement("span");
        slide.className = "ytcenter-range";
        slide.setAttribute("style", "display:inline-block;cursor:default;position:relative;border:1px solid;outline:0;white-space:nowrap;word-wrap:normal;vertical-align:middle;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;border-color:#CCC #CCC #AAA;background:white;padding:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;");
        var handle = document.createElement("a");
        slide.appendChild(handle);
        handle.className = "yt-uix-button yt-uix-button-default ytcenter-range-handle";
        handle.setAttribute("style", "position:absolute;top:-1px;left:0px;outline:none;margin-left:-.5em;cursor:default;padding:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;");
        
        elm.appendChild(slide);
        
        var _text = document.createElement("input");
        _text.type = "text";
        _text.value = ytcenter.settings[recipe.defaultSetting];
        _text.style.width = "25px";
        _text.style.marginLeft = "4px";
        
        elm.appendChild(_text);
        
        var _slide = $SlideRange(slide, handle, recipe.minRange, recipe.maxRange, ytcenter.settings[recipe.defaultSetting]);
        
        _slide.addEventListener("valuechange", (function(status_elm){
          return function(newvalue){
            status_elm.value = Math.ceil(newvalue - 0.5);
          };
        })(_text));
        
        _slide.addEventListener("change", (function(status_elm, recipe){
          return function(newvalue){
            status_elm.value = Math.ceil(newvalue - 0.5);
            ytcenter.settings[recipe.defaultSetting] = status_elm.value;
            ytcenter.saveSettings();
          };
        })(_text, recipe));
        
        _text.addEventListener("input", (function(_slide){
          return function(){
            if (this.value === '') this.value = "0";
            this.value = Math.ceil(_slide.setValue(this.value) - 0.5);
          };
        })(_slide), false);
        _text.addEventListener("change", (function(_slide, recipe){
          return function(){
            if (this.value === '') this.value = "0";
            this.value = Math.ceil(_slide.setValue(this.value) - 0.5);
            ytcenter.settings[recipe.defaultSetting] = this.value;
            ytcenter.saveSettings();
          };
        })(_slide, recipe), false);
        break;
      case 'button':
        elm = document.createElement("button");
        elm.type = "button";
        elm.setAttribute("role", "button");
        elm.setAttribute("onclick", ";return false;");
        elm.className = "yt-uix-button yt-uix-button-default";
        var c = document.createElement("span");
        c.className = "yt-uix-button-content";
        if (recipe.text) {
          c.textContent = ytcenter.locale[recipe.text];
          ytcenter.database.register(c, recipe.text, "text");
        }
        if (recipe.listeners) {
          for (var j = 0; j < recipe.listeners.length; j++) {
            elm.addEventListener(recipe.listeners[j].event, recipe.listeners[j].callback, (recipe.listeners[j].bubble ? recipe.listeners[j].bubble : false));
          }
        }
        if (recipe.style) {
          for (var key in recipe.style) {
            if (recipe.style.hasOwnProperty(key)) {
              elm.style[key] = recipe.style[key];
            }
          }
        }
        elm.appendChild(c);
        break;
    }
    if (elm != null) {
      elm.style.verticalAlign = "top";
      wrapper.appendChild(elm);
    }
    return wrapper;
  }
  
  function $CloneArray(arr) {
    var copy = [];
    for (var i = 0; i < arr.length; i++) {
      copy[i] = arr[i];
    }
    return copy;
  }
  
  function $Clone(obj) {
    if (null == obj || typeof obj != "object") {
      return obj;
    }
    if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    if (obj instanceof Array) {
      var copy = [];
      for (var i = 0; i < obj.length; i++) {
        copy[i] = $Clone(obj[i]);
      }
      return copy;
    }
    if (obj instanceof Object) {
      var copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = $Clone(obj[key]);
        }
      }
      return copy;
    }
  }
  
  function $AddCSS(elm, css) {
    var a = elm.className.split(" ");
    if ($ArrayIndexOf(a, css) != -1) return;
    a.push(css);
    elm.className = a.join(" ");
  }
  
  function $RemoveCSS(elm, css) {
    if (!elm) return false;
    var a = elm.className.split(" ");
    var na = [];
    for (var i = 0; i < a.length; i++) {
      if (a[i] === css) continue;
      na.push(a[i]);
    }
    elm.className = na.join(" ");
  }
  
  function $HasCSS(elm, css) {
    return $ArrayIndexOf(elm.className.split(" "), css) !== -1;
  }
  
  function $ArrayIndexOf(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }
  
  function $TextReplacer(text, rep) {
    if (!text) return text;
    var tmp = "";
    var startB = false;
    var func = "";
    var tmpName = "";
    var tmpFunc = "";
    var inFunc = false;
    for (var i = 0; i < text.length; i++) {
      if (text.charAt(i) == "{" && !startB && !inFunc) {
        startB = true;
      } else if (text.charAt(i) == "}" && startB) {
        var t = tmpName;
        for (var key in rep) {
          if (rep.hasOwnProperty(key)) {
            if (key === tmpName) {
              tmpName = "";
              t = rep[key];
              break;
            }
          }
        }
        tmp += t;
        startB = false;
      } else if (startB) {
        if (tmpName == "" && text.charAt(i) == "!") {
          tmp += "{";
          startB = false;
        } else {
          tmpName += text.charAt(i);
        }
      } else {
        tmp += text.charAt(i);
      }
    }
    return tmp;
  }
  
  function $SlideRange(elm, handle, min, max, defaultValue) {
    var range = {
      elm: elm,
      handle: handle,
      min: (min ? min : 0),
      max: (max ? max : 100),
      defaultValue: (defaultValue ? defaultValue : min),
      mouse: {
        down: false
      },
      listeners: [],
      width: 240,
      height: 15
    };
    range.elm.style.marginTop = "-4px";
    range.elm.style.width = range.width + "px";
    range.elm.style.height = range.height + "px";
    range.handle.style.width = range.height + "px";
    range.handle.style.height = range.height + "px";
    
    var returnKit = {
      addEventListener: (function(range){
        return function(event, callback){
          range.listeners.push({
            e: event,
            c: callback
          });
        };
      })(range),
      getValue: (function(range){
        return function(){
          var max = parseInt(range.elm.style.width) - (range.height + 2);
          var a = range.max - range.min;
          return parseFloat(range.handle.style.left)/max*a+range.min || range.defaultValue;
        };
      })(range),
      setValue: (function(range){
        return function(val){
          var max = parseInt(range.elm.style.width) - (range.height + 2);
          var pos = (val - range.min)/(range.max - range.min)*max;
          
          if (pos > max) {
            pos = max;
          } else if (pos < 0) {
            pos = 0;
          }
          range.handle.style.left = pos + "px";
          if (val == 0) {
            return 0;
          } else {
            return returnKit.getValue();
          }
        };
      })(range)
    };
    
    returnKit.setValue(range.defaultValue);
    
    elm.addEventListener("click", function(e){
      var pos = e.clientX - $AbsoluteOffset(range.elm)[0] - range.handle.offsetWidth/2;
      var max = range.elm.clientWidth - range.handle.offsetWidth;
      if (pos > max) {
        pos = max;
      } else if (pos < 0) {
        pos = 0;
      }
      range.handle.style.left = pos + "px";
      
      for (var i = 0; i < range.listeners.length; i++) {
        if (range.listeners[i].e === 'valuechange') {
          var max = range.elm.clientWidth - range.handle.offsetWidth;
          var a = range.max - range.min;
          range.listeners[i].c(parseFloat(range.handle.style.left)/max*a+range.min);
        } else if (range.listeners[i].e === 'change') {
          var max = range.elm.clientWidth - range.handle.offsetWidth;
          var a = range.max - range.min;
          range.listeners[i].c(parseFloat(range.handle.style.left)/max*a+range.min);
        }
      }
      e.preventDefault();
    }, false);
    elm.addEventListener("mousedown", function(e){
      range.mouse.down = true;
      e.preventDefault();
    }, false);
    document.addEventListener("mousemove", function(e){
      if (range.mouse.down) {
        var pos = e.clientX - $AbsoluteOffset(range.elm)[0] - range.handle.offsetWidth/2;
        var max = range.elm.clientWidth - range.handle.offsetWidth;
        if (pos > max) {
          pos = max;
        } else if (pos < 0) {
          pos = 0;
        }
        range.handle.style.left = pos + "px";
        
        for (var i = 0; i < range.listeners.length; i++) {
          if (range.listeners[i].e === 'valuechange') {
            var max = range.elm.clientWidth - range.handle.offsetWidth;
            var a = range.max - range.min;
            range.listeners[i].c(parseFloat(range.handle.style.left)/max*a+range.min);
          }
        }
        e.preventDefault();
      }
    }, false);
    document.addEventListener("mouseup", function(e){
      if (range.mouse.down) {
        range.mouse.down = false;
        e.stopPropagation();
        for (var i = 0; i < range.listeners.length; i++) {
          if (range.listeners[i].e === 'change') {
            var max = range.elm.clientWidth - range.handle.offsetWidth;
            var a = range.max - range.min;
            range.listeners[i].c(parseFloat(range.handle.style.left)/max*a+range.min);
          }
        }
        e.preventDefault();
      }
    }, false);
    
    return returnKit;
  }
  
  function $DragList(elements, ignore) {
    var dragging = false;
    var holderElement;
    var secureHeightElement = [];
    var defaultVisibility = "";
    var et;
    var disabled = true;
    var lastLegalRegion;
    var lastItem;
    var allowedRegions = elements;
    var curRelative;
    var disabler;
    
    var listeners = {};
    
    var getOffset = function(elm){
      var x = 0;
      var y = 0;
      while (elm != null) {
        y += elm.offsetTop;
        x += elm.offsetLeft;
        elm = elm.offsetParent;
      }
      return [x, y];
    };
    
    var doIgnore = function(elm) {
      if (elm == null) return true;
      if (ignore != null) {
        for (var i = 0; i < ignore.length; i++) {
          if (elm == ignore[i])
            return true;
        }
      }
      return false;
    };
    
    document.addEventListener("mousedown", function(e){
      if (disabled || e.button != 0) return;
      var pass = false;
      var reg;
      var etp = e.target;
      while (!pass && etp != null) {
        for (var i = 0; i < allowedRegions.length; i++) {
          if (etp.parentNode == allowedRegions[i]) {
            pass = true;
            reg = allowedRegions[i];
            et = etp;
            break;
          }
        }
        etp = etp.parentNode;
      }
      if (!pass || doIgnore(et)) return;
      e.preventDefault();
      disabler = document.createElement("div");
      disabler.style.position = "fixed";
      disabler.style.top = "0px";
      disabler.style.left = "0px";
      disabler.style.width = "100%";
      disabler.style.height = "100%";
      disabler.style.border = "0px";
      disabler.style.margin = "0px";
      disabler.style.padding = "0px";
      disabler.style.zIndex = "9999998";
      document.body.appendChild(disabler);
      
      dragging = true;
      
      lastLegalRegion = reg;
      
      var os = $AbsoluteOffset(et);
      os[0] = (os[0] - window.pageXOffset);
      os[1] = (os[1] - window.pageYOffset);
      curRelative = [e.pageX - document.body.scrollLeft - os[0], e.pageY - document.body.scrollTop - os[1]];
      holderElement = et.cloneNode(true);
      holderElement.style.position = "fixed";
      holderElement.style.top = os[1] + "px";
      holderElement.style.left = os[0] + "px";
      holderElement.style.zIndex = "9999999";
      var het = holderElement;
      var hetr;
      hetr = function(het){
        het.title = "";
        het.setAttribute("data-button-action", "");
        het.setAttribute("data-tooltip-text", "");
        $RemoveCSS(het, "yt-uix-tooltip");
        for (var i = 0; i < het.children.length; i++) {
          hetr(het.children[i]);
        }
      };
      hetr(het);
      
      
      
      defaultVisibility = et.style.visibility || "";
      et.style.visibility = "hidden";
      
      et.parentNode.insertBefore(holderElement, et);
      
      if (listeners['drag']) {
        for (var i = 0; i < listeners['drag'].length; i++) {
          listeners['drag'][i](et, holderElement, lastLegalRegion);
        }
      }
    }, false);
    document.addEventListener("mouseup", function(e){
      if (!dragging) return;
      e.preventDefault();
      dragging = false;
      
      et.style.visibility = defaultVisibility;
      
      if (holderElement != null && holderElement.parentNode != null) {
        holderElement.parentNode.removeChild(holderElement);
      }
      holderElement = null;
      if (disabler != null && disabler.parentNode != null) {
        disabler.parentNode.removeChild(disabler);
      }
      disabler = null;
      
      if (listeners['drop']) {
        for (var i = 0; i < listeners['drop'].length; i++) {
          listeners['drop'][i](et, lastLegalRegion);
        }
      }
    }, false);
    document.addEventListener("mousemove", function(e){
      if (!dragging || disabled) return;
      e.preventDefault();
      
      var newX = e.pageX;
      var newY = e.pageY;
      
      holderElement.style.top = (e.pageY - document.body.scrollTop - curRelative[1]) + "px";
      holderElement.style.left = (e.pageX - document.body.scrollLeft - curRelative[0]) + "px";
      
      var p = lastLegalRegion;
      for (var i = 0; i < allowedRegions.length; i++) {
        var off = $AbsoluteOffset(allowedRegions[i]);
        if (newX >= off[0] && newX <= off[0] + allowedRegions[i].offsetWidth && (newY >= off[1] && newY <= off[1] + allowedRegions[i].offsetHeight)) {
          p = allowedRegions[i];
          break;
        }
      }
      
      var c = p.children;
      var item = null;
      for (var i = 0; i < c.length; i++) {
        if (c[i] == et || c[i] == holderElement || doIgnore(c[i])) continue;
        if (newX <= c[i].offsetWidth/2+$AbsoluteOffset(c[i])[0]) {
          item = c[i];
          break;
        }
      }
      
      var hep = et.parentNode;
      if (lastItem != item || p != lastLegalRegion) {
        hep.removeChild(et);
        if (item == null) {
          p.appendChild(et);
        } else {
          p.insertBefore(et, item);
        }
        if (listeners['move']) {
          for (var i = 0; i < listeners['move'].length; i++) {
            listeners['move'][i](et, holderElement, lastLegalRegion);
          }
        }
      }
      lastItem = item;
      lastLegalRegion = p;
      if (listeners['mousemove']) {
        for (var i = 0; i < listeners['mousemove'].length; i++) {
          listeners['mousemove'][i](et, holderElement, lastLegalRegion);
        }
      }
    }, false);
    return {
      setEnable: function(enable){
        disabled = !enable;
        return disabled;
      },
      isEnabled: function(){
        return !disabled;
      },
      addAllowedRegion: function(elm){
        for (var i = 0; i < allowedRegions.length; i++) {
          if (allowedRegions[i] == elm) return;
        }
        allowedRegions.push(elm);
      },
      removeAllowedRegion: function(elm){
        for (var i = 0; i < allowedRegions.length; i++) {
          if (allowedRegions[i] != elm) continue;
          allowedRegions.splice(i, 1);
          break;
        }
      },
      addEventListener: function(event, callback){
        if (!listeners[event]) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      }
    };
  }
  
  function $AbsoluteOffset(elm) {
    var pos = [elm.offsetLeft || 0, elm.offsetTop || 0];
    if (elm.offsetParent) {
      var ao = $AbsoluteOffset(elm.offsetParent);
      pos[0] += ao[0];
      pos[1] += ao[1];
    }
    
    return pos;
  }
  
  function $XMLHTTPRequest(details) {
    if (typeof GM_xmlhttpRequest != "undefined") {
      console.log("YTCenter: Using GM_xmlhttpRequest");
      GM_xmlhttpRequest(details);
    } else {
      var xmlhttp;
      if (typeof XMLHttpRequest != "undefined") {
        console.log("YTCenter: Using XMLHttpRequest");
        xmlhttp = new XMLHttpRequest();
      } else if (typeof opera != "undefined" && typeof opera.XMLHttpRequest != "undefined") {
        console.log("YTCenter: Using opera.XMLHttpRequest");
        xmlhttp = new opera.XMLHttpRequest();
      } else if (typeof uw != "undefined" && typeof uw.XMLHttpRequest != "undefined") {
        console.log("YTCenter: Using uw.XMLHttpRequest");
        xmlhttp = new uw.XMLHttpRequest();
      } else {
        if (details["onerror"]) {
          details["onerror"]();
        }
        return false;
      }
      xmlhttp.onreadystatechange = function(){
        var responseState = {
          responseXML:(xmlhttp.readyState == 4 ? xmlhttp.responseXML : ''),
          responseText:(xmlhttp.readyState == 4 ? xmlhttp.responseText : ''),
          readyState:xmlhttp.readyState,
          responseHeaders:(xmlhttp.readyState == 4 ? xmlhttp.getAllResponseHeaders() : ''),
          status:(xmlhttp.readyState == 4 ? xmlhttp.status : 0),
          statusText:(xmlhttp.readyState == 4 ? xmlhttp.statusText : '')
        };
        if (details["onreadystatechange"]) {
          details["onreadystatechange"](responseState);
        }
        if (xmlhttp.readyState == 4) {
          if (details["onload"] && xmlhttp.status >= 200 && xmlhttp.status < 300) {
            details["onload"](responseState);
          }
          if (details["onerror"] && (xmlhttp.status < 200 || xmlhttp.status >= 300)) {
            details["onerror"](responseState);
          }
        }
      };
      try {
        xmlhttp.open(details.method, details.url);
      } catch(e) {
        if(details["onerror"]) {
          details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
        }
        return;
      }
      if (details.headers) {
        for (var prop in details.headers) {
          xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
      }
      xmlhttp.send((typeof(details.data) != 'undefined') ? details.data : null);
    }
  }
  
  function $AddStyle(styles) {
    if(typeof GM_addStyle != "undefined") {
      console.log("YTCenter: Using GM_addStyle");
      GM_addStyle(styles);
    } else {
      var oStyle = document.createElement("style");
      oStyle.setAttribute("type", "text\/css");
      oStyle.appendChild(document.createTextNode(styles));
      if (document && document.getElementsByTagName("head")[0]) {
        document.getElementsByTagName("head")[0].appendChild(oStyle);
      }
    }
  }
  /* END UTILS */
  console.log("YTCenter: Fetching unsafeWindow");
  var uw, loc;
  if (window && window.navigator && window.navigator.vendor && window.navigator.vendor.match(/Google|Maxthon/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    uw = div.onclick();
  } else if (typeof unsafeWindow != "undefined") {
    uw = unsafeWindow;
  } else {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    uw = div.onclick();
    if (typeof uw == "undefined") {
      uw = window;
    }
  }
  if (typeof location != "undefined") {
    loc = location;
  } else {
    loc = uw.location;
  }
  
  if (!(new RegExp("^(http(s)?://)(((.*\.)?youtube\.com\/.*)|(dl\.dropbox\.com\/u/13162258/YouTube%20Center/(.*))|(userscripts\.org/scripts/source/114002\.meta\.js))$", "")).test(loc.href) || (new RegExp("http(s)?://apiblog\.youtube.com/.*", "")).test(loc.href)) {
    console.log("YTCenter: " + loc.href + " doesn't match!");
    return;
  }
  
  console.log("YTCenter: Initializing Functions");
  
  var yt;
  var ytcenter = {};
  ytcenter.version = "1.30.13";
  ytcenter.revision = 84;
  ytcenter.icon = {};
  console.log("YTCenter: Initializing icons");
  ytcenter.icon.gear = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAFM0aXcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAkFJREFUeNpi+v//P8OqVatcmVavXt3JwMDwGAAAAP//Yvr//z/D////GZhWr179f/Xq1RMBAAAA//9igqr5D8WKTAwQ0MPAwPCEgYGhBwAAAP//TMtBEUBQAAXA9ZsII8IrIIQOBHF5EdwU42TGffcT+/8e2No+MLAmmaDtMnC3PTEnuV4AAAD//zTOQRGCUAAG4YWrCbxSwQzYYDt452AGHCKQ4H9gAYNwcsabMeDyKLD7nY01SZfkn2ROMiV5n80euABf9VoFA3ArpYyt+gEe9bEDW6Uu6rMFUH8VcgdeaqMOAAcZZIiDMBQE0cdv0jQhQREMGDRB9B5Ihssguc2OhHsg4ACoKhQgSIPAbDGsG7GZee/HHhFVRByHPPRPbJ+BGbCxPU5HdQHewBrosvMFXCX1BTgAVQ4ZAXdgZftWgB3/9wRcJC3T8jaRpulgX2zXwAKY51cDXICmSOqTrQNOwEdSK+nxZZJ8VSIKoyD+24uw3CAIYhAEBZNdbK6r0ShM9AH2abRpNwhnwEfQVaPYDQZBk4KIZTX4p8wut33nMMw3Z2a6d/aqqp93W1WvSfm4gxlUVTvzIfYOgF/gy/ZzrF6KjJHtx+i9Bu5st9MeIOkGWAO+o38VuAJOgTdgPUQXwCYwB9DYHof1CegHdChpT9JI0gpwm/0BMAE+bY8bSUNgPil9BHRm+9L2ie0XYDv7+5jXkzScNv4HOAcWMr8Du6nccn5+SB//4tHs5gmwBeyEdRE46hDtS9pIhk084n8AVJscCePQvIsAAAAASUVORK5CYII=";
  ytcenter.icon.lightbulb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAANRJREFUeNqU0rFKBDEUheFvdSpRVmx8EF9EJJXWlj6KCoKCouD2F3wMm+220E6xs1YEZXVsgsTRzLCnSe495+cmJKO2bZVKKTU4wD428YxLnETEvMw2/mqC3aLewCG2sFcGR+XklNI2btS1ExE//lLX1K9ffhceD8DjPng6AE/74AleKuArrqtwRDzhvAJfZL86Ga7w1em1+a31whFxj1mnPYuIu0E46zav805t6IfBMdby8ZdxtAj8jlV8ZvhjEbjBOt6wUsvV7vyI07w/w8N/oe8BAO3xNxGbpir1AAAAAElFTkSuQmCC";
  console.log("YTCenter: Initializing refresh function");
  ytcenter.refreshHomepage = function(){
    if (typeof document.getElementById("masthead-expanded-container") == "undefined") return;
    if (typeof yt != "undefined" && typeof yt.www != "undefined" && typeof yt.www.masthead != "undefined" && typeof yt.www.masthead.toggleExpandedMasthead != "undefined") {
      yt.www.masthead.toggleExpandedMasthead();
      yt.www.masthead.toggleExpandedMasthead();
    }
  };
  console.log("YTCenter: Initializing Placement System");
  ytcenter.placementsystem = (function(){
    var database = [];
    var api = null;
    var sandboxes = [];
    var old_sandboxes = [];
    var setParentData = function(elm, parent){
      var new_sandbox,
          applyParentData;
      new_sandbox = (function(){
        for (var i = 0; i < sandboxes.length; i++) {
          if (sandboxes[i].id == parent) {
            return sandboxes[i];
          }
        }
      })();
      applyParentData = function(e){
        var nElm = [];
        var oElm = [];
        for (var i = 0; i < old_sandboxes.length; i++) {
          if (old_sandboxes[i][0] == e) {
            oElm = old_sandboxes[i][1];
          }
        }
        
        for (var i = 0; i < oElm.length; i++) {
          if (oElm[i].style) {
            for (var key in oElm[i].style) {
              if (oElm[i].style.hasOwnProperty(key)) {
                e.style[key] = "";
              }
            }
          }
          if (oElm[i].classNames) {
            for (var j = 0; j < oElm[i].classNames.length; j++) {
              $RemoveCSS(e, oElm[i].classNames[j]);
            }
          }
        }
        
        for (var i = 0; i < new_sandbox.elements.length; i++) {
          if (new_sandbox.elements[i].tagname.toLowerCase() === e.nodeName.toLowerCase()) {
            if (!new_sandbox.elements[i].condition || (new_sandbox.elements[i].condition && new_sandbox.elements[i].condition(elm, e, parent))) {
              nElm.push(new_sandbox.elements[i]);
            }
          }
        }
        for (var i = 0; i < nElm.length; i++) {
          if (nElm[i].style) {
            for (var key in nElm[i].style) {
              if (nElm[i].style.hasOwnProperty(key)) {
                e.style[key] = nElm[i].style[key];
              }
            }
          }
          if (nElm[i].classNames) {
            for (var j = 0; j < nElm[i].classNames.length; j++) {
              $AddCSS(e, nElm[i].classNames[j]);
            }
          }
        }
        var found = false;
        for (var i = 0; i < old_sandboxes.length; i++) {
          if (old_sandboxes[i][0] == e) {
            old_sandboxes[i][1] = nElm;
            found = true;
            break;
          }
        }
        if (!found) {
          old_sandboxes.push([e, nElm]);
        }
        
        for (var i = 0; i < e.children.length; i++) {
          applyParentData(e.children[i]);
        }
      };
      applyParentData(elm);
    };
    var rd = {
      init: function(whitelist, blacklist){
        if (ytcenter.watch7) return;
        sandboxes = whitelist;
        var wl = [],
            bl = [];
        for (var i = 0; i < whitelist.length; i++) {
          wl.push(document.getElementById(whitelist[i].id));
        }
        for (var i = 0; i < blacklist.length; i++) {
          bl.push(document.getElementById(blacklist[i]));
        }
        api = $DragList(wl, bl);
        api.addEventListener("drop", ytcenter.placementsystem.drop);
        api.addEventListener("move", ytcenter.placementsystem.move);
      },
      toggleEnable: function(){
        if (ytcenter.watch7) return;
        if (typeof api != "undefined") {
          api.setEnable(!api.isEnabled());
          return api.isEnabled();
        }
        return false;
      },
      registerElement: function(elm, query){
        if (ytcenter.watch7) return;
        console.log("YTCenter: Regisering Element to PlacementSystem: " + query);
        database.push([elm, query, []]);
      },
      registerNativeElements: function(){
        if (ytcenter.watch7) return;
        var bp = ytcenter.settings.buttonPlacement;
        for (var key in bp) {
          if (bp.hasOwnProperty(key)) {
            for (var i = 0; i < bp[key].length; i++) {
              if (bp[key][i].indexOf("@") == 0) continue;
              var ar = bp[key][i].split("&@&");
              try {
                var e = document.evaluate(ar[1], document.getElementById(ar[0]), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                database.push([e, bp[key][i], []]);
              } catch (e) {
                console.log("YTCenter: Couldn't find and register element: " + bp[key][i]);
              }
            }
          }
        }
      },
      getElement: function(query){
        if (ytcenter.watch7) return;
        for (var i = 0; i < database.length; i++) {
          if (database[i][1] === query) {
            return database[i][0];
          }
        }
        return null;
      },
      arrangeElements: function(){
        if (ytcenter.watch7) return;
        var bp = ytcenter.settings.buttonPlacement;
        for (var key in bp) {
          if (bp.hasOwnProperty(key)) {
            if (!document.getElementById(key)) continue;
            for (var i = 0; i < bp[key].length; i++) {
              var elm = ytcenter.placementsystem.getElement(bp[key][i]);
              if (elm != null) {
                if (elm.parentNode) {
                  setParentData(elm, elm.parentNode.id);
                  elm.parentNode.removeChild(elm);
                  document.getElementById(key).appendChild(elm);
                  setParentData(elm, key);
                } else {
                  setParentData(elm, key);
                  document.getElementById(key).appendChild(elm);
                }
                document.getElementById(key).appendChild(elm);
              }
            }
          }
        }
        for (var i = 0; i < database.length; i++) {
          if (!database[i][0] || !database[i][0].parentNode) continue;
          setParentData(database[i][0], database[i][0].parentNode.id);
        }
      },
      drop: function(elm){
        if (ytcenter.watch7) return;
        var new_parent = elm.parentNode.id;
        var new_next_sibling = elm.nextElementSibling;
        var query = (function(){
          for (var i = 0; i < database.length; i++) {
            if (database[i][0] == elm) {
              return database[i][1];
            }
          }
        })();
        var old_parent;
        var old_index;
        for (var key in ytcenter.settings.buttonPlacement) {
          if (ytcenter.settings.buttonPlacement.hasOwnProperty(key)) {
            var quit = false;
            for (var i = 0; i < ytcenter.settings.buttonPlacement[key].length; i++) {
              if (query == ytcenter.settings.buttonPlacement[key][i]) {
                old_index = i;
                old_parent = key;
                quit = true;
                break;
              }
            }
            if (quit) break;
          }
        }
        for (var i = 0; i < database.length; i++) {
          if (database[i][0] == null) continue;
          setParentData(database[i][0], database[i][0].parentNode.id);
        }
        ytcenter.settings.buttonPlacement[old_parent].splice(old_index, 1);
        if (new_next_sibling == null) {
          ytcenter.settings.buttonPlacement[new_parent].push(query);
        } else {
          var new_next_sibling_query = (function(){
            for (var i = 0; i < database.length; i++) {
              if (new_next_sibling == database[i][0]) {
                return database[i][1];
              }
            }
          })();
          for (var i = 0; i < ytcenter.settings.buttonPlacement[new_parent].length; i++) {
            if (ytcenter.settings.buttonPlacement[new_parent][i] == new_next_sibling_query) {
              ytcenter.settings.buttonPlacement[new_parent].splice(i, 0, query);
              break;
            }
          }
        }
        
        ytcenter.saveSettings();
      },
      move: function(){
        if (ytcenter.watch7) return;
        for (var i = 0; i < database.length; i++) {
          if (database[i][0] == null) continue;
          setParentData(database[i][0], database[i][0].parentNode.id);
        }
      }
    };
    return rd;
  })();
  console.log("YTCenter: Initializing database");
  ytcenter.database = (function(){
    var elements = [];
    var codeElements = [];
    
    var r = {};
    r.register = function(elm, locale, type, replaceDictionary){
      //console.log("YTCenter: Adding element to database");
      elements.push({
        element: elm,
        locale: locale,
        type: (type ? type : "text"),
        replaceDictionary: (replaceDictionary ? replaceDictionary : {})
      });
    };
    r.codeRegister = function(elm, code){
      //console.log("YTCenter: Adding element to code database");
      codeElements.push({
        element: elm,
        code: code
      });
    };
    r.applyLanguage = function(lang){
      console.log("YTCenter: Calling Database/Applying Language");
      for (var i = 0; i < elements.length; i++) {
        var l = $TextReplacer(lang[elements[i].locale], elements[i].replaceDictionary);
        var t = elements[i].type;
        var e = elements[i].element;
        if (t === "html") {
          e.innerHTML = l;
        } else if (t === "text") {
          e.textContent = l;
        } else if (t[0] == "@") { // Arguments
          e.setAttribute(t.substring(1), l);
        } else {
          throw "Unknown Type for element!";
        }
      }
      for (var i = 0; i < codeElements.length; i++) {
        codeElements[i].code.apply(codeElements[i].element, []);
      }
    };
    return r;
  })();
  ytcenter.language = {"en":{"LANGUAGE_AUTO":"Auto Detection","LANGUAGE":"English","HIGHRES":"Original Definition","HD1080":"Full High Definition","HD720":"High Definition","LARGE":"Enhanced Definition","MEDIUM":"Standard Definition","SMALL":"Low Definition","SETTINGS_HIGHRES":"Original Definition","SETTINGS_HD1080":"Full High Definition (1080p)","SETTINGS_HD720":"High Definition (720p)","SETTINGS_LARGE":"Enhanced Definition (480p)","SETTINGS_MEDIUM":"Standard Definition (360p)","SETTINGS_SMALL":"Low Definition (240p)","BUTTON_SETTINGS_CONTENT":"Settings","BUTTON_SETTINGS_TITLE":"Toggle YouTube Center Settings Panel","SETTINGS_TAB_GENERAL":"General","SETTINGS_TAB_PLAYER":"Player","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Download","SETTINGS_TAB_REPEAT":"Repeat","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"About","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Remove Advertisement","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Auto Expand Description","SETTINGS_ENABLESHORTCUTS_LABEL":"Enable Shortcuts on Page","SETTINGS_LANGUAGE":"Language","SETTINGS_PLAYERSIZE_LABEL":"Player Size","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Auto Hide Bar","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Doesn't work with the HTML5 player.","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Enable Auto Resolution","SETTINGS_AUTORESOLUTION_LABEL":"Auto Resolution","SETTINGS_PREVENTAUTOPLAY_LABEL":"Prevent Auto-Play","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Prevent Auto-Buffering","SETTINGS_ENABLEDOWNLOAD_LABEL":"Enable Download","SETTINGS_DOWNLOADQUALITY_LABEL":"Quality","SETTINGS_DOWNLOADFORMAT_LABEL":"Format","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Show 3D in Download Menu","SETTINGS_FILENAME_LABEL":"Filename","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Remove Non-Alphanumeric Characters","SETTINGS_ENABLEREPEAT_LABEL":"Enable Repeat","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Auto Activate Repeat","SETTINGS_PLAYERSIZE_LIST_SMALL":"Small","SETTINGS_PLAYERSIZE_LIST_LARGE":"Large","SETTINGS_PLAYERSIZE_LIST_FILL":"Fill","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"None","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Both Progressbar & Controlbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Only Progressbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Only Controlbar","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). All Rights Reserved.<br /><br />If you have any problems, complains, questions or compliments you're welcome to contact me on my email.<br />Contact me: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"No available download for {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Download Menu","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3 Services","BUTTON_REPEAT_TEXT":"Repeat","BUTTON_REPEAT_TOOLTIP":"Toggle Repeat","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Experimental</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash Mode","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clone (Recommended)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"None","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML5 Mode","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"None (Recommended)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Replace","SETTINGS_EXPERIMENTAL_NOTE":"Help me find the best mode for the flash and html5 player. Please fill the <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube Center Experimental Modes</a> form. Thanks.","SETTINGS_MP3SERVICES_LABEL":"MP3 Services","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Enable Annotations","SETTINGS_SCROLLTOPLAYER_LABEL":"Scroll To Player","UNKNOWN":"Unkown","SETTINGS_VOLUME_LABEL":"Volume","SETTINGS_MUTE_LABEL":"Mute","UPDATE_HTML":"New YouTube Center version available.<br />Install <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> or go to <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Scroll To Player","LIGHTBULB_TOOLTIP":"Turn Light On/Off","SETTINGS_LIGHTBULB_ENABLE":"Enable Turn Light On/Off","SETTINGS_LIGHTBULB_COLOR":"Light Color","SETTINGS_LIGHTBULB_TRANSPARENCY":"Light Transparency","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Window","SETTINGS_WMODE_DIRECT":"Direct","SETTINGS_WMODE_OPAQUE":"Opaque","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Player Theme","SETTINGS_PLAYERTHEME_DARK":"Dark","SETTINGS_PLAYERTHEME_LIGHT":"Light","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Content","SETTINGS_TAB_UPDATE":"Update","SETTINGS_UPDATE_ENABLE":"Enable Update Checker","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Check For New Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Checking For New Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Couldn't Contact Server. Try Again!","SETTINGS_UPDATE_INTERVAL":"Update Interval","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Always","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Every Hour","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Every 2 Hours","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Every 12 Hours","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Every Day","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Every Second Day","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Every Week","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Every Second Week","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Every Month","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Enable Volume Control","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Checked For Updates","SETTINGS_RESETSETTINGS_LABEL":"Reset Settings","SETTINGS_RESETSETTINGS_TEXT":"Do you want to reset the settings and refresh the page?","SETTINGS_PLAYERCOLOR_LABEL":"Player Color","SETTINGS_PLAYERCOLOR_RED":"Red","SETTINGS_PLAYERCOLOR_WHITE":"White","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Placement System</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Move Elements","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Translators:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Feature is currently only available on the YouTube video page. Go to any YouTube video to use this feature.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"da":{"LANGUAGE_AUTO":"Automatisk Detektion","LANGUAGE":"Dansk","HIGHRES":"Original Definition","HD1080":"Full High Definition","HD720":"High Definition","LARGE":"Enhanced Definition","MEDIUM":"Standard Definition","SMALL":"Low Definition","SETTINGS_HIGHRES":"Original Definition","SETTINGS_HD1080":"Full High Definition (1080p)","SETTINGS_HD720":"High Definition (720p)","SETTINGS_LARGE":"Enhanced Definition (480p)","SETTINGS_MEDIUM":"Standard Definition (360p)","SETTINGS_SMALL":"Low Definition (240p)","BUTTON_SETTINGS_CONTENT":"Indstillinger","BUTTON_SETTINGS_TITLE":"Vis/Skjul YouTube Center Indstillinger Panel","SETTINGS_TAB_GENERAL":"General","SETTINGS_TAB_PLAYER":"Afspiller","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Download","SETTINGS_TAB_REPEAT":"Gentag","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"Om","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Fjern Reklamer","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Automatisk Udvid Beskrivelse","SETTINGS_ENABLESHORTCUTS_LABEL":"Aktiver Genveje på Siden","SETTINGS_LANGUAGE":"Sprog","SETTINGS_PLAYERSIZE_LABEL":"Afspiller Størrelse","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Automatisk Skjul Bar","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Virker ikke med HTML5 afspilleren.","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Aktiver Automatisk Resolution","SETTINGS_AUTORESOLUTION_LABEL":"Automatisk Resolution","SETTINGS_PREVENTAUTOPLAY_LABEL":"Forhindre Automatisk Afspilling","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Forhindre Automatisk Buffer","SETTINGS_ENABLEDOWNLOAD_LABEL":"Aktiver Download","SETTINGS_DOWNLOADQUALITY_LABEL":"Kvalitet","SETTINGS_DOWNLOADFORMAT_LABEL":"Format","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Vis 3D i Download Menuen","SETTINGS_FILENAME_LABEL":"Filnavn","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Slet Ikke-Alfanumeriske Tegn","SETTINGS_ENABLEREPEAT_LABEL":"Aktiver Gentag","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Automatisk Aktiver Gentag","SETTINGS_PLAYERSIZE_LIST_SMALL":"Lille","SETTINGS_PLAYERSIZE_LIST_LARGE":"Stor","SETTINGS_PLAYERSIZE_LIST_FILL":"Fyld","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Ingen","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Både ProgressBar & Controlbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Kun ProgressBar","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Kun Controlbar","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Alle rettigheder forbeholdes.<br /><br />Hvis du har nogen problemer, klager, spørgsmål eller komplimenter, er du velkommen til at kontakte mig op min email.<br />Kontakt mig: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Intet tilgængeligt for {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Download Menu","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3 Tjenester","BUTTON_REPEAT_TEXT":"Gentag","BUTTON_REPEAT_TOOLTIP":"Slå Gentag Til/Fra","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Eksperimentalt</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash Indstilling","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Klon (Anbefales)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Intet","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML5 Indstilling","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Intet (Anbefales)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Erstat","SETTINGS_EXPERIMENTAL_NOTE":"Hjælp mig med at finde den bedste indstilling for flash og HTML5 playeren. Udfyld <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube Center Experimental Modes</a> formen. Tak.","SETTINGS_MP3SERVICES_LABEL":"MP3 Tjenester","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Aktiver Annotationer","SETTINGS_SCROLLTOPLAYER_LABEL":"Gå Til Afspilleren","UNKNOWN":"Ukendt","SETTINGS_VOLUME_LABEL":"Lydstyrke","SETTINGS_MUTE_LABEL":"Lydløs","UPDATE_HTML":"Ny YouTube Center version tilgængelig.<br />Installer <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> eller gå til <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Rul Til Afspiller","LIGHTBULB_TOOLTIP":"Slå Lys Til/Fra","SETTINGS_LIGHTBULB_ENABLE":"Aktiver Slå Lys Til/Fra","SETTINGS_LIGHTBULB_COLOR":"Slå Lys Fra Farve","SETTINGS_LIGHTBULB_TRANSPARENCY":"Slå Lys Fra Gennemsigtighed","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Vindue","SETTINGS_WMODE_DIRECT":"Direkte","SETTINGS_WMODE_OPAQUE":"Uigennemsigtig","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Afspiller Tema","SETTINGS_PLAYERTHEME_DARK":"Mørk","SETTINGS_PLAYERTHEME_LIGHT":"Lys","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Indhold","SETTINGS_TAB_UPDATE":"Opdater","SETTINGS_UPDATE_ENABLE":"Aktiver Opdatering Tjekker","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Tjek For Nye Opdateringer","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Tjekker For Nye Opdateringer","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Kunne Ikke Kontakte Server. Prøv Igen!","SETTINGS_UPDATE_INTERVAL":"Opdatering Interval","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Altid","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Hver Time","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Hver 2. Time","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Hver 12. Time","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Hver Dag","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Hver 2. Dag","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Hver Uge","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Hver 2. Uge","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Hver Måned","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Aktiver Volume Kontrol","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Tjekket For Opdateringer","SETTINGS_RESETSETTINGS_LABEL":"Nulstil Indstillingerne","SETTINGS_RESETSETTINGS_TEXT":"Er du sikker på at du vil nulstille indstillingerne og genlæse siden?","SETTINGS_PLAYERCOLOR_LABEL":"Afspiller Farve","SETTINGS_PLAYERCOLOR_RED":"Rød","SETTINGS_PLAYERCOLOR_WHITE":"Hvid","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Placering System</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Flyt Elementer","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Oversættere:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Feature is currently only available on the YouTube video page. Go to any YouTube video to use this feature.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Opdater HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"ar-bh":{"LANGUAGE_AUTO":"الكشف التلقائي","LANGUAGE":"العربيه","HIGHRES":"الدقه الاصليه","HD1080":"دقه عالية الوضوح","HD720":"دقه عاليه","LARGE":"دقه محسنه","MEDIUM":"دقه قياسيه","SMALL":"دقه منخفضه","SETTINGS_HIGHRES":"الدقه الاصليه","SETTINGS_HD1080":"دقه عالية الوضوح (1080p)","SETTINGS_HD720":"دقه عاليه  (720p)","SETTINGS_LARGE":"دقه محسنه (480p)","SETTINGS_MEDIUM":"دقه قياسيه  (360p)","SETTINGS_SMALL":"دقه منخفضه  (240p)","BUTTON_SETTINGS_CONTENT":"الإعدادات","BUTTON_SETTINGS_TITLE":"تبديل لوحة إعدادات مركز يوتيوب","SETTINGS_TAB_GENERAL":"عام","SETTINGS_TAB_PLAYER":"مشغل","SETTINGS_TAB_VIDEO":"فيديو","SETTINGS_TAB_DOWNLOAD":"تحميل","SETTINGS_TAB_REPEAT":"التكرار","SETTINGS_TAB_DEBUG":"تصحيح","SETTINGS_TAB_ABOUT":"حول","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"إزالة الإعلان","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"وصف موسع تلقائي","SETTINGS_ENABLESHORTCUTS_LABEL":"تمكين الإختصارات في الصفحه","SETTINGS_LANGUAGE":"اللغه","SETTINGS_PLAYERSIZE_LABEL":"حجم المشغل","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"إخفاء الشريط تلقائيا","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"لايمكن ان تعمل مع مشغل HTML5","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"تمكين الدقه التلقائيه","SETTINGS_AUTORESOLUTION_LABEL":"الدقه التلقائيه","SETTINGS_PREVENTAUTOPLAY_LABEL":"منع التشغيل التلقائي","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"منع التخزين التلقائي","SETTINGS_ENABLEDOWNLOAD_LABEL":"تمكين التحميل","SETTINGS_DOWNLOADQUALITY_LABEL":"الجوده","SETTINGS_DOWNLOADFORMAT_LABEL":"الصيغه","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"عرض 3D في قائمة التحميل","SETTINGS_FILENAME_LABEL":"اسم الملف","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"حذف الحروف الغير ابجديه","SETTINGS_ENABLEREPEAT_LABEL":"تمكين التكرار","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"تنشيط الإعاده التلقائيه","SETTINGS_PLAYERSIZE_LIST_SMALL":"صغير","SETTINGS_PLAYERSIZE_LIST_LARGE":"كبير","SETTINGS_PLAYERSIZE_LIST_FILL":"ملئ","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"لاشئ","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"جميعا شريط التقدم وشريط التحكم","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"شريط التقدم فقط","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"التحكم بالشريط فقط","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>مركز يوتيوب</h2>حقوق النسخ © 2011 - 2012 Jeppe Rune Mortensen (YePpHa).جميع الحقوق محفوظه<br /><br />إذا كان لديك مشكله او شكوى او اسئلة او مجاملتي فنحن نرحب بك بلإتصال بي على بريدي الإلكتروني.<br />اتصل بي: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"تحميل","BUTTON_DOWNLOAD_TOOLTIP":"تحميل {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"التحميل غير متوفر في {type}","BUTTON_DOWNlOAD2_TOOLTIP":"قائمة التحميل","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"خدمات MP3","BUTTON_REPEAT_TEXT":"تكرار","BUTTON_REPEAT_TOOLTIP":"تبديل التكرار","SETTINGS_EXPERIMENTAL_TITLE":"<h3>تجريبي</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"نمط الفلاش","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"استنساخ (منصوح به)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"لاشئ","SETTINGS_EXPERIMENTAL_HTML5MODE":"نمط HTML5","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"لاشئ (منصوح به)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"إستبدال","SETTINGS_EXPERIMENTAL_NOTE":"مساعدتي بإيجاد افضل نمط من الفلاش ومشغل html5.الرجاء ملئ هذا <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">الانماط التجربيه لمركز يوتيوب</a> form. شكرا.","SETTINGS_MP3SERVICES_LABEL":"خدمات MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"تمكين الشروح","SETTINGS_SCROLLTOPLAYER_LABEL":"انتقل الى المشغل","UNKNOWN":"غير معروف","SETTINGS_VOLUME_LABEL":"جهاز الصوت","SETTINGS_MUTE_LABEL":"كتم","UPDATE_HTML":"نسخه جديده من مركز يوتيوب متوفره.<br /> تثبيت<a href=\"{scripturl}\" target=\"_blank\">مركز يوتيوبv{version}</a> او الذهاب الى <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"انتقل الى التشغيل","LIGHTBULB_TOOLTIP":"إيقاف او تشغيل الإضاءه","SETTINGS_LIGHTBULB_ENABLE":"تمكين عمل الإضاءه تشغيل او قفل","SETTINGS_LIGHTBULB_COLOR":"إيقاف الوان الإضاءه","SETTINGS_LIGHTBULB_TRANSPARENCY":"إيقاف شفافية الضوء","SETTINGS_WMODE_LABEL":"فلاش WMode","SETTINGS_WMODE_WINDOW":"النافذه","SETTINGS_WMODE_DIRECT":"مباشره","SETTINGS_WMODE_OPAQUE":"غير شفاف","SETTINGS_WMODE_TRANSPARENT":"شفاف","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"ثيم المشغل","SETTINGS_PLAYERTHEME_DARK":"مظلم","SETTINGS_PLAYERTHEME_LIGHT":"إضاءه","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"المحتوى","SETTINGS_TAB_UPDATE":"تحديث","SETTINGS_UPDATE_ENABLE":"تمكين فحص التحديث","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"فحص التحديثات الجديده","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"فحص التحديثات الجديده","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"لايمكن الإتصال بالخادم.حاول مرة اخرى!","SETTINGS_UPDATE_INTERVAL":"تحديث الفاصل الزمني","SETTINGS_UPDATE_INTERVAL_ALWAYS":"دائما","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"كل ساعه","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"كل ساعتين","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"كل 12 ساعه","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"كل يوم","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"كل يومين","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"كل اسبوع","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"كل اسبوعين","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"كل شهر","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"تمكين التحكم بالصوت","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"للتأكد من التحديثات","SETTINGS_RESETSETTINGS_LABEL":"Reset Settings","SETTINGS_RESETSETTINGS_TEXT":"Do you want to reset the settings and refresh the page?","SETTINGS_PLAYERCOLOR_LABEL":"Player Color","SETTINGS_PLAYERCOLOR_RED":"Red","SETTINGS_PLAYERCOLOR_WHITE":"White","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Placement System</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Move Elements","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Translators:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Feature is currently only available on the YouTube video page. Go to any YouTube video to use this feature.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"it":{"LANGUAGE_AUTO":"Riconoscimento automatico","LANGUAGE":"Italiano","HIGHRES":"Definizione originale","HD1080":"Altissima definizione","HD720":"Alta definizione","LARGE":"Definizione migliorata","MEDIUM":"Definizione standard","SMALL":"Bassa definizione","SETTINGS_HIGHRES":"Definizione originale","SETTINGS_HD1080":"Altissima definizione (1080p)","SETTINGS_HD720":"Alta definizione (720p)","SETTINGS_LARGE":"Definizione migliorata (480p)","SETTINGS_MEDIUM":"Definizione standard (360p)","SETTINGS_SMALL":"Bassa definizione (240p)","BUTTON_SETTINGS_CONTENT":"Impostazioni","BUTTON_SETTINGS_TITLE":"Mostra/nascondi pannello impostazioni di YouTube Center","SETTINGS_TAB_GENERAL":"Generale","SETTINGS_TAB_PLAYER":"Player","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Download","SETTINGS_TAB_REPEAT":"Ripeti","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"Info","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Rimuovi la pubblicità","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Espandi automaticamente la descrizione","SETTINGS_ENABLESHORTCUTS_LABEL":"Abilita le scorciatoie da tastiera sulla pagina","SETTINGS_LANGUAGE":"Lingua","SETTINGS_PLAYERSIZE_LABEL":"Dimensioni del player","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Nascondi automaticamente la barra","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Non funziona con il player HTML5.","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Abilita risoluzione automatica","SETTINGS_AUTORESOLUTION_LABEL":"Risoluzione automatica","SETTINGS_PREVENTAUTOPLAY_LABEL":"Impedisci la riproduzione automatica","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Impedisci il caricamento automatico","SETTINGS_ENABLEDOWNLOAD_LABEL":"Abilita download","SETTINGS_DOWNLOADQUALITY_LABEL":"Qualità","SETTINGS_DOWNLOADFORMAT_LABEL":"Formato","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Mostra 3D nel menu di download","SETTINGS_FILENAME_LABEL":"Nome del file","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Rimuovi i caratteri non alfanumerici","SETTINGS_ENABLEREPEAT_LABEL":"Abilita la ripetizione","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Attiva automaticamente la ripetizione","SETTINGS_PLAYERSIZE_LIST_SMALL":"Piccolo","SETTINGS_PLAYERSIZE_LIST_LARGE":"Grande","SETTINGS_PLAYERSIZE_LIST_FILL":"Adatta","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Nessuna","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Barra di avanzamento e dei comandi","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Solo la barra di avanzamento","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Solo la barra dei comandi","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Tutti i diritti riservati.<br /><br />Se avessi problemi, lamentele, domande o complimenti contattami pure via email.<br />Contattami: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Nessun download disponibile per {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Menu di download","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"Servizi MP3","BUTTON_REPEAT_TEXT":"Ripeti","BUTTON_REPEAT_TOOLTIP":"Attiva/disattiva Ripeti","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Sperimentale</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Modalità Flash","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clone (raccomandato)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Nessuna","SETTINGS_EXPERIMENTAL_HTML5MODE":"Modalità HTML5","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Nessuno (raccomandato)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Sostituisci","SETTINGS_EXPERIMENTAL_NOTE":"Aiutami a trovare la modalità migliore per i player Flash e HTML5. Per favore compila il modulo <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">Modalità sperimentali di YouTube Center</a>. Grazie.","SETTINGS_MP3SERVICES_LABEL":"Servizi MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Abilita le annotazioni","SETTINGS_SCROLLTOPLAYER_LABEL":"Scorri al player","UNKNOWN":"Sconosciuto","SETTINGS_VOLUME_LABEL":"Volume","SETTINGS_MUTE_LABEL":"Muto","UPDATE_HTML":"È disponibile una nuova versione di YouTube Center.<br />Installa <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> o vai su <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Scorri fino al player","LIGHTBULB_TOOLTIP":"Accendi/spegni la luce","SETTINGS_LIGHTBULB_ENABLE":"Abilita il controllo della luce","SETTINGS_LIGHTBULB_COLOR":"Colore luce","SETTINGS_LIGHTBULB_TRANSPARENCY":"Trasparenza luce","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Finestra","SETTINGS_WMODE_DIRECT":"Diretta","SETTINGS_WMODE_OPAQUE":"Opaca","SETTINGS_WMODE_TRANSPARENT":"Trasparente","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Tema player","SETTINGS_PLAYERTHEME_DARK":"Scuro","SETTINGS_PLAYERTHEME_LIGHT":"Chiaro","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Contenuto","SETTINGS_TAB_UPDATE":"Aggiorna","SETTINGS_UPDATE_ENABLE":"Abilita il controllo degli aggiornamenti","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Controlla aggiornamenti","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Controllo gli aggiornamenti","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Non ho potuto contattare il server. Prova ancora!","SETTINGS_UPDATE_INTERVAL":"Intervallo di aggiornamento","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Sempre","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Ogni ora","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Ogni 2 ore","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Ogni 12 ore","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Ogni giorno","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Ogni due giorni","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Ogni settimana","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Ogni due settimane","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Ogni mese","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Abilita il controllo del volume","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Ho controllato gli aggiornamenti","SETTINGS_RESETSETTINGS_LABEL":"Ripristina impostazioni","SETTINGS_RESETSETTINGS_TEXT":"Vuoi ripristinare le impostazioni e ricaricare la pagina?","SETTINGS_PLAYERCOLOR_LABEL":"Colore player","SETTINGS_PLAYERCOLOR_RED":"Rosso","SETTINGS_PLAYERCOLOR_WHITE":"Bianco","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Sistema di posizionamento</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Sposta elementi","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Traduttori:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Visualizza","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"La funzione è attualmente disponibile soltanto sulla pagina video di YouTube. Vai su qualunque video di YouTube per usare questa funzione.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"he":{"LANGUAGE_AUTO":" זיהוי עצמי ","LANGUAGE":" עברית ","HIGHRES":" איכות מקורית ","HD1080":" איכות HD מלא ","HD720":" איכות HD ","LARGE":" איכות משופרת ","MEDIUM":" איכות רגילה ","SMALL":" איכות נמוכה ","SETTINGS_HIGHRES":" איכות מקורית ","SETTINGS_HD1080":" איכות HD מלא (1080p) ","SETTINGS_HD720":" איכות HD רגיל (720p) ","SETTINGS_LARGE":" איכות משופרת (480p) ","SETTINGS_MEDIUM":" איכות רגילה (360p) ","SETTINGS_SMALL":" איכות נמוכה (240p) ","BUTTON_SETTINGS_CONTENT":"הגדרות","BUTTON_SETTINGS_TITLE":"הגדרות מרכז YouTube (דו־מצבי)","SETTINGS_TAB_GENERAL":"כללי","SETTINGS_TAB_PLAYER":"נגן","SETTINGS_TAB_VIDEO":"וידאו","SETTINGS_TAB_DOWNLOAD":"הורדה","SETTINGS_TAB_REPEAT":"חזרה","SETTINGS_TAB_DEBUG":"ניפוי","SETTINGS_TAB_ABOUT":"אודות","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"הסר פרסומות","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"הרחב תיאור סרטון לבד","SETTINGS_ENABLESHORTCUTS_LABEL":"הפעל קיצורי דרך בדף","SETTINGS_LANGUAGE":"שפה","SETTINGS_PLAYERSIZE_LABEL":"גודל נגן","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"הסתרת סרגל תפעול באופן עצמי","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"אינו פועל עם נגן HTML5.","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"הפעל חדות באופן עצמי","SETTINGS_AUTORESOLUTION_LABEL":"זיהוי חדות באופן עצמי","SETTINGS_PREVENTAUTOPLAY_LABEL":"מנע הפעלה עצמית","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"מנע אגירה עצמית","SETTINGS_ENABLEDOWNLOAD_LABEL":"אפשר הורדה","SETTINGS_DOWNLOADQUALITY_LABEL":"איכות","SETTINGS_DOWNLOADFORMAT_LABEL":"תבנית","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"הצג 3D בתפריט הורדה","SETTINGS_FILENAME_LABEL":"שם קובץ","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"הסר תווים שאינם אותיות ומספרים","SETTINGS_ENABLEREPEAT_LABEL":"הפעל חזרה","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"חזור על הפעלה באופן עצמי","SETTINGS_PLAYERSIZE_LIST_SMALL":" קטן ","SETTINGS_PLAYERSIZE_LIST_LARGE":" גדול ","SETTINGS_PLAYERSIZE_LIST_FILL":" מלא ","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":" ללא שינוי ","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":" מד התקדמות ושורת פקדים ","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":" מד התקדמות בלבד ","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":" שורת פקדים בלבד ","SETTINGS_DOWNLOADFORMAT_LIST_MP4":" MP4 ","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":" WebM ","SETTINGS_DOWNLOADFORMAT_LIST_FLV":" FLV ","SETTINGS_ABOUT_HTML":"<h2>מרכז YouTube</h2>זכויות יוצרים © 2011 - 2012 של ג'פה רונה מורטנסן (YePpHa). כל הזכויות שמורות.<br /><br />אם יש לך בעיות, תלונות, שאלות או מחמאות הינך מוזמן ליצור איתי קשר.<br />אי־מייל: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a><br /><br />","BUTTON_DOWNLOAD_TEXT":"הורדה","BUTTON_DOWNLOAD_TOOLTIP":"הורדה {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"אין הורדה זמינה עבור {type}","BUTTON_DOWNlOAD2_TOOLTIP":"תפריט הורדה","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"שירותי MP3","BUTTON_REPEAT_TEXT":"נגן שוב","BUTTON_REPEAT_TOOLTIP":"חזור על פעולה זו (דו־מצבי)","SETTINGS_EXPERIMENTAL_TITLE":"<h3>נסיוני</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"מצב Flash","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":" תואם (מומלץ) ","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":" Src ","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":" Remapp ","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":" Reinit ","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":" ללא שינוי ","SETTINGS_EXPERIMENTAL_HTML5MODE":"מצב HTML5","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":" ללא שינוי (מומלץ) ","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":" החלפה ","SETTINGS_EXPERIMENTAL_NOTE":"עזור לי למצוא את המצב הטוב ביותר עבור נגן FLASH ו־ HTML5. אנא מלא את טופס <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\"> מצב הניסוי של מרכז YouTube</a>. תודה.","SETTINGS_MP3SERVICES_LABEL":"שירותי MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":" Video2MP3.net ","SETTINGS_MP3SERVICES_YOUTUBEMP3":" YouTube-MP3.org ","SETTINGS_ENABLEANNOTATIONS_LABEL":"אפשר ביאורים","SETTINGS_SCROLLTOPLAYER_LABEL":"גלול אל הנגן","UNKNOWN":"לא ידוע","SETTINGS_VOLUME_LABEL":"עוצמה","SETTINGS_MUTE_LABEL":"השתק","UPDATE_HTML":"גירסה חדשה של מרכז YouTube זמינה.<br />התקנה <a \nhref=\"{scripturl}\" target=\"_blank\">YouTube מרכז \n{version}</a> או עבור אל <a href=\"{siteurl}\" \ntarget=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"גלול אל הנגן","LIGHTBULB_TOOLTIP":"הפעל את האור/ביטול ","SETTINGS_LIGHTBULB_ENABLE":"אפשר/בטל דמדום","SETTINGS_LIGHTBULB_COLOR":"צבע כיבוי תאורה","SETTINGS_LIGHTBULB_TRANSPARENCY":"שקיפות כיבוי תאורה","SETTINGS_WMODE_LABEL":"סגנון הפעלת Flash","SETTINGS_WMODE_WINDOW":" נפרד ","SETTINGS_WMODE_DIRECT":" ישיר ","SETTINGS_WMODE_OPAQUE":" אטום ","SETTINGS_WMODE_TRANSPARENT":" שקוף ","SETTINGS_WMODE_GPU":" מהיר ","SETTINGS_PLAYERTHEME_LABEL":"ערכת נושא של הנגן","SETTINGS_PLAYERTHEME_DARK":" כהה ","SETTINGS_PLAYERTHEME_LIGHT":" בהיר ","SETTINGS_PLAYERSIZE_LIST_15X":" 1.5x ","SETTINGS_PLAYERSIZE_LIST_2X":" 2x ","SETTINGS_PLAYERSIZE_LIST_25X":" 2.5x","SETTINGS_PLAYERSIZE_LIST_3X":" 3x ","SETTINGS_PLAYERSIZE_LIST_360P":" (360p (16:9 ","SETTINGS_PLAYERSIZE_LIST_480P":" (480p (16:9 ","SETTINGS_PLAYERSIZE_LIST_720P":" (720p (16:9 ","SETTINGS_PLAYERSIZE_LIST_1080P":" (1080p (16:9 ","SETTINGS_PLAYERSIZE_LIST_CONTENT":"תוכן","SETTINGS_TAB_UPDATE":"עדכון","SETTINGS_UPDATE_ENABLE":"אפשר בדיקת עדכונים","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"בדוק אם יש עדכונים חדשים","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"בודק אם קיימים עדכונים חדשים","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"לא היתה אפשרות ליצור קשר עם השרת. נסה שוב!","SETTINGS_UPDATE_INTERVAL":"תדירות עדכון","SETTINGS_UPDATE_INTERVAL_ALWAYS":"תמיד","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"כל שעה","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"כל 2 שעות","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"כל 12 שעות","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"כל יום","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"כל יום שני","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"כל שבוע","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"כל שבוע שני","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"כל חודש","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"אפשר בקרת עוצמה","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"לא קיימים עדכונים חדשים","SETTINGS_RESETSETTINGS_LABEL":"איפוס הגדרות לברירת מחדל","SETTINGS_RESETSETTINGS_TEXT":"האם ברצונך לאפס את ההגדרות, ולרענן את הדף?","SETTINGS_PLAYERCOLOR_LABEL":"צבע נגן","SETTINGS_PLAYERCOLOR_RED":"אדום","SETTINGS_PLAYERCOLOR_WHITE":"לבן","SETTINGS_PLACEMENTSYSTEM_HTML":"סידור מערכת","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"הזז רכיבים","SETTINGS_ABOUT_TRANSLATORS_HTML":"מתרגמים:","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"תצוגה","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"תכונה זו זמינה כעת רק בעמוד וידאו של YouTube. עבור אל עמוד וידאו של YouTube כלשהו, כדי להשתמש בתכונה זו.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"es":{"LANGUAGE_AUTO":"Detección Automática","LANGUAGE":"Español","HIGHRES":"Definición Original","HD1080":"Full HD","HD720":"Alta Definición","LARGE":"Definición Mejorada","MEDIUM":"Definición Estándar","SMALL":"Baja Definición","SETTINGS_HIGHRES":"Definición Original","SETTINGS_HD1080":"Full HD (1080p)","SETTINGS_HD720":"Alta Definición (720p)","SETTINGS_LARGE":"Definición Mejorada (480p)","SETTINGS_MEDIUM":"Definición Estándar (360p)","SETTINGS_SMALL":"Baja Definición (240p)","BUTTON_SETTINGS_CONTENT":"Opciones","BUTTON_SETTINGS_TITLE":"Mostrar Menú Opciones","SETTINGS_TAB_GENERAL":"General","SETTINGS_TAB_PLAYER":"Reproductor","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Descarga","SETTINGS_TAB_REPEAT":"Repetir","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"Acerca de","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Quitar Publicidad","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Auto Expandir Descripción","SETTINGS_ENABLESHORTCUTS_LABEL":"Permitir Atajos en la Página","SETTINGS_LANGUAGE":"Idioma","SETTINGS_PLAYERSIZE_LABEL":"Tamaño del Reproductor","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Esconder la Barra","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"No Funciona Con Reproductor HTML5","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Permitir Cambio Automático De Resolución","SETTINGS_AUTORESOLUTION_LABEL":"Resolución Automática","SETTINGS_PREVENTAUTOPLAY_LABEL":"Prevenir la Reproducción Automática","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Prevenir la Carga del Video","SETTINGS_ENABLEDOWNLOAD_LABEL":"Agregar menú Para Descarga del Video","SETTINGS_DOWNLOADQUALITY_LABEL":"Calidad","SETTINGS_DOWNLOADFORMAT_LABEL":"Formato","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Mostrar Menú 3D","SETTINGS_FILENAME_LABEL":"Nombre del Archivo","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Quitar Caracteres Alfanuméricos","SETTINGS_ENABLEREPEAT_LABEL":"Agregar Opción de Repetición","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Repetir Automáticamente Todos Los Videos","SETTINGS_PLAYERSIZE_LIST_SMALL":"Pequeño","SETTINGS_PLAYERSIZE_LIST_LARGE":"Grande","SETTINGS_PLAYERSIZE_LIST_FILL":"Llenar Ventana","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Ninguno","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Barra de Progreso y Controles","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Sólo Barra de Progreso","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Sólo Controles","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2> Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Todos los derechos reservados.<br /><br />Si tienes algún problema, queja, preguntas, o si quieres dejarme algún comentario, eres libre de hacerlo por mail a mi casilla de correo:<a href=\"mailto:jepperm@gmail.com\"> jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Descarga","BUTTON_DOWNLOAD_TOOLTIP":"Descarga {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Descarga no disponible para {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Menú de Descarga","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"Servicios de MP3","BUTTON_REPEAT_TEXT":"Repetir","BUTTON_REPEAT_TOOLTIP":"Activar Repetición","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Experimental</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Modo Flash","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clonar (Recomendado)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapeado","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reiniciado","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Ninguno","SETTINGS_EXPERIMENTAL_HTML5MODE":"Modo HTML5","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Ninguno (Recomendado)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Reemplazar","SETTINGS_EXPERIMENTAL_NOTE":"Ayúdame a encontrar el mejor modo para la reproducción en HTML5. Por favor llena el formulario de <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\"> Youtube Center Modos Experimentales </a>. Gracias.","SETTINGS_MP3SERVICES_LABEL":"Servicios de MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Permitir Anotaciones","SETTINGS_SCROLLTOPLAYER_LABEL":"Auto Deslizar Hasta el Video","UNKNOWN":"Desconocido","SETTINGS_VOLUME_LABEL":"Volumen","SETTINGS_MUTE_LABEL":"Mudo","UPDATE_HTML":"Nueva Versión de YouTube Center Disponible.<br />Instalar <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> o ir a <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Auto Deslizar Hasta el Video","LIGHTBULB_TOOLTIP":"Prender/Apagar las Luces","SETTINGS_LIGHTBULB_ENABLE":"Permitir el Apagado/Encendido de las Luces","SETTINGS_LIGHTBULB_COLOR":"Color de la Luz Apagada","SETTINGS_LIGHTBULB_TRANSPARENCY":"Transparencia de la Oscuridad","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Ventana","SETTINGS_WMODE_DIRECT":"Directo","SETTINGS_WMODE_OPAQUE":"Opaco","SETTINGS_WMODE_TRANSPARENT":"Transparente","SETTINGS_WMODE_GPU":"Procesador Gráfico","SETTINGS_PLAYERTHEME_LABEL":"Color del Reproductor","SETTINGS_PLAYERTHEME_DARK":"Negro","SETTINGS_PLAYERTHEME_LIGHT":"Blanco","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Contenido","SETTINGS_TAB_UPDATE":"Actualizar","SETTINGS_UPDATE_ENABLE":"Buscar Actualizaciones","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Buscar Actualizaciones","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Buscando Actualizaciones","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Servidor no encontrado. Pruebe nuevamente.","SETTINGS_UPDATE_INTERVAL":"Intervalo de Busqueda","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Siempre","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Cada Hora","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Cada 2 Horas","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Cada 12 Horas","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Todos los Dias","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Dia por Medio","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Todas las Semanas","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Semana por Medio","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Todos los meses","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Permitir el Control del Volumen","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Actualizaciones Encontradas","SETTINGS_RESETSETTINGS_LABEL":"Resetear Configuración","SETTINGS_RESETSETTINGS_TEXT":"¿Estas seguro de que quieres resetear la configuración y recargar la pagina?","SETTINGS_PLAYERCOLOR_LABEL":"Player Color","SETTINGS_PLAYERCOLOR_RED":"Red","SETTINGS_PLAYERCOLOR_WHITE":"White","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Placement System</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Move Elements","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Translators:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Feature is currently only available on the YouTube video page. Go to any YouTube video to use this feature.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"fr":{"LANGUAGE_AUTO":"Auto","LANGUAGE":"Français","HIGHRES":"Définition Native","HD1080":"Full HD","HD720":"HD","LARGE":"HQ","MEDIUM":"SQ","SMALL":"LQ","SETTINGS_HIGHRES":"Définition Native","SETTINGS_HD1080":"HD 1080p","SETTINGS_HD720":"HD 720p","SETTINGS_LARGE":"HQ 480p","SETTINGS_MEDIUM":"SQ 360p","SETTINGS_SMALL":"LQ 240p","BUTTON_SETTINGS_CONTENT":"Options","BUTTON_SETTINGS_TITLE":"Paramètres","SETTINGS_TAB_GENERAL":"Général","SETTINGS_TAB_PLAYER":"Player","SETTINGS_TAB_VIDEO":"Vidéo","SETTINGS_TAB_DOWNLOAD":"Téléchargement","SETTINGS_TAB_REPEAT":"Répétition","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"À Propos","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Enlever les publicités","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Agrandir la description automatiquement","SETTINGS_ENABLESHORTCUTS_LABEL":"Activer les raccourcis clavier","SETTINGS_LANGUAGE":"Langue","SETTINGS_PLAYERSIZE_LABEL":"Taille du player","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Masquer automatiquement la barre de contrôles","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Ne fonctionne pas avec le player HTML5","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Sélection automatique de la qualité","SETTINGS_AUTORESOLUTION_LABEL":"Qualité de la vidéo","SETTINGS_PREVENTAUTOPLAY_LABEL":"Bloquer la lecture automatique","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Bloquer le chargement automatique","SETTINGS_ENABLEDOWNLOAD_LABEL":"Permettre le téléchargement","SETTINGS_DOWNLOADQUALITY_LABEL":"Qualité","SETTINGS_DOWNLOADFORMAT_LABEL":"Format","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Afficher la 3D dans le menu de téléchargement","SETTINGS_FILENAME_LABEL":"Nom du fichier","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Supprimer les caractères non-alphanumériques","SETTINGS_ENABLEREPEAT_LABEL":"Afficher le bouton \"Répéter\"","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Activer la répétition par défaut","SETTINGS_PLAYERSIZE_LIST_SMALL":"Petit","SETTINGS_PLAYERSIZE_LIST_LARGE":"Grand","SETTINGS_PLAYERSIZE_LIST_FILL":"Remplir","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Non","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Barre de progrès et contrôles","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Barre de progrès uniquement","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Contrôles uniquement","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune \nMortensen (YePpHa). Tous droits réservés.<br /><br />Si vous faites face à un problème, si vous avez une réclamation à faire ou si vous souhaitez poser une question, vous pouvez contacter le créateur de ce script à l'adresse E-Mail suivante :<br /><a \nhref=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a> (Anglais uniquement).","BUTTON_DOWNLOAD_TEXT":"Télécharger","BUTTON_DOWNLOAD_TOOLTIP":"Télécharger en {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Indisponible au téléchargement pour {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Menu de téléchargement","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"Services MP3","BUTTON_REPEAT_TEXT":"Répéter","BUTTON_REPEAT_TOOLTIP":"Activer la répétition","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Expérimental</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Mode Flash","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clone (Recommandé)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Reconfigurer","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Réinitialiser ","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Non","SETTINGS_EXPERIMENTAL_HTML5MODE":"Mode HTML5","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Non (Recommandé)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Remplacer","SETTINGS_EXPERIMENTAL_NOTE":"Aidez le créateur à trouver le meilleur mode pour le player flash et html5 en remplissant le questionnaire suivant : <a \nhref=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube\n Center Experimental Modes</a> ","SETTINGS_MP3SERVICES_LABEL":"Services MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Activer les annotations","SETTINGS_SCROLLTOPLAYER_LABEL":"Défiler jusqu’à la vidéo","UNKNOWN":"Inconnu","SETTINGS_VOLUME_LABEL":"Volume","SETTINGS_MUTE_LABEL":"Sourdine","UPDATE_HTML":"Une nouvelle version de YouTube Center est disponible. <br />Installer <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> ou aller sur <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Défiler jusqu’à la vidéo","LIGHTBULB_TOOLTIP":"Mode Cinéma","SETTINGS_LIGHTBULB_ENABLE":"Permettre le mode cinéma","SETTINGS_LIGHTBULB_COLOR":"Couleur du mode cinéma","SETTINGS_LIGHTBULB_TRANSPARENCY":"Transparence du mode cinéma","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Fenêtre","SETTINGS_WMODE_DIRECT":"Direct","SETTINGS_WMODE_OPAQUE":"Opaque","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Thème du player","SETTINGS_PLAYERTHEME_DARK":"Sombre","SETTINGS_PLAYERTHEME_LIGHT":"Clair","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Contenu","SETTINGS_TAB_UPDATE":"Mise à jour","SETTINGS_UPDATE_ENABLE":"Activer la vérification de mises à jour","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Rechercher des mises à jour","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Recherche de mises à jour...","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Impossible de joindre le serveur. Veuillez réessayer.","SETTINGS_UPDATE_INTERVAL":"Vérifier les mises à jour :","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Toujours","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Toutes les heures","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Toutes les 2 heures","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Toutes les 12 heures","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Tous les jours","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Tous les 2 jours","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Toutes les semaines","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Toutes les 2 semaines","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Tous les mois","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Activer le contrôle du volume","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Recherche de mises à jour effectuée","SETTINGS_RESETSETTINGS_LABEL":"Rétablir les paramètres par défaut","SETTINGS_RESETSETTINGS_TEXT":"Voulez-vous réinitialiser les paramètres et rafraichir la page?","SETTINGS_PLAYERCOLOR_LABEL":"Couleur du Player","SETTINGS_PLAYERCOLOR_RED":"Rouge","SETTINGS_PLAYERCOLOR_WHITE":"Blanc","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Système de placement</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Déplacer les éléments","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Traducteurs:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Affichage","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Cette fonctionnalité est uniquement disponible sur une page de lecture.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Actualiser le HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"ru":{"LANGUAGE_AUTO":"Автоопределение","LANGUAGE":"Русский","HIGHRES":"Оригинальное","HD1080":"Самое высокое","HD720":"Высокое","LARGE":"Среднее","MEDIUM":"Стандартное","SMALL":"Низкое","SETTINGS_HIGHRES":"Оригинальное","SETTINGS_HD1080":"Самое высокое (1080p)","SETTINGS_HD720":"Высокое (720p)","SETTINGS_LARGE":"Среднее (480p)","SETTINGS_MEDIUM":"Стандартное (360p)","SETTINGS_SMALL":"Низкое (240p)","BUTTON_SETTINGS_CONTENT":"Настройки","BUTTON_SETTINGS_TITLE":"Панель управления YouTube Center","SETTINGS_TAB_GENERAL":"Основные","SETTINGS_TAB_PLAYER":"Плеер","SETTINGS_TAB_VIDEO":"Видео","SETTINGS_TAB_DOWNLOAD":"Скачивание","SETTINGS_TAB_REPEAT":"Повтор","SETTINGS_TAB_DEBUG":"Отладка","SETTINGS_TAB_ABOUT":"О скрипте","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Удалять рекламу","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Разворачивать описание","SETTINGS_ENABLESHORTCUTS_LABEL":"Показывать ярлыки","SETTINGS_LANGUAGE":"Язык","SETTINGS_PLAYERSIZE_LABEL":"Размер плеера","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Скрывать панель","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Не работает на HTML5 плеере","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Включить авторазрешение","SETTINGS_AUTORESOLUTION_LABEL":"Автоматическое разрешение","SETTINGS_PREVENTAUTOPLAY_LABEL":"Отключить автовоплей видео","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Отключить буферизацию","SETTINGS_ENABLEDOWNLOAD_LABEL":"Включить скачивание видео","SETTINGS_DOWNLOADQUALITY_LABEL":"Качество","SETTINGS_DOWNLOADFORMAT_LABEL":"Формат","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Предлагать скачивать в 3D","SETTINGS_FILENAME_LABEL":"Имя файла","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Удалять лишние символы","SETTINGS_ENABLEREPEAT_LABEL":"Включить кнопку \"Повтор\"","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Включить автоповтор видео","SETTINGS_PLAYERSIZE_LIST_SMALL":"Маленький","SETTINGS_PLAYERSIZE_LIST_LARGE":"Большой","SETTINGS_PLAYERSIZE_LIST_FILL":"Полный экран","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Нет","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Progressbar и Controlbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Только Progressbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Только Controlbar","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). All Rights Reserved.<br /><br />Если у вас возникли проблемы, вопросы, предложения и благодарности, вы всегда можете связаться с автором скрипта.<br />Контакты автора скрипта: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Скачать","BUTTON_DOWNLOAD_TOOLTIP":"Скачать {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Нет достпных для загрузки {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Варианты скачивания","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"Скачать в MP3 через сервис","BUTTON_REPEAT_TEXT":"Повтор","BUTTON_REPEAT_TOOLTIP":"Включить повтор","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Эксперементально</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash режим","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Клонирование (Рекомендуется)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"None","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML5 режим","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Нет (Рекомендуется)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Replace","SETTINGS_EXPERIMENTAL_NOTE":"Помогите мне найти лучший режим для flash и html5 плеера. Связаться можно в этой теме <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube Center Experimental Modes</a>. Спасибо.","SETTINGS_MP3SERVICES_LABEL":"Сервисы скачивания в MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Включить анотации","SETTINGS_SCROLLTOPLAYER_LABEL":"Прокручивать до плеера","UNKNOWN":"Неизвестный","SETTINGS_VOLUME_LABEL":"Громкость","SETTINGS_MUTE_LABEL":"Без звука","UPDATE_HTML":"Доступна новая версия YouTube Center.<br />Установить <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> или перейти на <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Прокручивать до плеера","LIGHTBULB_TOOLTIP":"Вкл/Выкл Подсветку","SETTINGS_LIGHTBULB_ENABLE":"Вкл/Выкл Подсветку","SETTINGS_LIGHTBULB_COLOR":"Цвет подсветки","SETTINGS_LIGHTBULB_TRANSPARENCY":"Непрозрачность подсветки","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Window","SETTINGS_WMODE_DIRECT":"Direct","SETTINGS_WMODE_OPAQUE":"Opaque","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Обложка плеера","SETTINGS_PLAYERTHEME_DARK":"Тёмная","SETTINGS_PLAYERTHEME_LIGHT":"Светлая","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Content","SETTINGS_TAB_UPDATE":"Обновление","SETTINGS_UPDATE_ENABLE":"Включить обновление","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Проверить обновления","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Проверка обновлений","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Сервер не отвечает. Попробуйте позже!","SETTINGS_UPDATE_INTERVAL":"Интервал проверки","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Постоянно","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Каждый час","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Каждые 2 часа","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Каждые 12 часов","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Каждый день","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Каждые 2 дня","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Каждую неделю","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Каждые 2 недели","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Каждый месяц","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Включить управление громкостью","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Обновления проверены","SETTINGS_RESETSETTINGS_LABEL":"Сбросить все настройки","SETTINGS_RESETSETTINGS_TEXT":"Сбросить все настройки по умолчанию и обновить страницу?","SETTINGS_PLAYERCOLOR_LABEL":"Цвет буфера загрузки","SETTINGS_PLAYERCOLOR_RED":"Красный","SETTINGS_PLAYERCOLOR_WHITE":"Белый","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Настройка элементов управления</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Переместить элементы","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Авторы переводов:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Функция доступна только на странице видео YouTube. Зайдите на страницу с видео YouTube для использования этой функции.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Обновить HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"de":{"LANGUAGE_AUTO":"Automatische Erkennung","LANGUAGE":"Deutsch","HIGHRES":"Originale Auflösung","HD1080":"Full HD 1080p","HD720":"HD 720p","LARGE":"Groß","MEDIUM":"Mittel","SMALL":"Klein","SETTINGS_HIGHRES":"Originale Auflösung","SETTINGS_HD1080":"Full HD (1080p)","SETTINGS_HD720":"HD (720p)","SETTINGS_LARGE":"Verbesserte Auflösung (480p)","SETTINGS_MEDIUM":"Standard Auflösung (320p)","SETTINGS_SMALL":"Niedrige Auflösung (240p)","BUTTON_SETTINGS_CONTENT":"Einstellungen","BUTTON_SETTINGS_TITLE":"Öffne das YouTube Center Einstellungsfenster","SETTINGS_TAB_GENERAL":"Allgemein","SETTINGS_TAB_PLAYER":"Player","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Download","SETTINGS_TAB_REPEAT":"Wiederholen","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"Über","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Werbung entfernen","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Automatisch Videobeschreibung anzeigen","SETTINGS_ENABLESHORTCUTS_LABEL":"Tastenkürzel aktivieren","SETTINGS_LANGUAGE":"Sprache","SETTINGS_PLAYERSIZE_LABEL":"Player Größe","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Automatisch Wiedergabebalken ausblenden","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Funktioniert nicht mit einem HTML5 Player.","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"\"Automatische Auflösung\" aktivieren","SETTINGS_AUTORESOLUTION_LABEL":"Automatische Auflösung","SETTINGS_PREVENTAUTOPLAY_LABEL":"Verhindere automatische Wiedergabe","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Verhindere automatisches buffern","SETTINGS_ENABLEDOWNLOAD_LABEL":"Download aktivieren","SETTINGS_DOWNLOADQUALITY_LABEL":"Qualität","SETTINGS_DOWNLOADFORMAT_LABEL":"Format","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Zeige 3D im Downloadmenü","SETTINGS_FILENAME_LABEL":"Dateiname","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Entferne alle nicht-alphanumerischen Zeichen","SETTINGS_ENABLEREPEAT_LABEL":"Wiederholen aktivieren","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Automatische Wiederholung aktivieren","SETTINGS_PLAYERSIZE_LIST_SMALL":"Klein","SETTINGS_PLAYERSIZE_LIST_LARGE":"Groß","SETTINGS_PLAYERSIZE_LIST_FILL":"Gefüllt","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Nichts","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Beides Fortschritts- & Steuerungsbalken","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Nur Fortschrittsbalken","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Nur Steuerungsbalken","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Alle Rechte vorbehalten.<br /><br />Falls Sie irgendwelche Probleme, Beschwerden, Fragen, Lob oder Kritik haben, fühlen Sie sich frei mir eine eMail zu schreiben.<br />Schreiben Sie mir: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Kein Download verfügbar für {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Downloadmenü","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3 Service","BUTTON_REPEAT_TEXT":"Wiederholung","BUTTON_REPEAT_TOOLTIP":"Wiederholung einschalten","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Experimentell</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash Modus","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clone (Empfohlen)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Keiner","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML 5 Modus","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Keiner (Empfohlen)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Ersetzen","SETTINGS_EXPERIMENTAL_NOTE":"Hilf mir den besten Modus für Flash- und HTML5-Player zu finden. Bitte füll das Formular <a \nhref=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube\n Center Experimentelle Modi</a> aus. Danke.","SETTINGS_MP3SERVICES_LABEL":"MP3 Service","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouToube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Anmerkungen aktivieren","SETTINGS_SCROLLTOPLAYER_LABEL":"Zum Player scrollen","UNKNOWN":"Unbekannt","SETTINGS_VOLUME_LABEL":"Lautstärke","SETTINGS_MUTE_LABEL":"Stumm","UPDATE_HTML":"Neue Version von YouTube Center verfügbar.<br />Installieren <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> oder gehe zu <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Zum Player scrollen","LIGHTBULB_TOOLTIP":"Licht Ein/Aus schalten","SETTINGS_LIGHTBULB_ENABLE":"\"Licht Ein-/Aus- schalten\" aktivieren","SETTINGS_LIGHTBULB_COLOR":"Lichtfarbe","SETTINGS_LIGHTBULB_TRANSPARENCY":"Licht Transparenz","SETTINGS_WMODE_LABEL":"Flash WModus","SETTINGS_WMODE_WINDOW":"Fenster","SETTINGS_WMODE_DIRECT":"Direkt","SETTINGS_WMODE_OPAQUE":"Undurchsichtig","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Player Aussehen","SETTINGS_PLAYERTHEME_DARK":"Dunkel","SETTINGS_PLAYERTHEME_LIGHT":"Hell","SETTINGS_PLAYERSIZE_LIST_15X":"1,5-fach","SETTINGS_PLAYERSIZE_LIST_2X":"2-fach","SETTINGS_PLAYERSIZE_LIST_25X":"2,5-fach","SETTINGS_PLAYERSIZE_LIST_3X":"3-fach","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Inhalt","SETTINGS_TAB_UPDATE":"Aktualisierung","SETTINGS_UPDATE_ENABLE":"Automatische Überprüfung auf Aktualisierungen aktievieren","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Auf Aktualiserungen überprüfen","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Überprüfung auf Aktualisierung läuft...","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Keine Verbindung zum Server möglich. versuchen Sie es erneut!","SETTINGS_UPDATE_INTERVAL":"Überprüfungsintervall für Aktualisierungen","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Immer","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Jede Stunde","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Alle 2 Stunden","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Alle 12 Stunden","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Jeden Tag","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Jeden 2. Tag","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Jede Woche","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Jede 2. Woche","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Jeden Monat","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Aktivierung der Lautstärkeregelung","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Überprüfung auf Aktualisierung erfolgreich!","SETTINGS_RESETSETTINGS_LABEL":"Reset Settings","SETTINGS_RESETSETTINGS_TEXT":"Do you want to reset the settings and refresh the page?","SETTINGS_PLAYERCOLOR_LABEL":"Player Color","SETTINGS_PLAYERCOLOR_RED":"Red","SETTINGS_PLAYERCOLOR_WHITE":"White","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Placement System</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Move Elements","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Translators:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Feature is currently only available on the YouTube video page. Go to any YouTube video to use this feature.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"nl":{"LANGUAGE_AUTO":"Automatisch detecteren","LANGUAGE":"Nederlands","HIGHRES":"Originele grootte","HD1080":"Full High Definition","HD720":"High Definition","LARGE":"Enhanced Definition","MEDIUM":"Standard Definition","SMALL":"Low Definition","SETTINGS_HIGHRES":"Original Definition","SETTINGS_HD1080":"Full HD (1080p)","SETTINGS_HD720":"High Definition (720p)","SETTINGS_LARGE":"Enhanced Definition (480p)","SETTINGS_MEDIUM":"Standard Definition (360p)","SETTINGS_SMALL":"Low Definition (240p)","BUTTON_SETTINGS_CONTENT":"Instellingen","BUTTON_SETTINGS_TITLE":"Toggle YouTube Center Settings Panel","SETTINGS_TAB_GENERAL":"Algemeen","SETTINGS_TAB_PLAYER":"Speler","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Download","SETTINGS_TAB_REPEAT":"Herhalen","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"Over","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Verwijder advertentie","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Omschrijving automatisch uitvouwen","SETTINGS_ENABLESHORTCUTS_LABEL":"Enable Shortcuts on Page","SETTINGS_LANGUAGE":"Taal","SETTINGS_PLAYERSIZE_LABEL":"Player Size","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Auto Hide Bar","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Werkt niet met de HTML5-speler","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Automatische resolutie inschakelen","SETTINGS_AUTORESOLUTION_LABEL":"Auto Resolution","SETTINGS_PREVENTAUTOPLAY_LABEL":"Prevent Auto-Play","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Prevent Auto-Buffering","SETTINGS_ENABLEDOWNLOAD_LABEL":"Download inschakelen","SETTINGS_DOWNLOADQUALITY_LABEL":"Kwaliteit","SETTINGS_DOWNLOADFORMAT_LABEL":"Formaat","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Toon 3D in downloadmenu","SETTINGS_FILENAME_LABEL":"Bestandsnaam","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Verwijder niet-alfanumerieke karakters","SETTINGS_ENABLEREPEAT_LABEL":"Herhalen inschakelen","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Herhalen automatisch inschakelen","SETTINGS_PLAYERSIZE_LIST_SMALL":"Klein","SETTINGS_PLAYERSIZE_LIST_LARGE":"Groot","SETTINGS_PLAYERSIZE_LIST_FILL":"Fill","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Geen","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Both Progressbar & Controlbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Only Progressbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Only Controlbar","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). All Rights Reserved.<br /><br />If you have any problems, complains, questions or compliments you're welcome to contact me on my email.<br />Contact me: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Geen download beschikbaar voor {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Downloadmenu","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3-diensten","BUTTON_REPEAT_TEXT":"Herhalen","BUTTON_REPEAT_TOOLTIP":"Toggle Repeat","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Experimental</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash Mode","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clone (Recommended)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"None","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML5 modus","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Geen (aanbevolen)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Vervangen","SETTINGS_EXPERIMENTAL_NOTE":"Help me find the best mode for the flash and html5 player. Please fill the <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube Center Experimental Modes</a> form. Thanks.","SETTINGS_MP3SERVICES_LABEL":"MP3 Services","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Enable Annotations","SETTINGS_SCROLLTOPLAYER_LABEL":"Scroll To Player","UNKNOWN":"Onbekend","SETTINGS_VOLUME_LABEL":"Volume","SETTINGS_MUTE_LABEL":"Dempen","UPDATE_HTML":"New YouTube Center version available.<br />Install <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> or go to <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Scroll To Player","LIGHTBULB_TOOLTIP":"Licht aan/uit","SETTINGS_LIGHTBULB_ENABLE":"Enable Turn Light On/Off","SETTINGS_LIGHTBULB_COLOR":"Light Color","SETTINGS_LIGHTBULB_TRANSPARENCY":"Light Transparency","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Window","SETTINGS_WMODE_DIRECT":"Direct","SETTINGS_WMODE_OPAQUE":"Opaque","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Player Theme","SETTINGS_PLAYERTHEME_DARK":"Dark","SETTINGS_PLAYERTHEME_LIGHT":"Light","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Content","SETTINGS_TAB_UPDATE":"Update","SETTINGS_UPDATE_ENABLE":"Enable Update Checker","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Check For New Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Checking For New Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Couldn't Contact Server. Try Again!","SETTINGS_UPDATE_INTERVAL":"Update Interval","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Always","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Every Hour","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Every 2 Hours","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Every 12 Hours","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Every Day","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Every Second Day","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Every Week","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Every Second Week","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Every Month","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Enable Volume Control","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Checked For Updates","SETTINGS_RESETSETTINGS_LABEL":"Reset Settings","SETTINGS_RESETSETTINGS_TEXT":"Do you want to reset the settings and refresh the page?","SETTINGS_PLAYERCOLOR_LABEL":"Player Color","SETTINGS_PLAYERCOLOR_RED":"Red","SETTINGS_PLAYERCOLOR_WHITE":"White","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Placement System</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Move Elements","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Translators:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Display","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Feature is currently only available on the YouTube video page. Go to any YouTube video to use this feature.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Refresh HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"tr":{"LANGUAGE_AUTO":"Otomatik Tarama","LANGUAGE":"Türkçe","HIGHRES":"Orjinal Görüntü","HD1080":"Full HD","HD720":"HD","LARGE":"HQ Geliştirilmiş Kalite","MEDIUM":"Normal Kalite","SMALL":"Düşük Kalite","SETTINGS_HIGHRES":"Orjinal Görüntü","SETTINGS_HD1080":"Full HD (1080p)","SETTINGS_HD720":"HD (720p)","SETTINGS_LARGE":"Geliştirilmiş Kalite (480p)","SETTINGS_MEDIUM":"Normal Kalite (360p)","SETTINGS_SMALL":"Düşük Kalite (240p)","BUTTON_SETTINGS_CONTENT":"Ayarlar","BUTTON_SETTINGS_TITLE":"YouTube Center Ayarlar Butonu","SETTINGS_TAB_GENERAL":"Genel","SETTINGS_TAB_PLAYER":"Oynatıcı","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"İndir","SETTINGS_TAB_REPEAT":"Tekrarla","SETTINGS_TAB_DEBUG":"Hata Ayıklama","SETTINGS_TAB_ABOUT":"Hakkında","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Reklamları Kaldır","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Açıklamaları Otomatik Genişlet","SETTINGS_ENABLESHORTCUTS_LABEL":"Sayfada Kısayol Tuşlarını Kullan","SETTINGS_LANGUAGE":"Lisan","SETTINGS_PLAYERSIZE_LABEL":"Oynatıcı Boyutu","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Otomatik Gizle","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"HTML5 Oynatıcı İle Çalışmaz","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Otomatik Çözünürlük Ayarını Kullan","SETTINGS_AUTORESOLUTION_LABEL":"Otomatik Çözünürlük","SETTINGS_PREVENTAUTOPLAY_LABEL":"Otomatik Oynatmadan Koru","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Otomatik Yüklenmeden Koru","SETTINGS_ENABLEDOWNLOAD_LABEL":"İndirmeyi Aktif Et","SETTINGS_DOWNLOADQUALITY_LABEL":"Kalite","SETTINGS_DOWNLOADFORMAT_LABEL":"Biçim","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"İndirme Menüsünde 3D'yi Göster","SETTINGS_FILENAME_LABEL":"Dosya Adı","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Alfanumerik Olmayan Karakterleti Sil","SETTINGS_ENABLEREPEAT_LABEL":"Tekrarlamayı Aç","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Otomatik Olarak Tekrarla","SETTINGS_PLAYERSIZE_LIST_SMALL":"Küçük","SETTINGS_PLAYERSIZE_LIST_LARGE":"Büyük","SETTINGS_PLAYERSIZE_LIST_FILL":"Doldur","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Yok","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"İlerleyici Satır & Kontrol Satırı","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Sadece İlerleyici Satır","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Sadece Kontrol Satırı","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Telif Hakkı © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Tüm Hakları Saklıdır.<br /><br />Herhangi bir şikayet, problem veya sorunuz olursa çekinmeden bana elektronik posta (email) ile bana ulaşabilirsiniz.<br />İletişim: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"İndir","BUTTON_DOWNLOAD_TOOLTIP":"İndir {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"{type} mevcut değil","BUTTON_DOWNlOAD2_TOOLTIP":"İndirme Menüsü","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3 Servisleri","BUTTON_REPEAT_TEXT":"Tekrar Çal","BUTTON_REPEAT_TOOLTIP":"Tekrarlama Butonu","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Deneysel</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash Mod","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Kopya (Önerilir)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Yok","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML5 Modu","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Yok (Önerilir)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Değiştir","SETTINGS_EXPERIMENTAL_NOTE":"Flash ve HTML5 Oynatıcı için en iyi modu bulmama yardım edin. Lütfen <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube Center Deneysel Modlar</a> formunu doldurunuz. Teşekkürler.","SETTINGS_MP3SERVICES_LABEL":"MP3 Servisleri","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Bildirimleri Göster","SETTINGS_SCROLLTOPLAYER_LABEL":"Oynatıcıyı İlerlet","UNKNOWN":"Bilinmeyen","SETTINGS_VOLUME_LABEL":"Ses","SETTINGS_MUTE_LABEL":"Sessiz","UPDATE_HTML":"Yeni YouTube Center versiyonu mevcut.<br />Yükle <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}</a> yada siteye gidin <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Oynatıcıyı İlerlet","LIGHTBULB_TOOLTIP":"Işığı Kapat/Aç","SETTINGS_LIGHTBULB_ENABLE":"Aydınlatma Seçeneğini Aç","SETTINGS_LIGHTBULB_COLOR":"Açık Renk","SETTINGS_LIGHTBULB_TRANSPARENCY":"Geçirgenlik","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Pencere","SETTINGS_WMODE_DIRECT":"Direk","SETTINGS_WMODE_OPAQUE":"Opak","SETTINGS_WMODE_TRANSPARENT":"Geçirgen","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Oynatıcı Teması","SETTINGS_PLAYERTHEME_DARK":"Siyah","SETTINGS_PLAYERTHEME_LIGHT":"Beyaz","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"İçerik","SETTINGS_TAB_UPDATE":"Güncelle","SETTINGS_UPDATE_ENABLE":"Güncelleme Kontrolünü Aç","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Yeni Güncellemeler İçin Kontrol Et","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Güncellemeler İçin Kontrol Ediliyor","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Sunucuya bağlanılamıyor. Tekrar Deneyin!","SETTINGS_UPDATE_INTERVAL":"Güncelleme Aralığı","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Sürekli","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Her Saat","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"2 Saat","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"12 Saat","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Her Gün","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"2 Gün","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Her Hafta","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"2 Hafta","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Her Ay","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Ses Kontrolünü Aç","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Güncellemeler Kontrol Edildi","SETTINGS_RESETSETTINGS_LABEL":"Ayarları Sıfırla","SETTINGS_RESETSETTINGS_TEXT":"Ayarları sıfırlamak ve sayfayı yenilemek istiyor musunuz?","SETTINGS_PLAYERCOLOR_LABEL":"Oynatıcı Rengi","SETTINGS_PLAYERCOLOR_RED":"Kırmızı","SETTINGS_PLAYERCOLOR_WHITE":"Beyaz","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Yerleştirme Sistemi</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Parçaları Oynat","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Çevirmenler:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Görüntüle","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Bu özellik sadece YouTube video sayfalarında kullanılabilir durumda. Herhangi bir YouTube video sayfasına gidin.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"HTML Yenile","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"hu":{"LANGUAGE_AUTO":"Automatikus felismerés","LANGUAGE":"Magyar","HIGHRES":"Eredeti Felbontás","HD1080":"Full HD Felbontás","HD720":"HD Felbontás","LARGE":"Nagy Felbontás","MEDIUM":"Normál Felbontás","SMALL":"Alacsony Felbontás","SETTINGS_HIGHRES":"Eredeti Felbontás","SETTINGS_HD1080":"Full HD Felbontás (1080p)","SETTINGS_HD720":"HD Felbontás (720p)","SETTINGS_LARGE":"Nagy Felbontás (480p)","SETTINGS_MEDIUM":"Normál Felbontás (360p)","SETTINGS_SMALL":"Alacsony Felbontás (240p)","BUTTON_SETTINGS_CONTENT":"Beállítások","BUTTON_SETTINGS_TITLE":"YouTube Center Beállításainak Megjelenítése","SETTINGS_TAB_GENERAL":"Általános","SETTINGS_TAB_PLAYER":"Lejátszó","SETTINGS_TAB_VIDEO":"Videó","SETTINGS_TAB_DOWNLOAD":"Letöltés","SETTINGS_TAB_REPEAT":"Ismétlés","SETTINGS_TAB_DEBUG":"Hibakeresés","SETTINGS_TAB_ABOUT":"Impresszum","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Hirdetések Eltávolítása","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Leírás Automatikus Megjelenítése","SETTINGS_ENABLESHORTCUTS_LABEL":"Billentyűparancsok Engedélyezése","SETTINGS_LANGUAGE":"Nyelv","SETTINGS_PLAYERSIZE_LABEL":"Lejátszó mérete","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Videó Vezérlő Elrejtése","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"A HTML5 lejátszóval nem működik.","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Automatikus Felbontás Engedélyezése","SETTINGS_AUTORESOLUTION_LABEL":"Automatikus Felbontás","SETTINGS_PREVENTAUTOPLAY_LABEL":"Automatikus Lejátszás Engedélyezése","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Pufferelés Engedélyezése","SETTINGS_ENABLEDOWNLOAD_LABEL":"Letöltés Engedélyezése","SETTINGS_DOWNLOADQUALITY_LABEL":"Minőség","SETTINGS_DOWNLOADFORMAT_LABEL":"Formátum","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"3D Megjelenítése a Letöltések Menüben","SETTINGS_FILENAME_LABEL":"Fájlnév","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Nem Alfanumerikus Karakterek Eltávolítása","SETTINGS_ENABLEREPEAT_LABEL":"Ismétlés Engedélyezése","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Ismétlés Automatikus Bekapcsolása","SETTINGS_PLAYERSIZE_LIST_SMALL":"Kicsi","SETTINGS_PLAYERSIZE_LIST_LARGE":"Nagy","SETTINGS_PLAYERSIZE_LIST_FILL":"Kitöltés","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Semelyik","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"A Folyamatjelzőt és a Vezérlőpanelt","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Csak a Folyamatjelzőt","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Csak a Vezérlőpanelt","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Minden Jog Fenntartva.<br /><br />Ha bármi problémád, panaszod, kérdésed vagy dícséreted van a számomra, örömmel várom leveledet az alábbi e-mail címre.<br />Kapcsolat: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Letöltés","BUTTON_DOWNLOAD_TOOLTIP":"Letöltés: {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Nincs elérhető letöltés a {type} típus számára.","BUTTON_DOWNlOAD2_TOOLTIP":"Letöltések Menü","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3 Szolgáltatások","BUTTON_REPEAT_TEXT":"Ismétlés","BUTTON_REPEAT_TOOLTIP":"Ismétlés ki-be kapcsolása","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Kísérleti</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Flash Mód","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Klón (Ajánlott)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapp","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reinit","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Semelyik","SETTINGS_EXPERIMENTAL_HTML5MODE":"HTML5 Mód","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Semelyik (Ajánlott)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Csere","SETTINGS_EXPERIMENTAL_NOTE":"Segíts megtalálni a legjobb módokat a Flash és HTML5 lejátszókhoz. Kérlek töltsd ki a <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\">YouTube Center Experimental Modes</a> űrlapot. Köszönöm.","SETTINGS_MP3SERVICES_LABEL":"MP3 Szolgáltatások","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Címkék Engedélyezése","SETTINGS_SCROLLTOPLAYER_LABEL":"Lejátszóhoz Görgetés","UNKNOWN":"Ismeretlen","SETTINGS_VOLUME_LABEL":"Hangerő","SETTINGS_MUTE_LABEL":"Némítás","UPDATE_HTML":"Új YouTube Center verzió érhető el.<br />Telepítsd a <a href=\"{scripturl}\" target=\"_blank\">YouTube Center {version}</a> verzióját vagy látogass el ide: <a href=\"{siteurl}\" target=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Lejátszóhoz Görgetés","LIGHTBULB_TOOLTIP":"Fények ki-be kapcsolása","SETTINGS_LIGHTBULB_ENABLE":"Fények Ki-be kapcsolásának Engedélyezése","SETTINGS_LIGHTBULB_COLOR":"Árnyék színe","SETTINGS_LIGHTBULB_TRANSPARENCY":"Áttetszőség","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Window","SETTINGS_WMODE_DIRECT":"Direct","SETTINGS_WMODE_OPAQUE":"Opaque","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Lejátszó Kinézete","SETTINGS_PLAYERTHEME_DARK":"Sötét","SETTINGS_PLAYERTHEME_LIGHT":"Világos","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Oldal","SETTINGS_TAB_UPDATE":"Frissítés","SETTINGS_UPDATE_ENABLE":"Automatikus Frissítés Engedélyezése","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Frissítések Ellenőrzése","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Frissítések Ellenőrzése","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Nem sikerült a szerverhez csatlakozni. Próbáld meg később!","SETTINGS_UPDATE_INTERVAL":"Frissítési Gyakoriság","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Mindig","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Minden Órában","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Minden 2 Órában","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Minden 12 Órában","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Minden Nap","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Minden Második Nap","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Minden Héten","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Minden Második Héten","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Minden Hónapban","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Hangerőszabályzás Engedélyezése","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Új Verzió Ellenőrzése Befejeződött","SETTINGS_RESETSETTINGS_LABEL":"Beállítások Törlése","SETTINGS_RESETSETTINGS_TEXT":"Biztos, hogy törölni szeretnéd a beállításaidat és újratölteni az oldalt?","SETTINGS_PLAYERCOLOR_LABEL":"Lejátszó Színe","SETTINGS_PLAYERCOLOR_RED":"Piros","SETTINGS_PLAYERCOLOR_WHITE":"Fehér","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Elhelyezési Rendszer</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Elemek Mozgatása","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Fordítók:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Megjelenítés","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Ez a funkció jelenleg csak YouTube videók oldalain érhető el. Nyiss meg egy YouTube videót, hogy használhasd ezt a funkciót!","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"HTML Frissítése","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"},"pt-BR":{"LANGUAGE_AUTO":"Detecção Automática","LANGUAGE":"Portuguese (Brazil)","HIGHRES":"Difinição Original","HD1080":"Full HD","HD720":"HD","LARGE":"HQ","MEDIUM":"SQ","SMALL":"LQ","SETTINGS_HIGHRES":"Definição Original","SETTINGS_HD1080":"Full HD (1080p)","SETTINGS_HD720":"HD (720p)","SETTINGS_LARGE":"HQ (480p)","SETTINGS_MEDIUM":"SQ (360p)","SETTINGS_SMALL":"LQ (240p)","BUTTON_SETTINGS_CONTENT":"Opções","BUTTON_SETTINGS_TITLE":"Mostrar Painel de Controle do YouTube Center","SETTINGS_TAB_GENERAL":"Geral","SETTINGS_TAB_PLAYER":"Player","SETTINGS_TAB_VIDEO":"Video","SETTINGS_TAB_DOWNLOAD":"Baixar","SETTINGS_TAB_REPEAT":"Repetir","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_ABOUT":"Sobre","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Remover Publicidade","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Auto Expandir Descrições","SETTINGS_ENABLESHORTCUTS_LABEL":"Habilitar Atalhos nas Páginas","SETTINGS_LANGUAGE":"Idioma","SETTINGS_PLAYERSIZE_LABEL":"Tamanho do Player","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Auto Esconder Barras","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Não Funciona com em Player HTML5","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Permirtir Escolha Automática da Resolução","SETTINGS_AUTORESOLUTION_LABEL":"Resolução Automática","SETTINGS_PREVENTAUTOPLAY_LABEL":"Impedir a Reprodução Automática","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Impedir o Carregamento do Video","SETTINGS_ENABLEDOWNLOAD_LABEL":"Habilitar Menu para Download do Video","SETTINGS_DOWNLOADQUALITY_LABEL":"Qualidade","SETTINGS_DOWNLOADFORMAT_LABEL":"Formato","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Mostrar Menu de Download em 3D","SETTINGS_FILENAME_LABEL":"Nome do Arquivo","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Remover Caracteres Alfanuméricos","SETTINGS_ENABLEREPEAT_LABEL":"Habilitar Repetição","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Repetir Automaticamente","SETTINGS_PLAYERSIZE_LIST_SMALL":"Pequeno","SETTINGS_PLAYERSIZE_LIST_LARGE":"Grande","SETTINGS_PLAYERSIZE_LIST_FILL":"Tela Cheia","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"Nada","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Os dois Barra de Progresso e Barra de Controle","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Somente Barra de Progresso","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Somente Controles","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}</h2>Copyright © 2011 - 2012 Jeppe Rune Mortensen (YePpHa). Todos os Direitos Reservados.<br /><br /> Se você tiver qualquer problema, reclamações, dúvidas ou elogios está convidado a contatar-me pelo email.<br />Me Contate: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com</a>.","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"Download não disponível para {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Menu de Download","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"Serviços de MP3","BUTTON_REPEAT_TEXT":"Repetir","BUTTON_REPEAT_TOOLTIP":"Mostrar Repetir","SETTINGS_EXPERIMENTAL_TITLE":"<h3>Experimental</h3>","SETTINGS_EXPERIMENTAL_FLASHMODE":"Modo Flash","SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE":"Clone (Recomendado)","SETTINGS_EXPERIMENTAL_FLASHMODE_SRC":"Src","SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP":"Remapeado","SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT":"Reiniciado","SETTINGS_EXPERIMENTAL_FLASHMODE_NONE":"Nenhum","SETTINGS_EXPERIMENTAL_HTML5MODE":"Modo HTLM5","SETTINGS_EXPERIMENTAL_HTML5MODE_NONE":"Nenhum (Recomendado)","SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE":"Substituir","SETTINGS_EXPERIMENTAL_NOTE":"Me ajude a encontrar o melhor modo de reprodução em HTML5. Por favor preencha o <a href=\"https://docs.google.com/spreadsheet/viewform?formkey=dG93cEJXRDVWUFNuZUFTVy01Tk5fM1E6MQ\"> Modos Experimentais YouTube Center </a> formulário. Obrigado.","SETTINGS_MP3SERVICES_LABEL":"Serviços de MP3","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_ENABLEANNOTATIONS_LABEL":"Permitir Anotações","SETTINGS_SCROLLTOPLAYER_LABEL":"Vá para o Player","UNKNOWN":"Não Sei","SETTINGS_VOLUME_LABEL":"Volume","SETTINGS_MUTE_LABEL":"Mudo","UPDATE_HTML":"Nova Versão do YouTube Center Disponível. <br />Instalar<a href=\"{scripturl}\" target=\"_blank\">YouTube \nCenter v{version}</a> ou ir para <a href=\"{siteurl}\" \ntarget=\"_blank\">{site}</a>","SCROLL_TOOLTIP":"Vá para o Player","LIGHTBULB_TOOLTIP":"Ativar o interruptor de luzes","SETTINGS_LIGHTBULB_ENABLE":"Enable Turn Light On/Off","SETTINGS_LIGHTBULB_COLOR":"Cor da Luz","SETTINGS_LIGHTBULB_TRANSPARENCY":"Luz Transparente","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_WINDOW":"Janela","SETTINGS_WMODE_DIRECT":"Direto","SETTINGS_WMODE_OPAQUE":"Opaco","SETTINGS_WMODE_TRANSPARENT":"Transparente","SETTINGS_WMODE_GPU":"GPU","SETTINGS_PLAYERTHEME_LABEL":"Tema do Player","SETTINGS_PLAYERTHEME_DARK":"Escuro","SETTINGS_PLAYERTHEME_LIGHT":"Claro","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Conteúdo","SETTINGS_TAB_UPDATE":"Atualizar","SETTINGS_UPDATE_ENABLE":"Verificar Atualizações ","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Check For New Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Verificando Novas Atualizações","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Não foi possível contatar o servidor. Tente de novo.","SETTINGS_UPDATE_INTERVAL":"Intervalo de Atualização","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Sempre","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Cada Hora","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Cada 2 Horas","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Cada 12 Horas","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Todos os Dias","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"A cada dois dias","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Semanalmente","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Quinzenalmente","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Todo Mês","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_VOLUME_ENABLE":"Habilitar Controle de Volume","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Atualizações encontradas","SETTINGS_RESETSETTINGS_LABEL":"Restaurar Configurações","SETTINGS_RESETSETTINGS_TEXT":"Gostaria de Restaurar as configurações e recarregar a pagina?","SETTINGS_PLAYERCOLOR_LABEL":"Cor do Player","SETTINGS_PLAYERCOLOR_RED":"Vermelho","SETTINGS_PLAYERCOLOR_WHITE":"Branco","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Sistema de Posicionamento</b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Mover Elementos","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Tradutores:</b><br />{translators}","SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY":"Exibir","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Opção diponível somente na pagina do YouTube. Vá a qualquer página do YouTube para usar essa opção.","SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB":"NRAB","SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML":"Recarregar HTML","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com"}};
  console.log("YTCenter: Applied language database");
  ytcenter.updateLanguage = function(){
    console.log("YTCenter: Updating Language...");
    if (ytcenter.settings.language == 'auto' && yt && yt.config_ && yt.config_.FEEDBACK_LOCALE_LANGUAGE) {
      if (!ytcenter.language.hasOwnProperty(yt.config_.FEEDBACK_LOCALE_LANGUAGE.toLowerCase())) {
        ytcenter.locale = ytcenter.language['en'];
      } else {
        ytcenter.locale = ytcenter.language[yt.config_.FEEDBACK_LOCALE_LANGUAGE.toLowerCase()];
      }
    } else if (ytcenter.settings.language == 'auto') {
      ytcenter.locale = ytcenter.language['en'];
    } else {
      if (ytcenter.language.hasOwnProperty(ytcenter.settings.language)) {
        ytcenter.locale = ytcenter.language[ytcenter.settings.language];
      } else {
        ytcenter.locale = ytcenter.language['en'];
      }
    }
    console.log("YTCenter: Language set to " + ytcenter.locale.LANGUAGE);
  };
  console.log("YTCenter: ytcenter.updateLanguage initialized");
  ytcenter.doRepeat = false;
  ytcenter.html5 = false;
  ytcenter.watch7 = false;
  ytcenter.redirect = function(url, newWindow){
    console.log("YTCenter: Redirecting" + (newWindow ? " in new window" : "") + " to " + url);
    if (typeof newWindow != "undefined") {
      window.open($TextReplacer(url, {
        title: ytcenter.video.title,
        videoid: ytcenter.video.id,
        author: ytcenter.video.author,
        url: loc.href
      }));
    } else {
      loc.href = $TextReplacer(url, {
        title: ytcenter.video.title,
        videoid: ytcenter.video.id,
        author: ytcenter.video.author,
        url: loc.href
      });
    }
  };
  console.log("YTCenter: redirect initialized");
  ytcenter.discardElement = (function(){
    var g = document.createElement('div');
    g.style.display = 'none';
    document.addEventListener("DOMContentLoaded", (function(g){
      return function(){
        var dba = function(){
          if (document.body) {
            document.body.appendChild(g);
          } else {
            uw.setTimeout(dba, 50);
          }
        }
        dba();
      };
    })(g), true);
    return (function(g){
      return function(element){
        console.log("YTCenter: Discarding element");
        if (!element) return;
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        g.appendChild(element);
        g.innerHTML = "";
      };
    })(g);
  })();
  console.log("YTCenter: discardElement initialized");
  ytcenter.storageName = "ytcenter_v1.3_settings";
  ytcenter.loadSettings = function(){
    console.log("YTCenter: Loading settings");
    try {
      var loaded = JSON.parse($LoadData(ytcenter.storageName, "{}"));
      for (var key in loaded) {
        if (loaded.hasOwnProperty(key)) {
          ytcenter.settings[key] = loaded[key];
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log("YTCenter: Save Settings initializing");
  ytcenter.saveSettings = function(){
    console.log("YTCenter: Saving settings");
    $SaveData(ytcenter.storageName, JSON.stringify(ytcenter.settings));
  };
  console.log("YTCenter: Check for updates initializing");
  ytcenter.checkForUpdates = (function(){
    var updElement;
    return function(success, error){
      console.log("YTCenter: Checking for updates...");
      if (typeof error == "undefined") {
        error = function(){};
      }
      $XMLHTTPRequest({
        method: "GET",
        url: "http://userscripts.org/scripts/source/114002.meta.js",
        headers: {
          "Content-Type": "text/plain"
        },
        onload: (function(success){
          return function(response){
            console.log("YTCenter: Got Update Response");
            var rev = parseInt(/^\/\/ @updateVersion\s+([0-9]+)$/m.exec(response.responseText)[1], 10);
            var ver = /^\/\/ @version\s+([a-zA-Z0-9.,-_]+)$/m.exec(response.responseText)[1];
            if (rev > ytcenter.revision) {
              console.log("YTCenter: New update available");
              if (typeof updElement != "undefined") {
                ytcenter.discardElement(updElement);
              }
              updElement = document.createElement("div");
              updElement.className = "yt-alert yt-alert-default yt-alert-warn";
              updElement.style.margin = "0 auto 10px";
              updElement.style.width = "970px";
              var ic = document.createElement("div");
              ic.className = "yt-alert-icon";
              var icon = document.createElement("img");
              icon.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
              icon.className = "icon master-sprite";
              icon.alt = "Alert icon";
              ic.appendChild(icon);
              updElement.appendChild(ic);
              var c = document.createElement("div");
              c.className = "yt-alert-buttons";
              var cbtn = document.createElement("button");
              cbtn.type = "button";
              cbtn.setAttribute("role", "button");
              cbtn.setAttribute("onclick", ";return false;");
              cbtn.className = "close yt-uix-close yt-uix-button yt-uix-button-close";
              cbtn.addEventListener("click", (function(updElement){
                return function(){
                  $AddCSS(updElement, 'hid');
                };
              })(updElement));
              
              var cbtnt = document.createElement("span");
              cbtnt.className = "yt-uix-button-content";
              cbtnt.textContent = "Close ";
              cbtn.appendChild(cbtnt);
              c.appendChild(cbtn);
              updElement.appendChild(c);
              
              var cn = document.createElement("div");
              cn.className = "yt-alert-content";
              
              var cnt = document.createElement("span");
              cnt.className = "yt-alert-vertical-trick";
              
              var cnme = document.createElement("div");
              cnme.className = "yt-alert-message";
              cnme.innerHTML = $TextReplacer(ytcenter.locale['UPDATE_HTML'], {
                scripturl: 'http://userscripts.org/scripts/source/114002.user.js',
                version: ver,
                siteurl: 'http://userscripts.org/scripts/show/114002',
                site: 'userscripts.org'
              });
              
              ytcenter.database.codeRegister(cnme, function(){
                this.innerHTML = $TextReplacer(ytcenter.locale['UPDATE_HTML'], {
                  scripturl: 'http://userscripts.org/scripts/source/114002.user.js',
                  version: ver,
                  siteurl: 'http://userscripts.org/scripts/show/114002',
                  site: 'userscripts.org'
                });
              });
              
              cn.appendChild(cnt);
              cn.appendChild(cnme);
              updElement.appendChild(cn);
              document.getElementById("masthead-container").appendChild(updElement);
              ytcenter.refreshHomepage();
            } else {
              console.log("YTCenter: No new updates available");
            }
            if (success) {
              console.log("YTCenter: Calling update callback");
              success(response);
            }
          };
        })(success),
        onerror: error
      });
    };
  })();
  console.log("YTCenter: default settings initializing");
  ytcenter._settings = {
    language: 'auto',
    filename: '{title}',
    fixfilename: false,
    enableAutoVideoQuality: true, // Done
    autoVideoQuality: 'medium', // Done
    removeAdvertisements: true, // Done
    preventAutoPlay: false, // Done
    preventAutoBuffer: false, // Done
    preventTabAutoPlay: false,
    preventTabAutoBuffer: false,
    scrollToPlayer: true, // Done
    expandDescription: false, // Done
    enableAnnotations: false, // Done
    //enableCaptions: true, // %
    enableShortcuts: true,
    playersize: 'small',
    autohide: '2',
    volume: 100,
    mute: false,
    enableDownload: true,
    downloadQuality: 'highres',
    downloadFormat: 'mp4',
    show3DInDownloadMenu: false,
    enableRepeat: true,
    autoActivateRepeat: false,
    mp3Services: '',
    experimentalFlashMode: 'clone',
    experimentalHTML5Mode: 'none',
    lightbulbEnable: true,
    lightbulbBackgroundColor: '#000000',
    lightbulbBackgroundOpaque: 95,
    flashWMode: 'opaque', // window, direct, opaque, transparent, gpu
    playerTheme: 'dark', // dark, light
    playerColor: 'red', // red, white
    enableUpdateChecker: true,
    updateCheckerInterval: "0",
    updateCheckerLastUpdate: 0,
    enableVolume: true,
    buttonPlacement: {
      'watch-headline-title': ['watch-headline-title&@&//*[@id="eow-title"]'],
      'watch-headline-user-info': ['watch-headline-user-info&@&//*[@id="watch-userbanner"]', 'watch-headline-user-info&@&//*[@id="watch-headline-user-info"]/div', 'watch-headline-user-info&@&//*[@id="watch-headline-user-info"]/span', 'watch-headline-user-info&@&//*[@id="watch-mfu-button"]', '@lightbtn'],
      'watch-actions': ['watch-actions&@&//*[@id="watch-like-unlike"]', 'watch-actions&@&//*[@id="watch-actions"]/button[1]', 'watch-actions&@&//*[@id="watch-share"]', 'watch-actions&@&//*[@id="watch-flag"]', 'watch-actions&@%//*[@id="watch-transcript"]', '@downloadgroup', '@repeatbtn']/*,
      'watch7-sentiment-actions': ['watch7-sentiment-actions&@&//*[@id="watch-like-unlike"]', '@downloadgroup', '@repeatbtn', '@lightbtn']*/
    }
  };
  console.log("YTCenter: Making clone of default settings");
  ytcenter.settings = $Clone(ytcenter._settings);
  console.log("YTCenter: Adding mp3services to database");
  ytcenter.mp3services = [
    {
      label: 'SETTINGS_MP3SERVICES_VIDEO2MP3',
      value: 'http://www.video2mp3.net/index.php?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&hq=0'
    }, {
      label: 'SETTINGS_MP3SERVICES_VIDEO2MP3_HQ',
      value: 'http://www.video2mp3.net/index.php?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&hq=1'
    }, {
      label: 'SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64',
      value: 'http://www.youtubeinaudio.com/download.php?youtubeURL=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&quality=64&submit=Download+MP3'
    }, {
      label: 'SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128',
      value: 'http://www.youtubeinaudio.com/download.php?youtubeURL=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&quality=128&submit=Download+MP3'
    }, {
      label: 'SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320',
      value: 'http://www.youtubeinaudio.com/download.php?youtubeURL=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&quality=320&submit=Download+MP3'
    }, {
      label: 'SETTINGS_MP3SERVICES_HDDOWNLOADER_128',
      value: 'http://www.hddownloader.com/index.php?act=do&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&dldtype=128&outFormat=mp3'
    }, {
      label: 'SETTINGS_MP3SERVICES_HDDOWNLOADER_192',
      value: 'http://www.hddownloader.com/index.php?act=do&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&dldtype=192&outFormat=mp3'
    }, {
      label: 'SETTINGS_MP3SERVICES_HDDOWNLOADER_256',
      value: 'http://www.hddownloader.com/index.php?act=do&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D{videoid}&dldtype=256&outFormat=mp3'
    }, {
      label: 'SETTINGS_MP3SERVICES_YOUTUBEMP3PRO',
      value: 'http://www.youtubemp3pro.com/#{videoid}'
    }, {
      label: 'SETTINGS_MP3SERVICES_YOUTUBEMP3',
      value: 'http://www.youtube-mp3.org/#v={videoid}'
    }
  ];
  console.log("YTCenter: Initializing settings ui");
  ytcenter.ui = {};
  try {
  ytcenter.ui.settings = {
    "SETTINGS_TAB_GENERAL": [
      {
        "label": "SETTINGS_LANGUAGE",
        "type": "list",
        "advlist": function(){
          var a = [];
          a.push({
            "label": "LANGUAGE_AUTO",
            "value": "auto"
          });
          for (var key in ytcenter.language) {
            if (ytcenter.language.hasOwnProperty(key)) {
              a.push({
                "value": key,
                "variable": "ytcenter.language[\"" + key + "\"].LANGUAGE"
              });
            }
          }
          return a;
        },
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              ytcenter.updateLanguage();
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "language"
      }, {
        "label": "SETTINGS_REMOVEADVERTISEMENTS_LABEL",
        "type": "bool",
        "defaultSetting": "removeAdvertisements"
      }, {
        "label": "SETTINGS_AUTOEXPANDDESCRIPTION_LABEL",
        "type": "bool",
        "defaultSetting": "expandDescription"
      }, {
        "label": "SETTINGS_ENABLESHORTCUTS_LABEL",
        "type": "bool",
        "defaultSetting": "enableShortcuts"
      }, {
        "text": "SETTINGS_RESETSETTINGS_LABEL",
        "type": "button",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              if (confirm(ytcenter.locale["SETTINGS_RESETSETTINGS_TEXT"])) {
                ytcenter.settings = ytcenter._settings;
                ytcenter.saveSettings();
                loc.reload();
              }
            }
          }
        ]
      }, {
        "type": "html",
        "html": "<br />"
      }, {
        "type": "html",
        "htmllocale": "SETTINGS_PLACEMENTSYSTEM_HTML"
      }, {
        "text": "SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL",
        "style": {
          "marginLeft": "20px",
          "display": (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/) ? "block" : "none")
        },
        "type": "button",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              if (ytcenter.placementsystem.toggleEnable()) {
                $AddCSS(this, "yt-uix-button-toggled");
              } else {
                $RemoveCSS(this, "yt-uix-button-toggled");
              }
            }
          }
        ]
      }, {
        "type": "html",
        "htmllocale": "SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO",
        "style": {
          "marginLeft": "20px",
          "display": (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/) ? "none" : "block")
        }
      }
    ],
    "SETTINGS_TAB_PLAYER": [
      {
        "label": "SETTINGS_PLAYERSIZE_LABEL",
        "type": "list",
        "list": [
          {
            "value": "small",
            "label": "SETTINGS_PLAYERSIZE_LIST_SMALL"
          }, {
            "value": "large",
            "label": "SETTINGS_PLAYERSIZE_LIST_LARGE"
          }, {
            "value": "content",
            "label": "SETTINGS_PLAYERSIZE_LIST_CONTENT"
          }, {
            "value": "fill",
            "label": "SETTINGS_PLAYERSIZE_LIST_FILL"
          }, {
            "value": "1.5x",
            "label": "SETTINGS_PLAYERSIZE_LIST_15X"
          }, {
            "value": "2x",
            "label": "SETTINGS_PLAYERSIZE_LIST_2X"
          }, {
            "value": "2.5x",
            "label": "SETTINGS_PLAYERSIZE_LIST_25X"
          }, {
            "value": "3x",
            "label": "SETTINGS_PLAYERSIZE_LIST_3X"
          }, {
            "value": "360p",
            "label": "SETTINGS_PLAYERSIZE_LIST_360P"
          }, {
            "value": "480p",
            "label": "SETTINGS_PLAYERSIZE_LIST_480P"
          }, {
            "value": "720p",
            "label": "SETTINGS_PLAYERSIZE_LIST_720P"
          }, {
            "value": "1080p",
            "label": "SETTINGS_PLAYERSIZE_LIST_1080P"
          }
        ],
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "playersize"
      }, {
        "label": "SETTINGS_AUTOHIDECONTROLBAR_LABEL",
        "tooltip": "SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP",
        "type": "list",
        "list": [
          {
            "value": "0",
            "label": "SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE"
          }, {
            "value": "1",
            "label": "SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH"
          }, {
            "value": "2",
            "label": "SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR"
          }, {
            "value": "3",
            "label": "SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR"
          }
        ],
        "defaultSetting": "autohide"
      }, {
        "label": "SETTINGS_PLAYERTHEME_LABEL",
        "type": "list",
        "list": [
          {
            "value": "dark",
            "label": "SETTINGS_PLAYERTHEME_DARK"
          }, {
            "value": "light",
            "label": "SETTINGS_PLAYERTHEME_LIGHT"
          }
        ],
        "defaultSetting": "playerTheme"
      }, {
        "label": "SETTINGS_PLAYERCOLOR_LABEL",
        "type": "list",
        "list": [
          {
            "value": "red",
            "label": "SETTINGS_PLAYERCOLOR_RED"
          }, {
            "value": "white",
            "label": "SETTINGS_PLAYERCOLOR_WHITE"
          }
        ],
        "defaultSetting": "playerColor"
      }, {
        "label": "SETTINGS_WMODE_LABEL",
        "type": "list",
        "list": [
          {
            "value": "window",
            "label": "SETTINGS_WMODE_WINDOW"
          }, {
            "value": "direct",
            "label": "SETTINGS_WMODE_DIRECT"
          }, {
            "value": "opaque",
            "label": "SETTINGS_WMODE_OPAQUE"
          }, {
            "value": "transparent",
            "label": "SETTINGS_WMODE_TRANSPARENT"
          }, {
            "value": "gpu",
            "label": "SETTINGS_WMODE_GPU"
          }
        ],
        "defaultSetting": "flashWMode"
      }, {
        "label": "SETTINGS_ENABLEANNOTATIONS_LABEL",
        "type": "bool",
        "defaultSetting": "enableAnnotations"
      }, {
        "label": "SETTINGS_SCROLLTOPLAYER_LABEL",
        "type": "bool",
        "defaultSetting": "scrollToPlayer"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_PREVENTAUTOPLAY_LABEL",
        "type": "bool",
        "defaultSetting": "preventAutoPlay"
      }, {
        "label": "SETTINGS_PREVENTAUTOBUFFERING_LABEL",
        "type": "bool",
        "defaultSetting": "preventAutoBuffer"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_VOLUME_ENABLE",
        "type": "bool",
        "defaultSetting": "enableVolume"
      }, {
        "label": "SETTINGS_VOLUME_LABEL",
        "type": "range",
        "minRange": 0,
        "maxRange": 100,
        "defaultSetting": "volume"
      }, {
        "label": "SETTINGS_MUTE_LABEL",
        "type": "bool",
        "defaultSetting": "mute"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_LIGHTBULB_ENABLE",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "lightbulbEnable"
      }, {
        "label": "SETTINGS_LIGHTBULB_COLOR",
        "type": "text", // Temporary until created color picker
        "defaultSetting": "lightbulbBackgroundColor"
      }, {
        "label": "SETTINGS_LIGHTBULB_TRANSPARENCY",
        "type": "range",
        "minRange": 0,
        "maxRange": 100,
        "defaultSetting": "lightbulbBackgroundOpaque"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "type": "html",
        "htmllocale": "SETTINGS_EXPERIMENTAL_TITLE"
      }, {
        "label": "SETTINGS_EXPERIMENTAL_FLASHMODE",
        "type": "list",
        "list": [
          {
            "value": "clone",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_CLONE"
          }, {
            "value": "display",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_DISPLAY"
          }, {
            "value": "refreshhtml",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_REFRESHHTML"
          }, {
            "value": "nrab",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_NRAB"
          }, {
            "value": "src",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_SRC"
          }, {
            "value": "remapp",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_REMAPP"
          }, {
            "value": "reinit",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_REINIT"
          }, {
            "value": "none",
            "label": "SETTINGS_EXPERIMENTAL_FLASHMODE_NONE"
          }
        ],
        "defaultSetting": "experimentalFlashMode"
      }, {
        "label": "SETTINGS_EXPERIMENTAL_HTML5MODE",
        "type": "list",
        "list": [
          {
            "value": "none",
            "label": "SETTINGS_EXPERIMENTAL_HTML5MODE_NONE"
          }, {
            "value": "replace",
            "label": "SETTINGS_EXPERIMENTAL_HTML5MODE_REPLACE"
          }
        ],
        "defaultSetting": "experimentalHTML5Mode"
      }, {
        "type": "html",
        "htmllocale": "SETTINGS_EXPERIMENTAL_NOTE"
      }
    ],
    "SETTINGS_TAB_VIDEO": [
      {
        "label": "SETTINGS_ENABLEAUTORESOLUTION_LABEL",
        "type": "bool",
        "defaultSetting": "enableAutoVideoQuality"
      }, {
        "label": "SETTINGS_AUTORESOLUTION_LABEL",
        "type": "list",
        "list": [
          {
            "value": "highres",
            "label": "SETTINGS_HIGHRES"
          }, {
            "value": "hd1080",
            "label": "SETTINGS_HD1080"
          }, {
            "value": "hd720",
            "label": "SETTINGS_HD720"
          }, {
            "value": "large",
            "label": "SETTINGS_LARGE"
          }, {
            "value": "medium",
            "label": "SETTINGS_MEDIUM"
          }, {
            "value": "small",
            "label": "SETTINGS_SMALL"
          }
        ],
        "defaultSetting": "autoVideoQuality"
      }
    ],
    "SETTINGS_TAB_DOWNLOAD": [
      {
        "label": "SETTINGS_ENABLEDOWNLOAD_LABEL",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "enableDownload"
      }, {
        "label": "SETTINGS_DOWNLOADQUALITY_LABEL",
        "type": "list",
        "list": [
          {
            "value": "highres",
            "label": "SETTINGS_HIGHRES"
          }, {
            "value": "hd1080",
            "label": "SETTINGS_HD1080"
          }, {
            "value": "hd720",
            "label": "SETTINGS_HD720"
          }, {
            "value": "large",
            "label": "SETTINGS_LARGE"
          }, {
            "value": "medium",
            "label": "SETTINGS_MEDIUM"
          }, {
            "value": "small",
            "label": "SETTINGS_SMALL"
          }
        ],
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "downloadQuality"
      }, {
        "label": "SETTINGS_DOWNLOADFORMAT_LABEL",
        "type": "list",
        "list": [
          {
            "value": "mp4",
            "label": "SETTINGS_DOWNLOADFORMAT_LIST_MP4"
          }, {
            "value": "webm",
            "label": "SETTINGS_DOWNLOADFORMAT_LIST_WEBM"
          }, {
            "value": "flv",
            "label": "SETTINGS_DOWNLOADFORMAT_LIST_FLV"
          }, {
            "value": "3gp",
            "label": "SETTINGS_DOWNLOADFORMAT_LIST_3GP"
          }
        ],
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "downloadFormat"
      }, {
        "label": "SETTINGS_SHOW3DINDOWNLOADMENU_LABEL",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "show3DInDownloadMenu"
      }, {
        "label": "SETTINGS_FILENAME_LABEL",
        "type": "text",
        "defaultSetting": "filename"
      }, {
        "label": "SETTINGS_FIXDOWNLOADFILENAME_LABEL",
        "type": "bool",
        "defaultSetting": "fixfilename"
      }, {
        "label": "SETTINGS_MP3SERVICES_LABEL",
        "type": "multi",
        "multi": ytcenter.mp3services,
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "mp3Services"
      }
    ],
    "SETTINGS_TAB_REPEAT": [
      {
        "label": "SETTINGS_ENABLEREPEAT_LABEL",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "enableRepeat"
      }, {
        "label": "SETTINGS_AUTOACTIVATEREPEAT_LABEL",
        "type": "bool",
        "defaultSetting": "autoActivateRepeat"
      }
    ],
    "SETTINGS_TAB_UPDATE": [
      {
        "label": "SETTINGS_UPDATE_ENABLE",
        "type": "bool",
        "defaultSetting": "enableUpdateChecker"
      }, {
        "label": "SETTINGS_UPDATE_INTERVAL",
        "type": "list",
        "list": [
          {
            "value": "0",
            "label": "SETTINGS_UPDATE_INTERVAL_ALWAYS"
          }, {
            "value": "1",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERYHOUR"
          }, {
            "value": "2",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERY2HOUR"
          }, {
            "value": "12",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERY12HOUR"
          }, {
            "value": "24",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERYDAY"
          }, {
            "value": "48",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERY2DAY"
          }, {
            "value": "168",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERYWEEK"
          }, {
            "value": "336",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERY2WEEK"
          }, {
            "value": "720",
            "label": "SETTINGS_UPDATE_INTERVAL_EVERYMONTH"
          }
        ],
        "defaultSetting": "updateCheckerInterval"
      }, {
        "type": "button",
        "text": "SETTINGS_UPDATE_CHECKFORNEWUPDATES",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              this.textContent = ytcenter.locale["SETTINGS_UPDATE_CHECKINGFORNEWUPDATES"];
              this.disabled = true;
              ytcenter.checkForUpdates((function(self){
                return function(){
                  self.textContent = ytcenter.locale["SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS"];
                  self.disabled = false;
                };
              })(this), (function(self){
                return function(){
                  self.textContent = ytcenter.locale["SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR"];
                  self.disabled = false;
                };
              })(this));
            }
          }
        ]
      }
    ],
    "SETTINGS_TAB_DEBUG": [
      {
        "type": "textarea",
        "style": {
          "height": "140px"
        },
        "load": function(){
          console.log("YTCenter: Loading debug text...");
          this.textContent = (function(){
            var debugText = "{}";
            var dbg = {};
            try {
              dbg.location = {
                hash: loc.hash,
                host: loc.host,
                hostname: loc.hostname,
                href: loc.href,
                origin: loc.origin,
                pathname: loc.pathname,
                port: loc.port,
                protocol: loc.protocol,
                search: loc.search
              };
              dbg.navigator = {
                userAgent: uw.navigator.userAgent,
                vendor: uw.navigator.vendor,
                vendorSub: uw.navigator.vendorSub,
                platform: uw.navigator.platform
              };
              dbg.ytcenter = ytcenter;
              if (typeof dbg.ytcenter.player.reference != "undefined") {
                dbg.ytcenter.player.reference = true;
              } else {
                dbg.ytcenter.player.reference = false;
              }
              console.log(dbg);
              debugText = JSON.stringify(dbg);
            } catch (e) {
              console.error(e);
              debugText = e;
            }
            return debugText;
          })();
        }
      }
    ],
    "SETTINGS_TAB_ABOUT": [
      {
        "type": "html",
        "htmllocale": "SETTINGS_ABOUT_HTML",
        "replace": {
          "version": ytcenter.version
        }
      }, {
        "type": "html",
        "htmllocale": "SETTINGS_ABOUT_TRANSLATORS_HTML",
        "replace": {
          "translators": "<div style=\"margin-left:20px;\">Arabic (Bahrain) - alihill381<br />Danish - Jeppe Rune Mortensen (YePpHa)<br />French - Loïc B (ThePoivron)<br />German - Simon Artmann<br />Hebrew (Israel) - baryoni<br />Italian - Pietro De Nicolao<br />Russian - <a href=\"http://kdasoft.narod.ru\" target=\"_blank\">KDASOFT</a><br />Spanish - Roxz<br />Turkish - Ismail Aksu<br />Hungarian - Eugenox<br />Portuguese (Brazil) - Thiago R. M. Pereira</div>"
        }
      }
    ]
  };
  } catch (e) {
    console.error(e);
  }
  console.log("YTCenter: Settings UI Inititialized");
  ytcenter.unsafe = {};
  ytcenter.video = {};
  ytcenter.video.format = [
    {
      type: 'video/mp4',
      name: 'SETTINGS_DOWNLOADFORMAT_LIST_MP4',
      key: 'mp4'
    }, {
      type: 'video/webm',
      name: 'SETTINGS_DOWNLOADFORMAT_LIST_WEBM',
      key: 'webm'
    }, {
      type: 'video/x-flv',
      name: 'SETTINGS_DOWNLOADFORMAT_LIST_FLV',
      key: 'flv'
    }, {
      type: 'video/3gpp',
      name: 'SETTINGS_DOWNLOADFORMAT_LIST_3GP',
      key: '3gp'
    }
  ];
  ytcenter.video.resolutions = {
    'small': '240p',
    'medium': '360p',
    'large': '480p',
    'hd720': '720p',
    'hd1080': '1080p',
    'highres': 'Original'
  };
  ytcenter.video.id = "";
  ytcenter.video.title = "";
  ytcenter.video.author = "";
  console.log("YTCenter: Download initializing");
  ytcenter.video.download = (function(){
    var _download_iframe = null;
    return function(itag){
      console.log("YTCenter: Downloading format " + itag + "...");
      var stream = null;
      for (var i = 0; i < ytcenter.video.stream.length; i++) {
        if (ytcenter.video.stream[i].itag === itag && typeof ytcenter.video.stream[i].url != "undefined") {
          stream = ytcenter.video.stream[i];
          break;
        }
      }
      if (stream != null) {
        var filename = $TextReplacer(ytcenter.settings.filename, {
          title: ytcenter.video.title,
          videoid: ytcenter.video.id,
          author: ytcenter.video.author,
          resolution: (ytcenter.video.resolutions.hasOwnProperty(stream.quality) ? ytcenter.video.resolutions[stream.quality] : ''),
          itag: itag,
          dimension: stream.dimension,
          width: stream.dimension.split("x")[0],
          height: stream.dimension.split("x")[1],
          format: (function(){
            for (var i = 0; i < ytcenter.video.format.length; i++) {
              if (stream.type.indexOf(ytcenter.video.format[i].type) == 0) {
                return ytcenter.locale[ytcenter.video.format[i].name];
              }
            }
            return "";
          })(),
          quality: stream.quality,
          type: stream.type
        });
        // Removing illegal characters for filename for OS
        if (uw.navigator.appVersion.toLowerCase().indexOf("win") != -1) {
          filename = filename.replace(new RegExp('[\/:|]+', 'g'), "-");
          filename = filename.replace(new RegExp('["*?<>]+', 'g'), "_");
        } else if (uw.navigator.appVersion.toLowerCase().indexOf("mac") != -1) {
          filename = filename.replace(new RegExp('^\.'), "_");
          filename = filename.replace(":", "-");
        } else if (uw.navigator.appVersion.toLowerCase().indexOf("linux") != -1) {
          filename = filename.replace(new RegExp('[/\0]+', 'g'), "-");
        }
        console.log("YTCenter: Downloading file with filename: " + filename);
        
        if (ytcenter.settings.fixfilename) {
          var tmp = "";
          for (var i = 0; i < filename.length; i++) {
            if (filename.charAt(i).match(/[0-9a-zA-Z ]/i)) {
              tmp += filename.charAt(i);
            }
          }
          filename = tmp;
        }
        
        if (!_download_iframe) { // Initalize iframe if it doesn't exist
          _download_iframe = document.createElement("iframe");
          _download_iframe.style.position = "absolute";
          _download_iframe.style.top = "-1000px";
          _download_iframe.style.left = "-1000px";
          _download_iframe.style.width = "1px";
          _download_iframe.style.height = "1px";
          document.body.appendChild(_download_iframe);
        }
        _download_iframe.setAttribute("src", stream.url + "&title=" + encodeURIComponent(filename));
      } else {
        console.log("YTCenter: Format (" + itag + ") not found and therefore couldn't start downloading");
        throw "Stream (" + itag + ") not found!";
      }
    };
  })();
  ytcenter.video.stream = [];
  
  ytcenter.player = {};
  ytcenter.player.resize = (function(){
    var _width = "";
    var _height = "";
    var _wide = true;
    window.addEventListener("resize", function(){
      console.log("YTCenter: Window Resize listener called, width: \"" + _width + "\", height: \"" + _height + "\"");
      if (_width != '' && _height != '' && (_width.match(/%$/) || _height.match(/%$/))) {
        ytcenter.player.resize(_width, _height, _wide);
      }
    }, false);
    return function(width, height, wide){
      if (typeof wide == "undefined") wide = false;
      console.log("YTCenter: Resizing YouTube Player to width: \"" + width + "\", height: \"" + height + "\"" + (wide ? ", and enabling wide" : ", and disabling wide"));
      _width = width;
      _height = height;
      _wide = wide;
      if (wide) {
        $AddCSS(document.getElementById("watch-video") || document.getElementById("watch7-video"), 'medium');
        $AddCSS(document.getElementById("page"), 'watch-wide');
        if (ytcenter.watch7) {
          
        }
      } else {
        $RemoveCSS(document.getElementById("watch-video") || document.getElementById("watch7-video"), 'medium');
        $RemoveCSS(document.getElementById("page"), 'watch-wide');
        if (ytcenter.watch7) {
        }
      }
      var wv = document.getElementById("watch-video") || document.getElementById("watch7-video");
      var wp = document.getElementById("watch-player") || document.getElementById("watch7-player");
      if (width.indexOf("%") != -1 && width.match(/%$/)) {
        wv.style.width = (parseFloat(width)/100*document.body.clientWidth) + "px";
      } else {
        wv.style.width = width;
      }
      if (height.indexOf("%") != -1 && height.match(/%$/)) {
        wv.style.height = (parseFloat(height)/100*document.body.clientHeight) + "px";
      } else {
        wv.style.height = height;
      }
      wp.style.width = wv.style.width;
      wp.style.height = wv.style.height;
      
      if (ytcenter.html5 && document.getElementsByTagName("video")[0]) {
        document.getElementsByTagName("video")[0].parentNode.style.width = "100%";
        document.getElementsByTagName("video")[0].parentNode.style.height = "100%";
        document.getElementsByTagName("video")[0].parentNode.style.left = "0px";
        document.getElementsByTagName("video")[0].parentNode.style.top = "0px";
      }
    };
  })();
  ytcenter.player.setQuality = function(vq){
    var pc = (yt.playerConfig.args ? yt.playerConfig : yt.getConfig("PLAYER_CONFIG"));
    console.log(pc);
    console.log("YTCenter: Getting Highest Available Quality With \"" + vq + "\" As Highest Quality");
    var priority = ['auto', 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'];
    if (ytcenter.html5) {
      var a = document.createElement("video");
      if (a && a.canPlayType) {
        pc.args.vq = "auto";
        for (var i = 0; i < ytcenter.video.stream.length; i++) {
          console.log("YTCenter: " + ytcenter.video.stream[i].type + " => " + a.canPlayType(ytcenter.video.stream[i].type.split(";")[0]));
          if ($ArrayIndexOf(priority, ytcenter.video.stream[i].quality) <= $ArrayIndexOf(priority, vq) && $ArrayIndexOf(priority, ytcenter.video.stream[i].quality) > $ArrayIndexOf(priority, pc.args.vq) && a.canPlayType(ytcenter.video.stream[i].type.split(";")[0])) {
            pc.args.vq = ytcenter.video.stream[i].quality;
          }
        }
      }
    } else {
      for (var i = 0; i < ytcenter.video.stream.length; i++) {
        if ($ArrayIndexOf(priority, ytcenter.video.stream[i].quality) <= $ArrayIndexOf(priority, vq) && $ArrayIndexOf(priority, ytcenter.video.stream[i].quality) > $ArrayIndexOf(priority, pc.args.vq)) {
          pc.args.vq = ytcenter.video.stream[i].quality;
        }
      }
    }
    console.log("YTCenter: Setting Video Quality to " + pc.args.vq);
    if (typeof ytcenter.player.reference != "undefined" && ytcenter.player.reference.onReadyCalled) {
      console.log("YTCenter: Setting PlaybackQuality to " + pc.args.vq);
      ytcenter.player.reference.api.setPlaybackQuality(pc.args.vq);
    }
  };
  ytcenter.player.update = function(onplayerloaded){
    var pc = (yt.playerConfig.args ? yt.playerConfig : yt.getConfig("PLAYER_CONFIG"));
    console.log("YTCenter: Update Called");
    if (!ytcenter.player.jsapicallback) {
      ytcenter.player.jsapicallback = pc.args.jsapicallback; // Save the default jsapicallback for later use
    }
    pc.args.enablejsapi = "1";
    
    ytcenter.unsafe.onplayerloaded = (function(onplayerloaded, jsapicallback, reference){
      return function(playerid){
        console.log("YTCenter: YouTube Player Ready");
        if (jsapicallback) {
          console.log("YTCenter: Calling YouTube API Callback");
          jsapicallback(playerid); // YouTube's default callback
        }
        
        ytcenter.player.reference = reference[playerid];
        
        if (ytcenter.settings.autoplay == '1') {
          this.seekTo(this.getCurrentTime(), false);
        }
        onplayerloaded.apply(reference[playerid].api, [playerid, reference[playerid], (function(api){
          var listeners = {
            'onStateChange': [],
            'onPlaybackQualityChange': [],
            'onError': [],
            'onApiChange': []
          };
          var add = function(event, callback) {
            if (listeners.hasOwnProperty(event)) {
              listeners[event].push(callback);
              return listeners[event].length-1;
            } else {
              throw "The event: " + event + ", was not found!";
            }
          };
          var rem = function(event, id) {
            if (listeners.hasOwnProperty(event)) {
              if (id < listeners[event].length) {
                listeners[event][id] = null;
              } else {
                throw "The listener with id: " + id + ", was not found!";
              }
            } else {
              throw "The event: " + event + ", was not found!";
            }
          };
          
          ytcenter.unsafe.onStateChange = function(){
            for (var i = 0; i < listeners['onStateChange'].length; i++) {
              if (listeners['onStateChange'][i] == null) continue;
              listeners['onStateChange'][i].apply(api, arguments);
            }
          };
          ytcenter.unsafe.onPlaybackQualityChange = function(){
            for (var i = 0; i < listeners['onPlaybackQualityChange'].length; i++) {
              if (listeners['onPlaybackQualityChange'][i] == null) continue;
              listeners['onPlaybackQualityChange'][i].apply(api, arguments);
            }
          };
          ytcenter.unsafe.onError = function(){
            for (var i = 0; i < listeners['onError'].length; i++) {
              if (listeners['onError'][i] == null) continue;
              listeners['onError'][i].apply(api, arguments);
            }
          };
          ytcenter.unsafe.onApiChange = function(){
            for (var i = 0; i < listeners['onApiChange'].length; i++) {
              if (listeners['onApiChange'][i] == null) continue;
              listeners['onApiChange'][i].apply(api, arguments);
            }
          };
          
          api.addEventListener("onStateChange", "ytcenter.onStateChange");
          api.addEventListener("onPlaybackQualityChange", "ytcenter.onPlaybackQualityChange");
          api.addEventListener("onError", "ytcenter.onError");
          api.addEventListener("onApiChange", "ytcenter.onApiChange");
          
          return {
            addEventListener: add,
            removeEventListener: rem
          };
        })(reference[playerid].api)]); // YouTube Center's additional callback
      };
    })(onplayerloaded, uw[ytcenter.player.jsapicallback], yt.player.playerReferences_);
    pc.args.jsapicallback = "ytcenter.onplayerloaded";
    
    if (ytcenter.html5) {
      console.log("YTCenter: Updating YouTube HTML5 Player");
      var player = document.getElementsByTagName("video")[0];
      if (player) {
        console.log("YTCenter: YouTube HTML5 Player Already Initialized... Reinitializing...");
        if (typeof player.mute != 'undefined') {
          player.mute();
        } else if (typeof player.muted != 'undefined') {
          player.muted = true;
        }
        player.pause();
        player.src = "";
        player.load();
        player.addEventListener("play", function(){
          if (typeof this.mute != 'undefined') {
            this.mute();
          } else if (typeof this.muted != 'undefined') {
            this.muted = true;
          }
          this.pause();
          this.src = "";
          this.load();
          ytcenter.discardElement(this);
          delete(this);
        }, false);

        yt.www.watch.player.updateConfig(pc);
        yt.setConfig({'PLAYER_REFERENCE': yt.player.embed('watch-player', pc)});
      } else {
        console.log("YTCenter: YouTube HTML5 Player not initialized");
        switch (ytcenter.settings.experimentalHTML5Mode) {
          case 'none':
            console.log("YTCenter: YouTube HTML5 Player (None)");
            break;
          case 'replace':
            console.log("YTCenter: YouTube HTML5 Player (Replace)");
            var dnif = function(e){
              if (e.target.nodeName ===  "VIDEO") {
                this.removeEventListener('DOMNodeInserted', dnif, false);
                console.log("YTCenter: YouTube HTML5 Player initialized... Reinitializing...");
                if (typeof e.target.mute != 'undefined') {
                  e.target.mute();
                } else if (typeof e.target.muted != 'undefined') {
                  e.target.muted = true;
                }
                e.target.pause();
                e.target.src = "";
                e.target.load();
                e.target.addEventListener("play", function(e){
                  if (typeof this.mute != 'undefined') {
                    this.mute();
                  } else if (typeof this.muted != 'undefined') {
                    this.muted = true;
                  }
                  this.pause();
                  this.src = "";
                  this.load();
                }, false);
                (function(){
                  ytcenter.discardElement(e.target);
                  yt.www.watch.player.updateConfig(yt.playerConfig);
                  yt.setConfig({'PLAYER_REFERENCE': yt.player.embed('watch-player', yt.playerConfig)});
                })();
              }
            };
            document.addEventListener("DOMNodeInserted", dnif, false);
          default:
            console.log("YTCenter: YouTube HTML5 Player (None)");
            break;
        }
      }
    } else {
      console.log("YTCenter: YouTube Flash Player Detected");
      var flashvars = "";
      for (var key in pc.args) {
        if (pc.args.hasOwnProperty(key)) {
          if (flashvars !== "") flashvars += "&";
          flashvars += key + "=" + escape(pc.args[key]);
        }
      }
      var up = function(player){
        console.log("YouTube Center: Destroying video");
        
        player.setAttribute("flashvars", flashvars);
        player.setAttribute("wmode", ytcenter.settings['flashWMode']);
        
        switch (ytcenter.settings.experimentalFlashMode) {
          case 'clone':
            console.log("YTCenter: Cloning YouTube Flash Player");
            var clone = player.cloneNode(true);
            player.style.display = "none";
            player.src = "";
            player.parentNode.replaceChild(clone, player);
            player = clone;
            break;
          case 'display':
            console.log("YTCenter: Reappending YouTube Flash Player to Parent");
            var n = player.parentNode;
            player.style.display = "none";
            setTimeout(function(){
              player.style.display = "block";
            }, 50);
            break;
          case 'refreshhtml':
            console.log("YTCenter: Refreshing the html of the player");
            player.style.display = "none";
            player.outerHTML = player.outerHTML;
            break;
          case 'nrab':
            console.log("YTCenter: Changing display to none, removing child from parent, appending child to parent, changing display back to block");
            var n = player.parentNode;
            var oldsrc = player.src;
            player.style.display = "none";
            n.removeChild(player);
            (function(){
              n.appendChild(player);
              player.style.display = "block";
            })();
            break;
          case 'src':
            console.log("YTCenter: Chaning Source for YouTube Flash Player");
            player.src = player.src + "?" + (new Date).getTime();
            break;
          case 'remapp':
            console.log("YTCenter: Reappending YouTube Flash Player to Parent");
            var n = player.parentNode;
            n.removeChild(player);
            (function(){
              n.appendChild(player);
            })();
            break;
          case 'reinit':
            console.log("YTCenter: Using YouTube API to initialize YouTube Flash Player Again");
            yt.www.watch.player.updateConfig(yt.playerConfig);
            yt.setConfig({'PLAYER_REFERENCE': yt.player.update('watch-player', yt.playerConfig, true, uw.gYouTubePlayerReady)});
            break;
          case 'none':
            console.log("YTCenter: Doing Nothing To YouTube Flash Player");
            break;
          default: // Same as clone
            console.log("YTCenter: Cloning YouTube Flash Player");
            var clone = player.cloneNode(true);
            player.parentNode.replaceChild(clone, player);
            player = clone;
            break;
        }
      };
      var tmo = function(){
        var mp = document.getElementById("movie_player") || document.getElementById("movie_player-flash");
        if (mp) {
          up(mp);
        } else {
          uw.setTimeout(tmo, 10);
        }
      };
      tmo();
    }
  };
  ytcenter.parseStream = function(playerConfig){
    var parser1 = function(f){
      var a = f.split(",");
      var r = [];
      for (var i = 0; i < a.length; i++) {
        var b = a[i].split("/");
        var itag = b.shift();
        var dimension = b.shift();
        r.push({
          itag: itag,
          dimension: dimension,
          unknown: b
        });
      }
      return r;
    };
    var parser2 = function(u){
      var a = u.split(",");
      var b = [];
      for (var i = 0; i < a.length; i++) {
        var c = {};
        var d = a[i].split("&");
        for (var j = 0; j < d.length; j++) {
          var e = d[j].split("=");
          c[e[0]] = unescape(e[1]);
        }
        b.push(c);
      }
      return b;
    };
    var fmt = parser1(playerConfig.args.fmt_list);
    var stream = parser2(playerConfig.args.url_encoded_fmt_stream_map);
    var a = [];
    for (var i = 0; i < stream.length; i++) {
      var fl = null;
      for (var j = 0; j < fmt.length; j++) {
        if (stream[i].itag !== fmt[j].itag) continue;
        fl = fmt[j];
        break;
      }
      if (fl == null) {
        a.push(stream[i]);
      } else {
        var coll = stream[i];
        coll.dimension = fl.dimension;
        coll.unknown = fl.unknown;
        a.push(coll);
      }
    }
    return a;
  };
  uw['ytcenter'] = ytcenter.unsafe;
  /*if (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/)) {
    document.addEventListener("unload", function(){
      if (ytcenter.mainTab) {
        if (ytcenter.settings.preventTabAutoPlay) {
          
        } else if (ytcenter.settings.preventTabAutoBuffer) {
          
        }
      }
    }, false);
  }*/
  var ytchannelfeatureinit = function(){
    yt = uw.yt;
    var playerConfig = yt.getConfig("PLAYER_CONFIG");
    if (playerConfig.html5) ytcenter.html5 = true;
    ytcenter.video.stream = ytcenter.parseStream(playerConfig);
    
    ytcenter.loadSettings();
    ytcenter.updateLanguage();
    
    if (ytcenter.settings.enableAutoVideoQuality) {
      ytcenter.player.setQuality(ytcenter.settings.autoVideoQuality);
    }
    if (ytcenter.settings.removeAdvertisements) {
      playerConfig.args.csi_page_type = "watch5";
      var advertisementArguments = ['ad3_module', 'ad_channel_code_instream', 'ad_channel_code_overlay', 'ad_eurl', 'ad_flags', 'ad_host', 'ad_host_tier', 'ad_logging_flag', 'ad_preroll', 'ad_slots', 'ad_tag', 'ad_video_pub_id', 'aftv', 'afv', 'afv_ad_tag', 'afv_instream_max'];
      for (var i = 0; i < advertisementArguments.length; i++) {
        delete playerConfig.args[advertisementArguments[i]];
      }
    }
    if (!ytcenter.settings.enableAnnotations) {
      playerConfig.args.iv_load_policy = 3;
    } else {
      playerConfig.args.iv_load_policy = 1;
    }
    if (typeof ytcenter.settings.autohide != "undefined") {
      playerConfig.args.autohide = ytcenter.settings.autohide;
    }
    if (ytcenter.settings.preventAutoBuffer) {
      playerConfig.args.autoplay = 0;
    }
    playerConfig.args.theme = ytcenter.settings.playerTheme;
    playerConfig.args.color = ytcenter.settings.playerColor;
    playerConfig.args.enablejsapi = "1";
    
    console.log("YTCenter: Adding player shortcuts to document");
    document.addEventListener("keydown", function(e){
      e = e || window.event;
      if (ytcenter.settings.enableShortcuts) {
        if (document.activeElement.tagName.toLowerCase() === "input" || document.activeElement.tagName.toLowerCase() === "textarea" || document.activeElement.tagName.toLowerCase() === "object" || document.activeElement.tagName.toLowerCase() === "embed" || document.activeElement.tagName.toLowerCase() === "button") return;
        var player = yt.getConfig("PLAYER_REFERENCE");
        switch (e.keyCode) {
          case 32: // Space
            if (player.getPlayerState() == 1) {
              player.pauseVideo();
            } else {
              player.playVideo();
            }
            break;
          case 37: // Left Arrow
            player.seekTo(player.getCurrentTime()-10, true);
            break;
          case 39: // Right Arrow
            player.seekTo(player.getCurrentTime()+10, true);
            break;
          case 35: // End
            player.seekTo(player.getDuration(), true);
            break;
          case 36: // Home
            player.seekTo(0, true);
            break;
          case 48: // 0
            player.seekTo(0, true);
            break;
          case 49: // 1
            player.seekTo(0.1*player.getDuration(), true);
            break;
          case 50: // 2
            player.seekTo(0.2*player.getDuration(), true);
            break;
          case 51: // 3
            player.seekTo(0.3*player.getDuration(), true);
            break;
          case 52: // 4
            player.seekTo(0.4*player.getDuration(), true);
            break;
          case 53: // 5
            player.seekTo(0.5*player.getDuration(), true);
            break;
          case 54: // 6
            player.seekTo(0.6*player.getDuration(), true);
            break;
          case 55: // 7
            player.seekTo(0.7*player.getDuration(), true);
            break;
          case 56: // 8
            player.seekTo(0.8*player.getDuration(), true);
            break;
          case 57: // 9
            player.seekTo(0.9*player.getDuration(), true);
            break;
          default:
            return;
        }
        e.preventDefault();
      }
    }, false);
    console.log("YTCenter: Updating YouTube Player");
    ytcenter.player.update(function(playerid, player, listener){
      console.log("YTCenter: YouTube Player Loaded");
      player.target.style.zIndex = "102";
      
      if (this.getVolume() != ytcenter.settings.volume && ytcenter.settings.enableVolume) {
        if (ytcenter.settings.volume < 0) {
          ytcenter.settings.volume = 0;
        } else if (ytcenter.settings.volume > 100) {
          ytcenter.settings.volume = 100;
        }
        this.setVolume(ytcenter.settings.volume);
      }
      if (ytcenter.settings.mute && !this.isMuted()) {
        this.mute();
      } else if (!ytcenter.settings.mute && this.isMuted()) {
        this.unMute();
      }
      if (this.getPlaybackQuality() != yt.playerConfig.args.vq) {
        this.setPlaybackQuality(yt.playerConfig.args.vq);
        listener.addEventListener("onStateChange", (function(self){
          var _applied = false;
          return function(state){
            if (state > -1) {
              if (!_applied) {
                self.setPlaybackQuality(yt.playerConfig.args.vq);
                _applied = true;
              }
            }
          };
        })(this));
      }
      if (ytcenter.html5 && (ytcenter.settings.preventAutoPlay || ytcenter.settings.preventAutoBuffer)) {
        if (ytcenter.settings.preventAutoBuffer) {
          this.stopVideo();
        } else if (ytcenter.settings.preventAutoPlay) {
          this.pauseVideo();
        }
        listener.addEventListener("onStateChange", (function(){
          var _applied = false;
          return function(state){
            if (state == 1 && !_applied) {
              if (ytcenter.settings.preventAutoBuffer) {
                player.api.stopVideo();
              } else if (ytcenter.settings.preventAutoPlay) {
                player.api.pauseVideo();
              }
              _applied = true;
            }
          };
        })());
      } else if (!ytcenter.html5 && ytcenter.settings.preventAutoPlay && !ytcenter.settings.preventAutoBuffer) {
        this.mute();
        this.pauseVideo();
        if (!ytcenter.settings.mute) {
          this.unMute();
        }
        listener.addEventListener("onStateChange", (function(){
          var _applied = false;
          return function(state){
            if (state == 2 && !_applied) {
              _applied = true;
            }
            if (state == 1 && !_applied) {
              this.mute();
              this.pauseVideo();
              if (!ytcenter.settings.mute) {
                this.unMute();
              }
              _applied = true;
            }
          };
        })());
      }
      
      listener.addEventListener("onStateChange", (function(player){
        return function(state){
          if (state == 0 && ytcenter.doRepeat && ytcenter.settings.enableRepeat) {
            player.playVideo();
          }
        };
      })(this));
    });
    if (ytcenter.settings.removeAdvertisements) {
      var vextra = document.getElementById("watch-video-extra");
      if (vextra) {
        $AddCSS(vextra, "hid");
      }
      var vcontent = document.getElementById("content");
      if (vcontent) {
        vcontent.setAttribute("style", "background:!important;");
      }
    }
    $CreateSettingsUI();
    $UpdateChecker();
    var elm = document.getElementsByTagName("div");
    for (var i = 0; i < elm.length; i++) {
      if ($HasAttribute(elm[i], "data-swf-config")) {
        elm[i].setAttribute("data-swf-config", JSON.stringify(yt.getConfig("PLAYER_CONFIG")));
        break;
      }
    }
  };
  
  var ytwatchinit = function(){
    yt = uw.yt;
    if (document.getElementById("watch7-main")) ytcenter.watch7 = true;
    if (!document.getElementById("movie_player")) ytcenter.html5 = true;
    ytcenter.video.stream = ytcenter.parseStream(yt.playerConfig);
    
    ytcenter.video.id = yt.playerConfig.args.video_id;
    ytcenter.video.title = yt.playerConfig.args.title;
    ytcenter.video.author = document.getElementsByClassName("yt-user-name")[0].textContent;
    
    ytcenter.loadSettings();
    
    ytcenter.updateLanguage();
    
    if (ytcenter.settings.enableAutoVideoQuality) {
      ytcenter.player.setQuality(ytcenter.settings.autoVideoQuality);
    }
    if (ytcenter.settings.removeAdvertisements) {
      yt.playerConfig.args.csi_page_type = "watch5";
      var advertisementArguments = ['ad3_module', 'ad_channel_code_instream', 'ad_channel_code_overlay', 'ad_eurl', 'ad_flags', 'ad_host', 'ad_host_tier', 'ad_logging_flag', 'ad_preroll', 'ad_slots', 'ad_tag', 'ad_video_pub_id', 'aftv', 'afv', 'afv_ad_tag', 'afv_instream_max'];
      for (var i = 0; i < advertisementArguments.length; i++) {
        delete yt.playerConfig.args[advertisementArguments[i]];
      }
    }
    if (!ytcenter.settings.enableAnnotations) {
      yt.playerConfig.args.iv_load_policy = 3;
    } else {
      yt.playerConfig.args.iv_load_policy = 1;
    }
    if (typeof ytcenter.settings.autohide != "undefined") {
      yt.playerConfig.args.autohide = ytcenter.settings.autohide;
    }
    if (ytcenter.settings.preventAutoBuffer) {
      yt.playerConfig.args.autoplay = 0;
    }
    yt.playerConfig.args.theme = ytcenter.settings.playerTheme;
    yt.playerConfig.args.color = ytcenter.settings.playerColor;
    yt.playerConfig.args.enablejsapi = "1";
    
    var original_width = 640;
    var original_height = 390 - 30;
    var original_height_removed = 0;
    if (ytcenter.html5) {
      original_height_removed = 30;
    } else {
      if (ytcenter.settings.autohide == '0') {
        original_height_removed = 35;
      } else if (ytcenter.settings.autohide == '2') {
        original_height_removed = 30;
      } else if (ytcenter.settings.autohide == '3') {
        original_height_removed = 3;
      }
    }
    
    var watchVideo = document.getElementById("watch-video") || document.getElementById("watch7-video");
    if (watchVideo) {
      watchVideo.style.overflow = "visible";
      switch (ytcenter.settings.playersize) {
        case 'small':
          ytcenter.player.resize("", "", false);
          break;
        case 'large':
          ytcenter.player.resize("", "", true);
          break;
        case 'content':
          ytcenter.player.resize("970px", (970/(640/original_height)+original_height_removed) + "px", true);
          break;
        case 'fill':
          ytcenter.player.resize("100%", "100%", true);
          break;
        case '1.5x':
          ytcenter.player.resize((original_width*1.5) + "px", (original_height*1.5+original_height_removed) + "px", true);
          break;
        case '2x':
          ytcenter.player.resize((original_width*2) + "px", (original_height*2+original_height_removed) + "px", true);
          break;
        case '2.5x':
          ytcenter.player.resize((original_width*2.5) + "px", (original_height*2.5+original_height_removed) + "px", true);
          break;
        case '3x':
          ytcenter.player.resize((original_width*3) + "px", (original_height*3+original_height_removed) + "px", true);
          break;
        case '360p':
          ytcenter.player.resize("640px", (360 + original_height_removed) + "px", true);
          break;
        case '480p':
          ytcenter.player.resize("853.333px", (480 + original_height_removed) + "px", true);
          break;
        case '720p':
          ytcenter.player.resize("1280px", (720 + original_height_removed) + "px", true);
          break;
        case '1080p':
          ytcenter.player.resize("1920px", (1080 + original_height_removed) + "px", true);
          break;
      }
      var sb = document.createElement("button");
      sb.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip" + (ytcenter.settings.playersize == 'fill' ? "" : " hid");
      sb.type = "button";
      sb.setAttribute("role", "button");
      sb.setAttribute("onclick", ";return false;");
      sb.title = ytcenter.locale['SCROLL_TOOLTIP'];
      ytcenter.database.register(sb, 'SCROLL_TOOLTIP', '@title');
      sb.style.position = "absolute";
      sb.style.right = "7px";
      sb.style.top = "-32px";
      sb.addEventListener('click', (function(watchVideo){
        return function(){
          watchVideo.scrollIntoView(true);
        }
      })(watchVideo), false);
      var arr = document.createElement("img");
      arr.className = "yt-uix-button-arrow";
      arr.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
      arr.alt = "";
      arr.style.marginLeft = "0";
      sb.appendChild(arr);
      watchVideo.appendChild(sb);
      
      if (!ytcenter.watch7) {
        ytcenter.database.codeRegister(watchVideo, (function(sb, original_width, original_height, original_height_removed){
          var _pb = document.getElementById("playlist-bar");
          if (typeof _pb != "undefined") {
            var _pb_timer;
            document.addEventListener("mousemove", function(){
              _pb.style.display = "block";
              clearTimeout(_pb_timer);
              if (ytcenter.settings.playersize == 'fill') {
                _pb_timer = uw.setTimeout(function(){
                  _pb.style.display = "none";
                }, 3000);
              }
            }, false);
          }
          return function(){
            if (ytcenter.settings.playersize == 'fill') {
              $RemoveCSS(sb, 'hid');
            } else {
              $AddCSS(sb, 'hid');
            }
            switch (ytcenter.settings.playersize) {
              case 'small':
                ytcenter.player.resize("", "", false);
                break;
              case 'large':
                ytcenter.player.resize("", "", true);
                break;
              case 'content':
                ytcenter.player.resize("970px", (970/(640/original_height)+original_height_removed) + "px", true);
                break;
              case 'fill':
                ytcenter.player.resize("100%", "100%", true);
                break;
              case '1.5x':
                ytcenter.player.resize((original_width*1.5) + "px", (original_height*1.5+original_height_removed) + "px", true);
                break;
              case '2x':
                ytcenter.player.resize((original_width*2) + "px", (original_height*2+original_height_removed) + "px", true);
                break;
              case '2.5x':
                ytcenter.player.resize((original_width*2.5) + "px", (original_height*2.5+original_height_removed) + "px", true);
                break;
              case '3x':
                ytcenter.player.resize((original_width*3) + "px", (original_height*3+original_height_removed) + "px", true);
                break;
              case '360p':
                ytcenter.player.resize("640px", (360 + original_height_removed) + "px", true);
                break;
              case '480p':
                ytcenter.player.resize("853.333px", (480 + original_height_removed) + "px", true);
                break;
              case '720p':
                ytcenter.player.resize("1280px", (720 + original_height_removed) + "px", true);
                break;
              case '1080p':
                ytcenter.player.resize("1920px", (1080 + original_height_removed) + "px", true);
                break;
            }
          };
        })(sb, original_width, original_height, original_height_removed));
      }
    }
    console.log("YTCenter: Adding player shortcuts to document");
    document.addEventListener("keydown", function(e){
      e = e || window.event;
      if (ytcenter.settings.enableShortcuts) {
        if (document.activeElement.tagName.toLowerCase() === "input" || document.activeElement.tagName.toLowerCase() === "textarea" || document.activeElement.tagName.toLowerCase() === "object" || document.activeElement.tagName.toLowerCase() === "embed" || document.activeElement.tagName.toLowerCase() === "button") return;
        var player = yt.getConfig("PLAYER_REFERENCE");
        switch (e.keyCode) {
          case 32: // Space
            if (player.getPlayerState() == 1) {
              player.pauseVideo();
            } else {
              player.playVideo();
            }
            break;
          case 37: // Left Arrow
            player.seekTo(player.getCurrentTime()-10, true);
            break;
          case 39: // Right Arrow
            player.seekTo(player.getCurrentTime()+10, true);
            break;
          case 35: // End
            player.seekTo(player.getDuration(), true);
            break;
          case 36: // Home
            player.seekTo(0, true);
            break;
          case 48: // 0
            player.seekTo(0, true);
            break;
          case 49: // 1
            player.seekTo(0.1*player.getDuration(), true);
            break;
          case 50: // 2
            player.seekTo(0.2*player.getDuration(), true);
            break;
          case 51: // 3
            player.seekTo(0.3*player.getDuration(), true);
            break;
          case 52: // 4
            player.seekTo(0.4*player.getDuration(), true);
            break;
          case 53: // 5
            player.seekTo(0.5*player.getDuration(), true);
            break;
          case 54: // 6
            player.seekTo(0.6*player.getDuration(), true);
            break;
          case 55: // 7
            player.seekTo(0.7*player.getDuration(), true);
            break;
          case 56: // 8
            player.seekTo(0.8*player.getDuration(), true);
            break;
          case 57: // 9
            player.seekTo(0.9*player.getDuration(), true);
            break;
          default:
            return;
        }
        e.preventDefault();
      }
    }, false);
    console.log("YTCenter: Updating YouTube Player");
    ytcenter.player.update(function(playerid, player, listener){
      console.log("YTCenter: YouTube Player Loaded");
      if (ytcenter.watch7 && !ytcenter.html5) {
        player.target.children[0].style.zIndex = "102";
      } else {
        player.target.style.zIndex = "102";
      }
      if (this.getVolume() != ytcenter.settings.volume && ytcenter.settings.enableVolume) {
        if (ytcenter.settings.volume < 0) {
          ytcenter.settings.volume = 0;
        } else if (ytcenter.settings.volume > 100) {
          ytcenter.settings.volume = 100;
        }
        this.setVolume(ytcenter.settings.volume);
      }
      if (ytcenter.settings.mute && !this.isMuted()) {
        this.mute();
      } else if (!ytcenter.settings.mute && this.isMuted()) {
        this.unMute();
      }
      if (this.getPlaybackQuality() != yt.playerConfig.args.vq) {
        this.setPlaybackQuality(yt.playerConfig.args.vq);
        listener.addEventListener("onStateChange", (function(self){
          var _applied = false;
          return function(state){
            if (state > -1) {
              if (!_applied) {
                self.setPlaybackQuality(yt.playerConfig.args.vq);
                _applied = true;
              }
            }
          };
        })(this));
      }
      if (ytcenter.html5 && (ytcenter.settings.preventAutoPlay || ytcenter.settings.preventAutoBuffer)) {
        if (ytcenter.settings.preventAutoBuffer) {
          this.stopVideo();
        } else if (ytcenter.settings.preventAutoPlay) {
          this.pauseVideo();
        }
        listener.addEventListener("onStateChange", (function(){
          var _applied = false;
          return function(state){
            if (state == 1 && !_applied) {
              if (ytcenter.settings.preventAutoBuffer) {
                player.api.stopVideo();
              } else if (ytcenter.settings.preventAutoPlay) {
                player.api.pauseVideo();
              }
              _applied = true;
            }
          };
        })());
      } else if (!ytcenter.html5 && ytcenter.settings.preventAutoPlay && !ytcenter.settings.preventAutoBuffer) {
        this.mute();
        this.pauseVideo();
        if (!ytcenter.settings.mute) {
          this.unMute();
        }
        listener.addEventListener("onStateChange", (function(){
          var _applied = false;
          return function(state){
            if (state == 2 && !_applied) {
              _applied = true;
            }
            if (state == 1 && !_applied) {
              this.mute();
              this.pauseVideo();
              if (!ytcenter.settings.mute) {
                this.unMute();
              }
              _applied = true;
            }
          };
        })());
      }
      
      listener.addEventListener("onStateChange", (function(player){
        return function(state){
          if (state == 0 && ytcenter.doRepeat && ytcenter.settings.enableRepeat) {
            player.playVideo();
          }
        };
      })(this));
      
    });

    if (ytcenter.settings.scrollToPlayer) {
      if (ytcenter.settings.playersize != 'fill') {
        (document.getElementById("watch-headline-container") || document.getElementById("content")).scrollIntoView(true);
      } else {
        (document.getElementById("watch-video") || document.getElementById("watch7-video")).scrollIntoView(true);
      }
    }
    if (ytcenter.settings.expandDescription) {
      $RemoveCSS(document.getElementById("watch-description"), "yt-uix-expander-collapsed");
    }
    if (ytcenter.settings.removeAdvertisements) {
      var vextra = document.getElementById("watch-video-extra");
      if (vextra) {
        $AddCSS(vextra, "hid");
      }
      var vcontent = document.getElementById("content");
      if (vcontent) {
        vcontent.setAttribute("style", "background:!important;");
      }
    }
    $CreateSettingsUI();
    $CreateDownloadButton();
    $CreateRepeatButton();
    $CreateLightButton();
    
    console.log("YTCenter: Placement System Init");
    if (!ytcenter.watch7) {
      ytcenter.placementsystem.init([
        {
          id: 'watch-actions',
          elements: [
            {
              tagname: 'button',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button") && elm == e;
              },
              style: {
                margin: '0px 2px 0px 0px'
              },
              classNames: []
            }, {
              tagname: 'span',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button") && elm == e;
              },
              style: {
                margin: '0px 2px 0px 0px'
              },
              classNames: []
            }, {
              tagname: 'button',
              classNames: ['yt-uix-tooltip-reverse']
            }
          ]
        }, {
          id: 'watch-headline-user-info',
          elements: [
            {
              tagname: 'button',
              condition: function(elm, e, parent) {
                return elm == e && elm.previousElementSibling != null;
              },
              style: {
                marginLeft: '5px'
              },
              classNames: []
            }, {
              tagname: 'button',
              condition: function(elm, e, parent) {
                return elm == e && elm.previousElementSibling == null;
              },
              style: {
                marginLeft: '0'
              },
              classNames: []
            }, {
              tagname: 'span',
              condition: function(elm, e, parent) {
                return elm == e && elm.previousElementSibling != null;
              },
              style: {
                marginLeft: '5px'
              },
              classNames: []
            }
          ]
        }, {
          id: 'watch-headline-title',
          elements: []
        }/*, {
          id: 'watch7-sentiment-actions',
          elements: [
            {
              tagname: 'button',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button") && elm == e;
              },
              style: {
                margin: '0px 2px 0px 0px'
              },
              classNames: []
            }, {
              tagname: 'span',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button") && elm == e;
              },
              style: {
                margin: '0px 2px 0px 0px'
              },
              classNames: []
            }, {
              tagname: 'button',
              classNames: ['yt-uix-tooltip-reverse']
            }
          ]
        }*/
      ], ["watch-actions-right"]);
    }
    console.log("YTCenter: Registering Native Elements");
    ytcenter.placementsystem.registerNativeElements();
    console.log("YTCenter: Arranging Elements");
    ytcenter.placementsystem.arrangeElements();
    console.log(ytcenter);
    $UpdateChecker();
  };
  var dclcaller = function(){
    console.log("YTCenter: Called DOMContentLoaded listener");
    if (loc.href.match(/^http(s)?\:\/\/apiblog\.youtube\.com\//)) {
      return;
    } else if (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/)) {
      console.log("YTCenter: YouTube Watch Page Detected");
      ytwatchinit();
    } else if (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/user\/(.*?)(\/)?$/) || loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/user\/(.*?)\/featured?/)) {
      console.log("YTCenter: YouTube Channel Featured Page Detected");
      ytchannelfeatureinit();
    } else if (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/embed\//)) {
      console.log("YTCenter: YouTube Embed Page Detected");
      console.log("YTCenter: Under Construction");
    } else if (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\//)) {
      console.log("YTCenter: YouTube Page Detected");
      yt = uw.yt;
      console.log(ytcenter);
      ytcenter.loadSettings();
      
      ytcenter.updateLanguage();
      if (ytcenter.settings.removeAdvertisements) {
        var ads = document.getElementById("homepage-sidebar-ads");
        if (ads) {
          ads.style.display = "none";
        }
      }
      $CreateSettingsUI();
      $UpdateChecker();
    }
    console.log("YTCenter: Adding Styles");
    $AddStyle(".ytcenter-fill,.ytcenter-fill #watch-player{width:100%!important;height:100%!important}");
    $AddStyle("div.ytcenter-menu-3d-hide span.ytcenter-menu-item-3d {display:none}");
    $AddStyle(".ytcenter-range{display:inline-block;cursor:default;position:relative;border:1px solid;outline:0;white-space:nowrap;word-wrap:normal;vertical-align:middle;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;border-color:#CCC #CCC #AAA;background:white;padding:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.ytcenter-range a.ytcenter-range-handle{position:absolute;top:-1px;left:0px;outline:none;margin-left:-.5em;cursor:default;padding:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}");
  };
  console.log("YTCenter: ReadyState: " + document.readyState);
  if (document.readyState == "complete" || document.readySate == "loaded" || document.readyState == "interactive") {
    console.log("YTCenter: Calling DOMContentLoaded function");
    dclcaller();
  } else {
    console.log("YTCenter: Adding DOMContentLoaded listener");
    document.addEventListener("DOMContentLoaded", function(){
      dclcaller();
    }, true);
  }
  if (loc.href.match(/^(http|https):\/\/dl\.dropbox\.com\/u\/13162258\/YouTube%20Center\/install/)) {
    console.log("YTCenter: Detected Install Page");
    uw['ytcenter'] = {
      installed: true,
      version: ytcenter.version,
      revision: ytcenter.revision
    };
  }

  console.log("YTCenter: At Scope End");
})();

