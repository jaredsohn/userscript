// ==UserScript==
// @name           AVI image bbs fix
// @namespace      http://greasemonkey.t-productions.net/AVI image bbs fix
// @description    Fix bbs.avi.jp image bbs
// @include        http://bbs*.avi.jp/bbs_th.php*
// ==/UserScript==

/*

  Author: Toru

  Version: 1.0
    1.0 - First Version

*/

document.body.innerHTML = document.body.innerHTML.replace(/.jpg"/g, '-pc.jpg" width="160" height="160"');

document.body.innerHTML = document.body.innerHTML.replace(/<td class="contributionbody">\n                            <p class="pare">/g, '<td class="contributionbody" style="display: none;">\n                            <p class="pare">');
