// ==UserScript==
// @name        JingFM Song Title Desktop Notification
// @namespace   -
// @include     *://jing.fm/*
// @version     0.8
// @copyright   BSD协议
// @description JingFM歌名的桌面提醒
// @grant       none
// ==/UserScript==

if ((function () {
  var wwn = window.webkitNotifications;
  if (!wwn) {
    alert('您的浏览器不支持桌面提示功能。');
    return false;
  };
  var permission = wwn.checkPermission();
  console.log(permission);
  if (permission === 0) return true;
  else if (permission === 2) {
    alert('您的浏览器拒绝了桌面提醒功能。');
    return false;
  } else {
    var d = document.createElement('div');
    d.innerHTML = [
      '<div id="snDstpNtf" ',
        'style="position: absolute; top: 20px; left: 20px; ',
        'width: 10em; height: 2em; font-size: 20px; cursor: pointer" >',
        '确认桌面提醒权限',
      '</div>'
    ].join('');
    d.firstChild.addEventListener('click', function () {
      wwn.requestPermission(function () {
        window.location.reload();
      });
    });
    document.body.appendChild(d.firstChild);
  };
  return false;
}())) (function () { 
  var name = null;
  (function () {
    try {
      var t = document.querySelector('#mscPlr .tit').firstChild.nodeValue;
      if (t !== name) {
        name = t;
        setTimeout(function () {
          if (name !== t) return;
          var wwn = window.webkitNotifications;
          var img = document.querySelector('#rotateCD').style.backgroundImage.slice(5, -2);
          var title = 'JingFM';
          var body = t;
          var n = wwn.createNotification(img, title, body);
          n.ondisplay = function () {
            setTimeout(function () { n.cancel(); },  5000);
          };
          n.show();
        }, 3000);
      }
    } catch (e) {}
    setTimeout(arguments.callee, 1000);
  }());
}());

