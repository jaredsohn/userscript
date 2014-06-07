// ==UserScript==
// @name        bilibili Show Pages
// @namespace   http://userscripts.org/users/ts
// @description 在 bilibili 上，鼠标长按视频链接显示视频各分页的链接，方便直接打开想要的分页。（本脚本包含于 Replace bilibili bofqi ）
// @include     /^http://([^/]*\.)?bilibili\.kankanews\.com(/.*)?$/
// @include     /^http://([^/]*\.)?bilibili\.tv(/.*)?$/
// @version     1.4
// @updateURL   https://tiansh.github.io/us-blbl/bilibili_show_pages/bilibili_show_pages.meta.js
// @downloadURL https://tiansh.github.io/us-blbl/bilibili_show_pages/bilibili_show_pages.user.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @copyright   GNU GPL v3, CC BY-SA 3.0
// @author      田生
// @run-at      document-start
// ==/UserScript==

/*

bilibili Show Pages
在 bilibili 上，鼠标长按视频链接显示视频各分页的链接，方便直接打开想要的分页。

【功能】

  想要看某个视频的特定分页，却不想点进去第一分页后再切到后面的分页？这个脚本可以显示一个选择分页的菜单，供你直接进入想要的分页。
  在视频链接上长按鼠标，会显示一个包括该视频分页信息的菜单。菜单标题为直接点击链接后指向的分页，下方为该视频的所有分页。
  本脚本是 Replace bilibili bofqi 的一部分（去除了恢复原站播放器等功能），如果安装了该脚本请勿再安装本脚本，否则可能发生冲突。
  如果你使用其他恢复播放器的脚本则可以考虑使用本脚本。
  注意：本脚本*不支持*直接跳转到外站（如乐视）的视频。


【浏览器兼容性】

  本脚本可以在以下浏览器上运行：
    * Firefox浏览器 + GreaseMonkey附加组件
    * Chrome浏览器 + TamperMonkey扩展程序
    * Opera浏览器 +　Violent monkey扩展


【权限与隐私】

  脚本使用了 GM_addStyle 接口用于添加菜单的样式。
  脚本使用了 GM_xmlhttpRequest 接口用于访问相应地视频页面以获取分页信息。
  脚本访问的页面限于 /viedo/avXXX 的页面，和可能的由该链接跳转到的地址。
  脚本没有本地存储，也不会访问其他地址。


【历史版本】
   * 1.4  ：修理Chrome/Oprea下专题链接的支持，脚本迁移到github
   * 1.3  ：菜单顶部显示专题链接
   * 1.2  ：在弹出的菜单上长按鼠标不会再弹出菜单，支持专题中的链接
   * 1.1  ：修复用户空间页面下的错误链接，更新菜单样式
   * 1.0  ：添加更新地址
   * 0.1  ：初始版本

【关于】

  脚本使用 GNU GPL v3 或 CC BY-SA 3.0 协议。
 

*/

