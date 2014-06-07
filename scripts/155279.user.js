// ==UserScript==
// @name         Disable Tieba img. view mode
// @namespace    http://jixun.org/
// @version      0.5.1
// @description  好讨厌 >.>
// @include      *://tieba.com/*
// @include      *://www.tieba.com/*
// @include      *://tieba.baidu.com/*
// @copyright    2012+, jixun66
// @run-at       document-start
// ==/UserScript==

// 获取窗口对象
try {
    var w = unsafeWindow;
} catch (e) {
    var w = window;
}

addEventListener ('DOMContentLoaded', function () {
  try {
    function removeElement (elementNode) { try { elementNode.parentNode.removeChild (elementNode); } catch (e) { /* Do nothing */ } }
    var imgs = document.querySelectorAll ("img.BDE_Image");
    for (var i = 0; i < imgs.length; i++) {
      var $regexp = /\/sign=[a-z0-9]+\/(.+)/i, $r = imgs[i].src.match(new RegExp($regexp));
      if (!$r) continue;
      var nHolder = document.createElement ('a');
      nHolder.href   = '//imgsrc.baidu.com/forum/pic/item/' + $r[1];
      nHolder.title  = '单击查看大图';
      nHolder.target = '_blank';
      imgs[i].src    = nHolder.href;
      imgs[i].style.cursor = 'pointer';
      imgs[i].parentNode.insertBefore (nHolder, imgs[i]);
      nHolder.appendChild (imgs[i]);
    }
    removeElement (document.querySelector ('#pic_to_album_tip'));
    var wrps = document.querySelectorAll ("div.fav-wrapper");
    
    for (var i = 0; i < wrps.length; i++)
      removeElement (wrps[i]);
    
    // 清理贴吧绑定的单击事件，在其它脚本加载完毕后执行。
    var eScr = document.createElement ('script');
    eScr.innerHTML = '('+function(){$('.BDE_Image').off('click')}.toString()+')()';
    document.body.appendChild (eScr);
    
  } catch (e) { alert ('Please report the following error to http://jixun.org/\r\n' + e); }
}, false);