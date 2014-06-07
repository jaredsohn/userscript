// ==UserScript==
// @name          nikkeibp_login
// @namespace     http://userscripts.org/users/kawaz
// @description   nikkeibp_login
// @version       1.2
// @include       http*://*.nikkeibp.co.jp/*
// ==/UserScript==
(function(){

var click = function(elm){
  if(elm) {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(event);
  }
};

var log = function() {
  console.log(Array.prototype.slice.call(arguments));
}

var queryForEach = function(node, selector, cb) {
  if(!(node instanceof Node)) {
    cb = selector;
    selector = node;
    node = document;
  }
  if(typeof cb == 'function') {
    Array.prototype.slice.call(node.querySelectorAll(selector)).forEach(cb);
  }
};

queryForEach("img[src*=btn_login]", click);

queryForEach("form[name=loginActionForm]", function(form){
  queryForEach(form, "input[name=email]", function(e){e.value="intel_haitteru@hotmail.com"});
  queryForEach(form, "input[name=userId]", function(e){e.value="intel_haitteru"});
  queryForEach(form, "input[name=password]", function(e){e.value="abababababa"});
  queryForEach(form, "input[name=login]", click);
});

queryForEach("input[type=button][value=サイトへ戻る]", click);

})();
