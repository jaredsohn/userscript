// ==UserScript==
// @name            Thêm tính năng cho Youtube
// @namespace       http://www.facebook.com/YouTubeCenter
// @version         1.30.21
// @author          Jeppe Rune Mortensen (YePpHa)
// @description     Tự động thay đổi chất lượng, bật tắt đèn, thêm Lặp lại.
// @match           http://*.youtube.com/*
// @match           https://*.youtube.com/*
// @match           http://userscripts.org/scripts/source/139603.meta.js
// @include         http://*.youtube.com/*
// @include         https://*.youtube.com/*
// @exclude         http://apiblog.youtube.com/*
// @exclude         https://apiblog.youtube.com/*
// @downloadURL     http://userscripts.org/scripts/source/139603.user.js
// @updateURL       http://userscripts.org/scripts/source/139603.meta.js
// @updateVersion   96
// @run-at          document-start
// ==/UserScript==
/** Có những thay đổi sau
  * Tính tính năng chặn tự động tải hoặc tự động mở video
  * Thêm nút lặp lại và chọn lặp 1 đoạn.
  * Thêm tên tệp, 1 dạng xem trước và hướng dẫn.
  * Các định dạng download được sắp xếp trong Menu Download.
  * Ưu tiên Download Format (MP4, WebM, flv, 3gp).
  * Ưu tiên in Download Menu (MP4, WebM, flv, 3gp).
  * Thao tác với các nút: thay đổi kích cỡ hoặc tạo 1 nút theo ý muốn
  * SERVER/CLIENT: Tạo thông tin video trong video file.
  * EXPERIMENTAL: Vị trí hệ thống IN-WORK (đang trong giai đoạn thử nghiệm)
  * ...
 **/
