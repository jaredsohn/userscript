// ==UserScript==
// @name           Youtube UI Tweaks
// @namespace      net.uoco.dev.youtube.fixes
// @description    Youtube UI Tweaks
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==
// ------------------- default to subscriptions -------------------

(function() {
  
  if (window.location.pathname === '/' && window.location.search.length === 0) {
    window.location.pathname = '/feed/subscriptions';
    return;
  }
  
  $('#playlists-guide-item a').attr('href', '/feed/playlists');
  $('a.guide-item[href="/"]').attr('href', '/?default');
  $('a[href="/"]').attr('href', '/feed/subscriptions');
  
})();

// ------------------- remove user icon --------------------------

$('#yt-masthead-user .yt-masthead-user-icon').remove();

// ------------------- remove feedback button --------------------------

$('#yt-hitchhiker-feedback').remove();

// ------------------- nicer subscriptions page -------------------

var right_side = $('.branded-page-related-channels');
var guide_subs = $('#guide-subscriptions-section');
var manage = $('#gh-management').detach();

right_side.filter(':gt(0)').remove();
right_side.empty();

guide_subs.before(manage);
guide_subs.children('h3').remove();

var div_subs = $('<div></div>');
div_subs.attr('id', guide_subs.attr('id'));
div_subs.attr('class', guide_subs.attr('class'));
div_subs.append(guide_subs.children().detach());

div_subs.find('#guide-channels')
  .removeClass('yt-uix-scroller')
  .css('max-height', 'none');
  
div_subs.find('a.guide-item > .guide-count')
  .css('color', '#fff');
  
div_subs.find('a.guide-item').each(function() {
  this.href += '/u';
});

div_subs.find('hr').remove();
div_subs.css('margin-top', '15px');

right_side.append(div_subs);

$('span.guide-management-plus-icon').parent()
  .css('padding-left', '4px').end().remove();
  
$('span.guide-management-settings-icon').parent()
  .css('padding-left', '4px').end().remove();
  
$('#guide-main .guide-module-content')
  .css('margin-bottom', '10px');
  
$('head').append(
   '<style>' +
   '.feed-author-bubble-container { display: none; }' + 
   '.feed-item-container .feed-item-main { margin-left: 0 }' +
   '.feed-item-container.legacy-style .feed-item-main { margin-left: 0 }' +
   '#guide-main .personal-item .guide-item { padding-right: 20px; text-align: right; }' +
   '#guide-main .personal-item .guide-item .thumb { display: none; }' +
   '#guide-subscriptions-section h3 { display: none; }' +
   '#guide-subs-footer-container { padding: 2px 0px 8px 0px; }' +
   '.guide-sort-container { display: none; }' +
   '.guide-quick-filter { width: 145px !important; }' + 
   '.guide-quick-filter { width: 145px !important; }' + 
   '.guide-count { display: none; }' +
   '</style>'
);

// ------------------- prevent pushState-------------------

var __pushState = unsafeWindow.history.pushState;
unsafeWindow.history.pushState = function(state, title, url) {
  window.location = url;
};

// ------------------- bigger videos ----------------------
// ---------- (some other stuff mixed in too) -------------

