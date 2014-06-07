(function () {
// ==UserScript==
// @name          Kuaiy0ng
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   Kuaiyong appstore - download paid iOs apps, no jailbreak required!
// @version       1.1
// @updateURL     https://userscripts.org/scripts/source/167790.meta.js
// @match         http://7659.com/*
// @match         http://*.7659.com/*
// @run-at        document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 167790,
  script_version : '1.1',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

var YOD = {};
YOD.$Opera = window.opera || null;

function usoUpdate() {
  YOD.$J('<script/>', {type: 'text/javascript', src: '//usoupdater.herokuapp.com/?id=' + yodUpdate.script_id + '&ver=' + yodUpdate.script_version}).appendTo('head');
}

function yFail(el, yLoad) {
  try {
    yLoad.addClass('yHide'); el.removeClass('yHide');
  } catch(e) {}
}

function fetchJSON() {
  var el = YOD.$J(this);
  if (el.attr('href')) return true;
  var id = el.attr('data-historyurl'),
  yLoad = el.parent().find('.yLoad'),
  url = YOD.$W.atob('aHR0cDovL2ZfYXBwcy5icHBzdG9yZS5jb20vSW50ZXJmYWNlL2lfZ2V0aXBhZGV0YWlsaW5mby5waHA/Y2xpZW50PTIuMC44LjAmdmVyc2lvbj0wJmRhdGFpZD0=') + id;
  yLoad.removeClass('yHide'); el.addClass('yHide');
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(response) {
      try {
        if (url = JSON.parse(response.responseText.replace(/(\\u[a-z0-9]+)\\u?/gi, '')))
          if (url = url[1].APPINFOR.URL[0].url) {
            yLoad.addClass('yHide');
            el.attr({title: 'Direct link ready!', href: url, target: '_blank'}).removeClass('yHide');
          }
      } catch(e) {}
    },
    onerror: function() {yFail(el, yLoad)},
    ontimeout: function() {yFail(el, yLoad)}
  });
  return false;
}

function yGrab() {
  YOD.$J('a[data-historyurl]').not('.yodDone').each(function() {
    var d_btn = YOD.$J(this),
    str = d_btn.attr('data-historyurl').match(/appId=(.+)$/i),
    yLoad = YOD.$J('<div/>', {class: 'yLoad yHide'}).insertBefore(d_btn);
    d_btn.addClass('yodDone')
      .removeAttr('onclick')
      .attr({title: 'Click to resolve direct link', 'data-historyurl': str[1]})
      .bind('click', fetchJSON);
  });
}


function doStuff() {
  usoUpdate();
  var css = '\
.yHide{display:none!important;}\
.yLoad {margin: 10px 0 20px;display: block;height:15px;width:32px;background-image: url(data:image/gif;base64,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);}\
.app_list .yLoad {position: absolute;right: 0px;top: 5px;}\
';

  YOD.$J('<style/>', {id: 'yod_kuaiyong_CSS', text: css}).appendTo('head');
  yGrab();
  document.addEventListener('DOMNodeInserted', function (event) {
    try {
      var cname, elmt = event.target;
      if (!(/(DIV)/.test(elmt.tagName))) return;
      if (cname = elmt.className) {
        if (/img/.test(cname)) {
          yGrab();
        }
      }
    } catch (e) {}
  }, false);
}

function doExec() {
  try {
    if (!YOD.$Opera && window.navigator.vendor.match(/google/i)) {
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