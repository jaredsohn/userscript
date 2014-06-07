// ==UserScript==
// @name           v2ex novice killer
// @namespace      http://shellex.info
// @author         shellex(5h3ll3x@gmail.com)
// @author         meteor(liuxingmatt@gmail.com)
// @namespace      http://meteor.mozest.net
// @description    干掉使用默认头像人的发言
// @updateURL      https://userscripts.org/scripts/source/153611.meta.js
// @downloadURL    https://userscripts.org/scripts/source/153611.user.js

// @include        https://www.v2ex.com/go/*
// @include        https://v2ex.com/go/*
// @include        https://www.v2ex.com/?tab=*
// @include        https://v2ex.com/?tab=*
// @include        https://www.v2ex.com/
// @include        https://v2ex.com/
// @include        https://www.v2ex.com/t/*
// @include        https://v2ex.com/t/*
// @include		   https://www.v2ex.com/my/nodes*
// @include		   https://v2ex.com/my/nodes*

// @include        http://www.v2ex.com/go/*
// @include        http://v2ex.com/go/*
// @include        http://www.v2ex.com/?tab=*
// @include        http://v2ex.com/?tab=*
// @include        http://www.v2ex.com/
// @include        http://v2ex.com/
// @include        http://www.v2ex.com/t/*
// @include        http://v2ex.com/t/*
// @include		   http://www.v2ex.com/my/nodes*
// @include		   http://v2ex.com/my/nodes*

// @version        0.8
// @grant          none
// ==/UserScript==\

(function() {
  window.unsafeWindow || (
    unsafeWindow = (function() {
      var el = document.createElement('p');
      el.setAttribute('onclick', 'return window;');
      return el.onclick();
    }())
  );
  var $ = unsafeWindow.jQuery;
  var entry = function() {
    var dA =$('#Main img[src$="v2ex.com/static/img/avatar_normal.png"],#Main img[src$="v2ex.com/static/img/avatar_large.png"]');
    return dA.parents('.cell').remove();
  };
  entry();
}).call(this);
