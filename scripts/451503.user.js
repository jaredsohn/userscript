// ==UserScript==
// @name    IDCA - Modifikasi Username
// @namespace  Anon?M ID
// @description  Mempercantik username
// @grant             GM_setValue
// @grant             GM_getValue
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require            http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include  *forum.idca.or.id/showthread.php?tid=*
// @version  1.0
// ==/UserScript==

var str = $("#panel").find('a').attr('href');
var uid = str.replace(/[^0-9]/g, '')

shortcut.add("Ctrl+,",function() {
    var usernameColor = prompt("Masukan skema warna?", usernameColor);
    GM_setValue('usernameColor', usernameColor);
    alert("Username anda sekarang berwarna "+GM_getValue('usernameColor')+" :)");
    document.location.reload(true);
});

var username = $('a[href="http://forum.idca.or.id/member.php?action=profile&uid='+uid+'"]:first').text();
$('a[href="http://forum.idca.or.id/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').css("color",GM_getValue('usernameColor'));
$('a[href="http://forum.idca.or.id/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').css("text-shadow","0px 2px 2px black");
$('a[href="http://forum.idca.or.id/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').css("background","url(http://s5.postimg.org/43o6dtcyb/animasi_anonim_id.gif)");