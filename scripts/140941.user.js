// ==UserScript==
// @name        Web QQ Qun Search Bar
// @namespace   -
// @description Web QQ群的右侧加个搜索框
// @include     *://web*.qq.com/*
// @match       *://web*.qq.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

var PLACEHOLDER = '搜索成员……';

var addStyle = function () {
  var s = document.createElement('style');
  s.innerHTML = [
    '.chatBox_groupMember_mainArea { top: 40px !important; }',
    '.chatBox_groupMember_searchBar ',
    '{ border: 0 none; height: 18px; padding: 1px 0; width: 100%; ',
    'background: #E8F6FB; }'
  ].join('');
  document.querySelector('head').appendChild(s);
};

var addSearchBar = function () {
  var rl = document.querySelectorAll('.chatBox_groupMember'), i;
  for (i = 0; i < rl.length; i++) 
   if (!rl[i].querySelector('.chatBox_groupMember_searchBar'))
   ((function (id) {
     console.log("!");
     var s = document.createElement('div');
     var l = document.querySelector('#chatBox_groupMember_' + id);
     s.innerHTML = [
       '<input class="chatBox_groupMember_searchBar" ',
         'id="chatBox_groupMember_searchBar_', id, '" ',
         'placeholder="', PLACEHOLDER, '"',
       '/>',
     ].join('');
     s = s.firstChild;
     var f = function () {
       var text = document
         .querySelector('#chatBox_groupMember_searchBar_' + id).value;
       var list = document
         .querySelectorAll('#chatBox_groupMember_mainArea_' + id +
           ' div[uin]');
       console.log(list.length);
       console.log(text);
       var name, nick;
       for (i = 0; i < list.length; i++) {
         name = list[i].querySelector('.chatBox_groupMember_nameArea').title;
         nick = list[i].querySelector('.chatBox_groupMember_nick').innerHTML;
         if (name.indexOf(text) !== -1 || nick.indexOf(text) !== -1)
           list[i].style.display = 'block';
         else list[i].style.display = 'none';
       }
     };
     s.addEventListener('change', f);
     s.addEventListener('keyup', f);
     s.addEventListener('keypress', f);
     s.addEventListener('keydown', f);
     l.insertBefore(s, l.querySelector('.chatBox_groupMember_mainArea'));
   })(Number(rl[i].id.replace(/[^0-9]*/g, ''))));
}

addStyle();
setInterval(function () {
  addSearchBar(); 
}, 10);

