// ==UserScript==
// @name          ryushare_customize
// @namespace     http://userscripts.org/users/kawaz
// @description   RyuShare customize
// @version       2.0.2
// @include       http://ryushare.com/*
// @include       http://pant.su/*
// ==/UserScript==
(function(){

var click = function(elm, ctrlKey, altKey, shiftKey, metaKey){
  if(elm) {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, !!ctrlKey, !!altKey, !!shiftKey, !!metaKey, 0, null);
    elm.dispatchEvent(event);
  }
};
var ctrlClick  = function(elm) {click(elm, true)};
var altClick   = function(elm) {click(elm, false, true)};
var shiftClick = function(elm) {click(elm, false, false, true)};
var metaClick  = function(elm) {click(elm, false, false, false, true)};
var createKeypress = function(code, ctrlKey, altKey, shiftKey, metaKey) {
  return function(elm) {
    if(elm) {
      var e = document.createEvent('Events');
      e.initEvent('keypress', true, true);
      e.view     = window;
      e.ctrlKey  = !!ctrlKey;
      e.altKey   = !!altKey;
      e.shiftKey = !!shiftKey;
      e.metaKey  = !!metaKey;
      if(typeof code == 'string') {
        e.keyCode  = 0;
        e.charCode = code;
      } else {
        e.keyCode = code;
        e.charCode = '';
      }
      elm.dispatchEvent(e);
    }
  }
};
var delay = function(cb, ms) {
  return function() {
    if(typeof cb == 'function') {
      var args = Array.prototype.slice.call(arguments);
      setTimeout(function(){cb.apply(null, args)}, ms || 1000);
    }
  };
}
var submit = function(elm) {
  for(; elm; elm = elm.parentNode) {
    if(elm.tagName == "FORM") {
      elm.submit();
    }
  }
}

var queryForEach = function(selector, cb) {
  if(typeof cb == 'function') {
    var elms = Array.prototype.slice.call(document.querySelectorAll(selector));
    elms.forEach(cb);
    return 0 < elms.length;
  }
};

if(location.href.indexOf("http://pant.su/") == 0) {
  setTimeout(function(){
    if(document.referrer == "") {
      queryForEach(".entry-content a[href*='://ryushare.com/']", function(elm){
        elm.target="_blank";
        click(elm);
      });
    }
  }, 10*1000);
}

if(location.href.indexOf("http://ryushare.com/") == 0) {
  if(/ryushare.com\/login/.test(location.href)) {
    setTimeout(function(){
      queryForEach("input[name='password']",
        function(elm){
          if(elm.value) {
            queryForEach("input[name='loginFormSubmit']", submit);
          }
        }
      );
    }, 1000);
  } else {
    queryForEach("#login_button", function(elm){location.href=elm.href}) ||
    queryForEach("#btn_download", submit) ||
    queryForEach("a[href*='.ryushare.com/files/']", click);
  }
}

})();
