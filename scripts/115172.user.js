// ==UserScript==
// @name            YouTube Save As
// @version         3.0
// @author          Alex Gresh
// @description     Adds a button to save the playing video as an MP4, Flv, or other format.
// @include         http://www.youtube.com/watch?*
// @include         https://www.youtube.com/watch?*
// @include         http:/m.youtube.com/watch?*
// @include         https://m.youtube.com/watch?*
// @updateVersion   1
// ==/UserScript==
(function(){
  if (!location.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/)) {
    return;
  }
  var updateVersion = 6;
  var updateId = "124921";
  var YouTubeType = {
    'video/x-flv': '.flv (Flash Video)',
    'video/mp4': '.mp4 (Media Player 4)',
    'video/webm': 'WebM (General Streaming Video)',
    'video/3gpp': '3GP (iPod Video)'
  };
  var YouTubeQuality = {
    'small': 'Low Definition',
    'medium': 'Standard Definition',
    'large': 'High Definition',
    'hd720': 'HD Definition',
    'hd1080': 'Full HD Definition',
    'highres': 'Original Definition'
  };
  var YouTubeQualityResolution = {
    'small': '240p',
    'medium': '360p',
    'large': '480p',
    'hd720': '720p',
    'hd1080': '1080p',
    'highres': 'Original'
  };
  var YouTubeVariables = {};
  var YouTubeStreamInformation = [];
  var YouTubeStreamSortedByFormat = {};
  var DownloadIFrame = null;
  var YouTubeVideoTitle = null;
  var YouTubeUpdateElement = null;
  
  function getTitle() {
    var meta = document.getElementsByTagName("meta");
    for (var i = 0; i < meta.length; i++) {
      if (meta[i].getAttribute("name") == "title") {
        return meta[i].getAttribute("content");
      }
    }
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
  
  function downloadFile(itag) {
    if (!DownloadIFrame) {
      initDownloadFrame();
    }
    
    for (var i = 0; i < YouTubeStreamInformation.length; i++) {
      if (YouTubeStreamInformation[i].itag == itag) {
        DownloadIFrame.setAttribute("src", YouTubeStreamInformation[i].url + "&title=" + encodeURIComponent(YouTubeVideoTitle) + "&signature=" + encodeURIComponent(YouTubeStreamInformation[i].sig));
        break;
      }
    }
  }
  
  function createYouTubeButton(title, html, menu, classNames, onclick) {
    var button = document.createElement("button");
    button.innerHTML = html;
    if (menu) {
      button.appendChild(menu);
    }
    button.type = "button";
    button.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" + (classNames ? " " + classNames : "");
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
  
  function getFormatTitle(f) {
    return getQuality(f.quality) + ", " + getQualityResolution(f.quality) + " (" + f.dimension + ")" + (f.stereo3d && f.stereo3d == 1 ? "<span style=\"float:right\">&nbsp;3D</span>" : "");
  }
  
  function is3D(f) {
    return (f.stereo3d && f.stereo3d == 1 ? true : false);
  }
  
  function getYouTubeVariables() {
    if (window.navigator && window.navigator.vendor && window.navigator.vendor.match(/Google|Maxthon/)) {
      var div = document.createElement("div");
      div.setAttribute("onclick", "return window;");
      unsafeWindow = div.onclick();
    } else if (typeof unsafeWindow == "undefined") {
      var div = document.createElement("div");
      div.setAttribute("onclick", "return window;");
      unsafeWindow = div.onclick();
    }
    return unsafeWindow.yt.playerConfig;
  }

  function parseYouTubeFmtList(list) {
    var parts = list.split(",");
    var collection = [];
    for (var i = 0; i < parts.length; i++) {
      var a = parts[i].split("/");
      collection[collection.length] = {
        itag: a[0],
        dimension: a[1],
        unknown1: a[2],
        unknown2: a[3],
        unknown3: a[4]
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
  
  function checkForUpdates() {
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://userscripts.org/scripts/source/" + updateId + ".meta.js",
      headers: {
        "Content-Type": "text/plain"
      },
      onload: function (response) {
        var nv;
        if (response.readyState === 4 && response.status === 200) {
          nv = parseInt(/^\/\/ @updateVersion\s+([0-9]+)$/m.exec(response.responseText)[1], 10);
          if (nv && nv > updateVersion) {
            if (YouTubeUpdateElement) {
              YouTubeUpdateElement.style.display = "block";
            }
          }
        }
      }
    });
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
  
  function initUI() {
    var b = [];
    for (var key in YouTubeStreamSortedByFormat) {
      b[b.length] = {
        text: "<b>"+getFormatType(key)+"</b>",
        className: "",
        style: "color:#666;font-size:0.9166em;padding-left:9px;"
      };
      for (var i = 0; i < YouTubeStreamSortedByFormat[key].length; i++) {
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
    b[b.length] = {
      text: "New update available, <a href=\"http://userscripts.org/scripts/" + updateId + "\">Install</a>.",
      className: "",
      style: "padding-top:7px;display:none;border-top:1px solid #666;text-align:center;",
      register: function(elm){
        YouTubeUpdateElement = elm;
      }
    };
    var downloadMenu = createYouTubeMenu(b);
    var downloadButton = downloadButton = createYouTubeButton("Download List", "<span class=\"yt-uix-button-content\">Save as</span><img class=\"yt-uix-button-arrow quimby_search_image\" src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" alt=\"\">", downloadMenu, null, null);
    document.getElementById("watch-actions").insertBefore(downloadButton, document.getElementById("watch-share"));
  }
  
  function initDownloadFrame() {
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
  
  function init() {
    YouTubeVideoTitle = getTitle();
    YouTubeVariables = getYouTubeVariables();
    YouTubeStreamInformation = parseYouTubeFormats(YouTubeVariables);
    YouTubeStreamSortedByFormat = splitYouTubeInformationByFormat(YouTubeStreamInformation);
    initUI();
    checkForUpdates();
  }
  init();
})();