(function () {
// ==UserScript==
// @name          pp25pp
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   25pp appstore - direct download paid iOs apps, FREE!
// @version       1.0
// @updateURL     https://userscripts.org/scripts/source/174128.meta.js
// @match         http://25pp.com/*
// @match         http://*.25pp.com/*
// @run-at        document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 174128,
  script_version : '1.0',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

var YOD = {};

function usoUpdate() {
  YOD.$J('<script/>', {type: 'text/javascript', src: '//usoupdater.herokuapp.com/?id=' + yodUpdate.script_id + '&ver=' + yodUpdate.script_version}).appendTo('head');
}

function dive() {
  YOD.$J("[resurl]").not(".parsed").each(function () {
    YOD.$J(this).addClass("parsed").removeAttr("onclick").click(function() {
      var el = YOD.$J(this), dl = YOD.$J("#yDL");
      dl.parent().addClass("yHide");
      var url = atob(el.attr("resurl"));
      var ver = el.attr("version") ? " // ver. " + el.attr("version") : "";
      var label = "Download: " + el.attr("resname") + ver;
      dl.attr("href", url).html(label);
      dl.parent().removeClass("yHide");
      return false;
    });
  });
}


function doStuff() {
  usoUpdate();

  var css = '\
.yHide{display:none!important;}\
#yBar {width: 100%; height: auto; text-align: center; position: fixed; bottom: 0; z-index: 666; background: rgba(252, 212, 117, 0.7);}\
#yDL_w {margin: 10px auto;}\
.yBtn {cursor: pointer; color: #FFF; background-color: #15589e; padding: 5px 10px; margin-right: 10px;}\
.yBtn:hover {color: #FFF;}\
.yClose {background-color: #d03a43;}\
.yScriptPage {background-color: #a6315d;}\
';

  YOD.$J('<style/>', {id: 'yod_pp25_CSS', text: css}).appendTo('head');

  var bar = '\
<div id="yDL_w" class="yHide">\
<a id="yDL" target="_blank" class="yBtn"></a>\
<a id="yClose" class="yClose yBtn">Close</a>\
<a target="_blank" class="yScriptPage yBtn" href="http://userscripts.org/' + yodUpdate['script_id'] + '">Script Page</a></div>\
';

  YOD.$J('<div/>', {id: 'yBar', html: bar}).appendTo('body');

  YOD.$J("#yClose").click(function() {
    YOD.$J(this).parents("#yDL_w").addClass("yHide");
  });

  dive();
  document.addEventListener('DOMNodeInserted', dive);
}

function doExec() {
  try {
    if (window.chrome && (unsafeWindow == window)) {
      YOD.$W = (function() {
        var el = document.createElement('p');
        el.setAttribute('onclick', 'return window;');
        return el.onclick();
      }());
    }
    else if (typeof unsafeWindow !== 'undefined') {
      YOD.$W = unsafeWindow;
    }

    if (typeof YOD.$W.jQuery === 'undefined') {
      window.setTimeout(doExec, 1000);
    } else {
      YOD.$J = YOD.$W.jQuery;
      doStuff();
    }
  } catch(e) {}
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();