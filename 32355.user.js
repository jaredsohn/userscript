// earn.nu Ad Blocker
// version 0.1
// 2005-05-06
// Copyright (c) 2008, xZel
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          earn.nu Frame Block
// @description   earn.nu Frame Blocker
// @include       *earn.nu/view.php?ad=*
// ==/UserScript==
var x=document.getElementsByTagName("iframe");
x[1].src="about:blank"; x[1].scrolling="no"; x[1].height = "1";