(function(){
  "use strict"
  
  /* UTILS */
  function $SaveData(key, value) {
    if (typeof GM_getValue != "undefined" && (typeof GM_getValue.toString == "undefined" || GM_getValue.toString().indexOf("not supported") == -1)) {
      con.log("YTCenter: Saving " + key + " using GM_setValue");
      GM_setValue(key, value);
    } else if (typeof localStorage != "undefined") {
      con.log("YTCenter: Saving " + key + " using localStorage");
      localStorage[key] = value;
    } else if (typeof uw.localStorage != "undefined") {
      con.log("YTCenter: Saving " + key + " using uw.localStorage");
      uw.localStorage[key] = value;
    } else if (typeof document.cookie != "undefined") {
      con.log("YTCenter: Saving " + key + " using document.cookie");
      var date = new Date();
      date.setTime(date.getTime() + (1000*24*60*60*1000));
      var expires = "; expires=" + date.toGMTString();
      document.cookie = key + "=" + value + expires + "; path=/";
    } else {
      con.error("YTCenter: Couldn't save data!");
      return false;
    }
    return true;
  }

  function $LoadData(key, def) {
    if (typeof GM_getValue != "undefined" && (typeof GM_getValue.toString == "undefined" || GM_getValue.toString().indexOf("not supported") == -1)) {
      con.log("YTCenter: Loading " + key + " using GM_getValue");
      return GM_getValue(key, def);
    } else if (typeof localStorage != "undefined") {
      con.log("YTCenter: Loading " + key + " using localStorage");
      return localStorage[key] || def;
    } else if (typeof uw.localStorage != "undefined") {
      con.log("YTCenter: Loading " + key + " using uw.localStorage");
      return uw.localStorage[key] || def;
    } else if (typeof document.cookie != "undefined") {
      con.log("YTCenter: Loading " + key + " using document.cookie");
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
      con.error("YTCenter: Couldn't save data!");
      return null;
    }
  }
  function $UpdateChecker() {
    if (!ytcenter.settings.enableUpdateChecker) return;
    var curr = (new Date().getTime());
    var c = curr - 1000*60*60*parseInt(ytcenter.settings.updateCheckerInterval);
    con.log("YTCenter: Checking for updates in " + ((ytcenter.settings.updateCheckerLastUpdate - c)/1000/60/60) + " hours...");
    if (c >= ytcenter.settings.updateCheckerLastUpdate) {
      con.log("YTCenter: Checking for updates now...");
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
  
  function $CreateAspectButton() {
    var btn = document.createElement("button");
    btn.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip" + (ytcenter.settings.aspectEnable ? "" : " hid");
    btn.setAttribute("title", ytcenter.locale.BUTTON_ASPECT_TOOLTIP);
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "button");
    ytcenter.database.codeRegister(btn, function(){
      this.setAttribute("title", ytcenter.locale.BUTTON_ASPECT_TOOLTIP);
      if (ytcenter.settings.aspectEnable) {
        $RemoveCSS(this, "hid");
      } else {
        $AddCSS(this, "hid");
      }
    });
    
    var btnContent = document.createElement("span");
    btnContent.className = "yt-uix-button-content";
    btnContent.textContent = ytcenter.locale.BUTTON_ASPECT_TEXT;
    ytcenter.database.register(btnContent, 'BUTTON_ASPECT_TEXT', 'text');
    
    btn.appendChild(btnContent);
    
    var arrow = document.createElement("img");
    arrow.className = "yt-uix-button-arrow";
    arrow.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
    arrow.alt = "";
    
    btn.appendChild(arrow);
    
    var groups = {
      'crop': 'BUTTON_ASPECT_CROP',
      'stretch': 'BUTTON_ASPECT_STRETCH'
    };
    
    var groupChoices = {
      '4:3': 'BUTTON_ASPECT_4:3',
      '16:9': 'BUTTON_ASPECT_16:9'
    };
    
    var menu = document.createElement("div");
    menu.className = "yt-uix-button-menu hid";
    menu.style.zIndex = "999";
    var playerAspectTMP = ytcenter.settings['aspectValue'];
    var item;
    
    item = document.createElement("span");
    if ("none" === ytcenter.settings.aspectValue) {
      item.setAttribute("style", "background:#555!important;color:#FFF!important;");
    }
    item.className = "yt-uix-button-menu-item";
    item.setAttribute("onclick", ";return false;");
    item.textContent = ytcenter.locale['BUTTON_ASPECT_NONE'];
    ytcenter.database.register(item, 'BUTTON_ASPECT_NONE', 'text');
    item.addEventListener("click", function(){
      playerAspectTMP = "none";
      if (ytcenter.settings.aspectSave) {
        ytcenter.settings['aspectValue'] = "none";
      }
      for (var i = 0; i < this.parentNode.children.length; i++) {
        if (this.parentNode.children[i].tagName === "SPAN") {
          this.parentNode.children[i].setAttribute("style", "");
        }
      }
      this.setAttribute("style", "background:#555!important;color:#FFF!important;");
      ytcenter.saveSettings();
      ytcenter.player.aspect("none");
    }, false);
    ytcenter.database.register(item, 'BUTTON_ASPECT_NONE', '@text');

    menu.appendChild(item);
    
    for (var group in groups) {
      if (groups.hasOwnProperty(group)) {
        item = document.createElement("div");
        item.style.fontWeight = "bold";
        item.style.padding = "6px";
        item.textContent = ytcenter.locale[groups[group]];
        ytcenter.database.register(item, groups[group], 'text');
        menu.appendChild(item);
        for (var child in groupChoices) {
          if (groupChoices.hasOwnProperty(child)) {
            if (child === "4:3" && group === "crop") continue;
            var val = "yt:" + group + "=" + child;
            item = document.createElement("span");
            if (val === ytcenter.settings.aspectValue) {
              item.setAttribute("style", "background:#555!important;color:#FFF!important;");
            }
            item.className = "yt-uix-button-menu-item";
            item.setAttribute("onclick", ";return false;");
            item.textContent = ytcenter.locale[groupChoices[child]];
            ytcenter.database.register(item, groupChoices[child], 'text');
            item.addEventListener("click", (function(val, group, child){
              return function(){
                var val = "yt:" + group + "=" + child;
                playerAspectTMP = val;
                if (ytcenter.settings.aspectSave) {
                  ytcenter.settings['aspectValue'] = val;
                }
                for (var i = 0; i < this.parentNode.children.length; i++) {
                  if (this.parentNode.children[i].tagName === "SPAN") {
                    this.parentNode.children[i].setAttribute("style", "");
                  }
                }
                this.setAttribute("style", "background:#555!important;color:#FFF!important;");
                ytcenter.saveSettings();
                ytcenter.player.aspect(val);
              };
            })(val, group, child), false);
            ytcenter.database.register(item, groupChoices[child], '@text');
            menu.appendChild(item);
          }
        }
      }
    }
    
    item = document.createElement("div");
    item.style.padding = "7px 9px 0 9px";
    item.style.borderTop = "1px #555 solid";
    var itemLabel = document.createElement("label");
    var label = document.createTextNode(ytcenter.locale.SETTINGS_ASPECT_REMEMBER);
    itemLabel.appendChild(label);
    ytcenter.database.register(label, 'SETTINGS_ASPECT_REMEMBER', 'text');
    
    var itemCheckbox = $CreateCheckbox(ytcenter.settings.aspectSave);
    itemCheckbox.style.marginLeft = "3px";
    
    itemLabel.addEventListener("click", function(){
      ytcenter.settings.aspectSave = !ytcenter.settings.aspectSave;
      if (ytcenter.settings.aspectSave) {
        $AddCSS(itemCheckbox, "checked");
        ytcenter.settings.aspectValue = playerAspectTMP;
      } else {
        $RemoveCSS(itemCheckbox, "checked");
      }
      ytcenter.saveSettings();
    }, false);
    
    
    itemLabel.appendChild(itemCheckbox);
    
    item.appendChild(itemLabel);
    
    menu.appendChild(item);
    
    
    btn.appendChild(menu);
    
    ytcenter.placementsystem.registerElement(btn, "@aspectbtn");
  }
  
  function $CreateResizeButton() {
    var options = {
      'small': 'SETTINGS_PLAYERSIZE_LIST_SMALL',
      'large': 'SETTINGS_PLAYERSIZE_LIST_LARGE',
      'content': 'SETTINGS_PLAYERSIZE_LIST_CONTENT',
      'fill': 'SETTINGS_PLAYERSIZE_LIST_FILL',
      '1.5x': 'SETTINGS_PLAYERSIZE_LIST_15X',
      '2x': 'SETTINGS_PLAYERSIZE_LIST_2X',
      '2.5x': 'SETTINGS_PLAYERSIZE_LIST_25X',
      '3x': 'SETTINGS_PLAYERSIZE_LIST_3X',
      '360p': 'SETTINGS_PLAYERSIZE_LIST_360P',
      '480p': 'SETTINGS_PLAYERSIZE_LIST_480P',
      '720p': 'SETTINGS_PLAYERSIZE_LIST_720P',
      '1080p': 'SETTINGS_PLAYERSIZE_LIST_1080P'
    };

    var btn = document.createElement("button");
    btn.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip" + (ytcenter.settings.resizeEnable ? "" : " hid");
    btn.setAttribute("title", ytcenter.locale.BUTTON_RESIZE_TOOLTIP);
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "button");
    ytcenter.database.codeRegister(btn, function(){
      this.setAttribute("title", ytcenter.locale.BUTTON_RESIZE_TOOLTIP);
      if (ytcenter.settings.resizeEnable) {
        $RemoveCSS(this, "hid");
      } else {
        $AddCSS(this, "hid");
      }
    });
    
    var btnContent = document.createElement("span");
    btnContent.className = "yt-uix-button-content";
    btnContent.textContent = ytcenter.locale.BUTTON_RESIZE_TEXT;
    ytcenter.database.register(btnContent, 'BUTTON_RESIZE_TEXT', 'text');
    
    btn.appendChild(btnContent);
    
    var arrow = document.createElement("img");
    arrow.className = "yt-uix-button-arrow";
    arrow.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
    arrow.alt = "";
    
    btn.appendChild(arrow);
    
    var menu = document.createElement("div");
    menu.className = "yt-uix-button-menu hid";
    menu.style.zIndex = "999";
    var playerSizeTMP = ytcenter.settings['playersize'];
    var item;
    for (var value in options) {
      if (options.hasOwnProperty(value)) {
        item = document.createElement("span");
        if (value === ytcenter.settings.playersize) {
          item.setAttribute("style", "background:#555!important;color:#FFF!important;");
        }
        item.className = "yt-uix-button-menu-item";
        item.setAttribute("onclick", ";return false;");
        item.textContent = ytcenter.locale[options[value]];
        ytcenter.database.register(item, options[value], 'text');
        item.addEventListener("click", (function(val){
          return function(){
            playerSizeTMP = val;
            if (ytcenter.settings.resizeSave) {
              ytcenter.settings['playersize'] = val;
            }
            for (var i = 0; i < this.parentNode.children.length; i++) {
              if (this.parentNode.children[i].tagName === "SPAN") {
                this.parentNode.children[i].setAttribute("style", "");
              }
            }
            this.setAttribute("style", "background:#555!important;color:#FFF!important;");
            ytcenter.player.resize(val);
            ytcenter.saveSettings();
          };
        })(value), false);
        ytcenter.database.register(item, options[value], '@text');

        menu.appendChild(item);
      }
    }
    
    item = document.createElement("div");
    item.style.padding = "7px 9px 0 9px";
    item.style.borderTop = "1px #555 solid";
    var itemLabel = document.createElement("label");
    var label = document.createTextNode(ytcenter.locale.SETTINGS_RESIZE_REMEMBER);
    itemLabel.appendChild(label);
    ytcenter.database.register(label, 'SETTINGS_RESIZE_REMEMBER', 'text');
    
    var itemCheckbox = $CreateCheckbox(ytcenter.settings.resizeSave);
    itemCheckbox.style.marginLeft = "3px";
    
    itemLabel.addEventListener("click", function(){
      ytcenter.settings.resizeSave = !ytcenter.settings.resizeSave;
      if (ytcenter.settings.resizeSave) {
        $AddCSS(itemCheckbox, "checked");
        ytcenter.settings.playersize = playerSizeTMP;
      } else {
        $RemoveCSS(itemCheckbox, "checked");
      }
      ytcenter.saveSettings();
    }, false);
    
    itemLabel.appendChild(itemCheckbox);
    
    item.appendChild(itemLabel);
    
    menu.appendChild(item);
    
    
    btn.appendChild(menu);
    
    ytcenter.placementsystem.registerElement(btn, "@resizebtn");
  }
  
  function $CreateCheckbox(_checked) {
    var checked = _checked || false;
    var cont = document.createElement("span");
    con.log("YTCenter: Is checked: " + checked + " (" + (checked ? " checked" : "") + ")");
    cont.className = "yt-uix-form-input-checkbox-container" + (checked ? " checked" : "");
    
    var inp = document.createElement("input");
    inp.type = "checkbox";
    inp.className = "yt-uix-form-input-checkbox";
    inp.value = "true";
    if (checked) {
      inp.checked = "checked";
    }
    
    var span = document.createElement("span");
    span.className = "yt-uix-form-input-checkbox-element";
    
    cont.appendChild(inp);
    cont.appendChild(span);
    
    return cont;
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
    
    var stream = $DownloadButtonStream();
    
    var btn1a = document.createElement((ytcenter.settings.downloadAsLinks ? "a" : "span"));
    if (stream) {
      btn1a.setAttribute("href", ytcenter.video.downloadLink(stream));
    }
    btn1a.setAttribute("target", "_blank");
    ytcenter.database.codeRegister(btn1a, function(){
      stream = $DownloadButtonStream();
      if (stream == null) {
        btn1a.href = ytcenter.video.downloadLink(stream);
      }
      
      var changeTagName = false;
      if (ytcenter.settings.downloadAsLinks) {
        if (btn1a.nodeName !== "A") {
          changeTagName = true;
        }
      } else {
        if (btn1a.nodeName !== "SPAN") {
          changeTagName = true;
        }
      }
      
      if (changeTagName) {
        var nElement = document.createElement((ytcenter.settings.downloadAsLinks ? "a" : "span"));
        for (var i = 0; i < btn1a.attributes.length; i++) {
          nElement.setAttribute(btn1a.attributes[i].name, btn1a.attributes[i].value);
        }
        
        while (btn1a.childNodes.length > 0) {
          var child = btn1a.childNodes[0];
          child.parentNode.removeChild(child);
          nElement.appendChild(child);
        }
        btn1a.parentNode.insertBefore(nElement, btn1a);
        btn1a.parentNode.removeChild(btn1a);
        
        btn1a = nElement;
      }
    });
    
    var btn1 = document.createElement("button");
    btn1.className = "start yt-uix-button yt-uix-button-default yt-uix-tooltip";
    //btn1.setAttribute("onclick", ";return false;");
    btn1.setAttribute("type", "button");
    btn1.setAttribute("role", "button");
    btn1.addEventListener("click", function(e){
      if (!ytcenter.settings.downloadAsLinks) {
        var stream = $DownloadButtonStream();
        if (stream != null) {
          ytcenter.video.download(stream.itag);
        }
        e.preventDefault();
      }
    }, false);
    
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
    btn1a.appendChild(btn1);
    var btn1_text = document.createElement("span");
    btn1_text.className = "yt-uix-button-content";
    btn1_text.textContent = ytcenter.locale['BUTTON_DOWNLOAD_TEXT'];
    ytcenter.database.register(btn1_text, 'BUTTON_DOWNLOAD_TEXT', 'text');
    btn1.appendChild(btn1_text);
    g.appendChild(btn1a);
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
    menu.style.zIndex = "999";
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
          var item = document.createElement((ytcenter.settings.downloadAsLinks ? "a" : "span"));
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
            item.setAttribute("target", "_blank");
            item.setAttribute("href", ytcenter.video.downloadLink(stream_groups[key][i]));
            var downloadStreamListener = (function(_stream){
              return function(){
                if (!ytcenter.settings.downloadAsLinks) {
                  ytcenter.video.download(_stream.itag);
                }
              };
            })(stream_groups[key][i]);
            item.addEventListener("click", downloadStreamListener, false);
            ytcenter.database.codeRegister(item, (function(__stream, item, _downloadStreamListener){
              return function(){
                item.href = ytcenter.video.downloadLink(__stream);
                
                var changeTagName = false;
                if (ytcenter.settings.downloadAsLinks) {
                  if (item.nodeName !== "A") {
                    changeTagName = true;
                  }
                } else {
                  if (item.nodeName !== "SPAN") {
                    changeTagName = true;
                  }
                }
                
                if (changeTagName) {
                  var nElement = document.createElement((ytcenter.settings.downloadAsLinks ? "a" : "span"));
                  for (var i = 0; i < item.attributes.length; i++) {
                    nElement.setAttribute(item.attributes[i].name, item.attributes[i].value);
                  }
                  nElement.addEventListener("click", _downloadStreamListener, false);
                  
                  while (item.childNodes.length > 0) {
                    var child = item.childNodes[0];
                    child.parentNode.removeChild(child);
                    nElement.appendChild(child);
                  }
                  item.parentNode.insertBefore(nElement, item);
                  item.parentNode.removeChild(item);
                  item = nElement;
                }
              };
            })(stream_groups[key][i], item, downloadStreamListener));
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
    if (ytcenter.settings.mp3Services === '') {
      mp3title.style.display = "none";
    }
    mp3title.style.color = "#666";
    mp3title.style.fontSize = "0.9166em";
    mp3title.style.paddingLeft = "9px";
    mp3title.textContent = ytcenter.locale['BUTTON_DOWNLOAD_MENU_MP3SERVICES'];
    ytcenter.database.register(mp3title, 'BUTTON_DOWNLOAD_MENU_MP3SERVICES', 'text');
    ytcenter.database.codeRegister(mp3title, function(){
      if (ytcenter.settings.mp3Services === '') {
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
      var item = document.createElement((ytcenter.settings.downloadAsLinks ? "a" : "span"));
      item.className = "yt-uix-button-menu-item" + (hasMP3Service(ytcenter.mp3services[i].value) ? "" : " hid");
      if (!hasMP3Service(ytcenter.mp3services[i].value)) {
        item.style.display = "none";
      }
      item.setAttribute("href", ytcenter.mp3services[i].value);
      item.setAttribute("target", "_blank");
      var mp3RedirectListener = (function(mp3){
        return function(){
          if (!ytcenter.settings.downloadAsLinks) {
            ytcenter.redirect(mp3.value, true);
          }
        };
      })(ytcenter.mp3services[i]);
      item.addEventListener("click", mp3RedirectListener, false);
      
      ytcenter.database.codeRegister(item, (function(mp3, item){
        return function(){
          item.href = mp3.value;
          
          var a = ytcenter.settings.mp3Services.split("&");
          var f = false;
          for (var i = 0; i < a.length; i++) {
            if (decodeURIComponent(a[i]) === mp3.value) {
              f = true;
              break;
            }
          }
          if (f) {
            $RemoveCSS(item, 'hid');
            item.style.display = "";
          } else {
            $AddCSS(item, 'hid');
            item.style.display = "none";
          }
          
          var changeTagName = false;
          if (ytcenter.settings.downloadAsLinks) {
            if (item.nodeName !== "A") {
              changeTagName = true;
            }
          } else {
            if (item.nodeName !== "SPAN") {
              changeTagName = true;
            }
          }
          
          if (changeTagName) {
            var nElement = document.createElement((ytcenter.settings.downloadAsLinks ? "a" : "span"));
            for (var i = 0; i < item.attributes.length; i++) {
              nElement.setAttribute(item.attributes[i].name, item.attributes[i].value);
            }
            nElement.addEventListener("click", mp3RedirectListener, false);
            
            while (item.childNodes.length > 0) {
              var child = item.childNodes[0];
              child.parentNode.removeChild(child);
              nElement.appendChild(child);
            }
            item.parentNode.insertBefore(nElement, item);
            item.parentNode.removeChild(item);
            item = nElement;
          }
        };
      })(ytcenter.mp3services[i], item));
      
      item.textContent = ytcenter.locale[ytcenter.mp3services[i].label];
      ytcenter.database.register(item, ytcenter.mp3services[i].label, 'text');
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
    } else if (ytcenter.watch7 && document.getElementById("page-container")) {
      document.getElementById("page-container").parentNode.insertBefore(container, document.getElementById("page-container"));
    }
    //document.getElementById("masthead").nextElementSibling

    //document.getElementById("watch-actions-area").appendChild(container);
    
    
    var account_button = document.getElementById("masthead-user-button");
    
    var btn = document.createElement("button");
    btn.id = "masthead-user-button";
    /*btn.style.padding = "0 5px 0 2px";
    btn.style.height = "33px";*/
    if (document.getElementById("masthead-gaia-photo-expander")) {
      btn.style.marginTop = "3px";
    } else if (document.getElementById("masthead-user-expander")) {
      btn.style.verticalAlign = "middle";
    }
    btn.title = ytcenter.locale['BUTTON_SETTINGS_TITLE'];
    ytcenter.database.register(btn, 'BUTTON_SETTINGS_TITLE', '@title');
    btn.type = "button";
    btn.setAttribute("role", "button");
    btn.setAttribute("onclick", ";return false;");
    btn.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-text yt-uix-tooltip";
    var btnt = document.createElement("span");
    btnt.className = "yt-uix-button-icon-wrapper";
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
    
    var ytvt = document.createElement("span");
    ytvt.className = "yt-valign-trick";
    
    btnt.appendChild(gearicon);
    btnt.appendChild(ytvt);
    btn.appendChild(btnt);
    
    var ytuixbc = document.createElement("span");
    ytuixbc.className = "yt-uix-button-content";
    ytuixbc.textContent = "  ";
    
    btn.appendChild(ytuixbc);
    
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
    var msthdsr = document.getElementById("masthead-user") || document.getElementById("yt-masthead-user");
    if (msthdsr) {
      msthdsr.appendChild(btn);
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
        
        var defaultLabel;
        var s = document.createElement("select");
        s.className = "yt-uix-form-input-select-element";
        s.style.cursor = "pointer";
        if (recipe.advlist) {
          recipe.list = recipe.advlist();
        }
        if (recipe.list) {
          var defaultLabelText = ytcenter.locale[recipe.list[0].label];
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
          sc2.textContent = defaultLabelText;
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
                  con.log("Checked: " + m.value);
                  if ($ArrayIndexOf(a, m.value) == -1) {
                    a.push(m.value);
                    con.log("Add");
                    con.log(a);
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
                con.log("None");
                con.log(a);
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
    var copy;
    if (null == obj || typeof obj != "object") {
      return obj;
    }
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0; i < obj.length; i++) {
        copy[i] = $Clone(obj[i]);
      }
      return copy;
    }
    if (obj instanceof Object) {
      copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = $Clone(obj[key]);
        }
      }
      return copy;
    }
    return null;
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
    return true;
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
      var a;
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
          max = range.elm.clientWidth - range.handle.offsetWidth;
          a = range.max - range.min;
          range.listeners[i].c(parseFloat(range.handle.style.left)/max*a+range.min);
        } else if (range.listeners[i].e === 'change') {
          max = range.elm.clientWidth - range.handle.offsetWidth;
          a = range.max - range.min;
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
      con.log("YTCenter: Using GM_xmlhttpRequest");
      GM_xmlhttpRequest(details);
      return true;
    } else {
      var xmlhttp;
      if (typeof XMLHttpRequest != "undefined") {
        con.log("YTCenter: Using XMLHttpRequest");
        xmlhttp = new XMLHttpRequest();
      } else if (typeof opera != "undefined" && typeof opera.XMLHttpRequest != "undefined") {
        con.log("YTCenter: Using opera.XMLHttpRequest");
        xmlhttp = new opera.XMLHttpRequest();
      } else if (typeof uw != "undefined" && typeof uw.XMLHttpRequest != "undefined") {
        con.log("YTCenter: Using uw.XMLHttpRequest");
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
        return false;
      }
      if (details.headers) {
        for (var prop in details.headers) {
          xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
      }
      xmlhttp.send((typeof(details.data) != 'undefined') ? details.data : null);
      return true
    }
    return false;
  }
  
  function $AddStyle(styles) {
    if(typeof GM_addStyle != "undefined") {
      con.log("YTCenter: Using GM_addStyle");
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
  
  var console_debug = true; // Disable this to stop YouTube Center from writing in the console log.
  var _console = {};
  
  var uw, loc, div, con;
  if (window && window.navigator && window.navigator.vendor && window.navigator.vendor.match(/Google|Maxthon/)) {
    div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    uw = div.onclick();
  } else if (typeof unsafeWindow != "undefined") {
    uw = unsafeWindow;
  } else {
    div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    uw = div.onclick();
    if (typeof uw == "undefined") {
      uw = window;
    }
  }
  if (typeof console !== "undefined" && typeof console.log !== "undefined") {
    con = {};
    for (var key in console) {
      if (typeof console[key] === "function") {
        con[key] = (function(key){
          return function(){
            if (!_console.hasOwnProperty(key)) {
              _console[key] = [];
            }
            _console[key].push(arguments);
            if (console_debug && console[key].apply) {
              return console[key].apply(console, arguments)
            } else if (console_debug) {
              return console[key](arguments[0]);
            }
          };
        })(key);
      }
    }
  } else if (typeof uw.console !== "undefined" && typeof uw.console.log !== "undefined") {
    con = {};
    for (var key in uw.console) {
      if (typeof uw.console[key] === "function") {
        con[key] = (function(key){
          return function(){
            if (!_console.hasOwnProperty(key)) {
              _console[key] = [];
            }
            _console[key].push(arguments);
            if (console_debug && uw.console[key].apply) {
              return uw.console[key].apply(uw.console, arguments);
            } else if (console_debug) {
              return uw.console[key](arguments[0]);
            }
          };
        })(key);
      }
    }
  } else {
    con = {};
    for (var key in console) {
      if (typeof console[key] === "function") {
        con[key] = (function(key){
          return function(msg){
            if (!_console.hasOwnProperty(key)) {
              _console[key] = [];
            }
            _console[key].push(arguments);
            if (console_debug && GM_log.apply) {
              return GM_log.apply(this, arguments);
            } else {
              return GM_log(arguments[0]);
            }
          };
        })(key);
      }
    }
  }
  if (typeof location != "undefined") {
    loc = location;
  } else {
    loc = uw.location;
  }
  if (!(new RegExp("^(http(s)?://)(((.*\.)?youtube\.com\/.*)|(dl\.dropbox\.com\/u/13162258/YouTube%20Center/(.*))|(userscripts\.org/scripts/source/114002\.meta\.js))$", "")).test(loc.href) || (new RegExp("http(s)?://apiblog\.youtube.com/.*", "")).test(loc.href)) {
    con.log("YTCenter: " + loc.href + " doesn't match!");
    return;
  }
  con.log("YTCenter: In Scope");
  
  
  con.log("YTCenter: Initializing Functions");
  
  var yt;
  var ytcenter = {};
  ytcenter.version = "1.30.21";
  ytcenter.revision = 96;
  ytcenter.icon = {};
  ytcenter.page = "watch";
  con.log("YTCenter: Initializing icons");
  ytcenter.icon.gear = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAFM0aXcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAkFJREFUeNpi+v//P8OqVatcmVavXt3JwMDwGAAAAP//Yvr//z/D////GZhWr179f/Xq1RMBAAAA//9igqr5D8WKTAwQ0MPAwPCEgYGhBwAAAP//TMtBEUBQAAXA9ZsII8IrIIQOBHF5EdwU42TGffcT+/8e2No+MLAmmaDtMnC3PTEnuV4AAAD//zTOQRGCUAAG4YWrCbxSwQzYYDt452AGHCKQ4H9gAYNwcsabMeDyKLD7nY01SZfkn2ROMiV5n80euABf9VoFA3ArpYyt+gEe9bEDW6Uu6rMFUH8VcgdeaqMOAAcZZIiDMBQE0cdv0jQhQREMGDRB9B5Ihssguc2OhHsg4ACoKhQgSIPAbDGsG7GZee/HHhFVRByHPPRPbJ+BGbCxPU5HdQHewBrosvMFXCX1BTgAVQ4ZAXdgZftWgB3/9wRcJC3T8jaRpulgX2zXwAKY51cDXICmSOqTrQNOwEdSK+nxZZJ8VSIKoyD+24uw3CAIYhAEBZNdbK6r0ShM9AH2abRpNwhnwEfQVaPYDQZBk4KIZTX4p8wut33nMMw3Z2a6d/aqqp93W1WvSfm4gxlUVTvzIfYOgF/gy/ZzrF6KjJHtx+i9Bu5st9MeIOkGWAO+o38VuAJOgTdgPUQXwCYwB9DYHof1CegHdChpT9JI0gpwm/0BMAE+bY8bSUNgPil9BHRm+9L2ie0XYDv7+5jXkzScNv4HOAcWMr8Du6nccn5+SB//4tHs5gmwBeyEdRE46hDtS9pIhk084n8AVJscCePQvIsAAAAASUVORK5CYII=";
  ytcenter.icon.lightbulb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAANRJREFUeNqU0rFKBDEUheFvdSpRVmx8EF9EJJXWlj6KCoKCouD2F3wMm+220E6xs1YEZXVsgsTRzLCnSe495+cmJKO2bZVKKTU4wD428YxLnETEvMw2/mqC3aLewCG2sFcGR+XklNI2btS1ExE//lLX1K9ffhceD8DjPng6AE/74AleKuArrqtwRDzhvAJfZL86Ga7w1em1+a31whFxj1mnPYuIu0E46zav805t6IfBMdby8ZdxtAj8jlV8ZvhjEbjBOt6wUsvV7vyI07w/w8N/oe8BAO3xNxGbpir1AAAAAElFTkSuQmCC";
  con.log("YTCenter: Initializing refresh function");
  ytcenter.refreshHomepage = function(){
    if (typeof document.getElementById("masthead-expanded-container") == "undefined") return;
    if (typeof yt != "undefined" && typeof yt.www != "undefined" && typeof yt.www.masthead != "undefined" && typeof yt.www.masthead.toggleExpandedMasthead != "undefined") {
      yt.www.masthead.toggleExpandedMasthead();
      yt.www.masthead.toggleExpandedMasthead();
    }
  };
  con.log("YTCenter: Initializing Placement System");
  ytcenter.placementsystem = (function(){
    var database = [];
    var api = null;
    var sandboxes = [];
    var old_sandboxes = [];
    var settings;
    var setParentData = function(elm, parent){
      var new_sandbox,
          applyParentData;
      new_sandbox = (function(){
        for (var i = 0; i < sandboxes.length; i++) {
          if (sandboxes[i].id == parent) {
            return sandboxes[i];
          }
        }
        return null;
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
    var buttonInSettings = function(sig){
      var bp = settings;
      for (var key in bp) {
        if (bp.hasOwnProperty(key)) {
          for (var i = 0; i < bp[key].length; i++) {
            if (sig === bp[key][i]) {
              return true;
            }
          }
        }
      }
      return false;
    };
    var updateList = function(){
      var bp = settings;
      for (var key in bp) {
        if (bp.hasOwnProperty(key)) {
          for (var i = 0; i < bp[key].length; i++) {
            if (!buttonInSettings(bp[key][i])) {
              if (!settings[key]) {
                settings[key] = [];
              }
              settings[key].push(bp[key][i]);
            }
          }
        }
      }
      ytcenter.saveSettings();
    };
    var rd = {
      init: function(whitelist, blacklist){
        if (ytcenter.watch7) {
          settings = ytcenter.settings.buttonPlacementWatch7;
        } else {
          settings = ytcenter.settings.buttonPlacement
        }
        updateList();
        
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
        if (typeof api != "undefined") {
          api.setEnable(!api.isEnabled());
          return api.isEnabled();
        }
        return false;
      },
      registerElement: function(elm, query){
        con.log("YTCenter: Regisering Element to PlacementSystem: " + query);
        database.push([elm, query, []]);
      },
      registerNativeElements: function(){
        var bp = settings;
        for (var key in bp) {
          if (bp.hasOwnProperty(key)) {
            for (var i = 0; i < bp[key].length; i++) {
              if (bp[key][i].indexOf("@") == 0) continue;
              var ar = bp[key][i].split("&@&");
              try {
                var e = document.evaluate(ar[1], document.getElementById(ar[0]), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                database.push([e, bp[key][i], []]);
              } catch (e) {
                con.log("YTCenter: Couldn't find and register element: " + bp[key][i]);
              }
            }
          }
        }
      },
      getElement: function(query){
        for (var i = 0; i < database.length; i++) {
          if (database[i][1] === query) {
            return database[i][0];
          }
        }
        return null;
      },
      arrangeElements: function(){
        var bp = settings;
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
        for (var key in settings) {
          if (settings.hasOwnProperty(key)) {
            var quit = false;
            for (var i = 0; i < settings[key].length; i++) {
              if (query == settings[key][i]) {
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
        settings[old_parent].splice(old_index, 1);
        if (new_next_sibling == null) {
          settings[new_parent].push(query);
        } else {
          var new_next_sibling_query = (function(){
            for (var i = 0; i < database.length; i++) {
              if (new_next_sibling == database[i][0]) {
                return database[i][1];
              }
            }
          })();
          for (var i = 0; i < settings[new_parent].length; i++) {
            if (settings[new_parent][i] == new_next_sibling_query) {
              settings[new_parent].splice(i, 0, query);
              break;
            }
          }
        }
        
        ytcenter.saveSettings();
      },
      move: function(){
        for (var i = 0; i < database.length; i++) {
          if (database[i][0] == null) continue;
          setParentData(database[i][0], database[i][0].parentNode.id);
        }
      }
    };
    return rd;
  })();
  con.log("YTCenter: Initializing database");
  ytcenter.database = (function(){
    var elements = [];
    var codeElements = [];
    
    var r = {};
    r.register = function(elm, locale, type, replaceDictionary){
      //con.log("YTCenter: Adding element to database");
      elements.push({
        element: elm,
        locale: locale,
        type: (type ? type : "text"),
        replaceDictionary: (replaceDictionary ? replaceDictionary : {})
      });
    };
    r.codeRegister = function(elm, code){
      //con.log("YTCenter: Adding element to code database");
      codeElements.push({
        element: elm,
        code: code
      });
    };
    r.applyLanguage = function(lang){
      con.log("YTCenter: Calling Database/Applying Language");
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
  ytcenter.language = {"en":{"LANGUAGE":"Tiếng việt","LANGUAGE_AUTO":"Tự động chọn","SETTINGS_RESIZE_DEFAULT":"Kích thước player mặc định","SETTINGS_REPEAT_REMEMBER":"Ghi nhớ lặp lại","SETTINGS_RESETSETTINGS_LABEL":"Thiết lập lại toàn bộ cài đặt ","SETTINGS_RESETSETTINGS_TEXT":"Bạn có muốn thiết lập lại toàn bộ cài đặt và tải lại trang","SETTINGS_RESIZE_ENABLE":"Kích hoạt Nút Resize","SETTINGS_RESIZE_REMEMBER":"Nhớ Resize","BUTTON_RESIZE_TOOLTIP":"Resize Player","BUTTON_RESIZE_TEXT":"Resize","SETTINGS_ABOUT_TRANSLATORS_HTML":"<b>Translators:<\/b><br \/>{translators}","SETTINGS_ASPECT_ENABLE":"Kích hoạt Nút Diện mạo","SETTINGS_ASPECT_REMEMBER":"Nhớ diện mạo","SETTINGS_DOWNLOADASLINKS_LABEL":"Tải với đường dẫn","SETTINGS_PLACEMENTSYSTEM_HTML":"<b>Vị trí hệ thống<\/b>","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_INSTRUCTIONS":"Khi nhấn, bạn có thể kéo thả các nút vào các vị trí khác nhau","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL":"Di chuyển các phần tử","SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_ONLYAVAILABLEONVIDEO":"Tính năng chỉ có trên trang video youtube. Tới 1 video bất kỳ để sử dụng tính năng này.","SETTINGS_PLAYERCOLOR_LABEL":"Màu Player","SETTINGS_PLAYERCOLOR_RED":"Đỏ","SETTINGS_PLAYERCOLOR_WHITE":"Trắng","BUTTON_ASPECT_16:9":"16:9","BUTTON_ASPECT_4:3":"4:3","BUTTON_ASPECT_CROP":"Cắt","BUTTON_ASPECT_NONE":"None","BUTTON_ASPECT_STRETCH":"Dãn","BUTTON_ASPECT_TEXT":"Diện mạo","BUTTON_ASPECT_TOOLTIP":"Diện mạo Video","BUTTON_DOWNLOAD_MENU_ITEM_TEXT":"{stream_name}, {stream_resolution} ({stream_dimension}){stream_3d}","BUTTON_DOWNLOAD_MENU_MP3SERVICES":"MP3 Services","BUTTON_DOWNLOAD_TEXT":"Download","BUTTON_DOWNLOAD_TOOLTIP":"Download {stream_name}, {stream_resolution} ({stream_dimension}){stream_3d} {stream_type}","BUTTON_DOWNLOAD_TOOLTIP_NONE":"No available download for {type}","BUTTON_DOWNlOAD2_TOOLTIP":"Download Menu","BUTTON_REPEAT_TEXT":"Repeat","BUTTON_REPEAT_TOOLTIP":"Toggle Repeat","BUTTON_SETTINGS_CONTENT":"Settings","BUTTON_SETTINGS_TITLE":"Toggle YouTube Center Settings Panel","HD1080":"Full High Definition","HD720":"High Definition","HIGHRES":"Original Definition","LARGE":"Enhanced Definition","LIGHTBULB_TOOLTIP":"Turn Light On\/Off","MEDIUM":"Standard Definition","SCROLL_TOOLTIP":"Scroll To Player","SETTINGS_ABOUT_HTML":"<h2>YouTube Center v{version}<\/h2>Copyright ɠ2011 - 2012 Jeppe Rune Mortensen (YePpHa). All Rights Reserved.<br \/><br \/>If you have any problems, complaints, questions or compliments you're welcome to contact me on my email.<br \/>Contact me: <a href=\"mailto:jepperm@gmail.com\">jepperm@gmail.com<\/a>.","SETTINGS_AUTOACTIVATEREPEAT_LABEL":"Auto Activate Repeat","SETTINGS_AUTOEXPANDDESCRIPTION_LABEL":"Auto Expand Description","SETTINGS_AUTOHIDECONTROLBAR_LABEL":"Auto Hide Bar","SETTINGS_AUTOHIDECONTROLBAR_LIST_BOTH":"Both Progressbar & Controlbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_CONTROLBAR":"Only Controlbar","SETTINGS_AUTOHIDECONTROLBAR_LIST_NONE":"None","SETTINGS_AUTOHIDECONTROLBAR_LIST_PROGRESSBAR":"Only Progressbar","SETTINGS_AUTOHIDECONTROLBAR_TOOLTIP":"Doesn't work with the HTML5 player.","SETTINGS_AUTORESOLUTION_LABEL":"Auto Resolution","SETTINGS_DOWNLOADFORMAT_LABEL":"Format","SETTINGS_DOWNLOADFORMAT_LIST_3GP":"3GP","SETTINGS_DOWNLOADFORMAT_LIST_FLV":"FLV","SETTINGS_DOWNLOADFORMAT_LIST_MP4":"MP4","SETTINGS_DOWNLOADFORMAT_LIST_WEBM":"WebM","SETTINGS_DOWNLOADQUALITY_LABEL":"Quality","SETTINGS_ENABLEANNOTATIONS_LABEL":"Enable Annotations","SETTINGS_ENABLEAUTORESOLUTION_LABEL":"Enable Auto Resolution","SETTINGS_ENABLEDOWNLOAD_LABEL":"Enable Download","SETTINGS_ENABLEREPEAT_LABEL":"Enable Repeat","SETTINGS_ENABLESHORTCUTS_LABEL":"Enable Shortcuts on Page","SETTINGS_FILENAME_LABEL":"Filename","SETTINGS_FIXDOWNLOADFILENAME_LABEL":"Remove Non-Alphanumeric Characters","SETTINGS_HD1080":"Full High Definition (1080p)","SETTINGS_HD720":"High Definition (720p)","SETTINGS_HIGHRES":"Original Definition","SETTINGS_LANGUAGE":"Language","SETTINGS_LARGE":"Enhanced Definition (480p)","SETTINGS_LIGHTBULB_COLOR":"Light Color","SETTINGS_LIGHTBULB_ENABLE":"Enable Turn Light On\/Off","SETTINGS_LIGHTBULB_TRANSPARENCY":"Light Transparency","SETTINGS_MEDIUM":"Standard Definition (360p)","SETTINGS_MP3SERVICES_HDDOWNLOADER_128":"HDDownloader.com (128 kb\/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_192":"HDDownloader.com (192 kb\/s)","SETTINGS_MP3SERVICES_HDDOWNLOADER_256":"HDDownloader.com (256 kb\/s)","SETTINGS_MP3SERVICES_LABEL":"MP3 Services","SETTINGS_MP3SERVICES_VIDEO2MP3":"Video2MP3.net","SETTINGS_MP3SERVICES_VIDEO2MP3_HQ":"Video2MP3.net (HQ)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_128":"YouTubeInAudio.com (128 kb\/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_320":"YouTubeInAudio.com (320 kb\/s)","SETTINGS_MP3SERVICES_YOUTUBEINAUDIO_64":"YouTubeInAudio.com (64 kb\/s)","SETTINGS_MP3SERVICES_YOUTUBEMP3":"YouTube-MP3.org","SETTINGS_MP3SERVICES_YOUTUBEMP3PRO":"YoutubeMP3pro.com","SETTINGS_MUTE_LABEL":"Mute","SETTINGS_PLAYERSIZE_LABEL":"Player Size","SETTINGS_PLAYERSIZE_LIST_1080P":"1080p (16:9)","SETTINGS_PLAYERSIZE_LIST_15X":"1.5x","SETTINGS_PLAYERSIZE_LIST_25X":"2.5x","SETTINGS_PLAYERSIZE_LIST_2X":"2x","SETTINGS_PLAYERSIZE_LIST_360P":"360p (16:9)","SETTINGS_PLAYERSIZE_LIST_3X":"3x","SETTINGS_PLAYERSIZE_LIST_480P":"480p (16:9)","SETTINGS_PLAYERSIZE_LIST_720P":"720p (16:9)","SETTINGS_PLAYERSIZE_LIST_CONTENT":"Content","SETTINGS_PLAYERSIZE_LIST_FILL":"Fill","SETTINGS_PLAYERSIZE_LIST_LARGE":"Large","SETTINGS_PLAYERSIZE_LIST_SMALL":"Small","SETTINGS_PLAYERTHEME_DARK":"Dark","SETTINGS_PLAYERTHEME_LABEL":"Player Theme","SETTINGS_PLAYERTHEME_LIGHT":"Light","SETTINGS_PREVENTAUTOBUFFERING_LABEL":"Prevent Auto-Buffering","SETTINGS_PREVENTAUTOPLAY_LABEL":"Prevent Auto-Play","SETTINGS_REMOVEADVERTISEMENTS_LABEL":"Remove Advertisement","SETTINGS_SCROLLTOPLAYER_LABEL":"Scroll To Player","SETTINGS_SHOW3DINDOWNLOADMENU_LABEL":"Show 3D in Download Menu","SETTINGS_SMALL":"Low Definition (240p)","SETTINGS_TAB_ABOUT":"About","SETTINGS_TAB_CHANNEL":"Channel","SETTINGS_TAB_DEBUG":"Debug","SETTINGS_TAB_DOWNLOAD":"Download","SETTINGS_TAB_EMBED":"Embed","SETTINGS_TAB_GENERAL":"General","SETTINGS_TAB_PLACEMENT":"Placement","SETTINGS_TAB_REPEAT":"Repeat","SETTINGS_TAB_UPDATE":"Update","SETTINGS_TAB_WATCH":"Player","SETTINGS_UPDATE_CHECKFORNEWUPDATES":"Check For New Updates","SETTINGS_UPDATE_CHECKFORNEWUPDATESSUCCESS":"Checked For Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATES":"Checking For New Updates","SETTINGS_UPDATE_CHECKINGFORNEWUPDATESERROR":"Couldn't Contact Server. Try Again!","SETTINGS_UPDATE_ENABLE":"Enable Update Checker","SETTINGS_UPDATE_INTERVAL":"Update Interval","SETTINGS_UPDATE_INTERVAL_ALWAYS":"Always","SETTINGS_UPDATE_INTERVAL_EVERY12HOUR":"Every 12 Hours","SETTINGS_UPDATE_INTERVAL_EVERY2DAY":"Every Second Day","SETTINGS_UPDATE_INTERVAL_EVERY2HOUR":"Every 2 Hours","SETTINGS_UPDATE_INTERVAL_EVERY2WEEK":"Every Second Week","SETTINGS_UPDATE_INTERVAL_EVERYDAY":"Every Day","SETTINGS_UPDATE_INTERVAL_EVERYHOUR":"Every Hour","SETTINGS_UPDATE_INTERVAL_EVERYMONTH":"Every Month","SETTINGS_UPDATE_INTERVAL_EVERYWEEK":"Every Week","SETTINGS_VOLUME_ENABLE":"Enable Volume Control","SETTINGS_VOLUME_LABEL":"Volume","SETTINGS_WMODE_DIRECT":"Direct","SETTINGS_WMODE_GPU":"GPU","SETTINGS_WMODE_LABEL":"Flash WMode","SETTINGS_WMODE_OPAQUE":"Opaque","SETTINGS_WMODE_TRANSPARENT":"Transparent","SETTINGS_WMODE_WINDOW":"Window","SMALL":"Low Definition","UNKNOWN":"Unkown","UPDATE_HTML":"New YouTube Center version available.<br \/>Install <a href=\"{scripturl}\" target=\"_blank\">YouTube Center v{version}<\/a> or go to <a href=\"{siteurl}\" <a href=\"{siteurl}\" target=\"_blank\">{site}<\/a>"}};
  con.log("YTCenter: Applied language database");
  ytcenter.updateLanguage = function(){
    con.log("YTCenter: Updating Language...");
    if (ytcenter.settings.language == 'auto' && yt && yt.config_) {
      if (yt.config_.FEEDBACK_LOCALE_LANGUAGE && ytcenter.language.hasOwnProperty(yt.config_.FEEDBACK_LOCALE_LANGUAGE)) {
        ytcenter.locale = ytcenter.language[yt.config_.FEEDBACK_LOCALE_LANGUAGE];
      } else if (yt.config_.SANDBAR_LOCALE && ytcenter.language.hasOwnProperty(yt.config_.SANDBAR_LOCALE)) {
        ytcenter.locale = ytcenter.language[yt.config_.SANDBAR_LOCALE];
      } else if (yt.config_.HL_LOCALE && ytcenter.language.hasOwnProperty(yt.config_.HL_LOCALE)) {
        ytcenter.locale = ytcenter.language[yt.config_.HL_LOCALE];
      } else {
        ytcenter.locale = ytcenter.language['en'];
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
    con.log("YTCenter: Language set to " + ytcenter.locale.LANGUAGE);
  };
  con.log("YTCenter: ytcenter.updateLanguage initialized");
  ytcenter.doRepeat = false;
  ytcenter.html5 = false;
  ytcenter.watch7 = false;
  ytcenter.redirect = function(url, newWindow){
    con.log("YTCenter: Redirecting" + (newWindow ? " in new window" : "") + " to " + url);
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
  con.log("YTCenter: redirect initialized");
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
        con.log("YTCenter: Discarding element");
        if (!element) return;
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        g.appendChild(element);
        g.innerHTML = "";
      };
    })(g);
  })();
  con.log("YTCenter: discardElement initialized");
  ytcenter.storageName = "ytcenter_v1.3_settings";
  ytcenter.loadSettings = function(){
    con.log("YTCenter: Loading settings");
    try {
      var loaded = JSON.parse($LoadData(ytcenter.storageName, "{}"));
      for (var key in loaded) {
        if (loaded.hasOwnProperty(key)) {
          ytcenter.settings[key] = loaded[key];
        }
      }
    } catch (e) {
      con.error(e);
    }
  };
  con.log("YTCenter: Save Settings initializing");
  ytcenter.saveSettings = function(){
    con.log("YTCenter: Saving settings");
    $SaveData(ytcenter.storageName, JSON.stringify(ytcenter.settings));
  };
  con.log("YTCenter: Check for updates initializing");
  ytcenter.checkForUpdates = (function(){
    var updElement;
    return function(success, error){
      con.log("YTCenter: Checking for updates...");
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
            con.log("YTCenter: Got Update Response");
            var rev = -1,
                ver = "-1"
            if (response && response.responseText) {
              rev =  parseInt(/^\/\/ @updateVersion\s+([0-9]+)$/m.exec(response.responseText)[1], 10);
              ver = /^\/\/ @version\s+([a-zA-Z0-9.,-_]+)$/m.exec(response.responseText)[1];
            } else {
              con.log("YTCenter: Couldn't parse revision and version from the update page.");
            }
            if (rev > ytcenter.revision) {
              con.log("YTCenter: New update available");
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
              con.log("YTCenter: No new updates available");
            }
            if (success) {
              con.log("YTCenter: Calling update callback");
              success(response);
            }
          };
        })(success),
        onerror: error
      });
    };
  })();
  con.log("YTCenter: default settings initializing");
  ytcenter._settings = {
    language: 'auto',
    filename: '{title}',
    fixfilename: false,
    enableAutoVideoQuality: true,
    autoVideoQuality: 'medium',
    removeAdvertisements: true,
    preventAutoPlay: false,
    preventAutoBuffer: false,
    preventTabAutoPlay: false,
    preventTabAutoBuffer: false,
    scrollToPlayer: true,
    expandDescription: false,
    enableAnnotations: false,
    //enableCaptions: true, // %
    enableShortcuts: true,
    playersize: 'small',
    autohide: '2',
    volume: 100,
    mute: false,
    enableDownload: true,
    downloadQuality: 'highres',
    downloadFormat: 'mp4',
    downloadAsLinks: false,
    show3DInDownloadMenu: false,
    enableRepeat: true,
    repeatSave: false,
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
      'watch-actions': ['watch-actions&@&//*[@id="watch-like-unlike"]', 'watch-actions&@&//*[@id="watch-actions"]/button[1]', 'watch-actions&@&//*[@id="watch-share"]', 'watch-actions&@&//*[@id="watch-flag"]', 'watch-actions&@&//*[@id="watch-transcript"]', '@downloadgroup', '@repeatbtn', '@resizebtn', '@aspectbtn']
    },
    buttonPlacementWatch7: {
      'watch7-ytcenter-buttons': ['@downloadgroup', '@repeatbtn', '@lightbtn', '@resizebtn', '@aspectbtn'],
      'watch7-sentiment-actions': ['watch7-sentiment-actions&@&//*[@id="watch-like-dislike-buttons"]']
    },
    channel_enableAutoVideoQuality: true,
    channel_autoVideoQuality: 'medium',
    channel_autohide: '2',
    channel_playerTheme: 'dark',
    channel_playerColor: 'red',
    channel_flashWMode: 'opaque',
    channel_enableAnnotations: false,
    channel_preventAutoPlay: false,
    channel_preventAutoBuffer: true,
    channel_enableVolume: false,
    channel_volume: 100,
    channel_mute: false,
    channel_experimentalFlashMode: 'clone',
    channel_experimentalHTML5Mode: 'none',
    embed_enableAutoVideoQuality: true,
    embed_autoVideoQuality: 'medium',
    embed_autohide: '2',
    embed_playerTheme: 'dark',
    embed_playerColor: 'red',
    embed_flashWMode: 'opaque',
    embed_enableAnnotations: false,
    embed_preventAutoPlay: false,
    embed_preventAutoBuffer: true,
    embed_enableVolume: false,
    embed_volume: 100,
    embed_mute: false,
    resizeEnable: false,
    resizeSave: false,
    aspectEnable: false,
    aspectSave: false,
    aspectValue: 'none'
  };
  con.log("YTCenter: Making clone of default settings");
  ytcenter.settings = $Clone(ytcenter._settings);
  con.log("YTCenter: Adding mp3services to database");
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
  con.log("YTCenter: Initializing settings ui");
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
      }
    ],
    "SETTINGS_TAB_WATCH": [
      {
        "label": "SETTINGS_RESIZE_DEFAULT",
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
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "playersize"
      }, {
        "label": "SETTINGS_AUTOHIDECONTROLBAR_LABEL",
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
        "defaultSetting": "playerTheme",
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              if (ytcenter.page === "watch") {
                ytcenter.player.setTheme(ytcenter.settings.playerTheme);
              }
            }
          }
        ]
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
        "defaultSetting": "playerColor",
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              if (ytcenter.page === "watch") {
                ytcenter.player.setProgressColor(ytcenter.settings.playerColor);
              }
            }
          }
        ]
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
        "label": "SETTINGS_LIGHTBULB_COLOR",
        "type": "text", // Temporary until created color picker
        "defaultSetting": "lightbulbBackgroundColor"
      }, {
        "label": "SETTINGS_LIGHTBULB_TRANSPARENCY",
        "type": "range",
        "minRange": 0,
        "maxRange": 100,
        "defaultSetting": "lightbulbBackgroundOpaque"
      }
    ],
    "SETTINGS_TAB_CHANNEL": [
      {
        "label": "SETTINGS_AUTOHIDECONTROLBAR_LABEL",
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
        "defaultSetting": "channel_autohide"
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
        "defaultSetting": "channel_playerTheme",
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              if (ytcenter.page === "channel") {
                ytcenter.player.setTheme(ytcenter.settings.channel_playerTheme);
              }
            }
          }
        ]
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
        "defaultSetting": "channel_playerColor",
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              if (ytcenter.page === "channel") {
                ytcenter.player.setProgressColor(ytcenter.settings.channel_playerColor);
              }
            }
          }
        ]
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
        "defaultSetting": "channel_flashWMode"
      }, {
        "label": "SETTINGS_ENABLEANNOTATIONS_LABEL",
        "type": "bool",
        "defaultSetting": "channel_enableAnnotations"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_ENABLEAUTORESOLUTION_LABEL",
        "type": "bool",
        "defaultSetting": "channel_enableAutoVideoQuality"
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
        "defaultSetting": "channel_autoVideoQuality"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_PREVENTAUTOPLAY_LABEL",
        "type": "bool",
        "defaultSetting": "channel_preventAutoPlay"
      }, {
        "label": "SETTINGS_PREVENTAUTOBUFFERING_LABEL",
        "type": "bool",
        "defaultSetting": "channel_preventAutoBuffer"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_VOLUME_ENABLE",
        "type": "bool",
        "defaultSetting": "channel_enableVolume"
      }, {
        "label": "SETTINGS_VOLUME_LABEL",
        "type": "range",
        "minRange": 0,
        "maxRange": 100,
        "defaultSetting": "channel_volume"
      }, {
        "label": "SETTINGS_MUTE_LABEL",
        "type": "bool",
        "defaultSetting": "channel_mute"
      }
    ],
    "SETTINGS_TAB_EMBED": [
      {
        "label": "SETTINGS_AUTOHIDECONTROLBAR_LABEL",
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
        "defaultSetting": "embed_autohide"
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
        "defaultSetting": "embed_playerTheme",
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              if (ytcenter.page === "embed") {
                ytcenter.player.setTheme(ytcenter.settings.embed_playerTheme);
              }
            }
          }
        ]
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
        "defaultSetting": "embed_playerColor",
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              if (ytcenter.page === "channel") {
                ytcenter.player.setProgressColor(ytcenter.settings.embed_playerColor);
              }
            }
          }
        ]
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
        "defaultSetting": "embed_flashWMode"
      }, {
        "label": "SETTINGS_ENABLEANNOTATIONS_LABEL",
        "type": "bool",
        "defaultSetting": "embed_enableAnnotations"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_ENABLEAUTORESOLUTION_LABEL",
        "type": "bool",
        "defaultSetting": "embed_enableAutoVideoQuality"
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
        "defaultSetting": "embed_autoVideoQuality"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_PREVENTAUTOPLAY_LABEL",
        "type": "bool",
        "defaultSetting": "embed_preventAutoPlay"
      }, {
        "label": "SETTINGS_PREVENTAUTOBUFFERING_LABEL",
        "type": "bool",
        "defaultSetting": "embed_preventAutoBuffer"
      }, {
        "type": "html",
        "html": "<hr class=\"yt-horizontal-rule\" style=\"z-index:0;\" />"
      }, {
        "label": "SETTINGS_VOLUME_ENABLE",
        "type": "bool",
        "defaultSetting": "embed_enableVolume"
      }, {
        "label": "SETTINGS_VOLUME_LABEL",
        "type": "range",
        "minRange": 0,
        "maxRange": 100,
        "defaultSetting": "embed_volume"
      }, {
        "label": "SETTINGS_MUTE_LABEL",
        "type": "bool",
        "defaultSetting": "embed_mute"
      }
    ],
    "SETTINGS_TAB_PLACEMENT": [
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
        "label": "SETTINGS_RESIZE_ENABLE",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "resizeEnable"
      }, {
        "label": "SETTINGS_ASPECT_ENABLE",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "aspectEnable"
      }, {
        "type": "html",
        "html": "<br />",
        "style": {
          "display": (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/) ? "block" : "none")
        }
      }, {
        "text": "SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_LABEL",
        "style": {
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
        "htmllocale": "SETTINGS_PLACEMENTSYSTEM_MOVEELEMENTS_INSTRUCTIONS",
        "style": {
          "marginLeft": "20px",
          "display": (loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/) ? "block" : "none")
        }
      }
    ],
    "SETTINGS_TAB_DOWNLOAD": [
      {
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
        "label": "SETTINGS_DOWNLOADASLINKS_LABEL",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "downloadAsLinks"
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
        "listeners": [
          {
            "event": "change",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
        "defaultSetting": "filename"
      }, {
        "label": "SETTINGS_FIXDOWNLOADFILENAME_LABEL",
        "type": "bool",
        "listeners": [
          {
            "event": "click",
            "callback": function(){
              ytcenter.database.applyLanguage(ytcenter.locale);
            }
          }
        ],
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
          con.log("YTCenter: Loading debug text...");
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
              
              dbg.console = _console;
              
              var _icon = ytcenter.icon;
              var _language = ytcenter.language;
              var _locale = ytcenter.locale;
              
              delete dbg.ytcenter.icon;
              delete dbg.ytcenter.language;
              delete dbg.ytcenter.locale;
              
              debugText = JSON.stringify(dbg);
              
              ytcenter.icon = _icon;
              ytcenter.language = _language;
              ytcenter.locale = _locale;
            } catch (e) {
              con.error(e);
              debugText = e.message;
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
          "translators": "<div style=\"margin-left:20px;\">Arabic (Bahrain) - alihill381<br />Danish - Jeppe Rune Mortensen (YePpHa)<br />French - Lo࣠B (ThePoivron)<br />German - Simon Artmann<br />Hebrew (Israel) - baryoni<br />Italian - Pietro De Nicolao<br />Russian - <a href=\"http://kdasoft.narod.ru\" target=\"_blank\">KDASOFT</a><br />Spanish - Roxz<br />Turkish - Ismail Aksu<br />Hungarian - Eugenox<br />Portuguese (Brazil) - Thiago R. M. Pereira<br />Chinese (S) - ?? and MatrixGT<br />Romanian - <a href=\"http://www.itinerary.ro/\" target=\"_blank\">BlueMe</a></div>"
        }
      }
    ]
  };
  } catch (e) {
    con.error(e);
  }
  con.log("YTCenter: Settings UI Inititialized");
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
  con.log("YTCenter: Download initializing");
  ytcenter.video.filename = function(stream){
    if (stream == null) return "";
    var filename = $TextReplacer(ytcenter.settings.filename, {
      title: ytcenter.video.title,
      videoid: ytcenter.video.id,
      author: ytcenter.video.author,
      resolution: (ytcenter.video.resolutions.hasOwnProperty(stream.quality) ? ytcenter.video.resolutions[stream.quality] : ''),
      itag: stream.itag,
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
    
    if (ytcenter.settings.fixfilename) {
      var tmp = "";
      for (var i = 0; i < filename.length; i++) {
        if (filename.charAt(i).match(/[0-9a-zA-Z ]/i)) {
          tmp += filename.charAt(i);
        }
      }
      filename = tmp;
    }
    return stream.url + "&title=" + encodeURIComponent(filename);
  };
  ytcenter.video.downloadLink = function(stream){
    return ytcenter.video.filename(stream) + "&signature=" + encodeURIComponent(stream.sig);
  };
  ytcenter.video.download = (function(){
    var _download_iframe = null;
    return function(itag){
      con.log("YTCenter: Downloading format " + itag + "...");
      var stream = null;
      for (var i = 0; i < ytcenter.video.stream.length; i++) {
        if (ytcenter.video.stream[i].itag === itag && typeof ytcenter.video.stream[i].url != "undefined") {
          stream = ytcenter.video.stream[i];
          break;
        }
      }
      if (stream != null) {
        if (!_download_iframe) { // Initalize iframe if it doesn't exist
          _download_iframe = document.createElement("iframe");
          _download_iframe.style.position = "absolute";
          _download_iframe.style.top = "-1000px";
          _download_iframe.style.left = "-1000px";
          _download_iframe.style.width = "1px";
          _download_iframe.style.height = "1px";
          document.body.appendChild(_download_iframe);
        }
        _download_iframe.setAttribute("src", ytcenter.video.downloadLink(stream));
      } else {
        con.log("YTCenter: Format (" + itag + ") not found and therefore couldn't start downloading");
        throw "Stream (" + itag + ") not found!";
      }
    };
  })();
  ytcenter.video.stream = [];
  
  ytcenter.player = {};
  ytcenter.player.checkHTML5Support = function(){
    var v = document.createElement("video");
    if (v && !v.canPlayType) {
      return false;
    }
    
    var mp4 = v.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"');
    var webm = v.canPlayType('video/webm; codecs="vp8.0, vorbis"');

    var found = false;
    for (var i = 0; i < ytcenter.video.stream.length; i++) {
      if (mp4 && ytcenter.video.stream[i].type.indexOf("video/mp4;") === 0) {
        found = true;
        break;
      } else if (webm && ytcenter.video.stream[i].type.indexOf("video/webm;") === 0) {
        found = true;
        break;
      }
    }
    return found;
  };
  ytcenter.player.getReference = function(playerid){
    if (!ytcenter.player.reference || ytcenter.player.reference === undefined) {
      ytcenter.player.reference = {};
    }
    if (playerid) {
      ytcenter.player.reference.playerId = playerid;
    }
    if (ytcenter.page === "embed") {
      var _reference, key, key2;
      for (key in uw) {
        if (uw.hasOwnProperty(key) && typeof uw[key] === "object") {
          for (key2 in uw[key]) {
            if (uw[key].hasOwnProperty(key2)) {
              if (key2.indexOf("player") === 0) {
                _reference = uw[key][key2];
              } else {
                _reference = undefined;
                break;
              }
            }
          }
        }
        if (_reference) break;
      }
    }
    if (_reference) {
      ytcenter.referenceMethod = "inject";
      var names = {
        "F": "type",
        "H": "id",
        "a": "api",
        "za": "onReadyCalled",
        "e": "target",
        "k": "playerId",
        "d": "container",
        "b": "callback",
        "f": "config"
      };
      var __reference = {};
      for (key in names) {
        if (names.hasOwnProperty(key)) {
          __reference[names[key]] = _reference[key];
        }
      }
      ytcenter.player.reference = __reference;
      con.log(ytcenter.player.reference);
    } else {
      if (yt.config_.PLAYER_REFERENCE) {
        ytcenter.referenceMethod = "yt.config_.PLAYER_REFERENCE";
        ytcenter.player.reference.api = yt.config_.PLAYER_REFERENCE;
        ytcenter.player.reference.onReadyCalled = (yt.config_.PLAYER_REFERENCE.addEventListener ? true : false);
      } else if (!ytcenter.html5) {
        ytcenter.referenceMethod = "document.getElementsByTagName(\"embed\")[0]";
        if (document.getElementsByTagName("embed").length > 0) {
          ytcenter.player.reference.api = document.getElementsByTagName("embed")[0];
          ytcenter.player.reference.onReadyCalled = (ytcenter.player.reference.api.addEventListener ? true : false);
        }
      } else if (document.getElementsByTagName("video").length > 0) {
        ytcenter.referenceMethod = "document.getElementsByTagName(\"video\")[0]";
        ytcenter.player.reference.html5 = true;
        ytcenter.player.reference.api = document.getElementsByTagName("video")[0];
        if (uw.EMB9 && typeof uw.EMB9 === "object") {
          var key;
          for (key in uw.EMB9) {
            if (uw.EMB9.hasOwnProperty(key)) {
              ytcenter.player.reference.api[key] = uw.EMB9[key];
            }
          }
        }
        ytcenter.player.reference.onReadyCalled = (ytcenter.player.reference.api.addEventListener ? true : false);
      } else {
        ytcenter.referenceMethod = "none";
      }
      
      ytcenter.player.reference.html5 = ytcenter.html5;
      
      if (yt.config_.PLAYER_CONFIG) {
        ytcenter.player.reference.config = yt.config_.PLAYER_CONFIG;
      }
      ytcenter.player.reference.target = (function(){
        var __wp = document.getElementById("video-player-flash-flash") ||document.getElementById("movie_player-html5") || document.getElementById("movie_player-flash") || document.getElementById("watch-player"),
            __ed = document.getElementsByTagName("embed");
        if (__wp) {
          return __wp;
        } else if (__ed.length > 0 && __ed[0]) {
          return __ed[0];
        } else {
          return null;
        }
      })();
    }
    
    if (!ytcenter.player.reference.listener) {
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
      var clear = function() {
        for (var key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            listeners[key] = [];
          }
        }
      };
      
      ytcenter.unsafe.onStateChange = function(arg1){
        con.log("YTCenter: Player callback -> onStateChange (" + arg1 + ")");
        
        if (ytcenter.unsafe['ytPlayeronStateChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['ytPlayeronStateChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")].apply(uw, arguments);
        }
        
        for (var i = 0; i < listeners['onStateChange'].length; i++) {
          if (listeners['onStateChange'][i] == null) continue;
          listeners['onStateChange'][i].apply(ytcenter.player.reference.api, arguments);
        }
      };
      ytcenter.unsafe.onPlaybackQualityChange = function(arg1){
        con.log("YTCenter: Player callback -> onPlaybackQualityChange (" + arg1 + ")");
        
        if (ytcenter.unsafe['onPlaybackQualityChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['onPlaybackQualityChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")].apply(uw, arguments);
        }
        
        for (var i = 0; i < listeners['onPlaybackQualityChange'].length; i++) {
          if (listeners['onPlaybackQualityChange'][i] == null) continue;
          listeners['onPlaybackQualityChange'][i].apply(ytcenter.player.reference.api, arguments);
        }
      };
      ytcenter.unsafe.onError = function(arg1){
        con.log("YTCenter: Player callback -> onError (" + arg1 + ")");
        
        if (ytcenter.unsafe['onError' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['onError' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")].apply(uw, arguments);
        }
        
        for (var i = 0; i < listeners['onError'].length; i++) {
          if (listeners['onError'][i] == null) continue;
          listeners['onError'][i].apply(ytcenter.player.reference.api, arguments);
        }
      };
      ytcenter.unsafe.onApiChange = function(arg1){
        con.log("YTCenter: Player callback -> onApiChange (" + arg1 + ")");
        
        if (ytcenter.unsafe['onApiChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['onApiChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")].apply(uw, arguments);
        }
        
        for (var i = 0; i < listeners['onApiChange'].length; i++) {
          if (listeners['onApiChange'][i] == null) continue;
          listeners['onApiChange'][i].apply(ytcenter.player.reference.api, arguments);
        }
      };
      var init = function(){
        ytcenter.player.getReference();
        
        if (uw['ytPlayeronStateChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['ytPlayeronStateChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = uw['ytPlayeronStateChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")];
          uw['ytPlayeronStateChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = ytcenter.unsafe.onStateChange;
        } else {
          ytcenter.player.reference.api.addEventListener("onStateChange", "ytcenter.onStateChange");
        }
        if (uw['ytPlayeronError' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['ytPlayeronError' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = uw['ytPlayeronError' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")];
          uw['ytPlayeronError' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = ytcenter.unsafe.onError;
        } else {
          ytcenter.player.reference.api.addEventListener("onError", "ytcenter.onError");
        }
        if (uw['ytPlaybackQualityChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['ytPlaybackQualityChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = uw['ytPlaybackQualityChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")];
          uw['ytPlaybackQualityChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = ytcenter.unsafe.onPlaybackQualityChange;
        } else {
          ytcenter.player.reference.api.addEventListener("onPlaybackQualityChange", "ytcenter.onPlaybackQualityChange");
        }
        if (uw['ytApiChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")]) {
          ytcenter.unsafe['ytApiChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = uw['ytApiChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")];
          uw['ytApiChange' + (ytcenter.player.getReference().playerId ? ytcenter.player.getReference().playerId : "player1")] = ytcenter.unsafe.onApiChange;
        } else {
          ytcenter.player.reference.api.addEventListener("onApiChange", "ytcenter.onApiChange");
        }
      };
      ytcenter.player.reference.listener = {
        addEventListener: add,
        removeEventListener: rem,
        clear: clear,
        init: init
      };
    }
    return ytcenter.player.reference;
  };
  ytcenter.player.setTheme = function(theme){
    con.log("YTCenter: Setting player theme to " + theme);
    var light = "light-theme";
    var dark = "dark-theme";
    if (ytcenter.html5) {
      if (theme === "dark") {
        $RemoveCSS(ytcenter.player.getReference().target, light);
        $AddCSS(ytcenter.player.getReference().target, dark);
      } else if (theme === "light") {
        $RemoveCSS(ytcenter.player.getReference().target, dark);
        $AddCSS(ytcenter.player.getReference().target, light);
      }
    }
  };
  ytcenter.player.setProgressColor = function(color){
    con.log("YTCenter: Setting player progress color to " + color);
    var white = "white";
    var red = "red";
    if (ytcenter.html5) {
      if (color === "red") {
        $RemoveCSS(document.getElementsByClassName("html5-play-progress")[0], white);
        $AddCSS(document.getElementsByClassName("html5-play-progress")[0], red);
      } else if (color === "white") {
        $RemoveCSS(document.getElementsByClassName("html5-play-progress")[0], red);
        $AddCSS(document.getElementsByClassName("html5-play-progress")[0], white);
      }
    }
  };
  ytcenter.player.fixHTML5 = function(){
    if (ytcenter.player.getReference().api.getApiInterface) {
      var ref = ytcenter.player.getReference();
      var vid = ref.target.getElementsByTagName("video")[0];
      var apiInterface = ref.api.getApiInterface();
      for (var i = 0; i < apiInterface.length; i++) {
        if (!vid[apiInterface[i]]) {
          vid[apiInterface[i]] = ref.api[apiInterface[i]];
        }
      }
    }
  };
  ytcenter.player.aspect = function(option){
    yt.playerConfig.args.keywords = option;
    con.log("YTCenter: Keywords changed to " + yt.playerConfig.args.keywords);
    var pl = ytcenter.player.getReference().api;
    var muted = pl.isMuted();
    var volume = pl.getVolume();
    var rate = pl.getPlaybackRate();
    var quality = pl.getPlaybackQuality();
    var time = pl.getCurrentTime();
    var state = pl.getPlayerState();
    var dur = pl.getDuration();
    if (state === 0) {
      time = dur + 60;
    }
    
    /*if (ytcenter.html5) {
      ytcenter.player.getReference().listener.clear();
      ytcenter.player.getReference().onReadyCalled = false;
    }*/
    
    var il = ytcenter.player.getReference().listener.addEventListener("onStateChange", function(s){
      if (ytcenter.html5) {
        ytcenter.player.fixHTML5();
      }
      if (s !== 1) return;
      ytcenter.player.getReference().listener.removeEventListener("onStateChange", il);
      con.log("YTCenter: Setting player option to last player");
      if (state === -1) {
        pl.stopVideo();
      } else if (state === 2) {
        pl.pauseVideo();
        pl.seekTo(time);
      } else {
        pl.seekTo(time);
      }
      
      pl.setVolume(volume);
      if (muted) {
        pl.mute(muted);
      }
      pl.setPlaybackRate(rate);
      pl.setPlaybackQuality(quality);
      
      con.log("YTCenter: Made a live refresh");
      
      
    });
    
    ytcenter.player.getReference().api.loadVideoByPlayerVars(yt.playerConfig.args);
    /*if (ytcenter.html5) {
      ytcenter.player.fixHTML5();
    }*/
  };
  ytcenter.player.resize = (function(){
    var scrollToViewButton = null;
    return function(option){
      var watchVideo = document.getElementById("watch-video") || document.getElementById("watch7-video");
      if (scrollToViewButton == null) {
        scrollToViewButton = document.createElement("button");
        scrollToViewButton.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip" + (ytcenter.settings.playersize == 'fill' ? "" : " hid");
        scrollToViewButton.type = "button";
        scrollToViewButton.setAttribute("role", "button");
        scrollToViewButton.setAttribute("onclick", ";return false;");
        scrollToViewButton.title = ytcenter.locale['SCROLL_TOOLTIP'];
        ytcenter.database.register(scrollToViewButton, 'SCROLL_TOOLTIP', '@title');
        scrollToViewButton.style.position = "absolute";
        scrollToViewButton.style.right = "7px";
        scrollToViewButton.style.top = "-33px";
        scrollToViewButton.style.zIndex = "0";
        scrollToViewButton.addEventListener('click', function(){
          watchVideo.scrollIntoView(true);
        }, false);
        var arr = document.createElement("img");
        arr.className = "yt-uix-button-arrow";
        arr.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
        arr.alt = "";
        arr.style.marginLeft = "0";
        scrollToViewButton.appendChild(arr);
        watchVideo.appendChild(scrollToViewButton);
        if (!ytcenter.watch7) {
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
        }
      }
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
      if (option === 'fill') {
        $RemoveCSS(scrollToViewButton, 'hid');
      } else {
        $AddCSS(scrollToViewButton, 'hid');
      }
      switch (option) {
        case 'small':
          ytcenter.player._resize("", "", false);
          break;
        case 'large':
          ytcenter.player._resize("", "", true);
          break;
        case 'content':
          ytcenter.player._resize("970px", (970/(640/original_height)+original_height_removed) + "px", true);
          break;
        case 'fill':
          ytcenter.player._resize("100%", "100%", true);
          break;
        case '1.5x':
          ytcenter.player._resize((original_width*1.5) + "px", (original_height*1.5+original_height_removed) + "px", true);
          break;
        case '2x':
          ytcenter.player._resize((original_width*2) + "px", (original_height*2+original_height_removed) + "px", true);
          break;
        case '2.5x':
          ytcenter.player._resize((original_width*2.5) + "px", (original_height*2.5+original_height_removed) + "px", true);
          break;
        case '3x':
          ytcenter.player._resize((original_width*3) + "px", (original_height*3+original_height_removed) + "px", true);
          break;
        case '360p':
          ytcenter.player._resize("640px", (360 + original_height_removed) + "px", true);
          break;
        case '480p':
          ytcenter.player._resize("853.333px", (480 + original_height_removed) + "px", true);
          break;
        case '720p':
          ytcenter.player._resize("1280px", (720 + original_height_removed) + "px", true);
          break;
        case '1080p':
          ytcenter.player._resize("1920px", (1080 + original_height_removed) + "px", true);
          break;
      }
    };
  })();
  ytcenter.player._resize = (function(){
    var _width = "";
    var _height = "";
    var _wide = true;
    window.addEventListener("resize", (function(){
      var timer;
      return function(){
        uw.clearTimeout(timer);
        timer = uw.setTimeout(function(){
          con.log("YTCenter: Window Resize listener called, width: \"" + _width + "\", height: \"" + _height + "\"");
          if (_width != '' && _height != '' && (_width.match(/%$/) || _height.match(/%$/))) {
            ytcenter.player._resize(_width, _height, _wide);
          }
        }, 200);
      };
    })(), false);
    return function(width, height, wide){
      if (typeof wide == "undefined") wide = false;
      con.log("YTCenter: Resizing YouTube Player to width: \"" + width + "\", height: \"" + height + "\"" + (wide ? ", and enabling wide" : ", and disabling wide"));
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
        //document.getElementsByTagName("video")[0].parentNode.style.width = "100%";
        //document.getElementsByTagName("video")[0].parentNode.style.height = "100%";
        document.getElementsByTagName("video")[0].parentNode.style.left = "0px";
        document.getElementsByTagName("video")[0].parentNode.style.top = "0px";
      }
    };
  })();
  ytcenter.player.setQuality = function(vq){
    var pc = {};
    if (yt.playerConfig && yt.playerConfig.args) {
      pc = yt.playerConfig;
    } else if (yt.config_ && yt.config_.PLAYER_CONFIG && yt.config_.PLAYER_CONFIG.args) {
      pc = yt.config_.PLAYER_CONFIG;
    } else {
      pc = yt.getConfig("PLAYER_CONFIG");
    }
    con.log(pc);
    con.log("YTCenter: Getting Highest Available Quality With \"" + vq + "\" As Highest Quality");
    var priority = ['auto', 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'];
    if (ytcenter.html5) {
      var a = document.createElement("video");
      if (a && a.canPlayType) {
        pc.args.vq = "auto";
        for (var i = 0; i < ytcenter.video.stream.length; i++) {
          con.log("YTCenter: " + ytcenter.video.stream[i].type + " => " + a.canPlayType(ytcenter.video.stream[i].type.split(";")[0]));
          if ($ArrayIndexOf(priority, ytcenter.video.stream[i].quality) <= $ArrayIndexOf(priority, vq) && $ArrayIndexOf(priority, ytcenter.video.stream[i].quality) > $ArrayIndexOf(priority, pc.args.vq) && a.canPlayType(ytcenter.video.stream[i].type.split(";")[0]).replace(/no/, '')) {
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
    con.log("YTCenter: Setting Video Quality to " + pc.args.vq);
    if (typeof ytcenter.player.getReference() != "undefined" && ytcenter.player.getReference().onReadyCalled && ytcenter.player.getReference().api && ytcenter.player.getReference().api.setPlaybackQuality) {
      con.log("YTCenter: Setting PlaybackQuality to " + pc.args.vq);
      ytcenter.player.getReference().api.setPlaybackQuality(pc.args.vq);
    }
    if (ytcenter.html5 && pc.args.vq === "auto") {
      return false;
    } else {
      return true;
    }
  };
  ytcenter.player.update = function(onplayerloaded){
    var pc = {};
    if (ytcenter.page === "embed") {
      pc = yt.config_.PLAYER_CONFIG;
    } else if (ytcenter.page === "watch") {
      pc = yt.playerConfig;
    } else if (ytcenter.page === "channel") {
      pc = yt.getConfig("PLAYER_CONFIG");
    } else {
      if (yt.config_.PLAYER_CONFIG && yt.config_.PLAYER_CONFIG.args) {
        pc = yt.config_.PLAYER_CONFIG;
      } else if (yt.playerConfig && yt.playerConfig.args) {
        pc = yt.playerConfig;
      } else {
        pc = yt.getConfig("PLAYER_CONFIG");
      }
    }
    con.log("YTCenter: Update Called");
    con.log(pc.args);
    if (pc.args.jsapicallback && uw[pc.args.jsapicallback]) {
      ytcenter.player.jsapicallback = pc.args.jsapicallback;
    } else if (uw['onYouTubePlayerReady']) {
      ytcenter.player.jsapicallback = "onYouTubePlayerReady";
    }
    pc.args.enablejsapi = "1";
    
    var onplayerloadedCalled = false;
    
    ytcenter.unsafe.onplayerloaded = function(playerid){
      if (!playerid) playerid = "player1";
      onplayerloadedCalled = true;
      try {
        con.log("YTCenter: YouTube Player Ready (" + playerid + ")");
        try {
          if (ytcenter.player.ytPlayerOnYouTubePlayerReady) {
            con.log("YTCenter: Calling YouTube Player OnLoaded API (Stored Function)");
            ytcenter.player.ytPlayerOnYouTubePlayerReady.apply(uw, arguments);
          } else if (ytcenter.player.jsapicallback) {
            con.log("YTCenter: Calling YouTube Player OnLoaded API");
            uw[ytcenter.player.jsapicallback].apply(uw, arguments);
          }
        } catch (e) {
          con.error(e.message);
        }
        con.log("YTCenter: Initliazing player listeners");
        ytcenter.player.getReference(playerid).listener.init();
        
        con.log("YTCenter: Calling onReady callback");
        var o_ = function(){
          if (ytcenter.player.getReference().api && ytcenter.player.getReference().api.getApiInterface) {
            con.log(ytcenter.player.getReference().api.getApiInterface());
            onplayerloaded.apply(ytcenter.player.getReference().api, [playerid, ytcenter.player.getReference(), ytcenter.player.getReference().listener]); // YouTube Center's additional callback
          } else {
            con.log("YTCenter: Couldn't get api interface");
            uw.setTimeout(o_, 20);
          }
        };
        o_();
      } catch (e) {
        con.error(e.message);
      }
    };
    pc.args.jsapicallback = "ytcenter.onplayerloaded";
    
    if (ytcenter.html5) {
      ytcenter.player.ytPlayerOnYouTubePlayerReady = uw['ytPlayerOnYouTubePlayerReady'];
      uw['ytPlayerOnYouTubePlayerReady'] = ytcenter.unsafe.onplayerloaded;
    }
    
    
    // Updating player
    ytcenter.player.getReference().listener.clear();
    if (ytcenter.player.getReference() && ytcenter.player.getReference().onReadyCalled && ytcenter.player.getReference().api.loadVideoByPlayerVars) {
      con.log("YTCenter: Upading player by loadVideoByPlayerVars");
      ytcenter.player.getReference().api.loadVideoByPlayerVars(yt.playerConfig.args || yt.config_.PLAYER_CONFIG);
      ytcenter.player.getReference().listener.init();
      
      onplayerloaded.apply(ytcenter.player.getReference().api, [ytcenter.player.getReference().playerId, ytcenter.player.getReference(), ytcenter.player.getReference().listener]);
    } else {
      if (ytcenter.page === "embed" || ytcenter.page === "channel") {
          con.log("YTCenter: Updating embed or channel player");
          if (ytcenter.html5) {
            ytcenter.player.getReference().listener.init();
            if (!onplayerloadedCalled) {
              onplayerloaded.apply(ytcenter.player.getReference().api, [ytcenter.player.getReference().playerId, ytcenter.player.getReference(), ytcenter.player.getReference().listener]);
            }
          } else {
            var __waiting = function(){
              if (ytcenter.player.getReference().target === null) {
                uw.setTimeout(__waiting, 20);
                return;
              }
              if (ytcenter.player.getReference().api && ytcenter.player.getReference().api.stopVideo) {
                ytcenter.player.getReference().api.pauseVideo();
              }
              
              if (document.getElementsByClassName("player-root").length > 0) {
                document.getElementsByClassName("player-root")[0].setAttribute("data-swf-config", JSON.stringify(yt.config_.PLAYER_CONFIG));
              }
              
              if (yt.embed && yt.embed.writeEmbed) {
                yt.embed.writeEmbed();
              } else {
                if (ytcenter.html5) {
                  return;
                } else {
                  var flashvars = "",
                      player = ytcenter.player.getReference().target;
                  for (var key in yt.config_.PLAYER_CONFIG.args) {
                    if (yt.config_.PLAYER_CONFIG.args.hasOwnProperty(key)) {
                      if (flashvars !== "") flashvars += "&";
                      flashvars += key + "=" + escape(yt.config_.PLAYER_CONFIG.args[key]);
                    }
                  }
                  
                  player.setAttribute("flashvars", flashvars);
                  player.setAttribute("wmode", ytcenter.settings.channel_flashWMode);
                  
                  con.log("YTCenter: Cloning YouTube Flash Player");
                  var clone = player.cloneNode(true);
                  player.style.display = "none";
                  player.src = "";
                  player.parentNode.replaceChild(clone, player);
                  player = clone;
                }
              }
              
              var __wa = function(){
                if (ytcenter.player.getReference().api && ytcenter.player.getReference().api.addEventListener) {
                  ytcenter.player.getReference().listener.init();
                  onplayerloaded.apply(ytcenter.player.getReference().api, [ytcenter.player.getReference().playerId, ytcenter.player.getReference(), ytcenter.player.getReference().listener]);
                } else {
                  uw.setTimeout(__wa, 20);
                }
              };
              __wa();
            }
            __waiting();
          }
      } else if (ytcenter.page === "watch") {
        if (ytcenter.html5) {
          con.log("YTCenter: HTML5 Player not initialized yet.");
        } else {
          con.log("YTCenter: YouTube Flash Player Detected");
          var flashvars = "";
          for (var key in pc.args) {
            if (pc.args.hasOwnProperty(key)) {
              if (flashvars !== "") flashvars += "&";
              flashvars += key + "=" + escape(pc.args[key]);
            }
          }
          var up = function(player){
            player.setAttribute("flashvars", flashvars);
            player.setAttribute("wmode", ytcenter.settings.flashWMode);
            
            con.log("YTCenter: Cloning YouTube Flash Player");
            var clone = player.cloneNode(true);
            player.style.display = "none";
            player.src = "";
            player.parentNode.replaceChild(clone, player);
            player = clone;
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
      }
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
    ytcenter.page = "channel";
    var playerConfig = ytcenter.player.getReference().config;
    
    ytcenter.loadSettings();
    
    ytcenter.updateLanguage();
    
    var channel_onload = function(){
      ytcenter.video.stream = ytcenter.parseStream(playerConfig);
      ytcenter.video.id = playerConfig.args.video_id;
      ytcenter.video.title = playerConfig.args.title;
      ytcenter.video.author = playerConfig.args.author;
      
      if (playerConfig.html5/* && ytcenter.player.checkHTML5Support()*/) ytcenter.html5 = true;
      /*if (!ytcenter.html5 && !ytcenter.player.getReference().target) {
        uw.setTimeout(channel_onload, 20);
        return;
      }*/
      
      if (ytcenter.settings.channel_enableAutoVideoQuality) {
        ytcenter.player.setQuality(ytcenter.settings.channel_autoVideoQuality);
      }
      
      if (ytcenter.settings.channel_removeAdvertisements) {
        playerConfig.args.csi_page_type = "watch5";
        var advertisementArguments = ['ad3_module', 'ad_channel_code_instream', 'ad_channel_code_overlay', 'ad_eurl', 'ad_flags', 'ad_host', 'ad_host_tier', 'ad_logging_flag', 'ad_preroll', 'ad_slots', 'ad_tag', 'ad_video_pub_id', 'aftv', 'afv', 'afv_ad_tag', 'afv_instream_max'];
        for (var i = 0; i < advertisementArguments.length; i++) {
          delete playerConfig.args[advertisementArguments[i]];
        }
      }
      if (!ytcenter.settings.channel_enableAnnotations) {
        playerConfig.args.iv_load_policy = 3;
      } else {
        playerConfig.args.iv_load_policy = 1;
      }
      if (typeof ytcenter.settings.channel_autohide != "undefined") {
        playerConfig.args.autohide = ytcenter.settings.channel_autohide;
      }
      if (ytcenter.settings.channel_preventAutoBuffer) {
        playerConfig.args.autoplay = "0";
      } else {
        playerConfig.args.autoplay = "1";
      }
      playerConfig.args.theme = ytcenter.settings.channel_playerTheme;
      playerConfig.args.color = ytcenter.settings.channel_playerColor;
      playerConfig.args.enablejsapi = "1";

      con.log("YTCenter: Updating YouTube Player");
      ytcenter.player.update(function(playerid, player, listener){
        con.log("YTCenter: YouTube Player Loaded");
        ytcenter.player.setTheme(ytcenter.settings.channel_playerTheme);
        ytcenter.player.setProgressColor(ytcenter.settings.channel_playerColor);
        if (ytcenter.settings.channel_enableVolume) {
          if (ytcenter.settings.channel_volume < 0) {
            ytcenter.settings.channel_volume = 0;
          } else if (ytcenter.settings.channel_volume > 100) {
            ytcenter.settings.channel_volume = 100;
          }
          if (ytcenter.player.getReference().api.setVolume) {
            ytcenter.player.getReference().api.setVolume(ytcenter.settings.channel_volume);
          }
        }
        if (ytcenter.settings.channel_mute && ytcenter.player.getReference().api.mute) {
          ytcenter.player.getReference().api.mute();
        } else if (!ytcenter.settings.channel_mute && ytcenter.player.getReference().api.unMute) {
          ytcenter.player.getReference().api.unMute();
        }
        if (ytcenter.html5) {
          if (ytcenter.settings.channel_preventAutoPlay) {
            ytcenter.player.getReference().api.pauseVideo();
          }
        } else {
          if (ytcenter.settings.channel_preventAutoBuffer) {
            con.log("YTCenter: Stopping video");
            var __break = false;
            
            ytcenter.player.getReference().listener.addEventListener("onStateChange", function(state){
              __break = true;
            });
            var __tmp_pab = function(){
              ytcenter.player.getReference().api.stopVideo();
              if (!__break) {
                uw.setTimeout(__tmp_pab, 20);
              }
            };
            __tmp_pab();
          } else if (ytcenter.settings.channel_preventAutoPlay) {
            var __break = false;
            
            ytcenter.player.getReference().listener.addEventListener("onStateChange", function(state){
              if (state === 2) {
                __break = true;
              }
            });
            var __tmp_pap = function(){
              ytcenter.player.getReference().api.pauseVideo();
              if (!__break) {
                uw.setTimeout(__tmp_pap, 20);
              }
            };
            __tmp_pap();
          }
        }
        if (ytcenter.player.getReference().api.getPlaybackQuality() != playerConfig.args.vq) {
          con.log("YTCenter: Setting playback quality from " + ytcenter.player.getReference().api.getPlaybackQuality() + " to " + playerConfig.args.vq);
          ytcenter.player.getReference().api.setPlaybackQuality(playerConfig.args.vq);
        }
      });
    };
    
    $XMLHTTPRequest({
      method: "GET",
      url: '/get_video_info?video_id=' + yt.config_.PLAYER_CONFIG.args.video_id,
      headers: {
        "Content-Type": "text/plain"
      },
      onload: function(response){
        if (response.responseText) {
          var o = {};
          var s = response.responseText.split("&");
          for (var i = 0; i < s.length; i++) {
            var ss = s[i].split("=");
            o[ss[0]] = decodeURIComponent(ss[1]);
          }
          con.log("YTCenter: Downloaded data:");
          con.log(o);
          delete o.title;
          delete o.author;
          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              playerConfig.args[key] = o[key];
            }
          }
          if (playerConfig.args.status === "ok") {
            channel_onload();
          } else {
            con.log("YTCenter: Couldn't load stream because (" + playerConfig.args.status + "): " + unescape(playerConfig.args.reason).replace(/[+]/g," "));
          }
        }
      }
    });
    
    $CreateSettingsUI();
    $UpdateChecker();
  };
  
  var ytwatchinit = function(){
    yt = uw.yt;
    ytcenter.page = "watch";
    if (document.getElementById("watch7-main")) ytcenter.watch7 = true;
    if (yt.playerConfig.html5) ytcenter.html5 = true;
    ytcenter.video.stream = ytcenter.parseStream(yt.playerConfig);
    
    ytcenter.video.id = yt.playerConfig.args.video_id;
    ytcenter.video.title = yt.playerConfig.args.title;
    ytcenter.video.author = document.getElementsByClassName("yt-user-name")[0].textContent;
    
    ytcenter.loadSettings();
    
    ytcenter.updateLanguage();
    
    //yt.playerConfig.args.el = "embedded"; 
    if (ytcenter.settings.aspectValue !== "none" && ytcenter.settings.aspectValue.indexOf("yt:") === 0) {
      con.log("YTCenter: Chaning aspect to " + ytcenter.settings.aspectValue);
      yt.playerConfig.args.keywords = ytcenter.settings.aspectValue;
    } else {
      con.log("YTCenter: Do not change aspect");
    }
    
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
      yt.playerConfig.args.autoplay = "0";
    } else {
      yt.playerConfig.args.autoplay = "1";
    }
    yt.playerConfig.args.theme = ytcenter.settings.playerTheme;
    yt.playerConfig.args.color = ytcenter.settings.playerColor;
    yt.playerConfig.args.enablejsapi = "1";
    
    var watchVideo = document.getElementById("watch-video") || document.getElementById("watch7-video");
    if (watchVideo) {
      watchVideo.style.overflow = "visible";
      ytcenter.player.resize(ytcenter.settings.playersize);
    }
    
    con.log("YTCenter: Adding player shortcuts to document");
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
    con.log("YTCenter: Updating YouTube Player");
    ytcenter.player.update(function(playerid, player, listener){
      con.log("YTCenter: YouTube Player Loaded");
      if (ytcenter.watch7 && !ytcenter.html5) {
        player.target.children[0].style.zIndex = "102";
      } else {
        player.target.style.zIndex = "102";
      }
      if (ytcenter.player.getReference().api.getVolume && ytcenter.player.getReference().api.getVolume() != ytcenter.settings.volume && ytcenter.settings.enableVolume) {
        if (ytcenter.settings.volume < 0) {
          ytcenter.settings.volume = 0;
        } else if (ytcenter.settings.volume > 100) {
          ytcenter.settings.volume = 100;
        }
        ytcenter.player.getReference().api.setVolume(ytcenter.settings.volume);
      }
      if (ytcenter.settings.mute && ytcenter.player.getReference().api.isMuted && !ytcenter.player.getReference().api.isMuted()) {
        ytcenter.player.getReference().api.mute();
      } else if (!ytcenter.settings.mute && ytcenter.player.getReference().api.isMuted && ytcenter.player.getReference().api.isMuted()) {
        ytcenter.player.getReference().api.unMute();
      }
      if (ytcenter.settings.preventAutoBuffer) {
        con.log("YTCenter: Stopping video");
        var __break = false;
        
        ytcenter.player.getReference().listener.addEventListener("onStateChange", function(state){
          __break = true;
        });
        var __tmp_pab = function(){
          ytcenter.player.getReference().api.stopVideo();
          if (!__break) {
            uw.setTimeout(__tmp_pab, 20);
          }
        };
        __tmp_pab();
      } else if (ytcenter.settings.preventAutoPlay) {
        con.log("YTCenter: Pausing video");
        var __break = false;
        
        ytcenter.player.getReference().listener.addEventListener("onStateChange", function(state){
          __break = true;
        });
        var __tmp_pap = function(){
          ytcenter.player.getReference().api.pauseVideo();
          if (!__break) {
            uw.setTimeout(__tmp_pap, 20);
          }
        };
        __tmp_pap();
      }
      
      if (this.getPlaybackQuality() != yt.playerConfig.args.vq) {
        con.log("YTCenter: Setting playback quality from " + this.getPlaybackQuality() + " to " + yt.playerConfig.args.vq);
        this.setPlaybackQuality(yt.playerConfig.args.vq);
      }
      
      ytcenter.player.getReference().listener.addEventListener("onStateChange", (function(player){
        return function(state){
          if (state == 0 && ytcenter.doRepeat && ytcenter.settings.enableRepeat) {
            ytcenter.player.getReference().api.playVideo();
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
    $CreateAspectButton();
    $CreateResizeButton();
    
    con.log("YTCenter: Placement System Init");
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
                return $HasCSS(e, "yt-uix-button-group") && elm == e;
              },
              style: {
                margin: '0px 4px 0px 0px'
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
        }
      ], ["watch-actions-right"]);
    } else {
      con.log("YTCenter: Initializing the Placement System (Watch7).");
      // buttonPlacementWatch7
      var ytcd = document.createElement("div");
      ytcd.id = "watch7-ytcenter-buttons";
      
      document.getElementById("watch7-sentiment-actions").parentNode.insertBefore(ytcd, document.getElementById("watch7-sentiment-actions"));
      
      ytcenter.placementsystem.init([
        {
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
              classNames: ['yt-uix-tooltip-reverse']
            }, {
              tagname: 'span',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button-group") && elm == e;
              },
              style: {
                margin: '0px 4px 0px 0px'
              },
              classNames: ['yt-uix-tooltip-reverse']
            }, {
              tagname: 'button',
              classNames: ['yt-uix-tooltip-reverse']
            }
          ]
        }, {
          id: 'watch7-ytcenter-buttons',
          elements: [
            {
              tagname: 'button',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button") && elm == e;
              },
              style: {
                margin: '0px 2px 0px 0px'
              },
              classNames: ['yt-uix-tooltip-reverse']
            }, {
              tagname: 'span',
              condition: function(elm, e){
                return $HasCSS(e, "yt-uix-button-group") && elm == e;
              },
              style: {
                margin: '0px 4px 0px 0px'
              },
              classNames: ['yt-uix-tooltip-reverse']
            }, {
              tagname: 'button',
              classNames: ['yt-uix-tooltip-reverse']
            }
          ]
        }
      ], []);
    }
    con.log("YTCenter: Registering Native Elements");
    ytcenter.placementsystem.registerNativeElements();
    con.log("YTCenter: Arranging Elements");
    ytcenter.placementsystem.arrangeElements();
    con.log(ytcenter);
    $UpdateChecker();
  };
  
  var ytembedinit = function(){
    yt = uw.yt;
    ytcenter.page = "embed";
    var playerConfig = yt.config_.PLAYER_CONFIG;
    if (playerConfig.html5) ytcenter.html5 = true;
    ytcenter.loadSettings();
    
    var embed_onload = function(){
      ytcenter.video.stream = ytcenter.parseStream(playerConfig);
      
      ytcenter.video.id = playerConfig.args.video_id;
      ytcenter.video.title = playerConfig.args.title;
      ytcenter.video.author = playerConfig.args.author;
      
      ytcenter.player.setTheme(ytcenter.settings.embed_playerTheme);
      ytcenter.player.setProgressColor(ytcenter.settings.embed_playerColor);
      
      if (ytcenter.settings.embed_enableAutoVideoQuality) {
        ytcenter.player.setQuality(ytcenter.settings.embed_autoVideoQuality);
      }
      if (ytcenter.settings.embed_removeAdvertisements) {
        playerConfig.args.csi_page_type = "watch5";
        var advertisementArguments = ['ad3_module', 'ad_channel_code_instream', 'ad_channel_code_overlay', 'ad_eurl', 'ad_flags', 'ad_host', 'ad_host_tier', 'ad_logging_flag', 'ad_preroll', 'ad_slots', 'ad_tag', 'ad_video_pub_id', 'aftv', 'afv', 'afv_ad_tag', 'afv_instream_max'];
        for (var i = 0; i < advertisementArguments.length; i++) {
          delete playerConfig.args[advertisementArguments[i]];
        }
      }
      if (!ytcenter.settings.embed_enableAnnotations) {
        playerConfig.args.iv_load_policy = 3;
      } else {
        playerConfig.args.iv_load_policy = 1;
      }
      if (typeof ytcenter.settings.embed_autohide != "undefined") {
        playerConfig.args.autohide = ytcenter.settings.embed_autohide;
      }
      if (ytcenter.settings.embed_preventAutoBuffer) {
        playerConfig.args.autoplay = "0";
      } else {
        playerConfig.args.autoplay = "1";
      }
      playerConfig.args.theme = ytcenter.settings.embed_playerTheme;
      playerConfig.args.color = ytcenter.settings.embed_playerColor;
      playerConfig.args.enablejsapi = "1";

      con.log("YTCenter: Updating YouTube Player");
      ytcenter.player.update(function(playerid, player, listener){
        con.log("YTCenter: YouTube Player Loaded");
        if (ytcenter.settings.embed_enableVolume) {
          if (ytcenter.settings.embed_volume < 0) {
            ytcenter.settings.embed_volume = 0;
          } else if (ytcenter.settings.embed_volume > 100) {
            ytcenter.settings.embed_volume = 100;
          }
          if (ytcenter.player.getReference().api.setVolume) {
            ytcenter.player.getReference().api.setVolume(ytcenter.settings.embed_volume);
          }
        }
        if (ytcenter.settings.embed_mute) {
          ytcenter.player.getReference().api.mute();
        } else if (!ytcenter.settings.embed_mute) {
          ytcenter.player.getReference().api.unMute();
        }
        if (ytcenter.html5) {
          if (ytcenter.settings.embed_preventAutoPlay) {
            ytcenter.player.getReference().api.pauseVideo();
          }
        } else {
          if (ytcenter.settings.embed_preventAutoBuffer) {
            con.log("YTCenter: Stopping video");
            var __break = false;
            
            ytcenter.player.getReference().listener.addEventListener("onStateChange", function(state){
              __break = true;
            });
            var __tmp_pab = function(){
              ytcenter.player.getReference().api.stopVideo();
              if (!__break) {
                uw.setTimeout(__tmp_pab, 20);
              }
            };
            __tmp_pab();
          } else if (ytcenter.settings.embed_preventAutoPlay) {
            var __break = false;
            
            ytcenter.player.getReference().listener.addEventListener("onStateChange", function(state){
              if (state === 2) {
                __break = true;
              }
            });
            var __tmp_pap = function(){
              ytcenter.player.getReference().api.pauseVideo();
              if (!__break) {
                uw.setTimeout(__tmp_pap, 20);
              }
            };
            __tmp_pap();
          }
        }
        if (ytcenter.player.getReference().api.getPlaybackQuality() != playerConfig.args.vq) {
          con.log("YTCenter: Setting playback quality from " + ytcenter.player.getReference().api.getPlaybackQuality() + " to " + playerConfig.args.vq);
          ytcenter.player.getReference().api.setPlaybackQuality(playerConfig.args.vq);
        }
      });
    };
    
    $XMLHTTPRequest({
      method: "GET",
      url: '/get_video_info?video_id=' + yt.config_.PLAYER_CONFIG.args.video_id,
      headers: {
        "Content-Type": "text/plain"
      },
      onload: function(response){
        if (response.responseText) {
          var o = {};
          var s = response.responseText.split("&");
          for (var i = 0; i < s.length; i++) {
            var ss = s[i].split("=");
            o[ss[0]] = decodeURIComponent(ss[1]);
          }
          con.log("YTCenter: Downloaded data:");
          con.log(o);
          delete o.title;
          delete o.author;
          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              playerConfig.args[key] = o[key];
            }
          }
          if (playerConfig.args.status === "ok") {
            embed_onload();
          } else {
            con.log("YTCenter: Couldn't load stream because (" + playerConfig.args.status + "): " + unescape(playerConfig.args.reason).replace(/[+]/g," "));
          }
        }
      }
    });
  };
  
  var dclcaller = function(){
    con.log("YTCenter: Called DOMContentLoaded listener");
    if (loc.href.match(/^http(s)?\:\/\/apiblog\.youtube\.com\//)) {
      return;
    } else if (loc.href.match(/.youtube\.com\/watch\?/)) {
      con.log("YTCenter: YouTube Watch Page Detected");
      ytwatchinit();
    } else if ((uw && uw.yt && uw.yt.config_ && uw.yt.config_.CHANNEL_ID) || loc.href.match(/.youtube\.com\/user\/(.*?)(\/)?$/) || loc.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/user\/(.*?)\/featured?/)) {
      con.log("YTCenter: YouTube Channel Featured Page Detected");
      ytchannelfeatureinit();
    } else if (loc.href.match(/.youtube\.com\/embed\//)) {
      con.log("YTCenter: YouTube Embed Page Detected");
      ytembedinit();
    } else if (loc.href.match(/.youtube\.com\//)) {
      con.log("YTCenter: YouTube Page Detected");
      yt = uw.yt;
      con.log(ytcenter);
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
    con.log("YTCenter: Adding Styles");
    $AddStyle(".ytcenter-fill,.ytcenter-fill #watch-player{width:100%!important;height:100%!important}");
    $AddStyle("div.ytcenter-menu-3d-hide span.ytcenter-menu-item-3d {display:none}");
    $AddStyle(".ytcenter-range{display:inline-block;cursor:default;position:relative;border:1px solid;outline:0;white-space:nowrap;word-wrap:normal;vertical-align:middle;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;border-color:#CCC #CCC #AAA;background:white;padding:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.ytcenter-range a.ytcenter-range-handle{position:absolute;top:-1px;left:0px;outline:none;margin-left:-.5em;cursor:default;padding:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}");
  };
  con.log("YTCenter: ReadyState: " + document.readyState);
  if (document.readyState == "complete" || document.readySate == "loaded" || document.readyState == "interactive") {
    con.log("YTCenter: Calling DOMContentLoaded function");
    dclcaller();
  } else {
    con.log("YTCenter: Adding DOMContentLoaded listener");
    document.addEventListener("DOMContentLoaded", function(){
      dclcaller();
    }, true);
  }
  if (loc.href.match(/^(http|https):\/\/dl\.dropbox\.com\/u\/13162258\/YouTube%20Center\/install/)) {
    con.log("YTCenter: Detected Install Page");
    uw['ytcenter'] = {
      installed: true,
      version: ytcenter.version,
      revision: ytcenter.revision
    };
  }

  con.log("YTCenter: At Scope End");
})();
