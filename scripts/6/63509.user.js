// ==UserScript==
// @name          HQTube
// @namespace     HQTube
// @description   Watch YouTube with MPlayer/Xine/VLC
// @include       http://*youtube.*/watch?*
// ==/UserScript==

var defaultWidth = 480;
var defaultHeight = 380;
var mimetype = 'video/quicktime';
  
var width = GM_getValue('mplayer_width', defaultWidth);
var height = GM_getValue('mplayer_height', defaultHeight);
var lock = GM_getValue('mplayer_lock', true);
var format = GM_getValue('mplayer_format', 'default');


var player = document.getElementById('watch-player-div');
var video_info = unsafeWindow.yt.getConfig('SWF_ARGS');

if (player == null || video_info == null) {
  alert('HQTube needs updating, it is no longer compatible.');
  return;
}

// http://blog.jimmyr.com/High_Quality_on_Youtube_11_2008.php
var fmt = '';
switch (format) {
  case '6':
    if (video_info.fmt_map) {
      fmt = '&fmt=6';
      break;
    }
  case '18':
    fmt = '&fmt=18';
    break;
}
var src = 'http://youtube.com/get_video?'+
            'video_id='+video_info.video_id+
            '&t='+video_info.t+
            fmt;

var nohover_border = '3px dashed white';
var hover_border = '3px dashed orange';
var drag_border = '3px dashed red';

player.innerHTML = 
  '<div id="resize_left" style="float:left;border-left:'+nohover_border+';height:' + height + 'px;width:0;margin-left:-8px;cursor:w-resize;"></div>' +
  '<div id="resize_right" style="float:right;border-right:'+nohover_border+';height:' + height + 'px;width:0;margin-right:-8px;cursor:e-resize;"></div>' +
  '<embed id="new_player" style="float:left;margin-bottom:4px;" src="' + src + '"' +
  ' width="' + width + '"' +
  ' height="' + height + '"' +
  ' autoplay="yes"' + 
  ' loop="no"' +
  ' type="'+mimetype+'"></embed>'+
  '<div id="resize_bottom" style="clear:left;height:0;border-bottom:'+nohover_border+';cursor:s-resize;"></div>'+
  '<div id="toolbar" style="border:1px solid #ccc;line-height:20px;margin-top:10px;padding:5px;">' +
  ' <a href="'+src+'" style="float:right">Download</a>'+
  //' <button id="fs_button">Fullscreen</button>'+
  ' Format: '+
    (fmt == '' ? 'default (~200kbps mono)' + 
      (video_info.fmt_map ? ' HQ available' : ''): '')+
    (fmt == '&fmt=6' ? 'HQ (~900kbps mono)' : '')+
    (fmt == '&fmt=18' ? 'MP4 (~512kbps stereo)' : '')+
  ', Length: '+
    Math.floor(video_info.l/60)+':'+
    (video_info.l%60 < 10 ? '0' : '')+(video_info.l%60)+
  '</div>';

var new_player = document.getElementById('new_player');
/*
var fs_button = document.getElementById('fs_button');
fs_button.addEventListener('click', function(event) {
  new_player.video.fullscreen = true;
}, false);
*/
var bars = {
  'left': document.getElementById('resize_left'),
  'right': document.getElementById('resize_right'),
  'bottom': document.getElementById('resize_bottom')
};

var dragging = false;
var mousedownX = 0;
var mousedownY = 0;

var baseColumn = document.getElementById('baseDiv');
var leftColumn = document.getElementById('watch-this-vid');

var resize = function() {

  new_player.style.width = width+'px';
  baseColumn.style.width = 875-480+width+'px';
  leftColumn.style.width = width+'px';

  new_player.style.height = height+'px';
  bars.left.style.height = height+'px';
  bars.right.style.height = height+'px';
};
resize();


var show = function() {

  bars.left.style.borderLeft = hover_border;
  bars.right.style.borderRight = hover_border;
  bars.bottom.style.borderBottom = hover_border;
};
var hide = function() {

  bars.left.style.borderLeft = nohover_border;
  bars.right.style.borderRight = nohover_border;
  bars.bottom.style.borderBottom = nohover_border;
};
var startDragging = function() {

  bars.left.style.borderLeft = drag_border;
  bars.right.style.borderRight = drag_border;
  bars.bottom.style.borderBottom = drag_border;
};
var stopDragging = function() {

  GM_setValue('mplayer_width', width);
  GM_setValue('mplayer_height', height);
  dragging = false;
  show();
};
  
for (var i in bars) {

  (function() {

    // need a enclosed variable
    var key = i;

    bars[key].addEventListener('mouseover', function(event) {
      if (!dragging) {
        show();
      }
    }, false);
    bars[key].addEventListener('mouseout', function(event) {
      if (!dragging) {
        hide();
      }
    }, false);
    bars[key].addEventListener('mousedown', function(event) {
      dragging = key;
      mousedownX = event.clientX;
      mousedownY = event.clientY;
      startDragging();
    }, false);

  }());

}

