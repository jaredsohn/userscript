// ==UserScript==
// @name           YouTube Links Download
// @namespace      http://www.ferdhika-blog.blogspot.com/
// @description    Untuk mendownload video youtube.
// @author         Fherzzz
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @match          http://*.youtube.com/*
// @match          http://youtube.com/*
// @match          https://*.youtube.com/*
// @match          https://youtube.com/*
// @version        1.21
// ==/UserScript==

/* This is based on YouTube HD Suite 3.4.1 */

/* Tested on Firefox 5.0, Chrome 13 and Opera 11.50 */

(function() {

var SCRIPT_NAME = "YouTube Links Download";

var SCRIPT_UPDATE_LINK = "http://userscripts.org/scripts/source/110006.user.js"
var SCRIPT_LINK = "http://userscripts.org/scripts/source/110007.user.js";

var relInfo = {
  ver: 12100,
  ts: 2011091000,
  desc: "Tooltip positioning bug fix"
  };

// =============================================================================

var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
var doc = win.document;
var loc = win.location;

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

dom.offset = function(obj) {
  var x = 0;
  var y = 0;

  if(obj.getBoundingClientRect) {
    var box = obj.getBoundingClientRect();
    var owner = obj.ownerDocument;

    x = box.left + Math.max(owner.documentElement.scrollLeft, owner.body.scrollLeft) - owner.documentElement.clientLeft;
    y = box.top + Math.max(owner.documentElement.scrollTop, owner.body.scrollTop) - owner.documentElement.clientTop;

    return { left: x, top: y };
    }

  if(obj.offsetParent) {
    do {
			x += obj.offsetLeft - obj.scrollLeft;
			y += obj.offsetTop - obj.scrollTop;
      obj = obj.offsetParent;
    } while(obj);
    }

  return { left: x, top: y };
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

function parseStreamMap(map, value) {
  var fmtUrlList = [];

  forEach(value.split(","), function(idx, elm) {
    var elms = elm.replace(/(\\\/)/g, "/").replace(/(\\u0026)/g, "&").split("&");
    var obj = {};

    forEach(elms, function(idx, elm) {
      var kv = elm.split("=");
      obj[kv[0]] = decodeURIComponent(kv[1]);
      });

    obj.itag = +obj.itag;

    fmtUrlList.push(obj);
    });

  map.fmtUrlList = fmtUrlList;
  }

function parseFmtList(map, value) {
  var list = value.split(",");
  var fmtMap = {};

  forEach(list, function(idx, elm) {
    var elms = elm.replace(/(\\\/)/g, "/").split("/");

    var fmtId = elms[0];
    var res = elms[1];
    elms.splice(/*idx*/ 0, /*rm*/ 2);

    fmtMap[fmtId] = { res: res, vars: elms };
    });

  map.fmtMap = fmtMap;
  }

function getExt(elm) {
  return "";
  }

function getVideoInfo(url, callback) {
  function success(data) {
    var map = {};

    if(data.match(/<div\s+id="verify-details">/)) {
      logMsg("Skipping " + url);
      return;
      }

    if(data.match(/"url_encoded_fmt_stream_map":\s?"(.+?)"/))
      parseStreamMap(map, RegExp.$1);

    if(data.match(/"fmt_list":\s?"(.+?)"/))
      parseFmtList(map, RegExp.$1);

    if(data.match(/"t":\s?"(.+?)"/))
      map.t = RegExp.$1;

    if(data.match(/"video_id":\s?"(.+?)"/))
      map.videoId = RegExp.$1;

    if(data.match(/<span\s+id="eow-title".*title="(.+)"\s*>\s*\n/))
      map.title = unescHtmlEntities(RegExp.$1);

    callback(map);
    }

  // Entry point
  dom.ajax({ url: url, success: success });
  }

// -----------------------------------------------------------------------------

var CSS_PREFIX = "ujs-";

var HDR_LINKS_HTML_ID = CSS_PREFIX + "hdr-links-div";
var LINKS_HTML_ID = CSS_PREFIX + "links-cls";
var LINKS_TP_HTML_ID = CSS_PREFIX + "links-tp-div";
var UPDATE_HTML_ID = CSS_PREFIX + "update-div";

/* The !important attr is to override the page's specificity. */
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
  "div." + LINKS_HTML_ID + dom.emitCssStyles({
    "border-radius": "3px",
    "font-size": "90%",
    "position": "absolute",
    "left": "0",
    "top": "0",
    "z-index": "100"
    }) + "\n" +
  "#" + LINKS_TP_HTML_ID + dom.emitCssStyles({
    "background-color": "#eee",
    "border": "#aaa 1px solid",
    "padding": "3px 0",
    "text-align": "center",
    "text-decoration": "none",
    "width": "11em",
    "z-index": "110"
    }) + "\n" +
  "div." + LINKS_HTML_ID + " a" + dom.emitCssStyles({
    "display": "inline-block",
    "margin": "1px",
    "text-decoration": "none"
    }) + "\n" +
  "div." + LINKS_HTML_ID + " ." + CSS_PREFIX + "video" + dom.emitCssStyles({
    "display": "inline-block",
    "text-align": "center",
    "width": "3.5em"
    }) + "\n" +
  "div." + LINKS_HTML_ID + " ." + CSS_PREFIX + "quality" + dom.emitCssStyles({
    "display": "inline-block",
    "text-align": "center",
    "width": "5.5em"
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
  "." + CSS_PREFIX + "pos-rel" + dom.emitCssStyles({
    "position": "relative"
    }) + "\n" +
  "";

function condInsertHdr(divId) {
  if(dom.gE(HDR_LINKS_HTML_ID))
    return true;

  var insertPtNode = dom.gE(divId);
  if(!insertPtNode)
    return false;

  var divNode = dom.cE("div");
  divNode.id = HDR_LINKS_HTML_ID;

  insertPtNode.parentNode.insertBefore(divNode, insertPtNode);
  return true;
  }

function condInsertTooltip() {
  if(dom.gE(LINKS_TP_HTML_ID))
    return true;

  var toolTipNode = dom.cE("div");
  toolTipNode.id = LINKS_TP_HTML_ID;

  dom.attr(toolTipNode, "class", LINKS_HTML_ID);
  dom.attr(toolTipNode, "style", "display: none;");

  dom.append(doc.body, toolTipNode);

  dom.addEvent(toolTipNode, "mouseleave", function(event) {
    //logMsg("mouse leave");
    dom.attr(toolTipNode, "style", "display: none;");
    });
  }

function condInsertUpdateIcon() {
  if(dom.gE(UPDATE_HTML_ID))
    return;

  var divNode = dom.cE("a");
  divNode.id = UPDATE_HTML_ID;
  dom.append(doc.body, divNode);
  }

// -----------------------------------------------------------------------------

var STORE_ID = "ujsYtLinks";
var JSONP_ID = "ujsYtLinks";

var userConfig = {
  tagLinks: true
  };

var videoInfoCache = {};

var TAG_LINK_NUM_PER_BATCH = 5;
var INI_TAG_LINK_DELAY_MS = 200;
var SUB_TAG_LINK_DELAY_MS = 500;

// -----------------------------------------------------------------------------

function Links() {
  }

Links.prototype.init = function() {
  };

Links.prototype.getPreferredFmt = function(map) {
  var selElm = map.fmtUrlList[0];

  forEach(map.fmtUrlList, function(idx, elm) {
    if(getVideoName(elm.type).toLowerCase() != "webm") {
      selElm = elm;
      return false;
      }
    });

  return selElm;
  };

Links.prototype.checkFmts = function() {
  var me = this;

  if(!loc.href.match(/watch\?v=([a-zA-Z0-9_-]*)/))
    return false;

  var videoId = RegExp.$1;

  var url = loc.protocol + "//" + loc.host + "/watch?v=" + videoId;

  getVideoInfo(url, function(map) { me.showLinks("watch-headline-title", map); });
  };

Links.prototype.getChannelVideoId = function() {
  function success(data) {
    if(!data.match(/playnav\.setVideoId\("(.+?)"\);/))
      return;

    /* We can get most of the video info from this page, but are not able to
     get the video title, so we have to load the video page to find out. */

    var videoId = RegExp.$1;
    //logMsg("videoId: " + videoId);

    var url = loc.protocol + "//" + loc.host + "/watch?v=" + videoId;

    getVideoInfo(url, function(map) { me.showLinks("channel-body", map); });
    }

  // Entry point
  var me = this;

  dom.ajax({ url: loc.href, success: success });
  };

Links.prototype.emitLinks = function(map) {
  var s = [];

  forEach(map.fmtUrlList, function(idx, elm) {
    var fmtMap = map.fmtMap[elm.itag];
    var videoName = getVideoName(elm.type);

    var ahref = dom.emitHtml("a", {
      href: elm.url + "&title=" + cnvSafeFname(map.title + getExt(elm)),
      title: elm.itag + " | " + elm.type + " | " + elm.quality + " | " + fmtMap.vars.join(),
      },
      dom.emitHtml("span", { "class": CSS_PREFIX + "video " + CSS_PREFIX + videoName.toLowerCase() }, videoName) +
      dom.emitHtml("span", { "class": CSS_PREFIX + "quality " + CSS_PREFIX + elm.quality }, fmtMap.res));

    s.push(ahref);
    });

  return s.join("");
  };

Links.prototype.showLinks = function(divId, map) {
  forEach(map.fmtUrlList, function(idx, elm) {
    //logMsg(elm.itag + " " + elm.url);
    });

  //logMsg(JSON.stringify(map));

  if(!condInsertHdr(divId))
    return;

  dom.html(dom.gE(HDR_LINKS_HTML_ID), this.emitLinks(map));
  };

Links.prototype.tagLinks = function() {
  function addTag(hNode, map) {
    var elm = me.getPreferredFmt(map);
    var fmtMap = map.fmtMap[elm.itag];

    var img = dom.gT(hNode, "img") [0];

    //logMsg(dom.html(hNode));
    //logMsg("hNode " + dom.attr(hNode, "class"));
    //logMsg(dom.attr(img, "src"));
    //logMsg(dom.attr(img, "class"));

    var node = dom.cE("div");

    dom.attr(node, "class", LINKS_HTML_ID + " " + CSS_PREFIX + "quality " + CSS_PREFIX + elm.quality);

    dom.addEvent(node, "mouseenter", function(event) {
      //logMsg("mouse enter " + map.videoId);
      var pos = dom.offset(node);
      //logMsg("mouse enter: x " + pos.left + ", y " + pos.top);

      var toolTipNode = dom.gE(LINKS_TP_HTML_ID);

      dom.attr(toolTipNode, "style", "position: absolute; left: " + pos.left + "px; top: " + pos.top + "px");

      dom.html(toolTipNode, me.emitLinks(map));
      });

    node.href = elm.url + "&title=" + cnvSafeFname(map.title + getExt(elm));

    dom.attr(hNode.parentNode, "class", dom.attr(hNode.parentNode, "class") + " " + CSS_PREFIX + "pos-rel");
    hNode.parentNode.insertBefore(node, hNode);

    dom.html(node, fmtMap.res);
    }

  function getFmt(videoId, hNode) {
    if(videoInfoCache[videoId]) {
      addTag(hNode, videoInfoCache[videoId]);
      return;
      }

    var url;

    if(videoId.match(/.+==$/))
      url = loc.protocol + "//" + loc.host + "/cthru?key=" + videoId;
    else
      url = loc.protocol + "//" + loc.host + "/watch?v=" + videoId;

    getVideoInfo(url, function(map) {
      videoInfoCache[videoId] = map;
      addTag(hNode, map);
      });
    }

  // Entry point
  var me = this;

  if(!userConfig.tagLinks)
    return;

  var list = [];

  forEach(dom.gT("a"), function(idx, hNode) {
    if(dom.attr(hNode, CSS_PREFIX + "processed"))
      return;

    if(!hNode.href.match(/watch\?v=([a-zA-Z0-9_-]*)/) &&
     !hNode.href.match(/watch_videos.+?&video_ids=([a-zA-Z0-9_-]*)/))
      return;

    var videoId = RegExp.$1;

    if(dom.attr(hNode, "class") == "yt-button")
      return;

    if(dom.attr(hNode.parentNode, "class") == "video-time")
      return;

    if(dom.html(hNode).match(/video-logo/i))
      return;

    dom.attr(hNode, CSS_PREFIX + "processed", 1);

    var img = dom.gT(hNode, "img");

    if(img == null || img.length == 0)
      return;

    img = img[0];

    var imgSrc = dom.attr(img, "src") || "";

    if(imgSrc.indexOf("ytimg.com") < 0)
      return;

    var tnSrc = dom.attr(img, "thumb") || "";

    if(imgSrc.match(/.+?\/([a-zA-Z0-9_-]*)\/default\.jpg$/))
      videoId = RegExp.$1;
    else if(tnSrc.match(/.+?\/([a-zA-Z0-9_-]*)\/default\.jpg$/))
      videoId = RegExp.$1;

    //logMsg(idx + " " + hNode.href);
    //logMsg("videoId: " + videoId);

    list.push({ videoId: videoId, hNode: hNode });
    });

  forLoop({ num: list.length, inc: TAG_LINK_NUM_PER_BATCH, batchIdx: 0 }, function(idx) {
    var batchIdx = this.batchIdx++;
    var batchList = list.slice(idx, idx + TAG_LINK_NUM_PER_BATCH);

    setTimeout(function() {
      forEach(batchList, function(idx, elm) {
        //logMsg(batchIdx + " " + idx + " " + elm.hNode.href);
        getFmt(elm.videoId, elm.hNode);
        });
      }, INI_TAG_LINK_DELAY_MS + batchIdx * SUB_TAG_LINK_DELAY_MS);
    });
  };

Links.prototype.periodicTagLinks = function(delayMs) {
  function poll() {
    me.tagLinks();
    me.tagLinksTimerId = setTimeout(poll, 3000);
    }

  // Entry point
  var me = this;

  delayMs = delayMs || 0;

  if(me.tagLinksTimerId != null) {
    clearTimeout(me.tagLinksTimerId);
    delete me.tagLinksTimerId;
    }

  setTimeout(poll, delayMs);
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

  if(latestElm.desc != null)
    dom.attr(aNode, "title", latestElm.desc);

  dom.html(aNode, dom.emitHtml("b", SCRIPT_NAME + " " + getVerStr(relInfo.ver)) +
   "<br>Click to update to " + getVerStr(latestElm.ver));
  };

// -----------------------------------------------------------------------------

var inst = new Links();

inst.init();
inst.loadSettings();

dom.insertCss(CSS_STYLES);

condInsertTooltip();

if(loc.pathname.match(/\/watch/)) {
  inst.checkFmts();
  inst.periodicTagLinks();
  }
else if(loc.pathname.match(/\/user/)) {
  inst.getChannelVideoId();
  inst.periodicTagLinks();

  dom.addEvent(dom.gE("playnav-channel-header"), "click", function(e) {
    logMsg("click event");
    inst.periodicTagLinks(750);
    });
  }
else {
  inst.periodicTagLinks();

  var scrollHt = doc.documentElement.scrollHeight;

  dom.addEvent(win, "scroll", function(e) {
    var newScrollHt = doc.documentElement.scrollHeight;

    if(Math.abs(newScrollHt - scrollHt) < 100)
      return;

    logMsg("scroll by " + (newScrollHt - scrollHt));

    scrollHt = newScrollHt;

    inst.periodicTagLinks(100);
    });
  }

inst.chkVer();

}) ();