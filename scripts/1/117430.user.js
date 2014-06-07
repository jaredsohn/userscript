// ==UserScript==
// @name    taobao couplet cleaner
// @namespace   taobao
// @author    zolunx10@hotmail.com
// @description   hide all fixed divs
// @include http://*.taobao.com/
// @exclude
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==
// version 1.0 - 2011-09-01

var $;
var unsafeWindow= unsafeWindow || window;
// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery($);
    }
}

// All your GM code must be inside this function
function letsJQuery($) {

if (Browser ==null) {
  var userAgent =navigator.userAgent.toLowerCase();
  var Browser = {
	  version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	  msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	  firefox: /firefox/.test( userAgent ),
    chrome: /chrome/.test( userAgent ) && /mozilla/.test(userAgent),
	  opera: /opera/.test( userAgent ),
	  safari: /webkit/.test( userAgent ) &&!(/chrome/.test(userAgent))
  }
}

$(function() {
  var CCleaner= function() {
    var item=$('div').filter(function(index) {
      var $this= $(this)
        , pos= $this.css('position')
        ;
      if ($this.attr('id')=="tstart") {
        return false;
      }
      return pos=="fixed";
    });
    this.visible= false;
    if (item.length<=0) return;
    this.item= item.fadeOut(300);
    var tstart= $('#tstart')
      , t
      , self= this;
    this.trigger= $('<span class="tstart-normal-trigger">')
      .html('<a href="javascript:void(0)">↑ 显示悬浮元素</a>'
         )
      .bind('click', function(e) {
        if (self.visible) {
          self.item.fadeOut(300);
          self.trigger.text("↑ 显示悬浮元素");
        } else {
          self.item.fadeIn(300);
          self.trigger.text("↓ 隐藏悬浮元素");
        };
        self.visible=!self.visible;
      });
    this.trigger.appendTo(tstart).css({
      float: "right",
      height: "80%",
      background: "#EFEFEF",
      border: "1px solid #666"
    });
  }
  window.cCleaner= new CCleaner();
});
}