document.body.addEventListener('mouseout', function(event) {
  if (dragging && 
    (event.relatedTarget === null 
     || event.relatedTarget.nodeName == 'HTML'
     || event.relatedTarget.nodeName == 'xul:slider'
     || event.relatedTarget.nodeName == 'scrollbar')) {

    stopDragging();
  }
}, false);
document.body.addEventListener('mouseup', function(event) {
  if (dragging) {
    stopDragging();
  }
}, false);
document.body.addEventListener('mousemove', function(event) {

  if (dragging == 'left') {
    var ratio = width/height;
    width += Math.round((mousedownX - event.clientX)*2);
    mousedownX = event.clientX;
    if (lock) {
      height = Math.round(width / ratio);
    }
    resize();
  }
  else if (dragging == 'right') {
    var ratio = width/height;
    width -= Math.round((mousedownX - event.clientX)*2);
    mousedownX = event.clientX;
    if (lock) {
      height = Math.round(width / ratio);
    }
    resize();
  }
  else if (dragging == 'bottom') {
    var ratio = width/height;
    height -= mousedownY - event.clientY;
    mousedownY = event.clientY;
    if (lock) {
      width = Math.round(ratio * height);
    }
    resize();
  }
}, false);

GM_registerMenuCommand('Lock aspect ratio (default)', function() {

  lock = true;
  GM_setValue('mplayer_lock', lock);

});

GM_registerMenuCommand('Unlock aspect ratio', function() {

  lock = false;
  GM_setValue('mplayer_lock', lock);

});

GM_registerMenuCommand('Reset size to default', function() {

  width = defaultWidth;
  height = defaultHeight;

  GM_setValue('mplayer_width', width);
  GM_setValue('mplayer_height', height);

  resize();

});

GM_registerMenuCommand('Use default format (~200kpbs mono) always', function() {

  GM_setValue('mplayer_format', 'default');
  location.reload();

});

GM_registerMenuCommand('Use MP4 format (~512kbps stereo) always', function() {

  GM_setValue('mplayer_format', '18');
  location.reload();

});

GM_registerMenuCommand('Use HQ FLV format (~900 kbps mono) when available, fallback to MP4', function() {

  GM_setValue('mplayer_format', '6');
  location.reload();

});


// use the "Related Videos" container to construct next/prev links
var checkRelatedVideos = null;
var title = document.title.replace(/^YouTube - /, '');
var watchRelatedVideosBody = document.getElementById('watch-related-vids-body');

if (watchRelatedVideosBody == null || title == null) {

  alert('HQTube needs updating, can not find the related videos');
  return;
}

checkRelatedVideos = setInterval(function() {

  if (watchRelatedVideosBody.innerHTML.search(/Loading\.\.\./) != -1) {
    GM_log('related not loaded yet, waiting...');
    return;
  }
  GM_log('constructing next/prev');

  clearInterval(checkRelatedVideos);
  var related = watchRelatedVideosBody.getElementsByTagName('img');
  // |one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eightteen|ninteen
  var tailPatterns = [
    '(\\d+)\\s*of\\s*\\d+',
    '(\\d+)\\s*\\/\\s*\\d+',
    'part\\s*(\\d+)',
    '(\\d+)$'
  ];
  var patternType = null;
  var titleParts = null;
  for (var i = 0; i < tailPatterns.length; i++) {
     titleParts = title.match(new RegExp('^(.*)'+tailPatterns[i], 'i'));
     if (titleParts) {

       patternType = i;
       break;
     }
  }
  if (patternType == null) {

    GM_log('could not determin series type');
    return;
  }

  
  var headPattern = titleParts[1].replace(/([\(\)\[\]\{\}|*?+^$\\])/g, '\\$1');
  //GM_log(headPattern);

  var pattern = new RegExp('^('+headPattern+')'+tailPatterns[patternType], 'i');

  for(var i = 0; i < related.length; i++) {

    var parts = related[i].title.match(pattern);
    if (parts) {

      var direction = '';

      if (parts[2] == parseInt(titleParts[2])+1) {

        direction = 'Next';
      }
      else if (parts[2] == titleParts[2]-1){

        direction = 'Prev';
      }

      if (direction) {

        var newLink = document.createElement('a');
        var toolbar = document.getElementById('toolbar');
        newLink.href = related[i].parentNode.href;
        newLink.title = related[i].title;
        newLink.innerHTML = direction;
        newLink.style.cssFloat = 'right';
        newLink.style.paddingLeft = '5px';
        toolbar.insertBefore(newLink, toolbar.firstChild);

      }
    }
  }

}, 1000);
