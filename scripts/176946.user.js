// ==UserScript==
// @name        Replace bilibili bofqi
// @namespace   http://userscripts.org/users/ts
// @description 替换 bilibili.tv ( bilibili.kankanews.com ) 播放器为原生播放器，直接外站跳转链接可长按选择播放位置，处理少量未审核或仅限会员的视频。
// @include     /^http://([^/]*\.)?bilibili\.kankanews\.com(/.*)?$/
// @include     /^http://([^/]*\.)?bilibili\.tv(/.*)?$/
// @version     2.33
// @updateURL   https://tiansh.github.io/rbb/replace_bilibili_bofqi.meta.js
// @downloadURL https://tiansh.github.io/rbb/replace_bilibili_bofqi.user.js
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_addStyle
// @grant       unsafeWindow
// @copyright   GNU GPL v3, CC BY-SA 3.0
// @author      田生
// @run-at      document-start
// ==/UserScript==

// 如果想要修改程序的相关配置，可以直接在这里修改。
// 这些配置会存储到文件中，因此即便自动升级，也会保留之前的配置，不必禁用自动升级。
// 如果为null则表示这里将使用原来设置的值或默认值。
var config = {
  'debug': null, // 是否打印调试信息（Boolean，默认false）
  'cache_active': null, // 是否使用磁盘缓存（Boolean，默认true）
  'cache_maxsize': null, // 缓存最大条目数 （Number，默认10000）
  'check': null, // 是否检查替换后是否能正常播放（Boolean，默认true）
  'export': null, // 是否向外部暴露接口（Boolean，默认true）
  'netmax': null, // 通过相邻视频推测时最多检查多少个视频（Number，默认50）
  'cmenu_type': null, // 是否显示复杂的菜单项（String，"default"需要时 "complete"总是 "simple"从不）
  'clean': false, // 这里为true的话会清空所有本地设置，全部使用默认值，上面的所有设置将无效
};

/*

Replace bilibili bofqi
替换 bilibili.tv ( bilibili.kankanews.com ) 播放器为原生播放器，直接外站跳转链接可长按选择播放位置，处理少量未审核或仅限会员的视频。


项目主页： https://tiansh.github.io/rbb/


【历史版本】

   * 2.33 ：二次元新番列表显示隐藏的视频
   * 2.32 ：修理对页面广告的兼容性（因为我一直在用ABP所以没发现）
   * 2.31 ：播放页面500也可以播给你看！
   * 2.30 ：少量代码整理，修理下拉菜单为空时边框显示，修理无法加载到信息的视频的菜单项
   * 2.29 ：没有播放器时，长按链接菜单将生成页面排到前面
   * 2.28 ：改善推断视频地址算法，修理获取标题失败问题；鉴于最近的一些情况，在404页面启用脚本
   * 2.27 ：生成页面增加显示番剧信息，修复生成页面长按鼠标菜单的相关问题
   * 2.26 ：调整样式，增强Chrome/Oprea在用户空间页面的兼容性
   * 2.25 ：修理Chrome/Oprea下显示专题链接的问题
   * 2.24 ：长按鼠标菜单显示专题链接
   * 2.23 ：长按选择播放位置的菜单中共享弹幕池的若干分页只显示最后一个分页
   * 2.22 ：将脚本迁移到github
   * 之前的版本请到 http://userscripts.org/scripts/show/176946 查看


【关于】

  脚本使用 GNU GPL v3 或 CC BY-SA 3.0 协议。

*/


var preLoaded = (function () {
  // 检查是否是生成用的页面，如果是的话则标记并隐藏内容
  var fakePage = function () {
    var prefix = '/video/av1/index_1.html';
    if (location.pathname.indexOf(prefix) !== 0) return false;
    if (location.hash.indexOf('rbb=') === 0) return false;
    GM_addStyle('html { display: none; }');
    document.title = '哔哩哔哩 - ( ゜- ゜)つロ 乾杯~ - bilibili.tv';
    return true;
  };
  return {
    'fakePage': fakePage()
  };
}());