(function addStyle() {
  GM_addStyle([
'#bsp-menu-container, #bsp-menu-container * { all: unset; }',
'#bsp-menu-container .bsp-menu {',
  'font-size: 16px;',
  'border: 4px solid rgba(204, 204, 204, 0.5); border-radius: 4px;',
  'position: absolute; z-index: 10000;',
  'background: #fff;',
  'background-clip: padding-box;',
  'overflow-x: hidden; overflow-y: auto;',
  'min-width: 256px;',
  'text-align: left;',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-item {',
  'overflow: hidden;',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-item:last-child {',
  'float: left; width: calc(100% - 16px);',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-link {',
  'height: 32px;',
  'width: 100%;',
  'overflow: hidden;',
  'display: block;',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-item:last-child .bsp-menu-link {',
  'width: calc(100% + 16px);',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-link span {',
  'height: 24px; line-height: 24px;',
  'display: block;',
  'position: relative;',
  'padding: 4px 16px;',
  'margin: 0;',
  'white-space: nowrap;',
  'cursor: pointer;',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-title {',
  'text-align: center;',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-bg,',
'#bsp-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-fg {',
  'position: relative;',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-bg { margin-bottom: -32px; z-index: 10000; }',
'#bsp-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-fg { color: transparent; z-index: 10001;',
  'background-image: linear-gradient(to right,',
  'rgba(255, 255, 255, 0) 0,',
  'rgba(255, 255, 255, 0) calc(100% - 64px),',
  '#fff calc(100% - 16px),',
  '#fff 100%);',
'}',
'#bsp-menu-container .bsp-menu .bsp-menu-link .bsp-menu-bg { color: #00a1d6; }',
'#bsp-menu-container .bsp-menu .bsp-menu-link:hover .bsp-menu-bg { color: #f25d8e; }',
'#bsp-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-fg, #rbb-menu-container .bsp-menu .bsp-menu-link a.bsp-menu-fg:hover { color: transparent; }',
'#bsp-menu-container .bsp-menu.bsp-menu-with-sp { padding-top: 32px;}',
'#bsp-menu-container .bsp-menu .bsp-menu-sp { position: absolute; top: 0; text-align: center; width: 100%; }',
'#bsp-menu-container .bsp-menu .bsp-menu-link .bsp-menu-sp-logo {',
'  background-image: url("http://static.hdslb.com/images/v2images/icons_home.png");',
'  background-position: 5px -627px;',
'  display: inline-block;',
'  height: 16px;',
'  margin: -6px 0;',
'  padding: 4px;',
'  width: 16px;',
'}',
  ].join(''));
}());


document.addEventListener('DOMContentLoaded', function () {

  var bilibili = {
    'url': {
      'host': [
        'www.bilibili.tv',
        'bilibili.kankanews.com',
      ],
      'av': [
        'http://www.bilibili.tv/video/av',
        'http://bilibili.kankanews.com/video/av',
        'http://acg.tv/av',
      ],
      'video': 'http://{host}/video/av{aid}/index_{pid}.html',
    },
    'host': location.host,
    'timeout': {
      'press': 250,
    },
    'text': {
      'fail': {
        'default': '（加载失败）',
      },
    },
    'html': {
      'menu': function (menu) {
        var menuLink = function (href, title, sp) {
          if (!sp) sp = '';
          else sp = '<span class="bsp-menu-sp-logo"></span>';
          return [
          '<a href="', href, '" target="_blank" class="bsp-menu-link">',
            '<span class="bsp-menu-bg" >', sp, xmlEscape(title), '</span>',
            '<span class="bsp-menu-fg" >', sp, xmlEscape(title), '</span>',
          '</a>'].join('');
        };
        return ['<div class="bsp-menu', (menu.sp ? ' bsp-menu-with-sp' : ''),'" style="width: 0; height: 0;">',
          (menu.sp ? (['<div class="bsp-menu-sp">',
              menuLink(menu.sp.href, menu.sp.title, true),
            '</div>'].join('')) : ''),
          '<div class="bsp-menu-title">', menuLink(menu.href, menu.title), '</div>',
          menu.submenu.map(function (item) {
            return ['<div class="bsp-menu-item">',
              menuLink(item.href, item.title),
            '</div>'].join('');
          }).join(''),
        '</div>'].join('');
      },
    },
  };
  if (bilibili.url.host.indexOf(bilibili.host) === -1) bilibili.host = bilibili.url.host[0];

  var xmlEscape = function (text) {
    var x = document.createElement('textarea');
    x.textContent = text;
    return x.innerHTML;
  };

  var initMenuDom = function (menu) {
    var items = menu.querySelectorAll('.bsp-menu-item');
    menu.style.maxHeight = 32 * (items.length + 1) + 'px';
    if (items.length > 8) menu.style.minHeight = 32 * (8 + 1) + 'px';
    else menu.style.minHeight = 32 * (items.length + 1) + 'px';
    if (items.length !== 0) menu.style.resize = 'both';
  };

  // 从URL中截取aid(av), pid号
  var videoPage = function (href, nullpage) {
    var aid, pid;
    if (typeof href !== 'string') return null;
    if (!bilibili.url.av.map(function (h) { return href.indexOf(h) === 0; })
      .reduce(function (x, y) { return x || y; })) return null;
    if (!(aid = Number(href.replace(/^[^?#]*av(\d+).*$/, '$1')))) return null;
    pid = Number(href.replace(/^[^?#]*av\d+\/index_(\d+)\.html(\?.*)?(#.*)?$/, '$1')) || null;
    if (!nullpage && pid === null) pid = 1;
    return { 'aid': aid, 'pid': pid };
  };

  var menuContainer = (function () {
    var container = null;
    return function () {
      if (!container) {
        container = document.createElement('div'); container.id = 'bsp-menu-container';
        document.body.parentNode.appendChild(container);
      }
      return container;
    };
  }());

  // 显示分页菜单
  var chosePage = function (a, position, nodedata, title, sp) {
    // 显示菜单
    var show = function (menu, position) {
      menuContainer().appendChild(menu);
      if (menu.clientWidth + position.x > document.body.clientWidth) {
        menu.style.right = (document.body.clientWidth - position.x - 8) + 'px';
        menu.className += ' bsp-float-right'
      } else menu.style.left = (position.x - 8) + 'px';
      menu.style.top = (position.y - 6 + (sp ? -32 : 0)) + 'px';
      return menu;
    };
    // 隐藏菜单
    var hide = function (menu) {
      delete menu.parentNode.removeChild(menu);
    };
    // 检查某个元素是否在另一个元素内
    var contains = function (menu, obj) {
      for (; obj; obj = obj.parentNode) if (obj === menu) return true;
      return false;
    };
    // 构造菜单信息
    var item = {};
    item.href = a.href;
    if (nodedata && title) {
      item.title = title;
      item.submenu = (nodedata || []).map(function (nodedata) {
        return {
          'title': nodedata[0],
          'href': 'http://' + bilibili.host + nodedata[1] + a.search + a.hash,
        };
      });
      if (sp) item.sp = sp;
      item.expand = true;
    } else {
      item.title = bilibili.text.fail.default;
      item.submenu = [];
    }
    // 显示菜单
    var displayTime = new Date();
    var menu = document.createElement('div');
    menu.innerHTML = bilibili.html.menu(item);
    menu = menu.firstChild;
    initMenuDom(menu);
    show(menu, position);
    // 在菜单外点击鼠标时隐藏菜单
    var menuHidden = function (event) {
      // 如果点击事件发生在菜单内则不隐藏菜单
      if (contains(menu, event.target)) return;
        // 如果菜单刚刚被显示不超过半秒则不隐藏菜单
      else if (new Date() - displayTime < 500) return;
      else {
        hide(menu);
        document.body.removeEventListener('mousedown', menuHidden);
      }
    };
    document.body.addEventListener('mousedown', menuHidden);
  };

  // 加载菜单
  var showMenu = function (a, id, position) {
    var oldOnclick = a.onclick;
    a.onclick = function () { a.onclick = oldOnclick; return false; };
    a.style.cursor = 'progress';
    var doneLoading = function () {
      a.onclick = oldOnclick;
      a.style.cursor = 'auto';
    };
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': 'http://' + bilibili.host + '/video/av' + id.aid + '/',
      'onload': function (resp) {
        var doc, pages, title, nodedata = null, spo, sp = null;
        try {
          doc = new DOMParser().parseFromString(resp.responseText, 'text/html')
          pages = doc.querySelectorAll('#dedepagetitles option');
          nodedata = Array.apply(Array, pages).map(function (opt) {
            return [opt.innerHTML, opt.value];
          });
          title = doc.querySelector('.viewbox h2').innerHTML;
          spo = doc.querySelector('.v_bgm_list .info .detail a');
          if (spo) {
            sp = { 'title': spo.textContent, 'href': spo.getAttribute('href') };
          }
        } catch (e) { }
        chosePage(a, position, nodedata, title, sp);
        doneLoading();
      },
      'onerror': function () {
        chosePage(a.href, position, null, null, null);
        doneLoading();
      },
    });
  };

  // 按住鼠标时进行处理
  var holdMouse = (function () {
    if (!document.body) return;
    var lastPosition;
    document.body.addEventListener('mousedown', function (event) {
      var a = event.target, id;
      while (a && a.tagName && a.tagName.toUpperCase() !== 'A' && a.tagName.toUpperCase() !== 'AREA') a = a.parentNode;
      // 检查链接是视频页面
      if (!a || !a.href || !(id = videoPage(a.href, true)) || id.aid === 1) return;
      if (!(function () {
        for (var p = a; p && typeof p.className === 'string'; p = p.parentNode) {
        // 检查链接不在菜单内
          if (p.className.split(' ').indexOf('rbb-menu-link') !== -1) return false;
          if (p.className.split(' ').indexOf('bsp-menu-link') !== -1) return false;
        // 检查链接不是分页的选项链接
          if (p.className.split(' ').indexOf('alist') !== -1) return false;
      }
        return true;
      }())) return;
      // 如果用户按到了一个指向视频的链接，则开始工作
      lastPosition = {
        'x': event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft),
        'y': event.clientY + (document.body.scrollTop || document.documentElement.scrollTop)
      };
      var timeout;
      var actions = ['mouseup', 'mouseleave', 'mouseout', 'drag'];
      var mh = function () {
        clearTimeout(timeout);
        actions.forEach(function (e) { a.removeEventListener(e, mh); });
      };
      actions.forEach(function (e) { a.addEventListener(e, mh); });
      // 只有按住足够长时间才执行这段
      timeout = setTimeout(function () {
        showMenu(a, id, lastPosition);
        actions.forEach(function (e) { a.removeEventListener(e, mh); });
      }, bilibili.timeout.press);
    });
  }());

});