(function() {
  
  if (window.location.pathname.indexOf('/watch') !== 0) return;    
  var is_chrome = window.chrome;

  $('body').append(
    '<style>' + 
    '#watch7-playlist-bar-toggle-button { display: inline-block !important; }' + 
    '.watch-medium #player-api-legacy, .watch-medium #player-api { z-index: auto; }' + 
      
    (!is_chrome ? // if not chrome
    '.watch-medium #player-api-legacy > *, .watch-medium #player-api > * { width: 100% !important; ' + 
    '   height: 100% !important; position: fixed; z-index: 9999999; top: 0px;' + 
    '   left: 0px; }' : '') +
      
    '#player-api-legacy, #player-api { width: 980px; height: 580px; }' + 
    '#watch7-playlist-tray-container { height: 580px; transition: none; width: 340px; left: -340px; }' +
    '#watch7-playlist-tray { border-bottom: 0px; overflow: auto; }' +
    '#watch7-playlist-tray .yt-uix-button-playlist-remove-item { display: none; }' +
    '#watch7-playlist-data.watch7-playlist { width: 980px; }' + 
    '#watch7-playlist-tray .video-list-item { padding-right: 0px !important }' + 
    '#watch7-playlist-tray .video-list-item .title { padding-right: 13px; }' + 
    '#watch7-sidebar { margin-top: 0px !important; padding-top: 13px !important; }' + 
    '#watch7-video-container { background: none !important; }' +    
    '.watch-wide #watch7-sidebar { margin-top: 13px !important; }' +
    '#player-legacy, #player { background: none !important; overflow: hidden; }' +
    '.watch-branded-banner { background: none !important; }' +
    '#player-branded-banner-legacy, #player-branded-banner { display: none; }' +
    '#watch7-sidebar { max-width: 360px; width: 360px; margin-left: 610px; padding-right: 0px !important; margin-right: 0px !important; }' +
    '#watch7-content { width: 610px; }' +
    '#page-container, #yt-masthead-container { padding-left: 20px !important; padding-right: 20px !important; }' + 
    '#watch-context-container .guide-module-content hr:first-child { display: none; }' + 
    '#watch-context-container ul li:hover { opacity: 1; }' +
    '#watch-context-container ul li { opacity: 0.5; }' +
    '#watch-context-container ul li img { border-radius: 10px; }' +
    '#watch7-playlist-tray-trim { display: none; }' +
    '#guide-main .guide-module-content { height: auto; }' + 
    '.watch7-playlist-bar-right { margin-right: 0px; }' +
    '#page.watch #guide-container { padding-top: 5px !important; }' +
    '#ticker { display: none; }' +
    '#watch-description-content { min-height: 25px !important; }' +
    '#watch-description-content { height: 25px !important; }' +
    '#comments-view #comment-flag-area + h4 { display: none; }' +
    '#comments-view h4 + .video-list { display: none; }' +
    '#comments-view .video-list + hr { display: none; }' +
    '#watch-uploader-info { margin-bottom: 15px; }' +
    '#watch-description-text { margin-bottom: 15px; }' +
    '#watch-description-clip { margin-bottom: 10px }' +
    '#watch-description-expand { margin-top: 20px; }' +
    '#player-legacy, #player-legacy *, #player, #player * { transition: none !important; }' +
      
    (is_chrome ? // if chrome
    'body.fill-fix * { padding-left: 0 !important; padding-top: 0 !important; padding-right: 0 !important; padding-bottom: 0 !important; }' +
    'body.fill-fix * { margin-left: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; }' +
    'body.fill-fix #page-container { padding-left: 0 !important; padding-right: 0 !important; }' +
    'body.fill-fix #masthead-expanded-acct-sw-container, body.fill-fix #yt-masthead-container, body.fill-fix #masthead-expanded, ' +
    'body.fill-fix #alerts, body.fill-fix #header, body.fill-fix #playlist { display: none !important; }' +
    'body.fill-fix * { z-index: 0 !important; }' +
    '' : '') +
      
    '@media screen and (min-width: 1600px) {' +
    '   #player-api-legacy, #player-api { width: 1246px; height: 730px; }' +
    '   #watch7-playlist-tray-container { height: 730px; }' +
    '   #watch7-playlist-data.watch7-playlist { width: 1246px; }' + 
    '   .watch7-playlist-bar-left { width: 906px; }' +
    '   #watch7-sidebar { width: 520px; max-width: 520px; margin-left: 716px; }' +
    '   #watch7-content { width: 716px; }' +
    '}' +
    '</style>'
  );
  
  if (is_chrome) {
    var _window = $(window);
    var _current = {};
    var _player_api = $("#player-api-legacy");
    if (!_player_api.size()) _player_api = $("#player-api");
    var _player_api_e = _player_api.find("embed");
  }
    
  var player = $('#player-legacy');
  if (!player.size()) player = $('#player');
  player.addClass('watch-playlist-collapsed');
  var cur_has_medium = -1;
  var check_overflow = function() { 
    var has_medium = player.hasClass('watch-medium');
    if (has_medium !== cur_has_medium) {
      player.addClass('watch-playlist-collapsed');
      cur_has_medium = has_medium;    
      if (has_medium) {
        $(document.body).css('overflow', 'hidden');
      } else {
        $(document.body).css('overflow', '');
      }
      if (is_chrome) {
        if (has_medium) {
          $(document.body).addClass("fill-fix");
          var w_width = _window.width();
          var w_height = _window.height();    
          _player_api.css('width', w_width);
          _player_api.css('height', w_height);
        } else {
          $(document.body).removeClass("fill-fix");
          _player_api.css('width', '');
          _player_api.css('height', '');
          _player_api.css('margin-top', '');
          _player_api.css('margin-left', '');
        }
      }
    }
  };
    
  if (is_chrome) {
    _window.resize(function() {
      if (!cur_has_medium) return;
      var w_width = _window.width();
      var w_height = _window.height();    
      _player_api.css('width', w_width);
      _player_api.css('height', w_height);
    });
  }
  
  var after_load_0 = function() {
    $('#watch-description-extra-info li').each(function() {
      if ($(this).find('.offer-image-thumbnail').size())
        $(this).remove();
    });
  };
  
  var after_load_1 = function() { 
    if (done_after_load_1) return after_load_2();
    setTimeout(after_load_1, 250);    
    player.addClass('watch-playlist-collapsed');
    if ($('#guide-main .guide-module-toggle').size() && !$('#guide-main .guide-module-loading').size()) {
      $('#guide-main .guide-module-toggle').click().remove();
      $('#gh-personal a.narrow-item').removeClass('narrow-item');
      done_after_load_1 = true;
    }
  };
  
  var after_load_2 = function() { 
    if (done_after_load_2) return after_load_3();
    setTimeout(after_load_2, 250);
    if ($(' .guide-module-toggle').size() && !$('#watch-context-container .guide-module-loading').size()) {      
      $('#guide-main .guide-module-content')
        .css('margin-bottom', '0')
        .css('height', 'auto');
      $('#guide-main').css('margin-bottom', '0');
      var content = $('#watch-context-container .guide-module-content').detach();
      $('#watch-context-container').replaceWith($('<div id="watch-context-container" class="guide-module"></div>'));
      $('#watch-context-container').append(content).css('opacity', '1');
      content.find('li span.video-thumb').remove();
      content.find('ul').css('max-height', '1000px');
      content.find('hr:first-child').removeClass('guide-context-separator-top');
      content.find('hr:last-child').remove();
      content.show();
      done_after_load_2 = true;
    }
  };
  
  var after_load_3 = function() {
    if (done_after_load_3) return;
    setTimeout(after_load_3, 250);
    var gss = $('#guide-subscriptions-section');
    if (!gss.size()) return;
    gss.parent().append(gss.detach());
    done_after_load_3 = true;
  }
  
  var done_after_load_1 = false;
  var done_after_load_2 = false;
  var done_after_load_3 = false;
  
  setTimeout(after_load_0, 250);
  setTimeout(after_load_1, 250);
  setInterval(check_overflow, 50);
  
  var embed = $('#movie_player');
  var fvars = embed.attr("flashvars");
  embed.attr("flashvars", fvars + "&vq=hd720&wide=1");
  embed.replaceWith(embed.clone());
  
})();