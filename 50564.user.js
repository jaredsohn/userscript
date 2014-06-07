// ==UserScript==
// @name          TOTube
// @namespace     TOTube
// @description   Watch YouTube with MPlayer/Xine/VLC, always get the best quality
// @include       http://*youtube.*/watch?*
// ==/UserScript==

var defaultWidth = 480;
var defaultHeight = 380;
var mimetype = 'video/mpeg';
  
var width = GM_getValue('mplayer_width', defaultWidth);
var height = GM_getValue('mplayer_height', defaultHeight);
var lock = GM_getValue('mplayer_lock', true);

var player = document.getElementById('watch-player-div');
var video_info = unsafeWindow.swfArgs;

if (player == null || video_info == null) {
  alert('HQTube needs updating, it is no longer compatible.');
  return;
}

// http://blog.jimmyr.com/High_Quality_on_Youtube_11_2008.php
var fmt = '';
if (video_info.fmt_map == null) {
    alert('No fmt_map in youtube');
    return;
}

fmts = video_info.fmt_map.split("/");
fmt = fmts[0];
if (fmt!=parseInt(fmt)) {
    alert('Format '+fmt+' is not numeric');
    return;
}

fmt=parseInt(fmt);

switch(fmt) {
    case 18:
        fmt_desc = "Medium Quality (480px, 512b/s)";
        break;
    case 34:
        fmt_desc = "Standard Quality (320px, 200b/s)";
        break;
    case 35:
        fmt_desc = "High Quality (640px, 900b/s)";
        break;
    case 22:
        fmt_desc = "HD Video (1280px, 2000b/s)";
        break;
    case 17:
        fmt_desc = "Mobile (176px)";
        break;
    default:
        fmt_desc = "no desc for "+fmt;
        break;
}

var src = 'http://youtube.com/get_video?'+
            'video_id='+video_info.video_id+
            '&t='+video_info.t+
            '&fmt='+fmt;

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
  ' Format: '+fmt_desc+' ('+fmt+')'+
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
