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
      $ = unsafeWindow.jQuery.noConflict(false);
      main();
    }
  }
  
  GM_wait();
})();

function script() {
  var $ = jQuery;
  var doLoop = false;
  
  var ytPlayer = document.getElementById("movie_player");

  ytlooperStateChange = function(s) {
    if(s == 0 && doLoop) {
      ytPlayer.playVideo();
    }
  };
  ytPlayer.addEventListener('onStateChange', 'ytlooperStateChange');
  
  var toggle = $('<button role="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" type="button" onclick=";return false;"><img alt="" class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-quicklist-autoplay"></button>');
  $('#watch-flag').after(toggle);
  toggle.css('margin-left', '3px');
  toggle.click(function() {
    toggle.toggleClass('yt-uix-button-toggled');
    toggle.children().toggleClass('ytlooper-on');

    doLoop = !doLoop;
  });
  $('head').append('<style type="text/css"> .ytlooper-on { background: url("//s.ytimg.com/yt/imgbin/www-master-vflFC5Mdu.png") no-repeat scroll -16px -374px transparent; height: 18px; width: 20px; }</style>'); 
}

function main() {
  var node = document.createElement("script");
  node.innerHTML = "("+script+")()";
  document.body.appendChild(node);
}