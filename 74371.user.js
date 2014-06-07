// ==UserScript==
// @name           HomeTheaterForum - Breadcrumb Tweak
// @namespace      http://userscripts.org/users/wkharmon
// @description    This adds breadcrumbs above the reply box on hometheaterforum.com
// @include        http://www.hometheaterforum.com/forum/thread/*
// ==/UserScript==

if (document.getElementById('quick-reply-editor')) {
   var breadcrumbTweak = function() {
      var breadcrumbs = document.getElementById('bc');
      var newBC = breadcrumbs.cloneNode(true);
      var pageFooter = document.getElementsByClassName('thread-footer')[0];
      newBC.id = '';
      newBC.style.color = '#797774';
      newBC.style.fontSize = '11px';
      pageFooter.appendChild(newBC);
   }
   breadcrumbTweak();
}