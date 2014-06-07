// ==UserScript==
// @name           Clean_UI_YouTube
// @namespace      *
// @include        https://www.youtube.com/watch*
// @run-at			document-end
// @grant			none
// @require			http://code.jquery.com/jquery-1.8.3.min.js
// @version			1
// ==/UserScript==

//Remove Header
var header = document.querySelector('#masthead-positioner');
header.style.display = 'none';

//Remove SideBar
var sideBar = document.querySelector('#watch7-sidebar-contents');
sideBar.style.display = 'none';

//Remove Discussion
var discussion = document.querySelector('#watch-discussion');
discussion.style.display = 'none';

//Remove Footer
var footer = document.querySelector('#footer');
footer.style.display = 'none';

//Move Page Up
var page = document.querySelector('#page-container');
page.style.marginTop = '-50px';

//Remove default annotations
var annotationBtn = document.querySelector('.ytp-segmented-control-deselected');
annotationBtn.click();