// ==UserScript==
// @name           Meebo Account Scrolling
// @namespace      http://userscripts.org/users/121260
// @include        http://www.meebo.com/
// ==/UserScript==

checkLogin = function() {
  if (isOnline()) setTimeout(go, 3000);
  else setTimeout(checkLogin, 2000);
};

go = function() {
  unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_menuContainer.style.height = (document.body.clientHeight - 143)+"px";
  unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_menuContainer.style.overflow = "auto";
}

isOnline = function() {
  return 	unsafeWindow.gEventMgr &&
		unsafeWindow.gEventMgr.getState() == "im" &&
		unsafeWindow.gConsoleMgr && 
		unsafeWindow.gConsoleMgr.m_pageMain && 
		unsafeWindow.gConsoleMgr.getMainPage().m_mainConsoleContainer &&
		unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_presenceMenu &&
		unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_presenceMenu.m_menuBody.m_numItems > 3;
}

checkLogin();