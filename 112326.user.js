// ==UserScript==
// @encoding       utf-8
// @name           SJTU SE e-Learning Plus
// @namespace      http://userscripts.org/scripts/show/112326
// @version        2.5.2
// @copyright      cc-by-sa 3.0 / GNU GPL v3, 田生
// @description    e-Learning的一些改进
// @include        http://backup.se.sjtu.edu.cn/elearning/*
// @match          http://backup.se.sjtu.edu.cn/elearning/*
// @run-at         document-end
// @grant          none
// ==/UserScript==


var constant = {
  // url
  url: {
    $: 'http://backup.se.sjtu.edu.cn/elearning/',
    lang: 'lang.asp',
    login: 'login.asp',
    logincheck: 'logincheck.asp',
    logout: 'logout.asp',
    timeout: 'timeout.asp',
    announcement: 'announcement/',
    courselist: 'course/courselist.asp',
    answer: 'homework/answer.asp',
    addanswer: 'homework/addanswer.asp',
    addanswer_step2: 'homework/addanswer_step2.asp',
    adddiscuss: 'homework/adddiscuss.asp',
    materials: 'materials/linkredirect.asp',
    materials_tp2: 'materials/linkredirect.asp?type=2',
    materials_tp3: 'materials/linkredirect.asp?type=3',
    downloadlist: 'materials/downloadlist.asp',
    adddownload: 'materials/adddownload.asp',
    homeworklist: 'homework/homeworklist.asp',
    bbs: 'bbs/index.asp',
    submail: 'subscribe/submail.asp',
    studentinquiry: 'inquiry/studentinquiry.asp',
    seminarlist: 'seminar/seminarlist.asp',
    schedule: 'course/schedule.asp',
    principles: 'course/principles.asp',
    coursearrange: 'course/coursearrange.asp',
    viewcourseware: 'course/viewcourseware.asp',
    mysummary: 'course/mysummary.asp',
    support: 'http://www.hcj.co.jp/hcs/elearning/support/',
    studentlist: 'studentmanage/studentlist.asp',
    coursewarenotready: 'course/coursewarenotready.asp',
    coursematerial: 'course/coursematerial.asp',
    profile: 'profile.asp',
    config: 'config',
    postinga: 'announcement/posting.asp',
    forgotpassword: 'forgotpassword.asp',
    answerfile: 'files/homework/'
  },
  // 图片
  image: {
    open: 'img/open.gif',
    closed: 'img/closed.gif',
    mainmenubg: 'img/mainmenubg.gif',
    currentmainmenubg: 'img/currentmainmenubg.gif',
    logo: 'img/logo.gif',
    spacer: 'img/spacer.gif'
  },
  // 文字常量
  text: {
    // 中文
    gb: {
      homework: '作业',
      courseannouncement: '课程公告',
      login: '登陆', denglu: '登录',
      go: 'Go',
      loginname: '用户名',
      password: '密码',
      loginfail: '用户名或密码错误',
      timeoutfail: '会话过程超时',
      timeoutinfo: '信息提示',
      addanswer: '解答',
      addanswer2: '修改答案',
      delanswer: '删除答案',
      adddiscuss: '发表评论',
      enter: '进入',
      announcement: '公告',
      downloadlist: '参考资料',
      download: '下载',
      bbs: '论坛',
      submail: '邮件列表',
      studentinquiry: '教学调查',
      faq: 'FAQ',
      errmsg: 'Hacking attempt',
      showall: '显示全部',
      coursename: '课程名称',
      nodata: '当前没有相关的[TP]纪录',
      nocourse: '当前没有相关的课程记录',
      pdate: '发布日',
      sconfig: '脚本设置',
      action: '操作',
      downloaderr: '文件下载错误！',
      // 这一段我也不机器翻译了，有人有需要的话自行解决吧，解决之后给我一份
      _ybutton: '脚本添加的按钮显示为黄色（建议勾选）',
      _spscn: '行间添加的课程名删除括号（若导致歧义请取消勾选）',
      _denglu: '登录页面界面把“登陆”改成“登录”', // 限中文界面
      _autologin: '自动登录（启用后需要登录时勾选记住密码才有效）',
      _ahidden: '公告折叠',
      _aoneline: '公告折叠后变为一行',
      _ashowall: '课程公告默认显示为所有',
      _ansempty: '提交作业忽略对内容是非为空的检查',
      _ansfilec: '自动检查作业附件是否可以下载（会自动向服务器发送HEAD请求）',
      _ansdel: '作业页面过期已交作业显示删除按钮（默认未选中以防误操作）',
      _ansadd: '作业页面过期未交作业显示解答按钮',
      _ansadd2: '作业页面过期未交作业显示修改按钮',
      _dlshowall: '参考资料页面超过一页时添加显示全部按钮',
      _dlfouced: '参考资料页面下载按钮强制为下载', // 限支持download属性
      _cllinks: '我的课程页面添加直接链接',
      _hwldc: '作业列表页面显示日期倒数计数',
      _spagea: '添加所有课程的课程公告页面',
      _spagem: '添加所有课程的参考资料页面',
      _spageh: '添加所有课程的作业页面',
      _h1sd: '隐藏我的日程的链接',
      _h1sl: '隐藏讲座的链接',
      _h2pc: '隐藏教学大纲的链接',
      _h2ca: '隐藏上课安排的链接',
      _h2vc: '隐藏教材阅览的链接',
      _h2ms: '隐藏学习记录的链接',
      _h2fq: '隐藏FAQ的链接',
      _hhl: '隐藏帮助的链接',
      _hti: '隐藏顶部图片（Opera下不推荐）',
      _etl: '顶部显示额外的链接',
      _ltext: '链接描述',
      _lurl: '链接URL'
    },
    // 日本語
    // 除原界面中的文本外其余皆为机器翻译，效果不作保证
    ja: {
      homework: '課題',
      courseannouncement: 'コースお知らせ',
      login: 'ログイン',
      go: 'Go',
      loginname: 'ユーザ名',
      password: 'パスワード',
      loginfail: 'ユーザ名もしくはパスワードに誤りがあります',
      timeoutfail: 'タイムオーバーです',
      timeoutinfo: 'アラートメッセージ',
      addanswer: '回答',
      addanswer2: '回答を修正',
      delanswer: '回答を削除',
      adddiscuss: 'コメント',
      enter: '入る',
      announcement: 'お知らせ',
      downloadlist: '参考資料',
      download: 'ダウンロード',
      bbs: 'フォーラム',
      submail: 'メーリングリスト',
      studentinquiry: '授業調査',
      faq: 'FAQ',
      errmsg: 'Hacking attempt',
      showall: '全てを表示',
      coursename: 'コース名称',
      nodata: '[TP]情報はありません',
      nocourse: 'コース情報はありません',
      pdate: '発表日',
      sconfig: 'スクリプト設定',
      action: 'アクション',
      downloaderr: 'ダウンロードのエラー！',
    },
    // 初始化时将选择的语言的常量拷贝至此
    // 调用时使用$
    $: {}
  },
  dom: {
    buttonspace: [
      '<td>',
        '<img height="1" width="10" src="/elearning/img/spacer.gif">',
      '</td>'
    ].join(''),
    button: [
      '<td><table cellspacing="0" cellpadding="0" border="0"><tbody><tr>',
        '<td height="20" width="5">',
          '<img height="20" width="5" ',
            'src="/elearning/img/commandbutton_y_left.gif">',
        '</td>',
        '<td background="/elearning/img/commandbutton_y_middle.gif">',
          '<img height="1" width="5" src="/elearning/img/spacer.gif">',
        '</td>',
        '<td nowrap="" valign="bottom" ',
          'background="/elearning/img/commandbutton_y_middle.gif">',
          '<table cellspacing="0" cellpadding="0" border="0" ',
            'width="100%"><tbody>',
            '<tr><td nowrap="">',
              '<a id="[ID]" class="commandbutton" href="[HREF]">',
                '[TEXT]',
              '</a>',
            '</td></tr>',
            '<tr><td><img height="2" width="1" ',
              'src="/elearning/img/spacer.gif"></td></tr>',
          '</tbody></table>',
        '</td>',
        '<td background="/elearning/img/commandbutton_y_middle.gif">',
          '<img height="1" width="5" src="/elearning/img/spacer.gif">',
        '</td>',
        '<td width="5">',
          '<img height="20" width="5" ',
            'src="/elearning/img/commandbutton_y_right.gif">',
        '</td>',
      '</tr></tbody></table></td>'
    ].join(''),
    buttonarea: [
      '<td><table cellspacing="0" cellpadding="0" border="0"><tbody><tr>',
      '</tr></tbody></table></td>'
    ].join(''),
    lastbuttonspace: [
      '<td>',
        '<img height="1" width="15" src="/elearning/img/spacer.gif">',
      '</td>'
    ].join(''),
    h1link: [
      '<td><img width="16" height="1" src="/elearning/img/spacer.gif">',
        '<a class="mainmenu" id="[ID]" href="[URL]">[TEXT]</a>',
      '<img width="16" height="1" src="/elearning/img/spacer.gif">'
    ].join(''),
    tflink: [
      '<td>',
        '<a class="mainmenu" id="[ID]" href="[URL]">[TEXT]</a>',
      '</td>'
    ].join(''),
		tfspace: [
      '<td>',
        '<img height="1" width="10" src="/elearning/img/spacer.gif"/>',
      '</td>'
    ].join(''),
    ccourseth: [
      '<tr><td nowrap="" class="tableHeaderRow">[COURSENAME]</td></tr>'
    ].join(''),
    ccoursetf: '<tr><td colspan="5" class="tablesubheaderrow"></td></tr>',
    ccoursetdo: [
      '<tr><td nowrap="" class="datacell">',
        '<a class="list" id="[ID]" href="[HREF]"><b>[TEXT]</b></a>',
      '</td></tr>'
    ].join(''),
    ccoursetde: [
      '<tr><td nowrap="" class="actioncell">',
        '<a class="list" id="[ID]" href="[HREF]"><b>[TEXT]</b></a>',
      '</td></tr>'
    ].join(''),
    ccourseempty: '<tr><td class="nodatacell">[NODATA]</td></tr>',
    pageinfo: [
      '<table cellspacing="1" cellpadding="4" border="0" ',
        'align="center" width="100%" class="mainpart">',
        '<tbody><tr><td class="tableHeaderRow">',
            '<img height="1" width="1" src="/elearning/img/spacer.gif">',
        '</td></tr>',
        '<tr><td class="nodatacell">[INFO]</td></tr>',
        '<tr><td class="tablesubheaderrow">',
            '<img height="1" width="1" src="/elearning/img/spacer.gif">',
        '</td></tr>',
      '</tbody></table>'
    ].join(''),
    splitbar: [
      '<tr><td class="bluespacetd" colspan="[TDCOUNT]">',
        '<img height="1" width="1" src="/elearning/img/spacer.gif">',
      '</td></tr>'
    ].join(''),
    loading: [
      '<progress id="loading" max="[S]" value="[C]" ',
        'style="height: 16px; width: 256px;" />'
    ].join(''),
    coursename: '<span class="coursename">[N]</span>',
    sconfigf: [
      '<tr><td class="tableheaderrow">&nbsp;</td></tr>',
      '<tr><td class="tablesubheaderrow">&nbsp;</td></tr>'
    ].join(''),
    sconfigo: '<tr><td nowrap="" class="datacell">[C]</td></tr>',
    sconfige: '<tr><td nowrap="" class="actioncell">[C]</td></tr>',
    checkbox: '<label><input type="checkbox" [C]>[T]</label>',
    label: '<label>[T]</label>',
    etlinks: '[LINKST]<ul id="etlinks" style="margin: 2px 0;"></ul>',
    etlinkl: ['<li>',
      '<input style="width: 16em;" placeholder="[LTEXT]" value="[TEXTV]" />',
      '<input style="width: 48em;" placeholder="[LURL]" value="[URLV]" />',
    '</li>'].join('')
  },
  now: null
}