// 替换当前页面的播放器
var cosmos = function () {

  var bilibili = {
    'url': {
      'bilibili': 'bilibili.tv',
      'host': [
        'www.bilibili.tv',
        'bilibili.kankanews.com',
        'www.bilibili.cn',
      ],
      'av': [
        'http://www.bilibili.tv/video/av',
        'http://bilibili.kankanews.com/video/av',
        'http://www.bilibili.cn/video/av',
        'http://acg.tv/av',
      ],
      'video': 'http://{host}/video/av{aid}/index_{pid}.html',
      'iframe': {
        'secure': 'https://secure.bilibili.tv/secure,',
        'ssl': 'https://ssl.bilibili.tv/secure,',
      },
      'bofqi': 'https://secure.bilibili.tv/secure,cid={cid}&aid={aid}',
      'flash': [
        'https://static-s.bilibili.tv/play.swf',
        'https://static-s.bilibili.tv/live-play.swf',
        'http://static.hdslb.com/play.swf',
        'http://static.hdslb.com/live-play.swf',
      ],
      'bflash': 'https://static-s.bilibili.tv/play.swf?cid={cid}&aid={aid}',
      'sp': {
        'spview': 'http://api.bilibili.cn/spview?spid={spid}&season_id={season_id}&bangumi=1',
        'spid': 'http://api.bilibili.tv/sp?spid={spid}',
      },
      'view': [
        { // 网页Flash播放器的passkey （batch参数是额外加上去的）
          'url': 'http://api.bilibili.cn/view?type=json&id={aid}&batch=1&appkey=8e9fc618fbd41e28',
          'ua': navigator.userAgent,
        },
        { // 手机客户端的passkey（苹果系统与安卓系统的区别在于platform参数和userAgent）
          'url': 'http://api.bilibili.cn/view?type=json&id={aid}&batch=1' +
            '&platform=ios&appkey=0a99fa1d87fdd38c',
          'ua': 'bilianime/570 CFNetwork/672.0.8 Darwin/14.0.0',
        },
      ],
      'playurl': 'http://interface.bilibili.cn/playurl?cid={cid}',
      'player': 'http://interface.bilibili.cn/player?id=cid:{cid}',
      'page_arc': 'http://static.hdslb.com/js/page.arc.js',
      'suggest': 'http://www.bilibili.tv/suggest?term=av{aid}' +
        '&jsoncallback={callback}&rnd={random}&_={date}',
      'html5': 'http://www.bilibili.tv/m/html5?aid={aid}&page={pid}',
      'pagelist': 'http://www.bilibili.tv/widget/getPageList?aid={aid}',
    },
    'text': {
      'fail': {
        'get': '获取cid失败，若刷新对此无效则可能对该视频无效。',
        'getc': '获取cid失败，若刷新对此无效则可能对该视频无效。顺便找到了一些附近的隐藏视频……',
        'check': '无法替换播放器，（网络访问出错或原视频链接已失效）；视频源：{source}。(cid:{cid})',
        'msg': '无法替换播放器，错误信息：{msg}；视频源：{source}。(cid:{cid})',
        'unsupport': '无法替换{source}源的视频。{msg}(cid:{cid})',
        'default': '（加载失败）',
        'unexpect': '（无法解析的服务器返回）',
        'server': '（服务器太忙请重试）',
        'network': '（网络访问出错）',
        'notexist': '（该视频当前不可用）',
        'live': '（不支持直播视频）',
      },
      'force': {
        'replace': '强制替换',
        'message': '已经替换为原始播放器，替换的播放器可以完成“加载视频地址…”吗？',
        'reload': '否—刷新重试',
        'rollback': '否—放弃替换',
        'done': '是—完成替换',
      },
      'loading': {
        'near': '正在试图通过相邻视频查找cid，需要一些时间，且可能不准确。',
        'check': '已得到cid，检查加载视频地址… (cid:{cid})',
        'checks': '加载视频地址…',
        'ignore': '跳过检查',
        'wait': '等待加载',
      },
      'menu': {
        'page': '生成网页',
        'swf': '仅播放器',
        'origen': '原始页面',
        'chose': '选择分页',
        'sp': '专题页',
      },
      'succ': {
        'replace': '已成功替换播放器，若无法正常播放请刷新页面或禁用替换。视频源：{source}。(cid:{cid})',
        'add': '已成功找到第{pid}分页，分页可能有缺少或错误。(cid:{cid})',
        'rollback': '禁用替换',
      },
      'title': '{title} - 哔哩哔哩 - ( ゜- ゜)つロ 乾杯~ - bilibili.tv',
      'disable': {
        'message': '当前页面已禁用对播放器的替换。',
        'redo': '撤销禁用',
      },
      'split': {
        'pid': '、',
      },
      'source': {
        'site': {
          'iqiyi': '爱奇艺',
          'sina': '新浪',
          'qq': '腾讯',
          'letv': '乐视',
          'mletv': '乐视移动云',
          'youku': '优酷',
          'sohu': '搜狐',
          'pptv': 'PPTV',
          'local': '本地',
        },
        'other': '（其他网站）',
        'unknown': '（未知）',
        'multi': '（多个视频）',
        'unsupport': ['iqiyi'],
        'api': '（声称）',
        'playurl': '（实际）',
      },
    },
    'video': {
      'ignore': [1, 1113, 8219],
    },
    'host': location.host,
    'timeout': {
      'press': 200,
      'network': 1000,
    },
    'html': {
      'button': function (value) {
        return '<button style="cursor:pointer; margin-left: 2em;">' + xmlEscape(value) + '</button>';
      },
      'bofqi': function (url) {
        return [
          '<iframe height="482" width="950" class="player" src="', xmlEscape(url), '" ',
            'scrolling="no" border="0" frameborder="no" framespacing="0" ',
            'onload="window.securePlayerFrameLoaded=true">',
          '</iframe>',
          '<img src="https://secure.bilibili.tv/images/grey.gif" id="img_ErrCheck" style="display:none" />',
          '<script type="text/javascript" src="http://static.hdslb.com/js/page.player_error.js"></script>',
        ].join('');
      },
      'menu': function (items, sp) {
        if (sp) items.unshift({
          'href': sp.href,
          'title': bilibili.text.menu.sp,
          'sp': true,
        });
        return ['<div class="rbb-menu', (sp ? ' rbb-menu-with-sp' : ''), '">',
          '<div class="rbb-menu-title">',
            '<span class="rbb-menu-message"></span>',
          '</div>',
          items.map(function genMenuItem(item, i) {
            return ['<div class="rbb-menu-item">',
              (item.href ? ['<a class="rbb-menu-link" href="', xmlEscape(item.href), '" target="_blank">',
                (item.sp ? '<span class="rbb-menu-sp-logo"></span>' : ''),
                xmlEscape(item.title),
              '</a>'].join('') :
              ['<span>', xmlEscape(item.title), '</span>'].join('')),
              (item.submenu ? ['<div class="rbb-submenu">',
                item.submenu.map(genMenuItem).join(''),
              '</div>'].join('') : ''),
            '</div>'].join('');
          }).join(''),
        '</div>'].join('');
      },
      'menu2': function (menu, sp) {
        var menuLink = function (href, title, sp) {
          if (!sp) sp = '';
          else sp = '<span class="bsp-menu-sp-logo"></span>';
          return [
          '<a href="', href, '" target="_blank" class="bsp-menu-link">',
            '<span class="bsp-menu-bg" >', sp, xmlEscape(title), '</span>',
            '<span class="bsp-menu-fg" >', sp, xmlEscape(title), '</span>',
          '</a>'].join('');
        };
        return ['<div class="bsp-menu', (sp ? ' bsp-menu-with-sp' : ''),'" style="width: 0; height: 0;">',
          (sp ? (['<div class="bsp-menu-sp">',
              menuLink(sp.href, sp.title, true),
            '</div>'].join('')) : ''),
          '<div class="bsp-menu-title">', menuLink(menu.href, menu.title), '</div>',
          menu.submenu.map(function (item) {
            return ['<div class="bsp-menu-item">',
              menuLink(item.href, item.title),
            '</div>'].join('');
          }).join(''),
        '</div>'].join('');
      },
      // 简化的视频页面
      'page': [
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ',
        '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        '<html xmlns="http://www.w3.org/1999/xhtml">',
        '<head>',
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">',
          '<title>{title} - 哔哩哔哩 - ( ゜- ゜)つロ 乾杯~ - bilibili.tv</title>',
          '<meta name="title" content="{title}" />',
          '<link rel="stylesheet" ',
            'href="http://static.hdslb.com/images/jquery-ui/smoothness/jquery-ui.css" type="text/css">',
          '<link rel="stylesheet" href="http://static.hdslb.com/css/new_z.css" type="text/css" />',
          '<script type="text/javascript" src="http://static.hdslb.com/js/jquery.min.js"></script>',
          '<script type="text/javascript" src="http://static.hdslb.com/js/jquery-ui.min.js"></script>',
          '<script type="text/javascript" src="http://static.hdslb.com/js/base.core.v2.js"></script>',
          '<script type="text/javascript" src="http://static.hdslb.com/js/page.arc.js"></script>',
          '<script type="text/javascript" src="http://static.hdslb.com/js/video.min.js"></script>',
        '</head>',
        '<body>',
        '<div class="z">',
          // 关灯用
          '<div id="heimu"></div>',
          // 视频信息（仅标题）
          '<div class="viewbox">',
            '<div class="info">',
              '<h2 title="{title}">{title}</h2><div class="arcrank"></div>',
              '<div class="tminfo" xmlns:v="http://rdf.data-vocabulary.org/#">&nbsp;</div>',
              '<div class="sf">',
                '<a href="/ass/{aid}.html" class="ass" target="_blank" id="assdown"></a>',
                '<a onclick="goQuote();" class="f" style="visibility:hidden!important"></a>',
                '<a href="http://www.bilibili.tv/m/stow?aid={aid}" onclick="return showStow({aid},this);" ',
                  'class="s" target="_blank"></a>',
              '</div>',
              '<div class="stowbox"></div>',
            '</div>',
            '<div class="alist"><div id="alist"></div></div>',
          '</div>',
          // 播放器
          '<div class="scontent" id="bofqi">',
            '<iframe height="482" width="950" class="player" ',
              'src="about:blank" scrolling="no" border="0" ',
              'frameborder="no" framespacing="0" onload="window.securePlayerFrameLoaded=true"></iframe>',
            '<img src="https://secure.bilibili.tv/images/grey.gif" id="img_ErrCheck" style="display:none" />',
            '<script type="text/javascript" src="http://static.hdslb.com/js/page.player_error.js"></script>',
          '</div>',
          // 新番专题信息
          '<div class="v_bgm_list" style="">',
          '</div>',
          // 标签和描述
          '<div class="s_center">',
            '<div class="s_div">',
              '<div class="s_tag">',
                '<ul class="tag"></ul>',
                '<span id="newtag">',
                  '<a href="javascript:;" class="btn_w" onclick="return addNewTag({aid})">增加TAG</a>',
                '</span>',
              '</div>',
              '<div class="intro">',
                '{description}',
              '</div>',
            '</div>',
          '</div>',
          '<div style="overflow:hidden;">',
            // 评论
            '<div class="common">',
              '<div class="sort"><i>评论列表</i></div>',
              '<div class="comm">',
                '<img src="http://static.hdslb.com/images/v2images/morecomm.gif" border="0" ',
                  'class="comm_open_btn" onClick="var fb = new bbFeedback(\'.comm\', \'arc\');',
                  'fb.show({aid}, 1);" style="cursor:pointer" />',
              '</div>',
            '</div>',
            // 评分（功能不可用，该元素用于定位视频播放器）
            '<div class="rat" style="opacity:0!important"><div class="sort"><i>评分&推荐</i></div>',
            '<div class="arc_r_box" id="arc_r_box"></div></div>',
          '</div>',
        '</div>',
        // 更新页面上的标签信息
        '<script>',
          'var aid=\'{aid}\', mid=\'{mid}\', spid=0;',
          'var isSpAtt="0", isSpFav="0";',
          '$(function () {<}',
            'kwtags({kwtags},[]);',
            'spid={spid}',
          '{>});',
        '</script>',
        '</body>',
        '</html>',
      ].join('\n'),
      'v_bgm_list': [
        '<div class="video">',
          '<div class="sort"><i>分集列表</i><ul id="v_bgm_list_tab" class="swc"></ul></div>',
          '<div id="v_bgm_list_page"></div>',
          '<div id="v_bgm_list_data"></div>',
          '<div id="v_bgm_list_toggle"><span class="autoheight">查看更多</span></div>',
        '</div>',
        '<div class="info">',
          '<img src="{spcover}" />',
          '<div class="detail">',
            '<a class="t" href="{spurl}" target="_blank">{sptitle}</a>',
            '<div class="i">总<b>{bangumi}</b>话 相关视频<b>{relative}</b>个</div>',
            '<div id="sp_dingyue"><p class="dy" onclick="subscribeSp(this,spid)">订阅</p></div>',
          '</div>',
        '</div>',
      ].join(''),
    },
    'js': {
      'page': 'http://static.hdslb.com/js/page.arc.js',
      'list': [
        'http://static.hdslb.com/js/jquery.min.js',
        'http://static.hdslb.com/js/jquery-ui.min.js',
        'http://static.hdslb.com/js/base.core.v2.js',
        'http://static.hdslb.com/js/page.arc.js',
        'http://static.hdslb.com/js/video.min.js',
      ],
      // 接收来自播放器窗口的请求
      // 函数中代码来自 http://static.hdslb.com/js/page.arc.js
      'post': ['javascript: void(function () {var c;',
        'window.postMessage?(c=function(a){"https://secure.bilibili.tv"!=a.origin',
            '&&"https://ssl.bilibili.tv"!=a.origin||"secJS:"!=a.data.substr(0,6)',
            '||eval(a.data.substr(6));',
          '"undefined"!=typeof console&&console.log(a.origin+": "+a.data)},',
          'window.addEventListener?window.addEventListener("message",c,!1):',
          'window.attachEvent&&window.attachEvent("onmessage",c)):',
        'setInterval(function(){if(evalCode=__GetCookie("__secureJS"))',
        '{__SetCookie("__secureJS",""),eval(evalCode)}},1000);',
      '}());'].join(''),
      // 拉到下方时显示浮动播放器窗口的代码
      // 函数中代码来自 http://static.hdslb.com/js/page.arc.js
      'float': ['javascript: void(function () {',
        'var r=$("#bofqi"),o=r.offset().top+r.height()+100,h=0,j=!1;$(document).',
        'scroll(function(){o==r.offset().top+r.height()+100||r.hasClass("float")||',
        '(o=r.offset().top+r.height()+100);$(window).scrollTop()>o?r.hasClass(',
        '"float")||(j||0==$(".comm").find("ul").length)||($(\'<div class="dami"></div>\')',
        '.insertBefore(r),$(\'<div class="move"><div class="gotop">\u56de\u5230\u9876\u90e8</div>',
        '<div class="t">\u70b9\u51fb\u6309\u4f4f\u62d6\u52a8</div><div class="close">',
        '\u5173\u95ed</div></div>\').prependTo(r),0<$(".huodong_bg").length&&$(".huodong_bg")',
        '.hide(),r.addClass("float").css({left:$(".rat").offset().left,opacity:0}).stop()',
        '.animate({opacity:1},300),730>=$(window).height()&&r.css({top:"inherit",bottom:"5px"}))',
        ':(j&&(j=!1),r.hasClass("float")&&(f(),$(".move",r).remove(),$(".dami").remove(),',
        'r.removeClass("float"),r.css({left:"",top:"",bottom:""}),0<$(".huodong_bg").length&&',
        '$(".huodong_bg").show()))});r.hover(function(){r.hasClass("float")&&!h&&$(".move",r).show()},',
        'function(){h||$(".move",r).hide()});$(r).delegate(".move","mousedown",function(e){h=1;',
        '$("body,#bofqi").addClass("noselect");$(this).addClass("on");$(\'<div class="mmask"></div>\')',
        '.appendTo("body");var d=e.pageX-$(this).offset().left,g=e.pageY-$(this).offset().top;',
        '$(document).bind("mousemove",function(b){var l=b.clientX-d,c=b.clientY-g<=$(window).height()',
        '-r.height()?b.clientY-g:$(window).height()-r.height(),c=b.clientY-g>=$(window).height()-',
        'r.height()-5?$(window).height()-r.height()-5:0>=b.clientY-g?0:b.clientY-g;r',
        '.css({left:l,top:c})})});$(r).delegate(".move","mouseup",function(b){f()});$(r)',
        '.delegate(".move .close","click",function(b){j=!0;f();$(".move",r).remove();$(".dami")',
        '.remove();r.removeClass("float");r.css({left:"",top:"",bottom:""});0<$(".huodong_bg")',
        '.length&&$(".huodong_bg").show()});$(r).delegate(".move .gotop","click",function(b){',
        '$("html,body").animate({scrollTop:$(".viewbox").offset().top},300)});var f=function(){',
        'h=0;$(".mmask").remove();$(document).unbind("mousemove");$("body,#bofqi")',
        '.removeClass("noselect");$(".move",r).removeClass("on")}',
      '}());'].join(''),
    },
  };
  if (bilibili.url.host.indexOf(bilibili.host) === -1) bilibili.host = bilibili.url.host[0];

  // 以setTimeout调用函数
  var call = function (f) { setTimeout(f, 0); };

  // 刷新配置项
  bilibili.config = (function () {
    var ret = {};
    // 这里是默认配置，请勿直接修改这里，修改配置请到文件开头
    var defaultConfig = {
      'debug': false,
      'cache_active': true,
      'cache_maxsize': 10000,
      'check': true,
      'export': true,
      'netmax': 50,
      'cmenu_type': 'default',
    };
    var readConfig = function (key) {
      if (config[key] === null) config[key] = GM_getValue(key, null);
      if (config[key] === null) config[key] = defaultConfig[key];
      config[key] = defaultConfig[key].constructor(config[key]);
      if (config[key] !== config[key] || config.clean) config[key] = defaultConfig[key];
    };
    var flushConfig = function (key) {
      GM_setValue(key, config[key]);
      ret[key] = config[key];
    };
    return (function () {
      var keys = Object.keys(defaultConfig);
      keys.forEach(readConfig);
      keys.forEach(flushConfig);
      call(function () { debug('RBB config: %o', ret); });
      return ret;
    }());
  }());

  // 打印调试信息
  var debug = (function () {
    if (bilibili.config.debug) return console.log.bind(console);
    return function () { };
  }());

  // 使用aid, cid等变量替换上述常量URL中{}内的相关内容
  var genStr = (function () {
    var key = function (x, y) {
      try {
        return [x].concat(y.split('.'))
          .reduce(function (a, b) { return a[b]; }) || null;
      } catch (e) { return null; }
    };
    var find = function (str, datas) {
      return [null].concat(datas).reduce(function (ret, set) {
        if (ret !== null) return ret;
        return key(set, str) || null;
      });
    };
    return function (base, esc, datas) {
      base = base.replace(/{([^}]*)}/g, function (o, i) {
        var ret = find(i, datas);
        if (ret === null) return ''; else return esc(ret);
      });
      return base;
    };
  }());
  var genURL = function (url) {
    var datas = Array.apply(Array, arguments).slice(1).concat(bilibili);
    return genStr(url, encodeURIComponent, datas);
  };
  var genXML = function (xml) {
    var datas = [{ '<': '{', '>': '}' }]
      .concat(Array.apply(Array, arguments).slice(1)).concat(bilibili);
    return genStr(xml, function (s) { return s; }, datas);
  };

  // 通过链接获取主机地址
  var getHost = function (url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
  };

  // XML字符转义
  var xmlEscape = function (s) {
    return String(s).replace(/./g, function (c) { return '&#' + c.charCodeAt(0) + ';'; });
  };

  // 处理地址中#后面的本地参数
  var hashArg = (function () {
    var href2A = function (href) {
      var a = document.createElement('a');
      a.href = href;
      return a;
    };
    // 向地址的本地参数中设置参数
    var set = function (key, val, a) {
      var f = false;
      var str = key + '=' + encodeURIComponent(val);
      if (typeof a === 'string') a = href2A(a);
      var hash = ((a || location).hash || '#').slice(1).split('&').map(function (kv) {
        var arg = kv.match(/^([^=]*)=(.*)$/);
        if (!arg || !arg[2] || arg[1] != key) return kv;
        f = true; return str;
      }).filter(function (s) { return s.length > 0; });
      if (!f) hash = hash.concat([str]);
      (a || location).hash = '';
      (a || location).hash = '#' + hash.join('&');
      return (a || location).href;
    };
    // 从地址的本地参数中读取参数
    var get = function (key, a) {
      var val = null;
      if (typeof a === 'string') a = href2A(a);
      ((a || location).hash || '#').slice(1).split('&').forEach(function (kv) {
        var arg = kv.match(/^([^=]*)=(.*)$/);
        if (!arg || !arg[2] || arg[1] != key) return kv;
        val = decodeURIComponent(arg[2]);
      });
      return val;
    };
    return { 'get': get, 'set': set };
  }());

  // 获取元素在页面上的位置
  var getPosition = function (e) {
    var ret = { 'top': 0, 'left': 0 };
    while (e.offsetTop) {
      ret.top += e.offsetTop;
      ret.left += e.offsetLeft;
      e = e.parentNode;
    }
    return ret;
  };

  // 注册和调用一些函数用的
  var callbackEvents = function () {
    var funcs = [];
    var call = function () {
      var self = this, arg = arguments;
      funcs.forEach(function (f) {
        try { f.apply(self, arg); } catch (e) { }
      });
    };
    call.add = function (callback) { funcs.push(callback); };
    return call;
  };

  // 显示消息的提示框
  var showMsg = (function () {
    var msgBox = document.createElement('div'); msgBox.id = 'rbb-message';
    document.body.parentNode.appendChild(msgBox);
    try { msgBox.style.top = getPosition(document.querySelector('.viewbox .info')).top + 'px'; }
    catch (e) { msgBox.style.top = '32px'; }
    var zIndex = 11000;
    var showMsg = function (msg, timeout, type, buttons) {
      debug('MessageBox: %s', msg);
      if (buttons) debug('MessageBox Buttons: %o', buttons);
      var text = xmlEscape(msg);
      if (buttons) text += buttons.map(function (button) {
        return bilibili.html.button(button.value);
      }).join('');
      var msgbox = (new unsafeWindow.MessageBox({ 'zIndex': zIndex++, 'Overlap': true }))
        .show(msgBox, text, timeout, type).get(0);
      var buttonList = msgbox.querySelectorAll('button');
      Array.apply(Array, buttonList).forEach(function (button, i) {
        button.addEventListener('click', buttons[i].click);
      });
      return msgbox;
    };
    showMsg.gotCid = function (cid) {
      if (cid) msgBox.setAttribute('cid', cid);
      else msgBox.setAttribute('cid', 'N/A');
    };
    return showMsg;
  }());

  // 从URL中截取aid(av), pid号
  var videoPage = function (href, nullpage) {
    var aid, pid;
    if (typeof href !== 'string') return null;
    if (!bilibili.url.av.map(function (h) { return href.indexOf(h) === 0; })
      .reduce(function (x, y) { return x || y; })) return null;
    if (!(aid = Number(href.replace(/^[^#]*av(\d+).*$/, '$1')))) return null;
    pid = Number(hashArg.get('page', href)) ||
      Number(href.replace(/^[^#]*av\d+\/index_(\d+)\.html(\?.*)?(#.*)?$/, '$1')) || null;
    if (!nullpage && pid === null) pid = 1;
    return { 'aid': aid, 'pid': pid };
  };

  // 检查是否是原生播放器
  var isBilibiliBofqi = function (doc) {
    var any = function (arr) { return arr.reduce(function (x, y) { return x || y; }); };
    if (any(bilibili.url.flash.map(function (flash) {
      return !!doc.querySelector('#bofqi embed[src="' + flash + '"]');
    }))) return true;
    if (any(Object.keys(bilibili.url.iframe).map(function (iframe) {
      return !!doc.querySelector('#bofqi iframe[src^="' + bilibili.url.iframe[iframe] + '"]');
    }))) return true;
    return false;
  };

  // 检查页面中是否有播放器
  var hasBofqi = function (doc) {
    return !!doc.querySelector('#bofqi');
  };

  // 检查是否支持此页面
  var validPage = function () {
    var id = videoPage(location.href);
    // 仅在视频页面运行本脚本
    if (!id || !id.aid) return null;
    // 页面中要有播放器或者错误信息
    if (!document.querySelector('.z-msg') &&
      !document.querySelector('#bofqi') &&
      !document.querySelector('.errmsg') &&
      document.title !== 'bilibili - 提示') return null;
    // 忽略已经使用原生播放器的视频
    if (isBilibiliBofqi(document)) return null;
    // 天国的Flash游戏分区不算外站播放器
    if (document.querySelector('.tminfo a.on[href="/video/game-flash-1.html"]')) return null;
    // 忽略av1等无视频页面
    if (bilibili.video.ignore.indexOf(id.aid) !== -1) return null;
    // 没有播放器的页面不计算pid
    if (!document.querySelector('#bofqi') && id && id.pid) id.pid = null;
    // 强制不替换的
    if (hashArg.get('rbb') === 'false') return null;
    if (id) debug('Av%d, page%d', id.aid, id.pid);
    return id;
  };

  // 获取id
  // regist注册一个函数
  // concat与其他的getId连接
  var getId = function () {
    // 避免递归地根据周围av推算cid
    var funclist = Array.apply(Array, arguments);
    var outer = !!funclist.length;
    // 注册一种查找方法
    var regist = function (func) {
      funclist.push(func);
      return func;
    };
    // 依次使用几个getId
    var concat = function () {
      var funcs = Array.apply(Array, arguments);
      if (!outer) {
        funcs = [this].concat(funcs);
        return getId.apply(this, funcs);
      } else {
        funclist = funclist.concat(funcs);
        return this;
      }
    };
    // 有超时的调用某个查找id的函数
    // 调用func(iid, onsucc, onerror)
    // 当超时或func回调时调用next，func回调时调用onsucc或onerror
    var callTimeout = function (func, iid, onsucc, onerror, next) {
      var timer = null, called = false;
      var done = function (timeout) {
        if (!timeout && timer) clearTimeout(timer);
        if (timer !== null) { timer = null; call(next); }
      };
      var resp = function (cb) {
        return function () {
          if (cb && !called) {
            cb.apply(outer ? this : func, arguments);
            called = true;
          }
          done(!cb);
        };
      };
      if (!outer) timer = setTimeout(resp(), bilibili.timeout.network);
      else timer = false;
      try { func(iid, resp(onsucc), resp(onerror)); }
      catch (e) {
        debug('get id failed to call function %o. Error msg: %o', func, e);
      }
    };
    // 逐个调用查找id的函数
    var run = function (iid, onsucc, onerror) {
      // 获取注册的函数列表
      var ways = funclist;
      var processing = 0, done = false, remained = ways.length;
      // 当一个函数返回失败时
      var err = function () {
        var self = this, arg = arguments;
        if (!done && --processing <= 0 && remained <= 0) call(function () { onerror.apply(self, arg); });
        debug('done = %s, processing = %d, remained = %d', done, processing, remained);
      };
      // 当一个函数返回成功时
      var succ = function () {
        if (done) return; done = true;
        var self = this, arg = arguments;
        call(function () { onsucc.apply(self, arg); });
      };
      // 开始调用一个函数
      var act = function (f, next) {
        if (done) return;
        remained--; processing++;
        call(function () { callTimeout(f, iid, succ, err, next); });
      };
      // 依次调用注册的函数
      (function tryGetId(i) {
        if (done || i === ways.length) return;
        debug('Get id %d: %o, with iid = %o', i, ways[i], iid);
        act(ways[i], function () { tryGetId(i + 1); });
      }(0));
    };
    if (!outer) run.regist = regist;
    run.concat = concat;
    return run;
  };

  // 内存信息缓存
  var infoCache = function () {
    var data = {};
    var put = function (key, value) {
      if (!value) return null;
      return (data[key] = value);
    };
    var get = function (key, defaultValue) {
      var value = data[key];
      if (typeof value === 'undefined') return defaultValue;
      return data[key];
    };
    var del = function (key) { delete data[key]; };
    var clear = function () { data = {}; };
    return { 'get': get, 'put': put, 'del': del, 'clear': clear };
  };
  var videoInfo = infoCache(), playurlInfo = infoCache();
  var pageInfo = infoCache(), spInfo = infoCache();
  var candidateCidInfo = infoCache();

  // 文件信息缓存
  // 将网络访问getId的结果缓存起来
  // 不过实际上是通过注册到getId中的函数直接调用实现的读写
  var getIdCache = (function () {
    var caches = {};
    var cache = function (cacheKey) {
      // get/putData读写GM提供的接口存储数据
      var getData = function () {
        var data;
        try { data = JSON.parse(GM_getValue(cacheKey, '{}')) || {}; }
        catch (e) { data = {}; }
        return data;
      };
      var putData = function (data) {
        GM_setValue(cacheKey, JSON.stringify(data));
      };
      var clearData = function (data) {
        GM_deleteValue(cacheKey);
      };
      var get = function (key, defaultValue) {
        var value = getData()[key];
        if (typeof value === 'undefined') return defaultValue;
        return value;
      };
      var put = function (key, value) {
        var data = getData();
        data[key] = value;
        putData(data);
        return value;
      };
      var del = function (key) {
        var data = getData();
        delete data[key];
        putData(data);
      };
      var clear = function () {
        clearData();
      };
      if (Object.keys(getData()).length > bilibili.config.cache_maxsize) clearData();
      return { 'get': get, 'put': put, 'del': del, 'clear': clear };
    };
    if (bilibili.config.cache_active) {
      // 开启了缓存
      return function (cacheKey) {
        return (caches[cacheKey] = caches[cacheKey] || cache(cacheKey));
      };
    } else {
      return function (cacheKey) {
        // 没开启文件缓存的话转而用内存的缓存
        cache(cacheKey).clear();
        return infoCache();
      };
    }
  }());

  // getCid分为三种以方便之后根据不同需要决定优先关系
  var getCidDirect = getId(), getCidUndirect = getId(), getCidCached = getId();
  var getAid = getId();
  var getTitle = getId();
  // 对getCid和getAid的结果分别进行缓存
  var getCidCache = getIdCache('chatid'), getAidCache = getIdCache('av');

  // 获取视频源名称
  var getVideoSource = function (id, cid) {
    if (id.pid === null && typeof cid !== 'number' && Object.keys(cid).length === 1)
      id.pid = Object.keys(cid)[0];
    if (id.pid === null) return { 'name': bilibili.text.source.multi };
    var source = bilibili.text.source;
    var name = function (type) { return source.site[type] || source.other; };
    var list, playurl, ret = null;
    try {
      try {
        (function () {
          var l = videoInfo.get(id.aid).list;
          Object.keys(l).forEach(function (x) {
            if (l[x].page === id.pid) list = l[x].type;
          });
        }());
      } catch (e1) { list = null; }
      try { playurl = playurlInfo.get(cid).querySelector('from').textContent; }
      catch (e2) { playurl = null; }
      if (!playurl && !list) return { 'name': source.unknown };
      if (playurl === list) return { 'name': name(playurl) };
      if (list && !playurl && source.unsupport.indexOf(list) !== -1)
        return { 'unsupport': true, 'name': name(list) };
      if (!list || !playurl || list === playurl)
        return { 'name': name(list || playurl) };
      return {
        'name': [
          name(list), source.api, name(playurl), source.playurl].join('')
      };
    } catch (e) { }
    if (ret === null) return source.unknown;
    else return ret;
  };

  // 获取缓存的cid信息
  // 用于通过相邻cid推测时等不需要完全准确时使用
  // 或其他方法失效时使用
  var getCidByCache = (function (getCid, getCidCache, getAidCache) {
    return getCid.regist(function (id, onsucc, onerror) {
      var cids = getCidCache.get(id.aid);
      debug('Reading Cache, aid = %d -> cid = %s', id.aid, JSON.stringify(cids));
      if (cids) {
        if (id.pid) {
          if (cids[id.pid]) onsucc(cids[id.pid]);
          else onerror();
        } else onsucc(cids);
      } else onerror();
    });
  }(getCidCached, getCidCache, getAidCache));

  // 通过API获取Cid
  var getCidByApi = (function (getCid, getCidCache, getAidCache) {
    var registGetCidByApi = function (view, i) {
      return getCid.regist(function (id, onsucc, onerror) {
        GM_xmlhttpRequest({
          'method': 'GET',
          'url': genURL(view.url, { 'aid': id.aid }),
          'headers': {
            'User-Agent': view.ua,
            'Cookie': document.cookies,
          },
          'onload': function (resp) {
            var data, cids = {}, cid;
            try {
              // 解析返回结果
              data = JSON.parse(resp.responseText);
              Object.keys(data.list).forEach(function (k) { cids[data.list[k].page] = data.list[k].cid; });
              // 缓存数据
              if (cids && Object.keys(cids).length) getCidCache.put(String(id.aid), cids);
              Object.keys(cids).forEach(function (pid) {
                getAidCache.put(String(cids[pid]), { 'aid': id.aid, 'pid': Number(pid) });
              });
              videoInfo.put(id.aid, data);
              debug('Get Cid Cached: aid = %d -> cid = %s', id.aid, JSON.stringify(cids));
              // 得到需要的cid
              if (id.pid) cid = cids[id.pid]; else cid = cids;
            } catch (e) {
              debug('Error while getting cid by using API[%d]: %s', i, String(e));
              debug('Server response: %o', resp.responseText);
              cid = null;
            }
            if (!cid) call(onerror); else call(function () { onsucc(cid); });
            debug('Got cid = %o by using API[%d]', cid, i);
          },
          'onerror': function () {
            call(onerror);
            debug('Failed to get cid via API');
          }
        });
      });
    };
    return bilibili.url.view.map(registGetCidByApi);
  }(getCidDirect, getCidCache, getAidCache));

  // 通过提供给播放器以自动下一分页的接口获取cid
  var getCidByPageList = (function (getCid, getCidCache, getAidCache) {
    getCid.regist(function (id, onsucc, onerror) {
      GM_xmlhttpRequest({
        'method': 'GET',
        'url': genURL(bilibili.url.pagelist, { 'aid': id.aid }),
        'onload': function (resp) {
          var data, cid = null, cids = {};
          try {
            data = JSON.parse(resp.responseText);
            data.map(function (p) {
              cids[p.page] = p.cid;
              getAidCache.put(String(p.cid), { 'aid': id.aid, 'pid': Number(p.page) });
            });
            getCidCache.put(String(id.aid), cids);
            if (id.pid) cid = cids[id.pid]; else cid = cids;
          } catch (e) { data = {}; }
          if (cid) call(function () { onsucc(cid); });
          else call(onerror);
          debug('Got cid = %s by using pagelist', JSON.stringify(cid));
        },
        'onerror': function () { call(onerror); }
      });
    });
  }(getCidDirect, getCidCache, getAidCache));

  // 通过为iOS设备提供的获取弹幕和MP4视频的接口得到cid
  // 由于历史上的不稳定，优先级低于API获取方式
  // 另外，该方式仅限单一分页
  var getCidByMHtml5 = (function (getCid, getCidCache, getAidCache) {
    getCid.regist(function (id, onsucc, onerror) {
      if (!id.pid) onerror();
      else GM_xmlhttpRequest({
        'method': 'GET',
        'url': genURL(bilibili.url.html5, { 'aid': id.aid, 'pid': id.pid }),
        'onload': function (resp) {
          var data;
          try { data = JSON.parse(resp.responseText); } catch (e) { data = {}; }
          var cid = Number((data.cid || '').replace(/^[^\d]*(\d+)[^\d]*$/, '$1'));
          if (cid) {
            getAidCache.put(String(cid), { 'aid': id.aid, 'pid': id.pid });
            call(function () { onsucc(cid); });
          } else {
            call(onerror);
          }
          debug('Got cid = %s by using html5', JSON.stringify(cid));
        },
        'onerror': function () { call(onerror); }
      });
    });
  }(getCidDirect, getCidCache, getAidCache));

  // 通过Flash播放器中的参数获取cid
  var getCidByFlashVar = (function (getCid, getCidCache, getAidCache) {
    return getCid.regist(function (id, onsucc, onerror) {
      // 只有这个id对应当前页面的时候检查Flash参数才有意义
      var currentId = videoPage(location.href);
      if (!currentId || currentId.aid !== id.aid || currentId.pid !== id.pid) { call(onerror); return; }
      var bofqi = document.querySelector('#bofqi'), arg = null, extmatch = false, cid;
      // 获取flash参数
      try { arg = bofqi.querySelector('object param[name="flashvars"]').getAttribute('value'); }
      catch (e) {
        try { arg = bofqi.querySelector('embed[flashvars]').getAttribute('flashvars'); }
        catch (e2) { }
      }
      if (typeof arg !== 'string') { call(onerror); return; }
      // 从参数中找包含cid关键字且值是数字的键值对，认为其值为cid
      arg.split('&').forEach(function (s) {
        var t = s.split('='); if (t.length !== 2) return;
        if (isNaN(Number(t[1])) || (t[0].indexOf('cid') === -1)) return;
        if (!extmatch) { cid = Number(t[1]); extmatch = t[0] === 'cid'; }
      });
      if (!cid) call(onerror); else call(function () { onsucc(cid); });
      debug('Got cid = %d by checking Flash arguments', cid);
    });
  }(getCidDirect, getCidCache, getAidCache));

  // 获取缓存的Aid
  var getAidByCache = (function (getAid, getCidCache, getAidCache) {
    return getAid.regist(function (cid, onsucc, onerror) {
      var id = getAidCache.get(cid);
      debug('Reading Cache, cid = %d -> aid = %o', cid, id);
      if (id && id.aid && id.pid) onsucc(id);
      else onerror();
    });
  }(getAid, getCidCache, getAidCache));

  // 通过Interface使用cid查aid
  var getAidByInterface = (function (getAid, getCidCache, getAidCache) {
    return getAid.regist(function (cid, onsucc, onerror) {
      GM_xmlhttpRequest({
        'method': 'GET',
        'url': genURL(bilibili.url.player, { 'cid': cid }),
        'onload': function (resp) {
          // 解析服务器返回
          var lines = resp.responseText.split('\n');
          var aid = null, pid = null;
          lines.forEach(function (line) {
            aid = aid || Number(line.replace(/^<aid>([0-9]*)<\/aid>*$/, '$1')) || null;
            pid = pid || Number(line.replace(/^<pid>([0-9]*)<\/pid>*$/, '$1')) || null;
          });
          if (aid && pid) {
            getAidCache.put(String(cid), { 'aid': aid, 'pid': pid });
            call(function () { onsucc({ 'aid': aid, 'pid': pid }); });
            debug('Got aid = %d, pid = %d where cid = %d, via Interface', aid, pid, cid);
          } else {
            call(onerror);
            debug('Get Aid by Interface failed, cid = %d', cid);
          }
        },
        'onerror': function () {
          call(onerror);
          debug('Failed to get aid related to cid');
        }
      });
    });
  }(getAid, getCidCache, getAidCache));

  // 通过相邻视频查找cid
  var getCidNearby = (function (getCid, getCidCache, getAidCache) {
    return getCid.regist(function (id, onsucc, onerror) {
      showMsg(bilibili.text.loading.near, 10000, 'warning');
      var findCidInRange, candidateCid = [], candidateCidLoading = 0, errorDone = null;
      // 如果找到某个相邻的视频的cid则记录下来
      var found = (function (onsucc, onerror) {
        var lastCid = [], nextCid = [];
        var checkDone = (function () {
          var count = 0;
          var sort = function (a) { return a.sort(function (x, y) { return x - y; }); };
          var medians = function (a) { return sort(a)[a.length >> 1]; };
          var filterGL = function (a, g, l) { return a.filter(function (x) { return x > g && x < l; }); };
          return function () {
            // 检查是否最小和最大的两边都完成了
            debug('check done %d', count);
            if (++count < 2) return;
            // 打印调试信息
            debug('lastCid = %o', lastCid);
            debug('nextCid = %o', nextCid);
            // 如果两边没有找到任何的cid则失败
            if (!nextCid.length && !lastCid.length) { call(onerror); return; }
            // 以下的算法纯属个人YY，因为我觉得这样效果会好些
            // 如果一边没找到任何cid，则用另一侧最近的视频的来充数
            if (!nextCid.length) nextCid = [lastCid[0] + 2];
            if (!lastCid.length) lastCid = [nextCid[0] - 2];
            // 基于假设：cid和aid正相关，且大多数情况下有 cid[i] > cid[j] iff aid[i] > aid[j]
            var nm, lm;
            // 去掉右侧比左侧所有数字都小的，和左侧比右侧所有数字都大的
            nm = Math.max.apply(Math, nextCid); lm = Math.min.apply(Math, lastCid);
            nextCid = filterGL(nextCid, lm, Infinity); lastCid = filterGL(lastCid, -Infinity, nm);
            // 找到两边的中位数，把另一边在这个中位数以外的部分砍掉
            nextCid.push(Infinity); lastCid.push(-Infinity);
            nm = medians(nextCid); lm = medians(lastCid);
            nextCid = filterGL(nextCid, lm, Infinity); lastCid = filterGL(lastCid, -Infinity, nm);
            // 再找两边最靠里的数，把另一边在这里面的部分砍掉
            nm = Math.min.apply(Math, nextCid); lm = Math.max.apply(Math, lastCid);
            nextCid = filterGL(nextCid, lm, Infinity); lastCid = filterGL(lastCid, -Infinity, nm);
            // 最后再找两边最靠里的数，认为我们要的cid在这个范围内
            lastCid = sort(lastCid.concat([-Infinity])).reverse();
            nextCid = sort(nextCid.concat([Infinity]));
            onsucc(lastCid, nextCid);
          };
        }());
        // 记录获取到的新cid
        var pushCid = function (group) {
          return function (cid) {
            if (cid.constructor === Object) {
              debug('Nearby cid %o found', cid);
              if (Object.keys(cid).length === 1 && cid[1]) {
                group.push(cid[1]);
                return true;
              }
            } else if (cid === true) {
              checkDone();
              return null;
            }
            return false;
          };
        };
        return { 'last': pushCid(lastCid), 'next': pushCid(nextCid) };
      }(function (lastCid, nextCid) {
        findCidInRange(lastCid, nextCid);
      }, onerror));
      // 查找相邻视频的cid编号
      var getNearCid = function (aidF, foundF) {
        var i = 0, succ = 0;
        (function tryGetNearCid() {
          debug('Get cid with aid = %d', aidF(id.aid, i + 1));
          if ((++i >= 8 && succ >= 3) || (i >= 12) || succ == 6) foundF(true);
          else getCidCached.concat(getCidDirect)(
            { 'aid': aidF(id.aid, i), 'pid': null },
            function (cid) {
              if (cid && foundF(cid)) succ++;
              tryGetNearCid();
            },
            tryGetNearCid
          );
        }());
      };
      getNearCid(function (aid, i) { return Math.max(aid - i, 1); }, found.last);
      getNearCid(function (aid, i) { return aid + i; }, found.next);
      // 没有找到的时候处理一下可能的情况
      var notFound = function () {
        errorDone = true;
        if (!candidateCidLoading) call(onerror);
      };
      var candidateLoadDone = function () {
        candidateCidInfo.put(id.aid, candidateCid);
        if (errorDone && !candidateCidLoading) notFound();
      };
      // 在某个已知的范围内逐个检查是否有对应该aid的cid
      findCidInRange = function (lastCid, nextCid) {
        debug('find in range %s - %s', JSON.stringify(lastCid), JSON.stringify(nextCid));
        nextCid.pop(); lastCid.pop();
        var m = (nextCid[0] + lastCid[0]) / 2;
        if (isNaN(m)) call(notFound);
        while (nextCid.length < lastCid.length) nextCid.push(nextCid[nextCid.length - 1]);
        while (nextCid.length > lastCid.length) lastCid.push(lastCid[lastCid.length - 1]);
        var failCount = 0, cid = {};
        var cids = nextCid.map(function (n, i) {
          return Array.apply(Array, Array(nextCid[i] - lastCid[i] + 1))
            .map(function (x, y) { return y + lastCid[i]; })
            .filter(function (x) { return i === 0 || x > nextCid[i - 1] || x < lastCid[i - 1]; })
            .sort(function (x, y) { return Math.abs(x - m) - Math.abs(y - m); });
        }).reduce(function (x, y) { return x.concat(y); });
        // 从中间到两侧依次查找
        var done = function () {
          var ret = cid;
          if (id.pid) if (cid[id.pid]) ret = cid[id.pid]; else ret = undefined;
          else if (!Object.keys(cid).length) ret = undefined;
          if (ret) call(function () { onsucc(cid); });
          else call(notFound);
        };
        debug('Searching in lastCids: %o, nextCids: %o', lastCid, nextCid);
        debug('Searching in cid list: %o', cids);
        var networkCounter = 0;
        // 对每个范围内的cid进行搜索
        (function tryFindCid(i) {
          var currentCid, re = i - cids.length;
          if (i < cids.length) currentCid = cids[i];
          else {
            if (re & 1) currentCid = lastCid[lastCid.length - 1] - (re >> 1) - 1;
            else currentCid = nextCid[nextCid.length - 1] + (re >> 1) + 1;
          }
          // 找到对应的aid
          var onsucc = function (rid) {
            if (this === getAidByInterface) networkCounter++;
            if (rid.aid === id.aid) { cid[rid.pid] = currentCid; tryFindCid(i + 1); }
            else if (rid.aid === 0) { candidateCid.push(currentCid); }
            else {
              if (Object.keys(cid).length === Math.max.apply(Math, Object.keys(cid))) failCount++;
              if (failCount > Object.keys(cid).length * 4 + 6) done();
              else tryFindCid(i + 1);
            }
          };
          // 没找到对应的aid
          var onerror = function () {
            if (currentCid < 0)
            candidateCidLoading++;
            if (Object.keys(cid).length) failCount++;
            call(function () { tryFindCid(i + 1); });
            checkCid(currentCid, function () {
              // 如果一个cid不对应aid，但是对应了视频，那就说明这个cid曾经是有效的
              candidateCidLoading--;
              candidateCid.push(currentCid);
              getAidCache.put(currentCid, { 'aid': 0, 'pid': 0 });
              candidateLoadDone();
            }, function () {
              // 如果一个cid既不对应aid，又不对应视频，那么就是说这个cid是无效的
              candidateCidLoading--;
              getAidCache.put(currentCid, { 'aid': null, 'pid': null });
              candidateLoadDone();
            });
          };
          if (networkCounter > bilibili.config.netmax) done();
          else if (currentCid <= 0) call(function () { tryFindCid(i + 1); });
          else getAid(currentCid, onsucc, onerror);
        }(0));
      };
    });
  }(getCidUndirect, getCidCache, getAidCache));

  // 检查该cid是否可用
  // 若检查成功则可以替换播放器；否则即便替换播放器也只会看到无限小电视或16秒“非常抱歉”错误提示
  var checkCid = function (cid, onsucc, onerror) {
    if (!bilibili.config.check) { onsucc(cid); return; }
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': genURL(bilibili.url.playurl, { 'cid': cid }),
      'onload': function (resp) {
        var data, result, message, length = 0;
        try {
          data = (new DOMParser()).parseFromString(resp.responseText, 'text/xml');
          playurlInfo.put(cid, data);
          result = (data.querySelector('result') || {}).textContent;
          message = (data.querySelector('message') || data.querySelector('error_text') || {}).textContent;
          Array.apply(Array, data.querySelectorAll('length')).map(function (o) {
            var len = Number((o || {}).textContent);
            if (!isNaN(len)) length += len;
          });
        } catch (e) { data = {}; }
        if (result) debug('check cid %d result: %s', cid, result);
        else debug('check cid %d response: %o', cid, resp.responseText);
        // 我也不知道他们是怎么做到一会儿用suee表示正常一会儿用succ表示正常的
        result = result === 'suee' || result === 'succ';
        if (result && length !== 0) onsucc(data);
        else call(function () {
          if (result && length === 0) message = bilibili.text.fail.live;
          if (resp.responseText.indexOf('"error_code":"E107"') !== -1) message = bilibili.text.fail.notexist;
          if (resp.responseText.indexOf('"error_code":"E108"') !== -1) message = bilibili.text.fail.notexist;
          if (resp.responseText.indexOf('<title>504 Gateway Time-out</title>') !== -1)
            message = bilibili.text.fail.server;
          onerror(message || bilibili.text.fail.unexpect, data || null);
        });
      },
      'onerror': function () {
        debug('Network failed while verifying cid');
        onerror(bilibili.text.fail.network);
      }
    });
  };

  // 修复添加/修改的视频播放器的页面全屏等功能
  var fixFullWindow = function () {
    var findStyle = function (s) {
      return document.querySelector('script[src="' + s + '"]');
    };
    var addScript = function (s) {
      var st = document.createElement('script'); st.src = s;
      document.querySelector('head').appendChild(st);
    };
    var fixFunction = [
      function () { },
      function () { location.href = bilibili.js.post; },
      function () { location.href = bilibili.js.float; },
    ].concat(bilibili.js.list.map(function (s) {
      return function () { if (!findStyle(s)) addScript(s); };
    }));
    (function doFix(i) {
      if (i >= fixFunction.length) return;
      fixFunction[i]();
      call(function () { doFix(i + 1); });
    }(0));
    fixFullWindow = function () { };
  };

  // 通过搜索建议获取视频标题
  var getTitleBySearchSuggestion = (function (getTitle) {
    return getTitle.regist(function (aid, onsucc, onerror) {
      // 他们改了逻辑，现在一定要指定回调函数了，不然不给数据，所以假冒一个……
      // 他们是用jQuery默认生成的JSONP回调函数的，所以这里模仿jQuery的生成方式
      // 格式为 "jQuery" + 版本号 + 随机数字 + "_" + Unix时间戳
      var fakeCallback = '';
      var version = null;
      try { version = unsafeWindow.jQuery.fn.jquery; } catch (e) { version = '1.7.2'; }
      fakeCallback = "jQuery" + (version + Math.random()).replace(/\D/g, "") + "_" + Number(new Date());
      GM_xmlhttpRequest({
        'method': 'GET',
        'url': genURL(bilibili.url.suggest, {
          'aid': aid,
          'callback': fakeCallback,
          'rnd': Math.random(),
          '_': Number(new Date()),
        }),
        'onload': function (resp) {
          try {
            var data = String(resp.responseText);
            data = data.slice(data.indexOf('['), data.lastIndexOf(']') + 1);
            onsucc(JSON.parse(data)[0].desc);
          } catch (e) { onerror(); }
        },
        'onerror': function () { onerror(); }
      });
    });
  }(getTitle));

  // 返回当前的cid（不支持视频内换分页）
  var getCurrentCid = (function () {
    var currentCid = null;
    var ret = function () {
      if (currentCid) return currentCid;
      if (!isBilibiliBofqi(document)) return null;
      try {
        var player = document.querySelector('#bofqi .player');
        return Number(player.src.match(/cid=(\d+)/)[1]);
      } catch (e) {
        return null;
      }
    };
    ret.handler = function () { };
    ret.handler.update = function () { };
    ret.gotCid = function (cid) {
      if (typeof cid !== 'number') return;
      currentCid = cid;
      ret.handler.update();
    };
    return ret;
  }());

  // 添加标题、评论
  var addContent = function (aid, title, scriptLoaded) {
    var z = document.querySelector('.z');
    var z_msg = document.querySelector('.z-msg');
    var doc = (new DOMParser()).parseFromString(
      genXML(bilibili.html.page, { 'aid': aid, 'title': title }), 'text/html');
    if (z && z_msg) {
      z_msg.style.display = 'none';
      doc.querySelector('.player').src = 'about:blank';
      ['#heimu', '.viewbox', '#bofqi', doc.querySelector('.common').parentNode].map(function (qs) {
        var o = qs;
        if (o.constructor === String) {
          if (document.querySelector(qs)) return document.querySelector(qs);
          o = doc.querySelector(qs);
        }
        o.parentNode.removeChild(o);
        z.appendChild(o);
        return o;
      });
      document.title = genStr(bilibili.text.title, function (s) { return s; }, { 'title': title });
      fixFullWindow();
      return false;
    } else {
      replaceDocument(doc, scriptLoaded);
      return true;
    }
  };

  // 添加分页
  var addPages = function (aid, cids, pages, pid) {
    debug("add pages: %o", cids);
    var guess = cids.constructor === Array;
    var alist = document.querySelector('#rbb_alist');
    if (!alist) {
      alist = document.createElement('div');
      alist.id = 'rbb_alist';
      document.querySelector('.alist').appendChild(alist);
    }
    var player = document.querySelector('#bofqi .player');
    var pa = {};
    var pids = Object.keys(cids).map(Number).sort(function (x, y) { return x - y; });
    pids.forEach(function (pid) {
      var a = alist.querySelector('a[cid="' + cids[pid] + '"]');
      if (!a) {
        a = document.createElement('a'); a.setAttribute('cid', cids[pid]);
        alist.appendChild(a);
      }
      if (pages && pages[pid]) a.innerHTML = xmlEscape(pages[pid]);
      else a.innerHTML = xmlEscape((guess ? ' ? ' : String(pid)) + bilibili.text.split.pid + '(cid=' + cids[pid] + ')');
      a.href = genURL(bilibili.url.video, { 'host': bilibili.host, 'aid': aid, 'pid': pid });
      return (pa[pid] = a);
    });
    var showPage = function (pid) {
      var cid = cids[pid];
      if (!cid) return;
      player.src = genURL(bilibili.url.bofqi, { 'aid': aid, 'cid': cid });
      Object.keys(pa).map(function (pid) { pa[pid].className = ''; });
      pa[pid].className = 'curPage';
      getCurrentCid.gotCid(cid);
      replacedBofqi(cid);
    };
    Object.keys(pa).map(function (pid) {
      pa[pid].addEventListener('click', function (event) {
        showPage(pid);
        event.preventDefault();
      });
    });
    if (pid && pid !== true && pids.indexOf(pid) !== -1) showPage(pid);
    else if (pid) showPage(pids[0]);
    fixFullWindow();
    return pids;
  };

  var addedBofqi = callbackEvents();
  // 添加播放器标题等页面相关元素
  var addBofqi = function (aid, callback) {
    var cb = function (title) {
      var isNew = addContent(aid, title, callback);
      fixFullWindow();
      if (!isNew) call(callback);
      call(function () { addedBofqi(title); });
    };
    getTitle(aid, cb, function () { cb(''); });
  };

  // 新建一个播放器
  var createNewBofqi = function (aid, cid) {
    var bofqi = document.createElement('div');
    bofqi.innerHTML = bilibili.html.bofqi(genURL(bilibili.url.bofqi, { 'aid': aid, 'cid': cid }));
    bofqi.className = 'scontent';
    bofqi.id = 'bofqi';
    return bofqi;
  };

  // 禁用替换
  var notReplaceBofqi = (function () {
    var setHash = function (hash) {
      location.hash = hash;
      location.reload();
    };
    if (hashArg.get('rbb') === 'false') showMsg(bilibili.text.disable.message, 12000, 'warning',
      [{ 'value': bilibili.text.disable.redo, 'click': function () { setHash('#'); } }]);
    return function () { setHash('#rbb=false'); };
  }());

  var replacedBofqi = callbackEvents();
  // 替换播放器
  var replaceBofqi = function (id, cid, keepold) {
    if (typeof cid !== 'number') {
      var pids = addPages(id.aid, cid, {}, videoPage(location.href).pid || true);
      showMsg(bilibili.text.succ.add
        .replace('{cid}', pids.map(function (pid) { return cid[pid]; }).join(', '))
        .replace('{pid}', pids.join(', ')), 12000, 'info');
      return;
    }
    var oldBofqi = document.querySelector('#bofqi');
    var newBofqi = createNewBofqi(id.aid, cid);
    oldBofqi.parentNode.insertBefore(newBofqi, oldBofqi);
    if (keepold) {
      oldBofqi.id = 'old-bofqi';
    } else {
      oldBofqi.parentNode.removeChild(oldBofqi);
    }
    fixFullWindow();
    if (!keepold)
      showMsg(bilibili.text.succ.replace
        .replace('{source}', getVideoSource(id, cid).name)
        .replace('{cid}', JSON.stringify(cid)),
        12000, 'info',
        [{ 'value': bilibili.text.succ.rollback, 'click': notReplaceBofqi }]);
    replacedBofqi(cid);
    return oldBofqi;
  };

  // 在不确定是否可以正常替换的情况下替换了播放器显示该菜单
  var replacedMenu = function (oldBofqi) {
    var player = document.querySelector('.player');
    // 重新加载
    var reloadButton = {
      'value': bilibili.text.force.reload,
      'click': function () {
        var newPlayer = player.cloneNode(true);
        player.parentNode.insertBefore(newPlayer, player);
        player.parentNode.removeChild(player);
        player = newPlayer;
      }
    };
    // 退回外站播放器
    var rollbackButton = {
      'value': bilibili.text.force.rollback,
      'click': function () {
        var bofqi = document.querySelector('#bofqi');
        bofqi.parentNode.removeChild(bofqi);
        oldBofqi.id = 'bofqi';
        msg.parentNode.removeChild(msg);
      }
    };
    // 成功替换
    var doneButton = {
      'value': bilibili.text.force.done,
      'click': function () {
        msg.parentNode.removeChild(msg);
        if (oldBofqi) oldBofqi.parentNode.removeChild(oldBofqi);
      }
    };
    var buttons = [reloadButton];
    if (oldBofqi) buttons = buttons.concat([rollbackButton]);
    buttons = buttons.concat([doneButton]);
    var msg = showMsg(bilibili.text.force.message, 1e9, 'warning', buttons);
  };

  // 处理检查cid是否可用出错时的情况
  var checkCidFail = function (id, cid, msg) {
    var videoSource = getVideoSource(id, cid);
    var addField = function (s) {
      return s.replace('{source}', videoSource.name)
        .replace('{cid}', JSON.stringify(cid)).replace('{msg}', msg || '');
    };
    if (videoSource.unsupport) msg = addField(bilibili.text.fail.unsupport);
    else if (!msg) msg = addField(bilibili.text.fail.check);
    else msg = addField(bilibili.text.fail.msg);
    var msgbox = showMsg(msg, 50000, 'error', [{
      'value': bilibili.text.force.replace.replace('{source}', videoSource),
      'click': function () {
        var oldBofqi = replaceBofqi(id, cid, true);
        replacedMenu(oldBofqi);
        msgbox.parentNode.removeChild(msgbox);
      }
    }]);
    debug('Failed on checking cid with msg %s', msg);
  };

  // 获取cid并判断是否可以正常显示视频
  var getValidCid = function (getCid, id, done, cidReady) {
    getCid(id,
      function (cid) {
        var timer = null, cbd = false;
        var ccid = null;
        if (cid.constructor === Number) ccid = cid;
        else {
          Object.keys(cid).map(function (pid) {
            if (ccid === null) ccid = cid[pid];
            else if (ccid !== cid[pid]) ccid = false;
          });
        }
        var cb = function (cid, msg) {
          if (cbd) return; cbd = true;
          if (timer) clearTimeout(timer); timer = null;
          done(cid, msg);
        };
        if (ccid) {
          if (cidReady) timer = setTimeout(function () {
            cidReady(cid, function () { cb(cid); });
          }, bilibili.timeout.network);
          checkCid(ccid,
            function () { cb(cid); },
            function (msg) { cb(cid, msg || ''); });
        } else {
          // 如果对应了多个视频则不进行检查
          done(cid);
        }
      },
      function () { done(); }
    );
  };

  // 检查某个页面是否使用原生的播放器
  var checkBilibiliBofqi = function (id, onsucc, onerror) {
    (function checkBofqi(i) {
      if (i === id.pids.length) call(onerror);
      else {
        GM_xmlhttpRequest({
          'method': 'GET',
          'url': genURL(bilibili.url.video, { 'aid': id.aid, 'pid': id.pids[i], 'host': bilibili.host }),
          'onload': function (resp) {
            var doc = new DOMParser().parseFromString(resp.responseText, 'text/html');
            if (isBilibiliBofqi(doc)) onsucc(id.pids[i]);
            else checkBofqi(i + 1);
          },
          'onerror': function () {
            checkBofqi(i + 1);
          }
        });
      }
    }(0));
  };

  // 主程序在这里
  (function mina() {
    var id = validPage(); if (!id) return;
    var act = function () {
      var msgbox = null, ignore = false;
      getValidCid(getCidDirect.concat(getCidCached).concat(getCidUndirect),
        id, function (cid, errormsg) {
          var ccid = [];
          getCurrentCid.gotCid(cid);
          if (msgbox) { msgbox.parentNode.removeChild(msgbox); msgbox = null; }
          if (!cid) {
            ccid = candidateCidInfo.get(id.aid);
            if (ccid && ccid.length) {
              addPages(id.aid, ccid, null, null);
              showMsg(bilibili.text.fail.getc, 12000, 'warning');
            } else {
              showMsg(bilibili.text.fail.get, 12000, 'error');
            }
          } else if (typeof errormsg !== 'undefined') checkCidFail(id, cid, errormsg);
          else {
            var oldBofqi = replaceBofqi(id, cid, ignore);
            if (ignore) replacedMenu(oldBofqi);
          }
        }, function (cid, ignoreCheck) {
          getCurrentCid.gotCid(cid);
          msgbox = showMsg(bilibili.text.loading.check.replace('{cid}', JSON.stringify(cid)),
              1e9, 'warning', [{
                'value': bilibili.text.loading.ignore,
                'click': function () {
                  ignore = true; ignoreCheck();
                }
              }, {
                'value': bilibili.text.loading.wait,
                'click': function () {
                  if (!msgbox) return;
                  msgbox.parentNode.removeChild(msgbox);
                }
              }
              ]);
        });
    };
    if (!hasBofqi(document)) addBofqi(id.aid, act);
    else act();
  }());

  debug('Replace bilibili bofqi LOADED.');

  var menuContainer = (function () {
    var container = null;
    return function () {
      if (!container) {
        container = document.createElement('div'); container.id = 'rbb-menu-container';
        document.body.parentNode.appendChild(container);
      }
      return container;
    };
  }());

  var initMenuDom = function (menu) {
    var items = menu.querySelectorAll('.bsp-menu-item');
    menu.style.maxHeight = 32 * (items.length + 1) + 'px';
    if (items.length > 8) menu.style.minHeight = 32 * (8 + 1) + 'px';
    else menu.style.minHeight = 32 * (items.length + 1) + 'px';
    if (items.length !== 0) menu.style.resize = 'both';
  };

  // 选项菜单
  var choseMenu = (function () {
    // 显示菜单
    var show = function (menu, position, sp) {
      menuContainer().appendChild(menu);
      var isRbb = menu.className.split(' ').indexOf('rbb-menu') !== -1;
      var dx = 0, dy = 0;
      if (isRbb && sp) dx = -128;
      if (!isRbb && sp) dy = -32;
      if (menu.clientWidth + position.x > document.body.clientWidth) {
        menu.style.right = (document.body.clientWidth - position.x - 8 + dx) + 'px';
        menu.className += ' rbb-float-right';
      } else menu.style.left = (position.x - 8 + dx) + 'px';
      menu.style.top = (position.y - 6 + dy) + 'px';
      return menu;
    };
    // 隐藏菜单
    var hide = function (menu) {
      menu.parentNode.removeChild(menu);
    };
    // 检查某个元素是否在菜单内
    var contains = function (menu, obj) {
      for (; obj; obj = obj.parentNode) if (obj === menu) return true;
      return false;
    };
    // 创建菜单
    var create = function (items, sp) {
      var menu = document.createElement('div');
      var bsp = items.length === 1;
      if (bsp) menu.innerHTML = bilibili.html.menu2(items[0], sp);
      else menu.innerHTML = bilibili.html.menu(items, sp);
      menu = menu.firstChild;
      if (bsp) initMenuDom(menu);
      return menu;
    };
    return function (items, sp, position) {
      debug('New menu displayed: %o, %o', items, sp);
      var displayTime = new Date();
      var menu = create(items, sp);
      show(menu, position, sp);
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
      return (function () {
        var message = menu.querySelector('.rbb-menu-message');
        var setMessage = function (msg) {
          if (!message) return;
          message.innerHTML = xmlEscape(msg || '');
          if (msg) menu.setAttribute('message', 'message');
          else menu.removeAttribute('message');
        };
        var hideMenu = function () { hide(menu); };
        return { 'set': setMessage, 'hide': hideMenu };
      }());
    };
  }());

  // 从页面中获取分页名称等相关信息
  var getPageInfo = function (aid, html) {
    var doc;
    try {
      doc = new DOMParser().parseFromString(html, 'text/html');
      var pages = doc.querySelectorAll('#dedepagetitles option');
      var nodedata = Array.apply(Array, pages).map(function (opt) {
        return [opt.innerHTML, opt.value];
      });
      var title = doc.querySelector('.viewbox h2').innerHTML;
      if (title && nodedata) {
        pageInfo.put(aid, {
          'title': title,
          'nodedata': nodedata,
        });
      }
    } catch (e1) { }
    try {
      var spo = doc.querySelector('.v_bgm_list .info .detail a');
      if (spo) {
        var sp = {
          'title': spo.textContent,
          'href': spo.getAttribute('href'), // 为什么Chrome不能直接“.href”？？
        };
        spInfo.put(aid, sp);
      }
    } catch (e2) { }
  };

  // 对某个视频显示选项菜单
  var showMenu = function (a, id, position) {
    var oldOnclick = a.onclick;
    a.onclick = function () { a.onclick = oldOnclick; return false; };
    a.style.cursor = 'progress';
    var menu = null;
    var initMenu = function (cids, inSite, isOrigen) {
      call(function () { a.onclick = oldOnclick; a.style.removeProperty('cursor'); });
      var configMenu = bilibili.config.cmenu_type;
      var wholeMenu = cids && inSite === false || !isOrigen;
      if (configMenu === 'complete') wholeMenu = true;
      var info = videoInfo.get(id.aid) || {};
      var pinfo = pageInfo.get(id.aid) || {};
      var rbb = {
        'aid': id.aid,
        'cids': {},
        'pages': {},
        'description': info.description || a.getAttribute('txt') || '',
        'mid': info.mid || 0,
        'author': info.author || '',
        'tag': (info.tag || '').split(','),
        'title': info.title || pinfo.title || a.textContent || '',
        'spid': info.spid || 0,
        'season_id': info.season_id || 0,
      };
      if (info.list) {
        Object.keys(info.list).map(function (i) {
          rbb.cids[info.list[i].page] = info.list[i].cid;
          rbb.pages[info.list[i].page] = info.list[i].part;
        });
      } else if (pinfo.nodedata && !wholeMenu) {
        if (pinfo.nodedata.length === 0) {
          rbb.pages[1] = '';
          rbb.cids[1] = null;
        } else pinfo.nodedata.map(function (nodedata, i) {
          rbb.pages[i + 1] = nodedata[0];
          rbb.cids[i + 1] = null;
        });
      } else if (cids) {
        Object.keys(cids).map(function (pid) {
          rbb.pages[pid] = ((pinfo.nodedata || [])[pid - 1] || {})[0] || '';
          rbb.cids[pid] = cids[pid];
        });
      } else {
        return (menu = choseMenu([{
          'title': bilibili.text.fail.default,
          'href': a.href,
          'submenu': [],
        }], null, position));
      }
      var pids = Object.keys(rbb.cids).map(Number)
        .sort(function (x, y) { return x - y; });
      if (cids) pids = pids.filter(function (pid, i) {
        for (i++; i < pids.length; i++)
          if (cids[pid] === cids[pids[i]]) return false;
        return true;
      });
      debug('Menu with rbb = %o', rbb);
      var menuItem = function (title, href_p) {
        if (pids.length > 1) return {
          'title': title,
          'href': href_p((videoPage(a.href) || {}).pid || pids[0]),
          'submenu': pids.map(function (i) {
            var part = rbb.pages[i] || '';
            return {
              'title': part,
              'href': href_p(i),
            };
          }),
        }; else return {
          'title': title,
          'href': href_p(pids[0]),
          'submenu': [],
        };
      };
      // 生成页面
      var pageLink = function (pid) {
        var base = 'http://' + bilibili.host + '/video/av1/index_1.html';
        var rbbr = JSON.parse(JSON.stringify(rbb));
        if (pid) rbbr.pid = pid;
        return hashArg.set('rbb', JSON.stringify(rbbr), base);
      };
      // 仅播放器
      var iframeLink = function (pid) {
        return genURL(bilibili.url.bflash, { 'cid': rbb.cids[pid], 'aid': id.aid });
      };
      // 原始页面
      var origenLink = function (pid) {
        var id = videoPage(a.href);
        return genURL(bilibili.url.video, { 'aid': id.aid, 'pid': pid }) + a.search + a.hash;
      };
      // 三种页面
      var page, iframe, origen, menuItems;
      origen = menuItem(bilibili.text.menu.origen, origenLink);
      if (wholeMenu) {
        page = menuItem(bilibili.text.menu.page, pageLink);
        iframe = menuItem(bilibili.text.menu.swf, iframeLink);
        if (inSite !== false) menuItems = [origen, page, iframe];
        else menuItems = [page, iframe, origen];
        if (configMenu === 'simple') menuItems.length = 1;
      } else menuItems = [origen];
      if (menuItems.length === 1) {
        menuItems[0].title = rbb.title ||
          (menuItems[0].submenu.length ?
          bilibili.text.menu.chose : bilibili.text.menu.origen);
      }
      // 专题
      var sp = spInfo.get(id.aid) || undefined;
      return (menu = choseMenu(menuItems, sp, position));
    };
    var updateMenu = function (cids, errormsg, inSite, isOrigen) {
      if (!menu) initMenu(cids, inSite, isOrigen);
      debug('Set menu message: %s', errormsg || '');
      menu.set(errormsg);
    };
    var checkHost = function (inSite, isOrigen) {
      if (inSite && isOrigen) {
        // 如果本来已经是B站的则不需要继续处理
        if ((pageInfo.get(id.aid) || {}).title)
          updateMenu(undefined, undefined, inSite, isOrigen);
        else getCidDirect(id, function (cids) {
          updateMenu(cids, undefined, inSite, isOrigen);
        }, function () {
          updateMenu();
        });
      } else {
        // 如果发现会自动跳转到其他网站或无法获取host信息，则查找cid，试图在B站内播放
        getValidCid(getCidDirect.concat(getCidCached), id, function (cids, message) {
          updateMenu(cids, message, inSite, isOrigen);
        }, function (cids, ignoreCheck) {
          updateMenu(cids, bilibili.text.loading.checks, inSite, isOrigen);
        });
      }
    };
    // 检查是否跳转到外站
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': a.href,
      'onload': function (resp) {
        getPageInfo(id.aid, resp.responseText);
        var doc;
        // 检查视频跳转
        try {
          if (typeof resp.finalUrl === 'undefined') {
            doc = new DOMParser().parseFromString(resp.responseText, 'text/html');
            checkHost(undefined, isBilibiliBofqi(doc));
          } else {
            var host = getHost(resp.finalUrl);
            var inSite = host && bilibili.url.host.indexOf(host) !== -1;
            doc = new DOMParser().parseFromString(resp.responseText, 'text/html');
            if (!hasBofqi(doc)) inSite = false;
            checkHost(inSite, isBilibiliBofqi(doc));
          }
        } catch (e) { checkHost(); }
      },
      'onerror': function () { checkHost(); }
    });
  };

  // 按住鼠标时进行处理
  var holdMouse = function () {
    if (!document.body) return;
    var lastPosition;
    document.body.addEventListener('mousedown', function (event) {
      var a = event.target, id;
      while (a && a.tagName && ['A', 'AREA'].indexOf(a.tagName.toUpperCase()) === -1) a = a.parentNode;
      if (a && a.href) debug('Pressed <a href="%s">', a.href);
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
      // 仅限左键点击
      if (event.which !== 1) return;
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
  };
  holdMouse();

  // 替换整个文档树
  var replaceDocument = function (doc, scriptLoaded) {
    var stylish = document.querySelectorAll('head style.stylish');
    Array.apply(Array, stylish).forEach(function (s) { doc.querySelector('head').appendChild(s); });
    var scripts = Array.apply(Array, doc.querySelectorAll('head script[src]'));
    scripts.map(function (s) { return s.parentNode.removeChild(s); });
    var ret = document.replaceChild(doc.documentElement, document.documentElement);
    var count = scripts.length;
    scripts.map(function (script) {
      var s = document.createElement('script');
      s.src = script.src; s.async = false;
      var done = false;
      var checkLoad = function () {
        var state = s.readyState;
        if (!done && (!state || /loaded|complete/.test(state))) {
          done = true; if (--count === 0 && scriptLoaded) call(scriptLoaded);
        }
      };
      s.addEventListener('readystatechange', checkLoad);
      s.addEventListener('load', checkLoad);
      document.querySelector('head').appendChild(s);
    });
    holdMouse();
    addStyle();
    return ret;
  };

  // 显示新番相关信息（用于生成的页面）
  var showBgmInfo = function (id) {
    var done = 0, spInfo = null, bgmInfo = null;
    var doneCallback = null, errorCallback;
    var sp = {'spid': id.spid, 'season_id': id.season_id};

    var error = function () {
      if (done < 0) return; done = -1;
      errorCallback();
    };

    var parse = function (resp) {
      var data;
      try {
        data = JSON.parse(resp.responseText);
        if (!data.count) throw '';
        if (done >= 0) done++;
        return data;
      } catch (e) { error(); }
      return null;
    };

    var load = function () {
      if (done === 3) doneCallback();
    };

    var getSpInfo = function () {
      GM_xmlhttpRequest({
        'method': 'GET',
        'url': genURL(bilibili.url.sp.spid, sp),
        'onload': function (resp) { load(spInfo = parse(resp));  },
        'onerror': error,
      });
    };

    var getBgmInfo = function () {
      GM_xmlhttpRequest({
        'method': 'GET',
        'url': genURL(bilibili.url.sp.spview, sp),
        'onload': function (resp) { load(bgmInfo = parse(resp)); },
        'onerror': error,
      });
    };

    doneCallback = function () {
      var v_bgm_list = document.querySelector('.v_bgm_list');
      v_bgm_list.innerHTML = genXML(bilibili.html.v_bgm_list, {
        'spcover': spInfo.cover,
        'sptitle': spInfo.title,
        'spurl': '/sp/' + encodeURIComponent(spInfo.title),
        'bangumi': bgmInfo.count,
        'relative': spInfo.count - bgmInfo.count,
      });
      new unsafeWindow.bbBangumiSp(id.aid, sp.spid, 0, encodeURIComponent(spInfo.title));
    };

    errorCallback = function () { };

    getBgmInfo();
    getSpInfo();

    var scriptLoaded = false;
    return function () {
      if (!scriptLoaded && done >= 0) load(++done);
      scriptLoaded = true;
    };

  };

  // 使用av1/index_1.html作为显示生成的页面的临时页面
  (function () {
    if (!preLoaded.fakePage) return;
    var rbb = JSON.parse(hashArg.get('rbb'));
    if (videoPage(location.href).aid !== rbb.aid) try {
      var content = genXML(bilibili.html.page, {
        'aid': rbb.aid,
        'mid': rbb.mid,
        'title': xmlEscape(rbb.title),
        'description': xmlEscape(rbb.description),
        'kwtags': rbb.tag.join(','),
      });
      var callback = function () { };
      var doc = new DOMParser().parseFromString(content, 'text/html');
      var old = replaceDocument(doc, function () { callback(); });
      var getNode = function (qs) {
        var obj = old.querySelector(qs);
        return obj.parentNode.removeChild(obj);
      };
      try {
        var z = document.querySelector('.z');
        ['.z_top', '.header'].map(getNode).forEach(function (obj) {
          z.parentNode.insertBefore(obj, z);
        });
        ['.footer'].map(getNode).forEach(function (obj) {
          z.parentNode.appendChild(obj);
        });
      } catch (e) {
        debug('Error while add elements: %o', e);
      }
      window.addEventListener('load', function () {
        var i, o;
        document.querySelector('.tag').innerHTML = '';
        unsafeWindow.aid = String(rbb.aid);
        unsafeWindow.mid = String(rbb.mid);
        unsafeWindow.spid = Number(rbb.spid);
        try { unsafeWindow.kwtags(rbb.tag, []); } catch (e1) { }
        unsafeWindow.isSpAtt = unsafeWindow.isSpFav = "0";
        if (unsafeWindow.AttentionList) {
          for (i in unsafeWindow.AttentionList) {
            o = unsafeWindow.AttentionList[i];
            if ((o < 0) && (o * -1) == rbb.spid)
              unsafeWindow.isSpAtt = unsafeWindow.isSpFav = "1";
          }
        }
        try { unsafeWindow.showSpAdbtn(); } catch (e2) { }
      });
      addPages(rbb.aid, rbb.cids, rbb.pages, rbb.pid || Object.keys(rbb.pages)[0]);
      if (rbb.spid) callback = showBgmInfo(rbb);
    } catch (e) {
      debug('Error while replacing page: %o', e);
    }
    GM_addStyle('html { display: block !important; }');
  }());

  // 向unsafeWindow暴露一系列接口以供其他函数调用
  var exportHandler = (function () {
    var funcs = {};
    var handler = function (args) {
      var funcName = args[0]; args = args.slice(1);
      try {
        funcs[funcName].apply(null, args);
      } catch (e) {
        debug("Failed to call handler %s with arguments %o", funcName, args);
        debug("Error message: %s", e);
      }
    };
    handler.regist = function (funcName, func) { return (funcs[funcName] = func); };
    return handler;
  }());

  // ping 检查本脚本是否被加载，或注册本脚本被加载时的回调函数
  // 参数：callback 回调函数（Function）
  //      参数： （无）
  var pingHandler = exportHandler.regist('ping', function (callback) {
    if (typeof callback !== 'function') return;
    call(callback);
  });

  // getAid 通过cid获得aid和pid信息
  // 参数：cid 视频的chatid，如529622（Number）
  //      onsucc 成功获取时的回调函数（Function）
  //      参数：id 一个包括aid和pid的对象，如{"aid":314,"pid":1}。
  //      onerror 获取失败的回调函数（Function）
  //      参数：（无）
  var getAidHandler = exportHandler.regist('getAid', function (cid, onsucc, onerror) {
    if (typeof cid !== 'number') return;
    if (typeof onsucc !== 'function') return;
    if (typeof onerror !== 'function' && typeof onerror !== 'undefined') return;
    getAid(cid, onsucc, onerror);
  });

  // cid 获取当前视频的cid
  // 参数：callback 返回cid的回调函数（Function）
  //      参数：null 当前无法获取或不是视频页面（可忽略，获取后会在重新调用回调函数）
  //      参数：cid 视频的cid（Number）
  //      在一些情况导致替换了当前页面的播放器后，可能会反复调用该回调函数
  getCurrentCid.handler = (function () {
    var waiting = [];
    var handler = exportHandler.regist('cid', function (callback) {
      if (typeof callback !== 'function') return;
      var cid = getCurrentCid() || null;
      call(function () { callback(cid); });
      if (cid === null) waiting.push(callback);
    });
    handler.update = function () {
      var p = waiting; waiting = [];
      p.map(handler);
    };
    return handler;
  }());

  // getCid 通过aid和pid获取cid
  // 参数：id 一个包括aid（articlecid，av号）和pid（pageid）的对象，
  //        如{"aid":314,"pid":1}；或{"aid":314,"pid":null}。（Object）
  //      onsucc 成功获取时的回调函数（Function）
  //      参数：cid（Number），如529622（对应第一种参数）；
  //           或一个pid到cid的键值对组（Object），如{"1":529622}（对应第二种参数）
  //      onerror 获取失败时的回调函数（Function）
  //      参数：（无）
  //      methods 获取cid使用哪些方法和这些方法的顺序（String构成的Array）
  //      可能的取值："direct" 直接获取（可能包括API、HTML5、AssDown、PlayList等）
  //                "undirect" 间接获取（通过相邻视频的cid猜测）
  //                "cached" 读取缓存（如果之前获取过且用户没有禁用缓存）
  // 说明：如果只需要一个分页请勿将pid留空，可以有更大的几率获取到cid。
  //      如果只需要当前视频的cid，请使用cid接口。
  var getCidHandler = exportHandler.regist('getCid', function (id, onsucc, onerror, methods) {
    if (typeof id === 'number') id = { 'aid': id };
    if (typeof id !== 'object') return;
    if (typeof id.aid !== 'number') return;
    if (typeof id.pid === 'undefined') id.pid = null;
    if (typeof id.pid !== 'number' && id.pid !== null) return;
    if (typeof onsucc !== 'function') return;
    if (typeof onerror !== 'function' && typeof onerror !== 'undefined') return;
    var getCids = {
      'direct': getCidDirect,
      'cached': getCidCached,
      'undirect': getCidUndirect,
    };
    methods = Array.apply(Array, methods);
    var getCid = [];
    (methods || []).forEach(function (method) {
      if (getCids[method]) getCid.push(getCids[method]);
    });
    if (!getCid.length) getCid = [getCidDirect, getCidCached];
    getCid = getCid.reduce(function (x, y) {
      if (!x || !y) return x || y; return x.concat(y);
    });
    getCid(id, onsucc, onerror);
  });

  // replaced 注册发生替换播放器事件时的回调函数
  // 参数：callback 替换播放器时回调（Function）
  //      参数：true 表示事件已经被注册
  //      参数：cid 播放器被替换时调用，参数是视频的cid（Number）
  var onReplacedBofqiHandler = exportHandler.regist('replaced', function (callback) {
    if (typeof callback !== 'function') return;
    replacedBofqi.add(callback);
    callback(true);
  });

  // added 注册添加评论等相关信息时的回调函数
  // 参数：callback 替换播放器时回调（Function）
  //      参数：（无）
  var onAddedBofqiHandler = exportHandler.regist('added', function (callback) {
    if (typeof callback !== 'function') return;
    addedBofqi.add(callback);
  });

  // 向unsafeWindow暴露这些接口
  unsafeWindow.replaceBilibiliBofqi = (function () {
    if (!bilibili.config.export) return;
    var x = {};
    x.push = function () {
      debug("replaceBilibiliBofqi export, arguments: %o", arguments);
      Array.apply(Array, arguments).forEach(exportHandler);
    };
    if (unsafeWindow.replaceBilibiliBofqi &&
      unsafeWindow.replaceBilibiliBofqi.constructor.name === 'Array')
      unsafeWindow.replaceBilibiliBofqi.forEach(exportHandler);
    return x;
  }());


  addStyle();

};

if (!document.body) document.addEventListener('DOMContentLoaded', cosmos);
else setTimeout(cosmos, 0);

// 修正新番列表中部分视频不显示的问题
(function fixBangumiTwoList() {
  var r = location.href.match(/http:\/\/[^\/]*\/video\/bangumi-two-(\d+).html/);
  if (!r || !r[1]) return;
  // 先隐藏已有的新番列表
  GM_addStyle('.video_list ul.vd_list { visibility: hidden; }')
  var loaded = !!document.body, data = null;
  // 检查文档树是否已经被解析出
  if (!loaded) document.addEventListener('DOMContentLoaded', function () {
    loaded = true;
    active();
  });
  var showList = function () {
    GM_addStyle('.video_list ul.vd_list { visibility: visible; }')
  };
  // 将获取的数据添加到网页上
  var addList = function () {
    var i;
    var ul = document.createElement('ul');
    ul.className = 'vd_list';
    var listtype = document.querySelector('.vd_list li').className;
    for (i = 0; i < 24; i++) (function (video) {
      var c = document.createElement('ul');
      c.innerHTML = [
        '<li class="', listtype, '">',
          '<a class="preview" target="_blank" href="/video/av', video.aid, '/">',
            '<img src="', video.pic, '">',
          '</a>',
          '<a class="title" target="_blank" href="/video/av', video.aid, '/">', video.title, '</a>',
          '<div class="w_info">',
            '<i class="gk" title="观看">', video.play, '</i>',
            '<i class="sc" title="收藏">', video.favorites, '</i>',
            '<i class="dm" title="弹幕">', video.video_review, '</i>',
            '<i class="date" title="日期">', video.create, '</i>',
          '</div>',
          '<div class="info">', video.description, '</div>',
          '<a class="up r10000" target="_blank" href="http://space.bilibili.tv/', video.mid, '">', video.author, '</a>',
        '</li>',
      ].join('');
      ul.appendChild(c.firstChild);
    }(data[i]));
    var cnt = document.querySelector('.video_list .vd_list_cnt');
    cnt.removeChild(cnt.firstChild);
    cnt.insertBefore(ul, cnt.firstChild);
  };

  var active = function () {
    if (!loaded || !data) return;
    try { addList(); } catch (e) { }
    showList();
  };

  // 使用手机的API获取数据
  GM_xmlhttpRequest({
    'method': 'GET',
    'url': 'http://api.bilibili.cn/list?pagesize=24&type=json&page=' + r[1] +
      '&ios=0&order=default&appkey=0a99fa1d87fdd38c&platform=ios&tid=33',
    'headers': { 'User-Agent': 'bilianime/570 CFNetwork/672.0.8 Darwin/14.0.0' },
    'onload': function (resp) {
      try { data = JSON.parse(resp.responseText).list; }
      catch (e) { showList(); }
      active();
    },
    'onerror': showList,
  });

}());

var addStyle = function () {
  GM_addStyle([
    // rbb-menu
    '#rbb-menu-container, #rbb-menu-container * { all: unset; margin: 0; padding: 0; top: auto; left: auto; right: auto; bottom: auto; position: static; }',
    '#rbb-menu-container .rbb-menu { ',
      'font-size: 16px; text-align: center; ',
      'border: 4px solid rgba(204, 204, 204, 0.5); border-radius: 4px; ',
      'position: absolute; background: #fff; ',
      'z-index: 10000; ',
      'background-clip: padding-box;',
    '}',
    '#rbb-menu-container .rbb-menu[message] { margin-top: -32px; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-title { display: none; }',
    '#rbb-menu-container .rbb-menu[message] .rbb-menu-title { display:block; }',
    '#rbb-menu-container .rbb-menu, #rbb-menu-container .rbb-menu-item { overflow: visible; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-message { color: #000; padding: 4px;   }',
    '#rbb-menu-container .rbb-menu a, #rbb-menu-container .rbb-menu span { color: #00a1d6; }',
    '#rbb-menu-container .rbb-menu a { cursor: pointer; }',
    '#rbb-menu-container .rbb-menu a:hover { color: #f25d8e; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-title { height: 32px; width: 100%; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-item { height: 32px; width: 120px; float: left; }',
    '#rbb-menu-container .rbb-menu.rbb-float-right .rbb-menu-item { float: right; }',
    '#rbb-menu-container .rbb-menu .rbb-submenu .rbb-menu-item { float: none; }',
    '#rbb-menu-container .rbb-menu .rbb-submenu:empty { display: none; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-item .rbb-submenu { ',
      'max-height: 0px; background: #fff; float: left; min-width: 112px; ',
      'background-clip: padding-box; margin-left: -4px;',
      'padding: 0 16px; overflow-y: auto; text-align: left;',
      'transition: max-height 0.25s 0.25s, border 0s 0.5s;',
      'position: relative; z-index: 10000; ',
      'border: 0 solid rgba(204, 204, 204, 0.5); border-top: none; ',
    '}',
    '#rbb-menu-container .rbb-menu .rbb-menu-item:hover .rbb-submenu { ',
      'transition: max-height 0.25s 0s, border 0s 0s; ',
      'max-height: 256px; z-index: 10001; ',
      'border: 4px solid rgba(204, 204, 204, 0.5); border-radius: 4px; border-top: none; ',
    '}',
    '#rbb-menu-container .rbb-menu .rbb-menu-item:hover .rbb-submenu, ',
    '#rbb-menu-container .rbb-menu .rbb-menu-item:hover { background: #efefef; background-clip: padding-box; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-item span { cursor: default; }',
    '#rbb-menu-container .rbb-menu .rbb-suggest span, ',
    '#rbb-menu-container .rbb-menu .rbb-suggest a { font-weight: bold; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-item span, #rbb-menu-container .rbb-menu .rbb-menu-item a {',
      'font-size: 16px; line-height: 24px; padding: 4px 16px; display: block;',
    '}',
    '#rbb-menu-container .rbb-menu .rbb-submenu .rbb-menu-item { white-space: nowrap; width: 100%; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-item.rbb-menu-suggest { float: none; width: 100%; }',
    '#rbb-menu-container .rbb-menu .rbb-menu-link .rbb-menu-sp-logo {',
      'background-image: url("http://static.hdslb.com/images/v2images/icons_home.png");',
      'background-position: 5px -627px;',
      'display: inline-block;',
      'height: 16px;',
      'margin: -6px 0;',
      'padding: 4px;',
      'width: 16px;',
    '}',
     // bsp-menu
    '#bsp-menu-container { display: none !important; }',
    '#rbb-menu-container .bsp-menu {',
      'font-size: 16px;',
      'border: 4px solid rgba(204, 204, 204, 0.5); border-radius: 4px;',
      'position: absolute; z-index: 10000;',
      'background: #fff;',
      'background-clip: padding-box;',
      'overflow-x: hidden; overflow-y: auto;',
      'min-width: 256px;',
      'text-align: left;',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-item {',
      'overflow: hidden;',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-item:last-child {',
      'float: left; width: calc(100% - 16px);',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-link {',
      'height: 32px;',
      'width: 100%;',
      'overflow: hidden;',
      'display: block;',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-item:last-child .bsp-menu-link {',
      'width: calc(100% + 16px);',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-link span {',
      'height: 24px; line-height: 24px;',
      'display: block;',
      'position: relative;',
      'padding: 4px 16px;',
      'margin: 0;',
      'white-space: nowrap;',
      'cursor: pointer;',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-title {',
      'text-align: center;',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-bg,',
    '#rbb-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-fg {',
      'position: relative;',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-bg { margin-bottom: -32px; z-index: 10000; }',
    '#rbb-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-fg { color: transparent; z-index: 10001;',
      'background-image: linear-gradient(to right,',
      'rgba(255, 255, 255, 0) 0,',
      'rgba(255, 255, 255, 0) calc(100% - 64px),',
      '#fff calc(100% - 16px),',
      '#fff 100%);',
    '}',
    '#rbb-menu-container .bsp-menu .bsp-menu-link .bsp-menu-bg { color: #00a1d6; }',
    '#rbb-menu-container .bsp-menu .bsp-menu-link:hover .bsp-menu-bg { color: #f25d8e; }',
    '#rbb-menu-container .bsp-menu .bsp-menu-link span.bsp-menu-fg, ',
    '#rbb-menu-container .bsp-menu .bsp-menu-link a.bsp-menu-fg:hover { color: transparent; }',
    '#rbb-menu-container .bsp-menu.bsp-menu-with-sp { padding-top: 32px;}',
    '#rbb-menu-container .bsp-menu .bsp-menu-sp { position: absolute; top: 0; text-align: center; width: 100%; }',
    '#rbb-menu-container .bsp-menu .bsp-menu-link .bsp-menu-sp-logo {',
      'background-image: url("http://static.hdslb.com/images/v2images/icons_home.png");',
      'background-position: 5px -627px;',
      'display: inline-block;',
      'height: 16px;',
      'margin: -6px 0;',
      'padding: 4px;',
      'width: 16px;',
    '}',
    // rbb-message
    '#rbb-message { position: absolute; left: calc((100% - 980px) / 2); }',
    '.widescreen~#rbb-message { left: calc((100% - 1170px) / 2); }',
    // old-bofqi
    '.widescreen #old-bofqi { width: 1160px; }',
    '#old-bofqi { margin: 5px 5px 25px 5px; position: relative; }',
    '#old-bofqi .player { height: 536px; width: 970px; }',
    '.widescreen #old-bofqi .player { height: 666px; width: 1160px; }',
    // curPage
    '.viewbox .alist a.curPage:hover { ',
      'background: url("../images/v2images/icons_home.png") no-repeat scroll 8px -1856px #00A1D6;',
    '}',
    // rbb_alist
    '#rbb_alist { float:left; width: 100%; max-height: 70px; overflow-y: auto; }',
  ].join(''));
};
addStyle();
