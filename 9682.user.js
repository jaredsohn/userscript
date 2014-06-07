// ==UserScript==
// @name           Yahoo! Mail Beta Unsupported Error Page Skipper
// @namespace      
// @description    Skips the Yahoo! Mail Beta screen resolution error screen.
// @include        http://*.*.mail.yahoo.com/*/system_requirements?*=unsupported
// ==/UserScript==
//
//:::Impo Info (Important Information):::
// Author: Geek Linx
// Email: geeklinx@gmail.com
//
//:::Bugs:::
//BUG #1: (May be a bug, may not be.) This may only work in the U.S. so we're sorry any foreign people!! We obviously can't test it for other countries since we just live in the U.S.
//BUG #2: You will see the Yahoo! Mail Beta unsupported error page for a split second, but don't worry, it will quickly go away! There's no way to fix this small problem.
//Found a bug we didn't? Contact us with the above email address to let us know.


window.location.href="http://us.mg1.mail.yahoo.com/dc/launch?sysreq=ignore";