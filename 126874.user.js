// ==UserScript==
// @name           Web QQ Qun Show NickName
// @namespace      http://userscripts.org/users/ts
// @include        *://web*.qq.com/*
// @version        1.0.6
// @description    QQ群显示用户昵称
// @grant          none
// ==/UserScript==

var userList = {};
var expSideBar = {};

// 模拟点击元素
var jsClick = function (obj) {
  try { obj.click(); }
  catch (e) {
    var event = document.createEvent("MouseEvents"); 
    event.initEvent('click', true, true); 
    obj.dispatchEvent(event); 
  }
}

// 更新用户列表
var updateList = function () { try {
  var sl = document.getElementsByClassName('chatBox_sideBar2'), i;
  for (i = 0; i < sl.length; i++)
    if (typeof(expSideBar[sl[i].id]) === 'undefined') { try {
      jsClick(sl[i]); expSideBar[sl[i].id] = true;
  } catch (e) {} }
  var al = document.getElementsByClassName('chatBox_groupMember_nameArea');
  for (i = 0; i < al.length; i++) { try {
    userList[al[i].parentNode.getAttribute('uin')] = al[i].title;
  } catch(e) {} }
} catch(e) {} };

// 显示昵称
var showNickName = function () { try {
  updateList();
  var l = document.getElementsByClassName('msgHead');
  for (i = 0; i < l.length; i++) { try {
    p = l[i].getElementsByClassName('clickable')[0];
    if (p.title === p.innerHTML && userList[p.getAttribute('uin')])
      p.innerHTML += ['&nbsp;(<span style="color: #333;">',
        userList[p.getAttribute('uin')],
      '</span>)&nbsp;'].join('');
  } catch (e) {} }
} catch(e) {} };

setInterval(showNickName, 10);
