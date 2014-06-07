// ==UserScript==
// @name        Raidcall: skip redirection
// @namespace   raidcall_skip_redirect
// @description Skips the (buggy) redirection page at raidcall.com
// @include     http*raidcall.com/direct.php?url=*
// @version     0.2
// @grant       none
// @run-at      document-start
// ==/UserScript==

location.href = decodeURIComponent(/url=(.*)/.exec(location.href)[1]);