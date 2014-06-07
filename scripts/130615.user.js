// ==UserScript==
// @name           Youtube Large
// @namespace      ytlarge
// @version        5
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
  
  
// 3 = large, 2 = medium, 1 = small  
function resizePlayer(size){
  c = $('#watch7-container');
  
  if(size < 3) c.removeClass('watch-large'); 
  else  c.addClass('watch-large');
  
  if(size < 2) { c.removeClass('watch-medium'); c.removeClass('watch-wide'); }
  else { c.addClass('watch-medium');  c.addClass('watch-wide'); }
  
  
  $('#watch7-sentiment-actions .yt-uix-button-focused').removeClass('yt-uix-button-focused');
  $('#qB'+size).addClass('yt-uix-button-focused');  
}

if(unsafeWindow){
  unsafeWindow.resizePlayer = resizePlayer;
}

$(function() {  
  buttons = '<span class="yt-uix-button-group " data-button-toggle-group="required">'+
'<button id="qB1" role="button" data-button-toggle="true" class="yt-uix-button yt-uix-button-text yt-uix-button-default" type="button" onclick="resizePlayer(1);return false;" style="margin-right: 4px">360p</button>'+
'<button id="qB2" role="button" data-button-toggle="true" class="yt-uix-button yt-uix-button-text yt-uix-button-default" type="button" onclick="resizePlayer(2);return false;" style="margin-right: 4px">480p</button>'+
'<button id="qB3" role="button" data-button-toggle="true" class="yt-uix-button yt-uix-button-text yt-uix-button-default" type="button" onclick="resizePlayer(3);return false;" style="margin-right:0">720p</button>'+
'</span>';
  $('#watch7-sentiment-actions').append(buttons);
  
  // hide comments by default
  $('#comments-view > *').filter(":visible").addClass('c-hidden').hide();
  $('.comments-pagination').filter(":visible").addClass('c-hidden').hide();
  $('#comments-view').append('<div id="show-comments" class="comments-pagination"><div><a class="yt-uix-button yt-uix-pager-button yt-uix-button-default" href="#"><span class="yt-uix-button-content">Show comments</span></a></div></div>');
  $('#show-comments a').bind('click', function(event) {
    $('#show-comments').hide();
    $('.c-hidden').slideDown();
    event.stopImmediatePropagation();
    return false;
  });
  var sec = 0;
  intv = window.setInterval(function() {
    if(++sec > 5) 
      window.clearInterval(intv);
    if(resizePlayer)
      resizePlayer(3);
  }, 150);
});