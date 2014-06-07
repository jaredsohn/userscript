// ==UserScript==
// @name       Facebook Productivity Helper
// @namespace  http://meowmixer.org/
// @version    0.1.1
// @downloadURL  http://userscripts.org/scripts/source/188335.user.js
// @updateURL    http://userscripts.org/scripts/source/188335.meta.js
// @description  enter something useful
// @include	https://www.facebook.com/
// @copyright  2014+, You
// ==/UserScript==

MainContainer = document.getElementById("content");
MainContainerParent = MainContainer.parentNode;

MainContainerParent.removeChild(MainContainer);


SidebarElements = document.getElementsByClassName('fbChatSidebar');

for (var i = 0; i < SidebarElements.length; i++) {
    ParentElement = SidebarElements[i].parentNode;
    ParentElement.removeChild(SidebarElements[i]);
}