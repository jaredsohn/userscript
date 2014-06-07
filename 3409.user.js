/*
 * Copyright (c) 2006 Amol S Deshmukh
 * Author email: amol at apache. dot. org
 *
 * Terms of Use:
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// ==UserScript==
// @name		Search Onsite
// @version		1.0
// @namespace	        http://www.chaoscorder.com
// @author		Amol S Deshmukh
// @description This is similar to the "Search Site" userscript by "Ones Self" with the difference that the results will be displayed floating on the page you are currently viewing. The searchbox can be moved by clicking the icon (dont drag the mouse, just click to go into drag mode). To stop moving, simply click again. Also provided are the familiar minimize, maximize and close buttons.
// @include		*
// @exclude		*.google.com*
// ==/UserScript==


// BEGIN: top level utility functions
function SO_uenc(str)
{
  str=escape(str);
  str=str.replace(new RegExp('\\+','g'),'%2B');
  return str.replace(new RegExp(' ','g'),'+');
  //return str;
}
function SO_thisSite() {
	var	loc = top.document.location.href;
  var s1 = loc.split(/\//)[2];
  var s2 = s1.split(/\./);
  var tld = s2[s2.length - 1];
  if(tld == "ac" || tld == "ad" || tld == "ae" || tld == "af" || tld == "ag" || tld == "ai" || tld == "al" || tld == "am" || tld == "an" || tld == "ao" || tld == "aq" || tld == "ar" || tld == "as" || tld == "at" || tld == "au" || tld == "aw" || tld == "az" || tld == "ax" || tld == "ba" || tld == "bb" || tld == "bd" || tld == "be" || tld == "bf" || tld == "bg" || tld == "bh" || tld == "bi" || tld == "bj" || tld == "bm" || tld == "bn" || tld == "bo" || tld == "br" || tld == "bs" || tld == "bt" || tld == "bv" || tld == "bw" || tld == "by" || tld == "bz" || tld == "ca" || tld == "cc" || tld == "cd" || tld == "cf" || tld == "cg" || tld == "ch" || tld == "ci" || tld == "ck" || tld == "cl" || tld == "cm" || tld == "cn" || tld == "co" || tld == "cr" || tld == "cs" || tld == "cu" || tld == "cv" || tld == "cx" || tld == "cy" || tld == "cz" || tld == "de" || tld == "dj" || tld == "dk" || tld == "dm" || tld == "do" || tld == "dz" || tld == "ec" || tld == "ee" || tld == "eg" || tld == "eh" || tld == "er" || tld == "es" || tld == "et" || tld == "eu" || tld == "fi" || tld == "fj" || tld == "fk" || tld == "fm" || tld == "fo" || tld == "fr" || tld == "ga" || tld == "gb" || tld == "gd" || tld == "ge" || tld == "gf" || tld == "gg" || tld == "gh" || tld == "gi" || tld == "gl" || tld == "gm" || tld == "gn" || tld == "gp" || tld == "gq" || tld == "gr" || tld == "gs" || tld == "gt" || tld == "gu" || tld == "gw" || tld == "gy" || tld == "hk" || tld == "hm" || tld == "hn" || tld == "hr" || tld == "ht" || tld == "hu" || tld == "id" || tld == "ie" || tld == "il" || tld == "im" || tld == "in" || tld == "io" || tld == "iq" || tld == "ir" || tld == "is" || tld == "it" || tld == "je" || tld == "jm" || tld == "jo" || tld == "jp" || tld == "ke" || tld == "kg" || tld == "kh" || tld == "ki" || tld == "km" || tld == "kn" || tld == "kp" || tld == "kr" || tld == "kw" || tld == "ky" || tld == "kz" || tld == "la" || tld == "lb" || tld == "lc" || tld == "li" || tld == "lk" || tld == "lr" || tld == "ls" || tld == "lt" || tld == "lu" || tld == "lv" || tld == "ly" || tld == "ma" || tld == "mc" || tld == "md" || tld == "mg" || tld == "mh" || tld == "mk" || tld == "ml" || tld == "mm" || tld == "mn" || tld == "mo" || tld == "mp" || tld == "mq" || tld == "mr" || tld == "ms" || tld == "mt" || tld == "mu" || tld == "mv" || tld == "mw" || tld == "mx" || tld == "my" || tld == "mz" || tld == "na" || tld == "nc" || tld == "ne" || tld == "nf" || tld == "ng" || tld == "ni" || tld == "nl" || tld == "no" || tld == "np" || tld == "nr" || tld == "nu" || tld == "nz" || tld == "om" || tld == "pa" || tld == "pe" || tld == "pf" || tld == "pg" || tld == "ph" || tld == "pk" || tld == "pl" || tld == "pm" || tld == "pn" || tld == "pr" || tld == "ps" || tld == "pt" || tld == "pw" || tld == "py" || tld == "qa" || tld == "re" || tld == "ro" || tld == "ru" || tld == "rw" || tld == "sa" || tld == "sb" || tld == "sc" || tld == "sd" || tld == "se" || tld == "sg" || tld == "sh" || tld == "si" || tld == "sj" || tld == "sk" || tld == "sl" || tld == "sm" || tld == "sn" || tld == "so" || tld == "sr" || tld == "st" || tld == "sv" || tld == "sy" || tld == "sz" || tld == "tc" || tld == "td" || tld == "tf" || tld == "tg" || tld == "th" || tld == "tj" || tld == "tk" || tld == "tl" || tld == "tm" || tld == "tn" || tld == "to" || tld == "tp" || tld == "tr" || tld == "tt" || tld == "tv" || tld == "tw" || tld == "tz" || tld == "ua" || tld == "ug" || tld == "uk" || tld == "um" || tld == "us" || tld == "uy" || tld == "uz" || tld == "va" || tld == "vc" || tld == "ve" || tld == "vg" || tld == "vi" || tld == "vn" || tld == "vu" || tld == "wf" || tld == "ws" || tld == "ye" || tld == "yt" || tld == "yu" || tld == "za" || tld == "zm" || tld == "zw")
    var site = s2[s2.length - 3] + "." + s2[s2.length - 2] + "." + tld;
  else
    var site = s2[s2.length - 2] + "." + tld;
  return s1;
}
function $(anID) {
  return document.getElementById(anID);
}
function byTag(tagName) {
  return document.getElementsByTagName(tagName);
}
function copyProperties(to,from) {
  for (p in from) {
    to[p] = from[p];
  }
}
function anew(tagName, params) {
  var retval = document.createElement(tagName);
  copyProperties(retval,params);
  return retval;
}
function newText(txt) {
  return document.createTextNode(txt);
}
// END: top level utility functions


// BEGIN: SearchOnsite
var SearchOnsite = {
  vizible: false
  ,
  sentryDiv: null
  ,
  mainDiv: null
  ,
  iframe: null
  ,
  iframeContainer: null
  ,
  icon: null
  ,
  buttons: null
  ,
  qField: null
  ,
  cbox: null
  ,
  qFieldContainer: null
  ,
  topbar: null
  ,
  minBtn: null
  ,
  maxBtn: null
  ,
  closeBtn: null
  ,
  initialize: function () {
    var bodee = byTag("body")[0];
    if (!bodee) return;
    SearchOnsite.sentryDiv = anew("div");
    SearchOnsite.mainDiv   = anew("div");
    SearchOnsite.iframe    = anew("iframe");
    SearchOnsite.iframeContainer = anew("div");
    SearchOnsite.icon      = anew("div");
    SearchOnsite.buttons   = anew("div");
    SearchOnsite.qFieldContainer  = anew("div");
    SearchOnsite.qField    = anew("input", {"type":"text"});
    SearchOnsite.cbox      = anew("input", {"type":"checkbox"});
    SearchOnsite.cboxLabel = newText("full window");
    SearchOnsite.topbar    = anew("div");
    SearchOnsite.minBtn    = anew("input", {"type":"button"});
    SearchOnsite.maxBtn    = anew("input", {"type":"button"});
    SearchOnsite.closeBtn  = anew("input", {"type":"button"});

    SearchOnsite.icon.innerHTML = "<img src='http://www.google.com/favicon.ico'/>";
    SearchOnsite.minBtn.value   = "_";
    SearchOnsite.maxBtn.value   = "#";
    SearchOnsite.closeBtn.value = "x";

    SearchOnsite.qFieldContainer.appendChild(SearchOnsite.qField);
    SearchOnsite.qFieldContainer.appendChild(SearchOnsite.cbox);
    SearchOnsite.qFieldContainer.appendChild(SearchOnsite.cboxLabel);

    SearchOnsite.buttons.appendChild(SearchOnsite.minBtn);
    SearchOnsite.buttons.appendChild(SearchOnsite.maxBtn);
    SearchOnsite.buttons.appendChild(SearchOnsite.closeBtn);

    SearchOnsite.topbar.appendChild(SearchOnsite.icon);
    SearchOnsite.topbar.appendChild(SearchOnsite.qFieldContainer);
    SearchOnsite.topbar.appendChild(SearchOnsite.buttons);

    SearchOnsite.iframeContainer.appendChild(SearchOnsite.iframe);

    SearchOnsite.mainDiv.appendChild(SearchOnsite.topbar);
    SearchOnsite.mainDiv.appendChild(SearchOnsite.iframeContainer);
    bodee.appendChild(SearchOnsite.sentryDiv);
    bodee.appendChild(SearchOnsite.mainDiv);
    SearchOnsite.initStylize();
    SearchOnsite.initListeners();
    SearchOnsite.cloze();
  }
  ,
  initListeners: function () {
    SearchOnsite.sentryDiv.addEventListener("mouseover", SearchOnsite.openn, true);
    SearchOnsite.icon.addEventListener("mouseover"
      , function () {
          SearchOnsite.qFieldContainer.style.display = "inline";
          SearchOnsite.buttons.style.display = "inline";
          SearchOnsite.topbar.style.width = "600px";
        }
      , false);
    SearchOnsite.icon.addEventListener("click" ,SearchOnsite.initDrag ,false);
    SearchOnsite.closeBtn.addEventListener("click" ,SearchOnsite.cloze    ,true);
    SearchOnsite.maxBtn.addEventListener("click"   ,SearchOnsite.maximize ,true);
    SearchOnsite.minBtn.addEventListener("click"   ,SearchOnsite.minimize ,true);
    SearchOnsite.qField.addEventListener("keypress"
          , function (evnt) {
              if (evnt.which==13) {
                if (SearchOnsite.cbox.checked) {
                  document.location.href = SearchOnsite.makeSearchUrl();
                }
                else {
                  SearchOnsite.maximize();
                  SearchOnsite.iframe.src = SearchOnsite.makeSearchUrl();
                }
              }
            }
          , true);
  }
  ,
  initDrag: function (evnt) {
    SearchOnsite.icon.removeEventListener("click" ,SearchOnsite.initDrag ,false);
    SearchOnsite.topbar.style.cursor = "move";
    SearchOnsite.x = evnt.clientX + window.scrollX;
    SearchOnsite.y = evnt.clientY + window.scrollY;
    document.addEventListener("mousemove"      ,SearchOnsite.dragGo ,true);
    document.addEventListener("click"          ,SearchOnsite.exitDrag ,true);
  }
  ,
  dragGo: function (evnt) {
    var x, y;
    x = evnt.clientX + window.scrollX - 5;
    y = evnt.clientY + window.scrollY - 5;

    SearchOnsite.mainDiv.style.left = x + "px";
    SearchOnsite.mainDiv.style.top  = y + "px";
    evnt.preventDefault();
  }
  ,
  exitDrag: function (evnt) {
    SearchOnsite.topbar.style.cursor = "";
    document.removeEventListener("mousemove"      ,SearchOnsite.dragGo   ,true);
    document.removeEventListener("click" ,SearchOnsite.exitDrag ,true);
    evnt.cancelBubble = true;
    if (evnt.preventDefault) evnt.preventDefault();
    if (evnt.preventBubble) evnt.preventBubble();
    SearchOnsite.icon.addEventListener("click"    ,SearchOnsite.initDrag ,false);
  }
  ,
  makeSearchUrl: function () {
    var retval = SearchOnsite.qField.value;
    retval += " site:" + SO_thisSite();
    return "http://www.google.com/search?q=" + SO_uenc(retval);
  }
  ,
  maximize: function () {
    SearchOnsite.iframeContainer.style.display = "";
    SearchOnsite.iframeContainer.style.backgroundColor = "#eee";
    SearchOnsite.iframeContainer.style.position = "relative";
    SearchOnsite.iframeContainer.style.zIndex = 1000;
  }
  ,
  minimize: function () {
    SearchOnsite.iframeContainer.style.display = "none";
  }
  ,
  openn: function () {
    if (!SearchOnsite.vizible) {
      SearchOnsite.mainDiv.style.display = "";
      SearchOnsite.sentryDiv.style.zIndex = 0;
      SearchOnsite.vizible = true;
    }
  }
  ,
  cloze: function () {
    if (SearchOnsite.vizible) {
      SearchOnsite.mainDiv.style.display = "none";
      SearchOnsite.sentryDiv.style.zIndex = 1000;
      SearchOnsite.iframeContainer.style.display = "none";
      SearchOnsite.qFieldContainer.style.display = "none";
      SearchOnsite.buttons.style.display = "none";
      SearchOnsite.topbar.style.width = "16px";
      SearchOnsite.vizible = false;
    }
  }
  ,
  initStylize: function() {
    copyProperties(SearchOnsite.sentryDiv.style      , {"width":"16px","height":"16px","position":"absolute","top":0,"left":0,"zIndex":1000,"border":"none","margin":"0","padding":"0"});
    copyProperties(SearchOnsite.mainDiv.style        , {"display":"none","width":"605px","height":"16px","position":"absolute","top":0,"left":0,"fontFamily":"'Trebuchet MS'","border":"none","textAlign":"left","margin":"0","padding":"0"});

    copyProperties(SearchOnsite.topbar.style         , {"position":"relative","height":"18px","width":"16px","backgroundColor":"#D2E4FC","color":"#777","padding":"0px","border":"1px solid #3055AA","margin":"0","padding":"0","fontSize":"11px"});
    copyProperties(SearchOnsite.iframeContainer.style, {"display":"none","height":"398px","position":"relative","zIndex":999,"margin":"0","padding":"0"});

    copyProperties(SearchOnsite.icon.style           , {"display":"inline","position":"relative","top":1,"width":"16px","margin":"0","padding":"0"});
    copyProperties(SearchOnsite.qFieldContainer.style, {"position":"relative","top":-3,"width":"342px","height":"16px","display":"none","margin":"0","padding":"0","textAlign":"left"});
    copyProperties(SearchOnsite.buttons.style        , {"position":"relative","top":-3,"width":"50px","height":"16px","display":"none","margin":"0","padding":"0","marginLeft":"185px"});
    copyProperties(SearchOnsite.iframe.style         , {"border":"1px solid #3055AA","height":"395px","width":"600px","margin":"0","padding":"0"});

    copyProperties(SearchOnsite.qField.style         , {"width":"240px","height":"16px","margin":"0px","fontSize":"11px","fontFamily":"'Trebuchet MS'","border":"1px solid #8FB6EB","padding":"0px"});
    copyProperties(SearchOnsite.minBtn.style         , {"width":"16px","height":"16px","margin":"0px","backgroundColor":"#0075EB","color":"#fff","border":"1px solid #3055AA","borderTop":"1px solid #fff","borderLeft":"1px solid #3055AA","fontSize":"9px","padding":"0px","verticalAlign":"middle","fontFamily":"'Trebuchet MS'"});
    copyProperties(SearchOnsite.maxBtn.style         , {"width":"16px","height":"16px","margin":"0px","backgroundColor":"#0075EB","color":"#fff","border":"1px solid #3055AA","borderTop":"1px solid #fff","borderLeft":"1px solid #3055AA","fontSize":"9px","padding":"0px","verticalAlign":"middle","fontFamily":"'Trebuchet MS'"});
    copyProperties(SearchOnsite.closeBtn.style       , {"width":"16px","height":"16px","margin":"0px","backgroundColor":"#0075EB","color":"#fff","border":"1px solid #3055AA","borderTop":"1px solid #fff","borderLeft":"1px solid #3055AA","fontSize":"9px","padding":"0px","verticalAlign":"middle","fontFamily":"'Trebuchet MS'"});
  }
};
// END: SearchOnsite


// BEGIN: main()
SearchOnsite.initialize();
// END: main()