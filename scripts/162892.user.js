// ==UserScript==
// @name        Multiline tabs for netvibes again, inspired by nv_poweruser script
// @namespace   lostinbrittany
// @description Bring back the multiline tabs for Netvibes
// @include     http://www.netvibes.com/*
// @version     2.4
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js
// ==/UserScript==

var addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var bttf = function () {  
  //document.getElementById('divTabs').childNodes[0].childNodes[0].childNodes[0].width = '100%'
  //document.getElementById('divTabs').childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.whiteSpace = 'normal';
  document.getElementById('divTabs').childNodes[1].style.display = 'inline-block';
  document.getElementById('divTabs').childNodes[1].style.width = 'auto';
  document.getElementById('divTabs').childNodes[1].style.height = '28px';
  $('#divTabs .nv-tabs-left').remove(); // document.getElementById('nv-tabs-left');
  $('#divTabs .nv-tabs-right .btn-scroll-next').remove();
    
  $('#divTabs .tabs').unwrap();
  $('#divTabs .tabs').css('white-space', 'normal');

    
    
  var divTabs = $('#divTabs');
    divTabs.css('padding-left', '0').css('margin-left', '0'); 
    addGlobalStyle('#divTabs .nv-tabs-right:before {background-image: none !important}');  
  //unsafeWindow.App.tabView.scroller.scroller.elements.scroller.removeEvents('mousewheel');
  //unsafeWindow.App.tabView.resize();

}

window.setTimeout(bttf, 2000);