// ==UserScript==
// @name           XiaoNei Quick Links on Namecard
// @description    人人网( renren.com )在鼠标滑过姓名时的提示框中增加到状态、相册和日志的快捷链接。
// @namespace      -
// @include        http://www.renren.com/getoutnc
// @match          http://www.renren.com/getoutnc
// @version        1.1
// @copyright      BSD License
// @grant          none
// ==/UserScript==

(function () {
  var namecard, content, pagelink, id, links, reqfriend;
  try {
    namecard = document.getElementById('namecard');
    content = namecard.getElementsByClassName('nc-content')[0];
    pagelink = content.getElementsByTagName('a')[0];
    id = pagelink.href.replace(/^.*[^0-9]([0-9]{7,10})([^0-9].*)?$/, '$1');
    links = document.getElementById('namecardlinks');
    reqfriend = document.getElementsByClassName('nc-btn')[0].getAttribute('onclick')
       .indexOf('showRequestFriendDialog') !== -1;
  } catch (e) { }
  if (namecard && content && pagelink && !links) try {
    pagelink.title = pagelink.innerHTML; pagelink.innerHTML = pagelink.innerHTML.replace(/(...)...*/, '$1…');
    links = document.createElement('div');
    links.innerHTML = [
    '<nav id="namecardlinks" style="display: block; float: right; padding: 0 4px; height: 16px; margin: 0 0 -16px 0;">',
      (function () { 
      if (reqfriend) return '';
      return [
        '<a target="_blank" title="相册" style="margin: 0 2px;" ',
          'href="http://photo.renren.com/getalbumlist.do?id=', id, '">',
          '<img class="icon" src="http://a.xnimg.cn/n/apps/photo/res/icon.gif" />',
        '</a>',
        '<a target="_blank" title="日志" style="margin: 0 2px;" ',
          'href="http://www.renren.com/#//blog/blog/0/friendsNews?friend=', id, '">',
          '<img class="icon" src="http://a.xnimg.cn/imgpro/v6/icon/blog-hl.png" />',
        '</a>',
      ].join(''); })(),
      '<a target="_blank" title="状态" style="margin: 0 2px;" ',
        'href="http://guide.renren.com/guide#//status/status?id=', id, '">',
        '<img class="icon" ',
          'src="http://app.xnimg.cn/application/20090922/02/55/L937572594167SJS.gif" />',
      '</a>',
    '</nav>'].join('');
    content.insertBefore(links.firstChild, content.firstChild);
  } catch (e) { }
  setTimeout(arguments.callee, 10);
})();
