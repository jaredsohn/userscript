// ==UserScript==
// @name           Blip.tv Links
// @namespace      http://www.smallapple.net/
// @description    Show the available video links.
// @author         Ng Hun Yang
// @include        http://*.blip.tv/*
// @include        http://blip.tv/*
// @include        https://*.blip.tv/*
// @include        https://blip.tv/*
// @match          *://*.blip.tv/*
// @version        1.04
// ==/UserScript==

/* This is based on Blip.tv Video Download 1.4 */

/* Tested on Firefox 6.0, Chrome 13 and Opera 11.50 */

(function() {

// =============================================================================

var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
var doc = win.document;
var loc = win.location;

// =============================================================================

var SCRIPT_NAME = "BlipTv Links";

var SCRIPT_UPDATE_LINK = loc.protocol + "//userscripts.org/scripts/source/110701.user.js";
var SCRIPT_LINK = loc.protocol + "//userscripts.org/scripts/source/110702.user.js";

var relInfo = {
  ver: 10400,
  ts: 2014010100,
  desc: "Use page protocol (HTTP/HTTPS) to check for update"
  };

// =============================================================================

var dom = {};

dom.gE = function(id) {
  return doc.getElementById(id);
  };

dom.gT = function(dom, tag) {
  if(arguments.length == 1) {
    tag = dom;
    dom = doc;
    }

  return dom.getElementsByTagName(tag);
  };

dom.cE = function(tag) {
  return doc.createElement(tag);
  };

dom.cT = function(s) {
  return doc.createTextNode(s);
  };

dom.attr = function(obj, k, v) {
  if(arguments.length == 2)
    return obj.getAttribute(k);

  obj.setAttribute(k, v);
  };

dom.append = function(obj, child) {
  obj.appendChild(child);
  };

dom.html = function(obj, s) {
  if(arguments.length == 1)
    return obj.innerHTML;

  obj.innerHTML = s;
  };

dom.emitHtml = function(tag, attrs, body) {
  if(arguments.length == 2) {
    if(typeof(attrs) == "string") {
      body = attrs;
      attrs = {};
      }
    }

  var list = [];

  for(var k in attrs) {
    list.push(k + "='" + attrs[k].replace(/'/g, "\\'") + "'");
    }

  var s = "<" + tag + " " + list.join(" ") + ">";

  if(body != null)
    s += body + "</" + tag + ">";

  return s;
  };

dom.emitCssStyles = function(styles) {
  var list = [];

  for(var k in styles) {
    list.push(k + ": " + styles[k] + ";");
    }

  return " { " + list.join(" ") + " }";
  };

dom.ajax = function(opts) {
  function newXhr() {
    if(window.ActiveXObject) {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
          }

      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
          return null;
          }
      }

    if(window.XMLHttpRequest)
      return new XMLHttpRequest();

    return null;
    }

  function nop() {
    }

  // Entry point
  var xhr = newXhr();

  opts = addProp({
    type: "GET",
    async: true,
    success: nop,
    error: nop,
    complete: nop
    }, opts);

  xhr.open(opts.type, opts.url, opts.async);

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      var status = +xhr.status;

      if(status >= 200 && status < 300) {
        opts.success(xhr.responseText, "success");
        }
      else {
        opts.error(xhr, "error");
        }

      opts.complete(xhr);
      }
    };

  xhr.send("");
  };

dom.addEvent = function(e, type, fn) {
  function mouseEvent(event) {
    if(this != event.relatedTarget && !dom.isAChildOf(this, event.relatedTarget))
      fn.call(this, event);
    }

  // Entry point
  if(e.addEventListener) {
    var effFn = fn;

    if(type == "mouseenter") {
      type = "mouseover";
      effFn = mouseEvent;
      }
    else if(type == "mouseleave") {
      type = "mouseout";
      effFn = mouseEvent;
      }

    e.addEventListener(type, effFn, /*capturePhase*/ false);
    }
  else
    e.attachEvent("on" + type, function() { fn(win.event); });
  };

dom.insertCss = function (styles) {
  var ss = dom.cE("style");
  dom.attr(ss, "type", "text/css");

  var hh = dom.gT("head") [0];
  dom.append(hh, ss);
  dom.append(ss, dom.cT(styles));
  };

dom.isAChildOf = function(parent, child) {
  if(parent === child)
    return false;

  while(child && child !== parent) {
    child = child.parentNode;
    }

  return child === parent;
  };

