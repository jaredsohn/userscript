// ==UserScript==
// @name            AlmasyGroup ِYouTube
// @namespace       http://www.facebook.com/AlmasyGroup
// @version         0.13.14.19
// @author          AlmasyGroup (Almasy)
// @description     جميع الخدمات اللتي قد تحتاجها على موقع اليوتيوب  وهذي الخدمه من قروب الالماسي العربي.
// @match           http://*.youtube.com/watch?*
// @match           https://*.youtube.com/watch?*
// @match           https://www.dropbox.com/sh/vv52j5ujbjl7oxi/*
// @match           https://www.dropbox.com/sh/vv52j5ujbjl7oxi/*
// @match           http://userscripts.org/scripts/source/131707.meta.js
// @updateVersion   66
// ==/UserScript==
(function(){
  var updateVersion = 66;
  var version = "0.13.14.19";
  var html5 = false;
  var yt;
  var ytcenter = {};
  ytcenter.loaded = function(){};
  if (!location.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/)) {
    if (location.href.match(/^(http|https):\/\/dl\.dropbox\.com\/u\/13162258\/YouTube%20Center\/install\.html/)) {
      var script = document.createElement("script");
      script.textContent = "(function(){isInstalled('" + version + "');})();";
      document.body.appendChild(script);
    }
    return;
  }
  if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
  };
  if(typeof GM_xmlhttpRequest === "undefined") {
    GM_xmlhttpRequest = function(/* object */ details) {
      details.method = details.method.toUpperCase() || "GET";
      if(!details.url) {
        throw("GM_xmlhttpRequest requires an URL.");
        return;
      }
      // build XMLHttpRequest object
      var oXhr, aAjaxes = [];
      if(typeof ActiveXObject !== "undefined") {
        var oCls = ActiveXObject;
        aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"};
        aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"};
        aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"};
      }
      if(typeof XMLHttpRequest !== "undefined")
         aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined};
      for(var i=aAjaxes.length; i--; )
        try{
          oXhr = new aAjaxes[i].cls(aAjaxes[i].arg);
          if(oXhr) break;
        } catch(e) {}
      if(oXhr) {
        if("onreadystatechange" in details)
          oXhr.onreadystatechange = function() { details.onreadystatechange(oXhr) };
        if("onload" in details)
          oXhr.onload = function() { details.onload(oXhr) };
        if("onerror" in details)
          oXhr.onerror = function() { details.onerror(oXhr) };
        oXhr.open(details.method, details.url, true);
        if("headers" in details)
          for(var header in details.headers)
            oXhr.setRequestHeader(header, details.headers[header]);
        if("data" in details)
          oXhr.send(details.data);
        else
          oXhr.send();
      } else
        throw("This Browser is not supported, please upgrade.")
    }
  }
  if(typeof GM_addStyle === "undefined") {
    function GM_addStyle(/* String */ styles) {
      var oStyle = document.createElement("style");
      oStyle.setAttribute("type", "text\/css");
      oStyle.appendChild(document.createTextNode(styles));
      document.getElementsByTagName("head")[0].appendChild(oStyle);
    }
  }
  if(typeof GM_log === "undefined") {
    function GM_log(log) {
      if(console)
        console.log(log);
      else
        alert(log);
    }
  }

  if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    if (localStorage) {
      this.GM_getValue = function(key, def) {
        return localStorage[key] || def;
      };
      this.GM_setValue = function(key, value) {
        return localStorage[key] = value;
      };
      this.GM_deleteValue = function(key) {
        return delete localStorage[key];
      };
    } else if (this.GM_getValue) {
      delete this.GM_getValue;
      delete this.GM_setValue;
      delete this.GM_deleteValue;
    }
  }
  var feather = false; // This is just to detect feather, YouTube AlmasyGroup doesn't support feather.
  var YouTubeType = {'video/x-flv': 'FLV', 'video/mp4': 'MP4', 'video/webm': 'WebM'};
  var YouTubeQuality = {'small': 'Low Definition', 'medium': 'Standard Definition', 'large': 'Enhanced Definition', 'hd720': 'High Definition', 'hd1080': 'Full High Definition', 'highres': 'Original Definition'};
  var YouTubeQualityResolution = {'small': '240p', 'medium': '360p', 'large': '480p', 'hd720': '720p', 'hd1080': '1080p', 'highres': 'Original'};
  var YouTubeVariables = {};
  var YouTubeStreamInformation = [];
  var YouTubeStreamSortedByFormat = {};
  var DownloadIFrame = null;
  var YouTubeVideoTitle = null;
  var YouTubeVideoAuthor = null;
  var CookieSettings = "YouTubeAlmasyGroupSettings";
  var elements = {};
  
  var settings = {
    'AutoResolution': 'highres', // YouTubeQuality [small = 240p, medium = 360p, large = 480p, hd720 = 720p, hd1080 = 1080p, highres > 1080p]
    'DownloadFormat': 'video/mp4', // [video/x-flv = FLV, video/mp4 = MP4, video/webm = WebM]
    'DownloadQuality': 'highres', // YouTubeQuality [small = 240p, medium = 360p, large = 480p, hd720 = 720p, hd1080 = 1080p, highres > 1080p]
    'EnableAutoResolution': true,
    'EnableDownloadButton': true,
    'EnableRepeatButton': true,
    'Language': 'ِen',
    'EnableMP3': false, // BETA
    'MP3URL': 'http://www.youtube-mp3.org/#v={videoid}', // BETA
    'AutoActivateRepeat': false,
    'EnableDocumentShortcuts': true,
    'Show3DInMenu': false,
    'PreventAutoPlay': false,
    'PreventAutoBuffering': false,
    'EnableUpdate': true,
    'UpdateInterval': 2*1000*60*60*24, // 2 Days
    'LastUpdateCheck': 0, // Never
    'DownloadFilename': '{قروب الالماسي العربي}',
    'EnableFilenameFix': false, // Only use this if you have problems downloading
    'AutoExpandDescription': false,
    'RemoveAdsPlayer': true,
    'PlayerSize': 'small', // small : Normal Size, large : Large Size, fill : Fill the whole window
    'AutoHideBar': 2 // 0 : None, 1 : All, 2 : Only Progressbar, 3 : Only Controlbar
  };
  var session = {'repeat': false};
  /*var translation = {
    en: {
      'Download': 'تحميل',
      'Repeat': 'اعادة',
      'Settings': 'اعدادات',
      'General': 'عام',
      'EnableutoResolution': 'تمكين الجودة تلقائي',
      'EnableDownloadButton': 'تمكين زر التحميل',
      'EnableRepeatButton': 'تمكين زر الاعادة',
      'EnableShortcutsonPage': 'تمكين اختصارات في الصفحة',
      'AutoExpandDescription': 'توسيع الوصف والفديو تلقائي',
      'RemoveAdvertisement': 'إزالة الاعلانات',
      'Video': 'فديو',
      'AutoResolution': 'جودة الفديو تلقائي',
      'AutoActivateRepeat': 'اعادة تشغيل الفديو تلقائي',
      'PreventAutoPlay': 'منع مقاطع الفديو من التشغيل التلقائي',
      'PreventAutoBuffering': 'منع التخزين المؤقت التلقائي',
      'PlayerSize': 'حجم المشغل',
      'AutoHideBar': 'اخفاء شريط الفديو تلقائي',
      'DownloadQuality': 'جودة التحميل',
      'DownloadFormat': 'صيغة التحميل',
      '': '3D.. عرضة في قائمة التحميل',
      '': 'اكتب اسم ملف ',
      '': 'عدم الأحرف الأبجدية الرقمية',
      '': 'صغير',
      '': 'كبير',
      '': 'ملئ الشاشة',
      '': 'لا شيء',
      '': 'كلا من شريط التقدم & شريط التحكم',
      '': 'شريط التقدم فقط',
      '': 'شريط التحكم فقط',
      '': 'تمكين MP3 في قائمة التحميل',
      '': 'يوتيوب MP3 خدمات',
      '': 'يوتيوب MP3',
      '': 'تمكين التحديث التلقائي',
      '': 'الفاصل الزمني للتحديث',
      '': 'دائماً',
      '': 'كل',
      '': 'يوم',
      '': 'اسبوع',
      '': 'شهر',
      '': 'أبدا',
      '': 'تحقق من وجود تحديث جديد',
      '': 'تحقق مرة أخرى',
      '': 'لا توجد تحديثات جديدة.',
      '': 'تحديث',
      '': 'حول',
      '': ''
      
    }
  };*/
  
  function getFilename(format) {
    var downloadFilenameReplace = {
      title: YouTubeVideoTitle,
      videoid: YouTubeVariables['args']['video_id'],
      author: YouTubeVideoAuthor,
      resolution: getQualityResolution(format.quality),
      itag: format.itag,
      dimension: format.dimension,
      width: format.dimension.split("x")[0],
      height: format.dimension.split("x")[1]
    };
    var filename = settings.DownloadFilename;
    var tmp = "";
    var startB = false;
    var func = "";
    var tmpName = "";
    var tmpFunc = "";
    var inFunc = false;
    for (var i = 0; i < filename.length; i++) {
      if (filename[i] == "{" && !startB && !inFunc) {
        startB = true;
      } else if (filename[i] == "}" && startB) {
        var t = "";
        for (var key in downloadFilenameReplace) {
          if (key == tmpName) {
            tmpName = "";
            t = downloadFilenameReplace[key];
            break;
          }
        }
        tmp += t;
        startB = false;
      } else if (startB) {
        tmpName += filename[i];
      } else {
        tmp += filename[i];
      }
    }
    
    return tmp;
  }
  
  function getFormatType(format) {
    if (YouTubeType[format]) {
      return YouTubeType[format];
    }
    return "Unknown";
  }
  
  function getQuality(quality) {
    if (YouTubeQuality[quality]) {
      return YouTubeQuality[quality];
    }
    return "Unknown";
  }
  
  function getQualityResolution(quality) {
    if (YouTubeQualityResolution[quality]) {
      return YouTubeQualityResolution[quality];
    }
    return "Unknown";
  }

  function getStream(format, quality) {
    for (var i = 0; i < YouTubeStreamInformation.length; i++) {
      if (YouTubeStreamInformation[i].type.format == format && YouTubeStreamInformation[i].quality == quality) return YouTubeStreamInformation[i];
    }
    return null;
  }

  function getStreamOrQualityLower(format, quality) {
    var s;
    for (var i = 0; i < 10; i++) {
      var s = getStream(format, quality);
      if (!s) {
        switch (quality) {
          case 'highres': quality = 'hd1080'; break;
          case 'hd1080': quality = 'hd720'; break;
          case 'hd720': quality = 'large'; break;
          case 'large': quality = 'medium'; break;
          case 'medium': quality = 'small'; break;
          default: break;
        }
      } else {
        break;
      }
    }
    if (s == null) {
      var qualities = ['small', 'medium', 'large', 'hd720', 'hd1080', 'highres'];
      for (var i = 0; i < qualities.length; i++) {
        var s = getStream(format, qualities[i]);
        if (!s) continue;
        return s;
      }
    }
    return s;
  }
  
  function downloadFileStreamQuality() {
    downloadFile(getStreamOrQualityLower(settings.DownloadFormat, settings.DownloadQuality).itag);
  }
  
  function downloadMP3File() {
    if (!settings.EnableMP3) return;
    if (settings.MP3URL == "") {
      alert("Please specify the mp3 url in the settings.");
    } else {
      window.open(settings.MP3URL.replace("{videoid}", YouTubeVariables.args.video_id));
    }
  }

  function downloadFile(itag) {
    if (!DownloadIFrame) {
      DownloadIFrame = document.createElement("iframe");
      DownloadIFrame.style.position = "absolute";
      DownloadIFrame.style.top = "-100px";
      DownloadIFrame.style.left = "-100px";
      DownloadIFrame.style.width = "1px";
      DownloadIFrame.style.height = "1px";
      DownloadIFrame.style.border = "0";
      DownloadIFrame.style.margin = "0";
      DownloadIFrame.style.padding = "0";
      document.body.appendChild(DownloadIFrame);
    }
    
    for (var i = 0; i < YouTubeStreamInformation.length; i++) {
      if (YouTubeStreamInformation[i].itag == itag) {
        DownloadIFrame.setAttribute("src", YouTubeStreamInformation[i].url + "&title=" + getVideoFilename(YouTubeStreamInformation[i]));
        break;
      }
    }
  }
  
  function stripCharacters(txt, chars) {
    var tmp = "";
    for (var i = 0; i < txt.length; i++) {
      var b = true;
      for (var key in chars) {
        if (txt[i] == key) {
          tmp += chars[key];
          b = false;
        }
      }
      if (b) tmp += txt[i];
    }
    
    return tmp;
  }
  
  function getVideoFilename(format) {
    var fn = getFilename(format);
    if (settings.EnableFilenameFix) {
      var tmp = "";
      for (var i = 0; i < fn.length; i++) {
        if (fn[i].match(/[0-9a-zA-Z ]/i)) {
          tmp += fn[i];
        }
      }
      return encodeURIComponent(tmp);
    }
    return encodeURIComponent(stripCharacters(fn, {'\\': '-', '/': '-', ':': '-', '*': '_', '"': '_', '?': '_', '<': '_', '>': '_', '|': '-'}));
  }
  
  function getFormatTitle(f) {
    return getQuality(f.quality) + ", " + getQualityResolution(f.quality) + " (" + f.dimension + ")" + (f.stereo3d && f.stereo3d == 1 ? "<span style=\"float:right\">&nbsp;3D</span>" : "");
  }
  
  function is3D(f) {
    return (f.stereo3d && f.stereo3d == 1 ? true : false);
  }
  
  function doSettingsChange() {
    if (settings.EnableDownloadButton) {
      elements.downloadButton.style.display = "inline";
    } else {
      elements.downloadButton.style.display = "none";
    }
    if (settings.EnableRepeatButton) {
      elements.repeatButton.style.display = "inline";
    } else {
      elements.repeatButton.style.display = "none";
    }
    if (settings.PlayerSize == 'small') {
      $RemoveClass(document.getElementById("page"), "watch-wide");
      $RemoveClass(document.getElementById("watch-video"), "medium");
      $RemoveClass(document.getElementById("page"), "ytcenterfill");
      document.getElementById("page").style.height = "";
      document.getElementById("content-container").style.height = "";
      document.getElementById("content").style.height = "";
      document.getElementById("watch-container").style.height = "";
      document.getElementById("watch-video-container").style.height = "";
      document.getElementById("watch-video").style.width = "";
      document.getElementById("watch-video").style.height = "";
      document.getElementById("watch-player").style.width = "";
      document.getElementById("watch-player").style.height = "";
    } else if (settings.PlayerSize == 'large') {
      $AddClass(document.getElementById("page"), "watch-wide");
      $AddClass(document.getElementById("watch-video"), "medium");
      $RemoveClass(document.getElementById("page"), "ytcenterfill");
      document.getElementById("page").style.height = "";
      document.getElementById("content-container").style.height = "";
      document.getElementById("content").style.height = "";
      document.getElementById("watch-container").style.height = "";
      document.getElementById("watch-video-container").style.height = "";
      document.getElementById("watch-video").style.width = "";
      document.getElementById("watch-video").style.height = "";
      document.getElementById("watch-player").style.width = "";
      document.getElementById("watch-player").style.height = "";
    } else if (settings.PlayerSize == 'fill') {
      $AddClass(document.getElementById("page"), "watch-wide");
      $RemoveClass(document.getElementById("watch-video"), "medium");
      $AddClass(document.getElementById("page"), "ytcenterfill");
      document.getElementById("page").style.height = "100%";
      document.getElementById("content-container").style.height = "100%";
      document.getElementById("content").style.height = "100%";
      document.getElementById("watch-container").style.height = "100%";
      document.getElementById("watch-video-container").style.height = "100%";
      document.getElementById("watch-video").style.width = "100%";
      document.getElementById("watch-video").style.height = "100%";
      document.getElementById("watch-player").style.width = "100%";
      if (html5 && window.navigator.vendor.match(/Google/)) {
        var height = "";
        if (typeof window.innerWidth != 'undefined') {
          height = window.innerHeight;
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
          height = document.documentElement.clientHeight;
        } else {
          height = document.getElementsByTagName('body')[0].clientHeight;
        }
        document.getElementById("watch-player").style.height = height + "px";
      } else {
        document.getElementById("watch-player").style.height = "100%";
      }
      document.getElementById("watch-player").scrollIntoView();
    }
    var a = getStreamOrQualityLower(settings.DownloadFormat, settings.DownloadQuality);
    var t = "Download " + getFormatTitle(a) + " " + getFormatType(a.type.format);
    elements.downloadButton.children[0].title = t;
    elements.downloadButton.children[0].setAttribute("data-tooltip-text", t);
    if (settings.EnableMP3) {
      elements.mp3title.style.display = "block";
      elements.mp3link.style.display = "block";
    } else {
      elements.mp3title.style.display = "none";
      elements.mp3link.style.display = "none";
    }
    if (settings.Show3DInMenu) {
      if (!elements.downloadmenu3d) elements.downloadmenu3d = [];
      for (var i = 0; i < elements.downloadmenu3d.length; i++) {
        elements.downloadmenu3d[i].style.display = "block";
      }
    } else {
      if (!elements.downloadmenu3d) elements.downloadmenu3d = [];
      for (var i = 0; i < elements.downloadmenu3d.length; i++) {
        elements.downloadmenu3d[i].style.display = "none";
      }
    }
  }
  
  function createSettingsMenu(div, e) {
    var g = document.createElement("span");
    g.className = "yt-uix-button-group";
    var l = 0;
    for (var key in e) {
      if (e.hasOwnProperty(key)) {
        l++;
      }
    }
    var i = 0;
    var builds = [];
    for (var key in e) {
      if (e.hasOwnProperty(key)) {
        var b = document.createElement("button");
        b.setAttribute("onclick", ";return false;");
        b.type = "button";
        b.className = "yt-uix-button yt-uix-button-default" + (i == 0 ? " start yt-uix-button-toggled" : "") + (i+1 == l ? " end" : "");
        b.setAttribute("role", "button");
        var s = document.createElement("span");
        s.className = "yt-uix-button-content";
        s.appendChild(document.createTextNode(e[key].text));
        b.appendChild(s);
        g.appendChild(b);
        var bu = document.createElement("div");
        if (i > 0) {
          bu.className = "hid";
        }
        
        var items = buildSettingItem(e[key].build);
        for (var k = 0; k < items.length; k++) {
          bu.appendChild(items[k]);
        }
        builds.push({
          element: b,
          build: bu
        });
        div.appendChild(bu);
        b.addEventListener('click', function(){
          var parent = this.parentNode;
          for (var i = 0; i < parent.children.length; i++) {
            $RemoveClass(parent.children[i], "yt-uix-button-toggled");
          }
          $AddClass(this, "yt-uix-button-toggled");
          for (var i = 0; i < builds.length; i++) {
            if (builds[i].element == this) {
              $RemoveClass(builds[i].build, "hid");
            } else {
              $AddClass(builds[i].build, "hid");
            }
          }
        }, false);
        i++;
      }
    }
    return g;
  }
  
  function buildSettingItem(build) {
    var labelWidth = "175px";
    var e = [];
    for (var i = 0; i < build.length; i++) {
      if (build[i].type === "checkbox") {
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var ts = document.createElement("span");
        ts.className = "yt-uix-form-input-checkbox-container" + (build[i].checked ? " checked" : "");
        var checkbox = document.createElement("input");
        checkbox.className = "yt-uix-form-input-checkbox";
        checkbox.type = "checkbox";
        if (build[i].checked) {

          checkbox.checked = true;
        }
        checkbox.addEventListener("click", build[i].event, false);
        ts.appendChild(checkbox);
        var tss = document.createElement("span");
        tss.className = "yt-uix-form-input-checkbox-element";
        ts.appendChild(tss);
        wrapper.appendChild(label);
        wrapper.appendChild(ts);
        e[e.length] = wrapper;
      } else if (build[i].type === "select") {
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var select = document.createElement("select");
        //select.className = "yt-uix-form-input-select-element";
        for (var key in build[i].options) {
          var option = document.createElement("option");
          option.appendChild(document.createTextNode(key));
          option.value = build[i].options[key];
          if (build[i].options[key] == build[i].selected) {
            option.selected = true;
          }
          select.appendChild(option);
        }
        select.addEventListener("change", build[i].event, false);
        select.addEventListener("change", function(){
          if (this.parentNode.lastChild == this) return;
          this.parentNode.lastChild.style.display = "inline-block";
        }, false);
        wrapper.appendChild(label);
        wrapper.appendChild(select);
        if (build[i].onApply) {
          var apply = document.createElement("a");
          apply.style.background = "URL(" + image_gear + ")";
          apply.style.width = "20px";
          apply.style.height = "20px";
          apply.style.display = "none";
          apply.addEventListener("click", build[i].onApply, false);
          wrapper.appendChild(apply);
        }
        e[e.length] = wrapper;
      } else if (build[i].type === "multichoice") {
        var name = "YouTube MP3 Service" + Math.random()*11;
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style['font-weight'] = "bold";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var multichoice = document.createElement("div");
        for (var j = 0; j < build[i].options.length; j++) {
          var option = document.createElement("div");
          option.addEventListener("click", build[i].event, false);
          option.setAttribute("data-url", build[i].options[j].value);
          var rt = document.createElement("span");
          rt.className = "yt-uix-form-input-radio-container" + (build[i].options[j].checked ? " checked" : "");
          var r = document.createElement("input");
          r.className = "yt-uix-form-input-radio";
          r.type = "radio";
          r.id = name;
          if (build[i].options[j].checked) {
            r.checked = true;
          }
          rt.appendChild(r);
          var rtt = document.createElement("span");
          rtt.className = "yt-uix-form-input-radio-element";
          rt.appendChild(rtt);
          option.appendChild(rt);
          var la = document.createElement("label");
          la.setAttribute("for", name);
          la.appendChild(document.createTextNode(build[i].options[j].name));
          option.appendChild(la);
          multichoice.appendChild(option);
        }
        wrapper.appendChild(label);
        wrapper.appendChild(multichoice);
        e[e.length] = wrapper;
      } else if (build[i].type === "button") {
        var wrapper = document.createElement("div");
        var b = document.createElement("button");
        if (build[i].register) {
          build[i].register(b, wrapper);
        }
        b.className = "yt-uix-button yt-uix-button-default";
        b.setAttribute("role", "button");
        b.innerHTML = build[i].label;
        b.addEventListener("click", build[i].event, false);
        wrapper.appendChild(b);
        if (build[i].children) {
          for (var j = 0; j < build[i].children.length; j++) {
            wrapper.appendChild(build[i].children[j]);
          }
        }
        e[e.length] = wrapper;
      } else if (build[i].type === "text") {
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var t = document.createElement("input");
        t.type = "text";
        //t.className = "yt-uix-form-input-text text-input"; // I will use this when I find a better way to show settings because it looks fat otherwise.
        if (build[i].value) {
          t.value = build[i].value;
        }
        t.addEventListener("change", build[i].event, false);
        wrapper.appendChild(label);
        wrapper.appendChild(t);
        e[e.length] = wrapper;
      } else if (build[i].type === "div") {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = build[i].html;
        e[e.length] = wrapper;
      }
    }
    return e;
  }
  
  function initSettingsUI() {
    /* Main Settings Div */
    elements.settingsDiv = document.createElement("div");
    elements.settingsDiv.style.display = "none";
    elements.settingsDiv.className = "yt-rounded";
    
    elements.settingsInnerDiv = document.createElement("div");
    elements.settingsInnerDiv.setAttribute("style", "background:#000000;border:2px solid #FFFF80;padding:10px;position:relative;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;box-shadow:0 1px 1px #00FF00;-moz-box-shadow:0 1px 1px #00FF00;-ms-box-shadow:0 1px 1px #00FF00;-webkit-box-shadow:0 1px 1px #00FF00;");

    elements.settingsInnerDiv.className = "watch-actions-panel";
    
    elements.settingsCloseDiv = document.createElement("div");
    elements.settingsCloseDiv.className = "close";
    elements.settingsCloseDiv.setAttribute("style", "position:absolute;top:5px;right:5px;cursor:pointer;");
    
    elements.settingsCloseImg = document.createElement("img");
    elements.settingsCloseImg.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
    elements.settingsCloseImg.className = "close-button";
    elements.settingsCloseImg.addEventListener("click", function(){
      $RemoveClass(elements.settingsButton, "yt-uix-button-toggled");
      elements.settingsDiv.style.display = "none";
    }, false);
    
    elements.settingsCloseDiv.appendChild(elements.settingsCloseImg);
    elements.settingsInnerDiv.appendChild(elements.settingsCloseDiv);
    /* Settings Button */
    elements.settingsButton = createYouTubeButton("تغير الاعدادات الخاصة بالاداة", "اعــدادات", null, "yt-uix-button-toggle", function(){
      if (elements.settingsDiv.style.display != "none") {
        elements.settingsDiv.style.display = "none";
        $RemoveClass(this, "yt-uix-button-toggled");
      } else {
        elements.settingsDiv.style.display = "block";
        $AddClass(this, "yt-uix-button-toggled");
      }
    });
    elements.ytelementLeft.appendChild(elements.settingsButton);
    elements.updateNote = document.createElement("span");
    elements.updateNote.setAttribute("style", "margin-left: 5px");
    elements.ytelementLeft.appendChild(elements.updateNote);
    
    /* Settings Menu Buttons */
    elements.group = createSettingsMenu(elements.settingsInnerDiv, {
      generalButton: {
        text: 'عام',
        build: [{
          label: 'عرض زر التحميل',
          type: 'checkbox',
          checked: (settings.EnableDownloadButton ? true : false),
          event: function(){
            if (this.checked) {
              settings.EnableDownloadButton = true;
            } else {
              settings.EnableDownloadButton = false;
            }
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'عرض زر الاعادة التلقائية',
          type: 'checkbox',
          checked: (settings.EnableRepeatButton ? true : false),
          event: function(){
            if (this.checked) {
              settings.EnableRepeatButton = true;
            } else {
              settings.EnableRepeatButton = false;
            }
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'تمكين الاختصارات على الصفحة',
          type: 'checkbox',
          checked: (settings.EnableDocumentShortcuts ? true : false),
          event: function(){
            if (this.checked) {
              settings.EnableDocumentShortcuts = true;
            } else {
              settings.EnableDocumentShortcuts = false;
            }
            saveSettings();
          }
        }, {
          label: 'توسيع تلقائي الوصف',
          type: 'checkbox',
          checked: (settings.AutoExpandDescription ? true : false),
          event: function(){
            if (this.checked) {
              settings.AutoExpandDescription = true;
            } else {
              settings.AutoExpandDescription = false;
            }
            saveSettings();
          }
        }, {
          label: 'إزالة وقتل الاعلانات',
          type: 'checkbox',
          checked: (settings.RemoveAdsPlayer ? true : false),
          event: function(){
            if (this.checked) {
              settings.RemoveAdsPlayer = true;
            } else {
              settings.RemoveAdsPlayer = false;
            }
            saveSettings();
          }
        }]
      },
      videoButton: {
        text: 'فديو',
        build: [{
          label: 'تمكين الجودة التلقائيه',
          type: 'checkbox',
          checked: (settings.EnableAutoResolution ? true : false),
          event: function(){
            if (this.checked) {
              settings.EnableAutoResolution = true;
            } else {
              settings.EnableAutoResolution = false;
            }
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: ' الجودة المناسبةلاتصالك',
          type: 'select',
          options: {
            'Original Definition': 'highres',
            'Full High Definition (1080p)': 'hd1080',
            'High Definition (720p)': 'hd720',
            'Enhanced Definition (480p)': 'large',
            'Standard Definition (360p)': 'medium',
            'Low Definition (240p)': 'small'
          },
          selected: settings.AutoResolution,
          event: function(){
            settings.AutoResolution = this.value;
            saveSettings();
          }
        }, {
          label: 'تنشيط تلقائي التكرار',
          type: 'checkbox',
          checked: (settings.AutoActivateRepeat ? true : false),
          event: function() {
            if (this.checked) {
              settings.AutoActivateRepeat = true;
            } else {
              settings.AutoActivateRepeat = false;
            }
            saveSettings();
          }
        }, {
          label: 'منع التشغيل التلقائي للفديو',
          type: 'checkbox',
          checked: (settings.PreventAutoPlay ? true : false),
          event: function() {
            if (this.checked) {
              settings.PreventAutoPlay = true;
            } else {
              settings.PreventAutoPlay = false;
            }
            saveSettings();
          },
          register: function(elm){
            elements.settingsPreventAutoPlayer = elm;
          }
        }, {
          label: 'منع التخزين المؤقت التلقائي',
          type: 'checkbox',
          checked: (settings.PreventAutoBuffering ? true : false),
          event: function() {
            if (this.checked) {
              settings.PreventAutoBuffering = true;
            } else {
              settings.PreventAutoBuffering = false;
            }
            saveSettings();
          }
        }, {
          label: 'الحجم المرغوب للفديو',
          type: 'select',
          options: {
            'صغير': 'small',
            'كبير': 'large',
            'ملئ المتصفح': 'fill'
          },
          selected: settings.PlayerSize,
          event: function(){
            settings.PlayerSize = this.value;
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'اخفاء الشريط من الفديو',
          type: 'select',
          options: {
            'None': 0,
            'شريط التقدم و شريط التحكم': 1,
            'شريط التقدم فقط': 2,
            'شريط التحكم فقط': 3
          },
          selected: settings.AutoHideBar,
          event: function(){
            settings.AutoHideBar = parseInt(this.value);
            saveSettings();
          }
        }
      ]},
      downloadButton: {
        text: 'خيارات التحميل',
        build: [{
          label: 'جودة التحميل',
          type: 'select',
          options: {
            'الجودة الاصلية': 'highres',
            '(1080p)جودة عالية جداً': 'hd1080',
            '(720p) جودةعالية': 'hd720',
            '(480p) جودة كبيرة': 'large',
            '(360p) جودة متوسطة': 'medium',
            '(240p) جودة صغيرة': 'small'
          },
          selected: settings.DownloadQuality,
          event: function(){
            settings.DownloadQuality = this.value;
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'صيغة التحميل',
          type: 'select',
          options: {
            'MP4': 'video/mp4',
            'WebM': 'video/webm',
            'FLV': 'video/x-flv'
          },
          selected: settings.DownloadFormat,
          event: function(){
            settings.DownloadFormat = this.value;
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: '3Dلعرض في قائمة التحميل ',
          type: 'checkbox',
          checked: (settings.Show3DInMenu ? true : false),
          event: function() {
            if (this.checked) {
              settings.Show3DInMenu = true;
            } else {
              settings.Show3DInMenu = false;
            }
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'اسم الملف',
          type: 'text',
          value: settings.DownloadFilename,
          event: function(){
            settings.DownloadFilename = this.value;
            saveSettings();
          }
        }, {
          label: 'عدم إزالة الأحرف الهجائية الرقمية',
          type: 'checkbox',
          checked: (settings.EnableFilenameFix ? true : false),
          event: function() {
            if (this.checked) {
              settings.EnableFilenameFix = true;
            } else {
              settings.EnableFilenameFix = false;
            }
            saveSettings();
          }
        }]
      },
      mp3Button: {
        text: 'MP3',
        build: [{
          label: 'تفعيل التحميل بصيغة MP3في القائمة',
          type: 'checkbox',
          checked: (settings.EnableMP3 ? true : false),
          event: function(){
            if (this.checked) {
              settings.EnableMP3 = true;
            } else {
              settings.EnableMP3 = false;
            }
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'هذي الخدمة عن طريقها تحميل الصوت من مقط الفديو فقط بدون فديو',
          type: 'multichoice',
          options: [
            {
              name: 'YouTube mp3',
              value: 'http://www.youtube-mp3.org/#v={videoid}',
              checked: (settings.MP3URL == 'http://www.youtube-mp3.org/#v={videoid}'? true : false)
            }
          ],
          event: function(){
            if (this.type === "radio") {
              settings.MP3URL = this.parentNode.children[1].value;
            } else if (this.type === "text") {
              settings.MP3URL = this.value;
            }
            doSettingsChange();
            saveSettings();
          }
        }]
      },
      updateButton: {
        text: 'التحديث',
        build: [{
          label: 'تشغيل التحديث التلقائي',
          type: 'checkbox',
          checked: (settings.EnableUpdate ? true : false),
          event: function(){
            if (this.checked) {
              settings.EnableUpdate = true;
            } else {
              settings.EnableUpdate = false;
            }
            doSettingsChange();
            saveSettings();
          }
        }, {
          label: 'التحديث على حسب التوقيت المناسب',
          type: 'select',
          options: {
            'دائماً': '0',
            'كل يوم': '86400000',
            'كل يومين': '172800000',
            'كل اسبوع': '604800000',
            'كل اسبوعين': '1209600000',
            'كل شهر': '2592000000',
            'أبداً': '-1'
          },
          selected: settings.UpdateInterval,
          event: function(){
            settings.UpdateInterval = this.value;
            doSettingsChange();
            saveSettings();
          }
        }, {
          type: 'button',
          label: 'تاكد من وجود تحديث',
          children: [
            elements.settingsUpdateText = document.createElement("span")
          ],
          event: function(){
            elements.settingsCheckForUpdateButton.disabled = true;
            doUpdate(function(response){
              if (response.readyState === 4 && response.status === 200) {
                elements.settingsUpdateText.style.padding = "0 5px";
                if (hasNewUpdate(getUpdate(response.responseText))) {
                  elements.settingsUpdateText.style.color = "#080";
                  elements.settingsUpdateText.innerHTML = "Found new update, <a href=\"http://userscripts.org/scripts/show/131707\" target=\"_blank\">install</a> the new update.";
                } else {
                  elements.settingsUpdateText.style.color = "#000";
                  elements.settingsUpdateText.innerHTML = "No new updates.";
                  elements.settingsCheckForUpdateButton.disabled = false;
                  elements.settingsCheckForUpdateButton.innerHTML = "Check Again";
                }
              } else {
                elements.settingsUpdateText.style.color = "#800";
                elements.settingsUpdateText.innerHTML = "Couldn't contact server!";
                elements.settingsCheckForUpdateButton.disabled = false;
                elements.settingsCheckForUpdateButton.innerHTML = "Try Again";
              }
            }, function(){
              elements.settingsUpdateText.style.color = "#800";
              elements.settingsUpdateText.innerHTML = "Couldn't contact server!";
              elements.settingsCheckForUpdateButton.disabled = false;
              elements.settingsCheckForUpdateButton.innerHTML = "Try Again";
            });
          },
          register: function(elm){
            elements.settingsCheckForUpdateButton = elm;
          }
        }]
      },
      aboutButton: {
        text: 'عن المبرمج',
        build: [{
          type: 'div',
          html: '<div align="center"><IMG SRC="http://img811.imageshack.us/img811/550/96189972.png"></div><BR/><BR/><h2>قروب الالماسي العربي</h2><br />إذا كان لديك أي مشاكل،  أسئلة ، ارجو الاتصال بي على برنامج سكايب .( Skype )..<br />وفي حالة عدم الرد وتم تحويلك على الرد الالي يمكنك ادخال رقم الكود الخاص بقروب الالماسي العربي لكي تدخل الروم الصوتي<br />  في القروب رقم الكود<br /> (131419)..<br />او ارسال رساله وسوف يتم الرد لاحقاً <br />للإتصال بنا: <a href="Skype:qq,,,,al,,almasy,,,,qq?call">اضغط هنا للاتصال بقروب الالماسي العربي</a>..........<a href="https://www.facebook.com/groups/Alalmasy/">قروب الالماسي العربي على الفيس بوك</a><br /><b /><h2 style="text-align: center;"><a href="https://www.facebook.com/groups/Alalmasy/"><span class="iconlink"><img class="icon-image" style="margin-top: 35px;" src="http://almasy.ucoz.com/facebook-skype-logos.png"alt="forum, two, users icon" width="160" height="80"></h2><br /><h2 style="text-align: center;" dir="ltr"><span style="color: rgb(255, 102, 0);">للتحدث على الاسكايب الكود : 131419</span> :<span class="iconlink"><a href="skype:qq,,,,al,,almasy,,,,qq?call"><img class="icon-image" style="margin-top: 35px;" src="http://www.iconfinder.com/data/icons/webinjection/48x48%20PNG/mic.png" alt="microphone, record icon" width="48" height="48"></a> : <a href="callto:qq,,,,al,,almasy,,,,qq">اضغط هنا</a> </span></h2><h2 style="text-align: center;"><span style="color: rgb(255, 102, 0);">لأضافة رقم الروم لجهة الأتصال</span> :<span class="iconlink"> </span><a href="skype:qq,,,,al,,almasy,,,,qq?add"><span class="iconlink"><img class="icon-image" style="margin-top: 35px;" src="http://iconfinder.net/data/icons/function_icon_set/users_two_48.png" alt="forum, two, users icon" width="48" height="48"></span></a><span class="iconlink">: <a href="skype:qq,,,,al,,almasy,,,,qq?add">اضغط هنا</a> </span><h2 style="text-align: center;"><a href="skype:?chat&blob=Itujr4EQq5eDO2XR-gBHiF0IxPdyHxCrqum4rnM9IF40CYqA_qBG_y4KoLuL8HAG_Nq2177s7YdXebd6xL1VPnf2-UPPg4RoOIEhyYn5WziRWqwXVspVpkl-aXJmujkIAuhfP7VQ3rOJNsFKac2NMpsYOq9ft4YL4DH8nCYjBoi4GG7u_Bo6yEqA_dNua4HM829wrghySWI7X36ItpngvU_hXoCmdAXi7AFwh321PAOvq3a5Bmk-m23AdAD_swo"><span class="iconlink"><img class="icon-image" style="margin-top: 35px;" src="http://almasy.ucoz.com/almasyChat1.png"alt="forum, two, users icon" width="188" height="148"></h2></h2>الحقوق محفوظة © 2011 - 2012 ِAlmasyGroup (قروب الالماسي).<br /><br /><BR/><BR/></p></div>'        }]
      }
    });
    
    elements.settingsInnerDiv.insertBefore(elements.group, elements.settingsInnerDiv.childNodes[0]);
    elements.settingsDiv.appendChild(elements.settingsInnerDiv);
    elements.main.appendChild(elements.settingsDiv);
  }
  
  function initUI() {
    elements.main = document.createElement("div");
    elements.main.style.margin = "0 0 5px 0";
    
    var b = [];
    for (var key in YouTubeStreamSortedByFormat) {
      b[b.length] = {
        text: "<b>"+getFormatType(key)+"</b>",
        className: "",
        style: "color:#00FF00;font-size:0.9166em;padding-left:9px;"
      };
      for (var i = 0; i < YouTubeStreamSortedByFormat[key].length; i++) {
        if (is3D(YouTubeStreamSortedByFormat[key][i])) {
          b[b.length] = {
            text: getFormatTitle(YouTubeStreamSortedByFormat[key][i]),
            onclick: function() {
              downloadFile(this.getAttribute("itag"));
            },
            args: {
              itag: YouTubeStreamSortedByFormat[key][i].itag
            },
            register: function(elm) {
              if (!elements.downloadmenu3d) {
                elements.downloadmenu3d = [];
              }
              elements.downloadmenu3d[elements.downloadmenu3d.length] = elm;
            }
          };
        } else {
          b[b.length] = {
            text: getFormatTitle(YouTubeStreamSortedByFormat[key][i]),
            onclick: function() {
              downloadFile(this.getAttribute("itag"));
            },
            args: {
              itag: YouTubeStreamSortedByFormat[key][i].itag
            }
          };
        }
      }
    }
    b[b.length] = {
      text: "<b>MP3 (External Site)</b>",
      className: "",
      style: "color:#00FF00;font-size:0.9166em;padding-left:9px;display:none",
      register: function(elm){
        elements.mp3title = elm;
      }
    };
    b[b.length] = {
      text: "Download from external site",
      onclick: function() {
        downloadMP3File();
      },
      style: "display:none",
      register: function(elm){
        elements.mp3link = elm;
      }
    };
    elements.downloadMenu = createYouTubeMenu(b);
    var a = getStreamOrQualityLower(settings.DownloadFormat, settings.DownloadQuality);
    elements.downloadButton = createYouTubeDoubleButton("Download " + getFormatTitle(a) + ", " + getFormatType(a.type.format), "<span class=\"yt-uix-button-content\">تحـــميل</span>", null, null, function(){
      downloadFileStreamQuality();
    }, "اخترمن القائمة الصيغة المناسبة", "<img class=\"yt-uix-button-arrow quimby_search_image\" src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" alt=\"\">", elements.downloadMenu, null, null);
    
    elements.repeatButton = createYouTubeButton("يعيد تشغيل الفديو تلقائي", "<img class=\"yt-uix-button-icon quimby_search_image\" src=\"http://www.pp11.com/pic_gif/kqo44571.gif\" style=\"width:50px;height:35px;\" alt=\"\" /><span class=\"yt-uix-button-content\">إعادة تشغيل تلقائي</span>", null, "yt-uix-button-toggle", function(){
      if (session.repeat) {
        session.repeat = false;
        $RemoveClass(this, "yt-uix-button-toggled");
      } else {
        session.repeat = true;
        $AddClass(this, "yt-uix-button-toggled");
      }
    });
    
    elements.ytbuttonswrapper = document.createElement("div");
    elements.ytelementLeft = document.createElement("div");
    elements.ytelementLeft.setAttribute("style", "float:left");
    elements.ytelementRight = document.createElement("div");
    elements.ytelementRight.setAttribute("style", "float:right");
    elements.ytelementClear = document.createElement("div");
    elements.ytelementClear.style.clear = "both";
    
    elements.ytbuttonswrapper.appendChild(elements.ytelementLeft);
    elements.ytbuttonswrapper.appendChild(elements.ytelementRight);
    elements.ytbuttonswrapper.appendChild(elements.ytelementClear);
    elements.main.appendChild(elements.ytbuttonswrapper);
    
    elements.ytelementRight.appendChild(elements.repeatButton);
    elements.ytelementRight.appendChild(document.createTextNode(" "));
    elements.ytelementRight.appendChild(elements.downloadButton);
    initSettingsUI();
    doSettingsChange();
    document.getElementById("watch-panel").insertBefore(elements.main, document.getElementById("watch-panel").firstChild);
  }

  function jsonReplacer(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
      return String(value);
    }
    return value;
  }

  function getTitle() {
    var meta = document.getElementsByTagName("meta");
    for (var i = 0; i < meta.length; i++) {
      if (meta[i].getAttribute("name") == "title") {
        return meta[i].getAttribute("content");
      }
    }
  }

  function init() {
    yt = unsafeWindow.yt;
    if (!document.getElementById("movie_player")) html5 = true;
    loadSettings();
    ytcenter.player = {};
    ytcenter.player.reference = yt.getConfig("PLAYER_REFERENCE");
    
    YouTubeVideoTitle = getTitle();
    YouTubeVideoAuthor = document.getElementById("watch-uploader-info").getElementsByClassName("yt-user-name")[0].textContent;
    
    YouTubeVariables = getYouTubeVariables();
    if (!feather) {
      YouTubeStreamInformation = parseYouTubeFormats(YouTubeVariables);
      YouTubeStreamSortedByFormat = splitYouTubeInformationByFormat(YouTubeStreamInformation);
      initUI();
      if (settings.AutoActivateRepeat) {
        session.repeat = true;
        $AddClass(elements.repeatButton, "yt-uix-button-toggled");
      } else {
        session.repeat = false;
      }
      
      if (settings.AutoExpandDescription) {
        $RemoveClass(document.getElementById("watch-description"), "yt-uix-expander-collapsed");
      }
      
      initYouTubePlayer();
      checkForUpdates();
    } else { // Feather
      var elm = document.getElementById("vo");
      if (elm) {
        var s = document.createElement("span");
        s.style.padding = "0 5px";
        s.innerHTML = "YouTube AlmasyGroup: Feather isn't supported! - ";
        var a = document.createElement("a");
        a.href = "javascript:void(0);";
        a.addEventListener("click", function(){
          GM_xmlhttpRequest({
            method: "GET",
            url: "/feather_beta",
            onload: function(response){
              var d = "toggle_feather=true&session_token=" + response.responseText.match(/'XSRF_TOKEN': '(.*?)'/)[1];
              GM_xmlhttpRequest({
                method: "POST",
                data: d,
                url: "/feather_beta",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function(response){
                  window.location.reload();
                }
              });
            }
          });
          var parent = this.parentNode;
          parent.removeChild(this);
          parent.appendChild(document.createTextNode("Loading..."));
        }, false);
        a.innerHTML = "Turn Off";
        s.appendChild(a);
        elm.appendChild(s);
        console.log("YouTube AlmasyGroup: Feather isn't supported.");
      } else {
        throw "YouTube AlmasyGroup: Couldn't fetch data from YouTube page - Be sure you have the lastest version.";
      }
    }
    if (settings.PlayerSize == 'small' || settings.PlayerSize == 'large') {
      if (document.getElementById("content")) {
        document.getElementById("content").scrollIntoView();
      }
    }
  }
  
  function update() {
    unsafeWindow['ytcentercallback'] = function(a){
      unsafeWindow['ytPlayerOnYouTubePlayerReady'](a);
      ytcenter.loaded(a);
    };
    yt.playerConfig.args.jsapicallback = "ytcentercallback";
    if (html5) {
      var v = document.getElementsByTagName("video")[0];
      if (v) {
        v.pause();
        yt.www.watch.player.updateConfig(yt.playerConfig);
        var player = yt.player.embed('watch-player', yt.playerConfig);
        yt.setConfig({'PLAYER_REFERENCE': player});
        ytcenter.player.reference = player;
      } else {
        document.addEventListener("DOMNodeInserted", function(e){
          if (e.target.nodeName == "VIDEO") {
            this.removeEventListener('DOMNodeInserted', arguments.callee, false);
            e.target.addEventListener("loadedmetadata", function(){
              this.pause();
              yt.www.watch.player.updateConfig(yt.playerConfig);
              var player = yt.player.embed('watch-player', yt.playerConfig);
              yt.setConfig({'PLAYER_REFERENCE': player});
              ytcenter.player.reference = player;
            }, false);
          }
        }, false);
      }
    } else {
      var forceUpdate = yt.www.watch.player.updateConfig(yt.playerConfig);
      var player = yt.player.update('watch-player', yt.playerConfig, true, unsafeWindow.gYouTubePlayerReady);
      yt.setConfig({'PLAYER_REFERENCE': player});
      ytcenter.player.reference = player;
    }
  }
  
  function addPlayerLoadedListener(callback) {
    ytcenter.loaded = callback;
  }

  function initYouTubePlayer() {
    if (settings.RemoveAdsPlayer && yt.playerConfig.args.ad_host) {
      var a = [
        'ad3_module', 'ad_channel_code_instream', 'ad_channel_code_overlay', 'ad_eurl',
        'ad_flags', 'ad_host', 'ad_host_tier', 'ad_logging_flag', 'ad_preroll', 'ad_slots',
        'ad_tag', 'ad_video_pub_id'
      ];
      for (var i = 0; i < a.length; i++) {
        if (!yt.playerConfig.args[a[i]]) continue;
        delete yt.playerConfig.args[a[i]];
      }
    }
    if (settings.AutoHideBar === 0) {
      yt.playerConfig.args.autohide = 0;
    } else if (settings.AutoHideBar === 1) {
      yt.playerConfig.args.autohide = 1;
    } else if (settings.AutoHideBar === 2) {
      yt.playerConfig.args.autohide = 2;
    } else if (settings.AutoHideBar === 3) {
      yt.playerConfig.args.autohide = 3;
    }
    var variablesToDelete = [
      'ratings', 'ratings_preroll', 'ratings_module', 'ratings3_module'
    ];
    for (var i = 0; i < variablesToDelete.length; i++) {
      if (!yt.playerConfig.args[variablesToDelete[i]]) continue;
      delete yt.playerConfig.args[variablesToDelete[i]];
    }
    addPlayerLoadedListener(function(){
      var player = yt.getConfig('PLAYER_REFERENCE');
      player.addEventListener('onStateChange', function(state){
        if (state == 0 && session.repeat) {
          player.playVideo();
        }
      });
      if (html5 && player.getPlayerState() == -1) {
        if (!unsafeWindow['ytcenter']) unsafeWindow['ytcenter'] = {};
        unsafeWindow['ytcenter'].html5init = function(state){
          if (state == 1) {
            unsafeWindow['ytcenter'].html5init = function(){};
            if (settings.PreventAutoBuffering) {
              player.stopVideo();
            } else if (settings.PreventAutoPlay) {
              player.pauseVideo();
            }
          }
        };
        player.addEventListener("onStateChange", "ytcenter.html5init");
      } else {
        if (settings.PreventAutoBuffering) {
          player.stopVideo();
        } else if (settings.PreventAutoPlay) {
          player.pauseVideo();
        }
      }
      var v = {};
      var t = 0;
      if (location.hash) {
        var h = location.hash.substring(1); // Removing the #
        var p = h.split("&");
        for (var i = 0; i < p.length; i++) {
          var a = p[i].split("=");
          if (a.length == 1) {
            v[p[i]] = "";
          } else {
            v[a[0]] = a[1];
          }
        }
      }
      if (v.t) {
        var sec = 0;
        if (v.t.match(/^([0-9]+)m(?:[0-9]+s)?$/)) {
          sec += parseInt(v.t.match(/^([0-9]+)m(?:[0-9]+s)?$/)[1])*60;
        }
        if (v.t.match(/^(?:[0-9]+m)?([0-9]+)s$/)) {
          sec += parseInt(v.t.match(/^(?:[0-9]+m)?([0-9]+)s$/)[1]);
        }
        t = sec;
      }
      if (t > 0) {
        player.seekTo(t, true);
      }
    });
    if (settings.AutoResolution && html5) {
      var a = document.createElement("video");
      if (a && a.canPlayType) {
        var mp4 = a.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"');
        var webm = a.canPlayType('video/webm; codecs="vp8.0, vorbis"');
        var q = {'small': 0, 'medium': 1, 'large': 2, 'hd720': 3, 'hd1080': 4, 'highres': 5};
        var aq = "small";
        for (var i = 0; i < YouTubeStreamInformation.length; i++) {
          if ((YouTubeStreamInformation[i].type.format === 'video/webm' && webm) || (YouTubeStreamInformation[i].type.format === 'video/mp4' && mp4)) {
            if (q[settings.AutoResolution] >= q[YouTubeStreamInformation[i].quality] && q[YouTubeStreamInformation[i].quality] > q[aq]) {
              aq = YouTubeStreamInformation[i].quality;
            }
          }
        }
        yt.playerConfig.args.vq = aq;
      } else {
        yt.playerConfig.args.vq = settings.AutoResolution;
      }
    } else if (settings.AutoResolution && !html5) {
      yt.playerConfig.args.vq = settings.AutoResolution;
    }
    yt.playerConfig.args.csi_page_type = "watch5";
    update();
    initShortcutsInDocument();
    addGoogleChromeCSS(".ytcenterfill{height:auto!important;}");
  }
  function addGoogleChromeCSS(rule) {
    if (!window.navigator.vendor.match(/Google/)) return;
    if (!document.styleSheets || !document.styleSheets[0] || !document.styleSheets[0].insertRule) return;
    document.styleSheets[0].insertRule(rule, 0);
  }
  function initShortcutsInDocument() {
    document.addEventListener("keydown", function(e){
      if (settings.EnableDocumentShortcuts) {
        e = e || window.event;
        if (document.activeElement.tagName.toLowerCase() === "input" || document.activeElement.tagName.toLowerCase() === "textarea") return;
        var player = yt.getConfig('PLAYER_REFERENCE');
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
  }

  /* Utils */
  function $(id) {
    return document.getElementById(id);
  }
  
  function $ToggleClass(element, c) {
    if ($HasClass(element, c)) {
      $RemoveClass(element, c);
    } else {
      $AddClass(element, c);
    }
  }
  
  function $AddClass(element, c) {
    var classes = element.className.split(" ");
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == c) return false;
    }
    if (element.className == "") {
      element.className = c;
    } else {
      element.className += " " + c;
    }
    return true;
  }
  
  function $RemoveClass(element, c) {
    var removed = false;
    var classes = element.className.split(" ");
    var newClasses = "";
    
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] != c) {
        if (newClasses != "") newClasses += " ";
        newClasses += classes[i];
      } else {
        removed = true;
      }
    }
    element.className = newClasses;
    return removed;
  }
  
  function $HasClass(element, c) {
    var classes = element.className.split(" ");
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] === c)
        return true;
    }
    return false;
  }
  
  function inject(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }

  function getHTML(element) {
    if (element == document)
      return document.documentElement.innerHTML;
    var d = document.createElement("div");
    d.appendChild(element);
    return d.innerHTML;
  }

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }
  
  function loadSettings() {
    var s = null;
    if (GM_getValue) {
      if ((s = readCookie(CookieSettings)) != null) {
        eraseCookie(CookieSettings);
      } else {
        s = GM_getValue(CookieSettings, null);
      }
    } else {
      s = readCookie(CookieSettings);
    }
    if (s) {
      var ca = s.split("&");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].split("=");
        var t = c[1].split("\\");
        if (t.length == 1) {
          settings[unescape(c[0])] = unescape(c[1]); break;
        } else {
          switch (t[0]) {
            case 'null': settings[unescape(c[0])] = null;break;
            case 'undefined': settings[unescape(c[0])] = undefined; break;
            case 'string': settings[unescape(c[0])] = unescape(t[1]); break;
            case 'number': settings[unescape(c[0])] = Number(unescape(t[1])); break;
            case 'boolean': settings[unescape(c[0])] = (unescape(t[1]) === 'true'); break;
            case 'array': settings[unescape(c[0])] = eval('(' + unescape(t[1]) + ')'); break;
            case 'object': settings[unescape(c[0])] = eval('(' + unescape(t[1]) + ')'); break;
            case 'function': settings[unescape(c[0])] = eval('(' + unescape(t[1]) + ')'); break;
            case 'regexp': settings[unescape(c[0])] = new RegExp(unescape(t[1])); break;
            case 'date': settings[unescape(c[0])] = new Date(unescape(t[1])); break;
            case 'error': settings[unescape(c[0])] = new Error(unescape(t[1])); break;
            default: settings[unescape(c[0])] = unescape(t[1]); break;
          }
        }
      }
    }
  }

  function saveSettings() {
    var toType = function(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }
    var s = "";
    var i = 0;
    for (var key in settings) {
      if (i > 0) s += "&"
      var t = toType(settings[key]);
      s += escape(key) + "=" + t + "\\";
      switch (t) {
        case 'null': s += "null";break;
        case 'undefined': s += "undefined";break;
        case 'string': s += escape(settings[key]); break;
        case 'number': s += escape(settings[key]); break;
        case 'boolean': s += escape(settings[key]); break;
        case 'array': s += escape(JSON.stringify(settings[key], jsonReplacer)); break;
        case 'object': s += escape(escape(settings[key])); break;
        case 'function': s += escape(settings[key].toString()); break;
        case 'regexp': s += escape(settings[key]); break;
        case 'date': s += escape(settings[key]); break;
        case 'error': s += escape(settings[key]); break;
        default: s += escape(settings[key]); break;
      }
      i++;
    }
    if (GM_setValue) {
      GM_setValue(CookieSettings, s);
    } else {
      createCookie(CookieSettings, s, 30*24);
    }
  }
  
  function checkForUpdates() {
    if (settings.EnableUpdate) {
      var t = (new Date).getTime();
      if (t-parseInt(settings.LastUpdateCheck, 10) >= settings.UpdateInterval) {
        settings.LastUpdateCheck = t;
        doUpdate(function(response){
          if (response.readyState === 4 && response.status === 200) {
            if (hasNewUpdate(getUpdate(response.responseText))) {
              elements.updateNote.innerHTML = "";
              var link = document.createElement("a");
              link.href = "http://userscripts.org/scripts/show/131707";
              link.target = "_blank";
              link.appendChild(document.createTextNode("Install"));
              elements.updateNote.appendChild(link);
              elements.updateNote.appendChild(document.createTextNode(" the new update."));
            }
          }
        });
        saveSettings();
      }
    }
  }
  
  function getUpdate(text) {
    return parseInt(/^\/\/ @updateVersion\s+([0-9]+)$/m.exec(text)[1], 10);
  }
  
  function hasNewUpdate(newVersion) {
    if (newVersion && newVersion > updateVersion) {
      return true;
    }
    return false;
  }
  
  function doUpdate(callback, error) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://userscripts.org/scripts/source/131707.meta.js",
      headers: {
        "Content-Type": "text/plain"
      },
      onload: callback,
      onerror: error
    });
  }

  /* YouTube Utils */
  function getYouTubeVariables() {
    var html = getHTML(document);
    var startTag = "yt.playerConfig = {";
    var endTag = "};";
    
    var i = html.search(startTag);
    if (i == -1) {
      feather = true;
      return {};
    } else {
      html = html.substring(i+startTag.length);
      i = html.search(endTag);
      html = html.substring(0, i);
      return eval('({' + html + '})');
    }
  }

  function parseYouTubeFmtList(list) {
    var parts = list.split(",");
    var collection = [];
    for (var i = 0; i < parts.length; i++) {
      var a = parts[i].split("/");
      collection[collection.length] = {
        itag: a[0],
        dimension: a[1]
      };
    }
    return collection;
  }

  function parseYouTubeStreamList(list) {
    var parts = list.split(",");
    var collection = [];
    for (var i = 0; i < parts.length; i++) {
      var coll = {};
      var args = parts[i].split("&");
      for (var j = 0; j < args.length; j++) {
        var keys = args[j].split("=");
        coll[keys[0]] = unescape(keys[1]);
      }
      if (coll.type.match(/[0-9a-zA-Z]+\/[0-9a-zA-Z]+;\+(.*)/)) {
        var tmp = coll.type.split(";");
        
        var ff = tmp[0];
        var fe = "";
        if (tmp.length > 2) {
          var t = "";
          for (var j = 1; j < tmp.length; j++) {
            t += tmp[j];
          }
          fe = t;
        } else {
          fe = tmp[1];
        }
        coll.type = {
          format: ff,
          extra: fe
        };
      } else {
        coll.type = {
          format: coll.type,
          extra: ""
        };
      }
      collection[collection.length] = coll;
    }
    return collection;
  }

  function parseYouTubeFormats(yt) {
    var fmtList = parseYouTubeFmtList(yt.args.fmt_list);
    var streamList = parseYouTubeStreamList(yt.args.url_encoded_fmt_stream_map);
    var collection = [];
    for (var i = 0; i < streamList.length; i++) {
      var fl = null;
      for (var j = 0; j < fmtList.length; j++) {
        if (streamList[i].itag != fmtList[j].itag) continue;
        fl = fmtList[j];
        break;
      }
      if (fl == null) {
        collection[collection.length] = streamList[i];
      } else {
        var coll = streamList[i];
        coll.dimension = fl.dimension;
        coll.unknown1 = fl.unknown1;
        coll.unknown2 = fl.unknown2;
        coll.unknown3 = fl.unknown3;
        collection[collection.length] = coll;
      }
    }
    return collection;
  }

  function createYouTubeButton(title, html, menu, classNames, onclick) {
    var button = document.createElement("button");
    button.innerHTML = html;
    if (menu) {
      button.appendChild(menu);
    }
    button.type = "button";
    button.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-default" + (classNames ? " " + classNames : "");
    button.title = title;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("onclick", ";return false;");
    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip-text", title);
    if (onclick) {
      button.addEventListener("click", onclick, false);
    }
    return button;
  }

  function createYouTubeDoubleButton(title, html, menu, classNames, onclick, title2, html2, menu2, classNames2, onclick2) {
    var spn = document.createElement("span");
    spn.setAttribute("dir", "ltr");
    spn.className = "yt-uix-button-group watch show-label";
    
    var button = document.createElement("button");
    button.innerHTML = html;
    if (menu) {
      button.appendChild(menu);
    }
    button.type = "button";
    button.className = "start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-default" + (classNames ? " " + classNames : "");
    button.title = title;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("onclick", ";return false;");
    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip-text", title);
    if (onclick) {
      button.addEventListener("click", onclick, false);
    }
    
    spn.appendChild(button);
    
    var button2 = document.createElement("button");
    button2.innerHTML = html2;
    if (menu2) {
      button2.appendChild(menu2);
    }
    button2.type = "button";
    button2.className = "end yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-default" + (classNames2 ? " " + classNames2 : "");
    button2.title = title2;
    button2.setAttribute("aria-pressed", "false");
    button2.setAttribute("onclick", ";return false;");
    button2.setAttribute("role", "button");
    button2.setAttribute("data-tooltip-text", title2);
    if (onclick2) {
      button2.addEventListener("click", onclick2, false);
    }
    
    spn.appendChild(button2);
    
    return spn;
  }

  function createYouTubeMenu(build) {
    var menu = document.createElement("div");
    menu.className = "yt-uix-button-menu hid";
    for (var i = 0; i < build.length; i++) {
      var item = document.createElement("span");
      item.className = (build[i].className || build[i].className == "" ? build[i].className : "yt-uix-button-menu-item");
      if (build[i].style) {
        item.setAttribute("style", build[i].style);
      }
      item.setAttribute("onclick", ";return false;");
      item.innerHTML = build[i].text;
      if (build[i].onclick) {
        item.addEventListener("click", build[i].onclick, false);
      }
      if (build[i].args) {
        for (var key in build[i].args) {
          item.setAttribute(key, build[i].args[key]);
        }
      }
      if (build[i].register) {
        build[i].register(item);
      }
      menu.appendChild(item);
    }
    return menu;
  }

  function splitYouTubeInformationByFormat(informations) {
    var collection = {};
    for (var i = 0; i < informations.length; i++) {
      if (!collection[informations[i].type.format]) {
        collection[informations[i].type.format] = [];
      }
      var l = collection[informations[i].type.format].length;
      collection[informations[i].type.format][l] = informations[i];
    }
    return collection;
  }

  /* Initializing */
  init();
  /* END OF DOCUMENT */
})();