// 配置
var configuration = {
  lang: 'gb', // 当前语言
  button: {
    yellow: true // 脚本添加的按钮默认为黄色
  },
  general: {
    shortencn: true, // 缩短课程名称
  },
  login: {
    loginname: null, // 用户名
    password: null, // 密码
    savepassword: false, // 保存密码的选框
    denglu: true, // 把“登陆”换成“登录”
    autologin: true // 登录及超时时自动登录
  },
  announcement: {
    hidden: true, //折叠公告
    showall: true, // 课程公告默认显示为所有
    oneline: true // 公告折叠后置于一行
  },
  answer: {
    empty: true, // 忽略答案是否填写的检查
    filec: true, // 自动检查作业附件是否可以下载
    // del项默认false，有需要请手动修改
    del: false, // 过期作业删除按钮
    add: true, // 过期作业提交按钮
    add2: true, // 过期作业编辑按钮
  },
  downloadlist: {
    showall: true, // 参考资料显示全部的链接
    fouced: true // 参考资料下载按钮强制为下载
  },
  courselist: {
    links: true // 课程列表页面显示链接               
  },
  homeworklist: {
    daycount: true, // 作业列表页面的日期计数
  },
  specpage: { // 生成的页面是否显示链接
    announcement: true, // 课程公告
    materials: true, // 参考资料
    homework: true, // 作业
  },
  hidden: {
    h1: {
      schedule: true, // 我的日程
      seminarlist: true // 讲座
    },
    h2: {
      principles: true, // 教学大纲
      coursearrange: true, // 上课安排
      viewcourseware: true, // 教材阅览
      mysummary: true, // 学习记录
      faq: true // FAQ
    },
    helplink: true, // 帮助链接
    topimg: navigator.userAgent.indexOf('Opera') === -1 // 顶部图片
  },
  h1elinks: Etlinks([])
}

// 本地存储
lsconfig = [
  // [configuration的参数, 类型, 对应脚本设置]
  // 参数在每页打开时都会读取
  // 在参数配置页面有对应设置的会显示选项，null显示为分隔条
  ['lang', String],
  ['login.loginname', String],
  ['login.password', String],
  ['login.savepassword', Boolean],
  ['button.yellow', Boolean, '_ybutton'],
  ['general.shortencn', Boolean, '_spscn'],
  null,
  ['login.autologin', Boolean, '_autologin'],
  ['login.denglu', Boolean, '_denglu', configuration.lang === 'gb'],
  null,
  ['announcement.hidden', Boolean, '_ahidden'],
  ['announcement.oneline', Boolean, '_aoneline'],
  ['announcement.showall', Boolean, '_ashowall'],
  null,
  ['answer.empty', Boolean, '_ansempty'],
  ['answer.filec', Boolean, '_ansfilec'],
  null,
  ['answer.del', Boolean, '_ansdel'],
  ['answer.add', Boolean, '_ansadd'],
  ['answer.add2', Boolean, '_ansadd2'],
  null,
  ['downloadlist.showall', Boolean, '_dlshowall'],
  ['downloadlist.fouced', Boolean, '_dlfouced', 'download' in document.createElement('a')],
  null,
  ['courselist.links', Boolean, '_cllinks'],
  null,
  ['homeworklist.daycount', Boolean, '_hwldc'],
  null,
  ['specpage.announcement', Boolean, '_spagea'],
  ['specpage.materials', Boolean, '_spagem'],
  ['specpage.homework', Boolean, '_spageh'],
  null,
  ['hidden.h1.schedule', Boolean, '_h1sd'],
  ['hidden.h1.seminarlist', Boolean, '_h1sl'],
  ['hidden.h2.principles', Boolean, '_h2pc'],
  ['hidden.h2.coursearrange', Boolean, '_h2ca'],
  ['hidden.h2.viewcourseware', Boolean, '_h2vc'],
  ['hidden.h2.mysummary', Boolean, '_h2ms'],
  ['hidden.h2.faq', Boolean, '_h2fq'],
  ['hidden.helplink', Boolean, '_hhl'],
  ['hidden.topimg', Boolean, '_hti'],
  null,
  ['h1elinks', Etlinks, null]
];

/* 我猜你在看代码，
 * 好吧，既然您有心情看代码……
 * 来维护这个脚本吧。
 * 其实很简单的，
 * 什么时候发现有问题了，
 * 改改，改不了删删，
 * 再不行通知我一声。
 * 谢谢～
 */

// url变量保存当前url，包括：
// $        当前url的全路径
// $page    除去@include中的路径后剩余的页面部分
// $path    $page用/分割的数组
// $param   参数部分的url
// $params  参数列表
//   key  参数名
//   val  参数值
// 页面参数的值对
var url;

