// ==UserScript==
// @name           No Facebook Apps
// @namespace      Sam Dods
// @description    Removes applications from all profiles
// @include        http://*facebook.com*
// ==/UserScript==


divs = document.getElementsByTagName('div');

// Delete application divs
for(var i = 0; i < divs.length; i++)
  if(divs[i].id.indexOf('box_app_') === 0) divs[i].style.display = 'none';