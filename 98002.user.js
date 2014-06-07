// ==UserScript==
// @name           YoutubeLooper
// @include        http://www.youtube.com/watch*
// ==/UserScript==

// Add jQuery
var $;
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement
    var GM_JQ = document.createElement('script');
   
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;
   
    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  
  function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait, 100);
    } else {
      $ = unsafeWindow.jQuery.noConflict(true);
      main();
    }
  }
  
  GM_wait();
})();

String.prototype.bool = function() {
    return (/^true$/i).test(this);
};

function script() {
  String.prototype.bool = function() {
    return (/^true$/i).test(this);
  };
  var ytPlayer = document.getElementById("movie_player");
  var ytlooper = document.getElementById("ytlooper");
  ytlooperStateChange = function(s) {
    if(s == 0) {
      if(ytlooper.getAttribute('loop').bool()) {
        ytPlayer.playVideo();
      }
    }
  };
  ytPlayer.addEventListener('onStateChange', 'ytlooperStateChange');
}

function main() {
  var node = document.createElement("script");
  node.innerHTML = "("+script+")()";
  $(node).attr('id', 'ytlooper');
  $(node).attr('loop', false);
  document.body.appendChild(node);
  var toggle = $('<button role="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" type="button" onclick=";return false;"><img alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-quicklist-autoplay"></button>');
  $('#watch-flag').after(toggle);
  toggle.css('margin-left', '3px');
  toggle.click(function() {
    toggle.toggleClass('yt-uix-button-toggled');
    toggle.children().toggleClass('ytlooper-on');

    var next = !$(node).attr('loop').bool();
    $(node).attr('loop', next);
  });
  $('head').append('<style type="text/css"> .ytlooper-on { background: url("//s.ytimg.com/yt/imgbin/www-master-vflFC5Mdu.png") no-repeat scroll -16px -374px transparent; height: 18px; width: 20px; }</style>');
}