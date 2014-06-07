// ==UserScript==
// @name       IRCTC Redirect To Login On Error
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  enter something useful
// @match      https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/logout.do*
// @include    https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/common/errorNewWindow.jsp
// @copyright  2012+, Shivesh96
// ==/UserScript==

window.location.assign("https://www.irctc.co.in");