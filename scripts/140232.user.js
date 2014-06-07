// ==UserScript==
// @name       Better WebQQ
// @version    1.4
// @description  使得WebQQ更方便使用更清爽: 自动打开登录窗口, 自动设置桌面提示通知和使用SSL, 移除侧边栏, 移除浮动条, 移除添加按钮
// @include      http://web2.qq.com/webqq.html
// ==/UserScript==
function removeAllIDontWant(){
    var s = document.createElement('style');
    s.id = 'BetterWebQQStyle';
    s.innerHTML = '#topBar, #leftBar, #rightBar, .appButton.addQuickLinkButton, .bottomBarBgTask, #navbar { display: none !important; }';
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
    if (unsafeWindow.alloy.portal.isWithPtwebqqLogin()){
        removeAllIDontWant();
    }
    else{
        setTimeout(waitForReady, 1000);
    }
}
waitForReady();