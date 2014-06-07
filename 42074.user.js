// ==UserScript==
// @name           Stop BBC News Slideshow
// @namespace      userscripts.org/users/80219
// @description    Stop the BBC News slideshow from autoplaying
// @include        http://news.bbc.co.uk/*
// ==/UserScript==

var scriptUrl = [], scriptSrc = [];

var ssScripts = document.evaluate("//script[contains(@src,'slideshow.js')]",
                                  document,
                                  null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                  null);

for(var si = 0; si < ssScripts.snapshotLength; ++si) {
  scriptUrl.push(ssScripts.snapshotItem(si).src);
}

if(scriptUrl.length == 0) return;

var ssDefs = document.evaluate("//script[contains(text(),'bbc.fmtj.apps.slideshow.createSlideShow')]",
                               document,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                               null);

// Check whether a string representing a js function is complete, i.e. has the opening and closing
// brackets of "function(...)", taking into account that "..." might contain brackets too.
function IsFunctionSane(funcStr) {
  var bracketLevel = 0, isEscape = false, isInSglQuotes = false, isInDblQuotes = false;
  for(var i = 0; i < funcStr.length; ++i) {
    var c = funcStr.charAt(i);
    if(c=='\\' && !isEscape) isEscape = true;
    else if(c=='('  && !isEscape && !isInSglQuotes && !isInDblQuotes) bracketLevel++;
    else if(c==')'  && !isEscape && !isInSglQuotes && !isInDblQuotes) bracketLevel--;
    else if(c=='"'  && !isEscape && !isInSglQuotes && !isInDblQuotes) isInDblQuotes = true;
    else if(c=='"'  && !isEscape && !isInSglQuotes && isInDblQuotes) isInDblQuotes = false;
    else if(c=='\'' && !isEscape && !isInDblQuotes && !isInSglQuotes) isInSglQuotes = true;
    else if(c=='\'' && !isEscape && !isInDblQuotes && isInSglQuotes) isInSglQuotes = false;
    else if(isEscape) isEscape = false;
  }
  return (bracketLevel == 0);
}

// Each script containing a slideshow definition might contain more than one definition.
// Keep each definition seperate in scriptSrc.
for(var i = 0; i < ssDefs.snapshotLength; ++i) {
  var src = ssDefs.snapshotItem(i).innerHTML;
  var s = "bbc.fmtj.apps.slideshow.createSlideShow";
  while(src.indexOf(s) > -1) {
    var beg, end, s2;
    beg = src.indexOf(s);
    end = src.indexOf(")", beg+s.length);
    s2 = src.substring(beg, end+1);
    while(!IsFunctionSane(s2) && end > -1) {
      end = src.indexOf(")", end+1);
      if(end > -1) s2 = src.substring(beg, end+1);
    }
    scriptSrc.push(s2);
    src = src.substring(end+1, src.length);
  }
}

if(scriptSrc.length == 0) return;

function GetGlow(r, si) {
  var glmod;
  if(r.match("bbc.fmtj.apps.slideshow") && r.match("gloader.load")) {
    var s = r.replace("gloader.load","glmod = (function(t,u){return t;})");
    eval(s);
    var gloader = unsafeWindow["gloader"];
    if(typeof gloader == "undefined") return;
    var mods = [];
    mods.push(glmod);
    mods = gloader.toIds(mods);
    var mod;
    for(var i =0; i < mods.length; ++i) {
      if(mods[i].match(/\/[^.]+$/)) {
        mod = mods[i];
        break;
      }
    }
    if(typeof mod != "undefined") {
      glow = gloader._modules[mod].implementation;
      DisableSlideShows(glow);
    }
  }
  else GetNextSlideshowScript(si+1);
}

function DisableSlideShows(glow) {
  for(var s in scriptSrc) {
    var ssProps;
    var src = scriptSrc[s].replace("bbc.fmtj.apps.slideshow.createSlideShow", "ssProps = (function(r){return r;})");
    eval(src);
    if(ssProps.containerId != "undefined") {
      DisableAutoPlay(glow, ssProps.containerId);
    }
  }
}

function DisableAutoPlay(glow, slideShowId) {
  var ppb = glow.dom.get("#" + slideShowId + " .nav a.playpause_button");
  if(ppb && ppb.hasClass("pause")) {
    glow.events.fire(ppb[0], "click");
  }
}


function GetNextSlideshowScript(i) {
  if(i < scriptUrl.length) {
    surl = scriptUrl[i];
    GM_xmlhttpRequest({
      method:"GET",
      url:surl,
      onload:function(r) {
        GetGlow(r.responseText, i);
      }
    });
  }
}

GetNextSlideshowScript(0);