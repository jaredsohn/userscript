// ==UserScript==
// @id          font-fix
// @name        font-fix
// @namespace   vnsharing.net
// @description fix lỗi font2 biến mất/ko hiển thị...
// @include     http://vnsharing.net/forum/*
// @icon        http://vnsharing.net/forum/images/giaodien2/misc/favicon.ico
// @author      Kaldorei http://vnsharing.net/forum/member.php?u=366921
// @homepageURL http://vnsharing.net/forum/forumdisplay.php?f=978
// @supportURL  http://vnsharing.net/forum/member.php?u=366921
// @version     1
// @priority    1
// @run-at      document-end
// ==/UserScript==
GM_addStyle('body{-webkit-animation-duration:0.1s;-webkit-animation-name:fontfix;-webkit-animation-iteration-count:1;-webkit-animation-timing-function:linear;-webkit-animation-delay:0.1s;}@-webkit-keyframesfontfix{from{opacity:1;}to{opacity:1;}}')