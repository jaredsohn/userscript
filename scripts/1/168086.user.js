// ==UserScript==
// @id             tiin.vn-000e5e2c-2050-4915-8681-b9aa005693a8@remove-script-nodes
// @name           Tiin.vn 'tin-anh' AJAX load
// @version        1.0
// @namespace      remove-script-nodes
// @author         Tung Hoanh
// @description    
// @include        http://tiin.vn/tin-anh/*
// @run-at         document-end
// ==/UserScript==
(function(){
  var container   = document.getElementById('top_slide_img');
  var loading     = null;
  var ajaxRequest = function(url){
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: function(response) {
        var text  = response.responseText;
        var begin = text.indexOf('<div class="top-slide-img" id="top_slide_img">') + '<div class="top-slide-img" id="top_slide_img">'.length;
        var end   = text.search('<\/div>[\r\n]+<div id="body-left">');
        var html  = text.substring(begin, end);
        var title = text.substring(text.indexOf('<title>') + '<title>'.length, text.indexOf('</title>'));
        container.innerHTML = html;
        container.scrollIntoView(true);
        registerEvent();
        if (window.history.pushState) {
          window.history.pushState({url: url}, title, url);
        }
        CreateloadingDOM();
      },
      onprogress: function() {
        loading.style.display = 'block';
      }
    });
  };
  var registerEvent = function() {
    domList = document.querySelectorAll('a.bst-next, a.bst-back, a.pagging-num:not(.active)');
    Array.prototype.forEach.call(domList, function(element) {
      element.addEventListener('click', function(evt) {
        evt.preventDefault();
        ajaxRequest(element.href);
      });
    })
  };
  var CreateloadingDOM = function() {
    var _loading = document.createElement('div');
        _loading.innerHTML = '<span>...loading...</span>';
        _loading.style.cssText = 'background:  #282828; border: 1px solid #000000; color: #FFFFFF; font-size: 2em; padding: 31px 0; position: absolute; text-align: center; width: 200px; z-index: 9999; opacity: 0.8;';
        _loading.style.left    = (container.clientWidth - 200)*0.5 + 'px';
        _loading.style.top     = '150px';
        _loading.style.display = 'none';
        container.appendChild(_loading);
        loading = _loading;
  }
  registerEvent();
  CreateloadingDOM();
})();