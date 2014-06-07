// ==UserScript==
// @name       new Better WebQQ
// @version    1.3
// @description  使得WebQQ更方便使用更清爽: 自动打开登录窗口, 自动设置桌面提示通知和使用SSL, 移除侧边栏, 移除浮动条, 移除添加按钮
// @description  此版向原作代码中添加了我（Oaker）针对WebQQ自定的CSS样式，并整合“Web QQ Qun Search Bar”，在聊天窗口右侧添加群成员搜索框
// @description  注意原作者（s2mairne）新版为1.4，已去除“自动打开登陆窗口”，链接：http://userscripts.org/scripts/show/140232
// @include      http://web.qq.com/webqq.html
// @include      http://web2.qq.com/webqq.html
// ==/UserScript==
function removeAllIDontWant(){
    var s = document.createElement('style');
    s.id = 'BetterWebQQStyle';
    s.innerHTML = '.dock_middle{opacity:.2!important}.indicator_wrapper{display:none!important}.EQQ_BuddyList_Nick,.EQQ_BuddyList_Sign,.EQQ_GroupList_Bulletin{padding-top:10px!important}img.EQQ_BuddyList_Avatar{padding:0!important}#EQQ_LoginSuccess{font-size:16px!important}.eqq_window .window_bg_container{border:none!important;background-image:none!important}.eqq_window .window_bg_container,.EQQ_tab,.EQQ_ListBottom{background-color:#d4d4d4!important}.EQQ_tab .current{background:#f5f5f5!important}.EQQ_buddyListPanel,.EQQ_groupTab,.EQQ_groupListOuter,.EQQ_recentListPanel{background-color:#f5f5f5!important}.EQQ_tab{height:28px!important}.EQQ_List_BigHead .EQQ_BuddyList_Buddy,.EQQ_List_BigHead .EQQ_GroupList_Group{padding:0!important;height:32px!important}.EQQ_BuddyList_Sign,.chatBox_announcementArea,.EQQ_BuddyList_Sign,.EQQ_GroupList_Bulletin,.chatLogTips{display:none!important}.EQQ_listClassBody,.EQQ_BuddyList_Buddy,.EQQ_GroupList_Group{border-bottom:1px solid #cecece!important;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.08)!important}.EQQ_List_BigHead .EQQ_BuddyList_AvatarContainer,.EQQ_List_BigHead .EQQ_GroupList_AvatarContainer{height:32px!important;width:32px!important}.EQQ_tabBuddyList_icon,.EQQ_tabGroupList_icon,.EQQ_tabRecentList_icon{background:none!important}.chatBox_groupMember_searchBar,.chatBox_groupMember_mainArea{background:#f0f0f0!important}.chatBox_mainArea{background-color:#f5f5f5!important}.chatBox_toolBar,.chatBox_controlPanel,.chatBox_toolBar_top,.chatBox_sideBar2{background-color:#d4d4d4!important}.chatLogMain{top:26px!important}'; 
    document.querySelector('head').appendChild(s);
}
function setMySetting(){
    unsafeWindow.alloy.config.setPortalConfig('notifySetting', 15);
    unsafeWindow.alloy.config.setHttpsSetting(1);
}
function showLogin(){
    eqqId = unsafeWindow.alloy.config.__eqqid;
    while (true){
        if (unsafeWindow.alloy.portal.isPortalReady()){
            break;
        }
    }
    unsafeWindow.alloy.portal.setLoginLevel(1);
    unsafeWindow.alloy.portal.runApp(eqqId);
}
function waitForReady(){
    if (unsafeWindow.alloy.portal.isPortalReady()){
        showLogin();
        setMySetting();
    }
    else{
        setTimeout(waitForReady, 1000);
    }
}
waitForReady();
removeAllIDontWant();
 
//为群添加搜索框，原脚本地址 http://userscripts.org/scripts/source/140941.user.js
 
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