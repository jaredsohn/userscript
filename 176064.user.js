// ==UserScript==
// @name           HF Username Color Changer
// @author		   Zark Muckerberg
// @description    Script to change your username color.
// @Credits	       Connected for his code that I modified
// @include        http://www.hackforums.net/showthread.php?tid=*
// @include        https://hackforums.net/showthread.php?tid=*
// @include		   http://www.hackforums.net/forumdisplay.php?fid=*
// @include		   https://hackforums.net/forumdisplay.php?fid=*
// @include        http://www.hackforums.net/member.php?action=profile&uid=*
// @include        https://hackforums.net/member.php?action=profile&uid=*
// @include        http://www.hackforums.net/usercp.php?action=options
// @include        https://hackforums.net/usercp.php?action=options
// @include        http://www.hackforums.net/index.php
// @include        https://hackforums.net/index.php
// @include        http://www.hackforums.net/forumdisplay.php?fid=*
// @include        https://hackforums.net/forumdisplay.php?fid=*
// ==/UserScript==

// ==VARIABLES==
var html = document.body.innerHTML;
// /==VARIABLES==
// change the #0066FF to your desired color, use hex color codes only.
html = html.replace( /YOUR USERNAME HERE/g, '<span style="color: #0066FF;"><b>YOUR USERNAME HERE</b></span>' );
document.body.innerHTML = html;