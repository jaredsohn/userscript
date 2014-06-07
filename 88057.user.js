// ==UserScript==
// @name           anno1777 loading title
// @namespace      psmith
// @description    Shows a "Loading" title in anno1777 while an AJAX request is in
//                 progress. It working on day 2010 october 13, but maybe it will not
//                 work in any new version of anno1777. It works only in Firefox.
// @include        http://www.anno1777.com/*
// ==/UserScript==

function log(msg) {
    if (console && console.log) {
//        console.log(msg);
    }
}
function createLoadingTitle() {
    var center = document.createElement('center');
    var div = document.createElement('div');
    div.setAttribute('id', '__loading__');
    div.setAttribute('style', 'order: solid #000000; background-color: #FFFFE1;z-index:100;position:fixed;_position:absolute;top:0;_top:expression(eval(document.body.scrollTop));border: 1px solid black;');
    div.innerHTML = '++';
    center.appendChild(div);
    document.getElementsByTagName('body')[0].appendChild(center);
}
function showLoadingTitle() {
    log('showLoadingTitle');
    var div = document.getElementById('__loading__');
    if (div) {
      div.innerHTML = 'Loading...';
//      div.style.display = 'block';
    }
}
function hideLoadingTitle() {
    log('hideLoadingTitle');
    var div = document.getElementById('__loading__');
    if (div) {
      div.innerHTML = '++';
//      div.style.display = 'none';
    }
}
//replaces the (public) getData function to show and hide the title
function replaceGetData() {
    unsafeWindow['getData'] = function(dataSource, divID, force_eval) {
      if (force_eval === undefined) {
        force_eval = true;
      }
      ajax = unsafeWindow.GetXmlHttpObject();
      var obj = document.getElementById(divID);
      ajax.open("GET", dataSource);
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
          hideLoadingTitle();
        }
        if (ajax.readyState == 4 && ajax.status == 200) {
          obj.innerHTML = ajax.responseText;
          var x = document.getElementById(divID).getElementsByTagName("script");
          for (var i = 0; i < x.length; i++) {
            eval(x[i].text);
          }
        }
      };
      showLoadingTitle();
      ajax.send(null);
    }
}

log('init loading title...');
createLoadingTitle();
replaceGetData();
