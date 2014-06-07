// ==UserScript==
// @name            YouTube Center Only Download
// @version         1.2
// @author          Jeppe Rune Mortensen (YePpHa)
// @description     This adds the download button from YouTube Center.
// @match           http://*.youtube.com/watch?*
// @match           https://*.youtube.com/watch?*
// @match           http://s.ytimg.com/yts/jsbin/*
// @match           https://s.ytimg.com/yts/jsbin/*
// @match           http://*.youtube.com/verify_age?next_url=/watch*
// @match           https://*.youtube.com/verify_age?next_url=/watch*
// @match           http://userscripts.org/scripts/source/124921.meta.js
// @updateVersion   9
// ==/UserScript==
(function(){
  function xhr(details) {
    if (typeof GM_xmlhttpRequest != "undefined") {
      GM_xmlhttpRequest(details);
      return true;
    } else {
      var xmlhttp;
      if (typeof XMLHttpRequest != "undefined") {
        xmlhttp = new XMLHttpRequest();
      } else if (typeof opera != "undefined" && typeof opera.XMLHttpRequest != "undefined") {
        xmlhttp = new opera.XMLHttpRequest();
      } else if (typeof uw != "undefined" && typeof uw.XMLHttpRequest != "undefined") {
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
      return true;
    }
    return false;
  }
  
  function getTitle() {
    var meta = document.getElementsByTagName("meta");
    for (var i = 0; i < meta.length; i++) {
      if (meta[i].getAttribute("name") == "title") {
        return meta[i].getAttribute("content");
      }
    }
  }
  
  function getFormatType(format) {
    if (streamTypes[format]) {
      return streamTypes[format];
    }
    return "Unknown";
  }
  
  function getQuality(quality) {
    if (streamQualities[quality]) {
      return streamQualities[quality];
    }
    return "Unknown";
  }
  
  function getQualityResolution(quality) {
    if (streamResolutions[quality]) {
      return streamResolutions[quality];
    }
    return "Unknown";
  }
  
  function getSignature(stream) {
    if (stream.sig) return stream.sig;
    if (stream.s) return decipherSignature(stream.s);
  }
   
  function updateSignatureDecipher() {
    var js = config.assets.js,
        regex = /function [a-zA-Z$0-9]+\(a\){a=a\.split\(""\);(.*?)return a\.join\(""\)}/g,
        regex2 = /function [a-zA-Z$0-9]+\(a\){a=a\.split\(""\);(((a=([a-zA-Z$0-9]+)\(a,([0-9]+)\);)|(a=a\.slice\([0-9]+\);)|(a=a\.reverse\(\);)|(var b=a\[0\];a\[0\]=a\[[0-9]+%a\.length\];a\[[0-9]+\]=b;)))*return a\.join\(""\)}/g;
      xhr({
        method: "GET",
        url: js,
        onload: function(response) {
          var a,i,b,v;
          
          if (response.responseText.match(regex2)) {
            a = regex2.exec(response.responseText)[0].split("{")[1].split("}")[0].split(";");
            _signatureDecipher = []; // Clearing signatureDecipher
            for (i = 1; i < a.length-1; i++) {
              b = a[i];
              if (b.indexOf("a.slice") !== -1) { // Slice
                v = b.split("(")[1].split(")")[0];
                _signatureDecipher.push({func: "slice", value: parseInt(v)});
              } else if (b.indexOf("a.reverse") !== -1) { // Reverse
                _signatureDecipher.push({func: "reverse", value: null});
              } else if ((a[i] + ";" + a[i+1] + ";" + a[i+2]).indexOf("var b=a[0];a[0]=a[") !== -1){ // swapHeadAndPosition
                v = (a[i] + ";" + a[i+1] + ";" + a[i+2]).split("var b=a[0];a[0]=a[")[1].split("%")[0];
                _signatureDecipher.push({func: "swapHeadAndPosition", value: parseInt(v)});
                i = i+2;
              } else { // swapHeadAndPosition (maybe it's deprecated by YouTube)
                v = b.split("(a,")[1].split(")")[0];
                _signatureDecipher.push({func: "swapHeadAndPosition", value: parseInt(v)});
              }
            }
          } else {
            a = regex.exec(response.responseText)[1];
            _signatureDecipher = []; // Clearing signatureDecoder
            _signatureDecipher.push({func: "code", value: a});
          }
        },
        onerror: function() {console.error("YTC[Only Download] => IO Error!");}
      });
  }
  function decipherSignature(signatureCipher, decipherRecipe){
    function swapHeadAndPosition(array, position) {
      var head = array[0];
      var other = array[position % array.length];
      array[0] = other;
      array[position] = head;
      return array;
    }
    if (!signatureCipher) return "";
    var cipherArray = signatureCipher.split(""), i;
    decipherRecipe = decipherRecipe || _signatureDecipher;
    
    for (i = 0; i < _signatureDecipher.length; i++) {
      if (_signatureDecipher[i].func === "code") {
        cipherArray = new Function("a", _signatureDecipher[i].value + "return a.join(\"\")")(cipherArray);
        if (!isArray(cipherArray) && decipherRecipe !== __signatureDecipher) {
          return signatureDecipher(signatureCipher, __signatureDecipher);
        }
      } else if (_signatureDecipher[i].func === "swapHeadAndPosition") {
        cipherArray = swapHeadAndPosition(cipherArray, _signatureDecipher[i].value);
      } else if (_signatureDecipher[i].func === "slice") {
        cipherArray = cipherArray.slice(_signatureDecipher[i].value);
      } else if (_signatureDecipher[i].func === "reverse") {
        cipherArray = cipherArray.reverse();
      }
    }
    
    return cipherArray.join("");
  }
  
  function downloadFile(itag) {
    if (!downloadIFrameElement) {
      initDownloadFrame();
    }
    
    for (var i = 0; i < streamInformation.length; i++) {
      if (streamInformation[i].itag == itag) {
        downloadIFrameElement.setAttribute("src", streamInformation[i].url + "&title=" + encodeURIComponent(title) + "&signature=" + encodeURIComponent(getSignature(streamInformation[i])));
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
    button.className = "yt-uix-button yt-uix-button-text yt-uix-tooltip" + (classNames ? " " + classNames : "");
    button.style.marginTop = "1px";
    button.setAttribute("title", title);
    button.setAttribute("type", "button");
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
  
  function getYouTubePlayerConfigVariables() {
    var uw = (function(){
      var a;
      try {
        a = unsafeWindow === window ? false : unsafeWindow;
      } finally {
        return a || (function(){
          try {
            var e = document.createElement('p');
            e.setAttribute('onclick', 'return window;');
            return e.onclick();
          } catch (e) {
          }
        }());
      }
    })();
    if (uw && uw.ytplayer && uw.ytplayer.config) return uw.ytplayer.config;
    if (document.body.innerHTML.indexOf("<script>var ytplayer = ytplayer || {};ytplayer.config = ") !== -1) {
      return JSON.parse(document.body.innerHTML.split("<script>var ytplayer = ytplayer || {};ytplayer.config = ")[1].split(";</script>")[0]);
    }
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
    xhr({
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
            if (updateElement) {
              updateElement.style.display = "block";
            }
          }
        }
      }
    });
  }

  function parseYouTubeFormats(ytplayer_config) {
    var fmtList = parseYouTubeFmtList(ytplayer_config.args.fmt_list);
    var streamList = parseYouTubeStreamList(ytplayer_config.args.url_encoded_fmt_stream_map);
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
        collection[collection.length] = coll;
      }
    }
    return collection;
  }
  
  function initUI() {
    var b = [];
    for (var key in stream) {
      b[b.length] = {
        text: "<b>" + getFormatType(key) + "</b>",
        className: "",
        style: "color:#666;font-size:0.9166em;padding-left:9px;"
      };
      for (var i = 0; i < stream[key].length; i++) {
        b[b.length] = {
          text: getFormatTitle(stream[key][i]),
          onclick: function() {
            downloadFile(this.getAttribute("itag"));
          },
          args: {
            itag: stream[key][i].itag
          }
        };
      }
    }
    b[b.length] = {
      text: "New update available, <a href=\"http://userscripts.org/scripts/show/" + updateId + "\">Install</a>.",
      className: "",
      style: "padding-top:7px;display:none;border-top:1px solid #666;text-align:center;",
      register: function(elm){
        updateElement = elm;
      }
    };
    var downloadMenu = createYouTubeMenu(b);
    var downloadButton = downloadButton = createYouTubeButton("Download List", "<span class=\"yt-uix-button-content\">Download</span><img class=\"yt-uix-button-arrow\" src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" alt=\"\">", downloadMenu, null, null);
    document.getElementById("watch7-sentiment-actions").appendChild(downloadButton);
  }
  
  function initDownloadFrame() {
    downloadIFrameElement = document.createElement("iframe");
    downloadIFrameElement.style.position = "absolute";
    downloadIFrameElement.style.top = "-100px";
    downloadIFrameElement.style.left = "-100px";
    downloadIFrameElement.style.width = "1px";
    downloadIFrameElement.style.height = "1px";
    downloadIFrameElement.style.border = "0";
    downloadIFrameElement.style.margin = "0";
    downloadIFrameElement.style.padding = "0";
    document.body.appendChild(downloadIFrameElement);
  }
  
  function init() {
    if (streamInformation.length > 0 && streamInformation[0].s)
      updateSignatureDecipher();
    initUI();
    checkForUpdates();
  }
  if (!location.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/))
    return;
  var updateVersion = 9,
      updateId = "124921",
      streamTypes = {
        'video/x-flv': 'FLV',
        'video/mp4': 'MP4',
        'video/webm': 'WebM',
        'video/3gpp': '3GP'
      },
      streamQualities = {
        'small': 'Low Definition',
        'medium': 'Standard Definition',
        'large': 'High Definition',
        'hd720': 'HD Definition',
        'hd1080': 'Full HD Definition',
        'highres': 'Original Definition'
      },
      streamResolutions = {
        'small': '240p',
        'medium': '360p',
        'large': '480p',
        'hd720': '720p',
        'hd1080': '1080p',
        'highres': 'Original'
      },
      downloadIFrameElement = null,
      updateElement = null,
      __signatureDecipher = [
        {func: "slice", value: 3},
        {func: "reverse", value: null},
        {func: "swapHeadAndPosition", value: 63},
        {func: "slice", value: 2},
        {func: "reverse", value: null},
        {func: "slice", value: 1}
      ],
      _signatureDecipher = __signatureDecipher,
      title = getTitle(),
      config = getYouTubePlayerConfigVariables(),
      streamInformation = parseYouTubeFormats(config),
      stream = splitYouTubeInformationByFormat(streamInformation);
  init();
})();