// ==UserScript==
// @name        Bangumi posts stalker
// @namespace   Bangumi
// @author      zolunx10@hotmail.com
// @description     Bangumi帖子脱水功能(naive) view specified user's post only
// @include http://bangumi.tv/*/topic/*
// @include http://bgm.tv/*/topic/*
// @include http://chii.in/*/topic/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==
// version 1.0 - 2012-04-14


var w;
if (typeof(Browser) =='undefined'){
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
if(Browser.chrome || typeof unsafeWindow == 'undefined') {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  w = div.onclick();
} else {
  w= unsafeWindow;
}
// Add jQuery
(function(){
  var $;
  if (typeof jQuery != 'undefined') {
    $= jQuery;
  } else if (typeof w.jQuery != 'undefined') {
    $= w.jQuery;
  }
  if ($) {
    main($);
  } else {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');

    GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;
    GM_JQ.addEventListener('load', function() {
      var $ = w.jQuery.noConflict(true);
      main($);
    });

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
})();

// All your GM code must be inside this function
function main($) {
  var $postList= $();
  $postList.hasStalked= false;
  $postList.unstalk= function() {
    this.each(function() {
      $(this).show()
        .data('stalker').text("追踪");
    });
    this.hasStalked= false;
  }
  $postList.stalk= function(userName) {
    this.each(function() {
      var $this=$(this);
      if ($this.data('userName') !=userName) {
        $this.hide();
      } else {
        $this.show()
          .data('stalker').text("X|已追踪");
        if ($this.hasClass('sub_reply_bg')) {   //如果是子回复, 还是把对应回复显示出来吧
          $this.parents('.row_reply').show()
            .data('stalker').text("");
        }
      }
    });
    this.hasStalked= true;
  }
  $('a.avatar', $('div.postTopic').add('#comment_list')).each(function() {
    var $div= $(this).parent();   //每条post第一层必包含.avatar头像
    $div.data('userName', $(this).attr('href'));
    $postList.push($div);
    var $stalker= $('<a>').text('追踪').addClass('btn-stalk')
          .css({
            margin:"0 3px",
            cursor:"pointer"
          });
    $('div.re_info', $div).first().prepend($stalker);
    $div.data('stalker', $stalker);
    $stalker.click(function() {
      if ($postList.hasStalked) {
        $postList.unstalk();
      } else {
        $postList.stalk($div.data('userName'));
      }    
    });
  });
};