// ==UserScript==
// @name Onlinemoviesfreee Skip 5sec
// @description Goto to the direct link
// @namespace https://userscripts.org/scripts/show/176187
// @updateURL https://userscripts.org/scripts/source/176187.meta.js
// @downloadURL https://userscripts.org/scripts/source/176187.user.js
// @author Reek | http://reeksite.com/
// @icon http://www.gravatar.com/avatar/afb8376a9f634cd3501af4387de6425f.png
// @version 1.0
// @license GPL version 3
// @include http*://*onlinemoviesfreee.com/*
// @include http*://*linkbucks.com/*
// ==/UserScript==
/*======================================================
  RUN
=======================================================*/

  var oAdLink = document.querySelector('#hid a[href]');
  if(oAdLink) {
    window.location = oAdLink.href;
  }
  else if(Lbjs) {
    window.location = Lbjs.TargetUrl;
  }