// 分析URL
var parseURL = function (URL) {
  var s, p, i, v;
  url = { $: URL, $page: '', $path: [], $param: '', $params: [] }
  s = url.$.substring(constant.url.$.length);
  url.$page = s.replace(/[?#].*/, '');
  url.$path = url.$page.split('/');
  url.$param = s.substring(url.$page.length + 1).replace(/#.*/, '');
  p = url.$param.split('&');
  for (i = 0; i < p.length; i++) {
    if ((v = p[i].indexOf('=')) === -1) continue;
    s = p[i].substring(0, v);
    v = p[i].substring(v + 1);
    url.$params[url.$params.length] = { key: s, val: v };
    url[s] = v;
  }
  return url;
};

// URL参数设置什么的
var setParamter = function (url, paramter) {
  if (!paramter || !paramter.length) return url;
  var rp = []; for (i = 0; i < paramter.length; i++)
   rp[rp.length] = paramter[i][0];
  url = rmParamter(url, rp);
  var
    b = url.replace(/^([^#]*)#.*$/, '$1'),
    s = url.substring(b.length), i;
  b = b.replace(/[&?]+$/, '').replace('?&', '?');
  for (i = 0; i < paramter.length; i++)
    b += ((b.indexOf('?') === -1)?'?':'&') +
     paramter[i][0] + '=' + escape(paramter[i][1]);
  return b + s;
};
var rmParamter =  function (url, paramter) {
  if (typeof(paramter) === 'string') paramter = [paramter];
  var
    b = url.replace(/^([^#]*)#.*$/, '$1'),
    s = url.substring(b.length), i;
  for (i = 0; i < paramter.length; i++)
    b = b.replace(RegExp('&?' + paramter[i] + '=[^&]*', 'i'), '');
  b = b.replace(/[&?]+$/, '').replace('?&', '?');
  return b + s;
};
var getParamter = function (url, paramter) {
  var 
    b = url.replace(/^([^#]*)#.*$/, '$1'),
    r = RegExp('.*[?&]' + paramter + '=([^&]*).*', 'i');
  if (!r.test(b)) return null;
  return unescape(b.replace(r, '$1'));
};

// XMLHttp请求
// 封装成类似Greasemonkey提供的接口
// 不使用GM提供的API因为不需要跨域且兼容其他浏览器
var xmlHttpRequest = function (details) {
  if (typeof(details.method) === 'undefined') details.method = 'GET';
  if (typeof(details.paramters) === 'undefined') details.paramters = [];
  var xmlHttp = new XMLHttpRequest(), i;
  if (details.method === 'GET')
    details.url = setParamter(details.url, details.paramters);
  xmlHttp.URL = details.url;
  xmlHttp.open(details.method, details.url, true);
  xmlHttp.onreadystatechange = function () {
    if (details.onreadystatechange) details.onreadystatechange(xmlHttp);
    if (xmlHttp.readyState === 4) {
      constant.now = new Date(xmlHttp.getResponseHeader('Date'));
      if (xmlHttp.status === 200)
      { if (details.onload) details.onload(xmlHttp); }
      else { if (details.onerror) details.onerror(xmlHttp); }
    }
  }
  if (details.method === 'POST') {
    xmlHttp.setRequestHeader('Content-type',
      'application/x-www-form-urlencoded');
    xmlHttp.send(setParamter('', details.paramters).replace('?', ''));
  } else xmlHttp.send();
};

// 添加CSS样式
var addCssStyles = function (cssDetail, id) {
  var s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  if (typeof(id) !== 'undefined') s.id = id;
  s.innerHTML = cssDetail;
  document.getElementsByTagName('head')[0].appendChild(s);  
};

// getElementById的简写而已
var $i = function (id) { return document.getElementById(id); }
var $n = function (id) { return document.getElementsByName(id); }

// 找到pos中第一个
//   标签名为tn
//   内容为inner
//   属性值对满足attr
// 的元素
var findsth = function (pos, tn, inner, attr) {
  try {
    if (tn === null) tn = '*';
    var l = pos.getElementsByTagName(tn), i, j;
    for (i = 0; i < l.length; i++) {
      if (inner !== null && l[i].innerHTML !== inner) continue;
      for (j = 0; j < attr.length; j++) {
        if (typeof(attr[j][1]) === 'string') {
          if (l[i].getAttribute(attr[j][0]) !== attr[j][1]) break;
        } else if (attr[j][1] && typeof(attr[j][1].test) === 'function') {
          if (!attr[j][1].test(l[i].getAttribute(attr[j][0]))) break;
        }
      }
      if (j === attr.length) return l[i];
    }
  } catch (e) {}
  return null;
};
// 返回上方导航栏的DOM
var findh1 = function () {
  try { return findsth(document, 'td', null,
    [['background', RegExp(constant.image.mainmenubg)]]
  ); } catch(e) { return null; }
};
// 返回第二行导航栏的DOM
var findh2 = function () {
  try { return findsth(document, 'td', null,
    [['class', 'submenubar']]).parentNode; }
  catch(e) { return null; }
};
// 返回右上链接部分
var findtf = function () {
  return findsth(document, 'td', null, [['class', 'topfade']]);
};
// 找到正中间的主体部分的DOM
var findmp = function () {
  return findsth(document, 'table', null, [['class', 'mainpart']]);
};
var findpt = function () {
  return findsth(document, 'td', null, [['class', 'pagetitle']]);
};
// 找到这个元素的tagName按顺序为tnl
var findparent = function (obj, tnl) {
  var n = obj, i = 0;
  if (typeof(tnl) === 'string') tnl = [tnl];
  if (!tnl.length) return;
  while (i !== tnl.length && n && n.tagName) {
    n = n.parentNode;
    if (n.tagName.toUpperCase() === tnl[i].toUpperCase()) i++;
  }
  return n;
};
// 找到一个节点的所有tagName为某值的孩子节点
var findchilds = function (obj, tagname) {
  var l = obj.childNodes, i, f = [];
  for (i = 0; i < l.length; i++)
   if (l[i].tagName &&
   l[i].tagName.toUpperCase() === tagname.toUpperCase())
    f[f.length] = l[i];
  return f;
};

// 新建一个元素
var newElement = function (html) {
  var tagname = html.replace(/^<([a-zA-Z0-9]*)[^a-zA-Z0-9].*$/, '$1');
  var o = document.createElement(tagname); 
  o.innerHTML = html.replace(/^<.* \/>$/, '')
    .replace(/^<[^>]*>(.*)<\/[^>]*>$/, '$1');
  return o;
};

// 在一级导航的位置添加一个元素
var newH1 = function (id, url, text) {
  var h = findh1(); if (!h) return;
  h = h.getElementsByTagName('tr')[0]; if (!h) return;
  h.appendChild(newElement(constant.dom.h1link
    .replace('[URL]', url).replace('[TEXT]', text).replace('[ID]', id)
  ));
};
// 重设上方导航栏的高亮显示
var mvHighlightH1 = function (url) {
  var h, i, p = 1;
  try { h = findchilds(findh1().getElementsByTagName('tr')[0], 'td'); }
  catch (e) {return;}
  for (i = 0; i < h.length; i++) {
    h[i].removeAttribute('background');
    var t = h[i].getElementsByTagName('a');
    if (!t || !t.length || !t[0] || !t[0].href) continue;
    if (RegExp(url).test(t[0].href)) p = i;
  }
  h[p].setAttribute('background',
    constant.url.$ + constant.image.currentmainmenubg);
};
// 隐藏第二行导航栏
var hideH2 = function() {
  var h = findh2();
  if (h && h.style) h.style.display = 'none';
};

// 读取保存的数据
var configVal = function (o, a, v) {
    s = a.split('.'); p = o;
    for (j = 0; j < s.length - 1; j++) p = p[s[j]];
    if (typeof(v) !== 'undefined') p[s[j]] = v;
    return p[s[j]];
};
var loadConfig = function () {
  var l = lsconfig, i, j, p, t, s, val;
  for (i = 0; i < l.length; i++) if (l[i] && l[i].length) {
    if ((t = localStorage.getItem(l[i][0])) === null) continue;
    val = (l[i][1])(t);
    configVal(configuration, l[i][0], val);
  }
};
// 写数据
var writeConfig = function (k, v) {
  // JS在将false转成String时为'false'
  // 而非空串转换回Boolean为true
  // 所以这里将其变为空串
  if (v === false) v = ''; // 必须是`==='
  if (v === null) localStorage.removeItem(k);
  else localStorage.setItem(k, v);
};

// 初始化变量
var varInit = function () {
  url = parseURL(document.location.href);
  constant.text.$ = constant.text.gb;
  // 内联函数用来做递归
  (function (l, r) {
    var i; for (i in r)
     if (typeof(i) === 'string') l[i] = r[i];
     else if (r[i]) arguments.callee(l[i], r[i]);
  })(constant.text.$, constant.text[configuration.lang]);
};

// 在登录界面自动选择语言
var langSelect = function () {
  if (window.location.hash === '#lang') return;
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  var t = findpt();
  // 用标题判断当前语言是否正确
  if (t.innerHTML !== constant.text.$.login) {
    window.location.replace(setParamter(
        constant.url.$ + constant.url.lang,
        [['lang', configuration.lang],
        ['returl', constant.url.login + '#lang']]
    ));
    configuration.login.autologin = false; // 避免在重定向前被登录
  }
};
// 保存用户选择的界面语言
var langSave = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  var s = $n('lang')[0];
  var b = findsth(
    findparent(s, ['tr']), 'a', null,
    [['class', 'commandbutton'], ['href', RegExp('changeLang')]]
  );
  b.onclick = function () { writeConfig('lang', s.value); }
};

// 折叠公告内容
var announcementHidden = function () {
  if (!configuration.announcement.hidden) return;
  if (url.$page.indexOf(constant.url.announcement) !== 0) return;
  var p = document.getElementsByTagName('a'), i;
  for (i = 0; i < p.length; i++) {
    var s = p[i].getAttribute('onclick');
    if (!s || s.indexOf('sexpandIt') === -1) continue;
    // 获取公告的id
    var o = p[i].getAttribute('onclick')
      .replace(/^[^']*'([^']*)'[^']*$/, '$1');
    // 对所有的折叠展开公告用的链接
    // 用href保存对应公告的id
    p[i].href = '#' + o;
    p[i].removeAttribute('onclick');
    p[i].onclick = function () {
      var s = this.href.replace(/^.*#([^#]*)/, '$1');
      var a = $i(s),
        m = findsth(findparent(this, ['table']), 'img', null, []);
      if (a.style.display === 'none') { 
        a.style.display = ''; m.src = constant.url.$ + constant.image.open;
      } else {
        a.style.display = 'none';
        m.src = constant.url.$ + constant.image.closed;
      }
      return false;
    }
    $i(o).style.display = 'none';
  }
};

// 课程公告默认显示为所有
var announcementShowAll = function () {
  if (!configuration.announcement.showall) return;
  // 当前为课程公告且未指明为本月还是全部时
  if (url.$page.indexOf(constant.url.announcement) === 0)
   if (url.courseid && !url.range && url.courseid > 0)
    window.location.replace(setParamter(url.$, [['range', 'all']]));
  // 当前为课程列表进入公告时
  if (url.$page.indexOf(constant.url.courselist) === 0) {
    var p = findmp().getElementsByTagName('a'), i;
    for (i = 0; i < p.length; i++) {
      if (p[i].href.indexOf(constant.url.announcement) === -1) continue;
      p[i].href = setParamter(p[i].href, [['range', 'all']]);
    }
  };
  // 修改在二级标题中的课程公告内容
  if (l = findsth(findh2(), 'a', null,
   [['href', RegExp(constant.url.announcement)]]))
    l.href = setParamter(l.href, [['range', 'all']]);
};

// 公告折叠后变为一行
var announcementOneLine = function (doc) {
  if (!configuration.announcement.oneline) return;
  if (url.$page.indexOf(constant.url.announcement) !== 0) return;
  if (typeof(doc) === 'undefined') doc = document;
  var tr, i, j; try { tr = findchilds(findparent(findsth(doc, 'td', null,
    [['class', 'tablesubheaderrow']]), ['tr']).parentNode, 'tr');
  } catch (e) { return; }
  for (i = 0; i < tr.length; i++) {
    var td = findchilds(tr[i], 'td');
    if (td.length === 1) {
      // 最上最下的两行
      td[0].setAttribute('colspan', 4);
    } else if (td[2].className === 'tableheaderrow') {
      // 标题行
      var d = td[1].cloneNode(true);
      d.setAttribute('width', '80px'); d.innerHTML = constant.text.$.pdate;
      td[0].setAttribute('width', '80px');
      td[1].setAttribute('width', '80px');
      tr[i].insertBefore(d, td[2]);
    } else {
      // 内容行
      var n = td[1].childNodes, u = n[0].nodeValue, t = n[2].nodeValue;
      var d = td[1].cloneNode(true);
      d.innerHTML = t; td[1].innerHTML = u;
      var j, dl = [td[0], td[1], d];
      for (j = 0; j < dl.length; j++) dl[j].setAttribute('nowrap', '');
      tr[i].insertBefore(d, td[2]);
    }
  }
  // 删除公告之间的分割线
  for (i = tr.length - 1; i >= 0; i--)
    if (findchilds(tr[i], 'td')[0].className === 'bluespacetd')
      tr[i].parentNode.removeChild(tr[i]);
};

// 清理登录界面上的乱码字符
var loginFormClear = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  var l = document.getElementsByTagName('*'), i;
  // 幸好这些乱码字符都是如下的字符串，天知道为什么
  for (i = 0; i < l.length; i++)
    if (l[i].innerHTML === '\ufffd\ufffd') l[i].innerHTML = '&nbsp;';
};

// 将登录的按钮改为<button>
var loginFormButton = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  // 登录界面上的元素
  var
    bt = findparent(findsth(document, 'a', null,
      [['class', 'commandbutton'], ['href', RegExp('doLogin')]]
    ), 'td'), b = document.createElement('button')
    loginname = $n('loginname')[0], password = $n('password')[0];
  // 去掉两个检查回车键的脚本
  loginname.removeAttribute('onkeyup'); loginname.required = true;
  password.removeAttribute('onkeyup'); password.required = true;
  loginname.setAttribute('title', constant.text.$.loginname);
  password.setAttribute('title', constant.text.$.password);
  // 将登录的链接换成按钮
  b.innerHTML = constant.text.$.login;
  b.className = 'commandbutton'; b.type = 'submit';
  addCssStyles(['button.commandbutton {',
    'background: none; border: 0 none; cursor: pointer;',
    'margin: 0; padding: 0; font-size: 12px;',
  '}'].join(''));
  bt.innerHTML = ''; bt.appendChild(b);
};
// 把“登陆”改成“登录”
var loginDengLu = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  if (!configuration.login.denglu) return;
  if (configuration.lang !== 'gb') return;
  var l = document.getElementsByTagName('*'), i;
  for (i = 0; i < l.length; i++)
    if (l[i].innerHTML === constant.text.$.login)
      l[i].innerHTML = constant.text.$.denglu;
};
// 把savepassword选框前面的文字加上label
var labelSavepassword = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  var p = $n('savepassword')[0].parentNode;
  p.innerHTML = constant.dom.label.replace('[T]', p.innerHTML);
};

// 清除保存的用户名密码
var loginSaveClear = function () {
  localStorage.removeItem('login.loginname');
  localStorage.removeItem('login.password');
};
// 在登录页面保存用户信息
var loginSaveInfo = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  $n('frm1')[0].onsubmit = function () {
    var
      savepasswordi = $n('savepassword')[0],
      savepassword = savepasswordi.checked,
      loginname = $n('loginname')[0].value, password = $n('password')[0].value;
    writeConfig('login.savepassword', savepassword);
    // 如果没有勾选保存密码则此处不工作
    if (!savepassword) loginSaveClear(); else {
      writeConfig('login.loginname', loginname);
      writeConfig('login.password', password);
      // 禁用掉原网站用cookies保存的用户名密码
      savepasswordi.checked = false;
    }
  } // onsubmit
};
// 自动填写登录信息
var autoLoginFill = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  var
    loginname = configuration.login.loginname,
    password = configuration.login.password,
    savepassword = configuration.login.savepassword;
  if (loginname) $n('loginname')[0].value = loginname;
  if (password) $n('password')[0].value = password;
  if (savepassword) $n('savepassword')[0].checked = savepassword;
};
// 自动登录
var autoLogin = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  if (!configuration.login.autologin) return;
  if (window.location.hash === '#fail') return;
  if (window.location.hash === '#timeout') return;
  if ($n('loginname')[0].value && $n('password')[0].value)
  if (configuration.login.loginname && configuration.login.password)
   { $n('savepassword')[0].checked = false; $n('frm1')[0].submit(); }
};
// 用户名或密码错误时清除保存的登录信息
var loginInfoClearWrong = function () {
  if (url.$page.indexOf(constant.url.logincheck) !== 0) return;
  if (!findsth(document, 'td', null, [['class', 'errorinfomation']]))
    return;
  loginSaveClear();
};
// 用户名或密码错误时清除保存的登录信息
var loginInfoClearLogout = function () {
  var a = findsth(document, 'a', null,
    [['href', RegExp(constant.url.logout)]]);
  if (a) a.onclick = loginSaveClear;
};
// 用户名或密码错误页面自动重定向到登录页面
// 并追加#fail
var loginFailRelocated = function () {
  if (url.$page.indexOf(constant.url.logincheck) !== 0) return;
  if (!findsth(document, 'td', null, [['class', 'errorinfomation']]))
    return;
  window.location.replace(constant.url.$ + constant.url.login + '#fail');
};
// 登录页面若有#fail则显示错误提示
var loginFailText = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  if (window.location.hash !== '#fail') return;
  var p = findsth(document, 'td', null, [['class', 'datacell']])
    .getElementsByTagName('td')[0];
  p.className = 'redbig'; p.innerHTML = constant.text.$.loginfail;
};
// 在超时页面隐藏详细信息
// 因为在超时页面重新登录需要时间
// 此处隐藏详细信息一方面证明脚本还在工作
// 另一方面也避免用户习惯性点击到登录页面
var timeoutInfoHidden = function () {
  if (!configuration.login.autologin) return;
  if (url.$page.indexOf(constant.url.timeout) !== 0) return;
  var p = findmp(),
    th = findsth(p, 'td', null, [['class', 'tableHeaderRow']]),
    td = findsth(p, 'td', null, [['class', 'datacell']]);
  th.innerHTML = constant.text.$.timeoutfail; td.style.display = 'none';
};

// 超时页面自动重新登录或回到登录页面
var timeoutAutoLogin = function () {
  if (!configuration.login.autologin) return;
  if (url.$page.indexOf(constant.url.timeout) !== 0) return;
  var count = 0, succ = false;
  var
    loginname = configuration.login.loginname,
    password = configuration.login.password,
    lang = configuration.lang,
    loginbutton = findsth(document, 'td', null,
      [['class', 'tableHeaderRow']]);
  // 如果重新登录出错则回到主页
  var errHandle = function () {
    loginSaveClear();
    window.location
      .replace(constant.url.$ + constant.url.login + '#timeout');
  }
  // 如果登录成功则回到刚才访问的页面
  var succHandle = function () {
    url = sessionStorage.getItem('lasturl');
    if (url === null) window.history.back();
    else window.location.replace(url);
  }
  // 访问结束的控制
  var finHandle = function () { [errHandle, succHandle][succ?1:0](); }
  // 登录出错的处理
  var loginErrorHandle = function (d)
  { succ = false; if (!--count) finHandle(); }
  // 设定访问语言返回的处理
  var langDoneHandle = function (d) { if (!--count) finHandle(); }
  // 登录页面返回的处理
  var loginDoneHandle = function (d) {
    succ = (d.responseText.indexOf(constant.url.login) === -1);
    if (!--count) finHandle(); 
  }
  // 已保存了用户名和密码的情况下
  if (loginname && password) {
    // 如果界面显示的语言为中文而用户设定的语言为日文
    // 需要访问语言设定的页面设定语言
    if (loginbutton.innerHTML !== constant.text.$.timeoutinfo) {
      count++; xmlHttpRequest({
        url: constant.url.$ + constant.url.lang,
        onload: langDoneHandle,
        paramters: [['lang', configuration.lang]]
      });
    }
    // 访问登录的页面
    count++; xmlHttpRequest({
      method: 'POST',
      url: constant.url.$ + constant.url.logincheck,
      onload: loginDoneHandle, onerror: loginErrorHandle,
      paramters: [['loginname', loginname],
        ['password', password], ['lang', configuration.lang]]
    });
  } else {
    // 显示语言不正确处理
    if (loginbutton.innerHTML !== constant.text.$.timeoutinfo)
      window.location.replace(setParamter(
        constant.url.$ + constant.url.lang,
        [['lang', configuration.lang],
        ['returl', constant.url.login + '#timeout']]
      ));
    else errHandle();
  }
};
// 登录页面若有#timeout则显示超时的错误提示
var loginTimeoutText = function () {
  if (url.$page.indexOf(constant.url.login) !== 0) return;
  if (window.location.hash !== '#timeout') return;
  var p = findsth(document, 'td', null, [['class', 'datacell']])
    .getElementsByTagName('td')[0];
  p.className = 'redbig'; p.innerHTML = constant.text.$.timeoutfail;
};

// 在各链接保存页面地址以备超时回退使用
// 超时页面、登录页面等不记录
var addALinkSave = function () {
  if (url.$page.indexOf(constant.url.timeout) === 0) return;
  if (url.$page.indexOf(constant.url.login) === 0) return;
  if (url.$page.indexOf(constant.url.logincheck) === 0) return;
  sessionStorage.setItem('lasturl', url.$);
  var l = document.getElementsByTagName('a'), i;
  for (i = 0; i < l.length; i++)
   if (!l[i].onclick &&
     l[i].getAttribute('onclick') === null &&
     l[i].getAttribute('href') !== null)
   l[i].onclick = function () {
    sessionStorage.setItem('lasturl', this.href);
  }
};

// 在页面标记添加按钮的位置，如果没有则新建必需的元素
var markButtonArea = function () {
  var tr = findparent(findsth(
    document, 'a', null, [['class', 'navigator']]), ['tr']);
  if (!tr) return;
  var td = findchilds(tr, 'td');
  if (td.length === 1) {
    td = [newElement(constant.dom.buttonarea), td[0]];
    tr.insertBefore(td[0], td[1]);
  }
  // 无论有没有按钮都添加空白，方便代码
  // 用CSS隐藏不需要显示的按钮
  var ba = td[0].getElementsByTagName('tr');
  ba[0].id = 'buttonarea';
  var s;
  if (td.length < 3) {
    s = newElement(constant.dom.lastbuttonspace);
    tr.insertBefore(s, td[1]);
  } else s = td[1];
  s.id = 'buttonnavspace';
  tr.id = 'buttonandnav';
  if (ba.length === 1) tr.className = 'nobutton';
  addCssStyles(
    '#buttonandnav.nobutton #buttonnavspace { display: none; }');
};
// 隐藏所有按钮
var hideButtons = function (l) { 
  $i('buttonarea').style.display =
    $i('buttonnavspace').style.display = 'none';
};
// 添加一个按钮
var newButton = function (id, href, text) {
  var bi = constant.dom.button
    .replace('[ID]', id).replace('[HREF]', href).replace('[TEXT]', text);
  // 网站中黄色和白色的按钮的差别在于URI中的_y_和_
  if (!configuration.button.yellow) bi = bi.replace(/_y_/g, '_');
  return b = newElement(bi);
};
// 在左上位置添加一个按钮
var addButton = function (id, href, text) {
  var r = $i('buttonarea'); if (!r) return;
  var b = newButton(id, href, text);
  var d = r.getElementsByTagName('td');
  if (d.length === 0) { r.insertBefore(b, r.firstChild); }
  else {
    r.insertBefore(newElement(constant.dom.buttonspace), r.firstChild);
    r.insertBefore(b, r.firstChild);
  }
  $i('buttonandnav').className = '';
};

// 在回答状况(answer)页面添加按钮
var answerButtons = function () {
  if (url.$page.indexOf(constant.url.answer) !== 0) return;
  // 如果为教师用户则不添加
  var teacher = findsth(findh2(), 'a', null,
    [['href', RegExp(constant.url.studentlist)]]);
  // 检查是否有addanswer按钮，是否有adddiscuss按钮
  var bl = $i('buttonarea'), bla = bl.getElementsByTagName('a');
  var aa = null, ad = null, i;
  for (i = 0; i < bla.length; i++) {
    if (bla[i].href.indexOf(constant.url.addanswer) !== -1) aa = bla[i];
    if (bla[i].href.indexOf(constant.url.adddiscuss) !== -1) ad = bla[i];
  }
  // 从上述按钮中获得homeworkid、answerid、courseid
  var homeworkid = url.homeworkid, answerid = null,
    courseid = url.courseid;
  if (aa) answerid = getParamter(aa.href, 'answerid');
  else if (ad) answerid = getParamter(ad.href, 'answerid');
  if (!teacher) if (!aa) { // 没有addanswer则为过期作业
    if (ad) { // 有adddiscuss则说明回答过
      // 添加删除回答按钮
      if (configuration.answer.del)
      addButton('delanswer', 'javascript:deleteAnswer(' + answerid + ');',
        constant.text.$.delanswer);
      // 添加修改回答按钮
      if (configuration.answer.add2)
      addButton('addanswer', setParamter(
        constant.url.$ + constant.url.addanswer,
        [['courseid', courseid], ['homeworkid', homeworkid],
        ['pageno', 1], ['answerid', answerid]]
      ), constant.text.$.addanswer2);
    } else {
      // 添加解答按钮
      if (configuration.answer.add)
      addButton('addanswer', setParamter(
        constant.url.$ + constant.url.addanswer,
        [['courseid', courseid], ['homeworkid', homeworkid], ['pageno', 1]]
      ), constant.text.$.addanswer);
    }
  }
};


// 屏蔽掉提交时对答案是否为空的检查
var addanswerSubmit = function () {
  if (url.$page.indexOf(constant.url.addanswer) !== 0) return;
  if (!configuration.answer.empty) return;
  // 网站中通过提交按钮的onclick事件
  // 先检查是否填写，再修改form1的属性值，最后提交表单
  // 这里绕过检查，所以要直接设定form1的属性值并删除其onclick事件
  var b = findsth(document, 'a', null,
    [['class', 'commandbutton'], ['href', /addAnswer/]]);
  var f = $n('form1')[0]; f.removeAttribute('onsubmit');
  f.action = constant.url.$ + constant.url.addanswer_step2;
  b.onclick = function () { f.submit(); }
  b.href = 'javascript:void(0);';
};

// 修改使用现有或新附件的选框加label
var addanswerLabels = function () {
  var o = $n('nowornew'), i;
  for (i = 0; i < o.length; i++) {
    var l = document.createElement('label');
    var p = o[i].parentNode;
    while (p.childNodes.length) l.appendChild(p.removeChild(p.firstChild));
    p.appendChild(l);
  }
};

// 在回答页面显示文件上传不成功的警告
var showFileUploadMsg = function (p, isSuccess) {
  if (isSuccess) return;
  if (p.className === '') (function () {
    // 对于显示供下载的链接的情况
    var d = document.createElement('span');
    d.className = 'redbig'; d.style.marginLeft = '1em';
    d.innerHTML = constant.text.$.downloaderr;
    p.parentNode.appendChild(d);
  }()); else (function () {
    // 对于显示供修改的查看按钮的情况
    var n = $n(findparent(p, ['table', 'tr']).getElementsByTagName('input')[0].name);
    p.parentNode.innerHTML = p.innerHTML;
    n[0].checked = false; n[0].disabled = true;
    n[1].checked = true;
    $n('filein')[0].disabled = false;
  }());
};

// 回答状况页面检查附件是否被成功提交
var checkFileUpload = function () {
  if (url.$page.indexOf(constant.url.answer) === -1 && 
    url.$page.indexOf(constant.url.addanswer) === -1) return;
  if (!configuration.answer.filec) return;
  var l = document.getElementsByTagName('a'), i;
  for (i = 0; i < l.length; i++) {
    if (l[i].href.indexOf(constant.url.answerfile) === -1) continue;
    (function (p) { xmlHttpRequest({ method: 'HEAD', url: p.href,
      onload: function (d) {
        showFileUploadMsg(p, Number(d.getResponseHeader ("Content-Length")) !== 0);
      },
      onerror: function (d) { showFileUploadMsg(p, false); }
    }); }(l[i]));
  }
};

// 显示作业日期的倒数计时
showDayCount = function () {
  if (url.$page.indexOf(constant.url.homeworklist) !== 0) return;
  if (!configuration.homeworklist.daycount) return;
  if (constant.now === null) {
    xmlHttpRequest({
      url: constant.url.$ + constant.url.profile,
      onload: showDayCount,
    }); return;
  }
  var d = findmp().getElementsByTagName('td');
  var n = constant.now, i, l;
  for (i = 0; i < d.length; i++) {
    if (!/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/.test(d[i].innerHTML)) continue;
    // 使用floor处理保证过期的作业一定显示为负数
    l = Math.floor((new Date(d[i].innerHTML) - n) / (1000 * 60 * 60 * 24));
    if (!isNaN(l)) d[i].innerHTML += '&nbsp;(' + l + ')';
  }
};

// 在我的课程页面显示课程课件及作业的链接
var courselistLinks = function () {
  if (url.$page.indexOf(constant.url.courselist) !== 0) return;
  if (!configuration.courselist.links) return;
  var tr = findchilds(findparent(findsth(document, 'td', null,
    [['class', 'tablesubheaderrow']]), ['tr']).parentNode, 'tr');
  // 中间的2~n-1行
  for (i = 2; i < tr.length - 1; i++) {
    var td = findchilds(tr[i], 'td');
    var ins = document.createElement('td');
    var sa = findchilds(td[0], 'a')[0];
    var cid = getParamter(sa.href, 'courseid');
    ins.className = td[0].className; ins.setAttribute('align', 'left');
    var al = [ // [是否显示，显示的文本，链接，是否加粗]
      [true, constant.text.$.announcement, constant.url.announcement,
        true],
      [true, constant.text.$.downloadlist, constant.url.materials_tp2,
        true],
      [true, constant.text.$.homework, constant.url.homeworklist, true],
      [true, constant.text.$.bbs, constant.url.bbs, false],
      [true, constant.text.$.submail, constant.url.submail, false],
      [true, constant.text.$.studentinquiry, constant.url.studentinquiry,
        false]
    ], ai, il;
    for (il = 0; il < al.length; il++) if (al[il][0]) {
      var a = document.createElement('a');
      a.className = 'mulinks' + (al[il][3]?' boldmulinks':'');
      a.innerHTML = al[il][1];
      a.href = constant.url.$ +
        setParamter(al[il][2], [['courseid', cid]]);
      ins.appendChild(a);
    }
    ins.setAttribute('nowrap', '');
    tr[i].insertBefore(ins, td[1]);
    td[0].innerHTML = constant.dom.coursename
      .replace('[N]', findchilds(sa, 'b')[0].innerHTML);
    td[0].setAttribute('align', 'right');
  }
  // 首行和末行
  {
    var l = [
      findchilds(tr[0], 'td')[0],
      findchilds(tr[tr.length - 1], 'td')[0]
    ];
    for (i = 0; i < l.length; i++) {
      var c = Number(l[i].getAttribute('colspan'));
      l[i].setAttribute('colspan', c + 1);
    }
  }
  // 标题
  {
    var td = findchilds(tr[1], 'td');
    var ins = document.createElement('td');
    ins.className = td[0].className;
    ins.innerHTML = constant.text.$.enter;
    ins.setAttribute('nowrap', '');
    tr[1].insertBefore(ins, td[1]);
    td[1].setAttribute('width', '80px');
    td[td.length - 1].setAttribute('width', '80px');
    if (configuration.general.shortencn)
      td[0].setAttribute('width', '160px')
    else td[0].setAttribute('width', '250px');
  }
  addCssStyles([
    '.mulinks:not(:first-child) { margin-left: 1em; }',
    '.boldmulinks { font-weight: bold; }'
  ].join(''));
};

// 对于没有设定课件资源的教师帐号查看参考资料页面做重定向
var noMaterialsLinkFix = function () {
  if (url.$page.indexOf(constant.url.coursewarenotready) !== 0) return;
  if (document.body.innerHTML !== constant.text.$.errmsg) return;
  window.location.replace(setParamter(
    constant.url.$ + constant.url.coursematerial,
    [['courseid', url.courseid]]
  ));
};

// 缩短课程名称
var courseNameShorten = function () {
  if (!configuration.general.shortencn) return;
  var l = document.getElementsByTagName('span'), i;
  for (i = 0; i < l.length; i++) if (l[i].className === 'coursename')
    l[i].innerHTML = l[i].innerHTML
      .replace(/\(.*\)/g, '').replace(/（.*）/g, '');
};

// 在有多页的课件资源页面添加显示全部的按钮
var downloadlistShowAllButton = function (doc) {
  if (typeof(doc) === 'undefined') doc = document;
  if (!configuration.downloadlist.showall) return;
  if (url.$page.indexOf(constant.url.downloadlist) !== 0) return;
  // 只有不止一页的情况下才有该按钮
  var p = findsth(doc, 'a', null, [['class', 'paging']]); if (!p) return;
  // pagesize表示该页最多显示多少，超过32767会导致服务器错误
  var u = setParamter(rmParamter(p.href, 'pageno'), [['pagesize', 32767]]);
  var b = findsth(doc, 'td', null, [['class', 'tablesubheaderrow']])
  b.innerHTML = newButton('', u, constant.text.$.showall).innerHTML;
};
// 强制Chrome浏览器下载下载按钮指向的资源而非打开
// <a>的download标签为Chrome私有属性，并非标准中的属性
// 故不被其他浏览器所支持
var downloadlistFouceDownload = function () {
  if (url.$page.indexOf(constant.url.downloadlist) !== 0) return;
  if (!('download' in document.createElement('a'))) return;
  if (!configuration.downloadlist.fouced) return;
  var l = document.getElementsByTagName('a'), i;
  for (i = 0; i < l.length; i++) if (l[i].className === 'actionbutton')
    if (l[i].target === '_blank')
    if (l[i].innerHTML === constant.text.$.download)
      l[i].setAttribute('download', '');
};

// 新建右上链接
var newLink = function (id, url, text) {
  var f; try { f = findtf().getElementsByTagName('tr')[0]; }
  catch (e) { return false; }
  f.insertBefore(newElement(constant.dom.tfspace), f.firstChild);
  f.insertBefore(newElement(constant.dom.tflink
    .replace('[URL]', url).replace('[TEXT]', text).replace('[ID]', id)
  ), f.firstChild);
  return true;
};

// 隐藏那些没用的东西
var objHidden = function () {
  // 添加显示隐藏内容的链接
  var counter = 0;
  var showHidden = function () {
    if (counter === 0) return;
    if (!newLink('showall', '#', constant.text.$.showall)) return;
    $i('showall').onclick = function () {
      // 参考隐藏时的CSS
      document.body.className = '';
      return false;
    }
    var d = $i('showall').parentNode;
    d.className = d.nextSibling.className = 'hiddeni';
  }
  var objsHidden = function (obj, plist, nlist) {
    if (!obj) return; var t, j
    // 隐藏他前面需要删除的节点
    for (t = obj, j = 0; t.previousSibling && j < plist.length;
     t = t.previousSibling) {
      if (t.previousSibling.tagName)
        t.previousSibling.className += ' hidden';
      if (t.previousibling.tagName &&
        t.previousSibling.tagName.toUpperCase() ===
          plist[j].toUpperCase()) j++;
    }
    // 隐藏他后面需要删除的节点
    for (t = obj, j = 0; t.nextSibling && j < nlist.length;
     t = t.nextSibling) {
      if (t.nextSibling.tagName) t.nextSibling.className += ' hidden';
      if (t.nextSibling.tagName &&
        t.nextSibling.tagName.toUpperCase() ===
          nlist[j].toUpperCase()) j++;
    }
    // 隐藏其自身
    obj.className += 'hidden';
    // 计数器
    counter++;
  }
  // 顶部
  var h1Hidden = function () {
    var l = [
      [constant.url.seminarlist, configuration.hidden.h1.seminarlist],
      [constant.url.schedule, configuration.hidden.h1.schedule]
    ], i;
    for (i = 0; i < l.length; i++) if (l[i][1])
      objsHidden(findparent(
        findsth(findh1(), 'a', null, [['href', RegExp(l[i][0])]]),
        ['td']
      ), [], []);
  }
  // 二级导航
  var h2Hidden = function () {
    var l = [
      [constant.url.principles, configuration.hidden.h2.principles],
      [constant.url.coursearrange, configuration.hidden.h2.coursearrange],
      [constant.url.viewcourseware,
        configuration.hidden.h2.viewcourseware],
      [constant.url.mysummary, configuration.hidden.h2.mysummary]
    ], i;
    for (i = 0; i < l.length; i++) if (l[i][1])
      objsHidden(findparent(findsth(findh2(), 'a', null,
          [['href', RegExp(l[i][0])], ['class', 'submenuoff']]),
        ['td', 'table', 'td']), [], ['td']);
    // 特殊处理FAQ的链接
    if (configuration.hidden.h2.faq) objsHidden(findparent(
      findsth(findh2(), 'a', constant.text.$.faq,
        [['class', 'submenuoff']]),
      ['td', 'table', 'td']), [], ['td']);
  }
  // 帮助链接
  var helpLinkHidden = function () {
    if (!configuration.hidden.helplink) return;
    objsHidden(findparent(findsth(findtf(), 'a', null,
        [['href', RegExp(constant.url.support)]]),
      ['td']), [], ['td']);
  }
  // 顶部图片
  var topimgHidden = function () {
    if (!configuration.hidden.topimg) return;
    var header = findparent(
      findsth(document, 'img', null,
        [['src', RegExp(constant.image.logo)]]),
      ['table', 'tr']);
    objsHidden(header, [], []);
  }
  // 如上函数列表
  var hidelist = [h1Hidden, h2Hidden, helpLinkHidden, topimgHidden], i;
  for (i = 0; i < hidelist.length; i++) try { hidelist[i](); }
  catch (e) { console.log(hidelist[i] + '\n' + e); }
  // 样式中只有body有hidden的class时才隐藏
  // body中有hidden的时候显示全部的链接要显示，反之要隐藏
  addCssStyles([
    'body.hidden .hidden, body:not(.hidden) .hiddeni { display: none; }'
  ].join(''));
  try { document.body.className += 'hidden'; } catch (e) {}
  showHidden();
};

// 添加自定页面的一级标题
var addH1Links = function () {
  if (!findh1()) return;
  if (findh1().getElementsByTagName('td').length < 2) return;
  var l = [
    // 课程公告
    ['h1a', setParamter(constant.url.announcement,
      [['range', 'thismonth']]),
      constant.text.$.courseannouncement,
      configuration.specpage.announcement],
    // 参考资料
    ['h1m', setParamter(constant.url.downloadlist, [['websiteid', -1]]),
      constant.text.$.downloadlist, configuration.specpage.materials],
    // 作业
    ['h1h', constant.url.homeworklist,
      constant.text.$.homework, configuration.specpage.homework],
  ], i;
  for (i = 0; i < l.length; i++) if (l[i][3])
   newH1(l[i][0], setParamter(
     constant.url.$ + l[i][1], [['courseid', -1]]
   ), l[i][2]);
};
// 在特殊页面隐藏二级导航栏
var specPageHideH2 = function () {
  if (Number(url.courseid) !== -1) return;
  hideH2();
};
// 在特殊页面重设一级标题的高亮
var markH1 = function () {
  if (Number(url.courseid) !== -1) return;
  mvHighlightH1(url.$page);
};

// 获取课程列表
var getCourseList = function(precall, callback) {
  var getCourse = function(responseDetails) {
    var h, i, j, ch;
    var courseList = [];
    // 获取结果
    h = document.createElement('div');
    h.innerHTML = responseDetails.responseText;
    h = findsth(h, 'table', null, [['class', 'mainpart']]);
    l = h.getElementsByTagName('a');
    for (i = 0; i < l.length; i++)
     if (l[i].className === 'list' && 
      l[i].href.indexOf(constant.url.announcement) !== -1)
      courseList[courseList.length] = [
       getParamter(l[i].href, 'courseid'),
       l[i].getElementsByTagName('b')[0].innerHTML,
       findchilds(l[i], 'b')[0].innerHTML
      ];
    // 如果只有一门课则直接跳转过去
    if (courseList.length === 1) {
      document.location.replace(
        setParamter(url.$, [['courseid', courseList[0][0] ]]));
    } else callback(courseList);
  }
  precall();
  xmlHttpRequest({
    url: constant.url.$ + constant.url.courselist,
    onload: getCourse,
    // pagesize保证总能显示全部的课程
    paramters: [['pagesize', 32767]] ///*TEST*/, ['termid', 22]/*TEST*/]
  });
};

// 在特殊页面添加课程列表
var specShowCourselist = function (l, u) {
  var mp = findmp();
  var s = constant.dom.ccourseth
    .replace('[COURSENAME]', constant.text.$.coursename), i;
  for (i = 0; i < l.length; i++)
    s += constant.dom[(i & 1)? 'ccoursetdo' : 'ccoursetde']
      .replace('[HREF]', u(l[i][0]))
      .replace('[ID]', 'ccourse' + l[i][0])
      .replace('[TEXT]', l[i][1]);
  // 如果没有课程显示对应消息
  if (l.length === 0) s += constant.dom.ccourseempty
     .replace('[NODATA]', constant.text.$.nocourse);
  mp.innerHTML = s += constant.dom.ccoursetf;
};

// 在特殊页面添加各部分的模块
var specAddSpace = function (l) {
  var t = findparent(
    findsth(document, 'td', null, [['class', 'pagetitle']]),
    ['tr', 'table', 'form']
  );
  for (i = 0; i < l.length; i++) {
    var p = document.createElement('table');
    p.id = 'cf' + l[i][0];
    t.appendChild(p);
  }
};

// 在特殊页面显示进度条
// <progress>是HTML5标准中的标签
// 目前各浏览器(Firefox 9, Chrome 16, Opera 11.61)
// 支持该标签，但只有火狐支持未知进度的进度条
var showProcessBar = function () {
  var m = findmp();
  m.innerHTML = constant.dom.pageinfo
    .replace('[INFO]', constant.dom.loading
      .replace('[S]', 1)
    );
}
var processBarInit = function (l) {
  var m = findmp();
  if (l.length === 0) // 没有课程
    m.innerHTML = constant.dom.pageinfo
      .replace('[INFO]', constant.text.$.nocourse);
  else { // 有课程的页面显示进度条
    m.innerHTML = constant.dom.pageinfo
      .replace('[INFO]', constant.dom.loading
        .replace('[S]', l.length)
      );
    processBarFlush(0);
  }
};
var processBarFlush = function (n) { $i('loading').value = n; };

// 访问每个课程的页面
var forEachCourse = function (l, u, callback, final) {
  var i, o = l.length;
  processBarInit(l);
  for (i = 0; i < o; i++) (function (u, n, r) {
    xmlHttpRequest({ url: u,
      onload: function (d) {
        processBarFlush(l.length - o + 1);
        if (typeof(callback) === 'function') {
          var c = document.createElement('div');
          c.innerHTML = d.responseText;
          callback(n, r, c);
        }
        if (!--o) if (typeof(final) === 'function') final();
      },
    });
  })(u(l[i][0]), l[i][0], l[i][2])
};

// 拼合页面
var margePageHandle =
 function (l, url, datatp, pagerun, sortfunc, callback, splitbar) {
  var elementList = [], lc, headerrow = null;
  forEachCourse(l,
    function (i)
    { return setParamter(constant.url.$ + url, [['courseid', i]]); },
    function (d, o, c) {
      if (typeof(pagerun) === 'function') pagerun(c);
      // 将内容存入elementList内
      var i, p, mp, h;
      try {
        mp = findsth(c, 'table', null, [['class', 'mainpart']]);
        tr = findchilds(findparent(
          findsth(mp, 'td', null, [['class', /tableheaderrow/i]]), 'tr'
        ).parentNode, 'tr');
      } catch (e) { return; }
      for (i = 0; i < tr.length; i++) {
        var td = findchilds(tr[i], 'td');
        if (headerrow === null &&
          /tableheaderrow/i.test(td[0].className) &&
          td.length > 1) {
          headerrow = tr[i]; lc = td.length;
        }
        if (td[0].className !== 'datacell' &&
          td[0].className !== 'actioncell') continue;
        // 保存该行前在前面加上课程名称
        var c = td[0].cloneNode(true);
        c.innerHTML = constant.dom.coursename.replace('[N]', o);
        c.setAttribute('align', 'right'); c.setAttribute('nowrap', '');
        tr[i].insertBefore(c, tr[i].firstChild);
        elementList[elementList.length] = [d, tr[i]];
      }
    },
    function () {
      // 显示表格
      var m = findmp();
      if (elementList.length === 0) {
        // 没有
        m.innerHTML = constant.dom.pageinfo
          .replace('[INFO]', constant.text.$.nodata)
          .replace('[TP]', datatp);
      } else {
        // 初始化表格
        var tb = findsth(m, 'td', null, [['class', 'tableHeaderRow']])
         .parentNode.parentNode, tr = findchilds(tb, 'tr'),
         hd = findchilds(headerrow, 'td'), hn = hd[0].cloneNode(true);
        hn.innerHTML = constant.text.$.coursename;
        if (configuration.general.shortencn)
          hn.setAttribute('width', '160px');
        else hn.setAttribute('width', '250px');
        hn.setAttribute('nowrap', '');
        headerrow.insertBefore(hn, hd[0]);
        tb.insertBefore(headerrow, tr[0]);
        findchilds(tr[2], 'td')[0].setAttribute('colspan', lc + 1);
        tb.removeChild(tr[0]); tb.removeChild(tr[1]);
        // 排序
        elementList.sort(sortfunc);
        // 显示列表
        var r = m.getElementsByTagName('tr')[1], p = r.parentNode, i, j;
        for (i = 0; i < elementList.length; i++) {
          // 显示该行
          var l = elementList[i][1], d = findchilds(l, 'td');
          // 根据奇数行和偶数行的不同使用不同的样式
          // 网站中奇数行总是datacell，偶数行总是actioncell
          // 这里说的奇偶从1开始计数，和j不同
          for (j = 0; j < d.length; j++)
            d[j].className = i&1?'actioncell':'datacell';
          p.insertBefore(l, r);
          if (typeof(splitbar) === 'function')
            if (splitbar(elementList[i],
              ((i + 1 < elementList.length)?elementList[i + 1]:null)
            )) p.insertBefore(newElement(
              constant.dom.splitbar.replace('[TDCOUNT]', lc + 1)
            ), r);
        }
        // 其他函数
        if (typeof(callback) === 'function') callback();
      } // 显示
    }
  );
};

// 将结果放置在对应位置
var specPagePlaceTable = function (l) {
  var i = l[0], r = l[1], t = l[2];
  var d = 'cf' + i, o = $i(d), p = o.parentNode;
  var pt = findsth(t, 'td', null, [['class', 'pagetitle']]);
  try {
    try {
      if (findchilds(pt, 'font')[0].innerHTML !== r)
        pt.firstChild.nodeValue = r;
      else pt.innerHTML = r;
    } catch (e) { pt.innerHTML = r; }
    p.insertBefore(t, o); p.removeChild(o);
    t.setAttribute('id', d);
  } catch (e) {
    findparent($i('ccourse' + i), 'tr').style.display = 'none';
  }
};

// 其他页面
var defaultSpecHandle = function (l) {
  specShowCourselist(l, function (i) {
    return setParamter(url.$, [['courseid', i]]);
  });
}
var defaultPreHandle = function () {};

// 课程公告页面
var announcementSpecHandle = function (l) {
  var announcementlist = [];
  forEachCourse(l,
    function (i) {
      return setParamter(
        constant.url.$ + constant.url.announcement, [['courseid', i]]);
    },
    function (i, o, c) {
      announcementOneLine(c);
      var p = findsth(c, 'td', null,
        [['class', 'tablesubheaderrow'], ['align', 'right']]);
      p.innerHTML = newButton('', setParamter(
          constant.url.$ + constant.url.announcement,
          [['courseid', i], ['range', 'all']]
        ), constant.text.$.showall
      ).innerHTML;
      p.setAttribute('align', 'left');
      var t = findparent(findsth(c, 'td', null,
        [['class', 'pagetitle']]), ['tr', 'table']);
      announcementlist[announcementlist.length] = [i, o, t];
      announcementHidden();
    },
    function () {
      hideButtons();
      specShowCourselist(announcementlist,
        function (i) { return '#cf' + i; });
      specAddSpace(l);
      var i; for (i = 0; i < announcementlist.length; i++)
        specPagePlaceTable(announcementlist[i]);
      announcementHidden();
    }
  );
};

// 参考资料页面
var downloadlistPreHandle = hideButtons;
var downloadlistSpecHandle = function (l) {
  var downloadlist = [];
  forEachCourse(l,
    function (i) {
      return setParamter(
        constant.url.$ + constant.url.materials_tp2, [['courseid', i]]);
    },
    function (i, o, c) {
      var t = findparent(findsth(c, 'td', null,
        [['class', 'pagetitle']]), ['tr', 'table']);
      if (!t) return;
      downloadlistShowAllButton(c);
      downloadlist[downloadlist.length] = [i, o, t];
    },
    function () {
      specShowCourselist(downloadlist,
        function (i) { return '#cf' + i; });
      specAddSpace(downloadlist);
      var i; for (i = 0; i < downloadlist.length; i++)
        specPagePlaceTable(downloadlist[i]);
      downloadlistFouceDownload();
    }
  );
};

// 作业页面
var homeworklistSpecHandle = function (l) {
  // 获取作业截止日期
  var deadline = function (l)
  { return new Date(findchilds(l, 'td')[3].innerHTML); }
  var homeworkid = function (l) {
    return Number(getParamter(
      l.getElementsByTagName('a')[0], 'homeworkid'));
  }
  var n = constant.now;

  margePageHandle(l, 
    constant.url.homeworklist,
    constant.text.$.homework,
    null,
    function (at, bt) {
      // 按照截止日期排序：未过期的在前
      // 未过期中离截止日期越近越靠前；
      // 已过期中离截止日期越近越靠前
      var dla = deadline(at[1]), dlb = deadline(bt[1]);
      if (dla > n && dlb > n && dla !== dlb) return dla - dlb;
      if (dla !== dlb) return dlb - dla;
      else return homeworkid(bt[1]) - homeworkid(at[1]);
    },
    function () {
      showDayCount();
      courseNameShorten();
      addALinkSave();
    },
    function (a, b) {
      if (b === null) return false;
      var date = deadline(b[1]), last = deadline(a[1]);
      return date - n < 0 && last - n >= 0;
    }
  );
};

// 屏蔽添加参考资料的自定义页面
var adddownloadSpecHandle = function () {
  document.body.innerHTML = '';
  history.back();
};

// 处理自己定义的那些页面
var specPageHandle = function () {
  if (Number(url.courseid) !== -1) return;
  // 隐藏原页面中的内容，避免误操作
  var mp = findmp(); if (!mp) return; mp.innerHTML = '';
  // 对不同页面采用不同的函数
  var handles = [
    [constant.url.homeworklist, homeworklistSpecHandle, null],
    [constant.url.postinga, defaultSpecHandle, defaultPreHandle],
    [constant.url.announcement, announcementSpecHandle, null],
    [constant.url.downloadlist, downloadlistSpecHandle,
      downloadlistPreHandle],
    [constant.url.adddownload, adddownloadSpecHandle, adddownloadSpecHandle],
  ], h = defaultSpecHandle, ph = defaultPreHandle, ih;
  for (ih = 0; ih < handles.length; ih++)
   if (url.$page.indexOf(handles[ih][0]) === 0){
    h = handles[ih][1];
    if (handles[ih][2]) ph = handles[ih][2];
    break;
  }
  showProcessBar();
  // 获取课程列表
  getCourseList(ph, h);
};

// 脚本设置链接
var configurationPageLink = function () {
  if (url.$page.indexOf(constant.url.forgotpassword) === 0 &&
    window.location.hash === '#config') return;
  if (!newLink('sconfig', constant.url.$ + constant.url.forgotpassword + '#config',
    constant.text.$.sconfig)) return;
  $i('sconfig').target = '_blank';
};
// 脚本设置页面
var configurationPageHandle = function () {
  if (url.$page.indexOf(constant.url.forgotpassword) !== 0) return;
  if (window.location.hash !== '#config') return;
  findpt().innerHTML = constant.text.$.sconfig;
  findmp().innerHTML = constant.dom.sconfigf;
  findparent(findsth(document, 'a', null,
    [['class', 'commandbutton'], ['href', constant.url.login]]),
    ['table', 'table']).style.display = 'none';
  var o = findparent(findsth(findmp(), 'td', null,
    [['class', 'tablesubheaderrow']]), 'tr'), p = o.parentNode;
  var i, j = 0;
  for (i = 0; i < lsconfig.length; i++)
    if (!lsconfig[i] || !lsconfig[i].length) {
      p.insertBefore(newElement(
        constant.dom.splitbar.replace('[TDCOUNT]', 1)), o);
    } else if (lsconfig[i].length > 2) {
    if (lsconfig[i][1] === Boolean) {
      if (lsconfig[i].length > 3 && !lsconfig[i][3]) continue;
      (function (s) {
        var v = configVal(configuration, s[0]);
        var l = newElement(constant.dom[(++j)&1?'sconfigo':'sconfige']
          .replace('[C]', constant.dom.checkbox
            .replace('[C]', v?'checked="checked"':'')
            .replace('[T]', constant.text.$[s[2]])
          )
        );
        l.getElementsByTagName('input')[0].onclick = function () {
          configVal(configuration, s[0], this.checked);
          writeConfig(s[0], this.checked);
        }
        p.insertBefore(l, o);
      })(lsconfig[i]);
    } else if (lsconfig[i][1] === Etlinks) {
      var l = newElement(constant.dom[(++j)&1?'sconfigo':'sconfige']
          .replace('[C]', constant.dom.etlinks)
          .replace('[LINKST]', constant.text.$._etl)
        );
      p.insertBefore(l, o);
    } else
      console.log('unsupport configuration type ' + typeof(lsconfig[i][1]));
  }
};

// 邮件列表页面点击名字时对复选框同步操作
var submailAddLabel = function () {
  if (url.$page.indexOf(constant.url.submail) !== 0) return;
  var l = document.getElementsByTagName('input'), i;
  for (i = 0; i < l.length; i++) if (l[i].type === 'checkbox') {
    var p = l[i].parentNode;
    p.innerHTML = constant.dom.label.replace('[T]', p.innerHTML);
  }
}

// 在顶部显示额外的链接
// 定义保存读取用的类型
function Etlinks(s, n) {
  if (!n) return new Etlinks(s, true);
  if (typeof(s) === 'string') {
    if (s === '') { this.links = []; return; }
    var l = s.split(' '), i, a = [];
    for (i = 0; i < l.length; i += 2) {
      a[a.length] = [unescape(l[i]), l[i + 1]];
    }
    this.links = a;
  } else {
    this.links = s;
  }
};
Etlinks.prototype.toString = function () {
  var i, l = [];
  for (i = 0; i < this.links.length; i++)
    l[i] = this.links[i].join(' ');
  return l.join(' ');
};
// 在页面顶部显示
var showExtraTopLinks = function () {
  if (url.$page.indexOf(constant.url.forgotpassword) === 0 &&
    window.location.hash === '#config') return;
  var i, l = configuration.h1elinks.links;
  for (i = 0; i < l.length; i++) newH1('', l[i][1], l[i][0]);
};
// 在配置页面添加相关配置
var showExtraTopLinksConfig = function () {
  if (url.$page.indexOf(constant.url.forgotpassword) !== 0) return;
  if (window.location.hash !== '#config') return;
  var p = $i('etlinks');
  // 添加一行
  var newConfig = function (text, url) {
    var e = newElement(constant.dom.etlinkl
      .replace('[LTEXT]', constant.text.$._ltext)
      .replace('[LURL]', constant.text.$._lurl)
      .replace('[TEXTV]', text || '')
      .replace('[URLV]', url || '')
    );
    var input = e.getElementsByTagName('input');
    for (i = 0; i < input.length; i++) {
      input[i].onchange = input[i].onkeyup = saveExtraTopLinksConfig;
      input[i].onblur = cleanupExtraTopLinksConfig;
    }
    p.appendChild(e);
  }
  // 保存数据
  var saveExtraTopLinksConfig = function () {
    var input = p.getElementsByTagName('input'), v = [], i;
    for (i = 0; i < input.length; i += 2)
      if (input[i].value && input[i + 1].value)
      v[v.length] = [escape(input[i].value), input[i + 1].value.replace(' ', '%20')];
    writeConfig('h1elinks', Etlinks(v));
  }
  // 根据需要删除或添加行
  var cleanupExtraTopLinksConfig = function () {
    var input = p.getElementsByTagName('input'), i;
    for (i = 0; i < input.length; i += 2)
     if (!input[i].value && !input[i + 1].value && i + 2 != input.length) {
      var n = findparent(input[i], 'li');
      delete n.parentNode.removeChild(n);
    }
    if (input[input.length - 2].value || input[input.length - 1].value) {
      newConfig();
    }
  }
  // 刷新显示
  var initExtraTopLinksConfig = function () {
    var i, l = configuration.h1elinks.links;
    p.innerHTML = '';
    for (i = 0; i < l.length; i++) newConfig(l[i][0], l[i][1]);
    newConfig();
  }
  initExtraTopLinksConfig();
};

// 函数的列表
var funclist = [
  // 基本
  loadConfig, varInit,
  langSelect, langSave,
  markButtonArea, 
  // 登录
  loginFormClear, loginFormButton, loginDengLu, labelSavepassword,
  loginSaveInfo, autoLoginFill, autoLogin,
  loginInfoClearWrong, loginInfoClearLogout,
  loginFailRelocated, loginFailText,
  timeoutInfoHidden, timeoutAutoLogin, loginTimeoutText,
  // 作业页面和完成状况页面
  answerButtons, addanswerSubmit, addanswerLabels, checkFileUpload,
  // 作业列表页面
  showDayCount,
  // 课程列表
  courselistLinks, noMaterialsLinkFix, courseNameShorten,
  // 参考资料
  downloadlistShowAllButton, downloadlistFouceDownload,
  // 不常用内容隐藏
  objHidden,
  // 自定特殊页面
  addH1Links, specPageHideH2, markH1, specPageHandle,
  // 公告
  announcementHidden, announcementShowAll, announcementOneLine,
  // 邮件列表
  submailAddLabel,
  // 配置页面
  configurationPageLink, configurationPageHandle,
  // 顶部额外链接
  showExtraTopLinks, showExtraTopLinksConfig,
  // 页面记录
  addALinkSave,
], funcs;

// 执行如上函数
for (funcs = 0; funcs < funclist.length; funcs++)
  try { funclist[funcs](); }
  catch (e) { console.log(funclist[funcs] + '\n' + e); }


