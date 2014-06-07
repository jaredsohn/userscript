// ==UserScript==
// @name           THUMBS™
// @description    THUMBS™ for NUMA! Arachnid is never going to fix anything, have some home-grown svg fix.
// @include        http://www.nmaps.net/*
// @include        http://numa-notdot-net.appspot.com/*
// @match        http://www.nmaps.net/*
// @match        http://numa-notdot-net.appspot.com/*
// ==/UserScript==

function addJQuery(callback) { var script = document.createElement("script"); script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"); script.addEventListener('load', function() { var script = document.createElement("script"); script.textContent = "(" + callback.toString() + ")();"; document.body.appendChild(script); }, false); document.body.appendChild(script); } addJQuery(main);

function main(){
  var thumbs_server = "numa.dustri.es";

  $("img").each(function(){
    if ( $(this).attr('src').search('static.notdot.net') == -1 || $(this).attr('src').search('numa') == -1 || $(this).attr('src').search('avatars') !== -1 ) return;
    
    var $container = $("<div>");
    if ( $(this).hasClass('thumbnail') || $(this).hasClass('thumb') ) $container.attr('class', $(this).attr('class'));
    else $container.attr('style', 'position: relative; height: 100px;');
    
    var $newthumb = $("<embed>").attr({
      src: $(this).attr('src').replace("static.notdot.net", thumbs_server) + '?v=0.9',
      type: "image/svg+xml",
      width: '132px',
      height: '100px'
    });
    
    var $overlay = $("<img>").attr('src', 'http://' + thumbs_server + '/numa/blank.gif').css({
      width: '132px',
      height: '100px',
      position: 'absolute',
      top: 0,
      left: 0
    });
    
    if ( $(this).attr('src').search('full') !== -1 ) {
      $container.attr('height', '600px');
      $newthumb.attr({width: '792px', height: '600px'});
      $overlay.css({width: '792px', height: '600px'});
    }
    
    if ( $(this).hasClass('thumbnail') ) {
      $arg = {duration: 400, step: function(now, fx) { 
        $(".thumbnail").css(fx.prop, fx.now);
        $(".thumbnail embed").attr(fx.prop, fx.now);
      }};
      $overlay.hover(
        function () {
          $overlay.stop().animate({height: 600, width: 792}, $arg);
        },
        function () {
          $overlay.stop().animate({height: 100, width: 132}, $arg);
        }
      )
    }
    $container.append($newthumb).append($overlay);
    $(this).parent().prepend($container);
    $(this).remove();
  });
}