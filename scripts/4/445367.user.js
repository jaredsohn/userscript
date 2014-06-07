// ==UserScript==
// @id          block popup
// @name        block popup
// @namespace   vnsharing.net
// @description script chặn popup dành riêng cho forum VNS, CTD và CAV.
// @include     /http://[a-z.]*vnsharing.net/*/
// @icon        http://vnsharing.net/forum/images/giaodien2/misc/favicon.ico
// @author      Kaldorei http://vnsharing.net/forum/member.php?u=366921
// @homepageURL http://vnsharing.net/forum/forumdisplay.php?f=978
// @supportURL  http://vnsharing.net/forum/member.php?u=366921
// @version     1
// @run-at      document-start
// @priority    1
// ==/UserScript==
document.addEventListener('DOMContentLoaded', function () {
    if (unsafeWindow.jQuery)
    {
        var $ = unsafeWindow.jQuery;
        $('body') .unbind('click');
    }
});
GM_addStyle('.float-ck{display:none}');
document.cookie = 'index_pop=1;expires=01 April 2050 7:00:00 AM;path=/';
document.cookie = 'btpop1=btpop1 Popunder;expires=01 April 2050 7:00:00 AM;path=/';
document.cookie = 'btpop2=btpop2 Popunder;expires=01 April 2050 7:00:00 AM;path=/';
