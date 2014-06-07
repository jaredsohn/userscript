// theRichCash Ad Blocker
// version 0.1
// 2005-05-06
// Copyright (c) 2008, Josh Margolis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          therichcashFrameBlock
// @description   therichcash Frame Blocker
// @include       *therichcash.com/view.php?ad=*
// ==/UserScript==
var x=document.getElementsByTagName("iframe");
x[0].src="about:blank"; x[0].scrolling="no"; x[0].height = "1";