// -----------------------------------------------------------------------------

function forLoop(opts, fn) {
  opts = addProp({ start: 0, inc: 1 }, opts);

  for(var idx = opts.start; idx < opts.num; idx += opts.inc) {
    if(fn.call(opts, idx, opts) === false)
      break;
    }
  }

function forEach(list, fn) {
  forLoop({ num: list.length }, function(idx) {
    return fn.call(list[idx], idx, list[idx]);
    });
  }

function addProp(dest, src) {
  for(var k in src) {
    if(src[k] != null)
      dest[k] = src[k];
    }

  return dest;
  }

function unescHtmlEntities(s) {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  }

function logMsg(s) {
  win.console.log(s);
  }

function cnvSafeFname(s) {
  s = s.replace(/:/g, "-").replace(/"/g, "'").replace(/[\\/|*?]/g, "_");
  return encodeURIComponent(s).replace(/'/g, "%27");
  }

function getVideoName(s) {
  var list = [
    { name: "FLV", codec: "video/x-flv" },
    { name: "M4V", codec: "video/x-m4v" },
    { name: "MP3", codec: "audio/mpeg" },
    { name: "MP4", codec: "video/mp4" },
    { name: "QT", codec: "video/quicktime" },
    { name: "WEBM", codec: "video/webm" },
    { name: "WMV", codec: "video/ms-wmv" }
    ];

  var name = "?";

  forEach(list, function(idx, elm) {
    if(s.match("^" + elm.codec)) {
      name = elm.name;
      return false;
      }
    });

  return name;
  }

// =============================================================================

var CSS_PREFIX = "ujs-";

var HDR_LINKS_HTML_ID = CSS_PREFIX + "links-div";
var UPDATE_HTML_ID = CSS_PREFIX + "update-div";

var CSS_STYLES =
  "#" + UPDATE_HTML_ID + dom.emitCssStyles({
    "background-color": "#f00",
    "border-radius": "2px",
    "color": "#fff",
    "padding": "5px",
    "text-align": "center",
    "text-decoration": "none",
    "position": "fixed",
    "top": "0.5em",
    "right": "0.5em",
    "z-index": "100"
    }) + "\n" +
  "#" + UPDATE_HTML_ID + ":hover" + dom.emitCssStyles({
    "background-color": "#0d0"
    }) + "\n" +
  "#" + HDR_LINKS_HTML_ID + dom.emitCssStyles({
    "background-color": "#eee",
    "border": "#ccc 1px solid",
    //"border-radius": "3px",
    "color": "#333",
    "font-size": "90%",
    "margin": "5px",
    "padding": "5px"
    }) + "\n" +
  "#" + HDR_LINKS_HTML_ID + " a" + dom.emitCssStyles({
    "background-color": "#fff",
    "border": "#ccc 1px solid",
    "border-radius": "3px",
    "color": "#000 !important",
    "display": "inline-block",
    "margin": "3px",
    "padding": "5px",
    "text-decoration": "none"
    }) + "\n" +
  "#" + HDR_LINKS_HTML_ID + " a:hover" + dom.emitCssStyles({
    "background-color": "#d1e1fa"
    }) + "\n" +
  "." + CSS_PREFIX + "video" + dom.emitCssStyles({
    "color": "#fff !important",
    "padding": "1px 3px"
    }) + "\n" +
  "." + CSS_PREFIX + "quality" + dom.emitCssStyles({
    "color": "#fff !important",
    "padding": "1px 3px"
    }) + "\n" +
  "." + CSS_PREFIX + "flv" + dom.emitCssStyles({
    "background-color": "#0dd"
    }) + "\n" +
  "." + CSS_PREFIX + "m4v" + dom.emitCssStyles({
    "background-color": "#777"
    }) + "\n" +
  "." + CSS_PREFIX + "mp3" + dom.emitCssStyles({
    "background-color": "#7ba"
    }) + "\n" +
  "." + CSS_PREFIX + "mp4" + dom.emitCssStyles({
    "background-color": "#777"
    }) + "\n" +
  "." + CSS_PREFIX + "qt" + dom.emitCssStyles({
    "background-color": "#f08"
    }) + "\n" +
  "." + CSS_PREFIX + "webm" + dom.emitCssStyles({
    "background-color": "#e0e"
    }) + "\n" +
  "." + CSS_PREFIX + "wmv" + dom.emitCssStyles({
    "background-color": "#c75"
    }) + "\n" +
  "." + CSS_PREFIX + "small" + dom.emitCssStyles({
    "color": "#000 !important"
    }) + "\n" +
  "." + CSS_PREFIX + "medium" + dom.emitCssStyles({
    "background-color": "#0d0"
    }) + "\n" +
  "." + CSS_PREFIX + "large" + dom.emitCssStyles({
    "background-color": "#00d"
    }) + "\n" +
  "." + CSS_PREFIX + "hd720" + dom.emitCssStyles({
    "background-color": "#f90"
    }) + "\n" +
  "." + CSS_PREFIX + "hd1080" + dom.emitCssStyles({
    "background-color": "#f00"
    }) + "\n" +
  "";

function condInsertHdr() {
  if(dom.gE(HDR_LINKS_HTML_ID))
    return true;

  var div = dom.cE("div");
  div.id = HDR_LINKS_HTML_ID;

  var node = dom.gE("Content");
  if(node == null)
    return false;

  node.parentNode.insertBefore(div, node);
  return true;
  }

function condInsertUpdateIcon() {
  if(dom.gE(UPDATE_HTML_ID))
    return;

  var div = dom.cE("a");
  div.id = UPDATE_HTML_ID;
  dom.append(doc.body, div);
  }

// -----------------------------------------------------------------------------

var STORE_ID = "ujsBtLinks";
var JSONP_ID = "ujsBtLinks";

var userConfig = {
  };

// -----------------------------------------------------------------------------

function Links() {
  }

Links.prototype.init = function() {
  };

Links.prototype.showLinks = function(files) {
  function getVideoQuality(wt, ht, videoBitRate) {
    if(ht >= 1080) {
      if(videoBitRate >= 2.5)
        return "hd1080";
      else
        return "large";
      }

    if(ht >= 720) {
      if(videoBitRate >= 2.0)
        return "hd720";
      else
        return "large";
      }

    if(ht >= 480) {
      if(videoBitRate >= 1.5)
        return "large";
      else
        return "medium";
      }

    if(ht >= 360) {
      if(videoBitRate >= 0.75)
        return "medium";
      else
        return "small";
      }

    return "small";
    }

  // Entry point
  if(!condInsertHdr())
    return;

  var s = [];

  files.sort(function(a, b) {
    var a = { wt: +a.media_width, ht: +a.media_height, sz: +a.filesize };
    var b = { wt: +b.media_width, ht: +b.media_height, sz: +b.filesize };

    if(a.ht < b.ht)
      return 1;
    else if(a.ht > b.ht)
      return -1;

    if(a.wt < b.wt)
      return 1;
    else if(a.wt > b.wt)
      return -1;

    if(a.sz < b.sz)
      return 1;
    else if(a.sz > b.sz)
      return -1;
    else
      return 0;
    });

  forEach(files, function(idx, elm) {
    //logMsg(idx + ": " + JSON.stringify(elm));

    //logMsg("fname: " + elm.media_src + " " + elm.filename);
    logMsg("url: " + elm.url);
    logMsg("  res " + elm.media_width + " x " + elm.media_height);
    logMsg("  len: " + elm.media_length + ", size: " + elm.filesize);
    logMsg("  role: " + elm.role + ", type: " + elm.archive_type + ", mime: " + elm.primary_mime_type);
    logMsg("  video: " + elm.video_codec + ", bitrate " + elm.video_bitrate + ", fps " + elm.fps);
    logMsg("  audio: " + elm.audio_codec + ", bitrate " + elm.audio_bitrate + ", samplerate " + elm.sample_rate);

    var videoName = getVideoName(elm.primary_mime_type);

    var wt = +elm.media_width;
    var ht = +elm.media_height;
    var videoLen = Math.round(+elm.media_length / 6) / 10;
    var fileSize = Math.round(+elm.filesize / 1000 / 100) / 10;
    var videoBitRate = +elm.video_bitrate / 1000;
    var samplingRate = +elm.sample_rate / 1000;
    //var calcBitRate = +elm.filesize / +elm.media_length / 1000;

    elm.quality = getVideoQuality(wt, ht, videoBitRate);

    var videoResStr = "";

    if(wt > 0 && ht > 0)
      videoResStr = " (" + wt + "x" + ht + ")";

    var ahref = dom.emitHtml("a", {
      href: elm.url,
      title: videoLen + "mins | " + fileSize + "MiB | " +
       elm.video_codec + " " + videoBitRate + "Mbps " + elm.fps + "fps | " +
       elm.audio_codec + " " + elm.audio_bitrate + "kbps " + samplingRate + "kHz"
      },
      dom.emitHtml("span", { "class": CSS_PREFIX + "video " + CSS_PREFIX + videoName.toLowerCase() }, videoName) +
      dom.emitHtml("span", { "class": CSS_PREFIX + "quality " + CSS_PREFIX + elm.quality }, elm.role + videoResStr));

      s.push(ahref);
    });

  dom.html(dom.gE(HDR_LINKS_HTML_ID), s.join(""));
  };

Links.prototype.checkFmts = function() {
  function success(data) {
    //logMsg(data);

    try {
      var obj = JSON.parse(data);
      me.showLinks(obj.Post.additionalMedia);
    } catch(e) {
      logMsg("Error: unable to parse data");
      }
    }

  // Entry point
  var me = this;

  if(document.getElementsByClassName("EpisodePlayer").length == 0)
    return;

  dom.ajax({
    url: loc.href + "?skin=json&no_wrap=1",
    success: success
    });
  };

// -----------------------------------------------------------------------------

Links.prototype.loadSettings = function() {
  var obj = localStorage[STORE_ID];

  if(obj == null)
    return;

  obj = JSON.parse(obj);

  this.lastChkReqTs = +obj.lastChkReqTs;
  this.lastChkTs = +obj.lastChkTs;
  this.lastChkVer = +obj.lastChkVer;
  };

Links.prototype.storeSettings = function() {
  localStorage[STORE_ID] = JSON.stringify({
    lastChkReqTs: this.lastChkReqTs,
    lastChkTs: this.lastChkTs,
    lastChkVer: this.lastChkVer
    });
  };

// -----------------------------------------------------------------------------

var UPDATE_CHK_INTERVAL = 3 * 86400;
var FAIL_TO_CHK_UPDATE_INTERVAL = 14 * 86400;

Links.prototype.chkVer = function(forceFlag) {
  if(this.lastChkVer > relInfo.ver) {
    this.showNewVer({ ver: this.lastChkVer });
    return;
    }

  var now = Math.round(+new Date() / 1000);

  //logMsg("lastChkReqTs " + this.lastChkReqTs + ", diff " + (now - this.lastChkReqTs));
  //logMsg("lastChkTs " + this.lastChkTs);
  //logMsg("lastChkVer " + this.lastChkVer);

  if(this.lastChkReqTs == null || now < this.lastChkReqTs) {
    this.lastChkReqTs = now;
    this.storeSettings();
    return;
    }

  if(now - this.lastChkReqTs < UPDATE_CHK_INTERVAL)
    return;

  if(this.lastChkReqTs - this.lastChkTs > FAIL_TO_CHK_UPDATE_INTERVAL)
    logMsg("Failed to check ver for " + ((this.lastChkReqTs - this.lastChkTs) / 86400) + " days");

  this.lastChkReqTs = now;
  this.storeSettings();

  win[JSONP_ID] = this;

  var script = dom.cE("script");
  script.type = "text/javascript";
  script.src  = SCRIPT_UPDATE_LINK;
  dom.append(doc.body, script);
  };

Links.prototype.chkVerCallback = function(data) {
  delete win[JSONP_ID];

  this.lastChkTs = Math.round(+new Date() / 1000);
  this.storeSettings();

  //logMsg(JSON.stringify(data));

  var latestElm = data[0];

  if(latestElm.ver <= relInfo.ver)
    return;

  this.showNewVer(latestElm);
  };

Links.prototype.showNewVer = function(latestElm) {
  function getVerStr(ver) {
    var verStr = "" + ver;

    var majorV = verStr.substr(0, verStr.length - 4) || "0";
    var minorV = verStr.substr(verStr.length - 4, 2);
    return majorV + "." + minorV;
    }

  // Entry point
  this.lastChkVer = latestElm.ver;
  this.storeSettings();

  condInsertUpdateIcon();

  var aNode = dom.gE(UPDATE_HTML_ID);

  aNode.href = SCRIPT_LINK;

  dom.html(aNode, dom.emitHtml("b", SCRIPT_NAME + " " + getVerStr(relInfo.ver)) +
   "<br>Click to update to " + getVerStr(latestElm.ver));
  };

// -----------------------------------------------------------------------------

var inst = new Links();

inst.init();
inst.loadSettings();

dom.insertCss(CSS_STYLES);

inst.checkFmts();

inst.chkVer();

}) ();
