// ==UserScript==
// @name          ShowURI!
// @namespace     http://userscripts.org/users/268703/
// @description   Shows page's URI as QR code (2D barcode) - useful for easy load into mobile devices.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version       0.2
// @include       *
// ==/UserScript==

// Position of QR code on the screen: TL|TR|BL|BR:
// TL: Top left
// TR: Top right
// BL: Bottom left
// BR: Bottom right
//
var position = GM_getValue('position', 'BR');

// Size of QR code (in pixels):
var codeSize = 300;

// Padding:
var padding = '2px';



var imageAddress, $d, $t;


function getStyle (position) {
  return {
    'TL': {
      'top': padding,
      'left': padding,
      'bottom': '',
      'right': ''
    },
    'TR': {
      'top': padding,
      'left': '',
      'bottom': '',
      'right': padding,
    },
    'BL': {
      'top': '',
      'left': padding,
      'bottom': padding,
      'right': ''
    },
    'BR': {
      'top': '',
      'left': '',
      'right': padding,
      'bottom': padding
    }
  }[position];
}

function removeQR () {
  $d.remove();
}

function hideQR () {
  $d.fadeOut(removeQR);
}

function moveQR () {
  var p = ['BR', 'BL', 'TL', 'TR'];
  var i = $.inArray(position, p);
  if (-1 == i++) {
    return false;
  }
  position = p[i >= p.length ? 0 : i];
  GM_setValue('position', position);
  $d.css(getStyle(position));
}

function showQr () {
  $d.animate({
    'width': (codeSize + 22) + 'px',
    'height': (codeSize + 8) + 'px'
  });
  $t
    .bind('load', function () {
      $t.css({
        'cursor': 'auto'
      });
    })
    .unbind('click', showQr)
    .animate({
      'width': codeSize + 'px',
      'height': codeSize + 'px'
    })
    .css({
      'cursor': 'wait'
    })
    .attr({
      'src': imageAddress
    });
}

function setOn () {
  GM_setValue('status', 'on');
}

function setOff () {
  GM_setValue('status', 'off');
}

function prepareDom () {
  imageAddress = [
    'http://chart.googleapis.com/chart?cht=qr&chs=',
    codeSize, 'x', codeSize,
    '&chl=', location.href,
    '&choe=UTF-8'
  ].join('');
  $('body').prepend('<div style="z-index: 10000; background: none repeat scroll 0% 0% rgb(255, 255, 255); border: 0; position: fixed; height: 28px; width: 42px; margin: 0; padding: 1px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.5)"><img src="data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAAoKChQUFB8fHykpKTMzMz09PVJSUlxcXGZmZnBwcHp6eoWFhY+Pj5mZmaOjo62trcLCwszMzNbW1uDg4Ovr6/X19f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA A AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAFAAUAAAI/wAvCBxIsKDBCQ4SJqwAAaGDCgoTThDoAIFCAxIgOACwQIIBhRYpVizAIIGEAgoOSJCQgEEBiw5EFgCQwGQABhRU1gRQIKHIkg9MKnBgoGOCoAx8XiBaMwEBCQoQIBgggUDTjwIrrNxqYUIFBQEsbF1ZQSAEAQRUKoBAQIAAAE8P8FR64UGDBgYQKFhgwMABAX0TRI15IUKCBgIWOFAwAAGAjAkZeJx4QesBpBAgKJBwAGWFCRYaQMg6VoIFBBUuPwDwGEFmigaaPq2AIDZgAw0k/jxqUgIABwwaTigwwAHlhDNrVj3weQKDCwVuDkyIgKTJngtULlhwukLZpTCJShdo/Ji1AQoQIkQQ6FAhxIW6RxucT/9CQAA7" style="width: 20px; height: 20px; display: inline-block; margin: 2px; border: 2px solid #000; cursor: pointer;" alt="QR" title="click to open, doubleclick to move" /><span style="float: right; width: 12px; height: 12px; background: #f00; color: #fff; cursor: pointer; font-family: sans-serif; font-size: 14px; font-weight: bold; margin: 2px 2px 0pt 0pt; line-height: 12px; text-align: center;" title="close">×</span></div>');
  $d = $('div:first').css(getStyle(position));
  $t = $('img:first', $d)
    .bind('click', showQr)
    .bind('dblclick', moveQR);
  $('span:first', $d).bind('click', removeQR);
}

function showAll () {
  prepareDom();
  showQr();
}

function run () {
  if (this.window.location.href !== this.window.parent.location.href) {
    return;
  }
  if ('off' == GM_getValue('status')) {
    GM_registerMenuCommand('showURI!', showAll);
    GM_registerMenuCommand('turn showURI! to full action', setOn);
    return;
  }
  prepareDom();
  GM_registerMenuCommand('showURI!', showQr);
  GM_registerMenuCommand('turn showURI! to standby mode', setOff);
}

run();
